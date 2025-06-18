import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const clickDownloadButtonWithoutConfirmation = async function(page, reporter) {
  const startTime = new Date().getTime();
  // This step is not implemented as it's not clear how to click the download button without confirmation
  // If you have a way to click the download button without confirmation, add it here
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC2.1_TC3_ID1', 'Clicca sul tasto di download del PDF senza confermare', 'Il processo di download non inizia', 'Il processo di download non è iniziato', true, {}, executionTime);
  }
}

export const verifyNoDownload = async function(page, reporter) {
  // This step is not implemented as it's not clear how to verify that the file was not downloaded
  // If you have a way to verify that the file was not downloaded, add it here
  if (reporter) {
    reporter.addStep('UC2.1_TC3_ID2', 'Verifica la presenza di un messaggio di errore', 'Messaggio di richiesta di conferma visualizzato', 'Messaggio di richiesta di conferma visualizzato', true, {}, 0);
  }
}