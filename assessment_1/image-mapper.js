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
    document.getElementById('myImage').style.display = 'block';
    let input = document.getElementById("upload_image");
    let fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
        image = document.getElementById("myImage");
        image.src = event.target.result;
        image.addEventListener('click',onImageClick)
    }
}
function onImageClick(event){
    console.log(event)
    console.log('inside image click event')
    const xPos=event.offsetX;
    const yPos=event.offsetY;
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
        dot.className='well';
        const val=document.createElement('div');
        val.innerText=desc.value;
        val.style.display='none';
        dot.appendChild(val);
        document.body.appendChild(dot)
        descArray.push(currentElem);
        currentElem={};
        cancelEvent();
    }else{
        document.getElementById('desc_error').style.display='block';
    }
    // if(document.getElementById('desc').value)
})

function valChange(value){
    if(value.length>0){
        document.getElementById('desc_error').style.display='none';
    }else{
        document.getElementById('desc_error').style.display='block';
    }    
}