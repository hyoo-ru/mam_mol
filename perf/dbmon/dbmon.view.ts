declare let ENV : any
declare let Monitoring : any

namespace $.$$ {

	export class $mol_perf_dbmon extends $.$mol_perf_dbmon {

		@ $mol_mem
		data() {
			$mol_state_time.now( ENV.timeout )
			Monitoring.renderRate.ping();
			return ENV.generateData().toArray()
		}

		databases() {
			return Object.keys( this.data() ).map( index => this.Database( index ) )
		}

		name( id : string ) {
			return this.data()[ id ].dbname
		}

		@ $mol_mem_key
		last_sample( id : string ) {
			return this.data()[ id ].lastSample
		}

		query_count( id : string ) {
			return this.last_sample( id ).nbQueries
		}

		query_count_label_mod( id : string ) {
			return this.last_sample( id ).countClassName
		}

		@ $mol_mem_key
		top_queries_data( db : string ) {
			return this.last_sample( db ).topFiveQueries
		}

		top_queries( db : string ) {
			return Object.keys( this.top_queries_data( db ) ).map( query => this.Query({ db , query }) )
		}

		@ $mol_mem_key
		top_query( id : { db : string , query : string } ) {
			return this.top_queries_data( id.db )[ id.query ]
		}

		query_elapsed( id : { db : string , query : string } ) {
			return this.top_query( id ).formatElapsed
		}

		query_elapsed_mod( id : { db : string , query : string } ) {
			return this.top_query( id ).elapsedClassName
		}

		query_value( id : { db : string , query : string } ) {
			return this.top_query( id ).query
		}

	}

}
