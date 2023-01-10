const hamburgerMenu = document.getElementById("hamburgerMenu")
const hamburgerMenuDropdown = document.querySelector(".hamburgerMenuDropdown")
const exitHamburgerMenu = document.getElementById("exitHamburgerMenu")
hamburgerMenu.addEventListener("click", () => {
    hamburgerMenuDropdown.classList.remove("hamburgerMenuDropdown")
})
exitHamburgerMenu.addEventListener("click", () => {
    hamburgerMenuDropdown.classList.add("hamburgerMenuDropdown")
})


