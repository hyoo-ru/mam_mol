namespace $ { export class $mol_app_lamps extends $mol_book {

	/**
	 *  ```
	 *  lamp_current_id?val \
	 *  ```
	 **/
	@ $mol_mem
	lamp_current_id( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  pages /
	 *  	<= Addon_page
	 *  	<= Main_page
	 *  ```
	 **/
	pages() {
		return [ this.Addon_page() , this.Main_page() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Addon_page $mol_page
	 *  	minimal_width 400
	 *  	title \LampTest.ru
	 *  	body_scroll_top?val <=> menu_scroll_top?val
	 *  	body / <= Menu
	 *  ```
	 **/
	@ $mol_mem
	Addon_page() {
		return (( obj )=>{
			obj.minimal_width = () => 400
			obj.title = () => "LampTest.ru"
			obj.body_scroll_top = ( val? : any ) => this.menu_scroll_top( val )
			obj.body = () => [ this.Menu() ] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  menu_scroll_top?val 0
	 *  ```
	 **/
	@ $mol_mem
	menu_scroll_top( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : 0
	}

	/**
	 *  ```
	 *  Menu $mol_list rows <= lamp_rows
	 *  ```
	 **/
	@ $mol_mem
	Menu() {
		return (( obj )=>{
			obj.rows = () => this.lamp_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  lamp_rows / <= Filter_panel
	 *  ```
	 **/
	lamp_rows() {
		return [ this.Filter_panel() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Filter_panel $mol_float sub / <= Filter
	 *  ```
	 **/
	@ $mol_mem
	Filter_panel() {
		return (( obj )=>{
			obj.sub = () => [ this.Filter() ] as readonly any[]
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  Filter $mol_code
	 *  	hint <= filter_hint
	 *  	value?val <=> filter?val
	 *  ```
	 **/
	@ $mol_mem
	Filter() {
		return (( obj )=>{
			obj.hint = () => this.filter_hint()
			obj.value = ( val? : any ) => this.filter( val )
			return obj
		})( new this.$.$mol_code(  ) )
	}

	/**
	 *  ```
	 *  filter_hint @ \Filter...
	 *  ```
	 **/
	filter_hint() {
		return this.$.$mol_locale.text( "$mol_app_lamps_filter_hint" )
	}

	/**
	 *  ```
	 *  filter?val \
	 *  ```
	 **/
	@ $mol_mem
	filter( val? : any , force? : $mol_mem_force ) {
		return ( val !== void 0 ) ? val : ""
	}

	/**
	 *  ```
	 *  Main_page $mol_page
	 *  	minimal_width 400
	 *  	title <= title
	 *  	event_top?val <=> event_front_up?val
	 *  	tools / <= Close
	 *  	body /
	 *  		<= Info
	 *  		<= Gallery
	 *  ```
	 **/
	@ $mol_mem
	Main_page() {
		return (( obj )=>{
			obj.minimal_width = () => 400
			obj.title = () => this.title()
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			obj.tools = () => [ this.Close() ] as readonly any[]
			obj.body = () => [ this.Info() , this.Gallery() ] as readonly any[]
			return obj
		})( new this.$.$mol_page(  ) )
	}

	/**
	 *  ```
	 *  title \
	 *  ```
	 **/
	title() {
		return ""
	}

	/**
	 *  ```
	 *  Close $mol_link
	 *  	sub / <= Close_icon
	 *  	arg * lamp null
	 *  ```
	 **/
	@ $mol_mem
	Close() {
		return (( obj )=>{
			obj.sub = () => [ this.Close_icon() ] as readonly any[]
			obj.arg = () => ({
			"lamp" :  null as any ,
		})
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_icon $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem
	Close_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  Info $mol_row sub /
	 *  	<= Stat
	 *  	<= Body
	 *  	<= Light
	 *  ```
	 **/
	@ $mol_mem
	Info() {
		return (( obj )=>{
			obj.sub = () => [ this.Stat() , this.Body() , this.Light() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Stat $mol_row sub / <= Rating
	 *  ```
	 **/
	@ $mol_mem
	Stat() {
		return (( obj )=>{
			obj.sub = () => [ this.Rating() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Rating $mol_labeler
	 *  	title <= rating_title
	 *  	content / <= rating
	 *  ```
	 **/
	@ $mol_mem
	Rating() {
		return (( obj )=>{
			obj.title = () => this.rating_title()
			obj.content = () => [ this.rating() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  rating_title @ \Rating
	 *  ```
	 **/
	rating_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_rating_title" )
	}

	/**
	 *  ```
	 *  rating 0
	 *  ```
	 **/
	rating() {
		return 0
	}

	/**
	 *  ```
	 *  Body $mol_row sub /
	 *  	<= Type
	 *  	<= Shape
	 *  	<= Base
	 *  ```
	 **/
	@ $mol_mem
	Body() {
		return (( obj )=>{
			obj.sub = () => [ this.Type() , this.Shape() , this.Base() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Type $mol_labeler
	 *  	title <= type_title
	 *  	content / <= type
	 *  ```
	 **/
	@ $mol_mem
	Type() {
		return (( obj )=>{
			obj.title = () => this.type_title()
			obj.content = () => [ this.type() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  type_title @ \Type
	 *  ```
	 **/
	type_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_type_title" )
	}

	/**
	 *  ```
	 *  type \
	 *  ```
	 **/
	type() {
		return ""
	}

	/**
	 *  ```
	 *  Shape $mol_labeler
	 *  	title <= shape_title
	 *  	content / <= shape
	 *  ```
	 **/
	@ $mol_mem
	Shape() {
		return (( obj )=>{
			obj.title = () => this.shape_title()
			obj.content = () => [ this.shape() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  shape_title @ \Shape
	 *  ```
	 **/
	shape_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_shape_title" )
	}

	/**
	 *  ```
	 *  shape \
	 *  ```
	 **/
	shape() {
		return ""
	}

	/**
	 *  ```
	 *  Base $mol_labeler
	 *  	title <= base_title
	 *  	content / <= base
	 *  ```
	 **/
	@ $mol_mem
	Base() {
		return (( obj )=>{
			obj.title = () => this.base_title()
			obj.content = () => [ this.base() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  base_title @ \Base
	 *  ```
	 **/
	base_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_base_title" )
	}

	/**
	 *  ```
	 *  base \
	 *  ```
	 **/
	base() {
		return ""
	}

	/**
	 *  ```
	 *  Light $mol_row sub /
	 *  	<= Temp
	 *  	<= Cri
	 *  	<= Ripple
	 *  	<= Angle
	 *  ```
	 **/
	@ $mol_mem
	Light() {
		return (( obj )=>{
			obj.sub = () => [ this.Temp() , this.Cri() , this.Ripple() , this.Angle() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Temp $mol_labeler
	 *  	title <= Temp_title
	 *  	content / <= temp
	 *  ```
	 **/
	@ $mol_mem
	Temp() {
		return (( obj )=>{
			obj.title = () => this.Temp_title()
			obj.content = () => [ this.temp() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  Temp_title @ \Temperature
	 *  ```
	 **/
	Temp_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_Temp_title" )
	}

	/**
	 *  ```
	 *  temp \
	 *  ```
	 **/
	temp() {
		return ""
	}

	/**
	 *  ```
	 *  Cri $mol_labeler
	 *  	title <= cri_title
	 *  	content / <= cri
	 *  ```
	 **/
	@ $mol_mem
	Cri() {
		return (( obj )=>{
			obj.title = () => this.cri_title()
			obj.content = () => [ this.cri() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  cri_title @ \CRI
	 *  ```
	 **/
	cri_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_cri_title" )
	}

	/**
	 *  ```
	 *  cri \
	 *  ```
	 **/
	cri() {
		return ""
	}

	/**
	 *  ```
	 *  Ripple $mol_labeler
	 *  	title <= ripple_title
	 *  	content / <= ripple
	 *  ```
	 **/
	@ $mol_mem
	Ripple() {
		return (( obj )=>{
			obj.title = () => this.ripple_title()
			obj.content = () => [ this.ripple() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  ripple_title @ \Ripple
	 *  ```
	 **/
	ripple_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_ripple_title" )
	}

	/**
	 *  ```
	 *  ripple \
	 *  ```
	 **/
	ripple() {
		return ""
	}

	/**
	 *  ```
	 *  Angle $mol_labeler
	 *  	title <= angle_title
	 *  	content / <= angle
	 *  ```
	 **/
	@ $mol_mem
	Angle() {
		return (( obj )=>{
			obj.title = () => this.angle_title()
			obj.content = () => [ this.angle() ] as readonly any[]
			return obj
		})( new this.$.$mol_labeler(  ) )
	}

	/**
	 *  ```
	 *  angle_title @ \Angle
	 *  ```
	 **/
	angle_title() {
		return this.$.$mol_locale.text( "$mol_app_lamps_angle_title" )
	}

	/**
	 *  ```
	 *  angle \
	 *  ```
	 **/
	angle() {
		return ""
	}

	/**
	 *  ```
	 *  Gallery $mol_row sub / <= Photo
	 *  ```
	 **/
	@ $mol_mem
	Gallery() {
		return (( obj )=>{
			obj.sub = () => [ this.Photo() ] as readonly any[]
			return obj
		})( new this.$.$mol_row(  ) )
	}

	/**
	 *  ```
	 *  Photo $mol_image
	 *  	uri <= photo
	 *  	title <= title
	 *  ```
	 **/
	@ $mol_mem
	Photo() {
		return (( obj )=>{
			obj.uri = () => this.photo()
			obj.title = () => this.title()
			return obj
		})( new this.$.$mol_image(  ) )
	}

	/**
	 *  ```
	 *  photo \
	 *  ```
	 **/
	photo() {
		return ""
	}

	/**
	 *  ```
	 *  Lamp_row!id $mol_link
	 *  	sub / <= Lamp_row_dimmer!id
	 *  	arg <= lamp_arg!id
	 *  ```
	 **/
	@ $mol_mem_key
	Lamp_row( id : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.Lamp_row_dimmer(id) ] as readonly any[]
			obj.arg = () => this.lamp_arg(id)
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Lamp_row_dimmer!id $mol_dimmer
	 *  	needle <= filter
	 *  	haystack <= lamp_title!id
	 *  ```
	 **/
	@ $mol_mem_key
	Lamp_row_dimmer( id : any ) {
		return (( obj )=>{
			obj.needle = () => this.filter()
			obj.haystack = () => this.lamp_title(id)
			return obj
		})( new this.$.$mol_dimmer(  ) )
	}

	/**
	 *  ```
	 *  lamp_title!id \
	 *  ```
	 **/
	lamp_title( id : any ) {
		return ""
	}

	/**
	 *  ```
	 *  lamp_arg!id *
	 *  ```
	 **/
	lamp_arg( id : any ) {
		return ({
		})
	}

} }

