namespace $.$$ {
	
	/// GitHub users View Model
	export class $mol_app_users extends $.$mol_app_users {
		
		/// Search query string synchronized with argument from URL.
		@ $mol_mem
		query( next? : string , force? : $mol_atom_force ) : string {
			return $mol_state_arg.value( this.state_key( 'query' ) , next )
		}
		
		/// Data source resource based on this.query()
		@ $mol_mem
		master() {
			var query = this.query()
			
			if( query ) {
				var uri = `https://api.github.com/search/users?per_page=100&q=${ encodeURIComponent( query ) }`
				var resource = $mol_http.resource( uri )
			} else {
				resource = null
			}
			
			return resource
		}
		
		/// List of child views. Show users and controls only when this.query() is not empty.
		sub() {
			return [
				this.Head() ,
				... this.master() ? [ this.Body() ] : [] ,
				... this.master() ? [ this.Foot() ] : [] ,
			]
		}
		
		/// Current list of users. May be changed by user.
		@ $mol_mem
		users( next? : string[] , force? : $mol_atom_force ) {
			return next || this.users_master( next , force )
		}
		
		/// List of users loaded from server.
		@ $mol_mem
		users_master( next? : string[] , force? : $mol_atom_force ) {
			const master = this.master()
			if( !master ) return []
			
			const data = next && { items : next.map( login => ({ login }) ) }
			return master.json<{ items : { login : string }[] }>( data , force ).items.map( item => item.login )
		}
		
		/// Reload data from server and discard changes.
		event_reload( next? : Event ) {
			this.users( undefined , $mol_atom_force_cache )
		}
		
		/// Add user with empty name at the end of list.
		event_add( next? : Event ) {
			this.users([ ... this.users() , '' ])
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
			return Boolean( this.users_master().valueOf() )
		}
		
		/// Initiates current user list to upload. 
		event_save( next? : Event ) {
			this.users_master( this.users() )
		}
		
		/// Lazy list of user view models. Items are created only when they fits to viewport.
		@ $mol_mem
		user_rows() {
			return this.users().map( ( user , id )=> this.User_row( id ) )
		}
		
		/// Read/write accessor to user name by id.
		user_name( index : number , next? : string ) {
			const users = this.users()
			
			if( next !== undefined ) {
				this.users([ ... users.slice( 0 , index ) , next , ... users.slice( index + 1 ) ])
			}
			
			return users[ index ] || ''
		}
		
	}
}
