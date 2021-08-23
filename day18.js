// var input = `#########\n#b.A.@.a#\n#########`
input = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`
// input = `#################
// #j.A..b...f..D.o#
// ########@########
// #k.E..a...g..B.n#
// #################`
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
console.log('keys are', keys)
console.log('doors are', doors)
grid.keys = keys
var node = {};
// for(var i=0; i<2; i++){
    var shortest = Number.MAX_SAFE_INTEGER;
    var short_key = '';
    keys.forEach(function(item){
    	var can_go = grid.go_to(item);
    	if(can_go){
            if(can_go<shortest){
                short_key = item;
                shortest = can_go;
            }
            node[item] = can_go;
        }
        grid.reset();
    });
    grid.go_to('@', true, short_key)
// }
console.log(node)
grid.printing()