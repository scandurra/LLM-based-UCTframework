import os
import subprocess
# from Parsing.DocxToTxt import convert_docx_to_txt

def main():
    # Percorsi
    # docx_file = 'UseCases.docx'
    parsing_folder = 'Parsing'
    output_txt_file = os.path.join(parsing_folder, 'UseCasesTXT.txt')
    use_cases_folder = os.path.join(parsing_folder, 'Use Cases from DOCX')

    # Verifiche
    # if not os.path.isfile(docx_file):
    #     print(f"Errore: Il file {docx_file} non esiste.")
    #     return
    if not os.path.isdir(parsing_folder):
        print(f"Errore: La cartella {parsing_folder} non esiste.")
        return

    # 1. Converti il DOCX in TXT
    # convert_docx_to_txt(docx_file, output_txt_file)
    # print(f"✅ File convertito con successo in {output_txt_file}")

    # 2. Dividi i casi d'uso in file separati
    split_use_cases(output_txt_file, use_cases_folder)

    # 3. Avvia UseCaseGenerator.py per ogni file e genera prompt
    choice = generate_for_each_usecase(use_cases_folder)

    # 4. Esegui i prompt generati e salva le risposte
    execute_prompts(choice)

def split_use_cases(input_txt_path, output_folder):
    os.makedirs(output_folder, exist_ok=True)

    with open(input_txt_path, "r", encoding="utf-8") as file:
        content = file.read()

    parts = content.split("\n\n")
    index_start = 0
    consecutive_blanks = 0

    for i, part in enumerate(parts):
        if not part.strip():
            consecutive_blanks += 1
            if consecutive_blanks == 2:
                index_start = i + 1
                break
        else:
            consecutive_blanks = 0

    cleaned_content = "\n\n".join(parts[index_start:])
    cases = cleaned_content.strip().split("\n\n\n")

    for idx, case in enumerate(cases):
        case = case.strip()
        if not case:
            continue
        if idx != 0:
            filename = f"UC_{idx:02}.txt"
            filepath = os.path.join(output_folder, filename)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(case)
            print(f"📄 Creato: {filepath}")

def generate_for_each_usecase(use_cases_folder):
    parsing_folder = 'Parsing'
    scripts = {
        "1": {
            "script": os.path.join(parsing_folder, 'UseCaseGeneratorJSON.py'),
            "output_folder": os.path.join(parsing_folder, 'UC Formattati in JSON')
        },
        "2": {
            "script": os.path.join(parsing_folder, 'UseCaseGeneratorTXT.py'),
            "output_folder": os.path.join(parsing_folder, 'UC Formattati in TXT')
        },
        "3": {
            "script": os.path.join(parsing_folder, 'UseCaseGeneratorRUCM.py'),
            "output_folder": os.path.join(parsing_folder, 'UC Formattati in RUCM')
        },
        "4": {
            "script": os.path.join(parsing_folder, 'UseCaseGeneratorJSON_Batch.py'),
            "output_folder": os.path.join(parsing_folder, 'UC Batch Formattati in JSON')
        }
    }

    print("Quale script vuoi eseguire?")
    for key, value in scripts.items():
        print(f"{key}: {os.path.basename(value['script'])}")
    choice = input("Seleziona il numero dello script da eseguire: ").strip()

    if choice not in scripts:
        print("❌ Scelta non valida.")
        return

    selected_script = scripts[choice]['script']
    output_folder = scripts[choice]['output_folder']
    os.makedirs(output_folder, exist_ok=True)

    if choice == "4":
        print(f"⚙️  Elaborazione batch del file UseCasesTXT.txt")
        subprocess.run(["python", selected_script, use_cases_folder, output_folder], check=True)
    else:
        sorted_files = sorted(os.listdir(use_cases_folder))
        for filename in sorted_files:
            if filename.endswith('.txt'):
                input_path = os.path.join(use_cases_folder, filename)
                print(f"⚙️  Elaborazione: {input_path}")
                subprocess.run(["python", selected_script, input_path, output_folder], check=True)

    print(f"🎯 Tutti i casi d'uso sono stati processati e salvati in {output_folder}")

    # 🔁 Generazione dei prompt
    prompt_generator_path = os.path.join("PromptBuilder", "PromptGenerator.py")
    subprocess.run(["python", prompt_generator_path, choice], check=True)

    return choice

def execute_prompts(choice):
    prompt_dir = os.path.join("PromptBuilder", "GeneratedPrompts", f"From_{choice}")
    output_dir = os.path.join("Generations", f"From_{choice}")
    os.makedirs(output_dir, exist_ok=True)

    if not os.path.isdir(prompt_dir):
        print(f"❌ Cartella dei prompt non trovata: {prompt_dir}")
        return

    prompt_files = sorted(f for f in os.listdir(prompt_dir) if f.endswith(".txt"))
    if not prompt_files:
        print(f"⚠️  Nessun prompt trovato in {prompt_dir}")
        return

    print(f"🚀 Avvio generazione dei risultati in: {output_dir}")

    for file in prompt_files:
        prompt_path = os.path.join(prompt_dir, file)
        output_filename = f"{os.path.splitext(file)[0]}.json"
        output_path = os.path.join(output_dir, output_filename)

        print(f"🤖 Elaborazione prompt: {file}")
        executor_path = os.path.join("Generations", "ModelExecutor.py")
        subprocess.run(["python", executor_path, prompt_path, output_path], check=True)


    print(f"✅ Tutti i prompt sono stati eseguiti e i risultati salvati in: {output_dir}")

if __name__ == '__main__':
    main()
