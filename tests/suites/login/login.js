"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const LoginHelper = require("./login-helper.ts");
const protractor_1 = require("protractor");
const login_helper_1 = require("./login-helper");
const loginActions = new login_helper_1.LoginHelper();
const homeUrl = "http://localhost:4200";
describe("Agent Airline Booking App", function () {
    beforeEach(function () {
        loginActions.getLoginPage(homeUrl);
    });
    it("should login successfully", function () {
        loginActions.setLoginCredentials("g00nd0", "abcd1234");
        loginActions.clickLoginSubmit(() => {
            expect(protractor_1.browser.getCurrentUrl()).toEqual(`${homeUrl}/bookings`);
        });
    });
    it("should fail login, with no credentials entered", function () {
        loginActions.clickLoginSubmit(() => {
            expect(protractor_1.element(protractor_1.by.tagName("ngb-alert")).getText()).toContain("Crendentials cannot be empty, please enter your username and password.");
        });
    });
    it("should fail login, when entering existing username with wrong password", function () {
        loginActions.setLoginCredentials("g00nd0", "thispasswordis$h!t");
        loginActions.clickLoginSubmit(() => {
            expect(protractor_1.element(protractor_1.by.tagName("ngb-alert")).getText()).toContain("Login error, please check your credentials");
        });
    });
    it("shoud log out successfully", function () {
        loginActions.setLoginCredentials("g00nd0", "abcd1234");
        loginActions.clickLoginSubmit();
        loginActions.clickLogout(() => {
            expect(protractor_1.browser.getCurrentUrl()).toEqual(`${homeUrl}/`);
        });
    });
    // forget password success - correct user name, password match, 8 or more chars
    it("should reset password successfully", function () {
        loginActions.getResetPwPage(homeUrl);
        loginActions.setResetPwDetails("g00nd0", "abcd1234", "abcd1234");
        loginActions.clickResetSubmit(() => {
            expect(protractor_1.browser.getCurrentUrl()).toEqual(`${homeUrl}/login`);
        });
    });
    // forget password fail - user does not exist, password match
    it("should not reset password, for a user that does not exist", function () {
        loginActions.getResetPwPage(homeUrl);
        loginActions.setResetPwDetails("notauser1", "abcd1234", "abcd1234");
        loginActions.clickResetSubmit(() => {
            expect(protractor_1.element(protractor_1.by.tagName("ngb-alert")).getText()).toContain("User does not exist, please register for a new account.");
        });
    });
    // forget password fail - all fields blank
    it("should not reset password, for incomplete form with 1 empty field", function () {
        loginActions.getResetPwPage(homeUrl);
        loginActions.clickResetSubmit(() => {
            expect(protractor_1.element(protractor_1.by.tagName("ngb-alert")).getText()).toContain("Fields cannot be empty, make sure that the fields are filled in.");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9EQUFvRDtBQUNwRCwyQ0FBa0Q7QUFDbEQsaURBQTZDO0FBQzdDLE1BQU0sWUFBWSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO0FBQ3ZDLE1BQU0sT0FBTyxHQUFHLHVCQUF1QixDQUFDO0FBRXhDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRTtJQUNwQyxVQUFVLENBQUM7UUFDVCxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFdkQsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtZQUNqQyxNQUFNLENBQUMsb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sV0FBVyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnREFBZ0QsRUFBRTtRQUNuRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDMUQsd0VBQXdFLENBQ3pFLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdFQUF3RSxFQUFFO1FBQzNFLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNqRSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDMUQsNENBQTRDLENBQzdDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDRCQUE0QixFQUFFO1FBQy9CLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDdkQsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDaEMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDNUIsTUFBTSxDQUFDLG9CQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCwrRUFBK0U7SUFDL0UsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtZQUNqQyxNQUFNLENBQUMsb0JBQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sUUFBUSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILDZEQUE2RDtJQUM3RCxFQUFFLENBQUMsMkRBQTJELEVBQUU7UUFDOUQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFO1lBQ2pDLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDMUQseURBQXlELENBQzFELENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsMENBQTBDO0lBQzFDLEVBQUUsQ0FBQyxtRUFBbUUsRUFBRTtRQUN0RSxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUU7WUFDakMsTUFBTSxDQUFDLG9CQUFPLENBQUMsZUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUMxRCxrRUFBa0UsQ0FDbkUsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9