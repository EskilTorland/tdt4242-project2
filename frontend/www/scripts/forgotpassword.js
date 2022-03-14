/*
CLOSER LOOK WHEN DOING BACKEND. 
*/
async function reset() {
/*     let form = document.querySelector("#reset-form");
    let formData = new FormData(form);
    let body = {"email": formData.get("email")};

    let response = await sendRequest("POST", `${HOST}/api/token/`, body)
    if (response.ok) {
        let data = await response.json();
        alert("Please check your mail to reset password!");
    } else {
        let data = await response.json();
        let alert = createAlert("Login failed!", data);
        document.body.prepend(alert);
    } */
    alert("Please check your mail to reset password!");
};

document.querySelector("#btn-forgot").addEventListener("click", async () => await reset());