let uploadImageEvent = document.getElementById('upload_image');
let imgPropDiv = document.getElementById('file_details');
let image;
const dialog=document.getElementById('myDialog');
const cancel = document.getElementsByClassName("cancel")[0];
const save=document.getElementsByClassName('save')[0];
const desc=document.getElementById('desc');
let descArray=[];
let currentElem={};
uploadImageEvent.addEventListener('change', showFileDetails);
function showFileDetails(event) {
    console.log(event)
    document.getElementById('myImage').style.display = 'block';
    let input = document.getElementById("upload_image");
    let fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        image = document.getElementById("myImage");
        image.src = event.target.result;
        //to get dimensions of image
        // image.onload=function(){
        //     let h=this.height;
        //     let w=this.width;
        //     console.log(w,h)
        // }
        image.addEventListener('click',onImageClick)
    }
}
function onImageClick(event){
    console.log(event)
    console.log('inside image click event')
    const xPos=event.pageX-5;
    const yPos=event.pageY-20;
    currentElem.xPos=xPos;
    currentElem.yPos=yPos;
    dialog.style.display='block'
}

cancel.addEventListener('click',cancelEvent)
function cancelEvent(){
    console.log('inside cancel event')
    dialog.style.display='none';
    currentElem={};
    document.getElementById('desc_error').style.display='none';
}
save.addEventListener('click',function(){
    console.log('inside save event')
    if(desc.value){
        currentElem.desc=desc.value;
        const dot=document.createElement('p');
        dot.style.minWidth='8px';
        dot.style.minHeight='8px';
        dot.style.borderRadius='4px';
        dot.style.backgroundColor='red';
        dot.style.position='absolute';
        dot.style.left=(currentElem.xPos)+'px';
        dot.style.top=(currentElem.yPos)+'px';
        dot.style.cursor='pointer';
        document.body.appendChild(dot);
        let tooltip=document.createElement('p');
        tooltip.style.backgroundColor='white';
        tooltip.style.position='absolute';
        tooltip.style.left=(currentElem.xPos)+'px';
        tooltip.style.top=(currentElem.yPos)+'px';
        tooltip.style.paddingLeft='10px';
        tooltip.style.paddingRight='10px';
        tooltip.style.borderRadius='5px';
        tooltip.innerText=desc.value;
        const id='tt'+descArray.length;
        tooltip.id=id
        const css=`#${id}{opacity:0}#${id}:hover{opacity:0.9}`;
        const style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.body.appendChild(style);
        document.body.appendChild(tooltip)
        descArray.push(currentElem);
        currentElem={};
        desc.value=''
        cancelEvent();
    }else{
        document.getElementById('desc_error').style.display='block';
    }
})

function valChange(value){
    if(value.length>0){
        document.getElementById('desc_error').style.display='none';
    }else{
        document.getElementById('desc_error').style.display='block';
    }    
}