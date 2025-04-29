import requests
import os
import sys
import json
from datetime import datetime

if len(sys.argv) < 3:
    print("❌ Devi fornire: [1] il file prompt .txt, [2] il file di output .json")
    sys.exit(1)

prompt_path = sys.argv[1]
output_path = sys.argv[2]

if not os.path.isfile(prompt_path):
    print(f"❌ Il file prompt non esiste: {prompt_path}")
    sys.exit(1)

os.makedirs(os.path.dirname(output_path), exist_ok=True)
log_folder = os.path.join("Generations", "Log")
os.makedirs(log_folder, exist_ok=True)

with open(prompt_path, "r", encoding="utf-8") as file:
    prompt_text = file.read().strip()

data = {
    "model": "llama3.3:latest",
    "prompt": prompt_text,
    "stream": False,
    "temperature": 0.2,
    "top_p": 1,
    "top_k": 0,
    "max_tokens": 4096,
    "stop": ["###", "\n\n"]
}

url = "http://localhost:11434/api/generate"

response = requests.post(url, json=data)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
log_filename = f"log_{timestamp}.txt"
log_path = os.path.join(log_folder, log_filename)


def write_log(prompt, response_text):
    with open(log_path, "w", encoding="utf-8") as log_file:
        log_file.write(f"📝 PROMPT:\n{prompt}\n\n")
        log_file.write(f"📥 RISPOSTA:\n{response_text}\n")


if response.status_code == 200:
    result_text = response.json()["response"].strip()
    write_log(prompt_text, result_text)

    try:
        
        parsed_json = json.loads(result_text)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(parsed_json, f, indent=2, ensure_ascii=False)

        print(f"✅ Risultato JSON salvato in: {output_path}")
        print(f"🗒️  Log completo salvato in: {log_path}")

    except json.JSONDecodeError:
        fallback_path = output_path.replace(".json", "_RAW.txt")
        with open(fallback_path, "w", encoding="utf-8") as f:
            f.write(result_text)
        print(f"⚠️ Output non valido JSON. Salvato testo grezzo in: {fallback_path}")
        print(f"🗒️  Log completo salvato in: {log_path}")

else:
    error_text = f"Errore HTTP {response.status_code}:\n{response.text}"
    write_log(prompt_text, error_text)
    print("❌ Errore nella richiesta:", error_text)
    print(f"🗒️  Log completo salvato in: {log_path}")
