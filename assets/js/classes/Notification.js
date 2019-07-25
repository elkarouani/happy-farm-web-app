import { getNedeedClass } from "../helper.js";

export default class Notification {
    checkForVealsDisponibilty() {
        let callback = (response) => { 
            if (response.length > 0) { message1.innerHTML = response; messageBlock1.removeAttribute("hidden"); } 
        }
        getNedeedClass('XmlReader').sendRequest('api/vealInfoUpdateService.php', "action=checkDesponibility", callback);
    }

    checkForTransportsExpiration() {
        let callback = (response) => { 
            if (response.length > 0) { message2.innerHTML = response; messageBlock2.removeAttribute("hidden"); } 
        }
        getNedeedClass('XmlReader').sendRequest('api/transportInfoUpdateService.php', "action=checkExpiration", callback);
    }
}