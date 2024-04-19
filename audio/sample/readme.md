# $mol_audio_sample

Instrument for playing samples.

## Usage example

```
$my_sample $mol_view
	Room $mol_audio_room
		status? => room_status?
		input /
			<= Sample $mol_audio_sample
				active? => sample_active?
				start => start
				loop? => loop?
				loop_default true
				buffer <= sample_buffer null
	sub /
		<= Active $mol_check_icon
			checked? <=> sample_active? - pause/resume sample
			title \Active
			Icon <= Active_icon $mol_icon_play
		<= Start $mol_button_minor
			click? <=> start_click? null - restart sample
			title \Start
		<= Loop $mol_check_icon
			checked? <=> loop? - looping
			title \Loop
			Icon <= Loop_icon $mol_icon_loop
		<= Room_status $mol_audio_status
			status? <=> room_status?
```
