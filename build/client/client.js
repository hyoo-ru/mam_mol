// @ts-check

class $mol_build_client {
	static closed = false
	static run() {
		const origin = document.location.origin.replace( /^http/ , 'ws' )
		const path = document.location.pathname
		const uri = origin + path

		const socket = new WebSocket( uri )
		
		socket.onclose = ()=> {
			this.closed = true
			setTimeout( ()=> $mol_build_client.run() , 1000 )
		}

		socket.onopen = () => {
			if (this.closed) location.reload()
			this.closed = false
		}
		
		socket.onmessage = message => {
			if( message.data !== '$mol_build_obsolete' ) return
			location.reload()
		}

	}
}

$mol_build_client.run()

class $mol_build_edit {

	static active = false
	static box = null

	static run() {
		addEventListener( 'keydown', event => this.toggle( event.altKey && event.shiftKey ), true )
		addEventListener( 'keyup', event => this.toggle( event.altKey && event.shiftKey ), true )
		addEventListener( 'blur', ()=> this.toggle( false ) )
		addEventListener( 'mousemove', event => this.hover( event ), true )
		addEventListener( 'click', event => this.pick( event ), true )
	}

	static toggle( active ) {
		if( this.active === active ) return
		this.active = active
		if( !active ) this.frame( null )
	}

	static node( event ) {
		const target = event.target instanceof Element ? event.target : null
		return target?.closest( '[id^="$"]' ) ?? null
	}

	static frame( node ) {

		if( !this.box ) {
			this.box = document.createElement( 'div' )
			this.box.style.cssText = 'position: fixed; z-index: 2147483647; pointer-events: none; box-sizing: border-box; outline: 2px solid rgb(57, 115, 172); background: rgba(57, 115, 172, .1);'
			const label = document.createElement( 'div' )
			label.style.cssText = 'position: absolute; top: 100%; left: 0; padding: 0 .5em; background: rgb(57, 115, 172); color: white; font: 12px/1.5 monospace; white-space: nowrap;'
			this.box.append( label )
		}

		if( !node ) return this.box.remove()

		const rect = node.getBoundingClientRect()
		this.box.style.left = rect.left + 'px'
		this.box.style.top = rect.top + 'px'
		this.box.style.width = rect.width + 'px'
		this.box.style.height = rect.height + 'px'
		this.box.firstChild.textContent = node.id

		document.body.append( this.box )

	}

	static hover( event ) {
		if( !this.active ) return
		this.frame( this.node( event ) )
	}

	static pick( event ) {

		if( !this.active ) return

		const node = this.node( event )
		if( !node ) return

		event.preventDefault()
		event.stopPropagation()

		const place = this.place( node.id )
		if( !place ) return console.warn( 'Unknown view id', node.id )

		const url = '/-/edit?class=' + encodeURIComponent( place.name ) + '&prop=' + encodeURIComponent( place.prop )

		fetch( url ).then( async res => {
			const text = await res.text()
			if( res.ok ) console.log( 'Edit', text )
			else console.error( text )
		} )

	}

	static place( id ) {

		const found = id.match( /^(.*)\.(\w+)\([^()]*\)$/ )
		if( !found ) return null

		const [ , owner_path, prop ] = found
		if( !owner_path.includes( '.' ) ) return { name: owner_path, prop: '' }

		const owner = new Function( '$', 'return $.' + owner_path )( window.$ )

		let proto = Object.getPrototypeOf( owner )
		while( proto && !Object.prototype.hasOwnProperty.call( proto, prop ) ) proto = Object.getPrototypeOf( proto )

		return { name: String( ( proto ?? owner ).constructor ), prop }

	}

}

$mol_build_edit.run()

