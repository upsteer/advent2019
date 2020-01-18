const fs = require('fs')

try {
    const data = fs.readFileSync('/Users/logpoint/day10.txt', 'utf8')
    var input = data
} catch (err) {
    console.error(err)
}

input = input.split(/[\s]/)

Array.prototype.findall = function(val) {
    var indexes = [], i;
    for(i = 0; i < this.length; i++)
        if (this[i] === val)
            indexes.push(i);
    return indexes;
}

Array.prototype.arrayRotate = function(reverse) {
  if (reverse) this.unshift(this.pop());
  else this.push(this.shift());
  return this;
}


var asteroids = []
input.forEach(function(item, i){
    var one = item.split('')
    var y = i;
    one.findall('#').forEach(function(iter){
        var obj = {}
        obj.x = iter;
        obj.y = y;
        asteroids.push(obj)
    })
})

var final_obj = {}
var final_with_cords = {}
var highest = []
asteroids.forEach(function(item, i){
    final_obj[i] = []
    final_with_cords[i] = []
    asteroids.forEach(function(iter){
        var angleDeg = Math.atan2(iter.y - item.y, iter.x - item.x) * 180 / Math.PI;
        if(final_obj[i].indexOf(angleDeg) < 0 && JSON.stringify(iter) != JSON.stringify(item)){
            final_obj[i].push(angleDeg)
            final_with_cords[i].push({'angle': angleDeg, 'coods': iter})
        } else if(final_obj[i].indexOf(angleDeg) > -1) {
            final_with_cords[i][final_obj[i].indexOf(angleDeg)].coods = iter
        }
    })
    highest.push(final_obj[i].length)
})

var index = highest.indexOf(Math.max(...highest))

final_with_cords[index] = final_with_cords[index].map(function(item){
    if(item.angle<0)
        return {'angle': item.angle+360, 'coods': item.coods}
    else 
        return {'angle': item.angle, 'coods': item.coods}
})


final_with_cords[index].sort(function(a,b) {return a.angle-b.angle})

var pos_first = final_with_cords[index].map(function(item){return item.angle}).indexOf(270)

for(var i = 0; i<pos_first; i++){
    final_with_cords[index].arrayRotate()
}

console.log(final_with_cords[index][199].coods)






