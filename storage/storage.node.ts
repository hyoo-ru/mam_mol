namespace $ {
	export class $mol_storage extends $mol_object2 {
		
		@ $mol_mem
		static native() {
			return null
		}
		
		@ $mol_mem
		static persisted( next?: boolean ): boolean {
			return false
		}
		
		static estimate() {
			return 0
		}
		
		static dir() {
			return null as any as FileSystemDirectoryHandle
		}
		
	}
}
