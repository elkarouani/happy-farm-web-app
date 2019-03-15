// caching DOM
xml = new XMLHttpRequest();
let foodQuantity = document.getElementById('foodQuantity');
let foodQuantityInput = document.getElementById('foodQuantityInput');
let foodTotal = document.getElementById('foodTotal');
let buyFood = document.getElementById('buyFood');
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

// main : 
foodQuantity.innerHTML = "Quantité : "+extractFoodInfo(xml)[1]+" Kg";
foodQuantityInput.value = 1;
foodTotal.innerHTML = "Total : "+extractFoodInfo(xml)[0];

// Event : 
foodQuantityInput.addEventListener('change', (event) => {
    foodTotal.innerHTML = "Total : "+extractFoodInfo(xml)[0] * foodQuantityInput.value;
});

buyFood.addEventListener('click', (event) => {
    addFoodQuantity(xml, foodQuantityInput.value);
});
