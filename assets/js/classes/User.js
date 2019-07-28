import { getNedeedClass } from "../helper.js";

export default class User {
    constructor() { this.getExternData(); }

    get username() { return this._username; }
    get email() { return this._email; }
    get password() { return this._password; }
    get budget() { return this._budget; }

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
            message.style.display = 'block'; message.innerHTML = "Veuiller patienter ... ";
            setTimeout(() => { message.innerHTML = response; }, 10000);
        }
        let args = ""+
            "name="+this._username+"&"+
            "email="+this._email+"&"+
            "password="+this._password+"&"+
            "budget="+this._budget+"&"+
            "action=settings";
        getNedeedClass('XmlReader').sendRequest('api/userInfoUpdateService.php', args, callback);
    }
}