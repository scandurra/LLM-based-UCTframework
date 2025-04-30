Per fare partire il codice, avviare l'orchestrator.py, fino ad adesso il codice prevede di scegliere 4 modalità:
1: UseCaseGeneratorJSON.py
2: UseCaseGeneratorTXT.py
3: UseCaseGeneratorRUCM.py
4: UseCaseGeneratorJSON_Batch.py

Per ora, i due che funzionano sono l'1 e il 2
Ovvero la generazione dei test case, a partire da un singolo Use Case descritto per la prima opzione in JSON e la seconda in TXT.

Funzionamento:
L'orchestrator.py è il programma che fa partire il processo, gli step sono i seguenti:
1) Conversione del file "UseCases.docx" in testo, e ciò viene svolto da "Parsing/DocxToTxt.py" che genera il file "Parsing/UseCasesTXT.txt", ed è fatto così: 
        
    "  Analisi Use Case del portale PELL 2.0
        Prof.ssa Patrizia Scandurra
        PhD Dr. Edoardo Scazzocchio – Nomos Consulting s.r.l.
        PhD Dr. Fabio Moretti – ENEA Research Lab.
        Dr. Salvatore Greco
        Dr. Riccardo Contessi
        A.A 2023/2024
        Use Case 1: Login
        Use case 2: Dashboard
        Use case 2.1: Download PDF
        Use case 2.2: Ricerca impianti di illuminazione
        Use case 2.3: Visualizzazione tabella dati generali
        Use case 2.4: Benchmarking KPI per commune
        Use case 2.5: Visualizzazione grafici
        Use case 2.6: Analisi consumo comune per POD
        Use case 3: Gestione schede censimento
        Use case 3.1: Visualizzazione schede censimento
        Use case 3.2: Ricerca per nome, stato e tipo scheda censimento
        Use case 3.2.1: Ricerca scheda censimento per nome
        Use case 3.2.2: Ricerca scheda censimento per stato
        Use case 3.2.3: Ricerca scheda censimento per tipo
        Use case 3.2.4: Ricerca scheda censimento combinata
        Use case 3.3: Caricamento scheda censimento
        Use case 3.4: Azione su scheda censimento (Download, elimina, modifica, congela)
        Use case 3.4.1: Download scheda censimento
        Use case 3.4.2: Elimina scheda censimento
        Use case 3.4.3: Modifica scheda censimento
        Use case 3.4.3.1: Modifica sezione Area (Dati generali)
        Use case 3.4.3.2: Modifica sezione PlSystemGeneralData (Dati generali)
        Use case 3.4.3.3: Modifica POD sezione anagrafica
        Use case 3.4.3.4: Modifica POD sezione consumi
        Use case 3.4.3.5: Modifica Elettric panel sezione Anagrafica
        Use case 3.4.3.6: Modifica Elettric panel sezione Dati tecnici
        Use case 3.4.3.7: Modifica Elettric panel sezione Dati operativi
        Use case 3.4.3.8: Modifica Elettric panel sezione Manutenzione
        Use case 3.4.3.9: Modifica LightSpot sezione Dati punto luce
        Use case 3.4.3.10: Modifica LightSpotDevice sezione Dati apparecchio
        Use case 3.4.3.11: Modifica LightSource sezione Dati sorgente luminosa
        Use case 3.4.3.12: Modifica Zona omogenea sezione Dati zona omogenea
        Use case 3.4.4: Congela scheda censimento
        Use case 3.4.5: Dettaglio scheda censimento
        Use case 4: Gestione Modulo SAVE
        Use case 4.1: Gestione impianto
        Use case 4.1.1: Aggiunta impianto
        Use case 4.2: Aggiunta nuovo investimento
        Use case 4.3: Nuova analisi
        Use case 5: Selezione lingua
        Use case 6: Logout utente


        UseCase : UC1: Login utente
        Summary : Autenticazione di un’utente registrato al sistema
        Actor : Regione, Sindaco, Fornitore, Progettista, Cittadino
        Precondition : L’utente non è autenticato
        Postcondition : L’utente è autenticato ed è a conoscenza che l’operazione ha avuto successo
        Base sequence : L’utente inserisce le proprie credenziali all’interno del form : L’utente inizia il processo di autenticazione cliccando il tasto “Login” : L’utente visualizza un messaggio di operazione completata con successo
        Branch sequence : All’utente è richiesto modificare la prima password di accesso : L’utente inserisce la nuova password e conferma
        Exception sequence : L’utente visualizza un messaggio di operazione completata con un errore relativo all’eccezione verificatasi (credenziali errate, mismatch della nuova password…) : L’utente può ripartire dal punto 1 della base sequence
        Note : no


        UseCase : UC2: Dashboard
        Summary : Apertura della dashboard
        Actor : Regione, Sindaco, Fornitore, Progettista, Cittadino
        Precondition : UC1
        Postcondition : L’utente visualizza la sezione relativa alla dashboard
        Base sequence : L’utente naviga nella sezione relativa alla dashboard utilizzando il menù laterale di sinistra
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC2.1: Download PDF (parte di UC2: Dashboard)
        Summary : Download del PDF relativo alle informazioni della dashboard
        Actor : Regione, Sindaco, Fornitore
        Precondition : UC2
        Postcondition : L’utente ha scaricato il file, può aprirlo dalla apposita sezione del browser utilizzato ed il file è ben formato
        Base sequence : L’utente inizia il processo di download cliccando sul tasto dedicato : L’utente conferma la richiesta : L’utente visualizza un messaggio di operazione completata con successo : no
        Branch sequence : no
        Exception sequence : L’utente visualizza un messaggio di operazione completata con un errore relativo all’eccezione verificatasi : L’utente può ripartire dal punto 2 della base sequence
        Note : no


        UseCase : UC2.2: Ricerca impianti di illuminazione (parte di UC2: Dashboard)
        Summary : Ricerca per caratteristiche degli impianti di illuminazione
        Actor : Regione, Sindaco, Fornitore, Cittadino
        Precondition : UC2
        Postcondition : L’utente visualizza gli impianti di illuminazione che corrispondono ai criteri di ricerca
        Base sequence : L’utente seleziona il comune di ricerca, così come i parametri tra quelli disponibili : L’utente conferma la ricerca con il click : L’utente visualizza sulla mappa la posizione dell’impianto d’illuminazione relativo al comune
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC2.3: Visualizzazione tabella dati generali (parte di UC2: Dashboard)
        Summary : Permette di visualizzare informazioni illuminotecniche per comune
        Actor : Regione, Sindaco, Fornitore, Cittadino
        Precondition : UC2
        Postcondition : L’utente visualizza le informazioni corrispondenti alla paginazione richiesta
        Base sequence : L’utente naviga nella sezione dashboard utilizzando il menù apposito : L’utente scorre nella pagina fino a visualizzare una sezione tabellare dedicata ai dati generali, dove i dati saranno presentati in forma tabellare : È possibile scorrere tra i comuni disponibili alla consultazione e censiti, tramite selettore della pagine in basso a destra : È possibile modificare gli elementi visualizzati per pagina, tramite selettore in basso a sinistra : È possibile ordinare per colonna di dati, cliccando sul nome della colonna : no
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC2.4: Benchmarking KPI per comune (parte di UC2: Dashboard)
        Summary : Consente di analizzare i Key Performance Indicator dei comuni selezionati
        Actor : Regione, Sindaco, Fornitore, Cittadino
        Precondition : UC2
        Postcondition : L’utente visualizza il risultato della analisi su un grafico, in base ai comuni e al KPI su cui fare il confronto
        Base sequence : L’utente seleziona i comuni desiderati dal menù a tendina, tramite ricerca e selezione : L’utente seleziona il KPI desiderato : L’utente conferma la richiesta cliccando sul pulsante : L’utente visualizza il grafico con il confronto desiderato : no
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC2.5: Visualizzazione grafici (parte di UC2: Dashboard)
        Summary : Permette di visualizzare informazioni di adozione della piattaforma e tecniche a livello statale
        Actor : Regione, Sindaco, Fornitore, Cittadino
        Precondition : UC2
        Postcondition : L’utente visualizza le informazioni consultando i grafici
        Base sequence : L’utente scorre nella pagina fino a visualizzare le sezioni contrassegnate dai grafici che visualizzano i comuni aderenti per regione, punti luce per regione e distribuzione punti luce per tipo apparecchio
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC2.6: Analisi consumo comune per POD (parte di UC2: Dashboard)
        Summary : Permette di visualizzare un’analisi per comune dei consumi sulla base di alcuni parametri selezionati
        Actor : Comune, Fornitore
        Precondition : UC2
        Postcondition : L’utente visualizza le informazioni consultando i grafici
        Base sequence : L’utente scorre nella pagina fino a visualizzare la sezione dedicata al consumo : Selezionato il comune, è possibile eseguire un’analisi più puntuale andando a specificare POD, pannello elettrico, periodo e tipo di potenza analizzata
        Branch sequence : no
        Exception sequence : no
        Note : no


        UseCase : UC3: Gestione schede censimento
        Summary : Apertura dell’interfaccia per la gestione delle schede censimento
        Actor : Regione, Sindaco, Fornitore
        Precondition : UC1
        Postcondition : L’utente visualizza la sezione relativa alle schede censimento
        Base sequence : L’utente naviga nella sezione relativa alle schede censimento utilizzando il menù laterale di sinistra
        Branch sequence : no
        Exception sequence : no
        Note : no
    ...."
