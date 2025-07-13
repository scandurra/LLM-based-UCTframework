export const accessSiteWithoutLogin = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_BASE_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC2_ID1', 'Accedi al sito senza effettuare il login', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}

export const tryToAccessLogoutFunction = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Try to access logout function without being logged in
    await page.goto(process.env.E2E_DASHBOARD_URL);

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC6_TC2_ID2', 'Tenta di accedere alla funzione di logout', true, page.url() === process.env.E2E_LOGIN_URL, true, {}, executionTime);
    }

    expect(page.url()).toBe(process.env.E2E_LOGIN_URL);
}