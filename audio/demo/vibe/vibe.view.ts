namespace $.$$ {
	export class $mol_audio_demo_vibe extends $.$mol_audio_demo_vibe {
		
		@ $mol_mem
		override shape( next?: $mol_audio_vibe_shape ): $mol_audio_vibe_shape {
			return next !== undefined ? next : 'sine' 
		}
		
	}
}
