//Displays and handles playback control; play/stop, tracking volume.
function MicButton(){

	//Generic Properties shared by all ui elements.
	this.isDisplayed = true; //If the element should be drawn or not
	this.width = 8 + (height*1/76);
	this.height = 8 + (height*1/76);
	this.x = (width*0.5) - (this.width*0.5);
	this.y = height - this.height*2;
	this.colour; //RGB colour as a string, changed when the mouse is hoving over icon to create hightlight effect
	this.oppacity = 0.8; //Alpha Value
	this.toolTip = false; // Should the tooltip/label be displayed by the cursor

	//Draws the element.
	this.draw = function(){
		//Responds to mouse hovering by changing colour and displaying tooltip.
		if(this.inBounds()){
			this.colour = 'rgba(237,34,93, '+this.oppacity+')';
			this.toolTip = true;
		}
		else{
			this.colour = 'rgba(255,255, 255, '+this.oppacity+')';
			this.toolTip = false;
		}

		//If is displayed is true draw the icon
		if(this.isDisplayed){
			if(controls.micBool != true){ //If mic is not on draw record icon.
				noFill();
				stroke(this.colour);
				strokeWeight(2);
				ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);

				noStroke();
				fill('rgba(255,0,0, '+this.oppacity+')');
				ellipse(this.x + this.width/2, this.y + this.height/2, this.width -6, this.height -6);
			}
			else{ //Else draws stop icon.
				fill(this.colour);
				rect(this.x, this.y, this.width, this.height);
			}

			//Draws the tool tip text after the main graphics so tooltip is always ontop.
			if(this.toolTip){

				//Changes text depending on the state of the button;
				if(controls.micBool){
					this.popupText = 'Mic On';
				}
				else{
					this.popupText = 'Mic Off';
				}

				noStroke();
				fill(255);
				textFont('Helvetica');
				textSize(14);
				textAlign(LEFT, BOTTOM);
				text(this.popupText, mouseX +4, mouseY+4);
			}
		}
	};

	//Toggles the sound on, or off.
	this.toggleMic = function(){
		if(!controls.micBool){
			sound.stop();
			mic.start();
            fourier.setInput(mic);
			amp.setInput(mic);
			
			//Disables sound -file playback related UI
			controls.playbackButton.isDisplayed = false;
			controls.loopButton.isDisplayed = false;
			controls.progressSlider.isDisplayed = false;
			
		} 
		else{
			controls.progressSlider.time = 0; //Resets the progress slider to correct value.
			fourier.setInput(sound);
            amp.setInput(sound);
			mic.stop();
			
			//Re-enables sound -file playback related UI
			controls.playbackButton.isDisplayed = true;
			controls.loopButton.isDisplayed = true;
			controls.progressSlider.isDisplayed = true;
		}

		controls.micBool = !controls.micBool;
	};

	//Checks to see if the mouse is is within the bounderies of the object based on it's coordinates and size
	this.inBounds = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			return true;
		}
		else{
			return false;
		}
	};

	//Checks to see if the mouse is in the boundaries of the object when called, toggles play if true
	this.hitCheck = function(){
		if(this.inBounds() && this.isDisplayed){
			this.toggleMic();
		}
	}

	//Resizes the element based on the current dimentions of the canvas.
	this.updateSize = function(){
		this.width = 8 + (height*1/76);
		this.height = 8 + (height*1/76);
		this.x = (width*0.5) - (this.width*0.5);
		this.y = height - this.height*2;
	};
}