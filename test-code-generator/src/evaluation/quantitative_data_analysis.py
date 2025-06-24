import pandas as pd
import os
from pathlib import Path
import numpy as np

def process_configuration_files(base_folder_path, output_file='analysis_results.xlsx'):
    """
    Process Excel files from multiple configuration folders and generate analysis tables.
    
    Args:
        base_folder_path (str): Path to the folder containing configuration subfolders
        output_file (str): Name of the output Excel file
    
    Returns:
        dict: Dictionary containing processed data for each configuration
    """
    
    base_path = Path(base_folder_path)
    configuration_data = {}
    all_configurations_summary = []
    
    # Get all subdirectories (configurations)
    config_folders = [f for f in base_path.iterdir() if f.is_dir()]
    config_folders.sort()  # Sort for consistent ordering
    
    print(f"Found {len(config_folders)} configuration folders")
    
    # Process each configuration folder
    for config_folder in config_folders:
        config_name = config_folder.name
        print(f"Processing configuration: {config_name}")
        
        # Get all Excel files in the configuration folder
        excel_files = list(config_folder.glob('*.xlsx')) + list(config_folder.glob('*.xls'))
        excel_files.sort()  # Sort for consistent ordering
        
        if not excel_files:
            print(f"Warning: No Excel files found in {config_name}")
            continue
        
        # Define specific cell locations for metrics
        metric_cells = {
            'compilation_success': 'B5',
            'execution_without_error': 'B6', 
            'test_pass': 'B7',
            'BLEU_score': 'B11',
            'Code_BLEU': 'B12',
            'cosine_similarity': 'B13'
        }
        
        # Read all Excel files for this configuration
        config_data = []
        output_names = []
        
        for excel_file in excel_files:
            try:
                # Read the Excel file - load the first sheet without headers
                df = pd.read_excel(excel_file, header=None, sheet_name=0)
                
                # Get the output name (filename without extension)
                output_name = excel_file.stem
                output_names.append(output_name)
                
                # Extract metrics from specific cells
                metrics_dict = {}
                for metric_name, cell_location in metric_cells.items():
                    try:
                        # Convert cell location (e.g., 'B5') to row/column indices
                        col_letter = cell_location[0]  # e.g., 'B'
                        row_num = int(cell_location[1:]) - 1  # e.g., 4 (0-indexed)
                        col_num = ord(col_letter.upper()) - ord('A')  # Convert A=0, B=1, etc.
                        
                        # Extract value from the specific cell
                        if row_num < len(df) and col_num < len(df.columns):
                            value = df.iloc[row_num, col_num]
                            
                            # Handle Yes/No values for the first three metrics
                            if metric_name in ['compilation_success', 'execution_without_error', 'test_pass']:
                                if pd.isna(value):
                                    metrics_dict[metric_name] = 'Unknown'
                                elif str(value).lower() in ['yes', 'y', '1', 'true', 'pass']:
                                    metrics_dict[metric_name] = 'Yes'
                                elif str(value).lower() in ['no', 'n', '0', 'false', 'fail']:
                                    metrics_dict[metric_name] = 'No'
                                else:
                                    metrics_dict[metric_name] = str(value)
                            else:
                                # For numeric metrics (BLEU scores, cosine similarity)
                                if pd.isna(value):
                                    metrics_dict[metric_name] = np.nan
                                else:
                                    try:
                                        metrics_dict[metric_name] = float(value)
                                    except (ValueError, TypeError):
                                        print(f"Warning: Could not convert {value} to float for {metric_name} in {excel_file.name}")
                                        metrics_dict[metric_name] = np.nan
                        else:
                            print(f"Warning: Cell {cell_location} is out of range in {excel_file.name}")
                            metrics_dict[metric_name] = np.nan if metric_name not in ['compilation_success', 'execution_without_error', 'test_pass'] else 'Unknown'
                            
                    except Exception as cell_error:
                        print(f"Error reading cell {cell_location} from {excel_file.name}: {str(cell_error)}")
                        metrics_dict[metric_name] = np.nan if metric_name not in ['compilation_success', 'execution_without_error', 'test_pass'] else 'Unknown'
                
                config_data.append(metrics_dict)
                
            except Exception as e:
                print(f"Error reading {excel_file}: {str(e)}")
                continue
        
        if not config_data:
            print(f"Warning: No valid data found for configuration {config_name}")
            continue
        
        # Create DataFrame for this configuration
        config_df = pd.DataFrame(config_data, index=output_names)
        configuration_data[config_name] = config_df
        
        # Calculate summary statistics for this configuration
        # Separate handling for categorical (Yes/No) and numeric metrics
        numeric_metrics = ['BLEU_score', 'Code_BLEU', 'cosine_similarity']
        categorical_metrics = ['compilation_success', 'execution_without_error', 'test_pass']
        
        summary_stats = {'Configuration': config_name}
        
        # Handle numeric metrics with standard statistics
        if numeric_metrics:
            numeric_df = config_df[numeric_metrics].select_dtypes(include=[np.number])
            if not numeric_df.empty:
                summary_stats.update(numeric_df.mean().add_suffix('_mean').to_dict())
                summary_stats.update(numeric_df.std().add_suffix('_std').to_dict())
                summary_stats.update(numeric_df.min().add_suffix('_min').to_dict())
                summary_stats.update(numeric_df.max().add_suffix('_max').to_dict())
        
        # Handle categorical metrics with counts, percentages, and success rates
        for cat_metric in categorical_metrics:
            if cat_metric in config_df.columns:
                value_counts = config_df[cat_metric].value_counts()
                total_count = len(config_df[cat_metric].dropna())
                
                # Add counts
                for value, count in value_counts.items():
                    summary_stats[f'{cat_metric}_{value}_count'] = count
                    summary_stats[f'{cat_metric}_{value}_percent'] = (count / total_count * 100) if total_count > 0 else 0
                
                # Calculate and add success rate (percentage of "Yes" responses)
                yes_count = value_counts.get('Yes', 0)
                success_rate = (yes_count / total_count * 100) if total_count > 0 else 0
                summary_stats[f'{cat_metric}_success_rate'] = success_rate
                
                # Add total count
                summary_stats[f'{cat_metric}_total_count'] = total_count
        
        all_configurations_summary.append(summary_stats)
    
    # Create summary DataFrame with all configurations
    summary_df = pd.DataFrame(all_configurations_summary)
    summary_df.set_index('Configuration', inplace=True)
    
    # Save all results to Excel file
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Save individual configuration tables
        for config_name, config_df in configuration_data.items():
            # Clean sheet name (Excel sheet names have limitations)
            sheet_name = config_name[:31]  # Excel sheet names max 31 chars
            config_df.to_excel(writer, sheet_name=sheet_name)
        
        # Save summary table
        summary_df.to_excel(writer, sheet_name='Summary_All_Configs')
        
        # Create a more readable summary with separate sheets for each statistic
        numeric_metrics = ['BLEU_score', 'Code_BLEU', 'cosine_similarity']
        
        # Create summary sheets for numeric metrics
        for stat in ['mean', 'std', 'min', 'max']:
            stat_columns = [col for col in summary_df.columns if col.endswith(f'_{stat}')]
            if stat_columns:
                stat_df = summary_df[stat_columns].copy()
                stat_df.columns = [col.replace(f'_{stat}', '') for col in stat_df.columns]
                stat_df.to_excel(writer, sheet_name=f'Numeric_{stat.upper()}')
        
        # Create summary sheet for categorical metrics (Yes/No counts, percentages, and success rates)
        categorical_columns = [col for col in summary_df.columns if any(cat in col for cat in ['compilation_success', 'execution_without_error', 'test_pass'])]
        if categorical_columns:
            cat_df = summary_df[categorical_columns].copy()
            cat_df.to_excel(writer, sheet_name='Categorical_Summary')
        
        # Create a dedicated success rates summary sheet
        success_rate_columns = [col for col in summary_df.columns if col.endswith('_success_rate')]
        if success_rate_columns:
            success_df = summary_df[success_rate_columns].copy()
            success_df.columns = [col.replace('_success_rate', '') for col in success_df.columns]
            success_df.to_excel(writer, sheet_name='Success_Rates')
    
    print(f"Analysis complete! Results saved to {output_file}")
    print(f"Generated {len(configuration_data)} configuration tables")
    print(f"Summary table includes {len(summary_df)} configurations")
    
    # Print success rates summary
    success_rate_columns = [col for col in summary_df.columns if col.endswith('_success_rate')]
    if success_rate_columns:
        print(f"\n=== SUCCESS RATES SUMMARY ===")
        for config in summary_df.index:
            print(f"\nConfiguration: {config}")
            for col in success_rate_columns:
                metric_name = col.replace('_success_rate', '').replace('_', ' ').title()
                rate = summary_df.loc[config, col]
                print(f"  {metric_name}: {rate:.1f}%")
    
    return configuration_data, summary_df

