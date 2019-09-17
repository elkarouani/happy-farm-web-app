import { getNedeedClass } from "../helper.js";

export default class Veals {
    constructor () {
        this._collection = [];
        getNedeedClass('XmlReader').readData('database/vealsGroups.xml').then( result => {  
            for (let index = 0 ; index < result.getElementsByTagName("group").length ; index ++) {
                let group = result.getElementsByTagName("group").item(index);
                this._collection.push({ 
                    market: group.children[0].firstChild.data,
                    origin: group.children[1].firstChild.data,
                    poid: group.children[2].firstChild.data,
                    age: group.children[3].firstChild.data,
                    prix: group.children[4].firstChild.data,
                    max: group.children[5].firstChild.data
                })
            }
        } );
    }
    
    get collection () { return this._collection; }
}