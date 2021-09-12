function Ants(){
    this.name = "ants" //Vis name

    //Constructor function for ant object.
    function Ant(startX, startY,direction=0){
        //Position of the ant.
        this.x = startX;
        this.y = startY;
        this.oldX;
        this.oldY;
        this.direction = direction; //Cardinal direction stored as number 0 to 3, 0 is up, 1 is left.

        //Updates the postion and dirrection of the ant using data from the input array.
        this.update = function(arr){
            //If the current cell is false turn clockwise, if true, turn anti clockwise.
            if(arr[ant.x][ant.y] === false){
                ant.direction += 1;
            }
            else{
                ant.direction -=1;
            }

            //Wraps the direction round.
            if(ant.direction == 4){
                ant.direction = 0;
            }
            else if(ant.direction == -1){
                ant.direction = 3;
            }

            //Saves the last position of the ant.
            this.oldX = this.x;
            this.oldY = this.y;

            //Moves the ant forward depending on the direction.
            if(ant.direction == 0){
                ant.y -=1;
            }
            else if(ant.direction == 1){
                ant.x += 1;
            }
            else if(ant.direction == 2){
                ant.y += 1;
            }
            else if(ant.direction ==3){
                ant.x -=1;
			}
			
			//Wraps the ant around from one side of the array to the other
			if(ant.x >= arr.length){
				ant.x = ant.x -(arr.length-1);
			}
			else if(ant.x < 0){
				ant.x = (arr.length-1) + ant.x;
			}

			if(ant.y >= arr.length){
				ant.y = ant.y -(arr.length-1);
			}
			else if(ant.y < 0){
				ant.y = (arr.length-1) + ant.y;
			}
        }
    }

    //Creates a 128*128 arr with all entries false.
    this.arr = new Array;
    for(var i=0; i<96; i++){
        this.arr.push(new Array(96).fill(false));
    };

    var cellSize = Math.floor(height/this.arr.length); //Size in pixels of the 'cells' to be drawn
    var ant = new Ant(Math.floor(this.arr.length/2), Math.floor(this.arr.length/2)); //Initalises ant in the middle of the the grid.
	var xBorder = width - (cellSize*this.arr.length); // Horizontal padding
    var yBorder = height - (cellSize*this.arr[0].length); //Vertical padding

    this.draw = function(){
        push(); //Saves the drawing state
        noStroke();
        for(var i=0; i<this.arr.length; i++){
            for(var j=0; j<this.arr.length; j++){
                //The cell the ant is located in is coloured red, true/1 cells are white, false/0 are black.
                if(ant.x==i && ant.y==j){
                    fill(255, 0, 0);

                }
                else if(this.arr[i][j] === true){
                    fill(255);
                    
                }
                else{
                    fill(110);

                }
                rect(i*cellSize + (xBorder/2), (j*cellSize) + (yBorder/2), cellSize, cellSize);
            }
		}
		pop();

		//Updates array and ant when sound is playing.
		if(sound.isPlaying()===true){
			this.arr[ant.x][ant.y] = !this.arr[ant.x][ant.y]; //Updates the arr based on the position of the ant.
			ant.update(this.arr); //updates the ants movement and position.
		}
    }

    //Resizes the visualisation.
    this.onResize = function(){
        cellSize = Math.floor(height/this.arr.length); 
        xBorder = width - (cellSize*this.arr.length); 
        yBorder = height - (cellSize*this.arr[0].length);   
    }

}