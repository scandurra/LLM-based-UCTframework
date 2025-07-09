import pandas as pd
import os
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

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
    
    # Sort configurations as integers if possible, otherwise as strings
    def sort_key(folder):
        try:
            return (0, int(folder.name))  # Try to convert to integer
        except ValueError:
            return (1, folder.name)  # Fall back to string sorting
    
    config_folders.sort(key=sort_key)  # Sort for consistent ordering
    
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
                no_count = value_counts.get('No', 0)
                success_rate = (yes_count / total_count * 100) if total_count > 0 else 0
                summary_stats[f'{cat_metric}_success_rate'] = success_rate
                summary_stats[f'{cat_metric}_success_count'] = yes_count
                summary_stats[f'{cat_metric}_failure_count'] = no_count
                
                # Add total count
                summary_stats[f'{cat_metric}_total_count'] = total_count
        
        all_configurations_summary.append(summary_stats)
    
    # Create summary DataFrame with all configurations
    summary_df = pd.DataFrame(all_configurations_summary)
    summary_df.set_index('Configuration', inplace=True)
    
    # Add missing configurations with zero values
    missing_configs = ['2', '8', '10', '12']
    categorical_metrics = ['compilation_success', 'execution_without_error', 'test_pass']
    
    for missing_config in missing_configs:
        if missing_config not in summary_df.index:
            # Create zero entry for missing configuration
            zero_entry = {}
            for cat_metric in categorical_metrics:
                zero_entry[f'{cat_metric}_success_count'] = 0
                zero_entry[f'{cat_metric}_failure_count'] = 0
                zero_entry[f'{cat_metric}_success_rate'] = 0.0
                zero_entry[f'{cat_metric}_total_count'] = 0
                zero_entry[f'{cat_metric}_Yes_count'] = 0
                zero_entry[f'{cat_metric}_No_count'] = 0
                zero_entry[f'{cat_metric}_Yes_percent'] = 0.0
                zero_entry[f'{cat_metric}_No_percent'] = 0.0
            
            # Add the zero entry to summary_df
            summary_df.loc[missing_config] = zero_entry
    
    # Sort the summary dataframe by configuration names as integers
    def sort_index_key(config_name):
        try:
            return (0, int(config_name))  # Try to convert to integer
        except ValueError:
            return (1, config_name)  # Fall back to string sorting
    
    sorted_configs = sorted(summary_df.index, key=sort_index_key)
    summary_df = summary_df.reindex(sorted_configs)
    
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

