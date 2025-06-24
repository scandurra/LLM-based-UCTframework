import os
import json
import pandas as pd
import numpy as np
from pathlib import Path
import re
from typing import Dict, List, Tuple, Any

configuration_paths = [
    "SingleProcessing\\ZeroShot\\Llama3.3",
    "SingleProcessing\\ZeroShot\\Codellama",
    "SingleProcessing\\OneShot\\Llama3.3",
    "SingleProcessing\\OneShot\\Codellama",
    "SingleProcessing\\FewShot\\Llama3.3",
    "SingleProcessing\\FewShot\\Codellama",
    "BatchProcessing\\ZeroShot\\Llama3.3",
    "BatchProcessing\\ZeroShot\\Codellama",
    "BatchProcessing\\OneShot\\Llama3.3",
    "BatchProcessing\\OneShot\\Codellama",
    "BatchProcessing\\FewShot\\Llama3.3",
    "BatchProcessing\\FewShot\\Codellama"
]

def get_configuration_by_path(path:str):
    print(f"Getting config for path {path}")
    for i in range(12):
        configuration_id = i+1
        if configuration_paths[i] in path or configuration_paths[i].replace("\\", "/") in path:
            return configuration_id

    raise Exception(f"Not found: {path}")

def process_json_files_to_excel(root_directory: str, output_file: str = "execution_results.xlsx"):
    """
    Process JSON files from a structured directory and create an Excel file with analysis.
    
    Args:
        root_directory (str): Root directory containing the structured folders
        output_file (str): Output Excel file name
    """
    
    def extract_configuration_info(file_path: Path) -> Tuple[str, str, str, str, int]:
        """Extract configuration information from file path."""
        parts = file_path.parts
        # Find the relevant parts (last 4 directories before the file)
        processing_type = parts[-5]
        prompt_technique = parts[-4] 
        model = parts[-3]
        test_case = parts[-2]
        
        print(f"Processing type {processing_type} - {prompt_technique} - {model} - {test_case}")

        # Create configuration ID (you may need to adjust this logic based on your specific mapping)
        config_combinations = []
        for root, dirs, files in os.walk(root_directory):
            if files and any(f.endswith('.json') for f in files):
                path_parts = Path(root).parts
                if len(path_parts) >= 4:
                    config = (path_parts[-4], path_parts[-3], path_parts[-2], path_parts[-1])
                    if config not in config_combinations:
                        config_combinations.append(config)
        
        config_combinations.sort()  # Ensure consistent ordering
        try:
            config_id = config_combinations.index((processing_type, prompt_technique, model, test_case)) + 1
        except ValueError:
            config_id = len(config_combinations) + 1
            
        return processing_type, prompt_technique, model, test_case, config_id
    
    def parse_filename(filename: str) -> Tuple[str, bool, str]:
        """
        Parse filename to extract use case info.
        Returns: (use_case, is_batch, test_case_id)
        """
        # Remove .json extension
        name = filename.replace('.json', '')
        
        # Check if it's batch processing (UC*.json) or single test case (UC*_TC*.json)
        if '_TC' in name:
            # Single test case: UC*_TC*
            parts = name.split('_TC')
            use_case = parts[0]
            test_case_id = f"TC{parts[1]}"
            return use_case, False, test_case_id
        else:
            # Batch processing: UC*
            return name, True, ""
    
    def load_json_data(file_path: Path) -> Dict[str, Any]:
        """Load and validate JSON data."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Validate required fields
            required_fields = ['n_tokens_prompt', 'n_tokens_response', 'time']
            for field in required_fields:
                if field not in data:
                    print(f"Warning: {field} not found in {file_path}")
                    data[field] = None
                    
            return data
        except (json.JSONDecodeError, FileNotFoundError) as e:
            print(f"Error reading {file_path}: {e}")
            return {}
    
    # Data collection
    all_data = []
    configurations = {}
    
    # Walk through directory structure
    for root, dirs, files in os.walk(root_directory):
        json_files = [f for f in files if f.endswith('.json')]
        
        if not json_files:
            continue
            
        current_path = Path(root)
        
        # Skip if not deep enough (should have at least 4 levels)
        if len(current_path.parts) < 4:
            continue
            
        try:
            config_id = get_configuration_by_path(str(current_path))
            
            if config_id not in configurations:
                configurations[config_id] = {
                    'data': []
                }
            
            # Process each JSON file
            for json_file in json_files:
                file_path = current_path / json_file
                json_data = load_json_data(file_path)
                
                if not json_data:
                    continue
                
                use_case, is_batch, test_case_id = parse_filename(json_file)
                
                row_data = {
                    'config_id': config_id,
                    'use_case': use_case,
                    'is_batch': is_batch,
                    'test_case_id': test_case_id,
                    'row_identifier': use_case if is_batch else f"{use_case}_{test_case_id}",
                    'n_tokens_prompt': json_data.get('n_tokens_prompt'),
                    'n_tokens_response': json_data.get('n_tokens_response'),
                    'time': int(json_data.get('time')) / 10.0**9,
                    'file_path': str(file_path)
                }
                
                all_data.append(row_data)
                configurations[config_id]['data'].append(row_data)
                
        except Exception as e:
            print(f"Error processing directory {root}: {e}")
            raise
    
    configurations = dict(sorted(configurations.items()))

    # Create Excel writer
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        
        # Create individual configuration sheets
        for config_id, config_info in configurations.items():
            if not config_info['data']:
                continue
                
            # Create DataFrame for this configuration
            config_df = pd.DataFrame(config_info['data'])
            print(config_df.to_string())


            # Pivot data to get the desired format
            sheet_data = []
            for _, row in config_df.iterrows():
                sheet_data.append({
                    'Test_Case': row['row_identifier'],
                    'n_tokens_prompt': row['n_tokens_prompt'],
                    'n_tokens_response': row['n_tokens_response'],
                    'time': row['time']
                })
            
            sheet_df = pd.DataFrame(sheet_data)
            sheet_df = sheet_df.drop_duplicates(subset=['Test_Case'])
            sheet_df = sheet_df.set_index('Test_Case')
            
            # Write to sheet
            sheet_name = f"Config_{config_id}"[:31]  # Excel sheet name limit
            sheet_df.to_excel(writer, sheet_name=sheet_name)
        
        # Calculate statistics for each metric
        metrics = ['n_tokens_prompt', 'n_tokens_response', 'time']
        

        for metric in metrics:
            
            # Create summary sheet
            summary_data = []
            
            for config_id, config_info in configurations.items():
                if not config_info['data']:
                    continue
                    
                config_df = pd.DataFrame(config_info['data'])                
                
                row_summary = {
                    'Configuration': config_id,
                    'Total_Files': len(config_df)
                }
            
            
                values = pd.to_numeric(config_df[metric], errors='coerce').dropna()
                
                if len(values) > 0:
                    row_summary.update({
                        f'{metric}_mean': values.mean(),
                        f'{metric}_median': values.median(),
                        f'{metric}_std': values.std(),
                        f'{metric}_min': values.min(),
                        f'{metric}_max': values.max(),
                        f'{metric}_q25': values.quantile(0.25),
                        f'{metric}_q75': values.quantile(0.75),
                        f'{metric}_count': len(values),
                        f'{metric}_total': values.sum()
                    })
                else:
                    row_summary.update({
                        f'{metric}_mean': np.nan,
                        f'{metric}_median': np.nan,
                        f'{metric}_std': np.nan,
                        f'{metric}_min': np.nan,
                        f'{metric}_max': np.nan,
                        f'{metric}_q25': np.nan,
                        f'{metric}_q75': np.nan,
                        f'{metric}_count': 0,
                        f'{metric}_total': 0
                    })
            
                summary_data.append(row_summary)
        
            # Create and write summary DataFrame
            summary_df = pd.DataFrame(summary_data)
            summary_df = summary_df.sort_values('Configuration')
            summary_df.to_excel(writer, sheet_name=f'Summary_{metric}', index=False)
        
        # Create a detailed data sheet for reference
        if all_data:
            all_df = pd.DataFrame(all_data)
            all_df.to_excel(writer, sheet_name='Raw_Data', index=False)
    
    print(f"Excel file '{output_file}' created successfully!")
    print(f"Processed configurations: {list(configurations.keys())}")
    print(f"Total JSON files processed: {len(all_data)}")
    
    return output_file

# Example usage
if __name__ == "__main__":
    # Replace with your actual root directory path
    root_dir = "./Evaluation/Dataset"
    output_filename = "execution_analysis_results.xlsx"
    
    # Process the files
    process_json_files_to_excel(root_dir, output_filename)