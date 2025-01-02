namespace $ {
	
	export class Atom< Input = never, Output = unknown > extends Object {
		
		static Track = null as null | Atom< any, any >
		static Index = 0
		static Timer = 0
		
		static _plan: any
		static plan() {
			if( this._plan ) return
			
			this._plan = requestAnimationFrame( ()=> {
				this._plan = null
				this.sync()
			} )
			
		}
		
		static queue = [] as Atom< any, any >[]
		static sync() {
			for( const root of this.queue ) root.fresh()
			this.queue.length = 0
		}
		
		constructor(
			name: string,
			public task: ( next?: Input )=> Output
		) {
			super()
			this[ Symbol.toStringTag ] = name
		}
		
		hold = undefined as undefined | Output | Promise< any > | Error
		cond = '🔴' as '🔴' | '🔵' | '🟢'
		time = -1
		
		pubs = [] as Atom< any, any >[]
		subs = [] as WeakRef< Atom< any, any > >[]
		
		sync(): Awaited< Output > {
			
			if( Atom.Track ) {
				
				if( this.cond === '🔵' ) throw new Error( 'Cycle' )
				
				Atom.Track.pubs[ Atom.Index ++ ] = this
				this.subs.push( new WeakRef( Atom.Track ) )
				
			}
			
			this.fresh()
			
			if( this.hold instanceof Error ) throw this.hold
			if( this.hold instanceof Promise ) throw this.hold
			
			return this.hold as any
		}
		
		async async(): Promise< Awaited< Output > > {
			
			while( true ) {
				
				this.fresh()
				
				if( this.hold instanceof Error ) throw this.hold
				if( this.hold instanceof Promise ) await this.hold
				
				return this.hold
			}
			
		}
		
		fresh() {
			
			if( this.cond !== '🔴' ) return this.time
			
			for( const pub of this.pubs ) {
				if( this.time < pub.fresh() ) return this.refresh()
			}
			
			if( this.pubs.length === 0 ) return this.refresh()
			
			this.cond = '🟢'
			return this.time
			
		}
		
		refresh() {
			
			const track = Atom.Track
			const index = Atom.Index
			
			try {
				
				Atom.Track = this
				Atom.Index = 0
				
				this.cond = '🔵'
				
				let val = this.task() as Output | Promise<any>
				if( val instanceof Promise ) {
					const put = this.put.bind( this )
					val = val.then( put, put )
				}
				
				this.put( val )
				
				while( Atom.Index < this.pubs.length ) this.pubs.pop()
				
			} catch( cause: any ) {
				
				if( cause instanceof Promise ) {
					cause = cause.finally( this.stale.bind( this ) )
				}
				
				this.put( cause )
				
			} finally {
				
				Atom.Track = track
				Atom.Index = index
				
			}

			return this.time
		}
		
		set( next: Input ) {
			this.put( this.task( next ) )
		}
		
		put( next: undefined | Output | Promise< any > | Error ) {
			
			if( this.hold !== next && !$mol_compare_deep( this.hold, next ) ) {
				this.time = ++ Atom.Timer
				if( this.cond !== '🔵' ) this.notify()
			}
			
			this.cond = '🟢'
			this.hold = next
			
		}
		
		stale() {
			if( this.cond === '🔴' ) return
			this.cond = '🔴'
			this.notify()
		}
		
		notify() {
			if( this.subs.length ) {
				for( const sub of this.subs ) sub.deref()?.stale()
				this.subs.length = 0
			} else {
				Atom.plan()
				Atom.queue.push( this )
			}
		}
		
	}
	
}
