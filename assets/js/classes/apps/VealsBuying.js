import { getNedeedDom, getNedeedClass, setEventListener, DomElementValue, displayDomElement, EditDomElementInnerHtml } from "../../helper.js";

export default class VealsBuying {
    constructor () {
        this._veals = getNedeedClass('Veals');
        this._transports = getNedeedClass('Transports');
	    this._user = getNedeedClass('User');
    }

    get Veals () { return this._veals; }
    get Transports () { return this._transports; }
    get User () { return this._user; }

    getSelectedTotalWeight (tableRows) { 
        let output = 0;
        for (let line of tableRows) { 
            if(line.lastChild.firstChild.checked) { 
                output += this.Veals.getGroupById(line.id).poid * parseInt(line.childNodes[5].firstChild.value); 
            } 
        } 

        return output;
    }

    getVealsToInsertList (tableRows) { 
        let output = [];
        for (let line of tableRows) { 
            if(line.lastChild.firstChild.checked) { 
                output.push({ info: this.Veals.getGroupById(line.id), quantity: parseInt(line.childNodes[5].firstChild.value) });
            } 
        } 

        return output;
    }

    getVealsToInsertIdsList (tableRows) {
        let output = [];
        for (let line of tableRows) { 
            if(line.lastChild.firstChild.checked) { 
                output.push({id: line.id, quantity: parseInt(line.childNodes[5].firstChild.value)});
            } 
        } 

        return output;
    }

    getTotalPrice (tableRows) {
        let output = 0;
        for (let line of tableRows) { 
            if(line.lastChild.firstChild.checked) { 
                output += this.Veals.getGroupById(line.id).prix * parseInt(line.childNodes[5].firstChild.value);
            } 
        } 

        return output;
    }

    fillWithVealGroups () {
        setTimeout( () => {
            // for each veal in the veals collection ... 
            this.Veals.collection.forEach((veal, index) => {
                // if the kind of the veal is exist then ...
                console.log(this.Veals.collection[0]);
                if (veal.max > 0) {
                    // insert its informations in the table
                    let row = getNedeedDom('myTable').insertRow(index);
                    row.setAttribute('id', veal.id);				
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

        return this;
    }

    initTableFilterEvent () {
        setEventListener('myInput', ['keyup'], (event) => { for (let line of getNedeedDom('myTable').getElementsByTagName("tr")) { line.style.display = (line.getElementsByTagName('td')[1].firstChild.data.toUpperCase().indexOf(DomElementValue('myInput').toUpperCase()) > -1) ? "" : "none"; } })
        return this;
    }

    initBuyingVealsEvent () {
        setEventListener('addVeal', ['click'], event => {
            setTimeout( () => { 
                // so if the transportation's charge is enough to transport the veals
                if (this.Transports.totalChargeReserved() >= this.getSelectedTotalWeight(getNedeedDom('myTable').getElementsByTagName("tr"))) {
                    $("#purachaseModal").modal('hide');
                    // execute buying veals process and put them in the farm
                    this.Veals.buyVeal(this.getVealsToInsertList(getNedeedDom('myTable').getElementsByTagName("tr")));	
                    // decrease the number of all kinds choosed
                    setTimeout( () => { this.Veals.updateGroupsInfo(this.getVealsToInsertIdsList(getNedeedDom('myTable').getElementsByTagName("tr"))); }, 1000 * this.getVealsToInsertList(getNedeedDom('myTable').getElementsByTagName("tr")).length );
                    // decrease the budget with the gived price
                    setTimeout( () => {  
                        this.User.newUser( { username: this.User.username, email: this.User.email, password: this.User.password, budget: this.User.budget - this.getTotalPrice(getNedeedDom('myTable').getElementsByTagName("tr")) } );
                        this.User.updateUserInfo();	
                    }, 2000 * this.getVealsToInsertIdsList(getNedeedDom('myTable').getElementsByTagName("tr")).length )
                    // reload the page
                    setTimeout(function(){ location.reload(); }, 3000 * this.getVealsToInsertIdsList(getNedeedDom('myTable').getElementsByTagName("tr")).length);
                }
                // if the transportation isn't enough, inform it 
                else { displayDomElement('message', 'on', EditDomElementInnerHtml('message', "Transportation insuffisant", ()=>{$("#purachaseModal").modal('hide');})) }
            }, 3000 )
        })
        
        return this;
    }
}