import os
import json
from datetime import datetime


save_folder = os.path.expanduser("C:\\Users\\user\\Desktop\\Progetti\\TesiLLMTesting\\Parsing")
os.makedirs(save_folder, exist_ok=True)  # Crea la cartella se non esiste


def load_use_cases(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    return content


def parse_use_case(text, all_use_cases):
    use_case_data = {}

  
    use_case_title = text.split("Summary")[0].split(":")[-1].strip()

  
    use_case_data['testName'] = use_case_title
    
  
    for line in text.split("\n"):
        if line.startswith("Precondition :"):
            precondition = line.split(":")[1].strip()
            if precondition.startswith("UC"):
                # Se è un riferimento a un altro UseCase, risolvi la precondizione
                precondition = resolve_precondition(precondition, all_use_cases)
            use_case_data['precondition'] = precondition
        elif line.startswith("Postcondition :"):
            use_case_data['postcondition'] = line.split(":")[1].strip()
        elif line.startswith("Base sequence :"):
            use_case_data['base_sequence'] = [step.strip() for step in line.split(":")[1].split(":")]
        elif line.startswith("Branch sequence :"):
            use_case_data['branch_sequence'] = [step.strip() for step in line.split(":")[1].split(":")]
        elif line.startswith("Exception sequence :"):
            use_case_data['exception_sequence'] = [step.strip() for step in line.split(":")[1].split(":")]
    
    return use_case_data


def resolve_precondition(precondition, all_use_cases):
    for uc in all_use_cases:
        if uc['testName'] == precondition:
            return uc['testName']
    return precondition  # Se non trovato, ritorna come stringa


def generate_json_from_use_cases(input_file, output_folder):
    content = load_use_cases(input_file)
    all_use_cases = []
    
    # Split del contenuto per ogni Use Case
    use_case_blocks = content.split("UseCase :")[1:]  # Ignora la prima parte, che è prima del primo UseCase
    
    for block in use_case_blocks:
        use_case = parse_use_case(block, all_use_cases)
        all_use_cases.append(use_case)
    
    # Scrivi il risultato nel formato JSON
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    output_file = os.path.join(output_folder, f"use_cases_{timestamp}.json")
    
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(all_use_cases, json_file, indent=4, ensure_ascii=False)
    
    print(f"✅ File JSON generato e salvato in: {output_file}")

# Esegui la funzione con il file di input e la cartella di output
input_file_path = os.path.join(save_folder, "UseCasesTXT.txt")
generate_json_from_use_cases(input_file_path, save_folder)
