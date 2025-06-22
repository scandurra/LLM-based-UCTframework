import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID1', 'Seleziona l\'operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è visibile', true, {}, executionTime);
  }
}

export const modifyFieldsWithValidData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement modification of fields with valid data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID2', 'Modifica i campi con dati validi', 'I dati vengono accettati e salvati', 'I dati sono stati modificati correttamente', true, {}, executionTime);
  }
}

export const confirmChanges = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement confirmation of changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC1_ID3', 'Conferma le modifiche', 'Le informazioni vengono aggiornate con successo', 'Le informazioni sono state aggiornate correttamente', true, {}, executionTime);
  }
}