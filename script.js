
/* =========================
   SAMPLE RECIPES
========================= */

const starterRecipes = [

    {
        id: 1,
        name: "Spicy Tomato Pasta",
        category: "Dinner",
        time: "25 min",

        ingredients: [
            "Pasta",
            "Tomatoes",
            "Garlic",
            "Chili flakes",
            "Olive oil"
        ],

        instructions:
            "Boil pasta until al dente. Sauté garlic and chili in olive oil, add chopped tomatoes and simmer. Toss with pasta and finish with herbs.",

        image: "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🍝",

        description:
            "A cozy, fiery pasta with a quick tomato sauce."
    },

    {
        id: 2,
        name: "Golden Morning Pancakes",
        category: "Breakfast",
        time: "20 min",

        ingredients: [
            "Flour",
            "Milk",
            "Egg",
            "Baking powder",
            "Maple syrup"
        ],

        instructions:
            "Whisk dry ingredients. Add milk and egg and mix gently. Cook small rounds on a buttered pan until bubbles form, flip, and serve with syrup.",

        image: "https://images.unsplash.com/photo-1575853121743-60c24f0a7502?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🥞",

        description:
            "Fluffy pancakes for a slow, happy morning."
    },

    {
        id: 3,
        name: "Fresh Garden Bowl",
        category: "Lunch",
        time: "15 min",

        ingredients: [
            "Cucumber",
            "Cherry tomatoes",
            "Avocado",
            "Lettuce",
            "Lemon"
        ],

        instructions:
            "Chop vegetables and arrange in a bowl. Add avocado, squeeze lemon over everything, season, and toss lightly.",

        image: "https://plus.unsplash.com/premium_photo-1663011484926-f1f9132d827b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🥗",

        description:
            "Bright, crisp vegetables with a fresh lemon finish."
    },

    {
        id: 4,
        name: "Chocolate Brownie Bites",
        category: "Dessert",
        time: "35 min",

        ingredients: [
            "Chocolate",
            "Butter",
            "Sugar",
            "Eggs",
            "Flour"
        ],

        instructions:
            "Melt chocolate and butter. Whisk in sugar and eggs, fold in flour, and bake in a lined pan at 180°C until the center is just set. Cool before cutting.",

        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🍫",

        description:
            "Rich chocolate bites with a soft, fudgy center."
    },

    {
        id: 5,
        name: "Creamy Vegetable Soup",
        category: "Dinner",
        time: "30 min",

        ingredients: [
            "Carrot",
            "Potato",
            "Onion",
            "Vegetable stock",
            "Cream"
        ],

        instructions:
            "Sauté onion, add chopped vegetables and stock. Simmer until tender, blend until smooth, then stir in cream and season to taste.",

        image: "https://plus.unsplash.com/premium_photo-1700673590238-a0e3a3795ae2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🍲",

        description:
            "A comforting bowl with silky texture and simple ingredients."
    },

    {
        id: 6,
        name: "Berry Yogurt Toast",
        category: "Breakfast",
        time: "10 min",

        ingredients: [
            "Bread",
            "Greek yogurt",
            "Mixed berries",
            "Honey"
        ],

        instructions:
            "Toast bread until golden. Spread yogurt over the toast, top with berries, and drizzle with honey.",

        image: "https://plus.unsplash.com/premium_photo-1700262430605-14d94984235c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
        emoji: "🍓",

        description:
            "A quick sweet breakfast with creamy yogurt and berries."
    }

];


/* =========================
   ELEMENTS
========================= */

const recipeGrid =
    document.getElementById("recipeGrid");

const searchInput =
    document.getElementById("searchInput");

const recipeCount =
    document.getElementById("recipe-count");

const emptyState =
    document.getElementById("emptyState");

const recipeForm =
    document.getElementById("recipeForm");

const formMessage =
    document.getElementById("formMessage");


/* =========================
   LOCAL STORAGE
========================= */

const STORAGE_KEY = "flameForkRecipes";

let recipes;

try {

    const savedRecipes =
        localStorage.getItem(STORAGE_KEY);

    recipes = savedRecipes
        ? JSON.parse(savedRecipes)
        : starterRecipes;

    if (!Array.isArray(recipes)) {
        recipes = starterRecipes;
    }

} catch (error) {

    recipes = starterRecipes;

}


/* =========================
   FILTER
========================= */

let activeFilter = "All";


/* =========================
   SAVE RECIPES
========================= */

function saveRecipes() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(recipes)
        );

    } catch (error) {

        alert(
            "Unable to save recipes. Browser storage may be full."
        );

    }

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value || "").replace(
        /[&<>"']/g,

        function (character) {

            const characters = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"

            };

            return characters[character];

        }

    );

}


/* =========================
   DISPLAY RECIPES
========================= */

