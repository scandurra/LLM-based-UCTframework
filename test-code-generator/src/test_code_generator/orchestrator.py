from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import yaml
from test_code_generator.llm_client import OllamaClient
from test_code_generator.prompt_builder import PromptBuilder
from test_code_generator.prompt_builder import PageObjectModelProcessor
from test_code_generator.parser import TestCaseParser
from test_code_generator.dependency_graph import DependencyGraph
from test_code_generator.repair import JavascriptCodeRepair
import logging
from logging.handlers import TimedRotatingFileHandler
import os
import argparse
import json
from dataclasses import asdict

class ConfigurationError(Exception):
    """Raised when configuration is invalid or missing."""
    pass

class OrchestratorConfig:
    """Configuration management for the orchestrator."""
    
    def __init__(self, config_path: str = "config.yaml"):
        self.config_path = config_path
        self.config = self._load_config()
        self._validate_config()
    
    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from YAML file."""
        try:
            with open(self.config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            raise ConfigurationError(f"Configuration file not found: {self.config_path}")
        except yaml.YAMLError as e:
            raise ConfigurationError(f"Invalid YAML configuration: {e}")
    
    def _validate_config(self):
        """Validate required configuration keys."""
        required_keys = [
            'paths.dependency_graph',
            'paths.test_parameters',
            'paths.pom_folder',
            'paths.existing_code',
            'paths.test_cases_folder',
            'paths.prompts_base',
            'paths.output_base',
            'paths.logs_base',
            'models.default',
            'processing.default_configuration'
        ]
        
        for key in required_keys:
            if not self._get_nested_value(key):
                raise ConfigurationError(f"Missing required configuration: {key}")
    
    def _get_nested_value(self, key: str) -> Any:
        """Get nested configuration value using dot notation."""
        keys = key.split('.')
        value = self.config
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return None
        return value
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value with optional default."""
        return self._get_nested_value(key) or default

