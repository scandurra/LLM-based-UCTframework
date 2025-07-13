import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download';

export const clickDownloadButton = async function(page, reporter) {
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  let startTime = Date.now();
  await dashboardPagePdfDownload.downloadPDF();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID1', 'Click download button', 'Download process starts', 'Download process starts', true, {}, endTime - startTime);
  }
  expect(await dashboardPagePdfDownload.isDownloadButtonVisible()).toBeFalsy();
}

export const confirmDownloadRequest = async function(page, reporter) {
  let passFail = 0;  
  let startTime = Date.now();
  await page.on('download', download => download.path().then(passFail = 1));
  let endTime = Date.now();

  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID2', 
      'Confirm download request', 
      "File starts downloading", 
      passFail ? "File starts downloading" : "Error starting download",
      passFail,
      {},
      endTime - startTime
    );
  }
}

export const verifySuccessMessage = async function(page, reporter) {
  let passFail = 0;  
  let startTime = Date.now();
  if (await page.isVisible('text=Download completed successfully')) {
    passFail = 1;
  }
  let endTime = Date.now();

  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID3', 
      'Verify success message', 
      "Success message is displayed", 
      passFail ? "Success message is displayed" : "Error displaying success message",
      passFail,
      {},
      endTime - startTime
    );
  }
}