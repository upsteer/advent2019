// var input = `#########\n#b.A.@.a#\n#########`
input = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`
input = `#################
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
#################`
var Grid = require('./grid');

var grid = new Grid(30);
var keys = [];
var key = new RegExp(/[a-z]/);
var door = new RegExp(/[A-Z]/);
var doors = [];
grid.xy = input.split('\n').map(function(item, index){
    item.split('').forEach(function(iter, i){
        if(iter == '@'){
            grid.currentY = index;
            grid.currentX = i;
            grid.reset_positions = [index, i];
        }
        if(iter.match(key)){
        	keys.push(iter);
        }
        if(iter.match(door)){
        	doors.push(iter);
        }
    })
    return item.split('');
})
debugger
console.log('keys are', keys)
console.log('doors are', doors)
grid.keys = keys
// console.log(grid.go_to('g'))
// grid.printing()
keys.forEach(function(item){
	// if(grid.go_to(item)){
		console.log(item, grid.go_to(item));
		grid.reset()
		grid.printing()
	// }
})