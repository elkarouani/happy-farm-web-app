import { getNedeedDom, EditDomElementInnerHtml, appendChildToDomElement, displayDomElement, setEventListener, DomElementValue, setAttributeToDOMElement, removeAttributeFromDomElement, getNedeedClass, createDomElement } from "./helper.js";

// Caching DOM : 
let xml = new XMLHttpRequest();
let price = 0;

// helpers :
const getXmlData = (xml) => {
    let xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractUserBudgetFromXml = (xml) => {
	xml.open('GET', 'database/users.xml', false);
    xml.send();

    let user = getXmlData(xml).getElementsByTagName("user")[0];

    return user.getElementsByTagName("budget")[0].firstChild.data;
}

const fillSelectInput = () => {
	let Transports = getNedeedClass('Transports'); 
	EditDomElementInnerHtml('transportsSelection', '', () => { appendChildToDomElement('transportsSelection', createDomElement('option', { value : " " })); });
	
	setTimeout(()=>{
		Transports.collection.forEach(transport => {
			if(transport.reserve == "false") { appendChildToDomElement('transportsSelection', createDomElement('option', { value: transport.title, label : transport.title })); }
		});
	}, 1000); 
}

const getTransportPrice = (transport) => {
	return transport.childNodes[11].firstChild.data;
}

const fillTable = (transports, ligne) => {
	let ref = document.createElement("td");
	let title = document.createElement("td");
	let telephone = document.createElement("td");
	let adresse = document.createElement("td");
	let charge = document.createElement("td");
	let price = document.createElement("td");
	ref.innerHTML = transports.childNodes[1].firstChild.data;
	title.innerHTML = transports.childNodes[3].firstChild.data;
	telephone.innerHTML = transports.childNodes[5].firstChild.data;
	adresse.innerHTML = transports.childNodes[7].firstChild.data;
	charge.innerHTML = transports.childNodes[9].firstChild.data;
	price.innerHTML = transports.childNodes[11].firstChild.data;
	ligne.append(ref, title, telephone, adresse, charge, price);
}

const updateUserBudget = (xml, newBudget) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/userInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
			displayDomElement('message', 'on', EditDomElementInnerHtml('message', "Well reserved"));
		}
    }

    xml.send("newBudget="+newBudget+"&action=reservation");
};

const updateTransportInfo = (xml, transport) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/transportInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
	xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
        	console.log(xml.responseText);
		}
    }
	
    xml.send("transport="+transport+"&action=reservation");
}

// Main :
// getNedeedClass('XmlReader').readData('database/transports.xml').then( (value) => { fillSelectInput(value.getElementsByTagName("transport")); })
fillSelectInput();

// Events :
setEventListener('transportsSelection', ['change'], (event) => {
	if (DomElementValue('transportsSelection') == " ") {setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled");}
	else {removeAttributeFromDomElement('reservationModalHandler', 'disabled');}
	setAttributeToDOMElement('commandZone', 'class', "row justify-content-between", 
		removeAttributeFromDomElement('transportTable', 'hidden', 
		removeAttributeFromDomElement("reserveZone", "hidden", 
		removeAttributeFromDomElement('tableTitle', "hidden", 
		removeAttributeFromDomElement("reservationModalHandler", "hidden", displayDomElement('message', 'off'))))));
	for(var i = 0, length = transports.length ; i < length; i++){
    	let title = transports[i].childNodes[3].firstChild.data;
    	if (DomElementValue('transportsSelection') == title) {
			let ligne = getNedeedDom('transportTable').childNodes[3].childNodes[0]; 
			if (ligne.innerHTML != "") {
				ligne.innerHTML = "";
				fillTable(transports[i], ligne);
				price = parseFloat(getTransportPrice(transports[i]));
			}else {
				fillTable(transports[i], ligne);
				price = parseFloat(getTransportPrice(transports[i]));
			}
    	}
    }
})

setEventListener('reserveButton', ['click'], (event) => {
	if (parseFloat(extractUserBudgetFromXml(xml)) >= price) {
		updateUserBudget(xml, (parseFloat(extractUserBudgetFromXml(xml)) - price));
		updateTransportInfo(xml,DomElementValue('transportsSelection'));
		$('#reservationModal').modal('hide');
		setAttributeToDOMElement('tableTitle', "hidden", "hidden", setAttributeToDOMElement('transportTable', "hidden", "hidden"));
		getNedeedDom('transportsSelection').childNodes[getNedeedDom('transportsSelection').selectedIndex].setAttribute("disabled", "disabled");
		getNedeedDom('transportsSelection').selectedIndex = 0;
		setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled");
	} else {
		displayDomElement('message', 'on', EditDomElementInnerHtml('message', "You don't have more budget to buy this transport"));
		event.preventDefault();
		$('#reservationModal').modal('hide');
	}
})