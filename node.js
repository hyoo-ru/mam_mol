#!/usr/bin/env node
"use strict";
var exports = void 0;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../" ) ] }; 
;
"use strict";
Error.stackTraceLimit = 50;
var $;
(function ($) {
})($ || ($ = {}));
module.exports = $;

;

$node[ "../mam.ts" ] = $node[ "../mam.ts" ] = module.exports }.call( {} , {} )
;
"use strict"

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var $ = ( typeof module === 'object' ) ? ( module['export'+'s'] = globalThis ) : globalThis
$.$$ = $

;
"use strict";
var $;
(function ($) {
    $.$mol_ambient_ref = Symbol('$mol_ambient_ref');
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const instances = new WeakSet();
    /**
     * Proxy that delegates all to lazy returned target.
     *
     * 	$mol_delegate( Array.prototype , ()=> fetch_array() )
     */
    function $mol_delegate(proto, target) {
        const proxy = new Proxy(proto, {
            get: (_, field) => {
                const obj = target();
                let val = Reflect.get(obj, field);
                if (typeof val === 'function') {
                    val = val.bind(obj);
                }
                return val;
            },
            has: (_, field) => Reflect.has(target(), field),
            set: (_, field, value) => Reflect.set(target(), field, value),
            getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
            ownKeys: () => Reflect.ownKeys(target()),
            getPrototypeOf: () => Reflect.getPrototypeOf(target()),
            setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
            isExtensible: () => Reflect.isExtensible(target()),
            preventExtensions: () => Reflect.preventExtensions(target()),
            apply: (_, self, args) => Reflect.apply(target(), self, args),
            construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
            defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
            deleteProperty: (_, field) => Reflect.deleteProperty(target(), field),
        });
        instances.add(proxy);
        return proxy;
    }
    $.$mol_delegate = $mol_delegate;
    Reflect.defineProperty($mol_delegate, Symbol.hasInstance, {
        value: (obj) => instances.has(obj),
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_owning_map = new WeakMap();
    function $mol_owning_allow(having) {
        try {
            if (!having)
                return false;
            if (typeof having !== 'object' && typeof having !== 'function')
                return false;
            if (having instanceof $mol_delegate)
                return false;
            if (typeof having['destructor'] !== 'function')
                return false;
            return true;
        }
        catch {
            return false;
        }
    }
    $.$mol_owning_allow = $mol_owning_allow;
    function $mol_owning_get(having, Owner) {
        if (!$mol_owning_allow(having))
            return null;
        while (true) {
            const owner = $.$mol_owning_map.get(having);
            if (!owner)
                return owner;
            if (!Owner)
                return owner;
            if (owner instanceof Owner)
                return owner;
            having = owner;
        }
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

;
"use strict";
var $;
(function ($) {
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error; /// Use 'Never Pause Here' breakpoint in DevTools or simply blackbox this script
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const named = new WeakSet();
    function $mol_func_name(func) {
        let name = func.name;
        if (name?.length > 1)
            return name;
        if (named.has(func))
            return name;
        for (let key in this) {
            try {
                if (this[key] !== func)
                    continue;
                name = key;
                Object.defineProperty(func, 'name', { value: name });
                break;
            }
            catch { }
        }
        named.add(func);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_key_handle = Symbol.for('$mol_key_handle');
    $.$mol_key_store = new WeakMap();
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if (!Symbol.dispose)
        Symbol.dispose = Symbol('Symbol.dispose');
    class $mol_object2 {
        static $ = $;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
            if (this[$mol_ambient_ref])
                return this[$mol_ambient_ref];
            const owner = $mol_owning_get(this);
            return this[$mol_ambient_ref] = owner?.$ || this.constructor.$ || $mol_object2.$;
        }
        set $(next) {
            if (this[$mol_ambient_ref])
                $mol_fail_hidden(new Error('Context already defined'));
            this[$mol_ambient_ref] = next;
        }
        static create(init) {
            const obj = new this;
            if (init)
                init(obj);
            return obj;
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
        }
        static toJSON() {
            return this.toString();
        }
        static [$mol_key_handle]() {
            return this.toString();
        }
        destructor() { }
        static destructor() { }
        [Symbol.dispose]() {
            this.destructor();
        }
        //[ Symbol.toPrimitive ]( hint: string ) {
        //	return hint === 'number' ? this.valueOf() : this.toString()
        //}
        toString() {
            return this[Symbol.toStringTag] || this.constructor.name + '<>';
        }
    }
    $.$mol_object2 = $mol_object2;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    $_1.$mol_object_field = Symbol('$mol_object_field');
    class $mol_object extends $mol_object2 {
        static make(config) {
            return super.create(obj => {
                for (let key in config)
                    obj[key] = config[key];
            });
        }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Generates unique identifier. */
    function $mol_guid(length = 8, exists = () => false) {
        for (;;) {
            let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
            if (exists(id))
                continue;
            return id;
        }
    }
    $.$mol_guid = $mol_guid;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Special status statuses. */
    let $mol_wire_cursor;
    (function ($mol_wire_cursor) {
        /** Update required. */
        $mol_wire_cursor[$mol_wire_cursor["stale"] = -1] = "stale";
        /** Some of (transitive) pub update required. */
        $mol_wire_cursor[$mol_wire_cursor["doubt"] = -2] = "doubt";
        /** Actual state but may be dropped. */
        $mol_wire_cursor[$mol_wire_cursor["fresh"] = -3] = "fresh";
        /** State will never be changed. */
        $mol_wire_cursor[$mol_wire_cursor["final"] = -4] = "final";
    })($mol_wire_cursor = $.$mol_wire_cursor || ($.$mol_wire_cursor = {}));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Collects subscribers in compact array. 28B
     */
    class $mol_wire_pub extends Object {
        constructor(id = `$mol_wire_pub:${$mol_guid()}`) {
            super();
            this[Symbol.toStringTag] = id;
        }
        [Symbol.toStringTag];
        data = [];
        // Derived objects should be Arrays.
        static get [Symbol.species]() {
            return Array;
        }
        /**
         * Index of first subscriber.
         */
        sub_from = 0; // 4B
        /**
         * All current subscribers.
         */
        get sub_list() {
            const res = [];
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                res.push(this.data[i]);
            }
            return res;
        }
        /**
         * Has any subscribers or not.
         */
        get sub_empty() {
            return this.sub_from === this.data.length;
        }
        /**
         * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
         */
        sub_on(sub, pub_pos) {
            const pos = this.data.length;
            this.data.push(sub, pub_pos);
            return pos;
        }
        /**
         * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
         */
        sub_off(sub_pos) {
            if (!(sub_pos < this.data.length)) {
                $mol_fail(new Error(`Wrong pos ${sub_pos}`));
            }
            const end = this.data.length - 2;
            if (sub_pos !== end) {
                this.peer_move(end, sub_pos);
            }
            this.data.length = end;
            if (end === this.sub_from)
                this.reap();
        }
        /**
         * Called when last sub was unsubscribed.
         **/
        reap() { }
        /**
         * Autowire this publisher with current subscriber.
         **/
        promote() {
            $mol_wire_auto()?.track_next(this);
        }
        /**
         * Enforce actualization. Should not throw errors.
         */
        fresh() { }
        /**
         * Allow to put data to caches in the subtree.
         */
        complete() { }
        get incompleted() {
            return false;
        }
        /**
         * Notify subscribers about self changes.
         */
        emit(quant = $mol_wire_cursor.stale) {
            for (let i = this.sub_from; i < this.data.length; i += 2) {
                ;
                this.data[i].absorb(quant, this.data[i + 1]);
            }
        }
        /**
         * Moves peer from one position to another. Doesn't clear data at old position!
         */
        peer_move(from_pos, to_pos) {
            const peer = this.data[from_pos];
            const self_pos = this.data[from_pos + 1];
            this.data[to_pos] = peer;
            this.data[to_pos + 1] = self_pos;
            peer.peer_repos(self_pos, to_pos);
        }
        /**
         * Updates self position in the peer.
         */
        peer_repos(peer_pos, self_pos) {
            this.data[peer_pos + 1] = self_pos;
        }
    }
    $.$mol_wire_pub = $mol_wire_pub;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    $.$mol_wire_auto_sub = null;
    /**
     * When fulfilled, all publishers are promoted to this subscriber on access to its.
     */
    function $mol_wire_auto(next = $.$mol_wire_auto_sub) {
        return $.$mol_wire_auto_sub = next;
    }
    $.$mol_wire_auto = $mol_wire_auto;
    /**
     * Affection queue. Used to prevent accidental stack overflow on emit.
     */
    $.$mol_wire_affected = [];
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    // https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview#
    $['devtoolsFormatters'] ||= [];
    function $mol_dev_format_register(config) {
        $['devtoolsFormatters'].push(config);
    }
    $.$mol_dev_format_register = $mol_dev_format_register;
    $.$mol_dev_format_head = Symbol('$mol_dev_format_head');
    $.$mol_dev_format_body = Symbol('$mol_dev_format_body');
    function $mol_dev_format_button(label, click) {
        return $mol_dev_format_auto({
            [$.$mol_dev_format_head]() {
                return $.$mol_dev_format_span({ color: 'cornflowerblue' }, label);
            },
            [$.$mol_dev_format_body]() {
                Promise.resolve().then(click);
                return $.$mol_dev_format_span({});
            }
        });
    }
    $mol_dev_format_register({
        header: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_head in val) {
                try {
                    return val[$.$mol_dev_format_head]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            if (typeof val === 'function') {
                return $mol_dev_format_native(val);
            }
            if (val instanceof Error) {
                return $.$mol_dev_format_span({}, $mol_dev_format_native(val), ' ', $mol_dev_format_button('throw', () => $mol_fail_hidden(val)));
            }
            if (val instanceof Promise) {
                return $.$mol_dev_format_shade($mol_dev_format_native(val), ' ', val[Symbol.toStringTag] ?? '');
            }
            if (Symbol.toStringTag in val) {
                return $mol_dev_format_native(val);
            }
            return null;
        },
        hasBody: (val, config = false) => {
            if (config)
                return false;
            if (!val)
                return false;
            // if( Error.isError( val ) ) true
            if (val[$.$mol_dev_format_body])
                return true;
            return false;
        },
        body: (val, config = false) => {
            if (config)
                return null;
            if (!val)
                return null;
            if ($.$mol_dev_format_body in val) {
                try {
                    return val[$.$mol_dev_format_body]();
                }
                catch (error) {
                    return $.$mol_dev_format_accent($mol_dev_format_native(val), '💨', $mol_dev_format_native(error), '');
                }
            }
            // if( Error.isError( val ) ) {
            // 	return $mol_dev_format_native( val )
            // }
            return null;
        },
    });
    function $mol_dev_format_native(obj) {
        if (typeof obj === 'undefined')
            return $.$mol_dev_format_shade('undefined');
        // if( ![ 'object', 'function', 'symbol' ].includes( typeof obj )  ) return obj
        return [
            'object',
            {
                object: obj,
                config: true,
            },
        ];
    }
    $.$mol_dev_format_native = $mol_dev_format_native;
    function $mol_dev_format_auto(obj) {
        if (obj == null)
            return $.$mol_dev_format_shade(String(obj));
        return [
            'object',
            {
                object: obj,
                config: false,
            },
        ];
    }
    $.$mol_dev_format_auto = $mol_dev_format_auto;
    function $mol_dev_format_element(element, style, ...content) {
        const styles = [];
        for (let key in style)
            styles.push(`${key} : ${style[key]}`);
        return [
            element,
            {
                style: styles.join(' ; '),
            },
            ...content,
        ];
    }
    $.$mol_dev_format_element = $mol_dev_format_element;
    $.$mol_dev_format_span = $mol_dev_format_element.bind(null, 'span');
    $.$mol_dev_format_div = $mol_dev_format_element.bind(null, 'div');
    $.$mol_dev_format_ol = $mol_dev_format_element.bind(null, 'ol');
    $.$mol_dev_format_li = $mol_dev_format_element.bind(null, 'li');
    $.$mol_dev_format_table = $mol_dev_format_element.bind(null, 'table');
    $.$mol_dev_format_tr = $mol_dev_format_element.bind(null, 'tr');
    $.$mol_dev_format_td = $mol_dev_format_element.bind(null, 'td');
    $.$mol_dev_format_accent = $.$mol_dev_format_span.bind(null, {
        'color': 'magenta',
    });
    $.$mol_dev_format_strong = $.$mol_dev_format_span.bind(null, {
        'font-weight': 'bold',
    });
    $.$mol_dev_format_string = $.$mol_dev_format_span.bind(null, {
        'color': 'green',
    });
    $.$mol_dev_format_shade = $.$mol_dev_format_span.bind(null, {
        'color': 'gray',
    });
    $.$mol_dev_format_indent = $.$mol_dev_format_div.bind(null, {
        'margin-inline-start': '13px'
    });
    class Stack extends Array {
        // [ Symbol.toPrimitive ]() {
        // 	return this.toString()
        // }
        match(...args) {
            return this.toString().match(...args);
        }
        split(...args) {
            return this.toString().split(...args);
        }
        toString() {
            return this.join('\n');
        }
    }
    class Call extends Object {
        type;
        function;
        method;
        eval;
        source;
        offset;
        pos;
        object;
        flags;
        [Symbol.toStringTag];
        constructor(call) {
            super();
            this.type = call.getTypeName() ?? '';
            this.function = call.getFunctionName() ?? '';
            this.method = call.getMethodName() ?? '';
            if (this.method === this.function)
                this.method = '';
            // const func = c.getFunction()
            this.pos = [call.getEnclosingLineNumber() ?? 0, call.getEnclosingColumnNumber() ?? 0];
            this.eval = call.getEvalOrigin() ?? '';
            this.source = call.getScriptNameOrSourceURL() ?? '';
            this.object = call.getThis();
            this.offset = call.getPosition();
            const flags = [];
            if (call.isAsync())
                flags.push('async');
            if (call.isConstructor())
                flags.push('constructor');
            if (call.isEval())
                flags.push('eval');
            if (call.isNative())
                flags.push('native');
            if (call.isPromiseAll())
                flags.push('PromiseAll');
            if (call.isToplevel())
                flags.push('top');
            this.flags = flags;
            const type = this.type ? this.type + '.' : '';
            const func = this.function || '<anon>';
            const method = this.method ? ' [' + this.method + '] ' : '';
            this[Symbol.toStringTag] = `${type}${func}${method}`;
        }
        [Symbol.toPrimitive]() {
            return this.toString();
        }
        toString() {
            const object = this.object || '';
            const label = this[Symbol.toStringTag];
            const source = `${this.source}:${this.pos.join(':')} #${this.offset}`;
            return `\tat ${object}${label} (${source})`;
        }
        [$.$mol_dev_format_head]() {
            return $.$mol_dev_format_div({}, $mol_dev_format_native(this), $.$mol_dev_format_shade(' '), ...this.object ? [
                $mol_dev_format_native(this.object),
            ] : [], ...this.method ? [$.$mol_dev_format_shade(' ', ' [', this.method, ']')] : [], $.$mol_dev_format_shade(' ', this.flags.join(', ')));
        }
    }
    Error.prepareStackTrace ??= (error, stack) => new Stack(...stack.map(call => new Call(call)));
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Publisher that can auto collect other publishers. 32B
     *
     * 	P1 P2 P3 P4 S1 S2 S3
     * 	^           ^
     * 	pubs_from   subs_from
     */
    class $mol_wire_pub_sub extends $mol_wire_pub {
        pub_from = 0; // 4B
        cursor = $mol_wire_cursor.stale; // 4B
        get temp() {
            return false;
        }
        get pub_list() {
            const res = [];
            const max = this.cursor >= 0 ? this.cursor : this.sub_from;
            for (let i = this.pub_from; i < max; i += 2) {
                if (this.data[i])
                    res.push(this.data[i]);
            }
            return res;
        }
        track_on() {
            this.cursor = this.pub_from;
            const sub = $mol_wire_auto();
            $mol_wire_auto(this);
            return sub;
        }
        promote() {
            if (this.cursor >= this.pub_from) {
                $mol_fail(new Error('Circular subscription'));
            }
            super.promote();
        }
        track_next(pub) {
            if (this.cursor < 0)
                $mol_fail(new Error('Promo to non begun sub'));
            if (this.cursor < this.sub_from) {
                const next = this.data[this.cursor];
                if (pub === undefined)
                    return next ?? null;
                if (next === pub) {
                    this.cursor += 2;
                    return next;
                }
                if (next) {
                    if (this.sub_from < this.data.length) {
                        this.peer_move(this.sub_from, this.data.length);
                    }
                    this.peer_move(this.cursor, this.sub_from);
                    this.sub_from += 2;
                }
            }
            else {
                if (pub === undefined)
                    return null;
                if (this.sub_from < this.data.length) {
                    this.peer_move(this.sub_from, this.data.length);
                }
                this.sub_from += 2;
            }
            this.data[this.cursor] = pub;
            this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
            this.cursor += 2;
            return pub;
        }
        track_off(sub) {
            $mol_wire_auto(sub);
            if (this.cursor < 0) {
                $mol_fail(new Error('End of non begun sub'));
            }
            for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
                const pub = this.data[cursor];
                pub.fresh();
            }
            this.cursor = $mol_wire_cursor.fresh;
        }
        pub_off(sub_pos) {
            this.data[sub_pos] = undefined;
            this.data[sub_pos + 1] = undefined;
        }
        destructor() {
            for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
                const sub = this.data[cursor];
                const pos = this.data[cursor + 1];
                sub.pub_off(pos);
            }
            this.data.length = this.sub_from;
            this.cursor = this.pub_from;
            this.track_cut();
            this.cursor = $mol_wire_cursor.stale;
        }
        track_cut() {
            if (this.cursor < this.pub_from) {
                $mol_fail(new Error('Cut of non begun sub'));
            }
            let end = this.data.length;
            for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                pub?.sub_off(this.data[cursor + 1]);
                end -= 2;
                if (this.sub_from <= end)
                    this.peer_move(end, cursor);
            }
            this.data.length = end;
            this.sub_from = this.cursor;
        }
        complete() { }
        complete_pubs() {
            const limit = this.cursor < 0 ? this.sub_from : this.cursor;
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                if (pub?.incompleted)
                    return;
            }
            for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
                const pub = this.data[cursor];
                pub?.complete();
            }
        }
        absorb(quant = $mol_wire_cursor.stale, pos = -1) {
            if (this.cursor === $mol_wire_cursor.final)
                return;
            if (this.cursor >= quant)
                return;
            this.cursor = quant;
            this.emit($mol_wire_cursor.doubt);
            // if( pos >= 0 && pos < this.sub_from - 2 ) {
            // 	const pub = this.data[ pos ] as $mol_wire_pub
            // 	if( pub instanceof $mol_wire_task ) return
            // 	for(
            // 		let cursor = this.pub_from;
            // 		cursor < this.sub_from;
            // 		cursor += 2
            // 	) {
            // 		const pub = this.data[ cursor ] as $mol_wire_pub
            // 		if( pub instanceof $mol_wire_task ) {
            // 			pub.destructor()
            // 		}
            // 	}
            // }
        }
        [$mol_dev_format_head]() {
            return $mol_dev_format_native(this);
        }
        /**
         * Is subscribed to any publisher or not.
         */
        get pub_empty() {
            return this.sub_from === this.pub_from;
        }
    }
    $.$mol_wire_pub_sub = $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_tick extends $mol_object2 {
        task;
        static promise = null;
        cancelled = false;
        constructor(task) {
            super();
            this.task = task;
            if (!$mol_after_tick.promise)
                $mol_after_tick.promise = Promise.resolve().then(() => {
                    $mol_after_tick.promise = null;
                });
            $mol_after_tick.promise.then(() => {
                if (this.cancelled)
                    return;
                task();
            });
        }
        destructor() {
            this.cancelled = true;
        }
    }
    $.$mol_after_tick = $mol_after_tick;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_promise_like(val) {
        try {
            return val && typeof val === 'object' && 'then' in val && typeof val.then === 'function';
        }
        catch {
            return false;
        }
    }
    $.$mol_promise_like = $mol_promise_like;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const wrappers = new WeakMap();
    /**
     * Suspendable task with support both sync/async api.
     *
     * 	A1 A2 A3 A4 P1 P2 P3 P4 S1 S2 S3
     * 	^           ^           ^
     * 	args_from   pubs_from   subs_from
     **/
    class $mol_wire_fiber extends $mol_wire_pub_sub {
        task;
        host;
        static warm = true;
        static planning = new Set();
        static reaping = new Set();
        static plan_task = null;
        static plan() {
            if (this.plan_task)
                return;
            this.plan_task = new $mol_after_tick(() => {
                try {
                    this.sync();
                }
                finally {
                    $mol_wire_fiber.plan_task = null;
                }
            });
        }
        static sync() {
            // Sync whole fiber graph
            while (this.planning.size) {
                for (const fiber of this.planning) {
                    this.planning.delete(fiber);
                    if (fiber.cursor >= 0)
                        continue;
                    if (fiber.cursor === $mol_wire_cursor.final)
                        continue;
                    fiber.fresh();
                }
            }
            // Collect garbage
            while (this.reaping.size) {
                const fibers = this.reaping;
                this.reaping = new Set;
                for (const fiber of fibers) {
                    if (!fiber.sub_empty)
                        continue;
                    fiber.destructor();
                }
            }
        }
        cache = undefined;
        get args() {
            return this.data.slice(0, this.pub_from);
        }
        result() {
            if ($mol_promise_like(this.cache))
                return;
            if (this.cache instanceof Error)
                return;
            return this.cache;
        }
        get incompleted() {
            return $mol_promise_like(this.cache);
        }
        field() {
            return this.task.name + '()';
        }
        constructor(id, task, host, args) {
            super(id);
            this.task = task;
            this.host = host;
            if (args)
                this.data.push(...args);
            this.pub_from = this.sub_from = args?.length ?? 0;
        }
        plan() {
            $mol_wire_fiber.planning.add(this);
            $mol_wire_fiber.plan();
            return this;
        }
        reap() {
            $mol_wire_fiber.reaping.add(this);
            $mol_wire_fiber.plan();
        }
        toString() {
            return this[Symbol.toStringTag];
        }
        toJSON() {
            return this[Symbol.toStringTag];
        }
        [$mol_dev_format_head]() {
            const cursor = {
                [$mol_wire_cursor.stale]: '🔴',
                [$mol_wire_cursor.doubt]: '🟡',
                [$mol_wire_cursor.fresh]: '🟢',
                [$mol_wire_cursor.final]: '🔵',
            }[this.cursor] ?? this.cursor.toString();
            return $mol_dev_format_div({}, $mol_owning_check(this, this.cache)
                ? $mol_dev_format_shade(cursor)
                : $mol_dev_format_shade(this[Symbol.toStringTag], cursor), $mol_dev_format_auto(this.cache));
        }
        [$mol_dev_format_body]() { return null; }
        get $() {
            return (this.host ?? this.task)['$'];
        }
        emit(quant = $mol_wire_cursor.stale) {
            if (this.sub_empty)
                this.plan();
            else
                super.emit(quant);
        }
        fresh() {
            if (this.cursor === $mol_wire_cursor.fresh)
                return;
            if (this.cursor === $mol_wire_cursor.final)
                return;
            check: if (this.cursor === $mol_wire_cursor.doubt) {
                for (let i = this.pub_from; i < this.sub_from; i += 2) {
                    ;
                    this.data[i]?.fresh();
                    if (this.cursor !== $mol_wire_cursor.doubt)
                        break check;
                }
                this.cursor = $mol_wire_cursor.fresh;
                return;
            }
            const bu = this.track_on();
            let result;
            try {
                switch (this.pub_from) {
                    case 0:
                        result = this.task.call(this.host);
                        break;
                    case 1:
                        result = this.task.call(this.host, this.data[0]);
                        break;
                    default:
                        result = this.task.call(this.host, ...this.args);
                        break;
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result).then(a => a);
                    }
                    else {
                        const put = (res) => {
                            if (this.cache === result)
                                this.put(res);
                            return res;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        wrappers.set(result, result);
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            catch (error) {
                if (error instanceof Error || $mol_promise_like(error)) {
                    result = error;
                }
                else {
                    result = new Error(String(error), { cause: error });
                }
                if ($mol_promise_like(result)) {
                    if (wrappers.has(result)) {
                        result = wrappers.get(result);
                    }
                    else {
                        const put = (v) => {
                            if (this.cache === result)
                                this.absorb();
                            return v;
                        };
                        wrappers.set(result, result = Object.assign(result.then(put, put), { destructor: result.destructor || (() => { }) }));
                        const error = new Error(`Promise in ${this}`);
                        Object.defineProperty(result, 'stack', { get: () => error.stack });
                    }
                }
            }
            if (!$mol_promise_like(result)) {
                this.track_cut();
            }
            this.track_off(bu);
            this.put(result);
            return this;
        }
        refresh() {
            this.cursor = $mol_wire_cursor.stale;
            this.fresh();
        }
        /**
         * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
         * Should be called inside SuspenseAPI consumer (ie fiber).
         */
        sync() {
            if (!$mol_wire_fiber.warm) {
                return this.result();
            }
            this.promote();
            this.fresh();
            if (this.cache instanceof Error) {
                return $mol_fail_hidden(this.cache);
            }
            if ($mol_promise_like(this.cache)) {
                return $mol_fail_hidden(this.cache);
            }
            return this.cache;
        }
        /**
         * Asynchronous execution.
         * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
         */
        async async_raw() {
            while (true) {
                this.fresh();
                if (this.cache instanceof Error) {
                    $mol_fail_hidden(this.cache);
                }
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                await Promise.race([this.cache, this.step()]);
                if (!$mol_promise_like(this.cache))
                    return this.cache;
                if (this.cursor === $mol_wire_cursor.final) {
                    // never ends on destructed fiber
                    await new Promise(() => { });
                }
            }
        }
        async() {
            const promise = this.async_raw();
            if (!promise.destructor)
                promise.destructor = () => this.destructor();
            return promise;
        }
        step() {
            return new Promise(done => {
                const sub = new $mol_wire_pub_sub;
                const prev = sub.track_on();
                sub.track_next(this);
                sub.track_off(prev);
                sub.absorb = () => {
                    done(null);
                    setTimeout(() => sub.destructor());
                };
            });
        }
        destructor() {
            super.destructor();
            $mol_wire_fiber.planning.delete(this);
            if (!$mol_owning_check(this, this.cache))
                return;
            try {
                this.cache.destructor();
            }
            catch (result) {
                if ($mol_promise_like(result)) {
                    const error = new Error(`Promise in ${this}.destructor()`);
                    Object.defineProperty(result, 'stack', { get: () => error.stack });
                }
                $mol_fail_hidden(result);
            }
        }
    }
    $.$mol_wire_fiber = $mol_wire_fiber;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_compare_deep_cache = new WeakMap();
    /**
     * Deeply compares two values. Returns true if equal.
     * Define `Symbol.toPrimitive` to customize.
     */
    function $mol_compare_deep(left, right) {
        if (Object.is(left, right))
            return true;
        if (left === null)
            return false;
        if (right === null)
            return false;
        if (typeof left !== 'object')
            return false;
        if (typeof right !== 'object')
            return false;
        const left_proto = Reflect.getPrototypeOf(left);
        const right_proto = Reflect.getPrototypeOf(right);
        if (left_proto !== right_proto)
            return false;
        if (left instanceof Boolean)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Number)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof String)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof Date)
            return Object.is(left.valueOf(), right['valueOf']());
        if (left instanceof RegExp)
            return left.source === right.source && left.flags === right.flags;
        if (left instanceof Error)
            return left.message === right.message && $mol_compare_deep(left.stack, right.stack);
        let left_cache = $.$mol_compare_deep_cache.get(left);
        if (left_cache) {
            const right_cache = left_cache.get(right);
            if (typeof right_cache === 'boolean')
                return right_cache;
        }
        else {
            left_cache = new WeakMap();
            $.$mol_compare_deep_cache.set(left, left_cache);
        }
        left_cache.set(right, true);
        let result;
        try {
            if (!left_proto)
                result = compare_pojo(left, right);
            else if (!Reflect.getPrototypeOf(left_proto))
                result = compare_pojo(left, right);
            else if (Symbol.toPrimitive in left)
                result = compare_primitive(left, right);
            else if (Array.isArray(left))
                result = compare_array(left, right);
            else if (left instanceof Set)
                result = compare_set(left, right);
            else if (left instanceof Map)
                result = compare_map(left, right);
            else if (ArrayBuffer.isView(left))
                result = compare_buffer(left, right);
            else if (Symbol.iterator in left)
                result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
            else
                result = false;
        }
        finally {
            left_cache.set(right, result);
        }
        return result;
    }
    $.$mol_compare_deep = $mol_compare_deep;
    function compare_array(left, right) {
        const len = left.length;
        if (len !== right.length)
            return false;
        for (let i = 0; i < len; ++i) {
            if (!$mol_compare_deep(left[i], right[i]))
                return false;
        }
        return true;
    }
    function compare_buffer(left, right) {
        const len = left.byteLength;
        if (len !== right.byteLength)
            return false;
        if (left instanceof DataView)
            return compare_buffer(new Uint8Array(left.buffer, left.byteOffset, left.byteLength), new Uint8Array(right.buffer, right.byteOffset, right.byteLength));
        for (let i = 0; i < len; ++i) {
            if (left[i] !== right[i])
                return false;
        }
        return true;
    }
    function compare_iterator(left, right) {
        while (true) {
            const left_next = left.next();
            const right_next = right.next();
            if (left_next.done !== right_next.done)
                return false;
            if (left_next.done)
                break;
            if (!$mol_compare_deep(left_next.value, right_next.value))
                return false;
        }
        return true;
    }
    function compare_set(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.values(), right.values());
    }
    function compare_map(left, right) {
        if (left.size !== right.size)
            return false;
        return compare_iterator(left.keys(), right.keys())
            && compare_iterator(left.values(), right.values());
    }
    function compare_pojo(left, right) {
        const left_keys = Object.getOwnPropertyNames(left);
        const right_keys = Object.getOwnPropertyNames(right);
        if (!compare_array(left_keys, right_keys))
            return false;
        for (let key of left_keys) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        const left_syms = Object.getOwnPropertySymbols(left);
        const right_syms = Object.getOwnPropertySymbols(right);
        if (!compare_array(left_syms, right_syms))
            return false;
        for (let key of left_syms) {
            if (!$mol_compare_deep(left[key], right[key]))
                return false;
        }
        return true;
    }
    function compare_primitive(left, right) {
        return Object.is(left[Symbol.toPrimitive]('default'), right[Symbol.toPrimitive]('default'));
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Log begin of collapsed group only when some logged inside, returns func to close group */
    function $mol_log3_area_lazy(event) {
        const self = this.$;
        const stack = self.$mol_log3_stack;
        const deep = stack.length;
        let logged = false;
        stack.push(() => {
            logged = true;
            self.$mol_log3_area.call(self, event);
        });
        return () => {
            if (logged)
                self.console.groupEnd();
            if (stack.length > deep)
                stack.length = deep;
        };
    }
    $.$mol_log3_area_lazy = $mol_log3_area_lazy;
    $.$mol_log3_stack = [];
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
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
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
    function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === 'boolean' || typeof json === 'number' || json === null) {
            return new $mol_tree2(String(json), '', [], span);
        }
        if (typeof json === 'string') {
            return $mol_tree2.data(json, [], span);
        }
        if (typeof json.toJSON === 'function') {
            return $mol_tree2_from_json(json.toJSON());
        }
        if (Array.isArray(json)) {
            const sub = json.map(json => $mol_tree2_from_json(json, span));
            return new $mol_tree2('/', '', sub, span);
        }
        if (ArrayBuffer.isView(json)) {
            const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
            const codes = [...buf].map(b => b.toString(16).toUpperCase().padStart(2, '0'));
            const str = $mol_array_chunks(codes, 8).map(c => c.join(' ')).join('\n');
            return $mol_tree2.data(str, [], span);
        }
        if (json instanceof Date) {
            return new $mol_tree2('', json.toISOString(), [], span);
        }
        if (json.toString !== Object.prototype.toString) {
            return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
            const { name, message, stack } = json;
            json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
            const val = json[key];
            if (val === undefined)
                continue;
            const subsub = $mol_tree2_from_json(val, span);
            if (/^[^\n\t\\ ]+$/.test(key)) {
                sub.push(new $mol_tree2(key, '', [subsub], span));
            }
            else {
                sub.push($mol_tree2.data(key, [subsub], span));
            }
        }
        return new $mol_tree2('*', '', sub, span);
    }
    $.$mol_tree2_from_json = $mol_tree2_from_json;
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
    function $mol_log3_node_make(level, output, type, color) {
        return function $mol_log3_logger(event) {
            if (!event.time)
                event = { ...event, time: new Date().toISOString() };
            let tree = this.$mol_tree2_from_json(event);
            tree = tree.struct(type, tree.kids);
            let str = color(tree.toString());
            this.console[level](str);
            const self = this;
            return () => self.console.groupEnd();
        };
    }
    $.$mol_log3_node_make = $mol_log3_node_make;
    $.$mol_log3_come = $mol_log3_node_make('info', 'stdout', 'come', $mol_term_color.blue);
    $.$mol_log3_done = $mol_log3_node_make('info', 'stdout', 'done', $mol_term_color.green);
    $.$mol_log3_fail = $mol_log3_node_make('error', 'stderr', 'fail', $mol_term_color.red);
    $.$mol_log3_warn = $mol_log3_node_make('warn', 'stderr', 'warn', $mol_term_color.yellow);
    $.$mol_log3_rise = $mol_log3_node_make('log', 'stdout', 'rise', $mol_term_color.magenta);
    $.$mol_log3_area = $mol_log3_node_make('log', 'stdout', 'area', $mol_term_color.cyan);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** One-shot fiber */
    class $mol_wire_task extends $mol_wire_fiber {
        static getter(task) {
            return function $mol_wire_task_get(host, args) {
                const sub = $mol_wire_auto();
                const existen = sub?.track_next();
                let cause = '';
                reuse: if (existen) {
                    if (!existen.temp)
                        break reuse;
                    if (existen.host !== host) {
                        cause = 'host';
                        break reuse;
                    }
                    if (existen.task !== task) {
                        cause = 'task';
                        break reuse;
                    }
                    if (!$mol_compare_deep(existen.args, args)) {
                        cause = 'args';
                        break reuse;
                    }
                    return existen;
                }
                const key = (host?.[Symbol.toStringTag] ?? host) + ('.' + task.name + '<#>');
                const next = new $mol_wire_task(key, task, host, args);
                // Disabled because non-idempotency is required for try-catch
                if (existen?.temp) {
                    $$.$mol_log3_warn({
                        place: '$mol_wire_task',
                        message: `Different ${cause} on restart`,
                        sub,
                        prev: existen,
                        next,
                        hint: 'Maybe required additional memoization',
                    });
                }
                return next;
            };
        }
        get temp() {
            return true;
        }
        complete() {
            if ($mol_promise_like(this.cache))
                return;
            this.destructor();
        }
        put(next) {
            const prev = this.cache;
            this.cache = next;
            if ($mol_promise_like(next)) {
                this.cursor = $mol_wire_cursor.fresh;
                if (next !== prev)
                    this.emit();
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                return next;
            }
            this.cursor = $mol_wire_cursor.final;
            if (this.sub_empty)
                this.destructor();
            else if (next !== prev)
                this.emit();
            return next;
        }
        destructor() {
            super.destructor();
            this.cursor = $mol_wire_cursor.final;
        }
    }
    $.$mol_wire_task = $mol_wire_task;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Convert a pseudo-synchronous (Suspense API) API to an explicit asynchronous one (for integrating with external systems). */
    function $mol_wire_async(obj) {
        let fiber;
        const temp = $mol_wire_task.getter(obj);
        return new Proxy(obj, {
            get(obj, field) {
                const val = obj[field];
                if (typeof val !== 'function')
                    return val;
                let fiber;
                const temp = $mol_wire_task.getter(val);
                return function $mol_wire_async(...args) {
                    fiber?.destructor();
                    fiber = temp(obj, args);
                    return fiber.async();
                };
            },
            apply(obj, self, args) {
                fiber?.destructor();
                fiber = temp(self, args);
                return fiber.async();
            },
        });
    }
    $.$mol_wire_async = $mol_wire_async;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const catched = new WeakSet();
    function $mol_fail_catch(error) {
        if (typeof error !== 'object')
            return false;
        if ($mol_promise_like(error))
            $mol_fail_hidden(error);
        if (catched.has(error))
            return false;
        catched.add(error);
        return true;
    }
    $.$mol_fail_catch = $mol_fail_catch;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_try(handler) {
        try {
            return handler();
        }
        catch (error) {
            console.error(error);
            return error;
        }
    }
    $.$mol_try = $mol_try;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_fail_log(error) {
        if ($mol_promise_like(error))
            return false;
        if (!$mol_fail_catch(error))
            return false;
        $mol_try(() => { $mol_fail_hidden(error); });
        return true;
    }
    $.$mol_fail_log = $mol_fail_log;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    /** Returns string key for any value. */
    function $mol_key(value) {
        primitives: {
            if (typeof value === 'bigint')
                return value.toString() + 'n';
            if (typeof value === 'symbol')
                return `Symbol(${value.description})`;
            if (!value)
                return JSON.stringify(value); // 0, null, ""
            if (typeof value !== 'object' && typeof value !== 'function')
                return JSON.stringify(value); // boolean, number, string
        }
        caching: {
            let key = $mol_key_store.get(value);
            if (key)
                return key;
        }
        objects: {
            if (value instanceof TypedArray) {
                return `${value[Symbol.toStringTag]}([${[...value].map(v => $mol_key(v))}])`;
            }
            if (Array.isArray(value))
                return `[${value.map(v => $mol_key(v))}]`;
            if (value instanceof RegExp)
                return value.toString();
            if (value instanceof Date)
                return `Date(${value.valueOf()})`;
        }
        structures: {
            const proto = Reflect.getPrototypeOf(value);
            if (!proto || !Reflect.getPrototypeOf(proto)) {
                return `{${Object.entries(value).map(([k, v]) => JSON.stringify(k) + ':' + $mol_key(v))}}`;
            }
        }
        handlers: {
            if ($mol_key_handle in value) {
                return value[$mol_key_handle]();
            }
        }
        containers: {
            const key = JSON.stringify('#' + $mol_guid());
            $mol_key_store.set(value, key);
            return key;
        }
    }
    $.$mol_key = $mol_key;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_timeout extends $mol_object2 {
        delay;
        task;
        id;
        constructor(delay, task) {
            super();
            this.delay = delay;
            this.task = task;
            this.id = setTimeout(task, delay);
        }
        destructor() {
            clearTimeout(this.id);
        }
    }
    $.$mol_after_timeout = $mol_after_timeout;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_after_frame extends $mol_after_timeout {
        task;
        constructor(task) {
            super(16, task);
            this.task = task;
        }
    }
    $.$mol_after_frame = $mol_after_frame;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber.
     */
    function $mol_wire_method(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const temp = $mol_wire_task.getter(orig);
        const value = function (...args) {
            const fiber = temp(this ?? null, args);
            return fiber.sync();
        };
        Object.defineProperty(value, 'name', { value: orig.name + ' ' });
        Object.assign(value, { orig });
        const descr2 = { ...descr, value };
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_method = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /** Long-living fiber. */
    class $mol_wire_atom extends $mol_wire_fiber {
        static solo(host, task) {
            const field = task.name + '()';
            const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            if (existen)
                return existen;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key = prefix + ('.' + task.name + '<>');
            const fiber = new $mol_wire_atom(key, task, host, []);
            (host ?? task)[field] = fiber;
            return fiber;
        }
        static plex(host, task, key) {
            const field = task.name + '()';
            let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
            const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
            const key_str = $mol_key(key);
            if (dict) {
                const existen = dict.get(key_str);
                if (existen)
                    return existen;
            }
            else {
                dict = (host ?? task)[field] = new Map();
            }
            const id = prefix + ('.' + task.name) + ('<' + key_str.replace(/^"|"$/g, "'") + '>');
            const fiber = new $mol_wire_atom(id, task, host, [key]);
            dict.set(key_str, fiber);
            return fiber;
        }
        static watching = new Set();
        static watcher = null;
        static watch() {
            $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            for (const atom of $mol_wire_atom.watching) {
                if (atom.cursor === $mol_wire_cursor.final) {
                    $mol_wire_atom.watching.delete(atom);
                }
                else {
                    atom.cursor = $mol_wire_cursor.stale;
                    atom.fresh();
                }
            }
        }
        watch() {
            if (!$mol_wire_atom.watcher) {
                $mol_wire_atom.watcher = new $mol_after_frame($mol_wire_atom.watch);
            }
            $mol_wire_atom.watching.add(this);
        }
        /**
         * Update atom value through another temp fiber.
         */
        resync(args) {
            // enforce pulling tasks abort
            for (let cursor = this.pub_from; cursor < this.sub_from; cursor += 2) {
                const pub = this.data[cursor];
                if (pub && pub instanceof $mol_wire_task) {
                    pub.destructor();
                }
            }
            return this.put(this.task.call(this.host, ...args));
        }
        once() {
            return this.sync();
        }
        channel() {
            return Object.assign((next) => {
                if (next !== undefined)
                    return this.resync([...this.args, next]);
                if (!$mol_wire_fiber.warm)
                    return this.result();
                if ($mol_wire_auto()?.temp) {
                    return this.once();
                }
                else {
                    return this.sync();
                }
            }, { atom: this });
        }
        destructor() {
            super.destructor();
            if (this.pub_from === 0) {
                ;
                (this.host ?? this.task)[this.field()] = null;
            }
            else {
                const key = $mol_key(this.args[0]);
                const map = (this.host ?? this.task)[this.field()];
                if (!map.has(key))
                    this.$.$mol_log3_warn({
                        place: this,
                        message: 'Absent key on destruction',
                        hint: 'Check for $mol_key(key) is not changed',
                    });
                map.delete(key);
            }
        }
        put(next) {
            const prev = this.cache;
            update: if (next !== prev) {
                try {
                    if ($mol_compare_deep(prev, next))
                        break update;
                }
                catch (error) {
                    $mol_fail_log(error);
                }
                if ($mol_owning_check(this, prev)) {
                    prev.destructor();
                }
                if ($mol_owning_catch(this, next)) {
                    try {
                        next[Symbol.toStringTag] = this[Symbol.toStringTag];
                    }
                    catch { // Promises throw in strict mode
                        Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
                    }
                }
                if (!this.sub_empty)
                    this.emit();
            }
            this.cache = next;
            this.cursor = $mol_wire_cursor.fresh;
            if ($mol_promise_like(next))
                return next;
            this.complete_pubs();
            return next;
        }
    }
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "resync", null);
    __decorate([
        $mol_wire_method
    ], $mol_wire_atom.prototype, "once", null);
    $.$mol_wire_atom = $mol_wire_atom;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Decorates solo object channel to [mol_wire_atom](../atom/atom.ts). */
    function $mol_wire_solo(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.solo(this, orig);
                if ((args.length === 0) || (args[0] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_solo = $mol_wire_solo;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** Reactive memoizing multiplexed property decorator. */
    function $mol_wire_plex(host, field, descr) {
        if (!descr)
            descr = Reflect.getOwnPropertyDescriptor(host, field);
        const orig = descr?.value ?? host[field];
        const sup = Reflect.getPrototypeOf(host);
        if (typeof sup[field] === 'function') {
            Object.defineProperty(orig, 'name', { value: sup[field].name });
        }
        const descr2 = {
            ...descr,
            value: function (...args) {
                let atom = $mol_wire_atom.plex(this, orig, args[0]);
                if ((args.length === 1) || (args[1] === undefined)) {
                    if (!$mol_wire_fiber.warm)
                        return atom.result();
                    if ($mol_wire_auto()?.temp) {
                        return atom.once();
                    }
                    else {
                        return atom.sync();
                    }
                }
                return atom.resync(args);
            }
        };
        Reflect.defineProperty(descr2.value, 'name', { value: orig.name + ' ' });
        Reflect.defineProperty(descr2.value, 'length', { value: orig.length });
        Object.assign(descr2.value, { orig });
        Reflect.defineProperty(host, field, descr2);
        return descr2;
    }
    $.$mol_wire_plex = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Reactive memoizing solo property decorator from [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem
     * name(next?: string) {
     * 	return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem = $mol_wire_solo;
    /**
     * Reactive memoizing multiplexed property decorator [mol_wire](../wire/README.md)
     * @example
     * '@' $mol_mem_key
     * name(id: number, next?: string) {
     *  return next ?? 'default'
     * }
     * @see https://mol.hyoo.ru/#!section=docs/=qxmh6t_sinbmb
     */
    $.$mol_mem_key = $mol_wire_plex;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const factories = new WeakMap();
    function factory(val) {
        let make = factories.get(val);
        if (make)
            return make;
        make = $mol_func_name_from((...args) => new val(...args), val);
        factories.set(val, make);
        return make;
    }
    const getters = new WeakMap();
    function get_prop(host, field) {
        let props = getters.get(host);
        let get_val = props?.[field];
        if (get_val)
            return get_val;
        get_val = (next) => {
            if (next !== undefined)
                host[field] = next;
            return host[field];
        };
        Object.defineProperty(get_val, 'name', { value: field });
        if (!props) {
            props = {};
            getters.set(host, props);
        }
        props[field] = get_val;
        return get_val;
    }
    /**
     * Convert asynchronous (promise-based) API to synchronous by wrapping function and method calls in a fiber.
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    function $mol_wire_sync(obj) {
        return new Proxy(obj, {
            get(obj, field) {
                let val = obj[field];
                const temp = $mol_wire_task.getter(typeof val === 'function' ? val : get_prop(obj, field));
                if (typeof val !== 'function')
                    return temp(obj, []).sync();
                return function $mol_wire_sync(...args) {
                    const fiber = temp(obj, args);
                    return fiber.sync();
                };
            },
            set(obj, field, next) {
                const temp = $mol_wire_task.getter(get_prop(obj, field));
                temp(obj, [next]).sync();
                return true;
            },
            construct(obj, args) {
                const temp = $mol_wire_task.getter(factory(obj));
                return temp(obj, args).sync();
            },
            apply(obj, self, args) {
                const temp = $mol_wire_task.getter(obj);
                return temp(self, args).sync();
            },
        });
    }
    $.$mol_wire_sync = $mol_wire_sync;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rpc extends $mol_object {
        handlers() {
            return {};
        }
        handle_async(payload) {
            return $mol_wire_async(this).handle(payload);
        }
        handle([name, args, sender]) {
            let result, error;
            try {
                result = this.handlers()[name](...args);
            }
            catch (e) {
                if ($mol_promise_like(e))
                    $mol_fail_hidden(e);
                this.$.$mol_fail_log(e);
                error = { message: e.message, name, args, cause: e.cause };
            }
            sender.postMessage({ result, error });
        }
        target() {
            return {
                send(payload) { }
            };
        }
        fail_callbacks = [];
        error(next) {
            this.target();
            if (next === undefined)
                return null;
            for (const callback of this.fail_callbacks)
                callback(next[0]);
            this.fail_callbacks = [];
            return next;
        }
        call_async(method, args) {
            const target = this.target();
            const channel = new MessageChannel();
            target.send([method, args, channel.port2]);
            return new Promise((done, fail) => {
                const remove_callback = () => this.fail_callbacks = this.fail_callbacks.filter(src => src !== fail);
                this.fail_callbacks.push(fail);
                channel.port1.onmessage = e => {
                    remove_callback();
                    const error = e.data?.error;
                    if (!error)
                        return done(e.data.result);
                    fail(new Error(error.message || 'Data error', { cause: {
                            method,
                            args,
                            error
                        } }));
                };
                channel.port1.onmessageerror = event => {
                    remove_callback();
                    fail(new Error('Message error', { cause: { method, args, event } }));
                };
            });
        }
        call(method, args) {
            return $mol_wire_sync(this).call_async(method, args);
        }
        remote() {
            this.target();
            return new Proxy({}, {
                get: (target, name) => (...args) => name === 'destructor'
                    ? null
                    : this.call(name, args)
            });
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rpc.prototype, "target", null);
    __decorate([
        $mol_mem
    ], $mol_rpc.prototype, "error", null);
    __decorate([
        $mol_mem
    ], $mol_rpc.prototype, "remote", null);
    $.$mol_rpc = $mol_rpc;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const mod = require /****/('module');
    const internals = mod.builtinModules;
    function $node_internal_check(name) {
        if (name.startsWith('node:'))
            return true;
        return internals.includes(name);
    }
    $.$node_internal_check = $node_internal_check;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const path = require /****/('path');
    const mod = require /****/('module');
    const localRequire = mod.createRequire(path.join(process.cwd(), 'package.json'));
    function $node_autoinstall(name) {
        try {
            localRequire.resolve(name);
        }
        catch {
            this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', name], dir: '.' });
            try {
                this.$mol_run.spawn({ command: ['npm', 'install', '--omit=dev', '@types/' + name], dir: '.' });
            }
            catch (e) {
                if (this.$mol_promise_like(e))
                    this.$mol_fail_hidden(e);
                this.$mol_fail_log(e);
            }
        }
    }
    $.$node_autoinstall = $node_autoinstall;
})($ || ($ = {}));

;
"use strict";
var $node = new Proxy({ require }, {
    get(target, name, wrapper) {
        if (target[name])
            return target[name];
        if ($.$node_internal_check(name))
            return target.require(name);
        if (name[0] === '.')
            return target.require(name);
        $.$node_autoinstall(name);
        return target.require(name);
    },
    set(target, name, value) {
        target[name] = value;
        return true;
    },
});
require = (req => Object.assign(function require(name) {
    return $node[name];
}, req))(require);

;
"use strict";
var $;
(function ($) {
    /** Run code without state changes */
    function $mol_wire_probe(task, def) {
        const warm = $mol_wire_fiber.warm;
        try {
            $mol_wire_fiber.warm = false;
            const res = task();
            if (res === undefined)
                return def;
            return res;
        }
        finally {
            $mol_wire_fiber.warm = warm;
        }
    }
    $.$mol_wire_probe = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function cause_serialize(cause) {
        return JSON.stringify(cause, null, '  ')
            .replace(/\(/, '<')
            .replace(/\)/, ' >');
    }
    function frame_normalize(frame) {
        return (typeof frame === 'string' ? frame : cause_serialize(frame))
            .trim()
            .replace(/at /gm, '   at ')
            .replace(/^(?!    +at )(.*)/gm, '    at | $1 (#)');
    }
    class $mol_error_mix extends AggregateError {
        cause;
        name = $$.$mol_func_name(this.constructor).replace(/^\$/, '') + '_Error';
        constructor(message, cause = {}, ...errors) {
            super(errors, message, { cause });
            this.cause = cause;
            const desc = Object.getOwnPropertyDescriptor(this, 'stack');
            const stack_get = () => desc?.get?.() ?? super.stack ?? desc?.value ?? this.message;
            Object.defineProperty(this, 'stack', {
                get: () => stack_get() + '\n' + [
                    this.cause ?? 'no cause',
                    ...this.errors.flatMap(e => [
                        String(e.stack),
                        ...e instanceof $mol_error_mix || !e.cause ? [] : [e.cause]
                    ])
                ].map(frame_normalize).join('\n')
            });
            // в nodejs, что б не дублировалось cause в консоли
            Object.defineProperty(this, 'cause', {
                get: () => cause
            });
        }
        static [Symbol.toPrimitive]() {
            return this.toString();
        }
        static toString() {
            return $$.$mol_func_name(this);
        }
        static make(...params) {
            return new this(...params);
        }
    }
    $.$mol_error_mix = $mol_error_mix;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_env() {
        return {};
    }
    $.$mol_env = $mol_env;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_env = function $mol_env() {
        return this.process.env;
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_run_error extends $mol_error_mix {
    }
    $.$mol_run_error = $mol_run_error;
    $.$mol_run_spawn = (...args) => $node['child_process'].spawn(...args);
    $.$mol_run_spawn_sync = (...args) => $node['child_process'].spawnSync(...args);
    class $mol_run extends $mol_object {
        static async_enabled() {
            return Boolean(this.$.$mol_env()['MOL_RUN_ASYNC']);
        }
        static spawn(options) {
            const sync = !this.async_enabled() || !Boolean($mol_wire_auto());
            const env = options.env ?? this.$.$mol_env();
            return $mol_wire_sync(this).spawn_async({ ...options, sync, env });
        }
        static spawn_async({ dir, sync, timeout, command, env }) {
            const args_raw = typeof command === 'string' ? command.split(' ') : command;
            const [app, ...args] = args_raw;
            const opts = { shell: true, cwd: dir, env };
            const log_object = {
                place: `${this}.spawn()`,
                message: 'Run',
                command: args_raw.join(' '),
                dir: $node.path.relative('', dir),
            };
            if (sync) {
                this.$.$mol_log3_come({
                    hint: 'Run inside fiber',
                    ...log_object
                });
                let error;
                let res;
                try {
                    res = this.$.$mol_run_spawn_sync(app, args, opts);
                    error = res.error;
                }
                catch (err) {
                    error = err;
                }
                if (!res || error || res.status) {
                    throw new $mol_run_error(this.error_message(res), { ...log_object, status: res?.status, signal: res?.signal }, ...(error ? [error] : []));
                }
                return res;
            }
            let sub;
            try {
                sub = this.$.$mol_run_spawn(app, args, {
                    ...opts,
                    stdio: ['pipe', 'inherit', 'inherit'],
                });
            }
            catch (error) {
                throw new $mol_run_error(this.error_message(undefined), log_object, error);
            }
            const pid = sub.pid ?? 0;
            this.$.$mol_log3_come({
                ...log_object,
                pid,
            });
            let timeout_kill = false;
            let timer;
            const std_data = [];
            const error_data = [];
            const add = (std_chunk, error_chunk) => {
                if (std_chunk)
                    std_data.push(std_chunk);
                if (error_chunk)
                    error_data.push(error_chunk);
                if (!timeout)
                    return;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    const signal = timeout_kill ? 'SIGKILL' : 'SIGTERM';
                    timeout_kill = true;
                    add();
                    sub.kill(signal);
                }, timeout);
            };
            add();
            sub.stdout?.on('data', data => add(data));
            sub.stderr?.on('data', data => add(undefined, data));
            const result_promise = new Promise((done, fail) => {
                const close = (error, status = null, signal = null) => {
                    if (!timer && timeout)
                        return;
                    clearTimeout(timer);
                    timer = undefined;
                    const res = {
                        pid,
                        signal,
                        get stdout() { return Buffer.concat(std_data); },
                        get stderr() { return Buffer.concat(error_data); }
                    };
                    if (error || status || timeout_kill)
                        return fail(new $mol_run_error(this.error_message(res) + (timeout_kill ? ', timeout' : ''), { ...log_object, pid, status, signal, timeout_kill }, ...error ? [error] : []));
                    this.$.$mol_log3_done({
                        ...log_object,
                        pid,
                    });
                    done(res);
                };
                sub.on('disconnect', () => close(new Error('Disconnected')));
                sub.on('error', err => close(err));
                sub.on('exit', (status, signal) => close(null, status, signal));
            });
            return Object.assign(result_promise, { destructor: () => {
                    clearTimeout(timer);
                    sub.kill('SIGKILL');
                } });
        }
        static error_message(res) {
            return res?.stderr.toString() || res?.stdout.toString() || 'Run error';
        }
    }
    $.$mol_run = $mol_run;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_rpc_worker extends $mol_rpc {
        static is_main() {
            return this.threads().isMainThread;
        }
        static threads() {
            return $node['node:worker_threads'];
        }
        threads() { return this.$.$mol_rpc_worker.threads(); }
        uri() { return ''; }
        options() {
            return {};
        }
        worker_data() {
            return this.threads().workerData;
        }
        worker() {
            const { Worker } = this.threads();
            let destructing = false;
            const destructor = () => {
                if (destructing)
                    return;
                destructing = true;
                worker.terminate().catch(e => this.$.$mol_fail_log(e));
            };
            const worker = Object.assign(new Worker(this.uri(), this.options()), { destructor });
            let inited = false;
            return new Promise((done, fail) => {
                worker.on('error', (err) => {
                    if (destructing)
                        return;
                    if (!inited)
                        return fail(err);
                    this.$.$mol_fail_log(err);
                    this.error([err]);
                    this.restarts(null);
                });
                worker.on('exit', code => {
                    if (destructing)
                        return;
                    destructing = true;
                    const err = new Error('Worker exited', { cause: { code } });
                    if (!inited)
                        return fail(err);
                    this.error([err]); // Need to reset callers fail callbacks
                    this.restarts(null);
                });
                worker.on('message', e => {
                    if (destructing)
                        return;
                    if (!inited)
                        done(worker);
                    inited = true;
                    this.receive(e);
                });
            });
        }
        restarts(next) {
            return 1 + ($mol_wire_probe(() => this.restarts()) ?? -1);
        }
        target() {
            this.restarts();
            const parent = this.threads().parentPort;
            const worker = parent ? null : $mol_wire_sync(this).worker();
            const cb = (e) => this.receive(e);
            parent?.on('message', cb);
            const destructor = () => {
                worker?.destructor();
                parent?.off('message', cb);
            };
            const send = (payload) => {
                (parent ?? worker)?.postMessage(payload, [payload[2]]);
            };
            return { send, destructor };
        }
        toString() {
            return `${this.threads().isMainThread ? 'main' : 'thread'} ${super.toString()}`;
        }
        receive(data) {
            if (!Array.isArray(data))
                return;
            if (data.length !== 3)
                return;
            const [name, args, sender] = data;
            if (typeof name !== 'string')
                return;
            if (!(sender instanceof MessagePort))
                return;
            this.handle_async([name, args, sender]);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_rpc_worker.prototype, "restarts", null);
    __decorate([
        $mol_mem
    ], $mol_rpc_worker.prototype, "target", null);
    $.$mol_rpc_worker = $mol_rpc_worker;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    /**
     * Returns closure that returns constant value.
     * @example
     * const rnd = $mol_const( Math.random() )
     */
    function $mol_const(value) {
        const getter = (() => value);
        getter['()'] = value;
        getter[Symbol.toStringTag] = value;
        getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, '()=> ', $mol_dev_format_auto(value));
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Decorates method to fiber to ensure it is executed only once inside other fiber from [mol_wire](../wire/README.md)
     * @see https://mol.hyoo.ru/#!section=docs/=1fcpsq_1wh0h2
     */
    $.$mol_action = $mol_wire_method;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_lock extends $mol_object {
        promise = null;
        async wait() {
            let next = () => { };
            let destructed = false;
            const task = $mol_wire_auto();
            if (!task)
                return next;
            const destructor = task.destructor.bind(task);
            task.destructor = () => {
                destructor();
                destructed = true;
                next();
            };
            let promise;
            do {
                promise = this.promise;
                await promise;
                if (destructed)
                    return next;
            } while (promise !== this.promise);
            this.promise = new Promise(done => { next = done; });
            return next;
        }
        grab() { return $mol_wire_sync(this).wait(); }
    }
    $.$mol_lock = $mol_lock;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_mem_cached = $mol_wire_probe;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_compare_array(a, b) {
        if (a === b)
            return true;
        if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
            return false;
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (a[i] !== b[i])
                return false;
        return true;
    }
    $.$mol_compare_array = $mol_compare_array;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const decoders = {};
    function $mol_charset_decode(buffer, encoding = 'utf8') {
        let decoder = decoders[encoding];
        if (!decoder)
            decoder = decoders[encoding] = new TextDecoder(encoding);
        return decoder.decode(buffer);
    }
    $.$mol_charset_decode = $mol_charset_decode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let buf = new Uint8Array(2 ** 12); // 4KB Mem Page
    /** Temporary buffer. Recursive usage isn't supported. */
    function $mol_charset_buffer(size) {
        if (buf.byteLength < size)
            buf = new Uint8Array(size);
        return buf;
    }
    $.$mol_charset_buffer = $mol_charset_buffer;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_charset_encode(str) {
        const buf = $mol_charset_buffer(str.length * 3);
        return buf.slice(0, $mol_charset_encode_to(str, buf));
    }
    $.$mol_charset_encode = $mol_charset_encode;
    function $mol_charset_encode_to(str, buf, from = 0) {
        let pos = from;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80) { // ASCII - 1 octet
                buf[pos++] = code;
            }
            else if (code < 0x800) { // 2 octet
                buf[pos++] = 0xc0 | (code >> 6);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else if (code < 0xd800 || code >= 0xe000) { // 3 octet
                buf[pos++] = 0xe0 | (code >> 12);
                buf[pos++] = 0x80 | ((code >> 6) & 0x3f);
                buf[pos++] = 0x80 | (code & 0x3f);
            }
            else { // surrogate pair
                const point = ((code - 0xd800) << 10) + str.charCodeAt(++i) + 0x2400;
                buf[pos++] = 0xf0 | (point >> 18);
                buf[pos++] = 0x80 | ((point >> 12) & 0x3f);
                buf[pos++] = 0x80 | ((point >> 6) & 0x3f);
                buf[pos++] = 0x80 | (point & 0x3f);
            }
        }
        return pos - from;
    }
    $.$mol_charset_encode_to = $mol_charset_encode_to;
    function $mol_charset_encode_size(str) {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let code = str.charCodeAt(i);
            if (code < 0x80)
                size += 1;
            else if (code < 0x800)
                size += 2;
            else if (code < 0xd800 || code >= 0xe000)
                size += 3;
            else
                size += 4;
        }
        return size;
    }
    $.$mol_charset_encode_size = $mol_charset_encode_size;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_transaction extends $mol_object {
        path() { return ''; }
        modes() { return []; }
        write(options) {
            throw new Error('Not implemented');
        }
        read() {
            throw new Error('Not implemented');
        }
        truncate(size) {
            throw new Error('Not implemented');
        }
        flush() {
            throw new Error('Not implemented');
        }
        close() {
            throw new Error('Not implemented');
        }
        destructor() {
            this.close();
        }
    }
    $.$mol_file_transaction = $mol_file_transaction;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Disable reaping of current subscriber
     */
    function $mol_wire_solid() {
        let current = $mol_wire_auto();
        if (current.temp)
            current = current.host;
        if (current.reap !== nothing) {
            current?.sub_on(sub, sub.data.length);
        }
        current.reap = nothing;
    }
    $.$mol_wire_solid = $mol_wire_solid;
    const nothing = () => { };
    const sub = new $mol_wire_pub_sub;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    let file_modes;
    (function (file_modes) {
        /** create if it doesn't already exist */
        file_modes[file_modes["create"] = $node.fs.constants.O_CREAT] = "create";
        /** truncate to zero size if it already exists */
        file_modes[file_modes["exists_truncate"] = $node.fs.constants.O_TRUNC] = "exists_truncate";
        /** throw exception if it already exists */
        file_modes[file_modes["exists_fail"] = $node.fs.constants.O_EXCL] = "exists_fail";
        file_modes[file_modes["read_only"] = $node.fs.constants.O_RDONLY] = "read_only";
        file_modes[file_modes["write_only"] = $node.fs.constants.O_WRONLY] = "write_only";
        file_modes[file_modes["read_write"] = $node.fs.constants.O_RDWR] = "read_write";
        /** data will be appended to the end */
        file_modes[file_modes["append"] = $node.fs.constants.O_APPEND] = "append";
    })(file_modes || (file_modes = {}));
    function mode_mask(modes) {
        return modes.reduce((res, mode) => res | file_modes[mode], 0);
    }
    class $mol_file_transaction_node extends $mol_file_transaction {
        descr() {
            $mol_wire_solid();
            return $node.fs.openSync(this.path(), mode_mask(this.modes()));
        }
        write({ buffer, offset = 0, length, position = null }) {
            if (Array.isArray(buffer)) {
                return $node.fs.writevSync(this.descr(), buffer, position ?? undefined);
            }
            if (typeof buffer === 'string') {
                return $node.fs.writeSync(this.descr(), buffer, position);
            }
            length = length ?? buffer.byteLength;
            return $node.fs.writeSync(this.descr(), buffer, offset, length, position);
        }
        truncate(size) {
            $node.fs.ftruncateSync(this.descr());
        }
        read() {
            return $mol_file_node_buffer_normalize($node.fs.readFileSync(this.descr()));
        }
        flush() {
            $node.fs.fsyncSync(this.descr());
        }
        close() {
            $node.fs.closeSync(this.descr());
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_transaction_node.prototype, "descr", null);
    $.$mol_file_transaction_node = $mol_file_transaction_node;
    $.$mol_file_transaction = $mol_file_transaction_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file_base extends $mol_object {
        static absolute(path) {
            return this.make({
                path: $mol_const(path)
            });
        }
        static relative(path) {
            throw new Error('Not implemented yet');
        }
        static base = '';
        path() {
            return '.';
        }
        parent() {
            return this.resolve('..');
        }
        exists_cut() { return this.exists(); }
        root() {
            const path = this.path();
            const base = this.constructor.base;
            // Если путь выше или равен base или если parent такойже как и this - считаем это корнем
            return base.startsWith(path) || this == this.parent();
        }
        stat(next, virt) {
            const path = this.path();
            const parent = this.parent();
            // Отслеживать проверку наличия родительской папки не стоит до корня диска
            // Лучше ограничить mam-ом
            if (!this.root()) {
                /*
                Если parent папка удалилась, надо ресетнуть все объекты в ней на любой глубине.
                Например, rm -rf с последующим git pull: parent папка может удалиться, потом создасться,
                а текущая папка успеет только удалиться до момента выполнения stat.
                Поэтому parent.exists() не запустит перевычисления, нужна именно parent.version()

                Однако, parent.version() меняется не только при удалении, будет ложное срабатывание
                С этим придется мириться, красивого решения пока нет.
                */
                parent.version();
            }
            parent.watcher();
            if (virt)
                return next ?? null;
            return next ?? this.info(path);
        }
        static changed = new Set;
        static frame = null;
        static changed_add(type, path) {
            if (/([\/\\]\.|___$)/.test(path))
                return;
            const file = this.relative(path.at(-1) === '/' ? path.slice(0, -1) : path);
            // console.log(type, path)
            // add (change): добавился файл - у parent надо обновить список sub, если он был заюзан
            // change, unlink (rename): обновился или удалился файл - ресетим
            // addDir (change), добавилась папка, у parent обновляем список директорий в sub
            // дочерние ресетим
            // unlinkDir (rename), удалилась папка, ресетим ее
            // stat у всех дочерних обновится сам, т.к. связан с parent.version()
            this.changed.add(file);
            if (!this.watching)
                return;
            // throttle, пока события поступают не сбрасываем.
            // аналог awaitWriteFinish из chokidar
            // интервалы между change-сообщениями модифицируемого файла должны быть меньше watch_debounce
            this.frame?.destructor();
            this.frame = new this.$.$mol_after_timeout(this.watch_debounce(), () => {
                if (!this.watching)
                    return;
                this.watching = false;
                $mol_wire_async(this).flush();
            });
        }
        /**
         * Должно быть больше, чем время между событиями от вотчера при записи внешним процессом.
         * Иначе запуск ресетов паралельно с изменением может привести к неконсистентности.
         */
        static watch_debounce() { return 500; }
        static flush() {
            // Пока flush работает, вотчер сюда не заходит, но может добавлять новые изменения
            // на каждом перезапуске они применятся
            // Пока run выполняется, изменения накапливаются, в конце run вызывается flush
            // Пока применяются изменения, run должен ожидать конца flush
            for (const file of this.changed) {
                const parent = file.parent();
                try {
                    if ($mol_wire_probe(() => parent.sub()))
                        parent.sub(null);
                    file.reset();
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        $mol_fail_log(error);
                }
            }
            this.changed.clear();
            this.watching = true;
            // this.watch_wd?.destructor()
            // this.watch_wd = null
        }
        static watching = true;
        static lock = new $mol_lock;
        static watch_off(path) {
            this.watching = false;
            // run должен ожидать конца flush
            this.flush();
            this.watching = false;
            /*
            watch запаздывает и событие может прилететь через 3 сек после окончания сайд эффекта
            поэтому добавляем папку, которую меняет side_effect
            Когда дойдет до выполнения flush, он ресетнет ее
            
            Иначе будут лишние срабатывания
            Например, удалили hyoo/board, watch ресетит и exists начинает отдавать false, срабатывает git clone
            Сразу после него событие addDir еще не успело прийти,
            на следующем перезапуске вызывается git pull, т.к.
            с точки зрения реактивной системы hyoo/board еще не существует.
            */
            this.changed.add(this.absolute(path));
        }
        // protected static watch_wd = null as null | $mol_after_timeout
        static unwatched(side_effect, affected_dir) {
            // ждем, пока выполнится предыдущий unwatched
            const unlock = this.lock.grab();
            this.watch_off(affected_dir);
            try {
                const result = side_effect();
                this.flush();
                unlock();
                return result;
            }
            catch (e) {
                if (!$mol_promise_like(e)) {
                    this.flush();
                    unlock();
                }
                $mol_fail_hidden(e);
            }
        }
        reset() {
            this.stat(null);
        }
        modified() { return this.stat()?.mtime ?? null; }
        version() {
            const next = this.stat()?.mtime.getTime().toString(36).toUpperCase() ?? '';
            // console.log('version', next, this.path())
            return next;
        }
        info(path) { return null; }
        ensure() { }
        drop() { }
        copy(to) { }
        read() { return new Uint8Array; }
        write(buffer) { }
        kids() {
            return [];
        }
        readable(opts) {
            return new ReadableStream;
        }
        writable(opts) {
            return new WritableStream;
        }
        // open( ... modes: readonly $mol_file_mode[] ) { return 0 }
        buffer(next) {
            // Если версия пустая - возвращаем пустой буфер
            let readed = new Uint8Array();
            if (next === undefined) {
                // Если меняется версия файла, буфер надо перечитать
                if (this.version())
                    readed = this.read();
            }
            const prev = $mol_mem_cached(() => this.buffer());
            const changed = prev === undefined || !$mol_compare_array(prev, next ?? readed);
            if (prev !== undefined && changed) {
                // Логируем, если повторно читаем/пишем и буфер поменялся
                this.$.$mol_log3_rise({
                    place: `$mol_file_node.buffer()`,
                    message: 'Changed',
                    path: this.relate(),
                });
            }
            if (next === undefined)
                return changed ? readed : prev;
            // Если буфер при записи не поменялся и файл не удаляли перед этим - не записываем новую версию.
            // Если записывать, это приведет к смене mtime и вотчер снова триггернется, даже если содержимое файла не поменялось.
            // В этом алгоритме есть изъян.
            // Если файл записали, потом отключили вотчер, кто-то из вне его поменял, потом включили вотчер, снова записали тот же буфер,
            // то буфер не запишется на диск, т.к. кэш не консистентен с диском.
            if (!changed && this.exists())
                return prev;
            this.parent().exists(true);
            this.stat(this.stat_make(next.length), 'virt');
            this.write(next);
            return next;
        }
        stat_make(size) {
            const now = new Date();
            return {
                type: 'file',
                size,
                atime: now,
                mtime: now,
                ctime: now,
            };
        }
        clone(to) {
            if (!this.exists())
                return null;
            const target = this.constructor.absolute(to);
            try {
                this.version();
                target.parent().exists(true);
                this.copy(to);
                target.reset();
                return target;
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    console.error(error);
                }
            }
            return null;
        }
        // static watch_root = ''
        // static watcher_warned = false
        watcher() {
            // const constructor = this.constructor as typeof $mol_file_base
            // if (! constructor.watcher_warned) {
            // 	console.warn(`${constructor}.watcher() not implemented`)
            // 	constructor.watcher_warned = true
            // }
            return {
                destructor() { }
            };
        }
        exists(next) {
            const exists = Boolean(this.stat());
            // console.log('exists current', exists, 'next', next, this.path())
            if (next === undefined)
                return exists;
            if (next === exists)
                return exists;
            if (next) {
                this.parent().exists(true);
                this.ensure();
            }
            else {
                this.drop();
            }
            this.reset();
            return next;
        }
        type() {
            return this.stat()?.type ?? '';
        }
        name() {
            return this.path().replace(/^.*\//, '');
        }
        ext() {
            const match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        text(next, virt) {
            // Если записываем text, и вотчер ресетнул записанный файл,
            // то надо снова его обновить, вызвать логику, которая делала пуш в text.
            // Например файл удалили, потом снова создали, версия поменялась - перезаписываем
            // Если использовать version, то вновь созданный файл, через вотчер запустит свое пересоздание
            if (next !== undefined)
                this.exists();
            return this.text_int(next, virt);
        }
        text_int(next, virt) {
            if (virt) {
                this.stat(this.stat_make(0), 'virt');
                return next;
            }
            if (next === undefined) {
                return $mol_charset_decode(this.buffer());
            }
            else {
                const buffer = $mol_charset_encode(next);
                this.buffer(buffer);
                return next;
            }
        }
        sub(reset) {
            if (!this.exists())
                return [];
            if (this.type() !== 'dir')
                return [];
            this.version();
            // Если дочерний file удалился, список надо обновить
            return this.kids().filter(file => file.exists());
        }
        resolve(path) {
            throw new Error('implement');
        }
        relate(base = this.constructor.relative('.')) {
            const base_path = base.path();
            const path = this.path();
            return path.startsWith(base_path) ? path.slice(base_path.length) : path;
        }
        find(include, exclude) {
            const found = [];
            const sub = this.sub();
            for (const child of sub) {
                const child_path = child.path();
                if (exclude && child_path.match(exclude))
                    continue;
                if (!include || child_path.match(include))
                    found.push(child);
                if (child.type() === 'dir') {
                    const sub_child = child.find(include, exclude);
                    for (const child of sub_child)
                        found.push(child);
                }
            }
            return found;
        }
        size() {
            switch (this.type()) {
                case 'file': return this.stat()?.size ?? 0;
                default: return 0;
            }
        }
        toJSON() {
            return this.path();
        }
        open(...modes) {
            return this.$.$mol_file_transaction.make({
                path: () => this.path(),
                modes: () => modes
            });
        }
    }
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "exists_cut", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "stat", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "modified", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "version", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "readable", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "writable", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "buffer", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "stat_make", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base.prototype, "clone", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "exists", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "type", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "text_int", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "sub", null);
    __decorate([
        $mol_mem
    ], $mol_file_base.prototype, "size", null);
    __decorate([
        $mol_action
    ], $mol_file_base.prototype, "open", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_base, "absolute", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "flush", null);
    __decorate([
        $mol_action
    ], $mol_file_base, "watch_off", null);
    $.$mol_file_base = $mol_file_base;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_file extends $mol_file_base {
    }
    $.$mol_file = $mol_file;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function stat_convert(stat) {
        if (!stat)
            return null;
        let type;
        if (stat.isDirectory())
            type = 'dir';
        if (stat.isFile())
            type = 'file';
        if (stat.isSymbolicLink())
            type = 'link';
        if (!type)
            return $mol_fail(new Error(`Unsupported file type`));
        return {
            type,
            size: Number(stat.size),
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime
        };
    }
    function $mol_file_node_buffer_normalize(buf) {
        return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
    }
    $.$mol_file_node_buffer_normalize = $mol_file_node_buffer_normalize;
    class $mol_file_node extends $mol_file {
        static relative(path) {
            return this.absolute($node.path.resolve(this.base, path).replace(/\\/g, '/'));
        }
        watcher(reset) {
            const path = this.path();
            const root = this.root();
            // Если папки/файла нет, watch упадет с ошибкой
            // exists обратится к parent.version и parent.watcher
            // Поэтому у root-папки и выше не надо вызывать exists, иначе поднимется выше base до корня диска
            // exists вызывать надо, что б пересоздавать вотчер при появлении папки или файла
            if (!root && !this.exists())
                return super.watcher();
            let watcher;
            try {
                // Между exists и watch файл может удалиться, в любом случае надо обрабатывать ENOENT
                watcher = $node.fs.watch(path);
            }
            catch (error) {
                if (!(error instanceof Error))
                    error = new Error('Unknown watch error', { cause: error });
                error.message += '\n' + path;
                if (root || error.code !== 'ENOENT') {
                    this.$.$mol_fail_log(error);
                }
                // Если файла нет - вотчер не создается, создастся потом, когда exists поменяется на true.
                // Если создание упало с другой ошибкой - не ломаем работу mol_file, деградируем до не реактивной fs.
                return super.watcher();
            }
            watcher.on('change', (type, name) => {
                if (!name)
                    return;
                const path = $node.path.join(this.path(), name.toString());
                this.constructor.changed_add(type, path);
            });
            watcher.on('error', e => this.$.$mol_fail_log(e));
            let destructed = false;
            watcher.on('close', () => {
                // Если в процессе работы вотчер сам закрылся, надо его переоткрыть
                if (!destructed)
                    setTimeout(() => $mol_wire_async(this).watcher(null), 500);
            });
            return {
                destructor() {
                    destructed = true;
                    watcher.close();
                }
            };
        }
        info(path) {
            try {
                return stat_convert($node.fs.statSync(path));
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    if (error.code === 'ENOENT')
                        return null;
                    if (error.code === 'EPERM')
                        return null;
                    error.message += '\n' + path;
                    this.$.$mol_fail_hidden(error);
                }
            }
            return null;
        }
        ensure() {
            const path = this.path();
            try {
                $node.fs.mkdirSync(path, { recursive: true });
                return null;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'EEXIST')
                        return null;
                    e.message += '\n' + path;
                    this.$.$mol_fail_hidden(e);
                }
            }
        }
        copy(to) {
            $node.fs.copyFileSync(this.path(), to);
        }
        drop() {
            $node.fs.unlinkSync(this.path());
        }
        read() {
            const path = this.path();
            try {
                return $mol_file_node_buffer_normalize($node.fs.readFileSync(path));
            }
            catch (error) {
                if (!$mol_promise_like(error)) {
                    error.message += '\n' + path;
                }
                $mol_fail_hidden(error);
            }
        }
        write(buffer) {
            const path = this.path();
            try {
                $node.fs.writeFileSync(path, buffer);
            }
            catch (error) {
                if (this.$.$mol_fail_catch(error)) {
                    error.message += '\n' + path;
                }
                return this.$.$mol_fail_hidden(error);
            }
        }
        kids() {
            const path = this.path();
            try {
                const kids = $node.fs.readdirSync(path)
                    .filter(name => !/^\.+$/.test(name))
                    .map(name => this.resolve(name));
                return kids;
            }
            catch (e) {
                if (this.$.$mol_fail_catch(e)) {
                    if (e.code === 'ENOENT')
                        return [];
                    e.message += '\n' + path;
                }
                $mol_fail_hidden(e);
            }
        }
        resolve(path) {
            return this.constructor
                .relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        readable(opts) {
            const { Readable } = $node['node:stream'];
            const stream = $node.fs.createReadStream(this.path(), {
                flags: 'r',
                autoClose: true,
                start: opts?.start,
                end: opts?.end,
                encoding: 'binary',
            });
            return Readable.toWeb(stream);
        }
        writable(opts) {
            const { Writable } = $node['node:stream'];
            const stream = $node.fs.createWriteStream(this.path(), {
                flags: 'w+',
                autoClose: true,
                start: opts?.start,
                encoding: 'binary',
            });
            return Writable.toWeb(stream);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "watcher", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "info", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "ensure", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "copy", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "drop", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "read", null);
    __decorate([
        $mol_action
    ], $mol_file_node.prototype, "write", null);
    __decorate([
        $mol_mem_key
    ], $mol_file_node.prototype, "readable", null);
    __decorate([
        $mol_mem
    ], $mol_file_node.prototype, "writable", null);
    $.$mol_file_node = $mol_file_node;
    $.$mol_file = $mol_file_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function pass(data) {
        return data;
    }
    function $mol_error_fence(task, fallback, loading = pass) {
        try {
            return task();
        }
        catch (error) {
            let normalized;
            try {
                normalized = $mol_promise_like(error) ? loading(error) : fallback(error);
            }
            catch (sub_error) {
                normalized = $mol_promise_like(sub_error) ? sub_error : new $mol_error_mix(sub_error.message, { error }, sub_error);
            }
            if (normalized instanceof Error || $mol_promise_like(normalized)) {
                $mol_fail_hidden(normalized);
            }
            return normalized;
        }
    }
    $.$mol_error_fence = $mol_error_fence;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_sourcemap_strip(data) {
        return data.replace(/^(?:(?:\/\/)|(?:\/\*))\s*#\s*sourceMappingURL\s*=[^\n]*/mg, '') + '\n';
    }
    $.$mol_sourcemap_strip = $mol_sourcemap_strip;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_build_checker extends $mol_object {
        paths() { return this.worker_data().paths ?? []; }
        root() { return this.worker_data().root ?? ''; }
        config_path() { return this.worker_data().config_path; }
        config_json() {
            const path = this.config_path();
            const config_file = path
                ? this.$.$mol_file.absolute(path)
                : this.$.$mol_file.absolute(this.root()).resolve('tsconfig.json');
            const text = config_file.text();
            return JSON.parse(text).compilerOptions;
        }
        _options = null;
        options() {
            if (this._options)
                return this._options;
            const res = $node.typescript.convertCompilerOptionsFromJson(this.config_json(), '.', 'tsconfig.json');
            if (res.errors.length)
                throw res.errors;
            this._options = res.options;
            return res.options;
        }
        rpc() {
            return this.$.$mol_rpc_worker.make({
                handlers: () => this,
            });
        }
        worker_data() { return this.rpc().worker_data(); }
        remote() { return this.rpc().remote(); }
        start() {
            try {
                const watching = this.watching();
                if (watching)
                    this.host();
                this.remote().status(watching ? 'watching' : 'ready');
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                this.$.$mol_fail_log(error);
                process.exit(1);
            }
        }
        run() { }
        versions = {};
        watchers = new Map();
        writes = [];
        errors = [];
        // undefined - disable send schedule, null - schedule on changes, tick - already scheduled
        changes_tick = null;
        checked_at = null;
        changes_cut(op) {
            const writes = this.writes;
            const errors = this.errors;
            this.changes_tick?.destructor();
            this.changes_tick = op === 'watch_off' ? undefined : null;
            if (!errors.length && !writes.length)
                return null;
            this.writes = [];
            this.errors = [];
            const time = this.checked_at?.getTime() ?? 0;
            this.checked_at = null;
            return { writes, errors, time };
        }
        changes_flush() {
            const changes = this.changes_cut();
            if (!changes)
                return;
            $mol_error_fence(() => this.remote().changes(changes), e => ($mol_fail_log(e), null));
        }
        changes_schedule() {
            // ts watcher calls it in host syncronously
            if (this.changes_tick === undefined)
                return;
            if (this.changes_tick !== null)
                return;
            this.checked_at = new Date();
            this.changes_tick = new $mol_after_tick(() => $mol_wire_async(this).changes_flush());
        }
        write_add(path, data) {
            this.writes.push([path, data]);
            this.changes_schedule();
        }
        error_add(filename, error) {
            this.errors.push([filename, error]);
            this.changes_schedule();
        }
        recheck_internal() {
            const paths = this.paths();
            if (!paths.length)
                return null;
            for (const path of paths) {
                const version = $node.fs.statSync(path).mtime.valueOf();
                if (this.versions[path] && this.versions[path] !== version) {
                    const watcher = this.watchers.get(path);
                    if (watcher)
                        watcher(path, 2);
                }
                this.versions[path] = version;
            }
            this.run();
        }
        // Do not place async logic here, to prevent recheck calls race
        recheck() {
            this.changes_cut('watch_off');
            this.watching(true); // enable host pull in start
            this.host(); // wait host started
            this.recheck_internal();
            return this.changes_cut();
        }
        transpile(src) {
            const compilerOptions = this.options();
            const root = this.root();
            const res = $node.typescript.transpileModule(src, { compilerOptions });
            if (res.diagnostics?.length) {
                throw new Error($node.typescript.formatDiagnostic(res.diagnostics[0], {
                    getCurrentDirectory: () => root,
                    getCanonicalFileName: (path) => path.toLowerCase(),
                    getNewLine: () => '\n',
                }));
            }
            const map = JSON.parse(res.sourceMapText);
            const text = this.$.$mol_sourcemap_strip(res.outputText);
            return { map, text };
        }
        watching(next) { return next ?? false; }
        host() {
            const paths = this.paths();
            if (!paths.length)
                return null;
            const options = this.options();
            const root = this.root();
            const host = $node.typescript.createWatchCompilerHost(paths, {
                ...options,
                emitDeclarationOnly: true,
            }, {
                ...$node.typescript.sys,
                watchDirectory: (path, cb) => {
                    // console.log('watchDirectory', path )
                    this.watchers.set(path, cb);
                    return { close() { } };
                },
                writeFile: (path, data) => {
                    this.write_add(path, data);
                },
                setTimeout: (cb) => {
                    this.run = cb;
                },
                watchFile: (path, cb) => {
                    // console.log('watchFile', path )
                    this.watchers.set(path, cb);
                    return { close() { } };
                },
            }, $node.typescript.createEmitAndSemanticDiagnosticsBuilderProgram, (diagnostic) => {
                if (diagnostic.file) {
                    const error = $node.typescript.formatDiagnostic(diagnostic, {
                        getCurrentDirectory: () => root,
                        getCanonicalFileName: (path) => path.toLowerCase(),
                        getNewLine: () => '\n',
                    });
                    const name = diagnostic.file.getSourceFile().fileName;
                    this.error_add(name, error);
                }
                else {
                    const text = diagnostic.messageText;
                    this.$.$mol_log3_fail({
                        place: `${this}.host()`,
                        message: typeof text === 'string' ? text : text.messageText,
                    });
                }
            }, () => { }, //watch reports
            [], // project refs
            {
                synchronousWatchDirectory: true,
                watchFile: 5,
                watchDirectory: 0,
            });
            const service = $node.typescript.createWatchProgram(host);
            return {
                destructor: () => service.close()
            };
        }
    }
    __decorate([
        $mol_mem
    ], $mol_build_checker.prototype, "rpc", null);
    __decorate([
        $mol_action
    ], $mol_build_checker.prototype, "changes_cut", null);
    __decorate([
        $mol_action
    ], $mol_build_checker.prototype, "recheck_internal", null);
    __decorate([
        $mol_mem
    ], $mol_build_checker.prototype, "watching", null);
    __decorate([
        $mol_mem
    ], $mol_build_checker.prototype, "host", null);
    $.$mol_build_checker = $mol_build_checker;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.factory_caches = new WeakMap();
    function contexted(Factory) {
        let cache = $.factory_caches.get(this);
        if (!cache) {
            cache = new WeakMap();
            $.factory_caches.set(this, cache);
        }
        let Contexted = cache.get(Factory);
        if (Contexted)
            return Contexted;
        const t = this;
        Contexted = $mol_func_name_from(class extends Factory {
            static $ = t;
        }, Factory);
        cache.set(Factory, Contexted);
        return Contexted;
    }
    $.$mol_static = contexted;
    Object.defineProperty($, '$mol_static', {
        get() {
            const t = this;
            return new Proxy(contexted, {
                get(self, k) {
                    const val = t[k];
                    if (typeof val !== 'function' || t === $)
                        return val;
                    return contexted.call(t, val);
                },
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_one = {};
    const cache = new WeakMap();
    function singletone(Origin) {
        const Contexted = this.$mol_static(Origin);
        let instance = cache.get(Contexted);
        if (instance)
            return instance;
        instance = new Contexted();
        instance[$mol_ambient_ref] = this;
        cache.set(Contexted, instance);
        return instance;
    }
    Object.defineProperty($, '$mol_one', {
        get() {
            const t = this;
            return new Proxy(singletone, {
                get(self, k) {
                    const val = t[k];
                    if (typeof val !== 'function')
                        return val;
                    return singletone.call(t, val);
                }
            });
        }
    });
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_js_is_number(type) {
        return type.match(/[\+\-]*NaN/) || !Number.isNaN(Number(type));
    }
    $.$mol_tree2_js_is_number = $mol_tree2_js_is_number;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function is_identifier(tree) {
        if (tree.type)
            return false;
        return /^[a-z_$][a-z_$0-9]*$/i.test(tree.text());
    }
    function $mol_tree2_js_to_text(js) {
        function sequence(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    input.struct(separator && input.kids.length > 2 ? 'indent' : 'line', [].concat(...input.kids.map((kid, index) => [
                        kid.struct('line', [
                            ...kid.list([kid]).hack(belt),
                            ...(separator && index < input.kids.length - 1) ? [input.data(separator)] : [],
                        ]),
                    ]))),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function block(open, separator, close) {
            return (input, belt) => [
                ...open ? [input.data(open)] : [],
                ...input.kids.length === 0 ? [] : [input.struct('indent', input.kids.map((kid, index) => kid.struct('line', [
                        ...kid.list([kid]).hack(belt),
                        ...(separator) ? [input.data(separator)] : [],
                    ])))],
                ...close ? [input.data(close)] : [],
            ];
        }
        function duplet(open, separator, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator && input.kids.length > 1) ? [input.data(separator)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        function triplet(open, separator12, separator23, close) {
            return (input, belt) => [
                input.struct('line', [
                    ...open ? [input.data(open)] : [],
                    ...input.list(input.kids.slice(0, 1)).hack(belt),
                    ...(separator12 && input.kids.length > 1) ? [input.data(separator12)] : [],
                    ...input.list(input.kids.slice(1, 2)).hack(belt),
                    ...(separator23 && input.kids.length > 2) ? [input.data(separator23)] : [],
                    ...input.list(input.kids.slice(2, 3)).hack(belt),
                    ...close ? [input.data(close)] : [],
                ]),
            ];
        }
        return js.list(js.hack({
            '+': sequence('+'),
            '-': sequence('-'),
            '!': sequence('!'),
            '~': sequence('~'),
            'return': sequence('return '),
            'break': sequence('break '),
            'continue': sequence('continue '),
            'yield': sequence('yield '),
            'yield*': sequence('yield* '),
            'await': sequence('await '),
            'void': sequence('void '),
            'delete': sequence('delete '),
            'typeof': sequence('typeof '),
            'new': sequence('new '),
            '...': sequence('...'),
            '@++': sequence('', '', '++'),
            '@--': sequence('', '', '--'),
            '(in)': sequence('(', ' in ', ')'),
            '(instanceof)': sequence('(', ' instanceof ', ')'),
            '(+)': sequence('(', ' + ', ')'),
            '(-)': sequence('(', ' - ', ')'),
            '(*)': sequence('(', ' * ', ')'),
            '(/)': sequence('(', ' / ', ')'),
            '(%)': sequence('(', ' % ', ')'),
            '(**)': sequence('(', ' ** ', ')'),
            '(<)': sequence('(', ' < ', ')'),
            '(<=)': sequence('(', ' <= ', ')'),
            '(>)': sequence('(', ' > ', ')'),
            '(>=)': sequence('(', ' >= ', ')'),
            '(==)': sequence('(', ' == ', ')'),
            '(!=)': sequence('(', ' != ', ')'),
            '(===)': sequence('(', ' === ', ')'),
            '(!==)': sequence('(', ' !== ', ')'),
            '(<<)': sequence('(', ' << ', ')'),
            '(>>)': sequence('(', ' >> ', ')'),
            '(>>>)': sequence('(', ' >>> ', ')'),
            '(&)': sequence('(', ' & ', ')'),
            '(|)': sequence('(', ' | ', ')'),
            '(^)': sequence('(', ' ^ ', ')'),
            '(&&)': sequence('(', ' && ', ')'),
            '(||)': sequence('(', ' || ', ')'),
            '(,)': sequence('(', ', ', ')'),
            '{;}': block('{', ';', '}'),
            ';': block('', ';', ''),
            '[,]': sequence('[', ', ', ']'),
            '{,}': sequence('{', ', ', '}'),
            '()': sequence('(', '', ')'),
            '{}': block('{', '', '}'),
            '[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('[', '', ']')(input, belt);
                else
                    return [input.data('.' + first.text())];
            },
            '?.[]': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return sequence('?.[', '', ']')(input, belt);
                else
                    return [input.data('?.' + first.text())];
            },
            ':': (input, belt) => input.kids[0].type
                ? duplet('[', ']: ')(input, belt)
                : duplet('', ': ')(input, belt),
            'let': duplet('let ', ' = '),
            'const': duplet('const ', ' = '),
            'var': duplet('var ', ' = '),
            '=': duplet('', ' = '),
            '+=': duplet('', ' += '),
            '-=': duplet('', ' -= '),
            '*=': duplet('', ' *= '),
            '/=': duplet('', ' /= '),
            '%=': duplet('', ' %= '),
            '**=': duplet('', ' **= '),
            '<<=': duplet('', ' <<= '),
            '>>=': duplet('', ' >>= '),
            '>>>=': duplet('', ' >>>= '),
            '&=': duplet('', ' &= '),
            '|=': duplet('', ' |= '),
            '^=': duplet('', ' ^= '),
            '&&=': duplet('', ' &&= '),
            '||=': duplet('', ' ||= '),
            '=>': duplet('', ' => '),
            'async=>': duplet('async ', ' => '),
            'function': triplet('function '),
            'function*': triplet('function* '),
            'async': triplet('async function '),
            'async*': triplet('async function* '),
            'class': triplet('class ', ' '),
            'extends': sequence('extends ', '', ' '),
            'if': triplet('if', ' ', 'else'),
            '?:': triplet('', ' ? ', ' : '),
            '.': (input, belt) => {
                const first = input.kids[0];
                if (!is_identifier(first))
                    return triplet('[', ']')(input, belt);
                else
                    return [
                        input.data(first.text()),
                        ...input.list(input.kids.slice(1)).hack(belt),
                    ];
            },
            'get': triplet('get [', ']'),
            'set': triplet('set [', ']'),
            'static': triplet('static [', ']'),
            '/./': sequence(),
            '.global': sequence('g'),
            '.multiline': sequence('m'),
            '.ignoreCase': sequence('i'),
            '.source': (input, belt) => [
                input.data('/'),
                input.data(JSON.stringify(input.text()).slice(1, -1)),
                input.data('/'),
            ],
            '``': (input, belt) => {
                return [
                    input.struct('line', [
                        input.data('`'),
                        ...[].concat(...input.kids.map(kid => {
                            if (kid.type) {
                                return [
                                    kid.data('${'),
                                    ...kid.list([kid]).hack(belt),
                                    kid.data('}'),
                                ];
                            }
                            else {
                                return [
                                    input.data(JSON.stringify(kid.text()).slice(1, -1)),
                                ];
                            }
                        })),
                        input.data('`'),
                    ]),
                ];
            },
            '': (input, belt) => {
                // string
                if (!input.type)
                    return [
                        input.data(JSON.stringify(input.text())),
                    ];
                // variable
                if (/^[\w$#][\w0-9$]*$/i.test(input.type))
                    return [
                        input.data(input.type),
                        // ... input.hack( context ),
                    ];
                // number
                if ($mol_tree2_js_is_number(input.type))
                    return [
                        input.data(input.type)
                    ];
                $mol_fail(new SyntaxError(`Wrong node type`));
            },
        }));
    }
    $.$mol_tree2_js_to_text = $mol_tree2_js_to_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_view_tree2_error extends Error {
        spans;
        constructor(message, spans) {
            super(message);
            this.spans = spans;
        }
        toJSON() {
            return {
                message: this.message,
                spans: this.spans
            };
        }
    }
    $.$mol_view_tree2_error = $mol_view_tree2_error;
    class $mol_view_tree2_error_suggestions {
        suggestions;
        constructor(suggestions) {
            this.suggestions = suggestions;
        }
        toString() {
            return this.suggestions.map(suggestion => `\`${suggestion}\``).join(', ');
        }
        toJSON() {
            return this.suggestions;
        }
    }
    $.$mol_view_tree2_error_suggestions = $mol_view_tree2_error_suggestions;
    function $mol_view_tree2_error_str(strings, ...parts) {
        const spans = [];
        for (const part of parts) {
            if (part instanceof $mol_span)
                spans.push(part);
            if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span)
                spans.push(...part);
        }
        return new $mol_view_tree2_error(join(strings, parts), spans);
    }
    $.$mol_view_tree2_error_str = $mol_view_tree2_error_str;
    function join(strings, objects) {
        let result = '';
        let obj_pos = 0;
        let obj_len = objects.length;
        for (const str of strings) {
            result += str;
            if (obj_pos < obj_len) {
                const obj = objects[obj_pos++];
                if (Array.isArray(obj))
                    result += obj.map(item => `\`${item}\``).join(', ');
                else
                    result += `\`${String(obj)}\``;
            }
        }
        return result;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_child(tree) {
        if (tree.kids.length === 0) {
            return this.$mol_fail($mol_view_tree2_error_str `Required one child at ${tree.span}`);
        }
        if (tree.kids.length > 1) {
            return this.$mol_fail($mol_view_tree2_error_str `Should be only one child at ${tree.span}`);
        }
        return tree.kids[0];
    }
    $.$mol_view_tree2_child = $mol_view_tree2_child;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_classes(defs) {
        return defs.clone(defs.hack({
            '-': () => []
        }));
    }
    $.$mol_view_tree2_classes = $mol_view_tree2_classes;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_normalize(defs) {
        return defs.clone($mol_view_tree2_classes(defs).kids.map(cl => cl.clone([
            this.$mol_view_tree2_class_super(cl).clone(this.$mol_view_tree2_class_props(cl))
        ])));
    }
    $.$mol_view_tree2_normalize = $mol_view_tree2_normalize;
})($ || ($ = {}));

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

;
"use strict";
var $;
(function ($) {
    let x = /x/[Symbol.matchAll];
    /** Type safe reguar expression builder */
    class $mol_regexp extends RegExp {
        groups;
        /** Prefer to use $mol_regexp.from */
        constructor(source, flags = 'gsu', groups = []) {
            super(source, flags);
            this.groups = groups;
        }
        *[Symbol.matchAll](str) {
            const index = this.lastIndex;
            this.lastIndex = 0;
            try {
                while (this.lastIndex < str.length) {
                    const found = this.exec(str);
                    if (!found)
                        break;
                    yield found;
                }
            }
            finally {
                this.lastIndex = index;
            }
        }
        /** Parses input and returns found capture groups or null */
        [Symbol.match](str) {
            const res = [...this[Symbol.matchAll](str)].filter(r => r.groups).map(r => r[0]);
            if (!res.length)
                return null;
            return res;
        }
        /** Splits string by regexp edges */
        [Symbol.split](str) {
            const res = [];
            let token_last = null;
            for (let token of this[Symbol.matchAll](str)) {
                if (token.groups && (token_last ? token_last.groups : true))
                    res.push('');
                res.push(token[0]);
                token_last = token;
            }
            if (!res.length)
                res.push('');
            return res;
        }
        test(str) {
            return Boolean(str.match(this));
        }
        exec(str) {
            const from = this.lastIndex;
            if (from >= str.length)
                return null;
            const res = super.exec(str);
            if (res === null) {
                this.lastIndex = str.length;
                if (!str)
                    return null;
                return Object.assign([str.slice(from)], {
                    index: from,
                    input: str,
                });
            }
            if (from === this.lastIndex) {
                $mol_fail(new Error('Captured empty substring'));
            }
            const groups = {};
            const skipped = str.slice(from, this.lastIndex - res[0].length);
            if (skipped) {
                this.lastIndex = this.lastIndex - res[0].length;
                return Object.assign([skipped], {
                    index: from,
                    input: res.input,
                });
            }
            for (let i = 0; i < this.groups.length; ++i) {
                const group = this.groups[i];
                groups[group] = groups[group] || res[i + 1] || '';
            }
            return Object.assign(res, { groups });
        }
        generate(params) {
            return null;
        }
        get native() {
            return new RegExp(this.source, this.flags);
        }
        /** Makes regexp that greedy repeats this pattern with delimiter */
        static separated(chunk, sep) {
            return $mol_regexp.from([
                $mol_regexp.repeat_greedy([[chunk], sep], 0),
                chunk,
            ]);
        }
        /** Makes regexp that non-greedy repeats this pattern from min to max count */
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}?`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that greedy repeats this pattern from min to max count */
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
            const regexp = $mol_regexp.from(source);
            const upper = Number.isFinite(max) ? max : '';
            const str = `(?:${regexp.source}){${min},${upper}}`;
            const regexp2 = new $mol_regexp(str, regexp.flags, regexp.groups);
            regexp2.generate = params => {
                const res = regexp.generate(params);
                if (res)
                    return res;
                if (min > 0)
                    return res;
                return '';
            };
            return regexp2;
        }
        /** Makes regexp that match any of options */
        static vary(sources, flags = 'gsu') {
            const groups = [];
            const chunks = sources.map(source => {
                const regexp = $mol_regexp.from(source);
                groups.push(...regexp.groups);
                return regexp.source;
            });
            return new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
        }
        /** Makes regexp that allow absent of this pattern */
        static optional(source) {
            return $mol_regexp.repeat_greedy(source, 0, 1);
        }
        /** Makes regexp that look ahead for pattern */
        static force_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Makes regexp that look ahead for pattern */
        static forbid_after(source) {
            const regexp = $mol_regexp.from(source);
            return new $mol_regexp(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        /** Converts some js values to regexp */
        static from(source, { ignoreCase, multiline } = {
            ignoreCase: false,
            multiline: false,
        }) {
            let flags = 'gsu';
            if (multiline)
                flags += 'm';
            if (ignoreCase)
                flags += 'i';
            if (typeof source === 'number') {
                const src = `\\u{${source.toString(16)}}`;
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => src;
                return regexp;
            }
            if (typeof source === 'string') {
                const src = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regexp = new $mol_regexp(src, flags);
                regexp.generate = () => source;
                return regexp;
            }
            else if (source instanceof $mol_regexp) {
                const regexp = new $mol_regexp(source.source, flags, source.groups);
                regexp.generate = params => source.generate(params);
                return regexp;
            }
            if (source instanceof RegExp) {
                const test = new RegExp('|' + source.source);
                const groups = Array.from({ length: test.exec('').length - 1 }, (_, i) => String(i + 1));
                const regexp = new $mol_regexp(source.source, source.flags, groups);
                regexp.generate = () => '';
                return regexp;
            }
            if (Array.isArray(source)) {
                const patterns = source.map(src => Array.isArray(src)
                    ? $mol_regexp.optional(src)
                    : $mol_regexp.from(src));
                const chunks = patterns.map(pattern => pattern.source);
                const groups = [];
                let index = 0;
                for (const pattern of patterns) {
                    for (let group of pattern.groups) {
                        if (Number(group) >= 0) {
                            groups.push(String(index++));
                        }
                        else {
                            groups.push(group);
                        }
                    }
                }
                const regexp = new $mol_regexp(chunks.join(''), flags, groups);
                regexp.generate = params => {
                    let res = '';
                    for (const pattern of patterns) {
                        let sub = pattern.generate(params);
                        if (sub === null)
                            return '';
                        res += sub;
                    }
                    return res;
                };
                return regexp;
            }
            else {
                const groups = [];
                const chunks = Object.keys(source).map(name => {
                    groups.push(name);
                    const regexp = $mol_regexp.from(source[name]);
                    groups.push(...regexp.groups);
                    return `(${regexp.source})`;
                });
                const regexp = new $mol_regexp(`(?:${chunks.join('|')})`, flags, groups);
                const validator = new RegExp('^' + regexp.source + '$', flags);
                regexp.generate = (params) => {
                    for (let option in source) {
                        if (option in params) {
                            if (typeof params[option] === 'boolean') {
                                if (!params[option])
                                    continue;
                            }
                            else {
                                const str = String(params[option]);
                                if (str.match(validator))
                                    return str;
                                $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                            }
                        }
                        else {
                            if (typeof source[option] !== 'object')
                                continue;
                        }
                        const res = $mol_regexp.from(source[option]).generate(params);
                        if (res)
                            return res;
                    }
                    return null;
                };
                return regexp;
            }
        }
        /** Makes regexp which includes only unicode category */
        static unicode_only(...category) {
            return new $mol_regexp(`\\p{${category.join('=')}}`);
        }
        /** Makes regexp which excludes unicode category */
        static unicode_except(...category) {
            return new $mol_regexp(`\\P{${category.join('=')}}`);
        }
        static char_range(from, to) {
            return new $mol_regexp(`${$mol_regexp.from(from).source}-${$mol_regexp.from(to).source}`);
        }
        static char_only(...allowed) {
            const regexp = allowed.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[${regexp}]`);
        }
        static char_except(...forbidden) {
            const regexp = forbidden.map(f => $mol_regexp.from(f).source).join('');
            return new $mol_regexp(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp.from(/\d/gsu);
        static decimal_except = $mol_regexp.from(/\D/gsu);
        static latin_only = $mol_regexp.from(/\w/gsu);
        static latin_except = $mol_regexp.from(/\W/gsu);
        static space_only = $mol_regexp.from(/\s/gsu);
        static space_except = $mol_regexp.from(/\S/gsu);
        static word_break_only = $mol_regexp.from(/\b/gsu);
        static word_break_except = $mol_regexp.from(/\B/gsu);
        static tab = $mol_regexp.from(/\t/gsu);
        static slash_back = $mol_regexp.from(/\\/gsu);
        static nul = $mol_regexp.from(/\0/gsu);
        static char_any = $mol_regexp.from(/./gsu);
        static begin = $mol_regexp.from(/^/gsu);
        static end = $mol_regexp.from(/$/gsu);
        static or = $mol_regexp.from(/|/gsu);
        static line_end = $mol_regexp.from({
            win_end: [['\r'], '\n'],
            mac_end: '\r',
        });
    }
    $.$mol_regexp = $mol_regexp;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const { begin, end, latin_only, or, optional, repeat_greedy } = $mol_regexp;
    $.$mol_view_tree2_prop_signature = $mol_regexp.from([
        begin,
        { name: repeat_greedy(latin_only, 1) },
        { key: optional(['*', repeat_greedy(latin_only, 0)]) },
        { next: optional(['?', repeat_greedy(latin_only, 0)]) },
        end,
    ]);
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_prop_parts(prop) {
        const groups = [...prop.type.matchAll($mol_view_tree2_prop_signature)][0]?.groups;
        if (!groups) {
            this.$mol_fail($mol_view_tree2_error_str `Required prop like some*? at ${prop.span}`);
        }
        return {
            name: groups.name,
            key: groups.key,
            next: groups.next ? '?' : ''
        };
    }
    $.$mol_view_tree2_prop_parts = $mol_view_tree2_prop_parts;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const regular_regex = /^\w+$/;
    function $mol_view_tree2_prop_quote(name) {
        if (regular_regex.test(name.value))
            return name;
        return name.data(JSON.stringify(name.value));
    }
    $.$mol_view_tree2_prop_quote = $mol_view_tree2_prop_quote;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const class_regex = /^[$A-Z][$\w<>\[\]()"'?|,]+$/;
    function $mol_view_tree2_class_match(klass) {
        if (!klass?.type)
            return false;
        if (klass.type === 'NaN' || klass.type === 'Infinity')
            return false;
        return class_regex.test(klass.type);
    }
    $.$mol_view_tree2_class_match = $mol_view_tree2_class_match;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function $mol_view_tree2_class_super(klass) {
        if (!$mol_view_tree2_class_match(klass))
            return this.$mol_fail(err `Wrong class name at ${klass.span}`);
        const superclass = klass.kids.length === 1 ? klass.kids[0] : undefined;
        if (!superclass)
            return this.$mol_fail(err `No super class at ${klass.span}`);
        if (!$mol_view_tree2_class_match(superclass))
            return this.$mol_fail(err `Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`);
        return superclass;
    }
    $.$mol_view_tree2_class_super = $mol_view_tree2_class_super;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    const is_writable = (input) => input.type.includes('?');
    function $mol_view_tree2_class_props(klass) {
        let props = this.$mol_view_tree2_class_super(klass);
        // ! syntax to * and ?val syntax to ?
        props = props.clone(props.hack({
            '': (node, belt) => {
                const next = node.type.indexOf('?');
                const id = node.type.indexOf('!');
                let normal = node.type;
                const ch = node.type[id + 1];
                if (id !== -1 && ch?.toUpperCase() !== ch?.toLowerCase())
                    normal = `${normal.substring(0, id)}*${next === -1 ? '' : '?'}`;
                else if (next !== -1)
                    normal = normal.substring(0, next + 1);
                if (node.type === normal)
                    return [node.clone(node.hack(belt))];
                console.warn(`Syntax ${node.type} at ${node.span} is deprecated. Use ${normal} instead`);
                return [node.struct(normal, node.hack(belt))];
            }
        }));
        const props_inner = {};
        const add_inner = (prop) => {
            const { name } = this.$mol_view_tree2_prop_parts(prop);
            const prev = props_inner[name];
            if (prev && prev.kids[0]?.toString() !== prop.kids[0]?.toString()) {
                this.$mol_fail(err `Need an equal default values at ${prev.span} vs ${prop.span}`);
            }
            props_inner[name] = prop;
        };
        const upper = (operator, belt, context) => {
            const prop = this.$mol_view_tree2_child(operator);
            const defs = prop.hack(belt, { factory: prop });
            if (defs.length)
                add_inner(prop.clone(defs));
            return [operator.clone([prop.clone([])])];
        };
        const props_root = props.hack({
            '<=': upper,
            '<=>': upper,
            '^': (operator, belt, context) => {
                if (operator.kids.length === 0)
                    return [operator];
                return upper(operator, belt, context);
            },
            '': (left, belt, context) => {
                let right;
                const operator = left.kids[0];
                if (operator?.type === '=>' && context.factory) {
                    right = operator.kids[0];
                    if (!right)
                        this.$mol_fail(err `Need a child ${operator.span}`);
                    if (!context.factory)
                        this.$mol_fail(err `Need a parent ${left.span}`);
                    if (is_writable(left) !== is_writable(right))
                        this.$mol_fail(err `Left and right operands are not compatible at ${operator.span}`);
                    add_inner(right.clone([
                        right.struct('=', [
                            context.factory.struct(context.factory.type.replace(/\*.*/, '*'), [left.clone([])]),
                        ]),
                    ]));
                }
                else if (operator?.type === "<=>") {
                    const right = operator.kids[0];
                    if (!right)
                        this.$mol_fail(err `Need a child ${operator.span}`);
                    if (!is_writable(left))
                        this.$mol_fail(err `Expected writable at ${left.span}`);
                    if (!is_writable(right))
                        this.$mol_fail(err `Expected writable at ${right.span}`);
                }
                else if (context.factory && operator?.type === "<=" && is_writable(left)) {
                    this.$mol_fail(err `Expected readonly at ${left.span}`);
                }
                if (right)
                    context = { factory: right.clone([]) };
                else if (operator && !context.factory && $mol_view_tree2_class_match(operator)) {
                    context = { factory: left.clone([]) };
                }
                const hacked = left.clone(left.hack(belt, context));
                return [hacked];
            }
        }, { factory: undefined });
        for (const prop of props_root)
            add_inner(prop);
        return Object.values(props_inner);
    }
    $.$mol_view_tree2_class_props = $mol_view_tree2_class_props;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: `http://${process.env.DOMAIN || 'localhost'}/` }).window;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage extends $mol_object2 {
        /** Is storage a long term. */
        static persisted(next) {
            return false;
        }
        /** Total storage quota in bytes. */
        static total() {
            return 0;
        }
        /** Total storage usage in bytes. */
        static used() {
            return 0;
        }
        /** Minimum available free space in bytes. */
        static free() {
            return this.total() - this.used();
        }
        /** Fulfillness of storage. */
        static portion() {
            const total = this.total();
            if (!total)
                return 1;
            return this.used() / total;
        }
        /**
         * Fulfillness logarithmic level.
         * `0` - empty
         * `1` - half free
         * `2` - quart free
         * `Infinity` - fulfilled
         */
        static level() {
            return Math.floor(-Math.log2(1 - this.portion()));
        }
    }
    $.$mol_storage = $mol_storage;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /** State of time moment */
    class $mol_state_time extends $mol_object {
        static task(precision, reset) {
            if (precision) {
                return new $mol_after_timeout(precision, () => this.task(precision, null));
            }
            else {
                return new $mol_after_frame(() => this.task(precision, null));
            }
        }
        static now(precision) {
            this.task(precision);
            return Date.now();
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "task", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_storage_node extends $mol_storage {
        static persisted() {
            return true;
        }
        static stats() {
            $mol_state_time.now(1000);
            return $node.fs.statfsSync('.');
        }
        static total() {
            const { blocks, bsize } = this.stats();
            return blocks * bsize;
        }
        static used() {
            const { blocks, bfree, bsize } = this.stats();
            return (blocks - bfree) * bsize;
        }
        static free() {
            const { bfree, bsize } = this.stats();
            return bfree * bsize;
        }
        static portion() {
            const { blocks, bfree } = this.stats();
            if (!blocks)
                return 1;
            return (blocks - bfree) / blocks;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_storage_node, "stats", null);
    $.$mol_storage_node = $mol_storage_node;
    $.$mol_storage = $.$mol_storage_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local extends $mol_object {
        static 'native()';
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static changes(next) { return next; }
        static value(key, next) {
            this.changes();
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null) {
                this.native().removeItem(key);
            }
            else {
                this.native().setItem(key, JSON.stringify(next));
                this.$.$mol_storage.persisted(true);
            }
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local, "changes", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    $.$mol_dom = $mol_dom_context;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_state_local_node extends $mol_state_local {
        static dir() {
            const base = process.env.XDG_DATA_HOME || ($node.os.homedir() + '/.local/share');
            return $mol_file.absolute(base).resolve('./mol_state_local');
        }
        static value(key, next) {
            const file = this.dir().resolve(encodeURIComponent(key) + '.json');
            if (next === null) {
                file.exists(false);
                return null;
            }
            const arg = next === undefined ? undefined : JSON.stringify(next);
            return JSON.parse(file.text(arg) || 'null');
        }
    }
    __decorate([
        $mol_mem
    ], $mol_state_local_node, "dir", null);
    __decorate([
        $mol_mem_key
    ], $mol_state_local_node, "value", null);
    $.$mol_state_local_node = $mol_state_local_node;
    $.$mol_state_local = $mol_state_local_node;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    /**
     * Localisation in $mol framework
     * @see https://mol.hyoo.ru/#!section=docs/=s5aqnb_odub8l
     */
    class $mol_locale extends $mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return this.$.$mol_state_local.value('locale', next) || $mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static langs_rtl() {
            return ['ar', 'he', 'fa', 'ur', 'yi', 'ps', 'ug', 'sd'];
        }
        static direction() {
            const lang = this.lang();
            try {
                return new Intl.Locale(lang).getTextInfo().direction ?? 'ltr';
            }
            catch (e) {
                $mol_fail_log(e);
                return this.langs_rtl().includes(lang) ? 'rtl' : 'ltr';
            }
        }
        static source(lang) {
            return JSON.parse(this.$.$mol_file.relative(`web.locale=${lang}.json`).text().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    const def = this.lang_default();
                    if (lang === def)
                        throw error;
                }
            }
            return {};
        }
        static text(key) {
            const lang = this.lang();
            const target = this.texts(lang)[key];
            if (target)
                return target;
            this.warn(key);
            const en = this.texts('en')[key];
            if (!en)
                return key;
            return en;
        }
        static warn(key) {
            console.warn(`Not translated to "${this.lang()}": ${key}`);
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $mol_mem
    ], $mol_locale, "direction", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "text", null);
    __decorate([
        $mol_mem_key
    ], $mol_locale, "warn", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_guard_defined(value) {
        return value !== null && value !== undefined;
    }
    $.$mol_guard_defined = $mol_guard_defined;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function name_of(prop) {
        return this.$mol_view_tree2_prop_parts(prop).name;
    }
    function params_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function args_of(prop, bidi = true) {
        const { key, next } = this.$mol_view_tree2_prop_parts(prop);
        return prop.struct('(,)', [
            ...key
                ? key.length > 1
                    ? [prop.data(key.slice(1))]
                    : [prop.struct('id')]
                : [],
            ...(bidi && next) ? [prop.struct('next')] : [],
        ]);
    }
    function call_method_name(child, optional) {
        return child.struct(optional ? '?.[]' : '[]', [
            child.data(name_of.call(this, child))
        ]);
    }
    function call_of(bind, bidi = true) {
        if (bind.kids.length === 0) {
            return this.$mol_fail(err `Required one child at ${bind.span}`);
        }
        const chain = [bind.struct('this')];
        for (const child of bind.kids) {
            chain.push(call_method_name.call(this, child, chain.length > 1), args_of.call(this, child, bidi));
        }
        return bind.struct('()', chain);
    }
    const localized_string = $$.$mol_tree2_from_string(`
		()
			this
			[] \\$
			[] \\$mol_locale
			[] \\text
			(,) #key
	`, 'localized_string');
    function klass_body(acc, prop) {
        const { klass, members, addons } = acc;
        const { name, key, next } = this.$mol_view_tree2_prop_parts(prop);
        const decorate = () => {
            return prop.struct('()', [
                prop.struct(key ? '$mol_mem_key' : '$mol_mem'),
                prop.struct('(,)', [
                    prop.struct('()', [
                        klass.struct('$'),
                        prop.struct('[]', [
                            klass.data(klass.type),
                        ]),
                        prop.struct('[]', [
                            prop.data('prototype'),
                        ]),
                    ]),
                    prop.data(name),
                ]),
            ]);
        };
        const op = prop.kids[0];
        const is_delegate = op?.type === '<=>' || op?.type === '=';
        if (!is_delegate && next)
            addons.push(decorate());
        const val = prop.hack({
            '@': (locale, belt, context) => {
                const chain = context.chain?.join('_');
                return localized_string.hack({
                    '#key': key => [locale.data(`${klass.type}_${name}${chain ? `_${chain}` : ''}`)],
                });
            },
            '<=': bind => [call_of.call(this, bind, false)],
            '<=>': bind => [call_of.call(this, bind, true)],
            '=>': bind => [],
            '^': (ref, belt, context) => [
                ref.struct('...', [
                    // prop ^ foo
                    ref.kids[0]?.type
                        ? ref.struct('()', [
                            ref.struct('this'),
                            ref.struct('[]', [ref.data(name_of.call(this, ref.kids[0]))]),
                            args_of.call(this, ref.kids[0])
                        ])
                        // Having $having foo / ^
                        : context.chain
                            ? ref.struct('()', [
                                ref.struct('this'),
                                ref.struct('[]', [ref.data('$')]),
                                ref.struct('[]', [ref.data(op.type)]),
                                ref.struct('[]', [ref.data('prototype')]),
                                ref.struct('[]', [ref.data(context.chain[0])]),
                                ref.struct('[]', [ref.data('call')]),
                                ref.struct('(,)', [ref.struct('obj')]),
                                ...context.chain.slice(1).map(field => ref.struct('[]', [ref.data(field)]))
                            ])
                            // prop ^
                            : ref.struct('()', [
                                ref.struct('super'),
                                ref.struct('[]', [ref.data(name)]),
                                ref.struct('(,)')
                            ]),
                ]),
            ],
            '=': bind => [bind.struct('()', [
                    bind.struct('this'),
                    ...bind.hack({ '': (method, belt, ctx) => [
                            call_method_name.call(this, method, (ctx.item_index++) > 0),
                            args_of.call(this, method),
                            ...method.hack(belt),
                        ] }, { item_index: 0 }),
                ])],
            '': (input, belt, context) => {
                if (input.type[0] === '*') {
                    return [
                        input.struct('{,}', input.kids.map(field => {
                            if (field.type === '^')
                                return field.list([field]).hack(belt, context)[0];
                            const field_name = (field.type || field.value).replace(/\?\w*$/, '');
                            return field.struct(':', [
                                field.data(field_name),
                                field.kids[0].type === '<=>'
                                    ? field.struct('=>', [
                                        params_of.call(this, field),
                                        ...field.hack(belt),
                                    ])
                                    : field.hack(belt, { ...context, chain: [...context.chain ?? [], field_name] })[0],
                            ]);
                        }).filter(this.$mol_guard_defined))
                    ];
                }
                if (input.type[0] === '/')
                    return [
                        input.struct('[,]', input.hack(belt, context)),
                    ];
                if (input.type && $mol_tree2_js_is_number(input.type))
                    return [
                        input
                    ];
                if ($mol_view_tree2_class_match(input)) {
                    if (!next)
                        addons.push(decorate());
                    const overrides = [];
                    for (const over of input.kids) {
                        if (over.type[0] === '/')
                            continue;
                        const bind = over.kids[0];
                        if (bind.type === '=>')
                            continue;
                        const over_name = name_of.call(this, over);
                        const body = [
                            args_of.call(this, over),
                            over.struct('()', over.hack(belt, { chain: [over.type] })),
                        ];
                        overrides.push(over.struct('=', [
                            over.struct('()', [
                                over.struct('obj'),
                                over.struct('[]', [
                                    over.data(over_name),
                                ]),
                            ]),
                            over.struct('=>', body),
                        ]));
                    }
                    return [
                        input.struct('const', [
                            input.struct('obj'),
                            input.struct('new', [
                                input.struct('this'),
                                input.struct('[]', [
                                    input.data('$'),
                                ]),
                                input.struct('[]', [
                                    input.data(input.type.replace(/<.+>/g, '')),
                                ]),
                                input.struct('(,)', input.select('/', null).hack(belt)),
                            ]),
                        ]),
                        ...overrides,
                        input.struct('obj'),
                    ];
                }
                return [input];
            },
        });
        members.push(prop.struct('.', [
            prop.data(name),
            params_of.call(this, prop),
            prop.struct('{;}', [
                ...next && !is_delegate ? [
                    prop.struct('if', [
                        prop.struct('(!==)', [
                            prop.struct('next'),
                            prop.struct('undefined'),
                        ]),
                        prop.struct('return', [
                            prop.struct('next'),
                        ]),
                    ]),
                ] : [],
                ...val.slice(0, -1),
                prop.struct('return', val.slice(-1)),
            ]),
        ]));
        return acc;
    }
    function $mol_view_tree2_to_js(descr) {
        descr = $mol_view_tree2_classes(descr);
        const definitions = [];
        for (const klass of descr.kids) {
            const parent = klass.kids[0];
            const props = this.$mol_view_tree2_class_props(klass);
            const addons = [];
            const members = [];
            const acc = { klass, addons, members };
            for (const prop of props) {
                try {
                    klass_body.call(this, acc, prop);
                }
                catch (e) {
                    e.message += ` at ${prop.span}`;
                    $mol_fail_hidden(e);
                }
            }
            definitions.push(klass.struct('=', [
                klass.struct('()', [
                    klass.struct('$'),
                    klass.struct('[]', [
                        klass.data(klass.type),
                    ]),
                ]),
                klass.struct('class', [
                    klass.struct(klass.type),
                    parent.struct('extends', [
                        parent.struct('()', [
                            parent.struct('$'),
                            parent.struct('[]', [
                                parent.data(parent.type),
                            ]),
                        ]),
                    ]),
                    klass.struct('{}', members),
                ]),
            ]), ...addons);
        }
        return descr.list([
            descr.struct(';', definitions)
        ]);
    }
    $.$mol_view_tree2_to_js = $mol_view_tree2_to_js;
})($ || ($ = {}));

;
"use strict";

;
"use strict";
var $;
(function ($) {
    const err = $mol_view_tree2_error_str;
    function name_of(prop) {
        const name = prop.type
            ? this.$mol_view_tree2_prop_parts(prop).name
            : prop.value;
        if (!name) {
            this.$mol_fail(err `Required valid prop name at ${prop.span}`);
        }
        return prop.data(name);
    }
    function channel_signature(prop, ...val) {
        const { name, key, next } = this.$mol_view_tree2_prop_parts(prop);
        if (next && !val[0]?.value) {
            this.$mol_fail(err `Type empty for next value at ${prop.span}`);
        }
        return prop.struct('line', [
            prop.data(name),
            prop.data('( '),
            ...key ? [
                prop.data('id'),
                prop.data(': any' + (next ? ', ' : '')),
            ] : [],
            ...next ? [
                prop.data('next'),
                prop.data('?: '),
                ...val,
                prop.data(' '),
            ] : [],
            prop.data(')'),
        ]);
    }
    function return_type(klass, input) {
        return [
            input.data('ReturnType< '),
            klass,
            input.data('[\''),
            name_of.call(this, input),
            input.data('\'] >'),
        ];
    }
    function parameters(klass, input, pick_index) {
        const result = [
            input.data('Parameters< '),
            klass,
            input.data('[\''),
            name_of.call(this, input),
            input.data(`'] >`),
        ];
        if (pick_index !== undefined) {
            result.push(input.data(`[${pick_index}]`));
        }
        return result;
    }
    function primitive_type(input) {
        let type = 'string';
        if (input.type && $mol_tree2_js_is_number(input.type))
            type = 'number';
        if (input.type === 'true' || input.type === 'false')
            type = 'boolean';
        return input.data(type);
    }
    function readonly_arr(input, infered) {
        return [
            input.data('readonly('),
            infered.length === 1 ? infered[0] : input.struct('indent', infered),
            input.data(')[]'),
        ];
    }
    function type_enforce(name, a, b) {
        return name.struct('line', [
            name.data(`type ${name.value.replace(/<.*>/g, '')} = $mol_type_enforce<`),
            name.struct('indent', [
                a[0].struct('line', a),
                a[0].data(','),
                b[0].struct('line', b),
            ]),
            name.data('>'),
        ]);
    }
    function $mol_view_tree2_to_dts(tree) {
        const descr = $mol_view_tree2_classes(tree);
        const types = [];
        for (const klass of descr.kids) {
            let assert_count = 0;
            const parent = this.$mol_view_tree2_child(klass);
            const props = this.$mol_view_tree2_class_props(klass);
            const aliases = [];
            const context = { klass: parent, prop: null };
            const klass_name = klass.type.slice(1);
            types.push(klass.struct('line', [
                klass.data('export class '),
                klass.data(klass.type),
                parent.data(' extends '),
                parent.data(parent.type),
                klass.data(' {'),
            ]), ...props.map(prop => {
                const val = prop.hack({
                    'null': val => {
                        const kid = val.kids[0];
                        return kid?.type
                            ? [kid.data(kid.type), val.data(' | null')]
                            : [val.data('any')];
                    },
                    'true': val => [val.data('boolean')],
                    'false': val => [val.data('boolean')],
                    '@': (locale, belt) => locale.hack(belt),
                    '<=>': (input) => return_type.call(this, klass.data(klass.type), this.$mol_view_tree2_child(input)),
                    '<=': (input) => return_type.call(this, klass.data(klass.type), this.$mol_view_tree2_child(input)),
                    '=>': () => [],
                    '^': (input, belt, context) => {
                        const host = input.kids.length ? klass : context.klass;
                        return return_type.call(this, host.data(host.type), input.kids.length ? input.kids[0] : (context.prop ?? prop));
                    },
                    '=': (input) => {
                        const left = input.kids[0];
                        const right = left.kids[0];
                        const left_parts = this.$mol_view_tree2_prop_parts(left);
                        const right_parts = this.$mol_view_tree2_prop_parts(right);
                        let conflict;
                        // if (left_parts.next && right_parts.next) conflict = 'next'
                        if (left_parts.key && right_parts.key)
                            conflict = 'key';
                        if (conflict) {
                            this.$mol_fail(err `Only one "${conflict}" allowed: ${left_parts[conflict]} at ${left.span} or ${right_parts[conflict]} at ${right.span}`);
                        }
                        const main = klass.data(klass.type);
                        const prop_parts = this.$mol_view_tree2_prop_parts(prop);
                        const method = prop.data(`${klass.type}_${prop_parts.name}`);
                        const second_main = left_parts.key || left_parts.next ? main : left.struct('line', return_type.call(this, main, left));
                        const second_key = left_parts.next || left_parts.key ? left : right;
                        if (prop_parts.key) {
                            types.push(type_enforce.call(this, method.data(`${method.type}__${klass_name}_${++assert_count}`), parameters.call(this, main, prop, 0), parameters.call(this, second_main, second_key, 0)));
                        }
                        if (prop_parts.next) {
                            types.push(type_enforce.call(this, method.data(`${method.type}__${klass_name}_${++assert_count}`), parameters.call(this, main, prop, prop_parts.key ? 1 : 0), parameters.call(this, second_main, second_key, (left_parts.next ? left_parts : right_parts).key ? 1 : 0)));
                        }
                        return return_type.call(this, left.struct('line', return_type.call(this, main, left)), name_of.call(this, right));
                    },
                    '': (input, belt, context) => {
                        if (input.type[0] === '*') {
                            let unions = [];
                            const hacked = [].concat(...input.kids.map(kid => {
                                if (kid.type[0] === '^') {
                                    unions = unions.concat(kid.data(' & '), kid.hack_self(belt, context));
                                    return [];
                                }
                                const child = this.$mol_view_tree2_child(kid);
                                const ret = child.hack_self(belt);
                                return kid.struct('line', kid.type.match(/(?:\*|\?)/)
                                    ? [
                                        channel_signature.call(this, kid, ...ret),
                                        kid.data(': '),
                                        ...ret,
                                        kid.data(','),
                                    ]
                                    : [
                                        kid.data('\''),
                                        kid.data(kid.type || kid.value),
                                        kid.data('\': '),
                                        ...ret,
                                        kid.data(','),
                                    ]);
                            }));
                            if (input.type.length > 1 || !hacked.length) {
                                return [
                                    input.data('Record<string, '),
                                    input.data(input.type.slice(1) || 'any'),
                                    input.data('>'),
                                    ...unions
                                ];
                            }
                            return [
                                input.data('({ '),
                                input.struct('indent', hacked),
                                input.data('}) '),
                                ...unions
                            ];
                        }
                        if (input.type[0] === '/') {
                            const array_type = [
                                input.type.length > 1
                                    ? input.data(input.type.slice(1))
                                    : input.data('any')
                            ];
                            if (array_type[0].value === 'any') {
                                return readonly_arr(input, array_type);
                            }
                            for (const kid of input.kids) {
                                let result = kid.hack_self(belt, context);
                                const val = result[0].value;
                                if (val === 'string') {
                                    result = kid.value.includes('`')
                                        ? [kid.data(JSON.stringify(kid.value))]
                                        : [kid.data('`'), kid, kid.data('`')];
                                }
                                else if (val === 'boolean')
                                    result = [kid.data(kid.type)];
                                else if (kid.type[0] === '^') {
                                    result.push((kid.kids[0] ?? prop).data('[number]'));
                                }
                                else
                                    continue;
                                types.push(type_enforce.call(this, input.data(`${klass.type}_${prop.type.replace(/[\?\*]*/g, '')}__${++assert_count}`), result, array_type));
                            }
                            return readonly_arr(input, array_type);
                        }
                        if ($mol_view_tree2_class_match(input)) {
                            const first = input.kids[0];
                            if (first?.type[0] === '/') {
                                const args = first.kids.map((kid, index) => {
                                    const result = kid.hack_self(belt, context);
                                    if (index !== 0)
                                        result.unshift(kid.data(', '));
                                    return kid.struct('line', result);
                                });
                                types.push(type_enforce.call(this, first.data(`${input.type}__${klass_name}_${++assert_count}`), [
                                    first.data('[ '),
                                    ...args,
                                    first.data(' ]'),
                                ], [
                                    input.data(`ConstructorParameters< typeof `),
                                    input.data(input.type),
                                    input.data(` >`),
                                ]));
                            }
                            else
                                for (const over of input.kids) {
                                    const name = name_of.call(this, over);
                                    const bind = this.$mol_view_tree2_child(over);
                                    if (bind.type === '=>')
                                        continue;
                                    types.push(type_enforce.call(this, over.data(`${input.type}__${name.value}_${klass_name}_${++assert_count}`), over.hack(belt, { ...context, klass: input, prop: over }), return_type.call(this, input.data(input.type), over)));
                                }
                            return [
                                input.data(input.type),
                            ];
                        }
                        return [
                            primitive_type(input)
                        ];
                    },
                }, context);
                return prop.struct('indent', [
                    prop.struct('line', [
                        channel_signature.call(this, prop, ...val), // Parameter, not Return
                        prop.data(': '),
                        ...val,
                    ])
                ]);
            }).filter($mol_guard_defined), ...aliases, klass.data('}'), descr.data(''));
        }
        return descr.list([
            descr.data('declare namespace $ {'),
            descr.data(''),
            descr.struct('indent', types),
            descr.data('}'),
        ]);
    }
    $.$mol_view_tree2_to_dts = $mol_view_tree2_to_dts;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_view_tree2_to_locale(module) {
        const locales = {};
        const descr = $mol_view_tree2_classes(module);
        for (const klass of descr.kids) {
            const props = this.$mol_view_tree2_class_props(klass);
            const acc = { chain: [] };
            for (const prop of props) {
                const { name } = this.$mol_view_tree2_prop_parts(prop);
                prop.hack({
                    '': (input, belt, context) => {
                        if (input.type[0] === '@') {
                            const chain = context.chain?.join('_');
                            const path = `${klass.type}_${name}${chain.length ? `_${chain}` : ''}`;
                            locales[path] = input.kids[0].text();
                        }
                        if (input.type[0] === '*') {
                            for (const field of input.kids) {
                                if (field.type === '^')
                                    continue;
                                const field_name = field.type.replace(/\?\w*$/, '');
                                field.hack(belt, {
                                    ...context,
                                    chain: [
                                        ...context.chain ?? [],
                                        field_name
                                    ]
                                });
                            }
                        }
                        if (/^[$A-Z]/.test(input.type)) {
                            for (const over of input.kids) {
                                if (over.type === '/')
                                    continue;
                                const oname = this.$mol_view_tree2_prop_parts(over).name;
                                over.hack(belt, { ...context, chain: [oname] });
                            }
                        }
                        return [input];
                    }
                }, acc);
            }
        }
        return locales;
    }
    $.$mol_view_tree2_to_locale = $mol_view_tree2_to_locale;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_string(text) {
        let res = '';
        function visit(text, prefix, inline) {
            if (text.type === 'indent') {
                if (inline)
                    res += '\n';
                for (let kid of text.kids) {
                    visit(kid, prefix + '\t', false);
                }
                if (inline)
                    res += prefix;
            }
            else if (text.type === 'line') {
                if (!inline)
                    res += prefix;
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    res += '\n';
            }
            else {
                if (!inline)
                    res += prefix;
                res += text.text();
                if (!inline)
                    res += '\n';
            }
        }
        for (let kid of text.kids) {
            visit(kid, '', false);
        }
        return res;
    }
    $.$mol_tree2_text_to_string = $mol_tree2_text_to_string;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    function $mol_vlq_encode(val) {
        const sign = val < 0 ? 1 : 0;
        if (sign)
            val = -val;
        let index = sign | ((val & 0b1111) << 1);
        val >>>= 4;
        let res = '';
        while (val) {
            index |= 1 << 5;
            res += alphabet[index];
            if (!val)
                break;
            index = val & 0b11111;
            val >>>= 5;
        }
        res += alphabet[index];
        return res;
    }
    $.$mol_vlq_encode = $mol_vlq_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_tree2_text_to_sourcemap(tree) {
        let col = 1;
        let prev_span;
        let prev_index = 0;
        let prev_col = 1;
        let mappings = '';
        let line = [];
        const file_indexes = new Map();
        const file_sources = new Map();
        function span2index(span) {
            if (file_indexes.has(span.uri))
                return file_indexes.get(span.uri);
            const index = file_indexes.size;
            file_indexes.set(span.uri, index);
            file_sources.set(span.uri, span.source);
            return index;
        }
        function next_line() {
            if (!line.length)
                return;
            mappings += line.join(',') + ';';
            line = [];
            col = 1;
            prev_col = 1;
        }
        function visit(text, prefix, inline) {
            function indent() {
                col += prefix;
            }
            if (inline && text.type === 'indent')
                next_line();
            if (prev_span !== text.span || col === 1) {
                const index = span2index(text.span);
                line.push($mol_vlq_encode(col - prev_col) +
                    $mol_vlq_encode(index - prev_index) +
                    $mol_vlq_encode(text.span.row - (prev_span?.row ?? 1)) +
                    $mol_vlq_encode(text.span.col - (prev_span?.col ?? 1)));
                prev_col = col;
                prev_span = text.span;
                prev_index = index;
            }
            if (text.type === 'indent') {
                for (let kid of text.kids) {
                    visit(kid, prefix + 1, false);
                }
                if (inline)
                    next_line();
            }
            else if (text.type === 'line') {
                if (!inline)
                    indent();
                for (let kid of text.kids) {
                    visit(kid, prefix, true);
                }
                if (!inline)
                    next_line();
            }
            else {
                if (!inline)
                    indent();
                col += text.text().length;
                if (!inline)
                    next_line();
            }
        }
        for (let kid of tree.kids) {
            visit(kid, 0, false);
        }
        next_line();
        const map = {
            version: 3,
            sources: [...file_sources.keys()],
            sourcesContent: [...file_sources.values()],
            mappings,
        };
        return map;
    }
    $.$mol_tree2_text_to_sourcemap = $mol_tree2_text_to_sourcemap;
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
    function $mol_sourcemap_url(uri, type = 'js') {
        if (type === 'css')
            return `\n/*# sourceMappingURL=${uri}*/`;
        return `\n//# sourceMappingURL=${uri}`;
    }
    $.$mol_sourcemap_url = $mol_sourcemap_url;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const prefix = '# sourceMappingURL=data:application/json,';
    const end_comment = ' */';
    function $mol_sourcemap_dataurl_decode(data) {
        const index = data.lastIndexOf(prefix);
        if (index === -1)
            return undefined;
        data = data.substring(index + prefix.length);
        if (data.endsWith(end_comment))
            data = data.substring(0, data.length - end_comment.length);
        const decoded = this.decodeURIComponent(data);
        try {
            const map = JSON.parse(decoded);
            if (!map)
                return undefined;
            if (typeof map.mappings === 'string' && map.mappings.startsWith(';;')) {
                map.mappings = map.mappings.substring(2);
            }
            return map;
        }
        catch (e) {
            if (e instanceof Error)
                e.message += ', origin=' + decoded;
            $mol_fail_hidden(e);
        }
    }
    $.$mol_sourcemap_dataurl_decode = $mol_sourcemap_dataurl_decode;
    function $mol_sourcemap_dataurl_encode(map, type = 'js') {
        const str = JSON.stringify({ ...map, mappings: ';;' + map.mappings });
        return this.$mol_sourcemap_url('data:application/json,' + this.encodeURIComponent(str), type);
    }
    $.$mol_sourcemap_dataurl_encode = $mol_sourcemap_dataurl_encode;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    function $mol_sourcemap_from_file(src) {
        const text = src.text();
        let map = this.$mol_sourcemap_dataurl_decode(text);
        if (map)
            return map;
        const map_file = src.parent().resolve(src.name() + '.map');
        if (map_file.exists())
            map = JSON.parse(map_file.text());
        return map;
    }
    $.$mol_sourcemap_from_file = $mol_sourcemap_from_file;
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
    function $mol_base64_encode_node(str) {
        if (!str)
            return '';
        const buf = Buffer.isBuffer(str) ? str : Buffer.from(str);
        return buf.toString('base64');
    }
    $.$mol_base64_encode_node = $mol_base64_encode_node;
    if (!('toBase64' in Uint8Array.prototype)) {
        $.$mol_base64_encode = $mol_base64_encode_node;
    }
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_build_ensure extends $mol_object {
        root() { return $mol_file.absolute(''); }
        interactive() { return process.stdout.isTTY; }
        pull_timeout() { return 120000; }
        meta(path) {
            let decls = [];
            const pack = this.$.$mol_file.absolute(path);
            for (const file of pack.sub()) {
                if (!/\.meta\.tree$/.test(file.name()))
                    continue;
                decls = decls.concat(this.$.$mol_tree2_from_string(file.text(), file.path()).kids);
            }
            return decls.length ? this.$.$mol_tree2.list(decls, decls[0]?.span) : null;
        }
        ensurer_git() {
            return this.$.$mol_build_ensure_git.make({
                root: () => this.root(),
                meta: path => this.meta(path),
                pull_timeout: () => this.pull_timeout(),
                interactive: () => this.interactive(),
            });
        }
        ensurer_fallback() {
            return this.$.$mol_build_ensure_npm.make({
                root: () => this.root(),
            });
        }
        ensurers() {
            return [
                this.ensurer_git()
            ];
        }
        ensure(path) {
            const mod = $mol_file.absolute(path);
            const parent = mod.parent();
            if (mod !== this.root())
                this.ensure(parent.path());
            if (mod.exists() && mod.type() !== 'dir')
                return false;
            for (const ensurer of this.ensurers()) {
                if (ensurer?.ensure(path))
                    return true;
            }
            if (mod.exists())
                return false;
            if (parent === this.root()) {
                throw new Error(`Root package "${mod.relate(this.root())}" not found`);
            }
            return this.ensurer_fallback().ensure(path);
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure.prototype, "meta", null);
    __decorate([
        $mol_mem
    ], $mol_build_ensure.prototype, "ensurer_git", null);
    __decorate([
        $mol_mem
    ], $mol_build_ensure.prototype, "ensurer_fallback", null);
    __decorate([
        $mol_mem
    ], $mol_build_ensure.prototype, "ensurers", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure.prototype, "ensure", null);
    $.$mol_build_ensure = $mol_build_ensure;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_build_graph extends $mol_object {
        root() { return $mol_file.absolute(''); }
        mod_ensure(path) {
            return false;
        }
        dependencies(path) {
            return {};
        }
        path() { return ''; }
        added = new Set();
        graph(reset) {
            this.added.clear();
            return new $mol_graph();
        }
        path_added(path) { return this.added.has(path); }
        // @ $mol_mem_key
        add_module(path) {
            this.added.add(path);
            const mod = this.$.$mol_file.absolute(path);
            const graph = this.graph();
            graph.nodes.add(mod.relate(this.root()));
            const deps = this.dependencies(path);
            for (let target in deps) {
                this.check_dep([path, target]);
            }
            return graph;
        }
        path_resolved(target) {
            const isFile = /\.\w+$/.test(target);
            const root = this.root();
            if (target[0] === '/' && isFile)
                return root.resolve(target);
            if (target[0] === '/') {
                const last_segment = target.slice(target.lastIndexOf('/') + 1);
                return root.resolve(target + '/' + last_segment);
            }
            return root.resolve('node_modules').resolve('./' + target);
        }
        // @ $mol_mem_key
        check_dep([path, target]) {
            const root = this.root();
            const deps = this.dependencies(path);
            const mod = this.$.$mol_file.absolute(path);
            let dep = target[0] === '.' ? mod.resolve(target) : this.path_resolved(target);
            try {
                this.mod_ensure(dep.path());
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    error.message += `\nDependency "${target}" -> "${dep.relate(root)}" from "${mod.relate(root)}" `;
                }
                $mol_fail_hidden(error);
            }
            while (!dep.exists())
                dep = dep.parent();
            if (dep.type() === 'dir' && dep.name() !== 'index') {
                let index = dep.resolve('index.js');
                if (index.exists())
                    dep = index;
            }
            //if( dep.type() === 'file' ) dep = dep.parent()
            if (mod === dep)
                return null;
            const from = mod.relate(root);
            const to = dep.relate(root);
            const graph = this.graph();
            const edge = graph.edges_out.get(from)?.get(to);
            if (!edge || (deps[target] > edge.priority)) {
                graph.link(from, to, { priority: deps[target] });
            }
            if (this.path_added(dep.path()))
                return null;
            this.add_module(dep.path());
            return null;
        }
        out() {
            this.graph(null);
            const path = this.path();
            this.mod_ensure(path);
            const graph = this.add_module(path);
            graph.acyclic(edge => edge.priority);
            this.added.clear();
            return graph;
        }
        get sorted() { return this.out().sorted; }
        get nodes() { return this.out().nodes; }
        get edges_out() { return this.out().edges_out; }
        get edges_in() { return this.out().edges_in; }
    }
    __decorate([
        $mol_mem
    ], $mol_build_graph.prototype, "graph", null);
    __decorate([
        $mol_action
    ], $mol_build_graph.prototype, "path_added", null);
    __decorate([
        $mol_mem
    ], $mol_build_graph.prototype, "out", null);
    $.$mol_build_graph = $mol_build_graph;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const sourcemap_codec = $node['sourcemap-codec'];
    const path = $node.path;
    class $mol_sourcemap_builder {
        separator;
        file;
        version = 3;
        sourceRoot;
        separator_count;
        constructor(dir, separator = '', file) {
            this.separator = separator;
            this.file = file;
            this.sourceRoot = dir && dir !== '.' ? (dir + '/') : '';
            this.separator += '\n';
            this.separator_count = separator.split('\n').length - 2;
        }
        chunks = [];
        segment_lines = [];
        sources = [];
        source_indexes = new Map();
        names = [];
        name_indexes = new Map();
        sourceContent = [];
        get content() {
            return this.chunks.join('');
        }
        get sourcemap() {
            return {
                version: this.version,
                sources: this.sources,
                names: this.names,
                // sourceRoot: this.sourceRoot || undefined,
                mappings: sourcemap_codec.encode(this.segment_lines),
                file: this.file,
                sourcesContent: this.sourceContent,
            };
        }
        toJSON() {
            return this.sourcemap;
        }
        toString() {
            return JSON.stringify(this.toJSON());
        }
        add_chunk(content) {
            const { segment_lines, chunks, separator_count } = this;
            if (chunks.length !== 0) {
                chunks.push(this.separator);
                for (let i = 0; i < separator_count; i++)
                    segment_lines.push([]);
            }
            chunks.push(content);
        }
        add_content(content, file) {
            const { source_indexes, sources, segment_lines } = this;
            this.add_chunk(content);
            let sourceIndex;
            if (file) {
                sourceIndex = source_indexes.get(file);
                if (sourceIndex === undefined) {
                    sourceIndex = sources.length;
                    sources.push(file);
                    source_indexes.set(file, sourceIndex);
                    this.sourceContent.push(null);
                }
            }
            const linesCount = content.split('\n').length;
            for (let originalLine = 0; originalLine < linesCount; originalLine++) {
                if (!file)
                    segment_lines.push([]);
                else
                    segment_lines.push([
                        [
                            0,
                            sourceIndex,
                            originalLine,
                            0,
                        ]
                    ]);
            }
        }
        add(content, file, raw) {
            const { name_indexes, names, source_indexes, sources, segment_lines } = this;
            const bundleSourceRoot = this.sourceRoot;
            if (!content)
                throw new Error(`No content: ${file}, ${raw}`);
            if (typeof raw === 'string')
                raw = JSON.parse(raw);
            if (!raw || !raw.mappings || raw.mappings.length === 0) {
                this.add_content(content, file);
                return;
            }
            this.add_chunk(content);
            let sourceRoot = file ? path.dirname(file) : (raw.sourceRoot || '');
            if (sourceRoot === '.')
                sourceRoot = '';
            else if (sourceRoot)
                sourceRoot += '/';
            const lines = typeof raw.mappings === 'string' ? sourcemap_codec.decode(raw.mappings) : raw.mappings;
            for (let line of lines) {
                const mergedLine = [];
                for (let segment of line) {
                    const mergedSegment = [segment[0]]; // generatedColumn
                    if (segment.length >= 2) {
                        const sourceIndex = segment[1];
                        const source = bundleSourceRoot + sourceRoot + raw.sources[sourceIndex];
                        let mergedSourceIndex = source_indexes.get(source);
                        if (mergedSourceIndex === undefined) {
                            mergedSourceIndex = sources.length;
                            source_indexes.set(source, mergedSourceIndex);
                            sources.push(source);
                            if (raw.sourcesContent)
                                this.sourceContent.push(raw.sourcesContent[sourceIndex]);
                        }
                        mergedSegment.push(mergedSourceIndex);
                    }
                    if (segment.length >= 3)
                        mergedSegment.push(segment[2]); // originalLine
                    if (segment.length >= 4)
                        mergedSegment.push(segment[3]); // originalColumn
                    if (segment.length >= 5) {
                        const nameIndex = segment[4];
                        const name = raw.names?.[nameIndex];
                        if (name !== undefined) {
                            let mergedNameIndex = name_indexes.get(name);
                            if (mergedNameIndex === undefined) {
                                mergedNameIndex = names.length;
                                name_indexes.set(name, mergedNameIndex);
                                names.push(name);
                            }
                            mergedSegment.push(mergedNameIndex);
                        }
                    }
                    mergedLine.push(mergedSegment);
                }
                segment_lines.push(mergedLine);
            }
            const lineCount = content.split('\n').length;
            for (let i = lines.length; i < lineCount; i++)
                segment_lines.push([]);
        }
    }
    $.$mol_sourcemap_builder = $mol_sourcemap_builder;
})($ || ($ = {}));

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
var $;
(function ($) {
    function attrs_belt(separator) {
        return {
            '': (input) => [
                input.data(' '),
                input.data($mol_html_encode(input.type)),
                ...input.value ? [
                    input.data('"'),
                    input.data($mol_html_encode(input.value)),
                    input.data('"'),
                ] : [],
                ...input.hack({
                    '': (input) => {
                        if (!input.type)
                            return [
                                input.data(separator),
                                input.data('"'),
                                input.data($mol_html_encode(input.text())),
                                input.data('"'),
                            ];
                        $mol_fail(new SyntaxError('Wrong attribute value'));
                    },
                }),
            ],
        };
    }
    function $mol_tree2_xml_to_text(xml) {
        return xml.list(xml.hack({
            '@': (input, belt) => [],
            '--': (input, belt) => [
                xml.struct('line', [
                    input.data('<!-- '),
                    ...input.hack(belt),
                    input.data(' -->'),
                ]),
            ],
            '?': (input, belt) => [
                xml.struct('line', [
                    input.data('<?'),
                    input.kids[0].data(input.kids[0].type),
                    ...input.kids[0].hack(attrs_belt('=')),
                    input.data('?>'),
                ]),
            ],
            '!': (input, belt) => [
                xml.struct('line', [
                    input.data('<!'),
                    input.kids[0].data(input.kids[0].type),
                    ...input.kids[0].hack(attrs_belt(' ')),
                    input.data('>'),
                ]),
            ],
            '': (input, belt) => {
                if (!input.type)
                    return [
                        input.data($mol_html_encode(input.text())),
                    ];
                const attrs = input.select('@', null).hack(attrs_belt('='));
                const content = input.hack(belt);
                return [
                    input.struct('line', [
                        input.data(`<`),
                        input.data(input.type),
                        ...attrs,
                        ...content.length ? [
                            input.data(`>`),
                            input.struct('indent', content),
                            input.data(`</`),
                            input.data(input.type),
                            input.data(`>`),
                        ] : [
                            input.data(` />`),
                        ]
                    ]),
                ];
            },
        }));
    }
    $.$mol_tree2_xml_to_text = $mol_tree2_xml_to_text;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_build_ensure_vcs extends $mol_object {
        root() { return $mol_file.absolute(''); }
        interactive() { return process.stdout.isTTY; }
        pull_timeout() { return 120000; }
        root_repo() { return null; }
        vcs_type() { return null; }
        inited(path) { return false; }
        init_existing(path) { return null; }
        update(path) { return false; }
        init(path) { return null; }
        meta(path) {
            return null;
        }
        repo(path) {
            const vcs_type = this.vcs_type();
            if (!vcs_type)
                return null;
            const mod = $mol_file.absolute(path);
            const root_url = this.root_repo();
            if (mod === this.root())
                return !root_url ? null : { url: root_url, branch: null };
            const parent = mod.parent();
            const mapping = this.meta(parent.path());
            const url_branch = mapping?.select('pack', mod.name(), vcs_type).kids
                .find($mol_guard_defined)?.kids[0];
            const url = url_branch?.value ?? null;
            const branch = url_branch?.kids[0]?.value ?? null;
            return url ? { url, branch } : null;
        }
        update_disabled = false;
        update_safe(dir) {
            if (this.update_disabled)
                return false;
            try {
                return this.$.$mol_file.unwatched(() => this.update(dir), dir);
            }
            catch (e) {
                if (e instanceof $mol_run_error && e.cause.timeout_kill) {
                    this.$.$mol_log3_warn({
                        place: `${this}.update_safe()`,
                        message: `Timeout - pull disabled`,
                        hint: 'Check connection',
                    });
                    this.update_disabled = true;
                    return true;
                }
                if (e instanceof Error) {
                    this.$.$mol_fail_log(e);
                    return false;
                }
                $mol_fail_hidden(e);
            }
        }
        pull_disabled() {
            return Boolean(this.$.$mol_env()['MAM_PULL_DISABLED']);
        }
        ensure(path) {
            const mod = $mol_file.absolute(path);
            if (mod.exists()) {
                if (this.pull_disabled())
                    return false;
                if (!this.inited(path)) {
                    if (!this.repo(path))
                        return false;
                    this.$.$mol_file.unwatched(() => this.init_existing(path), path);
                    return true;
                }
                this.update_safe(path);
                // mod.reset()
                // for ( const sub of mod.sub() ) sub.reset()
                return true;
            }
            if (this.repo(path)) {
                this.$.$mol_file.unwatched(() => this.init(path), path);
                // mod.reset()
                // for ( const sub of mod.sub() ) sub.reset()
                return true;
            }
            return false;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure_vcs.prototype, "meta", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure_vcs.prototype, "repo", null);
    __decorate([
        $mol_action
    ], $mol_build_ensure_vcs.prototype, "update_safe", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure_vcs.prototype, "ensure", null);
    $.$mol_build_ensure_vcs = $mol_build_ensure_vcs;
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
    class $mol_build_ensure_git extends $mol_build_ensure_vcs {
        vcs_type() { return 'git'; }
        root_repo() { return 'https://github.com/hyoo-ru/mam.git'; }
        version() {
            $mol_wire_solid();
            return this.$.$mol_run.spawn({ command: 'git version', dir: this.root().path() })
                .stdout.toString().trim().match(/.*\s+([\d\.]+\d+)/)?.[1] ?? '';
        }
        deepen_supported() {
            return $mol_compare_text()(this.version(), '2.42.0') >= 0;
        }
        update(dir) {
            if (this.submodules().has(dir)) {
                this.$.$mol_log3_rise({
                    place: '$mol_build_ensure_git.update()',
                    message: 'Submodule detected, no git pull',
                    dir,
                });
                return false;
            }
            const out = this.$.$mol_run.spawn({
                command: 'git rev-parse --abbrev-ref --symbolic-full-name HEAD', dir,
            });
            const current_branch = out.stdout.toString().trim();
            // когда не на ветке - не надо пулить, например сборка во время git bisect
            if (!current_branch)
                return false;
            const command = ['git', 'pull'];
            if (!this.interactive() && this.deepen_supported()) {
                /**
                depth и deepen не годятся для локальной разработки, поэтому оставляем ограничение глубины пула только для CI

                --depth=1 в сочетании с сабмодулями обрезает историю, кроме первого коммита

                --deepen=1 если не сделать unset GIT_DIR
                в git-конфиге сабмодуля выставляет bare=true, после этого все команды падают с сообщением
                warning: core.bare and core.worktree do not make sense
                fatal: unable to set up work tree using invalid config
                 */
                command.push('--deepen=1');
            }
            const timeout = this.pull_timeout();
            this.$.$mol_run.spawn({ command, dir, timeout }).stdout.toString().trim();
            return true;
        }
        is_git(path) {
            const mod = this.$.$mol_file.absolute(path);
            const git_dir = mod.resolve('.git');
            return git_dir.exists() && git_dir.type() === 'dir';
        }
        submodule_dirs(opts) {
            const dir = this.$.$mol_file.absolute(opts.dir);
            try {
                const output = this.$.$mol_run.spawn({
                    command: ['git', 'submodule', 'status', ...(opts.recursive ? ['--recursive'] : [])],
                    dir: dir.path(),
                }).stdout.toString().trim();
                const dirs = output
                    .split('\n')
                    .map(str => str.match(/^\s*[^ ]+\s+([^ ]*).*/)?.[1]?.trim())
                    .filter($mol_guard_defined)
                    .map(subdir => dir.resolve(subdir));
                return dirs;
            }
            catch (e) {
                if ($mol_promise_like(e))
                    $mol_fail_hidden(e);
                this.$.$mol_fail_log(e);
                return [];
            }
        }
        root_is_submodule() {
            const root = this.root();
            if (this.is_git(root.path()))
                return false;
            const parent = root.parent();
            try {
                const dirs = this.submodule_dirs({ dir: parent.path() });
                return dirs.includes(root);
            }
            catch (e) {
                if ($mol_promise_like(e))
                    $mol_fail_hidden(e);
                this.$.$mol_fail_log(e);
                return false;
            }
        }
        submodules() {
            const root = this.root();
            if (!this.is_git(root.path()))
                return new Set();
            const dirs = this.submodule_dirs({ dir: root.path(), recursive: true });
            if (this.root_is_submodule())
                dirs.push(root);
            return new Set(dirs.map(mod => mod.path()));
        }
        inited(path) {
            return this.is_git(path) || this.submodules().has(path);
        }
        repo_ensured(dir) {
            const repo = this.repo(dir);
            if (!repo)
                throw new Error(`"${dir}" not a repo`);
            return repo;
        }
        branch_remote(dir) {
            const repo = this.repo_ensured(dir);
            const res = this.$.$mol_run.spawn({ command: ['git', 'remote', 'show', repo.url], dir });
            return res.stdout.toString().match(/HEAD branch: (.*?)\n/)?.[1] ?? 'master';
        }
        init_existing(dir) {
            // Например, если вручную склонить ревизию папки в глубине (например, hyoo/mol) перед запуском билда,
            // то hyoo надо проинициалзировать в соответствии с meta.ree
            const repo = this.repo_ensured(dir);
            const { url, branch } = repo;
            this.$.$mol_run.spawn({ command: ['git', 'init'], dir });
            const branch_norm = branch ?? this.branch_remote(dir);
            this.$.$mol_run.spawn({ command: ['git', 'remote', 'add', '--track', branch_norm, 'origin', url], dir });
            this.$.$mol_run.spawn({ command: ['git', 'pull', 'origin', branch_norm], dir });
            return null;
        }
        init(path) {
            const mod = this.$.$mol_file.absolute(path);
            const repo = this.repo_ensured(path);
            const command = [
                'git', 'clone', '--depth', '1',
                ...(repo.branch ? ['-b', repo.branch] : []),
                ' --single-branch',
                repo.url,
                mod.relate(this.root())
            ];
            const dir = this.root().path();
            this.$.$mol_run.spawn({ command, dir });
            return null;
        }
    }
    __decorate([
        $mol_mem
    ], $mol_build_ensure_git.prototype, "version", null);
    __decorate([
        $mol_action
    ], $mol_build_ensure_git.prototype, "submodule_dirs", null);
    __decorate([
        $mol_mem
    ], $mol_build_ensure_git.prototype, "root_is_submodule", null);
    __decorate([
        $mol_mem
    ], $mol_build_ensure_git.prototype, "submodules", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure_git.prototype, "branch_remote", null);
    $.$mol_build_ensure_git = $mol_build_ensure_git;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_build_ensure_npm extends $mol_object {
        root() { return $mol_file.absolute(''); }
        ensure(path) {
            const mod = this.$.$mol_file.absolute(path);
            const parent = mod.parent();
            const node = this.root().resolve('node');
            const node_modules = this.root().resolve('node_modules');
            if ([node, node_modules].includes(parent)
                && mod.name() !== 'node'
                && !mod.name().startsWith('@')) {
                this.$.$node_autoinstall(mod.name()); // force autoinstall through npm
                return true;
            }
            if ([node, node_modules].includes(parent.parent())
                && parent.name().startsWith('@')) {
                this.$.$node_autoinstall(`${parent.name()}/${mod.name()}`); // force autoinstall through npm
                return true;
            }
            return false;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_build_ensure_npm.prototype, "ensure", null);
    $.$mol_build_ensure_npm = $mol_build_ensure_npm;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    if ($mol_rpc_worker.is_main()) {
        setTimeout(() => $mol_wire_async($mol_build).start(process.argv.slice(2)));
    }
    else {
        new $mol_wire_atom('$mol_build_checker', () => $.$mol_one.$mol_build_checker.start()).fresh();
    }
    class $mol_build extends $mol_object {
        static root([root, paths]) {
            this.$.$mol_file.base = root;
            return this.make({
                root: () => this.$.$mol_file.absolute(root),
                paths: $mol_const(paths)
            });
        }
        static relative(root, paths) {
            return this.$.$mol_build.root([$mol_file.relative(root).path(), paths]);
        }
        checker_changes_add({ writes, errors }) {
            for (const [path, data] of writes) {
                this.$.$mol_file.relative(path).text(data, 'virt');
            }
            for (const [filename, error] of errors) {
                this.js_error(filename, error);
            }
        }
        checker_global() {
            const handlers = {
                changes: changes => this.checker_changes_add(changes),
                status: () => { },
            };
            return this.$.$mol_rpc_worker.make({
                options: $mol_const({
                    resourceLimits: {
                        maxOldGenerationSizeMb: this.checker_max_mem(),
                    },
                    workerData: {
                        root: this.root().path(),
                    }
                }),
                uri: () => __filename,
                handlers: () => handlers,
            });
        }
        checker_rpc({ path, exclude, bundle }) {
            const paths = this.tsPaths({ path, exclude, bundle });
            if (!paths.length)
                return null;
            const handlers = {
                changes: changes => this.checker_changes_add(changes),
                status: () => { },
            };
            return this.$.$mol_rpc_worker.make({
                options: $mol_const({
                    resourceLimits: {
                        maxOldGenerationSizeMb: this.checker_max_mem(),
                    },
                    workerData: {
                        paths,
                        root: this.root().path(),
                    }
                }),
                uri: () => __filename,
                handlers: () => handlers,
            });
        }
        checker_max_mem() {
            return Number(this.$.$mol_env().MOL_BUILD_CHECKER_MAX_MEM || '2560');
        }
        checker(params) {
            const checker = this.checker_rpc(params);
            return checker?.remote() ?? null;
        }
        server() {
            return this.$.$mol_build_server.make({
                build: $mol_const(this),
            });
        }
        root() {
            return this.$.$mol_file.relative('.');
        }
        paths() {
            return [];
        }
        static start(paths) {
            const build = this.$.$mol_build.relative('.', paths);
            if (paths.length > 0) {
                try {
                    for (const path_raw of paths) {
                        const path = build.root().resolve(path_raw).path();
                        build.bundleAll(path);
                    }
                    process.exit(0);
                }
                catch (error) {
                    if ($mol_promise_like(error))
                        $mol_fail_hidden(error);
                    this.$.$mol_log3_fail({
                        place: '$mol_build_start',
                        message: error.message,
                        trace: error.stack,
                    });
                    process.exit(135);
                }
            }
            else {
                Promise.resolve().then(() => {
                    try {
                        build.server().start();
                    }
                    catch (error) {
                        $mol_fail_log(error);
                    }
                });
            }
        }
        metaTreeTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const tree = this.$.$mol_tree2_from_string(file.text(), file.path());
            const dir = file.parent().path();
            let content = '';
            for (const step of tree.select('build', null).kids) {
                const res = this.$.$mol_file.unwatched(() => this.$.$mol_run.spawn({ command: step.text(), dir }), dir)
                    .stdout.toString().trim();
                if (step.type)
                    content += `namespace $ { export let ${step.type} = ${JSON.stringify(res)} }`;
            }
            if (!content)
                return [];
            const script = file.parent().resolve(`-meta.tree/${name}.ts`);
            script.text(content);
            return [script];
        }
        view_tree_text(path) {
            const source = $mol_file.absolute(path);
            const tree = this.$.$mol_tree2_from_string(source.text(), source.relate(this.root()));
            const js = this.$.$mol_tree2_js_to_text(this.$.$mol_view_tree2_to_js(tree));
            const dts = this.$.$mol_view_tree2_to_dts(tree);
            const locale = JSON.stringify(this.$.$mol_view_tree2_to_locale(tree), null, '\t');
            return { js, dts, locale };
        }
        viewTreeTranspile(path) {
            const source = $mol_file.absolute(path);
            const text = this.view_tree_text(path);
            const target = source.parent().resolve(`-view.tree`);
            const js = target.resolve(source.name() + '.js');
            const js_map = target.resolve(js.name() + '.map');
            const dts = target.resolve(source.name() + '.d.ts');
            const dts_map = target.resolve(dts.name() + '.map');
            js.text(this.$.$mol_tree2_text_to_string(text.js) + '\n//# sourceMappingURL=' + js_map.relate(target));
            js_map.text(JSON.stringify(this.$.$mol_tree2_text_to_sourcemap(text.js), null, '\t'));
            dts.text(this.$.$mol_tree2_text_to_string(text.dts) + '\n//# sourceMappingURL=' + dts_map.relate(target));
            const dts_map_raw = this.$.$mol_tree2_text_to_sourcemap(text.dts);
            delete dts_map_raw.sourcesContent;
            dts_map_raw.file = dts.relate(target);
            dts_map_raw.sourceRoot = this.root().relate(target);
            dts_map.text(JSON.stringify(dts_map_raw, null, '\t'));
            const locale_file = target.resolve(source.name() + `.locale=en.json`);
            locale_file.text(text.locale);
            return [js, js_map, dts, dts_map, locale_file];
        }
        cssTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const script = file.parent().resolve(`-css/${name}.ts`);
            const id = file.relate(this.root());
            const styles = file.text();
            const code = 'namespace $ { $' + `mol_style_attach( ${JSON.stringify(id)},\n ${JSON.stringify(styles)}\n) }`;
            script.text(code);
            return [script];
        }
        glslTranspile(path) {
            const file = $mol_file.absolute(path);
            const name = file.name();
            const type = name.match(/\.(vert|frag)\./)?.[1] ?? 'both';
            const script = file.parent().resolve(`-glsl/${name}.ts`);
            const styles = file.text();
            const code = `namespace $ { $.$` + `mol_3d_glsl_${type} += ${JSON.stringify(styles)} }\n`;
            script.text(code);
            return [script];
        }
        sorted_sub(path) {
            const parent = $mol_file.absolute(path);
            return parent.sub().slice().sort((a, b) => a.name().length - b.name().length);
        }
        mods([path, exclude]) {
            const mods = [];
            for (const child of this.sorted_sub(path)) {
                const name = child.name();
                if (!/^[a-z0-9]/i.test(name))
                    continue;
                if (exclude && RegExp('[.=](' + exclude.join('|') + ')[.]', 'i').test(name))
                    continue;
                // if (! child.exists()) return false
                const child_path = child.path();
                let files = [];
                if (/(meta\.tree)$/.test(name)) {
                    files = this.metaTreeTranspile(child_path);
                }
                else if (/(view\.tree)$/.test(name)) {
                    files = this.viewTreeTranspile(child_path);
                }
                else if (/(\.css)$/.test(name)) {
                    files = this.cssTranspile(child_path);
                }
                else if (/(\.glsl)$/.test(name)) {
                    files = this.glslTranspile(child_path);
                }
                mods.push(...files, child);
            }
            //mods.sort( ( a , b )=> a.name().length - b.name().length )
            return mods;
        }
        // @ $mol_mem_key
        // modsRecursive( [ path , exclude ] : [ path : string , exclude? : readonly string[] ] ) : $mol_file[] {
        // 	var mod = $mol_file.absolute( path )
        // 	switch( mod.type() ) {
        // 		case 'file' :
        // 			return [ mod ]
        // 		case 'dir' :
        // 			var mods = [ mod ]
        // 			for( var m of this.mods( [ path , exclude ] ) ) {
        // 				if( m.type() !== 'dir' ) continue
        // 				for( var dep of this.modsRecursive( { path : m.path() , exclude } ) ) {
        // 					if( mods.indexOf( dep ) !== -1 ) continue
        // 					mods.push( dep )
        // 				}
        // 			}
        // 			return mods
        // 		default :
        // 			throw new Error( `Unsupported type "${mod.type()}" of "${mod.relate()}"` )
        // 	}
        // }
        sources([path, exclude]) {
            const mod = $mol_file.absolute(path);
            if (!mod.exists())
                return [];
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    return this.mods([path, exclude]).filter(mod => mod.type() === 'file');
                default:
                    return [];
            }
        }
        sourcesSorted([path, exclude]) {
            const mod = $mol_file.absolute(path);
            const graph = new $mol_graph();
            const sources = this.sources([path, exclude]);
            for (let src of sources) {
                graph.nodes.add(src.relate(this.root()));
            }
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let p in deps) {
                    var names;
                    if (p[0] === '/') {
                        names = p.substring(1).split('/');
                    }
                    else if (p[0] === '.') {
                        names = mod.resolve(p).relate(this.root()).split('/');
                    }
                    else {
                        names = ['node_modules', ...p.split('/')];
                    }
                    let files = [this.root()];
                    for (let name of names) {
                        let nextFiles = [];
                        for (let file of files) {
                            let validName = new RegExp(`^(${file.name()})?${name}(?![a-z0-9])`, 'i');
                            for (let child of this.mods([file.path(), exclude])) {
                                if (!child.name().match(validName))
                                    continue;
                                nextFiles.push(child);
                            }
                        }
                        if (nextFiles.length === 0)
                            break;
                        files = nextFiles;
                    }
                    for (let file of files) {
                        if (file === this.root())
                            continue;
                        const from = src.relate(this.root());
                        if (!graph.nodes.has(from))
                            continue;
                        const to = file.relate(this.root());
                        if (!graph.nodes.has(to))
                            continue;
                        graph.link(from, to, { priority: deps[p] });
                    }
                }
            }
            graph.acyclic(edge => edge.priority);
            let next = [...graph.sorted].map(name => this.root().resolve(name));
            return next;
        }
        sourcesAll([path, exclude]) {
            const sortedPaths = this.graph([path, exclude]).sorted;
            const sources = new Set();
            sortedPaths.forEach(path => {
                const mod = this.root().resolve(path);
                this.sourcesSorted([mod.path(), exclude]).forEach(src => {
                    sources.add(src);
                });
            });
            return [...sources];
        }
        tsPaths({ path, exclude, bundle }) {
            const sources = this.sourcesAll([path, exclude]).filter(src => /tsx?$/.test(src.ext()));
            if (sources.length && bundle === 'node') {
                const types = [];
                for (let [dep, src] of this.nodeDeps([path, exclude])) {
                    types.push('\t' + JSON.stringify(dep) + ' : typeof import\( ' + JSON.stringify(dep) + ' ) // ' + src);
                }
                const node_types = $mol_file.absolute(path).resolve(`-node/deps.d.ts`);
                node_types.text('// @ts-nocheck\ninterface $node {\n ' + types.join('\n') + '\n}');
                sources.push(node_types);
            }
            return sources.map(src => src.path());
        }
        js_error(path, next = null) {
            this.js_content(path);
            this.recheck_count(null);
            return next;
        }
        js_content(path) {
            this.recheck_count(null);
            const src = $mol_file.absolute(path);
            const src_text = src.text();
            if (/\.tsx?$/.test(src.name())) {
                const transpiled = this.checker_global().remote().transpile(src_text);
                const file = src.relate();
                return { text: transpiled.text, map: { ...transpiled.map, file, sources: [file] } };
            }
            return {
                text: this.$.$mol_sourcemap_strip(src_text),
                map: this.$.$mol_sourcemap_from_file(src)
            };
        }
        sources_js([path, exclude]) {
            var sources = this.sourcesAll([path, exclude]);
            const types = {
                'svg': 'image/svg+xml',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'webp': 'image/webp',
                'bin': 'application/octet-stream',
            };
            sources = sources.map(src => {
                const ext = src.ext().replace(/^.*\./, '');
                if (types[ext]) {
                    const script = src.parent().resolve(`-bin/${src.name()}.js`);
                    const payload = $mol_base64_encode(src.buffer());
                    const path = src.relate(this.root());
                    const uri = `data:${types[ext]};base64,${payload}`;
                    script.text(`var $node = $node || {} ; $node[ ${JSON.stringify('/' + path)} ] = ${JSON.stringify(uri)}\n`);
                    return script;
                }
                if (/^[jt]sx?$/.test(ext)) {
                    return src;
                }
            }).filter(Boolean);
            return sources;
        }
        sourcesDTS([path, exclude]) {
            let sources = this.sourcesAll([path, exclude]);
            sources = sources.filter(src => /(tsx?)$/.test(src.ext()));
            sources = sources.map(src => src.parent().resolve(src.name().replace(/(\.d)?\.tsx?$/, '.d.ts')));
            return sources;
        }
        sourcesCSS([path, exclude]) {
            return this.sourcesAll([path, exclude]).filter(src => /(css)$/.test(src.ext()));
        }
        static dependors = {};
        srcDeps(path) {
            const src = $mol_file.absolute(path);
            let ext = src.ext();
            if (!ext)
                return {};
            let dependencies;
            while (!dependencies) {
                dependencies = $mol_build.dependors[ext];
                if (dependencies)
                    break;
                var extShort = ext.replace(/^[^.]*\./, '');
                if (ext === extShort)
                    break;
                ext = extShort;
            }
            return dependencies ? dependencies(src) : {};
        }
        modDeps([path, exclude]) {
            const mod = $mol_file.absolute(path);
            const depends = mod === this.root()
                ? {}
                : { '..': -999 };
            for (var src of this.sources([path, exclude])) {
                $mol_build_depsMerge(depends, this.srcDeps(src.path()));
            }
            return depends;
        }
        dependencies([path, exclude]) {
            var mod = $mol_file.absolute(path);
            if (!mod.exists())
                return {};
            switch (mod.type()) {
                case 'file':
                    return this.srcDeps(path);
                case 'dir':
                    return this.modDeps([path, exclude]);
                default:
                    return {};
            }
        }
        watching() { return this.paths().length === 0; }
        interactive() { return process.stdout.isTTY; }
        pull_timeout() {
            let timeout = Number(this.$.$mol_env().MOL_BUILD_PULL_TIMEOUT);
            if (Number.isNaN(timeout)) {
                timeout = this.watching() ? 5000 : 120000;
            }
            return timeout;
        }
        ensurer() {
            return this.$.$mol_build_ensure.make({
                root: () => this.root(),
                interactive: () => this.interactive(),
                pull_timeout: () => this.pull_timeout(),
            });
        }
        modEnsure(path) { return this.ensurer().ensure(path); }
        modMeta(path) { return this.ensurer().meta(path); }
        graph([path, exclude]) {
            return this.$.$mol_build_graph.make({
                root: () => this.root(),
                mod_ensure: path => this.modEnsure(path),
                dependencies: path => this.dependencies([path, exclude]),
                path: () => path,
            });
        }
        bundleAllWeb(path) {
            this.bundle([path, 'web.deps.json']);
            this.bundle([path, 'web.css']);
            this.bundle([path, 'web.js']);
            this.bundle([path, 'web.test.js']);
            this.bundle([path, 'web.test.html']);
            this.bundle([path, 'web.baza']);
            this.bundle([path, 'web.view.tree']);
            this.bundle([path, 'web.meta.tree']);
            this.bundle([path, 'web.locale=en.json']);
            return null;
        }
        bundleAllWebAudit(path) {
            this.bundle([path, 'web.audit.js']);
            this.bundle([path, 'web.d.ts']);
        }
        bundleAllNode(path) {
            this.bundle([path, 'node.deps.json']);
            this.bundle([path, 'node.js']);
            this.bundle([path, 'node.test.js']);
            this.bundle([path, 'node.baza']);
            this.bundle([path, 'node.view.tree']);
            this.bundle([path, 'node.meta.tree']);
            this.bundle([path, 'node.locale=en.json']);
            return null;
        }
        bundleAllNodeAudit(path) {
            this.bundle([path, 'node.audit.js']);
            this.bundle([path, 'node.d.ts']);
        }
        bundleAll(path) {
            this.bundle([path, 'index.html']);
            this.bundle([path, 'test.html']);
            this.bundleAllWeb(path);
            this.bundleAllWebAudit(path);
            this.bundleAllNode(path);
            this.bundleAllNodeAudit(path);
            this.bundle([path, 'package.json']);
            this.bundle([path, 'manifest.json']);
            this.bundle([path, 'readme.md']);
            this.bundleFiles([path, ['node']]);
            this.bundleCordova([path, ['node']]);
            return null;
        }
        bundle([path, bundle = '']) {
            bundle = bundle && bundle.replace(/\.map$/, '');
            var envsDef = ['web', 'node'];
            var envs = bundle ? [] : envsDef.slice();
            var stages = ['test', 'dev'];
            if (bundle) {
                var [bundle, tags, type, locale] = /^(.*?)(?:\.(audit\.js|test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json|baza))?$/.exec(bundle);
                tags.split('.').forEach(tag => {
                    if (envsDef.indexOf(tag) !== -1)
                        envs = [tag];
                });
            }
            var res = [];
            envs.forEach(env => {
                var exclude = envsDef.filter(e => e !== env).concat(stages);
                if (!type || type === 'deps.json') {
                    res = res.concat(this.bundleDepsJSON({ path, exclude, bundle: env }));
                }
                if (!type || type === 'css') {
                    res = res.concat(this.bundleCSS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'js') {
                    res = res.concat(this.bundleJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'mjs') {
                    res = res.concat(this.bundleMJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'test.js') {
                    res = res.concat(this.bundleAndRunTestJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'audit.js') {
                    res = res.concat(this.bundleAuditJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'd.ts') {
                    res = res.concat(this.bundleDTS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'view.tree') {
                    res = res.concat(this.bundleViewTree({ path, exclude, bundle: env }));
                }
                if (!type || type === 'baza') {
                    res = res.concat(this.bundleBaza({ path, exclude, bundle: env }));
                }
                if (!type || type === 'meta.tree') {
                    res = res.concat(this.bundleMetaTree({ path, exclude, bundle: env }));
                }
                if (!type || /^locale=(\w+).json$/.test(type)) {
                    res = res.concat(this.bundleLocale({
                        path,
                        exclude,
                        bundle: env
                    }));
                }
            });
            if (!bundle || bundle === 'package.json') {
                res = res.concat(this.bundlePackageJSON([path, ['web', 'test']]));
            }
            if (!bundle || bundle === 'manifest.json') {
                res = res.concat(this.bundleManifestJSON([path, ['node', 'test']]));
            }
            if (!bundle || bundle === 'readme.md') {
                res = res.concat(this.bundleReadmeMd([path, ['web']]));
            }
            if (!bundle || bundle === 'index.html') {
                res = res.concat(this.bundleIndexHtml([path]));
            }
            if (!bundle || bundle === 'test.html') {
                res = res.concat(this.bundleTestHtml(path));
            }
            if (!bundle || /\//.test(bundle)) {
                res = res.concat(this.bundleFiles([path, ['node']]));
            }
            return res;
        }
        logBundle(target, duration) {
            const path = target.relate(this.root());
            this.$.$mol_log3_done({
                place: this,
                duration: `${duration}ms`,
                message: 'Built',
                path,
            });
        }
        now() { return Date.now(); }
        bundleJS({ path, exclude, bundle }) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var targetJS = pack.resolve(`-/${bundle}.js`);
            var sources = this.sources_js([path, exclude]);
            if (sources.length === 0)
                return [];
            var concater = new $mol_sourcemap_builder(this.root().relate(targetJS.parent()), ';');
            concater.add('#!/usr/bin/env node\n"use strict"');
            if (bundle === 'node') {
                concater.add('var exports = void 0');
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
            }
            const errors = [];
            for (const src of sources) {
                if (bundle === 'node' && /node_modules\//.test(src.relate(this.root())))
                    continue;
                try {
                    const content = this.js_content(src.path());
                    const isCommonJs = /typeof +exports|module\.exports|\bexports\.\w+\s*=/.test(content.text);
                    if (isCommonJs) {
                        concater.add(`\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "` + src.parent().relate(this.root().resolve('node_modules')) + `/" ) ] }; \n`, '-');
                    }
                    concater.add(content.text, '', content.map);
                    if (isCommonJs) {
                        const idFull = src.relate(this.root().resolve('node_modules'));
                        const idShort = idFull.replace(/\/index\.js$/, '').replace(/\.js$/, '');
                        concater.add(`\n$${''}node[ "${idShort}" ] = $${''}node[ "${idFull}" ] = module.${''}exports }.call( {} , {} )\n`, '-');
                    }
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        errors.push(error);
                }
            }
            if (errors.length) {
                const messages = errors.map(e => '  ' + e.message).join('\n');
                const error = new $mol_error_mix(`Build fail ${pack.relate()}\n${messages}`, {}, ...errors);
                $mol_fail_hidden(error);
            }
            var targetJSMap = pack.resolve(`-/${bundle}.js.map`);
            targetJS.text(concater.content + '\n//# sourceMappingURL=' + targetJSMap.relate(targetJS.parent()) + '\n');
            targetJSMap.text(concater.toString());
            this.logBundle(targetJS, Date.now() - start);
            return [targetJS, targetJSMap];
        }
        bundleMJS({ path, exclude, bundle }) {
            const start = this.now();
            const [targetJS, targetJSMap] = this.bundleJS({ path, exclude, bundle });
            if (!targetJS)
                return [];
            const targetMJS = targetJS.parent().resolve(targetJS.name().replace(/\.js$/, '.mjs'));
            targetMJS.text(targetJS.text().replace(/(^\/\/# sourceMappingURL.*)/m, 'export default $\n$1'));
            this.logBundle(targetMJS, Date.now() - start);
            return [targetMJS, targetJSMap];
        }
        recheck_count(next) {
            return ($mol_wire_probe(() => this.recheck_count()) ?? -1) + 1;
        }
        bundleAuditJS({ path, exclude, bundle }) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.audit.js`);
            var exclude_ext = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            const checker = this.checker({ path, exclude: exclude_ext, bundle });
            this.recheck_count();
            const changes = checker?.recheck();
            if (changes)
                this.checker_changes_add(changes);
            const errors = [];
            const paths = this.tsPaths({ path, exclude: exclude_ext, bundle });
            for (const path of paths) {
                this.js_content(path); // recheck on file change
                const error = this.js_error(path);
                if (!error)
                    continue;
                errors.push(new Error(error));
                this.js_error(path, null); // ts will refill it on change
            }
            this.logBundle(target, Date.now() - start);
            if (errors.length) {
                const messages = errors.map(e => '  ' + e.message).join('\n');
                const error = new $mol_error_mix(`Audit fail ${pack.relate()}\n${messages}`, {}, ...errors);
                target.text(`console.error(${JSON.stringify(error.stack)})`);
                $mol_fail_hidden(error);
            }
            target.text("console.info( `%cplace: $mol_build\nmessage: Audit passed`, 'color:forestgreen; font-weight:bolder' )");
            return [target];
        }
        bundle_test_js([path, exclude, bundle]) {
            const start = this.now();
            const pack = $mol_file.absolute(path);
            const root = this.root();
            const target = pack.resolve(`-/${bundle}.test.js`);
            const targetMap = pack.resolve(`-/${bundle}.test.js.map`);
            const concater = new $mol_sourcemap_builder(this.root().relate(target.parent()), ';');
            concater.add('"use strict"');
            const exclude_ext = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            const sources = this.sources_js([path, exclude_ext]);
            const sourcesNoTest = new Set(this.sources_js([path, exclude]));
            let sourcesTest = sources.filter(src => !sourcesNoTest.has(src));
            if (bundle === 'node') {
                sourcesTest = [...sourcesNoTest, ...sourcesTest];
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
            }
            if (sources.length === 0)
                return null;
            const errors = [];
            for (const src of sourcesTest) {
                if (bundle === 'node' && /node_modules\//.test(src.relate(root))) {
                    continue;
                }
                try {
                    const content = this.js_content(src.path());
                    concater.add(content.text, '', content.map);
                }
                catch (error) {
                    if ($mol_fail_catch(error))
                        errors.push(error);
                }
            }
            target.text(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()) + '\n');
            targetMap.text(concater.toString());
            this.logBundle(target, Date.now() - start);
            if (errors.length) {
                const messages = errors.map(e => '  ' + e.message).join('\n');
                const error = new $mol_error_mix(`Build fail ${pack.relate()}\n${messages}`, {}, ...errors);
                $mol_fail_hidden(error);
            }
            return { js: target, map: targetMap };
        }
        bundleAndRunTestJS({ path, exclude, bundle }) {
            const target = this.bundle_test_js([path, exclude, bundle]);
            if (!target) {
                this.$.$mol_log3_fail({
                    place: `${this}.bundleAndRunTestJS`,
                    message: 'No sources found',
                    hint: 'Wrong path?',
                    path,
                });
                return [];
            }
            if (bundle === 'node') {
                const dir = this.root().path();
                this.$.$mol_file.unwatched(() => this.$.$mol_run.spawn({
                    command: ['node', '--enable-source-maps', '--trace-uncaught', target.js.relate(this.root())],
                    dir
                }), dir);
            }
            return [target.js, target.map];
        }
        bundleTestHtml(path) {
            const start = this.now();
            this.modEnsure(path);
            const pack = $mol_file.absolute(path);
            const source = pack.resolve('index.html');
            const target = pack.resolve(`-/test.html`);
            const name = '$' + pack.relate(this.root()).replaceAll('/', '_');
            let content = source.exists()
                ? source.text()
                : `<!doctype html><meta charset="utf-8" /><html mol_view_root><body mol_view_root="${name}"><script src="web.js" charset="utf-8"></script>`;
            content = content.replace(/(<\/body>|$)/, `
				<script src="/mol/build/client/client.js" charset="utf-8"></script>
				<script src="web.test.js" charset="utf-8"></script>
				<script>
					addEventListener( 'load', ()=> setTimeout( ()=> {
						const audit =  document.createElement( 'script' )
						audit.src = 'web.audit.js'
						document.head.appendChild( audit )
					}, 500 ) )
				</script>
				$1`);
            target.text(content);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleDTS({ path, exclude, bundle }) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.d.ts`);
            var targetMap = pack.resolve(`-/${bundle}.d.ts.map`);
            var sources = this.sourcesDTS([path, exclude]);
            if (sources.length === 0)
                return [];
            var concater = new $mol_sourcemap_builder(target.parent().path());
            sources.forEach(function (src) {
                if (!src.exists() || !src.text())
                    return;
                concater.add(src.text(), src.relate(target.parent()));
            });
            target.text(concater.content + '\nexport = $;\n//# sourceMappingURL=' + targetMap.relate(target.parent()) + '\n');
            targetMap.text(concater.toString());
            this.logBundle(target, Date.now() - start);
            return [target, targetMap];
        }
        bundleViewTree({ path, exclude, bundle }) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.view.tree`);
            var sources = this.sourcesAll([path, exclude])
                .filter(src => /view.tree$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            target.text(sources.map(src => src.text()).join('\n'));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleBaza({ path, exclude, bundle }) {
            const start = this.now();
            const pack = $mol_file.absolute(path);
            const target = pack.resolve(`-/${bundle}.baza`);
            const sources = this.sourcesAll([path, exclude])
                .filter(src => /baza$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            target.buffer(new Uint8Array(sources.flatMap(src => [...src.buffer()])));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleMetaTree({ path, exclude, bundle }) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.meta.tree`);
            const sortedPaths = this.graph([path, exclude]).sorted;
            const namedMetas = [];
            sortedPaths.forEach(path => {
                const meta = this.modMeta(this.root().resolve(path).path());
                if (meta && meta.kids.length > 0) {
                    namedMetas.push(meta.data('/' + path, meta.kids));
                }
            });
            if (namedMetas.length === 0)
                return [];
            target.text(this.$.$mol_tree2.list(namedMetas, namedMetas[0]?.span).toString());
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        nodeDeps([path, exclude]) {
            var res = new Map();
            var sources = this.sourcesAll([path, exclude]);
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let dep in deps) {
                    if (!/^\/node(?:_modules)?\//.test(dep))
                        continue;
                    let mod = dep.replace(/^\/node(?:_modules)?\//, '');
                    if (mod.startsWith('@'))
                        mod = mod.match(/@[^/]*\/[^/]*/)[0];
                    else
                        mod = mod.replace(/\/.*/g, '');
                    res.set(mod, src.relate());
                }
            }
            return res;
        }
        bundleReadmeMd([path, exclude]) {
            const start = this.now();
            const root = this.root();
            const pack = $mol_file.absolute(path);
            let mod = pack;
            let source;
            while (true) {
                source = mod.resolve('README.md');
                if (source.exists())
                    break;
                source = mod.resolve('readme.md');
                if (source.exists())
                    break;
                if (mod === root)
                    break;
                mod = mod.parent();
            }
            const target = pack.resolve('-/README.md');
            target.text(source?.text() ?? path);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundlePackageJSON([path, exclude]) {
            const start = this.now();
            var pack = $mol_file.absolute(path);
            const source = pack.resolve(`package.json`);
            const target = pack.resolve(`-/package.json`);
            let name = pack.relate(this.root()).replace(/\//g, '_');
            let json = {
                name,
                version: '0.0.0',
                exports: {
                    node: {
                        import: './node.mjs',
                        default: './node.js'
                    },
                    types: './web.d.ts',
                    import: './web.mjs',
                    default: './web.js'
                },
                main: './web.js',
                module: './web.mjs',
                browser: './web.js',
                types: './web.d.ts',
                keywords: [],
                dependencies: {}
            };
            if (source.exists()) {
                Object.assign(json, JSON.parse(source.text()));
            }
            let version = json.version.split('.').map(Number);
            name = json.name || name;
            try {
                const result = this.$.$mol_run.spawn({ command: ['npm', 'view', name, 'versions', '--json'], dir: '.' });
                const versions = [].concat(JSON.parse(result.stdout.toString()));
                const published = versions.at(-1)?.split('.').map(Number) ?? [0, 0, 0];
                if (published[0] > version[0]) {
                    version = published;
                }
                else if (published[0] === version[0] && published[1] > version[1]) {
                    version[1] = published[1];
                }
                if (!(published[2] <= version[2])) {
                    version[2] = published[2];
                }
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    if (!error.message.match(/code E404/)) {
                        console.error(error);
                    }
                }
            }
            ++version[2];
            json.version = version.join('.');
            for (let dep of this.nodeDeps([path, exclude]).keys()) {
                if ($node_internal_check(dep))
                    continue;
                if (dep === 'internal')
                    continue; // @TODO: Prevent `internal` deps from `node:internal`.
                json.dependencies[dep] ??= `*`;
            }
            json.keywords = [...this.graph([path, exclude]).nodes]
                .filter(Boolean)
                .filter(path => !/[.-]/.test(path))
                .map(path => '$' + path.replaceAll('/', '_'));
            target.text(JSON.stringify(json, null, '  '));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleManifestJSON([path, exclude]) {
            var pack = $mol_file.absolute(path);
            if (this.sourcesAll([path, exclude]).length === 0)
                return [];
            const start = this.now();
            var target = pack.resolve(`-/manifest.json`);
            let name = pack.relate(this.root()).replace(/\//g, '_');
            const json = {
                name,
                short_name: name,
                description: '',
                id: name,
                start_url: '.',
                display: 'standalone',
                background_color: '#000000',
                theme_color: '#000000',
            };
            const source = pack.resolve(`manifest.json`);
            if (source.exists()) {
                Object.assign(json, JSON.parse(source.text()));
            }
            target.text(JSON.stringify(json, null, '\t'));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleIndexHtml([path, exclude]) {
            const pack = $mol_file.absolute(path);
            const targets = [];
            const start = this.now();
            const html = pack.resolve('index.html');
            const tree = pack.resolve('index.xml.tree');
            const target = pack.resolve('-/index.html');
            if (tree.exists()) {
                const xml_tree = this.$.$mol_tree2_from_string(tree.text());
                const text = this.$.$mol_tree2_xml_to_text(xml_tree);
                const xml = this.$.$mol_tree2_text_to_string(text);
                target.text(xml);
            }
            else if (html.exists()) {
                target.text(html.text());
            }
            if (target.exists()) {
                targets.push(target);
                this.logBundle(target, Date.now() - start);
            }
            return targets;
        }
        bundleFiles([path, exclude]) {
            const root = this.root();
            const pack = $mol_file.absolute(path);
            const sources = this.sourcesAll([path, exclude])
                .filter(src => /meta.tree$/.test(src.ext()));
            const targets = [];
            for (const source of sources) {
                const addFilesRecursive = (file) => {
                    if (!file.exists())
                        return;
                    if (file.type() === 'dir') {
                        for (const sub of file.sub()) {
                            addFilesRecursive(sub);
                        }
                        return;
                    }
                    const start = this.now();
                    const target = file.clone(pack.resolve(`-/${file.relate(root)}`).path());
                    if (!target)
                        return;
                    targets.push(target);
                    this.logBundle(target, Date.now() - start);
                };
                const tree = this.$.$mol_tree2_from_string(source.text(), source.path());
                tree.select('deploy').kids.forEach(deploy => {
                    const mod = root.resolve(deploy.text().replace(/^\//, ''));
                    this.modEnsure(mod.path());
                    addFilesRecursive(mod);
                });
            }
            return targets;
        }
        bundleCordova([path, exclude]) {
            const start = this.now();
            const pack = $mol_file.absolute(path);
            const cordovaOut = pack.resolve('-');
            const cordova = pack.resolve('-cordova');
            const config = pack.resolve('config.xml');
            if (!config.exists())
                return [];
            const config_target = cordova.resolve('config.xml');
            config_target.text(config.text());
            const targets = [config_target];
            const sources = pack.resolve('-').find().filter(src => src.type() === 'file');
            for (const source of sources) {
                const target = cordova.resolve(`www/${source.relate(cordovaOut)}`);
                target.text(source.text());
                targets.push(target);
            }
            this.logBundle(cordova, Date.now() - start);
            return targets;
        }
        bundleCSS({ path, exclude, bundle }) {
            if (bundle === 'node')
                return [];
            const start = this.now();
            var pack = $mol_file.absolute(path);
            var sources = []; // this.sourcesCSS( [ path , exclude ] )
            var target = pack.resolve(`-/${bundle}.css`);
            var targetMap = pack.resolve(`-/${bundle}.css.map`);
            // var root : any = null //$node['postcss'].root({})
            // sources.forEach(
            // 	src => {
            // 		var root2 = $node['postcss'].parse( src.content() , { from : src.path() } )
            // 		root = root ? root.append( root2 ) : root2
            // 	}
            // )
            // var processor = $node['postcss']([
            // 	$node[ 'postcss-custom-properties' ]({
            // 		preserve : true ,
            // 	}) ,
            // 	$node[ 'postcss-color-function' ]() ,
            // ])
            // var result = processor.process( root , { to : target.relate() , map : { inline : false } } )
            const result = {
                css: '/* CSS compiles into js bundle now! */',
                map: '/* CSS compiles into js bundle now! */',
            };
            target.text(result.css);
            targetMap.text(JSON.stringify(result.map, null, '\t'));
            this.logBundle(target, Date.now() - start);
            return [target, targetMap];
        }
        bundleLocale({ path, exclude, bundle }) {
            const pack = $mol_file.absolute(path);
            const sources = this.sourcesAll([path, exclude]).filter(src => /(locale=(\w+)\.json)$/.test(src.name()));
            if (!sources.length)
                return [];
            const locales = {};
            sources.forEach(src => {
                const [ext, lang] = /locale=(\w+)\.json$/.exec(src.name());
                if (!locales[lang])
                    locales[lang] = {};
                const loc = JSON.parse(src.text());
                for (let key in loc) {
                    locales[lang][key] = loc[key];
                }
            });
            const targets = Object.keys(locales).map(lang => {
                const start = this.now();
                const target = pack.resolve(`-/${bundle}.locale=${lang}.json`);
                const locale = locales[lang];
                if (lang !== 'en' && locales['en']) {
                    for (let key in locale) {
                        if (key in locales['en'])
                            continue;
                        delete locale[key];
                        this.$.$mol_log3_warn({
                            place: `${this}.buildLocale()`,
                            message: `Excess locale key`,
                            hint: 'May be you forgot to remove this key?',
                            lang,
                            key,
                        });
                    }
                }
                const locale_sorted = {};
                for (let key of Object.keys(locale).sort()) {
                    locale_sorted[key] = locale[key];
                }
                target.text(JSON.stringify(locale_sorted, null, '\t'));
                this.logBundle(target, Date.now() - start);
                return target;
            });
            return targets;
        }
        bundleDepsJSON({ path, exclude, bundle }) {
            const start = this.now();
            const pack = $mol_file.absolute(path);
            const list = this.sourcesAll([path, exclude]);
            if (!list.length)
                return [];
            const origs = list.filter(src => !/\/-/.test(src.path()));
            const sloc = {};
            for (const src of origs) {
                const ext = src.name().replace(/^.*\./, '');
                const count = src.text().trim().split(/[\n\r]\s*/).length;
                sloc[ext] = (sloc[ext] || 0) + count;
            }
            const graph = this.graph([path, exclude]);
            const deps = {};
            for (let dep of graph.nodes) {
                deps[dep] = this.dependencies([this.root().resolve(dep).path(), exclude]);
            }
            const deps_in = {};
            for (const [dep, pair] of graph.edges_in) {
                if (!deps_in[dep]) {
                    deps_in[dep] = {};
                }
                for (const [mod, edge] of pair) {
                    deps_in[dep][mod] = edge.priority;
                }
            }
            const deps_out = {};
            for (const [mod, pair] of graph.edges_out) {
                if (!deps_out[mod]) {
                    deps_out[mod] = {};
                }
                for (const [dep, edge] of pair) {
                    deps_out[mod][dep] = edge.priority;
                }
            }
            const data = {
                files: list.map(src => src.relate(this.root())),
                mods: graph.sorted,
                deps_in,
                deps_out,
                sloc,
                deps
            };
            const target = pack.resolve(`-/${bundle}.deps.json`);
            target.text(JSON.stringify(data));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
    }
    __decorate([
        $mol_action
    ], $mol_build.prototype, "checker_changes_add", null);
    __decorate([
        $mol_mem
    ], $mol_build.prototype, "checker_global", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "checker_rpc", null);
    __decorate([
        $mol_mem
    ], $mol_build.prototype, "server", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "metaTreeTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "view_tree_text", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "viewTreeTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "cssTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "glslTranspile", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sorted_sub", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "mods", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sources", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesSorted", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesAll", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "tsPaths", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "js_error", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "js_content", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sources_js", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesDTS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "sourcesCSS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "srcDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "dependencies", null);
    __decorate([
        $mol_mem
    ], $mol_build.prototype, "ensurer", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modEnsure", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "modMeta", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "graph", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllWeb", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllWebAudit", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllNode", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAllNodeAudit", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "bundleAll", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundle", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "now", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleMJS", null);
    __decorate([
        $mol_action
    ], $mol_build.prototype, "recheck_count", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleAuditJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundle_test_js", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleAndRunTestJS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleTestHtml", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleDTS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleViewTree", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleBaza", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleMetaTree", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "nodeDeps", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleReadmeMd", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundlePackageJSON", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleManifestJSON", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleIndexHtml", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleFiles", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleCordova", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleCSS", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleLocale", null);
    __decorate([
        $mol_mem_key
    ], $mol_build.prototype, "bundleDepsJSON", null);
    __decorate([
        $mol_mem_key
    ], $mol_build, "root", null);
    $.$mol_build = $mol_build;
    function $mol_build_depsMerge(target, source) {
        for (var path in source) {
            if (target[path] >= source[path])
                continue;
            target[path] = source[path];
        }
        return target;
    }
    $mol_build.dependors['js'] = source => {
        var depends = {};
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '') // drop block comments
            .replace(/\/\/.*$/gm, '') // drop inline comments
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\b(?:require|import)\(\s*['"]([^"'()]*?)['"]\s*\)/ig, (str, path) => {
                if ($node_internal_check(path))
                    return str;
                path = path.replace(/(\/[^\/.]+)$/, '$1.js').replace(/\/$/, '/index.js');
                if (path[0] === '.')
                    path = '../' + path;
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['ts'] = $mol_build.dependors['tsx'] = $mol_build.dependors['jam.js'] = $mol_build.dependors['tree.js'] = source => {
        var depends = {};
        var lines = String(source.text())
            .replace(/\/\*(?!\*)[\s\S]*?\*\//g, '') // drop block comments except doc-comments
            .replace(/\/\/.*$/gm, '') // drop inline comments
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\$([0-9]*[a-z][a-z0-9]*)(?:((?:[\._A-Z0-9][a-z0-9]+)+)|\[\s*['"]([^'"]+?)['"]\s*\])?/g, (str, pack, path, name) => {
                if (path)
                    path = '/' + pack + path.replace(/(?=[A-Z])/g, '_').toLowerCase().replace(/[_.\[\]'"]+/g, '/');
                if (name)
                    name = '/' + pack + '/' + name;
                pack = '/' + pack;
                $mol_build_depsMerge(depends, { [path || name || pack]: priority });
                return str;
            });
            line.replace(/\b(?:require|import)\(\s*['"]([^"'()]*?)['"]\s*\)/ig, (str, path) => {
                if ($node_internal_check(path))
                    return str;
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['view.ts'] = source => {
        var treeName = './' + source.name().replace(/ts$/, 'tree');
        var depends = { [treeName]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
    };
    $mol_build.dependors['node.ts'] = $mol_build.dependors['web.ts'] = source => {
        var common = './' + source.name().replace(/\.(node|web)\.ts$/, '.ts');
        var depends = { [common]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
    };
    $mol_build.dependors['view.css'] = source => {
        var treeName = './' + source.name().replace(/css$/, 'tree');
        var depends = { [treeName]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['css'](source));
        return depends;
    };
    $mol_build.dependors['css'] = source => {
        var depends = {
            '/mol/style/attach': 0,
        };
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '') // drop block comments
            .replace(/\/\/.*$/gm, '') // drop inline comments
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/(?:--|\[)([a-z][a-z0-9]+(?:[_][a-z0-9]+)+)/ig, (str, name) => {
                $mol_build_depsMerge(depends, { ['/' + name.replace(/[._-]/g, '/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['glsl'] = source => {
        var depends = {
            '/mol/3d/glsl': 0,
        };
        var lines = String(source.text())
            .replace(/\/\*[^]*?\*\//g, '') // drop block comments
            .replace(/\/\/.*$/gm, '') // drop inline comments
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/([a-z][a-z0-9]+(?:_+[a-z0-9]+)+)/ig, (str, name) => {
                const path = name.split(/_+/g);
                if (path[0] === 'gl')
                    return str;
                $mol_build_depsMerge(depends, { ['/' + path.join('/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['meta.tree'] = source => {
        const depends = {};
        const tree = $$.$mol_tree2_from_string(source.text(), source.path());
        tree.select('require').kids.forEach(leaf => {
            depends[leaf.text()] = 0;
        });
        tree.select('include').kids.forEach(leaf => {
            depends[leaf.text()] = -999;
        });
        return depends;
    };
    $mol_build.dependors['view.tree'] = source => {
        return {
            [`/${source.parent().relate()}/-view.tree/${source.name()}.js`]: 0,
        };
    };
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    class $mol_server extends $mol_object {
        express() {
            var express = $node['express']();
            this.expressHandlers().forEach(plugin => express.use(plugin));
            return express;
        }
        internal_ip() {
            const nets = $node.os.networkInterfaces();
            const results = Object.create(null);
            for (const name of Object.keys(nets)) {
                for (const net of nets[name]) {
                    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
                    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
                    if (net.family === familyV4Value && !net.internal) {
                        if (!results[name]) {
                            results[name] = [];
                        }
                        results[name].push(net.address);
                    }
                }
            }
            const internal = Object.values(results).at(-1);
            return internal?.[0] ?? '0.0.0.0';
        }
        http() {
            const server = $node.http.createServer(this.express());
            server.listen(this.port());
            this.$.$mol_log3_done({
                place: `${this}.http`,
                message: `Started`,
                network: `http://${this.internal_ip()}:${this.port()}/`,
                loopback: `http://localhost:${this.port()}/`,
            });
            return server;
        }
        connections = new Set();
        socket() {
            const socket = new $node.ws.WebSocketServer({
                server: this.http(),
                // perMessageDeflate: {
                // 	zlibDeflateOptions: {
                // 		chunkSize: 1024,
                // 		memLevel: 7,
                // 		level: 3
                // 	},
                // 	zlibInflateOptions: {
                // 		chunkSize: 10 * 1024
                // 	},
                // }
            });
            socket.on('connection', line => {
                this.connections.add(line);
                line.on('message', (message, isBinary) => {
                    for (const other of this.connections) {
                        if (line === other)
                            continue;
                        other.send(message, { binary: isBinary });
                    }
                });
            });
            return socket;
        }
        expressHandlers() {
            return [
                this.expressCors(),
                this.expressCompressor(),
                this.expressBodier(),
                this.expressGenerator(),
                this.expressIndex(),
                this.expressFiler(),
                this.expressDirector(),
            ];
        }
        expressCompressor() {
            return $node['compression']();
        }
        expressCors() {
            return $node.cors();
        }
        expressBodier() {
            return $node['body-parser'].json({
                limit: this.bodyLimit()
            });
        }
        expressFiler() {
            return $node.express.static($node.path.resolve(this.rootPublic()), {
                maxAge: this.cacheTime(),
                dotfiles: 'allow'
            });
        }
        expressDirector() {
            return $node['serve-index'](this.rootPublic(), { icons: true });
        }
        expressIndex() {
            return (req, res, next) => next();
        }
        expressGenerator() {
            return (req, res, next) => next();
        }
        bodyLimit() {
            return '1mb';
        }
        cacheTime() {
            return 1000 * 60 * 60 * 24 * 365 * 1000;
        }
        port() {
            return 80;
        }
        rootPublic() {
            return '.';
        }
    }
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "express", null);
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "http", null);
    __decorate([
        $mol_mem
    ], $mol_server.prototype, "socket", null);
    $.$mol_server = $mol_server;
})($ || ($ = {}));

;
"use strict";
var $;
(function ($) {
    const trace_hinted = new WeakSet();
    class $mol_build_server extends $mol_server {
        static trace = false;
        sync_middleware(mdl) {
            // const wrapped = $mol_wire_async(mdl)
            return $mol_func_name_from(async (req, res, next) => {
                const wrapped = $mol_wire_async(mdl);
                try {
                    const stopped = await wrapped(req, res);
                    if (!stopped)
                        Promise.resolve().then(next);
                }
                catch (err) {
                    const error = err instanceof Error ? err : new Error(String(err), { cause: err });
                    if (!this.$.$mol_build_server.trace && !trace_hinted.has(error)) {
                        error.message += '\n' + 'Set $mol_build_server.trace = true for stacktraces';
                        trace_hinted.add(error);
                    }
                    res.status(500).send(error.toString()).end();
                    this.$.$mol_log3_fail({
                        place: `${this}.${mdl.name}()`,
                        uri: req.path,
                        stack: this.$.$mol_build_server.trace ? error.stack : undefined,
                        message: error.message,
                    });
                }
            }, mdl);
        }
        expressGenerator() { return this.sync_middleware(this.handleRequest.bind(this)); }
        handleRequest(req, res) {
            try {
                // if( req.query._escaped_fragment_ ) {
                // 	const fragment = decodeURIComponent( String( req.query._escaped_fragment_ ) )
                // 	const url = req.protocol + '://' + req.get( 'host' ) + req.path + '#!' + fragment
                // 	const html = $mol_browser.html( url )
                // 	res.send( html ).end()
                // 	return
                // }
                if (!this.generate(req.url))
                    return false;
                res.set('Cache-Control', 'no-cache, public');
            }
            catch (error) {
                if ($mol_promise_like(error))
                    $mol_fail_hidden(error);
                if (!req.url.match(/\.js$/))
                    $mol_fail_hidden(error);
                this.$.$mol_log3_fail({
                    place: `${this}.handleRequest()`,
                    uri: req.path,
                    message: error.message,
                    stack: error.stack,
                });
                const script = error.message.split('\n\n').map(msg => {
                    return `console.error( ${JSON.stringify(msg)} )`;
                }).join('\n');
                res.send(script).end();
                return true;
            }
        }
        build() {
            return $mol_fail(new Error('Not implemented'));
        }
        generate(url) {
            $mol_wire_solid();
            /*
            Если использовать динамически подгружаемые через $mol_script модули
            То урл тут может быть вида /demo/app/-/node_modules/stockfish/-/stockfish.js
            В path должна попасть часть до первого /-/
            Динамически подгружаться могут обособленные, редко используемые скрипты.
            Например шахматы, встроенные в основное приложение.
            У которых здоровый двиг stockfish.js динамически загружается в воркер
            только при открытии шахмат.
            */
            const matched = url.match(/^(.*?)\/-\/((?:(?:\w+(?:.\w+)+)(?:\/-\/)?)+)$/);
            if (!matched)
                return null;
            const build = this.build();
            const [, rawpath, bundle] = matched;
            const mod = build.root().resolve(rawpath);
            if (bundle === 'web.css') {
                this.$.$mol_log3_warn({
                    place: `${this}.generate()`,
                    message: 'CSS compiles into JS bundle now',
                    hint: 'Remove link to web.css',
                });
            }
            const path = mod.path();
            this.path_add(path, bundle);
            return build.bundle([path, bundle]);
        }
        expressIndex() { return this.sync_middleware(this.expressIndexRequest.bind(this)); }
        ensure(path) {
            $mol_wire_solid();
            this.build().modEnsure(path);
        }
        expressIndexRequest(req, res) {
            const root = this.$.$mol_file.absolute(this.rootPublic());
            const dir = root.resolve(req.path);
            const path = dir.path();
            // Handle .well-known paths (browser/dev tools standard paths)
            if (req.path === '/.well-known/appspecific/com.chrome.devtools.json') {
                const root = this.build().root().path();
                const config = {
                    version: 1,
                    description: 'MAM ($mol) Framework DevTools Configuration',
                    mappings: [
                        {
                            url: `http://localhost:${this.port()}/`,
                            path: root,
                        }
                    ]
                };
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                });
                res.end(JSON.stringify(config, null, 2));
                return true;
            }
            // ensure загружает сорцы, делает git pull, это не стоит делать на build-папках
            // Поэтому регулярка выше отсеивает build-папки
            this.ensure(path);
            // a/b/?c#d, a/b/-/
            const match = req.url.match(/(\/|.*[^\-]\/)([\?#].*)?$/);
            if (!match)
                return;
            const file = root.resolve(`${req.path}index.html`);
            if (file.exists()) {
                res.redirect(301, `${match[1]}-/test.html${match[2] ?? ''}`);
                return true;
            }
            if (dir.type() !== 'dir')
                return;
            const files = [{ name: '-', type: 'dir' }];
            for (const file of dir.sub()) {
                if (!files.find(({ name }) => name === file.name())) {
                    files.push({ name: file.name(), type: file.type() });
                }
                if (/\.meta\.tree$/.test(file.name())) {
                    const meta = this.$.$mol_tree2_from_string(file.text());
                    for (const pack of meta.select('pack', null).kids) {
                        if (files.find(({ name }) => name === pack.type))
                            continue;
                        files.push({ name: pack.type, type: 'dir' });
                    }
                }
            }
            const html = `
				<style>
					body {
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						font: 1rem/1.5rem sans-serif;
						height: 100%;
						margin: 0;
						padding: 0.75rem;
						box-sizing: border-box;
					}
					a {
						text-decoration: none;
						color: rgb(57, 115, 172);
						font-weight: bolder;
					}
					a:hover {
						background: hsl( 0deg, 0%, 0%, .05 )
					}
					a[href^="."], a[href^="-"], a[href="node_modules"] {
						opacity: 0.5;
					}
					a[href=".."], a[href="-"] {
						opacity: 1;
					}
				</style>
				<link href="/_logo.png" rel="icon" />
				<a href="..">&#x1F4C1; ..</a>
				` + files
                .sort($mol_compare_text((item) => item.type))
                .map(file => `<a href="${file.name}">${file.type === 'dir' ? '&#x1F4C1;' : '&#128196;'} ${file.name}</a>`)
                .join('\n');
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(html);
            return true;
        }
        port() {
            return Number(this.$.$mol_env()['MAM_BUILD_SERVER_PORT'] || '9080');
        }
        lines(next = new Map()) {
            return next;
        }
        socket() {
            const build = this.build();
            const root = build.root();
            return super.socket().on('connection', (line, req) => {
                const path_relative = req.url.replace(/\/-.*/, '').substring(1);
                const path = root.resolve(path_relative).path();
                this.$.$mol_log3_rise({
                    place: this,
                    message: `Connect`,
                    path,
                });
                this.lines(new Map([...this.lines(), [line, path]]));
                this.path_add(path, '');
                line.on('close', () => {
                    this.path_doubt(path);
                    const lines = new Map(this.lines());
                    lines.delete(line);
                    this.lines(lines);
                });
            });
        }
        start() {
            this.slave_servers();
            this.repl();
            const socket = this.socket();
            for (const [line, path] of this.lines()) {
                this.notify([line, path]);
            }
            // this.bundles_keep()
            return socket;
        }
        bundles_count(reset) {
            return 1 + ($mol_wire_probe(() => this.bundles_count()) ?? 0);
        }
        /**
         * Держать в памяти собранные бандлы плохо, т.к. gc их может долго не утилизировать и node сожрет память и упадет.
         * Логичнее удалять отложенно, после того как reload-сокет отписался от пути и повторно не подписался.
         */
        bundles_keep() {
            const build = this.build();
            this.bundles_count();
            for (const [path, bundles] of Object.entries(this.path_bundles)) {
                const sources = build.sourcesAll([path, ['node']]);
                for (const source of sources)
                    source.version();
                for (const bundle of bundles) {
                    const files = build.bundle([path, bundle]);
                    for (const file of files) {
                        file.version();
                    }
                }
            }
        }
        path_bundles = {};
        path_doubted = new Set();
        path_add(path, bundle) {
            return;
            this.path_doubted.delete(path);
            if (!this.path_bundles[path])
                this.path_bundles[path] = new Set();
            this.path_bundles[path].add(bundle);
            this.bundles_count(null);
        }
        path_doubt_timeout = null;
        path_doubt(path) {
            this.path_doubted.add(path);
            if (this.path_doubt_timeout)
                return;
            this.path_doubt_timeout = new this.$.$mol_after_timeout(15000, () => $mol_wire_async(this).path_doubted_remove());
        }
        path_doubted_remove() {
            for (const path of this.path_doubted) {
                delete this.path_bundles[path];
            }
            this.path_doubt_timeout = null;
            this.path_doubted.clear();
            this.bundles_count(null);
        }
        bundle_changed_at(path) {
            const build = this.build();
            try {
                const sources = build.sourcesAll([path, ['node']]);
                /**
                Бывает надо какой-то внешней программой в watch-режиме компилить js-ки или wasm
                и класть как артефакт в - (например, игровой движок на unity)
                При изменении этих файлов, надо перезапускать страницу.
                Если их класть не в -, а рядом с сорцами, то билдер mol будет пытаться их анализировать и упадет.
                 */
                const resources = build.bundleFiles([path, ['node']]);
                for (const src of [...sources, ...resources])
                    src.version();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    this.$.$mol_log3_fail({
                        place: `${this}.notify`,
                        message: error?.message,
                        path,
                    });
                }
            }
            return new Date();
        }
        notify([line, path]) {
            this.bundle_changed_at(path);
            // ignore initial
            if (!$mol_mem_cached(() => this.notify([line, path])))
                return true;
            this.$.$mol_log3_rise({
                place: `${this}`,
                message: `$mol_build_obsolete`,
                path
            });
            line.send('$mol_build_obsolete');
            return true;
        }
        slave_commands(next = []) {
            return next;
        }
        slave_servers() {
            return this.slave_commands().map(cmd => this.slave_server(cmd));
        }
        slave_server(cmd) {
            const [path, ...args] = cmd.split(' ');
            const command = `node ./${path}/-/node.js ${args.join(' ')}`;
            const prev = $mol_wire_probe(() => this.slave_server(cmd));
            if (prev)
                prev.destructor();
            const build = this.build();
            try {
                for (const file of build.bundle([path, 'node.js']))
                    file.version();
                for (const file of build.bundle([path, 'node.audit.js']))
                    file.version();
                for (const file of build.bundle([path, 'node.test.js']))
                    file.version();
            }
            catch (error) {
                if ($mol_fail_catch(error)) {
                    this.$.$mol_log3_fail({
                        place: `${this}.slave_server`,
                        stack: error.stack,
                        message: error.message ?? error,
                    });
                }
                return null;
            }
            this.$.$mol_log3_come({
                place: this,
                message: 'Start',
                command,
            });
            const server = $node['child_process'].spawn('node', ['--enable-source-maps', '--trace-uncaught', `./${path}/-/node.js`, ...args], {
                stdio: ['pipe', 'inherit', 'inherit'],
            });
            return Object.assign(server, {
                destructor: () => {
                    if (server.killed)
                        return;
                    server.kill();
                    this.$.$mol_log3_done({
                        place: this,
                        message: 'Stopped',
                        command,
                    });
                }
            });
        }
        repl() {
            const terminal = $node.readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                history: [],
                tabSize: 4,
                prompt: '',
            });
            terminal.prompt();
            const hint = 'start: + path/to/module args\nstop:  - path/to/module args';
            terminal
                .on('line', line => {
                if (!line.trim())
                    return;
                const [action, ...params] = line.split(' ');
                const command = params.join(' ');
                switch (action) {
                    case '+': return this.slave_commands([...this.slave_commands(), command]);
                    case '-': return this.slave_commands(this.slave_commands().filter(cmd => cmd !== command));
                    case '?':
                    default: return console.log(hint);
                }
            })
                .on('SIGINT', () => process.exit(0))
                .on('close', () => process.exit(0));
            // this.$.$mol_log3_done({
            // 	place: this,
            // 	message: 'Watch dog started',
            // 	hint,
            // })
            return terminal;
        }
    }
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "generate", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "ensure", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "lines", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "socket", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "start", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "bundles_count", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "bundles_keep", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "bundle_changed_at", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "notify", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "slave_commands", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "slave_servers", null);
    __decorate([
        $mol_mem_key
    ], $mol_build_server.prototype, "slave_server", null);
    __decorate([
        $mol_mem
    ], $mol_build_server.prototype, "repl", null);
    $.$mol_build_server = $mol_build_server;
})($ || ($ = {}));


//# sourceMappingURL=node.js.map
