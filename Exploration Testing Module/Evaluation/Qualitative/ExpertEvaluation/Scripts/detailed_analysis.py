"""
Detailed Analysis Generator for Expert Assessment
Generates detailed statistics and insights for the thesis text
"""

import openpyxl
import os
from collections import defaultdict
import statistics

# Configuration
UC_MAPPINGS = {
    'UC1': 'UC1-Assessment',
    'UC2.4': 'UC2_4-Assessment',
    'UC3.3': 'UC3_3-Assessment',
    'UC3.4.4': 'UC3_4_4-Assessment'
}

EXPERTS = ['Expert1', 'Expert2', 'Expert4']
EXPERT_DISPLAY_NAMES = {
    'Expert1': 'Expert 1',
    'Expert2': 'Expert 2',
    'Expert4': 'Expert 3'
}

QUALITY_DIMENSIONS = [
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

# Strategy groupings
STRATEGY_GROUPS = {
    'Zero-Shot': ['R1 Zero Shot', 'R2 Zero Shot', 'R3 Zero Shot'],
    'One-Shot': ['R1 One Shot', 'R2 One Shot', 'R3 One Shot'],
    'Few-Shot': ['R1 Few Shot', 'R2 Few Shot', 'R3 Few Shot']
}

RATING_MAP = {
    '(1) Poor': 1,
    '(2) Below Average': 2,
    '(3) Average': 3,
    '(4) Good': 4,
    '(5) Excellent': 5
}


def extract_rating_value(cell_value):
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


def load_all_assessments():
    """Load all assessment data from all UC files"""
    base_path = '/Users/raphaelmazzoleni/Desktop/RaphaelMac/ExplorationModule/Con Evaluation/Evaluation/Qualitative/ExpertEvaluation'
    
    all_data = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))
    
    for uc_name, uc_dir in UC_MAPPINGS.items():
        filepath = os.path.join(base_path, uc_dir, f'{uc_dir.split("-")[0]}-Assessment.xlsx')
        wb = openpyxl.load_workbook(filepath)
        
        for expert_sheet in EXPERTS:
            ws = wb[expert_sheet]
            expert_display = EXPERT_DISPLAY_NAMES[expert_sheet]
            
            for dim_idx, dimension in enumerate(QUALITY_DIMENSIONS):
                row_idx = 5 + dim_idx
                for strat_idx, strategy in enumerate(STRATEGIES):
                    col_idx = 2 + strat_idx
                    cell_value = ws.cell(row=row_idx, column=col_idx).value
                    rating = extract_rating_value(cell_value)
                    all_data[expert_display][uc_name][dimension][strategy] = rating
        
        wb.close()
    
    return all_data


def analyze_by_strategy_group(all_data):
    """Analyze ratings grouped by strategy type (Zero-Shot, One-Shot, Few-Shot)"""
    print("\n" + "="*80)
    print("ANALYSIS BY STRATEGY GROUP")
    print("="*80)
    
    for group_name, strategies in STRATEGY_GROUPS.items():
        print(f"\n--- {group_name} ---")
        
        # Overall for this group
        all_ratings = []
        for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
            for uc_name in UC_MAPPINGS.keys():
                for dimension in QUALITY_DIMENSIONS:
                    for strategy in strategies:
                        rating = all_data[expert][uc_name][dimension].get(strategy)
                        if rating is not None:
                            all_ratings.append(rating)
        
        if all_ratings:
            print(f"Overall Mean: {statistics.mean(all_ratings):.2f} ± {statistics.stdev(all_ratings):.2f}")
            print(f"Min: {min(all_ratings)}, Max: {max(all_ratings)}")
            print(f"Count: {len(all_ratings)}")
            
            # Rating distribution
            dist = {i: all_ratings.count(i) for i in range(1, 6)}
            print(f"Distribution: {dist}")
            
            # By dimension for this group
            print(f"\nBy Dimension:")
            for dimension in QUALITY_DIMENSIONS:
                dim_ratings = []
                for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
                    for uc_name in UC_MAPPINGS.keys():
                        for strategy in strategies:
                            rating = all_data[expert][uc_name][dimension].get(strategy)
                            if rating is not None:
                                dim_ratings.append(rating)
                
                if dim_ratings:
                    print(f"  {dimension}: {statistics.mean(dim_ratings):.2f} ± {statistics.stdev(dim_ratings):.2f}")