function displayRecipes() {

    const searchText = searchInput
        .value
        .trim()
        .toLowerCase();


    // Filter recipes

    const filteredRecipes = recipes.filter(
        function (recipe) {

            const matchesCategory =
                activeFilter === "All" ||
                recipe.category === activeFilter;


            const ingredients =
                recipe.ingredients.join(" ");


            const searchableText = (

                recipe.name + " " +
                recipe.category + " " +
                ingredients

            ).toLowerCase();


            const matchesSearch =
                searchableText.includes(searchText);


            return matchesCategory && matchesSearch;

        }
    );


    // Update total

    recipeCount.textContent = recipes.length;


    // Clear cards

    recipeGrid.innerHTML = "";


    // Empty search message

    emptyState.hidden =
        filteredRecipes.length > 0;


    // Create recipe cards

    filteredRecipes.forEach(function (recipe) {

        const card = document.createElement("div");

        card.className = "col-md-6 col-xl-4";


        // Image

        const imageContent = recipe.image

            ? `
                <img
                    src="${escapeHTML(recipe.image)}"
                    alt="${escapeHTML(recipe.name)}">

                <div
                    class="placeholder"
                    style="display:none">

                    ${escapeHTML(recipe.emoji || "🍴")}

                </div>
            `

            : `
                <div class="placeholder">

                    ${escapeHTML(recipe.emoji || "🍴")}

                </div>
            `;


        // Card HTML

        card.innerHTML = `

            <article class="recipe-card">


                <div class="recipe-image">

                    ${imageContent}

                    <span class="category-pill">

                        ${escapeHTML(recipe.category)}

                    </span>

                </div>


                <div class="recipe-content">


                    <div class="recipe-meta">

                        <span class="time">

                            ◷ ${escapeHTML(recipe.time)}

                        </span>

                        • 

                        ${recipe.ingredients.length}
                        ingredients

                    </div>


                    <h3>

                        ${escapeHTML(recipe.name)}

                    </h3>


                    <p>

                        ${escapeHTML(
                            recipe.description ||
                            recipe.instructions
                        )}

                    </p>


                    <div class="card-bottom
                                d-flex
                                justify-content-between
                                align-items-center">

                        <span class="ingredient-count">

                            ♡ Kitchen Favorite

                        </span>


                        <button
                            class="view-recipe"
                            data-id="${recipe.id}">

                            View Recipe ↗

                        </button>

                    </div>


                </div>

            </article>

        `;


        // Handle broken image

        const image = card.querySelector("img");

        if (image) {

            image.addEventListener("error", function () {

                image.style.display = "none";

                const placeholder =
                    image.nextElementSibling;

                if (placeholder) {

                    placeholder.style.display = "grid";

                }

            });

        }


        // Add card

        recipeGrid.appendChild(card);

    });

}


/* 
   VIEW RECIPE
 */

function viewRecipe(recipeId) {

    const recipe = recipes.find(function (item) {

        return String(item.id) === String(recipeId);

    });


    if (!recipe) {
        return;
    }


    // Modal title

    document.getElementById(
        "recipeModalTitle"
    ).textContent = recipe.name;


    // Category and time

    document.getElementById(
        "recipeModalMeta"
    ).textContent =

        recipe.category + " • " +
        recipe.time;


    // Ingredients

    document.getElementById(
        "recipeModalIngredients"
    ).innerHTML = recipe.ingredients.map(

        function (ingredient) {

            return `<li>${escapeHTML(ingredient)}</li>`;

        }

    ).join("");


    // Instructions

    document.getElementById(
        "recipeModalInstructions"
    ).textContent = recipe.instructions;


    // Open Bootstrap modal

    const modalElement =
        document.getElementById("recipeModal");

    const modal =
        bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();

}


/* 
   RECIPE CARD CLICK
 */

recipeGrid.addEventListener("click", function (event) {

    const button =
        event.target.closest(".view-recipe");


    if (button) {

        viewRecipe(button.dataset.id);

    }

});


/* 
   SEARCH
 */

searchInput.addEventListener("input", function () {

    displayRecipes();

});


/* 
   CATEGORY FILTER
*/

const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        activeFilter = button.dataset.filter;


        // Update active button

        filterButtons.forEach(function (item) {

            item.classList.remove("active");

        });


        button.classList.add("active");


        // Refresh recipes

        displayRecipes();

    });

});


/* 
   ADD RECIPE
 */

recipeForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Form data

    const formData =
        new FormData(recipeForm);


    // Name

    const name =
        formData.get("name").trim();


    // Category

    const category =
        formData.get("category");


    // Preparation time

    const time =
        formData.get("time").trim();


    // Ingredients

    const ingredients = formData
        .get("ingredients")
        .split(",")
        .map(function (ingredient) {

            return ingredient.trim();

        })
        .filter(function (ingredient) {

            return ingredient.length > 0;

        });


    // Instructions

    const instructions =
        formData.get("instructions").trim();


    // Image URL

    const image =
        formData.get("image").trim();


    // Check ingredients

    if (ingredients.length === 0) {

        formMessage.textContent =
            "Please add at least one ingredient.";

        return;

    }


    // Create new recipe

    const newRecipe = {

        id: Date.now(),

        name: name,

        category: category,

        time: time,

        ingredients: ingredients,

        instructions: instructions,

        image: image,

        emoji: "🍽️",

        description: instructions

    };


    // Add to collection

    recipes.unshift(newRecipe);


    // Save

    saveRecipes();


    // Update cards

    displayRecipes();


    // Reset form

    recipeForm.reset();


    // Success message

    formMessage.textContent =
        "Your recipe has been added to the collection!";


    // Bootstrap toast

    const toastElement =
        document.getElementById("toast");

    const toast =
        bootstrap.Toast.getOrCreateInstance(
            toastElement
        );

    toast.show();


    // Scroll to collection

    document.getElementById("recipes").scrollIntoView({

        behavior: "smooth"

    });

});


/* =========================
   INITIAL DISPLAY
========================= */

displayRecipes();
