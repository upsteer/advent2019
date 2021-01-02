var input = `#########\n#b.A.@.a#\n#########`
// input = `########################
// #f.D.E.e.C.b.A.@.a.B.c.#
// ######################.#
// #d.....................#
// ########################`

var Grid = require('./grid');

var grid = new Grid(30);
var keys = [];
var key = new RegExp(/[a-z]/);
var door = new RegExp(/[A-Z]/);
var doors = [];
grid.xy = input.split('\n').map(function(item, index){
    item.split('').forEach(function(iter, i){
        if(iter == '@'){
            grid.currentY = i;
            grid.currentX = index;
        }
        if(iter.match(key)){
        	keys.push(iter);
        }
        if(iter.match(door)){
        	doors.push(iter);
        }
    })
    return item.split('')
})
console.log('keys are', keys)
console.log('doors are', doors)
grid.printing()

console.log(grid.get_possible_move_for_vault())

while(!keys.length){
	var can_go = false;
	keys.forEach(function(single_key){
		can_go = grid.can_go_to(single_key);
		if(!can_go){

		} else {

		}
	})
}