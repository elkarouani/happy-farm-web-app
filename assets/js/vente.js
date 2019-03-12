// caching DOM
let filterInput = document.getElementById("myInput");
let vealGroupsTable = document.getElementById("myTable");
// let addVealButton = document.getElementById("addVeal");
// message = document.getElementById('message');
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
};

// const extractVealGroupsFromXml = (xml) => {
// 	xml.open('GET', 'database/vealsGroups.xml', false);
// 	xml.send();
//     return getXmlData(xml).getElementsByTagName("group");
// }

// main : 

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