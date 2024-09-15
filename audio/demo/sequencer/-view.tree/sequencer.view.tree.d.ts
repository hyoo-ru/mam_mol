declare namespace $ {

	type $mol_audio_demo_sequencer_room_status__BY4BV34S = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_sequencer_room_active__O0D9R8HP = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] >[0]
	>
	type $mol_audio_demo_sequencer_beep_track_active__EWL1GJ7I = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['beep_track_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] >[0]
	>
	type $mol_audio_melody__notes__OQG1VHW3 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_melody__note_length__TE1PZVDY = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__note_off_part__3CAW4QKQ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_audio_melody['note_off_part'] >
	>
	type $mol_number__precision__44OV46BX = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__QKLFMI70 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__FSPBUR3J = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__W6GDDLON = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__KZY7ZUOF = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_length'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_number__precision__99PE0VHF = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min__X972TJJW = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value__9OACVU4W = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name__1NS3IDO5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__EJW30NQ3 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_off_part'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_row__sub__MONFOKW6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_textarea__hint__XQ9ND28L = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value__7MQ7GZTG = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name__5A0HJMHG = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__0T9OEERE = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Notes'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__hint__TMU9F5NN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon__7L7WR006 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Beep_active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked__8LOAFIIM = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_button_minor__click__01152QMO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_start'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__UJA0SQNZ = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status__OQBLPA20 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__58J31MOQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__52ROHTRQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__1I82GX3O = $mol_type_enforce<
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