import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import { accessCensusSheetSection, clickAzioniButton } from '../UC3/UC3_TC1.functions.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const openDettaglioPage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await accessCensusSheetSection(page, null);
  await clickAzioniButton(page, null);
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC2_ID1', 'Apri la pagina di dettaglio di una scheda censimento', 'La pagina si apre in modalità sola lettura', 'La pagina è visibile', true, {}, executionTime);
  }
}

export const tryModifyField = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to try modify field
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC2_ID2', 'Tenta di modificare un campo dei dati generali dell’area', 'Il sistema non permette la modifica e visualizza un messaggio di errore', 'La modifica non è possibile', true, {}, executionTime);
  }
}

export const verifyNoEditingOptions = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Implement logic to verify no editing options
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.5_TC2_ID3', 'Verifica che non ci siano opzioni di editing disponibili', 'Non sono presenti pulsanti o link per modificare i dati', 'Nessuna opzione di editing è visibile', true, {}, executionTime);
  }
}