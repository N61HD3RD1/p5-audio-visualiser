/* 
	 This function draws rectangles and maps them to the radius of the shape

=========================================================================================
Main Contents of particleVis:
Discription | function name
1)Main Declarations to be used globally 
2)Function to draw to canvus | this.draw
*/



function Circular(){
	/*===================================================================================================
	1)Main Declorations to use globally
	  =================================================================================================== */

	this.name = "Circular"					//Naming the visualisation
	this.vol							//Declaring amplitude to be stored in the array 
	this.volhistory = [];					//Storing music in a array
	/*===================================================================================================
	2) Function to draw to canvus
	  =================================================================================================== */


	this.draw = function(){	
		push();				
		angleMode(DEGREES);					//Changing the angles from radians to degrees
		colorMode(HSB);
		noFill();								
		this.vol = amp.getLevel();//geting the amplitude
		this.volhistory.push(this.vol);//Storing the amplitude into an array 
		translate(width/2,height/2);//Translating so circle is in the middle
		this.radiusSize = width/20; //Adusting radius so that it always scales to size of screen
		//over 360 degrees so that a circle is made with an alternating size on vertex depending on the amplitude 
		for (var i = 0; i<360; i++){
			this.r = map(this.volhistory[i],0,1,this.radiusSize,this.radiusSize * 10);
			this.colours = map(this.volhistory[i],0,1,360,0);  //Maps colours the amplitude using HSB format instead or RGB
			stroke(this.colours,100,100);
			rect(this.r*cos(i),this.r*sin(i),10,this.r); //puts a rectangle on the canvus 

		};
		colorMode(RGB);
		pop();
		//makes sure that there is no indexing error by removing the last spot
		if(this.volhistory.length > 360){
			this.volhistory.splice(0,1);

		};
	};
};