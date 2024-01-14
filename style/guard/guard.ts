namespace $ {

	type Attrs< View extends $mol_view , Config, Attrs = ReturnType< View['attr'] > > = {
		[ name in keyof Attrs ]?: {
			[ val in keyof Config[ Extract< name, keyof Config > ] ]
			: $mol_style_guard< View , Config[ Extract< name, keyof Config > ][ val ] >
		}
	}

	type Medias< View extends $mol_view , Config > = {
		[ query in keyof Config ] : $mol_style_guard< View , Config[query] >
	}
	
	type Keys< View extends $mol_view > =
	| '>' | '@'
	| keyof $mol_style_properties
	| $mol_style_pseudo_element | $mol_style_pseudo_class
	| $mol_type_keys_extract< View, ()=> $mol_view >
	| `$${string}`

	export type $mol_style_guard< View extends $mol_view , Config > =
	& { [ key in Keys< View > ]?: unknown }
	& $mol_style_properties
	& {
		[ key in keyof Config ]
		
		: key extends keyof $mol_style_properties
		? $mol_style_properties[ key ]
		
		: key extends '>' | $mol_style_pseudo_class | $mol_style_pseudo_element
		? $mol_style_guard< View , Config[ key ] >
		
		: key extends '@'
		? Attrs< View , Config[key] >
		
		: key extends '@media'
		? Medias< View , Config[key] >
		
		: key extends `[${string}]`
		? { [ val in keyof Config[key] ]: $mol_style_guard< View , Config[key][val] > }
		
		: key extends `--${string}`
		? any
		
		: key extends keyof $
			? $mol_style_guard<
				InstanceType< Extract< $[ key ], typeof $mol_view > >,
				Config[ key ]
			>
		
		: key extends keyof View
		? View[ key ] extends ( id? : any )=> infer Sub
			? Sub extends $mol_view
				? $mol_style_guard< Sub , Config[ key ] >
				: $mol_type_error< 'Property returns non $mol_view' , { Returns : Sub } >
			: $mol_type_error< 'Field is not a Property' >
		
		: key extends `$${string}`
		? $mol_type_error< 'Unknown View Class' >
		
		: $mol_type_error< 'Unknown CSS Property' >

	}

}
