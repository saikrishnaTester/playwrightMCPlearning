// @ts-check
import BasePage from './BasePage.js';

/**
 * LoginPage - Page Object Model for Login functionality
 * Handles all login-related interactions and verifications
 */
class LoginPage extends BasePage {
  // Selectors
  get usernameInput() {
    return 'input[name="username"]';
  }

  get passwordInput() {
    return 'input[name="password"]';
  }

  get loginButton() {
    return 'input[value="Log In"]';
  }

  get registerLink() {
    return 'text=Register';
  }

  get accountsOverviewHeading() {
    return 'h1:has-text("Accounts Overview")';
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto('/parabank/index.htm');
  }

  /**
   * Enter username
   * @param {string} username - Username to enter
   */
  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password - Password to enter
   */
  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click Login button
   */
  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Login with username and password
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.navigateToLogin();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Click Register link
   */
  async clickRegisterLink() {
    await this.page.click(this.registerLink);
    await this.waitForPageLoad('networkidle');
  }

  /**
   * Verify login success
   * @returns {Promise<boolean>} True if login was successful
   */
  async isLoginSuccessful() {
    const locator = this.page.locator(this.accountsOverviewHeading);
    try {
      await locator.waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify Accounts Overview is visible
   * @returns {Promise<boolean>} True if Accounts Overview text exists
   */
  async isAccountsOverviewVisible() {
    return await this.isTextVisible('Accounts Overview');
  }
}

export default LoginPage;
