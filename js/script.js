const loadMeals = (search) => {
     const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
     const cardContainer = document.getElementById('card-container');
     cardContainer.innerHTML = '';

     meals.forEach(meal => {
          console.log(meal);
          const div = document.createElement('div');
          div.classList.add('col-4');
          div.innerHTML = `
               <div class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="No image found">
                    <div class="card-body">
                         <h5 class="card-title">${meal.strMeal}</h5>
                         <p class="card-text">Tags: ${meal.strTags}</p>
                         <p class="card-text">Instructions: ${meal.strInstructions.slice(0, 150)}...</p>
                         <button class="btn btn-primary" onclick="displayMealDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">Food Details</button>
                    </div>
               </div>
          `;
          cardContainer.appendChild(div);
     })
}

const searchFood = () => {
     const inputField = document.getElementById('search-field');
     const inputFieldValue = inputField.value;
     loadMeals(inputFieldValue);
     inputField.value = '';
}

const displayMealDetails = mealId => {
     const url = `https://www.theemaldb.com/api/json/v1/1/lookup.php?i=${mealId}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayDetails(data.meals[0]))
     .catch(error => console.log(error))
}

const displayDetails = mealDetail => {
     console.log(mealDetail);
     const modalSection = document.getElementById('modal-section');
     const div = document.createElement('div');
     div.innerHTML = `
          <div class="modal fade" id="exampleModal">
               <div class="modal-dialog">
                    <div class="modal-content">
                         <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">${mealDetail.strMeal}</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                              ...
                         </div>
                         <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         </div>
                    </div>
               </div>
          </div>
     `;
     modalSection.appendChild(div);
}