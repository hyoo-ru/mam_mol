namespace $.$$ {

	export class $mol_app_tree extends $.$mol_app_tree {

		@ $mol_mem
		compiled() {
			return $mol_view_tree_compile( $mol_tree.fromString( this.source() , 'view.tree' ) )
		}

		result() {
			return ''
			+ '# view.tree.ts\n\n' + this.compiled().script.replace( /^/gm , '\t' ) + '\n'
			+ '# view.tree.locale=en.json\n\n' + JSON.stringify( this.compiled().locales , null , '\t' ).replace( /^/gm , '\t' )
		}

		source( next? : string ) {
			let source = this.$.$mol_state_arg.value( 'source' , next )
			if( source == null ) source = this.$.$mol_http.resource( 'mol/app/tree/tree.view.tree' ).text()
			return source
		}

	}

}
