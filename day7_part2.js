var a = [3,8,1001,8,10,8,105,1,0,0,21,46,67,88,101,126,207,288,369,450,99999,3,9,1001,9,5,9,1002,9,5,9,1001,9,5,9,102,3,9,9,101,2,9,9,4,9,99,3,9,102,4,9,9,101,5,9,9,102,5,9,9,101,3,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,5,9,102,4,9,9,4,9,99,3,9,102,3,9,9,1001,9,4,9,4,9,99,3,9,102,3,9,9,1001,9,3,9,1002,9,2,9,101,4,9,9,102,3,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99]

var computer = function(input1, input2, arr, index){
    var input1 = parseInt(input1)
    var feedback = true
    if(!index) feedback = false
    var i = index || 0
    var value = 0
    var for_first = false
    var counter = 0
    if(!input2){
        for_first = true
    }
    while(i < arr.length){
        var opcode = arr[i]
        var op = opcode.toString()
        var new_op = op.slice(op.length-2)
        if([99,1,2,3,4,5,6,7,8].indexOf(parseInt(opcode)) < 0){
            var par1 = parseInt(op[op.length-3]) || 0
            var par2 = parseInt(op[op.length-4]) || 0
        } else {
            var par1 = 0
            var par2 = 0
        }
        var par_value1 = parseInt(par1) ? arr[i+1] : arr[arr[i+1]]
        var par_value2 = parseInt(par2) ? arr[i+2] : arr[arr[i+2]]
        // position mode is 0 interpret as position
        if(parseInt(new_op) == 1){
            arr[arr[i+3]] = par_value1 + par_value2
            i+=4;
        }
        else if(parseInt(new_op) == 2){
            arr[arr[i+3]] = par_value1 * par_value2
            i+=4;
        }
        else if(parseInt(new_op) == 3){
            if(!feedback){
                if(for_first){
                    if(!counter)
                        arr[arr[i+1]] = input1
                    else
                        arr[arr[i+1]] = 0
                } else {
                    if(!counter)
                        arr[arr[i+1]] = input1
                    else
                        arr[arr[i+1]] = input2
                }
            } else {
                arr[arr[i+1]] = input2
            }
            counter++;
            i+=2;
        }
        else if(parseInt(new_op) == 4){
            value = par_value1
            i+=2;
            break;
        }
        else if(parseInt(new_op) == 5){
            if(par_value1){
                i = par_value2
            } else {
                i+=3;
            }
        }
        else if(parseInt(new_op) == 6){
            if(!par_value1)
                i = par_value2
            else
                i+=3;
        }
        else if(parseInt(new_op) == 7){
            if(par_value1<par_value2)
                arr[arr[i+3]] = 1
            else
                arr[arr[i+3]] = 0
            i+=4;
        }
        else if(parseInt(new_op) == 8){
            if(par_value1==par_value2)
                arr[arr[i+3]] = 1
            else
                arr[arr[i+3]] = 0
            i+=4;
        }
        else if(parseInt(new_op) == 99){
            value = 'hehe'
            break;
        } else {
            console.log(new_op, i)
        }
    }
    return {value, arr ,i}
}
var results = [];

var final_obj = [];
var iterate = function(data){
    var datum = Object.values(data)
    var output = 0
    var arr = [...a]
    var output_arr = {}
    datum.forEach(function(item, i){
        if(!i){
            output = computer(item, 0, [...a], 0)
        } else {
            output = computer(item, output.value, [...a], 0)
        }
        output_arr[item] = output
    })
    output_arr[datum[0]] = computer(0, output.value, output_arr[datum[0]].arr, output_arr[datum[0]].i)
    var index = 1
    var final_array = []
    var latest = output_arr[datum[0]].value
    while(latest != 'hehe'){
        output_arr[datum[index]] = computer(0, latest, output_arr[datum[index]].arr, output_arr[datum[index]].i)
        latest = output_arr[datum[index]].value
        index++;
        if(index>4)
            index = 0
        results.push(latest)
    }
}


const csv = require('csv-parser')
const fs = require('fs')
fs.createReadStream('export-dcode-2020-01-07-16-02-12.csv')
  .pipe(csv())
  .on('data', iterate)
  .on('end', function(){
    results = results.filter(function(item) {return parseInt(item)})
    console.log(Math.max(...Object.values(results)))
  })



