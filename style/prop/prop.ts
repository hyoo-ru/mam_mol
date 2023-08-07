namespace $ {
	
	export type $mol_style_prop_result =
		Record<
			string ,
			$mol_style_func< 'var' >
		>
	
	/** Create record of CSS variables. */
	export function $mol_style_prop(
		prefix : string ,
		postfixes : Array< string >
	) {
		
		const record = postfixes.reduce( ( record_obj , postfix )=> {
			
			record_obj[ postfix ] = $mol_style_func.vary( `--${ prefix }_${ postfix }` )
			return record_obj
			
		}, {} as $mol_style_prop_result )
		
		return record
		
	}
	
}
