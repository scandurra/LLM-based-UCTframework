import os
import json

INPUT_FOLDER = os.path.join("Generations", "Output")
OUTPUT_FOLDER = os.path.join("FinalOutput")
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def try_fix_json(raw_text):
    # Aggiusta JSON incompleti chiudendo liste
    fixed = raw_text.strip()
    if not fixed.endswith("]"):
        fixed += "]"
    try:
        return json.loads(fixed)
    except json.JSONDecodeError:
        return None

def refine_all_outputs():
    for filename in sorted(os.listdir(INPUT_FOLDER)):
        input_path = os.path.join(INPUT_FOLDER, filename)
        if not (filename.endswith(".json") or filename.endswith(".txt")):
            continue

        with open(input_path, "r", encoding="utf-8") as file:
            content = file.read()

        parsed = None
        if filename.endswith(".json"):
            try:
                parsed = json.loads(content)
            except json.JSONDecodeError:
                print(f"⚠️ JSON non valido: {filename}")
        else:  # .txt
            parsed = try_fix_json(content)
            if parsed:
                print(f"🛠️  Corretto JSON da file .txt: {filename}")

        if parsed:
            output_name = f"{os.path.splitext(filename)[0]}.json"
            output_path = os.path.join(OUTPUT_FOLDER, output_name)
            with open(output_path, "w", encoding="utf-8") as out:
                json.dump(parsed, out, indent=2, ensure_ascii=False)
            print(f"✅ Salvato JSON corretto: {output_path}")
        else:
            print(f"❌ Impossibile correggere: {filename}")

if __name__ == "__main__":
    refine_all_outputs()
