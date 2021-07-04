exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["login.js", "register.js", "bookings.js"],
  // specs: ["register.js"],
  onPrepare: function () {
    browser.manage().window().setSize(1280, 1024);
  },
};

// exports.config = {
//   framework: 'jasmine',
//   seleniumAddress: 'http://localhost:4444/wd/hub',
//   specs: ['spec.js'],
//   multiCapabilities: [{
//     browserName: 'firefox'
//   }, {
//     browserName: 'chrome'
//   }]
// }