def create_success_failure_plots(summary_df, output_folder='plots'):
    """
    Create three plots showing success/failure rates for each configuration.
    
    Args:
        summary_df (pd.DataFrame): Summary dataframe with success/failure counts
        output_folder (str): Folder to save plots
    """
    
    # Create output folder if it doesn't exist
    Path(output_folder).mkdir(exist_ok=True)
    
    # Set up the style - white background
    plt.style.use('default')
    plt.rcParams['figure.facecolor'] = 'white'
    plt.rcParams['axes.facecolor'] = 'white'
    
    # Define the metrics to plot
    metrics = {
        'compilation_success': 'Compilation Success',
        'execution_without_error': 'Execution Without Error', 
        'test_pass': 'Assertion Validity'
    }
    
    # Define labels for each metric
    metric_labels = {
        'compilation_success': {
            'success': 'Successfully compiled number',
            'failure': 'Non-successfully compiled number',
            'rate': 'Successfully compiled rate',
            'number': 'Number of compilations'
        },
        'execution_without_error': {
            'success': 'Successfully executed number',
            'failure': 'Non-successfully executed number', 
            'rate': 'Successfully executed rate',
            'number': 'Number of executions'
        },
        'test_pass': {
            'success': 'Successfully passed tests number',
            'failure': 'Non-successfully passed tests number',
            'rate': 'Successfully passed tests rate',
            'number': 'Number of assertion validities'
        }
    }
    
    for metric_key, metric_title in metrics.items():
        # Extract success and failure counts
        success_col = f'{metric_key}_success_count'
        failure_col = f'{metric_key}_failure_count'
        
        if success_col in summary_df.columns and failure_col in summary_df.columns:
            # Create the plot data - handle missing values as 0
            plot_data = pd.DataFrame({
                'Configuration': summary_df.index,
                'Success': summary_df[success_col].fillna(0).astype(int),
                'Failure': summary_df[failure_col].fillna(0).astype(int)
            })
            
            # Sort configurations as integers if possible
            def sort_config_key(config_name):
                try:
                    return (0, int(config_name))
                except ValueError:
                    return (1, config_name)
            
            # Sort the plot data by configuration names as integers
            plot_data['sort_key'] = plot_data['Configuration'].apply(sort_config_key)
            plot_data = plot_data.sort_values('sort_key').drop('sort_key', axis=1).reset_index(drop=True)
            
            # Calculate success rate for annotation
            plot_data['Total'] = plot_data['Success'] + plot_data['Failure']
            # Handle division by zero - if total is 0, success rate is 0
            plot_data['Success_Rate'] = np.where(
                plot_data['Total'] > 0,
                (plot_data['Success'] / plot_data['Total'] * 100).round(1),
                0.0
            )
            
            # Create the figure
            fig, ax = plt.subplots(figsize=(14, 8))
            
            # Set up bar positions
            x = np.arange(len(plot_data))
            width = 0.6
            
            # Get labels for this specific metric
            labels = metric_labels[metric_key]
            
            # Create stacked bars - success on top, failure below x-axis
            bars1 = ax.bar(x, plot_data['Success'], width, label=labels['success'], 
                          color='#FFA500', alpha=0.8)
            bars2 = ax.bar(x, -plot_data['Failure'], width, 
                          label=labels['failure'], color='#4682B4', alpha=0.8)
            
            # Set y-axis to show negative values for failures
            max_success = plot_data['Success'].max() if plot_data['Success'].max() > 0 else 100
            max_failure = plot_data['Failure'].max() if plot_data['Failure'].max() > 0 else 100
            ax.set_ylim(-max_failure * 1.1, max_success * 1.1)
            
            # Add success rate line
            ax2 = ax.twinx()
            line = ax2.plot(x, plot_data['Success_Rate'], 'ro-', linewidth=2, 
                           markersize=6, label=labels['rate'])
            
            # Align the right y-axis so that 0% aligns with y=0 (submission count)
            # Set the scale so that 100% aligns with the top of the success bars
            max_success = plot_data['Success'].max() if plot_data['Success'].max() > 0 else 100
            max_failure = plot_data['Failure'].max() if plot_data['Failure'].max() > 0 else 100
            
            # Calculate the range for proper alignment
            y_range = max_success * 1.1 + max_failure * 1.1
            
            # Set right y-axis limits to align 0% with y=0
            ax2.set_ylim(-100 * (max_failure * 1.1) / (max_success * 1.1), 100)
            ax2.set_ylabel(f'{labels["rate"]} (%)', fontsize=12)
            
            # Customize the main axis
            ax.set_xlabel('Configuration', fontsize=12, fontweight='bold')
            ax.set_ylabel(labels['number'], fontsize=12, fontweight='bold')
            ax.set_title(f'{metric_title} by Configuration', fontsize=14, fontweight='bold', pad=50)
            ax.set_xticks(x)
            ax.set_xticklabels(plot_data['Configuration'], rotation=45, ha='right')
            
            # Add value labels on bars (only if values > 0)
            for i, (bar1, bar2) in enumerate(zip(bars1, bars2)):
                # Success count on success bar (above x-axis)
                if plot_data['Success'].iloc[i] > 0:
                    ax.text(bar1.get_x() + bar1.get_width()/2, bar1.get_height()/2,
                           f'{int(plot_data["Success"].iloc[i])}',
                           ha='center', va='center', fontweight='bold', color='white')
                
                # Failure count on failure bar (below x-axis)
                if plot_data['Failure'].iloc[i] > 0:
                    ax.text(bar2.get_x() + bar2.get_width()/2, bar2.get_height()/2,
                           f'{int(plot_data["Failure"].iloc[i])}',
                           ha='center', va='center', fontweight='bold', color='white')
            
            # Add success rate annotations at the top of the dots
            for i in range(len(plot_data)):
                if plot_data['Total'].iloc[i] > 0:
                    ax2.annotate(f'{plot_data["Success_Rate"].iloc[i]:.2f}%',
                                xy=(i, plot_data['Success_Rate'].iloc[i]),
                                xytext=(0, 8), textcoords='offset points',
                                ha='center', va='bottom', fontweight='bold',
                                fontsize=10)
            
            # Add legends
            ax.legend(loc='lower left', bbox_to_anchor=(0, 1))
            ax2.legend(loc='lower right', bbox_to_anchor=(1, 1))
            
            # Add horizontal line at y=0 to separate success and failure
            ax.axhline(y=0, color='black', linewidth=0.8)
            
            # Add horizontal grid lines only
            ax.grid(True, alpha=0.3, axis='y', linestyle='-', linewidth=0.5)
            ax.set_axisbelow(True)  # Put grid behind bars
            
            # Remove spines except bottom and left
            ax.spines['top'].set_visible(False)
            ax.spines['right'].set_visible(False)
            ax2.spines['top'].set_visible(False)
            ax2.spines['left'].set_visible(False)
            
            # Adjust layout and save
            plt.tight_layout()
            
            # Save the plot
            filename = f'{metric_key}_analysis.png'
            filepath = Path(output_folder) / filename
            plt.savefig(filepath, dpi=300, bbox_inches='tight')
            print(f"Plot saved: {filepath}")
            
            plt.show()
            plt.close()
        else:
            print(f"Warning: Required columns not found for {metric_title}")

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


