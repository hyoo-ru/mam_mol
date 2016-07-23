/// GitHub users API.
class $mol_app_users_github extends $mol_http_resource {
	
	/// Get resource by query string.
	@ $mol_prop()
	static search( query : string ) {
		return new this().setup( obj => {
			obj.uri = ()=> 'https://api.github.com/search/users?per_page=100&q=' + encodeURIComponent( query )
		} )
	}
	
	/// Read/write access to list of users as array of strings.
	@ $mol_prop()
	users( ...diff : string[][] ) {
		if( diff.length === 0 ) {
			return this.json().items.map( ({ login }) => login ) as string[]
		}
		this.json( diff[0] && { items : diff[0].map( login => ({ login }) ) } )
	}
	
	/// GitHub has very strong limits to frequency of requests.
	/// Increase download throttling to 1 second.
	latency() {
		return 1000
	}
	
}

module $.$mol {
	
	/// GitHub users View Model
	export class $mol_app_users extends $.$mol_app_users {
		
		/// Search query string synchronized with argument from URL.
		searchQuery( ...diff : string[] ) {
			return String( this.argument().value( 'query' , ...diff ) || '' )
		}
		
		/// Data source resource based on this.searchQuery()
		master( ) {
			var query = this.searchQuery()
			if( !query ) return null
			
			return $mol_app_users_github.search( query )
		}
		
		/// List of child views. Show users and controls only when this.searchQuery() is not empty.
		childs() {
			var next = [ this.filter() ]
			if( this.master() ) next = [].concat( next , this.lister() , this.controller() )
			return next
		}
		
		/// Current list of users. May be changed by user.
		@ $mol_prop()
		users( ...diff : string[][] ) {
			return diff[0] || this.usersMaster()
		}
		
		/// List of users loaded from server.
		usersMaster( ...diff : string[][] ) {
			if( !this.searchQuery() ) return []
			return this.master().users( ...diff )
		}
		
		/// Status of net communication. Shows errors of downloading|uploading. 
		@ $mol_prop({
			fail : ( view : $mol_app_users , error : Error ) => {
				if( error instanceof $mol_atom_wait ) return error
				return error.message
			}
		})
		saverResult() {
			if( !this.master() ) return null
			if( !this.master().uploaded() ) return null
			if( this.changed() ) return null
			
			return 'Saved.'
		}
		
		/// Reload data from server and discard changes.
		eventReload( ...diff : Event[] ) {
			this.master().refresh()
		}
		
		/// Add user with empty name at the end of list.
		eventAdd( ...diff : Event[] ) {
			this.users( this.users().concat( '' ) )
		}
		
		/// Remove user from list by id.
		eventUserDrop( id : number , ...diff : Event[] ) {
			this.users( this.users().filter( ( name , i )=> ( i !== id ) ) )
		}
		
		/// Indicates difference between current list and list loaded from server.
		changed() {
			return JSON.stringify( this.usersMaster() ) !== JSON.stringify( this.users() )
		}
		
		/// Flag to enable some controls when user list loaded.
		loaded() {
			return Boolean( this.users() )
		}
		
		/// Initiates current user list to upload. 
		eventSave( ...diff : Event[] ) {
			if( !this.changed() ) return
			this.usersMaster( this.users() )
		}
		
		/// Lazy list of user view models. Items are created only when they fits to viewport.
		@ $mol_prop()
		userRows() {
			return new $mol_range_lazy({
				get : id => this.userRow( id ) ,
				length : this.users().length ,
			})
		}
		
		/// One user view model with injected behaviour.
		@ $mol_prop()
		userRow( id : number ) {
			return new $mol_app_users_item().setup( obj => {
				obj.title = ( ...diff )=> this.userName( id , ...diff )
				obj.eventDrop = ( ...diff )=> this.eventUserDrop( id , ...diff )
			} )
		}
		
		/// Read/write accessor to user name by id.
		@ $mol_prop()
		userName( id : number , ...diff : string[] ) {
			if( diff[0] === void 0 ) return this.users()[ id ] || ''
			
			this.users( this.users().map( ( name , i )=> ( i === id ) ? diff[0] : name ) )
			return diff[0]
		}
		
	}
}
