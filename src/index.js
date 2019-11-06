document.addEventListener('DOMContentLoaded',function(){
    getPups()
    filterListener()
})



function getPups(x = false){
    fetch(`http://localhost:3000/pups`)
        .then (resp => resp.json())
        .then (json => renderPups(json,x))
}

function renderPups(json,filter = false){
    const length = json.length
     const filtered = []
     if (filter === true){
        
        for (let i = 0; i < length; i++)
            if (json[i].isGoodDog === true){
                filtered.push(json[i])
            }
            
    }
    
    if (filter === false){putThem(json)}
        else{putThem(filtered)}
        
    function putThem(arr){
    arr.forEach(pupObj => {

        

        const pupSpan = document.createElement("span")
        pupSpan.innerText = pupObj.name
        pupSpan.id = `pup ${pupObj.id}`
         pupSpan.addEventListener('click', function dogInfo(e){
            const dogInfo = document.getElementById("dog-info")
                
            const pic = document.createElement("img")
                pic.src=(pupObj.image)
            const name = document.createElement("h2")
                name.innerText = pupObj.name
            const natureButton = document.createElement("button")
                natureButton.id = e.target.id
                if (pupObj.isGoodDog === true) {natureButton.innerText = "Good dog!"}
                else {natureButton.innerText = "Bad dog!"}
            dogInfo.appendChild(pic)
            dogInfo.appendChild(name)
            dogInfo.appendChild(natureButton)

            natureButton.addEventListener('click', function (e){
            let val
                if (e.target.innerText === "Good dog!")
                    {val = false}
                else {val = true}
                 
               const idOfPup = parseInt(e.target.id.split(" ")[1])

                fetch(`http://localhost:3000/pups/${idOfPup}`,{  method: "PATCH",
                    headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "isGoodDog": val
                    })
                    })
                    
                if (e.target.innerText === "Bad dog!")
                    {e.target.innerText = "Good dog!"}
                else {e.target.innerText = "Bad dog!"}
            })
         })
        const dogBar = document.getElementById("dog-bar")
            dogBar.appendChild(pupSpan)
    });
}
}

function filterListener(){
    const filterBtn = document.getElementById("filter-div")
    filterBtn.addEventListener("click",function(){
        if (filterBtn.innerText === "Filter good dogs: OFF")
            {filterBtn.innerText = "Filter good dogs: ON"}
        else{filterBtn.innerText = "Filter good dogs: OFF"}
        
        if (filterBtn.innerText === "Filter good dogs: ON"){  
            const dogBar = document.getElementById("dog-bar")
            const lenth = dogBar.children.length

            for (let i= 0; i<lenth; i++){
                dogBar.removeChild(dogBar.children[0])
            }
        getPups(true)
        }
        else{
            const dogBar = document.getElementById("dog-bar")
            const lenth = dogBar.children.length

            for (let i= 0; i<lenth; i++){
                dogBar.removeChild(dogBar.children[0])
            }
        getPups(false)
        }
})
    
}



// function filter(){
//     fetch(`http://localhost:3000/pups`)
//         .then (resp => resp.json())
//         .then (json => filterPups(json))

// }

// function filterPups(json){
//     //itterate thru the json. for each dog check the is good and set an hidden element to the span with that id
//     json.forEach(pupObj => {console.log(pupObj.isGoodDog)
//         const currentId = pupObj.id
    
//         currentPup = document.getElementById(`pup ${currentId}`)
//         const hidden = document.createElement("p")
//         hidden.hidden = true
//         hidden.innerText = pupObj.isGoodDog
//         currentPup.appendChild(hidden)
//     })
//     const dogBr = document.getElementById("dog-bar")
//     for (i=0; i<dogBr.children.length; i++){
//         debugger
//             if (dogBr.children[i].children[0].innerText === "false"){               
//                  dogBr.children[i].remove()
//             }}
//     }
