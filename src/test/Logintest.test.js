import BrowserSetup from "../helpers/BrowserSetup";
import skyscannerLoginPage from "../pages/skyscannerLoginPage";

const timeOut = 55000;
let page;
let browser;

jest.setTimeout(60000);

describe("Test skyscraper UI Login", () => {
  beforeAll(async () => {
    browser = await BrowserSetup.setupDesktopBrowser();
    page = await BrowserSetup.newDesktopPage(browser);
  });

  test(
    "Should navigate to the login page and login as a user",
    async () => {
      await page.tracing.start({
        path: "./trace.json"
      });

      const login = new skyscannerLoginPage(page);
      await login.gotoPage();
      await login.selectLogin();
      await login.enterUserDetails();

      await page.tracing.stop();
      const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
      );
      console.log(performanceTiming);

      await page.screenshot({
        path: "./snapshot_results/login.png",
        fullPage: true
      });
    },
    timeOut
  );

  afterAll(async () => {
    await browser.close();
  });
});
