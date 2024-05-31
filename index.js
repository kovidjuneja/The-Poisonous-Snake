let inputDir={x: 0,y: 0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');//above declares all the variables which are needed during the code
let lastpainttime=0;
let speed=10;
let score=0;
let snakeArr=[
    {x:13,y:13}
]
food={x:15,y:16};//food is an object which snake will eat
//for any game the main component is game loop what it does that it paints the screen again and again

//the basic method which we could think is of set interval in which we could do the things repeatedly

//GAME FUNCTIONS
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime-lastpainttime)/1000<1/speed){
        return;
    }
    lastpainttime=ctime;
    gameengine();
}

function isCollide(snake){
    //two cases of collision would occur one is with itself and other with the wall
    //itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}
function gameengine(){
    //Part 1: Updating the snake array & Food
     if(isCollide(snakeArr)){
        gameOverSound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!");
        snakeArr=[{x:13,y:13}];
        musicsound.play();
        score=0;
     }

     //now in the process of flow if we have eaten the food then what changes we have to do in the system is done below
   
     if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("ToBeat",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML="ToBeat: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        foodSound.play();
         snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
         let a=3;
         let b=15;
         food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
     }

     //Moving the snake
     for(let i=snakeArr.length-2;i>=0;i--){
     
        snakeArr[i+1]={...snakeArr[i]};//this makes a newer object which is snakeArr[i+1] with same properties as the snakeArr[i]
        //if not done we may have reference problem and in that case all the elements will point to one element itself
     }

     snakeArr[0].x+=inputDir.x;
     snakeArr[0].y+=inputDir.y;
    //Part 2:we are displaying the snake when neccessary
    board.innerHTML="";
         //the board is made empty for analysis
    snakeArr.forEach((e,index)=>{//i.e each element which is present within the snake array
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
        snakeElement.classList.add('head');//to add the features we are adding the class
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');//to add the features we are adding the class
    board.appendChild(foodElement);
}
//but whenever we are rendering the animation it's better to use requestAnimationFrame
//requestAnimationFrame tells the java script what exactly to do
musicsound.play();
let hiscore=localStorage.getItem("ToBeat");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("ToBeat",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="ToBeat: "+hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:1,y:0};//i am going to start the game in this direction
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;        
        default:
            break;
    }
})