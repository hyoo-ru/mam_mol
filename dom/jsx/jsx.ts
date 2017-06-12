namespace JSX {
	export interface Element extends HTMLElement {}
	export interface ElementClass extends HTMLElement {}
	export interface IntrinsicElements {
		a : any
		abbr : any
		address : any
		area : any
		article : any
		aside : any
		audio : any
		b : any
		base : any
		bdi : any
		bdo : any
		big : any
		blockquote : any
		body : any
		br : any
		button : any
		canvas : any
		caption : any
		cite : any
		code : any
		col : any
		colgroup : any
		data : any
		datalist : any
		dd : any
		del : any
		details : any
		dfn : any
		dialog : any
		div : any
		dl : any
		dt : any
		em : any
		embed : any
		fieldset : any
		figcaption : any
		figure : any
		footer : any
		form : any
		h1 : any
		h2 : any
		h3 : any
		h4 : any
		h5 : any
		h6 : any
		head : any
		header : any
		hgroup : any
		hr : any
		html : any
		i : any
		iframe : any
		img : any
		input : any
		ins : any
		kbd : any
		keygen : any
		label : any
		legend : any
		li : any
		link : any
		main : any
		map : any
		mark : any
		menu : any
		menuitem : any
		meta : any
		meter : any
		nav : any
		noindex : any
		noscript : any
		object : any
		ol : any
		optgroup : any
		option : any
		output : any
		p : any
		param : any
		picture : any
		pre : any
		progress : any
		q : any
		rp : any
		rt : any
		ruby : any
		s : any
		samp : any
		script : any
		section : any
		select : any
		small : any
		source : any
		span : any
		strong : any
		style : any
		sub : any
		summary : any
		sup : any
		table : any
		tbody : any
		td : any
		textarea : any
		tfoot : any
		th : any
		thead : any
		time : any
		title : any
		tr : any
		track : any
		u : any
		ul : any
		var : any
		video : any
		wbr : any
	}
}

namespace $ {
	
	export function $mol_dom_jsx(
		localName : string ,
		props : { [ key : string ] : any } ,
		...children : Array< Node | string >
	) {
		const node = $mol_dom_make( props && props.id , localName )
		
		$mol_dom_render_children( node , [].concat.apply( [] , children ) )
		$mol_dom_render_fields( node , props )
		
		return node
	}
	
}
