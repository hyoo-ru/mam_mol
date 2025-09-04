namespace $ {

	/**
	 * Sandbox for javascript code from user.
	 * @see https://sandbox.js.hyoo.ru/
	 */
	export class $mol_func_sandbox {
		
		static blacklist = new Set([
			( function() {} ).constructor ,
			( async function() {} ).constructor ,
			( function*() {} ).constructor ,
			( async function*() {} ).constructor ,
			eval ,
			setTimeout ,
			setInterval ,
		])

		static whitelist = new WeakSet()

		static _make : ( contexts : Object[] )=> ( code : string )=> ()=> any

		static get make() {

			if( this._make ) return this._make
			
			const frame = $mol_dom_context.document.createElement( 'iframe' )
			frame.sandbox = 'allow-same-origin allow-scripts'

			frame.style.display = 'none'
			$mol_dom_context.document.body.appendChild( frame )

			const win = frame.contentWindow as any as typeof globalThis
			const SafeFunc = win.Function
			const SafeJSON = win.JSON
			
			win.eval( `

				var AsyncFunction = AsyncFunction || ( async function() {} ).constructor
				var GeneratorFunction = GeneratorFunction || ( function*() {} ).constructor
				var AsyncGeneratorFunction = AsyncGeneratorFunction || ( async function*() {} ).constructor

				Object.defineProperty( Function.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( AsyncFunction.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( GeneratorFunction.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( AsyncGeneratorFunction.prototype , 'constructor' , { value : undefined } )
				
				delete Object.prototype.__proto__

				for( const Class of [
					String , Number , BigInt , Boolean , Array , Object , Promise , Symbol , RegExp , 
					Window, Error , RangeError , ReferenceError , SyntaxError , TypeError ,
					Function , AsyncFunction , GeneratorFunction , AsyncGeneratorFunction
				] ) {
					Object.freeze( Class )
					Object.freeze( Class.prototype )
				}

				for( const key of Object.getOwnPropertyNames( window ) ) delete window[ key ]

			` )

			// Stop event-loop and break all async operations
			$mol_dom_context.document.body.removeChild( frame )
			
			let context_default = {} as Record< string, any >

			function clean( obj : object ) {

				for( let name of Object.getOwnPropertyNames( obj ) ) {
					context_default[ name ] = undefined
				}
				
				const proto = Object.getPrototypeOf( obj )
				if( proto ) clean( proto )

			}
			clean( win )

			const is_primitive = ( val : any )=> Object( val ) !== val

			const safe_value = ( val : any ) : any => {

				if( is_primitive( val ) ) return val
				if( this.blacklist.has( val ) ) return undefined
				if( this.whitelist.has( val ) ) return val
				
				const str = JSON.stringify( val )
				if( !str ) return str

				val = SafeJSON.parse( str )
				this.whitelist.add( val )
				return val

			}

			const safe_derived = ( val : any ) : any => {
				
				if( is_primitive( val ) ) return val
				
				const proxy = new Proxy( val , {

					get( val , field : any ) {
						if( field === 'valueOf' ) return safe_derived( val[field] )
						if( field === 'toString' ) return safe_derived( val[field] )
						return safe_value( val[field] )
					},
					
					set() { return false },
					defineProperty() { return false },
					deleteProperty() { return false },
					preventExtensions() { return false },
					
					apply( val , host , args ) {
						return safe_value( val.call( host , ... args ) )
					},

					construct( val , args ) {
						return safe_value( new val( ... args ) )
					},

				})

				this.whitelist.add( proxy )

				return proxy
			}

			return this._make = ( ( ... contexts : Record< string, any >[] )=> {

				const context_merged = {} as Record< string, any >

				for( let context of contexts ) {
					for( let name of Object.getOwnPropertyNames( context ) ) {
						context_merged[ name ] = safe_derived( context[ name ] )
					}
				}

				const vars = Object.keys( context_merged )
				const values = vars.map( name => context_merged[ name ] )
	
				return ( code : string )=> {

					const func = new SafeFunc( ... vars , '"use strict";' + code )
						.bind( null , ... values )
					
					return ()=> {

						const val = func()
						if( is_primitive( val ) ) return val
						
						this.whitelist.add( val )

						return val
					}

				}

			} ).bind( null , context_default )

		}

		constructor( ... contexts : Object[] ) {
			this.contexts = contexts
		}

		contexts : Object[]
		
		_eval : ( ( code : string )=> ()=> any ) | undefined
		get eval() {
			if( this._eval ) return this._eval
			return this._eval = $mol_func_sandbox.make( ... this.contexts as [Object[]] )
		}

	}

}
