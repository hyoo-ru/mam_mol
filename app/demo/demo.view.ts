module $.$mol {
	export class $mol_app_demo extends $.$mol_app_demo {
		
		@ $mol_prop()
		names() {
			var names = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof $[ name ] !== 'function' ) continue
				names.push( name.substring( 1 ) )
			}
			return names
		}
		
		@ $mol_prop()
		options() {
			return [ null ].concat( this.names() ).map( name => this.option( name ) )
		}

		@ $mol_prop()
		items() : $mol_viewer[] {
			var selected = this.selected()
			if( selected ) {
				return [
					this.screens( selected[0] )
				]
			} else {
				return this.names().map( name => this.screen( name ) )
			}
		}
		
		selected() {
			return this.argument().value( 'demo' )
		}

		@ $mol_prop()
		option( name : string ) {
			return new $mol_linker().setup( obj => {
				obj.childs = () => [ name ? ( '$' + name ) : 'All' ]
				obj.patch = () => ({ demo : name })
			} )
		}
		
		@ $mol_prop()
		screen( name : string ) {
			return new $mol_demo_medium().setup( obj => {
				obj.name = () => '$' + name
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
		@ $mol_prop()
		screens( name : string ) {
			return new $mol_demo_all().setup( obj => {
				obj.name = () => '$' + name
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
	}
}
