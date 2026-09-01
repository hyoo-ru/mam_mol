# $mol_audio_melody

Playing note sequence.

Notes in subset of [GUIDO](https://wiki.ccarh.org/wiki/Guido_Music_Notation) music notation.

- Note, common text notation: `c d e f`
- Octave. Octave is sticky, applied to the next notes. Octave number relative to 3. `c-1` is a real note `C2`. `c0` is a `C3`, `c1` is a `C4`. Initially octave is 1 (`C4`).
- Accidental. Only `#` allowed: `e#`
- Duration. Use slash: half note: `e/2`, quarter note: `e/4`
- Rest. Use underscore: `_`

Default instrument embeded into melody is a $mol_audio_vibe. Melody push to note, start_at, stop_at channels of instrument.

## Usage example

```
	Room $mol_audio_room
		status? => room_status?
		input /
			<= Beep_track $mol_audio_melody
				start => beep_track_start
				-
				note_length 1 - Default full note length in seconds
				note_off_part .4 - Silense at end of note in parts of note length
				-
				notes? <=> notes? \e e e _ e e e _ e g c d e _ _ _/2 f f f f f e e e e/2 e/2 d d e d _ g _
				instrument* <= Beep* $mol_audio_vibe
```
