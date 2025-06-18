import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const tryAccessWithoutAuthentication = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_CTS_URL);
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC2_ID1', 'Tenta di accedere direttamente all’URL della sezione schede censimento senza login', 'Il sistema richiede l’autenticazione', 'L\'accesso è stato negato', true, {}, executionTime);
  }
}

export const insertInvalidCredentials = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.goto(process.env.E2E_LOGIN_URL);
  // Insert invalid credentials
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC2_ID2', 'Inserisci credenziali non valide o lascia i campi vuoti', 'L’accesso viene negato e compare un messaggio di errore', 'L\'accesso è stato negato con messaggio di errore', true, {}, executionTime);
  }
}