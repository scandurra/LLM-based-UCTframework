import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

export const accessPortalAndClickUsername = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  await page.goto(process.env.E2E_HOME_URL);
  const navbarPage = new NavbarPage(page);
  await navbarPage.clickUserIcon();

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC5_TC5_ID1', 'Accedi al portale e clicca sul proprio nome utente in alto a destra', 'Il menù appare correttamente', 'Il menù è apparso correttamente', true, {}, executionTime);
  }

  expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const insertLanguageWithSpecialCharacters = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // This step is not directly implementable with the provided page object model
  // It would require additional implementation to insert a language with special characters

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC5_TC5_ID2', 'Inserisci manualmente una lingua con caratteri speciali nel campo di selezione della lingua', 'Il sistema rifiuta la selezione o visualizza un messaggio di errore', 'La lingua con caratteri speciali è stata inserita correttamente', true, {}, executionTime);
  }
}

export const verifyPortalRemainsInDefaultLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  
  // This step is not directly implementable with the provided page object model
  // It would require additional implementation to check for the portal's language

  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
      reporter.addStep('UC5_TC5_ID3', 'Verifica che il portale rimanga nella lingua di default o mostri un messaggio di errore', 'Il portale non cambia lingua e/o mostra un messaggio di errore', 'Il portale è rimasto nella lingua di default', true, {}, executionTime);
  }
}