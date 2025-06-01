# from typing import List
# from test_code_generator.validator.base_syntax_fixer import BaseSyntaxFixer
# from test_code_generator.validator.common_syntax_fixer import CommonSyntaxFixer
# from test_code_generator.validator.playwright_syntax_fixer import PlaywrightSyntaxFixer
# from test_code_generator.validator.syntax_error import SyntaxError
# from test_code_generator.validator.fix_result import FixResult
# from test_code_generator.validator.error_type import ErrorType
# import esprima

# class JavascriptSyntaxFixer:
#     def __init__(self, max_attempts: int = 5, enable_logging: bool = True):
#         self.max_attempts = max_attempts
#         self.logger = self._setup_logger(enable_logging)
        
#         # Initialize fixers
#         self.fixers: List[BaseSyntaxFixer] = [
#             # MarkdownRemovalFixer(),
#             CommonSyntaxFixer(),
#             PlaywrightSyntaxFixer(),
#         ]

#     def detect_errors(self, js_code: str) -> List[SyntaxError]:
#         """Detect syntax errors using esprima"""
#         errors = []
        
#         try:
#             esprima.parse(js_code, {
#                 'tolerant': True,
#                 'attachComments': True,
#                 'locations': True
#             })
#             self.logger.info("No syntax errors detected")
#         except Exception as e:
#             error = SyntaxError(
#                 message=str(e),
#                 line_number=getattr(e, 'lineNumber', None),
#                 column=getattr(e, 'column', None),
#                 error_type=self._classify_error(str(e))
#             )
#             errors.append(error)
#             self.logger.warning(f"Syntax error detected: {error.message}")
        
#         return errors
    
#     def _classify_error(self, error_message: str) -> ErrorType:
#         """Classify the type of error based on the error message"""
#         error_msg_lower = error_message.lower()
        
#         if 'semicolon' in error_msg_lower:
#             return ErrorType.MISSING_SEMICOLON
#         elif 'bracket' in error_msg_lower or 'brace' in error_msg_lower:
#             return ErrorType.MISSING_BRACKET
#         elif 'quote' in error_msg_lower or 'string' in error_msg_lower:
#             return ErrorType.MISSING_QUOTES
#         elif 'unexpected token' in error_msg_lower:
#             return ErrorType.SYNTAX_ERROR
#         else:
#             return ErrorType.UNKNOWN
    
#     def fix_syntax(self, js_code: str) -> FixResult:
#         """Main method to fix JavaScript syntax errors"""
#         if not isinstance(js_code, str):
#             raise TypeError("Input code must be a string")
        
#         original_code = js_code
#         current_code = js_code
#         attempts = 0
#         all_errors_found = []
#         errors_fixed = []
        
#         self.logger.info("Starting syntax fixing process")
        
#         while attempts < self.max_attempts:
#             errors = self.detect_errors(current_code)
#             all_errors_found.extend(errors)
            
#             if not errors:
#                 self.logger.info(f"All syntax errors fixed after {attempts} attempts")
#                 return FixResult(
#                     original_code=original_code,
#                     fixed_code=current_code,
#                     success=True,
#                     errors_found=all_errors_found,
#                     errors_fixed=errors_fixed,
#                     attempts=attempts
#                 )
            
#             # Apply fixes
#             previous_code = current_code
#             for error in errors:
#                 for fixer in self.fixers:
#                     if fixer.can_fix(error, current_code):
#                         current_code = fixer.fix(current_code, error)
#                         if current_code != previous_code:
#                             errors_fixed.append(error)
#                             self.logger.info(f"Applied fix for: {error.message}")
#                             break
            
#             # If no changes were made, break to avoid infinite loop
#             if current_code == previous_code:
#                 self.logger.warning("No fixes could be applied, stopping attempts")
#                 break
            
#             attempts += 1
        
#         self.logger.warning(f"Could not fix all errors after {attempts} attempts")
#         return FixResult(
#             original_code=original_code,
#             fixed_code=current_code,
#             success=False,
#             errors_found=all_errors_found,
#             errors_fixed=errors_fixed,
#             attempts=attempts
#         )
    
#     def validate_syntax(self, js_code: str) -> bool:
#         """Validate if JavaScript code has correct syntax"""
#         try:
#             esprima.parse(js_code)
#             return True
#         except:
#             return False
    
#     def add_fixer(self, fixer: BaseSyntaxFixer) -> None:
#         """Add a custom syntax fixer"""
#         if not isinstance(fixer, BaseSyntaxFixer):
#             raise TypeError("Fixer must inherit from BaseSyntaxFixer")
#         self.fixers.append(fixer)
#         self.logger.info(f"Added custom fixer: {fixer.__class__.__name__}")