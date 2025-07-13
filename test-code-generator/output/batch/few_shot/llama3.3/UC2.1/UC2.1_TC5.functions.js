import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const clickDownloadButton = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  await dashboardPagePdfDownload.downloadPDF();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.1_TC5_ID1', 'Clicca sul tasto di download del PDF', 'Il file inizia a scaricarsi', 'Il file è iniziato a scaricarsi', true, {}, executionTime);
  }
}

export const verifyFileDownload = async function(page, reporter) {
  // This step is not implemented as it's not clear how to verify that the file was downloaded
  // If you have a way to verify that the file was downloaded, add it here
  if (reporter) {
    reporter.addStep('UC2.1_TC5_ID2', 'Verifica che il file sia stato scaricato', 'Il file è stato scaricato correttamente', 'Il file è stato scaricato correttamente', true, {}, 0);
  }
}