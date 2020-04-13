namespace $ {

	export class $mol_func_sandbox {
		
		static _make : ( contexts : Object[] )=> ( code : string )=> ()=> void

		static get make() {

			if( this._make ) return this._make
			
			const frame = $mol_dom_context.document.createElement( 'iframe' )
			frame.style.display = 'none'
			$mol_dom_context.document.body.appendChild( frame )

			const win = frame.contentWindow as any as typeof globalThis
			const SafeFunction = win.Function
			
			win.eval( `

				var AsyncFunction = AsyncFunction || ( async function() {} ).constructor
				var GeneratorFunction = GeneratorFunction || ( function*() {} ).constructor

				Object.defineProperty( Function.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( AsyncFunction.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( GeneratorFunction.prototype , 'constructor' , { value : undefined } )

				for( const Class of [
					String , Number , Boolean , Array , Object , Promise , Symbol , RegExp , 
					Error , RangeError , ReferenceError , SyntaxError , TypeError ,
					Function , AsyncFunction , GeneratorFunction ,
				] ) {
					Object.freeze( Class )
					Object.freeze( Class.prototype )
				}

				for( const key of Object.getOwnPropertyNames( window ) ) delete window[ key ]

			` )

			let context_default = {}

			for( let name of Object.getOwnPropertyNames( win ) ) {
				context_default[ name ] = undefined
			}

			return this._make = ( ( ... contexts : Object[] )=> {

				const context_merged = {}

				for( let context of contexts ) {
					for( let name of Object.getOwnPropertyNames( context ) ) {
						context_merged[ name ] = context[ name ]
					}
				}

				const vars = Object.keys( context_merged )
				const values = vars.map( name => context_merged[ name ] )
	
				return ( code : string )=> new SafeFunction( ... vars , '"use strict";' + code ).bind( null , ... values )

			} ).bind( null , context_default )

		}

		constructor( ... contexts : Object[] ) {
			this.contexts = contexts
		}

		contexts : Object[]
		
		_eval : ( ( code : string )=> ()=> void ) | undefined
		get eval() {
			if( this._eval ) return this._eval
			return this._eval = $mol_func_sandbox.make( ... this.contexts as [Object[]] )
		}

	}

}
