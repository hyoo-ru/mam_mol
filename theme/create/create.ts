namespace $ {
	
	export type $mol_theme_create_result =
		Record<
			string ,
			$mol_style_func< 'var' >
		>
	
	/** Create theme object from CSS variables. */
	export function $mol_theme_create(
		prefix : string ,
		postfixes : Array< string >
	) {
		
		const theme = postfixes.reduce( ( theme_obj , postfix )=> {
			
			theme_obj[ postfix ] = $mol_style_func.vary( `--${ prefix }_${ postfix }` )
			return theme_obj
			
		}, {} as $mol_theme_create_result )
		
		return theme
		
	}
	
}
