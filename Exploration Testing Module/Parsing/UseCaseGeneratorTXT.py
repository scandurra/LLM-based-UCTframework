import requests
import os
import sys

# 📌 Percorso del file da processare
if len(sys.argv) >= 2:
    usecase_file_path = sys.argv[1]
else:
    print("❌ Nessun file specificato.")
    sys.exit(1)

# 📌 Cartella di destinazione per il file formattato
if len(sys.argv) >= 3:
    save_folder = sys.argv[2]
else:
    save_folder = os.path.dirname(usecase_file_path)

os.makedirs(save_folder, exist_ok=True)

# 📌 Legge il contenuto del file dei casi d'uso
with open(usecase_file_path, "r", encoding="utf-8") as file:
    usecase_text = file.read()

# 📌 Percorso file delle postconditions
postconditions_file = os.path.join(save_folder, "postconditions.txt")

# 📌 Legge il contenuto delle postconditions, se esiste
if os.path.exists(postconditions_file):
    with open(postconditions_file, "r", encoding="utf-8") as file:
        postconditions_text = file.read()
else:
    postconditions_text = ""

# 📌 Prompt di base
base_prompt = f"""
Hai ricevuto il contenuto grezzo di un file contenente descrizioni di casi d'uso (Use Case) di un'applicazione software.

Per il caso d'uso nel file, devi riscriverlo in formato TXT, con questa esatta struttura:

Id: UC2.1
Title: Testo del titolo
Summary: ...
Actor: Regione, Sindaco, Fornitore
Precondition: Testo oppure "no"
Postcondition: Testo oppure "no"
Base_sequence:
1) Passo 1 (se esiste)
2) Passo 2 (se esiste)
Branch_sequence:
1) Passo 1 (se esiste)
2) Passo 2 (se esiste)
Exception_sequence:
1) Passo 1 (se esiste)
2) Passo 2 (se esiste)
Note: testo (oppure "no")

REGOLE IMPORTANTI:

- NON omettere nessun campo, anche se vuoto. Scrivi "no" dove mancano valori.
- NON lasciare righe vuote tra i campi.
- Se trovi una precondizione scritta come "UCx", devi sostituirla con la postcondition di quel caso, se disponibile nel file delle postconditions.
- Il file postconditions.txt contiene i seguenti riferimenti già estratti:

{postconditions_text}

- Elimina tutte le intestazioni inutili, titoli non strutturati e commenti.
- Non spiegare cosa stai facendo. Restituisci SOLO il TXT formattato come output.
- Mettere le parentesi giuste e chiuderle correttamente, come nell'esempio.
- Non mettere "```json" all'inizio della risposta e "```" alla fine.

Il caso d'uso è il seguente:
"""

# 📌 Costruisce il prompt completo
full_prompt = base_prompt.strip() + "\n\n" + usecase_text.strip()

# 📌 Parametri di richiesta
data = {
    "model": "llama3.3:latest",
    "prompt": full_prompt,
    "stream": False,
    "temperature": 0.2,
    "top_p": 1,
    "top_k": 0,
    "max_tokens": 4096,
    "stop": ["\n\n", "###"]
}

# 📌 URL dell'API locale
url = "http://localhost:11434/api/generate"

# 📌 Invia la richiesta
response = requests.post(url, json=data)

if response.status_code == 200:
    result = response.json()["response"]

    # 📌 Salva il file formattato
    files_in_folder = sorted(os.listdir(os.path.dirname(usecase_file_path)))
    file_index = files_in_folder.index(os.path.basename(usecase_file_path)) + 1
    output_file = os.path.join(save_folder, f"UC_{file_index:02}_Formattato.txt")

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(result)

    print(f"✅ Salvato file formattato: {output_file}")

    # 📌 Estrai e aggiorna postconditions.txt
    try:
        uc_blocks = result.strip().split("Id: ")
        new_entries = []

        for block in uc_blocks:
            lines = block.strip().splitlines()
            if not lines:
                continue
            uc_id = lines[0].strip()
            post_line = next((l for l in lines if l.startswith("Postcondition:")), None)
            if post_line:
                post_text = post_line.replace("Postcondition:", "").strip()
                if uc_id and post_text and post_text.lower() != "no":
                    new_entries.append(f'"{uc_id}" : "{post_text}"')

        if new_entries:
            with open(postconditions_file, "a", encoding="utf-8") as pc_file:
                for line in new_entries:
                    pc_file.write(line + "\n")
            print(f"✅ Aggiornato file delle postconditions: {postconditions_file}")
        else:
            print("⚠️ Nessuna postcondition valida trovata da salvare.")
    except Exception as e:
        print(f"⚠️ Errore durante l'estrazione delle postconditions: {e}")

else:
    print("❌ Errore nella richiesta:", response.text)
