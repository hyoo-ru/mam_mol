function require( path ){ return $node[ path ] };
"use strict";
//assert.test.js.map
;
"use strict";
//assert.js.map
;
"use strict";
//partial.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log(path, ...values) {
        if ($.$mol_log_filter() == null)
            return;
        path = String(path);
        if (path.indexOf($.$mol_log_filter()) === -1)
            return;
        const context = $.$mol_log_context();
        if (context)
            context();
        console.debug(path, ...values);
        if ($.$mol_log_debug() == null)
            return;
        if (path.indexOf($.$mol_log_debug()) === -1)
            return;
        debugger;
    }
    $.$mol_log = $mol_log;
})($ || ($ = {}));
//log.js.map
;
"use strict";
var $;
(function ($) {
    let context = null;
    function $mol_log_context(next = context) {
        return context = next;
    }
    $.$mol_log_context = $mol_log_context;
})($ || ($ = {}));
//log_context.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_debug(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_debug()');
            }
            else {
                sessionStorage.setItem('$mol_log_debug()', next);
            }
        }
        return sessionStorage.getItem('$mol_log_debug()');
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.web.js.map
;
"use strict";
var $;
(function ($) {
    let filter = undefined;
    $.$mol_log_filter = function $mol_log_filter(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_filter()');
            }
            else {
                sessionStorage.setItem('$mol_log_filter()', next);
            }
            filter = next;
        }
        if (filter !== undefined)
            return filter;
        return filter = sessionStorage.getItem('$mol_log_filter()');
    };
    if (typeof sessionStorage === 'undefined')
        $.$mol_log_filter = (next = null) => filter = next;
    if ($.$mol_log_filter() == null)
        console.info('Use $mol_log_filter( needle : string|null ) to toggle logs');
})($ || ($ = {}));
//log_filter.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_group(name, task) {
        const filter = $.$mol_log_filter();
        if (filter == null)
            return task;
        return function $mol_log_group_wrapper(...args) {
            let started = false;
            let prev = $.$mol_log_context();
            $.$mol_log_context(() => {
                if (prev)
                    prev();
                started = true;
                if (filter || prev)
                    console.group(name);
                else
                    console.groupCollapsed(name);
                $.$mol_log_context(prev = null);
            });
            try {
                return task.apply(this, args);
            }
            finally {
                if (started)
                    console.groupEnd();
                $.$mol_log_context(prev);
            }
        };
    }
    $.$mol_log_group = $mol_log_group;
})($ || ($ = {}));
//log_group.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//hidden.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push($_1.$mol_log_group(name, test));
        }
        $mol_test_schedule();
    }
    $_1.$mol_test = $mol_test;
    $_1.$mol_test_mocks = [];
    $_1.$mol_test_all = [];
    async function $mol_test_run() {
        for (var test of $_1.$mol_test_all) {
            let context = Object.create($$);
            for (let mock of $_1.$mol_test_mocks)
                await mock(context);
            await test(context);
        }
        console.info('$mol_test', $_1.$mol_test_all.length);
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout($_1.$mol_log_group('$mol_test', () => {
            scheduled = false;
            $mol_test_run();
        }));
    }
    $_1.$mol_test_schedule = $mol_test_schedule;
    $_1.$mol_test_mocks.push(context => {
        let seed = 0;
        context.Math = Object.create(Math);
        context.Math.random = () => Math.sin(seed++);
        const forbidden = ['XMLHttpRequest', 'fetch'];
        for (let api of forbidden) {
            context[api] = new Proxy(function () { }, {
                get() {
                    $_1.$mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $_1.$mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
            });
        }
    });
    $mol_test({
        'mocked Math.random'($) {
            console.assert($.Math.random() === 0);
            console.assert($.Math.random() === Math.sin(1));
        },
        'forbidden XMLHttpRequest'($) {
            try {
                console.assert(void new $.XMLHttpRequest);
            }
            catch (error) {
                console.assert(error.message === 'XMLHttpRequest is forbidden in tests');
            }
        },
        'forbidden fetch'($) {
            try {
                console.assert(void $.fetch(''));
            }
            catch (error) {
                console.assert(error.message === 'fetch is forbidden in tests');
            }
        },
    });
})($ || ($ = {}));
//test.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'objects by reference'() {
            $.$mol_assert_equal($.$mol_compare_any({}, {}), false);
        },
        'primitives by value'() {
            $.$mol_assert_equal($.$mol_compare_any('a', 'a'), true);
        },
        'NaN by value'() {
            $.$mol_assert_equal($.$mol_compare_any(Number.NaN, Number.NaN), true);
        },
        'NaN not equal zero'() {
            $.$mol_assert_equal($.$mol_compare_any(Number.NaN, 0), false);
        },
    });
})($ || ($ = {}));
//any.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_compare_any(a, b) {
        if (a === b)
            return true;
        if (!Number.isNaN(a))
            return false;
        if (!Number.isNaN(b))
            return false;
        return true;
    }
    $.$mol_compare_any = $mol_compare_any;
})($ || ($ = {}));
//any.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'return source when same object'() {
            const target = {};
            $.$mol_assert_equal($.$mol_conform(target, target), target);
        },
        'return target when some is not object'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(true, obj), true);
            $.$mol_assert_equal($.$mol_conform(obj, true), obj);
        },
        'return target when some is null'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(null, obj), null);
            $.$mol_assert_equal($.$mol_conform(obj, null), obj);
        },
        'return target when some is undefined'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(undefined, obj), undefined);
            $.$mol_assert_equal($.$mol_conform(obj, undefined), obj);
        },
        'return target when different keys count'() {
            const target = [1, 2, 3];
            const source = [1, 2, 3, undefined];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when array values are strong equal'() {
            const source = [1, 2, 3];
            $.$mol_assert_equal($.$mol_conform([1, 2, 3], source), source);
        },
        'return source when object values are strong equal'() {
            const source = { a: 1, b: 2 };
            $.$mol_assert_equal($.$mol_conform({ a: 1, b: 2 }, source), source);
        },
        'return target when some values are not equal'() {
            const target = [1, 2, 3];
            const source = [1, 2, 5];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when values are deep equal'() {
            const source = { foo: { bar: 1 } };
            $.$mol_assert_equal($.$mol_conform({ foo: { bar: 1 } }, source), source);
        },
        'return target with equal values from source and not equal from target'() {
            const source = { foo: { xxx: 1 }, bar: { xxx: 2 } };
            const target = { foo: { xxx: 1 }, bar: { xxx: 3 } };
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.foo, source.foo);
            $.$mol_assert_equal(result.bar, target.bar);
        },
        'return target when equal but with different class'() {
            const target = { '0': 1 };
            $.$mol_assert_equal($.$mol_conform(target, [1]), target);
        },
        'return target when conformer for class is not defined'() {
            const Obj = class {
            };
            const source = new Obj;
            const target = new Obj;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
        },
        'return target when has cyclic reference'() {
            const source = { foo: {} };
            source['self'] = source;
            const target = { foo: {} };
            target['self'] = target;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result['self'], target);
            $.$mol_assert_equal(result.foo, source.foo);
        },
        'return source when equal dates'() {
            const source = new Date(12345);
            const target = new Date(12345);
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return source when equal regular expressions'() {
            const source = /\x22/mig;
            const target = /\x22/mig;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return cached value if already conformed'() {
            const source = { foo: { xxx: 1 }, bar: { xxx: 3 } };
            const target = { foo: { xxx: 2 }, bar: { xxx: 3 } };
            const result = $.$mol_conform(target, source);
            target.foo.xxx = 1;
            $.$mol_assert_equal($.$mol_conform(target.foo, source.foo), target.foo);
        },
        'skip readlony fields'() {
            const source = { foo: {}, bar: {} };
            const target = { foo: {}, bar: {} };
            Object.defineProperty(target, 'bar', { value: {}, writable: false });
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.foo, source.foo);
            $.$mol_assert_equal(result.bar, target.bar);
        },
        'object with NaN'() {
            const source = { foo: Number.NaN };
            const target = { foo: Number.NaN };
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'array with NaN'() {
            const source = [Number.NaN];
            const target = [Number.NaN];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
    });
})($ || ($ = {}));
//conform.test.js.map
;
"use strict";
var $;
(function ($) {
    const cache = new WeakMap();
    $.$mol_conform_stack = [];
    function $mol_conform(target, source) {
        if ($.$mol_compare_any(target, source))
            return source;
        if (!target || typeof target !== 'object')
            return target;
        if (!source || typeof source !== 'object')
            return target;
        if (target instanceof Error)
            return target;
        if (source instanceof Error)
            return target;
        if (target['constructor'] !== source['constructor'])
            return target;
        if (cache.get(target))
            return target;
        cache.set(target, true);
        const conform = $.$mol_conform_handlers.get(target['constructor']);
        if (!conform)
            return target;
        if ($.$mol_conform_stack.indexOf(target) !== -1)
            return target;
        $.$mol_conform_stack.push(target);
        try {
            return conform(target, source);
        }
        finally {
            $.$mol_conform_stack.pop();
        }
    }
    $.$mol_conform = $mol_conform;
    $.$mol_conform_handlers = new WeakMap();
    function $mol_conform_handler(cl, handler) {
        $.$mol_conform_handlers.set(cl, handler);
    }
    $.$mol_conform_handler = $mol_conform_handler;
    function $mol_conform_array(target, source) {
        if (source.length !== target.length)
            return target;
        for (let i = 0; i < target.length; ++i) {
            if (!$.$mol_compare_any(source[i], target[i]))
                return target;
        }
        return source;
    }
    $mol_conform_handler(Array, $mol_conform_array);
    $mol_conform_handler(Uint8Array, $mol_conform_array);
    $mol_conform_handler(Uint16Array, $mol_conform_array);
    $mol_conform_handler(Uint32Array, $mol_conform_array);
    $mol_conform_handler(Object, (target, source) => {
        let count = 0;
        let equal = true;
        for (let key in target) {
            const conformed = $mol_conform(target[key], source[key]);
            if (conformed !== target[key]) {
                try {
                    target[key] = conformed;
                }
                catch (error) { }
                if (!$.$mol_compare_any(conformed, target[key]))
                    equal = false;
            }
            if (!$.$mol_compare_any(conformed, source[key]))
                equal = false;
            ++count;
        }
        for (let key in source)
            if (--count < 0)
                break;
        return (equal && count === 0) ? source : target;
    });
    $mol_conform_handler(Date, (target, source) => {
        if (target.getTime() === source.getTime())
            return source;
        return target;
    });
    $mol_conform_handler(RegExp, (target, source) => {
        if (target.toString() === source.toString())
            return source;
        return target;
    });
})($ || ($ = {}));
//conform.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'must be false'() {
            $.$mol_assert_not(0);
        },
        'must be true'() {
            $.$mol_assert_ok(1);
        },
        'two must be equal'() {
            $.$mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $.$mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $.$mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $.$mol_assert_unique([3], [3], [3]);
        },
        'two must be alike'() {
            $.$mol_assert_like([3], [3]);
        },
        'three must be alike'() {
            $.$mol_assert_like([3], [3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        $.$mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        $.$mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            if (!ErrorRight)
                return error;
            if (typeof ErrorRight === 'string') {
                if (error.message !== ErrorRight)
                    throw error;
            }
            else {
                if (!(error instanceof ErrorRight))
                    throw error;
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $.$mol_fail(new Error('Not failed'));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (Number.isNaN(args[i]) && Number.isNaN(args[j]))
                    continue;
                if (args[i] !== args[j])
                    $.$mol_fail(new Error(`Not equal\n${args[i]}\n${args[j]}`));
            }
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] === args[j] || (Number.isNaN(args[i]) && Number.isNaN(args[j]))) {
                    $.$mol_fail(new Error(`args[${i}] = args[${j}] = ${args[i]}`));
                }
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    function $mol_assert_like(head, ...tail) {
        for (let value of tail) {
            value = $.$mol_conform(value, head);
            if (Number.isNaN(value) && Number.isNaN(head))
                continue;
            if (head !== value)
                $.$mol_fail(new Error(`Not like\n${head}\n${value}`));
            head = value;
        }
    }
    $.$mol_assert_like = $mol_assert_like;
})($ || ($ = {}));
//assert.js.map
;
"use strict";
/** @jsx $mol_jsx_make */
var $;
(function ($) {
    $.$mol_test({
        'Make empty div'() {
            $.$mol_assert_equal(($.$mol_jsx_make("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $.$mol_jsx_make("input", { value: '123' });
            $.$mol_assert_equal(dom.outerHTML, '<input value="123">');
            $.$mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $.$mol_jsx_make("div", { classList: ['foo bar'] });
            $.$mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $.$mol_jsx_make("div", { style: { color: 'red' } });
            $.$mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $.$mol_jsx_make("div", { dataset: { foo: 'bar' } });
            $.$mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $.$mol_jsx_make("div", { hidden: true, lang: "ru" });
            $.$mol_assert_equal(dom.outerHTML, '<div hidden="" lang="ru"></div>');
        },
        'Define child nodes'() {
            const dom = $.$mol_jsx_make("div", null,
                "hello",
                $.$mol_jsx_make("strong", null, "world"),
                "!");
            $.$mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Function as component'() {
            const Button = ({ hint }, target) => {
                return $.$mol_jsx_make("button", { title: hint }, target());
            };
            const dom = $.$mol_jsx_make(Button, { id: "/foo", hint: "click me" }, () => 'hey!');
            $.$mol_assert_equal(dom.outerHTML, '<button title="click me" id="/foo">hey!</button>');
        },
        // 'Standart classes as component'() {
        // 	const dom = <HTMLButtonElement id="/foo" title="click me">hey!</HTMLButtonElement>
        // 	$mol_assert_equal( dom.outerHTML , '<button title="click me" id="/foo">hey!</button>' )
        // } ,
        'Nested guid generation'() {
            const Foo = () => {
                return $.$mol_jsx_make("div", null,
                    $.$mol_jsx_make(Bar, { id: "/bar" },
                        $.$mol_jsx_make("img", { id: "/icon" })));
            };
            const Bar = (props, icon) => {
                return $.$mol_jsx_make("span", null, icon);
            };
            const dom = $.$mol_jsx_make(Foo, { id: "/foo" });
            $.$mol_assert_equal(dom.outerHTML, '<div id="/foo"><span id="/foo/bar"><img id="/foo/icon"></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $.$mol_jsx_make("div", null,
                    $.$mol_jsx_make("span", { id: "/bar" }),
                    $.$mol_jsx_make("span", { id: "/bar" }));
            };
            $.$mol_assert_fail(() => $.$mol_jsx_make(App, { id: "/foo" }), 'JSX already has tag with id "/bar"');
        },
    });
})($ || ($ = {}));
//make.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_parse(text, type = 'application/xhtml+xml') {
        const parser = new $.$mol_dom_context.DOMParser();
        const doc = parser.parseFromString(text, type);
        const error = doc.getElementsByTagName('parsererror')[0];
        if (error)
            throw new Error(error.textContent);
        return doc;
    }
    $.$mol_dom_parse = $mol_dom_parse;
})($ || ($ = {}));
//parse.js.map
;
"use strict";
/** @jsx $mol_jsx_make */
var $;
(function ($) {
    $.$mol_test({
        'Attach to document'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            $.$mol_jsx_attach(doc, () => $.$mol_jsx_make("body", { id: "/foo" }, "bar"));
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
    });
})($ || ($ = {}));
//attach.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'run callback'() {
            let Plus1 = class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            };
            Plus1 = __decorate([
                $.$mol_class
            ], Plus1);
            $.$mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            let Plus1 = class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            };
            Plus1 = __decorate([
                $.$mol_class
            ], Plus1);
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $.$mol_assert_equal(obj.pow(2), 5);
        },
        'decorate instance method'() {
            let Plus1 = class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            };
            Plus1 = __decorate([
                $.$mol_class
            ], Plus1);
            class Foo1 {
                constructor() {
                    this.level = 2;
                }
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $.$mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            let Plus1 = class Plus1 extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            };
            Plus1 = __decorate([
                $.$mol_class
            ], Plus1);
            let Foo = class Foo {
                static pow(a) {
                    return a ** this.level;
                }
            };
            Foo.level = 2;
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            Foo = __decorate([
                $.$mol_class
            ], Foo);
            $.$mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            let BarInc = class BarInc extends $.$mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            };
            BarInc = __decorate([
                $.$mol_class
            ], BarInc);
            let Foo = class Foo {
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class,
                $.$mol_class
            ], Foo);
            $.$mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));
