const checkBox = document.getElementById("remember-me")
const emailInput = document.getElementById("email-address")

if (localStorage.checkbox && localStorage.checkbox !== "") {
  checkBox.setAttribute("checked", "checked")
  emailInput.value = localStorage.username
} else {
  checkBox.removeAttribute("checked")
  emailInput.value = ""
}

function rememberMe() {
  if (checkBox.checked && emailInput.value !== "") {
    localStorage.username = emailInput.value
    localStorage.checkbox = checkBox.value
  } else {
    localStorage.username = ""
    localStorage.checkbox = ""
  }
}