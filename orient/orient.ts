namespace $ {

	export class $mol_orient_server extends $mol_object2 {

		host = 'localhost'
		port = 2424
		username = 'root'
		password = 'root'

		@ $mol_atom2_field
		get api() {
			return $lib_orientjs({
				host : this.host ,
				port : this.port ,
				username : this.username ,
				password : this.password ,
				useToken : true ,
			})
		}

		destructor() {
			const api = $mol_mem_cached( ()=> this.api )
			if( api ) api.close()
		}

		@ $mol_atom2_field
		get db() {

			const api = this.api
			const list = $mol_fiber_sync( ()=> api.list() )()
			const next = {} as Record< string , $mol_orient_db >
			
			for( const item of list ) next[ item.name ] = $mol_orient_db.create( db => {
				db.api = item
				db.server = this
			} )
			
			return next
		}

		@ $mol_fiber.method
		db_add( name : string , type = 'document' , storage = 'plocal' ) {

			const api = this.api
			const resp = $mol_fiber_sync( ()=> api.create({ name , type , storage }) )()
			
			return this.db[ name ] = $mol_orient_db.create( db => {
				db.api = resp
				db.server = this
			} )

		}

		@ $mol_fiber.method
		db_ensure( name : string , type = 'document' , storage = 'plocal' ) {
			
			const db = this.db[ name ]
			if( db ) return db
			
			return this.db_add( name , type , storage )
		}

	}

	export class $mol_orient_db extends $mol_object2 {

		api : InstanceType< typeof $lib_orientjs.Db >

		server : $mol_orient_server

		get name() {
			return this.api.name
		}

		@ $mol_fiber.method
		query( query : string , params : Record< string , any > = {} , limit = 100 , fetchPlan = '' ) {

			const api = this.api
			const resp = $mol_fiber_sync( ()=> api.query( query , { params , limit , fetchPlan }) )()
			
			return resp
		}

	}

}
