var colors=["red","blue","orange","black","cyan","pink"];
window.onload=function(){
    let body=document.querySelector('body');  
    recursiveProcessor(body);
}
function recursiveProcessor(rootElement){
  let hasNonTextNodes=rootElement.children;
   if(hasNonTextNodes.length){
     let children=rootElement.children;
     for(child of children){
         recursiveProcessor(child);
     }
   }else {
     console.log(rootElement);
     let idealTextNode = rootElement.childNodes[0]
     if(idealTextNode && idealTextNode.nodeName=="#text"){
             let text=rootElement.textContent;
             if(text){         
                 rootElement.innerHTML='';
                 text.split('').forEach((char,i)=>{
                     let span=`<span class=${colors[(i+1)%colors.length]}>${char}</span>`
                     rootElement.innerHTML+=span;
                 })
            }
     }
   }
}