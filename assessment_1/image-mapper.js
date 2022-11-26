const uploadImageEvent = document.getElementById('upload_image');
const dialog = document.getElementById('myDialog');
const cancel = document.getElementsByClassName("cancel")[0];
const save = document.getElementsByClassName('save')[0];
const desc = document.getElementById('desc');
const tableDialog = document.getElementById('descDetailDialog');
const tableButton = document.getElementById('table_button');
const loader=document.getElementById('loader');
let descArray = [];
let currentElem = {};
uploadImageEvent.addEventListener('change', showFileDetails);
function showFileDetails(event) {
    try {
        loader.style.display='block';
        const input = document.getElementById("upload_image");
        const fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            tableButton.style.display = 'none';
            let element = document.getElementsByTagName("p"), index;
            for (index = element.length - 1; index >= 0; index--) {
                element[index].parentNode.removeChild(element[index]);
            }
            const image = document.getElementById("myImage");
            const img = new Image();
            img.src = window.URL.createObjectURL(input.files[0]);
            img.addEventListener("error", function () {
                image.style.display = 'none';
                window.URL.revokeObjectURL(img.src);
                alert('Please upload a correct image format');
                loader.style.display='none';
            });
            img.onload = function () {
                const width = img.naturalWidth,
                    height = img.naturalHeight;
                window.URL.revokeObjectURL(img.src);
                image.style.display = 'block'
                let imageDetailsDiv = document.getElementById('imageDetails');
                imageDetailsDiv.style.display = 'block'
                imageDetailsDiv.innerText = `Image Name: ${input.files[0].name}\n Dimensions: ${width} x ${height}\n MIME Type:${input.files[0].type}`
                image.src = event.target.result;
                descArray = [];
                loader.style.display='none';
            };
            image.addEventListener('click', onImageClick)
        }
    } catch (err) {
        console.log(err)
    }
}

function onImageClick(event) {
    try {
        const xPos = event.pageX - 3;
        const yPos = event.pageY - 15;
        currentElem.xPos = xPos;
        currentElem.yPos = yPos;
        dialog.style.display = 'block';
        // const dialogBox=document.getElementById('dialogContent');
        // dialogBox.style.position='absolute';
        // dialogBox.style.top=xPos+'px';
        // dialogBox.style.left=yPos+'px';
    }
    catch (err) {
        console.log(err)
    }
}

cancel.addEventListener('click', cancelEvent)
function cancelEvent() {
    try {
        dialog.style.display = 'none';
        currentElem = {};
        document.getElementById('desc_error').style.display = 'none';
    }
    catch (err) {
        console.log(err)
    }
}
save.addEventListener('click', function () {
    try {
        if (desc.value) {
            currentElem.desc = desc.value;
            const dot = document.createElement('p');
            dot.style.minWidth = '8px';
            dot.style.minHeight = '8px';
            dot.style.borderRadius = '4px';
            dot.style.backgroundColor = 'red';
            dot.style.position = 'absolute';
            dot.style.left = (currentElem.xPos) + 'px';
            dot.style.top = (currentElem.yPos) + 'px';
            dot.style.cursor = 'pointer';
            const tooltip = document.createElement('p');
            tooltip.style.backgroundColor = 'white';
            tooltip.style.position = 'absolute';
            tooltip.style.left = (currentElem.xPos) + 20 + 'px';
            tooltip.style.top = (currentElem.yPos) + 20 + 'px';
            tooltip.style.paddingLeft = '20px';
            tooltip.style.paddingRight = '20px';
            tooltip.style.cursor = 'pointer';
            tooltip.style.paddingTop = '5px';
            tooltip.style.paddingBottom = '5px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.maxWidth='200px';            
            tooltip.innerText = desc.value;
            const id = 'tt' + descArray.length;
            tooltip.id = id
            dot.id = id + '0'
            const css = `#${id}{display:none} #${id}0:hover ~ #${id} {display:block;opacity:0.9}`;
            const style = document.createElement('style');
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.body.appendChild(style);
            document.body.appendChild(dot);
            document.body.appendChild(tooltip)
            descArray.push(currentElem);
            currentElem = {};
            tableButton.style.display = 'block';
            desc.value = ''
            cancelEvent();
        } else {
            document.getElementById('desc_error').style.display = 'block';
        }
    }
    catch (err) {
        console.log(err)
    }
})

function valChange(value) {
    try {
        if (value.length > 0) {
            document.getElementById('desc_error').style.display = 'none';
        } else {
            document.getElementById('desc_error').style.display = 'block';
        }
    } catch (err) {
        console.log(err)
    }
}

function generateTableHead(table) {
    try {
        const thead = table.createTHead();
        const row = thead.insertRow();
        const data = ['X Pos', 'Y Pos', 'Description']
        for (let key of data) {
            const th = document.createElement("th");
            const text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
    catch (err) {
        console.log(err)
    }
}

function generateTable(table, data) {
    try {
        for (let element of data) {
            const row = table.insertRow();
            for (key in element) {
                const cell = row.insertCell();
                const text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }
        }
    } catch (err) {
        console.log(err)
    }
}


tableButton.addEventListener('click', function () {
    try {
        tableDialog.style.display = 'block'
        const table = document.querySelector("table");
        generateTableHead(table);
        generateTable(table, descArray);
    }
    catch (err) {
        console.log(err)
    }
})

document.getElementById('descCloseIcon').addEventListener('click', function () {
    try{
        document.getElementById('descTable').innerHTML = ''
        tableDialog.style.display = 'none';
    }catch(err){
        console.log(err)
    }    
})