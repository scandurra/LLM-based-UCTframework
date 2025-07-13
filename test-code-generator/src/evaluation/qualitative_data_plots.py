import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os

def create_expert_boxplots(all_data, output_dir="expert_plots"):
    """
    Create publication-ready box plots for expert evaluations using the 'values' array
    
    Parameters:
    all_data: List of dictionaries with structure:
        {
            'output': output_name,
            'configuration': config_name, 
            'variable': var_name,
            'expert_1': value,
            'expert_2': value,
            'expert_3': value,
            'expert_4': value,
            'values': [expert_1_val, expert_2_val, expert_3_val, expert_4_val]
        }
    output_dir: Directory to save plots
    """
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert to DataFrame
    df = pd.DataFrame(all_data)
    
    if df.empty:
        print("ERROR: No data available for plotting")
        return
    
    print(f"SUCCESS: Processing {len(df)} data points")
    
    # Set publication style
    plt.style.use('default')
    plt.rcParams.update({
        'font.size': 10,
        'axes.titlesize': 12,
        'axes.labelsize': 11,
        'xtick.labelsize': 9,
        'ytick.labelsize': 9,
        'legend.fontsize': 9,
        'figure.titlesize': 13,
        'axes.linewidth': 0.8,
        'grid.linewidth': 0.5,
        'lines.linewidth': 1.0
    })
    
    # Define expert colors (consistent across all plots)
    expert_colors = ['#2E86AB', '#A23B72', '#F18F01']  # Blue, Purple, Orange
    expert_labels = ['Expert 1', 'Expert 2', 'Expert 3']
    
    # Variable display names
    variable_display_names = {
        'Naming_coherence': 'Naming Coherence',
        'Readability_Accessibility': 'Readability & Accessibility',
        'Completeness_functional_coherence': 'Completeness & Functional Coherence',
        'Proper_interaction_with_DOM': 'Proper Interaction with DOM',
        'Proper_import_statements': 'Proper Import Statements',
        'Reuse_existing_test_code': 'Reuse Existing Test Code',
        'Usage_env_variables': 'Usage of Environment Variables',
        'Correct_use_Reporter_component': 'Correct Use of Reporter Component'
    }
    
    def extract_config_number(config_name):
        """Extract configuration number for sorting"""
        import re
        numbers = re.findall(r'\d+', str(config_name))
        return int(numbers[0]) if numbers else float('inf')
    
    # Get unique variables
    variables = df['variable'].unique()
    print(f"Variables found: {variables}")
    
    # Create plot for each variable
    for variable in variables:
        var_data = df[df['variable'] == variable].copy()
        
        if var_data.empty:
            print(f"WARNING: No data for variable: {variable}")
            continue
        
        print(f"Creating plot for: {variable}")
        
        # Sort configurations numerically and ensure all 1-12 are represented
        var_data['config_num'] = var_data['configuration'].apply(extract_config_number)
        var_data = var_data.sort_values('config_num')
        
        # Get all configurations present in data
        present_configs = sorted(var_data['configuration'].unique(), key=extract_config_number)
        
        # Create complete list of configurations 1-12
        all_configs_numbers = list(range(1, 13))  # [1, 2, 3, ..., 12]
        all_configs_map = {}  # Maps config number to config name (if present)
        
        for config in present_configs:
            config_num = extract_config_number(config)
            all_configs_map[config_num] = config
        
        print(f"   Present configurations: {[extract_config_number(c) for c in present_configs]}")
        print(f"   Missing configurations: {[i for i in all_configs_numbers if i not in all_configs_map]}")
        
        fig, ax = plt.subplots(figsize=(6, 4))
        
        # Collect data using the 'values' array for ALL configurations (1-12)
        expert_data = [[] for _ in range(3)]  # For 3 experts
        
        for i, config_num in enumerate(all_configs_numbers):
            if config_num in all_configs_map:
                # Configuration exists in data
                config_name = all_configs_map[config_num]
                config_data = var_data[var_data['configuration'] == config_name]
                
                # Process each row in this configuration
                for _, row in config_data.iterrows():
                    values_array = row['values']
                    if isinstance(values_array, list) and len(values_array) >= 3:
                        # Add values to respective expert lists
                        for expert_idx in range(3):
                            if expert_idx < len(values_array) and not pd.isna(values_array[expert_idx]):
                                expert_data[expert_idx].append((i, values_array[expert_idx]))
            # If configuration doesn't exist, we don't add any data for position i
        
        # Create the plot
        box_width = 0.25
        expert_offset = [-box_width, 0, box_width]
        
        for expert_idx in range(3):
            if expert_data[expert_idx]:
                # Group data by configuration for this expert
                expert_by_config = {}
                for config_pos, value in expert_data[expert_idx]:
                    if config_pos not in expert_by_config:
                        expert_by_config[config_pos] = []
                    expert_by_config[config_pos].append(value)
                
                # Create box plots for this expert
                box_data = []
                positions = []
                
                for config_pos in sorted(expert_by_config.keys()):
                    box_data.append(expert_by_config[config_pos])
                    positions.append(config_pos + expert_offset[expert_idx])
                
                if box_data:
                    bp = ax.boxplot(box_data, 
                                   positions=positions,
                                   patch_artist=True,
                                   widths=box_width * 0.8,
                                   showfliers=True,
                                   flierprops={'marker': 'o', 'markersize': 3, 'alpha': 0.6},
                                   medianprops={'color': expert_colors[expert_idx], 'linewidth': 2.5},
                                   boxprops={'linewidth': 0.8},
                                   whiskerprops={'linewidth': 0.8},
                                   capprops={'linewidth': 0.8})
                    
                    # Color boxes for this expert
                    for patch in bp['boxes']:
                        patch.set_facecolor(expert_colors[expert_idx])
                        patch.set_alpha(0.8)
                        patch.set_edgecolor('black')
                        patch.set_linewidth(0.8)
        
        # Customize plot
        ax.set_xlim(-0.5, len(all_configs_numbers) - 0.5)
        ax.set_ylim(0.5, 5.5)
        
        # Set x-axis labels (configuration numbers 1-12)
        ax.set_xticks(range(len(all_configs_numbers)))
        ax.set_xticklabels([str(num) for num in all_configs_numbers])
        
        # Set y-axis
        ax.set_yticks([1, 2, 3, 4, 5])
        ax.set_yticklabels(['1', '2', '3', '4', '5'])
        
        # Labels and title
        ax.set_xlabel('Configuration', fontweight='bold')
        ax.set_ylabel('Rating Score', fontweight='bold')
        
        # Clean title
        display_name = variable_display_names.get(variable, variable.replace('_', ' ').title())
        ax.set_title(display_name, fontweight='bold', pad=20)
        
        # Create legend
        legend_elements = [plt.Rectangle((0,0),1,1, facecolor=expert_colors[i], 
                                       alpha=0.8, edgecolor='black', linewidth=0.8, 
                                       label=expert_labels[i]) 
                          for i in range(3)]
        # ax.legend(handles=legend_elements, loc='upper center', frameon=True, 
        #          fancybox=False, shadow=False, framealpha=0.9)
        ax.legend(handles=legend_elements, loc='lower left', bbox_to_anchor=(0, 0), fontsize=9)
        
        # Grid styling
        ax.grid(True, alpha=0.3, linestyle='-', linewidth=0.5)
        ax.set_axisbelow(True)
        
        # Remove top and right spines
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['left'].set_linewidth(0.8)
        ax.spines['bottom'].set_linewidth(0.8)
        
        # Adjust layout
        plt.tight_layout()
        
        # Save plot
        filename = f"{output_dir}/boxplot_{variable.lower()}_experts.png"
        plt.savefig(filename, dpi=300, bbox_inches='tight', 
                   facecolor='white', edgecolor='none')
        # plt.savefig(filename.replace('.png', '.pdf'), bbox_inches='tight', 
        #            facecolor='white', edgecolor='none')
        plt.close()
        
        print(f"   ✅ Plot saved: {filename}")
    
    print(f"\n📊 All expert box plots saved in '{output_dir}' directory")

