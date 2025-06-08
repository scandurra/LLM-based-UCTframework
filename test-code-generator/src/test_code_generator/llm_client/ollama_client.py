import logging
import ollama
from test_code_generator.llm_client.base_llm_client import BaseLLMClient
from test_code_generator.llm_client.llm_client_error import LLMClientError
from test_code_generator.llm_client.llm_response import LlmResponse

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

    def generate(self, prompt: str, temperature:float) -> LlmResponse:
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
            n_tokens_prompt = response["prompt_eval_count"]
            n_tokens_response = response["eval_count"]
            total_duration = response["total_duration"]
            
            logger.info(f"Ollama responded in {total_duration} time, with {n_tokens_prompt} tokens in prompt and {n_tokens_response} tokens in response. Content:\n {content}")
            
            return LlmResponse(content, prompt, n_tokens_prompt, n_tokens_prompt, total_duration)
        
        except ollama.ResponseError as e:
            logger.exception(e)
            print(e)
            raise LLMClientError(e)



