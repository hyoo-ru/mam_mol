# $mol_audio

## [Online demo](https://mol.hyoo.ru/#!section=demos/readme/demo=mol_audio_demo_vibe)

## Usage example

```
$my_beep_page $mol_page
	Beep $mol_audio_room
		status? => beep_status?
		input /
			<= Beep_vibe $mol_audio_vibe
				reset => beep_play
				duration 100
				freq 440
				shape \sine
	sub /
		<= Beep_play $mol_button_minor
			click <= beep_play
			title \Beep
		<= Beep_status $mol_audio_status status? <=> beep_status?
```
