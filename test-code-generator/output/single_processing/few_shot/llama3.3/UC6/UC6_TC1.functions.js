import { test, expect } from '@playwright/test';

import { NavbarPage } from '../../models/page_object_models/navbar_page.js';

import TestResultReporter from '../../models/test-result-reporter.js';

import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';

export const clickOnUsernameAndSelectLogout = async function(page, reporter) {
  const navbarPage = new NavbarPage(page);
  let startTime = Date.now();
  await navbarPage.clickUserIcon();
  await navbarPage.clickLogout();
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC6_TC1_ID2', 'Click on username and select logout', 'Logout process starts', 'Logout process starts', true, {}, endTime - startTime);
  }
  expect(await navbarPage.logoutSelection.isVisible()).toBeFalsy();
}

export const verifyLogoutSuccessMessage = async function(page, reporter) {
  let startTime = Date.now();
  const successMessage = await page.isVisible('text=Logout successful');
  let endTime = Date.now();
  if (reporter) {
    reporter.addStep('UC6_TC1_ID3', 'Verify logout success message', 'Success message displayed', successMessage ? 'Success message displayed' : 'No success message', successMessage, {}, endTime - startTime);
  }
  expect(successMessage).toBeTruthy();
}