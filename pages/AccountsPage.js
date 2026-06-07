// @ts-check
import BasePage from './BasePage.js';

/**
 * AccountsPage - Page Object Model for Accounts functionality
 * Handles all account-related interactions and verifications
 */
class AccountsPage extends BasePage {
  // Selectors
  get accountsOverviewHeading() {
    return 'h1:has-text("Accounts Overview")';
  }

  get accountServicesText() {
    return 'text=Account Services';
  }

  get openNewAccountLink() {
    return 'a:has-text("Open New Account")';
  }

  get openNewAccountForm() {
    return 'text=Open New Account';
  }

  get accountTypeCheckingOption() {
    return 'text=CHECKING';
  }

  get transferFundsLink() {
    return 'a:has-text("Transfer Funds")';
  }

  /**
   * Verify Accounts Overview page is displayed
   * @returns {Promise<boolean>} True if Accounts Overview is visible
   */
  async isAccountsOverviewDisplayed() {
    return await this.isTextVisible('Accounts Overview');
  }

  /**
   * Verify Account Services text is visible
   * @returns {Promise<boolean>} True if Account Services is visible
   */
  async isAccountServicesVisible() {
    return await this.isTextVisible('Account Services');
  }

  /**
   * Verify both Accounts Overview and Account Services are visible
   * @returns {Promise<boolean>} True if both are visible
   */
  async isAccountsOverviewAndServicesVisible() {
    const overviewVisible = await this.isAccountsOverviewDisplayed();
    const servicesVisible = await this.isAccountServicesVisible();
    return overviewVisible && servicesVisible;
  }

  /**
   * Click on "Open New Account" link
   */
  async clickOpenNewAccountLink() {
    await this.page.click(this.openNewAccountLink);
    await this.waitForPageLoad();
  }

  /**
   * Verify Open New Account form is displayed
   * @returns {Promise<boolean>} True if Open New Account form is visible
   */
  async isOpenNewAccountFormDisplayed() {
    return await this.isTextVisible('Open New Account');
  }

  /**
   * Verify account type options are visible
   * @returns {Promise<boolean>} True if account type options are visible
   */
  async isAccountTypeOptionsVisible() {
    return await this.isTextVisible('CHECKING');
  }

  /**
   * Click on "Transfer Funds" link
   */
  async clickTransferFundsLink() {
    await this.page.click(this.transferFundsLink);
    await this.waitForPageLoad();
  }

  /**
   * Get page heading
   * @returns {Promise<string>} Page heading text
   */
  async getPageHeading() {
    const locator = this.page.locator(this.accountsOverviewHeading);
    const heading = await locator.textContent();
    return heading || '';
  }

  /**
   * Extract account number from page (simplified)
   * @returns {Promise<string>} Account information text
   */
  async getAccountInfo() {
    const content = await this.getPageContent();
    // This is a simplified method - actual implementation would parse HTML
    return content;
  }
}

export default AccountsPage;
