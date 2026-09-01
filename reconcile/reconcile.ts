namespace $ {
	
	export function $mol_reconcile< Prev, Next >( {
		prev,
		from,
		to,
		next,
		equal,
		drop,
		insert,
		update,
		replace,
	}: {
		prev: readonly Prev[],
		from: number,
		to: number,
		next: ArrayLike<Next>,
		equal: ( next: Next, prev: Prev )=> boolean,
		drop: ( prev: Prev, lead: Prev | null )=> Prev | null,
		insert: ( next: Next, lead: Prev | null )=> Prev,
		update?: ( next: Next, prev: Prev, lead: Prev | null )=> Prev,
		replace?: ( next: Next, prev: Prev, lead: Prev | null )=> Prev,
	} ) {
		
		if( !update ) update = ( next, prev, lead )=> prev
		if( !replace ) replace = ( next, prev, lead )=> insert( next, drop( prev, lead ) )
		
		if( to > prev.length ) to = prev.length // $mol_fail( new RangeError( `To(${ to }) greater then length(${ prev.length })` ) )
		if( from > to ) from = to // $mol_fail( new RangeError( `From(${ to }) greater then to(${ to })` ) )
	
		let p = from
		let n = 0
		let lead = p ? prev[ p - 1 ] : null
		
		while( p < to || n < next.length ) {
			
			if( p < to && n < next.length && equal( next[n], prev[p] ) ) {
				
				lead = update( next[n], prev[p], lead )
				++ p
				++ n
				
			} else if( next.length - n > to - p ) {
				
				lead = insert( next[n], lead )
				++ n
				
			} else if( next.length - n < to - p ) {
				
				lead = drop( prev[p], lead )
				++ p
				
			} else {
				
				lead = replace( next[n], prev[p], lead )
				++ p
				++ n
				
			}
			
		}
		
	}
	
}
