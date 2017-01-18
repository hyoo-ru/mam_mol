/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                if (next == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', next);
                }
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = sessionStorage.getItem('$mol_log.filter()');
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.web.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            var self = this;
            return self['name']
                || self['displayName']
                || (self['displayName'] = Function.prototype.toString.call(self)
                    .match(/^function ([a-z0-9_$]*)/)[1]);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (field === void 0) { field = 'value()'; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field || 'value()';
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this['destroyed()'] = true;
                this.log(['.destroyed()', true, 'atom']);
                this.status = $mol_atom_status.obsolete;
                return true;
            }
            else {
                return this['destroyed()'];
            }
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field;
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
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
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            this._next = next;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host;
            var prev = host[this.field];
            if (next === void null)
                next = prev;
            comparing: if ((next !== prev) && (next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next['length']; ++i) {
                    if (next[i] !== prev[i])
                        break comparing;
                }
                next = prev;
            }
            if (prev !== next) {
                if (next instanceof $.$mol_object) {
                    next['object_field'](this.field);
                    next['object_owner'](host);
                }
                if ((typeof Proxy === 'function') && (next instanceof Error)) {
                    next = new Proxy(next, {
                        get: function (target) {
                            throw target.valueOf();
                        },
                        ownKeys: function (target) {
                            throw target.valueOf();
                        },
                    });
                }
                host[this.field] = next;
                this.log(['push', next, prev]);
                this.obsolete_slaves();
            }
            this.status = $mol_atom_status.actual;
            this._next = void null;
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(host, handler) {
        var atom = new $mol_atom(host, function () {
            try {
                handler();
            }
            catch (error) {
                if (!(error instanceof $mol_atom_wait))
                    atom.destroyed(true);
                throw error;
            }
            atom.destroyed(true);
        });
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        return $mol_window;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(null);
    });
})($ || ($ = {}));
//window.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context = {};
    $.$mol_view_context.$mol_view_visible_width = function () { return $.$mol_window.size().width; };
    $.$mol_view_context.$mol_view_visible_height = function () { return $.$mol_window.size().height; };
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            return _super.apply(this, arguments) || this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.state_prefix = function () {
            return '';
        };
        $mol_view.prototype.state_prefix = function () {
            var owner = this.object_owner();
            return owner ? owner.state_prefix() : '';
        };
        $mol_view.prototype.state_key = function (postfix) {
            return this.state_prefix() + postfix;
        };
        $mol_view.prototype.context = function (next) {
            return next || $.$mol_view_context;
        };
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.dom_name = function () { return 'div'; };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_height = function () {
            return 0;
        };
        $mol_view.prototype.minimal_width = function () {
            return 0;
        };
        $mol_view.prototype.dom_node = function (next) {
            var _this = this;
            var path = this.toString();
            var next2 = next;
            if (!next2) {
                next2 = this['dom_node()'];
                if (next2)
                    return next2;
                next2 = document.getElementById(path);
                if (next2) {
                    if (next2['$mol_view']) {
                        return this['dom_node()'] = next2;
                    }
                }
                else {
                    next2 = document.createElementNS(this.dom_name_space(), this.dom_name());
                }
            }
            next2.id = path;
            void (next2['$mol_view'] = this);
            this['dom_node()'] = next2;
            var ownerProto = this.object_owner() && Object.getPrototypeOf(this.object_owner());
            if (ownerProto) {
                var suffix = this.object_field().replace(/\(.*/, '');
                var suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                while (ownerProto && (ownerProto instanceof $mol_view) && (suffix in ownerProto)) {
                    var attrName = ownerProto.constructor.toString().replace(/\$/g, '') + suffix2;
                    next2.setAttribute(attrName, '');
                    ownerProto = Object.getPrototypeOf(ownerProto);
                }
            }
            var proto = Object.getPrototypeOf(this);
            while (proto) {
                var attrName = proto.constructor.toString().replace(/\$/g, '').toLowerCase();
                next2.setAttribute(attrName, '');
                if (!(proto instanceof $mol_view))
                    break;
                proto = Object.getPrototypeOf(proto);
            }
            var events = this.event();
            var _loop_1 = function (name_1) {
                var handle = events[name_1];
                next2.addEventListener(name_1, function (event) {
                    $.$mol_atom_task(_this + ".event()['" + name_1 + "']", function () {
                        handle(event);
                    }).get();
                });
            };
            for (var name_1 in events) {
                _loop_1(name_1);
            }
            return next2;
        };
        $mol_view.render_sub = function (node, sub) {
            if (sub == null)
                return;
            var nextNode = node.firstChild;
            for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                var view = sub_1[_i];
                if (view == null) {
                }
                else if (typeof view === 'object') {
                    var existsNode = ((view instanceof $mol_view) ? view.dom_node() : view.valueOf());
                    while (true) {
                        if (!nextNode) {
                            node.appendChild(existsNode);
                            break;
                        }
                        if (nextNode == existsNode) {
                            nextNode = nextNode.nextSibling;
                            break;
                        }
                        else {
                            node.insertBefore(existsNode, nextNode);
                            break;
                        }
                    }
                }
                else {
                    if (nextNode && nextNode.nodeName === '#text') {
                        nextNode.nodeValue = String(view);
                        nextNode = nextNode.nextSibling;
                    }
                    else {
                        var textNode = document.createTextNode(String(view));
                        node.insertBefore(textNode, nextNode);
                    }
                }
            }
            while (nextNode) {
                var currNode = nextNode;
                nextNode = currNode.nextSibling;
                node.removeChild(currNode);
            }
            for (var _a = 0, sub_2 = sub; _a < sub_2.length; _a++) {
                var view = sub_2[_a];
                if (view instanceof $mol_view) {
                    try {
                        view.dom_tree();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        };
        $mol_view.render_attr = function (node, attrs) {
            for (var name_2 in attrs) {
                var val = attrs[name_2]();
                if ((val == null) || (val === false)) {
                    node.removeAttribute(name_2);
                }
                else if (val === true) {
                    node.setAttribute(name_2, 'true');
                }
                else {
                    node.setAttribute(name_2, String(val));
                }
            }
        };
        $mol_view.render_style = function (node, styles) {
            for (var name_3 in styles) {
                var val = styles[name_3]();
                if (typeof val === 'number')
                    val = val + "px";
                var style = node.style;
                style[name_3] = val;
            }
        };
        $mol_view.render_field = function (node, field) {
            var _loop_2 = function (key) {
                var val = field[key]();
                node[key] = val;
                if (node[key] !== val) {
                    node[key] = val;
                    if (node[key] !== val) {
                        new $.$mol_defer(function () { return field[key](node[key]); });
                    }
                }
            };
            for (var key in field) {
                _loop_2(key);
            }
        };
        $mol_view.prototype.dom_tree = function () {
            var node = this.dom_node();
            try {
                $mol_view.render_sub(node, this.sub_visible());
                $mol_view.render_attr(node, this.attr());
                $mol_view.render_style(node, this.style());
                $mol_view.render_field(node, this.field());
                return node;
            }
            catch (error) {
                if (!error['$mol_view_catched']) {
                    node.setAttribute('mol_view_error', error.name);
                    error['$mol_view_catched'] = true;
                }
                throw error;
            }
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': function () { return false; }
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () { return {}; };
        $mol_view.prototype.locale_contexts = function () {
            var contexts = [];
            var proto = Object.getPrototypeOf(this);
            while (proto && (proto instanceof $mol_view)) {
                contexts.push(proto.constructor.toString());
                proto = Object.getPrototypeOf(proto);
            }
            return contexts;
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_view_root]');
        var _loop_1 = function (i) {
            var view = $[nodes.item(i).getAttribute('mol_view_root')].Root(i);
            view.dom_node(nodes.item(i));
            var win = new $.$mol_atom("$mol_view.Root(" + i + ")", function () {
                view.dom_tree();
                document.title = view.title();
                return null;
            });
            new $.$mol_defer(function () { return win.get(); });
        };
        for (var i = nodes.length - 1; i >= 0; --i) {
            _loop_1(i);
        }
        $.$mol_defer.run();
    });
})($ || ($ = {}));
//view.web.js.map
;
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        var result = {};
        for (var key in target)
            result[key] = target[key];
        for (var key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                sessionStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function (val) { return _this.scroll_top(val); },
                "scrollLeft": function (val) { return _this.scroll_left(val); },
            });
        };
        $mol_scroll.prototype.event_scroll = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (event) { return _this.event_scroll(event); },
                "overflow": function (event) { return _this.event_scroll(event); },
                "underflow": function (event) { return _this.event_scroll(event); },
            });
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context.$mol_scroll_scroll_top = function () { return 0; };
    $.$mol_view_context.$mol_scroll_scroll_left = function () { return 0; };
    $.$mol_view_context.$mol_scroll_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                return _super.apply(this, arguments) || this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_top(Math.max(0, el.scrollTop));
                    _this.scroll_left(Math.max(0, el.scrollLeft));
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - el.scrollTop - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - el.scrollLeft - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                var _this = this;
                if (next) {
                    setTimeout(function () {
                        _this.moving(false);
                    });
                }
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next) {
            if (next)
                history.replaceState(history.state, document.title, "" + next);
            return window.location.search + window.location.hash;
        };
        $mol_state_arg.dict = function (next) {
            var href = this.href(next && this.make(next));
            var chunks = href.split(/[\/\?#!&;]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            var nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), (_a = {}, _a[key] = next, _a));
            return this.dict(nextDict)[key] || null;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            return this.make($.$mol_merge_dict(this.dict(), next));
        };
        $mol_state_arg.make = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            var hash = chunks.join('#');
            return hash ? '#' + hash + '#' : '#';
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        return $mol_state_arg;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
    window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(null); });
})($ || ($ = {}));
//arg.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_stack = (function (_super) {
        __extends($mol_stack, _super);
        function $mol_stack() {
            return _super.apply(this, arguments) || this;
        }
        $mol_stack.prototype.side = function () {
            return false;
        };
        $mol_stack.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_stack_side": function () { return _this.side(); },
            });
        };
        $mol_stack.prototype.main = function () {
            return [];
        };
        $mol_stack.prototype.Main = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.main(); };
            });
        };
        $mol_stack.prototype.addon = function () {
            return [];
        };
        $mol_stack.prototype.Addon = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.addon(); };
            });
        };
        $mol_stack.prototype.sub = function () {
            return [].concat(this.Main(), this.Addon());
        };
        return $mol_stack;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_stack.prototype, "Main", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stack.prototype, "Addon", null);
    $.$mol_stack = $mol_stack;
})($ || ($ = {}));
//stack.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_stack = (function (_super) {
            __extends($mol_stack, _super);
            function $mol_stack() {
                return _super.apply(this, arguments) || this;
            }
            $mol_stack.prototype.side = function (next) {
                if (!this.main())
                    return true;
                if (this.main().length === 0)
                    return true;
                var arg = (next === void 0) ? void 0 : next ? '' : null;
                return $.$mol_state_arg.value(this.state_key('side'), arg) != null;
            };
            return $mol_stack;
        }($.$mol_stack));
        $mol.$mol_stack = $mol_stack;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stack.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_list = (function (_super) {
        __extends($mol_list, _super);
        function $mol_list() {
            return _super.apply(this, arguments) || this;
        }
        $mol_list.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "minHeight": function () { return _this.minimal_height(); },
            });
        };
        $mol_list.prototype.rows = function () {
            return [];
        };
        $mol_list.prototype.sub = function () {
            return this.rows();
        };
        return $mol_list;
    }($.$mol_view));
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_list = (function (_super) {
            __extends($mol_list, _super);
            function $mol_list() {
                return _super.apply(this, arguments) || this;
            }
            $mol_list.prototype.row_offsets = function () {
                var sub = this.sub();
                if (!sub)
                    return null;
                var heightLimit = this.context().$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_list.prototype.row_context = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_view_visible_height = function () {
                    var limit = context.$mol_view_visible_height();
                    return limit - _this.row_offsets()[index];
                };
                return next;
            };
            $mol_list.prototype.sub_visible = function () {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.context(this.row_context(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_list.prototype.minimal_height = function () {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(function (child) {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            };
            return $mol_list;
        }($.$mol_list));
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "sub_visible", null);
        $mol.$mol_list = $mol_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//list.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_float = (function (_super) {
        __extends($mol_float, _super);
        function $mol_float() {
            return _super.apply(this, arguments) || this;
        }
        $mol_float.prototype.shiftStyle = function () {
            return "";
        };
        $mol_float.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "transform": function () { return _this.shiftStyle(); },
            });
        };
        $mol_float.prototype.scrolling = function () {
            return false;
        };
        $mol_float.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_float_scrolling": function () { return _this.scrolling(); },
            });
        };
        return $mol_float;
    }($.$mol_view));
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//float.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_float = (function (_super) {
            __extends($mol_float, _super);
            function $mol_float() {
                return _super.apply(this, arguments) || this;
            }
            $mol_float.prototype.shiftStyle = function () {
                var context = this.context();
                var offset = context.$mol_scroll_scroll_top();
                return "translateY(" + offset + "px)";
            };
            $mol_float.prototype.scrolling = function () {
                return this.context().$mol_scroll_moving();
            };
            return $mol_float;
        }($.$mol_float));
        $mol.$mol_float = $mol_float;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//float.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event) {
            return this.event_click(event);
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (event) { return _this.event_activate(event); },
            });
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
                "role": function () { return "button"; },
                "tabindex": function () { return _this.tab_index(); },
            });
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.checked = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_check_checked": function () { return _this.checked(); },
                "aria-checked": function () { return _this.checked(); },
                "role": function () { return "checkbox"; },
            });
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [];
        };
        $mol_check.prototype.Label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        return $mol_check;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "Label", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
            };
            return $mol_check;
        }($.$mol_check));
        $mol.$mol_check = $mol_check;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.viewBox = function () {
            return "0 0 100 100 ";
        };
        $mol_svg_root.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "viewBox": function () { return _this.viewBox(); },
            });
        };
        return $mol_svg_root;
    }($.$mol_view));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        $mol_svg_path.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "d": function () { return _this.geometry(); },
            });
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.radius = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "r": function () { return _this.radius(); },
                "cx": function () { return _this.pos_x(); },
                "cy": function () { return _this.pos_y(); },
            });
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.viewBox = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "viewBox": function () { return _this.viewBox(); },
            });
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.pather = function () {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.pather());
        };
        return $mol_icon;
    }($.$mol_svg));
    __decorate([
        $.$mol_mem()
    ], $mol_icon.prototype, "pather", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_tick.prototype.path = function () {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        };
        return $mol_icon_tick;
    }($.$mol_icon));
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_box = (function (_super) {
        __extends($mol_check_box, _super);
        function $mol_check_box() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box.prototype.Icon = function () {
            return new $.$mol_icon_tick();
        };
        return $mol_check_box;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_chevron = (function (_super) {
        __extends($mol_icon_chevron, _super);
        function $mol_icon_chevron() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_chevron.prototype.path = function () {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        };
        return $mol_icon_chevron;
    }($.$mol_icon));
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_expand = (function (_super) {
        __extends($mol_check_expand, _super);
        function $mol_check_expand() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_expand.prototype.Icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_check_expand.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        $mol_check_expand.prototype.level = function () {
            return 0;
        };
        $mol_check_expand.prototype.level_style = function () {
            return "0px";
        };
        $mol_check_expand.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "paddingLeft": function () { return _this.level_style(); },
            });
        };
        $mol_check_expand.prototype.expanded = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_check_expand.prototype.checked = function (val) {
            return this.expanded(val);
        };
        $mol_check_expand.prototype.expandable = function () {
            return false;
        };
        $mol_check_expand.prototype.enabled = function () {
            return this.expandable();
        };
        return $mol_check_expand;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "expanded", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check_expand.prototype, "checked", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//expand.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check_expand = (function (_super) {
            __extends($mol_check_expand, _super);
            function $mol_check_expand() {
                return _super.apply(this, arguments) || this;
            }
            $mol_check_expand.prototype.level_style = function () {
                return this.level() * .75 - .75 + "rem";
            };
            $mol_check_expand.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_check_expand;
        }($.$mol_check_expand));
        $mol.$mol_check_expand = $mol_check_expand;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//expand.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_dimmer = (function (_super) {
        __extends($mol_dimmer, _super);
        function $mol_dimmer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_dimmer.prototype.haystack = function () {
            return "";
        };
        $mol_dimmer.prototype.needle = function () {
            return "";
        };
        $mol_dimmer.prototype.parts = function () {
            return [];
        };
        $mol_dimmer.prototype.sub = function () {
            return this.parts();
        };
        $mol_dimmer.prototype.string = function (id) {
            return "";
        };
        $mol_dimmer.prototype.low = function (id) {
            var _this = this;
            return new $.$mol_dimmer_low().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.string(id)); };
            });
        };
        return $mol_dimmer;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_dimmer.prototype, "low", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
