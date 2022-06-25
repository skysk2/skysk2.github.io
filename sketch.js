let px = 140; py = 345;
let pwidth = 40, pheight = 60;
let pHP = 1;
let stage = 0;
let time ;
let time_limit = 30;
let stoptime;
let gametime;

let button;
let rbutton;

let ja = 0;
let jumping = 0;
let xja = 0;
let xjumping = 0;
let direction = 2;
let fallingvelocity = 1;

let handcannon;
let hx, hy;

let bulletx = -10, bullety = -10;
let bulletv = 0;;

let missile = [];

let enemy;
let ex = 375;
let ey = 349;
let ex2 = 630;
let ey2 = 188;
let ex3 = 30;
let ex4 = 700;
let ex5 = 150;
let exv = 1;
let exv2 = 1;
let exv4 = 7;
let exv5 = 4.5;

let hitcount = 0;

let interaction;

let t = 0;

function setup() {
  createCanvas(750, 400);
  rectMode(CENTER);
  textAlign(CENTER);
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(50);
  text('Shoot them All',width/2,height/2-100);
  textSize(20);
  text('Shoot the all enemy',width/4,height/2-30);
  text('Purples are all your enemy!',width/4,height/2-5);
  text('If you hit with obstacles,',width/4,height/2+30);
  text('you\'ll lose your life.',width/4,height/2+55);
  text('Your life gone or you fall down,',width/4,height/2+90);
  text('game will be over.',width/4,height/2+115);
  text('press left or right arrow to move',width*3/4,height/2-30);
  text('press Q to shoot your gun',width*3/4,height/2+5);
  text('press W to jump forward',width*3/4,height/2+40);
  text('press G to interaction',width*3/4,height/2+75);
  text('Limit time is 30 second!',width*3/4,height/2+110)
  button = createButton('Press here to Start');  
  rbutton = createButton('Click here to restart game');
  rbutton.hide();
  frameRate(60);

}

function draw() {
    button.center();
    button.position(width/2-70,height/2+140);
    button.mousePressed(start);
  if (stage == 1) {
    game();
  }
  time =  millis();
  
}

function move() {
  if(keyIsDown(LEFT_ARROW)){
    px -= 3;
  }
  if(keyIsDown(RIGHT_ARROW)){
    px += 3;
  }
}

function j() {
  py = py +jumping;
  jumping = jumping + ja;
  if(jumping == -7) {
    jumping = 0;
    ja = 0;
  }
  px = px + xjumping;
  xjumping = xjumping + xja;
  if(xjumping == -14||xjumping == 14) {
    xjumping = 0;
    xja = 0;
  }
  
}

function keyPressed() {
  if(keyCode === LEFT_ARROW){
    direction = 1;
  } else if(keyCode === RIGHT_ARROW){
    direction = 2;
  }

  // 1 = left, 2 = right

  // w-jump
  if(py == 349||py == 188) {
    if(keyCode === 87||keyCode === 119) {
      if(direction == 1) {
        ja --;
        xja--;

      } else if (direction == 2) { 
        ja--;
        xja++;
      }
    }
  }
  // g - interaction
  if(keyCode == 71 || keyCode == 103){
    if(interaction == 1) {
        py = 188;
    }
    if(interaction == 2) {
        py = 349;
    }
  }
  // q - shoot
  if(keyCode == 81||keyCode == 113) {
    if(direction == 1) {
      bulletx = hx;
      bullety = hy;
      bulletv = -2;
    }
    if(direction == 2) {
      bulletx = hx;
      bullety = hy;
      bulletv = 2;
    }
  }

}

function start() {
  stage = 1;
  px = 140; py = 345;
  pHP = 1;

  jumping = 0;
  ja = 0;
  xjumping = 0;
  xja = 0;

  bulletx = -10;
  bullety = -10;
  bulletv = 0;

  ex = 375;
  ey = 349;
  ex2 = 630;
  ey2 = 188;
  exv = 1;
  exv2 = 1;
  ex3 = 28;
  ex4 = 700;
  ex5 = 150;

  hitcount =0;

  stoptime = time;
}

