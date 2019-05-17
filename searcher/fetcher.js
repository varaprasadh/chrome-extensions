//sending responses to the events
chrome.runtime.onMessage.addListener((req, sender, sendresponse) => {
    console.log(req.query);
    fetchMeanings(req.query);
});

//context menu
chrome.contextMenus.create({
    "title": "search with searcher",
    "contexts": ["page", "selection", "image", "link"],
    "onclick": clickHandler
});
function clickHandler(e){
    //  sendMessage(e.selectionText);
    fetchMeanings(e.selectionText);
}





fetchMeanings=(query)=>{

    //TODO :fetch the meanings
  var keyword=  query.trim().split(" ").join("+");
    var url = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch="+keyword;
             fetch(url)
                 .then(res => 
                     res.json()
               )
               .then(data=>{
                   console.log(data.query.search);
            
                   let meanings = data.query.search.map(obj=>{
                       return  obj.snippet
                   })
              sendMessage(meanings);
        }).catch(e=>console.log(e));
   
}

function sendMessage(data)
{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(data);

        chrome.tabs.sendMessage(tabs[0].id, { result: data, from: "fetcher" }, function (response) {
            console.log('sent from popup');

        });
     })
};