import { EditDomElementInnerHtml, EditDomElementInnerText, appendChildToDomElement, displayDomElement, setEventListener, DomElementValue, setAttributeToDOMElement, removeAttributeFromDomElement, getNedeedClass, createDomElement } from "../../helper.js";

export default class TransportsReservations {
    constructor() { 
        this._Transports = getNedeedClass('Transports');
        this._User = getNedeedClass('User');
    }

    get Transports() { return this._Transports; }
    set Transports(newTransportsClass) { this._Transports = newTransportsClass; }
    get User() { return this._User; }

    refreshTransports () { this._Transports = getNedeedClass('Transports'); }

    FillInTransportsSelectionInputs () { 
        // Clear transports Selections inputs
        EditDomElementInnerHtml('transportsSelection', '', () => { 
            appendChildToDomElement('transportsSelection', createDomElement('option', { value : " " })); 
        });
        
        // Fill transports selection with data
        setTimeout(()=>{
            this.Transports.getNotReservedTransports().forEach(reference => {
                if (reference != null) {
                    appendChildToDomElement('transportsSelection', 
                        createDomElement('option', { 
                            value: reference, 
                            label : this.Transports.getTransportByReference(reference).title 
                        })
                    ); 
                }
            });
        }, 1000);

        return this;
    }

    InitTransportsSelectionListener () { 
        setEventListener('transportsSelection', ['change'], (event) => {
            // if choice selected has empty value hide necessery components
            if (DomElementValue('transportsSelection') == " ") { setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled", setAttributeToDOMElement('commandZone', 'class', 'row d-flex justify-content-center', setAttributeToDOMElement('transportTable', 'hidden', 'hidden', setAttributeToDOMElement("reserveZone", "hidden", 'hidden', setAttributeToDOMElement('tableTitle', "hidden", 'hidden', setAttributeToDOMElement("reservationModalHandler", "hidden", "hidden", displayDomElement('message', 'off'))))))); }
            
            // else show them with filling the table with selected transport infos
            else { 
                removeAttributeFromDomElement('reservationModalHandler', 'disabled', setAttributeToDOMElement('commandZone', 'class', "row justify-content-between", removeAttributeFromDomElement('transportTable', 'hidden', removeAttributeFromDomElement("reserveZone", "hidden", removeAttributeFromDomElement('tableTitle', "hidden", removeAttributeFromDomElement("reservationModalHandler", "hidden", displayDomElement('message', 'off'))))))); 
                setTimeout( () => {
                    EditDomElementInnerText('ReferenceCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).reference);
                    EditDomElementInnerText('TitleCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).title);
                    EditDomElementInnerText('TelephoneCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).telephone);
                    EditDomElementInnerText('AdresseCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).adresse);
                    EditDomElementInnerText('ChargeCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).charge);
                    EditDomElementInnerText('PriceCell', this.Transports.getTransportByReference(DomElementValue('transportsSelection')).prix);
                }, 1000 )
            }
        })
        return this;
    }

    initReservationActionEvent () {
        setEventListener('reserveButton', ['click'], (event) => {
            setTimeout( () => {
                // check if the budget is enough to reserve the transport
                if (this.User.budget >= this.Transports.getTransportByReference(DomElementValue('transportsSelection')).prix) 
                {
                    // setting up new user infos and submit the update
                    this.User.newUser( { username: this.User.username, email: this.User.email, password: this.User.password, budget: this.User.budget - this.Transports.getTransportByReference(DomElementValue('transportsSelection')).prix } );
                    this.User.updateUserInfo();
        
                    // reserve the transport using its reference
                    this.Transports.reserveThisOne(DomElementValue('transportsSelection'));
                    this.refreshTransports();
        
                    // and some modifications in the interface
                    $('#reservationModal').modal('hide');
                    setAttributeToDOMElement('tableTitle', "hidden", "hidden", setAttributeToDOMElement('transportTable', "hidden", "hidden", setAttributeToDOMElement('reservationModalHandler', "disabled", "disabled")));
                    this.FillInTransportsSelectionInputs();
                } 
                
                else 
                {
                    // showing that the budget is not enough to reserve the transport
                    displayDomElement('message', 'on', EditDomElementInnerHtml('message', "You don't have more budget to buy this transport"));
                    event.preventDefault();
                    $('#reservationModal').modal('hide');
                }
            }, 3000 );
        })

        return this;
    }
}