declare namespace $ {

	type $mol_audio_vibe__freq__1MOLTHRU = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_vibe__freq__SFHUONV5 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_button_minor__click__5F6YP7R6 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__UCPFHIE5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__WW3VNVLH = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__W4YABK3T = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_room__duration__DO12P5HJ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__AUCCQD7Z = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__duration__TLWN2C9C = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__Z9GI2YZW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo extends $mol_example_small {
		beep_play( ): ReturnType< ReturnType< $mol_audio_demo['Beep'] >['play'] >
		Beep_vibe( ): $mol_audio_vibe
		noise_play( ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['play'] >
		noise_freq( ): number
		Noise_vibe( ): $mol_audio_vibe
		Beep_play( ): $mol_button_minor
		Noise_play( ): $mol_button_minor
		title( ): string
		Beep( ): $mol_audio_room
		Noise( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map