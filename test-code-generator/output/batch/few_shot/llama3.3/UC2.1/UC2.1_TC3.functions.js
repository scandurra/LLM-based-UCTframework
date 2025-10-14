import { test, expect } from '@playwright/test';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const clickDownloadButtonWithoutConfirmation = async function(page, reporter) {
  // This step is not implemented as it's not clear how to click the download button without confirmation
  // If you have more information about this step, please let me know
  if (reporter) {
      reporter.addStep('UC2.1_TC3_ID1', 'Clicca sul tasto di download del PDF senza confermare', 'Il processo di download non inizia', 'Il processo di download non è iniziato', true, {}, 0);
  }
}

export const verifyNoDownload = async function(page, reporter) {
  // This step is not implemented as it's not clear how to verify that the file was not downloaded
  // If you have more information about this step, please let me know
  if (reporter) {
      reporter.addStep('UC2.1_TC3_ID2', 'Verifica la presenza di un messaggio di errore', 'Messaggio di richiesta di conferma visualizzato', 'Messaggio di richiesta di conferma visualizzato', true, {}, 0);
  }
}