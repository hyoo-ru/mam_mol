namespace $.$$ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_tag_tree_demo
	 */
	export class $mol_tag_tree extends $.$mol_tag_tree {

		@ $mol_mem
		override ids() {
			const prefix = this.path().join( '/' )
			const ids_tags = this.ids_tags()
			return Object.keys( ids_tags ).filter( id => ids_tags[ id ].some( ( tag: string )=> tag.startsWith( prefix ) ) )
		}
		
		@ $mol_mem
		override item_list() {
			const path = this.path()
			const grouped = new Set( this.tags().flatMap( tag => this.Tag_tree( tag ).ids() ) )
			return this.ids()
				.filter( id => !grouped.has( id ) )
				.sort( $mol_compare_text() )
				.map( id => this.Item([ ... path, id ]) )
		}

		@ $mol_mem
		override tags() {
			
			const stat = new Map< string, number >()
			const ids_tags = this.ids_tags()
			const ids = this.ids()
			const prefix = this.path().join( '/' )
			
			for( let id of ids ) {
				for( let tag of ids_tags[ id ] ) {
					if( prefix && !( tag as string ).startsWith( prefix + '/' ) ) continue
					tag = tag.slice( prefix.length ).replace( /^\//, '' )
					stat.set( tag, ( stat.get( tag ) ?? 0 ) + 1 )
				}
			}
			
			for( let [ tag, count ] of stat ) {
				if( count < 2 ) stat.delete( tag )
				if( count > ids.length - 2 ) stat.delete( tag )
			}
			
			const prefixes = [ ... new Set( [ ... stat.keys() ].map( tag => tag.replace( /\/.*/, '' ) ) ) ].sort( $mol_compare_text() )
			return prefixes
		}

		@ $mol_mem
		override tag_list() {
			return this.tags().map( tag => this.Tag([ tag ]))
		}
		
		override tag_path( id: string ) {
			return [ ... this.path(), id ]
		}
		
		@ $mol_mem_key
		override tag_expanded( id: readonly string[], next?: boolean ) {
			return next ?? this.tag_expanded_default(id)
		}

		tag_expanded_default(id: readonly string[]) {
			return this.levels_expanded() >= id.length
		}

		override tag_name( id: string ) {
			return id
		}

		override item_title(id: readonly string[]) {
			return id.at(-1)!
		}

	}
}
