class Grid{
	constructor(size){
		this.xy = new Array(size).fill(0).map(function(item){
			return new Array(size).fill(' ')
		})
		this.currentX = this.currentY = Math.floor(size/2 - 1);
		this.xy[this.currentX][this.currentY] = 'X'
		this.mapper = [[-1, 0], [1, 0], [0, -1], [0, 1]];
		this.dir_map = {'1,3': 'L', '1,4': 'R', '2,3': 'R', '2,4': 'L', '3,1': 'R', '3,2': 'L', '4,1': 'L', '4,2': 'R'}
		this.have_keys = [];
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
		var what_was_here = this.xy[this.currentX][this.currentY];
		this.xy[this.currentX][this.currentY] = shape;
		return what_was_here;
	}
	move_scaffold(direction, shape, change){
		var x_move = this.mapper[direction-1][0];
		var y_move = this.mapper[direction-1][1];
		this.xy[this.currentY][this.currentX] = change;
		this.currentX += y_move;
		this.currentY += x_move;
		this.xy[this.currentY][this.currentX] = shape;
	}
	get_possible_move_for_vault(currentDir){
		var possible_moves = [];
		var key = new RegExp(/[a-z]/);
		this.mapper.forEach(function(directions, index){
			if(currentDir && this.changeDirection(currentDir)-1 == index){
				return;
			}
			var new_x = this.currentX+directions[0];
			var new_y = this.currentY+directions[1];
			var new_place = this.xy[new_x][new_y];
			if(new_place == "." || new_place.match(key) || this.have_keys.indexOf(new_place.toLowerCase()) > -1){
				possible_moves.push(index+1);
			}
		}, this)
		return possible_moves;
	}
	can_go_to(destination){
		var steps = 0;
		var multi = [];
		var moves = [];
		var going = true;
		var reached = '';
		while(going){
			var option = this.get_possible_move_for_vault(moves[moves.length-1]);
			if(!option.length){
				if(!multi.length){
					break;
				} else {
					var backtrack = multi.pop();
					var back_dir = backtrack['multi_dir'].pop()
					for(var i=0;i<(moves.length-backtrack['at']);i++){
						this.move(this.changeDirection(moves.pop()), '@');
					}
					reached = this.move(back_dir, '@')
					moves.push(back_dir);
				}
			} else if(option.length == 1){
				moves.push(option[0])
				reached = this.move(option[0], '@');
			} else {
				var current_dir = option.splice(0,1)[0];
				reached = this.move(current_dir, '@')
				multi.push({'at': moves.length, 'multi_dir': option})
				moves.push(current_dir)
			}
			if (reached == destination){
				going = false;
			}
		}
		this.have_keys.push(destination);
		return moves.length;
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
			if(this.xy[new_x] && this.xy[new_x][new_y] == "#"){
				possible_moves.push(index+1);
			}
		}, this)
		return possible_moves;
	}
	move_until_out(){
		var now = this.xy[this.currentY][this.currentX];
		var prev_move = 4;
		var change = '0';
		var finding = true;
		var path = [];
		path.push('R');
		var one_dir = -1;
		while(finding){
			var move = this.get_possible_move();
			one_dir++;
			if(move.length == 1){
				move = move[0];
				change = '0';
				if(move != prev_move){
					path.push(path.pop()+one_dir);
					path.push(this.dir_map[prev_move+','+move])
					one_dir = 0;
				}
				prev_move = move;
			} else if(move.length == 3){
				move = prev_move;
				change = '#';
			} else if(move.length == 2){
				move = prev_move;
				change = '0';
			} else {
				this.oppDirs(prev_move).forEach(function(dir){
					if(this.dir_map[dir+','+prev_move] == path[path.length-1]){
						path.push(path.pop()+one_dir);
					}
				}, this)
				finding = false;
				return path;
			}
			this.move_scaffold(move, '^', change);
		}
		return path;
	}
	oppDirs(dir){
	    if(dir<3){
	        return [3, 4]
	    }
	    return [1, 2]
	}
	changeDirection(dir){
	    dir = (dir < 3) ? 3-dir : 7-dir
	    return dir
	}
}
module.exports = Grid;