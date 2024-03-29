class Grid{
	constructor(size){
		this.xy = new Array(size).fill(0).map(function(item){
			return new Array(size).fill(' ')
		})
		this.currentX = this.currentY = Math.floor(size/2 - 1);
		this.xy[this.currentX][this.currentY] = 'X'
		this.mapper = [[0, -1], [0, 1], [-1, 0], [1, 0]];
		this.dir_map = {'1,3': 'L', '1,4': 'R', '2,3': 'R', '2,4': 'L', '3,1': 'R', '3,2': 'L', '4,1': 'L', '4,2': 'R'};
		this.reset_positions = [this.currentY, this.currentX]
		this.key = new RegExp(/[a-z]/);
		this.currentkey = [0,0]
	}
	reset(){
		this.currentY = this.reset_positions[0];
		this.currentX = this.reset_positions[1];
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
		this.xy[this.currentY+y_move][this.currentX+x_move] = shape;
	}
	move(direction, shape){
		var x_move = this.mapper[direction-1][0];
		var y_move = this.mapper[direction-1][1];
		this.xy[this.currentY][this.currentX] = '.';
		this.currentX += x_move;
		this.currentY += y_move;
		var what_was_here = this.xy[this.currentY][this.currentX];
		this.xy[this.currentY][this.currentX] = shape;
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
	do_opposite_of_these_moves(moves){
		for(var i=moves.length-1;i>=0;i--){
			this.move(this.changeDirection(moves[i]), '@')
		}
	}
	get_possible_move_for_vault(currentDir, destination){
		var possible_moves = [];
		this.mapper.forEach(function(directions, index){
			if(currentDir && this.changeDirection(currentDir)-1 == index){
				return;
			}
			var new_x = this.currentX+directions[0];
			var new_y = this.currentY+directions[1];
			var new_place = this.xy[new_y][new_x];
			if(new_place == "." || new_place == destination){
				possible_moves.push(index+1);
			}
		}, this)
		return possible_moves;
	}
	go_to(destination, unlock, key){
		var steps = 0;
		var multi = [];
		var moves = [];
		var going = true;
		var reached = '';
		while(going){
			var option = this.get_possible_move_for_vault(moves[moves.length-1], destination);
			if(!option.length){
				if(!multi.length){
					break;
				} else {
					var backtrack = multi.pop();
					var back_dir = backtrack['multi_dir'].pop();
					for(var i=0;i<=(moves.length-backtrack['at']);i++){
						this.move(this.changeDirection(moves.pop()), '@');
					}
					reached = this.move(back_dir, '@')
					moves.push(back_dir);
				}
			} else if(option.length == 1){
				moves.push(option[0]);
				reached = this.move(option[0], '@');
			} else {
				var current_dir = option.splice(0,1)[0];
				reached = this.move(current_dir, '@');
				multi.push({'at': moves.length, 'multi_dir': option});
				moves.push(current_dir);
			}
			if (reached == destination){
				going = false;
			}
		}
		if(unlock){
			this.open_door(key);
		}
		if(going){
			this.do_opposite_of_these_moves(moves);
			// going is true, when destination is reached.
			// going is false when destination is not reached.
			return false;
		}
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
	open_door(key){
		this.xy.forEach(function(item, index, theArr){
			if(item.indexOf(key.toUpperCase())>-1){
				theArr[index][item.indexOf(key.toUpperCase())] = '.'
			}
		}, this)
	}
	get_availabe_keys(){
		var starting = {x: this.currentX, y: this.currentY}
		var available_moves = [];
		this.keys.forEach(function(key){
			var can_go = this.go_to(key);
			if(can_go!=false){
				available_moves.push({'can_go': key, 'moves': can_go});
			}
		}, this)
		return available_moves;
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