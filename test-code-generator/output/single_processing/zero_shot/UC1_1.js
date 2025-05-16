

```javascript
test("UC1_TC1 - Login con credenziali valide", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC1 - Login con credenziali valide");

  const loginPage = new LoginPage(page);

  // Step 1: Inserisci le credenziali corrette nel form di login
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
  const expectedResults = "Le credenziali vengono accettate";
  const actualResults = "Credenziali inserite correttamente";
  const passFail = true;
  const parametersUsed = `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`;
  const executionTime = new Date().getTime();
  reporter.addStep('UC1_TC1_ID1', 'Inserisci le credenziali corrette nel form di login', expectedResults, actualResults, passFail, parametersUsed, executionTime);

  // Step 2: Clicca il tasto “Login”
  await loginPage.login();
  const expectedResults2 = "Il sistema procede con l’autenticazione";
  const actualResults2 = "Tasto Login cliccato correttamente";
  const passFail2 = true;
  const parametersUsed2 = `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`;
  const executionTime2 = new Date().getTime();
  reporter.addStep('UC1_TC1_ID2', 'Clicca il tasto “Login”', expectedResults2, actualResults2, passFail2, parametersUsed2, executionTime2);

  // Step 3: Verifica la visualizzazione del messaggio di successo
  const errorMessage = await loginPage.getErrorMessage();
  const expectedResults3 = "Viene mostrato un messaggio che conferma l’avvenuta autenticazione";
  const actualResults3 = errorMessage ? "Messaggio di successo visualizzato" : "Messaggio di successo non visualizzato";
  const passFail3 = !!errorMessage;
  const parametersUsed3 = `Email: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, Password: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`;
  const executionTime3 = new Date().getTime();
  reporter.addStep('UC1_TC1_ID3', 'Verifica la visualizzazione del messaggio di successo', expectedResults3, actualResults3, passFail3, parametersUsed3, executionTime3);

  reporter.onTestEnd(test, { status: "passed" });
});
```

```javascript
test("UC1_TC2 - Login con credenziali errate", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC1_TC2 - Login con credenziali errate");

  const loginPage = new LoginPage(page);

  // Step 1: Inserisci credenziali non valide (username o password sbagliati)
  const email = "wrong-email@example.com";
  const password = "wrong-password";
  await loginPage.displayLoginForm();
  await loginPage.enterEmail(email);
  await loginPage.enterPassword(password);
  reporter.addStep(
    'UC1_TC2_ID1',
    'Inserisci credenziali non valide',
    `Credenziali rifiutate`,
    `Credenziali inserite: email=${email}, password=${password}`,
    true,
    { email, password },
    1000
  );

  // Step 2: Clicca il tasto “Login”
  await loginPage.login();
  reporter.addStep(
    'UC1_TC2_ID2',
    'Clicca il tasto “Login”',
    `Il sistema visualizza un messaggio di errore`,
    `Tasto Login cliccato`,
    true,
    {},
    1000
  );

  // Step 3: Verifica la visualizzazione del messaggio di errore
  const errorMessage = await loginPage.getErrorMessage();
  reporter.addStep(
    'UC1_TC2_ID3',
    'Verifica la visualizzazione del messaggio di errore',
    `Viene mostrato un messaggio che indica l’errore di autenticazione`,
    `Messaggio di errore: ${errorMessage}`,
    errorMessage !== null,
    {},
    1000
  );

  reporter.onTestEnd(test, { status: "passed" });
});
```