declare namespace _structural_channel_with_inheritance {

	export class Foo extends $mol_object {
		field( ): ({ 
			'xxx': number,
		})
	}
	
	export class Bar extends Foo {
		field( ): ReturnType< Foo["field"] > & ({ 
			'yyy': number,
			'zzz': number,
		})
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfield%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctxxx%20123%5Cn%5Ct%5Ct%5Ct%5CtBar%20Foo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfield%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctyyy%20234%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctzzz%20345%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CYAAM%3BAAAA%2CAACL%2CUAAI%2CMAAJ%3BAADK%3BAADP%3BAADJ%3BAAII%2CiBAAI%2CYAAJ%3BAACC%2CAAAA%2CYAEC%2CYAHE%2CGAGF%2CEAFD%2CKAEC%2COAFK%3BAAAA%2CAACL%2CUAAI%2CMAAJ%3BAAEA%2CUAAI%2CMAAJ%3BAAHK%3BAADP%3BAAJJ%3BAAAA%3B%22%7D