(function ($) {
    var $mol_dimmer_low = (function (_super) {
        __extends($mol_dimmer_low, _super);
        function $mol_dimmer_low() {
            return _super.apply(this, arguments) || this;
        }
        $mol_dimmer_low.prototype.dom_name = function () {
            return "span";
        };
        return $mol_dimmer_low;
    }($.$mol_view));
    $.$mol_dimmer_low = $mol_dimmer_low;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_dimmer = (function (_super) {
            __extends($mol_dimmer, _super);
            function $mol_dimmer() {
                return _super.apply(this, arguments) || this;
            }
            $mol_dimmer.prototype.parts = function () {
                var needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                var chunks = [];
                var strings = this.strings();
                for (var index = 0; index < strings.length; index++) {
                    if (index > 0)
                        chunks.push(this.needle());
                    if (strings[index] !== '')
                        chunks.push(this.low(index));
                }
                return chunks;
            };
            $mol_dimmer.prototype.strings = function () {
                return this.haystack().split(this.needle());
            };
            $mol_dimmer.prototype.string = function (index) {
                return this.strings()[index];
            };
            return $mol_dimmer;
        }($.$mol_dimmer));
        __decorate([
            $.$mol_mem()
        ], $mol_dimmer.prototype, "strings", null);
        $mol.$mol_dimmer = $mol_dimmer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_grid = (function (_super) {
        __extends($mol_grid, _super);
        function $mol_grid() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grid.prototype.row_ids = function () {
            return [];
        };
        $mol_grid.prototype.row_id = function (index) {
            return null;
        };
        $mol_grid.prototype.col_ids = function () {
            return [];
        };
        $mol_grid.prototype.records = function () {
            return [];
        };
        $mol_grid.prototype.record = function (id) {
            return null;
        };
        $mol_grid.prototype.hierarchy = function () {
            return null;
        };
        $mol_grid.prototype.hierarchy_col = function () {
            return "";
        };
        $mol_grid.prototype.gap_top = function () {
            return 0;
        };
        $mol_grid.prototype.gap_bottom = function () {
            return 0;
        };
        $mol_grid.prototype.rows_visible = function () {
            return [];
        };
        $mol_grid.prototype.Table = function () {
            var _this = this;
            return new $.$mol_grid_table().setup(function (obj) {
                obj.gap_top = function () { return _this.gap_top(); };
                obj.gap_bottom = function () { return _this.gap_bottom(); };
                obj.sub = function () { return [].concat(_this.rows_visible()); };
            });
        };
        $mol_grid.prototype.sub = function () {
            return [].concat(this.Table());
        };
        $mol_grid.prototype.rows = function () {
            return [];
        };
        $mol_grid.prototype.row_height = function () {
            return 40;
        };
        $mol_grid.prototype.head_cells = function () {
            return [];
        };
        $mol_grid.prototype.Head = function () {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.head_cells(); };
            });
        };
        $mol_grid.prototype.cells = function (id) {
            return [];
        };
        $mol_grid.prototype.Row = function (id) {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.height = function () { return _this.row_height(); };
                obj.cells = function () { return _this.cells(id); };
            });
        };
        $mol_grid.prototype.cell = function (id) {
            return null;
        };
        $mol_grid.prototype.cell_content = function (id) {
            return [];
        };
        $mol_grid.prototype.cell_content_text = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.Cell_text = function (id) {
            var _this = this;
            return new $.$mol_grid_cell().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_text(id)); };
            });
        };
        $mol_grid.prototype.cell_content_number = function (id) {
            return this.cell_content(id);
        };
        $mol_grid.prototype.Cell_number = function (id) {
            var _this = this;
            return new $.$mol_grid_number().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.cell_content_number(id)); };
            });
        };
        $mol_grid.prototype.col_head_content = function (id) {
            return [];
        };
        $mol_grid.prototype.Col_head = function (id) {
            var _this = this;
            return new $.$mol_float().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.col_head_content(id)); };
            });
        };
        $mol_grid.prototype.cell_level = function (id) {
            return 0;
        };
        $mol_grid.prototype.cell_expanded = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_grid.prototype.Cell_branch = function (id) {
            var _this = this;
            return new $.$mol_check_expand().setup(function (obj) {
                obj.level = function () { return _this.cell_level(id); };
                obj.label = function () { return _this.cell_content(id); };
                obj.expanded = function (val) { return _this.cell_expanded(id, val); };
            });
        };
        $mol_grid.prototype.needle = function () {
            return "";
        };
        $mol_grid.prototype.cell_value = function (id) {
            return "";
        };
        $mol_grid.prototype.Cell_dimmer = function (id) {
            var _this = this;
            return new $.$mol_dimmer().setup(function (obj) {
                obj.needle = function () { return _this.needle(); };
                obj.haystack = function () { return _this.cell_value(id); };
            });
        };
        $mol_grid.prototype.Cell_content = function (id) {
            return [].concat(this.Cell_dimmer(id));
        };
        return $mol_grid;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_table = (function (_super) {
        __extends($mol_grid_table, _super);
        function $mol_grid_table() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grid_table.prototype.dom_name = function () {
            return "table";
        };
        $mol_grid_table.prototype.gap_top = function () {
            return 0;
        };
        $mol_grid_table.prototype.gap_bottom = function () {
            return 0;
        };
        $mol_grid_table.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "marginTop": function () { return _this.gap_top(); },
                "marginBottom": function () { return _this.gap_bottom(); },
            });
        };
        return $mol_grid_table;
    }($.$mol_view));
    $.$mol_grid_table = $mol_grid_table;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_row = (function (_super) {
        __extends($mol_grid_row, _super);
        function $mol_grid_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grid_row.prototype.dom_name = function () {
            return "tr";
        };
        $mol_grid_row.prototype.height = function () {
            return 40;
        };
        $mol_grid_row.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "height": function () { return _this.height(); },
            });
        };
        $mol_grid_row.prototype.cells = function () {
            return [];
        };
        $mol_grid_row.prototype.sub = function () {
            return this.cells();
        };
        return $mol_grid_row;
    }($.$mol_view));
    $.$mol_grid_row = $mol_grid_row;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_cell = (function (_super) {
        __extends($mol_grid_cell, _super);
        function $mol_grid_cell() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grid_cell.prototype.dom_name = function () {
            return "td";
        };
        return $mol_grid_cell;
    }($.$mol_view));
    $.$mol_grid_cell = $mol_grid_cell;
})($ || ($ = {}));
(function ($) {
    var $mol_grid_number = (function (_super) {
        __extends($mol_grid_number, _super);
        function $mol_grid_number() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_grid_number;
    }($.$mol_grid_cell));
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//grid.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_grid = (function (_super) {
            __extends($mol_grid, _super);
            function $mol_grid() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grid.prototype.rows_visible = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var view_window = this.view_window();
                return [].concat(this.col_ids() && this.Head(), rows.slice(view_window.top, view_window.bottom).valueOf());
            };
            $mol_grid.prototype.rows_visible_max = function () {
                return Math.ceil(this.context().$mol_view_visible_height() / this.row_height());
            };
            $mol_grid.prototype.view_window = function () {
                var rows = this.rows();
                if (!rows)
                    return null;
                var count = rows.length;
                var context = this.context_sub();
                var scrollTop = context.$mol_scroll_scroll_top();
                var top = Math.max(0, Math.floor(scrollTop / this.row_height()));
                var bottom = Math.min(count, top + this.rows_visible_max());
                return { top: top, bottom: bottom, count: count };
            };
            $mol_grid.prototype.gap_top = function () {
                var view_window = this.view_window();
                return view_window.top * this.row_height();
            };
            $mol_grid.prototype.gap_bottom = function () {
                var view_window = this.view_window();
                return (view_window.count - view_window.bottom) * this.row_height();
            };
            $mol_grid.prototype.head_cells = function () {
                var _this = this;
                return this.col_ids().map(function (colId) { return _this.Col_head(colId); });
            };
            $mol_grid.prototype.col_head_content = function (colId) {
                return [colId];
            };
            $mol_grid.prototype.rows = function () {
                var _this = this;
                return this.row_ids().map(function (id) { return _this.Row(id); });
            };
            $mol_grid.prototype.cells = function (row_id) {
                var _this = this;
                return this.col_ids().map(function (col_id) { return _this.Cell({ row: row_id, col: col_id }); });
            };
            $mol_grid.prototype.col_type = function (col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                var rowFirst = this.row_id(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            };
            $mol_grid.prototype.Cell = function (id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            };
            $mol_grid.prototype.cell_content = function (id) {
                return this.record(id.row[id.row.length - 1])[id.col];
            };
            $mol_grid.prototype.records = function () {
                return [];
            };
            $mol_grid.prototype.record = function (id) {
                return this.records()[id];
            };
            $mol_grid.prototype.record_ids = function () {
                return Object.keys(this.records());
            };
            $mol_grid.prototype.row_id = function (index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            };
            $mol_grid.prototype.col_ids = function () {
                var rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return null;
                var record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            };
            $mol_grid.prototype.hierarchy = function () {
                var hierarchy = {};
                var root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(function (id) {
                    root.sub.push(hierarchy[id] = {
                        id: id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            };
            $mol_grid.prototype.row_sub_ids = function (row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(function (child) { return row.concat(child.id); });
            };
            $mol_grid.prototype.row_root_id = function () {
                return [''];
            };
            $mol_grid.prototype.cell_level = function (id) {
                return id.row.length - 1;
            };
            $mol_grid.prototype.row_ids = function () {
                var _this = this;
                var next = [];
                var add = function (row) {
                    next.push(row);
                    if (_this.row_expanded(row)) {
                        _this.row_sub_ids(row).forEach(function (child) { return add(child); });
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(function (child) { return add(child); });
                return next;
            };
            $mol_grid.prototype.row_expanded = function (row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                var key = "row_expanded(" + JSON.stringify(row_id) + ")";
                var next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? false : next2;
            };
            $mol_grid.prototype.cell_expanded = function (id, next) {
                return this.row_expanded(id.row, next);
            };
            return $mol_grid;
        }($.$mol_grid));
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "rows_visible", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "rows_visible_max", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "view_window", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "col_head_content", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grid.prototype, "row_ids", null);
        $mol.$mol_grid = $mol_grid;
        var $mol_grid_table = (function (_super) {
            __extends($mol_grid_table, _super);
            function $mol_grid_table() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grid_table.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_scroll_scroll_top = function () { return context.$mol_scroll_scroll_top() - _this.gap_top(); };
                return subContext;
            };
            return $mol_grid_table;
        }($.$mol_grid_table));
        __decorate([
            $.$mol_mem()
        ], $mol_grid_table.prototype, "context_sub", null);
        $mol.$mol_grid_table = $mol_grid_table;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//grid.view.js.map
;
var $;
(function ($) {
    var $mol_syntax = (function () {
        function $mol_syntax(lexems) {
            this['lexems()'] = lexems;
        }
        $mol_syntax.prototype.lexems = function () {
            return this['lexems()'];
        };
        $mol_syntax.prototype.rules = function () {
            var rules = this['rules()'];
            if (rules)
                return rules;
            rules = [];
            var lexems = this.lexems();
            for (var name_1 in lexems) {
                rules.push({
                    name: name_1,
                    regExp: lexems[name_1],
                    size: RegExp('^$|' + lexems[name_1].source).exec('').length - 1,
                });
            }
            return this['rules()'] = rules;
        };
        $mol_syntax.prototype.regExp = function () {
            var regExp = this['regExp()'];
            if (regExp)
                return regExp;
            var parts = '(' + this.rules().map(function (rule) { return rule.regExp.source; }).join(')|(') + ')';
            regExp = RegExp("([^]*?)(?:(" + parts + ")|$(?![^]))", 'gm');
            return this['regExp()'] = regExp;
        };
        $mol_syntax.prototype.tokenize = function (text) {
            var tokens = [];
            var rules = this.rules();
            var regExp = this.regExp();
            var regExpSize = RegExp('^$|' + regExp.source).exec('').length - 1;
            var position = 0;
            parsing: while (position < text.length) {
                regExp.lastIndex = position;
                var found = regExp.exec(text);
                if (position === regExp.lastIndex)
                    throw new Error('Empty token');
                position = regExp.lastIndex;
                var prefix = found[1];
                if (prefix) {
                    tokens.push({
                        name: '',
                        found: prefix,
                        chunks: [],
                    });
                }
                var suffix = found[2];
                if (suffix) {
                    var offset = 4;
                    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                        var rule = rules_1[_i];
                        if (found[offset - 1]) {
                            tokens.push({
                                name: rule.name,
                                found: suffix,
                                chunks: found.slice(offset, offset + rule.size)
                            });
                            continue parsing;
                        }
                        offset += rule.size + 1;
                    }
                    throw new Error('Something wrong');
                }
            }
            return tokens;
        };
        return $mol_syntax;
    }());
    $.$mol_syntax = $mol_syntax;
})($ || ($ = {}));
//syntax.js.map
;
var $;
(function ($) {
    $.$mol_syntax_md_flow = new $.$mol_syntax({
        'header': /^(#+)(\s*)(.*?)$([\n\r]*)/,
        'list-item': /^(\s?\*\s+)(.*?)$([\n\r]*)/,
        'code': /^(```)(\w*)[\r\n]+([^]*?)^(```)$([\n\r]*)/,
        'table': /((?:^\|.+?$\r?\n)+)([\n\r]*)/,
        'block': /^(.*?(?:\r?\n.+?)*)$((?:\r?\n)*)/,
    });
    $.$mol_syntax_md_line = new $.$mol_syntax({
        'strong': /\*\*(.+?)\*\*/,
        'emphasis': /\*(.+?)\*/,
        'code3': /```(.+?)```/,
        'code': /`(.+?)`/,
        'strike': /~~(.+?)~~/,
        'text-link': /\[(.*?(?:\[.*?\].*?)*)\]\((.*?)\)/,
        'image-link': /!\[([^\[\]]*?)\]\((.*?)\)/,
    });
})($ || ($ = {}));
//md.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_text = (function (_super) {
        __extends($mol_text, _super);
        function $mol_text() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text.prototype.text = function () {
            return "";
        };
        $mol_text.prototype.block_content = function (id) {
            return [];
        };
        $mol_text.prototype.block_type = function (id) {
            return "";
        };
        $mol_text.prototype.Row = function (id) {
            var _this = this;
            return new $.$mol_text_row().setup(function (obj) {
                obj.sub = function () { return _this.block_content(id); };
                obj.type = function () { return _this.block_type(id); };
            });
        };
        $mol_text.prototype.Span = function (id) {
            return new $.$mol_text_spanner();
        };
        $mol_text.prototype.Link = function (id) {
            return new $.$mol_text_linker();
        };
        $mol_text.prototype.Image = function (id) {
            return new $.$mol_text_imager();
        };
        $mol_text.prototype.header_level = function (id) {
            return 0;
        };
        $mol_text.prototype.header_content = function (id) {
            return [];
        };
        $mol_text.prototype.Header = function (id) {
            var _this = this;
            return new $.$mol_text_header().setup(function (obj) {
                obj.level = function () { return _this.header_level(id); };
                obj.content = function () { return _this.header_content(id); };
            });
        };
        $mol_text.prototype.table_head_cells = function (id) {
            return [];
        };
        $mol_text.prototype.table_rows = function (id) {
            return [];
        };
        $mol_text.prototype.Table = function (id) {
            var _this = this;
            return new $.$mol_grid().setup(function (obj) {
                obj.head_cells = function () { return _this.table_head_cells(id); };
                obj.rows = function () { return _this.table_rows(id); };
            });
        };
        $mol_text.prototype.table_cells = function (id) {
            return [];
        };
        $mol_text.prototype.Table_row = function (id) {
            var _this = this;
            return new $.$mol_grid_row().setup(function (obj) {
                obj.cells = function () { return _this.table_cells(id); };
            });
        };
        $mol_text.prototype.table_cell_content = function (id) {
            return [];
        };
        $mol_text.prototype.Table_cell = function (id) {
            var _this = this;
            return new $.$mol_grid_cell().setup(function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
            });
        };
        $mol_text.prototype.Table_cell_head = function (id) {
            var _this = this;
            return new $.$mol_float().setup(function (obj) {
                obj.sub = function () { return _this.table_cell_content(id); };
            });
        };
        return $mol_text;
    }($.$mol_list));
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Span", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Link", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Image", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Header", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_row", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_cell", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_text.prototype, "Table_cell_head", null);
    $.$mol_text = $mol_text;
})($ || ($ = {}));
(function ($) {
    var $mol_text_row = (function (_super) {
        __extends($mol_text_row, _super);
        function $mol_text_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_row.prototype.minimal_height = function () {
            return 40;
        };
        $mol_text_row.prototype.type = function () {
            return "";
        };
        $mol_text_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_text_type": function () { return _this.type(); },
            });
        };
        return $mol_text_row;
    }($.$mol_view));
    $.$mol_text_row = $mol_text_row;
})($ || ($ = {}));
(function ($) {
    var $mol_text_header = (function (_super) {
        __extends($mol_text_header, _super);
        function $mol_text_header() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_header.prototype.dom_name = function () {
            return "h";
        };
        $mol_text_header.prototype.level = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_text_header.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_text_header_level": function () { return _this.level(); },
            });
        };
        $mol_text_header.prototype.content = function () {
            return [];
        };
        $mol_text_header.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_header;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_header.prototype, "level", null);
    $.$mol_text_header = $mol_text_header;
})($ || ($ = {}));
(function ($) {
    var $mol_text_spanner = (function (_super) {
        __extends($mol_text_spanner, _super);
        function $mol_text_spanner() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_spanner.prototype.dom_name = function () {
            return "span";
        };
        $mol_text_spanner.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_spanner.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_text_type": function () { return _this.type(); },
            });
        };
        $mol_text_spanner.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_text_spanner.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_spanner;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_spanner.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_spanner.prototype, "content", null);
    $.$mol_text_spanner = $mol_text_spanner;
})($ || ($ = {}));
(function ($) {
    var $mol_text_linker = (function (_super) {
        __extends($mol_text_linker, _super);
        function $mol_text_linker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_linker.prototype.dom_name = function () {
            return "a";
        };
        $mol_text_linker.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_linker.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_text_type": function () { return _this.type(); },
                "href": function () { return _this.link(); },
            });
        };
        $mol_text_linker.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_text_linker.prototype.sub = function () {
            return this.content();
        };
        return $mol_text_linker;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_linker.prototype, "content", null);
    $.$mol_text_linker = $mol_text_linker;
})($ || ($ = {}));
(function ($) {
    var $mol_text_imager = (function (_super) {
        __extends($mol_text_imager, _super);
        function $mol_text_imager() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_imager.prototype.dom_name = function () {
            return "img";
        };
        $mol_text_imager.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_text_imager.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_text_type": function () { return _this.type(); },
                "src": function () { return _this.link(); },
                "alt": function () { return _this.title(); },
            });
        };
        return $mol_text_imager;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_text_imager.prototype, "title", null);
    $.$mol_text_imager = $mol_text_imager;
})($ || ($ = {}));
//text.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_text = (function (_super) {
            __extends($mol_text, _super);
            function $mol_text() {
                return _super.apply(this, arguments) || this;
            }
            $mol_text.prototype.tokens_flow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_text.prototype.rows = function () {
                var _this = this;
                return this.tokens_flow().map(function (token, index) {
                    switch (token.name) {
                        case 'table': return _this.Table(index);
                        case 'header': return _this.Header(index);
                    }
                    return _this.Row(index);
                });
            };
            $mol_text.prototype.header_level = function (index) {
                return this.tokens_flow()[index].chunks[0].length;
            };
            $mol_text.prototype.header_content = function (index) {
                return this.text2spans("" + index, this.tokens_flow()[index].chunks[2]);
            };
            $mol_text.prototype.block_type = function (index) {
                return this.tokens_flow()[index].name;
            };
            $mol_text.prototype.cell_contents = function (indexBlock) {
                return this.tokens_flow()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(function (row) { return row && !/\|--/.test(row); })
                    .map(function (row, rowId) {
                    return row.split(/\|/g)
                        .filter(function (cell) { return cell; })
                        .map(function (cell, cellId) { return cell.trim(); });
                });
            };
            $mol_text.prototype.table_rows = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)
                    .slice(1)
                    .map(function (row, rowId) { return _this.Table_row({ block: blockId, row: rowId + 1 }); });
            };
            $mol_text.prototype.table_head_cells = function (blockId) {
                var _this = this;
                return this.cell_contents(blockId)[0]
                    .map(function (cell, cellId) { return _this.Table_cell_head({ block: blockId, row: 0, cell: cellId }); });
            };
            $mol_text.prototype.table_cells = function (id) {
                var _this = this;
                return this.cell_contents(id.block)[id.row]
                    .map(function (cell, cellId) { return _this.Table_cell({ block: id.block, row: id.row, cell: cellId }); });
            };
            $mol_text.prototype.table_cell_content = function (id) {
                return this.text2spans(id.block + "/" + id.row + "/" + id.cell, this.cell_contents(id.block)[id.row][id.cell]);
            };
            $mol_text.prototype.text2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_line.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    switch (token.name) {
                        case 'text-link': {
                            if (/^#|(\w+script+:)+/.test(token.chunks[1])) {
                                var span_1 = _this.Span(id);
                                span_1.content(_this.text2spans(id, token.chunks[0]));
                                return span_1;
                            }
                            else {
                                var span_2 = _this.Link(id);
                                span_2.type(token.name);
                                span_2.link(token.chunks[1]);
                                span_2.content(_this.text2spans(id, token.chunks[0]));
                                return span_2;
                            }
                        }
                        case 'image-link': {
                            var span_3 = _this.Image(id);
                            span_3.type(token.name);
                            span_3.link(token.chunks[1]);
                            span_3.title(token.chunks[0]);
                            return span_3;
                        }
                        case 'code3':
                        case 'code': {
                            var span_4 = _this.Span(id);
                            span_4.type('code');
                            span_4.content([token.chunks[0]]);
                            return span_4;
                        }
                    }
                    var span = _this.Span(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map(function (text, index) { return _this.text2spans(id + "/" + index, text); }))
                        : [token.found]);
                    return span;
                });
            };
            $mol_text.prototype.block_content = function (indexBlock) {
                var token = this.tokens_flow()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans("" + indexBlock, token.chunks[2]);
                    case 'list-item': return this.text2spans("" + indexBlock, token.chunks[1]);
                    case 'code': return [token.chunks[2]];
                }
                return this.text2spans("" + indexBlock, token.chunks[0]);
            };
            return $mol_text;
        }($.$mol_text));
        __decorate([
            $.$mol_mem()
        ], $mol_text.prototype, "tokens_flow", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_text.prototype, "cell_contents", null);
        $mol.$mol_text = $mol_text;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//text.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_portion_indicator = (function (_super) {
        __extends($mol_portion_indicator, _super);
        function $mol_portion_indicator() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portion_indicator.prototype.widthStyle = function () {
            return "0";
        };
        $mol_portion_indicator.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "width": function () { return _this.widthStyle(); },
            });
        };
        return $mol_portion_indicator;
    }($.$mol_view));
    $.$mol_portion_indicator = $mol_portion_indicator;
})($ || ($ = {}));
(function ($) {
    var $mol_portion = (function (_super) {
        __extends($mol_portion, _super);
        function $mol_portion() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portion.prototype.portion = function () {
            return 0;
        };
        $mol_portion.prototype.indWidthStyle = function () {
            return "0";
        };
        $mol_portion.prototype.indicator = function () {
            var _this = this;
            return new $.$mol_portion_indicator().setup(function (obj) {
                obj.widthStyle = function () { return _this.indWidthStyle(); };
            });
        };
        $mol_portion.prototype.sub = function () {
            return [].concat(this.indicator());
        };
        return $mol_portion;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_portion.prototype, "indicator", null);
    $.$mol_portion = $mol_portion;
})($ || ($ = {}));
//portioner.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_portion = (function (_super) {
            __extends($mol_portion, _super);
            function $mol_portion() {
                return _super.apply(this, arguments) || this;
            }
            $mol_portion.prototype.indWidthStyle = function () {
                return this.portion() * 100 + '%';
            };
            return $mol_portion;
        }($.$mol_portion));
        $mol.$mol_portion = $mol_portion;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//portioner.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_sort_asc = (function (_super) {
        __extends($mol_icon_sort_asc, _super);
        function $mol_icon_sort_asc() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_sort_asc.prototype.path = function () {
            return "M10,11V13H18V11H10M10,5V7H14V5H10M10,17V19H22V17H10M6,7H8.5L5,3.5L1.5,7H4V20H6V7Z";
        };
        return $mol_icon_sort_asc;
    }($.$mol_icon));
    $.$mol_icon_sort_asc = $mol_icon_sort_asc;
})($ || ($ = {}));
//asc.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var $;
(function ($) {
    window.addEventListener('storage', function (event) {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force);
    });
})($ || ($ = {}));
//local.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_request = (function (_super) {
        __extends($mol_http_request, _super);
        function $mol_http_request() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_request.prototype.uri = function () { return ''; };
        $mol_http_request.prototype.method = function () { return 'Get'; };
        $mol_http_request.prototype.credentials = function () {
            return null;
        };
        $mol_http_request.prototype.body = function () { return null; };
        $mol_http_request.prototype.native = function () {
            var _this = this;
            if (this['native()'])
                return this['native()'];
            var next = this['native()'] = $.$mol_http_request_native();
            next.withCredentials = Boolean(this.credentials());
            next.onload = function (event) {
                if (Math.floor(next.status / 100) === 2) {
                    _this.response(next.responseText, $.$mol_atom_force);
                }
                else {
                    _this.response(new Error(next.responseText), $.$mol_atom_force);
                }
            };
            next.onerror = function (event) {
                _this.response(event.error || new Error('Unknown HTTP error'), $.$mol_atom_force);
            };
            return next;
        };
        $mol_http_request.prototype.destroyed = function (next) {
            if (next) {
                var native = this['native()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_http_request.prototype.response = function (next, force) {
            var creds = this.credentials();
            var native = this.native();
            var method = (next === void 0) ? 'Get' : this.method();
            var uri = this.uri();
            native.open(method, uri, true, creds && creds.login, creds && creds.password);
            native.send(next);
            throw new $.$mol_atom_wait(method + " " + uri);
        };
        $mol_http_request.prototype.text = function (next, force) {
            return this.response(next, force);
        };
        return $mol_http_request;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_request.prototype, "response", null);
    $.$mol_http_request = $mol_http_request;
})($ || ($ = {}));
//request.js.map
;
var $;
(function ($) {
    $.$mol_http_request_native = function () { return new XMLHttpRequest; };
})($ || ($ = {}));
//request.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_http_resource = (function (_super) {
        __extends($mol_http_resource, _super);
        function $mol_http_resource() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource.item = function (uri) {
            return new $mol_http_resource().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource.prototype.uri = function () { return ''; };
        $mol_http_resource.prototype.credentials = function () {
            return null;
        };
        $mol_http_resource.prototype.request = function () {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return 'Put'; };
            request.uri = function () { return _this.uri(); };
            request.credentials = function () { return _this.credentials(); };
            return request;
        };
        $mol_http_resource.prototype.text = function (next, force) {
            return this.request().text(next, force);
        };
        return $mol_http_resource;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "request", null);
    __decorate([
        $.$mol_mem()
    ], $mol_http_resource.prototype, "text", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource, "item", null);
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            return _super.apply(this, arguments) || this;
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, force) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t'), force));
        };
        return $mol_http_resource_json;
    }($mol_http_resource));
    __decorate([
        $.$mol_mem_key()
    ], $mol_http_resource_json, "item", null);
    $.$mol_http_resource_json = $mol_http_resource_json;
})($ || ($ = {}));
//resource.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super.apply(this, arguments) || this;
        }
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_state_arg.value('locale') || 'en';
        };
        $mol_locale.texts = function () {
            var uri = "-/web.locale=" + this.lang() + ".json";
            var resource = $.$mol_http_resource_json.item(uri);
            return resource.json();
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_bench = (function (_super) {
        __extends($mol_bench, _super);
        function $mol_bench() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bench.prototype.result = function () {
            return null;
        };
        $mol_bench.prototype.result_sorted = function () {
            return null;
        };
        $mol_bench.prototype.records = function () {
            return this.result_sorted();
        };
        $mol_bench.prototype.col_sort = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_bench.prototype.event_sort_toggle = function (id, val) {
            return (val !== void 0) ? val : null;
        };
        $mol_bench.prototype.col_head_label = function (id) {
            return [];
        };
        $mol_bench.prototype.Col_head_sort = function (id) {
            return new $.$mol_icon_sort_asc();
        };
        $mol_bench.prototype.col_head_content = function (id) {
            return [].concat(this.col_head_label(id), this.Col_head_sort(id));
        };
        $mol_bench.prototype.Col_head = function (id) {
            var _this = this;
            return new $.$mol_bench_head().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_sort_toggle(id, val); };
                obj.sub = function () { return _this.col_head_content(id); };
            });
        };
        $mol_bench.prototype.result_value = function (id) {
            return "";
        };
        $mol_bench.prototype.result_portion = function (id) {
            return 0;
        };
        $mol_bench.prototype.Result_portion = function (id) {
            var _this = this;
            return new $.$mol_portion().setup(function (obj) {
                obj.portion = function () { return _this.result_portion(id); };
            });
        };
        $mol_bench.prototype.cell_content_number = function (id) {
            return [].concat(this.result_value(id), this.Result_portion(id));
        };
        return $mol_bench;
    }($.$mol_grid));
    __decorate([
        $.$mol_mem()
    ], $mol_bench.prototype, "col_sort", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bench.prototype, "event_sort_toggle", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bench.prototype, "Col_head_sort", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bench.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bench.prototype, "Result_portion", null);
    $.$mol_bench = $mol_bench;
})($ || ($ = {}));
(function ($) {
    var $mol_bench_head = (function (_super) {
        __extends($mol_bench_head, _super);
        function $mol_bench_head() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bench_head.prototype.event_click = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_bench_head.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (val) { return _this.event_click(val); },
            });
        };
        $mol_bench_head.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_bench_head.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "title": function () { return _this.hint(); },
            });
        };
        return $mol_bench_head;
    }($.$mol_float));
    __decorate([
        $.$mol_mem()
    ], $mol_bench_head.prototype, "event_click", null);
    $.$mol_bench_head = $mol_bench_head;
})($ || ($ = {}));
//bench.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_bench = (function (_super) {
            __extends($mol_bench, _super);
            function $mol_bench() {
                return _super.apply(this, arguments) || this;
            }
            $mol_bench.prototype.col_sort = function (next) {
                return $.$mol_state_arg.value(this.state_key('sort'), next);
            };
            $mol_bench.prototype.result_sorted = function () {
                var _this = this;
                var prev = this.result();
                var col = this.col_sort();
                if (!col)
                    return prev;
                var next = {};
                var keys = Object.keys(prev);
                keys.sort(function (a, b) { return _this.result_number({ row: ['', a], col: col }) - _this.result_number({ row: ['', b], col: col }); });
                keys.forEach(function (row) { return next[row] = prev[row]; });
                return next;
            };
            $mol_bench.prototype.result_value = function (id) {
                return this.result()[id.row[id.row.length - 1]][id.col];
            };
            $mol_bench.prototype.result_number = function (id) {
                return parseInt(this.result_value(id), 10);
            };
            $mol_bench.prototype.result_value_max = function (col) {
                var _this = this;
                var max = 0;
                var rows = this.row_ids();
                rows.forEach(function (row) {
                    var numb = _this.result_number({ row: row, col: col });
                    if (numb > max)
                        max = numb;
                });
                return max;
            };
            $mol_bench.prototype.result_portion = function (id) {
                return this.result_number(id) / this.result_value_max(id.col);
            };
            $mol_bench.prototype.col_head_label = function (col) {
                return [col];
            };
            $mol_bench.prototype.event_sort_toggle = function (col, next) {
                this.col_sort(col);
            };
            $mol_bench.prototype.col_type = function (col) {
                if (col === this.hierarchy_col())
                    return 'branch';
                var rowFirst = this.row_id(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col];
                if (!isNaN(parseFloat(val)))
                    return 'number';
                return 'text';
            };
            $mol_bench.prototype.cell_content_number = function (id) {
                return [
                    this.result_value(id),
                    (this.col_sort() === id.col)
                        ? this.Result_portion(id)
                        : null
                ];
            };
            $mol_bench.prototype.col_head_content = function (col) {
                return [].concat(this.col_head_label(col), (this.col_sort() === col)
                    ? this.Col_head_sort(col)
                    : null);
            };
            return $mol_bench;
        }($.$mol_bench));
        __decorate([
            $.$mol_mem()
        ], $mol_bench.prototype, "col_sort", null);
        __decorate([
            $.$mol_mem()
        ], $mol_bench.prototype, "result_sorted", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_bench.prototype, "result_value_max", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_bench.prototype, "col_type", null);
        $mol.$mol_bench = $mol_bench;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//bench.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench = (function (_super) {
        __extends($mol_app_bench, _super);
        function $mol_app_bench() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench.prototype.description = function () {
            return "";
        };
        $mol_app_bench.prototype.Descr = function () {
            var _this = this;
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return _this.description(); };
            });
        };
        $mol_app_bench.prototype.result = function () {
            return null;
        };
        $mol_app_bench.prototype.result_col_title = function (id) {
            return [];
        };
        $mol_app_bench.prototype.result_col_sort = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_bench.prototype.Result = function () {
            var _this = this;
            return new $.$mol_bench().setup(function (obj) {
                obj.result = function () { return _this.result(); };
                obj.col_head_label = function (id) { return [].concat(_this.result_col_title(id)); };
                obj.col_sort = function (val) { return _this.result_col_sort(val); };
            });
        };
        $mol_app_bench.prototype.Inform = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Descr(), _this.Result()); };
            });
        };
        $mol_app_bench.prototype.Sandbox = function () {
            return new $.$mol_view().setup(function (obj) {
                obj.dom_name = function () { return "iframe"; };
            });
        };
        $mol_app_bench.prototype.Main_page = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.title = function () { return _this.title(); };
                obj.body = function () { return [].concat(_this.Inform(), _this.Sandbox()); };
            });
        };
        $mol_app_bench.prototype.main = function () {
            return [].concat(this.Main_page());
        };
        $mol_app_bench.prototype.addon_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "addon_title");
        };
        $mol_app_bench.prototype.menu_options = function () {
            return [];
        };
        $mol_app_bench.prototype.Menu = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.menu_options(); };
            });
        };
        $mol_app_bench.prototype.Addon_page = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.title = function () { return _this.addon_title(); };
                obj.body = function () { return [].concat(_this.Menu()); };
            });
        };
        $mol_app_bench.prototype.addon = function () {
            return [].concat(this.Addon_page());
        };
        $mol_app_bench.prototype.menu_option_checked = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench.prototype.menu_option_title = function (id) {
            return "";
        };
        $mol_app_bench.prototype.Menu_option = function (id) {
            var _this = this;
            return new $.$mol_check_box().setup(function (obj) {
                obj.minimal_height = function () { return 36; };
                obj.checked = function (val) { return _this.menu_option_checked(id, val); };
                obj.label = function () { return [].concat(_this.menu_option_title(id)); };
            });
        };
        $mol_app_bench.prototype.result_col_title_sample = function () {
            return $.$mol_locale.text(this.locale_contexts(), "result_col_title_sample");
        };
        return $mol_app_bench;
    }($.$mol_stack));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Descr", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "result_col_sort", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Result", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Inform", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Sandbox", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Main_page", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Menu", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "Addon_page", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench.prototype, "menu_option_checked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench.prototype, "Menu_option", null);
    $.$mol_app_bench = $mol_app_bench;
})($ || ($ = {}));
//bench.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_bench = (function (_super) {
            __extends($mol_app_bench, _super);
            function $mol_app_bench() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_bench.prototype.bench = function (next) {
                return $.$mol_state_arg.value(this.state_key('bench'), next) || 'list';
            };
            $mol_app_bench.prototype.sandbox = function (next, force) {
                var _this = this;
                var next2 = this.Sandbox().dom_node();
                next2.src = this.bench();
                next2.onload = function (event) {
                    next2.onload = null;
                    _this.sandbox(next2, $.$mol_atom_force);
                };
                throw new $.$mol_atom_wait("Loading sandbox...");
            };
            $mol_app_bench.prototype.command_current = function (next, force) {
                if (this['command_current()'])
                    return;
                return next;
            };
            $mol_app_bench.prototype.command_result = function (command, next) {
                var _this = this;
                var sandbox = this.sandbox();
                sandbox.valueOf();
                if (next !== void 0)
                    return next;
                var current = this.command_current(command);
                if (current !== command)
                    throw new $.$mol_atom_wait("Waiting for " + JSON.stringify(current) + "...");
                requestAnimationFrame(function () {
                    sandbox.contentWindow.postMessage(command, '*');
                    window.onmessage = function (event) {
                        if (event.data[0] !== 'done')
                            return;
                        window.onmessage = null;
                        _this.command_current(null, $.$mol_atom_force);
                        _this.command_result(command, event.data[1]);
                    };
                });
                throw new $.$mol_atom_wait("Running " + command + "...");
            };
            $mol_app_bench.prototype.meta = function () {
                return this.command_result(['meta']);
            };
            $mol_app_bench.prototype.samples_all = function (next) {
                var _this = this;
                return Object.keys(this.meta().samples).sort(function (a, b) {
                    var titleA = _this.menu_option_title(a).toLowerCase();
                    var titleB = _this.menu_option_title(a).toLowerCase();
                    return titleA > titleB ? 1 : titleA < titleB ? -1 : 0;
                });
            };
            $mol_app_bench.prototype.samples = function (next) {
                var arg = $.$mol_state_arg.value(this.state_key('sample'), next && next.join('~'));
                return arg ? arg.split('~').sort() : [];
            };
            $mol_app_bench.prototype.steps = function (next) {
                return Object.keys(this.meta().steps);
            };
            $mol_app_bench.prototype.title = function () {
                var title = this.meta().title;
                return title[$.$mol_locale.lang()] || title['en'] || _super.prototype.title.call(this);
            };
            $mol_app_bench.prototype.description = function () {
                var descr = this.meta().descr;
                return descr[$.$mol_locale.lang()] || descr['en'] || '';
            };
            $mol_app_bench.prototype.result_sample = function (sampleId) {
                var _this = this;
                var result = {
                    sample: this.menu_option_title(sampleId),
                };
                this.steps().forEach(function (step) {
                    result[step] = _this.command_result([step, sampleId]);
                });
                return result;
            };
            $mol_app_bench.prototype.result = function () {
                var _this = this;
                var result = {};
                this.samples().forEach(function (sample) {
                    result[sample] = _this.result_sample(sample);
                });
                return result;
            };
            $mol_app_bench.prototype.result_col_title = function (col_id) {
                if (col_id === 'sample')
                    return [this.result_col_title_sample()];
                var title = this.meta().steps[col_id].title;
                return [title[$.$mol_locale.lang()] || title['en']];
            };
            $mol_app_bench.prototype.result_col_sort = function (next) {
                return $.$mol_state_arg.value(this.state_key('sort'), next);
            };
            $mol_app_bench.prototype.menu_options = function () {
                var _this = this;
                return this.samples_all().map(function (sample) { return _this.Menu_option(sample); });
            };
            $mol_app_bench.prototype.menu_option_title = function (sample) {
                var title = this.meta().samples[sample].title;
                return title[$.$mol_locale.lang()] || title['en'];
            };
            $mol_app_bench.prototype.menu_option_checked = function (sample, next) {
                if (next === void 0)
                    return this.samples().indexOf(sample) !== -1;
                if (next)
                    this.samples(this.samples().concat(sample));
                else
                    this.samples(this.samples().filter(function (s) { return s !== sample; }));
                return next;
            };
            return $mol_app_bench;
        }($.$mol_app_bench));
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "bench", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "sandbox", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "command_current", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "command_result", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "samples_all", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "samples", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "steps", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "title", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "description", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "result_sample", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "result", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "result_col_sort", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "menu_option_checked", null);
        $mol.$mol_app_bench = $mol_app_bench;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//bench.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_bench_demo = (function (_super) {
        __extends($mol_app_bench_demo, _super);
        function $mol_app_bench_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench_demo.prototype.bench = function () {
            return "/mol/app/bench/list/";
        };
        return $mol_app_bench_demo;
    }($.$mol_app_bench));
    $.$mol_app_bench_demo = $mol_app_bench_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_bench_list_mol = (function (_super) {
        __extends($mol_app_bench_list_mol, _super);
        function $mol_app_bench_list_mol() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench_list_mol.prototype.sample = function () {
            return "";
        };
        $mol_app_bench_list_mol.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.sample()); };
            });
        };
        $mol_app_bench_list_mol.prototype.rows = function () {
            return [];
        };
        $mol_app_bench_list_mol.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.Head(), _this.rows()); };
            });
        };
        $mol_app_bench_list_mol.prototype.sub = function () {
            return [].concat(this.List());
        };
        $mol_app_bench_list_mol.prototype.row_selected = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol.prototype.row_title = function (id) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.row_content = function (id) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.Row = function (id) {
            var _this = this;
            return new $.$mol_app_bench_list_mol_row().setup(function (obj) {
                obj.checked = function (val) { return _this.row_selected(id, val); };
                obj.title = function () { return _this.row_title(id); };
                obj.content = function () { return _this.row_content(id); };
            });
        };
        return $mol_app_bench_list_mol;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol.prototype, "List", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench_list_mol.prototype, "row_selected", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench_list_mol.prototype, "Row", null);
    $.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
})($ || ($ = {}));
(function ($) {
    var $mol_app_bench_list_mol_row = (function (_super) {
        __extends($mol_app_bench_list_mol_row, _super);
        function $mol_app_bench_list_mol_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench_list_mol_row.prototype.selected = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol_row.prototype.minimal_height = function () {
            return 56;
        };
        $mol_app_bench_list_mol_row.prototype.title = function () {
            return "";
        };
        $mol_app_bench_list_mol_row.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_bench_list_mol_row.prototype.content = function () {
            return "";
        };
        $mol_app_bench_list_mol_row.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
            });
        };
        $mol_app_bench_list_mol_row.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        return $mol_app_bench_list_mol_row;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_row.prototype, "selected", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_row.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_row.prototype, "Content", null);
    $.$mol_app_bench_list_mol_row = $mol_app_bench_list_mol_row;
})($ || ($ = {}));
//mol.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_bench_list_mol = (function (_super) {
            __extends($mol_app_bench_list_mol, _super);
            function $mol_app_bench_list_mol() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_bench_list_mol.data = function (next, force) {
                var _this = this;
                window.addEventListener('message', function (event) {
                    if (event.data[0] !== 'set data')
                        return;
                    _this.data(event.data[1], $.$mol_atom_force);
                });
                return { sample: '', items: [] };
            };
            $mol_app_bench_list_mol.prototype.sample = function () {
                return $mol_app_bench_list_mol.data().sample;
            };
            $mol_app_bench_list_mol.prototype.items = function () {
                return $mol_app_bench_list_mol.data().items;
            };
            $mol_app_bench_list_mol.prototype.rows = function () {
                var _this = this;
                return this.items().map(function (row, id) { return _this.Row(id); });
            };
            $mol_app_bench_list_mol.prototype.row_title = function (id) {
                return this.items()[id].title;
            };
            $mol_app_bench_list_mol.prototype.row_content = function (id) {
                return this.items()[id].content;
            };
            $mol_app_bench_list_mol.prototype.row_selected = function (id, next) {
                if (next !== void 0)
                    this.selected_id(next ? id : null);
                return this.selected_id() === id;
            };
            $mol_app_bench_list_mol.prototype.selected_id = function (next) {
                this.items();
                if (next === void 0)
                    return null;
                return next;
            };
            return $mol_app_bench_list_mol;
        }($.$mol_app_bench_list_mol));
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol.prototype, "rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench_list_mol.prototype, "row_title", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench_list_mol.prototype, "row_content", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol.prototype, "selected_id", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol, "data", null);
        $mol.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//mol.view.js.map
