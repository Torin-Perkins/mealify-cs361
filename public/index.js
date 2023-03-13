var allScrollers = [];

function insertScroller(scrollerContext){
    console.log("Insert Contxt");
    var newScrollerHTML = Handlebars.templates.scroller(scrollerContext);
    var scrollerContainer = document.getElementById("scroller-boxes");
    scrollerContainer.insertAdjacentHTML('beforeend', newScrollerHTML);
}

function parseScrollerElem(scrollerElem){
    var newScroller = {
        title: scrollerElem.getAttribute('data-title'),
        description: scrollerElem.getAttribute('data-description'),
        photoURL: scrollerElem.getAttribute('data-photoURL'),
        carbs: scrollerElem.getAttribute('data-carbs'),
        fat: scrollerElem.getAttribute('data-fat'),
        protein: scrollerElem.getAttribute('data-protein')
    };
    console.log("==parsedScroller", newScroller);
    return newScroller;
}

function pasreJSONScrollers(jsonResponse){
    var scrollers = document.getElementsByClassName('scroller');
    for(var i = scrollers.length-1; i >=0; i--){
            scrollers[i].remove();
    }

            
    parsedData = JSON.parse(jsonResponse);
    console.log(parsedData);
            
            
            // Add the new data to the table
    for(var i = 0; i <= parsedData.length-1; i++){
            insertScroller(parsedData[i]);
    }
}

function runSearchAjax(){
    var ingredient = document.getElementById("search-bar-ingredient").value;
    var nutrient = document.getElementById("search-bar-nutrient").value;
    var symbol = document.getElementById("search-bar-symbol").value;
    var amount = document.getElementById("search-bar-nutrient-amount").value;
    var unit = document.getElementById("search-bar-unit").value;


    let data = {
        ingredient: ingredient, 
        nutrient: nutrient, 
        nutrientAmount: amount,
        unit: unit, 
        symbol: symbol
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/response", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            pasreJSONScrollers(xhttp.response);
           
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
   
}

function resetSearchAjax(){
    var ingredient = document.getElementById("search-bar-ingredient");
    var nutrient = document.getElementById("search-bar-nutrient");
    var symbol = document.getElementById("search-bar-symbol");
    var amount = document.getElementById("search-bar-nutrient-amount");
    var unit = document.getElementById("search-bar-unit");
    
    ingredient.value = '';
    nutrient.value = '';
    symbol.value = '';
    amount.value = '';
    unit.value = '';

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/reset", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            pasreJSONScrollers(xhttp.response);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send();
    
}

function addScrollerAjax(){
    var scroller_title = document.getElementById("new-scroller-title-input");
    var scroller_photo = document.getElementById("new-scroller-photo-input");
    var scroller_ingredients = document.getElementById("new-scroller-description-input");
    var scroller_carbs = document.getElementById("new-scroller-carbs-input");
    var scroller_fat = document.getElementById("new-scroller-fat-input");
    var scroller_protein = document.getElementById("new-scroller-protein-input");

    title_value = scroller_title.value;
    photo_value = scroller_photo.value;
    ingr_value = parseIngredientsList(scroller_ingredients.value);
    carbs_value = scroller_carbs.value;
    fat_value = scroller_fat.value;
    protein_value = scroller_protein.value;

    if(!title_value || !photo_value || !ingr_value || !carbs_value || !fat_value || !protein_value){
        alert("All fields must be filled!");
    }
    
    macroPercentage = calculateMacroPercantages(carbs_value, fat_value, protein_value);

    carb_perc = macroPercentage[0];
    fat_perc = macroPercentage[1];
    protein_perc = macroPercentage[2];

    let data = {
        title: title_value, 
        photoURL: photo_value, 
        ingredients: ingr_value,
        macroNutrientGrams: {carbs: carbs_value, protein: protein_value, fats: fat_value}, 
        macroNutrientPercentages: {carbs: carb_perc, protein: protein_perc, fats: fat_perc}
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            pasreJSONScrollers(xhttp.response);
            cancelNewScrollerModal();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));
}

