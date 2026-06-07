// @ts-check
import BasePage from './BasePage.js';

/**
 * TransferFundsPage - Page Object Model for Fund Transfer functionality
 * Handles all fund transfer-related interactions and verifications
 */
class TransferFundsPage extends BasePage {
  // Selectors
  get fromAccountDropdown() {
    return 'select[id="fromAccountId"]';
  }

  get toAccountDropdown() {
    return 'select[id="toAccountId"]';
  }

  get amountInput() {
    return 'input[id="amount"]';
  }

  get transferButton() {
    return 'input[value="Transfer"]';
  }

  get successMessage() {
    return 'text=Transfer Complete';
  }

  /**
   * Select account from dropdown
   * @param {string} selector - Dropdown selector
   * @param {string} accountValue - Account value to select
   */
  async selectAccount(selector, accountValue) {
    await this.page.selectOption(selector, accountValue);
  }

  /**
   * Select from account
   * @param {string} accountValue - From account value
   */
  async selectFromAccount(accountValue) {
    await this.selectAccount(this.fromAccountDropdown, accountValue);
  }

  /**
   * Select to account
   * @param {string} accountValue - To account value
   */
  async selectToAccount(accountValue) {
    await this.selectAccount(this.toAccountDropdown, accountValue);
  }

  /**
   * Enter transfer amount
   * @param {string} amount - Amount to transfer
   */
  async enterAmount(amount) {
    await this.page.fill(this.amountInput, amount);
  }

  /**
   * Click Transfer button
   */
  async clickTransferButton() {
    await this.page.click(this.transferButton);
    await this.waitForPageLoad();
  }

  /**
   * Transfer funds between accounts
   * @param {string} fromAccount - From account ID
   * @param {string} toAccount - To account ID
   * @param {string} amount - Amount to transfer
   */
  async transferFunds(fromAccount, toAccount, amount) {
    await this.selectFromAccount(fromAccount);
    await this.selectToAccount(toAccount);
    await this.enterAmount(amount);
    await this.clickTransferButton();
  }

  /**
   * Verify transfer success
   * @returns {Promise<boolean>} True if transfer was successful
   */
  async isTransferSuccessful() {
    const locator = this.page.locator(this.successMessage);
    try {
      await locator.waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if success message is visible
   * @returns {Promise<boolean>} True if success message exists
   */
  async isSuccessMessageVisible() {
    return await this.isTextVisible('Transfer Complete');
  }
}

export default TransferFundsPage;
