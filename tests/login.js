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

  it("should fail login, with only username entered", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("g00nd0");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Crendentials cannot be empty, please enter your username and password."
        );
      });
  });

  it("should fail login, with only password entered", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("password")).sendKeys("oajroiuh23riouh2");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Crendentials cannot be empty, please enter your username and password."
        );
      });
  });

  it("should fail login, when entering non-existent username", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("idontexist42069");
    element(by.id("password")).sendKeys("thispasswordis$h!t");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Login Error, user does not exist, please register for a new account."
        );
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
});
