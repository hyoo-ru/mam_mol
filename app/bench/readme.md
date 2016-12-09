# $mol_app_bench

Common benchmarking interface, that can be added to any of benchmarks.

# Known benchmarks

* [list](list) - Rendering of lists by frameworks ([online](http://eigenmethod.github.io/mol/app/bench/#bench=list#sort=fill#))
* [geometry](geometry) - Rendering of simple geometry by graphics libraries ([online](http://eigenmethod.github.io/mol/app/bench/#bench=geometry#sort=render#))

# Create your benchmark

Benchmark is html page, opened in iframe, and communicates with $mol_app_bench by RPC.
 
Benchmark must receive messages as array of values. First value is procedure name. Other values is procedure arguments.

```js
window.addEventListener( 'message' , function( event ) {
	window[ event.data[0] ].apply( null , event.data.slice( 1 ) )
} )
```

To return result, benchmark must send message to parent frame.

```js
function done( result ) {
	if( parent === window ) console.log( result )
	else parent.postMessage( [ 'done' , result ] , '*' )
}
```

At start $mol_app_bench sends ```[ 'meta' ]``` to get benchmark meta information in this format:

```ts
type meta = {
	title : { [ lang : string ] : string }
	descr : { [ lang : string ] : string }
	samples : { [ sample : string ] : {
		title : { [ lang : string ] : string }
	} }
	steps : { [ step : string ] : { 
		title : { [ lang : string ] : string }
	} }
}
```

Description supports markdown. For every sample and step benchmark will receive message ```[ step , sample ]```.

Deploy benchmark to web server. In example: ```//localhost:8080/mol/app/bench/geometry/```

Open [$mol_app_bench](http://eigenmethod.github.io/mol/app/bench/) and type in developer console command like this to switch to your benchmark:

```
$mol_app_bench.root(0).bench( '//localhost:8080/mol/app/bench/geometry/' )
```
