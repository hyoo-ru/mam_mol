declare namespace $ {

	export class $mol_scroll extends $mol_view {
		tabindex( ): number
		event_scroll( next?: any ): any
		scroll_top( next?: number ): number
		scroll_left( next?: number ): number
		attr( ): ({ 
			'tabindex': ReturnType< $mol_scroll['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			scroll( next?: ReturnType< $mol_scroll['event_scroll'] > ): ReturnType< $mol_scroll['event_scroll'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=scroll.view.tree.d.ts.map
declare namespace $ {

	type $mol_book2_sub__1 = $mol_type_enforce<
		ReturnType< $mol_book2['pages'] >[number]
		,
		$mol_view
	>
	type $mol_book2_sub__2 = $mol_type_enforce<
		ReturnType< $mol_book2['placeholders'] >[number]
		,
		$mol_view
	>
	type $mol_view__title_mol_book2_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['title'] >
	>
	export class $mol_book2 extends $mol_scroll {
		pages_deep( ): readonly($mol_view)[]
		pages( ): ReturnType< $mol_book2['pages_deep'] >
		Placeholder( ): $mol_view
		placeholders( ): readonly($mol_view)[]
		menu_title( ): string
		sub( ): readonly($mol_view)[]
		minimal_width( ): number
		Gap( id: any): $mol_view
	}
	
}

//# sourceMappingURL=book2.view.tree.d.ts.map
declare namespace $ {

	export class $mol_theme_auto extends $mol_plugin {
		dark( ): string
		theme( ): ReturnType< $mol_theme_auto['dark'] >
		light( ): string
		attr( ): ({ 
			'mol_theme': ReturnType< $mol_theme_auto['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=auto.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hotkey extends $mol_plugin {
		keydown( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_hotkey['keydown'] > ): ReturnType< $mol_hotkey['keydown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		key( ): Record<string, any>
		mod_ctrl( ): boolean
		mod_alt( ): boolean
		mod_shift( ): boolean
	}
	
}

//# sourceMappingURL=hotkey.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_mol_page_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_2 = $mol_type_enforce<
		ReturnType< $mol_page['title_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_page_3 = $mol_type_enforce<
		ReturnType< $mol_page['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_page_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__dom_name_mol_page_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_6 = $mol_type_enforce<
		ReturnType< $mol_page['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type __mol_page_7 = $mol_type_enforce<
		Parameters< $mol_page['body_scroll_top'] >[0]
		,
		Parameters< ReturnType< $mol_page['Body'] >['scroll_top'] >[0]
	>
	type $mol_view__sub_mol_page_8 = $mol_type_enforce<
		ReturnType< $mol_page['body'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_scroll__sub_mol_page_9 = $mol_type_enforce<
		ReturnType< $mol_page['body_content'] >
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_view__dom_name_mol_page_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_page_11 = $mol_type_enforce<
		ReturnType< $mol_page['foot'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_page extends $mol_view {
		tabindex( ): number
		Logo( ): any
		title_content( ): readonly(any)[]
		Title( ): $mol_view
		tools( ): readonly($mol_view_content)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		body_scroll_top( next?: ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] > ): ReturnType< ReturnType< $mol_page['Body'] >['scroll_top'] >
		body( ): readonly($mol_view)[]
		Body_content( ): $mol_view
		body_content( ): readonly(any)[]
		Body( ): $mol_scroll
		foot( ): readonly($mol_view)[]
		Foot( ): $mol_view
		dom_name( ): string
		attr( ): ({ 
			'tabIndex': ReturnType< $mol_page['tabindex'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=page.view.tree.d.ts.map
declare namespace $ {

	export class $mol_ghost extends $mol_view {
		Sub( ): $mol_view
	}
	
}

//# sourceMappingURL=ghost.view.tree.d.ts.map
declare namespace $ {

	export class $mol_follower extends $mol_ghost {
		transform( ): string
		Anchor( ): $mol_view
		align( ): readonly(number)[]
		offset( ): readonly(number)[]
		style( ): ({ 
			'transform': ReturnType< $mol_follower['transform'] >,
		})  & ReturnType< $mol_ghost['style'] >
	}
	
}

//# sourceMappingURL=follower.view.tree.d.ts.map
declare namespace $ {

	type $mol_pop_bubble__content_mol_pop_1 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_content'] >
		,
		ReturnType< $mol_pop_bubble['content'] >
	>
	type $mol_pop_bubble__height_max_mol_pop_2 = $mol_type_enforce<
		ReturnType< $mol_pop['height_max'] >
		,
		ReturnType< $mol_pop_bubble['height_max'] >
	>
	type $mol_follower__offset_mol_pop_3 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_offset'] >
		,
		ReturnType< $mol_follower['offset'] >
	>
	type $mol_follower__align_mol_pop_4 = $mol_type_enforce<
		ReturnType< $mol_pop['bubble_align'] >
		,
		ReturnType< $mol_follower['align'] >
	>
	type $mol_follower__Anchor_mol_pop_5 = $mol_type_enforce<
		ReturnType< $mol_pop['Anchor'] >
		,
		ReturnType< $mol_follower['Anchor'] >
	>
	type $mol_follower__Sub_mol_pop_6 = $mol_type_enforce<
		ReturnType< $mol_pop['Bubble'] >
		,
		ReturnType< $mol_follower['Sub'] >
	>
	export class $mol_pop extends $mol_view {
		bubble( ): any
		Anchor( ): any
		bubble_offset( ): readonly(number)[]
		bubble_align( ): readonly(number)[]
		bubble_content( ): readonly($mol_view_content)[]
		height_max( ): number
		Bubble( ): $mol_pop_bubble
		Follower( ): $mol_follower
		showed( next?: boolean ): boolean
		align_vert( ): string
		align_hor( ): string
		align( ): string
		prefer( ): string
		auto( ): readonly(any)[]
		sub( ): readonly(any)[]
		sub_visible( ): readonly(any)[]
	}
	
	export class $mol_pop_bubble extends $mol_view {
		content( ): readonly($mol_view_content)[]
		height_max( ): number
		sub( ): ReturnType< $mol_pop_bubble['content'] >
		style( ): ({ 
			'maxHeight': ReturnType< $mol_pop_bubble['height_max'] >,
		})  & ReturnType< $mol_view['style'] >
		attr( ): ({ 
			'tabindex': number,
			'popover': string,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=pop.view.tree.d.ts.map
declare namespace $ {

	export class $mol_nav extends $mol_plugin {
		event_key( next?: any ): any
		cycle( next?: boolean ): boolean
		mod_ctrl( ): boolean
		mod_shift( ): boolean
		mod_alt( ): boolean
		keys_x( next?: readonly(any)[] ): readonly(any)[]
		keys_y( next?: readonly(any)[] ): readonly(any)[]
		current_x( next?: any ): any
		current_y( next?: any ): any
		event_up( next?: any ): any
		event_down( next?: any ): any
		event_left( next?: any ): any
		event_right( next?: any ): any
		event( ): ({ 
			keydown( next?: ReturnType< $mol_nav['event_key'] > ): ReturnType< $mol_nav['event_key'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=nav.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__mod_ctrl_mol_string_1 = $mol_type_enforce<
		ReturnType< $mol_string['submit_with_ctrl'] >
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_hotkey__key_mol_string_2 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_string['submit'] > ): ReturnType< $mol_string['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	export class $mol_string extends $mol_view {
		selection_watcher( ): any
		error_report( ): any
		disabled( ): boolean
		value( next?: string ): string
		value_changed( next?: ReturnType< $mol_string['value'] > ): ReturnType< $mol_string['value'] >
		hint( ): string
		hint_visible( ): ReturnType< $mol_string['hint'] >
		spellcheck( ): boolean
		autocomplete_native( ): string
		selection_end( ): number
		selection_start( ): number
		keyboard( ): string
		enter( ): string
		length_max( ): number
		type( next?: string ): string
		event_change( next?: any ): any
		submit_with_ctrl( ): boolean
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		dom_name( ): string
		enabled( ): boolean
		minimal_height( ): number
		autocomplete( ): boolean
		selection( next?: readonly(number)[] ): readonly(number)[]
		auto( ): readonly(any)[]
		field( ): ({ 
			'disabled': ReturnType< $mol_string['disabled'] >,
			'value': ReturnType< $mol_string['value_changed'] >,
			'placeholder': ReturnType< $mol_string['hint_visible'] >,
			'spellcheck': ReturnType< $mol_string['spellcheck'] >,
			'autocomplete': ReturnType< $mol_string['autocomplete_native'] >,
			'selectionEnd': ReturnType< $mol_string['selection_end'] >,
			'selectionStart': ReturnType< $mol_string['selection_start'] >,
			'inputMode': ReturnType< $mol_string['keyboard'] >,
			'enterkeyhint': ReturnType< $mol_string['enter'] >,
		})  & ReturnType< $mol_view['field'] >
		attr( ): ({ 
			'maxlength': ReturnType< $mol_string['length_max'] >,
			'type': ReturnType< $mol_string['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		event( ): ({ 
			input( next?: ReturnType< $mol_string['event_change'] > ): ReturnType< $mol_string['event_change'] >,
		})  & ReturnType< $mol_view['event'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=string.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg extends $mol_view {
		dom_name( ): string
		dom_name_space( ): string
		font_size( ): number
		font_family( ): string
		style_size( ): Record<string, any>
	}
	
}

//# sourceMappingURL=svg.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_root extends $mol_svg {
		view_box( ): string
		aspect( ): string
		dom_name( ): string
		attr( ): ({ 
			'viewBox': ReturnType< $mol_svg_root['view_box'] >,
			'preserveAspectRatio': ReturnType< $mol_svg_root['aspect'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=root.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_path extends $mol_svg {
		geometry( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_svg_path['geometry'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=path.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_mol_icon_1 = $mol_type_enforce<
		ReturnType< $mol_icon['path'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	export class $mol_icon extends $mol_svg_root {
		path( ): string
		Path( ): $mol_svg_path
		view_box( ): string
		minimal_width( ): number
		minimal_height( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_close extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=close.view.tree.d.ts.map
declare namespace $ {

	export class $mol_speck extends $mol_view {
		value( ): any
		theme( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=speck.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_button_1 = $mol_type_enforce<
		ReturnType< $mol_button['error'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	export class $mol_button extends $mol_view {
		event_activate( next?: any ): any
		activate( next?: ReturnType< $mol_button['event_activate'] > ): ReturnType< $mol_button['event_activate'] >
		clicks( next?: any ): any
		event_key_press( next?: any ): any
		key_press( next?: ReturnType< $mol_button['event_key_press'] > ): ReturnType< $mol_button['event_key_press'] >
		disabled( ): boolean
		tab_index( ): number
		hint( ): string
		hint_safe( ): ReturnType< $mol_button['hint'] >
		error( ): string
		enabled( ): boolean
		click( next?: any ): any
		event_click( next?: any ): any
		status( next?: readonly(any)[] ): readonly(any)[]
		event( ): ({ 
			click( next?: ReturnType< $mol_button['activate'] > ): ReturnType< $mol_button['activate'] >,
			dblclick( next?: ReturnType< $mol_button['clicks'] > ): ReturnType< $mol_button['clicks'] >,
			keydown( next?: ReturnType< $mol_button['key_press'] > ): ReturnType< $mol_button['key_press'] >,
		})  & ReturnType< $mol_view['event'] >
		attr( ): ({ 
			'disabled': ReturnType< $mol_button['disabled'] >,
			'role': string,
			'tabindex': ReturnType< $mol_button['tab_index'] >,
			'title': ReturnType< $mol_button['hint_safe'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		Speck( ): $mol_speck
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_typed extends $mol_button {
		minimal_height( ): number
		minimal_width( ): number
	}
	
}

//# sourceMappingURL=typed.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_minor extends $mol_button_typed {
	}
	
}

//# sourceMappingURL=minor.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__style_mol_list_1 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_before'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_mol_list_2 = $mol_type_enforce<
		({ 
			'paddingTop': ReturnType< $mol_list['gap_after'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $mol_list extends $mol_view {
		gap_before( ): number
		Gap_before( ): $mol_view
		Empty( ): $mol_view
		gap_after( ): number
		Gap_after( ): $mol_view
		rows( ): readonly($mol_view)[]
		render_visible_only( ): boolean
		render_over( ): number
		sub( ): ReturnType< $mol_list['rows'] >
		item_height_min( id: any): number
		item_width_min( id: any): number
		view_window_shift( next?: number ): number
		view_window( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	export class $mol_paragraph extends $mol_view {
		line_height( ): number
		letter_width( ): number
		width_limit( ): number
		row_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paragraph.view.tree.d.ts.map
declare namespace $ {

	type $mol_paragraph__sub_mol_dimmer_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_dimmer_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_dimmer extends $mol_paragraph {
		parts( ): readonly($mol_view_content)[]
		string( id: any): string
		haystack( ): string
		needle( ): string
		sub( ): ReturnType< $mol_dimmer['parts'] >
		Low( id: any): $mol_paragraph
		High( id: any): $mol_paragraph
	}
	
}

//# sourceMappingURL=dimmer.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_search_1 = $mol_type_enforce<
		({ 
			escape( next?: ReturnType< $mol_search['clear'] > ): ReturnType< $mol_search['clear'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_nav__keys_y_mol_search_2 = $mol_type_enforce<
		ReturnType< $mol_search['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_search_3 = $mol_type_enforce<
		ReturnType< $mol_search['nav_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_string__value_mol_search_4 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_search_5 = $mol_type_enforce<
		ReturnType< $mol_search['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__submit_mol_search_6 = $mol_type_enforce<
		ReturnType< $mol_search['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_search_7 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__keyboard_mol_search_8 = $mol_type_enforce<
		ReturnType< $mol_search['keyboard'] >
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__enter_mol_search_9 = $mol_type_enforce<
		ReturnType< $mol_search['enter'] >
		,
		ReturnType< $mol_string['enter'] >
	>
	type $mol_button_minor__hint_mol_search_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_search_11 = $mol_type_enforce<
		ReturnType< $mol_search['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_search_12 = $mol_type_enforce<
		ReturnType< $mol_search['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_list__rows_mol_search_14 = $mol_type_enforce<
		ReturnType< $mol_search['menu_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_search_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_dimmer__haystack_mol_search_16 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_search_17 = $mol_type_enforce<
		ReturnType< $mol_search['query'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_search_plugins__18 = $mol_type_enforce<
		ReturnType< $mol_pop['plugins'] >[number]
		,
		$mol_plugin
	>
	type $mol_view__sub_mol_search_19 = $mol_type_enforce<
		ReturnType< $mol_search['anchor_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__click_mol_search_20 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_select'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_search_21 = $mol_type_enforce<
		ReturnType< $mol_search['suggest_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_search extends $mol_pop {
		clear( next?: any ): any
		Hotkey( ): $mol_hotkey
		nav_components( ): readonly($mol_view)[]
		nav_focused( next?: any ): any
		Nav( ): $mol_nav
		suggests_showed( next?: boolean ): boolean
		query( next?: string ): string
		hint( ): string
		submit( next?: any ): any
		enabled( ): boolean
		keyboard( ): string
		enter( ): string
		bring( ): ReturnType< ReturnType< $mol_search['Query'] >['bring'] >
		Query( ): $mol_string
		Clear_icon( ): $mol_icon_close
		Clear( ): $mol_button_minor
		anchor_content( ): readonly(any)[]
		menu_items( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		suggest_select( id: any, next?: any ): any
		suggest_label( id: any): string
		Suggest_label( id: any): $mol_dimmer
		suggest_content( id: any): readonly($mol_view_content)[]
		suggests( ): readonly(string)[]
		plugins( ): readonly($mol_plugin)[]
		showed( next?: ReturnType< $mol_search['suggests_showed'] > ): ReturnType< $mol_search['suggests_showed'] >
		align_hor( ): string
		Anchor( ): $mol_view
		bubble_content( ): readonly($mol_view_content)[]
		Suggest( id: any): $mol_button_minor
	}
	
}

//# sourceMappingURL=search.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_check_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_check extends $mol_button_minor {
		checked( next?: boolean ): boolean
		aria_checked( ): string
		aria_role( ): string
		Icon( ): any
		title( ): string
		Title( ): $mol_view
		label( ): readonly(any)[]
		attr( ): ({ 
			'mol_check_checked': ReturnType< $mol_check['checked'] >,
			'aria-checked': ReturnType< $mol_check['aria_checked'] >,
			'role': ReturnType< $mol_check['aria_role'] >,
		})  & ReturnType< $mol_button_minor['attr'] >
		sub( ): readonly($mol_view_content)[]
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=chevron.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_expand extends $mol_check {
		level_style( ): string
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		Icon( ): $mol_icon_chevron
		level( ): number
		style( ): ({ 
			'paddingLeft': ReturnType< $mol_check_expand['level_style'] >,
		})  & ReturnType< $mol_check['style'] >
		checked( next?: ReturnType< $mol_check_expand['expanded'] > ): ReturnType< $mol_check_expand['expanded'] >
		enabled( ): ReturnType< $mol_check_expand['expandable'] >
	}
	
}

//# sourceMappingURL=expand.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_expand__checked_mol_expander_1 = $mol_type_enforce<
		ReturnType< $mol_expander['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__expandable_mol_expander_2 = $mol_type_enforce<
		ReturnType< $mol_expander['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__label_mol_expander_3 = $mol_type_enforce<
		ReturnType< $mol_expander['label'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__sub_mol_expander_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_mol_expander_5 = $mol_type_enforce<
		ReturnType< $mol_expander['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_expander extends $mol_list {
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		label( ): readonly(any)[]
		Trigger( ): $mol_check_expand
		Tools( ): any
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=expander.view.tree.d.ts.map
declare namespace $ {

	type $mol_tag_tree__ids_tags_mol_tag_tree_1 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__path_mol_tag_tree_2 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_path'] >
		,
		ReturnType< $mol_tag_tree['path'] >
	>
	type $mol_tag_tree__Item_mol_tag_tree_3 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__item_title_mol_tag_tree_4 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_title'] >
		,
		ReturnType< $mol_tag_tree['item_title'] >
	>
	type $mol_tag_tree__tag_expanded_mol_tag_tree_5 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_tag_tree['tag_expanded'] >
	>
	type $mol_tag_tree__tag_name_mol_tag_tree_6 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_tag_tree['tag_name'] >
	>
	type $mol_tag_tree_sub__7 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_list'] >[number]
		,
		$mol_view
	>
	type $mol_tag_tree_sub__8 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['item_list'] >[number]
		,
		$mol_view
	>
	type $mol_view__sub_mol_tag_tree_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_expander__expandable_mol_tag_tree_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__expanded_mol_tag_tree_11 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__title_mol_tag_tree_12 = $mol_type_enforce<
		ReturnType< $mol_tag_tree['tag_name'] >
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_mol_tag_tree_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_tag_tree extends $mol_list {
		tag_list( ): readonly($mol_view)[]
		item_list( ): readonly($mol_view)[]
		item_title( id: any): string
		tag_expanded( id: any, next?: boolean ): boolean
		tag_name( id: any): string
		tag_path( id: any): readonly(string)[]
		Tag_tree( id: any): $mol_tag_tree
		path( ): readonly(string)[]
		ids_tags( ): Record<string, any>
		ids( ): readonly(any)[]
		tags( ): readonly(string)[]
		levels_expanded( ): number
		sub( ): readonly($mol_view)[]
		Item( id: any): $mol_view
		Tag( id: any): $mol_expander
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link extends $mol_view {
		uri_toggle( ): string
		hint( ): string
		hint_safe( ): ReturnType< $mol_link['hint'] >
		target( ): string
		file_name( ): string
		current( ): boolean
		relation( ): string
		event_click( next?: any ): any
		click( next?: ReturnType< $mol_link['event_click'] > ): ReturnType< $mol_link['event_click'] >
		uri( ): string
		dom_name( ): string
		uri_off( ): string
		uri_native( ): any
		external( ): boolean
		attr( ): ({ 
			'href': ReturnType< $mol_link['uri_toggle'] >,
			'title': ReturnType< $mol_link['hint_safe'] >,
			'target': ReturnType< $mol_link['target'] >,
			'download': ReturnType< $mol_link['file_name'] >,
			'mol_link_current': ReturnType< $mol_link['current'] >,
			'rel': ReturnType< $mol_link['relation'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly($mol_view_content)[]
		arg( ): Record<string, any>
		event( ): ({ 
			click( next?: ReturnType< $mol_link['click'] > ): ReturnType< $mol_link['click'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
}

//# sourceMappingURL=link.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_app_demo_menu_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_tag_tree__Item_mol_app_demo_menu_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['Option'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__ids_tags_mol_app_demo_menu_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['ids_tags'] >
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	type $mol_tag_tree__levels_expanded_mol_app_demo_menu_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['levels_expanded'] >
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_dimmer__haystack_mol_app_demo_menu_5 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_app_demo_menu_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_link__arg_mol_app_demo_menu_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo_menu['option_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_app_demo_menu_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_app_demo_menu extends $mol_page {
		filter( next?: string ): string
		Filter( ): $mol_search
		ids_tags( ): Record<string, any>
		levels_expanded_default( ): number
		levels_expanded( ): ReturnType< $mol_app_demo_menu['levels_expanded_default'] >
		Tree( ): $mol_tag_tree
		option_arg( id: any): Record<string, any>
		option_title( id: any): string
		Option_title( id: any): $mol_dimmer
		names( ): readonly(string)[]
		widget_tags( id: any): readonly(string)[]
		widget_aspects( id: any): readonly(string)[]
		widget_title( id: any): string
		search_start( next?: any ): any
		body( ): readonly(any)[]
		Option( id: any): $mol_link
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=script.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_script_text extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link_source extends $mol_link {
		Icon( ): $mol_icon_script_text
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=source.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_icon extends $mol_check {
	}
	
}

//# sourceMappingURL=icon.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_brightness_4 extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=4.view.tree.d.ts.map
declare namespace $ {

	export class $mol_lights_toggle extends $mol_check_icon {
		Lights_icon( ): $mol_icon_brightness_4
		lights( next?: boolean ): boolean
		Icon( ): ReturnType< $mol_lights_toggle['Lights_icon'] >
		hint( ): string
		checked( next?: ReturnType< $mol_lights_toggle['lights'] > ): ReturnType< $mol_lights_toggle['lights'] >
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_information extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=information.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_information_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_forum extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=forum.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_forum_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_open_in_new extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=new.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__uri_mol_embed_native_1 = $mol_type_enforce<
		ReturnType< $mol_embed_native['uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_embed_native_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_embed_native extends $mol_scroll {
		uri( next?: string ): string
		title( ): string
		Fallback( ): $mol_link
		uri_change( next?: any ): any
		dom_name( ): string
		window( ): any
		attr( ): ({ 
			'src': ReturnType< $mol_embed_native['uri'] >,
		})  & ReturnType< $mol_scroll['attr'] >
		sub( ): readonly(any)[]
		message( ): ({ 
			hashchange( next?: ReturnType< $mol_embed_native['uri_change'] > ): ReturnType< $mol_embed_native['uri_change'] >,
		}) 
	}
	
}

//# sourceMappingURL=native.view.tree.d.ts.map
declare namespace $ {

	export class $mol_frame extends $mol_embed_native {
		allow( ): string
		html( ): any
		attr( ): ({ 
			'tabindex': ReturnType< $mol_frame['tabindex'] >,
			'allow': ReturnType< $mol_frame['allow'] >,
			'src': ReturnType< $mol_frame['uri'] >,
			'srcdoc': ReturnType< $mol_frame['html'] >,
		}) 
		fullscreen( ): boolean
		accelerometer( ): boolean
		autoplay( ): boolean
		encription( ): boolean
		gyroscope( ): boolean
		pip( ): boolean
		clipboard_read( ): boolean
		clipboard_write( ): boolean
	}
	
}

//# sourceMappingURL=frame.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__uri_mol_chat_1 = $mol_type_enforce<
		ReturnType< $mol_chat['standalone'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_chat_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_chat_3 = $mol_type_enforce<
		({ 
			'mol_chat': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_chat_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_frame__uri_mol_chat_5 = $mol_type_enforce<
		ReturnType< $mol_chat['embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	type $mol_page__title_mol_chat_6 = $mol_type_enforce<
		ReturnType< $mol_chat['title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_chat_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__Body_mol_chat_8 = $mol_type_enforce<
		ReturnType< $mol_chat['Embed'] >
		,
		ReturnType< $mol_page['Body'] >
	>
	export class $mol_chat extends $mol_link {
		Icon( ): $mol_icon_forum_outline
		title( ): string
		standalone( ): string
		Standalone_icon( ): $mol_icon_open_in_new
		Esternal( ): $mol_link
		Close_icon( ): $mol_icon_close
		Close( ): $mol_link
		embed( ): string
		Embed( ): $mol_frame
		Page( ): $mol_page
		seed( ): string
		opened( ): boolean
		arg( ): ({ 
			'mol_chat': string,
		}) 
		hint( ): ReturnType< $mol_chat['title'] >
		sub( ): readonly(any)[]
		pages( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chat.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_settings extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=settings.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__checked_mol_app_demo_detail_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__hint_mol_app_demo_detail_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon_mol_app_demo_detail_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['readme_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_chat__seed_mol_app_demo_detail_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['chat_seed'] >
		,
		ReturnType< $mol_chat['seed'] >
	>
	type $mol_speck__value_mol_app_demo_detail_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_link__hint_mol_app_demo_detail_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__uri_mol_app_demo_detail_8 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['edit_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__hint_mol_app_demo_detail_9 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_app_demo_detail_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_app_demo_detail_11 = $mol_type_enforce<
		ReturnType< $mol_app_demo_detail['close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	export class $mol_app_demo_detail extends $mol_page {
		readme( next?: boolean ): boolean
		readme_icon( ): $mol_icon_information_outline
		Readme( ): $mol_check_icon
		chat_pages( ): ReturnType< ReturnType< $mol_app_demo_detail['Chat'] >['pages'] >
		chat_seed( ): string
		Chat( ): $mol_chat
		edit_hint( ): string
		Edit_speck( ): $mol_speck
		Edit_icon( ): $mol_icon_settings
		edit_uri( ): string
		Edit( ): $mol_link
		close_hint( ): string
		Close_icon( ): $mol_icon_close
		close_arg( ): ({ 
			'demo': any,
		}) 
		Close( ): $mol_link
		Demo( ): $mol_view
		description( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=detail.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example extends $mol_view {
		tags( ): readonly(string)[]
		aspects( ): readonly(string)[]
	}
	
}

//# sourceMappingURL=example.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example_small extends $mol_example {
	}
	
}

//# sourceMappingURL=small.view.tree.d.ts.map
declare namespace $ {

	export class $mol_example_large extends $mol_example {
	}
	
}

//# sourceMappingURL=large.view.tree.d.ts.map
declare namespace $ {

	export class $mol_stack extends $mol_view {
	}
	
}

//# sourceMappingURL=stack.view.tree.d.ts.map
declare namespace $ {

	export class $mol_text_code_token extends $mol_dimmer {
		type( ): string
		attr( ): ({ 
			'mol_text_code_token_type': ReturnType< $mol_text_code_token['type'] >,
		})  & ReturnType< $mol_dimmer['attr'] >
	}
	
	export class $mol_text_code_token_link extends $mol_text_code_token {
		uri( ): string
		dom_name( ): string
		type( ): string
		attr( ): ({ 
			'href': ReturnType< $mol_text_code_token_link['uri'] >,
			'target': string,
		})  & ReturnType< $mol_text_code_token['attr'] >
	}
	
}

//# sourceMappingURL=token.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_text_code_line_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_text_code_token__type_mol_text_code_line_2 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_type'] >
		,
		ReturnType< $mol_text_code_token['type'] >
	>
	type $mol_text_code_token__haystack_mol_text_code_line_3 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token['haystack'] >
	>
	type $mol_text_code_token__needle_mol_text_code_line_4 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token['needle'] >
	>
	type $mol_text_code_token_link__haystack_mol_text_code_line_5 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_text'] >
		,
		ReturnType< $mol_text_code_token_link['haystack'] >
	>
	type $mol_text_code_token_link__needle_mol_text_code_line_6 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['highlight'] >
		,
		ReturnType< $mol_text_code_token_link['needle'] >
	>
	type $mol_text_code_token_link__uri_mol_text_code_line_7 = $mol_type_enforce<
		ReturnType< $mol_text_code_line['token_uri'] >
		,
		ReturnType< $mol_text_code_token_link['uri'] >
	>
	export class $mol_text_code_line extends $mol_paragraph {
		numb( ): number
		token_type( id: any): string
		token_text( id: any): string
		highlight( ): string
		token_uri( id: any): string
		text( ): string
		minimal_height( ): number
		numb_showed( ): boolean
		syntax( ): any
		uri_resolve( id: any): string
		Numb( ): $mol_view
		Token( id: any): $mol_text_code_token
		Token_link( id: any): $mol_text_code_token_link
		find_pos( id: any): any
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clipboard.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clipboard_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	type $mol_blob__mol_button_copy_1 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	type $mol_blob__mol_button_copy_2 = $mol_type_enforce<
		[ readonly(BlobPart)[], ({ 
			'type': string,
		})  ]
		,
		ConstructorParameters< typeof $mol_blob >
	>
	export class $mol_button_copy extends $mol_button_minor {
		text( ): ReturnType< $mol_button_copy['title'] >
		text_blob( next?: $mol_blob ): $mol_blob
		html( ): string
		html_blob( next?: $mol_blob ): $mol_blob
		Icon( ): $mol_icon_clipboard_outline
		title( ): string
		blobs( ): readonly($mol_blob)[]
		data( ): Record<string, any>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_code_line__numb_showed_mol_text_code_1 = $mol_type_enforce<
		ReturnType< $mol_text_code['sidebar_showed'] >
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__numb_mol_text_code_2 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_numb'] >
		,
		ReturnType< $mol_text_code_line['numb'] >
	>
	type $mol_text_code_line__theme_mol_text_code_3 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_theme'] >
		,
		ReturnType< $mol_text_code_line['theme'] >
	>
	type $mol_text_code_line__text_mol_text_code_4 = $mol_type_enforce<
		ReturnType< $mol_text_code['row_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__syntax_mol_text_code_5 = $mol_type_enforce<
		ReturnType< $mol_text_code['syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_code_6 = $mol_type_enforce<
		ReturnType< $mol_text_code['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__highlight_mol_text_code_7 = $mol_type_enforce<
		ReturnType< $mol_text_code['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_list__render_visible_only_mol_text_code_8 = $mol_type_enforce<
		ReturnType< $mol_text_code['render_visible_only'] >
		,
		ReturnType< $mol_list['render_visible_only'] >
	>
	type $mol_list__rows_mol_text_code_9 = $mol_type_enforce<
		ReturnType< $mol_text_code['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__hint_mol_text_code_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__text_mol_text_code_11 = $mol_type_enforce<
		ReturnType< $mol_text_code['text_export'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	export class $mol_text_code extends $mol_stack {
		sidebar_showed( ): boolean
		render_visible_only( ): boolean
		row_numb( id: any): number
		row_theme( id: any): string
		row_text( id: any): string
		syntax( ): any
		uri_resolve( id: any): string
		highlight( ): string
		Row( id: any): $mol_text_code_line
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		text_export( ): string
		Copy( ): $mol_button_copy
		attr( ): ({ 
			'mol_text_code_sidebar_showed': ReturnType< $mol_text_code['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		text( ): string
		text_lines( ): readonly(string)[]
		find_pos( id: any): any
		uri_base( ): string
		row_themes( ): readonly(string)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $ {

	export class $mol_float extends $mol_view {
		style( ): ({ 
			'minHeight': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=float.view.tree.d.ts.map
declare namespace $ {

	type $mol_grid_table__sub_mol_grid_1 = $mol_type_enforce<
		ReturnType< $mol_grid['rows'] >
		,
		ReturnType< $mol_grid_table['sub'] >
	>
	type $mol_dimmer__needle_mol_grid_2 = $mol_type_enforce<
		ReturnType< $mol_grid['needle'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_grid_3 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_value'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_grid_row__cells_mol_grid_4 = $mol_type_enforce<
		ReturnType< $mol_grid['head_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_row__minimal_height_mol_grid_5 = $mol_type_enforce<
		ReturnType< $mol_grid['row_height'] >
		,
		ReturnType< $mol_grid_row['minimal_height'] >
	>
	type $mol_grid_row__minimal_width_mol_grid_6 = $mol_type_enforce<
		ReturnType< $mol_grid['minimal_width'] >
		,
		ReturnType< $mol_grid_row['minimal_width'] >
	>
	type $mol_grid_row__cells_mol_grid_7 = $mol_type_enforce<
		ReturnType< $mol_grid['cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_grid_cell__sub_mol_grid_8 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_text'] >
		,
		ReturnType< $mol_grid_cell['sub'] >
	>
	type $mol_grid_number__sub_mol_grid_9 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content_number'] >
		,
		ReturnType< $mol_grid_number['sub'] >
	>
	type $mol_float__dom_name_mol_grid_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_float['dom_name'] >
	>
	type $mol_float__sub_mol_grid_11 = $mol_type_enforce<
		ReturnType< $mol_grid['col_head_content'] >
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_check_expand__level_mol_grid_12 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_level'] >
		,
		ReturnType< $mol_check_expand['level'] >
	>
	type $mol_check_expand__label_mol_grid_13 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_content'] >
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_check_expand__expanded_mol_grid_14 = $mol_type_enforce<
		ReturnType< $mol_grid['cell_expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	export class $mol_grid extends $mol_view {
		rows( ): readonly($mol_view)[]
		Table( ): $mol_grid_table
		head_cells( ): readonly($mol_view)[]
		cells( id: any): readonly($mol_view)[]
		cell_content( id: any): readonly($mol_view_content)[]
		cell_content_text( id: any): ReturnType< $mol_grid['cell_content'] >
		cell_content_number( id: any): ReturnType< $mol_grid['cell_content'] >
		col_head_content( id: any): readonly($mol_view_content)[]
		cell_level( id: any): number
		cell_expanded( id: any, next?: boolean ): boolean
		needle( ): string
		cell_value( id: any): string
		Cell_dimmer( id: any): $mol_dimmer
		row_height( ): number
		row_ids( ): readonly(string[])[]
		row_id( id: any): any
		col_ids( ): readonly(any)[]
		records( ): Record<string, any>
		record( id: any): any
		hierarchy( ): any
		hierarchy_col( ): string
		minimal_width( ): number
		sub( ): readonly(any)[]
		Head( ): $mol_grid_row
		Row( id: any): $mol_grid_row
		Cell( id: any): $mol_view
		cell( id: any): any
		Cell_text( id: any): $mol_grid_cell
		Cell_number( id: any): $mol_grid_number
		Col_head( id: any): $mol_float
		Cell_branch( id: any): $mol_check_expand
		Cell_content( id: any): readonly(any)[]
	}
	
	export class $mol_grid_table extends $mol_list {
	}
	
	export class $mol_grid_row extends $mol_view {
		cells( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_grid_row['cells'] >
	}
	
	export class $mol_grid_cell extends $mol_view {
		minimal_height( ): number
	}
	
	export class $mol_grid_number extends $mol_grid_cell {
	}
	
}

//# sourceMappingURL=grid.view.tree.d.ts.map
declare namespace $ {

	export class $mol_image extends $mol_view {
		uri( ): string
		title( ): string
		loading( ): string
		decoding( ): string
		cors( ): any
		natural_width( ): number
		natural_height( ): number
		load( next?: any ): any
		dom_name( ): string
		attr( ): Record<string, any> & ReturnType< $mol_view['attr'] >
		event( ): Record<string, any>
		minimal_width( ): number
		minimal_height( ): number
	}
	
}

//# sourceMappingURL=image.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__uri_mol_link_iconed_1 = $mol_type_enforce<
		ReturnType< $mol_link_iconed['icon'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_image__title_mol_link_iconed_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	export class $mol_link_iconed extends $mol_link {
		icon( ): string
		Icon( ): $mol_image
		title( ): ReturnType< $mol_link_iconed['uri'] >
		sub( ): readonly(any)[]
		content( ): readonly(any)[]
		host( ): string
	}
	
}

//# sourceMappingURL=iconed.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_youtube extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__title_mol_embed_service_1 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_service_2 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_preview'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_frame__title_mol_embed_service_3 = $mol_type_enforce<
		ReturnType< $mol_embed_service['title'] >
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri_mol_embed_service_4 = $mol_type_enforce<
		ReturnType< $mol_embed_service['video_embed'] >
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_embed_service extends $mol_check {
		active( next?: boolean ): boolean
		title( ): string
		video_preview( ): string
		Image( ): $mol_image
		Hint( ): $mol_icon_youtube
		video_embed( ): string
		Frame( ): $mol_frame
		uri( ): string
		video_id( ): string
		checked( next?: ReturnType< $mol_embed_service['active'] > ): ReturnType< $mol_embed_service['active'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=service.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_youtube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=youtube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_rutube extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=rutube.view.tree.d.ts.map
declare namespace $ {

	export class $mol_embed_vklive extends $mol_embed_service {
	}
	
}

//# sourceMappingURL=vklive.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__title_mol_embed_any_1 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_embed_any_2 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_embed_native__title_mol_embed_any_3 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_native['title'] >
	>
	type $mol_embed_native__uri_mol_embed_any_4 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_native['uri'] >
	>
	type $mol_embed_youtube__title_mol_embed_any_5 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_youtube['title'] >
	>
	type $mol_embed_youtube__uri_mol_embed_any_6 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_youtube['uri'] >
	>
	type $mol_embed_rutube__title_mol_embed_any_7 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_rutube['title'] >
	>
	type $mol_embed_rutube__uri_mol_embed_any_8 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_rutube['uri'] >
	>
	type $mol_embed_vklive__title_mol_embed_any_9 = $mol_type_enforce<
		ReturnType< $mol_embed_any['title'] >
		,
		ReturnType< $mol_embed_vklive['title'] >
	>
	type $mol_embed_vklive__uri_mol_embed_any_10 = $mol_type_enforce<
		ReturnType< $mol_embed_any['uri'] >
		,
		ReturnType< $mol_embed_vklive['uri'] >
	>
	export class $mol_embed_any extends $mol_view {
		title( ): string
		uri( ): string
		Image( ): $mol_image
		Object( ): $mol_embed_native
		Youtube( ): $mol_embed_youtube
		Rutube( ): $mol_embed_rutube
		Vklive( ): $mol_embed_vklive
	}
	
}

//# sourceMappingURL=any.view.tree.d.ts.map
declare namespace $ {

	type $mol_text__text_mol_text_1 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_label'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__text_mol_text_2 = $mol_type_enforce<
		ReturnType< $mol_text['spoiler_content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_paragraph__sub_mol_text_3 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_text__uri_resolve_mol_text_4 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_5 = $mol_type_enforce<
		ReturnType< $mol_text['quote_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight_mol_text_6 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__auto_scroll_mol_text_7 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text_list__uri_resolve_mol_text_8 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_list['uri_resolve'] >
	>
	type $mol_text_list__type_mol_text_9 = $mol_type_enforce<
		ReturnType< $mol_text['list_type'] >
		,
		ReturnType< $mol_text_list['type'] >
	>
	type $mol_text_list__text_mol_text_10 = $mol_type_enforce<
		ReturnType< $mol_text['list_text'] >
		,
		ReturnType< $mol_text_list['text'] >
	>
	type $mol_text_list__highlight_mol_text_11 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_list['highlight'] >
	>
	type $mol_text_header__minimal_height_mol_text_12 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_text_header['minimal_height'] >
	>
	type $mol_text_header__level_mol_text_13 = $mol_type_enforce<
		ReturnType< $mol_text['header_level'] >
		,
		ReturnType< $mol_text_header['level'] >
	>
	type $mol_text_header__content_mol_text_14 = $mol_type_enforce<
		ReturnType< $mol_text['block_content'] >
		,
		ReturnType< $mol_text_header['content'] >
	>
	type $mol_text_header__arg_mol_text_15 = $mol_type_enforce<
		ReturnType< $mol_text['header_arg'] >
		,
		ReturnType< $mol_text_header['arg'] >
	>
	type $mol_text_code__text_mol_text_16 = $mol_type_enforce<
		ReturnType< $mol_text['pre_text'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__row_themes_mol_text_17 = $mol_type_enforce<
		ReturnType< $mol_text['pre_themes'] >
		,
		ReturnType< $mol_text_code['row_themes'] >
	>
	type $mol_text_code__highlight_mol_text_18 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__uri_resolve_mol_text_19 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	type $mol_text_code__sidebar_showed_mol_text_20 = $mol_type_enforce<
		ReturnType< $mol_text['pre_sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_view__dom_name_mol_text_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_grid__head_cells_mol_text_22 = $mol_type_enforce<
		ReturnType< $mol_text['table_head_cells'] >
		,
		ReturnType< $mol_grid['head_cells'] >
	>
	type $mol_grid__rows_mol_text_23 = $mol_type_enforce<
		ReturnType< $mol_text['table_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_24 = $mol_type_enforce<
		ReturnType< $mol_text['table_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_25 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_26 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_27 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_28 = $mol_type_enforce<
		ReturnType< $mol_text['table_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__rows_mol_text_29 = $mol_type_enforce<
		ReturnType< $mol_text['grid_rows'] >
		,
		ReturnType< $mol_grid['rows'] >
	>
	type $mol_grid_row__cells_mol_text_30 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cells'] >
		,
		ReturnType< $mol_grid_row['cells'] >
	>
	type $mol_text__auto_scroll_mol_text_31 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_text['auto_scroll'] >
	>
	type $mol_text__highlight_mol_text_32 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_text__uri_resolve_mol_text_33 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text['uri_resolve'] >
	>
	type $mol_text__text_mol_text_34 = $mol_type_enforce<
		ReturnType< $mol_text['grid_cell_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_dimmer__dom_name_mol_text_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['dom_name'] >
	>
	type $mol_dimmer__needle_mol_text_36 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_text_37 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_text_span__dom_name_mol_text_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_text_span['dom_name'] >
	>
	type $mol_text_span__type_mol_text_39 = $mol_type_enforce<
		ReturnType< $mol_text['line_type'] >
		,
		ReturnType< $mol_text_span['type'] >
	>
	type $mol_text_span__sub_mol_text_40 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_text_span['sub'] >
	>
	type $mol_text_code_line__numb_showed_mol_text_41 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code_line['numb_showed'] >
	>
	type $mol_text_code_line__highlight_mol_text_42 = $mol_type_enforce<
		ReturnType< $mol_text['highlight'] >
		,
		ReturnType< $mol_text_code_line['highlight'] >
	>
	type $mol_text_code_line__text_mol_text_43 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_text_code_line['text'] >
	>
	type $mol_text_code_line__uri_resolve_mol_text_44 = $mol_type_enforce<
		ReturnType< $mol_text['uri_resolve'] >
		,
		ReturnType< $mol_text_code_line['uri_resolve'] >
	>
	type $mol_text_code_line__syntax_mol_text_45 = $mol_type_enforce<
		ReturnType< $mol_text['code_syntax'] >
		,
		ReturnType< $mol_text_code_line['syntax'] >
	>
	type $mol_link_iconed__uri_mol_text_46 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_47 = $mol_type_enforce<
		ReturnType< $mol_text['line_content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_link_iconed__uri_mol_text_48 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_text_49 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_embed_any__uri_mol_text_50 = $mol_type_enforce<
		ReturnType< $mol_text['link_uri'] >
		,
		ReturnType< $mol_embed_any['uri'] >
	>
	type $mol_embed_any__title_mol_text_51 = $mol_type_enforce<
		ReturnType< $mol_text['line_text'] >
		,
		ReturnType< $mol_embed_any['title'] >
	>
	type $mol_expander__label_mol_text_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['label'] >
	>
	type $mol_expander__content_mol_text_53 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_text extends $mol_list {
		auto_scroll( ): any
		block_content( id: any): readonly(any)[]
		uri_resolve( id: any): string
		quote_text( id: any): string
		highlight( ): string
		list_type( id: any): string
		list_text( id: any): string
		header_level( id: any): number
		header_arg( id: any): Record<string, any>
		pre_text( id: any): string
		pre_themes( id: any): readonly(string)[]
		code_sidebar_showed( ): boolean
		pre_sidebar_showed( ): ReturnType< $mol_text['code_sidebar_showed'] >
		table_head_cells( id: any): readonly(any)[]
		table_rows( id: any): readonly(any)[]
		table_cells( id: any): readonly(any)[]
		table_cell_text( id: any): string
		grid_rows( id: any): readonly(any)[]
		grid_cells( id: any): readonly(any)[]
		grid_cell_text( id: any): string
		line_text( id: any): string
		line_type( id: any): string
		line_content( id: any): readonly(any)[]
		code_syntax( ): any
		link_uri( id: any): string
		link_host( id: any): string
		spoiler_label( id: any): string
		Spoiler_label( id: any): $mol_text
		spoiler_content( id: any): string
		Spoiler_content( id: any): $mol_text
		uri_base( ): string
		text( ): string
		param( ): string
		flow_tokens( ): readonly(any)[]
		block_text( id: any): string
		auto( ): readonly(any)[]
		Paragraph( id: any): $mol_paragraph
		Quote( id: any): $mol_text
		List( id: any): $mol_text_list
		item_index( id: any): number
		Header( id: any): $mol_text_header
		Pre( id: any): $mol_text_code
		Cut( id: any): $mol_view
		Table( id: any): $mol_grid
		Table_row( id: any): $mol_grid_row
		Table_cell( id: any): $mol_text
		Grid( id: any): $mol_grid
		Grid_row( id: any): $mol_grid_row
		Grid_cell( id: any): $mol_text
		String( id: any): $mol_dimmer
		Span( id: any): $mol_text_span
		Code_line( id: any): $mol_text_code_line
		Link( id: any): $mol_link_iconed
		Link_http( id: any): $mol_link_iconed
		Embed( id: any): $mol_embed_any
		Spoiler( id: any): $mol_expander
	}
	
	type $mol_link__arg_mol_text_header_1 = $mol_type_enforce<
		ReturnType< $mol_text_header['arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_mol_text_header_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_text_header_3 = $mol_type_enforce<
		ReturnType< $mol_text_header['content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_text_header extends $mol_paragraph {
		arg( ): Record<string, any>
		content( ): readonly(any)[]
		Link( ): $mol_link
		level( ): number
		sub( ): readonly(any)[]
	}
	
	export class $mol_text_span extends $mol_paragraph {
		type( ): string
		dom_name( ): string
		attr( ): ({ 
			'mol_text_type': ReturnType< $mol_text_span['type'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_list_item__index_mol_text_list_1 = $mol_type_enforce<
		ReturnType< $mol_text_list['item_index'] >
		,
		ReturnType< $mol_text_list_item['index'] >
	>
	type $mol_text_list_item__sub_mol_text_list_2 = $mol_type_enforce<
		ReturnType< $mol_text_list['block_content'] >
		,
		ReturnType< $mol_text_list_item['sub'] >
	>
	export class $mol_text_list extends $mol_text {
		type( ): string
		auto_scroll( ): any
		attr( ): ({ 
			'mol_text_list_type': ReturnType< $mol_text_list['type'] >,
		})  & ReturnType< $mol_text['attr'] >
		Paragraph( id: any): $mol_text_list_item
	}
	
	export class $mol_text_list_item extends $mol_paragraph {
		index( ): number
		attr( ): ({ 
			'mol_text_list_item_index': ReturnType< $mol_text_list_item['index'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_mol_app_demo_readme_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['source_link'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_link_source__hint_mol_app_demo_readme_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['source_hint'] >
		,
		ReturnType< $mol_link_source['hint'] >
	>
	type $mol_button_minor__hint_mol_app_demo_readme_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_app_demo_readme_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_app_demo_readme_5 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['close'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_text__text_mol_app_demo_readme_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['readme'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__uri_base_mol_app_demo_readme_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo_readme['uri_base'] >
		,
		ReturnType< $mol_text['uri_base'] >
	>
	type $mol_view__sub_mol_app_demo_readme_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_demo_readme extends $mol_page {
		source_link( ): string
		source_hint( ): string
		Source_link( ): $mol_link_source
		Close_icon( ): $mol_icon_close
		close( next?: any ): any
		Close( ): $mol_button_minor
		readme( ): string
		uri_base( next?: string ): string
		Not_found_caption( ): string
		readme_link_template( ): string
		source_link_template( ): string
		repo( ): string
		module( ): readonly(string)[]
		title( ): string
		opened( next?: boolean ): boolean
		tools( ): readonly(any)[]
		Readme( ): $mol_text
		Not_found( ): $mol_view
	}
	
}

//# sourceMappingURL=readme.view.tree.d.ts.map
declare namespace $ {

	export class $mol_status extends $mol_view {
		message( ): string
		status( ): ReturnType< $mol_status['title'] >
		minimal_height( ): number
		minimal_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_mol_app_demo_main_1 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['project_uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_text__text_mol_app_demo_main_2 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['description'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__uri_base_mol_app_demo_main_3 = $mol_type_enforce<
		ReturnType< $mol_app_demo_main['project_uri'] >
		,
		ReturnType< $mol_text['uri_base'] >
	>
	export class $mol_app_demo_main extends $mol_page {
		Lights( ): $mol_lights_toggle
		project_uri( ): string
		Project( ): $mol_link_source
		description( ): string
		Description( ): $mol_text
		minimal_width( ): number
		title( ): string
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=main.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_app_demo_1 = $mol_type_enforce<
		({ 
			F( next?: ReturnType< $mol_app_demo['search_start'] > ): ReturnType< $mol_app_demo['search_start'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__mod_ctrl_mol_app_demo_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type __mol_app_demo_3 = $mol_type_enforce<
		Parameters< $mol_app_demo['search_start'] >[0]
		,
		Parameters< ReturnType< $mol_app_demo['Menu'] >['search_start'] >[0]
	>
	type $mol_link_source__uri_mol_app_demo_4 = $mol_type_enforce<
		ReturnType< $mol_app_demo['sources_uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type __mol_app_demo_5 = $mol_type_enforce<
		Parameters< $mol_app_demo['chat_pages'] >[0]
		,
		Parameters< $mol_app_demo['Detail'] >[0]
	>
	type $mol_app_demo_menu__title_mol_app_demo_6 = $mol_type_enforce<
		ReturnType< $mol_app_demo['menu_title'] >
		,
		ReturnType< $mol_app_demo_menu['title'] >
	>
	type $mol_app_demo_menu__names_mol_app_demo_7 = $mol_type_enforce<
		ReturnType< $mol_app_demo['names'] >
		,
		ReturnType< $mol_app_demo_menu['names'] >
	>
	type $mol_app_demo_menu__widget_tags_mol_app_demo_8 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_tags'] >
		,
		ReturnType< $mol_app_demo_menu['widget_tags'] >
	>
	type $mol_app_demo_menu__widget_aspects_mol_app_demo_9 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_aspects'] >
		,
		ReturnType< $mol_app_demo_menu['widget_aspects'] >
	>
	type $mol_app_demo_menu__widget_title_mol_app_demo_10 = $mol_type_enforce<
		ReturnType< $mol_app_demo['widget_title'] >
		,
		ReturnType< $mol_app_demo_menu['widget_title'] >
	>
	type $mol_app_demo_menu__tools_mol_app_demo_11 = $mol_type_enforce<
		ReturnType< $mol_app_demo['tools'] >
		,
		ReturnType< $mol_app_demo_menu['tools'] >
	>
	type $mol_app_demo_detail__chat_seed_mol_app_demo_12 = $mol_type_enforce<
		ReturnType< $mol_app_demo['chat_seed'] >
		,
		ReturnType< $mol_app_demo_detail['chat_seed'] >
	>
	type $mol_app_demo_detail__title_mol_app_demo_13 = $mol_type_enforce<
		ReturnType< $mol_app_demo['detail_title'] >
		,
		ReturnType< $mol_app_demo_detail['title'] >
	>
	type $mol_app_demo_detail__description_mol_app_demo_14 = $mol_type_enforce<
		ReturnType< $mol_app_demo['detail_description'] >
		,
		ReturnType< $mol_app_demo_detail['description'] >
	>
	type $mol_app_demo_detail__edit_uri_mol_app_demo_15 = $mol_type_enforce<
		ReturnType< $mol_app_demo['edit_uri'] >
		,
		ReturnType< $mol_app_demo_detail['edit_uri'] >
	>
	type $mol_app_demo_detail__readme_mol_app_demo_16 = $mol_type_enforce<
		ReturnType< $mol_app_demo['readme_page'] >
		,
		ReturnType< $mol_app_demo_detail['readme'] >
	>
	type $mol_app_demo_detail__Demo_mol_app_demo_17 = $mol_type_enforce<
		ReturnType< $mol_app_demo['Demo'] >
		,
		ReturnType< $mol_app_demo_detail['Demo'] >
	>
	type $mol_app_demo_readme__repo_mol_app_demo_18 = $mol_type_enforce<
		ReturnType< $mol_app_demo['repo'] >
		,
		ReturnType< $mol_app_demo_readme['repo'] >
	>
	type $mol_app_demo_readme__opened_mol_app_demo_19 = $mol_type_enforce<
		ReturnType< $mol_app_demo['readme_page'] >
		,
		ReturnType< $mol_app_demo_readme['opened'] >
	>
	type $mol_app_demo_readme__module_mol_app_demo_20 = $mol_type_enforce<
		ReturnType< $mol_app_demo['module'] >
		,
		ReturnType< $mol_app_demo_readme['module'] >
	>
	type $mol_status__sub_mol_app_demo_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_status['sub'] >
	>
	export class $mol_app_demo extends $mol_book2 {
		detail_title( ): string
		Theme( ): $mol_theme_auto
		Search_start( ): $mol_hotkey
		menu_title( ): string
		names( ): readonly(string)[]
		widget_tags( id: any): readonly(string)[]
		widget_aspects( id: any): readonly(string)[]
		widget_title( id: any): string
		search_start( next?: ReturnType< ReturnType< $mol_app_demo['Menu'] >['search_start'] > ): ReturnType< ReturnType< $mol_app_demo['Menu'] >['search_start'] >
		sources_uri( ): string
		Sources( ): $mol_link_source
		Lights( ): $mol_lights_toggle
		tools( ): readonly(any)[]
		chat_seed( id: any): string
		chat_pages( id: any): ReturnType< ReturnType< $mol_app_demo['Detail'] >['chat_pages'] >
		detail_description( ): string
		edit_uri( ): string
		readme_page( next?: boolean ): boolean
		Demo( ): $mol_view
		repo( ): string
		module( ): readonly(string)[]
		detail_empty_prefix( ): string
		selected( ): string
		detail_empty_postfix( ): string
		editor_title( ): ReturnType< $mol_app_demo['detail_title'] >
		meta_bundle_base( ): string
		repo_dict( ): Record<string, any>
		plugins( ): readonly(any)[]
		demo_block_list( ): readonly(any)[]
		Menu( ): $mol_app_demo_menu
		Detail( id: any): $mol_app_demo_detail
		Readme_page( ): $mol_app_demo_readme
		Detail_empty_message( ): $mol_status
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $jin_keyboard_row__layout_jin_keyboard_1 = $mol_type_enforce<
		ReturnType< $jin_keyboard['row_layout'] >
		,
		ReturnType< $jin_keyboard_row['layout'] >
	>
	type $jin_keyboard_row__turn_jin_keyboard_2 = $mol_type_enforce<
		ReturnType< $jin_keyboard['row_turn'] >
		,
		ReturnType< $jin_keyboard_row['turn'] >
	>
	type $jin_keyboard_row__input_jin_keyboard_3 = $mol_type_enforce<
		ReturnType< $jin_keyboard['row_input'] >
		,
		ReturnType< $jin_keyboard_row['input'] >
	>
	type $jin_keyboard_row__upcase_jin_keyboard_4 = $mol_type_enforce<
		ReturnType< $jin_keyboard['upcase'] >
		,
		ReturnType< $jin_keyboard_row['upcase'] >
	>
	export class $jin_keyboard extends $mol_view {
		row_layout( id: any): readonly(any)[]
		row_turn( id: any, next?: any ): any
		row_input( id: any, next?: any ): any
		upcase( next?: boolean ): boolean
		area( ): $mol_view
		turn( next?: any ): any
		input( next?: any ): any
		Row( id: any): $jin_keyboard_row
		sub( ): readonly(any)[]
		layout( next?: string ): string
		layouts( ): ({ 
			'': readonly(any)[],
			' ': readonly(any)[],
			'0': readonly(any)[],
			'П': readonly(any)[],
			'И': readonly(any)[],
			'Б': readonly(any)[],
			'.': readonly(any)[],
			'"': readonly(any)[],
			'+': readonly(any)[],
			'@': readonly(any)[],
			'F': readonly(any)[],
			'I': readonly(any)[],
			'N': readonly(any)[],
		}) 
	}
	
	type $jin_keyboard_cell__symbol_jin_keyboard_row_1 = $mol_type_enforce<
		ReturnType< $jin_keyboard_row['cell_title'] >
		,
		ReturnType< $jin_keyboard_cell['symbol'] >
	>
	type $jin_keyboard_cell__turn_jin_keyboard_row_2 = $mol_type_enforce<
		ReturnType< $jin_keyboard_row['cell_turn'] >
		,
		ReturnType< $jin_keyboard_cell['turn'] >
	>
	type $jin_keyboard_cell__input_jin_keyboard_row_3 = $mol_type_enforce<
		ReturnType< $jin_keyboard_row['cell_input'] >
		,
		ReturnType< $jin_keyboard_cell['input'] >
	>
	type $jin_keyboard_cell__upcase_jin_keyboard_row_4 = $mol_type_enforce<
		ReturnType< $jin_keyboard_row['upcase'] >
		,
		ReturnType< $jin_keyboard_cell['upcase'] >
	>
	export class $jin_keyboard_row extends $mol_view {
		cell_title( id: any): string
		cell_turn( id: any, next?: any ): any
		cell_input( id: any, next?: any ): any
		upcase( ): boolean
		turn( next?: any ): any
		input( next?: any ): any
		layout( ): readonly(any)[]
		Cell( id: any): $jin_keyboard_cell
		sub( ): readonly(any)[]
	}
	
	export class $jin_keyboard_cell extends $mol_view {
		start( next?: any ): any
		end( next?: any ): any
		abort( next?: any ): any
		symbol( ): string
		title( ): ReturnType< $jin_keyboard_cell['symbol'] >
		turn( next?: any ): any
		input( next?: any ): any
		upcase( ): boolean
		event( ): ({ 
			pointerdown( next?: ReturnType< $jin_keyboard_cell['start'] > ): ReturnType< $jin_keyboard_cell['start'] >,
			pointerup( next?: ReturnType< $jin_keyboard_cell['end'] > ): ReturnType< $jin_keyboard_cell['end'] >,
			pointercancel( next?: ReturnType< $jin_keyboard_cell['abort'] > ): ReturnType< $jin_keyboard_cell['abort'] >,
		})  & ReturnType< $mol_view['event'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=keyboard.view.tree.d.ts.map
declare namespace $ {

	type $jin_keyboard__area_jin_keyboard_demo_1 = $mol_type_enforce<
		ReturnType< $jin_keyboard_demo['Area'] >
		,
		ReturnType< $jin_keyboard['area'] >
	>
	type $mol_list__rows_jin_keyboard_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $jin_keyboard_demo extends $mol_example_small {
		Area( ): $mol_string
		keyboard( ): $jin_keyboard
		Content( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $rise_drag extends $mol_plugin {
		pointerdown( next?: any ): any
		dragged( next?: boolean ): boolean
		x( next?: number ): number
		y( next?: number ): number
		repos_x( id: any): number
		repos_y( id: any): number
		on_drag( next?: any ): any
		on_drag_start( next?: any ): any
		on_drag_end( next?: any ): any
		drag( next?: any ): any
		drag_start( next?: any ): any
		drag_end( next?: any ): any
		use_buttons( ): readonly(any)[]
		event( ): ({ 
			pointerdown( next?: ReturnType< $rise_drag['pointerdown'] > ): ReturnType< $rise_drag['pointerdown'] >,
		})  & ReturnType< $mol_plugin['event'] >
		attr( ): ({ 
			'rise_dragged': ReturnType< $rise_drag['dragged'] >,
		})  & ReturnType< $mol_plugin['attr'] >
		drags_synced( ): readonly($rise_drag)[]
	}
	
}

//# sourceMappingURL=drag.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_card_1 = $mol_type_enforce<
		ReturnType< $mol_card['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_card_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_card_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_card extends $mol_list {
		status( ): string
		content( ): readonly($mol_view_content)[]
		Content( ): $mol_view
		status_text( ): ReturnType< $mol_card['status'] >
		Status( ): $mol_view
		attr( ): ({ 
			'mol_card_status_type': ReturnType< $mol_card['status'] >,
		})  & ReturnType< $mol_list['attr'] >
		rows( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=card.view.tree.d.ts.map
declare namespace $ {

	type __rise_drag_view_1 = $mol_type_enforce<
		Parameters< $rise_drag_view['pointerdown'] >[0]
		,
		Parameters< ReturnType< $rise_drag_view['Drag'] >['pointerdown'] >[0]
	>
	type $rise_drag__on_drag_start_rise_drag_view_2 = $mol_type_enforce<
		ReturnType< $rise_drag_view['on_drag_start'] >
		,
		ReturnType< $rise_drag['on_drag_start'] >
	>
	type $rise_drag__on_drag_end_rise_drag_view_3 = $mol_type_enforce<
		ReturnType< $rise_drag_view['on_drag_end'] >
		,
		ReturnType< $rise_drag['on_drag_end'] >
	>
	type $rise_drag__on_drag_rise_drag_view_4 = $mol_type_enforce<
		ReturnType< $rise_drag_view['on_drag'] >
		,
		ReturnType< $rise_drag['on_drag'] >
	>
	type $rise_drag__y_rise_drag_view_5 = $mol_type_enforce<
		ReturnType< $rise_drag_view['y'] >
		,
		ReturnType< $rise_drag['y'] >
	>
	type $rise_drag__x_rise_drag_view_6 = $mol_type_enforce<
		ReturnType< $rise_drag_view['x'] >
		,
		ReturnType< $rise_drag['x'] >
	>
	type $rise_drag__drags_synced_rise_drag_view_7 = $mol_type_enforce<
		ReturnType< $rise_drag_view['drags_synced'] >
		,
		ReturnType< $rise_drag['drags_synced'] >
	>
	type $rise_drag__repos_x_rise_drag_view_8 = $mol_type_enforce<
		ReturnType< $rise_drag_view['repos_x'] >
		,
		ReturnType< $rise_drag['repos_x'] >
	>
	type $rise_drag__repos_y_rise_drag_view_9 = $mol_type_enforce<
		ReturnType< $rise_drag_view['repos_y'] >
		,
		ReturnType< $rise_drag['repos_y'] >
	>
	export class $rise_drag_view extends $mol_view {
		on_drag_start( next?: any ): any
		on_drag_end( next?: any ): any
		on_drag( next?: any ): any
		dragged( ): ReturnType< ReturnType< $rise_drag_view['Drag'] >['dragged'] >
		y( next?: number ): number
		x( next?: number ): number
		drags_synced( ): readonly($rise_drag)[]
		repos_x( id: any): number
		repos_y( id: any): number
		pointerdown( next?: ReturnType< ReturnType< $rise_drag_view['Drag'] >['pointerdown'] > ): ReturnType< ReturnType< $rise_drag_view['Drag'] >['pointerdown'] >
		Drag( ): $rise_drag
		plugins( ): readonly(any)[]
		style( ): ({ 
			'userSelect': string,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=view.view.tree.d.ts.map
declare namespace $ {

	export class $rise_drag_absolute extends $rise_drag_view {
		top( next?: number ): number
		left( next?: number ): number
		top_px( ): string
		left_px( ): string
		y( next?: ReturnType< $rise_drag_absolute['top'] > ): ReturnType< $rise_drag_absolute['top'] >
		x( next?: ReturnType< $rise_drag_absolute['left'] > ): ReturnType< $rise_drag_absolute['left'] >
		style( ): ({ 
			'position': string,
			'top': ReturnType< $rise_drag_absolute['top_px'] >,
			'left': ReturnType< $rise_drag_absolute['left_px'] >,
		})  & ReturnType< $rise_drag_view['style'] >
	}
	
}

//# sourceMappingURL=absolute.view.tree.d.ts.map
declare namespace $ {

	type $mol_card__title_rise_drag_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $rise_drag_absolute__sub_rise_drag_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_drag_absolute['sub'] >
	>
	type $rise_drag_absolute__drags_synced_rise_drag_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_drag_absolute['drags_synced'] >
	>
	type $mol_card__title_rise_drag_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $rise_drag_absolute__top_rise_drag_demo_5 = $mol_type_enforce<
		ReturnType< $rise_drag_demo['top'] >
		,
		ReturnType< $rise_drag_absolute['top'] >
	>
	type $rise_drag_absolute__left_rise_drag_demo_6 = $mol_type_enforce<
		ReturnType< $rise_drag_demo['left'] >
		,
		ReturnType< $rise_drag_absolute['left'] >
	>
	type $rise_drag_absolute__sub_rise_drag_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_drag_absolute['sub'] >
	>
	export class $rise_drag_demo extends $mol_example_small {
		Card( ): $mol_card
		Draggable( ): $rise_drag_absolute
		top( next?: number ): number
		left( next?: number ): number
		Synced_drag( ): ReturnType< ReturnType< $rise_drag_demo['Synced'] >['Drag'] >
		Synced_card( ): $mol_card
		Synced( ): $rise_drag_absolute
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type __rise_resize_1 = $mol_type_enforce<
		Parameters< $rise_resize['drag_pointerdown'] >[0]
		,
		Parameters< ReturnType< $rise_resize['Drag_view'] >['pointerdown'] >[0]
	>
	type $rise_drag_view__minimal_height_rise_resize_2 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_drag_view['minimal_height'] >
	>
	type $rise_drag_view__sub_rise_resize_3 = $mol_type_enforce<
		ReturnType< $rise_resize['drag_body'] >
		,
		ReturnType< $rise_drag_view['sub'] >
	>
	type $rise_drag_view__x_rise_resize_4 = $mol_type_enforce<
		ReturnType< $rise_resize['x'] >
		,
		ReturnType< $rise_drag_view['x'] >
	>
	type $rise_drag_view__y_rise_resize_5 = $mol_type_enforce<
		ReturnType< $rise_resize['y'] >
		,
		ReturnType< $rise_drag_view['y'] >
	>
	type $rise_drag_view__on_drag_start_rise_resize_6 = $mol_type_enforce<
		ReturnType< $rise_resize['on_drag_start'] >
		,
		ReturnType< $rise_drag_view['on_drag_start'] >
	>
	type $rise_drag_view__on_drag_end_rise_resize_7 = $mol_type_enforce<
		ReturnType< $rise_resize['on_drag_end'] >
		,
		ReturnType< $rise_drag_view['on_drag_end'] >
	>
	type $rise_drag_view__drags_synced_rise_resize_8 = $mol_type_enforce<
		ReturnType< $rise_resize['drags_synced'] >
		,
		ReturnType< $rise_drag_view['drags_synced'] >
	>
	type $rise_drag_view__repos_x_rise_resize_9 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_drag_view['repos_x'] >
	>
	type $rise_drag_view__repos_y_rise_resize_10 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_drag_view['repos_y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_11 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_12 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_13 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_14 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_15 = $mol_type_enforce<
		ReturnType< $rise_resize['top_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_16 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_17 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_18 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_19 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_20 = $mol_type_enforce<
		ReturnType< $rise_resize['left_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_21 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_22 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_23 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_24 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_25 = $mol_type_enforce<
		ReturnType< $rise_resize['bottom_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_26 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_27 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_28 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_29 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_30 = $mol_type_enforce<
		ReturnType< $rise_resize['right_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_31 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_32 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_33 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_34 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_35 = $mol_type_enforce<
		ReturnType< $rise_resize['top_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__x_rise_resize_36 = $mol_type_enforce<
		ReturnType< $rise_resize['left_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_37 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_38 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_39 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_40 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_41 = $mol_type_enforce<
		ReturnType< $rise_resize['top_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__x_rise_resize_42 = $mol_type_enforce<
		ReturnType< $rise_resize['right_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_43 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_44 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_45 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_46 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_47 = $mol_type_enforce<
		ReturnType< $rise_resize['bottom_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__x_rise_resize_48 = $mol_type_enforce<
		ReturnType< $rise_resize['left_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_49 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_50 = $mol_type_enforce<
		ReturnType< $rise_resize['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_51 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_52 = $mol_type_enforce<
		ReturnType< $rise_resize['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_53 = $mol_type_enforce<
		ReturnType< $rise_resize['bottom_edge_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__x_rise_resize_54 = $mol_type_enforce<
		ReturnType< $rise_resize['right_edge_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	export class $rise_resize extends $mol_view {
		drag_body( ): readonly(any)[]
		x( next?: number ): number
		y( next?: number ): number
		on_drag_start( next?: any ): any
		on_drag_end( next?: any ): any
		dragged( ): ReturnType< ReturnType< $rise_resize['Drag_view'] >['dragged'] >
		drags_synced( ): readonly($rise_drag)[]
		Drag( ): ReturnType< ReturnType< $rise_resize['Drag_view'] >['Drag'] >
		repos_x( id: any): number
		repos_y( id: any): number
		drag_pointerdown( next?: ReturnType< ReturnType< $rise_resize['Drag_view'] >['pointerdown'] > ): ReturnType< ReturnType< $rise_resize['Drag_view'] >['pointerdown'] >
		Drag_view( ): $rise_drag_view
		controls( ): readonly(any)[]
		resize_start( next?: any ): any
		resize_end( next?: any ): any
		top_edge_y( next?: number ): number
		Top_edge( ): $rise_resize_edge
		left_edge_x( next?: number ): number
		Left_edge( ): $rise_resize_edge
		bottom_edge_y( next?: number ): number
		Bottom_edge( ): $rise_resize_edge
		right_edge_x( next?: number ): number
		Right_edge( ): $rise_resize_edge
		Top_left_edge( ): $rise_resize_edge
		Top_right_edge( ): $rise_resize_edge
		Bottom_left_edge( ): $rise_resize_edge
		Bottom_right_edge( ): $rise_resize_edge
		edges( ): readonly(any)[]
		top_px( ): string
		left_px( ): string
		height_px( ): string
		width_px( ): string
		sub( ): readonly(any)[]
		resizing( next?: boolean ): boolean
		transforming( ): boolean
		height_min( ): number
		width_min( ): number
		height( next?: number ): number
		width( next?: number ): number
		top( next?: number ): number
		left( next?: number ): number
		stick_threshold( ): number
		x_stick( next?: number ): number
		y_stick( next?: number ): number
		bottom_edge_y_stick( next?: ReturnType< $rise_resize['height_min'] > ): ReturnType< $rise_resize['height_min'] >
		right_edge_x_stick( next?: ReturnType< $rise_resize['width_min'] > ): ReturnType< $rise_resize['width_min'] >
		top_edge_y_stick( next?: number ): number
		left_edge_x_stick( next?: number ): number
		stickable( next?: boolean ): boolean
		sticks_y( ): readonly(number)[]
		sticks_x( ): readonly(number)[]
		auto( ): readonly(any)[]
		style( ): ({ 
			'top': ReturnType< $rise_resize['top_px'] >,
			'left': ReturnType< $rise_resize['left_px'] >,
			'height': ReturnType< $rise_resize['height_px'] >,
			'width': ReturnType< $rise_resize['width_px'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
	export class $rise_resize_edge extends $rise_drag_view {
	}
	
}

//# sourceMappingURL=resize.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_tick extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=tick.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_box extends $mol_check {
		Icon( ): $mol_icon_tick
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {

	type __rise_resize_demo_1 = $mol_type_enforce<
		Parameters< $rise_resize_demo['stickable'] >[0]
		,
		Parameters< ReturnType< $rise_resize_demo['Resize'] >['stickable'] >[0]
	>
	type $mol_check_box__title_rise_resize_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_rise_resize_demo_3 = $mol_type_enforce<
		ReturnType< $rise_resize_demo['stickable'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_text__text_rise_resize_demo_4 = $mol_type_enforce<
		ReturnType< $rise_resize_demo['content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $rise_resize__height_min_rise_resize_demo_5 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_resize['height_min'] >
	>
	type $rise_resize__width_min_rise_resize_demo_6 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_resize['width_min'] >
	>
	type $rise_resize__drag_body_rise_resize_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_resize['drag_body'] >
	>
	type $rise_resize__sticks_y_rise_resize_demo_8 = $mol_type_enforce<
		ReturnType< $rise_resize_demo['sticks_y'] >
		,
		ReturnType< $rise_resize['sticks_y'] >
	>
	type $rise_resize__sticks_x_rise_resize_demo_9 = $mol_type_enforce<
		ReturnType< $rise_resize_demo['sticks_x'] >
		,
		ReturnType< $rise_resize['sticks_x'] >
	>
	type $mol_view__style_rise_resize_demo_10 = $mol_type_enforce<
		({ 
			'left': ReturnType< $rise_resize_demo['stick_left'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_rise_resize_demo_11 = $mol_type_enforce<
		({ 
			'top': ReturnType< $rise_resize_demo['stick_top'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $rise_resize_demo extends $mol_example_small {
		height( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['height'] >
		width( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['width'] >
		top( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['top'] >
		left( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['left'] >
		x( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['x'] >
		y( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['y'] >
		bottom_edge_y( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['bottom_edge_y'] >
		right_edge_x( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['right_edge_x'] >
		top_edge_y( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['top_edge_y'] >
		left_edge_x( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['left_edge_x'] >
		x_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['x_stick'] >
		y_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['y_stick'] >
		bottom_edge_y_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['bottom_edge_y_stick'] >
		right_edge_x_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['right_edge_x_stick'] >
		top_edge_y_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['top_edge_y_stick'] >
		left_edge_x_stick( ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['left_edge_x_stick'] >
		stickable( next?: ReturnType< ReturnType< $rise_resize_demo['Resize'] >['stickable'] > ): ReturnType< ReturnType< $rise_resize_demo['Resize'] >['stickable'] >
		Stickable( ): $mol_check_box
		content( ): string
		Content( ): $mol_text
		sticks_y( ): readonly(any)[]
		sticks_x( ): readonly(any)[]
		Resize( ): $rise_resize
		sticks( ): readonly(any)[]
		stick_left( id: any): string
		stick_top( id: any): string
		sub( ): readonly(any)[]
		Stick_x( id: any): $mol_view
		Stick_y( id: any): $mol_view
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $rise_resize_edge__repos_x_rise_resize_ratio_1 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_2 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_3 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_4 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_ratio_5 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['left_top_edge_ratio_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_6 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_7 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_8 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_9 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_ratio_10 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['left_bottom_edge_ratio_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_11 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_12 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_13 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_14 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_ratio_15 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['right_bottom_edge_ratio_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_16 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_17 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_18 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_19 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__x_rise_resize_ratio_20 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['right_top_edge_ratio_x'] >
		,
		ReturnType< $rise_resize_edge['x'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_21 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_22 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_23 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_24 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_ratio_25 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['top_left_edge_ratio_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_26 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_27 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_28 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_29 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_ratio_30 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['top_right_edge_ratio_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_31 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_32 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_33 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_34 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_ratio_35 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['bottom_left_edge_ratio_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	type $rise_resize_edge__repos_x_rise_resize_ratio_36 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_x'] >
		,
		ReturnType< $rise_resize_edge['repos_x'] >
	>
	type $rise_resize_edge__repos_y_rise_resize_ratio_37 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['repos_y'] >
		,
		ReturnType< $rise_resize_edge['repos_y'] >
	>
	type $rise_resize_edge__on_drag_start_rise_resize_ratio_38 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_start'] >
		,
		ReturnType< $rise_resize_edge['on_drag_start'] >
	>
	type $rise_resize_edge__on_drag_end_rise_resize_ratio_39 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['resize_end'] >
		,
		ReturnType< $rise_resize_edge['on_drag_end'] >
	>
	type $rise_resize_edge__y_rise_resize_ratio_40 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio['bottom_right_edge_ratio_y'] >
		,
		ReturnType< $rise_resize_edge['y'] >
	>
	export class $rise_resize_ratio extends $rise_resize {
		left_top_edge_ratio_x( next?: number ): number
		Left_top_edge_ratio( ): $rise_resize_edge
		left_bottom_edge_ratio_x( next?: number ): number
		Left_bottom_edge_ratio( ): $rise_resize_edge
		right_bottom_edge_ratio_x( next?: number ): number
		Right_bottom_edge_ratio( ): $rise_resize_edge
		right_top_edge_ratio_x( next?: number ): number
		Right_top_edge_ratio( ): $rise_resize_edge
		top_left_edge_ratio_y( next?: number ): number
		Top_left_edge_ratio( ): $rise_resize_edge
		top_right_edge_ratio_y( next?: number ): number
		Top_right_edge_ratio( ): $rise_resize_edge
		bottom_left_edge_ratio_y( next?: number ): number
		Bottom_left_edge_ratio( ): $rise_resize_edge
		bottom_right_edge_ratio_y( next?: number ): number
		Bottom_right_edge_ratio( ): $rise_resize_edge
		ratio( ): number
		edges_ratio( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=ratio.view.tree.d.ts.map
declare namespace $ {

	type $mol_text__text_rise_resize_ratio_demo_1 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio_demo['content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $rise_resize_ratio__height_min_rise_resize_ratio_demo_2 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_resize_ratio['height_min'] >
	>
	type $rise_resize_ratio__width_min_rise_resize_ratio_demo_3 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_resize_ratio['width_min'] >
	>
	type $rise_resize_ratio__ratio_rise_resize_ratio_demo_4 = $mol_type_enforce<
		number
		,
		ReturnType< $rise_resize_ratio['ratio'] >
	>
	type $rise_resize_ratio__drag_body_rise_resize_ratio_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_resize_ratio['drag_body'] >
	>
	type $rise_resize_ratio__sticks_y_rise_resize_ratio_demo_6 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio_demo['sticks_y'] >
		,
		ReturnType< $rise_resize_ratio['sticks_y'] >
	>
	type $rise_resize_ratio__sticks_x_rise_resize_ratio_demo_7 = $mol_type_enforce<
		ReturnType< $rise_resize_ratio_demo['sticks_x'] >
		,
		ReturnType< $rise_resize_ratio['sticks_x'] >
	>
	type $mol_view__style_rise_resize_ratio_demo_8 = $mol_type_enforce<
		({ 
			'left': ReturnType< $rise_resize_ratio_demo['stick_left'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	type $mol_view__style_rise_resize_ratio_demo_9 = $mol_type_enforce<
		({ 
			'top': ReturnType< $rise_resize_ratio_demo['stick_top'] >,
		}) 
		,
		ReturnType< $mol_view['style'] >
	>
	export class $rise_resize_ratio_demo extends $mol_example_small {
		height( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['height'] >
		width( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['width'] >
		top( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['top'] >
		left( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['left'] >
		x( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['x'] >
		y( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['y'] >
		bottom_edge_y( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['bottom_edge_y'] >
		right_edge_x( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['right_edge_x'] >
		top_edge_y( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['top_edge_y'] >
		left_edge_x( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['left_edge_x'] >
		x_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['x_stick'] >
		y_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['y_stick'] >
		bottom_edge_y_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['bottom_edge_y_stick'] >
		right_edge_x_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['right_edge_x_stick'] >
		top_edge_y_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['top_edge_y_stick'] >
		left_edge_x_stick( ): ReturnType< ReturnType< $rise_resize_ratio_demo['Resize'] >['left_edge_x_stick'] >
		content( ): string
		Content( ): $mol_text
		sticks_y( ): readonly(any)[]
		sticks_x( ): readonly(any)[]
		Resize( ): $rise_resize_ratio
		sticks( ): readonly(any)[]
		stick_left( id: any): string
		stick_top( id: any): string
		sub( ): readonly(any)[]
		Stick_x( id: any): $mol_view
		Stick_y( id: any): $mol_view
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $rise_toggle extends $mol_check {
		minimal_height( ): number
		minimal_width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=toggle.view.tree.d.ts.map
declare namespace $ {

	export class $rise_toggle_demo extends $mol_example_small {
		Toggle( ): $rise_toggle
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_rise_range_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_rise_range_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $rise_range_input__disabled_rise_range_5 = $mol_type_enforce<
		ReturnType< $rise_range['disabled'] >
		,
		ReturnType< $rise_range_input['disabled'] >
	>
	type $rise_range_input__min_rise_range_6 = $mol_type_enforce<
		ReturnType< $rise_range['min'] >
		,
		ReturnType< $rise_range_input['min'] >
	>
	type $rise_range_input__max_rise_range_7 = $mol_type_enforce<
		ReturnType< $rise_range['max'] >
		,
		ReturnType< $rise_range_input['max'] >
	>
	type $rise_range_input__step_rise_range_8 = $mol_type_enforce<
		ReturnType< $rise_range['step'] >
		,
		ReturnType< $rise_range_input['step'] >
	>
	type $rise_range_input__value_rise_range_9 = $mol_type_enforce<
		ReturnType< $rise_range['value'] >
		,
		ReturnType< $rise_range_input['value'] >
	>
	type $rise_range_input__event_input_rise_range_10 = $mol_type_enforce<
		ReturnType< $rise_range['event_input'] >
		,
		ReturnType< $rise_range_input['event_input'] >
	>
	type $rise_range_value__sub_rise_range_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_range_value['sub'] >
	>
	type $rise_range_value__disabled_rise_range_12 = $mol_type_enforce<
		ReturnType< $rise_range['disabled'] >
		,
		ReturnType< $rise_range_value['disabled'] >
	>
	type $mol_view__sub_rise_range_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $rise_range extends $mol_view {
		label_min( ): string
		Min( ): $mol_view
		label_medium( ): string
		Medium( ): $mol_view
		label_max( ): string
		Max( ): $mol_view
		Labels( ): $mol_view
		disabled( ): boolean
		min( next?: number ): number
		max( next?: number ): number
		step( next?: number ): number
		value( next?: number ): number
		event_input( next?: any ): any
		Input( ): $rise_range_input
		Value( ): $rise_range_value
		Current( ): $mol_view
		percent( ): string
		minimal_height( ): number
		unit( ): string
		medium( next?: number ): number
		enabled( ): boolean
		sub( ): readonly(any)[]
		attr( ): ({ 
			'disabled': ReturnType< $rise_range['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'--rise_range_percent': ReturnType< $rise_range['percent'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
	export class $rise_range_input extends $mol_view {
		disabled( ): boolean
		min( next?: number ): number
		max( next?: number ): number
		step( next?: number ): number
		value( next?: number ): number
		event_input( next?: any ): any
		dom_name( ): string
		attr( ): ({ 
			'type': string,
			'disabled': ReturnType< $rise_range_input['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
		field( ): ({ 
			'min': ReturnType< $rise_range_input['min'] >,
			'max': ReturnType< $rise_range_input['max'] >,
			'step': ReturnType< $rise_range_input['step'] >,
			'value': ReturnType< $rise_range_input['value'] >,
		})  & ReturnType< $mol_view['field'] >
		event( ): ({ 
			input( next?: ReturnType< $rise_range_input['event_input'] > ): ReturnType< $rise_range_input['event_input'] >,
		})  & ReturnType< $mol_view['event'] >
	}
	
	export class $rise_range_value extends $mol_view {
		disabled( ): boolean
		attr( ): ({ 
			'disabled': ReturnType< $rise_range_value['disabled'] >,
		})  & ReturnType< $mol_view['attr'] >
	}
	
}

//# sourceMappingURL=range.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_left extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=left.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_chevron_right extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=right.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_mol_number_1 = $mol_type_enforce<
		({ 
			down( next?: ReturnType< $mol_number['event_dec'] > ): ReturnType< $mol_number['event_dec'] >,
			up( next?: ReturnType< $mol_number['event_inc'] > ): ReturnType< $mol_number['event_inc'] >,
			pageDown( next?: ReturnType< $mol_number['event_dec_boost'] > ): ReturnType< $mol_number['event_dec_boost'] >,
			pageUp( next?: ReturnType< $mol_number['event_inc_boost'] > ): ReturnType< $mol_number['event_inc_boost'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_button_minor__event_click_mol_number_2 = $mol_type_enforce<
		ReturnType< $mol_number['event_dec'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_3 = $mol_type_enforce<
		ReturnType< $mol_number['dec_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_string__type_mol_number_5 = $mol_type_enforce<
		ReturnType< $mol_number['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__keyboard_mol_number_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['keyboard'] >
	>
	type $mol_string__value_mol_number_7 = $mol_type_enforce<
		ReturnType< $mol_number['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_number_8 = $mol_type_enforce<
		ReturnType< $mol_number['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__enabled_mol_number_9 = $mol_type_enforce<
		ReturnType< $mol_number['string_enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_string__submit_mol_number_10 = $mol_type_enforce<
		ReturnType< $mol_number['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_button_minor__event_click_mol_number_11 = $mol_type_enforce<
		ReturnType< $mol_number['event_inc'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__enabled_mol_number_12 = $mol_type_enforce<
		ReturnType< $mol_number['inc_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__sub_mol_number_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_number extends $mol_view {
		precision( ): number
		event_dec( next?: any ): any
		event_inc( next?: any ): any
		event_dec_boost( next?: any ): any
		event_inc_boost( next?: any ): any
		Hotkey( ): $mol_hotkey
		dec_enabled( ): ReturnType< $mol_number['enabled'] >
		dec_icon( ): $mol_icon_chevron_left
		Dec( ): $mol_button_minor
		type( ): string
		value_string( next?: string ): string
		hint( ): string
		string_enabled( ): ReturnType< $mol_number['enabled'] >
		submit( next?: any ): any
		String( ): $mol_string
		inc_enabled( ): ReturnType< $mol_number['enabled'] >
		inc_icon( ): $mol_icon_chevron_right
		Inc( ): $mol_button_minor
		precision_view( ): ReturnType< $mol_number['precision'] >
		precision_change( ): ReturnType< $mol_number['precision'] >
		boost( ): number
		value_min( ): number
		value_max( ): number
		value( next?: number ): number
		enabled( ): boolean
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=number.view.tree.d.ts.map
declare namespace $ {

	type $mol_number__value_rise_range_demo_1 = $mol_type_enforce<
		ReturnType< $rise_range_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_rise_range_demo_2 = $mol_type_enforce<
		ReturnType< $rise_range_demo['min'] >
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_rise_range_demo_3 = $mol_type_enforce<
		ReturnType< $rise_range_demo['max'] >
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $rise_range__value_rise_range_demo_4 = $mol_type_enforce<
		ReturnType< $rise_range_demo['value'] >
		,
		ReturnType< $rise_range['value'] >
	>
	type $rise_range__min_rise_range_demo_5 = $mol_type_enforce<
		ReturnType< $rise_range_demo['min'] >
		,
		ReturnType< $rise_range['min'] >
	>
	type $rise_range__max_rise_range_demo_6 = $mol_type_enforce<
		ReturnType< $rise_range_demo['max'] >
		,
		ReturnType< $rise_range['max'] >
	>
	type $rise_range__value_rise_range_demo_7 = $mol_type_enforce<
		ReturnType< $rise_range_demo['value'] >
		,
		ReturnType< $rise_range['value'] >
	>
	type $rise_range__disabled_rise_range_demo_8 = $mol_type_enforce<
		boolean
		,
		ReturnType< $rise_range['disabled'] >
	>
	type $rise_range__min_rise_range_demo_9 = $mol_type_enforce<
		ReturnType< $rise_range_demo['min'] >
		,
		ReturnType< $rise_range['min'] >
	>
	type $rise_range__max_rise_range_demo_10 = $mol_type_enforce<
		ReturnType< $rise_range_demo['max'] >
		,
		ReturnType< $rise_range['max'] >
	>
	type $mol_list__sub_rise_range_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['sub'] >
	>
	export class $rise_range_demo extends $mol_example_small {
		Number( ): $mol_number
		value( next?: number ): number
		min( ): number
		max( ): number
		Range( ): $rise_range
		Range_disabled( ): $rise_range
		List( ): $mol_list
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check__checked_mol_check_list_1 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_checked'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__label_mol_check_list_2 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_label'] >
		,
		ReturnType< $mol_check['label'] >
	>
	type $mol_check__enabled_mol_check_list_3 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__hint_mol_check_list_4 = $mol_type_enforce<
		ReturnType< $mol_check_list['option_hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	type $mol_check__minimal_height_mol_check_list_5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	export class $mol_check_list extends $mol_view {
		option_checked( id: any, next?: boolean ): boolean
		option_title( id: any): string
		option_label( id: any): readonly(any)[]
		enabled( ): boolean
		option_enabled( id: any): ReturnType< $mol_check_list['enabled'] >
		option_hint( id: any): string
		items( ): readonly($mol_check)[]
		dictionary( ): Record<string, any>
		Option( id: any): $mol_check
		options( ): Record<string, any>
		keys( ): readonly(string)[]
		sub( ): ReturnType< $mol_check_list['items'] >
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	export class $mol_switch extends $mol_check_list {
		value( next?: string ): string
	}
	
}

//# sourceMappingURL=switch.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_rise_radio_1 = $mol_type_enforce<
		ReturnType< $rise_radio['circle_inner'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $rise_radio extends $mol_switch {
		Circle_inner( id: any): $mol_view
		circle_inner( id: any): readonly(any)[]
		Circle( id: any): $mol_view
		option_label( id: any): readonly(any)[]
	}
	
}

//# sourceMappingURL=radio.view.tree.d.ts.map
declare namespace $ {

	type $rise_radio__options_rise_radio_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $rise_radio['options'] >
	>
	export class $rise_radio_demo extends $mol_example_small {
		Radio( ): $rise_radio
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $rise_demo extends $mol_app_demo {
		menu_title( ): string
		sources_uri( ): string
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_major extends $mol_button_minor {
		theme( ): string
	}
	
}

//# sourceMappingURL=major.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea_edit__value_mol_textarea_1 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_textarea_edit['value'] >
	>
	type $mol_textarea_edit__hint_mol_textarea_2 = $mol_type_enforce<
		ReturnType< $mol_textarea['hint'] >
		,
		ReturnType< $mol_textarea_edit['hint'] >
	>
	type $mol_textarea_edit__enabled_mol_textarea_3 = $mol_type_enforce<
		ReturnType< $mol_textarea['enabled'] >
		,
		ReturnType< $mol_textarea_edit['enabled'] >
	>
	type $mol_textarea_edit__spellcheck_mol_textarea_4 = $mol_type_enforce<
		ReturnType< $mol_textarea['spellcheck'] >
		,
		ReturnType< $mol_textarea_edit['spellcheck'] >
	>
	type $mol_textarea_edit__length_max_mol_textarea_5 = $mol_type_enforce<
		ReturnType< $mol_textarea['length_max'] >
		,
		ReturnType< $mol_textarea_edit['length_max'] >
	>
	type $mol_textarea_edit__selection_mol_textarea_6 = $mol_type_enforce<
		ReturnType< $mol_textarea['selection'] >
		,
		ReturnType< $mol_textarea_edit['selection'] >
	>
	type $mol_textarea_edit__submit_mol_textarea_7 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit'] >
		,
		ReturnType< $mol_textarea_edit['submit'] >
	>
	type $mol_textarea_edit__submit_with_ctrl_mol_textarea_8 = $mol_type_enforce<
		ReturnType< $mol_textarea['submit_with_ctrl'] >
		,
		ReturnType< $mol_textarea_edit['submit_with_ctrl'] >
	>
	type $mol_text_code__text_mol_textarea_9 = $mol_type_enforce<
		ReturnType< $mol_textarea['value'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__render_visible_only_mol_textarea_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['render_visible_only'] >
	>
	type $mol_text_code__row_numb_mol_textarea_11 = $mol_type_enforce<
		ReturnType< $mol_textarea['row_numb'] >
		,
		ReturnType< $mol_text_code['row_numb'] >
	>
	type $mol_text_code__sidebar_showed_mol_textarea_12 = $mol_type_enforce<
		ReturnType< $mol_textarea['sidebar_showed'] >
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__highlight_mol_textarea_13 = $mol_type_enforce<
		ReturnType< $mol_textarea['highlight'] >
		,
		ReturnType< $mol_text_code['highlight'] >
	>
	type $mol_text_code__syntax_mol_textarea_14 = $mol_type_enforce<
		ReturnType< $mol_textarea['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	export class $mol_textarea extends $mol_stack {
		clickable( next?: boolean ): boolean
		sidebar_showed( ): boolean
		press( next?: any ): any
		hover( next?: any ): any
		value( next?: string ): string
		hint( ): string
		enabled( ): boolean
		spellcheck( ): boolean
		length_max( ): number
		selection( next?: readonly(number)[] ): readonly(number)[]
		bring( ): ReturnType< ReturnType< $mol_textarea['Edit'] >['bring'] >
		submit( next?: any ): any
		submit_with_ctrl( ): boolean
		Edit( ): $mol_textarea_edit
		row_numb( id: any): number
		highlight( ): string
		syntax( ): $mol_syntax2
		View( ): $mol_text_code
		attr( ): ({ 
			'mol_textarea_clickable': ReturnType< $mol_textarea['clickable'] >,
			'mol_textarea_sidebar_showed': ReturnType< $mol_textarea['sidebar_showed'] >,
		})  & ReturnType< $mol_stack['attr'] >
		event( ): ({ 
			keydown( next?: ReturnType< $mol_textarea['press'] > ): ReturnType< $mol_textarea['press'] >,
			pointermove( next?: ReturnType< $mol_textarea['hover'] > ): ReturnType< $mol_textarea['hover'] >,
		}) 
		sub( ): readonly(any)[]
		symbols_alt( ): Record<string, string>
		symbols_alt_ctrl( ): Record<string, string>
		symbols_alt_shift( ): Record<string, string>
	}
	
	export class $mol_textarea_edit extends $mol_string {
		dom_name( ): string
		enter( ): string
		field( ): ({ 
			'scrollTop': number,
		})  & ReturnType< $mol_string['field'] >
	}
	
}

//# sourceMappingURL=textarea.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__dom_name_mol_section_1 = $mol_type_enforce<
		ReturnType< $mol_section['title_dom_name'] >
		,
		ReturnType< $mol_view['dom_name'] >
	>
	type $mol_view__sub_mol_section_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_section_3 = $mol_type_enforce<
		ReturnType< $mol_section['tools'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_section_4 = $mol_type_enforce<
		ReturnType< $mol_section['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__rows_mol_section_5 = $mol_type_enforce<
		ReturnType< $mol_section['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_section extends $mol_list {
		title_dom_name( ): string
		Title( ): $mol_view
		tools( ): readonly(any)[]
		Tools( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_list
		level( ): number
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=section.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_major__title_hyoo_crowd_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled_hyoo_crowd_app_2 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app['sync_enabled'] >
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_major__click_hyoo_crowd_app_3 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app['sync'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $hyoo_crowd_app_peer__title_hyoo_crowd_app_4 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crowd_app_peer['title'] >
	>
	type $hyoo_crowd_app_peer__hint_hyoo_crowd_app_5 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crowd_app_peer['hint'] >
	>
	type $hyoo_crowd_app_peer__sync_hyoo_crowd_app_6 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app['sync'] >
		,
		ReturnType< $hyoo_crowd_app_peer['sync'] >
	>
	type $hyoo_crowd_app_peer__tools_hyoo_crowd_app_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $hyoo_crowd_app_peer['tools'] >
	>
	type $mol_link_source__uri_hyoo_crowd_app_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $hyoo_crowd_app_peer__title_hyoo_crowd_app_9 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crowd_app_peer['title'] >
	>
	type $hyoo_crowd_app_peer__hint_hyoo_crowd_app_10 = $mol_type_enforce<
		string
		,
		ReturnType< $hyoo_crowd_app_peer['hint'] >
	>
	type $hyoo_crowd_app_peer__sync_hyoo_crowd_app_11 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app['sync'] >
		,
		ReturnType< $hyoo_crowd_app_peer['sync'] >
	>
	type $hyoo_crowd_app_peer__tools_hyoo_crowd_app_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $hyoo_crowd_app_peer['tools'] >
	>
	export class $hyoo_crowd_app extends $mol_book2 {
		Theme( ): $mol_theme_auto
		sync_enabled( ): boolean
		sync( next?: any ): any
		Sync( ): $mol_button_major
		Left( ): $hyoo_crowd_app_peer
		Lights( ): $mol_lights_toggle
		Source( ): $mol_link_source
		Right( ): $hyoo_crowd_app_peer
		Placeholder( ): any
		plugins( ): readonly(any)[]
		pages( ): readonly(any)[]
	}
	
	type $mol_textarea__hint_hyoo_crowd_app_peer_1 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app_peer['hint'] >
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_hyoo_crowd_app_peer_2 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app_peer['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_textarea__sidebar_showed_hyoo_crowd_app_peer_3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['sidebar_showed'] >
	>
	type $mol_text__text_hyoo_crowd_app_peer_4 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app_peer['stats'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_grid__records_hyoo_crowd_app_peer_5 = $mol_type_enforce<
		ReturnType< $hyoo_crowd_app_peer['delta_view'] >
		,
		ReturnType< $mol_grid['records'] >
	>
	type $mol_section__title_hyoo_crowd_app_peer_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_hyoo_crowd_app_peer_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	export class $hyoo_crowd_app_peer extends $mol_page {
		hint( ): string
		text( next?: string ): string
		Text( ): $mol_textarea
		stats( ): string
		Stats( ): $mol_text
		delta_view( ): Record<string, any>
		Delta( ): $mol_grid
		Delta_section( ): $mol_section
		store( ): $hyoo_crowd_land
		sync( ): number
		sync_clocks( next?: readonly($hyoo_crowd_clock)[] ): readonly($hyoo_crowd_clock)[]
		changes( ): number
		delta( ): readonly($hyoo_crowd_unit)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {

	export class $hyoo_crowd_text_demo extends $mol_example_large {
		Sandbox( ): $hyoo_crowd_app
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__hint_mol_app_hello_1 = $mol_type_enforce<
		ReturnType< $mol_app_hello['name_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_app_hello_2 = $mol_type_enforce<
		ReturnType< $mol_app_hello['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_view__sub_mol_app_hello_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_hello extends $mol_view {
		name_hint( ): string
		name( next?: string ): string
		Name( ): $mol_string
		greeting( ): string
		Greeting( ): $mol_view
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=hello.view.tree.d.ts.map
declare namespace $ {

	export class $mol_app_hello_demo extends $mol_example_large {
		App( ): $mol_app_hello
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_external extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=external.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_mol_app_questions_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_list__rows_mol_app_questions_2 = $mol_type_enforce<
		ReturnType< $mol_app_questions['menu_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_link__uri_mol_app_questions_3 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_permalink'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_app_questions_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__sub_mol_app_questions_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_app_questions_6 = $mol_type_enforce<
		({ 
			'question': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_text__text_mol_app_questions_7 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_descr'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows_mol_app_questions_8 = $mol_type_enforce<
		ReturnType< $mol_app_questions['answers'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_view__sub_mol_app_questions_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_app_questions_10 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_tags_by_index'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_page__title_mol_app_questions_11 = $mol_type_enforce<
		ReturnType< $mol_app_questions['title_default'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_app_questions_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_app_questions_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_app_questions_14 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_app_questions_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_app_questions_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_text__text_mol_app_questions_17 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_answer'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_link__minimal_width_mol_app_questions_18 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_width'] >
	>
	type $mol_link__minimal_height_mol_app_questions_19 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_link['minimal_height'] >
	>
	type $mol_link__arg_mol_app_questions_20 = $mol_type_enforce<
		ReturnType< $mol_app_questions['question_arg_by_index'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_app_questions_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_mol_app_questions_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_app_questions extends $mol_book2 {
		Themme( ): $mol_theme_auto
		title_default( ): string
		Lights( ): $mol_lights_toggle
		Source_link( ): $mol_link_source
		menu_rows( ): readonly(any)[]
		Menu_links( ): $mol_list
		question_title( id: any): string
		question_permalink( id: any): string
		Details_permalink_icon( id: any): $mol_icon_external
		Details_permalink( id: any): $mol_link
		Details_close_icon( id: any): $mol_icon_close
		Details_close( id: any): $mol_link
		question_descr( id: any): string
		Details_descr( id: any): $mol_text
		answers( id: any): readonly(any)[]
		Answers( id: any): $mol_list
		question_answer( id: any): string
		question_arg_by_index( id: any): Record<string, any>
		question_title_by_index( id: any): string
		Question_title( id: any): $mol_view
		question_tags_by_index( id: any): readonly(any)[]
		Question_tags( id: any): $mol_view
		tag_name( id: any): string
		plugins( ): readonly(any)[]
		Menu( ): $mol_page
		Details( id: any): $mol_page
		Answer( id: any): $mol_text
		Question_link( id: any): $mol_link
		Tag( id: any): $mol_view
	}
	
}

//# sourceMappingURL=questions.view.tree.d.ts.map
declare namespace $ {

	export class $mol_app_questions_demo extends $mol_example_large {
		App( ): $mol_app_questions
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_text__text_mol_app_quine_1 = $mol_type_enforce<
		ReturnType< $mol_app_quine['content'] >
		,
		ReturnType< $mol_text['text'] >
	>
	export class $mol_app_quine extends $mol_page {
		content( ): string
		Text( ): $mol_text
		title( ): string
		body( ): readonly(any)[]
		paths( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=quine.view.tree.d.ts.map
declare namespace $ {

	export class $mol_app_quine_demo extends $mol_example_large {
		App( ): $mol_app_quine
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check__minimal_width_mol_pick_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_width'] >
	>
	type $mol_check__minimal_height_mol_pick_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check['minimal_height'] >
	>
	type $mol_check__enabled_mol_pick_3 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_enabled'] >
		,
		ReturnType< $mol_check['enabled'] >
	>
	type $mol_check__checked_mol_pick_4 = $mol_type_enforce<
		ReturnType< $mol_pick['showed'] >
		,
		ReturnType< $mol_check['checked'] >
	>
	type $mol_check__clicks_mol_pick_5 = $mol_type_enforce<
		ReturnType< $mol_pick['clicks'] >
		,
		ReturnType< $mol_check['clicks'] >
	>
	type $mol_check__sub_mol_pick_6 = $mol_type_enforce<
		ReturnType< $mol_pick['trigger_content'] >
		,
		ReturnType< $mol_check['sub'] >
	>
	type $mol_check__hint_mol_pick_7 = $mol_type_enforce<
		ReturnType< $mol_pick['hint'] >
		,
		ReturnType< $mol_check['hint'] >
	>
	export class $mol_pick extends $mol_pop {
		keydown( next?: any ): any
		trigger_enabled( ): boolean
		clicks( next?: any ): any
		trigger_content( ): readonly($mol_view_content)[]
		hint( ): string
		Trigger( ): $mol_check
		event( ): ({ 
			keydown( next?: ReturnType< $mol_pick['keydown'] > ): ReturnType< $mol_pick['keydown'] >,
		})  & ReturnType< $mol_pop['event'] >
		Anchor( ): ReturnType< $mol_pick['Trigger'] >
	}
	
}

//# sourceMappingURL=pick.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_dots_vertical extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=vertical.view.tree.d.ts.map
declare namespace $ {

	type $mol_dimmer__haystack_mol_select_1 = $mol_type_enforce<
		ReturnType< $mol_select['option_label'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_select_2 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_nav__keys_y_mol_select_3 = $mol_type_enforce<
		ReturnType< $mol_select['nav_components'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_select_4 = $mol_type_enforce<
		ReturnType< $mol_select['option_focused'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_nav__cycle_mol_select_5 = $mol_type_enforce<
		ReturnType< $mol_select['nav_cycle'] >
		,
		ReturnType< $mol_nav['cycle'] >
	>
	type $mol_list__rows_mol_select_6 = $mol_type_enforce<
		ReturnType< $mol_select['menu_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_select_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	type $mol_button_minor__enabled_mol_select_8 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__event_click_mol_select_9 = $mol_type_enforce<
		ReturnType< $mol_select['event_select'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__sub_mol_select_10 = $mol_type_enforce<
		ReturnType< $mol_select['option_content'] >
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_select_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_search__query_mol_select_12 = $mol_type_enforce<
		ReturnType< $mol_select['filter_pattern'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint_mol_select_13 = $mol_type_enforce<
		ReturnType< $mol_select['filter_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__submit_mol_select_14 = $mol_type_enforce<
		ReturnType< $mol_select['submit'] >
		,
		ReturnType< $mol_search['submit'] >
	>
	type $mol_search__enabled_mol_select_15 = $mol_type_enforce<
		ReturnType< $mol_select['enabled'] >
		,
		ReturnType< $mol_search['enabled'] >
	>
	export class $mol_select extends $mol_pick {
		enabled( ): boolean
		event_select( id: any, next?: any ): any
		option_label( id: any): string
		filter_pattern( next?: string ): string
		Option_label( id: any): $mol_dimmer
		option_content( id: any): readonly(any)[]
		no_options_message( ): string
		nav_components( ): readonly($mol_view)[]
		option_focused( next?: any ): any
		nav_cycle( next?: boolean ): boolean
		Nav( ): $mol_nav
		menu_content( ): readonly($mol_view)[]
		Menu( ): $mol_list
		Bubble_pane( ): $mol_scroll
		filter_hint( ): string
		submit( next?: any ): any
		dictionary( next?: Record<string, any> ): Record<string, any>
		options( ): readonly(string)[]
		value( next?: string ): string
		option_label_default( ): string
		Option_row( id: any): $mol_button_minor
		No_options( ): $mol_view
		plugins( ): readonly(any)[]
		hint( ): string
		bubble_content( ): readonly(any)[]
		Filter( ): $mol_search
		Trigger_icon( ): $mol_icon_dots_vertical
		trigger_enabled( ): ReturnType< $mol_select['enabled'] >
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_app_report_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_app_report_rower__cells_mol_app_report_2 = $mol_type_enforce<
		ReturnType< $mol_app_report['headCells'] >
		,
		ReturnType< $mol_app_report_rower['cells'] >
	>
	type $mol_app_report_tabler__rows_mol_app_report_3 = $mol_type_enforce<
		ReturnType< $mol_app_report['rows'] >
		,
		ReturnType< $mol_app_report_tabler['rows'] >
	>
	type $mol_app_report_rower__cells_mol_app_report_4 = $mol_type_enforce<
		ReturnType< $mol_app_report['rowerCells'] >
		,
		ReturnType< $mol_app_report_rower['cells'] >
	>
	type $mol_app_report_cell__content_mol_app_report_5 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_content'] >
		,
		ReturnType< $mol_app_report_cell['content'] >
	>
	type $mol_app_report_cell__rows_mol_app_report_6 = $mol_type_enforce<
		ReturnType< $mol_app_report['cellrows'] >
		,
		ReturnType< $mol_app_report_cell['rows'] >
	>
	type $mol_app_report_cell__cols_mol_app_report_7 = $mol_type_enforce<
		ReturnType< $mol_app_report['cellCols'] >
		,
		ReturnType< $mol_app_report_cell['cols'] >
	>
	type $mol_view__sub_mol_app_report_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_select__value_mol_app_report_9 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_value'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary_mol_app_report_10 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_options'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_number__value_mol_app_report_11 = $mol_type_enforce<
		ReturnType< $mol_app_report['cell_value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	export class $mol_app_report extends $mol_page {
		description( ): string
		descriptor( ): $mol_view
		headCells( ): readonly(any)[]
		headRower( ): $mol_app_report_rower
		rows( ): readonly(any)[]
		tabler( ): $mol_app_report_tabler
		rowerCells( id: any): readonly(any)[]
		cell_content( id: any): any
		cellrows( id: any): number
		cellCols( id: any): number
		cell_value( id: any, next?: any ): any
		cell_options( id: any): Record<string, any>
		title( ): string
		body( ): readonly(any)[]
		rower( id: any): $mol_app_report_rower
		cell( id: any): $mol_app_report_cell
		texter( id: any): $mol_view
		select( id: any): $mol_select
		number( id: any): $mol_number
	}
	
	export class $mol_app_report_tabler extends $mol_view {
		rows( ): readonly(any)[]
		dom_name( ): string
		sub( ): ReturnType< $mol_app_report_tabler['rows'] >
	}
	
	export class $mol_app_report_rower extends $mol_view {
		cells( ): readonly(any)[]
		dom_name( ): string
		sub( ): ReturnType< $mol_app_report_rower['cells'] >
	}
	
	export class $mol_app_report_cell extends $mol_view {
		cols( ): number
		rows( ): number
		content( ): any
		dom_name( ): string
		attr( ): ({ 
			'colspan': ReturnType< $mol_app_report_cell['cols'] >,
			'rowspan': ReturnType< $mol_app_report_cell['rows'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=report.view.tree.d.ts.map
declare namespace $ {

	export class $mol_app_report_demo extends $mol_example_large {
		App( ): $mol_app_report
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_plus extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=plus.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_bookmark extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=bookmark.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_bookmark_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_play extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=play.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_flash extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=flash.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_code__text_mol_dump_value_1 = $mol_type_enforce<
		ReturnType< $mol_dump_value['simple'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__text_mol_dump_value_2 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_title'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_check_expand__minimal_height_mol_dump_value_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_height'] >
	>
	type $mol_check_expand__minimal_width_mol_dump_value_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_check_expand['minimal_width'] >
	>
	type $mol_check_expand__expanded_mol_dump_value_5 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_check_expand['expanded'] >
	>
	type $mol_check_expand__expandable_mol_dump_value_6 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expandable'] >
		,
		ReturnType< $mol_check_expand['expandable'] >
	>
	type $mol_check_expand__clicks_mol_dump_value_7 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_all'] >
		,
		ReturnType< $mol_check_expand['clicks'] >
	>
	type $mol_check_expand__label_mol_dump_value_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_expand['label'] >
	>
	type $mol_view__dom_node_mol_dump_value_9 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_dom'] >
		,
		ReturnType< $mol_view['dom_node'] >
	>
	type $mol_view__render_mol_dump_value_10 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview'] >
		,
		ReturnType< $mol_view['render'] >
	>
	type $mol_view__sub_mol_dump_value_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_list__values_mol_dump_value_12 = $mol_type_enforce<
		ReturnType< $mol_dump_value['row_values'] >
		,
		ReturnType< $mol_dump_list['values'] >
	>
	type $mol_dump_list__prototypes_mol_dump_value_13 = $mol_type_enforce<
		ReturnType< $mol_dump_value['prototypes'] >
		,
		ReturnType< $mol_dump_list['prototypes'] >
	>
	type $mol_dump_list__preview_show_mol_dump_value_14 = $mol_type_enforce<
		ReturnType< $mol_dump_value['preview_show'] >
		,
		ReturnType< $mol_dump_list['preview_show'] >
	>
	type $mol_expander__expanded_mol_dump_value_15 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__Trigger_mol_dump_value_16 = $mol_type_enforce<
		ReturnType< $mol_dump_value['Expand_head'] >
		,
		ReturnType< $mol_expander['Trigger'] >
	>
	type $mol_expander__content_mol_dump_value_17 = $mol_type_enforce<
		ReturnType< $mol_dump_value['expand_content'] >
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_dump_value extends $mol_view {
		simple( ): string
		Simple( ): $mol_text_code
		expanded( next?: boolean ): boolean
		expandable( ): boolean
		expand_all( next?: any ): any
		expand_title( ): string
		Expand_title( ): $mol_text_code
		Expand_head( ): $mol_check_expand
		preview_dom( ): any
		preview( ): any
		Preview_dom( ): $mol_view
		Preview( ): $mol_view
		row_values( id: any): readonly(any)[]
		prototypes( ): boolean
		Row( id: any): $mol_dump_list
		expand_content( ): readonly(any)[]
		Expand( ): $mol_expander
		value( next?: any ): any
		preview_show( next?: boolean ): boolean
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=value.view.tree.d.ts.map
declare namespace $ {

	type $mol_dump_value__value_mol_dump_list_1 = $mol_type_enforce<
		ReturnType< $mol_dump_list['dump_value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_dump_value__expanded_mol_dump_list_2 = $mol_type_enforce<
		ReturnType< $mol_dump_list['dump_expanded'] >
		,
		ReturnType< $mol_dump_value['expanded'] >
	>
	type $mol_dump_value__prototypes_mol_dump_list_3 = $mol_type_enforce<
		ReturnType< $mol_dump_list['prototypes'] >
		,
		ReturnType< $mol_dump_value['prototypes'] >
	>
	type $mol_dump_value__preview_show_mol_dump_list_4 = $mol_type_enforce<
		ReturnType< $mol_dump_list['preview_show'] >
		,
		ReturnType< $mol_dump_value['preview_show'] >
	>
	export class $mol_dump_list extends $mol_view {
		dump_value( id: any): any
		dump_expanded( id: any, next?: boolean ): boolean
		prototypes( ): boolean
		preview_show( ): boolean
		Dump( id: any): $mol_dump_value
		values( ): readonly(any)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	type $mol_hotkey__key_hyoo_js_eval_1 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $hyoo_js_eval['submit'] > ): ReturnType< $hyoo_js_eval['submit'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__mod_ctrl_hyoo_js_eval_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_hotkey['mod_ctrl'] >
	>
	type $mol_link__arg_hyoo_js_eval_3 = $mol_type_enforce<
		({ 
			'code': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_hyoo_js_eval_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link_source__uri_hyoo_js_eval_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_link__title_hyoo_js_eval_6 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['menu_link_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__arg_hyoo_js_eval_7 = $mol_type_enforce<
		({ 
			'code': ReturnType< $hyoo_js_eval['menu_link_code'] >,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_list__rows_hyoo_js_eval_8 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['menu'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_hyoo_js_eval_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_hyoo_js_eval_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_js_eval_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link_iconed__title_hyoo_js_eval_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_iconed['title'] >
	>
	type $mol_link_iconed__hint_hyoo_js_eval_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_iconed['hint'] >
	>
	type $mol_link_iconed__uri_hyoo_js_eval_14 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['perf'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_check_icon__Icon_hyoo_js_eval_15 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['Bookmark_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_hyoo_js_eval_16 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['bookmark'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__hint_hyoo_js_eval_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon_hyoo_js_eval_18 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['Run_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_hyoo_js_eval_19 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['run'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__hint_hyoo_js_eval_20 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['result_label'] >
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_textarea__hint_hyoo_js_eval_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__sidebar_showed_hyoo_js_eval_22 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['sidebar_showed'] >
	>
	type $mol_textarea__spellcheck_hyoo_js_eval_23 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['spellcheck'] >
	>
	type $mol_textarea__value_hyoo_js_eval_24 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['code'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_view__attr_hyoo_js_eval_25 = $mol_type_enforce<
		({ 
			'title': ReturnType< $hyoo_js_eval['error_message'] >,
		}) 
		,
		ReturnType< $mol_view['attr'] >
	>
	type $mol_view__sub_hyoo_js_eval_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_follower__Anchor_hyoo_js_eval_27 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['error_anchor'] >
		,
		ReturnType< $mol_follower['Anchor'] >
	>
	type $mol_follower__offset_hyoo_js_eval_28 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['error_offset'] >
		,
		ReturnType< $mol_follower['offset'] >
	>
	type $mol_follower__Sub_hyoo_js_eval_29 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['Error_view'] >
		,
		ReturnType< $mol_follower['Sub'] >
	>
	type $mol_page__title_hyoo_js_eval_30 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__bring_hyoo_js_eval_31 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['bring'] >
		,
		ReturnType< $mol_page['bring'] >
	>
	type $mol_page__tools_hyoo_js_eval_32 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_js_eval_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg_hyoo_js_eval_34 = $mol_type_enforce<
		({ 
			'run': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_hyoo_js_eval_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_list__sub_visible_hyoo_js_eval_36 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_list['sub_visible'] >
	>
	type $mol_dump_list__values_hyoo_js_eval_37 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['log'] >
		,
		ReturnType< $mol_dump_list['values'] >
	>
	type $mol_dump_list__prototypes_hyoo_js_eval_38 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_dump_list['prototypes'] >
	>
	type $mol_list__rows_hyoo_js_eval_39 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['logs'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_hyoo_js_eval_40 = $mol_type_enforce<
		ReturnType< $hyoo_js_eval['result_label'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_hyoo_js_eval_41 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_js_eval_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $hyoo_js_eval_bookmark_list__43 = $mol_type_enforce<
		`// Example Notebook

// load external script
const {
	$mol_compare_deep: compare
} = $mol_import.module(
	'https://esm.sh/mol_compare_deep'
).default

// local vars
const one = [1]
one.push( one )
const left =  { a: [1,one], b:    one  }
const right = { a:    one,  b: [1,one] }

// result
compare( left, right )`
		,
		string
	>
	export class $hyoo_js_eval extends $mol_book2 {
		Theme( ): $mol_theme_auto
		submit( next?: any ): any
		Submit( ): $mol_hotkey
		Clear_icon( ): $mol_icon_plus
		Clear( ): $mol_link
		Source( ): $mol_link_source
		Lights( ): $mol_lights_toggle
		menu_link_title( id: any): string
		menu_link_code( id: any): string
		Menu_link( id: any): $mol_link
		menu( ): readonly(any)[]
		Menu( ): $mol_list
		Menu_page( ): $mol_page
		perf( ): string
		Perf( ): $mol_link_iconed
		Bookmark_icon( ): $mol_icon_bookmark_outline
		bookmark( next?: boolean ): boolean
		Bookmark( ): $mol_check_icon
		Run_icon( ): $mol_icon_play
		run( next?: boolean ): boolean
		Run( ): $mol_check_icon
		bring( ): ReturnType< ReturnType< $hyoo_js_eval['Code'] >['bring'] >
		code( next?: string ): string
		Code( ): $mol_textarea
		error_anchor( ): any
		error_offset( ): readonly(any)[]
		error_message( ): string
		Error_icon( ): $mol_icon_flash
		Error_view( ): $mol_view
		Error_mark( ): $mol_follower
		Code_page( ): $mol_page
		result_label( ): string
		Results_close_icon( ): $mol_icon_close
		Results_close( ): $mol_link
		UI( ): $mol_list
		log( id: any): readonly(any)[]
		Log( id: any): $mol_dump_list
		logs( ): readonly(any)[]
		Result( ): $mol_list
		Result_page( ): $mol_page
		Placeholder( ): any
		plugins( ): readonly(any)[]
		bookmark_list( next?: readonly(string)[] ): readonly(string)[]
		pages( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=eval.view.tree.d.ts.map
declare namespace $ {

	type $hyoo_js_eval__Menu_page_mol_example_code_1 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_js_eval['Menu_page'] >
	>
	type $hyoo_js_eval__Perf_mol_example_code_2 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_js_eval['Perf'] >
	>
	type $hyoo_js_eval__Bookmark_mol_example_code_3 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_js_eval['Bookmark'] >
	>
	type $hyoo_js_eval__code_mol_example_code_4 = $mol_type_enforce<
		ReturnType< $mol_example_code['code'] >
		,
		ReturnType< $hyoo_js_eval['code'] >
	>
	export class $mol_example_code extends $mol_example {
		code( next?: string ): string
		Sandbox( ): $hyoo_js_eval
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $ {

	export class $mol_array_chunks_demo extends $mol_example_code {
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_array_lottery_demo extends $mol_example_code {
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_array_trim_demo extends $mol_example_code {
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_assert_demo extends $mol_example_code {
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_upload extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=upload.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_open_native__files_mol_button_open_1 = $mol_type_enforce<
		ReturnType< $mol_button_open['files_handled'] >
		,
		ReturnType< $mol_button_open_native['files'] >
	>
	type $mol_button_open_native__accept_mol_button_open_2 = $mol_type_enforce<
		ReturnType< $mol_button_open['accept'] >
		,
		ReturnType< $mol_button_open_native['accept'] >
	>
	type $mol_button_open_native__multiple_mol_button_open_3 = $mol_type_enforce<
		ReturnType< $mol_button_open['multiple'] >
		,
		ReturnType< $mol_button_open_native['multiple'] >
	>
	export class $mol_button_open extends $mol_button_minor {
		Icon( ): $mol_icon_upload
		files( next?: readonly(File)[] ): readonly(File)[]
		files_handled( next?: ReturnType< $mol_button_open['files'] > ): ReturnType< $mol_button_open['files'] >
		accept( ): string
		multiple( ): boolean
		Native( ): $mol_button_open_native
		sub( ): readonly(any)[]
	}
	
	export class $mol_button_open_native extends $mol_view {
		accept( ): string
		multiple( ): boolean
		picked( next?: any ): any
		dom_name( ): string
		files( next?: readonly(File)[] ): readonly(File)[]
		attr( ): ({ 
			'type': string,
			'accept': ReturnType< $mol_button_open_native['accept'] >,
			'multiple': ReturnType< $mol_button_open_native['multiple'] >,
		}) 
		event( ): ({ 
			change( next?: ReturnType< $mol_button_open_native['picked'] > ): ReturnType< $mol_button_open_native['picked'] >,
		}) 
	}
	
}

//# sourceMappingURL=open.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__title_mol_attach_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['title'] >
	>
	type $mol_image__uri_mol_attach_2 = $mol_type_enforce<
		ReturnType< $mol_attach['item_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_button_minor__click_mol_attach_3 = $mol_type_enforce<
		ReturnType< $mol_attach['item_drop'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_attach_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_open__title_mol_attach_5 = $mol_type_enforce<
		ReturnType< $mol_attach['attach_title'] >
		,
		ReturnType< $mol_button_open['title'] >
	>
	type $mol_button_open__files_mol_attach_6 = $mol_type_enforce<
		ReturnType< $mol_attach['attach_new'] >
		,
		ReturnType< $mol_button_open['files'] >
	>
	export class $mol_attach extends $mol_view {
		item_drop( id: any, next?: any ): any
		item_uri( id: any): string
		Image( id: any): $mol_image
		Item( id: any): $mol_button_minor
		attach_title( ): string
		attach_new( next?: any ): any
		Add( ): $mol_button_open
		content( ): readonly($mol_view)[]
		items( next?: readonly(string)[] ): readonly(string)[]
		sub( ): ReturnType< $mol_attach['content'] >
	}
	
}

//# sourceMappingURL=attach.view.tree.d.ts.map
declare namespace $ {

	type $mol_attach__items_mol_attach_demo_1 = $mol_type_enforce<
		ReturnType< $mol_attach_demo['filled_items'] >
		,
		ReturnType< $mol_attach['items'] >
	>
	export class $mol_attach_demo extends $mol_example_small {
		filled_items( next?: readonly(any)[] ): readonly(any)[]
		Filled( ): $mol_attach
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_power extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=power.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_power_sleep extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sleep.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_alert extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=alert.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sleep extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sleep.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_pause extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pause.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__click_mol_audio_status_1 = $mol_type_enforce<
		ReturnType< $mol_audio_status['wakeup'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__enabled_mol_audio_status_2 = $mol_type_enforce<
		ReturnType< $mol_audio_status['wakeup_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__hint_mol_audio_status_3 = $mol_type_enforce<
		ReturnType< $mol_audio_status['status_name'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_audio_status_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_audio_status extends $mol_view {
		Closed( ): $mol_icon_power_sleep
		Error( ): $mol_icon_alert
		Suspended( ): $mol_icon_sleep
		Playing( ): $mol_icon_play
		Running( ): $mol_icon_pause
		wakeup( next?: any ): any
		wakeup_enabled( ): boolean
		status_name( ): ReturnType< $mol_audio_status['status'] >
		Icon( ): $mol_icon_play
		Wakeup( ): $mol_button_minor
		icons( ): ({ 
			'closed': ReturnType< $mol_audio_status['Closed'] >,
			'error': ReturnType< $mol_audio_status['Error'] >,
			'interrupted': ReturnType< $mol_audio_status['Error'] >,
			'suspended': ReturnType< $mol_audio_status['Suspended'] >,
			'playing': ReturnType< $mol_audio_status['Playing'] >,
			'running': ReturnType< $mol_audio_status['Running'] >,
		}) 
		status( next?: string ): string
		status_template( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=status.view.tree.d.ts.map
declare namespace $ {

	export class $mol_row extends $mol_view {
	}
	
}

//# sourceMappingURL=row.view.tree.d.ts.map
declare namespace $ {

	type __mol_audio_demo_1 = $mol_type_enforce<
		Parameters< $mol_audio_demo['beep_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >[0]
	>
	type $mol_audio_melody__note_length_mol_audio_demo_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__notes_mol_audio_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type __mol_audio_demo_4 = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >[0]
	>
	type __mol_audio_demo_5 = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise'] >['active'] >[0]
	>
	type __mol_audio_demo_6 = $mol_type_enforce<
		Parameters< $mol_audio_demo['noise_stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default_mol_audio_demo_7 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_button_minor__click_mol_audio_demo_8 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title_mol_audio_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status_mol_audio_demo_10 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['beep_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub_mol_audio_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_minor__click_mol_audio_demo_12 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_play_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title_mol_audio_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status_mol_audio_demo_14 = $mol_type_enforce<
		ReturnType< $mol_audio_demo['noise_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub_mol_audio_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows_mol_audio_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input_mol_audio_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	type $mol_audio_room__input_mol_audio_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_audio_room['input'] >
	>
	export class $mol_audio_demo extends $mol_example_small {
		beep_status( next?: ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Beep_room'] >['status'] >
		beep_play( ): ReturnType< ReturnType< $mol_audio_demo['Beep_track'] >['start'] >
		Beep_track( ): $mol_audio_melody
		noise_status( next?: ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise_room'] >['status'] >
		noise_active( next?: ReturnType< ReturnType< $mol_audio_demo['Noise'] >['active'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['active'] >
		noise_stop_at( next?: ReturnType< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] > ): ReturnType< ReturnType< $mol_audio_demo['Noise'] >['stop_at'] >
		noise_freq( ): number
		Noise( ): $mol_audio_vibe
		beep_play_click( next?: any ): any
		Beep_play( ): $mol_button_minor
		Beep_status( ): $mol_audio_status
		Beep_row( ): $mol_row
		noise_play_click( next?: any ): any
		Noise_play( ): $mol_button_minor
		Noise_status( ): $mol_audio_status
		Nouse_row( ): $mol_row
		List( ): $mol_list
		title( ): string
		Beep_room( ): $mol_audio_room
		Noise_room( ): $mol_audio_room
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_height_mol_labeler_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_labeler_2 = $mol_type_enforce<
		ReturnType< $mol_labeler['label'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_labeler_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_labeler_4 = $mol_type_enforce<
		ReturnType< $mol_labeler['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_labeler extends $mol_list {
		label( ): readonly($mol_view_content)[]
		Label( ): $mol_view
		content( ): readonly(any)[]
		Content( ): $mol_view
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=labeler.view.tree.d.ts.map
declare namespace $ {

	type __mol_audio_demo_vibe_1 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Room'] >['status'] >[0]
	>
	type __mol_audio_demo_vibe_2 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['active'] >[0]
	>
	type __mol_audio_demo_vibe_3 = $mol_type_enforce<
		Parameters< $mol_audio_demo_vibe['stop_at'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_vibe['Beep_vibe'] >['stop_at'] >[0]
	>
	type $mol_audio_vibe__freq_default_mol_audio_demo_vibe_4 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_audio_vibe['freq_default'] >
	>
	type $mol_audio_vibe__shape_default_mol_audio_demo_vibe_5 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_audio_vibe['shape_default'] >
	>
	type $mol_number__precision_change_mol_audio_demo_vibe_6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value_mol_audio_demo_vibe_7 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_audio_demo_vibe_8 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['duration_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_audio_demo_vibe_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__precision_change_mol_audio_demo_vibe_10 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_number__value_mol_audio_demo_vibe_11 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['freq'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_audio_demo_vibe_12 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['frequency_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_audio_demo_vibe_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_select__Filter_mol_audio_demo_vibe_14 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value_mol_audio_demo_vibe_15 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_audio_demo_vibe_Shape_select__17 = $mol_type_enforce<
		`sine`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__18 = $mol_type_enforce<
		`square`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__19 = $mol_type_enforce<
		`sawtooth`
		,
		$mol_audio_vibe_shape
	>
	type $mol_audio_demo_vibe_Shape_select__20 = $mol_type_enforce<
		`triangle`
		,
		$mol_audio_vibe_shape
	>
	type $mol_select__options_mol_audio_demo_vibe_16 = $mol_type_enforce<
		readonly($mol_audio_vibe_shape)[]
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title_mol_audio_demo_vibe_21 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['shape_label'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_audio_demo_vibe_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_button_major__click_mol_audio_demo_vibe_23 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['beep_vibe_start_click'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub_mol_audio_demo_vibe_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_audio_status__status_mol_audio_demo_vibe_25 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_vibe['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub_mol_audio_demo_vibe_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows_mol_audio_demo_vibe_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input_mol_audio_demo_vibe_28 = $mol_type_enforce<
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
declare namespace $ {

	type $mol_view__sub_mol_form_field_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_form_field extends $mol_labeler {
		name( ): string
		bid( ): string
		Bid( ): $mol_view
		control( ): any
		bids( ): readonly(string)[]
		label( ): readonly(any)[]
		content( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=field.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_loop extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=loop.view.tree.d.ts.map
declare namespace $ {

	type $mol_list__sub_mol_form_1 = $mol_type_enforce<
		ReturnType< $mol_form['body'] >
		,
		ReturnType< $mol_list['sub'] >
	>
	type __mol_form_2 = $mol_type_enforce<
		Parameters< $mol_form['submit_activate'] >[0]
		,
		Parameters< ReturnType< $mol_form['Submit'] >['activate'] >[0]
	>
	type $mol_button_major__title_mol_form_3 = $mol_type_enforce<
		ReturnType< $mol_form['submit_title'] >
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__hint_mol_form_4 = $mol_type_enforce<
		ReturnType< $mol_form['submit_hint'] >
		,
		ReturnType< $mol_button_major['hint'] >
	>
	type $mol_button_major__click_mol_form_5 = $mol_type_enforce<
		ReturnType< $mol_form['submit'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_status__message_mol_form_6 = $mol_type_enforce<
		ReturnType< $mol_form['result'] >
		,
		ReturnType< $mol_status['message'] >
	>
	type $mol_row__sub_mol_form_7 = $mol_type_enforce<
		ReturnType< $mol_form['foot'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_form extends $mol_list {
		keydown( next?: any ): any
		form_invalid( ): string
		form_fields( ): readonly($mol_form_field)[]
		body( ): ReturnType< $mol_form['form_fields'] >
		Body( ): $mol_list
		submit_title( ): string
		submit_hint( ): string
		submit_activate( next?: ReturnType< ReturnType< $mol_form['Submit'] >['activate'] > ): ReturnType< ReturnType< $mol_form['Submit'] >['activate'] >
		submit( next?: any ): any
		Submit( ): $mol_button_major
		result( next?: any ): any
		Result( ): $mol_status
		buttons( ): readonly($mol_view)[]
		foot( ): ReturnType< $mol_form['buttons'] >
		Foot( ): $mol_row
		submit_allowed( ): boolean
		submit_blocked( ): boolean
		event( ): ({ 
			keydown( next?: ReturnType< $mol_form['keydown'] > ): ReturnType< $mol_form['keydown'] >,
		})  & ReturnType< $mol_list['event'] >
		save( next?: any ): any
		message_done( ): string
		errors( ): Record<string, string>
		rows( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type __mol_audio_demo_sample_1 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Room'] >['status'] >[0]
	>
	type __mol_audio_demo_sample_2 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['sample_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Sample'] >['active'] >[0]
	>
	type __mol_audio_demo_sample_3 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sample['loop'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sample['Sample'] >['loop'] >[0]
	>
	type $mol_audio_sample__loop_default_mol_audio_demo_sample_4 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_audio_sample['loop_default'] >
	>
	type $mol_audio_sample__buffer_mol_audio_demo_sample_5 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_buffer'] >
		,
		ReturnType< $mol_audio_sample['buffer'] >
	>
	type $mol_string__value_mol_audio_demo_sample_6 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_url'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_audio_demo_sample_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_mol_audio_demo_sample_8 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Sample_url'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__checked_mol_audio_demo_sample_9 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['sample_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__title_mol_audio_demo_sample_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['title'] >
	>
	type $mol_check_icon__Icon_mol_audio_demo_sample_11 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_button_minor__click_mol_audio_demo_sample_12 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['start_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title_mol_audio_demo_sample_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_check_icon__checked_mol_audio_demo_sample_14 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['loop'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__title_mol_audio_demo_sample_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['title'] >
	>
	type $mol_check_icon__Icon_mol_audio_demo_sample_16 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['Loop_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_row__sub_mol_audio_demo_sample_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_audio_status__status_mol_audio_demo_sample_18 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sample['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_list__rows_mol_audio_demo_sample_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input_mol_audio_demo_sample_20 = $mol_type_enforce<
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
declare namespace $ {

	export class $mol_icon_play_pause extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pause.view.tree.d.ts.map
declare namespace $ {

	type __mol_audio_demo_sequencer_1 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_status'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['status'] >[0]
	>
	type __mol_audio_demo_sequencer_2 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['room_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Room'] >['active'] >[0]
	>
	type __mol_audio_demo_sequencer_3 = $mol_type_enforce<
		Parameters< $mol_audio_demo_sequencer['beep_track_active'] >[0]
		,
		Parameters< ReturnType< $mol_audio_demo_sequencer['Beep_track'] >['active'] >[0]
	>
	type $mol_audio_melody__notes_mol_audio_demo_sequencer_4 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_audio_melody['notes'] >
	>
	type $mol_audio_melody__note_length_mol_audio_demo_sequencer_5 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_audio_melody['note_length'] >
	>
	type $mol_audio_melody__note_off_part_mol_audio_demo_sequencer_6 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_audio_melody['note_off_part'] >
	>
	type $mol_number__precision_mol_audio_demo_sequencer_7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min_mol_audio_demo_sequencer_8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_mol_audio_demo_sequencer_9 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_length'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name_mol_audio_demo_sequencer_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_mol_audio_demo_sequencer_11 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_length'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_number__precision_mol_audio_demo_sequencer_12 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_number__value_min_mol_audio_demo_sequencer_13 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_mol_audio_demo_sequencer_14 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['note_off_part'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name_mol_audio_demo_sequencer_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_mol_audio_demo_sequencer_16 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Note_off_part'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_row__sub_mol_audio_demo_sequencer_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_textarea__hint_mol_audio_demo_sequencer_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_mol_audio_demo_sequencer_19 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['notes'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name_mol_audio_demo_sequencer_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__control_mol_audio_demo_sequencer_21 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Notes'] >
		,
		ReturnType< $mol_form_field['control'] >
	>
	type $mol_check_icon__hint_mol_audio_demo_sequencer_22 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_icon['hint'] >
	>
	type $mol_check_icon__Icon_mol_audio_demo_sequencer_23 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['Beep_active_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_mol_audio_demo_sequencer_24 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_active'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_button_minor__click_mol_audio_demo_sequencer_25 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['beep_track_start'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title_mol_audio_demo_sequencer_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_audio_status__status_mol_audio_demo_sequencer_27 = $mol_type_enforce<
		ReturnType< $mol_audio_demo_sequencer['room_status'] >
		,
		ReturnType< $mol_audio_status['status'] >
	>
	type $mol_row__sub_mol_audio_demo_sequencer_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__rows_mol_audio_demo_sequencer_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_audio_room__input_mol_audio_demo_sequencer_30 = $mol_type_enforce<
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
declare namespace $ {

	export class $mol_avatar extends $mol_icon {
		view_box( ): string
		id( ): string
		path( ): string
	}
	
}

//# sourceMappingURL=avatar.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_avatar_demo_1 = $mol_type_enforce<
		ReturnType< $mol_avatar_demo['avatar_id'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_labeler__title_mol_avatar_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_avatar_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_avatar__id_mol_avatar_demo_4 = $mol_type_enforce<
		ReturnType< $mol_avatar_demo['avatar_id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_labeler__title_mol_avatar_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_avatar_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	export class $mol_avatar_demo extends $mol_example_small {
		avatar_id( next?: string ): string
		Avatar_id_value( ): $mol_string
		Avatar_id_label( ): $mol_labeler
		Avatar( ): $mol_avatar
		Avatar_label( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_bar extends $mol_view {
	}
	
}

//# sourceMappingURL=bar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_email extends $mol_string {
		type( ): string
		keyboard( ): string
		hint( ): string
	}
	
}

//# sourceMappingURL=email.view.tree.d.ts.map
declare namespace $ {

	type $mol_email__value_mol_bar_demo_1 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_email['value'] >
	>
	type $mol_button_minor__title_mol_bar_demo_2 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['submit_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_bar__sub_mol_bar_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_email__value_mol_bar_demo_4 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['mail'] >
		,
		ReturnType< $mol_email['value'] >
	>
	type $mol_check_box__title_mol_bar_demo_5 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirm_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_bar_demo_6 = $mol_type_enforce<
		ReturnType< $mol_bar_demo['confirmed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_bar__sub_mol_bar_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	export class $mol_bar_demo extends $mol_example_small {
		mail( next?: string ): string
		Two_mail( ): $mol_email
		submit_title( ): string
		Two_submit( ): $mol_button_minor
		Two( ): $mol_bar
		Three_mail( ): $mol_email
		confirm_title( ): string
		confirmed( next?: boolean ): boolean
		Three_confirm( ): $mol_check_box
		Three( ): $mol_bar
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sort extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=sort.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_sort_asc extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=asc.view.tree.d.ts.map
declare namespace $ {

	export class $mol_portion_indicator extends $mol_view {
		width_style( ): string
		style( ): ({ 
			'width': ReturnType< $mol_portion_indicator['width_style'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
	type $mol_portion_indicator__width_style_mol_portion_1 = $mol_type_enforce<
		ReturnType< $mol_portion['indicator_width_style'] >
		,
		ReturnType< $mol_portion_indicator['width_style'] >
	>
	export class $mol_portion extends $mol_view {
		indicator_width_style( ): string
		Indicator( ): $mol_portion_indicator
		portion( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=portion.view.tree.d.ts.map
declare namespace $ {

	type $mol_portion__portion_mol_bench_1 = $mol_type_enforce<
		ReturnType< $mol_bench['result_portion'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_bench_head__event_click_mol_bench_2 = $mol_type_enforce<
		ReturnType< $mol_bench['event_sort_toggle'] >
		,
		ReturnType< $mol_bench_head['event_click'] >
	>
	type $mol_bench_head__sub_mol_bench_3 = $mol_type_enforce<
		ReturnType< $mol_bench['col_head_content'] >
		,
		ReturnType< $mol_bench_head['sub'] >
	>
	export class $mol_bench extends $mol_grid {
		result( ): Record<string, any>
		event_sort_toggle( id: any, next?: any ): any
		col_head_title( id: any): string
		Col_head_sort( id: any): $mol_icon_sort_asc
		col_head_content( id: any): readonly(any)[]
		result_value( id: any): string
		result_portion( id: any): number
		Result_portion( id: any): $mol_portion
		records( ): ReturnType< $mol_bench['result'] >
		col_sort( next?: string ): string
		Col_head( id: any): $mol_bench_head
		cell_content_number( id: any): readonly(any)[]
	}
	
	export class $mol_bench_head extends $mol_float {
		event_click( next?: any ): any
		hint( ): string
		horizontal( ): boolean
		event( ): ({ 
			click( next?: ReturnType< $mol_bench_head['event_click'] > ): ReturnType< $mol_bench_head['event_click'] >,
		})  & ReturnType< $mol_float['event'] >
		attr( ): ({ 
			'title': ReturnType< $mol_bench_head['hint'] >,
		})  & ReturnType< $mol_float['attr'] >
	}
	
}

//# sourceMappingURL=bench.view.tree.d.ts.map
declare namespace $ {

	type $mol_bench__col_sort_mol_bench_demo_1 = $mol_type_enforce<
		ReturnType< $mol_bench_demo['col_sort'] >
		,
		ReturnType< $mol_bench['col_sort'] >
	>
	type $mol_bench__result_mol_bench_demo_2 = $mol_type_enforce<
		ReturnType< $mol_bench_demo['result'] >
		,
		ReturnType< $mol_bench['result'] >
	>
	export class $mol_bench_demo extends $mol_example_small {
		col_sort( next?: string ): string
		result( ): Record<string, any>
		View( ): $mol_bench
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_book2_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_book2_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_book2__Placeholder_mol_book2_demo_5 = $mol_type_enforce<
		ReturnType< $mol_book2_demo['Side'] >
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages_mol_book2_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_book2['pages'] >
	>
	export class $mol_book2_demo extends $mol_example_large {
		Side( ): $mol_view
		First( ): $mol_view
		Second( ): $mol_view
		Third( ): $mol_view
		View( ): $mol_book2
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_book2_catalog_1 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_dimmer__needle_mol_book2_catalog_2 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_book2_catalog_3 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_title'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_link__arg_mol_book2_catalog_4 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_link_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_book2_catalog_5 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_link_content'] >
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_view__sub_mol_book2_catalog_6 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_item_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_list__Empty_mol_book2_catalog_7 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['Menu_links_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	type $mol_list__rows_mol_book2_catalog_8 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_links'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__title_mol_book2_catalog_9 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_title'] >
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__Logo_mol_book2_catalog_10 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['Menu_logo'] >
		,
		ReturnType< $mol_page['Logo'] >
	>
	type $mol_page__tools_mol_book2_catalog_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__head_mol_book2_catalog_12 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_head'] >
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__body_mol_book2_catalog_13 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_body'] >
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_mol_book2_catalog_14 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['menu_foot'] >
		,
		ReturnType< $mol_page['foot'] >
	>
	type $mol_link__arg_mol_book2_catalog_15 = $mol_type_enforce<
		ReturnType< $mol_book2_catalog['spread_close_arg'] >
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__hint_mol_book2_catalog_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__sub_mol_book2_catalog_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	export class $mol_book2_catalog extends $mol_book2 {
		Menu_title( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Title'] >
		menu_title( ): string
		Menu_tools( ): ReturnType< ReturnType< $mol_book2_catalog['Menu'] >['Tools'] >
		Menu_logo( ): any
		menu_head( ): readonly($mol_view_content)[]
		menu_filter( next?: string ): string
		Menu_filter( ): $mol_search
		Menu_links_empty( ): $mol_view
		arg( id: any): Record<string, any>
		menu_link_arg( id: any): ReturnType< $mol_book2_catalog['arg'] >
		spread_title( id: any): string
		Menu_link_title( id: any): $mol_dimmer
		menu_link_content( id: any): readonly($mol_view_content)[]
		Menu_link( id: any): $mol_link
		menu_item_content( id: any): readonly($mol_view)[]
		Menu_item( id: any): $mol_view
		menu_links( ): readonly($mol_view)[]
		Menu_links( ): $mol_list
		menu_body( ): readonly($mol_view)[]
		menu_foot( ): readonly($mol_view)[]
		Menu( ): $mol_page
		spread_close_arg( ): Record<string, any>
		Spread_close_icon( ): $mol_icon_close
		param( ): string
		spread( next?: string ): string
		spreads( ): Record<string, any>
		Spread( id: any): $mol_view
		Spread_default( ): any
		spread_ids( ): readonly(string)[]
		menu_filter_enabled( ): boolean
		spread_ids_filtered( ): readonly(string)[]
		spread_current( ): any
		menu_tools( ): readonly(any)[]
		addon_tools( ): readonly(any)[]
		pages( ): readonly(any)[]
		Spread_close( ): $mol_link
	}
	
}

//# sourceMappingURL=catalog.view.tree.d.ts.map
declare namespace $ {

	type $mol_filler_filler_lines__1 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__2 = $mol_type_enforce<
		`Donec a diam lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__3 = $mol_type_enforce<
		`Sed sit amet ipsum mauris. `
		,
		string
	>
	type $mol_filler_filler_lines__4 = $mol_type_enforce<
		`Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. `
		,
		string
	>
	type $mol_filler_filler_lines__5 = $mol_type_enforce<
		`Donec et mollis dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__6 = $mol_type_enforce<
		`Praesent et diam eget libero egestas mattis sit amet vitae augue. `
		,
		string
	>
	type $mol_filler_filler_lines__7 = $mol_type_enforce<
		`Nam tincidunt congue enim, ut porta lorem lacinia consectetur. `
		,
		string
	>
	type $mol_filler_filler_lines__8 = $mol_type_enforce<
		`Donec ut libero sed arcu vehicula ultricies a non tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__9 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__10 = $mol_type_enforce<
		`Aenean ut gravida lorem. `
		,
		string
	>
	type $mol_filler_filler_lines__11 = $mol_type_enforce<
		`Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__12 = $mol_type_enforce<
		`Pellentesque auctor nisi id magna consequat sagittis. `
		,
		string
	>
	type $mol_filler_filler_lines__13 = $mol_type_enforce<
		`Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__14 = $mol_type_enforce<
		`Ut convallis libero in urna ultrices accumsan. `
		,
		string
	>
	type $mol_filler_filler_lines__15 = $mol_type_enforce<
		`Donec sed odio eros. `
		,
		string
	>
	type $mol_filler_filler_lines__16 = $mol_type_enforce<
		`Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. `
		,
		string
	>
	type $mol_filler_filler_lines__17 = $mol_type_enforce<
		`Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. `
		,
		string
	>
	type $mol_filler_filler_lines__18 = $mol_type_enforce<
		`In rutrum accumsan ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__19 = $mol_type_enforce<
		`Mauris vitae nisi at sem facilisis semper ac in est. `
		,
		string
	>
	type $mol_filler_filler_lines__20 = $mol_type_enforce<
		`Vivamus fermentum semper porta. `
		,
		string
	>
	type $mol_filler_filler_lines__21 = $mol_type_enforce<
		`Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. `
		,
		string
	>
	type $mol_filler_filler_lines__22 = $mol_type_enforce<
		`Maecenas convallis ullamcorper ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__23 = $mol_type_enforce<
		`Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. `
		,
		string
	>
	type $mol_filler_filler_lines__24 = $mol_type_enforce<
		`Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. `
		,
		string
	>
	type $mol_filler_filler_lines__25 = $mol_type_enforce<
		`Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. `
		,
		string
	>
	type $mol_filler_filler_lines__26 = $mol_type_enforce<
		`Fusce eget orci a orci congue vestibulum. `
		,
		string
	>
	type $mol_filler_filler_lines__27 = $mol_type_enforce<
		`Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. `
		,
		string
	>
	type $mol_filler_filler_lines__28 = $mol_type_enforce<
		`Curabitur venenatis pulvinar tellus gravida ornare. `
		,
		string
	>
	type $mol_filler_filler_lines__29 = $mol_type_enforce<
		`Sed et erat faucibus nunc euismod ultricies ut id justo. `
		,
		string
	>
	type $mol_filler_filler_lines__30 = $mol_type_enforce<
		`Nullam cursus suscipit nisi, et ultrices justo sodales nec. `
		,
		string
	>
	type $mol_filler_filler_lines__31 = $mol_type_enforce<
		`Fusce venenatis facilisis lectus ac semper. `
		,
		string
	>
	type $mol_filler_filler_lines__32 = $mol_type_enforce<
		`Aliquam at massa ipsum. `
		,
		string
	>
	type $mol_filler_filler_lines__33 = $mol_type_enforce<
		`Quisque bibendum purus convallis nulla ultrices ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__34 = $mol_type_enforce<
		`Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. `
		,
		string
	>
	type $mol_filler_filler_lines__35 = $mol_type_enforce<
		`Fusce vel volutpat elit. `
		,
		string
	>
	type $mol_filler_filler_lines__36 = $mol_type_enforce<
		`Nam sagittis nisi dui. `
		,
		string
	>
	type $mol_filler_filler_lines__37 = $mol_type_enforce<
		`Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. `
		,
		string
	>
	type $mol_filler_filler_lines__38 = $mol_type_enforce<
		`Etiam luctus porttitor lorem, sed suscipit est rutrum non. `
		,
		string
	>
	type $mol_filler_filler_lines__39 = $mol_type_enforce<
		`Curabitur lobortis nisl a enim congue semper. `
		,
		string
	>
	type $mol_filler_filler_lines__40 = $mol_type_enforce<
		`Aenean commodo ultrices imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__41 = $mol_type_enforce<
		`Vestibulum ut justo vel sapien venenatis tincidunt. `
		,
		string
	>
	type $mol_filler_filler_lines__42 = $mol_type_enforce<
		`Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__43 = $mol_type_enforce<
		`Aliquam ut massa in turpis dapibus convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__44 = $mol_type_enforce<
		`Praesent elit lacus, vestibulum at malesuada et, ornare et est. `
		,
		string
	>
	type $mol_filler_filler_lines__45 = $mol_type_enforce<
		`Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. `
		,
		string
	>
	type $mol_filler_filler_lines__46 = $mol_type_enforce<
		`Mauris ut placerat justo. `
		,
		string
	>
	type $mol_filler_filler_lines__47 = $mol_type_enforce<
		`Mauris in ultricies enim. `
		,
		string
	>
	type $mol_filler_filler_lines__48 = $mol_type_enforce<
		`Quisque nec est eleifend nulla ultrices egestas quis ut quam. `
		,
		string
	>
	type $mol_filler_filler_lines__49 = $mol_type_enforce<
		`Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. `
		,
		string
	>
	type $mol_filler_filler_lines__50 = $mol_type_enforce<
		`Cras quis ligula sem, vel elementum mi. `
		,
		string
	>
	type $mol_filler_filler_lines__51 = $mol_type_enforce<
		`Phasellus non ullamcorper urna. `
		,
		string
	>
	type $mol_filler_filler_lines__52 = $mol_type_enforce<
		`Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. `
		,
		string
	>
	type $mol_filler_filler_lines__53 = $mol_type_enforce<
		`In euismod ultrices facilisis. `
		,
		string
	>
	type $mol_filler_filler_lines__54 = $mol_type_enforce<
		`Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. `
		,
		string
	>
	type $mol_filler_filler_lines__55 = $mol_type_enforce<
		`Proin quis dictum nisl. `
		,
		string
	>
	type $mol_filler_filler_lines__56 = $mol_type_enforce<
		`Morbi id quam sapien, sed vestibulum sem. `
		,
		string
	>
	type $mol_filler_filler_lines__57 = $mol_type_enforce<
		`Duis elementum rutrum mauris sed convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__58 = $mol_type_enforce<
		`Proin vestibulum magna mi. `
		,
		string
	>
	type $mol_filler_filler_lines__59 = $mol_type_enforce<
		`Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. `
		,
		string
	>
	type $mol_filler_filler_lines__60 = $mol_type_enforce<
		`Sed non tortor sodales quam auctor elementum. `
		,
		string
	>
	type $mol_filler_filler_lines__61 = $mol_type_enforce<
		`Donec hendrerit nunc eget elit pharetra pulvinar. `
		,
		string
	>
	type $mol_filler_filler_lines__62 = $mol_type_enforce<
		`Suspendisse id tempus tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__63 = $mol_type_enforce<
		`Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. `
		,
		string
	>
	type $mol_filler_filler_lines__64 = $mol_type_enforce<
		`Donec vel. `
		,
		string
	>
	type $mol_filler_filler_lines__65 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__66 = $mol_type_enforce<
		`Donec a diam lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__67 = $mol_type_enforce<
		`Sed sit amet ipsum mauris. `
		,
		string
	>
	type $mol_filler_filler_lines__68 = $mol_type_enforce<
		`Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. `
		,
		string
	>
	type $mol_filler_filler_lines__69 = $mol_type_enforce<
		`Donec et mollis dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__70 = $mol_type_enforce<
		`Praesent et diam eget libero egestas mattis sit amet vitae augue. `
		,
		string
	>
	type $mol_filler_filler_lines__71 = $mol_type_enforce<
		`Nam tincidunt congue enim, ut porta lorem lacinia consectetur. `
		,
		string
	>
	type $mol_filler_filler_lines__72 = $mol_type_enforce<
		`Donec ut libero sed arcu vehicula ultricies a non tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__73 = $mol_type_enforce<
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `
		,
		string
	>
	type $mol_filler_filler_lines__74 = $mol_type_enforce<
		`Aenean ut gravida lorem. `
		,
		string
	>
	type $mol_filler_filler_lines__75 = $mol_type_enforce<
		`Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. `
		,
		string
	>
	type $mol_filler_filler_lines__76 = $mol_type_enforce<
		`Pellentesque auctor nisi id magna consequat sagittis. `
		,
		string
	>
	type $mol_filler_filler_lines__77 = $mol_type_enforce<
		`Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__78 = $mol_type_enforce<
		`Ut convallis libero in urna ultrices accumsan. `
		,
		string
	>
	type $mol_filler_filler_lines__79 = $mol_type_enforce<
		`Donec sed odio eros. `
		,
		string
	>
	type $mol_filler_filler_lines__80 = $mol_type_enforce<
		`Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. `
		,
		string
	>
	type $mol_filler_filler_lines__81 = $mol_type_enforce<
		`Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. `
		,
		string
	>
	type $mol_filler_filler_lines__82 = $mol_type_enforce<
		`In rutrum accumsan ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__83 = $mol_type_enforce<
		`Mauris vitae nisi at sem facilisis semper ac in est. `
		,
		string
	>
	type $mol_filler_filler_lines__84 = $mol_type_enforce<
		`Vivamus fermentum semper porta. `
		,
		string
	>
	type $mol_filler_filler_lines__85 = $mol_type_enforce<
		`Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. `
		,
		string
	>
	type $mol_filler_filler_lines__86 = $mol_type_enforce<
		`Maecenas convallis ullamcorper ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__87 = $mol_type_enforce<
		`Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. `
		,
		string
	>
	type $mol_filler_filler_lines__88 = $mol_type_enforce<
		`Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. `
		,
		string
	>
	type $mol_filler_filler_lines__89 = $mol_type_enforce<
		`Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. `
		,
		string
	>
	type $mol_filler_filler_lines__90 = $mol_type_enforce<
		`Fusce eget orci a orci congue vestibulum. `
		,
		string
	>
	type $mol_filler_filler_lines__91 = $mol_type_enforce<
		`Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. `
		,
		string
	>
	type $mol_filler_filler_lines__92 = $mol_type_enforce<
		`Curabitur venenatis pulvinar tellus gravida ornare. `
		,
		string
	>
	type $mol_filler_filler_lines__93 = $mol_type_enforce<
		`Sed et erat faucibus nunc euismod ultricies ut id justo. `
		,
		string
	>
	type $mol_filler_filler_lines__94 = $mol_type_enforce<
		`Nullam cursus suscipit nisi, et ultrices justo sodales nec. `
		,
		string
	>
	type $mol_filler_filler_lines__95 = $mol_type_enforce<
		`Fusce venenatis facilisis lectus ac semper. `
		,
		string
	>
	type $mol_filler_filler_lines__96 = $mol_type_enforce<
		`Aliquam at massa ipsum. `
		,
		string
	>
	type $mol_filler_filler_lines__97 = $mol_type_enforce<
		`Quisque bibendum purus convallis nulla ultrices ultricies. `
		,
		string
	>
	type $mol_filler_filler_lines__98 = $mol_type_enforce<
		`Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. `
		,
		string
	>
	type $mol_filler_filler_lines__99 = $mol_type_enforce<
		`Fusce vel volutpat elit. `
		,
		string
	>
	type $mol_filler_filler_lines__100 = $mol_type_enforce<
		`Nam sagittis nisi dui. `
		,
		string
	>
	type $mol_filler_filler_lines__101 = $mol_type_enforce<
		`Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. `
		,
		string
	>
	type $mol_filler_filler_lines__102 = $mol_type_enforce<
		`Etiam luctus porttitor lorem, sed suscipit est rutrum non. `
		,
		string
	>
	type $mol_filler_filler_lines__103 = $mol_type_enforce<
		`Curabitur lobortis nisl a enim congue semper. `
		,
		string
	>
	type $mol_filler_filler_lines__104 = $mol_type_enforce<
		`Aenean commodo ultrices imperdiet. `
		,
		string
	>
	type $mol_filler_filler_lines__105 = $mol_type_enforce<
		`Vestibulum ut justo vel sapien venenatis tincidunt. `
		,
		string
	>
	type $mol_filler_filler_lines__106 = $mol_type_enforce<
		`Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. `
		,
		string
	>
	type $mol_filler_filler_lines__107 = $mol_type_enforce<
		`Aliquam ut massa in turpis dapibus convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__108 = $mol_type_enforce<
		`Praesent elit lacus, vestibulum at malesuada et, ornare et est. `
		,
		string
	>
	type $mol_filler_filler_lines__109 = $mol_type_enforce<
		`Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. `
		,
		string
	>
	type $mol_filler_filler_lines__110 = $mol_type_enforce<
		`Mauris ut placerat justo. `
		,
		string
	>
	type $mol_filler_filler_lines__111 = $mol_type_enforce<
		`Mauris in ultricies enim. `
		,
		string
	>
	type $mol_filler_filler_lines__112 = $mol_type_enforce<
		`Quisque nec est eleifend nulla ultrices egestas quis ut quam. `
		,
		string
	>
	type $mol_filler_filler_lines__113 = $mol_type_enforce<
		`Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. `
		,
		string
	>
	type $mol_filler_filler_lines__114 = $mol_type_enforce<
		`Cras quis ligula sem, vel elementum mi. `
		,
		string
	>
	type $mol_filler_filler_lines__115 = $mol_type_enforce<
		`Phasellus non ullamcorper urna. `
		,
		string
	>
	type $mol_filler_filler_lines__116 = $mol_type_enforce<
		`Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. `
		,
		string
	>
	type $mol_filler_filler_lines__117 = $mol_type_enforce<
		`In euismod ultrices facilisis. `
		,
		string
	>
	type $mol_filler_filler_lines__118 = $mol_type_enforce<
		`Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. `
		,
		string
	>
	type $mol_filler_filler_lines__119 = $mol_type_enforce<
		`Proin quis dictum nisl. `
		,
		string
	>
	type $mol_filler_filler_lines__120 = $mol_type_enforce<
		`Morbi id quam sapien, sed vestibulum sem. `
		,
		string
	>
	type $mol_filler_filler_lines__121 = $mol_type_enforce<
		`Duis elementum rutrum mauris sed convallis. `
		,
		string
	>
	type $mol_filler_filler_lines__122 = $mol_type_enforce<
		`Proin vestibulum magna mi. `
		,
		string
	>
	type $mol_filler_filler_lines__123 = $mol_type_enforce<
		`Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. `
		,
		string
	>
	type $mol_filler_filler_lines__124 = $mol_type_enforce<
		`Sed non tortor sodales quam auctor elementum. `
		,
		string
	>
	type $mol_filler_filler_lines__125 = $mol_type_enforce<
		`Donec hendrerit nunc eget elit pharetra pulvinar. `
		,
		string
	>
	type $mol_filler_filler_lines__126 = $mol_type_enforce<
		`Suspendisse id tempus tortor. `
		,
		string
	>
	type $mol_filler_filler_lines__127 = $mol_type_enforce<
		`Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. `
		,
		string
	>
	type $mol_filler_filler_lines__128 = $mol_type_enforce<
		`Donec vel. `
		,
		string
	>
	export class $mol_filler extends $mol_paragraph {
		filler_lines( ): readonly(string)[]
		min_symbols( ): number
		sub( ): ReturnType< $mol_filler['filler_lines'] >
	}
	
}

//# sourceMappingURL=filler.view.tree.d.ts.map
declare namespace $ {

	type $mol_page__title_mol_book2_catalog_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2_catalog__param_mol_book2_catalog_demo_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['param'] >
	>
	type $mol_book2_catalog__menu_title_mol_book2_catalog_demo_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['menu_title'] >
	>
	type $mol_book2_catalog__menu_tools_mol_book2_catalog_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_book2_catalog['menu_tools'] >
	>
	type $mol_book2_catalog__spreads_mol_book2_catalog_demo_13 = $mol_type_enforce<
		({ 
			'pizza': ReturnType< $mol_book2_catalog_demo['Pizza'] >,
			'hot_dogs': ReturnType< $mol_book2_catalog_demo['Hot_dogs'] >,
			'fries': ReturnType< $mol_book2_catalog_demo['Fries'] >,
		}) 
		,
		ReturnType< $mol_book2_catalog['spreads'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_21 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_23 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_26 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_27 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_29 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_32 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_34 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_35 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_39 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__title_mol_book2_catalog_demo_41 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_book2_catalog_demo_42 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_book2_catalog_demo_43 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2_catalog__param_mol_book2_catalog_demo_44 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['param'] >
	>
	type $mol_book2_catalog__menu_title_mol_book2_catalog_demo_45 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['menu_title'] >
	>
	type $mol_book2_catalog__menu_tools_mol_book2_catalog_demo_46 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_book2_catalog['menu_tools'] >
	>
	type $mol_book2_catalog__spreads_mol_book2_catalog_demo_47 = $mol_type_enforce<
		({ 
			'cats': ReturnType< $mol_book2_catalog_demo['Cats'] >,
			'dogs': ReturnType< $mol_book2_catalog_demo['Dogs'] >,
			'horses': ReturnType< $mol_book2_catalog_demo['Horses'] >,
			'racoons': ReturnType< $mol_book2_catalog_demo['Racoons'] >,
			'pigs': ReturnType< $mol_book2_catalog_demo['Pigs'] >,
			'rabbits': ReturnType< $mol_book2_catalog_demo['Rabbits'] >,
			'wolfs': ReturnType< $mol_book2_catalog_demo['Wolfs'] >,
			'mice': ReturnType< $mol_book2_catalog_demo['Mice'] >,
			'ants': ReturnType< $mol_book2_catalog_demo['Ants'] >,
			'bugs': ReturnType< $mol_book2_catalog_demo['Bugs'] >,
		}) 
		,
		ReturnType< $mol_book2_catalog['spreads'] >
	>
	type $mol_book2_catalog__param_mol_book2_catalog_demo_48 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['param'] >
	>
	type $mol_book2_catalog__menu_title_mol_book2_catalog_demo_49 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_book2_catalog['menu_title'] >
	>
	type $mol_book2_catalog__spreads_mol_book2_catalog_demo_50 = $mol_type_enforce<
		({ 
			'foods': ReturnType< $mol_book2_catalog_demo['Foods'] >,
			'animals': ReturnType< $mol_book2_catalog_demo['Animals'] >,
		}) 
		,
		ReturnType< $mol_book2_catalog['spreads'] >
	>
	export class $mol_book2_catalog_demo extends $mol_example_large {
		Spread_close( ): ReturnType< ReturnType< $mol_book2_catalog_demo['Calatog'] >['Spread_close'] >
		Foods_spread_close( ): ReturnType< ReturnType< $mol_book2_catalog_demo['Foods'] >['Spread_close'] >
		Pizza( ): $mol_page
		Hot_dogs( ): $mol_page
		Fries( ): $mol_page
		Foods( ): $mol_book2_catalog
		Animals_spread_close( ): ReturnType< ReturnType< $mol_book2_catalog_demo['Animals'] >['Spread_close'] >
		Cats( ): $mol_page
		Dogs( ): $mol_page
		Horses( ): $mol_page
		Racoons( ): $mol_page
		Pigs( ): $mol_page
		Rabbits( ): $mol_page
		Wolfs( ): $mol_page
		Mice( ): $mol_page
		Ants( ): $mol_page
		Bugs( ): $mol_page
		Animals( ): $mol_book2_catalog
		Calatog( ): $mol_book2_catalog
		title( ): string
		Content( ): $mol_filler
		Empty( ): $mol_status
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_cursor_default extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=default.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_cursor_default_click extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=click.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_cursor_default_click_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_major__title_mol_button_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click_mol_button_demo_2 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__title_mol_button_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled_mol_button_demo_4 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_minor__title_mol_button_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click_mol_button_demo_6 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__title_mol_button_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__enabled_mol_button_demo_8 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_button_demo_9 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_button_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_button_demo_11 = $mol_type_enforce<
		ReturnType< $mol_button_demo['fail'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_button_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_button_demo extends $mol_example_small {
		fail( next?: any ): any
		Major_enabled( ): $mol_button_major
		Major_disabled( ): $mol_button_major
		Minor_enabled( ): $mol_button_minor
		Minor_disabled( ): $mol_button_minor
		Minor_icon_only_icon( ): $mol_icon_cursor_default_click_outline
		Minor_icon_only( ): $mol_button_minor
		Minor_iconed_icon( ): $mol_icon_cursor_default_click_outline
		Minor_iconed( ): $mol_button_minor
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_share extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=share.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_share_variant extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=variant.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_share extends $mol_button_minor {
		Icon( ): $mol_icon_share_variant
		title( ): string
		uri( ): string
		capture( ): any
		hint( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=share.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_share__title_mol_button_share_demo_1 = $mol_type_enforce<
		ReturnType< $mol_button_share_demo['title'] >
		,
		ReturnType< $mol_button_share['title'] >
	>
	type $mol_button_share__hint_mol_button_share_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['hint'] >
	>
	type $mol_button_share__title_mol_button_share_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['title'] >
	>
	type $mol_button_share__hint_mol_button_share_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['hint'] >
	>
	type $mol_button_share__uri_mol_button_share_demo_5 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_share['uri'] >
	>
	type $mol_button_share__capture_mol_button_share_demo_6 = $mol_type_enforce<
		ReturnType< $mol_button_share_demo['Share_hyoo'] >
		,
		ReturnType< $mol_button_share['capture'] >
	>
	type $mol_button_share__title_mol_button_share_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['title'] >
	>
	type $mol_button_share__hint_mol_button_share_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['hint'] >
	>
	type $mol_button_share__uri_mol_button_share_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_share['uri'] >
	>
	type $mol_button_share__capture_mol_button_share_demo_10 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_share['capture'] >
	>
	export class $mol_button_share_demo extends $mol_example_small {
		Share_page( ): $mol_button_share
		Share_screenshot( ): $mol_button_share
		Share_hyoo( ): $mol_button_share
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_hor extends $mol_view {
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_height_mol_calendar_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_calendar_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_calendar_3 = $mol_type_enforce<
		ReturnType< $mol_calendar['head'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_hor__sub_mol_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekdays'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_5 = $mol_type_enforce<
		ReturnType< $mol_calendar['weekend'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__sub_mol_calendar_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	type $mol_hor__sub_mol_calendar_7 = $mol_type_enforce<
		ReturnType< $mol_calendar['week_days'] >
		,
		ReturnType< $mol_hor['sub'] >
	>
	type $mol_calendar_day__ghost_mol_calendar_8 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_ghost'] >
		,
		ReturnType< $mol_calendar_day['ghost'] >
	>
	type $mol_calendar_day__holiday_mol_calendar_9 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_holiday'] >
		,
		ReturnType< $mol_calendar_day['holiday'] >
	>
	type $mol_calendar_day__selected_mol_calendar_10 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_selected'] >
		,
		ReturnType< $mol_calendar_day['selected'] >
	>
	type $mol_calendar_day__today_mol_calendar_11 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_today'] >
		,
		ReturnType< $mol_calendar_day['today'] >
	>
	type $mol_calendar_day__theme_mol_calendar_12 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_theme'] >
		,
		ReturnType< $mol_calendar_day['theme'] >
	>
	type $mol_calendar_day__sub_mol_calendar_13 = $mol_type_enforce<
		ReturnType< $mol_calendar['day_content'] >
		,
		ReturnType< $mol_calendar_day['sub'] >
	>
	export class $mol_calendar extends $mol_list {
		title( ): string
		Title( ): $mol_view
		head( ): readonly(any)[]
		Head( ): $mol_view
		weekdays( ): readonly($mol_view)[]
		Weekdays( ): $mol_hor
		weekend( id: any): boolean
		weekday( id: any): string
		week_days( id: any): readonly($mol_view)[]
		day_ghost( id: any): boolean
		day_holiday( id: any): boolean
		day_selected( id: any): boolean
		day_today( id: any): boolean
		day_theme( id: any): any
		day_text( id: any): string
		day_content( id: any): readonly(any)[]
		sub( ): readonly(any)[]
		weeks( ): readonly($mol_view)[]
		weeks_count( ): number
		Weekday( id: any): $mol_calendar_day
		Week( id: any): $mol_hor
		Day( id: any): $mol_calendar_day
		month_string( ): string
		month_moment( ): $mol_time_moment
	}
	
	export class $mol_calendar_day extends $mol_view {
		holiday( ): boolean
		ghost( ): boolean
		selected( ): boolean
		today( ): boolean
		theme( ): any
		minimal_height( ): number
		minimal_width( ): number
		attr( ): ({ 
			'mol_calendar_holiday': ReturnType< $mol_calendar_day['holiday'] >,
			'mol_calendar_ghost': ReturnType< $mol_calendar_day['ghost'] >,
			'mol_calendar_selected': ReturnType< $mol_calendar_day['selected'] >,
			'mol_calendar_today': ReturnType< $mol_calendar_day['today'] >,
			'mol_theme': ReturnType< $mol_calendar_day['theme'] >,
		}) 
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	type $mol_calendar__month_string_mol_calendar_demo_holiday_1 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_holiday['month'] >
		,
		ReturnType< $mol_calendar['month_string'] >
	>
	type $mol_calendar__day_holiday_mol_calendar_demo_holiday_2 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_holiday['holiday'] >
		,
		ReturnType< $mol_calendar['day_holiday'] >
	>
	export class $mol_calendar_demo_holiday extends $mol_example_small {
		month( ): string
		holiday( id: any): boolean
		Calendar( ): $mol_calendar
		title( ): string
		holidays( ): readonly(any)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=holiday.view.tree.d.ts.map
declare namespace $ {

	type $mol_calendar__month_string_mol_calendar_demo_selection_1 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_selection['month'] >
		,
		ReturnType< $mol_calendar['month_string'] >
	>
	type $mol_calendar__day_selected_mol_calendar_demo_selection_2 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_selection['selected'] >
		,
		ReturnType< $mol_calendar['day_selected'] >
	>
	export class $mol_calendar_demo_selection extends $mol_example_small {
		month( ): string
		selected( id: any): boolean
		Calendar( ): $mol_calendar
		title( ): string
		interval_config( ): ({ 
			'start': string,
			'end': string,
		}) 
		days( ): readonly(any)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=selection.view.tree.d.ts.map
declare namespace $ {

	type $mol_calendar__month_moment_mol_calendar_demo_simple_1 = $mol_type_enforce<
		ReturnType< $mol_calendar_demo_simple['today'] >
		,
		ReturnType< $mol_calendar['month_moment'] >
	>
	export class $mol_calendar_demo_simple extends $mol_example_small {
		today( ): $mol_time_moment
		Calendar( ): $mol_calendar
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=simple.view.tree.d.ts.map
declare namespace $ {

	type $mol_card__content_mol_card_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title_mol_card_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__status_mol_card_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['status'] >
	>
	export class $mol_card_demo extends $mol_example_small {
		Simple( ): $mol_card
		Pending( ): $mol_card
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_gallery__style_mol_gallery_1 = $mol_type_enforce<
		({ 
			'flexGrow': ReturnType< $mol_gallery['side_size'] >,
		}) 
		,
		ReturnType< $mol_gallery['style'] >
	>
	type $mol_gallery__items_mol_gallery_2 = $mol_type_enforce<
		ReturnType< $mol_gallery['side_items'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	export class $mol_gallery extends $mol_view {
		items( ): readonly($mol_view)[]
		side_size( id: any): string
		side_items( id: any): readonly($mol_view)[]
		sub( ): ReturnType< $mol_gallery['items'] >
		Side( id: any): $mol_gallery
	}
	
}

//# sourceMappingURL=gallery.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_group extends $mol_svg {
		dom_name( ): string
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_title extends $mol_svg {
		dom_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=title.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_plot_graph_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_graph_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_2d__mol_plot_graph_9 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['viewport_x'] >, ReturnType< $mol_plot_graph['viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_11 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_pane_x'] >, ReturnType< $mol_plot_graph['dimensions_pane_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_12 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['dimensions_x'] >, ReturnType< $mol_plot_graph['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_graph_13 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_graph_14 = $mol_type_enforce<
		[ ReturnType< $mol_plot_graph['gap_x'] >, ReturnType< $mol_plot_graph['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_svg_title__title_mol_plot_graph_15 = $mol_type_enforce<
		ReturnType< $mol_plot_graph['hint'] >
		,
		ReturnType< $mol_svg_title['title'] >
	>
	export class $mol_plot_graph extends $mol_svg_group {
		type( ): string
		color( ): string
		viewport_x( ): $mol_vector_range<number>
		viewport_y( ): $mol_vector_range<number>
		dimensions_pane_x( ): $mol_vector_range<number>
		dimensions_pane_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		title( ): string
		hint( ): ReturnType< $mol_plot_graph['title'] >
		series_x( ): readonly(number)[]
		series_y( ): readonly(number)[]
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph['type'] >,
		})  & ReturnType< $mol_svg_group['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph['color'] >,
		})  & ReturnType< $mol_svg_group['style'] >
		viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		shift( ): readonly(number)[]
		scale( ): readonly(number)[]
		cursor_position( ): $mol_vector_2d<number>
		dimensions_pane( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		size_real( ): $mol_vector_2d<number>
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		repos_x( id: any): number
		repos_y( id: any): number
		indexes( ): readonly(number)[]
		points( ): readonly(readonly(number)[])[]
		front( ): readonly($mol_svg)[]
		back( ): readonly($mol_svg)[]
		Hint( ): $mol_svg_title
		hue( next?: number ): number
		Sample( ): any
	}
	
	export class $mol_plot_graph_sample extends $mol_view {
		type( ): string
		color( ): string
		attr( ): ({ 
			'mol_plot_graph_type': ReturnType< $mol_plot_graph_sample['type'] >,
		})  & ReturnType< $mol_view['attr'] >
		style( ): ({ 
			'color': ReturnType< $mol_plot_graph_sample['color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=graph.view.tree.d.ts.map
declare namespace $ {

	type $mol_gallery__items_mol_chart_legend_1 = $mol_type_enforce<
		ReturnType< $mol_chart_legend['graph_legends'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_view__sub_mol_chart_legend_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_chart_legend_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_chart_legend extends $mol_scroll {
		graph_legends( ): readonly($mol_view)[]
		Gallery( ): $mol_gallery
		Graph_sample( id: any): any
		Graph_sample_box( id: any): $mol_view
		graph_title( id: any): string
		Graph_title( id: any): $mol_view
		graphs( ): readonly($mol_plot_graph)[]
		graphs_front( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
		Graph_legend( id: any): $mol_view
	}
	
}

//# sourceMappingURL=legend.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_2d__mol_touch_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_touch_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	export class $mol_touch extends $mol_plugin {
		event_start( next?: any ): any
		event_move( next?: any ): any
		event_end( next?: any ): any
		event_leave( next?: any ): any
		event_wheel( next?: any ): any
		start_zoom( next?: number ): number
		start_distance( next?: number ): number
		zoom( next?: number ): number
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( next?: string ): string
		action_point( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		start_pan( next?: readonly(any)[] ): readonly(any)[]
		pan( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		pointer_center( ): $mol_vector_2d<number>
		start_pos( next?: any ): any
		swipe_precision( ): number
		swipe_right( next?: any ): any
		swipe_bottom( next?: any ): any
		swipe_left( next?: any ): any
		swipe_top( next?: any ): any
		swipe_from_right( next?: any ): any
		swipe_from_bottom( next?: any ): any
		swipe_from_left( next?: any ): any
		swipe_from_top( next?: any ): any
		swipe_to_right( next?: any ): any
		swipe_to_bottom( next?: any ): any
		swipe_to_left( next?: any ): any
		swipe_to_top( next?: any ): any
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		style( ): ({ 
			'touch-action': string,
			'overscroll-behavior': string,
		})  & ReturnType< $mol_plugin['style'] >
		event( ): ({ 
			pointerdown( next?: ReturnType< $mol_touch['event_start'] > ): ReturnType< $mol_touch['event_start'] >,
			pointermove( next?: ReturnType< $mol_touch['event_move'] > ): ReturnType< $mol_touch['event_move'] >,
			pointerup( next?: ReturnType< $mol_touch['event_end'] > ): ReturnType< $mol_touch['event_end'] >,
			pointerleave( next?: ReturnType< $mol_touch['event_leave'] > ): ReturnType< $mol_touch['event_leave'] >,
			wheel( next?: ReturnType< $mol_touch['event_wheel'] > ): ReturnType< $mol_touch['event_wheel'] >,
		})  & ReturnType< $mol_plugin['event'] >
	}
	
}

//# sourceMappingURL=touch.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_plot_pane_1 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_left'] >, ReturnType< $mol_plot_pane['gap_right'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_2 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_bottom'] >, ReturnType< $mol_plot_pane['gap_top'] > ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_4 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_5 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_6 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_7 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_8 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_9 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_pane_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_touch__zoom_mol_plot_pane_11 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['zoom'] >
		,
		ReturnType< $mol_touch['zoom'] >
	>
	type $mol_touch__pan_mol_plot_pane_12 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['shift'] >
		,
		ReturnType< $mol_touch['pan'] >
	>
	type $mol_touch__allow_draw_mol_plot_pane_13 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_draw'] >
		,
		ReturnType< $mol_touch['allow_draw'] >
	>
	type $mol_touch__allow_pan_mol_plot_pane_14 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_pan'] >
		,
		ReturnType< $mol_touch['allow_pan'] >
	>
	type $mol_touch__allow_zoom_mol_plot_pane_15 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['allow_zoom'] >
		,
		ReturnType< $mol_touch['allow_zoom'] >
	>
	type $mol_touch__draw_start_mol_plot_pane_16 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_start'] >
		,
		ReturnType< $mol_touch['draw_start'] >
	>
	type $mol_touch__draw_mol_plot_pane_17 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw'] >
		,
		ReturnType< $mol_touch['draw'] >
	>
	type $mol_touch__draw_end_mol_plot_pane_18 = $mol_type_enforce<
		ReturnType< $mol_plot_pane['draw_end'] >
		,
		ReturnType< $mol_touch['draw_end'] >
	>
	type $mol_vector_2d__mol_plot_pane_19 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['gap_x'] >, ReturnType< $mol_plot_pane['gap_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_20 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['shift_limit_x'] >, ReturnType< $mol_plot_pane['shift_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_21 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_22 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_23 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['scale_limit_x'] >, ReturnType< $mol_plot_pane['scale_limit_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_24 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_25 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_26 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_27 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_plot_pane_28 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_x'] >, ReturnType< $mol_plot_pane['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	type $mol_vector_2d__mol_plot_pane_29 = $mol_type_enforce<
		[ ReturnType< $mol_plot_pane['dimensions_viewport_x'] >, ReturnType< $mol_plot_pane['dimensions_viewport_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_plot_pane extends $mol_svg_root {
		gap_x( ): $mol_vector_range<number>
		gap_y( ): $mol_vector_range<number>
		shift_limit_x( ): $mol_vector_range<number>
		shift_limit_y( ): $mol_vector_range<number>
		scale_limit_x( ): $mol_vector_range<number>
		scale_limit_y( ): $mol_vector_range<number>
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		dimensions_viewport_x( ): $mol_vector_range<number>
		dimensions_viewport_y( ): $mol_vector_range<number>
		graphs_sorted( ): readonly($mol_svg)[]
		graphs( ): readonly($mol_plot_graph)[]
		graphs_positioned( ): ReturnType< $mol_plot_pane['graphs'] >
		graphs_visible( ): ReturnType< $mol_plot_pane['graphs_positioned'] >
		zoom( next?: number ): number
		cursor_position( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['pointer_center'] >
		allow_draw( ): boolean
		allow_pan( ): boolean
		allow_zoom( ): boolean
		action_type( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_type'] >
		action_point( ): ReturnType< ReturnType< $mol_plot_pane['Touch'] >['action_point'] >
		draw_start( next?: any ): any
		draw( next?: any ): any
		draw_end( next?: any ): any
		Touch( ): $mol_touch
		aspect( ): string
		hue_base( next?: number ): number
		hue_shift( next?: number ): number
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_right( ): ReturnType< $mol_plot_pane['gap_hor'] >
		gap_top( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap_bottom( ): ReturnType< $mol_plot_pane['gap_vert'] >
		gap( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		shift_default( ): $mol_vector_2d<number>
		shift( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_limit( ): $mol_vector_2d<$mol_vector_range<number>>
		scale_default( ): $mol_vector_2d<number>
		scale( next?: $mol_vector_2d<number> ): $mol_vector_2d<number>
		scale_x( next?: number ): number
		scale_y( next?: number ): number
		size( ): $mol_vector_2d<number>
		size_real( ): $mol_vector_2d<number>
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		dimensions_viewport( ): $mol_vector_2d<$mol_vector_range<number>>
		sub( ): ReturnType< $mol_plot_pane['graphs_sorted'] >
		graphs_colored( ): ReturnType< $mol_plot_pane['graphs_visible'] >
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=pane.view.tree.d.ts.map
declare namespace $ {

	type $mol_chart_legend__graphs_mol_chart_1 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs_colored'] >
		,
		ReturnType< $mol_chart_legend['graphs'] >
	>
	type __mol_chart_2 = $mol_type_enforce<
		Parameters< $mol_chart['zoom'] >[0]
		,
		Parameters< ReturnType< $mol_chart['Plot'] >['scale_x'] >[0]
	>
	type $mol_plot_pane__zoom_mol_chart_3 = $mol_type_enforce<
		ReturnType< $mol_chart['zoom'] >
		,
		ReturnType< $mol_plot_pane['zoom'] >
	>
	type $mol_plot_pane__gap_left_mol_chart_4 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_left'] >
		,
		ReturnType< $mol_plot_pane['gap_left'] >
	>
	type $mol_plot_pane__gap_right_mol_chart_5 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_right'] >
		,
		ReturnType< $mol_plot_pane['gap_right'] >
	>
	type $mol_plot_pane__gap_bottom_mol_chart_6 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_bottom'] >
		,
		ReturnType< $mol_plot_pane['gap_bottom'] >
	>
	type $mol_plot_pane__gap_top_mol_chart_7 = $mol_type_enforce<
		ReturnType< $mol_chart['gap_top'] >
		,
		ReturnType< $mol_plot_pane['gap_top'] >
	>
	type $mol_plot_pane__graphs_mol_chart_8 = $mol_type_enforce<
		ReturnType< $mol_chart['graphs'] >
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	type $mol_plot_pane__hue_base_mol_chart_9 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_base'] >
		,
		ReturnType< $mol_plot_pane['hue_base'] >
	>
	type $mol_plot_pane__hue_shift_mol_chart_10 = $mol_type_enforce<
		ReturnType< $mol_chart['hue_shift'] >
		,
		ReturnType< $mol_plot_pane['hue_shift'] >
	>
	export class $mol_chart extends $mol_view {
		Legend( ): $mol_chart_legend
		zoom( next?: ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] > ): ReturnType< ReturnType< $mol_chart['Plot'] >['scale_x'] >
		graphs_colored( ): ReturnType< ReturnType< $mol_chart['Plot'] >['graphs_colored'] >
		hue_base( ): number
		hue_shift( ): number
		Plot( ): $mol_plot_pane
		gap_hor( ): number
		gap_vert( ): number
		gap_left( ): ReturnType< $mol_chart['gap_hor'] >
		gap_right( ): ReturnType< $mol_chart['gap_hor'] >
		gap_bottom( ): ReturnType< $mol_chart['gap_vert'] >
		gap_top( ): ReturnType< $mol_chart['gap_vert'] >
		graphs( ): readonly($mol_plot_graph)[]
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=chart.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_mol_plot_bar_1 = $mol_type_enforce<
		ReturnType< $mol_plot_bar['curve'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_plot_graph_sample__color_mol_plot_bar_2 = $mol_type_enforce<
		ReturnType< $mol_plot_bar['color'] >
		,
		ReturnType< $mol_plot_graph_sample['color'] >
	>
	export class $mol_plot_bar extends $mol_plot_graph {
		stroke_width( ): string
		curve( ): string
		Curve( ): $mol_svg_path
		style( ): ({ 
			'stroke-width': ReturnType< $mol_plot_bar['stroke_width'] >,
		})  & ReturnType< $mol_plot_graph['style'] >
		sub( ): readonly(any)[]
		Sample( ): $mol_plot_graph_sample
	}
	
}

//# sourceMappingURL=bar.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_graph_sample__color_mol_plot_line_1 = $mol_type_enforce<
		ReturnType< $mol_plot_line['color'] >
		,
		ReturnType< $mol_plot_graph_sample['color'] >
	>
	type $mol_plot_graph_sample__type_mol_plot_line_2 = $mol_type_enforce<
		ReturnType< $mol_plot_line['type'] >
		,
		ReturnType< $mol_plot_graph_sample['type'] >
	>
	export class $mol_plot_line extends $mol_plot_graph {
		curve( ): string
		threshold( ): number
		spacing( ): number
		color_fill( ): string
		dom_name( ): string
		attr( ): ({ 
			'd': ReturnType< $mol_plot_line['curve'] >,
		})  & ReturnType< $mol_plot_graph['attr'] >
		sub( ): readonly(any)[]
		Sample( ): $mol_plot_graph_sample
	}
	
}

//# sourceMappingURL=line.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_path__geometry_mol_plot_dot_1 = $mol_type_enforce<
		ReturnType< $mol_plot_dot['curve'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_plot_graph_sample__color_mol_plot_dot_2 = $mol_type_enforce<
		ReturnType< $mol_plot_dot['color'] >
		,
		ReturnType< $mol_plot_graph_sample['color'] >
	>
	export class $mol_plot_dot extends $mol_plot_graph {
		diameter( ): number
		curve( ): string
		Curve( ): $mol_svg_path
		points_max( ): number
		aspect( ): number
		style( ): ({ 
			'stroke-width': ReturnType< $mol_plot_dot['diameter'] >,
		})  & ReturnType< $mol_plot_graph['style'] >
		sub( ): readonly(any)[]
		Sample( ): $mol_plot_graph_sample
	}
	
}

//# sourceMappingURL=dot.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_graph_sample__sub_mol_plot_group_1 = $mol_type_enforce<
		ReturnType< $mol_plot_group['graph_samples'] >
		,
		ReturnType< $mol_plot_graph_sample['sub'] >
	>
	export class $mol_plot_group extends $mol_plot_graph {
		graphs( ): readonly($mol_plot_graph)[]
		graphs_enriched( ): ReturnType< $mol_plot_group['graphs'] >
		graph_samples( ): readonly($mol_view)[]
		sub( ): ReturnType< $mol_plot_group['graphs_enriched'] >
		Sample( ): $mol_plot_graph_sample
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_rect extends $mol_svg {
		width( ): string
		height( ): string
		pos_x( ): string
		pos_y( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'width': ReturnType< $mol_svg_rect['width'] >,
			'height': ReturnType< $mol_svg_rect['height'] >,
			'x': ReturnType< $mol_svg_rect['pos_x'] >,
			'y': ReturnType< $mol_svg_rect['pos_y'] >,
		})  & ReturnType< $mol_svg['attr'] >
	}
	
}

//# sourceMappingURL=rect.view.tree.d.ts.map
declare namespace $ {

	export class $mol_svg_text extends $mol_svg {
		pos_x( ): string
		pos_y( ): string
		align( ): string
		align_hor( ): ReturnType< $mol_svg_text['align'] >
		align_vert( ): string
		text( ): string
		dom_name( ): string
		pos( ): readonly(any)[]
		attr( ): ({ 
			'x': ReturnType< $mol_svg_text['pos_x'] >,
			'y': ReturnType< $mol_svg_text['pos_y'] >,
			'text-anchor': ReturnType< $mol_svg_text['align_hor'] >,
			'alignment-baseline': ReturnType< $mol_svg_text['align_vert'] >,
		})  & ReturnType< $mol_svg['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=text.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_rect__pos_x_mol_plot_ruler_1 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['background_x'] >
		,
		ReturnType< $mol_svg_rect['pos_x'] >
	>
	type $mol_svg_rect__pos_y_mol_plot_ruler_2 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['background_y'] >
		,
		ReturnType< $mol_svg_rect['pos_y'] >
	>
	type $mol_svg_rect__width_mol_plot_ruler_3 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['background_width'] >
		,
		ReturnType< $mol_svg_rect['width'] >
	>
	type $mol_svg_rect__height_mol_plot_ruler_4 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['background_height'] >
		,
		ReturnType< $mol_svg_rect['height'] >
	>
	type $mol_svg_path__geometry_mol_plot_ruler_5 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['curve'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_text__pos_x_mol_plot_ruler_6 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['title_pos_x'] >
		,
		ReturnType< $mol_svg_text['pos_x'] >
	>
	type $mol_svg_text__pos_y_mol_plot_ruler_7 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['title_pos_y'] >
		,
		ReturnType< $mol_svg_text['pos_y'] >
	>
	type $mol_svg_text__align_mol_plot_ruler_8 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['title_align'] >
		,
		ReturnType< $mol_svg_text['align'] >
	>
	type $mol_svg_text__text_mol_plot_ruler_9 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['title'] >
		,
		ReturnType< $mol_svg_text['text'] >
	>
	type $mol_vector_range__mol_plot_ruler_10 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_ruler_11 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_svg_text__pos_mol_plot_ruler_12 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['label_pos'] >
		,
		ReturnType< $mol_svg_text['pos'] >
	>
	type $mol_svg_text__text_mol_plot_ruler_13 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['label_text'] >
		,
		ReturnType< $mol_svg_text['text'] >
	>
	type $mol_svg_text__align_mol_plot_ruler_14 = $mol_type_enforce<
		ReturnType< $mol_plot_ruler['label_align'] >
		,
		ReturnType< $mol_svg_text['align'] >
	>
	export class $mol_plot_ruler extends $mol_plot_graph {
		background_x( ): string
		background_y( ): string
		background_width( ): string
		background_height( ): string
		Background( ): $mol_svg_rect
		curve( ): string
		Curve( ): $mol_svg_path
		labels_formatted( ): readonly(any)[]
		title_pos_x( ): string
		title_pos_y( ): string
		title_align( ): string
		Title( ): $mol_svg_text
		label_pos_x( id: any): string
		label_pos_y( id: any): string
		label_pos( id: any): readonly(any)[]
		label_text( id: any): string
		label_align( ): string
		step( ): number
		scale_axis( ): number
		scale_step( ): number
		shift_axis( ): number
		dimensions_axis( ): $mol_vector_range<number>
		viewport_axis( ): $mol_vector_range<number>
		axis_points( ): readonly(number)[]
		normalize( next?: number ): number
		precision( ): number
		sub( ): readonly(any)[]
		Label( id: any): $mol_svg_text
	}
	
}

//# sourceMappingURL=ruler.view.tree.d.ts.map
declare namespace $ {

	export class $mol_plot_ruler_vert extends $mol_plot_ruler {
		title_align( ): string
		label_align( ): string
		title_pos_y( ): string
		label_pos_x( id: any): ReturnType< $mol_plot_ruler_vert['title_pos_x'] >
		background_height( ): string
		background_width( ): ReturnType< $mol_plot_ruler_vert['title_pos_x'] >
	}
	
}

//# sourceMappingURL=vert.view.tree.d.ts.map
declare namespace $ {

	export class $mol_plot_ruler_hor extends $mol_plot_ruler {
		title_align( ): string
		label_align( ): string
		title_pos_x( ): string
		title_pos_y( ): string
		label_pos_y( id: any): ReturnType< $mol_plot_ruler_hor['title_pos_y'] >
		background_width( ): string
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $ {

	export class $mol_plot_mark_hor extends $mol_plot_ruler_hor {
		labels( ): readonly(string)[]
	}
	
}

//# sourceMappingURL=hor.view.tree.d.ts.map
declare namespace $ {

	type $mol_svg_rect__width_mol_svg_text_box_1 = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['box_width'] >
		,
		ReturnType< $mol_svg_rect['width'] >
	>
	type $mol_svg_rect__height_mol_svg_text_box_2 = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['box_height'] >
		,
		ReturnType< $mol_svg_rect['height'] >
	>
	type $mol_svg_rect__pos_mol_svg_text_box_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_rect['pos'] >
	>
	type $mol_svg_text__pos_mol_svg_text_box_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_text['pos'] >
	>
	type $mol_svg_text__align_mol_svg_text_box_5 = $mol_type_enforce<
		ReturnType< $mol_svg_text_box['align'] >
		,
		ReturnType< $mol_svg_text['align'] >
	>
	type $mol_svg_text__sub_mol_svg_text_box_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_svg_text['sub'] >
	>
	export class $mol_svg_text_box extends $mol_svg_group {
		box_width( ): string
		box_height( ): string
		box_pos_x( ): ReturnType< $mol_svg_text_box['pos_x'] >
		box_pos_y( ): string
		Back( ): $mol_svg_rect
		pos_x( ): string
		pos_y( ): string
		align( ): string
		text( ): string
		Text( ): $mol_svg_text
		font_size( ): number
		width( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=box.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_plot_mark_cross_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_plot_mark_cross_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_svg_path__geometry_mol_plot_mark_cross_3 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['curve'] >
		,
		ReturnType< $mol_svg_path['geometry'] >
	>
	type $mol_svg_text_box__pos_x_mol_plot_mark_cross_4 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_x_pos_x'] >
		,
		ReturnType< $mol_svg_text_box['pos_x'] >
	>
	type $mol_svg_text_box__pos_y_mol_plot_mark_cross_5 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_x_pos_y'] >
		,
		ReturnType< $mol_svg_text_box['pos_y'] >
	>
	type $mol_svg_text_box__text_mol_plot_mark_cross_6 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_x'] >
		,
		ReturnType< $mol_svg_text_box['text'] >
	>
	type $mol_svg_text_box__pos_x_mol_plot_mark_cross_7 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_y_pos_x'] >
		,
		ReturnType< $mol_svg_text_box['pos_x'] >
	>
	type $mol_svg_text_box__pos_y_mol_plot_mark_cross_8 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_y_pos_y'] >
		,
		ReturnType< $mol_svg_text_box['pos_y'] >
	>
	type $mol_svg_text_box__text_mol_plot_mark_cross_9 = $mol_type_enforce<
		ReturnType< $mol_plot_mark_cross['title_y'] >
		,
		ReturnType< $mol_svg_text_box['text'] >
	>
	type $mol_vector_2d__mol_plot_mark_cross_10 = $mol_type_enforce<
		[ ReturnType< $mol_plot_mark_cross['dimensions_x'] >, ReturnType< $mol_plot_mark_cross['dimensions_y'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_plot_mark_cross extends $mol_plot_graph {
		dimensions_x( ): $mol_vector_range<number>
		dimensions_y( ): $mol_vector_range<number>
		curve( ): string
		Curve( ): $mol_svg_path
		title_x_pos_x( ): string
		title_x_pos_y( ): string
		title_x( ): string
		Label_x( ): $mol_svg_text_box
		title_y_pos_x( ): string
		title_y_pos_y( ): string
		title_y( ): string
		Label_y( ): $mol_svg_text_box
		labels( ): readonly(string)[]
		title_x_gap( ): number
		title_y_gap( ): number
		threshold( ): number
		graphs( ): readonly($mol_plot_graph)[]
		dimensions( ): $mol_vector_2d<$mol_vector_range<number>>
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=cross.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_bar__title_mol_chart_demo_simple_1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_y_mol_chart_demo_simple_2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['plan'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_group__title_mol_chart_demo_simple_3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['fact_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_y_mol_chart_demo_simple_4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['facts'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs_mol_chart_demo_simple_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title_mol_chart_demo_simple_6 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_chart_demo_simple_months__7 = $mol_type_enforce<
		`January`
		,
		string
	>
	type $mol_chart_demo_simple_months__8 = $mol_type_enforce<
		`February`
		,
		string
	>
	type $mol_chart_demo_simple_months__9 = $mol_type_enforce<
		`March`
		,
		string
	>
	type $mol_chart_demo_simple_months__10 = $mol_type_enforce<
		`April`
		,
		string
	>
	type $mol_plot_mark_hor__title_mol_chart_demo_simple_11 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['marker_hor_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__labels_mol_chart_demo_simple_12 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_hor['labels'] >
	>
	type $mol_plot_mark_cross__labels_mol_chart_demo_simple_13 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_simple['months'] >
		,
		ReturnType< $mol_plot_mark_cross['labels'] >
	>
	type $mol_plot_mark_cross__graphs_mol_chart_demo_simple_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs_mol_chart_demo_simple_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_simple extends $mol_example_large {
		plan_title( ): string
		plan( ): readonly(any)[]
		Plan( ): $mol_plot_bar
		fact_title( ): string
		facts( ): readonly(any)[]
		Fact_line( ): $mol_plot_line
		Fact_dots( ): $mol_plot_dot
		Fact( ): $mol_plot_group
		vert_title( ): string
		Vert_ruler( ): $mol_plot_ruler_vert
		marker_hor_title( ): string
		months( ): readonly(string)[]
		Marker_hor( ): $mol_plot_mark_hor
		Marker_cross( ): $mol_plot_mark_cross
		Chart( ): $mol_chart
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_plot_fill extends $mol_plot_line {
		threshold( ): number
	}
	
}

//# sourceMappingURL=fill.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_bar__title_mol_chart_demo_styles_1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x_mol_chart_demo_styles_2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y_mol_chart_demo_styles_3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_2_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_bar__title_mol_chart_demo_styles_4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['receipts_confirmed_title'] >
		,
		ReturnType< $mol_plot_bar['title'] >
	>
	type $mol_plot_bar__series_x_mol_chart_demo_styles_5 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_bar['series_x'] >
	>
	type $mol_plot_bar__series_y_mol_chart_demo_styles_6 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_3_y'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_dot__title_mol_chart_demo_styles_7 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['maximum_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x_mol_chart_demo_styles_8 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y_mol_chart_demo_styles_9 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_1_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_line__type_mol_chart_demo_styles_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_line__title_mol_chart_demo_styles_11 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['waste_title'] >
		,
		ReturnType< $mol_plot_line['title'] >
	>
	type $mol_plot_line__series_x_mol_chart_demo_styles_12 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_line['series_x'] >
	>
	type $mol_plot_line__series_y_mol_chart_demo_styles_13 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_4_y'] >
		,
		ReturnType< $mol_plot_line['series_y'] >
	>
	type $mol_plot_group__title_mol_chart_demo_styles_14 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['purchases_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x_mol_chart_demo_styles_15 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y_mol_chart_demo_styles_16 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_5_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs_mol_chart_demo_styles_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_line__type_mol_chart_demo_styles_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_group__title_mol_chart_demo_styles_19 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['taxes_title'] >
		,
		ReturnType< $mol_plot_group['title'] >
	>
	type $mol_plot_group__series_x_mol_chart_demo_styles_20 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_group['series_x'] >
	>
	type $mol_plot_group__series_y_mol_chart_demo_styles_21 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_6_y'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs_mol_chart_demo_styles_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_ruler_vert__title_mol_chart_demo_styles_23 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['energy_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_mark_hor__title_mol_chart_demo_styles_24 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['day_title'] >
		,
		ReturnType< $mol_plot_mark_hor['title'] >
	>
	type $mol_plot_mark_hor__series_x_mol_chart_demo_styles_25 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['series_x'] >
		,
		ReturnType< $mol_plot_mark_hor['series_x'] >
	>
	type $mol_chart__graphs_mol_chart_demo_styles_26 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_styles['graphs'] >
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_styles extends $mol_example_large {
		receipts_title( ): string
		series_x( ): readonly(number)[]
		series_2_y( ): readonly(number)[]
		Receipts( ): $mol_plot_bar
		receipts_confirmed_title( ): string
		series_3_y( ): readonly(number)[]
		Receipts_confirmed( ): $mol_plot_bar
		maximum_title( ): string
		series_1_y( ): readonly(number)[]
		Maximum( ): $mol_plot_dot
		waste_title( ): string
		series_4_y( ): readonly(number)[]
		Waste( ): $mol_plot_line
		purchases_title( ): string
		series_5_y( ): readonly(number)[]
		Purchases_fill( ): $mol_plot_fill
		Purchases_line( ): $mol_plot_line
		Purchases_dots( ): $mol_plot_dot
		Purchases( ): $mol_plot_group
		taxes_title( ): string
		series_6_y( ): readonly(number)[]
		Taxes_fill( ): $mol_plot_fill
		Taxes_line( ): $mol_plot_line
		Taxes_dots( ): $mol_plot_dot
		Taxes( ): $mol_plot_group
		energy_title( ): string
		Energy( ): $mol_plot_ruler_vert
		day_title( ): string
		Day( ): $mol_plot_mark_hor
		graphs( ): readonly(any)[]
		Chart( ): $mol_chart
		title( ): string
		samples_count( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_dot__title_mol_chart_demo_forces_1 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x_mol_chart_demo_forces_2 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y_mol_chart_demo_forces_3 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max_mol_chart_demo_forces_4 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_dot__title_mol_chart_demo_forces_5 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_title'] >
		,
		ReturnType< $mol_plot_dot['title'] >
	>
	type $mol_plot_dot__series_x_mol_chart_demo_forces_6 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_x'] >
		,
		ReturnType< $mol_plot_dot['series_x'] >
	>
	type $mol_plot_dot__series_y_mol_chart_demo_forces_7 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_right_y'] >
		,
		ReturnType< $mol_plot_dot['series_y'] >
	>
	type $mol_plot_dot__points_max_mol_chart_demo_forces_8 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['points_max'] >
		,
		ReturnType< $mol_plot_dot['points_max'] >
	>
	type $mol_plot_ruler_vert__title_mol_chart_demo_forces_9 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['vert_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_ruler_hor__title_mol_chart_demo_forces_10 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['hor_title'] >
		,
		ReturnType< $mol_plot_ruler_hor['title'] >
	>
	type $mol_plot_ruler_hor__series_x_mol_chart_demo_forces_11 = $mol_type_enforce<
		ReturnType< $mol_chart_demo_forces['forces_left_x'] >
		,
		ReturnType< $mol_plot_ruler_hor['series_x'] >
	>
	type $mol_plot_mark_cross__graphs_mol_chart_demo_forces_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_mark_cross['graphs'] >
	>
	type $mol_chart__graphs_mol_chart_demo_forces_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_chart['graphs'] >
	>
	export class $mol_chart_demo_forces extends $mol_example_large {
		forces_left_title( ): string
		forces_left_x( ): readonly(number)[]
		forces_left_y( ): readonly(number)[]
		Forces_left( ): $mol_plot_dot
		forces_right_title( ): string
		forces_right_x( ): readonly(number)[]
		forces_right_y( ): readonly(number)[]
		Forces_right( ): $mol_plot_dot
		vert_title( ): string
		Vert_ruler( ): $mol_plot_ruler_vert
		hor_title( ): string
		Hor_ruler( ): $mol_plot_ruler_hor
		Cross( ): $mol_plot_mark_cross
		Chart( ): $mol_chart
		title( ): string
		samples_count( ): number
		points_max( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=forces.view.tree.d.ts.map
declare namespace $ {

	type $mol_chat__seed_mol_chat_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_chat['seed'] >
	>
	export class $mol_chat_demo extends $mol_example_small {
		chat_pages( ): ReturnType< ReturnType< $mol_chat_demo['Chat'] >['pages'] >
		Chat( ): $mol_chat
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_box__checked_mol_check_box_demo_1 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_box_demo_2 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c1Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__title_mol_check_box_demo_3 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c2Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_box_demo_4 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_box_demo_5 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['c6Label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_box_demo_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled_mol_check_box_demo_7 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_check_box__checked_mol_check_box_demo_8 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['base_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked_mol_check_box_demo_9 = $mol_type_enforce<
		ReturnType< $mol_check_box_demo['checked_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__checked_mol_check_box_demo_10 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled_mol_check_box_demo_11 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	type $mol_list__rows_mol_check_box_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_box_demo extends $mol_example_small {
		base_checked( next?: boolean ): boolean
		c1Label( ): string
		Labeled_base( ): $mol_check_box
		c2Label( ): string
		checked_checked( next?: boolean ): boolean
		Labeled_checked( ): $mol_check_box
		c6Label( ): string
		Labeled_disabled( ): $mol_check_box
		Alone_base( ): $mol_check_box
		Alone_checked( ): $mol_check_box
		Alone_disabled( ): $mol_check_box
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_list__option_checked_mol_check_list_demo_1 = $mol_type_enforce<
		ReturnType< $mol_check_list_demo['right'] >
		,
		ReturnType< $mol_check_list['option_checked'] >
	>
	type $mol_check_list__options_mol_check_list_demo_2 = $mol_type_enforce<
		({ 
			'read': string,
			'write': string,
			'rights': string,
			'backup': string,
			'restart': string,
			'ping': string,
			'api': string,
			'docs': string,
		}) 
		,
		ReturnType< $mol_check_list['options'] >
	>
	export class $mol_check_list_demo extends $mol_example_small {
		right( id: any, next?: boolean ): boolean
		Rights( ): $mol_check_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_expand__checked_mol_check_expand_demo_1 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['base_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__title_mol_check_expand_demo_2 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c1Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__title_mol_check_expand_demo_3 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c2Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__checked_mol_check_expand_demo_4 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['expanded_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__title_mol_check_expand_demo_5 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['c5Label'] >
		,
		ReturnType< $mol_check_expand['title'] >
	>
	type $mol_check_expand__disabled_mol_check_expand_demo_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_expand['disabled'] >
	>
	type $mol_check_expand__checked_mol_check_expand_demo_7 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['base_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_check_expand__checked_mol_check_expand_demo_8 = $mol_type_enforce<
		ReturnType< $mol_check_expand_demo['expanded_expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	type $mol_list__rows_mol_check_expand_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_expand_demo extends $mol_example_small {
		base_expanded( next?: boolean ): boolean
		c1Label( ): string
		Labeled_base( ): $mol_check_expand
		c2Label( ): string
		expanded_expanded( next?: boolean ): boolean
		Labeled_expanded( ): $mol_check_expand
		c5Label( ): string
		Disabled( ): $mol_check_expand
		Empty_base( ): $mol_check_expand
		Empty_expanded( ): $mol_check_expand
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=check.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_check_all extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=all.view.tree.d.ts.map
declare namespace $ {

	export class $mol_check_group extends $mol_check_box {
		checks( ): readonly($mol_check)[]
		full( ): boolean
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_group__title_mol_check_group_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_check_group['title'] >
	>
	type $mol_check_group__checks_mol_check_group_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_check_group['checks'] >
	>
	type $mol_check_box__title_mol_check_group_demo_3 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_4 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['strength'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_5 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_6 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['perception'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_7 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_8 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['endurance'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_9 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_10 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['charisma'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_11 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_12 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['intelligence'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_13 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_14 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['agility'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__title_mol_check_group_demo_15 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck_title'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_check_group_demo_16 = $mol_type_enforce<
		ReturnType< $mol_check_group_demo['luck'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_list__rows_mol_check_group_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows_mol_check_group_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_check_group_demo extends $mol_example_small {
		All( ): $mol_check_group
		strength_title( ): string
		strength( next?: boolean ): boolean
		Strength( ): $mol_check_box
		perception_title( ): string
		perception( next?: boolean ): boolean
		Perception( ): $mol_check_box
		endurance_title( ): string
		endurance( next?: boolean ): boolean
		Endurance( ): $mol_check_box
		charisma_title( ): string
		charisma( next?: boolean ): boolean
		Charisma( ): $mol_check_box
		intelligence_title( ): string
		intelligence( next?: boolean ): boolean
		Intelligence( ): $mol_check_box
		agility_title( ): string
		agility( next?: boolean ): boolean
		Agility( ): $mol_check_box
		luck_title( ): string
		luck( next?: boolean ): boolean
		Luck( ): $mol_check_box
		Partial( ): $mol_list
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_microphone extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=microphone.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__Icon_mol_check_icon_demo_1 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Base_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_mol_check_icon_demo_2 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['base_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_check_icon_demo_3 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Checked_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_mol_check_icon_demo_4 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['checked_checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_box__Icon_mol_check_icon_demo_5 = $mol_type_enforce<
		ReturnType< $mol_check_icon_demo['Disabled_icon'] >
		,
		ReturnType< $mol_check_box['Icon'] >
	>
	type $mol_check_box__checked_mol_check_icon_demo_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_check_box__enabled_mol_check_icon_demo_7 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_check_box['enabled'] >
	>
	export class $mol_check_icon_demo extends $mol_example_small {
		Base_icon( ): $mol_icon_microphone
		base_checked( next?: boolean ): boolean
		Base( ): $mol_check_icon
		Checked_icon( ): $mol_icon_microphone
		checked_checked( next?: boolean ): boolean
		Checked( ): $mol_check_icon
		Disabled_icon( ): $mol_icon_microphone
		Disabled( ): $mol_check_box
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_code_1 = $mol_type_enforce<
		ReturnType< $mol_code['value'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__hint_mol_code_2 = $mol_type_enforce<
		ReturnType< $mol_code['hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_button__event_click_mol_code_3 = $mol_type_enforce<
		ReturnType< $mol_code['event_scan'] >
		,
		ReturnType< $mol_button['event_click'] >
	>
	type $mol_button__sub_mol_code_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button['sub'] >
	>
	export class $mol_code extends $mol_view {
		value( next?: string ): string
		format( ): string
		hint( ): ReturnType< $mol_code['format'] >
		Manual( ): $mol_search
		event_scan( next?: any ): any
		scan_label( ): string
		Scan( ): $mol_button
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=code.view.tree.d.ts.map
declare namespace $ {

	type $mol_code__format_mol_code_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	type $mol_code__format_mol_code_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_code['format'] >
	>
	export class $mol_code_demo extends $mol_example_small {
		Qr( ): $mol_code
		Matrix( ): $mol_code
		Upc_e( ): $mol_code
		Upc_a( ): $mol_code
		Ean_8( ): $mol_code
		Ean_13( ): $mol_code
		Code_128( ): $mol_code
		Code_39( ): $mol_code
		Itf( ): $mol_code
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_csv_parse_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_csv_serial_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_array_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_boolean_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_const_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_dict_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_email_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_enum_demo_number extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	export class $mol_data_enum_demo_string extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_instance_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_integer_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_nullable_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_number_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_optional_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_pattern_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_pipe_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_range_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_record_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_string_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_tagged_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_data_variant_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=calendar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_calendar_today extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=today.view.tree.d.ts.map
declare namespace $ {

	export class $mol_format extends $mol_string {
		mask( id: any): string
		allow( ): string
		hint( ): ReturnType< $mol_format['mask'] >
		keyboard( ): string
	}
	
}

//# sourceMappingURL=format.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=can.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_trash_can_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__hint_mol_date_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_2 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_3 = $mol_type_enforce<
		ReturnType< $mol_date['today_click'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type __mol_date_5 = $mol_type_enforce<
		Parameters< $mol_date['value_changed'] >[0]
		,
		Parameters< ReturnType< $mol_date['Input'] >['value_changed'] >[0]
	>
	type $mol_format__value_mol_date_6 = $mol_type_enforce<
		ReturnType< $mol_date['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask_mol_date_7 = $mol_type_enforce<
		ReturnType< $mol_date['input_mask'] >
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__enabled_mol_date_8 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_button_minor__hint_mol_date_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_date_10 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_button_minor__click_mol_date_11 = $mol_type_enforce<
		ReturnType< $mol_date['clear'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_13 = $mol_type_enforce<
		ReturnType< $mol_date['input_content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_mol_date_14 = $mol_type_enforce<
		ReturnType< $mol_date['prev_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_15 = $mol_type_enforce<
		ReturnType< $mol_date['prev'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__hint_mol_date_17 = $mol_type_enforce<
		ReturnType< $mol_date['next_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_date_18 = $mol_type_enforce<
		ReturnType< $mol_date['next'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_date_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_date_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_date_calendar__enabled_mol_date_21 = $mol_type_enforce<
		ReturnType< $mol_date['enabled'] >
		,
		ReturnType< $mol_date_calendar['enabled'] >
	>
	type $mol_date_calendar__month_moment_mol_date_22 = $mol_type_enforce<
		ReturnType< $mol_date['month_moment'] >
		,
		ReturnType< $mol_date_calendar['month_moment'] >
	>
	type $mol_date_calendar__day_selected_mol_date_23 = $mol_type_enforce<
		ReturnType< $mol_date['day_selected'] >
		,
		ReturnType< $mol_date_calendar['day_selected'] >
	>
	type $mol_date_calendar__day_click_mol_date_24 = $mol_type_enforce<
		ReturnType< $mol_date['day_click'] >
		,
		ReturnType< $mol_date_calendar['day_click'] >
	>
	type $mol_date_calendar__head_mol_date_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_date_calendar['head'] >
	>
	export class $mol_date extends $mol_pick {
		enabled( ): boolean
		today_click( next?: any ): any
		Today_icon( ): $mol_icon_calendar_today
		Today( ): $mol_button_minor
		value( next?: string ): string
		value_changed( next?: ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] > ): ReturnType< ReturnType< $mol_date['Input'] >['value_changed'] >
		input_mask( id: any): string
		Input( ): $mol_format
		clear( next?: any ): any
		Clear_icon( ): $mol_icon_trash_can_outline
		Clear( ): $mol_button_minor
		input_content( ): readonly(any)[]
		Input_row( ): $mol_view
		month_moment( ): ReturnType< $mol_date['value_moment'] >
		day_selected( id: any): boolean
		day_click( id: any, next?: any ): any
		Calendar_title( ): ReturnType< ReturnType< $mol_date['Calendar'] >['Title'] >
		prev_hint( ): string
		prev( next?: any ): any
		Prev_icon( ): $mol_icon_chevron_left
		Prev( ): $mol_button_minor
		next_hint( ): string
		next( next?: any ): any
		Next_icon( ): $mol_icon_chevron_right
		Next( ): $mol_button_minor
		Calendar_tools( ): $mol_view
		Calendar( ): $mol_date_calendar
		Icon( ): $mol_icon_calendar
		bubble_content( ): readonly(any)[]
		value_number( next?: number ): number
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
	type $mol_button_minor__title_mol_date_calendar_1 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_text'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__event_click_mol_date_calendar_2 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['day_click'] >
		,
		ReturnType< $mol_button_minor['event_click'] >
	>
	type $mol_button_minor__minimal_height_mol_date_calendar_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_button_minor['minimal_height'] >
	>
	type $mol_button_minor__enabled_mol_date_calendar_4 = $mol_type_enforce<
		ReturnType< $mol_date_calendar['enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	export class $mol_date_calendar extends $mol_calendar {
		day_click( id: any, next?: any ): any
		enabled( ): boolean
		Day_button( id: any): $mol_button_minor
		day_content( id: any): readonly(any)[]
	}
	
}

//# sourceMappingURL=date.view.tree.d.ts.map
declare namespace $ {

	type $mol_date__value_moment_mol_date_demo_1 = $mol_type_enforce<
		ReturnType< $mol_date_demo['date_current'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	type $mol_view__sub_mol_date_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_date__value_moment_mol_date_demo_3 = $mol_type_enforce<
		ReturnType< $mol_date_demo['date_empty'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	export class $mol_date_demo extends $mol_example_small {
		date_current( next?: $mol_time_moment ): $mol_time_moment
		Current( ): $mol_date
		formatted( ): string
		Formatted( ): $mol_view
		date_empty( next?: any ): any
		Empty( ): $mol_date
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_switch__value_mol_deck_1 = $mol_type_enforce<
		ReturnType< $mol_deck['current'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_deck_2 = $mol_type_enforce<
		ReturnType< $mol_deck['switch_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	export class $mol_deck extends $mol_list {
		current( next?: string ): string
		switch_options( ): Record<string, any>
		Switch( ): $mol_switch
		Content( ): $mol_view
		items( ): readonly($mol_view)[]
		rows( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=deck.view.tree.d.ts.map
declare namespace $ {

	type $mol_card__title_mol_deck_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content_mol_deck_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title_mol_deck_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content_mol_deck_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title_mol_deck_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content_mol_deck_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title_mol_deck_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__content_mol_deck_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__title_mol_deck_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['title'] >
	>
	type $mol_card__Content_mol_deck_demo_10 = $mol_type_enforce<
		ReturnType< $mol_deck_demo['Spam_content'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_deck__items_mol_deck_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_deck['items'] >
	>
	export class $mol_deck_demo extends $mol_example_small {
		Greeting( ): $mol_card
		Question( ): $mol_card
		Answer( ): $mol_card
		Command( ): $mol_card
		Spam_content( ): $mol_filler
		Spam( ): $mol_card
		Deck( ): $mol_deck
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_dimmer__haystack_mol_dimmer_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_dimmer_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_dimmer_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_dimmer_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_dimmer_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_dimmer_demo_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_dimmer_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_list__rows_mol_dimmer_demo_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_dimmer_demo extends $mol_example_small {
		One( ): $mol_dimmer
		Two( ): $mol_dimmer
		Three( ): $mol_dimmer
		Four( ): $mol_dimmer
		Five( ): $mol_dimmer
		Six( ): $mol_dimmer
		Cases( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_drag extends $mol_ghost {
		start( next?: any ): any
		drag_start( next?: ReturnType< $mol_drag['start'] > ): ReturnType< $mol_drag['start'] >
		move( next?: any ): any
		drag_move( next?: ReturnType< $mol_drag['move'] > ): ReturnType< $mol_drag['move'] >
		end( next?: any ): any
		drag_end( next?: ReturnType< $mol_drag['end'] > ): ReturnType< $mol_drag['end'] >
		status( next?: string ): string
		event( ): ({ 
			dragstart( next?: ReturnType< $mol_drag['drag_start'] > ): ReturnType< $mol_drag['drag_start'] >,
			drag( next?: ReturnType< $mol_drag['drag_move'] > ): ReturnType< $mol_drag['drag_move'] >,
			dragend( next?: ReturnType< $mol_drag['drag_end'] > ): ReturnType< $mol_drag['drag_end'] >,
		}) 
		attr( ): ({ 
			'draggable': boolean,
			'mol_drag_status': ReturnType< $mol_drag['status'] >,
		}) 
		transfer( ): ({ 
			'text/plain': string,
			'text/html': string,
			'text/uri-list': string,
		}) 
		allow_copy( ): boolean
		allow_link( ): boolean
		allow_move( ): boolean
		image( ): ReturnType< $mol_drag['dom_node'] >
	}
	
}

//# sourceMappingURL=drag.view.tree.d.ts.map
declare namespace $ {

	export class $mol_drop extends $mol_ghost {
		enter( next?: any ): any
		move( next?: any ): any
		leave( next?: any ): any
		drop( next?: any ): any
		status( next?: string ): string
		enabled( next?: boolean ): boolean
		event( ): ({ 
			dragenter( next?: ReturnType< $mol_drop['enter'] > ): ReturnType< $mol_drop['enter'] >,
			dragover( next?: ReturnType< $mol_drop['move'] > ): ReturnType< $mol_drop['move'] >,
			dragleave( next?: ReturnType< $mol_drop['leave'] > ): ReturnType< $mol_drop['leave'] >,
			drop( next?: ReturnType< $mol_drop['drop'] > ): ReturnType< $mol_drop['drop'] >,
		}) 
		attr( ): ({ 
			'mol_drop_status': ReturnType< $mol_drop['status'] >,
		}) 
		adopt( next?: Record<string, any> ): Record<string, any>
		receive( next?: any ): any
		allow( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=drop.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_drag_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_drop__adopt_mol_drag_demo_2 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive_mol_drag_demo_3 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_trash'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub_mol_drag_demo_4 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Trash'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_list__rows_mol_drag_demo_5 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_page__head_mol_drag_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['head'] >
	>
	type $mol_page__Body_content_mol_drag_demo_7 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['List'] >
		,
		ReturnType< $mol_page['Body_content'] >
	>
	type $mol_drop__adopt_mol_drag_demo_8 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive_mol_drag_demo_9 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub_mol_drag_demo_10 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Page'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_link__uri_mol_drag_demo_11 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['task_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__sub_mol_drag_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_drop__adopt_mol_drag_demo_13 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['transfer_adopt'] >
		,
		ReturnType< $mol_drop['adopt'] >
	>
	type $mol_drop__receive_mol_drag_demo_14 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['receive_before'] >
		,
		ReturnType< $mol_drop['receive'] >
	>
	type $mol_drop__Sub_mol_drag_demo_15 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Task_link'] >
		,
		ReturnType< $mol_drop['Sub'] >
	>
	type $mol_drag__transfer_mol_drag_demo_16 = $mol_type_enforce<
		({ 
			'text/plain': ReturnType< $mol_drag_demo['task_title'] >,
			'text/html': ReturnType< $mol_drag_demo['task_html'] >,
			'text/uri-list': ReturnType< $mol_drag_demo['task_uri'] >,
		}) 
		,
		ReturnType< $mol_drag['transfer'] >
	>
	type $mol_drag__Sub_mol_drag_demo_17 = $mol_type_enforce<
		ReturnType< $mol_drag_demo['Task_drop'] >
		,
		ReturnType< $mol_drag['Sub'] >
	>
	export class $mol_drag_demo extends $mol_example_large {
		transfer_adopt( next?: any ): any
		receive( next?: any ): any
		receive_trash( next?: any ): any
		Trash_icon( ): $mol_icon_trash_can_outline
		Trash( ): $mol_view
		Trash_drop( ): $mol_drop
		task_rows( ): readonly(any)[]
		List( ): $mol_list
		Page( ): $mol_page
		List_drop( ): $mol_drop
		task_title( id: any): string
		task_html( id: any): string
		task_uri( id: any): string
		receive_before( id: any, next?: any ): any
		Task_link( id: any): $mol_link
		Task_drop( id: any): $mol_drop
		task_count( ): number
		sub( ): readonly(any)[]
		Task_row( id: any): $mol_drag
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_dump_value__value_mol_dump_demo_1 = $mol_type_enforce<
		ReturnType< $mol_dump_demo['value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_dump_value__value_mol_dump_demo_2 = $mol_type_enforce<
		ReturnType< $mol_dump_demo['value'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_dump_value__prototypes_mol_dump_demo_3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_dump_value['prototypes'] >
	>
	type $mol_list__rows_mol_dump_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_dump_demo extends $mol_example_small {
		value( ): any
		Dump_short( ): $mol_dump_value
		Dump_long( ): $mol_dump_value
		Dump_list( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__query_mol_emoji_safe_demo_1 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['filter'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_row__sub_mol_emoji_safe_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title_mol_emoji_safe_demo_3 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['group_title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text_mol_emoji_safe_demo_4 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['group_emoji_text'] >
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_copy__hint_mol_emoji_safe_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__Icon_mol_emoji_safe_demo_6 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_copy['Icon'] >
	>
	type $mol_button_copy__hint_mol_emoji_safe_demo_7 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emoji_hint'] >
		,
		ReturnType< $mol_button_copy['hint'] >
	>
	type $mol_button_copy__title_mol_emoji_safe_demo_8 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emoji'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__Icon_mol_emoji_safe_demo_9 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_button_copy['Icon'] >
	>
	type $mol_view__sub_mol_emoji_safe_demo_10 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['emojis'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_section__Title_mol_emoji_safe_demo_11 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['Group_title'] >
		,
		ReturnType< $mol_section['Title'] >
	>
	type $mol_section__content_mol_emoji_safe_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_list__rows_mol_emoji_safe_demo_13 = $mol_type_enforce<
		ReturnType< $mol_emoji_safe_demo['groups'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows_mol_emoji_safe_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_emoji_safe_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_emoji_safe_demo extends $mol_example_large {
		filter( next?: string ): string
		Filter( ): $mol_search
		Tools( ): $mol_row
		group_title( id: any): string
		group_emoji_text( id: any): string
		Group_title( id: any): $mol_button_copy
		emoji_hint( id: any): string
		emoji( id: any): string
		Emoji( id: any): $mol_button_copy
		emojis( id: any): readonly(any)[]
		Emojis( id: any): $mol_view
		Group( id: any): $mol_section
		groups( ): readonly(any)[]
		Groups( ): $mol_list
		Content( ): $mol_list
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_expander__title_mol_expander_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_expander['title'] >
	>
	type $mol_expander__content_mol_expander_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['content'] >
	>
	export class $mol_expander_demo extends $mol_example_small {
		Content( ): $mol_filler
		Expander( ): $mol_expander
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_fetch_demo_1 = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['url'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_button_major__click_mol_fetch_demo_2 = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['fetch_data'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_view__sub_mol_fetch_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_dump_value__value_mol_fetch_demo_4 = $mol_type_enforce<
		ReturnType< $mol_fetch_demo['data'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_list__rows_mol_fetch_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_fetch_demo extends $mol_example_small {
		url( next?: string ): string
		Url( ): $mol_string
		fetch_data( next?: any ): any
		Fetch( ): $mol_button_major
		Request( ): $mol_view
		data( next?: any ): any
		Data( ): $mol_dump_value
		Content( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_filler__min_symbols_mol_filler_demo_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	export class $mol_filler_demo extends $mol_example_small {
		Filler( ): $mol_filler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_paragraph__title_mol_float_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_row__sub_mol_float_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_float__sub_mol_float_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_float['sub'] >
	>
	type $mol_list__rows_mol_float_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_float_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_float_demo extends $mol_example_large {
		Head_content( ): $mol_paragraph
		Head_row( ): $mol_row
		Head( ): $mol_float
		Filler1( ): $mol_filler
		Filler2( ): $mol_filler
		Content( ): $mol_list
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_form_group extends $mol_view {
	}
	
}

//# sourceMappingURL=group.view.tree.d.ts.map
declare namespace $ {

	type $mol_attach__items_mol_form_demo_1 = $mol_type_enforce<
		ReturnType< $mol_form_demo['avatars'] >
		,
		ReturnType< $mol_attach['items'] >
	>
	type $mol_form_field__name_mol_form_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_3 = $mol_type_enforce<
		ReturnType< $mol_form_demo['avatars_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_4 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Avatars_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_string__hint_mol_form_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_form_demo_6 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_first'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_form_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_8 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_first_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_9 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Name_first_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_string__hint_mol_form_demo_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_form_demo_11 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_nick'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_form_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_13 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_nick_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_14 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Name_nick_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_string__hint_mol_form_demo_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_form_demo_16 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_second'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_form_demo_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_18 = $mol_type_enforce<
		ReturnType< $mol_form_demo['name_second_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_19 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Name_second_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_form_group__sub_mol_form_demo_20 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_group['sub'] >
	>
	type $mol_number__value_mol_form_demo_21 = $mol_type_enforce<
		ReturnType< $mol_form_demo['age'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_form_field__name_mol_form_demo_22 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_23 = $mol_type_enforce<
		ReturnType< $mol_form_demo['age_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_24 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Age_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_switch__value_mol_form_demo_25 = $mol_type_enforce<
		ReturnType< $mol_form_demo['sex'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_form_demo_26 = $mol_type_enforce<
		ReturnType< $mol_form_demo['sex_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_form_field__name_mol_form_demo_27 = $mol_type_enforce<
		ReturnType< $mol_form_demo['sex_label'] >
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_28 = $mol_type_enforce<
		ReturnType< $mol_form_demo['sex_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_29 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Sex_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_select__value_mol_form_demo_30 = $mol_type_enforce<
		ReturnType< $mol_form_demo['color'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary_mol_form_demo_31 = $mol_type_enforce<
		({ 
			'': string,
			'white': string,
			'yellow': string,
			'brown': string,
			'red': string,
		}) 
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_form_field__name_mol_form_demo_32 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_33 = $mol_type_enforce<
		ReturnType< $mol_form_demo['color_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_34 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Color_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_form_group__sub_mol_form_demo_35 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_group['sub'] >
	>
	type $mol_string__hint_mol_form_demo_36 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_form_demo_37 = $mol_type_enforce<
		ReturnType< $mol_form_demo['mail'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_form_demo_38 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bid_mol_form_demo_39 = $mol_type_enforce<
		ReturnType< $mol_form_demo['mail_bid'] >
		,
		ReturnType< $mol_form_field['bid'] >
	>
	type $mol_form_field__Content_mol_form_demo_40 = $mol_type_enforce<
		ReturnType< $mol_form_demo['Mail_control'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_button_major__title_mol_form_demo_41 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click_mol_form_demo_42 = $mol_type_enforce<
		ReturnType< $mol_form_demo['signup'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__enabled_mol_form_demo_43 = $mol_type_enforce<
		ReturnType< $mol_form_demo['signup_allowed'] >
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_status__message_mol_form_demo_44 = $mol_type_enforce<
		ReturnType< $mol_form_demo['result'] >
		,
		ReturnType< $mol_status['message'] >
	>
	type $mol_form__body_mol_form_demo_45 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['body'] >
	>
	type $mol_form__submit_mol_form_demo_46 = $mol_type_enforce<
		ReturnType< $mol_form_demo['signup'] >
		,
		ReturnType< $mol_form['submit'] >
	>
	type $mol_form__buttons_mol_form_demo_47 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form['buttons'] >
	>
	export class $mol_form_demo extends $mol_example {
		avatars_bid( ): string
		avatars( next?: readonly(string)[] ): readonly(string)[]
		Avatars_control( ): $mol_attach
		Avatars_field( ): $mol_form_field
		name_first_bid( ): string
		name_first( next?: string ): string
		Name_first_control( ): $mol_string
		Name_first_field( ): $mol_form_field
		name_nick_bid( ): string
		name_nick( next?: string ): string
		Name_nick_control( ): $mol_string
		Name_nick_field( ): $mol_form_field
		name_second_bid( ): string
		name_second( next?: string ): string
		Name_second_control( ): $mol_string
		Name_second_field( ): $mol_form_field
		Names( ): $mol_form_group
		age_bid( ): string
		age( next?: number ): number
		Age_control( ): $mol_number
		Age_field( ): $mol_form_field
		sex_label( ): string
		sex_bid( ): string
		sex( next?: string ): string
		sex_options( ): ({ 
			'male': string,
			'intersex': string,
			'female': string,
		}) 
		Sex_control( ): $mol_switch
		Sex_field( ): $mol_form_field
		color_bid( ): string
		color( next?: string ): string
		Color_control( ): $mol_select
		Color_field( ): $mol_form_field
		Parameters( ): $mol_form_group
		mail_bid( ): string
		mail( next?: string ): string
		Mail_control( ): $mol_string
		Mail_field( ): $mol_form_field
		signup( next?: any ): any
		signup_allowed( ): ReturnType< ReturnType< $mol_form_demo['Form'] >['submit_allowed'] >
		Signup( ): $mol_button_major
		result( next?: string ): string
		Result( ): $mol_status
		Form( ): $mol_form
		title( ): string
		message( ): ({ 
			'required': string,
			'adult': string,
			'no_spaces': string,
			'need_more_letters': string,
			'need_at': string,
			'only_one_at': string,
			'no_tld': string,
			'dots_inside': string,
			'no_space_domain': string,
			'need_username': string,
		}) 
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_restore extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=restore.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__hint_mol_form_draft_1 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset_title'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__sub_mol_form_draft_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__click_mol_form_draft_3 = $mol_type_enforce<
		ReturnType< $mol_form_draft['reset'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	export class $mol_form_draft extends $mol_form {
		reset_title( ): string
		Reset_icon( ): $mol_icon_restore
		Reset( ): $mol_button_minor
		model( ): $mol_object2
		model_pick( id: any, next?: any ): any
		changed( ): boolean
		state( next?: $mol_form_draft_state | null ): $mol_form_draft_state | null
		state_pick( id: any, next?: any ): any
		value( id: any, next?: any ): any
		value_str( id: any, next?: string ): string
		value_bool( id: any, next?: boolean ): boolean
		value_number( id: any, next?: number ): number
		dictionary_bool( id: any, next?: Record<string, any> ): Record<string, any>
		list_string( id: any, next?: readonly(string)[] ): readonly(string)[]
		value_changed( id: any): boolean
		reset( next?: any ): any
		done( next?: any ): any
		buttons( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=draft.view.tree.d.ts.map
declare namespace $ {

	type __mol_select_list_1 = $mol_type_enforce<
		Parameters< $mol_select_list['filter_pattern'] >[0]
		,
		Parameters< ReturnType< $mol_select_list['Pick'] >['filter_pattern'] >[0]
	>
	type $mol_select__event_select_mol_select_list_2 = $mol_type_enforce<
		ReturnType< $mol_select_list['event_select'] >
		,
		ReturnType< $mol_select['event_select'] >
	>
	type $mol_select__align_hor_mol_select_list_3 = $mol_type_enforce<
		ReturnType< $mol_select_list['align_hor'] >
		,
		ReturnType< $mol_select['align_hor'] >
	>
	type $mol_select__options_mol_select_list_4 = $mol_type_enforce<
		ReturnType< $mol_select_list['options_pickable'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_select__value_mol_select_list_5 = $mol_type_enforce<
		ReturnType< $mol_select_list['pick'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__option_label_mol_select_list_6 = $mol_type_enforce<
		ReturnType< $mol_select_list['option_title'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_select__trigger_enabled_mol_select_list_7 = $mol_type_enforce<
		ReturnType< $mol_select_list['pick_enabled'] >
		,
		ReturnType< $mol_select['trigger_enabled'] >
	>
	type $mol_select__hint_mol_select_list_8 = $mol_type_enforce<
		ReturnType< $mol_select_list['pick_hint'] >
		,
		ReturnType< $mol_select['hint'] >
	>
	type $mol_select__Trigger_icon_mol_select_list_9 = $mol_type_enforce<
		ReturnType< $mol_select_list['Pick_icon'] >
		,
		ReturnType< $mol_select['Trigger_icon'] >
	>
	type $mol_button_minor__title_mol_select_list_10 = $mol_type_enforce<
		ReturnType< $mol_select_list['badge_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__click_mol_select_list_11 = $mol_type_enforce<
		ReturnType< $mol_select_list['remove'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__hint_mol_select_list_12 = $mol_type_enforce<
		ReturnType< $mol_select_list['badge_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__enabled_mol_select_list_13 = $mol_type_enforce<
		ReturnType< $mol_select_list['drop_enabled'] >
		,
		ReturnType< $mol_button_minor['enabled'] >
	>
	type $mol_select_list_sub__14 = $mol_type_enforce<
		ReturnType< $mol_select_list['badges_list'] >[number]
		,
		$mol_view
	>
	export class $mol_select_list extends $mol_view {
		Badges( ): readonly($mol_view)[]
		badge_title( id: any): string
		remove( id: any, next?: any ): any
		badge_hint( ): string
		enabled( ): boolean
		drop_enabled( ): ReturnType< $mol_select_list['enabled'] >
		event_select( id: any, next?: any ): any
		align_hor( ): string
		options( ): readonly(string)[]
		options_pickable( ): ReturnType< $mol_select_list['options'] >
		pick( next?: string ): string
		option_title( id: any): string
		pick_enabled( ): ReturnType< $mol_select_list['enabled'] >
		pick_hint( ): string
		filter_pattern( next?: ReturnType< ReturnType< $mol_select_list['Pick'] >['filter_pattern'] > ): ReturnType< ReturnType< $mol_select_list['Pick'] >['filter_pattern'] >
		Pick_icon( ): $mol_icon_plus
		Pick( ): $mol_select
		value( next?: readonly(string)[] ): readonly(string)[]
		dictionary( ): Record<string, any>
		badges_list( ): ReturnType< $mol_select_list['Badges'] >
		Badge( id: any): $mol_button_minor
		sub( ): readonly($mol_view)[]
	}
	
}

//# sourceMappingURL=list.view.tree.d.ts.map
declare namespace $ {

	export class $mol_form_draft_demo_article extends $mol_object2 {
		title( next?: string ): string
		type( next?: string ): string
		adult( next?: boolean ): boolean
		content( next?: string ): string
		friends( next?: readonly(string)[] ): readonly(string)[]
		hobbies( next?: Record<string, any> ): Record<string, any>
	}
	
	type __mol_form_draft_demo_1 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['publish'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['submit'] >[0]
	>
	type __mol_form_draft_demo_2 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['value_str'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >[0]
	>
	type __mol_form_draft_demo_3 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['value_str'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >[1]
	>
	type __mol_form_draft_demo_4 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['list_string'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >[0]
	>
	type __mol_form_draft_demo_5 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['list_string'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >[1]
	>
	type __mol_form_draft_demo_6 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['dictionary_bool'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >[0]
	>
	type __mol_form_draft_demo_7 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['dictionary_bool'] >[1]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >[1]
	>
	type __mol_form_draft_demo_8 = $mol_type_enforce<
		Parameters< $mol_form_draft_demo['reset'] >[0]
		,
		Parameters< ReturnType< $mol_form_draft_demo['Form'] >['reset'] >[0]
	>
	type $mol_string__hint_mol_form_draft_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_form_draft_demo_10 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids_mol_form_draft_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_13 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Title'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_switch__value_mol_form_draft_demo_14 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_form_draft_demo_15 = $mol_type_enforce<
		({ 
			'article': string,
			'news': string,
			'question': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids_mol_form_draft_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_18 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Type'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_switch__value_mol_form_draft_demo_19 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_form_draft_demo_20 = $mol_type_enforce<
		({ 
			'false': string,
			'true': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_22 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Adult'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_textarea__hint_mol_form_draft_demo_23 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_mol_form_draft_demo_24 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['value_str'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_25 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__bids_mol_form_draft_demo_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_field['bids'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_27 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Content'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_check_list__dictionary_mol_form_draft_demo_28 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['dictionary_bool'] >
		,
		ReturnType< $mol_check_list['dictionary'] >
	>
	type $mol_check_list__options_mol_form_draft_demo_29 = $mol_type_enforce<
		({ 
			'programming': string,
			'bikinkg': string,
			'fishing': string,
		}) 
		,
		ReturnType< $mol_check_list['options'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_30 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_31 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Hobbies'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_select_list__dictionary_mol_form_draft_demo_32 = $mol_type_enforce<
		({ 
			'jocker': string,
			'harley': string,
			'penguin': string,
			'riddler': string,
			'bane': string,
			'freeze': string,
			'clay': string,
			'mask': string,
		}) 
		,
		ReturnType< $mol_select_list['dictionary'] >
	>
	type $mol_select_list__value_mol_form_draft_demo_33 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['list_string'] >
		,
		ReturnType< $mol_select_list['value'] >
	>
	type $mol_form_field__name_mol_form_draft_demo_34 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_form_draft_demo_35 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['Friends'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_form_group__sub_mol_form_draft_demo_36 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_group['sub'] >
	>
	type $mol_form_draft__model_mol_form_draft_demo_37 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['model'] >
		,
		ReturnType< $mol_form_draft['model'] >
	>
	type $mol_form_draft__form_fields_mol_form_draft_demo_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_form_draft['form_fields'] >
	>
	type $mol_form_draft__body_mol_form_draft_demo_39 = $mol_type_enforce<
		ReturnType< $mol_form_draft_demo['form_body'] >
		,
		ReturnType< $mol_form_draft['body'] >
	>
	export class $mol_form_draft_demo extends $mol_example {
		model( ): $mol_form_draft_demo_article
		publish( next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit'] >
		publish_allowed( ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['submit_allowed'] >
		value_str( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['value_str'] >
		list_string( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['list_string'] >
		dictionary_bool( id: any, next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['dictionary_bool'] >
		changed( ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['changed'] >
		reset( next?: ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['reset'] > ): ReturnType< ReturnType< $mol_form_draft_demo['Form'] >['reset'] >
		Title( ): $mol_string
		Title_field( ): $mol_form_field
		Type( ): $mol_switch
		Type_field( ): $mol_form_field
		Adult( ): $mol_switch
		Adult_field( ): $mol_form_field
		Content( ): $mol_textarea
		Content_field( ): $mol_form_field
		Hobbies( ): $mol_check_list
		Hobbies_field( ): $mol_form_field
		Friends( ): $mol_select_list
		Friends_field( ): $mol_form_field
		Config( ): $mol_form_group
		form_body( ): readonly(any)[]
		Form( ): $mol_form_draft
		title( ): string
		bid_required( id: any): string
		bid_swearing( id: any): string
		bid_short( id: any): string
		bid_long( id: any): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_phone extends $mol_format {
		mask( id: any): string
		keyboard( ): string
	}
	
}

//# sourceMappingURL=phone.view.tree.d.ts.map
declare namespace $ {

	type $mol_format__mask_mol_format_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__value_mol_format_demo_2 = $mol_type_enforce<
		ReturnType< $mol_format_demo['ip'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_card__status_mol_format_demo_3 = $mol_type_enforce<
		ReturnType< $mol_format_demo['ip'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content_mol_format_demo_4 = $mol_type_enforce<
		ReturnType< $mol_format_demo['Ip'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_phone__value_mol_format_demo_5 = $mol_type_enforce<
		ReturnType< $mol_format_demo['phone'] >
		,
		ReturnType< $mol_phone['value'] >
	>
	type $mol_card__status_mol_format_demo_6 = $mol_type_enforce<
		ReturnType< $mol_format_demo['phone'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content_mol_format_demo_7 = $mol_type_enforce<
		ReturnType< $mol_format_demo['Phone'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_format__mask_mol_format_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__value_mol_format_demo_9 = $mol_type_enforce<
		ReturnType< $mol_format_demo['card'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_card__status_mol_format_demo_10 = $mol_type_enforce<
		ReturnType< $mol_format_demo['card'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content_mol_format_demo_11 = $mol_type_enforce<
		ReturnType< $mol_format_demo['Card'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	type $mol_format__mask_mol_format_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__value_mol_format_demo_13 = $mol_type_enforce<
		ReturnType< $mol_format_demo['moment'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_card__status_mol_format_demo_14 = $mol_type_enforce<
		ReturnType< $mol_format_demo['moment'] >
		,
		ReturnType< $mol_card['status'] >
	>
	type $mol_card__Content_mol_format_demo_15 = $mol_type_enforce<
		ReturnType< $mol_format_demo['Moment'] >
		,
		ReturnType< $mol_card['Content'] >
	>
	export class $mol_format_demo extends $mol_example_small {
		ip( next?: string ): string
		Ip( ): $mol_format
		Ip_card( ): $mol_card
		phone( next?: string ): string
		Phone( ): $mol_phone
		Phone_card( ): $mol_card
		card( next?: string ): string
		Card( ): $mol_format
		Card_card( ): $mol_card
		moment( next?: string ): string
		Moment( ): $mol_format
		Moment_card( ): $mol_card
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_frame__title_mol_frame_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_frame['title'] >
	>
	type $mol_frame__uri_mol_frame_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_frame['uri'] >
	>
	export class $mol_frame_demo extends $mol_example_large {
		Frame( ): $mol_frame
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_gallery__items_mol_gallery_demo_1 = $mol_type_enforce<
		ReturnType< $mol_gallery_demo['items'] >
		,
		ReturnType< $mol_gallery['items'] >
	>
	type $mol_avatar__id_mol_gallery_demo_2 = $mol_type_enforce<
		ReturnType< $mol_gallery_demo['item_title'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_stack__sub_mol_gallery_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_stack['sub'] >
	>
	export class $mol_gallery_demo extends $mol_example {
		items( ): readonly(any)[]
		App( ): $mol_gallery
		item_title( id: any): string
		Item_image( id: any): $mol_avatar
		title( ): string
		count( ): number
		sub( ): readonly(any)[]
		Item( id: any): $mol_stack
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_html_view_heading__level_mol_html_view_1 = $mol_type_enforce<
		ReturnType< $mol_html_view['heading_level'] >
		,
		ReturnType< $mol_html_view_heading['level'] >
	>
	type $mol_html_view_heading__sub_mol_html_view_2 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_html_view_heading['sub'] >
	>
	type $mol_paragraph__sub_mol_html_view_3 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_list__rows_mol_html_view_4 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__rows_mol_html_view_5 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_paragraph__sub_mol_html_view_6 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_html_view_7 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_html_view_8 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_paragraph__sub_mol_html_view_9 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_view__sub_mol_html_view_10 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_html_view_11 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_paragraph__sub_mol_html_view_12 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_link_iconed__uri_mol_html_view_13 = $mol_type_enforce<
		ReturnType< $mol_html_view['link_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__content_mol_html_view_14 = $mol_type_enforce<
		ReturnType< $mol_html_view['content'] >
		,
		ReturnType< $mol_link_iconed['content'] >
	>
	type $mol_image__uri_mol_html_view_15 = $mol_type_enforce<
		ReturnType< $mol_html_view['image_uri'] >
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_paragraph__sub_mol_html_view_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_dimmer__needle_mol_html_view_17 = $mol_type_enforce<
		ReturnType< $mol_html_view['highlight'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_dimmer__haystack_mol_html_view_18 = $mol_type_enforce<
		ReturnType< $mol_html_view['text'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	export class $mol_html_view extends $mol_list {
		heading_level( id: any): number
		content( id: any): readonly(any)[]
		link_uri( id: any): string
		image_uri( id: any): string
		highlight( ): string
		text( id: any): string
		html( ): string
		dom( ): any
		safe_link( id: any): string
		views( id: any): readonly(any)[]
		xss_uri( ): string
		Heading( id: any): $mol_html_view_heading
		Paragraph( id: any): $mol_paragraph
		List( id: any): $mol_list
		Quote( id: any): $mol_list
		Strong( id: any): $mol_paragraph
		Emphasis( id: any): $mol_paragraph
		Deleted( id: any): $mol_paragraph
		Inserted( id: any): $mol_paragraph
		Subscript( id: any): $mol_view
		Superscript( id: any): $mol_view
		Code( id: any): $mol_paragraph
		Link( id: any): $mol_link_iconed
		Image( id: any): $mol_image
		Break( id: any): $mol_paragraph
		Text( id: any): $mol_dimmer
	}
	
	export class $mol_html_view_heading extends $mol_paragraph {
		level( ): number
		attr( ): ({ 
			'mol_html_view_heading': ReturnType< $mol_html_view_heading['level'] >,
		})  & ReturnType< $mol_paragraph['attr'] >
	}
	
}

//# sourceMappingURL=view.view.tree.d.ts.map
declare namespace $ {

	type $mol_html_view__html_mol_html_view_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_html_view['html'] >
	>
	export class $mol_html_view_demo extends $mol_example {
		Html( ): $mol_html_view
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__minimal_width_mol_infinite_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height_mol_infinite_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_infinite_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_width_mol_infinite_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_width'] >
	>
	type $mol_view__minimal_height_mol_infinite_5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_view__sub_mol_infinite_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_infinite extends $mol_list {
		before_load( id: any): any
		after_load( id: any): any
		before( id: any): readonly(any)[]
		after( id: any): readonly(any)[]
		row_ids( next?: readonly(any)[] ): readonly(any)[]
		render_over( ): number
		Row( id: any): $mol_view
		Before( id: any): $mol_view
		After( id: any): $mol_view
	}
	
}

//# sourceMappingURL=infinite.view.tree.d.ts.map
declare namespace $ {

	type $mol_avatar__id_mol_infinite_demo_1 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['id'] >
		,
		ReturnType< $mol_avatar['id'] >
	>
	type $mol_paragraph__title_mol_infinite_demo_2 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['name'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_paragraph__title_mol_infinite_demo_3 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['city'] >
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows_mol_infinite_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_row__sub_mol_infinite_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_infinite__before_mol_infinite_demo_6 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['before'] >
		,
		ReturnType< $mol_infinite['before'] >
	>
	type $mol_infinite__after_mol_infinite_demo_7 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['after'] >
		,
		ReturnType< $mol_infinite['after'] >
	>
	type $mol_infinite__Row_mol_infinite_demo_8 = $mol_type_enforce<
		ReturnType< $mol_infinite_demo['Item'] >
		,
		ReturnType< $mol_infinite['Row'] >
	>
	type $mol_scroll__sub_mol_infinite_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_infinite_demo extends $mol_example_large {
		before( id: any): readonly(any)[]
		after( id: any): readonly(any)[]
		id( id: any): string
		Photo( id: any): $mol_avatar
		name( id: any): string
		Name( id: any): $mol_paragraph
		city( id: any): string
		City( id: any): $mol_paragraph
		Info( id: any): $mol_list
		Item( id: any): $mol_row
		List( ): $mol_infinite
		Scroll( ): $mol_scroll
		title( ): string
		chunk_size( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_labeler__title_mol_labeler_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_labeler_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_string__hint_mol_labeler_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_labeler_demo_4 = $mol_type_enforce<
		ReturnType< $mol_labeler_demo['user_name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_labeler__title_mol_labeler_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_labeler_demo_6 = $mol_type_enforce<
		ReturnType< $mol_labeler_demo['Name_control'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	export class $mol_labeler_demo extends $mol_example_small {
		Provider( ): $mol_labeler
		user_name( next?: string ): string
		Name_control( ): $mol_string
		Name( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_canvas extends $mol_view {
		width( ): number
		height( ): number
		dom_name( ): string
		context( ): CanvasRenderingContext2D
		field( ): ({ 
			'width': ReturnType< $mol_canvas['width'] >,
			'height': ReturnType< $mol_canvas['height'] >,
		})  & ReturnType< $mol_view['field'] >
		paint( ): any
	}
	
}

//# sourceMappingURL=canvas.view.tree.d.ts.map
declare namespace $ {

	type $mol_canvas__paint_mol_layout_demo_1 = $mol_type_enforce<
		ReturnType< $mol_layout_demo['paint'] >
		,
		ReturnType< $mol_canvas['paint'] >
	>
	export class $mol_layout_demo extends $mol_example_large {
		paint( ): any
		context( ): ReturnType< ReturnType< $mol_layout_demo['Sample'] >['context'] >
		width( ): ReturnType< ReturnType< $mol_layout_demo['Sample'] >['width'] >
		height( ): ReturnType< ReturnType< $mol_layout_demo['Sample'] >['height'] >
		Sample( ): $mol_canvas
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_download extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $ {

	type $mol_link__sub_mol_link_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_2 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_4 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_mol_link_demo_6 = $mol_type_enforce<
		({ 
			'color': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_link_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__uri_mol_link_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__title_mol_link_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_link__hint_mol_link_demo_10 = $mol_type_enforce<
		ReturnType< $mol_link_demo['external_hint'] >
		,
		ReturnType< $mol_link['hint'] >
	>
	type $mol_link__uri_mol_link_demo_11 = $mol_type_enforce<
		ReturnType< $mol_link_demo['object_uri'] >
		,
		ReturnType< $mol_link['uri'] >
	>
	type $mol_link__file_name_mol_link_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link['file_name'] >
	>
	type $mol_link__sub_mol_link_demo_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_list__rows_mol_link_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_link_demo extends $mol_example_small {
		this_label( ): string
		This( ): $mol_link
		red_label( ): string
		Red( ): $mol_link
		green_label( ): string
		Green( ): $mol_link
		blue_label( ): string
		Blue( ): $mol_link
		external_hint( ): string
		External( ): $mol_link
		object_uri( ): string
		Download_icon( ): $mol_icon_download
		download_label( ): string
		Download( ): $mol_link
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_link_iconed_demo_1 = $mol_type_enforce<
		ReturnType< $mol_link_iconed_demo['uri'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_link_iconed__uri_mol_link_iconed_demo_2 = $mol_type_enforce<
		ReturnType< $mol_link_iconed_demo['uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_list__rows_mol_link_iconed_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_link_iconed_demo extends $mol_example_small {
		uri( next?: string ): string
		Input( ): $mol_string
		Output( ): $mol_link_iconed
		Blocks( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_link_lazy extends $mol_link {
		generate( next?: any ): any
		uri( next?: string ): string
		uri_generated( ): string
		current( ): boolean
		event( ): ({ 
			mousedown( next?: ReturnType< $mol_link_lazy['generate'] > ): ReturnType< $mol_link_lazy['generate'] >,
		})  & ReturnType< $mol_link['event'] >
	}
	
}

//# sourceMappingURL=lazy.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_lazy__hint_mol_link_lazy_demo_1 = $mol_type_enforce<
		ReturnType< $mol_link_lazy_demo['title'] >
		,
		ReturnType< $mol_link_lazy['hint'] >
	>
	type $mol_link_lazy__uri_generated_mol_link_lazy_demo_2 = $mol_type_enforce<
		ReturnType< $mol_link_lazy_demo['uri_generated'] >
		,
		ReturnType< $mol_link_lazy['uri_generated'] >
	>
	type $mol_link_lazy__file_name_mol_link_lazy_demo_3 = $mol_type_enforce<
		ReturnType< $mol_link_lazy_demo['download_file'] >
		,
		ReturnType< $mol_link_lazy['file_name'] >
	>
	type $mol_link_lazy__sub_mol_link_lazy_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link_lazy['sub'] >
	>
	export class $mol_link_lazy_demo extends $mol_example_small {
		uri_generated( ): string
		download_file( ): string
		Download_icon( ): $mol_icon_download
		download_label( ): string
		Download( ): $mol_link_lazy
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_link_source_demo_1 = $mol_type_enforce<
		ReturnType< $mol_link_source_demo['uri'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_link_source__uri_mol_link_source_demo_2 = $mol_type_enforce<
		ReturnType< $mol_link_source_demo['uri'] >
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_list__rows_mol_link_source_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_link_source_demo extends $mol_example_small {
		uri( next?: string ): string
		Input( ): $mol_string
		Output( ): $mol_link_source
		Blocks( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_number__value_mol_list_demo_1 = $mol_type_enforce<
		ReturnType< $mol_list_demo['items_count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_list_demo_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_mol_list_demo_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_list_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_list_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_link__title_mol_list_demo_6 = $mol_type_enforce<
		ReturnType< $mol_list_demo['item_title'] >
		,
		ReturnType< $mol_link['title'] >
	>
	type $mol_paragraph__title_mol_list_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_list__rows_mol_list_demo_8 = $mol_type_enforce<
		ReturnType< $mol_list_demo['list_items'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_list__Empty_mol_list_demo_9 = $mol_type_enforce<
		ReturnType< $mol_list_demo['List_empty'] >
		,
		ReturnType< $mol_list['Empty'] >
	>
	export class $mol_list_demo extends $mol_example_small {
		items_count( next?: number ): number
		Items_count( ): $mol_number
		Items_count_label( ): $mol_labeler
		item_title( id: any): string
		Item( id: any): $mol_link
		list_items( ): readonly(any)[]
		List_empty( ): $mol_paragraph
		Items( ): $mol_list
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_box__title_mol_list_demo_table_1 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_id'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_list_demo_table_2 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_checked'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title_mol_list_demo_table_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_4 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Id'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_link_iconed__uri_mol_list_demo_table_5 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_uri'] >
		,
		ReturnType< $mol_link_iconed['uri'] >
	>
	type $mol_link_iconed__title_mol_list_demo_table_6 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_title'] >
		,
		ReturnType< $mol_link_iconed['title'] >
	>
	type $mol_labeler__title_mol_list_demo_table_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_8 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Title'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_select__value_mol_list_demo_table_9 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_color'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options_mol_list_demo_table_10 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['colors'] >
		,
		ReturnType< $mol_select['options'] >
	>
	type $mol_labeler__title_mol_list_demo_table_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_12 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Color'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_switch__value_mol_list_demo_table_13 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_status'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_list_demo_table_14 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['status_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title_mol_list_demo_table_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_16 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Status'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_number__value_mol_list_demo_table_17 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_quantity'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_list_demo_table_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_19 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Quantity'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_date__value_moment_mol_list_demo_table_20 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_moment'] >
		,
		ReturnType< $mol_date['value_moment'] >
	>
	type $mol_labeler__title_mol_list_demo_table_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_list_demo_table_22 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['Date'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_row__sub_mol_list_demo_table_23 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['row_content'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_list__item_width_min_mol_list_demo_table_24 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_list['item_width_min'] >
	>
	type $mol_list__item_height_min_mol_list_demo_table_25 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_list['item_height_min'] >
	>
	type $mol_list__rows_mol_list_demo_table_26 = $mol_type_enforce<
		ReturnType< $mol_list_demo_table['rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_list_demo_table extends $mol_example {
		row_id( id: any, next?: string ): string
		row_checked( id: any, next?: boolean ): boolean
		Id( id: any): $mol_check_box
		Id_labeler( id: any): $mol_labeler
		row_uri( id: any): string
		row_title( id: any): string
		Title( id: any): $mol_link_iconed
		Title_labeler( id: any): $mol_labeler
		row_color( id: any, next?: string ): string
		colors( ): readonly(any)[]
		Color( id: any): $mol_select
		Color_labeler( id: any): $mol_labeler
		row_status( id: any, next?: string ): string
		status_options( ): ({ 
			'minor': string,
			'major': string,
			'critical': string,
		}) 
		Status( id: any): $mol_switch
		Status_labeler( id: any): $mol_labeler
		row_quantity( id: any, next?: number ): number
		Quantity( id: any): $mol_number
		Quantity_labeler( id: any): $mol_labeler
		row_moment( id: any, next?: $mol_time_moment ): $mol_time_moment
		Date( id: any): $mol_date
		Date_labeler( id: any): $mol_labeler
		row_content( id: any): readonly(any)[]
		Row( id: any): $mol_row
		rows( ): readonly(any)[]
		Rows( ): $mol_list
		title( ): string
		count( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=table.view.tree.d.ts.map
declare namespace $ {

	type $mol_list__rows_mol_list_demo_tree_1 = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['root_rows'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_paragraph__sub_mol_list_demo_tree_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_list__rows_mol_list_demo_tree_3 = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['row_content'] >
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_expander__label_mol_list_demo_tree_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_expander['label'] >
	>
	type $mol_expander__expanded_mol_list_demo_tree_5 = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['row_expanded'] >
		,
		ReturnType< $mol_expander['expanded'] >
	>
	type $mol_expander__expandable_mol_list_demo_tree_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_expander['expandable'] >
	>
	type $mol_expander__Content_mol_list_demo_tree_7 = $mol_type_enforce<
		ReturnType< $mol_list_demo_tree['Row_content'] >
		,
		ReturnType< $mol_expander['Content'] >
	>
	export class $mol_list_demo_tree extends $mol_example_large {
		root_rows( ): readonly(any)[]
		Content( ): $mol_list
		row_title( id: any): string
		Row_title( id: any): $mol_paragraph
		row_expanded( id: any, next?: boolean ): boolean
		row_content( id: any): readonly(any)[]
		Row_content( id: any): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		Row( id: any): $mol_expander
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=tree.view.tree.d.ts.map
declare namespace $ {

	type $mol_vector_range__mol_map_yandex_mark_1 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_range__mol_map_yandex_mark_2 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_range<number> >
	>
	type $mol_vector_2d__mol_map_yandex_mark_3 = $mol_type_enforce<
		[ number, number ]
		,
		ConstructorParameters< typeof $mol_vector_2d<number> >
	>
	type $mol_vector_2d__mol_map_yandex_mark_4 = $mol_type_enforce<
		[ ReturnType< $mol_map_yandex_mark['box_lat'] >, ReturnType< $mol_map_yandex_mark['box_lon'] > ]
		,
		ConstructorParameters< typeof $mol_vector_2d<$mol_vector_range<number>> >
	>
	export class $mol_map_yandex_mark extends $mol_object {
		box_lat( ): $mol_vector_range<number>
		box_lon( ): $mol_vector_range<number>
		address( ): string
		pos( ): $mol_vector_2d<number>
		box( ): $mol_vector_2d<$mol_vector_range<number>>
		hint( ): string
		title( ): ReturnType< $mol_map_yandex_mark['address'] >
		content( ): string
		object( ): any
	}
	
}

//# sourceMappingURL=mark.view.tree.d.ts.map
declare namespace $ {

	export class $mol_map_yandex extends $mol_view {
		zoom( next?: number ): number
		center( next?: readonly(any)[] ): readonly(any)[]
		objects( ): readonly($mol_map_yandex_mark)[]
	}
	
}

//# sourceMappingURL=yandex.view.tree.d.ts.map
declare namespace $ {

	type $mol_map_yandex_mark__title_mol_map_yandex_demo_1 = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_title'] >
		,
		ReturnType< $mol_map_yandex_mark['title'] >
	>
	type $mol_map_yandex_mark__address_mol_map_yandex_demo_2 = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_addres'] >
		,
		ReturnType< $mol_map_yandex_mark['address'] >
	>
	type $mol_map_yandex_mark__content_mol_map_yandex_demo_3 = $mol_type_enforce<
		ReturnType< $mol_map_yandex_demo['place_content'] >
		,
		ReturnType< $mol_map_yandex_mark['content'] >
	>
	type $mol_map_yandex__objects_mol_map_yandex_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_map_yandex['objects'] >
	>
	export class $mol_map_yandex_demo extends $mol_example_large {
		place_title( ): string
		place_addres( ): string
		place_content( ): string
		Place( ): $mol_map_yandex_mark
		Map( ): $mol_map_yandex
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_mutable_demo extends $mol_example_code {
		code( next?: string ): string
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_hyoo_marked_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_switch__value_hyoo_marked_app_2 = $mol_type_enforce<
		ReturnType< $hyoo_marked_app['preview'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_hyoo_marked_app_3 = $mol_type_enforce<
		({ 
			'html': string,
			'view': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_textarea__value_hyoo_marked_app_4 = $mol_type_enforce<
		ReturnType< $hyoo_marked_app['marked'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title_hyoo_marked_app_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_hyoo_marked_app_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_marked_app_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_text_code__sidebar_showed_hyoo_marked_app_8 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__text_hyoo_marked_app_9 = $mol_type_enforce<
		ReturnType< $hyoo_marked_app['html'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_page__title_hyoo_marked_app_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_hyoo_marked_app_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_marked_app_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_text__text_hyoo_marked_app_13 = $mol_type_enforce<
		ReturnType< $hyoo_marked_app['marked'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_page__title_hyoo_marked_app_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_hyoo_marked_app_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_hyoo_marked_app_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__sub_hyoo_marked_app_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_link__arg_hyoo_marked_app_18 = $mol_type_enforce<
		({ 
			'preview': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	export class $hyoo_marked_app extends $mol_book2 {
		Theme( ): $mol_theme_auto
		Lights( ): $mol_lights_toggle
		Source( ): $mol_link_source
		preview( next?: string ): string
		Preview( ): $mol_switch
		marked( next?: string ): string
		Marked_text( ): $mol_textarea
		Marked( ): $mol_page
		html( ): string
		Html_text( ): $mol_text_code
		Html( ): $mol_page
		View_text( ): $mol_text
		View( ): $mol_page
		Preview_close_icon( ): $mol_icon_close
		plugins( ): readonly(any)[]
		pages( ): readonly(any)[]
		Preview_close( ): $mol_link
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {

	export class $hyoo_marked_demo extends $mol_example_large {
		Sandbox( ): $hyoo_marked_app
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_link_source__uri_hyoo_harp_app_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_link_source['uri'] >
	>
	type $mol_speck__value_hyoo_harp_app_2 = $mol_type_enforce<
		ReturnType< $hyoo_harp_app['rate'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_textarea__hint_hyoo_harp_app_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_hyoo_harp_app_4 = $mol_type_enforce<
		ReturnType< $hyoo_harp_app['uri'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_dump_value__value_hyoo_harp_app_5 = $mol_type_enforce<
		ReturnType< $hyoo_harp_app['json'] >
		,
		ReturnType< $mol_dump_value['value'] >
	>
	type $mol_list__rows_hyoo_harp_app_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $hyoo_harp_app extends $mol_page {
		Theme( ): $mol_theme_auto
		Source( ): $mol_link_source
		Lights( ): $mol_lights_toggle
		rate( ): number
		Rate( ): $mol_speck
		uri( next?: string ): string
		Uri( ): $mol_textarea
		json( next?: any ): any
		Json( ): $mol_dump_value
		Content( ): $mol_list
		title( ): string
		plugins( ): readonly(any)[]
		tools( ): readonly(any)[]
		body( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=app.view.tree.d.ts.map
declare namespace $ {

	type $hyoo_harp_app__Lights_hyoo_harp_demo_1 = $mol_type_enforce<
		any
		,
		ReturnType< $hyoo_harp_app['Lights'] >
	>
	export class $hyoo_harp_demo extends $mol_example_large {
		title( ): ReturnType< ReturnType< $hyoo_harp_demo['Sandbox'] >['title'] >
		Sandbox( ): $hyoo_harp_app
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_nav__keys_x_mol_nav_demo_1 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_list'] >
		,
		ReturnType< $mol_nav['keys_x'] >
	>
	type $mol_nav__current_x_mol_nav_demo_2 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_current'] >
		,
		ReturnType< $mol_nav['current_x'] >
	>
	type $mol_nav__keys_y_mol_nav_demo_3 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_list'] >
		,
		ReturnType< $mol_nav['keys_y'] >
	>
	type $mol_nav__current_y_mol_nav_demo_4 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_current'] >
		,
		ReturnType< $mol_nav['current_y'] >
	>
	type $mol_switch__value_mol_nav_demo_5 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['tab_current'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_nav_demo_6 = $mol_type_enforce<
		({ 
			'first': string,
			'second': string,
			'third': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_switch__value_mol_nav_demo_7 = $mol_type_enforce<
		ReturnType< $mol_nav_demo['row_current'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_nav_demo_8 = $mol_type_enforce<
		({ 
			'first': string,
			'second': string,
			'third': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_card__content_mol_nav_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_card['content'] >
	>
	type $mol_card__status_mol_nav_demo_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_card['status'] >
	>
	export class $mol_nav_demo extends $mol_example {
		Nav( ): $mol_nav
		tab_list( ): ReturnType< ReturnType< $mol_nav_demo['Tab_list'] >['keys'] >
		tab_current( next?: string ): string
		Tab_list( ): $mol_switch
		row_list( ): ReturnType< ReturnType< $mol_nav_demo['Row_list'] >['keys'] >
		row_current( next?: string ): string
		Row_list( ): $mol_switch
		Demo_items( ): $mol_card
		title( ): string
		plugins( ): readonly(any)[]
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_number_demo_1 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_string'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__disabled_mol_number_demo_2 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_string['disabled'] >
	>
	type $mol_button_major__title_mol_number_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__enabled_mol_number_demo_4 = $mol_type_enforce<
		ReturnType< $mol_number_demo['reset_enabled'] >
		,
		ReturnType< $mol_button_major['enabled'] >
	>
	type $mol_button_major__click_mol_number_demo_5 = $mol_type_enforce<
		ReturnType< $mol_number_demo['reset_value'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_bar__sub_mol_number_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_bar['sub'] >
	>
	type $mol_row__sub_mol_number_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_section__title_mol_number_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_number_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_number__value_mol_number_demo_10 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_number_demo_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__hint_mol_number_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_number['hint'] >
	>
	type $mol_number__value_mol_number_demo_14 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_number_demo_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_number_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_section__title_mol_number_demo_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_number_demo_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_number__hint_mol_number_demo_20 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_number['hint'] >
	>
	type $mol_number__value_mol_number_demo_21 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__string_enabled_mol_number_demo_22 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_number['string_enabled'] >
	>
	type $mol_labeler__title_mol_number_demo_23 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_24 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__hint_mol_number_demo_25 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_number['hint'] >
	>
	type $mol_number__value_mol_number_demo_26 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__enabled_mol_number_demo_27 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_number['enabled'] >
	>
	type $mol_labeler__title_mol_number_demo_28 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_29 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_30 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__dec_enabled_mol_number_demo_31 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_number['dec_enabled'] >
	>
	type $mol_labeler__title_mol_number_demo_32 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_33 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_34 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__inc_enabled_mol_number_demo_35 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_number['inc_enabled'] >
	>
	type $mol_labeler__title_mol_number_demo_36 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_37 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_number_demo_38 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_section__title_mol_number_demo_39 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_number_demo_40 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_number__value_mol_number_demo_41 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_number_demo_42 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_number_demo_43 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_44 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_45 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_number_demo_46 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_number_demo_47 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_48 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_49 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_mol_number_demo_50 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title_mol_number_demo_51 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_52 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_53 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_mol_number_demo_54 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title_mol_number_demo_55 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_56 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_57 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_mol_number_demo_58 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title_mol_number_demo_59 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_60 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_61 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_mol_number_demo_62 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title_mol_number_demo_63 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_64 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_65 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view_mol_number_demo_66 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title_mol_number_demo_67 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_68 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_69 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view_mol_number_demo_70 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title_mol_number_demo_71 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_72 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_number_demo_73 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_section__title_mol_number_demo_74 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_number_demo_75 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_number__value_mol_number_demo_76 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_min_m5'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_77 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_labeler__title_mol_number_demo_78 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_79 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_80 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_min_0'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_81 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_labeler__title_mol_number_demo_82 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_83 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_84 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_min_5'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_85 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_labeler__title_mol_number_demo_86 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_87 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_88 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_max_m5'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_max_mol_number_demo_89 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_90 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_91 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_92 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_max_0'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_max_mol_number_demo_93 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_94 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_95 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_96 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_max_5'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_max_mol_number_demo_97 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_98 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_99 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_100 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_max_100'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_max_mol_number_demo_101 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_number__precision_change_mol_number_demo_102 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_number_demo_103 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_104 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_105 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_case1_range'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_106 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_mol_number_demo_107 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_108 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_109 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_110 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_case2_range'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_111 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_mol_number_demo_112 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_113 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_114 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_number_demo_115 = $mol_type_enforce<
		ReturnType< $mol_number_demo['value_case3_range'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__value_min_mol_number_demo_116 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_min'] >
	>
	type $mol_number__value_max_mol_number_demo_117 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['value_max'] >
	>
	type $mol_labeler__title_mol_number_demo_118 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_number_demo_119 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_number_demo_120 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_section__title_mol_number_demo_121 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_number_demo_122 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_list__rows_mol_number_demo_123 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_number_demo extends $mol_example_small {
		value_string( ): string
		Value_string( ): $mol_string
		reset_enabled( ): boolean
		reset_value( next?: any ): any
		Reset( ): $mol_button_major
		Section_value_bar( ): $mol_bar
		Section_value_row( ): $mol_row
		Section_value( ): $mol_section
		Initial_number( ): $mol_number
		Initial_number_label( ): $mol_labeler
		Hint_number( ): $mol_number
		Hint_number_label( ): $mol_labeler
		Section_initial_row( ): $mol_row
		Section_initial( ): $mol_section
		Value_field_disabled_number( ): $mol_number
		Value_field_disabled_number_label( ): $mol_labeler
		Disabled_number( ): $mol_number
		Disabled_number_label( ): $mol_labeler
		Dec_disabled_number( ): $mol_number
		Dec_disabled_number_label( ): $mol_labeler
		Inc_disabled_number( ): $mol_number
		Inc_disabled_number_label( ): $mol_labeler
		Section_disabled_row( ): $mol_row
		Section_disabled( ): $mol_section
		Precision_change_10_number( ): $mol_number
		Precision_change_10_number_label( ): $mol_labeler
		Precision_change_01_number( ): $mol_number
		Precision_change_01_number_label( ): $mol_labeler
		Precision_100_number_number( ): $mol_number
		Precision_100_number_label( ): $mol_labeler
		Precision_5_number_number( ): $mol_number
		Precision_5_number_label( ): $mol_labeler
		Precision_01_number_number( ): $mol_number
		Precision_01_number_label( ): $mol_labeler
		Precision_005_number_number( ): $mol_number
		Precision_005_number_label( ): $mol_labeler
		Precision_view_001_number( ): $mol_number
		Precision_view_001_number_label( ): $mol_labeler
		Precision_view_10_number( ): $mol_number
		Precision_view_10_number_label( ): $mol_labeler
		Section_precision_row( ): $mol_row
		Section_precision( ): $mol_section
		value_min_m5( next?: number ): number
		Min_m5_number( ): $mol_number
		Min_m5_number_label( ): $mol_labeler
		value_min_0( next?: number ): number
		Min_0_number( ): $mol_number
		Min_0_number_label( ): $mol_labeler
		value_min_5( next?: number ): number
		Min_5_number( ): $mol_number
		Min_5_number_label( ): $mol_labeler
		value_max_m5( next?: number ): number
		Max_m5_number( ): $mol_number
		Max_m5_number_label( ): $mol_labeler
		value_max_0( next?: number ): number
		Max_0_number( ): $mol_number
		Max_0_number_label( ): $mol_labeler
		value_max_5( next?: number ): number
		Max_5_number( ): $mol_number
		Max_5_number_label( ): $mol_labeler
		value_max_100( next?: number ): number
		Max_100_number( ): $mol_number
		Max_100_number_label( ): $mol_labeler
		value_case1_range( next?: number ): number
		Range_case1_number( ): $mol_number
		Range_number_case1_label( ): $mol_labeler
		value_case2_range( next?: any ): any
		Range_case2_number( ): $mol_number
		Range_number_case2_label( ): $mol_labeler
		value_case3_range( next?: any ): any
		Range_case3_number( ): $mol_number
		Range_number_case3_label( ): $mol_labeler
		Section_range_row( ): $mol_row
		Section_range( ): $mol_section
		Rows( ): $mol_list
		title( ): string
		value( next?: number ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__title_mol_page_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title_mol_page_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_page__tools_mol_page_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_page_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_page__foot_mol_page_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['foot'] >
	>
	export class $mol_page_demo extends $mol_example_large {
		Button_tools( ): $mol_button_minor
		Text( ): $mol_filler
		Button_foot( ): $mol_button_minor
		Page( ): $mol_page
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__hint_mol_paginator_1 = $mol_type_enforce<
		ReturnType< $mol_paginator['backward_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_paginator_2 = $mol_type_enforce<
		ReturnType< $mol_paginator['backward'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_paginator_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_view__sub_mol_paginator_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__hint_mol_paginator_5 = $mol_type_enforce<
		ReturnType< $mol_paginator['forward_hint'] >
		,
		ReturnType< $mol_button_minor['hint'] >
	>
	type $mol_button_minor__click_mol_paginator_6 = $mol_type_enforce<
		ReturnType< $mol_paginator['forward'] >
		,
		ReturnType< $mol_button_minor['click'] >
	>
	type $mol_button_minor__sub_mol_paginator_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	export class $mol_paginator extends $mol_bar {
		backward_hint( ): string
		backward( next?: any ): any
		Backward_icon( ): $mol_icon_chevron_left
		Backward( ): $mol_button_minor
		value( next?: number ): number
		Value( ): $mol_view
		forward_hint( ): string
		forward( next?: any ): any
		Forward_icon( ): $mol_icon_chevron_right
		Forward( ): $mol_button_minor
		step( ): number
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=paginator.view.tree.d.ts.map
declare namespace $ {

	type $mol_paginator__value_mol_paginator_demo_1 = $mol_type_enforce<
		ReturnType< $mol_paginator_demo['page'] >
		,
		ReturnType< $mol_paginator['value'] >
	>
	export class $mol_paginator_demo extends $mol_example_small {
		page( next?: number ): number
		Pages( ): $mol_paginator
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_line__type_mol_plot_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_plot_line['type'] >
	>
	type $mol_plot_group__series_y_mol_plot_demo_2 = $mol_type_enforce<
		ReturnType< $mol_plot_demo['saturation_series'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs_mol_plot_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_group__series_y_mol_plot_demo_4 = $mol_type_enforce<
		ReturnType< $mol_plot_demo['input_series'] >
		,
		ReturnType< $mol_plot_group['series_y'] >
	>
	type $mol_plot_group__graphs_mol_plot_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_group['graphs'] >
	>
	type $mol_plot_bar__series_y_mol_plot_demo_6 = $mol_type_enforce<
		ReturnType< $mol_plot_demo['output_series'] >
		,
		ReturnType< $mol_plot_bar['series_y'] >
	>
	type $mol_plot_ruler_vert__title_mol_plot_demo_7 = $mol_type_enforce<
		ReturnType< $mol_plot_demo['Voltage_title'] >
		,
		ReturnType< $mol_plot_ruler_vert['title'] >
	>
	type $mol_plot_ruler_hor__title_mol_plot_demo_8 = $mol_type_enforce<
		ReturnType< $mol_plot_demo['Time_title'] >
		,
		ReturnType< $mol_plot_ruler_hor['title'] >
	>
	type $mol_plot_pane__graphs_mol_plot_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	export class $mol_plot_demo extends $mol_example_large {
		saturation_series( ): readonly(any)[]
		Saturation_fill( ): $mol_plot_fill
		Saturation_line( ): $mol_plot_line
		Saturation( ): $mol_plot_group
		input_series( ): readonly(any)[]
		Input_line( ): $mol_plot_line
		Input_dots( ): $mol_plot_dot
		Input( ): $mol_plot_group
		output_series( ): readonly(any)[]
		Output( ): $mol_plot_bar
		Voltage_title( ): string
		Voltage( ): $mol_plot_ruler_vert
		Time_title( ): string
		Time( ): $mol_plot_ruler_hor
		Plot( ): $mol_plot_pane
		title( ): string
		count( next?: number ): number
		frequency( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_plot_map_heat_level__hint_mol_plot_map_heat_1 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['level_hint'] >
		,
		ReturnType< $mol_plot_map_heat_level['hint'] >
	>
	type $mol_plot_map_heat_level__points_mol_plot_map_heat_2 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['level_points'] >
		,
		ReturnType< $mol_plot_map_heat_level['points'] >
	>
	type $mol_plot_map_heat_level__opacity_mol_plot_map_heat_3 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['level_opacity'] >
		,
		ReturnType< $mol_plot_map_heat_level['opacity'] >
	>
	type $mol_plot_map_heat_level__diameter_mol_plot_map_heat_4 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['level_diameter'] >
		,
		ReturnType< $mol_plot_map_heat_level['diameter'] >
	>
	type $mol_plot_map_heat_level__aspect_mol_plot_map_heat_5 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['level_aspect'] >
		,
		ReturnType< $mol_plot_map_heat_level['aspect'] >
	>
	type $mol_plot_graph_sample__color_mol_plot_map_heat_6 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat['color'] >
		,
		ReturnType< $mol_plot_graph_sample['color'] >
	>
	export class $mol_plot_map_heat extends $mol_plot_group {
		level_graphs( ): readonly(any)[]
		level_hint( id: any): string
		level_points( id: any): readonly(any)[]
		level_opacity( id: any): string
		level_diameter( ): number
		level_aspect( ): number
		series_z( ): readonly(number)[]
		graphs( ): ReturnType< $mol_plot_map_heat['level_graphs'] >
		Level( id: any): $mol_plot_map_heat_level
		Sample( ): $mol_plot_graph_sample
	}
	
	export class $mol_plot_map_heat_level extends $mol_plot_dot {
		opacity( ): string
		style( ): ({ 
			'opacity': ReturnType< $mol_plot_map_heat_level['opacity'] >,
		})  & ReturnType< $mol_plot_dot['style'] >
	}
	
}

//# sourceMappingURL=heat.view.tree.d.ts.map
declare namespace $ {

	type __mol_plot_map_heat_demo_1 = $mol_type_enforce<
		Parameters< $mol_plot_map_heat_demo['zoom'] >[0]
		,
		Parameters< ReturnType< $mol_plot_map_heat_demo['Plot'] >['scale_y'] >[0]
	>
	type $mol_plot_map_heat__series_x_mol_plot_map_heat_demo_2 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat_demo['terrain_x'] >
		,
		ReturnType< $mol_plot_map_heat['series_x'] >
	>
	type $mol_plot_map_heat__series_y_mol_plot_map_heat_demo_3 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat_demo['terrain_y'] >
		,
		ReturnType< $mol_plot_map_heat['series_y'] >
	>
	type $mol_plot_map_heat__series_z_mol_plot_map_heat_demo_4 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat_demo['terrain_z'] >
		,
		ReturnType< $mol_plot_map_heat['series_z'] >
	>
	type $mol_plot_pane__zoom_mol_plot_map_heat_demo_5 = $mol_type_enforce<
		ReturnType< $mol_plot_map_heat_demo['zoom'] >
		,
		ReturnType< $mol_plot_pane['zoom'] >
	>
	type $mol_plot_pane__graphs_mol_plot_map_heat_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_plot_pane['graphs'] >
	>
	export class $mol_plot_map_heat_demo extends $mol_example_large {
		zoom( next?: ReturnType< ReturnType< $mol_plot_map_heat_demo['Plot'] >['scale_y'] > ): ReturnType< ReturnType< $mol_plot_map_heat_demo['Plot'] >['scale_y'] >
		terrain_x( ): readonly(number)[]
		terrain_y( ): readonly(number)[]
		terrain_z( ): readonly(number)[]
		Terrain( ): $mol_plot_map_heat
		Plot( ): $mol_plot_pane
		title( ): string
		count_x( ): number
		count_y( ): number
		count_z( ): number
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_anchor extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=anchor.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_box__hint_mol_pop_demo_1 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed_check_hint'] >
		,
		ReturnType< $mol_check_box['hint'] >
	>
	type $mol_check_box__checked_mol_pop_demo_2 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_labeler__title_mol_pop_demo_3 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['show_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_pop_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_switch__value_mol_pop_demo_5 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_pop_demo_6 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['aligins'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title_mol_pop_demo_7 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['align_title'] >
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_pop_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_pop_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__sub_mol_pop_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	type $mol_row__minimal_width_mol_pop_demo_11 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_row['minimal_width'] >
	>
	type $mol_row__sub_mol_pop_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_pop__Anchor_mol_pop_demo_13 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['Pop_anchor'] >
		,
		ReturnType< $mol_pop['Anchor'] >
	>
	type $mol_pop__showed_mol_pop_demo_14 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_showed'] >
		,
		ReturnType< $mol_pop['showed'] >
	>
	type $mol_pop__align_mol_pop_demo_15 = $mol_type_enforce<
		ReturnType< $mol_pop_demo['pop_align'] >
		,
		ReturnType< $mol_pop['align'] >
	>
	type $mol_pop__bubble_content_mol_pop_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop['bubble_content'] >
	>
	type $mol_view__sub_mol_pop_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__sub_mol_pop_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_pop_demo extends $mol_example {
		show_title( ): string
		pop_showed_check_hint( ): string
		pop_showed( next?: boolean ): boolean
		Show_check( ): $mol_check_box
		Showed( ): $mol_labeler
		align_title( ): string
		pop_align( next?: string ): string
		aligins( ): ({ 
			'left_top': string,
			'left_center': string,
			'left_bottom': string,
			'right_top': string,
			'right_center': string,
			'right_bottom': string,
			'center': string,
			'top_left': string,
			'top_center': string,
			'top_right': string,
			'bottom_left': string,
			'bottom_center': string,
			'bottom_right': string,
		}) 
		Align_select( ): $mol_switch
		Align( ): $mol_labeler
		Manage( ): $mol_row
		anchor_button_icon( ): $mol_icon_anchor
		anchor_button_title( ): string
		Pop_anchor( ): $mol_button_major
		bubble_hint( ): string
		Content( ): $mol_row
		Pop( ): $mol_pop
		Other( ): $mol_view
		Pop_area( ): $mol_view
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_pop_over extends $mol_pop {
		hovered( next?: boolean ): boolean
		event_show( next?: any ): any
		event_hide( next?: any ): any
		showed( ): ReturnType< $mol_pop_over['hovered'] >
		attr( ): ({ 
			'tabindex': number,
		})  & ReturnType< $mol_pop['attr'] >
		event( ): ({ 
			mouseenter( next?: ReturnType< $mol_pop_over['event_show'] > ): ReturnType< $mol_pop_over['event_show'] >,
			mouseleave( next?: ReturnType< $mol_pop_over['event_hide'] > ): ReturnType< $mol_pop_over['event_hide'] >,
		})  & ReturnType< $mol_pop['event'] >
	}
	
}

//# sourceMappingURL=over.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_pop_over_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__title_mol_pop_over_demo_2 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['open_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title_mol_pop_over_demo_3 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['export_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title_mol_pop_over_demo_4 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['save_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows_mol_pop_over_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align_mol_pop_over_demo_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor_mol_pop_over_demo_7 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['File_anchor'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content_mol_pop_over_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_view__sub_mol_pop_over_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_button_minor__title_mol_pop_over_demo_10 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['updates_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__title_mol_pop_over_demo_11 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['about_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_list__rows_mol_pop_over_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pop_over__align_mol_pop_over_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pop_over['align'] >
	>
	type $mol_pop_over__Anchor_mol_pop_over_demo_14 = $mol_type_enforce<
		ReturnType< $mol_pop_over_demo['Help_anchor'] >
		,
		ReturnType< $mol_pop_over['Anchor'] >
	>
	type $mol_pop_over__bubble_content_mol_pop_over_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pop_over['bubble_content'] >
	>
	type $mol_row__sub_mol_pop_over_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_pop_over_demo extends $mol_example_small {
		File_anchor( ): $mol_view
		open_title( ): string
		Open( ): $mol_button_minor
		export_title( ): string
		Export( ): $mol_button_minor
		save_title( ): string
		Save( ): $mol_button_minor
		File_menu( ): $mol_list
		File( ): $mol_pop_over
		Help_anchor( ): $mol_view
		updates_title( ): string
		Updates( ): $mol_button_minor
		about_title( ): string
		About( ): $mol_button_minor
		Help_menu( ): $mol_list
		Help( ): $mol_pop_over
		Menu( ): $mol_row
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_portion__portion_mol_portion_demo_1 = $mol_type_enforce<
		ReturnType< $mol_portion_demo['fist'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_portion__portion_mol_portion_demo_2 = $mol_type_enforce<
		ReturnType< $mol_portion_demo['second'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_portion__portion_mol_portion_demo_3 = $mol_type_enforce<
		ReturnType< $mol_portion_demo['third'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	export class $mol_portion_demo extends $mol_example_small {
		fist( ): number
		Empty( ): $mol_portion
		second( ): number
		Partial( ): $mol_portion
		third( ): number
		Full( ): $mol_portion
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_menu extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=menu.view.tree.d.ts.map
declare namespace $ {

	export class $mol_button_download extends $mol_button_minor {
		Icon( ): $mol_icon_download
		title( ): string
		blob( ): any
		uri( ): string
		file_name( ): string
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=download.view.tree.d.ts.map
declare namespace $ {

	type $mol_text__text_mol_pick_demo_1 = $mol_type_enforce<
		ReturnType< $mol_pick_demo['info_content_text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_pick__title_mol_pick_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['title'] >
	>
	type $mol_pick__bubble_content_mol_pick_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_button_copy__title_mol_pick_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__text_mol_pick_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['text'] >
	>
	type $mol_button_download__title_mol_pick_demo_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['title'] >
	>
	type $mol_button_download__blob_mol_pick_demo_7 = $mol_type_enforce<
		ReturnType< $mol_pick_demo['Menu_item_download_blob'] >
		,
		ReturnType< $mol_button_download['blob'] >
	>
	type $mol_button_download__file_name_mol_pick_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_download['file_name'] >
	>
	type $mol_button_major__title_mol_pick_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_major__click_mol_pick_demo_10 = $mol_type_enforce<
		ReturnType< $mol_pick_demo['delete_confirm'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_pick__align_mol_pick_demo_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['align'] >
	>
	type $mol_pick__trigger_content_mol_pick_demo_12 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_mol_pick_demo_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	type $mol_list__rows_mol_pick_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_pick__hint_mol_pick_demo_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_pick['hint'] >
	>
	type $mol_pick__trigger_content_mol_pick_demo_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['trigger_content'] >
	>
	type $mol_pick__bubble_content_mol_pick_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_pick['bubble_content'] >
	>
	export class $mol_pick_demo extends $mol_example_small {
		info_content_text( ): string
		Info_content( ): $mol_text
		Info_pop( ): $mol_pick
		Options_trigger_icon( ): $mol_icon_menu
		Menu_item_copy( ): $mol_button_copy
		Menu_item_download_blob( ): $mol_blob
		Menu_item_download( ): $mol_button_download
		menu_item_delete_icon( ): $mol_icon_trash_can_outline
		menu_item_delete_label( ): string
		delete_confirm( next?: any ): any
		Delete_confirm( ): $mol_button_major
		Menu_item_delete( ): $mol_pick
		Options_content( ): $mol_list
		Options_pop( ): $mol_pick
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clock extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=clock.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_clock_outline extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=outline.view.tree.d.ts.map
declare namespace $ {

	type $mol_format__value_mol_pick_time_1 = $mol_type_enforce<
		ReturnType< $mol_pick_time['value'] >
		,
		ReturnType< $mol_format['value'] >
	>
	type $mol_format__mask_mol_pick_time_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['mask'] >
	>
	type $mol_format__allow_mol_pick_time_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_format['allow'] >
	>
	type $mol_format__enabled_mol_pick_time_4 = $mol_type_enforce<
		ReturnType< $mol_pick_time['enabled'] >
		,
		ReturnType< $mol_format['enabled'] >
	>
	type $mol_switch__value_mol_pick_time_5 = $mol_type_enforce<
		ReturnType< $mol_pick_time['hour_selected'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_pick_time_6 = $mol_type_enforce<
		ReturnType< $mol_pick_time['hour_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_paragraph__title_mol_pick_time_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_paragraph['title'] >
	>
	type $mol_switch__value_mol_pick_time_8 = $mol_type_enforce<
		ReturnType< $mol_pick_time['minute_selected'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_pick_time_9 = $mol_type_enforce<
		ReturnType< $mol_pick_time['minute_options'] >
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_row__sub_mol_pick_time_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_pick_time extends $mol_pick {
		enabled( ): boolean
		value( next?: string ): string
		Input( ): $mol_format
		hour_selected( next?: string ): string
		hour_options( ): Record<string, any>
		Hours( ): $mol_switch
		Delimiter( ): $mol_paragraph
		minute_selected( next?: string ): string
		minute_options( ): Record<string, any>
		Minutes( ): $mol_switch
		Pickers( ): $mol_row
		Icon( ): $mol_icon_clock_outline
		trigger_enabled( ): ReturnType< $mol_pick_time['enabled'] >
		bubble_content( ): readonly(any)[]
		value_moment( next?: $mol_time_moment ): $mol_time_moment
	}
	
}

//# sourceMappingURL=time.view.tree.d.ts.map
declare namespace $ {

	type $mol_time_moment__mol_pick_time_demo_1 = $mol_type_enforce<
		[ string ]
		,
		ConstructorParameters< typeof $mol_time_moment >
	>
	type $mol_pick_time__value_moment_mol_pick_time_demo_2 = $mol_type_enforce<
		ReturnType< $mol_pick_time_demo['moment'] >
		,
		ReturnType< $mol_pick_time['value_moment'] >
	>
	export class $mol_pick_time_demo extends $mol_example_small {
		moment( next?: $mol_time_moment ): $mol_time_moment
		Picker( ): $mol_pick_time
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__hint_mol_row_demo_form_1 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['name_hint'] >
		,
		ReturnType< $mol_search['hint'] >
	>
	type $mol_search__query_mol_row_demo_form_2 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['name'] >
		,
		ReturnType< $mol_search['query'] >
	>
	type $mol_search__suggests_mol_row_demo_form_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_search['suggests'] >
	>
	type $mol_number__hint_mol_row_demo_form_4 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['count_hint'] >
		,
		ReturnType< $mol_number['hint'] >
	>
	type $mol_number__value_mol_row_demo_form_5 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['count'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_portion__portion_mol_row_demo_form_6 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['progress'] >
		,
		ReturnType< $mol_portion['portion'] >
	>
	type $mol_check_box__title_mol_row_demo_form_7 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['publish_label'] >
		,
		ReturnType< $mol_check_box['title'] >
	>
	type $mol_check_box__checked_mol_row_demo_form_8 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['publish'] >
		,
		ReturnType< $mol_check_box['checked'] >
	>
	type $mol_button_minor__title_mol_row_demo_form_9 = $mol_type_enforce<
		ReturnType< $mol_row_demo_form['drop_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_row__sub_mol_row_demo_form_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	export class $mol_row_demo_form extends $mol_example {
		name_hint( ): string
		name( next?: string ): string
		suggest1( ): string
		suggest2( ): string
		Name( ): $mol_search
		count_hint( ): string
		count( next?: any ): any
		Count( ): $mol_number
		progress( ): number
		Progress( ): $mol_portion
		publish_label( ): string
		publish( next?: boolean ): boolean
		Publish( ): $mol_check_box
		drop_title( ): string
		Drop( ): $mol_button_minor
		Row( ): $mol_row
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=form.view.tree.d.ts.map
declare namespace $ {

	type $mol_row__sub_mol_row_demo_products_1 = $mol_type_enforce<
		ReturnType< $mol_row_demo_products['products'] >
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_card__minimal_width_mol_row_demo_products_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_card['minimal_width'] >
	>
	type $mol_card__minimal_height_mol_row_demo_products_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_card['minimal_height'] >
	>
	type $mol_card__title_mol_row_demo_products_4 = $mol_type_enforce<
		ReturnType< $mol_row_demo_products['product_title'] >
		,
		ReturnType< $mol_card['title'] >
	>
	export class $mol_row_demo_products extends $mol_example {
		product_title( id: any): string
		products( ): readonly(any)[]
		Products( ): $mol_row
		title( ): string
		count( ): number
		Product( id: any): $mol_card
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=products.view.tree.d.ts.map
declare namespace $ {

	type $mol_list__rows_mol_scroll_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_scroll__sub_mol_scroll_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_scroll_demo extends $mol_example_large {
		Filler0( ): $mol_filler
		Filler1( ): $mol_filler
		Filler2( ): $mol_filler
		Filler3( ): $mol_filler
		Filler4( ): $mol_filler
		Filler5( ): $mol_filler
		Filler6( ): $mol_filler
		Filler7( ): $mol_filler
		Filler8( ): $mol_filler
		Filler9( ): $mol_filler
		Content( ): $mol_list
		Scroll( ): $mol_scroll
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_search__suggests_mol_search_demo_1 = $mol_type_enforce<
		ReturnType< $mol_search_demo['suggests'] >
		,
		ReturnType< $mol_search['suggests'] >
	>
	export class $mol_search_demo extends $mol_example_small {
		query( ): ReturnType< ReturnType< $mol_search_demo['Search'] >['query'] >
		suggests( ): readonly(any)[]
		Search( ): $mol_search
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_section__title_mol_section_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	export class $mol_section_demo extends $mol_example_small {
		Section_content( ): $mol_filler
		Section( ): $mol_section
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_filler__min_symbols_mol_section_demo_level_1 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_4 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_filler__min_symbols_mol_section_demo_level_7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_filler['min_symbols'] >
	>
	type $mol_section__level_mol_section_demo_level_8 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_11 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_14 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_16 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_17 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_18 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_19 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_20 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_23 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_24 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_25 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	type $mol_section__level_mol_section_demo_level_26 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_section['level'] >
	>
	type $mol_section__title_mol_section_demo_level_27 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_section['title'] >
	>
	type $mol_section__content_mol_section_demo_level_28 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_section['content'] >
	>
	export class $mol_section_demo_level extends $mol_example_small {
		Section1_text( ): $mol_filler
		Section2_text( ): $mol_filler
		Section3_text( ): $mol_filler
		Section4_text( ): $mol_filler
		Section5_text( ): $mol_filler
		Section6_text( ): $mol_filler
		Section7_text( ): $mol_filler
		title( ): string
		sub( ): readonly(any)[]
		Section1( ): $mol_section
		Section2( ): $mol_section
		Section3( ): $mol_section
		Section4( ): $mol_section
		Section5( ): $mol_section
		Section6( ): $mol_section
		Section7( ): $mol_section
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=level.view.tree.d.ts.map
declare namespace $ {

	type $mol_select_colors_color_preview__color_mol_select_demo_colors_1 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['option_color'] >
		,
		ReturnType< $mol_select_colors_color_preview['color'] >
	>
	type $mol_dimmer__haystack_mol_select_demo_colors_2 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_name'] >
		,
		ReturnType< $mol_dimmer['haystack'] >
	>
	type $mol_dimmer__needle_mol_select_demo_colors_3 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_filter'] >
		,
		ReturnType< $mol_dimmer['needle'] >
	>
	type $mol_view__sub_mol_select_demo_colors_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_view__minimal_height_mol_select_demo_colors_5 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_view['minimal_height'] >
	>
	type $mol_select__value_mol_select_demo_colors_6 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary_mol_select_demo_colors_7 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['colors'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	type $mol_select__option_label_mol_select_demo_colors_8 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['color_name'] >
		,
		ReturnType< $mol_select['option_label'] >
	>
	type $mol_select__option_content_mol_select_demo_colors_9 = $mol_type_enforce<
		ReturnType< $mol_select_demo_colors['option_content'] >
		,
		ReturnType< $mol_select['option_content'] >
	>
	export class $mol_select_demo_colors extends $mol_example_small {
		color_filter( ): ReturnType< ReturnType< $mol_select_demo_colors['Color'] >['filter_pattern'] >
		color( next?: string ): string
		colors( ): Record<string, any>
		color_name( id: any): string
		option_color( id: any): string
		Color_preview( id: any): $mol_select_colors_color_preview
		Color_name( id: any): $mol_dimmer
		Color_option( id: any): $mol_view
		option_content( id: any): readonly(any)[]
		Color( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	export class $mol_select_colors_color_preview extends $mol_view {
		color( ): string
		style( ): ({ 
			'background': ReturnType< $mol_select_colors_color_preview['color'] >,
		})  & ReturnType< $mol_view['style'] >
	}
	
}

//# sourceMappingURL=colors.view.tree.d.ts.map
declare namespace $ {

	type $mol_select__no_options_message_mol_select_demo_month_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_select['no_options_message'] >
	>
	type $mol_select__value_mol_select_demo_month_2 = $mol_type_enforce<
		ReturnType< $mol_select_demo_month['month'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__dictionary_mol_select_demo_month_3 = $mol_type_enforce<
		ReturnType< $mol_select_demo_month['months'] >
		,
		ReturnType< $mol_select['dictionary'] >
	>
	export class $mol_select_demo_month extends $mol_example_small {
		month( next?: string ): string
		months( ): ({ 
			'jan': string,
			'feb': string,
			'mar': string,
			'apr': string,
			'may': string,
			'jun': string,
			'jul': string,
			'aug': string,
			'sep': string,
			'oct': string,
			'nov': string,
			'dec': string,
		}) 
		Month( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=month.view.tree.d.ts.map
declare namespace $ {

	type $mol_select__Filter_mol_select_demo_priority_1 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_select['Filter'] >
	>
	type $mol_select__value_mol_select_demo_priority_2 = $mol_type_enforce<
		ReturnType< $mol_select_demo_priority['priority'] >
		,
		ReturnType< $mol_select['value'] >
	>
	type $mol_select__options_mol_select_demo_priority_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_select['options'] >
	>
	export class $mol_select_demo_priority extends $mol_example_small {
		priority( next?: string ): string
		Priority( ): $mol_select
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=priority.view.tree.d.ts.map
declare namespace $ {

	type $mol_select_list__value_mol_select_list_demo_1 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['friends'] >
		,
		ReturnType< $mol_select_list['value'] >
	>
	type $mol_select_list__dictionary_mol_select_list_demo_2 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['suggestions'] >
		,
		ReturnType< $mol_select_list['dictionary'] >
	>
	type $mol_select_list__value_mol_select_list_demo_3 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['friends'] >
		,
		ReturnType< $mol_select_list['value'] >
	>
	type $mol_select_list__dictionary_mol_select_list_demo_4 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['suggestions'] >
		,
		ReturnType< $mol_select_list['dictionary'] >
	>
	type $mol_select_list__enabled_mol_select_list_demo_5 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_select_list['enabled'] >
	>
	type __mol_select_list_demo_6 = $mol_type_enforce<
		Parameters< $mol_select_list_demo['filter_pattern'] >[0]
		,
		Parameters< ReturnType< $mol_select_list_demo['Friends_lazy'] >['filter_pattern'] >[0]
	>
	type $mol_select_list__value_mol_select_list_demo_7 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['friends_lazy'] >
		,
		ReturnType< $mol_select_list['value'] >
	>
	type $mol_select_list__option_title_mol_select_list_demo_8 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['option_title'] >
		,
		ReturnType< $mol_select_list['option_title'] >
	>
	type $mol_select_list__pick_enabled_mol_select_list_demo_9 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_select_list['pick_enabled'] >
	>
	type $mol_select_list__dictionary_mol_select_list_demo_10 = $mol_type_enforce<
		ReturnType< $mol_select_list_demo['suggestions_lazy'] >
		,
		ReturnType< $mol_select_list['dictionary'] >
	>
	type $mol_list__rows_mol_select_list_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_select_list_demo extends $mol_example_small {
		friends( next?: readonly(any)[] ): readonly(any)[]
		suggestions( ): Record<string, string>
		Friends( ): $mol_select_list
		Friends_disabled( ): $mol_select_list
		friends_lazy( next?: readonly(any)[] ): readonly(any)[]
		option_title( id: any): string
		filter_pattern( next?: ReturnType< ReturnType< $mol_select_list_demo['Friends_lazy'] >['filter_pattern'] > ): ReturnType< ReturnType< $mol_select_list_demo['Friends_lazy'] >['filter_pattern'] >
		suggestions_lazy( ): ReturnType< $mol_select_list_demo['suggestions'] >
		Friends_lazy( ): $mol_select_list
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_speck__value_mol_speck_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_link__sub_mol_speck_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_speck__value_mol_speck_demo_3 = $mol_type_enforce<
		ReturnType< $mol_speck_demo['string_speck'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_view__sub_mol_speck_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_speck__value_mol_speck_demo_5 = $mol_type_enforce<
		ReturnType< $mol_speck_demo['notification_count'] >
		,
		ReturnType< $mol_speck['value'] >
	>
	type $mol_button_minor__sub_mol_speck_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_paragraph__sub_mol_speck_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	export class $mol_speck_demo extends $mol_example_small {
		Link_speck( ): $mol_speck
		Link_icon( ): $mol_icon_settings
		Link( ): $mol_link
		string_speck( ): string
		String_speck( ): $mol_speck
		String_field( ): $mol_string
		String( ): $mol_view
		notification_count( ): number
		Button_speck( ): $mol_speck
		Button_icon( ): $mol_icon_menu
		Button( ): $mol_button_minor
		Message_speck( ): $mol_speck
		message_text( ): string
		Message( ): $mol_paragraph
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__Icon_mol_speech_demo_1 = $mol_type_enforce<
		ReturnType< $mol_speech_demo['Toggle_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_check_icon__checked_mol_speech_demo_2 = $mol_type_enforce<
		ReturnType< $mol_speech_demo['hearing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_row__sub_mol_speech_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_major__click_mol_speech_demo_4 = $mol_type_enforce<
		ReturnType< $mol_speech_demo['speak'] >
		,
		ReturnType< $mol_button_major['click'] >
	>
	type $mol_button_major__sub_mol_speech_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_major['sub'] >
	>
	export class $mol_speech_demo extends $mol_example_small {
		Toggle_icon( ): $mol_icon_microphone
		hearing( next?: boolean ): boolean
		Toggle( ): $mol_check_icon
		message( ): string
		Message( ): $mol_row
		speak( next?: any ): any
		Speak( ): $mol_button_major
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea__value_mol_spell_demo_1 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['article'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_labeler__title_mol_spell_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_spell_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_text_code__text_mol_spell_demo_4 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['segments'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_labeler__title_mol_spell_demo_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_spell_demo_6 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['Segments'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_text_code__text_mol_spell_demo_7 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['report'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_labeler__title_mol_spell_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_spell_demo_9 = $mol_type_enforce<
		ReturnType< $mol_spell_demo['Report'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_list__rows_mol_spell_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_spell_demo extends $mol_example_small {
		article( next?: string ): string
		Article( ): $mol_textarea
		Article_block( ): $mol_labeler
		segments( ): string
		Segments( ): $mol_text_code
		Segments_block( ): $mol_labeler
		report( ): string
		Report( ): $mol_text_code
		Reports_block( ): $mol_labeler
		List( ): $mol_list
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_image__uri_mol_stack_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_image['uri'] >
	>
	type $mol_view__sub_mol_stack_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_stack__sub_mol_stack_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_stack['sub'] >
	>
	export class $mol_stack_demo extends $mol_example_small {
		Back( ): $mol_image
		Front( ): $mol_view
		Collage( ): $mol_stack
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_string_button extends $mol_string {
	}
	
}

//# sourceMappingURL=button.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__value_mol_string_demo_1 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_string_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_string_demo_3 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__hint_mol_string_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_string_demo_5 = $mol_type_enforce<
		ReturnType< $mol_string_demo['broken'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__value_mol_string_demo_6 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__disabled_mol_string_demo_7 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_string['disabled'] >
	>
	type $mol_string__value_mol_string_demo_8 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string_button__value_mol_string_demo_9 = $mol_type_enforce<
		ReturnType< $mol_string_demo['name2'] >
		,
		ReturnType< $mol_string_button['value'] >
	>
	export class $mol_string_demo extends $mol_example_small {
		name( next?: string ): string
		Simple( ): $mol_string
		Hint( ): $mol_string
		broken( next?: string ): string
		Broken( ): $mol_string
		name2( next?: string ): string
		Filled( ): $mol_string
		Disabled( ): $mol_string
		Button( ): $mol_string_button
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_switch__value_mol_switch_demo_1 = $mol_type_enforce<
		ReturnType< $mol_switch_demo['color'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_switch_demo_2 = $mol_type_enforce<
		({ 
			'red': ReturnType< $mol_switch_demo['option_red'] >,
			'green': ReturnType< $mol_switch_demo['option_green'] >,
			'blue': ReturnType< $mol_switch_demo['option_blue'] >,
			'infernal': ReturnType< $mol_switch_demo['option_infernal'] >,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title_mol_switch_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_switch_demo_4 = $mol_type_enforce<
		ReturnType< $mol_switch_demo['Enabled'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_switch__value_mol_switch_demo_5 = $mol_type_enforce<
		ReturnType< $mol_switch_demo['color'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__enabled_mol_switch_demo_6 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_switch['enabled'] >
	>
	type $mol_switch__options_mol_switch_demo_7 = $mol_type_enforce<
		({ 
			'red': ReturnType< $mol_switch_demo['option_red'] >,
			'green': ReturnType< $mol_switch_demo['option_green'] >,
			'blue': ReturnType< $mol_switch_demo['option_blue'] >,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_labeler__title_mol_switch_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__Content_mol_switch_demo_9 = $mol_type_enforce<
		ReturnType< $mol_switch_demo['Disabled'] >
		,
		ReturnType< $mol_labeler['Content'] >
	>
	type $mol_list__sub_mol_switch_demo_10 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['sub'] >
	>
	export class $mol_switch_demo extends $mol_example {
		color( next?: string ): string
		option_red( ): string
		option_green( ): string
		option_blue( ): string
		option_infernal( ): string
		Enabled( ): $mol_switch
		Enabled_labeler( ): $mol_labeler
		Disabled( ): $mol_switch
		Disabled_labeler( ): $mol_labeler
		Demo_items( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_button_minor__title_mol_tag_tree_demo_1 = $mol_type_enforce<
		ReturnType< $mol_tag_tree_demo['item_title'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_tag_tree__Item_mol_tag_tree_demo_2 = $mol_type_enforce<
		ReturnType< $mol_tag_tree_demo['Item'] >
		,
		ReturnType< $mol_tag_tree['Item'] >
	>
	type $mol_tag_tree__levels_expanded_mol_tag_tree_demo_3 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_tag_tree['levels_expanded'] >
	>
	type $mol_tag_tree__ids_tags_mol_tag_tree_demo_4 = $mol_type_enforce<
		({ 
			'Batman': readonly(any)[],
			'Superman': readonly(any)[],
			'Aquaman': readonly(any)[],
			'Flash': readonly(any)[],
			'Jocker': readonly(any)[],
			'Deadshot': readonly(any)[],
			'Ironman': readonly(any)[],
			'Hulk': readonly(any)[],
			'Thor': readonly(any)[],
			'Spiderman': readonly(any)[],
			'Thanos': readonly(any)[],
			'Locky': readonly(any)[],
			'Harley Quinn': readonly(any)[],
			'Wonder Woman': readonly(any)[],
			'Hela': readonly(any)[],
		}) 
		,
		ReturnType< $mol_tag_tree['ids_tags'] >
	>
	export class $mol_tag_tree_demo extends $mol_example {
		item_title( id: any): string
		Item( id: any): $mol_button_minor
		Tree( ): $mol_tag_tree
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_text_code__sidebar_showed_mol_text_code_demo_1 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_text_code['sidebar_showed'] >
	>
	type $mol_text_code__text_mol_text_code_demo_2 = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['source'] >
		,
		ReturnType< $mol_text_code['text'] >
	>
	type $mol_text_code__syntax_mol_text_code_demo_3 = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['syntax'] >
		,
		ReturnType< $mol_text_code['syntax'] >
	>
	type $mol_text_code__uri_resolve_mol_text_code_demo_4 = $mol_type_enforce<
		ReturnType< $mol_text_code_demo['uri_resolve'] >
		,
		ReturnType< $mol_text_code['uri_resolve'] >
	>
	export class $mol_text_code_demo extends $mol_example_small {
		source( ): string
		syntax( ): any
		uri_resolve( id: any): string
		Text( ): $mol_text_code
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type __mol_search_jumper_1 = $mol_type_enforce<
		Parameters< $mol_search_jumper['forward'] >[0]
		,
		Parameters< ReturnType< $mol_search_jumper['Index'] >['forward'] >[0]
	>
	type __mol_search_jumper_2 = $mol_type_enforce<
		Parameters< $mol_search_jumper['backward'] >[0]
		,
		Parameters< ReturnType< $mol_search_jumper['Index'] >['backward'] >[0]
	>
	type $mol_hotkey__mod_shift_mol_search_jumper_3 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_hotkey['mod_shift'] >
	>
	type $mol_hotkey__key_mol_search_jumper_4 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_search_jumper['backward'] > ): ReturnType< $mol_search_jumper['backward'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_hotkey__key_mol_search_jumper_5 = $mol_type_enforce<
		({ 
			enter( next?: ReturnType< $mol_search_jumper['forward'] > ): ReturnType< $mol_search_jumper['forward'] >,
			escape( next?: ReturnType< $mol_search_jumper['escape'] > ): ReturnType< $mol_search_jumper['escape'] >,
		}) 
		,
		ReturnType< $mol_hotkey['key'] >
	>
	type $mol_paginator__value_mol_search_jumper_6 = $mol_type_enforce<
		ReturnType< $mol_search_jumper['index'] >
		,
		ReturnType< $mol_paginator['value'] >
	>
	export class $mol_search_jumper extends $mol_search {
		index( next?: number ): number
		forward( next?: ReturnType< ReturnType< $mol_search_jumper['Index'] >['forward'] > ): ReturnType< ReturnType< $mol_search_jumper['Index'] >['forward'] >
		backward( next?: ReturnType< ReturnType< $mol_search_jumper['Index'] >['backward'] > ): ReturnType< ReturnType< $mol_search_jumper['Index'] >['backward'] >
		Backward( ): $mol_hotkey
		escape( next?: any ): any
		Forward( ): $mol_hotkey
		Root( ): $mol_view
		Index( ): $mol_paginator
		plugins( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=jumper.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_pencil extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=pencil.view.tree.d.ts.map
declare namespace $ {

	type $mol_search_jumper__query_mol_text_demo_1 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_search_jumper['query'] >
	>
	type $mol_search_jumper__Root_mol_text_demo_2 = $mol_type_enforce<
		ReturnType< $mol_text_demo['View'] >
		,
		ReturnType< $mol_search_jumper['Root'] >
	>
	type $mol_link__arg_mol_text_demo_3 = $mol_type_enforce<
		({ 
			'edit': string,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_text_demo_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_text__text_mol_text_demo_5 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_text__highlight_mol_text_demo_6 = $mol_type_enforce<
		ReturnType< $mol_text_demo['search'] >
		,
		ReturnType< $mol_text['highlight'] >
	>
	type $mol_page__title_mol_text_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_text_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_text_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_link__arg_mol_text_demo_10 = $mol_type_enforce<
		({ 
			'edit': any,
		}) 
		,
		ReturnType< $mol_link['arg'] >
	>
	type $mol_link__sub_mol_text_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_link['sub'] >
	>
	type $mol_textarea__value_mol_text_demo_12 = $mol_type_enforce<
		ReturnType< $mol_text_demo['text'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_page__title_mol_text_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_page['title'] >
	>
	type $mol_page__tools_mol_text_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['tools'] >
	>
	type $mol_page__body_mol_text_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_page['body'] >
	>
	type $mol_book2__Placeholder_mol_text_demo_16 = $mol_type_enforce<
		any
		,
		ReturnType< $mol_book2['Placeholder'] >
	>
	type $mol_book2__pages_mol_text_demo_17 = $mol_type_enforce<
		ReturnType< $mol_text_demo['pages'] >
		,
		ReturnType< $mol_book2['pages'] >
	>
	export class $mol_text_demo extends $mol_example_large {
		search( next?: string ): string
		Search( ): $mol_search_jumper
		Edit_icon( ): $mol_icon_pencil
		Edit( ): $mol_link
		View( ): $mol_text
		View_page( ): $mol_page
		Close_icon( ): $mol_icon_close
		Close( ): $mol_link
		text( next?: string ): string
		Code( ): $mol_textarea
		Code_page( ): $mol_page
		pages( ): readonly(any)[]
		Book( ): $mol_book2
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_textarea__sidebar_showed_mol_textarea_demo_1 = $mol_type_enforce<
		boolean
		,
		ReturnType< $mol_textarea['sidebar_showed'] >
	>
	type $mol_textarea__hint_mol_textarea_demo_2 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_textarea['hint'] >
	>
	type $mol_textarea__value_mol_textarea_demo_3 = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['filled_descr'] >
		,
		ReturnType< $mol_textarea['value'] >
	>
	type $mol_text__text_mol_textarea_demo_4 = $mol_type_enforce<
		ReturnType< $mol_textarea_demo['symbols_hint'] >
		,
		ReturnType< $mol_text['text'] >
	>
	type $mol_list__rows_mol_textarea_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_textarea_demo extends $mol_example {
		filled_descr( next?: string ): string
		Filled_descr( ): $mol_textarea
		symbols_hint( ): string
		Disabled( ): $mol_text
		Content( ): $mol_list
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_number__value_mol_theme_demo_1 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_theme_demo_2 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name_mol_theme_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_theme_demo_4 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_number__value_mol_theme_demo_5 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['hue_spread'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_theme_demo_6 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_form_field__name_mol_theme_demo_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_theme_demo_8 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Hue_spread'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_form_field__name_mol_theme_demo_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_form_field['name'] >
	>
	type $mol_form_field__Content_mol_theme_demo_10 = $mol_type_enforce<
		ReturnType< $mol_theme_demo['Lights'] >
		,
		ReturnType< $mol_form_field['Content'] >
	>
	type $mol_row__sub_mol_theme_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_theme_demo_case__theme_mol_theme_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme_mol_theme_demo_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme_mol_theme_demo_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__theme_mol_theme_demo_15 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['theme'] >
	>
	type $mol_theme_demo_case__title_mol_theme_demo_16 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_theme_demo_case['title'] >
	>
	type $mol_theme_demo_case__inner_mol_theme_demo_17 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_theme_demo_case['inner'] >
	>
	type $mol_scroll__sub_mol_theme_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_scroll['sub'] >
	>
	export class $mol_theme_demo extends $mol_example_large {
		Theme( ): $mol_theme_auto
		hue_deg( ): string
		hue_spread_deg( ): string
		hue( next?: number ): number
		Hue( ): $mol_number
		Hue_field( ): $mol_form_field
		hue_spread( next?: number ): number
		Hue_spread( ): $mol_number
		Hue_spread_field( ): $mol_form_field
		Lights( ): $mol_lights_toggle
		Lights_field( ): $mol_form_field
		Config( ): $mol_row
		Base( ): $mol_theme_demo_case
		Current( ): $mol_theme_demo_case
		Special( ): $mol_theme_demo_case
		Accent( ): $mol_theme_demo_case
		Cases( ): $mol_theme_demo_case
		Scroll( ): $mol_scroll
		plugins( ): readonly(any)[]
		style( ): ({ 
			'--mol_theme_hue': ReturnType< $mol_theme_demo['hue_deg'] >,
			'--mol_theme_hue_spread': ReturnType< $mol_theme_demo['hue_spread_deg'] >,
		}) 
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
	type $mol_button_copy__title_mol_theme_demo_case_1 = $mol_type_enforce<
		ReturnType< $mol_theme_demo_case['title'] >
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_row__sub_mol_theme_demo_case_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows_mol_theme_demo_case_4 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_5 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_6 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_7 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_9 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_11 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_13 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_button_copy__title_mol_theme_demo_case_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_button_copy['title'] >
	>
	type $mol_list__rows_mol_theme_demo_case_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	export class $mol_theme_demo_case extends $mol_view {
		theme( ): string
		Card2_text( ): $mol_button_copy
		Card2( ): $mol_row
		Card1_text( ): $mol_button_copy
		Card1( ): $mol_list
		Back( ): $mol_button_copy
		Line( ): $mol_button_copy
		Text( ): $mol_button_copy
		Field( ): $mol_button_copy
		Shade( ): $mol_button_copy
		Focus( ): $mol_button_copy
		Control( ): $mol_button_copy
		Hover( ): $mol_button_copy
		Current( ): $mol_button_copy
		Special( ): $mol_button_copy
		Self( ): $mol_list
		title( ): ReturnType< $mol_theme_demo_case['theme'] >
		sub( ): readonly(any)[]
		inner( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_time_duration_demo extends $mol_example_code {
		title( ): string
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_time_interval_demo extends $mol_example_code {
		title( ): string
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_time_moment_demo extends $mol_example_code {
		title( ): string
		code( next?: string ): string
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__sub_mol_toolbar_1 = $mol_type_enforce<
		ReturnType< $mol_toolbar['items'] >
		,
		ReturnType< $mol_view['sub'] >
	>
	type $mol_check_expand__checked_mol_toolbar_2 = $mol_type_enforce<
		ReturnType< $mol_toolbar['expanded'] >
		,
		ReturnType< $mol_check_expand['checked'] >
	>
	export class $mol_toolbar extends $mol_view {
		items( ): readonly($mol_view)[]
		Bar( ): $mol_view
		expanded( next?: boolean ): boolean
		Expand( ): $mol_check_expand
		attr( ): ({ 
			'mol_toolbar_expanded': ReturnType< $mol_toolbar['expanded'] >,
		})  & ReturnType< $mol_view['attr'] >
		sub( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=toolbar.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_copy extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=copy.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_cut extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=cut.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_content_paste extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=paste.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_delete extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=delete.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__hint_mol_toolbar_demo_1 = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['search_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__hint_mol_toolbar_demo_2 = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['replace_hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_button_major__title_mol_toolbar_demo_3 = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['approve_label'] >
		,
		ReturnType< $mol_button_major['title'] >
	>
	type $mol_button_minor__title_mol_toolbar_demo_4 = $mol_type_enforce<
		ReturnType< $mol_toolbar_demo['decline_label'] >
		,
		ReturnType< $mol_button_minor['title'] >
	>
	type $mol_button_minor__sub_mol_toolbar_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub_mol_toolbar_demo_6 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub_mol_toolbar_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_button_minor__sub_mol_toolbar_demo_8 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_button_minor['sub'] >
	>
	type $mol_toolbar__items_mol_toolbar_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_toolbar['items'] >
	>
	export class $mol_toolbar_demo extends $mol_example_small {
		search_hint( ): string
		Search( ): $mol_string
		replace_hint( ): string
		Replace( ): $mol_string
		approve_label( ): string
		Approve( ): $mol_button_major
		decline_label( ): string
		Decline( ): $mol_button_minor
		Copy_icon( ): $mol_icon_content_copy
		Copy( ): $mol_button_minor
		Cut_icon( ): $mol_icon_content_cut
		Cut( ): $mol_button_minor
		Paste_icon( ): $mol_icon_content_paste
		Paste( ): $mol_button_minor
		Delete_icon( ): $mol_icon_delete
		Delete( ): $mol_button_minor
		Toolbar( ): $mol_toolbar
		title( ): string
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_transit extends $mol_ghost {
		animation_name_style( ): string
		reset( next?: any ): any
		style( ): ({ 
			'animationName': ReturnType< $mol_transit['animation_name_style'] >,
		}) 
		event( ): ({ 
			animationend( next?: ReturnType< $mol_transit['reset'] > ): ReturnType< $mol_transit['reset'] >,
		}) 
	}
	
}

//# sourceMappingURL=transit.view.tree.d.ts.map
declare namespace $ {

	type $mol_switch__value_mol_transit_demo_1 = $mol_type_enforce<
		ReturnType< $mol_transit_demo['align'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_transit_demo_2 = $mol_type_enforce<
		({ 
			'flex-start': string,
			'center': string,
			'flex-end': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_switch__value_mol_transit_demo_3 = $mol_type_enforce<
		ReturnType< $mol_transit_demo['justify'] >
		,
		ReturnType< $mol_switch['value'] >
	>
	type $mol_switch__options_mol_transit_demo_4 = $mol_type_enforce<
		({ 
			'flex-start': string,
			'center': string,
			'flex-end': string,
		}) 
		,
		ReturnType< $mol_switch['options'] >
	>
	type $mol_list__rows_mol_transit_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_list['rows'] >
	>
	type $mol_transit__Sub_mol_transit_demo_6 = $mol_type_enforce<
		ReturnType< $mol_transit_demo['Float'] >
		,
		ReturnType< $mol_transit['Sub'] >
	>
	export class $mol_transit_demo extends $mol_example_large {
		align( next?: string ): string
		Align( ): $mol_switch
		justify( next?: string ): string
		Justify( ): $mol_switch
		Float( ): $mol_list
		Transit( ): $mol_transit
		title( ): string
		style( ): ({ 
			'justify-content': ReturnType< $mol_transit_demo['justify'] >,
			'align-items': ReturnType< $mol_transit_demo['align'] >,
		}) 
		sub( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_video_player extends $mol_view {
		uri( ): string
		controls( ): boolean
		autoplay( ): boolean
		inline( ): boolean
		loop( ): boolean
		muted( ): boolean
		poster( ): string
		stream( ): any
		revolume( next?: any ): any
		retime( next?: any ): any
		redurate( next?: any ): any
		playing_event( next?: any ): any
		play_event( next?: any ): any
		pause_event( next?: any ): any
		dom_name( ): string
		playing( next?: boolean ): boolean
		play( ): any
		pause( ): any
		volume( next?: number ): number
		time( next?: number ): number
		duration( ): number
		attr( ): ({ 
			'src': ReturnType< $mol_video_player['uri'] >,
			'controls': ReturnType< $mol_video_player['controls'] >,
			'autoplay': ReturnType< $mol_video_player['autoplay'] >,
			'playsinline': ReturnType< $mol_video_player['inline'] >,
			'loop': ReturnType< $mol_video_player['loop'] >,
			'muted': ReturnType< $mol_video_player['muted'] >,
			'poster': ReturnType< $mol_video_player['poster'] >,
		}) 
		field( ): ({ 
			'srcObject': ReturnType< $mol_video_player['stream'] >,
		}) 
		event( ): ({ 
			volumechange( next?: ReturnType< $mol_video_player['revolume'] > ): ReturnType< $mol_video_player['revolume'] >,
			timeupdate( next?: ReturnType< $mol_video_player['retime'] > ): ReturnType< $mol_video_player['retime'] >,
			durationchange( next?: ReturnType< $mol_video_player['redurate'] > ): ReturnType< $mol_video_player['redurate'] >,
			playing( next?: ReturnType< $mol_video_player['playing_event'] > ): ReturnType< $mol_video_player['playing_event'] >,
			play( next?: ReturnType< $mol_video_player['play_event'] > ): ReturnType< $mol_video_player['play_event'] >,
			pause( next?: ReturnType< $mol_video_player['pause_event'] > ): ReturnType< $mol_video_player['pause_event'] >,
		}) 
	}
	
}

//# sourceMappingURL=player.view.tree.d.ts.map
declare namespace $ {

	type $mol_check_icon__checked_mol_video_player_demo_1 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['playing'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_video_player_demo_2 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['Playing_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_paragraph__sub_mol_video_player_demo_3 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_paragraph['sub'] >
	>
	type $mol_labeler__title_mol_video_player_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_player_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_player_demo_6 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['time'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_view_mol_video_player_demo_7 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_view'] >
	>
	type $mol_labeler__title_mol_video_player_demo_8 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_player_demo_9 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_player_demo_10 = $mol_type_enforce<
		ReturnType< $mol_video_player_demo['volume'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_mol_video_player_demo_11 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision'] >
	>
	type $mol_labeler__title_mol_video_player_demo_12 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_player_demo_13 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_video_player_demo_14 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type __mol_video_player_demo_15 = $mol_type_enforce<
		Parameters< $mol_video_player_demo['playing'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['playing'] >[0]
	>
	type __mol_video_player_demo_16 = $mol_type_enforce<
		Parameters< $mol_video_player_demo['volume'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['volume'] >[0]
	>
	type __mol_video_player_demo_17 = $mol_type_enforce<
		Parameters< $mol_video_player_demo['time'] >[0]
		,
		Parameters< ReturnType< $mol_video_player_demo['Player'] >['time'] >[0]
	>
	type $mol_video_player__uri_mol_video_player_demo_18 = $mol_type_enforce<
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
declare namespace $ {

	export class $mol_video_camera extends $mol_video_player {
		transform( ): string
		facing( ): string
		aspect( ): number
		size( ): number
		width( ): ReturnType< $mol_video_camera['size'] >
		height( ): ReturnType< $mol_video_camera['size'] >
		brightness( ): number
		sharpness( ): number
		contrast( ): number
		saturation( ): number
		temperature( ): number
		torch( ): boolean
		controls( ): boolean
		style( ): ({ 
			'transform': ReturnType< $mol_video_camera['transform'] >,
		}) 
		video_constraints( ): ({ 
			'facingMode': ReturnType< $mol_video_camera['facing'] >,
			'aspectRatio': ReturnType< $mol_video_camera['aspect'] >,
			'width': ({ 
				'ideal': ReturnType< $mol_video_camera['width'] >,
			}) ,
			'height': ({ 
				'ideal': ReturnType< $mol_video_camera['height'] >,
			}) ,
		}) 
		video_settings( ): ({ 
			'brightness': ReturnType< $mol_video_camera['brightness'] >,
			'sharpness': ReturnType< $mol_video_camera['sharpness'] >,
			'contrast': ReturnType< $mol_video_camera['contrast'] >,
			'saturation': ReturnType< $mol_video_camera['saturation'] >,
			'advanced': readonly(any)[],
		}) 
	}
	
}

//# sourceMappingURL=camera.view.tree.d.ts.map
declare namespace $ {

	export class $mol_icon_flashlight extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=flashlight.view.tree.d.ts.map
declare namespace $ {

	type $mol_video_camera__torch_mol_video_camera_demo_1 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_video_camera['torch'] >
	>
	type $mol_video_camera__brightness_mol_video_camera_demo_2 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_video_camera['brightness'] >
	>
	type $mol_video_camera__sharpness_mol_video_camera_demo_3 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_video_camera['sharpness'] >
	>
	type $mol_video_camera__contrast_mol_video_camera_demo_4 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_video_camera['contrast'] >
	>
	type $mol_video_camera__saturation_mol_video_camera_demo_5 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_video_camera['saturation'] >
	>
	type $mol_video_camera__temperature_mol_video_camera_demo_6 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_video_camera['temperature'] >
	>
	type $mol_row__sub_mol_video_camera_demo_7 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_check_icon__checked_mol_video_camera_demo_8 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['torch'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_video_camera_demo_9 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['Torch_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_10 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_11 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_camera_demo_12 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['brightness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_video_camera_demo_13 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_14 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_15 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_camera_demo_16 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['sharpness'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_17 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_18 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_camera_demo_19 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['contrast'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_video_camera_demo_20 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_21 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_22 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_camera_demo_23 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['saturation'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_video_camera_demo_24 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_25 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_26 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_number__value_mol_video_camera_demo_27 = $mol_type_enforce<
		ReturnType< $mol_video_camera_demo['temperature'] >
		,
		ReturnType< $mol_number['value'] >
	>
	type $mol_number__precision_change_mol_video_camera_demo_28 = $mol_type_enforce<
		number
		,
		ReturnType< $mol_number['precision_change'] >
	>
	type $mol_labeler__title_mol_video_camera_demo_29 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_video_camera_demo_30 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_row__sub_mol_video_camera_demo_31 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_row['sub'] >
	>
	type $mol_scroll__sub_mol_video_camera_demo_32 = $mol_type_enforce<
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
declare namespace $ {

	export class $mol_icon_eye extends $mol_icon {
		path( ): string
	}
	
}

//# sourceMappingURL=eye.view.tree.d.ts.map
declare namespace $ {

	type $mol_string__type_mol_password_1 = $mol_type_enforce<
		ReturnType< $mol_password['type'] >
		,
		ReturnType< $mol_string['type'] >
	>
	type $mol_string__hint_mol_password_2 = $mol_type_enforce<
		ReturnType< $mol_password['hint'] >
		,
		ReturnType< $mol_string['hint'] >
	>
	type $mol_string__value_mol_password_3 = $mol_type_enforce<
		ReturnType< $mol_password['value'] >
		,
		ReturnType< $mol_string['value'] >
	>
	type $mol_string__submit_mol_password_4 = $mol_type_enforce<
		ReturnType< $mol_password['submit'] >
		,
		ReturnType< $mol_string['submit'] >
	>
	type $mol_string__enabled_mol_password_5 = $mol_type_enforce<
		ReturnType< $mol_password['enabled'] >
		,
		ReturnType< $mol_string['enabled'] >
	>
	type $mol_check_icon__checked_mol_password_6 = $mol_type_enforce<
		ReturnType< $mol_password['checked'] >
		,
		ReturnType< $mol_check_icon['checked'] >
	>
	type $mol_check_icon__Icon_mol_password_7 = $mol_type_enforce<
		ReturnType< $mol_password['Show_icon'] >
		,
		ReturnType< $mol_check_icon['Icon'] >
	>
	export class $mol_password extends $mol_view {
		hint( ): string
		value( next?: string ): string
		submit( next?: any ): any
		enabled( ): boolean
		Pass( ): $mol_string
		checked( next?: boolean ): boolean
		Show_icon( ): $mol_icon_eye
		Show( ): $mol_check_icon
		content( ): readonly(any)[]
		type( next?: string ): string
		sub( ): ReturnType< $mol_password['content'] >
	}
	
}

//# sourceMappingURL=password.view.tree.d.ts.map
declare namespace $ {

	type $mol_password__value_mol_password_demo_1 = $mol_type_enforce<
		ReturnType< $mol_password_demo['pass'] >
		,
		ReturnType< $mol_password['value'] >
	>
	type $mol_password__value_mol_password_demo_2 = $mol_type_enforce<
		ReturnType< $mol_password_demo['pass2'] >
		,
		ReturnType< $mol_password['value'] >
	>
	type $mol_password__hint_mol_password_demo_3 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_password['hint'] >
	>
	export class $mol_password_demo extends $mol_example_small {
		pass( next?: string ): string
		Simple( ): $mol_password
		pass2( next?: string ): string
		Hint( ): $mol_password
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	type $mol_view__plugins_mol_lights_demo_1 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['plugins'] >
	>
	type $mol_view__sub_mol_lights_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_view['sub'] >
	>
	export class $mol_lights_demo extends $mol_example_small {
		Theme( ): $mol_theme_auto
		Lighter( ): $mol_lights_toggle
		Sample( ): $mol_view
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
declare namespace $ {

	export class $mol_locale_select extends $mol_select {
	}
	
}

//# sourceMappingURL=select.view.tree.d.ts.map
declare namespace $ {

	type $mol_labeler__title_mol_locale_demo_1 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_locale_demo_2 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	type $mol_locale_select__dictionary_mol_locale_demo_3 = $mol_type_enforce<
		({ 
			'ru': string,
			'en': string,
		}) 
		,
		ReturnType< $mol_locale_select['dictionary'] >
	>
	type $mol_labeler__title_mol_locale_demo_4 = $mol_type_enforce<
		string
		,
		ReturnType< $mol_labeler['title'] >
	>
	type $mol_labeler__content_mol_locale_demo_5 = $mol_type_enforce<
		readonly(any)[]
		,
		ReturnType< $mol_labeler['content'] >
	>
	export class $mol_locale_demo extends $mol_example_small {
		All_languages( ): $mol_locale_select
		All_languages_labeler( ): $mol_labeler
		List_of_languages( ): $mol_locale_select
		List_of_languages_labeler( ): $mol_labeler
		title( ): string
		sub( ): readonly(any)[]
		tags( ): readonly(any)[]
		aspects( ): readonly(any)[]
	}
	
}

//# sourceMappingURL=demo.view.tree.d.ts.map
export = $;
//# sourceMappingURL=web.d.ts.map
