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
        $mol_object.prototype.objectClassNames = function () {
            if (this.hasOwnProperty('objectClassNames()'))
                return this['objectClassNames()'];
            var names = [];
            var current = this;
            while (current) {
                var name = current.constructor.toString();
                if (!name)
                    continue;
                names.push(name);
                current = Object.getPrototypeOf(current);
            }
            return this['objectClassNames()'] = names;
        };
        $mol_object.prototype.objectOwner = function (next) {
            if (this['objectOwner()'])
                return this['objectOwner()'];
            return this['objectOwner()'] = next;
        };
        $mol_object.prototype.objectField = function (next) {
            if (this['objectField()'])
                return this['objectField()'] || '';
            return this['objectField()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.objectOwner();
            if (owner)
                path = owner.toString();
            var field = this.objectField();
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
                    if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
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
            this.disobeyAll();
            this.checkSlaves();
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
                    next['objectField'](this.field);
                    next['objectOwner'](host);
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
                this.obsoleteSlaves();
            }
            this.status = $mol_atom_status.actual;
            this._next = void null;
            return next;
        };
        $mol_atom.prototype.obsoleteSlaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.checkSlaves = function () {
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
                this.checkSlaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.checkSlaves();
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
        $mol_atom.prototype.disobeyAll = function () {
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
    $.$mol_viewer_context = {};
    $.$mol_viewer_context.$mol_viewer_visibleWidth = function () { return $.$mol_window.size().width; };
    $.$mol_viewer_context.$mol_viewer_visibleHeight = function () { return $.$mol_window.size().height; };
    var $mol_viewer = (function (_super) {
        __extends($mol_viewer, _super);
        function $mol_viewer() {
            return _super.apply(this, arguments) || this;
        }
        $mol_viewer.root = function (id) {
            return new this;
        };
        $mol_viewer.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_viewer.statePrefix = function () {
            return '';
        };
        $mol_viewer.prototype.statePrefix = function () {
            var owner = this.objectOwner();
            return owner ? owner.statePrefix() : '';
        };
        $mol_viewer.prototype.stateKey = function (postfix) {
            return this.statePrefix() + postfix;
        };
        $mol_viewer.prototype.context = function (next) {
            return next || $.$mol_viewer_context;
        };
        $mol_viewer.prototype.contextSub = function () {
            return this.context();
        };
        $mol_viewer.prototype.tagName = function () { return 'div'; };
        $mol_viewer.prototype.nameSpace = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_viewer.prototype.childs = function () {
            return null;
        };
        $mol_viewer.prototype.childsVisible = function () {
            var childs = this.childs();
            if (!childs)
                return childs;
            var context = this.contextSub();
            childs.forEach(function (child) {
                if (child instanceof $mol_viewer) {
                    child.context(context);
                }
            });
            return childs;
        };
        $mol_viewer.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_viewer.prototype.widthMinimal = function () {
            return 0;
        };
        $mol_viewer.prototype.DOMNode = function (next) {
            var _this = this;
            var path = this.toString();
            var next2 = next;
            if (!next2) {
                next2 = this['DOMNode()'];
                if (next2)
                    return next2;
                next2 = document.getElementById(path);
                if (next2) {
                    if (next2['$mol_viewer']) {
                        return this['DOMNode()'] = next2;
                    }
                }
                else {
                    next2 = document.createElementNS(this.nameSpace(), this.tagName());
                }
            }
            next2.id = path;
            void (next2['$mol_viewer'] = this);
            this['DOMNode()'] = next2;
            var ownerProto = this.objectOwner() && Object.getPrototypeOf(this.objectOwner());
            if (ownerProto && ownerProto['objectClassNames']) {
                var suffix = '_' + this.objectField().replace(/\(.*/, '');
                for (var _i = 0, _a = ownerProto['objectClassNames'](); _i < _a.length; _i++) {
                    var className = _a[_i];
                    var attrName = className.replace(/\$/g, '') + suffix;
                    next2.setAttribute(attrName, '');
                    if (className === '$mol_viewer')
                        break;
                }
            }
            var proto = Object.getPrototypeOf(this);
            for (var _b = 0, _c = proto['objectClassNames'](); _b < _c.length; _b++) {
                var className = _c[_b];
                next2.setAttribute(className.replace(/\$/g, ''), '');
                if (className === '$mol_viewer')
                    break;
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
        $mol_viewer.renderChilds = function (node, childs) {
            if (childs == null)
                return;
            var nextNode = node.firstChild;
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var view = childs_1[_i];
                if (view == null) {
                }
                else if (typeof view === 'object') {
                    var existsNode = ((view instanceof $mol_viewer) ? view.DOMNode() : view.valueOf());
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
            for (var _a = 0, childs_2 = childs; _a < childs_2.length; _a++) {
                var view = childs_2[_a];
                if (view instanceof $mol_viewer) {
                    try {
                        view.DOMTree();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }
        };
        $mol_viewer.renderAttrs = function (node, attrs) {
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
        $mol_viewer.renderFields = function (node, fields) {
            var _loop_2 = function (path) {
                var names = path.split('.');
                var obj = node;
                for (var i = 0; i < names.length - 1; ++i) {
                    if (names[i])
                        obj = obj[names[i]];
                }
                var field = names[names.length - 1];
                var val = fields[path]();
                if (obj[field] !== val) {
                    obj[field] = val;
                    if (obj[field] !== val) {
                        new $.$mol_defer(function () { return fields[path](obj[field]); });
                    }
                }
            };
            for (var path in fields) {
                _loop_2(path);
            }
        };
        $mol_viewer.prototype.DOMTree = function () {
            var node = this.DOMNode();
            try {
                $mol_viewer.renderChilds(node, this.childsVisible());
                $mol_viewer.renderAttrs(node, this.attr());
                $mol_viewer.renderFields(node, this.field());
                return node;
            }
            catch (error) {
                if (!error['$mol_viewer_catched']) {
                    node.setAttribute('mol_viewer_error', error.name);
                    error['$mol_viewer_catched'] = true;
                }
                throw error;
            }
        };
        $mol_viewer.prototype.attr = function () {
            return {
                'mol_viewer_error': function () { return false; }
            };
        };
        $mol_viewer.prototype.field = function () {
            return {};
        };
        $mol_viewer.prototype.event = function () { return {}; };
        $mol_viewer.prototype.localizationContexts = function () {
            return Object.getPrototypeOf(this).objectClassNames();
        };
        return $mol_viewer;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_viewer.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_viewer.prototype, "DOMTree", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_viewer, "root", null);
    $.$mol_viewer = $mol_viewer;
})($ || ($ = {}));
//viewer.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_viewer_root]');
        var _loop_1 = function (i) {
            var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
            view.DOMNode(nodes.item(i));
            var win = new $.$mol_atom("$mol_viewer.root(" + i + ")", function () {
                view.DOMTree();
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
//viewer.web.js.map
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
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            return _super.apply(this, arguments) || this;
        }
        $mol_scroller.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollTop = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroller.prototype.scrollLeft = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroller.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function (val) { return _this.scrollTop(val); },
                "scrollLeft": function (val) { return _this.scrollLeft(val); },
            });
        };
        $mol_scroller.prototype.eventScroll = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroller.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (event) { return _this.eventScroll(event); },
                "overflow": function (event) { return _this.eventScroll(event); },
                "underflow": function (event) { return _this.eventScroll(event); },
            });
        };
        return $mol_scroller;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "scrollTop", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "scrollLeft", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroller.prototype, "eventScroll", null);
    $.$mol_scroller = $mol_scroller;
})($ || ($ = {}));
//scroller.view.tree.js.map
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
    $.$mol_viewer_context.$mol_scroller_scrollTop = function () { return 0; };
    $.$mol_viewer_context.$mol_scroller_scrollLeft = function () { return 0; };
    $.$mol_viewer_context.$mol_scroller_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                return _super.apply(this, arguments) || this;
            }
            $mol_scroller.prototype.scrollTop = function (next) {
                return $.$mol_state_session.value(this + ".scrollTop()", next) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function (next) {
                return $.$mol_state_session.value(this + ".scrollLeft()", next) || 0;
            };
            $mol_scroller.prototype.scrollBottom = function (next) {
                return next || 0;
            };
            $mol_scroller.prototype.scrollRight = function (next) {
                return next || 0;
            };
            $mol_scroller.prototype.eventScroll = function (next) {
                var _this = this;
                this.moving(true);
                new $.$mol_defer(function () {
                    var el = _this.DOMNode();
                    _this.scrollTop(Math.max(0, el.scrollTop));
                    _this.scrollLeft(Math.max(0, el.scrollLeft));
                    _this.scrollBottom(Math.max(0, el.scrollHeight - el.scrollTop - el.offsetHeight));
                    _this.scrollRight(Math.max(0, el.scrollWidth - el.scrollLeft - el.offsetWidth));
                });
            };
            $mol_scroller.prototype.moving = function (next) {
                var _this = this;
                if (next) {
                    setTimeout(function () {
                        _this.moving(false);
                    });
                }
                return next || false;
            };
            $mol_scroller.prototype.contextSub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_viewer_visibleHeight = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_viewer_visibleHeight();
                    return _this.scrollTop() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_viewer_visibleWidth = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_viewer_visibleWidth();
                    return _this.scrollLeft() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroller_scrollTop = function () { return _this.scrollTop(); };
                subContext.$mol_scroller_scrollLeft = function () { return _this.scrollLeft(); };
                subContext.$mol_scroller_moving = function () { return _this.moving(); };
                return subContext;
            };
            $mol_scroller.prototype.shadowStyle = function () {
                var shadows = [];
                if (this.scrollTop() > 0)
                    shadows.push('inset 0 6px 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollLeft() > 0)
                    shadows.push('inset 6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollBottom() > 0)
                    shadows.push('inset 0 -6px 6px -6px rgba( 0 , 0 , 0 , .25 )');
                if (this.scrollRight() > 0)
                    shadows.push('inset -6px 0 6px -6px rgba( 0 , 0 , 0 , .25 )');
                return shadows.join(' , ');
            };
            return $mol_scroller;
        }($.$mol_scroller));
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollBottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollRight", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "contextSub", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "shadowStyle", null);
        $mol.$mol_scroller = $mol_scroller;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroller.view.js.map
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
    var $mol_pager = (function (_super) {
        __extends($mol_pager, _super);
        function $mol_pager() {
            return _super.apply(this, arguments) || this;
        }
        $mol_pager.prototype.titler = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return [];
        };
        $mol_pager.prototype.bodier = function () {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.body(); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return [];
        };
        $mol_pager.prototype.footer = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.foot(); };
            });
        };
        $mol_pager.prototype.childs = function () {
            return [].concat(this.header(), this.bodier(), this.footer());
        };
        return $mol_pager;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_pager.prototype, "titler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_pager.prototype, "header", null);
    __decorate([
        $.$mol_mem()
    ], $mol_pager.prototype, "bodier", null);
    __decorate([
        $.$mol_mem()
    ], $mol_pager.prototype, "footer", null);
    $.$mol_pager = $mol_pager;
})($ || ($ = {}));
//pager.view.tree.js.map
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
    var $mol_stacker = (function (_super) {
        __extends($mol_stacker, _super);
        function $mol_stacker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_stacker.prototype.side = function () {
            return false;
        };
        $mol_stacker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_stacker_side": function () { return _this.side(); },
            });
        };
        $mol_stacker.prototype.main = function () {
            return [];
        };
        $mol_stacker.prototype.mainer = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.main(); };
            });
        };
        $mol_stacker.prototype.addon = function () {
            return [];
        };
        $mol_stacker.prototype.addoner = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.addon(); };
            });
        };
        $mol_stacker.prototype.childs = function () {
            return [].concat(this.mainer(), this.addoner());
        };
        return $mol_stacker;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_stacker.prototype, "mainer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_stacker.prototype, "addoner", null);
    $.$mol_stacker = $mol_stacker;
})($ || ($ = {}));
//stacker.view.tree.js.map
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
        var $mol_stacker = (function (_super) {
            __extends($mol_stacker, _super);
            function $mol_stacker() {
                return _super.apply(this, arguments) || this;
            }
            $mol_stacker.prototype.side = function (next) {
                if (!this.main())
                    return true;
                if (this.main().length === 0)
                    return true;
                var arg = (next === void 0) ? void 0 : next ? '' : null;
                return $.$mol_state_arg.value(this.stateKey('side'), arg) != null;
            };
            return $mol_stacker;
        }($.$mol_stacker));
        $mol.$mol_stacker = $mol_stacker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stacker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_lister = (function (_super) {
        __extends($mol_lister, _super);
        function $mol_lister() {
            return _super.apply(this, arguments) || this;
        }
        $mol_lister.prototype.minHeightStyle = function () {
            return "";
        };
        $mol_lister.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.minHeight": function () { return _this.minHeightStyle(); },
            });
        };
        $mol_lister.prototype.rowers = function () {
            return [];
        };
        $mol_lister.prototype.childs = function () {
            return this.rowers();
        };
        return $mol_lister;
    }($.$mol_viewer));
    $.$mol_lister = $mol_lister;
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
        var $mol_lister = (function (_super) {
            __extends($mol_lister, _super);
            function $mol_lister() {
                return _super.apply(this, arguments) || this;
            }
            $mol_lister.prototype.rowerOffsets = function () {
                var childs = this.childs();
                if (!childs)
                    return null;
                var heightLimit = this.context().$mol_viewer_visibleHeight();
                var offset = 0;
                var next = [];
                for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                    var child = childs_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_viewer) {
                        offset += child.heightMinimal();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_lister.prototype.rowerContext = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_viewer_visibleHeight = function () {
                    var limit = context.$mol_viewer_visibleHeight();
                    return limit - _this.rowerOffsets()[index];
                };
                return next;
            };
            $mol_lister.prototype.childsVisible = function () {
                var childs = this.childs();
                if (!childs)
                    return childs;
                var limit = this.rowerOffsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = childs[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_viewer) {
                        child.context(this.rowerContext(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_lister.prototype.heightMinimal = function () {
                var height = 0;
                var childs = this.childs();
                if (childs)
                    childs.forEach(function (child) {
                        if (child instanceof $.$mol_viewer) {
                            height += child.heightMinimal();
                        }
                    });
                return height;
            };
            $mol_lister.prototype.minHeightStyle = function () {
                return this.heightMinimal() + 'px';
            };
            return $mol_lister;
        }($.$mol_lister));
        __decorate([
            $.$mol_mem()
        ], $mol_lister.prototype, "rowerOffsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_lister.prototype, "rowerContext", null);
        __decorate([
            $.$mol_mem()
        ], $mol_lister.prototype, "childsVisible", null);
        $mol.$mol_lister = $mol_lister;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//lister.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_floater = (function (_super) {
        __extends($mol_floater, _super);
        function $mol_floater() {
            return _super.apply(this, arguments) || this;
        }
        $mol_floater.prototype.shiftStyle = function () {
            return "";
        };
        $mol_floater.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.transform": function () { return _this.shiftStyle(); },
            });
        };
        $mol_floater.prototype.scrolling = function () {
            return false;
        };
        $mol_floater.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_floater_scrolling": function () { return _this.scrolling(); },
            });
        };
        return $mol_floater;
    }($.$mol_viewer));
    $.$mol_floater = $mol_floater;
})($ || ($ = {}));
//floater.view.tree.js.map
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
        var $mol_floater = (function (_super) {
            __extends($mol_floater, _super);
            function $mol_floater() {
                return _super.apply(this, arguments) || this;
            }
            $mol_floater.prototype.shiftStyle = function () {
                var context = this.context();
                var offset = context.$mol_scroller_scrollTop();
                return "translateY(" + offset + "px)";
            };
            $mol_floater.prototype.scrolling = function () {
                return this.context().$mol_scroller_moving();
            };
            return $mol_floater;
        }($.$mol_floater));
        $mol.$mol_floater = $mol_floater;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//floater.view.js.map
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
    var $mol_clicker = (function (_super) {
        __extends($mol_clicker, _super);
        function $mol_clicker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_clicker.prototype.enabled = function () {
            return true;
        };
        $mol_clicker.prototype.eventClick = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_clicker.prototype.eventActivate = function (event) {
            return this.eventClick(event);
        };
        $mol_clicker.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (event) { return _this.eventActivate(event); },
            });
        };
        $mol_clicker.prototype.disabled = function () {
            return false;
        };
        $mol_clicker.prototype.tabIndex = function () {
            return "0";
        };
        $mol_clicker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
                "role": function () { return "button"; },
                "tabindex": function () { return _this.tabIndex(); },
            });
        };
        return $mol_clicker;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_clicker.prototype, "eventClick", null);
    __decorate([
        $.$mol_mem()
    ], $mol_clicker.prototype, "eventActivate", null);
    $.$mol_clicker = $mol_clicker;
})($ || ($ = {}));
//clicker.view.tree.js.map
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
        var $mol_clicker = (function (_super) {
            __extends($mol_clicker, _super);
            function $mol_clicker() {
                return _super.apply(this, arguments) || this;
            }
            $mol_clicker.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_clicker.prototype.eventActivate = function (next) {
                if (!this.enabled())
                    return;
                this.eventClick(next);
            };
            $mol_clicker.prototype.tabIndex = function () {
                return this.enabled() ? _super.prototype.tabIndex.call(this) : null;
            };
            return $mol_clicker;
        }($.$mol_clicker));
        $mol.$mol_clicker = $mol_clicker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//clicker.view.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $;
