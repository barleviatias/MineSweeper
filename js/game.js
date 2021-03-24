'use stirct';
const MINE = '💥';
const FLAG = '💥';
var SIZE = 4;
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
	gBoard = buildBoard();
	console.table(gBoard);
	renderBoard(gBoard, '.board-container');
    gBoard[0][2].isMine=true;
    gBoard[1][3].isMine=true;
    setMinesNegsCount(gBoard);
	renderBoard(gBoard, '.board-container');
	gGame.isOn = true;
}

function buildBoard() {
	var board = [];
	for (var i = 0; i < SIZE; i++) {
		board.push([]);
		for (var j = 0; j < SIZE; j++) {
			board[i].push ({
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: false,
            })
			// renderCell({i,j}, MINE)
		}
	}
	// board[0][2].isMine=true;
	console.log(board[0][1].isMine);
	return board;
}

// function renderCell(location, value) {
// 	var cellSelector = '.' + getClassName(location);
// 	var elCell = document.querySelector(cellSelector);
// 	elCell.innerHTML = value;
// }

// Returns the class name for a specific cell
// function getClassName(location) {
// 	var cellClass = 'table cell-' + location.i + '-' + location.j;
// 	return cellClass;
// }

function setMinesNegsCount(board){
    for (var i=0;i<board.length;i++){
        for (var j=0;j<board.length;j++) {
            var currCell=board[i][j]
            if(currCell.isMine)continue
            var location ={
                i,
                j,
            }
            var minesAround=countNeg(location)
            if(minesAround===0)continue
            currCell.minesAroundCount=minesAround
            }
            console.log(currCell);
            // board[i][j].minesAroundCount=countNeg(cellCord)

        }

    }

function countNeg(location)
{
    var mineCount = 0;
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue; // if i is out of mat
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue; // if j is out of mat
            if (i === location.i && j === location.j) continue; // if on clicked location

            var currNeg = gBoard[i][j]
            if (currNeg.isMine) mineCount++
        }
    }
    return mineCount;
    
    
}
function cellClick(elCell, i, j) {
   console.log(elCell);
}
function getCoordById(strId) {
    var coordArray = strId.split('-')
    var location = {
        i: +coordArray[1],
        j: +coordArray[2]
    }
    return location
}
// cellMarked(elCell){}

// checkGameOver() {}
// expandShown(board, elCell,
//     i, j){}
