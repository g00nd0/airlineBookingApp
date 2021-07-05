describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    browser.get("http://localhost:4200/login");
  });

  it("should login successfully", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("g00nd0");
    element(by.id("password")).sendKeys("abcd1234");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual(
          "http://localhost:4200/bookings"
        );
      });
  });

  it("should fail login, with no credentials entered", function () {
    browser.get("http://localhost:4200/login");
    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        expect(element(by.tagName("ngb-alert")).getText())
          .toContain(
            "Crendentials cannot be empty, please enter your username and password."
          )
          .then(function () {
            browser
              .switchTo()
              .alert()
              .then(
                function (alert) {
                  alert.dismiss();
                },
                function (err) {}
              );
          });
      });
  });

  it("should fail login, when entering existing username with wrong password", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("g00nd0");
    element(by.id("password")).sendKeys("thispasswordis$h!t");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Login error, please check your credentials"
        );
      });
  });

  it("shoud log out successfully", function () {
    element(by.id("username")).sendKeys("g00nd0");
    element(by.id("password")).sendKeys("abcd1234");

    element(by.xpath('//*[@id="loginSubmit"]')).click();
    browser.waitForAngular();
    element(by.xpath('//*[@id="logout"]'))
      .click()
      .then(function () {
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/");
      });
  });

  // forget password success - correct user name, password match, 8 or more chars
  it("should reset password successfully", function () {
    browser.get("http://localhost:4200/pw-reset");
    browser.waitForAngular();
    element(by.name("username")).sendKeys("g00nd0");
    element(by.name("password")).sendKeys("abcd1234");
    element(by.name("passwordConfirm")).sendKeys("abcd1234");

    element(by.xpath('//*[@id="resetSubmit"]'))
      .click()
      .then(function () {
        browser.sleep(2000);
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
      });
  });

  // forget password fail - user does not exist, password match
  it("should not reset password, for a user that does not exist", function () {
    browser.get("http://localhost:4200/pw-reset");
    browser.waitForAngular();
    element(by.name("username")).sendKeys("notauser1");
    element(by.name("password")).sendKeys("abcd1234");
    element(by.name("passwordConfirm")).sendKeys("abcd1234");

    element(by.xpath('//*[@id="resetSubmit"]'))
      .click()
      .then(function () {
        browser.sleep(2000);
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "User does not exist, please register for a new account."
        );
      });
  });

  // forget password fail - all fields blank
  it("should not reset password, for incomplete form with 1 empty field", function () {
    browser.get("http://localhost:4200/pw-reset");
    browser.waitForAngular();

    element(by.xpath('//*[@id="resetSubmit"]'))
      .click()
      .then(function () {
        browser.sleep(2000);
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Fields cannot be empty, make sure that the fields are filled in."
        );
      });
  });
});
