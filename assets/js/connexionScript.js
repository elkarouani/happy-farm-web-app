import { getNedeedClass, displayDomElement, EditDomElementInnerText, DomElementValue, setEventListener } from "./helper.js";

setEventListener('save', 'click', () => {
    let user = getNedeedClass('User');
    displayDomElement('message', 'on', () => { EditDomElementInnerText('message', "En train d'accées ..."); }); 
    
    setTimeout(() => { 
        if (user.checkAccessAuthenticity(DomElementValue('emailInput'), DomElementValue('passwordInput'))) 
        { EditDomElementInnerText('message', "l'accée est succée", () => { window.location.replace("acceuil.php"); }); } 
        else { EditDomElementInnerText('message', "les informations d'accée sont incorrectes !"); } 
    }, 3000);
})