import { DateTime } from 'luxon';

// Import necessary libraries and page object models
import TestResultReporter from '../../models/test-result-reporter.js';

import LoginPage from '../../models/page_object_models/login_page.js';

import NavbarPage from '../../models/page_object_models/navbar_page.js';

export const step1_ClickUserIcon = async function (navbarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the user icon in the navbar
    await navbarPage.clickUserIcon();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC5_TC1_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const step2_SelectItalianLanguage = async function (navbarPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Select the Italian language from the dropdown menu
    await navbarPage.selectItalianLanguage();
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC5_TC1_ID2', 'Seleziona la lingua italiana dal menù a tendina', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await navbarPage.italianLanguageSelection.isVisible()).toBeTruthy();
}

export const step3_VerifyItalianTranslation = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Verify that the page is translated to Italian
    await expect(page).toHaveText('Benvenuto');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC5_TC1_ID3', 'Verifica che dopo il ricaricamento della pagina, il portale sia visualizzato in italiano', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('.welcome-message')).toBe('Benvenuto');
}