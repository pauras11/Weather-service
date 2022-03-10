console.log("File is loading");
const weatherFotm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

// msgOne.textContent = "loading";

function weather(local) {
  fetch(`http://localhost:3000/weather?add=${local}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = "";
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forcast;
      }
    });
  });
}

weatherFotm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  console.log();
  weather(location);
});
