namespace $ {

	type ODB = InstanceType< typeof $lib_orientjs.ODB >
	type OStatement = ReturnType< ODB['select'] >
	type ORecord = InstanceType< typeof $lib_orientjs.ORecord >

	export class $mol_orient_server extends $mol_object2 {

		host() { return 'localhost' }
		port() { return 2424 }
		username() { return 'root' }
		password() { return 'root' }

		@ $mol_mem
		api() {
			return $lib_orientjs({
				host : this.host() ,
				port : this.port() ,
				username : this.username() ,
				password : this.password() ,
				useToken : true ,
			})
		}

		destructor() {
			const api = $mol_mem_cached( ()=> this.api() )
			if( api ) api.close()
		}

		@ $mol_mem
		db_all( next? : Record< string , $mol_orient_db > ) {

			if( next ) return next

			const api = this.api()
			const list = $mol_fiber_sync( ()=> api.list() )()
			next = {}
			
			for( const item of list ) {
				next[ item.name ] = $mol_orient_db.create( db => {
					db.api = $mol_const( item )
					db.server = $mol_const( this )
				} )
			}
			
			return next
		}

		db( name : string ) {
			return this.db_all()[ name ]
		}

		@ $mol_fiber.method
		db_add( name : string , type = 'document' , storage = 'plocal' ) {

			const api = this.api()
			const resp = $mol_fiber_sync( ()=> api.create({ name , type , storage }) )()

			const db_all = {
				... this.db_all(),
				[ name ] : $mol_orient_db.create( db => {
					db.api = $mol_const( resp )
					db.server = $mol_const( this )
				} ),
			}

			this.db_all( db_all )
			
			return this.db_all()[ name ] = $mol_orient_db.create( db => {
				db.api = $mol_const( resp )
				db.server = $mol_const( this )
			} )

		}

		@ $mol_fiber.method
		db_ensure( name : string , type = 'document' , storage = 'plocal' ) {
			
			const db = this.db( name )
			if( db ) return db
			
			return this.db_add( name , type , storage )
		}

	}

	export class $mol_orient_db extends $mol_object2 {

		api() : ODB {
			return $mol_fail( `${ this }.api() isn't defined` )
		}

		server() : $mol_orient_server {
			return $mol_fail( `${ this }.api() isn't defined` )
		}

		name() {
			return this.api().name
		}

		@ $mol_fiber.method
		query( query : string , params : Record< string , any > = {} , limit = 100 , fetchPlan = '' ) {

			const api = this.api()
			const resp = $mol_fiber_sync( ()=> api.exec( query , { params , limit , fetchPlan }) as Promise<any> )()
			
			return resp
		}

		@ $mol_fiber.method
		one( build : ( api : ODB )=> OStatement ) {
			const api = this.api()
			const res = $mol_fiber_sync( ()=> build( api ).one< ORecord >() )()
			return $mol_orient_record.create( rec => {
				rec.api = $mol_const( res )
			} )
		}

		@ $mol_fiber.method
		all( build : ( api : ODB )=> OStatement ) {
			const api = this.api()
			const res = $mol_fiber_sync( ()=> build( api ).all< ORecord >() )()
			return res.map( item => $mol_orient_record.create( rec => {
				rec.api = $mol_const( item )
			} ) )
		}

	}

	export class $mol_orient_record extends $mol_object2 {

		api() : ORecord {
			return $mol_fail( `${ this }.api() isn't defined` )
		}

		field( name : string ) {
			return this.api()[ name ]
		}

		rid() {
			return this.field('@rid')
		}

		class() {
			return this.field('@class')
		}

		version() {
			return this.field('@version')
		}

		toJSON() {
			console.log(this.api())
			return this.api()
		}

	}

}
