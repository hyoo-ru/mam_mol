namespace $.$mol {
	
	export class $mol_app_bench extends $.$mol_app_bench {
		
		@ $mol_mem()
		bench( next? : string , prev? : string ) {
			return $mol_state_arg.value( this.stateKey( 'bench' ) , next , prev ) || 'list'
		}
		
		@ $mol_mem()
		sandbox( next? : HTMLIFrameElement , prev? : HTMLIFrameElement ) : HTMLIFrameElement {
			const next2 = this.tester().DOMNode() as HTMLIFrameElement
			
			next2.src = this.bench()
			
			next2.onload = event => {
				next2.onload = null
				this.sandbox( void 0 , next2 )
			}
			
			throw new $mol_atom_wait( `Loading sandbox...` )
		}
		
		'commandCurrent()' : any[]
		
		@ $mol_mem()
		commandCurrent( next? : any[] , prev? : any[] ) {
			if( this['commandCurrent()'] ) return
			return next
		}
		
		@ $mol_mem_key()
		commandResult< Result >( command : any[] , next? : Result , prev? : Result ) : Result {
			const sandbox = this.sandbox()
			
			if( next !== void 0 ) return next
			
			const current = this.commandCurrent( command )
			if( current !== command ) throw new $mol_atom_wait( `Waiting for ${ JSON.stringify( current ) }...` )
				
			sandbox.contentWindow.postMessage( command , '*' )
				
			window.onmessage = event => {
				if( event.data[0] !== 'done' ) return
				window.onmessage = null
				
				this.commandCurrent( void 0 , null )
				this.commandResult( command , event.data[1] )
			}
			
			throw new $mol_atom_wait( `Running ${ command }...` )
		}
		
		samplesAll( next? : string[] , prev? : string[] ) {
			return this.commandResult<string[]>( [ 'samples' ] ).slice().sort()
		}
		
		@ $mol_mem()
		samples( next? : string[] , prev? : string[] ) : string[] {
			const arg = $mol_state_arg.value( this.stateKey( 'sample' ) , next && next.join( '~' ) )
			return arg ? arg.split( '~' ).sort() : []
		}
		
		@ $mol_mem()
		steps( next? : string[] , prev? : string[] ) {
			return this.commandResult<string[]>( [ 'steps' ] ) as string[]
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
		results()  {
			const results : { [ sample : string ] : { [ step : string ] : any } } = {}
			
			this.samples().forEach( sample => {
				results[ sample ] = this.resultsSample( sample )
			} )
			
			return results
		}
		
		menuOptions() {
			return this.samplesAll().map( sample => this.menuOptioner( sample ) )
		}
		
		menuOptionerTitle( sample : string ) {
			return sample
		}
		
		@ $mol_mem_key()
		menuOptionerChecked( sample : string , next? : boolean , prev? : boolean ) {
			if( next === void 0 ) return this.samples().indexOf( sample ) !== -1
			
			if( next ) this.samples( this.samples().concat( sample ) )
			else this.samples( this.samples().filter( s => s !== sample ) )
			
			return next
		}
		
		griderCeller( id : { row : string , col : string } ) {
			if( id.col === 'sample' ) return this.resulter().cellerText( id )
			return this.resulterCellerNumber( id )
		}
		
		resultValue( id : { row : string , col : string } ) {
			return this.results()[ id.row ][ id.col ]
		}
		
		resultNumber( id : { row : string , col : string } ) {
			return parseInt( this.resultValue( id ) , 10 )
		}
		
		@ $mol_mem_key()
		resultMaxValue( col : string ) {
			let max = 0
			
			const results = this.results()
			for( let sample in results ) {
				const numb = this.resultNumber({ row : sample , col })
				if( numb > max ) max = numb
			}
			
			return max
		}
		
		resultPortion( id : { row : string , col : string } ) {
			return this.resultNumber( id ) / this.resultMaxValue( id.col )
		}
	}
	
}
