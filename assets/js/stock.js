// caching DOM
xml = new XMLHttpRequest();
let foodQuantity = document.getElementById('foodQuantity');
let foodQuantityInput = document.getElementById('foodQuantityInput');
let foodTotal = document.getElementById('foodTotal');
let buyFood = document.getElementById('buyFood');
let medicencesSelection = document.getElementById("medicencesSelection");
let medicencesTable = document.getElementById("medicencesTable");
let medicencesTotal = document.getElementById("medicencesTotal");
message = document.getElementById('message');
// helpers :
getXmlData = (xml) => {
    xmlData = xml.responseText;
    if (xmlData) {
        return (new DOMParser()).parseFromString(xml.responseText, 'text/xml');
    }
    return xmlData;
}

const extractFoodInfo = (xml) => {
    xml = new XMLHttpRequest();
    xml.open('GET', 'database/stock.xml', false);
    xml.send();
    
    let nourriture = getXmlData(xml).getElementsByTagName("nourriture")[0];
    let prix = nourriture.getElementsByTagName("prix")[0].firstChild.data;
    let quantite = nourriture.getElementsByTagName("quantite")[0].firstChild.data;
    
    return new Array(prix, quantite);
}

const extractMedicencesInfo = () => {
    xml = new XMLHttpRequest();
    xml.open('GET', 'database/stock.xml', false);
    xml.send();
    
    let medicaments = getXmlData(xml).getElementsByTagName("medicament");
    
    return medicaments;
} 

const extractMedicinePriceByTitle = (xml, title) => {
    xml = new XMLHttpRequest();
    xml.open('GET', 'database/stock.xml', false);
    xml.send();
    
    let medicaments = getXmlData(xml).getElementsByTagName("medicament");
    for (let i = 0 ; i < medicaments.length ; i++) {
        if (medicaments[i].childNodes[1].firstChild.data == title) {
            return medicaments[i].childNodes[3].firstChild.data;
        }
    }
    
    return medicaments;
}

const addFoodQuantity = (xml, quantity) => {
    xml = new XMLHttpRequest();
    xml.open('POST', 'api/stockInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            console.log(xml.responseText);
        }
    }

    xml.send("quantity="+quantity+"&action=updateFoodQuantity");
}

const decreaseUserBudget = (xml, total) => {
    xml = new XMLHttpRequest();
    xml.open('POST', 'api/userInfoUpdateService.php', true);
    xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xml.onreadystatechange = () => {
        if (xml.readyState == 4 && xml.status == 200) {
            message.style.display = 'block';
            message.innerHTML = "L'achat de nourriture est términée avec succées";
        }
    }

    xml.send("total="+parseInt(total)+"&action=decreaseBudget");
};

const fillWithMedicences = () => {
    let medicaments = extractMedicencesInfo(xml);
    for (let i = 0 ; i < medicaments.length ; i++) {
        let option = document.createElement("option");
        option.value = medicaments[i].childNodes[1].firstChild.data;
        option.innerHTML = medicaments[i].childNodes[1].firstChild.data;
        medicencesSelection.appendChild(option);

        let newLine = document.createElement("tr");
        let titleCell = document.createElement("td");
        let quantityCell = document.createElement("td");
        titleCell.innerHTML = medicaments[i].childNodes[1].firstChild.data;
        quantityCell.innerHTML = medicaments[i].childNodes[5].firstChild.data
        newLine.append(titleCell, quantityCell);
        medicencesTable.appendChild(newLine);
    }
};

// main : 
foodQuantity.innerHTML = "Quantité : "+extractFoodInfo(xml)[1]+" Kg";
foodQuantityInput.value = 1;
foodTotal.innerHTML = "Total : "+extractFoodInfo(xml)[0];
fillWithMedicences();

// Event : 
foodQuantityInput.addEventListener('change', (event) => {
    foodTotal.innerHTML = "Total : "+extractFoodInfo(xml)[0] * foodQuantityInput.value;
});

buyFood.addEventListener('click', (event) => {
    addFoodQuantity(xml, foodQuantityInput.value);
    decreaseUserBudget(xml, foodTotal.innerHTML.substring(('Total : ').length - 1));
});

medicencesSelection.addEventListener('change', () => {
    medicencesTotal.innerHTML = "Total : " + extractMedicinePriceByTitle(xml, medicencesSelection.value);
});
