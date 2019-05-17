chrome.browserAction.onClicked.addListener((e) => {
   chrome.tabs.query({
       currentWindow:true
   },function(tabs){
       tabs.forEach( (tab,i)=> {
           setTimeout(() => {
                chrome.tabs.move(tab.id,{index:-1}); 
           }, i*100);
       });
   })
});