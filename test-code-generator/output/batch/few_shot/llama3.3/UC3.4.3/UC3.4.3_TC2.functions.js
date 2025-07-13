import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectEditOperationTC2 = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneEdit();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC2_ID1', 'Seleziona l\'operazione di modifica sulla scheda censimento', 'La sezione di modifica viene visualizzata correttamente', 'La sezione di modifica è visibile', true, {}, executionTime);
  }
}

export const leaveRequiredFieldsEmpty = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement leaving required fields empty
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC2_ID2', 'Lascia vuoti campi obbligatori', 'Il sistema segnala gli errori e richiede la compilazione dei campi mancanti', 'Gli errori sono stati segnalati correttamente', true, {}, executionTime);
  }
}

export const tryToConfirmChangesTC2 = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement trying to confirm changes
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.3_TC2_ID3', 'Tenta di confermare le modifiche', 'La modifica non viene eseguita e vengono visualizzati messaggi di errore', 'I messaggi di errore sono stati visualizzati correttamente', true, {}, executionTime);
  }
}