	($.Mvt2tjs_array_channel_inheritanceFoo) = class Mvt2tjs_array_channel_inheritanceFoo extends ($.$mol_object) {
		arr(){
			return ["v1"];
		}
	};
	($.Mvt2tjs_array_channel_inheritanceBar) = class Mvt2tjs_array_channel_inheritanceBar extends ($.Mvt2tjs_array_channel_inheritanceFoo) {
		arr(){
			return [
				"v3", 
				...(super.arr()), 
				"v4"
			];
		}
	};

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22array_channel_inheritance.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_array_channel_inheritanceFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctarr%20%2F%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5C%5Cv1%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_array_channel_inheritanceBar%20Mvt2tjs_array_channel_inheritanceFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctarr%20%2F%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5C%5Cv3%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5C%5Cv4%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2CuFAAqC%2CwBAArC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAI%2CCACF%2CIADE%2CCAAJ%3BAAAA%3BAADD%2CCADJ%3BAAII%2CuFAAqC%2CiDAArC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAI%3BAAAA%2CAACF%2CQADE%3BAAEH%2CoBAFG%3BAAGF%3BAAHE%2CCAAJ%3BAAAA%3BAADD%2CCAJJ%3B%22%7D