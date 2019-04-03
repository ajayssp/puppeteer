import * as _ from "lodash";
import BasePage from "./BasePage";

const logger = require("../config/logger")(__filename);

class skyscannerLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      loginMenu: "#authentication-link",
      loginForm: "#login-modal",
      loginEmailBtn: "[data-testid='login-email-button']",
      userName: "#email",
      password: "#password",
      loginBtn: "[data-testid='login-button']"
    };
    this.defaultUserData = {
      userName: "testsample948@gmail.com",
      password: "Testsample948@123"
    };
  }

  get pageUrl() {
    logger.info("Returned base url");
    return this.url;
  }

  async gotoPage() {
    await this.page.goto(this.pageUrl, {
      waitUntil: "networkidle2"
    });
  }

  async selectLogin() {
    try {
      await this.page.waitForSelector(this.selectors.loginMenu);
      await this.page.click(this.selectors.loginMenu);
      await this.page.waitForSelector(this.selectors.loginForm);
      logger.info("Login Window Popped out");
    } catch (error) {
      logger.info(error);
    }
  }

  async enterUserDetails(userData) {
    let data = userData;
    data = _.merge(this.defaultUserData, data);
    await this.page.focus(this.selectors.loginForm);
    await this.page.click(this.selectors.loginEmailBtn);
    await this.page.type(this.selectors.userName, data.userName);
    await this.page.type(this.selectors.password, data.password);
    await this.page.click(this.selectors.loginBtn);
    await this.page.waitForSelector(this.selectors.loginForm, { hidden: true });
    logger.info("user details entered and logged in");
    return data;
  }
}

export default skyscannerLoginPage;
