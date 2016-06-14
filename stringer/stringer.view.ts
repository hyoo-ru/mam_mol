module $.$mol {
	export class $mol_stringer extends $.$mol_stringer {
		
		@ $mol_prop()
		valueChanged( ...diff : string[] ) {
			return this.focused() ? void 0 : this.value()
		}
		
		@ $mol_prop()
		content( ...diff : Node[] ) {
			var html = '<body>' + this.value().replace( /(a)/g , '<b>$1</b>' ) + '</body>'
			var parser = new DOMParser
			var body = parser.parseFromString( html , 'text/html' ).body
			var frag = document.createDocumentFragment()
			var list = []
			while( body.firstChild ) {
				list.push( body.firstChild )
				frag.appendChild( body.firstChild )
			} 
			return list
		}
		
		changes( ...diff : Event[] ) {
			this.value( ( diff[0].target as HTMLElement ).textContent.trim() )
		}
		
	}
}
