//Displays and handles playback control; play/stop, tracking volume.
function LoopButton(){

	//Generic Properties shared by all ui elements.
	this.isDisplayed = true; //If the element should be drawn or not
	this.width = 8 + (height*1/76);
	this.height = 8 + (height*1/76);
	this.x = (width*0.5) + (this.width*4);
	this.y = height - this.height*2;
	this.colour; //Colour, changed when the mouse is hoving over icon
	this.oppacity = 1;
	this.toolTip = false; // Should the tooltip/label be displayed by the cursor

	//Draws the element.
	this.draw = function(){
		//Checks if the mouse is over the icon, changes oppacity acordingly
		if(this.inBounds()){
			this.colour = 'rgba(237,34,93, '+this.oppacity+')';
			this.toolTip = true;
		}
		else{
			this.colour = 'rgba(255,255, 255, '+this.oppacity+')'
			this.toolTip = false;
		}

		if(this.isDisplayed){
			if(controls.loopBool != true){ //If paused draws play icon.
				noFill();
				stroke(this.colour);
				strokeWeight(2);
				ellipse(this.x + this.width/2, this.y + this.height/2, this.width, this.height);
				noStroke();
				fill(this.colour);
				triangle(this.x + this.width, this.y + this.height/2, this.x + this.width -4, this.y + this.height/2 -4, this.x + this.width +4, this.y + this.height/2 -4);
				
				
			}
			else{ //Else draws stop looping icon.
				noFill();
				stroke(this.colour);
				strokeWeight(2);
				arc(this.x + this.width/2, this.y + this.height/2, this.width, this.height, 60, 210);
				arc(this.x + this.width/2, this.y + this.height/2, this.width, this.height, 240, 30);
			}

			//Draws the tool tip text after the main graphics so tooltip is always ontop.
			if(this.toolTip){

				//Changes text depending on the state of the button;
				if(controls.loopBool){
					this.popupText = 'Stop Loop';
				}
				else{
					this.popupText = 'Loop';
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
	this.toggleLoop = function(){
		sound.setLoop(!controls.loopBool);
		controls.loopBool = !controls.loopBool;

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
		if(this.inBounds()){
			this.toggleLoop();
		}
	}

	//Resizes the element based on the current dimentions of the canvas.
	this.updateSize = function(){
		this.width = 8 + (height*1/76);
		this.height = 8 + (height*1/76);
		this.x = (width*0.5) + (this.width*4);
		this.y = height - this.height*2;
	};
}