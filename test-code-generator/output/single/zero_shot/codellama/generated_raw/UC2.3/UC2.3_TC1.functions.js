// Import necessary libraries and page object models
const { DateTime } = require('luxon');
const LoginPage = require("../../models/page_object_models/login_page.js");
const SidebarPage = require("../../models/page_object_models/sidebar_page.js");
const DashboardPageGeneralDataTable = require("../../models/page_object_models/dashboard_page_general_data_table.js");

async function step1_AccediAllaSezioneDashboardTramiteIlMenùApposito(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 1 implementation: Accedi alla sezione dashboard tramite il menù apposito
    await SidebarPage.clickCensusSheetLink();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Accedi alla sezione dashboard tramite il menù apposito', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the census sheet link is visible and enabled
    await expect(SidebarPage.censusSheetLink).toBeVisible();
    await expect(SidebarPage.censusSheetLink).not.toBeDisabled();
}

async function step2_ScorriNellaPaginaFinoAVisualizzareLaSezioneTabellareDedicataAiDatiGenerali(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 2 implementation: Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali
    await DashboardPageGeneralDataTable.isTableVisible();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID2', 'Scorri nella pagina fino a visualizzare la sezione tabellare dedicata ai dati generali', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertion: Check that the table is visible and enabled
    await expect(DashboardPageGeneralDataTable.generalDataTable).toBeVisible();
}

async function step3_VerificaCheSiaPossibileScorrereTraIComuniDisponibiliEModificareGliElementiVisualizzatiPerPagina(page, reporter) {
    const startTime = DateTime.now();
    
    // Step 3 implementation: Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina
    await DashboardPageGeneralDataTable.isNextButtonVisible();
    await DashboardPageGeneralDataTable.isElementsDropdownVisible();
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC2_TC1_ID3', 'Verifica che sia possibile scorrere tra i comuni disponibili e modificare gli elementi visualizzati per pagina', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }
    
    // Playwright assertions: Check that the next button and elements dropdown are visible and enabled
    await expect(DashboardPageGeneralDataTable.nextButton).toBeVisible();
    await expect(DashboardPageGeneralDataTable.elementsDropdown).toBeVisible();
}