;
var $;
(function ($) {
    function $mol_dom_make(config) {
        var tag = config.tagName || 'div';
        var ns = config.namespaceURI || 'http://www.w3.org/1999/xhtml';
        var el = document.getElementById(config.id) || document.createElementNS(ns, tag);
        if (config.childNodes) {
            var i = 0;
            while (true) {
                if (i >= config.childNodes.length) {
                    for (var child = void 0; child = el.childNodes[i];) {
                        el.removeChild(child);
                    }
                    break;
                }
                if (i >= el.childNodes.length) {
                    for (; i < config.childNodes.length; ++i) {
                        var child = config.childNodes[i];
                        if (typeof child === 'string') {
                            el.appendChild(document.createTextNode(child));
                        }
                        else {
                            el.appendChild(child instanceof Node ? child : $mol_dom_make(child));
                        }
                    }
                    break;
                }
                var childPrev = el.childNodes[i] || null;
                var childNext = config.childNodes[i];
                if (typeof childNext === 'string') {
                    if (childPrev instanceof Text) {
                        childPrev.nodeValue = childNext;
                        childNext = childPrev;
                    }
                    else {
                        childNext = document.createTextNode(childNext);
                    }
                }
                else if (!(childNext instanceof Node)) {
                    childNext = $mol_dom_make(childNext);
                }
                if (childNext !== childPrev) {
                    el.insertBefore(childNext, childPrev);
                }
                ++i;
            }
        }
        for (var key in config) {
            switch (key) {
                case 'tagName':
                case 'namespaceURI':
                case 'childNodes':
                    break;
                default:
                    el[key] = config[key];
            }
        }
        return el;
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    function $mol_dom_jsx(tagName, props) {
        var childNodes = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            childNodes[_i - 2] = arguments[_i];
        }
        var config = __assign({ tagName: tagName, childNodes: [].concat.apply([], childNodes) }, props);
        return $.$mol_dom_make(config);
    }
    $.$mol_dom_jsx = $mol_dom_jsx;
})($ || ($ = {}));
//jsx.js.map
;
var $;
(function ($) {
    var $mol_app_bench_list_tsx = (function () {
        function $mol_app_bench_list_tsx() {
        }
        $mol_app_bench_list_tsx.onClick = function (item, event) {
            this.selected = item.id;
            this.render();
        };
        $mol_app_bench_list_tsx.render = function () {
            var _this = this;
            return ($.$mol_dom_jsx("div", { id: "list", className: "list" },
                $.$mol_dom_jsx("div", { id: "list-header", className: "list-header" }, this.data.sample),
                " ,",
                this.data.items.map(function (item) { return ($.$mol_dom_jsx("div", { id: 'list-item#' + item.id, className: "list-item list-item-selected-" + (_this.selected === item.id), onclick: _this.onClick.bind(_this, item) },
                    $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-title', className: "list-item-title" }, item.title),
                    $.$mol_dom_jsx("div", { id: 'list-item#' + item.id + '-content', className: "list-item-content", childNodes: [item.content] }, item.content))); })));
        };
        return $mol_app_bench_list_tsx;
    }());
    $mol_app_bench_list_tsx.data = {
        sample: '',
        items: []
    };
    $mol_app_bench_list_tsx.selected = null;
    $.$mol_app_bench_list_tsx = $mol_app_bench_list_tsx;
})($ || ($ = {}));
//index.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "placeholder": function () { return _this.hint(); },
                "type": function () { return _this.type(); },
            });
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val) {
            return this.value(val);
        };
        $mol_string.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "disabled": function () { return _this.disabled(); },
                "value": function () { return _this.value_changed(); },
            });
        };
        $mol_string.prototype.event_change = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "input": function (event) { return _this.event_change(event); },
            });
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                return _super.apply(this, arguments) || this;
            }
            $mol_string.prototype.event_change = function (next) {
                this.value(this.dom_node().value.trim());
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_row.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "minHeight": function () { return _this.minimal_height(); },
            });
        };
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            return $mol_row;
        }($.$mol_row));
        __decorate([
            $.$mol_mem()
        ], $mol_row.prototype, "item_offsets_top", null);
        $mol.$mol_row = $mol_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_status = (function (_super) {
        __extends($mol_status, _super);
        function $mol_status() {
            return _super.apply(this, arguments) || this;
        }
        $mol_status.prototype.status = function () {
            return null;
        };
        $mol_status.prototype.message = function () {
            return "";
        };
        $mol_status.prototype.sub = function () {
            return [].concat(this.message());
        };
        return $mol_status;
    }($.$mol_view));
    $.$mol_status = $mol_status;
})($ || ($ = {}));
//status.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_status = (function (_super) {
            __extends($mol_status, _super);
            function $mol_status() {
                return _super.apply(this, arguments) || this;
            }
            $mol_status.prototype.message = function () {
                try {
                    var status_1 = this.status();
                    if (status_1)
                        status_1.valueOf();
                    return null;
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    return error.message;
                }
            };
            return $mol_status;
        }($.$mol_status));
        $mol.$mol_status = $mol_status;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//status.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 36;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "href": function () { return _this.uri(); },
                "mol_link_current": function () { return _this.current(); },
            });
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                var patch = {};
                var arg = this.arg();
                for (var key in arg)
                    patch[key] = arg[key]();
                return new $.$mol_state_arg(this.state_prefix()).link(patch);
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            return $mol_link;
        }($.$mol_link));
        __decorate([
            $.$mol_mem()
        ], $mol_link.prototype, "uri", null);
        $mol.$mol_link = $mol_link;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//linker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_demo = (function (_super) {
        __extends($mol_demo, _super);
        function $mol_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_demo.prototype.name = function () {
            return "$mol_view";
        };
        $mol_demo.prototype.title = function () {
            return this.name();
        };
        $mol_demo.prototype.titler = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "demo": function () { return _this.name(); },
                }); };
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_demo.prototype.header = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.titler()); };
            });
        };
        $mol_demo.prototype.widget = function () {
            return null;
        };
        $mol_demo.prototype.screener = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.widget()); };
            });
        };
        $mol_demo.prototype.sub = function () {
            return [].concat(this.header(), this.screener());
        };
        return $mol_demo;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_demo.prototype, "titler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_demo.prototype, "header", null);
    __decorate([
        $.$mol_mem()
    ], $mol_demo.prototype, "screener", null);
    $.$mol_demo = $mol_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_demo = (function (_super) {
            __extends($mol_demo, _super);
            function $mol_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_demo.prototype.widget = function () {
                var Class = $["$" + this.name()];
                return new Class();
            };
            $mol_demo.prototype.title = function () {
                return "$" + this.name();
            };
            return $mol_demo;
        }($.$mol_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_demo.prototype, "widget", null);
        $mol.$mol_demo = $mol_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_demo_small = (function (_super) {
        __extends($mol_demo_small, _super);
        function $mol_demo_small() {
            return _super.apply(this, arguments) || this;
        }
        $mol_demo_small.prototype.minimal_height = function () {
            return 240;
        };
        $mol_demo_small.prototype.minimal_width = function () {
            return 440;
        };
        return $mol_demo_small;
    }($.$mol_demo));
    $.$mol_demo_small = $mol_demo_small;
})($ || ($ = {}));
(function ($) {
    var $mol_demo_medium = (function (_super) {
        __extends($mol_demo_medium, _super);
        function $mol_demo_medium() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_demo_medium;
    }($.$mol_demo));
    $.$mol_demo_medium = $mol_demo_medium;
})($ || ($ = {}));
(function ($) {
    var $mol_demo_large = (function (_super) {
        __extends($mol_demo_large, _super);
        function $mol_demo_large() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_demo_large;
    }($.$mol_demo));
    $.$mol_demo_large = $mol_demo_large;
})($ || ($ = {}));
//demo_types.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_demo = (function (_super) {
        __extends($mol_app_demo, _super);
        function $mol_app_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_demo.prototype.detail_title = function () {
            return "";
        };
        $mol_app_demo.prototype.Main_content = function () {
            return [];
        };
        $mol_app_demo.prototype.Detail = function () {
            var _this = this;
            return new $.$mol_app_demo_page().setup(function (obj) {
                obj.title = function () { return _this.detail_title(); };
                obj.body = function () { return _this.Main_content(); };
            });
        };
        $mol_app_demo.prototype.main = function () {
            return [].concat(this.Detail());
        };
        $mol_app_demo.prototype.filter_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_hint");
        };
        $mol_app_demo.prototype.filter_string = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_demo.prototype.Filter_string = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.filter_hint(); };
                obj.value = function (val) { return _this.filter_string(val); };
            });
        };
        $mol_app_demo.prototype.Nav_head = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Filter_string()); };
            });
        };
        $mol_app_demo.prototype.nav_hierarchy = function () {
            return null;
        };
        $mol_app_demo.prototype.nav_option = function (id) {
            return null;
        };
        $mol_app_demo.prototype.Nav = function () {
            var _this = this;
            return new $.$mol_app_demo_nav().setup(function (obj) {
                obj.hierarchy = function () { return _this.nav_hierarchy(); };
                obj.record = function (id) { return _this.nav_option(id); };
                obj.needle = function () { return _this.filter_string(); };
            });
        };
        $mol_app_demo.prototype.Menu = function () {
            var _this = this;
            return new $.$mol_page().setup(function (obj) {
                obj.head = function () { return [].concat(_this.Nav_head()); };
                obj.Body = function () { return _this.Nav(); };
            });
        };
        $mol_app_demo.prototype.addon = function () {
            return [].concat(this.Menu());
        };
        $mol_app_demo.prototype.welcome_text = function () {
            return "";
        };
        $mol_app_demo.prototype.Welcome_text = function () {
            var _this = this;
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return _this.welcome_text(); };
            });
        };
        $mol_app_demo.prototype.Welcome = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Welcome_text()); };
            });
        };
        $mol_app_demo.prototype.Samples = function () {
            return [];
        };
        $mol_app_demo.prototype.Detail_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Samples()); };
            });
        };
        $mol_app_demo.prototype.detail_empty_prefix = function () {
            return $.$mol_locale.text(this.locale_contexts(), "detail_empty_prefix");
        };
        $mol_app_demo.prototype.selected = function () {
            return "";
        };
        $mol_app_demo.prototype.detail_empty_postfix = function () {
            return $.$mol_locale.text(this.locale_contexts(), "detail_empty_postfix");
        };
        $mol_app_demo.prototype.Detail_empty_message = function () {
            var _this = this;
            return new $.$mol_status().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.detail_empty_prefix(), _this.selected(), _this.detail_empty_postfix()); };
            });
        };
        return $mol_app_demo;
    }($.$mol_stack));
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Detail", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "filter_string", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Filter_string", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Nav_head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Nav", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Menu", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Welcome_text", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Welcome", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Detail_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo.prototype, "Detail_empty_message", null);
    $.$mol_app_demo = $mol_app_demo;
})($ || ($ = {}));
(function ($) {
    var $mol_app_demo_page = (function (_super) {
        __extends($mol_app_demo_page, _super);
        function $mol_app_demo_page() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_demo_page.prototype.Back_icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_app_demo_page.prototype.back_arg = function () {
            return ({
                "demo": function () { return null; },
            });
        };
        $mol_app_demo_page.prototype.Back = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Back_icon()); };
                obj.arg = function () { return _this.back_arg(); };
            });
        };
        $mol_app_demo_page.prototype.head = function () {
            return [].concat(this.Back(), this.Title());
        };
        return $mol_app_demo_page;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo_page.prototype, "Back_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_demo_page.prototype, "Back", null);
    $.$mol_app_demo_page = $mol_app_demo_page;
})($ || ($ = {}));
(function ($) {
    var $mol_app_demo_nav = (function (_super) {
        __extends($mol_app_demo_nav, _super);
        function $mol_app_demo_nav() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_demo_nav.prototype.row_height = function () {
            return 32;
        };
        $mol_app_demo_nav.prototype.hierarchy_col = function () {
            return "title";
        };
        $mol_app_demo_nav.prototype.Head = function () {
            return null;
        };
        $mol_app_demo_nav.prototype.arg = function (id) {
            return ({});
        };
        $mol_app_demo_nav.prototype.Expand = function (id) {
            var _this = this;
            return new $.$mol_check_expand().setup(function (obj) {
                obj.expanded = function (val) { return _this.cell_expanded(id, val); };
                obj.level = function () { return _this.cell_level(id); };
            });
        };
        $mol_app_demo_nav.prototype.Option = function (id) {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return _this.arg(id); };
                obj.sub = function () { return [].concat(_this.Expand(id), _this.cell_content(id)); };
            });
        };
        return $mol_app_demo_nav;
    }($.$mol_grid));
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_demo_nav.prototype, "Expand", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_demo_nav.prototype, "Option", null);
    $.$mol_app_demo_nav = $mol_app_demo_nav;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_demo = (function (_super) {
            __extends($mol_app_demo, _super);
            function $mol_app_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_demo.prototype.title = function () {
                var selected = this.selected();
                if (selected)
                    return "$" + selected;
                return _super.prototype.title.call(this);
            };
            $mol_app_demo.prototype.welcome_text = function () {
                return $.$mol_http_resource.item('readme.md').text();
            };
            $mol_app_demo.prototype.names_demo_all = function () {
                var next = [];
                for (var name in $) {
                    if (!/^\$.*_demo($|_)/i.test(name))
                        continue;
                    if (/^\$mol_demo/.test(name))
                        continue;
                    if (/^\$mol_app_demo/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next.sort();
            };
            $mol_app_demo.prototype.names_demo_filtered = function () {
                var filter = this.filter_string();
                var names = this.names_demo_all().filter(function (name) { return name.match(filter); });
                return names;
            };
            $mol_app_demo.prototype.nav_hierarchy = function () {
                var names = this.names_demo_filtered();
                var hierarchy = {};
                var root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                names.forEach(function (name) {
                    var chunks = name.split(/(?=[_.-])/);
                    var branch = root;
                    for (var i = 1; i <= chunks.length; ++i) {
                        var prefix = chunks.slice(0, i).join('');
                        if (!hierarchy[prefix]) {
                            branch.sub.push(hierarchy[prefix] = {
                                id: prefix,
                                parent: branch,
                                sub: [],
                            });
                        }
                        branch = hierarchy[prefix];
                    }
                });
                hierarchy[''].sub.map(function (child) { return reduce(child); });
                function reduce(node) {
                    if (names.indexOf(node.id) >= 0)
                        return node;
                    node.sub = node.sub.map(function (child) { return reduce(child); });
                    if (node.sub.length !== 1)
                        return node;
                    node.sub[0].parent = node.parent;
                    return node.sub[0];
                }
                return hierarchy;
            };
            $mol_app_demo.prototype.nav_option = function (id) {
                var parent = this.nav_hierarchy()[id].parent;
                var title = ("$" + id).substring(parent.id.length + 1).replace(/^[-._]|[-._]demo$/g, '');
                return { title: title };
            };
            $mol_app_demo.prototype.selected = function () {
                return $.$mol_state_arg.value(this.state_key('demo')) || '';
            };
            $mol_app_demo.prototype.option = function (name) {
                return new $mol.$mol_link().setup(function (obj) {
                    obj.sub = function () { return [name ? ('$' + name) : 'All']; };
                    obj.arg = function () { return ({ demo: function () { return name; } }); };
                });
            };
            $mol_app_demo.prototype.widget = function (name) {
                var _this = this;
                var Class = $['$' + name];
                return new Class().setup(function (obj) {
                    obj.state_prefix = function () { return _this.state_prefix() + name + '.'; };
                });
            };
            $mol_app_demo.prototype.detail_title = function () {
                return '$' + this.selected();
            };
            $mol_app_demo.prototype.names_demo = function () {
                var prefix = this.selected();
                var namesAll = this.names_demo_all();
                var names = namesAll.filter(function (name) { return name.substring(0, prefix.length) === prefix; });
                return names;
            };
            $mol_app_demo.prototype.Main_content = function () {
                var names = this.names_demo();
                switch (names.length) {
                    case 0:
                        return [this.Detail_empty_message()];
                    case 1:
                        return [this.Sample_large(names[0])];
                    default:
                        return [this.Detail_row()];
                }
            };
            $mol_app_demo.prototype.Samples = function () {
                var _this = this;
                return this.names_demo().map(function (name) { return _this.Sample_small(name); });
            };
            $mol_app_demo.prototype.Sample_small = function (name) {
                var sample = new $.$mol_demo_small;
                sample.name = function () { return name; };
                return sample;
            };
            $mol_app_demo.prototype.Sample_large = function (name) {
                var sample = new $.$mol_demo_large();
                sample.titler = function () { return null; };
                sample.name = function () { return name; };
                return sample;
            };
            return $mol_app_demo;
        }($.$mol_app_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "welcome_text", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "names_demo_all", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "names_demo_filtered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "nav_hierarchy", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_demo.prototype, "option", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_demo.prototype, "widget", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "Main_content", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "Samples", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_demo.prototype, "Sample_small", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_demo.prototype, "Sample_large", null);
        $mol.$mol_app_demo = $mol_app_demo;
        var $mol_app_demo_nav = (function (_super) {
            __extends($mol_app_demo_nav, _super);
            function $mol_app_demo_nav() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_demo_nav.prototype.Cell = function (id) {
                if (id.col === 'title')
                    return this.Option(id);
                return _super.prototype.cell.call(this, id);
            };
            $mol_app_demo_nav.prototype.arg = function (id) {
                return { 'demo': function () { return id.row[id.row.length - 1]; } };
            };
            return $mol_app_demo_nav;
        }($.$mol_app_demo_nav));
        $mol.$mol_app_demo_nav = $mol_app_demo_nav;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_habhub = (function (_super) {
        __extends($mol_app_habhub, _super);
        function $mol_app_habhub() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_habhub.prototype.title = function () {
            return "HabHub";
        };
        $mol_app_habhub.prototype.gists = function () {
            return [];
        };
        $mol_app_habhub.prototype.status = function () {
            var _this = this;
            return new $.$mol_status().setup(function (obj) {
                obj.status = function () { return _this.gists(); };
            });
        };
        $mol_app_habhub.prototype.gist_rows = function () {
            return [];
        };
        $mol_app_habhub.prototype.list = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.gist_rows(); };
            });
        };
        $mol_app_habhub.prototype.body = function () {
            return [].concat(this.status(), this.list());
        };
        $mol_app_habhub.prototype.gist_content = function (id) {
            return "";
        };
        $mol_app_habhub.prototype.Gist_row = function (id) {
            var _this = this;
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return _this.gist_content(id); };
            });
        };
        $mol_app_habhub.prototype.footer = function () {
            return null;
        };
        return $mol_app_habhub;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_habhub.prototype, "list", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_habhub.prototype, "Gist_row", null);
    $.$mol_app_habhub = $mol_app_habhub;
})($ || ($ = {}));
//habhub.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_habhub = (function (_super) {
            __extends($mol_app_habhub, _super);
            function $mol_app_habhub() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_habhub.prototype.uriSource = function () {
                return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions';
            };
            $mol_app_habhub.prototype.gists = function () {
                return $.$mol_http_resource_json.item(this.uriSource()).json().items;
            };
            $mol_app_habhub.prototype.gist_rows = function () {
                var _this = this;
                return this.gists().map(function (gist, index) { return _this.Gist_row(index); });
            };
            $mol_app_habhub.prototype.gist_content = function (index) {
                var gist = this.gists()[index];
                return "# " + gist.title + "\n" + gist.body;
            };
            return $mol_app_habhub;
        }($.$mol_app_habhub));
        $mol.$mol_app_habhub = $mol_app_habhub;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//habhub.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_habhub_demo = (function (_super) {
        __extends($mol_app_habhub_demo, _super);
        function $mol_app_habhub_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_habhub_demo;
    }($.$mol_app_habhub));
    $.$mol_app_habhub_demo = $mol_app_habhub_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_hello = (function (_super) {
        __extends($mol_app_hello, _super);
        function $mol_app_hello() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_hello.prototype.name_hint = function () {
            return "Name";
        };
        $mol_app_hello.prototype.name = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_hello.prototype.Name = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.name_hint(); };
                obj.value = function (val) { return _this.name(val); };
            });
        };
        $mol_app_hello.prototype.greeting = function () {
            return "";
        };
        $mol_app_hello.prototype.Greeting = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.greeting()); };
            });
        };
        $mol_app_hello.prototype.sub = function () {
            return [].concat(this.Name(), this.Greeting());
        };
        return $mol_app_hello;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "name", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "Name", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_hello.prototype, "Greeting", null);
    $.$mol_app_hello = $mol_app_hello;
})($ || ($ = {}));
//hello.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_hello = (function (_super) {
            __extends($mol_app_hello, _super);
            function $mol_app_hello() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_hello.prototype.greeting = function () {
                var name = this.name();
                return name && "Hello, " + name + "!";
            };
            return $mol_app_hello;
        }($.$mol_app_hello));
        $mol.$mol_app_hello = $mol_app_hello;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//hello.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_hello_demo = (function (_super) {
        __extends($mol_app_hello_demo, _super);
        function $mol_app_hello_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_hello_demo;
    }($.$mol_app_hello));
    $.$mol_app_hello_demo = $mol_app_hello_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory = (function (_super) {
        __extends($mol_app_inventory, _super);
        function $mol_app_inventory() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory.prototype.Page = function () {
            return null;
        };
        $mol_app_inventory.prototype.sub = function () {
            return [].concat(this.Page());
        };
        $mol_app_inventory.prototype.Head = function () {
            return new $.$mol_app_inventory_head();
        };
        $mol_app_inventory.prototype.Enter = function () {
            var _this = this;
            return new $.$mol_app_inventory_enter().setup(function (obj) {
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Controller = function () {
            var _this = this;
            return new $.$mol_app_inventory_controller().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Keeper = function () {
            var _this = this;
            return new $.$mol_app_inventory_keeper().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.Stats = function () {
            var _this = this;
            return new $.$mol_app_inventory_stats().setup(function (obj) {
                obj.Head = function () { return _this.Head(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        return $mol_app_inventory;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "domain", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Controller", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Keeper", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory.prototype, "Stats", null);
    $.$mol_app_inventory = $mol_app_inventory;
})($ || ($ = {}));
(function ($) {
    var $mol_app_inventory_head = (function (_super) {
        __extends($mol_app_inventory_head, _super);
        function $mol_app_inventory_head() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_head.prototype.keeper_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "keeper_label");
        };
        $mol_app_inventory_head.prototype.Keeper_link = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": function () { return "keeper"; },
                }); };
                obj.sub = function () { return [].concat(_this.keeper_label()); };
            });
        };
        $mol_app_inventory_head.prototype.control_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "control_label");
        };
        $mol_app_inventory_head.prototype.Control_link = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": function () { return "controller"; },
                }); };
                obj.sub = function () { return [].concat(_this.control_label()); };
            });
        };
        $mol_app_inventory_head.prototype.sub = function () {
            return [].concat(this.Keeper_link(), this.Control_link());
        };
        return $mol_app_inventory_head;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_head.prototype, "Keeper_link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_head.prototype, "Control_link", null);
    $.$mol_app_inventory_head = $mol_app_inventory_head;
})($ || ($ = {}));
//inventory.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory = (function (_super) {
            __extends($mol_app_inventory, _super);
            function $mol_app_inventory() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory.prototype.Page = function () {
                if (!this.domain().authentificated()) {
                    return this.Enter();
                }
                switch (this.page_name()) {
                    case 'keeper': return this.Keeper();
                    case 'controller': return this.Controller();
                    case 'stats': return this.Stats();
                }
                return this.Keeper();
            };
            $mol_app_inventory.prototype.page_name = function (next) {
                return $.$mol_state_arg.value(this.state_key('page'), next) || 'keeper';
            };
            return $mol_app_inventory;
        }($.$mol_app_inventory));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "page_name", null);
        $mol.$mol_app_inventory = $mol_app_inventory;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//inventory.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_stats = (function (_super) {
        __extends($mol_app_inventory_stats, _super);
        function $mol_app_inventory_stats() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_stats.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        return $mol_app_inventory_stats;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_stats.prototype, "domain", null);
    $.$mol_app_inventory_stats = $mol_app_inventory_stats;
})($ || ($ = {}));
//stats.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_bar = (function (_super) {
        __extends($mol_bar, _super);
        function $mol_bar() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_bar;
    }($.$mol_view));
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_minus = (function (_super) {
        __extends($mol_icon_minus, _super);
        function $mol_icon_minus() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_minus.prototype.path = function () {
            return "M19 13H5v-2h14v2z";
        };
        return $mol_icon_minus;
    }($.$mol_icon));
    $.$mol_icon_minus = $mol_icon_minus;
})($ || ($ = {}));
//minus.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_plus = (function (_super) {
        __extends($mol_icon_plus, _super);
        function $mol_icon_plus() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_plus.prototype.path = function () {
            return "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z";
        };
        return $mol_icon_plus;
    }($.$mol_icon));
    $.$mol_icon_plus = $mol_icon_plus;
})($ || ($ = {}));
//plus.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_number = (function (_super) {
        __extends($mol_number, _super);
        function $mol_number() {
            return _super.apply(this, arguments) || this;
        }
        $mol_number.prototype.precision = function () {
            return 1;
        };
        $mol_number.prototype.precision_view = function () {
            return this.precision();
        };
        $mol_number.prototype.precision_change = function () {
            return this.precision();
        };
        $mol_number.prototype.value = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.event_wheel = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "wheel": function (val) { return _this.event_wheel(val); },
            });
        };
        $mol_number.prototype.event_dec = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.enabled = function () {
            return true;
        };
        $mol_number.prototype.dec_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.dec_icon = function () {
            return new $.$mol_icon_minus();
        };
        $mol_number.prototype.Dec = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_dec(val); };
                obj.enabled = function () { return _this.dec_enabled(); };
                obj.sub = function () { return [].concat(_this.dec_icon()); };
            });
        };
        $mol_number.prototype.value_string = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_number.prototype.hint = function () {
            return "";
        };
        $mol_number.prototype.string_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.String = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.type = function () { return "number"; };
                obj.value = function (val) { return _this.value_string(val); };
                obj.hint = function () { return _this.hint(); };
                obj.enabled = function () { return _this.string_enabled(); };
            });
        };
        $mol_number.prototype.event_inc = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number.prototype.inc_enabled = function () {
            return this.enabled();
        };
        $mol_number.prototype.inc_icon = function () {
            return new $.$mol_icon_plus();
        };
        $mol_number.prototype.Inc = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_inc(val); };
                obj.enabled = function () { return _this.inc_enabled(); };
                obj.sub = function () { return [].concat(_this.inc_icon()); };
            });
        };
        $mol_number.prototype.sub = function () {
            return [].concat(this.Dec(), this.String(), this.Inc());
        };
        return $mol_number;
    }($.$mol_bar));
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_wheel", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_dec", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "dec_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "Dec", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "value_string", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "String", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "event_inc", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "inc_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number.prototype, "Inc", null);
    $.$mol_number = $mol_number;
})($ || ($ = {}));
//number.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_number = (function (_super) {
            __extends($mol_number, _super);
            function $mol_number() {
                return _super.apply(this, arguments) || this;
            }
            $mol_number.prototype.event_dec = function (next) {
                this.value(this.value() - this.precision_change());
            };
            $mol_number.prototype.event_inc = function (next) {
                this.value(Number(this.value()) + this.precision_change());
            };
            $mol_number.prototype.value_string = function (next) {
                if (next !== void 0) {
                    this.value(next === '' ? null : Number(next));
                }
                var precisionView = this.precision_view();
                var value = next ? Number(next) : this.value();
                if (value === null)
                    return '';
                if (precisionView >= 1) {
                    return (value / precisionView).toFixed();
                }
                else {
                    var fixedNumber = Math.log(1 / precisionView) / Math.log(10);
                    return value.toFixed(fixedNumber);
                }
            };
            $mol_number.prototype.event_wheel = function (next) {
                next.preventDefault();
                if (next.wheelDelta < 0 && this.inc_enabled())
                    this.event_inc(next);
                if (next.wheelDelta > 0 && this.dec_enabled())
                    this.event_dec(next);
            };
            return $mol_number;
        }($.$mol_number));
        $mol.$mol_number = $mol_number;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//number.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch = (function (_super) {
        __extends($mol_switch, _super);
        function $mol_switch() {
            return _super.apply(this, arguments) || this;
        }
        $mol_switch.prototype.minimal_height = function () {
            return 44;
        };
        $mol_switch.prototype.option_checked = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_switch.prototype.option_title = function (id) {
            return "";
        };
        $mol_switch.prototype.enabled = function () {
            return true;
        };
        $mol_switch.prototype.option_enabled = function (id) {
            return this.enabled();
        };
        $mol_switch.prototype.Option = function (id) {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.checked = function (val) { return _this.option_checked(id, val); };
                obj.label = function () { return [].concat(_this.option_title(id)); };
                obj.enabled = function () { return _this.option_enabled(id); };
            });
        };
        $mol_switch.prototype.value = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_switch.prototype.options = function () {
            return ({});
        };
        $mol_switch.prototype.items = function () {
            return [];
        };
        $mol_switch.prototype.sub = function () {
            return this.items();
        };
        return $mol_switch;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_switch = (function (_super) {
            __extends($mol_switch, _super);
            function $mol_switch() {
                return _super.apply(this, arguments) || this;
            }
            $mol_switch.prototype.value = function (next) {
                return $.$mol_state_session.value(this + ".value()", next);
            };
            $mol_switch.prototype.options = function () {
                return {};
            };
            $mol_switch.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.Option(key); });
            };
            $mol_switch.prototype.option_title = function (key) {
                return this.options()[key]();
            };
            $mol_switch.prototype.option_checked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            return $mol_switch;
        }($.$mol_switch));
        __decorate([
            $.$mol_mem()
        ], $mol_switch.prototype, "items", null);
        $mol.$mol_switch = $mol_switch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switch.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_position = (function (_super) {
        __extends($mol_app_inventory_position, _super);
        function $mol_app_inventory_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_position.prototype.position = function () {
            return null;
        };
        $mol_app_inventory_position.prototype.title = function () {
            return "";
        };
        $mol_app_inventory_position.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_inventory_position.prototype.description = function () {
            return "";
        };
        $mol_app_inventory_position.prototype.Description = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_inventory_position.prototype.Product = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Title(), _this.Description()); };
            });
        };
        $mol_app_inventory_position.prototype.count = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_app_inventory_position.prototype.Count = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.count(val); };
            });
        };
        $mol_app_inventory_position.prototype.status = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_inventory_position.prototype.status_label_pending = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_pending");
        };
        $mol_app_inventory_position.prototype.status_label_approved = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_approved");
        };
        $mol_app_inventory_position.prototype.status_label_rejected = function () {
            return $.$mol_locale.text(this.locale_contexts(), "status_label_rejected");
        };
        $mol_app_inventory_position.prototype.Status = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.status(val); };
                obj.options = function () { return ({
                    "pending": function () { return _this.status_label_pending(); },
                    "approved": function () { return _this.status_label_approved(); },
                    "rejected": function () { return _this.status_label_rejected(); },
                }); };
            });
        };
        $mol_app_inventory_position.prototype.sub = function () {
            return [].concat(this.Product(), this.Count(), this.Status());
        };
        return $mol_app_inventory_position;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Description", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Product", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_position.prototype, "Status", null);
    $.$mol_app_inventory_position = $mol_app_inventory_position;
})($ || ($ = {}));
//position.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_position = (function (_super) {
            __extends($mol_app_inventory_position, _super);
            function $mol_app_inventory_position() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_position.prototype.position = function () {
                return new $.$mol_app_inventory_domain_position();
            };
            $mol_app_inventory_position.prototype.title = function () {
                return this.position().product().title();
            };
            $mol_app_inventory_position.prototype.description = function () {
                return this.position().product().description();
            };
            $mol_app_inventory_position.prototype.count = function (next) {
                return this.position().count(next);
            };
            $mol_app_inventory_position.prototype.status = function (next) {
                return this.position().status(next);
            };
            return $mol_app_inventory_position;
        }($.$mol_app_inventory_position));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_position.prototype, "position", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_position.prototype, "status", null);
        $mol.$mol_app_inventory_position = $mol_app_inventory_position;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//position.view.js.map
;
var cordova;
var $;
(function ($) {
    $.$mol_cordova = cordova || {
        plugins: {
            barcodeScanner: null
        }
    };
    function $mol_cordova_camera() {
        return navigator['camera'];
    }
    $.$mol_cordova_camera = $mol_cordova_camera;
})($ || ($ = {}));
//cordova.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_code = (function (_super) {
        __extends($mol_code, _super);
        function $mol_code() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_code.prototype.format = function () {
            return "";
        };
        $mol_code.prototype.hint = function () {
            return this.format();
        };
        $mol_code.prototype.Manual = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_code.prototype.event_scan = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_code.prototype.scan_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "scan_label");
        };
        $mol_code.prototype.Scan = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_scan(val); };
                obj.sub = function () { return [].concat(_this.scan_label()); };
            });
        };
        $mol_code.prototype.sub = function () {
            return [].concat(this.Manual(), this.Scan());
        };
        return $mol_code;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Manual", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "event_scan", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Scan", null);
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_code = (function (_super) {
            __extends($mol_code, _super);
            function $mol_code() {
                return _super.apply(this, arguments) || this;
            }
            $mol_code.prototype.scan_support = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_code.prototype.Scan = function () {
                return this.scan_support() ? _super.prototype.Scan.call(this) : null;
            };
            $mol_code.prototype.event_scan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_code;
        }($.$mol_code));
        $mol.$mol_code = $mol_code;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//code.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_keeper = (function (_super) {
        __extends($mol_app_inventory_keeper, _super);
        function $mol_app_inventory_keeper() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_keeper.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_keeper.prototype.position_rows = function () {
            return [];
        };
        $mol_app_inventory_keeper.prototype.body = function () {
            return this.position_rows();
        };
        $mol_app_inventory_keeper.prototype.position = function (id) {
            return null;
        };
        $mol_app_inventory_keeper.prototype.Position_row = function (id) {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.Status = function () { return null; };
                obj.position = function () { return _this.position(id); };
            });
        };
        $mol_app_inventory_keeper.prototype.code_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_keeper.prototype.code_new_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_new_hint");
        };
        $mol_app_inventory_keeper.prototype.Code = function () {
            var _this = this;
            return new $.$mol_code().setup(function (obj) {
                obj.value = function (val) { return _this.code_new(val); };
                obj.hint = function () { return _this.code_new_hint(); };
            });
        };
        $mol_app_inventory_keeper.prototype.event_submit = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_keeper.prototype.submit_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_label");
        };
        $mol_app_inventory_keeper.prototype.Submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_submit(event); };
                obj.sub = function () { return [].concat(_this.submit_label()); };
            });
        };
        $mol_app_inventory_keeper.prototype.Action_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Code(), _this.Submit()); };
            });
        };
        $mol_app_inventory_keeper.prototype.foot = function () {
            return [].concat(this.Action_row());
        };
        return $mol_app_inventory_keeper;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "domain", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_keeper.prototype, "Position_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "code_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Code", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper.prototype, "Action_row", null);
    $.$mol_app_inventory_keeper = $mol_app_inventory_keeper;
})($ || ($ = {}));
//keeper.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_keeper = (function (_super) {
            __extends($mol_app_inventory_keeper, _super);
            function $mol_app_inventory_keeper() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_keeper.prototype.position = function (code) {
                return this.domain().position(code);
            };
            $mol_app_inventory_keeper.prototype.code_new = function (next) {
                if (next === void 0)
                    return '';
                var domain = this.domain();
                var product = domain.product_by_code(next);
                if (!product)
                    return next;
                var positions = domain.positions();
                var position = domain.position(product.code());
                if (positions.indexOf(position) === -1) {
                    positions = positions.concat(position);
                    domain.positions(positions);
                }
                position.count(position.count() + 1);
                position.status($.$mol_app_inventory_domain_position_status.draft);
                return '';
            };
            $mol_app_inventory_keeper.prototype.position_rows = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.Position_row(position.product().code()); });
            };
            $mol_app_inventory_keeper.prototype.positions = function () {
                return this.domain().positions().filter(function (position) {
                    switch (position.status()) {
                        case $.$mol_app_inventory_domain_position_status.draft: return true;
                        case $.$mol_app_inventory_domain_position_status.rejected: return true;
                    }
                    return false;
                });
            };
            $mol_app_inventory_keeper.prototype.event_submit = function (next) {
                this.positions().forEach(function (position) {
                    position.status($.$mol_app_inventory_domain_position_status.pending);
                });
            };
            return $mol_app_inventory_keeper;
        }($.$mol_app_inventory_keeper));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "code_new", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "position_rows", null);
        $mol.$mol_app_inventory_keeper = $mol_app_inventory_keeper;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//keeper.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_controller = (function (_super) {
        __extends($mol_app_inventory_controller, _super);
        function $mol_app_inventory_controller() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_controller.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_controller.prototype.position_rows = function () {
            return [];
        };
        $mol_app_inventory_controller.prototype.body = function () {
            return this.position_rows();
        };
        $mol_app_inventory_controller.prototype.position = function (id) {
            return null;
        };
        $mol_app_inventory_controller.prototype.Position_row = function (id) {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.position = function () { return _this.position(id); };
            });
        };
        $mol_app_inventory_controller.prototype.event_submit = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_controller.prototype.submit_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_label");
        };
        $mol_app_inventory_controller.prototype.Submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_submit(event); };
                obj.sub = function () { return [].concat(_this.submit_label()); };
            });
        };
        $mol_app_inventory_controller.prototype.Controls_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Submit()); };
            });
        };
        $mol_app_inventory_controller.prototype.foot = function () {
            return [].concat(this.Controls_row());
        };
        return $mol_app_inventory_controller;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "domain", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_controller.prototype, "Position_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "Submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller.prototype, "Controls_row", null);
    $.$mol_app_inventory_controller = $mol_app_inventory_controller;
})($ || ($ = {}));
//controller.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_controller = (function (_super) {
            __extends($mol_app_inventory_controller, _super);
            function $mol_app_inventory_controller() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_controller.prototype.position = function (code) {
                return this.domain().position(code);
            };
            $mol_app_inventory_controller.prototype.position_rows = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.Position_row(position.product().code()); });
            };
            $mol_app_inventory_controller.prototype.positions = function () {
                return this.domain().positions().filter(function (position) {
                    switch (position.status()) {
                        case $.$mol_app_inventory_domain_position_status.pending: return true;
                        case $.$mol_app_inventory_domain_position_status.rejected: return true;
                        case $.$mol_app_inventory_domain_position_status.approved: return true;
                    }
                    return false;
                });
            };
            $mol_app_inventory_controller.prototype.event_submit = function (next) {
                this.positions().forEach(function (position) {
                    if (position.status() === $.$mol_app_inventory_domain_position_status.approved) {
                        position.status($.$mol_app_inventory_domain_position_status.completed);
                    }
                });
            };
            return $mol_app_inventory_controller;
        }($.$mol_app_inventory_controller));
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "position_rows", null);
        $mol.$mol_app_inventory_controller = $mol_app_inventory_controller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//controller.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.barFields = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.form_fields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.barButtons = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.barFields(), this.barButtons());
        };
        return $mol_form;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barFields", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "barButtons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            return $mol_form;
        }($.$mol_form));
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "submit_blocked", null);
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//form.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.namer = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.bider = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.namer(), _this.bider()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.sub = function () {
            return [].concat(this.label(), this.control());
        };
        return $mol_form_field;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "namer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "bider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "label", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_enter = (function (_super) {
        __extends($mol_app_inventory_enter, _super);
        function $mol_app_inventory_enter() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_enter.prototype.domain = function () {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_enter.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_inventory_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_inventory_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.login = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_enter.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_app_inventory_enter.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_inventory_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.password = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_inventory_enter.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_inventory_enter.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_inventory_enter.prototype.event_submit = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_inventory_enter.prototype.submit_blocked = function () {
            return false;
        };
        $mol_app_inventory_enter.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (event) { return _this.event_submit(event); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_inventory_enter.prototype.form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_inventory_enter.prototype.message = function () {
            return "";
        };
        $mol_app_inventory_enter.prototype.sub = function () {
            return [].concat(this.form(), this.message());
        };
        $mol_app_inventory_enter.prototype.messageNoAccess = function () {
            return $.$mol_locale.text(this.locale_contexts(), "messageNoAccess");
        };
        return $mol_app_inventory_enter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "domain", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_enter.prototype, "form", null);
    $.$mol_app_inventory_enter = $mol_app_inventory_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_inventory_enter = (function (_super) {
            __extends($mol_app_inventory_enter, _super);
            function $mol_app_inventory_enter() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_inventory_enter.prototype.event_submit = function () {
                this.domain().credentials({
                    login: this.login(),
                    password: this.password(),
                });
            };
            $mol_app_inventory_enter.prototype.message = function () {
                var domain = this.domain();
                if (domain.credentials() && !domain.authentificated()) {
                    return this.messageNoAccess();
                }
                return '';
            };
            return $mol_app_inventory_enter;
        }($.$mol_app_inventory_enter));
        $mol.$mol_app_inventory_enter = $mol_app_inventory_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (function () { return value; });
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    function $mol_range_in(source) {
        return new $mol_range_lazy(source);
    }
    $.$mol_range_in = $mol_range_in;
    var $mol_range_common = (function () {
        function $mol_range_common() {
            this.length = 0;
        }
        $mol_range_common.prototype.item = function (id) {
            return;
        };
        Object.defineProperty($mol_range_common.prototype, '0', {
            get: function () {
                throw new Error('Direct access to items not supported. Use item( id : number ) method instead.');
            },
            enumerable: true,
            configurable: true
        });
        $mol_range_common.prototype.forEach = function (handle) {
            var length = this.length;
            for (var i = 0; i < length; ++i) {
                handle(this.item(i), i);
            }
        };
        $mol_range_common.prototype.valueOf = function () {
            var list = [];
            this.forEach(function (val) { return list.push(val); });
            return list;
        };
        $mol_range_common.prototype.concat = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var ranges = args.map(function (range) { return range.valueOf(); });
            return (_a = this.valueOf()).concat.apply(_a, ranges);
            var _a;
        };
        $mol_range_common.prototype.slice = function (start, end) {
            if (start === void 0) { start = 0; }
            var source = this;
            return new $mol_range_lazy({
                item: function (id) {
                    return source.item(id + start);
                },
                get length() {
                    return Math.min(end, source.length) - start;
                }
            });
        };
        $mol_range_common.prototype.map = function (proceed) {
            var source = this;
            return new $mol_range_lazy({
                item: function (id) {
                    return proceed(source.item(id), id);
                },
                get length() {
                    return source.length;
                }
            });
        };
        $mol_range_common.prototype.join = function (delim) {
            if (delim === void 0) { delim = ','; }
            var list = [];
            this.forEach(function (val) { return list.push(val); });
            return list.join(delim);
        };
        $mol_range_common.prototype.every = function (check) {
            var res = true;
            this.forEach(function (val, id) {
                if (!res)
                    return;
                res = check(val, id);
            });
            return res;
        };
        $mol_range_common.prototype.some = function (check) {
            var res = false;
            this.forEach(function (val, id) {
                if (res)
                    return;
                res = check(val, id);
            });
            return res;
        };
        return $mol_range_common;
    }());
    $.$mol_range_common = $mol_range_common;
    var $mol_range_lazy = (function (_super) {
        __extends($mol_range_lazy, _super);
        function $mol_range_lazy(source) {
            if (source === void 0) { source = {
                item: function (id) { return void 0; },
                length: 0
            }; }
            var _this = _super.call(this) || this;
            _this.source = source;
            return _this;
        }
        $mol_range_lazy.prototype.item = function (id) {
            return this.source.item(id);
        };
        Object.defineProperty($mol_range_lazy.prototype, "length", {
            get: function () {
                return this.source.length;
            },
            enumerable: true,
            configurable: true
        });
        return $mol_range_lazy;
    }($mol_range_common));
    $.$mol_range_lazy = $mol_range_lazy;
})($ || ($ = {}));
//range.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_hyperhive = (function (_super) {
        __extends($mol_hyperhive, _super);
        function $mol_hyperhive() {
            return _super.apply(this, arguments) || this;
        }
        $mol_hyperhive.data = function (resource, next, force) {
            if (typeof hhfw === 'undefined') {
                var uri = "" + resource.uri + resource.table + "/table/" + resource.table + "/";
                var res = $.$mol_http_resource_json.item(uri);
                res.credentials = $.$mol_const({});
                return res.json();
            }
            var handleError = function (message) {
                var error = new Error(JSON.stringify(resource) + " " + message);
                $mol_hyperhive.data(resource, error, $.$mol_atom_force);
            };
            document.addEventListener('deviceready', function () {
                if (next === void 0) {
                    hhfw.GetDeltaStream(resource.uri, resource.table, function (result) {
                        var db = sqlitePlugin.openDatabase({
                            name: "cpprun.db",
                            location: 'default',
                        });
                        hhfw.ReadFromStorage(db, resource.table + "_$_" + resource.table, function (result2) {
                            var range = $.$mol_range_in(result2.rows);
                            $mol_hyperhive.data(resource, range, $.$mol_atom_force);
                        }, handleError);
                    }, handleError);
                }
                else {
                    for (var key in next) {
                        hhfw.AddPostParameter(key, JSON.stringify(next[key]), function () { return console.log; }, handleError);
                    }
                    hhfw.Post("" + resource.uri + resource.table + "/post/", function (resp) {
                        console.log(resp);
                        $mol_hyperhive.data(resource, void 0, $.$mol_atom_force);
                    }, handleError);
                }
            });
            throw new $.$mol_atom_wait("Loading " + resource.table + " from " + resource.uri);
        };
        return $mol_hyperhive;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_hyperhive, "data", null);
    $.$mol_hyperhive = $mol_hyperhive;
})($ || ($ = {}));
//hyperhive.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_domain = (function (_super) {
        __extends($mol_app_inventory_domain, _super);
        function $mol_app_inventory_domain() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain.prototype.table = function (name) {
            var creds = this.credentials();
            var uri = "http://" + creds.login + ":" + creds.password + "@hh.saprun.com/sync/v0.4/dev-env/dev-prj/app/";
            return $.$mol_hyperhive.data({
                uri: uri,
                table: name,
            });
        };
        $mol_app_inventory_domain.prototype.products_table = function () {
            return this.table('GET_MATERIALS');
        };
        $mol_app_inventory_domain.prototype.positions_table = function () {
            return this.table('GET_MOVEMENTS');
        };
        $mol_app_inventory_domain.prototype.product_rows_by_id = function () {
            var table = this.products_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MATERIAL_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.product_by_code = function (code) {
            return this.product(this.product_rows_by_code()[code].R_MATERIAL_ID);
        };
        $mol_app_inventory_domain.prototype.product_rows_by_code = function () {
            var table = this.products_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_BARCODE] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.positions_dict = function () {
            var table = this.positions_table();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MATERIAL_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.products = function () {
            var _this = this;
            return this.products_table().map(function (row) { return _this.product(row.R_MATERIAL_ID); });
        };
        $mol_app_inventory_domain.prototype.product = function (code) {
            var _this = this;
            var next = new $mol_app_inventory_domain_product;
            next.code = $.$mol_const(code);
            next.title = function () { return _this.product_rows_by_id()[code].R_NAME; };
            return next;
        };
        $mol_app_inventory_domain.prototype.positions = function (next) {
            var _this = this;
            var codes = next && next.map(function (position) {
                return position.product().code();
            });
            var codes2 = $.$mol_state_local.value('positions', codes) || [];
            return codes2.map(function (code) { return _this.position(code); });
        };
        $mol_app_inventory_domain.prototype.position = function (productCode) {
            var _this = this;
            var next = new $mol_app_inventory_domain_position();
            next.product = function () { return _this.product(productCode); };
            next.count = function (next) { return _this.position_count(productCode, next); };
            next.status = function (next) { return _this.position_status(productCode, next); };
            return next;
        };
        $mol_app_inventory_domain.prototype.position_count = function (productCode, next) {
            var key = "positionCount(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_local.value(key, next) || 0;
        };
        $mol_app_inventory_domain.prototype.position_status = function (productCode, next) {
            var key = "positionStatus(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_local.value(key, next) || $mol_app_inventory_domain_position_status.draft;
        };
        $mol_app_inventory_domain.prototype.credentials = function (next) {
            return $.$mol_state_session.value('credentials', next);
        };
        $mol_app_inventory_domain.prototype.authentificated = function () {
            var creds = this.credentials();
            if (!creds)
                return false;
            return true;
        };
        $mol_app_inventory_domain.prototype.message = function () {
            return void 0;
        };
        return $mol_app_inventory_domain;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "products_table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions_table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "product_rows_by_id", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "product_rows_by_code", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions_dict", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "products", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "product", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "positions", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain.prototype, "position", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain.prototype, "credentials", null);
    $.$mol_app_inventory_domain = $mol_app_inventory_domain;
    var $mol_app_inventory_domain_product = (function (_super) {
        __extends($mol_app_inventory_domain_product, _super);
        function $mol_app_inventory_domain_product() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_product.prototype.code = function () { return void 0; };
        $mol_app_inventory_domain_product.prototype.title = function () { return void 0; };
        $mol_app_inventory_domain_product.prototype.description = function () { return void 0; };
        return $mol_app_inventory_domain_product;
    }($.$mol_object));
    $.$mol_app_inventory_domain_product = $mol_app_inventory_domain_product;
    var $mol_app_inventory_domain_position = (function (_super) {
        __extends($mol_app_inventory_domain_position, _super);
        function $mol_app_inventory_domain_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_position.prototype.product = function () { return void 0; };
        $mol_app_inventory_domain_position.prototype.count = function (next) {
            return next || 0;
        };
        $mol_app_inventory_domain_position.prototype.status = function (next) {
            return next || $mol_app_inventory_domain_position_status.draft;
        };
        return $mol_app_inventory_domain_position;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_position.prototype, "count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_position.prototype, "status", null);
    $.$mol_app_inventory_domain_position = $mol_app_inventory_domain_position;
    var $mol_app_inventory_domain_position_status;
    (function ($mol_app_inventory_domain_position_status) {
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["draft"] = 'draft'] = "draft";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["pending"] = 'pending'] = "pending";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["rejected"] = 'rejected'] = "rejected";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["approved"] = 'approved'] = "approved";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["completed"] = 'completed'] = "completed";
    })($mol_app_inventory_domain_position_status = $.$mol_app_inventory_domain_position_status || ($.$mol_app_inventory_domain_position_status = {}));
})($ || ($ = {}));
//domain.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_controller_demo = (function (_super) {
        __extends($mol_app_inventory_controller_demo, _super);
        function $mol_app_inventory_controller_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_controller_demo.prototype.title1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title1");
        };
        $mol_app_inventory_controller_demo.prototype.description1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "description1");
        };
        $mol_app_inventory_controller_demo.prototype.count1 = function (val) {
            return (val !== void 0) ? val : 1;
        };
        $mol_app_inventory_controller_demo.prototype.status1 = function (val) {
            return (val !== void 0) ? val : "pending";
        };
        $mol_app_inventory_controller_demo.prototype.Position1 = function () {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.title = function () { return _this.title1(); };
                obj.description = function () { return _this.description1(); };
                obj.count = function (val) { return _this.count1(val); };
                obj.status = function (val) { return _this.status1(val); };
            });
        };
        $mol_app_inventory_controller_demo.prototype.title2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title2");
        };
        $mol_app_inventory_controller_demo.prototype.description2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "description2");
        };
        $mol_app_inventory_controller_demo.prototype.count2 = function (val) {
            return (val !== void 0) ? val : 10;
        };
        $mol_app_inventory_controller_demo.prototype.status2 = function (val) {
            return (val !== void 0) ? val : "approved";
        };
        $mol_app_inventory_controller_demo.prototype.Position2 = function () {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.title = function () { return _this.title2(); };
                obj.description = function () { return _this.description2(); };
                obj.count = function (val) { return _this.count2(val); };
                obj.status = function (val) { return _this.status2(val); };
            });
        };
        $mol_app_inventory_controller_demo.prototype.position_rows = function () {
            return [].concat(this.Position1(), this.Position2());
        };
        return $mol_app_inventory_controller_demo;
    }($.$mol_app_inventory_controller));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "count1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "status1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "Position1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "count2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "status2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_controller_demo.prototype, "Position2", null);
    $.$mol_app_inventory_controller_demo = $mol_app_inventory_controller_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit = (function (_super) {
        __extends($mol_unit, _super);
        function $mol_unit(value) {
            var _this = _super.call(this) || this;
            _this['valueOf()'] = value;
            return _this;
        }
        $mol_unit.prototype.prefix = function () {
            return '';
        };
        $mol_unit.prototype.postfix = function () {
            return '';
        };
        $mol_unit.prototype.valueOf = function () {
            return this['valueOf()'];
        };
        $mol_unit.prototype.delimiter = function () {
            return ' ';
        };
        $mol_unit.prototype.value_view = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.value_view() + this.postfix();
        };
        $mol_unit.summ = function (a, b) {
            var Class = a.Class();
            if (Class !== b.Class())
                throw new Error("Not same measure: " + Class + " , " + b.Class());
            return new Class(a.valueOf() + b.valueOf());
        };
        $mol_unit.prototype.mult = function (m) {
            var Class = this.Class();
            return new Class(this.valueOf() * m);
        };
        return $mol_unit;
    }($.$mol_object));
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_unit_money = (function (_super) {
        __extends($mol_unit_money, _super);
        function $mol_unit_money() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_usd.prototype.prefix = function () {
            return '$';
        };
        return $mol_unit_money_usd;
    }($mol_unit_money));
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    var $mol_unit_money_rur = (function (_super) {
        __extends($mol_unit_money_rur, _super);
        function $mol_unit_money_rur() {
            return _super.apply(this, arguments) || this;
        }
        $mol_unit_money_rur.prototype.postfix = function () {
            return ' ₽';
        };
        return $mol_unit_money_rur;
    }($mol_unit_money));
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
;
var $jin = this.$jin = {}

