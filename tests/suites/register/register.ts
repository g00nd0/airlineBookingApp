import { browser } from "protractor";
import { RegisterHelper } from "./register-helper";
const registerActions = new RegisterHelper();
const homeUrl = "http://localhost:4200";
describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    registerActions.getRegisterPage(homeUrl);
  });

  it("should pop up warning when entering username with less than 8 characters", function () {
    registerActions.setRegisterCredentials("blah123"); // only send keys to username
    registerActions.checkRegButtonStatus(false);
  });

  it("should have submit disabled, when any field does not meet their respective requirement", function () {
    registerActions.setRegisterCredentials(
      "mym",
      "abcd1234",
      "abcd1234",
      "myemail@mail.com",
      "Booking Agent"
    );
    registerActions.checkRegButtonStatus(false);
  });

  it("should successfully register", function () {
    registerActions.setRegisterCredentials(
      "abcd1234",
      "abcd1234",
      "abcd1234",
      "myemail@mail.com",
      "Booking Agent"
    );
    registerActions.checkRegButtonStatus(true);
    registerActions.clickRegSubmit(() => {
      expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
    });
  });
});
