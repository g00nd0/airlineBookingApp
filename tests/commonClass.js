"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonClass = void 0;
const protractor_1 = require("protractor");
class CommonClass {
    constructor() {
        this.usernameInput = protractor_1.element(protractor_1.by.name("username"));
        this.passwordInput = protractor_1.element(protractor_1.by.name("password"));
        this.passwordConfirmInput = protractor_1.element(protractor_1.by.name("passwordConfirm"));
        this.emailInput = protractor_1.element(protractor_1.by.name("email"));
        this.getPage = (homeUrl, pageName) => {
            protractor_1.browser.get(`${homeUrl}/${pageName}`);
        };
        this.clickButton = (elementId, expectedResFn) => {
            protractor_1.element(protractor_1.by.id(elementId)).click().then(expectedResFn);
        };
        this.checkButtonStatus = (elementId, expectedStatus) => {
            expect(protractor_1.element(protractor_1.by.id(elementId)).isEnabled()).toBe(expectedStatus);
        };
    }
}
exports.CommonClass = CommonClass;
// module.exports = CommonClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tb25DbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBaUU7QUFFakUsTUFBYSxXQUFXO0lBUXRCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLEVBQUU7WUFDbkQsb0JBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxFQUFFO1lBQzlDLG9CQUFPLENBQUMsZUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLEVBQUU7WUFDckQsTUFBTSxDQUFDLG9CQUFPLENBQUMsZUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTFCRCxrQ0EwQkM7QUFFRCxnQ0FBZ0MifQ==