import { inc } from '../cjs/cjs.js'

export function twice( value: number ) {
	return inc( inc( value ) )
}
