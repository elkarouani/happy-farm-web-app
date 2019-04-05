// caching DOM
const vealGroupsTable = document.getElementById("myTable");
const foodQuantityInput = document.getElementById("foodQuantityInput");

message = document.getElementById('message');
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
};

const extractFoodInfo = (xml) => {
    xml = new XMLHttpRequest();
    xml.open('GET', 'database/stock.xml', false);
    xml.send();
    
    let nourriture = getXmlData(xml).getElementsByTagName("nourriture")[0];
    let prix = nourriture.getElementsByTagName("prix")[0].firstChild.data;
    let quantite = nourriture.getElementsByTagName("quantite")[0].firstChild.data;
    
    return new Array(prix, quantite);
}

const extractVealsFromXml = (xml) => {
	xml.open('GET', 'database/farm.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("veal");
}

const getConsultationsData = (xml) => {
	xml.open('GET', 'database/consultation.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("consultation");
	
}

const getMedicencesByVeal = (xml, reference) => {
	let consultations = getConsultationsData(xml);
	for(let i = 0 ; i < consultations.length ; i++){
		if (consultations[i].childNodes[0].firstChild.data == reference) {
			return consultations[i].childNodes[5].childNodes;
		}
	}
}

const fillTable = (veals) => {
	for (let i = 0; i < veals.length; i++) {
		if (veals[i].childNodes[9].firstChild.data == "malade") {
			let medicences = getMedicencesByVeal(xml, veals[i].childNodes[0].firstChild.data);
			
			let newLine = document.createElement("tr");
			let refCell = document.createElement("td");
			let medicencesCell = document.createElement("td");
			let quantityCell = document.createElement("td");
			let actionCell = document.createElement("td");
			let medicencesSelection = document.createElement("select");
			medicencesSelection.setAttribute("class", "form-control");

			for(let j = 0 ; j < medicences.length ; j++){
				let option = document.createElement("option");
				option.value = medicences[0].firstChild.data;
				option.innerText = medicences[0].firstChild.data;
				medicencesSelection.appendChild(option);
			}

			refCell.innerHTML = veals[i].childNodes[0].firstChild.data;
			quantityCell.innerHTML = "<input class='form-control' type='number' value='' style='width: 10rem; padding: .3rem .5rem;'/>";
			actionCell.innerHTML = "<button class='btn btn-primary'>Envoyer</button>";
			
			medicencesCell.appendChild(medicencesSelection);
			newLine.append(refCell, medicencesCell, quantityCell, actionCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
}

// main : 
fillTable(extractVealsFromXml(xml));
foodQuantityInput.setAttribute("max", extractFoodInfo(xml)[1]);
// events : 
