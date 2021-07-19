"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const register_helper_1 = require("./register-helper");
const registerActions = new register_helper_1.RegisterHelper();
const homeUrl = "http://localhost:4200";
describe("Agent Airline Booking App", function () {
    beforeEach(function () {
        registerActions.getRegisterPage(homeUrl);
    });
    it("should pop up warning when entering username with less than 8 characters", function () {
        registerActions.setRegisterCredentials("blah123"); // only send keys to username
        registerActions.checkRegButtonStatus(false);
    });
    it("should have submit disabled, when any field does not meet their respective requirement", function () {
        registerActions.setRegisterCredentials("mym", "abcd1234", "abcd1234", "myemail@mail.com", "Booking Agent");
        registerActions.checkRegButtonStatus(false);
    });
    it("should successfully register", function () {
        registerActions.setRegisterCredentials("abcd1234", "abcd1234", "abcd1234", "myemail@mail.com", "Booking Agent");
        registerActions.checkRegButtonStatus(true);
        registerActions.clickRegSubmit(() => {
            expect(protractor_1.browser.getCurrentUrl()).toEqual("http://localhost:4200/login");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFxQztBQUNyQyx1REFBbUQ7QUFDbkQsTUFBTSxlQUFlLEdBQUcsSUFBSSxnQ0FBYyxFQUFFLENBQUM7QUFDN0MsTUFBTSxPQUFPLEdBQUcsdUJBQXVCLENBQUM7QUFDeEMsUUFBUSxDQUFDLDJCQUEyQixFQUFFO0lBQ3BDLFVBQVUsQ0FBQztRQUNULGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEVBQTBFLEVBQUU7UUFDN0UsZUFBZSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsNkJBQTZCO1FBQ2hGLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3RkFBd0YsRUFBRTtRQUMzRixlQUFlLENBQUMsc0JBQXNCLENBQ3BDLEtBQUssRUFDTCxVQUFVLEVBQ1YsVUFBVSxFQUNWLGtCQUFrQixFQUNsQixlQUFlLENBQ2hCLENBQUM7UUFDRixlQUFlLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsOEJBQThCLEVBQUU7UUFDakMsZUFBZSxDQUFDLHNCQUFzQixDQUNwQyxVQUFVLEVBQ1YsVUFBVSxFQUNWLFVBQVUsRUFDVixrQkFBa0IsRUFDbEIsZUFBZSxDQUNoQixDQUFDO1FBQ0YsZUFBZSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLGVBQWUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxvQkFBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=