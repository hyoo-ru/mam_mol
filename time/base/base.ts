namespace $ {

	export class $mol_time_base {

		static patterns : any = {}

		static formatter( pattern : string ) {
			if( this.patterns[ pattern ] ) return this.patterns[ pattern ]

			var tokens = Object.keys( this.patterns )
				.sort()
				.reverse()
				.map( ( token : string ) => token.replace( /([-+*.\[\]()\^])/g , '\\$1' ) )
			var lexer = RegExp( '(.*?)(' + tokens.join( '|' ) + '|$)', 'g' )

			var funcs : any[] = []

			pattern.replace( lexer, ( str : string , text : string , token : string ) => {
				if( text ) funcs.push( () => text )
				if( token ) funcs.push( this.patterns[ token ] )
				return str
			} )

			return this.patterns[ pattern ] = ( arg : any )=> {
				return funcs.reduce( ( res , func )=> res + func( arg ) , '' )
			}
		}

		toString( pattern : string ) : string {
			var Base = this.constructor as typeof $mol_time_base
			var formatter = Base.formatter( pattern )
			return formatter.call( Base , this )
		}

	}

}
