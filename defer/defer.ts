class $mol_defer extends $mol_object {
	
	constructor( public run : ()=> void ) {
		super()
		$mol_defer.add( this )
	}
	
	destroyed( ...diff : boolean[] ) {
		if( diff[0] ) $mol_defer.drop( this )
		return super.destroyed( ...diff )
	}
	
	static all : $mol_defer[] = []
	static scheduled = false
	
	static nativeSchedule : () => void
	
	static schedule() {
		if( this.scheduled ) return
		this.scheduled = true
		
		this.nativeSchedule()
	}
	
	static onSchedule() {
		this.scheduled = false
		this.run()
	}
	
	static add( defer : $mol_defer ) {
		this.all.push( defer )
		this.schedule()
	}
	
	static drop( defer : $mol_defer ) {
		var index = this.all.indexOf( defer )
		if( index >= 0 ) this.all.splice( index , 1 )
	}
	
	static run() {
		if( this.all.length === 0 ) return
		this.schedule()
		for( var defer ; defer = this.all.pop() ; ) defer.run()
	}
	
}

switch( 'function' ) {
	
	case typeof setImmediate :
		$mol_defer.nativeSchedule = ()=> setImmediate( ()=> $mol_defer.onSchedule() )
		break
	
	case typeof postMessage :
		addEventListener( 'message' , event => {
			if( event.data !== '$mol_defer' ) return
			$mol_defer.onSchedule()
		} )
		$mol_defer.nativeSchedule = () => postMessage( '$mol_defer' , '*' )
		break
	
	default:
		$mol_defer.nativeSchedule = () => setTimeout( ()=> $mol_defer.onSchedule() )
		break
}
