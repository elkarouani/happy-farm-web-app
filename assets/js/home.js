import { getNedeedClass, getNedeedDom } from './helper.js';

if (getNedeedDom('greeting') != null) { 
    let user = getNedeedClass('User');
    setTimeout( () => { getNedeedDom('greeting').innerHTML = `Bienvenue :&nbsp;&nbsp;&nbsp;<ion-icon name='person'></ion-icon> ${user.username}`; }, 4000);
}

setTimeout( () => { 
    getNedeedClass('Notification').checkForVealsDisponibilty();
    getNedeedClass('Notification').checkForTransportsExpiration();
}, 6000);