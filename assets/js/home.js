// caching DOM
const greeting = (document.getElementById('greeting') != null) ? document.getElementById('greeting') : "";
let xml = new XMLHttpRequest();

// helpers :
const getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractUserNameFromXml = (xml) => {
	xml = new XMLHttpRequest();
    xml.open('GET', 'database/users.xml', false);
    xml.send();
    
    let user = getXmlData(xml).getElementsByTagName("user")[0];
        
    return user.getElementsByTagName("name")[0].firstChild.data;
}

const checkForVealsDisponibilty = () => {
    xml = new XMLHttpRequest();
    xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.send("action=checkDesponibility");
}

const checkForTransportsExpiration = () => {
    xml = new XMLHttpRequest();
    xml.open('POST', 'api/transportInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.send("action=checkExpiration");
}

// main : 
greeting.innerHTML = "Bienvenue : <ion-icon name='person' style='margin-left: 10px;'></ion-icon> " + extractUserNameFromXml(xml);
checkForVealsDisponibilty();
checkForTransportsExpiration();
