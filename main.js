flag=0;

function preload() {
}


function setup() {
canvas=createCanvas(300,300);
canvas.center();
video=createCapture(VIDEO,300,300);
video.hide();
}

function start() {
objectdetector=ml5.objectDetector("cocossd",modeloaded);
document.getElementById("status").innerHTML="status:detectin' objects";
}

function modeloaded() {
console.log("model loaded!");
status=true;

if(getvideo=="lamborghini_video") {
video2.pause();
video1.loop();
flag=1;
}
else {
video1.pause();
video2.loop();
flag=0;
}
}                               

function draw() {
image(VIDEO,300,300);
}