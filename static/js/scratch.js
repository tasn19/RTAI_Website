//var slider_img = document.querySelector('.slider-img');
// var canvas = document.querySelector('.slider-img');
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
var images = ['10.png', '100.png', '101.png', '102.png', '103.png']; //TO DO change
var i = 0;
var image;

var all_polygons = [];
var coordinates = [];
var isDone=true;

setImg(i);

// draw image in the current canvas
function drawImg(){
    const imageWidth = image.width;
    const imageHeight = image.height;

    canvas.width = imageWidth* 0.2;//TODO why we are doing this?
    canvas.height = imageHeight* 0.2;//TODO why we are doing this?

    context.save();
    context.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, imageWidth * 0.2, imageHeight * 0.2);
    context.restore();
}

// resize the canvas and draw image
function setImg(i){
    all_polygons = []; //TODO read from server
	image = new Image();
    image.src ="static/images/"+images[i];

	image.onload = function() {
        drawImg();
    }
}

function drawLine(){
    l = coordinates.length;
    if (l === 1){
        context.beginPath();
        context.moveTo(coordinates[0].x, coordinates[0].y);
    } else {
        context.lineTo(coordinates[l-1].x, coordinates[l-1].y);
    }
    context.stroke();
}

function dataSave(imgName, outputData){
    console.log('datasave');
    console.log(outputData);
    // outputStr = JSON.stringify(outputData);
    dataToSend = {'imageName': imgName,
                    'coordinates': outputData};
    dataToSend = JSON.stringify(dataToSend);
    console.log(dataToSend);
    $.ajax({
        type: "POST",
        url: "http://localhost:8000",
        data: dataToSend,
        contentType: "application/json",
        // success:function(data){alert('success')}
    }).done(function(){
        alert("Saved!");
    });
}

$("#prev").click(function (){
	if(i <= 0) i = images.length;
	i--;
	return setImg(i);
});

$("#next").click(function (){
	if(i >= images.length-1) i = -1;
	i++;
	return setImg(i);
});

$("#reset").click(function (){
    all_polygons = [];
    coordinates = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawImg();
});

$('#save').click(function(){
    if (isDone===false){
        alert("please finish drawing the current polygon and then save");
        console.log("didn't save");
        return;
    }
    console.log("save pushed, all_polygons is:");
    console.log(all_polygons);
    dataSave(images[i], all_polygons);
});

$('#done').click(function(){
    console.log("done clicked, coordinates:");
    console.log(coordinates);
    if (isDone === false){
        console.log("done clicked adding polygon to data")
        isDone = true;
        context.closePath();
        all_polygons.push(coordinates);
        coordinates=[];
    }
    // dataSave(images[i], coordinates);
});

$('#drawpoly').click(function(){
    console.log("annotate clicked");
    if (isDone === true){
        isDone=false;
        coordinates = [];
    }
});

$("#canvas").mousedown(function(e){

    if(isDone /*|| coordinates.length>10*/){
      return;
    } //max 10 points

    e.preventDefault();
    e.stopPropagation();

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

    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    coordinates.push({x:mouseX,y:mouseY});

    drawLine();
});

// function save(canvas) {  // not using
//   const data = canvas.toDataURL('image/png');
//   const anchor = document.createElement('a');
//   anchor.href = data;
//   anchor.download = 'image.png';
//   anchor.click();
// }




