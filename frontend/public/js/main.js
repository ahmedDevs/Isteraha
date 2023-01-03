// const userimage=document.querySelector("#userimage");
// const overlay=document.querySelector(".overlay");
// const cross=document.querySelector(".overlay .fa-close");

// userimage.addEventListener('click',function(){
//    overlay.classList.remove('d-none');
// }); 


// cross.addEventListener('click',function(){
//    overlay.classList.add('d-none');
// });


// const hidden = document.querySelector('.hidden')
const editProfileForm = document.querySelector('.editProfileForm')
const mainContainerProfile = document.querySelector('.mainContainerProfile')
const editButton = document.querySelector('.editButton')
const submitButton = document.querySelector('.submitButton')
const cancelButton = document.querySelector('.cancelButton')

editButton.addEventListener('click', () => {
   mainContainerProfile.classList.add('hidden')
   editProfileForm.classList.remove('hidden')
})
cancelButton.addEventListener('click', () => {
   editProfileForm.classList.add('hidden')
   mainContainerProfile.classList.remove('hidden')
   
})