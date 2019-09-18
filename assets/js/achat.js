import { getNedeedDom, getNedeedClass, setEventListener, DomElementValue } from "./helper.js";

// caching DOM
let filterInput = getNedeedDom('myInput');
let vealGroupsTable = document.getElementById("myTable");
let addVealButton = document.getElementById("addVeal");
let message = document.getElementById('message');
let xml = new XMLHttpRequest();

// functionality #1
const fillWithVealGroups = () => {
	// classes needed :
	let Veals = getNedeedClass('Veals');
	
	setTimeout( () => {
		// for each veal in the veals collection ... 
		Veals.collection.forEach((veal, index) => {
			// if the kind of the veal is exist then ...
			if (veal.max > 0) {
				// insert its informations in the table
				let row = getNedeedDom('myTable').insertRow(index);
				row.setAttribute('id', index);				
				row.insertCell(0).innerHTML = veal.market;
				row.insertCell(1).innerHTML = veal.origin;
				row.insertCell(2).innerHTML = veal.poid;
				row.insertCell(3).innerHTML = veal.age;
				row.insertCell(4).innerHTML = veal.prix;
				let quantityCell = row.insertCell(5);
				quantityCell.innerHTML = "<input class='form-control' type='number' style='width: 4rem; padding: .3rem .5rem;' value='1' min='1' max='"+veal.max+"'>";
				quantityCell.classList.add('d-flex', 'justify-content-center');
				row.insertCell(6).innerHTML = `<input class="form-control" type="checkbox" name="choice">`;
			}
		});
	}, 1000 );
}

const insertVeal = (xml, data) => {
	for(let i = 0 ; i < data.length ; i++){
		xml = new XMLHttpRequest();
		xml.open('POST', 'api/vealInfoUpdateService.php', true);
	    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    
	    xml.onreadystatechange = () => {
	        if (xml.readyState == 4 && xml.status == 200) {
	            message.style.display = 'block';
	            message.innerHTML = xml.responseText;
	        }
	    }
	    xml.send("market="+data[i][0]+"&origin="+data[i][1]+"&weight="+data[i][2]+"&age="+data[i][3]+"&price="+data[i][4]+"&quantity="+data[i][5]+"&action=insert");
	}
}

const updateGroupInfo = (xml, data) => {
	for(let i = 0 ; i < data.length ; i++){
		xml = new XMLHttpRequest();
		xml.open('POST', 'api/groupsInfoUpdateService.php', true);
	    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xml.onreadystatechange = () => {
	        if (xml.readyState == 4 && xml.status == 200) {
	            console.log(xml.responseText);
	        }
	    }
		
	    xml.send("origin="+data[i][0]+"&quantity="+data[i][1]+"&action=afterBuying");
	}
}

const updateUserBudget = (xml, data) => {
	for(let i = 0 ; i < data.length ; i++){
		xml = new XMLHttpRequest();
		xml.open('POST', 'api/userInfoUpdateService.php', true);
	    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		
		xml.onreadystatechange = () => {
	        if (xml.readyState == 4 && xml.status == 200) {
	            console.log(xml.responseText);
	        }
	    }

	    xml.send("price="+data[i][0]+"&quantity="+data[i][1]+"&action=afterBuying");
	}
}

const getAvailableCharge = (xml) => {
	return new Promise((resolve, reject) => {
		xml = new XMLHttpRequest();
		xml.open('POST', 'api/transportInfoUpdateService.php', true);
	    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xml.onreadystatechange = () => {
	        if (xml.readyState == 4 && xml.status == 200) {
	            resolve(xml.responseText);
	        }
	    }
	    xml.send("action=afterBuying");
	});
}

// main : 
fillWithVealGroups();

// events : 
// event 1# : table filter
setEventListener('myInput', ['keyup'], (event) => { for (let line of getNedeedDom('myTable').getElementsByTagName("tr")) { line.style.display = (line.getElementsByTagName('td')[1].firstChild.data.toUpperCase().indexOf(DomElementValue('myInput').toUpperCase()) > -1) ? "" : "none"; } })

async function purchaseOperations(xml, totalWeight, vealsToInsert, originsToUpdate, priceToGive) {
	let availableCharge = await getAvailableCharge(xml);
	if (availableCharge >= totalWeight) {
		insertVeal(xml, vealsToInsert);
		updateGroupInfo(xml, originsToUpdate);
		updateUserBudget(xml, priceToGive);
		$("#purachaseModal").modal('hide');
		
		setTimeout(function(){
		    location.reload(); 
		}, 3000);
	}
	else {
		message.style.display = 'block';
	    message.innerHTML = "Transportation insuffisant";
	    $("#purachaseModal").modal('hide');
	}
}

addVealButton.addEventListener('click', (event) => {
	let lines = vealGroupsTable.getElementsByTagName("tr");
	let vealsToInsert = [];
	let originsToUpdate = [];
	let priceToGive = [];
	let totalWeight = 0;
	let reservedCharge = 0;
	let index = 0;
	for(let i = 0 ; i < lines.length ; i++){
		let choiceSelector = lines[i].lastChild.firstChild;
		if (choiceSelector.checked) {
			let market = lines[i].childNodes[0].firstChild.data;
			let origin = lines[i].childNodes[1].firstChild.data;
			let weight = lines[i].childNodes[2].firstChild.data; 
			let age = lines[i].childNodes[3].firstChild.data;
			let price = lines[i].childNodes[4].firstChild.data;
			let quantity = lines[i].childNodes[5].firstChild.value;
			
			totalWeight +=  parseInt(weight) * parseInt(quantity);
			vealsToInsert[index] = new Array(market, origin, weight, age, price, quantity);
			originsToUpdate[index] = new Array(origin, quantity);
			priceToGive[index] = new Array(price, quantity);
			index++;
		}
	}
	purchaseOperations(xml, totalWeight, vealsToInsert, originsToUpdate, priceToGive);
})