function game() {
  button.hide();
  rbutton.hide();
  move();
  j();
  collision();

//platform
  rectMode(CENTER);
  background(222,184,135);
  stroke(0);
  strokeWeight(2);
  fill(222,159,110);
  rect(160,225,160,15);
  rect(375,225,120,15);
  rect(630,225,240,15);
  rect(110,386,220,15);
  rect(375,386,180,15);
  rect(640,386,220,15);

//ladder
  push();
  fill(150,100,90)
  rect(610,298,40,160.5);
  fill(222,184,135);
  rect(610,371,30,15);
  rect(610,341,30,15);
  rect(610,311,30,15);
  rect(610,281,30,15);
  rect(610,251,30,15);
  fill(222,159,110);
  rect(610,221,30,7);

  //interaction
  if(px>=595&&px<=625&&py==349) {
    interaction = 1;
  } else if(px>=595&&px<=625&&py==188) {
    interaction = 2;
  } else {
    interaction = 0;
  }
  if(interaction == 1) {
    push();
    fill(0,255,255);
    textSize(15);
    text('press G to go up',px,py-40);
    pop();
  }
  if(interaction == 2) {
    push();
    fill(0,255,255);
    textSize(15);
    text('press G to go down',px,py-40);
    pop();
  }

    //gravity
    if(py<=height) {
      py = py + fallingvelocity;
      fallingvelocity = 1;
    } 
    if(80<px&&240>px&&py>=225-37.5&&py<=225-37){
      py = py;
      fallingvelocity = 0;
      jumpcounter = 0;
    } else if(315<px&&px<435&&py>=225-37.5&&py<=225-37){
      py = py;
      fallingvelocity = 0;
    } else if(px>510&&py>=225-37.5&&py<=225-37) {
      py = py;
      fallingvelocity = 0;
    } 
    if(225>px&&py>=386-37.5&&py<=386-37){
      py = py;
      fallingvelocity = 0;
    } else if(270<px&&px<465&&py>=386-37.5&&py<=386-37){
      py = py;
      fallingvelocity = 0;
    } else if(px>530&&py>=386-37.5&&py<=386-37) {
      py = py;
      fallingvelocity = 0;
    } 

    if(py == 401) {
      pHP = 0;
    }

    //collision
    if(px<242&&py>386-33&&px<width/2) {
      px = 242;
    }
    if(px>=262&&py>386-33) {
      if(px>0&&px<width/2)
        px = 262;
    }
    if(px<=486&&py>386-33) {
      if(px > width/2) {
        px = 486;
      }
    }
    if(px>=508&&py>386-33) {
      px = 508
    } 

    if(px-25 < 0) {
      px = 25;
    }
    if(px+25 >width) {
      px = width-25;
    }
    if(py-45 < 0) {
      py +=3;
    }

    if(px>=58&&py>225-33&&py<225+37.5) {
      if(px<=200) {
      px = 58;
      }
    }
    if(px<=262&&py>225-33&&py<225+37.5) {
      if(px>=200&&px<=280) {
      px = 262;
      }
    }
    if(px>=293&&py>225-33&&py<225+37.5) {
      if(px>=280&&px<=400) {
      px = 293;
      }
    }
    if(px<=457&&py>225-33&&py<225+37.5) {
      if(px>=400&&px<=460) {
      px = 457;
      }
    }
    if(px>=488&&py>225-33&&py<225+37.5) {
      if(px>=460&&px<=590) {
        px = 488;
      }
    }

//character
  push();
  noStroke();
  fill(230);
  rectMode(CENTER);
  rect(px,py,pwidth,pheight);
  fill(255,0,0);
  rect(px,py+14,40,32)
  fill(0);
  rect(px-16,py+2,8,8);
  rect(px-16,py+18,8,8);
  rect(px-8,py+10,8,8);
  rect(px-8,py+26,8,8);
  rect(px,py+2,8,8);
  rect(px,py+18,8,8);
  rect(px+8,py+10,8,8);
  rect(px+8,py+26,8,8);
  rect(px+16,py+2,8,8);
  rect(px+16,py+18,8,8);
  pop();

  //handcannon
  hy = py + 10;
  if(direction == 1) {
    hx = px -20;
  }
  if(direction == 2) {
    hx = px + 20;
  }
  push();
  noStroke();
  fill(255,255,0);
  rect(hx,hy,15,10);
  pop();
  
  //bullet
  push();
  fill(0,255,0);
  rect(bulletx,bullety,8,8);
  pop();
  bulletx = bulletx + bulletv;
  if(bulletx >= px+54||bulletx <= px-54) {
    bulletx = -10;
    bullety = -10;
    bulletv = 0;
  }

  //missile
  if(random(1) <0.008) {
    missile.push(new Missile());
  }

  for(let m of missile) {
    m.move();
    if(m.show()) {
      pHP = 0;
    }

    if(m.show2()) {
      pHP = 0;
    }
  }

  //enemy
   push();
   noStroke();
   fill(255,0,255);
   rect(ex,ey,40,60);
   rect(ex2,ey2,40,60);
   rect(ex3,ey,40,60);
   rect(ex4,ey,40,60);
   rect(ex5,ey2,40,60);
   pop();
   ex += exv;
   ex2 += exv2;
   ex4 += exv4;
   ex5 += exv5;
   if(ex > 400||ex<350) {
    exv *=-1;
   }
   if(ex2>670||ex2<590) {
    exv2 *=-1;
   }
   if(ex4 > width-15||ex4<660) {
    exv4 *= -1;
   }
   if(ex5>220||ex5<100) {
    exv5 *= -1;
   }

   //HP
   push();
   fill(0,255,255);
   noStroke();
   textSize(20);
   text('HP : '+pHP,50,25)
   //timer
   stoptime = stoptime;
   gametime = int((time - stoptime)/1000);
   text('Time : '+ (time_limit - gametime),150,25);
   pop();
  
   if(time_limit-gametime == 0) {
    pHP = -1;
   }
   //time over
   if(pHP == -1) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,190);
    rect(width/2,height/2,width,height);
    fill(0,250);
    rect(width/2,height/2,width*3/4,height);
    fill(255);
    textSize(50);
    text('Time Over',width/2, height*1/4);
    textSize(25);
    text('Tip : Time Limit is 30 second.',width/2,height/2);
    pop();
    gameend();
   }
  //game over
  if(pHP == 0) {
    t = random([1,2,3,4,5]);
    if(t == 1) {
      t = 'You can use ladder to teleport upstair'
    }
    if(t == 2) {
      t = 'Move faster using both arrow and W!'
    }
    if(t == 3) {
      t = 'Watch your head! Watch out for missiles.'
    }
    if(t == 4) {
      t = 'The bullet is short,but it\'s up to you'
    }
    if(t == 5) {
      t = 'Missiles don\'t disappear even \'game over\''
    }
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,190);
    rect(width/2,height/2,width,height);
    fill(0,250);
    rect(width/2,height/2,width*3/4,height);
    fill(255);
    textSize(50);
    text('Game Over',width/2, height*1/4);
    textSize(25);
    text('Tip : '+ t,width/2,height/2);
    pop();
    gameend();
  }

  //game clear
  if(hitcount == 5) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,190);
    rect(width/2,height/2,width,height);
    fill(0,250);
    rect(width/2,height/2,width/2,height);
    fill(0,0,255);
    textSize(50);
    text('Clear!',width/2, height/2-20);
    textSize(30);
    fill(255);
    text('Time left : '+(time_limit - gametime),width/2,height/2+30);
    text('Try to clear it faster!',width/2,height/2+70);
    pop();
    gameend();
  }

  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);
}

