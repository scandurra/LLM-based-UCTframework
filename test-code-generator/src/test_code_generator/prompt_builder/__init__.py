"""
Prompt Builder Package
------------------

This package provides the prompt buidler that loads all resources from file system and creates the prompt.
"""

# Expose the main client class directly for easier importing
from .prompt_builder import PromptBuilder
from .page_object_model_processor import PageObjectModelProcessor

__all__ = ["PromptBuilder", "PageObjectModelProcessor"]