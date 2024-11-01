declare namespace $ {

	type $mol_video_camera__torch__JFVITMZG = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness__9X79WIA3 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness__HGNANDHX = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast__2W60P7IT = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation__65GKD7KB = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature__4ZASB51A = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub__945R4XAW = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked__HKYWNJ7U = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__NA4LU1GV = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title__JEX4HUNX = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__EBX1E13O = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__X2TNV526 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__LHDWHX5G = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__HZ258GFD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__6F89YBZB = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__4B895VD4 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__OIZ7LHVU = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__886NULS9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__VOC3JXEE = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__DLEUQG7J = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__NIAF9XEY = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__THC8LW25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__I96ELX5D = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__1L7UWPWC = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__BJQW2THD = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__J3AZML91 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__ASR3KJF7 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__6YI1YL8T = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__WLKWRZ28 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__5JGB4V2B = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__3E2U7R6I = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub__8W0IZ38W = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_video_camera_demo extends $mol_example_large {
		Player( ): $mol_video_camera
		View( ): $mol_row
		torch( next?: boolean ): boolean
		Torch_icon( ): $mol_icon_flashlight
		Torch( ): $mol_check_icon
		Torch_labeler( ): $mol_labeler
		brightness( next?: number ): number
		Brightness( ): $mol_number
		Brightness_labeler( ): $mol_labeler
		sharpness( next?: number ): number
		Sharpness( ): $mol_number
		Sharpness_labeler( ): $mol_labeler
		contrast( next?: number ): number
		Contrast( ): $mol_number
		Contrast_labeler( ): $mol_labeler
		saturation( next?: number ): number
		Saturation( ): $mol_number
		Saturation_labeler( ): $mol_labeler
		temperature( next?: number ): number
		Temperature( ): $mol_number
		Temperature_labeler( ): $mol_labeler
		Controls( ): $mol_row
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map