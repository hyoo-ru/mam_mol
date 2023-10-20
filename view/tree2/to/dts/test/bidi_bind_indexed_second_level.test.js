	($.Mvt2tjs_bidi_bind_indexed_second_levelBar) = class Mvt2tjs_bidi_bind_indexed_second_levelBar extends ($.$mol_object) {
		expanded(){
			return false;
		}
	};
	($.Mvt2tjs_bidi_bind_indexed_second_levelFoo) = class Mvt2tjs_bidi_bind_indexed_second_levelFoo extends ($.$mol_object) {
		indexed(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.Bar();
			(obj.expanded) = () => ((this.owner(id, next)));
			return obj;
		}
		owner(id, next){
			if(next !== undefined) return next;
			return false;
		}
	};
	($mol_mem_key(($.Mvt2tjs_bidi_bind_indexed_second_levelFoo.prototype), "indexed"));
	($mol_mem_key(($.Mvt2tjs_bidi_bind_indexed_second_levelFoo.prototype), "owner"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22bidi_bind_indexed_second_level.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_bidi_bind_indexed_second_levelBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctexpanded%20false%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_bidi_bind_indexed_second_levelFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctindexed*%3F%20Bar%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctexpanded%20%3C%3D%3E%20owner*%3F%20false%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2CiGAA0C%2CwBAA1C%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAS%2CKAAT%3BAAAA%3BAADD%2CCADJ%3BAAGI%2CiGAA0C%2CwBAA1C%3BAAAA%2CAACC%3BAAAA%2CAAAA%3BAAAU%2C%2BBAAV%3BAACC%2C2BAAS%2CCAAI%2CoBAAJ%2CCAAT%2CCADD%3BAAAA%2CUAAU%2CGAAV%3BAAAA%3BAACc%3BAAAA%2CAAAA%3BAAAA%2CUAAQ%2CKAAR%3BAAAA%3BAAFf%2CCAHJ%3BAAIK%2CgBADD%2CCACC%2CkEAJL%3BAAKmB%2CgBAFf%2CCAEe%2CgEALnB%3B%22%7D