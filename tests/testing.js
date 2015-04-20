function test () {
	var obj = {
				sunday: 100,
				monday: 1000,
				tuesday: 111
				};

	var obj2 = {};

	for(var day in obj){
		obj2[day] += obj[day]
	}

	console.log(obj2)
}

test();