def create_overall_expert_plot(all_data, output_dir="expert_plots"):
    """Create an overall plot averaging across all variables"""
    
    df = pd.DataFrame(all_data)
    
    if df.empty:
        print("ERROR: No data available for overall plot")
        return
    
    def extract_config_number(config_name):
        import re
        numbers = re.findall(r'\d+', str(config_name))
        return int(numbers[0]) if numbers else float('inf')
    
    # Calculate overall scores for each expert-configuration combination
    overall_data = [[] for _ in range(3)]  # For 3 experts
    
    # Create complete list of configurations 1-12
    all_configs_numbers = list(range(1, 13))
    present_configs = sorted(df['configuration'].unique(), key=extract_config_number)
    all_configs_map = {}
    
    for config in present_configs:
        config_num = extract_config_number(config)
        all_configs_map[config_num] = config
    
    print(f"Overall plot - Present configurations: {[extract_config_number(c) for c in present_configs]}")
    print(f"Overall plot - Missing configurations: {[i for i in all_configs_numbers if i not in all_configs_map]}")
    
    # Group by configuration and calculate averages for ALL configurations (1-12)
    for i, config_num in enumerate(all_configs_numbers):
        if config_num in all_configs_map:
            # Configuration exists in data
            config_name = all_configs_map[config_num]
            config_data = df[df['configuration'] == config_name]
            
            # For each expert, collect all their ratings across all variables in this config
            expert_ratings = [[] for _ in range(3)]
            
            for _, row in config_data.iterrows():
                values_array = row['values']
                if isinstance(values_array, list) and len(values_array) >= 3:
                    for expert_idx in range(3):
                        if expert_idx < len(values_array) and not pd.isna(values_array[expert_idx]):
                            expert_ratings[expert_idx].append(values_array[expert_idx])
            
            # Calculate average for each expert in this configuration
            for expert_idx in range(3):
                if expert_ratings[expert_idx]:
                    avg_rating = np.mean(expert_ratings[expert_idx])
                    overall_data[expert_idx].append((i, avg_rating))
        # If configuration doesn't exist, we don't add any data for position i
    
    # Create figure
    fig, ax = plt.subplots(figsize=(12, 4))
    
    expert_colors = ['#2E86AB', '#A23B72', '#F18F01']
    expert_labels = ['Expert 1', 'Expert 2', 'Expert 3']
    box_width = 0.25
    expert_offset = [-box_width, 0, box_width]
    
    for expert_idx in range(3):
        if overall_data[expert_idx]:
            # Group data by configuration for this expert
            expert_by_config = {}
            for config_pos, value in overall_data[expert_idx]:
                if config_pos not in expert_by_config:
                    expert_by_config[config_pos] = []
                expert_by_config[config_pos].append(value)
            
            # Create box plots for this expert
            box_data = []
            positions = []
            
            for config_pos in sorted(expert_by_config.keys()):
                box_data.append(expert_by_config[config_pos])
                positions.append(config_pos + expert_offset[expert_idx])
            
            if box_data:
                bp = ax.boxplot(box_data, 
                               positions=positions,
                               patch_artist=True,
                               widths=box_width * 0.8,
                               showfliers=True,
                               flierprops={'marker': 'o', 'markersize': 3, 'alpha': 0.6},
                               medianprops={'color': expert_colors[expert_idx], 'linewidth': 2.5},
                               boxprops={'linewidth': 0.8},
                               whiskerprops={'linewidth': 0.8},
                               capprops={'linewidth': 0.8})
                
                # Color boxes for this expert
                for patch in bp['boxes']:
                    patch.set_facecolor(expert_colors[expert_idx])
                    patch.set_alpha(0.8)
                    patch.set_edgecolor('black')
                    patch.set_linewidth(0.8)
    
    # Customize plot
    ax.set_xlim(-0.5, len(all_configs_numbers) - 0.5)
    ax.set_ylim(0.5, 5.5)
    
    # Set x-axis labels (1-12)
    ax.set_xticks(range(len(all_configs_numbers)))
    ax.set_xticklabels([str(num) for num in all_configs_numbers])
    
    # Set y-axis
    ax.set_yticks([1, 2, 3, 4, 5])
    ax.set_yticklabels(['1', '2', '3', '4', '5'])
    
    # Labels and title
    ax.set_xlabel('Configuration', fontweight='bold')
    ax.set_ylabel('Overall Rating Score', fontweight='bold')
    ax.set_title('Overall Rating Distribution by Expert and Configuration', 
                fontweight='bold', pad=20)
    
    # Create legend
    legend_elements = [plt.Rectangle((0,0),1,1, facecolor=expert_colors[i], 
                                   alpha=0.8, edgecolor='black', linewidth=0.8, 
                                   label=expert_labels[i]) 
                      for i in range(3)]
    ax.legend(handles=legend_elements, loc='upper right', frameon=True, 
             fancybox=False, shadow=False, framealpha=0.9)
    
    # Grid styling
    ax.grid(True, alpha=0.3, linestyle='-', linewidth=0.5)
    ax.set_axisbelow(True)
    
    # Remove top and right spines
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_linewidth(0.8)
    ax.spines['bottom'].set_linewidth(0.8)
    
    # Adjust layout
    plt.tight_layout()
    
    # Save plot
    filename = f"{output_dir}/boxplot_overall_experts.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='white')
    # plt.savefig(filename.replace('.png', '.pdf'), bbox_inches='tight', facecolor='white')
    plt.close()
    
    print(f"SUCCESS: Overall expert plot saved: {filename}")

