
//Run this file on the console of page : https://adventofcode.com/2019/day/8/input

var input = '$("pre").innerText';
input = input.slice(0, input.length-1);
var inputarr = [];
var counter = 0;
for(var i = 0; i < input.length; i += 25*6){
    inputarr.push(input.substr(i, 25*6));
    counter++;
}

var final_arr = [];
inputarr.forEach(function(iter, i){
    var obj = [];
    [0,1,2].forEach(function(item){
        var regEx = new RegExp(item.toString(), 'g');
        obj[item.toString()] = iter.match(regEx).length;
    })
    final_arr.push(obj)
})

function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

var min_index = indexOfMin(final_arr.map(function(item) {return item[0]}))

console.log(final_arr[min_index][1] * final_arr[min_index][2])