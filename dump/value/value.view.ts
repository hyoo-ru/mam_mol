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
			
			return Reflect.getOwnPropertyDescriptor( value, Symbol.toStringTag )?.value
				?? Reflect.getPrototypeOf( value )?.constructor.name
				?? 'Object'
		}
		
		@ $mol_mem
		rows_values() {
			
			let value = this.value()
			
			const self = [] as any[][]
			for( const key of Reflect.ownKeys( value ) ) {
				const prefix = String( key ) + '∶'
				const descr = Reflect.getOwnPropertyDescriptor( value, key )!
				if( 'value' in descr ) self.push([ prefix, descr.value ])
				else self.push([ prefix, descr.get, descr.set ])
			}
			
			const map = value instanceof Map
				? [ ... value ].map( ([ key, val ])=> [ key, '🡒', val ] )
				: []
			
			const set = value instanceof Set
				? [ ... value ].map( val => [ val ] )
				: []
				
			const proto = Reflect.getPrototypeOf( value )
			
			return [
				... self,
				... map,
				... set,
				[ '__proto__:', proto ]
			]
			
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