;
var $jin;
(function ($jin) {
    function concater(funcs) {
        switch (funcs.length) {
            case 0:
                return function (value) { return value; };
            case 1:
                return funcs[0];
            default:
                var mid = Math.ceil(funcs.length / 2);
                var first = $jin.concater(funcs.slice(0, mid));
                var second = $jin.concater(funcs.slice(mid));
                return function (value) {
                    return first(value) + second(value);
                };
        }
    }
    $jin.concater = concater;
})($jin || ($jin = {}));
//jin-concater.js.map
;
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var base_class = (function () {
            function base_class() {
            }
            base_class.formatter = function (pattern) {
                var _this = this;
                if (this.patterns[pattern])
                    return this.patterns[pattern];
                var tokens = Object.keys(this.patterns)
                    .sort()
                    .reverse()
                    .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
                var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
                var funcs = [];
                pattern.replace(lexer, function (str, text, token) {
                    if (text)
                        funcs.push(function () { return text; });
                    if (token)
                        funcs.push(_this.patterns[token]);
                    return str;
                });
                return this.patterns[pattern] = $jin.concater(funcs);
            };
            base_class.prototype.toString = function (pattern) {
                var Base = this.constructor;
                var formatter = Base.formatter(pattern);
                return formatter.call(Base, this);
            };
            return base_class;
        }());
        base_class.patterns = {};
        time.base_class = base_class;
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//base.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//type.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var duration_class = (function (_super) {
            __extends(duration_class, _super);
            function duration_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year) || 0;
                _this._month = config.month && Number(config.month) || 0;
                _this._day = config.day && Number(config.day) || 0;
                _this._hour = config.hour && Number(config.hour) || 0;
                _this._minute = config.minute && Number(config.minute) || 0;
                _this._second = config.second && Number(config.second) || 0;
                return _this;
            }
            duration_class.make = function (duration) {
                if (!arguments.length)
                    duration = [];
                var type = $jin_type(duration);
                switch (type) {
                    case 'Number':
                        return new this({ second: duration / 1000 });
                    case 'Array':
                        var dur = duration;
                        return new this({
                            year: dur[0],
                            month: dur[1],
                            day: dur[2],
                            hour: dur[3],
                            minute: dur[4],
                            second: dur[5],
                        });
                    case 'Object':
                        if (duration instanceof this)
                            return duration;
                        return new this(duration);
                    case 'String':
                        if (duration === 'Z') {
                            return new this({});
                        }
                        var parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                year: found[1],
                                month: found[2],
                                day: found[3],
                                hour: found[4],
                                minute: found[5],
                                second: found[6],
                            });
                        }
                        var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                hour: found[1],
                                minute: found[2],
                            });
                        }
                        throw new Error('Can not parse time duration (' + duration + ')');
                    default:
                        throw new Error('Wrong type of time duration (' + type + ')');
                }
            };
            Object.defineProperty(duration_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            duration_class.prototype.summ = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year + duration.year,
                    month: this.month + duration.month,
                    day: this.day + duration.day,
                    hour: this.hour + duration.hour,
                    minute: this.minute + duration.minute,
                    second: this.second + duration.second,
                });
            };
            duration_class.prototype.sub = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year - duration.year,
                    month: this.month - duration.month,
                    day: this.day - duration.day,
                    hour: this.hour - duration.hour,
                    minute: this.minute - duration.minute,
                    second: this.second - duration.second,
                });
            };
            duration_class.prototype.valueOf = function () {
                var day = this.year * 365 + this.month * 30.4 + this.day;
                var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
                return second * 1000;
            };
            duration_class.prototype.toJSON = function () { return this.toString(); };
            duration_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return duration_class;
        }($jin.time.base_class));
        duration_class.patterns = {
            '#Y': function (duration) {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': function (duration) {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': function (duration) {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': function (duration) {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': function (duration) {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': function (duration) {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            '+hh': function (duration) {
                var hour = duration.hour;
                var sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return (hour < 10)
                    ? (sign + '0' + hour)
                    : (sign + hour);
            },
            'mm': function (duration) {
                return (duration.minute < 10)
                    ? ('0' + duration.minute)
                    : String(duration.minute);
            },
        };
        time.duration_class = duration_class;
        time.duration = duration_class.make.bind(duration_class);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//duration.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var moment_class = (function (_super) {
            __extends(moment_class, _super);
            function moment_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year);
                _this._month = config.month && Number(config.month);
                _this._day = config.day && Number(config.day);
                _this._hour = config.hour && Number(config.hour);
                _this._minute = config.minute && Number(config.minute);
                _this._second = config.second && Number(config.second);
                _this._offset = config.offset && _this.constructor.duration_class.make(config.offset);
                _this._native = null;
                return _this;
            }
            moment_class.make = function (moment) {
                if (!arguments.length)
                    moment = new Date;
                var type = $jin_type(moment);
                switch (type) {
                    case 'Number':
                        moment = new Date(moment);
                    case 'Date':
                        var native = moment;
                        var offset = -native.getTimezoneOffset();
                        return new this({
                            year: native.getFullYear(),
                            month: native.getMonth(),
                            day: native.getDate() - 1,
                            hour: native.getHours(),
                            minute: native.getMinutes(),
                            second: native.getSeconds() + native.getMilliseconds() / 1000,
                            offset: {
                                hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                                minute: offset % 60
                            }
                        });
                    case 'String':
                        var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(moment);
                        if (!parsed)
                            throw new Error('Can not parse time moment (' + moment + ')');
                        return new this({
                            year: parsed[1],
                            month: parsed[2] ? (Number(parsed[2]) - 1) : void 0,
                            day: parsed[3] ? (Number(parsed[3]) - 1) : void 0,
                            hour: parsed[4],
                            minute: parsed[5],
                            second: parsed[6],
                            offset: parsed[7]
                        });
                    case 'Array':
                        var mom = moment;
                        return new this({
                            year: mom[0],
                            month: mom[1],
                            day: mom[2],
                            hour: mom[3],
                            minute: mom[4],
                            second: mom[5],
                            offset: mom[6],
                        });
                    case 'Object':
                        if (moment instanceof this)
                            return moment;
                        return new this(moment);
                    default:
                        throw new Error('Wrong type of time moment (' + type + ')');
                }
            };
            Object.defineProperty(moment_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "offset", {
                get: function () { return this._offset; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "native", {
                get: function () {
                    if (this._native)
                        return this._native;
                    var utc = this.toOffset('Z');
                    return this._native = new Date(Date.UTC(utc.year || 0, utc.month || 0, (utc.day || 0) + 1, utc.hour || 0, utc.minute || 0, utc.second && Math.ceil(utc.second) || 0, utc.second && (utc.second - Math.ceil(utc.second)) || 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "normal", {
                get: function () {
                    return this.constructor.make(this.native).merge({
                        year: (this._year === void 0) ? null : void 0,
                        month: (this._month === void 0) ? null : void 0,
                        day: (this._day === void 0) ? null : void 0,
                        hour: (this._hour === void 0) ? null : void 0,
                        minute: (this._minute === void 0) ? null : void 0,
                        second: (this._second === void 0) ? null : void 0,
                        offset: (this._offset === void 0) ? null : void 0,
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "weekDay", {
                get: function () {
                    return this.native.getDay();
                },
                enumerable: true,
                configurable: true
            });
            moment_class.prototype.merge = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                return new Moment({
                    year: (moment.year === void 0)
                        ? this._year
                        : (moment.year === null)
                            ? void 0
                            : moment.year,
                    month: (moment.month === void 0)
                        ? this._month
                        : (moment.month === null)
                            ? void 0
                            : moment.month,
                    day: (moment.day === void 0)
                        ? this._day
                        : (moment.day === null)
                            ? void 0
                            : moment.day,
                    hour: (moment.hour === void 0)
                        ? this._hour
                        : (moment.hour === null)
                            ? void 0
                            : moment.hour,
                    minute: (moment.minute === void 0)
                        ? this._minute
                        : (moment.minute === null)
                            ? void 0
                            : moment.minute,
                    second: (moment.second === void 0)
                        ? this._second
                        : (moment.second === null)
                            ? void 0
                            : moment.second,
                    offset: (moment.offset === void 0)
                        ? this._offset
                        : (moment.offset === null)
                            ? void 0
                            : moment.offset,
                });
            };
            moment_class.prototype.shift = function (config) {
                var Moment = this.constructor;
                var duration = Moment.duration_class.make(config);
                var moment = Moment.make().merge(this);
                var second = moment.second + duration.second;
                var native = new Date(moment.year + duration.year, moment.month + duration.month, moment.day + duration.day + 1, moment.hour + duration.hour, moment.minute + duration.minute, Math.floor(second), (second - Math.floor(second)) * 1000);
                if (isNaN(native.valueOf()))
                    throw new Error('Wrong time');
                return new Moment({
                    year: (this._year === void 0) ? void 0 : native.getFullYear(),
                    month: (this._month === void 0) ? void 0 : native.getMonth(),
                    day: (this._day === void 0) ? void 0 : native.getDate() - 1,
                    hour: (this._hour === void 0) ? void 0 : native.getHours(),
                    minute: (this._minute === void 0) ? void 0 : native.getMinutes(),
                    second: (this._second === void 0) ? void 0 : native.getSeconds() + native.getMilliseconds() / 1000,
                    offset: this.offset,
                });
            };
            moment_class.prototype.sub = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                var dur = {
                    year: (moment.year === void 0)
                        ? this.year
                        : (this.year || 0) - moment.year,
                    month: (moment.month === void 0)
                        ? this.month
                        : (this.month || 0) - moment.month,
                    day: (moment.day === void 0)
                        ? this.day
                        : (this.day || 0) - moment.day,
                    hour: (moment.hour === void 0)
                        ? this.hour
                        : (this.hour || 0) - moment.hour,
                    minute: (moment.minute === void 0)
                        ? this.minute
                        : (this.minute || 0) - moment.minute,
                    second: (moment.second === void 0)
                        ? this.second
                        : (this.second || 0) - moment.second,
                };
                return new Moment.duration_class(dur);
            };
            moment_class.prototype.toOffset = function (duration) {
                if (this._offset) {
                    var Moment = this.constructor;
                    return this
                        .shift(Moment.duration_class.make(duration).sub(this._offset))
                        .merge({ offset: duration });
                }
                else {
                    return this.merge({ offset: duration });
                }
            };
            moment_class.prototype.valueOf = function () { return this.native.getTime(); };
            moment_class.prototype.toJSON = function () { return this.toString(); };
            moment_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return moment_class;
        }($jin.time.base_class));
        moment_class.duration_class = $jin.time.duration_class;
        moment_class.patterns = {
            'YYYY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': function (moment) {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthLong[moment.month];
            },
            'Mon': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthShort[moment.month];
            },
            '-MM': function (moment) {
                if (moment.month == null)
                    return '';
                return '-' + moment.constructor.patterns['MM'](moment);
            },
            'MM': function (moment) {
                if (moment.month == null)
                    return '';
                var month = moment.month + 1;
                return (month < 10)
                    ? ('0' + month)
                    : ('' + month);
            },
            'M': function (moment) {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayLong[moment.weekDay];
            },
            'WD': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayShort[moment.weekDay];
            },
            '-DD': function (moment) {
                if (moment.day == null)
                    return '';
                return '-' + moment.constructor.patterns['DD'](moment);
            },
            'DD': function (moment) {
                if (moment.day == null)
                    return '';
                var day = moment.day + 1;
                return (day < 10)
                    ? ('0' + day)
                    : String(day);
            },
            'D': function (moment) {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': function (moment) {
                if (moment.hour == null)
                    return '';
                return 'T' + moment.constructor.patterns['hh'](moment);
            },
            'hh': function (moment) {
                if (moment.hour == null)
                    return '';
                return (moment.hour < 10)
                    ? ('0' + moment.hour)
                    : String(moment.hour);
            },
            'h': function (moment) {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return ':' + moment.constructor.patterns['mm'](moment);
            },
            'mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return (moment.minute < 10)
                    ? ('0' + moment.minute)
                    : String(moment.minute);
            },
            'm': function (moment) {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': function (moment) {
                if (moment.second == null)
                    return '';
                return ':' + moment.constructor.patterns['ss'](moment);
            },
            'ss': function (moment) {
                if (moment.second == null)
                    return '';
                var second = Math.floor(moment.second);
                return (second < 10)
                    ? ('0' + second)
                    : String(second);
            },
            's': function (moment) {
                if (moment.second == null)
                    return '';
                return String(Math.floor(moment.second));
            },
            '.sss': function (moment) {
                if (moment.second == null)
                    return '';
                if (moment.second - Math.floor(moment.second) === 0)
                    return '';
                return '.' + moment.constructor.patterns['sss'](moment);
            },
            'sss': function (moment) {
                if (moment.second == null)
                    return '';
                var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return (millisecond < 10)
                    ? ('00' + millisecond)
                    : (millisecond < 100)
                        ? ('0' + millisecond)
                        : String(millisecond);
            },
            'Z': function (moment) {
                var offset = moment.offset;
                if (!offset)
                    return '';
                return offset.toString('+hh:mm');
            }
        };
        moment_class.monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        moment_class.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        moment_class.weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        moment_class.weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                return _super.apply(this, arguments) || this;
            }
            return moment_class_ru;
        }(moment_class));
        moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix, count, length) {
        if (prefix === void 0) { prefix = ''; }
        if (count === void 0) { count = 10; }
        if (length === void 0) { length = 10; }
        if (prefix.length >= length)
            return [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        var strings = [];
        for (var i = 0; i < count; i++) {
            var text = prefix;
            for (var j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length) {
        if (length === void 0) { length = 8; }
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max) {
        if (max === void 0) { max = 1000; }
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $.$mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_stub_select_random([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_select_random(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_select_random(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_stub_select_random(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_select_random(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_stub_select_random(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_stub_select_random([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_stub_select_random(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_select_random(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift) {
        if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
        return $jin.time.moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_domain_mock = (function (_super) {
        __extends($mol_app_inventory_domain_mock, _super);
        function $mol_app_inventory_domain_mock() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_domain_mock.prototype.products = function () {
            var _this = this;
            return ['111', '222', '333'].map(function (code) { return _this.product(code); });
        };
        $mol_app_inventory_domain_mock.prototype.product = function (code) {
            if (code.length !== 5)
                return null;
            var next = new $.$mol_app_inventory_domain_product();
            next.code = $.$mol_const(code);
            next.title = $.$mol_const($.$mol_stub_product_name());
            next.description = $.$mol_const('some description');
            return next;
        };
        $mol_app_inventory_domain_mock.prototype.product_by_code = function (code) {
            return this.product(code);
        };
        $mol_app_inventory_domain_mock.prototype.positions = function (next) {
            var _this = this;
            var codes = next && next.map(function (position) {
                return position.product().code();
            });
            var codes2 = $.$mol_state_session.value('positions', codes) || [];
            return codes2.map(function (code) { return _this.position(code); });
        };
        $mol_app_inventory_domain_mock.prototype.position = function (productCode) {
            var _this = this;
            var next = new $.$mol_app_inventory_domain_position();
            next.product = function () { return _this.product(productCode); };
            next.count = function (next) { return _this.position_count(productCode, next); };
            next.status = function (next) { return _this.position_status(productCode, next); };
            return next;
        };
        $mol_app_inventory_domain_mock.prototype.position_count = function (productCode, next) {
            var key = "positionCount(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_session.value(key, next) || 0;
        };
        $mol_app_inventory_domain_mock.prototype.position_status = function (productCode, next) {
            var key = "positionStatus(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_session.value(key, next) || $.$mol_app_inventory_domain_position_status.draft;
        };
        $mol_app_inventory_domain_mock.prototype.authentificated = function () {
            var creds = this.credentials();
            if (!creds)
                return false;
            if (creds.login && creds.password)
                return true;
            return false;
        };
        $mol_app_inventory_domain_mock.prototype.message = function () {
            return '';
        };
        return $mol_app_inventory_domain_mock;
    }($.$mol_app_inventory_domain));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_mock.prototype, "products", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain_mock.prototype, "product", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_domain_mock.prototype, "positions", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_inventory_domain_mock.prototype, "position", null);
    $.$mol_app_inventory_domain_mock = $mol_app_inventory_domain_mock;
})($ || ($ = {}));
//mock.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_demo = (function (_super) {
        __extends($mol_app_inventory_demo, _super);
        function $mol_app_inventory_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_demo.prototype.domain = function () {
            return new $.$mol_app_inventory_domain_mock();
        };
        return $mol_app_inventory_demo;
    }($.$mol_app_inventory));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_demo.prototype, "domain", null);
    $.$mol_app_inventory_demo = $mol_app_inventory_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_inventory_enter_demo = (function (_super) {
        __extends($mol_app_inventory_enter_demo, _super);
        function $mol_app_inventory_enter_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_inventory_enter_demo;
    }($.$mol_app_inventory_enter));
    $.$mol_app_inventory_enter_demo = $mol_app_inventory_enter_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_inventory_keeper_demo = (function (_super) {
        __extends($mol_app_inventory_keeper_demo, _super);
        function $mol_app_inventory_keeper_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_inventory_keeper_demo.prototype.domain = function () {
            return new $.$mol_app_inventory_domain_mock();
        };
        $mol_app_inventory_keeper_demo.prototype.title1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title1");
        };
        $mol_app_inventory_keeper_demo.prototype.description1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "description1");
        };
        $mol_app_inventory_keeper_demo.prototype.count1 = function (val) {
            return (val !== void 0) ? val : 1;
        };
        $mol_app_inventory_keeper_demo.prototype.status1 = function (val) {
            return (val !== void 0) ? val : "pending";
        };
        $mol_app_inventory_keeper_demo.prototype.position1 = function () {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.Status = function () { return null; };
                obj.title = function () { return _this.title1(); };
                obj.description = function () { return _this.description1(); };
                obj.count = function (val) { return _this.count1(val); };
                obj.status = function (val) { return _this.status1(val); };
            });
        };
        $mol_app_inventory_keeper_demo.prototype.title2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title2");
        };
        $mol_app_inventory_keeper_demo.prototype.description2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "description2");
        };
        $mol_app_inventory_keeper_demo.prototype.count2 = function (val) {
            return (val !== void 0) ? val : 10;
        };
        $mol_app_inventory_keeper_demo.prototype.status2 = function (val) {
            return (val !== void 0) ? val : "approved";
        };
        $mol_app_inventory_keeper_demo.prototype.position2 = function () {
            var _this = this;
            return new $.$mol_app_inventory_position().setup(function (obj) {
                obj.Status = function () { return null; };
                obj.title = function () { return _this.title2(); };
                obj.description = function () { return _this.description2(); };
                obj.count = function (val) { return _this.count2(val); };
                obj.status = function (val) { return _this.status2(val); };
            });
        };
        $mol_app_inventory_keeper_demo.prototype.position_rows = function (val) {
            return (val !== void 0) ? val : [].concat(this.position1(), this.position2());
        };
        return $mol_app_inventory_keeper_demo;
    }($.$mol_app_inventory_keeper));
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "domain", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "count1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "status1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "position1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "count2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "status2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "position2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_inventory_keeper_demo.prototype, "position_rows", null);
    $.$mol_app_inventory_keeper_demo = $mol_app_inventory_keeper_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_quine = (function (_super) {
        __extends($mol_app_quine, _super);
        function $mol_app_quine() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_quine.prototype.content = function () {
            return "";
        };
        $mol_app_quine.prototype.texter = function () {
            var _this = this;
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return _this.content(); };
            });
        };
        $mol_app_quine.prototype.body = function () {
            return [].concat(this.texter());
        };
        return $mol_app_quine;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_quine.prototype, "texter", null);
    $.$mol_app_quine = $mol_app_quine;
})($ || ($ = {}));
//quine.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_quine = (function (_super) {
            __extends($mol_app_quine, _super);
            function $mol_app_quine() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_quine.prototype.content = function () {
                var paths = [
                    '/mol/app/quine/quine.view.tree',
                    '/mol/app/quine/quine.view.ts',
                    '/mol/app/quine/quine.view.css',
                    '/mol/app/quine/index.html',
                ];
                var sources = paths.map(function (path) {
                    return $.$mol_http_resource.item(path).text();
                });
                var content = sources.map(function (source, index) {
                    var header = "# " + paths[index] + "\n";
                    var code = '```\n' + source.replace(/\n+$/, '') + '\n```\n';
                    return header + "\n" + code;
                }).join('\n');
                return content;
            };
            return $mol_app_quine;
        }($.$mol_app_quine));
        $mol.$mol_app_quine = $mol_app_quine;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//quine.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_quine_demo = (function (_super) {
        __extends($mol_app_quine_demo, _super);
        function $mol_app_quine_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_quine_demo;
    }($.$mol_app_quine));
    $.$mol_app_quine_demo = $mol_app_quine_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_report = (function (_super) {
        __extends($mol_app_report, _super);
        function $mol_app_report() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_report.prototype.title = function () {
            return "Pump #1337";
        };
        $mol_app_report.prototype.description = function () {
            return "";
        };
        $mol_app_report.prototype.descriptor = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_report.prototype.headCells = function () {
            return [];
        };
        $mol_app_report.prototype.headRower = function () {
            var _this = this;
            return new $.$mol_app_report_rower().setup(function (obj) {
                obj.cells = function () { return _this.headCells(); };
            });
        };
        $mol_app_report.prototype.rows = function () {
            return [];
        };
        $mol_app_report.prototype.tabler = function () {
            var _this = this;
            return new $.$mol_app_report_tabler().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.headRower(), _this.rows()); };
            });
        };
        $mol_app_report.prototype.body = function () {
            return [].concat(this.descriptor(), this.tabler());
        };
        $mol_app_report.prototype.rowerCells = function (id) {
            return [];
        };
        $mol_app_report.prototype.rower = function (id) {
            var _this = this;
            return new $.$mol_app_report_rower().setup(function (obj) {
                obj.cells = function () { return _this.rowerCells(id); };
            });
        };
        $mol_app_report.prototype.cell_content = function (id) {
            return null;
        };
        $mol_app_report.prototype.cellrows = function (id) {
            return 1;
        };
        $mol_app_report.prototype.cellCols = function (id) {
            return 1;
        };
        $mol_app_report.prototype.cell = function (id) {
            var _this = this;
            return new $.$mol_app_report_cell().setup(function (obj) {
                obj.content = function () { return _this.cell_content(id); };
                obj.rows = function () { return _this.cellrows(id); };
                obj.cols = function () { return _this.cellCols(id); };
            });
        };
        $mol_app_report.prototype.cell_value = function (id, val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_report.prototype.texter = function (id) {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.cell_value(id)); };
            });
        };
        $mol_app_report.prototype.stringer = function (id) {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.cell_value(id, val); };
            });
        };
        $mol_app_report.prototype.number = function (id) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.cell_value(id, val); };
            });
        };
        return $mol_app_report;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_report.prototype, "descriptor", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_report.prototype, "headRower", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_report.prototype, "tabler", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "rower", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "cell", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "cell_value", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "texter", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "stringer", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_report.prototype, "number", null);
    $.$mol_app_report = $mol_app_report;
})($ || ($ = {}));
(function ($) {
    var $mol_app_report_tabler = (function (_super) {
        __extends($mol_app_report_tabler, _super);
        function $mol_app_report_tabler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_report_tabler.prototype.dom_name = function () {
            return "table";
        };
        $mol_app_report_tabler.prototype.rows = function () {
            return [];
        };
        $mol_app_report_tabler.prototype.sub = function () {
            return this.rows();
        };
        return $mol_app_report_tabler;
    }($.$mol_view));
    $.$mol_app_report_tabler = $mol_app_report_tabler;
})($ || ($ = {}));
(function ($) {
    var $mol_app_report_rower = (function (_super) {
        __extends($mol_app_report_rower, _super);
        function $mol_app_report_rower() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_report_rower.prototype.dom_name = function () {
            return "tr";
        };
        $mol_app_report_rower.prototype.cells = function () {
            return [];
        };
        $mol_app_report_rower.prototype.sub = function () {
            return this.cells();
        };
        return $mol_app_report_rower;
    }($.$mol_view));
    $.$mol_app_report_rower = $mol_app_report_rower;
})($ || ($ = {}));
(function ($) {
    var $mol_app_report_cell = (function (_super) {
        __extends($mol_app_report_cell, _super);
        function $mol_app_report_cell() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_report_cell.prototype.dom_name = function () {
            return "td";
        };
        $mol_app_report_cell.prototype.cols = function () {
            return 1;
        };
        $mol_app_report_cell.prototype.rows = function () {
            return 1;
        };
        $mol_app_report_cell.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "colspan": function () { return _this.cols(); },
                "rowspan": function () { return _this.rows(); },
            });
        };
        $mol_app_report_cell.prototype.content = function () {
            return null;
        };
        $mol_app_report_cell.prototype.sub = function () {
            return [].concat(this.content());
        };
        return $mol_app_report_cell;
    }($.$mol_view));
    $.$mol_app_report_cell = $mol_app_report_cell;
})($ || ($ = {}));
//report.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_report = (function (_super) {
            __extends($mol_app_report, _super);
            function $mol_app_report() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_report.prototype.formatCols = function () {
                return [
                    {
                        title: '№ п/п',
                    },
                    {
                        title: 'Наименование',
                    },
                    {
                        title: 'Форма записи',
                    },
                    {
                        title: 'Значение',
                    },
                ];
            };
            $mol_app_report.prototype.formatrows = function () {
                return [
                    {
                        title: 'Фундамент',
                        sub: [
                            {
                                title: 'Габаритный размер',
                                sub: [
                                    {
                                        field: 'base_length',
                                        title: 'Длинна',
                                    },
                                    {
                                        field: 'base_width',
                                        title: 'Ширина',
                                    },
                                    {
                                        field: 'base_height',
                                        title: 'Высота',
                                    },
                                ]
                            },
                            {
                                field: 'base_kind',
                                title: 'Вид',
                            },
                            {
                                field: 'base_type',
                                title: 'Тип',
                            },
                            {
                                field: 'base_release_year',
                                title: 'Год ввода в эксплуатацию',
                            },
                            {
                                field: 'base_weight_max',
                                title: 'Несущая способность',
                            },
                        ]
                    },
                    {
                        title: 'Кровля',
                        sub: [
                            {
                                title: 'Габаритный размер',
                                sub: [
                                    {
                                        field: 'roof_length',
                                        title: 'Длинна',
                                    },
                                    {
                                        field: 'roof_width',
                                        title: 'Ширина',
                                    },
                                    {
                                        field: 'roof_height',
                                        title: 'Высота',
                                    },
                                ]
                            },
                        ]
                    },
                ];
            };
            $mol_app_report.prototype.scheme = function () {
                return {
                    'base_length': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                    'base_width': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                    'base_height': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                    'base_kind': {
                        type: 'enum',
                        options: {
                            union: 'Единый',
                            separated: 'Раздельный насос и электродвигатель',
                        },
                    },
                    'base_type': {
                        type: 'enum',
                        options: {
                            ribbon: 'Ленточный',
                            ring: 'Кольцевой',
                            pile: 'Свайный',
                        },
                    },
                    'base_release_year': {
                        type: 'number',
                        mask: 'гггг',
                        unit: 'г.'
                    },
                    'base_weight_max': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'кг',
                    },
                    'roof_length': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                    'roof_width': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                    'roof_height': {
                        type: 'number',
                        mask: 'XX',
                        unit: 'мм',
                    },
                };
            };
            $mol_app_report.prototype.data = function () {
                return {
                    base_length: '403300',
                    base_width: '22000',
                    base_height: '25000',
                    base_kind: 'union',
                    base_type: 'ribbon',
                    base_release_year: '1993',
                    base_weight_max: '30000',
                    roof_length: '413300',
                    roof_width: '23000',
                    roof_height: '26000',
                };
            };
            $mol_app_report.prototype.description = function () {
                return "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u21161\n\u041F\u0430\u0441\u0441\u043F\u043E\u0440-\u0444\u043E\u0440\u043C\u0443\u043B\u044F\u0440\n\u041C\u0430\u0433\u0438\u0441\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u0441\u043E\u0441\u043D\u044B\u0439 \u0430\u0433\u0440\u0435\u0433\u0430\u0442\nMHA-1";
            };
            $mol_app_report.prototype.headCells = function () {
                return [
                    this.cell([0, 0]),
                    this.cell([0, 1]),
                    this.cell([0, 2]),
                    this.cell([0, 3]),
                ];
            };
            $mol_app_report.prototype.rows = function () {
                var _this = this;
                var rows = [];
                var visit = function (pos, format) {
                    rows.push(_this.rower(pos));
                    if (format.sub)
                        format.sub.forEach(function (format, index) {
                            visit(pos.concat(index + 1), format);
                        });
                };
                this.formatrows().forEach(function (format, index) {
                    visit([index + 1], format);
                });
                return rows;
            };
            $mol_app_report.prototype.formatRow = function (pos) {
                var formatrows = this.formatrows();
                var next = null;
                for (var _i = 0, pos_1 = pos; _i < pos_1.length; _i++) {
                    var index = pos_1[_i];
                    next = formatrows[index - 1];
                    formatrows = next.sub;
                }
                return next;
            };
            $mol_app_report.prototype.rowerCells = function (pos) {
                var formatRow = this.formatRow(pos);
                return [
                    this.cell(pos.concat(0)),
                    this.cell(pos.concat(1)),
                    formatRow.field ? this.cell(pos.concat(2)) : null,
                    formatRow.field ? this.cell(pos.concat(3)) : null,
                ];
            };
            $mol_app_report.prototype.cellCols = function (pos) {
                if (pos[0] === 0) {
                    return 1;
                }
                var col = pos[pos.length - 1];
                if (col === 0)
                    return 1;
                var formatRow = this.formatRow(pos.slice(0, pos.length - 1));
                if (!formatRow.field) {
                    if (col === 1)
                        return 3;
                    else
                        return 0;
                }
                return 1;
            };
            $mol_app_report.prototype.cell_content = function (pos) {
                if (pos[0] === 0) {
                    return this.texter(pos);
                }
                var col = pos[pos.length - 1];
                if (col === 3) {
                    var field = this.formatRow(pos.slice(0, pos.length - 1)).field;
                    var scheme = this.scheme()[field];
                    switch (scheme.type) {
                        case 'number': return this.number(pos);
                        case 'enum': return this.stringer(pos);
                    }
                }
                else {
                    return this.texter(pos);
                }
            };
            $mol_app_report.prototype.cell_value = function (pos, next) {
                if (next !== void 0)
                    return next;
                if (pos[0] === 0) {
                    return this.formatCols()[pos[1]].title;
                }
                var col = pos[pos.length - 1];
                switch (col) {
                    case 0: return pos.slice(0, pos.length - 1).join('.');
                    case 1: return this.cell_contentName(pos.slice(0, pos.length - 1));
                    case 2: return this.cell_contentType(pos.slice(0, pos.length - 1));
                    case 3: return this.cell_contentValue(pos.slice(0, pos.length - 1));
                }
                return '';
            };
            $mol_app_report.prototype.cell_contentName = function (pos) {
                var formatRow = this.formatRow(pos);
                return formatRow.title;
            };
            $mol_app_report.prototype.cell_contentType = function (pos) {
                var field = this.formatRow(pos).field;
                if (!field)
                    return '';
                var scheme = this.scheme()[field];
                switch (scheme.type) {
                    case 'number': return scheme.mask;
                    case 'enum': return Object.keys(scheme.options).map(function (key) { return scheme.options[key]; }).join(' / ');
                }
                return '';
            };
            $mol_app_report.prototype.cell_contentValue = function (pos) {
                var field = this.formatRow(pos).field;
                if (!field)
                    return '';
                var scheme = this.scheme()[field];
                switch (scheme.type) {
                    case 'number': return this.data()[field];
                    case 'enum': return scheme.options[this.data()[field]];
                }
                return '';
            };
            return $mol_app_report;
        }($.$mol_app_report));
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "cell_content", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "cell_value", null);
        $mol.$mol_app_report = $mol_app_report;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//report.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_report_demo = (function (_super) {
        __extends($mol_app_report_demo, _super);
        function $mol_app_report_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_report_demo;
    }($.$mol_app_report));
    $.$mol_app_report_demo = $mol_app_report_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_signup = (function (_super) {
        __extends($mol_app_signup, _super);
        function $mol_app_signup() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_signup.prototype.message_required = function () {
            return $.$mol_locale.text(this.locale_contexts(), "message_required");
        };
        $mol_app_signup.prototype.message_no_spaces = function () {
            return $.$mol_locale.text(this.locale_contexts(), "message_no_spaces");
        };
        $mol_app_signup.prototype.message_need_more_letters = function () {
            return $.$mol_locale.text(this.locale_contexts(), "message_need_more_letters");
        };
        $mol_app_signup.prototype.name_first_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_first_label");
        };
        $mol_app_signup.prototype.name_first_errors = function () {
            return [];
        };
        $mol_app_signup.prototype.name_first_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_first_hint");
        };
        $mol_app_signup.prototype.name_first = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_signup.prototype.Name_first_control = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.name_first_hint(); };
                obj.value = function (val) { return _this.name_first(val); };
            });
        };
        $mol_app_signup.prototype.Name_first_field = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.name_first_label(); };
                obj.errors = function () { return _this.name_first_errors(); };
                obj.control = function () { return _this.Name_first_control(); };
            });
        };
        $mol_app_signup.prototype.name_nick_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_nick_label");
        };
        $mol_app_signup.prototype.name_nick_errors = function () {
            return [];
        };
        $mol_app_signup.prototype.name_nick_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_nick_hint");
        };
        $mol_app_signup.prototype.name_nick = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_signup.prototype.Name_nick_control = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.name_nick_hint(); };
                obj.value = function (val) { return _this.name_nick(val); };
            });
        };
        $mol_app_signup.prototype.Name_nick_field = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.name_nick_label(); };
                obj.errors = function () { return _this.name_nick_errors(); };
                obj.control = function () { return _this.Name_nick_control(); };
            });
        };
        $mol_app_signup.prototype.name_second_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_second_label");
        };
        $mol_app_signup.prototype.name_second_errors = function () {
            return [];
        };
        $mol_app_signup.prototype.name_second_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "name_second_hint");
        };
        $mol_app_signup.prototype.name_second = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_signup.prototype.Name_second_control = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.name_second_hint(); };
                obj.value = function (val) { return _this.name_second(val); };
            });
        };
        $mol_app_signup.prototype.Name_second_field = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.name_second_label(); };
                obj.errors = function () { return _this.name_second_errors(); };
                obj.control = function () { return _this.Name_second_control(); };
            });
        };
        $mol_app_signup.prototype.sex_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "sex_label");
        };
        $mol_app_signup.prototype.sex_errors = function () {
            return [];
        };
        $mol_app_signup.prototype.sex = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_signup.prototype.sex_option_male = function () {
            return $.$mol_locale.text(this.locale_contexts(), "sex_option_male");
        };
        $mol_app_signup.prototype.sex_option_intersex = function () {
            return $.$mol_locale.text(this.locale_contexts(), "sex_option_intersex");
        };
        $mol_app_signup.prototype.sex_option_female = function () {
            return $.$mol_locale.text(this.locale_contexts(), "sex_option_female");
        };
        $mol_app_signup.prototype.sex_options = function () {
            var _this = this;
            return ({
                "male": function () { return _this.sex_option_male(); },
                "intersex": function () { return _this.sex_option_intersex(); },
                "female": function () { return _this.sex_option_female(); },
            });
        };
        $mol_app_signup.prototype.Sex_control = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.sex(val); };
                obj.options = function () { return _this.sex_options(); };
            });
        };
        $mol_app_signup.prototype.Sex_field = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.sex_label(); };
                obj.errors = function () { return _this.sex_errors(); };
                obj.control = function () { return [].concat(_this.Sex_control()); };
            });
        };
        $mol_app_signup.prototype.form_fields = function () {
            return [].concat(this.Name_first_field(), this.Name_nick_field(), this.Name_second_field(), this.Sex_field());
        };
        $mol_app_signup.prototype.submit_text = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_text");
        };
        $mol_app_signup.prototype.event_submit = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_signup.prototype.Submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submit_text()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_signup.prototype.buttons = function () {
            return [].concat(this.Submit());
        };
        return $mol_app_signup;
    }($.$mol_form));
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "name_first", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_first_control", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_first_field", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "name_nick", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_nick_control", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_nick_field", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "name_second", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_second_control", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Name_second_field", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "sex", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Sex_control", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Sex_field", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_signup.prototype, "Submit", null);
    $.$mol_app_signup = $mol_app_signup;
})($ || ($ = {}));
//signup.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_signup = (function (_super) {
            __extends($mol_app_signup, _super);
            function $mol_app_signup() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_signup.prototype.name_first = function (next) {
                return $.$mol_state_local.value(this.state_key('name_first'), next) || '';
            };
            $mol_app_signup.prototype.name_first_errors = function () {
                return this.name_first() ? [] : [this.message_required()];
            };
            $mol_app_signup.prototype.name_nick = function (next) {
                return $.$mol_state_local.value(this.state_key('name_nick'), next) || '';
            };
            $mol_app_signup.prototype.name_second = function (next) {
                return $.$mol_state_local.value(this.state_key('name_second'), next) || '';
            };
            $mol_app_signup.prototype.name_second_errors = function () {
                var value = this.name_second();
                if (value.length === 0)
                    return [this.message_required()];
                var errors = [];
                if (value.length < 3)
                    errors.push(this.message_need_more_letters());
                if (value.indexOf(' ') !== -1)
                    errors.push(this.message_no_spaces());
                return errors;
            };
            $mol_app_signup.prototype.sex = function (next) {
                return $.$mol_state_local.value(this.state_key('sex'), next) || '';
            };
            $mol_app_signup.prototype.sex_errors = function () {
                return this.sex() ? [] : [this.message_required()];
            };
            $mol_app_signup.prototype.event_submit = function (next) {
                alert("Hello, " + this.sex() + " " + this.name_first() + " (" + this.name_nick() + ") " + this.name_second() + "!");
            };
            return $mol_app_signup;
        }($.$mol_app_signup));
        $mol.$mol_app_signup = $mol_app_signup;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//signup.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_signup_demo = (function (_super) {
        __extends($mol_app_signup_demo, _super);
        function $mol_app_signup_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_signup_demo;
    }($.$mol_app_signup));
    $.$mol_app_signup_demo = $mol_app_signup_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler = (function (_super) {
        __extends($mol_labeler, _super);
        function $mol_labeler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_labeler.prototype.dom_name = function () {
            return "label";
        };
        $mol_labeler.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        return $mol_labeler;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_cost = (function (_super) {
        __extends($mol_cost, _super);
        function $mol_cost() {
            return _super.apply(this, arguments) || this;
        }
        $mol_cost.prototype.value = function () {
            return null;
        };
        $mol_cost.prototype.prefix = function () {
            return "";
        };
        $mol_cost.prototype.Prefix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_cost.prototype.value_view = function () {
            return "";
        };
        $mol_cost.prototype.Value = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.value_view()); };
            });
        };
        $mol_cost.prototype.postfix = function () {
            return "";
        };
        $mol_cost.prototype.Postfix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_cost.prototype.sub = function () {
            return [].concat(this.Prefix(), this.Value(), this.Postfix());
        };
        return $mol_cost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Prefix", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Postfix", null);
    $.$mol_cost = $mol_cost;
})($ || ($ = {}));
//cost.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_cost = (function (_super) {
            __extends($mol_cost, _super);
            function $mol_cost() {
                return _super.apply(this, arguments) || this;
            }
            $mol_cost.prototype.value = function () {
                return null;
            };
            $mol_cost.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_cost.prototype.value_view = function () {
                return this.value().value_view();
            };
            $mol_cost.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_cost;
        }($.$mol_cost));
        $mol.$mol_cost = $mol_cost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//cost.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_card = (function (_super) {
        __extends($mol_card, _super);
        function $mol_card() {
            return _super.apply(this, arguments) || this;
        }
        $mol_card.prototype.status = function () {
            return "";
        };
        $mol_card.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_card_status_type": function () { return _this.status(); },
            });
        };
        $mol_card.prototype.content = function () {
            return [];
        };
        $mol_card.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.content(); };
            });
        };
        $mol_card.prototype.status_text = function () {
            return this.status();
        };
        $mol_card.prototype.Status = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.minimal_height = function () { return 30; };
                obj.sub = function () { return [].concat(_this.status_text()); };
            });
        };
        $mol_card.prototype.rows = function () {
            return [].concat(this.Content(), this.Status());
        };
        return $mol_card;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Status", null);
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_domain_provider = (function (_super) {
        __extends($mol_app_supplies_domain_provider, _super);
        function $mol_app_supplies_domain_provider() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_group.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.manager = function () { return void 0; };
        return $mol_app_supplies_domain_supply_group;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_group = $mol_app_supplies_domain_supply_group;
    var $mol_app_supplies_domain_supply_division = (function (_super) {
        __extends($mol_app_supplies_domain_supply_division, _super);
        function $mol_app_supplies_domain_supply_division() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_pay_method = (function (_super) {
        __extends($mol_app_supplies_domain_pay_method, _super);
        function $mol_app_supplies_domain_pay_method() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_pay_method.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_pay_method.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_pay_method;
    }($.$mol_object));
    $.$mol_app_supplies_domain_pay_method = $mol_app_supplies_domain_pay_method;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supply_moment = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.division = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.store = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.price = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.quantity = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply_position;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_position = $mol_app_supplies_domain_supply_position;
    var $mol_app_supplies_domain_attachment = (function (_super) {
        __extends($mol_app_supplies_domain_attachment, _super);
        function $mol_app_supplies_domain_attachment() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_attachment.prototype.url_thumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.url_load = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballance_unit = (function (_super) {
        __extends($mol_app_supplies_domain_ballance_unit, _super);
        function $mol_app_supplies_domain_ballance_unit() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_ballance_unit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballance_unit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballance_unit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballance_unit = $mol_app_supplies_domain_ballance_unit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballance_unit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.pay_method = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    var $mol_app_supplies_domain_supply_status;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_mock.prototype.supplies = function () {
            var next = [];
            for (var i = 1; i <= 100; ++i) {
                next.push(this.supply((i * 123456789 % 987654321).toString(16).toUpperCase()));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.positions = function (supply) {
            var next = [];
            var count = 10 + Math.floor(Math.random() * 30);
            for (var i = 1; i <= count; ++i) {
                next.push(this.position({
                    supply: supply,
                    position: (i * 123456789 % 987654321).toString(16).toUpperCase()
                }));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.supply_status = function (id, next) {
            return next || $.$mol_stub_select_random([
                $mol_app_supplies_domain_supply_status.pending,
                $mol_app_supplies_domain_supply_status.approved
            ]);
        };
        $mol_app_supplies_domain_mock.prototype.supply = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.cost = function () { return new $.$mol_unit_money_usd(_this.positions(id)
                    .reduce(function (sum, pos) { return sum + pos.cost().valueOf(); }, 0)); };
                obj.status = function (next) { return _this.supply_status(id, next); };
                obj.provider = $.$mol_const(_this.provider($.$mol_stub_code(2)));
                obj.consumer = $.$mol_const(_this.consumer($.$mol_stub_code(2)));
                obj.group = $.$mol_const(_this.supply_group($.$mol_stub_code(2)));
                obj.contract = $.$mol_const(_this.contract($.$mol_stub_code(8)));
                obj.manager = $.$mol_const(_this.person($.$mol_stub_code(2)));
                obj.ballance_unit = $.$mol_const(_this.ballance_unit($.$mol_stub_code(2)));
                obj.pay_method = $.$mol_const(_this.pay_method($.$mol_stub_code(1)));
                obj.debitor = $.$mol_const(_this.debitor($.$mol_stub_code(2)));
                obj.positions = function () { return _this.positions(id); };
                obj.attachments = function (next) { return _this.attachments(id, next); };
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return new $mol_app_supplies_domain_provider().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return new $mol_app_supplies_domain_consumer().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballance_unit = function (id) {
            return new $mol_app_supplies_domain_ballance_unit().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random([
                    'ACME Enterprise',
                    'ACME Customer',
                    'ACME Inside'
                ]));
            });
        };
        $mol_app_supplies_domain_mock.prototype.division = function (id) {
            return new $mol_app_supplies_domain_supply_division().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_code(4));
            });
        };
        $mol_app_supplies_domain_mock.prototype.supply_group = function (id) {
            return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name() + ' Group');
            });
        };
        $mol_app_supplies_domain_mock.prototype.store = function (id) {
            return new $mol_app_supplies_domain_store().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_city() + ' #' + $.$mol_stub_code(2));
            });
        };
        $mol_app_supplies_domain_mock.prototype.person = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
            });
        };
        $mol_app_supplies_domain_mock.prototype.pay_method = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random(['Accounting', 'Cash']));
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
                obj.name = $.$mol_const($.$mol_stub_product_name());
                obj.supply_moment = $.$mol_const($.$mol_stub_time(60 * 24 * 365));
                obj.store = $.$mol_const(_this.store($.$mol_stub_code(2)));
                obj.division = $.$mol_const(_this.division($.$mol_stub_code(2)));
                obj.price = $.$mol_const($.$mol_stub_price(1000));
                obj.quantity = $.$mol_const(Math.round(Math.random() * 30));
                obj.cost = $.$mol_const(obj.price().mult(obj.quantity()));
            });
        };
        $mol_app_supplies_domain_mock.prototype.attachments = function (id, next) {
            return next || [];
        };
        $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
            return new $mol_app_supplies_domain_attachment().setup(function (obj) {
                obj.url_thumb = obj.url_load = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            });
        };
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "positions", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_status", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "provider", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "consumer", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "ballance_unit", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "division", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_group", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "store", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "person", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "contract", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "pay_method", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "debitor", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "position", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachments", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachment", null);
    $.$mol_app_supplies_domain_mock = $mol_app_supplies_domain_mock;
})($ || ($ = {}));
//domain.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_card = (function (_super) {
        __extends($mol_app_supplies_card, _super);
        function $mol_app_supplies_card() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_card.prototype.status = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.code_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_title");
        };
        $mol_app_supplies_card.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Code_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.code_title(); };
                obj.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_card.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_card.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_card.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_card.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_card.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_card.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Provider_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_card.prototype.items = function () {
            return [].concat(this.Code_item(), this.Cost_item(), this.Provider_item());
        };
        $mol_app_supplies_card.prototype.Group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_card.prototype.Card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.status = function () { return _this.status(); };
                obj.Content = function () { return _this.Group(); };
            });
        };
        $mol_app_supplies_card.prototype.sub = function () {
            return [].concat(this.Card());
        };
        return $mol_app_supplies_card;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Code_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Provider_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Card", null);
    $.$mol_app_supplies_card = $mol_app_supplies_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_card = (function (_super) {
            __extends($mol_app_supplies_card, _super);
            function $mol_app_supplies_card() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_card.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_card.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_card.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_card.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_card.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_card;
        }($.$mol_app_supplies_card));
        $mol.$mol_app_supplies_card = $mol_app_supplies_card;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//card.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_card_demo_pending = (function (_super) {
        __extends($mol_app_supplies_card_demo_pending, _super);
        function $mol_app_supplies_card_demo_pending() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card_demo_pending.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_card_demo_pending.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_card_demo_pending.prototype.cost = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1000000; };
            });
        };
        $mol_app_supplies_card_demo_pending.prototype.status = function () {
            return "pending";
        };
        $mol_app_supplies_card_demo_pending.prototype.arg = function () {
            return $.$mol_merge_dict(_super.prototype.arg.call(this), {
                "supply": function () { return "1"; },
            });
        };
        return $mol_app_supplies_card_demo_pending;
    }($.$mol_app_supplies_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card_demo_pending.prototype, "cost", null);
    $.$mol_app_supplies_card_demo_pending = $mol_app_supplies_card_demo_pending;
})($ || ($ = {}));
(function ($) {
    var $mol_app_supplies_card_demo_approved = (function (_super) {
        __extends($mol_app_supplies_card_demo_approved, _super);
        function $mol_app_supplies_card_demo_approved() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card_demo_approved.prototype.code = function () {
            return "43434232";
        };
        $mol_app_supplies_card_demo_approved.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_card_demo_approved.prototype.cost = function () {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 3000000; };
            });
        };
        $mol_app_supplies_card_demo_approved.prototype.status = function () {
            return "approved";
        };
        $mol_app_supplies_card_demo_approved.prototype.arg = function () {
            return $.$mol_merge_dict(_super.prototype.arg.call(this), {
                "supply": function () { return "2"; },
            });
        };
        return $mol_app_supplies_card_demo_approved;
    }($.$mol_app_supplies_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card_demo_approved.prototype, "cost", null);
    $.$mol_app_supplies_card_demo_approved = $mol_app_supplies_card_demo_approved;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_enter = (function (_super) {
        __extends($mol_app_supplies_enter, _super);
        function $mol_app_supplies_enter() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_enter.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.login = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.password = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_supplies_enter.prototype.event_submit = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_enter.prototype.submit_blocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.sub = function () {
            return [].concat(this.form());
        };
        return $mol_app_supplies_enter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "form", null);
    $.$mol_app_supplies_enter = $mol_app_supplies_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_enter = (function (_super) {
            __extends($mol_app_supplies_enter, _super);
            function $mol_app_supplies_enter() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_enter.prototype.event_submit = function () {
                this.entered(true);
            };
            return $mol_app_supplies_enter;
        }($.$mol_app_supplies_enter));
        $mol.$mol_app_supplies_enter = $mol_app_supplies_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_list = (function (_super) {
        __extends($mol_app_supplies_list, _super);
        function $mol_app_supplies_list() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_list.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_list.prototype.search_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "search_hint");
        };
        $mol_app_supplies_list.prototype.search_query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_list.prototype.Search = function () {
            var _this = this;
            return new $.$mol_code().setup(function (obj) {
                obj.hint = function () { return _this.search_hint(); };
                obj.value = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_list.prototype.Search_panel = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Search()); };
            });
        };
        $mol_app_supplies_list.prototype.sub = function () {
            return [].concat(this.Head(), this.Search_panel(), this.Body());
        };
        $mol_app_supplies_list.prototype.supply_rows = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.Supply_rows = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.supply_rows(); };
            });
        };
        $mol_app_supplies_list.prototype.body = function () {
            return [].concat(this.Supply_rows());
        };
        return $mol_app_supplies_list;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Search", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Search_panel", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Supply_rows", null);
    $.$mol_app_supplies_list = $mol_app_supplies_list;
})($ || ($ = {}));
//lister.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_list = (function (_super) {
            __extends($mol_app_supplies_list, _super);
            function $mol_app_supplies_list() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_list.prototype.requests = function () {
                return [];
            };
            $mol_app_supplies_list.prototype.supply_rows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.Supply_row(index); });
            };
            $mol_app_supplies_list.prototype.Supply_row = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_card().setup(function (obj) {
                    obj.supply = function () { return _this.supplies()[index]; };
                    obj.arg = function () { return ({
                        supply: function () { return _this.supplies()[index].id(); },
                        side: function () { return null; }
                    }); };
                });
            };
            return $mol_app_supplies_list;
        }($.$mol_app_supplies_list));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_list.prototype, "supply_rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_list.prototype, "Supply_row", null);
        $mol.$mol_app_supplies_list = $mol_app_supplies_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//lister.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_deck = (function (_super) {
        __extends($mol_deck, _super);
        function $mol_deck() {
            return _super.apply(this, arguments) || this;
        }
        $mol_deck.prototype.items = function () {
            return [];
        };
        $mol_deck.prototype.current = function (val) {
            return (val !== void 0) ? val : "0";
        };
        $mol_deck.prototype.switch_options = function () {
            return ({});
        };
        $mol_deck.prototype.Switch = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.current(val); };
                obj.options = function () { return _this.switch_options(); };
            });
        };
        $mol_deck.prototype.Content = function () {
            return null;
        };
        $mol_deck.prototype.rows = function () {
            return [].concat(this.Switch(), this.Content());
        };
        return $mol_deck;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "current", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "Switch", null);
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
(function ($) {
    var $mol_deck_item = (function (_super) {
        __extends($mol_deck_item, _super);
        function $mol_deck_item() {
            return _super.apply(this, arguments) || this;
        }
        $mol_deck_item.prototype.title = function () {
            return "";
        };
        $mol_deck_item.prototype.Content = function () {
            return null;
        };
        return $mol_deck_item;
    }($.$mol_object));
    $.$mol_deck_item = $mol_deck_item;
})($ || ($ = {}));
//deck.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_deck = (function (_super) {
            __extends($mol_deck, _super);
            function $mol_deck() {
                return _super.apply(this, arguments) || this;
            }
            $mol_deck.prototype.current = function (next) {
                return $.$mol_state_session.value(this + ".current()", next) || '0';
            };
            $mol_deck.prototype.switch_options = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = function () { return item.title(); };
                });
                return options;
            };
            $mol_deck.prototype.Content = function () {
                return this.items()[this.current()].Content();
            };
            return $mol_deck;
        }($.$mol_deck));
        __decorate([
            $.$mol_mem()
        ], $mol_deck.prototype, "Content", null);
        $mol.$mol_deck = $mol_deck;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//deck.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_tiler = (function (_super) {
        __extends($mol_tiler, _super);
        function $mol_tiler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_tiler.prototype.items = function () {
            return [];
        };
        $mol_tiler.prototype.sub = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($.$mol_view));
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//tiler.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_tiler = (function (_super) {
            __extends($mol_tiler, _super);
            function $mol_tiler() {
                return _super.apply(this, arguments) || this;
            }
            $mol_tiler.prototype.sub = function () {
                return this.groupChilds([]);
            };
            $mol_tiler.prototype.groupItems = function (path) {
                var items = (path.length === 0)
                    ? this.items()
                    : this.groupItems(path.slice(0, path.length - 1));
                if (items.length < 2)
                    return items;
                if (path.length != 0) {
                    var cut = Math.floor(items.length / 2);
                    items = path[path.length - 1]
                        ? items.slice(cut)
                        : items.slice(0, cut);
                }
                return items;
            };
            $mol_tiler.prototype.groupChilds = function (path) {
                var _this = this;
                var items = this.groupItems(path);
                if (items.length <= 2)
                    return items.map(function (_, index) { return _this.item(path.concat(index)); });
                return [
                    this.child(path.concat(0)),
                    this.child(path.concat(1)),
                ];
            };
            $mol_tiler.prototype.child = function (path) {
                return (this.groupItems(path).length > 1)
                    ? this.group(path)
                    : this.item(path);
            };
            $mol_tiler.prototype.group = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupItems(path); };
                });
            };
            return $mol_tiler;
        }($.$mol_tiler));
        __decorate([
            $.$mol_mem()
        ], $mol_tiler.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupItems", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupChilds", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "child", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "group", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "item", null);
        $mol.$mol_tiler = $mol_tiler;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//tiler.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_attach = (function (_super) {
        __extends($mol_icon_attach, _super);
        function $mol_icon_attach() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_attach.prototype.path = function () {
            return "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z";
        };
        return $mol_icon_attach;
    }($.$mol_icon));
    $.$mol_icon_attach = $mol_icon_attach;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_attach = (function (_super) {
        __extends($mol_attach, _super);
        function $mol_attach() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach.prototype.items = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_attach.prototype.attach_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach.prototype.Add = function () {
            var _this = this;
            return new $.$mol_attach_add().setup(function (obj) {
                obj.file_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_attach.prototype.content = function () {
            return [].concat(this.items(), this.Add());
        };
        $mol_attach.prototype.Content = function () {
            var _this = this;
            return new $.$mol_tiler().setup(function (obj) {
                obj.items = function () { return _this.content(); };
            });
        };
        $mol_attach.prototype.Item = function (id) {
            return new $.$mol_attach_item();
        };
        return $mol_attach;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "items", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Content", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_attach.prototype, "Item", null);
    $.$mol_attach = $mol_attach;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_item = (function (_super) {
        __extends($mol_attach_item, _super);
        function $mol_attach_item() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_item.prototype.url_thumb = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.url_load = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.uri = function (val) {
            return this.url_load(val);
        };
        $mol_attach_item.prototype.style_bg = function () {
            return "";
        };
        $mol_attach_item.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "backgroundImage": function () { return _this.style_bg(); },
            });
        };
        $mol_attach_item.prototype.loadable = function () {
            return true;
        };
        $mol_attach_item.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "download": function () { return _this.loadable(); },
            });
        };
        return $mol_attach_item;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_thumb", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_load", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "uri", null);
    $.$mol_attach_item = $mol_attach_item;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add = (function (_super) {
        __extends($mol_attach_add, _super);
        function $mol_attach_add() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_add.prototype.dom_name = function () {
            return "div";
        };
        $mol_attach_add.prototype.file_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_add.prototype.Icon = function () {
            return new $.$mol_icon_attach();
        };
        $mol_attach_add.prototype.event_capture = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.event_picked = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.Input = function () {
            var _this = this;
            return new $.$mol_attach_add_input().setup(function (obj) {
                obj.event_capture = function (val) { return _this.event_capture(val); };
                obj.event_picked = function (val) { return _this.event_picked(val); };
            });
        };
        $mol_attach_add.prototype.sub = function () {
            return [].concat(this.Icon(), this.Input());
        };
        return $mol_attach_add;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "file_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_picked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Input", null);
    $.$mol_attach_add = $mol_attach_add;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add_input = (function (_super) {
        __extends($mol_attach_add_input, _super);
        function $mol_attach_add_input() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_add_input.prototype.dom_name = function () {
            return "input";
        };
        $mol_attach_add_input.prototype.type = function () {
            return "file";
        };
        $mol_attach_add_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attach_add_input.prototype.multiple = function () {
            return true;
        };
        $mol_attach_add_input.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "type": function () { return _this.type(); },
                "accept": function () { return _this.accept(); },
                "multiple": function () { return _this.multiple(); },
            });
        };
        $mol_attach_add_input.prototype.event_capture = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event_click = function (val) {
            return this.event_capture(val);
        };
        $mol_attach_add_input.prototype.event_picked = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "change": function (val) { return _this.event_picked(val); },
            });
        };
        return $mol_attach_add_input;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_picked", null);
    $.$mol_attach_add_input = $mol_attach_add_input;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_attach = (function (_super) {
            __extends($mol_attach, _super);
            function $mol_attach() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach.prototype.attach_new = function (next) {
                var items = this.items();
                var item = this.Item(items.length);
                item.url_thumb(next);
                item.url_load(next);
                this.items(items.concat(item));
                return void 0;
            };
            return $mol_attach;
        }($.$mol_attach));
        $mol.$mol_attach = $mol_attach;
        var $mol_attach_item = (function (_super) {
            __extends($mol_attach_item, _super);
            function $mol_attach_item() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach_item.prototype.style_bg = function () {
                return "url(\"" + this.url_thumb() + "\")";
            };
            return $mol_attach_item;
        }($.$mol_attach_item));
        $mol.$mol_attach_item = $mol_attach_item;
        var $mol_attach_add = (function (_super) {
            __extends($mol_attach_add, _super);
            function $mol_attach_add() {
                return _super.apply(this, arguments) || this;
            }
            $mol_attach_add.prototype.file_new = function (next) {
                return next;
            };
            $mol_attach_add.prototype.event_capture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.file_new(url);
                }, function (error) {
                    _this.file_new(error);
                }, {
                    quality: 50
                });
            };
            $mol_attach_add.prototype.event_picked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.file_new(URL.createObjectURL(file));
                }
            };
            return $mol_attach_add;
        }($.$mol_attach_add));
        $mol.$mol_attach_add = $mol_attach_add;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//attach.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_section = (function (_super) {
        __extends($mol_section, _super);
        function $mol_section() {
            return _super.apply(this, arguments) || this;
        }
        $mol_section.prototype.head = function () {
            return null;
        };
        $mol_section.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.head()); };
            });
        };
        $mol_section.prototype.Content = function () {
            return null;
        };
        $mol_section.prototype.rows = function () {
            return [].concat(this.Head(), this.Content());
        };
        return $mol_section;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_section.prototype, "Head", null);
    $.$mol_section = $mol_section;
})($ || ($ = {}));
//section.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position = (function (_super) {
        __extends($mol_app_supplies_position, _super);
        function $mol_app_supplies_position() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position.prototype.minimal_height = function () {
            return 51;
        };
        $mol_app_supplies_position.prototype.product_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_title");
        };
        $mol_app_supplies_position.prototype.product_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Product_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.product_title(); };
                obj.content = function () { return _this.product_name(); };
            });
        };
        $mol_app_supplies_position.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_position.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Main_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Product_item(), _this.Cost_item()); };
            });
        };
        $mol_app_supplies_position.prototype.division_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_title");
        };
        $mol_app_supplies_position.prototype.division_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Division_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.division_title(); };
                obj.content = function () { return _this.division_name(); };
            });
        };
        $mol_app_supplies_position.prototype.price_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "price_label");
        };
        $mol_app_supplies_position.prototype.price = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Price = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_position.prototype.Price_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.price_label(); };
                obj.content = function () { return _this.Price(); };
            });
        };
        $mol_app_supplies_position.prototype.Addon_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Division_item(), _this.Price_item()); };
            });
        };
        $mol_app_supplies_position.prototype.quantity_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "quantity_title");
        };
        $mol_app_supplies_position.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Quantity_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.quantity_title(); };
                obj.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_position.prototype.supply_date_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_date_title");
        };
        $mol_app_supplies_position.prototype.supply_date = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Supply_date_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_date_title(); };
                obj.content = function () { return _this.supply_date(); };
            });
        };
        $mol_app_supplies_position.prototype.store_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_title");
        };
        $mol_app_supplies_position.prototype.store_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Store_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.store_title(); };
                obj.content = function () { return _this.store_name(); };
            });
        };
        $mol_app_supplies_position.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Quantity_item(), _this.Supply_date_item(), _this.Store_item()); };
            });
        };
        $mol_app_supplies_position.prototype.Row = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Main_group(), _this.Addon_group(), _this.Supply_group()); };
            });
        };
        $mol_app_supplies_position.prototype.Content = function () {
            return this.Row();
        };
        return $mol_app_supplies_position;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Product_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Main_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Division_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Addon_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Quantity_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_date_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Store_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Row", null);
    $.$mol_app_supplies_position = $mol_app_supplies_position;
})($ || ($ = {}));
//position.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_position = (function (_super) {
            __extends($mol_app_supplies_position, _super);
            function $mol_app_supplies_position() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_position.prototype.position = function () {
                return null;
            };
            $mol_app_supplies_position.prototype.product_name = function () {
                return this.position().name();
            };
            $mol_app_supplies_position.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_position.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_position.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_position.prototype.supply_date = function () {
                return this.position().supply_moment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_position.prototype.division_name = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_position.prototype.store_name = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_position;
        }($.$mol_app_supplies_position));
        $mol.$mol_app_supplies_position = $mol_app_supplies_position;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//position.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_detail = (function (_super) {
        __extends($mol_app_supplies_detail, _super);
        function $mol_app_supplies_detail() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detail.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail.prototype.Back_icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_app_supplies_detail.prototype.backArg = function () {
            return ({
                "side": function () { return ""; },
                "supply": function () { return null; },
            });
        };
        $mol_app_supplies_detail.prototype.Back = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Back_icon()); };
                obj.arg = function () { return _this.backArg(); };
            });
        };
        $mol_app_supplies_detail.prototype.head = function () {
            return [].concat(this.Back(), this.Title());
        };
        $mol_app_supplies_detail.prototype.org_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "org_title");
        };
        $mol_app_supplies_detail.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_detail.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Provider = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.customer_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "customer_label");
        };
        $mol_app_supplies_detail.prototype.consumer_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Consumer = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.customer_label(); };
                obj.content = function () { return _this.consumer_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.supply_group_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_title");
        };
        $mol_app_supplies_detail.prototype.supply_group_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_group_title(); };
                obj.content = function () { return _this.supply_group_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.ballance_unit_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_title");
        };
        $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Ballance_unit_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.ballance_unit_title(); };
                obj.content = function () { return _this.ballance_unit_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.org_items = function () {
            return [].concat(this.Provider(), this.Consumer(), this.Supply_group(), this.Ballance_unit_item());
        };
        $mol_app_supplies_detail.prototype.Org_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.org_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Org = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.org_title(); };
                obj.Content = function () { return _this.Org_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cons_title");
        };
        $mol_app_supplies_detail.prototype.contract_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "contract_title");
        };
        $mol_app_supplies_detail.prototype.contract_id = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Contract = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.contract_title(); };
                obj.content = function () { return _this.contract_id(); };
            });
        };
        $mol_app_supplies_detail.prototype.pay_method_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_title");
        };
        $mol_app_supplies_detail.prototype.pay_method_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Pay_method = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.pay_method_title(); };
                obj.content = function () { return _this.pay_method_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.manager_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_title");
        };
        $mol_app_supplies_detail.prototype.manager_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Manager = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.manager_title(); };
                obj.content = function () { return _this.manager_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.debitod_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitod_title");
        };
        $mol_app_supplies_detail.prototype.debitor_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Debitor = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.debitod_title(); };
                obj.content = function () { return _this.debitor_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_items = function () {
            return [].concat(this.Contract(), this.Pay_method(), this.Manager(), this.Debitor());
        };
        $mol_app_supplies_detail.prototype.Cons_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.cons_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cons = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.cons_title(); };
                obj.Content = function () { return _this.Cons_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_deck = function () {
            var _this = this;
            return new $.$mol_deck().setup(function (obj) {
                obj.items = function () { return [].concat(_this.Org(), _this.Cons()); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.Content = function () { return _this.Descr_deck(); };
            });
        };
        $mol_app_supplies_detail.prototype.attach_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "attach_title");
        };
        $mol_app_supplies_detail.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.attach_new = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_detail.prototype.Attach = function () {
            var _this = this;
            return new $.$mol_attach().setup(function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attach_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_app_supplies_detail.prototype.Attach_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.attach_title(); };
                obj.Content = function () { return _this.Attach(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "positions_title");
        };
        $mol_app_supplies_detail.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_detail.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detail.prototype.Cost_value = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost_value(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_head = function () {
            return [].concat(this.positions_title(), this.Cost());
        };
        $mol_app_supplies_detail.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.Positions = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.Positions_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.positions_head(); };
                obj.Content = function () { return _this.Positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.content = function () {
            return [].concat(this.Descr_card(), this.Attach_section(), this.Positions_section());
        };
        $mol_app_supplies_detail.prototype.Content = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detail.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.Content()); };
            });
        };
        $mol_app_supplies_detail.prototype.body = function () {
            return [].concat(this.List());
        };
        $mol_app_supplies_detail.prototype.approved = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail.prototype.approved_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "approved_title");
        };
        $mol_app_supplies_detail.prototype.Approve = function () {
            var _this = this;
            return new $.$mol_check_box().setup(function (obj) {
                obj.checked = function (val) { return _this.approved(val); };
                obj.label = function () { return [].concat(_this.approved_title()); };
            });
        };
        $mol_app_supplies_detail.prototype.tools = function () {
            return [].concat(this.Approve());
        };
        $mol_app_supplies_detail.prototype.Tools = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.tools(); };
            });
        };
        $mol_app_supplies_detail.prototype.foot = function () {
            return [].concat(this.Tools());
        };
        return $mol_app_supplies_detail;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Back_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Back", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Provider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Consumer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Ballance_unit_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Contract", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Pay_method", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Manager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Debitor", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_deck", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_card", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost_value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "List", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "approved", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Approve", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Tools", null);
    $.$mol_app_supplies_detail = $mol_app_supplies_detail;
})($ || ($ = {}));
//detail.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_detail = (function (_super) {
            __extends($mol_app_supplies_detail, _super);
            function $mol_app_supplies_detail() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_detail.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detail.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detail.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detail.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detail.prototype.consumer_name = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
                return this.supply().ballance_unit().name();
            };
            $mol_app_supplies_detail.prototype.supply_group_name = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detail.prototype.manager_name = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detail.prototype.pay_method_name = function () {
                return this.supply().pay_method().name();
            };
            $mol_app_supplies_detail.prototype.debitor_name = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detail.prototype.contract_id = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detail.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detail.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detail.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.Position(index); });
            };
            $mol_app_supplies_detail.prototype.Position = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_position().setup(function (obj) {
                    obj.position = function () { return _this.supply().positions()[index]; };
                });
            };
            $mol_app_supplies_detail.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.Attachment(index); });
            };
            $mol_app_supplies_detail.prototype.Attachment = function (index) {
                var _this = this;
                return new $mol.$mol_attach_item().setup(function (obj) {
                    obj.url_thumb = function () { return _this.supply().attachments()[index].url_thumb(); };
                    obj.url_load = function () { return _this.supply().attachments()[index].url_load(); };
                });
            };
            $mol_app_supplies_detail.prototype.attach_new = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat(new $.$mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.url_thumb = obj.url_load = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detail.prototype.Body = function () {
                var _this = this;
                return new $mol.$mol_scroll().setup(function (obj) {
                    obj.sub = function () { return _this.body(); };
                    obj.scroll_top = function (next) { return _this.scroll_top(next); };
                });
            };
            $mol_app_supplies_detail.prototype.scroll_top = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this + ".scroll_top(" + supplyId + ")", next);
            };
            return $mol_app_supplies_detail;
        }($.$mol_app_supplies_detail));
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Position", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Attachment", null);
        $mol.$mol_app_supplies_detail = $mol_app_supplies_detail;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//detail.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_root = (function (_super) {
        __extends($mol_app_supplies_root, _super);
        function $mol_app_supplies_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_root.prototype.entered = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_root.prototype.enter = function () {
            var _this = this;
            return new $.$mol_app_supplies_enter().setup(function (obj) {
                obj.entered = function (val) { return _this.entered(val); };
            });
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.search_query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_root.prototype.lister = function () {
            var _this = this;
            return new $.$mol_app_supplies_list().setup(function (obj) {
                obj.supplies = function () { return _this.supplies(); };
                obj.search_query = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.detailer = function () {
            var _this = this;
            return new $.$mol_app_supplies_detail().setup(function (obj) {
                obj.supply = function () { return _this.supply(); };
            });
        };
        return $mol_app_supplies_root;
    }($.$mol_stack));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "lister", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "detailer", null);
    $.$mol_app_supplies_root = $mol_app_supplies_root;
})($ || ($ = {}));
//root.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_root = (function (_super) {
            __extends($mol_app_supplies_root, _super);
            function $mol_app_supplies_root() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this + ".entered()", next) || false;
            };
            $mol_app_supplies_root.prototype.sub = function () {
                return [
                    this.entered()
                        ? this.Main()
                        : null,
                    this.Addon()
                ];
            };
            $mol_app_supplies_root.prototype.main = function () {
                return this.supply()
                    ? [this.detailer()]
                    : [];
            };
            $mol_app_supplies_root.prototype.addon = function () {
                return this.entered()
                    ? [this.lister()]
                    : [this.enter()];
            };
            $mol_app_supplies_root.prototype.title = function () {
                return (this.main()[0] || this.addon()[0]).title();
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supply_id = function (next) {
                return $.$mol_state_arg.value(this.state_key('supply'), next);
            };
            $mol_app_supplies_root.prototype.search_query = function (next) {
                if (!next)
                    return '';
                if (next.length < 7)
                    return next;
                this.supply_id(next);
                return '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supply_id();
                return id ? this.domain().supply(id) : null;
            };
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "domain", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "search_query", null);
        $mol.$mol_app_supplies_root = $mol_app_supplies_root;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//root.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_supplies_demo = (function (_super) {
        __extends($mol_app_supplies_demo, _super);
        function $mol_app_supplies_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_supplies_demo;
    }($.$mol_app_supplies_root));
    $.$mol_app_supplies_demo = $mol_app_supplies_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position_demo = (function (_super) {
        __extends($mol_app_supplies_position_demo, _super);
        function $mol_app_supplies_position_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position_demo.prototype.product_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_name");
        };
        $mol_app_supplies_position_demo.prototype.price = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1; };
            });
        };
        $mol_app_supplies_position_demo.prototype.quantity = function () {
            return "100";
        };
        $mol_app_supplies_position_demo.prototype.cost = function () {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 100; };
            });
        };
        $mol_app_supplies_position_demo.prototype.supply_date = function () {
            return "2016-01-13";
        };
        $mol_app_supplies_position_demo.prototype.division_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_name");
        };
        $mol_app_supplies_position_demo.prototype.store_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_name");
        };
        return $mol_app_supplies_position_demo;
    }($.$mol_app_supplies_position));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position_demo.prototype, "price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position_demo.prototype, "cost", null);
    $.$mol_app_supplies_position_demo = $mol_app_supplies_position_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_detail_demo = (function (_super) {
        __extends($mol_app_supplies_detail_demo, _super);
        function $mol_app_supplies_detail_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail_demo.prototype.approved = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail_demo.prototype.provider_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_name");
        };
        $mol_app_supplies_detail_demo.prototype.cost = function () {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 1234567; };
            });
        };
        $mol_app_supplies_detail_demo.prototype.consumer_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "consumer_name");
        };
        $mol_app_supplies_detail_demo.prototype.supply_group_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_name");
        };
        $mol_app_supplies_detail_demo.prototype.ballance_unit_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_name");
        };
        $mol_app_supplies_detail_demo.prototype.contract_id = function () {
            return "123675234";
        };
        $mol_app_supplies_detail_demo.prototype.pay_method_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_name");
        };
        $mol_app_supplies_detail_demo.prototype.manager_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_name");
        };
        $mol_app_supplies_detail_demo.prototype.debitor_name = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitor_name");
        };
        $mol_app_supplies_detail_demo.prototype.Pos1 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos2 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos3 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos4 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.Pos5 = function () {
            return new $.$mol_app_supplies_position_demo();
        };
        $mol_app_supplies_detail_demo.prototype.positions = function () {
            return [].concat(this.Pos1(), this.Pos2(), this.Pos3(), this.Pos4(), this.Pos5());
        };
        $mol_app_supplies_detail_demo.prototype.attachments = function () {
            return [];
        };
        return $mol_app_supplies_detail_demo;
    }($.$mol_app_supplies_detail));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "approved", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos3", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos4", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail_demo.prototype, "Pos5", null);
    $.$mol_app_supplies_detail_demo = $mol_app_supplies_detail_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_taxon = (function (_super) {
        __extends($mol_app_taxon, _super);
        function $mol_app_taxon() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_taxon.prototype.hierarchy = function () {
            return null;
        };
        $mol_app_taxon.prototype.hierarchy_field = function () {
            return "Butxt";
        };
        $mol_app_taxon.prototype.record = function (id) {
            return null;
        };
        $mol_app_taxon.prototype.Grid = function () {
            var _this = this;
            return new $.$mol_grid().setup(function (obj) {
                obj.hierarchy = function () { return _this.hierarchy(); };
                obj.hierarchy_col = function () { return _this.hierarchy_field(); };
                obj.record = function (id) { return _this.record(id); };
            });
        };
        $mol_app_taxon.prototype.Body = function () {
            return this.Grid();
        };
        return $mol_app_taxon;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_taxon.prototype, "Grid", null);
    $.$mol_app_taxon = $mol_app_taxon;
})($ || ($ = {}));
//taxon.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_taxon = (function (_super) {
            __extends($mol_app_taxon, _super);
            function $mol_app_taxon() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_taxon.prototype.hierarchy_uri = function () {
                return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_TREESet?$' + 'format=json';
            };
            $mol_app_taxon.prototype.hierarchy = function () {
                var resource = $.$mol_http_resource_json.item(this.hierarchy_uri());
                resource.credentials = $.$mol_const({});
                var hierarchy = {};
                hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: []
                };
                resource.json().d.results.forEach(function (row) {
                    var parent = hierarchy[row.ParentId];
                    var node = hierarchy[row.KeyId] = {
                        id: "" + row.KeyId,
                        parent: parent,
                        sub: [],
                    };
                    parent.sub.push(node);
                });
                return hierarchy;
            };
            $mol_app_taxon.prototype.data_uri = function () {
                return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_DATASet?$' + 'format=json';
            };
            $mol_app_taxon.prototype.data_resource = function (id) {
                var uri = this.data_uri() + '&$' + 'filter=' + encodeURIComponent("KeyId eq " + id);
                var resource = $.$mol_http_resource_json.item(uri);
                resource.credentials = $.$mol_const({});
                return resource;
            };
            $mol_app_taxon.prototype.data_table = function () {
                return {};
            };
            $mol_app_taxon.prototype.record = function (id) {
                if (!id)
                    return {};
                var cache = this.data_table();
                if (cache[id])
                    return cache[id];
                var next = this.data_resource(id).json().d.results[0];
                delete next.__metadata;
                return cache[id] = next;
            };
            return $mol_app_taxon;
        }($.$mol_app_taxon));
        __decorate([
            $.$mol_mem()
        ], $mol_app_taxon.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_taxon.prototype, "data_table", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_taxon.prototype, "record", null);
        $mol.$mol_app_taxon = $mol_app_taxon;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//taxon.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_taxon_demo = (function (_super) {
        __extends($mol_app_taxon_demo, _super);
        function $mol_app_taxon_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_taxon_demo.prototype.hierarchy_field = function () {
            return "name";
        };
        return $mol_app_taxon_demo;
    }($.$mol_app_taxon));
    $.$mol_app_taxon_demo = $mol_app_taxon_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_taxon_demo = (function (_super) {
            __extends($mol_app_taxon_demo, _super);
            function $mol_app_taxon_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_taxon_demo.prototype.hierarchy = function () {
                var dict = {};
                dict[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                for (var i = 1; i < 30000; ++i) {
                    var parent_1 = dict[Math.floor(Math.random() * i) || ''];
                    var node = dict[i] = {
                        id: "" + (i || ''),
                        parent: parent_1,
                        sub: [],
                    };
                    parent_1.sub.push(node);
                }
                return dict;
            };
            $mol_app_taxon_demo.prototype.record = function (path) {
                return {
                    name: $.$mol_stub_person_name(),
                    age: Math.ceil(Math.random() * 50),
                    sex: $.$mol_stub_select_random(['male', 'female']),
                    sexPrefer: $.$mol_stub_select_random(['male', 'female']),
                    birthDay: $.$mol_stub_time(-60 * 24 * 365 * 50).toString('YYYY-MM-DD'),
                    birthCity: $.$mol_stub_city(),
                    deathDay: $.$mol_stub_time(60 * 24 * 365 * 50).toString('YYYY-MM-DD'),
                    deathCity: $.$mol_stub_city(),
                    cityWork: $.$mol_stub_city(),
                    company: $.$mol_stub_company_name(),
                    phoneOS: $.$mol_stub_select_random(['iOS', 'Android', 'Windows']),
                    fingersCount: 7 + Math.ceil(Math.random() * 3)
                };
            };
            return $mol_app_taxon_demo;
        }($.$mol_app_taxon_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_app_taxon_demo.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_taxon_demo.prototype, "record", null);
        $mol.$mol_app_taxon_demo = $mol_app_taxon_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_todomvc = (function (_super) {
        __extends($mol_app_todomvc, _super);
        function $mol_app_todomvc() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_todomvc.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_todomvc.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.minimal_height = function () { return 142; };
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_todomvc.prototype.head_complete_enabled = function () {
            return false;
        };
        $mol_app_todomvc.prototype.completed_all = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_todomvc.prototype.Head_complete = function () {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.enabled = function () { return _this.head_complete_enabled(); };
                obj.checked = function (val) { return _this.completed_all(val); };
                obj.sub = function () { return [].concat("❯"); };
            });
        };
        $mol_app_todomvc.prototype.task_title_new = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_todomvc.prototype.event_add = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_todomvc.prototype.Add = function () {
            var _this = this;
            return new $.$mol_app_todomvc_add().setup(function (obj) {
                obj.value = function (val) { return _this.task_title_new(val); };
                obj.event_done = function (event) { return _this.event_add(event); };
            });
        };
        $mol_app_todomvc.prototype.Head_content = function () {
            return [].concat(this.Head_complete(), this.Add());
        };
        $mol_app_todomvc.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.minimal_height = function () { return 64; };
                obj.sub = function () { return _this.Head_content(); };
            });
        };
        $mol_app_todomvc.prototype.task_rows = function () {
            return [];
        };
        $mol_app_todomvc.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.task_rows(); };
            });
        };
        $mol_app_todomvc.prototype.pending_message = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pending_message");
        };
        $mol_app_todomvc.prototype.Pending = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.pending_message()); };
            });
        };
        $mol_app_todomvc.prototype.filter_all_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_all_label");
        };
        $mol_app_todomvc.prototype.Filter_all = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.filter_all_label()); };
                obj.arg = function () { return ({
                    "completed": function () { return null; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filter_active_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_active_label");
        };
        $mol_app_todomvc.prototype.Filter_active = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.filter_active_label()); };
                obj.arg = function () { return ({
                    "completed": function () { return false; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filter_completed_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_completed_label");
        };
        $mol_app_todomvc.prototype.Filter_completed = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.filter_completed_label()); };
                obj.arg = function () { return ({
                    "completed": function () { return true; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filterOptions = function () {
            return [].concat(this.Filter_all(), this.Filter_active(), this.Filter_completed());
        };
        $mol_app_todomvc.prototype.Filter = function () {
            var _this = this;
            return new $.$mol_bar().setup(function (obj) {
                obj.sub = function () { return _this.filterOptions(); };
            });
        };
        $mol_app_todomvc.prototype.sanitize_enabled = function () {
            return true;
        };
        $mol_app_todomvc.prototype.event_sanitize = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_todomvc.prototype.sanitize_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "sanitize_label");
        };
        $mol_app_todomvc.prototype.Sanitize = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.enabled = function () { return _this.sanitize_enabled(); };
                obj.event_click = function (event) { return _this.event_sanitize(event); };
                obj.sub = function () { return [].concat(_this.sanitize_label()); };
            });
        };
        $mol_app_todomvc.prototype.foot_content = function () {
            return [].concat(this.Pending(), this.Filter(), this.Sanitize());
        };
        $mol_app_todomvc.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot_content(); };
            });
        };
        $mol_app_todomvc.prototype.panels = function () {
            return [].concat(this.Head(), this.List(), this.Foot());
        };
        $mol_app_todomvc.prototype.Panel = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.panels(); };
            });
        };
        $mol_app_todomvc.prototype.Page = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Title(), _this.Panel()); };
            });
        };
        $mol_app_todomvc.prototype.sub = function () {
            return [].concat(this.Page());
        };
        $mol_app_todomvc.prototype.task_completed = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_todomvc.prototype.task_title = function (id, val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_todomvc.prototype.event_task_drop = function (id, event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_todomvc.prototype.Task_row = function (id) {
            var _this = this;
            return new $.$mol_app_todomvc_task_row().setup(function (obj) {
                obj.completed = function (val) { return _this.task_completed(id, val); };
                obj.title = function (val) { return _this.task_title(id, val); };
                obj.event_drop = function (event) { return _this.event_task_drop(id, event); };
            });
        };
        return $mol_app_todomvc;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "completed_all", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Head_complete", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "task_title_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "event_add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "List", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Pending", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Filter_all", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Filter_active", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Filter_completed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Filter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "event_sanitize", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Sanitize", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Foot", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Panel", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc.prototype, "Page", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_todomvc.prototype, "task_completed", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_todomvc.prototype, "task_title", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_todomvc.prototype, "event_task_drop", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_todomvc.prototype, "Task_row", null);
    $.$mol_app_todomvc = $mol_app_todomvc;
})($ || ($ = {}));
(function ($) {
    var $mol_app_todomvc_add = (function (_super) {
        __extends($mol_app_todomvc_add, _super);
        function $mol_app_todomvc_add() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_todomvc_add.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_app_todomvc_add.prototype.event_press = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_todomvc_add.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "keyup": function (event) { return _this.event_press(event); },
            });
        };
        $mol_app_todomvc_add.prototype.event_done = function (event) {
            return (event !== void 0) ? event : null;
        };
        return $mol_app_todomvc_add;
    }($.$mol_string));
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_add.prototype, "event_press", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_add.prototype, "event_done", null);
    $.$mol_app_todomvc_add = $mol_app_todomvc_add;
})($ || ($ = {}));
(function ($) {
    var $mol_app_todomvc_task_row = (function (_super) {
        __extends($mol_app_todomvc_task_row, _super);
        function $mol_app_todomvc_task_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_todomvc_task_row.prototype.minimal_height = function () {
            return 64;
        };
        $mol_app_todomvc_task_row.prototype.completed = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_todomvc_task_row.prototype.Complete = function () {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.checked = function (val) { return _this.completed(val); };
                obj.sub = function () { return []; };
            });
        };
        $mol_app_todomvc_task_row.prototype.title_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title_hint");
        };
        $mol_app_todomvc_task_row.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_todomvc_task_row.prototype.Title = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.title_hint(); };
                obj.value = function (val) { return _this.title(val); };
            });
        };
        $mol_app_todomvc_task_row.prototype.event_drop = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_todomvc_task_row.prototype.Drop = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.sub = function () { return [].concat("✖"); };
                obj.event_click = function (event) { return _this.event_drop(event); };
            });
        };
        $mol_app_todomvc_task_row.prototype.sub = function () {
            return [].concat(this.Complete(), this.Title(), this.Drop());
        };
        $mol_app_todomvc_task_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_app_todomvc_task_row_completed": function () { return _this.completed(); },
            });
        };
        return $mol_app_todomvc_task_row;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "completed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "Complete", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "event_drop", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_todomvc_task_row.prototype, "Drop", null);
    $.$mol_app_todomvc_task_row = $mol_app_todomvc_task_row;
})($ || ($ = {}));
//todomvc.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_todomvc_add = (function (_super) {
            __extends($mol_app_todomvc_add, _super);
            function $mol_app_todomvc_add() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_todomvc_add.prototype.event_press = function (next) {
                switch (next.keyCode) {
                    case $.$mol_keyboard_code.enter: return this.event_done(next);
                }
            };
            return $mol_app_todomvc_add;
        }($.$mol_app_todomvc_add));
        $mol.$mol_app_todomvc_add = $mol_app_todomvc_add;
        var $mol_app_todomvc = (function (_super) {
            __extends($mol_app_todomvc, _super);
            function $mol_app_todomvc() {
                var _this = _super.apply(this, arguments) || this;
                _this._id_seed = 0;
                return _this;
            }
            $mol_app_todomvc.prototype.task_ids = function (next) {
                return $.$mol_state_local.value(this.state_key('mol-todos'), next) || [];
            };
            $mol_app_todomvc.prototype.arg_completed = function () {
                return $.$mol_state_arg.value(this.state_key('completed'));
            };
            $mol_app_todomvc.prototype.groups_completed = function () {
                var groups = { 'true': [], 'false': [] };
                for (var _i = 0, _a = this.task_ids(); _i < _a.length; _i++) {
                    var id = _a[_i];
                    var task = this.task(id);
                    groups[String(task.completed)].push(id);
                }
                return groups;
            };
            $mol_app_todomvc.prototype.tasks_filtered = function () {
                var completed = this.arg_completed();
                if (completed) {
                    return this.groups_completed()[completed] || [];
                }
                else {
                    return this.task_ids();
                }
            };
            $mol_app_todomvc.prototype.completed_all = function (next) {
                if (next === void 0)
                    return this.groups_completed()['false'].length === 0;
                for (var _i = 0, _a = this.groups_completed()[String(!next)]; _i < _a.length; _i++) {
                    var id = _a[_i];
                    var task = this.task(id);
                    this.task(id, { title: task.title, completed: next });
                }
                return next;
            };
            $mol_app_todomvc.prototype.head_complete_enabled = function () {
                return this.task_ids().length > 0;
            };
            $mol_app_todomvc.prototype.pending_message = function () {
                var count = this.groups_completed()['false'].length;
                return (count === 1) ? '1 item left' : count + " items left";
            };
            $mol_app_todomvc.prototype.event_add = function (next) {
                var title = this.task_title_new();
                if (!title)
                    return;
                var id = ++this._id_seed;
                var task = { completed: false, title: title };
                this.task(id, task);
                this.task_ids(this.task_ids().concat(id));
                this.task_title_new('');
            };
            $mol_app_todomvc.prototype.task_rows = function () {
                var _this = this;
                return this.tasks_filtered().map(function (id, index) { return _this.Task_row(index); });
            };
            $mol_app_todomvc.prototype.task = function (id, next) {
                var key = this.state_key("mol-todos-" + id);
                if (next === void 0)
                    return $.$mol_state_local.value(key) || { title: '', completed: false };
                $.$mol_state_local.value(key, next);
                return next || void 0;
            };
            $mol_app_todomvc.prototype.task_completed = function (index, next) {
                var id = this.tasks_filtered()[index];
                if (next === void 0)
                    return this.task(id).completed;
                this.task(id, $.$mol_merge_dict(this.task(id), { completed: next }));
                return next;
            };
            $mol_app_todomvc.prototype.task_title = function (index, next) {
                var id = this.tasks_filtered()[index];
                if (next === void 0)
                    return this.task(id).title;
                this.task(id, $.$mol_merge_dict(this.task(id), { title: next }));
                return next;
            };
            $mol_app_todomvc.prototype.event_task_drop = function (index, next) {
                var tasks = this.tasks_filtered();
                var id = tasks[index];
                tasks = tasks.slice(0, index).concat(tasks.slice(index + 1, tasks.length));
                this.task(id, null);
                this.task_ids(tasks);
            };
            $mol_app_todomvc.prototype.event_sanitize = function () {
                var _this = this;
                this.task_ids(this.task_ids().filter(function (id) {
                    if (!_this.task(id).completed)
                        return true;
                    _this.task(id, null);
                    return false;
                }));
            };
            $mol_app_todomvc.prototype.panels = function () {
                return [
                    this.Head(),
                    this.List(),
                    this.foot_visible() ? this.Foot() : null,
                ];
            };
            $mol_app_todomvc.prototype.foot_visible = function () {
                return this.task_ids().length > 0;
            };
            $mol_app_todomvc.prototype.sanitize_enabled = function () {
                return this.groups_completed()['true'].length > 0;
            };
            return $mol_app_todomvc;
        }($.$mol_app_todomvc));
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "groups_completed", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "tasks_filtered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "completed_all", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "pending_message", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "task_rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "task_completed", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "task_title", null);
        $mol.$mol_app_todomvc = $mol_app_todomvc;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//todomvc.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_todomvc_demo = (function (_super) {
        __extends($mol_app_todomvc_demo, _super);
        function $mol_app_todomvc_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_todomvc_demo;
    }($.$mol_app_todomvc));
    $.$mol_app_todomvc_demo = $mol_app_todomvc_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_users = (function (_super) {
        __extends($mol_app_users, _super);
        function $mol_app_users() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_users.prototype.filter_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_hint");
        };
        $mol_app_users.prototype.query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_users.prototype.Filter = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.filter_hint(); };
                obj.value = function (val) { return _this.query(val); };
            });
        };
        $mol_app_users.prototype.Head_row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Filter()); };
            });
        };
        $mol_app_users.prototype.head = function () {
            return [].concat(this.Head_row());
        };
        $mol_app_users.prototype.user_rows = function () {
            return [];
        };
        $mol_app_users.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.user_rows(); };
            });
        };
        $mol_app_users.prototype.body = function () {
            return [].concat(this.List());
        };
        $mol_app_users.prototype.reload_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "reload_label");
        };
        $mol_app_users.prototype.event_reload = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_users.prototype.Reload = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.reload_label()); };
                obj.event_click = function (val) { return _this.event_reload(val); };
            });
        };
        $mol_app_users.prototype.loaded = function () {
            return false;
        };
        $mol_app_users.prototype.add_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "add_label");
        };
        $mol_app_users.prototype.event_add = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_users.prototype.Add = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.enabled = function () { return _this.loaded(); };
                obj.sub = function () { return [].concat(_this.add_label()); };
                obj.event_click = function (val) { return _this.event_add(val); };
            });
        };
        $mol_app_users.prototype.changed = function () {
            return false;
        };
        $mol_app_users.prototype.save_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "save_label");
        };
        $mol_app_users.prototype.event_save = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_users.prototype.Save = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.enabled = function () { return _this.changed(); };
                obj.sub = function () { return [].concat(_this.save_label()); };
                obj.event_click = function (val) { return _this.event_save(val); };
            });
        };
        $mol_app_users.prototype.save_result = function () {
            return null;
        };
        $mol_app_users.prototype.Message = function () {
            var _this = this;
            return new $.$mol_status().setup(function (obj) {
                obj.status = function () { return _this.save_result(); };
            });
        };
        $mol_app_users.prototype.Controller = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Reload(), _this.Add(), _this.Save(), _this.Message()); };
            });
        };
        $mol_app_users.prototype.foot = function () {
            return [].concat(this.Controller());
        };
        return $mol_app_users;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Filter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Head_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "List", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "event_reload", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Reload", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "event_add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "event_save", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Save", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Message", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users.prototype, "Controller", null);
    $.$mol_app_users = $mol_app_users;
})($ || ($ = {}));
(function ($) {
    var $mol_app_users_row = (function (_super) {
        __extends($mol_app_users_row, _super);
        function $mol_app_users_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_users_row.prototype.minimal_height = function () {
            return 68;
        };
        $mol_app_users_row.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_users_row.prototype.Title = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.title(val); };
            });
        };
        $mol_app_users_row.prototype.drop_label = function () {
            return "Drop";
        };
        $mol_app_users_row.prototype.event_drop = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_users_row.prototype.Drop = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.drop_label()); };
                obj.event_click = function (val) { return _this.event_drop(val); };
            });
        };
        $mol_app_users_row.prototype.sub = function () {
            return [].concat(this.Title(), this.Drop());
        };
        return $mol_app_users_row;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_app_users_row.prototype, "title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users_row.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users_row.prototype, "event_drop", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_users_row.prototype, "Drop", null);
    $.$mol_app_users_row = $mol_app_users_row;
})($ || ($ = {}));
//users.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_users = (function (_super) {
            __extends($mol_app_users, _super);
            function $mol_app_users() {
                var _this = _super.apply(this, arguments) || this;
                _this._query_timer = 0;
                return _this;
            }
            $mol_app_users.prototype.query_arg = function (next) {
                return $.$mol_state_arg.value(this.state_key('query'), next);
            };
            $mol_app_users.prototype.query = function (next) {
                var _this = this;
                if (next == null) {
                    return this.query_arg();
                }
                else {
                    this.query_arg(next);
                    if (this._query_timer)
                        clearTimeout(this._query_timer);
                    this._query_timer = setTimeout(function () { _this.query(null); }, 500);
                }
            };
            $mol_app_users.prototype.master = function () {
                var query = this.query();
                if (query) {
                    var uri = "https://api.github.com/search/users?per_page=100&q=" + encodeURIComponent(query);
                    var resource = $.$mol_http_resource_json.item(uri);
                }
                else {
                    resource = null;
                }
                return resource;
            };
            $mol_app_users.prototype.sub = function () {
                var next = [this.Head()];
                if (this.master())
                    next = [].concat(next, this.Body(), this.Foot());
                return next;
            };
            $mol_app_users.prototype.users = function (next) {
                var usersMaster = this.users_master();
                return next || usersMaster;
            };
            $mol_app_users.prototype.users_master = function (next, force) {
                if (!this.query())
                    return [];
                var master = this.master();
                if (next === void 0) {
                    return master.json(void 0, force).items.map(function (item) { return item.login; });
                }
                master.json(next && { items: next.map(function (login) { return ({ login: login }); }) });
                return next;
            };
            $mol_app_users.prototype.save_result = function () {
                return this.users_master();
            };
            $mol_app_users.prototype.event_reload = function (next) {
                this.users_master(void 0, $.$mol_atom_force);
            };
            $mol_app_users.prototype.event_add = function (next) {
                this.users(this.users().concat(''));
            };
            $mol_app_users.prototype.event_user_drop = function (id, next) {
                this.users(this.users().filter(function (name, i) { return (i !== id); }));
            };
            $mol_app_users.prototype.changed = function () {
                return JSON.stringify(this.users_master()) !== JSON.stringify(this.users());
            };
            $mol_app_users.prototype.loaded = function () {
                return Boolean(this.users().valueOf());
            };
            $mol_app_users.prototype.event_save = function (next) {
                if (!this.changed())
                    return;
                try {
                    this.users_master(this.users()).valueOf();
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    console.log('---', error);
                }
            };
            $mol_app_users.prototype.body = function () {
                if (this.users().length) {
                    return [this.List()];
                }
                else {
                    return ['Users not found'];
                }
            };
            $mol_app_users.prototype.user_rows = function () {
                var _this = this;
                return this.users().map(function (user, id) { return _this.User_row(id); });
            };
            $mol_app_users.prototype.User_row = function (id) {
                var _this = this;
                return new $.$mol_app_users_row().setup(function (obj) {
                    obj.title = function (next) { return _this.user_name(id, next); };
                    obj.event_drop = function (next) { return _this.event_user_drop(id, next); };
                });
            };
            $mol_app_users.prototype.user_name = function (id, next) {
                if (next === void 0)
                    return this.users()[id] || '';
                this.users(this.users().map(function (name, i) { return (i === id) ? next : name; }));
                return next;
            };
            return $mol_app_users;
        }($.$mol_app_users));
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "query", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "master", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "users", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "users_master", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "save_result", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "user_rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_users.prototype, "User_row", null);
        $mol.$mol_app_users = $mol_app_users;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//users.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_app_users_demo = (function (_super) {
        __extends($mol_app_users_demo, _super);
        function $mol_app_users_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_app_users_demo;
    }($.$mol_app_users));
    $.$mol_app_users_demo = $mol_app_users_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        try {
            handler();
        }
        catch (error) {
            if (ErrorRight)
                $mol_assert_ok(error instanceof ErrorRight);
            return error;
        }
        throw new Error('Not failed');
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    }
    $.$mol_assert_unique = $mol_assert_unique;
})($ || ($ = {}));
//assert.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_attach_demo_empty = (function (_super) {
        __extends($mol_attach_demo_empty, _super);
        function $mol_attach_demo_empty() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_attach_demo_empty;
    }($.$mol_attach));
    $.$mol_attach_demo_empty = $mol_attach_demo_empty;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_demo_filled = (function (_super) {
        __extends($mol_attach_demo_filled, _super);
        function $mol_attach_demo_filled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_attach_demo_filled.prototype.Item1 = function () {
            return new $.$mol_attach_item().setup(function (obj) {
                obj.url_thumb = function () { return "/mol/logo/logo.svg"; };
                obj.url_load = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attach_demo_filled.prototype.Item2 = function () {
            return new $.$mol_attach_item().setup(function (obj) {
                obj.url_thumb = function () { return "/mol/logo/logo.svg"; };
                obj.url_load = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attach_demo_filled.prototype.Item3 = function () {
            return new $.$mol_attach_item().setup(function (obj) {
                obj.url_thumb = function () { return "/mol/logo/logo.svg"; };
                obj.url_load = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attach_demo_filled.prototype.items = function () {
            return [].concat(this.Item1(), this.Item2(), this.Item3());
        };
        return $mol_attach_demo_filled;
    }($.$mol_attach));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_demo_filled.prototype, "Item1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_demo_filled.prototype, "Item2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_demo_filled.prototype, "Item3", null);
    $.$mol_attach_demo_filled = $mol_attach_demo_filled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_bar_demo_search = (function (_super) {
        __extends($mol_bar_demo_search, _super);
        function $mol_bar_demo_search() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bar_demo_search.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_bar_demo_search.prototype.stringer = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
            });
        };
        $mol_bar_demo_search.prototype.submitter = function () {
            return new $.$mol_button().setup(function (obj) {
                obj.sub = function () { return [].concat("submit"); };
            });
        };
        $mol_bar_demo_search.prototype.sub = function () {
            return [].concat(this.stringer(), this.submitter());
        };
        return $mol_bar_demo_search;
    }($.$mol_bar));
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_search.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_search.prototype, "stringer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_search.prototype, "submitter", null);
    $.$mol_bar_demo_search = $mol_bar_demo_search;
})($ || ($ = {}));
(function ($) {
    var $mol_bar_demo_login = (function (_super) {
        __extends($mol_bar_demo_login, _super);
        function $mol_bar_demo_login() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bar_demo_login.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_bar_demo_login.prototype.stringer = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
            });
        };
        $mol_bar_demo_login.prototype.rememberer = function () {
            return new $.$mol_check_box().setup(function (obj) {
                obj.label = function () { return [].concat("Remember me"); };
            });
        };
        $mol_bar_demo_login.prototype.submitter = function () {
            return new $.$mol_button().setup(function (obj) {
                obj.sub = function () { return [].concat("submit"); };
            });
        };
        $mol_bar_demo_login.prototype.sub = function () {
            return [].concat(this.stringer(), this.rememberer(), this.submitter());
        };
        return $mol_bar_demo_login;
    }($.$mol_bar));
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_login.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_login.prototype, "stringer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_login.prototype, "rememberer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_bar_demo_login.prototype, "submitter", null);
    $.$mol_bar_demo_login = $mol_bar_demo_login;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_bench_demo = (function (_super) {
        __extends($mol_bench_demo, _super);
        function $mol_bench_demo() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_bench_demo;
    }($.$mol_bench));
    $.$mol_bench_demo = $mol_bench_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_bench_demo = (function (_super) {
            __extends($mol_bench_demo, _super);
            function $mol_bench_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_bench_demo.prototype.col_sort = function (next) {
                return next || 'mid';
            };
            $mol_bench_demo.prototype.result = function () {
                return {
                    'bubble': {
                        'algorithm': 'bubble',
                        'min': '1 ms',
                        'mid': '11 ms',
                        'max': '99 ms',
                    },
                    'qsort': {
                        'algorithm': 'qsort',
                        'min': '2 ms',
                        'mid': '5 ms',
                        'max': '10 ms',
                    },
                };
            };
            return $mol_bench_demo;
        }($.$mol_bench_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_bench_demo.prototype, "col_sort", null);
        $mol.$mol_bench_demo = $mol_bench_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_button_demo_major_enabled = (function (_super) {
        __extends($mol_button_demo_major_enabled, _super);
        function $mol_button_demo_major_enabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_major_enabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_major_enabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        return $mol_button_demo_major_enabled;
    }($.$mol_button_major));
    $.$mol_button_demo_major_enabled = $mol_button_demo_major_enabled;
})($ || ($ = {}));
(function ($) {
    var $mol_button_demo_minor_enabled = (function (_super) {
        __extends($mol_button_demo_minor_enabled, _super);
        function $mol_button_demo_minor_enabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_minor_enabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_minor_enabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        return $mol_button_demo_minor_enabled;
    }($.$mol_button_minor));
    $.$mol_button_demo_minor_enabled = $mol_button_demo_minor_enabled;
})($ || ($ = {}));
(function ($) {
    var $mol_button_demo_major_disabled = (function (_super) {
        __extends($mol_button_demo_major_disabled, _super);
        function $mol_button_demo_major_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_major_disabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_major_disabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        $mol_button_demo_major_disabled.prototype.enabled = function () {
            return false;
        };
        return $mol_button_demo_major_disabled;
    }($.$mol_button_major));
    $.$mol_button_demo_major_disabled = $mol_button_demo_major_disabled;
})($ || ($ = {}));
(function ($) {
    var $mol_button_demo_minor_disabled = (function (_super) {
        __extends($mol_button_demo_minor_disabled, _super);
        function $mol_button_demo_minor_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_minor_disabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_minor_disabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        $mol_button_demo_minor_disabled.prototype.enabled = function () {
            return false;
        };
        return $mol_button_demo_minor_disabled;
    }($.$mol_button_minor));
    $.$mol_button_demo_minor_disabled = $mol_button_demo_minor_disabled;
})($ || ($ = {}));
(function ($) {
    var $mol_button_demo_danger_enabled = (function (_super) {
        __extends($mol_button_demo_danger_enabled, _super);
        function $mol_button_demo_danger_enabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_danger_enabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_danger_enabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        return $mol_button_demo_danger_enabled;
    }($.$mol_button_danger));
    $.$mol_button_demo_danger_enabled = $mol_button_demo_danger_enabled;
})($ || ($ = {}));
(function ($) {
    var $mol_button_demo_danger_disabled = (function (_super) {
        __extends($mol_button_demo_danger_disabled, _super);
        function $mol_button_demo_danger_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_button_demo_danger_disabled.prototype.label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "label");
        };
        $mol_button_demo_danger_disabled.prototype.sub = function () {
            return [].concat(this.label());
        };
        $mol_button_demo_danger_disabled.prototype.enabled = function () {
            return false;
        };
        return $mol_button_demo_danger_disabled;
    }($.$mol_button_danger));
    $.$mol_button_demo_danger_disabled = $mol_button_demo_danger_disabled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_card_demo_status = (function (_super) {
        __extends($mol_card_demo_status, _super);
        function $mol_card_demo_status() {
            return _super.apply(this, arguments) || this;
        }
        $mol_card_demo_status.prototype.Content = function () {
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat("Hello pending!"); };
            });
        };
        $mol_card_demo_status.prototype.status = function () {
            return "pending";
        };
        return $mol_card_demo_status;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_card_demo_status.prototype, "Content", null);
    $.$mol_card_demo_status = $mol_card_demo_status;
})($ || ($ = {}));
(function ($) {
    var $mol_card_demo_hello = (function (_super) {
        __extends($mol_card_demo_hello, _super);
        function $mol_card_demo_hello() {
            return _super.apply(this, arguments) || this;
        }
        $mol_card_demo_hello.prototype.Content = function () {
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat("Hello world!"); };
            });
        };
        return $mol_card_demo_hello;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_card_demo_hello.prototype, "Content", null);
    $.$mol_card_demo_hello = $mol_card_demo_hello;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_check_box_demo_labeled_base = (function (_super) {
        __extends($mol_check_box_demo_labeled_base, _super);
        function $mol_check_box_demo_labeled_base() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box_demo_labeled_base.prototype.c1Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c1Label");
        };
        $mol_check_box_demo_labeled_base.prototype.label = function () {
            return [].concat(this.c1Label());
        };
        return $mol_check_box_demo_labeled_base;
    }($.$mol_check_box));
    $.$mol_check_box_demo_labeled_base = $mol_check_box_demo_labeled_base;
})($ || ($ = {}));
(function ($) {
    var $mol_check_box_demo_labeled_checked = (function (_super) {
        __extends($mol_check_box_demo_labeled_checked, _super);
        function $mol_check_box_demo_labeled_checked() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box_demo_labeled_checked.prototype.c2Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c2Label");
        };
        $mol_check_box_demo_labeled_checked.prototype.label = function () {
            return [].concat(this.c2Label());
        };
        $mol_check_box_demo_labeled_checked.prototype.checked = function () {
            return true;
        };
        return $mol_check_box_demo_labeled_checked;
    }($.$mol_check_box));
    $.$mol_check_box_demo_labeled_checked = $mol_check_box_demo_labeled_checked;
})($ || ($ = {}));
(function ($) {
    var $mol_check_box_demo_labeled_disabled = (function (_super) {
        __extends($mol_check_box_demo_labeled_disabled, _super);
        function $mol_check_box_demo_labeled_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box_demo_labeled_disabled.prototype.c6Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c6Label");
        };
        $mol_check_box_demo_labeled_disabled.prototype.label = function () {
            return [].concat(this.c6Label());
        };
        $mol_check_box_demo_labeled_disabled.prototype.checked = function () {
            return true;
        };
        $mol_check_box_demo_labeled_disabled.prototype.enabled = function () {
            return false;
        };
        return $mol_check_box_demo_labeled_disabled;
    }($.$mol_check_box));
    $.$mol_check_box_demo_labeled_disabled = $mol_check_box_demo_labeled_disabled;
})($ || ($ = {}));
(function ($) {
    var $mol_check_box_demo_alone_base = (function (_super) {
        __extends($mol_check_box_demo_alone_base, _super);
        function $mol_check_box_demo_alone_base() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_check_box_demo_alone_base;
    }($.$mol_check_box));
    $.$mol_check_box_demo_alone_base = $mol_check_box_demo_alone_base;
})($ || ($ = {}));
(function ($) {
    var $mol_check_box_demo_alone_checked = (function (_super) {
        __extends($mol_check_box_demo_alone_checked, _super);
        function $mol_check_box_demo_alone_checked() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box_demo_alone_checked.prototype.checked = function () {
            return true;
        };
        return $mol_check_box_demo_alone_checked;
    }($.$mol_check_box));
    $.$mol_check_box_demo_alone_checked = $mol_check_box_demo_alone_checked;
})($ || ($ = {}));
(function ($) {
    var $mol_check_box_demo_alone_disabled = (function (_super) {
        __extends($mol_check_box_demo_alone_disabled, _super);
        function $mol_check_box_demo_alone_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_box_demo_alone_disabled.prototype.checked = function () {
            return true;
        };
        $mol_check_box_demo_alone_disabled.prototype.enabled = function () {
            return false;
        };
        return $mol_check_box_demo_alone_disabled;
    }($.$mol_check_box));
    $.$mol_check_box_demo_alone_disabled = $mol_check_box_demo_alone_disabled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_check_expand_demo_labeled_base = (function (_super) {
        __extends($mol_check_expand_demo_labeled_base, _super);
        function $mol_check_expand_demo_labeled_base() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_expand_demo_labeled_base.prototype.c1Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c1Label");
        };
        $mol_check_expand_demo_labeled_base.prototype.label = function () {
            return [].concat(this.c1Label());
        };
        return $mol_check_expand_demo_labeled_base;
    }($.$mol_check_expand));
    $.$mol_check_expand_demo_labeled_base = $mol_check_expand_demo_labeled_base;
})($ || ($ = {}));
(function ($) {
    var $mol_check_expand_demo_labeled_expanded = (function (_super) {
        __extends($mol_check_expand_demo_labeled_expanded, _super);
        function $mol_check_expand_demo_labeled_expanded() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_expand_demo_labeled_expanded.prototype.c2Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c2Label");
        };
        $mol_check_expand_demo_labeled_expanded.prototype.label = function () {
            return [].concat(this.c2Label());
        };
        $mol_check_expand_demo_labeled_expanded.prototype.checked = function () {
            return true;
        };
        return $mol_check_expand_demo_labeled_expanded;
    }($.$mol_check_expand));
    $.$mol_check_expand_demo_labeled_expanded = $mol_check_expand_demo_labeled_expanded;
})($ || ($ = {}));
(function ($) {
    var $mol_check_expand_demo_empty_base = (function (_super) {
        __extends($mol_check_expand_demo_empty_base, _super);
        function $mol_check_expand_demo_empty_base() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_check_expand_demo_empty_base;
    }($.$mol_check_expand));
    $.$mol_check_expand_demo_empty_base = $mol_check_expand_demo_empty_base;
})($ || ($ = {}));
(function ($) {
    var $mol_check_expand_demo_empty_expanded = (function (_super) {
        __extends($mol_check_expand_demo_empty_expanded, _super);
        function $mol_check_expand_demo_empty_expanded() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_expand_demo_empty_expanded.prototype.checked = function () {
            return true;
        };
        return $mol_check_expand_demo_empty_expanded;
    }($.$mol_check_expand));
    $.$mol_check_expand_demo_empty_expanded = $mol_check_expand_demo_empty_expanded;
})($ || ($ = {}));
(function ($) {
    var $mol_check_expand_demo_disabled = (function (_super) {
        __extends($mol_check_expand_demo_disabled, _super);
        function $mol_check_expand_demo_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_check_expand_demo_disabled.prototype.c5Label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "c5Label");
        };
        $mol_check_expand_demo_disabled.prototype.label = function () {
            return [].concat(this.c5Label());
        };
        $mol_check_expand_demo_disabled.prototype.disabled = function () {
            return true;
        };
        return $mol_check_expand_demo_disabled;
    }($.$mol_check_expand));
    $.$mol_check_expand_demo_disabled = $mol_check_expand_demo_disabled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_code_demo_qr = (function (_super) {
        __extends($mol_code_demo_qr, _super);
        function $mol_code_demo_qr() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_qr.prototype.format = function () {
            return "QR_CODE";
        };
        return $mol_code_demo_qr;
    }($.$mol_code));
    $.$mol_code_demo_qr = $mol_code_demo_qr;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_dataMatrix = (function (_super) {
        __extends($mol_code_demo_dataMatrix, _super);
        function $mol_code_demo_dataMatrix() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_dataMatrix.prototype.format = function () {
            return "DATA_MATRIX";
        };
        return $mol_code_demo_dataMatrix;
    }($.$mol_code));
    $.$mol_code_demo_dataMatrix = $mol_code_demo_dataMatrix;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_upc_e = (function (_super) {
        __extends($mol_code_demo_upc_e, _super);
        function $mol_code_demo_upc_e() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_upc_e.prototype.format = function () {
            return "UPC_E";
        };
        return $mol_code_demo_upc_e;
    }($.$mol_code));
    $.$mol_code_demo_upc_e = $mol_code_demo_upc_e;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_upc_a = (function (_super) {
        __extends($mol_code_demo_upc_a, _super);
        function $mol_code_demo_upc_a() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_upc_a.prototype.format = function () {
            return "UPC_A";
        };
        return $mol_code_demo_upc_a;
    }($.$mol_code));
    $.$mol_code_demo_upc_a = $mol_code_demo_upc_a;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_ean_8 = (function (_super) {
        __extends($mol_code_demo_ean_8, _super);
        function $mol_code_demo_ean_8() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_ean_8.prototype.format = function () {
            return "EAN_8";
        };
        return $mol_code_demo_ean_8;
    }($.$mol_code));
    $.$mol_code_demo_ean_8 = $mol_code_demo_ean_8;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_ean_13 = (function (_super) {
        __extends($mol_code_demo_ean_13, _super);
        function $mol_code_demo_ean_13() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_ean_13.prototype.format = function () {
            return "EAN_13";
        };
        return $mol_code_demo_ean_13;
    }($.$mol_code));
    $.$mol_code_demo_ean_13 = $mol_code_demo_ean_13;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_code_128 = (function (_super) {
        __extends($mol_code_demo_code_128, _super);
        function $mol_code_demo_code_128() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_code_128.prototype.format = function () {
            return "CODE_128";
        };
        return $mol_code_demo_code_128;
    }($.$mol_code));
    $.$mol_code_demo_code_128 = $mol_code_demo_code_128;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_code_39 = (function (_super) {
        __extends($mol_code_demo_code_39, _super);
        function $mol_code_demo_code_39() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_code_39.prototype.format = function () {
            return "CODE_39";
        };
        return $mol_code_demo_code_39;
    }($.$mol_code));
    $.$mol_code_demo_code_39 = $mol_code_demo_code_39;
})($ || ($ = {}));
(function ($) {
    var $mol_code_demo_itf = (function (_super) {
        __extends($mol_code_demo_itf, _super);
        function $mol_code_demo_itf() {
            return _super.apply(this, arguments) || this;
        }
        $mol_code_demo_itf.prototype.format = function () {
            return "ITF";
        };
        return $mol_code_demo_itf;
    }($.$mol_code));
    $.$mol_code_demo_itf = $mol_code_demo_itf;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $;
(function ($) {
    function $mol_csv_parse(text, delimiter) {
        if (delimiter === void 0) { delimiter = ';'; }
        var lines = text.split(/\r?\n/g);
        var header = lines.shift().split(delimiter);
        var res = [];
        lines.forEach(function (line) {
            if (!line)
                return;
            var row = {};
            line.split(delimiter).forEach(function (val, index) {
                row[header[index]] = val;
            });
            res.push(row);
        });
        return res;
    }
    $.$mol_csv_parse = $mol_csv_parse;
})($ || ($ = {}));
//csv.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_deck_demo = (function (_super) {
        __extends($mol_deck_demo, _super);
        function $mol_deck_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_deck_demo.prototype.greeterLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "greeterLabel");
        };
        $mol_deck_demo.prototype.greeterMessage = function () {
            return $.$mol_locale.text(this.locale_contexts(), "greeterMessage");
        };
        $mol_deck_demo.prototype.greeterMessager = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.greeterMessage()); };
            });
        };
        $mol_deck_demo.prototype.greeterContent = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.greeterMessager()); };
            });
        };
        $mol_deck_demo.prototype.greeterItem = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.greeterLabel(); };
                obj.Content = function () { return _this.greeterContent(); };
            });
        };
        $mol_deck_demo.prototype.questerLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "questerLabel");
        };
        $mol_deck_demo.prototype.questerMessage = function () {
            return $.$mol_locale.text(this.locale_contexts(), "questerMessage");
        };
        $mol_deck_demo.prototype.questerMessager = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.questerMessage()); };
            });
        };
        $mol_deck_demo.prototype.questerContent = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.questerMessager()); };
            });
        };
        $mol_deck_demo.prototype.questerItem = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.questerLabel(); };
                obj.Content = function () { return _this.questerContent(); };
            });
        };
        $mol_deck_demo.prototype.commanderLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "commanderLabel");
        };
        $mol_deck_demo.prototype.commanderMessage = function () {
            return $.$mol_locale.text(this.locale_contexts(), "commanderMessage");
        };
        $mol_deck_demo.prototype.commanderMessager = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.commanderMessage()); };
            });
        };
        $mol_deck_demo.prototype.commanderContent = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.commanderMessager()); };
            });
        };
        $mol_deck_demo.prototype.commanderItem = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.commanderLabel(); };
                obj.Content = function () { return _this.commanderContent(); };
            });
        };
        $mol_deck_demo.prototype.items = function () {
            return [].concat(this.greeterItem(), this.questerItem(), this.commanderItem());
        };
        return $mol_deck_demo;
    }($.$mol_deck));
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "greeterMessager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "greeterContent", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "greeterItem", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "questerMessager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "questerContent", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "questerItem", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "commanderMessager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "commanderContent", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck_demo.prototype, "commanderItem", null);
    $.$mol_deck_demo = $mol_deck_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_demo_all = (function (_super) {
        __extends($mol_demo_all, _super);
        function $mol_demo_all() {
            return _super.apply(this, arguments) || this;
        }
        $mol_demo_all.prototype.name = function () {
            return "$mol_view";
        };
        $mol_demo_all.prototype.mediumLabel = function () {
            return "Fit to content";
        };
        $mol_demo_all.prototype.medium = function () {
            var _this = this;
            return new $.$mol_demo_medium().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.mediumLabel(); };
            });
        };
        $mol_demo_all.prototype.smallLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "smallLabel");
        };
        $mol_demo_all.prototype.small = function () {
            var _this = this;
            return new $.$mol_demo_small().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.smallLabel(); };
            });
        };
        $mol_demo_all.prototype.largeLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "largeLabel");
        };
        $mol_demo_all.prototype.large = function () {
            var _this = this;
            return new $.$mol_demo_large().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.largeLabel(); };
            });
        };
        $mol_demo_all.prototype.sub = function () {
            return [].concat(this.medium(), this.small(), this.large());
        };
        return $mol_demo_all;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_demo_all.prototype, "medium", null);
    __decorate([
        $.$mol_mem()
    ], $mol_demo_all.prototype, "small", null);
    __decorate([
        $.$mol_mem()
    ], $mol_demo_all.prototype, "large", null);
    $.$mol_demo_all = $mol_demo_all;
})($ || ($ = {}));
//all.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_dimmer_demo = (function (_super) {
        __extends($mol_dimmer_demo, _super);
        function $mol_dimmer_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_dimmer_demo.prototype.one = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Don't put all your eggs in one basket"; };
                obj.needle = function () { return "eggs"; };
            });
        };
        $mol_dimmer_demo.prototype.two = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Don't look a gift horse in the mouth."; };
                obj.needle = function () { return "oo"; };
            });
        };
        $mol_dimmer_demo.prototype.three = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "There is no word you are looking for"; };
                obj.needle = function () { return "luck"; };
            });
        };
        $mol_dimmer_demo.prototype.four = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "ooAAooAAoo"; };
                obj.needle = function () { return "oo"; };
            });
        };
        $mol_dimmer_demo.prototype.five = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Let's search this string"; };
                obj.needle = function () { return "Let's search this string"; };
            });
        };
        $mol_dimmer_demo.prototype.six = function () {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Let's search nothing"; };
                obj.needle = function () { return ""; };
            });
        };
        $mol_dimmer_demo.prototype.sub = function () {
            return [].concat(this.one(), this.two(), this.three(), this.four(), this.five(), this.six());
        };
        return $mol_dimmer_demo;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "one", null);
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "two", null);
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "three", null);
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "four", null);
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "five", null);
    __decorate([
        $.$mol_mem()
    ], $mol_dimmer_demo.prototype, "six", null);
    $.$mol_dimmer_demo = $mol_dimmer_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_expander = (function (_super) {
        __extends($mol_expander, _super);
        function $mol_expander() {
            return _super.apply(this, arguments) || this;
        }
        $mol_expander.prototype.expanded = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_expander.prototype.label = function () {
            return [];
        };
        $mol_expander.prototype.labeler = function () {
            var _this = this;
            return new $.$mol_check_expand().setup(function (obj) {
                obj.checked = function (val) { return _this.expanded(val); };
                obj.label = function () { return _this.label(); };
            });
        };
        $mol_expander.prototype.content = function () {
            return null;
        };
        $mol_expander.prototype.rows = function () {
            return [].concat(this.labeler(), this.content());
        };
        return $mol_expander;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_expander.prototype, "expanded", null);
    __decorate([
        $.$mol_mem()
    ], $mol_expander.prototype, "labeler", null);
    $.$mol_expander = $mol_expander;
})($ || ($ = {}));
//expander.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_expander = (function (_super) {
            __extends($mol_expander, _super);
            function $mol_expander() {
                return _super.apply(this, arguments) || this;
            }
            $mol_expander.prototype.rows = function () {
                return [
                    this.labeler(),
                    this.expanded() ? this.content() : null
                ];
            };
            return $mol_expander;
        }($.$mol_expander));
        $mol.$mol_expander = $mol_expander;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//expander.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_filler = (function (_super) {
        __extends($mol_filler, _super);
        function $mol_filler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_filler.prototype.sub = function () {
            return [].concat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.");
        };
        return $mol_filler;
    }($.$mol_view));
    $.$mol_filler = $mol_filler;
})($ || ($ = {}));
//filler.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_expander_demo = (function (_super) {
        __extends($mol_expander_demo, _super);
        function $mol_expander_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_expander_demo.prototype.expander = function () {
            return new $.$mol_expander().setup(function (obj) {
                obj.label = function () { return [].concat("Lorem Ipsum"); };
                obj.content = function () { return new $.$mol_filler(); };
            });
        };
        $mol_expander_demo.prototype.sub = function () {
            return [].concat(this.expander());
        };
        return $mol_expander_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_expander_demo.prototype, "expander", null);
    $.$mol_expander_demo = $mol_expander_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_float_demo = (function (_super) {
        __extends($mol_float_demo, _super);
        function $mol_float_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_float_demo.prototype.floaterContent = function () {
            return new $.$mol_card_demo_hello();
        };
        $mol_float_demo.prototype.floater = function () {
            var _this = this;
            return new $.$mol_float().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.floaterContent()); };
            });
        };
        $mol_float_demo.prototype.filler1 = function () {
            return new $.$mol_filler();
        };
        $mol_float_demo.prototype.filler2 = function () {
            return new $.$mol_filler();
        };
        $mol_float_demo.prototype.contenter = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.filler1(), _this.filler2()); };
            });
        };
        $mol_float_demo.prototype.content = function () {
            return [].concat(this.contenter());
        };
        $mol_float_demo.prototype.sub = function () {
            return [].concat(this.floater(), this.content());
        };
        return $mol_float_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_float_demo.prototype, "floaterContent", null);
    __decorate([
        $.$mol_mem()
    ], $mol_float_demo.prototype, "floater", null);
    __decorate([
        $.$mol_mem()
    ], $mol_float_demo.prototype, "filler1", null);
    __decorate([
        $.$mol_mem()
    ], $mol_float_demo.prototype, "filler2", null);
    __decorate([
        $.$mol_mem()
    ], $mol_float_demo.prototype, "contenter", null);
    $.$mol_float_demo = $mol_float_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_demo = (function (_super) {
        __extends($mol_form_demo, _super);
        function $mol_form_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_form_demo.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_form_demo.prototype.loginErrors = function () {
            return [];
        };
        $mol_form_demo.prototype.login = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_form_demo.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_form_demo.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_form_demo.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_form_demo.prototype.passwordErrors = function () {
            return [];
        };
        $mol_form_demo.prototype.password = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_form_demo.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_form_demo.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_form_demo.prototype.form_fields = function () {
            return [].concat(this.loginField(), this.passwordField());
        };
        $mol_form_demo.prototype.submit_text = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submit_text");
        };
        $mol_form_demo.prototype.event_submit = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_form_demo.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submit_text()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_form_demo.prototype.buttons = function () {
            return [].concat(this.submit());
        };
        return $mol_form_demo;
    }($.$mol_form));
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form_demo.prototype, "submit", null);
    $.$mol_form_demo = $mol_form_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $mol_global = this;
