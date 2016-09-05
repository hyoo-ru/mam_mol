module $.$mol {
	export class $mol_icon_demo extends $.$mol_icon_demo {

		@ $mol_prop()
		names() {
			var next = []
			for( var name in $ ) {
				if( !/^\$mol_icon_/i.test( name ) ) continue
				if( /^\$mol_icon_demo/.test( name ) ) continue
				if( typeof $[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next
		}

		@ $mol_prop()
		icons() {
			return this.names().map( name => this.icon( name ) )
		}

		@ $mol_prop()
		icon( name : string ) {
			var Class = $[ '$' + name ]
			return new Class()
		}
		
	}
}
