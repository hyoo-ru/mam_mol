declare namespace $ {

	type $mol_audio_demo_sequencer_room_status__BRZHLH5O = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_sequencer_room_active__BSG1E3OY = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] >[0]
	>
	type $mol_audio_demo_sequencer_beep_track_active__JN9PJMPX = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['beep_track_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] >[0]
	>
	type $mol_audio_melody__notes__CXRYQQFD = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_melody__note_length__EANP12FS = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__note_off_part__4KVNTU28 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_audio_melody['note_off_part'] >
	>
	type $mol_number__precision__6WOR7D3Q = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__55MXLBSV = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__UWV9VFI7 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__EP6IU5YU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__9ZQDMEP3 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_length'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_number__precision__W1B66P6T = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__SPTIG1ML = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__Y4V4U834 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__9WQLJSKR = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__Q8I40NLX = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_off_part'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_row__sub__ZYBGJLKG = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_textarea__hint__QSPXK099 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__M5SP4V82 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name__F4RJ5KM5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__EA81645F = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Notes'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__hint__ZAAYFIWJ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon__3HNGKOPQ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Beep_active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__AANXCEMQ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_button_minor__click__SG389GD3 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_start'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__BB5SIUIA = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__RL8JLWEQ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__8WX99XVO = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__5X42VL0G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__RJ6BLI2S = $mol_type_enforce<
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