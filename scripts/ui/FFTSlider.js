//Displays and handles playback control; play/stop, tracking volume.
function FFTSlider(){

	//Generic Properties shared by all ui elements.
	this.isDisplayed = true; //If the element should be drawn or not
	this.width = width*(1/12);
	this.height = 8 + height*1/76;
	this.x = width - this.width*1.5 -4;
	this.y = this.height*2;
	this.colour; //RGB colour as a string, changed when the mouse is hoving over icon to create hightlight effect 
	this.oppacity = 0.8; //Alpha value
	this.toolTip = false; // Should the tooltip/label be displayed adjecent to the cursor

	//These dimentions are used to draw the bar, the dimentions used to work out the bounaries are larger tha  the bar itself making it eaier to click
	this.barWidth = this.width * 0.94 //Bar is 90% the width of the element to account for the time counter(s)
	this.barHeight = this.height *0.25;
	this.barX = this.x + (this.width - this.barWidth)/2; //Centers the bar along the x axis
	this.barY = this.y + (this.height - this.barHeight)/2 // Centers the bar in the middle of the bounding box

	//Draws the element.
	this.draw = function(){
		//Changes the colour and toogles the tooltip on hover
		if(this.isDisplayed){
			if(this.inBounds()){
				this.colour = 'rgba(237,34,93, '+this.oppacity+')';
				this.toolTip = true;
			}
			else{
				this.colour = 'rgba(255,255,255, '+this.oppacity+')';
				this.toolTip = false;
			}			

			noStroke();
			fill(80);
			rect(this.barX, this.barY, this.barWidth, this.barHeight);
			fill(this.colour);
			rect(this.barX, this.barY, controls.FFTSmoothing*this.barWidth, this.barHeight);
			if(this.inBounds()){
				fill(255);
				ellipse(this.barX + controls.FFTSmoothing*this.barWidth, this.y + this.height/2, this.height*0.66 +2, this.height*0.66 +2);

			}

			//Draws current time and duration either side of the bar.
			textAlign(LEFT, CENTER)
			text(Math.round(controls.FFTSmoothing*10)/10, this.barX -28, this.barY  + (this.barHeight/2));
			text('FFT', this.barX + this.barWidth + 8, this.barY + (this.barHeight/2));

			//Draws the tool tip text after the main graphics so tooltip is always ontop.
			if(this.toolTip){
				noStroke();
				fill(255);
				textFont('Helvetica');
				textSize(14);
				textAlign(LEFT, BOTTOM);
				text('Adjust Fourier Smoothing', mouseX -4, mouseY-4);
			}
			
		}
	};

	//Changes FFT Smoothing
	this.changeSmoothing = function(pos){
		controls.FFTSmoothing = pos / this.barWidth;
		fourier.smooth(controls.FFTSmoothing);
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
			this.changeSmoothing(mouseX - this.barX);
		}
	}

	//When the mouse is dragged, check hitbox, then change FFT.
	this.onDrag = function(){
		if(this.inBounds()){
			this.changeSmoothing(mouseX - this.barX);
		}
	}

	//Resizes the element based on the current dimentions of the canvas.
	this.updateSize = function(){
		this.width = width*(1/12);
		this.height = 8 + height*1/76;
		this.x = width - this.width*1.5 -4;
		this.y = this.height*2;
		this.barWidth = this.width * 0.94 //Bar is 90% the width of the element to account for the time counter(s)
		this.barHeight = this.height *0.25;
		this.barX = this.x + (this.width - this.barWidth)/2; //Centers the bar along the x axis
		this.barY = this.y + (this.height - this.barHeight)/2
	};
}