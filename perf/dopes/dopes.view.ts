namespace $.$$ {

	function rand( max : number ) {
		return Math.floor( Math.random() * max )
	}

	type $mol_perf_dopes_info = {
		left : number
		top : number
		angle : number
		color : string
	}

	export class $mol_perf_dopes extends $.$mol_perf_dopes {

		@ $mol_mem
		started( next = false ) { return next }

		@ $mol_mem
		started_once( next = false ) { return next }

		@ $mol_mem
		data( next = [] as $mol_perf_dopes_info[] ) {
			return next
		}

		@ $mol_mem
		labels() {
			return this.data().map( ( _ , index )=> this.Label( index ) )
		}

		@ $mol_mem
		sub() {
			return [
				... this.started_once() ? [ this.Speed() ] : [] ,
				... this.started() ? [ this.Stop() ] : [ this.Start() ] ,
				this.Labels() ,
			]
		}

		@ $mol_mem
		clock( next = 0 ) : number {
			
			if( this.started() ) setImmediate( ()=> {
				
				let data = this.data().slice()
				
				const label : $mol_perf_dopes_info = {
					left : rand( window.innerWidth ),
					top : rand( window.innerHeight ),
					angle : rand( 360 ),
					color : `rgb(${rand(255)},${rand(255)},${rand(255)})`,
				}

				const index = next % 600

				data[ index ] = this.label_state( index , label )
				
				this.data( data )

				this.clock( next + 1 )
			})
			
			return next
		}

		start() {
			this.started( true )
			this.started_once( true )
			this._begin_time = Date.now()
			this._begin_clock = this.clock()
		}

		stop() {
			this.started( false )
		}

		_begin_clock = 0
		_begin_time = 0

		_speed_total = 0
		_speed_count = 0

		@ $mol_mem
		speed() : string {

			const clock = this.clock()
			const time = Date.now()
			const dur = time - this._begin_time
			
			if( !this.started() ) {
				if( this.started_once() ) {
					const speed = this._speed_total / this._speed_count
					return super.speed().replace( '{speed}' , speed.toFixed(2) ) + ' (AVG)'
				}
			}

			if( dur > 500 ) {
				const speed = ( clock - this._begin_clock ) / dur * 1000
				this._speed_total += speed
				this._speed_count += 1
				this._begin_time = time
				this._begin_clock = clock
				return super.speed().replace( '{speed}' , speed.toFixed(2) )
			} else {
				return $mol_mem_cached( ()=> this.speed() ) ?? 'Warming up..'
			}

		}

		@ $mol_mem_key
		label_state( index : number , next = {
			left : 0 ,
			top : 0 ,
			angle : 0 ,
			color : '' ,
		} ) {
			return next
		}

		label_color( index : number ) {
			return this.label_state( index ).color
		}

		label_transform( index : number ) {
			const label = this.label_state( index )
			return `translate(${label.left}px,${label.top}px) rotate(${label.angle}deg) translate(-50%,-50%)`
		}

	}

}
