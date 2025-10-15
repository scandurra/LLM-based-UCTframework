import pandas as pd
import os
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

def create_compact_success_failure_plots(summary_df, output_folder='plots'):
    """
    Create compact success/failure plots suitable for scientific articles.
    Creates three separate images, one for each metric.
    """
    Path(output_folder).mkdir(exist_ok=True)
    
    # Define the metrics with shorter, cleaner names for publication
    metrics = {
        'compilation_success': 'Compilation Success',
        'execution_without_error': 'Execution w/o errors', 
        'test_pass': 'Assertion validity'
    }
    
    # Create separate plots for each metric
    for metric_key, metric_title in metrics.items():
        # Create a single figure for this metric
        fig, ax = plt.subplots(1, 1, figsize=(5, 4.5))
        # fig.suptitle(f'Success/Failure Analysis - {metric_title}', fontsize=16, fontweight='bold', y=0.98)
        
        # Extract success and failure counts
        success_col = f'{metric_key}_success_count'
        failure_col = f'{metric_key}_failure_count'
        
        if success_col in summary_df.columns and failure_col in summary_df.columns:
            # Create the plot data
            plot_data = pd.DataFrame({
                'Configuration': summary_df.index,
                'Success': summary_df[success_col].fillna(0).astype(int),
                'Failure': summary_df[failure_col].fillna(0).astype(int)
            })
            
            # Sort configurations numerically
            def sort_config_key(config_name):
                try:
                    return (0, int(config_name))
                except ValueError:
                    return (1, config_name)
            
            plot_data['sort_key'] = plot_data['Configuration'].apply(sort_config_key)
            plot_data = plot_data.sort_values('sort_key').drop('sort_key', axis=1).reset_index(drop=True)
            
            # Calculate success rate
            plot_data['Total'] = plot_data['Success'] + plot_data['Failure']
            plot_data['Success_Rate'] = np.where(
                plot_data['Total'] > 0,
                (plot_data['Success'] / plot_data['Total'] * 100).round(1),
                0.0
            )
            
            # Set up bar positions
            x = np.arange(len(plot_data))
            width = 0.6
            
            # Create stacked bars with more professional colors
            bars1 = ax.bar(x, plot_data['Success'], width, 
                          label='Success', color='#2E8B57', alpha=0.8)  # Sea green
            bars2 = ax.bar(x, -plot_data['Failure'], width, 
                          label='Failure', color='#CD5C5C', alpha=0.8)  # Indian red
            
            # Set y-axis range
            max_success = plot_data['Success'].max() if plot_data['Success'].max() > 0 else 10
            max_failure = plot_data['Failure'].max() if plot_data['Failure'].max() > 0 else 10
            ax.set_ylim(-max_failure * 1.2, max_success * 1.2)
            
            # Add success rate line on secondary axis
            ax2 = ax.twinx()
            line = ax2.plot(x, plot_data['Success_Rate'], 'ko-', linewidth=2.5, 
                           markersize=5, label='Success Rate', markerfacecolor='orange',
                           markeredgecolor='black', markeredgewidth=0.5)
            ax2.set_ylim(-120 * (max_failure * 1.2) / (max_success * 1.2), 120)
            
            # Customize axes
            ax.set_xlabel('Configuration', fontweight='bold')
            ax.set_ylabel('Number of tests', fontweight='bold')
            ax2.set_ylabel('Success Rate (%)', fontweight='bold')
            
            ax.set_title(metric_title, fontweight='bold', pad=10)
            ax.set_xticks(x)
            ax.set_xticklabels(plot_data['Configuration'])
            
            # Add value labels on bars (compact style)
            for i, (bar1, bar2) in enumerate(zip(bars1, bars2)):
                if plot_data['Success'].iloc[i] > 0:
                    ax.text(bar1.get_x() + bar1.get_width()/2, bar1.get_height()/2,
                           f'{int(plot_data["Success"].iloc[i])}',
                           ha='center', va='center', fontweight='bold', 
                           color='white', fontsize=9)
                
                if plot_data['Failure'].iloc[i] > 0:
                    ax.text(bar2.get_x() + bar2.get_width()/2, bar2.get_height()/2,
                           f'{int(plot_data["Failure"].iloc[i])}',
                           ha='center', va='center', fontweight='bold', 
                           color='white', fontsize=9)
            
            # Add success rate annotations (more compact)
            for i in range(len(plot_data)):
                if plot_data['Total'].iloc[i] > 0:
                    ax2.annotate(f'{plot_data["Success_Rate"].iloc[i]:.0f}%',
                                xy=(i, plot_data['Success_Rate'].iloc[i]),
                                xytext=(0, 5), textcoords='offset points',
                                ha='center', va='bottom', fontweight='bold',
                                fontsize=8)
            
            # Style improvements
            ax.axhline(y=0, color='black', linewidth=1)
            ax.grid(True, alpha=0.3, axis='y', linestyle='-', linewidth=0.5)
            ax.set_axisbelow(True)
            
            # Remove spines
            ax.spines['top'].set_visible(False)
            ax.spines['right'].set_visible(False)
            ax2.spines['top'].set_visible(False)
            ax2.spines['left'].set_visible(False)
            
            # Add legends
            ax.legend(loc='lower left', bbox_to_anchor=(0, 0), fontsize=9)
            ax2.legend(loc='lower right', bbox_to_anchor=(1, 0), fontsize=9)
        
        plt.tight_layout()
        
        # Save the individual plot
        filename = f'compact_{metric_key}_analysis'
        filepath_png = Path(output_folder) / f'{filename}.png'
        filepath_pdf = Path(output_folder) / f'{filename}.pdf'
        plt.savefig(filepath_png, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"Compact {metric_title.lower()} plot saved as png: {filepath_png}")
        plt.savefig(filepath_pdf, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"Compact {metric_title.lower()} plot saved as pdf: {filepath_pdf}")
        

        plt.show()
        plt.close()


