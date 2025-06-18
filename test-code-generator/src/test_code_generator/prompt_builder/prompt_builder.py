import logging
import os
from pathlib import Path
import re
from test_code_generator.prompt_builder.prompt_template import PromptTemplate
from test_code_generator.prompt_builder.page_object_model_processor import PageObjectModelProcessor
from test_code_generator.llm_client.llm_chat_request import LlmChatRequest, LlmChatRequestMessage

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
        self.prompt_files = None
        self.test_parameters = None
        self.reporter_file = None

        self.__load_prompt_template()
        self.__load_test_parameters()
        self.__load_reporter_file()
        self.__load_previous_code_section_file()

    def build_prompt(self, test_case_name, test_cases, dependent_uc_code, pom_content) -> LlmChatRequest:
        # building previous code section
        
        llmChatRequestMessages = []

        for prompt_file in self.prompt_files:
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
            templateObj = PromptTemplate(prompt_file[2])
            prompt = templateObj.safe_substitute(**placeholder_values)

            llmChatRequestMessages.append(LlmChatRequestMessage(role=prompt_file[1], content=prompt))
        

        prompt_for_logging = ""
        for llmChatRequestMessage in llmChatRequestMessages:
            if (prompt_for_logging):
                prompt_for_logging += "\n------------------------------------------------------------------\n"
            prompt_for_logging += f"ROLE: {llmChatRequestMessage.role}\n"
            prompt_for_logging += llmChatRequestMessage.content
        logger.info("Prompt built: \n%s", prompt_for_logging)
        print(prompt_for_logging)
        return LlmChatRequest(llmChatRequestMessages)

    def __load_prompt_template(self) -> None:
        # Pattern to match: number.role.prompt.txt
        pattern = r'^(\d+)\.([^.]+)\.prompt\.txt$'

        try:
            self.prompt_files = []

            folder = Path(self.template_path)
            for file_path in folder.iterdir():
                if file_path.is_file():
                    match = re.match(pattern, file_path.name)
                    if match:
                        number = int(match.group(1))
                        role = match.group(2)
                        
                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read()
                            self.prompt_files.append((number, role, content))
                        except Exception as e:
                            print(f"Error reading {file_path}: {e}")
            
            # Sort by the prefix number
            self.prompt_files.sort(key=lambda x: x[0])

            # prompt_file_path = os.path.join(self.template_path, "raw.txt")
            # with open(prompt_file_path, "r") as f:
            #     self.prompt_template = f.read()
            #     logger.info(f"Prompt template loaded from path: {prompt_file_path}")
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
