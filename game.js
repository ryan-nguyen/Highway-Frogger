//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "white";
ctx.font = GAME_FONTS;
var rotX = CHAR_START_X;
var rotY = CHAR_START_Y;
var intervaltime = TIME_PER_FRAME;
var jump = 5;
var score = 0;
var lives = 10;
var isdead = 3;
var isdead2 = 3;
var carspriteX = 0;
var lilyspriteY = 0;
var lilytimeout;
var goldcount = 0;
var lilycounter = 0;
var holdingbug = false;
var checkpointX = 0;
var checkpointY = 0;
var bgsheetX = 0;
var cars = ["1","2","3","4","5","6","7","8","9","10","11","12"];
cars[0] = {vx: Math.random()*4+1, x: 32, y:453};
cars[1] = {vx: Math.random()*4+1, x: 128, y:453};
cars[2] = {vx: Math.random()*4+1, x: 288, y:453};
cars[3] = {vx: (-1)*Math.random()*4-1, x: 64, y:421};
cars[4] = {vx: (-1)*Math.random()*4-1, x: 200, y:421};
cars[5] = {vx: (-1)*Math.random()*4-1, x: 360, y:421};
cars[6] = {vx: Math.random()*4+1, x: 0, y:389};
cars[7] = {vx: Math.random()*4+1, x: 220, y:389};
cars[8] = {vx: (-1)*Math.random()*4-1, x: 80, y:357};
cars[9] = {vx: (-1)*Math.random()*4-1, x: 370, y:357};
cars[10] = {vx: Math.random()*4+1, x: 40, y:325};
cars[11] = {vx: Math.random()*4+1, x: 325, y:325};

var logs = ["1","2","3","4","5"];
logs[0] = {vx: 5, x: 0, y: 197};
logs[1] = {vx: 5, x: 150, y: 197};
logs[2] = {vx: 5, x: 300, y: 197};
logs[3] = {vx: 2, x: 0, y: 133};
logs[4] = {vx: 2, x: 230, y: 133}

var lily = ["1", "2", "3", "4", "5"];
lily[0] = {vx: (-1)*2, x: 0, y: 229};
lily[1] = {vx: (-1)*2, x: 153, y: 229};
lily[2] = {vx: (-1)*2, x: 306, y: 229};
lily[3] = {vx: (-1)*4, x: 100, y: 165};
lily[4] = {vx: (-1)*4, x: 315, y: 165};

var goal = ["1","2","3","4","5","6"];
goal[0] = {x:28, x2:36, y:101, reached:false, realx: 32};
goal[1] = {x:92, x2:100, y:101, reached:false, realx: 96};
goal[2] = {x:156, x2:164, y:101, reached:false, realx: 160};
goal[3] = {x:224, x2:232, y:101, reached:false, realx: 228};
goal[4] = {x:288, x2:296, y:101, reached:false, realx: 292};
goal[5] = {x:352, x2:360, y:101, reached:false, realx: 356};


//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet: Image API:
// http://www.html5canvastutorials.com/tutorials/html5-canvas-images/
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_FR;  // source image location set in constants.js

var jumpImage = new Image();
jumpImage.ready = false;
jumpImage.onload = setAssetReady;
jumpImage.src = PATH_JI

var bgImage = new Image();
bgImage.ready = false;
bgImage.onload = setAssetReady;
bgImage.src = PATH_BG;

var carImage = new Image();
carImage.ready = false;
carImage.onlaod = setAssetReady;
carImage.src = PATH_CI;

var etcImage = new Image();
etcImage.ready = false;
etcImage.onload = setAssetReady;
etcImage.src = PATH_EI;

var lilyImage = new Image();
lilyImage.ready = false;
lilyImage.onload = setAssetReady;
lilyImage.src = PATH_LI;

var bgImageSheet = new Image();
bgImageSheet.ready = false;
bgImageSheet.onload = setAssetReady;
bgImageSheet.src = PATH_BGS;


function setAssetReady()
{
	this.ready = true;
}

//$(document).ready(function(){
	initKeyboard();
//});


//function keyfunc(e){

//}

//Display Preloading
//ctx.fillRect(0,0,stage.width,stage.height);
//ctx.fillStyle = "#000";
//ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, intervaltime);
var gameloop, currX, currY;

function timeout(){
	timeoutvar = setInterval(update, intervaltime);
}

function preloading()
{
	if (charImage.ready && bgImage.ready)
	{
		clearInterval(preloader);
//		ctx.fillRect(0,0,stage.width,stage.height);
//		ctx.fillStyle = "#ffffff";
//		ctx.fillText("Frogger", TEXT_PRELOADING_X, TEXT_PRELOADING_Y);

		timeout();
//		gameloop = setInterval(update, intervaltime);
	}
}

