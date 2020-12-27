class Grid{
	constructor(size){
		this.xy = new Array(size).fill(0).map(function(item){
			return new Array(size).fill(' ')
		})
		this.currentX = this.currentY = Math.floor(size/2 - 1);
		this.xy[this.currentX][this.currentY] = 'X'
		this.mapper = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	}
	set_different(scaffold, x, y){
		this.xy = scaffold;
		this.currentX = x;
		this.currentY = y;
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
	get_possible_move(){
		// Up/Down is X and Left/Right is Y
		// First know where we can travel
		var possible_moves = [];
		this.mapper.forEach(function(directions, index){
			var new_x = this.currentY+directions[0];
			var new_y = this.currentX+directions[1];
			if(new_y < 0 || new_x < 0){
				return;
			}
			if(this.xy[new_x][new_y] == "#"){
				possible_moves.push(index+1);
			}
		}, this)
		return possible_moves;
	}
	move_until_out(){
		var now = this.xy[this.currentY][this.currentX];
	}
}
module.exports = Grid;