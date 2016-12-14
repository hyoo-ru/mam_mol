namespace $.$mol {
	export class $mol_app_demo extends $.$mol_app_demo {
		
		title() {
			let next = this.titleAddon()
			
			const selected = this.selected()
			if( selected ) next = `$${ selected } - ${ next }`
			
			return next
		}
		
		main() : $mol_viewer[] {
			var selected = this.selected()
			if( selected ) {
				return [ this.detailer( selected ) ]
			} else {
				return [ this.welcomer() ]
			}
		}
		
		@ $mol_mem()
		welcomeText() {
			return $mol_http_resource.item( 'readme.md' ).text()
		}
		
		side() {
			return this.selected() ? false : true
		}
		
		@ $mol_mem()
		namesDemo() {
			var next : string[] = []
			for( var name in $ ) {
				if( !/^\$.*_demo($|_)/i.test( name ) ) continue
				if( /^\$mol_demo/.test( name ) ) continue
				if( /^\$mol_app_demo/.test( name ) ) continue
				if( typeof (<{[index : string]:any}>$)[ name ] !== 'function' ) continue
				next.push( name.substring( 1 ) )
			}
		return next.sort()
		}
		
		@ $mol_mem()
		options() {
			return this.namesDemo().map( name => this.option( name ) )
		}

		// @ $mol_prop()
		// items() : $mol_viewer[] {
		// 	return this.namesDemo().map( name => this.screen( name ) )
		// }
		
		selected() {
			return $mol_state_arg.value( this.stateKey( 'demo' ) )
		}

		@ $mol_mem_key()
		option( name : string ) {
			return new $mol_linker().setup( obj => {
				obj.childs = () => [ name ? ( '$' + name ) : 'All' ]
				obj.arg = () => ({ demo : ()=> name })
			} )
		}
		
		// @ $mol_prop()
		// screen( name : string ) {
		// 	return new $mol_demo_medium().setup( obj => {
		// 		obj.name = () => '$' + name
		// 		obj.argument = () => this.argument().sub( name )
		// 	} )
		// }
		
		// @ $mol_prop()
		// screens( name : string ) {
		// 	return new $mol_demo_all().setup( obj => {
		// 		obj.name = () => '$' + name
		// 		obj.argument = () => this.argument().sub( name )
		// 	} )
		// }

		@ $mol_mem_key()
		widget( name : string ) {
			var Class : typeof $mol_viewer = (<{[index : string]:any}>$)[ '$' + name ]
			return new Class().setup( obj => {
				obj.statePrefix = () => this.statePrefix() + name + '.'
			} )
		}
		
		@ $mol_mem_key()
		detailer( name : string ) {
			return new $mol_app_demo_pager().setup( obj => {
				obj.title = $mol_const( '$' + name )
				obj.body = ()=> [ this.sample( name ) ]
			} )
		}

	}
}
