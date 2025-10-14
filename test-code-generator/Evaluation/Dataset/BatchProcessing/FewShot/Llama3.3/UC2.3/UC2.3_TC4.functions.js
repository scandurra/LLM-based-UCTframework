import { test, expect } from '@playwright/test';

import { DashboardPageGeneralDataTable } from '../../models/page_object_models/dashboard_page_general_data_table.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const accessAndScrollToTableInvalid = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await selectDashboardMenu(page, null);
  await page.waitForSelector('table');

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC4_ID1', 'Accedi alla sezione dashboard e scorri fino alla tabella dei dati generali', 'La tabella è visibile', 'La tabella è stata visualizzata correttamente', true, {}, executionTime);
  }

  expect(await page.isVisible('table')).toBeTruthy();
}

export const insertInvalidNumberOfRows = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.insertInvalidNumberOfRows();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC4_ID2', 'Inserisci un numero di elementi per pagina non valido (ad esempio, un valore alfanumerico)', 'Il sistema visualizza un messaggio di errore o reimposta il numero di elementi per pagina alle impostazioni predefinite', 'Il messaggio di errore è stato visualizzato correttamente', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isErrorVisible()).toBeTruthy();
}

export const verifySystemBehavior = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  const dashboardPageGeneralDataTable = new DashboardPageGeneralDataTable(page);
  await dashboardPageGeneralDataTable.verifySystemBehavior();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC2.3_TC4_ID3', 'Verifica che il sistema gestisca correttamente l\'input non valido', 'Il sistema si comporta come atteso in caso di input non valido', 'Il sistema si è comportato come atteso', true, {}, executionTime);
  }

  expect(await dashboardPageGeneralDataTable.isSystemBehaviorCorrect()).toBeTruthy();
}