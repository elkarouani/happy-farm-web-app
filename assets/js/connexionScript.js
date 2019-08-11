import { getNedeedClass, getNedeedDom } from "./helper.js";

getNedeedDom('save').addEventListener('click', (event) => {
    let user = getNedeedClass('User');
    getNedeedDom('message').style.display = "block"; getNedeedDom('message').innerText = "En train d'accées ...";
    setTimeout(() => { if (user.email == getNedeedDom('emailInput').value && user.password == getNedeedDom('passwordInput').value) { getNedeedDom('message').innerText = "l'accée est succée"; window.location.replace("acceuil.php"); } else { getNedeedDom('message').innerText = "les informations d'accée sont incorrectes !"; } }, 3000);
});
