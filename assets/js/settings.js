import { getNedeedClass } from './helper.js';

// caching DOM
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const budgetInput = document.getElementById("budgetInput");
const saveButton = document.getElementById("saveButton");
message = document.getElementById('message');

// main : 
let user = getNedeedClass('User');
message.style.display = 'block'; message.innerHTML = "En train de récupérer ... ";
setTimeout(() => {  
    nameInput.value = user.username;
    emailInput.value = user.email;
    passwordInput.value = user.password;
    budgetInput.value = user.budget;
    message.style.display = 'none';
}, 3000);

// events : 
saveButton.addEventListener("click", (event) => { 
    let user = getNedeedClass('User');
    user.newUser({"username": nameInput.value, "email": emailInput.value, "password": passwordInput.value, "budget": budgetInput.value});
    user.username = nameInput.value;
    user.email = emailInput.value;
    user.password = passwordInput.value;
    user.budget = budgetInput.value;
    user.updateUserInfo();
});