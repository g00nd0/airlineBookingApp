import { browser, by, element, ElementFinder } from "protractor";

export class CommonClass {
  usernameInput: ElementFinder;
  passwordInput: ElementFinder;
  passwordConfirmInput: ElementFinder;
  emailInput: ElementFinder;
  getPage: (homeUrl: string, pageName: string) => void;
  clickButton: (elementId: string, expectedResFn: any) => void;
  constructor() {
    this.usernameInput = element(by.name("username"));
    this.passwordInput = element(by.name("password"));
    this.passwordConfirmInput = element(by.name("passwordConfirm"));
    this.emailInput = element(by.name("email"));

    this.getPage = (homeUrl, pageName) => {
      browser.get(`${homeUrl}/${pageName}`);
    };

    this.clickButton = (elementId, expectedResFn) => {
      element(by.id(elementId)).click().then(expectedResFn);
    };
  }
}

// module.exports = CommonClass;
