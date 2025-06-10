import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const clickOnUsername = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await navbarPage.clickUserIcon();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID1', 'Click on username', 'Menu appears correctly', 'Menu appears correctly', true, '', executionTime);
  }

  await expect(navbarPage.userIcon).toBeVisible();
}

export const selectItalianLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await navbarPage.selectItalianLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID2', 'Select Italian language', 'Selection is accepted', 'Selection is accepted', true, '', executionTime);
  }

  await expect(navbarPage.italianLanguageSelection).not.toBeVisible();
}

export const verifyItalianLanguage = async function(page, reporter) {
  const startTime = new Date().getTime();
  const navbarPage = new NavbarPage(page);
  await page.reload();
  const isEnglishSelected = await navbarPage.isEnglishLanguageSelected();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC1_ID3', 'Verify Italian language', 'Portal is displayed in Italian', isEnglishSelected ? 'Portal is not displayed in Italian' : 'Portal is displayed in Italian', !isEnglishSelected, '', executionTime);
  }

  await expect(isEnglishSelected).toBeFalsy();
}