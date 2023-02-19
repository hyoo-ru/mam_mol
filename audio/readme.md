# $mol_audio

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_audio_demo_vibe)

## Usage example

```
$my_beep_page $mol_page
	Beep $mol_audio_room
		play => beep_play
		duration 100
		input /
			<= Beep_vibe $mol_audio_vibe
				freq 440
				shape \sine
	sub /
		<= Beep_play $mol_button_minor
			click <= beep_play
			title \Beep
```
