chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
   if(request.Action==='SET_ALARM'){
       let milliseconds=request.TimeOut*60*1000;

       chrome.alarms.create("closer",{
           when:Date.now()+milliseconds
       })
   }
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm);
    chrome.tabs.query({
        active: true,
        currentWindow:true,  
    },(tabs)=>{
        console.log(tabs);
         chrome.tabs.sendMessage(tabs[0].id, {
             Action: "CLOSE_THE_PAGE"
         },(response)=>{
             console.log("sent to active tab");
         });
    })
})
chrome.omnibox.onInputEntered.addListener((text)=>{
    alert(text);
})
chrome.omnibox.setDefaultSuggestion({
    description:"test description"
})