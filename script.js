const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
    x:180,
    y:540,
    w:40,
    h:40
};

let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("keydown", e=>{

    if(e.key==="ArrowLeft")
        player.x-=20;

    if(e.key==="ArrowRight")
        player.x+=20;

    if(e.key===" ")
        bullets.push({
            x:player.x+18,
            y:player.y
        });

});

function spawnEnemy(){

    enemies.push({
        x:Math.random()*360,
        y:-30,
        w:30,
        h:30
    });

}

setInterval(spawnEnemy,1000);

function update(){

ctx.clearRect(0,0,400,600);

// Player
ctx.fillStyle="cyan";
ctx.fillRect(player.x,player.y,player.w,player.h);

// Bullet
ctx.fillStyle="yellow";

bullets.forEach((b,i)=>{

    b.y-=8;

    ctx.fillRect(b.x,b.y,4,10);

});

// Enemy
ctx.fillStyle="red";

enemies.forEach((e,ei)=>{

    e.y+=3;

    ctx.fillRect(e.x,e.y,e.w,e.h);

    bullets.forEach((b,bi)=>{

        if(
            b.x<e.x+e.w &&
            b.x+4>e.x &&
            b.y<e.y+e.h &&
            b.y+10>e.y
        ){

            enemies.splice(ei,1);
            bullets.splice(bi,1);
            score++;

        }

    });

});

// Score
ctx.fillStyle="white";
ctx.font="20px Arial";
ctx.fillText("Score : "+score,10,25);

requestAnimationFrame(update);

}

update();
