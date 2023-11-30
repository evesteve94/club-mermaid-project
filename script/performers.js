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

            const cardDescription = document.createElement('p');
            cardDescription.textContent = performer.description;

            const instagram = document.createElement('a');
            instagram.classList.add('insta');
            instagram.href = performer.instagram;
            instagram.target = '_blank';
            instagram.textContent = 'instagram';

            //append
            performersDiv.appendChild(card);
            card.appendChild(cardName);
            card.appendChild(cardTitle);
            card.appendChild(cardImg);
            card.appendChild(cardDescription);
            card.appendChild(instagram);
        })

    } else {
        console.log(`HTTP error message: ${response.status}`)
    }
}

getPerformers();