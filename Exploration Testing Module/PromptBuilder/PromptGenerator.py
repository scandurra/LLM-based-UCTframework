import os
import sys

# 📌 Associazione tra scelta utente e template/cartelle
TEMPLATE_MAP = {
    "1": ("prompt_templateJSON.txt", "Parsing/UC Formattati in JSON"),
    "2": ("prompt_templateTXT.txt", "Parsing/UC Formattati in TXT"),
    "3": ("prompt_templateRUCM.txt", "Parsing/UC Formattati in RUCM"),
    "4": ("prompt_templateJSON_Batch.txt", "Parsing/UC Batch Formattati in JSON")
}

def load_template(template_path):
    with open(template_path, "r", encoding="utf-8") as f:
        return f.read()

def generate_prompts(choice):
    if choice not in TEMPLATE_MAP:
        print("❌ Scelta non valida per la generazione dei prompt.")
        return

    template_file, source_folder = TEMPLATE_MAP[choice]
    template_path = os.path.join("PromptBuilder", template_file)
    destination_folder = os.path.join("PromptBuilder", "GeneratedPrompts", f"From_{choice}")

    # 📁 Crea la cartella di output
    os.makedirs(destination_folder, exist_ok=True)

    # 📄 Carica il template
    template_text = load_template(template_path)

    # 📁 Legge ogni file dalla cartella Parsing corretta
    for filename in sorted(os.listdir(source_folder)):
        # 🔒 Salta i file non .txt/.json e postconditions.txt
        if not (filename.endswith(".txt") or filename.endswith(".json")):
            continue
        if filename.lower() == "postconditions.txt":
            print(f"⏭️  Saltato file escluso: {filename}")
            continue

        file_path = os.path.join(source_folder, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            usecase_text = f.read()

        # 🔧 Costruisce il prompt
        full_prompt = f"{template_text.strip()}\n\n{usecase_text.strip()}"

        # 📁 Salva il file generato
        output_name = f"Prompt_{os.path.splitext(filename)[0]}.txt"
        output_path = os.path.join(destination_folder, output_name)
        with open(output_path, "w", encoding="utf-8") as out_file:
            out_file.write(full_prompt)

        print(f"✅ Prompt generato: {output_path}")

    print(f"🎯 Tutti i prompt sono stati creati in: {destination_folder}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("❌ Devi passare come argomento il numero della scelta (1-4).")
        print("Esempio: python PromptGenerator.py 2")
        sys.exit(1)

    scelta = sys.argv[1]
    generate_prompts(scelta)
