// caching DOM
const vealGroupsTable = document.getElementById("myTable");
const filterInput = document.getElementById("myInput");
const demandeServe = document.getElementById("demandeServe");
const entireTable = document.getElementById("entireTable");
const contentSection = document.getElementById("contentSection");

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
		if (veals[i].childNodes[7].firstChild.data == "false" && veals[i].childNodes[8].firstChild.data == "false") {
			let newLine = document.createElement("tr");
			let refCell = document.createElement("td");
			let originCell = document.createElement("td");
			let weightCell = document.createElement("td");
			let ageCell = document.createElement("td");
			let priceCell = document.createElement("td");
			let choicePointerCell = document.createElement("td");
			
			refCell.innerHTML = veals[i].childNodes[0].firstChild.data;
			originCell.innerHTML = veals[i].childNodes[2].firstChild.data;
			weightCell.innerHTML = veals[i].childNodes[3].firstChild.data;
			ageCell.innerHTML = veals[i].childNodes[4].firstChild.data;
			priceCell.innerHTML = veals[i].childNodes[5].firstChild.data;
			choicePointerCell.innerHTML = `<input class="form-control" type="checkbox" name="choice">`;

			newLine.append(refCell, originCell, weightCell, ageCell, priceCell, choicePointerCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
}

const moveOutFromQuarentaine = (xml, reference) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/vealInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            message.style.display = 'block';
            message.innerHTML = xml.responseText;
        }
    }

    xml.send("reference="+reference+"&action=moveFromDisponobility");
}

// main : 
fillWithVealGroups(extractVealsFromXml(xml));
if(vealGroupsTable.childNodes.length == 0){
	entireTable.setAttribute("hidden", "hidden");
	contentSection.innerHTML = "<div class='alert alert-dark' role='alert' style='margin: 40px 0 0 20px;'>Il n'y a pas des veaux dans la quarentaine encore !</div><br/><br/>";
}

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

demandeServe.addEventListener('click', (event) => {
	let lines = vealGroupsTable.getElementsByTagName("tr");
	for(let i = 0 ; i < lines.length ; i++){
		let choiceSelector = lines[i].lastChild.firstChild;
		if (choiceSelector.checked) {
			let reference = lines[i].childNodes[0].firstChild.data;
			moveOutFromQuarentaine(xml, reference);
		}
	}
	$('#requestModal').modal('hide');
	setTimeout(function(){
	    location.reload(); 
	}, 3000);
})