const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const save = document.getElementById("save");
const messageOutput = document.getElementById("message");
const xml = new XMLHttpRequest();

const getXmlData = (xml) => {
    let xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractUserInfoFromXml = (xml) => {
    xml.open('GET', 'database/users.xml', false);
    xml.send();
    
    let user = getXmlData(xml).getElementsByTagName("user")[0];
    
    let email = user.getElementsByTagName("email")[0].firstChild.data;
    let password = user.getElementsByTagName("password")[0].firstChild.data;
    
    return new Array(email, password);
}

save.addEventListener('click', (event) => {
    let data = extractUserInfoFromXml(xml);
    if (data[0] == emailInput.value && data[1] == passwordInput.value) {
        messageOutput.style.display = 'block';
        messageOutput.innerHTML = "Welcome !!!";
    }
});
