	($.Mvt2tjs_left_bind_in_array_and_objectFoo) = class Mvt2tjs_left_bind_in_array_and_objectFoo extends ($.$mol_object) {
		obj(){
			return {"prop": (this.Obj())};
		}
		arr(){
			return [(this.Obj())];
		}
		content(){
			return [];
		}
		Obj(){
			const obj = new this.$.$mol_object();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
	};
	($mol_mem(($.Mvt2tjs_left_bind_in_array_and_objectFoo.prototype), "Obj"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22left_bind_in_array_and_object.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_left_bind_in_array_and_objectFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctobj%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctprop%20%3C%3D%20Obj%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctarr%20%2F%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3C%3D%20Obj%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctrows%20%3C%3D%20content%20%2F%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2C%2BFAAyC%2CwBAAzC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAI%2CCACH%2CQAAK%2CCAAG%2CUAAH%2CCADF%2CCAAJ%3BAAAA%3BAAEA%3BAAAA%2CAAAA%2CUAAI%2CCACH%2CCAAG%2CUAAH%2CCADG%2CCAAJ%3BAAAA%3BAAEU%3BAAAA%2CAAAA%2CUAAQ%2CEAAR%3BAAAA%3BAADN%3BAAAA%2CAAAI%2CuCAAJ%3BAACF%2CuBAAK%2CCAAG%2CcAAH%2CCAAL%2CCADE%3BAAAA%2CUAAI%2CGAAJ%3BAAAA%3BAAJL%2CCADJ%3BAAKS%2CYAJL%2CCAIK%2C6DALT%3B%22%7D