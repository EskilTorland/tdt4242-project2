async function updateUser(event){
    let form = document.querySelector("#update-information");
    let formData = new FormData(form);

    
}
function handleClick(disabled){
    var form = document.querySelector("#update-information");
    var elements = form.elements;
    for (var i = 0, len = elements.length - 1; i < len; ++i) {
        elements[i].disabled = !elements[i].disabled;

    }
    if(elements[4].value = "Edit"){
        elements[4].value = "Save"
    }
    else{
        elements[4].value = "Edit"
    }
}

document.querySelector("#btn-update").addEventListener("click", () => handleClick());