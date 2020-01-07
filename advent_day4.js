
Array.prototype.areEqual = function(){
    return this[0] == this[1]
}

function check_for_inc(num){
    var haha = num.toString().split('')
    var low = parseInt(haha[0])
    var double_meet = false;
    for(var i = 1; i<haha.length; i++){
        if(parseInt(low) > parseInt(haha[i])){
            return false;
            break;
        }
        if(parseInt(low) == parseInt(haha[i])){
            double_meet = true
        }
        low = parseInt(haha[i])
    }
    return double_meet
}

function check_for_double(num){
    var num = num.toString().split('')
    var num_set = new Set(num)
    var sum = []
    num_set.forEach(function(item){
        var item = RegExp(item, 'g')
        var matching = num.toString().match(item).length
        // if(matching >= 2){
        sum.push(matching)
        // }
    })
    if(sum.indexOf(2)>-1 || (sum.indexOf(2)>-1 && sum.indexOf(4)>-1)){
        return true
    }
    console.log(sum)
    return false
}


var num_list = []
for(var i = 264793; i <= 803935; i++){
    if(check_for_inc(i)){
        num_list.push(i)
    }
}

var double_list = []
num_list.forEach(function(item){
    console.log(item)
    if(check_for_double(item)){
        double_list.push(item)
    }
})
console.log(double_list.length)

