function diffusion(){
    this.name = "Reaction Diffusion";
    
    var dA = 1.0;
    var dB = 0.5;
    var f = 0.055;
    var k = 0.062; 

    function createGrid(){
        var tempGrid = [];
        for(var j = 0; j<100; j++){
            var tempRow = [];
            for(var i = 0; i<100; i++){
                tempRow.push({a:0, b:1});
            };
            tempGrid.push(tempRow);
        }
    
        return tempGrid
    };

    function drawGrid(arr){
        for(var y = 0; y< arr.length; y++){
            for(var x = 0 ; x<arr[0].length; x++){
                fill(arr[y][x].a *255,arr[y][x].b *255, 0)
                rect(x*10,y*10,10,10);
            }
        }
    }
    
    function calcLaplacian(arr, x, y){
        var laplacian = 0;
        var centre = -1;
        var adjacent = 0.5;
        var diagonal = 0.2;

        laplacian += arr[y][x]*centre;
        laplacian += arr[y-1][x]*adjacent;
        laplacian += arr[y+1][x]*adjacent;
        laplacian += arr[y][x-1]*adjacent;
        laplacian += arr[y][x+1]*adjacent;
        laplacian += arr[y-1][x-1]*diagonal;
        laplacian += arr[y+1][x-1]*diagonal;
        laplacian += arr[y-1][x+1]*diagonal;
        laplacian += arr[y+1][x+1]*diagonal;

        return laplacian;
    }

    function generateNext(currentArr, nextArr){
        for(var y = 1; y< nextArr.length -1; y++){
            for(var x = 1 ; x<nextArr[0].length -1; x++){
                var a = currentArr[y][x].a;
                var b = currentArr[y][x].b;
                nextArr[y][x].a = a + (dA * calcLaplacian(currentArr,x,y) - (a * (b * b))) + (f*(1-a));
                nextArr[y][x].b = b + (dB * calcLaplacian(currentArr,x,y) + (a * (b * b))) - ((k+f)*b);
            }
        }
        return nextArr
    }

    function swap(){
        var temp = currentArray;
        currentArray = nextArray;
        nextArray = temp;
    }
    function source(arr){
        for(var i = 30; i<60;i++){
            for(var j = 30; j<60 ; j++){
                arr[i][j].a = 1;
            }
        }
        return arr
    }

    var currentArray = source(createGrid());
    var nextArray = createGrid();
    this.draw = function(){
        drawGrid(currentArray);
        
        nextArray = generateNext(currentArray,nextArray);

        
        swap()

    }

};