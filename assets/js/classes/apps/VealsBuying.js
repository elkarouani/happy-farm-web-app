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

    fillWithVealGroups () {
        setTimeout( () => {
            // for each veal in the veals collection ... 
            this.Veals.collection.forEach((veal, index) => {
                // if the kind of the veal is exist then ...
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

    }
}