console.log('hello world::content script');
//fire up trigger for copy event
var body = document.getElementsByTagName('body')[0]; 
body.addEventListener('copy',(e)=>{
    navigator.clipboard.readText().then(query=>{
        chrome.runtime.sendMessage({ query });
    })
})
body.addEventListener('click',(e)=>{
    console.log('something going');
    
    document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('result-container')[0]);
})

chrome.runtime.onMessage.addListener((req,sender,sendresponse)=>{

      switch(req.from){
          case "popup":
              console.log(req.text);
              let query = req.text;
              chrome.runtime.sendMessage({ query });
              break;
          case "fetcher":
              console.log(req);
              
              let html = `
                <style>
                 .result-container{
                    position:absolute;
                    width:300px;
                    height:200px;
                    z-index:999;
                    top:50%;
                    left:50%;
                    overflow-y:scroll;
                    background:rgba(0,0,0,0.7);
                    padding:0px;

           }
           .item-container{
               
               background:rgba(0,255,0,0.5);
           }
           .item{

               color:black;
               font-size:20px;
               font-weight:20px;
               background:rgba(255,255,255,1);

           }
         </style>
        
         <div class="item-container">${req.result.map(obj=>{
              return `<div class="item">${obj}</div>`
         })}</div>`;
              if(document.getElementsByClassName('result-container')[0]){
                document.getElementsByTagName('body')[0].removeChild(document.getElementsByClassName('result-container')[0]);
              }
              let doc = document.createElement('div');
              doc.innerHTML = html;
              doc.setAttribute('class', 'result-container');
              document.getElementsByTagName('body')[0].appendChild(doc); break;
             
      }

});