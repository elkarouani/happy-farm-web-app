// caching DOM
let filterInput = document.getElementById("myInput");
let vealGroupsTable = document.getElementById("myTable");
let addVealButton = document.getElementById("addVeal");
message = document.getElementById('message');
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    let xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
};

const extractVealGroupsFromXml = (xml) => {
	xml.open('GET', 'database/vealsGroups.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("group");
}

const fillWithVealGroups = (groups) => {
	for (let i = 0; i < groups.length; i++) {
		if (parseInt(groups[i].childNodes[11].firstChild.data) > 0) {
			let newLine = document.createElement("tr");
			let marketCell = document.createElement("td");
			let originCell = document.createElement("td");
			let weightCell = document.createElement("td");
			let ageCell = document.createElement("td");
			let priceCell = document.createElement("td");
			let quantityCell = document.createElement("td");
			let choicePointerCell = document.createElement("td");
			
			newLine.id = i;
			marketCell.innerHTML = groups[i].childNodes[1].firstChild.data;
			originCell.innerHTML = groups[i].childNodes[3].firstChild.data;
			weightCell.innerHTML = groups[i].childNodes[5].firstChild.data;
			ageCell.innerHTML = groups[i].childNodes[7].firstChild.data;
			priceCell.innerHTML = groups[i].childNodes[9].firstChild.data;
			quantityCell.innerHTML = "<input class='form-control' type='number' style='width: 4rem; padding: .3rem .5rem;' value='1' min='1' max='"+groups[i].childNodes[11].firstChild.data+"'>";
			quantityCell.classList.add('d-flex', 'justify-content-center');
			choicePointerCell.innerHTML = `<input class="form-control" type="checkbox" name="choice">`;

			newLine.append(marketCell, originCell, weightCell, ageCell, priceCell, quantityCell, choicePointerCell);
			vealGroupsTable.appendChild(newLine);
		}
	}
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
fillWithVealGroups(extractVealGroupsFromXml(xml));

// events : 
filterInput.addEventListener('keyup', (event) => {
	let value = filterInput.value.toUpperCase();
	let lines = vealGroupsTable.getElementsByTagName("tr");
	for (let i = 0 ; i < lines.length ; i++){
		origin = lines[i].getElementsByTagName('td')[1].firstChild.data;
		if (origin.toUpperCase().indexOf(value) > -1) {
	        lines[i].style.display = "";
	    } else {
	        lines[i].style.display = "none";
	    }
	}
})

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
			vealsToInsert[i] = new Array(market, origin, weight, age, price, quantity);
			originsToUpdate[i] = new Array(origin, quantity);
			priceToGive[i] = new Array(price, quantity);
		}
	}
	purchaseOperations(xml, totalWeight, vealsToInsert, originsToUpdate, priceToGive);
	
})

