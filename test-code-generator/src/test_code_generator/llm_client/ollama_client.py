import logging
import ollama
from test_code_generator.llm_client.base_llm_client import BaseLLMClient
from test_code_generator.llm_client.llm_client_error import LLMClientError

logger = logging.getLogger(__name__)

class OllamaClient(BaseLLMClient):
    """
    A wrapper over Ollama to interact with
    """

    def __init__(self, model: str = "llama3", timeout: int = 120):
        """
        Initialize OllamaClient
        :param model:
        :param timeout:
        """

        self.model = model
        self.timeout = timeout
        logger.info(f"OllamaClient initialized with model: {self.model}")

    def generate(self, prompt: str, temperature:float) -> str:
        """
        Sends a prompt to Ollama and returns the response.
        :param prompt: the prompt to be sent to Ollama
        :param temperature: temperature of the model execution
        :return: the generated response
        """

        try:
            response = ollama.generate(
                model=self.model,
                prompt=prompt,
                stream=False,
                raw=True,
                options={
                    "timeout": self.timeout,
                    "temperature": temperature
                }
            )
            # content = ""
            # for chunk in response:
            #     chunkContent = chunk['response']
            #     content += chunkContent
            #     print(chunkContent, end='', flush=True)
            content = response["response"]
            
            logger.info(f"Ollama responded with: \n {content}")
            
            return content
        
        except ollama.ResponseError as e:
            logger.exception(e)
            print(e)
            raise LLMClientError(e)



