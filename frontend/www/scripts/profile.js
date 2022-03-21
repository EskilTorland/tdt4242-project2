/// No time to implement..
async function updateUser(event){
    let form = document.querySelector("#update-information");
    let formData = new FormData(form);

    
}

/// Not working when we used template to get user information...
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

async function fetchProfile(request) {
    let currentUser = await getCurrentUser();
    console.log(currentUser);

    if (currentUser != null) {
        let container = document.getElementById('div-content');
        let profileForm = document.querySelector("#template-profile");
        const profileAnchor = profileForm.content.firstElementChild.cloneNode(true);

        const formPhone = profileAnchor.querySelector("#form-phone");
        formPhone.value = currentUser.phone_number;

        const formCountry = profileAnchor.querySelector("#form-country");
        formCountry.value = currentUser.country;
        
        const formCity = profileAnchor.querySelector("#form-city");
        formCity.value = currentUser.city;

        const formAddress = profileAnchor.querySelector("#form-address");
        formAddress.value = currentUser.street_address;

        container.appendChild(profileAnchor);
    }
    else{
        alert("Could not fetch profile");
    }

    return response;
}

window.addEventListener("DOMContentLoaded", async () => {
    let response = await fetchProfile();
    document.querySelector("#btn-update").addEventListener("click", () => handleClick());
    
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not fetch profile!", data);
        document.body.prepend(alert);
    }
});
