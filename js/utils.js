function renderBoard(mat, selector) {
	var strHTML = '<table border="0"><tbody>';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			// var cell = mat[i][j];
			var className = `cell`;

				strHTML += `<td data-i="${i}" data-j="${j}"
				onclick="cellClick(this)" oncontextmenu="cellMarked(this)" class="${className}"></td>`;
					}
		strHTML += '</tr>';
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(elCell) {
	// console.log(elCell);
	// var coords = elCell.className.split(' ');
	// console.log(coords);
	// var location = {};
	location.i = +elCell.dataset.i;
	location.j = +elCell.dataset.j;
  // Select the elCell and set the value
 var currCell=gBoard[location.i][location.j]
 if(currCell.isMine&&!currCell.isMarked){
	elCell.innerText = MINE;
	gameOver()
 }
 if(currCell.minesAroundCount&&!currCell.isMarked){
	elCell.innerText =currCell.minesAroundCount;
 }
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
