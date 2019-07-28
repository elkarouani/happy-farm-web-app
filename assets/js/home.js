import { getNedeedClass, getNedeedDom } from './helper.js';

if (getNedeedDom('greeting') != null) { 
    let user = getNedeedClass('User');
    setTimeout( () => { getNedeedDom('greeting').innerHTML = `Bienvenue : <ion-icon name='person' style='margin-left: 10px;'></ion-icon>${user.username}`; }, 4000);
}

setTimeout( () => { 
    getNedeedClass('Notification').checkForVealsDisponibilty();
    getNedeedClass('Notification').checkForTransportsExpiration();
}, 6000);