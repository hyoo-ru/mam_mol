declare namespace JSX {

	type DeepPartial< Val > = {
		[ field in keyof Val ]? : DeepPartial< Val[ field ] >
	}
	
	export interface Element extends HTMLElement {}
	
	export interface ElementClass {
		attributes : {}
		ownerDocument : Pick< Document , 'getElementById' | 'createElement' >
		childNodes : Array< Node | string >
		valueOf() : Element
	}
	
	/** Props for html elements */
	export type IntrinsicElements = {
		[ key in keyof HTMLElementTagNameMap ]? : DeepPartial< HTMLElementTagNameMap[ key ] >
	}
	
	/** Additional undeclared props */
	export interface IntrinsicAttributes {
		id? : string
	}
	
	export interface ElementAttributesProperty {
		attributes : {
		}
	}
	
	// export type IntrinsicClassAttributes< Class > = DeepPartial< Omit< Class , 'valueOf' > >
	
	interface ElementChildrenAttribute {
	}

}
