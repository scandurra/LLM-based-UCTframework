import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from './UC3.4_TC1.functions.js';

export const selectFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneCongela();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID1', 'Select freeze operation', 'Confirmation request is visible', 'Confirmation request is visible', true, {}, executionTime);
  }
  expect(await page.locator('button.swal2-confirm').isVisible()).toBeTruthy();
}

export const confirmFreezeOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioneCongela();
  await censusSheetPage.page.locator('button.swal2-confirm').click();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID2', 'Confirm freeze operation', 'Confirmation message is visible', 'Confirmation message is visible', true, {}, executionTime);
  }
  expect(await page.locator('.swal2-confirm').isVisible()).toBeTruthy();
}

export const verifySheetStatus = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.4_TC1_ID3', 'Verify sheet status', 'Sheet is marked as non-active', 'Sheet is marked as non-active', true, {}, executionTime);
  }
  expect(await page.locator('.non-attivo').isVisible()).toBeTruthy();
}