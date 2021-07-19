import { by, element } from "protractor";
import { CommonClass } from "../../commonClass";

export class RegisterHelper extends CommonClass {
  getRegisterPage: (homeUrl: string) => void;
  setRegisterCredentials: (
    username: string,
    password?: string,
    passwordConfirm?: string,
    email?: string,
    userType?: string
  ) => void;
  userTypeInputSelect: (userType: string) => void;
  checkRegButtonStatus: (expectedStatus: boolean) => void;
  clickRegSubmit: (expectedResFn: any) => void;
  constructor() {
    super();

    this.getRegisterPage = (homeUrl) => {
      this.getPage(homeUrl, "register");
    };

    this.userTypeInputSelect = (userType) => {
      element(by.name("userType")).click();
      element(by.cssContainingText("option", userType)).click();
    };

    this.setRegisterCredentials = (
      username,
      password,
      passwordConfirm,
      email,
      userType
    ) => {
      this.usernameInput.sendKeys(username || "");
      this.passwordInput.sendKeys(password || "");
      this.passwordConfirmInput.sendKeys(passwordConfirm || "");
      this.emailInput.sendKeys(email || "");
      if (userType) {
        this.userTypeInputSelect(userType);
      }
    };

    this.checkRegButtonStatus = (expectedStatus) => {
      this.checkButtonStatus("regSubmit", expectedStatus);
    };

    this.clickRegSubmit = (expectedResFn) => {
      this.clickButton("regSubmit", expectedResFn);
    };
  }
}
