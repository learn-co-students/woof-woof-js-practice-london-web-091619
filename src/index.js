const baseURI = "http://localhost:3000/pups/"
const dogBar = document.querySelector("#dog-bar")
getDogs()

document
  .querySelector("#good-dog-filter")
  .addEventListener("click", toggleGoodDogFilter)

function goodDogFilterOn() {
  const filterText = document.querySelector("#good-dog-filter").textContent
  return filterText.split(" ")[3] === "ON"
}

function getDogs() {
  dogBar.innerHTML = ""
  fetchDogs().then(dogs => populateDogBar(dogs))
}

function getGoodDogs() {
  dogBar.innerHTML = ""
  fetchGoodDogs().then(dogs => populateDogBar(dogs))
}

function fetchDogs() {
  return fetch(baseURI).then(response => response.json())
}

function fetchGoodDogs() {
  return fetchDogs().then(dogs => {
    return dogs.filter(dog => dog.isGoodDog)
  })
}

function populateDogBar(dogs) {
  dogs.forEach(dog => injectDog(dog))
}

function injectDog(dog) {
  const span = document.createElement("span")
  span.textContent = dog.name
  span.id = dog.id
  span.addEventListener("click", e => {
    fetchDog(e.target.id).then(dog => showDog(dog))
  })
  dogBar.append(span)
}

function fetchDog(id) {
  return fetch(baseURI + id).then(response => response.json())
}

function showDog(dog) {
  const div = document.querySelector("#dog-info")
  div.innerHTML = ""

  const img = document.createElement("img")
  img.src = dog.image
  img.alt = "a very charming doggy"

  const h2 = document.createElement("h2")
  h2.textContent = dog.name

  const button = document.createElement("button")
  button.id = dog.id
  button.textContent = dog.isGoodDog ? "Bad Dog!" : "Good Dog!"
  button.addEventListener("click", toggleDogQuality)

  div.append(img, h2, button)
}

function toggleDogQuality(e) {
  const id = e.target.id
  changeDogQuality(id, e.target.textContent === "Good Dog!")
    .then(response => response.json())
    .then(updated_dog => {
      const button = e.target
      button.textContent = updated_dog.isGoodDog ? "Bad Dog!" : "Good Dog!"
      goodDogFilterOn() && getGoodDogs()
    })
}

function changeDogQuality(id, isGood) {
  const body = JSON.stringify({ isGoodDog: isGood })
  return patch(id, body)
}

function patch(id, body) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body
  }
  return fetch(baseURI + id, configObj)
}

function toggleGoodDogFilter(e) {
  const buttonTextBase = "Filter good dogs: "

  if (goodDogFilterOn()) {
    getDogs()
    e.target.textContent = buttonTextBase + "OFF"
  } else {
    getGoodDogs()
    e.target.textContent = buttonTextBase + "ON"
  }
}
