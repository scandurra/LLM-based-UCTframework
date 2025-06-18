import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

export const step1_AccediAllaSezioneDelleSchedeCensimento = async function(loginPage, sidebarPage, censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call existing functions from UC3_TC1.spec.js
    await step1_AccediAllaPiattaformaEAutenticaCorrettamente(loginPage, sidebarPage, reporter);
    await step2_SelezionaVoceDelMenuLateraleRelativaAlleSchedeCensimento(sidebarPage, censusSheetPage, reporter);
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Accedi alla sezione delle schede censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.census-card-section');
}

export const step2_CliccaSulTastoAzioniDiUnaSchedaCensimento = async function(censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Call existing functions from UC3_TC1.spec.js
    await step2_CliccaSulTastoAzioniDiUnaSchedaCensimento(censusSheetPage, reporter);
    
    // End the timer and calculate execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID2', 'Clicca sul tasto azioni di una scheda censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.actions-button');
}