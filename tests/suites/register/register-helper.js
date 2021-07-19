"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterHelper = void 0;
const protractor_1 = require("protractor");
const commonClass_1 = require("../../commonClass");
class RegisterHelper extends commonClass_1.CommonClass {
    constructor() {
        super();
        this.getRegisterPage = (homeUrl) => {
            this.getPage(homeUrl, "register");
        };
        this.userTypeInputSelect = (userType) => {
            protractor_1.element(protractor_1.by.name("userType")).click();
            protractor_1.element(protractor_1.by.cssContainingText("option", userType)).click();
        };
        this.setRegisterCredentials = (username, password, passwordConfirm, email, userType) => {
            this.usernameInput.sendKeys(username || "");
            this.passwordInput.sendKeys(password || "");
            this.passwordConfirmInput.sendKeys(passwordConfirm || "");
            this.emailInput.sendKeys(email || "");
            if (userType) {
                this.userTypeInputSelect(userType);
            }
        };
        this.checkRegButtonStatus = (expectedStatus) => {
            this.checkButtonStatus("regSubmit", expectedStatus);
        };
        this.clickRegSubmit = (expectedResFn) => {
            this.clickButton("regSubmit", expectedResFn);
        };
    }
}
exports.RegisterHelper = RegisterHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXItaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXItaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF5QztBQUN6QyxtREFBZ0Q7QUFFaEQsTUFBYSxjQUFlLFNBQVEseUJBQVc7SUFZN0M7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1RCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FDNUIsUUFBUSxFQUNSLFFBQVEsRUFDUixlQUFlLEVBQ2YsS0FBSyxFQUNMLFFBQVEsRUFDUixFQUFFO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBaERELHdDQWdEQyJ9