window.addEventListener('DOMContentLoaded', function(e){
    console.log("DOM fully loaded and parsed!");

    const pupsUrl = 'http://localhost:3000/pups'

    function fetchPups(){
        return fetch(pupsUrl)
        .then(function(response){
            return response.json();
        })
    }

    function fetchPup(pupId){
        return fetch(`${pupsUrl}/${pupId}`)
        .then(function(response){
            return response.json();
        })
    }

    function showPups(){
        fetchPups()
        .then(function(pups){
            renderAllPups(pups);
        })
    }

    function renderAllPups(pups){
        const dogBar = document.querySelector('#dog-bar')
        dogBar.innerHTML = ""

        pups.forEach(function(pup){
            let dogSpan = document.createElement('span')
            dogSpan.innerText = pup.name
            dogSpan.id = pup.id

            dogSpan.addEventListener('click', moreDogInfo)
    
            dogBar.appendChild(dogSpan);
        })
    }

    function renderPups(pup){
        const pupInfo = document.querySelector('#dog-info')
        pupInfo.innerHTML = ""

        let newImg = document.createElement('img')
        newImg.src = pup.image

        let h2Tag = document.createElement('h2')
        h2Tag.innerText = pup.name

        let pupButton = document.createElement('button')
        pupButton.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
        pupButton.id = pup.id
        pupButton.addEventListener('click', function(){
            toggleGoodBadPup(pup);
        })

        pupInfo.appendChild(newImg);
        pupInfo.appendChild(h2Tag);
        pupInfo.appendChild(pupButton);
    }

    function toggleGoodBadPup(pup){
        const pupId = pup.id
        let patchPup = {isGoodDog: !pup.isGoodDog}
        updatePup(pupId, patchPup)
        .then(function(pup){
            renderPups(pup);
        })
    }

    function updatePup(pupId, patchPup){
        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(patchPup)
        }
        return fetch(`${pupsUrl}/${pupId}`, configObject)
        .then(function(response){
            return response.json();
        })
    }

    function moreDogInfo(e){
        pupId = e.target.id
        fetchPup(pupId)
        .then(function(pup){
            renderPups(pup)
        })
    }

    function filterBtn(){
        const filterButton = document.querySelector('#good-dog-filter')
        filterButton.addEventListener('click', filterPups)
    }

    function filterPups(e){
        if(e.target.innerText === "Filter good dogs: OFF"){
            e.target.innerText = "Filter good dogs: ON"
            fetchPups()
            .then(pups => {renderAllPups(pups.filter(pup => pup.isGoodDog === true))})
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            showPups();
        }
    }

    fetchPups();
    showPups();
    // toggleGoodBadPup();
    filterBtn();
})

