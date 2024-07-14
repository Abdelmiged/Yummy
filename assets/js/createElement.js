import {storeData} from "./functionality.js";

export function createMainPageElement(data) {
    let element = `
    <div class="md:h-48 lg:h-60 xl:h-96 py-4 w-full md:w-3/12 px-4 rounded-md" mealid="${data.idMeal}">
        <div class="main-content__dish h-full w-full overflow-hidden relative rounded-md cursor-pointer group">
            <img class="object-cover rounded-md size-full" src="${data.strMealThumb}" alt="Food">
            <div class="main-content__dish-description overflow-hidden absolute size-full rounded-md flex justify-center items-center top-full left-0 group-hover:top-0 bg-[#f9f6f6ca] transition-all duration-500">
                <h2 class="text-center text-2xl font-semibold lg:text-3xl">${data.strMeal}</h2>
            </div>
        </div>
    </div>
    `;

    element = $(element).on("click", async function() {
        await storeData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(this).attr("mealid")}`);

        window.location.href = `${window.location.origin}/Yummy/assets/pages/details.html`;

        // For local testing
        // window.location.href = `${window.location.origin}/src/assets/pages/details.html`;
    });

    return element;
}

export function createListItem(data, recipe=true) {
    let itemString = `
        <li class="p-1 m-2 rounded-md ${(recipe) ? 'text-[#055160] bg-[#cff4fc] border-[#b6effb]' : 'text-[#842029] bg-[#f8d7da] border-[#f5c2c7]'}  border-2 ">${data}</li>
    `;
    return itemString;
}

export function createCategoryElement(data) {
    let element = `
        <div class="md:h-40 lg:h-48 xl:h-56 py-2 w-full md:w-3/12 px-2 rounded-md">
            <div class="main-content__dish h-full w-full overflow-hidden relative rounded-md cursor-pointer group">
                <img class="object-contain rounded-md size-full" src="${data.strCategoryThumb}" alt="Food">
                <div class="main-content__dish-description overflow-hidden absolute size-full rounded-md text-center top-full left-0 group-hover:top-0 p-3 bg-[#f9f6f6ca] transition-all duration-500">
                    <h2 class="category-header text-center text-2xl font-semibold lg:text-3xl">${data.strCategory}</h2>
                    <p>${data.strCategoryDescription}</p>
            </div>
        </div>
    `;

    element = $(element).on("click", function() {
        sessionStorage.setItem("mainPage", JSON.stringify({
            apiLink: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${$(this).find(".category-header").text()}`,
            type: "dish"
        }));
        location.reload();
    });

    return element;
}

export function createAreaElement(data) {
    let element = `
    <div class="md:h-40 lg:h-48 xl:h-56 py-4 w-full md:w-3/12 px-2 rounded-md">
        <div class="main-content__dish h-full w-full overflow-hidden relative rounded-md cursor-pointer group text-white text-center">
            <i class="fa-solid fa-house-laptop text-6xl"></i>
            <h2 class="area-header text-3xl font-semibold">${data.strArea}</h2>
        </div>
    </div>
    `;

    element = $(element).on("click", function() {
        sessionStorage.setItem("mainPage", JSON.stringify({
            apiLink: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${$(this).find(".area-header").text()}`,
            type: "dish"
        }));
        location.reload();
    });

    return element;
}

export function createIngredientElement(data) {
    let element = `
    <div class="md:h-40 lg:h-48 xl:h-56 py-4 w-full md:w-3/12 px-2 rounded-md">
        <div class="main-content__dish h-full w-full overflow-hidden relative rounded-md cursor-pointer group text-white text-center">
            <i class="fa-solid fa-drumstick-bite text-6xl"></i>
            <h2 class="ingredient-header text-3xl font-semibold">${data.strIngredient}</h2>
            <p class="ingredient-description">${data.strDescription}</p>
        </div>
    </div>
    `;

    element = $(element).on("click", function() {
        sessionStorage.setItem("mainPage", JSON.stringify({
            apiLink: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${$(this).find(".ingredient-header").text()}`,
            type: "dish"
        }));
        location.reload();
    });

    $(element).find(".ingredient-description").text(function(index, text) {
        let splitText = text.split(".");
        return splitText[0] + splitText[1];
    })

    return element;
}