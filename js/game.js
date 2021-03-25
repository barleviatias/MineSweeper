'use stirct';
const MINE = '💥';
const FLAG = '🚩';
var gCell = {
	minesAroundCount: 0,
	isShown: true,
	isMine: false,
	isMarked: false,
};
var gBoard = [];
var gLevel = {
	SIZE: 4,
	MINES: 2,
};
var gGame = {
	isOn: false,
	shownCount: 0,
	markedCount: 0,
	secsPassed: 0,
};

function init() {
	var elBtn=document.querySelector('.emoj')
	elBtn.innerText='😎'
	gBoard = buildBoard();
	console.table(gBoard);
	renderBoard(gBoard, '.board-container');
	// gBoard[getRandomInt(0,gGame.SIZE)][getRandomInt(0,gGame.SIZE)].isMine=true
	// gBoard[0][2].isMine = true;
	// gBoard[1][3].isMine = true;
	getRandomMines(gBoard);
	setMinesNegsCount(gBoard);
	renderBoard(gBoard, '.board-container');
	gGame.isOn = true;
}
function setLevel(elBtn){
	var lvl=elBtn.dataset.i
	console.log(lvl);
	switch (lvl) {
		case 'easy':gLevel.SIZE=4
		gLevel.MINES=2
			
			break;
		case 'medium':gLevel.SIZE=8
		gLevel.MINES=12
			
			break;
		case 'hard':gLevel.SIZE=12
		gLevel.MINES=30
			
			break;
		
		default:
			break;
	}
	init()
}
function buildBoard() {
	var board = [];
	var size=gLevel.SIZE
	for (var i = 0; i < size; i++) {
		board.push([]);
		for (var j = 0; j < size; j++) {
			board[i].push({
				minesAroundCount: 0,
				isShown: false,
				isMine: false,
				isMarked: false,
			});
			// renderCell({i,j}, MINE)
		}
	}
	// board[0][2].isMine=true;
	console.log(board[0][1].isMine);
	return board;
}

function setMinesNegsCount(board) {
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board.length; j++) {
			var currCell = board[i][j];
			if (currCell.isMine) continue;
			var location = {
				i,
				j,
			};
			var minesAround = countNeg(location);
			if (minesAround === 0) continue;
			currCell.minesAroundCount = minesAround;
		}
		console.log(currCell);
		// board[i][j].minesAroundCount=countNeg(cellCord)
	}
}

function countNeg(location) {
	var mineCount = 0;
	for (var i = location.i - 1; i <= location.i + 1; i++) {
		if (i < 0 || i >= gBoard.length) continue; // if i is out of mat
		for (var j = location.j - 1; j <= location.j + 1; j++) {
			if (j < 0 || j >= gBoard[i].length) continue; // if j is out of mat
			if (i === location.i && j === location.j) continue; // if on clicked location

			var currNeg = gBoard[i][j];
			if (currNeg.isMine) mineCount++;
		}
	}
	return mineCount;
}

function cellClick(elCell) {
	if(!gGame.isOn)
	{
		getRandomMines(gBoard);
	setMinesNegsCount(gBoard);
	gGame.isOn=true
	}
	var location = {};
	location.i = +elCell.dataset.i;
	location.j = +elCell.dataset.j;
	var currCell = gBoard[location.i][location.j];
	// console.log(currCell);
	if(!currCell.isMarked){

		currCell.isShown=true
		elCell.classList.add('open')
	}
	if(currCell.minesAroundCount===0&&!currCell.isMines)
	{
		revealNeg(location)
	}
	
	renderCell(elCell);
	console.table(gBoard);
}
function revealNeg(location){
	for (var i = location.i - 1; i <= location.i + 1; i++) {
		if (i < 0 || i >= gBoard.length) continue; // if i is out of mat
		for (var j = location.j - 1; j <= location.j + 1; j++) {
			if (j < 0 || j >= gBoard[i].length) continue; // if j is out of mat
			if (i === location.i && j === location.j) continue; // if on clicked location
			var currNeg = gBoard[i][j];
			console.log('i',i+'j',j);
			if(currNeg.isMine||currNeg.minesAroundCount)continue;
			elCell=document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
			// elCell.innerText=currNeg.minesAroundCount
			elCell.classList.add('open')
			currNeg.isShown=true
		}
	}
}
function getCoordById(strId) {
	var coordArray = strId.split('-');
	var location = {
		i: +coordArray[1],
		j: +coordArray[2],
	};
	return location;
}

function getRandomMines(board){
	
	mineSize=gLevel.MINES
	size=gLevel.SIZE
	for(var i=0;i<mineSize;i++)
	{
		var rnd = getRandomInt(0,4)
		// console.log(rnd);
		board[getRandomInt(0,size-1)][getRandomInt(0,size-1)].isMine=true
		// console.log(gBoard);
	}
}


function gameOver(){
	var elBtn=document.querySelector('.emoj')
	elBtn.innerText='😭'
}

function cellMarked(elCell){
	event.preventDefault()
	var location = {};
	location.i = +elCell.dataset.i;
	location.j = +elCell.dataset.j;
	var currCell = gBoard[location.i][location.j];
	if(currCell.isShown)return
	if(currCell.isMarked){
		elCell.innerText=''
		currCell.isMarked=false
	}else{
		elCell.innerText=FLAG
		currCell.isMarked=true
	}

}
// checkGameOver() {}
// expandShown(board, elCell,
//     i, j){}


