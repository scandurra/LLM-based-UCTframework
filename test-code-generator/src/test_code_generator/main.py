from datetime import datetime
from test_code_generator.llm_client import OllamaClient
from test_code_generator.prompt_builder import PromptBuilder
from test_code_generator.parser import TestCaseParser
from test_code_generator.dependency_graph import DependencyGraph
import logging
from logging.handlers import TimedRotatingFileHandler
import os
import argparse

# loggingFileHandler = TimedRotatingFileHandler(filename = os.path.join("logs").join("app.log"), when="midnight", interval=1)
# loggingFileHandler.suffix = "%Y%m%d.log"

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
log_filename = os.path.join("logs", f"{timestamp}.log")
logging.basicConfig(filename=log_filename, encoding="utf-8", level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

logger = logging.getLogger(__name__)


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
    args = parser.parse_args()

    use_case_name = args.use_case_name


    dependency_graph_path = "./input_files/include_graph/include_graph.json"
    # prompt_template_path = "./prompts/single_processing/zero_shot/raw.txt"
    prompt_template_path = "./prompts/single_processing/one_shot/raw.txt"
    test_parameters_path = "./input_files/parameters/test_parameters.env"
    pom_folder_path = "./input_files/pom"
    existing_code_path = "./input_files/reporter_minimal.js"
    test_cases_path = os.path.join("./input_files/test_cases/", use_case_name + ".json")

    # output_path = "./output/single_processing/zero_shot"
    output_path = "./output/single_processing/one_shot"


    
    dependency_graph = DependencyGraph.from_json_file(dependency_graph_path)
    dependencies = dependency_graph.get_direct_dependencies(use_case_name)
    logger.info(f"Found {len(dependencies)} dependencies for use case {use_case_name}")

    dependent_uc_code = ""
    if len(dependencies) > 0:
        # check if exists code generated for dependent use case
        dep = dependencies[0].id
        with open("./output/single_processing/one_shot/" + dep + ".js", "r") as f:
            dependent_uc_code = f.read()
            logger.info(f"Read previously generated code for use case {dep}: \n{dependent_uc_code}")

    test_cases = TestCaseParser.read_from_file(test_cases_path)

    for test_case in test_cases:
        prompt_builder = PromptBuilder(prompt_template_path, test_parameters_path, pom_folder_path, existing_code_path)
        prompt = prompt_builder.build_prompt(test_case, dependent_uc_code)

        llm_client = OllamaClient(model="llama3.3")
        response = llm_client.generate(prompt, temperature=0.0)
    
        print("---------------------------------")
        print(response)

        # Save to a file
        with open(os.path.join(output_path, use_case_name + ".js"), "a") as f:
            f.write(response)

if __name__ == "__main__":
    main()