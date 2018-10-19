namespace $.$$ {

	export class $mol_app_tree extends $.$mol_app_tree {

		@ $mol_mem
		compiled() {
			return $mol_view_tree_compile( $mol_tree.fromString( this.source() , 'view.tree' ) )
		}

		result() {
			return '# view.tree\n\n```tree\n' + this.source() + '\n```\n'
			+ '# view.tree.ts\n\n```tree\n' + this.compiled().script + '\n```\n'
			+ '# view.tree.locale=en.json\n\n```tree\n' + JSON.stringify( this.compiled().locales , null , '\t' ) + '\n```\n'
		}

		source( next? : string ) {
			return this.$.$mol_state_arg.value( 'source' , next ) || this.$.$mol_http.resource( 'mol/app/tree/tree.view.tree' ).text()
		}

	}

}
