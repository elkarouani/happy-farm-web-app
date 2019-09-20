import { getNedeedClass } from "../helper.js";

export default class Transport {
    constructor() {
        this._collection = [];
        getNedeedClass('XmlReader').readData('database/transports.xml').then( results => {
            let transports = results.getElementsByTagName("transport");
            for(let i = 0, length = transports.length ; i < length; i++){
                this._collection.push({
                    reference: transports[i].children[0].firstChild.data,
                    title: transports[i].children[1].firstChild.data,
                    telephone: transports[i].children[2].firstChild.data,
                    adresse: transports[i].children[3].firstChild.data,
                    charge: parseFloat(transports[i].children[4].firstChild.data),
                    prix: parseFloat(transports[i].children[5].firstChild.data),
                    reserve: transports[i].children[6].firstChild.data,
                    expire: (transports[i].children[7].firstChild != null) ? transports[i].children[7].firstChild.data : ""
                })
            }
        } )
    }

    getTransportByReference (reference) { 
        let output = null;
        this._collection.forEach(transport => { 
            if(transport.reference == reference) { 
                output = transport;
            } 
        });
        return output;     
    }

    getNotReservedTransports () { return this._collection.map( transport => (transport.reserve == "false") ? transport.reference : null ); }

    reserveThisOne (reference) { getNedeedClass('XmlReader').sendRequest('api/transportInfoUpdateService.php', "transport=" + this.getTransportByReference(reference).title + "&action=reservation", (response)=>{ console.log(response); }); }

    totalChargeReserved () { return this._collection.reduce( (accumulator, currentValue) => { return (accumulator.charge == undefined) ? accumulator + currentValue.charge : accumulator.charge + currentValue.charge; } ); }
}