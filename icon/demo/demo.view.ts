namespace $.$mol {
	export class $mol_icon_demo extends $.$mol_icon_demo {

		@ $mol_mem()
		names() {
			var next : string[] = []
			for( var name in $ ) {
				if( !/^\$mol_icon_/i.test( name ) ) continue
				if( /^\$mol_icon_demo/.test( name ) ) continue
				if( typeof (<any>$)[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
			return next
		}

		@ $mol_mem()
		icons() {
			return this.names().map( name => this.icon( name ) )
		}

		@ $mol_mem_key()
		icon( name : string ) {
			var Class : typeof $mol_viewer = (<any>$)[ '$' + name ]
			return new Class()
		}
		
	}
}
