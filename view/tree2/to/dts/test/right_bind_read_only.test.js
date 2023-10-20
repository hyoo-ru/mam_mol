	($.Mvt2tjs_right_bind_read_onlyFoo) = class Mvt2tjs_right_bind_read_onlyFoo extends ($.$mol_object) {
		a(id, next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem_key(($.Mvt2tjs_right_bind_read_onlyFoo.prototype), "a"));
	($.Mvt2tjs_right_bind_read_onlyBar) = class Mvt2tjs_right_bind_read_onlyBar extends ($.$mol_object) {
		b(id, next){
			return (this.Obj().a(id, next));
		}
		Obj(){
			const obj = new this.$.Mvt2tjs_right_bind_read_onlyFoo();
			return obj;
		}
	};
	($mol_mem(($.Mvt2tjs_right_bind_read_onlyBar.prototype), "Obj"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_read_only.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_read_onlyFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20null%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_read_onlyBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtObj%20Mvt2tjs_right_bind_read_onlyFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta*%3F%20%3D%3E%20b*%3F%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2C6EAAgC%2CwBAAhC%3BAAAA%2CAACC%3BAAAA%2CAAAA%3BAAAA%2CUAAI%2CIAAJ%3BAAAA%3BAADD%2CCADJ%3BAAEK%2CgBADD%2CCACC%2CkDAFL%3BAAGI%2C6EAAgC%2CwBAAhC%3BAAAA%2CAAES%2CaAAH%3BAAAA%2CAAAJ%2CmBADD%2CEACC%2CaAAI%3BAAAA%3BAADL%3BAAAA%2CAAAI%2C2DAAJ%3BAAAA%2CUAAI%2CGAAJ%3BAAAA%3BAADD%2CCAHJ%3BAAIK%2CYADD%2CCACC%2CoDAJL%3B%22%7D