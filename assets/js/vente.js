// caching DOM
const filterInput = document.getElementById("myInput");
const vealGroupsTable = document.getElementById("myTable");
const removeVealButton = document.getElementById("removeVeal");
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
	let sum = 0;
	let count = 0;
	for (let i = 0; i < veals.length; i++) {
		if (veals[i].childNodes[7].firstChild.data == "true" && veals[i].childNodes[8].firstChild.data == "false" && veals[i].childNodes[9].firstChild.data == "sain") {
			sum += parseInt(veals[i].childNodes[3].firstChild.data);
			count++;
		}
	}

	for (let i = 0; i < veals.length; i++) {
		if (veals[i].childNodes[7].firstChild.data == "true" && 
			veals[i].childNodes[8].firstChild.data == "false" && 
			veals[i].childNodes[9].firstChild.data == "sain" &&
			parseInt(veals[i].childNodes[3].firstChild.data) >= Math.floor(sum/count)) {
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

const updateVealsGroupQuantity = (xml, reference) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/groupsInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
	xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        }
    }
	
    xml.send("reference="+reference+"&action=afterDeath");
}

const sendMessage = (totalPrice, origins) => {
	console.log('great');
	// xml = new XMLHttpRequest();
	xml.open('POST', 'api/messagesService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
        	console.log(xml.responseText);
        	$("#sellModal").modal('hide');
            message.style.display = 'block';
            message.innerHTML = "L'opération de vente est términer avec succées";
            setTimeout(function(){
			    location.reload(); 
			}, 3000);
        } else {
        	console.log('there is an error');
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
fillWithVealGroups(extractVealsFromXml(xml));
if(vealGroupsTable.childNodes.length == 0){
	entireTable.setAttribute("hidden", "hidden");
	contentSection.innerHTML = "<div class='alert alert-dark' role='alert' style='margin: 40px 0 0 20px;'>Il n'y a pas des veaux à vendre encore !</div><br/><br/>";
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

async function sellingOperations(xml, totalWeight, packet) {
	let availableCharge = await getAvailableCharge(xml);
	if (availableCharge >= totalWeight) {
		let totalPrice = 0;
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
				await updateVealsGroupQuantity(xml, reference);
				await removeVeal(xml, reference);
				updateUserInfo(xml, price);
			}
		}
		sendMessage(totalPrice, origins);
	}
	else {
		message.style.display = 'block';
	    message.innerHTML = "Transportation insuffisant";
	}
}

removeVealButton.addEventListener('click', (event) => {
	let lines = vealGroupsTable.getElementsByTagName("tr");
	let packet = [];
	
	let charge = 0;
	for(let i = 0 ; i < lines.length ; i++){
		let choiceSelector = lines[i].lastChild.firstChild;
		if (choiceSelector.checked) {
			packet[i] = new Array(lines[i].childNodes[0].firstChild.data, lines[i].childNodes[4].firstChild.data, lines[i].childNodes[1].firstChild.data) ;
			charge += parseInt(lines[i].childNodes[2].firstChild.data);
		}
	}

	sellingOperations(xml, charge, packet);
})