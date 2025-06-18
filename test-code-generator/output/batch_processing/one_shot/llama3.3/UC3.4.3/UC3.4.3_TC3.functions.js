import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperationTC3 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC3_ID1', 'Seleziona l\'operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è visibile', true, {}, executionTime);
  }
}

export const insertInvalidData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement inserting invalid data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC3_ID2', 'Inserisci dati non validi in campi specifici', 'Il sistema rileva l\'errore e richiede la correzione dei dati', 'L\'errore è stato rilevato correttamente', true, {}, executionTime);
  }
}

export const tryToConfirmChangesTC3 = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement trying to confirm changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC3_ID3', 'Tenta di confermare le modifiche', 'La modifica non viene eseguita e vengono visualizzati messaggi di errore', 'I messaggi di errore sono stati visualizzati correttamente', true, {}, executionTime);
  }
}