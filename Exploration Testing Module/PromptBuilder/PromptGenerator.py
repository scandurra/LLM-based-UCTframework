import os
import json

def load_template(template_path):
    with open(template_path, "r", encoding="utf-8") as f:
        return f.read()

def generate_prompts():
    # Percorsi fissi
    template_path = os.path.join("PromptBuilder", "prompt_templateJSON.txt")
    source_folder = os.path.join("Parsing", "UC Formattati in JSON")
    destination_folder = os.path.join("PromptBuilder", "GeneratedPrompts")

    # Crea la cartella di output
    os.makedirs(destination_folder, exist_ok=True)

    # Carica il template
    template_text = load_template(template_path)

    # Legge ogni file TXT dalla cartella sorgente
    for filename in sorted(os.listdir(source_folder)):
        if not filename.endswith(".txt"):
            continue


        file_path = os.path.join(source_folder, filename)
        with open(file_path, "r", encoding="utf-8") as f:
            usecase_text = f.read()

        # Costruisce il prompt
        full_prompt = f"{template_text.strip()}\n\n{usecase_text.strip()}"

        # Determina il nome del file di output
        output_name = f"Prompt_{os.path.splitext(filename)[0]}.txt"  # fallback

        try:
            parsed_json = json.loads(usecase_text)
            if isinstance(parsed_json, list) and isinstance(parsed_json[0], dict):
                uc_id = parsed_json[0].get("Id")
                if uc_id:
                    safe_id = uc_id.replace(".", "_").replace(" ", "_")
                    output_name = f"{safe_id}.txt"
        except json.JSONDecodeError:
            pass

        # Salva il file generato
        output_path = os.path.join(destination_folder, output_name)
        with open(output_path, "w", encoding="utf-8") as out_file:
            out_file.write(full_prompt)

        print(f"✅ Prompt generato: {output_path}")

    print(f"🎯 Tutti i prompt sono stati creati in: {destination_folder}")

if __name__ == "__main__":
    generate_prompts()
