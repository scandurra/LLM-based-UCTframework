import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

export const step1_SelectComuneAndValidParameters = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Select a comune from the dropdown menu
    await page.selectOption('#comuni', 'Comune 1');
    
    // Fill in valid parameters in the search form
    await page.fill('input[name="parametro_1"]', 'value1');
    await page.fill('input[name="parametro_2"]', 'value2');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Seleziona un comune e dei parametri di ricerca validi', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('#comuni')).toBe('Comune 1');
}

export const step2_ConfirmSearch = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Confirm button to submit the search form
    await page.click('#confirm');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Conferma la ricerca', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('#map')).toBe('Mappa aggiornata');
}

export const step3_ViewImpiantiDetails = async function (page, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on a specific impianto to view its details
    await page.click('#impianto1');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter if it's not null
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Visualizza i dettagli degli impianti di illuminazione', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page.innerText('#impianto-details')).toBe('Dettagli impianto');
}