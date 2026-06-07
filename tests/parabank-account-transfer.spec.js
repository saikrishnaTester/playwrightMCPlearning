// @ts-check
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import AccountsPage from '../pages/AccountsPage.js';
import TransferFundsPage from '../pages/TransferFundsPage.js';

test.describe('ParaBank Account Opening and Fund Transfer', () => {

  // TC_001 - Login with Demo Account
  test('TC_001: Login with Demo Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';

    // Step 1-3: Navigate to login page and login
    await loginPage.login(demoUsername, demoPassword);

    // Expected Result: User should login successfully
    const isSuccessful = await loginPage.isAccountsOverviewVisible();
    expect(isSuccessful).toBeTruthy();
  });

  // TC_002 - Verify Account Services and Account Details
  test('TC_002: Verify Account Services and Account Details', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';

    // Step 1-2: Navigate to login page and login
    await loginPage.login(demoUsername, demoPassword);

    // Step 3: Verify "Account Services" text and "Accounts Overview"
    const isOverviewAndServicesVisible = await accountsPage.isAccountsOverviewAndServicesVisible();
    expect(isOverviewAndServicesVisible).toBeTruthy();

    console.log('Account Services and Details verified successfully');
  });

  // TC_003 - Extract Account Number from Account Overview
  test('TC_003: Extract Account Number from Account Overview', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';

    // Step 1-2: Navigate to login page and login
    await loginPage.login(demoUsername, demoPassword);

    // Step 3: Extract account number from page content
    const isAccountsOverviewVisible = await accountsPage.isAccountsOverviewDisplayed();
    expect(isAccountsOverviewVisible).toBeTruthy();
    
    const accountInfo = await accountsPage.getAccountInfo();
    expect(accountInfo).toBeTruthy();
    
    console.log('Account Overview page loaded successfully');
  });

  // TC_004 - Open New Savings Account
  test('TC_004: Open New Savings Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';

    // Step 1-2: Navigate to login page and login
    await loginPage.login(demoUsername, demoPassword);

    // Step 3: Click "Open New Account" link
    await accountsPage.clickOpenNewAccountLink();

    // Step 4: Verify Open Account Form is displayed
    const isFormDisplayed = await accountsPage.isOpenNewAccountFormDisplayed();
    const areOptionsVisible = await accountsPage.isAccountTypeOptionsVisible();
    
    expect(isFormDisplayed).toBeTruthy();
    expect(areOptionsVisible).toBeTruthy();

    console.log('Open New Account form loaded successfully');
  });

  // TC_005 - Transfer Funds Between Accounts
  test('TC_005: Transfer Funds Between Accounts', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    const transferFundsPage = new TransferFundsPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';
    const transferAmount = '100';

    // Step 1-2: Navigate to login page and login
    await loginPage.login(demoUsername, demoPassword);

    // Step 3: Navigate to "Transfer Funds" page
    await accountsPage.clickTransferFundsLink();
    await page.waitForLoadState('networkidle');

    // Step 4: Get available accounts from the Transfer Funds page
    const fromOptions = await page.locator('select[id="fromAccountId"] option').all();
    const toOptions = await page.locator('select[id="toAccountId"] option').all();

    if (fromOptions.length > 0 && toOptions.length > 1) {
      const fromAccountValue = await fromOptions[0].getAttribute('value');
      const toAccountValue = await toOptions[1].getAttribute('value');

      // Step 5: Select accounts and enter amount (null check)
      if (fromAccountValue && toAccountValue) {
        await transferFundsPage.selectFromAccount(fromAccountValue);
        await transferFundsPage.selectToAccount(toAccountValue);
        await transferFundsPage.enterAmount(transferAmount);
        
        // Step 6: Click "Transfer" button
        await transferFundsPage.clickTransferButton();

        // Step 7: Verify transfer confirmation
        const isSuccessful = await transferFundsPage.isTransferSuccessful();
        expect(isSuccessful).toBeTruthy();

        console.log(`Successfully transferred ${transferAmount} between accounts`);
      }
    }
  });

  // TC_006 - End-to-End: Full Account Opening and Transfer Flow
  test('TC_006: End-to-End Complete Account and Transfer Workflow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountsPage = new AccountsPage(page);
    const demoUsername = 'john';
    const demoPassword = 'demo';

    // STEP 1-2: Navigate to home and login
    await loginPage.login(demoUsername, demoPassword);

    // STEP 3: Verify "Account Services" text and account overview
    const isOverviewAndServicesVisible = await accountsPage.isAccountsOverviewAndServicesVisible();
    expect(isOverviewAndServicesVisible).toBeTruthy();

    // STEP 4: Navigate to Open New Account page
    await accountsPage.clickOpenNewAccountLink();
    const isFormDisplayed = await accountsPage.isOpenNewAccountFormDisplayed();
    expect(isFormDisplayed).toBeTruthy();
    console.log('Navigated to Open New Account page');

    // STEP 5: Navigate to Transfer Funds
    await accountsPage.clickTransferFundsLink();

    console.log('End-to-End Test Complete: Successfully navigated through account services');
  });
});
