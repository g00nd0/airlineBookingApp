describe("Agent Airline Booking App", function () {
  beforeEach(function () {
    browser.get("http://localhost:4200/login");
    element(by.id("username")).sendKeys("g00nd0");
    element(by.id("password")).sendKeys("abcd1234");

    element(by.xpath('//*[@id="loginSubmit"]')).click();
  });

  it("should login successfully and filter desired flights ", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    expect(element(by.tagName("h2")).getText()).toBe("Flight Bookings");
    element(by.id("dateOfFlightSelect")).sendKeys("10/06/2021");
    element(by.tagName("select")).click();
    browser.sleep(1000);
    element(by.cssContainingText("option", "SilkAir")).click();

    browser.sleep(1000);

    expect(element(by.id("airline0")).getText()).toBe("SilkAir");
  });

  it("should show all flights for a selected date", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    element(by.id("dateOfFlightSelect"))
      .sendKeys("06/10/2021")
      .then(function () {});
  });

  it("should show notification when flight is selected but not date ", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    element(by.tagName("select")).click();
    browser.sleep(1000);
    element(by.cssContainingText("option", "SilkAir"))
      .click()
      .then(function () {
        browser.waitForAngular();

        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Invalid search, please input a valid airline and/or date"
        );
      });
  });

  it("should show all flights when show all is clicked ", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    element(by.id("dateOfFlightSelect")).sendKeys("10/06/2021");
    element(by.tagName("select")).click();
    browser.sleep(1000);
    element(by.cssContainingText("option", "SilkAir"))
      .click()
      .then(function () {
        browser.waitForAngular();

        element(by.id("showAll")).click();
      });
  });

  it("should book desired flights and seats", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("airline")).click();
        browser.sleep(1000);
        element(by.css("select [value='12']")).click();
        element(by.name("customerName")).sendKeys("Name of Guy");
        element(by.name("seatsToReserve")).sendKeys(5);
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

  it("should not submit when fields are empty", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            expect(element(by.tagName("ngb-alert")).getText()).toContain(
              "Error, please check your inputs."
            );
          });
      });
    // });
  });

  it("should not submit when fields are empty except Flight field", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("airline")).click();
        browser.sleep(1000);
        element(by.css("select [value='12']")).click();
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            expect(element(by.tagName("ngb-alert")).getText()).toContain(
              "Error, please check your inputs."
            );
          });
      });
    // });
  });

  it("should not submit when fields are empty except customer name field", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("customerName")).sendKeys("Name of Guy");
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            expect(element(by.tagName("ngb-alert")).getText()).toContain(
              "Error, please check your inputs."
            );
          });
      });
    // });
  });

  it("should not submit when fields are empty except customer name field", function () {
    // element(by.tagName("button"))
    //   .click()
    //   .then(function () {
    browser.sleep(1000);
    element(by.id("navBlockBookings"))
      .click()
      .then(function () {
        browser.sleep(1000);
        element(by.name("seatsToReserve")).sendKeys(5);
        element(by.xpath('//*[@id="submitCreateBooking"]'))
          .click()
          .then(function () {
            expect(element(by.tagName("ngb-alert")).getText()).toContain(
              "Error, please check your inputs."
            );
          });
      });
    // });
  });

  it("should delete when delete button is clicked", function () {
    browser.waitForAngular();
    expect(browser.getCurrentUrl()).toContain("/bookings");
    browser.sleep(2000);
    element(by.cssContainingText("button#deleteBooking4", "Delete"))
      .click()
      .then(function () {
        browser.sleep(2000);
        expect(element(by.tagName("ngb-alert")).getText()).toContain(
          "Booking Deleted"
        );
      });
  });
});
