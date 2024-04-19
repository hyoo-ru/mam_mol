# $mol_audio_room

Main audio output, other nodes are room inputs. Room utilizes [AudioContext](https://developer.mozilla.org/ru/docs/Web/API/AudioContext) under hood. Many rooms connects to single AudioContext instance by default.

Browser can suspend AudioContext at any time. Use [$mol_audio_status](../status) to display and control room audio context state. Or pull room status from $mol_view.auto.

```
$my_beep_page $mol_page
	Beep_room $mol_audio_room
		suspend_time 100 - autosuspend time, if no active nodes in input. 0 - disables autosuspend.
		status? => beep_status?
	sub /
		<= Beep_status $mol_audio_status status? <=> beep_status?
```

## Separate context

Usable for multiple isolaited sound sources (ex. application notifications and music sequencer) to suspend one of them separately.

```
$my_beep_page $mol_page
	Beep_room $mol_audio_room
		status? => beep_status?
		context <= beep_context $mol_audio_context
	-
	Noise_room $mol_audio_room
		status? => noise_status?
		context <= noise_context $mol_audio_context
```
