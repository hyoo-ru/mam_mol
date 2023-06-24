namespace $ {

	type $mol_chance_result< List extends Array< [ number, any ] > > = $mol_type_result< List[ number ][ 1 ] >

	export function $mol_chance< List extends Array< [ number, any ] > >( ... chance_list: List ): $mol_chance_result< List > | never {

		const prob_sum = chance_list.reduce( ( sum, { 0: prob } )=> {
			if (
				prob < 0
				|| prob > 100
				|| Number.isNaN( prob )
				|| prob === Infinity
			) {
				throw new Error( `Incorrect probability value: ${ prob }, only numbers from 0 to 100 are allowed` )
			}

			sum += prob

			if ( sum > 100 ) {
				throw new Error( `Incorrect probability sum: ${ sum }, but 100 is max` )
			}

			return sum
		}, 0 )

		if ( prob_sum < 100 ) {
			throw new Error( `Incorrect probability sum: ${ prob_sum }, but needs 100` )
		}

		const random = Math.random()

		var prob_total = 0
		for ( var i = 0; i < chance_list.length; i ++ ) {

			const { 0: prob_percent, 1: value } = chance_list[ i ]

			const prob = prob_total + prob_percent / 100

			if ( random < prob ) {

				if ( value instanceof Function ) {
					return value()
				}

				return value

			}
			else {

				prob_total = prob

				continue

			}

		}

		throw new Error( `Incorrect probability sum: ${ prob_sum }, but needs 100` )

	}

}
