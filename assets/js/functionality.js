import MealDetails from "./mealDetails.js";

$(".sidenav__controller-button").on("click", function() {
    if($(".sidenav").hasClass("-left-[15.8rem]")) {
        $(".sidenav").removeClass("-left-[15.8rem]").addClass("left-0");
        $(this).children().eq(0).toggleClass("hidden");
        $(this).children().eq(1).toggleClass("hidden");
        showLinks();
    }
    else {
        $(".sidenav").removeClass("left-0").addClass("-left-[15.8rem]");
        $(this).children().eq(0).toggleClass("hidden");
        $(this).children().eq(1).toggleClass("hidden");
        hideLinks();
    }
})

function showLinks() {
    $(".sidenav__links-list").animate({
        bottom: "0"
    }, 0);

    $(".sidenav__link").first().animate({
        bottom: "0"
    },
    {
        duration: 350,
        start: function showNext() {
            $(this).next().delay(90).animate({
                bottom: "0"
            },
            {
                duration: 350,
                start: showNext
            })
        }
    })
}

function hideLinks() {
    $(".sidenav__links-list").animate({
        bottom: "-7rem"
    }, 250, function() {
        $(".sidenav__link").animate({
            bottom: "-8rem"
        }, 0);
    }) 
}

export function showLoadingScreen() {
    $(".loading-screen").animate({
        opacity: "1"
    },
    {
        duration: 0,
        complete: function() {
            $(this).removeClass("hidden");
        }
    })
}

export function hideLoadingScreen() {
    $(".loading-screen").animate({
        opacity: "0"
    },
    {
        duration: 750,
        complete: function() {
            $(this).addClass("hidden");
        }
    })
}

export async function getData(link) {
    let response = await fetch(link);
    let data = await response.json();
    return data;
}

export async function storeData(link) {
    let data = await getData(link);
    let mealDetails = new MealDetails(
        data.meals[0].strMeal,
        data.meals[0].strMealThumb,
        data.meals[0].strInstructions,
        data.meals[0].strArea,
        data.meals[0].strCategory,
        organizeRecipes(data.meals[0]),
        (data.meals[0].strTags !== null) ? data.meals[0].strTags.split(/[,\s]+/gi).filter(function(item) {
            return item != "";
        }) : null,
        data.meals[0].strSource,
        data.meals[0].strYoutube
    )
    sessionStorage.setItem("currentDetails", JSON.stringify(mealDetails));
}

function organizeRecipes(data) {
    let recipes = [];
    for(let i = 1; i <= 20; i++) {
        if(data[`strIngredient${i}`] != "" && data[`strMeasure${i}`] != "") {
            let recipe = data[`strMeasure${i}`] + ' ' + data[`strIngredient${i}`];
            recipes.push(recipe);
        }
        else
            return recipes;
    }
    return recipes;
}

$(".sidenav__link-home").on("click", function() {
    sessionStorage.setItem("mainPage", JSON.stringify({
        apiLink: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        type: "dish"
    }))
})

$(".sidenav__link-categories").on("click", function() {
    sessionStorage.setItem("mainPage", JSON.stringify({
        apiLink: "https://www.themealdb.com/api/json/v1/1/categories.php",
        type: "category"
    }))
});

$(".sidenav__link-area").on("click", function() {
    sessionStorage.setItem("mainPage", JSON.stringify({
        apiLink: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
        type: "area"
    }))
})

$(".sidenav__link-ingredients").on("click", function() {
    sessionStorage.setItem("mainPage", JSON.stringify({
        apiLink: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
        type: "ingredients"
    }))
})