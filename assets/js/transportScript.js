const transportsSelection = document.getElementById('transportsSelection');
const transportTable = document.getElementById('transportTable');
const xml = new XMLHttpRequest();
let transports = null;

xml.open('GET', 'database/transports.xml', false);
xml.send();

let xmlData = xml.responseText;

if (xmlData) {
    xmlData = (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    transports = xmlData.getElementsByTagName("transport");
    for(var i = 0, length = transports.length ; i < length; i++){
    	let item = document.createElement('option');
    	item.value = transports[i].childNodes[3].firstChild.data;
    	item.innerHTML = transports[i].childNodes[3].firstChild.data;
    	transportsSelection.appendChild(item);
    }
}

transportsSelection.addEventListener('change', (event) => {
	for(var i = 0, length = transports.length ; i < length; i++){
    	let title = transports[i].childNodes[3].firstChild.data;
    	if (transportsSelection.value == title) {
			let ref = document.createElement("td");
			let title = document.createElement("td");
			let telephone = document.createElement("td");
			let adresse = document.createElement("td");
			let charge = document.createElement("td");
			let price = document.createElement("td");
			ref.innerHTML = transports[i].childNodes[1].firstChild.data;
			title.innerHTML = transports[i].childNodes[3].firstChild.data;
			telephone.innerHTML = transports[i].childNodes[5].firstChild.data;
			addresse.innerHTML = transports[i].childNodes[7].firstChild.data;
			(transportTable.childNodes[3]);
    	}
    }
})