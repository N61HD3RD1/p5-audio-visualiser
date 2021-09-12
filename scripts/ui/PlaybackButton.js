//Displays and handles playback control; play/stop, tracking volume.
function PlaybackButton(){

	//Generic Properties shared by all ui elements.
	this.isDisplayed = true; //If the element should be drawn or not
	this.width = 8 + (height*1/76);
	this.height = 8 + (height*1/76);
	this.x = (width*0.5) - (this.width*5);
	this.y = height - this.height*2;
	this.colour; //Colour, changed when the mouse is hoving over icon
	this.oppacity = 0.8;
	this.toolTip = false; // Should the tooltip/label be displayed by the cursor

	//Draws the element.
	this.draw = function(){
		//Checks if the mouse is over the icon, changes oppacity acordingly and toggles the tooltip
		if(this.inBounds()){
			this.colour = 'rgba(237,34,93, '+this.oppacity+')';
			this.toolTip = true;
		}
		else{
			this.colour = 'rgba(255,255, 255, '+this.oppacity+')'
			this.toolTip = false;
		}

		if(this.isDisplayed){
			noStroke();
			if(sound.isPlaying() != true){ //If paused draws play icon.
				fill(this.colour);
				triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y + this.height);
			}
			else{ //Else draws pause icon.
				fill(this.colour);
				rect(this.x, this.y,(1/3)*this.width, this.height);
				rect(this.x + (2/3)*this.width, this.y, (1/3)*this.width, this.height);
			}
			
			//Draws the tool tip text after the main graphics so tooltip is always ontop.
			if(this.toolTip){

				//Changes text depending on the state of the button;
				if(sound.isPlaying()){
					this.popupText = 'Pause';
				}
				else{
					this.popupText = 'Play';
				}

				noStroke();
				fill(255);
				textFont('Helvetica');
				textSize(14);
				textAlign(LEFT, BOTTOM);
				text(this.popupText, mouseX +4, mouseY-4);
			}
		}
	};

	//Toggles the sound on, or off.
	this.togglePlay = function(){
		if(!sound.isPlaying()){
			sound.play();
		} 
		else{
			sound.pause() 
		}
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
			this.togglePlay();
		}
	}

	//Resizes the element based on the current dimentions of the canvas.
	this.updateSize = function(){
		this.width = 8 + (height*1/60);
		this.height = 8 + (height*1/60);
		this.x = (width*0.5) - (this.width*5);
		this.y = height - this.height*2;
	};
}