namespace $ {
	
	type JSON = null | boolean | number | string | JSON[] | { [ key: string ]: JSON }
	
	export class $mol_schema_json extends $mol_schema_lazy<JSON>( ()=> $mol_schema_some([
		$mol_schema_dict([ $mol_schema_string, $mol_schema_json ]),
		$mol_schema_enum([ null ]),
		$mol_schema_boolean, $mol_schema_float, $mol_schema_string,
		$mol_schema_list( $mol_schema_json ),
	]) ) {}

}
