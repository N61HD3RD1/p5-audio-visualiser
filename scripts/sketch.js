/*===================================================================================================================

======================================================================================================================*/
var controls = null; //store visualisations in a container
var vis = null; //store visualisations in a container
var sound = null; //variable for the p5 sound object
var fourier = null; //variable for fourier
var mic = null; //variable for mic
var amp = new p5.Amplitude();


function preload(){
	sound = loadSound('assets/audio/breaks2.mp3');

}

function setup(){
	const myCanvas = createCanvas(windowWidth, windowHeight);
	background(0);
	sound.playMode('restart') //Prevents dupicate sounds playing when playing/pausing and looping audio
	controls = new Interface();
	mic = new p5.AudioIn();
	amp = new p5.Amplitude();
	fourier = new p5.FFT(); //instantiate the fft object

	//Create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new WavePattern());
	vis.add(new Spectrum());
	vis.add(new Spectrograph());
	vis.add(new Circular)
	vis.add(new Phylloaxis());
	vis.add(new Rain());

	//Populates the Menu with visualisations.
	for(var i=0; i<vis.visuals.length; i++){
        $(".dropdownList").append("<div class='dropdownItem' id='"+vis.visuals[i].name+"'><a id='"+vis.visuals[i].name+"'>"+vis.visuals[i].name+"</a></div>")
    }

	 myCanvas.drop(newAudioFile);
	 	 
}

function draw(){
	background(0);
	vis.selectedVisual.draw(); //Draws the current visualisation
	controls.draw(); //Draws UI/Controls
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
function windowResized(){
	resizeCanvas(windowWidth, windowHeight); //Resizes canavs
	controls.onResize(); //Resizes UI

	//Resizes any visualisations that support resizing
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize(); //if the visualisation needs to be resized call its onResize method

	}

}
