import { LoginPage } from '../../models/page_object_models/login_page.js';

import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

export const loginWithValidCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Login with valid credentials', true, true, true, `Email: ${process.env.EMAIL}, Password: ${process.env.PASSWORD}`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeFalsy();
}

export const loginWithInvalidCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('invalid-email');
    await loginPage.fillPassword('invalid-password');
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC2_ID1', 'Login with invalid credentials', true, true, true, `Email: invalid-email, Password: invalid-password`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const changeFirstPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword('new-password');
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC3_ID1', 'Change first password', true, true, true, `Email: ${process.env.EMAIL}, Password: new-password`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeFalsy();
}

export const loginWithEmptyUsername = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail('');
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC4_ID1', 'Login with empty username', true, true, true, `Email: , Password: ${process.env.PASSWORD}`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const insertInvalidCharactersInPassword = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail(process.env.EMAIL);
    await loginPage.fillPassword('password!@#$');
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC5_ID1', 'Insert invalid characters in password', true, true, true, `Email: ${process.env.EMAIL}, Password: password!@#$`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}

export const sqlInjectionAttack = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.fillEmail("SELECT * FROM users WHERE id = 1");
    await loginPage.fillPassword(process.env.PASSWORD);
    await loginPage.clickLoginButton();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC6_ID1', 'SQL injection attack', true, true, true, `Email: SELECT * FROM users WHERE id = 1, Password: ${process.env.PASSWORD}`, executionTime);
    }

    expect(await loginPage.isEmailFieldVisible()).toBeTruthy();
}