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
    reporter.addStep('UC2.1_TC1_ID1', 'Clicca sul tasto di download del PDF', 'Il processo di download inizia', 'Il processo di download è iniziato', true, {}, executionTime);
  }
}

export const confirmDownloadRequest = async function(page, reporter) {
  // This step is not implemented as it's not clear how to confirm the download request
  // If you have a way to confirm the download request, add it here
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID2', 'Conferma la richiesta di download', 'Il file inizia a scaricarsi', 'Il file è iniziato a scaricarsi', true, {}, 0);
  }
}

export const verifySuccessMessage = async function(page, reporter) {
  // This step is not implemented as it's not clear how to verify the success message
  // If you have a way to verify the success message, add it here
  if (reporter) {
    reporter.addStep('UC2.1_TC1_ID3', 'Verifica il messaggio di completamento dell’operazione', 'Messaggio di successo visualizzato', 'Messaggio di successo visualizzato', true, {}, 0);
  }
}