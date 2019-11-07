document.addEventListener('DOMContentLoaded', function() {

    const dogsUrl = 'http://localhost:3000/pups'

    fetchDogs();
    dataDogs();
    filterDogs();

    function fetchDogs() {
        return fetch(dogsUrl)
        .then(function(response) {
            return response.json()
        })
    }

    function dataDogs() {
        fetchDogs()
        .then(function(dogs) {
            singleDog(dogs)
        })
    }

    function singleDog(dogs) {
        for (let i = 0; i < dogs.length; i++) {
            renderDogsBar(dogs[i])
        }
    }
    
    function renderDogsBar(dog) {
        const dogBar = document.getElementById('dog-bar');
        const dogElement = document.createElement('span');
        dogElement.id = `span${dog.id}`;
        dogElement.innerHTML = `${dog.name}`;
        dogBar.appendChild(dogElement);
        
        dogElement.addEventListener('click', function(e) {
            renderDoggo(dog);
        })
    }
    
    function renderDoggo(dog) {
        const dogInfo = document.querySelector('#dog-info');
        dogInfo.innerHTML = `
        <img src="${dog.image}" class="dog-image"/>
        <h2>${dog.name}</h2>
        <button id="dog-btn${dog.id}"></button>
        `;
    
        const goodBadButton = dogInfo.querySelector('button');
            if (dog.isGoodDog == true) {
                goodBadButton.innerText = "Good Dog!"
            } else if (dog.isGoodDog == false) {
                goodBadButton.innerText = "Bad Dog!"
            };
        goodBadButton.addEventListener('click', function(e) {
            updateDoggo(dog)
        })
    }
    
    function updateDoggo(dog) {
        if (dog.isGoodDog == true) {
            dog.isGoodDog = false
            goodBad = false
        } else if (dog.isGoodDog == false) {
            dog.isGoodDog = true
            goodBad = true
        }
    
        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: goodBad
            })
        }
    
        fetch(`${dogsUrl}/${dog.id}`, configObject)
        .then(function(response) {
            return response.json()
        })
        .then(function(dog) {
            renderDoggo(dog)
        })
    }
    
    // function filterDogs() {
    //     const dogFilter = document.getElementById('good-dog-filter');
    //     dogFilter.addEventListener('click', function(e) {
    //         if (dogFilter.innerText == "Filter good dogs: OFF") {
    //             dogFilter.innerText = "Filter good dogs: ON";
    //             fetchDogs()
    //             .then(function(dogs) {
    //                 singleDog(dogs.filter(function(dog) { dog.isGoodDog == true}))
    //             })
    //         } else if (dogFilter.innerText == "Filter good dogs: ON") {
    //             dogFilter.innerText = "Filter good dogs: OFF"
    //             fetchDogs()
    //             .then(function(dogs) {
    //                 singleDog(dogs)
    //             })
    //         }
    //     })
    // }

})











