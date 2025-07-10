import pandas as pd
import numpy as np
import os
from pathlib import Path
import openpyxl
from scipy import stats
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
from evaluation.qualitative_data_plots import *
warnings.filterwarnings('ignore')

def extract_numeric_value(cell_value):
    """Extract numeric value from evaluation strings like '(4) Good'"""
    if pd.isna(cell_value) or cell_value == '' or cell_value is None:
        return np.nan
    
    # Convert to string if not already
    cell_str = str(cell_value).strip()
    
    # Check for empty string after stripping
    if cell_str == '' or cell_str.lower() == 'none':
        return np.nan
    
    # Extract number from parentheses
    if '(' in cell_str and ')' in cell_str:
        try:
            start = cell_str.find('(') + 1
            end = cell_str.find(')')
            return int(cell_str[start:end])
        except (ValueError, IndexError):
            return np.nan
    
    return np.nan

def calculate_fleiss_kappa(ratings_matrix):
    """
    Calculate Fleiss' Kappa for inter-rater reliability
    ratings_matrix: numpy array where rows are subjects and columns are raters
    """
    if ratings_matrix.shape[1] < 2:
        return np.nan
    
    # Remove rows with any NaN values
    clean_matrix = ratings_matrix[~np.isnan(ratings_matrix).any(axis=1)]
    
    if len(clean_matrix) == 0:
        return np.nan
    
    try:
        n, k = clean_matrix.shape  # n subjects, k raters
        
        # Categories (1-5 for Poor to Excellent)
        categories = [1, 2, 3, 4, 5]
        
        # Calculate proportion of pairs in each category
        P_j = np.zeros(len(categories))
        
        for j, cat in enumerate(categories):
            total_pairs = 0
            agreement_pairs = 0
            
            for i in range(n):
                ratings_for_subject = clean_matrix[i, :]
                count_cat = np.sum(ratings_for_subject == cat)
                total_pairs += k * (k - 1)
                agreement_pairs += count_cat * (count_cat - 1)
            
            if total_pairs > 0:
                P_j[j] = agreement_pairs / total_pairs
        
        # Calculate observed agreement
        P_o = np.sum(P_j)
        
        # Calculate expected agreement
        p_j = np.zeros(len(categories))
        total_ratings = n * k
        
        for j, cat in enumerate(categories):
            p_j[j] = np.sum(clean_matrix == cat) / total_ratings
        
        P_e = np.sum(p_j ** 2)
        
        # Calculate Fleiss' Kappa
        if P_e == 1:
            return np.nan
        
        kappa = (P_o - P_e) / (1 - P_e)
        return kappa
        
    except Exception as e:
        print(f"    Error in Fleiss Kappa calculation: {str(e)}")
        return np.nan

