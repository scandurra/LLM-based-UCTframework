# from dataclasses import dataclass
# from typing import Optional
# from test_code_generator.validator.error_type import ErrorType

# @dataclass
# class SyntaxError:
#     """Data class representing a JavaScript syntax error"""
#     message: str
#     line_number: Optional[int] = None
#     column: Optional[int] = None
#     error_type: ErrorType = ErrorType.UNKNOWN
#     suggested_fix: Optional[str] = None