def create_violin_plots(configuration_data, output_folder='plots'):
    """
    Create three violin plots for BLEU, Code BLEU, and cosine similarity metrics.
    
    Args:
        configuration_data (dict): Dictionary containing processed data for each configuration
        output_folder (str): Folder to save plots
    """
    
    # Create output folder if it doesn't exist
    Path(output_folder).mkdir(exist_ok=True)
    
    # Set up the style
    plt.style.use('default')
    plt.rcParams['figure.facecolor'] = 'white'
    plt.rcParams['axes.facecolor'] = 'white'
    
    # Define metrics to plot
    metrics = {
        'BLEU_score': 'BLEU Score',
        'Code_BLEU': 'Code BLEU',
        'cosine_similarity': 'Cosine Similarity'
    }
    
    # Prepare data for violin plots
    all_configs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    
    for metric_key, metric_title in metrics.items():
        print(f"Creating violin plot for {metric_title}...")
        
        # Prepare data for this metric
        plot_data = []
        
        for config in all_configs:
            if config in configuration_data:
                # Get the metric values for this configuration
                config_df = configuration_data[config]
                if metric_key in config_df.columns:
                    # Get non-null values
                    values = config_df[metric_key].dropna()
                    
                    # Add each value to plot_data with its configuration
                    for value in values:
                        plot_data.append({
                            'Configuration': config,
                            'Value': value,
                            'Metric': metric_title
                        })
                else:
                    print(f"Warning: {metric_key} not found in configuration {config}")
            else:
                print(f"Warning: Configuration {config} not found in data")
        
        # Create DataFrame for plotting
        if plot_data:
            df_plot = pd.DataFrame(plot_data)
            
            # Create the violin plot
            fig, ax = plt.subplots(figsize=(16, 8))
            
            # Sort configurations numerically
            df_plot['Config_Num'] = df_plot['Configuration'].astype(int)
            df_plot = df_plot.sort_values('Config_Num')
            
            # Create violin plot
            violin_parts = ax.violinplot(
                [df_plot[df_plot['Configuration'] == config]['Value'].values 
                 for config in sorted(all_configs, key=int) 
                 if config in df_plot['Configuration'].values],
                positions=[int(config) for config in sorted(all_configs, key=int) 
                          if config in df_plot['Configuration'].values],
                widths=0.8,
                showmeans=True,
                showmedians=True,
                showextrema=True
            )
            
            # Customize violin colors
            colors = plt.cm.Set3(np.linspace(0, 1, 12))
            for i, pc in enumerate(violin_parts['bodies']):
                pc.set_facecolor(colors[i])
                pc.set_alpha(0.7)
                pc.set_edgecolor('black')
                pc.set_linewidth(0.5)
            
            # Customize other parts
            violin_parts['cmeans'].set_color('red')
            violin_parts['cmeans'].set_linewidth(2)
            violin_parts['cmedians'].set_color('blue')
            violin_parts['cmedians'].set_linewidth(2)
            violin_parts['cbars'].set_color('black')
            violin_parts['cmaxes'].set_color('black')
            violin_parts['cmins'].set_color('black')
            
            # Add individual data points as scatter
            for config in sorted(all_configs, key=int):
                if config in df_plot['Configuration'].values:
                    config_data = df_plot[df_plot['Configuration'] == config]['Value']
                    if len(config_data) > 0:
                        # Add jitter to x-coordinates for better visibility
                        x_jitter = np.random.normal(int(config), 0.05, len(config_data))
                        ax.scatter(x_jitter, config_data, alpha=0.6, s=20, color='darkblue', zorder=3)
            
            # Customize the plot
            ax.set_xlabel('Configuration', fontsize=14, fontweight='bold')
            ax.set_ylabel(f'{metric_title} Value', fontsize=14, fontweight='bold')
            ax.set_title(f'{metric_title} Distribution by Configuration', fontsize=16, fontweight='bold', pad=20)
            
            # Set x-axis ticks and labels
            ax.set_xticks(range(1, 13))
            ax.set_xticklabels([str(i) for i in range(1, 13)])
            
            # Add grid
            ax.grid(True, alpha=0.3, axis='y', linestyle='-', linewidth=0.5)
            ax.set_axisbelow(True)
            
            # Remove top and right spines
            ax.spines['top'].set_visible(False)
            ax.spines['right'].set_visible(False)
            
            # Add legend for violin plot elements
            from matplotlib.lines import Line2D
            legend_elements = [
                Line2D([0], [0], color='red', lw=2, label='Mean'),
                Line2D([0], [0], color='blue', lw=2, label='Median'),
                Line2D([0], [0], marker='o', color='w', markerfacecolor='darkblue', 
                       markersize=8, alpha=0.6, label='Data Points', linestyle='None')
            ]
            ax.legend(handles=legend_elements, loc='upper right', fontsize=12)
            
            # Add summary statistics as text
            if len(df_plot) > 0:
                overall_mean = df_plot['Value'].mean()
                overall_std = df_plot['Value'].std()
                overall_min = df_plot['Value'].min()
                overall_max = df_plot['Value'].max()
                
                stats_text = f'Overall Statistics:\n'
                stats_text += f'Mean: {overall_mean:.4f}\n'
                stats_text += f'Std: {overall_std:.4f}\n'
                stats_text += f'Min: {overall_min:.4f}\n'
                stats_text += f'Max: {overall_max:.4f}\n'
                stats_text += f'Total Data Points: {len(df_plot)}'
                
                ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, 
                       verticalalignment='top', bbox=dict(boxstyle='round', facecolor='lightgray', alpha=0.8),
                       fontsize=10)
            
            # Adjust layout
            plt.tight_layout()
            
            # Save the plot
            filename = f'{metric_key}_violin_plot.png'
            filepath = Path(output_folder) / filename
            plt.savefig(filepath, dpi=300, bbox_inches='tight')
            print(f"Violin plot saved: {filepath}")
            
            # Show the plot
            plt.show()
            plt.close()
        else:
            print(f"Warning: No data found for {metric_title}")

