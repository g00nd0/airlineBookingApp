"use strict";
// const CommonClass = require("../../commonClass.ts");
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginHelper = void 0;
const commonClass_1 = require("../../commonClass");
class LoginHelper extends commonClass_1.CommonClass {
    constructor() {
        super();
        this.getLoginPage = (homeUrl) => {
            this.getPage(homeUrl, "login");
        };
        this.getResetPwPage = (homeUrl) => {
            this.getPage(homeUrl, "pw-reset");
        };
        this.setLoginCredentials = (username, password) => {
            this.usernameInput.sendKeys(username);
            this.passwordInput.sendKeys(password);
        };
        this.setResetPwDetails = (username, password, passwordConfirm) => {
            this.usernameInput.sendKeys(username);
            this.passwordInput.sendKeys(password);
            this.passwordConfirmInput.sendKeys(passwordConfirm);
        };
        this.clickLoginSubmit = (expectedResFn) => {
            this.clickButton("loginSubmit", expectedResFn);
        };
        this.clickLogout = (expectedResFn) => {
            this.clickButton("logout", expectedResFn);
        };
        this.clickResetSubmit = (expectedResFn) => {
            this.clickButton("resetSubmit", expectedResFn);
        };
    }
}
exports.LoginHelper = LoginHelper;
// module.exports = LoginHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4taGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1REFBdUQ7OztBQUV2RCxtREFBZ0Q7QUFFaEQsTUFBYSxXQUFZLFNBQVEseUJBQVc7SUFZMUM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBOUNELGtDQThDQztBQUVELGdDQUFnQyJ9