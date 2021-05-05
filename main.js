objects=[];
status="";
function setup()
{
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
}

 function start()
{
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status : detecting objects";
object_name=document.getElementById("object_name").value;
}
function modelLoaded()
{
console.log("model is loaded !");
status=true;
}
function gotResults(error,results)
{
if(error)
{
console.log(error);
}
else
{
console.log(results);
objects=results;
}
}

function draw()
{
image(video,0,0,500,400);
if(status !="")
{
objectDetector.detect(video,gotResults);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="status : objects detected";
fill('#ff0000');
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label==object_name)
{
video.stop();
objectDetector.detect(gotResults);
document.getElementById("object_status").innerHTML=object_name +" found";
synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(object_name+" found");
synth.speak(utterThis);
}
else
{
document.getElementById("object_status").innerHTML=object_name+" not found";
}
}
}
}