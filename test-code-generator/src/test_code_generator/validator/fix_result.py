# from typing import Any, Dict, List
# from test_code_generator.validator.syntax_error import SyntaxError


# class FixResult:
#     """Result of a syntax fixing operation"""
    
#     def __init__(self, 
#                  original_code: str,
#                  fixed_code: str,
#                  success: bool,
#                  errors_found: List[SyntaxError],
#                  errors_fixed: List[SyntaxError],
#                  attempts: int):
#         self.original_code = original_code
#         self.fixed_code = fixed_code
#         self.success = success
#         self.errors_found = errors_found
#         self.errors_fixed = errors_fixed
#         self.attempts = attempts
        
#     def to_dict(self) -> Dict[str, Any]:
#         """Convert result to dictionary for JSON serialization"""
#         return {
#             'success': self.success,
#             'fixed_code': self.fixed_code,
#             'attempts': self.attempts,
#             'errors_found': len(self.errors_found),
#             'errors_fixed': len(self.errors_fixed),
#             'error_details': [
#                 {
#                     'message': error.message,
#                     'line': error.line_number,
#                     'column': error.column,
#                     'type': error.error_type.value
#                 } for error in self.errors_found
#             ]
#         }