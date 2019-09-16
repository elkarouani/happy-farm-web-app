import { getNedeedDom, EditDomElementInnerHtml, EditDomElementInnerText, appendChildToDomElement, displayDomElement, setEventListener, DomElementValue, setAttributeToDOMElement, removeAttributeFromDomElement, getNedeedClass, createDomElement } from "./helper.js";

// Caching DOM : 
let xml = new XMLHttpRequest();
let price = 0;

// functionnality #1
const FillInTransportsSelectionInputs = () => {
	// Initiate Transports class object
	let Transports = getNedeedClass('Transports'); 

	// Clear transports Selections inputs
	EditDomElementInnerHtml('transportsSelection', '', () => { 
		appendChildToDomElement('transportsSelection', createDomElement('option', { value : " " })); 
	});
	
	// Fill transports selection with data
	setTimeout(()=>{
		Transports.getNotReservedTransports().forEach(reference => {
			if (reference != null) {
				appendChildToDomElement('transportsSelection', 
					createDomElement('option', { 
						value: reference, 
						label : Transports.getTransportByReference(reference).title 
					})
				); 
			}
		});
	}, 1000); 
}

// helpers :
const getXmlData = (xml) => {
    let xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractUserBudgetFromXml = (xml) => {
	xml.open('GET', 'database/users.xml', false);
    xml.send();

    let user = getXmlData(xml).getElementsByTagName("user")[0];

    return user.getElementsByTagName("budget")[0].firstChild.data;
}

const getTransportPrice = (transport) => {
	return transport.childNodes[11].firstChild.data;
}

const updateUserBudget = (xml, newBudget) => {
	xml = new XMLHttpRequest();
    xml.open('POST', 'api/userInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
			displayDomElement('message', 'on', EditDomElementInnerHtml('message', "Well reserved"));
		}
    }

    xml.send("newBudget="+newBudget+"&action=reservation");
};

const updateTransportInfo = (xml, transport) => {
	xml = new XMLHttpRequest();
	xml.open('POST', 'api/transportInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
	xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
        	console.log(xml.responseText);
		}
    }
	
    xml.send("transport="+transport+"&action=reservation");
}

// Main :
FillInTransportsSelectionInputs();

// Events :
// event #1
setEventListener('transportsSelection', ['change'], (event) => {
	// init transport class object
	let transports = getNedeedClass('Transports');

	// if choice selected has empty value hide necessery components
	if (DomElementValue('transportsSelection') == " ") { setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled", setAttributeToDOMElement('commandZone', 'class', 'row d-flex justify-content-center', setAttributeToDOMElement('transportTable', 'hidden', 'hidden', setAttributeToDOMElement("reserveZone", "hidden", 'hidden', setAttributeToDOMElement('tableTitle', "hidden", 'hidden', setAttributeToDOMElement("reservationModalHandler", "hidden", "hidden", displayDomElement('message', 'off'))))))); }
	
	// else show them with filling the table with selected transport infos
	else { 
		removeAttributeFromDomElement('reservationModalHandler', 'disabled', setAttributeToDOMElement('commandZone', 'class', "row justify-content-between", removeAttributeFromDomElement('transportTable', 'hidden', removeAttributeFromDomElement("reserveZone", "hidden", removeAttributeFromDomElement('tableTitle', "hidden", removeAttributeFromDomElement("reservationModalHandler", "hidden", displayDomElement('message', 'off'))))))); 
		setTimeout( () => {
			EditDomElementInnerText('ReferenceCell', transports.getTransportByReference(DomElementValue('transportsSelection')).reference);
			EditDomElementInnerText('TitleCell', transports.getTransportByReference(DomElementValue('transportsSelection')).title);
			EditDomElementInnerText('TelephoneCell', transports.getTransportByReference(DomElementValue('transportsSelection')).telephone);
			EditDomElementInnerText('AdresseCell', transports.getTransportByReference(DomElementValue('transportsSelection')).adresse);
			EditDomElementInnerText('ChargeCell', transports.getTransportByReference(DomElementValue('transportsSelection')).charge);
			EditDomElementInnerText('PriceCell', transports.getTransportByReference(DomElementValue('transportsSelection')).charge);
		}, 1000 )
	}
})

setEventListener('reserveButton', ['click'], (event) => {
	if (parseFloat(extractUserBudgetFromXml(xml)) >= price) {
		updateUserBudget(xml, (parseFloat(extractUserBudgetFromXml(xml)) - price));
		updateTransportInfo(xml,DomElementValue('transportsSelection'));
		$('#reservationModal').modal('hide');
		setAttributeToDOMElement('tableTitle', "hidden", "hidden", setAttributeToDOMElement('transportTable', "hidden", "hidden"));
		getNedeedDom('transportsSelection').childNodes[getNedeedDom('transportsSelection').selectedIndex].setAttribute("disabled", "disabled");
		getNedeedDom('transportsSelection').selectedIndex = 0;
		setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled");
	} else {
		displayDomElement('message', 'on', EditDomElementInnerHtml('message', "You don't have more budget to buy this transport"));
		event.preventDefault();
		$('#reservationModal').modal('hide');
	}
})