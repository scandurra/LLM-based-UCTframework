# pip install pandas openpyxl
from pathlib import Path
import openpyxl
import glob
import re
import os.path

configuration_paths = [
    "SingleProcessing\\ZeroShot\\Llama3.3",
    "SingleProcessing\\ZeroShot\\Codellama",
    "SingleProcessing\\OneShot\\Llama3.3",
    "SingleProcessing\\OneShot\\Codellama",
    "SingleProcessing\\FewShot\\Llama3.3",
    "SingleProcessing\\FewShot\\Codellama",
    "BatchProcessing\\ZeroShot\\Llama3.3",
    "BatchProcessing\\ZeroShot\\Codellama",
    "BatchProcessing\\OneShot\\Llama3.3",
    "BatchProcessing\\OneShot\\Codellama",
    "BatchProcessing\\FewShot\\Llama3.3",
    "BatchProcessing\\FewShot\\Codellama"
]

def get_configuration_by_path(path):
    for i in range(12):
        configuration_id = i+1
        if configuration_paths[i] in path:
            return configuration_id

    raise Exception("Not found")

def get_path_by_configuration(configuration):
    return configuration_paths[configuration-1]


def normalize_filename(filename:str)->str:
    """
    Cleans file name.
    Example. UC003_TC1.functions.js becomes UC3_TC1
    """
    normalized = re.sub(r'\.(functions\.js|spec\.js)$', '', filename)

    # Extract UC part and TC part
    match = re.match(r'^UC(\d+)_TC(\d+)$', normalized)
    if not match:
        return normalized  # Return as-is if pattern doesn't match
    
    uc_part = match.group(1)
    tc_part = match.group(2)
    
    # Remove leading zeros from TC part
    tc_normalized = str(int(tc_part))
    
    # Process UC part: remove leading zeros and add dots between digits if length > 1
    uc_normalized = str(int(uc_part))  # Remove leading zeros
    
    # Add dots between digits if there are multiple digits
    if len(uc_normalized) > 1:
        uc_normalized = '.'.join(uc_normalized)
    
    return f"UC{uc_normalized}_TC{tc_normalized}"


