var input = "59740570066545297251154825435366340213217767560317431249230856126186684853914890740372813900333546650470120212696679073532070321905251098818938842748495771795700430939051767095353191994848143745556802800558539768000823464027739836197374419471170658410058272015907933865039230664448382679990256536462904281204159189130560932257840180904440715926277456416159792346144565015659158009309198333360851441615766440174908079262585930515201551023564548297813812053697661866316093326224437533276374827798775284521047531812721015476676752881281681617831848489744836944748112121951295833143568224473778646284752636203058705797036682752546769318376384677548240590"
input = "03036732577212944063491565474664"
var final_inp = "";
console.log(input.length)
for(var i=0;i<10000;i++){
	final_inp+=input;
}
input = final_inp.toString().split('');
function generate_pattern(pos, len){
	var value = [];
	var index = 0;
	while(len>index){
		for(var j=0;j<pos;j++){
			value.push(0);
			index++;
		}
		for(var j=0;j<pos;j++){
			value.push(1)
			index++;
		}
		for(var j=0;j<pos;j++){
			value.push(0)
			index++;
		}
		for(var j=0;j<pos;j++){
			value.push(-1)
			index++;
		}
	}
	value.push(value.splice(0,1)[0]);
	return value.splice(0, len);
}

function multiply(num, base){
	var sum = 0;
	for(var i=0;i<base.length;i++){
		sum += parseInt(num[i])*base[i]
	}
	return Math.abs(sum)%10;
}

var finale = "";
for(var phase=0;phase<1;phase++){
	finale="";
	input.forEach(function(item, index){
		var base = generate_pattern(index+1, input.length);
		finale+=multiply(input, base);
	})
	input=finale.split('');
}
console.log('part1: ', finale.substr(0, 8));
console.log('part2: ', finale.substr())

var arr = [1,2,3,4,5,6,7,8];
arr.map(function(item, index){
    var clone = arr.slice();
    clone.splice(0, index);
    var ind = index+=1;
    var add = true;
    var finale = 0;
    for(var i=1;i<=clone.length;i++){
        console.log(clone.slice(i-1,ind+i-1));
        if(add){
            finale+=clone.slice(i-1,ind+i-1).reduce((a, b) => a + b, 0);
            add = false;
        } else {
            finale-=clone.slice(i-1,ind+i-1).reduce((a, b) => a + b, 0);
            add = true;
        }
        i=2*ind+i-1;
    }
    return Math.abs(finale)%10;
})