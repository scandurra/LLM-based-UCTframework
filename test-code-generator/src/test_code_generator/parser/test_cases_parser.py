import json
from typing import List
from test_code_generator.parser.test_case import TestCase


class TestCaseParser:
    """Class for reading test cases from a JSON file."""
    
    @staticmethod
    def read_from_file(file_path: str) -> List[TestCase]:
        """
        Read test cases from a JSON file.
        
        Args:
            file_path (str): Path to the JSON file containing test cases.
            
        Returns:
            List[TestCase]: A list of TestCase objects.
            
        Raises:
            FileNotFoundError: If the specified file doesn't exist.
            json.JSONDecodeError: If the file contains invalid JSON.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                test_cases_data = json.load(file)
                
            test_cases = []
            for data in test_cases_data:
                test_case = TestCase(
                    test_case_id=data["test_case_id"],
                    title=data["title"],
                    preconditions=data["preconditions"],
                    postconditions=data["postconditions"],
                    test_steps=data["test_steps"],
                    test_type=data["test_type"],
                    priority=data["priority"],
                    use_case_id=data["use_case_id"]
                )
                test_cases.append(test_case)
                
            return test_cases
            
        except FileNotFoundError:
            raise FileNotFoundError(f"The file '{file_path}' was not found.")
        except json.JSONDecodeError:
            raise json.JSONDecodeError(f"The file '{file_path}' contains invalid JSON.")