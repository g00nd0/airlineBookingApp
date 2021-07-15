const CommonClass = require("../../commonClass");

class LoginHelper extends CommonClass {
  constructor() {
    super();

    this.getLoginPage = (homeUrl) => {
      this.getPage(homeUrl, "login");
    };

    this.getResetPwPage = (homeUrl) => {
      this.getPage(homeUrl, "pw-reset");
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
    this.clickLoginSubmit = (expectedResFn) => {
      this.clickButton("loginSubmit", expectedResFn);
    };

    this.clickLogout = (expectedResFn) => {
      this.clickButton("logout", expectedResFn);
    };

    this.clickResetSubmit = (expectedResFn) => {
      this.clickButton("resetSubmit", expectedResFn);
    };
  }
}

module.exports = LoginHelper;
