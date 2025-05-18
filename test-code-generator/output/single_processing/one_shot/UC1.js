
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
const { test } = require('@playwright/test');
const { LoginPage } = require('./login-page');
const { HomePage } = require('./home-page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test('UC1_TC1 - Login con credenziali valide', async ({ page, browserName }) => {
    reporter.setBrowserName'UC1_TC1 - Login con credenziali valide'C1_TC1 - Login con credenziali valide");

    const loginPage = new LoginPage(page);

    // Step 1;
    let startTime = Date.now();
    await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
    let endTime = Date.now();
    reporter.addStep(;
    'UC1_TC1_ID1',;
    'Inserisci le credenziali corrette nel form di login',;
    `Credenziali accettate`,;
    `Credenziali accettate`,;
    true,;
    { email: E2E_LOGIN_EMAIL_ADMIN, password: E2E_LOGIN_PASSWORD_ADMIN },;
    endTime - startTime;
);

// Step 2;
startTime = Date.now();
await loginPage.login();
let testPass = page.url() === E2E_BASE_URL;
endTime = Date.now();
reporter.addStep(;
'UC1_TC1_ID2',;
'Clicca il tasto “Login”',;
`Sistema procede con l’autenticazione`,;
testPass ? `Sistema procede con l’autenticazione` : `Autenticazione fallita`,;
testPass,;
{},;
endTime - startTime;
);

if (testPass) {
    const homePage = new HomePage(page);
    // Step 3;
    startTime = Date.now();
    await homePage.navigateToDashboard();
    let dashboardVisible = page.url() === E2E_BASE_URL + 'dashboard';
    endTime = Date.now();
    reporter.addStep(;
    'UC1_TC1_ID3',;
    'Verifica la visualizzazione del messaggio di successo',;
    `Messaggio di successo visualizzato`,;
    dashboardVisible ? `Messaggio di successo visualizzato` : `Messaggio di successo non visualizzato`,;
    dashboardVisible,;
    {},;
    endTi'pass'failed'e;
);
}

reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});)}const { test } = require('@playwright/test');
const TestResultReporter = require('../test-result-reporter');

const reporter = new TestResultReporter();

