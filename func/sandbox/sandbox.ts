namespace $ {

	export class $mol_func_sandbox {
		
		constructor( ... contexts : Object[] ) {
			this.contexts = contexts
		}

		readonly contexts : Object[]

		'context()' : Object
		context() {
			if( this[ 'context()' ] ) return this[ 'context()' ]

			const context_merged = {}

			for( let name of Object.getOwnPropertyNames( window ) ) {
				if( name === 'eval' ) continue
				if( name === 'Object' ) continue
				context_merged[ name ] = undefined
			}

			for( let context of this.contexts ) {
				for( let name of Object.getOwnPropertyNames( context ) ) {
					context_merged[ name ] = context[ name ]
				}
			}

			return this[ 'context()' ] = context_merged
		}

		vars() {
			return Object.keys( this.context() )
		}

		values() {
			const context = this.context()
			return this.vars().map( name => context[ name ] )
		}
		
		eval( code : string ) {

			const codes = [
				'"use strict";',
				"Object.defineProperty( Object.getPrototypeOf( async function(){} ) , 'constructor' , { value : undefined } );" ,
				"Object.defineProperty( Object.getPrototypeOf( function *(){} ) , 'constructor' , { value : undefined } );" ,
				code
			]
			
			const func = new Function( this.vars().join( ',' ) , codes.join('\n') ).bind( null , ... this.values() )
			
			return ()=> {
				try {
					Function.prototype.constructor = undefined
					return func()
				} finally {
					Function.prototype.constructor = Function
				}
			}
		}

	}

}
