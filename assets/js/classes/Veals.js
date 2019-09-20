import { getNedeedClass, displayDomElement, EditDomElementInnerHtml } from "../helper.js";

export default class Veals {
    constructor () {
        this._collection = [];
        getNedeedClass('XmlReader').readData('database/vealsGroups.xml').then( result => {  
            for (let index = 0 ; index < result.getElementsByTagName("group").length ; index ++) {
                let group = result.getElementsByTagName("group").item(index);
                this._collection.push({ 
                    id: index,
                    market: group.children[0].firstChild.data,
                    origin: group.children[1].firstChild.data,
                    poid: parseInt(group.children[2].firstChild.data),
                    age: group.children[3].firstChild.data,
                    prix: parseInt(group.children[4].firstChild.data),
                    max: group.children[5].firstChild.data
                })
            }
        } );
    }
    
    get collection () { return this._collection; }

    getGroupById (id) { return this._collection.filter( group => { if(group.id == id) { return group; } } )[0]; }

    buyVeal (veals) { veals.forEach(veal => { getNedeedClass('XmlReader').sendRequest('api/vealInfoUpdateService.php', "market="+veal.info.market+"&origin="+veal.info.origin+"&weight="+veal.info.poid+"&age="+veal.info.age+"&price="+veal.info.prix+"&quantity="+veal.quantity+"&action=insert", (response) => { displayDomElement('message', 'on', EditDomElementInnerHtml('message', response)); }) }); }

    updateGroupsInfo (datas) { datas.forEach( data => { getNedeedClass('XmlReader').sendRequest('api/groupsInfoUpdateService.php', "origin="+this.getGroupById(data.id).origin+"&quantity="+data.quantity+"&action=afterBuying", response => { console.log(response); } ); } ) }
}