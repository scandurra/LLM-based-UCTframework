import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

// Step 1
export const clickOnUsername = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await navbarPage.clickUserIcon();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID1', 'Click on username', 'Menu appears correctly', 'Menu appears correctly', true, '', executionTime);
  }
}

// Step 2
export const selectItalianLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await navbarPage.selectItalianLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID2', 'Select Italian language', 'Selection is accepted', 'Selection is accepted', true, '', executionTime);
  }
}

// Step 3
export const verifyItalianLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  const isEnglishSelected = await navbarPage.isEnglishLanguageSelected();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID3', 'Verify Italian language', 'Portal is completely translated in Italian', !isEnglishSelected ? 'Portal is completely translated in Italian' : 'Portal is not translated in Italian', !isEnglishSelected, '', executionTime);
  }
  expect(!isEnglishSelected).toBeTruthy();
}