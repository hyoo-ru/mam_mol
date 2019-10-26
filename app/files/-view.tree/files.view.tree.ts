namespace $ { export class $mol_app_files extends $mol_book {

	/**
	 *  ```
	 *  uri_current <= uri_root
	 *  ```
	 **/
	uri_current() {
		return this.uri_root()
	}

	/**
	 *  ```
	 *  uri_root <= uri_root_default
	 *  ```
	 **/
	uri_root() {
		return this.uri_root_default()
	}

	/**
	 *  ```
	 *  uri_root_default \
	 *  ```
	 **/
	uri_root_default() {
		return ""
	}

	/**
	 *  ```
	 *  credentials *
	 *  	login \
	 *  	password \
	 *  ```
	 **/
	credentials() {
		return ({
			"login" :  "" ,
			"password" :  "" ,
		})
	}

	/**
	 *  ```
	 *  title <= title_root
	 *  ```
	 **/
	title() {
		return this.title_root()
	}

	/**
	 *  ```
	 *  title_root @ \Documents
	 *  ```
	 **/
	title_root() {
		return this.$.$mol_locale.text( "$mol_app_files_title_root" )
	}

	/**
	 *  ```
	 *  Folder!folder $mol_app_files_folder
	 *  	title <= webdav_title!folder
	 *  	description <= webdav_description!folder
	 *  	tools <= page_tools!folder
	 *  	rows <= folder_rows!folder
	 *  	event_top?val <=> event_front_up?val
	 *  ```
	 **/
	@ $mol_mem_key
	Folder( folder : any ) {
		return (( obj )=>{
			obj.title = () => this.webdav_title(folder)
			obj.description = () => this.webdav_description(folder)
			obj.tools = () => this.page_tools(folder)
			obj.rows = () => this.folder_rows(folder)
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			return obj
		})( new this.$.$mol_app_files_folder(  ) )
	}

	/**
	 *  ```
	 *  webdav_title!folder \
	 *  ```
	 **/
	webdav_title( folder : any ) {
		return ""
	}

	/**
	 *  ```
	 *  webdav_description!folder \
	 *  ```
	 **/
	webdav_description( folder : any ) {
		return ""
	}

	/**
	 *  ```
	 *  folder_rows!folder /
	 *  ```
	 **/
	folder_rows( folder : any ) {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  Folder_row!uri $mol_link
	 *  	minimal_height 40
	 *  	arg <= folder_row_arg!uri
	 *  	current <= folder_row_current!uri
	 *  	sub /
	 *  		<= folder_row_icon!uri
	 *  		<= Folder_row_info!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Folder_row( uri : any ) {
		return (( obj )=>{
			obj.minimal_height = () => 40
			obj.arg = () => this.folder_row_arg(uri)
			obj.current = () => this.folder_row_current(uri)
			obj.sub = () => [ this.folder_row_icon(uri) , this.Folder_row_info(uri) ] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  folder_row_arg!uri *
	 *  ```
	 **/
	folder_row_arg( uri : any ) {
		return ({
		})
	}

	/**
	 *  ```
	 *  folder_row_current!uri false
	 *  ```
	 **/
	folder_row_current( uri : any ) {
		return false
	}

	/**
	 *  ```
	 *  folder_row_icon!uri null
	 *  ```
	 **/
	folder_row_icon( uri : any ) {
		return null as any
	}

	/**
	 *  ```
	 *  Folder_row_info!uri $mol_view sub /
	 *  	<= Folder_row_descr!uri
	 *  	<= Folder_row_title!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Folder_row_info( uri : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.Folder_row_descr(uri) , this.Folder_row_title(uri) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  Folder_row_descr!uri $mol_view sub / <= folder_row_descr!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Folder_row_descr( uri : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.folder_row_descr(uri) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  folder_row_descr!uri \
	 *  ```
	 **/
	folder_row_descr( uri : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Folder_row_title!uri $mol_view sub / <= folder_row_title!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Folder_row_title( uri : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.folder_row_title(uri) ] as readonly any[]
			return obj
		})( new this.$.$mol_view(  ) )
	}

	/**
	 *  ```
	 *  folder_row_title!uri \
	 *  ```
	 **/
	folder_row_title( uri : any ) {
		return ""
	}

	/**
	 *  ```
	 *  File!file $mol_app_files_file
	 *  	title <= webdav_title!file
	 *  	tools <= page_tools!file
	 *  	src <= file_uri!file
	 *  	mime <= file_mime!file
	 *  	event_top?val <=> event_front_up?val
	 *  ```
	 **/
	@ $mol_mem_key
	File( file : any ) {
		return (( obj )=>{
			obj.title = () => this.webdav_title(file)
			obj.tools = () => this.page_tools(file)
			obj.src = () => this.file_uri(file)
			obj.mime = () => this.file_mime(file)
			obj.event_top = ( val? : any ) => this.event_front_up( val )
			return obj
		})( new this.$.$mol_app_files_file(  ) )
	}

	/**
	 *  ```
	 *  file_uri!file \
	 *  ```
	 **/
	file_uri( file : any ) {
		return ""
	}

	/**
	 *  ```
	 *  file_mime!file \
	 *  ```
	 **/
	file_mime( file : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Icon_folder!uri $mol_icon_folder
	 *  ```
	 **/
	@ $mol_mem_key
	Icon_folder( uri : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_folder(  ) )
	}

	/**
	 *  ```
	 *  Icon_file!uri $mol_icon_file
	 *  ```
	 **/
	@ $mol_mem_key
	Icon_file( uri : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_file(  ) )
	}

	/**
	 *  ```
	 *  Placeholder $mol_book_placeholder title <= title
	 *  ```
	 **/
	@ $mol_mem
	Placeholder() {
		return (( obj )=>{
			obj.title = () => this.title()
			return obj
		})( new this.$.$mol_book_placeholder(  ) )
	}

	/**
	 *  ```
	 *  tools_root /
	 *  ```
	 **/
	tools_root() {
		return [  ] as readonly any[]
	}

	/**
	 *  ```
	 *  page_tools!uri / <= Close!uri
	 *  ```
	 **/
	page_tools( uri : any ) {
		return [ this.Close(uri) ] as readonly any[]
	}

	/**
	 *  ```
	 *  Close!uri $mol_link
	 *  	sub / <= Close_icon!uri
	 *  	arg <= close_arg!uri
	 *  ```
	 **/
	@ $mol_mem_key
	Close( uri : any ) {
		return (( obj )=>{
			obj.sub = () => [ this.Close_icon(uri) ] as readonly any[]
			obj.arg = () => this.close_arg(uri)
			return obj
		})( new this.$.$mol_link(  ) )
	}

	/**
	 *  ```
	 *  Close_icon!uri $mol_icon_cross
	 *  ```
	 **/
	@ $mol_mem_key
	Close_icon( uri : any ) {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_cross(  ) )
	}

	/**
	 *  ```
	 *  close_arg!uri *
	 *  ```
	 **/
	close_arg( uri : any ) {
		return ({
		})
	}

} }

namespace $ { export class $mol_app_files_folder extends $mol_page {

	/**
	 *  ```
	 *  minimal_width 400
	 *  ```
	 **/
	minimal_width() {
		return 400
	}

	/**
	 *  ```
	 *  body /
	 *  	<= Description
	 *  	<= Folder_rows
	 *  ```
	 **/
	body() {
		return [ this.Description() , this.Folder_rows() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Description $mol_text text <= description
	 *  ```
	 **/
	@ $mol_mem
	Description() {
		return (( obj )=>{
			obj.text = () => this.description()
			return obj
		})( new this.$.$mol_text(  ) )
	}

	/**
	 *  ```
	 *  description \
	 *  ```
	 **/
	description() {
		return ""
	}

	/**
	 *  ```
	 *  Folder_rows $mol_list rows <= rows
	 *  ```
	 **/
	@ $mol_mem
	Folder_rows() {
		return (( obj )=>{
			obj.rows = () => this.rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  rows /
	 *  ```
	 **/
	rows() {
		return [  ] as readonly any[]
	}

} }

namespace $ { export class $mol_app_files_file extends $mol_page {

	/**
	 *  ```
	 *  minimal_width 800
	 *  ```
	 **/
	minimal_width() {
		return 800
	}

	/**
	 *  ```
	 *  body / <= Embed
	 *  ```
	 **/
	body() {
		return [ this.Embed() ] as readonly any[]
	}

	/**
	 *  ```
	 *  Embed $mol_embed
	 *  	uri <= src
	 *  	mime <= mime
	 *  ```
	 **/
	@ $mol_mem
	Embed() {
		return (( obj )=>{
			obj.uri = () => this.src()
			obj.mime = () => this.mime()
			return obj
		})( new this.$.$mol_embed(  ) )
	}

	/**
	 *  ```
	 *  src \
	 *  ```
	 **/
	src() {
		return ""
	}

	/**
	 *  ```
	 *  mime \
	 *  ```
	 **/
	mime() {
		return ""
	}

} }

