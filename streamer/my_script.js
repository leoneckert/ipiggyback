// inspo from here: https://github.com/rctoris/mjpegcanvasjs/blob/develop/src/visualization/Viewer.js
var streamW = 160;
var streamH = 120;

var inspectX = 20;
var inspectY = 40;

function init(){
    var image = new Image();
    var loadingImg = new Image();
    loadingImg.src = "http://files.leoneckert.com/ididntknow.gif"

    // create the canvas to render to
    var canvas = document.createElement('canvas');
    canvas.width = streamW;
    canvas.height = streamH;
    canvas.style.background = 'rgb(255, 255,255)';
    document.getElementById("canvasWrapper").appendChild(canvas);
    var context = canvas.getContext('2d');


    var picker = document.createElement('div');
    picker.style.width = streamW/2 + "px";
    picker.style.height = streamW/2 + "px";
    picker.style.background = 'rgb(255, 0, 255)';
    document.getElementById("canvasWrapper").appendChild(picker);
    // var imgd = context.getImageData(20, 20, 2, 2);
    // console.log(imgd);

    var drawInterval = Math.max(1 / 10 * 1000, 30);
    console.log("drawInterval", drawInterval);

    function changeStream(){
        var src = 'http://lke229.itp.io:1805/stream';
        image.src = src;
    }

    function draw() {
        // clear the canvas
        canvas.width = canvas.width;
        // check if we have a valid image
        if (image.width * image.height > 0) {
          context.drawImage(image, 0, 0, streamW, streamH);
        } else {
        //   context.drawImage(loadingImg, 0, 0, streamW, streamH);
        }

        var selectedI = (streamW * 4 * inspectY) + (inspectX * 4);
        imgd = context.getImageData(0, 0, streamW, streamH);
        pix = imgd.data;
        // Loop over each pixel and invert the color.
        for (var i = 0, n = pix.length; i < n; i += 4) {
            if(i == selectedI){
                picker.style.background = 'rgb('+pix[0]+', '+pix[1]+', '+pix[2]+')';
            }else{
                // pix[i  ] = (255 + pix[i  ])*0.5; // red
                // pix[i+1] = (255 + pix[i+1])*0.5; // green
                // pix[i+2] = (255 + pix[i+2])*0.5; // blue
                pix[i+3] = 150; // alpha (the fourth element)
            }
        }
        context.putImageData(imgd, 0, 0);

    }

    canvas.onmouseup = function(e){
        console.log(e);
    }

    changeStream();
    console.log(image);
    setInterval(draw, drawInterval);

}

window.addEventListener("load", init);