namespace $.$$ {

	export class $mol_app_jsperf_stats extends $mol_object2 {
		
		elapsed : number
		iterations : number
		portion : number
		error : string

		get time() { return this.elapsed / this.iterations }
		get frequency() { return this.iterations * 1000 / this.elapsed }

	}

	export class $mol_app_jsperf extends $.$mol_app_jsperf {

		@ $mol_mem
		sources( next? : string[] ) : string[] {
			return JSON.parse( this.$.$mol_state_arg.value( 'sources' , next === undefined ? undefined : JSON.stringify( next ) ) || '[]' )
		}

		cases() {
			return $mol_range2( index => this.Case( index ) , ()=> this.sources().length + 1 )
		}

		source( index : number , next? : string ) {

			let sources = this.sources()
			if( next === undefined ) return sources[ index ] || ''

			sources = sources.slice()
			sources[ index ] = next
			this.sources( sources.filter( source => source.length > 0 ) )

			return next
		}

		@ $mol_mem
		measures( next? : $mol_app_jsperf_stats[][] ) {
			this.sources()
			return next || []
		}

		@ $mol_mem
		level_count() {
			return this.measures().reduce( ( max , measure )=> Math.max( max , measure.length )  , 0 )
		}

		@ $mol_mem
		max_frequency( level : number ) {
			return this.measures().reduce( ( max , measure )=> Math.max( max , measure[ level ].frequency ) , 0 )
		}
		
		@ $mol_mem_key 
		results( index : number ) {
			
			const measure = this.measures()[ index ]
			if( !measure ) return []
			
			for( const [ level , stats ] of measure.entries() ) {
				stats.portion = stats.frequency / this.max_frequency( level )
			}

			return measure
		}

		run() {

			function measure( inner : string , outer = [ '' , '' ] ) {

				try {
				
					outer = outer.map( src => src.replace( /\{#\}/g , '' ) )

					let current = ''				
					let time_run = 0
					let iteration = 0

					while( true ) {
						
						const start_make = performance.now()

						const next_count = Math.ceil( iteration * 1.5 || 1 )
						while( iteration < next_count ) {
							current += inner.replace( /\{#\}/g , `${ iteration }` )
							iteration ++
						}
						
						const source = outer.join( current )
						const func = new Function( '' , source )
						const time_make = performance.now() - start_make

						const start_run = performance.now()
						func()
						time_run = performance.now() - start_run
		
						if( time_make > 100 ) break
						if( time_run > 100 ) break

					}

					return $mol_app_jsperf_stats.make( stats => {
						stats.elapsed = time_run
						stats.iterations = iteration
					} )
				
				} catch( error ) {

					console.error( error )

					return $mol_app_jsperf_stats.make( stats => {
						stats.error = error.message
						stats.elapsed = 0
						stats.iterations = Number.NEGATIVE_INFINITY
					} )
					
				}

			}

			const measures = this.sources().map( source => {

				const outer = source.split( /\{\{[\s\S]*\}\}/g )
				const inner = source.replace( /^[\s\S]*\{\{|\}\}[\s\S]*$/g , '' )
				
				const stat_outer = measure( outer.join( '' ) )
				const stat_inner = measure( inner , outer )

				stat_inner.elapsed -= stat_outer.time

				return [ stat_outer , stat_inner ]

			} )

			this.measures( measures )
		}

	}

	export class $mol_app_jsperf_case extends $.$mol_app_jsperf_case {

		@ $mol_mem
		columns() {
			return [
				... super.columns() ,
				... this.result_columns() ,
			]
		}

		@ $mol_mem
		result_columns() {
			return $mol_range2( level => this.Result( level ) , ()=> this.results().length )
		}

		result( level : number ) {
			return this.results()[ level ]
		}

	}

	export class $mol_app_jsperf_case_result extends $.$mol_app_jsperf_case_result {

		sub() {
			return this.result().error ? [ this.Error() ] : [ this.Portion() , this.Stats() ]
		}

		error() {
			return `${ this.result().error }`
		}

		iterations() {
			return `${ ( this.result().iterations.toLocaleString() ) } ops`
		}

		frequency() {
			return `${ ( Math.trunc( this.result().frequency ).toLocaleString() ) } Hz`
		}

		time() {
			return `${ ( this.result().time * 1000 ).toFixed( 2 ) } µs`
		}

		portion() {
			return this.result().portion
		}

	}

}
