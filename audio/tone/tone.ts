namespace $ {
	export const $mol_audio_tone_indices = {
		'b#': 0,
		a: 1,
		'a#': 2,
		b: 3,
		c: 4,
		'c#': 5,
		d: 6,
		'd#': 7,
		e: 8,
		f: 9,
		'f#': 10,
		g: 11,
	}

	export type $mol_audio_tone_name = keyof typeof $mol_audio_tone_indices | '_'

	export const $mol_audio_tone_base_freq = 440

	export function $mol_audio_tone_name_freq(name: $mol_audio_tone_name, octave?: number | null) {
		if (name === '_') return 0
		const index = $mol_audio_tone_indices[name] + 12 * ( octave ?? 4 )

		// @see https://en.wikipedia.org/wiki/Piano_key_frequencies
		return $mol_audio_tone_base_freq * (2 ** ((index - 49) / 12))
	}

	/**
	 * @param note string https://wiki.ccarh.org/wiki/Guido_Music_Notation
	 * 
	 * Accidentals: only one # allowed: e5#
	 * No Augmentation dots.
	 */
	export function $mol_audio_tone_parse(note: string) {
		const [, name, octave_str, duration_str ] = note.match(/((?:[a-g]#?)|_)([0-8])?(?:\/(\d+))?/) ?? []
		if (! name ) throw new $mol_error_mix('Not a note', { note })
		const octave = octave_str ? Number(octave_str) : null
		const divider = Number(duration_str || 1)

		const freq = $mol_audio_tone_name_freq(name as $mol_audio_tone_name, octave)

		return { freq, name: name as $mol_audio_tone_name, octave, divider }
	}

}
