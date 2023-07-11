namespace $.$$ {

	/**
	 * Dumps any JS values.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_dump_demo
	 */
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
				const args = source.match( /^[^{=>]*?\(([\s\S]*?)\)/ )?.[1] ?? source.match( /^([$\w]+)\s+=>/ )?.[1] ?? ''
				if( name ) return name + '(' + args + ')'
			}
			
			if( value instanceof RegExp ) return String( value )
			if( value instanceof Date ) return value.toISOString()
			
			const kind = Reflect.getOwnPropertyDescriptor( value, Symbol.toStringTag )?.value
				?? value.constructor.name
				?? 'Object'
			
			if( value instanceof Node ) {
				try {
					switch( value.nodeType ) {
						case value.TEXT_NODE: return kind + ' ' + value.nodeValue?.trim()
						case value.ELEMENT_NODE: return `<${ ( value as Element ).localName }> ${ ( value as Element ).id }`
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
					res.push([ key, '▶', val ])
				}
			}
			
			if( value instanceof Set ) {
				for( const val of value ) {
					res.push([ val ])
				}
			}
			
			if( value instanceof Function ) {
				let source = Function.prototype.toString.call( value )
					.replace( /^.*?\{\r?\n?/, '' )
					.replace( /}$/, '' )
					.trimEnd()
				const indent = source.match( /^\s*/ )![0]
				source = source.replace( new RegExp( `^${indent}`, 'gm' ), '\t' )
				res.push([ source ])
			}
			
			if( value instanceof Element ) {
				try {
					for( const kid of value.childNodes ) {
						res.push([ kid ])
					}
					for( const attr of value.attributes ) {
						if( attr.nodeName === 'id' ) continue
						res.push([ attr.nodeName, '=', attr.nodeValue ])
					}
				} catch {}
			}
			
			if( value && ( typeof value === 'object' || typeof value === 'function' ) ) {
				
				for( const key of Reflect.ownKeys( value ) ) {
					const prefix = String( key ) + '∶'
					const descr = Reflect.getOwnPropertyDescriptor( value, key )!
					if( 'value' in descr ) {
						const line = [ prefix, descr.value ] as any[]
						// let proto = descr.value
						// while( proto && typeof proto === 'object' ) {
						// 	proto = Reflect.getPrototypeOf( proto )
						// 	if( proto ) line.push( ' - ', proto )
						// }
						res.push( line )
					} else {
						res.push([ prefix, descr.get, descr.set ])
					}
				}
				
				if( this.prototypes() ) {
					res.push([ '__proto__:', Reflect.getPrototypeOf( value ) ])
				}
				
			}
			
			return res
		}
		
		@ $mol_mem
		preview_dom() {
			
			const value = this.value()
			
			if( value instanceof Element ) {
				if( $mol_try( ()=> value.localName ) instanceof Error ) return null
				if( value.isConnected ) return null
				return value
			}
			
			return null
		}
		
		@ $mol_mem
		expand_content() {
			return [
				... this.preview_show() && this.preview_dom() ? [ this.Preview() ] : [],
				... this.rows_values().map( (_,index)=> this.Row( index ) ),
			]
		}
		
		expandable() {
			return this.expand_content().length > 0
		}
		
		row_values( index: number ) {
			return this.rows_values()[ index ]
		}
		
		expand_all( event?: Event, blacklist = new Set ) {
			
			if( blacklist.has( this.value() ) ) return
			blacklist.add( this.value() )
			
			this.expanded( true )
			for( const row of this.expand_content() ) {
				if(!( row instanceof $mol_dump_list )) continue
				if( row.values()[0] === '__proto__:' ) continue
				row.expand_all( event, blacklist )
			}
			
		}

	}
}
