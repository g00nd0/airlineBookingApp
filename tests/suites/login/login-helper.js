const CommonClass = require("../../commonClass");

class LoginHelper extends CommonClass {
  constructor() {
    super();

    this.getLoginPage = (homeUrl) => {
      getPage(homeUrl, "login");
    };

    // this.getLoginPage = (homeUrl) => {
    //   browser.get(`${homeUrl}/login`);
    // };

    this.getResetPwPage = (homeUrl) => {
      browser.get(`${homeUrl}/pw-reset`);
    };

    this.setLoginCredentials = (username, password) => {
      this.usernameInput.sendKeys(username);
      this.passwordInput.sendKeys(password);
    };

    this.setResetPwDetails = (username, password, passwordConfirm) => {
      this.usernameInput.sendKeys(username);
      this.passwordInput.sendKeys(password);
      this.passwordConfirmInput.sendKeys(passwordConfirm);
    };

    // create clickLoginSubmit

    this.clickButton = (xpath, expectedResFn) => {
      element(by.xpath(xpath)).click().then(expectedResFn);
    };
  }
}

module.exports = LoginHelper;
