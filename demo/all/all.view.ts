module $.$mol {
	export class $mol_demo_all extends $.$mol_demo_all {
		
		@ $mol_prop()
		names() {
			var names = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/.test( name ) ) continue
				if( /^\$mol_demo_all/.test( name ) ) continue
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
					this.itemMedium( selected ) ,
					this.itemSmall( selected ) ,
					this.itemLarge( selected ) ,
				]
			} else {
				return this.names().map(name => this.item(name))
			}
		}
		
		selected() {
			return this.argument().value( 'details' )
		}

		@ $mol_prop()
		option( name : string ) {
			return new $mol_linker().setup( obj => {
				obj.childs = () => [ name ? ( '$' + name ) : 'All' ]
				obj.patch = () => ({ details : name })
			} )
		}

		@ $mol_prop()
		item( name : string ) {
			return new $mol_demo_all_item().setup( obj => {
				obj.widget = () => [].concat( this.widget( name ) )
			} )
		}

		@ $mol_prop()
		itemLarge( name : string ) {
			return new $mol_demo_all_item().setup( obj => {
				obj.widget = () => [].concat( this.widget( name + '-large' ) )
			} )
		}

		@ $mol_prop()
		itemMedium( name : string ) {
			return new $mol_demo_all_item().setup( obj => {
				obj.widget = () => [].concat( this.widget( name + '-medium' ) )
			} )
		}

		@ $mol_prop()
		itemSmall( name : string ) {
			return new $mol_demo_all_item().setup( obj => {
				obj.widget = () => [].concat( this.widget( name + '-small' ) )
			} )
		}

		@ $mol_prop()
		widget( name : string ) {
			var Demo = $[ '$' + name.split( '-' )[0] ]
			return new Demo().setup( obj => {
				obj.argument = () => this.argument().sub( name )
			} )
		}

	}
}
