//  Game Data
var board = new Array();
var score = 0;

$(document).ready(function() {
    newgame();
});

function newgame(){
	// initialize play board
	init();	
	// Random generate 2 numbers
	generateOneNumber();
	generateOneNumber();
}


function init(){  // initialize play board
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			$("#grid_cell_"+i+"_"+j).css('top', getPosTop(i,j));
			$("#grid_cell_"+i+"_"+j).css('left', getPosLeft(i,j));
		}
	}

	//  Create a 2D array
	for (var i = 0; i < 4; i++) {
		board[i]=new Array();
		for(var j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}

	updateBoardView();
}

function updateBoardView(){
	$(".number_cell").remove();

	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			$("#grid_container").append('<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>');
			var theNumberCell = $('#number_cell_'+i+'_'+j);

			if(board[i][j] == 0){
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i,j) + 50);
				theNumberCell.css('left', getPosLeft(i,j) + 50);
			}else{
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('top', getPosTop(i,j));
				theNumberCell.css('left', getPosLeft(i,j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		}
	}
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}else{
		//  Get a random position
		var randx = parseInt(Math.floor(Math.random()*4));
		var randy = parseInt(Math.floor(Math.random()*4));

		while(1){
			if(board[randx][randy] == 0){
				break;
			}
			randx = parseInt(Math.floor(Math.random()*4));
			randy = parseInt(Math.floor(Math.random()*4));
		}

		//  Get a random number
		var randNumber = Math.random() < 0.5 ? 2 : 4;

		//  Show the number on that position
		board[randx][randy] = randNumber;
		showNumberWithAnimation(randx, randy, randNumber);

		return true;	
	}
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37:  // left
			if( moveLeft()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 38:  // up
			if( moveUp()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 39:  // right
			if( moveRight()){
				generateOneNumber();
				isgameover();
			}
			break;
		case 40:  // down
			if( moveDown()){
				generateOneNumber();
				isgameover();
			}
			break;
		default:break;  //  other key
	}
})

function isgameover(){}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false
	}else{
		for (var i = 0; i < 4; i++) {
			for(var j = 1; j < 4; j++) {
				if(board[i][j] != 0){
					for(var k = 0; k < j; k++){
						if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
							// You can move left
							showMoveAnimation(i, j, i, k);

							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
							//  You can move left and add two cell together
							showMoveAnimation(i, j, i, k);

							board[i][k] += board[i][j];
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false
	}else{
		for (var i = 0; i < 4; i++) {
			for(var j = 0; j < 3; j++) {
				if(board[i][j] != 0){
					for(var k = j+1; k < 4; k++){
						if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
							// You can move left
							showMoveAnimation(i, j, i, k);

							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)){
							//  You can move left and add two cell together
							showMoveAnimation(i, j, i, k);

							board[i][k] += board[i][j];
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		return false
	}else{
		for (var i = 1; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(board[i][j] != 0){
					for(var k = 0; k < i; k++){
						if(board[k][j] == 0 && noBlockVertical(k, i, j, board)){
							// You can move left
							showMoveAnimation(i, j, k, j);

							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board)){
							//  You can move left and add two cell together
							showMoveAnimation(i, j, k, j);

							board[k][j] += board[i][j];
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false
	}else{
		for (var i = 0; i < 3; i++) {
			for(var j = 0; j < 4; j++) {
				if(board[i][j] != 0){
					for(var k = i+1; k < 4; k++){
						if(board[k][j] == 0 && noBlockVertical(i, k, j, board)){
							// You can move left
							showMoveAnimation(i, j, k, j);

							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						}else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)){
							//  You can move left and add two cell together
							showMoveAnimation(i, j, k, j);

							board[k][j] += board[i][j];
							board[i][j] = 0;
							continue;
						}
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()", 200);
	return true;
}

/*
	for (var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			
		}
	}

*/
