var context = canvas.getContext("2d");
var shape = new Object();
var diffcultyLvl = 590;
function diffcultyLevel(speed) {
	diffcultyLvl = speed
}

var board = [
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
	[4, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4, 7, 7, 7, 4],
	[4, 7, 7, 4, 7, 7, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4],
	[4, 7, 4, 4, 7, 4, 4, 4, 7, 4, 7, 7, 7, 4, 7, 4],
	[4, 7, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 4, 4, 7, 4],
	[4, 4, 7, 4, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4],
	[4, 7, 7, 7, 7, 7, 4, 4, 7, 7, 7, 4, 4, 7, 4, 4],
	[4, 7, 4, 7, 4, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4],
	[4, 7, 4, 7, 4, 4, 4, 7, 4, 4, 7, 4, 4, 4, 7, 4],
	[4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 7, 7, 4, 7, 7, 4],
	[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 4],
	[4, 7, 4, 7, 4, 4, 4, 7, 4, 4, 7, 4, 4, 4, 7, 4],
	[4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 7, 7, 4, 7, 7, 4],
	[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 4],
	[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4],
	[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
];
var runn = false;
var gameEnd = false;
var score;
var sound = true;
var pause = false;
var life;
var pac_color;
var start_time;
var time_elapsed;
var gameTime = document.getElementById("lblsetTime").value;
var gT = parseInt(gameTime);
var dif = 590;
var interval;
var interval1;
var interval2;
var interval3;
var ballsAmount = document.getElementById("lblsetBallsNum").value;
var bA = ballsAmount;
var monstersAmount = document.getElementById("lblsetMonsterNum").value;
var color5 = document.getElementById("ball5pt").value;
var color15 = document.getElementById("ball15pt").value;
var color25 = document.getElementById("ball25pt").value;
var audioDie = new Audio('misc/die.mp3');
var audioHamburger = new Audio('misc/bonus.wav');
var audioGame = new Audio('misc/pacmusic.mp3');
var audioLose = new Audio('misc/lose.mp3');
var audioEat = new Audio('misc/eat.mp3');
var audioLifeBonus = new Audio('misc/lifebonus.mp3');
var audioTimeBonus = new Audio('misc/timebonus.wav');
var audioWin = new Audio('misc/win.mp3');
var pos = 4;
var xMnstr1 = 1;
var yMnstr1 = 1;
var xMnstr2 = 50;
var yMnstr2 = 50;
var xMnstr3 = 50;
var yMnstr3 = 50;
var xHmbrgr = 14;
var yHmbrgr = 14;
var xLifepls = 50;
var yLifepls = 50;
var xTimePls = 50;
var yTimePls = 50;
var countTime = 1;
var countHeart = 1;
var timeBonus = 0;
var upKey = 38;
var downKey = 40;
var rightKey = 39;
var leftKey = 37;
var u = 38;
var d = 40;
var r = 39;
var l = 37;

const windows = document.getElementsByClassName("windows");
class UserData {
	constructor(username, password, firstname, lastname, email, birthday) {
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.birthday = birthday;
	}
}
let userLabel = document.getElementById("loggedUser");
let usersMap = new Map();
if (usersMap.size === 0)
	usersMap.set('a', new UserData('a', 'a', '', '', '', '')); // the default user

// [welcome, register, login, game]
function displayDiv(_div) {
	if (_div !== 'game') {
		resetGame();
		userLabel.innerHTML = '';
	}
	if (_div === 'welcome') {
		windows[1].style.display = 'none';
		windows[2].style.display = 'none';
		windows[3].style.display = 'none';
		windows[0].style.display = 'flex';
	}
	else if (_div === 'register') {
		windows[0].style.display = 'none';
		windows[2].style.display = 'none';
		windows[3].style.display = 'none';
		windows[1].style.display = 'flex';
	}
	else if (_div === 'login') {
		windows[0].style.display = 'none';
		windows[1].style.display = 'none';
		windows[3].style.display = 'none';
		windows[2].style.display = 'unset';
	}
	else if (_div === 'game') {
		windows[0].style.display = 'none';
		windows[1].style.display = 'none';
		windows[2].style.display = 'none';
		windows[3].style.display = 'flex';
	}
}

/** accept the user's data from registration form and adds it as a new 'userData' object onto users set */
function submitRegister() {
	const username = document.forms["registerform"]["username"].value;
	const password = document.forms["registerform"]["password"].value;
	const firstname = document.forms["registerform"]["firstname"].value;
	const lastname = document.forms["registerform"]["lastname"].value;
	const email = document.forms["registerform"]["email"].value;
	const birthday = document.forms["registerform"]["birthday"].value;
	// debugger;
	usersMap.set(username, new UserData(username, password, firstname, lastname, email, birthday));
	displayDiv('welcome');
	document.forms['registerform'].reset();
}

function validateUserLogin() {
	const _username = document.forms["loginform"]["username"].value;
	const _password = document.forms["loginform"]["password"].value;
	if (usersMap.has(_username) && usersMap.get(_username).password === _password) {
		userLabel.innerHTML = `Logged User: ${_username}`;
		displayDiv('game');
		document.forms['loginform'].reset();
	}
	else alert(`User ${_username} with password ${_password} is not registered.`);
}

function muteMusic() {
	audioDie.muted = sound;
	audioHamburger.muted = sound;
	audioGame.muted = sound;
	audioLose.muted = sound;
	audioEat.muted = sound;
	audioLifeBonus.muted = sound;
	audioTimeBonus.muted = sound;
	audioWin.muted = sound;
	if (sound) {
		sound = false;
	}
	else {
		sound = true;
	}
}

function pauseGame() {
	if (pause == false && gameEnd == false && runn == false) {
		window.clearInterval(interval);
		window.clearInterval(interval1);
		window.clearInterval(interval2);
		window.clearInterval(interval3);
		audioGame.pause();
		gT = time_elapsed;
		pause = true;
	} else
		return;
}

function resumeGame() {
	if (pause && gameEnd == false && runn == false) {
		interval = setInterval(UpdatePosition, 180);
		interval1 = setInterval(monstersMove, dif);
		interval2 = setInterval(moveHamburger, 410);
		interval3 = setInterval(Draw, 30);
		audioGame.play();
		start_time = new Date();
		pause = false;
	} else
		return;
}

function saveSettings() {
	monstersAmount = document.getElementById("lblsetMonsterNum").value;
	bA = document.getElementById("lblsetBallsNum").value;
	gameTime = document.getElementById("lblsetTime").value;
	color5 = document.getElementById("ball5pt").value;
	color15 = document.getElementById("ball15pt").value;
	color25 = document.getElementById("ball25pt").value;
	dif = $("input[name='difficulty']:checked").val();
	upKey = u;
	downKey = d;
	rightKey = r;
	leftKey = l;
}

function resetGame() {
	gameEnd = false;
	pause = false;
	window.clearInterval(interval);
	window.clearInterval(interval1);
	window.clearInterval(interval2);
	window.clearInterval(interval3);
	board = [
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4, 7, 7, 7, 4],
		[4, 7, 7, 4, 7, 7, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4],
		[4, 7, 4, 4, 7, 4, 4, 4, 7, 4, 7, 7, 7, 4, 7, 4],
		[4, 7, 7, 4, 7, 4, 7, 4, 7, 4, 7, 4, 4, 4, 7, 4],
		[4, 4, 7, 4, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4],
		[4, 7, 7, 7, 7, 7, 4, 4, 7, 7, 7, 4, 4, 7, 4, 4],
		[4, 7, 4, 7, 4, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 4],
		[4, 7, 4, 7, 4, 4, 4, 7, 4, 4, 7, 4, 4, 4, 7, 4],
		[4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 7, 7, 4, 7, 7, 4],
		[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 4],
		[4, 7, 4, 7, 4, 4, 4, 7, 4, 4, 7, 4, 4, 4, 7, 4],
		[4, 7, 4, 7, 4, 7, 4, 7, 4, 7, 7, 7, 4, 7, 7, 4],
		[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 4],
		[4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 4],
		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	];
	ballsAmount = bA;
	audioGame.load();
	xMnstr1 = 1;
	yMnstr1 = 1;
	xMnstr2 = 50;
	yMnstr2 = 50;
	xMnstr3 = 50;
	yMnstr3 = 50;
	xHmbrgr = 14;
	yHmbrgr = 14;
	countTime = 1;
	countHeart = 1;
	timeBonus = 0;
	xLifepls = 50;
	yLifepls = 50;
	xTimePls = 50;
	yTimePls = 50;
}

