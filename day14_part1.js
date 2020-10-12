const util = require('util')
// var inp = ["10 ORE => 10 A", "1 ORE => 1 B", "7 A, 1 B => 1 C", "7 A, 1 C => 1 D", "7 A, 1 D => 1 E", "7 A, 1 E => 1 FUEL"] 
// var inp = ["9 ORE => 2 A","8 ORE => 3 B","7 ORE => 5 C","3 A, 4 B => 1 AB","5 B, 7 C => 1 BC","4 C, 1 A => 1 CA","2 AB, 3 BC, 4 CA => 1 FUEL"]
// var inp = ["157 ORE => 5 NZVS", "165 ORE => 6 DCFZ", "44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL", "12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ", "179 ORE => 7 PSHF", "177 ORE => 5 HKGWZ", "7 DCFZ, 7 PSHF => 2 XJWVT", "165 ORE => 2 GPVTF", "3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT"]
// var inp = ["2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG", "17 NVRVD, 3 JNWZP => 8 VPVL", "53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL", "22 VJHF, 37 MNCFX => 5 FWMGM", "139 ORE => 4 NVRVD", "144 ORE => 7 JNWZP", "5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC", "5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV", "145 ORE => 6 MNCFX", "1 NVRVD => 8 CXFTF", "1 VJHF, 6 MNCFX => 4 RFSQX", "176 ORE => 6 VJHF"]
var inp = ["171 ORE => 8 CNZTR", "7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL", "114 ORE => 4 BHXH", "14 VRPVC => 6 BMBT", "6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL", "6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT", "15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW", "13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW", "5 BMBT => 4 WPTQ", "189 ORE => 9 KTJDG", "1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP", "12 VRPVC, 27 CNZTR => 2 XDBXC", "15 KTJDG, 12 BHXH => 5 XCVML", "3 BHXH, 2 VRPVC => 7 MZWV", "121 ORE => 7 VRPVC", "7 XCVML => 6 RJRHP", "5 BHXH, 4 VRPVC => 5 LTCX"] 
// var inp = ["11 RVCS => 8 CBMDT", "29 QXPB, 8 QRGRH => 8 LGMKD", "3 VPRVD => 6 PMFZG", "1 CNWNQ, 11 MJVXS => 6 SPLM", "13 SPDRZ, 13 PMFZG => 2 BLFM", "8 QWPFN => 7 LWVB", "1 SPLM => 8 TKWQ", "2 QRGRH, 6 CNWNQ => 7 DTZW", "2 DMLT, 1 SPLM, 1 TMDK => 9 NKNS", "1 MJVXS, 1 HLBV => 7 PQCQH", "1 JZHZP, 9 LWVB => 7 MJSCQ", "29 DGFR => 7 QRGRH", "14 XFLKQ, 2 NKNS, 4 KMNJF, 3 MLZGQ, 7 TKWQ, 24 WTDW, 11 CBMDT => 4 GJKX", "4 TKWQ, 1 WLCFR => 4 PDKGT", "2 NKNS => 4 GDKL", "4 WRZST => 9 XFLKQ", "19 DGFR => 4 VPRVD", "10 MJSCQ, 4 QWPFN, 4 QXPB => 2 MLZGQ", "1 JZHZP => 7 QWPFN", "1 XFLKQ => 9 FQGVL", "3 GQGXC => 9 VHGP", "3 NQZTV, 1 JZHZP => 2 NVZWL", "38 WLCFR, 15 GJKX, 44 LGMKD, 2 CBVXG, 2 GDKL, 77 FQGVL, 10 MKRCZ, 29 WJQD, 33 BWXGC, 19 PQCQH, 24 BKXD => 1 FUEL", "102 ORE => 5 DGFR", "17 NWKLB, 1 SBPLK => 5 HRQM", "3 BWXGC => 8 TQDP", "1 TQDP => 2 PSZDZ", "2 MJVXS => 9 WNXG", "2 NBTW, 1 HRQM => 2 SVHBH", "8 CNWNQ, 1 DTZW => 4 RVCS", "4 VHGP, 20 WNXG, 2 SVHBH => 3 SPDRZ", "110 ORE => 5 TXMC", "10 QRGRH => 5 NWKLB", "1 SBPLK => 3 MJVXS", "9 DGFR => 5 RFSRL", "5 LBTV => 3 DMLT", "1 NWKLB, 1 KMNJF, 1 HDQXB, 6 LBTV, 2 PSZDZ, 34 PMFZG, 2 SVHBH => 2 WJQD", "1 RVCS => 5 MKRCZ", "14 NQZTV, 3 FPLT, 1 SJMS => 2 GQGXC", "18 RFSRL, 13 VHGP, 23 NBTW => 5 WTDW", "1 VHGP, 6 TKWQ => 7 QXPB", "1 JZHZP, 1 CNWNQ => 5 KMNJF", "109 ORE => 9 BWXGC", "2 CNWNQ, 1 PDKGT, 2 KMNJF => 5 HDQXB", "1 PDKGT, 18 WRZST, 9 MJSCQ, 3 VHGP, 1 BLFM, 1 LGMKD, 7 WLCFR => 2 BKXD", "11 MLJK => 6 FPLT", "8 DGFR, 2 TXMC, 3 WJRC => 9 SJMS", "2 SBPLK => 1 LBTV", "22 QWPFN => 4 WRZST", "5 WRZST, 22 WNXG, 1 VHGP => 7 NBTW", "7 RVCS => 9 TMDK", "1 DGFR, 14 TXMC => 5 JZHZP", "2 JZHZP => 3 SBPLK", "19 PDKGT => 8 HLBV", "195 ORE => 6 WJRC", "6 GQGXC => 8 CNWNQ", "1 NVZWL, 4 GQGXC => 2 CBVXG", "1 NVZWL, 1 KMNJF => 8 WLCFR", "153 ORE => 4 MLJK", "1 BWXGC => 6 NQZTV"] 
// var inp = ["157 ORE => 5 A", "165 ORE => 6 B", "44 C, 5 D, 1 E, 29 A, 9 F, 48 G => 1 FUEL", "12 G, 1 F, 8 H => 9 E", "179 ORE => 7 H", "177 ORE => 5 G", "7 B, 7 H => 2 C", "165 ORE => 2 F", "3 B, 7 A, 5 G, 10 H => 8 D"]
// var inp = ["9 ORE => 2 A","8 ORE => 3 B","7 ORE => 5 C","3 A, 4 B => 3 AB","5 B, 7 C => 1 BC","4 C, 1 A, 2 AB => 4 CA","4 AB, 3 BC, 4 CA => 1 FUEL"]
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
	faulting_condition.push(inputs_for_rxn(item))
})

