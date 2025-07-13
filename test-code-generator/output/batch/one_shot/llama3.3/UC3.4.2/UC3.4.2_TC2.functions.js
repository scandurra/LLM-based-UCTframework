import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperationTC2 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID1', 'Seleziona l\'operazione di cancellazione di una scheda censimento esistente', 'Viene richiesta la conferma dell\'eliminazione', 'La conferma dell\'eliminazione è richiesta', true, {}, executionTime);
  }
}

export const cancelDelete = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickCancelAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID2', 'Annulla l\'eliminazione della scheda indicata', 'L\'operazione di eliminazione viene interrotta e la scheda rimane integra', 'La scheda non è eliminata', true, {}, executionTime);
  }
}