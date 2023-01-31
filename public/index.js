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

function populateLocalScrollers(){
    var scrollerElems = document.getElementsByClassName('scroller');
    for(var i = 0; i < scrollerElems.length; i++){
        allScrollers.push(parseScrollerElem(scrollerElems[i]));
    }
}
function searchGo(){
    search = document.getElementById('search-bar-enter');
    sortScrollers(search.value);
}
function sortScrollers(context){
    if(context == ''){
        refreshPageScollers();
        return;
    }
    var scrollers = document.getElementsByClassName('scroller');
    for(var i = scrollers.length-1; i >=0; i--){
        scrollers[i].remove();
    }
    for(var i = 0; i < allScrollers.length; i++){
        if(context.includes('C:')){
            if(context.includes(allScrollers[i].carbs)){
                insertScroller(allScrollers[i]);
            }
        }
        if(context.includes('F:')){
            if(context.includes(allScrollers[i].fat)){
                insertScroller(allScrollers[i]);
            }
        }
        if(context.includes('P:')){
            if(context.includes(allScrollers[i].protein)){
                insertScroller(allScrollers[i]);
            }
        }
        if(allScrollers[i].title.includes(context)){
            insertScroller(allScrollers[i]);
        }
    }

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

        fetch('/jsondata', {
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

function refreshPageScollers(){
    var scrollers = document.getElementsByClassName('scroller');

    for(var i = scrollers.length-1; i >=0; i--){
        scrollers[i].remove();
    }

    allScrollers.forEach(scroller => {
        insertScroller(scroller);
    })
}

window.addEventListener('DOMContentLoaded', function(){
    populateLocalScrollers();
     var searchBtn = document.getElementById("search-button");
    if(searchBtn){
        searchBtn.addEventListener('click', searchGo);
    }
    var newScrollerModal = document.getElementById('add-post');
    if(newScrollerModal){
        newScrollerModal.addEventListener('click', showNewScrollerModal)
    }
    var newScrollerModalAccept = document.getElementById('modal-accept');
    if(newScrollerModalAccept){
        newScrollerModalAccept.addEventListener('click', addScroller)
    }
    var newScrollerModalCancel = document.getElementById('modal-cancel');
    if(newScrollerModalCancel){
        newScrollerModalCancel.addEventListener('click', cancelNewScrollerModal)
    }

    var modalClose = document.getElementById('modal-close');
    if(modalClose){
        modalClose.addEventListener('click', cancelNewScrollerModal)
    }
})