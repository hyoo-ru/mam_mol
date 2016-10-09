interface $mol_app_todomvc_task {
	completed? : boolean
	title? : string
}

module $.$mol {
	
	export class $mol_app_todomvc_adder extends $.$mol_app_todomvc_adder {
		
		eventPress( ...diff : KeyboardEvent[] ) {
			switch( diff[0]['code'] || diff[0].key ) {
				case 'Enter' : return this.eventDone( diff[0] )
			}
		}
		
	}
	
	export class $mol_app_todomvc extends $.$mol_app_todomvc {
		
		taskIds( ...diff : number[][] ) : number[] {
			return $mol_state_local.value( this.stateKey( 'taskIds' ) , ...diff ) || []
		}
		
		argCompleted() {
			return $mol_state_arg.value( this.stateKey( 'completed' ) )
		}

		@ $mol_prop()
		groupsByCompleted() {
			var groups : { [ index : string ] : number[] } = { 'true' : [] , 'false' : [] }
			for( let id of this.taskIds() ) {
				var task = this.task( id )
				groups[ String( task.completed ) ].push( id )
			}
			return groups
		}

		@ $mol_prop()
		tasksFiltered() {
			var completed = this.argCompleted()
			if( completed ) {
				return this.groupsByCompleted()[ completed ] || []
			} else {
				return this.taskIds()
			}
		}

		@ $mol_prop()
		allCompleted( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) return this.groupsByCompleted()[ 'false' ].length === 0
			
			for( let id of this.groupsByCompleted()[ String( !diff[0] ) ] ) {
				var task = this.task( id )
				this.task( id , { title : task.title , completed : diff[0] } )
			}
			
			return diff[0]
		}
		
		allCompleterEnabled() {
			return this.taskIds().length > 0 
		}

		@ $mol_prop()
		pendingMessage() {
			let count = this.groupsByCompleted()[ 'false' ].length
			return ( count === 1 ) ? '1 item left' : `${count} items left`
		}

		@ $mol_prop()
		eventAdd( ...diff : Event[] ) {
			var title = this.taskNewTitle() 
			if( !title ) return
			
			var id = Date.now()
			var task = { completed : false , title }
			this.task( id , task )
			
			this.taskIds( this.taskIds().concat( id ) )
			this.taskNewTitle( '' )
		}

		@ $mol_prop()
		taskRows() {
			return this.tasksFiltered().map( ( id , index )=> this.taskRow( index ) )
		}
		
		task( id : number , ...diff : $mol_app_todomvc_task[] ) {
			const key = this.stateKey( `task=${id}` )
			if( diff[0] === void 0 ) return $mol_state_local.value( key ) || { title : '' , completed : false }
			
			var task = diff[0]
			if( task && diff[1] ) task = $mol_merge_dict( this.task( id ) , diff[0] )
			$mol_state_local.value( key , task )
			
			return task || void 0
		}
		
		@ $mol_prop()
		taskCompleted( index : number , ...diff : boolean[] ) {
			var id = this.tasksFiltered()[ index ]
			if( diff[0] === void 0 ) return this.task( id ).completed
			
			this.task( id , { completed : diff[0] } , {} )
			
			return diff[0]
		}
		
		@ $mol_prop()
		taskTitle( index : number , ...diff : string[] ) {
			var id = this.tasksFiltered()[ index ]
			if( diff[0] === void 0 ) return this.task( id ).title
			
			this.task( id , { title : diff[0] } , {} )
			
			return diff[0]
		}
		
		@$mol_prop()
		eventTaskDrop( index : number , ...diff : Event[] ) {
			var tasks = this.tasksFiltered()
			var id = tasks[index]
			tasks = tasks.slice( 0 , index ).concat( tasks.slice( index + 1 , tasks.length ) )
			this.taskIds( tasks )
			this.task( id , null )
		}

		eventSanitize() {
			this.taskIds( this.taskIds().filter( id => {
				if( !this.task( id ).completed ) return true
				this.task( id , null )
				return false
			} ) )
		}
		
		panels() {
			return [
				this.header() , 
				this.lister() ,
				this.footerVisible() ? this.footer() : null ,
			]
		}
		
		footerVisible() {
			return this.taskIds().length > 0
		}

		sanitizerEnabled() {
			return this.groupsByCompleted()[ 'true' ].length > 0
		}
		
	}
	
}
