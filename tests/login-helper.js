class userLogin {
  constructor() {
    this.usernameInput = element(by.name("username"));
    this.passwordInput = element(by.name("password"));
    this.passwordConfirmInput = element(by.name("passwordConfirm"));

    this.getLoginPage = (homeUrl) => {
      browser.get(`${homeUrl}/login`);
    };

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

    this.clickButton = (xpath, expectedResFn) => {
      element(by.xpath(xpath)).click().then(expectedResFn);
    };
  }
}

module.exports = userLogin;