def analyze_inter_expert_agreement(all_data):
    """Analyze agreement between experts"""
    print("\n" + "="*80)
    print("INTER-EXPERT AGREEMENT ANALYSIS")
    print("="*80)
    
    # For each UC, dimension, and strategy, calculate variance across experts
    agreements = []
    
    for uc_name in UC_MAPPINGS.keys():
        for dimension in QUALITY_DIMENSIONS:
            for strategy in STRATEGIES:
                expert_ratings = []
                for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
                    rating = all_data[expert][uc_name][dimension].get(strategy)
                    if rating is not None:
                        expert_ratings.append(rating)
                
                if len(expert_ratings) == 3:  # All 3 experts rated
                    variance = statistics.variance(expert_ratings)
                    agreements.append(variance)
    
    if agreements:
        print(f"\nMean Inter-Expert Variance: {statistics.mean(agreements):.3f}")
        print(f"Std Dev of Variances: {statistics.stdev(agreements):.3f}")
        
        # Count perfect agreements (all experts gave same rating)
        perfect_agreements = sum(1 for v in agreements if v == 0)
        print(f"Perfect Agreements: {perfect_agreements}/{len(agreements)} ({100*perfect_agreements/len(agreements):.1f}%)")
        
        # Count cases with variance <= 0.5 (experts differed by at most 1)
        close_agreements = sum(1 for v in agreements if v <= 0.67)  # variance of [4,4,5] is 0.33, [3,4,5] is 0.67
        print(f"Close Agreements (diff ≤ 1): {close_agreements}/{len(agreements)} ({100*close_agreements/len(agreements):.1f}%)")


def analyze_rounds_evolution(all_data):
    """Analyze how ratings evolved across rounds R1, R2, R3"""
    print("\n" + "="*80)
    print("ROUNDS EVOLUTION ANALYSIS")
    print("="*80)
    
    rounds = {
        'R1': ['R1 Zero Shot', 'R1 One Shot', 'R1 Few Shot'],
        'R2': ['R2 Zero Shot', 'R2 One Shot', 'R2 Few Shot'],
        'R3': ['R3 Zero Shot', 'R3 One Shot', 'R3 Few Shot']
    }
    
    for round_name, strategies in rounds.items():
        print(f"\n--- {round_name} ---")
        
        all_ratings = []
        for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
            for uc_name in UC_MAPPINGS.keys():
                for dimension in QUALITY_DIMENSIONS:
                    for strategy in strategies:
                        rating = all_data[expert][uc_name][dimension].get(strategy)
                        if rating is not None:
                            all_ratings.append(rating)
        
        if all_ratings:
            print(f"Mean: {statistics.mean(all_ratings):.2f} ± {statistics.stdev(all_ratings):.2f}")
            print(f"Count: {len(all_ratings)}")


def find_best_and_worst_cases(all_data):
    """Find best and worst performing cases"""
    print("\n" + "="*80)
    print("BEST AND WORST PERFORMING CASES")
    print("="*80)
    
    # Calculate average for each (UC, Strategy) combination
    combinations = []
    
    for uc_name in UC_MAPPINGS.keys():
        for strategy in STRATEGIES:
            ratings = []
            for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
                for dimension in QUALITY_DIMENSIONS:
                    rating = all_data[expert][uc_name][dimension].get(strategy)
                    if rating is not None:
                        ratings.append(rating)
            
            if ratings:
                avg = statistics.mean(ratings)
                combinations.append((uc_name, strategy, avg, len(ratings)))
    
    # Sort by average
    combinations.sort(key=lambda x: x[2], reverse=True)
    
    print("\n--- TOP 5 BEST PERFORMING ---")
    for i, (uc, strat, avg, count) in enumerate(combinations[:5], 1):
        print(f"{i}. {uc} - {strat}: {avg:.2f} (n={count})")
    
    print("\n--- TOP 5 WORST PERFORMING ---")
    for i, (uc, strat, avg, count) in enumerate(combinations[-5:], 1):
        print(f"{i}. {uc} - {strat}: {avg:.2f} (n={count})")


