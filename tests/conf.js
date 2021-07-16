"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const protractor_1 = require("protractor");
exports.config = {
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
        protractor_1.browser.manage().window().setSize(1280, 1024);
    },
    capabilities: {
        browserName: "chrome",
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTZDO0FBRWxDLFFBQUEsTUFBTSxHQUFXO0lBQzFCLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLGVBQWUsRUFBRSw4QkFBOEI7SUFDL0MsV0FBVztJQUNYLCtCQUErQjtJQUMvQixxQ0FBcUM7SUFDckMscUNBQXFDO0lBQ3JDLG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsS0FBSyxFQUFFLENBQUMseUJBQXlCLENBQUM7SUFDbEMsU0FBUyxFQUFFO1FBQ1Qsb0JBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUsUUFBUTtLQUN0QjtDQUNGLENBQUMifQ==