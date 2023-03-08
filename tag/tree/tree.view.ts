namespace $.$$ {
	export class $mol_tag_tree extends $.$mol_tag_tree {
		
		@ $mol_mem
		ids() {
			return Object.keys( this.ids_tags() )
		}
		
		@ $mol_mem_key
		tags( id: string ) {
			return this.ids_tags()[ id ]
		}
		
		tag_expanded( id: string, next?: boolean ) {
			return this.tag_current( next?.valueOf && ( next ? id : '' ) ) === id
		}
		
		@ $mol_mem
		tags_ids() {
			
			const all = {} as Record< string, string[] >
			
			for( const id of this.ids() ) for( const tag of this.tags( id ) ) {
					
				let ids = all[ tag ]
				if( !ids ) ids = all[ tag ] = []
				
				ids.push( id )
					
			}
			
			return all
		}
		
		@ $mol_mem
		groups() {
			
			const ids = this.ids()
			const all = new Map(
				Object.entries( this.tags_ids() )
					.map( ([ tag, ids ])=> [ tag, new Set( ids ) ] )
			)
			
			const groups = {} as Record< string, string[] >
			const tail = new Set< string >()
			
			const tags = [ ... all.keys() ]
				.filter( tag => all.get( tag )!.size < ids.length * .9 )
				.filter( tag => all.get( tag )!.size > 3 )
			
			while( all.size ) {

				let best_index = -1
				let last_size = -1

				for (let i = 0; i < tags.length; i++) {
					const item = all.get(tags[i])

					if (item && item.size > last_size) {
						best_index = i
						last_size = item.size
					}
				}

				if (best_index === -1) {
					for( const ids of all.values() ) for( const id of ids ) tail.add( id )
					break
				}

				const best = tags[best_index]
				groups[ best ] = [ ... all.get( best )! ]
				tags.splice( best_index, 1 )
				
				for( const id of groups[ best ] ) for( const [ tag, ids ] of all ) {
					ids.delete( id )
					if( !ids.size ) all.delete( tag )
				}
				
			}
			
			return { ... groups, '': [ ... tail ] }
		}
		
		@ $mol_mem_key
		tag_ids( tag: string ) {
			return this.tags_ids()[ tag ]
		}
		
		@ $mol_mem
		sub() {
			const { '': ids = [], ... groups } = this.groups()
			return [
				... Object.keys( groups ).map( tag => this.Tag( tag ) ),
				... ids.map( id => this.Item( id ) ),
			]
		}
		
		tag_name( tag: string ) {
			return tag
		}
		
	}
}
