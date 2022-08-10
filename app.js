'use strict';
let allDrinks = [];
let sectionEl = document.getElementById("cardSection");
let formEl = document.getElementById("formId");
let tableEl = document.getElementById("tableID");

formEl.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    // the default behaviour of submitting the form is to refresh the page
    event.preventDefault();
    // for text input
    let drinkName = event.target.drinkName.value
    let ingredients = event.target.ingredients.value;
    let image = event.target.image.value;
   
    // for checkbox input
    let cold = event.target.cold.checked; // true or false
    let hot = event.target.hot.checked;
    let price = event.target.price.value;
    let ingredientsArr = ingredients.split(",");

    // create a new drink

    const newDrink = new Drink(drinkName, ingredientsArr, image, cold, hot, price);
    newDrink.render();
    newDrink.renderTable();
    saveData(allDrinks);
};

function Drink(name, ingredients, image, isCold, isHot, price) {
    this.name = name;
    this.ingredients = ingredients;
    this.image = image;
    this.isCold = isCold;
    this.isHot = isHot;
    this.price = price;

    allDrinks.push(this);

};

console.log(allDrinks);
Drink.prototype.render = function () {
    // createing h3 for the name of the drink
    let name = document.createElement('h3');// <h3> </h3>
    name.textContent = this.name; // <h3> the name of the drink </h3>
    sectionEl.appendChild(name) // I can see the name inside the section

    // create the images :
    let imageEl = document.createElement('img');
    imageEl.src = this.image;
    sectionEl.appendChild(imageEl);

    // price:
    let price = document.createElement('p');
    price.textContent = `${this.price} JD`;
    sectionEl.appendChild(price);

    // Ingredients: // array as list
    let orderListEl = document.createElement("ol");
    sectionEl.appendChild(orderListEl);

    for (let i = 0; i < this.ingredients.length; i++) {
        let list = document.createElement("li");
        list.textContent = this.ingredients[i];
        orderListEl.appendChild(list)
    }
}
Drink.prototype.renderTable = function () {
    let tr = document.createElement("tr");
    tableEl.appendChild(tr);

    let nameTd = document.createElement("td");
    nameTd.textContent = this.name;
    tr.appendChild(nameTd);

    let priceTd = document.createElement("td");
    priceTd.textContent = this.price;
    tr.appendChild(priceTd);
}

let latte = new Drink("Latte", ["milk", "ice", "sugar"], "./assets/latte.png", true, true, 1);
let mocha = new Drink("mocha", ["milk", "coffee", "ice", "sugar"], "./assets/mocha.png", true, false, 2);
let americano = new Drink("americano", ["milk", "coffee", "ice", "sugar"], "./assets/americano.png", true, false, 2)

function renderAll() {
    for (let i = 0; i < allDrinks.length; i++) {
        allDrinks[i].render();
        allDrinks[i].renderTable();
    }
}




// local storage:
function saveData(data) {

    let stringfiyData = JSON.stringify(data);
    localStorage.setItem("drinks", stringfiyData);
   
}


function getData() {
    let retrievedData = localStorage.getItem("drinks");
    // console.log(retrievedData);
  
    let arrayData = JSON.parse(retrievedData);
  
    console.log(arrayData);
    //create new instances from the constructor
    if (arrayData != null) {
      //how can I prevent print an already existing element in my array
      
      //arrayData inside allDrinks array -> dont create new instance for it 
      for (let i = allDrinks.length; i < arrayData.length; i++) {
        new Drink(
          arrayData[i].name,
          arrayData[i].ingredients,
          arrayData[i].image,
          arrayData[i].isCold,
          arrayData[i].isHot,
          arrayData[i].price
        );
      }
    }
    renderAll();
}

getData();