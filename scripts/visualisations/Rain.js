//Creates Particles from an emitter with a set starting velocity, gravity and drag are applied to particles as they move to create arking effect
function Rain(){

	//Vis Properties
	this.name = "Rain";
	this.particleArray = [];
	//Position of the emmitter
	this.emitX = width*0.05;
	this.emitY = width*0.05;
	this.launchThreshold = 1; // Particles under this velocity limit are not emitted.
	this.particleLimit = 1000; // Hard cap on number of particles, lower numbers increase perfromance.
		
	var gravity = createVector(0, 0.6); //Acceleration due to gravity, higher values = faster falling.
	var fluidDensity = 0.002; //Effects drag on particles, slowing them down, higher values, more rapid decleration.

	//Creates a new particle with postion (x, y), velocity should be a p5 vector object
	function Particle(x, y, velocityX, velocityY, size, hue){
		this.pos = createVector(x,y);
		this.velocity = createVector(velocityX, velocityY);
		this.size = size; //Holds size of current particle
		this.hue = hue; //Holds colour of current particle 

		//Updates the particle motion
		this.updateParticle = function(){	
			//Updates postion and velocity based on force of gravity
			this.pos.add(this.velocity);
			this.velocity.add(gravity);

			//Calculates the drag force; Assumes a cross sectional area and drag co-effcient of 1
			var dragForce = (fluidDensity*this.velocity.magSq())/2; //Calculates drag based on velocity
			this.velocity.setMag(this.velocity.mag() - dragForce); //Removes drag force from magnitude of velocity
			this.velocity.limit(100); //Limits very high velocities to prevent errors.
		}

		//Draws The Particel at (x,y) with diameter of 'size'
		this.draw = function(){
			fill(this.hue, 50, 100);												
			ellipse(this.pos.x,this.pos.y,this.size);								
		}
	};

	//Creates new particles at position (emitX, emitY) with an initial speed based on fourier.analyze()
	function emitParticles(emitX, emitY, analyzeArr, particleArr, threshold=0){
		for(var i=0; i<analyzeArr.length; i++){
			var velocityX =  map(analyzeArr[i], 0, 255, 0, 76); //Paricles have a 1:1 chance of luanching in either direction, and a speed between 0 and 51;
			var velocityY = 0; //No starting velocity in the y axis
			var particle = new Particle(emitX, emitY, velocityX, velocityY, 6, map(i, 0, 31, 0, 359));

			//If the velocity is not over the threshold constant don't creat new particles, can be used to improve performance
			if(Math.abs(velocityX) > threshold){
				particleArr.push(particle);
			}
		}

	};

	//Removes particles from an array that would be offscreen or if the number of particles exceeds the particle cap. 
	//If limit is not specified, extra particles and not removed.
	function removeParticles(array, limit=null){
		//Removes particles from the end of the array when over limit
		if(array.length>limit && limit !== null){
			array.splice(limit, (array.length - limit))
		}

		//Removes particles that would be offscreen. Creates a flair effect based on the particle's postion.
		for(var i=array.length-1; i >= 0; i--){
			if(array[i].pos.y > height){
				colorMode(RGB);
				//Maps colour of flair x distance
				fill(map(array[i].pos.x, 0, width, 0, 255), map(array[i].pos.x, 0, width, 0, 255), map(array[i].pos.x, 0, width, 0, 255), 64);
				rect(array[i].pos.x, 0, array[i].size, height);
				array.splice(i, 1);
				colorMode(HSB);
			}
		}

	};

	//Draws the visualisastion to canvas
	this.draw = function(){
		push();
		colorMode(HSB);
		var analyze = fourier.analyze(32).splice(0, 32);

		//Removes old particles and adds new			
		removeParticles(this.particleArray);
		emitParticles(this.emitX, this.emitY, analyze, this.particleArray, 5);

		//Draws and updates all the particles in the particle array.
		for(var i=0; i<this.particleArray.length; i++){
			this.particleArray[i].draw();
			this.particleArray[i].updateParticle();

		}

		//Draws the sun based on the amplitued of the song
		fill(50, 50, 100)
		ellipse(this.emitX, this.emitY, map(amp.getLevel(),0,1,width/20,width/10));
		colorMode(RGB);
		pop();
	}
}