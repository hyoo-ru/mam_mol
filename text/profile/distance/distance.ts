namespace $ {
	
	export function $mol_text_profile_distance(
		left: Map< string, number >,
		right: Map< string, number >,
	) {
		
		let dist = -4
		let total = -4
		
		for( const [ trigram, left_count ] of left ) {
			total += left_count
			const right_count = right.get( trigram ) ?? 0
			dist += Math.abs( left_count - right_count )
		}
		
		for( const [ trigram, right_count ] of right ) {
			total += right_count
			const left_count = left.get( trigram ) ?? 0
			dist += Math.abs( left_count - right_count )
		}
		
		if( dist < 0 ) return 0
		
		return dist / total
	}
	
}