def analyze_dimension_correlations(all_data):
    """Analyze how dimensions correlate with each other"""
    print("\n" + "="*80)
    print("DIMENSION ANALYSIS")
    print("="*80)
    
    # For each pair of dimensions, see if they tend to have similar ratings
    from itertools import combinations as iter_combinations
    
    for dim1, dim2 in iter_combinations(QUALITY_DIMENSIONS, 2):
        diffs = []
        
        for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
            for uc_name in UC_MAPPINGS.keys():
                for strategy in STRATEGIES:
                    rating1 = all_data[expert][uc_name][dim1].get(strategy)
                    rating2 = all_data[expert][uc_name][dim2].get(strategy)
                    
                    if rating1 is not None and rating2 is not None:
                        diffs.append(abs(rating1 - rating2))
        
        if diffs:
            avg_diff = statistics.mean(diffs)
            print(f"\n{dim1} vs {dim2}:")
            print(f"  Mean Absolute Difference: {avg_diff:.2f}")
            same_rating = sum(1 for d in diffs if d == 0)
            print(f"  Same Rating: {same_rating}/{len(diffs)} ({100*same_rating/len(diffs):.1f}%)")


def analyze_extreme_ratings(all_data):
    """Analyze cases with extreme ratings (1 or 5)"""
    print("\n" + "="*80)
    print("EXTREME RATINGS ANALYSIS")
    print("="*80)
    
    rating_5_count = 0
    rating_1_count = 0
    total_count = 0
    
    # Track by dimension
    dimension_5s = {dim: 0 for dim in QUALITY_DIMENSIONS}
    dimension_1s = {dim: 0 for dim in QUALITY_DIMENSIONS}
    dimension_totals = {dim: 0 for dim in QUALITY_DIMENSIONS}
    
    # Track by strategy group
    group_5s = {group: 0 for group in STRATEGY_GROUPS.keys()}
    group_1s = {group: 0 for group in STRATEGY_GROUPS.keys()}
    group_totals = {group: 0 for group in STRATEGY_GROUPS.keys()}
    
    for expert in ['Expert 1', 'Expert 2', 'Expert 3']:
        for uc_name in UC_MAPPINGS.keys():
            for dimension in QUALITY_DIMENSIONS:
                for strategy in STRATEGIES:
                    rating = all_data[expert][uc_name][dimension].get(strategy)
                    
                    if rating is not None:
                        total_count += 1
                        dimension_totals[dimension] += 1
                        
                        # Find strategy group
                        for group_name, strategies in STRATEGY_GROUPS.items():
                            if strategy in strategies:
                                group_totals[group_name] += 1
                                if rating == 5:
                                    group_5s[group_name] += 1
                                elif rating == 1:
                                    group_1s[group_name] += 1
                                break
                        
                        if rating == 5:
                            rating_5_count += 1
                            dimension_5s[dimension] += 1
                        elif rating == 1:
                            rating_1_count += 1
                            dimension_1s[dimension] += 1
    
    print(f"\n--- OVERALL ---")
    print(f"Rating 5 (Excellent): {rating_5_count}/{total_count} ({100*rating_5_count/total_count:.1f}%)")
    print(f"Rating 1 (Poor): {rating_1_count}/{total_count} ({100*rating_1_count/total_count:.1f}%)")
    
    print(f"\n--- BY DIMENSION ---")
    for dimension in QUALITY_DIMENSIONS:
        if dimension_totals[dimension] > 0:
            pct_5 = 100 * dimension_5s[dimension] / dimension_totals[dimension]
            pct_1 = 100 * dimension_1s[dimension] / dimension_totals[dimension]
            print(f"{dimension}:")
            print(f"  Rating 5: {dimension_5s[dimension]}/{dimension_totals[dimension]} ({pct_5:.1f}%)")
            print(f"  Rating 1: {dimension_1s[dimension]}/{dimension_totals[dimension]} ({pct_1:.1f}%)")
    
    print(f"\n--- BY STRATEGY GROUP ---")
    for group in ['Zero-Shot', 'One-Shot', 'Few-Shot']:
        if group_totals[group] > 0:
            pct_5 = 100 * group_5s[group] / group_totals[group]
            pct_1 = 100 * group_1s[group] / group_totals[group]
            print(f"{group}:")
            print(f"  Rating 5: {group_5s[group]}/{group_totals[group]} ({pct_5:.1f}%)")
            print(f"  Rating 1: {group_1s[group]}/{group_totals[group]} ({pct_1:.1f}%)")


def main():
    """Main execution function"""
    print("Loading assessment data...")
    all_data = load_all_assessments()
    
    analyze_by_strategy_group(all_data)
    analyze_inter_expert_agreement(all_data)
    analyze_rounds_evolution(all_data)
    find_best_and_worst_cases(all_data)
    analyze_dimension_correlations(all_data)
    analyze_extreme_ratings(all_data)
    
    print("\n" + "="*80)
    print("ANALYSIS COMPLETE")
    print("="*80)


if __name__ == "__main__":
    main()
