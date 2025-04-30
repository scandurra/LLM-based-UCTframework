from abc import ABC, abstractmethod


class BaseLLMClient(ABC):
    @abstractmethod
    async def generate(self, prompt: str, temperature: float) -> str:
        pass