let font;
let path;
let fontPath;
let pathArray;
let targetArray = [];
let shapeArray = [];
let x = -1;
let i;
let flag = false;
let first = true;
let mod = 0;
let index = 0;
let boxes = []
let moving = false;
let wordsIndex = 1;
let words = ["EAT","sleep","RAVE","REPEAT","ALSO","SHOWER","AND","HYDRATE"];
let currentWord;
let frameCount = 0;
let staticArrayVal;
let tempLetters = [];
let tempTargets = [];
let tl = false;
let speed = 0.20;

function setup(){
    textAlign(CENTER);
    createCanvas(windowWidth, windowHeight);
    background(255);
    opentype.load('data/VectFont.ttf', function(err, f){ // isues with A B D AND P create A Exception
        if(err){
            console.log(err);
        } else {
            font = f;
        }
    });
}

function draw(){
    fill(0,0,0);
    background(255,255,255,50);
    flag = false;
    mod = 0;
    currentWord = words[wordsIndex]

    if(first){  //create shape array
    shapeArray = newArr(words[0]);
    targetArray = newArr(words[wordsIndex]);
    first = false;
    }

    drawMessage();

    if(moving){
        stepTowards();
    }
}

function morph(){
    resizeArray();
    moving = true; 
}

function drawMessage(){
    for(let i = 0; i < shapeArray.length; i++){ // does not handle 'i' 'j' or '!'
        beginShape();
        for(let j = 0; j < shapeArray[i].length; j++){
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
        if(shapeArray[i][j].type == "L" || shapeArray[i][j].type == "M"){
            vertex(shapeArray[i][j].x, shapeArray[i][j].y);
        }  else if(shapeArray[i][j].type == "C"){
            bezierVertex(shapeArray[i][j].x1, shapeArray[i][j].y1,shapeArray[i][j].x2, shapeArray[i][j].y2, shapeArray[i][j].x, shapeArray[i][j].y);
        } else if(shapeArray[i][j].type == "Q"){
            quadraticVertex(shapeArray[i][j].x1, shapeArray[i][j].y1,shapeArray[i][j].x, shapeArray[i][j].y);
        }
        }
        endShape(CLOSE);
        if(flag){
            mod+=1;
        } else {
            mod = 0
        }
    }

    if(tl){
        for(let i = 0; i < tempLetters.length; i++){ // does not handle 'i' 'j' or '!'
            beginShape();
            for(let j = 0; j < tempLetters[i].length; j++){
                if(i == 0){} // if no previous shape do nothing
                    else if(tempLetters[i][j].x > MaxX(shapeArray[i-mod-1])){
                    fill(0);
                    flag = false; // flag and mod handle letters with multiple holes such as 'B' and '8';
                    } else if (tempLetters[i][j].y < MinY(tempLetters[i-mod-1])){
                        fill(0);
                        flag = true;
                    } else {
                        fill(255);
                        flag = true;
                    }
            if(tempLetters[i][j].type == "L" || tempLetters[i][j].type == "M"){
                vertex(tempLetters[i][j].x, tempLetters[i][j].y);
            }  else if(tempLetters[i][j].type == "C"){
                bezierVertex(tempLetters[i][j].x1, tempLetters[i][j].y1,tempLetters[i][j].x2, tempLetters[i][j].y2, tempLetters[i][j].x, tempLetters[i][j].y);
            } else if(tempLetters[i][j].type == "Q"){
                quadraticVertex(tempLetters[i][j].x1, tempLetters[i][j].y1,tempLetters[i][j].x, tempLetters[i][j].y);
            }
            }
            endShape(CLOSE);
            if(flag){
                mod+=1;
            } else {
                mod = 0
            }
        }
    }
}

function stepTowards(){

    let arrivedCount = 0;

    if(tl){ // for left over letters to transition inside others
        for(let z = 0; z < tempLetters.length; z++){
            for(let l = 0; l < tempLetters[z].length; l++){

                let r1 = Math.floor(random(0, targetArray.length-1));
                let r = Math.floor(random(1, targetArray[r1].length-1));

                let mover = tempLetters[z][l];
                let target = targetArray[targetArray.length-1][l%2];

                mover.x = lerp(mover.x,target.x,speed);
                mover.y = lerp(mover.y,target.y,speed);
            }
        }
    }

    for(let i = 0; i < shapeArray.length; i++){
        for(let j = 0; j < shapeArray[i].length; j++){

            let mover = shapeArray[i][j];
            let target = targetArray[i][j];
            
            if(dist(mover.x,mover.y,target.x,target.y)<0.1){
                arrivedCount++
                if(arrivedCount>=totalPoints(shapeArray)){
                    onArrive();
                    return;
                }
            } else {

            mover.x = lerp(mover.x,target.x,speed);
            mover.y = lerp(mover.y,target.y,speed);
            
            }


        }
    }
}



function onArrive(){
    moving = false;
    tl = false;
    tempLetters = [];
    shapeArray = [...targetArray]; // clone of target
    if(wordsIndex != words.length-1){
        wordsIndex++;
    } else {
        wordsIndex = 0;
        targetArray = newArr(words[wordsIndex]);
        //reset();
        //return;
    }
    targetArray = newArr(words[wordsIndex]);

    morph();
}

