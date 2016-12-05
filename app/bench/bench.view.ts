namespace $.$mol {
	
	export class $mol_app_bench extends $.$mol_app_bench {
		
		@ $mol_mem()
		bench( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'bench' ) , next ) || 'list'
		}
		
		@ $mol_mem()
		sandbox( next? : HTMLIFrameElement , force? : $mol_atom_force ) : HTMLIFrameElement {
			const next2 = this.tester().DOMNode() as HTMLIFrameElement
			
			next2.src = this.bench()
			
			next2.onload = event => {
				next2.onload = null
				this.sandbox( next2 , $mol_atom_force )
			}
			
			throw new $mol_atom_wait( `Loading sandbox...` )
		}
		
		'commandCurrent()' : any[]
		
		@ $mol_mem()
		commandCurrent( next? : any[] , force? : $mol_atom_force ) {
			if( this['commandCurrent()'] ) return
			return next
		}
		
		@ $mol_mem_key()
		commandResult< Result >( command : any[] , next? : Result ) : Result {
			const sandbox = this.sandbox()
			
			if( next !== void 0 ) return next
			
			const current = this.commandCurrent( command )
			if( current !== command ) throw new $mol_atom_wait( `Waiting for ${ JSON.stringify( current ) }...` )
				
			sandbox.contentWindow.postMessage( command , '*' )
				
			window.onmessage = event => {
				if( event.data[0] !== 'done' ) return
				window.onmessage = null
				
				this.commandCurrent( null , $mol_atom_force )
				this.commandResult( command , event.data[1] )
			}
			
			throw new $mol_atom_wait( `Running ${ command }...` )
		}
		
		meta() {
			type meta = {
				title : { [ lang : string ] : string }
				descr : { [ lang : string ] : string }
				samples : { [ step : string ] : {
					title : { [ lang : string ] : string }
				} }
				steps : { [ step : string ] : {
					title : { [ lang : string ] : string }
				} }
			}
			return this.commandResult< meta >( [ 'meta' ] )
		}
		
		@ $mol_mem()
		samplesAll( next? : string[] ) {
			return Object.keys( this.meta().samples ).sort()
		}
		
		@ $mol_mem()
		samples( next? : string[] ) : string[] {
			const arg = $mol_state_arg.value( this.stateKey( 'sample' ) , next && next.join( '~' ) )
			return arg ? arg.split( '~' ).sort() : []
		}
		
		@ $mol_mem()
		steps( next? : string[] ) {
			return Object.keys( this.meta().steps )
		}
		
		@ $mol_mem()
		title() {
			const title = this.meta().title 
			return title[ $mol_locale.lang() ] || title[ 'en' ] || super.title()
		}
		
		@ $mol_mem()
		description() {
			const descr = this.meta().descr
			return descr[ $mol_locale.lang() ] || descr[ 'en' ] || ''
		}
		
		@ $mol_mem_key()
		resultsSample( sampleId : string )  {
			const results : { [ key : string ] : any } = {
				sample : sampleId ,
			}
			
			this.steps().forEach( step => {
				results[ step ] = this.commandResult<string>([ step , sampleId ])
			} )
			
			return results
		}
		
		@ $mol_mem()
		results() {
			const results : { [ sample : string ] : { [ step : string ] : any } } = {}
			
			this.samples().forEach( sample => {
				results[ sample ] = this.resultsSample( sample )
			} )
			
			return results
		}
		
		@ $mol_mem()
		resultsColSort( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'sort' ) , next )
		}
		
		menuOptions() {
			return this.samplesAll().map( sample => this.menuOptioner( sample ) )
		}
		
		menuOptionerTitle( sample : string ) {
			return sample
		}
		
		@ $mol_mem_key()
		menuOptionerChecked( sample : string , next? : boolean ) {
			if( next === void 0 ) return this.samples().indexOf( sample ) !== -1
			
			if( next ) this.samples( this.samples().concat( sample ) )
			else this.samples( this.samples().filter( s => s !== sample ) )
			
			return next
		}
		
	}
	
}
