import {createListItem} from "./createElement.js";
import { hideLoadingScreen } from "./functionality.js";

$(document).ready(function() {
    hideLoadingScreen();
    
    let currentDetails = JSON.parse(sessionStorage.getItem("currentDetails"));
    $(".main-content__image").attr("src", currentDetails.imageSource);
    $(".main-content__image-title").text(currentDetails.title);
    $(".main-content__instructions").text(currentDetails.instructions);
    $(".main-content__area-value").text(currentDetails.area);
    $(".main-content__category-value").text(currentDetails.category);
    populateList(currentDetails.recipes);
    populateList(currentDetails.tags, false);
    $(".source-link").attr("href", currentDetails.source);
    $(".youtube-link").attr("href", currentDetails.youtube);
})

function populateList(data, recipe=true) {
    if(data === null)
        return;

    let $List = (recipe) ? $(".main-content__recipes-list") : $(".main-content__tags-list");
    for(let i = 0; i < data.length; i++) {
        let item = createListItem(data[i], recipe);
        $List.append(item);
    }
}