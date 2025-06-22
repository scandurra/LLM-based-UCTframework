import { test, expect } from '@playwright/test';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAndAuthenticate = async function(page, reporter) {
  const startTime = new Date().getTime();
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID1', 'Accedi alla piattaforma e autenticati correttamente', 'La dashboard principale viene visualizzata', 'L\'utente è stato autenticato con successo', true, {}, executionTime);
  }
}

export const selectCensusSheetMenu = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickCensusSheetLink();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC1_ID2', 'Seleziona la voce del menù laterale relativa alle schede censimento', 'La sezione delle schede censimento si apre correttamente', 'La sezione è stata selezionata con successo', true, {}, executionTime);
  }
}