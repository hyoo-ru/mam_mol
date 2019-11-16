namespace $ {

	$mol_test({

		'Fit to record' () {
			$mol_data_record({ age : $mol_data_number })({ age : 0 })
		} ,

		'Extends record' () {
			$mol_data_record({ age : $mol_data_number })( { age : 0 , name : 'Jin' } as any )
		} ,

		// 'Recursive record' () {

		// 	const User = $mol_data_record({
		// 		name : $mol_data_string ,
		// 		get kids() { return $mol_data_array( User ) } ,
		// 	})

		// 	User({
		// 		name : 'Jin' ,
		// 		kids : [
		// 			{
		// 				name : 'John' ,
		// 				kids : [] ,
		// 			}
		// 		] ,
		// 	})
		
		// } ,

		'Shrinks record' () {
			$mol_assert_fail( ()=> {
				$mol_data_record({ age : $mol_data_number , name : $mol_data_string })( { age : 0 } as any )
			} , '["name"] is not a string' )
		} ,

		'Shrinks deep record' () {
			$mol_assert_fail( ()=> {
				$mol_data_record({ wife : $mol_data_record({ age : $mol_data_number }) })( { wife : { } } as any )
			} , '["wife"] ["age"] is not a number' )
		} ,

	})
}
