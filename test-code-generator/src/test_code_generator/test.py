from test_code_generator.validator import JavascriptCodeValidator
import ollama


messages = [
    { 
        'role': 'system',
        'content': 'You are a testing engineer, expert in writing Javascript end-to-end tests with Playwright.'
    },
    {
        'role': 'user',
        'content': """
Task: Analyze the test case provided below and generate a complete and working Playwright test script in Javascript, for legitimate software testing purposes of my own web application. 
The test script must follow the steps described in the test case.
When creating the test script, use only the page object model provided for interacting with the DOM and the parameters provided.

Use only this page object models for interacting with the DOM:
<page_object_model>
// File: report_energetici_page.js
export class ReportEnergeticiPage {  
    constructor(page) {
        this.page = page;
        this.fromDateInput = page.locator("#from-date");
        this.toDateInput = page.locator("#to-date");
        this.exportFormatSelect = page.locator("#export-format");
        this.exportButton = page.locator("#export-button");
    }
  
    async selectFromDate(date) {
        await this.fromDateInput.fill(date);
    }
  
    async selectToDate(date) {
        await this.toDateInput.fill(date);
    }
  
    // format can be 'csv' or 'pdf'
    async selectExportFormat(format) {
        await this.exportFormatSelect.selectOption(format);
    }
  
    async clickExportButton() {
        return await this.exportButton.click();
    }
}
</page_object_model>

Use only the following parameters from environment variables in the test scripts:
E2E_BASE_URL=""
E2E_LOGIN_URL=""
E2E_SUPPORT_URL=""
E2E_SUPPORT_SUCCESS_URL = ""
E2E_HOME_URL="" 
E2E_DASHBOARD_URL="" 
E2E_CTS_URL="" 
EMAIL=""
PASSWORD=""

When in the test case there is a step, a precondition or a postcondition with a name of use case UC*, reuse this functions passing null as reporter parameter:
<code>
// File: UC1_TC1.functions.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../models/page_object_models/login_page.js';
import { insertCorrectCredentials, clickLoginButton, verifyAuthenticationSuccessMessage } from '../UC1/UC1_TC1.functions.js';
import TestResultReporter from '../../models/test-result-reporter.js';

export const navigateToLoginPage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    await page.goto(process.env.E2E_LOGIN_URL);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Navigate to login page', 'Login page loaded', 'Login page loaded', true, `E2E_LOGIN_URL: ${process.env.E2E_LOGIN_URL}`, executionTime);
    }
}

export const insertCorrectCredentials = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.enterEmail(process.env.E2E_LOGIN_EMAIL_ADMIN);
    await loginPage.enterPassword(process.env.E2E_LOGIN_PASSWORD_ADMIN);
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Insert correct credentials', 'Credentials accepted', 'Credentials accepted', true, `E2E_LOGIN_EMAIL_ADMIN: ${process.env.E2E_LOGIN_EMAIL_ADMIN}, E2E_LOGIN_PASSWORD_ADMIN: ${process.env.E2E_LOGIN_PASSWORD_ADMIN}`, executionTime);
    }
}

export const clickLoginButton = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    await loginPage.login();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Click login button', 'System proceeds with authentication', 'System proceeds with authentication', true, '', executionTime);
    }
}

export const verifySuccessMessage = async function(page, reporter) {
    const startTime = new Date().getTime();
    
    const loginPage = new LoginPage(page);
    const message = await loginPage.getErrorMessage();
    
    const endTime = new Date().getTime();
    const executionTime = (endTime - startTime) / 1000;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID4', 'Verify success message', 'Success message displayed', message, message !== null, '', executionTime);
    }

    await expect(message).not.toBeNull();
}

// File: UC1_TC1.spec.js
import { test, expect } from '@playwright/test';
import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from './UC1_TC1.functions.js';
import TestResultReporter from '../../models/test-result-reporter.js';

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    const reporter = new TestResultReporter();
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login test with success");

    await navigateToLoginPage(page, reporter);
    await insertCorrectCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    await verifySuccessMessage(page, reporter);

    reporter.onTestEnd(test, { status: "passed" });
});
</code>

Instructions:
1. Analyze the test case provided
2. For the test case, generate a test script in Javascript with Playwright
3. Use only Page object model provided to interact with the DOM.
4. Call the TestResultReporter object methods as described below.
5. Put the code in functions for reusability, with the reporter object as parameter not mandatory. If not null, call reporter methods. 
6. Put functions in a separate file called "UC8.2.3_TC1.functions.js" and the test in a file called "UC8.2.3_TC1.spec.js"
7. Do not rewrite functions provided in the prompt, just refer to them.
8. Add the required import for:
    * test, expect, ... from '@playwright/test' in all files
    * TestResultReporter from "../../models/test-result-reporter.js" 
    * page object models from "../../models/page_object_models/<page_object_model_name>.js" 
    * existing code from the path specified in the code snippet. Pay attention to add imports used also by the existing code. 
    * make the generated "UC8.2.3_TC1.spec.js" file to reference functions in "UC8.2.3_TC1.functions.js" generated file

<example>
export const functionNameDescribingStep = async function(page, reporter) {
    const startTime = DateTime.now();
    
    // Put here test case step implementation
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Step 1 description', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    // Include Playwright assertions
    expect(passFail).toBeTruthy();
}

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login test with success");

    // Call step functions in sequence
    await functionNameDescribingStep1(page, reporter);
    await functionNameDescribingStep2(page, reporter);
    // Additional steps...

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});
</example>

Here the test case to be converted in Playwright script:
<test_case>
Test Case ID: UC8.2.3_TC1
Title: Esportazione report in PDF con dati validi
Use Case ID: UC8.2
Priority: Alta
Type: Positivo
Preconditions: UC1
Postconditions: Il file esportato viene scaricato correttamente
Test Steps:
  1. Step: Accedi alla pagina dei report energetici
Expected: La sezione viene visualizzata correttamente
  2. Step: Seleziona un periodo valido e il formato PDF
Expected: Le selezioni vengono accettate
  3. Step: Download del file
Expected: Il file PDF viene generato e scaricato
</test_case>

Output format:
* Output only valid and runnable JavaScript code
* Do not write code implementation provided in the prompt, only reference it
* Structure the code in files using XML tags with "file" attribute containing the name

"""
    },
    {
        'role': 'assistant',
        'content': """
<output file="UC8.2.3_TC1.functions.js">
import { test, expect } from '@playwright/test';
import { ReportEnergeticiPage } from '../../models/page_object_models/report_energetici_page.js';
import TestResultReporter from '../../models/test-result-reporter.js';

// Step 1
export const navigateToReportEnergeticiPage = async function(page, reporter) {
  const startTime = new Date().getTime();
    await page.goto(process.env.E2E_REPORT_ENERGETICI_URL);
    const endTime = new Date().getTime();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC08_TC1_ID1', 'Navigate to report energetici page', 'Support page loaded', 'Support page loaded', true, `E2E_REPORT_ENERGETICI_URL: ${process.env.E2E_REPORT_ENERGETICI_URL}`, executionTime);
    }
}

// Step 2
export const selectPeriodAndFormat = async function(page, reporter) {
  const reportEnergeticiPage = new ReportEnergeticiPage(page);

  let startTime = Date.now();
  const fromDate = "2025-05-01";
  const toDate = "2025-05-30";
  const format = "csv"
  await reportEnergeticiPage.selectIssueCategory();
  await reportEnergeticiPage.enterIssueDescription();
  await reportEnergeticiPage.enterEmail();
  let endTime = Date.now();
  
  if (reporter) {
    reporter.addStep('UC8_TC1_ID2', 'L\'utente compila i campi', `Campi compilati`, `Campi compilati`, true, { fromDate, toDate, format }, endTime - startTime);
  }
}

// Step 3
export const exportFile = async function (page, reporter) {
  const reportEnergeticiPage = new ReportEnergeticiPage(page);

  let passFail = 0;  // 1 se passato, 0 se fallito
  let startTime = date.now();
  await reportEnergeticiPage.clickExportButton();
  await page.on('download', download => download.path().then(passFail = 1));
  let endTime = date.now();

  if (reporter) {
    reporter.addStep('UC8_TC1_ID3', 
      'Esportazione', 
      "Il file viene scaricato correttamente", 
      testPass ? "Il file viene scaricato correttamente" : "Errore nello scaricare il file",
      testPass,
      {},
      endTime - startTime
    );
  }

  expect(testPass).toBeTruthy();
}
</output>

<output file="UC8.2.3_TC1.spec.js">
import { test, expect } from '@playwright/test';
import { ReportEnergeticiPage } from '../../models/page_object_models/report_energetici_page.js';
import TestResultReporter from '../../models/test-result-reporter.js';
import { navigateToReportEnergeticiPage, selectPeriodAndFormat, exportFile } from './UC8.2.3_TC1.functions.js'
import { navigateToLoginPage, insertCorrectCredentials, clickLoginButton, verifySuccessMessage } from '../UC1/UC1_TC1.functions.js'

test("UC10_TC1 - Invio richiesta di assistenza", async ({ page, browserName }) => {
  reporter.setBrowserName(browserName);
  reporter.setTestCase("UC10_TC1", "Invio richiesta di assistenza");

  // Reuse existing method in the prompt without redefining them
  await navigateToLoginPage(page, null);
  await insertCorrectCredentials(page, null);
  await clickLoginButton(page, null);
  await verifySuccessMessage(page, null);

  await navigateToReportEnergeticiPage(page, reporter);
  await selectPeriodAndFormat(page, reporter);
  await exportFile(page, reporter);

  reporter.onTestEnd(test, { status: "passed" });
});
</output>
"""
    },
    {
        'role': 'user',
        'content': """

Task: Analyze the test case provided below and generate a complete and working Playwright test script in Javascript, for legitimate software testing purposes of my own web application. 
The test script must follow the steps described in the test case.
When creating the test script, use only the page object model provided for interacting with the DOM and the parameters provided.

Use only this page object models for interacting with the DOM:
<page_object_model>
File: dashboard_page_pdf_download.js
export class DashboardPagePdfDownload {
	constructor(page) {
		this.page = page;

		// Selectors
		this.downloadPDFButton = this.page.getByRole('button', { name: 'Download PDF' });
	}

	async downloadPDF() {
		await this.downloadPDFButton.click();
	}

	async isDownloadButtonVisible() {
		return await this.downloadPDFButton.isVisible();
	}
}
</page_object_model>

Use only the following parameters from environment variables in the test scripts:
E2E_BASE_URL=""
E2E_LOGIN_URL=""
E2E_HOME_URL="" 
E2E_DASHBOARD_URL="" 
E2E_CTS_URL="" 
EMAIL=""
PASSWORD=""

When in the test case there is a step, a precondition or a postcondition with a name of use case UC*, reuse this functions passing null as reporter parameter:
<code>
// File: UC2_TC1.functions.js
import { SidebarPage } from '../../models/page_object_models/sidebar_page';

export const navigateToDashboard = async (page, reporter) => {
    let passFail = 0; // 1 se passato, 0 se fallito
    let startTime = Date.now();
    
    await page.goto(E2E_HOME_URL);
    const sidebarPage = new SidebarPage(page);
    await sidebarPage.clickDashboardLink();
    
    if (await page.url() === E2E_DASHBOARD_URL) {
        passFail = 1;
    }
    
    let endTime = Date.now();
    if (reporter) {
        reporter.addStep('UC2_TC1_ID1', 'Navigazione alla dashboard', 'Dashboard raggiunta con successo', passFail ? 'Dashboard raggiunta con successo' : 'Errore nella navigazione alla dashboard', passFail, {}, endTime - startTime);
    }
    
    expect(passFail).toBeTruthy();
};
// File: UC2_TC1.spec.js
import { test, expect } from '@playwright/test';

import { navigateToDashboard } from './UC2_TC1.functions.js';

test("UC2_TC1 - Apertura della dashboard con utente autorizzato", async ({ page }) => {
    await navigateToDashboard(page);
});
</code>

Instructions:
1. Analyze the test case provided
2. For the test case, generate a test script in Javascript with Playwright
3. Use only Page object model provided to interact with the DOM.
4. Call the TestResultReporter object methods as described below.
5. Put the code in functions for reusability, with the reporter object as parameter not mandatory. If not null, call reporter methods. 
6. Put functions in a separate file called "UC2.1_TC1.functions.js" and the test in a file called "UC2.1_TC1.spec.js"
7. Do not rewrite functions provided in the prompt, just refer to them.
8. Add the required import for:
    * test, expect, ... from '@playwright/test' in all files
    * TestResultReporter from "../../models/test-result-reporter.js" 
    * page object models from "../../models/page_object_models/<page_object_model_name>.js" 
    * existing code from the path specified in the code snippet. Pay attention to add imports used also by the existing code. 
    * make the generated "UC2.1_TC1.spec.js" file to reference functions in "UC2.1_TC1.functions.js" generated file

<example>
export const functionNameDescribingStep = async function(page, reporter) {
    const startTime = DateTime.now();
    
    // Put here test case step implementation
    
    const endTime = DateTime.now();
    const executionTime = endTime - startTime;
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Step 1 description', expectedResults, actualResults, passFail, parametersUsed, executionTime);
    }

    // Include Playwright assertions
    expect(passFail).toBeTruthy();
}

test("UC1_TC1 - Login test with success", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase("UC1_TC1", "Login test with success");

    // Call step functions in sequence
    await functionNameDescribingStep1(page, reporter);
    await functionNameDescribingStep2(page, reporter);
    // Additional steps...

    reporter.onTestEnd(test, { status: "passed" });     // status can be "passed" or "failed" 
});
</example>

Here the test case to be converted in Playwright script:
<test_case>
Test Case ID: UC2.1_TC1
Title: Download PDF con successo
Use Case ID: UC2.1
Priority: Alta
Type: Positivo
Preconditions: UC2
Postconditions: L’utente ha scaricato il file, può aprirlo dalla apposita sezione del browser utilizzato ed il file è ben formato
Test Steps:
  1. Step: Clicca sul tasto di download del PDF
Expected: Il processo di download inizia
  2. Step: Conferma la richiesta di download
Expected: Il file inizia a scaricarsi
  3. Step: Verifica il messaggio di completamento dell’operazione
Expected: Messaggio di successo visualizzato
</test_case>


Output format:
* Output only valid and runnable JavaScript code
* Do not write code implementation provided in the prompt, only reference it
* Structure the code in files using XML tags with "file" attribute containing the name
"""
    }
]

