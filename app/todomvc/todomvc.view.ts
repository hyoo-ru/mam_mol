interface $mol_app_todomvc_task {
	completed? : boolean
	title? : string
}

module $.$mol {
	
	export class $mol_app_todomvc_taskRow_adder extends $.$mol_app_todomvc_taskRow_adder {
		
		eventPress( ...diff : KeyboardEvent[] ) {
			switch( diff[0]['code'] || diff[0].key ) {
				case 'Enter' : return this.eventDone( event )
			}
		}
		
	}
	
	export class $mol_app_todomvc extends $.$mol_app_todomvc {
		
		@ $mol_prop()
		taskIds( ...diff : number[][] ) : number[] {
			return this.local( 'taskIds()' , ...diff ) || []
		}
		
		argCompleted() {
			var val = this.argument().value( 'completed' )
			return val && val[0]
		}

		@ $mol_prop()
		groupsByCompleted() {
			var groups : { [ index : string ] : number[] } = { 'true' : [] , 'false' : [] }
			this.taskIds().forEach( id => {
				var task = this.task( id )
				groups[ String( task.completed ) ].push( id )
			} )
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

		pendingCount() {
			return this.groupsByCompleted()[ 'false' ].length
		}

		completedCount() {
			return this.groupsByCompleted()[ 'true' ].length
		}

		@ $mol_prop()
		allCompleted( ...diff : boolean[] ) {
			if( diff[0] === void 0 ) return this.pendingCount() === 0
			
			for( let id of this.groupsByCompleted()[ String( !diff[0] ) ] ) {
				var task = this.task( id )
				this.task( id , { title : task.title , completed : diff[0] } )
			}
			
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
		
		@ $mol_prop()
		task( id : number , ...diff : $mol_app_todomvc_task[] ) {
			if( diff[0] === void 0 ) return this.local( `task(${id})` ) || { title : '' , completed : false }
			
			var task = diff[0]
			if( task && diff[1] ) task = (<any>Object).assign( {} , this.task( id ) , diff[0] )
			this.local( `task(${id})` , task )
			
			return task || void 0
		}
		
		taskCompleted( index : number , ...diff : boolean[] ) {
			var id = this.tasksFiltered()[ index ]
			if( diff[0] === void 0 ) return this.task( id ).completed
			
			this.task( id , { completed : diff[0] } , {} )
			
			return diff[0]
		}
		
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
		
		sanitizerMessage() {
			var count = this.completedCount()
			var message = `Clear completed`
			if( count ) message += ` (${count})`
			return message
		}

		footerVisible() {
			return this.taskIds().length > 0
		}

		sanitizerEnabled() {
			return this.completedCount() > 0
		}
		
	}
	
}
