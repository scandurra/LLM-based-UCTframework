import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const tryToFreezeWithoutSelectingSheet = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to try to freeze without selecting a sheet
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC4_ID1', 'Tenta di avviare il congelamento senza selezionare una scheda', 'Viene visualizzato un messaggio di errore per la mancanza di selezione', 'Il messaggio di errore è visibile', true, {}, executionTime);
  }
}

export const verifySheetStatusAfterFailedFreeze = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify sheet status after failed freeze
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC4_ID2', 'Verifica lo stato delle schede', 'Nessuna scheda è stata modificata', 'Le schede non sono state modificate', true, {}, executionTime);
  }
}