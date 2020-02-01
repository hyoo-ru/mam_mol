namespace $.$$ {
	
	export class $mol_app_bench extends $.$mol_app_bench {
		
		@ $mol_mem
		bench( next? : string ) {
			return $mol_state_arg.value( this.state_key( 'bench' ) , next ) || 'https://mol.js.org/app/bench/list/'
		}
		
		@ $mol_mem
		sandbox() : HTMLIFrameElement {

			const next = this.Sandbox().dom_node() as HTMLIFrameElement
		
			const src = this.bench()
			
			return $mol_fiber_sync( ()=> new Promise< typeof next >( ( done , fail )=> {
				next.onload = ()=> done( next )
				next.src = src
			} ) )()
			
		}

		@ $mol_mem
		command_last( next? : any[] | null ) {
			return next || null
		}
		
		@ $mol_mem_key
		command_result< Result >( command : any[] ) : Result {
			
			const sandbox = this.sandbox()
			new $mol_defer( ()=> this.command_last( command ) )
			
			return $mol_fiber_sync( ()=> new Promise< Result >( done => requestAnimationFrame( ()=> {
				
				const handle = ( event : MessageEvent )=> {
					
					if( event.data[ 0 ] !== 'done' ) return
					window.removeEventListener( 'message' , handle )
					
					done( event.data[ 1 ] )
				}
				
				window.addEventListener( 'message' , handle )
				
				sandbox.contentWindow.postMessage( command , '*' )

			} ) ) )()

		}
		
		@ $mol_mem
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
			return Object.keys( this.meta().samples ).sort( $mol_compare_text( sample => this.sample_title( sample ) ) )
		}
		
		@ $mol_mem
		samples( next? : string[] ) : string[] {
			const arg = $mol_state_arg.value( this.state_key( 'sample' ) , next && next.join( '~' ) ) as string
			const all = this.samples_all()
			return arg ? arg.split( '~' ).sort().filter( name => all.indexOf( name ) >= 0 ) : []
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
		result_sample( sample_id : string )  {

			const result : { [ key : string ] : any } = {
				sample : this.sample_title( sample_id ) ,
			}
			
			this.steps().forEach( step => {
				result[ step ] = this.command_result<string>([ step , sample_id, this.param_dict() ]).valueOf()
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
		sandbox_title() : string {

			const command = this.command_last()
			
			if( !command ) return super.sandbox_title()
			if( command[0] === 'meta' ) return super.sandbox_title()
			
			return `${ this.sample_title( command[1] ) }: ${ this.step_title( command[0] ) }`
		}

		result_col_title( col_id : string ) {
			if( col_id === 'sample' ) return this.result_col_title_sample()
			return this.step_title( col_id ).join(' ')
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
