import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToTableNonExisting = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await selectDashboardMenu(page, null);
  await page.waitForSelector('table');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC3_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(await page.isVisible('table')).toBeTruthy();
}

export const selectNonExistingCity = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.selectNonExistingCity();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC3_ID2', 'Seleziona un comune che non esiste o non è disponibile', 'Il sistema visualizza un messaggio di errore o una pagina di default per comuni non trovati', 'Il messaggio di errore è stato visualizzato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isErrorVisible()).toBeTruthy();
}

export const verifyErrorMessage = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.verifyErrorMessage();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC3_ID3', 'Verifica che il messaggio di errore sia chiaro e utile per l\'utente', 'Il messaggio di errore fornisce informazioni utili all\'utente su come procedere', 'Il messaggio di errore è stato verificato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isErrorMessageClear()).toBeTruthy();
}