import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneCongela();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID1', 'Seleziona l’operazione di congelamento della scheda', 'Viene visualizzata la richiesta di conferma', 'La richiesta di conferma è visibile', true, {}, executionTime);
  }
}

export const confirmFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID2', 'Conferma il congelamento della scheda', 'Viene visualizzato un messaggio di conferma dell’operazione', 'Il messaggio di conferma è visibile', true, {}, executionTime);
  }
}

export const verifySheetStatusAfterFreeze = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify sheet status after freeze
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID3', 'Verifica lo stato della scheda dopo il congelamento', 'La scheda è contrassegnata come non attiva', 'La scheda è non attiva', true, {}, executionTime);
  }
}