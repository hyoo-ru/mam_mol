declare namespace JSX {

	export interface Element extends HTMLElement {}
	
	export interface ElementClass {
		attributes : {}
		ownerDocument : Pick< Document , 'getElementById' | 'createElement' >
		childNodes : Array< Node | string >
		valueOf() : Element
	}
	
	/** Props for html elements */
	export type IntrinsicElements = {
		[ key in keyof HTMLElementTagNameMap ]? : $.$mol_type_partial_deep< HTMLElementTagNameMap[ key ] >
	}
	
	/** Additional undeclared props */
	export interface IntrinsicAttributes {
		id? : string
	}
	
	export interface ElementAttributesProperty {
		attributes : {
		}
	}
	
	// export type IntrinsicClassAttributes< Class > = $.$mol_type_partial_deep< Omit< Class , 'valueOf' > >
	
	interface ElementChildrenAttribute {
	}

}