Al momento però questa parte è commentanta in quanto sulla macchina utilizzata non ho i permessi per installare le librerie necessarie :"pip install python-docx"

2) Una volta fatto ciò, il testo viene diviso per ogni use case, e vengono generati tutti i file all'interno della cartella "Parsing/Use Cases from DOCX" 

3) A questo punto il programma ci mostra la scelta, e in base alla risposta avvia "Parsing/UseCaseGeneratorJSON.py" "Parsing/UseCaseGeneratorTXT.py" , "Parsing/UseCaseGeneratorRUCM.py" , "Parsing/UseCaseGeneratorJSON_Batch.py"
Se dovessimo scegliere il primo per esempio, per ogni Use Case nella cartella "Parsing/Use Cases from DOCX", genererà un file nella cartella "Parsing/UC Formattati in JSON" come per esempio :
    "
        [
            {
            "Id": "UC3.4.3.8",
            "Title": "Modifica Elettric panel sezione Manutenzione",
            "Summary": "Permette di modificare la sezione relativa alle informazioni di manutenzione di un pannello elettrico, relativo ad un POD, della scheda censimento",
            "Actor": ["Regione", "Sindaco", "Fornitore"],
            "Precondition": "L’utente visualizza un messaggio di conferma dell’operazione andata a buon fine",
            "Postcondition": "L’utente visualizza un messaggio di conferma dell’operazione andata a buon fine",
            "Base_sequence": [
                "L’utente seleziona il POD per la modifica tramite il menù ad albero di sinistra",
                "L’utente espande la visione ad albero del POD selezionato per visionare i pannelli elettrici che appartengono al POD",
                "L’utente seleziona il pannello elettrico per la modifica",
                "L’utente seleziona il tab relativo alle informazioni di manutenzione",
                "L’utente visualizza i dati precedenti e può compilare il form con le informazioni desiderate",
                "L’utente applica le modifiche con l’apposito tasto",
                "In caso di conferma l’utente visualizza un messaggio di conferma dell’operazione"
            ],
            "Branch_sequence": ["In caso di dati non validi viene mostrato un messaggio di errore"],
            "Exception_sequence": [],
            "Note": "no"
            }
        ]
    "
