const lightModeButton = document.querySelector(".light");
const darkModeButton = document.querySelector(".dark");
const button = document.querySelectorAll(".button");

lightModeButton.addEventListener("click", () => {
  lightModeButton.classList.add("active");
  darkModeButton.classList.remove("active");
  document.querySelector("body").style.backgroundColor = "#ffffff";
  document.querySelector("body").style.color = "#22252d";
  document.querySelector(".mode").style.backgroundColor = "#f9f9f9";
  document.querySelector(".buttons").style.backgroundColor = "#f9f9f9";

  for (let i = 0; i < button.length; i++) {
    button[i].style.backgroundColor = "#f7f7f7";
    button[i].style.boxShadow = "2px 2px 8px 0 rgba(0, 0, 0, 0.25)";
    if (button[i].classList.contains("bnw")) {
      button[i].classList.add("button-lightmode");
      button[i].classList.remove("button-darkmode");
    }
  }
});

darkModeButton.addEventListener("click", () => {
  darkModeButton.classList.add("active");
  lightModeButton.classList.remove("active");
  document.querySelector("body").style.backgroundColor = "#22252d";
  document.querySelector("body").style.color = "#ffffff";
  document.querySelector(".mode").style.backgroundColor = "#292d36";
  document.querySelector(".buttons").style.backgroundColor = "#292d36";

  for (let i = 0; i < button.length; i++) {
    button[i].style.backgroundColor = "#272b33";
    button[i].style.boxShadow = "2px 2px 8px 0 rgba(0, 0, 0, 0.25)";
    if (button[i].classList.contains("bnw")) {
      button[i].classList.add("button-darkmode");
      button[i].classList.remove("button-lightmode");
    }
  }
});
