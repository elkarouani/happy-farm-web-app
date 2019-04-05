// caching DOM
let vealGroupsTable = document.getElementById("myTable");
let filterInput = document.getElementById("myInput");
let doctorSelector = document.getElementsByName("doctor");
let medicencesSelector = document.getElementsByName("medicence");
let editActions = document.getElementsByName("editStatus");
let killActions = document.getElementsByName("killStatus");
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

const extractVealsFromXml = (xml) => {
	xml = new XMLHttpRequest();
	xml.open('GET', 'database/farm.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("veal");
}

const extractDoctorsNames = (xml) => {
	xml = new XMLHttpRequest();
	xml.open('GET', 'database/veterinaires.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("veterinaire");
}

const extractMedicencesNames = (xml) => {
	xml = new XMLHttpRequest();
	xml.open('GET', 'database/stock.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("medicament");
}

const fillWithVealGroups = (veals) => {
	
	for (let i = 0; i < veals.length; i++) {
		if (veals[i].childNodes[8].firstChild.data == "true") {
			let newLine = document.createElement("tr");
			let refCell = document.createElement("td");
			let ageCell = document.createElement("td");
			let weightCell = document.createElement("td");
			let doctorCell = document.createElement("td");
			let statusCell = document.createElement("td");
			let medicenceCell = document.createElement("td");
			let actionsCell = document.createElement("td");
			
			refCell.innerHTML = veals[i].childNodes[0].firstChild.data;
			ageCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[4].firstChild.data + "' style='width: 4rem; padding: .3rem .5rem;'/>";
			weightCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[3].firstChild.data + "' style='width: 4rem; padding: .3rem .5rem;'/>";
			doctorCell.innerHTML = "<select class='form-control' name='doctor' id='doctorSelector'><option value='' selected='selected'></option></select>"
			statusCell.innerHTML = "<select class='form-control' name='status' id='statusSelector'><option value='' selected='selected'></option><option value='malade'>Malade</option><option value='sain'>Sain</option></select>";
			medicenceCell.innerHTML = "<select class='form-control' name='medicence' id='medicencesSelector' multiple='multiple'></select>";
			actionsCell.innerHTML = "" +
				"<button data-toggle='modal' data-target='#addConsultation"+i+"' class='btn btn-warning'>"+
					"<ion-icon name='create' size='small'></ion-icon>"+
				"</button><br><br>"+
				"<button name='killStatus' class='btn btn-danger'>"+
					"<ion-icon name='flame' size='small'></ion-icon>"+
				"</button>"+
				"<div class='modal fade' id='addConsultation"+i+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalCenterTitle' aria-hidden='true'>"+
					"<div class='modal-dialog modal-dialog-centered' role='document'>"+
						"<div class='modal-dialog modal-dialog-centered' role='document'>"+
							"<div class='modal-content'>"+
								"<div class='modal-body'>Voulez vraiment que cette consultation mise en application ?</div>"+
								"<div class='modal-footer d-flex justify-content-center'>"+
									"<button type='button' class='btn btn-secondary' data-dismiss='modal'>Non</button>"+
									"<button type='button' class='btn btn-primary' name='editStatus'>Oui</button>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</div>";

			newLine.append(refCell, ageCell, weightCell, doctorCell, statusCell, medicenceCell, actionsCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
}

const fillWithDoctors = (doctors) => {
	for (let i = 0; i < doctorSelector.length; i++) {
		for (let j = 0; j < doctors.length; j++) {
			let option = document.createElement("option");
			option.value = doctors[j].childNodes[3].firstChild.data;
			option.innerHTML = doctors[j].childNodes[3].firstChild.data;
			doctorSelector[i].appendChild(option);
		}
	}
}

const fillsWithMedicences = (medicences) => {
	for (let i = 0; i < medicencesSelector.length; i++) {
		for (let j = 0; j < medicences.length; j++) {
			let option = document.createElement("option");
			option.value = medicences[j].childNodes[1].firstChild.data;
			option.innerHTML = medicences[j].childNodes[1].firstChild.data;
			medicencesSelector[i].appendChild(option);
		}
	}
}

const saveConsultation = (xml, data) => {
	let medicences = [];
	for(let i = 0 ; i < data[5].firstChild.childNodes.length ; i++){
		if(data[5].firstChild.childNodes[i].selected){
			medicences[i] = data[5].firstChild.childNodes[i].value;
		}
	}
	let reference = data[0].firstChild.data;
	let age = data[1].firstChild.value;
	let poids = data[2].firstChild.value;
	let doctor = data[3].firstChild.value;
	let status = data[4].firstChild.value;
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/consultationsInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            // message.style.display = 'block';
            // message.innerHTML = xml.responseText;
            console.log(xml.responseText);
        }
    }

    xml.send("reference="+reference+"&age="+age+"&poids="+poids+"&doctor="+doctor+"&status="+status+"&medicences="+medicences+"&action=save");
}

const updateVealInfo = (xml, data, modalId) => {
	let reference = data[0].firstChild.data;
	let age = data[1].firstChild.value;
	let poids = data[2].firstChild.value;
	let status = data[4].firstChild.value;
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
        	$("#"+modalId).modal('hide');
            console.log(xml.responseText);
            message.style.display = 'block';
            message.innerHTML = "La consultation est bien envoyée";
			setTimeout(function(){
			    location.reload(); 
			}, 3000);
        }
    }

    xml.send("reference="+reference+"&age="+age+"&poids="+poids+"&status="+status+"&action=update");
}

const addToHistory = (xml, data) => {
	let reference = data[0].firstChild.data;
	let age = data[1].firstChild.value;
	let poids = data[2].firstChild.value;
	let status = "décès";
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/consultationsInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            // message.style.display = 'block';
            // message.innerHTML = xml.responseText;
            console.log(xml.responseText);
        }
    }

    xml.send("reference="+reference+"&age="+age+"&poids="+poids+"&status="+status+"&action=history");
}

const deleteVeal = (xml, data) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            // message.style.display = 'block';
            // message.innerHTML = xml.responseText;
            console.log(xml.responseText);
        }
    }
	
    xml.send("reference="+data[0].firstChild.data+"&action=delete");
}

// main : 
fillWithVealGroups(extractVealsFromXml(xml));
fillWithDoctors(extractDoctorsNames(xml));
fillsWithMedicences(extractMedicencesNames(xml));

// events : 
filterInput.addEventListener('keyup', (event) => {
	let value = filterInput.value.toUpperCase();
	let lines = vealGroupsTable.getElementsByTagName("tr");
	for (let i = 0 ; i < lines.length ; i++){
		origin = lines[i].getElementsByTagName('td')[0].firstChild.data;
		if (origin.toUpperCase().indexOf(value) > -1) {
	        lines[i].style.display = "";
	    } else {
	        lines[i].style.display = "none";
	    }
	}
})

for (let i = 0 ; i < editActions.length ; i++){
	editActions[i].addEventListener("click", () => {
		let modalId = editActions[0].parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id");
		let selectedRow = editActions[i].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes;
		saveConsultation(xml, selectedRow);
		updateVealInfo(xml, selectedRow, modalId);
	})
}

for (let i = 0 ; i < killActions.length ; i++){
	killActions[i].addEventListener("click", () => {
		let selectedRow = killActions[i].parentElement.parentElement.childNodes;
		addToHistory(xml, selectedRow);
		deleteVeal(xml, selectedRow);
	})
}