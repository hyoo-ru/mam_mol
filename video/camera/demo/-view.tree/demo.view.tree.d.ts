declare namespace $ {

	type $mol_video_camera__torch__VEMN11M1 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness__5FOC8K0M = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness__UOF9LGGR = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast__1Y60JXOK = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation__6XVT8PZ1 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature__63KRS3MH = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub__HK7E6Y2N = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked__GY1XYXBF = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon__5FPS3ZV4 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title__JQG0FWIN = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__HM5WQSLE = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__HWCGKJ07 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__LUXRLXUU = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__SNSN8QDB = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__9SUAZ40Q = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__COZZDHYH = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title__8TOJE1PI = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__U173YE89 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__AW3QH8S5 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__FY3RD7WQ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__GVWA16MM = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__9UB7RM45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__V5FWF2CJ = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__GLR9QU1K = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__MK24TI1D = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__WD74FUZ0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value__9QL9O5G0 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change__I9G38HTQ = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title__GJ8WTTT9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content__FSZ4LAB0 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub__STCJVNCY = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub__FJKQB8CF = $mol_type_enforce<
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