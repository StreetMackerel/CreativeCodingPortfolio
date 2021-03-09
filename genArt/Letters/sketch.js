let font;
let path;
let fontPath;
let pathArray;
let shapeArray = [];
let x = -1;
let i;
let flag = false;
let mod = 0;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    opentype.load('data/BigBoy.otf', function(err, f){
        if(err){
            console.log(err);
        } else {
            font = f;
        }
    });
    
}

function createWord(){
   
}

function draw(){
    
    background(255);
    translate(20, 220);
    fill(0);
    //noStroke();
    flag = false;
    mod = 0;

    if(x == -1){  //create shape array
    if(!font) return
    fontPath = font.getPath('BB8 is jim Carrey %', 0, 0, 100);
    path = new g.Path(fontPath.commands);
    //path = g.resampleByAmount(path, 1000);
    pathArray = path.commands;

    for(i = 0; i < pathArray.length; i++){
        if(pathArray[i].type == "Z"){
           shapeArray.push(pathArray.slice(x+1, i)); // inserts range of shape
           x = i;
        }
    }
    }

    for(i = 0; i < shapeArray.length; i++){ // does not handle 'i' 'j' or '!'
        beginShape();
        for(j = 0; j < shapeArray[i].length; j++){
            if(i == 0){} // if no previous shape do nothing
                else if(shapeArray[i][j].x > MaxX(shapeArray[i-mod-1])){
                fill(0);
                flag = false; // flag and mod handle letters with multiple holes such as 'B' and '8';
                } else if (shapeArray[i][j].y < MinY(shapeArray[i-mod-1])){
                    fill(0);
                    flag = true;
                } else {
                    fill(255);
                    flag = true;
            }
        if(shapeArray[i][j].type == "C"){
            curveVertex(shapeArray[i][j].x1, shapeArray[i][j].y1);
            curveVertex(shapeArray[i][j].x2, shapeArray[i][j].y2);
        }  else {
                curveVertex(shapeArray[i][j].x, shapeArray[i][j].y);
                }
        }
        endShape(CLOSE);
        if(flag){
            mod+=1;
        } else {
            mod = 0
        }
    }

    function MaxX(arr){
        let arr2 = [];

        for(z = 0; z < arr.length; z++){
            arr2.push(arr[z].x)
        }
        return Math.max(...arr2)
    }

    function MinY(arr){
        let arr2 = [];

        for(z = 0; z < arr.length; z++){
            arr2.push(arr[z].y)
        }
        return Math.min(...arr2)
    }
}