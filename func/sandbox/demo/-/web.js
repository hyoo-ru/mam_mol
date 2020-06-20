function require( path ){ return $node[ path ] };
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var globalThis = globalThis || global || self || this
var $ = ( typeof module === 'object' ) ? Object.setPrototypeOf( module['export'+'s'] , globalThis ) : globalThis
$.$$ = $
$.$mol = $  // deprecated

;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../mol/" ) ] }; 
;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Error.stackTraceLimit = Infinity;
module.exports;
//mol.js.map
;

$node[ "../mol/mol" ] = $node[ "../mol/mol.js" ] = module.exports }.call( {} , {} )
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));
//context.web.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_func_sandbox {
        constructor(...contexts) {
            this.contexts = contexts;
        }
        static get make() {
            if (this._make)
                return this._make;
            const frame = $.$mol_dom_context.document.createElement('iframe');
            frame.style.display = 'none';
            $.$mol_dom_context.document.body.appendChild(frame);
            const win = frame.contentWindow;
            const SafeFunction = win.Function;
            win.eval(`

				var AsyncFunction = AsyncFunction || ( async function() {} ).constructor
				var GeneratorFunction = GeneratorFunction || ( function*() {} ).constructor

				Object.defineProperty( Function.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( AsyncFunction.prototype , 'constructor' , { value : undefined } )
				Object.defineProperty( GeneratorFunction.prototype , 'constructor' , { value : undefined } )

				for( const Class of [
					String , Number , BigInt , Boolean , Array , Object , Promise , Symbol , RegExp , 
					Error , RangeError , ReferenceError , SyntaxError , TypeError ,
					Function , AsyncFunction , GeneratorFunction ,
				] ) {
					Object.freeze( Class )
					Object.freeze( Class.prototype )
				}

				for( const key of Object.getOwnPropertyNames( window ) ) delete window[ key ]

			`);
            let context_default = {};
            function clean(obj) {
                for (let name of Object.getOwnPropertyNames(obj)) {
                    context_default[name] = undefined;
                }
                const proto = Object.getPrototypeOf(obj);
                if (proto)
                    clean(proto);
            }
            clean(win);
            return this._make = ((...contexts) => {
                const context_merged = {};
                for (let context of contexts) {
                    for (let name of Object.getOwnPropertyNames(context)) {
                        context_merged[name] = context[name];
                    }
                }
                const vars = Object.keys(context_merged);
                const values = vars.map(name => context_merged[name]);
                return (code) => new SafeFunction(...vars, '"use strict";' + code).bind(null, ...values);
            }).bind(null, context_default);
        }
        get eval() {
            if (this._eval)
                return this._eval;
            return this._eval = $mol_func_sandbox.make(...this.contexts);
        }
    }
    $.$mol_func_sandbox = $mol_func_sandbox;
})($ || ($ = {}));
//sandbox.js.map

//# sourceMappingURL=web.js.map
