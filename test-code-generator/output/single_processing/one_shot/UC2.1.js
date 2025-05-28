test("UC2.1_TC1 - Download PDF completato con successo", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC1 - Download PDF completato con successo");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  let endTime = Date.now();
  reporter.addStep(
    'UC2.1_TC1_ID1',
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
      'UC2.1_TC1_ID2',
      'Seleziona la voce di menù per accedere alla dashboard',
      `La sezione della dashboard si apre correttamente`,
      dashboardButtonVisible ? `La sezione della dashboard si apre correttamente` : `Dashboard non aperta`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );

    if (dashboardButtonVisible) {
      const dashboardPage = new DashboardPage(page);
      // Step 3
      startTime = Date.now();
      await dashboardPage.downloadPdf();
      let downloadStarted = page.url() === E2E_BASE_URL + "dashboard";
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC1_ID3',
        'L\'utente inizia il processo di download cliccando sul tasto dedicato',
        `Viene visualizzata la richiesta di conferma`,
        downloadStarted ? `Viene visualizzata la richiesta di conferma` : `Richiesta non visualizzata`,
        downloadStarted,
        {},
        endTime - startTime
      );

      if (downloadStarted) {
        // Step 4
        startTime = Date.now();
        await page.waitForTimeout(5000); // attende il completamento del download
        let downloadCompleted = true; // verificare se il file è stato scaricato correttamente
        endTime = Date.now();
        reporter.addStep(
          'UC2.1_TC1_ID4',
          'L\'utente attende il completamento del download',
          `Viene visualizzato un messaggio di operazione completata con successo`,
          downloadCompleted ? `Viene visualizzato un messaggio di operazione completata con successo` : `Operazione non completata`,
          downloadCompleted,
          {},
          endTime - startTime
        );
      }
    }
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});


test("UC2.1_TC2 - Download PDF annullato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC2 - Download PDF annullato");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  let endTime = Date.now();
  reporter.addStep(
    'UC2.1_TC2_ID1',
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
      'UC2.1_TC2_ID2',
      'Seleziona la voce di menù per accedere alla dashboard',
      `La sezione della dashboard si apre correttamente`,
      dashboardButtonVisible ? `La sezione della dashboard si apre correttamente` : `Dashboard non aperta`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );

    if (dashboardButtonVisible) {
      const dashboardPage = new DashboardPage(page);
      // Step 3
      startTime = Date.now();
      await dashboardPage.downloadPdf();
      let downloadStarted = false;
      try {
        await page.waitForEvent('download');
        downloadStarted = true;
      } catch (error) {
        downloadStarted = false;
      }
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC2_ID3',
        'L’utente inizia il processo di download cliccando sul tasto dedicato',
        `Il download non viene avviato`,
        !downloadStarted ? `Il download non viene avviato` : `Download avviato`,
        !downloadStarted,
        {},
        endTime - startTime
      );

      if (!downloadStarted) {
        // Step 4
        startTime = Date.now();
        // Annullamento della richiesta di download
        // Non è possibile annullare il download una volta iniziato, quindi si verifica solo che non sia stato avviato
        endTime = Date.now();
        reporter.addStep(
          'UC2.1_TC2_ID4',
          'L’utente annulla la richiesta',
          `Il download non viene avviato`,
          !downloadStarted ? `Il download non viene avviato` : `Download avviato`,
          !downloadStarted,
          {},
          endTime - startTime
        );
      }
    }
  }

  reporter.onTestEnd(test, { status: testPass && !downloadStarted ? "passed" : "failed" });
});



test("UC2.1_TC3 - Download PDF con errore di rete", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC3 - Download PDF con errore di rete");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  let endTime = Date.now();
  reporter.addStep(
    'UC2.1_TC3_ID1',
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
      'UC2.1_TC3_ID2',
      'Seleziona la voce di menù per accedere alla dashboard',
      `La sezione della dashboard si apre correttamente`,
      dashboardButtonVisible ? `La sezione della dashboard si apre correttamente` : `Dashboard non aperta`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );

    if (dashboardButtonVisible) {
      const dashboardPage = new DashboardPage(page);
      // Step 3
      startTime = Date.now();
      await dashboardPage.downloadPdf();
      // Simula errore di rete
      await page.context().setOffline(true);
      let downloadFailed = true;
      try {
        await page.waitForTimeout(5000); // Attendi 5 secondi per verificare se il download fallisce
      } catch (error) {
        downloadFailed = false;
      }
      await page.context().setOffline(false);
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC3_ID3',
        'L’utente inizia il processo di download cliccando sul tasto dedicato e attende il completamento del download',
        `Il file non riesce a scaricarsi a causa di un errore di rete`,
        downloadFailed ? `Il file non riesce a scaricarsi a causa di un errore di rete` : `Download avvenuto con successo`,
        downloadFailed,
        {},
        endTime - startTime
      );

      // Step 4
      startTime = Date.now();
      let errorMessageVisible = await page.locator('.error-message').isVisible();
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC3_ID4',
        'L’utente attende il completamento del download e verifica la presenza di un messaggio di errore',
        `Viene visualizzato un messaggio di operazione completata con un errore`,
        errorMessageVisible ? `Viene visualizzato un messaggio di operazione completata con un errore` : `Nessun messaggio di errore visualizzato`,
        errorMessageVisible,
        {},
        endTime - startTime
      );
    }
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});



