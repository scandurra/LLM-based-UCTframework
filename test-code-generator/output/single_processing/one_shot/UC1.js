
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
