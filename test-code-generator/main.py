from src.test_code_generator.llm_client import OllamaClient
from src.test_code_generator.prompt_builder.prompt_builder import PromptBuilder


def main():
    """
    Main function to orchestrate Playwright code generation
    """

    test_cases = None

    prompt_template_path = "../prompts/one_shot.txt"
    test_parameters_path = "../input_files/parameters/test_parameters.env"
    pom_file_path = "../input_files/pom/pom.js"
    existing_code_path = "../input_files/reporter.js"
    test_cases_path = "../input_files/test_cases/test_cases_uc1.json"

    with open(test_cases_path, "r") as f:
        test_cases = f.read()

    prompt_builder = PromptBuilder(prompt_template_path, test_parameters_path, pom_file_path, existing_code_path)
    prompt = prompt_builder.build_prompt(test_cases)

    llm_client = OllamaClient(model="llama3.3")
    response = llm_client.generate(prompt, temperature=0.0)


if __name__ == "__main__":
    main()