import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const tryAccessWithoutLogin = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_CTS_URL);

  expect(page.url()).not.toBe(process.env.E2E_CTS_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC2_ID1', 'Tenta di accedere direttamente all’URL della sezione schede censimento senza login', 'Il sistema richiede l’autenticazione', 'L\'autenticazione è stata richiesta correttamente', true, {}, executionTime);
  }
}

export const insertInvalidCredentials = async function(page, reporter) {
  await page.goto(process.env.E2E_LOGIN_URL);

  const startTime = new Date().getTime();
  
  // Insert invalid credentials
  await page.fill('input[name="username"]', 'invalid_username');
  await page.fill('input[name="password"]', 'invalid_password');

  await page.click('button[type="submit"]');

  expect(page.url()).not.toBe(process.env.E2E_HOME_URL);

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC3_TC2_ID2', 'Inserisci credenziali non valide o lascia i campi vuoti', 'L’accesso viene negato e compare un messaggio di errore', 'L\'accesso è stato negato correttamente', true, {}, executionTime);
  }
}