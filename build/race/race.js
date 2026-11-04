const fs = require( 'fs' )

const [ file, url, mode = 'stale', runs = '25' ] = process.argv.slice( 2 )
if( !file || !url ) {
	console.log( 'node mol/build/race/race.js <file.ts> <audit url> [stale|swap|stuck] [runs]' )
	process.exit( 1 )
}

const good = fs.readFileSync( file, 'utf8' )
const bad = good + '\nnamespace $ { const race_wrong: number = "race" }\n'
const one = good + '\nnamespace $ { const race_one: number = "one" }\n'
const two = good + '\nnamespace $ { const race_two: string = 2 }\n'

const one_error = /'string' is not assignable to type 'number'/
const two_error = /'number' is not assignable to type 'string'/

const sleep = ms => new Promise( done => setTimeout( done, ms ) )
const audit = ()=> fetch( url ).then( res => res.text() )
const failed = text => /fail/i.test( text ) && /TS\d+/.test( text )

async function race( from, to ) {
	fs.writeFileSync( file, from )
	await sleep( 550 )
	const first = audit()
	await sleep( Math.random() * 900 )
	fs.writeFileSync( file, to )
	await first
	await sleep( 3000 )
	return audit()
}

const modes = {

	async stale() {
		let stale = 0
		for( let i = 0; i < Number( runs ); ++i ) {
			const text = await race( bad, good )
			if( failed( text ) ) ++stale
			console.log( i, failed( text ) ? 'stale error' : 'ok' )
		}
		console.log( 'stale', stale, 'of', runs )
	},

	async swap() {
		let right = 0
		for( let i = 0; i < Number( runs ); ++i ) {
			const text = await race( one, two )
			const ok = two_error.test( text ) && !one_error.test( text )
			if( ok ) ++right
			console.log( i, ok ? 'ok' : 'wrong', one_error.test( text ) ? 'has one' : '', two_error.test( text ) ? 'has two' : 'no two' )
			fs.writeFileSync( file, good )
			await sleep( 1500 )
		}
		console.log( 'right', right, 'of', runs )
	},

	async stuck() {
		for( let i = 0; i < Number( runs ); ++i ) {
			if( !failed( await race( bad, good ) ) ) continue
			for( const wait of [ 5000, 10000 ] ) {
				await sleep( wait )
				console.log( 'stuck', i, 'after', wait, failed( await audit() ) ? 'still error' : 'recovered' )
			}
			return
		}
		console.log( 'not stuck in', runs )
	},

}

async function main() {
	await audit()
	await modes[ mode ]()
}

main().finally( ()=> fs.writeFileSync( file, good ) )