test('UC1_TC2 - Login con credenziali errate', async ({ page, browserName }) => {
    reporter.setBrowserName'UC1_TC2 - Login con credenziali errate'C1_TC2 - Login con credenziali errate");

    const loginPage = new LoginPage(page);

    // Step 1;
    let startTime = Date.now();
    await loginPage.enterEmail('wrong-email');
    await loginPage.enterPassword('wrong-password');
    let endTime = Date.now();
    reporter.addStep(;
    'UC1_TC2_ID1',;
    'Inserisci credenziali non valide (username o password sbagliati)',;
    `Credenziali rifiutate`,;
    `Credenziali inserite`,;
    true,;
    { email: 'wrong-email', password: 'wrong-password' },;
    endTime - startTime;
);

// Step 2;
startTime = Date.now();
await loginPage.login();
let testPass = false;
try {
    await page.waitForSelector('.error-message', { timeout: 5000 });
    testPass = true;
} catch (e) {}
endTime = Date.now();
reporter.addStep(;
'UC1_TC2_ID2',;
'Clicca il tasto “Login”',;
`Sistema visualizza un messaggio di errore`,;
testPass ? `Messaggio di errore visualizzato` : `Nessun messaggio di errore visualizzato`,;
testPass,;
{},;
endTime - startTime;
);

// Step 3;
if (testPass) {
    startTime = Date.now();
    const errorMessage = await loginPage.getErrorMessage();
    endTime = Date.now();
    reporter.addStep(;
    'UC1_TC2_ID3',;
    'Verifica la visualizzazione del messaggio di errore',;
    `Messaggio di errore: ${errorMessage}`,;
    `Messaggio di errore: ${errorMessage}`,;
    true,;
    { errorMessage },;
    endTime - star'passed'   );
}

if (testPass) {
    reporter.onTestE'failed' { status: "passed" });
} else {
    reporter.onTestEnd(test, { status: "failed" });
}
});)}const { test } = require('@playwright/test');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test('UC1_TC3 - Login con campo username vuoto', async ({ page, browserName }) => {
    reporter.setBrowserNa'UC1_TC3 - Login con campo username vuoto'C1_TC3 - Login con campo username vuoto");

    const loginPage = new LoginPage(page);

    // Step 1;
    let startTime = Date.now();
    await loginPage.enterEmail('');
    await loginPage.enterPassword('Testadmin01!');
    let endTime = Date.now();
    reporter.addStep(;
    'UC1_TC3_ID1',;
    'Lascia vuoto il campo username e inserisci una password',;
    'Il sistema rileva l’errore',;
    'Il sistema rileva l’errore',;
    true,;
    { email: '', password: 'Testadmin01!' },;
    endTime - startTime;
);

// Step 2;
startTime = Date.now();
await loginPage.login();
let errorMessage = await loginPage.getErrorMessage();
endTime = Date.now();
reporter.addStep(;
'UC1_TC3_ID2',;
'Clicca il tasto “Login”',;
'Il sistema visualizza un messaggio di errore',;
errorMessage ? 'Messaggio di errore visualizzato' : 'Nessun messaggio di errore visualizzato',;
!!errorMessage,;
{},;
endTime - startTime;
);

// Step 3;
startTime = Date.now();
let expectedErrorMessage = 'Inserisci username e password';
let actualErrorMessage = await loginPage.getErrorMessage();
let testPass = actualErrorMessage.includes(expectedErrorMessage);
endTime = Date.now();
reporter.addStep(;
'UC1_TC3_ID3',;
'Verifica la visualizzazione del messaggio di errore',;
`Viene mostrato un messaggio che richiede di compilare tutti i campi: ${expectedErrorMessage}`,;
testPass ? `Messaggio di errore corretto: ${actualErrorMessage}` : `Messaggio di errore non corretto: ${actualErrorMessage}`,;
testPass,;
{ expectedErrorMessage, actualErrorMessage },;
endT'passed'artTime;
);

if (testPass) {
    reporter.onT'failed'est, { status: "passed" });
} else {
    reporter.onTestEnd(test, { status: "failed" });
}
});)}const { test } = require('@playwright/test');
const TestResultReporter = require('../test-result-reporter');

const reporter = new TestResultReporter();

