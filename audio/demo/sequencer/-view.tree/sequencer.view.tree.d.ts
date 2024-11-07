declare namespace $ {

	type $mol_audio_demo_sequencer_room_status__XGXL9LSV = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_sequencer_room_active__WRSZIZWJ = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] >[0]
	>
	type $mol_audio_demo_sequencer_beep_track_active__O921PEYI = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['beep_track_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] >[0]
	>
	type $mol_audio_melody__notes__CB6HF96P = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_melody__note_length__VVRLCBZJ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__note_off_part__0IAY3JFL = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_audio_melody['note_off_part'] >
	>
	type $mol_number__precision__KP8W8KE2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__ERYOS4MV = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__MY1IX38B = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__SYH1THYR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__DNH20HJR = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_length'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_number__precision__EQCYSNEZ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__9XP1PS3E = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__BUB88X5B = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__YQ0G5NQU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__D70JQQAJ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_off_part'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_row__sub__AMRWADU7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_textarea__hint__NGTHFME5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__KRXLRVWI = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name__ZF6544JI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__YTCULBKV = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Notes'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__hint__VGFKVHG6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon__W2D5BSZA = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Beep_active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__G146N882 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_button_minor__click__8F2I7JNL = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_start'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__PN9QOZFT = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__7150KJG6 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__9L03NFEY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__IP48AYVM = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__MFKC452P = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo_sequencer extends $mol_example_small {
		room_status( next?: ReturnType< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] >
		room_active( next?: ReturnType< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] >
		beep_track_start( ): ReturnType< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['start'] >
		beep_track_active( next?: ReturnType< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] >
		notes( next?: string ): string
		note_length( next?: number ): number
		note_off_part( next?: number ): number
		Beep_track( ): $mol_audio_melody
		Note_length( ): $mol_number
		Note_length_field( ): $mol_form_field
		Note_off_part( ): $mol_number
		Note_off_part_field( ): $mol_form_field
		Note_settings( ): $mol_row
		Notes( ): $mol_textarea
		Notes_field( ): $mol_form_field
		Beep_active_icon( ): $mol_icon_play_pause
		Beep_active( ): $mol_check_icon
		Beep_play( ): $mol_button_minor
		Beep_status( ): $mol_audio_status
		Beep_row( ): $mol_row
		List( ): $mol_list
		title( ): string
		Room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=sequencer.view.tree.d.ts.map