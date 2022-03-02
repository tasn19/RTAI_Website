//var slider_img = document.querySelector('.slider-img');
// var canvas = document.querySelector('.slider-img');
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

// ref: https://stackoverflow.com/questions/43853119/javascript-wrong-mouse-position-when-drawing-on-canvas
var bounds = canvas.getBoundingClientRect();
const mouse = {
    x: 0, y: 0,                        // coordinates
    lastX: 0, lastY: 0,                // last frames mouse position
}

function mouseEvent(e) {
    var bounds = canvas.getBoundingClientRect();
    // get the mouse coordinates, subtract the canvas top left and any scrolling
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
    // first normalize the mouse coordinates from 0 to 1 (0,0) top left
    // off canvas and (1,1) bottom right by dividing by the bounds width and height
    mouse.x /= bounds.width;
    mouse.y /= bounds.height;

    // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution
    mouse.x *= canvas.width;
    mouse.y *= canvas.height;
    return mouse;
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

var images = ['10.png', '100.png', '101.png', '102.png', '103.png']; //TO DO change
var i = 0;

setImg(i);

function prev(){
	if(i <= 0) i = images.length;
	i--;
	return setImg(i);
}

function next(){
	if(i >= images.length-1) i = -1;
	i++;
	return setImg(i);
}

function setImg(i){
	var image = new Image();
    image.src ="images/"+images[i];
	image.onload = function() {
        // context.drawImage(image, 0, 0);

        const imageWidth = image.width;
        const imageHeight = image.height;

        // rescaling the canvas element
        canvas.width = imageWidth* 0.2;
        canvas.height = imageHeight*0.2;
        //Resizing
        // canvas.height = window.innerHeight;
        // canvas.width = window.innerWidth;
        context.save();
        context.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * 0.2, imageHeight * 0.2);
        context.restore();
        //return canvas.setAttribute('src', "images/"+images[i]);

        // enabling the brush after after the image
        // has been uploaded

        const clearElement = document.getElementById("reset");
        clearElement.onclick = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            //redraw
            context.save();
            context.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * 0.2, imageHeight * 0.2);
            context.restore();
        };

        const boundingPoly = document.getElementById("drawpoly");
        boundingPoly.onclick = () =>{
            console.log("drawpoly");
            // ref: https://stackoverflow.com/questions/29441389/how-to-draw-polygon-on-canvas-with-mouse-clicks-pure-js
        //var canvas=document.getElementById("canvas");
        //var context=canvas.getContext("2d");
        var cw=canvas.width;
        var ch=canvas.height;
        function reOffset(){
          var BB=canvas.getBoundingClientRect();
          offsetX=BB.left;
          offsetY=BB.top;
        }
        var offsetX,offsetY;
        reOffset();
        window.onscroll=function(e){ reOffset(); }

        context.lineWidth=2;
        context.strokeStyle='blue';

        var coordinates = [];
        var isDone=false;

        $('#done').click(function(){
          isDone=true;
        });

        $("#canvas").mousedown(function(e){handleMouseDown(e);});

        function handleMouseDown(e){
          if(isDone || coordinates.length>10){return;} //max 10 points

          // tell the browser we're handling this event
          e.preventDefault();
          e.stopPropagation();

          mouseX=parseInt(e.clientX-offsetX);
          mouseY=parseInt(e.clientY-offsetY);
          coordinates.push({x:mouseX,y:mouseY});

          drawPolygon();

        }

        function drawPolygon(){
          //context.clearRect(0,0,cw,ch); //to remove extra lines between points
          context.beginPath();
          context.moveTo(coordinates[0].x, coordinates[0].y);
          for(index=1; index<coordinates.length;index++) {
            context.lineTo(coordinates[index].x, coordinates[index].y);
          }
          //context.closePath(); closing it here will create closed polygons, uncomment clearRect to remove extra lines
          context.stroke();
        }
        context.closePath();
        }

        // Code for freehand drawing
        // let isDrawing;
        //
        // canvas.onmousedown = (e) => {
        //     var mouse = mouseEvent(e);
        //     //console.log(mouse); // gives coordinates on page, back-calculate for pixels on image
        //     console.log("draw");
        //     isDrawing = true;
        //     context.beginPath();
        //     context.lineWidth = size;
        //     context.strokeStyle = color;
        //     context.lineJoin = "round";
        //     context.lineCap = "round";
        //     context.moveTo(mouse.x, mouse.y);
        // };
        //
        // canvas.onmousemove = (e) => {
        //     var mouse = mouseEvent(e);
        //     if (isDrawing) {
        //
        //         context.lineTo(mouse.x, mouse.y);
        //         context.stroke();
        //     }
        // };
        //
        // canvas.onmouseup = function () {
        //     isDrawing = false;
        //     context.closePath();
        // };


      const saveButton = document.getElementById('save');
      saveButton.addEventListener('click', () => save(canvas));

    }
}

function save(canvas) {
  const data = canvas.toDataURL('image/png');
  const anchor = document.createElement('a');
  anchor.href = data;
  anchor.download = 'image.png';
  anchor.click();
}

// canvas.addEventListener("mousemove", mouseEvent);
// canvas.addEventListener("mousedown", mouseEvent);
// canvas.addEventListener("mouseup",   mouseEvent);



