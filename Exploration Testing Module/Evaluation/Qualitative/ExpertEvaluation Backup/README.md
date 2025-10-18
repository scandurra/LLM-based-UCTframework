# Guida alla Valutazione Qualitativa dei Test Case Generati da LLM

## Esperti Valutatori

Nomi esperti:

- **Expert1**: Raphael Mazzoleni
- **Expert2**: Patrizia Scandurra
- **Expert3**: Fabio Moretti
- **Expert4**: Simone Ronzoni

## Panoramica del Progetto

Il sistema prevede la valutazione su generazioni prodotte in 3 round diversi (R1, R2, R3) utilizzando 3 diverse tecniche di prompting:

- **Zero Shot**: Generazione senza esempi
- **One Shot**: Generazione con un singolo esempio nel prompt
- **Few Shot**: Generazione con 2 esempi nel prompt

## Struttura del Progetto

Il progetto è organizzato in 4 cartelle principali, ciascuna corrispondente ad un use case specifico:

### UC1-Assessment: Login utente

- **Descrizione**: Autenticazione di un utente registrato al sistema
- **Attori**: Regione, Sindaco, Fornitore, Progettista, Cittadino
- **Scenario principale**: Inserimento credenziali → Click Login → Messaggio di successo

### UC2_4-Assessment: Benchmarking KPI per comune

- **Descrizione**: Analisi dei Key Performance Indicator dei comuni selezionati
- **Attori**: Regione, Sindaco, Fornitore, Cittadino
- **Scenario principale**: Selezione comuni → Selezione KPI → Conferma → Visualizzazione grafico

### UC3_3-Assessment: Caricamento schede censimento

- **Descrizione**: Caricamento di file schede censimento sul portale
- **Attori**: Regione, Sindaco, Fornitore
- **Scenario principale**: Click upload → Impostazione parametri → Drag-and-drop → Barra caricamento → Messaggio successo

### UC3_4_4-Assessment: Congela scheda censimento

- **Descrizione**: Congelamento di una scheda censimento precedentemente caricata
- **Attori**: Regione, Sindaco, Fornitore
- **Scenario principale**: Selezione congelamento → Richiesta conferma → Messaggio conferma

## Metodologia di Valutazione

**IMPORTANTE**: La valutazione deve essere effettuata sull'**intera generazione** contenuta in ogni file JSON o TXT, non su singoli test case. Ogni file rappresenta l'output completo del LLM per uno specifico round e tecnica di prompting, contenente tutti i test case generati per quello use case.

### Variabili di Valutazione

Ogni generazione completa di test case deve essere valutata secondo 4 variabili principali:

#### 1. Clarity & Completeness

**Descrizione**: Valuta quanto sono chiari e comprensibili i test case dell'intera generazione.

- Chiarezza del linguaggio utilizzato nell'insieme dei test case
- Correttezza terminologica consistente
- Completezza apparente dell'intera suite di test in termini di:
  - Passi del test ben definiti
  - Risultati attesi chiari
  - Precondizioni e postcondizioni appropriate
  - Copertura complessiva dello use case

#### 2. Semantic Consistency

**Descrizione**: Valuta la coerenza semantica e la correttezza del flusso logico dell'intera generazione.

- Sequenza logica dei passi in tutti i test case
- Coerenza generale con lo scenario dello use case
- Presenza di passi mancanti o extra
- Coerenza degli input/output richiesti/prodotti dai passi tra tutti i test case
- Consistenza terminologica e concettuale tra i diversi test case

#### 3. Context Deviation

**Descrizione**: Rileva la presenza di contenuti inattesi nell'intera generazione.

- Parole o frasi senza senso presenti nei test case
- Affermazioni fuori contesto rispetto allo use case
- Ripetizioni inappropriate tra i test case
- Contenuti non correlati allo use case
- Inconsistenze concettuali tra diversi test case

#### 4. Level of Creativity

**Descrizione**: Valuta il livello di pensiero creativo del LLM nella generazione dell'intera suite di test case.

