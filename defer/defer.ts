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
		static timer = null as any
		
		static scheduleNative : ( handler : ()=> void ) => any = ( typeof requestAnimationFrame == 'function' )
			? handler => requestAnimationFrame( handler )
			: handler => setTimeout( handler , 16 )
		
		static schedule() {
			if( this.timer ) return
			
			this.timer = this.scheduleNative( ()=> {
				this.timer = null
				this.run()
			} )
		}
		
		static unschedule() {
			if( !this.timer ) return
			
			cancelAnimationFrame( this.timer )
			this.timer = null
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
			for( var defer : $mol_defer | undefined ; defer = this.all.shift() ; ) defer.run()
			//this.unschedule()
		}
		
	}

}
