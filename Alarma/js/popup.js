window.onload=function(){
   var min=document.querySelector('#min');
  

 var submitBtn=document.querySelector('.submit');
  submitBtn.addEventListener('click',e=>{
      //send message to the background
      chrome.runtime.sendMessage({
          Action:"SET_ALARM",
          TimeOut:Number(min.value)
      })
  })
}