Se invece volessimo scegliere la modalità Batch, genererà solo un file, ma al momento non funziona.
Inoltre, momentaneamente verrà estrapolata la proprietà postcondition e inserita nel file "Parsing/UC Formattati in JSON/postconditions.txt" e durante la generazione di uno use case formattato, verrà dato al modello per sostituire le preconditions non definite, per esempio quando c'è postcondition: "UCx".


4) A questo punto, l'orchestrator fa partire "PromptBuilder/PromptGenerator.py" che all'interno della cartella "PromptBuider/GeneratedPrompts/Form_X" (X a seconda della scelta fatta), crea tutti i prompt unendo il testo precedentemente generato con i vari prompt_template.txt, esempio di prompt generato:
    "
        Sei un esperto di Quality Assurance. Il tuo compito è generare una suite di test case per ogni caso d’uso fornito in formato JSON.  
        Il formato di output deve essere **esclusivamente JSON**, strutturato come array di oggetti test case, seguendo la struttura di esempio qui sotto:

        {
        "test_case_id": "UC1_TC1",
        "title": "Valid Login Credentials",
        "preconditions": "User is not authenticated and has access to PELL portal",
        "postconditions": "User is redirected to Home page",
        "test_steps": [
            { "step": "Click on the 'Login' button", "expected": "Login form is displayed" },
            { "step": "Enter valid email and password", "expected": "No error messages are displayed" },
            { "step": "Confirm authentication process", "expected": "User is redirected to Home page" }
        ],
        "test_type": "Positive",
        "priority": "High",
        "use_case_id": "UC1"
        }

        Suggerimenti:
        - Genera **almeno 4-6 test case** per ogni UC.
        - Includi sia test **positivi** (successo) che **negativi** (errori, input errati, mancanze, etc).
        - Usa nomi univoci per `test_case_id` seguendo lo schema `UCx_TCy`.
        - Analizza la base_sequence, branch_sequence, exception_sequence, pre/postcondizioni.

        Restituisci solo un array JSON (non spiegare). Non mettere "```json" all'inizio del file e "```" alla fine.
        Apri e chiudi correttamente le parentesi.
        Il seguente è l'use case in formato JSON:

        [
        {
        "Id": "UC1",
        "Title": "Login utente",
        "Summary": "Autenticazione di un’utente registrato al sistema",
        "Actor": ["Regione", "Sindaco", "Fornitore", "Progettista", "Cittadino"],
        "Precondition": "L’utente non è autenticato",
        "Postcondition": "L’utente è autenticato ed è a conoscenza che l’operazione ha avuto successo",
        "Base_sequence": ["L’utente inserisce le proprie credenziali all’interno del form", "L’utente inizia il processo di autenticazione cliccando il tasto “Login”", "L’utente visualizza un messaggio di operazione completata con successo"],
        "Branch_sequence": ["All’utente è richiesto modificare la prima password di accesso", "L’utente inserisce la nuova password e conferma"],
        "Exception_sequence": ["L’utente visualizza un messaggio di operazione completata con un errore relativo all’eccezione verificatasi (credenziali errate, mismatch della nuova password…)", "L’utente può ripartire dal punto 1 della base sequence"],
        "Note": "no"
        }
        ]
    "

