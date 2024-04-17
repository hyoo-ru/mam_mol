declare namespace $ {

	type $mol_audio_demo_beep_status__UUBS3PPO = $mol_type_enforce<
		Parameters< $mol_audio_demo['beep_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >[0]
	>
	type $mol_audio_melody__note_length__9O3S0055 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__notes__YYOPJDJN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_demo_noise_status__BIMXO7E9 = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >[0]
	>
	type $mol_audio_demo_note__JKPZC6VZ = $mol_type_enforce<
		Parameters< $mol_audio_demo['note'] >[0]
		,
		Parameters< $mol_audio_demo['Noise'] >[0]
	>
	type $mol_audio_vibe__freq__AFY4NABN = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq'] >
	>
	type $mol_audio_melody__note_length__UQ9YWC3N = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__notes__TMFHHE3V = $mol_type_enforce<
		string
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_melody__instrument__LA2TQ1C4 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['Noise'] >
		,
		ReturnType< $mol_audio_melody['instrument'] >
	>
	type $mol_button_minor__click__TK1WOAXS = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__BS63U6QI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__BZHVAON9 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__T3E6RFKY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_minor__click__4BDKMFQC = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__ROCOM1WK = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__FCQ3VL1S = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__F74QB8KJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__0RTTHB1S = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__UBNXGSFB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__input__3RPZY12O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo extends $mol_example_small {
		beep_status( next?: ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >
		beep_play( ): ReturnType< ReturnType< $mol_audio_demo['Beep_track'] >['start'] >
		Beep_track( ): $mol_audio_melody
		noise_status( next?: ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >
		noise_play( ): ReturnType< ReturnType< $mol_audio_demo['Noise_track'] >['start'] >
		note( id: any): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['note'] >
		noise_freq( id: any): number
		Noise( id: any): $mol_audio_vibe
		Noise_track( ): $mol_audio_melody
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