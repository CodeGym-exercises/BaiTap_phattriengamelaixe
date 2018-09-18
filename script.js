let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let score = 0;
let live = 10;
let allScore = [0];
window.addEventListener('keydown',function(event){
	switch(event.keyCode){
		case 37:
			keyEvent.event = "left";
			console.log("37->left");
			break;
		case 39:
			keyEvent.event = "right";
			console.log("39->right");
			break;
	}
});

// ============ init object =============
let keyEvent = {
	event: undefined
}
let Element = function(src,x,y,width,height,speed){
	this.img = undefined;
	this.posX = x;
	this.posY = y;
	this.width = width;
	this.height = height;
	this.speed = speed;

	this.init = function(){
		this.img = new Image();
		this.img.src = "imgs/"+src+".png";
	}
	this.draw = function(){		
		this.init();// -->>>
		ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
	}

	this.updateKeyEvent = function(k){
		let key = k;
		if(this.posY>canvas.height+this.height){
			this.posY = -50;
			live-=1;
			//this.posX = Math.round(Math.random()*canvas.width);
		}
		if(this.posX > canvas.width-this.width||
			this.posX < 0){
			this.speed = -this.speed;
		}
		if(key=="item"){
			this.posY += this.speed;		
		}else if(key=="left"){
			this.posX -= this.speed;
		}else if(key=="right"){
			this.posX += this.speed;
		}
	}
}


//============Create rocket ===========
let rocket = new Element("rocket",450,550,60,70,5);

// ===========Create item ===========
let itemArray = [];
let arrayX = [150,300,450];

for(let i = 0; i <3 ; i++){
	addItem(i,arrayX);
}
// ============Create boom =========




function addItem(i,arr){
	let x = 0;
	let randomSpeed = 0,item = undefined;
	if(i==0){
		x = arr[Math.floor(Math.random()*3)];
		randomSpeed = ((Math.random()*4)+1);
	}else if(i==1){
		x = arr[Math.floor(Math.random()*3)];
		randomSpeed = ((Math.random()*4)+1);
	}else{
		x = arr[Math.floor(Math.random()*3	)];
		randomSpeed = ((Math.random()*4)+1);
	}
	item = new Element("coin",x,-50,50,50,randomSpeed)
	itemArray.push(item);
}


// ==== function ====
function collision(arr){
	for(let i = 0; i< 3; i++){
		if(rocket.posY - arr[i].posY<50&&
			rocket.posY - arr[i].posY>-50&&
			rocket.posX - arr[i].posX<10&&
			rocket.posX - arr[i].posX>-10){
			arr.splice(i,1);
			addItem(i,arrayX);
			console.log("it's work")
			score+=1;			
			break;
		}
	}
}

function gameOver(){
	if(live==0){
		alert("GameOver, score: " + score);
		allScore.push(score);
		score = 0;
		live = 10;
	}
}

function findMax(arr){
	let max = arr[0];
	for(let i = 0; i < arr.length; i++){
		if(max<arr[i]){
			max = arr[i];
		}
	}
	return max;
}

//remove element of array arr.splice(startPos, number)

// ======== run game ========
function animate(){
	requestAnimationFrame(animate);
		//console.log("runing");
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.font = "25px Arial";
	ctx.fillStyle = "#fff";
	ctx.fillText("Score: "+score,10,30);
	ctx.fillText("Live:  "+live,10,60);
	ctx.fillText("Highest score:  "+findMax(allScore),10,90);
	rocket.draw();
	rocket.updateKeyEvent(keyEvent.event);
	
	
	for(let i = 0; i< itemArray.length; i++){
		itemArray[i].draw();
		itemArray[i].updateKeyEvent("item");
	}

	collision(itemArray);
	gameOver();
}
animate();
