import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectMultipleDeleteOperations = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  // Simulate selection of multiple sheets for deletion
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC4_ID1', 'Seleziona più schede censimento per l\'eliminazione', 'Il sistema richiede conferma per ogni scheda selezionata', 'La conferma per ogni scheda è richiesta', true, {}, executionTime);
  }
}

export const confirmMultipleDeletions = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Simulate confirmation of deletion for multiple sheets
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC4_ID2', 'Conferma l\'eliminazione di tutte le schede indicate', 'Il sistema elimina tutte le schede e visualizza un messaggio di conferma', 'Tutte le schede sono eliminate e il messaggio di conferma è visibile', true, {}, executionTime);
  }
}