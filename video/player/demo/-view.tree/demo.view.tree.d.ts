declare namespace $ {

	type $mol_check_icon__checked__E0TN6OH9 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['playing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__QANCVYMU = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['Playing_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_paragraph__sub__3GCIWWZK = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_labeler__title__JVNVXXLE = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__3JYVKCSL = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__N7NHJ9LP = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['time'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view__QTAGLF3H = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title__NQ6LIUV3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__P40JJWR8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__SFELWJDZ = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['volume'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision__H4TS1986 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title__L89HRW9W = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__KT727VMI = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__NQHB5KF1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_video_player_demo_playing__I8DFS9O5 = $mol_type_enforce<
		Parameters< $mol_video_player_demo['playing'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['playing'] >[0]
	>
	type $mol_video_player_demo_volume__XPQ1OTJS = $mol_type_enforce<
		Parameters< $mol_video_player_demo['volume'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['volume'] >[0]
	>
	type $mol_video_player_demo_time__E7IEGENW = $mol_type_enforce<
		Parameters< $mol_video_player_demo['time'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['time'] >[0]
	>
	type $mol_video_player__uri__PGKFT52Z = $mol_type_enforce<
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