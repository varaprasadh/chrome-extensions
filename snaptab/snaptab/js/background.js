 let desktopRequestId;

chrome.browserAction.onClicked.addListener(e=>{
    //send message to content script to take a snpa
    chrome.tabs.query({
        active:true,
        currentWindow:true
    },function(tabs){
          console.log(tabs);

                  desktopRequestId = chrome.desktopCapture.chooseDesktopMedia(["screen"],tabs[0], function (streamId, options) {
                  chrome.tabs.sendMessage(tabs[0].id, {
                      capture: true,
                      streamId,
                      options
                  });
          })
    })
})

//not using this
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
   if(request.stopCapture){
       chrome.desktopCapture.cancelChooseDesktopMedia(desktopRequestId)
   }
})