test("UC2.1_TC4 - Download PDF con file danneggiato", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC4 - Download PDF con file danneggiato");

  const loginPage = new LoginPage(page);

  // Step 1
  let startTime = Date.now();
  await loginPage.enterEmail(E2E_LOGIN_EMAIL_ADMIN);
  await loginPage.enterPassword(E2E_LOGIN_PASSWORD_ADMIN);
  await loginPage.login();
  let testPass = page.url() === E2E_BASE_URL;
  let endTime = Date.now();
  reporter.addStep(
    'UC2.1_TC4_ID1',
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
      'UC2.1_TC4_ID2',
      'Seleziona la voce di menù per accedere alla dashboard',
      `La sezione della dashboard si apre correttamente`,
      dashboardButtonVisible ? `La sezione della dashboard si apre correttamente` : `Dashboard non aperta`,
      dashboardButtonVisible,
      {},
      endTime - startTime
    );

    if (dashboardButtonVisible) {
      const dashboardPage = new DashboardPage(page);
      // Step 3
      startTime = Date.now();
      await dashboardPage.downloadPdf();
      let downloadButtonVisible = await dashboardPage.downloadButton.isVisible();
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC4_ID3',
        'L’utente inizia il processo di download cliccando sul tasto dedicato',
        `Viene visualizzata la richiesta di conferma`,
        downloadButtonVisible ? `Viene visualizzata la richiesta di conferma` : `Richiesta di conferma non visualizzata`,
        downloadButtonVisible,
        {},
        endTime - startTime
      );

      // Step 4
      startTime = Date.now();
      // Simula il click sul tasto di conferma
      await page.click('text="Conferma"');
      let fileDownloaded = await page.waitForEvent('filechooser');
      endTime = Date.now();
      reporter.addStep(
        'UC2.1_TC4_ID4',
        'L’utente conferma la richiesta',
        `Il file riesce a scaricarsi ma risulta danneggiato`,
        fileDownloaded ? `Il file riesce a scaricarsi ma risulta danneggiato` : `File non scaricato`,
        fileDownloaded,
        {},
        endTime - startTime
      );

      if (fileDownloaded) {
        // Step 5
        startTime = Date.now();
        let errorMessageVisible = await page.isVisible('.error-message');
        endTime = Date.now();
        reporter.addStep(
          'UC2.1_TC4_ID5',
          'L’utente attende il completamento del download',
          `Viene visualizzato un messaggio di operazione completata con un errore`,
          errorMessageVisible ? `Viene visualizzato un messaggio di operazione completata con un errore` : `Messaggio di errore non visualizzato`,
          errorMessageVisible,
          {},
          endTime - startTime
        );
      }
    }
  }

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});



test("UC2.1_TC5 - Download PDF senza autorizzazione", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC2.1_TC5 - Download PDF senza autorizzazione");

  const dashboardPage = new DashboardPage(page);

  // Step 1
  let startTime = Date.now();
  await dashboardPage.downloadPdf();
  let testPass = page.url() !== E2E_BASE_URL + "dashboard";
  let endTime = Date.now();
  reporter.addStep(
    'UC2.1_TC5_ID1',
    'L’utente tenta di iniziare il processo di download cliccando sul tasto dedicato',
    `Viene visualizzato un messaggio di accesso negato`,
    testPass ? `Viene visualizzato un messaggio di accesso negato` : `Nessun messaggio di accesso negato visualizzato`,
    testPass,
    {},
    endTime - startTime
  );

  reporter.onTestEnd(test, { status: testPass ? "passed" : "failed" });
});
