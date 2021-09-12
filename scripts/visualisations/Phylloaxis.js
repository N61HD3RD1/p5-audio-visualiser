/*==================================================================================================================================
    Draws a phylotacixis to the canvus and edits sound and colour depending on the amplitudes
====================================================================================================================================*/
function Phylloaxis(){
    this.name = "Phylloaxis"
    angleMode(DEGREES);                         //Changes mode to degrees 
    this.arr = [];                              //Initalising array to put previous amplitudes
    this.n = 0;                                 //N is the number of pettles in the array
    

    //This constructor function creates the pettles for the phylloaxis
    function Pettle(nPettle, pettleAngle=137.5){            
        
        this.nPettle = nPettle;                 //The position in the array of the pettle is n Pettle 
        this.c = 20  //Mapping the amplitude of colour to a HSB colour system                     
        this.pettleAngle = pettleAngle;         

        this.DrawPettle = function(colour){   //Method to draw each pettle  with colour
            this.a = this.nPettle * this.pettleAngle;        //Equation to work out where to place the point/pettle
            this.radius = this.c * sqrt(this.nPettle);
            this.x = this.radius * cos(this.a) + width /2;
            this.y = this.radius * sin(this.a) + height/2;

            fill(colour,100,100, 50);           //FILL each point with maximum saturation and brightness
            ellipse(this.x,this.y,40*amp.getLevel(),40*amp.getLevel());
     
        }
    }


    //What is drawing through the canvus
    this.draw =  function() {
        colorMode(HSB);     
        noStroke();                 
        this.largerN
        if(this.n>1024){                            //Checks if there more than 1024 pettles 
            this.largerN = this.n % 1025;           //Gets the modulus of that number in base 1024
            this.arr.splice(this.largerN,1,new Pettle(this.largerN,137.9));     //Creates a new pettle and puts it in the array in that specific position 

            for(var i = 0; i<this.arr.length; i++){     //drawing each pettle with the mapped colour as a parameter 
                this.arr[i].DrawPettle(map(fourier.analyze()[i],0,255,0,360));
            }
        }
        else{
            this.arr.push(new Pettle(this.n,137.9));        //Pushing 1024 pettles to the array frame by frame 

            for(var i = 0; i<this.arr.length; i++){         //Itterating through the array applying the draw method to the pettle
                this.arr[i].DrawPettle(map(fourier.analyze()[i],0,255,0,360));
            }
    }
       this.n++;

    };
    colorMode(RGB);//Changing colour mode back to RGB
};