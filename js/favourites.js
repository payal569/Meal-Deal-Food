const favouritesList = document.getElementById("favourites-list");
const mealCardsWrapper = document.getElementById("meal-cards-wrapper");
window.addEventListener("DOMContentLoaded", () => {
  addListItemtoCard();
});


function addListItemtoCard() {
  const data = localStorage.getItem("favourites");
  const meal = JSON.parse(data);

  if (meal.length == 0) { 
    emptyListTag = document.createElement("div");
    emptyListTag.id = "fav_null";
    emptyListTag.innerHTML = `<h1>Sir! Your table is ready ! Please add some food </h1><img src ="https://cdn-icons-png.flaticon.com/512/3521/3521843.png" height: 50% width = 50% />`;
    favouritesList.remove();
    mealCardsWrapper.append(emptyListTag);
  }

  meal.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.className = "booking-card";
    listItem.style.backgroundImage = `url(${element["strMealThumb"]})`;
    listItem.innerHTML = `
            <div class="book-container">
              <div class="content">
                <button class= "btn" onclick = "deletefromStorage(${element["idMeal"]})" >Remove from Favorites</button>
              </div>
            </div>
            <div class="informations-container">
              <h2 class="title">
              ${element["strMeal"]}
              </h2>
              <p class="sub-title">${element["strCategory"]}</p>
              <p class="price">
              <div class="more-information">
                <div class="info-and-date-container">
                  <div class="box info">
                    <svg
                      class="icon"
                      style="width: 24px; height: 24px"
                      viewBox="0 0 24 24"
                    >
                     
                    </svg>
                    <p ><a href = "javascript:void(0)" data-id =${element["idMeal"]}  id="desc-btn" onClick= "fetchById(${element["idMeal"]})">View Recipe</a></p>
                  </div>
                  
                 </div>
                  </div>
                <p class ="disclaimer"></p>
                  </div>`;

    favouritesList.append(listItem);
  });
}


function getFavourites() {
  let favourites = [];
  const isPresent = localStorage.getItem("favourites");
  if (isPresent) {
    favourites = JSON.parse(isPresent);
  }

  return favourites;
}



function deletefromStorage(id) {
  console.log(id);
  const favourites = getFavourites();
  let res;

  favourites.forEach((elem) => {
    if (elem["idMeal"] == id) {
      console.log();
      res = favourites.indexOf(elem);
      console.log(res);
    }
  });
  if (res != -1) {
    b = favourites.splice(res, 1);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
  location.reload();
}


const fetchById = (id) => {
  url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      obj = data;
      setToLocal(obj);
    })
    .catch((error) => {
      console.error("FETCH ERROR:", error);
    });
};


function setToLocal(obj) {
  const a = obj.meals;
  localStorage.setItem("mealsDesc", JSON.stringify(a[0]));
  window.location.href = "./recipe.html";
}
