import { createMainPageElement,createCategoryElement, createAreaElement, createIngredientElement } from "./createElement.js";
import {hideLoadingScreen, getData, showLoadingScreen} from "./functionality.js";

$(document).ready(async function() {
    showLoadingScreen();
    
    let mainPage = JSON.parse(sessionStorage.getItem("mainPage"));
    let apiLink = (mainPage !== null) ? mainPage.apiLink : null;
    let type = (mainPage !== null) ? mainPage.type : null;
    let data = await getData(apiLink ?? "https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let $mainContent = $(".main-content .container")

    hideLoadingScreen();

    if(type === "category") {
        for(let item of data.categories) {
            let element = createCategoryElement(item);
            $mainContent.append(element);
        }
    }
    else if(type === "area") {
        for(let item of data.meals) {
            let element = createAreaElement(item);
            $mainContent.append(element);
        }
    }
    else if(type === "ingredients") {
        for(let i = 0; i < 20; i++) {
            let element = createIngredientElement(data.meals[i]);
            $mainContent.append(element);
        }
    }
    else {
        let length = (data.meals.length < 20) ? data.meals.length : 19;
        for(let i = 0; i <= length; i++) {
            let element = createMainPageElement(data.meals[i]);
            $mainContent.append(element);
        }
    }
})