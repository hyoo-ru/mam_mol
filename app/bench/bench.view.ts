namespace $.$mol {
	
	export class $mol_app_bench extends $.$mol_app_bench {
		
		data( count : number ) {
			const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]
			const colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]
			const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]
			return new $mol_range_lazy({
				length : count ,
				item : id => ({
					id: id ,
					label: $mol_stub_selectRandom(adjectives) + " " + $mol_stub_selectRandom(colours) + " " + $mol_stub_selectRandom(nouns) ,
				})
			}).valueOf()
		}
		
		eventRun() {
			return this.sampleIds().map( id => {
				this.measureInit( id , null )
				this.measureFill( { sample : id , count : 100 } , null )
				this.measureFill( { sample : id , count : 1000 } , null )
				this.measureFill( { sample : id , count : 10000 } , null )
				this.measureFill( { sample : id , count : 0 } , null )
			} )
		}
		
		@ $mol_mem()
		sandbox() {
			return this.tester().DOMNode() as HTMLIFrameElement
		}
		
		@ $mol_mem_key()
		measureInit( sampleId : string , next? : number , prev? : number ) : number {
			const sandbox = this.sandbox()
			sandbox.src = this.sampleUri( sampleId )
			
			const start = Date.now()
			sandbox.onload = ()=> {
				this.measureInit( sampleId , void 0 , Date.now() - start )
				sandbox.onload = null
			}
			
			throw new $mol_atom_wait( 'Sample init...' )
		}
		
		@ $mol_mem_key()
		measureFill( config : { sample : string , count : number } , next? : number , prev? : number ) : number {
			
			this.measureInit( config.sample )
			
			requestAnimationFrame( ()=> {
				const sandbox = this.sandbox()
				
				sandbox.contentWindow.postMessage( [ 'setData' , this.data( config.count ) ] , '*' )
				
				const start = Date.now()
				setTimeout( () => {
					this.measureFill( config , void 0 , Date.now() - start )
				} )
			} )
			
			throw new $mol_atom_wait( 'Sample init...' )
		}
		
		@ $mol_mem()
		measure( sampleId : string )  {
			return {
				sample : sampleId ,
				init : this.measureInit( sampleId ).valueOf() ,
				fill_100 : this.measureFill({ sample : sampleId , count : 100 }).valueOf() ,
				fill_1K : this.measureFill({ sample : sampleId , count : 1000 }).valueOf() ,
				fill_10K : this.measureFill({ sample : sampleId , count : 10000 }).valueOf() ,
				clear : this.measureFill({ sample : sampleId , count : 0 }).valueOf() ,
			}
		}
		
		sampleUrisDefault() {
			return 'react'
		}
		
		sampleIds() {
			return ( $mol_state_arg.value( this.stateKey( 'sample' ) ) || this.sampleUrisDefault() )
			.split( '~' )
		}
		
		sampleUri( sampleId : string ) {
			return `list/${ sampleId }/`
		}
		
		@ $mol_mem()
		results()  {
			const next = this.sampleIds().map( id => this.measure( id ).valueOf() )
			this.sandbox().src = 'about:blank'
			return next
		}
		
		content() : $mol_viewer[] {
			return [ this.tester() , this.resulter() ]
		}
		
	}
	
}
