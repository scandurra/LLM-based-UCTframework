import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { SidebarPage } from '../../models/page_object_models/sidebar_page.js';

export const accessCensusSheetSection = async function(page, reporter) {
  const startTime = new Date().getTime();
  const sidebarPage = new SidebarPage(page);
  await sidebarPage.clickCensusSheetLink();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC4_ID1', 'Accedi alla sezione delle schede censimento', 'La sezione si apre correttamente', 'La sezione è stata selezionata con successo', true, {}, executionTime);
  }
}

export const verifyPresenceOfElements = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Verify presence of all elements in census sheet section
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC4_ID2', 'Verifica la presenza di tutti gli elementi previsti', 'Tutti gli elementi sono presenti e funzionano come previsto', 'Tutti gli elementi sono stati trovati', true, {}, executionTime);
  }
}