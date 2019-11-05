document.addEventListener("DOMContentLoaded", () => {
  const baseURI = 'http://localhost:3000/pups'
  renderDogs()

  function getDogs() {
    return fetch(baseURI)
      .then(res => res.json())
  }

  function renderDogs() {
    getDogs()
      .then(function(dogs) {
        for (const dog of dogs) {
          addToBarDiv(dog)
        }
      })
  }

  function addToBarDiv(dog) {
    const barSpan = document.createElement("span")
    barSpan.textContent = dog.name
    barSpan.id = dog.id
    barClick(barSpan)
    const barDiv = document.querySelector("#dog-bar")
    barDiv
    barDiv.appendChild(barSpan)
  }

  function barClick(barSpan) {
    barSpan.addEventListener('click', (e) => {
      getDogInfo(e)
    })
  }

  function getDogInfo(e) {
    const dogId = parseInt(e.target.id)
    fetch(`${baseURI}/${dogId}`)
      .then(res => res.json())
      .then(function(dog) {
        showDogInfo(dog)
      })
  }

  function showDogInfo(dog) {
    const dogName = dog.name
    const dogPic = dog.image
    const dogStatus = dog.isGoodDog
    const dogId = dog.id
    const infoDiv = document.querySelector("#dog-info")
    infoDiv.innerHTML = `
  <h2>${dogName}</h2>
  <img src="${dogPic}">
  <button id="goodStatus">${dogStatus ? "Good Dog!" : "Bad Dog!"}</button>
  `
    const goodButton = document.querySelector("#goodStatus")
    switchDogStatus(goodButton, dogId)
  }

  function switchDogStatus(goodButton, dogId) {
    goodButton.addEventListener('click', (e) => {
      const goodStatus = e.target.innerText
      updateStatus(goodStatus, dogId)
        .then(function(dog) {
          if (e.target.innerText.includes("Good")) {
            e.target.innerText = "Bad Dog"
          } else {
            e.target.innerText = "Good Dog"
          }
        })
    })
  }

  function updateStatus(goodStatus, dogId) {
    const configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: goodStatus
      })
    }
    return fetch(`${baseURI}/${dogId}`, configurationObject)
      .then(res => res.json())
  }

})
