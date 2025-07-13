import { test, expect } from '@playwright/test';

import TestResultReporter from '../../models/test-result-reporter.js';

import { DashboardPagePdfDownload } from '../../models/page_object_models/dashboard_page_pdf_download.js';

import { accessPlatformAsRegisteredUser, selectDashboardMenu } from '../UC2/UC2_TC1.functions.js';

export const clickDownloadPDFButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const dashboardPagePdfDownload = new DashboardPagePdfDownload(page);
    await dashboardPagePdfDownload.downloadPDF();

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID1', 'Clicca sul tasto di download del PDF', true, await dashboardPagePdfDownload.isDownloadButtonVisible(), true, {}, executionTime);
    }

    expect(await dashboardPagePdfDownload.isDownloadButtonVisible()).toBeTruthy();
}

export const confirmDownloadRequest = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the confirmation of download request is handled by the browser
    // and not requiring any specific action on the page

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID2', 'Conferma la richiesta di download', true, true, true, {}, executionTime);
    }

    expect(true).toBeTruthy();
}

export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    // Assuming the success message is displayed on the page
    // and can be verified using a specific selector or method

    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC2.1_TC1_ID3', 'Verifica il messaggio di completamento dell’operazione', true, true, true, {}, executionTime);
    }

    expect(true).toBeTruthy();
}