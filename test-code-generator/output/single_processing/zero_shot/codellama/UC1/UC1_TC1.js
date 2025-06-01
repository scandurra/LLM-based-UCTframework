// Import required libraries and page object models
const { chromium } = require('playwright');
const TestResultReporter = require("../../models/test-result-reporter");
const LoginPageObjectModel = require("../../models/page_object_models/login.js");

describe('Login con credenziali valide', () => {
  let browser;
  let page;
  let reporter;

  beforeAll(async () => {
    // Create a new browser and page instance for the test
    browser = await chromium.launch();
    page = await browser.newPage();
    
    // Initialize TestResultReporter object if needed
    reporter = new TestResultReporter();
  });
  
  afterAll(async () => {
    // Close the browser and clean up resources
    await browser.close();
  });
  
  test('UC1_TC1', async () => {
    const loginPageObjectModel = new LoginPageObjectModel(page);
    
    // Step: Navigate to login page
    await loginPageObjectModel.navigateToLoginPage();
    
    // Expected: Login page loaded
    expect(await loginPageObjectModel.isLoginPageLoaded()).toBeTruthy();
    
    if (reporter) {
      reporter.addStep("Navigated to login page");
    }
    
    // Step: Inserisci le credenziali corrette nel form di login
    await loginPageObjectModel.enterCredentials('username', 'password');
    
    // Expected: Le credenziali vengono accettate
    expect(await loginPageObjectModel.areCredentialsAccepted()).toBeTruthy();
    
    if (reporter) {
      reporter.addStep("Entered credentials");
    }
    
    // Step: Clicca il tasto “Login”
    await loginPageObjectModel.clickLoginButton();
    
    // Expected: Il sistema procede con l’autenticazione
    expect(await loginPageObjectModel.isAuthenticationSuccessful()).toBeTruthy();
    
    if (reporter) {
      reporter.addStep("Clicked Login button");
    }
    
    // Step: Verifica la visualizzazione del messaggio di successo
    const successMessage = await loginPageObjectModel.getSuccessMessage();
    
    expect(successMessage).toBe('Login successful');
    
    if (reporter) {
      reporter.addStep("Verified success message");
      
      // Add test result to TestResultReporter object
      reporter.setTestResult(true);
    }
  });
});