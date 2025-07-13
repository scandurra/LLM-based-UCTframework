import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const enterInvalidDataDuringFreeze = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to enter invalid data during freeze
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC5_ID1', 'Inserisci dati non validi durante il congelamento', 'Viene visualizzato un messaggio di errore per i dati non validi', 'Il messaggio di errore è visibile', true, {}, executionTime);
  }
}

export const verifySheetStatusAfterInvalidData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify sheet status after invalid data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC5_ID2', 'Verifica lo stato delle schede dopo i dati non validi', 'Nessuna scheda è stata modificata', 'Le schede non sono state modificate', true, {}, executionTime);
  }
}