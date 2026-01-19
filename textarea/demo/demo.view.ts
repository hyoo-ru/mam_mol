namespace $.$$ {
	export class $mol_textarea_demo extends $.$mol_textarea_demo {
		
		@ $mol_mem
		symbols_hint() {
			
			const field = this.Filled_descr()
			const row = ( prefix: string, name: string, value: string ) =>
				`! ;;${prefix} + ${name};;\n  ! ${value}\n    ! ;;${ value.codePointAt(0)?.toString(16).toUpperCase().padStart(4,'0') };;`
			
			let rows = [
				... Object.entries( field.symbols_alt() ).map( ([ name, val ])=> row( 'Alt', name, val ) ),
				'\n',
				... Object.entries( field.symbols_alt_shift() ).map( ([ name, val ])=> row( 'Alt + Shift', name, val ) ),
				'\n',
				... Object.entries( field.symbols_alt_ctrl() ).map( ([ name, val ])=> row( 'Alt + Ctrl', name, val ) ),
			]
			
			return rows.join( '\n' )
			
		}
		
		filled_descr( next?: string ) {
			return this.$.$mol_state_session.value( `${this}.filled_descr()`, next ) ?? super.filled_descr()
		}
		
	}
}
