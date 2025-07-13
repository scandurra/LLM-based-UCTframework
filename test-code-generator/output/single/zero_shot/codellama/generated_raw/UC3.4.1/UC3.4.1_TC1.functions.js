import { DateTime } from 'luxon';

import TestResultReporter from '../../models/test-result-reporter.js';

// Function to select the download operation for a census sheet
export const step1_SelezionaOperazioneDownloadSchedaCensimento = async function (censusSheetPage, reporter) {
    // Start the timer for execution time calculation
    const startTime = DateTime.now();
    
    // Click on the Download button in the Actions column of the census sheet table
    await censusSheetPage.clickDownloadButton();
    
    // Wait for the download to complete
    await page.waitForEvent('download');
    
    // End the timer and calculate the execution time
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    
    // Add a step to the reporter object if it's not null
    if (reporter) {
        reporter.addStep('UC3_TC1_ID1', 'Seleziona l\'operazione di download della scheda censimento', true, true, true, executionTime);
    }
    
    // Add Playwright assertions to verify the step result
    expect(await page).toHaveText('.success-message');
}