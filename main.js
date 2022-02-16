function preload(){
classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13);
    stroke(0);

    if( mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function setup(){
canvas = createCanvas(400, 400);
canvas.center();
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function classifyCanvas(){
classifier.classify(canvas, gotResult);
}

function gotResult(error,results){
    if (error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("drawingname").innerHTML = "Label: " +results[0].label;
    document.getElementById("drawingconfidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + '%';
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}