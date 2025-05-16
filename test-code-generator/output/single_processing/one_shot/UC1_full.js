

```javascript
test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID1',
    'Inserisci le credenziali corrette nel form di login',
    `Credenziali accettate`,
    `Credenziali accettate`,
    true,
    { email: E2E_LOGIN_EMAIL_ADMIN, password: E2E_LOGIN_PASSWORD_ADMIN },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID2',
    'Clicca il tasto “Login”',
    `Il sistema procede con l’autenticazione`,
    testPass ? `Il sistema procede con l’autenticazione` : `Autenticazione fallita`,
    testPass,
    {},
    endTime - startTime
  );

  if (testPass) {
    const homePage = new HomePage(page);
    // Step 3
    startTime = Date.now();
    let dashboardButtonVisible = await homePage.dashboardButton.isVisible();
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC1_ID3',
      'Verifica la visualizzazione del messaggio di successo',
      `Viene mostrato un messaggio che conferma l’avvenuta autenticazione`,
      dashboardButtonVisible ? `Viene mostrato un messaggio che conferma l’avvenuta autenticazione` : `Nessun messaggio di successo visualizzato`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
```

```javascript
const { test } = require('@playwright/test');
const { LoginPage } = require('./login-page');
const { HomePage } = require('./home-page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID1',
    'Inserisci le credenziali corrette nel form di login',
    `Credenziali accettate`,
    `Credenziali accettate`,
    true,
    { email: E2E_LOGIN_EMAIL_ADMIN, password: E2E_LOGIN_PASSWORD_ADMIN },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID2',
    'Clicca il tasto “Login”',
    `Sistema procede con l’autenticazione`,
    testPass ? `Sistema procede con l’autenticazione` : `Autenticazione fallita`,
    testPass,
    {},
    endTime - startTime
  );

  if (testPass) {
    const homePage = new HomePage(page);
    // Step 3
    startTime = Date.now();
    await homePage.navigateToDashboard();
    let dashboardVisible = page.url() === E2E_BASE_URL + 'dashboard';
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC1_ID3',
      'Verifica la visualizzazione del messaggio di successo',
      `Messaggio di successo visualizzato`,
      dashboardVisible ? `Messaggio di successo visualizzato` : `Messaggio di successo non visualizzato`,
      dashboardVisible,
      {},
      endTime - startTime
    );
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
```

```javascript
const { test } = require('@playwright/test');
const TestResultReporter = require('../test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2 - Login con credenziali errate");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail('wrong-email');
  await loginPage.enterPassword('wrong-password');
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC2_ID1',
    'Inserisci credenziali non valide (username o password sbagliati)',
    `Credenziali rifiutate`,
    `Credenziali inserite`,
    true,
    { email: 'wrong-email', password: 'wrong-password' },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = false;
  try {
    await page.waitForSelector('.error-message', { timeout: 5000 });
    testPass = true;
  } catch (e) {}
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC2_ID2',
    'Clicca il tasto “Login”',
    `Sistema visualizza un messaggio di errore`,
    testPass ? `Messaggio di errore visualizzato` : `Nessun messaggio di errore visualizzato`,
    testPass,
    {},
    endTime - startTime
  );

  // Step 3
  if (testPass) {
    startTime = Date.now();
    const errorMessage = await loginPage.getErrorMessage();
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC2_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      `Messaggio di errore: ${errorMessage}`,
      `Messaggio di errore: ${errorMessage}`,
      true,
      { errorMessage },
      endTime - startTime
    );
  }

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});
```

```javascript
const { test } = require('@playwright/test');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC3 - Login con campo username vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC3 - Login con campo username vuoto");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail('');
  await loginPage.enterPassword('Testadmin01!');
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC3_ID1',
    'Lascia vuoto il campo username e inserisci una password',
    'Il sistema rileva l’errore',
    'Il sistema rileva l’errore',
    true,
    { email: '', password: 'Testadmin01!' },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let errorMessage = await loginPage.getErrorMessage();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC3_ID2',
    'Clicca il tasto “Login”',
    'Il sistema visualizza un messaggio di errore',
    errorMessage ? 'Messaggio di errore visualizzato' : 'Nessun messaggio di errore visualizzato',
    !!errorMessage,
    {},
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  let expectedErrorMessage = 'Inserisci username e password';
  let actualErrorMessage = await loginPage.getErrorMessage();
  let testPass = actualErrorMessage.includes(expectedErrorMessage);
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC3_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Viene mostrato un messaggio che richiede di compilare tutti i campi: ${expectedErrorMessage}`,
    testPass ? `Messaggio di errore corretto: ${actualErrorMessage}` : `Messaggio di errore non corretto: ${actualErrorMessage}`,
    testPass,
    { expectedErrorMessage, actualErrorMessage },
    endTime - startTime
  );

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});
```

```javascript
const { test } = require('@playwright/test');
const TestResultReporter = require('../test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC4 - Login con campo password vuoto", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC4 - Login con campo password vuoto");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC4_ID1',
    'Inserisci il username e lascia vuoto il campo password',
    `Campo email compilato`,
    `Campo email compilato`,
    true,
    { email: E2E_LOGIN_EMAIL_ADMIN },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC4_ID2',
    'Clicca il tasto “Login”',
    `Tasto Login cliccato`,
    `Tasto Login cliccato`,
    true,
    {},
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  const errorMessage = await loginPage.getErrorMessage();
  endTime = Date.now();
  let testPass = errorMessage !== null && errorMessage.includes("compilare tutti i campi");
  reporter.addStep(
    'UC1_TC4_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Messaggio di errore visualizzato`,
    testPass ? "Messaggio di errore visualizzato" : "Nessun messaggio di errore visualizzato",
    testPass,
    { errorMessage },
    endTime - startTime
  );

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});
```

```javascript
const { test } = require('@playwright/test');
const TestResultReporter = require('../test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC5 - Cambio password alla prima autenticazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC5 - Cambio password alla prima autenticazione");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_REGION);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_REGION);
  await loginPage.login();
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC5_ID1',
    'Inserisci le credenziali di default per la prima volta',
    `Il sistema richiede il cambio della password`,
    `Il sistema richiede il cambio della password`,
    true,
    { email: E2E_LOGIN_EMAIL_REGION, password: E2E_LOGIN_PASSWORD_REGION },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  const newPassword = "NewPassword01!";
  await loginPage.enterPassword(newPassword);
  await loginPage.enterPassword(newPassword); // confirm new password
  await loginPage.login();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC5_ID2',
    'Inserisci la nuova password e confermala',
    `La password viene accettata e cambiata`,
    `La password viene accettata e cambiata`,
    true,
    { newPassword },
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_REGION);
  await loginPage.enterPassword(newPassword);
  await loginPage.login();
  const homePage = new HomePage(page);
  const isDashboardButtonVisible = await homePage.dashboardButton.isVisible();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC5_ID3',
    'Verifica che la nuova password sia attiva',
    `Il sistema permette l’accesso con la nuova password`,
    isDashboardButtonVisible ? `Il sistema permette l’accesso con la nuova password` : `Accesso negato`,
    isDashboardButtonVisible,
    { email: E2E_LOGIN_EMAIL_REGION, password: newPassword },
    endTime - startTime
  );

  if (isDashboardButtonVisible) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});
```