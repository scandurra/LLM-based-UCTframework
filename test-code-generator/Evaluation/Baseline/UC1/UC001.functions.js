const bcrypt = require('bcrypt');  // hashare
const { expect } = require('@playwright/test');
const { baseURL, loginURL, homeURL } = require('../../models/config'); // Parametri dal file di configurazione
//const { users } = require('../../models/users');
const { LoginPage } = require('../../models/page_object_models/login_page');

// Funzione per navigare al sito con o senza salvataggio nel DB
export const navigateToSite = async (page, reporter) => {
  const startTime = Date.now();
  const response = await page.goto(baseURL);
  const endTime = Date.now();

  const parametersUsed = `baseURL:${baseURL}`;
  const expectedResults = "HTTP 200";
  const actualResults = response.status() === 200 ? "HTTP 200" : `HTTP ${response.status()}`;
  const passFail = response.status() === 200 ? 1 : 0;
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC1_TC1_ID1', 'Naviga verso il portale pell', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }

  expect(response.status()).toBe(200);
};

// Funzione per cliccare su "Login" con o senza salvataggio nel DB
export const clickLogin = async (page, reporter, loginPage) => {
  const startTime = Date.now();
  await loginPage.clickLoginLink();
  await page.waitForURL(loginURL, {waitUntil: "networkidle"});
  const endTime = Date.now();

  const parametersUsed = `loginURL:${loginURL}`;
  const expectedResults = "Campo visibile";
  const actualResults = await loginPage.isEmailFieldVisible() ? "Campo visibile" : "Campo non visibile";
  const passFail = await loginPage.isEmailFieldVisible() ? 1 : 0;
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC1_TC1_ID2', 'Inizia la fase di login cliccando su "Login"', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }

  expect(passFail).toBe(1);
};

// Step 3: Compila la form di login
//export const fillLoginForm = async (page, reporter, testEmail = users.fabio.email, testPassword = users.fabio.password) => {
export const fillLoginForm = async (page, reporter, testEmail, testPassword, loginPage) => {
  var email = testEmail; 
  var password = testPassword;
  if (email == undefined || password == undefined)
  {
    email = process.env.EMAIL;
    password = process.env.PASSWORD;
  }

  const startTime = Date.now();

  // Hashing della password
  const hashedPassword = await bcrypt.hash(password, 10);  // Hash della password

  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);

  const endTime = Date.now();

  // Dettagli dello step
  const parametersUsed = `email:${email}, password:${hashedPassword}`;  // Usa la password hashata nei parametri
  const expectedResults = `Email: ${email}, Password: ${hashedPassword}`;
  const actualResults = `Email: ${email}, Password: ${hashedPassword}`;
  const passFail = true;
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC1_TC1_ID3', 'Compila la form con mail e password', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }
};

// Funzione per cliccare su "Login" e verificare il reindirizzamento con o senza salvataggio nel DB
export const clickLoginButton = async (page, reporter, test, loginPage) => {
  const startTime = Date.now();

  // Clicca sul bottone di login
  await loginPage.clickLoginButton();

  // Attendi il reindirizzamento, timeout se non viene reindirizzato
  await page.waitForURL(homeURL, {waitUntil: "networkidle"}); // Attesa per assicurarsi che la pagina venga caricata

  const endTime = Date.now();

  const parametersUsed = `homeURL:${homeURL}, loginURL:${loginURL}`;
  const expectedResults = homeURL;
  const actualResults = page.url();  // Ottiene l'URL attuale
  const passFail = actualResults === expectedResults ? 1 : 0;  // Se non è stato reindirizzato alla home, fallisce
  const executionTime = endTime - startTime;

  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC1_TC1_ID4', 'Reindirizzamento alla homepage', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }

  // Se il test non è passato, chiama onTestEnd per terminare il test
  if (passFail === 0 && test) {
    console.log(`[DEBUG] Test fallito: non reindirizzato alla homepage. Reindirizzato a: ${actualResults}`);

    // Registra la fine del test come fallito
    await reporter.onTestEnd(test, { status: 'failed' });

    // Esce dalla funzione per evitare ulteriori esecuzioni
    return;
  }

  // Se il test è passato, aspetta di essere sulla home
  expect(page.url()).toBe(homeURL);
};

// Funzione per eseguire il login senza salvare nel DB
export const loginWithoutDbSave = async (page, email, password) => {
  const loginPage = new LoginPage(page);
  await navigateToSite(page, null);  // Naviga al sito
  await clickLogin(page, null, loginPage);      // Clicca su Login
  await fillLoginForm(page, null, email, password, loginPage);   // Compila la form di login
  await clickLoginButton(page, null, null, loginPage); // Clicca su Login
};

export const acceptTerms = async (page, reporter) => {
  const startTime = Date.now();
  await page.getByRole('button', { name: 'Accetto' }).click();
  const endTime = Date.now();

  const parametersUsed = `baseURL:${baseURL}`;
  const expectedResults = "Click OK";
  const actualResults = "Click OK";
  const passFail = true;
  const executionTime = endTime - startTime;
  // Aggiunge lo step al reporter solo se il reporter non è null
  if (reporter) {
    reporter.addStep('UC001_TC001_ID5', 'Accetta termini e condizioni', expectedResults, actualResults, passFail, parametersUsed, executionTime);
  }
};

// export const verifyLogin = async (page, reporter, testStepId, expectedUserName) => {
//   const startTime = Date.now();
//   const userNameElement = await page.getByLabel('user_data').locator('div').filter({ hasText: expectedUserName }).nth(1);
//   expect(await userNameElement.isVisible()).toBe(true); // Verifica che il nome utente sia visibile
//   const endTime = Date.now();

//   const parametersUsed = `baseURL:${baseURL}`;
//   const expectedResults = "Il nome utente corrisponde all'utenza di login";
//   const actualResults = "Il nome utente corrisponde all'utenza di login";
//   const passFail = true;
//   const executionTime = endTime - startTime;

//   // Aggiunge lo step al reporter solo se il reporter non è null
//   if (reporter) {
//     reporter.addStep(testStepId, 'Verifica l\'utenza di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);
//   }
// };
