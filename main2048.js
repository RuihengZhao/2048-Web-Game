//  Game Data
var board = new Array();
var score = 0;

$(document).ready(function() {
    newgame();
});

function newgame(){
	init();	
}

function init(){
	for(var i=0; i<4; i++){
		for(var j=0; i<4; j++){
			var gridCell=$("#grid_cell_"+i+"_"+j);
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}	
	}
	
}