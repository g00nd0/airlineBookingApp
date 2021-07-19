"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
exports.config = {
    framework: "jasmine",
    seleniumAddress: "http://localhost:4444/wd/hub",
    specs: [
        "./suites/login/login.js",
        "./suites/register/register.js",
        // "./suites/bookings/bookings.js",
        // "./suites/e2e/newUserFlow.js",
    ],
    // specs: ["./suites/login/login.js"],
    onPrepare: function () {
        protractor_1.browser.manage().window().setSize(1280, 1024);
    },
    capabilities: {
        browserName: "chrome",
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTZDO0FBRWxDLFFBQUEsTUFBTSxHQUFXO0lBQzFCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLGVBQWUsRUFBRSw4QkFBOEI7SUFDL0MsS0FBSyxFQUFFO1FBQ0wseUJBQXlCO1FBQ3pCLCtCQUErQjtRQUMvQixtQ0FBbUM7UUFDbkMsaUNBQWlDO0tBQ2xDO0lBQ0Qsc0NBQXNDO0lBQ3RDLFNBQVMsRUFBRTtRQUNULG9CQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsWUFBWSxFQUFFO1FBQ1osV0FBVyxFQUFFLFFBQVE7S0FDdEI7Q0FDRixDQUFDIn0=