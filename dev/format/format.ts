namespace $ {

	// https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
	($ as any)['devtoolsFormatters'] ||= []

	export function $mol_dev_format_register( config : {
		header : ( val : any , config : any )=> any
		hasBody : ( val : any , config : any )=> false
	} | {
		header : ( val : any , config : any )=> any
		hasBody : ( val : any , config : any )=> boolean
		body : ( val : any , config : any )=> any
	} ) {
		($ as any)['devtoolsFormatters'].push( config )
	}

	export const $mol_dev_format_head = Symbol( '$mol_dev_format_head' )
	export const $mol_dev_format_body = Symbol( '$mol_dev_format_body' )
	
	function $mol_dev_format_button( label: any, click: ()=> any ) {
		return $mol_dev_format_auto( {
			[ $mol_dev_format_head ]() {
				return $mol_dev_format_span( { color: 'cornflowerblue' }, label )
			},
			[ $mol_dev_format_body ]() {
				Promise.resolve().then( click )
				return $mol_dev_format_span({})
			}
		} )
	}

	$mol_dev_format_register({

		header : ( val : any , config = false ) => {
			
			if( config ) return null

			if( !val ) return null
			
			if( $mol_dev_format_head in val ) {
				try {
					return val[ $mol_dev_format_head ]()
				} catch( error ) {
					return $mol_dev_format_accent( $mol_dev_format_native( val ), '💨', $mol_dev_format_native( error ), '' )
				}
			}
			
			if( typeof val === 'function' ) {
				return $mol_dev_format_native( val )
			}
			
			if( Error.isError( val ) ) {
				
				return $mol_dev_format_span( {},
					$mol_dev_format_native( val ),
					' ',
					$mol_dev_format_button( 'throw', ()=> $mol_fail_hidden( val ) ),
				)
				
			}
			
			if( val instanceof Promise ) {
				return $mol_dev_format_shade(
					$mol_dev_format_native( val ),
					' ',
					val[ Symbol.toStringTag ] ?? '',
				)
			}
			
			if( Symbol.toStringTag in val ) {
				return $mol_dev_format_native( val )
			}
			
			return null
			
		} ,
		
		hasBody : ( val: any , config = false )=> {
			
			if( config ) return false
			if( !val ) return false
			
			// if( Error.isError( val ) ) true
			if( val[ $mol_dev_format_body ] ) return true
			
			return false
		},

		body :  ( val: any , config = false )=> {
			
			if( config ) return null

			if( !val ) return null
			
			if( $mol_dev_format_body in val ) {
				try {
					return val[ $mol_dev_format_body ]()
				} catch( error ) {
					return $mol_dev_format_accent( $mol_dev_format_native( val ), '💨', $mol_dev_format_native( error ), '' )
				}
			}
			
			// if( Error.isError( val ) ) {
			// 	return $mol_dev_format_native( val )
			// }
			
			return null
		},

	})

	export function $mol_dev_format_native( obj : any ) {
		
		if( typeof obj === 'undefined' ) return $mol_dev_format_shade( 'undefined' )
		
		// if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj

		return [
			'object' ,
			{
				object : obj ,
				config : true ,
			} ,
		]

	}

	export function $mol_dev_format_auto( obj : any ) {
		
		if( obj == null ) return $mol_dev_format_shade( String( obj ) )

		return [
			'object' ,
			{
				object : obj ,
				config : false ,
			} ,
		]

	}

	export function $mol_dev_format_element( element : string , style : object , ...content : any[] ) {
			
		const styles = [] as string[]
		
		for( let key in style ) styles.push( `${ key } : ${ (style as any)[key] }` )
		
		return [
			element ,
			{
				style : styles.join( ' ; ' ) ,
			} ,
			... content ,
		]

	}

	export function $mol_dev_format_span( style : object , ...content : any[] ) {
		return $mol_dev_format_element(
			'span' ,
			{
				// 'vertical-align' : '8%',
				... style ,
			} ,
			... content ,
		)
	}

	export let $mol_dev_format_div = $mol_dev_format_element.bind( null , 'div' )
	export let $mol_dev_format_ol = $mol_dev_format_element.bind( null , 'ol' )
	export let $mol_dev_format_li = $mol_dev_format_element.bind( null , 'li' )
	export let $mol_dev_format_table = $mol_dev_format_element.bind( null , 'table' )
	export let $mol_dev_format_tr = $mol_dev_format_element.bind( null , 'tr' )
	export let $mol_dev_format_td = $mol_dev_format_element.bind( null , 'td' )

	export let $mol_dev_format_accent = $mol_dev_format_span.bind( null , {
		'color' : 'magenta' ,
	} )

	export let $mol_dev_format_strong = $mol_dev_format_span.bind( null , {
		'font-weight' : 'bold' ,
	} )

	export let $mol_dev_format_string = $mol_dev_format_span.bind( null , {
		'color' : 'green',
	} )

	export let $mol_dev_format_shade = $mol_dev_format_span.bind( null , {
		'color' : 'gray',
	} )

	export let $mol_dev_format_indent = $mol_dev_format_div.bind( null , {
		'margin-left': '13px'
	} )
	
	class Stack extends Array< Call > {
		
		// [ Symbol.toPrimitive ]() {
		// 	return this.toString()
		// }
		
		toString() {
			return this.join( '\n' )
		}
		
	}
	
	class Call extends Object {
		
		readonly type: string
		readonly function: string
		readonly method: string
		readonly eval: string
		readonly source: string
		readonly offset: number
		readonly pos: [ number, number ]
		readonly object: unknown
		readonly flags: readonly string[]
		[ Symbol.toStringTag ]!: string
		
		constructor( call: NodeJS.CallSite ) {
			super()
			
			this.type = call.getTypeName() ?? ''
			this.function = call.getFunctionName() ?? ''
			this.method = call.getMethodName() ?? ''
			if( this.method === this.function ) this.method = ''
			// const func = c.getFunction()
			this.pos = [ call.getEnclosingLineNumber(), call.getEnclosingColumnNumber() ]
			this.eval = call.getEvalOrigin() ?? ''
			this.source = call.getScriptNameOrSourceURL()
			this.object = call.getThis()
			this.offset = call.getPosition()
			
			const flags = []
			if( call.isAsync() ) flags.push( 'async' )
			if( call.isConstructor() ) flags.push( 'constructor' )
			if( call.isEval() ) flags.push( 'eval' )
			if( call.isNative() ) flags.push( 'native' )
			if( call.isPromiseAll() ) flags.push( 'PromiseAll' )
			if( call.isToplevel() ) flags.push( 'top' )
			this.flags = flags
		
			const type = this.type ? this.type + '.' : ''
			const func = this.function || '<anon>'
			const method = this.method ? ' [' + this.method + '] ' : ''
			
			this[ Symbol.toStringTag ] = `${type}${func}${method}`
		}
		
		[ Symbol.toPrimitive ]() {
			return this.toString()
		}
		
		toString() {
			const object = this.object || ''
			const label = this[ Symbol.toStringTag ]
			const source = `${ this.source }:${ this.pos.join( ':' ) } #${ this.offset }`
			return `\tat ${object}${label} (${source})`
		}

		[ $mol_dev_format_head ]() {
			return $mol_dev_format_div( {},
				$mol_dev_format_native( this ),
				$mol_dev_format_shade( ' ' ),
				... this.object ? [
					$mol_dev_format_native( this.object ),
				] : [],
				... this.method ? [ $mol_dev_format_shade( ' ',
					' [',
					this.method,
					']',
				) ] : [],
				$mol_dev_format_shade( ' ', this.flags.join( ', ' ) ),
			)
		}

	}
	
	Error.prepareStackTrace ??= ( error: Error, stack: NodeJS.CallSite[] )=> new Stack( ... stack.map( call => new Call( call ) ) )

}
