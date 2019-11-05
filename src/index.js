document.addEventListener('DOMContentLoaded', function(){
    const dogsURI = "http://localhost:3000/pups"
    function fetchDogs(){ 
        return fetch(dogsURI)
            .then(response => {return response.json()})
    }

    function fetchDog(dogId){
        return fetch(`${dogsURI}/${dogId}`)
            .then(response =>{return response.json()})
    }

    function displayDogs(){
        fetchDogs().then(dogs => {renderDogs(dogs)})
    }

    function renderDogs(dogs){
        const dogbar = document.querySelector("#dog-bar")
        dogbar.innerHTML = ""

        dogs.forEach(dog => {
            let newSpan = document.createElement("span")

            newSpan.innerText = dog.name
            newSpan.id = dog.id

            newSpan.addEventListener('click', moreDogInfo)

            dogbar.appendChild(newSpan)
        })
    }

    function renderDog(dog){
        const dogInfo = document.querySelector("#dog-info")
        dogInfo.innerHTML = ""

        let newImg = document.createElement("img")
        newImg.src = dog.image

        let newH2 = document.createElement("h2")
        newH2.innerText = dog.name

        let newButton = document.createElement("button")
        newButton.innerText = isGoodDog(dog)
        newButton.id = dog.id
        newButton.addEventListener("click", () => toggleGoodBadDog(dog))

        dogInfo.appendChild(newImg)
        dogInfo.appendChild(newH2)
        dogInfo.appendChild(newButton)
    }

    function toggleGoodBadDog(dog){
        const dogId = dog.id
        const patchBody = {isGoodDog: !dog.isGoodDog}
        patchDog(dogId, patchBody)
            .then(dog => renderDog(dog))
    }

    function patchDog(dogId, patchBody){
        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(patchBody)
        }
        return fetch(`${dogsURI}/${dogId}`,configObject)
            .then(response => {return response.json()})
    }

    function isGoodDog(dog){
        switch(dog.isGoodDog){
            case true:
                return "Good Dog!"
            case false:
                return "Bad Dog!"
        }
    }
    
    function moreDogInfo(e){
        dogId = e.target.id
        fetchDog(dogId).then(dog => {renderDog(dog)})
    }

    function initFilter(){
        filterButton = document.getElementById("good-dog-filter")
        filterButton.addEventListener("click", filterDogs)
    }

    function filterDogs(e){

        if(e.target.innerText === "Filter good dogs: OFF"){
            e.target.innerText = "Filter good dogs: ON"
            fetchDogs().then(dogs => {renderDogs(dogs.filter(dog => dog.isGoodDog === true))})
        }else{
            e.target.innerText = "Filter good dogs: OFF"
            displayDogs()
        }

    }


    (function initPage(){
        displayDogs()
        initFilter()
    })()
})