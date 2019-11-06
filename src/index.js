const baseURI = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", function () {
  fetch(baseURI)
    .then(response => response.json())
    .then(dogs => addPuppers(dogs));

  function addPuppers(dogs) {
    dogs.forEach(dog => pupperSpan(dog));
  }

  function pupperSpan(dog) {
    let dogBar = document.querySelector("#dog-bar");
    let dogSpan = document.createElement("span");
    dogSpan.innerHTML = `${dog.name}`;
    dogSpan.dataset.id = dog.id;
    dogSpan.addEventListener("click", clickPupperInfo);
    dogBar.append(dogSpan);
  }

  function clickPupperInfo(e) {
    fetchPupper(e.target.dataset.id).then(showPupperInfo);
  }

  function showPupperInfo(dog) {
    let dogInfo = document.querySelector("#dog-info");
    dogInfo.innerHTML = `
      <img src = ${dog.image}>
      <h2> ${dog.name} </h2>`;
    let goodBadButton = document.createElement("button");
    goodBadButton.textContent = "Good Doggy!";
    goodBadButton.id = dog.id
    goodBadButton.addEventListener("click", changePupperMorality);
    dogInfo.append(goodBadButton);
  }

  function changePupperMorality(e) {
    const dogId = e.target.id
    let floofer;
    if (e.target.innerText === "Good Doggy!") {
      e.target.innerText = "Bad Doggy!"
      floofer = {
        isGoodDog: false
      }
    } else {
      e.target.innerText = "Good Doggy!"
      floofer = {
        isGoodDog: true
      }
    }
    const configurationObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(floofer)
    };
    fetch(baseURI + `/${dogId}`, configurationObject)
      .then(r => r.json());
  }
  function fetchPupper(id) {
    return fetch(baseURI + `/${id}`).then(r => r.json());
  }
});




