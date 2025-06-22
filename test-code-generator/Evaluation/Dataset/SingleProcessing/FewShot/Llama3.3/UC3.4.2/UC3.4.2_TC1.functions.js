import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessCensusSheetsSection, visualizeAvailableActions } from './UC3.4_TC1.functions.js';

export const selectDeleteOperation = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC1_ID1', 'Select delete operation', 'Deletion confirmation is requested', 'Deletion confirmation is requested', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('button.swal2-confirm').isVisible()).toBeTruthy();
}

export const confirmDeletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC1_ID2', 'Confirm deletion', 'System deletes the sheet and displays a confirmation message', 'System deletes the sheet and displays a confirmation message', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.locator('button.swal2-confirm').isVisible()).toBeFalsy();
}