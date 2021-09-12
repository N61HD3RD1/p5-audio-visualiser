//Displays and handles playback control; play/stop, tracking volume.
function ProgressSlider(){

	//Generic Properties shared by all ui elements.
	this.isDisplayed = true; //If the element should be drawn or not
	this.width = width*(3/5);
	this.height = 8 + height*1/144;
	this.x = width *(1/5);
	this.y = height- this.height*5;
	this.colour; //RGB colour as a string, changed when the mouse is hoving over icon to create hightlight effect 
	this.oppacity = 1; //Alpha value

	//These dimentions are used to draw the bar, the dimentions used to work out the bounaries are larger tha  the bar itself making it eaier to click
	this.barWidth = this.width * 0.94 //Bar is 90% the width of the element to account for the time counter(s)
	this.barHeight = this.height *0.25;
	this.barX = this.x + (this.width - this.barWidth)/2; //Centers the bar along the x axis
	this.barY = this.y + (this.height - this.barHeight)/2 // Centers the bar in the middle of the bounding box

	this.time = 0; //Holds the progress of the song as a fraction of the current time over the duration.
	this.timeRatio = 0; //Holds the the porgress of the song as a fraction of the song length, used to draw the progress bar 

	//Converts time in seconds to time in minutes and seconds, outputs a string with format MM:SS;
	function convertToMinSec(s){
		var seconds = (s % 60);
		var minutes = Math.floor((s / 60) %   60);

		var out = minutes.toString()+':'+seconds.toString().slice(0, 2).replace('.', ' ');
  
		return out;
	}

	//Draws the element.
	this.draw = function(){
		if(this.isDisplayed){
			if(this.inBounds()){
				this.colour = 'rgba(237,34,93, '+this.oppacity+')';
			}
			else{
				this.colour = 'rgba(255,255,255, '+this.oppacity+')';
			}

			//Updates .time only when sound is playing, so .time doesn't revert to 0 when paused.
			if(sound.isPlaying()){
				this.time = sound.currentTime()
			};

			this.timeRatio = this.time/sound.duration(); //Updates timeRatio even when song is not playing 
			noStroke();
			fill(80);
			rect(this.barX, this.barY, this.barWidth, this.barHeight);
			fill(this.colour);
			rect(this.barX, this.barY, this.timeRatio*this.barWidth, this.barHeight);
			if(this.inBounds()){
				fill(255);
				ellipse(this.barX + this.timeRatio*this.barWidth, this.y + this.height/2, this.height*0.66 +2, this.height*0.66 +2);

			}

			//Draws current time and duration either side of the bar.
			text(convertToMinSec(this.time), this.barX -28, this.y, this.barX, this.barY);
		}
	};

	//Jumps the track based on the position of the mouse, pos should be the postions of the cursor in pixels relitive to the x postion of this slider
	this.jumpPos = function(pos){
		sound.jump((pos/this.barWidth) * sound.duration());
	}

	//Checks to see if the mouse is is within the bounderies of a hitbox, returns an appropriate function if so.
	this.inBounds = function(){
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			return true;
		}
		else{
			return false;
		};
	};

	//If the hitcheck is successfull, jumps the track. 
	this.hitCheck = function(){
		if(this.inBounds()){
			this.jumpPos(mouseX - this.barX);
		}
	}

	//Resizes the element based on the current dimentions of the canvas.
	this.updateSize = function(){
		this.width = width*(3/5);
		this.height = 8 + height*1/144;
		this.x = width *(1/5);
		this.y = height- this.height*5;
		this.barWidth = this.width * 0.94; 
		this.barHeight = this.height *0.25;
		this.barX = this.x + (this.width - this.barWidth)/2;
		this.barY = this.y + (this.height - this.barHeight)/2;
	};
}