// classes
import User from "./classes/User.js";
import Notification from "./classes/Notification.js";
import XmlReader from "./classes/XmlReader.js";
import Transports from "./classes/Transports.js";
import Veals from "./classes/Veals.js";
import Farm from "./classes/Farm.js";

// Apps
import Home from "./classes/apps/Home.js";
import Settings from "./classes/apps/Settings.js";
import SignIn from "./classes/apps/SignIn.js";
import TransportsReservations from "./classes/apps/TransportsReservations.js";
import VealsBuying from "./classes/apps/VealsBuying.js";

export function getNedeedClass (classname) {
    const classesMap = new Map([
        ['User', User], 
        ['Notification', Notification],
        ['XmlReader', XmlReader],
        ['Transports', Transports],
        ['Veals', Veals],
        ['Farm', Farm]
    ]);

    return new (classesMap.get(classname))();
}

export function getNedeedApp (appname) {
    const appsMap = new Map([
        ['SignIn', SignIn],
        ['Home', Home],
        ['Settings', Settings],
        ['TransportsReservations', TransportsReservations],
        ['VealsBuying', VealsBuying]
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

export function setEventListener (className, events, callback) {
    events.forEach(eventname => { getNedeedDom(className).addEventListener(eventname, event => callback(event)); });
}

export function setEventListenerSchema (schema, callback) {
    Object.keys(schema).map(function(objectKey) {
        if (Array.isArray(schema[objectKey])) { getNedeedDom(objectKey).addEventListener(schema[objectKey][0], event => { if (event.keyCode === schema[objectKey][1]) { callback(); } }); }
        else { getNedeedDom(objectKey).addEventListener(schema[objectKey], event => callback()); }
    });
}

export function appendChildToDomElement (className, child, callback = null) { 
    getNedeedDom(className).appendChild(child); 
    if (callback != null) {callback();}
}

export function setAttributeToDOMElement (className, attributename, value, callback = null) {
    if (typeof className != "string") { className.setAttribute(attributename, value); }
    else { getNedeedDom(className).setAttribute(attributename, value); }
    if (callback != null) {callback();}
}

export function removeAttributeFromDomElement (className, attributename, callback = null) {
    getNedeedDom(className).removeAttribute(attributename);
    if (callback != null) {callback();}
}

export function createDomElement (tagname, options) { 
    let element = document.createElement(tagname);
    Object.keys(options).map(function(objectKey) { element.setAttribute(objectKey, options[objectKey]); });
    return element;
}