def process_excel_files(base_path):
    """
    Process all Excel files according to the specified structure
    """
    base_path = Path(base_path)
    
    # Variable mapping
    variable_cells = {
        'Naming_coherence': 'B5',
        'Readability_Accessibility': 'B6',
        'Completeness_functional_coherence': 'B7',
        'Proper_interaction_with_DOM': 'B11',
        'Proper_import_statements': 'B12',
        'Reuse_existing_test_code': 'B13',
        'Usage_env_variables': 'B14',
        'Correct_use_Reporter_component': 'B15'
    }
    
    all_data = []
    configuration_tables = {}
    raw_ratings_data = []  # New: store individual ratings for box plots
    
    # Iterate through output folders (4 outputs)
    for output_folder in base_path.iterdir():
        if not output_folder.is_dir():
            continue
            
        output_name = output_folder.name
        print(f"Processing output: {output_name}")
        
        # Iterate through configuration subfolders (12 configurations)
        for config_folder in output_folder.iterdir():
            if not config_folder.is_dir():
                continue
                
            config_name = config_folder.name
            print(f"  Processing configuration: {config_name}")
            
            # Look for Excel files in the configuration folder
            excel_files = list(config_folder.glob("*.xlsx"))
            
            if not excel_files:
                print(f"    No Excel files found in {config_folder}")
                continue
            
            excel_file = excel_files[0]  # Take the first Excel file
            print(f"    Processing file: {excel_file.name}")
            
            try:
                # Load the Excel file
                workbook = openpyxl.load_workbook(excel_file)
                
                # Get expert sheets (excluding _Values sheet)
                expert_sheets = [sheet for sheet in workbook.sheetnames 
                               if not sheet.startswith('_')]
                
                if len(expert_sheets) == 0:
                    print(f"    No expert sheets found in {excel_file}")
                    continue
                
                # Initialize data structure for this configuration
                config_key = f"{output_name}_{config_name}"
                if config_key not in configuration_tables:
                    configuration_tables[config_key] = {
                        'output': output_name,
                        'configuration': config_name,
                        'data': {}
                    }
                
                # Process each variable
                for var_name, cell_ref in variable_cells.items():
                    expert_values = []
                    empty_experts = []
                    
                    # Extract values from each expert sheet
                    for expert_idx, sheet_name in enumerate(expert_sheets):
                        sheet = workbook[sheet_name]
                        cell_value = sheet[cell_ref].value
                        numeric_value = extract_numeric_value(cell_value)
                        expert_values.append(numeric_value)
                        
                        # Store individual ratings for box plots
                        if not pd.isna(numeric_value):
                            raw_ratings_data.append({
                                'output': output_name,
                                'configuration': config_name,
                                'variable': var_name,
                                'expert': sheet_name,
                                'rating': numeric_value
                            })
                        
                        # Track empty evaluations
                        if pd.isna(numeric_value):
                            empty_experts.append(sheet_name)
                    
                    # Report empty evaluations
                    if empty_experts:
                        print(f"    ⚠️  EMPTY EVALUATIONS found for {var_name}:")
                        print(f"       Output: {output_name}, Config: {config_name}")
                        print(f"       Missing experts: {', '.join(empty_experts)}")
                        print(f"       Cell: {cell_ref}, File: {excel_file.name}")
                    
                    # Count valid evaluations
                    valid_count = len([v for v in expert_values if not pd.isna(v)])
                    total_count = len(expert_values)
                    
                    if valid_count == 0:
                        print(f"    ❌ NO VALID EVALUATIONS for {var_name} in {output_name}/{config_name}")
                    elif valid_count < total_count:
                        print(f"    ⚠️  PARTIAL EVALUATIONS for {var_name}: {valid_count}/{total_count} experts")
                    
                    # Store the data
                    configuration_tables[config_key]['data'][var_name] = expert_values
                    
                    # Also store in the main data list for the aggregated table
                    all_data.append({
                        'output': output_name,
                        'configuration': config_name,
                        'variable': var_name,
                        'expert_1': expert_values[0] if len(expert_values) > 0 else np.nan,
                        'expert_2': expert_values[1] if len(expert_values) > 1 else np.nan,
                        'expert_3': expert_values[2] if len(expert_values) > 2 else np.nan,
                        'expert_4': expert_values[3] if len(expert_values) > 3 else np.nan,
                        'values': expert_values
                    })
                
                workbook.close()
                
            except Exception as e:
                print(f"    Error processing {excel_file}: {str(e)}")
                raise
    
    return all_data, configuration_tables, raw_ratings_data

def create_configuration_tables(configuration_tables):
    """Create individual tables for each configuration"""
    config_dfs = {}
    
    for config_key, config_data in configuration_tables.items():
        # Create DataFrame for this configuration
        rows = []
        
        for var_name, expert_values in config_data['data'].items():
            row = {'Variable': var_name}
            
            # Add expert columns with empty evaluation indicators
            for i, value in enumerate(expert_values, 1):
                if pd.isna(value):
                    row[f'Expert_{i}'] = 'EMPTY'
                else:
                    row[f'Expert_{i}'] = value
            
            # Add summary statistics
            valid_values = [v for v in expert_values if not pd.isna(v)]
            row['Valid_Count'] = len(valid_values)
            row['Total_Count'] = len(expert_values)
            row['Completion_Rate'] = f"{len(valid_values)}/{len(expert_values)}" if expert_values else "0/0"
            
            rows.append(row)
        
        config_df = pd.DataFrame(rows)
        config_df.insert(0, 'Output', config_data['output'])
        config_dfs[config_key] = config_df
    
    return config_dfs

