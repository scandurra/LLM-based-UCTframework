import json
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
from collections import defaultdict
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from rouge_score import rouge_scorer
import warnings
warnings.filterwarnings('ignore')

class MetricsCalculator:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.dataset_path = self.base_path / "Dataset"
        self.baseline_path = self.dataset_path / "Baseline JSON"
        self.generated_path = self.dataset_path / "Generated"
        self.results_path = self.dataset_path / "Results"
        self.charts_path = self.results_path / "Charts"
        
        # Create results directories
        self.results_path.mkdir(parents=True, exist_ok=True)
        self.charts_path.mkdir(parents=True, exist_ok=True)
        
        # Generation types
        self.generation_types = [
            "R1 Zero Shot", "R1 One Shot", "R1 Few Shot",
            "R2 Zero Shot", "R2 One Shot", "R2 Few Shot", 
            "R3 Zero Shot", "R3 One Shot", "R3 Few Shot"
        ]
        
        # Initialize ROUGE scorer
        self.rouge_scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
        
        # Initialize smoothing for BLEU
        self.smoothing = SmoothingFunction().method1
        
    def load_json_file(self, file_path):
        """Load and parse JSON file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            return data
        except Exception as e:
            print(f"❌ Error loading {file_path}: {e}")
            return None
    
    def extract_text_content(self, test_case):
        """Extract all text content from a test case for comparison"""
        if not isinstance(test_case, dict):
            return ""
        
        text_parts = []
        
        # Extract main fields
        for field in ['title', 'preconditions', 'postconditions']:
            if field in test_case and test_case[field]:
                text_parts.append(str(test_case[field]))
        
        # Extract test steps
        if 'test_steps' in test_case and isinstance(test_case['test_steps'], list):
            for step in test_case['test_steps']:
                if isinstance(step, dict):
                    if 'step' in step and step['step']:
                        text_parts.append(str(step['step']))
                    if 'expected' in step and step['expected']:
                        text_parts.append(str(step['expected']))
        
        return " ".join(text_parts)
    
    def preprocess_text(self, text):
        """Preprocess text for metric calculation"""
        if not text:
            return ""
        
        # Convert to lowercase and remove extra whitespace
        text = re.sub(r'\s+', ' ', str(text).lower().strip())
        
        # Remove special characters but keep Italian accents
        text = re.sub(r'[^\w\sàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]', ' ', text)
        
        return text
    
    def calculate_bleu_score(self, reference, hypothesis):
        """Calculate BLEU score between reference and hypothesis"""
        if not reference or not hypothesis:
            return 0.0
        
        # Preprocess texts
        ref = self.preprocess_text(reference)
        hyp = self.preprocess_text(hypothesis)
        
        # Tokenize
        ref_tokens = ref.split()
        hyp_tokens = hyp.split()
        
        if not ref_tokens or not hyp_tokens:
            return 0.0
        
        try:
            # Calculate BLEU score with smoothing
            score = sentence_bleu([ref_tokens], hyp_tokens, smoothing_function=self.smoothing)
            return score
        except:
            return 0.0
    
    def calculate_rouge_scores(self, reference, hypothesis):
        """Calculate ROUGE scores between reference and hypothesis"""
        if not reference or not hypothesis:
            return {'rouge1': 0.0, 'rouge2': 0.0, 'rougeL': 0.0}
        
        # Preprocess texts
        ref = self.preprocess_text(reference)
        hyp = self.preprocess_text(hypothesis)
        
        if not ref or not hyp:
            return {'rouge1': 0.0, 'rouge2': 0.0, 'rougeL': 0.0}
        
        try:
            scores = self.rouge_scorer.score(ref, hyp)
            return {
                'rouge1': scores['rouge1'].fmeasure,
                'rouge2': scores['rouge2'].fmeasure, 
                'rougeL': scores['rougeL'].fmeasure
            }
        except:
            return {'rouge1': 0.0, 'rouge2': 0.0, 'rougeL': 0.0}
    
    def calculate_cosine_similarity(self, reference, hypothesis):
        """Calculate cosine similarity between reference and hypothesis using TF-IDF"""
        if not reference or not hypothesis:
            return 0.0
        
        # Preprocess texts
        ref = self.preprocess_text(reference)
        hyp = self.preprocess_text(hypothesis)
        
        if not ref or not hyp:
            return 0.0
        
        try:
            # Create TF-IDF vectors
            vectorizer = TfidfVectorizer()
            tfidf_matrix = vectorizer.fit_transform([ref, hyp])
            
            # Calculate cosine similarity
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
            return similarity
        except:
            return 0.0
    
    def find_matching_test_case(self, baseline_file, generation_data):
        """Find matching test case in generation data based on test_case_id pattern"""
        baseline_name = baseline_file.stem  # e.g., "UC321_TC1"
        
        # Parse the baseline name to extract use case and test case number
        parts = baseline_name.split('_')
        if len(parts) >= 2:
            uc_part = parts[0]  # UC321
            tc_part = parts[1]  # TC1
            
            # Convert UC321 to UC3.2.1 format and TC1 to TC001 format
            uc_formatted = self.format_use_case_id(uc_part)
            tc_number = tc_part.replace('TC', '')
            tc_formatted = f"TC{tc_number.zfill(3)}"  # TC1 -> TC001
            
            expected_id = f"{uc_formatted}_{tc_formatted}"
            
            # Search for matching test case
            for test_case in generation_data:
                if isinstance(test_case, dict):
                    test_id = test_case.get('test_case_id', '')
                    if expected_id in test_id or test_id.endswith(tc_formatted):
                        return test_case
        
        return None
    
    def format_use_case_id(self, uc_part):
        """Convert UC321 to UC3.2.1 format"""
        if len(uc_part) >= 4:  # UC321
            uc_num = uc_part[2:]  # 321
            if len(uc_num) == 3:
                return f"UC{uc_num[0]}.{uc_num[1]}.{uc_num[2]}"
            elif len(uc_num) == 2:
                return f"UC{uc_num[0]}.{uc_num[1]}"
            elif len(uc_num) == 1:
                return f"UC{uc_num[0]}"
        return uc_part
    
    def calculate_metrics_for_pair(self, baseline_test_case, generated_test_case):
        """Calculate all metrics for a pair of test cases"""
        if not baseline_test_case or not generated_test_case:
            return None
        
        # Extract text content
        baseline_text = self.extract_text_content(baseline_test_case)
        generated_text = self.extract_text_content(generated_test_case)
        
        if not baseline_text or not generated_text:
            return None
        
        # Calculate metrics
        bleu_score = self.calculate_bleu_score(baseline_text, generated_text)
        rouge_scores = self.calculate_rouge_scores(baseline_text, generated_text)
        cosine_sim = self.calculate_cosine_similarity(baseline_text, generated_text)
        
        return {
            'bleu': bleu_score,
            'rouge1': rouge_scores['rouge1'],
            'rouge2': rouge_scores['rouge2'],
            'rougeL': rouge_scores['rougeL'],
            'cosine_similarity': cosine_sim,
            'baseline_text_length': len(baseline_text),
            'generated_text_length': len(generated_text)
        }
    
    def process_all_comparisons(self):
        """Process all baseline vs generated comparisons"""
        print("📊 CALCULATING METRICS FOR ALL COMPARISONS")
        print("=" * 60)
        
        all_results = []
        
        # Get all baseline files
        baseline_files = list(self.baseline_path.glob("*.json"))
        print(f"Found {len(baseline_files)} baseline files")
        
        for baseline_file in baseline_files:
            print(f"\nProcessing {baseline_file.name}...")
            
            # Load baseline data
            baseline_data = self.load_json_file(baseline_file)
            if not baseline_data or not isinstance(baseline_data, list) or len(baseline_data) == 0:
                print(f"  ❌ Invalid baseline data")
                continue
            
            baseline_test_case = baseline_data[0]  # Take first test case
            
            # Process each generation type
            for gen_type in self.generation_types:
                gen_folder = self.generated_path / gen_type
                if not gen_folder.exists():
                    print(f"  ⚠️ Generation folder not found: {gen_type}")
                    continue
                
                # Find corresponding file in generation
                baseline_name = baseline_file.stem
                potential_files = []
                
                # Look for files that might match
                for gen_file in gen_folder.glob("*.json"):
                    if baseline_name.replace('_', '').replace('TC', '') in gen_file.stem.replace('_', '').replace('TC', ''):
                        potential_files.append(gen_file)
                
                if not potential_files:
                    # Try alternative matching
                    uc_part = baseline_name.split('_')[0] if '_' in baseline_name else baseline_name
                    for gen_file in gen_folder.glob("*.json"):
                        if uc_part[2:] in gen_file.stem:  # Match UC part
                            potential_files.append(gen_file)
                            break
                
                if not potential_files:
                    print(f"    ❌ No matching file found in {gen_type}")
                    continue
                
                gen_file = potential_files[0]
                gen_data = self.load_json_file(gen_file)
                
                if not gen_data or not isinstance(gen_data, list):
                    print(f"    ❌ Invalid generation data in {gen_file.name}")
                    continue
                
                # Find matching test case
                matching_test_case = self.find_matching_test_case(baseline_file, gen_data)
                
                if not matching_test_case:
                    # Fallback: use first test case
                    matching_test_case = gen_data[0] if len(gen_data) > 0 else None
                
                if not matching_test_case:
                    print(f"    ❌ No matching test case found in {gen_type}")
                    continue
                
                # Calculate metrics
                metrics = self.calculate_metrics_for_pair(baseline_test_case, matching_test_case)
                
                if metrics:
                    result = {
                        'baseline_file': baseline_file.name,
                        'generation_type': gen_type,
                        'generation_round': gen_type.split()[0],
                        'prompt_strategy': ' '.join(gen_type.split()[1:]),
                        'generated_file': gen_file.name,
                        'baseline_test_id': baseline_test_case.get('test_case_id', 'Unknown'),
                        'generated_test_id': matching_test_case.get('test_case_id', 'Unknown'),
                        **metrics
                    }
                    all_results.append(result)
                    print(f"    ✅ {gen_type}: BLEU={metrics['bleu']:.3f}, ROUGE-L={metrics['rougeL']:.3f}, Cosine={metrics['cosine_similarity']:.3f}")
                else:
                    print(f"    ❌ Failed to calculate metrics for {gen_type}")
        
        print(f"\n✅ Processed {len(all_results)} comparisons")
        return all_results
    
    def save_results_to_excel(self, results):
        """Save results to Excel file"""
        print("\n📄 SAVING RESULTS TO EXCEL")
        
        if not results:
            print("❌ No results to save")
            return
        
        df = pd.DataFrame(results)
        
        # Create Excel file with multiple sheets
        excel_path = self.results_path / "Metrics_Comparison_Results.xlsx"
        
        with pd.ExcelWriter(excel_path, engine='openpyxl') as writer:
            # Main results sheet
            df.to_excel(writer, sheet_name='All Results', index=False)
            
            # Summary by generation type
            summary_by_gen = df.groupby('generation_type').agg({
                'bleu': ['mean', 'std', 'count'],
                'rouge1': ['mean', 'std'],
                'rouge2': ['mean', 'std'],
                'rougeL': ['mean', 'std'],
                'cosine_similarity': ['mean', 'std']
            }).round(4)
            summary_by_gen.to_excel(writer, sheet_name='Summary by Generation')
            
            # Summary by prompt strategy
            summary_by_prompt = df.groupby('prompt_strategy').agg({
                'bleu': ['mean', 'std', 'count'],
                'rouge1': ['mean', 'std'],
                'rouge2': ['mean', 'std'],
                'rougeL': ['mean', 'std'],
                'cosine_similarity': ['mean', 'std']
            }).round(4)
            summary_by_prompt.to_excel(writer, sheet_name='Summary by Prompt')
            
            # Summary by round
            summary_by_round = df.groupby('generation_round').agg({
                'bleu': ['mean', 'std', 'count'],
                'rouge1': ['mean', 'std'],
                'rouge2': ['mean', 'std'],
                'rougeL': ['mean', 'std'],
                'cosine_similarity': ['mean', 'std']
            }).round(4)
            summary_by_round.to_excel(writer, sheet_name='Summary by Round')
        
        print(f"✅ Results saved to: {excel_path}")
        return excel_path
    
    def create_visualizations(self, results):
        """Create comprehensive visualizations"""
        print("\n📊 CREATING VISUALIZATIONS")
        
        if not results:
            print("❌ No results to visualize")
            return
        
        df = pd.DataFrame(results)
        
        # Set style
        plt.style.use('default')
        sns.set_palette("husl")
        
        # 1. Metrics comparison by generation type
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle('Metrics Comparison by Generation Type', fontsize=16, fontweight='bold')
        
        metrics = ['bleu', 'rouge1', 'rougeL', 'cosine_similarity']
        metric_names = ['BLEU Score', 'ROUGE-1', 'ROUGE-L', 'Cosine Similarity']
        
        for idx, (metric, name) in enumerate(zip(metrics, metric_names)):
            ax = axes[idx//2, idx%2]
            
            summary = df.groupby('generation_type')[metric].agg(['mean', 'std']).reset_index()
            
            bars = ax.bar(range(len(summary)), summary['mean'], 
                         yerr=summary['std'], capsize=5, alpha=0.8)
            
            ax.set_title(f'{name} by Generation Type', fontweight='bold')
            ax.set_xlabel('Generation Type')
            ax.set_ylabel(name)
            ax.set_xticks(range(len(summary)))
            ax.set_xticklabels(summary['generation_type'], rotation=45, ha='right')
            ax.grid(True, alpha=0.3)
            
            # Add value labels
            for i, bar in enumerate(bars):
                height = bar.get_height()
                ax.text(bar.get_x() + bar.get_width()/2., height,
                       f'{height:.3f}', ha='center', va='bottom')
        
        plt.tight_layout()
        plt.savefig(self.charts_path / '1_metrics_by_generation_type.png', 
                   dpi=300, bbox_inches='tight')
        plt.close()
        
        # 2. Metrics comparison by prompt strategy
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle('Metrics Comparison by Prompt Strategy', fontsize=16, fontweight='bold')
        
        for idx, (metric, name) in enumerate(zip(metrics, metric_names)):
            ax = axes[idx//2, idx%2]
            
            box_data = [df[df['prompt_strategy'] == strategy][metric].values 
                       for strategy in df['prompt_strategy'].unique()]
            
            bp = ax.boxplot(box_data, patch_artist=True, labels=df['prompt_strategy'].unique())
            
            # Color boxes
            colors = ['lightblue', 'lightgreen', 'lightcoral']
            for patch, color in zip(bp['boxes'], colors):
                patch.set_facecolor(color)
            
            ax.set_title(f'{name} by Prompt Strategy', fontweight='bold')
            ax.set_xlabel('Prompt Strategy')
            ax.set_ylabel(name)
            ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.charts_path / '2_metrics_by_prompt_strategy.png', 
                   dpi=300, bbox_inches='tight')
        plt.close()
        
        # 3. Correlation heatmap
        fig, ax = plt.subplots(figsize=(10, 8))
        
        correlation_data = df[metrics].corr()
        
        sns.heatmap(correlation_data, annot=True, cmap='coolwarm', center=0,
                   square=True, ax=ax, cbar_kws={'shrink': 0.8})
        
        ax.set_title('Correlation Matrix of Metrics', fontsize=14, fontweight='bold')
        
        plt.tight_layout()
        plt.savefig(self.charts_path / '3_metrics_correlation.png', 
                   dpi=300, bbox_inches='tight')
        plt.close()
        
        # 4. Performance trends by round
        fig, axes = plt.subplots(2, 2, figsize=(16, 12))
        fig.suptitle('Performance Trends by Generation Round', fontsize=16, fontweight='bold')
        
        for idx, (metric, name) in enumerate(zip(metrics, metric_names)):
            ax = axes[idx//2, idx%2]
            
            for strategy in df['prompt_strategy'].unique():
                strategy_data = df[df['prompt_strategy'] == strategy]
                round_means = strategy_data.groupby('generation_round')[metric].mean()
                
                ax.plot(round_means.index, round_means.values, 
                       marker='o', label=strategy, linewidth=2)
            
            ax.set_title(f'{name} Trends by Round', fontweight='bold')
            ax.set_xlabel('Generation Round')
            ax.set_ylabel(name)
            ax.legend()
            ax.grid(True, alpha=0.3)
        
        plt.tight_layout()
        plt.savefig(self.charts_path / '4_performance_trends.png', 
                   dpi=300, bbox_inches='tight')
        plt.close()
        
        print(f"✅ Charts saved to: {self.charts_path}")
    
    def create_validation_report(self, results):
        """Create validation report with sample calculations"""
        print("\n📋 CREATING VALIDATION REPORT")
        
        if not results:
            print("❌ No results to validate")
            return
        
        # Take first result for detailed validation
        sample_result = results[0]
        
        validation_text = []
        validation_text.append("=" * 80)
        validation_text.append("METRICS CALCULATION VALIDATION REPORT")
        validation_text.append("=" * 80)
        validation_text.append("")
        
        validation_text.append("SAMPLE CALCULATION DETAILS:")
        validation_text.append(f"Baseline File: {sample_result['baseline_file']}")
        validation_text.append(f"Generated File: {sample_result['generated_file']}")
        validation_text.append(f"Generation Type: {sample_result['generation_type']}")
        validation_text.append("")
        
        validation_text.append("CALCULATED METRICS:")
        validation_text.append(f"BLEU Score: {sample_result['bleu']:.6f}")
        validation_text.append(f"ROUGE-1: {sample_result['rouge1']:.6f}")
        validation_text.append(f"ROUGE-2: {sample_result['rouge2']:.6f}")
        validation_text.append(f"ROUGE-L: {sample_result['rougeL']:.6f}")
        validation_text.append(f"Cosine Similarity: {sample_result['cosine_similarity']:.6f}")
        validation_text.append("")
        
        # Overall statistics
        df = pd.DataFrame(results)
        
        validation_text.append("OVERALL STATISTICS:")
        validation_text.append(f"Total comparisons: {len(results)}")
        validation_text.append(f"Average BLEU: {df['bleu'].mean():.6f} ± {df['bleu'].std():.6f}")
        validation_text.append(f"Average ROUGE-1: {df['rouge1'].mean():.6f} ± {df['rouge1'].std():.6f}")
        validation_text.append(f"Average ROUGE-L: {df['rougeL'].mean():.6f} ± {df['rougeL'].std():.6f}")
        validation_text.append(f"Average Cosine Similarity: {df['cosine_similarity'].mean():.6f} ± {df['cosine_similarity'].std():.6f}")
        validation_text.append("")
        
        validation_text.append("VALIDATION NOTES:")
        validation_text.append("- BLEU scores range from 0.0 to 1.0 (higher is better)")
        validation_text.append("- ROUGE scores range from 0.0 to 1.0 (higher is better)")
        validation_text.append("- Cosine similarity ranges from -1.0 to 1.0 (higher is better)")
        validation_text.append("- All texts are preprocessed (lowercase, normalized)")
        validation_text.append("- BLEU uses smoothing function to handle short texts")
        validation_text.append("- ROUGE uses stemming for better matching")
        validation_text.append("- Cosine similarity uses TF-IDF vectorization")
        validation_text.append("")
        
        validation_text.append("=" * 80)
        
        # Save validation report
        validation_path = self.results_path / "Validation_Report.txt"
        with open(validation_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(validation_text))
        
        print(f"✅ Validation report saved to: {validation_path}")
        return validation_path
    
    def run_complete_analysis(self):
        """Run the complete metrics analysis"""
        print("🚀 STARTING COMPREHENSIVE METRICS ANALYSIS")
        print("=" * 80)
        
        # Step 1: Process all comparisons
        results = self.process_all_comparisons()
        
        if not results:
            print("❌ No results generated. Check baseline and generated files.")
            return
        
        # Step 2: Save results to Excel
        excel_path = self.save_results_to_excel(results)
        
        # Step 3: Create visualizations
        self.create_visualizations(results)
        
        # Step 4: Create validation report
        validation_path = self.create_validation_report(results)
        
        # Step 5: Summary
        print(f"\n🎯 ANALYSIS COMPLETE!")
        print("=" * 80)
        print(f"Processed {len(results)} test case comparisons")
        print(f"Results saved to: {excel_path}")
        print(f"Charts saved to: {self.charts_path}")
        print(f"Validation report: {validation_path}")
        
        # Quick statistics
        df = pd.DataFrame(results)
        print(f"\nQUICK STATISTICS:")
        print(f"Average BLEU score: {df['bleu'].mean():.4f}")
        print(f"Average ROUGE-L score: {df['rougeL'].mean():.4f}")
        print(f"Average Cosine Similarity: {df['cosine_similarity'].mean():.4f}")
        
        return results

if __name__ == "__main__":
    # Set working directory
    base_path = "c:/Users/user/Desktop/Progetti/ExplorationModule/Con Evaluation/Evaluation/Quantitative/Confrontation metrics"
    
    calculator = MetricsCalculator(base_path)
    results = calculator.run_complete_analysis()
