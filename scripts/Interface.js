//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function Interface(){
	this.menuDisplayed = false; //Is the menu displayed
	this.micBool = false; //Should the mic be playing
	this.loopBool = sound.isLooping(); //Boolean for if the track should be looping or not
	this.FFTSmoothing = 0.8;

	//Containers for UI
	this.playbackButton = new PlaybackButton;
	this.micButton = new MicButton;
	this.loopButton = new LoopButton;
	this.fftSlider = new FFTSlider();
	this.progressSlider = new ProgressSlider;

	//Responds to mouse pressed
	this.mousePressed = function(){
		this.playbackButton.hitCheck();
		this.micButton.hitCheck();
		this.loopButton.hitCheck();
		this.progressSlider.hitCheck();
		this.fftSlider.hitCheck();
	}

	//Responds to mouse being clicked and dragged.
	this.mouseDragged = function(){
		this.fftSlider.onDrag();
	}

	//Responds to keyboard presses
	this.keyPressed = function(keycode){
		console.log(keycode);
		//'Enter'; Vis select menu
		if(keycode == 13){
			this.menuDisplayed = !this.menuDisplayed;

		}
		//'Space'; Pause/Play
		if(keycode == 32 && this.micBool == false){
			if(sound.isPlaying()){
				sound.pause();

			}
			else{
				sound.play();

			}

		}
		//'F'; Toggle Fullscreen
		if(keycode == 70){
			var fs = fullscreen();
			fullscreen(!fs);

		}

		//'L'; Toggle Loop
		if(keycode == 76){
			this.loopButton.toggleLoop()
		}

		//'M'; Toggle mic
		if(keycode == 77){
			this.micButton.toggleMic();
		}

		
		//'1' throught to '9'; Select vis
		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 

		}
		if(keycode == 38){
			FFTsmoothingPercent = FFTsmoothing * 100;
			if(FFTsmoothing < 100){
				FFTsmoothing = (FFTsmoothingPercent + 1) / 100;
			}
		}
		if(keycode == 40){
			FFTsmoothingPercent = FFTsmoothing * 100;
			if(FFTsmoothing > 100){
				FFTsmoothing = (FFTsmoothingPercent - 1) / 100;

			}
		}


	};

	//Draws out the menu
	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 70 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, 100, yLoc);

		}
	};

	//Draws UI
	this.draw = function(){
		//Draws Canvas UI
		this.playbackButton.draw();
		this.micButton.draw();
		this.loopButton.draw();
		this.progressSlider.draw();
		this.fftSlider.draw();
		//Draws Menu
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);
		//Only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
			text("Select a visualisation:", 100, 30);
			this.menu();

		}	
		pop();

	};

	//Resizes UI
	this.onResize = function(){
		this.playbackButton.updateSize();
		this.micButton.updateSize();
		this.loopButton.updateSize();
		this.progressSlider.updateSize();
		this.fftSlider.updateSize();
	}


}


