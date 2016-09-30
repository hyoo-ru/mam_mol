module $.$mol {
	
	/// GitHub users View Model
	export class $mol_app_users extends $.$mol_app_users {
		
		queryArg( ...diff : string[] ) {
			return $mol_state_arg.value( this.stateKey( 'query' ) , ...diff )
		}
		
		/// Search query string synchronized with argument from URL.
		@ $mol_prop()
		query( ...diff : string[] ) : string {
			const arg = this.queryArg()
			
			if( diff[0] === void 0 ) {
				return arg
			} else {
				const query = this.query()
				
				this.queryArg( ...diff )
				
				if( this._queryTimer ) clearTimeout( this._queryTimer )
				this._queryTimer = setTimeout( ()=> { this.query( void 0 ) } , 500 )
				
				return query
			}
		}
		
		_queryTimer = 0
		
		/// Data source resource based on this.query()
		@ $mol_prop()
		master( ) {
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
		@ $mol_prop()
		users( ...diff : string[][] ) {
			return diff[0] || this.usersMaster()
		}
		
		/// List of users loaded from server.
		@ $mol_prop()
		usersMaster( ...diff : string[][] ) {
			if( !this.query() ) return []
			
			const master = this.master()
			
			if( diff.length === 0 ) {
				return master.json().items.map( item => item.login ) as string[]
			}
			
			master.json( diff[ 0 ] && { items : diff[ 0 ].map( login => ({ login }) ) } )
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
		
		body() : any[] {
			if( this.users().length ) {
				return [ this.lister() ]
			} else {
				return [ 'Users not found' ]
			}
		}
		
		/// Lazy list of user view models. Items are created only when they fits to viewport.
		@ $mol_prop()
		userRows() {
			return this.users().map( ( user , id )=> this.userRow( id ) )
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
		userName( id : number , ...diff : string[] ) {
			if( diff[0] === void 0 ) return this.users()[ id ] || ''
			
			this.users( this.users().map( ( name , i )=> ( i === id ) ? diff[0] : name ) )
			return diff[0]
		}
		
	}
}
