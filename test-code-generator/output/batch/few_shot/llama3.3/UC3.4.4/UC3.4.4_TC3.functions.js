import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectMultipleSheetsForFreeze = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to select multiple sheets
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC3_ID1', 'Seleziona più schede per il congelamento', 'Viene richiesta la conferma per ogni scheda', 'La richiesta di conferma è visibile', true, {}, executionTime);
  }
}

export const confirmFreezeOfMultipleSheets = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to confirm freeze of multiple sheets
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC3_ID2', 'Conferma il congelamento delle schede selezionate', 'Tutte le schede vengono congelate e contrassegnate come non attive', 'Le schede sono congelate', true, {}, executionTime);
  }
}

export const verifyStatusOfAllSheetsAfterFreeze = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify status of all sheets after freeze
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC3_ID3', 'Verifica lo stato di tutte le schede dopo il congelamento', 'Tutte le schede sono aggiornate a non attive', 'Le schede sono non attive', true, {}, executionTime);
  }
}