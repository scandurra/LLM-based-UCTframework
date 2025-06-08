from dataclasses import dataclass

@dataclass
class LlmResponse:
    """Class representing a test step within a test case."""
    response: str
    prompt: str
    n_tokens_prompt: str
    n_tokens_response: str
    time: int
    