def create_compact_violin_plot(configuration_data, output_folder='plots'):
    """
    Create separate compact violin plots for each metric, suitable for scientific articles.
    """
    Path(output_folder).mkdir(exist_ok=True)
    
    # Define metrics with cleaner names
    metrics = {
        'BLEU_score': 'BLEU',
        'Code_BLEU': 'CodeBLEU',
        'cosine_similarity': 'Cosine Similarity'
    }
    
    all_configs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    colors = ['#4472C4', '#E15759', '#70AD47']  # Professional color scheme
    
    for idx, (metric_key, metric_title) in enumerate(metrics.items()):
        # Create individual figure for each metric
        fig, ax = plt.subplots(1, 1, figsize=(5, 4.5))
        # fig.suptitle(f'Distribution of {metric_title} by Configuration', 
        #              fontsize=16, fontweight='bold', y=0.95)
        
        # Prepare data for this metric
        plot_data = []
        
        for config in all_configs:
            if config in configuration_data:
                config_df = configuration_data[config]
                if metric_key in config_df.columns:
                    values = config_df[metric_key].dropna()
                    for value in values:
                        plot_data.append({
                            'Configuration': config,
                            'Value': value
                        })
        
        if plot_data:
            df_plot = pd.DataFrame(plot_data)
            df_plot['Config_Num'] = df_plot['Configuration'].astype(int)
            df_plot = df_plot.sort_values('Config_Num')
            
            # Create violin plot with single color
            violin_parts = ax.violinplot(
                [df_plot[df_plot['Configuration'] == config]['Value'].values 
                 for config in sorted(all_configs, key=int) 
                 if config in df_plot['Configuration'].values],
                positions=[int(config) for config in sorted(all_configs, key=int) 
                          if config in df_plot['Configuration'].values],
                widths=0.7,
                showmeans=True,
                showmedians=True,
                showextrema=True
            )
            
            # Uniform professional styling
            for pc in violin_parts['bodies']:
                pc.set_facecolor(colors[idx])
                pc.set_alpha(0.7)
                pc.set_edgecolor('black')
                pc.set_linewidth(0.8)
            
            # Style statistical indicators
            violin_parts['cmeans'].set_color('red')
            violin_parts['cmeans'].set_linewidth(2)
            violin_parts['cmedians'].set_color('blue')
            violin_parts['cmedians'].set_linewidth(2)
            violin_parts['cbars'].set_color('black')
            violin_parts['cmaxes'].set_color('black')
            violin_parts['cmins'].set_color('black')
            
            # Add scatter points (smaller, less cluttered)
            for config in sorted(all_configs, key=int):
                if config in df_plot['Configuration'].values:
                    config_data = df_plot[df_plot['Configuration'] == config]['Value']
                    if len(config_data) > 0:
                        x_jitter = np.random.normal(int(config), 0.03, len(config_data))
                        ax.scatter(x_jitter, config_data, alpha=0.5, s=12, 
                                 color='darkblue', zorder=3)
            
            # Customize subplot
            ax.set_xlabel('Configuration', fontweight='bold')
            ax.set_ylabel('Value', fontweight='bold')
            ax.set_title(metric_title, fontweight='bold', pad=10+8)

            # Set x-axis
            ax.set_xticks(range(1, 13))
            ax.set_xticklabels([str(i) for i in range(1, 13)])
            
            # Grid and styling
            ax.grid(True, alpha=0.3, axis='y', linestyle='-', linewidth=0.5)
            ax.set_axisbelow(True)
            ax.spines['top'].set_visible(False)
            ax.spines['right'].set_visible(False)
            
            # Add compact statistics box
            # overall_mean = df_plot['Value'].mean()
            # overall_std = df_plot['Value'].std()
            # stats_text = f'μ={overall_mean:.3f}\nσ={overall_std:.3f}\nn={len(df_plot)}'
            
            # ax.text(0.02, 0.98, stats_text, transform=ax.transAxes, 
            #        verticalalignment='top', 
            #        bbox=dict(boxstyle='round,pad=0.3', facecolor='lightgray', alpha=0.8),
            #        fontsize=9)
        else:
            ax.text(0.5, 0.5, f'No data\navailable', 
                   transform=ax.transAxes, ha='center', va='center', fontsize=12)
        
        # Add legend for each individual plot
        from matplotlib.lines import Line2D
        legend_elements = [
            Line2D([0], [0], color='red', lw=2, label='Mean'),
            Line2D([0], [0], color='blue', lw=2, label='Median'),
            Line2D([0], [0], marker='o', color='w', markerfacecolor='darkblue', 
                   markersize=6, alpha=0.5, label='Data Points', linestyle='None')
        ]
        ax.legend(handles=legend_elements, loc='upper center', bbox_to_anchor=(0.5, 1.08), 
                 ncol=3, fontsize=10, frameon=False)
        
        plt.tight_layout()
        
        # Save each plot with metric-specific filename
        filename = f'{metric_key}_violin_plot'
        filepath_png = Path(output_folder) / f'{filename}.png'
        filepath_pdf = Path(output_folder) / f'{filename}.pdf'
        plt.savefig(filepath_png, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"Violin plot saved in png: {filepath_png}")
        plt.savefig(filepath_pdf, dpi=300, bbox_inches='tight', facecolor='white')
        print(f"Violin plot saved in pdf: {filepath_pdf}")

        plt.show()
        plt.close()