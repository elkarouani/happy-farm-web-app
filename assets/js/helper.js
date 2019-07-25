import User from "./classes/User.js";
import Notification from "./classes/Notification.js";
import XmlReader from "./classes/XmlReader.js";

export function getNedeedClass(classname) {
    const classesMap = new Map([
        ['User', User], 
        ['Notification', Notification],
        ['XmlReader', XmlReader]
    ]);

    return new (classesMap.get(classname))();
}