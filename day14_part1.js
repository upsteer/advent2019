const util = require('util')
// var inp = ["9 ORE => 2 A","8 ORE => 3 B","7 ORE => 5 C","3 A, 4 B => 1 AB","5 B, 7 C => 1 BC","4 C, 1 A => 1 CA","2 AB, 3 BC, 4 CA => 1 FUEL"]
var inp = ["10 ORE => 10 A", "1 ORE => 1 B", "7 A, 1 B => 1 C", "7 A, 1 C => 1 D", "7 A, 1 D => 1 E", "7 A, 1 E => 1 FUEL"] 
// var inp = ["157 ORE => 5 NZVS", "165 ORE => 6 DCFZ", "44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL", "12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ", "179 ORE => 7 PSHF", "177 ORE => 5 HKGWZ", "7 DCFZ, 7 PSHF => 2 XJWVT", "165 ORE => 2 GPVTF", "3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT"] 
var fuel_rxn = []
var inp_without_ore = []
var inp_with_ore = []
var output = []
var faulting_condition = []
inp.forEach(function(item){
    if(item.indexOf('ORE =>') == -1){
    	inp_without_ore.push(item);
    	return;
    }
    inp_with_ore.push(item);
})

for (var ind=0; ind<inp_without_ore.length;ind++){
	if(inp_without_ore[ind].indexOf('FUEL')>-1){
		fuel_rxn = inp_without_ore.splice(ind, 1)
	}
}
// console.log(inp, fuel_rxn)
function inputs_for_rxn(rexn){
	var chems = rexn.indexOf("=>");
	var lefty = rexn.substr(0, chems-1);
	var righty = rexn.substr(chems+3, rexn.length-1);
	var l_single = lefty.split(', ');
	l_single = l_single.map(function(item){
		var spl = item.split(' ')
		return {'num': parseInt(spl[0]), 'elem': spl[1]}
	})
	var r_single = righty.split(', ');
	r_single = r_single.map(function(item){
		var spl = item.split(' ')
		return {'num': parseInt(spl[0]), 'elem': spl[1]}
	})
	return {'inps': l_single, 'outs': r_single}
}

inp_without_ore.forEach(function(item){
	output.push(inputs_for_rxn(item))
})

inp_with_ore.forEach(function(item){
	single_rxn = inputs_for_rxn(item)
	single_rxn["outs"].forEach(function(item){
    	faulting_condition.push(item["elem"])
	})
})
console.log(util.inspect(output, false, null, true))


var fuel_inp = inputs_for_rxn(fuel_rxn[0])
console.log(util.inspect(fuel_inp, false, null, true))
console.log('After')
var running = true;
while(running){
	var length_fuel_inps = fuel_inp["inps"].length
	for(var index=0; index<length_fuel_inps; index++){
		output.forEach(function(out_iter){
			//Compare each output with the inputs from Fuel Reaction
			out_iter["outs"].forEach(function(chain_outs){
				if(chain_outs["elem"] == fuel_inp["inps"][index]["elem"]){
					console.log(fuel_inp["inps"])
					var replacement = fuel_inp["inps"].splice(index, 1)
					out_iter["inps"].forEach(function(out_iter_inps){
						fuel_inp["inps"].push({
							"num": out_iter_inps["num"]*replacement[0]["num"],
							"elem": out_iter_inps["elem"]
						})
					})
					console.log("hehe")
				}
			})
		})
		running = false
		fuel_inp["inps"].forEach(function(check){
			if(faulting_condition.indexOf(check["elem"]) == -1){
				running = true
			}
		})
		// if(index == (fuel_inp["inps"].length - 1)){
		// 	if(fuel_inp["inps"][index][fuel_inp["inps"][index].length-1]["elem"] == "ORE"){
		// 		running = false;
		// 	}
		// }
	}
}
console.log(util.inspect(fuel_inp, false, null, true))






