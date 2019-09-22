import { getNedeedClass, displayDomElement, EditDomElementInnerHtml } from "../helper.js";

export default class Farm {
    constructor () {
        this._collection = [];
        getNedeedClass('XmlReader').readData('database/farm.xml').then( result => {  
            for (let index = 0 ; index < result.getElementsByTagName("veal").length ; index ++) {
                let veal = result.getElementsByTagName("veal").item(index);
                this._collection.push({ 
                    reference: veal.children[0].firstChild.data, 
                    market: veal.children[1].firstChild.data,
                    origin: veal.children[2].firstChild.data,
                    poid: parseInt(veal.children[3].firstChild.data),
                    age: veal.children[4].firstChild.data,
                    boughtBy: veal.children[5].firstChild.data,
                    quarentaine: veal.children[6].firstChild.data,
                    disponible: veal.children[7].firstChild.data,
                    consultation: veal.children[8].firstChild.data,
                    status: veal.children[9].firstChild.data
                })
            }
        } );
    }
    
    get collection () { return this._collection; }

    // getGroupById (id) { return this._collection.filter( group => { if(group.id == id) { return group; } } )[0]; }

    // buyVeal (veals) { veals.forEach(veal => { getNedeedClass('XmlReader').sendRequest('api/vealInfoUpdateService.php', "market="+veal.info.market+"&origin="+veal.info.origin+"&weight="+veal.info.poid+"&age="+veal.info.age+"&price="+veal.info.prix+"&quantity="+veal.quantity+"&action=insert", (response) => { displayDomElement('message', 'on', EditDomElementInnerHtml('message', response)); }) }); }

    // updateGroupsInfo (datas) { datas.forEach( data => { getNedeedClass('XmlReader').sendRequest('api/groupsInfoUpdateService.php', "origin="+this.getGroupById(data.id).origin+"&quantity="+data.quantity+"&action=afterBuying", response => { console.log(response); } ); } ) }
}