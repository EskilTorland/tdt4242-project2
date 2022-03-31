let goBackButton;
let submitNewFileButton;

async function retrieveWorkoutImages(id) {  
    const response = await sendRequest("GET", `${HOST}/api/workouts/${id}/`);
    if (!response.ok) {
        const data = await response.json();
        const alert = createAlert("Could not retrieve workout data!", data);
        document.body.prepend(alert);
        return;
    }
    const workoutData = await response.json();

    document.getElementById("workout-title").innerHTML = `Workout name: ${workoutData.name}`;
    document.getElementById("workout-owner").innerHTML = `Owner: ${workoutData.owner_username}`;
    
    const noImageText = document.querySelector("#no-images-text");

    if(workoutData.files.length == 0){
        noImageText.classList.remove("hide");
        return;
    }

    noImageText.classList.add("hide");
        
    const filesDiv = document.getElementById("img-collection");
    const filesDeleteDiv = document.getElementById("img-collection-delete");
        
    const currentImageFileElement = document.querySelector("#current");

    let fileCounter = 0;

    for (const file of workoutData.files) {
        const anchor = createAnchorElement(file);  

        if(anchorIncludesImage(anchor)){
            const deleteImgButton = createDeleteButton(file);
            filesDeleteDiv.appendChild(deleteImgButton);
                
            const img = createImg(file)
            filesDiv.appendChild(img);
            
            deleteImgButton.style.left = `${(fileCounter % 4) * 191}px`;
            deleteImgButton.style.top = `${Math.floor(fileCounter / 4) * 105}px`;

            if(fileCounter == 0){
                currentImageFileElement.src = file.file;
            }
            fileCounter++;
        }
    }
    setStyleForImage();
    return workoutData;          
}

// NEW FUNCTIONS
function createAnchorElement(file) {
    const a = document.createElement("a");
    a.href = file.file;
    const pathArray = file.file.split("/");
    a.text = pathArray[pathArray.length - 1];
    a.className = "me-2";
    return a;
}

function createImg(file){
    const img = document.createElement("img");
    img.src = file.file;
    return img;
}

function createDeleteButton(file) {
    const deleteImgButton = document.createElement("input");
    deleteImgButton.type = "button";
    deleteImgButton.className = "btn btn-close";
    deleteImgButton.id = file.url.split("/")[file.url.split("/").length - 2];
    deleteImgButton.addEventListener('click', () => handleDeleteImgClick(deleteImgButton.id,
        "DELETE", `Could not delete workout ${deleteImgButton.id}!`,
        HOST, ["jpg", "png", "gif", "jpeg", "JPG", "PNG", "GIF", "JPEG"]));
    return deleteImgButton;
}

function anchorIncludesImage(anchor){
    return ["jpg", "png", "gif", "jpeg", "JPG", "PNG", "GIF", "JPEG"].includes(anchor.text.split(".")[1]);
}

function setStyleForImage(){
    const otherImageFileElements = document.querySelectorAll(".imgs img");
    const selectedOpacity = 0.6;
    otherImageFileElements[0].style.opacity = selectedOpacity;

    otherImageFileElements.forEach((imageFileElement) => imageFileElement.addEventListener("click", (event) => {
        //Changes the main image
        currentImageFileElement.src = event.target.src;

        //Adds the fade animation
        currentImageFileElement.classList.add('fade-in')
        setTimeout(() => currentImageFileElement.classList.remove('fade-in'), 500);

        //Sets the opacity of the selected image to 0.6
        otherImageFileElements.forEach((imageFileElement) => imageFileElement.style.opacity = 1)
        event.target.style.opacity = selectedOpacity;
    }))
}

// OLD FUNCTIONS
async function validateImgFileType(id, host_variable, acceptedFileTypes) {
    const file = await sendRequest("GET", `${host_variable}/api/workout-files/${id}/`);
    const fileData = await file.json();
    const fileType = fileData.file.split("/")[fileData.file.split("/").length - 1].split(".")[1];
    
    return acceptedFileTypes.includes(fileType);
}

async function handleDeleteImgClick (id, http_keyword, fail_alert_text, host_variable, acceptedFileTypes) {
    
    if(validateImgFileType(id, host_variable, acceptedFileTypes, )){
        return
    }

    const response = await sendRequest(http_keyword, `${host_variable}/api/workout-files/${id}/`);

    if (!response.ok) {
        const data = await response.json();
        const alert = createAlert(fail_alert_text, data);
        document.body.prepend(alert);
        return; 
    }
    location.reload();
}

function handleGoBackToWorkoutClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.location.replace(`workout.html?id=${id}`);
}

window.addEventListener("DOMContentLoaded", async () => {
    goBackButton = document.querySelector("#btn-back-workout");
    goBackButton.addEventListener('click', handleGoBackToWorkoutClick);
});