stream = ollama.chat(
    model="codellama:70b",
    messages=messages,
    stream=True,
    options={
        "temperature": 0
    }
)

for chunk in stream:
  print(chunk['message']['content'], end='', flush=True)

pass




code = """


 I apologize for any confusion earlier. Here is a revised test script that meets your requirements:

**login_page.js (Page Object Model)**
```javascript
export class LoginPage {
    constructor(page) {
        this.page = page;
        
        // Locators
        this.loginLink = page.getByRole('link', { name: 'Login' });
        this.emailInput = page.getByLabel('E-mail');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
        // Selectors
        this.emailFieldSelector = 'input[name="email"]';
    }
    
    // Login flow methods
    async clickLoginLink() {
        await this.loginLink.click();
    }
    
    async isEmailFieldVisible() {
        return await this.page.isVisible(this.emailFieldSelector);
    }
    
    async fillEmail(email) {
        await this.emailInput.fill(email);
    }
    
    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }
    
    async clickLoginButton() {
        await this.loginButton.click();
    }
}
```

**UC1_TC1.functions.js (Functions for Test Steps)**
```javascript
export const navigateToLoginPage = async function(page, reporter) {
    let passFail = 0; // 1 se passato, 0 se fallito
    let startTime = Date.now();
    
    await page.goto('E2E_LOGIN_URL');
    let endTime = Date.now();
    
    if (reporter) {
        reporter.addStep('UC1_TC1_ID1', 'Navigazione alla pagina di login', 'Pagina di login raggiunta con successo', testPass ? "Pagina di login raggiunta con successo" : "Errore nella navigazione", testPass, {}, endTime - startTime);
    }
    
    expect(testPass).toBeTruthy();
}

export const fillCredentials = async function (page, reporter) {
    let passFail = 0; // 1 se passato, 0 se fallito
    let startTime = Date.now();
    
    await page.fill('input[name="email"]', 'EMAIL');
    await page.fill('input[name="password"]', 'PASSWORD');
    let endTime = Date.now();
    
    if (reporter) {
        reporter.addStep('UC1_TC1_ID2', 'Inserimento delle credenziali', 'Credenziali inserite correttamente', testPass ? "Credenziali inserite correttamente" : "Errore nell'inserimento delle credenziali", testPass, {}, endTime - startTime);
    }
    
    expect(testPass).toBeTruthy();
}

export const clickLoginButton = async function (page, reporter) {
    let passFail = 0; // 1 se passato, 0 se fallito
    let startTime = Date.now();
    
    await page.click('button[type="submit"]');
    let endTime = Date.now();
    
    if (reporter) {
        reporter.addStep('UC1_TC1_ID3', 'Clic sul bottone di login', 'Login effettuato con successo', testPass ? "Login effettuato con successo" : "Errore nel clic sul bottone", testPass, {}, endTime - startTime);
    }
    
    expect(testPass).toBeTruthy();
}
```

**UC1_TC1.spec.js (Test Script)**
```javascript
import { test, expect } from '@playwright/test';
import { navigateToLoginPage, fillCredentials, clickLoginButton } from './UC1_TC1.functions.js'
import TestResultReporter from '../../models/test-result-reporter.js';

const reporter = new TestResultReporter();

test("UC1_TC1 - Login con credenziali valide", async ({page, browserName}) => {
    reporter.setBrowserName(browserName);
    reporter.setTestCase('UC1_TC1', 'Login con credenziali valide');
    
    await navigateToLoginPage(page, reporter);
    await fillCredentials(page, reporter);
    await clickLoginButton(page, reporter);
    
    reporter.onTestEnd(test, { status: "passed" });
});
```

Please note that this is a revised version of the test script to meet your requirements. I have included only the necessary functions and parameters from the environment variables in the test script. Additionally, I have also added comments to clarify each step and its expected results.


"""

javascriptCodeValidator = JavascriptCodeValidator("UC1", "UC1_TC1", code)
javascriptCodeValidator.extract_code_blocks()
# javascriptCodeValidator.ensure_require_statements(dependencies, output_path)
javascriptCodeValidator.fix_import_statements()
print(javascriptCodeValidator.extracted_files)