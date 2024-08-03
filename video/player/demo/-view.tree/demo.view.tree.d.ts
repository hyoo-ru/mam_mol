declare namespace $ {

	type $mol_check_icon__checked__4PUWHD88 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['playing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__XFHDI55Q = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['Playing_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_paragraph__sub__D7ATND1F = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_labeler__title__VNQGMS9K = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__UTPWE0YD = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__F1VNCD5B = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['time'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view__4VQWLXTG = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title__3JW80EFB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__DQKU7KSX = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__D0351M7R = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['volume'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision__ETF6S83W = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title__WTHFZC6E = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__73UQ4LT0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__QLIPBAOJ = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_video_player_demo_playing__5JNGRO3Q = $mol_type_enforce<
		Parameters< $mol_video_player_demo['playing'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['playing'] >[0]
	>
	type $mol_video_player_demo_volume__D2D8WLFR = $mol_type_enforce<
		Parameters< $mol_video_player_demo['volume'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['volume'] >[0]
	>
	type $mol_video_player_demo_time__MVF1S6ZC = $mol_type_enforce<
		Parameters< $mol_video_player_demo['time'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['time'] >[0]
	>
	type $mol_video_player__uri__ZKOBSVQC = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['uri'] >
		,
		ReturnType< $mol_video_player['uri'] >
	>
	export class $mol_video_player_demo extends $mol_example_large {
		files( ): ReturnType< ReturnType< $mol_video_player_demo['Open'] >['files'] >
		Open( ): $mol_button_open
		Playing_icon( ): $mol_icon_play
		Playing( ): $mol_check_icon
		Duration( ): $mol_paragraph
		Duration_labeler( ): $mol_labeler
		Time( ): $mol_number
		Time_labeler( ): $mol_labeler
		Volume( ): $mol_number
		Volume_labeler( ): $mol_labeler
		Controls( ): $mol_row
		uri( ): string
		playing( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['playing'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['playing'] >
		volume( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['volume'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['volume'] >
		time( next?: ReturnType< ReturnType< $mol_video_player_demo['Player'] >['time'] > ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['time'] >
		duration( ): ReturnType< ReturnType< $mol_video_player_demo['Player'] >['duration'] >
		Player( ): $mol_video_player
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map