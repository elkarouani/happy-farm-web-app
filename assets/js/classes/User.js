import XmlReader from "./XmlReader.js";

export default class User {
    constructor() {
        let XmlReaderObject = new XmlReader();
        let data = XmlReaderObject.readData('database/users.xml');
        let user = data.getElementsByTagName("user")[0];
        this._username = user.getElementsByTagName("name")[0].firstChild.data;
    }

    get username() { return this._username; }
}