import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page')

async function deleteCardBranch2 (page, reporter, chensusSheet) {
    test.setTimeout(120000);
    const startTime = Date.now();
    // Riempire il campo di ricerca con 'CtsIp_173' per i record di test
    await page.getByPlaceholder('Cerca').fill('CtsIp_173');
    // Simulare la pressione del tasto invio
    await page.getByPlaceholder('Cerca').press('Enter');
    reporter.addStep('UC342_TC002_ID001','Utente cerca la scheda di censimento inserendo i parametri di ricerca.', 'Utente visualizza i record relativi alla sua ricerca.','Utente visualizza i record relativi alla sua ricerca.', true, '', Date.now() - startTime);

    // Attendere che il primo record che corrisponde ai criteri sia visibile
    const firstRecord = page.locator('td.font-weight-bold.text-gray-900', {
        hasText: 'CtsIp_173'
    }).first();
    await firstRecord.waitFor({ state: 'visible' });


    // Attendere che il menu a tendina dell'azione sia visibile
    // Ora possiamo cliccare sul pulsante
    await chensusSheet.clickAzioniButton();

    // Seleziona l'opzione "Elimina" nel menu a tendina
    await chensusSheet.clickAzioneDownload();
    // Cliccare su "No, torna"
    // Attendere che il pulsante "Ok, vai alla tabella!" sia visibile e cliccarci sopra
    await chensusSheet.clickCancelAzioneDelete();

    reporter.addStep('UC342_TC002_ID002', 'Utente ha cliccato su "No, torna" e poi su "Ok, vai alla tabella!".', 'Operazione di ritorno è stata effettuata con successo.', 'Operazione di ritorno è stata effettuata con successo.', true, '', Date.now() - startTime);

}

// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC0342_TC002 - Elimina scheda censimento', async ({ page , browserName }) => {
    const chensusSheet = new CensusSheetPage(page);
    
    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);
    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC342_TC2', 'Elimina scheda censimento - Branch 2_1');
    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);
    await navigateToCensusSheet(page, reporter);
    await deleteCardBranch2(page, reporter, chensusSheet);

    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
  });