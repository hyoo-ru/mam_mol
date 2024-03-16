namespace $ {
	
	/** Create record of CSS variables. */
	export function $mol_style_prop< Keys extends string[] >(
		prefix: string ,
		keys: Keys
	) {
		
		const record = keys.reduce( ( rec , key: Keys[number] )=> {
			
			rec[ key ] = $mol_style_func.vary( `--${ prefix }_${ key }` )
			return rec
			
		}, {} as Record< Keys[number], $mol_style_func< 'var' > > )
		
		return record
		
	}
	
}
