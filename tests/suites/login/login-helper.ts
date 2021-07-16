// const CommonClass = require("../../commonClass.ts");

import { CommonClass } from "../../commonClass";

export class LoginHelper extends CommonClass {
  getLoginPage: (homeUrl: string) => void;
  getResetPwPage: (homeUrl: string) => void;
  setLoginCredentials: (username: string, password: string) => void;
  setResetPwDetails: (
    username: string,
    password: string,
    passwordConfirm: string
  ) => void;
  clickLoginSubmit: (expectedResFn?: any) => void;
  clickLogout: (expectedResFn?: any) => void;
  clickResetSubmit: (expectedResFn?: any) => void;
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

// module.exports = LoginHelper;
