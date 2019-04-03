import BrowserSetup from "../helpers/BrowserSetup";
import skyscannerLoginPage from "../pages/skyscannerLoginPage";
import skyscannerFlightSearchPage from "../pages/skyscannerFlightSearchPage";

const timeOut = 55000;
let page;
let browser;

jest.setTimeout(60000);

describe("Test skyscraper Flights Search", () => {
  beforeAll(async () => {
    browser = await BrowserSetup.setupDesktopBrowser();
    page = await BrowserSetup.newDesktopPage(browser);
  });
  test(
    "Login and Search Flights",
    async () => {
      await page.tracing.start({
        path: "./trace.json"
      });

      const login = new skyscannerLoginPage(page);
      const search = new skyscannerFlightSearchPage(page);
      await login.gotoPage();
      await login.selectLogin();
      await login.enterUserDetails();
      await search.flightSearch();

      await page.tracing.stop();
      const performanceTiming = JSON.parse(
        await page.evaluate(() => JSON.stringify(window.performance.timing))
      );
      console.log(performanceTiming);

      await page.screenshot({
        path: "./snapshot_results/flightsearch.png",
        fullPage: true
      });
    },
    timeOut
  );

  afterAll(async () => {
    await browser.close();
  });
});
