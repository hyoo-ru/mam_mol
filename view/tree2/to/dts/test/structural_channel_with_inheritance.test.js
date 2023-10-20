	($.Mvt2tjs_structural_channel_with_inheritanceFoo) = class Mvt2tjs_structural_channel_with_inheritanceFoo extends ($.$mol_object) {
		field(){
			return {"xxx": 123};
		}
	};
	($.Mvt2tjs_structural_channel_with_inheritanceBar) = class Mvt2tjs_structural_channel_with_inheritanceBar extends ($.Mvt2tjs_structural_channel_with_inheritanceFoo) {
		field(){
			return {
				"yyy": 234, 
				...(super.field()), 
				"zzz": 345
			};
		}
	};

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22structural_channel_with_inheritance.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_structural_channel_with_inheritanceFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfield%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctxxx%20123%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_structural_channel_with_inheritanceBar%20Mvt2tjs_structural_channel_with_inheritanceFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfield%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctyyy%20234%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctzzz%20345%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%2CAACI%2C2GAA%2BC%2CwBAA%2FC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAM%2CCACL%2COAAI%2CGADC%2CCAAN%3BAAAA%3BAADD%2CCADJ%3BAAII%2C2GAA%2BC%2C2DAA%2FC%3BAAAA%2CAACC%3BAAAA%2CAAAA%2CUAAM%3BAAAA%2CAACL%2CWAAI%2CGADC%3BAAEL%2CsBAFK%3BAAGL%2CWAAI%3BAAHC%2CCAAN%3BAAAA%3BAADD%2CCAJJ%3B%22%7D