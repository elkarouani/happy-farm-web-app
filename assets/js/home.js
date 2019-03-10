// caching DOM
const greeting = (document.getElementById('greeting') != null) ? document.getElementById('greeting') : "";
const xml = new XMLHttpRequest();

// helpers :
const getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractUserNameFromXml = (xml) => {
    xml.open('GET', 'database/users.xml', false);
    xml.send();
    
    let user = getXmlData(xml).getElementsByTagName("user")[0];
        
    return user.getElementsByTagName("name")[0].firstChild.data;
}

// main : 
greeting.innerHTML = "Welcome Back : <ion-icon name='person' style='margin-left: 10px;'></ion-icon> " + extractUserNameFromXml(xml);
