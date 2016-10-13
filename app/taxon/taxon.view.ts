module $.$mol {
	
	export class $mol_app_taxon extends $.$mol_app_taxon {
		
		@ $mol_prop()
		node( path : number[] ) {
			return {
				name : $mol_stub_personName() ,
				age : Math.ceil( Math.random() * 50 ) ,
				sex : $mol_stub_selectRandom([ 'male' , 'female' ]) ,
				sexPrefer : $mol_stub_selectRandom([ 'male' , 'female' ]) ,
				birthDay : $mol_stub_time( - 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				birthCity : $mol_stub_city() ,
				deathDay : $mol_stub_time( 60 * 24 * 365 * 50 ).toString( 'YYYY-MM-DD' ) ,
				deatchCity : $mol_stub_city() ,
				cityWork : $mol_stub_city() ,
				company : $mol_stub_companyName() ,
			}
		}
		
		@ $mol_prop()
		pathsSub( path : number[] ) : number[][] {
			if( path.length > 3 ) return <number[][]>[]
			return <number[][]> new $mol_range_lazy( {
				length : 10 ,
				get : ( row : number ) => <number[]> [ ...path , row + 1 ]
			} ).valueOf()
		}
		
		pathRoot() : number[] {
			return []
		}
		
		@ $mol_prop()
		pathsAll() {
			const next : number[][] = []
			
			const add = ( path : number[] )=> {
				next.push( path )
				if( this.rowExpanded( path ) ) {
					this.pathsSub( path ).forEach( path => add( path ) )
				}
			}
			
			this.pathsSub( this.pathRoot() ).forEach( path => add( path ) )
			
			return next
		}
		
		@ $mol_prop()
		gridRows() {
			const paths = this.pathsAll()
			return new $mol_range_lazy( {
				length : paths.length ,
				get : index => this.rower( paths[ index ] ) ,
			} )
		}
		
		@ $mol_prop()
		headCells() {
			return this.rowCells( this.pathRoot() )
		}
		
		@ $mol_prop()
		rowCells( path : number[] ) {
			const next : $mol_viewer[] = []
			//next.push( this.cellerPath( path ) )
			next.push( this.cellerBranch( path ) )
			const node = this.node( path )
			for( let name in node ) {
				if( name === 'name' ) continue
				if( typeof (<any>node)[ name ] === 'number' ) {
					next.push( this.cellerNumber({ path , field : name }) )
				} else {
					next.push( this.cellerText({ path , field : name }) )
				}
			}
			return next
		}
		
		pathView( path : number[] ) {
			if( path.length == 0 ) return 'name'
			
			return path.join( '.' )
		}
		
		rowLevel( path : number[] ) {
			return path.length
		}
		
		rowTitle( path : number[] ) {
			if( path.length == 0 ) return 'name'
			
			return this.node( path ).name
		}
		
		cellText( id : { path : number[] , field : string } ) {
			if( id.path.length == 0 ) return [ id.field ]
			
			const node : any = this.node( id.path )
			return [ `${ node[ id.field ] }` ]
		}
		
		cellNumber( id : { path : number[] , field : string } ) {
			if( id.path.length == 0 ) return [ id.field ]
			
			const node : any = this.node( id.path )
			return [ `${ node[ id.field ] }` ]
		}
		
		rowExpanded( path : number[] , ...diff : boolean[] ) {
			if( !this.pathsSub( path ).length ) return null
			
			const key = `rowExpanded(${ JSON.stringify( path ) })`
			const next = $mol_state_session.value( key , ...diff )
			
			return ( next === null ) ? true : next
		}
		
	}
	
	export class $mol_app_taxon_branch extends $.$mol_app_taxon_branch {
		
		levelStyle() {
			return `${ this.level() * 2 }rem`
		}
		
		expandable() {
			return this.expanded() !== null
		}
		
	}
	
}
