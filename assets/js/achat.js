import { getNedeedDom, getNedeedClass, getNedeedApp, setEventListener, DomElementValue, displayDomElement, EditDomElementInnerHtml } from "./helper.js";

getNedeedApp('VealsBuying').fillWithVealGroups().initTableFilterEvent();
// events : 
// event 1# : table filter


// event 2# : buying event
setEventListener('addVeal', ['click'], event => {
	// needed classes
	let Veals = getNedeedClass('Veals');
	let Transports = getNedeedClass('Transports');
	let User = getNedeedClass('User');

	// needed temp variables
	let vealsToInsert = [];
	let choosedGroupsIds = [];
	let priceToGive = 0;
	let totalWeight = 0;

	setTimeout( () => { 
		// for each line on the table
		for (let line of getNedeedDom('myTable').getElementsByTagName("tr")) {
			// if the kind of the veal on the line is choosed
			if (line.lastChild.firstChild.checked) { 
				// take the total weight of veals from the same kind
				totalWeight += Veals.getGroupById(line.id).poid * parseInt(line.childNodes[5].firstChild.value);
				// take info about the veal's kind and the choosed quantity
				vealsToInsert.push({ info: Veals.getGroupById(line.id), quantity: parseInt(line.childNodes[5].firstChild.value) });
				// take the veals' group id
				choosedGroupsIds.push({id: line.id, quantity: parseInt(line.childNodes[5].firstChild.value)});
				// take the total price for buying the quantity of that kind of veals
				priceToGive += Veals.getGroupById(line.id).prix * parseInt(line.childNodes[5].firstChild.value);
			}
		}

		// so if the transportation's charge is enough to transport the veals
		if (Transports.totalChargeReserved() >= totalWeight) {
			$("#purachaseModal").modal('hide');
			// execute buying veals process and put them in the farm
			Veals.buyVeal(vealsToInsert);	
			// decrease the number of all kinds choosed
			setTimeout( () => { Veals.updateGroupsInfo(choosedGroupsIds); }, 1000 * vealsToInsert.length );
			// decrease the budget with the gived price
			setTimeout( () => {  
				User.newUser( { username: User.username, email: User.email, password: User.password, budget: User.budget - priceToGive } );
				User.updateUserInfo();	
			}, 2000 * choosedGroupsIds.length )
			// reload the page
			setTimeout(function(){ location.reload(); }, 3000 * choosedGroupsIds.length);
		}
		// if the transportation isn't enough, inform it 
		else { displayDomElement('message', 'on', EditDomElementInnerHtml('message', "Transportation insuffisant", ()=>{$("#purachaseModal").modal('hide');})) }
	}, 3000 )
})