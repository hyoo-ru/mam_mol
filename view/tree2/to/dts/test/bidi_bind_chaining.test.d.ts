declare namespace _bidi_bind_chaining {

	export class Foo extends $mol_object {
		a( next?: ReturnType< Foo["b"] > ): ReturnType< Foo["b"] >
		c( next?: any ): any
		b( next?: ReturnType< Foo["c"] > ): ReturnType< Foo["c"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%3F%20%3C%3D%3E%20b%3F%20%3C%3D%3E%20c%3F%20null%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CYAAG%2CYADJ%2CGACI%2CEAAI%2CCAAJ%2CIAAH%2CIAAG%2CYADJ%2CGACI%2CEAAI%2CCAAJ%3BAAAW%2CAAAA%2CYAAG%2CGAAH%2CIAAG%3BAAAV%2CAAAA%2CYAAG%2CYADX%2CGACW%2CEAAI%2CCAAJ%2CIAAH%2CIAAG%2CYADX%2CGACW%2CEAAI%2CCAAJ%3BAADX%3BAADJ%3BAAAA%3B%22%7D