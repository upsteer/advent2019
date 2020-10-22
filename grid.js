class Grid{
	constructor(size){
		this.xy = new Array(size).fill(0).map(function(item){
			return new Array(size).fill(' ')
		})
		this.currentX = this.currentY = Math.floor(size/2 - 1);
		this.xy[this.currentX][this.currentY] = 'X'
		this.mapper = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	}
	printing(){
		this.xy.forEach(function(item){
			console.log(item.join(''))
		})
	}
	change(direction, shape){
		var x_move = this.mapper[direction-1][0];
		var y_move = this.mapper[direction-1][1];
		this.xy[this.currentX+x_move][this.currentY+y_move] = shape;
	}
	move(direction, shape){
		var x_move = this.mapper[direction-1][0];
		var y_move = this.mapper[direction-1][1];
		this.xy[this.currentX][this.currentY] = '.';
		this.currentX += x_move;
		this.currentY += y_move;
		this.xy[this.currentX][this.currentY] = shape;
	}
}

module.exports = Grid;