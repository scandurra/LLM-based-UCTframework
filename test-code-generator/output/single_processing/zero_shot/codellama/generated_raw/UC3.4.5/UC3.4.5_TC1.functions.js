import { DateTime } from 'luxon';

export const step1_AccediAllaPiattaformaEAutenticaCorrettamente = async function(loginPage, sidebarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Login button in the Sidebar menu
    await loginPage.clickLoginButton();
    
    // Wait for the Login page to appear
    await loginPage.waitForLoginPageToAppear();
    
    // Enter valid credentials and click on the Login button
    await loginPage.enterCredentials('valid_username', 'valid_password');
    await loginPage.clickLoginButton();
    
    // Wait for the Sidebar menu to appear
    await sidebarPage.waitForSidebarMenuToAppear();
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autentica correttamente', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}

export const step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento = async function(sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Census Card section in the Sidebar menu
    await sidebarPage.clickCensusCardButton();
    
    // Wait for the Census Sheet page to appear
    await censusSheetPage.waitForCensusSheetPageToAppear();
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}