function parseIngredientsList(ingredients){
    var ingredientsList = []
    var tempString = '';
    for(var i = 0; i < ingredients.length; i++){
        
        if(ingredients[i] == ',' || i == ingredients.length - 1){
            ingredientsList.push(tempString);
            tempString = '';
            continue;
        }
        tempString += ingredients[i]
    }

    return ingredientsList;
}

function calculateMacroPercantages(carbs, fats, proteins){
    var allMacros = [];

    let sumOfAllMacros = carbs + fats + proteins;
    let carbsPercent = (carbs/sumOfAllMacros) * 100;
    let fatsPercent = (fats/sumOfAllMacros) * 100;
    let proteinsPercent = (proteins/sumOfAllMacros) * 100;

    allMacros.push(carbsPercent);
    allMacros.push(fatsPercent);
    allMacros.push(proteinsPercent);

    return allMacros;
}
function showNewScrollerModal(){
    var scrollerModal = document.getElementById("new-scroller-modal");
    var addScrollMod = document.getElementById("add-scroll-mod");
    var modalBackDrop = document.getElementById("modal-backdrop");

    scrollerModal.classList.remove('hidden');
    addScrollMod.classList.remove('hidden');
    modalBackDrop.classList.remove('hidden');
}

function cancelNewScrollerModal(){
    const inputElements = document.querySelectorAll("new-scroller-input");
    inputElements.forEach(elem => {
        elem.value = '';
    })
    closeNewScrollerModal();
}

function closeNewScrollerModal(){
    var scrollerModal = document.getElementById("new-scroller-modal");
    var addScrollMod = document.getElementById("add-scroll-mod");
    var modalBackDrop = document.getElementById("modal-backdrop");

    scrollerModal.classList.add('hidden');
    addScrollMod.classList.add('hidden');
    modalBackDrop.classList.add('hidden');
}
function addScroller(){
    var scroller_title = document.getElementById("new-scroller-title-input").value;
    var scroller_photo = document.getElementById("new-scroller-photo-input").value;
    var scroller_description = document.getElementById("new-scroller-description-input").value;
    var scroller_carbs = document.getElementById("new-scroller-carbs-input").value;
    var scroller_fat = document.getElementById("new-scroller-fat-input").value;
    var scroller_protein = document.getElementById("new-scroller-protein-input").value;

    if(!scroller_title || !scroller_photo || !scroller_description || !scroller_carbs || !scroller_fat || !scroller_protein){
        alert("All fields must be filled");
    }
    {
        var newScroller = {
            title: scroller_title,
            photoURL: scroller_photo,
            description: scroller_description,
            carbs: scroller_carbs,
            fat: scroller_fat,
            protein: scroller_protein
        };
        allScrollers.push(newScroller);

        var newScrollerJString = JSON.stringify(newScroller);

        fetch('/add', {
            method: "POST",
            body: newScrollerJString,
            headers:{
                "Content-Type": "application/json",
                "Accept":"application/json",
            }
        })
        .catch(function(error){
            console.log(error)
        });
        insertScroller(newScroller);
        cancelNewScrollerModal()
    }
}



window.addEventListener('DOMContentLoaded', function(){
    //populateLocalScrollers();
     var searchBtn = document.getElementById("search-button");
    if(searchBtn){
        searchBtn.addEventListener('click', runSearchAjax);
    }
    
    var newScrollerModal = document.getElementById('add-post');
    if(newScrollerModal){
        newScrollerModal.addEventListener('click', showNewScrollerModal)
    }
    var newScrollerModalAccept = document.getElementById('modal-accept');
    if(newScrollerModalAccept){
        newScrollerModalAccept.addEventListener('click', addScrollerAjax)
    }
    var newScrollerModalCancel = document.getElementById('modal-cancel');
    if(newScrollerModalCancel){
        newScrollerModalCancel.addEventListener('click', cancelNewScrollerModal)
    }

    var modalClose = document.getElementById('modal-close');
    if(modalClose){
        modalClose.addEventListener('click', cancelNewScrollerModal)
    }
    
    var resetButton = document.getElementById("search-reset-button");
    if(resetButton){
        resetButton.addEventListener('click', resetSearchAjax)
    }
})