//wrapper.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    let $mol_wrapper = class $mol_wrapper extends $.$mol_object2 {
        static run(task) {
            return this.func(task)();
        }
        static func(func) {
            const wrapped = this.wrap(func);
            Object.defineProperty(wrapped, 'name', {
                value: `${func.name || '<anonymous>'}|${this.name}`
            });
            return wrapped;
        }
        static get class() {
            return (Class) => {
                const construct = (target, args) => new Class(...args);
                const handler = {
                    construct: this.func(construct)
                };
                handler[Symbol.toStringTag] = Class.name + '#';
                return new Proxy(Class, handler);
            };
        }
        static get method() {
            return (obj, name, descr) => {
                descr.value = this.func(descr.value);
                return descr;
            };
        }
    };
    $mol_wrapper = __decorate([
        $.$mol_class
    ], $mol_wrapper);
    $.$mol_wrapper = $mol_wrapper;
})($ || ($ = {}));
//wrapper.js.map
;
"use strict";
var $;
(function ($) {
    /// @todo right orderinng
    $.$mol_after_mock_queue = [];
    function $mol_after_mock_warp() {
        const queue = $.$mol_after_mock_queue.splice(0);
        for (const task of queue)
            task();
    }
    $.$mol_after_mock_warp = $mol_after_mock_warp;
    class $mol_after_mock_commmon extends $.$mol_object2 {
        constructor(task) {
            super();
            this.task = task;
            this.promise = Promise.resolve();
            this.cancelled = false;
            $.$mol_after_mock_queue.push(task);
        }
        destructor() {
            const index = $.$mol_after_mock_queue.indexOf(this.task);
            if (index >= 0)
                $.$mol_after_mock_queue.splice(index, 1);
        }
    }
    $.$mol_after_mock_commmon = $mol_after_mock_commmon;
    class $mol_after_mock_timeout extends $mol_after_mock_commmon {
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));
//mock.test.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push($ => {
        $.$mol_after_frame = $_1.$mol_after_mock_commmon;
    });
})($ || ($ = {}));
//frame.test.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $.$mol_object2 {
        constructor(task) {
            super();
            this.task = task;
            this.id = requestAnimationFrame(task);
        }
        destructor() {
            cancelAnimationFrame(this.id);
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));
//frame.web.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'trim array'() {
            const array = [undefined, null, 0, false, null, undefined, undefined];
            const correct = [undefined, null, 0, false, null];
            $.$mol_array_trim(array);
            $.$mol_assert_like(array, correct);
        }
    });
})($ || ($ = {}));
//trim.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_array_trim(array) {
        let last = array.length;
        while (last > 0) {
            --last;
            const value = array[last];
            if (value === undefined)
                array.pop();
            else
                break;
        }
        return array;
    }
    $.$mol_array_trim = $mol_array_trim;
})($ || ($ = {}));
//trim.js.map
;
"use strict";
var $;
(function ($_1) {
    $_1.$mol_test_mocks.push(async ($) => {
        await $_1.$mol_fiber_warp();
        $_1.$mol_fiber.deadline = Date.now() + 100;
    });
})($ || ($ = {}));
//fiber.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_fiber_1;
    function $mol_fiber_defer(calculate) {
        const fiber = new $mol_fiber;
        fiber.calculate = calculate;
        fiber[Symbol.toStringTag] = calculate.name;
        fiber.schedule();
        return fiber;
    }
    $.$mol_fiber_defer = $mol_fiber_defer;
    function $mol_fiber_func(calculate) {
        console.warn('$mol_fiber_func is deprecated. Use $mol_fiber.func instead.');
        return $mol_fiber.func(calculate);
    }
    $.$mol_fiber_func = $mol_fiber_func;
    function $mol_fiber_root(calculate) {
        const wrapper = function (...args) {
            const fiber = new $mol_fiber();
            fiber.calculate = calculate.bind(this, ...args);
            return fiber.wake();
        };
        wrapper[Symbol.toStringTag] = calculate.name;
        return wrapper;
    }
    $.$mol_fiber_root = $mol_fiber_root;
    function $mol_fiber_method(obj, name, descr) {
        console.warn('$mol_fiber_method is deprecated. Use $mol_fiber.method instead.');
        return $mol_fiber.method(obj, name, descr);
    }
    $.$mol_fiber_method = $mol_fiber_method;
    function $mol_fiber_sync(request) {
        return function $mol_fiber_sync_wrapper(...args) {
            const slave = $mol_fiber.current;
            let master = slave && slave.master;
            if (!master || master.constructor !== $mol_fiber) {
                master = new $mol_fiber;
                master.cursor = -3 /* persist */;
                master.error = request.call(this, ...args).then(res => master.push(res), err => master.fail(err));
                const prefix = slave ? `${slave}/${slave.cursor / 2}:` : '/';
                master[Symbol.toStringTag] = prefix + (request.name || $mol_fiber_sync.name);
            }
            return master.get();
        };
    }
    $.$mol_fiber_sync = $mol_fiber_sync;
    async function $mol_fiber_warp() {
        const deadline = $mol_fiber.deadline;
        try {
            $mol_fiber.deadline = Number.POSITIVE_INFINITY;
            while ($mol_fiber.queue.length)
                await $mol_fiber.tick();
            return Promise.resolve();
        }
        finally {
            $mol_fiber.deadline = deadline;
        }
    }
    $.$mol_fiber_warp = $mol_fiber_warp;
    function $mol_fiber_fence(func) {
        const prev = $mol_fiber.current;
        try {
            $mol_fiber.current = null;
            return func();
        }
        finally {
            $mol_fiber.current = prev;
        }
    }
    $.$mol_fiber_fence = $mol_fiber_fence;
    function $mol_fiber_unlimit(task) {
        const deadline = $mol_fiber.deadline;
        try {
            $mol_fiber.deadline = Number.POSITIVE_INFINITY;
            return task();
        }
        finally {
            $mol_fiber.deadline = deadline;
        }
    }
    $.$mol_fiber_unlimit = $mol_fiber_unlimit;
    let $mol_fiber_solid = class $mol_fiber_solid extends $.$mol_wrapper {
        static func(task) {
            function wrapped(...args) {
                const deadline = $mol_fiber.deadline;
                try {
                    $mol_fiber.deadline = Number.POSITIVE_INFINITY;
                    return task.call(this, ...args);
                }
                catch (error) {
                    if ('then' in error)
                        $.$mol_fail(new Error('Solid fiber can not be suspended.'));
                    return $.$mol_fail_hidden(error);
                }
                finally {
                    $mol_fiber.deadline = deadline;
                }
            }
            Object.defineProperty(wrapped, 'name', {
                value: `${task.name || '<anonymous>'}|${this.name}`
            });
            return $mol_fiber.func(wrapped);
        }
    };
    $mol_fiber_solid = __decorate([
        $.$mol_class
    ], $mol_fiber_solid);
    $.$mol_fiber_solid = $mol_fiber_solid;
    let $mol_fiber = $mol_fiber_1 = class $mol_fiber extends $.$mol_wrapper {
        constructor() {
            super(...arguments);
            this.value = undefined;
            this.error = null;
            this.cursor = 0 /* obsolete */;
            this.masters = [];
        }
        static wrap(task) {
            return function (...args) {
                const slave = $mol_fiber_1.current;
                let master = slave && slave.master;
                if (!master || master.constructor !== $mol_fiber_1) {
                    master = new $mol_fiber_1;
                    master.calculate = task.bind(this, ...args);
                    const prefix = slave ? `${slave}/${slave.cursor / 2}:` : '/';
                    master[Symbol.toStringTag] = `${prefix}${task.name}`;
                }
                return master.get();
            };
        }
        static async tick() {
            while ($mol_fiber_1.queue.length > 0) {
                if (Date.now() > $mol_fiber_1.deadline) {
                    $mol_fiber_1.schedule();
                    return;
                }
                const task = $mol_fiber_1.queue.shift();
                await task();
            }
        }
        static schedule() {
            if (!$mol_fiber_1.scheduled) {
                $mol_fiber_1.scheduled = new $.$mol_after_frame(() => {
                    $mol_fiber_1.deadline = Math.max($mol_fiber_1.deadline, Date.now() + $mol_fiber_1.quant);
                    $mol_fiber_1.scheduled = null;
                    $mol_fiber_1.tick();
                });
            }
            const promise = new this.$.Promise(done => this.queue.push(() => (done(), promise)));
            return promise;
        }
        schedule() {
            $mol_fiber_1.schedule().then($.$mol_log_group('$mol_fiber_scheduled', this.wake.bind(this)));
        }
        wake() {
            this.$.$mol_log(this, '⏰');
            try {
                if (this.cursor > -2 /* actual */)
                    return this.get();
            }
            catch (error) {
                if ('then' in error)
                    return;
                $.$mol_fail_hidden(error);
            }
        }
        push(value) {
            value = this.$.$mol_conform(value, this.value);
            if (!$.$mol_compare_any(this.value, value)) {
                this.$.$mol_log(this, value, '🠈', this.value);
                this.obsolete_slaves();
                this.forget();
            }
            else {
                this.$.$mol_log(this, '✔', value);
                if (this.error)
                    this.obsolete_slaves();
            }
            this.error = null;
            this.value = value;
            this.complete();
            return value;
        }
        fail(error) {
            this.complete();
            this.error = error;
            this.$.$mol_log(this, '🔥', error.message);
            this.obsolete_slaves();
            return error;
        }
        wait(promise) {
            this.error = promise;
            this.$.$mol_log(this, '💤');
            this.cursor = 0 /* obsolete */;
            return promise;
        }
        complete() {
            if (this.cursor <= -2 /* actual */)
                return;
            for (let index = 0; index < this.masters.length; index += 2) {
                this.complete_master(index);
            }
            this.cursor = -2 /* actual */;
        }
        complete_master(master_index) {
            this.disobey(master_index);
        }
        pull() {
            this.push(this.calculate());
        }
        update() {
            const slave = $mol_fiber_1.current;
            try {
                this.error = null;
                this.limit();
                $mol_fiber_1.current = this;
                this.$.$mol_log(this, '►');
                this.pull();
            }
            catch (error) {
                if ('then' in error) {
                    if (!slave) {
                        const listener = this.wake.bind(this);
                        error = error.then(listener, listener);
                    }
                    this.wait(error);
                }
                else {
                    this.fail(error);
                }
            }
            finally {
                $mol_fiber_1.current = slave;
            }
        }
        get() {
            if (this.cursor > 0 /* obsolete */)
                this.$.$mol_fail(new Error('Cyclic dependency'));
            const slave = $mol_fiber_1.current;
            if (slave)
                slave.master = this;
            if (this.cursor > -2 /* actual */)
                this.update();
            if (this.error)
                return this.$.$mol_fail_hidden(this.error);
            return this.value;
        }
        limit() {
            if (!$mol_fiber_1.current)
                return;
            const now = Date.now();
            const overtime = now - $mol_fiber_1.deadline;
            if (overtime < 0)
                return;
            /// after debugger
            if (overtime > 500) {
                $mol_fiber_1.deadline = now + $mol_fiber_1.quant;
                return;
            }
            this.$.$mol_fail_hidden($mol_fiber_1.schedule());
        }
        get master() {
            return this.masters[this.cursor];
        }
        set master(next) {
            if (this.cursor === -1 /* doubt */)
                return;
            const cursor = this.cursor;
            const prev = this.masters[this.cursor];
            if (prev !== next) {
                if (prev)
                    this.rescue(prev, cursor);
                this.masters[cursor] = next;
                this.masters[cursor + 1] = this.obey(next, cursor);
            }
            this.cursor = cursor + 2;
        }
        rescue(master, master_index) { }
        obey(master, master_index) { return -1; }
        lead(slave, master_index) { return -1; }
        dislead(slave_index) {
            this.destructor();
        }
        disobey(master_index) {
            const master = this.masters[master_index];
            if (!master)
                return;
            master.dislead(this.masters[master_index + 1]);
            this.masters[master_index] = undefined;
            this.masters[master_index + 1] = undefined;
            this.$.$mol_array_trim(this.masters);
        }
        obsolete_slaves() { }
        obsolete(master_index) { }
        forget() {
            this.value = undefined;
        }
        abort() {
            this.forget();
            return true;
        }
        destructor() {
            if (!this.abort())
                return;
            this.$.$mol_log(this, '🕱', this.value);
            this.complete();
        }
    };
    $mol_fiber.quant = 32;
    $mol_fiber.deadline = 0;
    $mol_fiber.current = null;
    $mol_fiber.scheduled = null;
    $mol_fiber.queue = [];
    $mol_fiber = $mol_fiber_1 = __decorate([
        $.$mol_class
    ], $mol_fiber);
    $.$mol_fiber = $mol_fiber;
})($ || ($ = {}));
//fiber.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        if (!having)
            return false;
        if (typeof having !== 'object')
            return false;
        if (!('destructor' in having))
            return false;
        return true;
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having) {
        if (!$mol_owning_allow(having))
            return;
        return $.$mol_owning_map.get(having);
    }
    $.$mol_owning_get = $mol_owning_get;
    function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having) !== owner)
            return false;
        return true;
    }
    $.$mol_owning_check = $mol_owning_check;
    function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
            return false;
        if ($.$mol_owning_map.get(having))
            return false;
        $.$mol_owning_map.set(having, owner);
        return true;
    }
    $.$mol_owning_catch = $mol_owning_catch;
})($ || ($ = {}));
//owning.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($_1) {
    $_1.$mol_test({
        'Value has js-path name'() {
            let App = class App extends $_1.$mol_object2 {
                static get title() { return new $_1.$mol_object2; }
            };
            __decorate([
                $_1.$mol_atom2_field
            ], App, "title", null);
            App = __decorate([
                $_1.$mol_class
            ], App);
            $_1.$mol_assert_equal(`${App.title}`, 'App.title');
        },
        'Simple property'() {
            class App extends $_1.$mol_object2 {
            }
            App.value = 1;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "value", void 0);
            $_1.$mol_assert_equal(App.value, 1);
            App.value = 2;
            $_1.$mol_assert_equal(App.value, 2);
        },
        'Instant actualization'() {
            class Source extends $_1.$mol_object2 {
                constructor() {
                    super(...arguments);
                    this.value = 1;
                }
            }
            __decorate([
                $_1.$mol_atom2_field
            ], Source.prototype, "value", void 0);
            class App extends $_1.$mol_object2 {
                static get source() { return Source.make(); }
                static get value() { return this.source.value + 1; }
            }
            __decorate([
                $_1.$mol_atom2_field
            ], App, "source", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "value", null);
            $_1.$mol_assert_equal(App.value, 2);
            App.source.value = 2;
            $_1.$mol_assert_equal(App.value, 3);
        },
        'Access to cached value'() {
            class App extends $_1.$mol_object2 {
                static get value() { return 1; }
            }
            __decorate([
                $_1.$mol_atom2_field
            ], App, "value", null);
            $_1.$mol_assert_equal($_1.$mol_atom2_value(() => App.value), undefined);
            $_1.$mol_assert_equal(App.value, 1);
            $_1.$mol_assert_equal($_1.$mol_atom2_value(() => App.value), 1);
        },
        'Do not recalc slaves on equal changes'() {
            class App extends $_1.$mol_object2 {
                static get result() { return this.first[0] + this.counter++; }
            }
            App.first = [1];
            App.counter = 0;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 1);
            App.first = [1];
            $_1.$mol_assert_equal(App.result, 1);
        },
        'Do not recalc grand slave on equal direct slave result '() {
            class App extends $_1.$mol_object2 {
                static get second() { return Math.abs(this.first); }
                static get result() { return this.second + ++this.counter; }
            }
            App.first = 1;
            App.counter = 0;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "second", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 2);
            App.first = -1;
            $_1.$mol_assert_equal(App.result, 2);
        },
        'Recalc when [not changed master] changes [following master]'() {
            class App extends $_1.$mol_object2 {
                static get second() {
                    this.third = this.first;
                    return 0;
                }
                static get result() { return this.second + this.third + ++this.counter; }
            }
            App.first = 1;
            App.third = 0;
            App.counter = 0;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "second", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "third", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 2);
            App.first = 5;
            $_1.$mol_assert_equal(App.result, 7);
        },
        'Branch switching'() {
            class App extends $_1.$mol_object2 {
                static get second() { return 2; }
                static get result() {
                    return (this.condition ? this.first : this.second) + this.counter++;
                }
            }
            App.first = 1;
            App.condition = true;
            App.counter = 0;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "second", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "condition", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 1);
            App.condition = false;
            $_1.$mol_assert_equal(App.result, 3);
            App.first = 10;
            $_1.$mol_assert_equal(App.result, 3);
        },
        'Forbidden self invalidation'() {
            class App extends $_1.$mol_object2 {
                static get second() { return this.first + 1; }
                static get result() {
                    this.second;
                    return this.first++;
                }
            }
            App.first = 1;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "second", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_fail(() => App.result);
        },
        'Side effect inside computation'() {
            class App extends $_1.$mol_object2 {
                static increase() { return ++this.first; }
                static get result() {
                    return this.increase() + 1;
                }
            }
            App.first = 1;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", void 0);
            __decorate([
                $_1.$mol_fiber.method
            ], App, "increase", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 3);
        },
        'Forbidden cyclic dependency'() {
            class App extends $_1.$mol_object2 {
                static get first() { return this.second - 1; }
                static get second() { return this.first + 1; }
            }
            __decorate([
                $_1.$mol_atom2_field
            ], App, "first", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "second", null);
            $_1.$mol_assert_fail(() => App.first);
        },
        'Forget sub fibers on complete'() {
            class App extends $_1.$mol_object2 {
                static count() { return this.counter++; }
                static get result() { return this.count() + this.data; }
            }
            App.counter = 0;
            App.data = 1;
            __decorate([
                $_1.$mol_fiber.method
            ], App, "count", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "data", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 1);
            App.data = 2;
            $_1.$mol_assert_equal(App.result, 3);
        },
        async 'Automatic destroy owned value on self destruction'() {
            let counter = 0;
            class Having extends $_1.$mol_object2 {
                destructor() { counter++; }
            }
            class App extends $_1.$mol_object2 {
                static get having() { return Having.make(); }
                static get result() {
                    if (this.condition)
                        this.having;
                    return 0;
                }
            }
            App.condition = true;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "having", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "condition", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            App.result;
            App.condition = false;
            App.result;
            $_1.$mol_assert_equal(counter, 0);
            await $_1.$mol_fiber_warp();
            $_1.$mol_assert_equal(counter, 1);
        },
        async 'Do not destroy putted value'() {
            class App extends $_1.$mol_object2 {
                static get target() {
                    return this.condition ? this.source : 0;
                }
            }
            App.condition = true;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "source", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "condition", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "target", null);
            App.source = 1;
            $_1.$mol_assert_equal(App.target, 1);
            App.condition = false;
            $_1.$mol_assert_equal(App.target, 0);
            await $_1.$mol_fiber_warp();
            App.condition = true;
            $_1.$mol_assert_equal(App.target, 1);
        },
        'Restore after error'() {
            class App extends $_1.$mol_object2 {
                static get broken() {
                    if (this.condition)
                        $_1.$mol_fail(new Error('test error'));
                    return 1;
                }
                static get result() { return this.broken; }
            }
            App.condition = false;
            __decorate([
                $_1.$mol_atom2_field
            ], App, "condition", void 0);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "broken", null);
            __decorate([
                $_1.$mol_atom2_field
            ], App, "result", null);
            $_1.$mol_assert_equal(App.result, 1);
            App.condition = true;
            $_1.$mol_assert_fail(() => App.result);
            App.condition = false;
            $_1.$mol_assert_equal(App.result, 1);
        },
        async 'auto fresh only when alive'($) {
            let state = 1;
            const monitor = new $.$mol_atom2;
            monitor.calculate = () => {
                new $.$mol_after_frame($_1.$mol_atom2.current.fresh);
                return state;
            };
            $_1.$mol_assert_equal(monitor.get(), 1);
            state = 2;
            $_1.$mol_assert_equal(monitor.get(), 1);
            $.$mol_after_mock_warp();
            $_1.$mol_assert_equal(monitor.get(), 2);
            state = 3;
            $_1.$mol_assert_equal(monitor.get(), 2);
            monitor.destructor();
            $_1.$mol_assert_equal(monitor.value, undefined);
            $.$mol_after_mock_warp();
            await $.$mol_fiber_warp();
            $_1.$mol_assert_equal(monitor.value, undefined);
        },
    });
})($ || ($ = {}));
//atom2.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_atom2_1;
    function $mol_atom2_value(task) {
        const cached = $mol_atom2.cached;
        try {
            $mol_atom2.cached = true;
            return task();
        }
        finally {
            $mol_atom2.cached = cached;
        }
    }
    $.$mol_atom2_value = $mol_atom2_value;
    let $mol_atom2 = $mol_atom2_1 = class $mol_atom2 extends $.$mol_fiber {
        constructor() {
            super(...arguments);
            this.slaves = [];
            this._value = undefined;
            this._error = null;
        }
        static get current() {
            const atom = $.$mol_fiber.current;
            if (atom instanceof $mol_atom2_1)
                return atom;
            return null;
        }
        static reap(atom) {
            this.reap_queue.push(atom);
            if (this.reap_task)
                return;
            this.reap_task = $.$mol_fiber_defer(() => {
                this.reap_task = null;
                while (true) {
                    const atom = this.reap_queue.pop();
                    if (!atom)
                        break;
                    if (!atom.alone)
                        continue;
                    atom.destructor();
                }
            });
        }
        rescue(master, cursor) {
            const master_index = this.masters.length;
            const slave_index = this.masters[cursor + 1] + 1;
            master.slaves[slave_index] = master_index;
            this.masters.push(master, this.masters[cursor + 1]);
        }
        get() {
            if ($mol_atom2_1.cached)
                return this.value;
            const value = super.get();
            if (value === undefined)
                $.$mol_fail(new Error(`Not defined: ${this}`));
            return value;
        }
        pull() {
            if (this.cursor === 0 /* obsolete */)
                return super.pull();
            this.$.$mol_log(this, '⏭');
            const masters = this.masters;
            for (let index = 0; index < masters.length; index += 2) {
                const master = masters[index];
                if (!master)
                    continue;
                try {
                    master.get();
                }
                catch (error) {
                    if ('then' in error)
                        $.$mol_fail_hidden(error);
                    this.cursor = 0 /* obsolete */;
                }
                if (this.cursor !== 0 /* obsolete */)
                    continue;
                this.$.$mol_log(this, '⏯');
                return super.pull();
            }
            this.$.$mol_log(this, '✔✔', this.value);
            this.cursor = -2 /* actual */;
            return this.value;
        }
        get value() { return this._value; }
        set value(next) {
            const prev = this._value;
            if (prev && this.$.$mol_owning_check(this, prev))
                prev.destructor();
            if (next && this.$.$mol_owning_catch(this, next))
                next[Symbol.toStringTag] = this[Symbol.toStringTag];
            this._value = next;
        }
        get error() { return this._error; }
        set error(next) {
            const prev = this._error;
            if (prev && this.$.$mol_owning_check(this, prev))
                prev.destructor();
            if (next && this.$.$mol_owning_catch(this, next))
                next[Symbol.toStringTag] = this[Symbol.toStringTag];
            this._error = next;
        }
        put(next) {
            this.push(next);
            this.cursor = -3 /* persist */;
        }
        complete_master(master_index) {
            if (this.masters[master_index] instanceof $mol_atom2_1) {
                if (master_index >= this.cursor)
                    this.disobey(master_index);
            }
            else {
                this.disobey(master_index);
            }
        }
        obey(master, master_index) {
            return master.lead(this, master_index);
        }
        lead(slave, master_index) {
            this.$.$mol_log(this, '☍', slave);
            const slave_index = this.slaves.length;
            this.slaves[slave_index] = slave;
            this.slaves[slave_index + 1] = master_index;
            return slave_index;
        }
        dislead(slave_index) {
            if (slave_index < 0)
                return; // slave is fiber
            this.$.$mol_log(this, '☌', this.slaves[slave_index]);
            this.slaves[slave_index] = undefined;
            this.slaves[slave_index + 1] = undefined;
            $.$mol_array_trim(this.slaves);
            if (this.cursor > -3 /* persist */ && this.alone)
                $mol_atom2_1.reap(this);
        }
        obsolete(master_index = -1) {
            if (this.cursor > 0 /* obsolete */) {
                if (master_index >= this.cursor - 2)
                    return;
                const path = [];
                let current = this;
                collect: while (current) {
                    path.push(current);
                    current = current.masters[current.cursor - 2];
                }
                this.$.$mol_fail(new Error(`Obsoleted while calculation \n\n${path.join('\n')}\n`));
            }
            if (this.cursor === 0 /* obsolete */)
                return;
            this.$.$mol_log(this, '✘');
            if (this.cursor !== -1 /* doubt */)
                this.doubt_slaves();
            this.cursor = 0 /* obsolete */;
        }
        doubt(master_index = -1) {
            if (this.cursor > 0 /* obsolete */) {
                if (master_index >= this.cursor - 2)
                    return;
                const path = [];
                let current = this;
                collect: while (current) {
                    path.push(current);
                    current = current.masters[current.cursor - 2];
                }
                this.$.$mol_fail(new Error(`Doubted while calculation \n\n${path.join('\n')}\n`));
            }
            if (this.cursor >= -1 /* doubt */)
                return;
            this.$.$mol_log(this, '�');
            this.cursor = -1 /* doubt */;
            this.doubt_slaves();
        }
        obsolete_slaves() {
            for (let index = 0; index < this.slaves.length; index += 2) {
                const slave = this.slaves[index];
                if (slave)
                    slave.obsolete(this.slaves[index + 1]);
            }
        }
        doubt_slaves() {
            for (let index = 0; index < this.slaves.length; index += 2) {
                const slave = this.slaves[index];
                if (slave)
                    slave.doubt(this.slaves[index + 1]);
            }
        }
        get fresh() {
            return () => {
                if (this.cursor !== -2 /* actual */)
                    return;
                this.cursor = 0 /* obsolete */;
                $.$mol_fiber_solid.run(() => this.update());
            };
        }
        get alone() {
            return this.slaves.length === 0;
        }
        get derived() {
            for (let index = 0; index < this.masters.length; index += 2) {
                if (this.masters[index])
                    return true;
            }
            return false;
        }
        destructor() {
            if (!this.abort())
                return;
            this.$.$mol_log(this, '🕱', this.value);
            this.cursor = -3 /* persist */;
            for (let index = 0; index < this.masters.length; index += 2) {
                this.complete_master(index);
            }
        }
    };
    $mol_atom2.cached = false;
    $mol_atom2.reap_task = null;
    $mol_atom2.reap_queue = [];
    $mol_atom2 = $mol_atom2_1 = __decorate([
        $.$mol_class
    ], $mol_atom2);
    $.$mol_atom2 = $mol_atom2;
})($ || ($ = {}));
//atom2.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'init with overload'() {
            class X extends $.$mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    class $mol_object {
        get $() {
            const owner = this.object_owner();
            return (owner && owner.$ || $);
        }
        static make(config) {
            const instance = new this;
            for (let key in config)
                instance[key] = config[key];
            return instance;
        }
        static toString() {
            return this.name;
        }
        object_owner(next) {
            return this['object_owner()'] || (this['object_owner()'] = next);
        }
        object_host(next) {
            return this['object_host()'] || (this['object_host()'] = next);
        }
        object_field(next) {
            return this['object_field()'] || (this['object_field()'] = next) || '';
        }
        object_id(next) {
            return this[Symbol.toStringTag] || (this[Symbol.toStringTag] = next) || '';
        }
        toString() {
            return this.object_id();
        }
        toJSON() {
            return this.toString();
        }
        destructor() { }
    }
    $mol_object.$ = $;
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_defer extends $.$mol_object {
        constructor(run) {
            super();
            this.run = run;
            $mol_defer.add(this);
        }
        destructor() {
            $mol_defer.drop(this);
        }
        static schedule() {
            if (this.timer)
                return;
            this.timer = this.scheduleNative(() => {
                this.timer = null;
                this.run();
            });
        }
        static unschedule() {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = null;
        }
        static add(defer) {
            this.all.push(defer);
            this.schedule();
        }
        static drop(defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        }
        static run() {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.shift();)
                defer.run();
            //this.unschedule()
        }
    }
    $mol_defer.all = [];
    $mol_defer.timer = null;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? handler => requestAnimationFrame(handler)
        : handler => setTimeout(handler, 16);
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
"use strict";
var $;
(function ($) {
    /// Global storage of temporary state
    $.$mol_state_stack = new Map();
})($ || ($ = {}));
//stack.js.map
;
void function() {

	if( typeof alert === 'function' ) {
		var nativeAlert = alert
		window.alert = function alert( message ) {
			console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
			return nativeAlert( message )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativeConfirm = confirm
		window.confirm = function confirm( question ) {
			console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativeConfirm( question )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativePrompt = prompt
		window.prompt = function prompt( question , def ) {
			console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativePrompt( question , def )
		}
	}

}()

;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'caching'() {
            let random = new $.$mol_atom('random', () => Math.random());
            $.$mol_assert_equal(random.get(), random.get());
        },
        'lazyness'() {
            let value = 0;
            let prop = new $.$mol_atom('prop', () => value = 1);
            $.$mol_defer.run();
            $.$mol_assert_equal(value, 0);
        },
        'instant actualization'() {
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => middle.get() + 1);
            $.$mol_assert_equal(target.get(), 3);
            source.set(2);
            $.$mol_assert_equal(target.get(), 4);
        },
        'do not actualize when masters not changed'() {
            let target_updates = 0;
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => Math.abs(source.get()));
            let target = new $.$mol_atom('target', () => {
                ++target_updates;
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(target_updates, 1);
            source.set(-1);
            target.get();
            $.$mol_assert_equal(target_updates, 1);
        },
        'obsolete atoms actualized in initial order'() {
            let actualizations = '';
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => {
                actualizations += 'M';
                return source.get();
            });
            let target = new $.$mol_atom('target', () => {
                actualizations += 'T';
                source.get();
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(actualizations, 'TM');
            source.set(2);
            $.$mol_defer.run();
            $.$mol_assert_equal(actualizations, 'TMTM');
        },
        'automatic deferred restart'() {
            let targetValue = 0;
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => targetValue = middle.get() + 1);
            target.get();
            $.$mol_assert_equal(targetValue, 3);
            source.set(2);
            $.$mol_assert_equal(targetValue, 3);
            $.$mol_defer.run();
            $.$mol_assert_equal(targetValue, 4);
        },
        'Right reactive change of source'() {
            let targetValue;
            let test_counter = new $.$mol_atom('test_counter', next => {
                new $.$mol_defer(() => {
                    test_counter.push(next || 1);
                });
                $.$mol_fail_hidden(new $.$mol_atom_wait);
            });
            let slave = new $.$mol_atom('slave', next => test_counter.get());
            slave.actualize();
            let res = [];
            const error = new Error('test error');
            const test_task = new $.$mol_atom('test_task')
                .then(() => test_counter.get() + 1)
                .then(next => test_counter.set(next))
                .then(next => {
                test_counter.set(next + 1);
                $.$mol_fail_hidden(error);
            })
                .catch(error => [error])
                .then(next => res = next);
            $.$mol_defer.run();
            $.$mol_assert_equal(test_counter.get(), 3);
            $.$mol_assert_equal(res[0], error);
        },
        'error handling'() {
            let source = new $.$mol_atom('source', (next) => {
                const error = new Error('Test error');
                error['$mol_atom_catched'] = true;
                $.$mol_fail_hidden(error);
            });
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => middle.get() + 1);
            $.$mol_assert_fail(() => target.get().valueOf());
        },
        'setting equal state are ignored'() {
            let atom = new $.$mol_atom('atom', next => next || { foo: [777] });
            let v1 = atom.get();
            let v2 = { foo: [777] };
            let v3 = atom.set(v2);
            $.$mol_assert_equal(v1, v3);
            $.$mol_assert_unique(v2, v3);
        },
        'setting equal to last setted are ignored until changed'() {
            let val = { foo: [777] };
            let called = 0;
            let atom = new $.$mol_atom('atom', () => {
                ++called;
                return val;
            });
            atom.get();
            $.$mol_assert_equal(called, 1);
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 2);
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 2);
            atom.value({ foo: [666] }, $.$mol_atom_force_update);
            $.$mol_assert_equal(called, 3);
            atom.push({ foo: [777] });
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 4);
            atom.set({ foo: [555] });
            $.$mol_assert_equal(called, 5);
        },
        'Next remains after restart'() {
            let defer = new $.$mol_atom('defer', next => {
                new $.$mol_defer(() => {
                    defer.push({});
                });
                $.$mol_fail_hidden(new $.$mol_atom_wait);
            });
            let value = {};
            let task = new $.$mol_atom('task', next => {
                defer.get().valueOf();
                return next;
            });
            $.$mol_assert_fail(() => task.set(value).valueOf(), $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(task.get(), value);
        },
    });
})($ || ($ = {}));
//atom.test.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status["obsolete"] = "obsolete";
        $mol_atom_status["checking"] = "checking";
        $mol_atom_status["pulling"] = "pulling";
        $mol_atom_status["actual"] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    function $mol_atom_fence(task) {
        const slave = $mol_atom.stack[0];
        $mol_atom.stack[0] = null;
        try {
            return task();
        }
        finally {
            $mol_atom.stack[0] = slave;
        }
    }
    $.$mol_atom_fence = $mol_atom_fence;
    class $mol_atom extends $.$mol_object {
        constructor(id, handler = next => next) {
            super();
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.object_id(id);
            this.handler = handler;
        }
        destructor() {
            this.unlink();
            this.status = $mol_atom_status.actual;
            const value = this['value()'];
            if (value instanceof $.$mol_object) {
                if (value.object_owner() === this)
                    value.destructor();
            }
            this['value()'] = undefined;
        }
        unlink() {
            this.disobey_all();
            if (this.slaves)
                this.check_slaves();
        }
        get(force) {
            const slave = $mol_atom.stack[0];
            if (slave) {
                this.lead(slave);
                slave.obey(this);
            }
            this.actualize(force);
            const value = this['value()'];
            if (typeof Proxy !== 'function' && value instanceof Error) {
                throw value;
            }
            return value;
        }
        actualize(force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error(`Cyclic atom dependency of ${this}`);
            }
            if (!force && this.status === $mol_atom_status.actual)
                return;
            const slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(master => {
                    if (this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                const oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(master => {
                        master.dislead(this);
                    });
                this.status = $mol_atom_status.pulling;
                const next = this.pull(force);
                if (next === undefined) {
                    this.status = $mol_atom_status.actual;
                }
                else {
                    this.push(next);
                }
            }
            $mol_atom.stack[0] = slave;
        }
        pull(force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.message || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        }
        set(next) {
            return this.value(next);
        }
        push(next_raw) {
            if (!(next_raw instanceof $mol_atom_wait)) {
                this._ignore = this._next;
                this._next = undefined;
            }
            this.status = next_raw === undefined ? $mol_atom_status.obsolete : $mol_atom_status.actual;
            const prev = this['value()'];
            let next = (next_raw instanceof Error || prev instanceof Error) ? next_raw : $.$mol_conform(next_raw, prev);
            if (next === prev)
                return prev;
            if (prev instanceof $.$mol_object) {
                if (prev.object_owner() === this)
                    prev.destructor();
            }
            if (next instanceof $.$mol_object) {
                next.object_owner(this);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get(target) {
                        return $.$mol_fail_hidden(target.valueOf());
                    },
                    ownKeys(target) {
                        return $.$mol_fail_hidden(target.valueOf());
                    },
                });
            }
            this['value()'] = next;
            $.$mol_log(this, prev, '➔', next);
            this.obsolete_slaves();
            return next;
        }
        obsolete_slaves() {
            if (!this.slaves)
                return;
            this.slaves.forEach(slave => slave.obsolete());
        }
        check_slaves() {
            if (this.slaves) {
                this.slaves.forEach(slave => slave.check());
            }
            else {
                $mol_atom.actualize(this);
            }
        }
        check() {
            //if( this.status === $mol_atom_status.pulling ) {
            //	throw new Error( `May be obsolated while pulling ${ this }` )
            //}
            if (this.status === $mol_atom_status.actual || this.status === $mol_atom_status.pulling) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        }
        obsolete() {
            if (this.status === $mol_atom_status.obsolete)
                return;
            //if( this.status === $mol_atom_status.pulling ) {
            //	throw new Error( `Obsolated while pulling ${ this }` )
            //} 
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return;
        }
        lead(slave) {
            if (!this.slaves) {
                this.slaves = new Set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        }
        dislead(slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        }
        obey(master) {
            if (!this.masters)
                this.masters = new Set();
            this.masters.add(master);
        }
        disobey(master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        }
        disobey_all() {
            if (!this.masters)
                return;
            this.masters.forEach(master => master.dislead(this));
            this.masters = null;
        }
        cache(next) {
            if (next === undefined)
                return this['value()'];
            return this['value()'] = next;
        }
        value(next, force) {
            if (force === $mol_atom_force_cache)
                return this.push(next);
            if (next !== undefined) {
                if (force === $mol_atom_force)
                    return this.push(next);
                let next_normal = $.$mol_conform(next, this._ignore);
                if (next_normal === this._ignore)
                    return this.get(force);
                if (!(this['value()'] instanceof Error)) {
                    next_normal = $.$mol_conform(next, this['value()']);
                    if (next_normal === this['value()'])
                        return this.get(force);
                }
                this._next = next_normal;
                this._ignore = next_normal;
                force = $mol_atom_force_update;
            }
            return this.get(force);
        }
        static actualize(atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        }
        static reap(atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        }
        static unreap(atom) {
            $mol_atom.reaping.delete(atom);
        }
        static schedule() {
            if (this.scheduled)
                return;
            new $.$mol_defer($.$mol_log_group('$mol_atom.sync()', () => {
                if (!this.scheduled)
                    return;
                this.scheduled = false;
                this.sync();
            }));
            this.scheduled = true;
        }
        static sync() {
            this.schedule();
            while (true) {
                const atom = this.updating.shift();
                if (!atom)
                    break;
                if (this.reaping.has(atom))
                    continue;
                if (atom.status !== $mol_atom_status.actual)
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(atom => {
                    this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destructor();
                });
            }
            this.scheduled = false;
        }
        then(done, fail) {
            let prev;
            let next;
            const atom = new $mol_atom(`${this}.then(${done})`, () => {
                try {
                    if (prev == undefined) {
                        const val = this.get();
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val['valueOf']();
                        prev = val;
                    }
                    if (next == undefined) {
                        const val = done(prev);
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val['valueOf']();
                        next = val;
                    }
                    return next;
                }
                catch (error) {
                    if (error instanceof $mol_atom_wait)
                        return error;
                    if (fail)
                        return fail(error);
                    return error;
                }
            });
            $mol_atom.actualize(atom);
            return atom;
        }
        catch(fail) {
            return this.then(next => next, fail);
        }
    }
    $mol_atom.stack = [];
    $mol_atom.updating = [];
    $mol_atom.reaping = new Set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    function $mol_atom_current() {
        return $mol_atom.stack[0];
    }
    $.$mol_atom_current = $mol_atom_current;
    class $mol_atom_wait extends Error {
        constructor() {
            super(...arguments);
            this.name = '$mol_atom_wait';
        }
    }
    $.$mol_atom_wait = $mol_atom_wait;
    class $mol_atom_force extends Object {
        static toString() { return this.name; }
    }
    $.$mol_atom_force = $mol_atom_force;
    class $mol_atom_force_cache extends $mol_atom_force {
    }
    $.$mol_atom_force_cache = $mol_atom_force_cache;
    class $mol_atom_force_update extends $mol_atom_force {
    }
    $.$mol_atom_force_update = $mol_atom_force_update;
})($ || ($ = {}));
//atom.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'Property method'() {
            class App extends $.$mol_object2 {
                static value(next = 1) { return next + 1; }
            }
            __decorate([
                $.$mol_atom2_prop
            ], App, "value", null);
            $.$mol_assert_equal(App.value(), 2);
            App.value(2);
            $.$mol_assert_equal(App.value(), 3);
        },
    });
})($ || ($ = {}));
//prop.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_prop(proto, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        Object.defineProperty(proto, name + "()", {
            get: function () {
                return store.get(this);
            }
        });
        const get_cache = (host) => {
            let cache = store.get(host);
            if (!cache) {
                cache = new $.$mol_atom2;
                cache.calculate = value.bind(host);
                cache[Symbol.toStringTag] = `${host}.${name}()`;
                cache.abort = () => {
                    store.delete(host);
                    cache.forget();
                    return true;
                };
                $.$mol_owning_catch(host, cache);
                store.set(host, cache);
            }
            return cache;
        };
        return {
            value(next, force) {
                if (next === undefined) {
                    const cache = get_cache(this);
                    if (force === $.$mol_atom_force_cache)
                        cache.obsolete(Number.NaN);
                    return cache.get();
                }
                return $.$mol_fiber.run(() => {
                    if (force !== $.$mol_atom_force_cache)
                        next = value.call(this, next);
                    return get_cache(this).put(next);
                });
            }
        };
    }
    $.$mol_atom2_prop = $mol_atom2_prop;
})($ || ($ = {}));
//prop.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'const returns stored value'() {
            const foo = { bar: $.$mol_const(Math.random()) };
            $.$mol_assert_equal(foo.bar(), foo.bar());
            $.$mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//const.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_field(proto, name, descr) {
        if (!descr)
            descr = Object.getOwnPropertyDescriptor(proto, name);
        const get = descr ? (descr.get || $.$mol_const(descr.value)) : (() => undefined);
        const set = descr && descr.set || function (next) { get_cache(this).put(next); };
        const store = new WeakMap();
        Object.defineProperty(proto, name + "@", {
            get: function () {
                return store.get(this);
            }
        });
        const get_cache = (host) => {
            let cache = store.get(host);
            if (!cache) {
                cache = new $.$mol_atom2;
                cache.calculate = get.bind(host);
                cache[Symbol.toStringTag] = `${host}.${name}`;
                cache.abort = () => {
                    store.delete(host);
                    cache.forget();
                    return true;
                };
                store.set(host, cache);
            }
            return cache;
        };
        return {
            get() {
                return get_cache(this).get();
            },
            set,
        };
    }
    $.$mol_atom2_field = $mol_atom2_field;
})($ || ($ = {}));
//field.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        async 'Autorun'() {
            class App extends $.$mol_object2 {
                static get init() {
                    ++this.counter;
                    return this.state;
                }
            }
            App.state = 1;
            App.counter = 0;
            __decorate([
                $.$mol_atom2_field
            ], App, "state", void 0);
            __decorate([
                $.$mol_atom2_field
            ], App, "init", null);
            const autorun = $.$mol_atom2_autorun(() => App.init);
            try {
                await $.$mol_fiber_warp();
                $.$mol_assert_equal(App.counter, 1);
                App.state = 2;
                $.$mol_assert_equal(App.counter, 1);
                await $.$mol_fiber_warp();
                $.$mol_assert_equal(App.counter, 2);
                App.state = 3;
            }
            finally {
                autorun.destructor();
            }
            App.state = 4;
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(App.counter, 2);
        },
    });
})($ || ($ = {}));
//autorun.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_atom2_autorun(calculate) {
        return $.$mol_atom2.make(atom => {
            atom.calculate = calculate;
            atom.obsolete_slaves = atom.schedule;
            atom.doubt_slaves = atom.schedule;
            atom[Symbol.toStringTag] = calculate[Symbol.toStringTag] || calculate.name || '$mol_atom2_autorun';
            atom.schedule();
        });
    }
    $.$mol_atom2_autorun = $mol_atom2_autorun;
})($ || ($ = {}));
//autorun.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** @jsx $mol_jsx_make */
var $;
(function ($) {
    $.$mol_test({
        'Class as component'() {
            class Foo extends $.$mol_jsx_view {
                constructor() {
                    super(...arguments);
                    this.title = '';
                }
                render() {
                    return $.$mol_jsx_make("div", null,
                        this.title,
                        " ",
                        this.childNodes.join('-'));
                }
            }
            const dom = $.$mol_jsx_make(Foo, { id: "/foo", title: "bar" },
                "xxx",
                123);
            $.$mol_assert_equal(dom.outerHTML, '<div id="/foo">bar xxx-123</div>');
        },
        'View by element'() {
            class Br extends $.$mol_jsx_view {
                render() {
                    view = this;
                    return $.$mol_jsx_make("br", { id: "/foo" });
                }
            }
            let view;
            $.$mol_assert_equal(Br.of($.$mol_jsx_make(Br, null)), view);
        },
        'Attached view rerender'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            class Title extends $.$mol_jsx_view {
                constructor() {
                    super(...arguments);
                    this.value = 'foo';
                }
                render() {
                    return $.$mol_jsx_make("div", null, this.value);
                }
            }
            const dom = $.$mol_jsx_attach(doc, () => $.$mol_jsx_make(Title, { id: "/foo" }));
            const title = Title.of(dom);
            $.$mol_assert_equal(title.ownerDocument, doc);
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">foo</body></html>');
            title.value = 'bar';
            title.valueOf();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
        async 'Reactive attached view'() {
            const doc = $.$mol_dom_parse('<html><body id="/foo"></body></html>');
            class Task {
                title(next) { return next || 'foo'; }
            }
            __decorate([
                $.$mol_atom2_prop
            ], Task.prototype, "title", null);
            class App extends $.$mol_jsx_view {
                task() { return new Task; }
                valueOf() {
                    return super.valueOf();
                }
                render() {
                    return $.$mol_jsx_make("div", null, this.task().title());
                }
            }
            __decorate([
                $.$mol_atom2_prop
            ], App.prototype, "task", null);
            __decorate([
                $.$mol_atom2_prop
            ], App.prototype, "valueOf", null);
            const task = new Task;
            $.$mol_atom2_autorun(() => $.$mol_jsx_attach(doc, () => $.$mol_jsx_make(App, { id: "/foo", task: () => task })));
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">foo</body></html>');
            task.title('bar');
            await $.$mol_fiber_warp();
            $.$mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="/foo">bar</body></html>');
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
"use strict";
//equals.test.js.map
;
"use strict";
//equals.js.map

//# sourceMappingURL=web.test.js.map
