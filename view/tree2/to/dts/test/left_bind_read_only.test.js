	($.Mvt2tjs_left_bind_read_onlyFoo) = class Mvt2tjs_left_bind_read_onlyFoo extends ($.$mol_object) {
		bar1(){
			return (this.bar2());
		}
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
	};
	($mol_mem(($.Mvt2tjs_left_bind_read_onlyFoo.prototype), "bar2"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22left_bind_read_only.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_left_bind_read_onlyFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctbar1%20%3C%3D%20bar2%3F%201%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2C2EAA%2BB%2CwBAA%2FB%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAK%2CCAAG%2CWAAH%2CCAAL%3BAAAA%3BAAAQ%3BAAAA%2CAAAA%3BAAAA%2CUAAM%2CCAAN%3BAAAA%3BAADT%2CCADJ%3BAAEa%2CYADT%2CCACS%2CoDAFb%3B%22%7D