function newGame() {
	if (runn == false) {
		resetGame();
		runn = true;
		canvasReady();
	}
	else return;
}

function randomsettings() {
	debugger;
	num1 = Math.floor(Math.random() * 100);
	monstersAmount = 3;
	time_elapsed = num1 * 3;
	if (time_elapsed < 60) {
		time_elapsed += 60;
	}
	if (num1 < 41) {
		ballsAmount = num1 + 50;
		monstersAmount = 1;
	} else if (num1 < 50) {
		ballsAmount = num1 + 9;
		monstersAmount = 2;
	} else if (num1 < 91) {
		ballsAmount = num1;
	} else {
		ballsAmount = num1 - 9;
	}
	num2 = Math.floor(Math.random() * 10);
	if (num2 < 3) {
		$('input:radio[name=difficulty]')[0].checked = true;
	} else if (num2 < 6) {
		$('input:radio[name=difficulty]')[1].checked = true;
	} else /*if (num2 < )*/ {
		$('input:radio[name=difficulty]')[2].checked = true;
	}/* else if (num2 < 8) {
		$('input:radio[name=difficulty]')[3].checked = true;
	} else {
		$('input:radio[name=difficulty]')[4].checked = true;
	} */
	document.getElementById("lblsetMonsterNum").value = monstersAmount;
	document.getElementById("lblsetBallsNum").value = ballsAmount;
	document.getElementById("lblsetTime").value = time_elapsed;
}

