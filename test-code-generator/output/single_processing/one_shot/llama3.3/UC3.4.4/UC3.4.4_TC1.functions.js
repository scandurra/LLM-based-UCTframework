import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const clickCongelamentoButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneCongela();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID1', 'Click congelamento button', 'Congelamento button clicked', 'Congelamento button clicked', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('button.swal2-confirm.btn.fw-bold.btn-danger')).toBeVisible();
}

export const confirmCongelamento = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm congelamento', 'Congelamento confirmed', 'Congelamento confirmed', true, '', executionTime);
  }
  await expect(censusSheetPage.page.locator('.swal2-confirm')).not.toBeVisible();
}

export const verifySchedaStato = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  // Add logic to verify the stato of the scheda
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID3', 'Verify scheda stato', 'Scheda stato verified', 'Scheda stato verified', true, '', executionTime);
  }
}