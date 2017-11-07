namespace $ {
	
	export class $mol_defer extends $mol_object {
		
		constructor( public run : ()=> void ) {
			super()
			$mol_defer.add( this )
		}
		
		destructor() {
			$mol_defer.drop( this )
		}
		
		static all : $mol_defer[] = []
		static timer = 0
		
		static scheduleNative : ( handler : ()=> void ) => number = ( typeof requestAnimationFrame == 'function' )
			? handler => requestAnimationFrame( handler )
			: handler => setTimeout( handler , 16 )
		
		static schedule() {
			if( this.timer ) return
			
			this.timer = this.scheduleNative( ()=> {
				this.timer = 0
				this.run()
			} )
		}
		
		static unschedule() {
			if( !this.timer ) return
			
			cancelAnimationFrame( this.timer )
			this.timer = 0
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
			for( var defer : $mol_defer ; defer = this.all.shift() ; ) defer.run()
			//this.unschedule()
		}
		
	}

}