function leagelMove(posX, posY, monster) {
	if (board[posX][posY] != 4) {
		if (monster == '1') {
			if ((posX == xMnstr2 && posY == yMnstr2) || (posX == xMnstr3 && posY == yMnstr3)) {
				return false;
			} else return true;
		} else if (monster == '2') {
			if ((posX == xMnstr1 && posY == yMnstr1) || (posX == xMnstr3 && posY == yMnstr3)) {
				return false;
			} else return true;
		} else if (monster == '3') {
			if ((posX == xMnstr1 && posY == yMnstr1) || (posX == xMnstr2 && posY == yMnstr2)) {
				return false;
			} else return true;
		}
	} else return false;
}

function getAllPosibleMoves() {
	var posibleMoves = [];
	var posX = xHmbrgr;
	var posY = yHmbrgr;
	if (board[posX + 1][posY] != 4) {
		posibleMoves.push([posX + 1, posY]);
	}
	if (board[posX - 1][posY] != 4) {
		posibleMoves.push([posX - 1, posY]);
	}
	if (board[posX][posY + 1] != 4) {
		posibleMoves.push([posX, posY + 1]);
	}
	if (board[posX][posY - 1] != 4) {
		posibleMoves.push([posX, posY - 1]);
	}
	return posibleMoves;
}

function monsterMove(posX, posY, monster) {
	var move1 = 1000;
	var move2 = 1000;
	var move3 = 1000;
	var move4 = 1000;

	if (leagelMove(posX + 1, posY, monster)) {
		move1 = distance(posX + 1, posY);
	}
	if (leagelMove(posX - 1, posY, monster)) {
		move2 = distance(posX - 1, posY);
	}
	if (leagelMove(posX, posY + 1, monster)) {
		move3 = distance(posX, posY + 1);
	}
	if (leagelMove(posX, posY - 1, monster)) {
		move4 = distance(posX, posY - 1);
	}
	var minDistance = Math.min(move1, move2, move3, move4);
	if (minDistance == move1) {
		if (monster == '1') {
			xMnstr1 = posX + 1;
		} else if (monster == '2') {
			xMnstr2 = posX + 1;
		} else xMnstr3 = posX + 1;
	}
	else if (minDistance == move2) {
		if (monster == '1') {
			xMnstr1 = posX - 1;
		} else if (monster == '2') {
			xMnstr2 = posX - 1;
		} else xMnstr3 = posX - 1;
	}
	else if (minDistance == move3) {
		if (monster == '1') {
			yMnstr1 = posY + 1;
		} else if (monster == '2') {
			yMnstr2 = posY + 1;
		} else yMnstr3 = posY + 1;
	}
	else {// (minDistance == move4) {
		if (monster == '1') {
			yMnstr1 = posY - 1;
		} else if (monster == '2') {
			yMnstr2 = posY - 1;
		} else yMnstr3 = posY - 1;
	}
}

