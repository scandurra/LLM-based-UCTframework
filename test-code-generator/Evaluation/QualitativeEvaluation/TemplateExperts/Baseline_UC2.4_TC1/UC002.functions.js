const { dashboardURL } = require("../../models/config");

// Funzione per navigare alla Dashboard
async function navigateToDashboard(page, reporter) {
  const startTime = Date.now();

  // Naviga alla pagina dashboard
  await page.getByRole('link', { name: ' Dashboard' }).click();

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  // Aggiungi lo step al reporter
  const expectedResults = dashboardURL;
  const actualResults = page.url();
  const passFail = true;
  const parametersUsed = ''; 

  reporter.addStep('UC2_TC1_ID1', 'Naviga verso la dashboard', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  
}
  
  module.exports = { navigateToDashboard };
  
