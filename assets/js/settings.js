import { getNedeedClass } from './helper.js';

// caching DOM
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const budgetInput = document.getElementById("budgetInput");
const saveButton = document.getElementById("saveButton");
message = document.getElementById('message');
// xml = new XMLHttpRequest();

// methods : 
// getXmlData = (xml) => {
//     xmlData = xml.responseText;
//     if (xmlData) {
//         return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
//     }
//     return xmlData;
// };

const extractAllUserInfoFromXml = (xml) => {
    xml.open('GET', 'database/users.xml', false);
    xml.send();
    
    let user = getXmlData(xml).getElementsByTagName("user")[0];
    
    let name = user.getElementsByTagName("name")[0].firstChild.data;
    let email = user.getElementsByTagName("email")[0].firstChild.data;
    let password = user.getElementsByTagName("password")[0].firstChild.data;
    let budget = user.getElementsByTagName("budget")[0].firstChild.data;
    
    return new Array(name, email, password, budget);
};

const saveUserInfo = (xml) => {
    xml.open('POST', 'api/userInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            message.style.display = 'block';
            message.innerHTML = xml.responseText;
        }
    }

    xml.send("name="+nameInput.value+"&email="+emailInput.value+"&password="+passwordInput.value+"&budget="+budgetInput.value+"&action=settings");

};

// main : 
// nameInput.value = extractAllUserInfoFromXml(xml)[0];
nameInput.value = getNedeedClass('User').username;
emailInput.value = getNedeedClass('User').email;
passwordInput.value = getNedeedClass('User').password;
budgetInput.value = getNedeedClass('User').budget;

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