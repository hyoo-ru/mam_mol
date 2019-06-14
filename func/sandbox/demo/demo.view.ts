namespace $.$$ {

	export class $mol_func_sandbox_demo extends $.$mol_func_sandbox_demo {

		script( next? : string ) {
			return this.$.$mol_state_arg.value( 'script' , next ) || ''
		}

		@ $mol_mem
		result( next? : string ) {
			this.script()
			return next || ''
		}

		run() {
			this.result( String( $mol_try( ()=> {
				const func = this.Sandbox().eval( this.script() )
				return func()
			} ) ) )
		}

		keydown( event : KeyboardEvent ) {
			
			if( event.ctrlKey && event.keyCode === $mol_keyboard_code.enter ) {
				this.run()
			}

		}

	}

}
