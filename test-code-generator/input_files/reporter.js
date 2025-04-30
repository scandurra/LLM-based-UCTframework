class TestResultReporter {
    constructor() {
      this.steps = [];
      this.browserName = 'undefined'; // Imposta un valore predefinito per il nome del browser
      this.testCaseId = ''; // Imposta un valore predefinito per il test case ID
      this.testCaseDescription = ''; // Imposta un valore predefinito per la descrizione del test
    }
  
    // Imposta il nome del browser prima dell'inizio del test
    setBrowserName(browserName) {
      this.browserName = browserName;
      console.log(`[DEBUG] Browser impostato: ${this.browserName}`);
    }
  
    // Imposta l'ID del test case e la sua descrizione
    setTestCase(testCaseId, testCaseDescription) {
      this.testCaseId = testCaseId;
      this.testCaseDescription = testCaseDescription;
      console.log(`[DEBUG] Test Case impostato: ${this.testCaseId} - ${this.testCaseDescription}`);
    }
  
  
    // Aggiunge ogni step appena viene eseguito
    addStep(stepId, description, expectedResults, actualResults, passFail, parametersUsed, executionTime) {
      // Se il risultato attuale non è uguale a quello atteso, consideriamo lo step fallito
      if (expectedResults !== actualResults) {
        passFail = 0;  // Imposta il valore di passfail a 0 in caso di errore
      }
  
      const stepData = {
        step_id: stepId,
        step_description: description,
        parameters_used: parametersUsed,
        execution_time: executionTime,
        expected_results: expectedResults,
        actual_results: actualResults,
        pass_fail: passFail,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Aggiunge lo step alla lista locale
      this.steps.push(stepData);
  
      console.log(`[DEBUG] Step aggiunto: ${JSON.stringify(stepData)}`);
  
      // Se lo step fallisce (passFail === 0), termina subito il test
      if (passFail === 0) {
        console.log("[DEBUG] Step fallito, terminazione del test."); 
        this.saveResults();  // Salva immediatamente i risultati
        this.onTestEnd(test, { status: 'failed' });  // Termina il test con stato "failed"
      }
  
    }
  
    // Metodo per assicurarsi che il salvataggio venga fatto anche in caso di errore
    async saveResults() {
      if (this.steps.length > 0) {
        console.log("[DEBUG] Numero di step raccolti per il test:", this.steps.length);
  
        const testCaseId = this.testCaseId || 'undefined'; // Usa l'ID impostato con setTestCase
        const testCaseDescription = this.testCaseDescription || 'undefined'; // Usa la descrizione impostata con setTestCase
        // const testCaseCodeLink = 'https://github.com/example/repo';
        const testNumber = 1;
  
        const testCaseData = {
          test_case_id: testCaseId,
          test_description: testCaseDescription,
          // test_case_code_link: testCaseCodeLink,
          test_number: testNumber,
          browser_name: this.browserName,
          execution_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
  
        console.log(`[DEBUG] Salvataggio dati del test case: ${testCaseId}`);
  
        try {
          // Salva sempre gli step, anche se ci sono stati errori
          await saveTestResults(
            testCaseData.test_case_id,
            testCaseData.test_description,
            // testCaseData.test_case_code_link,
            testCaseData.browser_name,
            this.steps // Salva anche gli step falliti
          );
          console.log(`[DEBUG] Dati del test case "${testCaseId}" salvati correttamente nel database.`);
        } catch (error) {
          console.error(`[DEBUG] Errore durante il salvataggio dei dati per il test case "${testCaseId}":`, error);
        }
      }
  
      // Resetta gli step alla fine per preparare un nuovo test
      this.steps = [];
    }
  
    // Funzione per gestire la fine del test e salvare i risultati
    async onTestEnd(test, result) {
      console.log(`[DEBUG] Test completato: ${test.title} con stato: ${result.status}`);
  
      // Salva i risultati in ogni caso, anche se il test è fallito
      await this.saveResults();
    }
  
  }
  