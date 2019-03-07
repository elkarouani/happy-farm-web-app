let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");
let save = document.getElementById("save");
let messageOutput = document.getElementById("message");
let email = "";
let password = "";

let xml = new XMLHttpRequest();

xml.open('GET', 'database/users.xml', false);
xml.send();

let xmlData = xml.responseText;
if (xmlData) {
    xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    let user = xmlData.getElementsByTagName("user")[0];
    email = user.getElementsByTagName("email")[0].firstChild.data;
    password = user.getElementsByTagName("password")[0].firstChild.data;
}

save.addEventListener('click', (event) => {
    if (email == emailInput.value && password == passwordInput.value) {
        messageOutput.style.display = 'block';
        messageOutput.innerHTML = "Welcome !!!";
    }
});
