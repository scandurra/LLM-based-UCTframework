import requests
import os
import sys

#  Percorso del file da processare
if len(sys.argv) >= 2:
    usecase_file_path = sys.argv[1]
else:
    print("❌ Nessun file specificato.")
    sys.exit(1)

#  Cartella di destinazione per il file formattato
if len(sys.argv) >= 3:
    save_folder = sys.argv[2]
else:
    save_folder = os.path.dirname(usecase_file_path)

os.makedirs(save_folder, exist_ok=True)

#  Legge il contenuto del file dei casi d'uso
with open(usecase_file_path, "r", encoding="utf-8") as file:
    usecase_text = file.read()

#  Percorso file delle postconditions
# postconditions_file = os.path.join(save_folder, "postconditions.txt")

#  Legge il contenuto delle postconditions, se esiste
# if os.path.exists(postconditions_file):
#     with open(postconditions_file, "r", encoding="utf-8") as file:
#         postconditions_text = file.read()
# else:
#     postconditions_text = ""

#  Prompt di base
base_prompt = f"""
You have received the raw content of a file containing Use Case descriptions for a software application.

You must rewrite the use cases in **JSON format**, but still save it as a `.txt` file.

For each use case, return the data in the following format:

[
{{
  "Id": "UC2.1",
  "Title": "Testo del titolo",
  "Summary": "...",
  "Actor": ["Regione", "Sindaco", "Fornitore"],
  "Precondition": "...",
  "Postcondition": "...",
  "Base_sequence": ["Passo 1", "Passo 2", "..."],
  "Branch_sequence": ["..."] or [],
  "Exception_sequence": ["..."] or [],
  "Note": "..." or "no"
}}
]

IMPORTANT RULES:

- If a Use Case does not have `Branch_sequence` or `Exception_sequence`, simply use [].
- Remove all unnecessary headers, unstructured titles, and comments.
- DO NOT provide explanations or any extra text: only the cleaned JSON as output.
- Ensure brackets are correctly opened and closed, as in the example.
- DO NOT include "```json" at the beginning or "```" at the end.

Note: The text inside each field (like Title, Summary, etc.) must remain in **Italian**, exactly as given.

The use case to process is the following:
"""


#  Costruisce il prompt completo
full_prompt = base_prompt.strip() + "\n\n" + usecase_text.strip()

#  Parametri di richiesta
data = {
    "model": "llama3.3:latest",
    "prompt": full_prompt,
    "stream": False,
    "temperature": 0.2,
    "top_p": 0.9,
    "top_k": 0, 
    "stop": ["\n\n", "###"]
}

#  URL dell'API locale
url = "http://localhost:11434/api/generate"

#  Invia la richiesta
response = requests.post(url, json=data)

if response.status_code == 200:
    result = response.json()["response"]

    #  Salva il file formattato
    files_in_folder = sorted(os.listdir(os.path.dirname(usecase_file_path)))
    file_index = files_in_folder.index(os.path.basename(usecase_file_path)) + 1
    output_file = os.path.join(save_folder, f"UC_{file_index:02}_Formattato.txt")

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(result)

    print(f"✅ Salvato file formattato: {output_file}")

    #  Estrai e aggiorna postconditions.txt
    # import json

    # try:
    #     uc_list = json.loads(result)

    #     with open(postconditions_file, "a", encoding="utf-8") as pc_file:
    #         for uc in uc_list:
    #             uc_id = uc.get("Id", "").strip()
    #             postcondition = uc.get("Postcondition", "").strip()

    #             if uc_id and postcondition:
    #                 line = f'"{uc_id}" : "{postcondition}"\n'
    #                 pc_file.write(line)

    #     print(f"✅ Aggiornato file delle postconditions: {postconditions_file}")

    # except Exception as e:
    #     print(f"⚠️ Errore durante l'estrazione delle postconditions: {e}")

else:
    print("❌ Errore nella richiesta:", response.text)



# base_prompt = f"""
# Hai ricevuto il contenuto grezzo di un file contenente descrizioni di casi d'uso (Use Case) di un'applicazione software.

# Devi riscrivere il casi d'uso in formato JSON ma sempre in un file txt.

# Per il caso d'uso, restituisci i dati nel seguente formato:

# [
# {{
#   "Id": "UC2.1",
#   "Title": "Testo del titolo",
#   "Summary": "...",
#   "Actor": ["Regione", "Sindaco", "Fornitore"],
#   "Precondition": "...",
#   "Postcondition": "...",
#   "Base_sequence": ["Passo 1", "Passo 2", "..."],
#   "Branch_sequence": ["..."] oppure [],
#   "Exception_sequence": ["..."] oppure [],
#   "Note": "..." oppure "no"
# }}
# ]

# REGOLE IMPORTANTI:

# - Se trovi una precondizione scritta come "UCx", significa che devi andare a cercare il valore della sua "Postcondition" e copiarlo come "Precondition" di questo caso d'uso.
# - Le Postcondition già estratte sono contenute qui sotto (se manca una voce, puoi ignorarla):

# {postconditions_text}

# - Se un Use Case non ha Branch_sequence o Exception_sequence, metti semplicemente [].
# - Elimina tutte le intestazioni inutili, titoli non strutturati e commenti.
# - NON fornire spiegazioni o altro testo: solo il txt del json pulito come output.
# - Mettere le parentesi giuste e chiuderle correttamente, come nell'esempio.
# - Non mettere "```json" all'inizio della risposta e "```" alla fine.

# Il caso d'uso da processare è il seguente:
# """