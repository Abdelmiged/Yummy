import { getData, showLoadingScreen, hideLoadingScreen } from "./functionality.js";
import { createMainPageElement } from "./createElement.js";

$(".name-field").on("input", async function() {
    let data = await getData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$(this).val()}`);

    showLoadingScreen();

    if(data.meals === null) {
        hideLoadingScreen();
        return;
    }
    
    $(".main-content .container").empty();

    hideLoadingScreen();

    for(let item of data.meals) {
        let element = createMainPageElement(item);
        $(".main-content .container").append(element);
    }
})

$(".first-letter-field").on("input", async function() {
    let data = await getData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${$(this).val()}`);

    showLoadingScreen();

    if(data.meals === null) {
        hideLoadingScreen();
        return;
    }

    $(".main-content .container").empty();

    hideLoadingScreen();

    for(let item of data.meals) {
        let element = createMainPageElement(item);
        $(".main-content .container").append(element);
    }
})