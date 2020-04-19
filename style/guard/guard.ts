namespace $ {

	type Descendant< Name extends keyof $mol_view_all , Config > = $mol_style_guard<
		Extract< $mol_type_result< $mol_view_all[ Name ] > , $mol_view >,
		Config
	>

	type Kids< Config > = {
		[ view in keyof Config ] : view extends keyof $mol_view_all
			? Descendant< view , Config[view] >
			: $mol_type_error< 'Unknown View' >
	}
	
	type Attrs< View extends $mol_view , Config > = {
		[ name in keyof Config ] : name extends keyof ReturnType< View['attr'] >
			? {
				[ val in keyof Config[name] ] : $mol_style_guard< View , Config[name][val] >
			}
			: $mol_type_error< 'Unknown attribute' >
	}

	type Medias< View extends $mol_view , Config > = {
		[ query in keyof Config ] : $mol_style_guard< View , Config[query] >
	}

	export type $mol_style_guard< View extends $mol_view , Config > =
	& $mol_style_properties
	& {
		[ key in keyof Config ]
		
		: key extends keyof $mol_style_properties
		? unknown
		
		: key extends $mol_style_pseudo_class | $mol_style_pseudo_element
		? $mol_style_guard< View , Config[ key ] >
		
		: key extends '>'
		? Kids< Config[key] >
		
		: key extends '@'
		? Attrs< View , Config[key] >
		
		: key extends '@media'
		? Medias< View , Config[key] >
		
		: key extends keyof $mol_view_all
		? Descendant< key , Config[key] >
		
		: key extends keyof View
		? View[ key ] extends ( id? : any )=> infer Sub
			? Sub extends $mol_view
				? $mol_style_guard< Sub , Config[ key ] >
				: $mol_type_error< 'Property returns non $mol_view' , { Returns : Sub } >
			: $mol_type_error< 'Field is not a Property' >
		
		: $mol_type_error< 'Unknown Property or View' >

	}

}
