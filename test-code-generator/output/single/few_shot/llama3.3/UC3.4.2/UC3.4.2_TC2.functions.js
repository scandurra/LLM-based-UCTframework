import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from './UC3.4_TC1.functions.js';

export const selectDeleteOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await visualizeAvailableActions(page, null);
  await censusSheetPage.clickAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID1', 'Select delete operation', 'Deletion confirmation is requested', 'Deletion confirmation is requested', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('button.swal2-confirm').isVisible()).toBeTruthy();
}

export const cancelDeletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickCancelAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC2_ID2', 'Cancel deletion', 'Deletion is cancelled and the sheet remains intact', 'Deletion is cancelled and the sheet remains intact', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('.text-start > .btn').first().isVisible()).toBeTruthy();
}