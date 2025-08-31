namespace $.$$ {
	
	export class $mol_status extends $.$mol_status {
		
		message() {
			try {
				return this.status() ?? null
			} catch( error: any ) {
				if( error instanceof Promise ) $mol_fail_hidden( error )
				$mol_fail_log( error )
				return error.message
			}
		}
		
	}
	
}
