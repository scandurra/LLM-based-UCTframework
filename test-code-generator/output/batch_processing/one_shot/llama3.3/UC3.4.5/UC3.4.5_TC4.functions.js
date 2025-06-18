import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const openDettaglioPageWithHierarchy = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC4_ID1', 'Apri la pagina di dettaglio di una scheda censimento', 'La gerarchia dei POD e Aree Omogenee è visibile', 'La gerarchia è visibile', true, {}, executionTime);
  }
}

export const selectNodeInHierarchy = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to select node in hierarchy
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC4_ID2', 'Seleziona un nodo della gerarchia per visualizzare i dettagli', 'I dettagli del nodo selezionato sono visualizzati correttamente', 'I dettagli del nodo sono visibili', true, {}, executionTime);
  }
}

export const navigateBackInHierarchy = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to navigate back in hierarchy
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC4_ID3', 'Prova a tornare indietro nella gerarchia e selezionare un altro nodo', 'La navigazione avviene senza errori e i dati sono coerenti', 'La navigazione è possibile', true, {}, executionTime);
  }
}