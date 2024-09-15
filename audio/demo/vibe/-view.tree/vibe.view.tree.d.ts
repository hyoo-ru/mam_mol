declare namespace $ {

	type $mol_audio_demo_vibe_room_status__05721VW3 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >[0]
	>
	type $mol_audio_demo_vibe_active__X7LK9M5Y = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >[0]
	>
	type $mol_audio_demo_vibe_stop_at__B17K52E2 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default__B81DS2WU = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_audio_vibe__shape_default__VP1TVR6F = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape_default'] >
	>
	type $mol_number__precision_change__FXJ3IQUK = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__35JPOI3M = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__CUPCLEZ7 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__TCGFZ4XH = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change__LOE7JEOL = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value__R0EH3GFZ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__4A6UU5XX = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__A56JBAI7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter__C4X0GCI3 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value__WRHN34DT = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__TQQ0ZI16 = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__FEHCPUYG = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__4T9H6OX5 = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__K9J6JXG0 = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options__ZAFSHR3T = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title__ARF2BWGE = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__CQVQY1NK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click__49WPKUGZ = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['beep_vibe_start_click'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub__CBR29CJK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_audio_status__status__AR15QNKV = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub__A58I53OU = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows__JWCZ15FN = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input__TIEPD9QQ = $mol_type_enforce<
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