- Varietà e diversificazione dei test case generati
- Considerazione di aspetti non funzionali (performance, usabilità, ecc.)
- Identificazione di potenziali rischi e vulnerabilità di sicurezza (dove applicabili)
- Presenza di casi edge e scenari limite
- Creatività nel pensare a diverse tipologie di test (positivi, negativi, boundary)

### Scala di Valutazione

Ogni variabile deve essere valutata su una scala da 1 a 5:

- **1 = Poor/Unacceptable** (Insufficiente/Inaccettabile)
- **2 = Below Average/Below Expectations** (Sotto la media/Sotto le aspettative)
- **3 = Average/Meets Basic Requirements** (Nella media/Soddisfa i requisiti base)
- **4 = Good/Above Expectations** (Buono/Sopra le aspettative)
- **5 = Excellent/Exceeds Expectations** (Eccellente/Supera le aspettative)

## Struttura dei File

### Struttura della Cartella di Evaluation

```
QualitativeAssessment/
├── README.md                          # Questa guida completa
├── UC1-Assessment/                    # Use Case 1: Login utente
│   ├── UC1-Assessment.xlsx           # File di valutazione per UC1
│   ├── UC1-Description.json          # Descrizione dello use case UC1
│   ├── R1 Zero Shot/UC1.json         # Generazioni Round 1 Zero Shot
│   ├── R1 One Shot/UC1.json          # Generazioni Round 1 One Shot
│   ├── R1 Few Shot/UC1.json          # Generazioni Round 1 Few Shot
│   ├── R2 Zero Shot/UC1.json         # Generazioni Round 2 Zero Shot
│   ├── R2 One Shot/UC1.json          # Generazioni Round 2 One Shot
│   ├── R2 Few Shot/UC1.txt           # Generazioni Round 2 Few Shot (formato TXT)
│   ├── R3 Zero Shot/UC1.json         # Generazioni Round 3 Zero Shot
│   ├── R3 One Shot/UC1.json          # Generazioni Round 3 One Shot
│   └── R3 Few Shot/UC1.txt           # Generazioni Round 3 Few Shot (formato TXT)
├── UC2_4-Assessment/                 # Use Case 2.4: Benchmarking KPI
│   ├── UC2_4-Assessment.xlsx
│   ├── UC2.4-Description.json
│   └── [struttura come UC1]
├── UC3_3-Assessment/                 # Use Case 3.3: Caricamento schede
│   ├── UC3_3-Assessment.xlsx
│   ├── UC3.3-Description.json
│   └── [struttura come UC1]
└── UC3_4_4-Assessment/               # Use Case 3.4.4: Congela schede
    ├── UC3_4_4-Assessment.xlsx
    ├── UC3.4.4-Description.json
    └── [struttura come UC1]
```

### File di Descrizione (UC\*-Description.json)

Contengono la descrizione completa dello use case con:

- **Id**: Identificatore univoco
- **Title**: Titolo dello use case
- **Summary**: Riassunto della funzionalità
- **Actor**: Lista degli attori coinvolti
- **Precondition**: Condizioni prerequisite
- **Postcondition**: Condizioni finali
- **Base_sequence**: Sequenza principale di azioni
- **Branch_sequence**: Sequenze alternative (se presenti)
- **Exception_sequence**: Gestione delle eccezioni (se presenti)

### File di Test Case Generati

I test case sono disponibili in formati JSON e TXT e contengono:

- **test_case_id**: Identificatore univoco del test case
- **title**: Titolo descrittivo del test case
- **preconditions**: Condizioni prerequisite specifiche del test
- **postconditions**: Condizioni finali attese
- **test_steps**: Array di passi del test con:
  - **step**: Descrizione dell'azione da eseguire
  - **expected**: Risultato atteso - Talvolta è un vero e proprio step (va bene)
- **test_type**: Tipologia (Positivo, Negativo, Edge)
- **priority**: Priorità (Alta, Media, Bassa)
- **use_case_id**: Riferimento allo use case di origine
