namespace $ {
	export const $mol_audio_tone_indices = {
		ab: 0,
		a: 1,
		bb: 2,
		b: 3,
		c: 4,
		db: 5,
		d: 6,
		eb: 7,
		e: 8,
		f: 9,
		gb: 10,
		g: 11,
	}

	export type $mol_audio_tone_name = keyof typeof $mol_audio_tone_indices | '_' | '-'

	export const $mol_audio_tone_base_freq = 440

	export function $mol_audio_tone_name_freq(name: $mol_audio_tone_name, octave?: number | null) {
		if (name === '-' || name === '_') return 0
		const index = $mol_audio_tone_indices[name] + 12 * ( octave ?? 4 )

		// @see https://en.wikipedia.org/wiki/Piano_key_frequencies
		return $mol_audio_tone_base_freq * (2 ** ((index - 49) / 12))
	}

	export function $mol_audio_tone_parse(note: string) {
		const [, name, octave_str, duration_str ] = note.match(/((?:[a-g]+b?)|-)([0-8])?(?:\/(\d+))?/) ?? []
		if (! name ) throw new $mol_error_mix('Not a note', { note })
		const octave = octave_str ? Number(octave_str) : null
		const divider = Number(duration_str || 1)

		const freq = $mol_audio_tone_name_freq(name as $mol_audio_tone_name, octave)

		return { freq, name: name as $mol_audio_tone_name, octave, divider }
	}

}
