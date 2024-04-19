# $mol_audio_vibe

Oscillator node for beepeing or synth building.

Used in melody or standalone.

## Standalone usage example

```
$mol_audio_demo $mol_view
	Noise_room $mol_audio_room
		status? => noise_status?
		input /
			<= Noise $mol_audio_vibe
				active? => noise_active?
				stop_at? => noise_stop_at?
				freq_default <= noise_freq 0
	sub /
		<= Noise_play $mol_button_minor
			click? <=> noise_play_click? null
			title \Noise
		<= Noise_status $mol_audio_status status? <=> noise_status?
```

```ts
namespace $.$$ {
	export class $mol_audio_demo extends $.$mol_audio_demo {
		@ $mol_mem
		override noise_freq() {
			$mol_wire_watch()
			return Math.random() * 1000
		}

		override noise_play_click(e: Event) {
			this.noise_active(true)
			this.noise_stop_at(1) // shut up after 1 second
		}
		
	}
}

```
