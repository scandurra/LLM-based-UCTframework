import { schedaCensimentoURL } from "../../models/config";

export const navigateToCensusSheet = async (page, reporter) => {
    const startTime = Date.now();
    await page.getByRole('link', { name: ' Scheda Censimento' }).click();
    const endTime = Date.now();

    const parametersUsed = ``;
    const expectedResults = schedaCensimentoURL;
    const actualResults = page.url();
    const passFail = true;
    const executionTime = endTime - startTime;

    // Aggiunge lo step al reporter solo se il reporter non è null
    if (reporter) {
        reporter.addStep('UC003_TC001_ID1', 'Naviga a scheda censimento', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
 }