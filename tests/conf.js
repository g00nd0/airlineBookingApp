exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["login.js", "register.js", "bookings.js", "newUserFlow.js"],
  // specs: ["login.js"],
  onPrepare: function () {
    browser.manage().window().setSize(1280, 1024);
  },
  capabilities: {
    browserName: "chrome",
  },
};