//global.js.map
;
var $;
(function ($) {
    var $mol_graph = (function () {
        function $mol_graph() {
            this.nodes = {};
            this.edgesOut = {};
            this.edgesIn = {};
        }
        $mol_graph.prototype.nodeEnsure = function (id) {
            if (this.nodes.hasOwnProperty(id))
                return;
            this.nodes[id] = null;
        };
        $mol_graph.prototype.linkOut = function (from, to, edge) {
            if (!this.edgesOut[from]) {
                this.edgesOut[from] = {};
                this.nodeEnsure(from);
            }
            this.edgesOut[from][to] = edge;
            this.nodeEnsure(to);
        };
        $mol_graph.prototype.linkIn = function (to, from, edge) {
            if (!this.edgesIn[to]) {
                this.edgesIn[to] = {};
                this.nodeEnsure(to);
            }
            this.edgesIn[to][from] = edge;
            this.nodeEnsure(from);
        };
        $mol_graph.prototype.edgeOut = function (from, to) {
            return this.edgesOut[from] && this.edgesOut[from][to];
        };
        $mol_graph.prototype.edgeIn = function (to, from) {
            return this.edgesIn[to] && this.edgesIn[to][from];
        };
        $mol_graph.prototype.link = function (one, two, edge) {
            this.linkOut(one, two, edge);
            this.linkIn(two, one, edge);
        };
        $mol_graph.prototype.sorted = function (getWeight) {
            var _this = this;
            var pending = Object.keys(this.nodes);
            var visited = [];
            var weights = [];
            var sorted = [];
            var visit = function (id, weight) {
                var index = visited.lastIndexOf(id);
                if (index >= 0) {
                    if (index === visited.length - 1)
                        return false;
                    if (weight <= weights[index + 1])
                        return false;
                }
                if (weight != null) {
                    visited.push(id);
                    weights.push(weight);
                }
                var deps = _this.edgesOut[id];
                for (var dep in deps) {
                    if (dep === id)
                        continue;
                    visit(dep, getWeight(deps[dep]));
                }
                if (sorted.indexOf(id) !== -1)
                    return false;
                sorted.push(id);
                return true;
            };
            pending.forEach(function (id) { return visit(id, null); });
            return sorted;
        };
        return $mol_graph;
    }());
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));
//graph.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_grid_demo = (function (_super) {
        __extends($mol_grid_demo, _super);
        function $mol_grid_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grid_demo.prototype.row_height = function () {
            return 37;
        };
        return $mol_grid_demo;
    }($.$mol_grid));
    $.$mol_grid_demo = $mol_grid_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_grid_demo = (function (_super) {
            __extends($mol_grid_demo, _super);
            function $mol_grid_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grid_demo.prototype.records = function () {
                return $.$mol_range_in({
                    length: 1000,
                    item: function (index) {
                        return $.$mol_range_in({
                            length: 15,
                            item: function (colId) { return colId === 0
                                ? "Row " + (index + 1)
                                : "Cell " + colId + "\u00D7" + (index + 1); }
                        }).valueOf();
                    }
                }).valueOf();
            };
            $mol_grid_demo.prototype.col_head_content = function (id) {
                if (id == '0')
                    return [];
                return ["Col " + id];
            };
            return $mol_grid_demo;
        }($.$mol_grid_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_grid_demo.prototype, "records", null);
        $mol.$mol_grid_demo = $mol_grid_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_html_head = (function (_super) {
        __extends($mol_html_head, _super);
        function $mol_html_head() {
            return _super.apply(this, arguments) || this;
        }
        $mol_html_head.prototype.dom_name = function () {
            return "head";
        };
        return $mol_html_head;
    }($.$mol_view));
    $.$mol_html_head = $mol_html_head;
})($ || ($ = {}));
(function ($) {
    var $mol_html_body = (function (_super) {
        __extends($mol_html_body, _super);
        function $mol_html_body() {
            return _super.apply(this, arguments) || this;
        }
        $mol_html_body.prototype.dom_name = function () {
            return "body";
        };
        return $mol_html_body;
    }($.$mol_view));
    $.$mol_html_body = $mol_html_body;
})($ || ($ = {}));
(function ($) {
    var $mol_html_title = (function (_super) {
        __extends($mol_html_title, _super);
        function $mol_html_title() {
            return _super.apply(this, arguments) || this;
        }
        $mol_html_title.prototype.dom_name = function () {
            return "title";
        };
        $mol_html_title.prototype.title = function () {
            return "";
        };
        $mol_html_title.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_html_title;
    }($.$mol_view));
    $.$mol_html_title = $mol_html_title;
})($ || ($ = {}));
(function ($) {
    var $mol_html_meta = (function (_super) {
        __extends($mol_html_meta, _super);
        function $mol_html_meta() {
            return _super.apply(this, arguments) || this;
        }
        $mol_html_meta.prototype.dom_name = function () {
            return "meta";
        };
        $mol_html_meta.prototype.name = function () {
            return "";
        };
        $mol_html_meta.prototype.content = function () {
            return "";
        };
        $mol_html_meta.prototype.charset = function () {
            return "utf-8";
        };
        $mol_html_meta.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "name": function () { return _this.name(); },
                "content": function () { return _this.content(); },
                "charset": function () { return _this.charset(); },
            });
        };
        return $mol_html_meta;
    }($.$mol_view));
    $.$mol_html_meta = $mol_html_meta;
})($ || ($ = {}));
(function ($) {
    var $mol_html_link = (function (_super) {
        __extends($mol_html_link, _super);
        function $mol_html_link() {
            return _super.apply(this, arguments) || this;
        }
        $mol_html_link.prototype.dom_name = function () {
            return "link";
        };
        $mol_html_link.prototype.rel = function () {
            return "";
        };
        $mol_html_link.prototype.href = function () {
            return "";
        };
        $mol_html_link.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "rel": function () { return _this.rel(); },
                "href": function () { return _this.href(); },
            });
        };
        return $mol_html_link;
    }($.$mol_view));
    $.$mol_html_link = $mol_html_link;
})($ || ($ = {}));
//html.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_icon_demo = (function (_super) {
        __extends($mol_icon_demo, _super);
        function $mol_icon_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_icon_demo.prototype.icons = function () {
            return [];
        };
        $mol_icon_demo.prototype.sub = function () {
            return this.icons();
        };
        return $mol_icon_demo;
    }($.$mol_row));
    $.$mol_icon_demo = $mol_icon_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_icon_demo = (function (_super) {
            __extends($mol_icon_demo, _super);
            function $mol_icon_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_icon_demo.prototype.names = function () {
                var next = [];
                for (var name in $) {
                    if (!/^\$mol_icon_/i.test(name))
                        continue;
                    if (/^\$mol_icon_demo/.test(name))
                        continue;
                    if (typeof $[name] !== 'function')
                        continue;
                    next.push(name.substring(1));
                }
                return next;
            };
            $mol_icon_demo.prototype.icons = function () {
                var _this = this;
                return this.names().map(function (name) { return _this.icon(name); });
            };
            $mol_icon_demo.prototype.icon = function (name) {
                var Class = $['$' + name];
                return new Class();
            };
            return $mol_icon_demo;
        }($.$mol_icon_demo));
        __decorate([
            $.$mol_mem()
        ], $mol_icon_demo.prototype, "names", null);
        __decorate([
            $.$mol_mem()
        ], $mol_icon_demo.prototype, "icons", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_icon_demo.prototype, "icon", null);
        $mol.$mol_icon_demo = $mol_icon_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler_demo_text = (function (_super) {
        __extends($mol_labeler_demo_text, _super);
        function $mol_labeler_demo_text() {
            return _super.apply(this, arguments) || this;
        }
        $mol_labeler_demo_text.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_labeler_demo_text.prototype.content = function () {
            return $.$mol_locale.text(this.locale_contexts(), "content");
        };
        return $mol_labeler_demo_text;
    }($.$mol_labeler));
    $.$mol_labeler_demo_text = $mol_labeler_demo_text;
})($ || ($ = {}));
(function ($) {
    var $mol_labeler_demo_stringer = (function (_super) {
        __extends($mol_labeler_demo_stringer, _super);
        function $mol_labeler_demo_stringer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_labeler_demo_stringer.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_labeler_demo_stringer.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_labeler_demo_stringer.prototype.user_name = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_labeler_demo_stringer.prototype.Content = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.hint = function () { return _this.hint(); };
                obj.value = function (val) { return _this.user_name(val); };
            });
        };
        return $mol_labeler_demo_stringer;
    }($.$mol_labeler));
    __decorate([
        $.$mol_mem()
    ], $mol_labeler_demo_stringer.prototype, "user_name", null);
    __decorate([
        $.$mol_mem()
    ], $mol_labeler_demo_stringer.prototype, "Content", null);
    $.$mol_labeler_demo_stringer = $mol_labeler_demo_stringer;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_link_demo = (function (_super) {
        __extends($mol_link_demo, _super);
        function $mol_link_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_link_demo.prototype.labelRed = function () {
            return $.$mol_locale.text(this.locale_contexts(), "labelRed");
        };
        $mol_link_demo.prototype.linkRed = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "red"; },
                }); };
                obj.sub = function () { return [].concat(_this.labelRed()); };
            });
        };
        $mol_link_demo.prototype.labelGreen = function () {
            return $.$mol_locale.text(this.locale_contexts(), "labelGreen");
        };
        $mol_link_demo.prototype.linkGreen = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "green"; },
                }); };
                obj.sub = function () { return [].concat(_this.labelGreen()); };
            });
        };
        $mol_link_demo.prototype.labelBlue = function () {
            return $.$mol_locale.text(this.locale_contexts(), "labelBlue");
        };
        $mol_link_demo.prototype.linkBlue = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "blue"; },
                }); };
                obj.sub = function () { return [].concat(_this.labelBlue()); };
            });
        };
        $mol_link_demo.prototype.linkExternal = function () {
            return new $.$mol_link().setup(function (obj) {
                obj.uri = function () { return "http://example.org"; };
                obj.sub = function () { return [].concat("example.org"); };
            });
        };
        $mol_link_demo.prototype.sub = function () {
            return [].concat(this.linkRed(), this.linkGreen(), this.linkBlue(), this.linkExternal());
        };
        return $mol_link_demo;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_link_demo.prototype, "linkRed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_link_demo.prototype, "linkGreen", null);
    __decorate([
        $.$mol_mem()
    ], $mol_link_demo.prototype, "linkBlue", null);
    __decorate([
        $.$mol_mem()
    ], $mol_link_demo.prototype, "linkExternal", null);
    $.$mol_link_demo = $mol_link_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next) {
            return next || [];
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = document.getElementById(diff[0].id);
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
                var sel = document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = document.getSelection();
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
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_view_selection.focused(parents);
        };
        $mol_view_selection.onBlur = function (event) {
            $mol_view_selection.focused([]);
        };
        return $mol_view_selection;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    document.addEventListener('selectionchange', function (event) {
        $.$mol_view_selection.position(void 0);
    });
    document.addEventListener('focusin', $.$mol_view_selection.onFocus);
    document.addEventListener('focus', $.$mol_view_selection.onFocus, true);
    document.addEventListener('focusout', $.$mol_view_selection.onBlur);
    document.addEventListener('blur', $.$mol_view_selection.onBlur, true);
})($ || ($ = {}));
//selection.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_suggest = (function (_super) {
        __extends($mol_suggest, _super);
        function $mol_suggest() {
            return _super.apply(this, arguments) || this;
        }
        $mol_suggest.prototype.suggests = function () {
            return [];
        };
        $mol_suggest.prototype.eventPress = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_suggest.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "keydown": function (val) { return _this.eventPress(val); },
            });
        };
        $mol_suggest.prototype.selectedRow = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_suggest.prototype.focused = function () {
            return false;
        };
        $mol_suggest.prototype.suggest = function (id) {
            return "";
        };
        $mol_suggest.prototype.eventRowerSelected = function (id, val) {
            return (val !== void 0) ? val : null;
        };
        $mol_suggest.prototype.selected = function (id) {
            return false;
        };
        $mol_suggest.prototype.rower = function (id) {
            var _this = this;
            return new $.$mol_suggest_rower().setup(function (obj) {
                obj.text = function () { return _this.suggest(id); };
                obj.prefix = function () { return _this.value(); };
                obj.eventSelected = function (val) { return _this.eventRowerSelected(id, val); };
                obj.selected = function () { return _this.selected(id); };
            });
        };
        $mol_suggest.prototype.value = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_suggest.prototype.hint = function () {
            return "";
        };
        $mol_suggest.prototype.stringer = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_suggest.prototype.suggestrows = function () {
            return [];
        };
        $mol_suggest.prototype.lister = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.minimal_height = function () { return 0; };
                obj.sub = function () { return _this.suggestrows(); };
            });
        };
        $mol_suggest.prototype.sub = function () {
            return [].concat(this.stringer(), this.lister());
        };
        return $mol_suggest;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_suggest.prototype, "eventPress", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest.prototype, "selectedRow", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_suggest.prototype, "eventRowerSelected", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_suggest.prototype, "rower", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest.prototype, "stringer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest.prototype, "lister", null);
    $.$mol_suggest = $mol_suggest;
})($ || ($ = {}));
(function ($) {
    var $mol_suggest_rower = (function (_super) {
        __extends($mol_suggest_rower, _super);
        function $mol_suggest_rower() {
            return _super.apply(this, arguments) || this;
        }
        $mol_suggest_rower.prototype.dom_name = function () {
            return "div";
        };
        $mol_suggest_rower.prototype.eventSelected = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_suggest_rower.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "mousedown": function (val) { return _this.eventSelected(val); },
            });
        };
        $mol_suggest_rower.prototype.selected = function () {
            return false;
        };
        $mol_suggest_rower.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_suggest_selected": function () { return _this.selected(); },
            });
        };
        $mol_suggest_rower.prototype.minimal_height = function () {
            return 36;
        };
        $mol_suggest_rower.prototype.text = function () {
            return "";
        };
        $mol_suggest_rower.prototype.prefix = function () {
            return "";
        };
        $mol_suggest_rower.prototype.dimmer = function () {
            var _this = this;
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return _this.text(); };
                obj.needle = function () { return _this.prefix(); };
            });
        };
        $mol_suggest_rower.prototype.sub = function () {
            return [].concat(this.dimmer());
        };
        return $mol_suggest_rower;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_suggest_rower.prototype, "eventSelected", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest_rower.prototype, "dimmer", null);
    $.$mol_suggest_rower = $mol_suggest_rower;
})($ || ($ = {}));
//suggester.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_suggest = (function (_super) {
            __extends($mol_suggest, _super);
            function $mol_suggest() {
                return _super.apply(this, arguments) || this;
            }
            $mol_suggest.prototype.context_sub = function () {
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () { return context.$mol_view_visible_height() / 3; };
                return subContext;
            };
            $mol_suggest.prototype.suggestrows = function () {
                var _this = this;
                return this.suggests().map(function (suggest, index) { return _this.rower(index); });
            };
            $mol_suggest.prototype.sub = function () {
                return [
                    this.stringer(),
                    (this.focused() && this.suggests().length)
                        ? this.lister()
                        : null
                ];
            };
            $mol_suggest.prototype.eventRowerSelected = function (index, next) {
                this.value(this.suggests()[index]);
            };
            $mol_suggest.prototype.selectedRow = function (next) {
                this.value();
                return (next !== void 0) ? next : 0;
            };
            $mol_suggest.prototype.eventPress = function (next) {
                var selectedRow = this.selectedRow();
                var suggestsLength = this.lister().sub_visible().length;
                switch (next.keyCode) {
                    case $.$mol_keyboard_code.down:
                        selectedRow = selectedRow === suggestsLength ? 0 : selectedRow + 1;
                        this.selectedRow(selectedRow);
                        break;
                    case $.$mol_keyboard_code.up:
                        selectedRow = selectedRow === 0 ? suggestsLength : selectedRow - 1;
                        this.selectedRow(selectedRow);
                        break;
                    case $.$mol_keyboard_code.enter:
                    case $.$mol_keyboard_code.right:
                        if (!selectedRow)
                            return;
                        this.value(this.suggests()[selectedRow - 1]);
                        break;
                    case $.$mol_keyboard_code.space:
                        if (!selectedRow)
                            return;
                        next.preventDefault();
                        this.value(this.suggests()[selectedRow - 1] + ' ');
                        break;
                }
            };
            $mol_suggest.prototype.focused = function () {
                return $.$mol_view_selection.focused().indexOf(this.dom_node()) !== -1;
            };
            $mol_suggest.prototype.selected = function (index) {
                return index === (this.selectedRow() - 1);
            };
            $mol_suggest.prototype.suggest = function (index) {
                return this.suggests()[index];
            };
            return $mol_suggest;
        }($.$mol_suggest));
        __decorate([
            $.$mol_mem()
        ], $mol_suggest.prototype, "context_sub", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggest.prototype, "selectedRow", null);
        $mol.$mol_suggest = $mol_suggest;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//suggester.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_row_demo = (function (_super) {
        __extends($mol_row_demo, _super);
        function $mol_row_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_row_demo.prototype.minimal_height = function () {
            return 68;
        };
        $mol_row_demo.prototype.helloHint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "helloHint");
        };
        $mol_row_demo.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_row_demo.prototype.suggest1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest1");
        };
        $mol_row_demo.prototype.suggest2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest2");
        };
        $mol_row_demo.prototype.titler = function () {
            var _this = this;
            return new $.$mol_suggest().setup(function (obj) {
                obj.hint = function () { return _this.helloHint(); };
                obj.value = function (val) { return _this.title(val); };
                obj.suggests = function () { return [].concat(_this.suggest1(), _this.suggest2()); };
            });
        };
        $mol_row_demo.prototype.countHint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "countHint");
        };
        $mol_row_demo.prototype.count = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_row_demo.prototype.counter = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.hint = function () { return _this.countHint(); };
                obj.value = function (val) { return _this.count(val); };
            });
        };
        $mol_row_demo.prototype.progress = function () {
            return 0.33;
        };
        $mol_row_demo.prototype.progresser = function () {
            var _this = this;
            return new $.$mol_portion().setup(function (obj) {
                obj.portion = function () { return _this.progress(); };
            });
        };
        $mol_row_demo.prototype.publishLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "publishLabel");
        };
        $mol_row_demo.prototype.publish = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_row_demo.prototype.publisher = function () {
            var _this = this;
            return new $.$mol_check_box().setup(function (obj) {
                obj.label = function () { return [].concat(_this.publishLabel()); };
                obj.checked = function (val) { return _this.publish(val); };
            });
        };
        $mol_row_demo.prototype.dropLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "dropLabel");
        };
        $mol_row_demo.prototype.buttonDrop = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.dropLabel()); };
            });
        };
        $mol_row_demo.prototype.sub = function () {
            return [].concat(this.titler(), this.counter(), this.progresser(), this.publisher(), this.buttonDrop());
        };
        return $mol_row_demo;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "titler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "count", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "counter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "progresser", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "publish", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "publisher", null);
    __decorate([
        $.$mol_mem()
    ], $mol_row_demo.prototype, "buttonDrop", null);
    $.$mol_row_demo = $mol_row_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_list_demo = (function (_super) {
        __extends($mol_list_demo, _super);
        function $mol_list_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_list_demo.prototype.rows = function () {
            return [];
        };
        $mol_list_demo.prototype.lister = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.rows(); };
            });
        };
        $mol_list_demo.prototype.sub = function () {
            return [].concat(this.lister());
        };
        return $mol_list_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_list_demo.prototype, "lister", null);
    $.$mol_list_demo = $mol_list_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_list_demo = (function (_super) {
            __extends($mol_list_demo, _super);
            function $mol_list_demo() {
                return _super.apply(this, arguments) || this;
            }
            $mol_list_demo.prototype.rows = function () {
                var next = [];
                for (var id = 0; id < 100; ++id) {
                    next.push(this.rower(id));
                }
                return next;
            };
            $mol_list_demo.prototype.rower = function (id) {
                return new $.$mol_row_demo().setup(function (obj) {
                    obj.title = function () { return "Title #" + id; };
                });
            };
            return $mol_list_demo;
        }($.$mol_list_demo));
        __decorate([
            $.$mol_mem_key()
        ], $mol_list_demo.prototype, "rower", null);
        $mol.$mol_list_demo = $mol_list_demo;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var $;
