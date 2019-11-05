


const dogUrl = 'http://localhost:3000/pups'


document.addEventListener('DOMContentLoaded', function(){

 
getPups()
function getPups(){
     return fetch(dogUrl)
    .then(response => response.json())
    .then(pups => renderPups(pups))
    
}
//iterate through all pups

function renderPups(pups){
    pups.forEach(function(pup){
        renderPup(pup)
    })
}
function renderPup(pup){ 

    const div = document.querySelector('#dog-bar') 
    let span = document.createElement('span')
    span.className = 'dog-bar span'
    span.innerHTML = pup.name
    span.id = pup.id 

    div.append(span)

    span.addEventListener('click', function(){ 
        const summary = document.querySelector('#dog-summary-container')
        
        let img = document.createElement('img')
        img.className = 'dog-info img'
        img.src = pup.image
        
        let name = document.createElement('h2')
        name.className = 'dog-info'
        name = pup.name

        let button = document.createElement('button')
        button.className = 'dog-summary-container'
        button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!" //checks the value of dog
        button.id = pup.id

        summary.append(img, name, button)

        button.addEventListener('click', goodDogClick)
    

        }) 
    }

    function goodDogClick(e){ 
     if (e.target.innerText.includes('Good Dog')){
         e.target.innerText = 'Bad Dog'
          newValue = false
     }else {
        e.target.innerText = 'Good Dog'
        newValue = true


        
        }
     //function to update the status of dog 
     toggleGoodDogs(e.target.id, newValue).then(JSON.stringify)
    }




    function toggleGoodDogs(id, newValue){ 
        let configurationObject ={ 
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({
                isGoodDog: newValue
            })

        }

        return fetch(dogUrl + `/${id}`, configurationObject)
        .then(response => response.json())
    }


    //filter the dogs 
    //if the innerText includes off then render all the dogs 
    //else i dont know. 

    const filter = document.querySelector('#good-dog-filter')
    filter.addEventListener('click', function(e){
     //getPups().filter(e.target.innerText())
      fetch(dogUrl)
     .then(response => { response.json()})
     .then(dogs => {filterPups(dogs)} )
    })

    function filterPups(dogs){
        for(let i = 0; i < dogs.length; i++) 
        dogs[i]
        }
        
    

})

// fetch pup and render them 
// use span.