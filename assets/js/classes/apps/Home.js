import { EditDomElementInnerHtml, getNedeedClass } from "../../helper.js";

export default class Home {
    constructor() {
        this._userClass = getNedeedClass('User');
        this._notificationClass = getNedeedClass('Notification');
    }

    get userClass() { return this._userClass; }
    get notificationClass() { return this._notificationClass; }

    printGreeting() { setTimeout( () => { EditDomElementInnerHtml('greeting', `Bienvenue :&nbsp;&nbsp;&nbsp;<ion-icon name='person'></ion-icon> ${this.userClass.username}`) }, 4000); return this; }
    
    turnNotificationsOn() { setTimeout( () => { this.notificationClass.checkForVealsDisponibilty(); this.notificationClass.checkForTransportsExpiration(); }, 6000); return this; }
}