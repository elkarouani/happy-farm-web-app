import { getNedeedClass, getNedeedDom } from './helper.js';

class Settings {
    constructor() {
        this._userClass = getNedeedClass('User');
        this._messageDom = getNedeedDom('message');
        this._nameInputDom = getNedeedDom('nameInput');
        this._emailInputDom = getNedeedDom('emailInput');
        this._passwordInputDom = getNedeedDom('passwordInput');
        this._budgetInputDom = getNedeedDom('budgetInput');
        this._saveButtonDom = getNedeedDom('saveButton');
    }

    get userClass() { return this._userClass };
    get messageDom() { return this._messageDom };
    get nameInputDom() { return this._nameInputDom };
    get emailInputDom() { return this._emailInputDom };
    get passwordInputDom() { return this._passwordInputDom };
    get budgetInputDom() { return this._budgetInputDom };
    get saveButtonDom() { return this._saveButtonDom };
}

const settings = new Settings();

let user = settings.userClass;
settings.messageDom.style.display = 'block'; settings.messageDom.innerHTML = "En train de récupérer les données ... ";
setTimeout(() => {  
    settings.nameInputDom.value = user.username;
    settings.emailInputDom.value = user.email;
    settings.passwordInputDom.value = user.password;
    settings.budgetInputDom.value = user.budget;
    settings.messageDom.style.display = 'none';
}, 3000);

settings.saveButtonDom.addEventListener("click", (event) => { 
    let user = settings.userClass;
    user.newUser({"username": settings.nameInputDom.value, "email": settings.emailInputDom.value, "password": settings.passwordInputDom.value, "budget": settings.budgetInputDom.value});
    user.updateUserInfo();
});