def print_summary_info(configuration_data, summary_df):
    """Print summary information about the processed data."""
    print("\n=== PROCESSING SUMMARY ===")
    print(f"Total configurations processed: {len(configuration_data)}")
    
    for config_name, config_df in configuration_data.items():
        print(f"\nConfiguration '{config_name}':")
        print(f"  - Outputs: {len(config_df)}")
        print(f"  - Metrics: {list(config_df.columns)}")
        
        # Show success rates for this configuration
        categorical_metrics = ['compilation_success', 'execution_without_error', 'test_pass']
        for metric in categorical_metrics:
            if metric in config_df.columns:
                yes_count = (config_df[metric] == 'Yes').sum()
                total_count = len(config_df[metric].dropna())
                success_rate = (yes_count / total_count * 100) if total_count > 0 else 0
                print(f"  - {metric.replace('_', ' ').title()} Rate: {success_rate:.1f}% ({yes_count}/{total_count})")
    
    print(f"\nSummary table shape: {summary_df.shape}")
    print(f"Available statistics: mean, std, min, max for numeric metrics")
    print(f"Available statistics: counts, percentages, success rates for categorical metrics")

# Example usage
if __name__ == "__main__":
    # Set your folder path here
    folder_path = "./Evaluation/QuantitativeEvaluation"  # Replace with your actual folder path
    output_filename = "quantitative_analysis_results.xlsx"
    
    # Process the files
    try:
        config_data, summary = process_configuration_files(folder_path, output_filename)
        print_summary_info(config_data, summary)
        
        # Optional: Display first few rows of summary
        print("\n=== SUMMARY TABLE PREVIEW ===")
        print(summary.head())
        
    except FileNotFoundError:
        print(f"Error: Folder '{folder_path}' not found. Please check the path.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Additional utility functions

def load_and_preview_results(excel_file):
    """Load and preview the generated results."""
    try:
        # Load all sheets
        excel_data = pd.read_excel(excel_file, sheet_name=None)
        
        print(f"Excel file '{excel_file}' contains {len(excel_data)} sheets:")
        for sheet_name in excel_data.keys():
            print(f"  - {sheet_name}: {excel_data[sheet_name].shape}")
        
        return excel_data
    
    except FileNotFoundError:
        print(f"File '{excel_file}' not found.")
        return None

def customize_cell_locations(base_folder_path, custom_metric_cells, output_file='custom_analysis_results.xlsx'):
    """
    Customizable version that allows you to specify different cell locations.
    
    Args:
        base_folder_path (str): Path to base folder
        custom_metric_cells (dict): Dictionary mapping metric names to cell locations
                                   e.g., {'metric1': 'A1', 'metric2': 'B5'}
        output_file (str): Output Excel file name
    """
    
    base_path = Path(base_folder_path)
    configuration_data = {}
    all_configurations_summary = []
    
    # Get all subdirectories (configurations)
    config_folders = [f for f in base_path.iterdir() if f.is_dir()]
    config_folders.sort()
    
    print(f"Found {len(config_folders)} configuration folders")
    print(f"Using custom cell locations: {custom_metric_cells}")
    
    # Process each configuration folder
    for config_folder in config_folders:
        config_name = config_folder.name
        print(f"Processing configuration: {config_name}")
        
        # Get all Excel files in the configuration folder
        excel_files = list(config_folder.glob('*.xlsx')) + list(config_folder.glob('*.xls'))
        excel_files.sort()
        
        if not excel_files:
            print(f"Warning: No Excel files found in {config_name}")
            continue
        
        # Read all Excel files for this configuration
        config_data = []
        output_names = []
        
        for excel_file in excel_files:
            try:
                # Read the Excel file - load without headers
                df = pd.read_excel(excel_file, header=None, sheet_name=0)
                
                # Get the output name (filename without extension)
                output_name = excel_file.stem
                output_names.append(output_name)
                
                # Extract metrics from specified cells
                metrics_dict = {}
                for metric_name, cell_location in custom_metric_cells.items():
                    try:
                        # Handle multi-character column names (e.g., 'AA5', 'AB10')
                        col_letters = ''.join([c for c in cell_location if c.isalpha()])
                        row_num = int(''.join([c for c in cell_location if c.isdigit()])) - 1
                        
                        # Convert column letters to number (A=0, B=1, ..., AA=26, AB=27, etc.)
                        col_num = 0
                        for i, letter in enumerate(reversed(col_letters.upper())):
                            col_num += (ord(letter) - ord('A') + 1) * (26 ** i)
                        col_num -= 1  # Convert to 0-indexed
                        
                        # Extract value from the specific cell
                        if row_num < len(df) and col_num < len(df.columns):
                            value = df.iloc[row_num, col_num]
                            
                            if pd.isna(value):
                                metrics_dict[metric_name] = np.nan
                            else:
                                # Try to convert to float, otherwise keep as string
                                try:
                                    metrics_dict[metric_name] = float(value)
                                except (ValueError, TypeError):
                                    metrics_dict[metric_name] = str(value)
                        else:
                            print(f"Warning: Cell {cell_location} is out of range in {excel_file.name}")
                            metrics_dict[metric_name] = np.nan
                            
                    except Exception as cell_error:
                        print(f"Error reading cell {cell_location} from {excel_file.name}: {str(cell_error)}")
                        metrics_dict[metric_name] = np.nan
                
                config_data.append(metrics_dict)
                
            except Exception as e:
                print(f"Error reading {excel_file}: {str(e)}")
                continue
        
        if not config_data:
            print(f"Warning: No valid data found for configuration {config_name}")
            continue
        
        # Create DataFrame for this configuration
        config_df = pd.DataFrame(config_data, index=output_names)
        configuration_data[config_name] = config_df
        
        # Calculate summary statistics
        summary_stats = {'Configuration': config_name}
        
        # Handle numeric and text columns separately
        numeric_cols = config_df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            summary_stats.update(config_df[numeric_cols].mean().add_suffix('_mean').to_dict())
            summary_stats.update(config_df[numeric_cols].std().add_suffix('_std').to_dict())
            summary_stats.update(config_df[numeric_cols].min().add_suffix('_min').to_dict())
            summary_stats.update(config_df[numeric_cols].max().add_suffix('_max').to_dict())
        
        all_configurations_summary.append(summary_stats)
    
    # Create summary DataFrame
    summary_df = pd.DataFrame(all_configurations_summary)
    summary_df.set_index('Configuration', inplace=True)
    
    # Save results
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Save individual configuration tables
        for config_name, config_df in configuration_data.items():
            sheet_name = config_name[:31]
            config_df.to_excel(writer, sheet_name=sheet_name)
        
        # Save summary table
        summary_df.to_excel(writer, sheet_name='Summary_All_Configs')
    
    print(f"Custom analysis complete! Results saved to {output_file}")
    return configuration_data, summary_df