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
		
		_taskActive : $mol_atom<any>
		
		@ $mol_mem_key()
		commandResult< Result >( command : any[] , next? : number , prev? : number ) : Result {
			const task = $mol_atom_task( ()=> {
				if( this._taskActive && ( this._taskActive !== task ) ) this._taskActive.get().valueOf()
				this._taskActive = task
				
				const sandbox = this.sandbox()
				sandbox.contentWindow.postMessage( command , '*' )
				
				window.onmessage = event => {
					if( event.data[0] !== 'done' ) return
					window.onmessage = null
					
					this.commandResult( command , void 0 , event.data[1] )
					this._taskActive = null
					task.push( true )
				}
				
				throw new $mol_atom_wait( `Running ${ command }...` )
			} )
			
			throw new $mol_atom_wait( `Running ${ command }...` )
		}
		
		samplesAll( next? : string[] , prev? : string[] ) {
			return this.commandResult<string[]>( [ 'get samples' ] ).slice().sort()
		}
		
		samples( next? : string[] , prev? : string[] ) {
			const arg = $mol_state_arg.value( this.stateKey( 'sample' ) , next && next.join( '~' ) )
			return arg ? arg.split( '~' ).sort() : []
		}
		
		steps( next? : string[] , prev? : string[] ) {
			return this.commandResult<string[]>( [ 'get steps' ] ).valueOf() as string[]
		}
		
		@ $mol_mem()
		resultsSample( sampleId : string )  {
			const results : { [ key : string ] : any } = {
				sample : sampleId ,
			}
			
			this.steps().forEach( step => {
				results[ step ] = this.commandResult<number>([ step , sampleId ]).valueOf()
			} )
			
			return results
		}
		
		@ $mol_mem()
		results()  {
			const results : { [ key : string ] : any }[] = []
			
			this.samples().forEach( sample => {
				results.push( this.resultsSample( sample ).valueOf() )
			} )
			
			return results
		}
		
		menuOptions() {
			return this.samplesAll().map( sample => this.menuOptioner( sample ) )
		}
		
		menuOptionerTitle( sample : string ) {
			return sample
		}
		
		@ $mol_mem()
		menuOptionerChecked( sample : string , next? : boolean , prev? : boolean ) {
			if( next === void 0 ) return this.samples().indexOf( sample ) !== -1
			
			if( next ) this.samples( this.samples().concat( sample ) )
			else this.samples( this.samples().filter( s => s !== sample ) )
			
			return next
		}
		
		griderCeller( id : { row : number , col : string } ) {
			if( id.col === 'sample' ) return this.resulter().cellerText( id )
			return this.resulterCellerNumber( id )
		}
		
		resultValue( id : { row : number , col : string } ) {
			return this.results()[ id.row ][ id.col ]
		}
		
		resultMaxValue( col : string ) {
			let max = 0
			this.results().forEach( measure => {
				if( measure[ col ] > max ) max = measure[ col ]
			} )
			return max
		}
		
		resultPortion( id : { row : number , col : string } ) {
			return this.resultValue( id ) / this.resultMaxValue( id.col )
		}
	}
	
}
