namespace $ {

	export class $mol_orient_wrapper< Api > extends $mol_object2 {

		api() : Api {
			return $mol_fail( `${ this }.api() isn't defined` )
		}

	}

	export class $mol_orient_client extends $mol_object2 {

		address() {
			return {
				host: 'localhost',
				port: 2424,
			}
		}

		credentials() {
			return {
				username: 'root' ,
				password: 'root' ,
			}
		}

		@ $mol_mem
		api() {
			return new $lib_orientjs.OrientDBClient( this.address() )
		}

		@ $mol_mem_key
		pool( db : string ) {

			const api = this.api()
			
			const res = $mol_fiber_sync( ()=> api.sessions({
				name : db,
				... this.credentials(),
			}) )()

			return $mol_orient_pool.create( pool => {
				pool.db = $mol_const( db )
				pool.api = $mol_const( res )
				pool.client = $mol_const( this )
			} )

		}

		@ $mol_fiber.method
		db_list() : string[] {
			return $mol_fiber_sync( ()=> this.api().listDatabases( this.credentials() ) )()
		}

		@ $mol_fiber.method
		db_add(
			name : string ,
			type : "graph" | "document" = 'document' ,
			storage :"plocal" | "memory" = 'plocal' ,
		) {
			$mol_fiber_sync( ()=> this.api().createDatabase({ name , type , storage }) )()
			return this
		}

		@ $mol_fiber.method
		db_exists(
			name : string ,
			type : "graph" | "document" = 'document' ,
			storage :"plocal" | "memory" = 'plocal' ,
		) {
			return $mol_fiber_sync( ()=> this.api().existsDatabase({ name , type , storage }) )()
		}

		@ $mol_fiber.method
		db_ensure(
			name : string ,
			type : "graph" | "document" = 'document' ,
			storage :"plocal" | "memory" = 'plocal' ,
		) {
			if( this.db_exists( name , type , storage ) ) return this
			return this.db_add( name , type , storage )
		}

	}

	export class $mol_orient_pool extends $mol_orient_wrapper< $lib_orientjs['ODatabaseSessionPool'] > {

		db() : string {
			return $mol_fail( `${ this }.db() isn't defined` )
		}

		client() : $mol_orient_client {
			return $mol_fail( `${ this }.client() isn't defined` )
		}

		@ $mol_fiber.method
		session() {
			
			const api = $mol_fiber_sync( ()=> this.api().acquire() )()
			
			return $mol_orient_session.create( client => {
				client.api = $mol_const( api )
			} )

		}

	}

	export class $mol_orient_session extends $mol_orient_wrapper< $lib_orientjs['ODatabaseSession'] > {

		pool() : $mol_orient_pool {
			return $mol_fail( `${ this }.pool() isn't defined` )
		}

		client() {
			return this.pool().client()
		}

		@ $mol_fiber.method
		destructor() {
			this.api().close()
		}

		@ $mol_fiber.method
		exec( build : ( api : $lib_orientjs['ODatabaseSession'] )=> $lib_orientjs['OResult'] ) {
			const api = this.api()
			const res = $mol_fiber_sync( ()=> build( api ).all() )() as $lib_orientjs['ORecord'][]
			return res.map( ( item : $lib_orientjs['ORecord'] )=> $mol_orient_record.create( rec => {
				rec.api = $mol_const( item )
			} ) )
		}

		@ $mol_fiber.method
		query( query : string ) {
			$mol_fiber.run( ()=> this.$.$mol_log3_rise({
				place: this ,
				message: 'Query',
				query ,
			}) )
			return this.exec( api => api.query( query ) )
		}

	}

	export class $mol_orient_record extends $mol_orient_wrapper< $lib_orientjs['ORecord'] > {

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
			return this.api()
		}

	}

}
