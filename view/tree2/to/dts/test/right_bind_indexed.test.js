	($.Mvt2tjs_right_bind_indexedFoo) = class Mvt2tjs_right_bind_indexedFoo extends ($.$mol_object) {
		a(next){
			if(next !== undefined) return next;
			return {"some": 123};
		}
	};
	($mol_mem(($.Mvt2tjs_right_bind_indexedFoo.prototype), "a"));
	($.Mvt2tjs_right_bind_indexedBar) = class Mvt2tjs_right_bind_indexedBar extends ($.$mol_object) {
		b(id){
			return (this.Cls(id).a());
		}
		Cls(id){
			const obj = new this.$.Mvt2tjs_right_bind_indexedFoo();
			return obj;
		}
	};
	($mol_mem_key(($.Mvt2tjs_right_bind_indexedBar.prototype), "Cls"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_indexed.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_indexedFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%3F%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctsome%20123%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_indexedBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5CtCls*%20Mvt2tjs_right_bind_indexedFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b*%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2CyEAA8B%2CwBAA9B%3BAAAA%2CAACC%3BAAAA%2CAAAA%3BAAAA%2CUAAG%2CCACF%2CQAAK%2CGADH%2CCAAH%3BAAAA%3BAADD%2CCADJ%3BAAEK%2CYADD%2CCACC%2CgDAFL%3BAAII%2CyEAA8B%2CwBAA9B%3BAAAA%2CAAEO%2COAAH%3BAAAA%2CAAAF%2CmBADD%2CIACC%2CKAAE%3BAAAA%3BAADH%3BAAAA%2CAAAK%2CyDAAL%3BAAAA%2CUAAK%2CGAAL%3BAAAA%3BAADD%2CCAJJ%3BAAKK%2CgBADD%2CCACC%2CkDALL%3B%22%7D