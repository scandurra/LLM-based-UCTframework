# Istruzioni

Sono presenti 2 sottocartelle contenenti due casi di test della baseline. Vanno valutate anche queste
così da permettere il confronto con le valutazioni dei casi di test generati.

Ci sono poi 4 sottocartelle, una per ogni caso di test da valutare.
All'interno è presente un file .json che contiene la descrizione del caso di test in prosa.
I codici generati dalle 12 configurazioni sono contenuti nelle sottocartelle numerate.
Alcuni numeri potrebbero mancare in quanto il modello non è stato in grado di generare del codice.

Il codice generato da ogni configurazione è costituito da 2 file, uno .spec.js che contiene l'entry point del test e un file .functions.js
che contiene le funzioni utilizzate. Il file .evaluation.xlsx contiene le valutazioni.
Ogni esperto ha associato un foglio.

Per la compilazione dei file Excel, assicurarsi di aver selezionato il proprio sheet.
Dare un punteggio per ciascuna voce. Lasciare in bianco le voci per cui non è possibile dare un giudizio (ad es. "Riutilizzo del codice esistente")

Le variabili di ambiente disponibili a cui il modello può fare riferimento sono le seguenti:
process.env.E2E_BASE_URL
process.env.E2E_LOGIN_URL
process.env.E2E_HOME_URL
process.env.E2E_DASHBOARD_URL
process.env.E2E_CTS_URL
process.env.EMAIL
process.env.PASSWORD


Mapping tra numeri sottocartelle e configurazioni:
1. Single - zero - Llama3.3
2. Single - zero - Codellama
3. Single - one - Llama3.3
4. Single - one - CodeLlama
5. Single - few - Llama3.3
6. Single - few - CodeLlama
7. Batch - zero - Llama3.3
8. Batch - zero - Codellama
9. Batch - one - Llama3.3
10. Batch - one - CodeLlama
11. Batch - few - Llama3.3
12. Batch - few - CodeLlama

Nomi esperti:
Expert 1: Simone Ronzoni
Expert 2: Patrizia Scandurra
Expert 3: Raphael Mazzoleni
Expert 4: Fabio Moretti

# Note aggiuntive su alcune variabili
### Naming coherence
Fondamentale è che l'ID del caso di test sia lo stesso. Di minore importanza che il nome non sia esattamente uguale.

### Readability & Accessibility
Valutazione soggettiva sulla qualità del codice, se è correttamente organizzato in funzioni, presenta commenti (poco importante), le variabili hanno nomi sensati, ...

### Proper interaction with DOM
L'interazione deve avvenire solo tramite page object model. Il modello non deve inventarsi dei selettori html degli elementi del DOM.

Esempio codice corretto:
    const loginPage = new LoginPage(page);  // inizializzazione del Page Object Model
    await loginPage.fillEmail(process.env.EMAIL);   // chiamata a un metodo che astrae l'input email
    await loginPage.fillPassword(process.env.PASSWORD);    // chiamata a un metodo che etrae l'input password

Esempio di codice non corretto:
    await page.locator('.text-start > .btn').first().click();   // il modello si inventa direttamente il selettore html dell'elemento del DOM.

### Proper import statements
Fondamentale che non manchino degli import, di minore importanza se ci sono import non utilizzati

### Reuse of existing test code
Da compilare solamente se il caso di test in questione ha come precondition un altro caso d'uso, altrimenti lasciare vuoto. 
Verificare che non venga duplicato il codice dei casi d'uso inclusi, ma che venga richiamato.
Il secondo parametro deve essere "null" e non deve passare il reporter object

### Usage of env variables
Ogni volta che è presente un input in cui deve inserire un valore valido, questo lo deve prendere dalle variabili di ambiente riportare qua sopra (altrimenti non lo può sapere).
Alle variabili di ambiente si fa riferimento con process.env.VARIABILE
