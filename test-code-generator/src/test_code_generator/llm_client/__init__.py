"""
LLM Client Package
------------------

This package provides client(s) to interact with Large Language Models.
Currently supports Ollama.
"""

# Expose the main client class directly for easier importing
from .ollama_client import OllamaClient, LLMClientError

__all__ = ["OllamaClient", "LLMClientError"]