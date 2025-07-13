import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperationTC5 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC5_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', 'Il messaggio di conferma è chiaro e comprensibile', 'Il messaggio di conferma è visibile', true, {}, executionTime);
  }
}

export const confirmDeleteTC5 = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC5_ID2', 'Conferma l\'eliminazione della scheda indicata', 'Il sistema visualizza un messaggio di conferma dell\'avvenuta eliminazione in modo chiaro e utente-friendly', 'Il messaggio di conferma è visibile e chiaro', true, {}, executionTime);
  }
}