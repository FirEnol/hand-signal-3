Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oWwsc7KDqs/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }else {
        console.log(results);
        document.getElementById("result_hand_name").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if(gesture == "Thumbs up")
        {
            toSpeak = "This is looking like a thumbs up";
            document.getElementById("update_hand").innerHTML = "&#128076;";
        }
        else if(gesture == "Peace")
        {
            toSpeak = "Thats the Peace Symbol";
            document.getElementById("update_hand").innerHTML = "&#128077;";
        }
        else if(gesture == "Nice")
        {
            toSpeak = "That looks like the Nice symbol";
            document.getElementById("update_hand").innerHTML = "&#9996;";
        }
  speak();
   
    }
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}