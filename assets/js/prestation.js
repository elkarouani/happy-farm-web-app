// caching DOM
const vealGroupsTable = document.getElementById("myTable");
const foodQuantityInput = document.getElementById("foodQuantityInput");
const sendFood = document.getElementById("sendFood");

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

const extractMedicencesInfo = () => {
    xml = new XMLHttpRequest();
    xml.open('GET', 'database/stock.xml', false);
    xml.send();
    
    let medicaments = getXmlData(xml).getElementsByTagName("medicament");
    
    return medicaments;
} 

const getConsultationsData = (xml) => {
	xml.open('GET', 'database/consultation.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("consultation");
	
}

const getMedicencesByVeal = (xml, reference) => {
	let consultations = getConsultationsData(xml);
	let medicences = [];
	for(let i = 0 ; i < consultations.length ; i++){
		if (consultations[i].childNodes[0].firstChild.data == reference) {
			medicences = consultations[i].childNodes[5].childNodes;
		}
	}
	return medicences;
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
			medicencesSelection.setAttribute("name", "medicencesSelection");
			let emptyOption = document.createElement("option");
			medicencesSelection.appendChild(emptyOption);

			for(let j = 0 ; j < medicences.length ; j++){
				let option = document.createElement("option");
				option.value = medicences[j].firstChild.data;
				option.innerText = medicences[j].firstChild.data;
				medicencesSelection.appendChild(option);
			}

			refCell.innerHTML = veals[i].childNodes[0].firstChild.data;
			quantityCell.innerHTML = "<input class='form-control' min='1' type='number' value='1' style='width: 10rem; padding: .3rem .5rem;'/>";
			actionCell.innerHTML = "<button class='btn btn-primary' data-toggle='modal' data-target='#sendMedicenceModal"+i+"'>Envoyer</button>"+
			"<div class='modal fade' id='sendMedicenceModal"+i+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>"+
			  "<div class='modal-dialog modal-dialog-centered' role='document'>"+
			    "<div class='modal-content text-center'>"+
			      "<div class='modal-body'>"+
			        "Vous voulez vraiment continuer cette opération ? "+
			      "</div>"+
			      "<div class='modal-footer d-flex justify-content-center'>"+
			        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Non</button>"+
			        "<button name='sendMedicence' type='button' class='btn btn-primary'>Oui</button>"+
			      "</div>"+
			    "</div>"+
			  "</div>"+
			"</div>";
			
			medicencesCell.appendChild(medicencesSelection);
			newLine.append(refCell, medicencesCell, quantityCell, actionCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
}

const getMedicenceQuantityByTitle = (xml, title) => {
	let medicences = extractMedicencesInfo(xml);
	for(let i = 0 ; i < medicences.length ; i++) {
		if (medicences[i].childNodes[1].firstChild.data == title) {
			return parseInt(medicences[i].childNodes[5].firstChild.data);
		}
	}
}

const updateFoodStock = (xml, quantity) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/stockInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        }
    }

    xml.send("quantity="+quantity+"&action=updateFoodQuantity");
}

const updateAllVealsPrice = (xml) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        	$("#sendFoodModal").modal('hide');
        	message.style.display = 'block';
            message.innerHTML = "La quantité de nouriture est bien envoyée";
            setTimeout(function(){
			    location.reload(); 
			}, 3000);
        }
    }
    xml.send("action=updateAllPrices");
}

const updateMedicencesStock = (xml, title, quantity) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/stockInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        }
    }

    xml.send("title="+title+"&quantity="+quantity+"&action=updateMedicenceQuantity");
}

const updateVealPrice = (xml, reference, modalId) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        	$("#"+modalId).modal('hide');
        	message.style.display = 'block';
            message.innerHTML = "La quantité de médicament est bien envoyée";
            setTimeout(function(){
			    location.reload(); 
			}, 3000);
        }
    }
    xml.send("reference="+reference+"&action=updateVealPrice");
}

// main : 
fillTable(extractVealsFromXml(xml));
foodQuantityInput.setAttribute("max", extractFoodInfo(xml)[1]);

// events : 
const medicencesSelector = document.getElementsByName("medicencesSelection");
for(let i = 0 ; i < medicencesSelector.length ; i++) {
	medicencesSelector[i].addEventListener("change", (event) => {
		medicencesSelector[i].parentElement.parentElement.childNodes[2].firstChild.setAttribute("max", getMedicenceQuantityByTitle(xml, medicencesSelector[i].value));
	})
}

sendFood.addEventListener('click', (event) => {
	updateFoodStock(xml, foodQuantityInput.value);
	updateAllVealsPrice(xml);
})

const sendMedicence = document.getElementsByName("sendMedicence");
for(let i = 0 ; i < sendMedicence.length ; i++) {
	sendMedicence[i].addEventListener("click", (event) => {
		let modalId = sendMedicence[i].parentElement.parentElement.parentElement.parentElement.getAttribute("id");
		let title = sendMedicence[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[1].firstChild.value;
		let quantity = sendMedicence[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[2].firstChild.value;
		let reference = sendMedicence[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].firstChild.data;
		updateMedicencesStock(xml, title, quantity);
		updateVealPrice(xml, reference, modalId);
	})
}