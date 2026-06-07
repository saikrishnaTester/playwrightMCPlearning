// @ts-check
/**
 * BasePage - Base class for all page objects
 * Contains common methods and properties used across all pages
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.BASE_URL = 'https://parabank.parasoft.com';
  }

  /**
   * Navigate to a specific URL
   * @param {string} path - URL path to navigate to
   */
  async goto(path = '/parabank/index.htm') {
    await this.page.goto(`${this.BASE_URL}${path}`);
  }

  /**
   * Wait for page to load
   * @param {string} state - Load state (load, domcontentloaded, networkidle)
   */
  async waitForPageLoad(state = 'load') {
    await this.page.waitForLoadState(/** @type {'load'|'domcontentloaded'|'networkidle'} */(state));
  }

  /**
   * Get page content
   * @returns {Promise<string>} Page HTML content
   */
  async getPageContent() {
    return await this.page.content();
  }

  /**
   * Check if text exists on page
   * @param {string} text - Text to search for
   * @returns {Promise<boolean>} True if text exists
   */
  async isTextVisible(text) {
    const content = await this.getPageContent();
    return content.includes(text);
  }
}

// ES module export for modern Node.js
export default BasePage;
