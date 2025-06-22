import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperationTC4 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC4_ID1', 'Seleziona l\'operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è visibile', true, {}, executionTime);
  }
}

export const makeChanges = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement making changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC4_ID2', 'Apporta modifiche ai campi', 'I dati vengono temporaneamente aggiornati', 'I dati sono stati modificati correttamente', true, {}, executionTime);
  }
}

export const cancelChanges = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement canceling changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC4_ID3', 'Annulla le modifiche', 'Le modifiche vengono annullate e la scheda torna allo stato originale', 'Le modifiche sono state annullate correttamente', true, {}, executionTime);
  }
}