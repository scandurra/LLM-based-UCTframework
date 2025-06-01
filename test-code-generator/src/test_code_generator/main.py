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

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
log_filename = os.path.join("logs/single_processing/zero_shot", f"{timestamp}.log")
logging.basicConfig(filename=log_filename, encoding="utf-8", level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)


def getTestCaseFilePath(folder_path: str, use_case_id) -> str:
    return os.path.join(folder_path, f"{use_case_id}.json")

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
    parser.add_argument("-m", "--model", type=str, help="Model", default="llama3.3")
    args = parser.parse_args()

    use_case_name = args.use_case_name
    model = args.model
    model_name_short = model.split(":")[0]


    dependency_graph_path = "./input_files/include_graph/include_graph.json"
    # prompt_template_path = f"./prompts/single_processing/zero_shot/{model_name_short}"
    # prompt_template_path = f"./prompts/single_processing/one_shot/{model_name_short}"
    prompt_template_path = f"./prompts/single_processing/few_shot/{model_name_short}"
    test_parameters_path = "./input_files/parameters/test_parameters.env"
    pom_folder_path = "./input_files/pom"
    existing_code_path = "./input_files/reporter_minimal.js"
    test_cases_folder = "./input_files/test_cases/"

    # output_path = "./output/single_processing/zero_shot/" + model_name_short
    # output_path = "./output/single_processing/one_shot/" + model_name_short
    output_path = "./output/single_processing/few_shot/" + model_name_short


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
        dependent_code_path = os.path.join(output_path, dependency.id, dependency.base_test_case_id + ".js")
        with open(dependent_code_path, "r") as f:
            if dependent_uc_code != "":
                dependent_uc_code += "\n"
            dependent_uc_code += f.read()
            logger.info(f"Read previously generated code for use case {dependency.id} - test case {dependency.base_test_case_id}")


    page_object_model_processor = PageObjectModelProcessor.from_config_file(pom_folder_path)
    page_object_models = page_object_model_processor.load(use_case_name)

    for test_case in test_cases:    
        prompt_builder = PromptBuilder(prompt_template_path, test_parameters_path, existing_code_path)
        pom_content = "\n\n".join(f"{v}" for k, v in page_object_models.items())
        prompt = prompt_builder.build_prompt(test_case, dependent_uc_code, pom_content)

        llm_client = OllamaClient(model=model)
        response = llm_client.generate(prompt, temperature=0.0)
    
        print("---------------------------------")
        print(response)

        javascriptCodeValidator = JavascriptCodeValidator()
        js_code = javascriptCodeValidator.clean_code(response)

        # Save to a file
        folder_abs_path = os.path.join(output_path, use_case_name)
        if not os.path.exists(folder_abs_path):
            os.makedirs(folder_abs_path)
        with open(os.path.join(folder_abs_path, f"{test_case.test_case_id}.js"), "w") as f:
            f.write(js_code)

if __name__ == "__main__":
    main()