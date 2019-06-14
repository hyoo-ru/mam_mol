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

			const AsyncFunction = ( async function() {} ).constructor
			const GeneratorFunction = ( function*() : any {} ).constructor

			const func = new Function( this.vars().join( ',' ) , '"use strict";' + code ).bind( null , ... this.values() )
			
			return ()=> {
				try {
					Object.defineProperty( Function.prototype , 'constructor' , { value : undefined } )
					Object.defineProperty( AsyncFunction.prototype , 'constructor' , { value : undefined } )
					Object.defineProperty( GeneratorFunction.prototype , 'constructor' , { value : undefined } )
					return func()
				} finally {
					Object.defineProperty( Function.prototype , 'constructor' , { value : Function } )
					Object.defineProperty( AsyncFunction.prototype , 'constructor' , { value : AsyncFunction } )
					Object.defineProperty( GeneratorFunction.prototype , 'constructor' , { value : GeneratorFunction } )
				}
			}

		}

	}

}
