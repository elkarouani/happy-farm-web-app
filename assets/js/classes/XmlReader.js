export default class XmlReader {
    constructor() {
        this._xml = new XMLHttpRequest();
    }

    get xmlObject() { return this._xml; }

    getXmlData(xmlObject) {
        if (xmlObject.responseText) { return (new DOMParser()).parseFromString(xmlObject.responseText, 'text/xml'); }
        return xmlObject.responseText;
    }

    readData(path) {
        let xml = this._xml;
        return new Promise(function (resolve, reject) { 
            xml.open('GET', path, true);
            xml.onreadystatechange = function() {
                if (xml.readyState == XMLHttpRequest.DONE ) {
                    if(xml.status == 200){
                       resolve((new XmlReader()).getXmlData(xml));
                    }
                    reject({ status: this.status, statusText: xml.statusText })
                }
            }
            xml.onerror = function () {
                reject({ status: this.status, statusText: xml.statusText })
            }
            xml.send();
        })
    } 

    sendRequest(path, args, callback) {
        this._xml.open('POST', path, true);
        this._xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        this._xml.send((args != null) ? args : '');
        this._xml.onreadystatechange = () => {
            if (this._xml.readyState == 4 && this._xml.status == 200) { callback(this._xml.responseText); }
        }
    }
}