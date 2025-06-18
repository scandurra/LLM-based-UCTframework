import { LoginPage } from '../../models/page_object_models/login_page';

import TestResultReporter from '../../models/test-result-reporter';

export const loginWithWrongCredentials = async function(page, reporter) {
    // Create a new instance of the LoginPage page object model
    const loginPage = new LoginPage(page);
    
    // Click on the "Login" link to navigate to the login page
    await loginPage.clickLoginLink();
    
    // Check if the email field is visible
    let emailFieldVisible = await loginPage.isEmailFieldVisible();
    
    // Report step 1 results
    reporter.addStep('UC1_TC2_ID1', 'Click on "Login" link to navigate to the login page', true, emailFieldVisible);
    
    // Fill in the email field with an invalid value
    await loginPage.fillEmail(EMAIL);
    
    // Report step 2 results
    reporter.addStep('UC1_TC2_ID2', 'Fill in the email field with an invalid value', true, EMAIL);
    
    // Fill in the password field with an invalid value
    await loginPage.fillPassword(PASSWORD);
    
    // Report step 3 results
    reporter.addStep('UC1_TC2_ID3', 'Fill in the password field with an invalid value', true, PASSWORD);
    
    // Click on the "Login" button to attempt login
    await loginPage.clickLoginButton();
    
    // Report step 4 results
    reporter.addStep('UC1_TC2_ID4', 'Click on the "Login" button to attempt login', true, true);
};