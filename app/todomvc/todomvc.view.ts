interface $mol_app_todomvc_task {
	completed : boolean
	title : string
}

interface KeyboardEvent {
	code : string
}

module $.$mol {
	
	export class $mol_app_todomvc_taskRow_adder extends $.$mol_app_todomvc_taskRow_adder {
		
		eventPress( ...diff : KeyboardEvent[] ) {
			switch( diff[0].code || diff[0].key ) {
				case 'Enter' : return this.eventDone( event )
			}
		}
		
	}
	
	export class $mol_app_todomvc extends $.$mol_app_todomvc {
		
		@ $mol_prop()
		tasksAll( ...diff : $mol_app_todomvc_task[][] ) {
			return this.local( 'tasksAll' , ...diff ) || [ { completed : false , title : 'hello' } ]
		}

		argCompleted() {
			var val = this.argument().value( 'completed' )
			return val && ( val[0] )
		}

		@ $mol_prop()
		groupsByCompleted() {
			var groups : { [ index : string ] : $mol_app_todomvc_task[] } = { 'true' : [] , 'false' : [] }
			this.tasksAll().forEach( task => {
				groups[ String( task.completed ) ].push( task )
			} )
			return groups
		}

		@ $mol_prop()
		tasks() {
			var completed = this.argCompleted()
			if( completed ) {
				return this.groupsByCompleted()[ completed ] || []
			} else {
				return this.tasksAll()
			}
		}

		pendingCount() {
			return this.groupsByCompleted()[ 'false' ].length
		}

		completedCount() {
			return this.groupsByCompleted()[ 'true' ].length
		}

		@ $mol_prop()
		allCompleted( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) return this.pendingCount() === 0
			
			this.tasksAll( this.tasksAll().map( task => {
				if( task.completed === diff[0] ) return task
				return { title : task.title , completed : diff[0] }
			} ) )
			
			return diff[0]
		}

		@ $mol_prop()
		pendingTail() {
			return ( this.pendingCount() === 1 ) ? ' item left' : ' items left'
		}

		@ $mol_prop()
		eventAdd( ...diff : Event[] ) {
			var title = this.taskNewTitle() 
			if( !title ) return
			
			this.tasksAll( this.tasksAll().concat({ completed : false , title }) )
			this.taskNewTitle( '' )
		}

		@ $mol_prop()
		taskRows() {
			return this.tasks().map( ( task , id ) => this.taskRow( id ) )
		}

		task( id : number , ...diff : $mol_app_todomvc_task[] ) {
			if( diff[0] === void 0 ) return this.tasksAll()[ id ] || { title : '' , completed : false }
			
			var tasks = this.tasksAll()
			tasks = tasks.slice( 0 , id ).concat( $mol_maybe( diff[0] ) ).concat( tasks.slice( id + 1 , tasks.length ) )
			this.tasksAll( tasks )
			
			return diff[0]
		}
		
		taskCompleted( id : number , ...diff : boolean[] ) {
			var task = this.task( id )
			if( diff[0] === void 0 ) return task.completed
			if( diff[0] === task.completed ) return task.completed
			
			this.task( id , { title : task.title , completed : diff[0] } )
			
			return diff[0]
		}
		
		taskTitle( id : number , ...diff : string[] ) {
			var task = this.task( id )
			if( diff[0] === void 0 ) return task.title
			if( diff[0] === task.title ) return task.title
			
			this.task( id , { title : diff[0] , completed : task.completed } )
			
			return diff[0]
		}
		
		@$mol_prop()
		eventTaskDrop( id : number , ...diff : Event[] ) {
			this.task( id , null )
		}

		eventSanitize() {
			this.tasksAll( this.tasksAll().filter( task => !task.completed ) )
		}
		
		sanitizerMessage() {
			var count = this.completedCount()
			var message = `Clear completed`
			if( count ) message += ` (${count})`
			return message
		}

		footerVisible() {
			return this.tasksAll().length > 0
		}

		sanitizerEnabled() {
			return this.completedCount() > 0
		}
		
	}
	
}
