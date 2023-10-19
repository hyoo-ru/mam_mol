declare namespace _left_bind_in_array_and_object {

	type $mol_object__rows_Y0ZPGRXV = $mol_type_enforce< 
		ReturnType< Foo["content"] >,
		ReturnType< $mol_object["rows"] >
	>
	export class Foo extends $mol_object {
		obj( ): ({ 
			'prop': ReturnType< Foo["Obj"] >,
		})
		arr( ): readonly any[]
		content( ): readonly any[]
		Obj( ): $mol_object
	}
	
}

//# sourceMappingURL=data:application/json,%7B%22version%22%3A3%2C%22sources%22%3A%5B%22%3F%22%5D%2C%22sourcesContent%22%3A%5B%22%5Cn%5Ct%5Ct%5Ct%5CtFoo%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctobj%20*%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctprop%20%3C%3D%20Obj%5Cn%5Ct%5Ct%5Ct%5Ct%5Ctarr%20%2F%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3C%3D%20Obj%20%24mol_object%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%5Ctrows%20%3C%3D%20content%20%2F%5Cn%5Ct%5Ct%5Ct%22%5D%2C%22mappings%22%3A%22%3B%3BAAAA%3BAAAA%3BAAAA%2CAAMO%3BAAAA%2CAAAA%2CEAAK%2CYALR%2CGAKQ%2CEAAG%2COAAH%2CIADC%3BAACN%2CEADM%2CyBACN%2CIADM%3BAAAA%3BAAJT%2CiBAAI%2CoBAAJ%3BAACC%2CAAAA%2CUAAI%3BAAAA%2CAACH%2CWAAK%2CYAFP%2CGAEO%2CEAAG%2CGAAH%2CIAAL%3BAADG%3BAAEJ%2CAAAA%2CUAAI%3BAAEM%2CAAAA%2CcAAQ%3BAADd%2CAAAA%2CUAAI%3BAAJT%3BAADJ%3BAAAA%3B%22%7D