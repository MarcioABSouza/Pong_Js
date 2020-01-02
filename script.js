
var WIDTH=900, HEIGHT=600, pi=Math.pi;
var canvas, ctx;
var player, ai;

let keys = {};

let scoreplayerone = document.querySelector('#playerone');
let scoreplayertwo = document.querySelector('#playertwo');

canvas = document.getElementById('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx = canvas.getContext('2d');



let ball = {
    x: canvas.width / 2 - (30/2),
    y: canvas.height / 2 - (30/2),
    height: 15,
    width: 15, 
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 5
};

let tileleft = {
    x: 10,
    y: canvas.height /2 -60,
    height: 120, 
    width: 30,
    score: 0, 
    speed: 20
}

let tileright = {
    x: WIDTH - 40,
    y: canvas.height /2 -60,
    height: 120, 
    width: 30,
    score: 0, 
    speed: 20
}

document.addEventListener('keydown', (e)=>{
    keys[e.keyCode] = true;
    console.log(keys)
},false)


document.addEventListener('keyup', (e)=>{
    delete keys[e.keyCode];
},false)


function moveTiles(){
    if(87 in keys && tileleft.y > 0){
        tileleft.y -= tileleft.speed;
    }else if(83 in keys && tileleft.y + tileleft.height < canvas.height){
        tileleft.y += tileleft.speed;
    }
    if(38 in keys && tileright.y > 0 ){
        tileright.y -= tileright.speed;
    }else if(40 in keys && tileright.y + tileright.height < canvas.height){
        tileright.y += tileright.speed;
    }

}

function moveBall(){
    if(ball.y + ball.height >= tileleft.y && ball.y <= tileleft.y + tileleft.height && ball.x < tileleft.x + tileleft.width){
        ball.dirx = 1; // Multiplado por -1 inverte o valor   
        ball.mod += 0.4;

    }else if(ball.y + ball.height >= tileright.y && ball.y <= tileright.y + tileright.height && ball.x + ball.width>= tileright.x){
        ball.dirx = -1;
        ball.mod += 0.4;
     }

     if(ball.y <= 0){
        ball.diry *= -1;
     }else if(ball.y + ball.height > canvas.height){
        ball.diry *= -1;
     }

     ball.x += (ball.speed + ball.mod)* ball.dirx;
     ball.y += (ball.speed + ball.mod)* ball.diry;

     if(ball.x < 0){
         newGame('playertwo')
     }else if(ball.x + ball.width > canvas.width){
         newGame('playerone')
     }

}

function newGame(winner){
    if(winner == 'playerone'){
        tileleft.score++;
        scoreplayerone.innerHTML = tileleft.score;

    } else{
        tileright.score++;
        scoreplayertwo.innerHTML = tileright.score;
    }

    tileleft.y = canvas.height/2 - tileleft.height / 2
    tileright.y = tileleft.y;
    ball.y = canvas.height/ 2 - ball.height/2;
    ball.x = canvas.width / 2 - ball.width /2;
    ball.mod = 0;
}

function draw(){
    if(tileleft.score >= 7 || tileright.score >= 7){
       return false;
    }

    ctx.clearRect(0,0, canvas.width,canvas.height);

    moveTiles()
    moveBall()

    ctx.fillStyle = 'white';
    ctx.fillRect(tileleft.x,tileleft.y,tileleft.width,tileleft.height);
    ctx.fillRect(tileright.x,tileright.y,tileright.width,tileright.height);
    ctx.fillRect(ball.x,ball.y,ball.width,ball.height);

    requestAnimationFrame(draw);
   
}

draw()