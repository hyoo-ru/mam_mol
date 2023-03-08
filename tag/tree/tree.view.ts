namespace $.$$ {
	export class $mol_tag_tree extends $.$mol_tag_tree {
		
		tag_expanded( id: string, next?: boolean ) {
			return this.tag_current( next?.valueOf && ( next ? id : '' ) ) === id
		}
		
		@ $mol_mem
		tags_ids() {
			
			const ids = this.ids()
			const all = {} as Record< string, string[] >
			
			for( const id of ids ) for( const tag of this.tags( id ) ) {
					
				let ids = all[ tag ]
				if( !ids ) ids = all[ tag ] = []
				
				ids!.push( id )
					
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
				
				tags.sort( (a,b)=> all.get( b )!.size - all.get( a )!.size )
				
				if( !tags.length ) {
					for( const ids of all.values() ) for( const id of ids ) tail.add( id )
					break
				}
					
				const best = tags[0]
				groups[ best ] = [ ... all.get( best )! ]
				tags.splice( tags.indexOf( best ), 1 )
				
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