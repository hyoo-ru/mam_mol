namespace $.$$ {
	
	export class $mol_app_bench extends $.$mol_app_bench {
		
		@ $mol_mem
		bench( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'bench' ) , next ) || 'list/'
		}
		
		@ $mol_mem
		sandbox( next? : HTMLIFrameElement , force? : $mol_atom_force ) : HTMLIFrameElement {
			const next2 = this.Sandbox().dom_node() as HTMLIFrameElement
			
			next2.src = this.bench()
			
			next2.onload = event => {
				next2.onload = null
				this.sandbox( next2 , $mol_atom_force )
			}
			
			throw new $mol_atom_wait( `Loading sandbox...` )
		}

		'command_current()' : any[]
		
		@ $mol_mem
		command_current( next? : any[] , force? : $mol_atom_force ) {
			if( this['command_current()']['value()'] ) return
			return next
		}
		
		@ $mol_mem_key
		command_result< Result >( command : any[] , next? : Result ) : Result {
			const sandbox = this.sandbox()
			sandbox.valueOf()
			
			if( next !== void 0 ) return next
			
			const current = this.command_current( command )
			if( current !== command ) throw new $mol_atom_wait( `Waiting for ${ JSON.stringify( current ) }...` )
			
			requestAnimationFrame( ()=> {
				sandbox.contentWindow.postMessage( command , '*' )
				
				window.onmessage = event => {
					if( event.data[ 0 ] !== 'done' ) return
					window.onmessage = null
					
					this.command_current( null , $mol_atom_force )
					this.command_result( command , event.data[ 1 ] )
				}
			} )
			
			throw new $mol_atom_wait( `Running ${ command }...` )
		}
		
		meta() {
			type meta = {
				title : { [ lang : string ] : string }
				descr : { [ lang : string ] : string }
				samples : { [ sample : string ] : {
					title : { [ lang : string ] : string }
				} }
				steps : { [ step : string ] : {
					title : { [ lang : string ] : string }
				} }
				params : { [ param : string ] : {
					title : { [ lang : string ] : string }
					default : number
					type : string
					precision : number
				} }
			}
			return this.command_result< meta >( [ 'meta' ] )
		}
		
		@ $mol_mem
		samples_all( next? : string[] ) {
			return Object.keys( this.meta().samples ).sort( ( a , b )=> {
				const titleA = this.sample_title( a ).toLowerCase()
				const titleB = this.sample_title( a ).toLowerCase()
				return titleA > titleB ? 1 : titleA < titleB ? -1 : 0
			} )
		}
		
		@ $mol_mem
		samples( next? : string[] ) : string[] {
			const arg = $mol_state_arg.value( this.state_key( 'sample' ) , next && next.join( '~' ) )
			return arg ? arg.split( '~' ).sort() : []
		}
		
		@ $mol_mem
		steps( next? : string[] ) {
			return Object.keys( this.meta().steps )
		}
		
		@ $mol_mem
		title() {
			const title = this.meta().title 
			return title[ $mol_locale.lang() ] || title[ 'en' ] || super.title()
		}

		@ $mol_mem
		description() {
			const descr = this.meta().descr
			return descr[ $mol_locale.lang() ] || descr[ 'en' ] || ''
		}
		
		@ $mol_mem_key
		result_sample( sampleId : string )  {
			const result : { [ key : string ] : any } = {
				sample : this.sample_title( sampleId ) ,
			}
			
			this.steps().forEach( step => {
				result[ step ] = this.command_result<string>([ step , sampleId, this.param_dict() ])
			} )
			
			return result
		}

		@ $mol_mem
		result() {
			const result : { [ sample : string ] : { [ step : string ] : any } } = {}
			
			this.samples().forEach( sample => {
				result[ sample ] = this.result_sample( sample )
			} )
			
			return result
		}
		
		@ $mol_mem
		sandbox_title() {
			const command = this.command_current()
			if( !command ) return
			
			return `${ this.sample_title( command[1] ) }: ${ this.step_title( command[0] ) }`
		}

		result_col_title( col_id : string ) {
			if( col_id === 'sample' ) return [ this.result_col_title_sample() ]
			return this.step_title( col_id )
		}
		
		step_title( step : string ) {
			const title = this.meta().steps[ step ].title
			return [ title[ $mol_locale.lang() ] || title[ 'en' ] ]
		}
		
		@ $mol_mem
		result_col_sort( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'sort' ) , next )
		}
		
		@ $mol_mem
		menu_options() {
			const filter = this.filter().toLowerCase()

			return this.samples_all()
			.filter( sample => this.sample_title( sample ).toLowerCase().match( filter ) )
			.map( sample => this.Menu_option( sample ) )
		}

		sample_title( sample : string ) {
			const title = this.meta().samples[ sample ].title
			return title[ $mol_locale.lang() ] || title[ 'en' ]
		}
		
		@ $mol_mem_key
		menu_option_checked( sample : string , next? : boolean ) {
			if( next === void 0 ) return this.samples().indexOf( sample ) !== -1
			
			if( next ) this.samples( this.samples().concat( sample ) )
			else this.samples( this.samples().filter( s => s !== sample ) )
			
			return next
		}

		params() {
			return Object.keys( this.meta().params || {} )
		}

		param_fields() {
			return this.params().map( param => this.Param( param ) )
		}

		param_title( id : string ) {
			const title = this.meta().params[ id ].title
			return title[ $mol_locale.lang() ] || title[ 'en' ]
		}

		@ $mol_mem_key
		param_value( id : string, next? : any) {
			let next_2 = $mol_state_arg.value( this.state_key( id ) , next )
			return next_2 || this.meta().params[ id ].default
		}

		param_precision( id : string ){
			return this.meta().params[ id ].precision
		}

		@ $mol_mem
		param_dict() {
			const param_dict = {}
			const params = this.params()

			for (let param of params  ) {
				param_dict[param] = this.param_value(param)
			}
			return param_dict
		}

	}

}
