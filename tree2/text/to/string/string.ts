namespace $ {

	export function $mol_tree2_text_to_string( this: $, text: $mol_tree2 ) {

		let res = ''
		
		function visit( text: $mol_tree2, prefix: string, inline: boolean ) {

			if( text.type === 'indent' ) {

				if( inline ) res += '\n'
				
				for( let kid of text.kids ) {
					visit( kid, prefix + '\t', false )
				}
				
				if( inline ) res += prefix

			} else if( text.type === 'line' ) {
				
				if( !inline ) res += prefix
				
				for( let kid of text.kids ) {
					visit( kid, prefix, true )
				}
				
				if( !inline ) res += '\n'

			} else {
				
				if( !inline ) res += prefix
				
				res += text.text()
				
				if( !inline ) res += '\n'

			}
			
		}
		
		for( let kid of text.kids ) {
			visit( kid, '', false )
		}
		
		return res
	}

}
