module $.$mol {
	export class $mol_demo_all extends $.$mol_demo_all {
		
		@ $mol_prop()
		items() {
			var demos = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/.test( name ) ) continue
				if( /^\$mol_demo_all/.test( name ) ) continue
				if( typeof $[ name ] !== 'function' ) continue
				demos.push( this.item( name.substring( 1 ) ) )
			}
			return demos
		}
		
		@ $mol_prop()
		item( name : string ) {
			return new $mol_demo_all_item().setup( obj => {
				obj.widget = () => [].concat( this.widget( name ) )
			} )
		}
		
		@ $mol_prop()
		widget( name : string ) {
			var Demo = $[ '$' + name ]
			return new Demo().setup( obj => {
				obj.argument = () => this.argument().sub( name )
			} )
		}
		
	}
}
