namespace $ {
	
	export type $mol_notify_info = {
		context: string,
		message: string,
		uri: string
	}

	export class $mol_notify extends $mol_object {
		
		@ $mol_mem
		static allowed( next?: boolean ) {
			return false
		}
		
		static show( info: $mol_notify_info ) {
			this.$.$mol_service.send(info)
		}
		
	}

	$mol_service.attach($mol_notify_service)
	
}
