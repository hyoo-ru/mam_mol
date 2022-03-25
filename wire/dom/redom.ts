interface Node {
	__defineGetter__: ( field: string, getter: ()=> any )=> void
}

namespace $ {
	
	export function lookup_descr<
		Obj extends { [ field in Field ]: any },
		Field extends PropertyKey
	>( obj: Obj, field: Field ): PropertyDescriptor | null {
		
		const descr = Reflect.getOwnPropertyDescriptor( obj, field )
		if( descr ) return descr
		
		const proto = Reflect.getPrototypeOf( obj )
		if( proto ) return lookup_descr( proto as Obj, field )
		
		return null
	}
	
	function reproperty< El extends Element >( el: El, field: string ) {
		
		const descr = lookup_descr( Reflect.getPrototypeOf( el )!, field )!
		let task = Reflect.getOwnPropertyDescriptor( el, field )?.get
		
		const atom = new $mol_wire_fiber< typeof el, [] | [ string ], string >(
			el.id + '.' + field,
			function( this: typeof el, next?: any ) {
				
				let res = task?.() ?? next
				if( res === undefined ) return descr.get!.call( this )
				
				descr.set!.call( this, res )
				return res
				
			},
			el,
		)
		
		Object.defineProperty( el, field, {
			configurable: true,
			get: ()=> atom.sync(),
			set: next => {
				if( typeof next === 'function' ) {
					task = next
					atom.absorb()
					atom.refresh()
				} else {
					if( atom.cache === next ) return
					atom.recall( next )
				}
			},
		} )
		
		if( task ) atom.refresh()
		
		return ()=> atom.absorb()
	}
	
	function rekids< El extends Element >( el: El ) {
		
		const kids = el.childNodes
		let task = ( next: any )=> next
		
		const atom = new $mol_wire_fiber< typeof el, [] | [ ArrayLike<ChildNode> ], NodeListOf<ChildNode> >(
			el.id + '.childNodes',
			function( this: typeof el, next?: any ) {
				
				const res = task( next ) as ChildNode[]
				if( res === undefined ) return kids
				
				for( const kid of res ) if( kid instanceof Element ) $mol_wire_dom( kid )
				$mol_dom_render_children( this, res )
				
				return kids
				
			},
			el,
		)
		
		Object.defineProperty( el, 'childNodes', {
			configurable: true,
			get: ()=> atom.sync(),
			set: next => {
				if( typeof next === 'function' ) {
					task = next
					atom.absorb()
					atom.refresh()
				} else {
					atom.recall( next )
				}
			},
		} )
		
		el.addEventListener( 'DOMSubtreeModified', ()=> atom.absorb() )
		
		return ()=> atom.absorb()
	}
	
	function redefine( this: Element, field: string, getter: ()=> any ) {
		$mol_wire_dom( this )[ field ] = getter
	}
	
	export function $mol_wire_dom< El extends Element >( el: El ) {
		
		if( el.__defineGetter__ === redefine ) return el
		
		for( const kid of el.children ) $mol_wire_dom( kid )
		
		if( el instanceof HTMLInputElement ) el.addEventListener( 'input', reproperty( el, 'value' ) )
		if( el instanceof HTMLInputElement ) el.addEventListener( 'change', reproperty( el, 'checked' ) )
		if( el instanceof HTMLElement ) el.addEventListener( 'DOMSubtreeModified', reproperty( el, 'innerText' ) )
		if( el instanceof HTMLElement ) el.addEventListener( 'DOMSubtreeModified', reproperty( el, 'innerHTML' ) )
		if( el instanceof HTMLElement ) el.addEventListener( 'DOMSubtreeModified', reproperty( el, 'outerHTML' ) )
		
		el.addEventListener( 'DOMSubtreeModified', reproperty( el, 'textContent' ) )
		el.addEventListener( 'DOMSubtreeModified', rekids( el ) )
		
		el.__defineGetter__ = redefine
		
		return el
	}
	
}
