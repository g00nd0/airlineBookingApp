describe("Agent Airline Booking App", function () {
  beforeAll(function () {
    browser.get("http://localhost:4200/");
  });

  //register
  it("should successfully register", function () {
    browser.get("http://localhost:4200/register");
    element(by.id("username")).sendKeys("newuser1234");
    element(by.id("password")).sendKeys("password1234");
    element(by.id("passwordVer")).sendKeys("password1234");
    element(by.id("email")).sendKeys("somemail@mail.com");
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
          expect(browser.getCurrentUrl()).toEqual(
            "http://localhost:4200/login"
          );
        },
        function (err) {}
      );
  });

  //forgot pw
  it("should reset password successfully", function () {
    browser.get("http://localhost:4200/pw-reset");
    browser.waitForAngular();
    element(by.name("username")).sendKeys("newuser1234");
    element(by.name("password")).sendKeys("simple1234");
    element(by.name("passwordConfirm")).sendKeys("simple1234");

    element(by.xpath('//*[@id="resetSubmit"]'))
      .click()
      .then(function () {
        browser.sleep(2000);
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
      });
  });

  //login page
  it("should login successfully", function () {
    browser.get("http://localhost:4200/login");

    element(by.id("username")).sendKeys("newuser1234");
    element(by.id("password")).sendKeys("simple1234");

    element(by.xpath('//*[@id="loginSubmit"]'))
      .click()
      .then(function () {
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual(
          "http://localhost:4200/bookings"
        );
      });
  });

  //bookings -> block bookings
  it("should book desired flights and seats", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.waitForAngular();
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("airline")).click();
        browser.sleep(1000);
        element(by.css("select [value='12']")).click();
        element(by.name("customerName")).sendKeys("Some Fellow");
        element(by.name("seatsToReserve")).sendKeys(3);
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(
              "http://localhost:4200/bookings"
            );
          });
      });
    // });
  });

  // bookings -> block bookings (one more round with diff flight)
  it("should book desired flights and seats", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.waitForAngular();
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("airline")).click();
        browser.sleep(1000);
        element(by.css("select [value='11']")).click();
        element(by.name("customerName")).sendKeys("Guy McPerson");
        element(by.name("seatsToReserve")).sendKeys(3);
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toEqual(
              "http://localhost:4200/bookings"
            );
          });
      });
    // });
  });

  // filter -> date, airline
  it("should login successfully and filter desired flights ", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    expect(element(by.tagName("h2")).getText()).toBe("Flight Bookings");
    element(by.id("dateOfFlightSelect")).sendKeys("13/08/2021");
    element(by.tagName("select")).click();
    browser.sleep(1000);
    element(by.cssContainingText("option", "SilkAir")).click();

    browser.sleep(1000);

    expect(element(by.id("airline0")).isPresent()).toBe(true);
    expect(element(by.id("airline0")).getText()).toBe("SilkAir");
    expect(element(by.id("dateOfFlight0")).getText()).toBe("13/08/2021");
  });

  // show all
  it("should show all flights when show all is clicked ", function () {
    element(by.id("showAll"))
      .click()
      .then(function () {
        browser.sleep(1000);
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Filters have been reset."
        );
      });
  });

  // confirm booking
  it("should confirm when confirm button is clicked", function () {
    browser.waitForAngular();
    element(by.id("navBookings"))
      .click()
      .then(function () {
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toContain("/bookings");

        element(by.id("confirmBooking3"))
          .getLocation()
          .then(function (location) {
            return browser.executeScript(
              `window.scrollTo(${location.x},${location.y});`
            );
          });
      });

    browser.sleep(2000);
    // browser.actions()
    element(by.id("confirmBooking3"))
      .click()
      .then(function () {
        browser.sleep(2000);
        // browser.actions().sendKeys(protractor.Key.END).perform();
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Booking Confirmed"
        );
      });
  });

  //delete booking
  it("should delete when delete button is clicked", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");

    // element(by.id("navBookings"))
    //   .click()
    //   .then(function () {

    //   })
    browser.sleep(1000);
    element(by.id("deleteBooking2"))
      .getLocation()
      .then(function (location) {
        return browser.executeScript(
          `window.scrollTo(${location.x},${location.y});`
        );
      });
    browser.sleep(2000);
    element(by.id("deleteBooking2"))
      .click()
      .then(function () {
        browser.sleep(2000);
        // browser.actions().sendKeys(protractor.Key.END).perform();
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Booking Deleted"
        );
      });
  });

  // logout
  it("shoud log out successfully", function () {
    browser.waitForAngular();
    element(by.id("logout"))
      .getLocation()
      .then(function (location) {
        return browser.executeScript(
          `window.scrollTo(${location.x},${location.y});`
        );
      });
    browser.sleep(2000);
    element(by.xpath('//*[@id="logout"]'))
      .click()
      .then(function () {
        browser.waitForAngular();
        expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/");
      });
  });
});