class Orchestrator:
    """Main orchestrator for test code generation."""
    
    def __init__(self, config: OrchestratorConfig):
        self.config = config
        self.logger = self._setup_logging()
        self.dependency_graph = None
        self.page_object_model_processor = None
    
    def _setup_logging(self) -> logging.Logger:
        """Set up logging configuration."""
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        logs_base = self.config.get('paths.logs_base', 'logs')
        
        # Create logs directory if it doesn't exist
        log_dir = Path(logs_base)
        log_dir.mkdir(parents=True, exist_ok=True)
        
        log_filename = log_dir / f"orchestrator_{timestamp}.log"
        
        logging.basicConfig(
            filename=log_filename,
            encoding="utf-8",
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        
        logger = logging.getLogger(__name__)
        logger.info("Orchestrator initialized")
        return logger
    
    def _get_test_case_file_path(self, folder_path: str, use_case_id: str) -> str:
        """Get the file path for a test case."""
        use_case_id_with_underscore = use_case_id.replace(".", "_")
        return os.path.join(folder_path, f"{use_case_id_with_underscore}.json")
    
    def _load_dependency_graph(self):
        """Load and initialize the dependency graph."""
        dependency_graph_path = self.config.get('paths.dependency_graph')
        self.dependency_graph = DependencyGraph.from_json_file(dependency_graph_path)
        self.logger.info(f"Loaded dependency graph from {dependency_graph_path}")
    
    def _load_page_object_models(self):
        """Load and initialize page object models."""
        pom_folder_path = self.config.get('paths.pom_folder')
        self.page_object_model_processor = PageObjectModelProcessor.from_config_file(pom_folder_path)
        self.logger.info(f"Loaded page object models from {pom_folder_path}")
    
    def _get_all_use_cases_in_dependency_order(self) -> List[str]:
        """Get all use cases ordered by their dependencies."""
        if not self.dependency_graph:
            self._load_dependency_graph()
        
        # Get topological order of all nodes
        all_nodes = self.dependency_graph.get_topological_order()
        use_case_ids = [node.id for node in all_nodes]
        
        self.logger.info(f"Found {len(use_case_ids)} use cases in dependency order: {use_case_ids}")
        return use_case_ids
    
    def _prepare_dependencies(self, use_case_name: str, processing_type: str, configuration: str, model: str) -> str:
        """Prepare dependency code for a use case."""
        dependencies = self.dependency_graph.get_direct_dependencies(use_case_name)
        self.logger.info(f"Found {len(dependencies)} dependencies for use case {use_case_name}")
        
        # Update base test case IDs for dependencies
        test_cases_folder = self.config.get('paths.test_cases_folder')
        for node in dependencies:
            if node.base_test_case_id is not None:
                self.logger.info(f"Base test case ID already defined for dependency {node.id}: {node.base_test_case_id}")
                continue
            
            try:
                dependent_test_cases = TestCaseParser.read_from_file(
                    self._get_test_case_file_path(test_cases_folder, node.id)
                )
                test_case = next(
                    (tc for tc in dependent_test_cases 
                     if tc.use_case_id == node.id and tc.test_type == "Positivo"), 
                    None
                )
                if test_case:
                    node.base_test_case_id = test_case.test_case_id
                    self.logger.info(f"Set base test case ID for {node.id}: {test_case.test_case_id}")
            except Exception as e:
                self.logger.warning(f"Could not load test cases for dependency {node.id}: {e}")
        
        # Retrieve dependent code
        dependent_uc_code = ""
        output_base = os.path.join(
            self.config.get('paths.output_base'), 
            processing_type, 
            configuration, 
            model.split(":")[0]
        )
        
        for dependency in dependencies:
            if not dependency.base_test_case_id:
                continue
            
            for file_type in ['functions', 'spec']:
                file_name = f"{dependency.base_test_case_id}.{file_type}.js"
                file_path = os.path.join(output_base, dependency.id, file_name)
                
                try:
                    with open(file_path, "r", encoding='utf-8') as f:
                        if dependent_uc_code:
                            dependent_uc_code += "\n"
                        dependent_uc_code += f"// File: {file_name}\n"
                        dependent_uc_code += f.read()
                        self.logger.info(f"Read {file_type} code for {dependency.id} - {dependency.base_test_case_id}")
                except FileNotFoundError:
                    self.logger.warning(f"Dependency file not found: {file_path}")
                except Exception as e:
                    self.logger.error(f"Error reading dependency file {file_path}: {e}")
        
        return dependent_uc_code
    
    def _process_single_test_case(self, test_case, use_case_name: str, dependent_uc_code: str, 
                                 page_object_models: Dict[str, str], model: str, configuration: str, processing_type: str):
        """Process a single test case individually."""
        try:
            # Build prompt
            prompt_template_path = os.path.join(
                self.config.get('paths.prompts_base'),
                processing_type,
                configuration,
                model.split(":")[0]
            )
            
            prompt_builder = PromptBuilder(
                prompt_template_path,
                self.config.get('paths.test_parameters'),
                self.config.get('paths.existing_code')
            )
            
            pom_content = "\n\n".join(f"File: {k}\n{v}" for k, v in page_object_models.items())
            prompt = prompt_builder.build_prompt(
                test_case.test_case_id, 
                test_case, 
                dependent_uc_code, 
                pom_content
            )
            
            # Generate code with LLM
            llm_client = OllamaClient(model=model)
            response = llm_client.chat(prompt, temperature=self.config.get('processing.temperature', 0.0))
            
            self.logger.info(f"Generated code for test case {test_case.test_case_id}")
            
            # Process and save code
            javascript_code_repair = JavascriptCodeRepair(
                use_case_name, 
                test_case.test_case_id, 
                response.response
            )
            javascript_code_repair.extract_code_blocks()
            javascript_code_repair.fix_import_statements()
            
            output_path = os.path.join(self.config.get('paths.output_base'), processing_type, configuration, model.split(":")[0])
            javascript_code_repair.save_files_to_disk(output_path)
            
            # Save execution parameters
            folder_abs_path = os.path.join(output_path, use_case_name)
            os.makedirs(folder_abs_path, exist_ok=True)
            
            with open(os.path.join(folder_abs_path, f"{test_case.test_case_id}.json"), "w", encoding='utf-8') as f:
                f.write(json.dumps(asdict(response), indent=2))
            
            self.logger.info(f"Successfully processed test case {test_case.test_case_id}")
            
        except Exception as e:
            self.logger.error(f"Error processing test case {test_case.test_case_id}: {e}")
            raise
    
    def _process_batch_test_cases(self, test_cases: List, use_case_name: str, dependent_uc_code: str,
                                 page_object_models: Dict[str, str], model: str, configuration: str, processing_type: str):
        """Process all test cases for a use case in one batch."""
        try:
            # Build prompt
            prompt_template_path = os.path.join(
                self.config.get('paths.prompts_base'),
                processing_type,
                configuration,
                model.split(":")[0]
            )
            
            prompt_builder = PromptBuilder(
                prompt_template_path,
                self.config.get('paths.test_parameters'),
                self.config.get('paths.existing_code')
            )
            
            # Combine all test cases into a single string
            test_cases_str = ""
            for test_case in test_cases:
                if test_cases_str:
                    test_cases_str += "\n\n"
                test_cases_str += str(test_case)
            
            pom_content = "\n\n".join(f"File: {k}\n{v}" for k, v in page_object_models.items())
            prompt = prompt_builder.build_prompt(
                None,  # No single test case ID for batch processing
                test_cases_str,  # All test cases as string
                dependent_uc_code, 
                pom_content
            )
            
            # Generate code with LLM
            llm_client = OllamaClient(model=model)
            response = llm_client.chat(prompt, temperature=self.config.get('processing.temperature', 0.0))
            
            self.logger.info(f"Generated batch code for use case {use_case_name} with {len(test_cases)} test cases")
            
            # Process and save code
            javascript_code_repair = JavascriptCodeRepair(
                use_case_name, 
                None,  # No specific test case ID for batch processing
                response.response
            )
            javascript_code_repair.extract_code_blocks()
            javascript_code_repair.fix_import_statements()
            
            output_path = os.path.join(self.config.get('paths.output_base'), processing_type, configuration, model.split(":")[0])
            javascript_code_repair.save_files_to_disk(output_path)
            
            # Save execution parameters
            folder_abs_path = os.path.join(output_path, use_case_name)
            os.makedirs(folder_abs_path, exist_ok=True)
            
            with open(os.path.join(folder_abs_path, f"{use_case_name}.json"), "w", encoding='utf-8') as f:
                f.write(json.dumps(asdict(response), indent=2))
            
            self.logger.info(f"Successfully processed batch for use case {use_case_name}")
            
        except Exception as e:
            self.logger.error(f"Error processing batch for use case {use_case_name}: {e}")
            raise
    
    def _process_use_case(self, use_case_name: str, test_case_names: Optional[List[str]], 
                         model: str, configuration: str, processing_type: str):
        """Process a single use case."""
        self.logger.info(f"Processing use case: {use_case_name} (type: {processing_type})")
        
        try:
            # Load test cases
            test_cases_folder = self.config.get('paths.test_cases_folder')
            test_cases = TestCaseParser.read_from_file(
                self._get_test_case_file_path(test_cases_folder, use_case_name)
            )
            
            # Filter test cases if specific ones are requested
            if test_case_names:
                test_cases = [tc for tc in test_cases if tc.test_case_id in test_case_names]
            
            if not test_cases:
                self.logger.warning(f"No test cases found for use case {use_case_name}")
                return
            
            # Prepare dependencies
            dependent_uc_code = self._prepare_dependencies(use_case_name, processing_type, configuration, model)
            
            # Load page object models
            page_object_models = self.page_object_model_processor.load(use_case_name)
            
            # Process based on processing type
            if processing_type == "single":
                # Process each test case individually
                for test_case in test_cases:
                    self._process_single_test_case(
                        test_case, use_case_name, dependent_uc_code, 
                        page_object_models, model, configuration, processing_type
                    )
            elif processing_type == "batch":
                # Process all test cases together
                self._process_batch_test_cases(
                    test_cases, use_case_name, dependent_uc_code,
                    page_object_models, model, configuration, processing_type
                )
            else:
                raise ValueError(f"Unknown processing type: {processing_type}")
            
            self.logger.info(f"Completed processing use case: {use_case_name}")
            
        except Exception as e:
            self.logger.error(f"Error processing use case {use_case_name}: {e}")
            raise
    
    def run(self, use_case_name: Optional[str] = None, test_case_names: Optional[List[str]] = None,
            model: Optional[str] = None, configuration: Optional[str] = None, 
            processing_type: Optional[str] = None):
        """Run the orchestrator."""
        
        # Set defaults from config
        model = model or self.config.get('models.default')
        configuration = configuration or self.config.get('processing.default_configuration')
        processing_type = processing_type or self.config.get('processing.default_type', 'single')
        
        self.logger.info(f"Starting orchestrator - use_case: {use_case_name}, "
                        f"test_cases: {test_case_names}, model: {model}, config: {configuration}, "
                        f"processing_type: {processing_type}")
        
        # Initialize dependencies
        self._load_dependency_graph()
        self._load_page_object_models()
        
        # Determine which use cases to process
        if use_case_name:
            use_cases_to_process = [use_case_name]
        else:
            use_cases_to_process = self._get_all_use_cases_in_dependency_order()
        
        # Process each use case
        for use_case in use_cases_to_process:
            try:
                self._process_use_case(use_case, test_case_names, model, configuration, processing_type)
            except Exception as e:
                self.logger.error(f"Failed to process use case {use_case}: {e}")
                if use_case_name:  # If specific use case requested, re-raise
                    raise
                # Otherwise, continue with next use case
                continue
        
        self.logger.info("Orchestrator execution completed")

# def main():
#     # Set up command line argument parser
#     parser = argparse.ArgumentParser(
#         description='GenE2E',
#         formatter_class=argparse.ArgumentDefaultsHelpFormatter
#     )
#     parser.add_argument("-uc", "--use_case_name", type=str, help="Name of the test case", default=None)
#     parser.add_argument("-tc", "--test_case_name", action='append', help="Specify a test case")
#     parser.add_argument("-m", "--model", type=str, help="Model", default="llama3.3")
#     parser.add_argument("-c", "--configuration", type=str, help="Configuration", default="zero_shot")
#     args = parser.parse_args()

#     use_case_name = args.use_case_name
#     test_case_names = args.test_case_name
#     model = args.model
#     configuration = args.configuration
#     model_name_short = model.split(":")[0]

def main():
    """Main function to run the orchestrator."""
    parser = argparse.ArgumentParser(
        description='Enhanced Test Code Generation Orchestrator',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    parser.add_argument(
        "-uc", "--use_case_name", 
        type=str, 
        help="Name of the use case (if not provided, processes all use cases in dependency order)",
        default=None
    )
    parser.add_argument(
        "-tc", "--test_case_name", 
        action='append', 
        help="Specify specific test case(s) to process"
    )
    parser.add_argument(
        "-m", "--model", 
        type=str, 
        help="LLM model to use (overrides config default)"
    )
    parser.add_argument(
        "-c", "--configuration", 
        type=str, 
        help="Processing configuration (overrides config default)"
    )
    parser.add_argument(
        "-pt", "--processing_type", 
        type=str, 
        choices=['single', 'batch'],
        help="Processing type: 'single' (process each test case individually) or 'batch' (process all test cases together)"
    )
    parser.add_argument(
        "--config", 
        type=str, 
        help="Path to configuration file", 
        default="config.yaml"
    )
    
    args = parser.parse_args()
    
    try:
        # Load configuration
        config = OrchestratorConfig(args.config)
        
        # Create and run orchestrator
        orchestrator = Orchestrator(config)
        orchestrator.run(
            use_case_name=args.use_case_name,
            test_case_names=args.test_case_name,
            model=args.model,
            configuration=args.configuration,
            processing_type=args.processing_type
        )
        
    except ConfigurationError as e:
        print(f"Configuration error: {e}")
        return 1
    except Exception as e:
        print(f"Orchestrator error: {e}")
        return 1
    
    return 0


if __name__ == "__main__":
    exit(main())