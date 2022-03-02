//var slider_img = document.querySelector('.slider-img');
// var canvas = document.querySelector('.slider-img');
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

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
    image.src ="static/images/"+images[i];
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

        console.log("all polygons defined");
        var all_polygons = [];

        $('#save').click(function(){
            console.log("save pushed");
            console.log(all_polygons);
            dataSave(images[i], all_polygons);
        });

        // const boundingPoly = document.getElementById("drawpoly");
        // boundingPoly.onclick = () =>
        $('#drawpoly').click(function(){
            console.log("drawpoly");
            // ref: https://stackoverflow.com/questions/29441389/how-to-draw-polygon-on-canvas-with-mouse-clicks-pure-js
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
                console.log("done clicked");
                console.log(coordinates);
                all_polygons.push(coordinates);
                coordinates = [];
                // dataSave(images[i], coordinates);
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
        });

        // const saveButton = document.getElementById('save');  // not using
        // saveButton.addEventListener('click', () => save(canvas));

    }
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

// function save(canvas) {  // not using
//   const data = canvas.toDataURL('image/png');
//   const anchor = document.createElement('a');
//   anchor.href = data;
//   anchor.download = 'image.png';
//   anchor.click();
// }




