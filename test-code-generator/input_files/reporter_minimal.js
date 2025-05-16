class TestResultReporter {  
    setBrowserName(browserName) {
      // Sets browser name before test start
    }
  
    setTestCase(testCaseId, testCaseDescription) {
      // Sets the ID of test case and its description
    }
  
    addStep(stepId, description, expectedResults, actualResults, passFail, parametersUsed, executionTime) {
      // Saves each step just executed  
    }
  
    // Metodo per assicurarsi che il salvataggio venga fatto anche in caso di errore
    async saveResults() {
      // Saves the result of a test
    }
  
    async onTestEnd(test, result) {
      // Handles test execution end
    }
  }
  