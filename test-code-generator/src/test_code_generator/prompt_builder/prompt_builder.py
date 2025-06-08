import logging
import os
from pathlib import Path
from test_code_generator.prompt_builder.prompt_template import PromptTemplate
from test_code_generator.prompt_builder.page_object_model_processor import PageObjectModelProcessor

logger = logging.getLogger(__name__)

class PromptBuilder:
    def __init__(self, template_path: str, test_parameters_path: str, reporter_file_path: str) -> None:
        """
        Initialize the prompt builder and loads the template
        :param template_path: path of the prompt template to load
        :raise FileNotFoundError: if the template does not exist in path
        """
        self.template_path = template_path
        self.test_parameters_path = test_parameters_path
        self.reporter_file_path = reporter_file_path

        self.prompt_template = None
        self.test_parameters = None
        self.reporter_file = None

        self.__load_prompt_template()
        self.__load_test_parameters()
        self.__load_reporter_file()
        self.__load_previous_code_section_file()

    def build_prompt(self, test_case_name, test_cases, dependent_uc_code, pom_content) -> str:
        # building previous code section
        
        previousCodeSection = ""
        if dependent_uc_code != "":
            previousCodeSectionTemplate = PromptTemplate(self.previous_code_section)
            previousCodeSection = previousCodeSectionTemplate.safe_substitute({
                "existing_code": dependent_uc_code
            })

        placeholder_values = {
            "test_case_name": test_case_name,
            "test_cases": test_cases,
            "test_parameters": self.test_parameters,
            "pom": pom_content,
            "existing_code": self.reporter_file,
            "previous_code_section": previousCodeSection
        }
        # Using string Template object in order to substitute only keys found and mainting the others without errors
        templateObj = PromptTemplate(self.prompt_template)
        prompt = templateObj.safe_substitute(**placeholder_values)
        logger.info("Prompt built: %s", prompt)

        return prompt

    def __load_prompt_template(self) -> None:
        try:
            prompt_file_path = os.path.join(self.template_path, "raw.txt")
            with open(prompt_file_path, "r") as f:
                self.prompt_template = f.read()
                logger.info(f"Prompt template loaded from path: {prompt_file_path}")
        except FileNotFoundError as e:
            logger.exception(e)
            raise

    def __load_test_parameters(self) -> None:
        try:
            with open(self.test_parameters_path, "r") as f:
                self.test_parameters = f.read()
                logger.info(f"Test parameters loaded from path: {self.test_parameters_path}")
        except FileNotFoundError as e:
            logger.exception(e)
            raise

    def __load_reporter_file(self) -> None:
        try:
            with open(self.reporter_file_path, "r") as f:
                self.reporter_file = f.read()
                logger.info(f"Test reporter loaded from path: {self.reporter_file_path}")
        except FileNotFoundError as e:
            logger.exception(e)
            raise

    def __load_previous_code_section_file(self) -> None:
        try:
            prompt_file_path = os.path.join(self.template_path, "previous_code_section.txt")
            with open(prompt_file_path, "r") as f:
                self.previous_code_section = f.read()
                logger.info(f"Previous code section loaded from path: {prompt_file_path}")
        except FileNotFoundError as e:
            logger.exception(e)
            raise
