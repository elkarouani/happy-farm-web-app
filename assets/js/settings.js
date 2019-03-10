// caching DOM
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const budgetInput = document.getElementById("budgetInput");
const saveButton = document.getElementById("saveButton");
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractAllUserInfoFromXml = (xml) => {
    xml.open('GET', 'database/users.xml', false);
    xml.send();
    
    let user = getXmlData(xml).getElementsByTagName("user")[0];
    
    let name = user.getElementsByTagName("name")[0].firstChild.data;
    let email = user.getElementsByTagName("email")[0].firstChild.data;
    let password = user.getElementsByTagName("password")[0].firstChild.data;
    let budget = user.getElementsByTagName("budget")[0].firstChild.data;
    
    return new Array(name, email, password, budget);
}

// main : 
nameInput.value = extractAllUserInfoFromXml(xml)[0];
emailInput.value = extractAllUserInfoFromXml(xml)[1];
passwordInput.value = extractAllUserInfoFromXml(xml)[2];
budgetInput.value = extractAllUserInfoFromXml(xml)[3];