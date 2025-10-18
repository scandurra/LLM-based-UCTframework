"""
Export all expert assessment data to CSV format
"""

import openpyxl
import csv
import os

UC_MAPPINGS = {
    'UC1': 'UC1-Assessment',
    'UC2.4': 'UC2_4-Assessment',
    'UC3.3': 'UC3_3-Assessment',
    'UC3.4.4': 'UC3_4_4-Assessment'
}

EXPERTS = ['Expert1', 'Expert2', 'Expert4']
EXPERT_DISPLAY = {'Expert1': 'Expert 1', 'Expert2': 'Expert 2', 'Expert4': 'Expert 3'}

DIMENSIONS = [
    'Clarity & Completeness',
    'Semantic consistency',
    'Context Deviation',
    'Level of creativity'
]

STRATEGIES = [
    'R1 Zero Shot', 'R2 Zero Shot', 'R3 Zero Shot',
    'R1 One Shot', 'R2 One Shot', 'R3 One Shot',
    'R1 Few Shot', 'R2 Few Shot', 'R3 Few Shot'
]

RATING_MAP = {
    '(1) Poor': 1,
    '(2) Below Average': 2,
    '(3) Average': 3,
    '(4) Good': 4,
    '(5) Excellent': 5
}


def extract_rating(cell_value):
    """Extract numeric rating from cell value"""
    if cell_value is None:
        return None
    
    cell_str = str(cell_value).strip()
    
    if cell_str in RATING_MAP:
        return RATING_MAP[cell_str]
    
    for rating_str, rating_val in RATING_MAP.items():
        if rating_str in cell_str:
            return rating_val
    
    try:
        num = int(cell_str.split(')')[0].strip('(').strip())
        if 1 <= num <= 5:
            return num
    except:
        pass
    
    return None


def export_to_csv():
    """Export all assessment data to CSV"""
    base_path = '/Users/raphaelmazzoleni/Desktop/RaphaelMac/ExplorationModule/Con Evaluation/Evaluation/Qualitative/ExpertEvaluation'
    output_file = os.path.join(base_path, 'Scripts', 'Expert_Assessments_Complete.csv')
    
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        
        # Header
        writer.writerow([
            'Expert',
            'UseCase',
            'QualityDimension',
            'Round',
            'Strategy',
            'FullStrategyName',
            'Rating'
        ])
        
        # Data rows
        for uc_name, uc_dir in sorted(UC_MAPPINGS.items()):
            filepath = os.path.join(base_path, uc_dir, f'{uc_dir.split("-")[0]}-Assessment.xlsx')
            wb = openpyxl.load_workbook(filepath)
            
            for expert_sheet in EXPERTS:
                ws = wb[expert_sheet]
                expert_display = EXPERT_DISPLAY[expert_sheet]
                
                for dim_idx, dimension in enumerate(DIMENSIONS):
                    row_idx = 5 + dim_idx
                    
                    for strat_idx, strategy in enumerate(STRATEGIES):
                        col_idx = 2 + strat_idx
                        cell_value = ws.cell(row=row_idx, column=col_idx).value
                        rating = extract_rating(cell_value)
                        
                        # Parse strategy name
                        parts = strategy.split()
                        round_num = parts[0]  # R1, R2, R3
                        strategy_type = ' '.join(parts[1:])  # Zero Shot, One Shot, Few Shot
                        
                        writer.writerow([
                            expert_display,
                            uc_name,
                            dimension,
                            round_num,
                            strategy_type,
                            strategy,
                            rating if rating is not None else ''
                        ])
            
            wb.close()
    
    print(f"✓ CSV exported to: {output_file}")
    
    # Count records
    with open(output_file, 'r') as f:
        row_count = sum(1 for line in f) - 1  # Subtract header
    print(f"✓ Total records: {row_count}")


if __name__ == "__main__":
    export_to_csv()
