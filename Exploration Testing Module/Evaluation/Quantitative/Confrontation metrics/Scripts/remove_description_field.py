import json
import os
from pathlib import Path

def remove_description_from_json_files():
    """Remove the description field from all JSON files in Baseline JSON folder"""
    
    baseline_json_path = Path("Dataset/Baseline JSON")
    
    if not baseline_json_path.exists():
        print("❌ Baseline JSON folder not found!")
        return
    
    processed_files = 0
    
    # Process all JSON files in the folder
    for json_file in baseline_json_path.glob("*.json"):
        print(f"Processing {json_file.name}...")
        
        try:
            # Read the JSON file
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check if data is a list of test cases
            if isinstance(data, list):
                modified = False
                for test_case in data:
                    if isinstance(test_case, dict) and 'description' in test_case:
                        del test_case['description']
                        modified = True
                
                # Write back only if modified
                if modified:
                    with open(json_file, 'w', encoding='utf-8') as f:
                        json.dump(data, f, indent=2, ensure_ascii=False)
                    print(f"  ✅ Removed description field from {json_file.name}")
                    processed_files += 1
                else:
                    print(f"  ➡️ No description field found in {json_file.name}")
            
            else:
                print(f"  ⚠️ Unexpected JSON structure in {json_file.name}")
                
        except Exception as e:
            print(f"  ❌ Error processing {json_file.name}: {e}")
    
    print(f"\n✅ Processing complete! Modified {processed_files} files.")

if __name__ == "__main__":
    print("🧹 REMOVING DESCRIPTION FIELDS FROM BASELINE JSON FILES")
    print("=" * 60)
    remove_description_from_json_files()
