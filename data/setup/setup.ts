namespace $ {

	export function $mol_data_setup<
		Value extends $mol_data_value ,
		Config = never
	>(
		value : Value ,
		config : Config ,
	) {
		
		return Object.assign( value , {
			config ,
			Value : null as any as ReturnType< Value >
		} )

	}

}