function monstersMove() {
	monsterMove(xMnstr1, yMnstr1, '1');
	if (monstersAmount > 1) {
		monsterMove(xMnstr2, yMnstr2, '2');
	} if (monstersAmount > 2) {
		monsterMove(xMnstr3, yMnstr3, '3');
	}
}

function distance(posx, posy) {
	var xPacman = shape.i;
	var yPacman = shape.j;
	return Math.sqrt((Math.pow(xPacman - posx, 2)) + (Math.pow(yPacman - posy, 2)));
}

function moveHamburger() {
	var allPosibleMoves = getAllPosibleMoves();
	var rand = Math.random();
	if (allPosibleMoves.length == 1) {
		xHmbrgr = allPosibleMoves[0][0];
		yHmbrgr = allPosibleMoves[0][1];
	}
	else if (allPosibleMoves.length == 2) {
		if (rand <= 0.5) {
			xHmbrgr = allPosibleMoves[0][0];
			yHmbrgr = allPosibleMoves[0][1];
		}
		else {
			xHmbrgr = allPosibleMoves[1][0];
			yHmbrgr = allPosibleMoves[1][1];
		}
	}
	else if (allPosibleMoves.length == 3) {
		if (rand <= 0.33) {
			xHmbrgr = allPosibleMoves[0][0];
			yHmbrgr = allPosibleMoves[0][1];
		}
		else if (rand > 0.33 && rand < 0.66) {
			xHmbrgr = allPosibleMoves[1][0];
			yHmbrgr = allPosibleMoves[1][1];
		}
		else {
			xHmbrgr = allPosibleMoves[2][0];
			yHmbrgr = allPosibleMoves[2][1];
		}
	}
	else if (allPosibleMoves.length == 4) {
		if (rand <= 0.25) {
			xHmbrgr = allPosibleMoves[0][0];
			yHmbrgr = allPosibleMoves[0][1];
		}
		else if (rand > 0.25 && rand < 0.5) {
			xHmbrgr = allPosibleMoves[1][0];
			yHmbrgr = allPosibleMoves[1][1];
		}
		else if (rand > 0.5 && rand <= 0.75) {
			xHmbrgr = allPosibleMoves[2][0];
			yHmbrgr = allPosibleMoves[2][1];
		}
		else {
			xHmbrgr = allPosibleMoves[3][0];
			yHmbrgr = allPosibleMoves[3][1];
		}
	}
}

function Start() {
	runn = false;
	audioGame.play();
	if (monstersAmount > 1) {
		xMnstr2 = 1;
		yMnstr2 = 14;
		if (monstersAmount > 2) {
			xMnstr3 = 14;
			yMnstr3 = 1;
		}
	}
	score = 0;
	life = 3;
	gT = parseInt(gameTime);
	pac_color = "yellow";
	var food_remain = ballsAmount;
	var pt15 = Math.floor(0.3 * food_remain);
	var pt25 = Math.floor(0.1 * food_remain);
	var pt5 = food_remain - pt15 - pt25;
	var pacman_remain = 1;
	while (pacman_remain == 1) {
		var x = Math.floor((Math.random() * 5) + 5);
		var y = Math.floor((Math.random() * 5) + 5);
		if (board[x][y] == 7) {
			shape.i = x;
			shape.j = y;
			pacman_remain--;
			board[x][y] = 0;
		}
	}
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			if (board[i][j] == 4) {
				board[i][j] = 4;
			}//wall
			else if (board[i][j] == 7 && food_remain > 0) {
				let randomNum = Math.random();
				if (randomNum < 0.15 && pt15 > 0) {
					pt15--;
					food_remain--;
					board[i][j] = 2;
				}
				else if (randomNum < 0.3 && pt25 > 0) {
					pt25--;
					food_remain--;
					board[i][j] = 3;
				}
				else if (randomNum < 0.45 && pt5 > 0) {
					pt5--;
					food_remain--;
					board[i][j] = 1;
				}
				else board[i][j] = 7;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if (pt15 > 0) {
			pt15--;
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 2;
		} else if (pt25 > 0) {
			pt25--;
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 3;
		} else {
			pt5--;
			food_remain--;
			board[emptyCell[0]][emptyCell[1]] = 1;
		}
	}
	keysDown = {};
	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	addEventListener("keyup", function (e) {
		keysDown[e.keyCode] = false;
	}, false);
	start_time = new Date();
	interval = setInterval(UpdatePosition, 180);
	interval1 = setInterval(monstersMove, dif);
	interval2 = setInterval(moveHamburger, 410);
	interval3 = setInterval(Draw, 30);

}

