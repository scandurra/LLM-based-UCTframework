import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const selectDeleteOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID1', 'Select delete operation', 'Delete operation selected', 'Delete operation selected', true, '', executionTime);
  }
  expect(await page.locator('button.swal2-confirm.btn.fw-bold.btn-danger').isVisible()).toBeTruthy();
}

export const cancelDeletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.locator('button.swal2-cancel.btn.fw-bold.btn-active-light-primary').click();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID2', 'Cancel deletion', 'Deletion cancelled', 'Deletion cancelled', true, '', executionTime);
  }
  expect(await page.locator('.text-start > .btn').first().isVisible()).toBeTruthy();
}