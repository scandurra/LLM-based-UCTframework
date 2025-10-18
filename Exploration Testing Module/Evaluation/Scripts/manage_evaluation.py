#!/usr/bin/env python3
"""
Utility script to manage evaluation of test case generation project.
Allows to initialize, update and manage evaluations manually.
"""

import os
import sys
import argparse

# Add the project root to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from Evaluation.evaluation_manager import EvaluationManager


def main():
    parser = argparse.ArgumentParser(
        description='Evaluation Management for Test Case Generation',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Usage examples:

# Initialize all Excel files (overwrites existing ones)
python manage_evaluation.py --init

# Update all evaluations for current round (auto-detect)
python manage_evaluation.py --update-all

# Update evaluations for a specific round
python manage_evaluation.py --update "R1 Zero Shot"
python manage_evaluation.py --update "R2 Few Shot"

# Update only a specific UC for a round
python manage_evaluation.py --update "R1 Zero Shot" --uc UC1

# Show evaluation status
python manage_evaluation.py --status

# Available round types:
# - R1 Zero Shot, R2 Zero Shot, R3 Zero Shot
# - R1 One Shot, R2 One Shot, R3 One Shot  
# - R1 Few Shot, R2 Few Shot, R3 Few Shot
        """
    )
    
    parser.add_argument(
        '--init', 
        action='store_true', 
        help='Initialize missing analysis Excel files (does not overwrite existing ones)'
    )
    
    parser.add_argument(
        '--force-init', 
        action='store_true', 
        help='Force reinitialization of all Excel files (overwrites existing ones)'
    )
    
    parser.add_argument(
        '--update', 
        type=str, 
        help='Update evaluations for a specific round type (e.g.: "R1 Zero Shot")'
    )
    
    parser.add_argument(
        '--update-all', 
        action='store_true', 
        help='Update all evaluations for current round (auto-detect)'
    )
    
    parser.add_argument(
        '--uc', 
        type=str, 
        help='Specific UC to update (use with --update)'
    )
    
    parser.add_argument(
        '--status', 
        action='store_true', 
        help='Show evaluation status'
    )
    
    parser.add_argument(
        '--list-rounds', 
        action='store_true', 
        help='List available round types'
    )
    
    args = parser.parse_args()
    
    # Create evaluation manager
    eval_manager = EvaluationManager()
    
    if args.list_rounds:
        print("Available round types:")
        for round_type in eval_manager.round_types:
            print(f"  - {round_type}")
        return
    
    if args.init:
        print("🔄 Initializing missing analysis Excel files...")
        success = eval_manager.initialize_excel_files(force=False)
        if success:
            print("✅ Initialization completed!")
        else:
            print("❌ Error during initialization!")
            sys.exit(1)
    
    elif args.force_init:
        print("🔄 Forced reinitialization of all Excel files...")
        success = eval_manager.initialize_excel_files(force=True)
        if success:
            print("✅ Reinitialization completed!")
        else:
            print("❌ Error during reinitialization!")
            sys.exit(1)
    
    elif args.update:
        round_type = args.update
        if round_type not in eval_manager.round_types:
            print(f"❌ Invalid round type: {round_type}")
            print("Valid round types:")
            for rt in eval_manager.round_types:
                print(f"  - {rt}")
            sys.exit(1)
        
        if args.uc:
            print(f"🔄 Updating evaluation for {args.uc} - {round_type}...")
            success = eval_manager.update_evaluation_for_uc(args.uc, round_type)
            if success:
                print("✅ Update completed!")
            else:
                print("❌ Error during update!")
                sys.exit(1)
        else:
            print(f"🔄 Updating evaluations for {round_type}...")
            updated_count = eval_manager.update_all_evaluations(round_type)
            print(f"✅ Updated {updated_count} evaluations!")
    
    elif args.update_all:
        print("🔄 Updating all evaluations for current round...")
        current_round = eval_manager.detect_round_and_type()
        print(f"🎯 Detected round: {current_round}")
        updated_count = eval_manager.update_all_evaluations(current_round)
        print(f"✅ Updated {updated_count} evaluations!")
    
    elif args.status:
        show_evaluation_status(eval_manager)
    
    else:
        parser.print_help()


def show_evaluation_status(eval_manager):
    """Shows evaluation status"""
    print("📊 EVALUATION STATUS")
    print("=" * 50)
    
    # Check if template exists
    if not os.path.exists(eval_manager.template_path):
        print(f"❌ Template not found: {eval_manager.template_path}")
        return
    
    # Get all UCs
    if not os.path.exists(eval_manager.evaluation_folder):
        print(f"❌ Evaluation folder not found: {eval_manager.evaluation_folder}")
        return
    
    uc_folders = [f for f in os.listdir(eval_manager.evaluation_folder) 
                 if f.endswith("-Evaluation") and os.path.isdir(os.path.join(eval_manager.evaluation_folder, f))]
    
    if not uc_folders:
        print("⚠️ No evaluation folders found")
        return
    
    print(f"📁 Found {len(uc_folders)} evaluation folders")
    
    # Check status of each UC
    for uc_folder in sorted(uc_folders):
        uc_id = uc_folder.replace("-Evaluation", "")
        excel_path = eval_manager.get_uc_excel_path(uc_id)
        
        print(f"\n📄 {uc_id}:")
        
        if os.path.exists(excel_path):
            print(f"  ✅ Excel file: {os.path.basename(excel_path)}")
            
            # Check if there are recent output/log files
            final_output = os.path.join(eval_manager.final_output, f"{uc_id}.json")
            gen_output = os.path.join(eval_manager.generations_output, f"{uc_id}.json")
            gen_txt = os.path.join(eval_manager.generations_output, f"{uc_id}.txt")
            
            if os.path.exists(final_output):
                test_count = eval_manager.count_test_cases(uc_id)
                print(f"  📊 Final output: {test_count} test cases")
            elif os.path.exists(gen_output):
                test_count = eval_manager.count_test_cases(uc_id)
                print(f"  📊 Gen output: {test_count} test cases")
            elif os.path.exists(gen_txt):
                print(f"  ⚠️ Output TXT: needs repair")
            else:
                print(f"  ❓ No output found")
        else:
            print(f"  ❌ Missing Excel file: {os.path.basename(excel_path)}")
    
    # Show current round type
    current_round = eval_manager.detect_round_and_type()
    print(f"\n🎯 Current detected round: {current_round}")
    
    print("\n💡 Suggestions:")
    print("  - To initialize only missing files: python manage_evaluation.py --init")
    print("  - To force reinitialization: python manage_evaluation.py --force-init")
    print("  - To update current round: python manage_evaluation.py --update-all")
    print("  - To update specific round: python manage_evaluation.py --update 'R1 Zero Shot'")


if __name__ == "__main__":
    main()
