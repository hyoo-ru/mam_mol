declare namespace $ {

	type $mol_audio_room__duration__XJEC4A3X = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__P1DIG95L = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__duration__81VI74CI = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__R2F3LFJ9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_vibe__freq__QJFNU9RC = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_vibe__freq__8H7Z01NX = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_button_minor__click__RPGP9XQT = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__I5JS7EVZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__QPX223ZD = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__QU636EYR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	export class $mol_audio_demo extends $mol_example_small {
		title( ): string
		Beep( ): $mol_audio_room
		Noise( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
		beep_play( ): ReturnType< ReturnType< $mol_audio_demo['Beep'] >['play'] >
		Beep_vibe( ): $mol_audio_vibe
		noise_play( ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['play'] >
		noise_freq( ): number
		Noise_vibe( ): $mol_audio_vibe
		Beep_play( ): $mol_button_minor
		Noise_play( ): $mol_button_minor
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map