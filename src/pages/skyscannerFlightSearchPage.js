import * as _ from "lodash";
import BasePage from "./BasePage";

const logger = require("../config/logger")(__filename);

class skyscannerFlightSearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      sourceAirport: "#fsc-origin-search",
      destinationAirport: "#fsc-destination-search",
      searchFlightsBtn: "button[aria-label='Search flights']",
      captchaIdentifier: ".g-recaptcha"
    };
    this.defaultUserData = {
      sourceName: "Sydney",
      destinationName: "Melbourne"
    };
  }

  async flightSearch(userData) {
    let data = userData;
    data = _.merge(this.defaultUserData, data);
    await this.page.type(this.selectors.sourceAirport, data.sourceName);
    await this.page.type(
      this.selectors.destinationAirport,
      data.destinationName
    );
    await this.page.click(this.selectors.searchFlightsBtn);
    await this.page.waitForSelector(this.selectors.captchaIdentifier);
    logger.info("flight details entered and submitted");
    return data;
  }
}
export default skyscannerFlightSearchPage;
