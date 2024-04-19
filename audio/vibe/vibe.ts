namespace $ {

	export type $mol_audio_vibe_shape = OscillatorType

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo_vibe
	 */
	export class $mol_audio_vibe extends $mol_audio_instrument {
		
		@ $mol_mem
		override node(reset?: null) {
			return this.context().native().createOscillator()
		}

		freq_default() { return 440 }

		@ $mol_mem
		freq( next?: number | null) {
			const note = this.note()

			if (! next) {
				if (! note) next = this.freq_default()
				else if (note.key === null) next = 0
				else next = $mol_audio_tone_key_freq(note.key, note.octave)
			}

			this.node().frequency.setValueAtTime(next, this.time_cut())

			return next
		}
		
		shape_default() { return 'sine' as $mol_audio_vibe_shape }

		@ $mol_mem
		shape( next?: $mol_audio_vibe_shape | null ) {
			return this.node().type = next ?? this.shape_default()
		}

		@ $mol_mem
		override output() {
			this.freq()
			this.shape()

			return super.output()
		}

	}
}
