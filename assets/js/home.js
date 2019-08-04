import { getNedeedClass, getNedeedDom } from './helper.js';
class Home {
    constructor() {
        this._userClass = getNedeedClass('User');
        this._greetingDom = getNedeedDom('greeting');
        this._notificationClass = getNedeedClass('Notification');
    }

    get userClass() { return this._userClass; }
    get greetingDom() { return this._greetingDom; }
    get notificationClass() { return this._notificationClass; }

    printGreeting() { setTimeout( () => { this._greetingDom.innerHTML = `Bienvenue :&nbsp;&nbsp;&nbsp;<ion-icon name='person'></ion-icon> ${this._userClass.username}`; }, 4000); return this; }
    turnNotificationsOn() { setTimeout( () => { this._notificationClass.checkForVealsDisponibilty(); this._notificationClass.checkForTransportsExpiration(); }, 6000); return this; }
}

new Home().printGreeting().turnNotificationsOn();