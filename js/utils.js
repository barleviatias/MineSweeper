function renderBoard(mat, selector) {
	var strHTML = '<table border="0"><tbody>';
	for (var i = 0; i < mat.length; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < mat[0].length; j++) {
			var cell = mat[i][j];
			var className = `cell cell-${i}-${j}`;
      	if (cell.minesAroundCount === 0) cell.minesAroundCount = ''; // deleting 0 from dom
			if (mat[i][j].isMine === true&&mat[i][j].isShown===true) {
				strHTML += `<td class="${className}">${MINE}</td>`;
			} else {
				strHTML += `<td onclick="cellClick(this)" class="${className}">${cell.minesAroundCount}</td>`;
			}
		}
		strHTML += '</tr>';
	}
	strHTML += '</tbody></table>';
	var elContainer = document.querySelector(selector);
	elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
// function renderCell(value) {
//   // Select the elCell and set the value
//   var elCell = document.querySelector('.table cell cell0-1');
//   console.log(elCell);
//   elCell.innerText = value;
// }

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
