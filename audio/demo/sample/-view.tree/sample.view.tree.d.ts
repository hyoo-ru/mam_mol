declare namespace $ {

	type $mol_audio_demo_sample_room_status__RS8EBXCP = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_sample_sample_active__7JPOR6SD = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['sample_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Sample'] >['active'] >[0]
	>
	type $mol_audio_demo_sample_loop__UZ2VS1J9 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['loop'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Sample'] >['loop'] >[0]
	>
	type $mol_audio_sample__loop_default__PKMC637Y = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_audio_sample['loop_default'] >
	>
	type $mol_audio_sample__buffer__K3WTQR9R = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_buffer'] >
		,
		ReturnType< $mol_audio_sample['buffer'] >
	>
	type $mol_string__value__OAODUXRT = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_url'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name__JS4IGXFW = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control__O9IJCNR5 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Sample_url'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__checked__3USOJ244 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__title__WA3PXZ8P = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['title'] >
	>
	type $mol_check_icon__Icon__7WHJZYQD = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_button_minor__click__1BEG1Y44 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['start_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title__YRJQKTVU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_check_icon__checked__65KWGGZH = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['loop'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__title__JNN18U1X = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['title'] >
	>
	type $mol_check_icon__Icon__1H2NPNPH = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Loop_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_row__sub__S29JDYM5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_audio_status__status__H9SN1EXZ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_list__rows__ZTO906YA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__53IWZMJR = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo_sample extends $mol_example_small {
		room_status( next?: ReturnType< ReturnType< $mol_audio_demo_sample['Room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo_sample['Room'] >['status'] >
		sample_active( next?: ReturnType< ReturnType< $mol_audio_demo_sample['Sample'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo_sample['Sample'] >['active'] >
		start( ): ReturnType< ReturnType< $mol_audio_demo_sample['Sample'] >['start'] >
		loop( next?: ReturnType< ReturnType< $mol_audio_demo_sample['Sample'] >['loop'] > ): ReturnType< ReturnType< $mol_audio_demo_sample['Sample'] >['loop'] >
		sample_buffer( ): any
		Sample( ): $mol_audio_sample
		sample_url( next?: string ): string
		Sample_url( ): $mol_string
		Sample_url_field( ): $mol_form_field
		Active_icon( ): $mol_icon_play
		Active( ): $mol_check_icon
		start_click( next?: any ): any
		Start( ): $mol_button_minor
		Loop_icon( ): $mol_icon_loop
		Loop( ): $mol_check_icon
		Controls( ): $mol_row
		Room_status( ): $mol_audio_status
		List( ): $mol_list
		title( ): string
		Room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=sample.view.tree.d.ts.map