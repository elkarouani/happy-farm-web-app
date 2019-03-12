// caching DOM
xml = new XMLHttpRequest();

// methods : 
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
};

const extractOriginsFromXml = (xml) => {
	xml.open('GET', 'database/origins.xml', false);
	xml.send();
    return getXmlData(xml).getElementsByTagName("origin");
}

const fillWithOrigins = (origins) => {
	for (let i = 0; i < origins.length; i++) {
		// origins[i].firstChild.data

	}
}

// main : 
fillWithAnimalsList(extractAnlimalsListFromXml(xml));
// fillWithOrigins();

// events : 
