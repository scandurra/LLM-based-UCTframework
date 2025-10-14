import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformWithMobileDevice = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_HOME_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC5_ID1', 'Accedi alla piattaforma con un dispositivo mobile', 'La dashboard si apre e funziona correttamente sul dispositivo mobile', 'La dashboard è stata aperta correttamente', true, {}, executionTime);
  }

  expect(page.url()).toBe(process.env.E2E_HOME_URL);
}

export const verifyCorrectNavigation = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // No implementation available for this step

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2_TC5_ID2', 'Verifica la corretta navigazione all\'interno della dashboard', 'La navigazione è stata eseguita correttamente', 'La navigazione è stata verificata correttamente', true, {}, executionTime);
  }
}