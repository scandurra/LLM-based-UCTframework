"""
Script to calculate Cohen's kappa (pairwise) and Fleiss' kappa for expert agreement analysis.
Reads from Expert_Assessments_Complete.csv and calculates inter-rater reliability metrics.
"""

import pandas as pd
import numpy as np
from sklearn.metrics import cohen_kappa_score
from statsmodels.stats.inter_rater import fleiss_kappa
from itertools import combinations

def calculate_pairwise_kappa(df):
    """Calculate Cohen's kappa for each pair of experts"""
    experts = ['Expert 1', 'Expert 2', 'Expert 3']
    kappa_results = []
    
    # Create pivot to get ratings in wide format
    ratings_df = df.pivot_table(
        index=['UseCase', 'QualityDimension', 'Round', 'Strategy'],
        columns='Expert',
        values='Rating',
        aggfunc='first'
    ).reset_index()
    
    for i, exp1 in enumerate(experts):
        for exp2 in experts[i+1:]:
            # Filter rows where both experts have ratings
            valid_rows = ratings_df[[exp1, exp2]].dropna()
            if len(valid_rows) > 0:
                kappa = cohen_kappa_score(
                    valid_rows[exp1], 
                    valid_rows[exp2],
                    weights='quadratic'
                )
                kappa_results.append({
                    'Expert_Pair': f'{exp1} vs {exp2}',
                    'Cohen_Kappa': kappa,
                    'N_cases': len(valid_rows)
                })
    
    return pd.DataFrame(kappa_results)

def calculate_fleiss_kappa(df):
    """Calculate Fleiss' kappa for all three experts"""
    experts = ['Expert 1', 'Expert 2', 'Expert 3']
    
    # Create pivot to get ratings in wide format
    ratings_df = df.pivot_table(
        index=['UseCase', 'QualityDimension', 'Round', 'Strategy'],
        columns='Expert',
        values='Rating',
        aggfunc='first'
    ).reset_index()
    
    # Drop rows with any NaN
    valid_ratings = ratings_df[experts].dropna()
    
    # Create frequency matrix: rows = items, cols = categories (1-5)
    categories = [1, 2, 3, 4, 5]
    frequency_matrix = []
    
    for idx, row in valid_ratings.iterrows():
        counts = [int((row == cat).sum()) for cat in categories]
        frequency_matrix.append(counts)
    
    freq_matrix = np.array(frequency_matrix)
    
    # Calculate Fleiss' kappa
    try:
        fleiss_k = fleiss_kappa(freq_matrix, method='fleiss')
        return fleiss_k, len(valid_ratings)
    except Exception as e:
        print(f"Error calculating Fleiss' kappa: {e}")
        return None, 0

def main():
    # Load data
    print("Loading expert assessment data...")
    df = pd.read_csv('/Users/raphaelmazzoleni/Desktop/RaphaelMac/ExplorationModule/Con Evaluation/Evaluation/Qualitative/ExpertEvaluation/Scripts/Expert_Assessments_Complete.csv')
    
    print(f"\nTotal assessments: {len(df)}")
    print(f"Columns: {df.columns.tolist()}")
    
    # Calculate pairwise Cohen's kappa
    print("\n" + "="*60)
    print("PAIRWISE COHEN'S KAPPA (Quadratic Weighted for Ordinal Scale)")
    print("="*60)
    
    pairwise_kappa = calculate_pairwise_kappa(df)
    print(pairwise_kappa.to_string(index=False))
    
    avg_kappa = pairwise_kappa['Cohen_Kappa'].mean()
    print(f"\nAverage pairwise Cohen's kappa: {avg_kappa:.3f}")
    
    # Calculate Fleiss' kappa
    print("\n" + "="*60)
    print("FLEISS' KAPPA (for all 3 experts)")
    print("="*60)
    
    fleiss_k, n_cases = calculate_fleiss_kappa(df)
    
    if fleiss_k is not None:
        print(f"Fleiss' kappa: {fleiss_k:.3f}")
        print(f"Based on {n_cases} complete assessments")
    else:
        print("Could not calculate Fleiss' kappa")
    
    # Interpretation guide
    print("\n" + "="*60)
    print("INTERPRETATION GUIDE (Landis & Koch, 1977)")
    print("="*60)
    print("< 0.00: Poor agreement")
    print("0.00 - 0.20: Slight agreement")
    print("0.21 - 0.40: Fair agreement")
    print("0.41 - 0.60: Moderate agreement")
    print("0.61 - 0.80: Substantial agreement")
    print("0.81 - 1.00: Almost perfect agreement")
    
    # Calculate and display agreement percentages
    print("\n" + "="*60)
    print("AGREEMENT ANALYSIS")
    print("="*60)
    
    experts = ['Expert 1', 'Expert 2', 'Expert 3']
    ratings_df = df.pivot_table(
        index=['UseCase', 'QualityDimension', 'Round', 'Strategy'],
        columns='Expert',
        values='Rating',
        aggfunc='first'
    ).reset_index()
    valid_ratings = ratings_df[experts].dropna()
    
    # Perfect agreement (all 3 same)
    perfect = sum(valid_ratings.nunique(axis=1) == 1)
    perfect_pct = (perfect / len(valid_ratings)) * 100
    
    # Close agreement (max diff = 1)
    close = sum(valid_ratings.max(axis=1) - valid_ratings.min(axis=1) <= 1)
    close_pct = (close / len(valid_ratings)) * 100
    
    print(f"Perfect agreement (all 3 experts same rating): {perfect}/{len(valid_ratings)} ({perfect_pct:.1f}%)")
    print(f"Close agreement (max difference ≤ 1): {close}/{len(valid_ratings)} ({close_pct:.1f}%)")
    
    # Save results to file
    output_file = '/Users/raphaelmazzoleni/Desktop/RaphaelMac/ExplorationModule/Con Evaluation/Evaluation/Qualitative/ExpertEvaluation/Scripts/kappa_results.txt'
    
    with open(output_file, 'w') as f:
        f.write("INTER-RATER RELIABILITY ANALYSIS\n")
        f.write("="*60 + "\n\n")
        f.write("PAIRWISE COHEN'S KAPPA (Quadratic Weighted)\n")
        f.write("-"*60 + "\n")
        f.write(pairwise_kappa.to_string(index=False) + "\n")
        f.write(f"\nAverage pairwise Cohen's kappa: {avg_kappa:.3f}\n\n")
        f.write("FLEISS' KAPPA (All 3 Experts)\n")
        f.write("-"*60 + "\n")
        f.write(f"Fleiss' kappa: {fleiss_k:.3f}\n")
        f.write(f"Based on {n_cases} complete assessments\n\n")
        f.write("AGREEMENT PERCENTAGES\n")
        f.write("-"*60 + "\n")
        f.write(f"Perfect agreement: {perfect}/{len(valid_ratings)} ({perfect_pct:.1f}%)\n")
        f.write(f"Close agreement (diff ≤ 1): {close}/{len(valid_ratings)} ({close_pct:.1f}%)\n")
    
    print(f"\nResults saved to: {output_file}")

if __name__ == "__main__":
    main()
