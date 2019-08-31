import User from "./classes/User.js";
import Notification from "./classes/Notification.js";
import XmlReader from "./classes/XmlReader.js";
import Home from "./classes/apps/Home.js";
import Settings from "./classes/apps/Settings.js";

export function getNedeedClass (classname) {
    const classesMap = new Map([
        ['User', User], 
        ['Notification', Notification],
        ['XmlReader', XmlReader]
    ]);

    return new (classesMap.get(classname))();
}

export function getNedeedApp (appname) {
    const appsMap = new Map([
        ['Home', Home],
        ['Settings', Settings]
    ]);

    return new (appsMap.get(appname))();
}

export function getNedeedDom (className) {
    return (document.getElementById(className) != null) ? document.getElementById(className) : null;
}

export function displayDomElement (className, action, callback = null) {
    getNedeedDom(className).style.display = (action == "on") ? "block" : "none";
    if (callback != null) {callback();}
}

export function EditDomElementInnerText (className, innerText, callback = null) {
    getNedeedDom(className).innerText = innerText;
    if (callback != null) {callback();}
}

export function EditDomElementInnerHtml (className, innerHtml, callback = null) {
    getNedeedDom(className).innerHTML = innerHtml;
    if (callback != null) {callback();}
}

export function DomElementValue (className) { return getNedeedDom(className).value; }

export function setDomElementValue (className, value) { getNedeedDom(className).value = value; }

export function setEventListener (className, eventName, callback) {
    getNedeedDom(className).addEventListener(eventName, event => callback());
}