function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 15) + 1);
	var j = Math.floor((Math.random() * 15) + 1);
	while (board[i][j] != 7) {
		i = Math.floor((Math.random() * 15) + 1);
		j = Math.floor((Math.random() * 15) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 1;
	}
	if (keysDown[downKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	document.getElementById("lblLife").value = life;
	document.getElementById("lblScore").value = score;
	document.getElementById("lblTime").value = time_elapsed;
	var image1 = document.getElementById("monster1");
	var image2 = document.getElementById("monster2");
	var image3 = document.getElementById("monster3");
	var moving50pt = document.getElementById("hamburger");
	var lifePls1 = document.getElementById("heart");
	var timepls10sec = document.getElementById("clock");
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 16; j++) {
			var center = new Object();
			center.x = i * 33 + 15;
			center.y = j * 33 + 15;
			if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 15, center.y - 15, 33, 33);
				context.fillStyle = "blue"; //color 
				context.fill();
			} else if (board[i][j] == 0) { // pacman
				if (pos == 1) //up
				{
					context.beginPath();
					context.arc(center.x + 2, center.y + 2, 13, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y + 2, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();

				}
				if (pos == 2) //down
				{
					context.beginPath();
					context.arc(center.x + 2, center.y + 2, 13, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x - 5, center.y + 2, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();

				}
				if (pos == 3) // left
				{
					context.beginPath();
					context.arc(center.x + 2, center.y + 2, 13, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y - 5, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
				if (pos == 4) // right
				{
					context.beginPath();
					context.arc(center.x + 2, center.y + 2, 13, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color 
					context.fill();
					context.beginPath();
					context.arc(center.x + 2, center.y - 5, 3, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color 
					context.fill();
				}
			} else if (board[i][j] == 1) { //food
				context.beginPath();
				context.arc(center.x + 2, center.y + 2, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = color5; //color 
				context.fill();
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x + 2, center.y + 2, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = color15; //color 
				context.fill();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x + 2, center.y + 2, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = color25; //color 
				context.fill();
			}
		}
	}
	context.drawImage(image1, 33 * xMnstr1 + 2, 33 * yMnstr1 + 3, 25, 30);
	context.drawImage(image2, 33 * xMnstr2 + 2, 33 * yMnstr2 + 3, 25, 30);
	context.drawImage(image3, 33 * xMnstr3 + 2, 33 * yMnstr3 + 3, 25, 30);
	context.drawImage(moving50pt, 33 * xHmbrgr + 2, 33 * yHmbrgr, 30, 30);
	context.drawImage(lifePls1, 33 * xLifepls + 1, 33 * yLifepls + 1, 33, 33);
	context.drawImage(timepls10sec, 33 * xTimePls + 3, 33 * yTimePls + 3, 27, 27);
}

function UpdatePosition() {
	board[shape.i][shape.j] = 7;
	var x = GetKeyPressed()
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 16 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 16 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	//Draw();
	if (board[shape.i][shape.j] == 1) {
		score += 5;
		ballsAmount--;
		audioEat.load();
		audioEat.play();
	} else if (board[shape.i][shape.j] == 2) {
		score += 15;
		ballsAmount--;
		audioEat.load();
		audioEat.play();
	} else if (board[shape.i][shape.j] == 3) {
		score += 25;
		ballsAmount--;
		audioEat.load();
		audioEat.play();
	}
	if (shape.i == xHmbrgr && shape.j == yHmbrgr) {
		score += 50;
		audioHamburger.play();
		window.clearInterval(interval2);
		yHmbrgr = 50;
		xHmbrgr = 50;

	}
	if (shape.i == xLifepls && shape.j == yLifepls) {
		life++;
		audioLifeBonus.play();
		document.getElementById("lblLife").value = life;
		xLifepls = 50;
		yLifepls = 50;
	}

	if (shape.i == xTimePls && shape.j == yTimePls) {
		timeBonus = 10;
		audioTimeBonus.play();
		document.getElementById("lblTime").value = time_elapsed;
		xTimePls = 50;
		yTimePls = 50;
	}
	var currentTime = new Date();
	time_elapsed = timeBonus + gT - Math.floor((currentTime - start_time) / 1000);

	if (life == 1 && countHeart == 1) {
		countHeart--;
		var only1LifeLeft = findRandomEmptyCell(board);
		xLifepls = only1LifeLeft[0];
		yLifepls = only1LifeLeft[1];
	}

	if (time_elapsed == 0) {
		gameEnd = true;
		window.clearInterval(interval);
		window.clearInterval(interval1);
		window.clearInterval(interval2);
		if (score < 150) {
			audioGame.pause();
			window.alert("You can do better then " + score + " points");
			//TIKON
		} else {
			audioGame.pause();
			audioWin.play();
			window.alert("We have a winner!!!");
			//TIKON
		}
	}
	if (time_elapsed == 20 && countTime == 1) {
		countTime--;
		var only20SecLeft = findRandomEmptyCell(board);
		xTimePls = only20SecLeft[0];
		yTimePls = only20SecLeft[1];
	}
	if (ballsAmount == 0) {
		gameEnd = true;
		audioGame.pause();
		audioWin.play();
		window.clearInterval(interval);
		window.clearInterval(interval1);
		window.clearInterval(interval2);
		window.alert("We have a Winner!");
		//TIKON
	}
	if (shape.i == xMnstr1 && shape.j == yMnstr1 || shape.i == xMnstr2 && shape.j == yMnstr2 || shape.i == xMnstr3 && shape.j == yMnstr3) {
		audioGame.pause();
		life--;
		document.getElementById("lblLife").value = life;
		if (life != 0) {
			xMnstr1 = 1;
			yMnstr1 = 1;
			if (monstersAmount > 1) {
				xMnstr2 = 1;
				yMnstr2 = 14;
				if (monstersAmount > 2) {
					xMnstr3 = 14;
					yMnstr3 = 1;
				}
			}
			var afterMnstr = findRandomEmptyCell(board);
			while ((afterMnstr[0] < 4 || afterMnstr[0] > 11) || (afterMnstr[1] < 4 || afterMnstr[1] > 11)) {
				afterMnstr = findRandomEmptyCell(board);
			}
			shape.i = afterMnstr[0];
			shape.j = afterMnstr[1];
			board[afterMnstr[0]][afterMnstr[1]] = 0;
			audioDie.play();
			window.alert("ONE STRIKE LESS, BE CERFUL!");
			//TIKON
			score -= 10;
			audioGame.load();
			audioGame.play();
			start_time = new Date();
			gT = time_elapsed;
		}
		else {
			audioGame.pause();
			audioLose.play();
			window.clearInterval(interval);
			window.clearInterval(interval1);
			window.clearInterval(interval2);
			window.alert("Game Over!");
			//TIKON
		}
		keysDown = {};
		addEventListener("keydown", function (e) {
			keysDown[e.keyCode] = true;
		}, false);
		addEventListener("keyup", function (e) {
			keysDown[e.keyCode] = false;
		}, false);
	}
	board[shape.i][shape.j] = 0;
	if (x == 1 || x == 2 || x == 3 || x == 4)
		pos = x
	//Draw();
}
document.getElementById("up").onkeydown = upkey;
document.getElementById("down").onkeydown = downkey;
document.getElementById("right").onkeydown = rightkey;
document.getElementById("left").onkeydown = leftkey;

function upkey(e) {
	u = e.keyCode;
	document.getElementById("up").value = e.code;
}
function downkey(e) {
	d = e.keyCode;
	document.getElementById("down").value = e.code;
}
function rightkey(e) {
	r = e.keyCode;
	document.getElementById("right").value = e.code;
}
function leftkey(e) {
	l = e.keyCode;
	document.getElementById("left").value = e.code;
}

function canvasReady() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 120px Verdana";
	// Create gradient
	var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop("0", "yellow");
	gradient.addColorStop("0.5", "white");
	gradient.addColorStop("1.0", "yellow");
	// Fill with gradient
	context.fillStyle = gradient;
	context.fillText("Ready!", 58, 300);
	setTimeout(canvasSet, 1500);
}
function canvasSet() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 120px Verdana";
	// Create gradient
	var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop("0", "yellow");
	gradient.addColorStop("0.5", "white");
	gradient.addColorStop("1.0", "yellow");
	// Fill with gradient
	context.fillStyle = gradient;
	context.fillText("Set..", 140, 300);
	setTimeout(canvasGo, 1500);
}
function canvasGo() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "bold 120px Verdana";
	// Create gradient
	var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
	gradient.addColorStop("0", "yellow");
	gradient.addColorStop("0.5", "white");
	gradient.addColorStop("1.0", "yellow");
	// Fill with gradient
	context.fillStyle = gradient;
	context.fillText("Go!!!", 105, 300);
	setTimeout(Start, 800);
}

// jQuery section
$(function () {
	var $about = $("#about");
	var $nb_about = $("#nb_about");

	$about.dialog({
		autoOpen: false,
		modal: true,
		width: 500,
		height: 400,
		resizable: false,
		open: function () {
			jQuery('.ui-widget-overlay').bind('click', function () {
				$about.dialog('close');
			})
		},
		close: function () {
			$nb_about.prop('disabled', false);
		}
	});
	$nb_about.click(function () {
		$(this).prop('disabled', true);
		$about.dialog("open");
	});
});

$(function () {
	var $instructions = $("#instructions");
	var $gameinstructions = $("#gameinstructions");

	$instructions.dialog({
		autoOpen: false,
		modal: true,
		width: 700,
		height: 530,
		resizable: false,
		open: function () {
			jQuery('.ui-widget-overlay').bind('click', function () {
				$instructions.dialog('close');
			})
		},
		close: function () {
			$gameinstructions.prop('disabled', false);
		}
	});
	$gameinstructions.click(function () {
		$(this).prop('disabled', true);
		$instructions.dialog("open");
	});
});

$(document).ready(function () {
	// this will happens AFTER the page has finished loading
	$("#registerform").validate({
		rules: {
			username: "required",
			password: {
				required: true,
				minlength: 8,
				alphanumeric: true
			},
			firstname: {
				required: true,
				lettersonly: true
			},
			lastname: {
				required: true,
				lettersonly: true
			},
			email: "required",
			birthday: "required"
		},
		messages: {
			username: " Please Enter Username.",
			password: {
				required: " Enter Password",
				minlength: " Password length should me at least 8 characters.",
				alphanumeric: " no symbols allowed!"
			},
			firstname: {
				required: "Enter First Name",
				lettersonly: "name should contain ONLY letters."
			},
			lastname: {
				required: "Enter Last Name",
				lettersonly: "name should contain ONLY letters."
			},
			email: " Enter a valid email address.",
			birthday: "enter your birthday"
		}
	});
	$("#loginform").validate({
		rules: {
			username: {
				required: true,
				alphanumeric: true
			},
			password: {
				required: true,
				alphanumeric: true,
			}
		},
		messages: {
			username: " Enter a valid username.",
			password: " Enter a valid password."
		}
	});
	$("#settingsform").validate({
		rules: {
			ballsnumber: {
				required: true,
				digits: true,
				min: 50,
				max: 90
			},
			monstersnum: {
				required: true,
				min: 1,
				max: 3,
				digits: true,
			},
			gameTime: {
				min: 60,
				required: true,
				digits: true
			},
		},
		messages: {
			ballsnumber: {
				required: " Enter the balls amount!",
				min: " Minimum 50 balls!",
				max: " Maximum 90 balls!",
				digits: " Only digits allowed!"
			},
			monstersnum: {
				required: " Enter the monsters amount!",
				min: " Minimum 1 monster!",
				max: " Maximum 3 monster!",
				digits: " Only digits allowed!"
			},
			gameTime: {
				required: " Enter the time for a game!",
				min: " Minimum 60 second!",
				digits: " Only digits allowed!"
			},
		}
	});
});

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