(function ($) {
    function $mol_maybe(value) {
        return (value == null) ? [] : [value];
    }
    $.$mol_maybe = $mol_maybe;
})($ || ($ = {}));
//maybe.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_number_demo = (function (_super) {
        __extends($mol_number_demo, _super);
        function $mol_number_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_number_demo.prototype.zero = function () {
            return new $.$mol_number();
        };
        $mol_number_demo.prototype.year = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_number_demo.prototype.one = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
            });
        };
        $mol_number_demo.prototype.two = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.hint = function () { return "2016"; };
            });
        };
        $mol_number_demo.prototype.age = function (val) {
            return (val !== void 0) ? val : 32;
        };
        $mol_number_demo.prototype.three = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.age(val); };
                obj.hint = function () { return "18-99"; };
                obj.enabled = function () { return false; };
            });
        };
        $mol_number_demo.prototype.four = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.string_enabled = function () { return false; };
            });
        };
        $mol_number_demo.prototype.five = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.age(val); };
                obj.dec_enabled = function () { return false; };
            });
        };
        $mol_number_demo.prototype.six = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.inc_enabled = function () { return false; };
            });
        };
        $mol_number_demo.prototype.seven = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.precision_change = function () { return 10; };
            });
        };
        $mol_number_demo.prototype.eight = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.precision_view = function () { return 0.01; };
            });
        };
        $mol_number_demo.prototype.nine = function () {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (val) { return _this.year(val); };
                obj.precision = function () { return 1000; };
            });
        };
        $mol_number_demo.prototype.sub = function () {
            return [].concat(this.zero(), this.one(), this.two(), this.three(), this.four(), this.five(), this.six(), this.seven(), this.eight(), this.nine());
        };
        return $mol_number_demo;
    }($.$mol_row));
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "zero", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "year", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "one", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "two", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "age", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "three", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "four", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "five", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "six", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "seven", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "eight", null);
    __decorate([
        $.$mol_mem()
    ], $mol_number_demo.prototype, "nine", null);
    $.$mol_number_demo = $mol_number_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page_demo = (function (_super) {
        __extends($mol_page_demo, _super);
        function $mol_page_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_page_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_page_demo.prototype.signup = function () {
            return new $.$mol_app_signup();
        };
        $mol_page_demo.prototype.body = function () {
            return [].concat(this.signup());
        };
        $mol_page_demo.prototype.rower = function () {
            return new $.$mol_row_demo();
        };
        $mol_page_demo.prototype.foot = function () {
            return [].concat(this.rower());
        };
        return $mol_page_demo;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_page_demo.prototype, "signup", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page_demo.prototype, "rower", null);
    $.$mol_page_demo = $mol_page_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_perf_render = (function (_super) {
        __extends($mol_perf_render, _super);
        function $mol_perf_render() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_render.prototype.title = function () {
            return "$mol";
        };
        $mol_perf_render.prototype.titler = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.dom_name = function () { return "h2"; };
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_perf_render.prototype.runnerLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "runnerLabel");
        };
        $mol_perf_render.prototype.eventRun = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_perf_render.prototype.runner = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.dom_name = function () { return "button"; };
                obj.sub = function () { return [].concat(_this.runnerLabel()); };
                obj.event_click = function (val) { return _this.eventRun(val); };
            });
        };
        $mol_perf_render.prototype.head = function () {
            return [].concat(this.titler(), this.runner());
        };
        $mol_perf_render.prototype.header = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.head()); };
            });
        };
        $mol_perf_render.prototype.rows = function () {
            return [];
        };
        $mol_perf_render.prototype.lister = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.rows(); };
            });
        };
        $mol_perf_render.prototype.contenter = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.lister()); };
            });
        };
        $mol_perf_render.prototype.sub = function () {
            return [].concat(this.header(), this.contenter());
        };
        return $mol_perf_render;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "titler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "eventRun", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "runner", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "header", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "lister", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render.prototype, "contenter", null);
    $.$mol_perf_render = $mol_perf_render;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_render_row = (function (_super) {
        __extends($mol_perf_render_row, _super);
        function $mol_perf_render_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_render_row.prototype.selected = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_perf_render_row.prototype.minimal_height = function () {
            return 24;
        };
        $mol_perf_render_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_perf_render_row_selected": function () { return _this.selected(); },
            });
        };
        $mol_perf_render_row.prototype.eventToggle = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_perf_render_row.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (val) { return _this.eventToggle(val); },
            });
        };
        $mol_perf_render_row.prototype.label = function () {
            return "";
        };
        $mol_perf_render_row.prototype.bar = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_perf_render_row.prototype.sub = function () {
            return [].concat(this.bar());
        };
        return $mol_perf_render_row;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render_row.prototype, "selected", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render_row.prototype, "eventToggle", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_render_row.prototype, "bar", null);
    $.$mol_perf_render_row = $mol_perf_render_row;
})($ || ($ = {}));
//render.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_perf_render = (function (_super) {
            __extends($mol_perf_render, _super);
            function $mol_perf_render() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_render.prototype.runnerLabel = function (next) { return next || 'Run'; };
            $mol_perf_render.prototype.eventRun = function (next) {
                var _this = this;
                requestAnimationFrame(function () {
                    var data = window['_buildData']();
                    var date = Date.now();
                    _this.data(data);
                    _this.selectedItem(null);
                    $.$mol_defer.run();
                    setTimeout(function () { return _this.runnerLabel((Date.now() - date) + " ms"); });
                });
            };
            $mol_perf_render.prototype.rows = function () {
                var _this = this;
                return this.data().map(function (_, id) { return _this.row(id); });
            };
            $mol_perf_render.prototype.row = function (id) {
                var _this = this;
                return new $mol_perf_render_row().setup(function (obj) {
                    obj.data = function () { return _this.data()[id]; };
                    obj.selected = function (next) {
                        if (next !== void 0)
                            _this.selectedItem(next ? id : null);
                        return _this.selectedItem() === id;
                    };
                });
            };
            $mol_perf_render.prototype.data = function (next) { return next || []; };
            $mol_perf_render.prototype.selectedItem = function (next) {
                if (next === void 0)
                    return null;
                return next;
            };
            return $mol_perf_render;
        }($.$mol_perf_render));
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render.prototype, "runnerLabel", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render.prototype, "rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_render.prototype, "row", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render.prototype, "data", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render.prototype, "selectedItem", null);
        $mol.$mol_perf_render = $mol_perf_render;
        var $mol_perf_render_row = (function (_super) {
            __extends($mol_perf_render_row, _super);
            function $mol_perf_render_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_render_row.prototype.data = function () { return { id: 0, label: '' }; };
            $mol_perf_render_row.prototype.label = function () { return this.data().label; };
            $mol_perf_render_row.prototype.eventToggle = function (next) {
                this.selected(!this.selected());
            };
            return $mol_perf_render_row;
        }($.$mol_perf_render_row));
        $mol.$mol_perf_render_row = $mol_perf_render_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//render.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_perf_uibench = (function (_super) {
        __extends($mol_perf_uibench, _super);
        function $mol_perf_uibench() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench.prototype.page = function () {
            return null;
        };
        $mol_perf_uibench.prototype.sub = function () {
            return [].concat(this.page());
        };
        $mol_perf_uibench.prototype.stateTable = function () {
            return null;
        };
        $mol_perf_uibench.prototype.table = function () {
            var _this = this;
            return new $.$mol_perf_uibench_table().setup(function (obj) {
                obj.state = function () { return _this.stateTable(); };
            });
        };
        $mol_perf_uibench.prototype.stateAnim = function () {
            return null;
        };
        $mol_perf_uibench.prototype.anim = function () {
            var _this = this;
            return new $.$mol_perf_uibench_anim().setup(function (obj) {
                obj.state = function () { return _this.stateAnim(); };
            });
        };
        $mol_perf_uibench.prototype.stateTree = function () {
            return null;
        };
        $mol_perf_uibench.prototype.tree = function () {
            var _this = this;
            return new $.$mol_perf_uibench_tree().setup(function (obj) {
                obj.state = function () { return _this.stateTree(); };
            });
        };
        return $mol_perf_uibench;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "table", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "anim", null);
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench.prototype, "tree", null);
    $.$mol_perf_uibench = $mol_perf_uibench;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table = (function (_super) {
        __extends($mol_perf_uibench_table, _super);
        function $mol_perf_uibench_table() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table.prototype.dom_name = function () {
            return "table";
        };
        $mol_perf_uibench_table.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Table"; },
            });
        };
        return $mol_perf_uibench_table;
    }($.$mol_list));
    $.$mol_perf_uibench_table = $mol_perf_uibench_table;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table_row = (function (_super) {
        __extends($mol_perf_uibench_table_row, _super);
        function $mol_perf_uibench_table_row() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table_row.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table_row.prototype.minimal_height = function () {
            return 20;
        };
        $mol_perf_uibench_table_row.prototype.dom_name = function () {
            return "tr";
        };
        $mol_perf_uibench_table_row.prototype.className = function () {
            return "TableRow";
        };
        $mol_perf_uibench_table_row.prototype.id = function () {
            return 0;
        };
        $mol_perf_uibench_table_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return _this.className(); },
                "data-id": function () { return _this.id(); },
            });
        };
        $mol_perf_uibench_table_row.prototype.headerText = function () {
            return "";
        };
        $mol_perf_uibench_table_row.prototype.header = function () {
            var _this = this;
            return new $.$mol_perf_uibench_table_cell().setup(function (obj) {
                obj.text = function () { return _this.headerText(); };
            });
        };
        $mol_perf_uibench_table_row.prototype.cells = function () {
            return [];
        };
        $mol_perf_uibench_table_row.prototype.sub = function () {
            return [].concat(this.header(), this.cells());
        };
        return $mol_perf_uibench_table_row;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_table_row.prototype, "header", null);
    $.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_table_cell = (function (_super) {
        __extends($mol_perf_uibench_table_cell, _super);
        function $mol_perf_uibench_table_cell() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_table_cell.prototype.dom_name = function () {
            return "td";
        };
        $mol_perf_uibench_table_cell.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_table_cell.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TableCell"; },
                "data-text": function () { return _this.text(); },
            });
        };
        $mol_perf_uibench_table_cell.prototype.event_click = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_perf_uibench_table_cell.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (val) { return _this.event_click(val); },
            });
        };
        $mol_perf_uibench_table_cell.prototype.sub = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_table_cell;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_table_cell.prototype, "event_click", null);
    $.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_anim = (function (_super) {
        __extends($mol_perf_uibench_anim, _super);
        function $mol_perf_uibench_anim() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_anim.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_anim.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Anim"; },
            });
        };
        $mol_perf_uibench_anim.prototype.items = function () {
            return [];
        };
        $mol_perf_uibench_anim.prototype.sub = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim;
    }($.$mol_view));
    $.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_anim_box = (function (_super) {
        __extends($mol_perf_uibench_anim_box, _super);
        function $mol_perf_uibench_anim_box() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_anim_box.prototype.id = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "AnimBox"; },
                "data-id": function () { return _this.id(); },
            });
        };
        $mol_perf_uibench_anim_box.prototype.styleRadius = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.styleColor = function () {
            return "";
        };
        $mol_perf_uibench_anim_box.prototype.style = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.style.call(this), {
                "borderRadius": function () { return _this.styleRadius(); },
                "background": function () { return _this.styleColor(); },
            });
        };
        $mol_perf_uibench_anim_box.prototype.items = function () {
            return [];
        };
        $mol_perf_uibench_anim_box.prototype.sub = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim_box;
    }($.$mol_view));
    $.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree = (function (_super) {
        __extends($mol_perf_uibench_tree, _super);
        function $mol_perf_uibench_tree() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Tree"; },
            });
        };
        $mol_perf_uibench_tree.prototype.stateRoot = function () {
            return null;
        };
        $mol_perf_uibench_tree.prototype.root = function () {
            var _this = this;
            return new $.$mol_perf_uibench_tree_branch().setup(function (obj) {
                obj.state = function () { return _this.stateRoot(); };
            });
        };
        $mol_perf_uibench_tree.prototype.sub = function () {
            return [].concat(this.root());
        };
        return $mol_perf_uibench_tree;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_perf_uibench_tree.prototype, "root", null);
    $.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree_branch = (function (_super) {
        __extends($mol_perf_uibench_tree_branch, _super);
        function $mol_perf_uibench_tree_branch() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree_branch.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree_branch.prototype.dom_name = function () {
            return "ul";
        };
        $mol_perf_uibench_tree_branch.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TreeNode"; },
            });
        };
        return $mol_perf_uibench_tree_branch;
    }($.$mol_list));
    $.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
})($ || ($ = {}));
(function ($) {
    var $mol_perf_uibench_tree_leaf = (function (_super) {
        __extends($mol_perf_uibench_tree_leaf, _super);
        function $mol_perf_uibench_tree_leaf() {
            return _super.apply(this, arguments) || this;
        }
        $mol_perf_uibench_tree_leaf.prototype.minimal_height = function () {
            return 25;
        };
        $mol_perf_uibench_tree_leaf.prototype.dom_name = function () {
            return "li";
        };
        $mol_perf_uibench_tree_leaf.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TreeLeaf"; },
            });
        };
        $mol_perf_uibench_tree_leaf.prototype.text = function () {
            return "";
        };
        $mol_perf_uibench_tree_leaf.prototype.sub = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_tree_leaf;
    }($.$mol_view));
    $.$mol_perf_uibench_tree_leaf = $mol_perf_uibench_tree_leaf;
})($ || ($ = {}));
//uibench.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_perf_uibench = (function (_super) {
            __extends($mol_perf_uibench, _super);
            function $mol_perf_uibench() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench.prototype.state = function (next) {
                return next || {};
            };
            $mol_perf_uibench.prototype.stateTable = function () {
                return this.state().table;
            };
            $mol_perf_uibench.prototype.stateAnim = function () {
                return this.state().anim;
            };
            $mol_perf_uibench.prototype.stateTree = function () {
                return this.state().tree;
            };
            $mol_perf_uibench.prototype.page = function () {
                switch (this.state().location) {
                    case 'table': return this.table();
                    case 'anim': return this.anim();
                    case 'tree': return this.tree();
                }
                return null;
            };
            return $mol_perf_uibench;
        }($.$mol_perf_uibench));
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "state", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateTable", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateAnim", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "stateTree", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "page", null);
        $mol.$mol_perf_uibench = $mol_perf_uibench;
        var $mol_perf_uibench_table = (function (_super) {
            __extends($mol_perf_uibench_table, _super);
            function $mol_perf_uibench_table() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table.prototype.state = function () {
                return { items: [] };
            };
            $mol_perf_uibench_table.prototype.rows = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.rower(i); });
            };
            $mol_perf_uibench_table.prototype.rower = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_row().setup(function (obj) {
                    obj.state = function () { return _this.state().items[id] || []; };
                });
            };
            return $mol_perf_uibench_table;
        }($.$mol_perf_uibench_table));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_table.prototype, "rower", null);
        $mol.$mol_perf_uibench_table = $mol_perf_uibench_table;
        var $mol_perf_uibench_table_row = (function (_super) {
            __extends($mol_perf_uibench_table_row, _super);
            function $mol_perf_uibench_table_row() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table_row.prototype.state = function () {
                return { props: [], active: false, id: 0 };
            };
            $mol_perf_uibench_table_row.prototype.headerText = function () {
                return '#' + this.id();
            };
            $mol_perf_uibench_table_row.prototype.id = function () {
                return this.state().id;
            };
            $mol_perf_uibench_table_row.prototype.className = function () {
                return _super.prototype.className.call(this) + (this.state().active ? ' active' : '');
            };
            $mol_perf_uibench_table_row.prototype.cells = function () {
                var _this = this;
                return (this.state().props || []).map(function (v, j) { return _this.cell(j); });
            };
            $mol_perf_uibench_table_row.prototype.cell = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_cell().setup(function (obj) {
                    obj.text = function () { return _this.state().props[id]; };
                });
            };
            return $mol_perf_uibench_table_row;
        }($.$mol_perf_uibench_table_row));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_table_row.prototype, "cell", null);
        $mol.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
        var $mol_perf_uibench_table_cell = (function (_super) {
            __extends($mol_perf_uibench_table_cell, _super);
            function $mol_perf_uibench_table_cell() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_table_cell.prototype.event_click = function (next) {
                console.log('Click', this.text());
                next.preventDefault();
                next.stopPropagation();
            };
            return $mol_perf_uibench_table_cell;
        }($.$mol_perf_uibench_table_cell));
        $mol.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
        var $mol_perf_uibench_anim = (function (_super) {
            __extends($mol_perf_uibench_anim, _super);
            function $mol_perf_uibench_anim() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_anim.prototype.state = function () {
                return { items: [] };
            };
            $mol_perf_uibench_anim.prototype.items = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.item(i); });
            };
            $mol_perf_uibench_anim.prototype.item = function (i) {
                var _this = this;
                return new $mol_perf_uibench_anim_box().setup(function (obj) {
                    obj.state = function () { return _this.state().items[i] || { id: '', time: 0 }; };
                });
            };
            return $mol_perf_uibench_anim;
        }($.$mol_perf_uibench_anim));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_anim.prototype, "item", null);
        $mol.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
        var $mol_perf_uibench_anim_box = (function (_super) {
            __extends($mol_perf_uibench_anim_box, _super);
            function $mol_perf_uibench_anim_box() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_anim_box.prototype.state = function () {
                return { id: '', time: 0 };
            };
            $mol_perf_uibench_anim_box.prototype.id = function () {
                return this.state().id;
            };
            $mol_perf_uibench_anim_box.prototype.time = function () {
                return this.state().time;
            };
            $mol_perf_uibench_anim_box.prototype.styleRadius = function () {
                return this.time() % 10 + "px";
            };
            $mol_perf_uibench_anim_box.prototype.styleColor = function () {
                return "rgba(0,0,0," + (0.5 + ((this.time() % 10) / 10)) + ")";
            };
            return $mol_perf_uibench_anim_box;
        }($.$mol_perf_uibench_anim_box));
        $mol.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
        var $mol_perf_uibench_tree = (function (_super) {
            __extends($mol_perf_uibench_tree, _super);
            function $mol_perf_uibench_tree() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_tree.prototype.state = function () {
                return { root: null };
            };
            $mol_perf_uibench_tree.prototype.stateRoot = function () {
                return this.state().root || { children: [] };
            };
            return $mol_perf_uibench_tree;
        }($.$mol_perf_uibench_tree));
        $mol.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
        var $mol_perf_uibench_tree_branch = (function (_super) {
            __extends($mol_perf_uibench_tree_branch, _super);
            function $mol_perf_uibench_tree_branch() {
                return _super.apply(this, arguments) || this;
            }
            $mol_perf_uibench_tree_branch.prototype.state = function () {
                return { children: [] };
            };
            $mol_perf_uibench_tree_branch.prototype.sub = function () {
                var _this = this;
                return (this.state().children || []).map(function (child, i) {
                    return child.container ? _this.branch(i) : _this.leaf(i);
                });
            };
            $mol_perf_uibench_tree_branch.prototype.branch = function (i) {
                var _this = this;
                return new $mol_perf_uibench_tree_branch().setup(function (obj) {
                    obj.state = function () { return _this.state().children[i] || { children: [] }; };
                });
            };
            $mol_perf_uibench_tree_branch.prototype.leaf = function (i) {
                var _this = this;
                return new $.$mol_perf_uibench_tree_leaf().setup(function (obj) {
                    obj.text = function () { return ((_this.state().children || [])[i] || {}).id; };
                });
            };
            return $mol_perf_uibench_tree_branch;
        }($.$mol_perf_uibench_tree_branch));
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_tree_branch.prototype, "branch", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_perf_uibench_tree_branch.prototype, "leaf", null);
        $mol.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//uibench.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_portion_demo_empty = (function (_super) {
        __extends($mol_portion_demo_empty, _super);
        function $mol_portion_demo_empty() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portion_demo_empty.prototype.portion = function () {
            return 0;
        };
        return $mol_portion_demo_empty;
    }($.$mol_portion));
    $.$mol_portion_demo_empty = $mol_portion_demo_empty;
})($ || ($ = {}));
(function ($) {
    var $mol_portion_demo_partial = (function (_super) {
        __extends($mol_portion_demo_partial, _super);
        function $mol_portion_demo_partial() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portion_demo_partial.prototype.portion = function () {
            return 0.5;
        };
        return $mol_portion_demo_partial;
    }($.$mol_portion));
    $.$mol_portion_demo_partial = $mol_portion_demo_partial;
})($ || ($ = {}));
(function ($) {
    var $mol_portion_demo_full = (function (_super) {
        __extends($mol_portion_demo_full, _super);
        function $mol_portion_demo_full() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portion_demo_full.prototype.portion = function () {
            return 1;
        };
        return $mol_portion_demo_full;
    }($.$mol_portion));
    $.$mol_portion_demo_full = $mol_portion_demo_full;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll_demo = (function (_super) {
        __extends($mol_scroll_demo, _super);
        function $mol_scroll_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroll_demo.prototype.One = function () {
            return new $.$mol_filler();
        };
        $mol_scroll_demo.prototype.Two = function () {
            return new $.$mol_filler();
        };
        $mol_scroll_demo.prototype.Tree = function () {
            return new $.$mol_filler();
        };
        $mol_scroll_demo.prototype.Row = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.One(), _this.Two(), _this.Tree()); };
            });
        };
        $mol_scroll_demo.prototype.sub = function () {
            return [].concat(this.Row());
        };
        return $mol_scroll_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll_demo.prototype, "One", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll_demo.prototype, "Two", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll_demo.prototype, "Tree", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll_demo.prototype, "Row", null);
    $.$mol_scroll_demo = $mol_scroll_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_section_demo = (function (_super) {
        __extends($mol_section_demo, _super);
        function $mol_section_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_section_demo.prototype.Section = function () {
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return "Section header"; };
                obj.Content = function () { return new $.$mol_filler(); };
            });
        };
        $mol_section_demo.prototype.sub = function () {
            return [].concat(this.Section());
        };
        return $mol_section_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_section_demo.prototype, "Section", null);
    $.$mol_section_demo = $mol_section_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_stack_demo = (function (_super) {
        __extends($mol_stack_demo, _super);
        function $mol_stack_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_stack_demo.prototype.Hello = function () {
            return new $.$mol_card_demo_hello();
        };
        $mol_stack_demo.prototype.Main_page = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Hello()); };
            });
        };
        $mol_stack_demo.prototype.main = function () {
            return [].concat(this.Main_page());
        };
        $mol_stack_demo.prototype.Enter = function () {
            return new $.$mol_form_demo();
        };
        $mol_stack_demo.prototype.Addon_page = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Enter()); };
            });
        };
        $mol_stack_demo.prototype.addon = function () {
            return [].concat(this.Addon_page());
        };
        return $mol_stack_demo;
    }($.$mol_stack));
    __decorate([
        $.$mol_mem()
    ], $mol_stack_demo.prototype, "Hello", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stack_demo.prototype, "Main_page", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stack_demo.prototype, "Enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stack_demo.prototype, "Addon_page", null);
    $.$mol_stack_demo = $mol_stack_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_history = (function (_super) {
        __extends($mol_state_history, _super);
        function $mol_state_history() {
            return _super.apply(this, arguments) || this;
        }
        $mol_state_history.value = function (key, next) {
            return $.$mol_state_session.value("$mol_state_history.id(" + this.id() + ")." + key, next);
        };
        $mol_state_history.prototype.prefix = function () { return ''; };
        $mol_state_history.prototype.value = function (key, next) {
            return $.$mol_state_local.value(this.prefix() + '.' + key, next);
        };
        $mol_state_history.id = function (next) {
            if (history.state)
                return history.state;
            var id = Date.now().toString(16);
            history.replaceState(id, document.title, document.location.href);
            return id;
        };
        return $mol_state_history;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_history, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_history, "id", null);
    $.$mol_state_history = $mol_state_history;
})($ || ($ = {}));
//history.js.map
;
window.addEventListener('hashchange', function (event) { return $.$mol_state_history.id(null); });
//history.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_string_demo_simple = (function (_super) {
        __extends($mol_string_demo_simple, _super);
        function $mol_string_demo_simple() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_string_demo_simple;
    }($.$mol_string));
    $.$mol_string_demo_simple = $mol_string_demo_simple;
})($ || ($ = {}));
(function ($) {
    var $mol_string_demo_hint = (function (_super) {
        __extends($mol_string_demo_hint, _super);
        function $mol_string_demo_hint() {
            return _super.apply(this, arguments) || this;
        }
        $mol_string_demo_hint.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        return $mol_string_demo_hint;
    }($.$mol_string));
    $.$mol_string_demo_hint = $mol_string_demo_hint;
})($ || ($ = {}));
(function ($) {
    var $mol_string_demo_disabled = (function (_super) {
        __extends($mol_string_demo_disabled, _super);
        function $mol_string_demo_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_string_demo_disabled.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_string_demo_disabled.prototype.disabled = function () {
            return true;
        };
        return $mol_string_demo_disabled;
    }($.$mol_string));
    $.$mol_string_demo_disabled = $mol_string_demo_disabled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_suggest_demo_base = (function (_super) {
        __extends($mol_suggest_demo_base, _super);
        function $mol_suggest_demo_base() {
            return _super.apply(this, arguments) || this;
        }
        $mol_suggest_demo_base.prototype.query_suggests = function () {
            return [];
        };
        $mol_suggest_demo_base.prototype.suggests = function () {
            return this.query_suggests();
        };
        $mol_suggest_demo_base.prototype.query = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_suggest_demo_base.prototype.value = function (val) {
            return this.query(val);
        };
        return $mol_suggest_demo_base;
    }($.$mol_suggest));
    __decorate([
        $.$mol_mem()
    ], $mol_suggest_demo_base.prototype, "query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_suggest_demo_base.prototype, "value", null);
    $.$mol_suggest_demo_base = $mol_suggest_demo_base;
})($ || ($ = {}));
(function ($) {
    var $mol_suggest_demo_empty = (function (_super) {
        __extends($mol_suggest_demo_empty, _super);
        function $mol_suggest_demo_empty() {
            return _super.apply(this, arguments) || this;
        }
        $mol_suggest_demo_empty.prototype.focused = function () {
            return false;
        };
        $mol_suggest_demo_empty.prototype.value = function () {
            return "";
        };
        $mol_suggest_demo_empty.prototype.suggests = function () {
            return [];
        };
        return $mol_suggest_demo_empty;
    }($.$mol_suggest));
    $.$mol_suggest_demo_empty = $mol_suggest_demo_empty;
})($ || ($ = {}));
(function ($) {
    var $mol_suggest_demo_opened = (function (_super) {
        __extends($mol_suggest_demo_opened, _super);
        function $mol_suggest_demo_opened() {
            return _super.apply(this, arguments) || this;
        }
        $mol_suggest_demo_opened.prototype.hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "hint");
        };
        $mol_suggest_demo_opened.prototype.value = function () {
            return "Ivan";
        };
        $mol_suggest_demo_opened.prototype.focused = function () {
            return true;
        };
        $mol_suggest_demo_opened.prototype.selected_row = function () {
            return 2;
        };
        $mol_suggest_demo_opened.prototype.suggest1 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest1");
        };
        $mol_suggest_demo_opened.prototype.suggest2 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest2");
        };
        $mol_suggest_demo_opened.prototype.suggest3 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest3");
        };
        $mol_suggest_demo_opened.prototype.suggest4 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest4");
        };
        $mol_suggest_demo_opened.prototype.suggest5 = function () {
            return $.$mol_locale.text(this.locale_contexts(), "suggest5");
        };
        $mol_suggest_demo_opened.prototype.suggests = function () {
            return [].concat(this.suggest1(), this.suggest2(), this.suggest3(), this.suggest4(), this.suggest5());
        };
        return $mol_suggest_demo_opened;
    }($.$mol_suggest));
    $.$mol_suggest_demo_opened = $mol_suggest_demo_opened;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_suggest_demo_base = (function (_super) {
            __extends($mol_suggest_demo_base, _super);
            function $mol_suggest_demo_base() {
                return _super.apply(this, arguments) || this;
            }
            $mol_suggest_demo_base.prototype.query_suggests = function () {
                return $.$mol_stub_strings(this.query(), 30);
            };
            return $mol_suggest_demo_base;
        }($.$mol_suggest_demo_base));
        __decorate([
            $.$mol_mem()
        ], $mol_suggest_demo_base.prototype, "query_suggests", null);
        $mol.$mol_suggest_demo_base = $mol_suggest_demo_base;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//demo.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch_demo_enabled = (function (_super) {
        __extends($mol_switch_demo_enabled, _super);
        function $mol_switch_demo_enabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_switch_demo_enabled.prototype.color = function (val) {
            return (val !== void 0) ? val : "red";
        };
        $mol_switch_demo_enabled.prototype.value = function (val) {
            return this.color(val);
        };
        $mol_switch_demo_enabled.prototype.option_red = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_red");
        };
        $mol_switch_demo_enabled.prototype.option_green = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_green");
        };
        $mol_switch_demo_enabled.prototype.option_blue = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_blue");
        };
        $mol_switch_demo_enabled.prototype.options = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.options.call(this), {
                "red": function () { return _this.option_red(); },
                "green": function () { return _this.option_green(); },
                "blue": function () { return _this.option_blue(); },
            });
        };
        return $mol_switch_demo_enabled;
    }($.$mol_switch));
    __decorate([
        $.$mol_mem()
    ], $mol_switch_demo_enabled.prototype, "color", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch_demo_enabled.prototype, "value", null);
    $.$mol_switch_demo_enabled = $mol_switch_demo_enabled;
})($ || ($ = {}));
(function ($) {
    var $mol_switch_demo_disabled = (function (_super) {
        __extends($mol_switch_demo_disabled, _super);
        function $mol_switch_demo_disabled() {
            return _super.apply(this, arguments) || this;
        }
        $mol_switch_demo_disabled.prototype.color = function (val) {
            return (val !== void 0) ? val : "red";
        };
        $mol_switch_demo_disabled.prototype.value = function (val) {
            return this.color(val);
        };
        $mol_switch_demo_disabled.prototype.enabled = function () {
            return false;
        };
        $mol_switch_demo_disabled.prototype.option_red = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_red");
        };
        $mol_switch_demo_disabled.prototype.option_green = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_green");
        };
        $mol_switch_demo_disabled.prototype.option_blue = function () {
            return $.$mol_locale.text(this.locale_contexts(), "option_blue");
        };
        $mol_switch_demo_disabled.prototype.options = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.options.call(this), {
                "red": function () { return _this.option_red(); },
                "green": function () { return _this.option_green(); },
                "blue": function () { return _this.option_blue(); },
            });
        };
        return $mol_switch_demo_disabled;
    }($.$mol_switch));
    __decorate([
        $.$mol_mem()
    ], $mol_switch_demo_disabled.prototype, "color", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch_demo_disabled.prototype, "value", null);
    $.$mol_switch_demo_disabled = $mol_switch_demo_disabled;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $;
