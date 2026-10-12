"use strict";
function require( path ){ return $node[ path ] };
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    function $mol_test(set) {
        for (let name in set) {
            const code = set[name];
            const test = (typeof code === 'string') ? new Function('', code) : code;
            $_1.$mol_test_all.push(test);
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
            const res = test(context);
            if ($mol_promise_like(res)) {
                await new Promise((done, fail) => {
                    res.then(done, fail);
                    setTimeout(() => fail(new Error('Test timeout: ' + test.name)), 1000);
                });
            }
        }
        $$.$mol_log3_done({
            place: '$mol_test',
            message: 'All tests passed',
            count: $_1.$mol_test_all.length,
        });
    }
    $_1.$mol_test_run = $mol_test_run;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout(async () => {
            scheduled = false;
            await $mol_test_run();
            $$.$mol_test_complete();
        }, 1000);
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
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
                },
                apply() {
                    $mol_fail_hidden(new Error(`${api} is forbidden in tests`));
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

;
"use strict";
var $;
(function ($) {
    function $mol_test_complete() {
    }
    $.$mol_test_complete = $mol_test_complete;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Argument must be Truthy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_ok(value) {
        if (value)
            return;
        $mol_fail(new Error(`${value} ≠ true`));
    }
    $.$mol_assert_ok = $mol_assert_ok;
    /**
     * Argument must be Falsy
     * @deprecated use $mol_assert_equal instead
     */
    function $mol_assert_not(value) {
        if (!value)
            return;
        $mol_fail(new Error(`${value} ≠ false`));
    }
    $.$mol_assert_not = $mol_assert_not;
    /**
     * Handler must throw an error.
     * @example
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } ) // Passes because throws error
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , 'Parse error' ) // Passes because throws right message
     * $mol_assert_fail( ()=>{ throw new Error( 'Parse error' ) } , Error ) // Passes because throws right class
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_fail(handler, ErrorRight) {
        const fail = $.$mol_fail;
        try {
            $.$mol_fail = $.$mol_fail_hidden;
            handler();
        }
        catch (error) {
            $.$mol_fail = fail;
            if (typeof ErrorRight === 'string') {
                $mol_assert_equal(error.message ?? error, ErrorRight);
            }
            else {
                $mol_assert_equal(error instanceof ErrorRight, true);
            }
            return error;
        }
        finally {
            $.$mol_fail = fail;
        }
        $mol_fail(new Error('Not failed', { cause: { expect: ErrorRight } }));
    }
    $.$mol_assert_fail = $mol_assert_fail;
    /** @deprecated Use $mol_assert_equal */
    function $mol_assert_like(...args) {
        $mol_assert_equal(...args);
    }
    $.$mol_assert_like = $mol_assert_like;
    /**
     * All arguments must not be structural equal to each other.
     * @example
     * $mol_assert_unique( 1 , 2 , 3 ) // Passes
     * $mol_assert_unique( 1 , 1 , 2 ) // Fails because 1 === 1
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (!$mol_compare_deep(args[i], args[j]))
                    continue;
                return $mol_fail(new Error(`Uniquesess assertion failure`, { cause: { [i]: args[i], [i]: args[i] } }));
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
    /**
     * All arguments must be structural equal each other.
     * @example
     * $mol_assert_like( [1] , [1] , [1] ) // Passes
     * $mol_assert_like( [1] , [1] , [2] ) // Fails because 1 !== 2
     * @see https://mol.hyoo.ru/#!section=docs/=9q9dv3_fgxjsf
     */
    function $mol_assert_equal(...args) {
        for (let i = 1; i < args.length; ++i) {
            if ($mol_compare_deep(args[0], args[i]))
                continue;
            return $mol_fail(new Error(`Equality assertion failure`, { cause: { 0: args[0], [i]: args[i] } }));
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'must be false'() {
            $mol_assert_not(0);
        },
        'must be true'() {
            $mol_assert_ok(1);
        },
        'two must be equal'() {
            $mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $mol_assert_unique([2], [3]);
        },
        'three must be unique'() {
            $mol_assert_unique([1], [2], [3]);
        },
        'two must be alike'() {
            $mol_assert_equal([3], [3]);
        },
        'three must be alike'() {
            $mol_assert_equal([3], [3], [3]);
        },
        'two object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 });
        },
        'three object must be alike'() {
            $mol_assert_equal({ a: 1 }, { a: 1 }, { a: 1 });
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_dom_serialize(node) {
        const serializer = new $mol_dom_context.XMLSerializer;
        return serializer.serializeToString(node);
    }
    $.$mol_dom_serialize = $mol_dom_serialize;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'Make empty div'() {
            $mol_assert_equal(($mol_jsx("div", null)).outerHTML, '<div></div>');
        },
        'Define native field'() {
            const dom = $mol_jsx("input", { value: '123' });
            $mol_assert_equal(dom.outerHTML, '<input value="123">');
            $mol_assert_equal(dom.value, '123');
        },
        'Define classes'() {
            const dom = $mol_jsx("div", { class: 'foo bar' });
            $mol_assert_equal(dom.outerHTML, '<div class="foo bar"></div>');
        },
        'Define styles'() {
            const dom = $mol_jsx("div", { style: { color: 'red' } });
            $mol_assert_equal(dom.outerHTML, '<div style="color: red;"></div>');
        },
        'Define dataset'() {
            const dom = $mol_jsx("div", { dataset: { foo: 'bar' } });
            $mol_assert_equal(dom.outerHTML, '<div data-foo="bar"></div>');
        },
        'Define attributes'() {
            const dom = $mol_jsx("div", { lang: "ru", hidden: true });
            $mol_assert_equal(dom.outerHTML, '<div lang="ru" hidden=""></div>');
        },
        'Define child nodes'() {
            const dom = $mol_jsx("div", null,
                "hello",
                $mol_jsx("strong", null, "world"),
                "!");
            $mol_assert_equal(dom.outerHTML, '<div>hello<strong>world</strong>!</div>');
        },
        'Make fragment'() {
            const dom = $mol_jsx($mol_jsx_frag, null,
                $mol_jsx("br", null),
                $mol_jsx("hr", null));
            $mol_assert_equal($mol_dom_serialize(dom), '<br xmlns="http://www.w3.org/1999/xhtml" /><hr xmlns="http://www.w3.org/1999/xhtml" />');
        },
        'Spread fragment'() {
            const dom = $mol_jsx("div", null,
                $mol_jsx($mol_jsx_frag, null,
                    $mol_jsx("br", null),
                    $mol_jsx("hr", null)));
            $mol_assert_equal(dom.outerHTML, '<div><br><hr></div>');
        },
        'Function as component'() {
            const Button = (props, target) => {
                return $mol_jsx("button", { title: props.hint }, target());
            };
            const dom = $mol_jsx(Button, { id: "foo", hint: "click me" }, () => 'hey!');
            $mol_assert_equal(dom.outerHTML, '<button id="foo" title="click me" class="Button">hey!</button>');
        },
        'Nested guid generation'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "bar" },
                        $mol_jsx("img", { id: "icon" })));
            };
            const Bar = (props, icon) => {
                return $mol_jsx("span", null,
                    icon,
                    $mol_jsx("i", { id: "label" }));
            };
            const dom = $mol_jsx(Foo, { id: "foo" });
            $mol_assert_equal(dom.outerHTML, '<div id="foo" class="Foo"><span id="foo/bar" class="Foo_bar Bar"><img id="foo/icon" class="Foo_icon"><i id="foo/bar/label" class="Foo_bar_label Bar_label"></i></span></div>');
        },
        'Fail on non unique ids'() {
            const App = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("span", { id: "bar" }),
                    $mol_jsx("span", { id: "bar" }));
            };
            $mol_assert_fail(() => $mol_jsx(App, { id: "foo" }), 'JSX already has tag with id "foo/bar"');
        },
        'Owner based guid generationn'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx(Bar, { id: "middle", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            const dom = $mol_jsx(Foo, { id: "app" });
            $mol_assert_equal(dom.outerHTML, '<div id="app" class="Foo"><span id="app/middle" class="Foo_middle Bar"><img id="app/icon" class="Foo_icon"></span></div>');
        },
        'Fail on same ids from different caller'() {
            const Foo = () => {
                return $mol_jsx("div", null,
                    $mol_jsx("img", { id: "icon" }),
                    $mol_jsx(Bar, { id: "bar", icon: () => $mol_jsx("img", { id: "icon" }) }));
            };
            const Bar = (props) => {
                return $mol_jsx("span", null, props.icon());
            };
            $mol_assert_fail(() => $mol_jsx(Foo, { id: "foo" }), 'JSX already has tag with id "foo/icon"');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'get'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal(proxy.foo, 777);
        },
        'has'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_equal('foo' in proxy, true);
        },
        'set'() {
            const target = { foo: 777 };
            const proxy = $mol_delegate({}, () => target);
            proxy.foo = 123;
            $mol_assert_equal(target.foo, 123);
        },
        'getOwnPropertyDescriptor'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777 }));
            $mol_assert_like(Object.getOwnPropertyDescriptor(proxy, 'foo'), {
                value: 777,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        },
        'ownKeys'() {
            const proxy = $mol_delegate({}, () => ({ foo: 777, [Symbol.toStringTag]: 'bar' }));
            $mol_assert_like(Reflect.ownKeys(proxy), ['foo', Symbol.toStringTag]);
        },
        'getPrototypeOf'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_equal(Object.getPrototypeOf(proxy), Foo.prototype);
        },
        'setPrototypeOf'() {
            class Foo {
            }
            const target = {};
            const proxy = $mol_delegate({}, () => target);
            Object.setPrototypeOf(proxy, Foo.prototype);
            $mol_assert_equal(Object.getPrototypeOf(target), Foo.prototype);
        },
        'instanceof'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
        'autobind'() {
            class Foo {
            }
            const proxy = $mol_delegate({}, () => new Foo);
            $mol_assert_ok(proxy instanceof Foo);
            $mol_assert_ok(proxy instanceof $mol_delegate);
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_log3_come = () => { };
        $.$mol_log3_done = () => { };
        $.$mol_log3_fail = () => { };
        $.$mol_log3_warn = () => { };
        $.$mol_log3_rise = () => { };
        $.$mol_log3_area = () => () => { };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'FQN of anon function'($) {
            const $$ = Object.assign($, { $mol_func_name_test: (() => () => { })() });
            $mol_assert_equal($$.$mol_func_name_test.name, '');
            $mol_assert_equal($$.$mol_func_name($$.$mol_func_name_test), '$mol_func_name_test');
            $mol_assert_equal($$.$mol_func_name_test.name, '$mol_func_name_test');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'init with overload'() {
            class X extends $mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $mol_assert_equal(x.foo(), 2);
        },
        'Context in instance inherits from class'($) {
            const custom = $.$mol_ambient({});
            class X extends $.$mol_object {
                static $ = custom;
            }
            $mol_assert_equal(new X().$, custom);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Collect deps'() {
            const pub1 = new $mol_wire_pub;
            const pub2 = new $mol_wire_pub;
            const sub = new $mol_wire_pub_sub;
            const bu1 = sub.track_on();
            try {
                pub1.promote();
                pub2.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu1);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub2, pub2]);
            const bu2 = sub.track_on();
            try {
                pub1.promote();
                pub1.promote();
                pub2.promote();
            }
            finally {
                sub.track_cut();
                sub.track_off(bu2);
            }
            pub1.emit();
            pub2.emit();
            $mol_assert_like(sub.pub_list, [pub1, pub1, pub2]);
        },
        'cyclic detection'($) {
            const sub1 = new $mol_wire_pub_sub;
            const sub2 = new $mol_wire_pub_sub;
            const bu1 = sub1.track_on();
            try {
                const bu2 = sub2.track_on();
                try {
                    $mol_assert_fail(() => sub1.promote(), 'Circular subscription');
                }
                finally {
                    sub2.track_cut();
                    sub2.track_off(bu2);
                }
            }
            finally {
                sub1.track_cut();
                sub1.track_off(bu1);
            }
        },
    });
})($ || ($ = {}));

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
    class $mol_after_mock_commmon extends $mol_object2 {
        task;
        promise = Promise.resolve();
        cancelled = false;
        id;
        constructor(task) {
            super();
            this.task = task;
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
        delay;
        constructor(delay, task) {
            super(task);
            this.delay = delay;
        }
    }
    $.$mol_after_mock_timeout = $mol_after_mock_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_tick = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Sync execution'() {
            class Sync extends $mol_object2 {
                static calc(a, b) {
                    return a + b;
                }
            }
            __decorate([
                $mol_wire_method
            ], Sync, "calc", null);
            $mol_assert_equal(Sync.calc(1, 2), 3);
        },
        async 'async <=> sync'() {
            class SyncAsync extends $mol_object2 {
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            $mol_assert_equal(await SyncAsync.calc(1, 2), 8);
        },
        async 'Idempotence control'() {
            class Idempotence extends $mol_object2 {
                static logs_idemp = 0;
                static logs_unidemp = 0;
                static log_idemp() {
                    this.logs_idemp += 1;
                }
                static log_unidemp() {
                    this.logs_unidemp += 1;
                }
                static async val(a) {
                    return a;
                }
                static sum(a, b) {
                    this.log_idemp();
                    this.log_unidemp();
                    const syn = $mol_wire_sync(this);
                    return syn.val(a) + syn.val(b);
                }
                static async calc(a, b) {
                    return 5 + await $mol_wire_async(this).sum(a, b);
                }
            }
            __decorate([
                $mol_wire_method
            ], Idempotence, "log_idemp", null);
            $mol_assert_equal(await Idempotence.calc(1, 2), 8);
            $mol_assert_equal(Idempotence.logs_idemp, 1);
            $mol_assert_equal(Idempotence.logs_unidemp, 3);
        },
        async 'Error handling'() {
            class Handle extends $mol_object2 {
                static async sum(a, b) {
                    $mol_fail(new Error('test error ' + (a + b)));
                }
                static check() {
                    try {
                        return $mol_wire_sync(Handle).sum(1, 2);
                    }
                    catch (error) {
                        if ($mol_promise_like(error))
                            $mol_fail_hidden(error);
                        $mol_assert_equal(error.message, 'test error 3');
                    }
                }
            }
            await $mol_wire_async(Handle).check();
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Lazy computed lists with native Array interface. $mol_range2_array is mutable but all derived ranges are immutable. */
    function $mol_range2(item = index => index, size = () => Number.POSITIVE_INFINITY) {
        const source = typeof item === 'function' ? new $mol_range2_array() : item;
        if (typeof item !== 'function') {
            item = index => source[index];
            size = () => source.length;
        }
        return new Proxy(source, {
            get(target, field) {
                if (typeof field === 'string') {
                    if (field === 'length')
                        return size();
                    const index = Number(field);
                    if (index < 0)
                        return undefined;
                    if (index >= size())
                        return undefined;
                    if (index === Math.trunc(index))
                        return item(index);
                }
                return $mol_range2_array.prototype[field];
            },
            set(target, field) {
                return $mol_fail(new TypeError(`Lazy range is read only (trying to set field ${JSON.stringify(field)})`));
            },
            ownKeys(target) {
                return [...Array(size())].map((v, i) => String(i)).concat('length');
            },
            getOwnPropertyDescriptor(target, field) {
                if (field === "length")
                    return {
                        value: size(),
                        writable: true,
                        enumerable: false,
                        configurable: false,
                    };
                const index = Number(field);
                if (index === Math.trunc(index))
                    return {
                        get: () => this.get(target, field, this),
                        enumerable: true,
                        configurable: true,
                    };
                return Object.getOwnPropertyDescriptor(target, field);
            }
        });
    }
    $.$mol_range2 = $mol_range2;
    class $mol_range2_array extends Array {
        // Lazy
        concat(...tail) {
            if (tail.length === 0)
                return this;
            if (tail.length > 1) {
                let list = this;
                for (let item of tail)
                    list = list.concat(item);
                return list;
            }
            return $mol_range2(index => index < this.length ? this[index] : tail[0][index - this.length], () => this.length + tail[0].length);
        }
        // Lazy
        filter(check, context) {
            const filtered = [];
            let cursor = -1;
            return $mol_range2(index => {
                while (cursor < this.length && index >= filtered.length - 1) {
                    const val = this[++cursor];
                    if (check(val, cursor, this))
                        filtered.push(val);
                }
                return filtered[index];
            }, () => cursor < this.length ? Number.POSITIVE_INFINITY : filtered.length);
        }
        // Diligent
        forEach(proceed, context) {
            for (let [key, value] of this.entries())
                proceed.call(context, value, key, this);
        }
        // Lazy
        map(proceed, context) {
            return $mol_range2(index => proceed.call(context, this[index], index, this), () => this.length);
        }
        // Diligent
        reduce(merge, result) {
            let index = 0;
            if (arguments.length === 1) {
                result = this[index++];
            }
            for (; index < this.length; ++index) {
                result = merge(result, this[index], index, this);
            }
            return result;
        }
        // Lazy
        toReversed() {
            return $mol_range2(index => this[this.length - 1 - index], () => this.length);
        }
        // Lazy
        slice(from = 0, to = this.length) {
            return $mol_range2(index => this[from + index], () => Math.min(to, this.length) - from);
        }
        // Lazy
        some(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (check.call(context, this[index], index, this))
                    return true;
            }
            return false;
        }
        every(check, context) {
            for (let index = 0; index < this.length; ++index) {
                if (!check.call(context, this[index], index, this))
                    return false;
            }
            return true;
        }
        reverse() {
            return $mol_fail(new TypeError(`Mutable reverse is forbidden. Use toReversed instead.`));
        }
        sort() {
            return $mol_fail(new TypeError(`Mutable sort is forbidden. Use toSorted instead.`));
        }
        indexOf(needle) {
            return this.findIndex(item => item === needle);
        }
        [Symbol.toPrimitive]() {
            return $mol_guid();
        }
    }
    $.$mol_range2_array = $mol_range2_array;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'lazy calls'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 10);
            $mol_assert_equal(list[-1], undefined);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[9], 9);
            $mol_assert_equal(list[9.5], undefined);
            $mol_assert_equal(list[10], undefined);
            $mol_assert_equal(calls, 2);
        },
        'infinity list'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index));
            $mol_assert_equal(list.length, Number.POSITIVE_INFINITY);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[Number.MAX_SAFE_INTEGER], Number.MAX_SAFE_INTEGER);
            $mol_assert_equal(list[Number.POSITIVE_INFINITY], undefined);
            $mol_assert_equal(calls, 3);
        },
        'stringify'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
            $mol_assert_equal(list.join(';'), '0;1;2;3;4');
        },
        'for-of'() {
            let log = '';
            for (let i of $mol_range2(i => i + 1, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '12345');
        },
        'for-in'() {
            let log = '';
            for (let i in $mol_range2(i => i, () => 5)) {
                log += i;
            }
            $mol_assert_equal(log, '01234');
        },
        'forEach'() {
            let log = '';
            $mol_range2(i => i, () => 5).forEach(i => log += i);
            $mol_assert_equal(log, '01234');
        },
        'reduce'() {
            let calls = 0;
            const list = $mol_range2().slice(1, 6);
            $mol_assert_equal(list.reduce((s, v) => s + v), 15);
            $mol_assert_equal(list.reduce((s, v) => s + v, 5), 20);
        },
        'lazy concat'() {
            let calls1 = 0;
            let calls2 = 0;
            const list = $mol_range2(index => (++calls1, index), () => 5).concat([0, 1, 2, 3, 4], $mol_range2(index => (++calls2, index), () => 5));
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 15);
            $mol_assert_equal(list[0], 0);
            $mol_assert_equal(list[4], 4);
            $mol_assert_equal(list[5], 0);
            $mol_assert_equal(list[9], 4);
            $mol_assert_equal(list[10], 0);
            $mol_assert_equal(list[14], 4);
            $mol_assert_equal(list[15], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy filter'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 15).filter(v => v % 2).slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 1);
            $mol_assert_equal(list[2], 5);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 8);
        },
        'lazy reverse'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).toReversed().slice(0, 3);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 3);
            $mol_assert_equal(list[0], 9);
            $mol_assert_equal(list[2], 7);
            $mol_assert_equal(list[3], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy map'() {
            let calls1 = 0;
            let calls2 = 0;
            const source = $mol_range2(index => (++calls1, index), () => 5);
            const target = source.map((item, index, self) => {
                ++calls2;
                $mol_assert_equal(source, self);
                return index + 10;
            }, () => 5);
            $mol_assert_equal(true, target instanceof Array);
            $mol_assert_equal(target.length, 5);
            $mol_assert_equal(target[0], 10);
            $mol_assert_equal(target[4], 14);
            $mol_assert_equal(target[5], undefined);
            $mol_assert_equal(calls1, 2);
            $mol_assert_equal(calls2, 2);
        },
        'lazy slice'() {
            let calls = 0;
            const list = $mol_range2(index => (++calls, index), () => 10).slice(3, 7);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(list[0], 3);
            $mol_assert_equal(list[3], 6);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'lazy some'() {
            let calls = 0;
            $mol_assert_equal(true, $mol_range2(index => (++calls, index), () => 5).some(v => v >= 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(false, $mol_range2(i => i, () => 0).some(v => true));
            $mol_assert_equal(true, $mol_range2(i => i).some(v => v > 5));
        },
        'lazy every'() {
            let calls = 0;
            $mol_assert_equal(false, $mol_range2(index => (++calls, index), () => 5).every(v => v < 2));
            $mol_assert_equal(calls, 3);
            $mol_assert_equal(true, $mol_range2(i => i, () => 0).every(v => false));
            $mol_assert_equal(false, $mol_range2(i => i).every(v => v < 5));
        },
        'lazyfy'() {
            let calls = 0;
            const list = $mol_range2([0, 1, 2, 3, 4, 5]).map(i => (++calls, i + 10)).slice(2);
            $mol_assert_equal(true, list instanceof Array);
            $mol_assert_equal(list.length, 4);
            $mol_assert_equal(calls, 0);
            $mol_assert_equal(list[0], 12);
            $mol_assert_equal(list[3], 15);
            $mol_assert_equal(list[4], undefined);
            $mol_assert_equal(calls, 2);
        },
        'prevent modification'() {
            const list = $mol_range2(i => i, () => 5);
            $mol_assert_fail(() => list.push(4), TypeError);
            $mol_assert_fail(() => list.pop(), TypeError);
            $mol_assert_fail(() => list.unshift(4), TypeError);
            $mol_assert_fail(() => list.shift(), TypeError);
            $mol_assert_fail(() => list.splice(1, 2), TypeError);
            $mol_assert_fail(() => list[1] = 2, TypeError);
            $mol_assert_fail(() => list.reverse(), TypeError);
            $mol_assert_fail(() => list.sort(), TypeError);
            $mol_assert_equal(list.toString(), '0,1,2,3,4');
        }
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'nulls & undefineds'() {
            $mol_assert_ok($mol_compare_deep(null, null));
            $mol_assert_ok($mol_compare_deep(undefined, undefined));
            $mol_assert_not($mol_compare_deep(undefined, null));
            $mol_assert_not($mol_compare_deep({}, null));
        },
        'number'() {
            $mol_assert_ok($mol_compare_deep(1, 1));
            $mol_assert_ok($mol_compare_deep(Number.NaN, Number.NaN));
            $mol_assert_not($mol_compare_deep(1, 2));
            $mol_assert_ok($mol_compare_deep(Object(1), Object(1)));
            $mol_assert_not($mol_compare_deep(Object(1), Object(2)));
        },
        'POJO'() {
            $mol_assert_ok($mol_compare_deep({}, {}));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { b: 2 }));
            $mol_assert_not($mol_compare_deep({ a: 1 }, { a: 2 }));
            $mol_assert_not($mol_compare_deep({}, { a: undefined }));
            $mol_assert_not($mol_compare_deep({ a: 1, b: 2 }, { b: 2, a: 1 }));
            $mol_assert_ok($mol_compare_deep({ a: { b: 1 } }, { a: { b: 1 } }));
            $mol_assert_ok($mol_compare_deep(Object.create(null), Object.create(null)));
        },
        'Array'() {
            $mol_assert_ok($mol_compare_deep([], []));
            $mol_assert_ok($mol_compare_deep([1, [2]], [1, [2]]));
            $mol_assert_not($mol_compare_deep([1, 2], [1, 3]));
            $mol_assert_not($mol_compare_deep([1, 2,], [1, 3, undefined]));
            $mol_assert_not($mol_compare_deep($mol_range2().slice(0, 0), new Array()));
            $mol_assert_not($mol_compare_deep($mol_range2(), $mol_range2()));
        },
        'Non POJO are different'() {
            class Thing extends Object {
            }
            $mol_assert_not($mol_compare_deep(new Thing, new Thing));
            $mol_assert_not($mol_compare_deep(() => 1, () => 1));
            $mol_assert_not($mol_compare_deep(new RangeError('Test error'), new RangeError('Test error')));
        },
        'POJO with symbols'() {
            const sym = Symbol();
            $mol_assert_ok($mol_compare_deep({ [sym]: true }, { [sym]: true }));
            $mol_assert_not($mol_compare_deep({ [Symbol()]: true }, { [Symbol()]: true }));
        },
        'same POJOs with cyclic reference'() {
            const a = { foo: {} };
            a['self'] = a;
            const b = { foo: {} };
            b['self'] = b;
            $mol_assert_ok($mol_compare_deep(a, b));
        },
        'same POJOs with cyclic reference with cache warmup'() {
            const obj1 = { test: 1, obj3: null };
            const obj1_copy = { test: 1, obj3: null };
            const obj2 = { test: 2, obj1 };
            const obj2_copy = { test: 2, obj1: obj1_copy };
            const obj3 = { test: 3, obj2 };
            const obj3_copy = { test: 3, obj2: obj2_copy };
            obj1.obj3 = obj3;
            obj1_copy.obj3 = obj3_copy;
            // warmup cache
            $mol_assert_not($mol_compare_deep(obj1, {}));
            $mol_assert_not($mol_compare_deep(obj2, {}));
            $mol_assert_not($mol_compare_deep(obj3, {}));
            $mol_assert_ok($mol_compare_deep(obj3, obj3_copy));
        },
        'Date'() {
            $mol_assert_ok($mol_compare_deep(new Date(12345), new Date(12345)));
            $mol_assert_not($mol_compare_deep(new Date(12345), new Date(12346)));
        },
        'RegExp'() {
            $mol_assert_ok($mol_compare_deep(/\x22/mig, /\x22/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x21/mig));
            $mol_assert_not($mol_compare_deep(/\x22/mig, /\x22/mg));
        },
        'Error'() {
            $mol_assert_not($mol_compare_deep(new Error('xxx'), new Error('xxx')));
            const fail = (message) => new Error(message);
            $mol_assert_ok($mol_compare_deep(...['xxx', 'xxx'].map(msg => new Error(msg))));
            $mol_assert_not($mol_compare_deep(...['xxx', 'yyy'].map(msg => new Error(msg))));
        },
        'Map'() {
            $mol_assert_ok($mol_compare_deep(new Map, new Map));
            $mol_assert_ok($mol_compare_deep(new Map([[1, [2]]]), new Map([[1, [2]]])));
            $mol_assert_ok($mol_compare_deep(new Map([[[1], 2]]), new Map([[[1], 2]])));
            $mol_assert_not($mol_compare_deep(new Map([[1, 2]]), new Map([[1, 3]])));
            $mol_assert_not($mol_compare_deep(new Map([[[1], 2]]), new Map([[[3], 2]])));
        },
        'Set'() {
            $mol_assert_ok($mol_compare_deep(new Set, new Set));
            $mol_assert_ok($mol_compare_deep(new Set([1, [2]]), new Set([1, [2]])));
            $mol_assert_not($mol_compare_deep(new Set([1]), new Set([2])));
        },
        'Uint8Array'() {
            $mol_assert_ok($mol_compare_deep(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_deep(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_deep(new Uint8Array([0]), new Uint8Array([1])));
        },
        'DataView'() {
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array().buffer), new DataView(new Uint8Array().buffer)));
            $mol_assert_ok($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([0]).buffer)));
            $mol_assert_not($mol_compare_deep(new DataView(new Uint8Array([0]).buffer), new DataView(new Uint8Array([1]).buffer)));
        },
        'Serializale'() {
            class User {
                name;
                rand;
                constructor(name, rand = Math.random()) {
                    this.name = name;
                    this.rand = rand;
                }
                [Symbol.toPrimitive](mode) {
                    return this.name;
                }
            }
            $mol_assert_ok($mol_compare_deep(new User('Jin'), new User('Jin')));
            $mol_assert_not($mol_compare_deep(new User('Jin'), new User('John')));
        },
        'Iterable'() {
            $mol_assert_ok($mol_compare_deep(new URLSearchParams({ foo: 'bar' }), new URLSearchParams({ foo: 'bar' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx' }), new URLSearchParams({ foo: 'yyy' })));
            $mol_assert_not($mol_compare_deep(new URLSearchParams({ foo: 'xxx', bar: 'yyy' }), new URLSearchParams({ bar: 'yyy', foo: 'xxx' })));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_timeout = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return '';
                }
                static b() {
                    return $mol_wire_async(this).a();
                }
            }
        },
        async 'Latest method calls wins'($) {
            class NameLogger extends $mol_object2 {
                static $ = $;
                static first = [];
                static last = [];
                static send(next) {
                    $mol_wire_sync(this.first).push(next);
                    $$.$mol_wait_timeout(0);
                    this.last.push(next);
                }
            }
            const name = $mol_wire_async(NameLogger).send;
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(NameLogger.first, ['john', 'jin']);
            $mol_assert_equal(NameLogger.last, ['jin']);
        },
        async 'Latest function calls wins'($) {
            const first = [];
            const last = [];
            function send_name(next) {
                $mol_wire_sync(first).push(next);
                $$.$mol_wait_timeout(0);
                last.push(next);
            }
            const name = $mol_wire_async(send_name);
            name('john');
            const promise = name('jin');
            $.$mol_after_mock_warp();
            await promise;
            $mol_assert_equal(first, ['john', 'jin']);
            $mol_assert_equal(last, ['jin']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'test types'($) {
            class A {
                static a() {
                    return Promise.resolve('');
                }
                static b() {
                    return $mol_wire_sync(this).a();
                }
            }
        },
        async 'test method from host'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test function'($) {
            let count = 0;
            class A {
                static a() {
                    return $mol_wire_sync(this.b)();
                }
                static b() { return Promise.resolve(++count); }
            }
            $mol_assert_equal(await $mol_wire_async(A).a(), 1, count);
        },
        async 'test construct itself'($) {
            class A {
                static instances = [];
                static a() {
                    const a = new ($mol_wire_sync(A))();
                    this.instances.push(a);
                    $mol_wire_sync(this).b();
                }
                static b() { return Promise.resolve(); }
            }
            await $mol_wire_async(A).a();
            $mol_assert_equal(A.instances.length, 2);
            $mol_assert_equal(A.instances[0] instanceof A, true);
            $mol_assert_equal(A.instances[0], A.instances[1]);
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_work extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = requestIdleCallback(task, { timeout: delay });
        }
        destructor() {
            cancelIdleCallback(this.id);
        }
    }
    $.$mol_after_work = $mol_after_work;
    if (typeof requestIdleCallback !== 'function') {
        $.$mol_after_work = $mol_after_timeout;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_work = $mol_after_mock_timeout;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_rest_async() {
        return new Promise(done => {
            new this.$mol_after_work(16, () => done(null));
        });
    }
    $.$mol_wait_rest_async = $mol_wait_rest_async;
    function $mol_wait_rest() {
        return this.$mol_wire_sync(this).$mol_wait_rest_async();
    }
    $.$mol_wait_rest = $mol_wait_rest;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_timeout = function $mol_wait_timeout_mock(timeout) { };
            $.$mol_wait_timeout_async = async function $mol_wait_timeout_async_mock(timeout) { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_wait_timeout_async(timeout) {
        const promise = new $mol_promise();
        const task = new this.$mol_after_timeout(timeout, () => promise.done());
        return Object.assign(promise, {
            destructor: () => task.destructor()
        });
    }
    $.$mol_wait_timeout_async = $mol_wait_timeout_async;
    function $mol_wait_timeout(timeout) {
        return this.$mol_wire_sync(this).$mol_wait_timeout_async(timeout);
    }
    $.$mol_wait_timeout = $mol_wait_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test_mocks.push($ => {
            $.$mol_wait_rest = function $mol_wait_rest_mock() { };
            $.$mol_wait_rest_async = async function $mol_wait_rest_async_mock() { };
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        // https://github.com/nin-jin/slides/tree/master/reactivity#component-states
        'Cached channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 2);
            App.value(2);
            $mol_assert_equal(App.value(), 3);
        },
        'Read Pushed'($) {
            class App extends $mol_object2 {
                static $ = $;
                static value(next = 0) {
                    return next;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(1), 1);
            $mol_assert_equal(App.value(), 1);
        },
        'Mem overrides mem'($) {
            class Base extends $mol_object2 {
                static $ = $;
                static value(next = 1) {
                    return next + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Base, "value", null);
            class Middle extends Base {
                static value(next) {
                    return super.value(next) + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], Middle, "value", null);
            class App extends Middle {
                static value(next) {
                    return super.value(next) * 3;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            $mol_assert_equal(App.value(), 9);
            $mol_assert_equal(App.value(5), 21);
            $mol_assert_equal(App.value(), 21);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-consistency
        'Auto recalculation of cached values'($) {
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    return next || 1;
                }
                static yyy() {
                    return this.xxx() + 1;
                }
                static zzz() {
                    return this.yyy() + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            $mol_assert_equal(App.yyy(), 2);
            $mol_assert_equal(App.zzz(), 3);
            App.xxx(5);
            $mol_assert_equal(App.zzz(), 7);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-reasonability
        'Skip recalculation when actually no dependency changes'($) {
            const log = [];
            class App extends $mol_object2 {
                static $ = $;
                static xxx(next) {
                    log.push('xxx');
                    return next || 1;
                }
                static yyy() {
                    log.push('yyy');
                    return [Math.sign(this.xxx())];
                }
                static zzz() {
                    log.push('zzz');
                    return this.yyy()[0] + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "xxx", null);
            __decorate([
                $mol_wire_solo
            ], App, "yyy", null);
            __decorate([
                $mol_wire_solo
            ], App, "zzz", null);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx']);
            App.xxx(5);
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx']);
            App.zzz();
            $mol_assert_like(log, ['zzz', 'yyy', 'xxx', 'xxx', 'yyy']);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#flow-auto
        'Flow: Auto'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static source(next = 1) { return next; }
                static condition(next = true) { return next; }
                static counter = 0;
                static result() {
                    const res = this.condition() ? this.source() : 0;
                    return res + this.counter++;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            $mol_assert_equal(App.counter, 1);
            App.source(10);
            $mol_assert_equal(App.result(), 11);
            $mol_assert_equal(App.counter, 2);
            App.condition(false);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            $mol_wire_fiber.sync();
            $mol_assert_equal(App.source(), 1);
            App.source(20);
            $mol_assert_equal(App.result(), 2);
            $mol_assert_equal(App.counter, 3);
            App.condition(true);
            $mol_assert_equal(App.result(), 23);
            $mol_assert_equal(App.counter, 4);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#dupes-equality
        'Dupes: Equality'($) {
            let counter = 0;
            class App extends $mol_object2 {
                static $ = $;
                static foo(next) {
                    return next ?? { numbs: [1] };
                }
                static bar() {
                    return { ...this.foo(), count: ++counter };
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [1] });
            $mol_assert_like(App.bar(), { numbs: [1], count: 1 });
            App.foo({ numbs: [2] });
            $mol_assert_like(App.bar(), { numbs: [2], count: 2 });
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#cycle-fail
        'Cycle: Fail'($) {
            class App extends $mol_object2 {
                static $ = $;
                static foo() {
                    return this.bar() + 1;
                }
                static bar() {
                    return this.foo() + 1;
                }
                static test() {
                    $mol_assert_fail(() => App.foo(), 'Circular subscription');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "foo", null);
            __decorate([
                $mol_wire_solo
            ], App, "bar", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            App.test();
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Update deps on push'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		@ $mol_wire_solo
        // 		static left( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right( next = false ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static res( next?: boolean ) {
        // 			return this.left( next ) && this.right()
        // 		}
        // 	}
        // 	$mol_assert_equal( App.res(), false )
        // 	$mol_assert_equal( App.res( true ), false )
        // 	$mol_assert_equal( App.right( true ), true )
        // 	$mol_assert_equal( App.res(), true )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Different order of pull and push'($) {
            class App extends $mol_object2 {
                static $ = $;
                static store(next = 0) {
                    return next;
                }
                static fast(next) {
                    return this.store(next);
                }
                static slow(next) {
                    if (next !== undefined)
                        this.slow(); // enforce pull before push
                    return this.store(next);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "store", null);
            __decorate([
                $mol_wire_solo
            ], App, "fast", null);
            __decorate([
                $mol_wire_solo
            ], App, "slow", null);
            App.fast();
            $mol_assert_equal(App.slow(666), 666);
            $mol_assert_equal(App.fast(), App.slow(), 666);
            App.store(777);
            $mol_assert_equal(App.fast(), App.slow(), 777);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        'Actions inside invariant'($) {
            class App extends $mol_object2 {
                static $ = $;
                static count(next = 0) {
                    return next;
                }
                static count2() {
                    return this.count();
                }
                static res() {
                    const count = this.count2();
                    if (!count)
                        this.count(count + 1);
                    return count + 1;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "count", null);
            __decorate([
                $mol_wire_solo
            ], App, "count2", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            $mol_assert_like(App.res(), 1);
            App.count(5);
            $mol_assert_like(App.res(), 6);
        },
        async 'Toggle with async'($) {
            class App extends $mol_object2 {
                static $ = $;
                static checked(next = false) {
                    $$.$mol_wait_timeout(0);
                    return next;
                }
                static toggle() {
                    const prev = this.checked();
                    $mol_assert_unique(this.checked(!prev), prev);
                    // $mol_assert_equal( this.checked() , prev )
                }
                static res() {
                    return this.checked();
                }
                static test() {
                    $mol_assert_equal(App.res(), false);
                    App.toggle();
                    $mol_assert_equal(App.res(), true);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "checked", null);
            __decorate([
                $mol_wire_method
            ], App, "toggle", null);
            __decorate([
                $mol_wire_solo
            ], App, "res", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        // // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        // 'Stable order of multiple root'( $ ) {
        // 	class App extends $mol_object2 {
        // 		static $ = $
        // 		static counter = 0
        // 		@ $mol_wire_solo
        // 		static left_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static left_root() {
        // 			this.left_trigger()
        // 			return ++ this.counter
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_trigger( next = 0 ) {
        // 			return next
        // 		}
        // 		@ $mol_wire_solo
        // 		static right_root() {
        // 			this.right_trigger()
        // 			return ++ this.counter
        // 		}
        // 	}
        // 	$mol_assert_equal( App.left_root(), 1 )
        // 	$mol_assert_equal( App.right_root(), 2 )
        // 	App.right_trigger( 1 )
        // 	App.left_trigger( 1 )
        // 	$mol_wire_fiber.sync()
        // 	$mol_assert_equal( App.right_root(), 4 )
        // 	$mol_assert_equal( App.left_root(), 3 )
        // } ,
        // https://github.com/nin-jin/slides/tree/master/reactivity#error-store
        'Restore after error'($) {
            class App extends $mol_object2 {
                static get $() { return $; }
                static condition(next = false) { return next; }
                static broken() {
                    if (this.condition()) {
                        $mol_fail(new Error('test error'));
                    }
                    return 1;
                }
                static result() {
                    return this.broken();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "condition", null);
            __decorate([
                $mol_wire_solo
            ], App, "broken", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.condition(true);
            $mol_assert_fail(() => App.result(), 'test error');
            App.condition(false);
            $mol_assert_equal(App.result(), 1);
        },
        async 'Wait for data'($) {
            class App extends $mol_object2 {
                static $ = $;
                static async source() {
                    return 'Jin';
                }
                static middle() {
                    return $mol_wire_sync(this).source();
                }
                static target() {
                    return this.middle();
                }
                static test() {
                    $mol_assert_equal(App.target(), 'Jin');
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "middle", null);
            __decorate([
                $mol_wire_solo
            ], App, "target", null);
            __decorate([
                $mol_wire_method
            ], App, "test", null);
            await $mol_wire_async(App).test();
        },
        'Auto destroy on long alone'($) {
            let destroyed = false;
            class App extends $mol_object2 {
                static $ = $;
                static showing(next = true) {
                    return next;
                }
                static details() {
                    return {
                        destructor() {
                            destroyed = true;
                        }
                    };
                }
                static render() {
                    return this.showing() ? this.details() : null;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "showing", null);
            __decorate([
                $mol_wire_solo
            ], App, "details", null);
            __decorate([
                $mol_wire_solo
            ], App, "render", null);
            const details = App.render();
            $mol_assert_ok(details);
            App.showing(false);
            $mol_assert_not(App.render());
            App.showing(true);
            $mol_assert_equal(App.render(), details);
            $mol_wire_fiber.sync();
            $mol_assert_not(destroyed);
            App.showing(false);
            $mol_wire_fiber.sync();
            $mol_assert_ok(destroyed);
            App.showing(true);
            $mol_assert_unique(App.render(), details);
        },
        // https://github.com/nin-jin/slides/tree/master/reactivity#wish-stability
        async 'Hold pubs while wait async task'($) {
            class App extends $mol_object2 {
                static $ = $;
                static counter = 0;
                static resets(next) {
                    return ($mol_wire_probe(() => this.resets()) ?? -1) + 1;
                }
                static async wait() { }
                static value() {
                    return ++this.counter;
                }
                static result() {
                    if (this.resets())
                        $mol_wire_sync(this).wait();
                    return this.value();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "resets", null);
            __decorate([
                $mol_wire_solo
            ], App, "value", null);
            __decorate([
                $mol_wire_solo
            ], App, "result", null);
            $mol_assert_equal(App.result(), 1);
            App.resets(null);
            $mol_wire_fiber.sync();
            $mol_assert_equal(await $mol_wire_async(App).result(), 1);
        },
        async 'Restart awaited task when pub changed'($) {
            const loads = [];
            class App extends $mol_object2 {
                static $ = $;
                static param(next = 0) { return next; }
                /** Snapshots param without subscription, like a request url. */
                static async load() {
                    const param = $mol_wire_probe(() => this.param()) ?? 0;
                    loads.push(param);
                    return param;
                }
                static data() {
                    this.param();
                    return $mol_wire_sync(this).load();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "param", null);
            __decorate([
                $mol_wire_solo
            ], App, "data", null);
            const wait = $mol_wire_async(App).data();
            App.param(1);
            $mol_assert_equal(await $mol_wire_async(App).data(), 1);
            $mol_assert_like(loads, [0, 1]);
            await wait.catch(() => { });
        },
        'Pub outdated by side effect of own check'($) {
            class App extends $mol_object2 {
                static $ = $;
                static trigger(next = 0) { return next; }
                static source(next = 0) { return next; }
                static data() { return this.source(); }
                /** Pushes to `source` without changing own value. */
                static writer() {
                    this.source(this.trigger());
                    return null;
                }
                static view() {
                    const data = this.data();
                    this.writer();
                    return data;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "trigger", null);
            __decorate([
                $mol_wire_solo
            ], App, "source", null);
            __decorate([
                $mol_wire_solo
            ], App, "data", null);
            __decorate([
                $mol_wire_solo
            ], App, "writer", null);
            __decorate([
                $mol_wire_solo
            ], App, "view", null);
            $mol_assert_equal(App.view(), 0);
            App.trigger(1);
            $mol_assert_equal(App.view(), 1);
        },
        /**
         * Like $giper_baza_land.diff_apply destroyed mid-flight: Cursor goes
         * non-tracking while auto still points at the temp → mem read uses
         * once() → task_get → Promo; outer track_cut → Cut. Also leaks auto
         * so later ws onclose / $mol_state_time hit Promo again.
         */
        'Destroy running action does not Promo or Cut'($) {
            class App extends $mol_object2 {
                static $ = $;
                static flag(next = 0) { return next; }
                static work() {
                    const fiber = $mol_wire_auto();
                    fiber.destructor();
                    // channel() → once() while auto was this temp
                    return this.flag();
                }
                static view() {
                    try {
                        this.work();
                        return 'ok';
                    }
                    catch (error) {
                        return error?.message ?? String(error);
                    }
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "flag", null);
            __decorate([
                $mol_wire_method
            ], App, "work", null);
            __decorate([
                $mol_wire_solo
            ], App, "view", null);
            $mol_assert_equal(App.view(), 'ok');
            // auto must not stay as the dead temp (would Promo on once/task_get)
            $mol_assert_equal(App.flag(1), 1);
        },
        'Mutually writing pubs settle their sub'($) {
            class App extends $mol_object2 {
                static $ = $;
                static runs = { left: 0, right: 0 };
                static left_value(next = 0) { return next; }
                static right_value(next = 0) { return next; }
                /** Pushes a new value to the pub of `right` on every run. */
                static left() {
                    this.right_value(++this.runs.left);
                    return this.left_value() > 1e9 ? 1 : 0;
                }
                /** Pushes a new value to the pub of `left` on every run. */
                static right() {
                    this.left_value(++this.runs.right);
                    return this.right_value() > 1e9 ? 1 : 0;
                }
                static view() {
                    return this.left() + this.right();
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "left_value", null);
            __decorate([
                $mol_wire_solo
            ], App, "right_value", null);
            __decorate([
                $mol_wire_solo
            ], App, "left", null);
            __decorate([
                $mol_wire_solo
            ], App, "right", null);
            __decorate([
                $mol_wire_solo
            ], App, "view", null);
            $mol_assert_equal(App.view(), 0);
            const settled = { ...App.runs };
            for (let i = 0; i < 10; ++i)
                $mol_assert_equal(App.view(), 0);
            $mol_assert_like(App.runs, settled);
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static title() {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "title", null);
            $mol_assert_equal(`${App.title()}`, 'App.title<>');
        },
        'Unsubscribe from temp pubs on complete'($) {
            class Random extends $mol_object2 {
                static $ = $;
                static seed() {
                    return Math.random();
                }
                static resets(next) {
                    return Math.random();
                }
                static value() {
                    this.resets();
                    return this.seed();
                }
            }
            __decorate([
                $mol_wire_method
            ], Random, "seed", null);
            __decorate([
                $mol_wire_solo
            ], Random, "resets", null);
            __decorate([
                $mol_wire_solo
            ], Random, "value", null);
            const first = Random.value();
            Random.resets(null);
            $mol_assert_unique(Random.value(), first);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        async 'Error caching'($) {
            const next_cached = 123;
            class Some extends $mol_object2 {
                static $ = $;
                static data(id, next) {
                    if (next)
                        return next;
                    setTimeout(() => {
                        $mol_wire_async(this).data(id, next_cached);
                    }, 10);
                    $mol_fail_hidden(new Promise(() => { }));
                }
                static run() {
                    return this.data('1');
                }
            }
            __decorate([
                $mol_wire_plex
            ], Some, "data", null);
            __decorate([
                $mol_wire_method
            ], Some, "run", null);
            const val = await $mol_wire_async(Some).run();
            $mol_assert_equal(val, next_cached);
        },
        'Memoize by single simple key'($) {
            class Team extends $mol_object2 {
                static $ = $;
                static user_name(user, next) {
                    return next ?? user;
                }
                static user_names() {
                    return [
                        this.user_name('jin'),
                        this.user_name('john'),
                    ];
                }
            }
            __decorate([
                $mol_wire_plex
            ], Team, "user_name", null);
            __decorate([
                $mol_wire_solo
            ], Team, "user_names", null);
            $mol_assert_like(Team.user_names(), ['jin', 'john']);
            Team.user_name('jin', 'JIN');
            $mol_assert_like(Team.user_names(), ['JIN', 'john']);
        },
        'Memoize by single complex key'($) {
            class Map extends $mol_object2 {
                static $ = $;
                static tile(pos) {
                    return new String(`/tile=${pos}`);
                }
                static test() {
                    $mol_assert_like(this.tile([0, 1]), new String('/tile=0,1'));
                    $mol_assert_equal(this.tile([0, 1]), this.tile([0, 1]));
                }
            }
            __decorate([
                $mol_wire_plex
            ], Map, "tile", null);
            __decorate([
                $mol_wire_method
            ], Map, "test", null);
            Map.test();
        },
        'Owned value has js-path name'() {
            class App extends $mol_object2 {
                static like(friend) {
                    return new $mol_object2;
                }
                static relation([friend, props]) {
                    return new $mol_object2;
                }
            }
            __decorate([
                $mol_wire_plex
            ], App, "like", null);
            __decorate([
                $mol_wire_plex
            ], App, "relation", null);
            $mol_assert_equal(`${App.like(123)}`, 'App.like<123>');
            $mol_assert_equal(`${App.relation([123, [456]])}`, 'App.relation<[123,[456]]>');
        },
        'Deep deps'($) {
            class Fib extends $mol_object2 {
                static $ = $;
                static sums = 0;
                static value(index, next) {
                    if (next)
                        return next;
                    if (index < 2)
                        return 1;
                    ++this.sums;
                    return this.value(index - 1) + this.value(index - 2);
                }
            }
            __decorate([
                $mol_wire_plex
            ], Fib, "value", null);
            $mol_assert_equal(Fib.value(4), 5);
            $mol_assert_equal(Fib.sums, 3);
            Fib.value(1, 2);
            $mol_assert_equal(Fib.value(4), 8);
            $mol_assert_equal(Fib.sums, 6);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Previous value'() {
            class Cache extends $mol_object2 {
                static store(next) {
                    if (!next)
                        return {};
                    return {
                        ...$mol_wire_probe(() => this.store()) ?? {},
                        ...next,
                    };
                }
            }
            __decorate([
                $mol_wire_solo
            ], Cache, "store", null);
            $mol_assert_like(Cache.store(), {});
            $mol_assert_like(Cache.store({ foo: 666 }), { foo: 666 });
            $mol_assert_like(Cache.store({ bar: 777 }), { foo: 666, bar: 777 });
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'Primitives'() {
            $mol_assert_equal($mol_key(null), 'null');
            $mol_assert_equal($mol_key(false), 'false');
            $mol_assert_equal($mol_key(true), 'true');
            $mol_assert_equal($mol_key(0), '0');
            $mol_assert_equal($mol_key(1n << 64n), '18446744073709551616n');
            $mol_assert_equal($mol_key(''), '""');
        },
        'Array & POJO'() {
            $mol_assert_equal($mol_key([null]), '[null]');
            $mol_assert_equal($mol_key({ foo: 0 }), '{"foo":0}');
            $mol_assert_equal($mol_key({ foo: [false] }), '{"foo":[false]}');
        },
        'Uint8Array'() {
            $mol_assert_equal($mol_key(new Uint8Array([1, 2])), 'Uint8Array([1,2])');
            $mol_assert_equal($mol_key([new Uint8Array([1, 2])]), '[Uint8Array([1,2])]');
            $mol_assert_equal($mol_key({ foo: new Uint8Array([1, 2]) }), '{"foo":Uint8Array([1,2])}');
        },
        'Function'() {
            const func = () => { };
            $mol_assert_equal($mol_key(func), $mol_key(func));
            $mol_assert_unique($mol_key(func), $mol_key(() => { }));
        },
        'Objects'() {
            class User {
            }
            const jin = new User();
            $mol_assert_equal($mol_key(jin), $mol_key(jin));
            $mol_assert_unique($mol_key(jin), $mol_key(new User()));
        },
        'Elements'() {
            const foo = $mol_jsx("div", null, "bar");
            $mol_assert_equal($mol_key(foo), $mol_key(foo));
            $mol_assert_unique($mol_key(foo), $mol_key($mol_jsx("div", null, "bar")));
        },
        'Custom JSON representation'() {
            class User {
                toJSON() { return 'jin'; }
            }
            $mol_assert_unique([$mol_key(new User)], [$mol_key(new User)]);
        },
        'Custom key handler'() {
            class User {
                name;
                age;
                constructor(name, age) {
                    this.name = name;
                    this.age = age;
                }
                [$mol_key_handle]() { return `User(${JSON.stringify(this.name)})`; }
            }
            $mol_assert_equal($mol_key([new User('jin', 16)]), $mol_key([new User('jin', 18)]), '[User("jin")]');
        },
        'Special native classes'() {
            $mol_assert_equal($mol_key(new Date('xyz')), 'Date(NaN)');
            $mol_assert_equal($mol_key(new Date(12345)), 'Date(12345)');
            $mol_assert_equal($mol_key(/./), '/./');
            $mol_assert_equal($mol_key(/\./gimsu), '/\\./gimsu');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        $.$mol_after_frame = $mol_after_mock_commmon;
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'return result without errors'() {
            $mol_assert_equal($mol_try(() => false), false);
        },
        //'return error if thrown'() {
        //	
        //	const error = new Error( '$mol_try test error' )
        //	$mol_assert_equal( $mol_try( ()=> { throw error } ) , error )
        //	
        //} ,
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => $.$mol_fail_log = () => false);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Watch and logs reactive states. Logger automatically added to test bundle which is adding to `test.html`. */
    class $mol_wire_log extends $mol_object2 {
        static watch(task) {
            return task;
        }
        static track(fiber) {
            const prev = $mol_wire_probe(() => this.track(fiber));
            let next;
            try {
                next = fiber.sync();
            }
            finally {
                for (const pub of fiber.pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
            if (fiber.host === this)
                return next;
            if ($mol_compare_deep(prev, next)) {
                this.$.$mol_log3_rise({
                    message: '💧 Same',
                    place: fiber,
                });
            }
            else if (prev !== undefined) {
                this.$.$mol_log3_rise({
                    message: '🔥 Next',
                    place: fiber,
                    prev,
                });
            }
            return next;
        }
        static active() {
            try {
                this.watch()?.();
            }
            catch (error) {
                $mol_fail_log(error);
            }
            finally {
                for (const pub of $mol_wire_auto().pub_list) {
                    if (pub instanceof $mol_wire_fiber) {
                        this.track(pub);
                    }
                }
            }
        }
    }
    __decorate([
        $mol_mem
    ], $mol_wire_log, "watch", null);
    __decorate([
        $mol_mem_key
    ], $mol_wire_log, "track", null);
    __decorate([
        $mol_mem
    ], $mol_wire_log, "active", null);
    $.$mol_wire_log = $mol_wire_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_wire_log.active();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_encode(src) {
        return src.toBase64();
    }
    $.$mol_base64_encode = $mol_base64_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'encode empty'() {
            $mol_assert_equal($mol_charset_encode(''), new Uint8Array([]));
        },
        'encode 1 octet'() {
            $mol_assert_equal($mol_charset_encode('F'), new Uint8Array([0x46]));
        },
        'encode 2 octet'() {
            $mol_assert_equal($mol_charset_encode('Б'), new Uint8Array([0xd0, 0x91]));
        },
        'encode 3 octet'() {
            $mol_assert_equal($mol_charset_encode('ह'), new Uint8Array([0xe0, 0xa4, 0xb9]));
        },
        'encode 4 octet'() {
            $mol_assert_equal($mol_charset_encode('𐍈'), new Uint8Array([0xf0, 0x90, 0x8d, 0x88]));
        },
        'encode surrogate pair'() {
            $mol_assert_equal($mol_charset_encode('😀'), new Uint8Array([0xf0, 0x9f, 0x98, 0x80]));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function binary_string(bytes) {
        let binary = '';
        if (typeof bytes !== 'string') {
            for (const byte of bytes)
                binary += String.fromCharCode(byte);
        }
        else {
            binary = unescape(encodeURIComponent(bytes));
        }
        return binary;
    }
    function $mol_base64_encode_web(str) {
        return $mol_dom_context.btoa(binary_string(str));
    }
    $.$mol_base64_encode_web = $mol_base64_encode_web;
    if (!('toBase64' in Uint8Array.prototype)) {
        $.$mol_base64_encode = $mol_base64_encode_web;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    $mol_test({
        'base64 encode string'() {
            $mol_assert_equal($mol_base64_encode($mol_charset_encode('Hello, ΧΨΩЫ')), 'SGVsbG8sIM6nzqjOqdCr');
        },
        'base64 encode binary'() {
            $mol_assert_equal($mol_base64_encode(png), 'GgoASUh42g==');
        },
        'base64 encode string with plus'() {
            $mol_assert_equal($mol_base64_encode($mol_charset_encode('шоешпо')), '0YjQvtC10YjQv9C+');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode(base64) {
        return Uint8Array.fromBase64(base64);
    }
    $.$mol_base64_decode = $mol_base64_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_decode_web(base64Str) {
        const buf = Uint8Array.from($mol_dom_context.atob(base64Str), c => c.charCodeAt(0));
        return buf;
    }
    $.$mol_base64_decode_web = $mol_base64_decode_web;
    if (!('fromBase64' in Uint8Array)) {
        $.$mol_base64_decode = $mol_base64_decode_web;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const png = new Uint8Array([0x1a, 0x0a, 0x00, 0x49, 0x48, 0x78, 0xda]);
    const with_plus = new TextEncoder().encode('шоешпо');
    $mol_test({
        'base64 decode string'() {
            $mol_assert_equal($mol_base64_decode('SGVsbG8sIM6nzqjOqdCr'), new TextEncoder().encode('Hello, ΧΨΩЫ'));
        },
        'base64 decode binary'() {
            $mol_assert_equal($mol_base64_decode('GgoASUh42g=='), png);
        },
        'base64 decode binary - without equals'() {
            $mol_assert_equal($mol_base64_decode('GgoASUh42g'), png);
        },
        'base64 decode with plus'() {
            $mol_assert_equal($mol_base64_decode('0YjQvtC10YjQv9C+'), with_plus);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_ae_encode(buffer) {
        return $mol_base64_encode(buffer).replace(/\+/g, 'æ').replace(/\//g, 'Æ').replace(/=/g, '');
    }
    $.$mol_base64_ae_encode = $mol_base64_ae_encode;
    function $mol_base64_ae_decode(str) {
        return $mol_base64_decode(str.replace(/æ/g, '+').replace(/Æ/g, '/'));
    }
    $.$mol_base64_ae_decode = $mol_base64_ae_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_crypto_native = crypto;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let sponge = new Uint32Array(80);
    /** Fast small sync SHA-1 (20 bytes, 160 bits) */
    function $mol_crypto2_hash(input) {
        const data = input instanceof Uint8Array
            ? input
            : new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
        const bits = data.byteLength << 3;
        const kbits = bits >> 5;
        const kword = 0x80 << (24 - bits & 0b11111);
        const bytes = 16 + ((bits + 64) >>> 9 << 4);
        const klens = bytes - 1;
        const wlen = data.byteLength >> 2 << 2;
        let tail = 0;
        for (let i = wlen; i < data.length; ++i) {
            tail |= data[i] << ((3 - i & 0b11) << 3);
        }
        // Initial
        const hash = new Int32Array([1732584193, -271733879, -1732584194, 271733878, -1009589776]);
        // Digest
        for (let i = 0; i < bytes; i += 16) {
            let h0 = hash[0];
            let h1 = hash[1];
            let h2 = hash[2];
            let h3 = hash[3];
            let h4 = hash[4];
            for (let j = 0; j < 16; ++j) {
                const k = i + j;
                if (k === klens) {
                    sponge[j] = bits;
                }
                else {
                    const pos = k << 2;
                    let word = pos === wlen ? tail :
                        pos > wlen ? 0 :
                            (data[pos] << 24 | data[pos + 1] << 16 | data[pos + 2] << 8 | data[pos + 3]);
                    if (k === kbits)
                        word |= kword;
                    sponge[j] = word;
                }
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 16; j < 20; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | ~h1 & h3) + 1518500249 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 20; j < 40; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) + 1859775393 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 40; j < 60; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 & h2 | h1 & h3 | h2 & h3) - 1894007588 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            for (let j = 60; j < 80; ++j) {
                const shuffle = sponge[j - 3] ^ sponge[j - 8] ^ sponge[j - 14] ^ sponge[j - 16];
                sponge[j] = shuffle << 1 | shuffle >>> 31;
                const next = ((h1 ^ h2 ^ h3) - 899497514 + h4 + (sponge[j] >>> 0) + ((h0 << 5) | (h0 >>> 27))) | 0;
                h4 = h3;
                h3 = h2;
                h2 = (h1 << 30) | (h1 >>> 2);
                h1 = h0;
                h0 = next;
            }
            hash[0] += h0;
            hash[1] += h1;
            hash[2] += h2;
            hash[3] += h3;
            hash[4] += h4;
        }
        for (let i = 0; i < 20; ++i) {
            const word = hash[i];
            hash[i] = word << 24 | word << 8 & 0xFF0000 | word >>> 8 & 0xFF00 | word >>> 24 & 0xFF; // BE -> LE
        }
        return new Uint8Array(hash.buffer);
    }
    $.$mol_crypto2_hash = $mol_crypto2_hash;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([])), new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]));
        },
        'three bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([255, 254, 253])), new Uint8Array([240, 150, 38, 243, 255, 128, 96, 0, 72, 215, 207, 228, 19, 149, 113, 52, 2, 125, 27, 77]));
        },
        'six bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([0, 255, 10, 250, 32, 128])), new Uint8Array([23, 25, 155, 181, 46, 200, 221, 83, 254, 0, 166, 68, 91, 255, 67, 140, 114, 88, 218, 155]));
        },
        'seven bytes hash'() {
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array([1, 2, 3, 4, 5, 6, 7])), new Uint8Array([140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197]));
        },
        'unaligned hash'() {
            const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);
            $mol_assert_equal($mol_crypto2_hash(new Uint8Array(data.buffer, 1, 7)), new Uint8Array([140, 31, 40, 252, 47, 72, 194, 113, 214, 196, 152, 240, 242, 73, 205, 222, 54, 92, 84, 197]));
        },
        async 'reference'() {
            const data = new Uint8Array([255, 254, 253]);
            $mol_assert_equal($mol_crypto2_hash(data), new Uint8Array(await $mol_crypto_native.subtle.digest('SHA-1', data)));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_buffer extends DataView {
        [Symbol.toStringTag] = this.constructor.name + '<>';
        static from(array) {
            if (typeof array === 'number')
                array = new Uint8Array(array);
            if (typeof array === 'string')
                array = $mol_base64_ae_decode(array);
            if (!ArrayBuffer.isView(array))
                array = new Uint8Array(array);
            return new this(array.buffer, array.byteOffset, array.byteLength);
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        getUint48(offset, LE = false) {
            if (offset % 4) {
                return this.getUint16(offset, LE) + this.getUint32(offset + 2, LE) * 2 ** 16;
            }
            else {
                return this.getUint32(offset, LE) + this.getUint16(offset + 4, LE) * 2 ** 32;
            }
        }
        setUint48(offset, value, LE = false) {
            if (offset % 4) {
                this.setUint16(offset, value & ((1 << 16) - 1), LE);
                this.setUint32(offset + 2, (value / 2 ** 16) | 0, LE);
            }
            else {
                this.setUint32(offset, value | 0, LE);
                this.setUint16(offset + 4, (value / 2 ** 32) | 0, LE);
            }
        }
        /** 1-byte signed integer channel for offset. */
        int8(offset, next) {
            if (next === undefined)
                return this.getInt8(offset);
            if (next >= -(2 ** 7) && next < 2 ** 7)
                return this.setInt8(offset, next), next;
            $mol_fail(new Error(`Wrong int8 value ${next}`));
        }
        /** 1-byte unsigned integer channel for offset. */
        uint8(offset, next) {
            if (next === undefined)
                return this.getUint8(offset);
            if (next >= 0 && next < 2 ** 8)
                return this.setUint8(offset, next), next;
            $mol_fail(new Error(`Wrong uint8 value ${next}`));
        }
        /** 2-byte signed integer little-endian channel for offset. */
        int16(offset, next) {
            if (next === undefined)
                return this.getInt16(offset, true);
            if (next >= -(2 ** 15) && next < 2 ** 15)
                return this.setInt16(offset, next, true), next;
            $mol_fail(new Error(`Wrong int16 value ${next}`));
        }
        /** 2-byte unsigned integer little-endian channel for offset. */
        uint16(offset, next) {
            if (next === undefined)
                return this.getUint16(offset, true);
            if (next >= 0 && next < 2 ** 16)
                return this.setUint16(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint16 value ${next}`));
        }
        /** 4-byte signed integer little-endian channel for offset. */
        int32(offset, next) {
            if (next === undefined)
                return this.getInt32(offset, true);
            if (next >= -(2 ** 31) && next < 2 ** 31)
                return this.setInt32(offset, next, true), next;
            $mol_fail(new Error(`Wrong int32 value ${next}`));
        }
        /** 4-byte unsigned integer little-endian channel for offset. */
        uint32(offset, next) {
            if (next === undefined)
                return this.getUint32(offset, true);
            if (next >= 0 && next < 2 ** 32)
                return this.setUint32(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint32 value ${next}`));
        }
        /** 8-byte signed integer little-endian channel for offset. */
        int64(offset, next) {
            if (next === undefined)
                return this.getBigInt64(offset, true);
            if (next >= -(2n ** 63n) && next < 2n ** 63n)
                return this.setBigInt64(offset, next, true), next;
            $mol_fail(new Error(`Wrong int64 value ${next}`));
        }
        /** 6-byte unsigned integer little-endian channel for offset. */
        uint48(offset, next) {
            if (next === undefined)
                return this.getUint48(offset, true);
            if (next >= 0 && next < 2 ** 48)
                return this.setUint48(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint48 value ${next}`));
        }
        /** 8-byte unsigned integer little-endian channel for offset. */
        uint64(offset, next) {
            if (next === undefined)
                return this.getBigUint64(offset, true);
            if (next >= 0n && next < 2n ** 64n)
                return this.setBigUint64(offset, next, true), next;
            $mol_fail(new Error(`Wrong uint64 value ${next}`));
        }
        /** 2-byte float little-endian channel for offset. */
        float16(offset, next) {
            if (next !== undefined)
                this.setFloat16(offset, next, true);
            return this.getFloat16(offset, true);
        }
        /** 4-byte float little-endian channel for offset. */
        float32(offset, next) {
            if (next !== undefined)
                this.setFloat32(offset, next, true);
            return this.getFloat32(offset, true);
        }
        /** 8-byte float little-endian channel for offset. */
        float64(offset, next) {
            if (next !== undefined)
                this.setFloat64(offset, next, true);
            return this.getFloat64(offset, true);
        }
        mix(mixin) {
            const arr = this.asArray();
            for (let i = 0; i < mixin.length; ++i)
                arr[i % arr.byteLength] ^= mixin[i];
            return this;
        }
        /** A Uint8Array view for the same buffer. */
        asArray() {
            return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
        }
        /** base64ae string from buffer. */
        toString() {
            return $mol_base64_ae_encode(this.asArray());
        }
    }
    $.$mol_buffer = $mol_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'run callback'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            $mol_assert_equal(Plus1.run(() => 2), 3);
        },
        'wrap function'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            const obj = {
                level: 2,
                pow: Plus1.func(function (a) {
                    return a ** this.level;
                })
            };
            $mol_assert_equal(obj.pow(2), 5);
        },
        'decorate field getter'() {
            class Plus1 extends $mol_wrapper {
                static last = 0;
                static wrap(task) {
                    return function (...args) {
                        return Plus1.last = (task.call(this, ...args) || 0) + 1;
                    };
                }
            }
            class Foo {
                static get two() {
                    return 1;
                }
                static set two(next) { }
            }
            __decorate([
                Plus1.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Plus1.last, 2);
            $mol_assert_equal(Foo.two, 2);
        },
        'decorate instance method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo1 {
                level = 2;
                pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo1.prototype, "pow", null);
            const Foo2 = Foo1;
            const foo = new Foo2;
            $mol_assert_equal(foo.pow(2), 5);
        },
        'decorate static method'() {
            class Plus1 extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        return task.call(this, ...args) + 1;
                    };
                }
            }
            class Foo {
                static level = 2;
                static pow(a) {
                    return a ** this.level;
                }
            }
            __decorate([
                Plus1.method
            ], Foo, "pow", null);
            $mol_assert_equal(Foo.pow(2), 5);
        },
        'decorate class'() {
            class BarInc extends $mol_wrapper {
                static wrap(task) {
                    return function (...args) {
                        const foo = task.call(this, ...args);
                        foo.bar++;
                        return foo;
                    };
                }
            }
            let Foo = class Foo {
                bar;
                constructor(bar) {
                    this.bar = bar;
                }
            };
            Foo = __decorate([
                BarInc.class
            ], Foo);
            $mol_assert_equal(new Foo(2).bar, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'memoize field'() {
            class Foo {
                static one = 1;
                static get two() {
                    return ++this.one;
                }
                static set two(next) { }
            }
            __decorate([
                $mol_memo.field
            ], Foo, "two", null);
            $mol_assert_equal(Foo.two, 2);
            $mol_assert_equal(Foo.two, 2);
            Foo.two = 3;
            $mol_assert_equal(Foo.two, 3);
            $mol_assert_equal(Foo.two, 3);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_memo_key extends $mol_wrapper {
        static wrap(task) {
            const store = new WeakMap();
            const fun = function (key, next) {
                let store2 = store.get(this ?? fun);
                if (!store2)
                    store.set(this ?? fun, store2 = new Map);
                const key_str = $mol_key(key);
                if (next === undefined && store2.has(key_str))
                    return store2.get(key_str);
                const val = task.call(this, key, next) ?? next;
                store2.set(key_str, val);
                return val;
            };
            Reflect.defineProperty(fun, 'name', { value: task.name + ' ' });
            return fun;
        }
    }
    $.$mol_memo_key = $mol_memo_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_any extends Object {
        static [Symbol.toStringTag];
        static [$mol_key_handle]() {
            return this.toString();
        }
        /** Short user-readable identity. */
        static toString() {
            return $$.$mol_func_name(this);
        }
        /** Type-predicate that checks value by schema. */
        static check(value) {
            try {
                this.guard(value);
                return true;
            }
            catch (error) {
                return false;
            }
        }
        /** `instanceof` support */
        static [Symbol.hasInstance](value) {
            return this.check(value);
        }
        /** Type-parser that fails of wrong values. */
        static guard(value) {
            return value;
        }
        /** Type-caster that normalizes wrong values. */
        static cast(value) {
            try {
                this.guard(value);
                return value;
            }
            catch (error) {
                return this.default;
            }
        }
        /** Default value which conforms schema. */
        static default = null;
    }
    $.$mol_schema_any = $mol_schema_any;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_float extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'number')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static default = Number.NaN;
    }
    $.$mol_schema_float = $mol_schema_float;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Float schema"($) {
                $mol_assert_equal('$mol_schema_float', $mol_schema_float + '', $mol_key($mol_schema_float));
                $mol_assert_equal(true, $mol_schema_float.check(0));
                $mol_assert_equal(true, $mol_schema_float.check(Number.NaN));
                $mol_assert_equal(true, $mol_schema_float.check(Number.POSITIVE_INFINITY));
                $mol_assert_equal(false, $mol_schema_float.check(null));
                $mol_assert_equal(1.5, $mol_schema_float.cast(1.5));
                $mol_assert_equal(Number.NaN, $mol_schema_float.cast('0'));
                $mol_assert_equal(Number.EPSILON, $mol_schema_float.guard(Number.EPSILON));
                $mol_assert_fail(() => $mol_schema_float.guard('0'), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_string extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'string')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static cast(value) {
            return super.cast(value);
        }
        static default = '';
    }
    $.$mol_schema_string = $mol_schema_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "String schema"($) {
                $mol_assert_equal('$mol_schema_string', $mol_schema_string + '', $mol_key($mol_schema_string));
                $mol_assert_equal(true, $mol_schema_string.check('foo'));
                $mol_assert_equal(false, $mol_schema_string.check(123));
                $mol_assert_equal('foo', $mol_schema_string.cast('foo'));
                $mol_assert_equal('', $mol_schema_string.cast(123));
                $mol_assert_equal('foo', $mol_schema_string.guard('foo'));
                $mol_assert_fail(() => $mol_schema_string.guard(123), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_maybe = $mol_memo_key.func(function $mol_schema_maybe(Some) {
        return class $mol_schema_maybe_ extends $mol_schema_any {
            static Some = Some;
            static toString() {
                if (this !== $mol_schema_maybe_)
                    return super.toString();
                return '$mol_schema_maybe<' + $mol_key(Some) + '>';
            }
            static guard(value) {
                if (value == null)
                    return value;
                return Some.guard(value);
            }
            static default = null;
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of maybe schema"($) {
                $mol_assert_equal($mol_schema_maybe($mol_schema_float), $mol_schema_maybe($mol_schema_float));
                $mol_assert_unique($mol_schema_maybe($mol_schema_float), $mol_schema_maybe($mol_schema_string));
            },
            "Optional value"($) {
                const Config = $mol_schema_maybe($mol_schema_string);
                $mol_assert_equal('$mol_schema_maybe<$mol_schema_string>', Config + '');
                $mol_assert_equal(true, Config.check('foo'));
                $mol_assert_equal(true, Config.check(undefined));
                $mol_assert_equal(true, Config.check(null));
                $mol_assert_equal(false, Config.check(0));
                $mol_assert_equal('foo', Config.cast('foo'));
                $mol_assert_equal(undefined, Config.cast(undefined));
                $mol_assert_equal(null, Config.cast(null));
                $mol_assert_equal(null, Config.cast(0));
                $mol_assert_equal('foo', Config.guard('foo'));
                $mol_assert_fail(() => Config.guard(123), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_instance = $mol_memo_key.func(function $mol_schema_instance(Class) {
        class $mol_schema_instance_ extends $mol_schema_any {
            static Class = Class;
            static toString() {
                if (this !== $mol_schema_instance_)
                    return super.toString();
                return '$mol_schema_instance<' + $$.$mol_func_name(Class) + '>';
            }
            static guard(value) {
                if (value != null && Object(value) instanceof Class)
                    return value;
                return $mol_fail(new TypeError('Wrong class', { cause: { value, schema: this } }));
            }
            static cast(value) {
                return this.guard(value);
            }
            static default;
        }
        return ((Class?.[Symbol.hasInstance] === $mol_schema_any[Symbol.hasInstance])
            ? Class
            : $mol_schema_instance_);
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of instance schema"($) {
                $mol_assert_equal($mol_schema_instance(Uint8Array), $mol_schema_instance(Uint8Array));
                $mol_assert_unique($mol_schema_instance(Uint8Array), $mol_schema_instance(Int8Array));
            },
            "Class instance schema"($) {
                const Blob = $mol_schema_instance(Uint8Array);
                $mol_assert_equal('$mol_schema_instance<Uint8Array>', Blob + '', $mol_key(Blob));
                $mol_assert_equal(true, Blob.check(new Uint8Array));
                $mol_assert_equal(false, Blob.check(new Int8Array));
                $mol_assert_equal(false, Blob.check(null));
                $mol_assert_equal(new Uint8Array([0, 1]), Blob.cast(new Uint8Array([0, 1])));
                $mol_assert_fail(() => Blob.cast(new Int8Array), 'Wrong class');
                $mol_assert_equal(new Uint8Array, Blob.guard(new Uint8Array));
                $mol_assert_fail(() => Blob.guard(new Int8Array), 'Wrong class');
            },
            "Boxed instance schema"($) {
                const Str = $mol_schema_instance(String);
                $mol_assert_equal('$mol_schema_instance<String>', Str + '', $mol_key(Str));
                $mol_assert_equal(true, Str.check(Object('')));
                $mol_assert_equal(true, Str.check(''));
                $mol_assert_equal(true, Object('') instanceof Str);
            },
            "Schema instance schema"($) {
                const Str = $mol_schema_instance($mol_schema_instance(String));
                $mol_assert_equal('$mol_schema_instance<String>', Str + '', $mol_key(Str));
                $mol_assert_equal(true, Str.check(Object('')));
                $mol_assert_equal(true, Str.check(''));
                $mol_assert_equal(true, Object('') instanceof Str);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_link_compare(left, right) {
        return (right.str > left.str ? 1 : right.str < left.str ? -1 : 0);
    }
    $.$giper_baza_link_compare = $giper_baza_link_compare;
    const regexp = /(?<![\p{L}_])(?:(?:[a-zæA-ZÆ0-9]{8})?_){0,3}(?:[a-zæA-ZÆ0-9]{8})(?![\p{L}_])/gu;
    class $giper_baza_link extends Object {
        str;
        constructor(str) {
            super();
            this.str = str;
            const short = str.replace(/AAAAAAAA/g, '').replace(/_+$/, '');
            const found = short && (short.match(regexp)?.[0] ?? null);
            if (found !== short)
                $mol_fail(new Error('Wrong Link', { cause: str }));
            this.str = found;
        }
        static [Symbol.match](str) {
            return str.match(regexp);
        }
        static [Symbol.matchAll](str) {
            return str.matchAll(regexp);
        }
        static hole = new this('');
        static check(val) {
            try {
                return new this(val);
            }
            catch {
                return null;
            }
        }
        [$mol_key_handle]() {
            return this.str;
        }
        toString() {
            return this.str;
        }
        toJSON() {
            return this.str;
        }
        [Symbol.toPrimitive]() {
            return this.str;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({ 'color': 'darkorange' }, this.str || '_');
        }
        _bin = null;
        /** Binary representation (6/12/18/24 bytes). */
        toBin() {
            if (this._bin)
                return this._bin;
            const str = this.relate(_base).str;
            const norm = str && str
                .replace(/^___/, '')
                .split('_')
                .map(numb => numb || 'AAAAAAAA')
                .join('');
            return this._bin = $mol_base64_ae_decode(norm);
        }
        /** Make from integer (6 bytes). */
        static from_int(int) {
            const bin = new Uint8Array(new BigUint64Array([BigInt(int)]).buffer, 0, 6);
            const link = new this($mol_base64_ae_encode(bin));
            link._bin = bin;
            return link;
        }
        /** Read from binary (6/12/18/24 bytes). */
        static from_bin(bin) {
            const str = [...$mol_base64_ae_encode(bin).match(/(.{8})/g) ?? []].join('_');
            const link = new this(str).resolve(_base);
            link._bin = bin;
            return link;
        }
        static _hash_cache = new WeakMap();
        /** Make hash from binary (12 bytes). */
        static hash_bin(bin) {
            let link = this._hash_cache.get(bin);
            if (link)
                return link;
            const hash = $mol_crypto2_hash(bin);
            link = this.from_bin(new Uint8Array(hash.buffer, 0, 12));
            this._hash_cache.set(bin, link);
            return link;
        }
        /** Make hash from string (12 bytes). */
        static hash_str(str) {
            return this.hash_bin($mol_charset_encode(str));
        }
        /** Land-local Peer id. */
        peer() {
            return new $giper_baza_link(this.str.split('_')[0] ?? '');
        }
        /** Lord-local Area id. */
        area() {
            return new $giper_baza_link(this.str.split('_')[2] ?? '');
        }
        /** Land-local Head id. */
        head() {
            return new $giper_baza_link(this.str.split('_')[3] ?? '');
        }
        /** Link to Lord Home. */
        lord() {
            return new $giper_baza_link(this.str.split('_').slice(0, 2).join('_'));
        }
        /** Link to Land Root. */
        land() {
            return new $giper_baza_link(this.str.split('_').slice(0, 3).join('_'));
        }
        /** Pawn Link relative to base Land: `___QWERTYUI` */
        relate(base) {
            if (base.str === '')
                return this;
            base = base.land();
            if (this.land().str !== base.str)
                return this;
            const head = this.head();
            return new $giper_baza_link('___' + head);
        }
        /** Absolute Pawn Link from relative (`___QWERTYUI`) using base Land Link. */
        resolve(base) {
            if (base.str === '')
                return this;
            if (this.str === '')
                return base.land();
            if (this.str.length > 16)
                return this;
            const parts = base.land().toString().split('_');
            while (parts.length < 3)
                parts.push('');
            parts.push(this.str.replace(/^___/, ''));
            return new $giper_baza_link(parts.join('_'));
        }
        mix(mixin) {
            if (mixin instanceof $giper_baza_link)
                mixin = mixin.toBin();
            const mixout = $mol_buffer.from(this.toBin().slice());
            mixout.mix(mixin);
            return mixout.asArray();
        }
    }
    $.$giper_baza_link = $giper_baza_link;
    let _base = $giper_baza_link.hole;
    function $giper_baza_link_base(base, task) {
        const prev = _base;
        _base = base;
        try {
            return task();
        }
        finally {
            _base = prev;
        }
    }
    $.$giper_baza_link_base = $giper_baza_link_base;
    $.$giper_baza_link_schema = $mol_schema_maybe($mol_schema_instance($giper_baza_link));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Validation"($) {
                $mol_assert_fail(() => new $giper_baza_link('qwertyui_asdfghjk123'), 'Wrong Link');
            },
            "From integer"($) {
                $mol_assert_equal($giper_baza_link.from_int(178308648732587), new $giper_baza_link('qwertyui'));
            },
            "Pick Lord only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').lord(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').lord(), new $giper_baza_link('qwertyui_asdfghjk').lord(), new $giper_baza_link('qwertyui_asdfghjk'));
            },
            "Pick Land only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').land(), new $giper_baza_link('qwertyui_asdfghjk').land(), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').land(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').land(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
            },
            "Pick Peer only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').peer(), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').peer(), new $giper_baza_link('qwertyui'));
                $mol_assert_equal(new $giper_baza_link('___qazwsxed').peer(), new $giper_baza_link(''));
            },
            "Pick Head only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').head(), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').head(), new $giper_baza_link('zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').head(), new $giper_baza_link('qwertyui_asdfghjk').head(), new $giper_baza_link(''));
            },
            "Pick Area only"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').area(), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').area(), new $giper_baza_link('qazwsxed'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').area(), new $giper_baza_link('qwertyui_asdfghjk').area(), new $giper_baza_link('').area(), new $giper_baza_link(''));
            },
            "Binary encoding"($) {
                const pawn = new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').toBin();
                const land = new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').toBin();
                const lord = new $giper_baza_link('qwertyui_asdfghjk').toBin();
                const rel_pawn = new $giper_baza_link('___zxcvbnm0').toBin();
                const rel_root = new $giper_baza_link('').toBin();
                $mol_assert_equal(pawn.length, 24);
                $mol_assert_equal(land.length, 18);
                $mol_assert_equal(lord.length, 12);
                $mol_assert_equal(rel_pawn.length, 6);
                $mol_assert_equal(rel_root.length, 0);
                $mol_assert_equal($giper_baza_link.from_bin(pawn), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0'));
                $mol_assert_equal($giper_baza_link.from_bin(land), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
                $mol_assert_equal($giper_baza_link.from_bin(lord), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal($giper_baza_link.from_bin(rel_pawn), new $giper_baza_link('zxcvbnm0'));
                $mol_assert_equal($giper_baza_link.from_bin(rel_root), new $giper_baza_link(''));
            },
            "Relate to base"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('QWERTYUI_ASDFGHJK')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('QWERTYUI_ASDFGHJK__ZXCVBNM0')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_12345678')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').relate(new $giper_baza_link('qwertyui_asdfghjk__12345678')), new $giper_baza_link('___zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed').relate(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('qwertyui_asdfghjk').relate(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk').relate(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link(''));
            },
            "Resolve Link from base"($) {
                $mol_assert_equal(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('QWERTYUI_ASDFGHJK__ZXCVBNM0')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('QWERTYUI_ASDFGHJK')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0'));
                $mol_assert_equal(new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk__12345678'));
                $mol_assert_equal(new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('___12345678').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_12345678'));
                $mol_assert_equal(new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk')), new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk__zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk'));
                $mol_assert_equal(new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed')), new $giper_baza_link('').resolve(new $giper_baza_link('qwertyui_asdfghjk_qazwsxed_zxcvbnm0')), new $giper_baza_link('qwertyui_asdfghjk_qazwsxed'));
            },
            'Hashing'() {
                $mol_assert_equal($giper_baza_link.hash_bin(new Uint8Array([1, 2, 3])), new $giper_baza_link('cDeAcZjC_Kn0rCAc3'));
                $mol_assert_equal($giper_baza_link.hash_str('foo bar'), new $giper_baza_link('N3PeplFW_kJg4æmwi'));
            }
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_url_encode(buffer) {
        return buffer.toBase64({ alphabet: 'base64url', omitPadding: true });
    }
    $.$mol_base64_url_encode = $mol_base64_url_encode;
    function $mol_base64_url_decode(str) {
        return Uint8Array.fromBase64(str, { alphabet: 'base64url' });
    }
    $.$mol_base64_url_decode = $mol_base64_url_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_base64_url_encode_web(buffer) {
        return $mol_base64_encode(buffer).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }
    $.$mol_base64_url_encode_web = $mol_base64_url_encode_web;
    if (!('toBase64' in Uint8Array.prototype)) {
        $.$mol_base64_url_encode = $mol_base64_url_encode_web;
    }
    function $mol_base64_url_decode_web(str) {
        return $mol_base64_decode(str.replace(/-/g, '+').replace(/_/g, '/'));
    }
    $.$mol_base64_url_decode_web = $mol_base64_url_decode_web;
    if (!('fromBase64' in Uint8Array)) {
        $.$mol_base64_url_decode = $mol_base64_url_decode_web;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Base class for crypto keys. */
    class $mol_crypto2_key extends $mol_buffer {
        static size_str = 43;
        static size_bin = 32;
        /** Kakes key from different params. */
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array(serial.match(/.{43}/g)
                    ?.flatMap(chunk => [...$mol_base64_url_decode(chunk)])
                    ?? $mol_fail(new Error('Str key too short', { cause: {
                            min: 43,
                            real: serial.length,
                        } })));
            }
            return super.from(serial);
        }
        /** Array view of public part. */
        asArray() {
            const size = this.constructor.size_bin;
            if (this.byteLength < size) {
                return $mol_fail(new Error('Bin key too short', { cause: {
                        min: size,
                        real: this.byteLength,
                    } }));
            }
            return new Uint8Array(this.buffer, this.byteOffset, size);
        }
        /** String representation of public part. */
        toString() {
            return $mol_base64_url_encode(this.asArray());
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_key.prototype, "toString", null);
    $.$mol_crypto2_key = $mol_crypto2_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Derived debuggable error with stack */
    function $mol_crypto_restack(error) {
        error = new Error(error instanceof Error ? error.message : String(error), { cause: error });
        $mol_fail_hidden(error);
    }
    $.$mol_crypto_restack = $mol_crypto_restack;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Ed25519 public key for sign verifying. */
    class $mol_crypto2_auditor extends $mol_crypto2_key {
        /** Native WebAPI public key. */
        async native() {
            return $mol_crypto_native.subtle.importKey('jwk', {
                crv: "Ed25519",
                ext: true,
                key_ops: ['verify'],
                kty: "OKP",
                x: this.toString(),
            }, "Ed25519", Boolean('extractable'), ['verify']).catch($mol_crypto_restack);
        }
        /** Verifies signature of data. */
        async verify(data, sign) {
            return await $mol_crypto_native.subtle.verify("Ed25519", await this.native(), sign, data).catch($mol_crypto_restack);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_auditor.prototype, "native", null);
    $.$mol_crypto2_auditor = $mol_crypto2_auditor;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** x25519 public key for data encryption. */
    class $mol_crypto2_socket extends $mol_crypto2_key {
        /** Native WebAPI public key. */
        async native() {
            return await $mol_crypto_native.subtle.importKey('jwk', {
                crv: 'X25519',
                ext: true,
                kty: 'OKP',
                key_ops: [],
                x: this.toString(),
            }, "X25519", true, []).catch($mol_crypto_restack);
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_socket.prototype, "native", null);
    $.$mol_crypto2_socket = $mol_crypto2_socket;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Compose public key for verifying and encryption, based on Curve25519. */
    class $mol_crypto2_public extends $mol_crypto2_key {
        static size_str = 86;
        static size_bin = 64;
        /** Return Auditor part. */
        auditor() {
            return $mol_crypto2_auditor.from(this.asArray().subarray(0, 32));
        }
        /** Return Socket part. */
        socket() {
            return $mol_crypto2_socket.from(this.asArray().subarray(32, 64));
        }
        toString() {
            return this.auditor().toString() + this.socket().toString();
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "auditor", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "socket", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_public.prototype, "toString", null);
    $.$mol_crypto2_public = $mol_crypto2_public;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Ed25519 private key for data signing. */
    class $mol_crypto2_signer extends $mol_crypto2_auditor {
        static size_sign = 64;
        /** Generates new Signer. */
        static async generate() {
            const pair = await $mol_crypto_native.subtle.generateKey("Ed25519", Boolean('extractable'), ['sign', 'verify']).catch($mol_crypto_restack);
            const { x, d } = await $mol_crypto_native.subtle.exportKey('jwk', pair.privateKey).catch($mol_crypto_restack);
            return this.from(x + d);
        }
        /** Native WebAPI private key. */
        async nativePrivate() {
            return await $mol_crypto_native.subtle.importKey('jwk', {
                crv: "Ed25519",
                ext: true,
                key_ops: ['sign'],
                kty: "OKP",
                x: this.toString(),
                d: this.toStringPrivate(),
            }, "Ed25519", Boolean('extractable'), ['sign']).catch($mol_crypto_restack);
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 32, 32);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return $mol_base64_url_encode(this.asArrayPrivate());
        }
        /** Returns Auditor from this Signer. */
        auditor() {
            return $mol_crypto2_auditor.from(this.asArray());
        }
        /** Makes Signature for data. */
        async sign(data) {
            return new Uint8Array(await $mol_crypto_native.subtle.sign("Ed25519", await this.nativePrivate(), data).catch($mol_crypto_restack));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "nativePrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "toStringPrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_signer.prototype, "auditor", null);
    $.$mol_crypto2_signer = $mol_crypto2_signer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'str & bin sizes'() {
            const signer = await $$.$mol_crypto2_signer.generate();
            const auditor = signer.auditor();
            $mol_assert_equal(signer.toStringPrivate().length, $mol_crypto2_signer.size_str);
            $mol_assert_equal(auditor.toString().length, $mol_crypto2_auditor.size_str);
            $mol_assert_equal(signer.asArrayPrivate().length, $mol_crypto2_signer.size_bin);
            $mol_assert_equal(auditor.asArray().length, $mol_crypto2_auditor.size_bin);
            const data = new Uint8Array([1, 2, 3]);
            const sign = await signer.sign(data);
            $mol_assert_equal(sign.byteLength, $mol_crypto2_signer.size_sign);
        },
        async 'verify self signed with auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const sign = await Alice.sign(data);
            $mol_assert_equal(true, await Alice.auditor().verify(data, sign));
        },
        async 'verify signed with str exported auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const Bella = $mol_crypto2_signer.from(Alice.toString() + Alice.toStringPrivate());
            const sign = await Bella.sign(data);
            const Catie = $mol_crypto2_auditor.from(Alice.auditor().toString());
            $mol_assert_equal(true, await Catie.verify(data, sign));
            const Diana = $mol_crypto2_auditor.from(Alice.toString());
            $mol_assert_equal(true, await Diana.verify(data, sign));
        },
        async 'verify signed with bin exported auto generated key'() {
            const Alice = await $$.$mol_crypto2_signer.generate();
            const data = new Uint8Array([1, 2, 3]);
            const Bella = $mol_crypto2_signer.from(new Uint8Array([...Alice.asArray(), ...Alice.asArrayPrivate()]));
            const sign = await Bella.sign(data);
            const Catie = $mol_crypto2_auditor.from(Alice.auditor().asArray());
            $mol_assert_equal(true, await Catie.verify(data, sign));
            const Diana = $mol_crypto2_auditor.from(Alice.asArray());
            $mol_assert_equal(true, await Diana.verify(data, sign));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** 16 unique bytes. */
    function $mol_crypto2_nonce() {
        return $mol_crypto_native.getRandomValues(new Uint8Array(16));
    }
    $.$mol_crypto2_nonce = $mol_crypto2_nonce;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** @deprecated Use $mol_crypto2_nonce */
    $.$mol_crypto_salt = $mol_crypto2_nonce;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Symmetric cipher with shortest payload. */
    class $mol_crypto_sacred extends $mol_buffer {
        /** Key size in bytes. */
        static size = 16;
        /** Makes new random secret. */
        static make() {
            return this.from($mol_crypto_salt());
        }
        /** Makes from string of buffer view. */
        static from(serial) {
            if (typeof serial === 'string') {
                serial = new Uint8Array([
                    ...$mol_base64_url_decode(serial),
                ]);
            }
            if (!(serial instanceof Uint8Array)) {
                serial = new Uint8Array(serial.buffer, serial.byteOffset, serial.byteLength);
            }
            ;
            serial[0] = 0xFF;
            const sacred = super.from(serial);
            return sacred;
        }
        static async from_native(native) {
            const buf = await $mol_crypto_native.subtle.exportKey('raw', native).catch($mol_crypto_restack);
            const sacred = this.from(new Uint8Array(buf));
            sacred._native = native;
            return sacred;
        }
        constructor(buffer, byteOffset, byteLength) {
            super(buffer, byteOffset, byteLength);
            if (this.getUint8(0) !== 0xFF)
                $mol_fail(new Error('Buffer should starts with 0xFF byte'));
        }
        toString() {
            return $mol_base64_url_encode(this.asArray());
        }
        _native;
        /** Native crypto secret */
        async native() {
            return this._native ?? (this._native = await $mol_crypto_native.subtle.importKey('raw', this, {
                name: 'AES-CBC',
                length: 128,
            }, true, ['encrypt', 'decrypt']).catch($mol_crypto_restack));
        }
        /** Encrypt any binary message. 16n bytes */
        async encrypt(open, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.encrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), open).catch($mol_crypto_restack));
        }
        /** Decrypt any binary message. */
        async decrypt(closed, salt) {
            return new Uint8Array(await $mol_crypto_native.subtle.decrypt({
                name: 'AES-CBC',
                length: 128,
                tagLength: 32,
                iv: salt,
            }, await this.native(), closed).catch($mol_crypto_restack));
        }
        /** Encrypts 0xFF prefixed buffer. 16 bytes */
        async close(opened, salt) {
            if (opened.getUint8(0) !== 0xFF)
                throw new Error('Closable buffer should starts with 0xFF');
            const trimed = new Uint8Array(opened.buffer, opened.byteOffset + 1, opened.byteLength - 1);
            return this.encrypt(trimed, salt);
        }
        /** Decrypts 0xFF prefixed buffer. 16 bytes */
        async open(closed, salt) {
            const trimed = await this.decrypt(closed, salt);
            if (trimed.byteLength !== closed.byteLength - 1)
                throw new Error('Length of opened buffer should be ' + (closed.byteLength - 1));
            const opened = new Uint8Array(closed.byteLength);
            opened[0] = 0xFF;
            opened.set(trimed, 1);
            return opened;
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto_sacred.prototype, "toString", null);
    $.$mol_crypto_sacred = $mol_crypto_sacred;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'Sizes'() {
            const secret = $mol_crypto_sacred.make();
            const key = secret.asArray();
            $mol_assert_equal(key.byteLength, $mol_crypto_sacred.size);
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const closed = await secret.encrypt(data, salt);
            $mol_assert_equal(closed.byteLength, $mol_crypto_sacred.size);
            const self_closed = await secret.close(secret, salt);
            $mol_assert_equal(self_closed.byteLength, $mol_crypto_sacred.size);
        },
        async 'Decrypt self encrypted'() {
            const secret = $mol_crypto_sacred.make();
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const closed = await secret.encrypt(data, salt);
            const opened = await secret.decrypt(closed, salt);
            $mol_assert_equal(data, opened);
        },
        async 'Decrypt encrypted with exported key'() {
            const data = new Uint8Array([1, 2, 3]);
            const salt = $mol_crypto_salt();
            const Alice = $mol_crypto_sacred.make();
            const closed = await Alice.encrypt(data, salt);
            const Bob = $mol_crypto_sacred.from(Alice.asArray());
            const opened = await Bob.decrypt(closed, salt);
            $mol_assert_equal(data, opened);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** x25519 private key for data encryption. */
    class $mol_crypto2_cipher extends $mol_crypto2_socket {
        static size_secret = 16;
        /** Generates new Cipher. */
        static async generate() {
            const pair = await $mol_crypto_native.subtle.generateKey("X25519", Boolean('extractable'), ['deriveKey']).catch($mol_crypto_restack);
            const { x, d } = await $mol_crypto_native.subtle.exportKey('jwk', pair.privateKey).catch($mol_crypto_restack);
            return this.from(x + d);
        }
        /** Native WebAPI private key. */
        async nativePrivate() {
            return $mol_crypto_native.subtle.importKey('jwk', {
                crv: 'X25519',
                ext: true,
                kty: 'OKP',
                key_ops: ['deriveKey', 'deriveBits'],
                x: this.toString(),
                d: this.toStringPrivate(),
            }, "X25519", Boolean('extractable'), ['deriveKey', 'deriveBits']).catch($mol_crypto_restack);
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 32, 32);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return $mol_base64_url_encode(this.asArrayPrivate());
        }
        /** Returns Socket from this Chipher. */
        socket() {
            return $mol_crypto2_socket.from(this.asArray());
        }
        /** Makes shared secret for combination of Chiper and Soacket. */
        async secret(pub) {
            return $mol_crypto_sacred.from(new Uint8Array(await $mol_crypto_native.subtle.deriveBits({
                name: "X25519",
                public: await pub.native(),
            }, await this.nativePrivate(), $mol_crypto_sacred.size * 8).catch($mol_crypto_restack)));
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "nativePrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "toStringPrivate", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_cipher.prototype, "socket", null);
    $.$mol_crypto2_cipher = $mol_crypto2_cipher;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'str & bin sizes'() {
            const cipher = await $$.$mol_crypto2_cipher.generate();
            const socket = cipher.socket();
            $mol_assert_equal(cipher.toStringPrivate().length, $mol_crypto2_cipher.size_str);
            $mol_assert_equal(socket.toString().length, $mol_crypto2_socket.size_str);
            $mol_assert_equal(cipher.asArrayPrivate().length, $mol_crypto2_cipher.size_bin);
            $mol_assert_equal(socket.asArray().length, $mol_crypto2_socket.size_bin);
            const secret = await cipher.secret(socket);
            $mol_assert_equal(secret.byteLength, $mol_crypto2_cipher.size_secret);
        },
        async 'Shared secret from public & private keys'() {
            const A = await $mol_crypto2_cipher.generate();
            const B = await $mol_crypto2_cipher.generate();
            const SA = await A.secret(B.socket());
            const SB = await B.secret(A.socket());
            $mol_assert_equal(SA.asArray(), SB.asArray());
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Compose private key for signing and encryption, based on Curve25519. */
    class $mol_crypto2_private extends $mol_crypto2_public {
        /** Generates new private key. */
        static async generate() {
            const [signer, cipher] = await Promise.all([
                $mol_crypto2_signer.generate(),
                $mol_crypto2_cipher.generate(),
            ]);
            const key = $mol_crypto2_private.from($mol_crypto2_public.size_bin + $mol_crypto2_private.size_bin);
            key.asArray().set(signer.asArray(), 0);
            key.asArray().set(cipher.asArray(), 32);
            key.asArrayPrivate().set(signer.asArrayPrivate(), 0);
            key.asArrayPrivate().set(cipher.asArrayPrivate(), 32);
            return key;
        }
        /** Return Signer part. */
        signer() {
            const signer = $mol_crypto2_signer.from($mol_crypto2_auditor.size_bin + $mol_crypto2_signer.size_bin);
            signer.asArray().set(this.asArray().subarray(0, 32));
            signer.asArrayPrivate().set(this.asArrayPrivate().subarray(0, 32));
            return signer;
        }
        /** Return Cipher part. */
        cipher() {
            const cipher = $mol_crypto2_cipher.from($mol_crypto2_socket.size_bin + $mol_crypto2_cipher.size_bin);
            cipher.asArray().set(this.asArray().subarray(32, 64));
            cipher.asArrayPrivate().set(this.asArrayPrivate().subarray(32, 64));
            return cipher;
        }
        /** Return Public part. */
        public() {
            return $mol_crypto2_public.from(this.asArray());
        }
        /** Array view of private part. */
        asArrayPrivate() {
            return new Uint8Array(this.buffer, this.byteOffset + 64, 64);
        }
        /** String representation of private part. */
        toStringPrivate() {
            return this.signer().toStringPrivate() + this.cipher().toStringPrivate();
        }
    }
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "signer", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "cipher", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "public", null);
    __decorate([
        $mol_memo.method
    ], $mol_crypto2_private.prototype, "toStringPrivate", null);
    $.$mol_crypto2_private = $mol_crypto2_private;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async "Signing & encryption"($) {
                const Alice = await $mol_crypto2_private.generate();
                const Bella = await $mol_crypto2_private.generate();
                const secretA = await Alice.cipher().secret(Bella.socket());
                const secretB = await Bella.cipher().secret(Alice.socket());
                $mol_assert_equal(secretA, secretB);
                const data = new Uint8Array([1, 2, 3]);
                const nonce = $mol_crypto2_nonce();
                const closed = await secretA.encrypt(data, nonce);
                const digest = $mol_crypto2_hash(closed);
                const sign = await Alice.signer().sign(digest);
                $mol_assert_equal(true, await Alice.auditor().verify(digest, sign));
                $mol_assert_equal(data, await secretA.decrypt(closed, nonce));
            },
            async "Serial & Deserial"($) {
                const orig = await $mol_crypto2_private.generate();
                const bin = new Uint8Array([...orig.asArray(), ...orig.asArrayPrivate()]);
                const str = orig.toString() + orig.toStringPrivate();
                $mol_assert_equal(orig, $mol_crypto2_private.from(bin), $mol_crypto2_private.from(str));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $mol_assert_equal($mol_state_local.value(key), null);
            $mol_state_local.value(key, 123);
            $mol_assert_equal($mol_state_local.value(key), 123);
            $mol_state_local.value(key, null);
            $mol_assert_equal($mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test_mocks.push(context => {
        class $mol_state_local_mock extends $mol_state_local {
            static state = {};
            static value(key, next = this.state[key]) {
                return this.state[key] = (next || null);
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_state_local_mock, "value", null);
        context.$mol_state_local = $mol_state_local_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Public key generated with Proof of Work */
    class $giper_baza_auth_pass extends $mol_crypto2_public {
        static like(bin) {
            const pass = this.from(bin);
            if (pass.byteLength !== $giper_baza_auth_pass.size_bin)
                return null;
            if (pass.uint8(0) !== 0xFF)
                return null;
            return pass;
        }
        hash() {
            return $giper_baza_link.hash_bin(this.asArray());
        }
        path() {
            return `pass:${this.hash().str}`;
        }
        /** Independent actor with global unique id generated from Auth key */
        lord() {
            return this.hash().lord();
        }
        /** Land local unique identifier of independent actor (first half of Lord) */
        peer() {
            return this.hash().peer();
        }
        toJSON() {
            return '@' + this.lord().str;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 🎫');
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "hash", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "path", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "lord", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth_pass.prototype, "peer", null);
    $.$giper_baza_auth_pass = $giper_baza_auth_pass;
    /** Private key generated with Proof of Work */
    class $giper_baza_auth extends $mol_crypto2_private {
        /** Current Private key generated with Proof of Work  */
        static current(next) {
            $mol_wire_solid();
            if (next === undefined) {
                const key = String($mol_state_local.value('$giper_baza_auth') ?? '');
                if (key) {
                    const auth = $giper_baza_auth.from(key);
                    if (auth.byteLength === 128)
                        return auth;
                    $$.$mol_log3_warn({
                        message: 'Wrong Auth size',
                        hint: 'Relax. Right Auth is created.',
                        place: `${this}.current()`,
                    });
                }
            }
            if (!next)
                next = this.grab();
            $mol_state_local.value('$giper_baza_auth', next.toString() + next.toStringPrivate());
            return next;
        }
        static embryos = [];
        static grab() {
            if (this.embryos.length)
                return this.from(this.embryos.pop());
            return $mol_wire_sync(this)._generate();
        }
        static async _generate() {
            for (let i = 0; i < 4096; ++i) {
                const auth = this.from(await super.generate());
                if (auth.uint8(0) !== 0xFF)
                    continue;
                if (/[æÆ]/.test(auth.pass().lord().str))
                    continue;
                return auth;
            }
            $mol_fail(new Error(`Too long key generation`));
        }
        pass() {
            return $giper_baza_auth_pass.from(this.public());
        }
        secret_mutual(pass) {
            return $mol_wire_sync(this.cipher()).secret(pass.socket());
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.pass().lord()), ' 🔑');
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_auth.prototype, "pass", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_auth.prototype, "secret_mutual", null);
    __decorate([
        $mol_mem
    ], $giper_baza_auth, "current", null);
    __decorate([
        $mol_action
    ], $giper_baza_auth, "grab", null);
    $.$giper_baza_auth = $giper_baza_auth;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_auth_mock extends $.$giper_baza_auth {
            static current() {
                return this.from('_7uaNxSijvQDjZ-9a9r22hpcROZwhgBTaWZrcDIMwkU3e6xFHq_7h9-Dfxgif7E_szNlubYXJLUWFNt8x5ko3wb0YsrNPmwb8tahStoyKB_J5_gj8LqmJItGnwJHsGmRs17BgVIMzCEMbNqhiBiz6-dkW9PFWp346RUya2lNHzpk');
            }
            static embryos = [
                '_7bJySpjwMJr-9xpQtl3XIQhiiHIAJ3mJGJ9Z8XJXOMbKLhjUHMrA4RZzmscCgO0c7xnXnw_UFhwhDN7CRHOTca4x_vAJdIvjnNNRkBaYqJJRHBiLn6Cjf1Iv7ZYsHBZQZ72WxwYK8xKs8L3Kokv5RZ-jqBoozqc8JIFI1DWayJM',
                '_zOldFN6un21Kk9V_Z51D84ZJXdDoSfkxZZl5iNdSJ8mN-zcOuKh0tUTajmynoVmYG73krPQXIkIlGLAEwx5n03Fju-SIG0_fENxSNDRH8Pukvibs6nnMDPgXCYRvJi6gL8ZVwedP7LYkwa1qpsaUN7nmjWvhkkgVcVMLYK0Jk7g',
                '_8-GDFlnyEYoMzoeCiH1H7lBLuqMyZ1S_2ZEt0o4YIE4frZ1syTbDar0RqkFzC78BhVCYVykYxDTewnzyq4nEwG3y1Al3BskP59eYuDeaH0UKbBNF407K7kGJrMpJXZtMj0kZdX16E3aKfUmeLp0NL9VWFrAg6QiVQd1jJ5-MU5w',
                '_9GnExCEqMmBM5nBUnfdGBPjYSVHOUjHygAFipsPU0UU8mOgMS9JC8Wwkv0waX-JgfPrI_em3gPznH-2_C9MDcP03zEmIAoLRltMEBftax-lHJ52kciH3GUFAdQ1glc9Ej8ypgYHvfvO5gkQA6q0DhCEcWUPkOok5OvJre6iO358',
                '_y1XB55LywSvOEtuyr_hh3wjRaW7gFW_aebG1eSQFmcFTzFvw50xd9Vft_jXFvP3Cd9T4jL-eIPMizBX9gafRcaW8XDdjaWW6GDCJLeXBSoFQH4PpNjufNT7BaPCZfAwY_12rLEO66Pse1GrzdVHU6wSOciL99w56zQLgzFLHErc',
                '_62jup6y61Rt8SN8Oq1Lzu5GXA_WL7oxoRPkRPQNkiwvKz8z4D2p8g_Qa5QWvBYmFrgBwAZmarD1UJ1ucA_zUQbrgMUBmEiYv7S4AApUa1Obo6r2KQ_70BebGOo_F3lNUtzfNxEnMh4FRLShzu0hLlp6gZyFjW7aZKoqLRXR68bw',
                '_yXB4FEZnF35nrJxHpsiS3YB18ADNOwbrKIYKcXAdpAIjWy6A4-Nx6K44RWNvgnreWlACm6PaaymM6he1TaCAAyS8ouYHqSezBbGRPyKmKVXjcyHYfQ33W3tQvipwLM8YB3VcOAuvRBNaiQLLzPb9saE5HT2cU25EJE34hpAVm6I',
                '_6iVZXF5fD2ztELDFvmhTAJWMRNLBMRv3W6GArqcVLwcCM6WeoqPAySo05cG-XaqXTme0iC3Pzf5jvlHqY1GgAO4qfQcF3EWV66Uw9sYD1T_tu_rmKYjYT5YXyaxtki08r50YHA-Jw4obKcDHt6_sDONANUA7pCYjIeFGt0mv1Zs',
                '_yPV-YZgPu0_edJc3I8o1SUKqUucgYVKlbTrKqVyl3sxjQo3u73nGtQq190q3W_ebhVnQWLC8A4JFhbjWDCTzY8i7shadOvvSEeAfuPqsyK5JERqw-tbJm_0nvR8bShIcXzyrYDIg_ZBU_wNKbFzoCXHmh-CNsuKpb6NyBQPsIrU',
                '_-67MXDuic5c7e4Febc1QuI456bgmfeMnmp3rWcGWzcMIPytythDMqmZISsGGsLVFUOQxsGjm7s3ULV-307L3wd47B4K4BtUhTR5cyKMI4y5Ld-UstbevtgOURqLsc_XIhyFilGTJ8ORTRW7RI3O83xtRu-_0lRg9WcmnhWERBIU',
            ];
        }
        __decorate([
            $mol_mem
        ], $giper_baza_auth_mock, "current", null);
        $.$giper_baza_auth = $giper_baza_auth_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_duration('P42.1Y').toString(), 'P42.1YT');
            $mol_assert_equal(new $mol_time_duration('P42.1M').toString(), 'P42.1MT');
            $mol_assert_equal(new $mol_time_duration('P42.1D').toString(), 'P42.1DT');
            $mol_assert_equal(new $mol_time_duration('PT42.1h').toString(), 'PT42.1H');
            $mol_assert_equal(new $mol_time_duration('PT42.1m').toString(), 'PT42.1M');
            $mol_assert_equal(new $mol_time_duration('PT42.1s').toString(), 'PT42.1S');
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'negatives'() {
            $mol_assert_equal(new $mol_time_duration('P-1Y-2M-3DT-4h-5m-6.7s').toString(), new $mol_time_duration('-P1Y2M3DT4h5m6.7s').toString(), 'P-1Y-2M-3DT-4H-5M-6.7S');
            $mol_assert_equal(new $mol_time_duration('-P-1Y-2M-3DT-4h-5m-6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'format typed'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6s').toString('P#Y#M#DT#h#m#s'), 'P1Y2M3DT4H5M6S');
        },
        'format readable'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT4h5m6s').toString('hh:mm:ss.sss'), '04:05:06.000');
        },
        'normalization'() {
            $mol_assert_equal(new $mol_time_duration('P1Y2M3DT44h55m66s').normal.toString(), 'P1Y2M4DT20H56M6S');
            $mol_assert_equal(new $mol_time_duration('P-1Y-2M-3DT-44h-55m-66s').normal.toString(), 'P-1Y-2M-4DT-20H-56M-6S');
        },
        'comparison'() {
            const iso = 'P1Y1M1DT1h1m1s';
            $mol_assert_equal(new $mol_time_duration(iso), new $mol_time_duration(iso));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'parse and serial'() {
            $mol_assert_equal(new $mol_time_moment('2014').toString(), '2014');
            $mol_assert_equal(new $mol_time_moment('2014-01').toString(), '2014-01');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').toString(), '2014-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03').toString(), '2014-01-02T03');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04').toString(), '2014-01-02T03:04');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05').toString(), '2014-01-02T03:04:05');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006').toString(), '2014-01-02T03:04:05.006');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006Z').toString(), '2014-01-02T03:04:05.006+00:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05.006+07:00').toString(), '2014-01-02T03:04:05.006+07:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04:05+07:08').toString(), '2014-01-02T03:04:05+07:08');
            $mol_assert_equal(new $mol_time_moment('2014-01-02T03:04+07:08').toString(), '2014-01-02T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04+07:08').toString(), 'T03:04+07:08');
            $mol_assert_equal(new $mol_time_moment('T03:04:05').toString(), 'T03:04:05');
            $mol_assert_equal(new $mol_time_moment('T03:04').toString(), 'T03:04');
            $mol_assert_equal(new $mol_time_moment('T03').toString(), 'T03');
        },
        'format simple'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000000').toString('AD YY-M-D h:m:s'), '21 14-1-2 1:2:3');
        },
        'format padded'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03.000').toString('YYYY-MM-DD hh:mm:ss'), '2014-01-02 01:02:03');
        },
        'format time zone'() {
            $mol_assert_equal(new $mol_time_moment('2014-01-02T01:02:03+05:00').toString('Z'), '+05:00');
        },
        'format names'() {
            new $mol_time_moment('2014-01-02T01:02:03.000').toString('Month Mon | WeekDay WD');
        },
        'shifting'() {
            $mol_assert_equal(new $mol_time_moment('T15:54:58.243+03:00').shift({}).toString(), 'T15:54:58.243+03:00');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P1Y').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P12M').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('P365D').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01-02').shift('PT8760h').toString(), '2015-01-02');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT8760h').toString(), '2015-01');
            $mol_assert_equal(new $mol_time_moment('2014-01').shift('PT-8760h').toString(), '2013-01');
        },
        'native from reduced'() {
            $mol_assert_equal(new $mol_time_moment('T15:00').native.toISOString().slice(0, -5), new $mol_time_moment().merge('T15:00:00').toOffset('Z').toString().slice(0, -6));
        },
        'normalization'() {
            $mol_assert_equal(new $mol_time_moment({ year: 2015, month: 6, day: 34 }).normal.toString(), '2015-08-04');
            $mol_assert_equal(new $mol_time_moment('2024-09-30 19:00+03:00').normal.month, 8);
        },
        'renormalization'() {
            $mol_assert_equal(new $mol_time_moment('2024-08').normal.toString(), '2024-08');
            $mol_assert_equal(new $mol_time_moment('2024-11').normal.toString(), '2024-11');
        },
        'iso week day'() {
            $mol_assert_equal(new $mol_time_moment('2017-09-17').weekday, $mol_time_moment_weekdays.sunday);
            $mol_assert_equal(new $mol_time_moment('2017-09-18').weekday, $mol_time_moment_weekdays.monday);
        },
        'change offset'() {
            $mol_assert_equal(new $mol_time_moment('2021-04-10 +03:00').toOffset('Z').toString(), '2021-04-09T21:00:00+00:00');
        },
        'comparison'() {
            const iso = '2021-01-02T03:04:05.678+09:10';
            $mol_assert_equal(new $mol_time_moment(iso), new $mol_time_moment(iso));
        },
        'array keeps zero offset'() {
            const moment = new $mol_time_moment('2026-01-25T16:37:36.129+00:00');
            const restored = new $mol_time_moment(moment.toArray());
            $mol_assert_equal(restored.offset?.count('PT1m'), 0);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Moment from time. */
    function $giper_baza_time_moment(time) {
        const stamp = time * 1000;
        return new $mol_time_moment(stamp);
    }
    $.$giper_baza_time_moment = $giper_baza_time_moment;
    /** User readable time+tick view. */
    function $giper_baza_time_dump(time, tick) {
        let res = $giper_baza_time_moment(time).toString('YYYY-MM-DD hh:mm:ss Z');
        if (tick !== undefined)
            res += ' !' + tick.toString(16).toUpperCase().padStart(2, '0');
        return res;
    }
    $.$giper_baza_time_dump = $giper_baza_time_dump;
    /** Current time with 0 tick. */
    function $giper_baza_time_now() {
        return now || Math.floor(Date.now() / 1000);
    }
    $.$giper_baza_time_now = $giper_baza_time_now;
    let now = 0;
    /** Run atomic transaction by temp freezing time. */
    function $giper_baza_time_freeze(task) {
        if (now)
            return task();
        now = $giper_baza_time_now();
        try {
            return task();
        }
        finally {
            now = 0;
        }
    }
    $.$giper_baza_time_freeze = $giper_baza_time_freeze;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Module for working with terminal. Text coloring when output in terminal */
    class $mol_term_color {
        static reset = this.ansi(0, 0);
        static bold = this.ansi(1, 22);
        static italic = this.ansi(3, 23);
        static underline = this.ansi(4, 24);
        static inverse = this.ansi(7, 27);
        static hidden = this.ansi(8, 28);
        static strike = this.ansi(9, 29);
        static gray = this.ansi(90, 39);
        static red = this.ansi(91, 39);
        static green = this.ansi(92, 39);
        static yellow = this.ansi(93, 39);
        static blue = this.ansi(94, 39);
        static magenta = this.ansi(95, 39);
        static cyan = this.ansi(96, 39);
        static Gray = (str) => this.inverse(this.gray(str));
        static Red = (str) => this.inverse(this.red(str));
        static Green = (str) => this.inverse(this.green(str));
        static Yellow = (str) => this.inverse(this.yellow(str));
        static Blue = (str) => this.inverse(this.blue(str));
        static Magenta = (str) => this.inverse(this.magenta(str));
        static Cyan = (str) => this.inverse(this.cyan(str));
        static ansi(open, close) {
            if (typeof process === 'undefined')
                return String;
            if (!process.stdout.isTTY)
                return String;
            const prefix = `\x1b[${open}m`;
            const postfix = `\x1b[${close}m`;
            const suffix_regexp = new RegExp(postfix.replace('[', '\\['), 'g');
            return function colorer(str) {
                str = String(str);
                if (str === '')
                    return str;
                const suffix = str.replace(suffix_regexp, prefix);
                return prefix + suffix + postfix;
            };
        }
    }
    $.$mol_term_color = $mol_term_color;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_face extends Object {
        time;
        tick;
        summ;
        static length() {
            return 16;
        }
        constructor(time = 0, tick = 0, summ = 0) {
            super();
            this.time = time;
            this.tick = tick;
            this.summ = summ;
        }
        clone() {
            return new $giper_baza_face(this.time, this.tick, this.summ);
        }
        get moment() {
            return $giper_baza_time_moment(this.time);
        }
        get time_tick() {
            return this.time * 2 ** 16 + this.tick;
        }
        sync_time(time, tick) {
            if (this.time < time) {
                this.time = time;
                this.tick = tick;
                return true;
            }
            else if (this.time === time && this.tick < tick) {
                this.tick = tick;
                return true;
            }
            else {
                return false;
            }
        }
        sync_summ(summ) {
            if (this.summ < summ)
                this.summ = summ;
        }
        toJSON() {
            const time = $giper_baza_time_dump(this.time, this.tick);
            const summ = '%' + this.summ;
            return `${time} ${summ}`;
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_face ')
                + $mol_term_color.gray($giper_baza_time_dump(this.time, this.tick)
                    + ' %' + this.summ);
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), $mol_dev_format_shade(' ', $giper_baza_time_dump(this.time, this.tick), ' %', this.summ));
        }
    }
    $.$giper_baza_face = $giper_baza_face;
    /** Statistics about Units in Land. it's total Units count & dictionary which maps Peer to Time */
    class $giper_baza_face_map extends Map {
        /** Cumulative face for all peers. */
        stat = new $giper_baza_face;
        _peer_last = '';
        constructor(entries) {
            super();
            if (entries)
                this.sync(entries);
        }
        clone() {
            return new $giper_baza_face_map(this);
        }
        /** Synchronize this clock with another. */
        sync(right) {
            // if( right instanceof $giper_baza_face_map ) this.stat = right.stat.clone()
            for (const [peer, face] of right) {
                this.peer_time(peer, face.time, face.tick);
                this.peer_summ(peer, face.summ);
            }
        }
        /** Update last time for peer. */
        peer_time(peer, time, tick) {
            if (this.stat.sync_time(time, tick)) {
                this._peer_last = peer;
            }
            let prev = this.get(peer);
            if (prev)
                prev.sync_time(time, tick);
            else
                this.set(peer, new $giper_baza_face(time, tick));
        }
        /** Update Summ for Peer. */
        peer_summ(peer, summ) {
            const prev = this.get(peer);
            this.stat.summ = (this.stat.summ ?? 0) + summ - (prev?.summ ?? 0);
            if (this.stat.summ < 0)
                $mol_fail(new Error('Negative summ'));
            if (prev)
                prev.summ = summ;
            else
                this.set(peer, new $giper_baza_face(0, 0, summ));
        }
        peer_summ_shift(peer, diff) {
            this.peer_summ(peer, (this.get(peer)?.summ ?? 0) + diff);
        }
        /** Generates new time for peer that greater then other seen. */
        tick(peer) {
            const now = $giper_baza_time_now();
            if (this.stat.time < now) {
                this.stat.time = now;
                this.stat.tick = 0;
            }
            else if (this._peer_last !== peer.str) {
                this.stat.time += 1;
                this.stat.tick = 0;
                this._peer_last = peer.str;
            }
            else {
                this.stat.tick = (this.stat.tick + 1) % 2 ** 16;
                if (!this.stat.tick)
                    ++this.stat.time;
            }
            return this.stat;
        }
        toJSON() {
            return Object.fromEntries(this.entries());
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_face_map ')
                + $mol_term_color.gray(this.stat.toJSON());
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.stat));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_face_map.prototype, "tick", null);
    $.$giper_baza_face_map = $giper_baza_face_map;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** reactive Dictionary */
    class $mol_wire_dict extends Map {
        pub = new $mol_wire_pub;
        // Accessors
        has(key) {
            this.pub.promote();
            return super.has(key);
        }
        get(key) {
            this.pub.promote();
            return super.get(key);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        // Mutators
        set(key, value) {
            if (super.get(key) === value)
                return this;
            super.set(key, value);
            this.pub?.emit(); // undefined in constructor
            return this;
        }
        delete(key) {
            const res = super.delete(key);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        // Extensions
        item(key, next) {
            if (next === undefined)
                return this.get(key) ?? null;
            if (next === null)
                this.delete(key);
            else
                this.set(key, next);
            return next;
        }
    }
    $.$mol_wire_dict = $mol_wire_dict;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Watch one value'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static lucky() {
                    return this.dict.get(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), undefined);
            App.dict.set(666, 6666);
            $mol_assert_equal(App.lucky(), undefined);
            App.dict.set(777, 7777);
            $mol_assert_equal(App.lucky(), 7777);
            App.dict.delete(777);
            $mol_assert_equal(App.lucky(), undefined);
        },
        'Watch item channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static lucky() {
                    return this.dict.item(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), null);
            App.dict.item(666, 6666);
            $mol_assert_equal(App.lucky(), null);
            App.dict.item(777, 7777);
            $mol_assert_equal(App.lucky(), 7777);
            App.dict.item(777, null);
            $mol_assert_equal(App.lucky(), null);
        },
        'Watch size'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static size() {
                    return this.dict.size;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "size", null);
            $mol_assert_equal(App.size(), 0);
            App.dict.set(666, 6666);
            $mol_assert_equal(App.size(), 1);
            App.dict.set(777, 7777);
            $mol_assert_equal(App.size(), 2);
            App.dict.delete(777);
            $mol_assert_equal(App.size(), 1);
        },
        'Watch for-of'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static sum() {
                    let keys = 0;
                    let vals = 0;
                    for (const [key, val] of this.dict) {
                        keys += key;
                        vals += val;
                    }
                    return [keys, vals];
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_like(App.sum(), [0, 0]);
            App.dict.set(111, 1111);
            $mol_assert_like(App.sum(), [111, 1111]);
            App.dict.set(222, 2222);
            $mol_assert_like(App.sum(), [333, 3333]);
            App.dict.delete(111);
            $mol_assert_like(App.sum(), [222, 2222]);
        },
        'Watch forEach'($) {
            class App extends $mol_object2 {
                static $ = $;
                static dict = new $mol_wire_dict();
                static sum() {
                    let keys = 0;
                    let vals = 0;
                    this.dict.forEach((val, key) => {
                        keys += key;
                        vals += val;
                    });
                    return [keys, vals];
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_like(App.sum(), [0, 0]);
            App.dict.set(111, 1111);
            $mol_assert_like(App.sum(), [111, 1111]);
            App.dict.set(222, 2222);
            $mol_assert_like(App.sum(), [333, 3333]);
            App.dict.delete(111);
            $mol_assert_like(App.sum(), [222, 2222]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $giper_baza_slot_kind;
    (function ($giper_baza_slot_kind) {
        /** Free Unit Slot */
        $giper_baza_slot_kind[$giper_baza_slot_kind["free"] = 0] = "free";
        /** Land header for the following parts. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["land"] = 76] = "land";
        /** Unit of data. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["sand"] = 252] = "sand";
        /** Rights/Keys sharing. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["gift"] = 253] = "gift";
        /** Sign for hash list. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["seal"] = 254] = "seal";
        /** Public key. */
        $giper_baza_slot_kind[$giper_baza_slot_kind["pass"] = 255] = "pass";
    })($giper_baza_slot_kind = $.$giper_baza_slot_kind || ($.$giper_baza_slot_kind = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * # Generic Graph model
     * - Supports any type of Nodes and Edges.
     * - All links are ordered, but this may be ignored.
     * - Multigraph supported using arrays of Edges.
     * - Hypergraph supported by reusing same Edge on set of links.
     * - Ubergraph supported using Edges as Nodes to.
     **/
    class $mol_graph {
        /** All registered Nodes */
        nodes = new Set();
        /** Edges for Nodes pairs (from-to-edge) */
        edges_out = new Map();
        /** Edges for Nodes pairs (to-from-edge) */
        edges_in = new Map();
        // LINKING NODES
        /** Full connect two Nodes */
        link(from, to, edge) {
            this.link_out(from, to, edge);
            this.link_in(to, from, edge);
        }
        /** Full disconnect two Nodes */
        unlink(from, to) {
            this.edges_in.get(to)?.delete(from);
            this.edges_out.get(from)?.delete(to);
        }
        /** Forward connect two Nodes */
        link_out(from, to, edge) {
            let pair = this.edges_out.get(from);
            if (!pair) {
                pair = new Map();
                this.edges_out.set(from, pair);
                this.nodes.add(from);
            }
            pair.set(to, edge);
            this.nodes.add(to);
        }
        /** Backward connect two Nodes */
        link_in(to, from, edge) {
            let pair = this.edges_in.get(to);
            if (!pair) {
                pair = new Map();
                this.edges_in.set(to, pair);
                this.nodes.add(to);
            }
            pair.set(from, edge);
            this.nodes.add(to);
        }
        // GETTING EDGES
        /** Return any Edge for two Nodes or null */
        edge(from, to) {
            return this.edge_out(from, to) ?? this.edge_in(to, from);
        }
        /** Return output Edge for two Nodes or null */
        edge_out(from, to) {
            return this.edges_out.get(from)?.get(to) ?? null;
        }
        /** Return input Edge for two Nodes or null */
        edge_in(to, from) {
            return this.edges_in.get(to)?.get(from) ?? null;
        }
        // MUTATIONS
        /** Cut cycles at lowest priority of Edges */
        acyclic(get_weight) {
            const checked = [];
            for (const start of this.nodes) {
                const path = [];
                const visit = (from) => {
                    if (checked.includes(from))
                        return Number.MAX_SAFE_INTEGER;
                    const index = path.lastIndexOf(from);
                    if (index > -1) {
                        const cycle = path.slice(index);
                        return cycle.reduce((weight, node, index) => Math.min(weight, get_weight(this.edge_out(node, cycle[(index + 1) % cycle.length]))), Number.MAX_SAFE_INTEGER);
                    }
                    path.push(from);
                    dive: try {
                        const deps = this.edges_out.get(from);
                        if (!deps)
                            break dive;
                        for (const [to, edge] of deps) {
                            if (to === from) {
                                this.unlink(from, to);
                                continue;
                            }
                            const weight_out = get_weight(edge);
                            const min = visit(to);
                            if (weight_out > min)
                                return min;
                            if (weight_out === min) {
                                this.unlink(from, to);
                                if (path.length > 1) {
                                    const enter = path[path.length - 2];
                                    this.link(enter, to, edge);
                                }
                            }
                        }
                    }
                    finally {
                        path.pop();
                    }
                    checked.push(from);
                    return Number.MAX_SAFE_INTEGER;
                };
                visit(start);
            }
        }
        // NODES SELECTION
        /** Topoligical ordered set of all Nodes for acyclic graph */
        get sorted() {
            const sorted = new Set();
            const visit = (node) => {
                if (sorted.has(node))
                    return;
                const deps = this.edges_out.get(node);
                if (deps) {
                    for (const [dep] of deps)
                        visit(dep);
                }
                sorted.add(node);
            };
            for (const node of this.nodes) {
                visit(node);
            }
            return sorted;
        }
        /** All Nodes which don't have input Edges */
        get roots() {
            const roots = [];
            for (const node of this.nodes) {
                if (this.edges_in.get(node)?.size)
                    continue;
                roots.push(node);
            }
            return roots;
        }
        // DEPTH STATS
        /**
         * Nodes depth statistics for acyclic graph
         * @example
         * graph.depth_stat( Math.min )
         * graph.depth_stat( Math.max )
         **/
        nodes_depth(select) {
            const stat = new Map();
            const visit = (node, depth = 0) => {
                if (stat.has(node))
                    stat.set(node, select(depth, stat.get(node)));
                else
                    stat.set(node, depth);
                for (const kid of this.edges_out.get(node)?.keys() ?? [])
                    visit(kid, depth + 1);
            };
            for (const root of this.roots)
                visit(root);
            return stat;
        }
        /**
         * Depth's Nodes statistics for acyclic graph
         * @example
         * graph.depth_nodes( Math.min )
         * graph.depth_nodes( Math.max )
         **/
        depth_nodes(select) {
            const groups = [];
            for (const [node, depth] of this.nodes_depth(select).entries()) {
                if (groups[depth])
                    groups[depth].push(node);
                else
                    groups[depth] = [node];
            }
            return groups;
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'ordered links'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 'E');
            $mol_assert_equal(graph.edge_out('A', 'B'), 'E');
            $mol_assert_equal(graph.edge_in('B', 'A'), 'E');
            $mol_assert_equal(graph.edge_out('B', 'A'), null);
            $mol_assert_equal(graph.edge_in('A', 'B'), null);
        },
        'nodes without edges'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.acyclic(edge => 0);
            $mol_assert_equal([...graph.sorted].join(''), 'ABCD');
        },
        'partial ordering'() {
            var graph = new $mol_graph();
            graph.nodes.add('A');
            graph.nodes.add('B');
            graph.nodes.add('C');
            graph.nodes.add('D');
            graph.link('B', 'C', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'ACBD');
        },
        'sorting must cut cycles at low priority edges A'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges B'() {
            var graph = new $mol_graph();
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges C'() {
            var graph = new $mol_graph();
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must cut cycles at low priority edges D'() {
            var graph = new $mol_graph();
            graph.link('D', 'A', { priority: -1 });
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.acyclic(edge => edge.priority);
            $mol_assert_equal([...graph.sorted].join(''), 'BADC');
        },
        'sorting must group cutted cycles'() {
            var graph = new $mol_graph();
            graph.link('A', 'B', 0);
            graph.link('B', 'C', 0);
            graph.link('C', 'D', -2);
            graph.link('D', 'E', 0);
            graph.link('E', 'C', 0);
            graph.acyclic(edge => edge);
            $mol_assert_equal([...graph.sorted].join(''), 'CEDBA');
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'auto name'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new Invalid('foo');
            $mol_assert_equal(mix.name, 'Invalid_Error');
        },
        'simpe mix'() {
            const mix = new $mol_error_mix('foo', {}, new Error('bar'), new Error('lol'));
            $mol_assert_equal(mix.message, 'foo');
            $mol_assert_equal(mix.errors.map(e => e.message), ['bar', 'lol']);
        },
        'provide additional info'() {
            class Invalid extends $mol_error_mix {
            }
            const mix = new $mol_error_mix('Wrong password', {}, new Invalid('Too short', { value: 'p@ssw0rd', hint: '> 8 letters' }), new Invalid('Too simple', { value: 'p@ssw0rd', hint: 'need capital letter' }));
            const hints = [];
            if (mix instanceof $mol_error_mix) {
                for (const er of mix.errors) {
                    if (er instanceof Invalid) {
                        hints.push(er.cause?.hint ?? '');
                    }
                }
            }
            $mol_assert_equal(hints, ['> 8 letters', 'need capital letter']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_data_error extends $mol_error_mix {
    }
    $.$mol_data_error = $mol_data_error;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for number and returns number type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_number_demo
     */
    $.$mol_data_number = (val) => {
        if (typeof val === 'number')
            return val;
        return $mol_fail(new $mol_data_error(`${val} is not a number`));
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Is number'() {
            $mol_data_number(0);
        },
        'Is not number'() {
            $mol_assert_fail(() => {
                $mol_data_number('x');
            }, 'x is not a number');
        },
        'Is object number'() {
            $mol_assert_fail(() => {
                $mol_data_number(new Number(''));
            }, '0 is not a number');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for integer and returns number type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_integer_demo
     */
    function $mol_data_integer(val) {
        const val2 = $mol_data_number(val);
        if (Math.floor(val2) === val2)
            return val2;
        return $mol_fail(new $mol_data_error(`${val} is not an integer`));
    }
    $.$mol_data_integer = $mol_data_integer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Is integer'() {
            $mol_data_integer(0);
        },
        'Is float'() {
            $mol_assert_fail(() => {
                $mol_data_integer(1.1);
            }, '1.1 is not an integer');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Checks for given runtype and returns tagged version of returned type.
     * @see https://mol.hyoo.ru/#!section=demos/demo=mol_data_tagged_demo
     */
    function $mol_data_tagged(config) {
        return config;
    }
    $.$mol_data_tagged = $mol_data_tagged;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'tagged typing'() {
            const { Weight, Length } = $mol_data_tagged({
                Weight: $mol_data_integer,
                Length: $mol_data_integer,
            });
            Length(20); // Validate
            let len = Length(10); // Inferred type
            len = 20; // Explicit type
            let num = len; // Implicit cast
            len = Length(Weight(20)); // Explicit cast
            // len = 20 // Compile time error
            // len = Weight( 20 ) // Compile time error
            // len = Length( 20.1 ) // Run time error
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function $mol_data_setup(value, config) {
        return Object.assign(value, {
            config,
            Value: null
        });
    }
    $.$mol_data_setup = $mol_data_setup;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'config by value'() {
            const N = $mol_data_setup((a) => a, 5);
            $mol_assert_equal(N.config, 5);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_func_is_class(func) {
        return Object.getOwnPropertyDescriptor(func, 'prototype')?.writable === false;
    }
    $.$mol_func_is_class = $mol_func_is_class;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'function'() {
            $mol_assert_not($mol_func_is_class(function () { }));
        },
        'generator'() {
            $mol_assert_not($mol_func_is_class(function* () { }));
        },
        'async'() {
            $mol_assert_not($mol_func_is_class(async function () { }));
        },
        'arrow'() {
            $mol_assert_not($mol_func_is_class(() => null));
        },
        'named class'() {
            $mol_assert_ok($mol_func_is_class(class Foo {
            }));
        },
        'unnamed class'() {
            $mol_assert_ok($mol_func_is_class(class {
            }));
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Combines list of unary functions/classes to one function.
     *
     * 	const reparse = $mol_data_pipe( JSON.stringify , JSON.parse )
     **/
    function $mol_data_pipe(...funcs) {
        return $mol_data_setup(function (input) {
            let value = input;
            for (const func of funcs)
                value = $mol_func_is_class(func) ? new func(value) : func.call(this, value);
            return value;
        }, { funcs });
    }
    $.$mol_data_pipe = $mol_data_pipe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        // @todo enable on strict
        // 'no functions'() {
        // 	const stringify = $mol_data_pipe()
        // 	type Type = $mol_type_assert<
        // 		typeof stringify,
        // 		( input : never )=> never
        // 	>
        // },
        'single function'() {
            const stringify = $mol_data_pipe((input) => input.toString());
            $mol_assert_equal(stringify(5), '5');
        },
        'two functions'() {
            const isLong = $mol_data_pipe((input) => input.toString(), (input) => input.length > 2);
            $mol_assert_equal(isLong(5.0), false);
            $mol_assert_equal(isLong(5.1), true);
        },
        'three functions'() {
            const pattern = $mol_data_pipe((input) => input.toString(), (input) => new RegExp(input), (input) => input.toString());
            $mol_assert_equal(pattern(5), '/5/');
        },
        'classes'() {
            class Box {
                value;
                constructor(value) {
                    this.value = value;
                }
            }
            const boxify = $mol_data_pipe((input) => input.toString(), Box);
            $mol_assert_ok(boxify(5) instanceof Box);
            $mol_assert_like(boxify(5).value, '5');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_rank = $mol_data_tagged({
        $giper_baza_rank: $mol_data_pipe($mol_data_integer, (rank) => {
            if (rank >= $.$giper_baza_rank_deny && rank <= $.$giper_baza_rank_rule)
                return rank;
            $mol_fail(new $mol_data_error(`${rank} is out of Ran range`));
        }),
    }).$giper_baza_rank;
    /** Makes Rank from Tier and Fame names. */
    function $giper_baza_rank_make(tier, fame) {
        return ($giper_baza_rank_tier[tier] | $giper_baza_rank_rate[fame]);
    }
    $.$giper_baza_rank_make = $giper_baza_rank_make;
    /** Access level: deny, read, post, pull, rule */
    let $giper_baza_rank_tier;
    (function ($giper_baza_rank_tier) {
        /** Forbidden. There is no access, neither read nor write. */
        $giper_baza_rank_tier[$giper_baza_rank_tier["deny"] = 0] = "deny";
        /** Read only */
        $giper_baza_rank_tier[$giper_baza_rank_tier["read"] = 16] = "read";
        /** Post changes (Sand) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["post"] = 48] = "post";
        /** Pull forks (Sand) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["pull"] = 112] = "pull";
        /** Full control (Sand, Gift) */
        $giper_baza_rank_tier[$giper_baza_rank_tier["rule"] = 240] = "rule";
    })($giper_baza_rank_tier = $.$giper_baza_rank_tier || ($.$giper_baza_rank_tier = {}));
    function $giper_baza_rank_tier_of(rank) {
        return rank & 0b1111_0000;
    }
    $.$giper_baza_rank_tier_of = $giper_baza_rank_tier_of;
    /** Work as bits count by Rate */
    $.$giper_baza_rank_work_rates = [
        0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF, 0xF,
        0xE, 0xE, 0xE, 0xE, 0xD, 0xD, 0xD, 0xD,
        0xC, 0xC, 0xB, 0xB, 0xA, 0xA, 0x9, 0x9,
        0x8, 0x7, 0x6, 0x5, 0x4, 0x3, 0x2, 0x1,
        0x0,
    ];
    /** Ease of making changes, depends on fame: evil, harm, even, nice, good */
    let $giper_baza_rank_rate;
    (function ($giper_baza_rank_rate) {
        /** Days delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["late"] = 0] = "late";
        /** Seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["long"] = 12] = "long";
        /** Half-second delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["slow"] = 13] = "slow";
        /** Milli-seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["fast"] = 14] = "fast";
        /** Micro-seconds delay. */
        $giper_baza_rank_rate[$giper_baza_rank_rate["just"] = 15] = "just";
    })($giper_baza_rank_rate = $.$giper_baza_rank_rate || ($.$giper_baza_rank_rate = {}));
    function $giper_baza_rank_rate_of(rank) {
        return rank & 0b0000_1111;
    }
    $.$giper_baza_rank_rate_of = $giper_baza_rank_rate_of;
    $.$giper_baza_rank_deny = $giper_baza_rank_make('deny', 'late');
    $.$giper_baza_rank_read = $giper_baza_rank_make('read', 'late');
    $.$giper_baza_rank_rule = $giper_baza_rank_make('rule', 'just');
    function $giper_baza_rank_pull(rate) {
        return $giper_baza_rank_make('pull', rate);
    }
    $.$giper_baza_rank_pull = $giper_baza_rank_pull;
    function $giper_baza_rank_post(rate) {
        return $giper_baza_rank_make('post', rate);
    }
    $.$giper_baza_rank_post = $giper_baza_rank_post;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Kind of Unit */
    let $giper_baza_unit_kind;
    (function ($giper_baza_unit_kind) {
        /** Unit of data. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["sand"] = $giper_baza_slot_kind.sand] = "sand";
        /** Rights/Keys sharing. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["gift"] = $giper_baza_slot_kind.gift] = "gift";
        /** Sign for hash list. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["seal"] = $giper_baza_slot_kind.seal] = "seal";
        /** Public key. */
        $giper_baza_unit_kind[$giper_baza_unit_kind["pass"] = $giper_baza_slot_kind.pass] = "pass";
    })($giper_baza_unit_kind = $.$giper_baza_unit_kind || ($.$giper_baza_unit_kind = {}));
    $.$giper_baza_unit_trusted = new WeakSet();
    function $giper_baza_unit_trusted_grant(unit) {
        if (unit instanceof $giper_baza_auth_pass)
            return;
        $.$giper_baza_unit_trusted.add(unit);
    }
    $.$giper_baza_unit_trusted_grant = $giper_baza_unit_trusted_grant;
    function $giper_baza_unit_trusted_check(unit) {
        if (unit instanceof $giper_baza_auth_pass)
            return true;
        return $.$giper_baza_unit_trusted.has(unit);
    }
    $.$giper_baza_unit_trusted_check = $giper_baza_unit_trusted_check;
    /** Order units: lord / seal / gift / sand */
    function $giper_baza_unit_sort(units) {
        const nodes = new Map();
        const graph = new $mol_graph();
        for (const unit of units) {
            if (unit instanceof $giper_baza_auth_pass) {
                nodes.set(unit.lord().str, unit);
            }
            else {
                if (unit instanceof $giper_baza_unit_sand && !unit.encoded())
                    continue;
                const self = unit.hash().str;
                nodes.set(self, unit);
            }
        }
        for (const unit of units) {
            if (unit instanceof $giper_baza_auth_pass)
                continue;
            unit.choose({
                gift: gift => {
                    graph.link(gift, nodes.get(gift.lord().str) ?? null, 1); // gift => lord
                    graph.link(gift, null, 0); // gift -> every
                    if (gift.lord().str === gift.mate().str)
                        return;
                    graph.link(nodes.get(gift.mate().str) ?? null, gift, 1); // mate => gift
                },
                sand: sand => {
                    graph.link(sand, nodes.get(sand.lord().str) ?? null, 1); // sand => lord
                    graph.link(sand, null, 1); // sand => every
                },
                seal: seal => {
                    graph.link(seal, nodes.get(seal.lord().str) ?? null, 0); // seal -> lord
                    graph.link(seal, null, 0); // seal -> every
                    for (const hash of seal.hash_list()) {
                        graph.link(nodes.get(hash.str) ?? null, seal, 1); // unit => seal
                    }
                }
            });
        }
        graph.acyclic(e => e);
        return [...graph.sorted].filter(Boolean);
    }
    $.$giper_baza_unit_sort = $giper_baza_unit_sort;
    /** Minimal independent stable part of information. */
    class $giper_baza_unit_base extends $mol_buffer {
        /**
         * Compare Seals on timeline ( right - left )
         * Priority: time > lord > tick
         */
        static compare(left, right) {
            if (!left && !right)
                return 0;
            if (!left)
                return +1;
            if (!right)
                return -1;
            return (right.time() - left.time())
                || $giper_baza_link_compare(left.lord(), right.lord())
                || (right.tick() - left.tick());
        }
        static narrow(buf) {
            const kind = $giper_baza_unit_kind[new $mol_buffer(buf).uint8(0)];
            const Type = {
                sand: $giper_baza_unit_sand,
                gift: $giper_baza_unit_gift,
                seal: $giper_baza_unit_seal,
                pass: $giper_baza_auth_pass,
            }[kind];
            return new Type(buf);
        }
        constructor(buffer, byteOffset = 0, byteLength = buffer.byteLength) {
            super(buffer, byteOffset, byteLength);
        }
        kind(next) {
            const val = this.uint8(0, next && $giper_baza_unit_kind[next]);
            const kind = $giper_baza_unit_kind[val];
            if (kind)
                return kind;
            $mol_fail(new Error(`Unknown unit kind (${val})`));
        }
        choose(ways) {
            return ways[this.kind()](this);
        }
        path() {
            throw new Error('Unimplemented');
        }
        id6(offset, next) {
            if (next === undefined) {
                return $giper_baza_link.from_bin(new Uint8Array(this.buffer, this.byteOffset + offset, 6));
            }
            else {
                const bin = next.toBin();
                if (bin.byteLength === 0)
                    return next;
                if (bin.byteLength !== 6)
                    $mol_fail(new Error(`Wrong Link size (${next})`));
                this.asArray().set(bin, this.byteOffset + offset);
                return next;
            }
        }
        id12(offset, next) {
            if (next === undefined) {
                return $giper_baza_link.from_bin(new Uint8Array(this.buffer, this.byteOffset + offset, 12));
            }
            else {
                const bin = next.toBin();
                if (bin.byteLength === 0)
                    return next;
                if (bin.byteLength !== 12)
                    $mol_fail(new Error(`Wrong Link size (${next})`));
                this.asArray().set(bin, this.byteOffset + offset);
                return next;
            }
        }
        /** Seconds from UNIX epoch */
        time(next) {
            return this.uint32(4, next);
        }
        moment() {
            return new $mol_time_moment(Number(this.time() * 1000));
        }
        /** Step in transaction */
        tick(next) {
            return this.uint16(2, next);
        }
        /** Monotonic Real+Logic Time */
        time_tick(next) {
            if (!next)
                return this.tick() + this.time() * 2 ** 16;
            this.tick(next % 2 ** 16);
            this.time(Math.floor(next / 2 ** 16));
            return next;
        }
        _lord = null;
        lord(next) {
            if (next)
                return this._lord = this.id12(8, next);
            return this._lord ?? (this._lord = this.id12(8));
        }
        /** Unique number for encryption */
        salt() {
            return new Uint8Array(this.buffer, this.byteOffset + 2, 16); /* tick(2), time(4), lord(10) */
        }
        hash() {
            return $giper_baza_link.hash_bin(this.asArray());
        }
        tier_min() {
            return $giper_baza_rank_tier.rule;
        }
        encoded() {
            return true;
        }
        _land = null;
        _alive = false;
        dump() {
            return {};
        }
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return this.inspect();
        }
        inspect() {
            const hash = $mol_term_color.cyan('#' + this.hash().str);
            const lord = $mol_term_color.magenta('@' + this.lord().str);
            const time = $mol_term_color.gray($giper_baza_time_dump(this.time(), this.tick()));
            return `${lord} ${hash} ${time}`;
        }
        toJSON() {
            return this.toString();
        }
        toString() {
            const hash = '#' + this.hash().str;
            const lord = '@' + this.lord().str;
            const time = $giper_baza_time_dump(this.time(), this.tick());
            return `${lord} ${hash} ${time}`;
        }
    }
    $.$giper_baza_unit_base = $giper_baza_unit_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'gift unit type'() {
            const gift = $giper_baza_unit_gift.make();
            gift.rank($giper_baza_rank_rule);
            $mol_assert_equal(gift.kind(), 'gift');
            $mol_assert_equal(gift.rank(), $giper_baza_rank_rule);
        },
        'data unit type'() {
            const unit = $giper_baza_unit_sand.make(2);
            unit.ball(new Uint8Array([0xFF, 0xFF]));
            $mol_assert_equal(unit.kind(), 'sand');
            $mol_assert_equal(unit.size(), 2);
            $mol_assert_equal(unit.ball(), new Uint8Array([0xFF, 0xFF]));
        },
        'big data unit type'() {
            const unit = $giper_baza_unit_sand.make(1000);
            unit.ball(new Uint8Array(1000));
            $mol_assert_equal(unit.kind(), 'sand');
            $mol_assert_equal(unit.size(), 1000);
            $mol_assert_equal(unit.ball(), new Uint8Array(1000));
        },
        'gift unit fields'() {
            const unit = $giper_baza_unit_gift.make();
            $mol_assert_equal(unit.time(), 0);
            $mol_assert_equal(unit.mate(), $giper_baza_link.hole);
            unit.time_tick(0xd1d2d3d4d5d6);
            unit.mate(new $giper_baza_link('ÆPv6æfj3_9vX08ÆLx'));
            $mol_assert_equal(unit.time_tick(), 0xd1d2d3d4d5d6);
            $mol_assert_equal(unit.mate(), new $giper_baza_link('ÆPv6æfj3_9vX08ÆLx'));
        },
        'data unit fields'() {
            const unit = $giper_baza_unit_sand.make(0);
            $mol_assert_equal(unit.time(), 0);
            $mol_assert_equal(unit.head(), $giper_baza_link.hole);
            $mol_assert_equal(unit.self(), $giper_baza_link.hole);
            $mol_assert_equal(unit.lead(), $giper_baza_link.hole);
            unit.time_tick(0xd1d2d3d4d5d6);
            unit.head(new $giper_baza_link('ÆPv6æfj3'));
            unit.self(new $giper_baza_link('Pv6æfj39'));
            unit.lead(new $giper_baza_link('v6æfj39v'));
            $mol_assert_equal(unit.time_tick(), 0xd1d2d3d4d5d6);
            $mol_assert_equal(unit.head(), new $giper_baza_link('ÆPv6æfj3'));
            $mol_assert_equal(unit.self(), new $giper_baza_link('Pv6æfj39'));
            $mol_assert_equal(unit.lead(), new $giper_baza_link('v6æfj39v'));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Small, simple, powerful, and fast TypeScript/JavaScript library for proper date/time/duration/interval arithmetic.
     *
     * Immutable iso8601 time interval representation.
     * @see http://localhost:9080/mol/app/docs/-/test.html#!demo=mol_time_demo
     */
    class $mol_time_interval extends $mol_time_base {
        constructor(config) {
            super();
            if (typeof config === 'string') {
                var chunks = config.split('/');
                if (chunks[0]) {
                    if (chunks[0][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[0]);
                    }
                    else {
                        this._start = new $mol_time_moment(chunks[0]);
                    }
                }
                else {
                    this._start = new $mol_time_moment();
                }
                if (chunks[1]) {
                    if (chunks[1][0].toUpperCase() === 'P') {
                        this._duration = new $mol_time_duration(chunks[1]);
                    }
                    else {
                        this._end = new $mol_time_moment(chunks[1]);
                    }
                }
                else {
                    this._end = new $mol_time_moment();
                }
                return;
            }
            if (config.start !== undefined)
                this._start = new $mol_time_moment(config.start);
            if (config.end !== undefined)
                this._end = new $mol_time_moment(config.end);
            if (config.duration !== undefined)
                this._duration = new $mol_time_duration(config.duration);
        }
        _start;
        get start() {
            if (this._start)
                return this._start;
            return this._start = this._end.shift(this._duration.mult(-1));
        }
        _end;
        get end() {
            if (this._end)
                return this._end;
            return this._end = this._start.shift(this._duration);
        }
        _duration;
        get duration() {
            if (this._duration)
                return this._duration;
            return this._duration = new $mol_time_duration(this._end.valueOf() - this._start.valueOf());
        }
        toJSON() { return this.toString(); }
        toString() {
            return (this._start || this._duration || '').toString() + '/' + (this._end || this._duration || '').toString();
        }
        [Symbol.toPrimitive](mode) {
            return this.toString();
        }
    }
    $.$mol_time_interval = $mol_time_interval;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'triplets'() {
            $mol_assert_equal(new $mol_time_interval('2015-01-01/P1M').end.toString(), '2015-02-01');
            $mol_assert_equal(new $mol_time_interval('P1M/2015-02-01').start.toString(), '2015-01-01');
            $mol_assert_equal(new $mol_time_interval('2015-01-01/2015-02-01').duration.toString(), 'PT2678400S');
        },
        'comparison'() {
            const iso = '2021-01-02/2022-03-04';
            $mol_assert_like(new $mol_time_interval(iso), new $mol_time_interval(iso));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Position in any resource. */
    class $mol_span extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
            super();
            this.uri = uri;
            this.source = source;
            this.row = row;
            this.col = col;
            this.length = length;
            this[Symbol.toStringTag] = this.uri + ('#' + this.row + ':' + this.col + '/' + this.length);
        }
        /** Span for begin of unknown resource */
        static unknown = $mol_span.begin('?');
        /** Makes new span for begin of resource. */
        static begin(uri, source = '') {
            return new $mol_span(uri, source, 1, 1, 0);
        }
        /** Makes new span for end of resource. */
        static end(uri, source) {
            return new $mol_span(uri, source, 1, source.length + 1, 0);
        }
        /** Makes new span for entire resource. */
        static entire(uri, source) {
            return new $mol_span(uri, source, 1, 1, source.length);
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return {
                uri: this.uri,
                row: this.row,
                col: this.col,
                length: this.length
            };
        }
        /** Makes new error for this span. */
        error(message, Class = Error) {
            return new Class(`${message} (${this})`);
        }
        /** Makes new span for same uri. */
        span(row, col, length) {
            return new $mol_span(this.uri, this.source, row, col, length);
        }
        /** Makes new span after end of this. */
        after(length = 0) {
            return new $mol_span(this.uri, this.source, this.row, this.col + this.length, length);
        }
        /** Makes new span between begin and end. */
        slice(begin, end = -1) {
            let len = this.length;
            if (begin < 0)
                begin += len;
            if (end < 0)
                end += len;
            if (begin < 0 || begin > len)
                this.$.$mol_fail(this.error(`Begin value '${begin}' out of range`, RangeError));
            if (end < 0 || end > len)
                this.$.$mol_fail(this.error(`End value '${end}' out of range`, RangeError));
            if (end < begin)
                this.$.$mol_fail(this.error(`End value '${end}' can't be less than begin value`, RangeError));
            return this.span(this.row, this.col + begin, end - begin);
        }
    }
    $.$mol_span = $mol_span;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'span for same uri'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.span(4, 5, 8);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 4);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 8);
        },
        'span after of given position'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const child = span.after(11);
            $mol_assert_equal(child.uri, 'test.ts');
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 7);
            $mol_assert_equal(child.length, 11);
        },
        'slice span - regular'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(1, 4);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 4);
            $mol_assert_equal(child.length, 3);
            const child2 = span.slice(2, 2);
            $mol_assert_equal(child2.col, 5);
            $mol_assert_equal(child2.length, 0);
        },
        'slice span - negative'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            const child = span.slice(-3, -1);
            $mol_assert_equal(child.row, 1);
            $mol_assert_equal(child.col, 5);
            $mol_assert_equal(child.length, 2);
        },
        'slice span - out of range'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 5);
            $mol_assert_fail(() => span.slice(-1, 3), `End value '3' can't be less than begin value (test.ts#1:3/5)`);
            $mol_assert_fail(() => span.slice(1, 6), `End value '6' out of range (test.ts#1:3/5)`);
            $mol_assert_fail(() => span.slice(1, 10), `End value '10' out of range (test.ts#1:3/5)`);
        },
        'error handling'($) {
            const span = new $mol_span('test.ts', '', 1, 3, 4);
            const error = span.error('Some error');
            $mol_assert_equal(error.message, 'Some error (test.ts#1:3/4)');
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Syntax error with cordinates and source line snippet. */
    class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
            super(`${reason}\n${span}\n${line.substring(0, span.col - 1).replace(/\S/g, ' ')}${''.padEnd(span.length, '!')}\n${line}`);
            this.reason = reason;
            this.line = line;
            this.span = span;
        }
    }
    $.$mol_error_syntax = $mol_error_syntax;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Parses tree format from string. */
    function $mol_tree2_from_string(str, uri = '?') {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
            var indent = 0;
            var line_start = pos;
            row++;
            // read indent
            while (str.length > pos && str[pos] == '\t') {
                indent++;
                pos++;
            }
            if (!root.kids.length) {
                min_indent = indent;
            }
            indent -= min_indent;
            // invalid tab size
            if (indent < 0 || indent >= stack.length) {
                const sp = span.span(row, 1, pos - line_start);
                // skip error line
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                if (indent < 0) {
                    if (str.length > pos) {
                        this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
                    }
                }
                else {
                    this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
                }
            }
            stack.length = indent + 1;
            var parent = stack[indent];
            // parse types
            while (str.length > pos && str[pos] != '\\' && str[pos] != '\n') {
                // type can not contain space and tab
                var error_start = pos;
                while (str.length > pos && (str[pos] == ' ' || str[pos] == '\t')) {
                    pos++;
                }
                if (pos > error_start) {
                    let line_end = str.indexOf('\n', pos);
                    if (line_end === -1)
                        line_end = str.length;
                    const sp = span.span(row, error_start - line_start + 1, pos - error_start);
                    this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
                }
                // read type
                var type_start = pos;
                while (str.length > pos &&
                    str[pos] != '\\' &&
                    str[pos] != ' ' &&
                    str[pos] != '\t' &&
                    str[pos] != '\n') {
                    pos++;
                }
                if (pos > type_start) {
                    let next = new $mol_tree2(str.slice(type_start, pos), '', [], span.span(row, type_start - line_start + 1, pos - type_start));
                    const parent_kids = parent.kids;
                    parent_kids.push(next);
                    parent = next;
                }
                // read one space if exists
                if (str.length > pos && str[pos] == ' ') {
                    pos++;
                }
            }
            // read data
            if (str.length > pos && str[pos] == '\\') {
                var data_start = pos;
                while (str.length > pos && str[pos] != '\n') {
                    pos++;
                }
                let next = new $mol_tree2('', str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
                const parent_kids = parent.kids;
                parent_kids.push(next);
                parent = next;
            }
            // now must be end of text
            if (str.length === pos && stack.length > 0) {
                const sp = span.span(row, pos - line_start + 1, 1);
                this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
            }
            stack.push(parent);
            pos++;
        }
        return root;
    }
    $.$mol_tree2_from_string = $mol_tree2_from_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'tree parsing'($) {
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("foo\nbar\n").kids[1].type, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo\n\n\n").kids.length, 1);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids.length, 2);
            $mol_assert_equal($.$mol_tree2_from_string("=foo\n\\bar\n").kids[1].value, "bar");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar \\pol\n").kids[0].kids[0].kids[0].value, "pol");
            $mol_assert_equal($.$mol_tree2_from_string("foo bar\n\t\\pol\n\t\\men\n").kids[0].kids[0].kids[1].value, "men");
            $mol_assert_equal($.$mol_tree2_from_string('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'Too many tabs'($) {
            const tree = `
				foo
						bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too many tabs\ntest#3:1/6\n!!!!!!\n\t\t\t\t\t\tbar');
        },
        'Too few tabs'($) {
            const tree = `
					foo
				bar
			`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Too few tabs\ntest#3:1/4\n!!!!\n\t\t\t\tbar');
        },
        'Wrong nodes separator at start'($) {
            const tree = `foo\n \tbar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#2:1/2\n!!\n \tbar');
        },
        'Wrong nodes separator in the middle'($) {
            const tree = `foo  bar\n`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar');
        },
        'Unexpected EOF, LF required'($) {
            const tree = `	foo`;
            $mol_assert_fail(() => {
                $.$mol_tree2_from_string(tree, 'test');
            }, 'Unexpected EOF, LF required\ntest#1:5/1\n	   !\n	foo');
        },
        'Errors skip and collect'($) {
            const tree = `foo  bar`;
            const errors = [];
            const $$ = $.$mol_ambient({
                $mol_fail: (error) => {
                    errors.push(error.message);
                    return null;
                }
            });
            const res = $$.$mol_tree2_from_string(tree, 'test');
            $mol_assert_like(errors, [
                'Wrong nodes separator\ntest#1:5/1\n    !\nfoo  bar',
                'Unexpected EOF, LF required\ntest#1:9/1\n        !\nfoo  bar',
            ]);
            $mol_assert_equal(res.toString(), 'foo bar\n');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Serializes tree to string in tree format. */
    function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree, prefix = '') {
            if (tree.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output.push(tree.type);
                if (tree.kids.length == 1) {
                    output.push(' ');
                    dump(tree.kids[0], prefix);
                    return;
                }
                output.push("\n");
            }
            else if (tree.value.length || prefix.length) {
                output.push("\\" + tree.value + "\n");
            }
            for (const kid of tree.kids) {
                output.push(prefix);
                dump(kid, prefix + "\t");
            }
        }
        dump(tree);
        return output.join('');
    }
    $.$mol_tree2_to_string = $mol_tree2_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'all cases of using maybe'() {
            $mol_assert_equal($mol_maybe(0)[0], 0);
            $mol_assert_equal($mol_maybe(false)[0], false);
            $mol_assert_equal($mol_maybe(null)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0)[0], void 0);
            $mol_assert_equal($mol_maybe(void 0).map(v => v.toString())[0], void 0);
            $mol_assert_equal($mol_maybe(0).map(v => v.toString())[0], '0');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Abstract Syntax Tree with human readable serialization.
     * Avoid direct instantiation. Use static factories instead.
     * @see https://github.com/nin-jin/tree.d
     */
    class $mol_tree2 extends Object {
        type;
        value;
        kids;
        span;
        constructor(
        /** Type of structural node, `value` should be empty */
        type, 
        /** Content of data node, `type` should be empty */
        value, 
        /** Child nodes */
        kids, 
        /** Position in most far source resource */
        span) {
            super();
            this.type = type;
            this.value = value;
            this.kids = kids;
            this.span = span;
            this[Symbol.toStringTag] = type || '\\' + value;
        }
        /** Makes collection node. */
        static list(kids, span = $mol_span.unknown) {
            return new $mol_tree2('', '', kids, span);
        }
        /** Makes new derived collection node. */
        list(kids) {
            return $mol_tree2.list(kids, this.span);
        }
        /** Makes data node for any string. */
        static data(value, kids = [], span = $mol_span.unknown) {
            const chunks = value.split('\n');
            if (chunks.length > 1) {
                let kid_span = span.span(span.row, span.col, 0);
                const data = chunks.map(chunk => {
                    kid_span = kid_span.after(chunk.length);
                    return new $mol_tree2('', chunk, [], kid_span);
                });
                kids = [...data, ...kids];
                value = '';
            }
            return new $mol_tree2('', value, kids, span);
        }
        /** Makes new derived data node. */
        data(value, kids = []) {
            return $mol_tree2.data(value, kids, this.span);
        }
        /** Makes struct node. */
        static struct(type, kids = [], span = $mol_span.unknown) {
            if (/[ \n\t\\]/.test(type)) {
                $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
            }
            return new $mol_tree2(type, '', kids, span);
        }
        /** Makes new derived structural node. */
        struct(type, kids = []) {
            return $mol_tree2.struct(type, kids, this.span);
        }
        /** Makes new derived node with different kids id defined. */
        clone(kids, span = this.span) {
            return new $mol_tree2(this.type, this.value, kids, span);
        }
        /** Returns multiline text content. */
        text() {
            var values = [];
            for (var kid of this.kids) {
                if (kid.type)
                    continue;
                values.push(kid.value);
            }
            return this.value + values.join('\n');
        }
        /** Parses tree format. */
        /** @deprecated Use $mol_tree2_from_string */
        static fromString(str, uri = 'unknown') {
            return $$.$mol_tree2_from_string(str, uri);
        }
        /** Serializes to tree format. */
        toString() {
            return $$.$mol_tree2_to_string(this);
        }
        /** Makes new tree with node overrided by path. */
        insert(value, ...path) {
            return this.update($mol_maybe(value), ...path)[0];
        }
        /** Makes new tree with node overrided by path. */
        update(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.kids.flatMap((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.update(value, ...path.slice(1));
                }).filter(Boolean);
                if (!replaced && value) {
                    sub.push(...this.struct(type, []).update(value, ...path.slice(1)));
                }
                return [this.clone(sub)];
            }
            else if (typeof type === 'number') {
                const ins = (this.kids[type] || this.list([]))
                    .update(value, ...path.slice(1));
                return [this.clone([
                        ...this.kids.slice(0, type),
                        ...ins,
                        ...this.kids.slice(type + 1),
                    ])];
            }
            else {
                const kids = ((this.kids.length === 0) ? [this.list([])] : this.kids)
                    .flatMap(item => item.update(value, ...path.slice(1)));
                return [this.clone(kids)];
            }
        }
        /** Query nodes by path. */
        select(...path) {
            let next = [this];
            for (const type of path) {
                if (!next.length)
                    break;
                const prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.kids) {
                                if (child.type == type) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.kids.length)
                                next.push(item.kids[type]);
                            break;
                        default: next.push(...item.kids);
                    }
                }
            }
            return this.list(next);
        }
        /** Filter kids by path or value. */
        filter(path, value) {
            const sub = this.kids.filter(item => {
                var found = item.select(...path);
                if (value === undefined) {
                    return Boolean(found.kids.length);
                }
                else {
                    return found.kids.some(child => child.value == value);
                }
            });
            return this.clone(sub);
        }
        hack_self(belt, context = {}) {
            let handle = belt[this.type] || belt[''];
            if (!handle || handle === Object.prototype[this.type]) {
                handle = (input, belt, context) => [
                    input.clone(input.hack(belt, context), context.span)
                ];
            }
            try {
                return handle(this, belt, context);
            }
            catch (error) {
                error.message += `\n${this.clone([])}${this.span}`;
                $mol_fail_hidden(error);
            }
        }
        /** Transform tree through context with transformers */
        hack(belt, context = {}) {
            return [].concat(...this.kids.map(child => child.hack_self(belt, context)));
        }
        /** Makes Error with node coordinates. */
        error(message, Class = Error) {
            return this.span.error(`${message}\n${this.clone([])}`, Class);
        }
    }
    $.$mol_tree2 = $mol_tree2;
    class $mol_tree2_empty extends $mol_tree2 {
        constructor() {
            super('', '', [], $mol_span.unknown);
        }
    }
    $.$mol_tree2_empty = $mol_tree2_empty;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function check(tree, ideal) {
        $mol_assert_equal(tree.toString(), $$.$mol_tree2_from_string(ideal).toString());
    }
    $mol_test({
        'inserting'($) {
            check($.$mol_tree2_from_string(`
					a b c d
				`).insert($mol_tree2.struct('x'), 'a', 'b', 'c'), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`).insert($mol_tree2.struct('x'), 'a', 'b', 'c', 'd'), `
					a b c x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`)
                .insert($mol_tree2.struct('x'), 0, 0, 0), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`)
                .insert($mol_tree2.struct('x'), 0, 0, 0, 0), `
					a b \\
						x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`)
                .insert($mol_tree2.struct('x'), null, null, null), `
					a b x
				`);
            check($.$mol_tree2_from_string(`
					a b
				`)
                .insert($mol_tree2.struct('x'), null, null, null, null), `
					a b \\
						x
				`);
        },
        'updating'($) {
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([], 'a', 'b', 'c')[0], `
					a b
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([$mol_tree2.struct('x')])[0], `
					x
				`);
            check($.$mol_tree2_from_string(`
					a b c d
				`).update([$mol_tree2.struct('x'), $mol_tree2.struct('y')], 'a', 'b', 'c')[0], `
					a b
						x
						y
				`);
        },
        'deleting'($) {
            const base = $.$mol_tree2_from_string(`
				a b c d
			`);
            check(base.insert(null, 'a', 'b', 'c'), `
					a b
				`);
            check(base.update(base.select('a', 'b', 'c', null).kids, 'a', 'b', 'c')[0], `
					a b d
				`);
            check(base.insert(null, 0, 0, 0), `
					a b
				`);
        },
        'hack'($) {
            const res = $.$mol_tree2_from_string(`
				foo bar xxx
			`)
                .hack({
                'bar': (input, belt) => [input.struct('777', input.hack(belt))],
            });
            $mol_assert_equal(res.map(String), ['foo 777 xxx\n']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_bigint_encode(num) {
        const minus = num < 0n ? 255 : 0;
        num = minus ? -num - 1n : num;
        const bytes = [];
        do {
            let byte = minus ^ Number(num & 255n);
            bytes.push(byte);
            if (num >>= 8n)
                continue;
            if ((minus & 128) !== (byte & 128))
                bytes.push(minus);
            break;
        } while (num);
        return new Uint8Array(bytes);
    }
    $.$mol_bigint_encode = $mol_bigint_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "1 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(0n), new Uint8Array(new Int8Array([0]).buffer));
                $mol_assert_equal($mol_bigint_encode(1n), new Uint8Array(new Int8Array([1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-1n), new Uint8Array(new Int8Array([-1]).buffer));
                $mol_assert_equal($mol_bigint_encode(127n), new Uint8Array(new Int8Array([127]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n), new Uint8Array(new Int8Array([-128]).buffer));
            },
            "2 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n), new Uint8Array(new Int16Array([128]).buffer));
                $mol_assert_equal($mol_bigint_encode(-129n), new Uint8Array(new Int16Array([-129]).buffer));
                $mol_assert_equal($mol_bigint_encode(128n * 256n - 1n), new Uint8Array(new Int16Array([128 * 256 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n), new Uint8Array(new Int16Array([-128 * 256]).buffer));
            },
            "3 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n), new Uint8Array(new Int32Array([128 * 256]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n - 1n), new Uint8Array(new Int32Array([-128 * 256 - 1]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 2n - 1n), new Uint8Array(new Int32Array([128 * 256 ** 2 - 1]).buffer).slice(0, 3));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 2n), new Uint8Array(new Int32Array([-128 * 256 ** 2]).buffer).slice(0, 3));
            },
            "4 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 2n), new Uint8Array(new Int32Array([128 * 256 ** 2]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 2n - 1n), new Uint8Array(new Int32Array([-128 * 256 ** 2 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 3n - 1n), new Uint8Array(new Int32Array([128 * 256 ** 3 - 1]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 3n), new Uint8Array(new Int32Array([-128 * 256 ** 3]).buffer));
            },
            "8 byte int"($) {
                $mol_assert_equal($mol_bigint_encode(128n * 256n ** 7n - 1n), new Uint8Array(new BigInt64Array([128n * 256n ** 7n - 1n]).buffer));
                $mol_assert_equal($mol_bigint_encode(-128n * 256n ** 7n), new Uint8Array(new BigInt64Array([-128n * 256n ** 7n]).buffer));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const ascii_set = [...`0123456789.,:;()'"- \n`].map(c => c.charCodeAt(0));
    const ascii_map = new Array(0x80).fill(0);
    for (let i = 0; i < ascii_set.length; ++i)
        ascii_map[ascii_set[i]] = i | 0x80;
    const diacr_set = [
        0x00, 0x01, 0x0F, 0x0B, 0x07, 0x08, 0x12, 0x13, // up
        0x02, 0x0C, 0x06, 0x11, 0x03, 0x09, 0x0A, 0x04, // up
        0x28, 0x31, 0x27, 0x26, 0x23, // down
    ];
    const diacr_map = new Array(0x80).fill(0);
    for (let i = 0; i < diacr_set.length; ++i)
        diacr_map[diacr_set[i]] = i | 0x80;
    const wide_offset = 0x0E_00;
    const wide_limit = 128 * 128 * 8 + wide_offset;
    const tiny_limit = 128 * 98;
    const full_mode = 0x95;
    const wide_mode = 0x96;
    const tiny_mode = 0x9E;
    /** Encode text to Unicode Compact Format. */
    function $mol_charset_ucf_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_ucf_encode_to(str, buf));
    }
    $.$mol_charset_ucf_encode = $mol_charset_ucf_encode;
    function $mol_charset_ucf_encode_to(str, buf, from = 0) {
        let pos = from;
        let mode = tiny_mode;
        const write_high = (code) => {
            buf[pos++] = ((code + 128 - mode) & 0x7F) | 0x80;
        };
        const write_remap = (code) => {
            const fast = ascii_map[code];
            if (fast)
                write_high(fast);
            else
                buf[pos++] = code;
        };
        const write_mode = (m) => {
            write_high(m);
            mode = m;
        };
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code >= 0xD8_00 && code < 0xDC_00)
                code = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
            if (code < 0x80) { // ASCII
                if (mode !== tiny_mode) {
                    const fast = ascii_map[code];
                    if (!fast)
                        write_mode(tiny_mode);
                }
                buf[pos++] = code;
            }
            else if (code < tiny_limit) { // Tiny
                const page = (code >> 7) + tiny_mode;
                code &= 0x7F;
                if (page === 164) { // diacritics
                    const fast = diacr_map[code];
                    if (fast) {
                        if (mode !== tiny_mode)
                            write_mode(tiny_mode);
                        write_high(fast);
                        continue;
                    }
                }
                if (mode !== page)
                    write_mode(page);
                write_remap(code);
            }
            else if (code < wide_limit) { // Wide
                code -= wide_offset;
                const page = (code >> 14) + wide_mode;
                if (mode !== page)
                    write_mode(page);
                write_remap(code & 0x7F);
                write_remap((code >> 7) & 0x7F);
            }
            else { // Full
                if (mode !== full_mode)
                    write_mode(full_mode);
                write_remap(code & 0x7F);
                write_remap((code >> 7) & 0x7F);
                write_remap(code >> 14);
            }
        }
        if (mode !== tiny_mode)
            write_mode(tiny_mode);
        return pos - from;
    }
    $.$mol_charset_ucf_encode_to = $mol_charset_ucf_encode_to;
    /** Decode text from Unicode Compact Format. */
    function $mol_charset_ucf_decode(buffer, mode = tiny_mode) {
        let text = '';
        let pos = 0;
        let page_offset = 0;
        /** Char by char concatenation builds a rope with ~32 bytes per char, kept until flattened. */
        const codes = [];
        const flush = () => {
            text += String.fromCodePoint(...codes);
            codes.length = 0;
            return text;
        };
        const read_code = () => {
            let code = buffer[pos++];
            if (code >= 0x80)
                code = ((mode + code) & 0x7F) | 0x80;
            return code;
        };
        const read_remap = () => {
            let code = read_code();
            if (code >= 0x80)
                code = ascii_set[code - 0x80];
            if (code === undefined)
                $mol_fail(new Error('Wrong byte', { cause: { text: flush(), pos: pos - 1 } }));
            return code;
        };
        while (pos < buffer.length) {
            let code = read_code();
            if (code < full_mode) { // Char Code
                if (mode === tiny_mode) {
                    if (code >= 0x80) {
                        code = diacr_set[code - 0x080] | (6 << 7);
                    }
                }
                else if (!ascii_map[code]) {
                    if (code >= 0x80)
                        code = ascii_set[code - 0x80];
                    if (mode < tiny_mode) {
                        if (pos === buffer.length)
                            $mol_fail(new Error('Expected 2 bytes', { cause: { text: flush(), pos: pos - 1 } }));
                        code |= read_remap() << 7;
                    }
                    if (mode === full_mode) {
                        if (pos === buffer.length)
                            $mol_fail(new Error('Expected 3 bytes', { cause: { text: flush(), pos: pos - 2 } }));
                        code |= read_remap() << 14;
                    }
                    code += page_offset;
                }
                codes.push(code);
                if (codes.length === 1024)
                    flush();
            }
            else if (code >= tiny_mode) { // Tiny Set
                mode = code;
                page_offset = (mode - tiny_mode) << 7;
            }
            else if (code === full_mode) { // Full Set
                mode = code;
                page_offset = 0;
            }
            else { // Wide Set
                mode = code;
                page_offset = ((mode - wide_mode) << 14) + wide_offset;
            }
        }
        if (mode !== tiny_mode) {
            return $mol_fail(new Error('Wrong ending', { cause: { text: flush(), mode } }));
        }
        return flush();
    }
    $.$mol_charset_ucf_decode = $mol_charset_ucf_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        function check(text, bytes) {
            const ideal = new Uint8Array(bytes);
            const actual = $mol_charset_ucf_encode(text);
            $mol_assert_equal($mol_charset_ucf_decode(actual), text);
            $mol_assert_equal(actual, ideal);
        }
        $mol_test({
            "Full ASCII compatible"($) {
                check('hi', [0x68, 0x69]);
            },
            "1B ASCII with diacritic"($) {
                check('allo\u0300', [0x61, 0x6C, 0x6C, 0x6F, 0xE2]);
            },
            "1B Cyrillic"($) {
                check('мир', [0x88, 0x3C, 0xE2, 0x40, 0xF8]);
            },
            "1B Cyrillic with nummbers and punctuation"($) {
                check('м.1', [0x88, 0x3C, 0x2E, 0x31, 0xF8]);
            },
            "2B Kanji"($) {
                check('美', [0xF9, 0x0E, 0x63, 0x87]);
            },
            "3B rare Kanji"($) {
                check('𲎯', [0xF7, 0x2F, 0x47, 0x0C, 0x89]);
            },
            "1B Kana"($) {
                check('しい', [0xE0, 0x57, 0x44, 0xA0]);
            },
            "2B Emoji"($) {
                check('🏴', [0xFF, 0x74, 0x4B, 0x81]);
            },
            "2B Emoji with 1B modifiers"($) {
                check('🏴‍☠', [0xFF, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0xB4]);
            },
            "2B Emoji with 3B Tag"($) {
                check('🏴\u{E007F}', [0xFF, 0x74, 0x4B, 0xF8, 0x7F, 0x00, 0xF3, 0x89]);
            },
            "Mixed scripts"($) {
                check('allô 美しい мир, 🏴‍☠\n', [
                    0x61, 0x6C, 0x6C, 0x6F, 0xEA, 0x20, // allô 
                    0xF9, 0x0E, 0x63, 0xE7, 0x57, 0x44, 0x20, // 美しい 
                    0xA8, 0x3C, 0xE2, 0x40, 0x2C, 0x20, // мир, 
                    0xF7, 0x74, 0x4B, 0xC1, 0x0D, 0x8C, 0xA9, 0x0A, // 🏴‍☠\n
                    0xB4,
                ]);
            },
            "Wrong ending"($) {
                const bin = new Uint8Array([0x88, 0x3C, 0xE2, 0x40]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Wrong ending');
                $mol_assert_equal(error.cause.mode, 166);
                $mol_assert_equal(error.cause.text, 'мир');
            },
            "Wrong byte"($) {
                const bin = new Uint8Array([0xFF, 0x74, 0x4B, 0x74, 0x9B, 0x81]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Wrong byte');
                $mol_assert_equal(error.cause.pos, 4);
                $mol_assert_equal(error.cause.text, '🏴');
            },
            "Wrong 2B sequence length"($) {
                const bin = new Uint8Array([0x78, 0xF9, 0x0E]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Expected 2 bytes');
                $mol_assert_equal(error.cause.pos, 2);
                $mol_assert_equal(error.cause.text, 'x');
            },
            "Wrong 3B sequence length"($) {
                const bin = new Uint8Array([0x78, 0xF7, 0x2F, 0x47]);
                const error = $mol_assert_fail(() => $mol_charset_ucf_decode(bin), 'Expected 3 bytes');
                $mol_assert_equal(error.cause.pos, 2);
                $mol_assert_equal(error.cause.text, 'x');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_bigint_decode(buf) {
        if (buf.length === 8)
            return new BigInt64Array(buf.buffer, buf.byteOffset, 1)[0];
        if (buf.length === 4)
            return BigInt(new Int32Array(buf.buffer, buf.byteOffset, 1)[0]);
        if (buf.length === 2)
            return BigInt(new Int16Array(buf.buffer, buf.byteOffset, 1)[0]);
        if (buf.length === 1)
            return BigInt(new Int8Array(buf.buffer, buf.byteOffset, 1)[0]);
        const minus = (buf.at(-1) & 128) ? 255 : 0;
        let result = 0n;
        let offset = 0n;
        for (let i = 0; i < buf.length; i++, offset += 8n) {
            result |= BigInt(buf[i] ^ minus) << offset;
        }
        if (minus)
            result = (result + 1n) * -1n;
        return result;
    }
    $.$mol_bigint_decode = $mol_bigint_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "1 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array), 0n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([1]).buffer)), 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([-1]).buffer)), -1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([127]).buffer)), 127n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int8Array([-128]).buffer)), -128n);
            },
            "2 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([128]).buffer)), 128n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([-129]).buffer)), -129n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([128 * 256 - 1]).buffer)), 128n * 256n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int16Array([-128 * 256]).buffer)), -128n * 256n);
            },
            "3 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256]).buffer).slice(0, 3)), 128n * 256n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 - 1]).buffer).slice(0, 3)), -128n * 256n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 2 - 1]).buffer).slice(0, 3)), 128n * 256n ** 2n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 2]).buffer).slice(0, 3)), -128n * 256n ** 2n);
            },
            "4 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 2]).buffer)), 128n * 256n ** 2n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 2 - 1]).buffer)), -128n * 256n ** 2n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([128 * 256 ** 3 - 1]).buffer)), 128n * 256n ** 3n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new Int32Array([-128 * 256 ** 3]).buffer)), -128n * 256n ** 3n);
            },
            "8 byte int"($) {
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new BigInt64Array([128n * 256n ** 7n - 1n]).buffer)), 128n * 256n ** 7n - 1n);
                $mol_assert_equal($mol_bigint_decode(new Uint8Array(new BigInt64Array([-128n * 256n ** 7n]).buffer)), -128n * 256n ** 7n);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Zero int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(0n)), 0n);
            },
            "Large positive int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(12345678901234567890n)), 12345678901234567890n);
            },
            "Large negative int"($) {
                $mol_assert_equal($mol_bigint_decode($mol_bigint_encode(-12345678901234567890n)), -12345678901234567890n);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let $mol_vary_tip;
    (function ($mol_vary_tip) {
        $mol_vary_tip[$mol_vary_tip["uint"] = 0] = "uint";
        $mol_vary_tip[$mol_vary_tip["link"] = 32] = "link";
        $mol_vary_tip[$mol_vary_tip["spec"] = 64] = "spec";
        $mol_vary_tip[$mol_vary_tip["list"] = 96] = "list";
        $mol_vary_tip[$mol_vary_tip["blob"] = 128] = "blob";
        $mol_vary_tip[$mol_vary_tip["text"] = 160] = "text";
        $mol_vary_tip[$mol_vary_tip["tupl"] = 192] = "tupl";
        $mol_vary_tip[$mol_vary_tip["sint"] = 224] = "sint";
    })($mol_vary_tip = $.$mol_vary_tip || ($.$mol_vary_tip = {}));
    let $mol_vary_len;
    (function ($mol_vary_len) {
        $mol_vary_len[$mol_vary_len["L1"] = 28] = "L1";
        $mol_vary_len[$mol_vary_len["L2"] = 29] = "L2";
        $mol_vary_len[$mol_vary_len["L4"] = 30] = "L4";
        $mol_vary_len[$mol_vary_len["L8"] = 31] = "L8";
        $mol_vary_len[$mol_vary_len["LA"] = 32] = "LA";
    })($mol_vary_len = $.$mol_vary_len || ($.$mol_vary_len = {}));
    let $mol_vary_spec;
    (function ($mol_vary_spec) {
        $mol_vary_spec[$mol_vary_spec["none"] = 'N'.charCodeAt(0)] = "none";
        $mol_vary_spec[$mol_vary_spec["true"] = 'T'.charCodeAt(0)] = "true";
        $mol_vary_spec[$mol_vary_spec["fake"] = 'F'.charCodeAt(0)] = "fake";
        $mol_vary_spec[$mol_vary_spec["both"] = 'B'.charCodeAt(0)] = "both";
        $mol_vary_spec[$mol_vary_spec["fp16"] = 'H'.charCodeAt(0)] = "fp16";
        $mol_vary_spec[$mol_vary_spec["fp32"] = 'S'.charCodeAt(0)] = "fp32";
        $mol_vary_spec[$mol_vary_spec["fp64"] = 'D'.charCodeAt(0)] = "fp64";
        $mol_vary_spec[$mol_vary_spec["f128"] = 'Q'.charCodeAt(0)] = "f128";
        $mol_vary_spec[$mol_vary_spec["f256"] = 'O'.charCodeAt(0)] = "f256";
    })($mol_vary_spec = $.$mol_vary_spec || ($.$mol_vary_spec = {}));
    const pojo_maker = (keys) => (vals) => {
        const obj = {};
        for (let i = 0; i < keys.length; ++i)
            obj[keys[i]] = vals[i];
        return obj;
    };
    /** VaryPack - simple fast compact data binarization format. */
    class $mol_vary_class extends Object {
        lean_symbol = Symbol('$mol_vary_lean');
        array = new Uint8Array(256);
        buffer = new DataView(this.array.buffer);
        /** Packs any data to Uint8Array with deduplication. */
        pack(data) {
            let pos = 0;
            let capacity = 0;
            const offsets = new Map();
            const stack = [];
            const acquire = (size) => {
                if (size < 0)
                    return;
                capacity += size;
                if (this.array.byteLength >= capacity)
                    return;
                const buffer2 = new Uint8Array(Math.ceil(capacity / 4096) * 4096);
                buffer2.set(this.array);
                this.array = buffer2;
                this.buffer = new DataView(this.array.buffer);
            };
            const release = (size) => {
                capacity -= size;
            };
            const calc_size = (val) => {
                if (val < $mol_vary_len.L1)
                    return 1;
                if (val < 2 ** 8)
                    return 2;
                if (val < 2 ** 16)
                    return 3;
                if (val < 2 ** 32)
                    return 5;
                if (val < 2n ** 64n)
                    return 9;
                return $mol_fail(new Error('Too large number'));
            };
            const dump_unum = (tip, val, max = val) => {
                if (max < $mol_vary_len.L1) {
                    this.array[pos++] = tip | Number(val);
                    release(8);
                    return;
                }
                if (tip == $mol_vary_tip.uint) {
                    const offset = offsets.get(val);
                    if (offset !== undefined)
                        return dump_unum($mol_vary_tip.link, offset);
                }
                if (max < 2 ** 8) {
                    this.array[pos++] = tip | $mol_vary_len.L1;
                    this.array[pos++] = Number(val);
                    release(7);
                }
                else if (max < 2 ** 16) {
                    this.array[pos++] = tip | $mol_vary_len.L2;
                    this.buffer.setUint16(pos, Number(val), true);
                    pos += 2;
                    release(6);
                }
                else if (max < 2 ** 32) {
                    this.array[pos++] = tip | $mol_vary_len.L4;
                    this.buffer.setUint32(pos, Number(val), true);
                    pos += 4;
                    release(4);
                }
                else if (max < 2n ** 64n) {
                    this.array[pos++] = tip | $mol_vary_len.L8;
                    this.buffer.setBigUint64(pos, BigInt(val), true);
                    pos += 8;
                }
                else {
                    dump_bint(val);
                }
                if (tip == $mol_vary_tip.uint)
                    offsets.set(val, offsets.size);
            };
            const dump_snum = (val) => {
                if (val > -$mol_vary_len.L1) {
                    this.array[pos++] = Number(val);
                    release(8);
                    return;
                }
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                if (val >= -(2 ** 7)) {
                    this.array[pos++] = -$mol_vary_len.L1;
                    this.array[pos++] = Number(val);
                    release(7);
                }
                else if (val >= -(2 ** 15)) {
                    this.array[pos++] = -$mol_vary_len.L2;
                    this.buffer.setInt16(pos, Number(val), true);
                    pos += 2;
                    release(6);
                }
                else if (val >= -(2 ** 31)) {
                    this.array[pos++] = -$mol_vary_len.L4;
                    this.buffer.setInt32(pos, Number(val), true);
                    pos += 4;
                    release(4);
                }
                else if (val >= -(2n ** 63n)) {
                    this.array[pos++] = -$mol_vary_len.L8;
                    this.buffer.setBigInt64(pos, BigInt(val), true);
                    pos += 8;
                }
                else {
                    dump_bint(val);
                }
                offsets.set(val, offsets.size);
            };
            const dump_bint = (val) => {
                const buf = $mol_bigint_encode(val);
                if (buf.byteLength > (2 ** 16 + 8))
                    $mol_fail(new Error('Number too high', { cause: { val } }));
                acquire(buf.byteLength - 6);
                this.array[pos++] = -$mol_vary_len.LA;
                this.buffer.setUint16(pos, buf.byteLength - 9, true);
                pos += 2;
                this.array.set(buf, pos);
                pos += buf.byteLength;
            };
            const dump_float = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                this.array[pos++] = $mol_vary_spec.fp64;
                this.buffer.setFloat64(pos, val, true);
                pos += 8;
                offsets.set(val, offsets.size);
            };
            const dump_string = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                const len_max = val.length * 3 + 2;
                const len_size = calc_size(len_max);
                acquire(len_max);
                const len = $mol_charset_ucf_encode_to(val, this.array, pos + len_size);
                dump_unum($mol_vary_tip.text, len, len_max);
                pos += len;
                release(len_max - len);
                offsets.set(val, offsets.size);
                return;
            };
            const dump_buffer = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                dump_unum($mol_vary_tip.blob, val.byteLength);
                acquire(1 + val.byteLength);
                if (val instanceof Uint8Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L1;
                else if (val instanceof Uint16Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L2;
                else if (val instanceof Uint32Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L4;
                else if (val instanceof BigUint64Array)
                    this.array[pos++] = $mol_vary_tip.uint | $mol_vary_len.L8;
                else if (val instanceof Int8Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L1;
                else if (val instanceof Int16Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L2;
                else if (val instanceof Int32Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L4;
                else if (val instanceof BigInt64Array)
                    this.array[pos++] = $mol_vary_tip.sint | ~$mol_vary_len.L8;
                else if (typeof Float16Array === 'function' && val instanceof Float16Array)
                    this.array[pos++] = $mol_vary_spec.fp16;
                else if (val instanceof Float32Array)
                    this.array[pos++] = $mol_vary_spec.fp32;
                else if (val instanceof Float64Array)
                    this.array[pos++] = $mol_vary_spec.fp64;
                else
                    $mol_fail(new Error(`Unsupported type`));
                const src = (val instanceof Uint8Array) ? val : new Uint8Array(val.buffer, val.byteOffset, val.byteLength);
                this.array.set(src, pos);
                pos += val.byteLength;
                offsets.set(val, offsets.size);
            };
            const dump_list = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                dump_unum($mol_vary_tip.list, val.length);
                acquire(val.length * 9);
                if (stack.includes(val))
                    $mol_fail(new Error('Cyclic refs', { cause: { stack, val } }));
                stack.push(val);
                for (let i = 0; i < val.length; ++i)
                    dump(val[i]);
                if (stack.at(-1) !== val)
                    $mol_fail(new Error('Broken stack', { cause: { stack, val } }));
                stack.pop();
                offsets.set(val, offsets.size);
            };
            const shapes = new Map();
            const shape = (val) => {
                const keys1 = Object.keys(val);
                const key = keys1.join('\0');
                const keys2 = shapes.get(key);
                if (keys2)
                    return keys2;
                shapes.set(key, keys1);
                return keys1;
            };
            const dump_object = (val) => {
                const offset = offsets.get(val);
                if (offset !== undefined)
                    return dump_unum($mol_vary_tip.link, offset);
                const { 0: keys, 1: vals } = this.lean_find(val)?.(val) ?? [shape(val), Object.values(val)];
                dump_unum($mol_vary_tip.tupl, vals.length);
                acquire((vals.length + 1) * 9);
                dump_list(keys);
                if (stack.includes(val))
                    $mol_fail(new Error('Cyclic refs', { cause: { stack, val } }));
                stack.push(val);
                for (let i = 0; i < vals.length; ++i)
                    dump(vals[i]);
                if (stack.at(-1) !== val)
                    $mol_fail(new Error('Broken stack', { cause: { stack, val } }));
                stack.pop();
                offsets.set(val, offsets.size);
            };
            const dumpers = {
                undefined: () => {
                    this.array[pos++] = $mol_vary_spec.both;
                    capacity -= 8;
                },
                boolean: val => {
                    this.array[pos++] = val ? $mol_vary_spec.true : $mol_vary_spec.fake;
                    capacity -= 8;
                },
                number: val => {
                    if (!Number.isInteger(val))
                        dump_float(val);
                    else
                        dumpers.bigint(val);
                },
                bigint: val => {
                    if (val < 0) {
                        dump_snum(val);
                    }
                    else {
                        dump_unum($mol_vary_tip.uint, val);
                    }
                },
                string: val => dump_string(val),
                object: val => {
                    if (!val) {
                        capacity -= 8;
                        return this.array[pos++] = $mol_vary_spec.none;
                    }
                    if (Array.isArray(val))
                        return dump_list(val);
                    if (ArrayBuffer.isView(val))
                        return dump_buffer(val);
                    return dump_object(val);
                }
            };
            /** Recursive fills buffer with data. */
            const dump = (val) => {
                const dumper = dumpers[typeof val];
                if (!dumper)
                    $mol_fail(new Error(`Unsupported type`));
                dumper(val);
            };
            for (let i = 0; i < data.length; ++i) {
                capacity += 9;
                dump(data[i]);
                if (stack.length)
                    $mol_fail(new Error('Stack underflow', { cause: { stack, item: data[i] } }));
                offsets.clear();
            }
            if (pos !== capacity)
                $mol_fail(new Error('Wrong reserved capacity', { cause: { capacity, size: pos, data } }));
            return this.array.slice(0, pos);
        }
        /** Parses buffer to rich runtime structures. */
        take(array) {
            const buffer = new DataView(array.buffer, array.byteOffset, array.byteLength);
            const stream = [];
            let pos = 0;
            const read_unum = (kind) => {
                ++pos;
                const num = kind & 0b11111;
                if (num < $mol_vary_len.L1)
                    return num;
                let res = 0;
                if (num === $mol_vary_len.L1) {
                    res = buffer.getUint8(pos++);
                }
                else if (num === $mol_vary_len.L2) {
                    res = buffer.getUint16(pos, true);
                    pos += 2;
                }
                else if (num === $mol_vary_len.L4) {
                    res = buffer.getUint32(pos, true);
                    pos += 4;
                }
                else if (num === $mol_vary_len.L8) {
                    res = buffer.getBigUint64(pos, true);
                    if (res <= Number.MAX_SAFE_INTEGER)
                        res = Number(res);
                    pos += 8;
                }
                else {
                    $mol_fail(new Error('Unsupported unum', { cause: { num } }));
                }
                if ((kind & 0b111_00000) === $mol_vary_tip.uint)
                    stream.push(res);
                return res;
            };
            const read_snum = (kind) => {
                const num = buffer.getInt8(pos++);
                if (num > -$mol_vary_len.L1)
                    return num;
                let res = 0;
                if (num === -$mol_vary_len.L1) {
                    res = buffer.getInt8(pos++);
                }
                else if (num === -$mol_vary_len.L2) {
                    res = buffer.getInt16(pos, true);
                    pos += 2;
                }
                else if (num === -$mol_vary_len.L4) {
                    res = buffer.getInt32(pos, true);
                    pos += 4;
                }
                else if (num === -$mol_vary_len.L8) {
                    res = buffer.getBigInt64(pos, true);
                    if (res >= Number.MIN_SAFE_INTEGER && res <= Number.MAX_SAFE_INTEGER)
                        res = Number(res);
                    pos += 8;
                }
                else if (num === -$mol_vary_len.LA) {
                    const len = buffer.getUint16(pos, true) + 9;
                    pos += 2;
                    res = $mol_bigint_decode(new Uint8Array(buffer.buffer, buffer.byteOffset + pos, len));
                    pos += len;
                }
                else {
                    $mol_fail(new Error('Unsupported snum', { cause: { num } }));
                }
                stream.push(res);
                return res;
            };
            const read_text = (kind) => {
                const len = read_unum(kind);
                const text = $mol_charset_ucf_decode(new Uint8Array(array.buffer, array.byteOffset + pos, len));
                pos += len;
                stream.push(text);
                return text;
            };
            const read_buffer = (len, TypedArray) => {
                const bin = new TypedArray(array.slice(pos, pos + len).buffer);
                pos += len;
                stream.push(bin);
                return bin;
            };
            const read_blob = (kind) => {
                const len = read_unum(kind);
                const kind_item = buffer.getUint8(pos++);
                switch (kind_item) {
                    case $mol_vary_len.L1: return read_buffer(len, Uint8Array);
                    case $mol_vary_len.L2: return read_buffer(len, Uint16Array);
                    case $mol_vary_len.L4: return read_buffer(len, Uint32Array);
                    case $mol_vary_len.L8: return read_buffer(len, BigUint64Array);
                    case ~$mol_vary_len.L1 + 256: return read_buffer(len, Int8Array);
                    case ~$mol_vary_len.L2 + 256: return read_buffer(len, Int16Array);
                    case ~$mol_vary_len.L4 + 256: return read_buffer(len, Int32Array);
                    case ~$mol_vary_len.L8 + 256: return read_buffer(len, BigInt64Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp16: return read_buffer(len, Float16Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp32: return read_buffer(len, Float32Array);
                    case $mol_vary_tip.spec | $mol_vary_spec.fp64: return read_buffer(len, Float64Array);
                    default:
                        $mol_fail(new Error('Unsupported blob item kind', { cause: { kind_item } }));
                }
            };
            const read_list = (kind) => {
                const len = read_unum(kind);
                const list = new Array(len);
                for (let i = 0; i < len; ++i)
                    list[i] = read_vary();
                stream.push(list);
                return list;
            };
            const read_link = (kind) => {
                const index = read_unum(kind);
                if (index >= stream.length)
                    $mol_fail(new Error('Too large index', { cause: { index, exists: stream.length } }));
                return stream[index];
            };
            const read_tupl = (kind) => {
                const len = read_unum(kind);
                const keys = read_vary();
                const vals = new Array(len);
                for (let i = 0; i < len; ++i)
                    vals[i] = read_vary();
                const obj = this.rich(keys, vals);
                stream.push(obj);
                return obj;
            };
            const read_spec = (kind) => {
                switch (kind) {
                    case $mol_vary_spec.none:
                        ++pos;
                        return null;
                    case $mol_vary_spec.fake:
                        ++pos;
                        return false;
                    case $mol_vary_spec.true:
                        ++pos;
                        return true;
                    case $mol_vary_spec.both:
                        ++pos;
                        return undefined;
                    case $mol_vary_spec.fp64: {
                        const val = buffer.getFloat64(++pos, true);
                        stream.push(val);
                        pos += 8;
                        return val;
                    }
                    case $mol_vary_spec.fp32: {
                        const val = buffer.getFloat32(++pos, true);
                        stream.push(val);
                        pos += 4;
                        return val;
                    }
                    case $mol_vary_spec.fp16: {
                        const val = buffer.getFloat16(++pos, true);
                        stream.push(val);
                        pos += 2;
                        return val;
                    }
                    default:
                        $mol_fail(new Error('Unsupported spec', { cause: { kind } }));
                }
            };
            const read_vary = () => {
                const kind = buffer.getUint8(pos);
                const tip = kind & 0b111_00000;
                switch (tip) {
                    case $mol_vary_tip.uint: return read_unum(kind);
                    case $mol_vary_tip.sint: return read_snum(kind);
                    case $mol_vary_tip.link: return read_link(kind);
                    case $mol_vary_tip.text: return read_text(kind);
                    case $mol_vary_tip.list: return read_list(kind);
                    case $mol_vary_tip.blob: return read_blob(kind);
                    case $mol_vary_tip.tupl: return read_tupl(kind);
                    case $mol_vary_tip.spec: return read_spec(kind);
                    default: $mol_fail(new Error('Unsupported tip', { cause: { tip } }));
                }
            };
            const result = [];
            while (pos < array.byteLength) {
                result.push(read_vary());
                stream.length = 0;
            }
            return result;
        }
        rich_index = new Map([
            [null, () => ({})]
        ]);
        /** Isolated Vary for custom types */
        zone() {
            const room = new $mol_vary_class;
            Object.setPrototypeOf(room, this);
            const index_clone = (map) => new Map([...map].map(([k, v]) => [k, k === null ? v : index_clone(v)]));
            room.rich_index = index_clone(this.rich_index);
            return room;
        }
        rich(keys, vals) {
            const node = this.rich_node(keys);
            let rich = node.get(null);
            if (!rich)
                node.set(null, rich = pojo_maker(keys));
            return rich(vals);
        }
        rich_node(keys) {
            let node = this.rich_index;
            for (let i = 0; i < keys.length; ++i) {
                let sub = node.get(keys[i]);
                if (sub)
                    node = sub;
                else
                    node.set(keys[i], node = new Map);
            }
            return node;
        }
        lean(obj) {
            return this.lean_find(obj)?.(obj) ?? [Object.keys(obj), Object.values(obj)];
        }
        lean_find(val) {
            const lean = val[this.lean_symbol];
            if (lean)
                return lean;
            const sup = Object.getPrototypeOf(this);
            if (sup === Object.prototype)
                return;
            return sup.lean_find(val);
        }
        /** Adds custom types support. */
        type({ type, keys, rich, lean }) {
            this.rich_node(keys).set(null, rich);
            type.prototype[this.lean_symbol] = (val) => [keys, lean(val)];
        }
    }
    $.$mol_vary_class = $mol_vary_class;
    $.$mol_vary = new $mol_vary_class;
    /** Native Map support */
    $.$mol_vary.type({
        type: Map,
        keys: ['keys', 'vals'],
        lean: obj => [[...obj.keys()], [...obj.values()]],
        rich: ([keys, vals]) => new Map((keys ?? []).map((k, i) => [k, vals?.[i]])),
    });
    /** Native Set support */
    $.$mol_vary.type({
        type: Set,
        keys: ['set'],
        lean: obj => [[...obj.values()]],
        rich: ([vals]) => new Set(vals),
    });
    /** Native Date support */
    $.$mol_vary.type({
        type: Date,
        keys: ['unix_time'],
        lean: obj => [obj.valueOf() / 1000],
        rich: ([ts]) => new Date(ts * 1000),
    });
    if ('Element' in $mol_dom) { // Absent in workers
        /** Native Element support */
        $.$mol_vary.type({
            type: $mol_dom.Element,
            keys: ['XML'],
            lean: node => [$mol_dom_serialize(node)],
            rich: ([text]) => $mol_dom_parse(text, 'application/xml').documentElement,
        });
    }
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        const { uint, link, spec, blob, text, list, tupl, sint } = $mol_vary_tip;
        const { none, both, fp16, fp32, fp64 } = $mol_vary_spec;
        const { L1, L2, L4, L8, LA } = $mol_vary_len;
        const str = $mol_charset_ucf_encode;
        function check(vary, ideal, Vary = $mol_vary) {
            const pack = Vary.pack(vary);
            $mol_assert_equal(Vary.take(pack), vary);
            $mol_assert_equal(pack, new Uint8Array(ideal));
        }
        $mol_test({
            "vary pack logical"($) {
                check([null], [spec | none]);
                check([true], [$mol_vary_spec.true]);
                check([false], [$mol_vary_spec.fake]);
                check([undefined], [spec | both]);
            },
            "vary pack uint0"($) {
                check([0], [0]);
                check([27], [27]);
            },
            "vary pack uint1"($) {
                check([28], [uint | L1, 28]);
                check([255], [uint | L1, 255]);
            },
            "vary pack uint2"($) {
                check([256], [uint | L2, 0, 1]);
                check([256 ** 2 - 1], [uint | L2, 255, 255]);
            },
            "vary pack uint4"($) {
                check([256 ** 2], [uint | L4, 0, 0, 1, 0]);
                check([256 ** 4 - 1], [uint | L4, 255, 255, 255, 255]);
            },
            "vary pack uint8"($) {
                check([256 ** 4], [uint | L8, 0, 0, 0, 0, 1, 0, 0, 0]);
                check([Number.MAX_SAFE_INTEGER], [uint | L8, 255, 255, 255, 255, 255, 255, 31, 0]);
                check([256n ** 8n - 1n], [uint | L8, 255, 255, 255, 255, 255, 255, 255, 255]);
            },
            "vary pack sint0"($) {
                check([-1], [-1]);
                check([-27], [-27]);
            },
            "vary pack sint1"($) {
                check([-28,], [sint | -L1, -28]);
                check([-256 / 2], [sint | -L1, 128]);
            },
            "vary pack sint2"($) {
                check([-256 / 2 - 1], [sint | -L2, 127, 255]);
                check([-(256 ** 2) / 2], [sint | -L2, 0, 128]);
            },
            "vary pack sint4"($) {
                check([-(256 ** 2) / 2 - 1], [sint | -L4, 255, 127, 255, 255]);
                check([-(256 ** 4) / 2], [sint | -L4, 0, 0, 0, 128]);
            },
            "vary pack sint8"($) {
                check([-(256 ** 4) / 2 - 1], [sint | -L8, 255, 255, 255, 127, 255, 255, 255, 255]);
                check([Number.MIN_SAFE_INTEGER], [sint | -L8, 1, 0, 0, 0, 0, 0, 224, 255]);
                check([-(2n ** 63n)], [sint | -L8, 0, 0, 0, 0, 0, 0, 0, 128]);
            },
            "vary pack bigint"($) {
                check([2n ** 64n], [sint | -LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
                check([2n ** 2111n], [sint | -LA, 0, 1, ...Array.from({ length: 263 }, () => 0), 128, 0]);
                check([-1n - 2n ** 64n], [sint | -LA, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 254]);
                check([-1n - 2n ** 2111n], [sint | -LA, 0, 1, ...Array.from({ length: 263 }, () => 255), -129, 255]);
            },
            "vary pack float"($) {
                check([1.5], [fp64, ...new Uint8Array(new Float64Array([1.5]).buffer)]);
            },
            "vary pack list"($) {
                check([[1, 2, 3]], [list | 3, 1, 2, 3]);
                check([[[], [1], [2, 3]]], [list | 3, list | 0, list | 1, 1, list | 2, 2, 3]);
            },
            "vary pack dedup list"($) {
                const pair = [1, 2];
                check([[pair, pair]], [list | 2, list | 2, 1, 2, link | 0]);
                const seven = [7];
                const box = [seven];
                check([[box, box, seven]], [list | 3, list | 1, list | 1, 7, link | 1, link | 0]);
            },
            "vary pack cyclic list"($) {
                const foo = [];
                foo.push([foo]);
                $mol_assert_fail(() => $mol_vary.pack([foo]), 'Cyclic refs');
            },
            "vary pack dedup uint"($) {
                check([[28, 28]], [list | 2, uint | L1, 28, link | 0]);
                check([[2n ** 64n, 2n ** 64n]], [list | 2, sint | -LA, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, link | 0]);
            },
            "vary pack dedup float"($) {
                check([[1.5, 1.5]], [list | 2, fp64, ...new Uint8Array(new Float64Array([1.5]).buffer), link | 0]);
            },
            "vary pack text"($) {
                check(['foo'], [text | 3, ...str('foo')]);
                check(['абв'], [text | 5, ...str('абв')]);
                const long_lat = 'abcdefghijklmnopqrst';
                check([long_lat], [text | L1, 20, ...str(long_lat)]);
                const long_cyr = 'абвгдеёжзийклмнопрст';
                check([long_cyr], [text | L1, 22, ...str(long_cyr)]);
            },
            "vary pack dedup text"($) {
                check([["f", "f"]], [list | 2, text | 1, ...str('f'), link | 0]);
            },
            "vary pack blob"($) {
                check([new Uint8Array([1, 255])], [blob | 2, uint | L1, 1, 255]);
                check([new Int8Array([-128, 127])], [blob | 2, sint | ~L1, -128, 127]);
                check([new Uint32Array([255])], [blob | 4, uint | L4, 255, 0, 0, 0]);
                check([new Int32Array([-128])], [blob | 4, sint | ~L4, -128, 255, 255, 255]);
                check([new BigUint64Array([255n])], [blob | 8, uint | L8, 255, 0, 0, 0, 0, 0, 0, 0]);
                check([new BigInt64Array([-128n])], [blob | 8, sint | ~L8, -128, 255, 255, 255, 255, 255, 255, 255]);
                check([new Float32Array([1.5])], [blob | 4, fp32, ...new Uint8Array(new Float32Array([1.5]).buffer)]);
                check([new Float64Array([1.5])], [blob | 8, fp64, ...new Uint8Array(new Float64Array([1.5]).buffer)]);
            },
            "vary pack dedup blob"($) {
                const part = new Uint8Array([1, 2]);
                check([[part, part]], [list | 2, blob | 2, uint | L1, 1, 2, link | 0]);
            },
            "vary pack struct"($) {
                check([{ x: 1, y: 2 }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), 1, 2]);
                check([{ x: {}, y: { a: 1 } }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), tupl | 0, list | 0, tupl | 1, list | 1, text | 1, ...str('a'), 1]);
            },
            "vary pack struct shape dedup"($) {
                check([[{}, { foo: 1 }, { foo: 2 }]], [list | 3, tupl | 0, list | 0, tupl | 1, list | 1, text | 3, ...str('foo'), 1, tupl | 1, link | 3, 2]);
                check([{ x: 1, y: { x: 2, y: 3 } }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), 1, tupl | 2, link | 2, 2, 3]);
            },
            "vary pack struct full dedup"($) {
                const item = { x: 1 };
                check([[item, item]], [list | 2, tupl | 1, list | 1, text | 1, ...str('x'), 1, link | 2]);
                const part = { x: 1, y: 2 };
                check([{ x: part, y: part }], [tupl | 2, list | 2, text | 1, ...str('x'), text | 1, ...str('y'), tupl | 2, link | 2, 1, 2, link | 3]);
            },
            "vary pack cyclic struct"($) {
                const foo = { bar: null };
                foo.bar = foo;
                $mol_assert_fail(() => $mol_vary.pack([foo]), 'Cyclic refs');
            },
            "vary pack Map"($) {
                check([new Map([['foo', 1], [2, 'bar']])], [tupl | 2, list | 2, text | 4, ...str('keys'), text | 4, ...str('vals'), list | 2, text | 3, ...str('foo'), 2, list | 2, 1, text | 3, ...str('bar')]);
            },
            "vary pack Set"($) {
                check([new Set([7, 'foo'])], [tupl | 1, list | 1, text | 3, ...str('set'), list | 2, 7, text | 3, ...str('foo')]);
            },
            "vary pack Date"($) {
                const date1 = new Date('2025-01-02T03:04:05');
                check([date1], [tupl | 1, list | 1, text | $mol_vary_len.L1, 9, ...str('unix_time'), uint | L4, ...new Uint8Array(new Uint32Array([date1.valueOf() / 1000]).buffer)]);
                const date2 = new Date('2025-01-02T03:04:05.678');
                check([date2], [tupl | 1, list | 1, text | $mol_vary_len.L1, 9, ...str('unix_time'), fp64, ...new Uint8Array(new Float64Array([date2.valueOf() / 1000]).buffer)]);
            },
            "vary pack DOM Element"($) {
                $mol_assert_equal($mol_dom_serialize($mol_jsx("div", null,
                    $mol_jsx("span", null),
                    $mol_jsx("br", null),
                    " ")), $mol_dom_serialize($mol_vary.take($mol_vary.pack([$mol_jsx("div", null,
                        $mol_jsx("span", null),
                        $mol_jsx("br", null),
                        " ")]))[0]));
            },
            "vary pack custom types in rooms"($) {
                class Foo {
                    a;
                    b;
                    constructor(a, b) {
                        this.a = a;
                        this.b = b;
                    }
                    ;
                    [Symbol.iterator]() {
                        return [this.a, this.b].values();
                    }
                }
                const Vary = $mol_vary.zone();
                Vary.type({
                    type: Foo,
                    keys: ['summ', 'diff'],
                    lean: foo => [foo.a + foo.b, foo.a - foo.b],
                    rich: ([summ, diff]) => new Foo((summ + diff) / 2, (summ - diff) / 2),
                });
                // restore
                check([new Foo(4, 2)], [tupl | 2, list | 2, text | 4, ...str('summ'), text | 4, ...str('diff'), 6, 2], Vary);
                // isolated
                $mol_assert_equal($mol_vary.take($mol_vary.pack([new Foo(4, 2)])), [{ a: 4, b: 2 }]);
                // inherited
                $mol_assert_equal(Vary.take(Vary.pack([new Map([[1, 2]])])), [new Map([[1, 2]])]);
            },
            "vary pack sequences"($) {
                check([], []);
                check([7], [7]);
                check([3, 4], [3, 4]);
                check([['foo', 'foo'], ['bar', 'bar']], [list | 2, text | 3, ...str('foo'), link | 0, list | 2, text | 3, ...str('bar'), link | 0]);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // export let $giper_baza_vary_schema = $mol_schema_some([
    // 	$mol_schema_boolean, $mol_schema_float, $mol_schema_bigint, $mol_schema_string,
    // 	Uint8Array, Uint16Array, Uint32Array, BigUint64Array,
    // 	Int8Array, Int16Array, Int32Array, BigInt64Array,
    // 	Float64Array, Float32Array, Float64Array,
    // 	$mol_time_moment, $mol_time_duration, $mol_time_interval,
    // 	$mol_tree2, $giper_baza_link, Element,
    // 	$mol_schema_list( ()=> $giper_baza_vary_schema ),
    // 	$mol_schema_dict([ ()=> $giper_baza_vary_schema, ()=> $giper_baza_vary_schema ]),
    // ].map( klass => $mol_schema_instance( klass ) )
    $.$giper_baza_vary = $mol_vary.zone();
    $.$giper_baza_vary.type({
        type: $giper_baza_link,
        keys: ['link'],
        lean: obj => [obj.toBin()],
        rich: ([bin]) => $giper_baza_link.from_bin(bin),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_duration,
        keys: ['dura'],
        lean: obj => obj.toArray(),
        rich: data => new $mol_time_duration(data),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_moment,
        keys: ['time'],
        lean: obj => obj.toArray(),
        rich: data => new $mol_time_moment(data),
    });
    $.$giper_baza_vary.type({
        type: $mol_time_interval,
        keys: ['span'],
        lean: obj => [obj.toString()],
        rich: ([str]) => new $mol_time_interval(str),
    });
    $.$giper_baza_vary.type({
        type: $mol_tree2,
        keys: ['tree'],
        lean: obj => [$$.$mol_tree2_to_string(obj)],
        rich: ([str]) => $$.$mol_tree2_from_string(str),
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        function check(vary) {
            $mol_assert_equal(vary, $giper_baza_vary.take($giper_baza_vary.pack([vary]))[0]);
        }
        $mol_test({
            "Bin"($) {
                check(null);
                check(new Uint8Array([1, 2, 3]));
            },
            "Bool"($) {
                check(false);
                check(true);
            },
            "Int"($) {
                check(0);
                check(4611686018427387904n);
            },
            "Real"($) {
                check(0);
                check(Math.PI);
                check(Number.NaN);
                check(Number.POSITIVE_INFINITY);
                check(Number.NEGATIVE_INFINITY);
                check(Number.MAX_SAFE_INTEGER);
                check(Number.MIN_SAFE_INTEGER);
                check(BigInt(Number.MAX_VALUE));
                check(Number.MIN_VALUE);
            },
            "Link"($) {
                check(new $giper_baza_link(''));
                check($giper_baza_link.from_int(123456789));
            },
            "Str"($) {
                check('');
                check('123');
                check('🐱‍👤');
            },
            "Time"($) {
                check(new $mol_time_moment('1984-08-04T09:05:13.666+03:00'));
                check(new $mol_time_moment);
            },
            "Dura"($) {
                check(new $mol_time_duration('P1Y2M3DT4h5m6.6s'));
            },
            "Span"($) {
                check(new $mol_time_interval('T09:00/PT9h'));
            },
            "JSON"($) {
                check({ foo: ['bar'] });
                check([{ foo: 'bar' }]);
            },
            "DOM"($) {
                const xml = ($mol_jsx("div", null,
                    $mol_jsx("span", { class: "bar" }, "xxx")));
                $mol_assert_equal($mol_dom_serialize($giper_baza_vary.take($giper_baza_vary.pack([xml]))[0]), $mol_dom_serialize(xml));
            },
            "Tree"($) {
                const tree = $.$mol_tree2_from_string(`
				foo \\bar
					foo \\bar
			`);
                $mol_assert_equal($.$mol_tree2_to_string($giper_baza_vary.take($giper_baza_vary.pack([tree]))[0]), $.$mol_tree2_to_string(tree));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * 48-bit streamable array hash function
     * Based on cyrb53: https://stackoverflow.com/a/52171480
     */
    function $mol_hash_numbers(buff, seed = 0) {
        let h1 = 0xdeadbeef ^ seed;
        let h2 = 0x41c6ce57 ^ seed;
        for (let i = 0; i < buff.length; ++i) {
            const item = buff[i];
            h1 = Math.imul(h1 ^ item, 2654435761);
            h2 = Math.imul(h2 ^ item, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (((1 << 16) - 1) & h2) + (h1 >>> 0);
    }
    $.$mol_hash_numbers = $mol_hash_numbers;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Hint how interpret inner Units: term, solo, vals, keys */
    let $giper_baza_unit_sand_tag;
    (function ($giper_baza_unit_sand_tag) {
        /** Itself value. Ignore */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["term"] = 0] = "term";
        /** Value in first sub node. Ignore all after first */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["solo"] = 64] = "solo";
        /** List of values */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["vals"] = 128] = "vals";
        /** List of keys */
        $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag["keys"] = 192] = "keys";
    })($giper_baza_unit_sand_tag = $.$giper_baza_unit_sand_tag || ($.$giper_baza_unit_sand_tag = {}));
    /** Data. Actually it's edge between nodes in graph model. */
    class $giper_baza_unit_sand extends $giper_baza_unit_base {
        static size_equator = 63;
        static size_max = 2 ** 16;
        _vary = undefined;
        _open = null;
        static length(size) {
            if (size > 2 ** 16)
                throw new Error(`Size too large (${size})`);
            return size > $giper_baza_unit_sand.size_equator ? 52 : Math.ceil((38 + size) / 8) * 8;
        }
        static length_ball(size) {
            if (size > 2 ** 16)
                throw new Error(`Size too large (${size})`);
            return size > $giper_baza_unit_sand.size_equator ? Math.ceil((size - 4) / 8) * 8 + 4 : 0;
        }
        static make(size, tag = 'term') {
            if (size >= 2 ** 16)
                throw new Error(`Size too large (${size})`);
            const sand = this.from(this.length(size));
            sand.kind('sand');
            if (size > $giper_baza_unit_sand.size_equator) {
                sand.uint16(38, size % 2 ** 16);
                size = 0;
            }
            sand.uint8(1, size | $giper_baza_unit_sand_tag[tag]);
            return sand;
        }
        tag() {
            return $giper_baza_unit_sand_tag[this.uint8(1) & 0b11_00_0000];
        }
        big() {
            return this.size() > $giper_baza_unit_sand.size_equator;
        }
        size() {
            let hint = this.uint8(1) & 0b111_111;
            return hint || this.uint16(38) || 2 ** 16;
        }
        dead() {
            if (this._vary === null)
                return true;
            if (this.size() > 1)
                return false;
            if (this.uint8(38) !== 78 /*N*/)
                return false;
            return true;
        }
        _self;
        self(next) {
            if (next === undefined && this._self !== undefined)
                return this._self;
            else
                return this._self = this.id6(20, next);
        }
        _head;
        head(next) {
            if (next === undefined && this._head !== undefined)
                return this._head;
            else
                return this._head = this.id6(26, next);
        }
        _lead;
        lead(next) {
            if (next === undefined && this._lead !== undefined)
                return this._lead;
            else
                return this._lead = this.id6(32, next);
        }
        path() {
            return `sand:${this.head().str || '__root__'}/${this.lord()}/${this.self().str || '__meta__'}`;
        }
        _shot;
        shot(next) {
            if (!this.big())
                throw new Error('Access to Shot of small Sand is unavailable');
            if (next)
                return this._shot = this.id12(40, next);
            else
                return this._shot = this._shot ?? this.id12(40);
        }
        _data;
        data(next) {
            if (this.big())
                throw new Error('Access to Data of large Sand is unavailable');
            const data = this._data ?? new Uint8Array(this.buffer, this.byteOffset + 38, this.size());
            if (next)
                data.set(next);
            return data;
        }
        _ball;
        ball(next) {
            if (next === undefined) {
                if (this._ball)
                    return this._ball;
                if (this.big())
                    return this._ball;
                return this._ball = this.data();
            }
            else {
                if (this.big()) {
                    this.shot($giper_baza_link.hash_bin(next));
                    return this._ball = next;
                }
                else {
                    return this._ball = this.data(next);
                }
            }
        }
        encoded() {
            return !this._open || !!this._ball;
        }
        hash() {
            if (!this.encoded())
                return $mol_fail(new Error('No Hash for incompleted Sand', { cause: { sand: this } }));
            return super.hash();
        }
        idea_seed() {
            return $mol_hash_numbers(new Uint8Array(this.buffer, this.byteOffset + 26, 12)); // head + lead
        }
        dump() {
            return {
                kind: this.kind(),
                lord: this.lord(),
                lead: this.lead(),
                head: this.head(),
                self: this.self(),
                tag: this.tag(),
                size: this.size(),
                time: this.moment().toString('YYYY-MM-DD hh:mm:ss'),
            };
        }
        tier_min() {
            return (this.head().str === $giper_baza_land_root.tine.str)
                ? $giper_baza_rank_tier.pull
                : $giper_baza_rank_tier.post;
        }
        inspect() {
            const lead = $mol_term_color.blue(this.lead().str || '__knot__');
            const head = $mol_term_color.blue(this.head().str || '__root__');
            const self = $mol_term_color.blue(this.self().str || '__meta__');
            const tag = $mol_term_color.green({
                term: 'T',
                solo: 'S',
                vals: 'V',
                keys: 'K',
            }[this.tag()]);
            const vary = this._vary === undefined ? '' : $mol_term_color.yellow(String(this._vary));
            return `${super.inspect()} ${tag} ${lead}\\${head}/${self} ${vary}`;
        }
        toString() {
            const lead = this.lead().str || '__knot__';
            const head = this.head().str || '__root__';
            const self = this.self().str || '__meta__';
            const tag = {
                term: 'T',
                solo: 'S',
                vals: 'V',
                keys: 'K',
            }[this.tag()];
            const vary = this._vary === undefined ? '' : String(this._vary);
            return `${super.toString()} ${tag} ${lead}\\${head}/${self} ${vary}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 📦 ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', this.encoded() ? $mol_dev_format_auto(this.hash()) : $mol_dev_format_shade('___incompleted___'), ' ', this.lead().str || '__knot__', $mol_dev_format_shade('\\'), $mol_dev_format_accent(this.head().str || '__root__'), $mol_dev_format_shade('/'), this.self().str || '__meta__', ' ', {
                term: '💼',
                solo: '1️⃣',
                vals: '🎹',
                keys: '🔑',
            }[this.tag()], ' ', $mol_dev_format_auto(this._vary));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_unit_sand, "make", null);
    $.$giper_baza_unit_sand = $giper_baza_unit_sand;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_unit_gift_sort(gifts) {
        const dict = new Map();
        const graph = new $mol_graph();
        for (const gift of gifts) {
            const key = gift.mate().str;
            dict.set(key, gift);
            graph.link(key, gift.lord().str);
            graph.link(key, '');
        }
        graph.acyclic(() => 1);
        const keys = [...graph.sorted];
        return keys.map(key => dict.get(key)).filter(Boolean);
    }
    $.$giper_baza_unit_gift_sort = $giper_baza_unit_gift_sort;
    /** Given Rank and Secret */
    class $giper_baza_unit_gift extends $giper_baza_unit_base {
        static length() {
            return 48;
        }
        static make() {
            const sand = this.from(this.length());
            sand.kind('gift');
            return sand;
        }
        rank(next) {
            if (next !== undefined)
                this.uint8(0, $giper_baza_unit_kind.gift);
            const res = this.uint8(1, next);
            if (res < $giper_baza_rank_deny || res > $giper_baza_rank_rule) {
                $mol_fail(new RangeError(`Wrong rank ${res}`));
            }
            return res;
        }
        tier() {
            return (this.rank() & $giper_baza_rank_tier.rule);
        }
        rate() {
            return (this.rank() & $giper_baza_rank_rate.just);
        }
        mate(next) {
            return this.id12(20, next);
        }
        path() {
            return `gift:${this.mate().str || '______every______'}`;
        }
        _code;
        code() {
            return this._code ?? (this._code = new Uint8Array(this.buffer, this.byteOffset + 32, 16));
        }
        code_exists() {
            return this.code().some(b => b);
        }
        dump() {
            return {
                kind: this.kind(),
                lord: this.lord(),
                mate: this.mate(),
                tier: $giper_baza_rank_tier[this.tier()],
                rate: this.rate(),
                time: this.moment().toString('YYYY-MM-DD hh:mm:ss'),
            };
        }
        tier_min() {
            return $giper_baza_rank_tier.rule;
        }
        inspect() {
            const mate = $mol_term_color.magenta('@' + (this.mate().str || '______every______'));
            const read = $mol_term_color.green(this.code().some(v => v) ? 'X' : 'O');
            const rank = $mol_term_color.cyan($giper_baza_rank_tier[this.tier()] + ':' + this.rate().toString(16).toUpperCase());
            return `${super.inspect()} ${read} ${mate} ${rank}`;
        }
        toString() {
            const mate = '@' + (this.mate().str || '______every______');
            const read = this.code().some(v => v) ? 'X' : 'O';
            const rank = $giper_baza_rank_tier[this.tier()] + ':' + this.rate().toString(16).toUpperCase();
            return `${super.toString()} ${read} ${mate} ${rank}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' 🏅', ' ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', $mol_dev_format_auto(this.hash()), ' 👾', $mol_dev_format_accent(this.mate().str || '______every______'), this.code().some(v => v) ? ' 🔐' : ' 👀', $giper_baza_rank_tier[this.tier()], ':', this.rate().toString(16).toUpperCase());
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_unit_gift, "make", null);
    $.$giper_baza_unit_gift = $giper_baza_unit_gift;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_unit_seal_limit = 10;
    /**  Sign for hash list */
    class $giper_baza_unit_seal extends $giper_baza_unit_base {
        static length(size) {
            return Math.ceil((84 + size * 12) / 8) * 8;
        }
        static make(size, wide) {
            const seal = this.from(this.length(size));
            seal.kind('seal');
            seal.meta({ size, wide });
            return seal;
        }
        meta(next) {
            return this.uint8(1, next && (next.size | (next.wide ? 0b1000_0000 : 0)));
        }
        size() {
            return this.meta() & 0b1111;
        }
        wide() {
            return Boolean(this.meta() & 0b1000_0000);
        }
        alive_items = new Set;
        alive_full() {
            return this.alive_items.size === $.$giper_baza_unit_seal_limit;
        }
        alive_list() {
            const alive = this.alive_items;
            return this.hash_list().filter(hash => alive.has(hash.str));
        }
        hash_item(index, next) {
            return this.id12(20 + index * 12, next);
        }
        _hash_list;
        hash_list(next) {
            if (next) {
                for (let i = 0; i < next.length; ++i) {
                    this.hash_item(i, next[i]);
                }
                // this.size( next.length )
                return this._hash_list = next;
            }
            else {
                const list = [];
                const count = this.size();
                for (let i = 0; i < count; ++i) {
                    list.push(this.hash_item(i));
                }
                return this._hash_list = list;
            }
        }
        /** Hash for signing. */
        shot() {
            return $giper_baza_link.hash_bin(new Uint8Array(this.buffer, this.byteOffset, this.byteLength - 64));
        }
        sign(next) {
            const buf = new Uint8Array(this.buffer, this.byteOffset + this.byteLength - 64, 64);
            if (next)
                buf.set(next);
            return buf;
        }
        // @ $mol_memo.method
        work() {
            let int = new Uint32Array(this.hash().toBin().buffer)[0];
            let count = 0;
            while (int & 1) {
                int >>>= 1;
                ++count;
            }
            return count;
        }
        rate_min() {
            return $giper_baza_rank_work_rates[this.work()];
        }
        tier_min() {
            return $giper_baza_rank_tier.post;
        }
        rank_min() {
            return this.tier_min() | this.rate_min();
        }
        path() {
            return `seal:${this.lord()}/${this.hash().str}`;
        }
        inspect() {
            const items = this.hash_list().map(hash => $mol_term_color.cyan('#' + hash.str)).join(', ');
            const kind = $mol_term_color.green('%');
            return `${super.inspect()} ${kind} ${items}`;
        }
        toString() {
            const items = this.hash_list().map(hash => '#' + hash.str).join(', ');
            return `${super.toString()} % ${items}`;
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' 👾', $mol_dev_format_auto(this.lord()), ' ✍ ', $mol_dev_format_shade($giper_baza_time_dump(this.time(), this.tick())), ' #', $mol_dev_format_auto(this.hash()), ' ', $mol_dev_format_auto(this.hash_list()));
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_unit_seal.prototype, "sign", null);
    __decorate([
        $mol_action
    ], $giper_baza_unit_seal, "make", null);
    $.$giper_baza_unit_seal = $giper_baza_unit_seal;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive Set */
    class $mol_wire_set extends Set {
        pub = new $mol_wire_pub;
        // Accessors
        has(value) {
            this.pub.promote();
            return super.has(value);
        }
        entries() {
            this.pub.promote();
            return super.entries();
        }
        keys() {
            this.pub.promote();
            return super.keys();
        }
        values() {
            this.pub.promote();
            return super.values();
        }
        forEach(task, self) {
            this.pub.promote();
            super.forEach(task, self);
        }
        [Symbol.iterator]() {
            this.pub.promote();
            return super[Symbol.iterator]();
        }
        get size() {
            this.pub.promote();
            return super.size;
        }
        // Mutators
        add(value) {
            if (super.has(value))
                return this;
            super.add(value);
            this.pub.emit();
            return this;
        }
        delete(value) {
            const res = super.delete(value);
            if (res)
                this.pub.emit();
            return res;
        }
        clear() {
            if (!super.size)
                return;
            super.clear();
            this.pub.emit();
        }
        // Extensions
        item(val, next) {
            if (next === undefined)
                return this.has(val);
            if (next)
                this.add(val);
            else
                this.delete(val);
            return next;
        }
    }
    $.$mol_wire_set = $mol_wire_set;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Watch one value'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static lucky() {
                    return this.set.has(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), false);
            App.set.add(666);
            $mol_assert_equal(App.lucky(), false);
            App.set.add(777);
            $mol_assert_equal(App.lucky(), true);
            App.set.delete(777);
            $mol_assert_equal(App.lucky(), false);
        },
        'Watch item channel'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static lucky() {
                    return this.set.item(777);
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "lucky", null);
            $mol_assert_equal(App.lucky(), false);
            App.set.item(666, true);
            $mol_assert_equal(App.lucky(), false);
            App.set.item(777, true);
            $mol_assert_equal(App.lucky(), true);
            App.set.item(777, false);
            $mol_assert_equal(App.lucky(), false);
        },
        'Watch size'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static size() {
                    return this.set.size;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "size", null);
            $mol_assert_equal(App.size(), 0);
            App.set.add(666);
            $mol_assert_equal(App.size(), 1);
            App.set.add(777);
            $mol_assert_equal(App.size(), 2);
            App.set.delete(777);
            $mol_assert_equal(App.size(), 1);
        },
        'Watch for-of'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static sum() {
                    let res = 0;
                    for (const val of this.set) {
                        res += val;
                    }
                    return res;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_equal(App.sum(), 0);
            App.set.add(111);
            $mol_assert_equal(App.sum(), 111);
            App.set.add(222);
            $mol_assert_equal(App.sum(), 333);
            App.set.delete(111);
            $mol_assert_equal(App.sum(), 222);
        },
        'Watch forEach'($) {
            class App extends $mol_object2 {
                static $ = $;
                static set = new $mol_wire_set();
                static sum() {
                    let res = 0;
                    this.set.forEach(val => res += val);
                    return res;
                }
            }
            __decorate([
                $mol_wire_solo
            ], App, "sum", null);
            $mol_assert_equal(App.sum(), 0);
            App.set.add(111);
            $mol_assert_equal(App.sum(), 111);
            App.set.add(222);
            $mol_assert_equal(App.sum(), 333);
            App.set.delete(111);
            $mol_assert_equal(App.sum(), 222);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Virtual Pawn that represents contained units as high-level data types. */
    class $giper_baza_pawn extends $mol_object {
        static tag = 'vals';
        static meta = null;
        /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
        land() {
            return null;
        }
        /** Land local Pawn id */
        head() {
            return $giper_baza_link.hole;
        }
        /** Link to Land/Lord. */
        land_link() {
            return this.land()?.link() ?? this.$.$giper_baza_auth.current().pass().lord();
        }
        /** Link to Pawn/Land/Lord. */
        link() {
            return new $giper_baza_link('___' + this.head()).resolve(this.land_link());
        }
        toJSON() {
            return this.link().str;
        }
        /** Returns another representation of this Pawn. */
        cast(Pawn) {
            return this.land().Pawn(Pawn).Head(this.head());
        }
        /** Ordered inner alive Pawn. */
        pawns(Pawn) {
            const land = this.land();
            const map = {
                term: () => land.Pawn(Pawn || $giper_baza_atom),
                solo: () => land.Pawn(Pawn || $giper_baza_atom),
                vals: () => land.Pawn(Pawn || $giper_baza_list),
                keys: () => land.Pawn(Pawn || $giper_baza_dict),
            };
            return this.units().map(unit => map[unit.tag()]().Head(unit.self()));
        }
        /** All ordered alive Units */
        units() {
            return this.units_of($giper_baza_link.hole);
        }
        units_of(peer) {
            const head = this.head();
            const units = this.land().sand_ordered({ head, peer }).filter(unit => !unit.dead() && unit.self().str !== '');
            this.land().sands_open(units);
            return units;
        }
        meta(next) {
            const prev = this.meta_of($giper_baza_link.hole);
            if (!next)
                return prev;
            if (prev?.str === next?.str)
                return prev;
            const head = this.head();
            this.land().post($giper_baza_link.hole, head, $giper_baza_link.hole, next);
            return next;
        }
        meta_of(peer) {
            const head = this.head();
            const unit = this.land().sand_ordered({ head, peer }).find(unit => !unit.dead() && unit.self().str === '') ?? null;
            if (unit)
                this.land().sands_open([unit]);
            return unit ? $giper_baza_link_schema.cast(this.land().sand_decode(unit)) : null;
        }
        filled() {
            return this.units().length > 0;
        }
        /** Ability to make changes by current peer. */
        can_change() {
            return this.land().pass_rank(this.land().auth().pass()) >= $giper_baza_rank_post('late');
        }
        /** Time of last changed unit inside Pawn subtree */
        last_change() {
            const land = this.land();
            let last = 0;
            const visit = (sand) => {
                if (sand.time() > last)
                    last = sand.time();
                if (sand.tag() === 'term')
                    return;
                land.Pawn($giper_baza_pawn).Head(sand.self()).units().forEach(visit);
            };
            this.units().forEach(visit);
            return last ? $giper_baza_time_moment(last) : null;
        }
        /** All author Passes of Pawn subtree */
        authors() {
            const land = this.land();
            const peers = new Set();
            const visit = (sand) => {
                peers.add(land.lord_pass(sand.lord()));
                if (sand.tag() === 'term')
                    return;
                land.Pawn($giper_baza_pawn).Head(sand.self()).units_of(null).forEach(visit);
            };
            this.units_of(null).forEach(visit);
            return [...peers];
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head());
        }
    }
    __decorate([
        $mol_memo.method
    ], $giper_baza_pawn.prototype, "link", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "cast", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "pawns", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "units_of", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "meta", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_pawn.prototype, "meta_of", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "last_change", null);
    __decorate([
        $mol_mem
    ], $giper_baza_pawn.prototype, "authors", null);
    $.$giper_baza_pawn = $giper_baza_pawn;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_reconcile({ prev, from, to, next, equal, drop, insert, update, replace, }) {
        if (!update)
            update = (next, prev, lead) => prev;
        if (!replace)
            replace = (next, prev, lead) => insert(next, drop(prev, lead));
        if (to > prev.length)
            to = prev.length; // $mol_fail( new RangeError( `To(${ to }) greater then length(${ prev.length })` ) )
        if (from > to)
            from = to; // $mol_fail( new RangeError( `From(${ to }) greater then to(${ to })` ) )
        let p = from;
        let n = 0;
        let lead = p ? prev[p - 1] : null;
        while (p < to || n < next.length) {
            if (p < to && n < next.length && equal(next[n], prev[p])) {
                lead = update(next[n], prev[p], lead);
                ++p;
                ++n;
            }
            else if (next.length - n > to - p) {
                lead = insert(next[n], lead);
                ++n;
            }
            else if (next.length - n < to - p) {
                lead = drop(prev[p], lead);
                ++p;
            }
            else {
                lead = replace(next[n], prev[p], lead);
                ++p;
                ++n;
            }
        }
    }
    $.$mol_reconcile = $mol_reconcile;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'same list'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"))).outerHTML);
        },
        'insert items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'bXYc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "b"),
                $mol_jsx("p", { "data-rev": "new" }, "X"),
                $mol_jsx("p", { "data-rev": "new" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
        'append items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"));
            $mol_reconcile({
                prev: [...list.children],
                from: 2,
                to: 3,
                next: 'bc',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "new" }, "b"),
                $mol_jsx("p", { "data-rev": "new" }, "c"))).outerHTML);
        },
        'split item'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "bc"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 0,
                to: 3,
                next: 'abcd',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "new" }, "b"),
                $mol_jsx("p", { "data-rev": "up" }, "c"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
        'drop items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "x"),
                $mol_jsx("p", { "data-rev": "old" }, "y"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 5,
                next: 'BC',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "A"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "D"))).outerHTML);
        },
        'update items'() {
            const list = $mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "old" }, "B"),
                $mol_jsx("p", { "data-rev": "old" }, "C"),
                $mol_jsx("p", { "data-rev": "old" }, "d"));
            $mol_reconcile({
                prev: [...list.children],
                from: 1,
                to: 3,
                next: 'XY',
                equal: (next, prev) => prev.textContent === next,
                drop: (prev, lead) => list.removeChild(prev),
                insert: (next, lead) => list.insertBefore($mol_jsx("p", { "data-rev": "new" }, next), lead ? lead.nextSibling : list.firstChild),
                replace: (next, prev, lead) => {
                    prev.textContent = next;
                    prev.setAttribute('data-rev', 'up');
                    return prev;
                },
            });
            $mol_assert_equal(list.outerHTML, ($mol_jsx("body", null,
                $mol_jsx("p", { "data-rev": "old" }, "a"),
                $mol_jsx("p", { "data-rev": "up" }, "X"),
                $mol_jsx("p", { "data-rev": "up" }, "Y"),
                $mol_jsx("p", { "data-rev": "old" }, "d"))).outerHTML);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_boolean extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'boolean')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static default = false;
    }
    $.$mol_schema_boolean = $mol_schema_boolean;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Boolean schema"($) {
                $mol_assert_equal('$mol_schema_boolean', $mol_schema_boolean + '', $mol_key($mol_schema_boolean));
                $mol_assert_equal(true, $mol_schema_boolean.check(false));
                $mol_assert_equal(true, $mol_schema_boolean.check(true));
                $mol_assert_equal(false, $mol_schema_boolean.check('true'));
                $mol_assert_equal(false, $mol_schema_boolean.check(0));
                $mol_assert_equal(false, $mol_schema_boolean.cast(false));
                $mol_assert_equal(false, $mol_schema_boolean.cast('true'));
                $mol_assert_equal(false, $mol_schema_boolean.guard(false));
                $mol_assert_fail(() => $mol_schema_boolean.guard(null), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_integer extends $mol_schema_float {
        $mol_schema_integer = true;
        static guard(value) {
            const val = super.guard(value);
            if (!Number.isFinite(val))
                return $mol_fail(new TypeError('Non finite', { cause: { value, schema: this } }));
            if (Math.trunc(val) !== val)
                return $mol_fail(new TypeError('Non integer', { cause: { value, schema: this } }));
            return val;
        }
        static default = 0;
    }
    $.$mol_schema_integer = $mol_schema_integer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Integer schema"($) {
                $mol_assert_equal('$mol_schema_integer', $mol_schema_integer + '', $mol_key($mol_schema_integer));
                $mol_assert_equal(true, $mol_schema_integer.check(Number.MAX_SAFE_INTEGER));
                $mol_assert_equal(true, $mol_schema_integer.check(Number.MIN_SAFE_INTEGER));
                $mol_assert_equal(true, $mol_schema_integer.check(0));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.EPSILON));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.POSITIVE_INFINITY));
                $mol_assert_equal(false, $mol_schema_integer.check(Number.NEGATIVE_INFINITY));
                $mol_assert_equal(Number.MAX_SAFE_INTEGER, $mol_schema_integer.cast(Number.MAX_SAFE_INTEGER));
                $mol_assert_equal(0, $mol_schema_integer.cast(Number.EPSILON));
                $mol_assert_equal(0, $mol_schema_integer.cast(1.5));
                $mol_assert_equal(0, $mol_schema_integer.guard(0));
                $mol_assert_fail(() => $mol_schema_integer.guard(''), 'Wrong type');
                $mol_assert_fail(() => $mol_schema_integer.guard(Number.NaN), 'Non finite');
                $mol_assert_fail(() => $mol_schema_integer.guard(1.5), 'Non integer');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_schema_bigint extends $mol_schema_any {
        static guard(value) {
            if (typeof value === 'bigint')
                return value;
            return $mol_fail(new TypeError('Wrong type', { cause: { value, schema: this } }));
        }
        static cast(value) {
            if (typeof value === 'number')
                return BigInt($mol_schema_integer.cast(value));
            return super.cast(value);
        }
        static default = 0n;
    }
    $.$mol_schema_bigint = $mol_schema_bigint;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "BigInt schema"($) {
                $mol_assert_equal('$mol_schema_bigint', $mol_schema_bigint + '', $mol_key($mol_schema_bigint));
                $mol_assert_equal(true, $mol_schema_bigint.check(0n));
                $mol_assert_equal(false, $mol_schema_bigint.check(0));
                $mol_assert_equal(1n, $mol_schema_bigint.cast(1n));
                $mol_assert_equal(1n, $mol_schema_bigint.cast(1));
                $mol_assert_equal(0n, $mol_schema_bigint.guard(0n));
                $mol_assert_fail(() => $mol_schema_bigint.guard(1), 'Wrong type');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_pattern = $mol_memo_key.func(function $mol_schema_pattern(Pattern) {
        return class $mol_schema_pattern_ extends $mol_schema_string {
            static Pattern = Pattern;
            static toString() {
                if (this !== $mol_schema_pattern_)
                    return super.toString();
                return '$mol_schema_pattern<' + $mol_key(Pattern) + '>';
            }
            static guard(value) {
                if (Pattern.test(super.guard(value)))
                    return value;
                return $mol_fail(new TypeError('Wrong string', { cause: { value, schema: this } }));
            }
            static cast(value) {
                return super.cast(value);
            }
            static default = '';
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of pattern schema"($) {
                $mol_assert_equal($mol_schema_pattern(/foo/), $mol_schema_pattern(/foo/));
                $mol_assert_unique($mol_schema_pattern(/foo/), $mol_schema_pattern(/bar/));
            },
            "String pattern schema"($) {
                const Email = $mol_schema_pattern(/^.*@.*$/);
                $mol_assert_equal('$mol_schema_pattern</^.*@.*$/>', Email + '', $mol_key(Email));
                $mol_assert_equal(true, Email.check('foo@bar'));
                $mol_assert_equal(false, Email.check('foo'));
                $mol_assert_equal(false, Email.check(123));
                $mol_assert_equal('foo@bar', Email.cast('foo@bar'));
                $mol_assert_equal('', Email.cast('foo'));
                $mol_assert_equal('', Email.cast(123));
                $mol_assert_equal('foo@bar', Email.guard('foo@bar'));
                $mol_assert_fail(() => Email.guard('foo'), 'Wrong string');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_dict = $mol_memo_key.func(function $mol_schema_dict(Pair) {
        return class $mol_schema_dict_ extends $mol_schema_any {
            static Pair = Pair;
            static toString() {
                if (this !== $mol_schema_dict_)
                    return super.toString();
                return '$mol_schema_dict<' + $mol_key(Pair) + '>';
            }
            static guard(value) {
                if (Object.getPrototypeOf(Object.getPrototypeOf(value))) {
                    return $mol_fail(new TypeError('Non dictionary', { cause: { value, schema: this } }));
                }
                for (const key in value) {
                    try {
                        Pair[0].guard(key);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong key', { cause: { key, error, value, schema: this } }));
                    }
                    try {
                        Pair[1].guard(value[key]);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong val', { cause: { key, error, value, schema: this } }));
                    }
                }
                return value;
            }
            static cast(value) {
                if (Object.getPrototypeOf(Object.getPrototypeOf(value)))
                    return this.default;
                const res = {};
                for (const key in value) {
                    if (!Pair[0].check(key))
                        continue;
                    res[key] = Pair[1].cast(value[key]);
                }
                return res;
            }
            static default = {};
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        "Cache of dict schema"($) {
            $mol_assert_equal($mol_schema_dict([$mol_schema_string, $mol_schema_float]), $mol_schema_dict([$mol_schema_string, $mol_schema_float]));
            $mol_assert_unique($mol_schema_dict([$mol_schema_string, $mol_schema_float]), $mol_schema_dict([$mol_schema_string, $mol_schema_string]));
        },
        "Dictionary schema"($) {
            const Flags = $mol_schema_dict([$mol_schema_pattern(/^[a-z]+$/), $mol_schema_boolean]);
            $mol_assert_equal(true, Flags.check({}));
            $mol_assert_equal(true, Flags.check({ foo: false }));
            $mol_assert_equal(false, Flags.check({ f00: false }));
            $mol_assert_equal(false, Flags.check([]));
            $mol_assert_equal(false, Flags.check({ foo: 0 }));
            $mol_assert_equal({ foo: false }, Flags.cast({ foo: false, f00: true }));
            $mol_assert_equal({ foo: false }, Flags.cast({ foo: 123 }));
            $mol_assert_equal({}, Flags.guard({}));
            $mol_assert_equal({ foo: false }, Flags.guard({ foo: false }));
            $mol_assert_fail(() => Flags.guard({ foo: 123 }), 'Wrong val');
            $mol_assert_fail(() => Flags.guard({ f00: 123 }), 'Wrong key');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_list = $mol_memo_key.func(function $mol_schema_list(Item) {
        return class $mol_schema_list_ extends $mol_schema_any {
            static Item = Item;
            static toString() {
                if (this !== $mol_schema_list_)
                    return super.toString();
                return '$mol_schema_list<' + $mol_key(Item) + '>';
            }
            static guard(value) {
                if (!Array.isArray(value))
                    return $mol_fail(new TypeError('Non array', { cause: { value, schema: this } }));
                for (const [index, item] of super.guard(value).entries()) {
                    try {
                        Item.guard(item);
                    }
                    catch (error) {
                        return $mol_fail(new TypeError('Wrong item', { cause: { index, error, value, schema: this } }));
                    }
                }
                return value;
            }
            static cast(value) {
                if (!Array.isArray(value))
                    return this.default;
                return value.map(item => Item.cast(item));
            }
            static default = [];
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of list schema"($) {
                $mol_assert_equal($mol_schema_list($mol_schema_float), $mol_schema_list($mol_schema_float));
                $mol_assert_unique($mol_schema_list($mol_schema_float), $mol_schema_list($mol_schema_string));
            },
            "Array schema"($) {
                const Vector = $mol_schema_list($mol_schema_float);
                $mol_assert_equal('$mol_schema_list<$mol_schema_float>', Vector + '');
                $mol_assert_equal(true, Vector.check([]));
                $mol_assert_equal(true, Vector.check([123]));
                $mol_assert_equal(false, Vector.check(['foo']));
                $mol_assert_equal([123], Vector.cast([123]));
                $mol_assert_equal([123, Number.NaN], Vector.cast([123, 'foo']));
                $mol_assert_equal([], Vector.guard([]));
                $mol_assert_equal([123], Vector.guard([123]));
                $mol_assert_fail(() => Vector.guard(0), 'Non array');
                $mol_assert_fail(() => Vector.guard([false]), 'Wrong item');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function clone(base) {
        const land = $mol_wire_sync(base.$.$giper_baza_land).make({ $: base.$ });
        land.units_steal(base);
        return land;
    }
    function sync(left, right) {
        left.units_steal(right);
        right.units_steal(left);
    }
    $mol_test({
        'Basic list ops'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            $mol_assert_equal(list.items_vary(), []);
            list.items_vary([2, 3]);
            $mol_assert_equal(list.items_vary(), [2, 3]);
            $mol_assert_equal(list.has(1), false);
            list.add(1);
            $mol_assert_equal(list.items_vary(), [1, 2, 3]);
            $mol_assert_equal(list.has(1), true);
            list.add(3);
            $mol_assert_equal(list.items_vary(), [1, 2, 3]);
            list.splice([2]);
            $mol_assert_equal(list.items_vary(), [1, 2, 3, 2]);
            list.splice([2], 0);
            $mol_assert_equal(list.items_vary(), [2, 1, 2, 3, 2]);
            list.wipe(2);
            $mol_assert_equal(list.items_vary(), [2, 1, 3, 2]);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), [2, 3, 1, 2]);
            list.move(1, 3);
            $mol_assert_equal(list.items_vary(), [2, 1, 3, 2]);
            list.cut(2);
            $mol_assert_equal(list.items_vary(), [1, 3]);
            $mol_assert_equal(list.has(2), false);
            list.cut(2);
            $mol_assert_equal(list.items_vary(), [1, 3]);
        },
        'Different types'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($.$giper_baza_list).Data();
            list.items_vary([
                null,
                false,
                true,
                0n,
                4611686018427387904n,
                0,
                Math.PI,
                Number.NaN,
                Number.NEGATIVE_INFINITY,
                '',
                '1234567890123456789012345678901234567890',
                new Uint8Array([]),
                new Uint8Array([1, 2, 3]),
                new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
                list.link(),
            ]);
            $mol_assert_equal(list.items_vary(), [
                false,
                true,
                0,
                4611686018427387904n,
                0,
                Math.PI,
                Number.NaN,
                Number.NEGATIVE_INFINITY,
                '',
                '1234567890123456789012345678901234567890',
                new Uint8Array([]),
                new Uint8Array([1, 2, 3]),
                new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
                list.link(),
            ]);
        },
        async 'List merge'($) {
            const land1 = $.$giper_baza_land.make({ $ });
            const land2 = $.$giper_baza_land.make({ $ });
            const list1 = land1.Pawn($giper_baza_list).Data();
            const list2 = land2.Pawn($giper_baza_list).Data();
            list1.items_vary(['foo', 'xxx']);
            land2.tick();
            list2.items_vary(['foo', 'yyy']);
            await $mol_wire_async(land1).units_steal(land2);
            $mol_assert_equal(list1.items_vary(), ['foo', 'yyy', 'foo', 'xxx']);
        },
        'Insert before removed before changed'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary(['foo', 'bar']);
            list.items_vary(['xxx', 'foo', 'bar']);
            list.items_vary(['xxx', 'bars']);
            $mol_assert_equal(list.items_vary(), ['xxx', 'bars']);
        },
        'Many moves'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary(['foo', 'bar', 'lol']);
            list.move(2, 1);
            list.move(2, 1);
            list.move(0, 3);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), ['bar', 'foo', 'lol']);
        },
        'Reorder separated sublists'($) {
            const land = $.$giper_baza_land.make({ $ });
            const list = land.Pawn($giper_baza_list).Data();
            list.items_vary([1, 2, 3, 4, 5, 6]);
            list.move(3, 5);
            list.move(3, 5);
            list.move(5, 4);
            list.move(0, 2);
            list.move(0, 2);
            list.move(2, 1);
            $mol_assert_equal(list.items_vary(), [1, 3, 2, 4, 6, 5]);
        },
        'Insert after moved right': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.Data($giper_baza_list).move(0, 2);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 7, 3, 4]);
        }),
        'Insert before moved left': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 0);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 7, 3, 4]);
        }),
        'Move left after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 0);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [2, 1, 3, 7, 4]);
        }),
        'Insert before moved right': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 4);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4, 2]);
        }),
        'Move right after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 7, 2, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 4);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 3, 7, 4, 2]);
        }),
        'Insert after wiped': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
        }),
        'Wiped before inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
        }),
        'Insert before wiped': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).wipe(2);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 4]);
        }),
        'Wiped after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).wipe(2);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 4]);
        }),
        'Insert after moved out': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.sand_move(left.Data($giper_baza_list).units()[1], new $giper_baza_link('11111111'), 0);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
            $mol_assert_equal(left.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), right.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), [2]);
        }),
        'Move out before inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.sand_move(right.Data($giper_baza_list).units()[1], new $giper_baza_link('11111111'), 0);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 7, 3, 4]);
            $mol_assert_equal(left.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), right.Pawn($giper_baza_list).Head(new $giper_baza_link('11111111')).items_vary(), [2]);
        }),
        'Insert before changed': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 13, 3, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 13, 7, 4]);
        }),
        'Change after inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 13, 3, 4]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 4]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 2, 7, 13, 4]);
        }),
        'Insert between moved': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4, 5, 6]);
            const left = clone(base);
            left.Data($giper_baza_list).move(1, 5);
            left.Data($giper_baza_list).move(1, 5);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4, 5, 6]);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 4, 5, 2, 7, 3, 6]);
        }),
        'Move near inserted': $mol_wire_async(($) => {
            const base = $mol_wire_sync($.$giper_baza_land).make({ $ });
            base.Data($giper_baza_list).items_vary([1, 2, 3, 4, 5, 6]);
            const left = clone(base);
            left.Data($giper_baza_list).items_vary([1, 2, 7, 3, 4, 5, 6]);
            const right = clone(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).move(1, 5);
            right.Data($giper_baza_list).move(1, 5);
            sync(left, right);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), right.Data($giper_baza_list).items_vary(), [1, 4, 5, 2, 3, 7, 6]);
        }),
        async '3 transactions in same second must keep ordering'($) {
            const auth_left = $.$giper_baza_auth.grab();
            const auth_right = $.$giper_baza_auth.grab();
            const land_left = $.$giper_baza_land.make({ $, auth: () => auth_left });
            land_left.give(auth_right.pass(), $giper_baza_rank_post('just'));
            const land_right = $.$giper_baza_land.make({ $, auth: () => auth_right, link: () => land_left.link() });
            const list_left = land_left.Data($giper_baza_list);
            const list_right = land_right.Data($giper_baza_list);
            list_left.items_vary(['a', 'b', 'c', 'd']);
            $mol_assert_equal(list_left.items_vary(), ['a', 'b', 'c', 'd']);
            await $mol_wire_async(land_right).units_steal(land_left);
            $mol_assert_equal(list_right.items_vary(), ['a', 'b', 'c', 'd']);
            list_right.splice(['x'], 0, 0);
            $mol_assert_equal(list_right.items_vary(), ['x', 'a', 'b', 'c', 'd']);
            await $mol_wire_async(land_left).units_steal(land_right);
            $mol_assert_equal(list_left.items_vary(), ['x', 'a', 'b', 'c', 'd']);
            list_left.items_vary(['d', 'x', 'a', 'b', 'c']);
            $mol_assert_equal(list_left.items_vary(), ['d', 'x', 'a', 'b', 'c']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive convergent list. */
    class $giper_baza_list extends $giper_baza_pawn {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.vals];
        /** All Vary in the list. */
        items_vary(next, tag = 'term') {
            const units = this.units();
            if (next === undefined)
                return units.map(unit => this.land().sand_decode(unit));
            this.splice(next, 0, units.length, tag);
            return this.items_vary();
        }
        /** Replace sublist by new one with reconciliation. */
        splice(next, from = this.units().length, to = from, tag = 'term') {
            const land = this.land();
            $mol_reconcile({
                prev: this.units(),
                from,
                to,
                next,
                equal: (next, prev) => $mol_compare_deep(this.land().sand_decode(prev), next),
                drop: (prev, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), null),
                insert: (next, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, this.head(), land.self_make(), next, tag),
                replace: (next, prev, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), next, prev.tag()),
            });
        }
        /** Unit by Vary. */
        find(vary) {
            for (const unit of this.units()) {
                if ($mol_compare_deep(this.land().sand_decode(unit), vary))
                    return unit;
            }
            return null;
        }
        /** Existence of Vary in the list. */
        has(vary, next, tag = 'term') {
            if (next === undefined)
                return Boolean(this.find(vary));
            if (next)
                this.add(vary, tag);
            else
                this.cut(vary);
            return next;
        }
        /** Add Vary a the beginning if it doesn't exists. */
        add(vary, tag = 'term') {
            if (this.has(vary))
                return;
            this.land().post($giper_baza_link.hole, this.head(), null, vary, tag);
        }
        /** Removes all Vary presence. */
        cut(vary) {
            const units = [...this.units()];
            for (let i = 0; i < units.length; ++i) {
                if (!$mol_compare_deep(this.land().sand_decode(units[i]), vary))
                    continue;
                this.land().post(units[i - 1]?.self() ?? $giper_baza_link.hole, units[i].head(), units[i].self(), null);
                units.splice(i, 1);
                --i;
            }
        }
        /** Moves item from one Seat to another. */
        move(from, to) {
            this.land().sand_move(this.units()[from], this.head(), to);
        }
        /** Remove item by Seat. */
        wipe(seat) {
            this.land().sand_wipe(this.units()[seat]);
        }
        /** Add vary at the end and use maked Self as Pawn Head. */
        pawn_make(Pawn, vary, tag = 'term') {
            this.splice([vary], undefined, undefined, tag);
            return this.land().Pawn(Pawn).Head(this.units().at(-1).self());
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.items_vary()));
        }
        /** Mergeable list of atomic vary type factory */
        static of(init) {
            const Item = $mol_schema_instance(init);
            class $giper_baza_list_of extends $giper_baza_list {
                static Item = Item;
                items(next) {
                    if (next === undefined)
                        return this.items_vary().map(item => Item.cast(item));
                    for (const item of next)
                        Item.guard(item);
                    this.items_vary(next);
                    return this.items();
                }
                static toString() {
                    return this === $giper_baza_list_of ? '$giper_baza_list.of<' + Item + '>' : super.toString();
                }
            }
            __decorate([
                $mol_mem
            ], $giper_baza_list_of.prototype, "items", null);
            return $giper_baza_list_of;
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_list.prototype, "items_vary", null);
    __decorate([
        $mol_action
    ], $giper_baza_list.prototype, "splice", null);
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_list, "of", null);
    $.$giper_baza_list = $giper_baza_list;
    /** Mergeable list of atomic buffers */
    class $giper_baza_list_bin extends $giper_baza_list.of(Uint8Array) {
    }
    $.$giper_baza_list_bin = $giper_baza_list_bin;
    /** Mergeable list of atomic booleans */
    class $giper_baza_list_bool extends $giper_baza_list.of($mol_schema_boolean) {
    }
    $.$giper_baza_list_bool = $giper_baza_list_bool;
    /** Mergeable list of atomic big integers */
    class $giper_baza_list_int extends $giper_baza_list.of($mol_schema_bigint) {
    }
    $.$giper_baza_list_int = $giper_baza_list_int;
    /** Mergeable list of atomic floats */
    class $giper_baza_list_real extends $giper_baza_list.of($mol_schema_float) {
    }
    $.$giper_baza_list_real = $giper_baza_list_real;
    /** Mergeable list of atomic strings */
    class $giper_baza_list_str extends $giper_baza_list.of($mol_schema_string) {
    }
    $.$giper_baza_list_str = $giper_baza_list_str;
    /** Mergeable list of atomic time moments */
    class $giper_baza_list_time extends $giper_baza_list.of($mol_time_moment) {
    }
    $.$giper_baza_list_time = $giper_baza_list_time;
    /** Mergeable list of atomic time durations */
    class $giper_baza_list_dur extends $giper_baza_list.of($mol_time_duration) {
    }
    $.$giper_baza_list_dur = $giper_baza_list_dur;
    /** Mergeable list of atomic time intervals */
    class $giper_baza_list_range extends $giper_baza_list.of($mol_time_interval) {
    }
    $.$giper_baza_list_range = $giper_baza_list_range;
    /** Mergeable list of atomic dictionaries */
    class $giper_baza_list_dict extends $giper_baza_list.of($mol_schema_dict([$mol_schema_string, $mol_schema_any])) {
    }
    $.$giper_baza_list_dict = $giper_baza_list_dict;
    /** Mergeable list of atomic arrays */
    class $giper_baza_list_list extends $giper_baza_list.of($mol_schema_list($mol_schema_any)) {
    }
    $.$giper_baza_list_list = $giper_baza_list_list;
    /** Mergeable list of atomic DOM elements */
    class $giper_baza_list_dom extends $giper_baza_list.of($mol_dom.Element ?? Object) {
    }
    $.$giper_baza_list_dom = $giper_baza_list_dom;
    /** Mergeable list of atomic Trees */
    class $giper_baza_list_tree extends $giper_baza_list.of($mol_tree2) {
    }
    $.$giper_baza_list_tree = $giper_baza_list_tree;
    /** Mergeable list of atomic Links */
    class $giper_baza_list_link extends $giper_baza_list.of($giper_baza_link) {
        /** Mergeable List of atomic Links to some Pawn type */
        static to(Value) {
            class $giper_baza_list_link_to extends $giper_baza_list_link {
                Value = $mol_memo.func(Value);
                static toString() {
                    return this === $giper_baza_list_link_to ? '$giper_baza_list_link_to[ []=> ' + Value() + ' ]' : super.toString();
                }
                /** List of linked Pawns */
                remote_list(next) {
                    const glob = this.$.$giper_baza_glob;
                    const Pawn = Value();
                    return this.items(next?.map(item => item.link()))
                        .map(link => glob.Pawn(link, Pawn));
                }
                remote_add(item) {
                    this.add(item.link());
                }
                /** Make new Pawn and place it at end. */
                make(config) {
                    const Pawn = Value();
                    let pawn;
                    if (config === null || typeof config === 'number') {
                        const self = this.land().self_make(config || undefined);
                        pawn = this.land().Pawn(Pawn).Head(self);
                        this.splice([pawn.link()]);
                    }
                    else if (config instanceof $giper_baza_land) {
                        const land = config.area_make();
                        this.splice([land.link()]);
                        pawn = land.Pawn(Pawn).Data();
                    }
                    else if (config) {
                        const land = this.$.$giper_baza_glob.land_grab(config);
                        this.splice([land.link()]);
                        pawn = land.Pawn(Pawn).Data();
                    }
                    else {
                        return $mol_fail(new Error('Wrong config'));
                    }
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    return pawn;
                }
            }
            __decorate([
                $mol_mem
            ], $giper_baza_list_link_to.prototype, "remote_list", null);
            __decorate([
                $mol_action
            ], $giper_baza_list_link_to.prototype, "remote_add", null);
            __decorate([
                $mol_action
            ], $giper_baza_list_link_to.prototype, "make", null);
            return $giper_baza_list_link_to;
        }
    }
    $.$giper_baza_list_link = $giper_baza_list_link;
    /** @deprecated Use $giper_baza_list_link.to( Target ) */
    function $giper_baza_list_link_to(Value) {
        return $giper_baza_list_link.to(Value);
    }
    $.$giper_baza_list_link_to = $giper_baza_list_link_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Mergeable dictionary Pawn with any keys mapped to any embedded Pawn types */
    class $giper_baza_dict extends $giper_baza_list {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.keys];
        /** List of Vary keys. */
        keys() {
            return this.items_vary();
        }
        /** Inner Pawn by key. */
        dive(key, Pawn, auto) {
            if (this.can_change() && auto !== undefined)
                this.has(key, true, Pawn.tag);
            const unit = this.find(key);
            return unit ? this.land().Pawn(Pawn).Head(unit.self()) : null;
        }
        static schema = {};
        /** Mergeable dictionary Pawn with defined keys mapped to different embedded Pawn types */
        static with(schema, path = '') {
            const prefix = path ? path + ':' : '';
            const $giper_baza_dict_with = class $giper_baza_dict_with extends this {
                // static get schema() { return { ... this.schema, ... schema } }
                static path = path;
                static toString() {
                    if (this !== $giper_baza_dict_with)
                        return super.toString();
                    const params = Object.entries(schema).map(([name, type]) => `${name}: ${type}`);
                    return '$giper_baza_dict.with<{' + params.join(', ') + '}>';
                }
            };
            for (const Field in schema) {
                Object.defineProperty($giper_baza_dict_with.prototype, Field, {
                    value: function (auto) {
                        return this.dive(prefix + Field, schema[Field], auto);
                    }
                });
                // $mol_wire_field( Entity.prototype, Field as any )
            }
            return Object.assign($giper_baza_dict_with, { schema: { ...this.schema, ...schema } });
        }
        ;
        [$mol_dev_format_head]() {
            const keys = $mol_wire_probe(() => this.keys());
            const pawns = $mol_wire_probe(() => this.pawns(null)) ?? [];
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(keys?.map((key, index) => new Pair(key, pawns[index]))));
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_dict.prototype, "keys", null);
    $.$giper_baza_dict = $giper_baza_dict;
    class Pair {
        key;
        val;
        constructor(key, val) {
            this.key = key;
            this.val = val;
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_tr({}, $mol_dev_format_td({}, $mol_dev_format_auto(this.key)), $mol_dev_format_td({}, ': '), $mol_dev_format_td({}, $mol_dev_format_auto(this.val)));
        }
    }
    /** Mergeable dictionary with any keys mapped to any embedded Pawn types */
    function $giper_baza_dict_to(Value) {
        return class $giper_baza_dict_to extends $giper_baza_dict {
            Value = Value;
            key(key, auto) {
                return this.dive(key, this.Value, auto);
            }
            static toString() {
                return this === $giper_baza_dict_to ? '$giper_baza_dict_to<' + Value + '>' : super.toString();
            }
        };
    }
    $.$giper_baza_dict_to = $giper_baza_dict_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async 'Dictionary invariants'($) {
                const land = $giper_baza_land.make({ $ });
                const dict = land.Pawn($giper_baza_dict).Data();
                $mol_assert_equal(dict.keys(), []);
                dict.dive(123, $giper_baza_atom, null);
                dict.dive('xxx', $giper_baza_atom, null);
                $mol_assert_equal(dict.keys(), ['xxx', 123]);
                $mol_assert_equal(dict.has(123), true);
                $mol_assert_equal(dict.has('xxx'), true);
                $mol_assert_equal(dict.has('yyy'), false);
                $mol_assert_equal(dict.dive(123, $giper_baza_atom).vary(), null);
                $mol_assert_equal(dict.dive('xxx', $giper_baza_atom).vary(), null);
                dict.dive(123, $giper_baza_atom).vary(777);
                $mol_assert_equal(dict.dive(123, $giper_baza_atom).vary(), 777);
                dict.dive('xxx', $giper_baza_list).items_vary(['foo', 'bar']);
                $mol_assert_equal(dict.dive('xxx', $giper_baza_list).items_vary(), ['foo', 'bar']);
                dict.has(123, false);
                $mol_assert_equal(dict.keys(), ['xxx']);
            },
            async 'Dictionary merge'($) {
                const land1 = $giper_baza_land.make({ $ });
                const land2 = $giper_baza_land.make({ $ });
                const dict1 = land1.Pawn($giper_baza_dict).Data();
                const dict2 = land2.Pawn($giper_baza_dict).Data();
                dict1.dive(123, $giper_baza_atom, null).vary(666);
                land2.tick();
                dict2.dive(123, $giper_baza_atom, null).vary(777);
                await $mol_wire_async(land1).units_steal(land2);
                $mol_assert_equal(dict1.dive(123, $giper_baza_atom).vary(), 777);
                dict1.dive('xxx', $giper_baza_list, null).items_vary(['foo']);
                land2.tick();
                dict2.dive('xxx', $giper_baza_list, null).items_vary(['bar']);
                await $mol_wire_async(land1).units_steal(land2);
                $mol_assert_equal(dict1.dive('xxx', $giper_baza_list).items_vary(), ['bar', 'foo']);
            },
            async "Narrowed Dictionary with linked Dictionaries and others"($) {
                class User extends $giper_baza_dict.with({
                    Title: $giper_baza_atom_text,
                    Account: $giper_baza_atom_link.to(() => Account),
                    Articles: $giper_baza_list_link.to(() => Article),
                }) {
                }
                class Account extends $giper_baza_dict.with({
                    Title: $giper_baza_atom_text,
                    User: $giper_baza_atom_link.to(() => User),
                }) {
                }
                class Article extends $giper_baza_dict.with({
                    Title: $giper_baza_dict_to($giper_baza_atom_text),
                    Author: $giper_baza_atom_link.to(() => User),
                }) {
                }
                const land = $.$giper_baza_glob.home().land();
                const user = land.Pawn(User).Head(new $giper_baza_link('11111111'));
                $mol_assert_equal(user.Title()?.val() ?? null, null);
                $mol_assert_equal(user.Account()?.remote() ?? null, null);
                $mol_assert_equal(user.Articles()?.remote_list() ?? [], []);
                user.Title(null).val('Jin');
                $mol_assert_equal(user.Title().val() ?? '', 'Jin');
                const account = (await $mol_wire_async(user.Account(null)).ensure([[null, $giper_baza_rank_read]]));
                $mol_assert_equal(user.Account()?.remote() ?? null, account);
                $mol_assert_equal(account.User()?.remote() ?? null, null);
                account.User(null).remote(user);
                $mol_assert_equal(account.User()?.remote(), user);
                const articles = [
                    await $mol_wire_async(user.Articles(null)).make([[null, $giper_baza_rank_read]]),
                    await $mol_wire_async(user.Articles(null)).make([[null, $giper_baza_rank_read]]),
                ];
                $mol_assert_equal(user.Articles()?.remote_list().map(n => n[Symbol.toStringTag]), articles.map(n => n[Symbol.toStringTag]));
                articles[0].Title(null).key('en', 'auto').val('Hello!');
                $mol_assert_equal(articles[0].Title()?.key('en').val(), 'Hello!');
                $mol_assert_equal(articles[1].Title()?.key('ru')?.val() ?? null, null);
                $mol_assert_equal(articles[1].Title()?.key('ru')?.val() ?? null, null);
                $mol_assert_unique(user.land(), account.land(), ...articles.map(article => article.land()));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * 48-bit streamable string hash function
     * Based on cyrb53: https://stackoverflow.com/a/52171480
     */
    function $mol_hash_string(str, seed = 0) {
        let nums = new Array(str.length);
        for (let i = 0; i < str.length; ++i)
            nums[i] = str.charCodeAt(i);
        return $mol_hash_numbers(nums);
    }
    $.$mol_hash_string = $mol_hash_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_schema_enum = $mol_memo_key.func(function $mol_schema_enum(Options) {
        return class $mol_schema_enum_ extends $mol_schema_any {
            static Options = Options;
            static toString() {
                if (this !== $mol_schema_enum_)
                    return super.toString();
                return '$mol_schema_enum<' + $mol_key(Options) + '>';
            }
            static guard(value) {
                if (Options.some(Option => Object.is(Option, value)))
                    return value;
                return $mol_fail(new TypeError('Wrong option', { cause: { value, schema: this } }));
            }
            static cast(value) {
                if (this.check(value))
                    return value;
                return Options[0];
            }
            static default = Options[0];
        };
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Cache of enum schema"($) {
                $mol_assert_equal($mol_schema_enum(['foo']), $mol_schema_enum(['foo']));
                $mol_assert_unique($mol_schema_enum(['foo']), $mol_schema_enum(['bar']));
            },
            "Enum options"($) {
                const Config = $mol_schema_enum([123, 'foo']);
                $mol_assert_equal('$mol_schema_enum<[123,"foo"]>', Config + '', $mol_key(Config));
                $mol_assert_equal(true, Config.check(123));
                $mol_assert_equal(true, Config.check('foo'));
                $mol_assert_equal(false, Config.check(true));
                $mol_assert_equal(false, Config.check(321));
                $mol_assert_equal(false, Config.check('bar'));
                $mol_assert_equal(Config.cast(123), 123);
                $mol_assert_equal(Config.cast('foo'), 'foo');
                $mol_assert_equal(Config.cast('bar'), 123);
                $mol_assert_equal(123, Config.guard(123));
                $mol_assert_fail(() => Config.guard(321), 'Wrong option');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Atomic dynamic register */
    class $giper_baza_atom extends $giper_baza_pawn {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.solo];
        pick_unit(peer) {
            return this.units_of(peer).at(0);
        }
        vary(next) {
            return this.vary_of($giper_baza_link.hole, next);
        }
        vary_of(peer, next) {
            let unit_prev = this.pick_unit(peer);
            let prev = unit_prev ? this.land().sand_decode(unit_prev) : null;
            if (next === undefined)
                return prev;
            if ($mol_compare_deep(prev, next))
                return next;
            this.land().post($giper_baza_link.hole, unit_prev?.head() ?? this.head(), unit_prev?.self() ?? null, next);
            return this.vary_of(peer);
        }
        selection(lord, next) {
            const link = this.link().head().str;
            const user = this.$.$giper_baza_glob.Land(lord).Data($giper_baza_flex_user);
            if (next) {
                user.caret([[link, next[0], 0], [link, next[1], 0]]);
                return next;
            }
            else {
                this.vary(); // track text to recalc selection on its change
                const selection = user.caret();
                if (!selection)
                    return [0, 0];
                if (selection[0][0] !== link)
                    return [0, 0];
                if (selection[1][0] !== link)
                    return [0, 0];
                return [selection[0][1], selection[0][1]];
            }
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', this.head(), ' ', $mol_dev_format_auto(this.vary()));
        }
        /** Atom which typed by Schema/Class. */
        static of(init) {
            const Schema = $mol_schema_maybe($mol_schema_instance(init));
            class $giper_baza_atom_of extends $giper_baza_atom {
                static Schema = Schema;
                /** Get/Set value of Pawn field */
                val(next) {
                    return this.val_of($giper_baza_link.hole, next);
                }
                val_of(peer, next) {
                    if (next !== undefined)
                        Schema.guard(next);
                    const res = this.vary_of(peer, next);
                    return next === undefined ? Schema.cast(res) : this.val_of(peer);
                }
                static toString() {
                    return this === $giper_baza_atom_of ? '$giper_baza_atom.of<' + Schema + '>' : super.toString();
                }
            }
            __decorate([
                $mol_mem_key
            ], $giper_baza_atom_of.prototype, "val_of", null);
            return $giper_baza_atom_of;
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_atom.prototype, "vary_of", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_atom.prototype, "selection", null);
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_atom, "of", null);
    $.$giper_baza_atom = $giper_baza_atom;
    /** @deprecated Use $giper_baza_atom */
    $.$giper_baza_atom_vary = $giper_baza_atom;
    /** Atomic buffer */
    class $giper_baza_atom_blob extends $giper_baza_atom.of(Uint8Array) {
    }
    $.$giper_baza_atom_blob = $giper_baza_atom_blob;
    /** Atomic boolean */
    class $giper_baza_atom_bool extends $giper_baza_atom.of($mol_schema_boolean) {
    }
    $.$giper_baza_atom_bool = $giper_baza_atom_bool;
    /** Atomic big integer */
    class $giper_baza_atom_bint extends $giper_baza_atom.of($mol_schema_bigint) {
    }
    $.$giper_baza_atom_bint = $giper_baza_atom_bint;
    /** Atomic float number */
    class $giper_baza_atom_real extends $giper_baza_atom.of($mol_schema_float) {
    }
    $.$giper_baza_atom_real = $giper_baza_atom_real;
    /** Atomic string */
    class $giper_baza_atom_text extends $giper_baza_atom.of($mol_schema_string) {
    }
    $.$giper_baza_atom_text = $giper_baza_atom_text;
    /** Atomic time moment */
    class $giper_baza_atom_time extends $giper_baza_atom.of($mol_time_moment) {
    }
    $.$giper_baza_atom_time = $giper_baza_atom_time;
    /** Atomic time duration */
    class $giper_baza_atom_dura extends $giper_baza_atom.of($mol_time_duration) {
    }
    $.$giper_baza_atom_dura = $giper_baza_atom_dura;
    /** Atomic time interval */
    class $giper_baza_atom_span extends $giper_baza_atom.of($mol_time_interval) {
    }
    $.$giper_baza_atom_span = $giper_baza_atom_span;
    /** Atomic dictionary */
    class $giper_baza_atom_dict extends $giper_baza_atom.of($mol_schema_dict([$mol_schema_string, $mol_schema_any])) {
    }
    $.$giper_baza_atom_dict = $giper_baza_atom_dict;
    /** Atomic array */
    class $giper_baza_atom_list extends $giper_baza_atom.of($mol_schema_list($mol_schema_any)) {
    }
    $.$giper_baza_atom_list = $giper_baza_atom_list;
    /** Atomic DOM element */
    class $giper_baza_atom_elem extends $giper_baza_atom.of($mol_dom.Element ?? Object) {
    }
    $.$giper_baza_atom_elem = $giper_baza_atom_elem;
    /** Atomic Tree */
    class $giper_baza_atom_tree extends $giper_baza_atom.of($mol_tree2) {
    }
    $.$giper_baza_atom_tree = $giper_baza_atom_tree;
    /** Atomic Link */
    class $giper_baza_atom_link extends $giper_baza_atom.of($giper_baza_link) {
        /** Atomic link to some Pawn type register */
        static to(Value) {
            class $giper_baza_atom_link_to extends $giper_baza_atom_link {
                Value = $mol_memo.func(Value);
                static toString() {
                    return this === $giper_baza_atom_link_to ? '$giper_baza_atom_link.to[ []=> ' + Value() + ' ]' : super.toString();
                }
                /** Target Pawn */
                remote(next) {
                    return this.remote_of($giper_baza_link.hole, next);
                }
                remote_of(peer, next) {
                    const link = this.val_of(peer, next?.link() ?? next);
                    if (!link)
                        return null;
                    return this.$.$giper_baza_glob.Pawn(link, Value());
                }
                /** Target Pawn. Creates if not exists. */
                ensure(config) {
                    return this.ensure_of($giper_baza_link.hole, config);
                }
                ensure_of(peer, config) {
                    if (!this.val_of(peer)) {
                        if (config === null)
                            this.ensure_here(peer);
                        else if (config instanceof $giper_baza_land)
                            this.ensure_area(peer, config);
                        else if (config)
                            this.ensure_lord(peer, config);
                        else
                            return null;
                    }
                    return this.remote_of(peer);
                }
                ensure_here(peer) {
                    const Pawn = Value();
                    const idea = $mol_hash_string(this.link().str);
                    const head = this.land().self_make(idea);
                    const pawn = this.land().Pawn(Pawn).Head(head);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.remote_of(peer, pawn);
                }
                ensure_area(peer, land) {
                    const Pawn = Value();
                    const idea = $mol_hash_string(this.link().str);
                    const area = land.area_make(idea);
                    const pawn = area.Data(Pawn);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.val_of(peer, pawn.link());
                }
                ensure_lord(peer, preset) {
                    const Pawn = Value();
                    const land = this.$.$giper_baza_glob.land_grab(preset);
                    const pawn = land.Data(Pawn);
                    if (Pawn.meta)
                        pawn.meta(Pawn.meta);
                    this.val_of(peer, pawn.link());
                }
                /** @deprecated Use ensure( preset ) */
                remote_ensure(preset) {
                    return this.ensure(preset);
                }
                /** @deprecated Use ensure( null ) */
                local_ensure() {
                    return this.ensure(null);
                }
            }
            __decorate([
                $mol_mem_key
            ], $giper_baza_atom_link_to.prototype, "remote_of", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_here", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_area", null);
            __decorate([
                $mol_action
            ], $giper_baza_atom_link_to.prototype, "ensure_lord", null);
            return $giper_baza_atom_link_to;
        }
    }
    __decorate([
        $mol_memo_key.method
    ], $giper_baza_atom_link, "to", null);
    $.$giper_baza_atom_link = $giper_baza_atom_link;
    /** @deprecated Use $giper_baza_atom_link.to( Target ) */
    function $giper_baza_atom_link_to(Value) {
        return $giper_baza_atom_link.to(Value);
    }
    $.$giper_baza_atom_link_to = $giper_baza_atom_link_to;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Empty representation"($) {
                const land = $giper_baza_land.make({ $ });
                const reg = land.Pawn($giper_baza_atom_time).Data();
                $mol_assert_equal(reg.val(), null);
                reg.vary(null);
                $mol_assert_equal(reg.val(), null);
            },
            "Validation on set, cast on get"($) {
                const land = $.$giper_baza_glob.home().land();
                const head = new $giper_baza_link('22222222');
                const str = land.Pawn($giper_baza_atom.of($mol_schema_maybe($mol_schema_string))).Head(head);
                const mail = land.Pawn($giper_baza_atom.of($mol_schema_pattern(/.+@.+/))).Head(head);
                $mol_assert_equal(str.val(), null);
                $mol_assert_equal(mail.val(), null);
                $mol_assert_fail(() => str.val(123), 'Wrong type');
                $mol_assert_fail(() => mail.val('foo'), 'Wrong string');
                $mol_assert_equal(str.val(), null);
                $mol_assert_equal(mail.val(), null);
                str.val('foo');
                $mol_assert_equal(str.val(), 'foo');
                $mol_assert_equal(mail.val(), null);
                mail.val('foo@bar');
                $mol_assert_equal(str.val(), 'foo@bar');
                $mol_assert_equal(mail.val(), 'foo@bar');
            },
            "Hyper link to another land"($) {
                const land = $.$giper_baza_glob.home().land();
                const reg = land.Pawn($giper_baza_atom_link.to(() => $giper_baza_atom)).Head(new $giper_baza_link('11111111'));
                const remote = reg.ensure(land);
                $mol_assert_unique(reg.land(), remote.land());
                $mol_assert_equal(reg.vary(), remote.link());
                $mol_assert_equal(reg.remote(), remote);
            },
            "Register with linked Pawns"($) {
                const land = $.$giper_baza_glob.home().land();
                const str = land.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('11111111'));
                const link = land.Pawn($giper_baza_atom_link.to(() => $giper_baza_atom_text)).Head(new $giper_baza_link('11111111'));
                $mol_assert_equal(link.remote(), null);
                link.remote(str);
                $mol_assert_equal(link.vary(), link.remote().link(), str.link());
            },
            "Enumerated reg type"($) {
                class FileType extends $giper_baza_atom.of($mol_schema_maybe($mol_schema_enum(['file', 'dir', 'link']))) {
                }
                const land = $.$giper_baza_glob.home().land();
                const type = land.Data(FileType);
                $mol_assert_equal(type.val(), null);
                type.val('file');
                $mol_assert_equal(type.val(), 'file');
                $mol_assert_fail(() => type.val('drive'), 'Wrong option');
                $mol_assert_equal(type.val(), 'file');
                type.vary('drive');
                $mol_assert_equal(type.val(), null);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_stat_series extends $giper_baza_atom.of($mol_schema_list($mol_schema_float)) {
        tick(key, val, count) {
            let vals = this.values().slice();
            while (vals.length < count)
                vals.push(0);
            vals[key] = val + this.initial();
            vals = [...vals.slice(key + 1), ...vals.slice(0, key + 1)];
            for (let i = 1; i < count; ++i)
                if (vals[i] < vals[i - 1])
                    vals[i] = vals[i - 1];
            vals = [...vals.slice(-1 - key), ...vals.slice(0, -1 - key)];
            this.values(vals);
        }
        _initial;
        initial() {
            return this._initial
                ?? (this._initial = this.max());
        }
        max() {
            let max = 0;
            for (const val of this.values())
                if (val > max)
                    max = val;
            return max;
        }
        values(next) {
            if (next) {
                let last = 0;
                next = next.map(v => ([v, last] = [v - last, v])[0]);
            }
            let last = 0;
            return (this.val(next) ?? []).map(v => last += v);
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_stat_series.prototype, "tick", null);
    __decorate([
        $mol_action
    ], $giper_baza_stat_series.prototype, "initial", null);
    __decorate([
        $mol_mem
    ], $giper_baza_stat_series.prototype, "max", null);
    __decorate([
        $mol_mem
    ], $giper_baza_stat_series.prototype, "values", null);
    $.$giper_baza_stat_series = $giper_baza_stat_series;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_stat_ranges extends $giper_baza_dict.with({
        Seconds: $giper_baza_stat_series,
        Minutes: $giper_baza_stat_series,
        Hours: $giper_baza_stat_series,
        Days: $giper_baza_stat_series,
        Months: $giper_baza_stat_series,
        // Years: $giper_baza_stat_series,
    }) {
        _last_instant = 0;
        tick_instant(val) {
            this.tick_integral(this._last_instant += val);
        }
        tick_integral(val) {
            let now = new $mol_time_moment;
            this.Seconds(null).tick(Math.floor(now.second), val, 60);
            this.Minutes(null).tick(now.minute, val, 60);
            this.Hours(null).tick(now.hour, val, 24);
            this.Days(null).tick(now.day, val, 31);
            this.Months(null).tick(now.month, val, 12);
            // this.Years( null )!.tick( now.year!, val )
        }
        series() {
            function pick(Series, length, range) {
                const values = Series?.values() ?? [0];
                let series = Array.from({ length }, (_, i) => values[i]);
                let start = 0;
                let max = 0;
                for (let i = 0; i < series.length; ++i) {
                    if (series[i] < max)
                        continue;
                    max = series[i];
                    start = i + 1;
                }
                if (start)
                    series = [...series.slice(start), ...series.slice(0, start - 1)];
                let last = series[0];
                series = series.slice(1).map(val => {
                    try {
                        if (last === 0 || val < last)
                            return 0;
                        return (val - last) / range;
                    }
                    finally {
                        last = Math.max(val, last);
                    }
                });
                return series;
            }
            const months = pick(this.Days(), 12, 60 * 60 * 24 * 31);
            const days = pick(this.Days(), 31, 60 * 60 * 24);
            const hours = pick(this.Hours(), 24, 60 * 60);
            const minutes = pick(this.Minutes(), 60, 60);
            const seconds = pick(this.Seconds(), 60, 1);
            return [...months, ...days, ...hours, ...minutes, ...seconds].reverse();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_stat_ranges.prototype, "series", null);
    $.$giper_baza_stat_ranges = $giper_baza_stat_ranges;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_report_handler_all = new Set();
    function handler(event, url, line, col, error) {
        for (const handler of $.$mol_report_handler_all) {
            try {
                handler(event, url, line, col, error);
            }
            catch (e) { }
        }
    }
    const handler_promise = (event) => handler('Unhandled Rejection', '', 0, 0, event.reason);
    const handler_promise_node = (reason) => handler('Unhandled Rejection', '', 0, 0, reason);
    if ('addEventListener' in globalThis) {
        globalThis.addEventListener('error', handler);
        globalThis.addEventListener('unhandledrejection', handler_promise);
    }
    if ('process' in globalThis) {
        process.on('uncaughtExceptionMonitor', handler);
        // process.on('unhandledRejection', handler_promise_node) // revents process halt
    }
    const console_error = console.error;
    console.error = function console_error_custom(...args) {
        const format = (val) => typeof val === 'string'
            ? val.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
            : JSON.stringify(val);
        const secondary = args.slice(1);
        const first = typeof args[0] === 'string'
            ? args[0].replaceAll(/%(?:\.\d+)?[disfcoO]/g, spec => spec === '%c' ? (secondary.shift(), '') : secondary.shift())
            : args[0];
        secondary.unshift(first);
        const result = secondary.map(format).join(' ');
        handler(result);
        console_error.apply(console, args);
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push(context => {
        class $mol_state_arg_mock extends $mol_state_arg {
            static $ = context;
            static href(next) { return next || ''; }
            static go(next) {
                this.href(this.link(next));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_state_arg_mock, "href", null);
        __decorate([
            $mol_action
        ], $mol_state_arg_mock, "go", null);
        context.$mol_state_arg = $mol_state_arg_mock;
    });
    $mol_test({
        'args as dictionary'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.dict(), { foo: 'bar', xxx: '' });
            $.$mol_state_arg.dict({ foo: null, yyy: '', lol: '123' });
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!yyy/lol=123');
        },
        'one value from args'($) {
            $.$mol_state_arg.href('#!foo=bar/xxx');
            $mol_assert_equal($.$mol_state_arg.value('foo'), 'bar');
            $mol_assert_equal($.$mol_state_arg.value('xxx'), '');
            $.$mol_state_arg.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=lol/xxx');
            $.$mol_state_arg.value('foo', '');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo/xxx');
            $.$mol_state_arg.value('foo', null);
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!xxx');
        },
        'nested args'($) {
            const base = new $.$mol_state_arg('nested.');
            class Nested extends $mol_state_arg {
                constructor(prefix) {
                    super(base.prefix + prefix);
                }
                static value = (key, next) => base.value(key, next);
            }
            $.$mol_state_arg.href('#!foo=bar/nested.xxx=123');
            $mol_assert_equal(Nested.value('foo'), null);
            $mol_assert_equal(Nested.value('xxx'), '123');
            Nested.value('foo', 'lol');
            $mol_assert_equal($.$mol_state_arg.href().replace(/.*#/, '#'), '#!foo=bar/nested.xxx=123/nested.foo=lol');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $giper_baza_log() {
        return this.$mol_state_arg.value('giper_baza_log') !== null;
    }
    $.$giper_baza_log = $giper_baza_log;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
// @ts-ignore
var $node = $node || {};

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_stat extends $giper_baza_dict.with({
        Uptime: $giper_baza_atom_dura,
        Masters: $giper_baza_atom.of($mol_schema_list($mol_schema_string)),
        Slaves: $giper_baza_atom.of($mol_schema_list($mol_schema_string)),
        /** User time in secs */
        Cpu_user: $giper_baza_stat_ranges,
        /** System time in secs */
        Cpu_system: $giper_baza_stat_ranges,
        /** Memory in MB */
        Mem_used: $giper_baza_stat_ranges,
        /** Memory in MB */
        Mem_free: $giper_baza_stat_ranges,
        /** FS used */
        Fs_used: $giper_baza_stat_ranges,
        /** FS free */
        Fs_free: $giper_baza_stat_ranges,
        /** FS read count */
        Fs_reads: $giper_baza_stat_ranges,
        /** FS write count */
        Fs_writes: $giper_baza_stat_ranges,
        /** Slave sockets count */
        Port_slaves: $giper_baza_stat_ranges,
        /** Masters sockets count */
        Port_masters: $giper_baza_stat_ranges,
        /** Alive (in-memory) lands count */
        Land_alive: $giper_baza_stat_ranges,
        /** Ghost (non-persist) lands count */
        Land_ghost: $giper_baza_stat_ranges,
        /** Unhandled errors */
        Errors: $giper_baza_stat_ranges,
    }) {
        freshness() {
            const last = this.last_change();
            if (!last)
                return null;
            const range = new $mol_time_interval({
                start: last,
                end: new $mol_time_moment(this.$.$mol_state_time.now(1000)),
            });
            return range.duration.count('PT1s');
        }
        uptime(next) {
            return this.Uptime(next)?.val(next) ?? new $mol_time_duration(0);
        }
        masters(next) {
            return this.Masters(next)?.val(next) ?? [];
        }
        slaves(next) {
            return this.Slaves(next)?.val(next) ?? [];
        }
        init() {
            this.Errors(null).tick_instant(1); // restarts as errors
            let handler = () => this.Errors(null).tick_instant(1);
            $mol_report_handler_all.add(handler);
            return { destructor: () => $mol_report_handler_all.delete(handler) };
        }
        tick() {
            this.init();
            if (this.$.$giper_baza_log()) {
                this.$.$mol_log3_warn({
                    place: this,
                    message: 'Stat disabled due logging',
                    hint: 'Disable $giper_baza_log to start monitoring'
                });
                return;
            }
            this.$.$mol_state_time.now(1000);
            const yard = this.$.$giper_baza_glob.yard();
            this.uptime(new $mol_time_duration({ second: Math.floor(process.uptime()) }).normal);
            this.masters([...yard.masters()].map(port => port.address() + ' ' + port.origin()));
            this.slaves([...yard.slaves].map(port => port.address() + ' ' + port.origin()));
            const res = process.resourceUsage();
            this.Cpu_user(null).tick_integral(Math.ceil(res.userCPUTime / 1e4)); // %
            this.Cpu_system(null).tick_integral(Math.ceil(res.systemCPUTime / 1e4)); // %
            this.Fs_reads(null).tick_integral(res.fsRead); // pct
            this.Fs_writes(null).tick_integral(res.fsWrite); // pct
            this.Mem_used(null).tick_instant(Math.ceil((res.maxRSS - res.sharedMemorySize) / 1024)); // MB
            this.Mem_free(null).tick_instant(Math.floor($node.os.freemem() / 1024 / 1024)); // MB
            this.Fs_used(null).tick_instant(Math.floor($mol_storage.used() / 1024 / 1024)); // MB
            this.Fs_free(null).tick_instant(Math.floor($mol_storage.free() / 1024 / 1024)); // MB
            const masters = yard.masters()?.length ?? 0;
            this.Port_masters(null).tick_instant(masters); // pct
            this.Port_slaves(null).tick_instant(yard.slaves.size); // pct
            const lands_alive = yard.lands_alive();
            const lands_persist = yard.lands_alive().filter(land => land.persisted());
            this.Land_alive(null).tick_instant(lands_alive.length); // pct
            this.Land_ghost(null).tick_instant(lands_alive.length - lands_persist.length); // pct
            this.Errors(null).tick_instant(0); // pct
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "freshness", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "uptime", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "masters", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "slaves", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "init", null);
    __decorate([
        $mol_mem
    ], $giper_baza_app_stat.prototype, "tick", null);
    $.$giper_baza_app_stat = $giper_baza_app_stat;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_flex_deck_link = new $giper_baza_link('6NUPZgrR_Itnhu9N1_WPsQDQWa');
    /** Subj - named entity */
    class $giper_baza_flex_subj extends $giper_baza_dict.with({
        Name: $giper_baza_atom_text,
        Icon: $giper_baza_atom_text,
        Hint: $giper_baza_atom_text,
    }, 'Subj') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_U2e5XejQ`);
        name(next) {
            return this.Name(next)?.val(next) ?? this.link().str;
        }
        icon(next) {
            return this.Icon(next)?.val(next) ?? '💫';
        }
        hint(next) {
            return this.Hint(next)?.val(next) ?? '';
        }
    }
    $.$giper_baza_flex_subj = $giper_baza_flex_subj;
    /** Atomic Link to any Subj */
    class $giper_baza_flex_subj_link extends $giper_baza_atom_link.to(() => $giper_baza_flex_subj) {
    }
    $.$giper_baza_flex_subj_link = $giper_baza_flex_subj_link;
    /** Meta - schema of entitiy */
    class $giper_baza_flex_meta extends $giper_baza_flex_subj.with({
        Pulls: $giper_baza_list_link.to(() => $giper_baza_flex_subj),
        Props: $giper_baza_list_link.to(() => $giper_baza_flex_prop),
    }, 'Meta') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_Atd6Ty7F`);
        prop_new(key, type, kind, vars, base) {
            const prop = this.Props(null).make($mol_hash_string(key));
            prop.path(this.name() + ':' + key);
            prop.name(key);
            prop.type(type);
            if (kind)
                prop.kind(kind);
            if (vars)
                prop.enum(vars);
            if (base !== undefined)
                prop.base(base);
            return prop;
        }
        prop_add(prop) {
            this.Props(prop).add(prop.link());
        }
        prop_all() {
            return [
                ...this.pull_all().flatMap(meta => meta.prop_all()),
                ...this.Props()?.remote_list() ?? [],
            ];
        }
        pull_add(meta) {
            this.Pulls(meta).add(meta.link());
        }
        pull_all() {
            return (this.Pulls()?.remote_list() ?? []).map(subj => subj.cast($giper_baza_flex_meta));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "prop_new", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "prop_add", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_meta.prototype, "prop_all", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_meta.prototype, "pull_add", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_meta.prototype, "pull_all", null);
    $.$giper_baza_flex_meta = $giper_baza_flex_meta;
    /** Property - attribute of entity */
    class $giper_baza_flex_prop extends $giper_baza_flex_subj.with({
        /** Key to store value */
        Path: $giper_baza_atom_text,
        /** Type of value */
        Type: $giper_baza_atom_text,
        /** Target Meta */
        Kind: $giper_baza_atom_link.to(() => $giper_baza_flex_meta),
        /** Variants of values */
        Enum: $giper_baza_atom_link.to(() => $giper_baza_list),
        /** Base value */
        Base: $giper_baza_atom,
    }, 'Prop') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_DOnW7Ah9`);
        path(next) {
            return this.Path(next)?.val(next) ?? '';
        }
        type(next) {
            return this.Type(next)?.val(next) ?? '';
        }
        base(next) {
            return this.Base(next)?.vary(next) ?? null;
        }
        kind(next) {
            return this.Kind(next)?.remote(next) ?? null;
        }
        enum(next) {
            return this.Enum(next)?.remote(next) ?? null;
        }
    }
    $.$giper_baza_flex_prop = $giper_baza_flex_prop;
    /** Deck - set of schemes and types */
    class $giper_baza_flex_deck extends $giper_baza_flex_subj.with({
        Metas: $giper_baza_list_link.to(() => $giper_baza_flex_meta),
        Types: $giper_baza_list_str,
    }, 'Deck') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_3AvnmQ4q`);
        meta_new(key, icon, hint) {
            const meta = this.Metas(null).make($mol_hash_string(key));
            meta.name(key);
            meta.icon(icon);
            meta.hint(hint);
            return meta;
        }
        meta_for(Meta, icon, hint) {
            const meta = this.meta_new(Meta.path, icon, hint);
            Meta.meta = meta.link();
            return meta;
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_flex_deck.prototype, "meta_new", null);
    __decorate([
        $mol_action
    ], $giper_baza_flex_deck.prototype, "meta_for", null);
    $.$giper_baza_flex_deck = $giper_baza_flex_deck;
    /** Seed - global network config */
    class $giper_baza_flex_seed extends $giper_baza_flex_subj.with({
        Deck: $giper_baza_atom_link.to(() => $giper_baza_flex_deck),
        Peers: $giper_baza_list_link.to(() => $giper_baza_flex_peer),
    }, 'Seed') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_nrUK4ZIW`);
        deck() {
            return this.Deck(null).ensure(this.land());
        }
        peers(next) {
            return this.Peers(next)?.remote_list(next) ?? [];
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_seed.prototype, "deck", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_seed.prototype, "peers", null);
    $.$giper_baza_flex_seed = $giper_baza_flex_seed;
    /** Peer - network peering info */
    class $giper_baza_flex_peer extends $giper_baza_flex_subj.with({
        Urls: $giper_baza_list_str,
        Stat: $giper_baza_atom_link.to(() => $giper_baza_app_stat),
    }, 'Peer') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_xEibvNCP`);
        stat(auto) {
            return this.Stat(auto)?.ensure(this.land()) ?? null;
        }
        urls(next) {
            return (this.Urls(next)?.items(next) ?? []).filter($mol_guard_defined);
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_peer.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $giper_baza_flex_peer.prototype, "urls", null);
    $.$giper_baza_flex_peer = $giper_baza_flex_peer;
    /** User - human profile */
    class $giper_baza_flex_user extends $giper_baza_flex_subj.with({
        Caret: $giper_baza_atom.of($mol_schema_list($mol_schema_any)),
    }, 'User') {
        static meta = new $giper_baza_link(`${$.$giper_baza_flex_deck_link.str}_csm0VtAK`);
        caret(next) {
            return this.Caret(next)?.val(next) ?? null;
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_flex_user.prototype, "caret", null);
    $.$giper_baza_flex_user = $giper_baza_flex_user;
    /** Makes new Seed with Deck */
    function $giper_baza_flex_init() {
        const seed_land = this.$.$giper_baza_glob.land_grab();
        const seed = seed_land.Data($giper_baza_flex_seed);
        seed.name('Base Seed');
        const deck = seed.deck();
        deck.name('Base Deck');
        deck.Types(null).items_vary(['vary', 'enum', 'bool', 'int', 'real', 'str', 'link', 'time', 'dict', 'text', 'list']);
        const Meta = deck.meta_for($giper_baza_flex_meta, '✨', 'Meta schema of entities');
        Meta.meta(Meta.link());
        const Subj = deck.meta_for($giper_baza_flex_subj, '💎', 'Named entity');
        const Seed = deck.meta_for($giper_baza_flex_seed, '🌱', 'Seed of network');
        const Prop = deck.meta_for($giper_baza_flex_prop, '🔖', 'Property schema');
        const Deck = deck.meta_for($giper_baza_flex_deck, '📚', 'Collection of Metas');
        const Peer = deck.meta_for($giper_baza_flex_peer, '🔆', 'Peer of network');
        const User = deck.meta_for($giper_baza_flex_user, '👤', 'Profile of user');
        seed.meta(Seed.link());
        deck.meta(Deck.link());
        Meta.pull_add(Subj);
        Seed.pull_add(Subj);
        Prop.pull_add(Subj);
        Deck.pull_add(Subj);
        Peer.pull_add(Subj);
        User.pull_add(Subj);
        Subj.prop_new('Name', 'str', undefined, undefined, '');
        Subj.prop_new('Icon', 'str', undefined, undefined, '💫');
        Subj.prop_new('Hint', 'str', undefined, undefined, '');
        Meta.prop_new('Pulls', 'list', Meta, deck.Metas());
        Meta.prop_new('Props', 'list', Prop);
        Seed.prop_new('Deck', 'link', Deck);
        Seed.prop_new('Peers', 'list', Peer);
        Prop.prop_new('Path', 'str');
        Prop.prop_new('Type', 'enum', undefined, deck.Types(), 'vary');
        Prop.prop_new('Kind', 'link', Meta, deck.Metas(), Subj.link());
        Prop.prop_new('Enum', 'link', Subj);
        Prop.prop_new('Base', 'vary', Subj);
        Deck.prop_new('Metas', 'list', Meta);
        Deck.prop_new('Types', 'list');
        Peer.prop_new('Urls', 'list');
        Peer.prop_new('Stat', 'link');
        User.prop_new('Caret', 'list');
        return seed;
    }
    $.$giper_baza_flex_init = $giper_baza_flex_init;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'const returns stored value'() {
            const foo = { bar: $mol_const(Math.random()) };
            $mol_assert_equal(foo.bar(), foo.bar());
            $mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class TestClass extends Uint8Array {
    }
    $mol_test({
        'Uint8Array vs itself'() {
            $mol_assert_ok($mol_compare_array(new Uint8Array, new Uint8Array));
            $mol_assert_ok($mol_compare_array(new Uint8Array([0]), new Uint8Array([0])));
            $mol_assert_not($mol_compare_array(new Uint8Array([0]), new Uint8Array([1])));
        },
        'Uint8Array vs subclassed array'() {
            $mol_assert_not($mol_compare_array(new Uint8Array, new TestClass));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'decode utf8 string'() {
            const str = 'Hello, ΧΨΩЫ';
            const encoded = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 206, 167, 206, 168, 206, 169, 208, 171]);
            $mol_assert_equal($mol_charset_decode(encoded), str);
            $mol_assert_equal($mol_charset_decode(encoded, 'utf8'), str);
        },
        'decode empty string'() {
            const encoded = new Uint8Array([]);
            $mol_assert_equal($mol_charset_decode(encoded), '');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            async "Get and parse"($) {
                $mol_assert_equal(await $mol_wire_async($mol_fetch).text('data:text/plain,foo'), 'foo');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Simple memory allocator.
     * Holds linked list of free blocks.
     * Prefers blocks from the beginning.
     * Near blocks are joined automatically.
     */
    class $mol_memory_pool extends Object {
        _free;
        constructor(size = Number.POSITIVE_INFINITY) {
            super();
            this._free = {
                from: -1,
                size: 0,
                next: {
                    from: 0,
                    size,
                    next: null,
                }
            };
        }
        /** Returns offset of first free block with required size. */
        acquire(size) {
            let prev = this._free;
            let next = prev.next;
            let max = 0;
            while (next.size < size) {
                if (next.size > max)
                    max = next.size;
                prev = next;
                next = next.next;
                if (!next)
                    $mol_fail(new Error(`No free space\nneed: ${size}\nhave: ${max}`));
            }
            const from = next.from;
            if (next.size === size) {
                prev.next = next.next;
            }
            else {
                next.from += size;
                next.size -= size;
            }
            return from;
        }
        /** Allows memory range to be acquired. */
        release(from, size) {
            let prev = this._free;
            let next = prev.next;
            while (next.from < from) {
                prev = next;
                next = next.next;
                if (!next)
                    $mol_fail(new Error('Release out of allocated', { cause: { last: prev, from, size } }));
            }
            if ((from + size > next.from) || (prev.from + prev.size > from)) {
                $mol_fail(new Error('Double release', { cause: { prev, next, from, size } }));
            }
            const begin = prev.from + prev.size === from;
            const end = from + size === next.from;
            if (begin) {
                if (end) {
                    prev.size += size + next.size;
                    prev.next = next.next;
                }
                else {
                    prev.size += size;
                }
            }
            else {
                if (end) {
                    next.from -= size;
                    next.size += size;
                }
                else {
                    prev.next = { from, size, next };
                }
            }
        }
        empty() {
            const first = this._free.next;
            return first.next === null && first.from === 0;
        }
        acquired() {
        }
    }
    $.$mol_memory_pool = $mol_memory_pool;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Empty release"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.empty(), true);
                pool.release(0, 0);
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.empty(), false);
                pool.release(0, 8);
                $mol_assert_equal(pool.empty(), true);
            },
            "linear allocation"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 8);
                $mol_assert_equal(pool.acquire(32), 24);
            },
            "allocation in released"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 8);
                pool.release(0, 16);
                $mol_assert_equal(pool.acquire(8), 0);
                $mol_assert_equal(pool.acquire(16), 24);
                $mol_assert_equal(pool.acquire(8), 8);
            },
            "space limitation"($) {
                const pool = new $mol_memory_pool(10);
                pool.acquire(8);
                pool.release(2, 4);
                $mol_assert_fail(() => pool.acquire(6), 'No free space\nneed: 6\nhave: 4');
            },
            "double release"($) {
                const pool = new $mol_memory_pool;
                $mol_assert_fail(() => pool.release(0, 2), 'Double release');
                $mol_assert_fail(() => pool.release(2, 2), 'Release out of allocated');
                pool.acquire(16);
                pool.release(4, 8);
                $mol_assert_fail(() => pool.release(4, 8), 'Double release');
                $mol_assert_fail(() => pool.release(10, 4), 'Double release');
                $mol_assert_fail(() => pool.release(2, 4), 'Double release');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_pack_four_code = $mol_charset_encode('LAND'); // 76 65 78 68
    $.$giper_baza_pack_head_size = 4 /*BAZA*/ + 12 /*Lord*/ + 6 /*Area*/ + 2; /*Size*/
    /**
     * One Land info (Faces+Units) to Pack.
     * Sync: +Faces -Units
     * Diff: -Faces +Units
     * Stop: -Faces -Units
     */
    class $giper_baza_pack_part extends $mol_object {
        units;
        faces;
        constructor(units = [], faces = new $giper_baza_face_map) {
            super();
            this.units = units;
            this.faces = faces;
        }
        static from(units, faces = new $giper_baza_face_map) {
            return new this(units, faces);
        }
        *[Symbol.iterator]() {
            return {
                units: this.units,
                faces: this.faces,
            };
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_pack_part, "from", null);
    $.$giper_baza_pack_part = $giper_baza_pack_part;
    /** Universal binary package which contains some Faces/Units/Rocks */
    class $giper_baza_pack extends $mol_buffer {
        toBlob() {
            return new Blob([this], { type: 'application/vnd.giper_baza_pack.v1' });
        }
        parts(offsets, pool) {
            const parts = new Map;
            let part = null;
            const buf = this.asArray();
            for (let offset = 0; offset < this.byteLength;) {
                const kind = this.uint8(offset);
                switch ($giper_baza_slot_kind[kind]) {
                    case 'free': {
                        pool?.release(offset, 8);
                        offset += 8;
                        continue;
                    }
                    case 'land': {
                        const link = $giper_baza_link.from_bin(new Uint8Array(buf.buffer, buf.byteOffset + offset + 4, 18));
                        part = parts.get(link.str);
                        if (!part)
                            parts.set(link.str, part = new $giper_baza_pack_part);
                        const size = this.uint16(offset + 22);
                        offset += 24;
                        // Faces
                        for (let i = 0; i < size; ++i) {
                            const peer = $giper_baza_link.from_bin(new Uint8Array(buf.buffer, buf.byteOffset + offset, 6));
                            const tick = this.uint16(offset + 6);
                            const time = this.uint32(offset + 8);
                            const summ = this.uint32(offset + 12);
                            part.faces.peer_time(peer.str, time, tick);
                            part.faces.peer_summ(peer.str, summ);
                            offset += $giper_baza_face.length();
                        }
                        continue;
                    }
                    case 'pass': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const pass = $giper_baza_auth_pass.from(buf.slice(offset, offset + 64));
                        offsets?.set(pass.buffer, offset);
                        part.units.push(pass);
                        offset += pass.byteLength;
                        continue;
                    }
                    case 'seal': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const size = new $giper_baza_unit_seal(this.buffer, this.byteOffset + offset, this.byteLength - offset).size();
                        const length = $giper_baza_unit_seal.length(size);
                        const seal = $giper_baza_unit_seal.from(buf.slice(offset, offset + length));
                        offsets?.set(seal.buffer, offset);
                        part.units.push(seal);
                        offset += seal.byteLength;
                        continue;
                    }
                    case 'sand': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const size = new $giper_baza_unit_sand(this.buffer, this.byteOffset + offset, 40).size();
                        const length_sand = $giper_baza_unit_sand.length(size);
                        const length_ball = $giper_baza_unit_sand.length_ball(size);
                        const sand = $giper_baza_unit_sand.from(buf.slice(offset, offset + length_sand));
                        offsets?.set(sand.buffer, offset);
                        offset += sand.byteLength;
                        if (length_ball) {
                            sand._ball = buf.slice(offset, offset + size);
                            offset += length_ball;
                        }
                        ;
                        part.units.push(sand);
                        continue;
                    }
                    case 'gift': {
                        if (!part)
                            $mol_fail(new Error('Land is undefined'));
                        const length = $giper_baza_unit_gift.length();
                        const gift = $giper_baza_unit_gift.from(buf.slice(offset, offset + length));
                        offsets?.set(gift.buffer, offset);
                        part.units.push(gift);
                        offset += gift.byteLength;
                        continue;
                    }
                    default: return $mol_fail(new Error('Unknown Kind', { cause: { kind, offset } }));
                }
            }
            return [...parts];
        }
        static length(parts) {
            let size = 0;
            for (const [land, { units, faces }] of parts) {
                size += $.$giper_baza_pack_head_size;
                size += faces.size * $giper_baza_face.length();
                for (const unit of units) {
                    size += unit.byteLength;
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: gift => { },
                        seal: seal => { },
                        sand: sand => size += $giper_baza_unit_sand.length_ball(sand.ball().byteLength),
                    });
                }
            }
            return size;
        }
        static make(parts) {
            let length = this.length(parts);
            if (length === 0)
                $mol_fail(new Error('Empty Pack'));
            const buff = new Uint8Array(length);
            const pack = new $giper_baza_pack(buff.buffer);
            let offset = 0;
            // fill Lands
            for (const [id, { units, faces }] of parts) {
                // Head
                buff.set($.$giper_baza_pack_four_code, offset); // 4B
                buff.set(new $giper_baza_link(id).toBin(), offset + 4); // Land = Lord + Area
                pack.uint16(offset + 22, faces.size); // Vers
                offset += 24;
                // Peer + Tick + Time + Summ for every Face
                for (const [peer, face] of faces) {
                    buff.set(new $giper_baza_link(peer).toBin(), offset);
                    pack.uint16(offset + 6, face.tick);
                    pack.uint32(offset + 8, face.time);
                    pack.uint32(offset + 12, face.summ);
                    offset += $giper_baza_face.length();
                }
                // Units + Balls
                for (const unit of units) {
                    buff.set(unit.asArray(), offset);
                    offset += unit.byteLength;
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: gift => { },
                        seal: seal => { },
                        sand: sand => {
                            if (!sand.big())
                                return;
                            buff.set(sand.ball(), offset);
                            offset += $giper_baza_unit_sand.length_ball(sand.size());
                        },
                    });
                }
            }
            return pack;
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_pack.prototype, "parts", null);
    __decorate([
        $mol_action
    ], $giper_baza_pack, "make", null);
    $.$giper_baza_pack = $giper_baza_pack;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "faces serial and parse"($) {
                const land1 = new $giper_baza_link('12345678_12345678');
                const land2 = new $giper_baza_link('87654321_87654321');
                const land3 = new $giper_baza_link('87654321_00000000');
                const peer1 = new $giper_baza_link('12345678');
                const peer2 = new $giper_baza_link('87654321');
                const faces1 = new $giper_baza_face_map;
                faces1.peer_time(peer1.str, $giper_baza_time_now(), 0);
                faces1.peer_summ(peer1.str, 0);
                faces1.peer_time(peer2.str, $giper_baza_time_now(), 0);
                faces1.peer_summ(peer2.str, 64_000);
                const faces2 = new $giper_baza_face_map;
                faces2.peer_time(peer1.str, $giper_baza_time_now(), 0);
                faces2.peer_summ(peer1.str, 1);
                faces2.peer_time(peer2.str, $giper_baza_time_now(), 1);
                const faces3 = new $giper_baza_face_map;
                const parts = [
                    [land1.str, new $giper_baza_pack_part([], faces1)],
                    [land2.str, new $giper_baza_pack_part([], faces2)],
                    [land3.str, new $giper_baza_pack_part([], faces3)],
                ];
                const pack = $giper_baza_pack.make(parts);
                $mol_assert_equal(parts, pack.parts());
            },
            "units serial and parse"($) {
                const land = new $giper_baza_link('12345678_12345678');
                const pass = $.$giper_baza_auth.grab().pass();
                const gift = $giper_baza_unit_gift.make();
                const sand_small = $giper_baza_unit_sand.make(5);
                const ball = new Uint8Array($giper_baza_unit_sand.size_equator + 5);
                const sand_big = $giper_baza_unit_sand.make(ball.byteLength);
                sand_big.ball(ball);
                const seal = $giper_baza_unit_seal.make(15, true);
                const parts = [
                    [land.str, new $giper_baza_pack_part([pass, gift, sand_small, sand_big, seal])],
                ];
                const pack = $giper_baza_pack.make(parts);
                $mol_assert_equal(parts, pack.parts());
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Whole global graph database which contains Lands. */
    class $giper_baza_glob extends $mol_object {
        static lands_touched = new $mol_wire_set();
        /** Glob synchronizer. */
        static yard() {
            return new this.$.$giper_baza_yard;
        }
        /** Land where Lord is King. Contains only main info */
        static home(Home) {
            const home = this.Land(this.$.$giper_baza_auth.current().pass().lord()).Data(Home ?? this.$.$giper_baza_flex_subj);
            if (Home?.meta && !home.meta())
                home.meta(Home.meta);
            return home;
        }
        static king_grab(preset = [[null, this.$.$giper_baza_rank_read]]) {
            const mapping = new Map(preset);
            const king = this.$.$giper_baza_auth.grab();
            const colony = $mol_wire_sync(this.$.$giper_baza_land).make({ $: this.$ });
            colony.auth = $mol_const(king);
            colony.encrypted((mapping.get(null) ?? this.$.$giper_baza_rank_deny) === this.$.$giper_baza_rank_deny);
            const self = this.$.$giper_baza_auth.current().pass();
            colony.give(self, this.$.$giper_baza_rank_rule);
            for (const [key, rank] of mapping)
                colony.give(key, rank);
            this.Land(colony.link()).units_steal(colony);
            return king;
        }
        static land_grab(preset = [[null, this.$.$giper_baza_rank_read]]) {
            return this.Land(this.king_grab(preset).pass().lord());
        }
        /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
        static Land(link) {
            if (!link.str)
                $mol_fail(new Error('Empty Land Link'));
            this.lands_touched.add(link.str);
            return this.$.$giper_baza_land.make({
                link: $mol_const(link),
            });
        }
        /** High level representation of stored data. */
        static Pawn(link, Pawn) {
            const land = this.Land(link.land());
            return land.Pawn(Pawn).Head(link.head());
        }
        static Seed() {
            const link = $giper_baza_flex_deck_link.lord();
            const seed = this.Pawn(link, $giper_baza_flex_seed);
            // if( !$mol_wire_sync( seed ).meta() )
            this.boot();
            return seed;
        }
        static boot() {
            const file = $mol_file.relative('web.baza');
            const pack = $mol_wire_sync($giper_baza_pack).from(file.buffer());
            this.apply_pack(pack);
        }
        static apply_pack(pack) {
            return this.apply_parts(pack.parts());
        }
        static apply_parts(parts) {
            for (const [land_id, part] of parts) {
                const land = this.Land(new this.$.$giper_baza_link(land_id));
                land.diff_apply(part.units);
            }
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_glob, "yard", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "king_grab", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "land_grab", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_glob, "Land", null);
    __decorate([
        $mol_mem
    ], $giper_baza_glob, "Seed", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "boot", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "apply_pack", null);
    __decorate([
        $mol_action
    ], $giper_baza_glob, "apply_parts", null);
    $.$giper_baza_glob = $giper_baza_glob;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_glob_mock extends $.$giper_baza_glob {
            static $ = $;
            static lands_touched = new $mol_wire_set();
        }
        $.$giper_baza_glob = $giper_baza_glob_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Registry of Pawns as Deck entities. */
    class $giper_baza_fund extends $mol_object {
        item_make;
        constructor(item_make) {
            super();
            this.item_make = item_make;
        }
        Head(head) {
            return this.item_make(head);
        }
        Data() {
            return this.Head($giper_baza_land_root.data);
        }
        Tine() {
            return this.Head($giper_baza_land_root.tine);
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_fund.prototype, "Head", null);
    $.$giper_baza_fund = $giper_baza_fund;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_mine_temp extends $mol_object {
        static land(land) {
            return this.make({
                land: $mol_const(land)
            });
        }
        land() {
            return $giper_baza_link.hole;
        }
        unit_deletes = 0;
        unit_inserts = 0;
        ball_inserts = 0;
        ball_deletes = 0;
        units_persisted = new WeakSet();
        /** Updates Units in storage */
        units_save(diff) { }
        /** Loads Units from storage */
        units_load() {
            return [];
        }
        /** Loads Ball from storage */
        ball_load(sand) {
            return null;
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_mine_temp, "land", null);
    $.$giper_baza_mine_temp = $giper_baza_mine_temp;
    $.$giper_baza_mine = $giper_baza_mine_temp;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Converts IDBResult to Promise */
    function $mol_db_response(request) {
        return new Promise((done, fail) => {
            request.onerror = () => fail(new Error(request.error.message));
            request.onsuccess = () => done(request.result);
        });
    }
    $.$mol_db_response = $mol_db_response;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** IndexedDB ObjectStore wrapper. */
    class $mol_db_store {
        native;
        constructor(native) {
            this.native = native;
        }
        get name() {
            return this.native.name;
        }
        get path() {
            return this.native.keyPath;
        }
        get incremental() {
            return this.native.autoIncrement;
        }
        /** Returns dictionary of all existen Indexes. */
        get indexes() {
            return new Proxy({}, {
                ownKeys: () => [...this.native.indexNames],
                has: (_, name) => this.native.indexNames.contains(name),
                get: (_, name) => new $mol_db_index(this.native.index(name))
            });
        }
        /** Creates new Index */
        index_make(name, path = [], unique = false, multiEntry = false) {
            return this.native.createIndex(name, path, { multiEntry, unique });
        }
        /** Drops existen Index */
        index_drop(name) {
            this.native.deleteIndex(name);
            return this;
        }
        get transaction() {
            return new $mol_db_transaction(this.native.transaction);
        }
        get db() {
            return this.transaction.db;
        }
        /** Deletes all stored Documents */
        clear() {
            return $mol_db_response(this.native.clear());
        }
        /** Counts Documents by primary key(s) */
        count(keys) {
            return $mol_db_response(this.native.count(keys));
        }
        /** Stores single Document by primary key. */
        put(doc, key) {
            return $mol_db_response(this.native.put(doc, key));
        }
        /** Returns Document by primary key. */
        get(key) {
            return $mol_db_response(this.native.get(key));
        }
        /** Selects Documents by primary keys. */
        select(key, count) {
            return $mol_db_response(this.native.getAll(key, count));
        }
        /** Deletes Documents by primary key(s). */
        drop(keys) {
            return $mol_db_response(this.native.delete(keys));
        }
    }
    $.$mol_db_store = $mol_db_store;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'put, get, drop, count records and clear store'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.get(2), undefined);
                $mol_assert_like(await letters.count(), 0);
                await letters.put('a');
                await letters.put('b', 1);
                await letters.put('c', 2);
                $mol_assert_like(await letters.get(1), 'b');
                $mol_assert_like(await letters.get(2), 'c');
                $mol_assert_like(await letters.count(), 2);
                await letters.drop(1);
                $mol_assert_like(await letters.get(1), undefined);
                $mol_assert_like(await letters.count(), 1);
                await letters.clear();
                $mol_assert_like(await letters.count(), 0);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
        async 'select by query'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('letters'));
            const trans = db.change('letters');
            try {
                const { letters } = trans.stores;
                await letters.put('a');
                await letters.put('b');
                await letters.put('c');
                await letters.put('d');
                $mol_assert_like(await letters.select(), ['a', 'b', 'c', 'd']);
                $mol_assert_like(await letters.select(null, 2), ['a', 'b']);
                $mol_assert_like(await letters.select($mol_dom_context.IDBKeyRange.bound(2, 3)), ['b', 'c']);
            }
            finally {
                trans.abort();
                db.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Creates new or returns existen database with automatic schema migration.
     * Schema version is based on migrations count.
     * Migrations code mustn't be changed after deploy.
     * Only adding migrations at the end is allowed.
     * Only new migrations will be applyed to existen DB.
     * Schema changes allowed only through migratios.
     */
    async function $mol_db(name, ...migrations) {
        const request = this.$mol_dom_context.indexedDB.open(name, migrations.length ? migrations.length + 1 : undefined);
        request.onupgradeneeded = event => {
            migrations.splice(0, event.oldVersion - 1);
            const transaction = new $mol_db_transaction(request.transaction);
            for (const migrate of migrations)
                migrate(transaction);
        };
        const db = await $mol_db_response(request);
        return new $mol_db_database(db);
    }
    $.$mol_db = $mol_db;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'take and drop db'() {
            const db = await $$.$mol_db('$mol_db_test');
            await db.kill();
        },
        async 'make and drop store in separate migrations'() {
            try {
                const db1 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'));
                db1.destructor();
                $mol_assert_like(db1.stores, ['temp']);
                $mol_assert_like(db1.version, 2);
                const db2 = await $$.$mol_db('$mol_db_test', mig => mig.store_make('temp'), mig => mig.store_drop('temp'));
                db2.destructor();
                $mol_assert_like(db2.stores, []);
                $mol_assert_like(db2.version, 3);
            }
            finally {
                const db0 = await $$.$mol_db('$mol_db_test');
                await db0.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** IndexedDB instance wrapper. */
    class $mol_db_database {
        native;
        constructor(native) {
            this.native = native;
        }
        /** Returns database name. */
        get name() {
            return this.native.name;
        }
        /** Returns database schema version. */
        get version() {
            return this.native.version;
        }
        /** Returns all stores names. */
        get stores() {
            return [...this.native.objectStoreNames];
        }
        /** Create read-only transaction. */
        read(...names) {
            return new $mol_db_transaction(this.native.transaction(names, 'readonly', { durability: 'relaxed' })).stores;
        }
        /** Create read/write transaction. */
        change(...names) {
            return new $mol_db_transaction(this.native.transaction(names, 'readwrite', { durability: 'relaxed' }));
        }
        /**
         * Deletes database.
         * DB can be deleted only after end of all transactions.
         */
        kill() {
            this.native.close();
            const request = $mol_dom_context.indexedDB.deleteDatabase(this.name);
            request.onblocked = console.warn;
            return $mol_db_response(request);
        }
        /**
         * Closes DB connection.
         * Connection really be closed only after end of all transactions.
         */
        destructor() {
            this.native.close();
        }
    }
    $.$mol_db_database = $mol_db_database;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** IndexedDB Transaction wrapper. */
    class $mol_db_transaction {
        native;
        constructor(native) {
            this.native = native;
        }
        /** Returns dictionary of all existen Stores. */
        get stores() {
            return new Proxy({}, {
                ownKeys: () => [...this.native.objectStoreNames],
                has: (_, name) => this.native.objectStoreNames.contains(name),
                get: (_, name, proxy) => (name in proxy)
                    ? new $mol_db_store(this.native.objectStore(name))
                    : undefined,
            });
        }
        /** Creates new Store */
        store_make(name) {
            return this.native.db.createObjectStore(name, { autoIncrement: true });
        }
        /** Drops existen Store */
        store_drop(name) {
            this.native.db.deleteObjectStore(name);
            return this;
        }
        /** Instant abort transaction. Any errors aborts transactions automatically. */
        abort() {
            if (this.native.error)
                return;
            this.native.abort();
        }
        /** Instant commits transaction. Without errors commit proceed automatically later. */
        commit() {
            this.native.commit?.();
            return new Promise((done, fail) => {
                this.native.onerror = () => fail(new Error(this.native.error.message));
                this.native.oncomplete = () => done();
            });
        }
        get db() {
            return new $mol_db_database(this.native.db);
        }
    }
    $.$mol_db_transaction = $mol_db_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** IndexedDB Index wrapper. */
    class $mol_db_index {
        native;
        constructor(native) {
            this.native = native;
        }
        get name() {
            return this.native.name;
        }
        get paths() {
            return this.native.keyPath;
        }
        get unique() {
            return this.native.unique;
        }
        get multiple() {
            return this.native.multiEntry;
        }
        get store() {
            return new $mol_db_store(this.native.objectStore);
        }
        get transaction() {
            return this.store.transaction;
        }
        get db() {
            return this.store.db;
        }
        /** Counts Documents by key(s) */
        count(keys) {
            return $mol_db_response(this.native.count(keys));
        }
        /** Returns Document by primary key. */
        get(key) {
            return $mol_db_response(this.native.get(key));
        }
        /** Selects Documents by primary keys. */
        select(key, count) {
            return $mol_db_response(this.native.getAll(key, count));
        }
    }
    $.$mol_db_index = $mol_db_index;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        async 'unique index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], true));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin' }, 'jin');
                await users.put({ name: 'John' }, 'john');
                await users.put({ name: 'Bin' }, 'bin');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin']), { name: 'Jin' });
                $mol_assert_like(await names.get(['John']), { name: 'John' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['J'], ['J\uFFFF'])), [{ name: 'Jin' }, { name: 'John' }]);
                try {
                    await users.put({ name: 'Jin' }, 'jin2');
                    $mol_fail(new Error('Exception expected'));
                }
                catch (error) {
                    $mol_assert_unique(error.message, 'Exception expected');
                }
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multi path index'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['first', 'last']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ first: 'Jin', last: 'Johnson' }, 'jin');
                await users.put({ first: 'John', last: 'Jinson' }, 'john');
                await users.put({ first: 'Bond', last: 'James' }, '007');
                const { names } = users.indexes;
                $mol_assert_like(await names.get(['Jin', 'Johnson']), { first: 'Jin', last: 'Johnson' });
                $mol_assert_like(await names.get(['John', 'Jinson']), { first: 'John', last: 'Jinson' });
                $mol_assert_like(await names.count(), 3);
                $mol_assert_like(await names.select($mol_dom_context.IDBKeyRange.bound(['Jin', 'Johnson'], ['John', 'Jinson'])), [{ first: 'Jin', last: 'Johnson' }, { first: 'John', last: 'Jinson' }]);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
        async 'multiple indexes'() {
            const db = await $$.$mol_db('$mol_db_test', mig => mig.store_make('users'), mig => mig.stores.users.index_make('names', ['name'], true), mig => mig.stores.users.index_make('ages', ['age']));
            const trans = db.change('users');
            try {
                const { users } = trans.stores;
                await users.put({ name: 'Jin', age: 18 }, 'jin');
                await users.put({ name: 'John', age: 18 }, 'john');
                const { names, ages } = users.indexes;
                $mol_assert_like(await names.select(['Jin']), [{ name: 'Jin', age: 18 }]);
                $mol_assert_like(await names.select(['John']), [{ name: 'John', age: 18 }]);
                $mol_assert_like(await names.count(), 2);
                $mol_assert_like(await ages.select([18]), [{ name: 'Jin', age: 18 }, { name: 'John', age: 18 }]);
                $mol_assert_like(await ages.count(), 2);
            }
            finally {
                trans.abort();
                await db.kill();
            }
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    function Sync(task) {
        return task();
    }
    class $giper_baza_mine_idb extends $giper_baza_mine_temp {
        units_save(diff) {
            return Sync(async () => {
                const db = await this.$.$giper_baza_mine_idb.db();
                const change = db.change('Unit', 'Ball');
                const { Unit, Ball } = change.stores;
                const land = this.land().str;
                for (const unit of diff.del) {
                    Unit.drop([land, unit.path()]);
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: () => { },
                        seal: seal => { },
                        sand: sand => {
                            if (!sand.big())
                                return;
                            Ball.drop([land, sand.path()]);
                        },
                    });
                }
                for (const unit of diff.ins) {
                    Unit.put([unit.buffer], [land, unit.path()]);
                    this.units_persisted.add(unit);
                    if (unit instanceof $giper_baza_auth_pass)
                        continue;
                    unit.choose({
                        gift: () => { },
                        seal: seal => { },
                        sand: sand => {
                            if (!sand.big())
                                return;
                            Ball.put([sand.ball().buffer], [land, unit.path()]);
                        },
                    });
                }
                await change.commit();
            });
        }
        units_load() {
            return Sync(async () => {
                const db = await this.$.$giper_baza_mine_idb.db();
                const { Unit } = db.read('Unit');
                const land = this.land().str;
                const range = IDBKeyRange.bound([land, ''], [land, '\uFFFF']);
                const res = await Unit.select(range);
                const units = res.map(bin => $giper_baza_unit_base.narrow(bin[0]));
                for (const unit of units) {
                    this.units_persisted.add(unit);
                    // $giper_baza_unit_trusted_grant( unit )
                }
                return units;
            });
        }
        ball_load(sand) {
            return Sync(async () => {
                const db = await this.$.$giper_baza_mine_idb.db();
                const { Ball } = db.read('Ball');
                const land = this.land().str;
                const res = await Ball.get([land, sand.path()]);
                return res ? new Uint8Array(res[0]) : new Uint8Array();
            });
        }
        static async db() {
            return await this.$.$mol_db('$giper_baza_mine', mig => mig.store_make('Unit'), mig => mig.store_make('Ball'));
        }
    }
    __decorate([
        $mol_action
    ], $giper_baza_mine_idb.prototype, "units_save", null);
    __decorate([
        $mol_action
    ], $giper_baza_mine_idb.prototype, "units_load", null);
    __decorate([
        $mol_action
    ], $giper_baza_mine_idb.prototype, "ball_load", null);
    __decorate([
        $mol_memo.method
    ], $giper_baza_mine_idb, "db", null);
    $.$giper_baza_mine_idb = $giper_baza_mine_idb;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$giper_baza_mine = $giper_baza_mine_idb;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_mine_mock extends $.$giper_baza_mine_temp {
        }
        $.$giper_baza_mine = $giper_baza_mine_mock;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_bus extends $mol_object {
        name;
        handle;
        channel = null;
        constructor(name, handle) {
            super();
            this.name = name;
            this.handle = handle;
            try {
                this.channel = new BroadcastChannel(name);
                this.channel.onmessage = (event) => this.handle(event.data);
            }
            catch (error) {
                console.warn(error);
            }
        }
        destructor() {
            this.channel?.close();
        }
        send(data) {
            this.channel?.postMessage(data);
        }
    }
    $.$mol_bus = $mol_bus;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_bus extends $.$mol_bus {
            send() { }
        }
        $.$mol_bus = $mol_bus;
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_array_chunks(array, rule) {
        const br = typeof rule === 'number' ? (_, i) => i % rule === 0 : rule;
        let chunk = [];
        const chunks = [];
        for (let i = 0; i < array.length; ++i) {
            const item = array[i];
            if (br(item, i)) {
                if (chunk.length)
                    chunks.push(chunk);
                chunk = [];
            }
            chunk.push(item);
        }
        if (chunk.length)
            chunks.push(chunk);
        return chunks;
    }
    $.$mol_array_chunks = $mol_array_chunks;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty array'() {
            $mol_assert_equal($mol_array_chunks([], () => true), []);
        },
        'one chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], () => false), [[1, 2, 3, 4, 5]]);
        },
        'fixed size chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], 3), [[1, 2, 3], [4, 5]]);
        },
        'first empty chunk'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], (_, i) => i === 0), [[1, 2, 3, 4, 5]]);
        },
        'chunk for every item'() {
            $mol_assert_equal($mol_array_chunks([1, 2, 3, 4, 5], () => true), [[1], [2], [3], [4], [5]]);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function batch(host, items, task) {
        items.call(host); // track deps
        const skip = new Set();
        while (true) {
            const snap = $mol_wire_sync(items).call(host);
            const news = snap.filter(item => !skip.has(item));
            if (!news.length)
                break;
            $mol_wire_sync(task).call(host, news);
            for (const item of news)
                skip.add(item);
        }
    }
    $.$giper_baza_land_root = {
        data: new $giper_baza_link(''), // 0
        tine: new $giper_baza_link('AQAAAAAA'), // 1
    };
    /** Standalone part of Glob which syncs separately, have own rights, and contains Units */
    class $giper_baza_land extends $mol_object {
        /** Auth Independent actor with global unique id generated from Auth key */
        link() {
            return this.auth().pass().lord();
        }
        /** Auth Private key generated with Proof of Work  */
        auth() {
            return this.$.$giper_baza_auth.current();
        }
        faces = new $giper_baza_face_map;
        tick() {
            return this.faces.tick(this.auth().pass().peer());
        }
        _pass = new $mol_wire_dict();
        _seal_item = new Map();
        _seal_shot = new Map();
        _gift = new $mol_wire_dict();
        _sand = new $mol_wire_dict();
        _unit_hash = new Map();
        pass_add(pass) {
            if (this._pass.has(pass.lord().str))
                return;
            this._pass.set(pass.lord().str, pass);
        }
        seal_add(seal) {
            const prev = this._seal_shot.get(seal.shot().str);
            if (prev)
                return;
            for (const hash of seal.hash_list()) {
                const prev = this.seal_item_get(seal.lord(), hash);
                if ($giper_baza_unit_seal.compare(prev, seal) <= 0)
                    continue;
                if (prev?.alive_items.has(hash.str)) {
                    prev.alive_items.delete(hash.str);
                    if (!prev.alive_items.size)
                        this.seal_del(prev);
                    seal.alive_items.add(hash.str);
                }
                this.seal_item_set(seal, hash);
            }
            this._seal_shot.set(seal.shot().str, seal);
        }
        gift_add(gift) {
            const mate = gift.mate();
            const prev = this._gift.get(mate.str);
            if ($giper_baza_unit_gift.compare(prev, gift) <= 0)
                return;
            const peer = gift.lord().peer();
            if (prev)
                this.gift_del(prev);
            this.faces.peer_summ_shift(peer.str, +1);
            this._gift.set(mate.str, gift);
            this.faces.peer_time(peer.str, gift.time(), gift.tick());
            this.unit_seal_inc(gift);
            if ((prev?.rank() ?? $giper_baza_rank_deny) > gift.rank())
                this.rank_audit();
        }
        sand_add(sand) {
            let peers = this._sand.get(sand.head().str);
            if (!peers)
                this._sand.set(sand.head().str, peers = new $mol_wire_dict);
            let sands = peers.get(sand.lord().str);
            if (!sands)
                peers.set(sand.lord().str, sands = new $mol_wire_dict);
            const prev = sands.get(sand.self().str);
            if ($giper_baza_unit_sand.compare(prev, sand) <= 0)
                return;
            const peer = sand.lord().peer();
            if (prev)
                this.sand_del(prev);
            this.faces.peer_summ_shift(peer.str, +1);
            sands.set(sand.self().str, sand);
            this._self_all.set(sand.self().str, !sand.dead());
            this.faces.peer_time(peer.str, sand.time(), sand.tick());
            this.unit_seal_inc(sand);
        }
        units_reaping = new Set();
        unit_reap(unit) {
            if (!this.mine().units_persisted.has(unit))
                return;
            this.units_reaping.add(unit);
        }
        unit_seal_inc(unit) {
            unit._alive = true;
            if (!unit.encoded())
                return;
            this._unit_hash.set(unit.hash().str, unit);
            const seal = this.unit_seal(unit);
            if (!seal)
                return;
            seal.alive_items.add(unit.hash().str);
        }
        unit_seal_dec(unit) {
            unit._alive = false;
            if (!unit.encoded())
                return;
            this._unit_hash.delete(unit.hash().str);
            const seal = this.unit_seal(unit);
            if (!seal)
                return;
            seal.alive_items.delete(unit.hash().str);
            if (!seal.alive_items.size)
                this.seal_del(seal);
        }
        seal_del(seal) {
            const shot = seal.shot();
            if (!this._seal_shot.has(shot.str))
                return;
            this._seal_shot.delete(shot.str);
            for (const hash of seal.hash_list()) {
                if (this.seal_item_get(seal.lord(), hash) === seal) {
                    this.seal_item_del(seal.lord(), hash);
                }
            }
            this.unit_reap(seal);
        }
        gift_del(gift) {
            const prev = this._gift.get(gift.mate().str);
            if (prev !== gift)
                return;
            this._gift.delete(gift.mate().str);
            this.faces.peer_summ_shift(gift.lord().peer().str, -1);
            this.unit_reap(gift);
            this.unit_seal_dec(gift);
        }
        sand_del(sand) {
            const peers = this._sand.get(sand.head().str);
            if (!peers)
                return;
            const sands = peers.get(sand.lord().str);
            if (!sands)
                return;
            const prev = sands.get(sand.self().str);
            if (prev !== sand)
                return;
            sands.delete(sand.self().str);
            this.faces.peer_summ_shift(sand.lord().peer().str, -1);
            this.unit_reap(sand);
            this.unit_seal_dec(sand);
        }
        lord_pass(lord) {
            return this._pass.get(lord.str) ?? null;
        }
        unit_seal(unit) {
            if (!unit.encoded())
                return null;
            return this.seal_item_get(unit.lord(), unit.hash()) ?? null;
        }
        seal_item_get(lord, hash) {
            return this._seal_item.get(lord.str)?.get(hash.str);
        }
        seal_item_del(lord, hash) {
            this._seal_item.get(lord.str)?.delete(hash.str);
        }
        seal_item_set(seal, hash) {
            let seals = this._seal_item.get(seal.lord().str);
            if (!seals)
                this._seal_item.set(seal.lord().str, seals = new Map);
            seals.set(hash.str, seal);
        }
        sand_get(head, lord, self) {
            return this._sand.get(head.str)?.get(lord.str)?.get(self.str) ?? null;
        }
        _self_all = new Map();
        /** Generates unique local id base on optional idea number or random. */
        self_make(idea = Math.floor(Math.random() * 2 ** 48)) {
            const auth = this.auth();
            const rank = this.pass_rank(auth.pass());
            if (rank < $giper_baza_rank_tier.post)
                $mol_fail(new Error(`Rank too low (${rank})`));
            for (let i = 0; i < 4096; ++i) {
                idea = $mol_hash_numbers([idea]);
                if (!idea)
                    continue;
                const idea_link = $giper_baza_link.from_int(idea);
                if (/[æÆ]/.test(idea_link.str))
                    continue;
                if (this._self_all.has(idea_link.str))
                    continue;
                this._self_all.set(idea_link.str, false);
                return idea_link;
            }
            $mol_fail(new Error(`Too long self generation`));
        }
        /** Makes new Area based on Idea or random. Once transfers rights from this Land. */
        area_make(idea = Math.floor($mol_wire_sync(Math).random() * 2 ** 48)) {
            // this.saving()
            let id = '';
            while (true) {
                idea = $mol_hash_numbers([idea]);
                if (!idea)
                    continue;
                id = $giper_baza_link.from_int(idea).str;
                if (/[æÆ]/.test(id))
                    continue;
                break;
            }
            const link = new $giper_baza_link(this.link().lord().str + '_' + id);
            const area = this.$.$giper_baza_glob.Land(link);
            area.inherit();
            area.bus();
            area.sync_mine();
            area.sync_yard();
            return area;
        }
        sync_rights() {
            return new $mol_wire_atom('', () => this.inherit()).fresh();
        }
        inherit() {
            const area = this.link();
            const lord = this.link().lord();
            if (area.str === lord.str)
                return;
            const Lord = this.$.$giper_baza_glob.Land(lord);
            Lord.units_saving();
            const units = new Set();
            for (const gift of Lord._gift.values()) {
                const prev = $mol_wire_sync(this._gift).get(gift.mate().str);
                if ($giper_baza_unit_gift.compare(prev, gift) <= 0)
                    continue;
                const seal = Lord.unit_seal(gift);
                if (!seal)
                    continue;
                units.add(gift);
                units.add(seal);
                units.add(Lord.lord_pass(gift.lord()));
                const mate = gift.mate();
                if (mate.str)
                    units.add(Lord.lord_pass(mate));
            }
            let part = $giper_baza_pack_part.from([...units]);
            const pack = $giper_baza_pack.make([[this.link().str, part]]);
            part = pack.parts()[0][1];
            this.diff_apply(part.units);
        }
        /** Data root */
        Data(Pawn) {
            return this.Pawn(Pawn).Head($.$giper_baza_land_root.data);
        }
        /** Lands for inheritance */
        Tine() {
            return this.Pawn($giper_baza_list_link).Head($.$giper_baza_land_root.tine);
        }
        /** High level representation of stored data */
        Pawn(Pawn) {
            return new $giper_baza_fund((head) => {
                return Pawn.make({
                    land: $mol_const(this), //.sync(),
                    head: $mol_const(head),
                });
            });
        }
        /** Total count of Units inside Land. */
        total() {
            let total = this._gift.size + this._seal_shot.size;
            for (const peers of this._sand.values()) {
                for (const units of peers.values()) {
                    total += units.size;
                }
            }
            return total;
        }
        king_pass() {
            return this.lord_pass(this.link().lord());
        }
        /** Rights level of Pass for Land. */
        pass_rank(pass, next) {
            const prev = this.lord_rank(pass?.lord() ?? null);
            if (next === undefined)
                return prev;
            if (next === prev)
                return prev;
            this.give(pass, next);
            return next;
        }
        lord_tier(lord) {
            return $giper_baza_rank_tier_of(this.lord_rank(lord));
        }
        lord_rate(lord) {
            return $giper_baza_rank_rate_of(this.lord_rank(lord));
        }
        /** Rights level of Lord for Land. Works only when Pass for Lord exists in Land. */
        lord_rank(lord, next) {
            if (lord?.str === this.link().lord().str)
                return $giper_baza_rank_rule;
            if (next === undefined) {
                return this._gift.get(lord?.str ?? '')?.rank()
                    ?? this._gift.get($giper_baza_link.hole.str)?.rank()
                    ?? (this.encrypted() ? $giper_baza_rank_deny : $giper_baza_rank_read);
            }
            const pass = lord ? this.lord_pass(lord) : null;
            // if( !pass ) $mol_fail( new Error( `No Pass for ${ lord }` ) )
            return this.pass_rank(pass, next);
        }
        /** Picks units between Face and current state. */
        diff_units(skip_faces = new $giper_baza_face_map) {
            this.units_signing();
            const skipped = new Map();
            const delta = new Set();
            const passes = new Set();
            const seals = new Set();
            function collect(unit) {
                const peer = unit.lord().peer().str;
                const face_limit = skip_faces.get(peer)?.time_tick ?? 0;
                if (unit.time_tick() > face_limit)
                    return delta.add(unit);
                const skipped_units = skipped.get(peer);
                if (skipped_units)
                    skipped_units.add(unit);
                else
                    skipped.set(peer, new Set([unit]));
            }
            for (const gift of this._gift.values()) {
                collect(gift);
                if (gift.mate().str) {
                    if (skip_faces.has(gift.lord().peer().str))
                        continue;
                    const mate_pass = this.lord_pass(gift.mate());
                    if (mate_pass)
                        passes.add(mate_pass);
                }
            }
            for (const kids of this._sand.values()) {
                for (const peers of kids.values()) {
                    for (const sand of peers.values()) {
                        this.sand_load(sand);
                        collect(sand);
                    }
                }
            }
            // detect Unit absence and then restore all for Peer
            for (const [peer, face] of skip_faces) {
                const skipped_units = skipped.get(peer);
                const skip_mass = skipped_units?.size ?? 0;
                if (skip_mass <= face.summ)
                    continue;
                $mol_wire_sync(this.$).$mol_log3_warn({
                    place: this,
                    message: 'Fail Summ',
                    hint: 'Relax and wait for full peer resync',
                    peer,
                    skip_mass,
                    peer_face: face,
                    self_face: this.faces.get(peer),
                });
                for (const unit of skipped_units)
                    delta.add(unit);
            }
            for (const unit of delta) {
                const seal = this.seal_item_get(unit.lord(), unit.hash());
                if (seal)
                    seals.add(seal);
                else
                    delta.delete(unit);
            }
            for (const unit of delta) {
                if (skip_faces.has(unit.lord().peer().str))
                    continue;
                const pass = this.lord_pass(unit.lord());
                if (!pass)
                    return $mol_fail(new Error('No pass for lord'));
                passes.add(pass);
            }
            return [...passes, ...seals, ...delta];
        }
        /** Picks units between Face and current state and make Part. */
        // @ $mol_action
        diff_part(skip_faces = new $giper_baza_face_map) {
            const units = this.diff_units(skip_faces);
            const faces = new $giper_baza_face_map;
            for (const unit of units) {
                const peer = unit.lord().peer();
                if (faces.has(peer.str))
                    continue;
                const face = this.faces.get(peer.str);
                if (!face)
                    continue;
                faces.set(peer.str, face.clone());
            }
            return new $giper_baza_pack_part(units, faces);
        }
        /** Picks units between Face and current state and make Parts. */
        // @ $mol_action
        diff_parts(skip_faces = new $giper_baza_face_map) {
            return [[this.link().str, this.diff_part(skip_faces)]];
        }
        face_pack() {
            return $giper_baza_pack.make([[
                    this.link().str,
                    new $giper_baza_pack_part([], this.faces.clone()),
                ]]);
        }
        /** Applies Diff to current state with verification. */
        diff_apply(units, skip_load) {
            if (units.length === 0)
                return;
            if (!skip_load)
                this.loading();
            units = $mol_wire_sync(this.$).$giper_baza_unit_sort(units);
            const passes = new Map();
            const mixin_area = this.link().toBin();
            const mixin_lord = this.link().lord().toBin();
            for (const unit of units) {
                if (unit instanceof $giper_baza_auth_pass) {
                    passes.set(unit.hash().str, unit);
                }
            }
            for (const unit of units)
                if (unit instanceof $giper_baza_unit_seal) {
                    const lord_pass = this.lord_pass(unit.lord()) ?? passes.get(unit.lord().str);
                    if (!lord_pass)
                        return this.$.$mol_fail(new Error(`No Pass for Lord`, { cause: unit.lord() }));
                    if (this.$.$giper_baza_unit_trusted_check(unit))
                        continue;
                    const mixin = unit.wide() ? mixin_lord : mixin_area;
                    const sens = unit.shot().mix(mixin);
                    const checked = $mol_wire_sync(lord_pass.auditor()).verify(sens, unit.sign());
                    if (!checked)
                        return $mol_fail(new Error(`Wrong Sign`));
                }
            for (const unit of units) {
                if (unit instanceof $giper_baza_unit_seal) {
                    $giper_baza_unit_trusted_grant(unit);
                }
            }
            for (const unit of units) {
                if (unit instanceof $giper_baza_auth_pass)
                    continue;
                if (this.lord_tier(unit.lord()) < unit.tier_min()) {
                    this.$.$mol_log3_warn({
                        message: 'Too low Tier',
                        tier_min: unit.tier_min().toString(2),
                        tier_actual: this.lord_tier(unit.lord()).toString(2),
                        hint: 'Relax. Unit is skipped.',
                        place: `${this}.diff_apply()`,
                    });
                    continue;
                }
                const lord_pass = this.lord_pass(unit.lord()) ?? passes.get(unit.lord().str);
                if (!lord_pass)
                    return this.$.$mol_fail(new Error(`No Pass for Lord`, { cause: unit.lord() }));
                switch (unit.kind()) {
                    case 'seal': {
                        const seal = unit;
                        if (this.lord_rate(unit.lord()) < seal.rate_min()) {
                            return this.$.$mol_fail(new Error('Too low Rate'));
                        }
                        this.seal_add(seal);
                        break;
                    }
                    case 'gift': {
                        const gift = unit;
                        if (!this.$.$giper_baza_unit_trusted_check(gift)) {
                            const seal = this.unit_seal(gift);
                            if (!seal)
                                return this.$.$mol_fail(new Error(`No Seal for Gift`, { cause: gift }));
                        }
                        if (gift.mate().str) {
                            const mate_pass = this.lord_pass(gift.mate()) ?? passes.get(gift.mate().str);
                            if (!mate_pass)
                                return this.$.$mol_fail(new Error(`No Pass for Mate`, { cause: gift }));
                            this.pass_add(mate_pass);
                        }
                        this.gift_add(gift);
                        break;
                    }
                    case 'sand': {
                        const sand = unit;
                        if (!this.$.$giper_baza_unit_trusted_check(sand)) {
                            const seal = this.unit_seal(sand);
                            if (!seal)
                                return this.$.$mol_fail(new Error(`No Seal for Sand`, { cause: sand }));
                        }
                        this.sand_add(sand);
                        break;
                    }
                    default: {
                        return this.$.$mol_fail(new Error(`Unsupported Kind`));
                    }
                }
                this.pass_add(lord_pass);
            }
            return units;
        }
        units_steal(donor) {
            this.diff_apply(donor.diff_units(), 'skip_load');
        }
        rank_audit() {
            start: while (true) {
                for (const [shot, seal] of this._seal_shot) {
                    const rank = this.lord_rank(seal.lord());
                    if (rank >= seal.rank_min())
                        continue;
                    this.seal_del(seal);
                }
                for (const [lord, gift] of this._gift) {
                    // if( this.unit_seal( gift ) ) {
                    const tier = this.lord_tier(gift.lord());
                    if (tier >= gift.tier_min())
                        continue;
                    // }
                    this.gift_del(gift);
                    continue start;
                }
                for (const [head, peers] of this._sand) {
                    for (const [peer, sands] of peers) {
                        for (const [self, sand] of sands) {
                            const tier = this.lord_tier(sand.lord());
                            if (tier >= sand.tier_min())
                                continue;
                            this.sand_del(sand);
                        }
                    }
                }
                break;
            }
        }
        fork(preset = [[null, $giper_baza_rank_read]]) {
            const land = this.$.$giper_baza_glob.land_grab(preset);
            land.Tine().items_vary([this.link()]);
            return land;
        }
        sand_ordered({ head, peer }) {
            this.sync();
            // this.secret() // early async to prevent async on put
            const queue = (peer?.str)
                ? [...this._sand.get(head.str)?.get(peer.str)?.values() ?? []]
                : [...this._sand.get(head.str)?.values() ?? []].flatMap(units => [...units.values()]);
            const slices = new Map;
            for (const sand of queue)
                slices.set(sand, 0);
            merge: if (head.str !== $.$giper_baza_land_root.tine.str) {
                const tines = (this.Tine()?.items_vary().slice().reverse() ?? [])
                    .map(val => $giper_baza_link_schema.cast(val))
                    .filter($mol_guard_defined);
                if (!tines.length)
                    break merge;
                const exists = new Set(queue.map(sand => sand.self().str));
                const glob = this.$.$giper_baza_glob;
                let slice = 0;
                for (const link of tines) {
                    ++slice;
                    const land = glob.Land(link);
                    for (const sand of land.sand_ordered({ head, peer })) {
                        if (exists.has(sand.self().str))
                            continue;
                        queue.push(sand);
                        exists.add(sand.self().str);
                        slices.set(sand, slice);
                    }
                }
            }
            if (queue.length < 2)
                return queue;
            const compare = (left, right) => {
                return (slices.get(left) - slices.get(right)) || $giper_baza_unit_sand.compare(left, right);
            };
            queue.sort(compare);
            let entry = {
                sand: null,
                next: null,
                prev: null,
            };
            const key = peer === null ? (sand) => sand.path() : (sand) => sand.self().str;
            const by_key = new Map([[entry.prev, entry]]);
            const by_self = new Map([[entry.prev, entry]]);
            while (queue.length) {
                const last = queue.pop();
                by_key.get(entry.prev).next = key(last);
                const item = { sand: last, next: null, prev: entry.prev };
                by_key.set(key(last), item);
                const exists = by_self.get(last.self().str);
                if (!exists || compare(exists.sand, last) < 0) {
                    by_self.set(last.self().str, item);
                }
                entry.prev = key(last);
                for (let cursor = queue.length - 1; cursor >= 0; --cursor) {
                    const kid = queue[cursor];
                    let lead = by_self.get(kid.lead().str || null);
                    if (!lead)
                        continue;
                    while (lead.next && (compare(by_key.get(lead.next).sand, kid) < 0))
                        lead = by_key.get(lead.next);
                    const exists1 = by_key.get(key(kid));
                    if (exists1) {
                        if ((lead.sand ? key(lead.sand) : null) === exists1.prev) {
                            exists1.sand = kid;
                            if (cursor === queue.length - 1)
                                queue.pop();
                            continue;
                        }
                        by_key.get(exists1.prev).next = exists1.next;
                        by_key.get(exists1.next).prev = exists1.prev;
                    }
                    const follower = by_key.get(lead.next);
                    follower.prev = key(kid);
                    const item = { sand: kid, next: lead.next, prev: lead.sand ? key(lead.sand) : null };
                    by_key.set(key(kid), item);
                    const exists2 = by_self.get(kid.self().str);
                    if (!exists2 || compare(exists2.sand, kid) < 0) {
                        by_self.set(kid.self().str, item);
                    }
                    lead.next = key(kid);
                    if (cursor === queue.length - 1)
                        queue.pop();
                    cursor = queue.length;
                }
            }
            const res = [];
            while (entry.next !== null) {
                entry = by_key.get(entry.next);
                res.push(entry.sand);
            }
            return res;
        }
        join() {
            this.encrypted(this.encrypted());
        }
        /**
         * Gives access rights to Lord by Auth key.
         * `null` - gives rights for all Peers.
         */
        give(mate_pass, rank) {
            this.join();
            const gift = $giper_baza_unit_gift.make();
            const lord_pass = this.auth().pass();
            gift._land = this;
            gift.lord(lord_pass.lord());
            gift.rank(rank);
            gift.time_tick(this.tick().time_tick);
            if (mate_pass)
                gift.mate(mate_pass.lord());
            if (rank >= $giper_baza_rank_read) {
                const secret_land = this.secret();
                if (secret_land) {
                    if (!mate_pass)
                        return $mol_fail(new Error(`Encrypted land can't be shared to everyone`));
                    const secret_mutual = this.auth().secret_mutual(mate_pass);
                    if (secret_mutual) {
                        const salt = $mol_buffer.from(gift.salt().slice()).mix(this.link().lord().toBin());
                        const code = $mol_wire_sync(secret_mutual).close(secret_land, salt);
                        gift.code().set(code);
                    }
                }
            }
            else {
                if (!this.encrypted())
                    $mol_fail(new Error('Unencrypted Land is always public'));
            }
            $giper_baza_unit_trusted_grant(gift);
            this.diff_apply([lord_pass, ...$mol_maybe(mate_pass), gift]);
            this.broadcast();
            return gift;
        }
        /** Places data to tree. */
        post(lead, head, self, vary, tag = 'term') {
            this.join();
            const lord_pass = this.auth().pass();
            const encrypted = vary === null ? false : this.encrypted();
            let open = $giper_baza_link_base(this.link(), () => $giper_baza_vary.pack([vary]));
            const length = encrypted ? Math.ceil((open.byteLength + 1) / 16) * 16 : open.byteLength;
            const sand = $giper_baza_unit_sand.make(length, tag);
            sand._open = open;
            sand._land = this;
            $giper_baza_unit_trusted_grant(sand);
            sand.time_tick(this.tick().time_tick);
            sand.lord(lord_pass.lord());
            sand.lead(lead);
            sand.head(head);
            sand._vary = vary;
            sand.self(self ?? this.self_make(encrypted ? undefined : $mol_hash_numbers(open, sand.idea_seed())));
            this.diff_apply([lord_pass, sand]);
            this.broadcast();
            return sand;
        }
        sand_move(sand, head, seat, peer = $giper_baza_link.hole) {
            if (sand.dead())
                $mol_fail(new RangeError(`Can't move wiped sand`));
            const units = this.sand_ordered({ head, peer }).filter(unit => !unit.dead());
            if (seat > units.length)
                $mol_fail(new RangeError(`Seat (${seat}) out of units length (${units.length})`));
            const lead = seat ? units[seat - 1].self() : $giper_baza_link.hole;
            const vary = this.sand_decode(sand);
            if (sand.head() === head) {
                const seat_prev = units.indexOf(sand);
                if (seat === seat_prev)
                    return;
                if (seat === seat_prev + 1)
                    return;
                const prev = seat_prev ? units[seat_prev - 1].self() : $giper_baza_link.hole;
                const next = units[seat_prev + 1];
                if (next)
                    this.post(prev, head, next.self(), this.sand_decode(next), next.tag());
            }
            else {
                this.sand_wipe(sand);
            }
            return this.post(lead, head, sand.self(), vary, sand.tag());
        }
        sand_wipe(sand, peer = $giper_baza_link.hole) {
            const head = sand.head();
            const units = this.sand_ordered({ head, peer }).filter(unit => !unit.dead());
            const seat = units.indexOf(sand);
            if (seat < 0)
                return sand;
            return this.post(seat ? units[seat - 1].self() : $giper_baza_link.hole, head, sand.self(), null, 'term');
        }
        broadcast() {
            this.persisted(true);
            this.$.$giper_baza_glob.yard().lands_news.add(this.link().str);
        }
        sync() {
            this.loading();
            this.sync_rights();
            this.bus();
            this.sync_mine();
            this.sync_yard();
            return this;
        }
        destructor() {
            Promise.resolve().then(() => {
                this.$.$giper_baza_glob.yard().forget_land(this);
            });
        }
        mine() {
            $mol_wire_solid();
            return this.$.$giper_baza_mine.land(this.link());
        }
        sync_mine() {
            return new $mol_wire_atom('', () => this.units_saving()).fresh();
        }
        sync_yard() {
            const root = new $mol_wire_atom('sync_yard', () => this.$.$giper_baza_glob.yard().sync_land(this.link()));
            setTimeout(() => root.fresh());
            return root;
        }
        bus() {
            return new this.$.$mol_bus(`$giper_baza_land:${this.link()}`, $mol_wire_async(buf => {
                const pack = new $giper_baza_pack(buf);
                const part = new Map(pack.parts()).get(this.link().str);
                for (const unit of part.units) {
                    $giper_baza_unit_trusted_grant(unit);
                    this.mine().units_persisted.add(unit);
                }
                this.diff_apply(part.units);
            }));
        }
        loading() {
            $mol_wire_solid();
            let units = $mol_wire_sync(this.mine()).units_load();
            if (units.length)
                this.persisted(true);
            if (this.$.$giper_baza_log())
                $mol_wire_sync(this.$).$mol_log3_rise({
                    place: this,
                    message: 'Load Unit',
                    units: units,
                });
            $mol_wire_sync(this).diff_apply(units, 'skip_load');
        }
        sands_unencoded() {
            const sands = [];
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if (sand._vary === undefined)
                            continue;
                        if (sand._ball)
                            continue;
                        sands.push(sand);
                    }
                }
            }
            return sands;
        }
        sand_encoding() {
            this.loading();
            batch(this, this.sands_unencoded, this.sands_encode);
        }
        units_unsigned() {
            const signing = [];
            for (const gift of this._gift.values()) {
                if (this.unit_seal(gift))
                    continue;
                signing.push(gift);
            }
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if (this.unit_seal(sand))
                            continue;
                        signing.push(sand);
                    }
                }
            }
            return signing;
        }
        units_signing() {
            this.sand_encoding();
            batch(this, this.units_unsigned, this.units_sign);
        }
        units_unsaved() {
            const mine = this.mine();
            const persisting = new Set();
            const check_lord = (lord) => {
                const pass = this.lord_pass(lord);
                if (!pass)
                    return;
                if (mine.units_persisted.has(pass))
                    return;
                persisting.add(pass);
            };
            for (const gift of this._gift.values()) {
                if (mine.units_persisted.has(gift))
                    continue;
                if (!this.unit_seal(gift))
                    continue;
                persisting.add(gift);
                check_lord(gift.lord());
                check_lord(gift.mate());
            }
            for (const kids of this._sand.values()) {
                for (const units of kids.values()) {
                    for (const sand of units.values()) {
                        if ($mol_wire_sync(mine.units_persisted).has(sand))
                            continue;
                        if (!this.unit_seal(sand))
                            continue;
                        persisting.add(sand);
                        check_lord(sand.lord());
                    }
                }
            }
            for (const seal of this._seal_shot.values()) {
                if (!seal.alive_items.size)
                    continue;
                if (mine.units_persisted.has(seal))
                    continue;
                persisting.add(seal);
            }
            return [...persisting];
        }
        units_saving() {
            this.units_signing();
            if (!this.persisted())
                return;
            batch(this, this.units_unsaved, this.units_save);
        }
        async units_save(units) {
            const mine = this.mine();
            const reaping = [...this.units_reaping];
            this.units_reaping.clear();
            await $mol_wire_async(mine).units_save({ ins: units, del: reaping });
            const part = new $giper_baza_pack_part(units);
            const pack = $giper_baza_pack.make([[this.link().str, part]]);
            this.bus().send(pack.buffer);
            if (this.$.$giper_baza_log())
                this.$.$mol_log3_done({
                    place: this,
                    message: 'Save Unit',
                    ins: units,
                    del: reaping,
                });
        }
        persisted(next) {
            $mol_wire_solid();
            if (next !== undefined)
                return next;
            const level = $mol_wire_sync(this.$.$mol_storage).level();
            if (level <= 0)
                return true;
            if (level > 6)
                return false;
            const crop = 8 - level;
            const self = this.auth().pass().lord().toBin().at(-1);
            const land = this.link().toBin().at(-1);
            return (self >>> crop) === (land >>> crop);
        }
        async units_sign(units) {
            await Promise.resolve(); // prevent deps
            const lands = new Map();
            for (const unit of units) {
                if (!unit._land)
                    continue;
                let us = lands.get(unit._land);
                if (us)
                    us.push(unit.hash());
                else
                    lands.set(unit._land, [unit.hash()]);
            }
            const me = this.auth().pass().lord().str;
            for (const seal of this._seal_shot.values()) {
                if (seal.alive_full())
                    continue;
                if (seal.lord().str !== me)
                    continue;
                seal._land ??= this;
                let us = lands.get(this);
                if (!us)
                    lands.set(seal._land, us = []);
                const hashes = seal.alive_list();
                us.push(...hashes);
                // this.seal_del( seal )
            }
            const threads = [...lands.entries()].flatMap(([land, hashes]) => {
                const auth = land.auth();
                const rate = $giper_baza_rank_rate_of(land.pass_rank(auth.pass()));
                const wide = !land.link().area().str;
                return $mol_array_chunks(hashes, $giper_baza_unit_seal_limit).map(async (hashes) => {
                    const seal = $giper_baza_unit_seal.make(hashes.length, wide);
                    seal.lord(auth.pass().lord());
                    seal.hash_list(hashes);
                    seal._land = this;
                    do {
                        seal.time_tick(this.tick().time_tick);
                        const sens = seal.shot().mix(this.link());
                        const sign = await auth.signer().sign(sens);
                        seal.sign(sign);
                    } while (seal.rate_min() > rate);
                    return seal;
                });
            });
            const seals = await Promise.all(threads);
            for (const seal of seals) {
                for (const hash of seal.hash_list()) {
                    if (this._unit_hash.has(hash.str)) {
                        seal.alive_items.add(hash.str);
                    }
                }
                if (seal.alive_items.size)
                    this.seal_add(seal);
            }
            return seals;
        }
        sands_encode(sands) {
            return Promise.all(sands.map(sand => this.sand_encode(sand)));
        }
        async sand_encode(sand) {
            let bin = sand._open;
            if (sand._vary !== null) {
                const secret = sand._land.secret();
                if (secret) {
                    const salt = $mol_buffer.from(sand.salt().slice()).mix(this.link().toBin());
                    bin = await secret.encrypt(bin, salt);
                }
            }
            sand.ball(bin);
            if (sand._alive)
                this._unit_hash.set(sand.hash().str, sand);
            return sand;
        }
        sand_load(sand) {
            if (sand._ball)
                return;
            sand._ball = sand.big() ? $mol_wire_sync(this.mine()).ball_load(sand) : sand.data();
        }
        sand_decode(sand) {
            try {
                // const open = this.sand_decrypt( sand )
                const open = sand._open;
                return $giper_baza_link_base(this.link(), () => $giper_baza_vary.take(open)[0]);
            }
            catch (error) {
                if (error instanceof Promise)
                    return $mol_fail_hidden(error);
                this.$.$mol_fail_log(error);
                return null;
            }
        }
        // @ $mol_mem_key
        // sand_decrypt( sand: $giper_baza_unit_sand ): Uint8Array< ArrayBuffer > {
        // 	if( this.sand_get( sand.head(), sand.lord(), sand.self() ) !== sand ) {
        // 		for( const id of this.Tine().items_vary() ?? [] ) {
        // 			const open = this.$.$giper_baza_glob.Land( $giper_baza_vary_cast_link( id! )! ).sand_decrypt( sand )
        // 			if( open ) return open
        // 		}
        // 		return undefined!
        // 	}
        // 	const secret = this.secret()
        // 	if( sand._open ) return sand._open
        // 	if( !sand._ball ) sand._ball = sand.big() ? $mol_wire_sync( this.mine() ).ball_load( sand ) : sand.data()
        // 	if( secret && sand._ball && !sand.dead() ) {
        // 		try {
        // 			sand._open = $mol_wire_sync( secret ).decrypt( sand._ball, sand.salt() )
        // 		} catch( error: any ) {
        // 			if( $mol_fail_catch( error ) ) {
        // 				if( error.message ) $mol_fail_hidden( error )
        // 				else $mol_fail_hidden( new Error( `Can't decrypt`, { cause: error } ) )
        // 			}
        // 		}
        // 	} else {
        // 		sand._open = sand._ball
        // 	}
        // 	return sand._open!
        // }
        sands_open(sands) {
            const encrypted = this.encrypted();
            const closed = sands.filter(sand => {
                if (sand._open)
                    return false;
                if (!sand._ball) {
                    if (sand.big())
                        return true;
                    sand._ball = sand.data();
                }
                if (encrypted && !sand.dead())
                    return true;
                sand._open = sand._ball;
            });
            if (!closed.length)
                return;
            return Promise.all(closed.map(sand => this.sand_open(sand)));
        }
        async sand_open(sand) {
            if (this.sand_get(sand.head(), sand.lord(), sand.self()) !== sand) {
                for (const id of this.Tine().items_vary() ?? []) {
                    const open = await this.$.$giper_baza_glob.Land($giper_baza_link_schema.cast(id)).sand_open(sand);
                    if (open)
                        return open;
                }
                return undefined;
            }
            const secret = this.secret();
            if (sand._open)
                return sand._open;
            if (!sand._ball)
                sand._ball = sand.big() ? await $mol_wire_async(this.mine()).ball_load(sand) : sand.data();
            if (secret && sand._ball && !sand.dead()) {
                const salt = $mol_buffer.from(sand.salt().slice()).mix(this.link().toBin());
                try {
                    sand._open = await secret.decrypt(sand._ball, salt);
                }
                catch (error) {
                    if ($mol_fail_catch(error)) {
                        if (error.message)
                            $mol_fail_hidden(error);
                        else
                            $mol_fail_hidden(new Error(`Can't decrypt`, { cause: error }));
                    }
                }
            }
            else {
                sand._open = sand._ball;
            }
            return sand._open;
        }
        encryptable() {
            return !this._sand.size;
        }
        encrypted(next) {
            $mol_wire_solid();
            const gift = this._gift.get(this.link().str);
            const prev = gift?.code_exists() ?? false;
            if (next === undefined)
                return prev;
            if (this.faces.size) {
                if (prev === next)
                    return prev;
                $mol_fail(new Error(`Change encryption is forbidden`));
            }
            const auth = this.auth();
            const unit = $mol_wire_sync($giper_baza_unit_gift).make();
            $giper_baza_unit_trusted_grant(unit);
            unit.rank($giper_baza_rank_rule);
            unit.time_tick(this.tick().time_tick);
            unit.lord(auth.pass().lord());
            unit.mate(auth.pass().lord());
            unit._land = this;
            if (next) {
                const secret = $mol_wire_sync($mol_crypto_sacred).make();
                const secret_mutual = auth.secret_mutual(auth.pass());
                const secret_closed = $mol_wire_sync(secret_mutual).close(secret, unit.salt());
                unit.code().set(secret_closed);
            }
            this.diff_apply([auth.pass(), unit]);
            return next;
        }
        secret() {
            if (!this.encrypted())
                return null;
            const auth = this.auth();
            const gift = this._gift.get(auth.pass().lord().str);
            if (!gift)
                return $mol_fail(new Error(`Access denied`));
            if (!gift.code_exists())
                return $mol_fail(new Error(`No key to decrypt`));
            const secret_mutual = auth.secret_mutual(this.lord_pass(gift.lord()));
            if (!secret_mutual)
                return $mol_fail(new Error(`Can't decrypt secret`));
            const salt = $mol_buffer.from(gift.salt().slice()).mix(this.link().lord().toBin());
            return new $mol_crypto_sacred($mol_wire_sync(secret_mutual).open(gift.code(), salt).buffer);
        }
        dump() {
            this.units_saving();
            const units = [];
            for (const gift of this._gift.values())
                units.push(gift);
            for (const heads of this._sand.values()) {
                for (const sands of heads.values()) {
                    for (const sand of sands.values()) {
                        units.push(sand);
                    }
                }
            }
            return {
                land: this.link(),
                units
            };
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue('$giper_baza_land')
                + $mol_term_color.magenta(` @` + this.link());
        }
        ;
        [$mol_dev_format_head]() {
            return $mol_dev_format_span({}, $mol_dev_format_native(this), ' ', $mol_dev_format_auto(this.faces.stat));
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "lord_pass", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "self_make", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "area_make", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_rights", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "inherit", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "Data", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "Tine", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "Pawn", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "total", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "king_pass", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "pass_rank", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "face_pack", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "diff_apply", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "units_steal", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "fork", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_ordered", null);
    __decorate([
        $mol_mem,
        $mol_action
    ], $giper_baza_land.prototype, "join", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "give", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "post", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sand_move", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sand_wipe", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "mine", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_mine", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sync_yard", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "bus", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "loading", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sands_unencoded", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "sand_encoding", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_unsigned", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_signing", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_unsaved", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "units_saving", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "persisted", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_load", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_land.prototype, "sand_decode", null);
    __decorate([
        $mol_action
    ], $giper_baza_land.prototype, "sands_open", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "encryptable", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "encrypted", null);
    __decorate([
        $mol_mem
    ], $giper_baza_land.prototype, "secret", null);
    $.$giper_baza_land = $giper_baza_land;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_land_mock extends $.$giper_baza_land {
            sync() {
                return this;
            }
        }
        $.$giper_baza_land = $giper_baza_land_mock;
    });
    $mol_test({
        async 'Give rights'($) {
            const auth0 = await $.$giper_baza_auth.grab();
            const auth1 = await $.$giper_baza_auth.grab();
            const auth2 = await $.$giper_baza_auth.grab();
            const land0 = $giper_baza_land.make({ $, auth: () => auth0 });
            const land1 = $giper_baza_land.make({ $, link: () => land0.link(), auth: () => auth1 });
            $mol_assert_equal(land0.lord_rank(land0.link()), $giper_baza_rank_rule);
            $mol_assert_equal(land0.lord_rank(auth1.pass().lord()), $giper_baza_rank_read);
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_read);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_read);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_read);
            land0.give(auth1.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            land0.give(auth1.pass(), $giper_baza_rank_pull('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_pull('just'));
            land0.give(auth1.pass(), $giper_baza_rank_rule);
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_rule);
            land0.give(auth1.pass(), $giper_baza_rank_post('just'));
            $mol_assert_equal(land0.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            await $mol_wire_async(land1).units_steal(land0);
            $mol_assert_equal(land1.pass_rank(auth1.pass()), $giper_baza_rank_post('just'));
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
        },
        async 'Post Data and pick Delta'($) {
            const auth1 = $.$giper_baza_auth.grab();
            const auth2 = $.$giper_baza_auth.grab();
            const land1 = $giper_baza_land.make({ $, auth: () => auth1 });
            const land2 = $giper_baza_land.make({ $, link: () => land1.link(), auth: () => auth2 });
            $mol_assert_equal(await $mol_wire_async(land1).diff_units(), []);
            land1.post($giper_baza_link.hole, $giper_baza_link.hole, new $giper_baza_link('AA111111'), new Uint8Array([1]));
            $mol_assert_equal((await $mol_wire_async(land1).diff_units()).length, 4);
            const face = land1.faces.clone();
            land1.post(new $giper_baza_link('AA111111'), $giper_baza_link.hole, new $giper_baza_link('AA222222'), new Uint8Array([2]));
            $mol_assert_equal((await $mol_wire_async(land1).diff_units()).length, 5);
            $mol_assert_equal((await $mol_wire_async(land1).diff_units(face)).length, 2);
            await $mol_wire_async(land2).units_steal(land1);
            land2.post(new $giper_baza_link('AA222222'), $giper_baza_link.hole, new $giper_baza_link('AA333333'), new Uint8Array([3]));
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 5);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units(face)).length, 2);
            land1.give(auth2.pass(), $giper_baza_rank_post('just'));
            await $mol_wire_async(land2).units_steal(land1);
            land2.post(new $giper_baza_link('AA222222'), $giper_baza_link.hole, new $giper_baza_link('AA333333'), new Uint8Array([5]));
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 9);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units(face)).length, 6);
            land1.give(auth2.pass(), $giper_baza_rank_read);
            await $mol_wire_async(land2).units_steal(land1);
            $mol_assert_equal((await $mol_wire_async(land2).diff_units()).length, 7);
        },
        async 'Land encryption'($) {
            const land = $mol_wire_async($giper_baza_land.make({ $ }));
            $mol_assert_equal(await land.encrypted(), false);
            await land.encrypted(true);
            $mol_assert_equal(await land.encrypted(), true);
            const material = await land.post($giper_baza_link.hole, $giper_baza_link.hole, null, new Uint8Array([1, 2, 3]));
            $mol_assert_equal((await land.sand_encode(material)).data().length, 16);
            $mol_assert_equal(await land.sand_decode(material), new Uint8Array([1, 2, 3]));
            $mol_assert_equal((await land.sand_ordered({ head: $giper_baza_link.hole, peer: $giper_baza_link.hole })).length, 1);
            const tombstone = await land.post($giper_baza_link.hole, $giper_baza_link.hole, material.self(), null);
            $mol_assert_equal((await land.sand_encode(tombstone)).data().length, 1);
            $mol_assert_equal(await land.sand_decode(tombstone), null);
            $mol_assert_equal((await land.sand_ordered({ head: $giper_baza_link.hole, peer: $giper_baza_link.hole })).length, 1);
        },
        'Land fork & merge': $mol_wire_async(($) => {
            const home = $.$giper_baza_glob.home().land();
            const left = home.fork();
            home.Data($giper_baza_list).items_vary(['foo', 'xxx']);
            $mol_assert_equal(home.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            left.faces.sync(home.faces);
            left.Data($giper_baza_list).items_vary(['foo', 'yyy']);
            $mol_assert_equal(left.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            const right = home.fork();
            right.faces.sync(left.faces);
            right.Data($giper_baza_list).items_vary(['foo', 'zzz']);
            $mol_assert_equal(right.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
            const both = home.fork();
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'xxx']);
            both.Tine().items_vary([right.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
            both.Tine().items_vary([left.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            both.Tine().items_vary([right.link(), left.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'yyy']);
            both.Tine().items_vary([left.link(), right.link()]);
            $mol_assert_equal(both.Data($giper_baza_list).items_vary(), ['foo', 'zzz']);
        }),
        'Inner Links are relative to forked Land': $mol_wire_async(($) => {
            const Alice = $.$giper_baza_glob.home().land();
            const Bella = Alice.fork();
            const alice_val = Alice.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('qwertyui'));
            const bella_val = Bella.Pawn($giper_baza_atom_text).Head(new $giper_baza_link('qwertyui'));
            alice_val.val('Alice');
            bella_val.val('Bella');
            const alice_link = Alice.Pawn($giper_baza_atom_link).Head(new $giper_baza_link('asdfghjk'));
            const bella_link = Bella.Pawn($giper_baza_atom_link).Head(new $giper_baza_link('asdfghjk'));
            alice_link.val(alice_val.link());
            $mol_assert_equal(alice_link.val(), alice_val.link());
            $mol_assert_unique(alice_link.val(), bella_link.val());
            $mol_assert_equal(bella_link.val(), bella_val.link());
        }),
        async 'Land Area inherits rights'($) {
            const area = await $mol_wire_async(() => {
                const base = $.$giper_baza_glob.land_grab([[null, $giper_baza_rank_post('just')]]);
                base.units_saving();
                return base.area_make();
            })();
            $mol_assert_equal(area.pass_rank(area.auth().pass()), $giper_baza_rank_rule);
            $mol_assert_equal(area.lord_rank($giper_baza_link.hole), $giper_baza_rank_post('just'));
        },
        // async 'Merge text changes'() {
        // 	const base = new $giper_baza_land( 1n, 1 )
        // 	base.chief.as( $hyoo_crowd_text ).str( 'Hello World and fun!' )
        // 	const left = base.fork( await $hyoo_crowd_peer.generate() )
        // 	const right = base.fork( await $hyoo_crowd_peer.generate() )
        // 	right.clock_data.tick( right.peer().id )
        // 	left.chief.as( $hyoo_crowd_text ).str( 'Hello Alice and fun!' )
        // 	right.chief.as( $hyoo_crowd_text ).str( 'Bye World and fun!' )
        // 	const left_delta = left.delta()
        // 	const right_delta = right.delta()
        // 	left.apply( right_delta )
        // 	right.apply( left_delta )
        // 	$mol_assert_equal(
        // 		left.chief.as( $hyoo_crowd_text ).str(),
        // 		right.chief.as( $hyoo_crowd_text ).str(),
        // 		'Bye Alice and fun!',
        // 	)
        // },
        // async 'Write into token'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xyz', 3 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fooxyzbar' ] )
        // },
        // async 'Write into token with split'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foobar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'XYZ', 2, 4 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'fo', 'XYZar' ] )
        // },
        // async 'Write over few tokens'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'xxx foo bar yyy' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'X Y Z', 6, 9 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx', ' fo', 'X', ' Y', ' Zar', ' yyy' ] )
        // },
        // async 'Write whole token'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'xxxFoo yyy' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'bar', 3, 7 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxxbaryyy' ] )
        // },
        // async 'Write whole text'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 0, 7 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'xxx' ] )
        // },
        // async 'Write at the end'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'bar' )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foobar' ] )
        // },
        // async 'Write between tokens'() {
        // 	const store = new $giper_baza_land( 1n, 1 )
        // 	store.chief.as( $hyoo_crowd_text ).str( 'foo bar' )
        // 	store.chief.as( $hyoo_crowd_text ).write( 'xxx', 4 )
        // 	$mol_assert_equal( store.chief.as( $hyoo_crowd_list ).list(), [ 'foo', ' xxxbar' ] )
        // },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port extends $mol_object {
        send_code(code) { }
        send_type(mime) { }
        send_name(name) { }
        origin() { return 'unknown'; }
        address() { return 'unknown'; }
        send_data(data) {
            if (data === null)
                return this.send_nil();
            if (typeof data === 'string')
                return this.send_text(data);
            if (data instanceof Uint8Array)
                return this.send_bin(data);
            if (data instanceof $mol_dom_context.Element)
                return this.send_dom(data);
            return this.send_json(data);
        }
        send_nil() {
            this.send_code(204);
        }
        send_bin(data) {
            this.send_code(200);
            this.send_type('application/octet-stream');
        }
        send_text(data) {
            this.send_code(200);
            this.send_type('text/plain;charset=utf-8');
            this.send_bin($mol_charset_encode(data));
        }
        send_json(data) {
            this.send_code(200);
            this.send_type('application/json');
            this.send_text(JSON.stringify(data));
        }
        send_dom(data) {
            this.send_code(200);
            this.send_type('text/html;charset=utf-8');
            this.send_text($mol_dom_serialize(data));
        }
        static make(config) {
            return super.make(config);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_data", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_text", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_json", null);
    __decorate([
        $mol_action
    ], $mol_rest_port.prototype, "send_dom", null);
    __decorate([
        ($mol_action)
    ], $mol_rest_port, "make", null);
    $.$mol_rest_port = $mol_rest_port;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws extends $mol_rest_port {
    }
    $.$mol_rest_port_ws = $mol_rest_port_ws;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rest_port_ws_std extends $mol_rest_port_ws {
        socket;
        origin() {
            return this.socket.url;
        }
        send_nil() {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send('');
        }
        send_bin(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            this.socket.send(data);
        }
        send_text(data) {
            if (this.socket.readyState !== this.socket.OPEN)
                return;
            const bin = $mol_charset_encode(data);
            this.socket.send(bin);
        }
    }
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_nil", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_bin", null);
    __decorate([
        $mol_action
    ], $mol_rest_port_ws_std.prototype, "send_text", null);
    $.$mol_rest_port_ws_std = $mol_rest_port_ws_std;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const Passives = new WeakMap();
    /** Glob synchronizer */
    class $giper_baza_yard extends $mol_object {
        /** Whole global graph database which contains Lands */
        glob() {
            return null;
        }
        lands_news = new $mol_wire_set();
        static masters_default = [];
        static masters_seeded() {
            const all = this.$.$giper_baza_glob.Seed().peers();
            const self = this.$.$giper_baza_auth.current().pass().lord();
            const pos = all.findLastIndex(peer => peer.link().str === self.str);
            const links = all.slice(pos + 1).flatMap(peer => peer.urls());
            return links.length ? links : null;
        }
        static masters_override() {
            const arg = this.$.$mol_state_arg.value('giper_baza_yard_masters');
            if (arg == null)
                return null;
            const links = arg.split(',').filter(Boolean);
            return links;
        }
        static masters() {
            return this.masters_override() ?? this.masters_seeded() ?? this.masters_default;
        }
        master_cursor(next = 0) {
            return next;
        }
        master_current() {
            return this.$.$giper_baza_yard.masters()[this.master_cursor()];
        }
        master_next() {
            this.master_cursor((this.master_cursor() + 1) % this.$.$giper_baza_yard.masters().length);
        }
        reconnects(reset) {
            return ($mol_wire_probe(() => this.reconnects()) ?? 0) + 1;
        }
        master() {
            this.reconnects();
            const link = this.master_current();
            if (!link)
                return null;
            const socket = new $mol_dom_context.WebSocket(link.replace(/^http/, 'ws'), ['$giper_baza_yard_2']);
            socket.binaryType = 'arraybuffer';
            const port = new $mol_rest_port_ws_std;
            port.socket = socket;
            socket.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    if (!event.data.byteLength)
                        return;
                    await $mol_wire_async(this).port_income(port, new Uint8Array(event.data));
                }
                else {
                    this.$.$mol_log3_fail({
                        place: this,
                        message: 'Wrong data',
                        data: event.data
                    });
                }
            };
            let interval;
            socket.onclose = () => {
                clearInterval(interval);
                setTimeout(() => this.reconnects(null), 1000);
            };
            port.destructor = () => {
                socket.onclose = () => { };
                clearInterval(interval);
                socket.close();
            };
            return new Promise((done, fail) => {
                socket.onopen = () => {
                    this.$.$mol_log3_come({
                        place: this,
                        message: 'Connected',
                        port: $mol_key(port),
                        server: link,
                    });
                    interval = setInterval(() => socket.send(new Uint8Array), 30000);
                    done(port);
                };
                socket.onerror = () => {
                    socket.onclose = event => {
                        if (this.$.$giper_baza_log())
                            this.$.$mol_log3_warn({
                                place: this,
                                message: 'Master unavailable',
                                hint: 'Relax and wait for reconnect',
                                link,
                                code: event.code,
                            });
                        clearInterval(interval);
                        interval = setTimeout(() => {
                            // fail( new Error( `Master unavailable`, { cause: { link, code: event.code } } ) )
                            this.master_next();
                            this.reconnects(null);
                        }, 1000);
                    };
                };
            });
        }
        slaves = new $mol_wire_set();
        sync() {
            this.sync_news();
            this.sync_port();
        }
        sync_news() {
            const glob = this.$.$giper_baza_glob;
            const lands = [...this.lands_news].map(link => glob.Land(new $giper_baza_link(link)));
            try {
                for (const port of this.masters()) {
                    for (const land of lands) {
                        this.sync_port_land([port, land.link()]);
                    }
                }
                for (const land of lands)
                    land.units_saving();
                this.lands_news.clear();
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        sync_port() {
            for (const port of this.ports())
                this.sync_port_lands(port);
        }
        sync_port_lands(port) {
            const masters = this.masters();
            for (const land of this.port_lands_active(port)) {
                const land_link = new $giper_baza_link(land);
                this.sync_port_land([port, land_link]);
                for (const master of masters)
                    this.sync_port_land([master, land_link]);
            }
        }
        ports() {
            return [...this.masters(), ...this.slaves];
        }
        masters() {
            try {
                return [this.master()].filter($mol_guard_defined);
            }
            catch (error) {
                $mol_fail_log(error);
                return [];
            }
        }
        port_lands_active(port) {
            return new $mol_wire_set();
        }
        port_lands_passive(port) {
            let passives = Passives.get(port);
            if (!passives)
                Passives.set(port, passives = new Set);
            return passives;
        }
        lands_alive() {
            const ports = this.ports();
            const actives = ports.flatMap(port => [...this.port_lands_active(port)]);
            const passives = ports.flatMap(port => [...this.port_lands_passive(port)]);
            const lands = new Set([...actives, ...passives]);
            const glob = this.$.$giper_baza_glob;
            return [...lands].map(id => glob.Land(new $giper_baza_link(id)));
        }
        port_income(port, msg) {
            const pack = $mol_wire_sync($giper_baza_pack).from(msg);
            const parts = $mol_wire_sync(pack).parts();
            for (const [land, part] of parts) {
                const Land = this.$.$giper_baza_glob.Land(new $giper_baza_link(land));
                forget: {
                    if (part.units.length)
                        break forget;
                    if (part.faces.size)
                        break forget;
                    if (!this.port_lands_active(port).has(land))
                        break forget;
                    this.port_lands_active(port).delete(land);
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_done({
                            place: this,
                            message: 'Take Free',
                            port: $mol_key(port),
                            land: Land,
                        });
                    continue;
                }
                this.face_port_sync(port, [[land, part]]);
                if (part.units.length) {
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_rise({
                            place: this,
                            message: 'Take Unit',
                            port: $mol_key(port),
                            land: Land,
                            units: part.units,
                        });
                    Land.diff_apply(part.units);
                }
                else {
                    if (this.$.$giper_baza_log())
                        $mol_wire_sync(this.$).$mol_log3_rise({
                            place: this,
                            message: 'Take Face',
                            port: $mol_key(port),
                            land: Land,
                            faces: part.faces,
                        });
                }
            }
        }
        face_port_sync(port, income) {
            const actives = this.port_lands_active(port);
            const passives = this.port_lands_passive(port);
            for (const [land, part] of income) {
                const land_link = new $giper_baza_link(land);
                if (!passives.has(land))
                    actives.add(land);
                const faces = part.faces;
                let port_faces = this.face_port_land([port, land_link]);
                if (!port_faces)
                    this.face_port_land([port, land_link], port_faces = new $giper_baza_face_map);
                port_faces.sync(faces);
                // for( let unit of part.units ) {
                // 	if( unit instanceof $giper_baza_auth_pass ) continue
                // 	port_faces.peer_time( unit.lord().peer().str, unit.time(), unit.tick() )
                // }
            }
        }
        sync_land(land) {
            for (const port of this.masters()) {
                this.port_lands_passive(port).add(land.str);
                this.sync_port_land([port, land]);
            }
            this.sync();
        }
        forget_land(land) {
            const faces = new $giper_baza_face_map;
            faces.stat = land.faces.stat.clone();
            const pack = $giper_baza_pack.make([[
                    land.link().str,
                    new $giper_baza_pack_part([], faces)
                ]]).asArray();
            for (const port of this.ports()) {
                if (!this.port_lands_passive(port).has(land.link().str))
                    continue;
                this.port_lands_passive(port).delete(land.link().str);
                if (this.$.$giper_baza_log())
                    this.$.$mol_log3_done({
                        place: this,
                        message: 'Send Free',
                        port: $mol_key(port),
                        land,
                    });
                port.send_bin(pack);
            }
        }
        sync_port_land([port, land]) {
            try {
                this.init_port_land([port, land]);
                const faces = this.face_port_land([port, land]);
                if (!faces)
                    return;
                const Land = this.$.$giper_baza_glob.Land(land);
                Land.units_saving();
                const part = Land.diff_part(faces);
                if (!part.units.length)
                    return;
                if (this.$.$giper_baza_log())
                    this.$.$mol_log3_rise({
                        place: this,
                        message: 'Send Unit',
                        port: $mol_key(port),
                        land: Land,
                        part,
                    });
                const pack = $giper_baza_pack.make([[Land.link().str, part]]);
                port.send_bin(pack.asArray());
                faces.sync(part.faces);
            }
            catch (error) {
                $mol_fail_log(error);
            }
        }
        init_port_land([port, land]) {
            // $mol_wire_solid() 
            const Land = this.$.$giper_baza_glob.Land(land);
            Land.loading();
            if (this.$.$giper_baza_log())
                this.$.$mol_log3_come({
                    place: this,
                    message: 'Send Face',
                    port: $mol_key(port),
                    land: Land,
                    faces: Land.faces,
                });
            port.send_bin(Land.face_pack().asArray());
        }
        face_port_land([port, land], next = null) {
            $mol_wire_solid();
            return next;
        }
        ;
        [Symbol.for('nodejs.util.inspect.custom')]() {
            return $mol_term_color.blue(`$giper_baza_yard`);
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "glob", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master_cursor", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master_current", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "master_next", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "reconnects", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "master", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync_news", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "sync_port", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_port_lands", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "ports", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "masters", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "port_lands_active", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard.prototype, "lands_alive", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "port_income", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "face_port_sync", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_land", null);
    __decorate([
        $mol_action
    ], $giper_baza_yard.prototype, "forget_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "sync_port_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "init_port_land", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_yard.prototype, "face_port_land", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard, "masters_seeded", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard, "masters_override", null);
    __decorate([
        $mol_mem
    ], $giper_baza_yard, "masters", null);
    $.$giper_baza_yard = $giper_baza_yard;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_dom.document)
        $giper_baza_yard.masters_default.push($mol_dom.document.location.origin + '/');
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $giper_baza_yard_mock extends $.$giper_baza_yard {
            master() {
                return null;
            }
        }
        $.$giper_baza_yard = $giper_baza_yard_mock;
    });
    $giper_baza_yard.masters_override = () => ['http://localhost:9090/'];
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'id auto generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                static $ = $;
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = $mol_view_test_block.Root(0);
            $mol_assert_equal(x.dom_node().id, '$mol_view_test_block.Root(0)');
            $mol_assert_equal(x.element(0).dom_node().id, '$mol_view_test_block.Root(0).element(0)');
        },
        'caching ref to dom node'($) {
            var x = new class extends $mol_view {
            };
            x.$ = $;
            $mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'($) {
            class $mol_view_test extends $mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'($) {
            class $mol_view_test_item extends $mol_view {
            }
            class $mol_view_test_block extends $mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            x.$ = $;
            $mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'($) {
            class $mol_view_test extends $mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.getAttribute('href'), '#haha');
            $mol_assert_equal(node.getAttribute('required'), 'true');
            $mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'($) {
            class $mol_view_test extends $mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_tree();
            $mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'($) {
            var clicked = false;
            class $mol_view_test extends $mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            x.$ = $;
            var node = x.dom_node();
            node.click();
            $mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_style_sheet_test1 extends $mol_view {
        Item() { return new $mol_view; }
    }
    $.$mol_style_sheet_test1 = $mol_style_sheet_test1;
    class $mol_style_sheet_test2 extends $mol_view {
        List() { return new $mol_style_sheet_test1; }
    }
    $.$mol_style_sheet_test2 = $mol_style_sheet_test2;
    $mol_test({
        'component block styles'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                display: 'block',
                zIndex: 1,
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tdisplay: block;\n\tz-index: 1;\n}\n');
        },
        'various units'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: '50%',
                height: '50px',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: 50%;\n\theight: 50px;\n}\n');
        },
        'various functions'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { calc } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                width: calc(`100% - 1px`),
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\twidth: calc(100% - 1px);\n}\n');
        },
        'property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                flex: {
                    grow: 5,
                    shrink: 10,
                }
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tflex-grow: 5;\n\tflex-shrink: 10;\n}\n');
        },
        'custom properties'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--isVariable': 'yes',
                '--is_variable': 'no',
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--is-variable: yes;\n\t--is_variable: no;\n}\n');
        },
        'custom property groups'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '--variable': {
                    test1: '5px',
                    test2: '10px',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\t--variable-test1: 5px;\n\t--variable-test2: 10px;\n}\n');
        },
        'property shorthand'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                padding: ['5px', 'auto'],
                margin: ['10px', 'auto'],
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tpadding: 5px auto;\n\tmargin: 10px auto;\n}\n');
        },
        'sequenced values'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const { url } = $mol_style_func;
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                background: {
                    image: [[url('foo')], [url('bar')]],
                    size: [['cover'], ['contain']],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbackground-image: url("foo"),url("bar");\n\tbackground-size: cover,contain;\n}\n');
        },
        'sequenced structs'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                box: {
                    shadow: [
                        {
                            inset: true,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'red',
                        },
                        {
                            inset: false,
                            x: 0,
                            y: 0,
                            blur: '0.5rem',
                            spread: 0,
                            color: 'blue',
                        },
                    ],
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tbox-shadow: inset 0 0 0.5rem 0 red,0 0 0.5rem 0 blue;\n}\n');
        },
        'component block styles with pseudo class'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                ':focus': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:focus {\n\tdisplay: block;\n}\n');
        },
        'component block styles with pseudo element'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '::first-line': {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]::first-line {\n\tdisplay: block;\n}\n');
        },
        'component block styles with media query'() {
            class $mol_style_sheet_test extends $mol_view {
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@media': {
                    'print': {
                        display: 'block',
                    },
                    '(max-width: 640px)': {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n@media print {\n[mol_style_sheet_test] {\n\tdisplay: block;\n}\n}\n@media (max-width: 640px) {\n[mol_style_sheet_test] {\n\tdisplay: inline;\n}\n}\n');
        },
        'component block styles with attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            display: 'block',
                        },
                    },
                    disabled: {
                        'true': {
                            width: '100%',
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n');
        },
        'component block styles with attribute value (short syntax)'() {
            class $mol_style_sheet_test extends $mol_view {
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark'
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                '[mol_theme]': {
                    '$mol_theme_dark': {
                        display: 'block',
                    },
                },
                '[disabled]': {
                    'true': {
                        width: '100%',
                    },
                    'false': {
                        width: '50%',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test]:where([disabled="true"]) {\n\twidth: 100%;\n}\n[mol_style_sheet_test]:where([disabled="false"]) {\n\twidth: 50%;\n}\n');
        },
        'component element styles'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                color: 'red',
                Item: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test] {\n\tcolor: red;\n}\n[mol_style_sheet_test_item] {\n\tdisplay: block;\n}\n');
        },
        'component element of element styles'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                width: '100%',
                List: {
                    color: 'red',
                    Item: {
                        display: 'block',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\twidth: 100%;\n}\n[mol_style_sheet_test2_list] {\n\tcolor: red;\n}\n[mol_style_sheet_test2_list_item] {\n\tdisplay: block;\n}\n');
        },
        'component element styles with block attribute value'() {
            class $mol_style_sheet_test extends $mol_view {
                Item() { return new $mol_view; }
                attr() {
                    return {
                        mol_theme: '$mol_theme_dark',
                        disabled: true,
                    };
                }
            }
            const sheet = $mol_style_sheet($mol_style_sheet_test, {
                '@': {
                    mol_theme: {
                        '$mol_theme_dark': {
                            Item: {
                                color: 'red',
                            },
                        },
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test]:where([mol_theme="$mol_theme_dark"]) :where([mol_style_sheet_test_item]) {\n\tcolor: red;\n}\n');
        },
        'inner component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                $mol_style_sheet_test1: {
                    display: 'block',
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n');
        },
        'child component styles by class'() {
            const sheet = $mol_style_sheet($mol_style_sheet_test2, {
                color: 'red',
                '>': {
                    $mol_style_sheet_test1: {
                        display: 'block',
                    },
                    $mol_style_sheet_test2: {
                        display: 'inline',
                    },
                },
            });
            $mol_assert_equal(sheet, '[mol_style_sheet_test2] {\n\tcolor: red;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test1]) {\n\tdisplay: block;\n}\n[mol_style_sheet_test2] > :where([mol_style_sheet_test2]) {\n\tdisplay: inline;\n}\n');
        },
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            'handle clicks by default'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_ok(clicked);
            },
            'no handle clicks if disabled'($) {
                let clicked = false;
                const clicker = $mol_button.make({
                    $,
                    click: (event) => { clicked = true; },
                    enabled: () => false,
                });
                const element = clicker.dom_tree();
                const event = $mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $mol_assert_not(clicked);
            },
            async 'Store error'($) {
                const clicker = $mol_button.make({
                    $,
                    click: (event) => $.$mol_fail(new Error('Test error')),
                });
                const event = $mol_dom_context.document.createEvent('mouseevent');
                $mol_assert_fail(() => clicker.event_activate(event), 'Test error');
                await Promise.resolve();
                $mol_assert_equal(clicker.status()[0].message, 'Test error');
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test_mocks.push($ => {
        class $mol_locale_mock extends $mol_locale {
            lang(next = 'en') { return next; }
            static source(lang) {
                return {};
            }
        }
        __decorate([
            $mol_mem
        ], $mol_locale_mock.prototype, "lang", null);
        __decorate([
            $mol_mem_key
        ], $mol_locale_mock, "source", null);
        $.$mol_locale = $mol_locale_mock;
    });
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'escape'() {
            const specials = $mol_regexp.from('.*+?^${}()|[]\\');
            $mol_assert_equal(specials.source, '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
        },
        'char code'() {
            const space = $mol_regexp.from(32);
            $mol_assert_like(' '.match(space), [' ']);
        },
        'repeat fixed'() {
            const { repeat, decimal_only: digit } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            $mol_assert_like('#2020#'.match(year), ['2020']);
        },
        'greedy repeat'() {
            const { repeat, repeat_greedy, latin_only: letter } = $mol_regexp;
            $mol_assert_like('abc'.match(repeat(letter, 1, 2)), ['a', 'b', 'c']);
            $mol_assert_like('abc'.match(repeat_greedy(letter, 1, 2)), ['ab', 'c']);
        },
        'repeat range'() {
            const { repeat_greedy, decimal_only: digit } = $mol_regexp;
            const year = repeat_greedy(digit, 2, 4);
            $mol_assert_like('#2#'.match(year), null);
            $mol_assert_like('#20#'.match(year), ['20']);
            $mol_assert_like('#2020#'.match(year), ['2020']);
            $mol_assert_like('#20201#'.match(year), ['2020']);
        },
        'repeat from'() {
            const { repeat_greedy, latin_only: letter } = $mol_regexp;
            const name = repeat_greedy(letter, 2);
            $mol_assert_like('##'.match(name), null);
            $mol_assert_like('#a#'.match(name), null);
            $mol_assert_like('#ab#'.match(name), ['ab']);
            $mol_assert_like('#abc#'.match(name), ['abc']);
        },
        'from string'() {
            const regexp = $mol_regexp.from('[\\d]');
            $mol_assert_equal(regexp.source, '\\[\\\\d\\]');
            $mol_assert_equal(regexp.flags, 'gsu');
        },
        'from regexp'() {
            const regexp = $mol_regexp.from(/[\d]/i);
            $mol_assert_equal(regexp.source, '[\\d]');
            $mol_assert_equal(regexp.flags, 'i');
        },
        'split'() {
            const regexp = $mol_regexp.from(';');
            $mol_assert_like('aaa;bbb;ccc'.split(regexp), ['aaa', ';', 'bbb', ';', 'ccc']);
            $mol_assert_like('aaa;;ccc'.split(regexp), ['aaa', ';', '', ';', 'ccc']);
            $mol_assert_like('aaa'.split(regexp), ['aaa']);
            $mol_assert_like(''.split(regexp), ['']);
        },
        'test for matching'() {
            const regexp = $mol_regexp.from('foo');
            $mol_assert_like(regexp.test(''), false);
            $mol_assert_like(regexp.test('fo'), false);
            $mol_assert_like(regexp.test('foo'), true);
            $mol_assert_like(regexp.test('foobar'), true);
            $mol_assert_like(regexp.test('barfoo'), true);
        },
        'case ignoring'() {
            const xxx = $mol_regexp.from('x', { ignoreCase: true });
            $mol_assert_like(xxx.flags, 'gisu');
            $mol_assert_like(xxx.exec('xx')[0], 'x');
            $mol_assert_like(xxx.exec('XX')[0], 'X');
        },
        'multiline mode'() {
            const { end, from } = $mol_regexp;
            const xxx = from(['x', end], { multiline: true });
            $mol_assert_like(xxx.exec('x\ny')[0], 'x');
            $mol_assert_like(xxx.flags, 'gmsu');
        },
        'flags override'() {
            const triplet = $mol_regexp.from($mol_regexp.from(/.../, { ignoreCase: true }), { multiline: true });
            $mol_assert_like(triplet.toString(), '/.../gmsu');
        },
        'sequence'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const date = from([begin, year, dash, month, dash, day, end]);
            $mol_assert_like(date.exec('2020-01-02')[0], '2020-01-02');
        },
        'optional'() {
            const name = $mol_regexp.from(['A', ['4']]);
            $mol_assert_equal('AB'.match(name)[0], 'A');
            $mol_assert_equal('A4'.match(name)[0], 'A4');
        },
        'anon variants'() {
            const name = $mol_regexp.from(['A', $mol_regexp.vary(['4', '5'])]);
            $mol_assert_equal('AB'.match(name), null);
            $mol_assert_equal('A4'.match(name)[0], 'A4');
            $mol_assert_equal('A5'.match(name)[0], 'A5');
        },
        'only groups'() {
            const regexp = $mol_regexp.from({ dog: '@' });
            $mol_assert_like([...'#'.matchAll(regexp)][0].groups, undefined);
            $mol_assert_like([...'@'.matchAll(regexp)][0].groups, { dog: '@' });
        },
        'catch skipped'() {
            const regexp = $mol_regexp.from(/(@)(\d?)/g);
            $mol_assert_like([...'[[@]]'.matchAll(regexp)].map(f => [...f]), [
                ['[['],
                ['@', '@', ''],
                [']]'],
            ]);
        },
        'enum variants'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from(Sex);
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'trans'.matchAll(sexism)][0].groups, undefined);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { male: '', female: 'female' });
        },
        'recursive only groups'() {
            let Sex;
            (function (Sex) {
                Sex["male"] = "male";
                Sex["female"] = "female";
            })(Sex || (Sex = {}));
            const sexism = $mol_regexp.from({ Sex });
            $mol_assert_like([...''.matchAll(sexism)].length, 0);
            $mol_assert_like([...'male'.matchAll(sexism)][0].groups, { Sex: 'male', male: 'male', female: '' });
            $mol_assert_like([...'female'.matchAll(sexism)][0].groups, { Sex: 'female', male: '', female: 'female' });
        },
        'sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([begin, { year }, dash, { month }, dash, { day }, end]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'sequence with groups of mixed type'() {
            const prefix = '/';
            const postfix = '/';
            const regexp = $mol_regexp.from([{ prefix }, /(\w+)/, { postfix }, /([gumi]*)/]);
            $mol_assert_like([...'/foo/mi'.matchAll(regexp)], [
                Object.assign(["/foo/mi", "/", "foo", "/", "mi"], {
                    groups: {
                        prefix: '/',
                        postfix: '/',
                    },
                    index: 0,
                    input: "/",
                }),
            ]);
        },
        'recursive sequence with groups'() {
            const { begin, end, decimal_only: digit, repeat, from } = $mol_regexp;
            const year = repeat(digit, 4, 4);
            const dash = '-';
            const month = repeat(digit, 2, 2);
            const day = repeat(digit, 2, 2);
            const regexp = from([
                begin, { date: [{ year }, dash, { month }] }, dash, { day }, end
            ]);
            const found = [...'2020-01-02'.matchAll(regexp)];
            $mol_assert_like(found[0].groups, {
                date: '2020-01',
                year: '2020',
                month: '01',
                day: '02',
            });
        },
        'parse multiple'() {
            const { decimal_only: digit, from } = $mol_regexp;
            const regexp = from({ digit });
            $mol_assert_like([...'123'.matchAll(regexp)].map(f => f.groups), [
                { digit: '1' },
                { digit: '2' },
                { digit: '3' },
            ]);
        },
        'named variants'() {
            const { begin, or, end, from } = $mol_regexp;
            const sexism = from([
                begin, 'sex = ', { sex: ['male', or, 'female'] }, end
            ]);
            $mol_assert_like([...'sex = male'.matchAll(sexism)][0].groups, { sex: 'male' });
            $mol_assert_like([...'sex = female'.matchAll(sexism)][0].groups, { sex: 'female' });
            $mol_assert_like([...'sex = malefemale'.matchAll(sexism)][0].groups, undefined);
        },
        'force after'() {
            const { latin_only: letter, force_after, from } = $mol_regexp;
            const regexp = from([letter, force_after('.')]);
            $mol_assert_like('x.'.match(regexp), ['x']);
            $mol_assert_like('x,'.match(regexp), null);
        },
        'forbid after'() {
            const { latin_only: letter, forbid_after, from } = $mol_regexp;
            const regexp = from([letter, forbid_after('.')]);
            $mol_assert_like('x.'.match(regexp), null);
            $mol_assert_like('x,'.match(regexp), ['x']);
        },
        'char except'() {
            const { char_except, latin_only, tab } = $mol_regexp;
            const name = char_except(latin_only, tab);
            $mol_assert_like('a'.match(name), null);
            $mol_assert_like('\t'.match(name), null);
            $mol_assert_like('('.match(name), ['(']);
        },
        'unicode only'() {
            const { unicode_only, from } = $mol_regexp;
            const name = from([
                unicode_only('Script', 'Cyrillic'),
                unicode_only('Hex_Digit'),
            ]);
            $mol_assert_like('FF'.match(name), null);
            $mol_assert_like('ФG'.match(name), null);
            $mol_assert_like('ФF'.match(name), ['ФF']);
        },
        'generate by optional with inner group'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { dog: '@' }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: false }), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'generate by optional with inner group with variants'() {
            const { begin, end, from } = $mol_regexp;
            const animals = from([begin, '#', ['^', { animal: { dog: '@', fox: '&' } }], end]);
            $mol_assert_equal(animals.generate({}), '#');
            $mol_assert_equal(animals.generate({ dog: true }), '#^@');
            $mol_assert_equal(animals.generate({ fox: true }), '#^&');
            $mol_assert_fail(() => animals.generate({ dog: '$' }), 'Wrong param: dog=$');
        },
        'complex example'() {
            const { begin, end, char_only, char_range, latin_only, slash_back, repeat_greedy, from, } = $mol_regexp;
            const atom_char = char_only(latin_only, "!#$%&'*+/=?^`{|}~-");
            const atom = repeat_greedy(atom_char, 1);
            const dot_atom = from([atom, repeat_greedy(['.', atom])]);
            const name_letter = char_only(char_range(0x01, 0x08), 0x0b, 0x0c, char_range(0x0e, 0x1f), 0x21, char_range(0x23, 0x5b), char_range(0x5d, 0x7f));
            const quoted_pair = from([
                slash_back,
                char_only(char_range(0x01, 0x09), 0x0b, 0x0c, char_range(0x0e, 0x7f))
            ]);
            const name = repeat_greedy({ name_letter, quoted_pair });
            const quoted_name = from(['"', { name }, '"']);
            const local_part = from({ dot_atom, quoted_name });
            const domain = dot_atom;
            const mail = from([begin, local_part, '@', { domain }, end]);
            $mol_assert_equal('foo..bar@example.org'.match(mail), null);
            $mol_assert_equal('foo..bar"@example.org'.match(mail), null);
            $mol_assert_like([...'foo.bar@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "foo.bar",
                quoted_name: "",
                name: "",
                name_letter: "",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_like([...'"foo..bar"@example.org'.matchAll(mail)][0].groups, {
                dot_atom: "",
                quoted_name: '"foo..bar"',
                name: "foo..bar",
                name_letter: "r",
                quoted_pair: "",
                domain: "example.org",
            });
            $mol_assert_equal(mail.generate({ dot_atom: 'foo.bar', domain: 'example.org' }), 'foo.bar@example.org');
            $mol_assert_equal(mail.generate({ name: 'foo..bar', domain: 'example.org' }), '"foo..bar"@example.org');
            $mol_assert_fail(() => mail.generate({ dot_atom: 'foo..bar', domain: 'example.org' }), 'Wrong param: dot_atom=foo..bar');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_test({
            'Empty needle'() {
                const app = new $mol_dimmer;
                app.needle = () => '  ';
                app.haystack = () => 'foo  bar';
                $mol_assert_like(app.strings(), ['foo  bar']);
            },
            'Empty haystack'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo  bar';
                app.haystack = () => '';
                $mol_assert_like(app.strings(), ['']);
            },
            'Not found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' bar ';
                $mol_assert_like(app.strings(), [' bar ']);
            },
            'One found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' bar', 'foo', ' ']);
            },
            'Multiple found'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo';
                app.haystack = () => ' foobarfoo foo';
                $mol_assert_like(app.strings(), [' ', 'foo', 'bar', 'foo', ' ', 'foo']);
            },
            'Fuzzy search'() {
                const app = new $mol_dimmer;
                app.needle = () => 'foo bar';
                app.haystack = () => ' barfoo ';
                $mol_assert_like(app.strings(), [' ', 'bar', '', 'foo', ' ']);
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    $mol_test({
        'safe tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("div", null, "foo")])[0]), $mol_dom_serialize($mol_jsx("div", null, "foo")));
        },
        'bad tag'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("script", null, "alert('ahtung!')")])[0]), $mol_dom_serialize($mol_jsx($mol_jsx_frag, null, "alert('ahtung!')")));
        },
        'common attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { id: "foo" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { id: "foo" }, "foo")));
        },
        'safe attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "https://example.org/" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "https://example.org/" }, "foo")));
        },
        'bad attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { onclick: "alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", null, "foo")));
        },
        'danger attr'() {
            $mol_assert_equal($mol_dom_serialize($$.$mol_dom_safe([$mol_jsx("a", { href: "javascript:alert('ahtung!')" }, "foo")])[0]), $mol_dom_serialize($mol_jsx("a", { href: "about:blank#javascript:alert('ahtung!')" }, "foo")));
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'convertion to primitives'() {
            var unit = new $mol_unit_money_usd(5);
            $mol_assert_equal(unit.valueOf(), 5);
            $mol_assert_equal(unit * 2, 10);
            $mol_assert_equal(unit + '', '$5');
            $mol_assert_equal(`${unit}`, '$5');
            $mol_assert_equal(unit.toString(), '$5');
            $mol_assert_equal(String(unit), '$5');
        },
        'arithmetic'() {
            var usd1 = new $mol_unit_money_usd(2);
            var usd2 = new $mol_unit_money_usd(3);
            var rur = new $mol_unit_money_rub(2);
            $mol_assert_equal($mol_unit.summ(usd1, usd2).toString(), '$5');
            $mol_assert_equal(usd1.mult(2).toString(), '$4');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'null by default'() {
            const key = String(Math.random());
            $mol_assert_equal($mol_state_session.value(key), null);
        },
        'storing'() {
            const key = String(Math.random());
            $mol_state_session.value(key, '$mol_state_session_test');
            $mol_assert_equal($mol_state_session.value(key), '$mol_state_session_test');
            $mol_state_session.value(key, null);
            $mol_assert_equal($mol_state_session.value(key), null);
        },
    });
})($ || ($ = {}));

;
	($.$mol_book2_catalog) = class $mol_book2_catalog extends ($.$mol_book2) {
		Menu_title(){
			return (this.Menu().Title());
		}
		menu_title(){
			return "";
		}
		Menu_tools(){
			return (this.Menu().Tools());
		}
		Menu_logo(){
			return null;
		}
		menu_head(){
			return [(this.Menu_title()), (this.Menu_tools())];
		}
		menu_filter(next){
			if(next !== undefined) return next;
			return "";
		}
		Menu_filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.menu_filter(next)));
			return obj;
		}
		Menu_links_empty(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		arg(id){
			return {};
		}
		menu_link_arg(id){
			return (this.arg(id));
		}
		spread_title(id){
			return "";
		}
		Menu_link_title(id){
			const obj = new this.$.$mol_dimmer();
			(obj.needle) = () => ((this.menu_filter()));
			(obj.haystack) = () => ((this.spread_title(id)));
			return obj;
		}
		menu_link_content(id){
			return [(this.Menu_link_title(id))];
		}
		Menu_link(id){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.menu_link_arg(id)));
			(obj.sub) = () => ((this.menu_link_content(id)));
			return obj;
		}
		menu_item_content(id){
			return [(this.Menu_link(id))];
		}
		Menu_item(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.menu_item_content(id)));
			return obj;
		}
		menu_links(){
			return [(this.Menu_item("0"))];
		}
		Menu_links(){
			const obj = new this.$.$mol_list();
			(obj.Empty) = () => ((this.Menu_links_empty()));
			(obj.rows) = () => ((this.menu_links()));
			return obj;
		}
		menu_body(){
			return [(this.Menu_filter()), (this.Menu_links())];
		}
		menu_foot(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ((this.menu_title()));
			(obj.Logo) = () => ((this.Menu_logo()));
			(obj.tools) = () => ([...(this.menu_tools()), ...(this.addon_tools())]);
			(obj.head) = () => ((this.menu_head()));
			(obj.body) = () => ((this.menu_body()));
			(obj.foot) = () => ((this.menu_foot()));
			return obj;
		}
		spread_close_arg(){
			return {};
		}
		Spread_close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		param(){
			return "";
		}
		spread(next){
			if(next !== undefined) return next;
			return "";
		}
		spreads(){
			return {};
		}
		Spread(id){
			const obj = new this.$.$mol_view();
			return obj;
		}
		Spread_default(){
			return null;
		}
		spread_ids(){
			return [];
		}
		menu_filter_enabled(){
			return false;
		}
		spread_ids_filtered(){
			return [];
		}
		spread_current(){
			return null;
		}
		menu_tools(){
			return [];
		}
		addon_tools(){
			return [];
		}
		pages(){
			return [(this.Menu())];
		}
		Spread_close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ((this.spread_close_arg()));
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_book2_catalog_Spread_close_hint")));
			(obj.sub) = () => ([(this.Spread_close_icon())]);
			return obj;
		}
	};
	($mol_mem(($.$mol_book2_catalog.prototype), "menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_filter"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links_empty"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link_title"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_link"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Menu_item"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu_links"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Menu"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close_icon"));
	($mol_mem(($.$mol_book2_catalog.prototype), "spread"));
	($mol_mem_key(($.$mol_book2_catalog.prototype), "Spread"));
	($mol_mem(($.$mol_book2_catalog.prototype), "Spread_close"));


;
"use strict";
var $;
(function ($) {
    function $mol_match_text(query, values) {
        const tags = query.toLowerCase().trim().split(/\s+/).filter(tag => tag);
        if (tags.length === 0)
            return () => true;
        return (variant) => {
            const vals = values(variant);
            return tags.every(tag => vals.some(val => val.toLowerCase().indexOf(tag) >= 0));
        };
    }
    $.$mol_match_text = $mol_match_text;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Variant of [mol_book2](../book2.view.ts) which draws menu in side bar on opens one of taken spreads.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_book2_catalog_demo
         */
        class $mol_book2_catalog extends $.$mol_book2_catalog {
            spread_current() {
                return this.spread() === '' ? this.Spread_default() : this.Spread(this.spread());
            }
            pages() {
                const spread = this.spread_current();
                return [
                    this.Menu(),
                    ...spread
                        ? spread instanceof $mol_book2
                            ? spread.pages_deep()
                            : [spread]
                        : [],
                ];
            }
            auto() {
                const spread = this.spread_current();
                if (spread instanceof $mol_book2)
                    spread.auto();
                return [];
            }
            spread_ids() {
                return Object.keys(this.spreads());
            }
            menu_body() {
                return [
                    ...this.menu_filter_enabled() ? [this.Menu_filter()] : [],
                    this.Menu_links(),
                ];
            }
            menu_filter_enabled() {
                return this.spread_ids().length >= 10;
            }
            menu_links() {
                return this.spread_ids_filtered()
                    .map(spread => this.Menu_item(spread));
            }
            spread_ids_filtered() {
                return this.spread_ids()
                    .filter($mol_match_text(this.menu_filter(), spread => [this.spread_title(spread)]));
            }
            Spread(id) {
                return this.spreads()[id];
            }
            Spread_default() {
                return this.spreads()[''];
            }
            spread(next) {
                return this.$.$mol_state_arg.value(this.param(), next) ?? '';
            }
            arg(spread) {
                return { [this.param()]: spread || null };
            }
            spread_close_arg() {
                return { [this.param()]: null };
            }
            spread_title(spread) {
                const page = this.Spread(spread);
                return page instanceof $mol_book2
                    && page.menu_title()
                    || page.title()
                    || spread;
            }
            spread_current_book() {
                const spread = this.spread_current();
                return spread instanceof $mol_book2 ? spread : null;
            }
            placeholders() {
                const spread_placeholders = this.spread_current_book()?.placeholders() ?? [];
                return spread_placeholders.length ? spread_placeholders : super.placeholders();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "pages", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_body", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "menu_links", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread_ids_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "spread", null);
        __decorate([
            $mol_mem
        ], $mol_book2_catalog.prototype, "placeholders", null);
        $$.$mol_book2_catalog = $mol_book2_catalog;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_book2_catalog, {
            Menu_filter: {
                flex: {
                    shrink: 0,
                    grow: 0,
                },
                alignSelf: 'stretch',
            },
            Menu_item: {
                align: {
                    items: 'flex-start',
                },
            },
            Menu_link: {
                flex: {
                    grow: 1,
                    shrink: 1,
                    wrap: 'wrap',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_script) = class $mol_icon_script extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2H8C6.3,2 5,3.3 5,5V16H16V17C16,17.6 16.4,18 17,18H18V5C18,4.4 18.4,4 19,4C19.6,4 20,4.4 20,5V6H22V5C22,3.3 20.7,2 19,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_script_text) = class $mol_icon_script_text extends ($.$mol_icon) {
		path(){
			return "M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2C20.7,2 22,3.3 22,5V6H20V5C20,4.4 19.6,4 19,4C18.4,4 18,4.4 18,5V18H17C16.4,18 16,17.6 16,17V16H5V5C5,3.3 6.3,2 8,2H19M8,6V8H15V6H8M8,10V12H14V10H8Z";
		}
	};


;
"use strict";


;
	($.$mol_link_source) = class $mol_link_source extends ($.$mol_link) {
		Icon(){
			const obj = new this.$.$mol_icon_script_text();
			return obj;
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_link_source_hint"));
		}
		sub(){
			return [(this.Icon())];
		}
	};
	($mol_mem(($.$mol_link_source.prototype), "Icon"));


;
"use strict";


;
	($.$mol_pick) = class $mol_pick extends ($.$mol_pop) {
		keydown(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_enabled(){
			return true;
		}
		clicks(next){
			if(next !== undefined) return next;
			return null;
		}
		trigger_content(){
			return [(this.title())];
		}
		hint(){
			return "";
		}
		Trigger(){
			const obj = new this.$.$mol_check();
			(obj.minimal_width) = () => (40);
			(obj.minimal_height) = () => (40);
			(obj.enabled) = () => ((this.trigger_enabled()));
			(obj.checked) = (next) => ((this.showed(next)));
			(obj.clicks) = (next) => ((this.clicks(next)));
			(obj.sub) = () => ((this.trigger_content()));
			(obj.hint) = () => ((this.hint()));
			return obj;
		}
		event(){
			return {...(super.event()), "keydown": (next) => (this.keydown(next))};
		}
		Anchor(){
			return (this.Trigger());
		}
	};
	($mol_mem(($.$mol_pick.prototype), "keydown"));
	($mol_mem(($.$mol_pick.prototype), "clicks"));
	($mol_mem(($.$mol_pick.prototype), "Trigger"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Pop-up display and hide by mouse click, also hide by unfocus.
         * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
         */
        class $mol_pick extends $.$mol_pick {
            keydown(event) {
                if (!this.trigger_enabled())
                    return;
                if (event.defaultPrevented)
                    return;
                if (event.keyCode === $mol_keyboard_code.escape) {
                    if (!this.showed())
                        return;
                    event.preventDefault();
                    this.showed(false);
                }
            }
        }
        $$.$mol_pick = $mol_pick;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/pick/pick.view.css", "[mol_pick_trigger] {\n\talign-items: center;\n\tflex-grow: 1;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_dots_vertical) = class $mol_icon_dots_vertical extends ($.$mol_icon) {
		path(){
			return "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
		}
	};


;
"use strict";


;
	($.$mol_select) = class $mol_select extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		event_select(id, next){
			if(next !== undefined) return next;
			return null;
		}
		option_hint(id){
			return null;
		}
		option_label(id){
			return "";
		}
		filter_pattern(next){
			if(next !== undefined) return next;
			return "";
		}
		Option_label(id){
			const obj = new this.$.$mol_dimmer();
			(obj.haystack) = () => ((this.option_label(id)));
			(obj.needle) = () => ((this.filter_pattern()));
			return obj;
		}
		option_content(id){
			return [(this.Option_label(id))];
		}
		no_options_message(){
			return (this.$.$mol_locale.text("$mol_select_no_options_message"));
		}
		nav_components(){
			return [];
		}
		option_focused(next){
			if(next !== undefined) return next;
			return null;
		}
		nav_cycle(next){
			if(next !== undefined) return next;
			return true;
		}
		Nav(){
			const obj = new this.$.$mol_nav();
			(obj.keys_y) = () => ((this.nav_components()));
			(obj.current_y) = (next) => ((this.option_focused(next)));
			(obj.cycle) = (next) => ((this.nav_cycle(next)));
			return obj;
		}
		menu_content(){
			return [];
		}
		Menu(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.menu_content()));
			return obj;
		}
		Bubble_pane(){
			const obj = new this.$.$mol_scroll();
			(obj.sub) = () => ([(this.Menu())]);
			return obj;
		}
		filter_hint(){
			return (this.$.$mol_locale.text("$mol_select_filter_hint"));
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		dictionary(next){
			if(next !== undefined) return next;
			return {};
		}
		options(){
			return [];
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		option_label_default(){
			return "";
		}
		Option_row(id){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.event_click) = (next) => ((this.event_select(id, next)));
			(obj.hint) = () => ((this.option_hint(id)));
			(obj.sub) = () => ((this.option_content(id)));
			return obj;
		}
		No_options(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.no_options_message())]);
			return obj;
		}
		plugins(){
			return [...(super.plugins()), (this.Nav())];
		}
		hint(){
			return (this.$.$mol_locale.text("$mol_select_hint"));
		}
		bubble_content(){
			return [(this.Filter()), (this.Bubble_pane())];
		}
		Filter(){
			const obj = new this.$.$mol_search();
			(obj.query) = (next) => ((this.filter_pattern(next)));
			(obj.hint) = () => ((this.filter_hint()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Trigger_icon(){
			const obj = new this.$.$mol_icon_dots_vertical();
			return obj;
		}
		trigger_enabled(){
			return (this.enabled());
		}
	};
	($mol_mem_key(($.$mol_select.prototype), "event_select"));
	($mol_mem(($.$mol_select.prototype), "filter_pattern"));
	($mol_mem_key(($.$mol_select.prototype), "Option_label"));
	($mol_mem(($.$mol_select.prototype), "option_focused"));
	($mol_mem(($.$mol_select.prototype), "nav_cycle"));
	($mol_mem(($.$mol_select.prototype), "Nav"));
	($mol_mem(($.$mol_select.prototype), "Menu"));
	($mol_mem(($.$mol_select.prototype), "Bubble_pane"));
	($mol_mem(($.$mol_select.prototype), "submit"));
	($mol_mem(($.$mol_select.prototype), "dictionary"));
	($mol_mem(($.$mol_select.prototype), "value"));
	($mol_mem_key(($.$mol_select.prototype), "Option_row"));
	($mol_mem(($.$mol_select.prototype), "No_options"));
	($mol_mem(($.$mol_select.prototype), "Filter"));
	($mol_mem(($.$mol_select.prototype), "Trigger_icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Allow user to select value from various options and displays current value.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_select_demo_colors
         */
        class $mol_select extends $.$mol_select {
            filter_pattern(next) {
                this.focused();
                return next || '';
            }
            open() {
                this.showed(true);
            }
            options() {
                return Object.keys(this.dictionary());
            }
            options_filtered() {
                let options = this.options();
                options = options.filter($mol_match_text(this.filter_pattern(), (id) => [this.option_label(id)]));
                const index = options.indexOf(this.value());
                if (index >= 0)
                    options = [...options.slice(0, index), ...options.slice(index + 1)];
                return options;
            }
            option_label(id) {
                const value = this.dictionary()[id];
                return (value == null ? id : value) || this.option_label_default();
            }
            option_hint(id) {
                return id;
            }
            option_rows() {
                return this.options_filtered().map((option) => this.Option_row(option));
            }
            option_focused(component) {
                if (component == null) {
                    for (let comp of this.nav_components()) {
                        if (comp && comp.focused())
                            return comp;
                    }
                    return null;
                }
                if (this.showed()) {
                    component.focused(true);
                }
                return component;
            }
            event_select(id, event) {
                this.value(id);
                this.showed(false);
                event?.preventDefault();
            }
            nav_components() {
                if (this.options().length > 1 && this.Filter()) {
                    return [this.Filter(), ...this.option_rows()];
                }
                else {
                    return this.option_rows();
                }
            }
            trigger_content() {
                return [
                    ...this.option_content(this.value()),
                    ...this.trigger_enabled() ? [this.Trigger_icon()] : [],
                ];
            }
            menu_content() {
                return [
                    ...this.option_rows(),
                    ...(this.options_filtered().length === 0) ? [this.No_options()] : []
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "options_filtered", null);
        __decorate([
            $mol_mem
        ], $mol_select.prototype, "option_focused", null);
        $$.$mol_select = $mol_select;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/select/select.view.css", "[mol_select] {\n\tdisplay: flex;\n\tword-break: normal;\n\talign-self: flex-start;\n}\n\n[mol_select_option_row] {\n\tmin-width: 100%;\n\tpadding: 0;\n\tjustify-content: flex-start;\n}\n\n[mol_select_filter] {\n\tflex: 1 0 auto;\n\talign-self: stretch;\n}\n\n[mol_select_option_label] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tmin-height: 1.5em;\n\tdisplay: block;\n\twhite-space: nowrap;\n}\n\n[mol_select_clear_option_content] {\n\tpadding: .5em 1rem .5rem 0;\n\ttext-align: start;\n\tbox-shadow: var(--mol_theme_line);\n\tflex: 1 0 auto;\n}\n\n[mol_select_no_options] {\n\tpadding: var(--mol_gap_text);\n\ttext-align: start;\n\tdisplay: block;\n\tcolor: var(--mol_theme_shade);\n}\n\n[mol_select_trigger] {\n\tpadding: 0;\n\tflex: 1 1 auto;\n\tdisplay: flex;\n}\n\n[mol_select_trigger] > * {\n\tmargin-inline-end: -1rem;\n}\n\n[mol_select_trigger] > *:last-child {\n\tmargin-inline-end: 0;\n}\n\n[mol_select_menu] {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n");
})($ || ($ = {}));

;
	($.$mol_avatar) = class $mol_avatar extends ($.$mol_icon) {
		view_box(){
			return "0 0 24 24";
		}
		id(){
			return "";
		}
		path(){
			return "M 12 12 l 0 0 M 0 0 l 0 0 M 24 24 l 0 0 M 0 24 l 0 0 M 24 0 l 0 0";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Avatar uniquely-generated by id string
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_avatar_demo
         */
        class $mol_avatar extends $.$mol_avatar {
            path() {
                const id = $mol_hash_string(this.id());
                const p = 2.1;
                const m = 2.7;
                let path = '';
                for (let x = 0; x < 4; ++x) {
                    for (let y = 0; y < 8; ++y) {
                        if ((id >> (x + y * 7)) & 1) {
                            const mxp = Math.ceil(m * x + p);
                            const myp = Math.ceil(m * y + p);
                            path += `M ${mxp} ${myp} l 0 0 ` + `M ${24 - mxp} ${myp} l 0 0 `;
                        }
                    }
                }
                return path;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_avatar.prototype, "path", null);
        $$.$mol_avatar = $mol_avatar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/avatar/avatar.view.css", "[mol_avatar] {\n\tstroke-linecap: round;\n\tstroke-width: 3.5px;\n\tfill: none;\n\tstroke: currentColor;\n\t/* width: 1.5rem;\n\theight: 1.5rem;\n\tmargin: 0 -.25rem; */\n\t/* box-shadow: 0 0 0 1px var(--mol_theme_line); */\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_sync) = class $mol_icon_sync extends ($.$mol_icon) {
		path(){
			return "M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_sync_off) = class $mol_icon_sync_off extends ($.$mol_icon) {
		path(){
			return "M20,4H14V10L16.24,7.76C17.32,8.85 18,10.34 18,12C18,13 17.75,13.94 17.32,14.77L18.78,16.23C19.55,15 20,13.56 20,12C20,9.79 19.09,7.8 17.64,6.36L20,4M2.86,5.41L5.22,7.77C4.45,9 4,10.44 4,12C4,14.21 4.91,16.2 6.36,17.64L4,20H10V14L7.76,16.24C6.68,15.15 6,13.66 6,12C6,11 6.25,10.06 6.68,9.23L14.76,17.31C14.5,17.44 14.26,17.56 14,17.65V19.74C14.79,19.53 15.54,19.2 16.22,18.78L18.58,21.14L19.85,19.87L4.14,4.14L2.86,5.41M10,6.35V4.26C9.2,4.47 8.45,4.8 7.77,5.22L9.23,6.68C9.5,6.56 9.73,6.44 10,6.35Z";
		}
	};


;
"use strict";


;
	($.$giper_baza_status) = class $giper_baza_status extends ($.$mol_select) {
		master_id(id){
			return "";
		}
		Option_logo(id){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this.master_id(id)));
			return obj;
		}
		master_link(){
			return "";
		}
		Well(){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this.master_link()));
			return obj;
		}
		Fail(){
			const obj = new this.$.$mol_icon_sync_off();
			return obj;
		}
		link_content(){
			return [(this.Well()), (this.Fail())];
		}
		hint(){
			return "Sync status";
		}
		message(){
			return (this.hint());
		}
		Link(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.master_link()));
			(obj.sub) = () => ((this.link_content()));
			(obj.hint) = () => ((this.message()));
			return obj;
		}
		minimal_width(){
			return 40;
		}
		minimal_height(){
			return 40;
		}
		Filter(){
			return null;
		}
		option_content(id){
			return [(this.Option_logo(id)), (this.option_label(id))];
		}
		trigger_content(){
			return [(this.Link())];
		}
	};
	($mol_mem_key(($.$giper_baza_status.prototype), "Option_logo"));
	($mol_mem(($.$giper_baza_status.prototype), "Well"));
	($mol_mem(($.$giper_baza_status.prototype), "Fail"));
	($mol_mem(($.$giper_baza_status.prototype), "Link"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_status extends $.$giper_baza_status {
            message() {
                try {
                    this.$.$giper_baza_glob.yard().master();
                    // this.glob().yard().sync()
                    return this.hint();
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                    return String(error);
                }
            }
            link_content() {
                try {
                    this.$.$giper_baza_glob.yard().master();
                    // this.glob().yard().sync()
                    return [this.Well()];
                }
                catch (error) {
                    if (error instanceof Promise)
                        $mol_fail_hidden(error);
                    $mol_fail_log(error);
                    return [this.Fail()];
                }
            }
            // @ $mol_mem
            // hint() {
            // 	return super.hint() + ' ' + $hyoo_sync_revision
            // }
            options() {
                return this.$.$giper_baza_yard.masters();
            }
            master_link() {
                return this.$.$giper_baza_glob.yard().master_current() ?? 'javascript: return false';
            }
            master_id(uri) {
                return uri;
            }
            option_label(uri) {
                return uri.replace(/^\w+:\/\//, '').replace(/\/$/, '');
            }
            value(next) {
                const peers = this.$.$giper_baza_yard.masters();
                return peers[this.$.$giper_baza_glob.yard().master_cursor(next == undefined ? undefined : peers.indexOf(next))] ?? '';
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_status.prototype, "message", null);
        __decorate([
            $mol_mem
        ], $giper_baza_status.prototype, "link_content", null);
        __decorate([
            $mol_mem
        ], $giper_baza_status.prototype, "master_link", null);
        $$.$giper_baza_status = $giper_baza_status;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("giper/baza/status/status.view.css", "[giper_baza_status_option_row] {\n\tpadding: var(--mol_gap_text);\n}\n\n[giper_baza_status_well] {\n\tcolor: var(--mol_theme_current);\n}\n\n[giper_baza_status_fail] {\n\tcolor: var(--mol_theme_focus);\n}\n\n[giper_baza_status][mol_view_error=\"Promise\"] {\n\tanimation: giper_baza_status_wait 1s linear infinite;\n}\n\n@keyframes giper_baza_status_wait {\n\tfrom {\n\t\topacity: 1;\n\t}\n\tto {\n\t\topacity: .5;\n\t}\n}\n");
})($ || ($ = {}));

;
	($.$mol_embed_native) = class $mol_embed_native extends ($.$mol_scroll) {
		uri(next){
			if(next !== undefined) return next;
			return "about:config";
		}
		title(){
			return "";
		}
		Fallback(){
			const obj = new this.$.$mol_link();
			(obj.uri) = () => ((this.uri()));
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		uri_change(next){
			if(next !== undefined) return next;
			return null;
		}
		dom_name(){
			return "iframe";
		}
		window(){
			return null;
		}
		attr(){
			return {...(super.attr()), "src": (this.uri())};
		}
		sub(){
			return [(this.Fallback())];
		}
		message(){
			return {"hashchange": (next) => (this.uri_change(next))};
		}
	};
	($mol_mem(($.$mol_embed_native.prototype), "uri"));
	($mol_mem(($.$mol_embed_native.prototype), "Fallback"));
	($mol_mem(($.$mol_embed_native.prototype), "uri_change"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_embed_native extends $.$mol_embed_native {
            window() {
                $mol_wire_solid();
                this.uri_resource();
                return $mol_wire_sync(this).load(this.dom_node_actual());
            }
            load(frame) {
                return new Promise((done, fail) => {
                    frame.onload = () => {
                        try {
                            if (frame.contentWindow.location.href === 'about:blank') {
                                return;
                            }
                        }
                        catch { }
                        done(frame.contentWindow);
                    };
                    frame.onerror = (event) => {
                        fail(typeof event === 'string' ? new Error(event) : event.error || event);
                    };
                });
            }
            uri_resource() {
                return this.uri().replace(/#.*/, '');
            }
            message_listener() {
                return new $mol_dom_listener($mol_dom_context, 'message', $mol_wire_async(this).message_receive);
            }
            sub_visible() {
                this.window();
                return super.sub_visible();
            }
            message_receive(event) {
                if (!event)
                    return;
                if (event.source !== this.window())
                    return;
                if (!Array.isArray(event.data))
                    return;
                this.message()[event.data[0]]?.(event);
            }
            uri_change(event) {
                this.$.$mol_wait_timeout(1000);
                this.uri(event.data[1]);
            }
            auto() {
                return [
                    this.message_listener(),
                    this.window(),
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "window", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "uri_resource", null);
        __decorate([
            $mol_mem
        ], $mol_embed_native.prototype, "message_listener", null);
        $$.$mol_embed_native = $mol_embed_native;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/embed/native/native.view.css", "[mol_embed_native] {\n\tmin-width: 0;\n\tmin-height: 0;\n\tmax-width: 100%;\n\tmax-height: 100vh;\n\tobject-fit: cover;\n\tdisplay: flex;\n\tflex: 1 1 auto;\n\tobject-position: top left;\n\tborder-radius: var(--mol_gap_round);\n\taspect-ratio: 4/3;\n\tborder: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_frame) = class $mol_frame extends ($.$mol_embed_native) {
		allow(){
			return "";
		}
		html(){
			return null;
		}
		attr(){
			return {
				"tabindex": (this.tabindex()), 
				"allow": (this.allow()), 
				"src": (this.uri()), 
				"srcdoc": (this.html())
			};
		}
		fullscreen(){
			return true;
		}
		accelerometer(){
			return true;
		}
		autoplay(){
			return true;
		}
		encription(){
			return true;
		}
		gyroscope(){
			return true;
		}
		pip(){
			return true;
		}
		clipboard_read(){
			return true;
		}
		clipboard_write(){
			return true;
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_frame_demo
         */
        class $mol_frame extends $.$mol_frame {
            window() {
                // if( this.html() ) return ( this.dom_node() as HTMLIFrameElement ).contentWindow!
                return super.window();
            }
            allow() {
                return [
                    ...this.fullscreen() ? ['fullscreen'] : [],
                    ...this.accelerometer() ? ['accelerometer'] : [],
                    ...this.autoplay() ? ['autoplay'] : [],
                    ...this.encription() ? ['encrypted-media'] : [],
                    ...this.gyroscope() ? ['gyroscope'] : [],
                    ...this.pip() ? ['picture-in-picture'] : [],
                    ...this.clipboard_read() ? [`clipboard-read ${this.uri()}`] : [],
                    ...this.clipboard_write() ? [`clipboard-write ${this.uri()}`] : [],
                ].join('; ');
            }
        }
        $$.$mol_frame = $mol_frame;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_frame, {
        border: {
            style: 'none',
        },
        maxHeight: $mol_style_unit.vh(100),
    });
})($ || ($ = {}));

;
	($.$mol_icon_account) = class $mol_icon_account extends ($.$mol_icon) {
		path(){
			return "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_security) = class $mol_icon_security extends ($.$mol_icon) {
		path(){
			return "M12,12H19C18.47,16.11 15.72,19.78 12,20.92V12H5V6.3L12,3.19M12,1L3,5V11C3,16.55 6.84,21.73 12,23C17.16,21.73 21,16.55 21,11V5L12,1Z";
		}
	};


;
"use strict";


;
	($.$giper_baza_link_chip) = class $giper_baza_link_chip extends ($.$mol_link) {
		icon(){
			return "";
		}
		param(){
			return "link";
		}
		link(){
			const obj = new this.$.$giper_baza_link();
			return obj;
		}
		sub(){
			return [(this.icon()), (this.title())];
		}
	};
	($mol_mem(($.$giper_baza_link_chip.prototype), "link"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_link_chip extends $.$giper_baza_link_chip {
            subj() {
                const link = this.link();
                if (!link.str)
                    return null;
                return this.$.$giper_baza_glob.Pawn(link, $giper_baza_flex_subj);
            }
            meta() {
                const link = this.subj()?.meta();
                if (!link)
                    return null;
                return this.$.$giper_baza_glob.Pawn(link, $giper_baza_flex_meta);
            }
            icon() {
                return (this.subj()?.icon() || '💠') + ' ';
            }
            title() {
                const link = this.link();
                if (!link.str)
                    return '______every______';
                return this.subj()?.name() || link.str;
            }
            hint() {
                return this.subj()?.hint() ?? '';
            }
            arg() {
                return { [this.param()]: this.link().str };
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_link_chip.prototype, "subj", null);
        __decorate([
            $mol_mem
        ], $giper_baza_link_chip.prototype, "meta", null);
        __decorate([
            $mol_mem
        ], $giper_baza_link_chip.prototype, "icon", null);
        __decorate([
            $mol_mem
        ], $giper_baza_link_chip.prototype, "title", null);
        __decorate([
            $mol_mem
        ], $giper_baza_link_chip.prototype, "arg", null);
        $$.$giper_baza_link_chip = $giper_baza_link_chip;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_link_chip, {
            font: {
                family: 'monospace',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_drop) = class $mol_drop extends ($.$mol_ghost) {
		enter(next){
			if(next !== undefined) return next;
			return null;
		}
		move(next){
			if(next !== undefined) return next;
			return null;
		}
		leave(next){
			if(next !== undefined) return next;
			return null;
		}
		drop(next){
			if(next !== undefined) return next;
			return null;
		}
		status(next){
			if(next !== undefined) return next;
			return "ready";
		}
		enabled(next){
			if(next !== undefined) return next;
			return true;
		}
		event(){
			return {
				...(super.event()), 
				"dragenter": (next) => (this.enter(next)), 
				"dragover": (next) => (this.move(next)), 
				"dragleave": (next) => (this.leave(next)), 
				"drop": (next) => (this.drop(next))
			};
		}
		attr(){
			return {...(super.attr()), "mol_drop_status": (this.status())};
		}
		adopt(next){
			if(next !== undefined) return next;
			return {};
		}
		receive(next){
			if(next !== undefined) return next;
			return null;
		}
		allow(){
			return [
				"copy", 
				"move", 
				"link"
			];
		}
	};
	($mol_mem(($.$mol_drop.prototype), "enter"));
	($mol_mem(($.$mol_drop.prototype), "move"));
	($mol_mem(($.$mol_drop.prototype), "leave"));
	($mol_mem(($.$mol_drop.prototype), "drop"));
	($mol_mem(($.$mol_drop.prototype), "status"));
	($mol_mem(($.$mol_drop.prototype), "enabled"));
	($mol_mem(($.$mol_drop.prototype), "adopt"));
	($mol_mem(($.$mol_drop.prototype), "receive"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_drop extends $.$mol_drop {
            status(next = 'ready') { return next; }
            _target = null;
            enter(event) {
                if (event.defaultPrevented)
                    return;
                if (!this.enabled())
                    return;
                // if( !this.adopt( event.dataTransfer! ) ) return
                const action = this.decide_action(event);
                event.dataTransfer.dropEffect = action;
                if (action !== 'none')
                    this.status('drag');
                this._target = event.target;
                event.preventDefault();
            }
            move(event) {
                if (event.defaultPrevented)
                    return;
                if (!this.enabled())
                    return;
                // if( !this.adopt( event.dataTransfer! ) ) return
                event.dataTransfer.dropEffect = this.decide_action(event);
                event.preventDefault();
            }
            decide_action(event) {
                const allow = this.allow();
                if (allow.includes('move') && event.shiftKey)
                    return 'move';
                else if (allow.includes('copy') && event.ctrlKey)
                    return 'copy';
                else if (allow.includes('link') && event.altKey)
                    return 'link';
                else
                    return allow[0];
            }
            leave(event) {
                if (this._target === event.target) {
                    this.status('ready');
                }
            }
            receive(transfer) {
                return transfer;
            }
            drop(event) {
                const e = $mol_dom_event.wrap(event);
                if (e.prevented())
                    return;
                e.prevented(true);
                setTimeout(() => this.status('ready'));
                const obj = this.adopt(event.dataTransfer);
                if (!obj)
                    return;
                this.receive(obj);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_drop.prototype, "status", null);
        $$.$mol_drop = $mol_drop;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_bar) = class $mol_bar extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/bar/bar.view.css", "[mol_bar] {\n\tdisplay: flex;\n\t/* box-shadow: inset 0 0 0 1px var(--mol_theme_line); */\n\tborder-radius: var(--mol_gap_round);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_icon_menu) = class $mol_icon_menu extends ($.$mol_icon) {
		path(){
			return "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_down) = class $mol_icon_menu_down extends ($.$mol_icon) {
		path(){
			return "M7,10L12,15L17,10H7Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_down_outline) = class $mol_icon_menu_down_outline extends ($.$mol_icon) {
		path(){
			return "M18,9V10.5L12,16.5L6,10.5V9H18M12,13.67L14.67,11H9.33L12,13.67Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_up) = class $mol_icon_menu_up extends ($.$mol_icon) {
		path(){
			return "M7,15L12,10L17,15H7Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_menu_up_outline) = class $mol_icon_menu_up_outline extends ($.$mol_icon) {
		path(){
			return "M18,16V14.5L12,8.5L6,14.5V16H18M12,11.33L14.67,14H9.33L12,11.33Z";
		}
	};


;
"use strict";


;
	($.$mol_bigint_field) = class $mol_bigint_field extends ($.$mol_bar) {
		decrement(next){
			if(next !== undefined) return next;
			return null;
		}
		increment(next){
			if(next !== undefined) return next;
			return null;
		}
		decrement_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		increment_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.decrement(next)), 
				"up": (next) => (this.increment(next)), 
				"pageDown": (next) => (this.decrement_boost(next)), 
				"pageUp": (next) => (this.increment_boost(next))
			});
			return obj;
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ("text");
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.selection) = (next) => ((this.selection(next)));
			return obj;
		}
		decrement_enabled(){
			return (this.enabled());
		}
		Decrement_icon(){
			const obj = new this.$.$mol_icon_menu_down_outline();
			return obj;
		}
		Decrement(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.decrement(next)));
			(obj.enabled) = () => ((this.decrement_enabled()));
			(obj.sub) = () => ([(this.Decrement_icon())]);
			return obj;
		}
		increment_enabled(){
			return (this.enabled());
		}
		Increment_icon(){
			const obj = new this.$.$mol_icon_menu_up_outline();
			return obj;
		}
		Increment(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.increment(next)));
			(obj.enabled) = () => ((this.increment_enabled()));
			(obj.sub) = () => ([(this.Increment_icon())]);
			return obj;
		}
		step(){
			return 1n;
		}
		boost(){
			return 10n;
		}
		value_min(){
			return null;
		}
		value_max(){
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return 0n;
		}
		enabled(next){
			if(next !== undefined) return next;
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.String()), 
				(this.Decrement()), 
				(this.Increment())
			];
		}
	};
	($mol_mem(($.$mol_bigint_field.prototype), "decrement"));
	($mol_mem(($.$mol_bigint_field.prototype), "increment"));
	($mol_mem(($.$mol_bigint_field.prototype), "decrement_boost"));
	($mol_mem(($.$mol_bigint_field.prototype), "increment_boost"));
	($mol_mem(($.$mol_bigint_field.prototype), "Hotkey"));
	($mol_mem(($.$mol_bigint_field.prototype), "value_string"));
	($mol_mem(($.$mol_bigint_field.prototype), "submit"));
	($mol_mem(($.$mol_bigint_field.prototype), "selection"));
	($mol_mem(($.$mol_bigint_field.prototype), "String"));
	($mol_mem(($.$mol_bigint_field.prototype), "Decrement_icon"));
	($mol_mem(($.$mol_bigint_field.prototype), "Decrement"));
	($mol_mem(($.$mol_bigint_field.prototype), "Increment_icon"));
	($mol_mem(($.$mol_bigint_field.prototype), "Increment"));
	($mol_mem(($.$mol_bigint_field.prototype), "value"));
	($mol_mem(($.$mol_bigint_field.prototype), "enabled"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_bigint_field extends $.$mol_bigint_field {
            sub() {
                return [
                    this.String(),
                    ...this.decrement_enabled() ? [this.Decrement()] : [],
                    ...this.increment_enabled() ? [this.Increment()] : [],
                ];
            }
            value_string(next) {
                const val = this.value(next === undefined ? undefined : BigInt(next));
                return val == null ? '' : next === '' ? '' : String(val);
            }
            shift(diff) {
                let next = this.value() + diff;
                const max = this.value_max();
                const min = this.value_min();
                if (min !== null && next < min)
                    next = min;
                if (max !== null && next > max)
                    next = max;
                this.value(next);
            }
            shift_boost(diff) {
                const pos = this.selection()[0];
                const len = this.value_string().length;
                const boost = 10n ** BigInt(len - pos);
                this.shift(diff * boost);
            }
            increment(event) {
                this.shift(this.step());
                event?.preventDefault();
            }
            decrement(event) {
                this.shift(-this.step());
                event?.preventDefault();
            }
            increment_boost(event) {
                this.shift_boost(1n);
                event?.preventDefault();
            }
            decrement_boost(event) {
                this.shift_boost(-1n);
                event?.preventDefault();
            }
            decrement_enabled() {
                if (!this.enabled())
                    return false;
                const min = this.value_min();
                if (min === null)
                    return true;
                return this.value() > min;
            }
            increment_enabled() {
                if (!this.enabled())
                    return false;
                const max = this.value_max();
                if (max === null)
                    return true;
                return this.value() < max;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_bigint_field.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_bigint_field.prototype, "value_string", null);
        __decorate([
            $mol_action
        ], $mol_bigint_field.prototype, "shift", null);
        __decorate([
            $mol_action
        ], $mol_bigint_field.prototype, "shift_boost", null);
        $$.$mol_bigint_field = $mol_bigint_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_bigint_field, {
            maxWidth: '100%',
            String: {
                flex: {
                    grow: 1,
                    shrink: 1,
                    basis: `7rem`
                },
                width: `7rem`,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_number) = class $mol_number extends ($.$mol_view) {
		precision(){
			return 0;
		}
		event_dec(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc(next){
			if(next !== undefined) return next;
			return null;
		}
		event_dec_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		event_inc_boost(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey();
			(obj.key) = () => ({
				"down": (next) => (this.event_dec(next)), 
				"up": (next) => (this.event_inc(next)), 
				"pageDown": (next) => (this.event_dec_boost(next)), 
				"pageUp": (next) => (this.event_inc_boost(next))
			});
			return obj;
		}
		type(){
			return "text";
		}
		value_string(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		string_enabled(){
			return (this.enabled());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		String(){
			const obj = new this.$.$mol_string();
			(obj.type) = () => ((this.type()));
			(obj.keyboard) = () => ("decimal");
			(obj.value) = (next) => ((this.value_string(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.string_enabled()));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.selection) = (next) => ((this.selection(next)));
			return obj;
		}
		dec_enabled(){
			return (this.enabled());
		}
		dec_icon(){
			const obj = new this.$.$mol_icon_menu_down_outline();
			return obj;
		}
		Dec(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_dec(next)));
			(obj.enabled) = () => ((this.dec_enabled()));
			(obj.sub) = () => ([(this.dec_icon())]);
			return obj;
		}
		inc_enabled(){
			return (this.enabled());
		}
		inc_icon(){
			const obj = new this.$.$mol_icon_menu_up_outline();
			return obj;
		}
		Inc(){
			const obj = new this.$.$mol_button_minor();
			(obj.event_click) = (next) => ((this.event_inc(next)));
			(obj.enabled) = () => ((this.inc_enabled()));
			(obj.sub) = () => ([(this.inc_icon())]);
			return obj;
		}
		precision_view(){
			return (this.precision());
		}
		precision_change(){
			return (this.precision());
		}
		boost(){
			return 10;
		}
		value_min(){
			return -Infinity;
		}
		value_max(){
			return +Infinity;
		}
		value(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		enabled(){
			return true;
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [
				(this.String()), 
				(this.Dec()), 
				(this.Inc())
			];
		}
	};
	($mol_mem(($.$mol_number.prototype), "event_dec"));
	($mol_mem(($.$mol_number.prototype), "event_inc"));
	($mol_mem(($.$mol_number.prototype), "event_dec_boost"));
	($mol_mem(($.$mol_number.prototype), "event_inc_boost"));
	($mol_mem(($.$mol_number.prototype), "Hotkey"));
	($mol_mem(($.$mol_number.prototype), "value_string"));
	($mol_mem(($.$mol_number.prototype), "submit"));
	($mol_mem(($.$mol_number.prototype), "selection"));
	($mol_mem(($.$mol_number.prototype), "String"));
	($mol_mem(($.$mol_number.prototype), "dec_icon"));
	($mol_mem(($.$mol_number.prototype), "Dec"));
	($mol_mem(($.$mol_number.prototype), "inc_icon"));
	($mol_mem(($.$mol_number.prototype), "Inc"));
	($mol_mem(($.$mol_number.prototype), "value"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/number/number.css", "[mol_number] {\n\tdisplay: flex;\n\tflex: 0 1 auto;\n\tposition: relative;\n\talign-items: stretch;\n\tmax-width: 100%;\n}\n\n[mol_number_string] {\n\tappearance: textfield;\n\tflex: 1 1 7rem;\n\twidth: 7rem;\n}\n\n[mol_number_string]::-webkit-inner-spin-button {\n\tdisplay: none;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Component for entering, incrementing and decrementing numeric values.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_number_demo
         */
        class $mol_number extends $.$mol_number {
            sub() {
                return [
                    this.String(),
                    ...this.dec_enabled() ? [this.Dec()] : [],
                    ...this.inc_enabled() ? [this.Inc()] : [],
                ];
            }
            value_limited(val) {
                if (Number.isNaN(val))
                    return this.value(val);
                if (val === undefined)
                    return this.value();
                const min = this.value_min();
                const max = this.value_max();
                if (val < min)
                    return this.value(min);
                if (val > max)
                    return this.value(max);
                return this.value(val);
            }
            event_dec(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change());
                next?.preventDefault();
            }
            precision_change() {
                return this.precision() || 1;
            }
            event_inc(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change());
                next?.preventDefault();
            }
            event_dec_boost(next) {
                this.value_limited((this.value_limited() || 0) - this.precision_change() * this.boost());
                next?.preventDefault();
            }
            event_inc_boost(next) {
                this.value_limited((this.value_limited() || 0) + this.precision_change() * this.boost());
                next?.preventDefault();
            }
            round(val) {
                if (Number.isNaN(val))
                    return '';
                if (val === 0)
                    return '0';
                if (!val)
                    return '';
                const precision_view = this.precision_view();
                if (precision_view === 0)
                    return String(val);
                if (precision_view >= 1) {
                    return (val / precision_view).toFixed();
                }
                else {
                    const fixed_number = Math.log10(1 / precision_view);
                    return val.toFixed(Math.ceil(fixed_number));
                }
            }
            value_string(next) {
                // Вытягиваем value
                // Если кто-то поменяет из вне value, value_string надо обновить
                const current = this.round(this.value_limited());
                if (next === undefined)
                    return current;
                const precision = this.precision_view();
                // Точку в конце поставить нельзя, если precision_view целое число > 0
                if (precision > 0 && precision - Math.floor(precision) === 0)
                    next = next.replace(/[.,]/g, '');
                // Запятые меняем на точки, удаляем не-цифры и не-точки и лишние ноли в начале целой части.
                // Минус получится ввести только в начале.
                next = (this.value_min() < 0 && next.startsWith('-') ? '-' : '')
                    + next.replace(/,/g, '.').replace(/[^\d\.]/g, '').replace(/^0{2,}/, '0');
                let dot_pos = next.indexOf('.');
                if (dot_pos !== -1) {
                    const prev = $mol_wire_probe(() => this.value_string()) ?? '';
                    const dot_pos_prev = prev.indexOf('.');
                    // Определяем где относительно предыдущей точки юзер поставил новую
                    if (dot_pos_prev === dot_pos)
                        dot_pos = next.lastIndexOf('.');
                    // Из частей до и после новой точки старую точку удаляем
                    const frac = next.slice(dot_pos + 1).replace(/\./g, '');
                    // Если точка идет первой, перед ней пишем 0, что бы форматирование выглядело нормально в mask
                    next = (next.slice(0, dot_pos) || '0').replace(/\./g, '') + '.' + frac;
                }
                // Оставляем старое значение в value есть сочетание, приводящие к NaN, например -.
                if (Number.isNaN(Number(next)))
                    return next;
                if (next.endsWith('.'))
                    return next;
                if (next.endsWith('-'))
                    return next;
                // Если пустая строка - сетим NaN
                // Применяем округления.
                this.value_limited(Number(next || Number.NaN));
                // Возвращаем все-равно не нормализованное значение
                // Иначе нельзя ввести будет 10, если min/max 5..10
                return next;
            }
            dec_enabled() {
                return this.enabled() && (!((this.value() || 0) <= this.value_min()));
            }
            inc_enabled() {
                return this.enabled() && (!((this.value() || 0) >= this.value_max()));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "value_string", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "dec_enabled", null);
        __decorate([
            $mol_mem
        ], $mol_number.prototype, "inc_enabled", null);
        $$.$mol_number = $mol_number;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_calendar) = class $mol_icon_calendar extends ($.$mol_icon) {
		path(){
			return "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_calendar_today) = class $mol_icon_calendar_today extends ($.$mol_icon) {
		path(){
			return "M7,10H12V15H7M19,19H5V8H19M19,3H18V1H16V3H8V1H6V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z";
		}
	};


;
"use strict";


;
	($.$mol_format) = class $mol_format extends ($.$mol_string) {
		mask(id){
			return "";
		}
		allow(){
			return "0123456789";
		}
		hint(){
			return (this.mask("0"));
		}
		keyboard(){
			return "numeric";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Formatted string input/output
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_format_demo
         */
        class $mol_format extends $.$mol_format {
            selection([from, to] = [0, 0]) {
                const prev = $mol_wire_probe(() => this.selection());
                if (!prev)
                    return [0, 100];
                if (from !== to)
                    return [from, to];
                const allow = this.allow();
                const value = this.value_changed();
                const filtered = [...value].filter(letter => allow.includes(letter)).join('');
                const mask = this.mask(filtered);
                if ((prev?.[0] ?? 0) >= from)
                    return [from, to];
                const lastAllow = (value.length - [...value].reverse().findIndex(letter => allow.includes(letter))) % (value.length + 1);
                if (lastAllow < from) {
                    from = to = lastAllow;
                }
                while (mask[from] && mask[from] !== '_') {
                    ++from;
                    ++to;
                }
                return [from, to];
            }
            value_changed(next) {
                const allow = this.allow();
                const normalize = (val) => {
                    val = [...val].filter(letter => allow.includes(letter)).join('');
                    const letters = [...val].reverse();
                    return this.mask(val).replace(/_/gu, () => letters.pop() ?? '_') + letters.reverse().join('');
                };
                if (next !== undefined) {
                    next = normalize(next);
                    if ([...next].filter(letter => allow.includes(letter)).join('')) {
                        if (next.includes('_'))
                            return next;
                    }
                    else {
                        next = '';
                    }
                }
                return normalize(this.value(next));
            }
        }
        __decorate([
            $mol_mem
        ], $mol_format.prototype, "selection", null);
        __decorate([
            $mol_mem
        ], $mol_format.prototype, "value_changed", null);
        $$.$mol_format = $mol_format;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/format/format.view.css", "[mol_format] {\n\tfont-family: monospace;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_trash_can) = class $mol_icon_trash_can extends ($.$mol_icon) {
		path(){
			return "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_trash_can_outline) = class $mol_icon_trash_can_outline extends ($.$mol_icon) {
		path(){
			return "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron) = class $mol_icon_chevron extends ($.$mol_icon) {
		path(){
			return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_double_left) = class $mol_icon_chevron_double_left extends ($.$mol_icon) {
		path(){
			return "M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_left) = class $mol_icon_chevron_left extends ($.$mol_icon) {
		path(){
			return "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_right) = class $mol_icon_chevron_right extends ($.$mol_icon) {
		path(){
			return "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_chevron_double_right) = class $mol_icon_chevron_double_right extends ($.$mol_icon) {
		path(){
			return "M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z";
		}
	};


;
"use strict";


;
	($.$mol_hor) = class $mol_hor extends ($.$mol_view) {};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /** Horizontal list of blocks. */
        class $mol_hor extends $.$mol_hor {
            minimal_width() {
                let min = 0;
                for (const view of this.sub()) {
                    if (!(view instanceof $mol_view))
                        continue;
                    min += view.minimal_width();
                }
                return min;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_hor.prototype, "minimal_width", null);
        $$.$mol_hor = $mol_hor;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_define($mol_hor, {
        display: 'flex',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        flex: {
            grow: 1,
            shrink: 0,
            basis: 'auto',
        },
    });
})($ || ($ = {}));

;
	($.$mol_calendar) = class $mol_calendar extends ($.$mol_list) {
		title(){
			return "";
		}
		Title(){
			const obj = new this.$.$mol_view();
			(obj.minimal_height) = () => (24);
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		head(){
			return [(this.Title())];
		}
		Head(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.head()));
			return obj;
		}
		weekdays(){
			return [];
		}
		Weekdays(){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this.weekdays()));
			return obj;
		}
		weekend(id){
			return false;
		}
		weekday(id){
			return "";
		}
		week_days(id){
			return [];
		}
		day_ghost(id){
			return false;
		}
		day_holiday(id){
			return false;
		}
		day_selected(id){
			return false;
		}
		day_today(id){
			return false;
		}
		day_theme(id){
			return null;
		}
		day_text(id){
			return "";
		}
		day_content(id){
			return [(this.day_text(id))];
		}
		sub(){
			return [(this.Head()), (this.Weekdays())];
		}
		weeks(){
			return [];
		}
		weeks_count(){
			return 6;
		}
		Weekday(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.holiday) = () => ((this.weekend(id)));
			(obj.sub) = () => ([(this.weekday(id))]);
			return obj;
		}
		Week(id){
			const obj = new this.$.$mol_hor();
			(obj.sub) = () => ((this.week_days(id)));
			return obj;
		}
		Day(id){
			const obj = new this.$.$mol_calendar_day();
			(obj.ghost) = () => ((this.day_ghost(id)));
			(obj.holiday) = () => ((this.day_holiday(id)));
			(obj.selected) = () => ((this.day_selected(id)));
			(obj.today) = () => ((this.day_today(id)));
			(obj.theme) = () => ((this.day_theme(id)));
			(obj.sub) = () => ((this.day_content(id)));
			return obj;
		}
		month_string(){
			return "";
		}
		month_moment(){
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_calendar.prototype), "Title"));
	($mol_mem(($.$mol_calendar.prototype), "Head"));
	($mol_mem(($.$mol_calendar.prototype), "Weekdays"));
	($mol_mem_key(($.$mol_calendar.prototype), "Weekday"));
	($mol_mem_key(($.$mol_calendar.prototype), "Week"));
	($mol_mem_key(($.$mol_calendar.prototype), "Day"));
	($mol_mem(($.$mol_calendar.prototype), "month_moment"));
	($.$mol_calendar_day) = class $mol_calendar_day extends ($.$mol_view) {
		holiday(){
			return false;
		}
		ghost(){
			return false;
		}
		selected(){
			return false;
		}
		today(){
			return false;
		}
		theme(){
			return null;
		}
		minimal_height(){
			return 24;
		}
		minimal_width(){
			return 36;
		}
		attr(){
			return {
				"mol_calendar_holiday": (this.holiday()), 
				"mol_calendar_ghost": (this.ghost()), 
				"mol_calendar_selected": (this.selected()), 
				"mol_calendar_today": (this.today()), 
				"mol_theme": (this.theme())
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Draws all days of month as table.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_calendar_demo_holiday
         */
        class $mol_calendar extends $.$mol_calendar {
            month_moment() {
                const moment = new $mol_time_moment(this.month_string() || undefined);
                return new $mol_time_moment({ year: moment.year, month: moment.month });
            }
            lang() { return this.$.$mol_locale.lang(); }
            title() {
                return this.month_moment().toString('Month YYYY', this.lang());
            }
            day_first() {
                return this.month_moment().merge({ day: 0 });
            }
            day_last() {
                return this.day_first().shift('P1M');
            }
            day_draw_from() {
                let weekday = this.day_first().weekday;
                return this.day_first().shift({ day: -weekday });
            }
            weekdays() {
                const next = [];
                for (let index = 0; index < 7; ++index) {
                    next.push(this.Weekday(index));
                }
                return next;
            }
            weekday(index) {
                return this.day_draw_from().shift({ day: index }).toString('WD', this.lang());
            }
            weekend(index) {
                return [5, 6].indexOf(index) >= 0;
            }
            sub() {
                return [
                    ...super.sub(),
                    ...this.weeks(),
                ];
            }
            weeks() {
                const weeks = [];
                let count = this.weeks_count();
                for (let i = 0; i < count; ++i) {
                    weeks.push(this.Week(i));
                }
                return weeks;
            }
            week_days(index) {
                const days = [];
                let start = this.day_draw_from().shift({ day: index * 7 });
                for (let i = 0; i < 7; ++i) {
                    days.push(this.Day(start.shift({ day: i }).toString('YYYY-MM-DD')));
                }
                return days;
            }
            day_text(day) {
                return new $mol_time_moment(day).toString('D', this.lang());
            }
            day_holiday(day) {
                return this.weekend(new $mol_time_moment(day).weekday);
            }
            today() {
                return new $mol_time_moment();
            }
            day_today(day) {
                return this.today().toString('YYYY-MM-DD') === day;
            }
            day_ghost(day) {
                return new $mol_time_moment(day).toString('YYYY-MM') !== this.day_first().toString('YYYY-MM');
            }
            day_theme(day) {
                return this.day_selected(day) ? '$mol_theme_current' : super.day_theme(day);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "month_moment", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_first", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_last", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "day_draw_from", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "weekdays", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "weekday", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "weeks", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "week_days", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_holiday", null);
        __decorate([
            $mol_mem
        ], $mol_calendar.prototype, "today", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_today", null);
        __decorate([
            $mol_mem_key
        ], $mol_calendar.prototype, "day_ghost", null);
        $$.$mol_calendar = $mol_calendar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/calendar/calendar.view.css", "[mol_calendar] {\n\tdisplay: table;\n\tfont-family: monospace;\n}\n\n[mol_calendar_head] {\n\tdisplay: table-caption;\n\tbackground: inherit;\n\twidth: max-content;\n}\n\n[mol_calendar_title] {\n\tjustify-content: center;\n}\n\n[mol_calendar_weekdays] ,\n[mol_calendar_week] {\n\tdisplay: table-row;\n\tpadding: 0;\n}\n\n[mol_calendar_day] {\n\tdisplay: table-cell;\n\tpadding: .25rem .5rem;\n\ttext-align: center;\n\tword-break: normal;\n\tbox-shadow: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_calendar_weekday] {\n\tcolor: var(--mol_theme_shade);\n\tborder-bottom: 1px solid var(--mol_theme_line);\n}\n\n[mol_calendar_holiday] {\n\tcolor: var(--mol_theme_special);\n}\n\n[mol_calendar_today] {\n\tfont-weight: bolder;\n}\n\n[mol_calendar_ghost] {\n\topacity: .2;\n}\n");
})($ || ($ = {}));

;
	($.$mol_date) = class $mol_date extends ($.$mol_pick) {
		enabled(){
			return true;
		}
		today_click(next){
			if(next !== undefined) return next;
			return null;
		}
		Today_icon(){
			const obj = new this.$.$mol_icon_calendar_today();
			return obj;
		}
		Today(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Today_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.today_click(next)));
			(obj.sub) = () => ([(this.Today_icon())]);
			return obj;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		value_changed(next){
			return (this.Input().value_changed(next));
		}
		input_mask(id){
			return "";
		}
		Input(){
			const obj = new this.$.$mol_format();
			(obj.value) = (next) => ((this.value(next)));
			(obj.mask) = (id) => ((this.input_mask(id)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		clear(next){
			if(next !== undefined) return next;
			return null;
		}
		Clear_icon(){
			const obj = new this.$.$mol_icon_trash_can_outline();
			return obj;
		}
		Clear(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_date_Clear_hint")));
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.clear(next)));
			(obj.sub) = () => ([(this.Clear_icon())]);
			return obj;
		}
		input_content(){
			return [
				(this.Today()), 
				(this.Input()), 
				(this.Clear())
			];
		}
		Input_row(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ((this.input_content()));
			return obj;
		}
		month_moment(){
			return (this.value_moment());
		}
		day_selected(id){
			return false;
		}
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		Calendar_title(){
			return (this.Calendar().Title());
		}
		year_prev_hint(){
			return (this.$.$mol_locale.text("$mol_date_year_prev_hint"));
		}
		year_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		Year_prev_icon(){
			const obj = new this.$.$mol_icon_chevron_double_left();
			return obj;
		}
		Year_prev(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.year_prev_hint()));
			(obj.click) = (next) => ((this.year_prev(next)));
			(obj.sub) = () => ([(this.Year_prev_icon())]);
			return obj;
		}
		month_prev_hint(){
			return (this.$.$mol_locale.text("$mol_date_month_prev_hint"));
		}
		prev_hint(){
			return (this.month_prev_hint());
		}
		month_prev(next){
			if(next !== undefined) return next;
			return null;
		}
		prev(next){
			return (this.month_prev(next));
		}
		Month_prev_icon(){
			const obj = new this.$.$mol_icon_chevron_left();
			return obj;
		}
		Prev_icon(){
			return (this.Month_prev_icon());
		}
		Month_prev(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.prev_hint()));
			(obj.click) = (next) => ((this.prev(next)));
			(obj.sub) = () => ([(this.Prev_icon())]);
			return obj;
		}
		Prev(){
			return (this.Month_prev());
		}
		month_next_hint(){
			return (this.$.$mol_locale.text("$mol_date_month_next_hint"));
		}
		next_hint(){
			return (this.month_next_hint());
		}
		month_next(next){
			if(next !== undefined) return next;
			return null;
		}
		next(next){
			return (this.month_next(next));
		}
		Month_next_icon(){
			const obj = new this.$.$mol_icon_chevron_right();
			return obj;
		}
		Next_icon(){
			return (this.Month_next_icon());
		}
		Month_next(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.next_hint()));
			(obj.click) = (next) => ((this.next(next)));
			(obj.sub) = () => ([(this.Next_icon())]);
			return obj;
		}
		Next(){
			return (this.Month_next());
		}
		year_next_hint(){
			return (this.$.$mol_locale.text("$mol_date_year_next_hint"));
		}
		year_next(next){
			if(next !== undefined) return next;
			return null;
		}
		Year_next_icon(){
			const obj = new this.$.$mol_icon_chevron_double_right();
			return obj;
		}
		Year_next(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.year_next_hint()));
			(obj.click) = (next) => ((this.year_next(next)));
			(obj.sub) = () => ([(this.Year_next_icon())]);
			return obj;
		}
		Calendar_tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Year_prev()), 
				(this.Prev()), 
				(this.Calendar_title()), 
				(this.Next()), 
				(this.Year_next())
			]);
			return obj;
		}
		Calendar(){
			const obj = new this.$.$mol_date_calendar();
			(obj.enabled) = () => ((this.enabled()));
			(obj.month_moment) = () => ((this.month_moment()));
			(obj.day_selected) = (id) => ((this.day_selected(id)));
			(obj.day_click) = (id, next) => ((this.day_click(id, next)));
			(obj.head) = () => ([(this.Calendar_tools())]);
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_calendar();
			return obj;
		}
		bubble_content(){
			return [(this.Input_row()), (this.Calendar())];
		}
		value_number(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		value_moment(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
	};
	($mol_mem(($.$mol_date.prototype), "today_click"));
	($mol_mem(($.$mol_date.prototype), "Today_icon"));
	($mol_mem(($.$mol_date.prototype), "Today"));
	($mol_mem(($.$mol_date.prototype), "value"));
	($mol_mem(($.$mol_date.prototype), "Input"));
	($mol_mem(($.$mol_date.prototype), "clear"));
	($mol_mem(($.$mol_date.prototype), "Clear_icon"));
	($mol_mem(($.$mol_date.prototype), "Clear"));
	($mol_mem(($.$mol_date.prototype), "Input_row"));
	($mol_mem_key(($.$mol_date.prototype), "day_click"));
	($mol_mem(($.$mol_date.prototype), "year_prev"));
	($mol_mem(($.$mol_date.prototype), "Year_prev_icon"));
	($mol_mem(($.$mol_date.prototype), "Year_prev"));
	($mol_mem(($.$mol_date.prototype), "month_prev"));
	($mol_mem(($.$mol_date.prototype), "Month_prev_icon"));
	($mol_mem(($.$mol_date.prototype), "Month_prev"));
	($mol_mem(($.$mol_date.prototype), "month_next"));
	($mol_mem(($.$mol_date.prototype), "Month_next_icon"));
	($mol_mem(($.$mol_date.prototype), "Month_next"));
	($mol_mem(($.$mol_date.prototype), "year_next"));
	($mol_mem(($.$mol_date.prototype), "Year_next_icon"));
	($mol_mem(($.$mol_date.prototype), "Year_next"));
	($mol_mem(($.$mol_date.prototype), "Calendar_tools"));
	($mol_mem(($.$mol_date.prototype), "Calendar"));
	($mol_mem(($.$mol_date.prototype), "Icon"));
	($mol_mem(($.$mol_date.prototype), "value_number"));
	($mol_mem(($.$mol_date.prototype), "value_moment"));
	($.$mol_date_calendar) = class $mol_date_calendar extends ($.$mol_calendar) {
		day_click(id, next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return true;
		}
		Day_button(id){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.day_text(id)));
			(obj.event_click) = (next) => ((this.day_click(id, next)));
			(obj.minimal_height) = () => (24);
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		day_content(id){
			return [(this.Day_button(id))];
		}
	};
	($mol_mem_key(($.$mol_date_calendar.prototype), "day_click"));
	($mol_mem_key(($.$mol_date_calendar.prototype), "Day_button"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Date presenter and picker.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_date_demo
         */
        class $mol_date extends $.$mol_date {
            trigger_content() {
                return [this.value() || this.Icon()];
            }
            input_mask(val) {
                return val.length > 8 ? '____-__-__ __:__' : '____-__-__ ';
            }
            input_content() {
                return [
                    this.Today(),
                    this.Input(),
                    ...this.value() ? [this.Clear()] : [],
                ];
            }
            value(val) {
                const moment = this.value_moment();
                if (val === undefined)
                    return moment?.toString('YYYY-MM-DD hh:mm') ?? '';
                const moment2 = val && $mol_try(() => new $mol_time_moment(val)) || null;
                if (moment2 instanceof Error)
                    return val;
                this.value_moment(moment2);
                return val;
            }
            value_moment(next) {
                const stamp = this.value_number();
                if (next === undefined) {
                    return isNaN(stamp) ? null : new $mol_time_moment(stamp);
                }
                this.value_number(next?.valueOf() ?? NaN);
                return next;
            }
            value_number(next) {
                const value = this.value();
                if (next === undefined) {
                    if (!value)
                        return NaN;
                    const moment = $mol_try(() => new $mol_time_moment(value));
                    if (moment instanceof Error)
                        return NaN;
                    return moment.valueOf() ?? NaN;
                }
                const moment = $mol_try(() => new $mol_time_moment(next));
                this.value(moment.toString(value.length > 12 ? 'YYYY-MM-DD hh:mm' : 'YYYY-MM-DD'));
                return next;
            }
            value_moment_today() {
                return this.value()
                    ? new $mol_time_moment().mask(this.value())
                    : new $mol_time_moment();
            }
            clear() {
                this.value('');
                this.Input().focused(true);
                this.Input().selection([0, 0]);
            }
            month_moment(next) {
                if (next)
                    return next;
                let moment = $mol_try(() => new $mol_time_moment(this.value_changed().replace(/\D+$/, '')).mask('0000-00'));
                if (moment instanceof Error || !moment.year)
                    return new $mol_time_moment().mask('0000-00');
                if (moment.month === undefined) {
                    moment = moment.merge({ month: 0 });
                }
                return moment;
            }
            day_selected(day) {
                return this.value_moment()?.toString('YYYY-MM-DD') === day;
            }
            day_click(day) {
                const moment = new $mol_time_moment(day);
                this.value_moment(this.value_moment()?.merge(moment) ?? moment);
                this.showed(false);
            }
            month_prev() {
                this.month_moment(this.month_moment().shift({ month: -1 }));
            }
            month_next() {
                this.month_moment(this.month_moment().shift({ month: +1 }));
            }
            year_prev() {
                this.month_moment(this.month_moment().shift({ year: -1 }));
            }
            year_next() {
                this.month_moment(this.month_moment().shift({ year: +1 }));
            }
            today_click() {
                this.value_moment(this.value_moment_today());
            }
        }
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_moment", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_number", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "value_moment_today", null);
        __decorate([
            $mol_mem
        ], $mol_date.prototype, "month_moment", null);
        $$.$mol_date = $mol_date;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/date/date.view.css", "/* [mol_date_bubble] {\n\tpadding: .5rem;\n} */\n\n[mol_date_input] {\n\tflex-shrink: 0;\n}\n\n[mol_date_month_prev] ,\n[mol_date_month_next] {\n\tflex-grow: 1;\n}\n\n[dir=\"rtl\"] :where(\n\t[mol_date_month_prev],\n\t[mol_date_month_next],\n\t[mol_date_year_prev],\n\t[mol_date_year_next]\n) {\n\ttransform: scaleX(-1);\n}\n\n[mol_date_month_prev] {\n\tjustify-content: flex-end;\n}\n\n[mol_date_calendar_title] {\n\tpadding: var(--mol_gap_text);\n}\n\n[mol_date_calendar_day] {\n\tpadding: 0;\n}\n\n[mol_date_calendar_day_button] {\n\twidth: 100%;\n\t/* padding: .25rem .5rem; */\n\tjustify-content: center;\n\tcursor: pointer;\n\tcolor: inherit;\n}\n");
})($ || ($ = {}));

;
	($.$mol_stack) = class $mol_stack extends ($.$mol_view) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/stack/stack.view.css", "[mol_stack] {\n\tdisplay: grid;\n\t/* width: max-content; */\n\t/* height: max-content; */\n\talign-items: flex-start;\n\tjustify-items: flex-start;\n}\n\n[mol_stack] > * {\n\tgrid-area: 1/1;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    /** Creates lexer by dictionary of lexems. Lexem that started first wins. Then lexem that declared earlier wins. Use regexp capture to take parts of token. */
    class $mol_syntax2 {
        lexems;
        constructor(lexems) {
            this.lexems = lexems;
            for (let name in lexems) {
                this.rules.push({
                    name: name,
                    regExp: lexems[name],
                    size: RegExp('^$|' + lexems[name].source).exec('').length - 1,
                });
            }
            const parts = '(' + this.rules.map(rule => rule.regExp.source).join(')|(') + ')';
            this.regexp = RegExp(`([\\s\\S]*?)(?:(${parts})|$(?![^]))`, 'gmu');
        }
        rules = [];
        regexp;
        tokenize(text, handle) {
            let end = 0;
            lexing: while (end < text.length) {
                const start = end;
                this.regexp.lastIndex = start;
                var found = this.regexp.exec(text);
                end = this.regexp.lastIndex;
                if (start === end)
                    throw new Error('Empty token');
                var prefix = found[1];
                if (prefix)
                    handle('', prefix, [prefix], start);
                var suffix = found[2];
                if (!suffix)
                    continue;
                let offset = 4;
                for (let rule of this.rules) {
                    if (found[offset - 1]) {
                        handle(rule.name, suffix, found.slice(offset, offset + rule.size), start + prefix.length);
                        continue lexing;
                    }
                    offset += rule.size + 1;
                }
                $mol_fail(new Error('$mol_syntax2 is broken'));
            }
        }
        parse(text, handlers) {
            this.tokenize(text, (name, ...args) => handlers[name](...args));
        }
    }
    $.$mol_syntax2 = $mol_syntax2;
})($ || ($ = {}));

;
	($.$mol_text_code_token) = class $mol_text_code_token extends ($.$mol_dimmer) {
		type(){
			return "";
		}
		attr(){
			return {...(super.attr()), "mol_text_code_token_type": (this.type())};
		}
	};
	($.$mol_text_code_token_link) = class $mol_text_code_token_link extends ($.$mol_text_code_token) {
		uri(){
			return "";
		}
		dom_name(){
			return "a";
		}
		type(){
			return "code-link";
		}
		attr(){
			return {
				...(super.attr()), 
				"href": (this.uri()), 
				"target": "_blank"
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { hsla } = $mol_style_func;
        $mol_style_define($mol_text_code_token, {
            display: 'inline',
            textDecoration: 'none',
            '@': {
                mol_text_code_token_type: {
                    'code-keyword': {
                        color: hsla(0, 70, 60, 1),
                    },
                    'code-field': {
                        color: hsla(300, 70, 50, 1),
                    },
                    'code-tag': {
                        color: hsla(330, 70, 50, 1),
                    },
                    'code-global': {
                        color: hsla(30, 80, 50, 1),
                    },
                    'code-decorator': {
                        color: hsla(180, 40, 50, 1),
                    },
                    'code-punctuation': {
                        color: hsla(0, 0, 50, 1),
                    },
                    'code-string': {
                        color: hsla(90, 40, 50, 1),
                    },
                    'code-number': {
                        color: hsla(55, 65, 45, 1),
                    },
                    'code-call': {
                        color: hsla(270, 60, 50, 1),
                    },
                    'code-link': {
                        color: hsla(210, 60, 50, 1),
                    },
                    'code-comment-inline': {
                        opacity: .5,
                    },
                    'code-comment-block': {
                        opacity: .5,
                    },
                    'code-docs': {
                        opacity: .75,
                    },
                },
            }
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code_line) = class $mol_text_code_line extends ($.$mol_paragraph) {
		numb(){
			return 0;
		}
		token_type(id){
			return "";
		}
		token_text(id){
			return "";
		}
		highlight(){
			return "";
		}
		token_uri(id){
			return "";
		}
		text(){
			return "";
		}
		minimal_height(){
			return 24;
		}
		numb_showed(){
			return true;
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		Numb(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.numb())]);
			return obj;
		}
		Token(id){
			const obj = new this.$.$mol_text_code_token();
			(obj.type) = () => ((this.token_type(id)));
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			return obj;
		}
		Token_link(id){
			const obj = new this.$.$mol_text_code_token_link();
			(obj.haystack) = () => ((this.token_text(id)));
			(obj.needle) = () => ((this.highlight()));
			(obj.uri) = () => ((this.token_uri(id)));
			return obj;
		}
		find_pos(id){
			return null;
		}
	};
	($mol_mem(($.$mol_text_code_line.prototype), "Numb"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token"));
	($mol_mem_key(($.$mol_text_code_line.prototype), "Token_link"));


;
"use strict";
var $;
(function ($) {
    $.$mol_syntax2_md_flow = new $mol_syntax2({
        'quote': /^((?:(?:[>"] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'spoiler': /^((?:(?:[\?] )(?:[^]*?)$(\r?\n?))+)([\n\r]*)/,
        'header': /^([#=]+)(\s+)(.*?)$([\n\r]*)/,
        'list': /^((?:(?: ?([*+-])|(?:\d+[\.\)])+) +(?:[^]*?)$(?:\r?\n?)(?:  (?:[^]*?)$(?:\r?\n?))*)+)((?:\r?\n)*)/,
        'code': /^(```)([\w.-]*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'code-indent': /^((?:(?: |\t)(?:[^]*?)$\r?\n?)+)([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n?)+)([\n\r]*)/,
        'grid': /((?:^ *! .*?$\r?\n?)+)([\n\r]*)/,
        'cut': /^--+$((?:\r?\n)*)/,
        'block': /^(.*?)$((?:\r?\n)*)/,
    });
    $.$mol_syntax2_md_line = new $mol_syntax2({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(?!\s)(.+?)\*|\/\/(?!\s)(.+?)\/\//,
        'code': /```(.+?)```|;;(.+?);;|`(.+?)`/,
        'insert': /\+\+(.+?)\+\+/,
        'delete': /~~(.+?)~~|--(.+?)--/,
        // 'remark' : /(\()(.+?)(\))/ ,
        // 'quote' : /(")(.+?)(")/ ,
        'embed': /""(?:(.*?)\\)?(.*?)""/,
        'link': /\\\\(?:(.*?)\\)?(.*?)\\\\/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
        'text-link': /\[(.*?(?:\[[^\[\]]*?\][^\[\]]*?)*)\]\((.*?)\)/,
        'text-link-http': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
    });
    $.$mol_syntax2_md_code = new $mol_syntax2({
        'code-indent': /\t+/,
        'code-docs': /\/\/\/.*?$/,
        'code-comment-block': /(?:\/\*[^]*?\*\/|\/\+[^]*?\+\/|<![^]*?>)/,
        'code-link': /(?:\w+:\/\/|#)\S+?(?=\s|\\\\|""|$)/,
        'code-comment-inline': /\/\/.*?(?:$|\/\/)|- \\(?!\\).*|(?<=^| )#!? .*/,
        'code-string': /(?:".*?"|'.*?'|`.*?`| ?\\\\.+?\\\\|\/.+?\/[dygimsu]*(?!\p{Letter})|[ \t]*\\[^\n]*)/u,
        'code-number': /[+-]?(?:\d*\.)?\d+(\uFE0F.|\w*)/,
        'code-call': /\.?\w+(?=\()/,
        'code-sexpr': /\((\w+ )/,
        'code-field': /(?:(?<=\.|::|->)[a-z][\w-]*|(?<=[, \t] |\t)[\w-]+\??:(?!\/\/|:))/,
        'code-keyword': /(?<=^|\t|[ )(}{=] )((throw|readonly|unknown|keyof|typeof|never|from|class|struct|interface|type|function|extends|implements|module|namespace|import|export|include|require|var|val|let|const|for|do|while|until|in|out|of|new|if|then|else|switch|case|return|async|await|yield|try|catch|break|continue|get|set|public|private|protected|void|int|float|ref)( |$|;))+/,
        'code-global': /[$]+\w*|\b[A-Z][a-z0-9]+[A-Z]\w*/,
        'code-word': /\w+/,
        'code-decorator': /(?<=^|  |\t)@\s*\S+/,
        'code-tag': /<\/?[\w-]+\/?>?|&\w+;/,
        'code-punctuation': /[\-\[\]\{\}\(\)<=>~!\?@#%&\*_\+\\\/\|;:\.,\^]+?/,
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        '$mol_syntax2_md_flow'() {
            const check = (input, right) => {
                const tokens = [];
                $mol_syntax2_md_flow.tokenize(input, (...token) => tokens.push(token));
                $mol_assert_equal(tokens, right);
            };
            check('Hello,\nWorld..\r\n\r\n\nof Love!', [
                ['block', 'Hello,\n', ['Hello,', '\n'], 0],
                ['block', 'World..\r\n\r\n\n', ['World..', '\r\n\r\n\n'], 7],
                ['block', 'of Love!', ['of Love!', ''], 19],
            ]);
            check('# Header1\n\nHello!\n\n## Header2', [
                ['header', '# Header1\n\n', ['#', ' ', 'Header1', '\n\n'], 0],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 11],
                ['header', '## Header2', ['##', ' ', 'Header2', ''], 19],
            ]);
            check('```\nstart()\n```\n\n```jam.js\nrestart()\n```\n\nHello!\n\n```\nstop()\n```', [
                ['code', '```\nstart()\n```\n\n', ['```', '', 'start()\n', '```', '\n\n'], 0],
                ['code', '```jam.js\nrestart()\n```\n\n', ['```', 'jam.js', 'restart()\n', '```', '\n\n'], 17],
                ['block', 'Hello!\n\n', ['Hello!', '\n\n'], 42],
                ['code', '```\nstop()\n```', ['```', '', 'stop()\n', '```', ''], 50],
            ]);
            check('| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n| Cell11 | Cell12\n| Cell21 | Cell22\n', [
                ['table', '| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n\n', ['| header1 | header2\n|----|----\n| Cell11 | Cell12\n| Cell21 | Cell22\n', '\n'], 0],
                ['table', '| Cell11 | Cell12\n| Cell21 | Cell22\n', ['| Cell11 | Cell12\n| Cell21 | Cell22\n', ''], 68],
            ]);
        },
    });
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_text_code_line extends $.$mol_text_code_line {
            maximal_width() {
                return this.text().length * this.letter_width();
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            tokens(path) {
                const tokens = [];
                const text = (path.length > 0)
                    // @FIXME: this logic compatible only with `string`
                    ? this.tokens(path.slice(0, path.length - 1))[path[path.length - 1]].found.slice(1, -1)
                    : this.text();
                this.syntax().tokenize(text, (name, found, chunks) => {
                    if (name === 'code-sexpr') {
                        tokens.push({ name: 'code-punctuation', found: '(', chunks: [] });
                        tokens.push({ name: 'code-call', found: chunks[0], chunks: [] });
                    }
                    else {
                        tokens.push({ name, found, chunks });
                    }
                });
                return tokens;
            }
            sub() {
                return [
                    ...this.numb_showed() ? [this.Numb()] : [],
                    ...this.row_content([])
                ];
            }
            row_content(path) {
                const content = this.tokens(path).map((t, i) => this.Token([...path, i]));
                return content.length ? content : ['\n'];
            }
            Token(path) {
                return this.token_type(path) === 'code-link' ? this.Token_link(path) : super.Token(path);
            }
            token_type(path) {
                return this.tokens([...path.slice(0, path.length - 1)])[path[path.length - 1]].name;
            }
            token_content(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                switch (token.name) {
                    case 'code-string': return [
                        token.found[0],
                        ...this.row_content(path),
                        token.found[token.found.length - 1],
                    ];
                    default: return [token.found];
                }
            }
            token_text(path) {
                const tokens = this.tokens([...path.slice(0, path.length - 1)]);
                const token = tokens[path[path.length - 1]];
                return token.found;
            }
            token_uri(path) {
                const uri = this.token_text(path);
                return this.uri_resolve(uri);
            }
            *view_find(check, path = []) {
                if (check(this, this.text())) {
                    yield [...path, this];
                }
            }
            find_pos(offset) {
                return this.find_token_pos([offset]);
            }
            find_token_pos([offset, ...path]) {
                for (const [index, token] of this.tokens(path).entries()) {
                    if (token.found.length >= offset) {
                        const token = this.Token([...path, index]);
                        return { token, offset };
                    }
                    else {
                        offset -= token.found.length;
                    }
                }
                return null;
            }
        }
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "tokens", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "row_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_type", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_content", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "token_uri", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_pos", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code_line.prototype, "find_token_pos", null);
        $$.$mol_text_code_line = $mol_text_code_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem } = $mol_style_unit;
        $mol_style_define($mol_text_code_line, {
            display: 'block',
            position: 'relative',
            font: {
                family: 'monospace',
            },
            Numb: {
                textAlign: 'end',
                color: $mol_theme.shade,
                width: rem(3),
                margin: {
                    inlineStart: '-4rem',
                },
                display: 'inline-block',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                position: 'absolute',
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_blob = ($node.buffer?.Blob ?? $mol_dom_context.Blob);
})($ || ($ = {}));

;
	($.$mol_icon_clipboard) = class $mol_icon_clipboard extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3";
		}
	};


;
"use strict";


;
	($.$mol_icon_clipboard_outline) = class $mol_icon_clipboard_outline extends ($.$mol_icon) {
		path(){
			return "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z";
		}
	};


;
"use strict";


;
	($.$mol_button_copy) = class $mol_button_copy extends ($.$mol_button_minor) {
		text(){
			return (this.title());
		}
		text_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.text())], {"type": "text/plain"});
			return obj;
		}
		html(){
			return "";
		}
		html_blob(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_blob([(this.html())], {"type": "text/html"});
			return obj;
		}
		Icon(){
			const obj = new this.$.$mol_icon_clipboard_outline();
			return obj;
		}
		title(){
			return "";
		}
		blobs(){
			return [(this.text_blob()), (this.html_blob())];
		}
		data(){
			return {};
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_copy.prototype), "text_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "html_blob"));
	($mol_mem(($.$mol_button_copy.prototype), "Icon"));


;
"use strict";
var $;
(function ($) {
    const mapping = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
    };
    function $mol_html_encode(text) {
        return text.replace(/[&<">]/gi, str => mapping[str]);
    }
    $.$mol_html_encode = $mol_html_encode;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Button copy text() value to clipboard
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button_copy extends $.$mol_button_copy {
            data() {
                return Object.fromEntries(this.blobs().map(blob => [blob.type, blob]));
            }
            html() {
                return $mol_html_encode(this.text());
            }
            attachments() {
                return [new ClipboardItem(this.data())];
            }
            click(event) {
                const cb = $mol_wire_sync(this.$.$mol_dom_context.navigator.clipboard);
                cb.writeText?.(this.text());
                cb.write?.(this.attachments());
                if (cb.writeText === undefined && cb.write === undefined) {
                    throw new Error("doesn't support copy to clipoard");
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "html", null);
        __decorate([
            $mol_mem
        ], $mol_button_copy.prototype, "attachments", null);
        $$.$mol_button_copy = $mol_button_copy;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_text_code) = class $mol_text_code extends ($.$mol_stack) {
		sidebar_showed(){
			return false;
		}
		render_visible_only(){
			return false;
		}
		row_numb(id){
			return 0;
		}
		row_theme(id){
			return "";
		}
		row_text(id){
			return "";
		}
		syntax(){
			return null;
		}
		uri_resolve(id){
			return "";
		}
		highlight(){
			return "";
		}
		Row(id){
			const obj = new this.$.$mol_text_code_line();
			(obj.numb_showed) = () => ((this.sidebar_showed()));
			(obj.numb) = () => ((this.row_numb(id)));
			(obj.theme) = () => ((this.row_theme(id)));
			(obj.text) = () => ((this.row_text(id)));
			(obj.syntax) = () => ((this.syntax()));
			(obj.uri_resolve) = (id) => ((this.uri_resolve(id)));
			(obj.highlight) = () => ((this.highlight()));
			return obj;
		}
		rows(){
			return [(this.Row("0"))];
		}
		Rows(){
			const obj = new this.$.$mol_list();
			(obj.render_visible_only) = () => ((this.render_visible_only()));
			(obj.rows) = () => ((this.rows()));
			return obj;
		}
		text_export(){
			return "";
		}
		Copy(){
			const obj = new this.$.$mol_button_copy();
			(obj.hint) = () => ((this.$.$mol_locale.text("$mol_text_code_Copy_hint")));
			(obj.text) = () => ((this.text_export()));
			return obj;
		}
		attr(){
			return {...(super.attr()), "mol_text_code_sidebar_showed": (this.sidebar_showed())};
		}
		text(){
			return "";
		}
		text_lines(){
			return [];
		}
		find_pos(id){
			return null;
		}
		uri_base(){
			return "";
		}
		row_themes(){
			return [];
		}
		sub(){
			return [(this.Rows()), (this.Copy())];
		}
	};
	($mol_mem_key(($.$mol_text_code.prototype), "Row"));
	($mol_mem(($.$mol_text_code.prototype), "Rows"));
	($mol_mem(($.$mol_text_code.prototype), "Copy"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Code visualizer.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_text_code_demo
         */
        class $mol_text_code extends $.$mol_text_code {
            render_visible_only() {
                return this.$.$mol_support_css_overflow_anchor();
            }
            text_lines() {
                return (this.text() ?? '').split('\n');
            }
            rows() {
                return this.text_lines().map((_, index) => this.Row(index + 1));
            }
            row_text(index) {
                return this.text_lines()[index - 1];
            }
            row_numb(index) {
                return index;
            }
            find_pos(offset) {
                for (const [index, line] of this.text_lines().entries()) {
                    if (line.length >= offset) {
                        return this.Row(index + 1).find_pos(offset);
                    }
                    else {
                        offset -= line.length + 1;
                    }
                }
                return null;
            }
            sub() {
                return [
                    this.Rows(),
                    ...this.sidebar_showed() ? [this.Copy()] : []
                ];
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
            uri_base() {
                return $mol_dom_context.document.location.href;
            }
            uri_resolve(uri) {
                if (/^(\w+script+:)+/.test(uri))
                    return null;
                try {
                    const url = new URL(uri, this.uri_base());
                    return url.toString();
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            text_export() {
                return this.text() + '\n';
            }
            row_theme(row) {
                return this.row_themes()[row - 1];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "text_lines", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "rows", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "row_text", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "find_pos", null);
        __decorate([
            $mol_mem
        ], $mol_text_code.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_text_code.prototype, "uri_resolve", null);
        $$.$mol_text_code = $mol_text_code;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { rem, px } = $mol_style_unit;
        $mol_style_define($mol_text_code, {
            whiteSpace: 'pre-wrap',
            font: {
                family: 'monospace',
            },
            Rows: {
                padding: $mol_gap.text,
                minWidth: 0,
            },
            Row: {
                font: {
                    family: 'inherit',
                },
            },
            Copy: {
                alignSelf: 'flex-start',
                justifySelf: 'flex-start',
            },
            '@': {
                'mol_text_code_sidebar_showed': {
                    true: {
                        $mol_text_code_line: {
                            margin: {
                                inlineStart: '1.75rem',
                            },
                        },
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_textarea) = class $mol_textarea extends ($.$mol_stack) {
		clickable(next){
			if(next !== undefined) return next;
			return false;
		}
		sidebar_showed(){
			return false;
		}
		press(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return "";
		}
		hint(){
			return " ";
		}
		enabled(){
			return true;
		}
		spellcheck(){
			return true;
		}
		length_max(){
			return +Infinity;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		bring(){
			return (this.Edit().bring());
		}
		submit(next){
			if(next !== undefined) return next;
			return null;
		}
		submit_with_ctrl(){
			return true;
		}
		Edit(){
			const obj = new this.$.$mol_textarea_edit();
			(obj.value) = (next) => ((this.value(next)));
			(obj.hint) = () => ((this.hint()));
			(obj.enabled) = () => ((this.enabled()));
			(obj.spellcheck) = () => ((this.spellcheck()));
			(obj.length_max) = () => ((this.length_max()));
			(obj.selection) = (next) => ((this.selection(next)));
			(obj.submit) = (next) => ((this.submit(next)));
			(obj.submit_with_ctrl) = () => ((this.submit_with_ctrl()));
			return obj;
		}
		row_numb(id){
			return 0;
		}
		highlight(){
			return "";
		}
		syntax(){
			const obj = new this.$.$mol_syntax2();
			return obj;
		}
		View(){
			const obj = new this.$.$mol_text_code();
			(obj.attr) = () => ({...(this.$.$mol_text_code.prototype.attr.call(obj)), "inert": ""});
			(obj.text) = () => ((this.value()));
			(obj.render_visible_only) = () => (false);
			(obj.row_numb) = (id) => ((this.row_numb(id)));
			(obj.sidebar_showed) = () => ((this.sidebar_showed()));
			(obj.highlight) = () => ((this.highlight()));
			(obj.syntax) = () => ((this.syntax()));
			return obj;
		}
		attr(){
			return {
				...(super.attr()), 
				"mol_textarea_clickable": (this.clickable()), 
				"mol_textarea_sidebar_showed": (this.sidebar_showed())
			};
		}
		event(){
			return {"keydown": (next) => (this.press(next)), "pointermove": (next) => (this.hover(next))};
		}
		sub(){
			return [(this.Edit()), (this.View())];
		}
		symbols_alt(){
			return {
				"comma": "<", 
				"period": ">", 
				"dash": "−", 
				"equals": "≈", 
				"graveAccent": "́", 
				"forwardSlash": "÷", 
				"E": "€", 
				"V": "✔", 
				"X": "×", 
				"C": "©", 
				"P": "§", 
				"H": "₽", 
				"key0": "°", 
				"key8": "•", 
				"key2": "@", 
				"key3": "#", 
				"key4": "$", 
				"key6": "^", 
				"key7": "&", 
				"bracketOpen": "[", 
				"bracketClose": "]", 
				"slashBack": "|"
			};
		}
		symbols_alt_ctrl(){
			return {"space": " "};
		}
		symbols_alt_shift(){
			return {
				"V": "✅", 
				"X": "❌", 
				"O": "⭕", 
				"key1": "❗", 
				"key4": "💲", 
				"key7": "❓", 
				"comma": "«", 
				"period": "»", 
				"semicolon": "“", 
				"quoteSingle": "”", 
				"dash": "—", 
				"equals": "≠", 
				"graveAccent": "̱", 
				"bracketOpen": "{", 
				"bracketClose": "}"
			};
		}
	};
	($mol_mem(($.$mol_textarea.prototype), "clickable"));
	($mol_mem(($.$mol_textarea.prototype), "press"));
	($mol_mem(($.$mol_textarea.prototype), "hover"));
	($mol_mem(($.$mol_textarea.prototype), "value"));
	($mol_mem(($.$mol_textarea.prototype), "selection"));
	($mol_mem(($.$mol_textarea.prototype), "submit"));
	($mol_mem(($.$mol_textarea.prototype), "Edit"));
	($mol_mem(($.$mol_textarea.prototype), "syntax"));
	($mol_mem(($.$mol_textarea.prototype), "View"));
	($.$mol_textarea_edit) = class $mol_textarea_edit extends ($.$mol_string) {
		dom_name(){
			return "textarea";
		}
		enter(){
			return "enter";
		}
		field(){
			return {...(super.field()), "scrollTop": 0};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * An input field for entering multiline text.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_textarea_demo
         */
        class $mol_textarea extends $.$mol_textarea {
            indent_inc() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    let end = start + rows[i].length;
                    if (end >= from && start <= to) {
                        if (to === from || start !== to) {
                            rows[i] = '\t' + rows[i];
                            to += 1;
                            end += 1;
                        }
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from + 1, to]);
            }
            indent_dec() {
                let text = this.value();
                let [from, to] = this.selection();
                const rows = text.split('\n');
                let start = 0;
                for (let i = 0; i < rows.length; ++i) {
                    const end = start + rows[i].length;
                    if (end >= from && start <= to && rows[i].startsWith('\t')) {
                        rows[i] = rows[i].slice(1);
                        to -= 1;
                        if (start < from)
                            from -= 1;
                    }
                    start = end + 1;
                }
                this.value(rows.join('\n'));
                this.selection([from, to]);
            }
            symbol_insert(event) {
                const symbol = event.shiftKey
                    ? this.symbols_alt_shift()[$mol_keyboard_code[event.keyCode]]
                    : event.ctrlKey
                        ? this.symbols_alt_ctrl()[$mol_keyboard_code[event.keyCode]]
                        : this.symbols_alt()[$mol_keyboard_code[event.keyCode]];
                if (!symbol)
                    return;
                event.preventDefault();
                document.execCommand('insertText', false, symbol);
            }
            clickable(next) {
                if (!this.enabled())
                    return true;
                return next ?? false;
            }
            hover(event) {
                this.clickable(event.ctrlKey);
            }
            press(event) {
                if (event.altKey) {
                    this.symbol_insert(event);
                }
                else {
                    switch (event.keyCode) {
                        case !event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_inc();
                            break;
                        case event.shiftKey && $mol_keyboard_code.tab:
                            this.indent_dec();
                            break;
                        default: return;
                    }
                    event.preventDefault();
                }
            }
            row_numb(index) {
                return index;
            }
            syntax() {
                return this.$.$mol_syntax2_md_code;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_textarea.prototype, "clickable", null);
        $$.$mol_textarea = $mol_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/textarea/textarea.view.css", "[mol_textarea] {\n\tflex: 1 0 auto;\n\tflex-direction: column;\n\tvertical-align: top;\n\tmin-height: max-content;\n\twhite-space: pre-wrap;\n\tword-break: break-word;\n\tborder-radius: var(--mol_gap_round);\n\tfont-family: monospace;\n\tposition: relative;\n\ttab-size: 4;\n}\n\n[mol_textarea_view] {\n\tpointer-events: none;\n\twhite-space: inherit;\n\tfont-family: inherit;\n\ttab-size: inherit;\n\tuser-select: none;\n}\n\n[mol_textarea_view_copy] {\n\tpointer-events: all;\n}\n\n[mol_textarea_clickable] > [mol_textarea_view] {\n\tpointer-events: all;\n\tuser-select: auto;\n}\n\n[mol_textarea_clickable] > [mol_textarea_edit] {\n\tuser-select: none;\n}\n\n[mol_textarea_edit] {\n\tfont-family: inherit;\n\tpadding: var(--mol_gap_text);\n\tcolor: transparent !important;\n\tcaret-color: var(--mol_theme_text);\n\tresize: none;\n\ttext-align: inherit;\n\twhite-space: inherit;\n\tborder-radius: inherit;\n\toverflow-anchor: none;\n\tposition: absolute;\n\theight: 100%;\n\twidth: 100%;\n\ttab-size: inherit;\n}\n\n[mol_textarea_sidebar_showed] [mol_textarea_edit] {\n\tleft: 1.75rem;\n\twidth: calc( 100% - 1.75rem );\n}\n\n[mol_textarea_edit]:hover + [mol_textarea_view] {\n\tz-index: var(--mol_layer_hover);\n}\n\n[mol_textarea_edit]:focus + [mol_textarea_view] {\n\tz-index: var(--mol_layer_focus);\n}\n");
})($ || ($ = {}));

;
	($.$mol_check_expand) = class $mol_check_expand extends ($.$mol_check) {
		level_style(){
			return "0px";
		}
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return false;
		}
		Icon(){
			const obj = new this.$.$mol_icon_chevron();
			return obj;
		}
		level(){
			return 0;
		}
		style(){
			return {...(super.style()), "paddingLeft": (this.level_style())};
		}
		checked(next){
			return (this.expanded(next));
		}
		enabled(){
			return (this.expandable());
		}
	};
	($mol_mem(($.$mol_check_expand.prototype), "expanded"));
	($mol_mem(($.$mol_check_expand.prototype), "Icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Expander for trees, lists, etc
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_expand_demo
         */
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/expand/expand.view.css", "[mol_check_expand] {\n\tmin-width: 20px;\n}\n\n:where([mol_check_expand][disabled]) [mol_check_expand_icon] {\n\tvisibility: hidden;\n}\n\n[mol_check_expand_icon] {\n\tbox-shadow: none;\n\tmargin-inline-start: -0.375rem;\n}\n[mol_check_expand_icon] {\n\ttransform: rotateZ(0deg);\n}\n\n:where([mol_check_checked]) [mol_check_expand_icon] {\n\ttransform: rotateZ(90deg);\n}\n\n[mol_check_expand_icon] {\n\tvertical-align: text-top;\n}\n\n[mol_check_expand_label] {\n\tmargin-inline-start: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_plus) = class $mol_icon_plus extends ($.$mol_icon) {
		path(){
			return "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
		}
	};


;
"use strict";


;
	($.$mol_drag) = class $mol_drag extends ($.$mol_ghost) {
		start(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_start(next){
			return (this.start(next));
		}
		move(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_move(next){
			return (this.move(next));
		}
		end(next){
			if(next !== undefined) return next;
			return null;
		}
		drag_end(next){
			return (this.end(next));
		}
		draggable(){
			return true;
		}
		status(next){
			if(next !== undefined) return next;
			return "ready";
		}
		plain(){
			return (this.title());
		}
		html(){
			return "";
		}
		uris(){
			return "";
		}
		event(){
			return {
				...(super.event()), 
				"dragstart": (next) => (this.drag_start(next)), 
				"drag": (next) => (this.drag_move(next)), 
				"dragend": (next) => (this.drag_end(next))
			};
		}
		attr(){
			return {
				...(super.attr()), 
				"draggable": (this.draggable()), 
				"mol_drag_status": (this.status())
			};
		}
		transfer(){
			return {
				"text/plain": (this.plain()), 
				"text/html": (this.html()), 
				"text/uri-list": (this.uris())
			};
		}
		allow_copy(){
			return true;
		}
		allow_link(){
			return true;
		}
		allow_move(){
			return true;
		}
		image(){
			return (this.dom_node());
		}
	};
	($mol_mem(($.$mol_drag.prototype), "start"));
	($mol_mem(($.$mol_drag.prototype), "move"));
	($mol_mem(($.$mol_drag.prototype), "end"));
	($mol_mem(($.$mol_drag.prototype), "status"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_drag_demo
         */
        class $mol_drag extends $.$mol_drag {
            status(next = 'ready') { return next; }
            drag_start(event) {
                setTimeout(() => this.status('drag'));
                const transfer = this.transfer();
                for (let type in transfer) {
                    event.dataTransfer.setData(type, transfer[type]);
                }
                event.dataTransfer.setDragImage(this.image(), 0, -32);
                const effects = [];
                if (this.allow_copy())
                    effects.push('Copy');
                if (this.allow_link())
                    effects.push('Link');
                if (this.allow_move())
                    effects.push('Move');
                let effectAllowed = effects[0].toLowerCase() + effects.slice(1).join('');
                if (effectAllowed === 'copyLinkMove')
                    effectAllowed = 'all';
                event.dataTransfer.effectAllowed = effectAllowed;
                this.start(event);
            }
            drag_end(event) {
                setTimeout(() => this.status('ready'));
                this.end(event);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_drag.prototype, "status", null);
        $$.$mol_drag = $mol_drag;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_circle) = class $mol_icon_circle extends ($.$mol_icon) {
		path(){
			return "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_circle_off_outline) = class $mol_icon_circle_off_outline extends ($.$mol_icon) {
		path(){
			return "M22.11 21.46L2.39 1.73L1.11 3L4.06 5.95C2.78 7.63 2 9.72 2 12C2 17.5 6.5 22 12 22C14.28 22 16.37 21.23 18.05 19.94L20.84 22.73L22.11 21.46M12 20C7.58 20 4 16.42 4 12C4 10.27 4.56 8.68 5.5 7.38L16.62 18.5C15.32 19.45 13.73 20 12 20M8.17 4.97L6.72 3.5C8.25 2.56 10.06 2 12 2C17.5 2 22 6.5 22 12C22 13.94 21.44 15.75 20.5 17.28L19.03 15.83C19.65 14.69 20 13.39 20 12C20 7.58 16.42 4 12 4C10.61 4 9.31 4.35 8.17 4.97Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_flag) = class $mol_icon_flag extends ($.$mol_icon) {
		path(){
			return "M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_flag_checkered) = class $mol_icon_flag_checkered extends ($.$mol_icon) {
		path(){
			return "M14.4,6H20V16H13L12.6,14H7V21H5V4H14L14.4,6M14,14H16V12H18V10H16V8H14V10L13,8V6H11V8H9V6H7V8H9V10H7V12H9V10H11V12H13V10L14,12V14M11,10V8H13V10H11M14,10H16V12H14V10Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_pound) = class $mol_icon_pound extends ($.$mol_icon) {
		path(){
			return "M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_division) = class $mol_icon_division extends ($.$mol_icon) {
		path(){
			return "M19,13H5V11H19V13M12,5A2,2 0 0,1 14,7A2,2 0 0,1 12,9A2,2 0 0,1 10,7A2,2 0 0,1 12,5M12,15A2,2 0 0,1 14,17A2,2 0 0,1 12,19A2,2 0 0,1 10,17A2,2 0 0,1 12,15Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_clock) = class $mol_icon_clock extends ($.$mol_icon) {
		path(){
			return "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_clock_outline) = class $mol_icon_clock_outline extends ($.$mol_icon) {
		path(){
			return "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_card) = class $mol_icon_card extends ($.$mol_icon) {
		path(){
			return "M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_card_text) = class $mol_icon_card_text extends ($.$mol_icon) {
		path(){
			return "M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M5,13V15H16V13H5M5,9V11H19V9H5Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_card_text_outline) = class $mol_icon_card_text_outline extends ($.$mol_icon) {
		path(){
			return "M20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20M4,6V18H20V6H4M6,9H18V11H6V9M6,13H16V15H6V13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_format_list_bulleted) = class $mol_icon_format_list_bulleted extends ($.$mol_icon) {
		path(){
			return "M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_table) = class $mol_icon_table extends ($.$mol_icon) {
		path(){
			return "M5,4H19A2,2 0 0,1 21,6V18A2,2 0 0,1 19,20H5A2,2 0 0,1 3,18V6A2,2 0 0,1 5,4M5,8V12H11V8H5M13,8V12H19V8H13M5,14V18H11V14H5M13,14V18H19V14H13Z";
		}
	};


;
"use strict";


;
	($.$mol_vary_edit) = class $mol_vary_edit extends ($.$mol_list) {
		item_adopt(next){
			if(next !== undefined) return next;
			return null;
		}
		type_receive(next){
			if(next !== undefined) return next;
			return null;
		}
		type_label(id){
			return (this.Type().option_label(id));
		}
		Type_icon(id){
			const obj = new this.$.$mol_icon();
			return obj;
		}
		type_option_content(id){
			return [(this.Type_icon(id)), (this.type_label(id))];
		}
		enabled(){
			return true;
		}
		type_mutable(){
			return (this.enabled());
		}
		type_dict(){
			return {
				"Null": "Nothing", 
				"Bool": "Boolean", 
				"Bint": "Integer", 
				"Real": "Real", 
				"Text": "Text", 
				"List": "Array", 
				"Tupl": "Dictionary"
			};
		}
		type_auto(){
			return "Null";
		}
		type(next){
			if(next !== undefined) return next;
			return (this.type_auto());
		}
		Type(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.Trigger_icon) = () => (null);
			(obj.option_content) = (id) => ((this.type_option_content(id)));
			(obj.enabled) = () => ((this.type_mutable()));
			(obj.dictionary) = () => ((this.type_dict()));
			(obj.value) = (next) => ((this.type(next)));
			return obj;
		}
		Type_drop(){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.item_adopt(next)));
			(obj.receive) = (next) => ((this.type_receive(next)));
			(obj.Sub) = () => ((this.Type()));
			return obj;
		}
		bool(next){
			if(next !== undefined) return next;
			return false;
		}
		Bool(){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.bool(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		bint(next){
			if(next !== undefined) return next;
			return 0n;
		}
		text_selection(next){
			if(next !== undefined) return next;
			return [];
		}
		Bint(){
			const obj = new this.$.$mol_bigint_field();
			(obj.value) = (next) => ((this.bint(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		real(next){
			if(next !== undefined) return next;
			return 0;
		}
		Real(){
			const obj = new this.$.$mol_number();
			(obj.value) = (next) => ((this.real(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		date(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		Date(){
			const obj = new this.$.$mol_date();
			(obj.value_moment) = (next) => ((this.date(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		text(next){
			if(next !== undefined) return next;
			return "";
		}
		Text(){
			const obj = new this.$.$mol_textarea();
			(obj.value) = (next) => ((this.text(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		expanded(next){
			if(next !== undefined) return next;
			return true;
		}
		Item_expand(){
			const obj = new this.$.$mol_check_expand();
			(obj.expanded) = (next) => ((this.expanded(next)));
			return obj;
		}
		item_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Item_add_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Item_add(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.item_add(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.sub) = () => ([(this.Item_add_icon())]);
			return obj;
		}
		field_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Field_add_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Field_add(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("+");
			(obj.submit) = (next) => ((this.field_add(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.sub) = () => ([(this.Field_add_icon())]);
			return obj;
		}
		head(){
			return [
				(this.Bool()), 
				(this.Bint()), 
				(this.Real()), 
				(this.Date()), 
				(this.Text()), 
				(this.Item_expand()), 
				(this.Item_add()), 
				(this.Field_add())
			];
		}
		Head(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this.Type_drop()), ...(this.head())]);
			return obj;
		}
		item_receive(id, next){
			if(next !== undefined) return next;
			return null;
		}
		item_drag_end(id, next){
			if(next !== undefined) return next;
			return null;
		}
		transfer_vary(id){
			return "";
		}
		item_key(id){
			return null;
		}
		Item_key(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.item_key(id))]);
			return obj;
		}
		Item_drag(id){
			const obj = new this.$.$mol_drag();
			(obj.drag_end) = (next) => ((this.item_drag_end(id, next)));
			(obj.transfer) = () => ({
				"text/plain": (this.transfer_vary(id)), 
				"text/html": "", 
				"text/uri-list": (this.transfer_vary(id))
			});
			(obj.Sub) = () => ((this.Item_key(id)));
			return obj;
		}
		Item_drop(id){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.item_adopt(next)));
			(obj.receive) = (next) => ((this.item_receive(id, next)));
			(obj.Sub) = () => ((this.Item_drag(id)));
			return obj;
		}
		item_val(id, next){
			if(next !== undefined) return next;
			return null;
		}
		item_selection(id, next){
			if(next !== undefined) return next;
			return [];
		}
		Item_val(id){
			const obj = new this.$.$mol_vary_edit();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.item_val(id, next)));
			(obj.selection) = (next) => ((this.item_selection(id, next)));
			return obj;
		}
		Item(id){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this.Item_drop(id)), (this.Item_val(id))]);
			return obj;
		}
		body(){
			return [(this.Item("0"))];
		}
		Body(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.body()));
			return obj;
		}
		schema(){
			return null;
		}
		value(next){
			if(next !== undefined) return next;
			return null;
		}
		Vary(){
			const obj = new this.$.$mol_vary_class();
			return obj;
		}
		selection(next){
			if(next !== undefined) return next;
			return [];
		}
		Null_icon(){
			const obj = new this.$.$mol_icon_circle_off_outline();
			return obj;
		}
		Bool_icon(){
			const obj = new this.$.$mol_icon_flag_checkered();
			return obj;
		}
		Bint_icon(){
			const obj = new this.$.$mol_icon_pound();
			return obj;
		}
		Real_icon(){
			const obj = new this.$.$mol_icon_division();
			return obj;
		}
		Date_icon(){
			const obj = new this.$.$mol_icon_clock_outline();
			return obj;
		}
		Text_icon(){
			const obj = new this.$.$mol_icon_card_text_outline();
			return obj;
		}
		List_icon(){
			const obj = new this.$.$mol_icon_format_list_bulleted();
			return obj;
		}
		Tupl_icon(){
			const obj = new this.$.$mol_icon_table();
			return obj;
		}
		rows(){
			return [(this.Head()), (this.Body())];
		}
	};
	($mol_mem(($.$mol_vary_edit.prototype), "item_adopt"));
	($mol_mem(($.$mol_vary_edit.prototype), "type_receive"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Type_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "type"));
	($mol_mem(($.$mol_vary_edit.prototype), "Type"));
	($mol_mem(($.$mol_vary_edit.prototype), "Type_drop"));
	($mol_mem(($.$mol_vary_edit.prototype), "bool"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bool"));
	($mol_mem(($.$mol_vary_edit.prototype), "bint"));
	($mol_mem(($.$mol_vary_edit.prototype), "text_selection"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bint"));
	($mol_mem(($.$mol_vary_edit.prototype), "real"));
	($mol_mem(($.$mol_vary_edit.prototype), "Real"));
	($mol_mem(($.$mol_vary_edit.prototype), "date"));
	($mol_mem(($.$mol_vary_edit.prototype), "Date"));
	($mol_mem(($.$mol_vary_edit.prototype), "text"));
	($mol_mem(($.$mol_vary_edit.prototype), "Text"));
	($mol_mem(($.$mol_vary_edit.prototype), "expanded"));
	($mol_mem(($.$mol_vary_edit.prototype), "Item_expand"));
	($mol_mem(($.$mol_vary_edit.prototype), "item_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Item_add_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Item_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "field_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Field_add_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Field_add"));
	($mol_mem(($.$mol_vary_edit.prototype), "Head"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_receive"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_drag_end"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_key"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_drag"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_drop"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_val"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "item_selection"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item_val"));
	($mol_mem_key(($.$mol_vary_edit.prototype), "Item"));
	($mol_mem(($.$mol_vary_edit.prototype), "Body"));
	($mol_mem(($.$mol_vary_edit.prototype), "value"));
	($mol_mem(($.$mol_vary_edit.prototype), "Vary"));
	($mol_mem(($.$mol_vary_edit.prototype), "selection"));
	($mol_mem(($.$mol_vary_edit.prototype), "Null_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bool_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Bint_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Real_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Date_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Text_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "List_icon"));
	($mol_mem(($.$mol_vary_edit.prototype), "Tupl_icon"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_vary_edit extends $.$mol_vary_edit {
            Vary() {
                return this.$.$mol_vary;
            }
            type(next) {
                if (next !== undefined) {
                    switch (next) {
                        case 'Null':
                            this.value(null);
                            return next;
                        case 'Bool':
                            this.bool(this.bool());
                            return next;
                        case 'Bint':
                            this.bint(this.bint());
                            return next;
                        case 'Real':
                            this.real(this.real());
                            return next;
                        case 'Date':
                            this.date(this.date());
                            return next;
                        case 'Text':
                            this.text(this.text());
                            return next;
                        case 'List':
                            this.list(this.list());
                            return next;
                        case 'Tupl':
                            this.tupl(this.tupl());
                            return next;
                    }
                }
                const schema = this.schema();
                if (schema)
                    return schema;
                return this.type_auto();
            }
            type_auto() {
                const val = this.value();
                if (val == null)
                    return 'Null';
                switch (typeof val) {
                    case 'boolean': return 'Bool';
                    case 'bigint': return 'Bint';
                    case 'number': return 'Real';
                    case 'string': return 'Text';
                }
                if (Array.isArray(val))
                    return 'List';
                if (val instanceof Date)
                    return 'Date';
                return 'Tupl';
            }
            type_mutable() {
                return this.enabled() && !this.schema();
            }
            type_option_content(type) {
                if (type == this.type())
                    return [this.Type_icon(type)];
                return super.type_option_content(type);
            }
            Type_icon(type) {
                switch (type) {
                    case 'Bool': return this.Bool_icon();
                    case 'Bint': return this.Bint_icon();
                    case 'Real': return this.Real_icon();
                    case 'Date': return this.Date_icon();
                    case 'Text': return this.Text_icon();
                    case 'List': return this.List_icon();
                    case 'Tupl': return this.Tupl_icon();
                }
                return this.Null_icon();
            }
            bool(next) {
                return Boolean(this.value(next));
            }
            bint(next) {
                return BigInt(this.value(next) ?? 0n);
            }
            real(next) {
                return Number(this.value(next));
            }
            date(next) {
                return new $mol_time_moment(this.value(next?.native));
            }
            text(next) {
                return String(this.value(next) ?? '');
            }
            list(next) {
                return [].concat(this.value(next));
            }
            tupl(next) {
                let val = next ? this.Vary().rich(next[0] ?? [], next[1] ?? [[], []]) : undefined;
                val = this.value(val) ?? {};
                return this.Vary().lean(val);
            }
            head() {
                const type = this.type();
                return [
                    ...type === 'Bool' ? [this.Bool()] : [],
                    ...type === 'Bint' ? [this.Bint()] : [],
                    ...type === 'Real' ? [this.Real()] : [],
                    ...type === 'Date' ? [this.Date()] : [],
                    ...type === 'Text' ? [this.Text()] : [],
                    ...type === 'List' || type === 'Tupl' ? [this.Item_expand()] : [],
                    ...type === 'List' && this.enabled() ? [this.Item_add()] : [],
                    ...type === 'Tupl' && this.enabled() ? [this.Field_add()] : [],
                ];
            }
            body() {
                if (!this.expanded())
                    return [];
                switch (this.type()) {
                    case 'List': return this.list().map((_, index) => this.Item(index));
                    case 'Tupl': return this.tupl()[0].map((_, index) => this.Item(index));
                }
                return [];
            }
            item_key(index) {
                switch (this.type()) {
                    case 'Tupl': return this.tupl()[0][index];
                }
                return index;
            }
            item_val(index, next) {
                switch (this.type()) {
                    case 'List': {
                        let list = this.list();
                        if (next !== undefined)
                            list = this.list([
                                ...list.slice(0, index),
                                ...next === null ? [] : [next],
                                ...list.slice(index + 1),
                            ]);
                        return list[index];
                    }
                    case 'Tupl': {
                        let tupl = this.tupl();
                        if (next !== undefined)
                            tupl = this.tupl([
                                [
                                    ...tupl[0].slice(0, index),
                                    ...next === null ? [] : [tupl[0][index]],
                                    ...tupl[0].slice(index + 1),
                                ],
                                [
                                    ...tupl[1].slice(0, index),
                                    ...next === null ? [] : [next],
                                    ...tupl[1].slice(index + 1),
                                ],
                            ]);
                        return next === null ? null : tupl[1][index] ?? null;
                    }
                }
                return null;
            }
            item_add() {
                this.list([undefined, ...this.list()]);
            }
            field_add() {
                const tupl = this.tupl();
                this.tupl([
                    [this.Field_add().value(), ...tupl[0]],
                    [undefined, ...tupl[1]],
                ]);
                this.Field_add().value('');
            }
            text_selection(next) {
                const sel = this.selection(next === undefined ? undefined : ['', next[0], next[1]]);
                if (sel[0] !== '')
                    return [0, 0];
                return [sel[1], sel[2]];
            }
            item_selection(index, next) {
                const prefix = '/' + index;
                const sel = this.selection(next === undefined ? undefined : [prefix + next[0], next[1], next[2]]);
                if (!sel[0]?.startsWith(prefix))
                    return ['', 0, 0];
                return [sel[0].slice(prefix.length), sel[1], sel[2]];
            }
            _last_drop_index = 0;
            transfer_vary(index) {
                this._last_drop_index = 0;
                const data = [
                    this.item_val(index),
                    this.item_key(index),
                ];
                const buf = this.Vary().pack(data);
                return 'data:application/x-vary;base64,' + $mol_base64_encode(buf);
            }
            item_adopt(transfer) {
                const uri = transfer.getData('text/uri-list');
                const match = uri.match(/^data:application\/x-vary;base64,(.*)$/);
                if (!match)
                    return null;
                const buf = $mol_base64_decode(match[1]);
                return this.Vary().take(buf);
            }
            type_receive([val, key]) {
                this._last_drop_index = 0;
                switch (this.type()) {
                    case 'List': {
                        this.list([val, ...this.list()]);
                        return;
                    }
                    case 'Tupl': {
                        const tupl = this.tupl();
                        this.tupl([
                            [key, ...tupl[0]],
                            [val, ...tupl[1]],
                        ]);
                    }
                }
            }
            item_receive(index, [val, key]) {
                this._last_drop_index = index;
                switch (this.type()) {
                    case 'List': {
                        const list = this.list();
                        this.list([
                            ...list.slice(0, index + 1),
                            val,
                            ...list.slice(index + 1),
                        ]);
                        return;
                    }
                    case 'Tupl': {
                        const tupl = this.tupl().map(list => [...list]);
                        const pos = tupl[0].indexOf(key);
                        if (pos >= 0) {
                            tupl[0].splice(pos, 1);
                            tupl[1].splice(pos, 1);
                            if (pos < index)
                                index--;
                        }
                        this.tupl([
                            [
                                ...tupl[0].slice(0, index + 1),
                                key,
                                ...tupl[0].slice(index + 1),
                            ],
                            [
                                ...tupl[1].slice(0, index + 1),
                                val,
                                ...tupl[1].slice(index + 1),
                            ],
                        ]);
                    }
                }
            }
            item_drag_end(index, event) {
                if (event.dataTransfer?.dropEffect !== 'move')
                    return;
                if (this._last_drop_index <= index)
                    index++;
                switch (this.type()) {
                    case 'List': {
                        let list = this.list();
                        this.list([
                            ...list.slice(0, index),
                            ...list.slice(index + 1),
                        ]);
                    }
                }
                return;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "type_auto", null);
        __decorate([
            $mol_mem_key
        ], $mol_vary_edit.prototype, "Type_icon", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "bool", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "bint", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "real", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "date", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "text", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "list", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "tupl", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "head", null);
        __decorate([
            $mol_mem
        ], $mol_vary_edit.prototype, "body", null);
        __decorate([
            $mol_mem_key
        ], $mol_vary_edit.prototype, "item_key", null);
        __decorate([
            $mol_mem_key
        ], $mol_vary_edit.prototype, "item_val", null);
        __decorate([
            $mol_action
        ], $mol_vary_edit.prototype, "item_add", null);
        __decorate([
            $mol_action
        ], $mol_vary_edit.prototype, "field_add", null);
        $$.$mol_vary_edit = $mol_vary_edit;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_vary_edit, {
            Head: {
                background: {
                    color: $mol_theme.card,
                },
                box: {
                    shadow: [['inset', '0px', '0px', '0px', '1px', $mol_theme.field]],
                },
            },
            Body: {
                display: 'table',
            },
            Type: {
                width: '2.5rem',
                color: $mol_theme.shade,
                Trigger: {
                    padding: $mol_gap.text,
                },
                Option_row: {
                    padding: $mol_gap.text,
                },
            },
            Bint: {
                flex: {
                    grow: 1,
                },
            },
            Real: {
                flex: {
                    grow: 1,
                },
            },
            Text: {
                flex: {
                    shrink: 1,
                },
            },
            Field_add: {
                background: 'none',
                box: {
                    shadow: 'none',
                },
            },
            Item_expand: {
                Icon: {
                    margin: 0,
                },
            },
            Item: {
                display: 'table-row',
            },
            Item_key: {
                padding: $mol_gap.text,
                // color: $mol_theme.shade,
                justify: {
                    content: 'center',
                },
                minWidth: '2.5rem',
                display: 'table-cell',
                verticalAlign: 'top',
            },
            Item_val: {
                flex: {
                    grow: 1,
                },
                width: `100%`,
                display: 'table-cell',
            },
            Item_drag: {
                cursor: 'move',
            },
            Type_drop: {
                '[mol_drop_status]': {
                    drag: {
                        box: {
                            shadow: [['0px', '1px', '0px', '0px', $mol_theme.focus]],
                        },
                    }
                },
            },
            Item_drop: {
                '[mol_drop_status]': {
                    drag: {
                        box: {
                            shadow: [['0px', '1px', '0px', '0px', $mol_theme.focus]],
                        },
                    }
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_link) = class $mol_icon_link extends ($.$mol_icon) {
		path(){
			return "M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z";
		}
	};


;
"use strict";


;
	($.$giper_baza_vary_edit) = class $giper_baza_vary_edit extends ($.$mol_vary_edit) {
		link(){
			const obj = new this.$.$giper_baza_link();
			return obj;
		}
		Vary(){
			const obj = new this.$.$mol_vary_class();
			return obj;
		}
		Link_icon(){
			const obj = new this.$.$mol_icon_link();
			return obj;
		}
		Link(){
			const obj = new this.$.$giper_baza_link_chip();
			(obj.link) = () => ((this.link()));
			return obj;
		}
		type_dict(){
			return {...(super.type_dict()), "Link": "Link"};
		}
	};
	($mol_mem(($.$giper_baza_vary_edit.prototype), "link"));
	($mol_mem(($.$giper_baza_vary_edit.prototype), "Vary"));
	($mol_mem(($.$giper_baza_vary_edit.prototype), "Link_icon"));
	($mol_mem(($.$giper_baza_vary_edit.prototype), "Link"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_vary_edit extends $.$giper_baza_vary_edit {
            get $() {
                if (super.$.$mol_vary_edit === this.constructor)
                    return super.$;
                return super.$.$mol_ambient({
                    $mol_vary_edit: super.$.$giper_baza_vary_edit,
                    $mol_vary: super.$.$giper_baza_vary,
                });
            }
            type(next) {
                if (next !== undefined) {
                    switch (next) {
                        case 'Link':
                            this.link(this.link());
                            return next;
                    }
                }
                return super.type(next);
            }
            type_auto() {
                const val = this.value();
                if (val instanceof $giper_baza_link)
                    return 'Link';
                return super.type_auto();
            }
            Type_icon(type) {
                switch (type) {
                    case 'Link': return this.Link_icon();
                }
                return super.Type_icon(type);
            }
            link(next) {
                const val = this.value(next);
                if (val instanceof $giper_baza_link)
                    return val;
                if (typeof val === 'string')
                    return new $giper_baza_link(val);
                return $giper_baza_link.hole;
            }
            head() {
                const type = this.type();
                if (type === 'Link')
                    return [this.Link()];
                return super.head();
            }
        }
        __decorate([
            $mol_memo.field
        ], $giper_baza_vary_edit.prototype, "$", null);
        __decorate([
            $mol_mem
        ], $giper_baza_vary_edit.prototype, "type_auto", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_vary_edit.prototype, "Type_icon", null);
        __decorate([
            $mol_mem
        ], $giper_baza_vary_edit.prototype, "head", null);
        $$.$giper_baza_vary_edit = $giper_baza_vary_edit;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_unit_sand_dump) = class $giper_baza_unit_sand_dump extends ($.$giper_baza_vary_edit) {
		land(){
			const obj = new this.$.$giper_baza_land();
			return obj;
		}
		sand(){
			const obj = new this.$.$giper_baza_unit_sand();
			return obj;
		}
	};
	($mol_mem(($.$giper_baza_unit_sand_dump.prototype), "land"));
	($mol_mem(($.$giper_baza_unit_sand_dump.prototype), "sand"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_unit_sand_dump extends $.$giper_baza_unit_sand_dump {
            value(next) {
                const sand = this.sand();
                if (next === undefined)
                    return this.land().sand_decode(sand);
                this.land().post(sand.lead(), sand.head(), sand.self(), next, sand.tag());
                return next;
            }
        }
        $$.$giper_baza_unit_sand_dump = $giper_baza_unit_sand_dump;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_unit_sand_dump, {});
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { unicode_only, line_end, tab, repeat_greedy, optional, forbid_after, force_after, char_only, char_except } = $mol_regexp;
    $.$giper_baza_text_tokens = $mol_regexp.from({
        token: {
            'line-break': line_end,
            'indents': repeat_greedy(tab, 1),
            'emoji': [
                unicode_only('Extended_Pictographic'),
                optional(unicode_only('Emoji_Modifier')),
                repeat_greedy([
                    unicode_only('Emoji_Component'),
                    unicode_only('Extended_Pictographic'),
                    optional(unicode_only('Emoji_Modifier')),
                ]),
            ],
            'link': /\b(https?:\/\/[^\s,.;:!?")]+(?:[,.;:!?")][^\s,.;:!?")]+)+)/,
            'Word': [
                [char_only(' ', 0xA0)],
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]), 1),
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ])),
            ],
            'word': [
                [char_only(' ', 0xA0)],
                repeat_greedy(char_only([
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]), 1),
            ],
            'spaces': [
                forbid_after(line_end),
                repeat_greedy(unicode_only('White_Space'), 1),
                force_after(unicode_only('White_Space')),
            ],
            'space': [
                forbid_after(line_end),
                unicode_only('White_Space'),
                forbid_after([
                    unicode_only('White_Space'),
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                ]),
            ],
            'others': [
                [char_only(' ', 0xA0)],
                repeat_greedy(char_except([
                    unicode_only('General_Category', 'Uppercase_Letter'),
                    unicode_only('General_Category', 'Lowercase_Letter'),
                    unicode_only('Diacritic'),
                    unicode_only('General_Category', 'Number'),
                    unicode_only('White_Space'),
                ]), 1),
            ],
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'empty string'() {
            $mol_assert_equal(''.match($giper_baza_text_tokens), null);
        },
        'new lines'() {
            $mol_assert_equal('\n\r\n'.match($giper_baza_text_tokens), ['\n', '\r\n']);
        },
        'numbers'() {
            $mol_assert_equal('123'.match($giper_baza_text_tokens), ['123']);
        },
        'emoji'() {
            $mol_assert_equal('😀😁'.match($giper_baza_text_tokens), ['😀', '😁']);
        },
        'emoji with modifier'() {
            $mol_assert_equal('👩🏿👩🏿'.match($giper_baza_text_tokens), ['👩🏿', '👩🏿']);
        },
        'combo emoji with modifier'() {
            $mol_assert_equal('👩🏿‍🤝‍🧑🏿👩🏿‍🤝‍🧑🏿'.match($giper_baza_text_tokens), ['👩🏿‍🤝‍🧑🏿', '👩🏿‍🤝‍🧑🏿']);
        },
        'word with spaces'() {
            $mol_assert_equal('foo1  bar2'.match($giper_baza_text_tokens), ['foo1', ' ', ' bar2']);
        },
        'word with diactric'() {
            $mol_assert_equal('Е́е́'.match($giper_baza_text_tokens), ['Е́е́']);
        },
        'word with punctuation'() {
            $mol_assert_equal('foo--bar'.match($giper_baza_text_tokens), ['foo', '--', 'bar']);
        },
        'CamelCase'() {
            $mol_assert_equal('Foo1BAR2'.match($giper_baza_text_tokens), ['Foo1', 'BAR2']);
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Mergeable text Pawn */
    class $giper_baza_text extends $giper_baza_pawn {
        static tag = $giper_baza_unit_sand_tag[$giper_baza_unit_sand_tag.vals];
        value(next) {
            return this.text(next);
        }
        /** Text representation. Based on list of rows. */
        text(next) {
            if (next !== undefined) {
                const land = this.land();
                const prev = this.units();
                const lines = next.match(/.*\n|.+$/g) ?? [];
                $mol_reconcile({
                    prev,
                    from: 0,
                    to: prev.length,
                    next: lines,
                    equal: (next, prev) => {
                        //if( typeof prev.data === 'string' ) return false // ???
                        return land.Pawn($giper_baza_text).Head(prev.self()).str() === next;
                    },
                    drop: (prev, lead) => this.land().post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), null),
                    insert: (next, lead) => {
                        const sand = this.land().post(lead?.self() ?? $giper_baza_link.hole, this.head(), land.self_make(), 'p', 'vals');
                        land.Pawn($giper_baza_text).Head(sand.self()).str(next);
                        return sand;
                    },
                    replace: (next, prev, lead) => {
                        land.Pawn($giper_baza_text).Head(prev.self()).str(next);
                        return prev;
                    },
                });
            }
            return this.str();
        }
        /** Text representation. Based on list of tokens. */
        str(next) {
            if (next === undefined) {
                let str = '';
                const land = this.land();
                for (const unit of this.units()) {
                    if (unit.tag() === 'term')
                        str += $mol_schema_string.cast(land.sand_decode(unit));
                    else
                        str += land.Pawn($giper_baza_text).Head(unit.self()).str();
                }
                return str;
            }
            else {
                this.write(next, 0, -1);
                return this.str();
            }
        }
        write(next, str_from = -1, str_to = str_from) {
            const land = this.land();
            const list = this.units();
            let from = str_from < 0 ? list.length : 0;
            let word = '';
            while (from < list.length) {
                word = $mol_schema_string.cast(land.sand_decode(list[from]));
                if (str_from <= word.length) {
                    next = word.slice(0, str_from) + next;
                    break;
                }
                str_from -= word.length;
                if (str_to > 0)
                    str_to -= word.length;
                from++;
            }
            let to = str_to < 0 ? list.length : from;
            while (to < list.length) {
                word = $mol_schema_string.cast(land.sand_decode(list[to]));
                to++;
                if (str_to < word.length) {
                    next = next + word.slice(str_to);
                    break;
                }
                str_to -= word.length;
            }
            if (from && from === list.length) {
                --from;
                next = $mol_schema_string.cast(land.sand_decode(list[from])) + next;
            }
            const words = next.match($giper_baza_text_tokens) ?? [];
            this.cast($giper_baza_list).splice(words, from, to);
            return this;
        }
        point_by_offset(offset) {
            const land = this.land();
            let off = offset;
            for (const unit of this.units()) {
                if (unit.tag() === 'term') {
                    const len = $mol_schema_string.cast(land.sand_decode(unit)).length;
                    if (off <= len)
                        return [unit.self().str, off, 0];
                    else
                        off -= len;
                }
                else {
                    const found = land.Pawn($giper_baza_text).Head(unit.self()).point_by_offset(off);
                    if (found[0])
                        return found;
                    off = found[1];
                }
            }
            return ['', off, 0];
        }
        offset_by_point([self, offset]) {
            const land = this.land();
            for (const unit of this.units()) {
                if (unit.self().str === self)
                    return [self, offset];
                if (unit.tag() === 'term') {
                    offset += $mol_schema_string.cast(land.sand_decode(unit)).length;
                }
                else {
                    const found = land.Pawn($giper_baza_text).Head(unit.self()).offset_by_point([self, offset, 0]);
                    if (found[0])
                        return [self, found[1]];
                    offset = found[1];
                }
            }
            return ['', offset];
        }
        selection(lord, next) {
            const user = this.$.$giper_baza_glob.Land(lord).Data($giper_baza_flex_user);
            if (next) {
                user.caret(next.map(offset => this.point_by_offset(offset)));
                return next;
            }
            else {
                this.text(); // track text to recalc selection on its change
                return user.caret()?.map(point => this.offset_by_point(point)[1]) ?? [0, 0];
            }
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_text.prototype, "text", null);
    __decorate([
        $mol_mem
    ], $giper_baza_text.prototype, "str", null);
    __decorate([
        $mol_action
    ], $giper_baza_text.prototype, "write", null);
    __decorate([
        $mol_action
    ], $giper_baza_text.prototype, "point_by_offset", null);
    __decorate([
        $mol_action
    ], $giper_baza_text.prototype, "offset_by_point", null);
    __decorate([
        $mol_mem_key
    ], $giper_baza_text.prototype, "selection", null);
    $.$giper_baza_text = $giper_baza_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    $mol_test({
        'Change sequences'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            const list = land.Data($giper_baza_list);
            $mol_assert_equal(text.str(), '');
            $mol_assert_equal(list.items_vary(), []);
            text.str('foo');
            $mol_assert_equal(text.str(), 'foo');
            $mol_assert_equal(list.items_vary(), ['foo']);
            text.str('foo bar');
            $mol_assert_equal(text.str(), 'foo bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' bar']);
            text.str('foo lol bar');
            $mol_assert_equal(text.str(), 'foo lol bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' lol', ' bar']);
            text.str('lol bar');
            $mol_assert_equal(text.str(), 'lol bar');
            $mol_assert_equal(list.items_vary(), ['lol', ' bar']);
            text.str('foo bar');
            $mol_assert_equal(text.str(), 'foo bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' bar']);
            text.str('foo  bar');
            $mol_assert_equal(text.str(), 'foo  bar');
            $mol_assert_equal(list.items_vary(), ['foo', ' ', ' bar']);
            text.str('foo  BarBar');
            $mol_assert_equal(text.str(), 'foo  BarBar');
            $mol_assert_equal(list.items_vary(), ['foo', ' ', ' Bar', 'Bar']);
        },
        async 'str: Offset <=> Point'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            text.str('fooBar');
            const [first, second] = text.units();
            $mol_assert_equal(text.point_by_offset(0), [first.self().str, 0, 0]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 0, 0]), [first.self().str, 0]);
            $mol_assert_equal(text.point_by_offset(3), [first.self().str, 3, 0]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 3, 0]), [first.self().str, 3]);
            $mol_assert_equal(text.offset_by_point([first.self().str, 5, 0]), [first.self().str, 5]);
            $mol_assert_equal(text.point_by_offset(5), [second.self().str, 2, 0]);
            $mol_assert_equal(text.offset_by_point([second.self().str, 2, 0]), [second.self().str, 5]);
            $mol_assert_equal(text.point_by_offset(6), [second.self().str, 3, 0]);
            $mol_assert_equal(text.offset_by_point([second.self().str, 3, 0]), [second.self().str, 6]);
            $mol_assert_equal(text.point_by_offset(7), ['', 1, 0]);
            $mol_assert_equal(text.offset_by_point(['', 1, 0]), ['', 7]);
        },
        async 'text: Offset <=> Point'($) {
            const land = $giper_baza_land.make({ $ });
            const text = land.Data($giper_baza_text);
            text.text('foo bar\n666 777');
            const [first, second] = text.pawns($giper_baza_text);
            $mol_assert_equal(text.point_by_offset(0), [first.units()[0].self().str, 0, 0]);
            $mol_assert_equal(text.offset_by_point([first.units()[0].self().str, 0, 0]), [first.units()[0].self().str, 0]);
            $mol_assert_equal(text.point_by_offset(8), [first.units()[2].self().str, 1, 0]);
            $mol_assert_equal(text.offset_by_point([first.units()[2].self().str, 1, 0]), [first.units()[2].self().str, 8]);
        },
        async 'Merge different sequences'($) {
            const land1 = $giper_baza_land.make({ $ });
            const land2 = $giper_baza_land.make({ $ });
            const text1 = land1.Pawn($giper_baza_text).Data();
            const text2 = land2.Pawn($giper_baza_text).Data();
            text1.str('foo bar.');
            land2.faces.stat.time = land1.faces.stat.time;
            text2.str('xxx yyy.');
            const delta1 = await $mol_wire_async(land1).diff_units();
            const delta2 = await $mol_wire_async(land2).diff_units();
            await $mol_wire_async(land1).diff_apply(delta2);
            await $mol_wire_async(land2).diff_apply(delta1);
            $mol_assert_equal(text1.str(), text2.str(), 'xxx yyy.foo bar.');
        },
        async 'Merge same insertions with different changes to same place'($) {
            const base = $giper_baza_land.make({ $ });
            base.Data($giper_baza_text).str('( )');
            const left = $giper_baza_land.make({ $ });
            await $mol_wire_async(left).units_steal(base);
            left.Data($giper_baza_text).str('( [ f ] )');
            left.Data($giper_baza_text).str('( [ foo ] )');
            const right = $giper_baza_land.make({ $ });
            await $mol_wire_async(right).units_steal(base);
            right.faces.sync(left.faces);
            right.Data($giper_baza_text).str('( [ f ] )');
            right.Data($giper_baza_text).str('( [ fu ] )');
            const left_delta = await $mol_wire_async(left).diff_units(base.faces);
            const right_delta = await $mol_wire_async(right).diff_units(base.faces);
            await $mol_wire_async(left).diff_apply(right_delta);
            await $mol_wire_async(right).diff_apply(left_delta);
            $mol_assert_equal(left.Data($giper_baza_text).str(), right.Data($giper_baza_text).str(), '( [ fu ] [ foo ] )');
        },
    });
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    class $giper_baza_rich extends $giper_baza_pawn {
        dom(next) {
            const land = this.land();
            const doms = land.Pawn($giper_baza_rich);
            const regs = land.Pawn($giper_baza_atom_text);
            const used_ids = new Set;
            const link_of = (el) => {
                if (!(el instanceof this.$.$mol_dom_context.Element))
                    return null;
                if (!el.id)
                    return null;
                const link = $giper_baza_link.check(el.id);
                if (link && !used_ids.has(link.str)) {
                    used_ids.add(link.str);
                    return link;
                }
                el.id = '';
                return null;
            };
            if (next) {
                const sample = [];
                let texts = '';
                function flush() {
                    if (!texts.length)
                        return;
                    for (const token of texts.matchAll($giper_baza_text_tokens)) {
                        sample.push(token[0]);
                    }
                    texts = '';
                }
                function collect(node) {
                    switch (node.nodeType) {
                        case (node.ELEMENT_NODE): {
                            if (node.localName === 'span') {
                                link_of(node);
                                for (const kid of [...node.childNodes]) {
                                    collect(kid);
                                }
                            }
                            else {
                                flush();
                                sample.push(node);
                            }
                            return;
                        }
                        case (node.ATTRIBUTE_NODE): {
                            if (node.nodeName === 'id')
                                return;
                            if (node.nodeName === 'xmlns')
                                return;
                            sample.push(node);
                            return;
                        }
                        case (node.TEXT_NODE): {
                            texts += node.nodeValue;
                            return;
                        }
                    }
                }
                for (const node of next)
                    collect(node);
                flush();
                function attr(el) {
                    let res = {};
                    for (const a of el.attributes) {
                        if (a.name === 'id')
                            continue;
                        res[a.name] = a.value;
                    }
                    return res;
                }
                function val(el) {
                    return typeof el === 'string'
                        ? el
                        : el.localName === 'span'
                            ? el.textContent
                            : el.localName;
                }
                function tag(el) {
                    return typeof el === 'string'
                        ? 'term'
                        : el.nodeType === el.ATTRIBUTE_NODE
                            ? 'solo'
                            : el.localName === 'span'
                                ? 'term'
                                : 'vals';
                }
                let units = this.units();
                $mol_reconcile({
                    prev: units,
                    from: 0,
                    to: units.length,
                    next: sample,
                    equal: (next, prev) => {
                        if (typeof next === 'string') {
                            const p = $mol_schema_string.cast(land.sand_decode(prev));
                            if (!p)
                                return false;
                            return p.startsWith(next) || next.startsWith(p);
                        }
                        else if (next.nodeType === next.ATTRIBUTE_NODE) {
                            return land.sand_decode(prev) === next.nodeName;
                        }
                        else {
                            return prev.self().str === link_of(next)?.str;
                        }
                    },
                    drop: (prev, lead) => land.sand_wipe(prev),
                    insert: (next, lead) => {
                        const sand = land.post(lead?.self() ?? $giper_baza_link.hole, this.head(), link_of(next), val(next), tag(next));
                        if (typeof next !== 'string' && next.nodeType === next.ELEMENT_NODE) {
                            ;
                            next.id = sand.self().str;
                        }
                        return sand;
                    },
                    update: (next, prev, lead) => (typeof next !== 'string' || next === land.sand_decode(prev))
                        ? prev
                        : land.post(lead?.self() ?? $giper_baza_link.hole, prev.head(), prev.self(), val(next), tag(next)),
                    // replace: ( next, prev, lead )=> {
                    // 	land.sand_wipe( prev )
                    // 	return land.post(
                    // 		lead?.self() ?? $giper_baza_link.hole,
                    // 		prev.head(),
                    // 		link_of( next ),
                    // 		val( next ),
                    // 		tag( next ),
                    // 	)
                    // },
                });
                units = this.units();
                for (let i = 0; i < units.length; ++i) {
                    const sam = sample[i];
                    if (typeof sam === 'string')
                        continue;
                    if (sam.nodeType === sam.ATTRIBUTE_NODE) {
                        regs.Head(units[i].self()).val(sam.nodeValue);
                    }
                    else if (sam.nodeName !== 'span') {
                        doms.Head(units[i].self()).dom([
                            ...sam.attributes,
                            ...[...sam.childNodes],
                        ]);
                    }
                }
                return next;
            }
            else {
                return this.units().flatMap(unit => {
                    if (unit.tag() === 'solo')
                        return [];
                    const Tag = unit.tag() === 'term'
                        ? 'span'
                        : land.sand_decode(unit) ?? 'p';
                    const attrs = unit.tag() === 'vals'
                        ? Object.fromEntries(regs.Head(unit.self()).units()
                            .filter(sand => sand.tag() === 'solo')
                            .map(sand => [land.sand_decode(sand), regs.Head(sand.self()).val()]))
                        : {};
                    const content = unit.tag() === 'term'
                        ? $mol_schema_string.cast(land.sand_decode(unit))
                        : doms.Head(unit.self()).dom();
                    return $mol_jsx(Tag, { ...attrs, id: unit.self().str }, content);
                });
            }
        }
        html(next) {
            if (next === undefined) {
                return $mol_dom_serialize($mol_jsx($mol_jsx_frag, null, this.dom()));
            }
            else {
                this.dom([...$mol_dom_parse(`<body>${next}</body>`).documentElement.childNodes]);
                return next;
            }
        }
        selection(lord, next) {
            const base = this.$.$giper_baza_glob.Land(lord).Data($giper_baza_flex_user);
            if (next) {
                base.caret(next);
                return next;
            }
            else {
                return base.caret() ?? [[this.head().str, 0, 0], [this.head().str, 0, 0]];
            }
        }
    }
    __decorate([
        $mol_mem_key
    ], $giper_baza_rich.prototype, "selection", null);
    $.$giper_baza_rich = $giper_baza_rich;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    function html(dom) {
        return dom.html().replace(/ (id|xmlns)=".+?"/g, '');
    }
    $mol_test({
        'plain text'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('foo bar');
            $mol_assert_equal(html(left), '<span>foo</span><span> bar</span>');
        },
        'simple tags'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<br /><hr />');
            $mol_assert_equal(html(left), '<br /><hr />');
        },
        'tags with attrs'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<br hidden="" /><hr tabindex="-1" />');
            $mol_assert_equal(html(left), '<br hidden="" /><hr tabindex="-1" />');
        },
        'nested tags'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<p><br /></p>');
            $mol_assert_equal(html(left), '<p><br /></p>');
        },
        'paragraphs'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<p>foo bar</p><p>xxx yyy</p>');
            $mol_assert_equal(html(left), '<p><span>foo</span><span> bar</span></p><p><span>xxx</span><span> yyy</span></p>');
        },
        'import exported html'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('foo<a data-xxx="yyy" href="hhh:zzz">ton</a>bar');
            const right = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            right.html(left.html());
            $mol_assert_equal(html(left), html(right));
            $mol_assert_equal(left.html(), right.html());
        },
        'import wild spans'($) {
            const left = $giper_baza_land.make({ $ }).Data($giper_baza_rich);
            left.html('<span>foo bar<a href="hhh:ton"/></span>');
            $mol_assert_equal(html(left), '<span>foo</span><span> bar</span><a href="hhh:ton"></a>');
        },
    });
})($ || ($ = {}));

;
	($.$mol_icon_content_paste) = class $mol_icon_content_paste extends ($.$mol_icon) {
		path(){
			return "M19,20H5V4H7V7H17V4H19M12,2A1,1 0 0,1 13,3A1,1 0 0,1 12,4A1,1 0 0,1 11,3A1,1 0 0,1 12,2M19,2H14.82C14.4,0.84 13.3,0 12,0C10.7,0 9.6,0.84 9.18,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2Z";
		}
	};


;
"use strict";


;
	($.$mol_expander) = class $mol_expander extends ($.$mol_list) {
		expanded(next){
			if(next !== undefined) return next;
			return false;
		}
		expandable(){
			return true;
		}
		label(){
			return [(this.title())];
		}
		Trigger(){
			const obj = new this.$.$mol_check_expand();
			(obj.checked) = (next) => ((this.expanded(next)));
			(obj.expandable) = () => ((this.expandable()));
			(obj.label) = () => ((this.label()));
			return obj;
		}
		Tools(){
			return null;
		}
		Label(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Trigger()), (this.Tools())]);
			return obj;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.content()));
			return obj;
		}
		rows(){
			return [(this.Label()), (this.Content())];
		}
	};
	($mol_mem(($.$mol_expander.prototype), "expanded"));
	($mol_mem(($.$mol_expander.prototype), "Trigger"));
	($mol_mem(($.$mol_expander.prototype), "Label"));
	($mol_mem(($.$mol_expander.prototype), "Content"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Component which expands any content on title click.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_expander_demo
         */
        class $mol_expander extends $.$mol_expander {
            rows() {
                return [
                    this.Label(),
                    ...this.expanded() ? [this.Content()] : []
                ];
            }
            expandable() {
                return this.content().length > 0;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_expander.prototype, "rows", null);
        $$.$mol_expander = $mol_expander;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/expander/expander.view.css", "[mol_expander] {\n\tflex-direction: column;\n}\n\n[mol_expander_label] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[mol_expander_trigger] {\n\tflex: auto;\n\tposition: relative;\n}\n");
})($ || ($ = {}));

;
	($.$mol_icon_marker) = class $mol_icon_marker extends ($.$mol_icon) {
		path(){
			return "M18.5,1.15C17.97,1.15 17.46,1.34 17.07,1.73L11.26,7.55L16.91,13.2L22.73,7.39C23.5,6.61 23.5,5.35 22.73,4.56L19.89,1.73C19.5,1.34 19,1.15 18.5,1.15M10.3,8.5L4.34,14.46C3.56,15.24 3.56,16.5 4.36,17.31C3.14,18.54 1.9,19.77 0.67,21H6.33L7.19,20.14C7.97,20.9 9.22,20.89 10,20.12L15.95,14.16";
		}
	};


;
"use strict";


;
	($.$mol_icon_format_size) = class $mol_icon_format_size extends ($.$mol_icon) {
		path(){
			return "M2 4V7H7V19H10V7H15V4H2M21 9H12V12H15V19H18V12H21V9Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_order_bool_ascending) = class $mol_icon_order_bool_ascending extends ($.$mol_icon) {
		path(){
			return "M6 3C3.79 3 2 4.79 2 7S3.79 11 6 11 10 9.21 10 7 8.21 3 6 3M6 9C4.9 9 4 8.1 4 7S4.9 5 6 5 8 5.9 8 7 7.1 9 6 9M6 13C3.79 13 2 14.79 2 17S3.79 21 6 21 10 19.21 10 17 8.21 13 6 13M12 5H22V7H12V5M12 19V17H22V19H12M12 11H22V13H12V11Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_order_numeric_ascending) = class $mol_icon_order_numeric_ascending extends ($.$mol_icon) {
		path(){
			return "M7 21H3V19H7V18H5C3.9 18 3 17.11 3 16V15C3 13.9 3.9 13 5 13H7C8.11 13 9 13.9 9 15V19C9 20.11 8.11 21 7 21M7 15H5V16H7M5 3H7C8.11 3 9 3.9 9 5V9C9 10.11 8.11 11 7 11H5C3.9 11 3 10.11 3 9V5C3 3.9 3.9 3 5 3M5 9H7V5H5M12 5H22V7H12M12 19V17H22V19M12 11H22V13H12Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_comment) = class $mol_icon_comment extends ($.$mol_icon) {
		path(){
			return "M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_comment_quote) = class $mol_icon_comment_quote extends ($.$mol_icon) {
		path(){
			return "M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H8V21C8 21.6 8.4 22 9 22H9.5C9.7 22 10 21.9 10.2 21.7L13.9 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M11 13H7V8.8L8.3 6H10.3L8.9 9H11V13M17 13H13V8.8L14.3 6H16.3L14.9 9H17V13Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_comment_quote_outline) = class $mol_icon_comment_quote_outline extends ($.$mol_icon) {
		path(){
			return "M9 22C8.4 22 8 21.6 8 21V18H4C2.9 18 2 17.1 2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H13.9L10.2 21.7C10 21.9 9.8 22 9.5 22H9M10 16V19.1L13.1 16H20V4H4V16H10M16.3 6L14.9 9H17V13H13V8.8L14.3 6H16.3M10.3 6L8.9 9H11V13H7V8.8L8.3 6H10.3Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_xml) = class $mol_icon_xml extends ($.$mol_icon) {
		path(){
			return "M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_arrow_collapse) = class $mol_icon_arrow_collapse extends ($.$mol_icon) {
		path(){
			return "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_arrow_collapse_left) = class $mol_icon_arrow_collapse_left extends ($.$mol_icon) {
		path(){
			return "M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z";
		}
	};


;
"use strict";


;
	($.$mol_float) = class $mol_float extends ($.$mol_view) {
		style(){
			return {...(super.style()), "minHeight": "auto"};
		}
	};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/float/float.view.css", "[mol_float] {\n\tposition: sticky;\n\ttop: 0;\n\tleft: 0;\n\tz-index: var(--mol_layer_float);\n\topacity: 1;\n\ttransition: opacity .25s ease-in;\n\tdisplay: block;\n\tbackground: linear-gradient( var(--mol_theme_card), var(--mol_theme_card) ), var(--mol_theme_back);\n\tbox-shadow: 0 0 .5rem hsla(0,0%,0%,.25);\n}\n\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$giper_baza_rich_edit) = class $giper_baza_rich_edit extends ($.$mol_view) {
		enabled(){
			return true;
		}
		selection_load(){
			return null;
		}
		selection_sync(){
			return null;
		}
		inline_toggle(id, next){
			if(next !== undefined) return next;
			return null;
		}
		block_wrap(id, next){
			if(next !== undefined) return next;
			return null;
		}
		block_rewrap(next){
			if(next !== undefined) return next;
			return null;
		}
		block_unwrap(next){
			if(next !== undefined) return next;
			return null;
		}
		Hotkey(){
			const obj = new this.$.$mol_hotkey2();
			(obj.action) = () => ({
				"alt_S": (next) => (this.inline_toggle("strong", next)), 
				"alt_E": (next) => (this.inline_toggle("em", next)), 
				"alt_I": (next) => (this.inline_toggle("ins", next)), 
				"alt_R": (next) => (this.inline_toggle("del", next)), 
				"alt_C": (next) => (this.inline_toggle("code", next)), 
				"alt_T": (next) => (this.block_wrap("section", next)), 
				"alt_Q": (next) => (this.block_wrap("blockquote", next)), 
				"alt_U": (next) => (this.block_wrap("ul", next)), 
				"alt_O": (next) => (this.block_wrap("ol", next)), 
				"alt_P": (next) => (this.block_wrap("pre", next)), 
				"tab": (next) => (this.block_rewrap(next)), 
				"shift_tab": (next) => (this.block_unwrap(next))
			});
			return obj;
		}
		Inline_format_menu_icon(){
			const obj = new this.$.$mol_icon_marker();
			return obj;
		}
		selected(next){
			if(next !== undefined) return next;
			return false;
		}
		Strong_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Strong_button_title")));
			(obj.hint) = () => ("Alt+S");
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.inline_toggle("strong", next)));
			return obj;
		}
		Em_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Em_button_title")));
			(obj.hint) = () => ("Alt+E");
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.inline_toggle("em", next)));
			return obj;
		}
		Ins_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Ins_button_title")));
			(obj.hint) = () => ("Alt+I");
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.inline_toggle("ins", next)));
			return obj;
		}
		Del_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Del_button_title")));
			(obj.hint) = () => ("Alt+R");
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.inline_toggle("del", next)));
			return obj;
		}
		Code_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.title) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Code_button_title")));
			(obj.hint) = () => ("Alt+C");
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.inline_toggle("code", next)));
			return obj;
		}
		Inline_format_menu(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Inline_format_menu_hint")));
			(obj.trigger_content) = () => ([(this.Inline_format_menu_icon())]);
			(obj.bubble_content) = () => ([
				(this.Strong_button()), 
				(this.Em_button()), 
				(this.Ins_button()), 
				(this.Del_button()), 
				(this.Code_button())
			]);
			return obj;
		}
		Section_icon(){
			const obj = new this.$.$mol_icon_format_size();
			return obj;
		}
		Section_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Section_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_wrap("section", next)));
			(obj.sub) = () => ([(this.Section_icon())]);
			return obj;
		}
		List_bullet_icon(){
			const obj = new this.$.$mol_icon_order_bool_ascending();
			return obj;
		}
		List_bullet_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_List_bullet_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_wrap("ul", next)));
			(obj.sub) = () => ([(this.List_bullet_icon())]);
			return obj;
		}
		List_number_icon(){
			const obj = new this.$.$mol_icon_order_numeric_ascending();
			return obj;
		}
		List_number_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_List_number_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_wrap("ol", next)));
			(obj.sub) = () => ([(this.List_number_icon())]);
			return obj;
		}
		Quote_icon(){
			const obj = new this.$.$mol_icon_comment_quote_outline();
			return obj;
		}
		Quote_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Quote_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_wrap("blockquote", next)));
			(obj.sub) = () => ([(this.Quote_icon())]);
			return obj;
		}
		Preformat_icon(){
			const obj = new this.$.$mol_icon_xml();
			return obj;
		}
		Preformat_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Preformat_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_wrap("pre", next)));
			(obj.sub) = () => ([(this.Preformat_icon())]);
			return obj;
		}
		Decrease_icon(){
			const obj = new this.$.$mol_icon_arrow_collapse_left();
			return obj;
		}
		Unwrap_button(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_rich_edit_Unwrap_button_hint")));
			(obj.enabled) = (next) => ((this.selected(next)));
			(obj.click) = (next) => ((this.block_unwrap(next)));
			(obj.sub) = () => ([(this.Decrease_icon())]);
			return obj;
		}
		Tools(){
			const obj = new this.$.$mol_float();
			(obj.sub) = () => ([
				(this.Inline_format_menu()), 
				(this.Section_button()), 
				(this.List_bullet_button()), 
				(this.List_number_button()), 
				(this.Quote_button()), 
				(this.Preformat_button()), 
				(this.Unwrap_button())
			]);
			return obj;
		}
		editable(next){
			if(next !== undefined) return next;
			return "true";
		}
		save(next){
			if(next !== undefined) return next;
			return null;
		}
		paste(next){
			if(next !== undefined) return next;
			return null;
		}
		hover(next){
			if(next !== undefined) return next;
			return null;
		}
		content(){
			return [];
		}
		Content(){
			const obj = new this.$.$mol_view();
			(obj.attr) = () => ({"contenteditable": (this.editable())});
			(obj.event) = () => ({
				"input": (next) => (this.save(next)), 
				"paste": (next) => (this.paste(next)), 
				"pointermove": (next) => (this.hover(next))
			});
			(obj.sub) = () => ((this.content()));
			return obj;
		}
		pawn(next){
			if(next !== undefined) return next;
			const obj = new this.$.$giper_baza_rich();
			return obj;
		}
		attr(){
			return {...(super.attr()), "giper_baza_rich_edit_enabled": (this.enabled())};
		}
		hint(){
			return "";
		}
		auto(){
			return [(this.selection_load()), (this.selection_sync())];
		}
		plugins(){
			return [(this.Hotkey())];
		}
		sub(){
			return [(this.Tools()), (this.Content())];
		}
	};
	($mol_mem_key(($.$giper_baza_rich_edit.prototype), "inline_toggle"));
	($mol_mem_key(($.$giper_baza_rich_edit.prototype), "block_wrap"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "block_rewrap"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "block_unwrap"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Hotkey"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Inline_format_menu_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "selected"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Strong_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Em_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Ins_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Del_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Code_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Inline_format_menu"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Section_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Section_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "List_bullet_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "List_bullet_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "List_number_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "List_number_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Quote_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Quote_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Preformat_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Preformat_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Decrease_icon"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Unwrap_button"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Tools"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "editable"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "save"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "paste"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "hover"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "Content"));
	($mol_mem(($.$giper_baza_rich_edit.prototype), "pawn"));


;
"use strict";
var $;
(function ($) {
    function $mol_jsx_attach(next, action) {
        const prev = $mol_jsx_document;
        try {
            $mol_jsx_document = next;
            return action();
        }
        finally {
            $mol_jsx_document = prev;
        }
    }
    $.$mol_jsx_attach = $mol_jsx_attach;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    $mol_test({
        'Attach to document'() {
            const doc = $mol_dom_parse('<html><body id="foo"></body></html>');
            $mol_jsx_attach(doc, () => $mol_jsx("body", { id: "foo" }, "bar"));
            $mol_assert_equal(doc.documentElement.outerHTML, '<html><body id="foo">bar</body></html>');
        },
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_dom_point extends Object {
        node;
        pos;
        constructor(node, pos) {
            super();
            this.node = node;
            this.pos = pos;
            if (pos <= 0)
                return;
            if (node.nodeValue)
                return;
            this.node = this.node.childNodes[pos - 1];
            if (!this.node)
                $mol_fail(new Error('node is undefined'));
            this.pos = -1;
        }
        /** Iterator for deep comparison. */
        [Symbol.iterator]() {
            return [this.node, this.pos].values();
        }
        /** Point after start of the node. */
        static head(node) {
            return new this(node, 0);
        }
        /** Point before end of the node. */
        static foot(node) {
            const length = node.nodeValue?.length ?? node.childNodes.length;
            return new this(node, length);
        }
        /** Point after end of the node. */
        static tail(node) {
            return new this(node, -1);
        }
        /** Is point after start of the node. */
        is_head() {
            return this.pos === 0;
        }
        /** Is point before end of the node. */
        is_foot() {
            if (this.is_tail())
                return !this.node.nextSibling;
            else
                return this.pos === (this.node.nodeValue?.length ?? this.node.childNodes.length);
        }
        /** Is point after end of the node. */
        is_tail() {
            return this.pos === -1;
        }
        /** Point after start of the node. */
        head() {
            return $mol_dom_point.head(this.node);
        }
        /** Point before end of the node. */
        foot() {
            if (this.is_tail())
                return $mol_dom_point.foot(this.node.parentNode);
            else
                return $mol_dom_point.foot(this.node);
        }
        /** Point after end of the node. */
        tail() {
            return $mol_dom_point.tail(this.node);
        }
        native() {
            if (this.is_tail())
                return [
                    this.node.parentNode,
                    [...this.node.parentNode.childNodes].indexOf(this.node) + 1,
                ];
            return [this.node, this.pos];
        }
        /** Point near the node. -1: before, +1: after. */
        static near(node, axis) {
            const parent = node.parentElement;
            if (!parent)
                return null;
            if (axis < 0)
                return node.previousSibling
                    ? $mol_dom_point.tail(node.previousSibling)
                    : $mol_dom_point.head(parent);
            return $mol_dom_point.tail(node);
        }
        /** Point near the node. -1: before, +1: after. */
        jump(axis) {
            if (this.is_tail()) {
                return $mol_dom_point.near(this.node.parentNode, axis);
            }
            else {
                return $mol_dom_point.near(this.node, axis);
            }
        }
        /** Point at one step in some direction. */
        move_step(axis) {
            if (axis > 0) {
                if (this.is_tail()) {
                    const next = this.node.nextSibling;
                    if (next)
                        return $mol_dom_point.head(next);
                    else
                        return this.jump(+1);
                }
                else if (this.is_foot()) {
                    return this.jump(+1);
                }
                else {
                    const next = this.node.firstChild;
                    if (next)
                        return $mol_dom_point.head(next);
                    return new $mol_dom_point(this.node, this.pos + 1);
                }
            }
            else {
                if (this.is_tail()) {
                    const next = this.node.lastChild;
                    if (next)
                        return $mol_dom_point.tail(next);
                    else
                        return $mol_dom_point.head(this.node);
                }
                else if (this.is_head()) {
                    return this.jump(-1);
                }
                else {
                    return new $mol_dom_point(this.node, this.pos + 1);
                }
            }
        }
        move_chars(root, offset) {
            if (offset === 0)
                return this;
            if (this.node === root && this.is_tail())
                return $mol_dom_point.foot(root);
            const axis = Math.sign(offset);
            if (axis < 0)
                $mol_fail(new Error('Unsupported yet'));
            if (this.node.nodeValue && this.pos >= 0) {
                const pos = this.pos + offset;
                const len = this.node.nodeValue.length;
                if (pos <= len)
                    return new $mol_dom_point(this.node, pos);
                else
                    return $mol_dom_point.tail(this.node).move_chars(root, pos - len);
            }
            else {
                return this.move_step(axis || 1)?.move_chars(root, offset)
                    ?? $mol_dom_point.foot(root);
            }
        }
    }
    $.$mol_dom_point = $mol_dom_point;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Head"($) {
                const div = $mol_jsx("div", null, "foo");
                $mol_assert_equal($mol_dom_point.head(div), new $mol_dom_point(div, 0));
                $mol_assert_equal($mol_dom_point.head(div).is_head(), true);
                $mol_assert_equal(new $mol_dom_point(div.firstChild, 1).is_head(), false);
            },
            "Foot"($) {
                const div = $mol_jsx("div", null, "foo");
                $mol_assert_equal($mol_dom_point.foot(div), new $mol_dom_point(div, 1), $mol_dom_point.tail(div.firstChild));
                $mol_assert_equal($mol_dom_point.foot(div).is_foot(), true);
                $mol_assert_equal(new $mol_dom_point(div.firstChild, 2).is_foot(), false);
            },
            "Near & jump"($) {
                const div = $mol_jsx("div", null,
                    "123",
                    $mol_jsx("span", null, "foo"),
                    "456");
                const span = div.childNodes[1];
                $mol_assert_equal(new $mol_dom_point(div, 1), $mol_dom_point.near(span, -1), new $mol_dom_point(span, 1).jump(-1));
                $mol_assert_equal(new $mol_dom_point(div, 2), $mol_dom_point.near(span, +1), new $mol_dom_point(span, 1).jump(+1));
            },
            "move by steps to the end"($) {
                const div = $mol_jsx("div", null,
                    "1",
                    $mol_jsx("span", null, "23"),
                    $mol_jsx("br", null),
                    "4");
                const span = div.childNodes[1];
                const br = div.childNodes[2];
                let cursor = $mol_dom_point.head(div);
                $mol_assert_equal([
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                    cursor = cursor.move_step(+1),
                ], [
                    $mol_dom_point.head(div.firstChild),
                    $mol_dom_point.foot(div.firstChild),
                    $mol_dom_point.tail(div.firstChild),
                    $mol_dom_point.head(span),
                    $mol_dom_point.head(span.firstChild),
                    new $mol_dom_point(span.firstChild, 1),
                    $mol_dom_point.foot(span.firstChild),
                    $mol_dom_point.tail(span.firstChild),
                    $mol_dom_point.tail(span),
                    $mol_dom_point.head(br),
                    $mol_dom_point.tail(br),
                    $mol_dom_point.head(div.lastChild),
                    $mol_dom_point.foot(div.lastChild),
                    $mol_dom_point.tail(div.lastChild),
                    null,
                ]);
            },
            "move by chars to the end"($) {
                const div = $mol_jsx("div", null,
                    "1",
                    $mol_jsx("span", null, "23"),
                    $mol_jsx("br", null),
                    "4");
                const span = div.childNodes[1];
                const br = div.childNodes[2];
                let start = $mol_dom_point.head(div);
                $mol_assert_equal([
                    start.move_chars(div, +0),
                    start.move_chars(div, +1),
                    start.move_chars(div, +2),
                    start.move_chars(div, +3),
                    start.move_chars(div, +4),
                    start.move_chars(div, +5),
                ], [
                    $mol_dom_point.head(div),
                    $mol_dom_point.foot(div.firstChild),
                    new $mol_dom_point(span.firstChild, 1),
                    $mol_dom_point.foot(span.firstChild),
                    $mol_dom_point.foot(div.lastChild),
                    $mol_dom_point.foot(div),
                ]);
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_dom_range extends Object {
        anchor;
        extend;
        constructor(anchor, extend) {
            super();
            this.anchor = anchor;
            this.extend = extend;
        }
        /** Iterator for deep comparison. */
        [Symbol.iterator]() {
            return [this.anchor, this.extend].values();
        }
        /** Makes range from selection with direction storing. */
        static from_selection(sel = $mol_dom_context.getSelection()) {
            if (sel.type === 'None')
                return null;
            const anchor = new $mol_dom_point(sel.anchorNode, sel.anchorOffset);
            const extend = new $mol_dom_point(sel.focusNode, sel.focusOffset);
            return new this(anchor, extend);
        }
        /** Converts from native Range. */
        static from_native(range) {
            return new this(new $mol_dom_point(range.startContainer, range.startOffset), new $mol_dom_point(range.endContainer, range.endOffset));
        }
        /** Surrounds whole node content. */
        static inside(node) {
            return new this($mol_dom_point.head(node), $mol_dom_point.foot(node));
        }
        /** Around node itself. */
        static around(node) {
            return $mol_dom_range.inside(node).expand();
        }
        /** Deeper Element which contain whole selection. */
        container() {
            return this.native().commonAncestorContainer;
        }
        /** Has now content. */
        is_empty() {
            return this.anchor.node === this.extend.node && this.anchor.pos === this.extend.pos;
        }
        /** Swap start and end points. */
        swap() {
            return new $mol_dom_range(this.extend, this.anchor);
        }
        /** Returns new range expanded outside by one point steps. */
        expand() {
            return new $mol_dom_range(this.anchor.jump(-1), this.extend.jump(+1));
        }
        /** Returns fragment of cloned content. */
        copy() {
            return this.native().cloneContents();
        }
        /** Removes all content and returns new collapsed range. */
        clear() {
            const range = this.native();
            range.deleteContents();
            return $mol_dom_range.from_native(range);
        }
        /** Removes all content and inserts given instead. */
        paste(node) {
            const range = this.clear().native();
            range.insertNode(node);
            return $mol_dom_range.from_native(range);
        }
        /** Wraps content by given element. */
        surround(el) {
            el.appendChild(this.copy());
            return this.paste(el);
        }
        /**
         * Returns position of point relate to this range.
         * Before: -1
         * Inside: 0
         * After: +1
         */
        point_compare(point) {
            return this.native().comparePoint(...point.native());
        }
        /** Is given range inside this. */
        range_contains(range) {
            return (this.point_compare(range.anchor) === 0) && (this.point_compare(range.extend) === 0);
        }
        /**
         * Returns point which bounded by this range.
         * Actualy returns middle of three points: anchor, given point, extend.
         */
        point_bound(point) {
            const zone = this.point_compare(point);
            return zone < 0 ? this.anchor : zone > 0 ? this.extend : point;
        }
        /** Returns new range which bounded by giiven. */
        range_bounds(range) {
            return new $mol_dom_range(this.point_bound(range.anchor), this.point_bound(range.extend));
        }
        /** Aim selection to this range. */
        select() {
            const [anchorNode, anchorOffset] = this.anchor.native();
            const [focusNode, focusOffset] = this.extend.native();
            const sel = $mol_dom_context.document.getSelection();
            sel.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
            return this;
        }
        /**
         * Returns native DOM Range object.
         * It's always forward direction.
         */
        native() {
            const range = $mol_dom_context.document.createRange();
            if (this.anchor.is_tail())
                range.setStartAfter(this.anchor.node);
            else
                range.setStart(this.anchor.node, this.anchor.pos);
            if (this.extend.is_tail())
                range.setEndAfter(this.extend.node);
            else
                range.setEnd(this.extend.node, this.extend.pos);
            if (range.collapsed && !this.is_empty()) {
                if (this.anchor.is_tail())
                    range.setEndAfter(this.anchor.node);
                else
                    range.setEnd(this.anchor.node, this.anchor.pos);
            }
            return range;
        }
    }
    $.$mol_dom_range = $mol_dom_range;
})($ || ($ = {}));

;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($_1) {
    var $$;
    (function ($$) {
        $mol_test({
            "Inside, expand & around"($) {
                const div = $mol_jsx("div", null,
                    "123",
                    $mol_jsx("span", null, "foo"),
                    "456");
                const span = div.childNodes[1];
                $mol_assert_equal($mol_dom_range.inside(span).expand(), $mol_dom_range.around(span));
            },
        });
    })($$ = $_1.$$ || ($_1.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("giper/baza/rich/edit/edit.view.css", "[giper_baza_rich_edit] {\n\tflex-direction: column;\n\tflex: 1;\n\tborder-radius: var(--mol_gap_round);\n\tbackground-color: var(--mol_theme_field);\n}\n\n[giper_baza_rich_edit_enabled] {\n\toutline: 1px solid var(--mol_theme_line);\n}\n\n[giper_baza_rich_edit]:focus-within {\n\tz-index: var(--mol_layer_focus);\n\toutline: 1px solid var(--mol_theme_focus);\n}\n\n[giper_baza_rich_edit_tools] {\n\tborder-radius: var(--mol_gap_round);\n}\n\n[giper_baza_rich_edit_content] {\n\tflex-direction: column;\n\tflex: 1;\n\twhite-space: pre-wrap;\n\toutline: none;\n\tpadding: var(--mol_gap_block);\n}\n\n[giper_baza_rich_edit_content] a {\n\tcolor: var(--mol_theme_control);\n\ttext-decoration: none;\n\tborder-radius: var(--mol_gap_round);\n}\n\n[giper_baza_rich_edit_content] a:hover {\n\tbackground: var(--mol_theme_card);\n\tbox-shadow: 0 0 0 .25rem var(--mol_theme_card);\n}\n\n[giper_baza_rich_edit_content] p {\n\tmargin: 0;\n\tpadding: var(--mol_gap_text);\n}\n\n[giper_baza_rich_edit_content] ul {\n\tmargin: 0;\n\tpadding: 0 1.5rem;\n}\n\n[giper_baza_rich_edit_content] ul > p:before {\n\tcontent: '• ';\n\twidth: 0;\n    display: inline-flex;\n    white-space: pre;\n    flex-direction: row-reverse;\n}\n\n[giper_baza_rich_edit_content] ol {\n\tmargin: 0;\n\tpadding: 0 1.5rem;\n}\n\n[giper_baza_rich_edit_content] ol > p:before {\n\tcontent: counter(giper_baza_rich_edit_content_ol) \". \";\n\twidth: 0;\n    display: inline-flex;\n    white-space: pre;\n    flex-direction: row-reverse;\n}\n\n[giper_baza_rich_edit_content] blockquote {\n\tmargin: var(--mol_gap_block);\n\tpadding: var(--mol_gap_block);\n\tbackground: var(--mol_theme_card);\n\tborder-radius: var(--mol_gap_round);\n}\n\n[giper_baza_rich_edit_content] pre {\n\tmargin: 0 var(--mol_gap_block);\n\tpadding: 0 var(--mol_gap_block);\n\tborder-radius: var(--mol_gap_round);\n\toverflow-x: auto;\n}\n\n[giper_baza_rich_edit_content] img {\n\tmargin: var(--mol_gap_block);\n\tmax-width: calc( 100% - 2 * var(--mol_gap_block) );\n}\n\n[giper_baza_rich_edit_content] strong {\n\ttext-shadow: 0 0;\n\tfont-weight: normal;\n}\n\n[giper_baza_rich_edit_content] em {\n\tfont-style: italic;\n}\n\n[giper_baza_rich_edit_content] ins {\n\ttext-decoration: none;\n\tcolor: var(--mol_theme_special);\n}\n\n[giper_baza_rich_edit_content] del {\n\ttext-decoration: none;\n\tcolor: var(--mol_theme_shade);\n}\n\n[giper_baza_rich_edit_content] del {\n\tfont-family: monospace;\n}\n\n[giper_baza_rich_edit_content] hr {\n\tmargin: var(--mol_gap_block);\n\tborder: none;\n\tbox-shadow: 0 -1px 0 0px var(--mol_theme_line);\n    height: 1px;\n}\n\n[giper_baza_rich_edit_content] section {\n\tpadding: 0;\n\tmargin: 0;\n}\n\n[giper_baza_rich_edit_content] section > p:first-child {\n\tfont-size: 2rem;\n\tline-height: 3rem;\n\tfont-weight: normal;\n\tletter-spacing: 2px;\n}\n\n[giper_baza_rich_edit_content] section section > p:first-child {\n\tfont-size: 1.75rem;\n\tline-height: 3rem;\n}\n\n[giper_baza_rich_edit_content] section section section > p:first-child {\n\tfont-size: 1.5rem;\n\tline-height: 3rem;\n}\n\n[giper_baza_rich_edit_content] section section section section > p:first-child {\n\tfont-size: 1.25rem;\n\tline-height: 3rem;\n}\n\n[giper_baza_rich_edit_content] section section section section section > p:first-child {\n\tfont-size: 1.25rem;\n\tline-height: 3rem;\n\tfont-style: italic;\n}\n\n[giper_baza_rich_edit_content] section:not(:last-child) {\n\tbox-shadow: 0 1px 0 0 var(--mol_theme_line);\n}\n\n[giper_baza_rich_edit_content] section:not(:last-child) {\n\tpadding-bottom: var(--mol_gap_block);\n\tmargin-bottom: var(--mol_gap_block);\n\tbox-shadow: 0 1px 0 0 var(--mol_theme_line);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
"use strict";
/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_rich_edit extends $.$giper_baza_rich_edit {
            // dom_id() {
            // 	return this.pawn()?.head().str ?? ''
            // }
            editable(next) {
                return next ?? (this.enabled() ? 'true' : 'false');
            }
            sub() {
                return [
                    ...this.enabled() ? [this.Tools()] : [],
                    this.Content(),
                ];
            }
            content() {
                // console.log('render')
                let nodes = $mol_jsx_attach($mol_dom_context.document, () => this.pawn()?.dom() ?? []);
                nodes = this.$.$mol_dom_safe(nodes);
                this.selection_load();
                return nodes.length ? nodes : [$mol_jsx("section", null,
                        $mol_jsx("p", null,
                            $mol_jsx("br", null)))];
            }
            selection(next) {
                return this.pawn()?.selection(this.$.$giper_baza_auth.current().pass().lord(), next) ?? [['', 0, 0], ['', 0, 0]];
            }
            save(event) {
                const sel = $mol_dom_range.from_selection();
                if (!sel)
                    return;
                const root = this.Content().dom_node();
                if (!$mol_dom_range.inside(root).range_contains(sel))
                    return;
                let container = root; // sel.container() as Element
                // while( container.parentNode && container !== root ) {
                //     const element = container as Element
                //     if( element.id ) break
                //     container = container.parentNode as Element
                // }
                let dom = this.pawn(null);
                // if( container.id ) dom = dom.land().Pawn( $giper_baza_rich ).Head( new $giper_baza_link( container.id ) )
                let nodes = [...container.childNodes];
                nodes = this.$.$mol_dom_safe(nodes);
                // console.log( event, container, dom, nodes )
                dom.dom(nodes);
                this.selection_save();
            }
            selection_sync() {
                return new this.$.$mol_dom_listener($mol_dom_context.document, 'selectionchange', event => this.selection_save());
            }
            selected() {
                $mol_wire_watch();
                const sel = $mol_dom_range.from_selection();
                if (!sel)
                    return false;
                const root = this.Content().dom_node();
                if (!$mol_dom_range.inside(root).range_contains(sel))
                    return false;
                return true;
            }
            selection_save() {
                const sel = $mol_dom_range.from_selection();
                if (!sel)
                    return;
                const root = this.Content().dom_node();
                if (!$mol_dom_range.inside(root).range_contains(sel))
                    return;
                const point_by = (point) => {
                    let base = (point.node.nodeType === point.node.ELEMENT_NODE ? point.node : point.node.parentNode);
                    let link = null;
                    while (true) {
                        link = $giper_baza_link.check(base.id);
                        if (link)
                            break;
                        base = base.parentElement;
                    }
                    const range = new $mol_dom_range($mol_dom_point.head(base), point);
                    const len = range.native().toString().length;
                    // console.log( range.native().toString() )
                    return [link.str, len, 0];
                };
                const anchor = point_by(sel.anchor);
                const extend = point_by(sel.extend);
                // console.log( 'save', anchor, extend )
                this.selection([anchor, extend]);
            }
            // @ $mol_mem
            selection_load() {
                if (!this.focused())
                    return;
                const [anchor, focus] = this.selection();
                // console.log( 'load', anchor, focus )
                const anchorNode = $mol_dom_context.document.getElementById(anchor[0]);
                const extendNode = $mol_dom_context.document.getElementById(focus[0]);
                if (!anchorNode)
                    return;
                if (!extendNode)
                    return;
                const root = this.Content().dom_node();
                const range = new $mol_dom_range($mol_dom_point.head(anchorNode).move_chars(root, anchor[1]), $mol_dom_point.head(extendNode).move_chars(root, focus[1]));
                // console.log(anchorNode,range)
                range.select();
            }
            // @ $mol_mem
            // saving() {
            // 	const obs = new MutationObserver( $mol_wire_async( ()=> {
            // 		console.log(1)
            // 		this.pawn().dom( this.Body() )
            // 	} ) )
            // 	obs.observe( this.Body(), { attributes: true, childList: true, subtree: true, characterData: true } )
            // }
            block_wrap(Type, event) {
                const sel = $mol_dom_range.from_selection();
                if (!sel.is_empty())
                    return;
                let box = sel.container();
                if (box.nodeType !== box.ELEMENT_NODE)
                    box = box.parentNode;
                while (box) {
                    if (box === this.Content().dom_node()) {
                        $mol_dom_range.inside(box).surround($mol_jsx("p", null)).surround($mol_jsx(Type, null));
                        break;
                    }
                    if (box.localName === 'p') {
                        $mol_dom_range.around(box).surround($mol_jsx(Type, null));
                        break;
                    }
                    box = box.parentNode;
                }
                this.selection_load();
                this.save();
                event.preventDefault();
            }
            block_unwrap(event) {
                const sel = $mol_dom_range.from_selection();
                if (!sel.is_empty())
                    return;
                let box = sel.container();
                if (box.nodeType !== box.ELEMENT_NODE)
                    box = box.parentNode;
                while (box) {
                    if (box === this.Content().dom_node())
                        return;
                    if (box.localName === 'p') {
                        const parent = box.parentNode;
                        if (parent === this.Content().dom_node())
                            return;
                        // $mol_dom_range.around( box ).split() ???
                        while (parent.firstChild)
                            parent.parentNode.insertBefore(parent.firstChild, parent);
                        parent.remove();
                        break;
                    }
                    box = box.parentNode;
                }
                this.selection_load();
                this.save();
                event.preventDefault();
            }
            /** Wraps selecion to given element type. */
            inline_toggle(Type, event) {
                const sel = $mol_dom_range.from_selection();
                if (sel.is_empty()) {
                    let box = sel.container();
                    if (box.nodeType !== box.ELEMENT_NODE)
                        box = box.parentNode;
                    while (box) {
                        if (box === this.Content().dom_node()) {
                            sel.expand().surround($mol_jsx(Type, null));
                            break;
                        }
                        if (box.localName === Type) {
                            while (box.firstChild)
                                box.parentNode.insertBefore(box.firstChild, box);
                            box.remove();
                            break;
                        }
                        box = box.parentNode;
                    }
                }
                else {
                    sel.surround($mol_jsx(Type, null));
                }
                this.selection_load();
                this.save();
                event.preventDefault();
            }
            paste(event) {
                const sel = $mol_dom_range.from_selection();
                const html = event.clipboardData.getData('text/html');
                const text = event.clipboardData.getData('text/plain');
                let url = true;
                try {
                    new URL(text);
                }
                catch {
                    url = false;
                }
                if (url) {
                    if (sel.is_empty()) {
                        sel.paste($mol_jsx("a", { href: text }, text));
                    }
                    else {
                        sel.surround($mol_jsx("a", { href: text }));
                    }
                }
                else {
                    const data = html ? $mol_dom_range.inside($mol_dom_parse(html).documentElement).copy() : new Text(text);
                    sel.paste(data);
                }
                this.selection_load();
                this.save();
                event?.preventDefault();
            }
            hover(event) {
                this.editable(event.ctrlKey ? 'false' : null);
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "editable", null);
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "sub", null);
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "content", null);
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "selection", null);
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "selection_sync", null);
        __decorate([
            $mol_mem
        ], $giper_baza_rich_edit.prototype, "selected", null);
        $$.$giper_baza_rich_edit = $giper_baza_rich_edit;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_flex_field) = class $giper_baza_flex_field extends ($.$mol_view) {
		Sub(){
			const obj = new this.$.$mol_view();
			return obj;
		}
		enabled(){
			return true;
		}
		enum(next){
			if(next !== undefined) return next;
			return null;
		}
		enum_options(){
			return [];
		}
		enum_label(id){
			return "";
		}
		atom_value(next){
			if(next !== undefined) return next;
			return null;
		}
		schema(){
			return null;
		}
		atom_selection(next){
			if(next !== undefined) return next;
			return [];
		}
		link_value(){
			return null;
		}
		Link_dump(){
			const obj = new this.$.$giper_baza_unit_sand_dump();
			(obj.land) = () => ((this.land()));
			(obj.value) = () => ((this.link_value()));
			return obj;
		}
		link(next){
			if(next !== undefined) return next;
			return null;
		}
		link_options(){
			return [];
		}
		link_label(id){
			return "";
		}
		Link_pick(){
			const obj = new this.$.$mol_select();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.link(next)));
			(obj.options) = () => ((this.link_options()));
			(obj.option_label) = (id) => ((this.link_label(id)));
			return obj;
		}
		Link_new_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		link_new(next){
			if(next !== undefined) return next;
			return null;
		}
		Link_new(){
			const obj = new this.$.$mol_select();
			(obj.Filter) = () => (null);
			(obj.trigger_content) = () => ([(this.Link_new_icon())]);
			(obj.value) = (next) => ((this.link_new(next)));
			(obj.dictionary) = () => ({
				"local": (this.$.$mol_locale.text("$giper_baza_flex_field_Link_new_dictionary_local")), 
				"pull": (this.$.$mol_locale.text("$giper_baza_flex_field_Link_new_dictionary_pull")), 
				"post": (this.$.$mol_locale.text("$giper_baza_flex_field_Link_new_dictionary_post")), 
				"read": (this.$.$mol_locale.text("$giper_baza_flex_field_Link_new_dictionary_read")), 
				"deny": (this.$.$mol_locale.text("$giper_baza_flex_field_Link_new_dictionary_deny"))
			});
			return obj;
		}
		link_content(){
			return [
				(this.Link_dump()), 
				(this.Link_pick()), 
				(this.Link_new())
			];
		}
		str(next){
			if(next !== undefined) return next;
			return "";
		}
		str_selection(next){
			if(next !== undefined) return next;
			return [];
		}
		time(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_time_moment();
			return obj;
		}
		dict_title(){
			return "";
		}
		dict_pawn(){
			const obj = new this.$.$giper_baza_dict();
			return obj;
		}
		Dict_form(){
			const obj = new this.$.$giper_baza_flex_form();
			(obj.enabled) = () => ((this.enabled()));
			(obj.pawn) = () => ((this.dict_pawn()));
			return obj;
		}
		text(next){
			if(next !== undefined) return next;
			return "";
		}
		text_selection(next){
			if(next !== undefined) return next;
			return [];
		}
		rich_pawn(next){
			if(next !== undefined) return next;
			const obj = new this.$.$giper_baza_rich();
			return obj;
		}
		list_item_adopt(next){
			if(next !== undefined) return next;
			return null;
		}
		list_receive(next){
			if(next !== undefined) return next;
			return null;
		}
		list_pick(next){
			if(next !== undefined) return next;
			return null;
		}
		List_pick(){
			const obj = new this.$.$mol_select();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.list_pick(next)));
			(obj.options) = () => ((this.link_options()));
			(obj.option_label) = (id) => ((this.link_label(id)));
			return obj;
		}
		list_item_add(next){
			if(next !== undefined) return next;
			return null;
		}
		List_item_add(){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.list_item_add(next)));
			(obj.title) = () => ("+");
			return obj;
		}
		list_item_paste(next){
			if(next !== undefined) return next;
			return null;
		}
		List_item_paste_icon(){
			const obj = new this.$.$mol_icon_content_paste();
			return obj;
		}
		List_item_paste(){
			const obj = new this.$.$mol_button_minor();
			(obj.enabled) = () => ((this.enabled()));
			(obj.click) = (next) => ((this.list_item_paste(next)));
			(obj.title) = () => ("Paste item");
			(obj.sub) = () => ([(this.List_item_paste_icon())]);
			return obj;
		}
		list_tools(){
			return [
				(this.List_pick()), 
				(this.List_item_add()), 
				(this.List_item_paste())
			];
		}
		List_tools(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ((this.list_tools()));
			return obj;
		}
		List_drop(){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.list_item_adopt(next)));
			(obj.receive) = (next) => ((this.list_receive(next)));
			(obj.allow) = () => (["move", "copy"]);
			(obj.Sub) = () => ((this.List_tools()));
			return obj;
		}
		list_item_receive(id, next){
			if(next !== undefined) return next;
			return null;
		}
		list_item_drag_end(id, next){
			if(next !== undefined) return next;
			return null;
		}
		list_item_text(id){
			return "";
		}
		list_item_html(id){
			return "";
		}
		list_item_uri(id){
			return "";
		}
		list_item_sand(id){
			const obj = new this.$.$giper_baza_unit_sand();
			return obj;
		}
		List_item_dump(id){
			const obj = new this.$.$giper_baza_unit_sand_dump();
			(obj.land) = () => ((this.land()));
			(obj.sand) = () => ((this.list_item_sand(id)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		List_item_drag(id){
			const obj = new this.$.$mol_drag();
			(obj.end) = (next) => ((this.list_item_drag_end(id, next)));
			(obj.transfer) = () => ({
				"text/plain": (this.list_item_text(id)), 
				"text/html": (this.list_item_html(id)), 
				"text/uri-list": (this.list_item_uri(id))
			});
			(obj.Sub) = () => ((this.List_item_dump(id)));
			return obj;
		}
		List_item_drop(id){
			const obj = new this.$.$mol_drop();
			(obj.adopt) = (next) => ((this.list_item_adopt(next)));
			(obj.receive) = (next) => ((this.list_item_receive(id, next)));
			(obj.allow) = () => (["move", "copy"]);
			(obj.Sub) = () => ((this.List_item_drag(id)));
			return obj;
		}
		List_item(id){
			return (this.List_item_drop(id));
		}
		list_items(){
			return [(this.List_item("0"))];
		}
		List_items(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.list_items()));
			return obj;
		}
		sub(){
			return [(this.Sub())];
		}
		pawn(next){
			if(next !== undefined) return next;
			const obj = new this.$.$giper_baza_pawn();
			return obj;
		}
		land(){
			return (this.pawn().land());
		}
		prop(){
			const obj = new this.$.$giper_baza_flex_prop();
			return obj;
		}
		Enum(){
			const obj = new this.$.$mol_select();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.enum(next)));
			(obj.options) = () => ((this.enum_options()));
			(obj.option_label) = (id) => ((this.enum_label(id)));
			return obj;
		}
		Atom(){
			const obj = new this.$.$giper_baza_vary_edit();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.atom_value(next)));
			(obj.schema) = () => ((this.schema()));
			(obj.selection) = (next) => ((this.atom_selection(next)));
			return obj;
		}
		Ref(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ((this.link_content()));
			return obj;
		}
		Str(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.str(next)));
			(obj.selection) = (next) => ((this.str_selection(next)));
			return obj;
		}
		Time(){
			const obj = new this.$.$mol_date();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value_moment) = (next) => ((this.time(next)));
			return obj;
		}
		Dict(){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ((this.dict_title()));
			(obj.content) = () => ([(this.Dict_form())]);
			return obj;
		}
		Text(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.enabled()));
			(obj.value) = (next) => ((this.text(next)));
			(obj.selection) = (next) => ((this.text_selection(next)));
			return obj;
		}
		Rich(){
			const obj = new this.$.$giper_baza_rich_edit();
			(obj.enabled) = () => ((this.enabled()));
			(obj.pawn) = (next) => ((this.rich_pawn(next)));
			return obj;
		}
		List(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.List_drop()), (this.List_items())]);
			return obj;
		}
	};
	($mol_mem(($.$giper_baza_flex_field.prototype), "Sub"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "enum"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "atom_value"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "atom_selection"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Link_dump"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "link"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Link_pick"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Link_new_icon"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "link_new"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Link_new"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "str"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "str_selection"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "time"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "dict_pawn"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Dict_form"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "text"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "text_selection"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "rich_pawn"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "list_item_adopt"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "list_receive"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "list_pick"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_pick"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "list_item_add"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_item_add"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "list_item_paste"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_item_paste_icon"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_item_paste"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_tools"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_drop"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "list_item_receive"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "list_item_drag_end"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "list_item_sand"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "List_item_dump"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "List_item_drag"));
	($mol_mem_key(($.$giper_baza_flex_field.prototype), "List_item_drop"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List_items"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "pawn"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "prop"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Enum"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Atom"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Ref"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Str"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Time"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Dict"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Text"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "Rich"));
	($mol_mem(($.$giper_baza_flex_field.prototype), "List"));


;
"use strict";
var $;
(function ($) {
    /** Entity dictionary Model with Title property included by default */
    class $giper_baza_entity extends $giper_baza_dict.with({
        /** Entity Title - default property for use */
        Title: $giper_baza_atom_text,
    }) {
        title(next) {
            return this.Title(next)?.val(next) ?? '';
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_entity.prototype, "title", null);
    $.$giper_baza_entity = $giper_baza_entity;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_flex_field extends $.$giper_baza_flex_field {
            dict_pawn() {
                return this.pawn();
            }
            schema() {
                const type = this.prop().Type()?.val() ?? 'str';
                switch (type) {
                    case 'vary': return null;
                    case 'enum': return null;
                    case 'bool': return 'Bool';
                    case 'int': return 'Bint';
                    case 'real': return 'Real';
                    case 'str': return 'Text';
                    case 'link': return null;
                    case 'time': return null;
                    case 'dict': return null;
                    case 'text': return null;
                    case 'rich': return null;
                    case 'list': return null;
                    default: return null;
                }
            }
            Sub() {
                const type = this.prop().Type()?.val() ?? 'str';
                switch (type) {
                    case 'vary': return this.Atom();
                    case 'enum': return this.Enum();
                    case 'bool': return this.Atom();
                    case 'int': return this.Atom();
                    case 'real': return this.Atom();
                    case 'str': return this.Atom();
                    case 'link': return this.Ref();
                    case 'time': return this.Atom();
                    case 'dict': return this.Dict();
                    case 'text': return this.Text();
                    case 'rich': return this.Rich();
                    case 'list': return this.List();
                    default: return $mol_fail(new Error(`Unsuported Pawn type (${type})`));
                }
            }
            enum(next) {
                return this.pawn(next)?.cast($giper_baza_atom).vary(next) ?? null;
            }
            enum_options() {
                return this.prop().Enum()?.remote()?.items_vary() ?? [];
            }
            enum_label(option) {
                return $mol_schema_string.cast(option);
            }
            atom_value(next) {
                return this.pawn(next)?.cast($giper_baza_atom).vary(next) ?? null;
            }
            atom_selection(next) {
                const link = this.pawn()?.head().str ?? '';
                const user = this.$.$giper_baza_glob.Land(this.$.$giper_baza_auth.current().pass().lord()).Data($giper_baza_flex_user);
                if (next) {
                    user.caret([[link + next[0], next[1], 0], [link + next[0], next[2], 0]]);
                    return next;
                }
                else {
                    this.atom_value(); // track text to recalc selection on its change
                    const sel = user.caret();
                    if (!sel)
                        return ['', 0, 0];
                    if (!sel[0][0].startsWith(link))
                        return ['', 0, 0];
                    if (!sel[1][0].startsWith(link))
                        return ['', 0, 0];
                    return [sel[0][0].slice(link.length), sel[0][1], sel[1][1]];
                }
            }
            link(next) {
                this.pawn(next)?.cast($giper_baza_atom_link).val(next) ?? null;
                return null;
            }
            link_content() {
                return [
                    ...this.link_value() === null ? [] : [this.Link_dump()],
                    ...this.link_options().length ? [this.Link_pick()] : [],
                    ...this.link_value() === null ? [this.Link_new()] : [],
                ];
            }
            link_value() {
                return this.pawn()?.cast($giper_baza_atom).vary() ?? null;
            }
            link_options() {
                return this.prop().Enum()?.remote()?.items_vary() ?? [];
            }
            link_label(link) {
                if (link instanceof $giper_baza_link)
                    return this.$.$giper_baza_glob.Pawn(link, $giper_baza_flex_subj).Name()?.val() ?? link.str;
                return $mol_schema_string.cast(link);
            }
            link_remote() {
                return (this.pawn().cast($giper_baza_atom_link.to(() => $giper_baza_dict))).remote();
            }
            link_new(rights) {
                if (!rights)
                    return null;
                const pawn = this.pawn('auto').cast($giper_baza_flex_subj_link);
                const Target = this.prop().Kind()?.remote();
                if (rights === 'local') {
                    const remote = pawn.ensure(null);
                    if (Target)
                        remote.meta(Target.link());
                    return null;
                }
                const preset = {
                    deny: [],
                    read: [[null, $giper_baza_rank_read]],
                    post: [[null, $giper_baza_rank_post('just')]],
                    pull: [[null, $giper_baza_rank_pull('just')]],
                }[rights];
                if (preset) {
                    const remote = pawn.ensure(preset);
                    if (Target)
                        remote.meta(Target.link());
                    return null;
                }
                return null;
            }
            text(next) {
                return this.pawn(next)?.cast($giper_baza_text).value(next) ?? '';
            }
            text_selection(next) {
                return this.pawn(next)?.cast($giper_baza_text).selection(this.land().auth().pass().lord(), next);
            }
            rich_pawn(next) {
                return this.pawn(next)?.cast($giper_baza_rich) ?? null;
            }
            dict_title() {
                return this.pawn()?.cast($giper_baza_entity).Title()?.val() || this.pawn().link().str;
            }
            list_items() {
                return this.pawn()?.units().map((_, index) => this.List_item(index)) ?? [];
            }
            list_tools() {
                return [
                    ...this.link_options().length ? [this.List_pick()] : [],
                    this.List_item_add(),
                    this.List_item_paste(),
                ];
            }
            list_pick(next) {
                if (!next)
                    return null;
                this.pawn(next)?.cast($giper_baza_list).add(next);
                return null;
            }
            list_item_add() {
                const target = this.pawn(null).cast($giper_baza_list_link.to(() => $giper_baza_flex_subj)).make(null);
                const meta = this.prop().Kind()?.remote()?.link() ?? null;
                if (meta)
                    target.meta(meta);
            }
            list_item_paste() {
                const str = $mol_wire_sync(navigator.clipboard).readText();
                let val = str;
                const Target = this.prop().Kind()?.remote();
                if (Target) {
                    const link = str.match($giper_baza_link)?.at(-1);
                    if (!link)
                        return null;
                    val = new $giper_baza_link(link);
                }
                this.pawn(null).cast($giper_baza_list).add(val);
            }
            list_item_kill(sand) {
                const list = this.pawn(null).cast($giper_baza_list);
                const index = list.units().indexOf(sand);
                list.wipe(index);
            }
            list_item_sand(index) {
                return this.pawn()?.units()[index] ?? null;
            }
            list_item_text(index) {
                const sand = this.list_item_sand(index);
                if (!sand)
                    return '';
                return String(this.land().sand_decode(sand));
            }
            list_item_adopt(transfer) {
                return $giper_baza_vary.take($mol_base64_decode(transfer.getData("text/plain")))[0];
            }
            list_item_receive(index, value) {
                const list = this.pawn().cast($giper_baza_list);
                list.splice([value], index);
            }
            list_receive(value) {
                const list = this.pawn().cast($giper_baza_list);
                list.splice([value]);
            }
            list_item_drag_end(index, event) {
                if (event.dataTransfer?.dropEffect !== 'move')
                    return;
                this.land().sand_wipe(this.list_item_sand(index));
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "schema", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "Sub", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "enum_options", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_flex_field.prototype, "enum_label", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "link_content", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "link_value", null);
        __decorate([
            $mol_action
        ], $giper_baza_flex_field.prototype, "link_new", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "rich_pawn", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "dict_title", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "list_items", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_field.prototype, "list_tools", null);
        __decorate([
            $mol_action
        ], $giper_baza_flex_field.prototype, "list_item_add", null);
        __decorate([
            $mol_action
        ], $giper_baza_flex_field.prototype, "list_item_paste", null);
        __decorate([
            $mol_action
        ], $giper_baza_flex_field.prototype, "list_item_kill", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_flex_field.prototype, "list_item_sand", null);
        $$.$giper_baza_flex_field = $giper_baza_flex_field;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_flex_field, {
            flex: {
                grow: 1,
                shrink: 1,
            },
            Atom: {
                flex: {
                    grow: 1,
                },
            },
            Link_new: {
                Trigger: {
                    justify: {
                        content: 'center',
                    },
                },
            },
            List: {
                flex: {
                    wrap: 'wrap',
                    shrink: 1,
                },
            },
            List_item_dump: {
            // padding: $mol_gap.text,
            },
            List_drop: {
                '[mol_drop_status]': {
                    drag: {
                        box: {
                            shadow: [[`inset`, 0, `1px`, 0, 0, $mol_theme.focus]],
                        },
                    },
                },
            },
            List_item_drop: {
                '[mol_drop_status]': {
                    drag: {
                        box: {
                            shadow: [[`inset`, 0, `1px`, 0, 0, $mol_theme.focus]],
                        },
                    },
                },
            },
            $giper_baza_flex_form: {
                padding: $mol_gap.block,
                flex: {
                    grow: 1,
                },
                background: {
                    color: $mol_theme.card,
                },
            },
            List_item_add: {
                justify: {
                    content: 'center',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_flex_form) = class $giper_baza_flex_form extends ($.$mol_list) {
		field_name(id){
			return "";
		}
		field_expanded(id, next){
			if(next !== undefined) return next;
			return true;
		}
		field_pawn(id, next){
			if(next !== undefined) return next;
			const obj = new this.$.$giper_baza_pawn();
			return obj;
		}
		field_prop(id){
			const obj = new this.$.$giper_baza_flex_prop();
			return obj;
		}
		enabled(){
			return true;
		}
		Field_control(id){
			const obj = new this.$.$giper_baza_flex_field();
			(obj.pawn) = (next) => ((this.field_pawn(id, next)));
			(obj.prop) = () => ((this.field_prop(id)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Field_content(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Field_control(id))]);
			return obj;
		}
		Field(id){
			const obj = new this.$.$mol_expander();
			(obj.title) = () => ((this.field_name(id)));
			(obj.expanded) = (next) => ((this.field_expanded(id, next)));
			(obj.content) = () => ([(this.Field_content(id))]);
			return obj;
		}
		fields(){
			return [(this.Field("0"))];
		}
		pawn(){
			const obj = new this.$.$giper_baza_dict();
			return obj;
		}
		meta(){
			const obj = new this.$.$giper_baza_flex_meta();
			return obj;
		}
		rows(){
			return (this.fields());
		}
	};
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "field_expanded"));
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "field_pawn"));
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "field_prop"));
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "Field_control"));
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "Field_content"));
	($mol_mem_key(($.$giper_baza_flex_form.prototype), "Field"));
	($mol_mem(($.$giper_baza_flex_form.prototype), "pawn"));
	($mol_mem(($.$giper_baza_flex_form.prototype), "meta"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_flex_form extends $.$giper_baza_flex_form {
            meta() {
                const link = this.pawn().meta();
                if (link)
                    return this.$.$giper_baza_glob.Pawn(link, $giper_baza_flex_meta);
                const deck = this.$.$giper_baza_glob.Pawn(new $giper_baza_link('jxYnCnkk_T23Mqbbd'), $giper_baza_flex_deck);
                const Pawn = deck.Metas()?.remote_list()[0];
                return Pawn;
            }
            fields() {
                return this.meta()?.prop_all().map(key => this.Field(key)) ?? [];
            }
            field_name(prop) {
                return prop.name();
            }
            field_pawn(prop, auto) {
                return this.pawn().cast($giper_baza_dict).dive(prop.Path(auto)?.val() ?? prop.link(), $giper_baza_pawn, auto);
            }
            field_prop(prop) {
                return prop;
            }
            enabled() {
                return this.pawn()?.can_change() ?? false;
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_flex_form.prototype, "meta", null);
        __decorate([
            $mol_mem
        ], $giper_baza_flex_form.prototype, "fields", null);
        $$.$giper_baza_flex_form = $giper_baza_flex_form;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_flex_form, {
            gap: $mol_gap.block,
            Field: {
                background: {
                    color: $mol_theme.card,
                },
                border: {
                    radius: $mol_gap.round,
                },
                Trigger: {
                    Icon: {
                        margin: 0,
                    },
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_pawn_dump) = class $giper_baza_pawn_dump extends ($.$mol_expander) {
		can_change(){
			return (this.pawn().can_change());
		}
		land(){
			return (this.pawn().land());
		}
		title(){
			return "";
		}
		Head(){
			const obj = new this.$.$mol_paragraph();
			(obj.sub) = () => ([(this.title())]);
			return obj;
		}
		key_new(next){
			if(next !== undefined) return next;
			return "";
		}
		add_key(next){
			if(next !== undefined) return next;
			return null;
		}
		Add_key(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.can_change()));
			(obj.hint) = () => ("+");
			(obj.value) = (next) => ((this.key_new(next)));
			(obj.submit) = (next) => ((this.add_key(next)));
			return obj;
		}
		value_new(next){
			if(next !== undefined) return next;
			return "";
		}
		add_value(next){
			if(next !== undefined) return next;
			return null;
		}
		Add_value(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.can_change()));
			(obj.hint) = () => ("+");
			(obj.value) = (next) => ((this.value_new(next)));
			(obj.submit) = (next) => ((this.add_value(next)));
			return obj;
		}
		text(next){
			if(next !== undefined) return next;
			return "";
		}
		Value_text(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.can_change()));
			(obj.value) = (next) => ((this.text(next)));
			return obj;
		}
		value_str(next){
			if(next !== undefined) return next;
			return "";
		}
		Value_str(){
			const obj = new this.$.$mol_textarea();
			(obj.enabled) = () => ((this.can_change()));
			(obj.value) = (next) => ((this.value_str(next)));
			return obj;
		}
		unit_tag(id, next){
			if(next !== undefined) return next;
			return "term";
		}
		Unit_tag(id){
			const obj = new this.$.$mol_select();
			(obj.value) = (next) => ((this.unit_tag(id, next)));
			(obj.enabled) = () => ((this.can_change()));
			(obj.dictionary) = () => ({
				"term": "💼 term", 
				"solo": "🔝 solo", 
				"vals": "🎹 vals", 
				"keys": "🔑 keys"
			});
			return obj;
		}
		unit_time(id){
			return "";
		}
		Unit_time(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.unit_time(id))]);
			return obj;
		}
		unit_value(id){
			return null;
		}
		Unit_value(id){
			const obj = new this.$.$giper_baza_unit_sand_dump();
			(obj.land) = () => ((this.land()));
			(obj.sand) = () => ((this.unit_value(id)));
			(obj.enabled) = () => ((this.can_change()));
			return obj;
		}
		pawn_addons(id){
			return [
				(this.Unit_tag(id)), 
				(this.Unit_time(id)), 
				(this.Unit_value(id))
			];
		}
		pawn_inner(id){
			const obj = new this.$.$giper_baza_pawn();
			return obj;
		}
		Pawn_inner(id){
			const obj = new this.$.$giper_baza_pawn_dump();
			(obj.tag) = () => ((this.unit_tag(id)));
			(obj.addons) = () => ((this.pawn_addons(id)));
			(obj.pawn) = () => ((this.pawn_inner(id)));
			return obj;
		}
		Inner(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Pawn_inner(id))]);
			return obj;
		}
		pawns(){
			return [(this.Inner("0"))];
		}
		pawn(){
			const obj = new this.$.$giper_baza_pawn();
			return obj;
		}
		tag(){
			return "keys";
		}
		label(){
			return [(this.Head())];
		}
		addons(){
			return [];
		}
		Tools(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([...(this.addons())]);
			return obj;
		}
		editors(){
			return [
				(this.Add_key()), 
				(this.Add_value()), 
				(this.Value_text()), 
				(this.Value_str())
			];
		}
		content(){
			return (this.pawns());
		}
	};
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Head"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "key_new"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "add_key"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Add_key"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "value_new"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "add_value"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Add_value"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "text"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Value_text"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "value_str"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Value_str"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "unit_tag"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "Unit_tag"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "Unit_time"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "Unit_value"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "pawn_inner"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "Pawn_inner"));
	($mol_mem_key(($.$giper_baza_pawn_dump.prototype), "Inner"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "pawn"));
	($mol_mem(($.$giper_baza_pawn_dump.prototype), "Tools"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_pawn_dump extends $.$giper_baza_pawn_dump {
            title() {
                return this.pawn().head().str || '__meta__';
            }
            value() {
                return this.pawn().cast($giper_baza_atom).vary();
            }
            items() {
                return this.pawn().cast($giper_baza_list).items_vary();
            }
            units() {
                const units = this.pawn().land().sand_ordered({ head: this.pawn().head(), peer: null });
                this.pawn().land().sands_open(units);
                return units;
            }
            pawns() {
                return this.units().map((_, i) => this.Inner(i));
            }
            unit_tag(index, next) {
                if (next) {
                    const units = this.units();
                    const unit = units[index];
                    this.pawn().land().post(index ? units[index - 1].self() : $giper_baza_link.hole, unit.head(), unit.self(), this.pawn().land().sand_decode(unit), next);
                }
                return this.units()[index].tag();
            }
            unit_time(index) {
                const unit = this.units()[index];
                return $giper_baza_time_dump(unit.time(), unit.tick());
            }
            unit_value(index) {
                return this.units()[index];
            }
            pawn_inner(index) {
                return this.pawn().land().Pawn($giper_baza_dict).Head(this.units()[index].self());
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_pawn_dump.prototype, "units", null);
        __decorate([
            $mol_mem
        ], $giper_baza_pawn_dump.prototype, "pawns", null);
        $$.$giper_baza_pawn_dump = $giper_baza_pawn_dump;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_pawn_dump, {
            font: {
                family: 'monospace',
            },
            whiteSpace: 'pre-wrap',
            align: {
                items: 'flex-start',
            },
            Trigger: {
                flex: {
                    grow: 0,
                },
            },
            Add_key: {
                flex: {
                    grow: 0,
                },
            },
            Add_value: {
                flex: {
                    grow: 0,
                },
            },
            Tools: {
                flex: {
                    //basis: `40rem`,
                    grow: 1,
                    shrink: 1,
                    wrap: `wrap`,
                },
                // justify: {
                // 	content: `flex-end`,
                // },
            },
            Label: {
                justify: {
                // content: `space-between`,
                },
            },
            Pawn_inner: {
                flex: {
                    grow: 1,
                },
                align: {
                    items: 'stretch',
                },
                Trigger: {
                    align: {
                        items: 'flex-start',
                    }
                },
            },
            Head: {
            // color: $mol_theme.special,
            },
            Value_text: {
                flex: {
                    basis: `20rem`,
                    shrink: 1,
                }
            },
            Value_str: {
                flex: {
                    shrink: 1,
                }
            },
            Unit_time: {
                color: $mol_theme.shade,
                padding: $mol_gap.text,
            },
            // Unit_tip: {
            // 	color: $mol_theme.shade,
            // },
            Unit_tag: {
                color: $mol_theme.shade,
            },
            Unit_value: {
                flex: {
                    grow: 1,
                },
            },
            Content: {
                padding: {
                    left: `2ch`,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_source) = class $mol_icon_source extends ($.$mol_icon) {
		path(){
			return "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z";
		}
	};


;
"use strict";


;
	($.$mol_icon_source_fork) = class $mol_icon_source_fork extends ($.$mol_icon) {
		path(){
			return "M6,2A3,3 0 0,1 9,5C9,6.28 8.19,7.38 7.06,7.81C7.15,8.27 7.39,8.83 8,9.63C9,10.92 11,12.83 12,14.17C13,12.83 15,10.92 16,9.63C16.61,8.83 16.85,8.27 16.94,7.81C15.81,7.38 15,6.28 15,5A3,3 0 0,1 18,2A3,3 0 0,1 21,5C21,6.32 20.14,7.45 18.95,7.85C18.87,8.37 18.64,9 18,9.83C17,11.17 15,13.08 14,14.38C13.39,15.17 13.15,15.73 13.06,16.19C14.19,16.62 15,17.72 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.72 9.81,16.62 10.94,16.19C10.85,15.73 10.61,15.17 10,14.38C9,13.08 7,11.17 6,9.83C5.36,9 5.13,8.37 5.05,7.85C3.86,7.45 3,6.32 3,5A3,3 0 0,1 6,2M6,4A1,1 0 0,0 5,5A1,1 0 0,0 6,6A1,1 0 0,0 7,5A1,1 0 0,0 6,4M18,4A1,1 0 0,0 17,5A1,1 0 0,0 18,6A1,1 0 0,0 19,5A1,1 0 0,0 18,4M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_download) = class $mol_icon_download extends ($.$mol_icon) {
		path(){
			return "M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z";
		}
	};


;
"use strict";


;
	($.$mol_button_download) = class $mol_button_download extends ($.$mol_button_minor) {
		Icon(){
			const obj = new this.$.$mol_icon_download();
			return obj;
		}
		title(){
			return "";
		}
		blob(){
			return null;
		}
		uri(){
			return "";
		}
		file_name(){
			return "blob.bin";
		}
		sub(){
			return [(this.Icon()), (this.title())];
		}
	};
	($mol_mem(($.$mol_button_download.prototype), "Icon"));


;
"use strict";
/** @jsx $mol_jsx */
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Button download file from uri() or a blob()
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_button_demo
         */
        class $mol_button_download extends $.$mol_button_download {
            uri() {
                return URL.createObjectURL(this.blob());
            }
            click() {
                const a = $mol_jsx("a", { href: this.uri(), download: this.file_name() });
                a.click();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_button_download.prototype, "uri", null);
        $$.$mol_button_download = $mol_button_download;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";


;
	($.$giper_baza_land_page) = class $giper_baza_land_page extends ($.$mol_page) {
		pawn_link(){
			return (this.pawn().link());
		}
		Pawn_link(){
			const obj = new this.$.$giper_baza_link_chip();
			(obj.link) = () => ((this.pawn_link()));
			return obj;
		}
		meta_link(){
			const obj = new this.$.$giper_baza_link();
			return obj;
		}
		Meta_link(){
			const obj = new this.$.$giper_baza_link_chip();
			(obj.link) = () => ((this.meta_link()));
			(obj.sub) = () => (["✨"]);
			return obj;
		}
		Flex(){
			const obj = new this.$.$giper_baza_flex_form();
			(obj.pawn) = () => ((this.pawn()));
			return obj;
		}
		Raw_data(){
			const obj = new this.$.$giper_baza_pawn_dump();
			(obj.title) = () => ("Data");
			(obj.pawn) = () => ((this.pawn()));
			return obj;
		}
		tine(){
			const obj = new this.$.$giper_baza_pawn();
			return obj;
		}
		Raw_tine(){
			const obj = new this.$.$giper_baza_pawn_dump();
			(obj.title) = () => ("Tine");
			(obj.pawn) = () => ((this.tine()));
			return obj;
		}
		Raw_content(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ([(this.Raw_data()), (this.Raw_tine())]);
			return obj;
		}
		Raw(){
			const obj = new this.$.$mol_labeler();
			(obj.Content) = () => ((this.Raw_content()));
			return obj;
		}
		Fork_icon(){
			const obj = new this.$.$mol_icon_source_fork();
			return obj;
		}
		fork(next){
			if(next !== undefined) return next;
			return null;
		}
		Fork(){
			const obj = new this.$.$mol_button_minor();
			(obj.hint) = () => ("Fork this land");
			(obj.sub) = () => ([(this.Fork_icon())]);
			(obj.click) = (next) => ((this.fork(next)));
			return obj;
		}
		size(){
			return "0 KB";
		}
		Size(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.size())]);
			return obj;
		}
		dump(){
			const obj = new this.$.$mol_blob();
			return obj;
		}
		dump_name(){
			return "AAAAAAAA_AAAAAAAA.baza";
		}
		Dump(){
			const obj = new this.$.$mol_button_download();
			(obj.hint) = () => ("Download dump");
			(obj.blob) = () => ((this.dump()));
			(obj.file_name) = () => ((this.dump_name()));
			return obj;
		}
		Dumping(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Size()), (this.Dump())]);
			return obj;
		}
		land(){
			const obj = new this.$.$giper_baza_land();
			return obj;
		}
		pawn(){
			const obj = new this.$.$giper_baza_dict();
			return obj;
		}
		head(){
			return [
				(this.Pawn_link()), 
				(this.Meta_link()), 
				(this.Tools())
			];
		}
		body(){
			return [(this.Flex()), (this.Raw())];
		}
		foot(){
			return [(this.Fork()), (this.Dumping())];
		}
	};
	($mol_mem(($.$giper_baza_land_page.prototype), "Pawn_link"));
	($mol_mem(($.$giper_baza_land_page.prototype), "meta_link"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Meta_link"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Flex"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Raw_data"));
	($mol_mem(($.$giper_baza_land_page.prototype), "tine"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Raw_tine"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Raw_content"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Raw"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Fork_icon"));
	($mol_mem(($.$giper_baza_land_page.prototype), "fork"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Fork"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Size"));
	($mol_mem(($.$giper_baza_land_page.prototype), "dump"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Dump"));
	($mol_mem(($.$giper_baza_land_page.prototype), "Dumping"));
	($mol_mem(($.$giper_baza_land_page.prototype), "land"));
	($mol_mem(($.$giper_baza_land_page.prototype), "pawn"));


;
"use strict";
var $;
(function ($) {
    let $mol_si_prefix;
    (function ($mol_si_prefix) {
        $mol_si_prefix[$mol_si_prefix["y"] = -8] = "y";
        $mol_si_prefix[$mol_si_prefix["z"] = -7] = "z";
        $mol_si_prefix[$mol_si_prefix["a"] = -6] = "a";
        $mol_si_prefix[$mol_si_prefix["f"] = -5] = "f";
        $mol_si_prefix[$mol_si_prefix["p"] = -4] = "p";
        $mol_si_prefix[$mol_si_prefix["n"] = -3] = "n";
        $mol_si_prefix[$mol_si_prefix["\u00B5"] = -2] = "\u00B5";
        $mol_si_prefix[$mol_si_prefix["m"] = -1] = "m";
        $mol_si_prefix[$mol_si_prefix[""] = 0] = "";
        $mol_si_prefix[$mol_si_prefix["k"] = 1] = "k";
        $mol_si_prefix[$mol_si_prefix["M"] = 2] = "M";
        $mol_si_prefix[$mol_si_prefix["G"] = 3] = "G";
        $mol_si_prefix[$mol_si_prefix["T"] = 4] = "T";
        $mol_si_prefix[$mol_si_prefix["P"] = 5] = "P";
        $mol_si_prefix[$mol_si_prefix["E"] = 6] = "E";
        $mol_si_prefix[$mol_si_prefix["Z"] = 7] = "Z";
        $mol_si_prefix[$mol_si_prefix["Y"] = 8] = "Y";
    })($mol_si_prefix = $.$mol_si_prefix || ($.$mol_si_prefix = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_si_short(numb, unit = '') {
        let magnitude = Math.floor(Math.log10(Math.abs(numb)) / 3);
        if (!Number.isFinite(magnitude)) {
            const prefix = isNaN(numb) ? `∅` : numb.toLocaleString();
            const suffix = unit ? ' ' + unit : '';
            return prefix + suffix;
        }
        let normal = numb / 10 ** (3 * magnitude);
        if (Math.round(Math.abs(normal)) === 1000) {
            normal /= 1000;
            ++magnitude;
        }
        const prefix = normal.toPrecision(3);
        if (unit) {
            return prefix + ' ' + $mol_si_prefix[magnitude] + unit;
        }
        else {
            return prefix + $mol_si_prefix[magnitude];
        }
    }
    $.$mol_si_short = $mol_si_short;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Special'() {
            $mol_assert_equal($mol_si_short(0), '0');
            $mol_assert_equal($mol_si_short(1 / 0), '∞');
            $mol_assert_equal($mol_si_short(-1 / 0), '-∞');
            $mol_assert_equal($mol_si_short(0 / 0), '∅');
        },
        'M'() {
            $mol_assert_equal($mol_si_short(0), '0');
            $mol_assert_equal($mol_si_short(0.999500), '1.00');
            $mol_assert_equal($mol_si_short(-0.999600), '-1.00');
            $mol_assert_equal($mol_si_short(999.4), '999');
            $mol_assert_equal($mol_si_short(-999.4), '-999');
        },
        'L'() {
            $mol_assert_equal($mol_si_short(999.5), '1.00k');
            $mol_assert_equal($mol_si_short(-999.5), '-1.00k');
            $mol_assert_equal($mol_si_short(999_400), '999k');
            $mol_assert_equal($mol_si_short(-999_400), '-999k');
        },
        'XL'() {
            $mol_assert_equal($mol_si_short(999_500), '1.00M');
            $mol_assert_equal($mol_si_short(-999_600), '-1.00M');
            $mol_assert_equal($mol_si_short(999_400_000), '999M');
            $mol_assert_equal($mol_si_short(-999_400_000), '-999M');
        },
        'S'() {
            $mol_assert_equal($mol_si_short(0.999400), '999m');
            $mol_assert_equal($mol_si_short(-0.999400), '-999m');
            $mol_assert_equal($mol_si_short(0.000_999_500), '1.00m');
            $mol_assert_equal($mol_si_short(-0.000_999_500), '-1.00m');
        },
        'XS'() {
            $mol_assert_equal($mol_si_short(0.000_999_400), '999µ');
            $mol_assert_equal($mol_si_short(-0.000_999_400), '-999µ');
            $mol_assert_equal($mol_si_short(0.000_000_999_600), '1.00µ');
            $mol_assert_equal($mol_si_short(-0.000_000_999_600), '-1.00µ');
        },
        'With unit'() {
            $mol_assert_equal($mol_si_short(0, 's'), '0 s');
            $mol_assert_equal($mol_si_short(1 / 0, 's'), '∞ s');
            $mol_assert_equal($mol_si_short(0 / 0, 's'), '∅ s');
            $mol_assert_equal($mol_si_short(123, 'Hz'), '123 Hz');
            $mol_assert_equal($mol_si_short(1234, 'g'), '1.23 kg');
        },
    });
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_land_page extends $.$giper_baza_land_page {
            theme() {
                return this.encrypted() ? '$mol_theme_special' : null;
            }
            encrypted() {
                return this.land().encrypted();
            }
            Meta_link() {
                return this.pawn().meta() ? super.Meta_link() : null;
            }
            meta_link() {
                return this.pawn().meta();
            }
            // override node_title( head: string ) {
            // 	const id = this.node_dump( head ).head()
            // 	if( id === $giper_baza_land_root.tine ) return 'Meta'
            // 	return id || 'Data'
            // }
            tine() {
                return this.land().Tine();
            }
            // @ $mol_mem
            // override body() {
            // 	return [
            // 		this.Flex(),
            // 		this.Node_dump( this.node().head() ),
            // 		this.Node_dump( $giper_baza_land_root.tine ),
            // 	]
            // }
            dump_data_pawn() {
                return this.pawn();
            }
            fork() {
                this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
                    link: this.land().fork().link().str
                });
            }
            pack() {
                this.$.$mol_wait_rest();
                const units = this.land().diff_units();
                const pack = $giper_baza_pack.make([[
                        this.land().link().str,
                        new $giper_baza_pack_part(units)
                    ]]);
                return pack;
            }
            size() {
                const parts = this.land().diff_parts();
                const size = $giper_baza_pack.length(parts);
                return $mol_si_short(size, 'B');
            }
            dump() {
                return this.pack()?.toBlob();
            }
            dump_name() {
                return `${this.land().link()}.baza`;
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_land_page.prototype, "Meta_link", null);
        __decorate([
            $mol_mem
        ], $giper_baza_land_page.prototype, "pack", null);
        __decorate([
            $mol_mem
        ], $giper_baza_land_page.prototype, "size", null);
        $$.$giper_baza_land_page = $giper_baza_land_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_land_page, {
            flex: {
                basis: `60rem`,
                grow: 1,
            },
            Pawn_link: {
                flex: {
                    grow: 1,
                },
            },
            Size: {
                padding: $mol_gap.text,
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_delete) = class $mol_icon_delete extends ($.$mol_icon) {
		path(){
			return "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
		}
	};


;
"use strict";


;
	($.$mol_icon_delete_forever) = class $mol_icon_delete_forever extends ($.$mol_icon) {
		path(){
			return "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z";
		}
	};


;
"use strict";


;
	($.$giper_baza_land_grab) = class $giper_baza_land_grab extends ($.$mol_select) {
		Trigger_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Filter(){
			return null;
		}
		trigger_content(){
			return [(this.Trigger_icon())];
		}
		dictionary(){
			return {
				"pull": (this.$.$mol_locale.text("$giper_baza_land_grab_dictionary_pull")), 
				"post": (this.$.$mol_locale.text("$giper_baza_land_grab_dictionary_post")), 
				"read": (this.$.$mol_locale.text("$giper_baza_land_grab_dictionary_read")), 
				"deny": (this.$.$mol_locale.text("$giper_baza_land_grab_dictionary_deny"))
			};
		}
		grab(next){
			if(next !== undefined) return next;
			return null;
		}
	};
	($mol_mem(($.$giper_baza_land_grab.prototype), "Trigger_icon"));
	($mol_mem(($.$giper_baza_land_grab.prototype), "grab"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_land_grab extends $.$giper_baza_land_grab {
            value(rights) {
                const preset = {
                    deny: [],
                    read: [[null, $giper_baza_rank_read]],
                    post: [[null, $giper_baza_rank_post('slow')]],
                    pull: [[null, $giper_baza_rank_pull('slow')]],
                }[rights];
                if (preset)
                    this.grab(preset);
                return '';
            }
        }
        $$.$giper_baza_land_grab = $giper_baza_land_grab;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_land_rights) = class $giper_baza_land_rights extends ($.$mol_list) {
		add_key(next){
			if(next !== undefined) return next;
			return "";
		}
		add_commit(next){
			if(next !== undefined) return next;
			return null;
		}
		enabled(){
			return false;
		}
		Add_key(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_land_rights_Add_key_hint")));
			(obj.value) = (next) => ((this.add_key(next)));
			(obj.submit) = (next) => ((this.add_commit(next)));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		Add_commit_icon(){
			const obj = new this.$.$mol_icon_plus();
			return obj;
		}
		Add_commit(){
			const obj = new this.$.$mol_button_minor();
			(obj.click) = (next) => ((this.add_commit(next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.sub) = () => ([(this.Add_commit_icon())]);
			return obj;
		}
		Add(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Add_key()), (this.Add_commit())]);
			return obj;
		}
		gift_rate(id, next){
			if(next !== undefined) return next;
			return "0";
		}
		Gift_rate(id){
			const obj = new this.$.$mol_select();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_land_rights_Gift_rate_hint")));
			(obj.value) = (next) => ((this.gift_rate(id, next)));
			(obj.enabled) = () => ((this.enabled()));
			(obj.Filter) = () => (null);
			(obj.dictionary) = () => ({
				"0": "0 🦼 ~1W", 
				"1": "1 🚲 ~3D", 
				"2": "2 🛵 ~1D", 
				"3": "3 🚜 ~D/2", 
				"4": "4 🏇 ~8h", 
				"5": "5 🚂 ~4h", 
				"6": "6 🚛 ~2h", 
				"7": "7 🚗 ~1h", 
				"8": "8 🏍️ ~h/2", 
				"9": "9 🏎️ ~5m", 
				"A": "A 🚅 ~2m", 
				"B": "B 🚁 ~m/2", 
				"C": "C 🛩️ ~2s", 
				"D": "D ✈️ ~s/2", 
				"E": "E 🚀 ~50ms", 
				"F": "F 🛸 ~1ms"
			});
			return obj;
		}
		gift_tier(id, next){
			if(next !== undefined) return next;
			return "deny";
		}
		tier_options(){
			return {
				"deny": (this.$.$mol_locale.text("$giper_baza_land_rights_tier_options_deny")), 
				"read": (this.$.$mol_locale.text("$giper_baza_land_rights_tier_options_read")), 
				"post": (this.$.$mol_locale.text("$giper_baza_land_rights_tier_options_post")), 
				"pull": (this.$.$mol_locale.text("$giper_baza_land_rights_tier_options_pull")), 
				"rule": (this.$.$mol_locale.text("$giper_baza_land_rights_tier_options_rule"))
			};
		}
		Gift_tier(id){
			const obj = new this.$.$mol_select();
			(obj.hint) = () => ((this.$.$mol_locale.text("$giper_baza_land_rights_Gift_tier_hint")));
			(obj.value) = (next) => ((this.gift_tier(id, next)));
			(obj.Filter) = () => (null);
			(obj.dictionary) = () => ((this.tier_options()));
			(obj.enabled) = () => ((this.enabled()));
			return obj;
		}
		link_param(){
			return "link";
		}
		peer_link(id){
			const obj = new this.$.$giper_baza_link();
			return obj;
		}
		peer_id(id){
			return "";
		}
		Gift_avatar(id){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this.peer_id(id)));
			return obj;
		}
		Gift_name(id){
			const obj = new this.$.$giper_baza_link_chip();
			(obj.param) = () => ((this.link_param()));
			(obj.link) = () => ((this.peer_link(id)));
			(obj.sub) = () => ([...(this.$.$giper_baza_link_chip.prototype.sub.call(obj)), (this.Gift_avatar(id))]);
			return obj;
		}
		Gift(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([
				(this.Gift_rate(id)), 
				(this.Gift_tier(id)), 
				(this.Gift_name(id))
			]);
			return obj;
		}
		gifts(){
			return [(this.Gift("0"))];
		}
		land(){
			const obj = new this.$.$giper_baza_land();
			return obj;
		}
		rows(){
			return [(this.Add()), ...(this.gifts())];
		}
	};
	($mol_mem(($.$giper_baza_land_rights.prototype), "add_key"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "add_commit"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "Add_key"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "Add_commit_icon"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "Add_commit"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "Add"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "gift_rate"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "Gift_rate"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "gift_tier"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "Gift_tier"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "peer_link"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "Gift_avatar"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "Gift_name"));
	($mol_mem_key(($.$giper_baza_land_rights.prototype), "Gift"));
	($mol_mem(($.$giper_baza_land_rights.prototype), "land"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_land_rights extends $.$giper_baza_land_rights {
            rows() {
                if (this.enabled())
                    return super.rows();
                else
                    return this.gifts();
            }
            gifts() {
                const land = this.land();
                return [...land._gift.keys()]
                    .filter(link => link !== land.link().lord().str)
                    .reverse()
                    .map(link => this.Gift(new $giper_baza_link(link)));
            }
            peer_link(lord) {
                return lord;
            }
            peer_id(lord) {
                return lord.str;
            }
            gift_tier(lord, next) {
                const rank = this.land().lord_rank(lord, next && $giper_baza_rank_make(next, 'just'));
                return $giper_baza_rank_tier[rank & 0b0_1111_0000];
            }
            gift_rate(lord, next) {
                const arg = next ? $giper_baza_rank(this.land().lord_rank(lord) & 0b0_1111_0000 | parseInt(next, 16)) : undefined;
                const rank = this.land().lord_rank(lord, arg);
                return (rank & 0b1111).toString(16).toUpperCase();
            }
            add_commit() {
                let key = this.add_key();
                if (/^\w{8}_\w{8}$/.test(key)) {
                    const link = new $giper_baza_link(key);
                    const peer_land = this.$.$giper_baza_glob.Land(link);
                    const pass = peer_land.lord_pass(link);
                    if (!pass)
                        return $mol_fail(new Error('No Pass for Lord'));
                    this.land().give(pass, $giper_baza_rank_read);
                }
                else {
                    const pass = $giper_baza_auth_pass.from(key);
                    this.land().give(pass, $giper_baza_rank_read);
                }
                this.add_key('');
            }
            tier_options() {
                if (this.land().encrypted())
                    return super.tier_options();
                const options = { ...super.tier_options() };
                delete options.deny;
                return options;
            }
            enabled() {
                return this.land().lord_rank(this.land().auth().pass().lord()) >= $giper_baza_rank_rule;
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_land_rights.prototype, "rows", null);
        __decorate([
            $mol_mem
        ], $giper_baza_land_rights.prototype, "gifts", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_land_rights.prototype, "gift_tier", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_land_rights.prototype, "gift_rate", null);
        __decorate([
            $mol_mem
        ], $giper_baza_land_rights.prototype, "tier_options", null);
        __decorate([
            $mol_mem
        ], $giper_baza_land_rights.prototype, "enabled", null);
        $$.$giper_baza_land_rights = $giper_baza_land_rights;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_land_rights, {
            gap: $mol_gap.block,
            Gift: {
                flex: {
                    wrap: 'wrap',
                },
                background: {
                    color: $mol_theme.card,
                },
            },
            Gift_name: {
                flex: {
                    grow: 1,
                },
            },
            Gift_tier: {
                flex: {
                    grow: 0,
                    basis: `7em`,
                },
                font: {
                    family: 'monospace',
                },
            },
            Gift_rate: {
                flex: {
                    grow: 0,
                    basis: `8em`,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_glob_book) = class $giper_baza_glob_book extends ($.$mol_book2_catalog) {
		home_link(){
			return "";
		}
		Home_link_icon(){
			const obj = new this.$.$mol_icon_account();
			return obj;
		}
		Home_link(){
			const obj = new this.$.$mol_link();
			(obj.hint) = () => ("Your Home");
			(obj.arg) = () => ({"link": (this.home_link())});
			(obj.sub) = () => ([(this.Home_link_icon())]);
			return obj;
		}
		land(id){
			const obj = new this.$.$giper_baza_land();
			return obj;
		}
		pawn(id){
			const obj = new this.$.$giper_baza_dict();
			return obj;
		}
		Rights_open_icon(){
			const obj = new this.$.$mol_icon_security();
			return obj;
		}
		Rights_open(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"side": "rights"});
			(obj.sub) = () => ([(this.Rights_open_icon())]);
			return obj;
		}
		Land(id){
			const obj = new this.$.$giper_baza_land_page();
			(obj.land) = () => ((this.land(id)));
			(obj.pawn) = () => ((this.pawn(id)));
			(obj.tools) = () => ([
				...(this.$.$giper_baza_land_page.prototype.tools.call(obj)), 
				(this.Rights_open()), 
				(this.Spread_close())
			]);
			return obj;
		}
		land_checked(id, next){
			if(next !== undefined) return next;
			return false;
		}
		Land_checked(id){
			const obj = new this.$.$mol_check_box();
			(obj.checked) = (next) => ((this.land_checked(id, next)));
			return obj;
		}
		wipe(next){
			if(next !== undefined) return next;
			return null;
		}
		Wipe_icon(){
			const obj = new this.$.$mol_icon_delete_forever();
			return obj;
		}
		Wipe_pick(){
			const obj = new this.$.$mol_pick();
			(obj.hint) = () => ("Wipe database");
			(obj.clicks) = (next) => ((this.wipe(next)));
			(obj.align_hor) = () => ("right");
			(obj.trigger_content) = () => ([(this.Wipe_icon())]);
			(obj.bubble_content) = () => (["Double to wipe database"]);
			return obj;
		}
		land_add(next){
			if(next !== undefined) return next;
			return null;
		}
		Land_add(){
			const obj = new this.$.$giper_baza_land_grab();
			(obj.hint) = () => ("Grab new Land");
			(obj.align_hor) = () => ("left");
			(obj.grab) = (next) => ((this.land_add(next)));
			return obj;
		}
		update(next){
			if(next !== undefined) return next;
			return [];
		}
		Update(){
			const obj = new this.$.$mol_button_open();
			(obj.hint) = () => ("Upload dump");
			(obj.files) = (next) => ((this.update(next)));
			return obj;
		}
		dump_enabled(){
			return false;
		}
		dump(){
			const obj = new this.$.$mol_blob();
			return obj;
		}
		dump_name(){
			return "AAAAAAAA_AAAAAAAA.baza";
		}
		Dump(){
			const obj = new this.$.$mol_button_download();
			(obj.hint) = () => ("Download selected");
			(obj.enabled) = () => ((this.dump_enabled()));
			(obj.blob) = () => ((this.dump()));
			(obj.file_name) = () => ((this.dump_name()));
			return obj;
		}
		Rights_close_icon(){
			const obj = new this.$.$mol_icon_close();
			return obj;
		}
		Rights_close(){
			const obj = new this.$.$mol_link();
			(obj.arg) = () => ({"side": null});
			(obj.sub) = () => ([(this.Rights_close_icon())]);
			return obj;
		}
		land_current(){
			const obj = new this.$.$giper_baza_land();
			return obj;
		}
		Rights_form(){
			const obj = new this.$.$giper_baza_land_rights();
			(obj.land) = () => ((this.land_current()));
			return obj;
		}
		menu_title(){
			return "🌐 Database Explorer";
		}
		menu_tools(){
			return [(this.Home_link())];
		}
		param(){
			return "link";
		}
		Spread(id){
			return (this.Land(id));
		}
		menu_item_content(id){
			return [(this.Menu_link(id)), (this.Land_checked(id))];
		}
		menu_foot(){
			return [
				(this.Wipe_pick()), 
				(this.Land_add()), 
				(this.Update()), 
				(this.Dump())
			];
		}
		Rights_page(){
			const obj = new this.$.$mol_page();
			(obj.title) = () => ("Rights");
			(obj.tools) = () => ([(this.Rights_close())]);
			(obj.body) = () => ([(this.Rights_form())]);
			return obj;
		}
	};
	($mol_mem(($.$giper_baza_glob_book.prototype), "Home_link_icon"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Home_link"));
	($mol_mem_key(($.$giper_baza_glob_book.prototype), "land"));
	($mol_mem_key(($.$giper_baza_glob_book.prototype), "pawn"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_open_icon"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_open"));
	($mol_mem_key(($.$giper_baza_glob_book.prototype), "Land"));
	($mol_mem_key(($.$giper_baza_glob_book.prototype), "land_checked"));
	($mol_mem_key(($.$giper_baza_glob_book.prototype), "Land_checked"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "wipe"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Wipe_icon"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Wipe_pick"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "land_add"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Land_add"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "update"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Update"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "dump"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Dump"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_close_icon"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_close"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "land_current"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_form"));
	($mol_mem(($.$giper_baza_glob_book.prototype), "Rights_page"));


;
"use strict";
var $;
(function ($) {
    function $mol_array_groups(all, group) {
        const res = {};
        for (const item of all) {
            const list = (res[group(item)] ||= []);
            list.push(item);
        }
        return res;
    }
    $.$mol_array_groups = $mol_array_groups;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_text(item = (item) => String(item)) {
        return (a, b) => {
            const text_a = item(a).trim().toLowerCase();
            const text_b = item(b).trim().toLowerCase();
            const parts_a = text_a.split(/(\d+)/);
            const parts_b = text_b.split(/(\d+)/);
            const count = Math.max(parts_a.length, parts_b.length);
            for (let i = 0; i < count; ++i) {
                const part_a = parts_a[i] || '';
                const part_b = parts_b[i] || '';
                const diff = Number(part_a) - Number(part_b);
                if (diff)
                    return diff;
                if (part_a > part_b)
                    return 1;
                if (part_a < part_b)
                    return -1;
            }
            return parts_a.length - parts_b.length;
        };
    }
    $.$mol_compare_text = $mol_compare_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'simple sort'() {
            const list = ['abc', 'ac', 'ab'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'ab,abc,ac');
        },
        'sort ignoring spaces around'() {
            const list = [' a', '\tb', ' b'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, ' a,\tb, b');
        },
        'sort ignoring letter case'() {
            const list = ['A', 'B', 'a'];
            list.sort($mol_compare_text());
            $mol_assert_equal(`${list}`, 'A,a,B');
        },
        'sort with custom serializer'() {
            const list = ['abc', 'ab', 'ac'];
            list.sort($mol_compare_text(str => str.split('').reverse().join('')));
            $mol_assert_equal(`${list}`, 'ab,ac,abc');
        },
    });
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_glob_book extends $.$giper_baza_glob_book {
            spread_ids() {
                const spread = this.spread();
                const spread_land = new $giper_baza_link(spread).land().str;
                const lands_touched = [...this.$.$giper_baza_glob.lands_touched.values()];
                const groups = $mol_array_groups(lands_touched, land => land);
                const ids = [];
                for (const lord of Object.keys(groups)) {
                    ids.push(lord);
                    for (const land of groups[lord]) {
                        if (land !== lord)
                            ids.push(land);
                        if (land === spread_land)
                            ids.push(spread);
                    }
                }
                ids.sort($mol_compare_text(id => id));
                return ids;
            }
            pages() {
                return [
                    ...super.pages(),
                    ...this.side() === 'rights' ? [this.Rights_page()] : [],
                ];
            }
            side() {
                return this.$.$mol_state_arg.value('side') ?? '';
            }
            home_link() {
                return this.$.$giper_baza_glob.home($giper_baza_flex_user).link().str;
            }
            land_current() {
                return this.land(this.spread());
            }
            land(id) {
                return this.$.$giper_baza_glob.Land(new $giper_baza_link(id).land());
            }
            pawn(id) {
                return this.$.$giper_baza_glob.Pawn(new $giper_baza_link(id), $giper_baza_dict);
            }
            spread_title(id) {
                const link = new $giper_baza_link(id);
                let title = '';
                try {
                    title = this.$.$giper_baza_glob.Pawn(link, $giper_baza_flex_subj).Name()?.val() ?? '';
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                const chunks = id.split('_');
                const suffix = title || (chunks.length >= 4 ? link.head().str : chunks.length === 3 ? link.area() : link.str);
                const prefix = [
                    '',
                    '',
                    '🌎 ',
                    '   🌄 ',
                    '      🧩 ',
                ][chunks.length];
                return prefix + suffix;
            }
            land_add(preset) {
                this.$.$mol_dom_context.location.href = this.$.$mol_state_arg.link({
                    [this.param()]: this.$.$giper_baza_glob.land_grab(preset).link().str
                });
                return null;
            }
            update(files) {
                const glob = this.$.$giper_baza_glob;
                for (const file of files) {
                    const dump = $mol_wire_sync(file).arrayBuffer();
                    const pack = $mol_wire_sync($giper_baza_pack).from(dump);
                    glob.apply_pack(pack);
                }
                return [];
            }
            async wipe() {
                const yard = await this.$.$mol_db('$giper_baza_yard');
                const mine = await this.$.$mol_db('$giper_baza_mine');
                yard.kill();
                mine.kill();
                location.reload();
            }
            // override seed_make() {
            // 	const seed = this.$.$giper_baza_flex_init() 
            // 	this.$.$mol_state_arg.go({
            // 		[ this.param() ]: seed.link().str
            // 	})
            // }
            lands_checked() {
                const lands_touched = [...this.$.$giper_baza_glob.lands_touched.values()];
                const lands_checked = lands_touched.filter(land => this.land_checked(land));
                return lands_checked;
            }
            dump_enabled() {
                return Boolean(this.lands_checked().length);
            }
            dump_pack() {
                const lands = this.lands_checked();
                if (!lands.length)
                    return null;
                const parts = lands.flatMap(land => this.land(land).diff_parts());
                const pack = $giper_baza_pack.make(parts);
                return pack;
            }
            dump() {
                return this.dump_pack()?.toBlob();
            }
            dump_name() {
                return `dump.baza`;
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_glob_book.prototype, "spread_ids", null);
        __decorate([
            $mol_mem
        ], $giper_baza_glob_book.prototype, "pages", null);
        __decorate([
            $mol_action
        ], $giper_baza_glob_book.prototype, "update", null);
        __decorate([
            $mol_mem
        ], $giper_baza_glob_book.prototype, "lands_checked", null);
        __decorate([
            $mol_mem
        ], $giper_baza_glob_book.prototype, "dump_pack", null);
        $$.$giper_baza_glob_book = $giper_baza_glob_book;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_glob_book, {
            Menu: {
                flex: {
                    basis: `25rem`,
                },
            },
            Menu_link: {
                whiteSpace: 'pre-wrap',
                font: {
                    family: 'monospace',
                }
            },
            Land_add: {
                Trigger: {
                    justify: {
                        content: 'center',
                    },
                },
            },
            Rights_page: {
                flex: {
                    basis: `35rem`,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $giper_baza_app_home extends $giper_baza_flex_peer {
        init() {
            this.meta($giper_baza_flex_peer.meta);
        }
        tick() {
            this.init();
            this.stat(null).tick();
        }
    }
    __decorate([
        $mol_mem
    ], $giper_baza_app_home.prototype, "init", null);
    $.$giper_baza_app_home = $giper_baza_app_home;
})($ || ($ = {}));

;
	($.$mol_chip) = class $mol_chip extends ($.$mol_view) {
		hint(){
			return "";
		}
		minimal_height(){
			return 40;
		}
		attr(){
			return {...(super.attr()), "title": (this.hint())};
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($mol_chip, {
            padding: $mol_gap.text,
            border: {
                radius: $mol_gap.round,
            },
            background: {
                color: $mol_theme.card,
            },
            gap: $mol_gap.block,
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_group) = class $mol_svg_group extends ($.$mol_svg) {
		dom_name(){
			return "g";
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    class $mol_vector extends Array {
        get length() {
            return super.length;
        }
        constructor(...values) { super(...values); }
        map(convert, self) {
            return super.map(convert, self);
        }
        merged(patches, combine) {
            return this.map((value, index) => combine(value, patches[index]));
        }
        limited(limits) {
            return this.merged(limits, (value, [min, max]) => (value < min) ? min : (value > max) ? max : value);
        }
        added0(diff) {
            return this.map(value => value + diff);
        }
        added1(diff) {
            return this.merged(diff, (a, b) => a + b);
        }
        substracted1(diff) {
            return this.merged(diff, (a, b) => a - b);
        }
        multed0(mult) {
            return this.map(value => value * mult);
        }
        multed1(mults) {
            return this.merged(mults, (a, b) => a * b);
        }
        divided1(mults) {
            return this.merged(mults, (a, b) => a / b);
        }
        powered0(mult) {
            return this.map(value => value ** mult);
        }
        expanded1(point) {
            return this.merged(point, (range, value) => range.expanded0(value));
        }
        expanded2(point) {
            return this.merged(point, (range1, range2) => {
                let next = range1;
                const Range = range1.constructor;
                if (range1[0] > range2[0])
                    next = new Range(range2[0], next.max);
                if (range1[1] < range2[1])
                    next = new Range(next.min, range2[1]);
                return next;
            });
        }
        center() {
            const Result = this[0].constructor;
            return new Result(...this[0].map((_, i) => this.reduce((sum, point) => sum + point[i], 0) / this.length));
        }
        distance() {
            let distance = 0;
            for (let i = 1; i < this.length; ++i) {
                distance += this[i - 1].reduce((sum, min, j) => sum + (min - this[i][j]) ** 2, 0) ** (1 / this[i].length);
            }
            return distance;
        }
        transponed() {
            return this[0].map((_, i) => this.map(row => row[i]));
        }
        get x() { return this[0]; }
        set x(next) { this[0] = next; }
        get y() { return this[1]; }
        set y(next) { this[1] = next; }
        get z() { return this[2]; }
        set z(next) { this[2] = next; }
    }
    $.$mol_vector = $mol_vector;
    class $mol_vector_1d extends $mol_vector {
    }
    $.$mol_vector_1d = $mol_vector_1d;
    class $mol_vector_2d extends $mol_vector {
    }
    $.$mol_vector_2d = $mol_vector_2d;
    class $mol_vector_3d extends $mol_vector {
    }
    $.$mol_vector_3d = $mol_vector_3d;
    class $mol_vector_range extends $mol_vector {
        0;
        1;
        constructor(min, max = min) {
            super(min, max);
            this[0] = min;
            this[1] = max;
        }
        get min() { return this[0]; }
        set min(next) { this[0] = next; }
        get max() { return this[1]; }
        set max(next) { this[1] = next; }
        get inversed() {
            return new this.constructor(this.max, this.min);
        }
        expanded0(value) {
            const Range = this.constructor;
            let range = this;
            if (value > range.max)
                range = new Range(range.min, value);
            if (value < range.min)
                range = new Range(value, range.max);
            return range;
        }
    }
    $.$mol_vector_range = $mol_vector_range;
    $.$mol_vector_range_full = new $mol_vector_range(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    class $mol_vector_matrix extends $mol_vector {
        added2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 + b[index]));
        }
        multed2(diff) {
            return this.merged(diff, (a, b) => a.map((a2, index) => a2 * b[index]));
        }
    }
    $.$mol_vector_matrix = $mol_vector_matrix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_test({
        'Vector limiting'() {
            let point = new $mol_vector_3d(7, 10, 13);
            const res = point.limited([[1, 5], [15, 20], [5, 10]]);
            $mol_assert_equal(res.x, 5);
            $mol_assert_equal(res.y, 15);
            $mol_assert_equal(res.z, 10);
        },
        'Vector adding scalar'() {
            let point = new $mol_vector_3d(1, 2, 3);
            let res = point.added0(5);
            $mol_assert_equal(res.x, 6);
            $mol_assert_equal(res.y, 7);
            $mol_assert_equal(res.z, 8);
        },
        'Vector adding vector'() {
            let point = new $mol_vector_3d(1, 2, 3);
            let res = point.added1([5, 10, 15]);
            $mol_assert_equal(res.x, 6);
            $mol_assert_equal(res.y, 12);
            $mol_assert_equal(res.z, 18);
        },
        'Vector multiplying scalar'() {
            let point = new $mol_vector_3d(2, 3, 4);
            let res = point.multed0(-1);
            $mol_assert_equal(res.x, -2);
            $mol_assert_equal(res.y, -3);
            $mol_assert_equal(res.z, -4);
        },
        'Vector multiplying vector'() {
            let point = new $mol_vector_3d(2, 3, 4);
            let res = point.multed1([5, 2, -2]);
            $mol_assert_equal(res.x, 10);
            $mol_assert_equal(res.y, 6);
            $mol_assert_equal(res.z, -8);
        },
        'Matrix adding matrix'() {
            let matrix = new $mol_vector_matrix(...[[1, 2], [3, 4], [5, 6]]);
            let res = matrix.added2([[10, 20], [30, 40], [50, 60]]);
            $mol_assert_equal(res[0][0], 11);
            $mol_assert_equal(res[0][1], 22);
            $mol_assert_equal(res[1][0], 33);
            $mol_assert_equal(res[1][1], 44);
            $mol_assert_equal(res[2][0], 55);
            $mol_assert_equal(res[2][1], 66);
        },
        'Matrix multiplying matrix'() {
            let matrix = new $mol_vector_matrix(...[[2, 3], [4, 5], [6, 7]]);
            let res = matrix.multed2([[2, 3], [4, 5], [6, 7]]);
            $mol_assert_equal(res[0][0], 4);
            $mol_assert_equal(res[0][1], 9);
            $mol_assert_equal(res[1][0], 16);
            $mol_assert_equal(res[1][1], 25);
            $mol_assert_equal(res[2][0], 36);
            $mol_assert_equal(res[2][1], 49);
        },
        'Range expanding'() {
            let range = $mol_vector_range_full.inversed;
            const expanded = range.expanded0(10).expanded0(5);
            $mol_assert_like([...expanded], [5, 10]);
        },
        'Vector of range expanding by vector'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = dimensions.expanded1([1, 7]).expanded1([3, 5]);
            $mol_assert_like([...expanded.x], [1, 3]);
            $mol_assert_like([...expanded.y], [5, 7]);
        },
        'Vector of range expanding by vector of range'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = dimensions
                .expanded2([[1, 3], [7, 9]])
                .expanded2([[2, 4], [6, 8]]);
            $mol_assert_like([...expanded.x], [1, 4]);
            $mol_assert_like([...expanded.y], [6, 9]);
        },
        'Vector of infinity range expanding by vector of range'() {
            let dimensions = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const next = new $mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
            const expanded = next
                .expanded2(dimensions);
            $mol_assert_like([...expanded.x], [Infinity, -Infinity]);
            $mol_assert_like([...expanded.y], [Infinity, -Infinity]);
        },
    });
})($ || ($ = {}));

;
	($.$mol_svg_title) = class $mol_svg_title extends ($.$mol_svg) {
		dom_name(){
			return "title";
		}
		sub(){
			return [(this.title())];
		}
	};


;
"use strict";


;
	($.$mol_plot_graph) = class $mol_plot_graph extends ($.$mol_svg_group) {
		type(){
			return "solid";
		}
		color(){
			return "";
		}
		viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_pane_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		gap_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		title(){
			return "";
		}
		hint(){
			return (this.title());
		}
		series_x(){
			return [];
		}
		series_y(){
			return [];
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
		viewport(){
			const obj = new this.$.$mol_vector_2d((this.viewport_x()), (this.viewport_y()));
			return obj;
		}
		shift(){
			return [0, 0];
		}
		scale(){
			return [1, 1];
		}
		cursor_position(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		dimensions_pane(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_pane_x()), (this.dimensions_pane_y()));
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		repos_x(id){
			return 0;
		}
		repos_y(id){
			return 0;
		}
		indexes(){
			return [];
		}
		points(){
			return [];
		}
		front(){
			return [];
		}
		back(){
			return [];
		}
		Hint(){
			const obj = new this.$.$mol_svg_title();
			(obj.title) = () => ((this.hint()));
			return obj;
		}
		hue(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		Sample(){
			return null;
		}
	};
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_graph.prototype), "viewport"));
	($mol_mem(($.$mol_plot_graph.prototype), "cursor_position"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions_pane"));
	($mol_mem(($.$mol_plot_graph.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_graph.prototype), "size_real"));
	($mol_mem(($.$mol_plot_graph.prototype), "gap"));
	($mol_mem(($.$mol_plot_graph.prototype), "Hint"));
	($mol_mem(($.$mol_plot_graph.prototype), "hue"));
	($.$mol_plot_graph_sample) = class $mol_plot_graph_sample extends ($.$mol_view) {
		type(){
			return "solid";
		}
		color(){
			return "black";
		}
		attr(){
			return {...(super.attr()), "mol_plot_graph_type": (this.type())};
		}
		style(){
			return {...(super.style()), "color": (this.color())};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_graph extends $.$mol_plot_graph {
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            indexes() {
                return this.series_x().map((_, i) => i);
            }
            repos_x(val) {
                return val;
            }
            repos_y(val) {
                return val;
            }
            points() {
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const series_x = this.series_x();
                const series_y = this.series_y();
                return this.indexes().map(index => {
                    let point_x = Math.round(shift_x + this.repos_x(series_x[index]) * scale_x);
                    let point_y = Math.round(shift_y + this.repos_y(series_y[index]) * scale_y);
                    point_x = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_x, Number.MAX_SAFE_INTEGER));
                    point_y = Math.max(Number.MIN_SAFE_INTEGER, Math.min(point_y, Number.MAX_SAFE_INTEGER));
                    return [point_x, point_y];
                });
            }
            series_x() {
                return this.series_y().map((val, index) => index);
            }
            dimensions() {
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                const series_x = this.series_x();
                const series_y = this.series_y();
                for (let i = 0; i < series_x.length; i++) {
                    if (series_x[i] > next.x.max)
                        next.x.max = this.repos_x(series_x[i]);
                    if (series_x[i] < next.x.min)
                        next.x.min = this.repos_x(series_x[i]);
                    if (series_y[i] > next.y.max)
                        next.y.max = this.repos_y(series_y[i]);
                    if (series_y[i] < next.y.min)
                        next.y.min = this.repos_y(series_y[i]);
                }
                return next;
            }
            color() {
                const hue = this.hue();
                return hue ? `hsl( ${hue} , 100% , 35% )` : '';
            }
            front() {
                return [this];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "indexes", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "series_x", null);
        __decorate([
            $mol_mem
        ], $mol_plot_graph.prototype, "dimensions", null);
        $$.$mol_plot_graph = $mol_plot_graph;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/graph/graph.view.css", "[mol_plot_graph] {\n\tstroke: currentColor;\n}\n\n[mol_plot_graph_sample] {\n\tborder-width: 0;\n\tborder-style: solid;\n}\n\n[mol_plot_graph_type=\"dashed\"] {\n\tstroke-dasharray: 4 4;\n\tborder-style: dashed;\n}\n");
})($ || ($ = {}));

;
	($.$mol_plot_line) = class $mol_plot_line extends ($.$mol_plot_graph) {
		curve(){
			return "";
		}
		threshold(){
			return 1;
		}
		spacing(){
			return 2;
		}
		color_fill(){
			return "none";
		}
		dom_name(){
			return "path";
		}
		attr(){
			return {...(super.attr()), "d": (this.curve())};
		}
		sub(){
			return [(this.Hint())];
		}
		Sample(){
			const obj = new this.$.$mol_plot_graph_sample();
			(obj.color) = () => ((this.color()));
			(obj.type) = () => ((this.type()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_line.prototype), "Sample"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_line extends $.$mol_plot_line {
            sub() {
                return this.hint() ? super.sub() : [];
            }
            indexes() {
                const threshold = this.threshold();
                const { x: { min: viewport_left, max: viewport_right }, y: { min: viewport_bottom, max: viewport_top }, } = this.viewport();
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                const indexes = [];
                let last = new $mol_vector_2d(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
                let last_zone = new $mol_vector_2d(0, 0);
                const series_x = this.series_x();
                const series_y = this.series_y();
                const zone_of = (point) => new $mol_vector_2d(point.x < viewport_left ? -1
                    : point.x > viewport_right ? 1
                        : 0, point.y < viewport_bottom ? -1
                    : point.y > viewport_top ? 1
                        : 0);
                for (let i = 0; i < series_x.length - 1; i++) {
                    const scaled = new $mol_vector_2d(Math.round(shift_x + this.repos_x(series_x[i]) * scale_x), Math.round(shift_y + this.repos_y(series_y[i]) * scale_y));
                    if (Math.abs(scaled.x - last.x) < threshold
                        && Math.abs(scaled.y - last.y) < threshold)
                        continue;
                    const zone = zone_of(scaled);
                    last = scaled;
                    if (zone.x !== 0 && zone.x === last_zone.x || zone.y !== 0 && zone.y === last_zone.y) {
                        continue;
                    }
                    if (last_zone.x !== 0 || last_zone.y !== 0) {
                        indexes.push(i - 1);
                    }
                    last_zone = zone;
                    indexes.push(i);
                }
                indexes.push(series_x.length - 1);
                return indexes;
            }
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                const main = points.map((point) => point.join(',')).join(' ');
                return `M ${points[0].join(' ')} L ${main}`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_line.prototype, "indexes", null);
        $$.$mol_plot_line = $mol_plot_line;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/line/line.view.css", "[mol_plot_line] {\n\tfill: none;\n\tstroke-linejoin: round;\n}\n\n[mol_plot_line_sample] {\n\theight: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tborder-width: 2px 0 0;\n\tposition: absolute;\n\ttop: .75em;\n\ttransform: translateY(-50%);\n}\n");
})($ || ($ = {}));

;
	($.$mol_gallery) = class $mol_gallery extends ($.$mol_view) {
		items(){
			return [];
		}
		side_size(id){
			return "1";
		}
		side_items(id){
			return [];
		}
		sub(){
			return (this.items());
		}
		Side(id){
			const obj = new this.$.$mol_gallery();
			(obj.style) = () => ({"flexGrow": (this.side_size(id))});
			(obj.items) = () => ((this.side_items(id)));
			return obj;
		}
	};
	($mol_mem_key(($.$mol_gallery.prototype), "Side"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_gallery_demo
         */
        class $mol_gallery extends $.$mol_gallery {
            sub() {
                const items = this.items();
                if (items.length <= 3)
                    return items;
                return [
                    this.Side(0),
                    this.Side(1),
                ];
            }
            side_items(id) {
                const items = this.items();
                const middle = items.length % 2
                    ? Math.ceil(items.length / 3)
                    : items.length / 2;
                return id
                    ? items.slice(middle)
                    : items.slice(0, middle);
            }
            side_size(id) {
                return String(this.side_items(id).length);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_gallery.prototype, "sub", null);
        __decorate([
            $mol_mem_key
        ], $mol_gallery.prototype, "side_items", null);
        $$.$mol_gallery = $mol_gallery;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/gallery/gallery.view.css", "[mol_gallery] {\n\tflex-wrap: wrap;\n\tflex: 1 1 auto;\n\talign-items: stretch;\n    align-content: stretch;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart_legend) = class $mol_chart_legend extends ($.$mol_scroll) {
		graph_legends(){
			return [];
		}
		Gallery(){
			const obj = new this.$.$mol_gallery();
			(obj.items) = () => ((this.graph_legends()));
			return obj;
		}
		Graph_sample(id){
			return null;
		}
		Graph_sample_box(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample(id))]);
			return obj;
		}
		graph_title(id){
			return "";
		}
		Graph_title(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.graph_title(id))]);
			return obj;
		}
		graphs(){
			return [];
		}
		graphs_front(){
			return [];
		}
		sub(){
			return [(this.Gallery())];
		}
		Graph_legend(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Graph_sample_box(id)), (this.Graph_title(id))]);
			return obj;
		}
	};
	($mol_mem(($.$mol_chart_legend.prototype), "Gallery"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_sample_box"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_title"));
	($mol_mem_key(($.$mol_chart_legend.prototype), "Graph_legend"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_chart_legend extends $.$mol_chart_legend {
            graphs_front() {
                return this.graphs().filter(graph => graph.Sample());
            }
            graph_legends() {
                return this.graphs_front().map((graph, index) => this.Graph_legend(index));
            }
            graph_title(index) {
                return this.graphs_front()[index].title();
            }
            Graph_sample(index) {
                return this.graphs_front()[index].Sample();
            }
        }
        __decorate([
            $mol_mem
        ], $mol_chart_legend.prototype, "graphs_front", null);
        $$.$mol_chart_legend = $mol_chart_legend;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/legend/legend.view.css", "[mol_chart_legend] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tflex-direction: row;\n\tflex: 0 1 auto;\n}\n\n[mol_chart_legend_graph_legend] {\n\tdisplay: flex;\n\tjustify-content: flex-start;\n\tflex: 1 1 8rem;\n\tpadding: .5rem;\n}\n\n[mol_chart_legend_graph_title] {\n\tmargin: 0 .25rem;\n\tflex: 1 1 auto;\n}\n\n[mol_chart_legend_graph_sample_box] {\n\tposition: relative;\n\twidth: 1.5rem;\n\tflex: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_touch) = class $mol_touch extends ($.$mol_plugin) {
		event_start(next){
			if(next !== undefined) return next;
			return null;
		}
		event_move(next){
			if(next !== undefined) return next;
			return null;
		}
		event_end(next){
			if(next !== undefined) return next;
			return null;
		}
		event_leave(next){
			if(next !== undefined) return next;
			return null;
		}
		event_wheel(next){
			if(next !== undefined) return next;
			return null;
		}
		start_zoom(next){
			if(next !== undefined) return next;
			return 0;
		}
		start_distance(next){
			if(next !== undefined) return next;
			return 0;
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(next){
			if(next !== undefined) return next;
			return "";
		}
		action_point(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pan(next){
			if(next !== undefined) return next;
			return [0, 0];
		}
		pan(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		pointer_center(){
			const obj = new this.$.$mol_vector_2d(NaN, NaN);
			return obj;
		}
		start_pos(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_precision(){
			return 16;
		}
		swipe_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_from_top(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_right(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_bottom(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_left(next){
			if(next !== undefined) return next;
			return null;
		}
		swipe_to_top(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		style(){
			return {
				...(super.style()), 
				"touch-action": "none", 
				"overscroll-behavior": "none"
			};
		}
		event(){
			return {
				...(super.event()), 
				"pointerdown": (next) => (this.event_start(next)), 
				"pointermove": (next) => (this.event_move(next)), 
				"pointerup": (next) => (this.event_end(next)), 
				"pointerleave": (next) => (this.event_leave(next)), 
				"wheel": (next) => (this.event_wheel(next))
			};
		}
	};
	($mol_mem(($.$mol_touch.prototype), "event_start"));
	($mol_mem(($.$mol_touch.prototype), "event_move"));
	($mol_mem(($.$mol_touch.prototype), "event_end"));
	($mol_mem(($.$mol_touch.prototype), "event_leave"));
	($mol_mem(($.$mol_touch.prototype), "event_wheel"));
	($mol_mem(($.$mol_touch.prototype), "start_zoom"));
	($mol_mem(($.$mol_touch.prototype), "start_distance"));
	($mol_mem(($.$mol_touch.prototype), "zoom"));
	($mol_mem(($.$mol_touch.prototype), "action_type"));
	($mol_mem(($.$mol_touch.prototype), "action_point"));
	($mol_mem(($.$mol_touch.prototype), "start_pan"));
	($mol_mem(($.$mol_touch.prototype), "pan"));
	($mol_mem(($.$mol_touch.prototype), "pointer_center"));
	($mol_mem(($.$mol_touch.prototype), "start_pos"));
	($mol_mem(($.$mol_touch.prototype), "swipe_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_from_top"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_right"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_bottom"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_left"));
	($mol_mem(($.$mol_touch.prototype), "swipe_to_top"));
	($mol_mem(($.$mol_touch.prototype), "draw_start"));
	($mol_mem(($.$mol_touch.prototype), "draw"));
	($mol_mem(($.$mol_touch.prototype), "draw_end"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Plugin for touch gestures.
         * @see [mol_plugin](../plugin/readme.md)
         */
        class $mol_touch extends $.$mol_touch {
            auto() {
                this.pointer_events();
                this.start_pan();
                this.start_pos();
                this.start_distance();
                this.start_zoom();
                this.action_type();
                this.view_rect();
            }
            pointer_events(next = []) {
                return next;
            }
            pointer_coords() {
                const events = this.pointer_events();
                const touches = events.filter(e => e.pointerType === 'touch');
                const pens = events.filter(e => e.pointerType === 'pen');
                const mouses = events.filter(e => !e.pointerType || e.pointerType === 'mouse');
                const choosen = touches.length ? touches : pens.length ? pens : mouses;
                return new $mol_vector(...choosen.map(event => this.event_coords(event)));
            }
            pointer_center() {
                const coords = this.pointer_coords();
                return coords.length ? coords.center() : new $mol_vector_2d(NaN, NaN);
            }
            event_coords(event) {
                const { left, top } = this.view_rect();
                return new $mol_vector_2d(Math.round(event.pageX - left), Math.round(event.pageY - top));
            }
            action_point() {
                const coord = this.pointer_center();
                if (!coord)
                    return null;
                const zoom = this.zoom();
                const pan = this.pan();
                return new $mol_vector_2d((coord.x - pan.x) / zoom, (coord.y - pan.y) / zoom);
            }
            event_eat(event) {
                if (event instanceof PointerEvent) {
                    const events = this.pointer_events()
                        .filter(e => e instanceof PointerEvent)
                        .filter(e => e.pointerId !== event.pointerId);
                    if (event.type !== 'pointerup' && event.type !== 'pointerleave')
                        events.push(event);
                    this.pointer_events(events);
                    const touch_count = events.filter(e => e.pointerType === 'touch').length;
                    if (this.allow_zoom() && touch_count === 2) {
                        return this.action_type('zoom');
                    }
                    if (this.action_type() === 'zoom' && touch_count === 1) {
                        return this.action_type('zoom');
                    }
                    let button;
                    (function (button) {
                        button[button["left"] = 1] = "left";
                        button[button["right"] = 2] = "right";
                        button[button["middle"] = 4] = "middle";
                    })(button || (button = {}));
                    if (events.length > 0) {
                        if (event.ctrlKey && this.allow_zoom())
                            return this.action_type('zoom');
                        if (event.buttons === button.left && this.allow_draw())
                            return this.action_type('draw');
                        if (event.buttons && this.allow_pan())
                            return this.action_type('pan');
                    }
                    return this.action_type('');
                }
                if (event instanceof WheelEvent) {
                    this.pointer_events([event]);
                    if (event.shiftKey)
                        return this.action_type('pan');
                    return this.action_type('zoom');
                }
                return this.action_type('');
            }
            event_start(event) {
                if (event.defaultPrevented)
                    return;
                this.start_pan(this.pan());
                const action_type = this.event_eat(event);
                if (!action_type)
                    return;
                const coords = this.pointer_coords();
                this.start_pos(coords.center());
                if (action_type === 'draw') {
                    this.draw_start(event);
                    return;
                }
                this.start_distance(coords.distance());
                this.start_zoom(this.zoom());
            }
            event_move(event) {
                if (event.defaultPrevented)
                    return;
                const rect = this.view_rect();
                if (!rect)
                    return;
                const start_pan = this.start_pan();
                const action_type = this.event_eat(event);
                const start_pos = this.start_pos();
                let pos = this.pointer_center();
                if (!action_type)
                    return;
                if (!start_pos)
                    return;
                if (action_type === 'draw') {
                    const distance = new $mol_vector(start_pos, pos).distance();
                    if (distance >= 4) {
                        this.draw(event);
                    }
                    return;
                }
                if (action_type === 'pan') {
                    this.dom_node().setPointerCapture(event.pointerId);
                    this.pan(new $mol_vector_2d(start_pan[0] + pos[0] - start_pos[0], start_pan[1] + pos[1] - start_pos[1]));
                }
                const precision = this.swipe_precision();
                if ((this.swipe_right !== $mol_touch.prototype.swipe_right
                    || this.swipe_from_left !== $mol_touch.prototype.swipe_from_left
                    || this.swipe_to_right !== $mol_touch.prototype.swipe_to_right)
                    && pos[0] - start_pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_right(event);
                }
                if ((this.swipe_left !== $mol_touch.prototype.swipe_left
                    || this.swipe_from_right !== $mol_touch.prototype.swipe_from_right
                    || this.swipe_to_left !== $mol_touch.prototype.swipe_to_left)
                    && start_pos[0] - pos[0] > precision * 2
                    && Math.abs(pos[1] - start_pos[1]) < precision) {
                    this.swipe_left(event);
                }
                if ((this.swipe_bottom !== $mol_touch.prototype.swipe_bottom
                    || this.swipe_from_top !== $mol_touch.prototype.swipe_from_top
                    || this.swipe_to_bottom !== $mol_touch.prototype.swipe_to_bottom)
                    && pos[1] - start_pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_bottom(event);
                }
                if ((this.swipe_top !== $mol_touch.prototype.swipe_top
                    || this.swipe_from_bottom !== $mol_touch.prototype.swipe_from_bottom
                    || this.swipe_to_top !== $mol_touch.prototype.swipe_to_top)
                    && start_pos[1] - pos[1] > precision * 2
                    && Math.abs(pos[0] - start_pos[0]) < precision) {
                    this.swipe_top(event);
                }
                if (action_type === 'zoom') {
                    const coords = this.pointer_coords();
                    const distance = coords.distance();
                    const start_distance = this.start_distance();
                    const center = coords.center();
                    const start_zoom = this.start_zoom();
                    let mult = Math.abs(distance - start_distance) < 32 ? 1 : distance / start_distance;
                    this.zoom(start_zoom * mult);
                    const pan = new $mol_vector_2d((start_pan[0] - center[0] + pos[0] - start_pos[0]) * mult + center[0], (start_pan[1] - center[1] + pos[1] - start_pos[1]) * mult + center[1]);
                    this.pan(pan);
                }
            }
            event_end(event) {
                const action = this.action_type();
                if (action === 'draw') {
                    this.draw_end(event);
                }
                this.event_leave(event);
            }
            event_leave(event) {
                this.event_eat(event);
                this.dom_node().releasePointerCapture(event.pointerId);
                this.start_pos(null);
            }
            swipe_left(event) {
                if (this.view_rect().right - this.start_pos()[0] < this.swipe_precision() * 2)
                    this.swipe_from_right(event);
                else
                    this.swipe_to_left(event);
                this.event_end(event);
            }
            swipe_right(event) {
                if (this.start_pos()[0] - this.view_rect().left < this.swipe_precision() * 2)
                    this.swipe_from_left(event);
                else
                    this.swipe_to_right(event);
                this.event_end(event);
            }
            swipe_top(event) {
                if (this.view_rect().bottom - this.start_pos()[1] < this.swipe_precision() * 2)
                    this.swipe_from_bottom(event);
                else
                    this.swipe_to_top(event);
                this.event_end(event);
            }
            swipe_bottom(event) {
                if (this.start_pos()[1] - this.view_rect().top < this.swipe_precision() * 2)
                    this.swipe_from_top(event);
                else
                    this.swipe_to_bottom(event);
                this.event_end(event);
            }
            event_wheel(event) {
                if (event.defaultPrevented)
                    return;
                if (this.pan === $mol_touch.prototype.pan && this.zoom === $mol_touch.prototype.zoom)
                    return;
                if (this.pan !== $mol_touch.prototype.pan) {
                    event.preventDefault();
                }
                const action_type = this.event_eat(event);
                if (action_type === 'zoom') {
                    const zoom_prev = this.zoom() || 0.001;
                    let zoom_next = zoom_prev * (1 - .001 * Math.min(event.deltaY, 100));
                    zoom_next = this.zoom(zoom_next);
                    const mult = zoom_next / zoom_prev;
                    const pan_prev = this.pan();
                    const center = this.pointer_center();
                    const pan_next = pan_prev.multed0(mult).added1(center.multed0(1 - mult));
                    this.pan(pan_next);
                }
                if (action_type === 'pan') {
                    const pan_prev = this.pan();
                    const pan_next = new $mol_vector_2d(pan_prev.x - event.deltaX, pan_prev.y - event.deltaY);
                    this.pan(pan_next);
                }
            }
        }
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_events", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_coords", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "pointer_center", null);
        __decorate([
            $mol_mem
        ], $mol_touch.prototype, "action_point", null);
        $$.$mol_touch = $mol_touch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_plot_pane) = class $mol_plot_pane extends ($.$mol_svg_root) {
		gap_x(){
			const obj = new this.$.$mol_vector_range((this.gap_left()), (this.gap_right()));
			return obj;
		}
		gap_y(){
			const obj = new this.$.$mol_vector_range((this.gap_bottom()), (this.gap_top()));
			return obj;
		}
		shift_limit_x(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		shift_limit_y(){
			const obj = new this.$.$mol_vector_range(0, 0);
			return obj;
		}
		scale_limit_x(){
			const obj = new this.$.$mol_vector_range(0, Infinity);
			return obj;
		}
		scale_limit_y(){
			const obj = new this.$.$mol_vector_range(0, -Infinity);
			return obj;
		}
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_viewport_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		graphs_sorted(){
			return [];
		}
		graphs(){
			return [];
		}
		graphs_positioned(){
			return (this.graphs());
		}
		graphs_visible(){
			return (this.graphs_positioned());
		}
		zoom(next){
			if(next !== undefined) return next;
			return 1;
		}
		cursor_position(){
			return (this.Touch().pointer_center());
		}
		allow_draw(){
			return true;
		}
		allow_pan(){
			return true;
		}
		allow_zoom(){
			return true;
		}
		action_type(){
			return (this.Touch().action_type());
		}
		action_point(){
			return (this.Touch().action_point());
		}
		draw_start(next){
			if(next !== undefined) return next;
			return null;
		}
		draw(next){
			if(next !== undefined) return next;
			return null;
		}
		draw_end(next){
			if(next !== undefined) return next;
			return null;
		}
		Touch(){
			const obj = new this.$.$mol_touch();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.pan) = (next) => ((this.shift(next)));
			(obj.allow_draw) = () => ((this.allow_draw()));
			(obj.allow_pan) = () => ((this.allow_pan()));
			(obj.allow_zoom) = () => ((this.allow_zoom()));
			(obj.draw_start) = (next) => ((this.draw_start(next)));
			(obj.draw) = (next) => ((this.draw(next)));
			(obj.draw_end) = (next) => ((this.draw_end(next)));
			return obj;
		}
		aspect(){
			return "none";
		}
		hue_base(next){
			if(next !== undefined) return next;
			return +NaN;
		}
		hue_shift(next){
			if(next !== undefined) return next;
			return 111;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_top(){
			return (this.gap_vert());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap(){
			const obj = new this.$.$mol_vector_2d((this.gap_x()), (this.gap_y()));
			return obj;
		}
		shift_limit(){
			const obj = new this.$.$mol_vector_2d((this.shift_limit_x()), (this.shift_limit_y()));
			return obj;
		}
		shift_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		shift(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale_limit(){
			const obj = new this.$.$mol_vector_2d((this.scale_limit_x()), (this.scale_limit_y()));
			return obj;
		}
		scale_default(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		scale(next){
			if(next !== undefined) return next;
			const obj = new this.$.$mol_vector_2d(1, -1);
			return obj;
		}
		scale_x(next){
			if(next !== undefined) return next;
			return 1;
		}
		scale_y(next){
			if(next !== undefined) return next;
			return -1;
		}
		size(){
			const obj = new this.$.$mol_vector_2d(0, 0);
			return obj;
		}
		size_real(){
			const obj = new this.$.$mol_vector_2d(1, 1);
			return obj;
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		dimensions_viewport(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_viewport_x()), (this.dimensions_viewport_y()));
			return obj;
		}
		sub(){
			return (this.graphs_sorted());
		}
		graphs_colored(){
			return (this.graphs_visible());
		}
		plugins(){
			return [...(super.plugins()), (this.Touch())];
		}
	};
	($mol_mem(($.$mol_plot_pane.prototype), "gap_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "zoom"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_start"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw"));
	($mol_mem(($.$mol_plot_pane.prototype), "draw_end"));
	($mol_mem(($.$mol_plot_pane.prototype), "Touch"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_base"));
	($mol_mem(($.$mol_plot_pane.prototype), "hue_shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "gap"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "shift"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_limit"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_default"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_x"));
	($mol_mem(($.$mol_plot_pane.prototype), "scale_y"));
	($mol_mem(($.$mol_plot_pane.prototype), "size"));
	($mol_mem(($.$mol_plot_pane.prototype), "size_real"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions"));
	($mol_mem(($.$mol_plot_pane.prototype), "dimensions_viewport"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        /**
         * Fastest plot lib for vector graphics.
         * @see https://mol.hyoo.ru/#!section=demos/demo=mol_plot_demo
         */
        class $mol_plot_pane extends $.$mol_plot_pane {
            dimensions() {
                const graphs = this.graphs();
                let next = new this.$.$mol_vector_2d($mol_vector_range_full.inversed, $mol_vector_range_full.inversed);
                for (let graph of graphs) {
                    next = next.expanded2(graph.dimensions());
                }
                return next;
            }
            size() {
                const dims = this.dimensions();
                return new this.$.$mol_vector_2d((dims.x.max - dims.x.min) || 1, (dims.y.max - dims.y.min) || 1);
            }
            graph_hue(index) {
                return (360 + (this.hue_base() + this.hue_shift() * index) % 360) % 360;
            }
            graphs_colored() {
                const graphs = this.graphs_visible();
                for (let index = 0; index < graphs.length; index++) {
                    graphs[index].hue(this.graph_hue(index));
                }
                return graphs;
            }
            size_real() {
                const rect = this.view_rect();
                if (!rect)
                    return new this.$.$mol_vector_2d(1, 1);
                return new this.$.$mol_vector_2d(rect.width, rect.height);
            }
            view_box() {
                const size = this.size_real();
                return `0 0 ${size.x} ${size.y}`;
            }
            scale_limit() {
                const { x: { max: right }, y: { max: top } } = super.scale_limit();
                const gap = this.gap();
                const size = this.size();
                const real = this.size_real();
                const left = +(real.x - gap.x.min - gap.x.max) / size.x;
                const bottom = -(real.y - gap.y.max - gap.y.min) / size.y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(left, right), new this.$.$mol_vector_range(top, bottom));
            }
            scale_default() {
                const limits = this.scale_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.max);
            }
            scale(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.scale_default();
                    next = $mol_mem_cached(() => this.scale()) ?? this.scale_default();
                }
                this.graph_touched = true;
                return next.limited(this.scale_limit());
            }
            scale_x(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(next, this.scale().y)).x;
            }
            scale_y(next) {
                return this.scale(next === undefined
                    ? undefined
                    : new $mol_vector_2d(this.scale().x, next)).y;
            }
            shift_limit() {
                const dims = this.dimensions();
                const [scale_x, scale_y] = this.scale();
                const size = this.size_real();
                const gap = this.gap();
                const left = gap.x.min - dims.x.min * scale_x;
                const right = size.x - gap.x.max - dims.x.max * scale_x;
                const top = gap.y.max - dims.y.max * scale_y;
                const bottom = size.y - gap.y.min - dims.y.min * scale_y;
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(right, left), new this.$.$mol_vector_range(bottom, top));
            }
            shift_default() {
                const limits = this.shift_limit();
                return new $mol_vector_2d(limits.x.min, limits.y.min);
            }
            graph_touched = false;
            shift(next) {
                if (next === undefined) {
                    if (!this.graph_touched)
                        return this.shift_default();
                    next = $mol_mem_cached(() => this.shift()) ?? this.shift_default();
                }
                this.graph_touched = true;
                return next.limited(this.shift_limit());
            }
            reset(event) {
                this.graph_touched = false;
                this.scale(this.scale_default());
                this.shift(this.shift_default());
            }
            graphs_visible() {
                const viewport = this.dimensions_viewport();
                const size_real = this.size_real();
                const max_x = (viewport.x.max - viewport.x.min) / size_real.x;
                const max_y = (viewport.y.max - viewport.y.min) / size_real.y;
                return this.graphs_positioned().filter(graph => {
                    const dims = graph.dimensions();
                    if (dims.x.min > dims.x.max)
                        return true;
                    if (dims.y.min > dims.y.max)
                        return true;
                    const size_x = dims.x.max - dims.x.min;
                    const size_y = dims.y.max - dims.y.min;
                    if ((size_x || size_y) && size_x < max_x && size_y < max_y)
                        return false;
                    if (dims.x.min > viewport.x.max)
                        return false;
                    if (dims.x.max < viewport.x.min)
                        return false;
                    if (dims.y.min > viewport.y.max)
                        return false;
                    if (dims.y.max < viewport.y.min)
                        return false;
                    return true;
                });
            }
            graphs_positioned() {
                const graphs = this.graphs();
                for (let graph of graphs) {
                    graph.shift = () => this.shift();
                    graph.scale = () => this.scale();
                    graph.dimensions_pane = () => this.dimensions_viewport();
                    graph.viewport = () => this.viewport();
                    graph.size_real = () => this.size_real();
                    graph.cursor_position = () => this.cursor_position();
                    graph.gap = () => this.gap();
                }
                return graphs;
            }
            dimensions_viewport() {
                const shift = this.shift().multed0(-1);
                const scale = this.scale().powered0(-1);
                return this.viewport().map((range, i) => range.added0(shift[i]).multed0(scale[i]).sort((a, b) => a - b));
            }
            viewport() {
                const size = this.size_real();
                return new this.$.$mol_vector_2d(new this.$.$mol_vector_range(0, size.x), new this.$.$mol_vector_range(0, size.y));
            }
            graphs_sorted() {
                const graphs = this.graphs_colored();
                const sorted = [];
                for (let graph of graphs)
                    sorted.push(...graph.back());
                for (let graph of graphs)
                    sorted.push(...graph.front());
                return sorted;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "size", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_colored", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "scale", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_limit", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift_default", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "shift", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_visible", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_positioned", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "dimensions_viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "viewport", null);
        __decorate([
            $mol_mem
        ], $mol_plot_pane.prototype, "graphs_sorted", null);
        $$.$mol_plot_pane = $mol_plot_pane;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/pane/pane.view.css", "[mol_plot_pane] {\n\tcolor: var(--mol_theme_control);\n\tflex: 1 1 auto;\n\talign-self: stretch;\n\tstroke-width: 2px;\n\tuser-select: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_chart) = class $mol_chart extends ($.$mol_view) {
		Legend(){
			const obj = new this.$.$mol_chart_legend();
			(obj.graphs) = () => ((this.graphs_colored()));
			return obj;
		}
		zoom(next){
			return (this.Plot().scale_x(next));
		}
		graphs_colored(){
			return (this.Plot().graphs_colored());
		}
		hue_base(){
			return 210;
		}
		hue_shift(){
			return 163;
		}
		Plot(){
			const obj = new this.$.$mol_plot_pane();
			(obj.zoom) = (next) => ((this.zoom(next)));
			(obj.gap_left) = () => ((this.gap_left()));
			(obj.gap_right) = () => ((this.gap_right()));
			(obj.gap_bottom) = () => ((this.gap_bottom()));
			(obj.gap_top) = () => ((this.gap_top()));
			(obj.graphs) = () => ((this.graphs()));
			(obj.hue_base) = () => ((this.hue_base()));
			(obj.hue_shift) = () => ((this.hue_shift()));
			return obj;
		}
		gap_hor(){
			return 48;
		}
		gap_vert(){
			return 24;
		}
		gap_left(){
			return (this.gap_hor());
		}
		gap_right(){
			return (this.gap_hor());
		}
		gap_bottom(){
			return (this.gap_vert());
		}
		gap_top(){
			return (this.gap_vert());
		}
		graphs(){
			return [];
		}
		sub(){
			return [(this.Legend()), (this.Plot())];
		}
	};
	($mol_mem(($.$mol_chart.prototype), "Legend"));
	($mol_mem(($.$mol_chart.prototype), "Plot"));


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/chart/chart.view.css", "[mol_chart] {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-self: stretch;\n\tflex: 1 1 auto;\n\tmin-height: 0;\n}\n\n[mol_chart_plot] {\n\tflex: 1 0 50%;\n\tmargin: .5rem;\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$mol_plot_fill) = class $mol_plot_fill extends ($.$mol_plot_line) {
		threshold(){
			return 4;
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_fill extends $.$mol_plot_fill {
            curve() {
                const points = this.points();
                if (points.length === 0)
                    return '';
                const [, shift_y] = this.shift();
                const main = points.map(point => point.join(',')).join(' ');
                return `M ${points[0].join(' ')} L ${main} V ${shift_y} H ${points[0][0]}`;
            }
            front() {
                return [];
            }
            back() {
                return [this];
            }
        }
        $$.$mol_plot_fill = $mol_plot_fill;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/fill/fill.view.css", "[mol_plot_fill] {\n\tstroke: none;\n\tstroke-width: 0;\n\topacity: .1;\n\tfill: currentColor;\n\tpointer-events: none;\n}\n\n[mol_plot_fill_sample] {\n\topacity: .1;\n\tbackground: currentColor;\n\tposition: absolute;\n\tbottom: 0;\n\ttop: .75em;\n\tleft: 0;\n\tright: 0;\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg_rect) = class $mol_svg_rect extends ($.$mol_svg) {
		width(){
			return "0";
		}
		height(){
			return "0";
		}
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		dom_name(){
			return "rect";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"width": (this.width()), 
				"height": (this.height()), 
				"x": (this.pos_x()), 
				"y": (this.pos_y())
			};
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_rect extends $.$mol_svg_rect {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_rect = $mol_svg_rect;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_svg_text) = class $mol_svg_text extends ($.$mol_svg) {
		pos_x(){
			return "";
		}
		pos_y(){
			return "";
		}
		align(){
			return "middle";
		}
		align_hor(){
			return (this.align());
		}
		align_vert(){
			return "baseline";
		}
		text(){
			return "";
		}
		dom_name(){
			return "text";
		}
		pos(){
			return [];
		}
		attr(){
			return {
				...(super.attr()), 
				"x": (this.pos_x()), 
				"y": (this.pos_y()), 
				"text-anchor": (this.align_hor()), 
				"alignment-baseline": (this.align_vert())
			};
		}
		sub(){
			return [(this.text())];
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_text extends $.$mol_svg_text {
            pos_x() {
                return this.pos()[0];
            }
            pos_y() {
                return this.pos()[1];
            }
        }
        $$.$mol_svg_text = $mol_svg_text;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/text/text.view.css", "[mol_svg_text] {\n\tfill: currentColor;\n\tstroke: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_plot_ruler) = class $mol_plot_ruler extends ($.$mol_plot_graph) {
		background_x(){
			return "0";
		}
		background_y(){
			return "0";
		}
		background_width(){
			return "100%";
		}
		background_height(){
			return "14";
		}
		Background(){
			const obj = new this.$.$mol_svg_rect();
			(obj.pos_x) = () => ((this.background_x()));
			(obj.pos_y) = () => ((this.background_y()));
			(obj.width) = () => ((this.background_width()));
			(obj.height) = () => ((this.background_height()));
			return obj;
		}
		curve(){
			return "";
		}
		Curve(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.curve()));
			return obj;
		}
		labels_formatted(){
			return [];
		}
		title_pos_x(){
			return "0";
		}
		title_pos_y(){
			return "100%";
		}
		title_align(){
			return "start";
		}
		Title(){
			const obj = new this.$.$mol_svg_text();
			(obj.pos_x) = () => ((this.title_pos_x()));
			(obj.pos_y) = () => ((this.title_pos_y()));
			(obj.align) = () => ((this.title_align()));
			(obj.text) = () => ((this.title()));
			return obj;
		}
		label_pos_x(id){
			return "";
		}
		label_pos_y(id){
			return "";
		}
		label_pos(id){
			return [(this.label_pos_x(id)), (this.label_pos_y(id))];
		}
		label_text(id){
			return "";
		}
		label_align(){
			return "";
		}
		step(){
			return 0;
		}
		scale_axis(){
			return 1;
		}
		scale_step(){
			return 1;
		}
		shift_axis(){
			return 1;
		}
		dimensions_axis(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		viewport_axis(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		axis_points(){
			return [];
		}
		normalize(next){
			if(next !== undefined) return next;
			return 0;
		}
		precision(){
			return 1;
		}
		sub(){
			return [
				(this.Background()), 
				(this.Curve()), 
				(this.labels_formatted()), 
				(this.Title())
			];
		}
		Label(id){
			const obj = new this.$.$mol_svg_text();
			(obj.pos) = () => ((this.label_pos(id)));
			(obj.text) = () => ((this.label_text(id)));
			(obj.align) = () => ((this.label_align()));
			return obj;
		}
	};
	($mol_mem(($.$mol_plot_ruler.prototype), "Background"));
	($mol_mem(($.$mol_plot_ruler.prototype), "Curve"));
	($mol_mem(($.$mol_plot_ruler.prototype), "Title"));
	($mol_mem(($.$mol_plot_ruler.prototype), "dimensions_axis"));
	($mol_mem(($.$mol_plot_ruler.prototype), "viewport_axis"));
	($mol_mem(($.$mol_plot_ruler.prototype), "normalize"));
	($mol_mem_key(($.$mol_plot_ruler.prototype), "Label"));


;
"use strict";
var $;
(function ($) {
    function $mol_math_round_expand(val, gap = 1) {
        if (val === 0)
            return 0;
        const val_abs = Math.abs(val);
        const val_sign = val ? Math.round(val / val_abs) : 0;
        const digits = Math.floor(Math.log(val_abs) / Math.log(10));
        const precission = Math.pow(10, digits - gap);
        const val_expanded = precission * Math.ceil(val_abs / precission);
        return val_sign * val_expanded;
    }
    $.$mol_math_round_expand = $mol_math_round_expand;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_ruler extends $.$mol_plot_ruler {
            labels_formatted() {
                return this.axis_points().map((point, index) => this.Label(index));
            }
            step() {
                const scale = Math.abs(this.scale_step());
                const dims = this.dimensions_axis();
                const range = dims.max - dims.min;
                const min_width = (Math.abs(Math.log10(range)) + 2) * 15;
                const size = $mol_math_round_expand(range, -1);
                const count = Math.max(1, Math.pow(10, Math.floor(Math.log(size * scale / min_width) / Math.log(10))));
                let step = size / count;
                const step_max = min_width * 2 / scale;
                if (step > step_max)
                    step /= 2;
                if (step > step_max)
                    step /= 2;
                return Math.max(step, Math.abs(dims.min) / 1e10, Math.abs(dims.max) / 1e10);
            }
            snap_to_grid(coord) {
                const viewport = this.viewport_axis();
                const scale = this.scale_axis();
                const shift = this.shift_axis();
                const step = this.step();
                const val = Math.round(coord / step) * step;
                if (scale == 0)
                    return val;
                const step_scaled = step * scale;
                const scaled = val * scale + shift;
                let count = 0;
                if (scaled < viewport.min)
                    count = (scaled - viewport.min) / step_scaled;
                if (scaled > viewport.max)
                    count = (scaled - viewport.max) / step_scaled;
                return val - Math.floor(count) * step;
            }
            axis_points() {
                const dims = this.dimensions_axis();
                const start = this.snap_to_grid(dims.min);
                const end = this.snap_to_grid(dims.max);
                const step = this.step();
                const next = [];
                for (let val = start; val <= end; val += step) {
                    next.push(val);
                }
                return next;
            }
            precision() {
                const step = this.step();
                return Math.max(0, Math.min(15, (step - Math.floor(step)).toString().length - 2));
            }
            label_text(index) {
                const point = this.axis_points()[index];
                return point.toFixed(this.precision());
            }
            font_size() {
                return this.Background().font_size();
            }
            back() {
                return [this.Curve()];
            }
            front() {
                return [
                    // this.Background(),
                    ...this.labels_formatted(),
                    this.Title()
                ];
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_ruler.prototype, "step", null);
        __decorate([
            $mol_mem
        ], $mol_plot_ruler.prototype, "axis_points", null);
        __decorate([
            $mol_mem
        ], $mol_plot_ruler.prototype, "precision", null);
        $$.$mol_plot_ruler = $mol_plot_ruler;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/ruler/ruler.view.css", "[mol_plot_ruler_curve] {\n\tcolor: var(--mol_theme_line);\n\tstroke-width: 1px;\n\tstroke: currentColor;\n}\n\n[mol_plot_ruler_label] {\n\tcolor: var(--mol_theme_text);\n\ttext-shadow: 0 -1px var(--mol_theme_back), 0px 1px var(--mol_theme_back);\n}\n\n[mol_plot_ruler_title] {\n\tcolor: var(--mol_theme_shade);\n\tbackground-color: var(--mol_theme_back);\n\ttext-shadow: 0 -1px var(--mol_theme_back), 0px 1px var(--mol_theme_back);\n}\n\n[mol_plot_ruler_background] {\n\tstroke: none;\n\tfill: var(--mol_theme_back);\n\topacity: 0.8;\n}\n");
})($ || ($ = {}));

;
	($.$mol_plot_ruler_vert) = class $mol_plot_ruler_vert extends ($.$mol_plot_ruler) {
		title_align(){
			return "end";
		}
		label_align(){
			return "end";
		}
		title_pos_y(){
			return "14";
		}
		label_pos_x(id){
			return (this.title_pos_x());
		}
		background_height(){
			return "100%";
		}
		background_width(){
			return (this.title_pos_x());
		}
	};


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_ruler_vert extends $.$mol_plot_ruler_vert {
            dimensions_axis() {
                return this.dimensions_pane().y;
            }
            viewport_axis() {
                return new this.$.$mol_vector_range(0, this.size_real().y);
            }
            scale_axis() {
                return this.scale()[1];
            }
            scale_step() {
                return -this.scale()[1];
            }
            shift_axis() {
                return this.shift()[1];
            }
            curve() {
                const [, shift] = this.shift();
                const [, scale] = this.scale();
                return this.axis_points().map(point => {
                    let scaled = Math.round(point * scale + shift);
                    scaled = Math.max(Number.MIN_SAFE_INTEGER, Math.min(scaled, Number.MAX_SAFE_INTEGER));
                    return `M 0 ${scaled} H 2000`;
                }).join(' ');
            }
            title_pos_x() {
                return String(this.gap().x.min);
            }
            label_pos_y(index) {
                return (this.axis_points()[index] * this.scale()[1] + this.shift()[1]).toFixed(3);
            }
        }
        $$.$mol_plot_ruler_vert = $mol_plot_ruler_vert;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/ruler/vert/vert.view.css", "[mol_plot_ruler_vert_label] {\n\ttransform: translateY( 4px );\n}\n");
})($ || ($ = {}));

;
	($.$mol_svg_text_box) = class $mol_svg_text_box extends ($.$mol_svg_group) {
		box_width(){
			return "0.5rem";
		}
		box_height(){
			return "1rem";
		}
		box_pos_x(){
			return (this.pos_x());
		}
		box_pos_y(){
			return "0";
		}
		Back(){
			const obj = new this.$.$mol_svg_rect();
			(obj.width) = () => ((this.box_width()));
			(obj.height) = () => ((this.box_height()));
			(obj.pos) = () => ([(this.box_pos_x()), (this.box_pos_y())]);
			return obj;
		}
		pos_x(){
			return "0";
		}
		pos_y(){
			return "100%";
		}
		align(){
			return "start";
		}
		text(){
			return "";
		}
		Text(){
			const obj = new this.$.$mol_svg_text();
			(obj.pos) = () => ([(this.pos_x()), (this.pos_y())]);
			(obj.align) = () => ((this.align()));
			(obj.sub) = () => ([(this.text())]);
			return obj;
		}
		font_size(){
			return 16;
		}
		width(){
			return 0;
		}
		sub(){
			return [(this.Back()), (this.Text())];
		}
	};
	($mol_mem(($.$mol_svg_text_box.prototype), "Back"));
	($mol_mem(($.$mol_svg_text_box.prototype), "Text"));


;
"use strict";
var $;
(function ($) {
    let canvas;
    function $mol_font_canvas(next = canvas) {
        if (!next)
            next = $mol_dom_context.document.createElement('canvas').getContext('2d');
        return canvas = next;
    }
    $.$mol_font_canvas = $mol_font_canvas;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_font_measure(font, text) {
        const canvas = $mol_font_canvas();
        canvas.font = font;
        return canvas.measureText(text).width;
    }
    $.$mol_font_measure = $mol_font_measure;
})($ || ($ = {}));

;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_svg_text_box extends $.$mol_svg_text_box {
            box_width() {
                return `${this.width()}px`;
            }
            width() {
                return $mol_font_measure(this.font_size() + 'px ' + this.font_family(), this.text());
            }
            box_pos_x() {
                const align = this.align();
                if (align === 'end')
                    return `calc(${this.pos_x()} - ${this.width()})`;
                if (align === 'middle')
                    return `calc(${this.pos_x()} - ${Math.round(this.width() / 2)})`;
                return this.pos_x();
            }
            box_pos_y() {
                return `calc(${this.pos_y()} - ${this.font_size() - 2})`;
            }
        }
        __decorate([
            $mol_mem
        ], $mol_svg_text_box.prototype, "width", null);
        $$.$mol_svg_text_box = $mol_svg_text_box;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/svg/text/box/box.view.css", "[mol_svg_text_box_back] {\n\tstroke: none;\n\tfill: var(--mol_theme_back);\n\ttransition: none;\n}\n");
})($ || ($ = {}));

;
	($.$mol_plot_mark_cross) = class $mol_plot_mark_cross extends ($.$mol_plot_graph) {
		dimensions_x(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		dimensions_y(){
			const obj = new this.$.$mol_vector_range(Infinity, -Infinity);
			return obj;
		}
		curve(){
			return "";
		}
		Curve(){
			const obj = new this.$.$mol_svg_path();
			(obj.geometry) = () => ((this.curve()));
			return obj;
		}
		title_x_pos_x(){
			return "0";
		}
		title_x_pos_y(){
			return "100%";
		}
		title_x(){
			return "";
		}
		Label_x(){
			const obj = new this.$.$mol_svg_text_box();
			(obj.pos_x) = () => ((this.title_x_pos_x()));
			(obj.pos_y) = () => ((this.title_x_pos_y()));
			(obj.text) = () => ((this.title_x()));
			return obj;
		}
		title_y_pos_x(){
			return "0";
		}
		title_y_pos_y(){
			return "0";
		}
		title_y(){
			return "";
		}
		Label_y(){
			const obj = new this.$.$mol_svg_text_box();
			(obj.pos_x) = () => ((this.title_y_pos_x()));
			(obj.pos_y) = () => ((this.title_y_pos_y()));
			(obj.text) = () => ((this.title_y()));
			return obj;
		}
		labels(){
			return [];
		}
		title_x_gap(){
			return 4;
		}
		title_y_gap(){
			return 22;
		}
		threshold(){
			return 16;
		}
		graphs(){
			return [];
		}
		dimensions(){
			const obj = new this.$.$mol_vector_2d((this.dimensions_x()), (this.dimensions_y()));
			return obj;
		}
		sub(){
			return [
				(this.Curve()), 
				(this.Label_x()), 
				(this.Label_y())
			];
		}
	};
	($mol_mem(($.$mol_plot_mark_cross.prototype), "dimensions_x"));
	($mol_mem(($.$mol_plot_mark_cross.prototype), "dimensions_y"));
	($mol_mem(($.$mol_plot_mark_cross.prototype), "Curve"));
	($mol_mem(($.$mol_plot_mark_cross.prototype), "Label_x"));
	($mol_mem(($.$mol_plot_mark_cross.prototype), "Label_y"));
	($mol_mem(($.$mol_plot_mark_cross.prototype), "dimensions"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plot_mark_cross extends $.$mol_plot_mark_cross {
            nearest() {
                let delta = this.threshold() ** 2;
                const [cursor_x, cursor_y] = this.cursor_position();
                if (Number.isNaN(cursor_x) || Number.isNaN(cursor_y))
                    return null;
                const graphs = this.graphs();
                let index = 0;
                let graph = null;
                const [shift_x, shift_y] = this.shift();
                const [scale_x, scale_y] = this.scale();
                for (let current of graphs) {
                    const indexes = current.indexes();
                    const series_x = current.series_x();
                    const series_y = current.series_y();
                    for (let i of indexes) {
                        const point_x = shift_x + series_x[i] * scale_x;
                        const point_y = shift_y + series_y[i] * scale_y;
                        const diff = (point_x - cursor_x) ** 2 + (point_y - cursor_y) ** 2;
                        if (diff < delta) {
                            delta = diff;
                            index = i;
                            graph = current;
                        }
                    }
                }
                if (!graph)
                    return null;
                const value = new $mol_vector_2d(graph.series_x()[index], graph.series_y()[index]);
                const scaled = new $mol_vector_2d(shift_x + value.x * scale_x, shift_y + value.y * scale_y);
                return { value, scaled, index };
            }
            curve() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                return `M ${nearest.scaled.x.toFixed(3)} 1000 V 0 M 0 ${nearest.scaled.y.toFixed(3)} H 2000`;
            }
            title_x() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                const labels = this.labels();
                if (labels.length > nearest.index)
                    return labels[nearest.index];
                return String(nearest.value.x);
            }
            title_x_pos_x() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                const width = this.Label_x().width();
                return (nearest.scaled.x - width / 2).toFixed(3);
            }
            title_x_pos_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                const pos = this.size_real().y - this.title_x_gap();
                return pos.toFixed(3);
            }
            title_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '';
                return String(nearest.value.y);
            }
            title_y_pos_y() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                return nearest.scaled.y.toFixed(3);
            }
            title_y_pos_x() {
                const nearest = this.nearest();
                if (!nearest)
                    return '0';
                const pos = this.title_y_gap();
                return pos.toFixed(3);
            }
        }
        __decorate([
            $mol_mem
        ], $mol_plot_mark_cross.prototype, "nearest", null);
        $$.$mol_plot_mark_cross = $mol_plot_mark_cross;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/plot/mark/cross/cross.view.css", "[mol_plot_mark_cross_curve] {\n\tcolor: var(--mol_theme_focus);\n\tstroke-width: 1px;\n\tstroke: currentColor;\n\tpointer-events: none;\n}\n\n[mol_plot_mark_cross_label_x], [mol_plot_mark_cross_label_y] {\n\tcolor: var(--mol_theme_focus);\n\tpointer-events: none;\n}\n\n[mol_plot_mark_cross_label_y] {\n\ttransform: translateY( 4px );\n}\n");
})($ || ($ = {}));

;
	($.$giper_baza_app_stat_chart) = class $giper_baza_app_stat_chart extends ($.$mol_chart) {
		metrics(){
			return [];
		}
		zones_x(){
			return [];
		}
		zones_y(){
			return [
				0, 
				100, 
				100, 
				0
			];
		}
		Zones(){
			const obj = new this.$.$mol_plot_fill();
			(obj.Sample) = () => (null);
			(obj.series_x) = () => ((this.zones_x()));
			(obj.series_y) = () => ((this.zones_y()));
			return obj;
		}
		Ruler_vert(){
			const obj = new this.$.$mol_plot_ruler_vert();
			return obj;
		}
		times(){
			return [];
		}
		Marks(){
			const obj = new this.$.$mol_plot_mark_cross();
			(obj.labels) = () => ((this.times()));
			(obj.graphs) = () => ((this.metrics()));
			return obj;
		}
		graphs(){
			return [
				...(this.metrics()), 
				(this.Zones()), 
				(this.Ruler_vert()), 
				(this.Marks())
			];
		}
	};
	($mol_mem(($.$giper_baza_app_stat_chart.prototype), "Zones"));
	($mol_mem(($.$giper_baza_app_stat_chart.prototype), "Ruler_vert"));
	($mol_mem(($.$giper_baza_app_stat_chart.prototype), "Marks"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_app_stat_chart extends $.$giper_baza_app_stat_chart {
            times() {
                const times = [];
                for (let i = 1; i < 59; ++i)
                    times.push(`${i} secs ago`);
                for (let i = 1; i < 59; ++i)
                    times.push(`${i} mins ago`);
                for (let i = 1; i < 23; ++i)
                    times.push(`${i} hours ago`);
                for (let i = 1; i < 31; ++i)
                    times.push(`${i} days ago`);
                for (let i = 1; i < 12; ++i)
                    times.push(`${i} months ago`);
                return times;
            }
            zones_x() {
                return [58, 116, 138, 168].flatMap(x => [x, x]);
            }
            zones_y() {
                let max = 0;
                for (const metric of this.metrics())
                    for (const y of metric.series_y())
                        if (y > max)
                            max = y;
                return Array.from({ length: 2 }, _ => [0, max, max, 0]).flatMap(x => x);
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_chart.prototype, "times", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_chart.prototype, "zones_x", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_chart.prototype, "zones_y", null);
        $$.$giper_baza_app_stat_chart = $giper_baza_app_stat_chart;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_app_stat_page) = class $giper_baza_app_stat_page extends ($.$mol_page) {
		home_link(){
			return (this.home().link());
		}
		title(){
			return (this.home().name());
		}
		Land(){
			const obj = new this.$.$giper_baza_link_chip();
			(obj.link) = () => ((this.home_link()));
			(obj.arg) = () => ({"section": "glob", ...(this.$.$giper_baza_link_chip.prototype.arg.call(obj))});
			return obj;
		}
		uptime(){
			return "🔴 00:00";
		}
		Uptime(){
			const obj = new this.$.$mol_chip();
			(obj.title) = () => ((this.uptime()));
			return obj;
		}
		Main(){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.Land()), (this.Uptime())]);
			return obj;
		}
		cpu_user(){
			return [];
		}
		Cpu_user(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("CPU User (%)");
			(obj.series_y) = () => ((this.cpu_user()));
			return obj;
		}
		cpu_system(){
			return [];
		}
		Cpu_system(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("CPU System (%)");
			(obj.series_y) = () => ((this.cpu_system()));
			return obj;
		}
		Cpu(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Cpu_user()), (this.Cpu_system())]);
			return obj;
		}
		mem_free(){
			return [];
		}
		Mem_free(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Mem Free (MB)");
			(obj.series_y) = () => ((this.mem_free()));
			return obj;
		}
		mem_used(){
			return [];
		}
		Mem_used(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Mem Used (MB)");
			(obj.series_y) = () => ((this.mem_used()));
			return obj;
		}
		Mem(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Mem_free()), (this.Mem_used())]);
			return obj;
		}
		fs_free(){
			return [];
		}
		Fs_free(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("FS Free (MB)");
			(obj.series_y) = () => ((this.fs_free()));
			return obj;
		}
		fs_used(){
			return [];
		}
		Fs_used(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("FS Used (MB)");
			(obj.series_y) = () => ((this.fs_used()));
			return obj;
		}
		Fs_usage(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Fs_free()), (this.Fs_used())]);
			return obj;
		}
		fs_reads(){
			return [];
		}
		Fs_reads(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("FS Reads / sec");
			(obj.series_y) = () => ((this.fs_reads()));
			return obj;
		}
		fs_writes(){
			return [];
		}
		Fs_writes(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("FS Writes / sec");
			(obj.series_y) = () => ((this.fs_writes()));
			return obj;
		}
		Fs_acting(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Fs_reads()), (this.Fs_writes())]);
			return obj;
		}
		port_slaves(){
			return [];
		}
		Port_slaves(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Slave Ports");
			(obj.series_y) = () => ((this.port_slaves()));
			return obj;
		}
		port_masters(){
			return [];
		}
		Port_masters(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Master Ports");
			(obj.series_y) = () => ((this.port_masters()));
			return obj;
		}
		Ports(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Port_slaves()), (this.Port_masters())]);
			return obj;
		}
		land_alive(){
			return [];
		}
		Land_alive(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Alive Lands");
			(obj.series_y) = () => ((this.land_alive()));
			return obj;
		}
		land_ghost(){
			return [];
		}
		Land_ghost(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Ghost Lands");
			(obj.series_y) = () => ((this.land_ghost()));
			return obj;
		}
		Land_count(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Land_alive()), (this.Land_ghost())]);
			return obj;
		}
		errors(){
			return [];
		}
		Errors(){
			const obj = new this.$.$mol_plot_line();
			(obj.title) = () => ("Errors");
			(obj.series_y) = () => ((this.errors()));
			return obj;
		}
		Error_count(){
			const obj = new this.$.$giper_baza_app_stat_chart();
			(obj.metrics) = () => ([(this.Errors())]);
			return obj;
		}
		Charts(){
			const obj = new this.$.$mol_gallery();
			(obj.items) = () => ([
				(this.Cpu()), 
				(this.Mem()), 
				(this.Fs_usage()), 
				(this.Fs_acting()), 
				(this.Ports()), 
				(this.Land_count()), 
				(this.Error_count())
			]);
			return obj;
		}
		home(){
			const obj = new this.$.$giper_baza_app_home();
			return obj;
		}
		head(){
			return [(this.Main()), (this.Tools())];
		}
		body_content(){
			return [(this.Charts())];
		}
	};
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Land"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Uptime"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Main"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Cpu_user"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Cpu_system"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Cpu"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Mem_free"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Mem_used"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Mem"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_free"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_used"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_usage"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_reads"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_writes"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Fs_acting"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Port_slaves"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Port_masters"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Ports"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Land_alive"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Land_ghost"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Land_count"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Errors"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Error_count"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "Charts"));
	($mol_mem(($.$giper_baza_app_stat_page.prototype), "home"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_app_stat_page extends $.$giper_baza_app_stat_page {
            stat() {
                return this.home()?.stat() ?? null;
            }
            uptime() {
                const stat = this.stat();
                if (!stat)
                    return '🔴';
                if ((stat.freshness() ?? Number.POSITIVE_INFINITY) < 5) {
                    const uptime = this.stat()?.uptime().toString('#Y #D hh:mm:ss');
                    return `🟢 ${uptime}`;
                }
                else {
                    const last = stat.last_change();
                    if (!last)
                        return '🔴';
                    const range = new $mol_time_interval({
                        start: last,
                        end: new $mol_time_moment,
                    });
                    const downtime = range.duration.normal.toString('#Y #D hh:mm:ss');
                    return `🔴 ${downtime}`;
                }
            }
            cpu_user() {
                return this.stat()?.Cpu_user()?.series() ?? [];
            }
            cpu_system() {
                return this.stat()?.Cpu_system()?.series() ?? [];
            }
            mem_used() {
                return this.stat()?.Mem_used()?.series() ?? [];
            }
            mem_free() {
                return this.stat()?.Mem_free()?.series() ?? [];
            }
            fs_used() {
                return this.stat()?.Fs_used()?.series() ?? [];
            }
            fs_free() {
                return this.stat()?.Fs_free()?.series() ?? [];
            }
            land_alive() {
                return this.stat()?.Land_alive()?.series() ?? [];
            }
            land_ghost() {
                return this.stat()?.Land_ghost()?.series() ?? [];
            }
            fs_reads() {
                return this.stat()?.Fs_reads()?.series() ?? [];
            }
            fs_writes() {
                return this.stat()?.Fs_writes()?.series() ?? [];
            }
            port_slaves() {
                return this.stat()?.Port_slaves()?.series() ?? [];
            }
            port_masters() {
                return this.stat()?.Port_masters()?.series() ?? [];
            }
            errors() {
                return this.stat()?.Errors()?.series() ?? [];
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "stat", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "uptime", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "cpu_user", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "cpu_system", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "mem_used", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "mem_free", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "fs_used", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "fs_free", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "land_alive", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "land_ghost", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "fs_reads", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "fs_writes", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "port_slaves", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "port_masters", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_page.prototype, "errors", null);
        $$.$giper_baza_app_stat_page = $giper_baza_app_stat_page;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_app_stat_page, {
            flex: {
                basis: `100%`,
                grow: 1,
            },
            Main: {
                flex: {
                    grow: 1,
                },
            },
            Charts: {
                align: {
                    self: 'stretch',
                },
            },
            $mol_chart: {
                height: `20rem`,
                flex: {
                    basis: `25rem`,
                    shrink: 0,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_app_stat_list) = class $giper_baza_app_stat_list extends ($.$mol_book2_catalog) {
		peer_urls(id){
			return (this.peer_home(id).urls());
		}
		peer_home(id){
			const obj = new this.$.$giper_baza_app_home();
			return obj;
		}
		peer_uptime(id){
			return (this.Spread(id).uptime());
		}
		peer_uri(id){
			return "";
		}
		Menu_link_avatar(id){
			const obj = new this.$.$mol_avatar();
			(obj.id) = () => ((this.peer_uri(id)));
			return obj;
		}
		Menu_link_status(id){
			const obj = new this.$.$mol_view();
			(obj.sub) = () => ([(this.peer_uptime(id))]);
			return obj;
		}
		menu_title(){
			return "📊 Network Monitoring";
		}
		param(){
			return "peer";
		}
		Spread(id){
			const obj = new this.$.$giper_baza_app_stat_page();
			(obj.home) = () => ((this.peer_home(id)));
			(obj.tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		menu_link_content(id){
			return [
				(this.Menu_link_avatar(id)), 
				(this.Menu_link_title(id)), 
				(this.Menu_link_status(id))
			];
		}
	};
	($mol_mem_key(($.$giper_baza_app_stat_list.prototype), "peer_home"));
	($mol_mem_key(($.$giper_baza_app_stat_list.prototype), "Menu_link_avatar"));
	($mol_mem_key(($.$giper_baza_app_stat_list.prototype), "Menu_link_status"));
	($mol_mem_key(($.$giper_baza_app_stat_list.prototype), "Spread"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_app_stat_list extends $.$giper_baza_app_stat_list {
            self_link() {
                try {
                    const url = this.$.$giper_baza_glob.yard().master_current();
                    if (!url)
                        return null;
                    const id = this.$.$mol_fetch.text(url + 'link');
                    return new $giper_baza_link(id);
                }
                catch (error) {
                    $mol_fail_log(error);
                    return null;
                }
            }
            spread_ids() {
                return [
                    ...$mol_maybe(this.self_link()?.str),
                    ...this.$.$giper_baza_glob.Seed().peers().map(peer => peer.link().str),
                ];
            }
            peer_home(id) {
                return this.$.$giper_baza_glob.Pawn(new $giper_baza_link(id), $giper_baza_app_home);
            }
            peer_uri(id) {
                return this.peer_urls(id)[0] ?? '';
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_list.prototype, "self_link", null);
        __decorate([
            $mol_mem
        ], $giper_baza_app_stat_list.prototype, "spread_ids", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_app_stat_list.prototype, "peer_home", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_app_stat_list.prototype, "peer_uri", null);
        $$.$giper_baza_app_stat_list = $giper_baza_app_stat_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_app_stat_list, {
            Menu: {
                flex: {
                    basis: '30rem',
                },
            },
            Menu_link: {
                justify: {
                    content: 'space-between',
                },
            },
            Menu_link_title: {
                flex: {
                    grow: 1,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$mol_icon_play) = class $mol_icon_play extends ($.$mol_icon) {
		path(){
			return "M8,5.14V19.14L19,12.14L8,5.14Z";
		}
	};


;
"use strict";


;
	($.$mol_check_icon) = class $mol_check_icon extends ($.$mol_check) {};


;
"use strict";
var $;
(function ($) {
    $mol_style_attach("mol/check/icon/icon.view.css", "[mol_check_icon]:where([mol_check_checked]) {\n\tcolor: var(--mol_theme_current);\n}\n");
})($ || ($ = {}));

;
"use strict";


;
	($.$giper_baza_auth_slot) = class $giper_baza_auth_slot extends ($.$mol_page) {
		prefix(next){
			if(next !== undefined) return next;
			return "";
		}
		run(next){
			if(next !== undefined) return next;
			return null;
		}
		Prefix(){
			const obj = new this.$.$mol_string();
			(obj.hint) = () => ("Prefix");
			(obj.value) = (next) => ((this.prefix(next)));
			(obj.submit) = (next) => ((this.run(next)));
			return obj;
		}
		Run_icon(){
			const obj = new this.$.$mol_icon_play();
			return obj;
		}
		running(next){
			if(next !== undefined) return next;
			return false;
		}
		run_enabled(){
			return false;
		}
		Running(){
			const obj = new this.$.$mol_check_icon();
			(obj.Icon) = () => ((this.Run_icon()));
			(obj.checked) = (next) => ((this.running(next)));
			(obj.enabled) = () => ((this.run_enabled()));
			(obj.label) = () => ([(this.grabbing())]);
			return obj;
		}
		Input(){
			const obj = new this.$.$mol_bar();
			(obj.sub) = () => ([(this.Prefix()), (this.Running())]);
			return obj;
		}
		link(id){
			return "";
		}
		key(id){
			return "";
		}
		Key(id){
			const obj = new this.$.$mol_button_copy();
			(obj.title) = () => ((this.link(id)));
			(obj.text) = () => ((this.key(id)));
			return obj;
		}
		keys(){
			return [(this.Key("0"))];
		}
		Keys(){
			const obj = new this.$.$mol_list();
			(obj.rows) = () => ((this.keys()));
			return obj;
		}
		title(){
			return "🎰 Beautiful Keys Mining";
		}
		glob(){
			const obj = new this.$.$giper_baza_glob();
			return obj;
		}
		found(id, next){
			if(next !== undefined) return next;
			return [];
		}
		body(){
			return [(this.Input()), (this.Keys())];
		}
	};
	($mol_mem(($.$giper_baza_auth_slot.prototype), "prefix"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "run"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "Prefix"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "Run_icon"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "running"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "Running"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "Input"));
	($mol_mem_key(($.$giper_baza_auth_slot.prototype), "Key"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "Keys"));
	($mol_mem(($.$giper_baza_auth_slot.prototype), "glob"));
	($mol_mem_key(($.$giper_baza_auth_slot.prototype), "found"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_auth_slot extends $.$giper_baza_auth_slot {
            prefix(next) {
                return this.$.$mol_state_session.value(`${this}.prefix<>`, next) ?? '';
            }
            found(prefix, next) {
                return this.$.$mol_state_local.value(`${this}.found<${JSON.stringify(prefix)}>`, next) ?? [];
            }
            run() {
                this.running(true);
            }
            running(next = false) {
                this.prefix();
                return next;
            }
            run_enabled() {
                return this.prefix().length > 0;
            }
            grabbing() {
                if (!this.running())
                    return null;
                const prefix = this.prefix();
                try {
                    const auth = this.$.$giper_baza_auth.grab();
                    const lord = auth.pass().lord();
                    if (lord.str.startsWith(prefix)) {
                        this.found(prefix, [...this.found(prefix), auth.toString() + auth.toStringPrivate()]);
                    }
                    $mol_wire_watch();
                    return ($mol_mem_cached(() => this.grabbing()) ?? 0) + 1;
                }
                catch (error) {
                    $mol_fail_log(error);
                    return $mol_mem_cached(() => this.grabbing()) ?? 0;
                }
            }
            keys() {
                return this.found(this.prefix()).map((_, i) => this.Key(i)).reverse();
            }
            link(index) {
                return $giper_baza_auth.from(this.found(this.prefix())[index]).pass().lord().str;
            }
            key(index) {
                return this.found(this.prefix())[index].toString();
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_auth_slot.prototype, "prefix", null);
        __decorate([
            $mol_mem_key
        ], $giper_baza_auth_slot.prototype, "found", null);
        __decorate([
            $mol_mem
        ], $giper_baza_auth_slot.prototype, "running", null);
        __decorate([
            $mol_mem
        ], $giper_baza_auth_slot.prototype, "grabbing", null);
        __decorate([
            $mol_mem
        ], $giper_baza_auth_slot.prototype, "keys", null);
        $$.$giper_baza_auth_slot = $giper_baza_auth_slot;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        $mol_style_define($giper_baza_auth_slot, {
            flex: {
                basis: '25rem',
            },
            Key: {
                font: {
                    family: 'monospace',
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
	($.$giper_baza_app) = class $giper_baza_app extends ($.$mol_book2_catalog) {
		Source(){
			const obj = new this.$.$mol_link_source();
			(obj.uri) = () => ("https://github.com/giper-dev/baza");
			return obj;
		}
		Status(){
			const obj = new this.$.$giper_baza_status();
			return obj;
		}
		Info(){
			const obj = new this.$.$mol_frame();
			(obj.title) = () => ("💨 Giper Encyclopedy");
			(obj.uri) = () => ("https://page.hyoo.ru/#!=sy2u0y_9rb8zj");
			return obj;
		}
		Glob(){
			const obj = new this.$.$giper_baza_glob_book();
			(obj.addon_tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		Stat(){
			const obj = new this.$.$giper_baza_app_stat_list();
			(obj.menu_tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		Slot(){
			const obj = new this.$.$giper_baza_auth_slot();
			(obj.tools) = () => ([(this.Spread_close())]);
			return obj;
		}
		menu_title(){
			return "Giper Baza";
		}
		param(){
			return "section";
		}
		menu_foot(){
			return [(this.Source()), (this.Status())];
		}
		spreads(){
			return {
				"info": (this.Info()), 
				"glob": (this.Glob()), 
				"stat": (this.Stat()), 
				"slot": (this.Slot())
			};
		}
		placeholders(){
			return [];
		}
	};
	($mol_mem(($.$giper_baza_app.prototype), "Source"));
	($mol_mem(($.$giper_baza_app.prototype), "Status"));
	($mol_mem(($.$giper_baza_app.prototype), "Info"));
	($mol_mem(($.$giper_baza_app.prototype), "Glob"));
	($mol_mem(($.$giper_baza_app.prototype), "Stat"));
	($mol_mem(($.$giper_baza_app.prototype), "Slot"));


;
"use strict";


;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $giper_baza_app extends $.$giper_baza_app {
            auto() {
                this.$.$giper_baza_glob.home();
                return [];
            }
        }
        __decorate([
            $mol_mem
        ], $giper_baza_app.prototype, "auto", null);
        $$.$giper_baza_app = $giper_baza_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const { url } = $mol_style_func;
        $mol_style_define($giper_baza_app, {
            background: {
                image: [[url('giper/baza/logo/bg.webp')]],
                size: ['cover'],
                position: 'top',
            },
            Menu: {
                flex: {
                    basis: `15rem`,
                },
            },
            Info: {
                flex: {
                    basis: `50rem`,
                    shrink: 0,
                },
            },
        });
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));


//# sourceMappingURL=web.test.js.map
