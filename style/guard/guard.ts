namespace $ {

	export type $mol_style_guard< View extends $mol_view , Config > =
	& $mol_style_properties
	& {
		[ key in keyof Config ]? : key extends keyof $mol_style_properties
			? unknown
			: key extends $mol_style_pseudo_class | $mol_style_pseudo_element
				? $mol_style_guard< View , Config[ key ] >
				: key extends '>'
					? {
						[ view in keyof Config[key] ] : view extends keyof $mol_view_all
							? $mol_style_guard<
								Extract< $mol_type_result< $mol_view_all[ view ] > , $mol_view >,
								Config[key][view]
							>
							: $mol_type_error<[ 'Unknown View' , view ]>
					}
					: key extends '@'
						? {
							[ name in keyof Config[key] ] : name extends keyof ReturnType< View['attr'] >
								? {
									[ val in keyof Config[key][name] ] : $mol_style_guard< View , Config[key][name][val] >
								}
								: $mol_type_error<[ 'Unknown Attribute' , name ]>
						}
						: key extends '@media'
							? {
								[ query in keyof Config[key] ] : $mol_style_guard< View , Config[key][query] >
							}
							: key extends keyof $mol_view_all
								? $mol_style_guard<
									Extract< $mol_type_result< $mol_view_all[key] > , $mol_view >,
									Config[key]
								>
								: key extends keyof View
									? View[ key ] extends ( id? : any )=> infer Sub
										? Sub extends $mol_view
											? $mol_style_guard< Sub , Config[ key ] >
											: $mol_type_error<[ 'Wrong Property' , key ]>
										: $mol_type_error<[ 'Property is not Element' , key ]>
									: $mol_type_error<[ 'Unknown Property' , key ]>
	}

}
