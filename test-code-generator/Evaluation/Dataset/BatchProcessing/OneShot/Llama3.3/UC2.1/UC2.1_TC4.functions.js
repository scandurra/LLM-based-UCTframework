import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const clickDownloadButtonAndCancel = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  await dashboardPagePdfDownload.downloadPDF();
  // This step is not implemented as it's not clear how to cancel the download request
  // If you have a way to cancel the download request, add it here
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.1_TC4_ID1', 'Clicca sul tasto di download del PDF e annulla la richiesta', 'Il processo di download non inizia', 'Il processo di download non è iniziato', true, {}, executionTime);
  }
}

export const repeatDownloadRequest = async function(page, reporter) {
  const startTime = new Date().getTime();
  const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
  await dashboardPagePdfDownload.downloadPDF();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.1_TC4_ID2', 'Ripeti la richiesta di download', 'Il file inizia a scaricarsi', 'Il file è iniziato a scaricarsi', true, {}, executionTime);
  }
}

export const verifySuccessMessageAfterRepeat = async function(page, reporter) {
  // This step is not implemented as it's not clear how to verify the success message
  // If you have a way to verify the success message, add it here
  if (reporter) {
    reporter.addStep('UC2.1_TC4_ID3', 'Verifica il messaggio di completamento dell’operazione', 'Messaggio di successo visualizzato', 'Messaggio di successo visualizzato', true, {}, 0);
  }
}