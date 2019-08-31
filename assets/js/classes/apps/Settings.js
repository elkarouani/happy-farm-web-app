import { DomElementValue, EditDomElementInnerHtml, displayDomElement, getNedeedClass, setDomElementValue, setEventListener } from "../../helper.js";

export default class Settings {
    constructor() { this._userClass = getNedeedClass('User'); }

    get userClass() { return this._userClass };

    loadUserData () {
        let user = this.userClass;
        displayDomElement('message', 'on', () => { EditDomElementInnerHtml('message', "En train de récupérer les données ... "); })
        setTimeout(() => {  
            setDomElementValue('nameInput', user.username);
            setDomElementValue('emailInput', user.email);
            setDomElementValue('passwordInput', user.password);
            setDomElementValue('budgetInput', user.budget);
            displayDomElement('message', 'off');
        }, 5000);

        return this;
    }

    initSaveEvent () {
        let user = this.userClass;
        setEventListener('saveButton', ['click'], () => {
            user.newUser({"username": DomElementValue('nameInput'), "email": DomElementValue('emailInput'), "password": DomElementValue('passwordInput'), "budget": DomElementValue('budgetInput')});
            user.updateUserInfo();
        } )

        return this;
    }
}