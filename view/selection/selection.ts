class $mol_view_selection extends $mol_model {

	@ $mol_prop()
	static focusedId( ...diff : string[] ) {
		return this.local( 'focusedId()' , diff[0] )
	}

	@ $mol_prop()
	static focusedEl( ...diff : HTMLElement[] ) {
		var next = diff[0]
		
		if( next === void 0 ) {
			var id = this.focusedId()
			if( !id ) return null

			var next = document.getElementById( id )
			if( !next ) return null

			// next.focus()
		} else {
			if( next ) {
				if( next.id ) this.focusedId( next.id )
			} else {
				var prev = this.focusedEl()
				if( prev ) prev.blur()
			}
		}
		
		return next
	}

	@ $mol_prop()
	static position( ...diff : { id : string , start : number , end : number }[] ) {
		var pos = this.local( 'position()' , ...diff ) || { id : null , start : 0 , end : 0 }
		
		if( !pos.id ) return pos
		
		var start = pos.start
		var end = pos.end
		if(!( start <= end )) throw new Error( `Wrong offsets (${start},${end})` )
		
		var root = document.getElementById( pos.id )
		if( !root ) return { id : null , start : 0 , end : 0 }
		
		root.focus()
		
		var range = new Range 
		
		var cur = root.firstChild
		while( cur ) {
			while( cur.firstChild ) cur = cur.firstChild
			if( cur.nodeValue ) {
				var length = cur.nodeValue.length
				if( length >= start )  break
				start -= length
			}
			while( !cur.nextSibling ) {
				cur = cur.parentNode
				if( cur === root ) {
					start = root.childNodes.length
					break
				}
			}
			cur = cur.nextSibling
		}
		
		if( cur ) range.setStart( cur , start )
		else range.setStart( root , root.childNodes.length )
		
		var cur = root.firstChild
		while( cur ) {
			while( cur.firstChild ) cur = cur.firstChild
			if( cur.nodeValue ) {
				var length = cur.nodeValue.length
				if( length >= end )  break
				end -= length
			}
			while( !cur.nextSibling ) {
				cur = cur.parentNode
				if( cur === root ) {
					end = root.childNodes.length
					break
				}
			}
			cur = cur.nextSibling
		}
		
		if( cur ) range.setEnd( cur , end )
		else range.setEnd( root , root.childNodes.length )
    
		var sel = document.getSelection()
		sel.removeAllRanges()
		sel.addRange( range )
		
		return pos
	} 
	
}

function $mol_view_selection_save() {
	var sel = document.getSelection()
	if( sel.rangeCount === 0 ) return null
	var range = sel.getRangeAt( 0 )

	var el = <Element> range.commonAncestorContainer
	while( !el.id ) el = el.parentElement

	var meter = new Range
	meter.selectNodeContents( el )

	meter.setEnd( range.startContainer , range.startOffset )
	var startOffset = meter.toString().length

	meter.setEnd( range.endContainer , range.endOffset )
	var endOffset = meter.toString().length

	var next = { id : el.id , start : startOffset , end : endOffset }
	var prev = $mol_view_selection.position()

	if( JSON.stringify( prev ) !== JSON.stringify( next ) ) {
		$mol_view_selection.position(next)
	}
}

document.addEventListener( 'selectionchange' , event => {
	$mol_view_selection_save()
} )

document.addEventListener( 'focusin' , event => {
	$mol_view_selection.focusedEl( event.target as HTMLElement )
} )

document.addEventListener( 'focusout' , event => {
	$mol_view_selection.focusedEl( null )
} )