def create_aggregated_table(all_data):
    """Create the main aggregated table with statistics"""
    # Convert to DataFrame
    df = pd.DataFrame(all_data)
    
    # Calculate statistics for each row
    stats_rows = []
    
    for _, row in df.iterrows():
        values = np.array(row['values'])
        valid_values = values[~np.isnan(values)]
        total_experts = len(values)
        valid_count = len(valid_values)
        
        if len(valid_values) == 0:
            stats_row = {
                'Configuration': row['configuration'],
                'Output': row['output'],
                'Variable': row['variable'],
                'Mean': np.nan,
                'Std_Dev': np.nan,
                'Min': np.nan,
                'Max': np.nan,
                'Median': np.nan,
                'Q1': np.nan,
                'Q3': np.nan,
                'Valid_Count': 0,
                'Total_Count': total_experts,
                'Completion_Rate': f"0/{total_experts}",
                'Missing_Evaluations': total_experts,
                'Fleiss_Kappa': np.nan
            }
        else:
            # Calculate Fleiss Kappa for this variable across all experts
            # We need to reshape the data for kappa calculation
            ratings_matrix = np.array([valid_values])  # Single subject (this config-output-var combination)
            
            # For proper Fleiss Kappa, we'd need multiple subjects, but we can calculate
            # a simplified version or use a different reliability measure
            fleiss_kappa = np.nan  # Will calculate properly in the violin plot section
            
            stats_row = {
                'Configuration': row['configuration'],
                'Output': row['output'],
                'Variable': row['variable'],
                'Mean': np.mean(valid_values),
                'Std_Dev': np.std(valid_values, ddof=1) if len(valid_values) > 1 else 0,
                'Min': np.min(valid_values),
                'Max': np.max(valid_values),
                'Median': np.median(valid_values),
                'Q1': np.percentile(valid_values, 25),
                'Q3': np.percentile(valid_values, 75),
                'Valid_Count': valid_count,
                'Total_Count': total_experts,
                'Completion_Rate': f"{valid_count}/{total_experts}",
                'Missing_Evaluations': total_experts - valid_count,
                'Fleiss_Kappa': fleiss_kappa
            }
        
        stats_rows.append(stats_row)
    
    return pd.DataFrame(stats_rows)

def create_configuration_metrics_summary(df_aggregated, kappa_df):
    """
    Create a summary table with configurations as rows and metrics as columns
    Each metric shows mean and std dev calculated over all outputs and experts
    """
    # Group by configuration and variable, then calculate overall stats
    config_metrics = []
    
    configurations = df_aggregated['Configuration'].unique()
    variables = df_aggregated['Variable'].unique()
    
    for config in configurations:
        config_data = df_aggregated[df_aggregated['Configuration'] == config]
        
        row = {'Configuration': config}
        
        for variable in variables:
            var_data = config_data[config_data['Variable'] == variable]
            
            if len(var_data) > 0:
                # Calculate mean and std across all outputs for this configuration-variable combination
                means = var_data['Mean'].dropna()
                
                if len(means) > 0:
                    overall_mean = means.mean()
                    overall_std = means.std() if len(means) > 1 else 0
                    
                    # Clean variable name for column headers
                    clean_var_name = variable.replace('_', ' ').title()
                    row[f'{clean_var_name}_Mean'] = round(overall_mean, 3)
                    row[f'{clean_var_name}_StdDev'] = round(overall_std, 3)
                else:
                    clean_var_name = variable.replace('_', ' ').title()
                    row[f'{clean_var_name}_Mean'] = np.nan
                    row[f'{clean_var_name}_StdDev'] = np.nan
            else:
                clean_var_name = variable.replace('_', ' ').title()
                row[f'{clean_var_name}_Mean'] = np.nan
                row[f'{clean_var_name}_StdDev'] = np.nan
        
        # Calculate overall configuration statistics
        config_means = config_data['Mean'].dropna()
        if len(config_means) > 0:
            row['Overall_Mean'] = round(config_means.mean(), 3)
            row['Overall_StdDev'] = round(config_means.std(), 3) if len(config_means) > 1 else 0
        else:
            row['Overall_Mean'] = np.nan
            row['Overall_StdDev'] = np.nan
        
        # Calculate Fleiss Kappa for this configuration across all variables
        config_kappa_values = []
        for variable in variables:
            kappa_row = kappa_df[kappa_df['Variable'] == variable]
            if len(kappa_row) > 0 and not pd.isna(kappa_row.iloc[0]['Fleiss_Kappa']):
                config_kappa_values.append(kappa_row.iloc[0]['Fleiss_Kappa'])
        
        if len(config_kappa_values) > 0:
            row['Average_Fleiss_Kappa'] = round(np.mean(config_kappa_values), 3)
        else:
            row['Average_Fleiss_Kappa'] = np.nan
        
        # Add completion statistics
        row['Total_Valid_Evaluations'] = config_data['Valid_Count'].sum()
        row['Total_Missing_Evaluations'] = config_data['Missing_Evaluations'].sum()
        row['Completion_Rate_Percent'] = round(
            (config_data['Valid_Count'].sum() / config_data['Total_Count'].sum() * 100) 
            if config_data['Total_Count'].sum() > 0 else 0, 2
        )
        
        config_metrics.append(row)
    
    return pd.DataFrame(config_metrics)

