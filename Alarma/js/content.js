let slide = `<div class="left">
               <div class="text"> it 's enough</div>
             </div>
             <div class="right"></div>`

document.body.innerHTML=slide+document.body.innerHTML;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("message");

    if(request.Action==="CLOSE_THE_PAGE"){
        document.querySelector('.left').classList.add('close');
        document.querySelector('.right').classList.add('close');
    }
})