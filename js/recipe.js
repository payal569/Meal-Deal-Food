const main = document.getElementsByTagName("main"); 

const leftContainer = document.getElementsByClassName("left-container"); 
const rightContainer = document.getElementsByClassName("right-container"); 

const dropdownIngredients = document.getElementById("section-dropdown"); 
const ingredientList = document.createElement("ul");

const mealdesc = localStorage.getItem("mealsDesc"); 
const mealDescription = JSON.parse(mealdesc);


const instructions = document.createElement("div");
instructions.id = "instruction-wrapper";
instructions.innerHTML = `
<h1>${mealDescription["strMeal"]}</h1>
<div id = "instructions">${mealDescription["strInstructions"]}</div>`;
leftContainer[0].append(instructions);


rightContainer[0].innerHTML = `<img src = "${mealDescription["strMealThumb"]}"  id ="thumbnail"/>`;


let strIngredient = [];
for (i = 1; i <= 20; i++) {
  strIngredient.push("strIngredient" + i);
}
let strMeasure = [];
for (i = 1; i <= 20; i++) {
  strMeasure.push("strMeasure" + i);
}
i = 0;
while (i <= 20) {
  a = strIngredient[i];
  b = strMeasure[i];

  if (mealDescription[a] == "" || mealDescription[a] == undefined) {
    i++;
    continue;
  }

  const ingredientListItem = document.createElement("li");
  ingredientListItem.innerHTML = `${mealDescription[a]} = ${mealDescription[b]}`;

  ingredientList.append(ingredientListItem);
  i++;
}

dropdownIngredients.append(ingredientList);
