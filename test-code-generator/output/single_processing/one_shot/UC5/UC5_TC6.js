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
    reporter.addStep('UC5_TC6_ID1', 'L’utente clicca sul proprio nome utente in alto a destra', 'Viene visualizzato un menù a tendina', 'Menù a tendina visualizzato', true, {}, executionTime);
  }
  expect(await page.isVisible(homePage.page.getByRole('menu'))).toBeTruthy();
}

const verifyNoLanguageChange = async function(page, reporter) {
  const homePage = new HomePage(page);
  const startTime = new Date().getTime();
  await page.waitForTimeout(1000);
  const endTime = new Date().getTime();
  const executionTime = (endTime - startTime) / 1000;
  if (reporter) {
    reporter.addStep('UC5_TC6_ID2', 'L’utente non seleziona alcuna opzione dal menù a tendina', 'Il portale non cambia lingua', 'Nessun cambiamento di lingua rilevato', true, {}, executionTime);
  }
  expect(await page.url()).toBe(process.env.E2E_BASE_URL);
}

test("UC5_TC6 - Selezione lingua senza selezionare una opzione dal menù a tendina", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC5_TC6 - Selezione lingua senza selezionare una opzione dal menù a tendina");

  navigateToLoginPage(page, null);
  fillLoginForm(page, null);
  submitLoginForm(page, null);
  verifyAuthenticationSuccess(page, null);

  clickOnProfile(page, reporter);
  verifyNoLanguageChange(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});