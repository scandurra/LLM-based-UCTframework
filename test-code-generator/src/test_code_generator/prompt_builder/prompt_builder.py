import logging
from test_code_generator.prompt_builder.prompt_template import PromptTemplate

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class PromptBuilder:
    def __init__(self, template_path: str, test_parameters_path: str, pom_file_path: str, reporter_file_path: str) -> None:
        """
        Initialize the prompt builder and loads the template
        :param template_path: path of the prompt template to load
        :raise FileNotFoundError: if the template does not exist in path
        """
        self.template_path = template_path
        self.test_parameters_path = test_parameters_path
        self.pom_file_path = pom_file_path
        self.reporter_file_path = reporter_file_path

        self.prompt_template = None
        self.test_parameters = None
        self.pom_file = None
        self.reporter_file = None

        self.__load_prompt_template()
        self.__load_test_parameters()
        self.__load_pom_file()
        self.__load_reporter_file()

    def build_prompt(self, test_cases) -> str:
        placeholder_values = {
            "test_cases": test_cases,
            "test_parameters": self.test_parameters,
            "pom": self.pom_file,
            "existing_code": self.reporter_file
        }
        # Using string Template object in order to substitute only keys found and mainting the others without errors
        templateObj = PromptTemplate(self.prompt_template)
        prompt = templateObj.safe_substitute(**placeholder_values)
        logger.info("Prompt built: %s", prompt)

        return prompt

    def __load_prompt_template(self) -> None:
        try:
            with open(self.template_path, "r") as f:
                self.prompt_template = f.read()
                logger.info(f"Prompt template loaded from path: {self.template_path}")
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

    def __load_pom_file(self) -> None:
        try:
            with open(self.pom_file_path, "r") as f:
                self.pom_file = f.read()
                logger.info(f"Test parameters loaded from path: {self.pom_file_path}")
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
