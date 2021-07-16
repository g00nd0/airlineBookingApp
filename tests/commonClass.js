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
    }
}
exports.CommonClass = CommonClass;
// module.exports = CommonClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uQ2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tb25DbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBaUU7QUFFakUsTUFBYSxXQUFXO0lBT3RCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQU8sQ0FBQyxlQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNuQyxvQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLEVBQUU7WUFDOUMsb0JBQU8sQ0FBQyxlQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJCRCxrQ0FxQkM7QUFFRCxnQ0FBZ0MifQ==