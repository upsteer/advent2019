var a = [3,8,1005,8,318,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,1002,8,1,28,1,107,14,10,1,107,18,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,58,1006,0,90,2,1006,20,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,88,2,103,2,10,2,4,7,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,118,1,1009,14,10,1,1103,9,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,147,1006,0,59,1,104,4,10,2,106,18,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,181,2,4,17,10,1006,0,36,1,107,7,10,2,1008,0,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,101,0,8,217,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,240,1006,0,64,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,264,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1001,8,0,287,1,1104,15,10,1,102,8,10,1006,0,2,101,1,9,9,1007,9,940,10,1005,10,15,99,109,640,104,0,104,1,21102,932700857236,1,1,21101,335,0,0,1106,0,439,21101,0,387511792424,1,21101,346,0,0,1106,0,439,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,46372252675,0,1,21102,393,1,0,1106,0,439,21101,97806162983,0,1,21102,404,1,0,1105,1,439,3,10,104,0,104,0,3,10,104,0,104,0,21102,1,825452438376,1,21101,0,427,0,1106,0,439,21102,709475586836,1,1,21101,0,438,0,1106,0,439,99,109,2,22101,0,-1,1,21101,40,0,2,21102,1,470,3,21102,1,460,0,1106,0,503,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,465,466,481,4,0,1001,465,1,465,108,4,465,10,1006,10,497,1101,0,0,465,109,-2,2105,1,0,0,109,4,2102,1,-1,502,1207,-3,0,10,1006,10,520,21102,1,0,-3,21202,-3,1,1,21202,-2,1,2,21101,0,1,3,21101,0,539,0,1106,0,544,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,567,2207,-4,-2,10,1006,10,567,22101,0,-4,-4,1106,0,635,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,586,1,0,1105,1,544,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,605,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,627,22101,0,-1,1,21102,1,627,0,106,0,502,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0]
output = []
currentPos = {x:0, y:0, painted: 0}
directions = ['up', 'left', 'down', 'right']
current_dir = 'up'
results = []

computer(a, 0)

function get_input(){
	var check = results.filter(function(item){ return item.x == currentPos.x && item.y == currentPos.y})
	return check[0] && check[0].painted || 1
}

// Second, it will output a value indicating the direction the robot should turn: 
// 0 means it should turn left 90 degrees, 
// and 1 means it should turn right 90 degrees.

function paint(inp){
	Array.prototype.rotate = function(reverse) {
	  if (reverse) this.unshift(this.pop());
	  else this.push(this.shift());
	  return this;
	}
	var now_pos = {...currentPos}
	dir_change = inp[1]
	var check = results.filter(function(item){ return item.x == now_pos.x && item.y == now_pos.y})
	if(!check.length){
		now_pos.painted = inp[0]
		results.push(now_pos)
	}
	else{
		results.forEach(function(item){
			if(item.x == now_pos.x && item.y == now_pos.y){
				item.painted = inp[0]
			}
		})
	}
	directions.rotate(dir_change)
	current_dir = directions[0]
	if(current_dir == 'left'){
	    currentPos.x -= 1
	}
	else if(current_dir == 'up'){
	    currentPos.y += 1
	}
	else if(current_dir == 'down'){
	    currentPos.y -= 1
	}
	else if(current_dir == 'right'){
	    currentPos.x += 1
	}
	
}

function draw(datum){
	const plotlib = require('nodeplotlib');
	// var x = datum.map(function(item){ return if(painted) item.x})
	var painted_data = datum.filter(function(item){ return item.painted })
	var x = painted_data.map(function(item){return item.x})
	var y = painted_data.map(function(item){ return item.y})

	const data = [{
  		x: x,
  		y: y,
  		type: 'scatter',
  		mode: 'markers'
	}];
	plotlib.plot(data);
	// const data: Plot[] = [{x: [1, 3, 4, 5], y: [3, 12, 1, 4], type: 'line'}];
}

function computer(arr, input){
	var relative_code = 0;
	var paint_dir = []
	var i = 0;
	var counter = 0;
	while(i < arr.length){
		var opcode = arr[i]
		var op = opcode.toString()
		var new_op = op.slice(op.length-2)
		if([99,1,2,3,4,5,6,7,8,9].indexOf(opcode) == -1){
			var par1 = op[op.length-3] || 0
			var par2 = op[op.length-4] || 0
			var par3 = op[op.length-5] || 0
		} else {
			var par1 = 0
			var par2 = 0
		}
		var par_value1 = 0,
			par_value2 = 0;
		
		switch(parseInt(par1)) {
		  case 0:
		  	par_value1 = arr[arr[i+1]]
		    break;
		  case 1:
		  	par_value1 = arr[i+1]
		    break;
		  case 2:
		  	par_value1 = arr[relative_code + arr[i+1]]
		  	break;
		}

		switch(parseInt(par2)) {
		  case 0:
		  	par_value2 = arr[arr[i+2]]
		    break;
		  case 1:
		  	par_value2 = arr[i+2]
		    break;
		  case 2:
		  	par_value2 = arr[relative_code + arr[i+2]]
		  	break;
		}

		par_value1 = par_value1 ? par_value1 : 0
		par_value2 = par_value2 ? par_value2 : 0

		// position mode is 0 interpret as position
		if(parseInt(new_op) == 1){
			if(parseInt(par3) == 2)
				arr[relative_code + arr[i+3]] = par_value1 + par_value2
			 else 
				arr[arr[i+3]] = par_value1 + par_value2
			i+=4;
		}
		else if(parseInt(new_op) == 2){
			if(parseInt(par3) == 2)
				arr[relative_code + arr[i+3]] = par_value1 * par_value2
			else 
				arr[arr[i+3]] = par_value1 * par_value2
			i+=4;
		}
		else if(parseInt(new_op) == 3){
			if(parseInt(par1) == 2){
				arr[relative_code + arr[i+1]] = get_input()
			}
			else 
				arr[arr[i+1]] = get_input()
			paint_dir = []
			i+=2;
		}
		else if(parseInt(new_op) == 4){
			paint_dir.push(par_value1)
			// console.log(par_value1)
			if((paint_dir.length % 2) == 0){
 			   paint(paint_dir)
			}
			i+=2;
		}
		else if(parseInt(new_op) == 5){
			if(par_value1)
				i = par_value2
			else
				i+=3;
		}
		else if(parseInt(new_op) == 6){
			if(!par_value1)
				i = par_value2
			else
				i+=3;
		}
		else if(parseInt(new_op) == 7){
			if(par_value1<par_value2){
				if(parseInt(par3) == 2)
					arr[relative_code + arr[i+3]] = 1
				else
					arr[arr[i+3]] = 1
			}
			else{
				if(parseInt(par3) == 2)
					arr[relative_code + arr[i+3]] = 0
				else
					arr[arr[i+3]] = 0
			}
			i+=4;
		}
		else if(parseInt(new_op) == 8){
			if(par_value1==par_value2){
				if(parseInt(par3) == 2){
					arr[relative_code + arr[i+3]] = 1
				} else{
					arr[arr[i+3]] = 1
				}
			} else {
				if(parseInt(par3) == 2){
					arr[relative_code + arr[i+3]] = 0
				} else {
					arr[arr[i+3]] = 0
				}
			}
			i+=4;
		}
		else if(parseInt(new_op) == 9){
			relative_code += par_value1
			i+=2;
		}
		else if(parseInt(new_op) == 99){
			console.log('result: '+ results.length)
			draw(results);
			debugger
			break;
		}
	}
	// return arr[0]
}