function gameOver(){
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,stage.width,stage.height);
	ctx.fillStyle = "#000000";
	ctx.fillText("Game Over", (stage.width/2)-50, (stage.height/2)-50);
	ctx.fillText("Score: " + score, (stage.width/2)-50, (stage.height/2));
}

function reset(){

	clearInterval(timeoutvar);
	isdead = 3;
	isdead2 = 3;
	if(holdingbug == true){
		rotX = checkpointX;
		rotY = checkpointY;
	} else{
		rotX = CHAR_START_X;
		rotY = CHAR_START_Y;
	}
	currX = 0;
	currY = 0;
	jump = 5;
	if(lives > 0){
		timeoutvar = setInterval(update,intervaltime);
	}else {
		gameOver();
	}
}

function dead(){
	lives --;
	ctx.drawImage(etcImage,
					0,32,            // sprite upper left positino
					CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 72 x 96
					rotX, rotY,  // canvas position
					1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
				);
	clearInterval(timeoutvar);
	setTimeout(reset,1000);

}

//------------
//Game Loops
//------------
//currX, currY is a reference to  the image in sprite sheet
currX = IMAGE_START_X;
currY = IMAGE_START_Y;

function drawlily(){
	if(lilycounter >= 20){
		lilycounter = 0;
		lilyspriteY += CHAR_HEIGHT;
		if (lilyspriteY >= 224){
			lilyspriteY = 0;
		}
	}
	lilycounter++;
	for(var i=0; i<lily.length; i++){
		lily[i].x += lily[i].vx;
		if((rotX >= lily[i].x-3)
			&& (rotX <= lily[i].x + 74)
			&& (rotY == lily[i].y)){
				rotX += lily[i].vx;
			}
			if((rotY == lily[i].y)
				&& ((rotX > lily[i].x+74)
				|| (rotX < lily[i].x-3))){
					isdead2 --;
				}
			if(lily[i].x < -102){
				lily[i].x = STAGE_WIDTH;
			}
			ctx.drawImage(lilyImage,
			0,lilyspriteY,
			103, CHAR_HEIGHT,
			lily[i].x, lily[i].y,
			1*103, 1*CHAR_HEIGHT
			);
	}
}

function handlekeys(){
	if(keyArray[0] == true){
		if(rotY!=101){
			rotX -= 32;
		}
		currY = 32;
		keyArray[0] = false;
		jump = 0;
	}
	if(keyArray[1] == true){
		if(rotY!=101){
			rotY -= 32;
		}
		if(holdingbug == true){
			score -= 10;
		} else{
			score += 10;
		}
		currY = 0;
		keyArray[1] = false;
		jump = 1;
	}
	if(keyArray[2] == true){
		if(rotY!=101){
			rotX += 32;
		}
		currY = 96
		keyArray[2] = false;
		jump = 2;
	}
	if(keyArray[3] == true){
		if(rotY < 485){
			if(holdingbug == true){
				score += 10;
			} else{
				score -= 10;
			}
			rotY += 32;
		}
		currY = 64;
		keyArray[3] = false;
		jump = 3;
	}
}

function drawgoal(){
	for(var i=0; i<goal.length; i++){
		if(goal[i].reached == false){
			ctx.drawImage(etcImage,
			0, 96,
			CHAR_WIDTH, CHAR_HEIGHT,
			goal[i].realx, goal[i].y,
			1*CHAR_WIDTH, 1*CHAR_HEIGHT);
		}
	}
}
function drawlogs(){
	for(var i=0; i<logs.length; i++){
			logs[i].x += logs[i].vx;
			if((rotX >= logs[i].x-5)
				&& (rotX <= logs[i].x+82)
				&& (rotY == logs[i].y)){
					rotX += logs[i].vx;
			}
			if((rotY == logs[i].y)
				&& ((rotX > logs[i].x+82)
				|| (rotX < logs[i].x-5))){
					isdead --;
				}

			if(logs[i].x > STAGE_WIDTH){
				logs[i].x = -110;
			}

			ctx.drawImage(etcImage,
			0,0,
			110, CHAR_HEIGHT,
			logs[i].x, logs[i].y,
			1*110, 1*CHAR_HEIGHT
			);
	}
}

