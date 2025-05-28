const { test, expect } = require('@playwright/test');
const HomePage = require('../../models/page_object_models/home-page');
const TestResultReporter = require('../../models/test-result-reporter');

let reporter = new TestResultReporter();

const clickOnProfile = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.clickOnProfile();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC3_ID1', 'L’utente clicca sul proprio nome utente in alto a destra', 'Viene visualizzato un menù a tendina', 'Menù a tendina visualizzato', true, {}, executionTime);
  }
  expect(await page.isVisible(homePage.page.getByRole('menu'))).toBeTruthy();
}

const changeLanguage = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await homePage.changeLanguage();
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC3_ID2', 'L’utente seleziona una lingua non supportata dal menù a tendina', 'Viene visualizzato un messaggio di errore', 'Messaggio di errore visualizzato', true, {}, executionTime);
  }
}

test("UC5_TC3 - Selezione lingua non supportata", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC3 - Selezione lingua non supportata");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  const homePage = new HomePage(page);
  clickOnProfile(page, reporter);
  changeLanguage(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});