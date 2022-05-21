namespace $.$$ {
	export class $mol_dump_value extends $.$mol_dump_value {
		
		@ $mol_mem
		sub() {
			const value = this.value()
			if( !value ) return [ this.Simple() ]
			if( typeof value === 'object' ) return [ this.Expand() ]
			if( typeof value === 'function' ) return [ this.Expand() ]
			return [ this.Simple() ]
		}
		
		@ $mol_mem
		simple() {
			const value = this.value()
			return value ? String( value ) : JSON.stringify( value ) ?? 'undefined'
		}
		
		@ $mol_mem
		expand_title() {
			
			const value = this.value()
			
			if( typeof value === 'function' ) {
				const name = Reflect.getOwnPropertyDescriptor( value, 'name' )?.value
				const source = Function.prototype.toString.call( value )
				const args = source.replace( /\)[\s\S]*$/g, ')' ).replace( /^[\s\S]*\(/g, '(' )
				if( name ) return name + args + '{}'
			}
			
			if( value instanceof RegExp ) return String( value )
			if( value instanceof Date ) return value.toISOString()
			
			const kind = Reflect.getOwnPropertyDescriptor( value, Symbol.toStringTag )?.value
				?? Reflect.getPrototypeOf( value )?.constructor.name
				?? 'Object'
			
			if( value instanceof Node ) {
				try {
					switch( value.nodeType ) {
						case value.TEXT_NODE: return kind + ' ' + value.nodeValue?.trim()
						case value.ELEMENT_NODE: return value.nodeName + ' ' + ( value as Element ).id
						case value.DOCUMENT_NODE: return kind + ' ' + value.baseURI
					}
				} catch {}
			}
			
			return kind
		}
		
		@ $mol_mem
		rows_values() {
			
			let value = this.value()
			
			const res = [] as any[][]
			
			if( value instanceof Map ) {
				for( const [ key, val ] of value ) {
					res.push([ key, '🡒', val ])
				}
			}
			
			if( value instanceof Set ) {
				for( const val of value ) {
					res.push([ val ])
				}
			}
			
			if( value instanceof Element ) {
				try {
					for( const kid of value.childNodes ) {
						res.push([ kid ])
					}
					for( const attr of value.attributes ) {
						res.push([ attr.nodeName, '=', attr.nodeValue ])
					}
				} catch {}
			}
			
			for( const key of Reflect.ownKeys( value ) ) {
				const prefix = String( key ) + '∶'
				const descr = Reflect.getOwnPropertyDescriptor( value, key )!
				if( 'value' in descr ) res.push([ prefix, descr.value ])
				else res.push([ prefix, descr.get, descr.set ])
			}
			
			res.push([ '__proto__:', Reflect.getPrototypeOf( value ) ])
			
			return res
		}
		
		@ $mol_mem
		expand_content() {
			return this.rows_values().map( (_,index)=> this.Row( index ) )
		}
		
		row_values( index: number ) {
			return this.rows_values()[ index ]
		}

	}
}