def create_violin_plot_tables(df_aggregated):
    """Create tables optimized for violin plots and box plots"""
    
    # Table 1: Data by Configuration (for comparing configurations)
    config_violin_data = []
    
    for config in df_aggregated['Configuration'].unique():
        config_data = df_aggregated[df_aggregated['Configuration'] == config]
        
        for _, row in config_data.iterrows():
            config_violin_data.append({
                'Configuration': config,
                'Variable': row['Variable'],
                'Output': row['Output'],
                'Mean': row['Mean'],
                'Value_Type': 'Mean'
            })
    
    config_violin_df = pd.DataFrame(config_violin_data)
    
    # Table 2: Data by Variable (for comparing variables)
    variable_violin_data = []
    
    for variable in df_aggregated['Variable'].unique():
        var_data = df_aggregated[df_aggregated['Variable'] == variable]
        
        for _, row in var_data.iterrows():
            variable_violin_data.append({
                'Variable': variable,
                'Configuration': row['Configuration'],
                'Output': row['Output'],
                'Mean': row['Mean'],
                'Std_Dev': row['Std_Dev'],
                'Min': row['Min'],
                'Max': row['Max']
            })
    
    variable_violin_df = pd.DataFrame(variable_violin_data)
    
    # Table 3: Raw values for detailed analysis
    raw_data = []
    
    for _, row in df_aggregated.iterrows():
        # Create multiple rows for box plot (simulating individual ratings)
        mean_val = row['Mean']
        std_val = row['Std_Dev']
        
        if not pd.isna(mean_val) and not pd.isna(std_val):
            # Generate sample points around the mean for visualization
            for i in range(int(row['Valid_Count'])):
                raw_data.append({
                    'Configuration': row['Configuration'],
                    'Output': row['Output'],
                    'Variable': row['Variable'],
                    'Rating': mean_val,  # In real scenario, use individual expert ratings
                    'Expert_ID': f'Expert_{i+1}',
                    'Has_Data': True
                })
            
            # Add entries for missing evaluations
            for i in range(int(row['Missing_Evaluations'])):
                raw_data.append({
                    'Configuration': row['Configuration'],
                    'Output': row['Output'],
                    'Variable': row['Variable'],
                    'Rating': np.nan,
                    'Expert_ID': f'Missing_{i+1}',
                    'Has_Data': False
                })
    
    raw_violin_df = pd.DataFrame(raw_data)
    
    return config_violin_df, variable_violin_df, raw_violin_df

