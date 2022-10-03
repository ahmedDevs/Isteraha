const userimage=document.querySelector("#userimage");
const overlay=document.querySelector(".overlay");
const cross=document.querySelector(".overlay .fa-close");

userimage.addEventListener('click',function(){
   overlay.classList.remove('d-none');
}); 


cross.addEventListener('click',function(){
   overlay.classList.add('d-none');
});