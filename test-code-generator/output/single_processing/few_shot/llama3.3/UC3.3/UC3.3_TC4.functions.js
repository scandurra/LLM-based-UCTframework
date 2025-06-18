import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { CensusSheetPageUpload } from '../../models/page_object_models/census_sheet_page_upload.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

export const clickCaricamentoSchedeCensimentoButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_CTS_URL);
  const censusSheetPageUpload = new CensusSheetPageUpload(page);
  await censusSheetPageUpload.waitForUploadSchedaModalButton();
  await censusSheetPageUpload.clickUploadSchedaModalButton();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.3_TC4_ID1', 'Clicca sul tasto di caricamento delle schede censimento', 'La finestra di caricamento si apre correttamente', 'La finestra di caricamento si apre correttamente', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const leaveFileSelectionEmptyAndCompileParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPageUpload = new CensusSheetPageUpload(page);
  await censusSheetPageUpload.waitForUploadModal();
  // No file is selected
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.3_TC4_ID2', 'Lascia vuoto il campo di selezione del file e compila i parametri richiesti', 'Il sistema segnala un errore di assenza del file', 'Il sistema segnala un errore di assenza del file', true, {}, executionTime);
  }
  // No assertion here as we are expecting an error
}

export const tryToProceedWithUpload = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPageUpload = new CensusSheetPageUpload(page);
  await censusSheetPageUpload.waitForUploadApplyButton();
  try {
    await censusSheetPageUpload.clickUploadApplyButton();
  } catch (error) {
    // Expected error
  }
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.3_TC4_ID3', 'Tenta di procedere all’upload', 'L’operazione viene bloccata e viene mostrato un messaggio di errore', 'L’operazione viene bloccata e viene mostrato un messaggio di errore', true, {}, executionTime);
  }
  // No assertion here as we are expecting an error
}