import { getNedeedClass, displayDomElement, EditDomElementInnerText, DomElementValue, setEventListenerSchema } from "../../helper.js";

export default class SignIn {
    constructor() { this._userClass = getNedeedClass('User'); }

    get userClass() { return this._userClass };

    initSignInEvent() {
        let user = this.userClass;
        setEventListenerSchema({ 'save': 'click', 'emailInput': ['keyup', 13], 'passwordInput': ['keyup', 13] }, () => {
            displayDomElement('message', 'on', () => { EditDomElementInnerText('message', "En train d'accées ..."); }); 
            
            setTimeout(() => { 
                if (user.checkAccessAuthenticity(DomElementValue('emailInput'), DomElementValue('passwordInput'))) 
                { EditDomElementInnerText('message', "l'accée est succée", () => { window.location.replace("acceuil.php"); }); } 
                else { EditDomElementInnerText('message', "les informations d'accée sont incorrectes !"); } 
            }, 3000);
        });
    }
}