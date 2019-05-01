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

		@ $mol_mem
		prefix( next? : string ) : string {
			if( next === undefined ) {
				return this.$.$mol_state_arg.value( 'prefix' ) || this.$.$mol_state_arg.value( 'common' ) || ''
			} else {
				this.$.$mol_state_arg.value( 'prefix' , next )
				this.$.$mol_state_arg.value( 'common' , null )
				return next
			}
		}

		@ $mol_mem
		postfix( next? : string ) : string {
			return this.$.$mol_state_arg.value( 'postfix' , next ) || ''
		}

		permalink() {
			const win = this.$.$mol_dom_context
			return 'https://tinyurl.com/create.php?url=' + encodeURIComponent( win.location.href )
		}

		@ $mol_mem
		optimized( next? : boolean ) : boolean {
			return this.$.$mol_state_arg.value( 'optimized' , ( next === undefined ) ? undefined : `${ next }` ) !== 'false'
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
			this.optimized()
			this.sources()
			return next || []
		}

		@ $mol_mem
		level_count() {
			return this.measures().reduce( ( max , measure )=> Math.max( max , measure.length )  , 0 )
		}

		@ $mol_mem
		frequencies() {
			const frequencies = this.measures().map( measure => measure[0].frequency )
			return [ ... frequencies , 0 ]
		}
		
		@ $mol_mem_key
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

		@ $mol_mem
		run() {

			function measure( inner : string , outer = [ '' , '' ] ) {

				try {
				
					let current = ''				
					let time_run = 0
					let iteration = 0

					while( true ) {
						
						let measure_time = - performance.now()

						const next_count = Math.ceil( iteration * 1.5 || 1 )
						while( iteration < next_count ) {
							current += inner.replace( /\{#\}/g , `${ iteration }` ) + ';'
							iteration ++
						}
						
						const prefix = outer[0].replace( /\{#\}/g , `${ iteration }` )
						const wrapped = `; let $mol_app_jsperf = -performance.now();\n${ current }\n $mol_app_jsperf += performance.now() ;\n`
						const postfix = outer[1].replace( /\{#\}/g , `${ iteration }` ) + ';return $mol_app_jsperf'
						const source = prefix + wrapped + postfix
						
						let func = new Function( '' , source )
						
						time_run = func()
						func = null

						measure_time += performance.now()
		
						if( measure_time > 1000 ) break

					}

					return $mol_app_jsperf_stats.make( stats => {
						stats.elapsed = time_run
						stats.iterations = iteration
					} )
				
				} catch( error ) {

					if( error instanceof $mol_atom_wait ) $mol_fail_hidden( error )

					console.error( error )

					return $mol_app_jsperf_stats.make( stats => {
						stats.error = error.message
						stats.elapsed = 0
						stats.iterations = Number.NEGATIVE_INFINITY
					} )
					
				}

			}
			
			const measures = this.sources().map( inner => {

				const outer = [ this.prefix() , this.postfix() ]

				if( this.optimized() ) {
					outer[0] += ';const $mol_app_jsperf_case = $mol_app_jsperf_iteration => {\n' + inner.replace( /\{#\}/g , '$mol_app_jsperf_iteration' ) + '\n};'
					inner = '$mol_app_jsperf_case({#});'
				}
	
				return [ measure( inner , outer ) ]
			} )

			this.measures( measures )

			$mol_atom_current().destructor()
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
			return this.result().error ? [ this.Error() ] : [ this.Stats() ]
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
			return `${ ( this.result().time * 1000 ).toFixed( 3 ) } µs`
		}

		portion() {
			return this.result().portion
		}

	}

}
