
test("UC3_TC1 - Visualizzazione azioni disponibili sulla scheda censimento", async ({page, browserName}) => {
    // Set the browser name and test case title in the reporter object
    reporter.setBrowserName(browserName);
    reporter.setTestCase("Visualizzazione azioni disponibili sulla scheda censimento");
    
    // Create a new instance of LoginPage, SidebarPage and CensusSheetPage for each test case
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const censusSheetPage = new CensusSheetPage(page);

    // Call the step functions in sequence
    await step1_AccediAllaSezioneDelleSchedeCensimento(loginPage, sidebarPage, censusSheetPage, reporter);
    await step2_CliccaSulTastoAzioniDiUnaSchedaCensimento(censusSheetPage, reporter);
    
    // Set the test status in the reporter object
    reporter.onTestEnd(test, { status: "passed" }); 
});