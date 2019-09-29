require( "source-map-support" ).install(); var exports = void 0;
;
process.on( 'unhandledRejection' , up => { throw up } );
"use strict"
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
var $ = Object.setPrototypeOf( module['export'+'s'] , global )
$.$$ = $

$.$mol = $  // deprecated

;

var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "' + src.parent().relate( this.root().resolve( 'node_modules' ) ) + '/" ) + ".js" ] }; 
;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports;
//mol.js.map
;

$node[ "../mol/mol.js" ] = $node[ "../mol/mol.js" ] = module.exports }.call( {} , {} )
;
"use strict";
var $;
(function ($) {
    let $$;
    (function ($$_1) {
    })($$ = $.$$ || ($.$$ = {}));
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//ambient.js.map
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
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//fail.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
})($ || ($ = {}));
//hidden.js.map
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
    let debug;
    function $mol_log_debug(next = debug) {
        return debug = next;
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.node.js.map
;
"use strict";
var $;
(function ($) {
    let filter;
    $.$mol_log_filter = function $mol_log_filter(next = filter) {
        return filter = next;
    };
})($ || ($ = {}));
//log_filter.node.js.map
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
    $.$mol_state_stack = new Map();
})($ || ($ = {}));
//stack.js.map
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
            if (this.status === $mol_atom_status.actual || this.status === $mol_atom_status.pulling) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        }
        obsolete() {
            if (this.status === $mol_atom_status.obsolete)
                return;
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
var $;
(function ($) {
    function $mol_dict_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object')
            return JSON.stringify(value);
        if (value instanceof Array)
            return JSON.stringify(value);
        if (value.constructor === Object)
            return JSON.stringify(value);
        return value;
    }
    $.$mol_dict_key = $mol_dict_key;
    class $mol_dict extends Map {
        get(key) {
            return super.get($mol_dict_key(key));
        }
        has(key) {
            return super.has($mol_dict_key(key));
        }
        set(key, value) {
            return super.set($mol_dict_key(key), value);
        }
        delete(key) {
            return super.delete($mol_dict_key(key));
        }
        forEach(back, context) {
            return super.forEach((val, key, dict) => {
                if (typeof key === 'string')
                    key = JSON.parse(key);
                return back.call(this, val, key, dict);
            }, context);
        }
        [Symbol.iterator]() {
            const iterator = super[Symbol.iterator]();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    const iteration = iterator.next();
                    if (!iteration.done) {
                        const key = iteration.value[0];
                        if (typeof key === 'string')
                            iteration.value[0] = JSON.parse(key);
                    }
                    return iteration;
                }
            };
        }
    }
    $.$mol_dict = $mol_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_mem(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_value(next, force) {
            const host = this;
            let atom = store.get(host);
            if (!atom) {
                const id = `${host}.${name}()`;
                atom = new $.$mol_atom(id, function (...args) {
                    const v = value.call(host, ...args);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                atom.object_owner(host);
                const destructor = atom.destructor;
                atom.destructor = () => {
                    store.delete(host);
                    destructor.call(atom);
                };
                store.set(host, atom);
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        descr.value['value'] = value;
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_key_value(key, next, force) {
            const host = this;
            let dict = store.get(host);
            if (!dict)
                store.set(host, dict = new $.$mol_dict);
            let atom = dict.get(key);
            if (!atom) {
                const id = `${host}.${name}(${JSON.stringify(key)})`;
                atom = new $.$mol_atom(id, function (...args) {
                    const v = value.call(host, key, ...args);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                const destructor = atom.destructor;
                atom.destructor = () => {
                    dict.delete(key);
                    destructor.call(atom);
                };
                dict.set(key, atom);
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        void (descr.value['value'] = value);
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
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
    function $mol_exec(dir, command, ...args) {
        let [app, ...args0] = command.split(' ');
        args = [...args0, ...args];
        console.info(`${$node.colorette.gray($node.path.relative('', dir))}> ${$node.colorette.blue(app)} ${$node.colorette.cyan(args.join(' '))}`);
        var res = $node['child_process'].spawnSync(app, args, {
            cwd: $node.path.resolve(dir),
            shell: true,
        });
        if (res.status || res.error)
            return $.$mol_fail(res.error || new Error(res.stderr.toString()));
        if (!res.stdout)
            res.stdout = new Buffer('');
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//exec.node.js.map
;
"use strict";
var $node = new Proxy({}, { get(target, name, wrapper) {
        if (require('module').builtinModules.indexOf(name) >= 0)
            return require(name);
        if (!require('fs').existsSync(`./node_modules/${name}`)) {
            $.$mol_exec('.', 'npm', 'install', name);
        }
        return require(name);
    } });
//node.node.js.map
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
    class $mol_file extends $.$mol_object {
        static absolute(path) {
            return $mol_file.make({
                path: $.$mol_const(path)
            });
        }
        static relative(path) {
            return $mol_file.absolute($node.path.resolve(path).replace(/\\/g, '/'));
        }
        path() {
            return '.';
        }
        watcher() {
            const watcher = $node.chokidar.watch(this.path(), {
                persistent: false,
                ignored: /(^\.|___$)/,
                depth: 0,
                ignoreInitial: true,
            });
            watcher.on('all', (type, path) => {
                const file = $mol_file.relative(path.replace(/\\/g, '/'));
                file.stat(undefined, $.$mol_atom_force_cache);
                if (type === 'change')
                    return;
                file.parent().stat(undefined, $.$mol_atom_force_cache);
            });
            watcher.on('error', (error) => {
                this.stat(error, $.$mol_atom_force_cache);
            });
            return watcher;
        }
        stat(next, force) {
            var path = this.path();
            try {
                var stat = next || $node.fs.statSync(path);
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return null;
                return error;
            }
            this.parent().watcher();
            return stat;
        }
        version() {
            return this.stat().mtime.getTime().toString(36).toUpperCase();
        }
        exists(next) {
            var exists = !!this.stat();
            if (next === void 0) {
                return exists;
            }
            else {
                if (next == exists)
                    return exists;
                if (next) {
                    this.parent().exists(true);
                    $node.fs.mkdirSync(this.path());
                }
                else {
                    $node.fs.unlinkSync(this.path());
                }
                this.stat(undefined, $.$mol_atom_force_cache);
                return next;
            }
        }
        parent() {
            return this.resolve('..');
        }
        type() {
            var stat = this.stat();
            if (stat) {
                if (stat.isFile())
                    return 'file';
                if (stat.isDirectory())
                    return 'dir';
                if (stat.isBlockDevice())
                    return 'blocks';
                if (stat.isCharacterDevice())
                    return 'chars';
                if (stat.isSymbolicLink())
                    return 'link';
                if (stat.isFIFO())
                    return 'fifo';
                if (stat.isSocket())
                    return 'socket';
            }
            else {
                return null;
            }
            throw new Error(`Unknown file type ${this.path()}`);
        }
        name() {
            return $node.path.basename(this.path());
        }
        ext() {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        content(next, force) {
            if (next === void 0) {
                return this.stat() && $node.fs.readFileSync(this.path());
            }
            this.parent().exists(true);
            $node.fs.writeFileSync(this.path(), next);
            return next;
        }
        reader() {
            return $node.fs.createReadStream(this.path());
        }
        writer() {
            return $node.fs.createWriteStream(this.path());
        }
        sub() {
            this.stat();
            switch (this.type()) {
                case 'dir':
                    return $node.fs.readdirSync(this.path())
                        .filter(name => !/^\.+$/.test(name))
                        .map(name => this.resolve(name));
            }
            return [];
        }
        resolve(path) {
            return this.constructor.relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        append(next) {
            $node.fs.appendFileSync(this.path(), next);
        }
        find(include, exclude) {
            var found = [];
            this.sub().forEach(child => {
                if (exclude && child.path().match(exclude))
                    return;
                if (!include || child.path().match(include))
                    found.push(child);
                if (child.type() === 'dir')
                    found = found.concat(child.find(include, exclude));
            });
            return found;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "watcher", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "stat", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "version", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "sub", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.node.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_typeof(value) {
        var str = {}.toString.apply(value);
        var type = str.substring(8, str.length - 1);
        return type;
    }
    $.$mol_typeof = $mol_typeof;
})($ || ($ = {}));
//typeof.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_tree {
        constructor(config = {}) {
            this.type = config.type || '';
            if (config.value !== undefined) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = sub.concat(config.sub || []);
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
        }
        static values(str, baseUri) {
            return str.split('\n').map((data, index) => new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1
            }));
        }
        clone(config) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                value: config.value
            });
        }
        static fromString(str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var prefix = str.replace(/^\n?(\t*)[\s\S]*/, '$1');
            var lines = str.replace(new RegExp('^\\t{0,' + prefix.length + '}', 'mg'), '').split('\n');
            lines.forEach(line => {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    throw new Error(`Syntax error at ${baseUri}:${row}\n${line}`);
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    throw new Error(`Too many tabs at ${baseUri}:${row}\n${line}`);
                stack.length = deep + 1;
                var parent = stack[deep];
                let col = deep;
                types.forEach(type => {
                    if (!type)
                        throw new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`);
                    var next = new $mol_tree({ type, baseUri, row, col });
                    parent.sub.push(next);
                    parent = next;
                    col += type.length + 1;
                });
                if (data) {
                    var next = new $mol_tree({ data: data.substring(1), baseUri, row, col });
                    parent.sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        }
        static fromJSON(json, baseUri = '') {
            var type = $.$mol_typeof(json);
            switch (type) {
                case 'Boolean':
                case 'Null':
                case 'Number':
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case 'String':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case 'Array':
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                    });
                case 'Date':
                    return new $mol_tree({
                        type: "",
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                case 'Object':
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri
                            });
                        }
                        child.sub.push($mol_tree.fromJSON(json[key], baseUri));
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
            throw new Error(`Unsupported type (${type}) at ${baseUri}`);
        }
        get uri() {
            return this.baseUri + '#' + this.row + ':' + this.col;
        }
        toString(prefix = '') {
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type;
                if (this.sub.length == 1) {
                    return output + ' ' + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var child of this.sub) {
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        }
        toJSON() {
            if (!this.type)
                return this.value;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === '*') {
                var obj = {};
                for (var child of this.sub) {
                    var key = child.type || child.clone({ sub: child.sub.slice(0, child.sub.length - 1) }).value;
                    var val = child.sub[child.sub.length - 1].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === '/') {
                var res = [];
                this.sub.forEach(child => {
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            if (String(Number(this.type)) == this.type.trim())
                return Number(this.type);
            throw new Error(`Unknown type (${this.type}) at ${this.uri}`);
        }
        get value() {
            var values = [];
            for (var child of this.sub) {
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.sub.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                });
                if (!replaced)
                    sub.push(new $mol_tree({ type }).insert(value, ...path.slice(1)));
                return this.clone({ sub });
            }
            else if (typeof type === 'number') {
                const sub = this.sub.slice();
                sub[type] = (sub[type] || new $mol_tree).insert(value, ...path.slice(1));
                return this.clone({ sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(item => item.insert(value, ...path.slice(1))) });
            }
        }
        select(...path) {
            var next = [this];
            for (var type of path) {
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.sub) {
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push(...item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        }
        filter(path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select(...path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(child => child.value == value);
                }
            });
            return new $mol_tree({ sub: sub });
        }
        transform(visit, stack = []) {
            const sub_stack = [this, ...stack];
            return visit(sub_stack, () => this.sub.map(node => node.transform(visit, sub_stack)).filter(n => n));
        }
        hack(context) {
            const sub = [].concat(...this.sub.map(child => {
                const handle = context[child.type] || context[''];
                if (!handle)
                    $.$mol_fail(child.error('Handler not defined'));
                return handle(child, context);
            }));
            return this.clone({ sub });
        }
        error(message) {
            return new Error(`${message}:\n${this} ${this.baseUri}:${this.row}:${this.col}`);
        }
    }
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $.$mol_object {
        static size(next) {
            return next || {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//window.node.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = new $node.jsdom.JSDOM('', { url: 'https://localhost/' }).window;
})($ || ($ = {}));
//context.node.js.map
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
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
    class $mol_view_selection extends $.$mol_object {
        static focused(next, force) {
            if (next === undefined)
                return [];
            const node = next[0];
            const atom = $.$mol_atom_current();
            new $.$mol_defer(() => {
                if (node)
                    return node.focus();
                const el = atom.cache()[0];
                if (el)
                    el.blur();
            });
            return undefined;
        }
        static position(next, force) {
            if (next !== undefined) {
                var start = next.start;
                var end = next.end;
                if (!(start <= end))
                    throw new Error(`Wrong offsets (${start},${end})`);
                var root = $.$mol_dom_context.document.getElementById(next.id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return next;
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        }
        static onFocus(event) {
            const parents = [];
            let element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            this.focused(parents, $.$mol_atom_force_cache);
        }
        static onBlur(event) {
            const focused = this.focused();
            setTimeout($.$mol_log_group('$mol_view_selection blur', () => {
                if (focused !== this.focused())
                    return;
                this.focused([], $.$mol_atom_force_cache);
            }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false)
                el.removeAttribute(name);
            else
                el.setAttribute(name, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
})($ || ($ = {}));
//attributes.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_events(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: true });
        }
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
})($ || ($ = {}));
//events.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_children(el, childNodes) {
        const node_list = [];
        const node_set = new Set();
        for (let i = 0; i < childNodes.length; ++i) {
            let node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['dom_tree'])
                    node = node['dom_tree']();
                node_list.push(node);
                node_set.add(node);
            }
            else {
                node_list.push(String(node));
            }
        }
        let nextNode = el.firstChild;
        for (let view_ of node_list) {
            const view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
})($ || ($ = {}));
//children.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const cur = style[name];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name] = `${val}px`;
            }
            if (cur !== val)
                style[name] = val;
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
})($ || ($ = {}));
//styles.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
})($ || ($ = {}));
//fields.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_func_name(func) {
        return func.name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//name.js.map
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
    let $$;
    (function ($$_1) {
        let $$;
    })($$ = $.$$ || ($.$$ = {}));
    let $mol;
    (function ($mol_1) {
        let $mol;
    })($mol = $.$mol || ($.$mol = {}));
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $.$mol_object {
        static Root(id) {
            return new this;
        }
        static autobind() {
            const nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_tree(nodes.item(i));
                document.title = view.title();
            }
        }
        title() {
            return this.constructor.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $.$mol_view_selection.focused(next === undefined ? undefined : next ? [node] : []) || [];
            return value.indexOf(node) !== -1;
        }
        context(next) {
            return next || $;
        }
        get $() {
            return this.context();
        }
        set $(next) {
            this.context(next);
        }
        context_sub() {
            return this.context();
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return this.constructor.toString().replace('$', '');
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return null;
        }
        sub_visible() {
            const sub = this.sub();
            if (!sub)
                return sub;
            const context = this.context_sub();
            sub.forEach(child => {
                if (child instanceof $mol_view) {
                    child.$ = context;
                }
            });
            return sub;
        }
        minimal_width() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        }
        minimal_height() {
            return this.content_height();
        }
        content_height() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            const node = next || this.$.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            node.setAttribute('id', this.dom_id());
            $.$mol_dom_render_attributes(node, this.attr_static());
            $.$mol_dom_render_events(node, this.event());
            $.$mol_dom_render_events_async(node, this.event_async());
            return node;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            try {
                for (let plugin of this.plugins()) {
                    plugin.dom_node(node);
                    plugin.render();
                }
                this.render();
            }
            catch (error) {
                $.$mol_dom_render_attributes(node, { mol_view_error: error.name });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                try {
                    void (node.innerText = error.message);
                }
                catch (e) { }
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        }
        render() {
            const node = this.dom_node();
            const sub = this.sub_visible();
            if (sub)
                $.$mol_dom_render_children(node, sub);
            $.$mol_dom_render_attributes(node, this.attr());
            $.$mol_dom_render_styles(node, this.style());
            const fields = this.field();
            $.$mol_dom_render_fields(node, fields);
            new $.$mol_defer(() => $.$mol_dom_render_fields(node, fields));
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        view_names_owned() {
            const names = [];
            let owner = this.object_host();
            if (owner instanceof $mol_view) {
                const suffix = this.object_field();
                const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (let Class of owner.constructor.view_classes()) {
                    if (suffix in Class.prototype)
                        names.push($.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (let prefix of owner.view_names_owned()) {
                    names.push(prefix + suffix2);
                }
            }
            return names;
        }
        view_names() {
            const names = [];
            for (let name of this.view_names_owned()) {
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            for (let Class of this.constructor.view_classes()) {
                const name = $.$mol_func_name(Class);
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').replace(/^(?=\d)/, '_').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                'mol_view_error': false,
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return {};
        }
        plugins() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "content_height", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
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
    class $mol_state_local extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.localStorage;
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
        static value(key, next, force) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
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
    class $mol_locale extends $.$mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse($.$mol_file.relative(`web.locale=${lang}.json`).content().toString());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if (error instanceof $.$mol_atom_wait)
                    $.$mol_fail_hidden(error);
                const def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        }
        static text(key) {
            for (let lang of [this.lang(), 'en']) {
                const text = this.texts(lang)[key];
                if (text)
                    return text;
                console.warn(`Not translated to "${lang}": ${key}`);
            }
            return `<${key}>`;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "text", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(([node], sub) => (node.type === '-') ? null : node.clone({ sub: sub() }));
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        const props = {};
        const catch_prop = (prop, type = '') => {
            let def = prop;
            if (type === '=>') {
                if (prop.sub[0])
                    throw prop.error('Right binding can not have default value');
            }
            else {
                if (prop.sub.length === 0)
                    return;
                if (prop.sub[0].type === '-')
                    return;
                props[prop.type] = props[prop.type];
                def = prop.clone({
                    sub: [prop.sub[0].transform(([node, ...stack], sub) => {
                            if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                                return node.clone({ sub: sub() });
                            catch_prop(node.sub[0], node.type);
                            return node.clone({
                                sub: [node.sub[0].clone({
                                        sub: []
                                    })]
                            });
                        })]
                });
            }
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value' + props[prop.type].error('').message + '\n---');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(sub => catch_prop(sub));
        return def.clone({
            type: '',
            sub: Object.keys(props).map(name => props[name]),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error(`Wrong sub count (${prop.sub.length})`);
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        switch (val.type[0]) {
            case '/': return 'list';
            case '$': return 'object';
        }
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        var content = '';
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            var parent = def.sub[0];
            var propDefs = {};
            var members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needReturn = true;
                    var needCache = false;
                    var keys = [];
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    const getValue = (value) => {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return JSON.stringify(value.value);
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return `this.$.$mol_locale.text( ${JSON.stringify(key)} )`;
                                case (value.type === '-'):
                                    return null;
                                case (value.type[0] === '/'):
                                    const item_type = value.type.substring(1);
                                    var items = [];
                                    value.sub.forEach(item => {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push(`...super.${param.type}()`);
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val);
                                    });
                                    return `[].concat( ${items.join(' , ')} )` + (item_type ? ` as readonly ( ${item_type} )[]` : '');
                                case (value.type[0] === '$'):
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(over => {
                                        if (/^[-\/]?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                const [, own_name, own_key, own_next] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.sub[0].sub[0].type);
                                                let own_args = [];
                                                if (own_key)
                                                    own_args.push(` ${own_key} : any `);
                                                if (own_next)
                                                    own_args.push(` ${own_next}? : any `);
                                                let [, their_name, ...their_args] = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                                their_args = their_args.filter(Boolean);
                                                members[own_name] = `\t${own_name}(${own_args.join(',')}) {\n\t\treturn this.${param.type}().${their_name}( ${their_args.join(' , ')} )\n\t}\n\n`;
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                        needSet = ns;
                                    });
                                    const object_args = value.select('/', '').sub.map(arg => getValue(arg)).join(' , ');
                                    return '(( obj )=>{\n' + overs.join('') + '\t\t\treturn obj\n\t\t})( new this.$.' + value.type + '( ' + object_args + ' ) )';
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(opt => {
                                        if (opt.type === '-')
                                            return '';
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            return;
                                        }
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        keys.push(key[1]);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push('\t\t\t"' + key[1] + '" : ' + arg + ' ' + v + ' ,\n');
                                        needSet = ns;
                                    });
                                    return '({\n' + opts.join('') + '\t\t})';
                                case (value.type === '<=>'):
                                    needSet = true;
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )';
                                    }
                                    break;
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')';
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return value.type;
                                case 'null':
                                    return 'null as any';
                            }
                            if (Number(value.type).toString() == value.type)
                                return value.type;
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${value}`;
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(child => {
                        var val = getValue(child);
                        if (!val)
                            return;
                        propDefs[propName[1]] = param;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_atom_force `);
                        if (needSet && param.sub[0].type !== '<=>')
                            val = (needReturn ? `( ${propName[3]} !== void 0 ) ? ${propName[3]} : ` : `if( ${propName[3]} !== void 0 ) return ${propName[3]}\n\t\t`) + val;
                        if (needReturn)
                            val = 'return ' + val;
                        var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                        if (needCache) {
                            if (propName[2])
                                decl = '\t@ $' + 'mol_mem_key\n' + decl;
                            else
                                decl = '\t@ $' + 'mol_mem\n' + decl;
                        }
                        decl = '\t/**\n\t *  ```\n' + param.toString().trim().replace(/^/mg, '\t *  ') + '\n\t *  ```\n\t **/\n' + decl;
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${param}`;
                    throw err;
                }
            }
            var body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return null as any }\n\t}\n';
            }).join('');
            var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        }
        return { script: content, locales: locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_graph {
        constructor() {
            this.nodes = {};
            this.edgesOut = {};
            this.edgesIn = {};
        }
        nodeEnsure(id) {
            if (this.nodes.hasOwnProperty(id))
                return;
            this.nodes[id] = undefined;
        }
        linkOut(from, to, edge) {
            if (!this.edgesOut[from]) {
                this.edgesOut[from] = {};
                this.nodeEnsure(from);
            }
            this.edgesOut[from][to] = edge;
            this.nodeEnsure(to);
        }
        linkIn(to, from, edge) {
            if (!this.edgesIn[to]) {
                this.edgesIn[to] = {};
                this.nodeEnsure(to);
            }
            this.edgesIn[to][from] = edge;
            this.nodeEnsure(from);
        }
        edgeOut(from, to) {
            return this.edgesOut[from] && this.edgesOut[from][to];
        }
        edgeIn(to, from) {
            return this.edgesIn[to] && this.edgesIn[to][from];
        }
        link(from, to, edge) {
            this.linkOut(from, to, edge);
            this.linkIn(to, from, edge);
        }
        unlink(from, to) {
            delete this.edgesIn[to][from];
            delete this.edgesOut[from][to];
        }
        cut_cycles(get_weight) {
            const checked = [];
            for (const start in this.nodes) {
                const path = [];
                const visit = (from) => {
                    if (checked.includes(from))
                        return Number.POSITIVE_INFINITY;
                    const index = path.lastIndexOf(from);
                    if (index > -1) {
                        const cycle = path.slice(index);
                        return cycle.reduce((weight, id, index) => Math.min(weight, get_weight(this.edgesOut[id][cycle[(index + 1) % cycle.length]])), Number.POSITIVE_INFINITY);
                    }
                    path.push(from);
                    try {
                        const deps = this.edgesOut[from];
                        for (const to in deps) {
                            if (to === from) {
                                this.unlink(from, to);
                                continue;
                            }
                            const weight_out = get_weight(deps[to]);
                            const min = visit(to);
                            if (weight_out > min)
                                return min;
                            if (weight_out === min)
                                this.unlink(from, to);
                        }
                    }
                    finally {
                        path.pop();
                    }
                    checked.push(from);
                    return Number.POSITIVE_INFINITY;
                };
                visit(start);
            }
        }
        get sorted() {
            const sorted = [];
            const visit = (id) => {
                if (sorted.indexOf(id) !== -1)
                    return;
                for (const dep in this.edgesOut[id])
                    visit(dep);
                if (sorted.indexOf(id) !== -1)
                    return;
                sorted.push(id);
            };
            Object.keys(this.nodes).forEach(id => visit(id));
            return sorted;
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));
//graph.js.map
;
"use strict";
var $;
(function ($) {
    const sourcemap_codec = $node['sourcemap-codec'];
    const path = $node.path;
    class $mol_sourcemap_builder {
        constructor(file, separator = '') {
            this.file = file;
            this.separator = separator;
            this.version = 3;
            this.chunks = [];
            this.segment_lines = [];
            this.sources = [];
            this.source_indexes = new Map();
            this.names = [];
            this.name_indexes = new Map();
            this.sourceContent = [];
            const dir = path.dirname(file);
            this.sourceRoot = dir && dir !== '.' ? (dir + '/') : '';
            this.separator += '\n';
            this.separator_count = separator.split('\n').length - 2;
        }
        get content() {
            return this.chunks.join('');
        }
        get sourcemap() {
            return {
                version: this.version,
                sources: this.sources,
                names: this.names,
                sourceRoot: this.sourceRoot || undefined,
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
            const lines = sourcemap_codec.decode(raw.mappings);
            for (let line of lines) {
                const mergedLine = [];
                for (let segment of line) {
                    const mergedSegment = [segment[0]];
                    if (segment.length > 1) {
                        const [, sourceIndex] = segment;
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
                    if (segment.length > 2)
                        mergedSegment.push(segment[2]);
                    if (segment.length > 3)
                        mergedSegment.push(segment[3]);
                    if (segment.length > 4) {
                        const nameIndex = segment[4];
                        const name = raw.names[nameIndex];
                        let mergedNameIndex = name_indexes.get(name);
                        if (mergedNameIndex === undefined) {
                            mergedNameIndex = names.length;
                            name_indexes.set(name, mergedNameIndex);
                            names.push(name);
                        }
                        mergedSegment.push(mergedNameIndex);
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
//sourcemap.js.map
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
    function $mol_build_start(paths) {
        var build = $mol_build.relative('.');
        if (paths.length > 0) {
            try {
                process.argv.slice(2).forEach((path) => {
                    path = build.root().resolve(path).path();
                    return build.bundleAll({ path });
                });
                process.exit(0);
            }
            catch (_a) {
                process.exit(1);
            }
        }
        else {
            build.server().express();
        }
    }
    $.$mol_build_start = $mol_build_start;
    setTimeout(() => $mol_build_start(process.argv.slice(2)));
    class $mol_build extends $.$mol_object {
        static root(path) {
            return this.make({
                root: $.$mol_const($.$mol_file.absolute(path)),
            });
        }
        static relative(path) {
            return $mol_build.root($.$mol_file.relative(path).path());
        }
        server() {
            return $.$mol_build_server.make({
                build: $.$mol_const(this),
            });
        }
        root() {
            return $.$mol_file.relative('.');
        }
        mods({ path, exclude }) {
            const mods = [];
            $.$mol_file.absolute(path).sub()
                .forEach(child => {
                const name = child.name();
                if (!/^[a-z0-9]/i.test(name))
                    return false;
                if (exclude && RegExp('[.=](' + exclude.join('|') + ')[.]', 'i').test(name))
                    return false;
                if (/(meta\.tree)$/.test(name)) {
                    const tree = $.$mol_tree.fromString(child.content().toString(), child.path());
                    let content = '';
                    for (const step of tree.select('build', '').sub) {
                        const res = $.$mol_exec(child.parent().path(), step.value).stdout.toString().trim();
                        if (step.type)
                            content += `let ${step.type} = ${JSON.stringify(res)}`;
                    }
                    if (content) {
                        const script = child.parent().resolve(`-meta.tree/${child.name()}.ts`);
                        script.content(content);
                        mods.push(script);
                    }
                }
                else if (/(view\.tree)$/.test(name)) {
                    const script = child.parent().resolve(`-view.tree/${child.name()}.ts`);
                    const locale = child.parent().resolve(`-view.tree/${child.name()}.locale=en.json`);
                    const tree = $.$mol_tree.fromString(child.content().toString(), child.path());
                    const res = $.$mol_view_tree_compile(tree);
                    script.content(res.script);
                    locale.content(JSON.stringify(res.locales, null, '\t'));
                    mods.push(script, locale);
                }
                mods.push(child);
                return true;
            });
            return mods;
        }
        modsRecursive({ path, exclude }) {
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    var mods = [mod];
                    for (var m of this.mods({ path, exclude })) {
                        if (m.type() !== 'dir')
                            continue;
                        for (var dep of this.modsRecursive({ path: m.path(), exclude })) {
                            if (mods.indexOf(dep) !== -1)
                                continue;
                            mods.push(dep);
                        }
                    }
                    return mods;
                case null:
                    throw new Error(`Module not found: "${mod.relate()}"`);
            }
            throw new Error(`Unsopported type "${mod.type()}" of "${mod.relate()}"`);
        }
        sources({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    return this.mods({ path, exclude }).filter(mod => mod.type() === 'file');
                default:
                    return [];
            }
        }
        sourcesSorted({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            const graph = new $.$mol_graph();
            const sources = this.sources({ path, exclude });
            for (let src of sources) {
                graph.nodeEnsure(src.relate(this.root()));
            }
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let p in deps) {
                    var names;
                    if (p[0] === '/')
                        names = p.substring(1).split('/');
                    else if (p[0] === '.')
                        names = mod.resolve(p).relate(this.root()).split('/');
                    else
                        names = ['node_modules', ...p.split('/')];
                    let files = [this.root()];
                    for (let name of names) {
                        let nextFiles = [];
                        for (let file of files) {
                            let validName = new RegExp(`^(${file.name()})?${name}(?![a-z0-9])`, 'i');
                            for (let child of this.mods({ path: file.path(), exclude })) {
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
                        if (!(from in graph.nodes))
                            continue;
                        const to = file.relate(this.root());
                        if (!(to in graph.nodes))
                            continue;
                        graph.link(from, to, { priority: deps[p] });
                    }
                }
            }
            graph.cut_cycles(edge => edge.priority);
            let next = graph.sorted.map(name => this.root().resolve(name));
            return next;
        }
        sourcesAll({ path, exclude }) {
            const sortedPaths = this.graph({ path, exclude }).sorted;
            const sources = new Set();
            sortedPaths.forEach(path => {
                const mod = this.root().resolve(path);
                this.sourcesSorted({ path: mod.path(), exclude }).forEach(src => {
                    sources.add(src);
                });
            });
            return [...sources];
        }
        tsOptions() {
            const rawOptions = JSON.parse(this.root().resolve('tsconfig.json').content() + '').compilerOptions;
            const res = $node.typescript.convertCompilerOptionsFromJson(rawOptions, ".", 'tsconfig.json');
            if (res.errors.length)
                throw res.errors;
            return res.options;
        }
        tsSource({ path, target }) {
            const content = $.$mol_file.absolute(path).content().toString();
            return $node.typescript.createSourceFile(path, content, target);
        }
        tsPaths({ path, exclude, bundle }) {
            const sources = this.sourcesAll({ path, exclude }).filter(src => /tsx?$/.test(src.ext()));
            if (sources.length && bundle === 'node') {
                const types = [];
                for (let dep of this.nodeDeps({ path, exclude })) {
                    types.push('\t' + JSON.stringify(dep) + ' : typeof import( ' + JSON.stringify(dep) + ' )');
                }
                const node_types = $.$mol_file.absolute(path).resolve(`-node/deps.d.ts`);
                node_types.content('interface $node {\n ' + types.join('\n') + '\n}');
                sources.push(node_types);
            }
            return sources.map(src => src.path());
        }
        tsCompile({ path, exclude, bundle }) {
            const paths = this.tsPaths({ path, exclude, bundle });
            if (!paths.length)
                return null;
            var host = $node.typescript.createWatchCompilerHost(paths, this.tsOptions(), Object.assign(Object.assign({}, $node.typescript.sys), { setTimeout: (cb) => cb(), writeFile: (path, content) => {
                    $.$mol_file.relative(path).content(content, $.$mol_atom_force_cache);
                } }), $node.typescript.createEmitAndSemanticDiagnosticsBuilderProgram, (diagnostic) => {
                if (diagnostic.file) {
                    const file = $.$mol_file.absolute(diagnostic.file.fileName.replace(/\.tsx?$/, '.js'));
                    const error = new Error($node.typescript.formatDiagnostic(diagnostic, {
                        getCurrentDirectory: () => this.root().path(),
                        getCanonicalFileName: (path) => path.toLowerCase(),
                        getNewLine: () => '\n',
                    }));
                    file.content(error, $.$mol_atom_force_cache);
                }
                else {
                    console.error($node.colorette.red(diagnostic.messageText));
                }
            }, () => { });
            const builder = $node.typescript.createWatchProgram(host);
            return $.$mol_object.make({ destructor: () => { builder.updateRootFileNames([]); } });
        }
        sourcesJS({ path, exclude }) {
            var sources = this.sourcesAll({ path, exclude });
            const image_types = {
                'svg': 'image/svg+xml',
                'png': 'image/png',
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'gif': 'image/gif',
                'webp': 'image/webp',
            };
            sources = sources.map(src => {
                const ext = src.ext().replace(/^.*\./, '');
                if (image_types[ext]) {
                    const ext = src.ext();
                    const script = src.parent().resolve(`-image/${src.name()}.js`);
                    const payload = src.content().toString('base64');
                    const path = src.relate(this.root());
                    const uri = `data:${image_types[ext]};base64,${payload}`;
                    script.content(`var $node = $node || {} ; $node[ ${JSON.stringify('/' + path)} ] = ${JSON.stringify(uri)}\n`);
                    return script;
                }
                if (/^tsx?$/.test(ext)) {
                    return src.parent().resolve(src.name().replace(/\.tsx?$/, '.js'));
                }
                if ('js' === ext) {
                    return src;
                }
            }).filter(Boolean);
            return sources;
        }
        sourcesDTS({ path, exclude }) {
            let sources = this.sourcesAll({ path, exclude });
            sources = sources.filter(src => /(tsx?)$/.test(src.ext()));
            sources = sources.map(src => src.parent().resolve(src.name().replace(/(\.d)?\.tsx?$/, '.d.ts')));
            return sources;
        }
        sourcesCSS({ path, exclude }) {
            return this.sourcesAll({ path, exclude }).filter(src => /(css)$/.test(src.ext()));
        }
        srcDeps(path) {
            const src = $.$mol_file.absolute(path);
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
        modDeps({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            const depends = { '..': Number.MIN_SAFE_INTEGER };
            for (var src of this.sources({ path, exclude })) {
                $mol_build_depsMerge(depends, this.srcDeps(src.path()));
            }
            return depends;
        }
        dependencies({ path, exclude }) {
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return this.srcDeps(path);
                case 'dir':
                    return this.modDeps({ path, exclude });
                default:
                    return {};
            }
        }
        modEnsure(path) {
            $.$mol_atom_current().destructor = () => { };
            var mod = $.$mol_file.absolute(path);
            if (mod === this.root())
                return false;
            var parent = mod.parent();
            this.modEnsure(parent.path());
            var mapping = this.modMeta(parent.path());
            if (mod.exists()) {
                if (mod.type() === 'dir' && mod.resolve('.git').type() === 'dir') {
                    try {
                        process.stdout.write($.$mol_exec(mod.path(), 'git', '--no-pager', 'log', '--oneline', 'HEAD..origin/master').stdout);
                    }
                    catch (error) {
                        console.error($node.colorette.red(error.message));
                    }
                }
                return false;
            }
            for (let repo of mapping.select('pack', mod.name(), 'git').sub) {
                console.log('> git clone', repo.value, mod.path());
                $.$mol_exec(this.root().path(), 'git', 'clone', repo.value, mod.path());
                mod.stat(undefined, $.$mol_atom_force_cache);
                return true;
            }
            if (parent === this.root()) {
                throw new Error(`Root package "${mod.relate(this.root())}" not found`);
            }
            return false;
        }
        modMeta(path) {
            const decls = [];
            const pack = $.$mol_file.absolute(path);
            for (const file of pack.sub()) {
                if (!/\.meta\.tree$/.test(file.name()))
                    continue;
                decls.push(...$.$mol_tree.fromString(file.content().toString(), file.path()).sub);
            }
            return new $.$mol_tree({ sub: decls });
        }
        graph({ path, exclude }) {
            let graph = new $.$mol_graph();
            let added = {};
            var addMod = (mod) => {
                if (added[mod.path()])
                    return;
                added[mod.path()] = true;
                graph.nodes[mod.relate(this.root())] = null;
                const checkDep = (p) => {
                    var dep = (p[0] === '/')
                        ? this.root().resolve(p)
                        : (p[0] === '.')
                            ? mod.resolve(p)
                            : this.root().resolve('node_modules').resolve('./' + p);
                    try {
                        this.modEnsure(dep.path());
                    }
                    catch (error) {
                        throw new Error(`${error.message}\nDependency "${dep.relate(this.root())}" from "${mod.relate(this.root())}" `);
                    }
                    while (!dep.exists())
                        dep = dep.parent();
                    if (dep.type() === 'dir') {
                        let index = dep.resolve('index.js');
                        if (index.exists())
                            dep = index;
                    }
                    if (mod === dep)
                        return;
                    if (dep === this.root())
                        return;
                    const from = mod.relate(this.root());
                    const to = dep.relate(this.root());
                    const edge = graph.edgesOut[from] && graph.edgesOut[from][to];
                    if (!edge || (deps[p] > edge.priority)) {
                        graph.link(from, to, { priority: deps[p] });
                    }
                    addMod(dep);
                };
                let deps = this.dependencies({ path: mod.path(), exclude });
                for (let p in deps) {
                    checkDep(p);
                }
            };
            this.modEnsure(path);
            addMod($.$mol_file.absolute(path));
            graph.cut_cycles(edge => edge.priority);
            return graph;
        }
        bundleAll({ path }) {
            const once = (action) => {
                const task = new $.$mol_atom('$mol_build_start', action);
                task.value();
                task.destructor();
                $.$mol_atom.sync();
            };
            once(() => {
                this.bundle({ path, bundle: 'web.deps.json' });
                this.bundle({ path, bundle: 'web.css' });
                this.bundle({ path, bundle: 'web.js' });
                this.bundle({ path, bundle: 'web.test.js' });
                this.bundle({ path, bundle: 'web.test.html' });
                this.bundle({ path, bundle: 'web.d.ts' });
                this.bundle({ path, bundle: 'web.view.tree' });
                this.bundle({ path, bundle: 'web.locale=en.json' });
            });
            once(() => {
                this.bundle({ path, bundle: 'node.deps.json' });
                this.bundle({ path, bundle: 'node.js' });
                this.bundle({ path, bundle: 'node.test.js' });
                this.bundle({ path, bundle: 'node.d.ts' });
                this.bundle({ path, bundle: 'node.view.tree' });
                this.bundle({ path, bundle: 'node.locale=en.json' });
            });
            this.bundle({ path, bundle: 'package.json' });
            this.bundleFiles({ path, exclude: ['node'] });
            this.bundleCordova({ path, exclude: ['node'] });
        }
        bundle({ path, bundle = '' }) {
            bundle = bundle && bundle.replace(/\.map$/, '');
            var envsDef = ['web', 'node'];
            var envs = bundle ? [] : envsDef.slice();
            var stages = ['test', 'dev'];
            var moduleTargets = ['', 'esm'];
            if (bundle) {
                var [bundle, tags, type, locale] = /^(.*?)(?:\.(test\.js|test\.html|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(bundle);
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
                    moduleTargets.forEach(moduleTarget => {
                        res = res.concat(this.bundleJS({ path, exclude, bundle: env, moduleTarget }));
                    });
                }
                if (!type || type === 'test.js') {
                    res = res.concat(this.bundleTestJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'test.html') {
                    res = res.concat(this.bundleTestHtml({ path }));
                }
                if (!type || type === 'd.ts') {
                    res = res.concat(this.bundleDTS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'view.tree') {
                    res = res.concat(this.bundleViewTree({ path, exclude, bundle: env }));
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
                res = res.concat(this.bundlePackageJSON({ path, exclude: ['web'] }));
            }
            return res.map(r => r.valueOf());
        }
        logBundle(target, duration) {
            const path = $node.colorette.green(target.relate(this.root()));
            const time = $node.colorette.cyan(`${duration.toString().padStart(5)}ms`);
            console.log(`Built in ${time}: ${path}`);
        }
        bundleJS({ path, exclude, bundle, moduleTarget }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var mt = moduleTarget ? `.${moduleTarget}` : '';
            var target = pack.resolve(`-/${bundle}${mt}.js`);
            var targetMap = pack.resolve(`-/${bundle}${mt}.js.map`);
            var sources = this.sourcesJS({ path, exclude });
            if (sources.length === 0)
                return [];
            this.tsCompile({ path, exclude, bundle });
            var concater = new $.$mol_sourcemap_builder(target.name(), ';');
            if (bundle === 'node') {
                concater.add('require' + '( "source-map-support" ).install(); var exports = void 0;\n');
                concater.add("process.on( 'unhandledRejection' , up => { throw up } )");
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
            }
            const errors = [];
            sources.forEach((src) => {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(this.root()))) {
                        return;
                    }
                }
                try {
                    const content = (src.content() || '').toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//') + '\n';
                    const isCommonJs = /module\.exports/.test(content);
                    if (isCommonJs) {
                        concater.add(`\nvar $node = $node || {}\nvoid function( module ) { var exports = module.${''}exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "' + src.parent().relate( this.root().resolve( 'node_modules' ) ) + '/" ) + ".js" ] }; \n`, '-');
                    }
                    const srcMap = src.parent().resolve(src.name() + '.map').content();
                    if (content)
                        concater.add(content, src.relate(target.parent()), srcMap + '');
                    if (isCommonJs) {
                        const idFull = src.relate(this.root().resolve('node_modules'));
                        const idShort = idFull.replace(/\/index\.js$/, '');
                        concater.add(`\n$${''}node[ "${idShort}" ] = $${''}node[ "${idFull}" ] = module.${''}exports }.call( {} , {} )\n`, '-');
                    }
                }
                catch (error) {
                    errors.push(error);
                }
            });
            if (moduleTarget === 'esm') {
                concater.add('export default $', '-');
            }
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()) + '\n');
            targetMap.content(concater.toString());
            this.logBundle(target, Date.now() - start);
            if (errors.length)
                $.$mol_fail_hidden(new Error(errors.map(error => error.message).join('\n')));
            return [target, targetMap];
        }
        bundleTestJS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var root = this.root();
            var target = pack.resolve(`-/${bundle}.test.js`);
            var targetMap = pack.resolve(`-/${bundle}.test.js.map`);
            var concater = new $.$mol_sourcemap_builder(target.name(), ';');
            var exclude_ext = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            var sources = this.sourcesJS({ path, exclude: exclude_ext });
            var sourcesNoTest = this.sourcesJS({ path, exclude });
            var sourcesTest = sources.filter(src => sourcesNoTest.indexOf(src) === -1);
            if (bundle === 'node') {
                concater.add('require' + '( "source-map-support" ).install()\n');
                concater.add("process.on( 'unhandledRejection' , up => { throw up } )");
                sources = [...sourcesNoTest, ...sourcesTest];
            }
            else {
                concater.add('function require' + '( path ){ return $node[ path ] }');
                sources = sourcesTest;
            }
            if (sources.length === 0)
                return [];
            this.tsCompile({ path, exclude: exclude_ext, bundle });
            const errors = [];
            sources.forEach(function (src) {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(root))) {
                        return;
                    }
                }
                let content = '';
                try {
                    content = (src.content() || '').toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//') + '\n';
                    const srcMap = src.parent().resolve(src.name() + '.map').content();
                    if (content)
                        concater.add(content, src.relate(target.parent()), srcMap + '');
                }
                catch (error) {
                    errors.push(error);
                }
            });
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()) + '\n');
            targetMap.content(concater.toString());
            this.logBundle(target, Date.now() - start);
            if (errors.length)
                $.$mol_fail_hidden(new Error(errors.map(error => error.message).join('\n')));
            return [target, targetMap];
        }
        bundleTestHtml({ path }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var source = pack.resolve(`index.html`);
            var target = pack.resolve(`-/web.test.html`);
            const content = `
<!doctype html>
<meta charset="utf-8" />
<body>
<script src="web.js" charset="utf-8"></script>
<script>
	addEventListener( 'load' , function() {
		var script = document.createElement( 'script' )
		script.src = 'web.test.js'
		document.body.appendChild( script )
	} )
</script>
`;
            target.content(content);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleDTS({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.d.ts`);
            var sources = this.sourcesDTS({ path, exclude });
            if (sources.length === 0)
                return [];
            var concater = new $.$mol_sourcemap_builder(target.name());
            sources.forEach(function (src) {
                if (!src.content())
                    return;
                concater.add(src.content().toString(), src.relate(target.parent()));
            });
            target.content(concater.content);
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleViewTree({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.view.tree`);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /view.tree$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            target.content(sources.map(src => src.content().toString()).join('\n'));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        nodeDeps({ path, exclude }) {
            var res = new Set();
            var sources = this.sourcesAll({ path, exclude });
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let dep in deps) {
                    if (!/^\/node(?:_modules)?\//.test(dep))
                        continue;
                    let mod = dep.replace(/^\/node(?:_modules)?\//, '').replace(/\/.*/g, '');
                    res.add(mod);
                }
            }
            return [...res];
        }
        bundlePackageJSON({ path, exclude }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/package.json`);
            exclude = exclude.filter(ex => ex !== 'test' && ex !== 'dev');
            var sources = this.sourcesAll({ path, exclude });
            var json;
            try {
                $.$mol_atom_fence(() => json = target.exists() && JSON.parse(target.content().toString()));
            }
            catch (error) {
                console.error($node.colorette.yellow(error));
            }
            if (!json)
                json = {
                    name: pack.relate(this.root()).replace(/\//g, '_'),
                    version: '0.0.0',
                    main: 'node.js',
                    module: 'node.esm.js',
                    browser: 'web.esm.js',
                    types: 'web.d.ts',
                    dependencies: {}
                };
            json.version = json.version.replace(/\d+$/, (build) => parseInt(build) + 1);
            json.dependencies = {};
            for (let dep of this.nodeDeps({ path, exclude })) {
                if (require('module').builtinModules.includes(dep))
                    continue;
                json.dependencies[dep] = `*`;
            }
            target.content(JSON.stringify(json, null, '  '));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
        bundleFiles({ path, exclude }) {
            const root = this.root();
            const pack = $.$mol_file.absolute(path);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /meta.tree$/.test(src.ext()));
            const targets = [];
            const start = Date.now();
            const html = pack.resolve('index.html');
            const html_target = pack.resolve('-/index.html');
            html_target.content(html.content());
            targets.push(html_target);
            this.logBundle(html_target, Date.now() - start);
            sources.forEach(source => {
                const tree = $.$mol_tree.fromString(source.content().toString(), source.path());
                tree.select('deploy').sub.forEach(deploy => {
                    const start = Date.now();
                    const file = root.resolve(deploy.value.replace(/^\//, ''));
                    const target = pack.resolve(`-/${file.relate(root)}`);
                    target.content(file.content());
                    targets.push(target);
                    this.logBundle(target, Date.now() - start);
                });
            });
            return targets;
        }
        bundleCordova({ path, exclude }) {
            const start = Date.now();
            const pack = $.$mol_file.absolute(path);
            const cordova = pack.resolve('-cordova');
            const config = pack.resolve('config.xml');
            if (!config.exists())
                return [];
            const config_target = cordova.resolve('config.xml');
            config_target.content(config.content());
            const html = pack.resolve('index.html');
            const html_target = cordova.resolve('www/index.html');
            html_target.content(html.content());
            const sources = pack.resolve('-').find().filter(src => src.type() === 'file');
            const targets = [config_target, html_target]
                .concat(sources.map(source => {
                const target = cordova.resolve(`www/${source.relate(pack)}`);
                target.content(source.content());
                return target;
            }));
            this.logBundle(cordova, Date.now() - start);
            return targets;
        }
        bundleCSS({ path, exclude, bundle }) {
            if (bundle === 'node')
                return [];
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var sources = this.sourcesCSS({ path, exclude });
            if (!sources.length)
                return [];
            var target = pack.resolve(`-/${bundle}.css`);
            var targetMap = pack.resolve(`-/${bundle}.css.map`);
            var root = null;
            sources.forEach(src => {
                var root2 = $node['postcss'].parse(src.content(), { from: src.path() });
                root = root ? root.append(root2) : root2;
            });
            var processor = $node['postcss']([
                $node['postcss-custom-properties']({
                    preserve: true,
                }),
                $node['postcss-color-function'](),
            ]);
            var result = processor.process(root, { to: target.relate(), map: { inline: false } });
            target.content(result.css);
            targetMap.content(JSON.stringify(result.map, null, '\t'));
            this.logBundle(target, Date.now() - start);
            return [target, targetMap];
        }
        bundleLocale({ path, exclude, bundle }) {
            const pack = $.$mol_file.absolute(path);
            const sources = this.sourcesAll({ path, exclude }).filter(src => /(locale=(\w+)\.json)$/.test(src.name()));
            if (!sources.length)
                return [];
            const locales = {};
            sources.forEach(src => {
                const [ext, lang] = /locale=(\w+)\.json$/.exec(src.name());
                if (!locales[lang])
                    locales[lang] = {};
                const loc = JSON.parse(src.content().toString());
                for (let key in loc) {
                    locales[lang][key] = loc[key];
                }
            });
            const targets = Object.keys(locales).map(lang => {
                const start = Date.now();
                const target = pack.resolve(`-/${bundle}.locale=${lang}.json`);
                const locale = locales[lang];
                if (lang !== 'en' && locales['en']) {
                    for (let key in locale) {
                        if (key in locales['en'])
                            continue;
                        console.warn($node.colorette.yellow(`Not translated to "en": ${$node.colorette.cyan(key)}`));
                    }
                }
                const locale_sorted = {};
                for (let key of Object.keys(locale).sort()) {
                    locale_sorted[key] = locale[key];
                }
                target.content(JSON.stringify(locale_sorted, null, '\t'));
                this.logBundle(target, Date.now() - start);
                return target;
            });
            return targets;
        }
        bundleDepsJSON({ path, exclude, bundle }) {
            const start = Date.now();
            var pack = $.$mol_file.absolute(path);
            var list = this.sourcesAll({ path, exclude });
            if (!list.length)
                return [];
            var origs = list.filter(src => !/\/-/.test(src.path()));
            var sloc = {};
            for (const src of origs) {
                const ext = src.name().replace(/^.*\./, '');
                const count = src.content().toString().trim().split(/[\n\r]\s*/).length;
                sloc[ext] = (sloc[ext] || 0) + count;
            }
            var graph = this.graph({ path, exclude });
            var deps = {};
            for (let dep in graph.nodes) {
                deps[dep] = this.dependencies({ path: this.root().resolve(dep).path(), exclude });
            }
            var data = {
                files: list.map(src => src.relate(this.root())),
                edgesIn: graph.edgesIn,
                edgesOut: graph.edgesOut,
                sloc,
                deps
            };
            var target = pack.resolve(`-/${bundle}.deps.json`);
            target.content(JSON.stringify(data));
            this.logBundle(target, Date.now() - start);
            return [target];
        }
    }
    $mol_build.dependors = {};
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "server", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "mods", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modsRecursive", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sources", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesSorted", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesAll", null);
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "tsOptions", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "tsSource", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "tsPaths", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "tsCompile", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesDTS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesCSS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "srcDeps", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modDeps", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "dependencies", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modEnsure", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modMeta", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "graph", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleTestJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleTestHtml", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleDTS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleViewTree", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "nodeDeps", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundlePackageJSON", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleFiles", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleCordova", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleCSS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleLocale", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleDepsJSON", null);
    __decorate([
        $.$mol_mem_key
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
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
                if (!/\.[^\/]$/.test(path))
                    path += '.js';
                if (path[0] === '.')
                    path = '../' + path;
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['ts'] = $mol_build.dependors['tsx'] = $mol_build.dependors['jam.js'] = source => {
        var depends = {};
        var lines = String(source.content())
            .replace(/\/\*(?!\*)[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\$([a-z0-9]{2,})(?:((?:[._A-Z0-9][a-z0-9]+)+)|\[\s*['"]([^'"]+?)['"]\s*\])?/g, (str, pack, path, name) => {
                if (path)
                    path = '/' + pack + path.replace(/(?=[A-Z])/g, '_').toLowerCase().replace(/[_.\[\]'"]+/g, '/');
                if (name)
                    name = '/' + pack + '/' + name;
                pack = '/' + pack;
                $mol_build_depsMerge(depends, { [path || name || pack]: priority });
                return str;
            });
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
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
    $mol_build.dependors['css'] = $mol_build.dependors['view.css'] = source => {
        var depends = {};
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/(?:--|[\[\.#])([a-z][a-z0-9]+(?:[-_][a-z0-9]+)+)/ig, (str, name) => {
                $mol_build_depsMerge(depends, { ['/' + name.replace(/[._-]/g, '/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['meta.tree'] = source => {
        const depends = {};
        const tree = $.$mol_tree.fromString(source.content().toString(), source.path());
        tree.select('require').sub.forEach(leaf => {
            depends[leaf.value] = 0;
        });
        tree.select('include').sub.forEach(leaf => {
            depends[leaf.value] = -9000;
        });
        return depends;
    };
})($ || ($ = {}));
//build.node.js.map
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
    class $mol_server extends $.$mol_object {
        express() {
            var express = $node['express']();
            this.expressHandlers().forEach(plugin => express.use(plugin));
            $node['portastic'].find({
                min: this.port(),
                max: this.port() + 1000,
                retrieve: 1
            }).then((ports) => {
                express.listen(ports[0]);
                console.log(this.messageStart(ports[0]));
            });
            return express;
        }
        messageStart(port) {
            return `${this} started at http://127.0.0.1:${port}/`;
        }
        expressHandlers() {
            return [].concat.apply([], [
                this.expressCompressor(),
                this.expressBodier(),
                this.expressGenerator(),
                this.expressFiler(),
                this.expressDirector(),
            ]);
        }
        expressCompressor() {
            return $node['compression']();
        }
        expressBodier() {
            return $node['body-parser'].json({
                limit: this.bodyLimit()
            });
        }
        expressFiler() {
            return $node['express'].static($node.path.resolve(this.rootPublic()), {
                maxAge: this.cacheTime()
            });
        }
        expressDirector() {
            return $node['serve-index'](this.rootPublic(), { icons: true });
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
        $.$mol_mem
    ], $mol_server.prototype, "express", null);
    $.$mol_server = $mol_server;
})($ || ($ = {}));
//server.node.js.map
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
    class $mol_build_server extends $.$mol_server {
        expressGenerator() {
            return (req, res, next) => {
                try {
                    return this.generator(req.url).valueOf() && next();
                }
                catch (error) {
                    if (req.url.match(/\.js$/)) {
                        res.send(`console.error( ${JSON.stringify(error.message)} )`).end();
                    }
                    else if (req.url.match(/\.css$/)) {
                        const message = JSON.stringify(error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                            .replace(/\\n/g, '\\a')
                            .replace(/\\t/g, '\\9');
                        res.setHeader('content-type', 'text/css');
                        res.send(`body:before{ display: block; font: 1em monospace; white-space: pre-wrap; color: red; content : ${message} }`).end();
                    }
                    else {
                        throw error;
                    }
                }
            };
        }
        build() {
            return $.$mol_fail(new Error('Not implemented'));
        }
        generator(path) {
            var matched = path.match(/^((?:\/\w+)+)\/-\/(\w+(?:.\w+)+)$/);
            if (!matched)
                return [];
            var build = this.build();
            var [path, path, bundle] = matched;
            path = build.root().resolve(path).path();
            try {
                return build.bundle({ path, bundle });
            }
            finally {
                build.bundleFiles({ path, exclude: ['node'] });
            }
        }
        port() {
            return 9080;
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_build_server.prototype, "generator", null);
    $.$mol_build_server = $mol_build_server;
})($ || ($ = {}));
//server.node.js.map
;
export default $
//# sourceMappingURL=node.esm.js.map
