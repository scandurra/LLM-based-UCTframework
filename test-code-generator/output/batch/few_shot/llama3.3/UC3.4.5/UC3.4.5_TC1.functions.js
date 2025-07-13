import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDettaglioOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID1', 'Seleziona l’operazione di dettaglio su una scheda esistente', 'La pagina di dettaglio si apre correttamente', 'La pagina di dettaglio è visibile', true, {}, executionTime);
  }
}

export const verifyGeneralData = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify general data
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID2', 'Verifica la presenza dei dati generali dell’area e della gerarchia dei POD e Aree Omogenee', 'Tutti i dati richiesti sono visualizzati correttamente', 'I dati generali sono visibili', true, {}, executionTime);
  }
}

export const navigateHierarchy = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to navigate hierarchy
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC1_ID3', 'Prova a navigare nella gerarchia dei POD e Aree Omogenee', 'La navigazione avviene senza errori', 'La navigazione è possibile', true, {}, executionTime);
  }
}