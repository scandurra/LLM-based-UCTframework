import requests
import os
import sys
import json

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

# 📌 Percorso file delle postconditions
postconditions_file = os.path.join(save_folder, "postconditions.txt")

# 📌 Legge il contenuto delle postconditions, se esiste
if os.path.exists(postconditions_file):
    with open(postconditions_file, "r", encoding="utf-8") as file:
        postconditions_text = file.read()
else:
    postconditions_text = ""

# 📌 Legge il contenuto del file da processare
with open(usecase_file_path, "r", encoding="utf-8") as file:
    usecase_text = file.read()

# 📌 Prompt base
base_prompt = f"""
Hai ricevuto il contenuto grezzo di un file contenente descrizioni di casi d'uso (Use Case) di un'applicazione software, per tutti i casi d'uso nel file, e ripeto, tutti
devi riscriverli in formato **RUCM textual notation**.

Per ogni caso d'uso, devi seguire questa struttura RUCM:

- Use Case Name: [Titolo]
- Brief Description: [Breve descrizione]
- Primary Actor: [Attore principale]
- Secondary Actors: [Attori secondari] (se presenti, altrimenti scrivi "None")
- Precondition: [Precondizioni]
- Postcondition: [Postcondizioni]
- Basic Flow: numerato (1., 2., 3., ecc.) in frasi complete.
- Specific Alternative Flows: flussi alternativi legati a passi specifici del Basic Flow (se presenti).
- Bounded Alternative Flows: flussi alternativi generali ma vincolati (se presenti).
- Global Alternative Flows: flussi globali (es: Cancel operazione) (se presenti).
- Note: [Eventuali annotazioni] (se non ci sono, scrivi "No").

**Regole importanti**:
- Ogni azione deve iniziare con chi la compie: Actor/System, seguito dall'azione, secondo la sintassi RUCM.
- I passi devono essere scritti come istruzioni operative (es.: "ATM customer inserts card.", "System validates PIN.")
- Non aggiungere commenti, spiegazioni o intestazioni inutili.
- Se manca una parte, scrivi "None".

- Se trovi una precondizione scritta come "UCx", significa che devi andare a cercare il valore della sua "Postcondition" e copiarlo come "Precondition" di questo caso d'uso.
- Le Postcondition già estratte sono contenute qui sotto (se manca una voce, puoi ignorarla):

{postconditions_text}

Alla fine, restituisci tutti i casi d'uso riformattati in un unico file di testo, separandoli con due righe vuote tra un caso d'uso e l'altro.

Il caso d'uso è il seguente:
"""

# 📌 Costruisce il prompt completo
full_prompt = base_prompt.strip() + "\n\n" + usecase_text.strip()

# 📌 Parametri di richiesta
data = {
    "model": "mannix/llama3.1-8b-abliterated:latest",
    "prompt": full_prompt,
    "stream": False,
    "temperature": 0.3,
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

    # 📌 Salva il risultato
    files_in_folder = sorted(os.listdir(os.path.dirname(usecase_file_path)))
    file_index = files_in_folder.index(os.path.basename(usecase_file_path)) + 1
    output_file = os.path.join(save_folder, f"UC_{file_index:02}_Formattato.txt")

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(result)

    print(f"✅ Salvato file formattato: {output_file}")

    # 📌 Aggiorna il file postconditions.txt se possibile
    try:
        usecases = result.split("\n\n")
        with open(postconditions_file, "a", encoding="utf-8") as pc_file:
            for uc in usecases:
                if "Use Case Name:" in uc and "Postcondition:" in uc:
                    uc_id = ""
                    post = ""
                    for line in uc.splitlines():
                        if line.startswith("Use Case Name:"):
                            uc_id = line.split(":", 1)[1].strip()
                        if line.startswith("Postcondition:"):
                            post = line.split(":", 1)[1].strip()
                    if uc_id and post and post != "None":
                        pc_file.write(f'"{uc_id}" : "{post}"\n')

        print(f"✅ Aggiornato file delle postconditions: {postconditions_file}")

    except Exception as e:
        print(f"⚠️ Errore durante l'estrazione delle postconditions: {e}")

else:
    print("❌ Errore nella richiesta:", response.text)
