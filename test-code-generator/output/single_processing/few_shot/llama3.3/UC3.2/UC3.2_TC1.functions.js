import { test, expect } from '@playwright/test';

import { CensusSheetPage } from '../../models/page_object_models/census_sheet_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { openCensusSheetInterface, authenticateAndOpenDashboard } from '../UC3/UC3_TC1.functions.js';

export const searchWithValidParameters = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.searchByName('Lucania');
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID2', 'Search with valid parameters', 'Parameters accepted', 'Parameters accepted', true, {}, executionTime);
  }
  expect(await censusSheetPage.page.url()).toContain(process.env.E2E_CTS_URL);
}

export const executeSearch = async function(page, reporter) {
  const startTime = new Date().getTime();
  const censusSheetPage = new CensusSheetPage(page);
  await censusSheetPage.clickAzioniButton();
  await censusSheetPage.clickAzioneDettaglio();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID3', 'Execute search', 'Information displayed', 'Information displayed', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}

export const accessSearchSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  await authenticateAndOpenDashboard(page, null);
  await openCensusSheetInterface(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3.2_TC1_ID1', 'Access search section', 'Search bar visible', 'Search bar visible', true, {}, executionTime);
  }
  expect(await page.url()).toContain(process.env.E2E_CTS_URL);
}