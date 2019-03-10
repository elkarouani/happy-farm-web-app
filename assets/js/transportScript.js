// Caching DOM : 
const transportsSelection = document.getElementById('transportsSelection');
const transportTable = document.getElementById('transportTable');
const message = document.getElementById('message');
const reserveButton = document.getElementById('reserveButton');
xml = new XMLHttpRequest();
let price = 0;

// helpers :
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractTransportsFromXml = (xml) => {
	xml.open('GET', 'database/transports.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("transport");
}

const extractUserBudgetFromXml = (xml) => {
	xml.open('GET', 'database/users.xml', false);
    xml.send();

    let user = getXmlData(xml).getElementsByTagName("user")[0];

    return user.getElementsByTagName("budget")[0].firstChild.data;
}

const fillSelectInput = (transports) => {
    for(var i = 0, length = transports.length ; i < length; i++){
    	let item = document.createElement('option');
    	item.value = transports[i].childNodes[3].firstChild.data;
    	item.innerHTML = transports[i].childNodes[3].firstChild.data;
    	transportsSelection.appendChild(item);
    }
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

// Main :
let transports = extractTransportsFromXml(xml);
fillSelectInput(transports);

// Events :
transportsSelection.addEventListener('change', (event) => {
	for(var i = 0, length = transports.length ; i < length; i++){
    	let title = transports[i].childNodes[3].firstChild.data;
    	if (transportsSelection.value == title) {
			let ligne = transportTable.childNodes[3].childNodes[0]; 
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
});

reserveButton.addEventListener('click', (event) => {

	console.log(parseFloat(extractUserBudgetFromXml(xml)));
	console.log(price);
	
	if (parseFloat(extractUserBudgetFromXml(xml)) >= price) {
		message.style.display = 'block';
		message.innerHTML = "Well reserved !!!";
	} else {
		message.style.display = 'block';
		message.innerHTML = "You don't have more budget to buy this transport !!!";
	}
});