import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test
const { CensusSheetPage } = require('../../models/page_object_models/census_sheet_page')



async function viewCensusDetail(page, reporter, chensusSheet) {
    test.setTimeout(120000);
    const startTime = Date.now();
    // Riempire il campo di ricerca con 'CtsIp_173' per i record di test
    await page.getByPlaceholder('Cerca').fill('CtsIp_173');
    // Simulare la pressione del tasto invio
    await page.getByPlaceholder('Cerca').press('Enter');
    // Attendere che il primo record che corrisponde ai criteri sia visibile
    const firstRecord = page.locator('td.font-weight-bold.text-gray-900', {
      hasText: 'CtsIp_173'
    }).first();
    await firstRecord.waitFor({ state: 'visible' });
    // Attendere che il menu a tendina dell'azione sia visibile
    // Ora possiamo cliccare sul pulsante
    await chensusSheet.clickAzioniButton();
    await chensusSheet.clickAzioneDettaglio();
    
    reporter.addStep(
      'UC345_TC001_ID001',
      'L’utente seleziona l’operazione di dettaglio per la scheda selezionata dal menu Azione.',
      'L\'utente verrà indirizzato alla pagina dedicata.',
      'L\'utente verrà indirizzato alla pagina dedicata.',
      true,
      '',
      Date.now() - startTime
    );
    
    
    // Attendere per 2 secondi
    await page.waitForTimeout(2000);
  
  }
// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC0345_TC001 - Dettaglio scheda censimento', async ({ page , browserName }) => {
  const chensusSheet = new CensusSheetPage(page);  
  
  // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);
    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC345_TC1', 'Utente visualizza i dettagli relativi alla scheda di censimento con successo.');
    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);
    await navigateToCensusSheet(page, reporter);
    await viewCensusDetail(page, reporter, chensusSheet);
    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
    
  });