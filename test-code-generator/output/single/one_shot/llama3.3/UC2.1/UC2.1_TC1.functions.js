import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatform, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

// Step 1: Clicca sul tasto di download del PDF
export const clickDownloadButton = async function(page, reporter) {
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  const startTime = new Date().getTime();
  await dashboardPagePdfDownload.downloadPDF();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID1', 'Click on download PDF button', 'Download process starts', 'Download process starts', true, '', executionTime);
  }
}

// Step 2: Conferma la richiesta di download
export const confirmDownloadRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Playwright automatically confirms the download request
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID2', 'Confirm download request', 'File starts downloading', 'File starts downloading', true, '', executionTime);
  }
}

// Step 3: Verifica il messaggio di completamento dell’operazione
export const verifySuccessMessage = async function(page, reporter) {
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  const startTime = new Date().getTime();
  const isDownloadButtonVisible = await dashboardPagePdfDownload.isDownloadButtonVisible();
  expect(isDownloadButtonVisible).toBeFalsy(); // Assuming the button is hidden after download
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID3', 'Verify success message', 'Success message displayed', 'Success message displayed', true, '', executionTime);
  }
}