5) Ora,l'orchestrator.py fa partire un processo "Generations/ModelExecutor.py" che da al modello tutti i prompt, uno alla volta, e uno alla volta genera gli output che vengono salvati in "Generations/From_X" (dove X è sempre la scelta che abbiamo fatto), esempio generato:
    "
        [
        {
            "test_case_id": "UC1_TC1",
            "title": "Valid Login Credentials",
            "preconditions": "User is not authenticated and has access to PELL portal",
            "postconditions": "User is redirected to Home page",
            "test_steps": [
            {
                "step": "Click on the 'Login' button",
                "expected": "Login form is displayed"
            },
            {
                "step": "Enter valid email and password",
                "expected": "No error messages are displayed"
            },
            {
                "step": "Confirm authentication process",
                "expected": "User is redirected to Home page"
            }
            ],
            "test_type": "Positive",
            "priority": "High",
            "use_case_id": "UC1"
        },
        {
            "test_case_id": "UC1_TC2",
            "title": "Invalid Login Credentials",
            "preconditions": "User is not authenticated and has access to PELL portal",
            "postconditions": "Error message is displayed",
            "test_steps": [
            {
                "step": "Click on the 'Login' button",
                "expected": "Login form is displayed"
            },
            {
                "step": "Enter invalid email or password",
                "expected": "Error message is displayed"
            },
            {
                "step": "Confirm authentication process",
                "expected": "User is not redirected to Home page"
            }
            ],
            "test_type": "Negative",
            "priority": "High",
            "use_case_id": "UC1"
        },
        {
            "test_case_id": "UC1_TC3",
            "title": "Empty Login Credentials",
            "preconditions": "User is not authenticated and has access to PELL portal",
            "postconditions": "Error message is displayed",
            "test_steps": [
            {
                "step": "Click on the 'Login' button",
                "expected": "Login form is displayed"
            },
            {
                "step": "Leave email and password fields empty",
                "expected": "Error message is displayed"
            },
            {
                "step": "Confirm authentication process",
                "expected": "User is not redirected to Home page"
            }
            ],
            "test_type": "Negative",
            "priority": "Medium",
            "use_case_id": "UC1"
        },
        {
            "test_case_id": "UC1_TC4",
            "title": "Password Change",
            "preconditions": "User is authenticated and has access to PELL portal",
            "postconditions": "New password is saved",
            "test_steps": [
            {
                "step": "Click on the 'Change Password' button",
                "expected": "Password change form is displayed"
            },
            {
                "step": "Enter new password and confirm",
                "expected": "No error messages are displayed"
            },
            {
                "step": "Save new password",
                "expected": "New password is saved"
            }
            ],
            "test_type": "Positive",
            "priority": "Medium",
            "use_case_id": "UC1"
        },
        {
            "test_case_id": "UC1_TC5",
            "title": "Mismatched New Password",
            "preconditions": "User is authenticated and has access to PELL portal",
            "postconditions": "Error message is displayed",
            "test_steps": [
            {
                "step": "Click on the 'Change Password' button",
                "expected": "Password change form is displayed"
            },
            {
                "step": "Enter new password and mismatched confirmation",
                "expected": "Error message is displayed"
            },
            {
                "step": "Save new password",
                "expected": "New password is not saved"
            }
            ],
            "test_type": "Negative",
            "priority": "Medium",
            "use_case_id": "UC1"
        },
        {
            "test_case_id": "UC1_TC6",
            "title": "Multiple Login Attempts",
            "preconditions": "User is not authenticated and has access to PELL portal",
            "postconditions": "Account is locked or error message is displayed",
            "test_steps": [
            {
                "step": "Enter invalid email or password multiple times",
                "expected": "Error message is displayed"
            },
            {
                "step": "Confirm authentication process multiple times",
                "expected": "Account is locked or error message is displayed"
            }
            ],
            "test_type": "Negative",
            "priority": "Low",
            "use_case_id": "UC1"
        }
        ]
    "
Tutti i file sono salvati ".json", ad eccezione di quelli in cui non si rileva che il formato è JSON (di solito per dimenticanza di una parentesi) che vengono salvati "..RAW.txt". In seguito il refainer andrà a pulire i file e in caso unirli.