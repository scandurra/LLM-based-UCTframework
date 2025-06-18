from datetime import datetime
from test_code_generator.llm_client import OllamaClient
from test_code_generator.prompt_builder import PromptBuilder
from test_code_generator.prompt_builder import PageObjectModelProcessor
from test_code_generator.parser import TestCaseParser
from test_code_generator.dependency_graph import DependencyGraph
from test_code_generator.validator import JavascriptCodeValidator
import logging
from logging.handlers import TimedRotatingFileHandler
import os
import argparse
import json
from dataclasses import asdict


timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

log_filename = os.path.join("logs/single_processing/few_shot/codellama", f"{timestamp}.log")
# log_filename = os.path.join("logs/single_processing/one_shot/llama3.3", f"{timestamp}.log")
# log_filename = os.path.join("logs/single_processing/few_shot/llama3.3", f"{timestamp}.log")
logging.basicConfig(filename=log_filename, encoding="utf-8", level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)


def getTestCaseFilePath(folder_path: str, use_case_id) -> str:
    use_case_id_with_underscore = use_case_id.replace(".", "_")
    return os.path.join(folder_path, f"{use_case_id_with_underscore}.json")

def main():
    """
    Main function to orchestrate Playwright code generation
    """

    # Set up command line argument parser
    parser = argparse.ArgumentParser(
        description='Chat with Llama3 using Ollama with real-time streaming',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument("-uc", "--use_case_name", type=str, help="Name of the test case", default=None)
    parser.add_argument("-tc", "--test_case_name", action='append', help="Specify a test case")
    parser.add_argument("-m", "--model", type=str, help="Model", default="llama3.3")
    parser.add_argument("-c", "--configuration", type=str, help="Configuration", default="zero_shot")
    args = parser.parse_args()

    use_case_name = args.use_case_name
    test_case_names = args.test_case_name
    model = args.model
    configuration = args.configuration
    model_name_short = model.split(":")[0]

    logger.info(f"Started execution for use case {use_case_name} - test case {test_case_names} - model {model} - configuration {configuration}")

    dependency_graph_path = "./input_files/include_graph/include_graph.json"
    # prompt_template_path = f"./prompts/single_processing/zero_shot/{model_name_short}"
    # prompt_template_path = f"./prompts/single_processing/one_shot/{model_name_short}"
    prompt_template_path = f"./prompts/single_processing/{configuration}/{model_name_short}"
    test_parameters_path = "./input_files/parameters/test_parameters.env"
    pom_folder_path = "./input_files/pom"
    existing_code_path = "./input_files/reporter_minimal.js"
    test_cases_folder = "./input_files/test_cases/"

    # output_path = "./output/single_processing/zero_shot/" + model_name_short
    # output_path = "./output/single_processing/one_shot/" + model_name_short
    output_path = f"./output/single_processing/{configuration}/{model_name_short}"


    # Build depdendency graph
    dependency_graph = DependencyGraph.from_json_file(dependency_graph_path)
    dependencies = dependency_graph.get_direct_dependencies(use_case_name)
    logger.info(f"Found {len(dependencies)} dependencies for use case {use_case_name}")

    # Read test cases file
    test_cases = TestCaseParser.read_from_file(getTestCaseFilePath(test_cases_folder, use_case_name))
    
    # Adding to the dependency_graph nodes the test case id of the happy path (or base sequence)
    for node in dependencies:
        if node.base_test_case_id != None:
            print(f"Base test case id already defined for dependency {node.id}: {node.base_test_case_id}")
            continue
        dependant_test_cases = TestCaseParser.read_from_file(getTestCaseFilePath(test_cases_folder, node.id))
        test_case = next((tc for tc in dependant_test_cases if tc.use_case_id == node.id  and tc.test_type == "Positivo"), None)
        if test_case == None:
            continue
        node.base_test_case_id = test_case.test_case_id
        print(node.id + " " + test_case.test_case_id)


    # Retrieving dependent code (only happy path test case for each use case)
    dependent_uc_code = ""
    for dependency in dependencies:
        # check if exists code generated for dependent use case
        file_name = dependency.base_test_case_id + ".functions.js"
        dependent_code_func_path= os.path.join(output_path, dependency.id, file_name)
        with open(dependent_code_func_path, "r") as f:
            if dependent_uc_code != "":
                dependent_uc_code += "\n"
            dependent_uc_code += f"// File: {file_name}\n"
            dependent_uc_code += f.read()
            logger.info(f"Read previously generated functions code for use case {dependency.id} - test case {dependency.base_test_case_id}")

        file_name = dependency.base_test_case_id + ".spec.js"
        dependent_code_func_path= os.path.join(output_path, dependency.id, file_name)
        with open(dependent_code_func_path, "r") as f:
            if dependent_uc_code != "":
                dependent_uc_code += "\n"
            dependent_uc_code += f"// File: {file_name}\n"
            dependent_uc_code += f.read()
            logger.info(f"Read previously generated spec code for use case {dependency.id} - test case {dependency.base_test_case_id}")


    page_object_model_processor = PageObjectModelProcessor.from_config_file(pom_folder_path)
    page_object_models = page_object_model_processor.load(use_case_name)

    for test_case in test_cases:
        if test_case_names and test_case.test_case_id not in test_case_names:
            continue

        prompt_builder = PromptBuilder(prompt_template_path, test_parameters_path, existing_code_path)
        pom_content = "\n\n".join(f"File: {k}\n{v}" for k, v in page_object_models.items())
        prompt = prompt_builder.build_prompt(test_case.test_case_id, test_case, dependent_uc_code, pom_content)

        llm_client = OllamaClient(model=model)
        response = llm_client.chat(prompt, temperature=0.0)
    
        print("---------------------------------")
        logger.info(f"Model response:\n{response.response}")
        print(response.response)
        print("\n\n")

        javascriptCodeValidator = JavascriptCodeValidator(use_case_name, test_case.test_case_id, response.response)
        javascriptCodeValidator.extract_code_blocks()
        # javascriptCodeValidator.ensure_require_statements(dependencies, output_path)
        javascriptCodeValidator.fix_import_statements()
        javascriptCodeValidator.save_files_to_disk(output_path)

        # Save the cod in a .spec.js file
        folder_abs_path = os.path.join(output_path, use_case_name)
        # if not os.path.exists(folder_abs_path):
        #     os.makedirs(folder_abs_path)
        # with open(os.path.join(folder_abs_path, f"{test_case.test_case_id}.spec.js"), "w") as f:
        #     f.write(js_code)

        # Save execution parameters
        with open(os.path.join(folder_abs_path, f"{test_case.test_case_id}.json"), "w") as f:
            f.write(json.dumps(asdict(response), indent=2))

        logger.info("File saved")


if __name__ == "__main__":
    main()