import os
import json
from pathlib import Path
from collections import defaultdict

class StructureErrorExtractor:
    def __init__(self, base_path):
        self.base_path = Path(base_path)
        self.generations_path = self.base_path / "Generations"
        self.json_syntax_path = self.base_path / "Evaluation" / "Quantitative" / "JSON Syntax"
        
        # Required JSON fields
        self.required_fields = [
            "test_case_id", "title", "preconditions", "postconditions", 
            "test_steps", "test_type", "priority", "use_case_id"
        ]
        
        self.required_step_fields = ["step", "expected"]
        
        # Generation types
        self.generation_types = [
            "R1 Zero Shot", "R1 One Shot", "R1 Few Shot",
            "R2 Zero Shot", "R2 One Shot", "R2 Few Shot",
            "R3 Zero Shot", "R3 One Shot", "R3 Few Shot"
        ]
    
    def validate_json_structure_detailed(self, json_data, file_name):
        """Validate JSON structure and return detailed error info per test case"""
        
        detailed_errors = []
        
        if not isinstance(json_data, list):
            detailed_errors.append({
                'test_case_id': 'ROOT',
                'test_case_title': 'N/A',
                'use_case_id': 'N/A',
                'error': "Root should be an array"
            })
            return detailed_errors
        
        for i, test_case in enumerate(json_data):
            test_case_errors = []
            test_case_id = test_case.get('test_case_id', f'UNKNOWN_{i+1}')
            test_case_title = test_case.get('title', 'N/A')
            use_case_id = test_case.get('use_case_id', 'N/A')
            
            if not isinstance(test_case, dict):
                detailed_errors.append({
                    'test_case_id': test_case_id,
                    'test_case_title': test_case_title,
                    'use_case_id': use_case_id,
                    'error': f"Test case {i+1} should be an object"
                })
                continue
            
            # Check required fields
            for field in self.required_fields:
                if field not in test_case:
                    test_case_errors.append(f"Missing field '{field}'")
                elif test_case[field] is None or test_case[field] == "":
                    test_case_errors.append(f"Empty field '{field}'")
            
            # Check test_steps structure
            if "test_steps" in test_case:
                if not isinstance(test_case["test_steps"], list):
                    test_case_errors.append("'test_steps' should be an array")
                else:
                    for j, step in enumerate(test_case["test_steps"]):
                        if not isinstance(step, dict):
                            test_case_errors.append(f"Step {j+1} should be an object")
                            continue
                        
                        for step_field in self.required_step_fields:
                            if step_field not in step:
                                test_case_errors.append(f"Step {j+1}: Missing field '{step_field}'")
                            elif step[step_field] is None or step[step_field] == "":
                                test_case_errors.append(f"Step {j+1}: Empty field '{step_field}'")
            
            # If there are errors for this test case, add to detailed errors
            if test_case_errors:
                detailed_errors.append({
                    'test_case_id': test_case_id,
                    'test_case_title': test_case_title,
                    'use_case_id': use_case_id,
                    'error': "; ".join(test_case_errors)
                })
        
        return detailed_errors
    
    def analyze_structure_errors(self):
        """Analyze structure errors with detailed test case information"""
        
        print("🔍 ANALYZING STRUCTURE ERRORS WITH TEST CASE DETAILS...")
        
        all_structure_errors = []
        
        for gen_type in self.generation_types:
            gen_folder = self.generations_path / gen_type
            
            if not gen_folder.exists():
                print(f"  ⚠️ Folder not found: {gen_type}")
                continue
            
            print(f"  📁 Processing {gen_type}...")
            
            for file_path in gen_folder.glob("*.json"):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        json_data = json.load(f)
                    
                    # Check structure with detailed info
                    detailed_errors = self.validate_json_structure_detailed(json_data, file_path.name)
                    
                    if detailed_errors:
                        for error_info in detailed_errors:
                            all_structure_errors.append({
                                'generation_type': gen_type,
                                'generation_round': gen_type.split()[0],  # R1, R2, R3
                                'prompt_strategy': " ".join(gen_type.split()[1:]),  # Zero Shot, One Shot, Few Shot
                                'file_name': file_path.name,
                                'test_case_id': error_info['test_case_id'],
                                'test_case_title': error_info['test_case_title'],
                                'use_case_id': error_info['use_case_id'],
                                'error_description': error_info['error']
                            })
                        
                except json.JSONDecodeError:
                    # Skip syntax error files - they're handled separately
                    continue
                except Exception as e:
                    print(f"    ❌ Error processing {file_path.name}: {e}")
                    continue
        
        return all_structure_errors
    
    def create_structure_errors_table(self, structure_errors):
        """Create a formatted table of structure errors"""
        
        print("📄 CREATING STRUCTURE ERRORS TABLE...")
        
        # Sort errors by generation type, then by use case, then by test case
        structure_errors.sort(key=lambda x: (x['generation_type'], x['use_case_id'], x['test_case_id']))
        
        # Create the table content
        table_lines = []
        table_lines.append("=" * 120)
        table_lines.append("JSON STRUCTURE ERRORS - DETAILED TEST CASE ANALYSIS")
        table_lines.append("=" * 120)
        table_lines.append("")
        
        # Summary statistics
        total_errors = len(structure_errors)
        by_generation = defaultdict(int)
        by_prompt = defaultdict(int)
        by_round = defaultdict(int)
        by_use_case = defaultdict(int)
        
        for error in structure_errors:
            by_generation[error['generation_type']] += 1
            by_prompt[error['prompt_strategy']] += 1
            by_round[error['generation_round']] += 1
            by_use_case[error['use_case_id']] += 1
        
        table_lines.append(f"SUMMARY: {total_errors} structure errors found across all generations")
        table_lines.append("")
        
        table_lines.append("ERRORS BY GENERATION TYPE:")
        for gen_type, count in sorted(by_generation.items()):
            table_lines.append(f"  {gen_type}: {count} errors")
        table_lines.append("")
        
        table_lines.append("ERRORS BY PROMPT STRATEGY:")
        for prompt, count in sorted(by_prompt.items()):
            table_lines.append(f"  {prompt}: {count} errors")
        table_lines.append("")
        
        table_lines.append("ERRORS BY GENERATION ROUND:")
        for round_num, count in sorted(by_round.items()):
            table_lines.append(f"  {round_num}: {count} errors")
        table_lines.append("")
        
        table_lines.append("ERRORS BY USE CASE:")
        for uc, count in sorted(by_use_case.items()):
            table_lines.append(f"  {uc}: {count} errors")
        table_lines.append("")
        
        table_lines.append("=" * 120)
        table_lines.append("DETAILED ERROR BREAKDOWN")
        table_lines.append("=" * 120)
        table_lines.append("")
        
        # Header for detailed table
        header = f"{'Gen Type':<15} {'Round':<6} {'Prompt':<10} {'File Name':<20} {'Use Case':<10} {'Test Case ID':<15} {'Error Description':<50}"
        table_lines.append(header)
        table_lines.append("-" * 120)
        
        # Add each error
        current_generation = None
        for error in structure_errors:
            if current_generation != error['generation_type']:
                if current_generation is not None:
                    table_lines.append("")  # Add space between generations
                current_generation = error['generation_type']
            
            # Truncate long descriptions
            error_desc = error['error_description']
            if len(error_desc) > 47:
                error_desc = error_desc[:44] + "..."
            
            row = f"{error['generation_type']:<15} {error['generation_round']:<6} {error['prompt_strategy']:<10} {error['file_name']:<20} {error['use_case_id']:<10} {error['test_case_id']:<15} {error_desc:<50}"
            table_lines.append(row)
        
        table_lines.append("")
        table_lines.append("=" * 120)
        table_lines.append("END OF STRUCTURE ERRORS ANALYSIS")
        table_lines.append("=" * 120)
        table_lines.append(f"Generated on: {Path(__file__).stat().st_mtime}")
        table_lines.append("")
        
        # Save to file
        output_path = self.json_syntax_path / "Structure_Errors_Detailed_Table.txt"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(table_lines))
        
        print(f"✅ Structure errors table saved: {output_path}")
        return output_path
    
    def create_compact_summary_table(self, structure_errors):
        """Create a compact summary table"""
        
        print("📄 CREATING COMPACT SUMMARY TABLE...")
        
        # Group by generation and use case
        summary_data = defaultdict(lambda: defaultdict(list))
        
        for error in structure_errors:
            gen_key = f"{error['generation_round']} {error['prompt_strategy']}"
            summary_data[gen_key][error['use_case_id']].append(error['test_case_id'])
        
        # Create compact table
        compact_lines = []
        compact_lines.append("=" * 80)
        compact_lines.append("JSON STRUCTURE ERRORS - COMPACT SUMMARY")
        compact_lines.append("=" * 80)
        compact_lines.append("")
        
        compact_lines.append(f"{'Generation':<15} {'Use Case':<12} {'Test Cases with Errors'}")
        compact_lines.append("-" * 80)
        
        for gen_type in sorted(summary_data.keys()):
            for use_case in sorted(summary_data[gen_type].keys()):
                test_cases = sorted(set(summary_data[gen_type][use_case]))
                test_cases_str = ", ".join(test_cases)
                
                # Handle long test case lists
                if len(test_cases_str) > 50:
                    test_cases_str = test_cases_str[:47] + "..."
                
                compact_lines.append(f"{gen_type:<15} {use_case:<12} {test_cases_str}")
        
        compact_lines.append("")
        compact_lines.append("=" * 80)
        
        # Save compact version
        compact_path = self.json_syntax_path / "Structure_Errors_Compact_Summary.txt"
        with open(compact_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(compact_lines))
        
        print(f"✅ Compact summary saved: {compact_path}")
        return compact_path
    
    def run_extraction(self):
        """Run the complete structure error extraction"""
        
        print("🚀 STARTING STRUCTURE ERROR EXTRACTION")
        print("=" * 50)
        
        # Analyze structure errors
        structure_errors = self.analyze_structure_errors()
        
        if not structure_errors:
            print("✅ No structure errors found!")
            
            # Create empty report
            empty_report = self.json_syntax_path / "Structure_Errors_Detailed_Table.txt"
            with open(empty_report, 'w', encoding='utf-8') as f:
                f.write("JSON STRUCTURE ERRORS - DETAILED TEST CASE ANALYSIS\n")
                f.write("=" * 60 + "\n\n")
                f.write("✅ NO STRUCTURE ERRORS FOUND!\n")
                f.write("All JSON files have valid structure.\n")
            
            return empty_report
        
        # Create detailed table
        detailed_path = self.create_structure_errors_table(structure_errors)
        
        # Create compact summary
        compact_path = self.create_compact_summary_table(structure_errors)
        
        # Print summary
        print(f"\n📊 EXTRACTION SUMMARY")
        print("=" * 50)
        print(f"Structure errors found: {len(structure_errors)}")
        print(f"Files with errors: {len(set(error['file_name'] for error in structure_errors))}")
        print(f"Use cases affected: {len(set(error['use_case_id'] for error in structure_errors))}")
        print(f"\nFiles created:")
        print(f"  📄 {detailed_path}")
        print(f"  📄 {compact_path}")
        
        return detailed_path, compact_path

if __name__ == "__main__":
    base_path = "c:/Users/user/Desktop/Progetti/ExplorationModule/Con Evaluation"
    extractor = StructureErrorExtractor(base_path)
    extractor.run_extraction()