def preprocess_code(code:str)->str:
    """
    Preprocess code to be evaluated with BLEU, code BLEU, ...
    """

    # ---------- Remove comments ----------
    def replacer(match):
        # Get the matched content
        content = match.group(0)
        
        # If it's a string (starts with quote), keep it
        if content.startswith('"') or content.startswith("'") or content.startswith('`'):
            return content
        
        # If it's a comment, replace with appropriate whitespace
        if content.startswith('//'):
            return ''  # Remove single-line comment
        elif content.startswith('/*'):
            # For multi-line comments, preserve newlines to maintain structure
            newlines = content.count('\n')
            return '\n' * newlines
        
        return content
    
    # Pattern that matches:
    # 1. String literals (single, double, template literals)
    # 2. Single-line comments
    # 3. Multi-line comments
    pattern = r'("(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'|`(?:[^`\\]|\\.)*`|//.*?$|/\*.*?\*/)'
    
    # Remove comments while preserving strings
    code = re.sub(pattern, replacer, code, flags=re.MULTILINE | re.DOTALL)



    # ---------- Remove import statement ----------
    # (since code is built concatenating .functions.js and .spec.js files)
    # Patterns to match various import/require statements
    lines = code.split('\n')
    filtered_lines = []
    patterns = [
        # ES6 imports
        r'^\s*import\s+.*from\s+["\'].*["\'];?\s*$',
        r'^\s*import\s+["\'].*["\'];?\s*$',
        r'^\s*import\s*\{.*\}\s*from\s+["\'].*["\'];?\s*$',
        r'^\s*import\s+\*\s+as\s+\w+\s+from\s+["\'].*["\'];?\s*$',
        r'^\s*import\s+\w+\s*,\s*\{.*\}\s*from\s+["\'].*["\'];?\s*$',
        
        # CommonJS requires
        r'^\s*(const|let|var)\s+.*=\s*require\s*\(["\'].*["\']\);?\s*$',
        r'^\s*(const|let|var)\s+\{.*\}\s*=\s*require\s*\(["\'].*["\']\);?\s*$',
        
        # Direct require calls
        r'^\s*require\s*\(["\'].*["\']\);?\s*$'
    ]

    for line in lines:
        # Check if line matches any import/require pattern
        is_import_line = any(re.match(pattern, line) for pattern in patterns)
        
        if not is_import_line:
            filtered_lines.append(line)
    
    # Join lines and clean up excessive empty lines
    result = '\n'.join(filtered_lines)
    
    # Remove multiple consecutive empty lines (keep max 2)
    result = re.sub(r'\n\s*\n\s*\n+', '\n\n', result)
    
    # Remove leading/trailing whitespace
    result = result.strip()
    return result


def extract_baseline_and_generated():
    baseline_files = {}
    baseline_path = Path("../Baseline")

    # Read baseline
    # I iterate over all sub folders.
    # When i see .functions.js file, i save the content. This content must be prepend to all test cases file content when saved
    for current_dir in baseline_path.rglob('*'):
        if not current_dir.is_dir():
            continue

        # Check if any file ending with .functions.js exists in current directory
        functions_content = ""
        functions_file = None
        
        for file_path in current_dir.iterdir():
            if not file_path.is_file() or not file_path.name.endswith('.functions.js'):
                continue

            functions_file = file_path
            try:
                with open(functions_file, 'r', encoding='utf-8') as f:
                    functions_content = f.read()
                    print(f"Found {functions_file.name} in: {current_dir}")
                break  # Use the first .functions.js file found
            except Exception as e:
                print(f"Error reading {functions_file.name} in {current_dir}: {e}")

        # Process all files in current directory
        for file_path in current_dir.iterdir():
            if not file_path.is_file() or not file_path.name.endswith('spec.js'):
                continue

            filename = file_path.name
            key = normalize_filename(filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                print(f"Retrieving baseline file with key: [{key}]")

                # Prepend functions content if it exists and this isn't a functions file itself
                if functions_content and not file_path.name.endswith('.functions.js'):
                    baseline_files[key] = functions_content + "\n\n" + content
                else:
                    baseline_files[key] = content
                    
            except Exception as e:
                print(f"Error reading file {file_path}: {e}")
                continue


    # for file_path in baseline_path.rglob('*'):
    #     if file_path.is_file() and (file_path.name.endswith('functions.js') or file_path.name.endswith('spec.js')):
    #         filename = file_path.name
    #         key = normalize_filename(filename)
    #         try:
    #             with open(file_path, 'r', encoding='utf-8') as f:
    #                 print(f"Retrieving baseline file with key: [{key}]")
    #                 baseline_files[key] = f.read()
    #         except Exception as e:
    #             print(f"Error reading baseline file {file_path}: {e}")

    # Read all generated
    generated_files = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
    }
    generated_path = Path("../Dataset")

    for file_path in generated_path.rglob('*'):
        if file_path.is_file() and (file_path.name.endswith('functions.js') or file_path.name.endswith('spec.js')):
            filename = file_path.name
            relative_path = str(file_path.relative_to(generated_path))
            configuration_key = get_configuration_by_path(relative_path)
            key = normalize_filename(filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    print(f"Retrieving generated file with key: [{configuration_key}][{key}]")
                    # I need to merge .functions.js and .spec.js files together
                    if key in generated_files[configuration_key]:
                        if file_path.name.endswith('functions.js'):
                            # prepend content from functions.js to spec.js
                            generated_files[configuration_key][key] = f"{f.read()}\n{generated_files[configuration_key][key]}"
                        else:
                            generated_files[configuration_key][key] = f"{generated_files[configuration_key][key]}\n{f.read()}"
                    else:
                        generated_files[configuration_key][key] = f.read()
            except Exception as e:
                print(f"Error reading generated file {file_path}: {e}")
                raise

    print(baseline_files["UC2.1_TC1"])

    return (baseline_files, generated_files)


def populate_quantitative_scores():
    extraction = extract_baseline_and_generated()
    baseline_files = extraction[0]
    generated_files = extraction[1]

    metrics={}

    for configuration_key, data in generated_files.items():
        for key, code in data.items():
            if not key in baseline_files:
                print(f"Key {key} not found in baseline")
                continue
            baseline_code = baseline_files[key]

            preprocessed_generated_code = preprocess_code(code)
            preprocessed_baseline_code = preprocess_code(baseline_code)
            print("------------------------------------------------------------------")
            print(preprocessed_generated_code)
            print("------------------------------------------------------------------")
            print(preprocessed_baseline_code)
            print("------------------------------------------------------------------")

            # make here all metrics between code and baseline_code
            # ...
            bleu = 0.5
            code_bleu = 1
            cosine_similarity = 0.8

            # save to excel file
            excel_path = f"../QuantitativeEvaluation/{configuration_key}/{key}.xlsx"
            if not os.path.isfile(excel_path):
                print(f"Excel file not found at path {excel_path}")
                continue

            # Open Excel file
            workbook = openpyxl.load_workbook(excel_path)
            # Select active sheet (the only one)
            worksheet = workbook.active
            
            worksheet["B11"] = bleu
            worksheet["B12"] = code_bleu
            worksheet["B13"] = cosine_similarity

            workbook.save(excel_path)

populate_quantitative_scores()

