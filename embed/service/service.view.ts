namespace $.$$ {
	export class $mol_embed_service extends $.$mol_embed_service {
		
		@ $mol_mem
		sub() {
			return this.active()
				? [ this.Frame() ]
				: [ this.Image(), this.Hint() ]
		}
		
	}
}
