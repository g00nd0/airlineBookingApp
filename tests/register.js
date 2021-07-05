describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    browser.get("http://localhost:4200/register");
  });

  it("should pop up warning when entering username with less than 8 characters", function () {
    element(by.id("username"))
      .sendKeys("blah123")
      .then(function () {
        expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(
          false
        );
        // expect(element(by.tagName("ngb-alert")).getText()).toContain(
        //   "Username must be at least 8 characters long and contain no spaces."
        // );
      });
  });

  it("should have submit disabled, when any field does not meet their respective requirement", function () {
    browser.sleep(1000);
    element(by.id("username")).sendKeys("mym");
    element(by.id("password")).sendKeys("abcd1234");
    element(by.id("passwordVer")).sendKeys("abcd1234");
    element(by.id("email")).sendKeys("myemail@mail.com");
    element(by.tagName("option", "Booking Agent")).click();
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(false);
  });

  it("should successfully register", function () {
    browser.sleep(1000);
    element(by.id("username")).sendKeys("abcd1234");
    element(by.id("password")).sendKeys("abcd1234");
    element(by.id("passwordVer")).sendKeys("abcd1234");
    element(by.id("email")).sendKeys("myemail@mail.com");
    element(by.name("userType")).click();
    browser.sleep(1000);
    element(by.cssContainingText("option", "Booking Agent")).click();
    browser.sleep(1000);
    expect(element(by.xpath('//*[@id="regSubmit"]')).isEnabled()).toBe(true);
    element(by.xpath('//*[@id="regSubmit"]'))
      .click()
      .then(
        function () {
          // expect(element(by.tagName("ngb-alert")).getText()).toContain(
          //   "Account Created, redirecting to login page..."
          // );
          // test
          expect(browser.getCurrentUrl()).toEqual(
            "http://localhost:4200/login"
          );
        },
        function (err) {}
      );
  });
});