(function ($) {
    function $mol_test(set) {
        for (var name_1 in set)
            $.$mol_test_all.push(new $mol_test_case(set[name_1]));
    }
    $.$mol_test = $mol_test;
    $.$mol_test_all = [];
    $.$mol_test_run = function () {
        for (var _i = 0, $mol_test_all_1 = $.$mol_test_all; _i < $mol_test_all_1.length; _i++) {
            var test = $mol_test_all_1[_i];
            test.run();
        }
    };
    var $mol_test_case = (function () {
        function $mol_test_case(code) {
            if (typeof code === 'string') {
                this.code = new Function(code);
            }
            else {
                this.code = code;
            }
        }
        $mol_test_case.prototype.run = function () {
            this.code();
        };
        return $mol_test_case;
    }());
    $.$mol_test_case = $mol_test_case;
})($ || ($ = {}));
//test.js.map
;
window.addEventListener('load', function (event) {
    $.$mol_test_run();
});
//test.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_text_demo = (function (_super) {
        __extends($mol_text_demo, _super);
        function $mol_text_demo() {
            return _super.apply(this, arguments) || this;
        }
        $mol_text_demo.prototype.texter = function () {
            return new $.$mol_text().setup(function (obj) {
                obj.text = function () { return "# [Benchmarks](perf)\n## Benchmark 1\n### Benchmark 1.1\n#### Benchmark 1.1.1\n##### Benchmark 1.1.1.1\n\n* $mol_perf_render - simple benchmark of rendering ([online](http://eigenmethod.github.io/mol/perf/render/))\n* [ToDoMVC benchmark](https://github.com/nin-jin/todomvc/tree/master/benchmark)\n\n# Quick start\n\n**Create MAM project**\n\nEasy way is checkout [this preconfigured ~~PMS~~MAM repository](http://github.com/eigenmethod/mam/) and start dev server:\n\n```sh\ngit clone https://github.com/eigenmethod/mam.git ./mam && cd mam\nnpm start\n```\n\n|           | Column 1 | Column 2 | Column 3\n|-----------|----------|----------|---------\n| **Row 1** | Cell 1x1 | Cell 2x1 | Cell 3x1\n| **Row 2** | Cell 1x2 | Cell 2x2 | Cell 3x2\n| **Row 3** | Cell 1x3 | Cell 2x3 | Cell 3x3\n| **Row 4** | Cell 1x4 | Cell 2x4 | Cell 3x4\n| **Row 5** | Cell 1x5 | Cell 2x5 | Cell 3x5\n| **Row 6** | Cell 1x6 | Cell 2x6 | Cell 3x6\n| **Row 7** | Cell 1x7 | Cell 2x7 | Cell 3x7\n| **Row 8** | Cell 1x8 | Cell 2x8 | Cell 3x8\n| **Row 9** | Cell 1x9 | Cell 2x9 | Cell 3x9\n\nBuild status: [![Build Status](https://travis-ci.org/eigenmethod/mol.svg?branch=master)](https://travis-ci.org/eigenmethod/mol)\n"; };
            });
        };
        $mol_text_demo.prototype.sub = function () {
            return [].concat(this.texter());
        };
        return $mol_text_demo;
    }($.$mol_scroll));
    __decorate([
        $.$mol_mem()
    ], $mol_text_demo.prototype, "texter", null);
    $.$mol_text_demo = $mol_text_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $;
