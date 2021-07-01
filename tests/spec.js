describe("Agent Airline Booking App", function () {
  var firstNumber = element(by.model("first"));
  var secondNumber = element(by.model("second"));
  var goButton = element(by.id("gobutton"));
  var latestResult = element(by.binding("latest"));
  var history = element.all(by.repeater("result in memory"));

  function add(a, b) {
    firstNumber.sendKeys(a);
    secondNumber.sendKeys(b);
    goButton.click();
  }

  beforeEach(function () {
    browser.get("http://localhost:4200/");
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
        expect(element(by.xpath('//*[@id="welcome"]')).isPresent()).toBe(true);
        // expect();
        // element(by.xpath('//*[@id="welcome"]')).contains("Welcome, g00nd0!")
      });
  });

  it("should fail login, with no credentials entered", function () {
    browser.get("http://localhost:4200/login");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        browser.waitForAngular();

        // expect(element(by.tagName("ngb-alert")).isPresent()).toBe(true);
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Crendentials cannot be empty, please enter your username and password."
        );
      });
  });

  it("should fail login, with only username entered", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("g00nd0");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        browser.waitForAngular();

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
        browser.waitForAngular();

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
        browser.waitForAngular();

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
        browser.waitForAngular();

        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Login error, please check your credentials"
        );
      });
  });

  it("should pop up warning when entering username with less than 8 characters", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("username")).sendKeys("blah123");
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Username must be at least 8 characters long and contain no spaces."
    );
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should pop up warning when entering password with less than 8 characters", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("password")).sendKeys("lousypw");
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Password must be alphanumeric, at least 8 characters long and contain no spaces."
    );
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should pop up warning when entering password that is not alphanumeric", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("password")).sendKeys("lousypeeword");
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Password must be alphanumeric, at least 8 characters long and contain no spaces."
    );
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should have no pop up warning, submit disabled, when entering alphanumeric password only", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("password")).sendKeys("lousypeeword123");
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should pop up warning when entering invalid email format", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("email")).sendKeys("myemail@");
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Not a valid email address"
    );
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should have no pop up warning, submit disabled, when entering valid email format", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("email")).sendKeys("myemail@mail.com");
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should have submit disabled, when any field does not meet their respective requirement", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("username")).sendKeys("mym");
    element(by.id("password")).sendKeys("abcd1234");
    element(by.id("passwordVer")).sendKeys("abcd1234");
    element(by.id("email")).sendKeys("myemail@mail.com");
    element(by.tagName("option", "Individual")).click();
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should successfully register", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("username")).sendKeys("abcd1234");
    element(by.id("password")).sendKeys("abcd1234");
    element(by.id("passwordVer")).sendKeys("abcd1234");
    element(by.id("email")).sendKeys("myemail@mail.com");
    element(by.tagName("option", "Individual")).click();
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(true);

    element(by.xpath('//*[@id="regSubmit"]'))
      .click()
      .then(function () {
        browser.waitForAngular();

        // expect(element(by.tagName("ngb-alert")).getText()).toContain(
        //   "Account Created, redirecting to login page..."
        // );
        expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
      });
  });

  // it("should have a history", function () {
  //   add(1, 2);
  //   add(3, 4);

  //   expect(history.count()).toEqual(2);

  //   add(5, 6);

  //   expect(history.count()).toEqual(3); // This is wrong!
  // });

  // it("should have a history", function () {
  //   add(1, 2);
  //   add(3, 4);

  //   expect(history.last().getText()).toContain("1 + 2");
  //   expect(history.first().getText()).toContain("3 + 4"); // This is wrong!
  // });
});
