/**    NOTIFICATION  **/
// cua so pop up
const popup = document.querySelector('.popup');
const close = document.querySelector('.close-popup')

window.onload = function(){
  setTimeout(function(){
    popup.style.display = "block"

     // Add some time delay to show popup
  },1500)
}
close.addEventListener('click',()=>{
   popup.style.display = "none"
})