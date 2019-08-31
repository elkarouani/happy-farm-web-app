import { getNedeedClass, displayDomElement, EditDomElementInnerText, DomElementValue, setEventListener, setEventListenerSchema } from "./helper.js";

setEventListenerSchema({ 
    'save': 'click',
    'emailInput': ['keyup', 13],
    'passwordInput': ['keyup', 13] 
}, () => {
    let user = getNedeedClass('User');
    displayDomElement('message', 'on', () => { EditDomElementInnerText('message', "En train d'accées ..."); }); 
    
    setTimeout(() => { 
        if (user.checkAccessAuthenticity(DomElementValue('emailInput'), DomElementValue('passwordInput'))) 
        { EditDomElementInnerText('message', "l'accée est succée", () => { window.location.replace("acceuil.php"); }); } 
        else { EditDomElementInnerText('message', "les informations d'accée sont incorrectes !"); } 
    }, 3000);
});