function collision() {
  //bullet-enemy
  if(bullety>301&&bullety<375&&dist(bulletx,bullety,ex,bullety)<38) {
    ex = -100;
    bulletx = -10;
    hitcount ++;
  }
  if(bullety>301&&bullety<375&&dist(bulletx,bullety,ex3,bullety)<38) {
    ex3 = -100;
    bulletx = -10;
    hitcount++;
  }
  if(bullety>301&&bullety<375&&dist(bulletx,bullety,ex4,bullety)<38) {
    ex4 = -100;
    bulletx = -10;
    hitcount++;
  }
  if(bullety>140&&bullety<226&&dist(bulletx,bullety,ex2,bullety)<38) {
    ex2 = -100;
    bulletx = -10;
    hitcount++;
  }
  if(bullety>140&&bullety<226&&dist(bulletx,bullety,ex5,bullety)<38) {
    ex5 = -100;
    bulletx = -10;
    hitcount++;
  }

  //enemy-player
  if(px-20>=ex3-20&&px-20<=ex3+20||px+20>=ex3-20&&px+20<=ex3+20) {
    if(py+30>=ey-30) {
      pHP = 0;
    }
  }
  if(px-20>=ex-20&&px-20<=ex+20||px+20>=ex-20&&px+20<=ex+20) {
    if(py+30>=ey-30) {
      pHP = 0;
    }
  }
  if(px-20>=ex4-20&&px-20<=ex4+20||px+20>=ex4-20&&px+20<=ex4+20) {
    if(py+30>=ey-30) {
      pHP = 0;
    }
  }
  if(px-20>=ex2-20&&px-20<=ex2+20||px+20>=ex2-20&&px+20<=ex2+20) {
    if(py-30<=ey2+30) {
      pHP = 0;
    }
  }
  if(px-20>=ex5-20&&px-20<=ex5+20||px+20>=ex5-20&&px+20<=ex5+20) {
    if(py-30<=ey2+30) {
      pHP = 0;
    }
  }

}

function gameend() {
  stage = 0;
  rbutton.position(width/2-80,height*3/4);
  rbutton.show();
  rbutton.mousePressed(start);
}