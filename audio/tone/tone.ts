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

	export type $mol_audio_tone_key = keyof typeof $mol_audio_tone_indices

	export type $mol_audio_tone_note = {
		key: $mol_audio_tone_key | null
		octave?: number | null // absolute octave 0-8
		duration?: number | null // note duration
	}

	export const $mol_audio_tone_base_freq = 440

	export function $mol_audio_tone_key_freq(name: $mol_audio_tone_key, octave?: number | null) {
		const index = $mol_audio_tone_indices[name] + 12 * ( octave ?? 4 )

		// @see https://en.wikipedia.org/wiki/Piano_key_frequencies
		return $mol_audio_tone_base_freq * (2 ** ((index - 49) / 12))
	}

	/**
	 * @param raw string https://wiki.ccarh.org/wiki/Guido_Music_Notation
	 * 
	 * Accidentals: only one # allowed: e5#
	 * No Augmentation dots.
	 */
	export function $mol_audio_tone_parse(raw: string): $mol_audio_tone_note {
		const [, key, octave_str, duration_str ] = raw.match(/((?:[a-g]#?)|_)(-?[0-4])?(?:\/(\d+))?/) ?? []

		if (! key ) throw new $mol_error_mix('Not a note', { note: raw })

		const octave = octave_str ? ( 3 + Number(octave_str) ) : null
		const duration = Number(duration_str || 1)

		return {
			key: key.startsWith('_') ? null : key as $mol_audio_tone_key,
			octave,
			duration
		}
	}

}
