# $mol_audio

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_audio_demo_vibe)

## Basic concept

- **[$mol_audio_room](room)** - Main audio output, other nodes are room inputs

- **[$mol_audio_melody](melody)** - Sequencer for playing notes in subset of [GUIDO](https://wiki.ccarh.org/wiki/Guido_Music_Notation) music notation

- **[$mol_audio_sample](sample)** - Instrument for playing samples

- **[$mol_audio_vibe](vibe)** - Oscillator instrument for beeping and building synths

## Usage example

```
$my_beep_page $mol_page
	Beep_room $mol_audio_room
		status? => beep_status?
		input /
			<= Beep_track $mol_audio_melody
				start => beep_play
				note_length .5
				notes \e
	sub /
		<= Beep_play $mol_button_minor
			click? <=> beep_play_click? null
			title \Beep
		<= Beep_status $mol_audio_status status? <=> beep_status?
```

```ts
namespace $.$$ {
	export class $my_beep_page extends $.$my_beep_page {
		override beep_play_click(e: Event) { this.beep_play() }
	}
}
```
