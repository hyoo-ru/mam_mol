declare namespace $ {

	export class Mvt2tjs_right_bind_in_left_bindFoo extends $mol_object {
		a( ): any
	}
	
	type Mvt2tjs_right_bind_in_left_bindFoo__a_QV2P6URK = $mol_type_enforce< 
		ReturnType< Mvt2tjs_right_bind_in_left_bindBar["b"] >,
		ReturnType< Mvt2tjs_right_bind_in_left_bindFoo["a"] >
	>
	export class Mvt2tjs_right_bind_in_left_bindBar extends $mol_object {
		foo( ): ReturnType< Mvt2tjs_right_bind_in_left_bindBar["Cls"] >
		Cls( ): Mvt2tjs_right_bind_in_left_bindFoo
		b: ( )=> ReturnType< Mvt2tjs_right_bind_in_left_bindFoo["a"] >
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22right_bind_in_left_bind.test.tree%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_in_left_bindFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Cta%20null%5Cn%5Ct%5Ct%5Ct%5CtMvt2tjs_right_bind_in_left_bindBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctfoo%20%3C%3D%20Cls%20Mvt2tjs_right_bind_in_left_bindFoo%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Cta%20%3D%3E%20b%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CgDAAmC%2CoBAAnC%3BAACC%2CAAAA%2CQAAE%3BAADH%3BAADJ%3BAAKM%3BAAAA%2CAAAA%2CEAAE%2CYAFJ%2CkCAEI%2CEAAG%2CCAAH%2CIADQ%3BAACV%2CEADU%2CgDACV%2CCADU%3BAAAA%3BAADZ%2CgDAAmC%2CoBAAnC%3BAACC%2CAAAA%2CUAAI%2CYADL%2CkCACK%2CEAAG%2CGAAH%3BAAAG%2CAAAA%2CUAAI%3BAACL%2CAAAA%2CGAAH%2CEAAG%2CGAAH%2CeAFJ%2CkCAEI%2CEAAF%2CCAAE%3BAAFJ%3BAAHJ%3BAAAA%3B%22%7D