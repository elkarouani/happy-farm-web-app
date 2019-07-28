import { getNedeedClass, getNedeedDom } from './helper.js';

let user = getNedeedClass('User');
getNedeedDom('message').style.display = 'block'; getNedeedDom('message').innerHTML = "En train de récupérer ... ";
setTimeout(() => {  
    getNedeedDom('nameInput').value = user.username;
    getNedeedDom('emailInput').value = user.email;
    getNedeedDom('passwordInput').value = user.password;
    getNedeedDom('budgetInput').value = user.budget;
    getNedeedDom('message').style.display = 'none';
}, 3000);

getNedeedDom('saveButton').addEventListener("click", (event) => { 
    let user = getNedeedClass('User');
    user.newUser({"username": getNedeedDom('nameInput').value, "email": getNedeedDom('emailInput').value, "password": getNedeedDom('passwordInput').value, "budget": getNedeedDom('budgetInput').value});
    user.updateUserInfo();
});