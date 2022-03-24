let cancelButton;
let okButton;
let deleteButton;
let editButton;
let oldFormData;

class MuscleGroup { 
    constructor(type) {
        this.isValidType = false;
        this.validTypes = ["Legs", "Chest", "Back", "Arms", "Abdomen", "Shoulders"]

        this.type = this.validTypes.includes(type) ? type : undefined;
    }

    setMuscleGroupType = (newType) => {
        this.isValidType = false;
        
        if(this.validTypes.includes(newType)){
            this.isValidType = true;
            this.type = newType;
        }
        else{
            alert("Invalid muscle group!");
        }
    }
    
    getMuscleGroupType = () => {
        console.log(this.type, "SWIOEFIWEUFH")
        return this.type;
    }
}

function handleCancelButtonDuringEdit() {
    
    document.querySelector("select").setAttribute("disabled", "")
    hideButtonDuringEdit();

    cancelButton.removeEventListener("click", handleCancelButtonDuringEdit);

    const form = document.querySelector("#form-exercise");
    if (oldFormData.has("name")) form.name.value = oldFormData.get("name");
    if (oldFormData.has("description")) form.description.value = oldFormData.get("description");
    if (oldFormData.has("duration")) form.duration.value = oldFormData.get("duration");
    if (oldFormData.has("calories")) form.calories.value = oldFormData.get("calories");
    if (oldFormData.has("muscleGroup")) form.muscleGroup.value = oldFormData.get("muscleGroup");
    if (oldFormData.has("unit")) form.unit.value = oldFormData.get("unit");
    
    deleteOldFormData();
}

function handleCancelButtonDuringCreate() {
    window.location.replace("exercises.html");
}

async function createExercise() {
    document.querySelector("select").removeAttribute("disabled")
    const form = document.querySelector("#form-exercise");
    const formData = new FormData(form);
    const body = {"name": formData.get("name"), 
                "description": formData.get("description"),
                "duration": formData.get("duration"),
                "calories": formData.get("calories"),
                "muscleGroup": formData.get("muscleGroup"), 
                "unit": formData.get("unit")};

    const response = await sendRequest("POST", `${HOST}/api/exercises/`, body);

    if (response.ok) {
        window.location.replace("exercises.html");
        return;
    }
    const data = await response.json();
    const alert = createAlert("Could not create new exercise!", data);
    document.body.prepend(alert);
}

function handleEditExerciseButtonClick() {
    setReadOnly(false, "#form-exercise");

    document.querySelector("select").removeAttribute("disabled")

    editButton.className += " hide";
    okButton.className = okButton.className.replace(" hide", "");
    cancelButton.className = cancelButton.className.replace(" hide", "");
    deleteButton.className = deleteButton.className.replace(" hide", "");

    cancelButton.addEventListener("click", handleCancelButtonDuringEdit);

    const form = document.querySelector("#form-exercise");
    oldFormData = new FormData(form);
}

async function deleteExercise(id) {
    const response = await sendRequest("DELETE", `${HOST}/api/exercises/${id}/`);
    if (!response.ok) {
        const data = await response.json();
        const alert = createAlert(`Could not delete exercise ${id}`, data);
        document.body.prepend(alert);
    } else {
        window.location.replace("exercises.html");
    }
}

async function retrieveExercise(id) {
    const response = await sendRequest("GET", `${HOST}/api/exercises/${id}/`);

    console.log(response.ok)

    if (!response.ok) {
        const data = await response.json();
        const alert = createAlert("Could not retrieve exercise data!", data);
        document.body.prepend(alert);
        return;
    }
    document.querySelector("select").removeAttribute("disabled")
    const exerciseData = await response.json();
    const form = document.querySelector("#form-exercise");
    const formData = new FormData(form);

    for (const key of formData.keys()) {
        const selector = key !== "muscleGroup" ? `input[name="${key}"], textarea[name="${key}"]` : `select[name=${key}]`
        const input = form.querySelector(selector);
        const newVal = exerciseData[key];
        input.value = newVal;
    }
    document.querySelector("select").setAttribute("disabled", "")
}

async function updateExercise(id) {
    const form = document.querySelector("#form-exercise");
    const formData = new FormData(form);

    const muscleGroupSelector = document.querySelector("select")
    muscleGroupSelector.removeAttribute("disabled")

    const selectedMuscleGroup = new MuscleGroup(formData.get("muscleGroup"));

    const body = {"name": formData.get("name"), 
                "description": formData.get("description"),
                "duration": formData.get("duration"),
                "calories": formData.get("calories"),
                "muscleGroup": selectedMuscleGroup.getMuscleGroupType(),
                "unit": formData.get("unit")};
    const response = await sendRequest("PUT", `${HOST}/api/exercises/${id}/`, body);

    if (!response.ok) {
        const data = await response.json();
        const alert = createAlert(`Could not update exercise ${id}`, data);
        document.body.prepend(alert);
        return;
    }
    muscleGroupSelector.setAttribute("disabled", "")
    hideButtonDuringEdit();
    
    cancelButton.removeEventListener("click", handleCancelButtonDuringEdit);
        
    deleteOldFormData();
}

function hideButtonDuringEdit(){
    setReadOnly(true, "#form-exercise");
    okButton.className += " hide";
    deleteButton.className += " hide";
    cancelButton.className += " hide";
    editButton.className = editButton.className.replace(" hide", "");
}

function deleteOldFormData(){
    oldFormData.delete("name");
    oldFormData.delete("description");
    oldFormData.delete("duration");
    oldFormData.delete("calories");
    oldFormData.delete("muscleGroup");
    oldFormData.delete("unit");
}

window.addEventListener("DOMContentLoaded", async () => {
    cancelButton = document.querySelector("#btn-cancel-exercise");
    okButton = document.querySelector("#btn-ok-exercise");
    deleteButton = document.querySelector("#btn-delete-exercise");
    editButton = document.querySelector("#btn-edit-exercise");
    oldFormData = null;

    const urlParams = new URLSearchParams(window.location.search);

    // view/edit
    if (urlParams.has('id')) {
        const exerciseId = urlParams.get('id');
        await retrieveExercise(exerciseId);

        editButton.addEventListener("click", handleEditExerciseButtonClick);
        deleteButton.addEventListener("click", (async (id) => await deleteExercise(id)).bind(undefined, exerciseId));
        okButton.addEventListener("click", (async (id) => await updateExercise(id)).bind(undefined, exerciseId));
        return;
    } 
    //create
    setReadOnly(false, "#form-exercise");

    editButton.className += " hide";
    okButton.className = okButton.className.replace(" hide", "");
    cancelButton.className = cancelButton.className.replace(" hide", "");

    okButton.addEventListener("click", async () => await createExercise());
    cancelButton.addEventListener("click", handleCancelButtonDuringCreate);
});