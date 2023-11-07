namespace $ {
	
	/** Makes JSON from json.tree. */
	export function $mol_tree2_to_json(
		this: $,
		tree: $mol_tree2,
	): unknown {

		if( !tree.type ) {
			if( tree.kids.every( kid => !kid.type ) ) return tree.text()
			if( tree.kids.length !== 1 ) this.$mol_fail( new Error( `Multiple json root at ${tree.span}` ) )
			return this.$mol_tree2_to_json(tree.kids[0] )
		}
		
		if( tree.type === '-' ) return undefined
		if( tree.type === 'true' ) return true
		if( tree.type === 'false' ) return false
		if( tree.type === 'null' ) return null
		
		if( tree.type === '*' ) {
			
			const obj = {} as Record< string, unknown >
			
			for( const kid of tree.kids ) {
				if( kid.type === '-' ) continue
				
				const key = kid.type || kid.clone( kid.kids.slice( 0, -1 ) ).text()
				const val = this.$mol_tree2_to_json( kid.kids[ kid.kids.length - 1 ] )
				
				if( val !== undefined ) obj[ key ] = val
			}
			
			return obj
		}
		
		if( tree.type === '/' ) {
			
			const res = [] as unknown[]
			
			for( const kid of tree.kids ) {
				if( kid.type === '-' ) continue
				
				var val = this.$mol_tree2_to_json( kid )
				if( val !== undefined ) res.push( val )
				
			}
			
			return res
		}
		
		const numb = Number( tree.type ) 
		if( !Number.isNaN( numb ) || tree.type === 'NaN' ) return numb
		
		this.$mol_fail( new Error( `Unknown json type (${tree.type}) at ${tree.span}` ) )
	}

}
