declare namespace $ {

	type $mol_audio_vibe__freq__0BBH3BI8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_vibe__freq__3LMBIGCE = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_button_minor__click__YMPAXD76 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__JBVRO63E = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click__06U4W51B = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__UK9NCU8L = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_room__duration__MGXFHN1O = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__BT60HU45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__duration__OGOZ0EP8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_room['duration'] >
	>
	type $mol_audio_room__input__9JR4802D = $mol_type_enforce<
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