enum Sex { male , female }
namespace $ {
	$mol_test({

		'Is type of Sex enum - string' () {
			const SexParser = $mol_data_enum( Sex )
			SexParser('male')
		} ,

		'Is type of Sex enum - number' () {
			const SexParser = $mol_data_enum( Sex )
			SexParser(0)
		} ,

		'Is not a type of enum' () {
			$mol_assert_fail( ()=> {
				const SexParser = $mol_data_enum( Sex )
				SexParser({} as any)
			} , 'is not a type of enum' )
		} ,

	})
}
