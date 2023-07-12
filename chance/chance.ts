namespace $ {

	export type $mol_chance_list = Array< [ number, ()=> any ] >

	export type $mol_chance_result< List extends $mol_chance_list > = $mol_type_result< List[ number ][ 1 ] >

	export function $mol_chance< List extends $mol_chance_list >( ... chance_list: List ): $mol_chance_result< List > | never {

		const prob_sum = chance_list.reduce( ( sum, { 0: prob } )=> {
			if (
				prob < 0
				|| !Number.isFinite( prob )
			) {
				throw new Error( `Incorrect probability value: ${ prob }, but only positive numbers are allowed` )
			}

			sum += prob

			return sum
		}, 0 )

		const random = Math.random()

		var prob_total = 0
		for( var i = 0; i < chance_list.length; ++ i ) {

			var { 0: prob_raw, 1: fn } = chance_list[ i ]

			var prob_percent = ( prob_raw / prob_sum ) * 100

			var prob = prob_total + ( prob_percent / 100 )

			if ( random < prob ) {

				return fn()

			}
			else {

				prob_total = prob

				continue

			}

		}

		throw new Error( `Incorrect probability sum: ${ prob_sum }` )

	}

}
