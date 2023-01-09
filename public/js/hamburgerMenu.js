const hamburgerMenu = document.getElementById("hamburgerMenu")
const hamburgerMenuDropdown = document.querySelector(".hamburgerMenuDropdown")
const exitHamburgerMenu = document.getElementById("exitHamburgerMenu")
hamburgerMenu.addEventListener("click", () => {
    console.log('heya')
    hamburgerMenuDropdown.classList.remove("hamburgerMenuDropdown")
})
exitHamburgerMenu.addEventListener("click", () => {
    hamburgerMenuDropdown.classList.add("hamburgerMenuDropdown")
})


