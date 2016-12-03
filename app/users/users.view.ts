namespace $.$mol {
	
	/// GitHub users View Model
	export class $mol_app_users extends $.$mol_app_users {
		
		queryArg( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'query' ) , next )
		}
		
		/// Search query string synchronized with argument from URL.
		@ $mol_mem()
		query( next? : string ) : string {
			if( next == null ) {
				return this.queryArg()
			} else {
				this.queryArg( next )
				
				if( this._queryTimer ) clearTimeout( this._queryTimer )
				this._queryTimer = setTimeout( ()=> { this.query( null ) } , 500 )
			}
		}
		
		_queryTimer = 0
		
		/// Data source resource based on this.query()
		@ $mol_mem()
		master() {
			var query = this.query()
			
			if( query ) {
				var uri = `https://api.github.com/search/users?per_page=100&q=${ encodeURIComponent( query ) }`
				var resource = $mol_http_resource_json.item<{ items : { login : string }[] }>( uri )
			} else {
				resource = null
			}
			
			return resource
		}
		
		/// List of child views. Show users and controls only when this.query() is not empty.
		childs() {
			var next = [ this.filter() ]
			if( this.master() ) next = [].concat( next , this.bodier() , this.controller() )
			return next
		}
		
		/// Current list of users. May be changed by user.
		@ $mol_mem()
		users( next? : string[] ) {
			let usersMaster = this.usersMaster()
			return next || usersMaster
		}
		
		/// List of users loaded from server.
		@ $mol_mem()
		usersMaster( next? : string[] , force? : $mol_atom_force ) {
			if( !this.query() ) return []
			
			const master = this.master()
			
			if( next === void 0 ) {
				return master.json( void 0 , force ).items.map( item => item.login ) as string[]
			}
			
			master.json( next && { items : next.map( login => ({ login }) ) } )
			
			return next
		}
		
		/// Status of net communication. Shows errors of downloading|uploading. 
		@ $mol_mem()
		saverResult() {
			return this.usersMaster()
		}
		
		/// Reload data from server and discard changes.
		eventReload( next? : Event ) {
			this.usersMaster( void 0 , $mol_atom_force )
		}
		
		/// Add user with empty name at the end of list.
		eventAdd( next? : Event ) {
			this.users( this.users().concat( '' ) )
		}
		
		/// Remove user from list by id.
		eventUserDrop( id : number , next? : Event ) {
			this.users( this.users().filter( ( name , i )=> ( i !== id ) ) )
		}
		
		/// Indicates difference between current list and list loaded from server.
		changed() {
			return JSON.stringify( this.usersMaster() ) !== JSON.stringify( this.users() )
		}
		
		/// Flag to enable some controls when user list loaded.
		loaded() {
			return Boolean( this.users().valueOf() )
		}
		
		/// Initiates current user list to upload. 
		eventSave( next? : Event ) {
			if( !this.changed() ) return
			try {
				this.usersMaster( this.users() ).valueOf()
			} catch( error ) {
				if( error instanceof $mol_atom_wait ) throw error
				console.log( '---' , error )
			}
		}
		
		body() : any[] {
			if( this.users().length ) {
				return [ this.lister() ]
			} else {
				return [ 'Users not found' ]
			}
		}
		
		/// Lazy list of user view models. Items are created only when they fits to viewport.
		@ $mol_mem()
		userRows() {
			return this.users().map( ( user , id )=> this.userRow( id ) )
		}
		
		/// One user view model with injected behaviour.
		@ $mol_mem_key()
		userRow( id : number ) {
			return new $mol_app_users_item().setup( obj => {
				obj.title = ( next? )=> this.userName( id , next )
				obj.eventDrop = ( next? )=> this.eventUserDrop( id , next )
			} )
		}
		
		/// Read/write accessor to user name by id.
		userName( id : number , next? : string ) {
			if( next === void 0 ) return this.users()[ id ] || ''
			
			this.users( this.users().map( ( name , i )=> ( i === id ) ? next : name ) )
			
			return next
		}
		
	}
}
