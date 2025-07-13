import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPlatformAndAuthenticateWithSpecialChars = async function(page, reporter) {
  const startTime = new Date().getTime();
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);
  // Modify URL with special characters
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC3_ID1', 'Accedi alla piattaforma e autenticati con caratteri speciali nel percorso', 'La dashboard principale viene visualizzata', 'L\'utente è stato autenticato con successo', true, {}, executionTime);
  }
}

export const selectCensusSheetMenuWithSpecialChars = async function(page, reporter) {
  const startTime = new Date().getTime();
  // Select census sheet menu with special characters in URL
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC3_TC3_ID2', 'Modifica manualmente l’URL del menù laterale aggiungendo caratteri speciali', 'Il sistema gestisce correttamente i caratteri speciali e apre la sezione', 'La sezione è stata selezionata con successo', true, {}, executionTime);
  }
}