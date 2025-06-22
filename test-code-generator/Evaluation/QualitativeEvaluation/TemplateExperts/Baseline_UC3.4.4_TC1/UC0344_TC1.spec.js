import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config';
const TestResultReporter = require('../../models/test-result-reporter'); // Importa il reporter generico
import {loginWithoutDbSave, acceptTerms, verifyLogin} from '../UC1/UC001.functions';
const { navigateToCensusSheet } = require('./UC003.functions'); // Importa le funzioni per gli step del test




async function freezeCensusSheet(page, reporter) {
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
    await page.locator('.text-start > .btn').first().waitFor({ state: 'visible' });
    // Ora possiamo cliccare sul pulsante
    await page.locator('.text-start > .btn').first().click();
    await page.locator('a[data-action="freeze"]').first().click();
    
    reporter.addStep(
      'UC344_TC001_ID001',
      'L’utente seleziona l’operazione di congelamento per la scheda selezionata dal menu Azione.',
      'L’utente visualizza il messaggio di conferma di avvenuta operazione.',
      'L’utente visualizza il messaggio di conferma di avvenuta operazione.',
      true,
      '',
      Date.now() - startTime
    );
    // Attendere per 2 secondi
    await page.waitForTimeout(2000);
    // Attendere che il pulsante "Ok, vai alla tabella!" sia visibile 
    await page.locator('button.swal2-confirm.btn.fw-bold.btn-primary').first().click();
    reporter.addStep(
      'UC344_TC001_ID002',
      'L\'utente clicca sul pulsante OK per tornare alla tabella.',
      'L\'utente visualizza la tabella aggiornata.',
      'L\'utente visualizza la tabella aggiornata.',
      true,
      '',
      Date.now() - startTime
    );
    
    // Attendere per 2 secondi
    await page.waitForTimeout(2000);
  
  }
// Crea un'istanza del reporter
const reporter = new TestResultReporter();

test('UC0344_TC001 - Congela scheda censimento', async ({ page , browserName }) => {
    // Inizializza il reporter con il nome del browser (es. 'chromium', 'firefox', 'webkit')
    reporter.setBrowserName(browserName);
    // Imposta il test case ID e descrizione per questo test
    reporter.setTestCase('UC344_TC1', 'Congelamento della scheda censimento selezionata avvenuto con successo.');
    await loginWithoutDbSave(page);
    await acceptTerms(page, reporter);
    await navigateToCensusSheet(page, reporter);
    await freezeCensusSheet(page, reporter);
    // Registra il completamento del test e passa il risultato (passed o failed)
    reporter.onTestEnd(test, { status: 'passed' });
    
  });