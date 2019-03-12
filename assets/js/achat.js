// caching DOM
let vealGroupsTable = document.getElementById("myTable");
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    xmlData = xml.responseText;
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
		let newLine = document.createElement("tr");
		let marketCell = document.createElement("td");
		let originCell = document.createElement("td");
		let weightCell = document.createElement("td");
		let ageCell = document.createElement("td");
		let priceCell = document.createElement("td");
		let quantityCell = document.createElement("td");
		let choicePointerCell = document.createElement("td");

		marketCell.innerHTML = groups[i].childNodes[1].firstChild.data;
		originCell.innerHTML = groups[i].childNodes[3].firstChild.data;
		weightCell.innerHTML = groups[i].childNodes[5].firstChild.data;
		ageCell.innerHTML = groups[i].childNodes[7].firstChild.data;
		priceCell.innerHTML = groups[i].childNodes[9].firstChild.data;
		quantityCell.innerHTML = "<input class='form-control' type='number' style='width: 3rem; padding: 0.3rem .5rem;' value='1' max='"+groups[i].childNodes[11].firstChild.data+"'>";
		quantityCell.classList.add('d-flex', 'justify-content-center');
		choicePointerCell.innerHTML = `<input class="form-control" type="checkbox" name="choice">`;

		newLine.append(marketCell, originCell, weightCell, ageCell, priceCell, quantityCell, choicePointerCell);
		vealGroupsTable.appendChild(newLine);
	}
}

// main : 
fillWithVealGroups(extractVealGroupsFromXml(xml));
// fillWithOrigins();

// events : 