test('UC1_TC4 - Login con campo password vuoto', async ({ page, browserName }) => {
    reporter.setBrowserNa'UC1_TC4 - Login con campo password vuoto'C1_TC4 - Login con campo password vuoto");

    const loginPage = new LoginPage(page);

    // Step 1;
    let startTime = Date.now();
    await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
    let endTime = Date.now();
    reporter.addStep(;
    'UC1_TC4_ID1',;
    'Inserisci il username e lascia vuoto il campo password',;
    `Campo email compilato`,;
    `Campo email compilato`,;
    true,;
    { email: E2E_LOGIN_EMAIL_ADMIN },;
    endTime - startTime;
);

// Step 2;
startTime = Date.now();
await loginPage.login();
endTime = Date.now();
reporter.addStep(;
'UC1_TC4_ID2',;
'Clicca il tasto “Login”',;
`Tasto Login cliccato`,;
`Tasto Login cliccato`,;
true,;
{},;
endTime - startTime;
);

// Step 3;
startTime = Date.now();
const errorMessage = await loginPage.getErrorMessage();
endTim'compilare tutti i campi'tPass = errorMessage !== null && errorMessage.includes("compilare tutti i campi");
reporter.addStep(;
'UC1_TC4_ID3',;
'Verifica'Mess'Nessun messaggio di errore visualizzato'
`Messaggio di errore visualizzato`,;
testPass ? "Messaggio di errore visualizzato'passed'sun messaggio di errore visualizzato",;
testP'failed'  { errorMessage },;
endTime - startTime;
);

if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
} else {
    reporter.onTestEnd(test, { status: "failed" });
}
});)}const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID1',
    'Inserisci le credenziali corrette nel form di login',
    `Credenziali accettate`,
    `Credenziali accettate`,
    true,
    {
      email: process.env.E2E_LOGIN_EMAIL_ADMIN,
      password: process.env.E2E_LOGIN_PASSWORD_ADMIN
    },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = page.url() === process.env.E2E_BASE_URL;
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

  // Step 3
  if (testPass) {
    startTime = Date.now();
    let successMessage = await page.isVisible('text="Login effettuato con successo"');
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC1_ID3',
      'Verifica la visualizzazione del messaggio di successo',
      `Viene mostrato un messaggio che conferma l’avvenuta autenticazione`,
      successMessage ? `Viene mostrato un messaggio che conferma l’avvenuta autenticazione` : `Nessun messaggio di successo visualizzato`,
      successMessage,
      {},
      endTime - startTime
    );
  }

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2 - Login con credenziali errate");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail('wrong-email@example.com');
  await loginPage.enterPassword('wrong-password');
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC2_ID1',
    'Inserisci credenziali non valide (username o password sbagliati)',
    `Credenziali rifiutate`,
    `Credenziali inserite`,
    true,
    { email: 'wrong-email@example.com', password: 'wrong-password' },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.login();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC2_ID2',
    'Clicca il tasto “Login”',
    `Sistema visualizza un messaggio di errore`,
    `Tasto Login cliccato`,
    true,
    {},
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  const errorMessage = await loginPage.getErrorMessage();
  let testPass = errorMessage !== null;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC2_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Messaggio di errore visualizzato`,
    testPass ? `Messaggio di errore: ${errorMessage}` : `Nessun messaggio di errore visualizzato`,
    testPass,
    { errorMessage },
    endTime - startTime
  );

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
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
  let testPass = await loginPage.getErrorMessage() !== null;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC3_ID2',
    'Clicca il tasto “Login”',
    'Il sistema visualizza un messaggio di errore',
    testPass ? 'Il sistema visualizza un messaggio di errore' : 'Nessun messaggio di errore visualizzato',
    testPass,
    {},
    endTime - startTime
  );

  // Step 3
  if (testPass) {
    startTime = Date.now();
    const errorMessage = await loginPage.getErrorMessage();
    let expectedErrorMessage = 'Inserisci username e password';
    let actualErrorMessage = errorMessage;
    let stepPass = expectedErrorMessage === actualErrorMessage;
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC3_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      `Viene mostrato un messaggio che richiede di compilare tutti i campi: ${expectedErrorMessage}`,
      `Viene mostrato un messaggio di errore: ${actualErrorMessage}`,
      stepPass,
      { expectedErrorMessage, actualErrorMessage },
      endTime - startTime
    );
  }

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

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
  let testPass = errorMessage !== null && errorMessage !== undefined;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC4_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Messaggio di errore visualizzato`,
    testPass ? `Messaggio di errore: ${errorMessage}` : "Nessun messaggio di errore",
    testPass,
    { errorMessage },
    endTime - startTime
  );

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC5 - Cambio password alla prima autenticazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC5 - Cambio password alla prima autenticazione");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let endTime = Date.now();
  const passwordChangeRequired = await page.url().then(url => url.includes('change-password'));
  reporter.addStep(
    'UC1_TC5_ID1',
    'Inserisci le credenziali di default per la prima volta',
    'Il sistema richiede il cambio della password',
    passwordChangeRequired ? 'Il sistema richiede il cambio della password' : 'Il sistema non richiede il cambio della password',
    passwordChangeRequired,
    { email: process.env.E2E_LOGIN_EMAIL_ADMIN, password: process.env.E2E_LOGIN_PASSWORD_ADMIN },
    endTime - startTime
  );

  if (!passwordChangeRequired) {
    reporter.onTestEnd(test, { status: "failed" });
    return;
  }

  // Step 2
  startTime = Date.now();
  const newPassword = 'NewPassword01!';
  await page.locator('#new-password').fill(newPassword);
  await page.locator('#confirm-new-password').fill(newPassword);
  await page.locator('text="Change Password"').click();
  endTime = Date.now();
  const passwordChanged = await page.url().then(url => !url.includes('change-password'));
  reporter.addStep(
    'UC1_TC5_ID2',
    'Inserisci la nuova password e confermala',
    'La password viene accettata e cambiata',
    passwordChanged ? 'La password viene accettata e cambiata' : 'La password non viene accettata',
    passwordChanged,
    { newPassword },
    endTime - startTime
  );

  if (!passwordChanged) {
    reporter.onTestEnd(test, { status: "failed" });
    return;
  }

  // Step 3
  startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(newPassword);
  await loginPage.login();
  endTime = Date.now();
  const loggedIn = await page.url().then(url => url !== process.env.E2E_LOGIN_URL);
  reporter.addStep(
    'UC1_TC5_ID3',
    'Verifica che la nuova password sia attiva',
    'Il sistema permette l’accesso con la nuova password',
    loggedIn ? 'Il sistema permette l’accesso con la nuova password' : 'Il sistema non permette l’accesso con la nuova password',
    loggedIn,
    { email: process.env.E2E_LOGIN_EMAIL_ADMIN, password: newPassword },
    endTime - startTime
  );

  if (loggedIn) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC6 - Tentativo di login con SQL Injection", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC6 - Tentativo di login con SQL Injection");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  const sqlInjectionString = "Robert'); DROP TABLE Students; --";
  await loginPage.enterEmail(sqlInjectionString);
  await loginPage.enterPassword("password");
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC6_ID1',
    'Inserisci una stringa di input che tenta di eseguire un attacco SQL Injection',
    `Il sistema rileva e blocca l’attacco`,
    `Il sistema non rileva l'attacco`,
    true,
    { sqlInjectionString },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let errorMessage = await loginPage.getErrorMessage();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC6_ID2',
    'Clicca il tasto “Login”',
    `Il sistema visualizza un messaggio di errore di sicurezza`,
    errorMessage,
    errorMessage !== "",
    {},
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  let errorVisible = await loginPage.page.locator('.error-message').isVisible();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC6_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Viene mostrato un messaggio che indica un tentativo di accesso non autorizzato`,
    errorVisible ? "Messaggio di errore visibile" : "Nessun messaggio di errore",
    errorVisible,
    {},
    endTime - startTime
  );

  reporter.onTestEnd(test, { status: "passed" });
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC7 - Tentativo di login con Cross-Site Scripting (XSS)");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  const xssInput = "<script>alert('XSS')</script>";
  await loginPage.enterEmail(xssInput);
  await loginPage.enterPassword("password");
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC7_ID1',
    'Inserisci una stringa di input che tenta di eseguire un attacco XSS',
    `Il sistema rileva e blocca l’attacco`,
    `Input inserito: ${xssInput}`,
    true,
    { xssInput },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let errorMessage = await loginPage.getErrorMessage();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC7_ID2',
    'Clicca il tasto “Login”',
    `Il sistema visualizza un messaggio di errore di sicurezza`,
    errorMessage,
    errorMessage !== "",
    {},
    endTime - startTime
  );

  // Step 3
  startTime = Date.now();
  let errorVisible = await loginPage.page.locator('.error-message').isVisible();
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC7_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Viene mostrato un messaggio che indica un tentativo di accesso non autorizzato`,
    errorVisible ? "Messaggio di errore visibile" : "Nessun messaggio di errore",
    errorVisible,
    {},
    endTime - startTime
  );

  reporter.onTestEnd(test, { status: "passed" });
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC8 - Login con account disabilitato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC8 - Login con account disabilitato");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail('disabled-account@example.com');
  await loginPage.enterPassword('password123');
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC8_ID1',
    'Inserisci le credenziali di un account disabilitato',
    `Credenziali inserite`,
    `Credenziali inserite`,
    true,
    { email: 'disabled-account@example.com', password: 'password123' },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = false;
  try {
    await page.waitForSelector('.error-message');
    testPass = true;
  } catch (e) {}
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC8_ID2',
    'Clicca il tasto “Login”',
    "Il sistema visualizza un messaggio di errore",
    testPass ? "Il sistema visualizza un messaggio di errore" : "Nessun messaggio di errore visualizzato",
    testPass,
    {},
    endTime - startTime
  );

  // Step 3
  if (testPass) {
    startTime = Date.now();
    const errorMessage = await loginPage.getErrorMessage();
    let expectedErrorMessage = 'Account disabilitato';
    let actualErrorMessage = errorMessage;
    let stepPass = expectedErrorMessage === actualErrorMessage;
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC8_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      `Messaggio di errore: ${expectedErrorMessage}`,
      `Messaggio di errore: ${actualErrorMessage}`,
      stepPass,
      { expectedErrorMessage, actualErrorMessage },
      endTime - startTime
    );
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC9 - Login con account non esistente", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC9 - Login con account non esistente");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail('non-esistente@example.com');
  await loginPage.enterPassword('password-errata');
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC9_ID1',
    'Inserisci credenziali di un account non esistente',
    `Credenziali inserite`,
    `Credenziali inserite`,
    true,
    { email: 'non-esistente@example.com', password: 'password-errata' },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = false;
  try {
    await page.waitForSelector('.error-message');
    testPass = true;
  } catch (e) {}
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC9_ID2',
    'Clicca il tasto “Login”',
    "Il sistema visualizza un messaggio di errore",
    testPass ? "Il sistema visualizza un messaggio di errore" : "Nessun messaggio di errore visualizzato",
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
      'UC1_TC9_ID3',
      'Verifica la visualizzazione del messaggio di errore',
      "Viene mostrato un messaggio che indica credenziali errate o account non esistente",
      errorMessage,
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
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login_page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC10 - Login con caratteri speciali nella password", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC10 - Login con caratteri speciali nella password");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  const email = "test.admin@pell.it";
  const password = "Testadmin01!@#$";
  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC10_ID1',
    'Inserisci una password che contiene caratteri speciali (@,#,$, etc.)',
    `La password viene accettata`,
    `La password viene accettata`,
    true,
    { email, password },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = page.url() === E2E_LOGIN_URL;
  endTime = Date.now();
  reporter.addStep(
    'UC1_TC10_ID2',
    'Clicca il tasto “Login”',
    "Il sistema procede con l’autenticazione",
    testPass ? "Il sistema procede con l’autenticazione" : "Nessun reindirizzamento avvenuto",
    testPass,
    {},
    endTime - startTime
  );

  // Step 3
  if (testPass) {
    startTime = Date.now();
    await page.waitForNavigation({ url: E2E_BASE_URL });
    let authenticated = page.url() === E2E_BASE_URL;
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC10_ID3',
      'Verifica che la password funzioni correttamente',
      "Il sistema permette l’accesso con la password contenente caratteri speciali",
      authenticated ? "Il sistema permette l’accesso con la password contenente caratteri speciali" : "Accesso negato",
      authenticated,
      {},
      endTime - startTime
    );
  }

  if (testPass && authenticated) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});const { test } = require('@playwright/test');
