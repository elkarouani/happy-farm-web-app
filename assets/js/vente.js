// caching DOM
let filterInput = document.getElementById("myInput");
let vealGroupsTable = document.getElementById("myTable");
let removeVealButton = document.getElementById("removeVeal");
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

const removeVeal = (xml, reference) => {
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
	
    xml.send("reference="+reference+"&action=delete");
}

const updateUserInfo = (xml, price) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/userInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            // message.style.display = 'block';
            // message.innerHTML = xml.responseText;
            console.log(xml.responseText);
        }
    }
	
    xml.send("price="+price+"&action=updateBudget");
}

const sendMessage = (totalPrice, origins) => {
	// xml = new XMLHttpRequest();
	xml.open('POST', 'api/messagesService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            // message.style.display = 'block';
            // message.innerHTML = xml.responseText;
            console.log(xml.responseText);
        }
    }
	
    xml.send("origins="+origins+"&totalPrice="+totalPrice+"&action=sendResults");
}

const generateRandom = (length, packet) => {
	let pickUp = Math.floor((Math.random() * length) + 1);
	let accepted = [];
	let notAccepted = [];
	for (let i = 0 ; i < pickUp ; i++) {
		accepted[i] = packet[i];
	}
	for (let i = 0 ; i < (length - pickUp) ; i++) {
		notAccepted[i] = packet[pickUp + i];
	}

	return new Array(accepted, notAccepted);
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

removeVealButton.addEventListener('click', (event) => {
	let lines = vealGroupsTable.getElementsByTagName("tr");
	let packet = [];
	let totalPrice = 0;
	for(let i = 0 ; i < lines.length ; i++){
		let choiceSelector = lines[i].lastChild.firstChild;
		if (choiceSelector.checked) {
			packet[i] = new Array(lines[i].childNodes[0].firstChild.data, lines[i].childNodes[4].firstChild.data, lines[i].childNodes[1].firstChild.data) ;
		}
	}
	
	let data = generateRandom(packet.length, packet);
	let origins = [];
	for (let i = 0 ; i < data[0].length ; i++) {
		if (data[0][i] != undefined) {
			let reference = data[0][i][0];
			let price = parseInt(data[0][i][1]);
			let origin = data[0][i][2];
			let found = false;
			for (let j = 0 ; j < origins.length ; j++){
				if (Array.isArray(origins[j])) {
					if(origins[j][0] == origin) {
						origins[j][1] += 1;
						found = true;
					}
				}
			}
			if (!found) {origins[origins.length] = new Array(origin, 1);}

			totalPrice += price;
			// removeVeal(xml, reference);
			// updateUserInfo(xml, price);
		}
	}
	if (origins != []) {sendMessage(totalPrice, origins);}
})