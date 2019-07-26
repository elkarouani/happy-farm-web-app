import { getNedeedClass } from './helper.js';

// caching DOM
const greeting = (document.getElementById('greeting') != null) ? document.getElementById('greeting') : null;
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");
const messageBlock1 = document.getElementById("messageBlock1");
const messageBlock2 = document.getElementById("messageBlock2");

// main : 
if (greeting != null) { 
    greeting.innerHTML = `Bienvenue : <ion-icon name='person' style='margin-left: 10px;'></ion-icon>${getNedeedClass('User').username}`; 
}
getNedeedClass('Notification').checkForVealsDisponibilty();
getNedeedClass('Notification').checkForTransportsExpiration();