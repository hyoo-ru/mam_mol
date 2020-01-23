namespace $.$$ {
	
	export class $mol_status extends $.$mol_status {
		
		message() {
			try {
				let status = this.status()
				if( status ) status.valueOf()
				return null
			} catch( error ) {
				if( error instanceof Promise ) $mol_fail_hidden( error )
				return error.message
			}
		}
		
	}
	
}
