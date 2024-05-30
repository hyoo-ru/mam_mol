declare namespace $ {

	type $mol_audio_demo_vibe_room_status__052G91M9 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_vibe_active__MBVJANMV = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >[0]
	>
	type $mol_audio_demo_vibe_stop_at__7PI9670W = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default__U4HLIYK0 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_audio_vibe__shape_default__DSIANULT = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape_default'] >
	>
	type $mol_number__precision_change__BDGO3OU7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__BQ57XR3G = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__YS1NQQEO = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__MTU941NU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__SMMHF0I6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__7314NP0E = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__5TF9OMRI = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__S73F5PM0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__QMC1HW6I = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__J90TEPPY = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__CU6BGMD0 = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__81LCOTYH = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__NP33QLNS = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__SKHYUUVV = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__I69RQSDJ = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__P6M7TM1J = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6I3M0KV7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__IMJWW4WD = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['beep_vibe_start_click'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__V89E1Z5G = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_audio_status__status__0J20Q3GT = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__KPIM064F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__DF1V1WIY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__38ELXAC5 = $mol_type_enforce<
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