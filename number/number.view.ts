namespace $.$$ {

	/**
	 * Component for entering, incrementing and decrementing numeric values.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
	 */
	export class $mol_number extends $.$mol_number {
		
		value_limited( val? :  number ) : number {
			if (Number.isNaN( val )) return this.value( val )
			if ( val === undefined ) return this.value()

			const min = this.value_min()
			const max = this.value_max()

			if( val < min ) return this.value( min )
			if( val > max ) return this.value( max )
			
			return this.value( val )
		}

	 	override event_dec( next? : Event ) {
			this.value_limited( ( this.value_limited() || 0 ) - this.precision_change() )
		}

		override event_inc( next? : Event ) {
			this.value_limited( ( this.value_limited() || 0 ) + this.precision_change() )
		}

		round(val: number) {
			if (Number.isNaN(val)) return ''
			if( val === 0 ) return '0'
			if( !val ) return ''

			const precision_view = this.precision_view()

			if (! precision_view) return val.toFixed()

			if( precision_view >= 1 ) {
				return ( val / precision_view ).toFixed()
			} else {
				const fixed_number = Math.log10( 1 / precision_view )
				return val.toFixed( Math.ceil( fixed_number ) )
			}
		}

		@ $mol_mem
		override value_string( next? : string ): string {
			// Вытягиваем value
			// Если кто-то поменяет из вне value, value_string надо обновить
			const current = this.round( this.value_limited() )
			if (next === undefined) return current

			const precision = this.precision_view()

			// Точку в конце поставить нельзя, если precision_view целое число > 0
			if ( precision - Math.floor(precision) === 0 ) next = next.replace(/[.,]/g, '')

			// Запятые меняем на точки, удаляем не-цифры и не-точки и лишние ноли в начале целой части.
			// Минус получится ввести только в начале.
			next = (this.value_min() < 0 && next.startsWith('-') ? '-' : '')
				+ next.replace(/,/g, '.').replace(/[^\d\.]/g, '').replace(/^0{2,}/, '0')

			let dot_pos = next.indexOf('.')

			if (dot_pos !== -1) {
				const prev = $mol_wire_probe(() => this.value_string()) ?? ''
				const dot_pos_prev = prev.indexOf('.')
				// Определяем где относительно предыдущей точки юзер поставил новую
				if (dot_pos_prev === dot_pos) dot_pos = next.lastIndexOf('.')
				
				// Из частей до и после новой точки старую точку удаляем
				const frac = next.slice(dot_pos + 1).replace(/\./g, '')

				// Если точка идет первой, перед ней пишем 0, что бы форматирование выглядело нормально в mask
				next = (next.slice(0, dot_pos) || '0').replace(/\./g, '') + '.' + frac
			}

			// Оставляем старое значение в value есть сочетание, приводящие к NaN, например -.
			if ( Number.isNaN(Number(next)) ) return next

			if ( next.endsWith('.') ) return next
			if ( next.endsWith('-') ) return next

			// Если пустая строка - сетим NaN
			// Применяем округления.
			this.value_limited(Number(next || Number.NaN))

			// Возвращаем все-равно не нормализованное значение
			// Иначе нельзя ввести будет 10, если min/max 5..10
			return next
		}

		@ $mol_mem
		override dec_enabled() : boolean {
			return this.enabled() && (
				!( ( this.value() || 0 ) <= this.value_min() )
			)
		}

		@ $mol_mem
		override inc_enabled() : boolean {
			return this.enabled() && ( 
				!( ( this.value() || 0 ) >= this.value_max() )
			)
		}

	}
}