function drawLineMessage(){
    for(let i = 0; i < shapeArray.length; i++){ //line drawing
        for(let j = 1; j < shapeArray[i].length; j++){
                line(shapeArray[i][j].x, shapeArray[i][j].y,shapeArray[i][j-1].x, shapeArray[i][j-1].y);
                fill(255,0,0);
                noStroke()
                ellipse(shapeArray[i][j].x, shapeArray[i][j].y, 5, 5);
                fill(0,0,0);
                stroke(0);
                strokeWeight(5);

        }
    }
}

function resizeArray(){

    if(targetArray.length>=shapeArray.length){
        //new word larger

        for(let j = 0; j < shapeArray.length; j++){ //for length of current word
            if (shapeArray[j].length>targetArray[j].length){ //if letter is larger than new letter in this pos

                //smaller new letter

                shapeArray[j].length = targetArray[j].length; //removes points from end of array

            } else {

                //larger new letter

                let iterations2 = targetArray[j].length-shapeArray[j].length;  // pre calculate to avoid changes in length in loop

                for(let i = 0; i < iterations2; i++){ //for difference in number of points in the two letters

                    let randomPos = shapeArray[j][1]; // get random point in letter not on ends

                    let newVertex = {type: "L", x:randomPos.x, y:randomPos.y}; //create new point at this position
                    shapeArray[j].splice(1, 0, newVertex); // insert point into array
                }
            }
            //additional letters
        }
            
        let iterations3 = targetArray.length-shapeArray.length; // run x additional times

            for(let i = iterations3; i > 0; i--){
                let lastLetter = targetArray[targetArray.length - i];
                shapeArray.push([]); // create new empty letters
                for(let q = 0; q < lastLetter.length; q++){
                    let r1 = Math.floor(random(0, shapeArray.length-1)); //random existing letter
                    let r = Math.floor(random(2, shapeArray[r1].length-1)); //random point in that letter

                    let randomPos = shapeArray[r1][r];
                    
                    let newVertex = {type: "L", x: randomPos.x, y:randomPos.y}; //create new point at this position
                    shapeArray[shapeArray.length-1].push(newVertex); //store points for new letters inside existing letters
                }
            }

    } else {
        //new word smaller
        let diff = shapeArray.length - targetArray.length;
        
        for (let t = 0; t<diff; t++){
            tl = true;
            tempLetters.push([...shapeArray[shapeArray.length-(1+t)]]);
        }

        // for(let z = 0; z < tempLetters.length; z++){
        //     for(let l = 0; l < tempLetters[z].length; l++){
                
                

        //         let r1 = Math.floor(random(0, targetArray.length-1)); //random existing letter
        //         let r = Math.floor(random(1, targetArray[r1].length-1)); //random point in that letter

        //         let ttarget = targetArray[r1][r];
        //         tempTargets[0].push([ttarget]);
        //     }
        // }

        shapeArray.length = targetArray.length;

        for(let j = 0; j < shapeArray.length; j++){ //for length of current word
            if (shapeArray[j].length>targetArray[j].length){ //if letter is larger than new letter in this pos
                //smaller new letter
                shapeArray[j].length = targetArray[j].length; //removes points from end of array

            } else {
                //larger new letter

                let iterations2 = targetArray[j].length-shapeArray[j].length;  // pre calculate to avoid changes in length in loop

                for(let i = 0; i < iterations2; i++){ //for difference in number of points in the two letters

                    let randomPos = shapeArray[j][1]; // get random point in letter not on ends

                    let newVertex = {type: "L", x:randomPos.x, y:randomPos.y}; //create new point at this position
                    shapeArray[j].splice(1, 0, newVertex); // insert point into array
                }
            }
            //additional letters
        }
            
        let iterations3 = targetArray.length-shapeArray.length; // run x additional times

            for(let i = iterations3; i > 0; i--){
                let lastLetter = targetArray[targetArray.length - i];
                shapeArray.push([]); // create new empty letters
                for(let q = 0; q < lastLetter.length; q++){
                    let r1 = Math.floor(random(0, shapeArray.length-1)); //random existing letter
                    let r = Math.floor(random(2, shapeArray[r1].length-1)); //random point in that letter

                    let randomPos = shapeArray[r1][r];
                    
                    let newVertex = {type: "L", x: randomPos.x, y:randomPos.y}; //create new point at this position
                    shapeArray[shapeArray.length-1].push(newVertex); //store points for new letters inside existing letters
                }
            }
    }
}

function reset(){
    wordsIndex = 1;
    moving  = false;
    shapeArray = newArr(words[0]);
    targetArray = newArr(words[wordsIndex]); 
}

function newArr(w){
    temp = []
    flag = false;
    fill(0);
    fontPath = font.getPath(w, width/3, height/2, width/11);
    path = new g.Path(fontPath.commands, {align : 'center'});
    pathArray = path.commands;

    for(let i = 0; i < pathArray.length; i++){
        if(pathArray[i].type != "Z"){
            //pathArray[i].vector = createVector(pathArray[i].x,pathArray[i].y);
        } else {
            temp.push(pathArray.slice(x+1, i)); // inserts range of shape
            x = i;
        }
    }
    x = -1;
    return temp
}
https://stackoverflow.com/questions/16468124/count-values-of-the-inner-two-dimensional-array-javascript
function totalPoints(arr){
    let s = 0;
    arr.forEach(function(e,i,a){s += e.length; });
    return s;
}

https://www.codegrepper.com/code-examples/javascript/midpoint+formula+javascript
function midpoint(x1, y1, x2, y2) {
	return [(x1 + x2) / 2, (y1 + y2) / 2];
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