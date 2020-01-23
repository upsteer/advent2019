var moons = [	
				{x:4, y:1, z:1},
				{x:11, y:-18, z:-1},
				{x:-2, y:-10, z:-4},
				{x:-7, y:-2, z:14}
			];

var final = []
var cords = ['x', 'y', 'z']
cords.forEach(function(item){
    final.push(JSON.stringify(get(moons, item)))
})

var velocity = [	
				{x:0, y:0, z:0},
				{x:0, y:0, z:0},
				{x:0, y:0, z:0},
				{x:0, y:0, z:0}
			]
var velocity_clone = [...velocity]
var points = [];

function get(what, which){
	return what.map(function(item){ return item[which]})
}

function vel_calc(moons, val){
	var Xes = moons.map(function(item){
	    return item[val]
	})

	Xes.forEach(function(iter, i){
	    var to_change = 0
	    Xes.forEach(function(item){
	        if(iter == item)
	            return
	        else if(iter>item){
	            to_change -= 1
	        }
	        else if(iter<item){
	            to_change += 1
	        }
	    })
	   	velocity_clone[i][val] += to_change
	   	moons[i][val] += velocity_clone[i][val]
	})
}

var counters = []

cords.forEach(function(item, i){
	var counter = 1;
	var default_moon = [...moons]
	while (true){
		vel_calc(default_moon, item)
		points[counter] = default_moon
		counter++;
		if(JSON.stringify(get(default_moon, item)) == final[i])
			break;
	}
	vel_calc(default_moon, item)
	counters.push(counter)
})
console.log('Second is LCM of: ' + counters)

for(var i = 0; i<1000; i++){
	vel_calc(moons, 'x')
	vel_calc(moons, 'y')
	vel_calc(moons, 'z')
}

var ke = []
velocity.forEach(function(item){
  ke.push(Math.abs(item.x) + Math.abs(item.y) + Math.abs(item.z))
})

var pe = []
moons.forEach(function(item){
  pe.push(Math.abs(item.x) + Math.abs(item.y) + Math.abs(item.z))
})

var sum = 0
for(var i = 0; i <ke.length; i++){
    sum += ke[i] * pe[i]
}

console.log('First:' + sum)