def create_compact_multi_variable_plot(all_data, output_dir="expert_plots"):
    """
    Create a compact subplot figure with all variables for publication
    """
    df = pd.DataFrame(all_data)
    
    if df.empty:
        print("❌ No data available for compact plotting")
        return
    
    # Expert colors and labels
    expert_colors = ['#2E86AB', '#A23B72', '#F18F01']
    expert_labels = ['Expert 1', 'Expert 2', 'Expert 3']
    
    variables = df['variable'].unique()
    
    # Variable display names (shortened for compact display)
    variable_display_names = {
        'Naming_coherence': 'Naming\nCoherence',
        'Readability_Accessibility': 'Readability &\nAccessibility',
        'Completeness_functional_coherence': 'Completeness &\nFunctional Coherence',
        'Proper_interaction_with_DOM': 'Proper Interaction\nwith DOM',
        'Proper_import_statements': 'Proper Import\nStatements',
        'Reuse_existing_test_code': 'Reuse Existing\nTest Code',
        'Usage_env_variables': 'Usage of\nEnvironment Variables',
        'Correct_use_Reporter_component': 'Correct Use of\nReporter Component'
    }
    
    def extract_config_number(config_name):
        import re
        numbers = re.findall(r'\d+', str(config_name))
        return int(numbers[0]) if numbers else float('inf')
    
    # Calculate grid size
    n_vars = len(variables)
    n_cols = min(4, n_vars)  # Max 4 columns
    n_rows = (n_vars + n_cols - 1) // n_cols
    
    # Create figure with subplots
    fig, axes = plt.subplots(n_rows, n_cols, figsize=(n_cols * 3, n_rows * 2.5))
    
    # Flatten axes for easier indexing
    if n_rows == 1 and n_cols == 1:
        axes = [axes]
    elif n_rows == 1 or n_cols == 1:
        axes = axes.flatten()
    else:
        axes = axes.flatten()
    
    for idx, variable in enumerate(variables):
        ax = axes[idx]
        var_data = df[df['variable'] == variable].copy()
        
        if var_data.empty:
            ax.set_visible(False)
            continue
        
        # Sort configurations and ensure all 1-12 are represented
        var_data['config_num'] = var_data['configuration'].apply(extract_config_number)
        var_data = var_data.sort_values('config_num')
        
        # Get all configurations present in data
        present_configs = sorted(var_data['configuration'].unique(), key=extract_config_number)
        
        # Create complete list of configurations 1-12
        all_configs_numbers = list(range(1, 13))
        all_configs_map = {}
        
        for config in present_configs:
            config_num = extract_config_number(config)
            all_configs_map[config_num] = config
        
        # Collect data using the 'values' array for ALL configurations (1-12)
        expert_data = [[] for _ in range(3)]
        
        for i, config_num in enumerate(all_configs_numbers):
            if config_num in all_configs_map:
                # Configuration exists in data
                config_name = all_configs_map[config_num]
                config_data = var_data[var_data['configuration'] == config_name]
                
                for _, row in config_data.iterrows():
                    values_array = row['values']
                    if isinstance(values_array, list) and len(values_array) >= 3:
                        for expert_idx in range(3):
                            if expert_idx < len(values_array) and not pd.isna(values_array[expert_idx]):
                                expert_data[expert_idx].append((i, values_array[expert_idx]))
            # If configuration doesn't exist, we don't add any data for position i
        
        # Create plot
        box_width = 0.2
        expert_offset = [-box_width, 0, box_width]
        
        for expert_idx in range(3):
            if expert_data[expert_idx]:
                expert_by_config = {}
                for config_pos, value in expert_data[expert_idx]:
                    if config_pos not in expert_by_config:
                        expert_by_config[config_pos] = []
                    expert_by_config[config_pos].append(value)
                
                box_data = []
                positions = []
                
                for config_pos in sorted(expert_by_config.keys()):
                    box_data.append(expert_by_config[config_pos])
                    positions.append(config_pos + expert_offset[expert_idx])
                
                if box_data:
                    bp = ax.boxplot(box_data, 
                                   positions=positions,
                                   patch_artist=True,
                                   widths=box_width * 0.7,
                                   showfliers=False,  # Remove outliers for cleaner look
                                   medianprops={'color': expert_colors[expert_idx], 'linewidth': 2.0},
                                   boxprops={'linewidth': 0.5},
                                   whiskerprops={'linewidth': 0.5},
                                   capprops={'linewidth': 0.5})
                    
                    for patch in bp['boxes']:
                        patch.set_facecolor(expert_colors[expert_idx])
                        patch.set_alpha(0.8)
                        patch.set_edgecolor('black')
                        patch.set_linewidth(0.5)
        
        # Customize each subplot
        ax.set_xlim(-0.5, len(all_configs_numbers) - 0.5)
        ax.set_ylim(0.5, 5.5)
        
        # X-axis: show all configuration numbers 1-12
        ax.set_xticks(range(len(all_configs_numbers)))
        if len(all_configs_numbers) > 8:
            # Show fewer labels if too many configurations for space
            ax.set_xticklabels([str(num) if i % 2 == 0 else '' for i, num in enumerate(all_configs_numbers)])
        else:
            ax.set_xticklabels([str(num) for num in all_configs_numbers])
        
        ax.set_yticks([1, 2, 3, 4, 5])
        if idx % n_cols == 0:  # Only leftmost plots get y-labels
            ax.set_yticklabels(['1', '2', '3', '4', '5'])
        else:
            ax.set_yticklabels([])
        
        # Title for each subplot
        display_name = variable_display_names.get(variable, variable.replace('_', ' '))
        ax.set_title(display_name, fontsize=9, fontweight='bold', pad=10)
        
        # Grid
        ax.grid(True, alpha=0.3, linestyle='-', linewidth=0.3)
        ax.set_axisbelow(True)
        
        # Clean spines
        for spine in ax.spines.values():
            spine.set_linewidth(0.5)
    
    # Hide unused subplots
    for idx in range(len(variables), len(axes)):
        axes[idx].set_visible(False)
    
    # Add common labels
    fig.text(0.5, 0.02, 'Configuration', ha='center', va='center', fontweight='bold')
    fig.text(0.02, 0.5, 'Rating Score', ha='center', va='center', rotation=90, fontweight='bold')
    
    # Add legend at the top
    legend_elements = [plt.Rectangle((0,0),1,1, facecolor=expert_colors[i], 
                                   alpha=0.8, edgecolor='black', linewidth=0.5, 
                                   label=expert_labels[i]) 
                      for i in range(3)]
    fig.legend(handles=legend_elements, loc='upper center', ncol=3, 
              bbox_to_anchor=(0.5, 0.95), frameon=False)
    
    plt.tight_layout()
    plt.subplots_adjust(top=0.9, bottom=0.1, left=0.08, right=0.95)
    
    # Save
    filename = f"{output_dir}/boxplot_all_variables_compact.png"
    plt.savefig(filename, dpi=300, bbox_inches='tight', facecolor='white')
    # plt.savefig(filename.replace('.png', '.pdf'), bbox_inches='tight', facecolor='white')
    plt.close()
    
    print(f"SUCCESS: Compact multi-variable plot saved: {filename}")

# Main function to call all plotting functions
def create_publication_expert_plots(all_data, output_dir="expert_plots"):
    """
    Main function to create all expert box plots
    
    Usage in your main() function:
    create_publication_expert_plots(all_data, "expert_plots")
    """
    print(f"\nCreating publication-ready expert box plots...")
    
    # Create individual plots for each variable
    create_expert_boxplots(all_data, output_dir)
    
    # Create overall plot
    create_overall_expert_plot(all_data, output_dir)
    
    # Create compact multi-variable plot
    create_compact_multi_variable_plot(all_data, output_dir)
    
    print(f"\nSUCCESS: All expert plots completed and saved in '{output_dir}' directory")
    print("Individual variable plots: boxplot_[variable]_experts.png")
    print("Overall plot: boxplot_overall_experts.png") 
    print("Compact multi-variable: boxplot_all_variables_compact.png")
    print("All plots saved in both PNG (300 DPI)")