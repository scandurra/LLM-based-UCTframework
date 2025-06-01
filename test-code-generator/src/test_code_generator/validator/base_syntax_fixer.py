# from abc import ABC, abstractmethod
# from enum import Enum
# from test_code_generator.validator.syntax_error import SyntaxError


# class BaseSyntaxFixer(ABC):
#     """Abstract base class for syntax fixers"""
    
#     @abstractmethod
#     def can_fix(self, error: SyntaxError, code: str) -> bool:
#         """Check if this fixer can handle the given error"""
#         pass
    
#     @abstractmethod
#     def fix(self, code: str, error: SyntaxError) -> str:
#         """Apply the fix to the code"""
#         pass