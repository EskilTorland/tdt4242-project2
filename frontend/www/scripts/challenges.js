async function fetchExerciseTypes(request) {
    let response = await sendRequest("GET", `${HOST}/api/challenges/`);

    if (response.ok) {
        let data = await response.json();

        let challenges = data.results;
        let container = document.getElementById('div-content');
        let challengeTemplate = document.querySelector("#template-challenges");
        challenges.forEach(challenge => {
            const challengeAnchor = challengeTemplate.content.firstElementChild.cloneNode(true);
            challengeAnchor.href = `exercise.html?id=${exercise.id}`;

            const h5 = challengeAnchor.querySelector("h3");
            h5.textContent = challenge.name;

            const p = challengeAnchor.querySelector("p");
            p.textContent = challenge.description;   

            container.appendChild(challengeAnchor);
        });
    }

    return response;
}

window.addEventListener("DOMContentLoaded", async () => {
    let response = await fetchExerciseTypes();
    
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve challenge types!", data);
        document.body.prepend(alert);
    }
});

/** 
 * <div class="challenge-card">
                <h2>Challenge 1</h2>
                <p>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
                    Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
                    i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst.</p>
                <div class="d-grid">
                    <input type="button" class="btn btn-primary" id="btn-login" value="Register">
                </div>   
            </div>
            <div class="challenge-card">
                <h2>Challenge 2</h2>
                <p>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
                    Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
                    i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst.</p>
                <div class="d-grid">
                    <input type="button" class="btn btn-primary" id="btn-login" value="Register">
                </div>   
            </div>
            <div class="challenge-card">
                <h2>Challenge 3</h2>
                <p>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
                    Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
                    i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst.</p>
                <div class="d-grid">
                    <input type="button" class="btn btn-primary" id="btn-login" value="Register">
                </div>   
            </div>
            <div class="challenge-card">
                <h2>Challenge 4</h2>
                <p>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
                    Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
                    i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst.</p>
                <div class="d-grid">
                    <input type="button" class="btn btn-primary" id="btn-login" value="Register">
                </div>   
            </div>
            <div class="challenge-card">
                <h2>Challenge 5</h2>
                <p>Det er et velkjent faktum at lesere distraheres av lesbart innhold på en side når man ser på dens layout. 
                    Poenget med å bruke Lorem Ipsum er at det har en mer eller mindre normal fordeling av bokstaver i ord, 
                    i motsetning til 'Innhold her, innhold her', og gir inntrykk av å være lesbar tekst.</p>
                <div class="d-grid">
                    <input type="button" class="btn btn-primary" id="btn-login" value="Register">
                </div>   
            </div>
 */