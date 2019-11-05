 //CLICK ON DOGS IN THE DOG BAR TO SEE MORE INFO ABOUT THE GOOD PUPPER
document.addEventListener('DOMContentLoaded', function() {
const baseURI = "http://localhost:3000/pups"

fetch(baseURI)
.then(dogs => dogs.json())
.then(dogs => dogBar(dogs))

function showMeThatDoggo(dogid) {
    
    return fetch(`${baseURI}/${dogid}`)
    .then(response => {return response.json()})
}

function dogBar(dogs) {
    for(let i = 0; i < dogs.length; i ++) {
        // debugger
       showDog(dogs[i])
    }
}
function showDog(dog) {
    console.log(dog)
        addPupper = document.querySelector("#dog-bar")
        doggo = document.createElement("span")
        doggo.innerText = dog.name
        addPupper.appendChild(doggo).addEventListener("click", pupperino)
 //MORE INFO INCLUDES A DOG PIC, A DOG NAME, AND A DOG BUTTON THAT INDICATES WHETHER IT IS A GOOD DOG OR A BAD DOG
        function pupperino() {
            addDoggo = document.querySelector("#dog-info")
            dogImg = document.createElement("img")
            dogImg.src = dog.image
            dogName = document.createElement("h2")
            dogName.innerText = dog.name 
            addDoggo.appendChild(dogImg)
            addDoggo.appendChild(dogName)
            pupMoral = document.createElement("button")
            pupMoral.id = dog.id
            pupMoral.innerText = pupperMorality(dog)
            addDoggo.appendChild(pupMoral).addEventListener("click", (e) => updatePup(e))
        }
           
}
function pupperMorality(dog) {
    if (dog.isGoodDog == true) {
    return "Good Doggo!"
    }
    else {
    return "Bad Doggo!"
    }
}
 //CLICK ON GOOD DOG/BAD DOG BUTTON IN ORDER TO TOGGLE PUP GOODNESS two things should happen:
 //The button's text should change from Good to Bad or Bad to Good
 //The corresponding pup object in the database should be updated to reflect the new isGoodDog value
function updatePup(e) { 
    dogid = e.target.id
    dog = showMeThatDoggo(dogid).then(newdog => { theReupdate(newdog)})
}

function theReupdate(dog){
    const updatedPup = { 
        isGoodDog: !dog.isGoodDog
    }
    updatePupper(dog.id, updatedPup)
    .then(function(pupMoral){
        let button = document.querySelector(`button[id="${dog.id}"]`)
        button.innerText = pupperMorality(pupMoral)
    })
}

function updatePupper(dogid, updatedPup) {
  console.log(updatedPup)
    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(updatedPup)
        }
        console.log(configurationObject)
        return fetch(`${baseURI}/${dogid}`, configurationObject)
        .then(function(response){
            return response.json()
        })
}
 //CLICK ON "FILTER GOOD DOGS" BUTTON IN ORDER TO JUST SEE GOOD DOGS OR SEE ALL DOGS IN DOG BAR
// function filterPupperino() {
//     document.querySelector('#good-dog-filter').addEventListener("click", pupChanger)
// }
// function pupChanger(e) {
//     if(e.target.innerText === "Filter good dogs: OFF"){
//         e.target.innerText = "Filter good dogs: ON"

//     }
//     else{
//         e.target.innerText = "Filter good dogs: OFF"
//         fetch(baseURI)
//         .then(dogs => dogs.json())
//         .then(dogs => dogBar(dogs))
//     }
// }


})


