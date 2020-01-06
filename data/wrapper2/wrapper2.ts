namespace $ {

	export function $mol_data_wrapper2<
		Class extends { new( val : any ) : any } ,
	>( Class : Class ) {
		
		return $mol_data_setup(
			( val : ConstructorParameters< Class >[0] ) => new Class( val ) as InstanceType< Class > ,
			{ Class } ,
		)

	}

}
