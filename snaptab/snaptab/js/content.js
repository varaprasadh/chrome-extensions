chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
   if(request.capture){
       //take a snap
       let id=request.streamId;
       let options=request.options;
       
         if (!id) {
             console.log('Access rejected.');
             return;
         }
           console.log(id);
        navigator.mediaDevices.getUserMedia({
             audio: false,
                 video: {
                     mandatory: {
                         chromeMediaSource: 'desktop',
                         chromeMediaSourceId: id,
                         maxWidth: screen.width,
                         maxHeight: screen.height
                     }
                 }
        }).then(onStream).catch(onError);
    
   }
})

function onStream(stream){
    console.log(stream);
    let video=document.createElement('video');
    video.srcObject=stream;
    video.onloadeddata=function(){
        video.play();
        let canvas = document.createElement('canvas');
        canvas.width = screen.width;
        canvas.height = screen.height;
        let ctx = canvas.getContext('2d');
       setTimeout(() => {
            ctx.drawImage(video, 0, 0, screen.width, screen.height);
            let dataUrl = canvas.toDataURL();
            console.log(dataUrl);
            let screenShot = document.createElement('img');
            screenShot.src = dataUrl;
            screenShot.classList.add('screenshot');
            document.body.prepend(screenShot);
            let donwloadHelper=document.createElement('a');
            donwloadHelper.href=dataUrl;
            donwloadHelper.download = "screenshot_" + new Date().getTime()+".png";
            document.body.append(donwloadHelper);
            donwloadHelper.click();
            //remove screenshot element after display
            setTimeout(() => {
                 screenShot.classList.add('hide');
            }, 1700);
            
             //stop recording
            //  chrome.runtime.sendMessage({
            //      stopCapture:true
            //  });

             stopCapturing(stream)

        
       }, 1000);
    }
   

}
function onError(err){
    console.log("dom error");
    console.log(err.name);
}
function stopCapturing(stream){
    let mediaTracks=stream.getTracks();
    mediaTracks.forEach(track => {
        track.stop();
    });
}