import json
import os
from typing import Dict, List


class PageObjectModelProcessor:
    def __init__(self, folder_path) -> None:
        self.folder_path = folder_path
        # Associations between pom file and use cases.
        # Key: use case identifier. Value: list of pom file names
        self.uc_pom_associations: Dict[str, List[str]] = {}
        pass

    def load(self, use_case_id) -> Dict[str, str]:
        """
        Loads page object models for use_case_id.
        Returnes a dictionary with key the name of the page object model file and value the content
        """
        pom_content: Dict[str, str] = {}
        pom_files = self.uc_pom_associations[use_case_id]

        for pom_file in pom_files:
            try:
                file = os.path.join(self.folder_path, pom_file)
                with open(file, 'r') as f:
                    file_content = f.read()
                    pom_content[pom_file] = file_content
            except FileNotFoundError:
                print(f"Error: File '{file}' not found.")
                raise
        return pom_content


    @classmethod
    def from_config_file(cls, folder_path: str) -> 'PageObjectModelProcessor':
        """Create the page object model processor loading configuration from json."""
        
        config_file = os.path.join(folder_path, "config.json")
        
        try:
            with open(config_file, 'r') as file:
                data = json.load(file)
            return cls.from_config(folder_path, data)
        except FileNotFoundError:
            print(f"Error: File '{config_file}' not found.")
            raise
        except json.JSONDecodeError:
            print(f"Error: File '{config_file}' contains invalid JSON.")
            raise

    @classmethod
    def from_config(cls, folder_path: str, data: dict) -> 'PageObjectModelProcessor':
        obj = cls(folder_path)

        # Pivoting "data" content
        # From use cases for each pom to poms for each use case
        for pom_name, uc_list in data.items():
            for uc_item in uc_list:
                if uc_item not in obj.uc_pom_associations:  # check if key in dictionary
                    obj.uc_pom_associations[uc_item] = []
                obj.uc_pom_associations[uc_item].append(pom_name)

        return obj