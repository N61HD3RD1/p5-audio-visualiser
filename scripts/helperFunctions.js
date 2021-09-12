/*
===============================================================================================
This function creates allows the input of new audio files as input
=================================================================================================
*/

function newAudioFile(file){
    if(file.type === "audio"){                  //Checking if input is an audio file else do nothing
        sound.pause();                          //Pauses current playing audio 
        sound.disconnect();                     //Disconnects the old audio 
        sound.stop();                           //Stops previous audio
        sound = loadSound(file.data);           //Loads the new audio file into the sound object
        amp = new p5.Amplitude();               //Creates new amplitude object in the old global p5 audio object 
        fourier = new p5.FFT(FFTsmoothing);     //Creates new p5 FFT object
    }
    else{
        alert("Please upload an audio file");   //Alerts the user that they need to upload a audio file
    }
};

//DOM Manpulating Code
$(document).ready(function(){

    //Responds to clicks on menu items by loading the selected vis.
    $(".dropdownList").on('click', function(){
        vis.selectVisual(event.target.id);
    })

    //Creates An Browser Alert Box
    alert('Drag and drop on canvas to upload file.')

});