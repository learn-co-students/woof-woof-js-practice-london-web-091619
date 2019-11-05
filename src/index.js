document.addEventListener('DOMContentLoaded', () => {

const mainUrl = "http://localhost:3000/pups"

    fetch(mainUrl)
    .then(data => data.json())
    .then(data => displayDogs(data))

    function displayDogs(dogs){
        for(let i = 0; i < dogs.length; i++){
            displayDog(dogs[i])
        }
    }

    function displayDog(dog){
        const dogbar = document.querySelector('#dog-bar')
        const span = document.createElement('span')
        span.innerHTML = dog.name
        dogbar.appendChild(span)
        span.addEventListener('click', function(e){
            renderDog(dog)
            goodDogFilter(dog)
        })
    }

    function renderDog(e){
        debugger
        const dogInfo = document.querySelector('#dog-info')
        const div = document.createElement('div')
        const dogId = e
        div.innerHTML = `
        <img src=${e.image} />
        <h2> ${e.name} </h2>
        <button class='goodBoy' id=${dogId.id}> Good Dog! </button>
        `
        dogInfo.appendChild(div)

        const goodBoyButton = div.children[div.children.length -1]
        if (e.isGoodDog === true){
        goodBoyButton.innerHTML = 'Good Dog!'
        } else   { goodBoyButton.innerHTML = 'Bad Dog!'}

        goodBoyButton.addEventListener('click', toggleBoy)
    }

    function toggleBoy(e){
        let goodDog = null 
        if(e.target.innerText === 'Good Dog!'){
            e.target.innerText = 'Bad Dog!'
            goodDog = false
        }
        else if(e.target.innerText === 'Bad Dog!'){
            e.target.innerText = 'Good Dog!'
            goodDog = true
        }
        const dogId = parseInt(e.target.id)
        configObject = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: goodDog
            })
        }
        fetch(`http://localhost:3000/pups/${dogId}`, configObject)
            .then(function(response){
                return response.json()
            })
    }

    // find the button, change the value from off to on
    // than it should invoke filter option, which loops thourgh dogs and filters them out based on their attribute

    // const dogsFilter = document.querySelector('#good-dog-filter')
    //         const on = 'Filter good dogs: ON'
    //         const off = 'Filter good dogs: OFF'
    //     dogsFilter.addEventListener('click', function(e){
    //         e.target.innerText= on
    //         if(e.target.innerText === on){
    //             function goodDogFilter(){
    //                 dog.forEach(attribute=> {
    //                     console.log(attribute.isGoodDog)
    //                 })
    //                 debugger
    //             }
    //         }
    //     })



})