export default class XmlReader {
    constructor() {
        this._xml = new XMLHttpRequest();
    }

    get xmlObject() { return this._xml; }

    getXmlData(xmlObject) {
        let data = xmlObject.responseText;
        if (data) {
            return (new DOMParser()).parseFromString(xmlObject.responseText, 'text/xml');
        }
        return data;
    }

    readData(path) {
        this._xml.open('GET', path, false);
        this._xml.send();
        return this.getXmlData(this._xml);
    } 

    sendRequest(path, args, callback) {
        this._xml.open('POST', path, true);
        this._xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._xml.send((args != null) ? args : '');
        this._xml.onreadystatechange = () => {
            if (this._xml.readyState == 4 && this._xml.status == 200) { callback(this._xml.responseText) }
        }
    }
}