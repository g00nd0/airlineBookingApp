describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    browser.get("http://localhost:4200/");
  });

  it("should pop up warning when entering username with less than 8 characters", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("username")).sendKeys("blah123");
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Username must be at least 8 characters long and contain no spaces."
    );
  });

  it("should pop up warning when entering password with less than 8 characters", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("password")).sendKeys("lousypw");
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Password must be alphanumeric, at least 8 characters long and contain no spaces."
    );
  });

  it("should pop up warning when entering password that is not alphanumeric", function () {
    browser.get("http://localhost:4200/register");

    element(by.id("password")).sendKeys("lousypeeword");
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
    expect(element(by.tagName("ngb-alert")).getText()).toContain(
      "Password must be alphanumeric, at least 8 characters long and contain no spaces."
    );
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
    element(by.tagName("option", "Booking Agent")).click();
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should successfully register", function () {
    browser.get("http://localhost:4200/register");
    element(by.id("username")).sendKeys("abcd1234");
    element(by.id("password")).sendKeys("abcd1234");
    element(by.id("passwordVer")).sendKeys("abcd1234");
    element(by.id("email")).sendKeys("myemail@mail.com");
    element(by.tagName("option", "Booking Agent")).click();
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(true);
    element(by.xpath('//*[@id="regSubmit"]'))
      .click()
      .then(
        function () {
          // expect(element(by.tagName("ngb-alert")).getText()).toContain(
          //   "Account Created, redirecting to login page..."
          // );
          expect(browser.getCurrentUrl()).toEqual(
            "http://localhost:4200/login"
          );
        },
        function (err) {}
      );
  });
});
