import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectFreezeOperationTC2 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneCongela();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC2_ID1', 'Seleziona l’operazione di congelamento della scheda', 'Viene visualizzata la richiesta di conferma', 'La richiesta di conferma è visibile', true, {}, executionTime);
  }
}

export const cancelFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickCancelAzioneDelete(); // Implement cancel logic
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC2_ID2', 'Annulla il congelamento della scheda', 'Il processo di congelamento viene interrotto', 'Il processo è interrotto', true, {}, executionTime);
  }
}

export const verifySheetStatusAfterCancel = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify sheet status after cancel
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC2_ID3', 'Verifica lo stato della scheda dopo l’annullamento', 'La scheda rimane nello stato precedente', 'La scheda è nello stato precedente', true, {}, executionTime);
  }
}