def create_combined_violin_plot(configuration_data, output_folder='plots'):
    """
    Create a combined violin plot with all three metrics in subplots.
    
    Args:
        configuration_data (dict): Dictionary containing processed data for each configuration
        output_folder (str): Folder to save plots
    """
    
    # Create output folder if it doesn't exist
    Path(output_folder).mkdir(exist_ok=True)
    
    # Set up the style
    plt.style.use('default')
    plt.rcParams['figure.facecolor'] = 'white'
    plt.rcParams['axes.facecolor'] = 'white'
    
    # Define metrics to plot
    metrics = {
        'BLEU_score': 'BLEU Score',
        'Code_BLEU': 'Code BLEU',
        'cosine_similarity': 'Cosine Similarity'
    }
    
    # Prepare data for violin plots
    all_configs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    
    # Create figure with subplots
    fig, axes = plt.subplots(1, 3, figsize=(24, 8))
    fig.suptitle('Distribution of BLEU Metrics by Configuration', fontsize=20, fontweight='bold', y=1.02)
    
    for idx, (metric_key, metric_title) in enumerate(metrics.items()):
        ax = axes[idx]
        
        # Prepare data for this metric
        plot_data = []
        
        for config in all_configs:
            if config in configuration_data:
                # Get the metric values for this configuration
                config_df = configuration_data[config]
                if metric_key in config_df.columns:
                    # Get non-null values
                    values = config_df[metric_key].dropna()
                    
                    # Add each value to plot_data with its configuration
                    for value in values:
                        plot_data.append({
                            'Configuration': config,
                            'Value': value,
                            'Metric': metric_title
                        })
        
        # Create DataFrame for plotting
        if plot_data:
            df_plot = pd.DataFrame(plot_data)
            
            # Sort configurations numerically
            df_plot['Config_Num'] = df_plot['Configuration'].astype(int)
            df_plot = df_plot.sort_values('Config_Num')
            
            # Create violin plot
            violin_parts = ax.violinplot(
                [df_plot[df_plot['Configuration'] == config]['Value'].values 
                 for config in sorted(all_configs, key=int) 
                 if config in df_plot['Configuration'].values],
                positions=[int(config) for config in sorted(all_configs, key=int) 
                          if config in df_plot['Configuration'].values],
                widths=0.8,
                showmeans=True,
                showmedians=True,
                showextrema=True
            )
            
            # Customize violin colors
            colors = plt.cm.Set3(np.linspace(0, 1, 12))
            for i, pc in enumerate(violin_parts['bodies']):
                pc.set_facecolor(colors[i])
                pc.set_alpha(0.7)
                pc.set_edgecolor('black')
                pc.set_linewidth(0.5)
            
            # Customize other parts
            violin_parts['cmeans'].set_color('red')
            violin_parts['cmeans'].set_linewidth(2)
            violin_parts['cmedians'].set_color('blue')
            violin_parts['cmedians'].set_linewidth(2)
            violin_parts['cbars'].set_color('black')
            violin_parts['cmaxes'].set_color('black')
            violin_parts['cmins'].set_color('black')
            
            # Add individual data points as scatter
            for config in sorted(all_configs, key=int):
                if config in df_plot['Configuration'].values:
                    config_data = df_plot[df_plot['Configuration'] == config]['Value']
                    if len(config_data) > 0:
                        # Add jitter to x-coordinates for better visibility
                        x_jitter = np.random.normal(int(config), 0.05, len(config_data))
                        ax.scatter(x_jitter, config_data, alpha=0.6, s=15, color='darkblue', zorder=3)
            
            # Customize the subplot
            ax.set_xlabel('Configuration', fontsize=12, fontweight='bold')
            ax.set_ylabel(f'{metric_title} Value', fontsize=12, fontweight='bold')
            ax.set_title(f'{metric_title}', fontsize=14, fontweight='bold', pad=15)
            
            # Set x-axis ticks and labels
            ax.set_xticks(range(1, 13))
            ax.set_xticklabels([str(i) for i in range(1, 13)])
            
            # Add grid
            ax.grid(True, alpha=0.3, axis='y', linestyle='-', linewidth=0.5)
            ax.set_axisbelow(True)
            
            # Remove top and right spines
            ax.spines['top'].set_visible(False)
            ax.spines['right'].set_visible(False)
            
            # Add legend only for the first subplot
            if idx == 0:
                from matplotlib.lines import Line2D
                legend_elements = [
                    Line2D([0], [0], color='red', lw=2, label='Mean'),
                    Line2D([0], [0], color='blue', lw=2, label='Median'),
                    Line2D([0], [0], marker='o', color='w', markerfacecolor='darkblue', 
                           markersize=8, alpha=0.6, label='Data Points', linestyle='None')
                ]
                ax.legend(handles=legend_elements, loc='upper right', fontsize=10)
        else:
            ax.text(0.5, 0.5, f'No data available for {metric_title}', 
                   transform=ax.transAxes, ha='center', va='center', fontsize=14)
    
    # Adjust layout
    plt.tight_layout()
    
    # Save the combined plot
    filename = 'combined_violin_plots.png'
    filepath = Path(output_folder) / filename
    plt.savefig(filepath, dpi=300, bbox_inches='tight')
    print(f"Combined violin plot saved: {filepath}")
    
    # Show the plot
    plt.show()
    plt.close()






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
        
        # Generate the plots
        print("\n=== GENERATING PLOTS ===")
        create_success_failure_plots(summary, output_folder='plots')
        create_violin_plots(config_data, output_folder='plots')
        create_combined_violin_plot(config_data, output_folder='plots')
        
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
    
    # Sort configurations as integers if possible, otherwise as strings
    def sort_key(folder):
        try:
            return (0, int(folder.name))  # Try to convert to integer
        except ValueError:
            return (1, folder.name)  # Fall back to string sorting
    
    config_folders.sort(key=sort_key)
    
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