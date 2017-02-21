# $mol_app_bench

Common benchmarking interface, that can be added to any of benchmarks.

## Known benchmarks

* [list](list) - Rendering of lists by frameworks ([online](http://eigenmethod.github.io/mol/app/bench/#bench=list%2F#sort=fill#))
* [elements](elemnts) - Rendering of HTML elements ([online](http://eigenmethod.github.io/mol/app/bench/#bench=elements%2F#sample=audio~button~details~div~fieldset~hr~img~input~keygen~marquee~meter~object~optgroup~q~select~style~textarea~video#sort=fill#))
* [geometry](geometry) - Rendering of simple geometry by graphics libraries ([online](http://eigenmethod.github.io/mol/app/bench/#bench=geometry%2F#sort=render#))
* [todomvc](https://github.com/eigenmethod/todomvc/tree/master/benchmark) - ToDoMVC workflow by frameworks ([online](http://eigenmethod.github.io/mol/app/bench/#bench=http:%2F%2Feigenmethod.github.io%2Ftodomvc%2Fbenchmark%2F#sample=angular2%7Eangularjs%7Eknockoutjs%7Emol%7Epolymer%7Ereact-alt%7Evanillajs%7Evue#sort=fill#)) 

## Create your benchmark

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

## Articles

- [$mol_app_bench: готовим JS бенчмарки быстро и просто](https://habrahabr.ru/post/322162/)
