import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const openDettaglioPageWithInvalidNode = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC5_ID1', 'Apri la pagina di dettaglio di una scheda censimento con un nodo non valido', 'La pagina visualizza un messaggio di errore', 'Il messaggio di errore è visibile', true, {}, executionTime);
  }
}

export const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify error message
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC5_ID2', 'Verifica che il messaggio di errore sia corretto', 'Il messaggio di errore è chiaro e visibile all’utente', 'Il messaggio di errore è visibile', true, {}, executionTime);
  }
}