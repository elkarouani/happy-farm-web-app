import { getNedeedClass, getNedeedDom, setAttributeToDOMElement, EditDomElementInnerHtml } from "./helper.js";
// caching DOM
const vealGroupsTable = document.getElementById("myTable");
const filterInput = document.getElementById("myInput");
const demandeServe = document.getElementById("demandeServe");

let message = document.getElementById('message');
let xml = new XMLHttpRequest();

// functionality 1#
const fillWithVealGroups = () => {
	// needed classes
	let Farm = getNedeedClass('Farm');

	setTimeout( () => {
		Farm.collection.forEach((veal, index) => {
			// insert its informations in the table
			let row = getNedeedDom('myTable').insertRow(index);
			row.insertCell(0).innerHTML = veal.reference;
			row.insertCell(1).innerHTML = veal.origin;
			row.insertCell(2).innerHTML = veal.poid;
			row.insertCell(3).innerHTML = veal.age;
			row.insertCell(4).innerHTML = veal.boughtBy;
			row.insertCell(5).innerHTML = `<input class="form-control" type="checkbox" name="choice">`;
		});
	}, 1000 )
	
	setTimeout( () => { if(getNedeedDom('myTable').childNodes.length == 0) { setAttributeToDOMElement(getNedeedDom('entireTable'), 'hidden', 'hidden', EditDomElementInnerHtml('contentSection', "<div class='alert alert-dark' role='alert' style='margin: 40px 0 0 20px;'>Il n'y a pas des veaux pour les acheter encore !</div><br/><br/>")); } }, 2000 )
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
fillWithVealGroups();

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