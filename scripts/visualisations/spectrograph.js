//Draws a heatmap of the audio as time goes on
function Spectrograph(){
	this.name = "Spectrograph"; //Vis name
	this.array = new Array() //Creates a new array to store the data from the FFT.
	this.bins = 256; //Numbers of bins to use with fourier .analyse; Higher number = Better Resolution, Lower = Better performace.
	this.plotSizeX = 3; //Width of each plot.
	this.plotSizeY = 3; //Height of each plot.
	this.width = this.plotSizeX * this.bins; //Width of the graph
	this.height = this.plotSizeY * this.bins;
	this.xStart = (width - this.width)/2;
	this.yStart = (height - this.height)/2;

	//Draws to the screen
	this.draw = function(){
		//Adds and removes new entries. Only runs every 15th frame to improve performance
		if(frameCount%15 == 0){
			//If removes old entries from the array that would otherwise be drawn offsceen.
			if(this.array.length>=this.width/this.plotSizeX){
				this.array.shift();
			}

			this.array.push(fourier.analyze(this.bins).slice(0, 256)); //Adds new entries to the array frame by frame.
		

		}

		push();
		noStroke();
		colorMode(HSB); 
		for(var i=0; i<this.array.length;i++){
			for(var j=0; j<this.array[0].length;j++){
				fill(map(this.array[i][j], 0, 255, 0, 360), 100, 100);
				rect(this.xStart + (i*this.plotSizeX), this.yStart + (j*this.plotSizeY), this.plotSizeX, this.plotSizeY);
			}
		}

		colorMode(RGB);
		pop();
	};


	//Resizes the visualisation
	this.onResize = function(){
		this.xStart = (width - this.width)/2;
		this.yStart = (height - this.height)/2;
	}
}