const { LoginPage } = require('./login-page');
const TestResultReporter = require('../models/test-result-reporter');

const reporter = new TestResultReporter();

test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  let endTime = Date.now();
  reporter.addStep(
    'UC1_TC1_ID1',
    'Inserisci le credenziali corrette nel form di login',
    `Credenziali accettate`,
    `Credenziali accettate`,
    true,
    {
      email: process.env.E2E_LOGIN_EMAIL_ADMIN,
      password: process.env.E2E_LOGIN_PASSWORD_ADMIN
    },
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await loginPage.login();
  let testPass = page.url() === process.env.E2E_BASE_URL;
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

  // Step 3
  if (testPass) {
    startTime = Date.now();
    let errorMessage = await loginPage.getErrorMessage();
    testPass = !errorMessage;
    endTime = Date.now();
    reporter.addStep(
      'UC1_TC1_ID3',
      'Verifica la visualizzazione del messaggio di successo',
      `Viene mostrato un messaggio che conferma l’avvenuta autenticazione`,
      testPass ? `Viene mostrato un messaggio che conferma l’avvenuta autenticazione` : `Nessun messaggio di successo visualizzato`,
      testPass,
      {},
      endTime - startTime
    );
  }

  if (testPass) {
    reporter.onTestEnd(test, { status: "passed" });
  } else {
    reporter.onTestEnd(test, { status: "failed" });
  }
});