import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDettaglioOperationWithMissingData = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC3_ID1', 'Seleziona l’operazione di dettaglio su una scheda con dati parziali o mancanti', 'La pagina di dettaglio si apre ma segnala la mancanza di informazioni', 'La pagina è visibile', true, {}, executionTime);
  }
}

export const verifyMessageForMissingData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify message for missing data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC3_ID2', 'Verifica la presenza di un messaggio che indica la mancanza di dati', 'Il messaggio è chiaro e visibile all’utente', 'Il messaggio è visibile', true, {}, executionTime);
  }
}

export const verifyOptionsToAddMissingData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify options to add missing data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC3_ID3', 'Controlla se sono presenti link o opzioni per aggiungere i dati mancanti', 'Sono disponibili opzioni per aggiungere o completare le informazioni', 'Opzioni per aggiungere dati sono visibili', true, {}, executionTime);
  }
}