class CommonClass {
  constructor() {
    this.usernameInput = element(by.name("username"));
    this.passwordInput = element(by.name("password"));
    this.passwordConfirmInput = element(by.name("passwordConfirm"));
    this.emailInput = element(by.name("email"));

    this.getPage = (homeUrl, pageName) => {
      browser.get(`${homeUrl}/${pageName}`);
    };

    this.clickButton = (xpath, expectedResFn) => {
      element(by.xpath(xpath)).click().then(expectedResFn);
    };
  }
}

module.exports = CommonClass;