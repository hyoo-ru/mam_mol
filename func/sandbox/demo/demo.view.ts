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
			document.cookie = 'password=P@zzW0rd'
			this.result( String( $mol_try( ()=> {
				const func = this.Sandbox().eval( this.script() )
				return func()
			} ) ) )
		}

		snippets() {
			return this.snippet_codes().map( ( code , index )=> this.Snippet( index ) )
		}

		snippet_code( index : number ) {
			return this.snippet_codes()[ index ]
		}

	}

	export class $mol_func_sandbox_demo_snippet extends $.$mol_func_sandbox_demo_snippet {

		text() {
			return '```\n' + this.code() + '\n```'
		}

	}

}