function drawcars(){
	for(var i=0; i<cars.length; i++){

		cars[i].x += cars[i].vx;
		if(cars[i].x < -32){
			cars[i].x = STAGE_WIDTH;
		}
		if(cars[i].x > STAGE_WIDTH){
			cars[i].x = 0;
		}
		if(i>=0 && i<=2){
			if(i == 1){
			}
				ctx.drawImage(carImage,
						0, 0,
						CHAR_WIDTH, CHAR_HEIGHT,
						cars[i].x, cars[i].y,
						1*CHAR_WIDTH, 1*CHAR_HEIGHT
						);
		}
		if(i>=3 && i<=5){
			ctx.drawImage(carImage,
						32,32,
						CHAR_WIDTH, CHAR_HEIGHT,
						cars[i].x, cars[i].y,
						1*CHAR_WIDTH, 1*CHAR_HEIGHT
						);
		}
		if(i == 6 || i == 7){
			ctx.drawImage(carImage,
						64,0,
						CHAR_WIDTH, CHAR_HEIGHT,
						cars[i].x, cars[i].y,
						1*CHAR_WIDTH, 1*CHAR_HEIGHT
						);
		}
		if(i == 8 || i == 9){
			ctx.drawImage(carImage,
						64,32,
						CHAR_WIDTH, CHAR_HEIGHT,
						cars[i].x, cars[i].y,
						1*CHAR_WIDTH, 1*CHAR_HEIGHT
						);
		}
		if(i == 10 || i == 11){
			ctx.drawImage(carImage,
						32,0,
						CHAR_WIDTH, CHAR_HEIGHT,
						cars[i].x, cars[i].y,
						1*CHAR_WIDTH, 1*CHAR_HEIGHT
						);
		}
		if((rotX <= (cars[i].x+32))
		 && (rotX >= cars[i].x-32)
		 && (rotY == cars[i].y)){
			 dead();
			 return;
		 }
	}
}

function drawfrog(){
	if(jump < 4){
		ctx.drawImage(jumpImage,
						(jump*32),0,            // sprite upper left positino
						CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 72 x 96
						rotX, rotY,  // canvas position
						1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
						);
		jump = 5;
	} else{
		ctx.drawImage(charImage,
						currX,currY,            // sprite upper left positino
						CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 72 x 96
						rotX, rotY,  // canvas position
						1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
						);
	}
	currX += CHAR_WIDTH;
	if (currX >= SPRITE_WIDTH){
		currX = 0;
	}
}

function drawborder(){
		ctx.fillStyle = "#ffffff";
		ctx.fillText("Highway Frogger", 130,30);
		ctx.fillText("Score: " + score, 280, 560);
		ctx.fillText("Lives: " + lives, 20, 560);
		if(holdingbug == true){
			ctx.drawImage(etcImage,
			0, 96,
			CHAR_WIDTH, CHAR_HEIGHT,
			20, 20,
			0.5*CHAR_WIDTH, 0.5*CHAR_HEIGHT);
		}
}
function update()
{
	isdead = 3;
	isdead2 = 3;

	if(lilycounter >= 20){
		bgsheetX += 416;
		if (bgsheetX >= 2496){
			bgsheetX = 0;
		}
	}
	if(holdingbug==false){
		ctx.drawImage(bgImage,0,0);
	} else{
		ctx.drawImage(bgImageSheet,
			bgsheetX, 0,
			416, 576,
			0,0,
			1*416, 1*576);
	}
	handlekeys();
	drawlily();
	drawgoal();
	drawlogs();
	drawfrog();
	drawcars();
	drawborder();

	if(rotX < 0
		|| rotX > 384
		|| (rotY < 133 && (rotX>0 && rotX<28))
		|| (rotY < 133 && (rotX>36 && rotX <92))
		|| (rotY < 133 && (rotX>100 && rotX <156))
		|| (rotY < 133 && (rotX>164 && rotX <224))
		|| (rotY < 133 && (rotX>232 && rotX <288))
		|| (rotY < 133 && (rotX>296 && rotX <352))
		|| (rotY < 133 && (rotX>360 && rotX <STAGE_WIDTH))
		|| (rotY < 101)
		|| (isdead <= 0 && rotY == 197)
		|| (isdead <= 1 && rotY == 133)
		|| (isdead2 <= 0 && rotY == 229)
		|| (isdead2 <= 1 && rotY == 165)
		|| (lilyspriteY == 96 && rotY == 229)
		|| (lilyspriteY == 96 && rotY == 165)
	){
		dead();
		return;
	} else if(rotY == 101){
		for(var i=0; i<goal.length; i++){
			if(rotX >= goal[i].x && rotX <= goal[i].x2 && goal[i].reached != true && holdingbug == false){
//				score += 1000;
				checkpointX = goal[i].realx;
				checkpointY = goal[i].y;
				holdingbug = true;
				goal[i].reached = true;
				goldcount++;
				for (var i = 0; i<cars.length; i++){
					if((i>=0 && i<=2)
					|| i==6
					|| i==7
					|| i==10
					|| i==11){
						cars[i].vx+=3;
					} else{
						cars[i].vx-=3;
					}
				}
			}
		}
		if(goldcount == 6){
			lives = 0;
		}
		//23-55
//		reset();
	}else{

	}
	if(rotY == 485 && rotX>=0 && rotX <=50 && holdingbug == true){
		score+=1000;
		holdingbug = false;
		for (var i = 0; i<cars.length; i++){
			if((i>=0 && i<=2)
			|| i==6
			|| i==7
			|| i==10
			|| i==11){
				cars[i].vx-=3;
			} else{
				cars[i].vx+=3;
			}
		}
	}
}
