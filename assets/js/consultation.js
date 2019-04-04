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
			ageCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[4].firstChild.data + "' />";
			weightCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[3].firstChild.data + "' />";
			doctorCell.innerHTML = "<select class='form-control' name='doctor' id='doctorSelector'><option value='' selected='selected'></option></select>"
			statusCell.innerHTML = "<select class='form-control' name='status' id='statusSelector'><option value='' selected='selected'></option><option value='sick'>Malade</option><option value='healthy'>Sain</option></select>";
			medicenceCell.innerHTML = "<select class='form-control' name='medicence' id='medicencesSelector' multiple='multiple'></select>";
			actionsCell.innerHTML = "<button name='editStatus' class='btn btn-warning'><ion-icon name='create' size='small'></ion-icon></button><br><br><button name='killStatus' class='btn btn-danger'><ion-icon name='flame' size='small'></ion-icon></button>";

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
		let selectedRow = editActions[i].parentElement.parentElement.childNodes[0].firstChild.data;
	})
}

for (let i = 0 ; i < killActions.length ; i++){
	killActions[i].addEventListener("click", () => {
		let selectedRow = killActions[i].parentElement.parentElement.childNodes[0].firstChild.data;
	})
}