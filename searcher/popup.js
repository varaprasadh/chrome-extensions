window.onload=()=>{
    var box = document.querySelector('#in-box');
    console.log(box);
    box.addEventListener("change", (e) => {
        let text = box.value;
        console.log(text);
        
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text,from:"popup"}, function (response) {
                console.log('sent from popup');
            });
        });
       
    });

}