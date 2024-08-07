declare namespace $ {

	type $mol_audio_demo_beep_status__YB3D953A = $mol_type_enforce<
		Parameters< $mol_audio_demo['beep_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >[0]
	>
	type $mol_audio_melody__note_length__7E8CKYU8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__notes__LAYCXWCD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_demo_noise_status__O3KKRE0H = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >[0]
	>
	type $mol_audio_demo_noise_active__8T0B6KQ2 = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise'] >['active'] >[0]
	>
	type $mol_audio_demo_noise_stop_at__02AK9P0O = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default__7PSNVA7K = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_button_minor__click__Z7ADLAF6 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__1FXGV1NL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__4WUWVTY8 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__Z5WJ66SN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_minor__click__E6ATO1PX = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__RKE3OESL = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__YF7Q26PP = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__AGRB7Q63 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__H4RPWM84 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__21U7S3YZ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__input__VPAZZUWL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo extends $mol_example_small {
		beep_status( next?: ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >
		beep_play( ): ReturnType< ReturnType< $mol_audio_demo['Beep_track'] >['start'] >
		Beep_track( ): $mol_audio_melody
		noise_status( next?: ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >
		noise_active( next?: ReturnType< ReturnType< $mol_audio_demo['Noise'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['active'] >
		noise_stop_at( next?: ReturnType< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] >
		noise_freq( ): number
		Noise( ): $mol_audio_vibe
		beep_play_click( next?: any ): any
		Beep_play( ): $mol_button_minor
		Beep_status( ): $mol_audio_status
		Beep_row( ): $mol_row
		noise_play_click( next?: any ): any
		Noise_play( ): $mol_button_minor
		Noise_status( ): $mol_audio_status
		Nouse_row( ): $mol_row
		List( ): $mol_list
		title( ): string
		Beep_room( ): $mol_audio_room
		Noise_room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map