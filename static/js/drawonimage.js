const fileInput = document.querySelector("#upload");
let image = new Image();
image.src = '/images/10.png';
  	image.onload = function(){
    context.drawImage(image, 0, 0);
  }
//make_base();
// enabling drawing on the blank canvas
drawOnImage();

function make_base()
{

  	image.src = '/images/10.png';
  	image.onload = function(){
    context.drawImage(image, 0, 0);
  }
}

fileInput.addEventListener("change", async (e) => {
    const [file] = ['10.png', '100.png', '101.png', '102.png', '103.png'];

    // displaying the uploaded image
    // const image = document.createElement("img");
    let image = new Image();
    image.src = '/images/10.png';

    console.log("hgbgyb");
    console.log(image);

    // enabling the brush after after the image
    // has been uploaded
    image.addEventListener("load", () => {
        drawOnImage(image);
    });

    return false;
});

function fileToDataUri(field) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            resolve(reader.result);
        });

        reader.readAsDataURL(field);
    });
}

const sizeElement = document.querySelector("#sizeRange");
let size = sizeElement.value;
sizeElement.oninput = (e) => {
    size = e.target.value;
};

const colorElement = document.getElementsByName("colorRadio");
let color;
colorElement.forEach((c) => {
    if (c.checked) color = c.value;
});

colorElement.forEach((c) => {
    c.onclick = () => {
        color = c.value;
    };
});

function drawOnImage(image) {
    const canvasElement = document.getElementById("canvas");
    const context = canvasElement.getContext("2d");

    //var image = new Image();
    //image.src = '/images/10.png';

    // if an image is present,
    // the image passed as parameter is drawn in the canvas

    console.log("there")
    console.log(image)

    const imageWidth = image.width;
    const imageHeight = image.height;

    // rescaling the canvas element
    canvasElement.width = imageWidth;
    canvasElement.height = imageHeight;

    context.drawImage(image, 0, 0, imageWidth, imageHeight);


    const clearElement = document.getElementById("clear");
    clearElement.onclick = () => {
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    };

    let isDrawing;

    canvasElement.onmousedown = (e) => {
        isDrawing = true;
        context.beginPath();
        context.lineWidth = size;
        context.strokeStyle = color;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.moveTo(e.clientX, e.clientY);
    };

    canvasElement.onmousemove = (e) => {
        if (isDrawing) {
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
        }
    };

    canvasElement.onmouseup = function () {
        isDrawing = false;
        context.closePath();
    };
}