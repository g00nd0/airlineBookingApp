import { browser, element, by } from "protractor";
import { LoginHelper } from "./login-helper";
const loginActions = new LoginHelper();
const homeUrl = "http://localhost:4200";

describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    loginActions.getLoginPage(homeUrl);
  });

  it("should login successfully", function () {
    loginActions.setLoginCredentials("g00nd0", "abcd1234");

    loginActions.clickLoginSubmit(() => {
      expect(browser.getCurrentUrl()).toEqual(`${homeUrl}/bookings`);
    });
  });

  it("should fail login, with no credentials entered", function () {
    loginActions.clickLoginSubmit(() => {
      expect(element(by.tagName("ngb-alert")).getText()).toContain(
        "Crendentials cannot be empty, please enter your username and password."
      );
    });
  });

  it("should fail login, when entering existing username with wrong password", function () {
    loginActions.setLoginCredentials("g00nd0", "thispasswordis$h!t");
    loginActions.clickLoginSubmit(() => {
      expect(element(by.tagName("ngb-alert")).getText()).toContain(
        "Login error, please check your credentials"
      );
    });
  });

  it("shoud log out successfully", function () {
    loginActions.setLoginCredentials("g00nd0", "abcd1234");
    loginActions.clickLoginSubmit();
    loginActions.clickLogout(() => {
      expect(browser.getCurrentUrl()).toEqual(`${homeUrl}/`);
    });
  });

  // forget password success - correct user name, password match, 8 or more chars
  it("should reset password successfully", function () {
    loginActions.getResetPwPage(homeUrl);
    loginActions.setResetPwDetails("g00nd0", "abcd1234", "abcd1234");
    loginActions.clickResetSubmit(() => {
      expect(browser.getCurrentUrl()).toEqual(`${homeUrl}/login`);
    });
  });

  // forget password fail - user does not exist, password match
  it("should not reset password, for a user that does not exist", function () {
    loginActions.getResetPwPage(homeUrl);
    loginActions.setResetPwDetails("notauser1", "abcd1234", "abcd1234");
    loginActions.clickResetSubmit(() => {
      expect(element(by.tagName("ngb-alert")).getText()).toContain(
        "User does not exist, please register for a new account."
      );
    });
  });

  // forget password fail - all fields blank
  it("should not reset password, for incomplete form with 1 empty field", function () {
    loginActions.getResetPwPage(homeUrl);
    loginActions.clickResetSubmit(() => {
      expect(element(by.tagName("ngb-alert")).getText()).toContain(
        "Fields cannot be empty, make sure that the fields are filled in."
      );
    });
  });
});
