declare namespace _bidi_bind_indexed_second_level {

	export class Bar extends $mol_object {
		expanded( ): boolean
	}
	
	type Bar__expanded_D1APEXB5 = $mol_type_enforce< 
		ReturnType< Foo["owner"] >,
		ReturnType< Bar["expanded"] >
	>
	export class Foo extends $mol_object {
		indexed( id: any, next?: Bar ): Bar
		owner( id: any, next?: boolean ): boolean
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtBar%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctexpanded%20false%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctindexed*%3F%20Bar%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctexpanded%20%3C%3D%3E%20owner*%3F%20false%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAACI%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CeAAS%3BAADV%3BAADJ%3BAAKM%3BAAAA%2CAAAA%2CEAAS%2CYAFX%2CGAEW%2CEAAI%2CKAAJ%2CIADA%3BAACT%2CEADS%2CiBACT%2CQADS%3BAAAA%3BAADX%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2C2BAAU%2CGAAV%2CIAAU%3BAACI%2CAAAA%2CyBAAQ%2COAAR%2CIAAQ%3BAAFvB%3BAAHJ%3BAAAA%3B%22%7D