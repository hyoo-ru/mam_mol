namespace $.$$ {
	export class $mol_audio_demo_sequencer extends $.$mol_audio_demo_sequencer {
		@ $mol_mem
		override shape( next?: $mol_audio_vibe_shape ): $mol_audio_vibe_shape {
			return next !== undefined ? next : 'sine' 
		}
	}
}
