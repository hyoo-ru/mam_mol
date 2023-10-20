	($.Mvt2tjs_bidi_bind_fallbackFoo) = class Mvt2tjs_bidi_bind_fallbackFoo extends ($.$mol_object) {
		bar1(next){
			if(next !== undefined) return next;
			return (this.bar2(next));
		}
		bar2(next){
			if(next !== undefined) return next;
			return 1;
		}
	};
	($mol_mem(($.Mvt2tjs_bidi_bind_fallbackFoo.prototype), "bar1"));
	($mol_mem(($.Mvt2tjs_bidi_bind_fallbackFoo.prototype), "bar2"));

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22bidi_bind_fallback.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_bidi_bind_fallbackFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctbar1%3F%20%3C%3D%3E%20bar2%3F%201%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2CyEAA8B%2CwBAA9B%3BAAAA%2CAACC%3BAAAA%2CAAAA%3BAAAA%2CUAAM%2CCAAI%2CeAAJ%2CCAAN%3BAAAA%3BAAAU%3BAAAA%2CAAAA%3BAAAA%2CUAAM%2CCAAN%3BAAAA%3BAADX%2CCADJ%3BAAEK%2CYADD%2CCACC%2CmDAFL%3BAAEe%2CYADX%2CCACW%2CmDAFf%3B%22%7D