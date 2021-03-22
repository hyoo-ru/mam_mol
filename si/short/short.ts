namespace $ {
	
	export function $mol_si_short( numb: number, unit = '' ) {
		
		let magnitude = Math.floor( Math.log10( Math.abs( numb ) ) / 3 )
		
		if( !Number.isFinite( magnitude ) ) {
			const prefix = isNaN( numb ) ? `∅` : numb.toLocaleString()
			const suffix = unit ? ' ' + unit : ''
			return prefix + suffix
		}
		
		let normal = numb / 10 ** ( 3 * magnitude )
		
		if( Math.round( Math.abs( normal ) ) === 1000 ) {
			normal /= 1000
			++ magnitude
		}
		
		const prefix = normal.toPrecision(3)
		
		if( unit ) {
			return prefix + ' ' + $mol_si_prefix[ magnitude ] + unit
		} else {
			return prefix + $mol_si_prefix[ magnitude ]
		}
		
	}
	
}
