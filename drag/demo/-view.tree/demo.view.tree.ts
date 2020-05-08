namespace $ { export class $mol_drag_demo extends $mol_demo_large {

	/**
	 *  ```
	 *  task_count 100
	 *  ```
	 **/
	task_count() {
		return 100
	}

	/**
	 *  ```
	 *  sub / <= List_drop
	 *  ```
	 **/
	sub() {
		return [this.List_drop()] as readonly any[]
	}

	/**
	 *  ```
	 *  List_drop $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive?obj
	 *  	Sub <= Scroll
	 *  ```
	 **/
	@ $mol_mem
	List_drop() {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive( obj )
			obj.Sub = () => this.Scroll()
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  transfer_adopt?transfer null
	 *  ```
	 **/
	@ $mol_mem
	transfer_adopt( transfer? : any , force? : $mol_mem_force ) {
		return ( transfer !== void 0 ) ? transfer : null as any
	}

	/**
	 *  ```
	 *  receive?obj null
	 *  ```
	 **/
	@ $mol_mem
	receive( obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  Scroll $mol_scroll sub /
	 *  	<= Trash_drop
	 *  	<= List
	 *  ```
	 **/
	@ $mol_mem
	Scroll() {
		return (( obj )=>{
			obj.sub = () => [this.Trash_drop() , this.List()] as readonly any[]
			return obj
		})( new this.$.$mol_scroll(  ) )
	}

	/**
	 *  ```
	 *  Trash_drop $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive_trash?obj
	 *  	Sub <= Trash
	 *  ```
	 **/
	@ $mol_mem
	Trash_drop() {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive_trash( obj )
			obj.Sub = () => this.Trash()
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  receive_trash?obj null
	 *  ```
	 **/
	@ $mol_mem
	receive_trash( obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  Trash $mol_float sub /
	 *  	<= Trash_icon
	 *  	\Trash
	 *  ```
	 **/
	@ $mol_mem
	Trash() {
		return (( obj )=>{
			obj.sub = () => [this.Trash_icon() , "Trash"] as readonly any[]
			return obj
		})( new this.$.$mol_float(  ) )
	}

	/**
	 *  ```
	 *  Trash_icon $mol_icon_trash_can_outline
	 *  ```
	 **/
	@ $mol_mem
	Trash_icon() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_icon_trash_can_outline(  ) )
	}

	/**
	 *  ```
	 *  List $mol_list rows <= task_rows
	 *  ```
	 **/
	@ $mol_mem
	List() {
		return (( obj )=>{
			obj.rows = () => this.task_rows()
			return obj
		})( new this.$.$mol_list(  ) )
	}

	/**
	 *  ```
	 *  task_rows /
	 *  ```
	 **/
	task_rows() {
		return [] as readonly any[]
	}

	/**
	 *  ```
	 *  Task_row!task $mol_drag
	 *  	transfer *
	 *  		text/plain <= task_title!task
	 *  		text/html <= task_html!task
	 *  		text/uri-list <= task_uri!task
	 *  	Sub <= Task_drop!task
	 *  ```
	 **/
	@ $mol_mem_key
	Task_row( task : any ) {
		return (( obj )=>{
			obj.transfer = () => ({
			"text/plain" :  this.task_title(task) ,
			"text/html" :  this.task_html(task) ,
			"text/uri-list" :  this.task_uri(task) ,
		})
			obj.Sub = () => this.Task_drop(task)
			return obj
		})( new this.$.$mol_drag(  ) )
	}

	/**
	 *  ```
	 *  task_title!task \
	 *  ```
	 **/
	task_title( task : any ) {
		return ""
	}

	/**
	 *  ```
	 *  task_html!task \
	 *  ```
	 **/
	task_html( task : any ) {
		return ""
	}

	/**
	 *  ```
	 *  task_uri!task \
	 *  ```
	 **/
	task_uri( task : any ) {
		return ""
	}

	/**
	 *  ```
	 *  Task_drop!task $mol_drop
	 *  	adopt?transfer <=> transfer_adopt?transfer
	 *  	receive?obj <=> receive_before!task?obj
	 *  	Sub <= Task_link!task
	 *  ```
	 **/
	@ $mol_mem_key
	Task_drop( task : any ) {
		return (( obj )=>{
			obj.adopt = ( transfer? : any ) => this.transfer_adopt( transfer )
			obj.receive = ( obj? : any ) => this.receive_before(task , obj )
			obj.Sub = () => this.Task_link(task)
			return obj
		})( new this.$.$mol_drop(  ) )
	}

	/**
	 *  ```
	 *  receive_before!task?obj null
	 *  ```
	 **/
	@ $mol_mem_key
	receive_before( task : any , obj? : any , force? : $mol_mem_force ) {
		return ( obj !== void 0 ) ? obj : null as any
	}

	/**
	 *  ```
	 *  Task_link!task $mol_link
	 *  	uri <= task_uri!task
	 *  	sub / <= task_title!task
	 *  ```
	 **/
	@ $mol_mem_key
	Task_link( task : any ) {
		return (( obj )=>{
			obj.uri = () => this.task_uri(task)
			obj.sub = () => [this.task_title(task)] as readonly any[]
			return obj
		})( new this.$.$mol_link(  ) )
	}

} }
