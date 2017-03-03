namespace $ {
	
	export function $mol_math_round_expand( val : number , gap = 1 ) {
		if( val === 0 ) return 0
		
		const val_abs = Math.abs( val )
		const val_sign = val ? Math.round( val / val_abs ) : 0
		
		const digits = Math.floor( Math.log( val_abs ) / Math.log( 10 ) )
		const precission = Math.pow( 10 , digits - gap )
		const val_expanded = precission * Math.ceil( val_abs / precission )
		
		return val_sign * val_expanded
	}
	
}
