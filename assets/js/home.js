// caching DOM
const greeting = (document.getElementById('greeting') != null) ? document.getElementById('greeting') : "";
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");
const messageBlock1 = document.getElementById("messageBlock1");
const messageBlock2 = document.getElementById("messageBlock2");
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

const checkForVealsDisponibilty = (xml) => {
    return new Promise((resolve, reject)=>{
        xml = new XMLHttpRequest();
        xml.open('POST', 'api/vealInfoUpdateService.php', true);
        xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xml.send("action=checkDesponibility");
        xml.onreadystatechange = () => {
            if (xml.readyState == 4 && xml.status == 200) {
                message1.innerHTML = xml.responseText;
                if (message1.innerHTML.length > 0) {messageBlock1.removeAttribute("hidden");}
                resolve(true);
            }
        }
    })
}

const checkForTransportsExpiration = (xml) => {
    xml = new XMLHttpRequest();
    xml.open('POST', 'api/transportInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.send("action=checkExpiration");
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            message2.innerHTML = xml.responseText;
            if (message2.innerHTML.length > 0) {messageBlock2.removeAttribute("hidden");}
        }
    }
}

async function loadNotifications(){
    let result = await checkForVealsDisponibilty(xml);
    if (result) {checkForTransportsExpiration(xml);}
}

// main : 
greeting.innerHTML = "Bienvenue : <ion-icon name='person' style='margin-left: 10px;'></ion-icon> " + extractUserNameFromXml(xml);
loadNotifications();