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
    reporter.addStep('UC3.4.2_TC1_ID1', 'Select delete operation', 'Delete operation selected', 'Delete operation selected', true, '', executionTime);
  }
  expect(await censusSheetPage.isConfirmAzioneDeleteVisible()).toBeTruthy();
}

export const confirmDeletion = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickConfirmAzioneDelete();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC3.4.2_TC1_ID2', 'Confirm deletion', 'Deletion confirmed', 'Deletion confirmed', true, '', executionTime);
  }
  expect(await censusSheetPage.isDeleteConfirmationMessageVisible()).toBeTruthy();
}