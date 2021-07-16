import { browser, Config } from "protractor";

export let config: Config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  // specs: [
  //   "./suites/login/login.js",
  //   "./suites/register/register.js",
  //   "./suites/bookings/bookings.js",
  //   "./suites/e2e/newUserFlow.js",
  // ],
  specs: ["./suites/login/login.js"],
  onPrepare: function () {
    browser.manage().window().setSize(1280, 1024);
  },
  capabilities: {
    browserName: "chrome",
  },
};