(function ($) {
    var $mol_tree = (function () {
        function $mol_tree(config) {
            this.type = config.type || '';
            if (config.value) {
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
        $mol_tree.values = function (str, baseUri) {
            return str.split('\n').map(function (data, index) { return new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1
            }); });
        };
        $mol_tree.prototype.clone = function (config) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                value: config.value
            });
        };
        $mol_tree.fromString = function (str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var lines = String(str).split(/\n/);
            lines.forEach(function (line) {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?/.exec(line);
                if (!chunks)
                    new Error("Syntax error at " + baseUri + "#" + row + "\n" + line);
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.split(/ +/) : [];
                if (stack.length < deep)
                    throw new Error("Too many tabs at " + baseUri + "#" + row + "\n" + line);
                stack.length = deep + 1;
                var parent = stack[deep];
                types.forEach(function (type) {
                    if (!type)
                        return;
                    var next = new $mol_tree({
                        type: type,
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                });
                if (data) {
                    var next = new $mol_tree({
                        data: data.substring(1),
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        };
        $mol_tree.fromJSON = function (json, baseUri) {
            if (baseUri === void 0) { baseUri = ''; }
            var type = $jin_type(json);
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
                        type: "list",
                        sub: json.map(function (json) { return $mol_tree.fromJSON(json, baseUri); })
                    });
                case 'Date':
                    return new $mol_tree({
                        type: "time",
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
                        child.sub.push(new $mol_tree({
                            type: ":",
                            sub: [$mol_tree.fromJSON(json[key], baseUri)],
                            baseUri: baseUri
                        }));
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "dict",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
            throw new Error("Unsupported type (" + type + ") at " + baseUri);
        };
        Object.defineProperty($mol_tree.prototype, "uri", {
            get: function () {
                return this.baseUri + '#' + this.row + ':' + this.col;
            },
            enumerable: true,
            configurable: true
        });
        $mol_tree.prototype.toString = function (prefix) {
            if (prefix === void 0) { prefix = ''; }
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type + " ";
                if (this.sub.length == 1) {
                    return output + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                var child = _a[_i];
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        };
        $mol_tree.prototype.toJSON = function () {
            if (!this.type)
                return this.value;
            if (this.type === '//')
                return undefined;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === 'dict') {
                var obj = {};
                for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var key = child.type || child.value;
                    if (key === '//')
                        continue;
                    var colon = child.select(':').sub[0];
                    if (!colon)
                        throw new Error("Required colon after key at " + child.uri);
                    var val = colon.sub[0].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === 'list') {
                var res = [];
                this.sub.forEach(function (child) {
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
            throw new Error("Unknown type (" + this.type + ") at " + this.uri);
        };
        Object.defineProperty($mol_tree.prototype, "value", {
            get: function () {
                var values = [];
                for (var _i = 0, _a = this.sub; _i < _a.length; _i++) {
                    var child = _a[_i];
                    if (child.type)
                        continue;
                    values.push(child.value);
                }
                return this.data + values.join("\n");
            },
            enumerable: true,
            configurable: true
        });
        $mol_tree.prototype.select = function () {
            var path = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                path[_i] = arguments[_i];
            }
            if (typeof path === 'string')
                path = path.split(/ +/);
            var next = [this];
            for (var _a = 0, path_1 = path; _a < path_1.length; _a++) {
                var type = path_1[_a];
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var _b = 0, prev_1 = prev; _b < prev_1.length; _b++) {
                    var item = prev_1[_b];
                    for (var _c = 0, _d = item.sub; _c < _d.length; _c++) {
                        var child = _d[_c];
                        if (child.type == type) {
                            next.push(child);
                        }
                    }
                }
            }
            return new $mol_tree({ sub: next });
        };
        $mol_tree.prototype.filter = function (path, value) {
            if (typeof path === 'string')
                path = path.split(/ +/);
            var sub = this.sub.filter(function (item) {
                var found = item.select.apply(item, path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(function (child) { return child.value == value; });
                }
            });
            return new $mol_tree({ sub: sub });
        };
        return $mol_tree;
    }());
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
var $;
(function ($) {
    var error;
    var result;
    var handler;
    function $mol_try(handler2) {
        handler = handler2;
        error = void 0;
        result = void 0;
        window.dispatchEvent(new Event('$mol_try'));
        var error2 = error;
        var result2 = result;
        error = void 0;
        result = void 0;
        return error2 || result2;
    }
    $.$mol_try = $mol_try;
    window.addEventListener('$mol_try', function (event) {
        result = handler();
    }, true);
    window.addEventListener('error', function (event) {
        error = event.error;
    }, true);
})($ || ($ = {}));
//try.web.js.map
;
var $;
(function ($) {
    function $mol_view_tree2ts(tree) {
        var content = '';
        var locales = {};
        function error(message, tree) {
            return new Error(message + ":\n" + source(tree) + " " + tree.baseUri + ":" + tree.row + ":" + tree.col);
        }
        function source(root) {
            if (['<=>', '<='].indexOf(root.type) !== -1) {
                return root.clone({
                    sub: root.sub.map(function (name) { return name.clone({
                        sub: []
                    }); })
                });
            }
            return root.clone({ sub: root.sub.map(source) });
        }
        tree.sub.forEach(function (def) {
            if (!def.type || /^-$/.test(def.type))
                return;
            if (!/^\$\w+$/.test(def.type))
                throw error('Wrong component name', def);
            var parent = def.sub[0];
            var members = {};
            parent.sub.forEach(function (param) { return addProp(param); });
            function addProp(param) {
                try {
                    var needSet = false;
                    var needReturn = true;
                    var needCache = false;
                    var isOverride = true;
                    var keys = [];
                    if (param.type === '<=>') {
                        isOverride = false;
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        isOverride = false;
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    if (!param.type || param.type === '-')
                        return;
                    function getValue(value) {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return JSON.stringify(value.value);
                                case (value.type === '@'):
                                    locales[def.type + "_" + param.type] = value.value;
                                    return "$mol_locale.text( this.locale_contexts() , " + JSON.stringify(param.type) + " )";
                                case (value.type === '-'):
                                    return null;
                                case (value.type === '/'):
                                    var items = [];
                                    value.sub.forEach(function (item) {
                                        if (item.type === '-')
                                            return;
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val);
                                    });
                                    return '[]' + (items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]');
                                case (value.type[0] === '$'):
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(function (over) {
                                        if (/^-?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        var v = getValue(over.sub[0]);
                                        var args = [];
                                        if (overName[2])
                                            args.push(" " + overName[2] + " : any ");
                                        if (overName[3])
                                            args.push(" " + overName[3] + " : any ");
                                        overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                        needSet = ns;
                                    });
                                    return 'new ' + value.type + '()' + (overs.length ? '.setup( obj => { \n' + overs.join('') + '\t\t} )' : '');
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(function (opt) {
                                        if (/^-?$/.test(opt.type))
                                            return '';
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        keys.push(key[1]);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? " " + key[2] + "? : any " : '';
                                        opts.push('\t\t\t"' + key[1] + '" : (' + arg + ')=> <any> ' + v + ' ,\n');
                                        needSet = ns;
                                    });
                                    if (!isOverride)
                                        return '({\n' + opts.join('') + '\t\t})';
                                    else
                                        return "$" + ("mol_merge_dict( super." + param.type + "() , {\n" + opts.join('') + "\t\t} )");
                                case (value.type === '>'):
                                    throw new Error('Deprecated syntax. Use <=> instead.');
                                case (value.type === '<=>'):
                                    needSet = true;
                                    if (value.sub.length === 1) {
                                        addProp(value);
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )';
                                    }
                                    break;
                                case (value.type === '<'):
                                    throw new Error('Deprecated syntax. Use <= instead.');
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        addProp(value);
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
                                    return '<any> null';
                            }
                            if (Number(value.type).toString() == value.type)
                                return value.type;
                            throw error('Wrong value', value);
                        }
                        catch (err) {
                            err.message += "\n" + value.baseUri + ":" + value.row + ":" + value.col + "\n" + source(value);
                            throw err;
                        }
                    }
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    param.sub.forEach(function (child) {
                        var val = getValue(child);
                        var args = [];
                        if (propName[2])
                            args.push(" " + propName[2] + " : any ");
                        if (propName[3])
                            args.push(" " + propName[3] + "? : any ");
                        if (needSet && param.sub[0].type !== '<=>')
                            val = (needReturn ? "( " + propName[3] + " !== void 0 ) ? " + propName[3] + " : " : "if( " + propName[3] + " !== void 0 ) return " + propName[3] + "\n\t\t") + val;
                        if (needReturn)
                            val = 'return ' + val;
                        var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                        if (needCache) {
                            if (propName[2])
                                decl = '\t@ $' + 'mol_mem_key()\n' + decl;
                            else
                                decl = '\t@ $' + 'mol_mem()\n' + decl;
                        }
                        decl = source(param).toString().trim().replace(/^/gm, '\t/// ') + '\n' + decl;
                        members[propName[1]] = decl;
                    });
                    return needSet;
                }
                catch (err) {
                    err.message += "\n" + param.baseUri + ":" + param.row + ":" + param.col + "\n" + source(param);
                    throw err;
                }
            }
            var body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return <any>null }\n\t}\n';
            }).join('');
            var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        });
        return { script: content, locales: locales };
    }
    $.$mol_view_tree2ts = $mol_view_tree2ts;
})($ || ($ = {}));
//tree2ts.js.map
//# sourceMappingURL=web.js.map