let selector = ".js-discover-person-card__action-btn.full-width.artdeco-button.artdeco-button--2.artdeco-button--full.artdeco-button--secondary.ember-view"

chrome.runtime.onMessage.addListener((request,sender,sendresponse)=>{
    console.log("message");
     if(request.invite){
         let persons = document.querySelectorAll(selector);
         console.log(persons);
         persons.forEach(person => {
             person.click();
         })
     }
})