(function ($) {
    var $mol_clicker_button = (function (_super) {
        __extends($mol_clicker_button, _super);
        function $mol_clicker_button() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_clicker_button;
    }($.$mol_clicker));
    $.$mol_clicker_button = $mol_clicker_button;
})($ || ($ = {}));
(function ($) {
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_clicker_major;
    }($.$mol_clicker_button));
    $.$mol_clicker_major = $mol_clicker_major;
})($ || ($ = {}));
(function ($) {
    var $mol_clicker_minor = (function (_super) {
        __extends($mol_clicker_minor, _super);
        function $mol_clicker_minor() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_clicker_minor;
    }($.$mol_clicker_button));
    $.$mol_clicker_minor = $mol_clicker_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_clicker_danger = (function (_super) {
        __extends($mol_clicker_danger, _super);
        function $mol_clicker_danger() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_clicker_danger;
    }($.$mol_clicker_button));
    $.$mol_clicker_danger = $mol_clicker_danger;
})($ || ($ = {}));
//clicker_types.view.tree.js.map
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
    var $mol_checker = (function (_super) {
        __extends($mol_checker, _super);
        function $mol_checker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_checker.prototype.checked = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_checker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_checker_checked": function () { return _this.checked(); },
            });
        };
        $mol_checker.prototype.icon = function () {
            return null;
        };
        $mol_checker.prototype.label = function () {
            return [];
        };
        $mol_checker.prototype.labeler = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_checker.prototype.childs = function () {
            return [].concat(this.icon(), this.labeler());
        };
        return $mol_checker;
    }($.$mol_clicker));
    __decorate([
        $.$mol_mem()
    ], $mol_checker.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_checker.prototype, "labeler", null);
    $.$mol_checker = $mol_checker;
})($ || ($ = {}));
//checker.view.tree.js.map
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
        var $mol_checker = (function (_super) {
            __extends($mol_checker, _super);
            function $mol_checker() {
                return _super.apply(this, arguments) || this;
            }
            $mol_checker.prototype.eventClick = function (next) {
                this.checked(!this.checked());
                next.preventDefault();
            };
            return $mol_checker;
        }($.$mol_checker));
        $mol.$mol_checker = $mol_checker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//checker.view.js.map
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
        $mol_svg.prototype.tagName = function () {
            return "svg";
        };
        $mol_svg.prototype.nameSpace = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_viewer));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.tagName = function () {
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
    }($.$mol_viewer));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.tagName = function () {
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
        $mol_svg_circle.prototype.tagName = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.radius = function () {
            return "";
        };
        $mol_svg_circle.prototype.posX = function () {
            return "";
        };
        $mol_svg_circle.prototype.posY = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "r": function () { return _this.radius(); },
                "cx": function () { return _this.posX(); },
                "cy": function () { return _this.posY(); },
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
        $mol_icon.prototype.childs = function () {
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
    var $mol_checker_expander = (function (_super) {
        __extends($mol_checker_expander, _super);
        function $mol_checker_expander() {
            return _super.apply(this, arguments) || this;
        }
        $mol_checker_expander.prototype.icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_checker_expander.prototype.level = function () {
            return 0;
        };
        $mol_checker_expander.prototype.levelStyle = function () {
            return "0px";
        };
        $mol_checker_expander.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.paddingLeft": function () { return _this.levelStyle(); },
            });
        };
        $mol_checker_expander.prototype.expanded = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_checker_expander.prototype.checked = function (val) {
            return this.expanded(val);
        };
        $mol_checker_expander.prototype.expandable = function () {
            return false;
        };
        $mol_checker_expander.prototype.enabled = function () {
            return this.expandable();
        };
        return $mol_checker_expander;
    }($.$mol_checker));
    __decorate([
        $.$mol_mem()
    ], $mol_checker_expander.prototype, "icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_checker_expander.prototype, "expanded", null);
    __decorate([
        $.$mol_mem()
    ], $mol_checker_expander.prototype, "checked", null);
    $.$mol_checker_expander = $mol_checker_expander;
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
        var $mol_checker_expander = (function (_super) {
            __extends($mol_checker_expander, _super);
            function $mol_checker_expander() {
                return _super.apply(this, arguments) || this;
            }
            $mol_checker_expander.prototype.levelStyle = function () {
                return this.level() * .75 - 1.5 + "rem";
            };
            $mol_checker_expander.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_checker_expander;
        }($.$mol_checker_expander));
        $mol.$mol_checker_expander = $mol_checker_expander;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//expander.view.js.map
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
    var $mol_grider = (function (_super) {
        __extends($mol_grider, _super);
        function $mol_grider() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grider.prototype.rows = function () {
            return [];
        };
        $mol_grider.prototype.row = function (id) {
            return null;
        };
        $mol_grider.prototype.cols = function () {
            return [];
        };
        $mol_grider.prototype.records = function () {
            return [];
        };
        $mol_grider.prototype.record = function (id) {
            return null;
        };
        $mol_grider.prototype.hierarchy = function () {
            return null;
        };
        $mol_grider.prototype.hierarchyColumn = function () {
            return "";
        };
        $mol_grider.prototype.fieldId = function () {
            return "";
        };
        $mol_grider.prototype.fieldParent = function () {
            return "";
        };
        $mol_grider.prototype.rowersVisible = function () {
            return [];
        };
        $mol_grider.prototype.tabler = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.tagName = function () { return "table"; };
                obj.childs = function () { return [].concat(_this.rowersVisible()); };
            });
        };
        $mol_grider.prototype.childs = function () {
            return [].concat(this.tabler());
        };
        $mol_grider.prototype.rowers = function () {
            return [];
        };
        $mol_grider.prototype.rowHeight = function () {
            return 40;
        };
        $mol_grider.prototype.headerCellers = function () {
            return [];
        };
        $mol_grider.prototype.header = function () {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.headerCellers(); };
            });
        };
        $mol_grider.prototype.gapTop = function () {
            return 0;
        };
        $mol_grider.prototype.gaperTop = function () {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapTop(); };
            });
        };
        $mol_grider.prototype.gapBottom = function () {
            return 0;
        };
        $mol_grider.prototype.gaperBottom = function () {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapBottom(); };
            });
        };
        $mol_grider.prototype.cellers = function (id) {
            return [];
        };
        $mol_grider.prototype.rower = function (id) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.cellers(id); };
            });
        };
        $mol_grider.prototype.celler = function (id) {
            return null;
        };
        $mol_grider.prototype.cellerContent = function (id) {
            return [];
        };
        $mol_grider.prototype.cellerContentText = function (id) {
            return this.cellerContent(id);
        };
        $mol_grider.prototype.cellerText = function (id) {
            var _this = this;
            return new $.$mol_grider_celler().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellerContentText(id)); };
            });
        };
        $mol_grider.prototype.cellerContentNumber = function (id) {
            return this.cellerContent(id);
        };
        $mol_grider.prototype.cellerNumber = function (id) {
            var _this = this;
            return new $.$mol_grider_number().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellerContentNumber(id)); };
            });
        };
        $mol_grider.prototype.columnHeaderContent = function (id) {
            return [];
        };
        $mol_grider.prototype.columnHeader = function (id) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.columnHeaderContent(id)); };
            });
        };
        $mol_grider.prototype.cellerLevel = function (id) {
            return 0;
        };
        $mol_grider.prototype.cellerExpanded = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_grider.prototype.cellerBranch = function (id) {
            var _this = this;
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.level = function () { return _this.cellerLevel(id); };
                obj.label = function () { return _this.cellerContent(id); };
                obj.expanded = function (val) { return _this.cellerExpanded(id, val); };
            });
        };
        return $mol_grider;
    }($.$mol_scroller));
    __decorate([
        $.$mol_mem()
    ], $mol_grider.prototype, "tabler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grider.prototype, "header", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grider.prototype, "gaperTop", null);
    __decorate([
        $.$mol_mem()
    ], $mol_grider.prototype, "gaperBottom", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "rower", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "cellerText", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "cellerNumber", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "columnHeader", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "cellerExpanded", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_grider.prototype, "cellerBranch", null);
    $.$mol_grider = $mol_grider;
})($ || ($ = {}));
(function ($) {
    var $mol_grider_gaper = (function (_super) {
        __extends($mol_grider_gaper, _super);
        function $mol_grider_gaper() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grider_gaper.prototype.height = function () {
            return 0;
        };
        $mol_grider_gaper.prototype.heightStyle = function () {
            return "0px";
        };
        $mol_grider_gaper.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.height": function () { return _this.heightStyle(); },
            });
        };
        return $mol_grider_gaper;
    }($.$mol_viewer));
    $.$mol_grider_gaper = $mol_grider_gaper;
})($ || ($ = {}));
(function ($) {
    var $mol_grider_rower = (function (_super) {
        __extends($mol_grider_rower, _super);
        function $mol_grider_rower() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grider_rower.prototype.tagName = function () {
            return "tr";
        };
        $mol_grider_rower.prototype.height = function () {
            return 40;
        };
        $mol_grider_rower.prototype.heightStyle = function () {
            return "";
        };
        $mol_grider_rower.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.height": function () { return _this.heightStyle(); },
            });
        };
        $mol_grider_rower.prototype.cellers = function () {
            return [];
        };
        $mol_grider_rower.prototype.childs = function () {
            return this.cellers();
        };
        return $mol_grider_rower;
    }($.$mol_viewer));
    $.$mol_grider_rower = $mol_grider_rower;
})($ || ($ = {}));
(function ($) {
    var $mol_grider_celler = (function (_super) {
        __extends($mol_grider_celler, _super);
        function $mol_grider_celler() {
            return _super.apply(this, arguments) || this;
        }
        $mol_grider_celler.prototype.tagName = function () {
            return "td";
        };
        return $mol_grider_celler;
    }($.$mol_viewer));
    $.$mol_grider_celler = $mol_grider_celler;
})($ || ($ = {}));
(function ($) {
    var $mol_grider_number = (function (_super) {
        __extends($mol_grider_number, _super);
        function $mol_grider_number() {
            return _super.apply(this, arguments) || this;
        }
        return $mol_grider_number;
    }($.$mol_grider_celler));
    $.$mol_grider_number = $mol_grider_number;
})($ || ($ = {}));
//grider.view.tree.js.map
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
        var $mol_grider = (function (_super) {
            __extends($mol_grider, _super);
            function $mol_grider() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grider.prototype.rowersVisible = function () {
                var rowers = this.rowers();
                if (!rowers)
                    return null;
                var viewWindow = this.viewWindow();
                return [].concat(this.cols() && this.header(), (viewWindow.top > 0) ? this.gaperTop() : null, rowers.slice(viewWindow.top, viewWindow.bottom).valueOf(), (viewWindow.bottom < viewWindow.count) ? this.gaperBottom() : null);
            };
            $mol_grider.prototype.viewWindow = function () {
                var rowers = this.rowers();
                if (!rowers)
                    return null;
                var count = rowers.length;
                var context = this.contextSub();
                var scrollTop = context.$mol_scroller_scrollTop();
                var heightLimit = context.$mol_viewer_visibleHeight();
                var rowHeight = this.rowHeight();
                var top = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
                var bottom = Math.min(count, Math.ceil(heightLimit / rowHeight) + 2);
                return { top: top, bottom: bottom, count: count };
            };
            $mol_grider.prototype.gapTop = function () {
                var viewWindow = this.viewWindow();
                return viewWindow.top * this.rowHeight();
            };
            $mol_grider.prototype.gapBottom = function () {
                var viewWindow = this.viewWindow();
                return (viewWindow.count - viewWindow.bottom) * this.rowHeight();
            };
            $mol_grider.prototype.headerCellers = function () {
                var _this = this;
                return this.cols().map(function (colId) { return _this.columnHeader(colId); });
            };
            $mol_grider.prototype.columnHeaderContent = function (colId) {
                return [colId];
            };
            $mol_grider.prototype.rowers = function () {
                var _this = this;
                return this.rows().map(function (row) { return _this.rower(row); });
            };
            $mol_grider.prototype.cellers = function (row) {
                var _this = this;
                return this.cols().map(function (col) { return _this.celler({ row: row, col: col }); });
            };
            $mol_grider.prototype.colType = function (col) {
                if (col === this.hierarchyColumn())
                    return 'branch';
                var rowFirst = this.row(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            };
            $mol_grider.prototype.celler = function (id) {
                switch (this.colType(id.col).valueOf()) {
                    case 'branch': return this.cellerBranch(id);
                    case 'number': return this.cellerNumber(id);
                }
                return this.cellerText(id);
            };
            $mol_grider.prototype.cellerContent = function (id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            };
            $mol_grider.prototype.records = function () {
                return [];
            };
            $mol_grider.prototype.record = function (id) {
                return this.records()[id];
            };
            $mol_grider.prototype.ids = function () {
                return Object.keys(this.records());
            };
            $mol_grider.prototype.row = function (index) {
                return this.rows().slice(index, index + 1).valueOf()[0];
            };
            $mol_grider.prototype.cols = function () {
                var rowFirst = this.row(0);
                if (rowFirst === void 0)
                    return null;
                var record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            };
            $mol_grider.prototype.hierarchy = function () {
                var hierarchy = {};
                var root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    childs: [],
                };
                this.ids().map(function (id) {
                    root.childs.push(hierarchy[id] = {
                        id: id,
                        parent: root,
                        childs: [],
                    });
                });
                return hierarchy;
            };
            $mol_grider.prototype.rowsSub = function (row) {
                return this.hierarchy()[row[row.length - 1]].childs.map(function (child) { return row.concat(child.id); });
            };
            $mol_grider.prototype.rowRoot = function () {
                return [''];
            };
            $mol_grider.prototype.cellerLevel = function (id) {
                return id.row.length;
            };
            $mol_grider.prototype.rows = function () {
                var _this = this;
                var next = [];
                var add = function (row) {
                    next.push(row);
                    if (_this.rowExpanded(row)) {
                        _this.rowsSub(row).forEach(function (child) { return add(child); });
                    }
                };
                this.rowsSub(this.rowRoot()).forEach(function (child) { return add(child); });
                return next;
            };
            $mol_grider.prototype.rowExpanded = function (row, next) {
                if (!this.rowsSub(row).length)
                    return null;
                var key = "rowExpanded(" + JSON.stringify(row) + ")";
                var next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? false : next2;
            };
            $mol_grider.prototype.cellerExpanded = function (id, next) {
                return this.rowExpanded(id.row, next);
            };
            return $mol_grider;
        }($.$mol_grider));
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "rowersVisible", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "viewWindow", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "headerCellers", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "columnHeaderContent", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grider.prototype, "colType", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "ids", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem()
        ], $mol_grider.prototype, "rows", null);
        $mol.$mol_grider = $mol_grider;
        var $mol_grider_gaper = (function (_super) {
            __extends($mol_grider_gaper, _super);
            function $mol_grider_gaper() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grider_gaper.prototype.heightStyle = function () {
                return this.height() + "px";
            };
            return $mol_grider_gaper;
        }($.$mol_grider_gaper));
        $mol.$mol_grider_gaper = $mol_grider_gaper;
        var $mol_grider_rower = (function (_super) {
            __extends($mol_grider_rower, _super);
            function $mol_grider_rower() {
                return _super.apply(this, arguments) || this;
            }
            $mol_grider_rower.prototype.heightStyle = function () {
                return this.height() + "px";
            };
            return $mol_grider_rower;
        }($.$mol_grider_rower));
        $mol.$mol_grider_rower = $mol_grider_rower;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//grider.view.js.map
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
    var $mol_texter = (function (_super) {
        __extends($mol_texter, _super);
        function $mol_texter() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter.prototype.text = function () {
            return "";
        };
        $mol_texter.prototype.blockContent = function (id) {
            return [];
        };
        $mol_texter.prototype.blockType = function (id) {
            return "";
        };
        $mol_texter.prototype.rower = function (id) {
            var _this = this;
            return new $.$mol_texter_rower().setup(function (obj) {
                obj.childs = function () { return _this.blockContent(id); };
                obj.type = function () { return _this.blockType(id); };
            });
        };
        $mol_texter.prototype.spanner = function (id) {
            return new $.$mol_texter_spanner();
        };
        $mol_texter.prototype.linker = function (id) {
            return new $.$mol_texter_linker();
        };
        $mol_texter.prototype.imager = function (id) {
            return new $.$mol_texter_imager();
        };
        $mol_texter.prototype.headerLevel = function (id) {
            return 0;
        };
        $mol_texter.prototype.headerContent = function (id) {
            return [];
        };
        $mol_texter.prototype.header = function (id) {
            var _this = this;
            return new $.$mol_texter_header().setup(function (obj) {
                obj.level = function () { return _this.headerLevel(id); };
                obj.content = function () { return _this.headerContent(id); };
            });
        };
        $mol_texter.prototype.tablerHeaderCellers = function (id) {
            return [];
        };
        $mol_texter.prototype.tablerRowers = function (id) {
            return [];
        };
        $mol_texter.prototype.tabler = function (id) {
            var _this = this;
            return new $.$mol_grider().setup(function (obj) {
                obj.headerCellers = function () { return _this.tablerHeaderCellers(id); };
                obj.rowers = function () { return _this.tablerRowers(id); };
            });
        };
        $mol_texter.prototype.tablerCellers = function (id) {
            return [];
        };
        $mol_texter.prototype.tablerRower = function (id) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.cellers = function () { return _this.tablerCellers(id); };
            });
        };
        $mol_texter.prototype.tablerCellerContent = function (id) {
            return [];
        };
        $mol_texter.prototype.tablerCeller = function (id) {
            var _this = this;
            return new $.$mol_grider_celler().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(id); };
            });
        };
        $mol_texter.prototype.tablerCellerHeader = function (id) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(id); };
            });
        };
        return $mol_texter;
    }($.$mol_lister));
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "rower", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "spanner", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "linker", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "imager", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "header", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "tabler", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "tablerRower", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "tablerCeller", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_texter.prototype, "tablerCellerHeader", null);
    $.$mol_texter = $mol_texter;
})($ || ($ = {}));
(function ($) {
    var $mol_texter_rower = (function (_super) {
        __extends($mol_texter_rower, _super);
        function $mol_texter_rower() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter_rower.prototype.heightMinimal = function () {
            return 40;
        };
        $mol_texter_rower.prototype.type = function () {
            return "";
        };
        $mol_texter_rower.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function () { return _this.type(); },
            });
        };
        return $mol_texter_rower;
    }($.$mol_viewer));
    $.$mol_texter_rower = $mol_texter_rower;
})($ || ($ = {}));
(function ($) {
    var $mol_texter_header = (function (_super) {
        __extends($mol_texter_header, _super);
        function $mol_texter_header() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter_header.prototype.tagName = function () {
            return "h";
        };
        $mol_texter_header.prototype.level = function (val) {
            return (val !== void 0) ? val : 0;
        };
        $mol_texter_header.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_header_level": function () { return _this.level(); },
            });
        };
        $mol_texter_header.prototype.content = function () {
            return [];
        };
        $mol_texter_header.prototype.childs = function () {
            return this.content();
        };
        return $mol_texter_header;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_texter_header.prototype, "level", null);
    $.$mol_texter_header = $mol_texter_header;
})($ || ($ = {}));
(function ($) {
    var $mol_texter_spanner = (function (_super) {
        __extends($mol_texter_spanner, _super);
        function $mol_texter_spanner() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter_spanner.prototype.tagName = function () {
            return "span";
        };
        $mol_texter_spanner.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_spanner.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function () { return _this.type(); },
            });
        };
        $mol_texter_spanner.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_texter_spanner.prototype.childs = function () {
            return this.content();
        };
        return $mol_texter_spanner;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_texter_spanner.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_texter_spanner.prototype, "content", null);
    $.$mol_texter_spanner = $mol_texter_spanner;
})($ || ($ = {}));
(function ($) {
    var $mol_texter_linker = (function (_super) {
        __extends($mol_texter_linker, _super);
        function $mol_texter_linker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_texter_linker.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_linker.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function () { return _this.type(); },
                "href": function () { return _this.link(); },
            });
        };
        $mol_texter_linker.prototype.content = function (val) {
            return (val !== void 0) ? val : [];
        };
        $mol_texter_linker.prototype.childs = function () {
            return this.content();
        };
        return $mol_texter_linker;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_texter_linker.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_texter_linker.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_texter_linker.prototype, "content", null);
    $.$mol_texter_linker = $mol_texter_linker;
})($ || ($ = {}));
(function ($) {
    var $mol_texter_imager = (function (_super) {
        __extends($mol_texter_imager, _super);
        function $mol_texter_imager() {
            return _super.apply(this, arguments) || this;
        }
        $mol_texter_imager.prototype.tagName = function () {
            return "img";
        };
        $mol_texter_imager.prototype.type = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_imager.prototype.link = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_imager.prototype.title = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_texter_imager.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function () { return _this.type(); },
                "src": function () { return _this.link(); },
                "alt": function () { return _this.title(); },
            });
        };
        return $mol_texter_imager;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_texter_imager.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_texter_imager.prototype, "link", null);
    __decorate([
        $.$mol_mem()
    ], $mol_texter_imager.prototype, "title", null);
    $.$mol_texter_imager = $mol_texter_imager;
})($ || ($ = {}));
//texter.view.tree.js.map
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
        var $mol_texter = (function (_super) {
            __extends($mol_texter, _super);
            function $mol_texter() {
                return _super.apply(this, arguments) || this;
            }
            $mol_texter.prototype.tokensFlow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_texter.prototype.rowers = function () {
                var _this = this;
                return this.tokensFlow().map(function (token, index) {
                    switch (token.name) {
                        case 'table': return _this.tabler(index);
                        case 'header': return _this.header(index);
                    }
                    return _this.rower(index);
                });
            };
            $mol_texter.prototype.headerLevel = function (index) {
                return this.tokensFlow()[index].chunks[0].length;
            };
            $mol_texter.prototype.headerContent = function (index) {
                return this.text2spans("" + index, this.tokensFlow()[index].chunks[2]);
            };
            $mol_texter.prototype.blockType = function (index) {
                return this.tokensFlow()[index].name;
            };
            $mol_texter.prototype.cellContents = function (indexBlock) {
                return this.tokensFlow()[indexBlock].chunks[0]
                    .split(/\r?\n/g)
                    .filter(function (row) { return row && !/\|--/.test(row); })
                    .map(function (row, rowId) {
                    return row.split(/\|/g)
                        .filter(function (cell) { return cell; })
                        .map(function (cell, cellId) { return cell.trim(); });
                });
            };
            $mol_texter.prototype.tablerRowers = function (blockId) {
                var _this = this;
                return this.cellContents(blockId)
                    .slice(1)
                    .map(function (row, rowId) { return _this.tablerRower({ block: blockId, row: rowId + 1 }); });
            };
            $mol_texter.prototype.tablerHeaderCellers = function (blockId) {
                var _this = this;
                return this.cellContents(blockId)[0]
                    .map(function (cell, cellId) { return _this.tablerCellerHeader({ block: blockId, row: 0, cell: cellId }); });
            };
            $mol_texter.prototype.tablerCellers = function (id) {
                var _this = this;
                return this.cellContents(id.block)[id.row]
                    .map(function (cell, cellId) { return _this.tablerCeller({ block: id.block, row: id.row, cell: cellId }); });
            };
            $mol_texter.prototype.tablerCellerContent = function (id) {
                return this.text2spans(id.block + "/" + id.row + "/" + id.cell, this.cellContents(id.block)[id.row][id.cell]);
            };
            $mol_texter.prototype.text2spans = function (prefix, text) {
                var _this = this;
                return $.$mol_syntax_md_line.tokenize(text).map(function (token, index) {
                    var id = prefix + "/" + index;
                    switch (token.name) {
                        case 'text-link': {
                            if (/^#|(\w+script+:)+/.test(token.chunks[1])) {
                                var span_1 = _this.spanner(id);
                                span_1.content(_this.text2spans(id, token.chunks[0]));
                                return span_1;
                            }
                            else {
                                var span_2 = _this.linker(id);
                                span_2.type(token.name);
                                span_2.link(token.chunks[1]);
                                span_2.content(_this.text2spans(id, token.chunks[0]));
                                return span_2;
                            }
                        }
                        case 'image-link': {
                            var span_3 = _this.imager(id);
                            span_3.type(token.name);
                            span_3.link(token.chunks[1]);
                            span_3.title(token.chunks[0]);
                            return span_3;
                        }
                        case 'code3':
                        case 'code': {
                            var span_4 = _this.spanner(id);
                            span_4.type('code');
                            span_4.content([token.chunks[0]]);
                            return span_4;
                        }
                    }
                    var span = _this.spanner(id);
                    span.type(token.name);
                    span.content(token.name
                        ? [].concat.apply([], token.chunks.map(function (text, index) { return _this.text2spans(id + "/" + index, text); }))
                        : [token.found]);
                    return span;
                });
            };
            $mol_texter.prototype.blockContent = function (indexBlock) {
                var token = this.tokensFlow()[indexBlock];
                switch (token.name) {
                    case 'header': return this.text2spans("" + indexBlock, token.chunks[2]);
                    case 'list-item': return this.text2spans("" + indexBlock, token.chunks[1]);
                    case 'code': return [token.chunks[2]];
                }
                return this.text2spans("" + indexBlock, token.chunks[0]);
            };
            return $mol_texter;
        }($.$mol_texter));
        __decorate([
            $.$mol_mem()
        ], $mol_texter.prototype, "tokensFlow", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter.prototype, "cellContents", null);
        $mol.$mol_texter = $mol_texter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//texter.view.js.map
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
    var $mol_portioner_indicator = (function (_super) {
        __extends($mol_portioner_indicator, _super);
        function $mol_portioner_indicator() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portioner_indicator.prototype.widthStyle = function () {
            return "0";
        };
        $mol_portioner_indicator.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.width": function () { return _this.widthStyle(); },
            });
        };
        return $mol_portioner_indicator;
    }($.$mol_viewer));
    $.$mol_portioner_indicator = $mol_portioner_indicator;
})($ || ($ = {}));
(function ($) {
    var $mol_portioner = (function (_super) {
        __extends($mol_portioner, _super);
        function $mol_portioner() {
            return _super.apply(this, arguments) || this;
        }
        $mol_portioner.prototype.portion = function () {
            return 0;
        };
        $mol_portioner.prototype.indWidthStyle = function () {
            return "0";
        };
        $mol_portioner.prototype.indicator = function () {
            var _this = this;
            return new $.$mol_portioner_indicator().setup(function (obj) {
                obj.widthStyle = function () { return _this.indWidthStyle(); };
            });
        };
        $mol_portioner.prototype.childs = function () {
            return [].concat(this.indicator());
        };
        return $mol_portioner;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_portioner.prototype, "indicator", null);
    $.$mol_portioner = $mol_portioner;
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
        var $mol_portioner = (function (_super) {
            __extends($mol_portioner, _super);
            function $mol_portioner() {
                return _super.apply(this, arguments) || this;
            }
            $mol_portioner.prototype.indWidthStyle = function () {
                return this.portion() * 100 + '%';
            };
            return $mol_portioner;
        }($.$mol_portioner));
        $mol.$mol_portioner = $mol_portioner;
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
    var $mol_bencher = (function (_super) {
        __extends($mol_bencher, _super);
        function $mol_bencher() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bencher.prototype.results = function () {
            return null;
        };
        $mol_bencher.prototype.resultsSorted = function () {
            return null;
        };
        $mol_bencher.prototype.records = function () {
            return this.resultsSorted();
        };
        $mol_bencher.prototype.colSort = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_bencher.prototype.eventSortToggle = function (id, val) {
            return (val !== void 0) ? val : null;
        };
        $mol_bencher.prototype.columnHeaderLabel = function (id) {
            return [];
        };
        $mol_bencher.prototype.columnHeaderSorter = function (id) {
            return new $.$mol_icon_sort_asc();
        };
        $mol_bencher.prototype.columnHeaderContent = function (id) {
            return [].concat(this.columnHeaderLabel(id), this.columnHeaderSorter(id));
        };
        $mol_bencher.prototype.columnHeader = function (id) {
            var _this = this;
            return new $.$mol_bencher_header().setup(function (obj) {
                obj.eventClick = function (val) { return _this.eventSortToggle(id, val); };
                obj.childs = function () { return _this.columnHeaderContent(id); };
            });
        };
        $mol_bencher.prototype.resultValue = function (id) {
            return "";
        };
        $mol_bencher.prototype.resultPortion = function (id) {
            return 0;
        };
        $mol_bencher.prototype.resultPortioner = function (id) {
            var _this = this;
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return _this.resultPortion(id); };
            });
        };
        $mol_bencher.prototype.cellerContentNumber = function (id) {
            return [].concat(this.resultValue(id), this.resultPortioner(id));
        };
        return $mol_bencher;
    }($.$mol_grider));
    __decorate([
        $.$mol_mem()
    ], $mol_bencher.prototype, "colSort", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bencher.prototype, "eventSortToggle", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bencher.prototype, "columnHeaderSorter", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bencher.prototype, "columnHeader", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_bencher.prototype, "resultPortioner", null);
    $.$mol_bencher = $mol_bencher;
})($ || ($ = {}));
(function ($) {
    var $mol_bencher_header = (function (_super) {
        __extends($mol_bencher_header, _super);
        function $mol_bencher_header() {
            return _super.apply(this, arguments) || this;
        }
        $mol_bencher_header.prototype.eventClick = function (val) {
            return (val !== void 0) ? val : null;
        };
        $mol_bencher_header.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (val) { return _this.eventClick(val); },
            });
        };
        $mol_bencher_header.prototype.hint = function () {
            return $.$mol_locale.text(this.localizationContexts(), "hint");
        };
        $mol_bencher_header.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "title": function () { return _this.hint(); },
            });
        };
        return $mol_bencher_header;
    }($.$mol_floater));
    __decorate([
        $.$mol_mem()
    ], $mol_bencher_header.prototype, "eventClick", null);
    $.$mol_bencher_header = $mol_bencher_header;
})($ || ($ = {}));
//bencher.view.tree.js.map
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
        var $mol_bencher = (function (_super) {
            __extends($mol_bencher, _super);
            function $mol_bencher() {
                return _super.apply(this, arguments) || this;
            }
            $mol_bencher.prototype.colSort = function (next) {
                return $.$mol_state_arg.value(this.stateKey('sort'), next);
            };
            $mol_bencher.prototype.resultsSorted = function () {
                var _this = this;
                var prev = this.results();
                var col = this.colSort();
                if (!col)
                    return prev;
                var next = {};
                var keys = Object.keys(prev);
                keys.sort(function (a, b) { return _this.resultNumber({ row: ['', a], col: col }) - _this.resultNumber({ row: ['', b], col: col }); });
                keys.forEach(function (row) { return next[row] = prev[row]; });
                return next;
            };
            $mol_bencher.prototype.resultValue = function (id) {
                return this.results()[id.row[id.row.length - 1]][id.col];
            };
            $mol_bencher.prototype.resultNumber = function (id) {
                return parseInt(this.resultValue(id), 10);
            };
            $mol_bencher.prototype.resultMaxValue = function (col) {
                var _this = this;
                var max = 0;
                var rows = this.rows();
                rows.forEach(function (row) {
                    var numb = _this.resultNumber({ row: row, col: col });
                    if (numb > max)
                        max = numb;
                });
                return max;
            };
            $mol_bencher.prototype.resultPortion = function (id) {
                return this.resultNumber(id) / this.resultMaxValue(id.col);
            };
            $mol_bencher.prototype.columnHeaderLabel = function (col) {
                return [col];
            };
            $mol_bencher.prototype.eventSortToggle = function (col, next) {
                this.colSort(col);
            };
            $mol_bencher.prototype.colType = function (col) {
                if (col === this.hierarchyColumn())
                    return 'branch';
                var rowFirst = this.row(0);
                var val = this.record(rowFirst[rowFirst.length - 1])[col];
                if (!isNaN(parseFloat(val)))
                    return 'number';
                return 'text';
            };
            $mol_bencher.prototype.cellerContentNumber = function (id) {
                return [
                    this.resultValue(id),
                    (this.colSort() === id.col)
                        ? this.resultPortioner(id)
                        : null
                ];
            };
            $mol_bencher.prototype.columnHeaderContent = function (col) {
                return [].concat(this.columnHeaderLabel(col), (this.colSort() === col)
                    ? this.columnHeaderSorter(col)
                    : null);
            };
            return $mol_bencher;
        }($.$mol_bencher));
        __decorate([
            $.$mol_mem()
        ], $mol_bencher.prototype, "colSort", null);
        __decorate([
            $.$mol_mem()
        ], $mol_bencher.prototype, "resultsSorted", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_bencher.prototype, "resultMaxValue", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_bencher.prototype, "colType", null);
        $mol.$mol_bencher = $mol_bencher;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//bencher.view.js.map
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
    var $mol_checker_ticker = (function (_super) {
        __extends($mol_checker_ticker, _super);
        function $mol_checker_ticker() {
            return _super.apply(this, arguments) || this;
        }
        $mol_checker_ticker.prototype.icon = function () {
            return new $.$mol_icon_tick();
        };
        return $mol_checker_ticker;
    }($.$mol_checker));
    __decorate([
        $.$mol_mem()
    ], $mol_checker_ticker.prototype, "icon", null);
    $.$mol_checker_ticker = $mol_checker_ticker;
})($ || ($ = {}));
//ticker.view.tree.js.map
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
        $mol_app_bench.prototype.descriptioner = function () {
            var _this = this;
            return new $.$mol_texter().setup(function (obj) {
                obj.text = function () { return _this.description(); };
            });
        };
        $mol_app_bench.prototype.results = function () {
            return null;
        };
        $mol_app_bench.prototype.columnHeaderLabel = function (id) {
            return [];
        };
        $mol_app_bench.prototype.resultsColSort = function (val) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_bench.prototype.resulter = function () {
            var _this = this;
            return new $.$mol_bencher().setup(function (obj) {
                obj.results = function () { return _this.results(); };
                obj.columnHeaderLabel = function (id) { return _this.columnHeaderLabel(id); };
                obj.colSort = function (val) { return _this.resultsColSort(val); };
            });
        };
        $mol_app_bench.prototype.informator = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.descriptioner(), _this.resulter()); };
            });
        };
        $mol_app_bench.prototype.tester = function () {
            return new $.$mol_app_bench_tester();
        };
        $mol_app_bench.prototype.mainPage = function () {
            var _this = this;
            return new $.$mol_pager().setup(function (obj) {
                obj.title = function () { return _this.title(); };
                obj.body = function () { return [].concat(_this.informator(), _this.tester()); };
            });
        };
        $mol_app_bench.prototype.main = function () {
            return [].concat(this.mainPage());
        };
        $mol_app_bench.prototype.addonerTitle = function () {
            return $.$mol_locale.text(this.localizationContexts(), "addonerTitle");
        };
        $mol_app_bench.prototype.menuOptions = function () {
            return [];
        };
        $mol_app_bench.prototype.menu = function () {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rowers = function () { return _this.menuOptions(); };
            });
        };
        $mol_app_bench.prototype.addonPage = function () {
            var _this = this;
            return new $.$mol_pager().setup(function (obj) {
                obj.title = function () { return _this.addonerTitle(); };
                obj.body = function () { return [].concat(_this.menu()); };
            });
        };
        $mol_app_bench.prototype.addon = function () {
            return [].concat(this.addonPage());
        };
        $mol_app_bench.prototype.menuOptionerChecked = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench.prototype.menuOptionerTitle = function (id) {
            return "";
        };
        $mol_app_bench.prototype.menuOptioner = function (id) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.heightMinimal = function () { return 36; };
                obj.checked = function (val) { return _this.menuOptionerChecked(id, val); };
                obj.label = function () { return [].concat(_this.menuOptionerTitle(id)); };
            });
        };
        $mol_app_bench.prototype.columnHeaderLabelSample = function () {
            return $.$mol_locale.text(this.localizationContexts(), "columnHeaderLabelSample");
        };
        return $mol_app_bench;
    }($.$mol_stacker));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "descriptioner", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "resultsColSort", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "resulter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "informator", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "tester", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "mainPage", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "menu", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench.prototype, "addonPage", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench.prototype, "menuOptionerChecked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench.prototype, "menuOptioner", null);
    $.$mol_app_bench = $mol_app_bench;
})($ || ($ = {}));
(function ($) {
    var $mol_app_bench_tester = (function (_super) {
        __extends($mol_app_bench_tester, _super);
        function $mol_app_bench_tester() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench_tester.prototype.tagName = function () {
            return "iframe";
        };
        return $mol_app_bench_tester;
    }($.$mol_viewer));
    $.$mol_app_bench_tester = $mol_app_bench_tester;
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
                return $.$mol_state_arg.value(this.stateKey('bench'), next) || 'list';
            };
            $mol_app_bench.prototype.sandbox = function (next, force) {
                var _this = this;
                var next2 = this.tester().DOMNode();
                next2.src = this.bench();
                next2.onload = function (event) {
                    next2.onload = null;
                    _this.sandbox(next2, $.$mol_atom_force);
                };
                throw new $.$mol_atom_wait("Loading sandbox...");
            };
            $mol_app_bench.prototype.commandCurrent = function (next, force) {
                if (this['commandCurrent()'])
                    return;
                return next;
            };
            $mol_app_bench.prototype.commandResult = function (command, next) {
                var _this = this;
                var sandbox = this.sandbox();
                sandbox.valueOf();
                if (next !== void 0)
                    return next;
                var current = this.commandCurrent(command);
                if (current !== command)
                    throw new $.$mol_atom_wait("Waiting for " + JSON.stringify(current) + "...");
                requestAnimationFrame(function () {
                    sandbox.contentWindow.postMessage(command, '*');
                    window.onmessage = function (event) {
                        if (event.data[0] !== 'done')
                            return;
                        window.onmessage = null;
                        _this.commandCurrent(null, $.$mol_atom_force);
                        _this.commandResult(command, event.data[1]);
                    };
                });
                throw new $.$mol_atom_wait("Running " + command + "...");
            };
            $mol_app_bench.prototype.meta = function () {
                return this.commandResult(['meta']);
            };
            $mol_app_bench.prototype.samplesAll = function (next) {
                var _this = this;
                return Object.keys(this.meta().samples).sort(function (a, b) {
                    var titleA = _this.menuOptionerTitle(a).toLowerCase();
                    var titleB = _this.menuOptionerTitle(a).toLowerCase();
                    return titleA > titleB ? 1 : titleA < titleB ? -1 : 0;
                });
            };
            $mol_app_bench.prototype.samples = function (next) {
                var arg = $.$mol_state_arg.value(this.stateKey('sample'), next && next.join('~'));
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
            $mol_app_bench.prototype.resultsSample = function (sampleId) {
                var _this = this;
                var results = {
                    sample: this.menuOptionerTitle(sampleId),
                };
                this.steps().forEach(function (step) {
                    results[step] = _this.commandResult([step, sampleId]);
                });
                return results;
            };
            $mol_app_bench.prototype.results = function () {
                var _this = this;
                var results = {};
                this.samples().forEach(function (sample) {
                    results[sample] = _this.resultsSample(sample);
                });
                return results;
            };
            $mol_app_bench.prototype.columnHeaderLabel = function (col) {
                if (col === 'sample')
                    return [this.columnHeaderLabelSample()];
                var title = this.meta().steps[col].title;
                return [title[$.$mol_locale.lang()] || title['en']];
            };
            $mol_app_bench.prototype.resultsColSort = function (next) {
                return $.$mol_state_arg.value(this.stateKey('sort'), next);
            };
            $mol_app_bench.prototype.menuOptions = function () {
                var _this = this;
                return this.samplesAll().map(function (sample) { return _this.menuOptioner(sample); });
            };
            $mol_app_bench.prototype.menuOptionerTitle = function (sample) {
                var title = this.meta().samples[sample].title;
                return title[$.$mol_locale.lang()] || title['en'];
            };
            $mol_app_bench.prototype.menuOptionerChecked = function (sample, next) {
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
        ], $mol_app_bench.prototype, "commandCurrent", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "commandResult", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "samplesAll", null);
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
        ], $mol_app_bench.prototype, "resultsSample", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "results", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "resultsColSort", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "menuOptionerChecked", null);
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
        $mol_app_bench_list_mol.prototype.header = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.sample()); };
            });
        };
        $mol_app_bench_list_mol.prototype.rowers = function () {
            return [];
        };
        $mol_app_bench_list_mol.prototype.lister = function () {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rowers = function () { return [].concat(_this.header(), _this.rowers()); };
            });
        };
        $mol_app_bench_list_mol.prototype.childs = function () {
            return [].concat(this.lister());
        };
        $mol_app_bench_list_mol.prototype.rowerSelected = function (id, val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol.prototype.rowerTitle = function (id) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.rowerContent = function (id) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.rower = function (id) {
            var _this = this;
            return new $.$mol_app_bench_list_mol_rower().setup(function (obj) {
                obj.selected = function (val) { return _this.rowerSelected(id, val); };
                obj.title = function () { return _this.rowerTitle(id); };
                obj.content = function () { return _this.rowerContent(id); };
            });
        };
        return $mol_app_bench_list_mol;
    }($.$mol_scroller));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol.prototype, "header", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol.prototype, "lister", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench_list_mol.prototype, "rowerSelected", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_bench_list_mol.prototype, "rower", null);
    $.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
})($ || ($ = {}));
(function ($) {
    var $mol_app_bench_list_mol_rower = (function (_super) {
        __extends($mol_app_bench_list_mol_rower, _super);
        function $mol_app_bench_list_mol_rower() {
            return _super.apply(this, arguments) || this;
        }
        $mol_app_bench_list_mol_rower.prototype.selected = function (val) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_bench_list_mol_rower.prototype.heightMinimal = function () {
            return 56;
        };
        $mol_app_bench_list_mol_rower.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_app_bench_list_mol_rower_selected": function () { return _this.selected(); },
            });
        };
        $mol_app_bench_list_mol_rower.prototype.eventToggle = function (event) {
            return (event !== void 0) ? event : null;
        };
        $mol_app_bench_list_mol_rower.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (event) { return _this.eventToggle(event); },
            });
        };
        $mol_app_bench_list_mol_rower.prototype.title = function () {
            return "";
        };
        $mol_app_bench_list_mol_rower.prototype.titler = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_bench_list_mol_rower.prototype.content = function () {
            return "";
        };
        $mol_app_bench_list_mol_rower.prototype.contenter = function () {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_app_bench_list_mol_rower.prototype.childs = function () {
            return [].concat(this.titler(), this.contenter());
        };
        return $mol_app_bench_list_mol_rower;
    }($.$mol_viewer));
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_rower.prototype, "selected", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_rower.prototype, "eventToggle", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_rower.prototype, "titler", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_bench_list_mol_rower.prototype, "contenter", null);
    $.$mol_app_bench_list_mol_rower = $mol_app_bench_list_mol_rower;
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
            $mol_app_bench_list_mol.prototype.rowers = function () {
                var _this = this;
                return this.items().map(function (row, id) { return _this.rower(id); });
            };
            $mol_app_bench_list_mol.prototype.rowerTitle = function (id) {
                return this.items()[id].title;
            };
            $mol_app_bench_list_mol.prototype.rowerContent = function (id) {
                return this.items()[id].content;
            };
            $mol_app_bench_list_mol.prototype.rowerSelected = function (id, next) {
                if (next !== void 0)
                    this.selectedId(next ? id : null);
                return this.selectedId() === id;
            };
            $mol_app_bench_list_mol.prototype.selectedId = function (next) {
                this.items();
                if (next === void 0)
                    return null;
                return next;
            };
            return $mol_app_bench_list_mol;
        }($.$mol_app_bench_list_mol));
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol.prototype, "rowers", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench_list_mol.prototype, "rowerTitle", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench_list_mol.prototype, "rowerContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol.prototype, "selectedId", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_list_mol, "data", null);
        $mol.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
        var $mol_app_bench_list_mol_rower = (function (_super) {
            __extends($mol_app_bench_list_mol_rower, _super);
            function $mol_app_bench_list_mol_rower() {
                return _super.apply(this, arguments) || this;
            }
            $mol_app_bench_list_mol_rower.prototype.eventToggle = function (next) {
                this.selected(!this.selected());
            };
            return $mol_app_bench_list_mol_rower;
        }($.$mol_app_bench_list_mol_rower));
        $mol.$mol_app_bench_list_mol_rower = $mol_app_bench_list_mol_rower;
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
//# sourceMappingURL=web.js.map