namespace $.$$ {
	export class $mol_icon_demo extends $.$mol_icon_demo {

		@ $mol_mem
		names() {
			var next : string[] = []
			for( var name in this.$ ) {
				if( !/^\$mol_icon_/i.test( name ) ) continue
				if( /^\$mol_icon_demo/.test( name ) ) continue
				if( typeof this.$[ name ] !== 'function' ) continue
				next.push( name )
			}
			return next
		}

		@ $mol_mem
		icons() {
			return this.names().map( name => this.Icon( name ) )
		}

		@ $mol_mem_key
		Icon( name : string ) {
			var Class : typeof $mol_view = this.$[ name ]
			return new Class()
		}
		
	}
}
