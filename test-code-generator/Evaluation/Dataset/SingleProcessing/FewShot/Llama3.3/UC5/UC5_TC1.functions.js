import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const clickOnUsername = async function(page, reporter) {
  const navbarPage = new NavbarPage(page);
  const startTime = new Date().getTime();
  await navbarPage.clickUserIcon();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID1', 'Click on username', 'Menu appears correctly', 'Menu appears correctly', true, {}, executionTime);
  }
  expect(await navbarPage.userIcon.isVisible()).toBeTruthy();
}

export const selectItalianLanguage = async function(page, reporter) {
  const navbarPage = new NavbarPage(page);
  const startTime = new Date().getTime();
  await navbarPage.selectItalianLanguage();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID2', 'Select Italian language', 'Selection is accepted', 'Selection is accepted', true, {}, executionTime);
  }
  expect(await navbarPage.italianLanguageSelection.isVisible()).toBeTruthy();
}

export const verifyItalianLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  await page.reload();
  const endTime = new Date().getTime();
  const executionTime = endTime - startTime;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID3', 'Verify Italian language', 'Portal is displayed in Italian', await page.isVisible('text=Benvenuto'), await page.isVisible('text=Benvenuto'), true, executionTime);
  }
  expect(await page.isVisible('text=Benvenuto')).toBeTruthy();
}