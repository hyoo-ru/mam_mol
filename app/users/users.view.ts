namespace $.$mol {
	
	/// GitHub users View Model
	export class $mol_app_users extends $.$mol_app_users {
		
		query_arg( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'query' ) , next )
		}
		
		/// Search query string synchronized with argument from URL.
		@ $mol_mem()
		query( next? : string ) : string {
			if( next == null ) {
				return this.query_arg()
			} else {
				this.query_arg( next )
				
				if( this._query_timer ) clearTimeout( this._query_timer )
				this._query_timer = setTimeout( ()=> { this.query( null ) } , 500 )
			}
		}
		
		_query_timer = 0
		
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
		sub() {
			var next = [ this.Head() ]
			if( this.master() ) next = [].concat( next , this.Body() , this.Foot() )
			return next
		}
		
		/// Current list of users. May be changed by user.
		@ $mol_mem()
		users( next? : string[] ) {
			let usersMaster = this.users_master()
			return next || usersMaster
		}
		
		/// List of users loaded from server.
		@ $mol_mem()
		users_master( next? : string[] , force? : $mol_atom_force ) {
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
		save_result() {
			return this.users_master()
		}
		
		/// Reload data from server and discard changes.
		event_reload( next? : Event ) {
			this.users_master( void 0 , $mol_atom_force )
		}
		
		/// Add user with empty name at the end of list.
		event_add( next? : Event ) {
			this.users( this.users().concat( '' ) )
		}
		
		/// Remove user from list by id.
		event_user_drop( id : number , next? : Event ) {
			this.users( this.users().filter( ( name , i )=> ( i !== id ) ) )
		}
		
		/// Indicates difference between current list and list loaded from server.
		changed() {
			return JSON.stringify( this.users_master() ) !== JSON.stringify( this.users() )
		}
		
		/// Flag to enable some controls when user list loaded.
		loaded() {
			return Boolean( this.users().valueOf() )
		}
		
		/// Initiates current user list to upload. 
		event_save( next? : Event ) {
			if( !this.changed() ) return
			try {
				this.users_master( this.users() ).valueOf()
			} catch( error ) {
				if( error instanceof $mol_atom_wait ) throw error
				console.log( '---' , error )
			}
		}
		
		body() : any[] {
			if( this.users().length ) {
				return [ this.List() ]
			} else {
				return [ 'Users not found' ]
			}
		}
		
		/// Lazy list of user view models. Items are created only when they fits to viewport.
		@ $mol_mem()
		user_rows() {
			return this.users().map( ( user , id )=> this.User_row( id ) )
		}
		
		/// One user view model with injected behaviour.
		@ $mol_mem_key()
		User_row( id : number ) {
			return new $mol_app_users_row().setup( obj => {
				obj.title = ( next? )=> this.user_name( id , next )
				obj.event_drop = ( next? )=> this.event_user_drop( id , next )
			} )
		}
		
		/// Read/write accessor to user name by id.
		user_name( id : number , next? : string ) {
			if( next === void 0 ) return this.users()[ id ] || ''
			
			this.users( this.users().map( ( name , i )=> ( i === id ) ? next : name ) )
			
			return next
		}
		
	}
}
