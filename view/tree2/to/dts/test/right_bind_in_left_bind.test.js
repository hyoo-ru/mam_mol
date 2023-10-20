	($.Mvt2tjs_right_bind_in_left_bindFoo) = class Mvt2tjs_right_bind_in_left_bindFoo extends ($.$mol_object) {
		a(){
			return null;
		}
	};
	($.Mvt2tjs_right_bind_in_left_bindBar) = class Mvt2tjs_right_bind_in_left_bindBar extends ($.$mol_object) {
		foo(){
			return (this.Cls());
		}
		b(){
			return (this.Cls().a());
		}
		Cls(){
			const obj = new this.$.Mvt2tjs_right_bind_in_left_bindFoo();
			return obj;
		}
	};
	($mol_mem(($.Mvt2tjs_right_bind_in_left_bindBar.prototype), "Cls"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_in_left_bind.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_in_left_bindFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%20null%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_in_left_bindBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfoo%20%3C%3D%20Cls%20Mvt2tjs_right_bind_in_left_bindFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2CmFAAmC%2CwBAAnC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAE%2CIAAF%3BAAAA%3BAADD%2CCADJ%3BAAGI%2CmFAAmC%2CwBAAnC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAI%2CCAAG%2CUAAH%2CCAAJ%3BAAAA%3BAACM%2CKAAH%3BAAAA%2CAAAF%2CmBADM%2CEACN%2CKAAE%3BAAAA%3BAADI%3BAAAA%2CAAAI%2C8DAAJ%3BAAAA%2CUAAI%2CGAAJ%3BAAAA%3BAADR%2CCAHJ%3BAAIY%2CYADR%2CCACQ%2CuDAJZ%3B%22%7D