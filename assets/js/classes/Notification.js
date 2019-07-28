import { getNedeedClass, getNedeedDom } from "../helper.js";

export default class Notification {
    checkForVealsDisponibilty() {
        let callback = (response) => { 
            if (response.length > 0) { getNedeedDom('message1').innerHTML = response; getNedeedDom('messageBlock1').removeAttribute("hidden"); } 
        }
        getNedeedClass('XmlReader').sendRequest('api/vealInfoUpdateService.php', "action=checkDesponibility", callback);
    }

    checkForTransportsExpiration() {
        let callback = (response) => { 
            if (response.length > 0) { getNedeedDom('message2').innerHTML = response; getNedeedDom('messageBlock2').removeAttribute("hidden"); } 
        }
        getNedeedClass('XmlReader').sendRequest('api/transportInfoUpdateService.php', "action=checkExpiration", callback);
    }
}