import { getNedeedClass } from "../helper.js";

export default class User {
    constructor() {
        // let user = getNedeedClass('XmlReader').readData('database/users.xml').getElementsByTagName("user")[0];
        let user = this.getExternData();
        this._username = user.getElementsByTagName("name")[0].firstChild.data;
        this._email = user.getElementsByTagName("email")[0].firstChild.data;
        this._password = user.getElementsByTagName("password")[0].firstChild.data;
        this._budget = user.getElementsByTagName("budget")[0].firstChild.data;
    }

    get username() { return this._username; }
    get email() { return this._email; }
    get password() { return this._password; }
    get budget() { return this._budget; }

    set username(username) { this._username = username; }
    set email(email) { this._email = email; }
    set password(password) { this._password = password; } 
    set budget(budget) { this._budget = budget; }

    async getExternData() {
        return await getNedeedClass('XmlReader').readData('database/users.xml').getElementsByTagName("user")[0];
    }

    newUser(data) {
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._budget = data.budget;
    }

    updateUserInfo() {
        let callback = (response) => { message.style.display = 'block'; message.innerHTML = response; }
        let args = ""+
            "name="+this._username+"&"+
            "email="+this._email+"&"+
            "password="+this._password+"&"+
            "budget="+this._budget+"&"+
            "action=settings";
        getNedeedClass('XmlReader').sendRequest('api/userInfoUpdateService.php', args, callback);
    }
}