def calculate_fleiss_kappa_by_variable(all_data):
    """Calculate Fleiss Kappa for each variable across all configurations and outputs"""
    kappa_results = []
    
    # Group by variable
    df = pd.DataFrame(all_data)
    
    for variable in df['variable'].unique():
        var_data = df[df['variable'] == variable]
        
        # Find the maximum number of experts across all configurations
        max_experts = 0
        valid_rows = []
        config_output_names = []
        
        for _, row in var_data.iterrows():
            values = np.array(row['values'])
            if len(values) >= 2:  # Need at least 2 raters
                max_experts = max(max_experts, len(values))
                valid_rows.append(row)
                config_output_names.append(f"{row['configuration']}_{row['output']}")
        
        if len(valid_rows) > 0 and max_experts > 1:
            # Create matrix with consistent dimensions
            ratings_matrix = []
            
            for row in valid_rows:
                values = np.array(row['values'])
                # Pad with NaN if necessary to make all rows the same length
                if len(values) < max_experts:
                    padded_values = np.full(max_experts, np.nan)
                    padded_values[:len(values)] = values
                    ratings_matrix.append(padded_values)
                else:
                    ratings_matrix.append(values[:max_experts])  # Truncate if longer
            
            try:
                ratings_matrix = np.array(ratings_matrix)
                kappa = calculate_fleiss_kappa(ratings_matrix)
                
                kappa_results.append({
                    'Variable': variable,
                    'Fleiss_Kappa': kappa,
                    'N_Subjects': len(ratings_matrix),
                    'N_Raters': max_experts,
                    'Valid_Subjects': len(valid_rows)
                })
            except Exception as e:
                print(f"    ⚠️  Error calculating Fleiss Kappa for {variable}: {str(e)}")
                kappa_results.append({
                    'Variable': variable,
                    'Fleiss_Kappa': np.nan,
                    'N_Subjects': len(valid_rows),
                    'N_Raters': max_experts,
                    'Valid_Subjects': len(valid_rows)
                })
        else:
            print(f"    ⚠️  Insufficient data for Fleiss Kappa calculation for {variable}")
            kappa_results.append({
                'Variable': variable,
                'Fleiss_Kappa': np.nan,
                'N_Subjects': len(valid_rows),
                'N_Raters': max_experts,
                'Valid_Subjects': len(valid_rows)
            })
    
    return pd.DataFrame(kappa_results)

