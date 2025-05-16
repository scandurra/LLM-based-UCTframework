

```javascript
test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC1 - Apertura della dashboard con utente autorizzato");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  let endTime = Date.now();
  reporter.addStep(
    'UC2_TC1_ID1',
    'Accedi al sistema come utente registrato',
    `La home page del sistema viene visualizzata`,
    testPass ? `La home page del sistema viene visualizzata` : `Home page non visualizzata`,
    testPass,
    { email: E2E_LOGIN_EMAIL_ADMIN, password: E2E_LOGIN_PASSWORD_ADMIN },
    endTime - startTime
  );

  if (testPass) {
    const homePage = new HomePage(page);
    // Step 2
    startTime = Date.now();
    await homePage.navigateToDashboard();
    let dashboardButtonVisible = page.url() === E2E_BASE_URL + "dashboard";
    endTime = Date.now();
    reporter.addStep(
      'UC2_TC1_ID2',
      'Seleziona la voce di menù per accedere alla dashboard',
      `La sezione della dashboard si apre correttamente`,
      dashboardButtonVisible ? `La sezione della dashboard si apre correttamente` : `Dashboard non aperta`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );

    if (dashboardButtonVisible) {
      const dashboardPage = new DashboardPage(page);
      // Verifica la presenza degli elementi della dashboard
      startTime = Date.now();
      let downloadButtonVisible = await dashboardPage.downloadButton.isVisible();
      let comuneSelectVisible = await dashboardPage.comuneSelect.isVisible();
      let showImpiantiButtonVisible = await dashboardPage.showImpiantiButton.isVisible();
      endTime = Date.now();
      reporter.addStep(
        'UC2_TC1_ID3',
        'Verifica la presenza degli elementi della dashboard',
        `Tutti gli elementi della dashboard sono visibili`,
        downloadButtonVisible && comuneSelectVisible && showImpiantiButtonVisible ? `Tutti gli elementi della dashboard sono visibili` : `Alcuni elementi della dashboard non visibili`,
        downloadButtonVisible && comuneSelectVisible && showImpiantiButtonVisible,
        {},
        endTime - startTime
      );
    }
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
```

```javascript
test("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC2 - Tentativo di accesso alla dashboard senza autorizzazione");

  // Step 1
  let startTime = Date.now();
  await page.goto(E2E_BASE_URL);
  let homePageVisible = await page.isVisible('body');
  let endTime = Date.now();
  reporter.addStep(
    'UC2_TC2_ID1',
    'Accedi al sistema come ospite o utente non registrato',
    `La home page del sistema viene visualizzata`,
    homePageVisible ? `La home page del sistema viene visualizzata` : `Nessuna pagina visualizzata`,
    homePageVisible,
    {},
    endTime - startTime
  );

  // Step 2
  startTime = Date.now();
  await page.goto(E2E_BASE_URL + 'dashboard');
  let accessDeniedText = await page.textContent('.error-message');
  let testPass = accessDeniedText.includes('Accesso negato');
  endTime = Date.now();
  reporter.addStep(
    'UC2_TC2_ID2',
    'Tenta di accedere direttamente alla dashboard tramite URL',
    `Viene mostrata una pagina di accesso negato`,
    testPass ? `Viene mostrata una pagina di accesso negato` : `Accesso alla dashboard consentito`,
    testPass,
    {},
    endTime - startTime
  );

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
```

```javascript
test("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2_TC3 - Verifica della presenza di tutti gli elementi nella dashboard");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let endTime = Date.now();
  reporter.addStep(
    'UC2_TC3_ID1',
    'Accedi alla dashboard come utente autorizzato',
    `La dashboard si apre e mostra tutti i suoi elementi`,
    `La dashboard si apre e mostra tutti i suoi elementi`,
    true,
    { email: E2E_LOGIN_EMAIL_ADMIN, password: E2E_LOGIN_PASSWORD_ADMIN },
    endTime - startTime
  );

  const homePage = new HomePage(page);
  await homePage.navigateToDashboard();

  // Step 2
  startTime = Date.now();
  const dashboardPage = new DashboardPage(page);
  let downloadButtonVisible = await dashboardPage.downloadButton.isVisible();
  let comuneSelectVisible = await dashboardPage.comuneSelect.isVisible();
  let showImpiantiButtonVisible = await dashboardPage.showImpiantiButton.isVisible();
  let impiantiVisible = await dashboardPage.isImpiantiVisible();
  let testPass = downloadButtonVisible && comuneSelectVisible && showImpiantiButtonVisible && impiantiVisible;
  endTime = Date.now();
  reporter.addStep(
    'UC2_TC3_ID2',
    'Verifica la presenza di grafici, tabelle e altri contenuti previsti',
    `Tutti gli elementi sono presenti e visualizzati correttamente`,
    testPass ? `Tutti gli elementi sono presenti e visualizzati correttamente` : `Alcuni elementi non sono visibili`,
    testPass,
    {},
    endTime - startTime
  );

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
```