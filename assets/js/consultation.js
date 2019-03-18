// caching DOM
let vealGroupsTable = document.getElementById("myTable");
let filterInput = document.getElementById("myInput");
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
	xml.open('GET', 'database/farm.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("veal");
}

const fillWithVealGroups = (veals) => {
	
	for (let i = 0; i < veals.length; i++) {
		if (veals[i].childNodes[7].firstChild.data == "true" && veals[i].childNodes[8].firstChild.data == "true") {
			let newLine = document.createElement("tr");
			let refCell = document.createElement("td");
			let ageCell = document.createElement("td");
			let weightCell = document.createElement("td");
			let doctorCell = document.createElement("td");
			let statusCell = document.createElement("td");
			let medicenceCell = document.createElement("td");
			let actionsCell = document.createElement("td");
			// let priceCell = document.createElement("td");
			// let choicePointerCell = document.createElement("td");
			
			refCell.innerHTML = veals[i].childNodes[0].firstChild.data;
			ageCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[4].firstChild.data + "' />";
			weightCell.innerHTML = "<input class='form-control' type='number' value='" + veals[i].childNodes[3].firstChild.data + "' />";
			doctorCell.innerHTML = "<select class='form-control' name='doctor' id='doctorSelector'><option value='' selected='selected'></option></select>"
			statusCell.innerHTML = "<select class='form-control' name='status' id='statusSelector'><option value='' selected='selected'></option><option value='sick'>Malade</option><option value='healthy'>Sain</option></select>";
			medicenceCell.innerHTML = "<select class='form-control' name='doctor' id='doctorSelector' multiple='multiple'></select>";
			actionsCell.innerHTML = "<button class='btn btn-warning'><ion-icon name='create' size='small'></ion-icon></button><br><br><button class='btn btn-danger'><ion-icon name='flame' size='small'></ion-icon></button>";
			// priceCell.innerHTML = veals[i].childNodes[5].firstChild.data;
			// choicePointerCell.innerHTML = `<input class="form-control" type="checkbox" name="choice">`;

			// newLine.append(refCell, originCell, weightCell, ageCell, priceCell, choicePointerCell);
			newLine.append(refCell, ageCell, weightCell, doctorCell, statusCell, medicenceCell, actionsCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
}

// main : 
fillWithVealGroups(extractVealsFromXml(xml));

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