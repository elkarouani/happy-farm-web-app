import { getNedeedClass, getNedeedDom } from "../helper.js";

export default class User {
    constructor() { this.getExternData(); }

    get username() { return this._username; }
    get email() { return this._email; }
    get password() { return this._password; }
    get budget() { return parseFloat(this._budget); }

    set username(username) { this._username = username; }
    set email(email) { this._email = email; }
    set password(password) { this._password = password; } 
    set budget(budget) { this._budget = budget; }

    async getExternData() {
        let data = await getNedeedClass('XmlReader').readData('database/users.xml');
        setTimeout(() => {  
            let user = data.getElementsByTagName("user")[0];
            this._username = user.children[0].firstChild.data;
            this._email = user.children[1].firstChild.data;
            this._password = user.children[2].firstChild.data;
            this._budget = user.children[3].firstChild.data;
        }, 2000);
    }

    newUser(data) {
        this._username = data.username;
        this._email = data.email;
        this._password = data.password;
        this._budget = data.budget;
    }

    updateUserInfo() {
        let callback = (response) => { 
            getNedeedDom('message').style.display = 'block'; getNedeedDom('message').innerHTML = "Veuiller patienter ... ";
            setTimeout(() => { getNedeedDom('message').innerHTML = response; }, 2000);
        }
        let args = ""+
            "name="+this._username+"&"+
            "email="+this._email+"&"+
            "password="+this._password+"&"+
            "budget="+this._budget+"&"+
            "action=settings";
        getNedeedClass('XmlReader').sendRequest('api/userInfoUpdateService.php', args, callback);
    }

    checkAccessAuthenticity (email, password) { return this._email == email && this._password == password; }
}