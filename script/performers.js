//koppla till performers-div
const performersDiv = document.getElementById('performers');

//hämta från JSON
async function getPerformers(){
    const response = await fetch('./data/performers.json');

    if(response.ok){
        //hämta array
        const performers = await response.json();
        
        //foreach skapa element och ge värde
        performers.forEach(function(performer){
            const card = document.createElement('article');
            card.classList.add('card');

            const cardName = document.createElement('h4');
            cardName.textContent = performer.name;

            const cardTitle = document.createElement('h5');
            cardTitle.textContent = performer.title;

            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img');
            cardImg.src = performer.image;

            const btnInfo = document.createElement("button");
            btnInfo.classList.add("card-btn");
            //varje modal får ett unikt nummer för att kallas på/få unika evantListeners (se getModals)
            btnInfo.id = `openModalBtn${performers.indexOf(performer) + 1}` 
            btnInfo.textContent = "INFO";

            const modal = document.createElement("div");
            modal.classList.add("modal");
            //varje modal får ett unikt nummer för att kallas på/få unika evantListeners (se getModals)
            modal.id = `myModal${performers.indexOf(performer) + 1}`
            modal.innerHTML = `
              <div class="modal-content">
                <span id=closeModalBtn${performers.indexOf(performer) + 1} class="close">&times;</span>
                <h4>${performer.name}</h4>
                <h5>${performer.title}</h5>
                <p>${performer.description}</p>
                <a class="insta" href="${performer.instagram}" target="_blank">instagram</a>
              </div>
            `;

            //append
            performersDiv.appendChild(card);
            card.appendChild(cardName);
            card.appendChild(cardTitle);
            card.appendChild(cardImg);
            card.appendChild(btnInfo);
            card.appendChild(modal);
        })

    } else {
        console.log(`HTTP error message: ${response.status}`)
    }
    getModals();
}

getPerformers();
function getModals(){
    //hämtar ALLA modaler
    const modals = document.querySelectorAll(".modal");
    // hämtar alla öppna/stäng-knappar med attribut selektorer
    //[id^='...'] <-- hittar alla id som börjar med openModalBtn & closeModalBtn
    const openModalBtns = document.querySelectorAll("[id^='openModalBtn']");
    const closeModalBtns = document.querySelectorAll("[id^='closeModalBtn']");
    
    // loopar igenom varje modal och dess index (openModalBtn 1, 2, 3...) specificeras med [index]
    modals.forEach((modal, index) => {
        const openModalBtn = openModalBtns[index]; //1, 2, 3...
        const closeModalBtn = closeModalBtns[index]; //1, 2, 3...
    
        // visar modalen när knappen trycks -> ändrar class
        openModalBtn.onclick = function () {
            modal.classList.add("modal-showing");
        };
    
        // stänger med stäng-knappen -> ändrar class
        closeModalBtn.onclick = function () {
            modal.classList.remove("modal-showing");
            modal.classList.add("modal");
        };
    
        // stänger när användaren klickar utanför modalen
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.classList.remove("modal-showing");
                modal.classList.add("modal");
            }
        };
    });
    
    // stänger alla modaler när användaren klcikar utanför modalen
    window.onclick = function (event) {
        modals.forEach((modal) => {
            if (event.target === modal) {
                modal.classList.remove("modal-showing");
                modal.classList.add("modal");
            }
        });
    };
    }