def main(base_path, output_file, create_plots=True):
    """Main processing function"""
    print("Starting Excel file processing...")
    
    # Process all Excel files
    all_data, configuration_tables, raw_ratings_data = process_excel_files(base_path)
    
    if not all_data:
        print("No data found. Please check the file structure and paths.")
        return
    
    print(f"Processed {len(all_data)} data points")
    
    # Create different table types
    print("Creating configuration tables...")
    config_dfs = create_configuration_tables(configuration_tables)
    
    print("Creating aggregated table...")
    df_aggregated = create_aggregated_table(all_data)
    
    print("Creating violin plot tables...")
    config_violin_df, variable_violin_df, raw_violin_df = create_violin_plot_tables(df_aggregated)
    
    print("Calculating Fleiss Kappa by variable...")
    try:
        kappa_df = calculate_fleiss_kappa_by_variable(all_data)
    except Exception as e:
        print(f"    ⚠️  Error in Fleiss Kappa calculation: {str(e)}")
        print("    Creating empty Kappa results...")
        kappa_df = pd.DataFrame({
            'Variable': df_aggregated['Variable'].unique(),
            'Fleiss_Kappa': [np.nan] * len(df_aggregated['Variable'].unique()),
            'N_Subjects': [0] * len(df_aggregated['Variable'].unique()),
            'N_Raters': [0] * len(df_aggregated['Variable'].unique()),
            'Valid_Subjects': [0] * len(df_aggregated['Variable'].unique())
        })
    
    print("Creating configuration metrics summary...")
    config_metrics_df = create_configuration_metrics_summary(df_aggregated, kappa_df)
    
    # Create box plots if requested
    if create_plots:
        print("Creating box plots...")
        try:
            create_publication_expert_plots(all_data, "plots/qualitative")
        except Exception as e:
            print(f"    ⚠️  Error creating box plots: {str(e)}")
            print("    Continuing with data export...")
    
    # Save all tables to Excel file
    print(f"Saving results to {output_file}...")
    
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # Main aggregated table
        df_aggregated.to_excel(writer, sheet_name='Aggregated_Statistics', index=False)
        
        # Configuration metrics summary table
        config_metrics_df.to_excel(writer, sheet_name='Configuration_Metrics', index=False)
        
        # Individual configuration tables
        for config_name, config_df in config_dfs.items():
            # Truncate sheet name if too long
            sheet_name = config_name[:31] if len(config_name) > 31 else config_name
            config_df.to_excel(writer, sheet_name=sheet_name, index=False)
        
        # Violin plot tables
        config_violin_df.to_excel(writer, sheet_name='Config_Violin_Data', index=False)
        variable_violin_df.to_excel(writer, sheet_name='Variable_Violin_Data', index=False)
        raw_violin_df.to_excel(writer, sheet_name='Raw_Data_Violin', index=False)
        
        # Raw ratings data for box plots
        if raw_ratings_data:
            pd.DataFrame(raw_ratings_data).to_excel(writer, sheet_name='Raw_Ratings_Data', index=False)
        
        # Fleiss Kappa results
        kappa_df.to_excel(writer, sheet_name='Fleiss_Kappa_Results', index=False)
        
        # Summary statistics by configuration
        config_summary = df_aggregated.groupby('Configuration').agg({
            'Mean': ['mean', 'std', 'min', 'max'],
            'Std_Dev': ['mean', 'std'],
            'Valid_Count': 'sum',
            'Missing_Evaluations': 'sum'
        }).round(3)
        config_summary.to_excel(writer, sheet_name='Configuration_Summary')
        
        # Summary statistics by variable
        variable_summary = df_aggregated.groupby('Variable').agg({
            'Mean': ['mean', 'std', 'min', 'max'],
            'Std_Dev': ['mean', 'std'],
            'Valid_Count': 'sum',
            'Missing_Evaluations': 'sum'
        }).round(3)
        variable_summary.to_excel(writer, sheet_name='Variable_Summary')
        
        # Data completeness report
        completeness_report = df_aggregated.groupby(['Configuration', 'Output']).agg({
            'Valid_Count': 'sum',
            'Total_Count': 'sum',
            'Missing_Evaluations': 'sum'
        }).reset_index()
        completeness_report['Overall_Completion_Rate'] = (
            completeness_report['Valid_Count'] / completeness_report['Total_Count'] * 100
        ).round(2)
        completeness_report.to_excel(writer, sheet_name='Data_Completeness_Report', index=False)
    
    print("Processing complete!")
    print(f"Results saved to: {output_file}")
    print(f"Total configurations processed: {len(config_dfs)}")
    print(f"Total variables: {len(df_aggregated['Variable'].unique())}")
    print(f"Total outputs: {len(df_aggregated['Output'].unique())}")
    
    # Print summary of missing data
    total_evaluations = df_aggregated['Total_Count'].sum()
    total_missing = df_aggregated['Missing_Evaluations'].sum()
    completion_rate = ((total_evaluations - total_missing) / total_evaluations * 100) if total_evaluations > 0 else 0
    
    print(f"\n📊 DATA COMPLETENESS SUMMARY:")
    print(f"Total expected evaluations: {total_evaluations}")
    print(f"Missing evaluations: {total_missing}")
    print(f"Overall completion rate: {completion_rate:.2f}%")
    
    if total_missing > 0:
        print(f"\n⚠️  WARNING: {total_missing} evaluations are missing!")
        print("Check the 'Data_Completeness_Report' sheet for details.")
        
        # Show most problematic configurations
        problematic = df_aggregated[df_aggregated['Missing_Evaluations'] > 0].sort_values('Missing_Evaluations', ascending=False)
        if len(problematic) > 0:
            print(f"\nMost incomplete evaluations:")
            for _, row in problematic.head(5).iterrows():
                print(f"  - {row['Configuration']}/{row['Output']}/{row['Variable']}: {row['Missing_Evaluations']} missing")
    else:
        print("\n✅ All evaluations are complete!")
    
    # Print box plot summary
    if create_plots and raw_ratings_data:
        print(f"\n📈 BOX PLOTS SUMMARY:")
        print(f"Box plots created for {len(set([r['variable'] for r in raw_ratings_data]))} variables")
        print("Check the 'plots' directory for visualization files")
        print("Individual plots saved as: boxplot_[variable_name].png")
        print("Overall plot saved as: boxplot_overall.png")

# Example usage
if __name__ == "__main__":
    # Set your base path here - the folder containing the 4 output folders
    BASE_PATH = "./Evaluation/QualitativeEvaluation/TemplateExperts"  # Update this path
    OUTPUT_FILE = "evaluation_analysis_results.xlsx"
    
    # Run the analysis with box plots
    main(BASE_PATH, OUTPUT_FILE, create_plots=True)