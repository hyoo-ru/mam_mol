declare namespace $ {

	type $mol_audio_demo_vibe_room_status__PW6OOGS7 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_vibe_active__U6JM49BS = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >[0]
	>
	type $mol_audio_demo_vibe_stop_at__QYA1G448 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default__KZLOHD3E = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_audio_vibe__shape_default__T1367OQA = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape_default'] >
	>
	type $mol_number__precision_change__UC2OFC3R = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__KE8JD1EM = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__286PGUHO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__S579HRWQ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__VEPF05O5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__G1FABF52 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__FCCN4YE4 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__RPJIB08A = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__UC31TWZW = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__T8VUEJSA = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__47UQR46Y = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__E8SAOUSB = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__30HC98IN = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__X50SSNLI = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__GAFW4MBX = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__1RTQ7N42 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__P0RNN1D9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__4ECZ08GI = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['beep_vibe_start_click'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__KJZH3S1L = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_audio_status__status__SCE06OBU = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__BINZXROA = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__PQ10MZ36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__PXUY4GE8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo_vibe extends $mol_example_small {
		room_status( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >
		active( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >
		stop_at( next?: ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] > ): ReturnType< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >
		freq( next?: number ): number
		Beep_vibe( ): $mol_audio_vibe
		duration_label( ): string
		duration( next?: number ): number
		Duration_num( ): $mol_number
		Duration( ): $mol_labeler
		frequency_label( ): string
		Frequency_num( ): $mol_number
		Frequency( ): $mol_labeler
		shape_label( ): string
		shape( next?: any ): any
		Shape_select( ): $mol_select
		Shape( ): $mol_labeler
		beep_vibe_start_click( next?: any ): any
		Play_icon( ): $mol_icon_play
		Play_button( ): $mol_button_major
		Room_status( ): $mol_audio_status
		Button_row( ): $mol_row
		List( ): $mol_list
		title( ): string
		Room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=vibe.view.tree.d.ts.map