var with_ores = faulting_condition.map(function(item){
    return item["outs"][0]["elem"]
})
console.log(util.inspect(faulting_condition, false, null, true))
var fault_obj = {}
faulting_condition.forEach(function(item){
    var obj = {}
    obj["num"] = item["outs"][0]["num"]
    obj["ORE"] = item["inps"][0]["num"]
    fault_obj[item["outs"][0]["elem"]] = obj
})

console.log(fault_obj)

var fuel_inp = inputs_for_rxn(fuel_rxn[0])
// console.log(util.inspect(output, false, null, true))
console.log(util.inspect(fuel_inp, false, null, true))
console.log('After')
var running = true;
fuel_inp["residue"] = []
while(running){
	var length_fuel_inps = fuel_inp["inps"].length
	for(var index=0; index<length_fuel_inps; index++){
		output.forEach(function(out_iter){
			//Compare each output with the inputs from Fuel Reaction
			out_iter["outs"].forEach(function(chain_outs){
				if(fuel_inp["inps"][index] && fuel_inp["inps"][index]["elem"] && chain_outs["elem"] == fuel_inp["inps"][index]["elem"]){
					var replacement = fuel_inp["inps"].splice(index, 1)[0]
					var rep_num = 1, residue = {};
					if(replacement["num"]%chain_outs["num"] == 0){ 
						rep_num = replacement["num"]/chain_outs["num"]
					}
					else if(chain_outs["num"]<replacement["num"]){
						console.log(Math.ceil(replacement["num"]/chain_outs["num"])*chain_outs["num"] - replacement["num"], chain_outs["elem"])
						rep_num = Math.ceil(replacement["num"]/chain_outs["num"])
						residue[chain_outs["elem"]] = Math.ceil(replacement["num"]/chain_outs["num"])*chain_outs["num"] - replacement["num"]
					}
					out_iter["inps"].forEach(function(out_iter_inps){
						var fuel_inp_elems = fuel_inp["inps"].map(function(item){return item["elem"]})
						var match = fuel_inp_elems.indexOf(out_iter_inps["elem"])
						var accumulated = 0;
						var deduct = 0;
						var match_deduct = fuel_inp["residue"].map(function(item){return Object.keys(item)[0]}).indexOf(out_iter_inps["elem"])
						if(match_deduct > -1){
							deduct = fuel_inp["residue"].splice(match_deduct, 1)[0][out_iter_inps["elem"]]
						}
						if(match > -1){
							accumulated = fuel_inp["inps"].splice(match, 1)[0]["num"]
						}
						fuel_inp["inps"].push({
							"num": out_iter_inps["num"]*rep_num + accumulated - deduct,
							"elem": out_iter_inps["elem"]
						})
					})
					if(Object.keys(residue).length){
						fuel_inp["residue"].push(residue);
					}
				}
			})
		})
		// console.log(fuel_inp["inps"])
		running = false
		fuel_inp["inps"].forEach(function(check){
			if(with_ores.indexOf(check["elem"]) == -1){
				running = true
			}
		})
	}
}
console.log(util.inspect(fuel_inp, false, null, true))

var sum = 0;
fuel_inp["inps"].forEach(function(item){
    sum += fault_obj[item["elem"]]["ORE"]*Math.ceil(Math.ceil(item["num"])/fault_obj[item["elem"]]["num"])
})

// 323/6 = 54; 54*165; 8910
// 64/5 = 13; 13*165; 2145;
// 17*177; 3009
// 825; 
// 366/7 * 179; 9300
console.log(sum)
