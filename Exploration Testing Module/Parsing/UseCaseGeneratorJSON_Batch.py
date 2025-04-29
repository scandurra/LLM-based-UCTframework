import requests
import os
from datetime import datetime
import sys

# 📌 Percorso della cartella da parametro
if len(sys.argv) > 2:
    save_folder = sys.argv[2]
else:
    save_folder = None

# 📌 Controlla se la cartella esiste
if save_folder and os.path.isdir(save_folder):
    final_save_folder = save_folder
else:
    # Se non esiste o non è passata, salva nella directory dello script
    script_directory = os.path.dirname(os.path.abspath(__file__))
    final_save_folder = script_directory

script_directory = os.path.dirname(os.path.abspath(__file__))
# 📌 Assicurati che la cartella esista
os.makedirs(final_save_folder, exist_ok=True)

# Ora puoi usare final_save_folder
print(f"📂 I file verranno salvati in: {final_save_folder}")

# 📌 Percorso della cartella e file
save_folder = final_save_folder

# 📌 Legge il contenuto del file UseCaseTXT.txt
usecase_file_path = os.path.join(script_directory, "UseCasesTXT.txt")
with open(usecase_file_path, "r", encoding="utf-8") as file:
    usecase_text = file.read()

# 📌 Prompt di base super dettagliato
base_prompt = """
Sei un assistente AI che trasforma dei dati grezzi in un formato strutturato JSON.
Hai ricevuto il contenuto grezzo di un file contenente descrizioni di casi d'uso (Use Case) di un'applicazione software.

Il tuo compito è:
1. Ignorare l’introduzione, i nomi degli autori e qualsiasi testo che non appartenga ai casi d’uso.
2. Estrarre tutti i casi d'uso, uno per uno, a partire da "UseCase :" o "Use case X", anche se annidati (es: UC3.2.4).
3. Per ogni caso d'uso, restituire i dati in formato **JSON**, con questa struttura:

[
  {
    "Id": "UC1",
    "Title": "Login utente",
    "Summary": "Autenticazione di un’utente registrato al sistema",
    "Actor": ["Regione", "Sindaco", "Fornitore", "Progettista", "Cittadino"],
    "Precondition": "L’utente non è autenticato",
    "Postcondition": "L’utente è autenticato ed è a conoscenza che l’operazione ha avuto successo",
    "Base_sequence": ["L’utente inserisce le proprie credenziali all’interno del form", "L’utente inizia il processo di autenticazione cliccando il tasto “Login”:", "L’utente visualizza un messaggio di operazione completata con successo"],
    "Branch_sequence": ["All’utente è richiesto modificare la prima password di accesso", "L’utente inserisce la nuova password e conferma"],
    "Exception_sequence": ["L’utente visualizza un messaggio di operazione completata con un errore relativo all’eccezione verificatasi (credenziali errate, mismatch della nuova password…)", "L’utente può ripartire dal punto 1 della base sequence"],
    "Note": "no"
  }
  {
    "Id": "UC2",
    "Title": "Dashboard",
    "Summary": "Apertura della dashboard",
    "Actor": ["Regione", "Sindaco", "Fornitore", "Progettista", "Cittadino"],
    "Precondition": "L’utente non è autenticato",
    "Postcondition": "L’utente visualizza la sezione relativa alla dashboard",
    "Base_sequence": ["L’utente naviga nella sezione relativa alla dashboard utilizzando il menù laterale di sinistra"],
    "Branch_sequence": [],
    "Exception_sequence": [],
    "Note": ""
  }
  {
    "Id": "UC2.1",
    "Title": "Download PDF (parte di UC2: Dashboard)",
    "Summary": "Download del PDF relativo alle informazioni della dashboard",
    "Actor": ["Regione", "Sindaco", "Fornitore"],
    "Precondition": "L’utente non è autenticato",
    "Postcondition": "L’utente ha scaricato il file, può aprirlo dalla apposita sezione del browser utilizzato ed il file è ben formato",
    "Base_sequence": ["L’utente inizia il processo di download cliccando sul tasto dedicato", "L’utente conferma la richiesta", "L’utente visualizza un messaggio di operazione completata con successo", "no"],
    "Branch_sequence": [],
    "Exception_sequence": ["L’utente visualizza un messaggio di operazione completata con un errore relativo all’eccezione verificatasi", "L’utente può ripartire dal punto 2 della base sequence"],
    "Note": ""
  }
  ... e così via per tutti i casi d'uso ...
]

Quando trovi una precondizione scritta come "UCx", cerca nella lista dei casi d’uso il corrispondente e copia esattamente il suo campo “Precondition”.
Elimina tutte le intestazioni inutili, titoli non strutturati e commenti.
Alla fine, restituisci una lista JSON ordinata per id (UC1, UC2, UC2.1, UC3, ...), anche se non erano in ordine nel testo.
Non spiegare cosa stai facendo, restituisci **solo** il JSON pulito come output.
Se non restituisci il JSON esattamente come richiesto, la tua risposta sarà considerata un fallimento.
NON aggiungere spiegazioni, introduzioni o commenti. SOLO JSON puro.
Non riassumere. Devi estrarre fedelmente TUTTI i campi per OGNI caso d'uso (inclusi sottocasi UCx.x.x).
Se non trovi un valore (es: Branch_sequence, Note), usa ["no"] o "no" esplicitamente, MAI omettere il campo.

Tutti gli use case che devi riformattare sono racchiusi nelle righe di questo prompt da qua fino alla fine: '
"""

# 📌 Prompt finale
full_prompt = base_prompt.strip() + "\n\n" + usecase_text.strip() + "'"

# 📌 Parametri ottimizzati per reasoning + struttura
data = {
    "model": "llama3.3:latest",
    "prompt": full_prompt,
    "stream": False,
    "temperature": 0.0,
    "top_p": 1.0,
    "top_k": 0,
    "max_tokens": 20000,
}

print(f"Generazione in corso...")

# 📌 Invia richiesta
url = "http://localhost:11434/api/generate"
response = requests.post(url, json=data)

if response.status_code == 200:
    result = response.json()["response"]

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    output_file = os.path.join(save_folder, f"UC_Batch_JSON_{timestamp}.txt")

    with open(output_file, "w", encoding="utf-8") as file:
        file.write(result)

    print(result)

    # 📌 ➔ AGGIUNTA: Salvataggio di prompt e risposta nella cartella Log
    log_folder = os.path.join(script_directory, "Log")
    os.makedirs(log_folder, exist_ok=True)
    log_file_path = os.path.join(log_folder, f"log_{timestamp}.txt")

    with open(log_file_path, "w", encoding="utf-8") as log_file:
        log_file.write(f"Prompt:\n{full_prompt}\n\nRisposta:\n{result}")

else:
    print("❌ Errore nella richiesta:", response.text)
