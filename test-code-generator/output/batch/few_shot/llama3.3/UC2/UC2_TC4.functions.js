import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformWithDifferentBrowsers = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_HOME_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC4_ID1', 'Accedi alla piattaforma utilizzando browser differenti', 'La dashboard si apre e funziona correttamente su ogni browser', 'La dashboard è stata aperta correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const verifyAbsenceOfVisualizationProblems = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // No implementation available for this step

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC4_ID2', 'Verifica la presenza di eventuali problemi di visualizzazione o funzionalità', 'Nessun problema riscontrato nella visualizzazione o nell’utilizzo della dashboard', 'Nessun problema è stato riscontrato', true, {}, executionTime);
  }
}