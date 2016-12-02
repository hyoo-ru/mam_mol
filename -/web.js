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
    var $mol_log;
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
        $mol_object.objectPath = function () {
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
            while (typeof current === 'object') {
                if (!current.constructor.objectPath)
                    break;
                var name = current.constructor.objectPath();
                if (!name)
                    continue;
                names.push(name);
                if (current === null)
                    break;
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
        $mol_object.prototype.objectPath = function (next) {
            var path = '';
            var owner = this.objectOwner();
            if (owner)
                path = owner.objectPath();
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
            $.$mol_log(this.objectPath(), values);
        };
        $mol_object.toString = function () {
            return this.objectPath();
        };
        $mol_object.prototype.toString = function () {
            return this.objectPath();
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
            _super.call(this);
            this.run = run;
            $mol_defer.add(this);
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
        $mol_defer.all = [];
        $mol_defer.timer = 0;
        $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
            ? function (handler) { return requestAnimationFrame(handler); }
            : function (handler) { return setTimeout(handler, 16); };
        return $mol_defer;
    }($.$mol_object));
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
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom_status = $.$mol_atom_status;
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(handler, host, field) {
            if (field === void 0) { field = 'value()'; }
            _super.call(this);
            this.handler = handler;
            this.host = host;
            this.field = field;
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.autoFresh = true;
            this['value()'] = void 0;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host || this;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
                        value.destroyed(true);
                    }
                }
                if (this.host) {
                    host[this.field] = void 0;
                    host['$mol_atom_state'][this.field] = void 0;
                }
                this['destroyed()'] = true;
                this.log(['.destroyed()', true, 'atom']);
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
        $mol_atom.prototype.objectPath = function () {
            return this.host ? this.host.objectPath() + '.' + this.field : this.field;
        };
        $mol_atom.prototype.get = function () {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this.objectPath());
            }
            this.actualize();
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = (this.host || this)[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function () {
            var _this = this;
            if (this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull();
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function () {
            var host = this.host || this;
            try {
                return this.handler(this._next);
            }
            catch (error) {
                if (!error['$mol_atom_catched']) {
                    if (error instanceof $mol_atom_wait) {
                    }
                    else {
                        if (error instanceof Error) {
                            console.error(error.stack);
                        }
                        else {
                            throw error;
                        }
                    }
                    void (error['$mol_atom_catched'] = true);
                }
                return error;
            }
        };
        $mol_atom.prototype.set = function (next, prev) {
            this._next = next;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host || this;
            var prev = host[this.field];
            if (next === void 0)
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
            this._next = void 0;
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
            return void 0;
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
        $mol_atom.prototype.value = function (next, prev) {
            if (next !== void 0)
                return this.set(next, prev);
            if (prev !== void 0)
                return this.push(prev);
            return this.get();
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
        $mol_atom.stack = [null];
        $mol_atom.updating = [];
        $mol_atom.reaping = new $.$mol_set();
        $mol_atom.scheduled = false;
        return $mol_atom;
    }($.$mol_object));
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            _super.call(this, message);
            this.message = message;
            this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    function $mol_atom_task(handler) {
        var atom = new $mol_atom(function () {
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
            descr.value = function (next, prev) {
                var host = this;
                var field = name + "()";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value.bind(host), host, field);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                return info.value(next, prev);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, prev) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var atoms = host['$mol_atom_state'];
                if (!atoms)
                    atoms = host['$mol_atom_state'] = {};
                var info = atoms[field];
                if (!info) {
                    atoms[field] = info = new $.$mol_atom(value.bind(host, key), host, field);
                    if (config)
                        info.autoFresh = !config.lazy;
                }
                return info.value(next, prev);
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
            _super.apply(this, arguments);
        }
        $mol_window.size = function (next) {
            return next || {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        };
        __decorate([
            $.$mol_mem()
        ], $mol_window, "size", null);
        return $mol_window;
    }($.$mol_object));
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
            _super.apply(this, arguments);
        }
        $mol_state_local.value = function (key, next, prev) {
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
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_local, "value", null);
        return $mol_state_local;
    }($.$mol_object));
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
window.addEventListener('storage', function (event) { return $.$mol_state_local.value(event.key, void 0, JSON.parse(localStorage.getItem(event.key) || 'null')); });
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
            _super.apply(this, arguments);
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
                    _this.response(void 0, next.responseText);
                }
                else {
                    _this.response(void 0, new Error(next.responseText));
                }
            };
            next.onerror = function (event) {
                _this.response(void 0, event.error || new Error('Unknown HTTP error'));
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
        $mol_http_request.prototype.response = function (next, prev) {
            var creds = this.credentials();
            var native = this.native();
            var method = (next === void 0) ? 'Get' : this.method();
            native.open(method, this.uri(), true, creds && creds.login, creds && creds.password);
            native.send(next);
            throw new $.$mol_atom_wait(this.method() + " " + this.uri());
        };
        $mol_http_request.prototype.text = function (next) {
            return this.response(next);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_http_request.prototype, "response", null);
        return $mol_http_request;
    }($.$mol_object));
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
            _super.apply(this, arguments);
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
        $mol_http_resource.prototype.request = function (fresh) {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return 'Put'; };
            request.uri = function () { return _this.uri(); };
            request.credentials = function () { return _this.credentials(); };
            return request;
        };
        $mol_http_resource.prototype.text = function (next, prev) {
            return this.request().text(next);
        };
        $mol_http_resource.prototype.refresh = function () {
            this.request(!!'fresh');
        };
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "request", null);
        __decorate([
            $.$mol_mem()
        ], $mol_http_resource.prototype, "text", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_http_resource, "item", null);
        return $mol_http_resource;
    }($.$mol_object));
    $.$mol_http_resource = $mol_http_resource;
    var $mol_http_resource_json = (function (_super) {
        __extends($mol_http_resource_json, _super);
        function $mol_http_resource_json() {
            _super.apply(this, arguments);
        }
        $mol_http_resource_json.item = function (uri) {
            return new $mol_http_resource_json().setup(function (obj) {
                obj.uri = function () { return uri; };
            });
        };
        $mol_http_resource_json.prototype.json = function (next, prev) {
            return JSON.parse(this.text(next && JSON.stringify(next, null, '\t')));
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_http_resource_json, "item", null);
        return $mol_http_resource_json;
    }($mol_http_resource));
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
            _super.apply(this, arguments);
        }
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || 'en';
        };
        $mol_locale.texts = function () {
            var uri = "-/web.locale=" + this.lang() + ".json";
            var resource = $.$mol_http_resource_json.item(uri);
            return resource.json();
        };
        $mol_locale.text = function (context, key) {
            return this.texts()[(context + "_" + key)];
        };
        __decorate([
            $.$mol_mem()
        ], $mol_locale, "lang", null);
        return $mol_locale;
    }($.$mol_object));
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
    $.$mol_viewer_context = {};
    $.$mol_viewer_context.$mol_viewer_heightLimit = function () { return $.$mol_window.size().height; };
    var $mol_viewer = (function (_super) {
        __extends($mol_viewer, _super);
        function $mol_viewer() {
            _super.apply(this, arguments);
        }
        $mol_viewer.root = function (id) {
            return new this;
        };
        $mol_viewer.prototype.title = function () {
            return this.Class().objectPath();
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
        $mol_viewer.prototype.DOMNode = function (next) {
            var path = this.objectPath();
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
            var _loop_1 = function(name_1) {
                var handle = events[name_1];
                next2.addEventListener(name_1, function (event) {
                    $.$mol_atom_task(function () {
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
                if (view instanceof $mol_viewer)
                    view.DOMTree();
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
            var _loop_2 = function(path) {
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
        $mol_viewer.prototype.DOMTree = function (next) {
            var node = this.DOMNode();
            try {
                $mol_viewer.renderChilds(node, this.childsVisible());
                $mol_viewer.renderAttrs(node, this.attr());
                $mol_viewer.renderFields(node, this.field());
                return node;
            }
            catch (error) {
                node.setAttribute('mol_viewer_error', error.name);
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
        $mol_viewer.prototype.focused = function () {
            return $.$mol_viewer_selection.focused().indexOf(this.DOMNode()) !== -1;
        };
        $mol_viewer.prototype.localizedText = function (postfix) {
            var contexts = Object.getPrototypeOf(this).objectClassNames();
            for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
                var context = contexts_1[_i];
                var text = $.$mol_locale.text(context, postfix);
                if (text != null)
                    return text;
            }
            throw new Error("Locale text not found: [" + contexts.join('|') + "]_" + postfix);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_viewer.prototype, "context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_viewer.prototype, "DOMTree", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_viewer, "root", null);
        return $mol_viewer;
    }($.$mol_object));
    $.$mol_viewer = $mol_viewer;
})($ || ($ = {}));
//viewer.js.map
;
var $;
(function ($) {
    document.addEventListener(window.cordova ? 'deviceready' : 'DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_viewer_root]');
        var _loop_1 = function(i) {
            var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
            view.DOMNode(nodes.item(i));
            var win = new $.$mol_atom(function () {
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
    var $mol_viewer_selection = (function (_super) {
        __extends($mol_viewer_selection, _super);
        function $mol_viewer_selection() {
            _super.apply(this, arguments);
        }
        $mol_viewer_selection.focused = function (next) {
            return next || [];
        };
        $mol_viewer_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
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
        $mol_viewer_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_viewer_selection.focused(parents);
        };
        $mol_viewer_selection.onBlur = function (event) {
            $mol_viewer_selection.focused([]);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_viewer_selection, "focused", null);
        __decorate([
            $.$mol_mem()
        ], $mol_viewer_selection, "position", null);
        return $mol_viewer_selection;
    }($.$mol_object));
    $.$mol_viewer_selection = $mol_viewer_selection;
})($ || ($ = {}));
//selection.js.map
;
var $;
(function ($) {
    document.addEventListener('selectionchange', function (event) {
        $.$mol_viewer_selection.position(void 0);
    });
    document.addEventListener('focusin', $.$mol_viewer_selection.onFocus);
    document.addEventListener('focus', $.$mol_viewer_selection.onFocus, true);
    document.addEventListener('focusout', $.$mol_viewer_selection.onBlur);
    document.addEventListener('blur', $.$mol_viewer_selection.onBlur, true);
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
    var $mol_stacker = (function (_super) {
        __extends($mol_stacker, _super);
        function $mol_stacker() {
            _super.apply(this, arguments);
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
        $mol_stacker.prototype.mainer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.main(); };
            });
        };
        $mol_stacker.prototype.addon = function () {
            return [];
        };
        $mol_stacker.prototype.addoner = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.addon(); };
            });
        };
        $mol_stacker.prototype.childs = function () {
            return [].concat(this.mainer(), this.addoner());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stacker.prototype, "mainer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stacker.prototype, "addoner", null);
        return $mol_stacker;
    }($.$mol_viewer));
    $.$mol_stacker = $mol_stacker;
})($ || ($ = {}));
//stacker.view.tree.js.map
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
            _super.call(this);
            this.prefix = prefix;
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
        $mol_state_arg.value = function (key, next, prev) {
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
        __decorate([
            $.$mol_mem()
        ], $mol_state_arg, "href", null);
        __decorate([
            $.$mol_mem()
        ], $mol_state_arg, "dict", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_arg, "value", null);
        return $mol_state_arg;
    }($.$mol_object));
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
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_stacker = (function (_super) {
            __extends($mol_stacker, _super);
            function $mol_stacker() {
                _super.apply(this, arguments);
            }
            $mol_stacker.prototype.side = function (next) {
                if (!this.main())
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
    var $mol_floater = (function (_super) {
        __extends($mol_floater, _super);
        function $mol_floater() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_scroller.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollTop = function (next, prev) {
            return (next !== void 0) ? next : 0;
        };
        $mol_scroller.prototype.scrollLeft = function (next, prev) {
            return (next !== void 0) ? next : 0;
        };
        $mol_scroller.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function (next, prev) { return _this.scrollTop(next, prev); },
                "scrollLeft": function (next, prev) { return _this.scrollLeft(next, prev); },
            });
        };
        $mol_scroller.prototype.eventScroll = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_scroller.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function (next, prev) { return _this.eventScroll(next, prev); },
                "overflow": function (next, prev) { return _this.eventScroll(next, prev); },
                "underflow": function (next, prev) { return _this.eventScroll(next, prev); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollTop", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "scrollLeft", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroller.prototype, "eventScroll", null);
        return $mol_scroller;
    }($.$mol_viewer));
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
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            _super.apply(this, arguments);
        }
        $mol_state_session.value = function (key, next, prev) {
            if (next === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next, prev) {
            return $.$mol_state_local.value(this.prefix() + '.' + key, next, prev);
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_session, "value", null);
        return $mol_state_session;
    }($.$mol_object));
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
    $.$mol_viewer_context.$mol_scroller_scrollTop = function () { return 0; };
    $.$mol_viewer_context.$mol_scroller_moving = function () { return false; };
})($ || ($ = {}));
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                _super.apply(this, arguments);
            }
            $mol_scroller.prototype.scrollTop = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.scrollTop()', next) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.scrollLeft()', next) || 0;
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
                var subContext = Object.create(this.context());
                subContext.$mol_viewer_heightLimit = function () { return _this.context().$mol_viewer_heightLimit() + _this.scrollTop(); };
                subContext.$mol_scroller_scrollTop = function () { return _this.scrollTop(); };
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
            return $mol_scroller;
        }($.$mol_scroller));
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
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_floater = (function (_super) {
            __extends($mol_floater, _super);
            function $mol_floater() {
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_clicker.prototype.tagName = function () {
            return "button";
        };
        $mol_clicker.prototype.enabled = function () {
            return true;
        };
        $mol_clicker.prototype.eventClick = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_clicker.prototype.eventActivate = function (next, prev) {
            return this.eventClick(next, prev);
        };
        $mol_clicker.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventActivate(next, prev); },
            });
        };
        $mol_clicker.prototype.disabled = function () {
            return false;
        };
        $mol_clicker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
                "tabindex": function () { return "0"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_clicker.prototype, "eventClick", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker.prototype, "eventActivate", null);
        return $mol_clicker;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_clicker.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_clicker.prototype.eventActivate = function (next) {
                if (!this.enabled())
                    return;
                this.eventClick(next);
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
            _super.apply(this, arguments);
        }
        return $mol_clicker_button;
    }($.$mol_clicker));
    $.$mol_clicker_button = $mol_clicker_button;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_major;
    }($.$mol_clicker_button));
    $.$mol_clicker_major = $mol_clicker_major;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_minor = (function (_super) {
        __extends($mol_clicker_minor, _super);
        function $mol_clicker_minor() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_minor;
    }($.$mol_clicker_button));
    $.$mol_clicker_minor = $mol_clicker_minor;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_clicker_danger = (function (_super) {
        __extends($mol_clicker_danger, _super);
        function $mol_clicker_danger() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_checker.prototype.checked = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_checker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_checker_checked": function (next, prev) { return _this.checked(next, prev); },
            });
        };
        $mol_checker.prototype.icon = function () {
            return null;
        };
        $mol_checker.prototype.label = function () {
            return [];
        };
        $mol_checker.prototype.labeler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_checker.prototype.childs = function () {
            return [].concat(this.icon(), this.labeler());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker.prototype, "checked", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker.prototype, "labeler", null);
        return $mol_checker;
    }($.$mol_clicker));
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
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
        $mol_icon.prototype.pather = function (next, prev) {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.childs = function () {
            return [].concat(this.pather());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_icon.prototype, "pather", null);
        return $mol_icon;
    }($.$mol_svg));
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_checker_expander.prototype.icon = function (next, prev) {
            return new $.$mol_icon_chevron();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander.prototype, "icon", null);
        return $mol_checker_expander;
    }($.$mol_checker));
    $.$mol_checker_expander = $mol_checker_expander;
})($ || ($ = {}));
//expander.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_grider.prototype.tagName = function () {
            return "table";
        };
        $mol_grider.prototype.rows = function () {
            return [];
        };
        $mol_grider.prototype.cols = function () {
            return [];
        };
        $mol_grider.prototype.records = function () {
            return [];
        };
        $mol_grider.prototype.record = function (key) {
            return null;
        };
        $mol_grider.prototype.hierarhyColumn = function () {
            return "";
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
        $mol_grider.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.headerCellers(); };
            });
        };
        $mol_grider.prototype.gapTop = function () {
            return 0;
        };
        $mol_grider.prototype.gaperTop = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapTop(); };
            });
        };
        $mol_grider.prototype.gapBottom = function () {
            return 0;
        };
        $mol_grider.prototype.gaperBottom = function (next, prev) {
            var _this = this;
            return new $.$mol_grider_gaper().setup(function (obj) {
                obj.height = function () { return _this.gapBottom(); };
            });
        };
        $mol_grider.prototype.cellers = function (key) {
            return [];
        };
        $mol_grider.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.height = function () { return _this.rowHeight(); };
                obj.cellers = function () { return _this.cellers(key); };
            });
        };
        $mol_grider.prototype.celler = function (key) {
            return null;
        };
        $mol_grider.prototype.cellerContent = function (key) {
            return [];
        };
        $mol_grider.prototype.cellerText = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_celler().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellerContent(key)); };
            });
        };
        $mol_grider.prototype.cellerNumber = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_number().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellerContent(key)); };
            });
        };
        $mol_grider.prototype.columnHeaderContent = function (key) {
            return [];
        };
        $mol_grider.prototype.columnHeader = function (key, next, prev) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.columnHeaderContent(key)); };
            });
        };
        $mol_grider.prototype.rowLevel = function (key) {
            return 0;
        };
        $mol_grider.prototype.rowExpanded = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_grider.prototype.cellerBranch = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_branch().setup(function (obj) {
                obj.level = function () { return _this.rowLevel(key); };
                obj.content = function () { return _this.cellerContent(key); };
                obj.expanded = function (next, prev) { return _this.rowExpanded(key, next, prev); };
            });
        };
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
        ], $mol_grider.prototype, "rowExpanded", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_grider.prototype, "cellerBranch", null);
        return $mol_grider;
    }($.$mol_viewer));
    $.$mol_grider = $mol_grider;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_gaper = (function (_super) {
        __extends($mol_grider_gaper, _super);
        function $mol_grider_gaper() {
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_grider_rower = (function (_super) {
        __extends($mol_grider_rower, _super);
        function $mol_grider_rower() {
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_grider_celler = (function (_super) {
        __extends($mol_grider_celler, _super);
        function $mol_grider_celler() {
            _super.apply(this, arguments);
        }
        $mol_grider_celler.prototype.tagName = function () {
            return "td";
        };
        return $mol_grider_celler;
    }($.$mol_viewer));
    $.$mol_grider_celler = $mol_grider_celler;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_number = (function (_super) {
        __extends($mol_grider_number, _super);
        function $mol_grider_number() {
            _super.apply(this, arguments);
        }
        return $mol_grider_number;
    }($.$mol_grider_celler));
    $.$mol_grider_number = $mol_grider_number;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_grider_branch = (function (_super) {
        __extends($mol_grider_branch, _super);
        function $mol_grider_branch() {
            _super.apply(this, arguments);
        }
        $mol_grider_branch.prototype.tagName = function () {
            return "div";
        };
        $mol_grider_branch.prototype.level = function () {
            return 0;
        };
        $mol_grider_branch.prototype.levelStyle = function () {
            return "0px";
        };
        $mol_grider_branch.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.paddingLeft": function () { return _this.levelStyle(); },
            });
        };
        $mol_grider_branch.prototype.expanded = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_grider_branch.prototype.checked = function (next, prev) {
            return this.expanded(next, prev);
        };
        $mol_grider_branch.prototype.expandable = function () {
            return false;
        };
        $mol_grider_branch.prototype.enabled = function () {
            return this.expandable();
        };
        $mol_grider_branch.prototype.content = function () {
            return [];
        };
        $mol_grider_branch.prototype.label = function () {
            return this.content();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_grider_branch.prototype, "expanded", null);
        return $mol_grider_branch;
    }($.$mol_checker_expander));
    $.$mol_grider_branch = $mol_grider_branch;
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
                _super.apply(this, arguments);
            }
            $mol_grider.prototype.childs = function () {
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
                var context = this.context();
                var scrollTop = context.$mol_scroller_scrollTop();
                var heightLimit = context.$mol_viewer_heightLimit();
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
                if (col === this.hierarhyColumn())
                    return 'branch';
                var val = this.record(this.row(0))[col];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            };
            $mol_grider.prototype.celler = function (id) {
                switch (this.colType(id.col)) {
                    case 'branch': return this.cellerBranch(id);
                    case 'number': return this.cellerNumber(id);
                }
                return this.cellerText(id);
            };
            $mol_grider.prototype.cellerContent = function (id) {
                return [this.record(id.row)[id.col]];
            };
            $mol_grider.prototype.records = function () {
                return [];
            };
            $mol_grider.prototype.record = function (row) {
                return this.records()[row];
            };
            $mol_grider.prototype.rows = function () {
                return Object.keys(this.records());
            };
            $mol_grider.prototype.row = function (row) {
                return this.rows().slice(0, 1).valueOf()[0];
            };
            $mol_grider.prototype.cols = function () {
                var rowFirst = this.row(0);
                if (rowFirst === void 0)
                    return null;
                return Object.keys(this.record(rowFirst));
            };
            __decorate([
                $.$mol_mem()
            ], $mol_grider.prototype, "childs", null);
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
            ], $mol_grider.prototype, "rows", null);
            return $mol_grider;
        }($.$mol_grider));
        $mol.$mol_grider = $mol_grider;
        var $mol_grider_gaper = (function (_super) {
            __extends($mol_grider_gaper, _super);
            function $mol_grider_gaper() {
                _super.apply(this, arguments);
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
                _super.apply(this, arguments);
            }
            $mol_grider_rower.prototype.heightStyle = function () {
                return this.height() + "px";
            };
            return $mol_grider_rower;
        }($.$mol_grider_rower));
        $mol.$mol_grider_rower = $mol_grider_rower;
        var $mol_grider_branch = (function (_super) {
            __extends($mol_grider_branch, _super);
            function $mol_grider_branch() {
                _super.apply(this, arguments);
            }
            $mol_grider_branch.prototype.levelStyle = function () {
                return (this.level() * .75 - 1.5) + "rem";
            };
            $mol_grider_branch.prototype.expandable = function () {
                return this.expanded() !== null;
            };
            return $mol_grider_branch;
        }($.$mol_grider_branch));
        $mol.$mol_grider_branch = $mol_grider_branch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//grider.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_pager.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return [];
        };
        $mol_pager.prototype.bodier = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.body(); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return [];
        };
        $mol_pager.prototype.footer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.foot(); };
            });
        };
        $mol_pager.prototype.childs = function () {
            return [].concat(this.header(), this.bodier(), this.footer());
        };
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
        return $mol_pager;
    }($.$mol_viewer));
    $.$mol_pager = $mol_pager;
})($ || ($ = {}));
//pager.view.tree.js.map
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
            _super.apply(this, arguments);
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
        $mol_lister.prototype.rows = function () {
            return [];
        };
        $mol_lister.prototype.childs = function () {
            return this.rows();
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
                _super.apply(this, arguments);
            }
            $mol_lister.prototype.rowOffsets = function () {
                var childs = this.childs();
                if (!childs)
                    return null;
                var heightLimit = this.contextSub().$mol_viewer_heightLimit();
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
            $mol_lister.prototype.rowContext = function (index) {
                var _this = this;
                var context = this.contextSub();
                var next = Object.create(context);
                next.$mol_viewer_heightLimit = function () { return context.$mol_viewer_heightLimit() - _this.rowOffsets()[index]; };
                return next;
            };
            $mol_lister.prototype.childsVisible = function () {
                var childs = this.childs();
                if (!childs)
                    return childs;
                var limit = this.rowOffsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = childs[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_viewer) {
                        child.context(this.rowContext(i));
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
            __decorate([
                $.$mol_mem()
            ], $mol_lister.prototype, "rowOffsets", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_lister.prototype, "rowContext", null);
            __decorate([
                $.$mol_mem()
            ], $mol_lister.prototype, "childsVisible", null);
            return $mol_lister;
        }($.$mol_lister));
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
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_checker_ticker.prototype.icon = function (next, prev) {
            return new $.$mol_icon_tick();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker.prototype, "icon", null);
        return $mol_checker_ticker;
    }($.$mol_checker));
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
    var $mol_portioner_indicator = (function (_super) {
        __extends($mol_portioner_indicator, _super);
        function $mol_portioner_indicator() {
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_portioner = (function (_super) {
        __extends($mol_portioner, _super);
        function $mol_portioner() {
            _super.apply(this, arguments);
        }
        $mol_portioner.prototype.portion = function () {
            return 0;
        };
        $mol_portioner.prototype.indWidthStyle = function () {
            return "0";
        };
        $mol_portioner.prototype.indicator = function (next, prev) {
            var _this = this;
            return new $.$mol_portioner_indicator().setup(function (obj) {
                obj.widthStyle = function () { return _this.indWidthStyle(); };
            });
        };
        $mol_portioner.prototype.childs = function () {
            return [].concat(this.indicator());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_portioner.prototype, "indicator", null);
        return $mol_portioner;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_bench.prototype.tester = function (next, prev) {
            return new $.$mol_app_bench_tester();
        };
        $mol_app_bench.prototype.resultsSorted = function () {
            return null;
        };
        $mol_app_bench.prototype.griderCeller = function (key) {
            return null;
        };
        $mol_app_bench.prototype.eventResulterSortToggle = function (key, next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_bench.prototype.resulterHeaderTitle = function (key) {
            return "";
        };
        $mol_app_bench.prototype.resulterHeader = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_bench_resulter_header().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventResulterSortToggle(key, next, prev); };
                obj.title = function () { return _this.resulterHeaderTitle(key); };
            });
        };
        $mol_app_bench.prototype.resulter = function (next, prev) {
            var _this = this;
            return new $.$mol_grider().setup(function (obj) {
                obj.records = function () { return _this.resultsSorted(); };
                obj.celler = function (key) { return _this.griderCeller(key); };
                obj.columnHeader = function (key) { return _this.resulterHeader(key); };
            });
        };
        $mol_app_bench.prototype.mainPage = function (next, prev) {
            var _this = this;
            return new $.$mol_app_bench_mainer().setup(function (obj) {
                obj.title = function () { return _this.title(); };
                obj.tester = function () { return _this.tester(); };
                obj.body = function () { return [].concat(_this.resulter()); };
            });
        };
        $mol_app_bench.prototype.main = function () {
            return [].concat(this.mainPage());
        };
        $mol_app_bench.prototype.addonerTitle = function () {
            return this.localizedText("addonerTitle");
        };
        $mol_app_bench.prototype.menuOptions = function () {
            return [];
        };
        $mol_app_bench.prototype.menu = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.menuOptions(); };
            });
        };
        $mol_app_bench.prototype.addonPage = function (next, prev) {
            var _this = this;
            return new $.$mol_pager().setup(function (obj) {
                obj.title = function () { return _this.addonerTitle(); };
                obj.body = function () { return [].concat(_this.menu()); };
            });
        };
        $mol_app_bench.prototype.addon = function () {
            return [].concat(this.addonPage());
        };
        $mol_app_bench.prototype.menuOptionerChecked = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_bench.prototype.menuOptionerTitle = function (key) {
            return "";
        };
        $mol_app_bench.prototype.menuOptioner = function (key, next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.heightMinimal = function () { return 36; };
                obj.checked = function (next, prev) { return _this.menuOptionerChecked(key, next, prev); };
                obj.label = function () { return [].concat(_this.menuOptionerTitle(key)); };
            });
        };
        $mol_app_bench.prototype.resultValue = function (key) {
            return 0;
        };
        $mol_app_bench.prototype.resultPortion = function (key) {
            return 0;
        };
        $mol_app_bench.prototype.resultPortioner = function (key, next, prev) {
            var _this = this;
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return _this.resultPortion(key); };
            });
        };
        $mol_app_bench.prototype.resulterCellerNumber = function (key, next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.tagName = function () { return "td"; };
                obj.childs = function () { return [].concat(_this.resultValue(key), _this.resultPortioner(key)); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "tester", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "eventResulterSortToggle", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "resulterHeader", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench.prototype, "resulter", null);
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
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "resultPortioner", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_bench.prototype, "resulterCellerNumber", null);
        return $mol_app_bench;
    }($.$mol_stacker));
    $.$mol_app_bench = $mol_app_bench;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_bench_mainer = (function (_super) {
        __extends($mol_app_bench_mainer, _super);
        function $mol_app_bench_mainer() {
            _super.apply(this, arguments);
        }
        $mol_app_bench_mainer.prototype.tester = function () {
            return null;
        };
        $mol_app_bench_mainer.prototype.childs = function () {
            return [].concat(this.header(), this.tester(), this.bodier());
        };
        return $mol_app_bench_mainer;
    }($.$mol_pager));
    $.$mol_app_bench_mainer = $mol_app_bench_mainer;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_bench_tester = (function (_super) {
        __extends($mol_app_bench_tester, _super);
        function $mol_app_bench_tester() {
            _super.apply(this, arguments);
        }
        $mol_app_bench_tester.prototype.tagName = function () {
            return "iframe";
        };
        return $mol_app_bench_tester;
    }($.$mol_viewer));
    $.$mol_app_bench_tester = $mol_app_bench_tester;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_bench_resulter_header = (function (_super) {
        __extends($mol_app_bench_resulter_header, _super);
        function $mol_app_bench_resulter_header() {
            _super.apply(this, arguments);
        }
        $mol_app_bench_resulter_header.prototype.eventClick = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_bench_resulter_header.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventClick(next, prev); },
            });
        };
        $mol_app_bench_resulter_header.prototype.title = function () {
            return "";
        };
        $mol_app_bench_resulter_header.prototype.childs = function () {
            return [].concat(this.title());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_bench_resulter_header.prototype, "eventClick", null);
        return $mol_app_bench_resulter_header;
    }($.$mol_floater));
    $.$mol_app_bench_resulter_header = $mol_app_bench_resulter_header;
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
                _super.apply(this, arguments);
            }
            $mol_app_bench.prototype.bench = function (next, prev) {
                return $.$mol_state_arg.value(this.stateKey('bench'), next, prev) || 'list';
            };
            $mol_app_bench.prototype.sandbox = function (next, prev) {
                var _this = this;
                var next2 = this.tester().DOMNode();
                next2.src = this.bench();
                next2.onload = function (event) {
                    next2.onload = null;
                    _this.sandbox(void 0, next2);
                };
                throw new $.$mol_atom_wait("Loading sandbox...");
            };
            $mol_app_bench.prototype.commandCurrent = function (next, prev) {
                if (this['commandCurrent()'])
                    return;
                return next;
            };
            $mol_app_bench.prototype.commandResult = function (command, next, prev) {
                var _this = this;
                var sandbox = this.sandbox();
                if (next !== void 0)
                    return next;
                var current = this.commandCurrent(command);
                if (current !== command)
                    throw new $.$mol_atom_wait("Waiting for " + JSON.stringify(current) + "...");
                sandbox.contentWindow.postMessage(command, '*');
                window.onmessage = function (event) {
                    if (event.data[0] !== 'done')
                        return;
                    window.onmessage = null;
                    _this.commandCurrent(void 0, null);
                    _this.commandResult(command, event.data[1]);
                };
                throw new $.$mol_atom_wait("Running " + command + "...");
            };
            $mol_app_bench.prototype.samplesAll = function (next, prev) {
                return this.commandResult(['samples']).slice().sort();
            };
            $mol_app_bench.prototype.samples = function (next, prev) {
                var arg = $.$mol_state_arg.value(this.stateKey('sample'), next && next.join('~'));
                return arg ? arg.split('~').sort() : [];
            };
            $mol_app_bench.prototype.steps = function (next, prev) {
                return this.commandResult(['steps']);
            };
            $mol_app_bench.prototype.resultsSample = function (sampleId) {
                var _this = this;
                var results = {
                    sample: sampleId,
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
            $mol_app_bench.prototype.resultsSortCol = function (next) {
                return $.$mol_state_arg.value(this.stateKey('sort'), next);
            };
            $mol_app_bench.prototype.resultsSorted = function () {
                var _this = this;
                var prev = this.results();
                var col = this.resultsSortCol();
                if (!col)
                    return prev;
                var next = {};
                var keys = Object.keys(prev);
                keys.sort(function (a, b) { return _this.resultNumber({ row: a, col: col }) - _this.resultNumber({ row: b, col: col }); });
                keys.forEach(function (row) { return next[row] = prev[row]; });
                return next;
            };
            $mol_app_bench.prototype.menuOptions = function () {
                var _this = this;
                return this.samplesAll().map(function (sample) { return _this.menuOptioner(sample); });
            };
            $mol_app_bench.prototype.menuOptionerTitle = function (sample) {
                return sample;
            };
            $mol_app_bench.prototype.menuOptionerChecked = function (sample, next, prev) {
                if (next === void 0)
                    return this.samples().indexOf(sample) !== -1;
                if (next)
                    this.samples(this.samples().concat(sample));
                else
                    this.samples(this.samples().filter(function (s) { return s !== sample; }));
                return next;
            };
            $mol_app_bench.prototype.griderCeller = function (id) {
                if (id.col === 'sample')
                    return this.resulter().cellerText(id);
                return this.resulterCellerNumber(id);
            };
            $mol_app_bench.prototype.resultValue = function (id) {
                return this.results()[id.row][id.col];
            };
            $mol_app_bench.prototype.resultNumber = function (id) {
                return parseInt(this.resultValue(id), 10);
            };
            $mol_app_bench.prototype.resultMaxValue = function (col) {
                var max = 0;
                var results = this.results();
                for (var sample in results) {
                    var numb = this.resultNumber({ row: sample, col: col });
                    if (numb > max)
                        max = numb;
                }
                return max;
            };
            $mol_app_bench.prototype.resultPortion = function (id) {
                return this.resultNumber(id) / this.resultMaxValue(id.col);
            };
            $mol_app_bench.prototype.resulterHeaderTitle = function (col) {
                return col;
            };
            $mol_app_bench.prototype.eventResulterSortToggle = function (col, next) {
                this.resultsSortCol(col);
            };
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
            ], $mol_app_bench.prototype, "samples", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_bench.prototype, "steps", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_bench.prototype, "resultsSample", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_bench.prototype, "results", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_bench.prototype, "resultsSortCol", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_bench.prototype, "resultsSorted", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_bench.prototype, "menuOptionerChecked", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_bench.prototype, "resultMaxValue", null);
            return $mol_app_bench;
        }($.$mol_app_bench));
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
            _super.apply(this, arguments);
        }
        $mol_app_bench_list_mol.prototype.sample = function () {
            return "";
        };
        $mol_app_bench_list_mol.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.sample()); };
            });
        };
        $mol_app_bench_list_mol.prototype.rowers = function () {
            return [];
        };
        $mol_app_bench_list_mol.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.header(), _this.rowers()); };
            });
        };
        $mol_app_bench_list_mol.prototype.childs = function () {
            return [].concat(this.lister());
        };
        $mol_app_bench_list_mol.prototype.rowerSelected = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_bench_list_mol.prototype.rowerTitle = function (key) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.rowerContent = function (key) {
            return "";
        };
        $mol_app_bench_list_mol.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_bench_list_mol_rower().setup(function (obj) {
                obj.selected = function (next, prev) { return _this.rowerSelected(key, next, prev); };
                obj.title = function () { return _this.rowerTitle(key); };
                obj.content = function () { return _this.rowerContent(key); };
            });
        };
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
        return $mol_app_bench_list_mol;
    }($.$mol_scroller));
    $.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_bench_list_mol_rower = (function (_super) {
        __extends($mol_app_bench_list_mol_rower, _super);
        function $mol_app_bench_list_mol_rower() {
            _super.apply(this, arguments);
        }
        $mol_app_bench_list_mol_rower.prototype.selected = function (next, prev) {
            return (next !== void 0) ? next : false;
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
        $mol_app_bench_list_mol_rower.prototype.eventToggle = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_bench_list_mol_rower.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventToggle(next, prev); },
            });
        };
        $mol_app_bench_list_mol_rower.prototype.title = function () {
            return "";
        };
        $mol_app_bench_list_mol_rower.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_bench_list_mol_rower.prototype.content = function () {
            return "";
        };
        $mol_app_bench_list_mol_rower.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_app_bench_list_mol_rower.prototype.childs = function () {
            return [].concat(this.titler(), this.contenter());
        };
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
        return $mol_app_bench_list_mol_rower;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_app_bench_list_mol.data = function (next, prev) {
                var _this = this;
                window.addEventListener('message', function (event) {
                    if (event.data[0] !== 'set data')
                        return;
                    _this.data(void 0, event.data[1]);
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
            return $mol_app_bench_list_mol;
        }($.$mol_app_bench_list_mol));
        $mol.$mol_app_bench_list_mol = $mol_app_bench_list_mol;
        var $mol_app_bench_list_mol_rower = (function (_super) {
            __extends($mol_app_bench_list_mol_rower, _super);
            function $mol_app_bench_list_mol_rower() {
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_texter.prototype.text = function () {
            return "";
        };
        $mol_texter.prototype.blockContent = function (key) {
            return [];
        };
        $mol_texter.prototype.blockType = function (key) {
            return "";
        };
        $mol_texter.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_texter_rower().setup(function (obj) {
                obj.childs = function () { return _this.blockContent(key); };
                obj.type = function () { return _this.blockType(key); };
            });
        };
        $mol_texter.prototype.spanner = function (key, next, prev) {
            return new $.$mol_texter_spanner();
        };
        $mol_texter.prototype.linker = function (key, next, prev) {
            return new $.$mol_texter_linker();
        };
        $mol_texter.prototype.imager = function (key, next, prev) {
            return new $.$mol_texter_imager();
        };
        $mol_texter.prototype.headerLevel = function (key) {
            return 0;
        };
        $mol_texter.prototype.headerContent = function (key) {
            return [];
        };
        $mol_texter.prototype.header = function (key, next, prev) {
            var _this = this;
            return new $.$mol_texter_header().setup(function (obj) {
                obj.level = function () { return _this.headerLevel(key); };
                obj.content = function () { return _this.headerContent(key); };
            });
        };
        $mol_texter.prototype.tablerHeaderCellers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerRowers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerGrider = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider().setup(function (obj) {
                obj.headerCellers = function () { return _this.tablerHeaderCellers(key); };
                obj.rowers = function () { return _this.tablerRowers(key); };
            });
        };
        $mol_texter.prototype.tabler = function (key, next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.tablerGrider(key)); };
            });
        };
        $mol_texter.prototype.tablerCellers = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerRower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_rower().setup(function (obj) {
                obj.cellers = function () { return _this.tablerCellers(key); };
            });
        };
        $mol_texter.prototype.tablerCellerContent = function (key) {
            return [];
        };
        $mol_texter.prototype.tablerCeller = function (key, next, prev) {
            var _this = this;
            return new $.$mol_grider_celler().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(key); };
            });
        };
        $mol_texter.prototype.tablerCellerHeader = function (key, next, prev) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return _this.tablerCellerContent(key); };
            });
        };
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
        ], $mol_texter.prototype, "tablerGrider", null);
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
        return $mol_texter;
    }($.$mol_lister));
    $.$mol_texter = $mol_texter;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_rower = (function (_super) {
        __extends($mol_texter_rower, _super);
        function $mol_texter_rower() {
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_texter_header = (function (_super) {
        __extends($mol_texter_header, _super);
        function $mol_texter_header() {
            _super.apply(this, arguments);
        }
        $mol_texter_header.prototype.tagName = function () {
            return "h";
        };
        $mol_texter_header.prototype.level = function (next, prev) {
            return (next !== void 0) ? next : 0;
        };
        $mol_texter_header.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_header_level": function (next, prev) { return _this.level(next, prev); },
            });
        };
        $mol_texter_header.prototype.content = function () {
            return [];
        };
        $mol_texter_header.prototype.childs = function () {
            return this.content();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_header.prototype, "level", null);
        return $mol_texter_header;
    }($.$mol_viewer));
    $.$mol_texter_header = $mol_texter_header;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_spanner = (function (_super) {
        __extends($mol_texter_spanner, _super);
        function $mol_texter_spanner() {
            _super.apply(this, arguments);
        }
        $mol_texter_spanner.prototype.tagName = function () {
            return "span";
        };
        $mol_texter_spanner.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_spanner.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
            });
        };
        $mol_texter_spanner.prototype.content = function (next, prev) {
            return (next !== void 0) ? next : [];
        };
        $mol_texter_spanner.prototype.childs = function (next, prev) {
            return this.content(next, prev);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_spanner.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_spanner.prototype, "content", null);
        return $mol_texter_spanner;
    }($.$mol_viewer));
    $.$mol_texter_spanner = $mol_texter_spanner;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_linker = (function (_super) {
        __extends($mol_texter_linker, _super);
        function $mol_texter_linker() {
            _super.apply(this, arguments);
        }
        $mol_texter_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_texter_linker.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_linker.prototype.link = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
                "href": function (next, prev) { return _this.link(next, prev); },
            });
        };
        $mol_texter_linker.prototype.content = function (next, prev) {
            return (next !== void 0) ? next : [];
        };
        $mol_texter_linker.prototype.childs = function (next, prev) {
            return this.content(next, prev);
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "link", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_linker.prototype, "content", null);
        return $mol_texter_linker;
    }($.$mol_viewer));
    $.$mol_texter_linker = $mol_texter_linker;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_texter_imager = (function (_super) {
        __extends($mol_texter_imager, _super);
        function $mol_texter_imager() {
            _super.apply(this, arguments);
        }
        $mol_texter_imager.prototype.tagName = function () {
            return "img";
        };
        $mol_texter_imager.prototype.type = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.link = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.title = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_texter_imager.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_texter_type": function (next, prev) { return _this.type(next, prev); },
                "src": function (next, prev) { return _this.link(next, prev); },
                "alt": function (next, prev) { return _this.title(next, prev); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "type", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "link", null);
        __decorate([
            $.$mol_mem()
        ], $mol_texter_imager.prototype, "title", null);
        return $mol_texter_imager;
    }($.$mol_viewer));
    $.$mol_texter_imager = $mol_texter_imager;
})($ || ($ = {}));
//texter.view.tree.js.map
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
    var $mol;
    (function ($mol) {
        var $mol_texter = (function (_super) {
            __extends($mol_texter, _super);
            function $mol_texter() {
                _super.apply(this, arguments);
            }
            $mol_texter.prototype.tokensFlow = function () {
                return $.$mol_syntax_md_flow.tokenize(this.text());
            };
            $mol_texter.prototype.rows = function () {
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
            __decorate([
                $.$mol_mem()
            ], $mol_texter.prototype, "tokensFlow", null);
            __decorate([
                $.$mol_mem()
            ], $mol_texter.prototype, "cellContents", null);
            return $mol_texter;
        }($.$mol_texter));
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
var $;
(function ($) {
    var $mol_linker = (function (_super) {
        __extends($mol_linker, _super);
        function $mol_linker() {
            _super.apply(this, arguments);
        }
        $mol_linker.prototype.heightMinimal = function () {
            return 36;
        };
        $mol_linker.prototype.tagName = function () {
            return "a";
        };
        $mol_linker.prototype.uri = function () {
            return "";
        };
        $mol_linker.prototype.current = function () {
            return false;
        };
        $mol_linker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "href": function () { return _this.uri(); },
                "mol_linker_current": function () { return _this.current(); },
            });
        };
        $mol_linker.prototype.arg = function () {
            return ({});
        };
        return $mol_linker;
    }($.$mol_viewer));
    $.$mol_linker = $mol_linker;
})($ || ($ = {}));
//linker.view.tree.js.map
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
        var $mol_linker = (function (_super) {
            __extends($mol_linker, _super);
            function $mol_linker() {
                _super.apply(this, arguments);
            }
            $mol_linker.prototype.uri = function () {
                var patch = {};
                var arg = this.arg();
                for (var key in arg)
                    patch[key] = arg[key]();
                return new $.$mol_state_arg(this.statePrefix()).link(patch);
            };
            $mol_linker.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            __decorate([
                $.$mol_mem()
            ], $mol_linker.prototype, "uri", null);
            return $mol_linker;
        }($.$mol_linker));
        $mol.$mol_linker = $mol_linker;
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
            _super.apply(this, arguments);
        }
        $mol_demo.prototype.name = function () {
            return "$mol_viewer ";
        };
        $mol_demo.prototype.title = function () {
            return this.name();
        };
        $mol_demo.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_demo.prototype.widget = function () {
            return null;
        };
        $mol_demo.prototype.screener = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.widget()); };
            });
        };
        $mol_demo.prototype.childs = function () {
            return [].concat(this.titler(), this.screener());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_demo.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_demo.prototype, "screener", null);
        return $mol_demo;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_demo.prototype.widget = function () {
                var Class = $[this.name()];
                return new Class();
            };
            __decorate([
                $.$mol_mem()
            ], $mol_demo.prototype, "widget", null);
            return $mol_demo;
        }($.$mol_demo));
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
            _super.apply(this, arguments);
        }
        return $mol_demo_small;
    }($.$mol_demo));
    $.$mol_demo_small = $mol_demo_small;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_demo_medium = (function (_super) {
        __extends($mol_demo_medium, _super);
        function $mol_demo_medium() {
            _super.apply(this, arguments);
        }
        return $mol_demo_medium;
    }($.$mol_demo));
    $.$mol_demo_medium = $mol_demo_medium;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_demo_large = (function (_super) {
        __extends($mol_demo_large, _super);
        function $mol_demo_large() {
            _super.apply(this, arguments);
        }
        return $mol_demo_large;
    }($.$mol_demo));
    $.$mol_demo_large = $mol_demo_large;
})($ || ($ = {}));
//demo_types.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_demo.prototype.items = function () {
            return [];
        };
        $mol_app_demo.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.items(); };
            });
        };
        $mol_app_demo.prototype.main = function () {
            return [].concat(this.lister());
        };
        $mol_app_demo.prototype.titleAddon = function () {
            return this.localizedText("titleAddon");
        };
        $mol_app_demo.prototype.options = function () {
            return [];
        };
        $mol_app_demo.prototype.optioner = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.options(); };
            });
        };
        $mol_app_demo.prototype.menu = function (next, prev) {
            var _this = this;
            return new $.$mol_pager().setup(function (obj) {
                obj.title = function () { return _this.titleAddon(); };
                obj.body = function () { return [].concat(_this.optioner()); };
            });
        };
        $mol_app_demo.prototype.addon = function () {
            return [].concat(this.menu());
        };
        $mol_app_demo.prototype.welcomeText = function () {
            return "";
        };
        $mol_app_demo.prototype.welcomeTexter = function (next, prev) {
            var _this = this;
            return new $.$mol_texter().setup(function (obj) {
                obj.text = function () { return _this.welcomeText(); };
            });
        };
        $mol_app_demo.prototype.welcomer = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.welcomeTexter()); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "optioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "menu", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "welcomeTexter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo.prototype, "welcomer", null);
        return $mol_app_demo;
    }($.$mol_stacker));
    $.$mol_app_demo = $mol_app_demo;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_demo_pager = (function (_super) {
        __extends($mol_app_demo_pager, _super);
        function $mol_app_demo_pager() {
            _super.apply(this, arguments);
        }
        $mol_app_demo_pager.prototype.backer_icon = function (next, prev) {
            return new $.$mol_icon_chevron();
        };
        $mol_app_demo_pager.prototype.backArg = function () {
            return ({
                "demo": function () { return null; },
            });
        };
        $mol_app_demo_pager.prototype.backer = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.backer_icon()); };
                obj.arg = function () { return _this.backArg(); };
            });
        };
        $mol_app_demo_pager.prototype.head = function () {
            return [].concat(this.backer(), this.titler());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo_pager.prototype, "backer_icon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_demo_pager.prototype, "backer", null);
        return $mol_app_demo_pager;
    }($.$mol_pager));
    $.$mol_app_demo_pager = $mol_app_demo_pager;
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
                _super.apply(this, arguments);
            }
            $mol_app_demo.prototype.title = function () {
                var next = this.titleAddon();
                var selected = this.selected();
                if (selected)
                    next = "$" + selected + " - " + next;
                return next;
            };
            $mol_app_demo.prototype.main = function () {
                var selected = this.selected();
                if (selected) {
                    return [this.detailer(selected)];
                }
                else {
                    return [this.welcomer()];
                }
            };
            $mol_app_demo.prototype.welcomeText = function () {
                return $.$mol_http_resource.item('readme.md').text();
            };
            $mol_app_demo.prototype.side = function () {
                return this.selected() ? false : true;
            };
            $mol_app_demo.prototype.namesDemo = function () {
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
            $mol_app_demo.prototype.options = function () {
                var _this = this;
                return this.namesDemo().map(function (name) { return _this.option(name); });
            };
            $mol_app_demo.prototype.selected = function () {
                return $.$mol_state_arg.value(this.stateKey('demo'));
            };
            $mol_app_demo.prototype.option = function (name) {
                return new $mol.$mol_linker().setup(function (obj) {
                    obj.childs = function () { return [name ? ('$' + name) : 'All']; };
                    obj.arg = function () { return ({ demo: function () { return name; } }); };
                });
            };
            $mol_app_demo.prototype.widget = function (name) {
                var _this = this;
                var Class = $['$' + name];
                return new Class().setup(function (obj) {
                    obj.statePrefix = function () { return _this.statePrefix() + name + '.'; };
                });
            };
            $mol_app_demo.prototype.detailer = function (name) {
                var _this = this;
                return new $.$mol_app_demo_pager().setup(function (obj) {
                    obj.title = $.$mol_const('$' + name);
                    obj.body = function () { return [_this.widget(name)]; };
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_demo.prototype, "welcomeText", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_demo.prototype, "namesDemo", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_demo.prototype, "options", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_demo.prototype, "option", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_demo.prototype, "widget", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_demo.prototype, "detailer", null);
            return $mol_app_demo;
        }($.$mol_app_demo));
        $mol.$mol_app_demo = $mol_app_demo;
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
    var $mol_statuser = (function (_super) {
        __extends($mol_statuser, _super);
        function $mol_statuser() {
            _super.apply(this, arguments);
        }
        $mol_statuser.prototype.status = function () {
            return null;
        };
        $mol_statuser.prototype.message = function () {
            return "";
        };
        $mol_statuser.prototype.childs = function () {
            return [].concat(this.message());
        };
        return $mol_statuser;
    }($.$mol_viewer));
    $.$mol_statuser = $mol_statuser;
})($ || ($ = {}));
//statuser.view.tree.js.map
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
        var $mol_statuser = (function (_super) {
            __extends($mol_statuser, _super);
            function $mol_statuser() {
                _super.apply(this, arguments);
            }
            $mol_statuser.prototype.message = function () {
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
            return $mol_statuser;
        }($.$mol_statuser));
        $mol.$mol_statuser = $mol_statuser;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//statuser.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_habhub.prototype.title = function () {
            return "HabHub";
        };
        $mol_app_habhub.prototype.gisters = function () {
            return [];
        };
        $mol_app_habhub.prototype.statuser = function (next, prev) {
            var _this = this;
            return new $.$mol_statuser().setup(function (obj) {
                obj.status = function () { return _this.gisters(); };
            });
        };
        $mol_app_habhub.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.gisters(); };
            });
        };
        $mol_app_habhub.prototype.body = function () {
            return [].concat(this.statuser(), this.lister());
        };
        $mol_app_habhub.prototype.gistContent = function (key) {
            return "";
        };
        $mol_app_habhub.prototype.gister = function (key, next, prev) {
            var _this = this;
            return new $.$mol_texter().setup(function (obj) {
                obj.text = function () { return _this.gistContent(key); };
            });
        };
        $mol_app_habhub.prototype.footer = function () {
            return null;
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_habhub.prototype, "statuser", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_habhub.prototype, "lister", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_habhub.prototype, "gister", null);
        return $mol_app_habhub;
    }($.$mol_pager));
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
                _super.apply(this, arguments);
            }
            $mol_app_habhub.prototype.uriSource = function () {
                return 'https://api.github.com/search/issues?q=label:HabHub+is:open&sort=reactions';
            };
            $mol_app_habhub.prototype.gists = function () {
                return $.$mol_http_resource_json.item(this.uriSource()).json().items;
            };
            $mol_app_habhub.prototype.gisters = function () {
                var _this = this;
                return this.gists().map(function (gist, index) { return _this.gister(index); });
            };
            $mol_app_habhub.prototype.gistContent = function (index) {
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
            _super.apply(this, arguments);
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
    var $mol_stringer = (function (_super) {
        __extends($mol_stringer, _super);
        function $mol_stringer() {
            _super.apply(this, arguments);
        }
        $mol_stringer.prototype.tagName = function () {
            return "input";
        };
        $mol_stringer.prototype.enabled = function () {
            return true;
        };
        $mol_stringer.prototype.hint = function () {
            return "";
        };
        $mol_stringer.prototype.type = function () {
            return "text";
        };
        $mol_stringer.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "placeholder": function () { return _this.hint(); },
                "type": function () { return _this.type(); },
            });
        };
        $mol_stringer.prototype.disabled = function () {
            return false;
        };
        $mol_stringer.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_stringer.prototype.valueChanged = function (next, prev) {
            return this.value(next, prev);
        };
        $mol_stringer.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "disabled": function () { return _this.disabled(); },
                "value": function () { return _this.valueChanged(); },
            });
        };
        $mol_stringer.prototype.eventChange = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_stringer.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "input": function (next, prev) { return _this.eventChange(next, prev); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stringer.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stringer.prototype, "eventChange", null);
        return $mol_stringer;
    }($.$mol_viewer));
    $.$mol_stringer = $mol_stringer;
})($ || ($ = {}));
//stringer.view.tree.js.map
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
        var $mol_stringer = (function (_super) {
            __extends($mol_stringer, _super);
            function $mol_stringer() {
                _super.apply(this, arguments);
            }
            $mol_stringer.prototype.eventChange = function (next) {
                this.value(this.DOMNode().value.trim());
            };
            $mol_stringer.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_stringer;
        }($.$mol_stringer));
        $mol.$mol_stringer = $mol_stringer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//stringer.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_hello.prototype.namerHint = function () {
            return this.localizedText("namerHint");
        };
        $mol_app_hello.prototype.name = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_hello.prototype.namer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.namerHint(); };
                obj.value = function (next, prev) { return _this.name(next, prev); };
            });
        };
        $mol_app_hello.prototype.greeting = function () {
            return "";
        };
        $mol_app_hello.prototype.greeter = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.greeting()); };
            });
        };
        $mol_app_hello.prototype.childs = function () {
            return [].concat(this.namer(), this.greeter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_hello.prototype, "name", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_hello.prototype, "namer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_hello.prototype, "greeter", null);
        return $mol_app_hello;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
var $;
(function ($) {
    var $mol_rower = (function (_super) {
        __extends($mol_rower, _super);
        function $mol_rower() {
            _super.apply(this, arguments);
        }
        return $mol_rower;
    }($.$mol_viewer));
    $.$mol_rower = $mol_rower;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_rower_sub = (function (_super) {
        __extends($mol_rower_sub, _super);
        function $mol_rower_sub() {
            _super.apply(this, arguments);
        }
        return $mol_rower_sub;
    }($.$mol_viewer));
    $.$mol_rower_sub = $mol_rower_sub;
})($ || ($ = {}));
//rower.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_form.prototype.submitBlocked = function () {
            return false;
        };
        $mol_form.prototype.formFields = function () {
            return [];
        };
        $mol_form.prototype.barFields = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.formFields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.barButtons = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.childs = function () {
            return [].concat(this.barFields(), this.barButtons());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "barFields", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "barButtons", null);
        return $mol_form;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_form.prototype.submitBlocked = function () {
                return this.formFields().some(function (field) { return field.errors().length !== 0; });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_form.prototype, "submitBlocked", null);
            return $mol_form;
        }($.$mol_form));
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
            _super.apply(this, arguments);
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.namer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.name()); };
            });
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.errorer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.namer(), _this.errorer()); };
            });
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.childs = function () {
            return [].concat(this.label(), this.control());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "namer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "errorer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form_field.prototype, "label", null);
        return $mol_form_field;
    }($.$mol_viewer));
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_enter.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_enter.prototype.entered = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_inventory_enter.prototype.loginLabel = function () {
            return this.localizedText("loginLabel");
        };
        $mol_app_inventory_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.login = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_inventory_enter.prototype.loginControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.login(next, prev); };
            });
        };
        $mol_app_inventory_enter.prototype.loginField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.passwordLabel = function () {
            return this.localizedText("passwordLabel");
        };
        $mol_app_inventory_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_inventory_enter.prototype.password = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_inventory_enter.prototype.passControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.password(next, prev); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_inventory_enter.prototype.passwordField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_inventory_enter.prototype.submitLabel = function () {
            return this.localizedText("submitLabel");
        };
        $mol_app_inventory_enter.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_inventory_enter.prototype.submitBlocked = function () {
            return false;
        };
        $mol_app_inventory_enter.prototype.submit = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_inventory_enter.prototype.form = function (next, prev) {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.formFields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_inventory_enter.prototype.message = function () {
            return "";
        };
        $mol_app_inventory_enter.prototype.childs = function () {
            return [].concat(this.form(), this.message());
        };
        $mol_app_inventory_enter.prototype.messageNoAccess = function () {
            return this.localizedText("messageNoAccess");
        };
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
        ], $mol_app_inventory_enter.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_enter.prototype, "submit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_enter.prototype, "form", null);
        return $mol_app_inventory_enter;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_app_inventory_enter.prototype.eventSubmit = function () {
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_number.prototype.precision = function () {
            return 1;
        };
        $mol_number.prototype.precisionView = function () {
            return this.precision();
        };
        $mol_number.prototype.precisionChange = function () {
            return this.precision();
        };
        $mol_number.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_number.prototype.eventDec = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_number.prototype.enabled = function () {
            return true;
        };
        $mol_number.prototype.enabledDec = function () {
            return this.enabled();
        };
        $mol_number.prototype.decIcon = function (next, prev) {
            return new $.$mol_icon_minus();
        };
        $mol_number.prototype.decrementer = function (next, prev) {
            var _this = this;
            return new $.$mol_number_clicker().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventDec(next, prev); };
                obj.enabled = function () { return _this.enabledDec(); };
                obj.childs = function () { return [].concat(_this.decIcon()); };
            });
        };
        $mol_number.prototype.valueString = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_number.prototype.hint = function () {
            return "";
        };
        $mol_number.prototype.enabledStringer = function () {
            return this.enabled();
        };
        $mol_number.prototype.stringer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.type = function () { return "number"; };
                obj.value = function (next, prev) { return _this.valueString(next, prev); };
                obj.hint = function () { return _this.hint(); };
                obj.enabled = function () { return _this.enabledStringer(); };
            });
        };
        $mol_number.prototype.eventInc = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_number.prototype.enabledInc = function () {
            return this.enabled();
        };
        $mol_number.prototype.incIcon = function (next, prev) {
            return new $.$mol_icon_plus();
        };
        $mol_number.prototype.incrementer = function (next, prev) {
            var _this = this;
            return new $.$mol_number_clicker().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventInc(next, prev); };
                obj.enabled = function () { return _this.enabledInc(); };
                obj.childs = function () { return [].concat(_this.incIcon()); };
            });
        };
        $mol_number.prototype.childs = function () {
            return [].concat(this.decrementer(), this.stringer(), this.incrementer());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "eventDec", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "decIcon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "decrementer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "valueString", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "stringer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "eventInc", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "incIcon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_number.prototype, "incrementer", null);
        return $mol_number;
    }($.$mol_viewer));
    $.$mol_number = $mol_number;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_number_clicker = (function (_super) {
        __extends($mol_number_clicker, _super);
        function $mol_number_clicker() {
            _super.apply(this, arguments);
        }
        return $mol_number_clicker;
    }($.$mol_clicker));
    $.$mol_number_clicker = $mol_number_clicker;
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
                _super.apply(this, arguments);
            }
            $mol_number.prototype.eventDec = function (next) {
                this.value(this.value() - this.precisionChange());
            };
            $mol_number.prototype.eventInc = function (next) {
                this.value(Number(this.value()) + this.precisionChange());
            };
            $mol_number.prototype.valueString = function (next) {
                if (next !== void 0) {
                    this.value(next === '' ? null : Number(next));
                }
                var precisionView = this.precisionView();
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
            $mol_number.prototype.eventWheel = function (next) {
                if (next.wheelDelta > 0) {
                    this.eventInc(next);
                }
                else {
                    this.eventDec(next);
                }
            };
            $mol_number.prototype.incrementer = function () {
                return this.enabledInc() ? _super.prototype.incrementer.call(this) : null;
            };
            $mol_number.prototype.decrementer = function () {
                return this.enabledDec() ? _super.prototype.decrementer.call(this) : null;
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
    var $mol_switcher = (function (_super) {
        __extends($mol_switcher, _super);
        function $mol_switcher() {
            _super.apply(this, arguments);
        }
        $mol_switcher.prototype.heightMinimal = function () {
            return 44;
        };
        $mol_switcher.prototype.enabled = function () {
            return true;
        };
        $mol_switcher.prototype.optionChecked = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_switcher.prototype.optionLabel = function (key) {
            return "";
        };
        $mol_switcher.prototype.optioner = function (key, next, prev) {
            var _this = this;
            return new $.$mol_checker().setup(function (obj) {
                obj.checked = function (next, prev) { return _this.optionChecked(key, next, prev); };
                obj.label = function () { return [].concat(_this.optionLabel(key)); };
                obj.enabled = function () { return _this.enabled(); };
            });
        };
        $mol_switcher.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_switcher.prototype.options = function () {
            return ({});
        };
        $mol_switcher.prototype.items = function () {
            return [];
        };
        $mol_switcher.prototype.childs = function () {
            return this.items();
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_switcher.prototype, "optionChecked", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_switcher.prototype, "optioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_switcher.prototype, "value", null);
        return $mol_switcher;
    }($.$mol_viewer));
    $.$mol_switcher = $mol_switcher;
})($ || ($ = {}));
//switcher.view.tree.js.map
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
        var $mol_switcher = (function (_super) {
            __extends($mol_switcher, _super);
            function $mol_switcher() {
                _super.apply(this, arguments);
            }
            $mol_switcher.prototype.value = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.value()', next);
            };
            $mol_switcher.prototype.options = function () {
                return {};
            };
            $mol_switcher.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.optioner(key); });
            };
            $mol_switcher.prototype.optionLabel = function (key) {
                return this.options()[key]();
            };
            $mol_switcher.prototype.optionChecked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_switcher.prototype, "items", null);
            return $mol_switcher;
        }($.$mol_switcher));
        $mol.$mol_switcher = $mol_switcher;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switcher.view.js.map
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
    var $mol_app_inventory_positioner = (function (_super) {
        __extends($mol_app_inventory_positioner, _super);
        function $mol_app_inventory_positioner() {
            _super.apply(this, arguments);
        }
        $mol_app_inventory_positioner.prototype.position = function () {
            return null;
        };
        $mol_app_inventory_positioner.prototype.title = function () {
            return "";
        };
        $mol_app_inventory_positioner.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_inventory_positioner.prototype.description = function () {
            return "";
        };
        $mol_app_inventory_positioner.prototype.descriptioner = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_inventory_positioner.prototype.producter = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.titler(), _this.descriptioner()); };
            });
        };
        $mol_app_inventory_positioner.prototype.count = function (next, prev) {
            return (next !== void 0) ? next : 0;
        };
        $mol_app_inventory_positioner.prototype.counter = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.count(next, prev); };
                obj.enabledInc = function () { return false; };
                obj.enabledDec = function () { return false; };
            });
        };
        $mol_app_inventory_positioner.prototype.status = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_inventory_positioner.prototype.statusLabelPending = function () {
            return this.localizedText("statusLabelPending");
        };
        $mol_app_inventory_positioner.prototype.statusLabelApproved = function () {
            return this.localizedText("statusLabelApproved");
        };
        $mol_app_inventory_positioner.prototype.statusLabelRejected = function () {
            return this.localizedText("statusLabelRejected");
        };
        $mol_app_inventory_positioner.prototype.statuser = function (next, prev) {
            var _this = this;
            return new $.$mol_switcher().setup(function (obj) {
                obj.value = function (next, prev) { return _this.status(next, prev); };
                obj.options = function () { return ({
                    "pending": function () { return _this.statusLabelPending(); },
                    "approved": function () { return _this.statusLabelApproved(); },
                    "rejected": function () { return _this.statusLabelRejected(); },
                }); };
            });
        };
        $mol_app_inventory_positioner.prototype.childs = function () {
            return [].concat(this.producter(), this.counter(), this.statuser());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "descriptioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "producter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "count", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "counter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "status", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_positioner.prototype, "statuser", null);
        return $mol_app_inventory_positioner;
    }($.$mol_rower));
    $.$mol_app_inventory_positioner = $mol_app_inventory_positioner;
})($ || ($ = {}));
//positioner.view.tree.js.map
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
        var $mol_app_inventory_positioner = (function (_super) {
            __extends($mol_app_inventory_positioner, _super);
            function $mol_app_inventory_positioner() {
                _super.apply(this, arguments);
            }
            $mol_app_inventory_positioner.prototype.position = function () {
                return new $.$mol_app_inventory_domain_position();
            };
            $mol_app_inventory_positioner.prototype.title = function () {
                return this.position().product().title();
            };
            $mol_app_inventory_positioner.prototype.description = function () {
                return this.position().product().description();
            };
            $mol_app_inventory_positioner.prototype.count = function (next) {
                return this.position().count(next);
            };
            $mol_app_inventory_positioner.prototype.status = function (next) {
                return this.position().status(next);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory_positioner.prototype, "position", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory_positioner.prototype, "status", null);
            return $mol_app_inventory_positioner;
        }($.$mol_app_inventory_positioner));
        $mol.$mol_app_inventory_positioner = $mol_app_inventory_positioner;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//positioner.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_controller.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_controller.prototype.positioners = function () {
            return [];
        };
        $mol_app_inventory_controller.prototype.body = function () {
            return this.positioners();
        };
        $mol_app_inventory_controller.prototype.position = function (key) {
            return null;
        };
        $mol_app_inventory_controller.prototype.positioner = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.position = function () { return _this.position(key); };
            });
        };
        $mol_app_inventory_controller.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_inventory_controller.prototype.submitLabel = function () {
            return this.localizedText("submitLabel");
        };
        $mol_app_inventory_controller.prototype.submitter = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.childs = function () { return [].concat(_this.submitLabel()); };
            });
        };
        $mol_app_inventory_controller.prototype.controlsRower = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitter()); };
            });
        };
        $mol_app_inventory_controller.prototype.foot = function () {
            return [].concat(this.controlsRower());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "domain", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_inventory_controller.prototype, "positioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "submitter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller.prototype, "controlsRower", null);
        return $mol_app_inventory_controller;
    }($.$mol_pager));
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
                _super.apply(this, arguments);
            }
            $mol_app_inventory_controller.prototype.position = function (code) {
                return this.domain().position(code);
            };
            $mol_app_inventory_controller.prototype.positioners = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.positioner(position.product().code()); });
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
            $mol_app_inventory_controller.prototype.eventSubmit = function (next) {
                this.positions().forEach(function (position) {
                    if (position.status() === $.$mol_app_inventory_domain_position_status.approved) {
                        position.status($.$mol_app_inventory_domain_position_status.completed);
                    }
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory_controller.prototype, "positioners", null);
            return $mol_app_inventory_controller;
        }($.$mol_app_inventory_controller));
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
    var $mol_coder = (function (_super) {
        __extends($mol_coder, _super);
        function $mol_coder() {
            _super.apply(this, arguments);
        }
        $mol_coder.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_coder.prototype.format = function () {
            return "";
        };
        $mol_coder.prototype.hint = function () {
            return this.format();
        };
        $mol_coder.prototype.manualer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.value(next, prev); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_coder.prototype.eventScan = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_coder.prototype.labelScan = function () {
            return this.localizedText("labelScan");
        };
        $mol_coder.prototype.scanner = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventScan(next, prev); };
                obj.childs = function () { return [].concat(_this.labelScan()); };
            });
        };
        $mol_coder.prototype.childs = function () {
            return [].concat(this.manualer(), this.scanner());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "manualer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "eventScan", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder.prototype, "scanner", null);
        return $mol_coder;
    }($.$mol_viewer));
    $.$mol_coder = $mol_coder;
})($ || ($ = {}));
//coder.view.tree.js.map
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
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_coder = (function (_super) {
            __extends($mol_coder, _super);
            function $mol_coder() {
                _super.apply(this, arguments);
            }
            $mol_coder.prototype.supportScan = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_coder.prototype.scanner = function () {
                return this.supportScan() ? _super.prototype.scanner.call(this) : null;
            };
            $mol_coder.prototype.eventScan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_coder;
        }($.$mol_coder));
        $mol.$mol_coder = $mol_coder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//coder.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_keeper.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory_keeper.prototype.positioners = function () {
            return [];
        };
        $mol_app_inventory_keeper.prototype.body = function () {
            return this.positioners();
        };
        $mol_app_inventory_keeper.prototype.position = function (key) {
            return null;
        };
        $mol_app_inventory_keeper.prototype.positioner = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.statuser = function () { return null; };
                obj.position = function () { return _this.position(key); };
            });
        };
        $mol_app_inventory_keeper.prototype.newCode = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_inventory_keeper.prototype.newCodeHint = function () {
            return this.localizedText("newCodeHint");
        };
        $mol_app_inventory_keeper.prototype.coder = function (next, prev) {
            var _this = this;
            return new $.$mol_coder().setup(function (obj) {
                obj.value = function (next, prev) { return _this.newCode(next, prev); };
                obj.hint = function () { return _this.newCodeHint(); };
            });
        };
        $mol_app_inventory_keeper.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_inventory_keeper.prototype.submitLabel = function () {
            return this.localizedText("submitLabel");
        };
        $mol_app_inventory_keeper.prototype.submitter = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.childs = function () { return [].concat(_this.submitLabel()); };
            });
        };
        $mol_app_inventory_keeper.prototype.coderRower = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.coder(), _this.submitter()); };
            });
        };
        $mol_app_inventory_keeper.prototype.foot = function () {
            return [].concat(this.coderRower());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "domain", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_inventory_keeper.prototype, "positioner", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "newCode", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "coder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "submitter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper.prototype, "coderRower", null);
        return $mol_app_inventory_keeper;
    }($.$mol_pager));
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
                _super.apply(this, arguments);
            }
            $mol_app_inventory_keeper.prototype.position = function (code) {
                return this.domain().position(code);
            };
            $mol_app_inventory_keeper.prototype.newCode = function (next) {
                if (next === void 0)
                    return '';
                var domain = this.domain();
                var product = domain.productByCode(next);
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
            $mol_app_inventory_keeper.prototype.positioners = function () {
                var _this = this;
                return this.positions().map(function (position) { return _this.positioner(position.product().code()); });
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
            $mol_app_inventory_keeper.prototype.eventSubmit = function (next) {
                this.positions().forEach(function (position) {
                    position.status($.$mol_app_inventory_domain_position_status.pending);
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory_keeper.prototype, "newCode", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory_keeper.prototype, "positioners", null);
            return $mol_app_inventory_keeper;
        }($.$mol_app_inventory_keeper));
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
    var $mol_app_inventory_stats = (function (_super) {
        __extends($mol_app_inventory_stats, _super);
        function $mol_app_inventory_stats() {
            _super.apply(this, arguments);
        }
        $mol_app_inventory_stats.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_stats.prototype, "domain", null);
        return $mol_app_inventory_stats;
    }($.$mol_pager));
    $.$mol_app_inventory_stats = $mol_app_inventory_stats;
})($ || ($ = {}));
//stats.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain();
        };
        $mol_app_inventory.prototype.page = function () {
            return null;
        };
        $mol_app_inventory.prototype.childs = function () {
            return [].concat(this.page());
        };
        $mol_app_inventory.prototype.header = function (next, prev) {
            return new $.$mol_app_inventory_header();
        };
        $mol_app_inventory.prototype.enter = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_enter().setup(function (obj) {
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.controller = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_controller().setup(function (obj) {
                obj.header = function () { return _this.header(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.keeper = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_keeper().setup(function (obj) {
                obj.header = function () { return _this.header(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        $mol_app_inventory.prototype.stats = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_stats().setup(function (obj) {
                obj.header = function () { return _this.header(); };
                obj.domain = function () { return _this.domain(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "domain", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "header", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "enter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "controller", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "keeper", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory.prototype, "stats", null);
        return $mol_app_inventory;
    }($.$mol_viewer));
    $.$mol_app_inventory = $mol_app_inventory;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_inventory_header = (function (_super) {
        __extends($mol_app_inventory_header, _super);
        function $mol_app_inventory_header() {
            _super.apply(this, arguments);
        }
        $mol_app_inventory_header.prototype.keeperLabel = function () {
            return this.localizedText("keeperLabel");
        };
        $mol_app_inventory_header.prototype.keeperLink = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": function () { return "keeper"; },
                }); };
                obj.childs = function () { return [].concat(_this.keeperLabel()); };
            });
        };
        $mol_app_inventory_header.prototype.controlLabel = function () {
            return this.localizedText("controlLabel");
        };
        $mol_app_inventory_header.prototype.controlLink = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return ({
                    "page": function () { return "controller"; },
                }); };
                obj.childs = function () { return [].concat(_this.controlLabel()); };
            });
        };
        $mol_app_inventory_header.prototype.childs = function () {
            return [].concat(this.keeperLink(), this.controlLink());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_header.prototype, "keeperLink", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_header.prototype, "controlLink", null);
        return $mol_app_inventory_header;
    }($.$mol_rower));
    $.$mol_app_inventory_header = $mol_app_inventory_header;
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
                _super.apply(this, arguments);
            }
            $mol_app_inventory.prototype.page = function () {
                if (!this.domain().authentificated()) {
                    return this.enter();
                }
                switch (this.pageName()) {
                    case 'keeper': return this.keeper();
                    case 'controller': return this.controller();
                    case 'stats': return this.stats();
                }
                return this.stats();
            };
            $mol_app_inventory.prototype.pageName = function (next) {
                return $.$mol_state_arg.value(this.stateKey('page'), next) || 'keeper';
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_inventory.prototype, "pageName", null);
            return $mol_app_inventory;
        }($.$mol_app_inventory));
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
var $;
(function ($) {
    var $mol_range_common = (function (_super) {
        __extends($mol_range_common, _super);
        function $mol_range_common() {
            _super.apply(this, arguments);
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
                args[_i - 0] = arguments[_i];
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
    }(Array));
    $.$mol_range_common = $mol_range_common;
    var $mol_range_lazy = (function (_super) {
        __extends($mol_range_lazy, _super);
        function $mol_range_lazy(source) {
            if (source === void 0) { source = {
                item: function (id) { return void 0; },
                length: 0
            }; }
            _super.call(this);
            this.source = source;
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
            _super.apply(this, arguments);
        }
        $mol_hyperhive.data = function (resource, next, prev) {
            if (typeof hhfw === 'undefined') {
                var uri = "" + resource.uri + resource.table + "/table/" + resource.table + "/";
                var res = $.$mol_http_resource_json.item(uri);
                res.credentials = $.$mol_const({});
                return res.json();
            }
            var handleError = function (message) {
                var error = new Error(JSON.stringify(resource) + " " + message);
                $mol_hyperhive.data(resource, void 0, error);
            };
            document.addEventListener('deviceready', function () {
                hhfw.GetDeltaStream(resource.uri, resource.table, function (result) {
                    var db = sqlitePlugin.openDatabase({
                        name: "cpprun.db",
                        location: 'default',
                    });
                    hhfw.ReadFromStorage(db, resource.table + "_$_" + resource.table, function (result2) {
                        var range = new $.$mol_range_lazy(result2.rows);
                        $mol_hyperhive.data(resource, void 0, range);
                    }, handleError);
                }, handleError);
            });
            throw new $.$mol_atom_wait("Loading " + resource.table + " from " + resource.uri);
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_hyperhive, "data", null);
        return $mol_hyperhive;
    }($.$mol_object));
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_domain.prototype.rawTable = function (name) {
            var creds = this.credentials();
            var uri = "http://" + creds.login + ":" + creds.password + "@hh.saprun.com/sync/v0.4/dev-env/dev-prj/app/";
            return $.$mol_hyperhive.data({
                uri: uri,
                table: name,
            });
        };
        $mol_app_inventory_domain.prototype.productsTable = function () {
            return this.rawTable('GET_MATERIALS');
        };
        $mol_app_inventory_domain.prototype.positionsTable = function () {
            return this.rawTable('GET_MOVEMENTS');
        };
        $mol_app_inventory_domain.prototype.productRowsById = function () {
            var table = this.productsTable();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MATERIAL_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.productByCode = function (code) {
            return this.product(this.productRowsByCode()[code].R_MATERIAL_ID);
        };
        $mol_app_inventory_domain.prototype.productRowsByCode = function () {
            var table = this.productsTable();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_BARCODE] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.positionsDict = function () {
            var table = this.positionsTable();
            var dict = {};
            table.forEach(function (row) {
                dict[row.R_MATERIAL_ID] = row;
            });
            return dict;
        };
        $mol_app_inventory_domain.prototype.products = function () {
            var _this = this;
            return this.productsTable().map(function (row) { return _this.product(row.R_MATERIAL_ID); });
        };
        $mol_app_inventory_domain.prototype.product = function (code) {
            var _this = this;
            var next = new $mol_app_inventory_domain_product;
            next.code = $.$mol_const(code);
            next.title = function () { return _this.productRowsById()[code].R_NAME; };
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
            next.count = function (next) { return _this.positionCount(productCode, next); };
            next.status = function (next) { return _this.positionStatus(productCode, next); };
            return next;
        };
        $mol_app_inventory_domain.prototype.positionCount = function (productCode, next) {
            var key = "positionCount(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_local.value(key, next) || 0;
        };
        $mol_app_inventory_domain.prototype.positionStatus = function (productCode, next) {
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
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain.prototype, "productsTable", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain.prototype, "positionsTable", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain.prototype, "productRowsById", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain.prototype, "productRowsByCode", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain.prototype, "positionsDict", null);
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
        return $mol_app_inventory_domain;
    }($.$mol_object));
    $.$mol_app_inventory_domain = $mol_app_inventory_domain;
    var $mol_app_inventory_domain_product = (function (_super) {
        __extends($mol_app_inventory_domain_product, _super);
        function $mol_app_inventory_domain_product() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_domain_position.prototype.product = function () { return void 0; };
        $mol_app_inventory_domain_position.prototype.count = function (next) {
            return next || 0;
        };
        $mol_app_inventory_domain_position.prototype.status = function (next) {
            return next || $mol_app_inventory_domain_position_status.draft;
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain_position.prototype, "count", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_domain_position.prototype, "status", null);
        return $mol_app_inventory_domain_position;
    }($.$mol_object));
    $.$mol_app_inventory_domain_position = $mol_app_inventory_domain_position;
    (function ($mol_app_inventory_domain_position_status) {
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["draft"] = 'draft'] = "draft";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["pending"] = 'pending'] = "pending";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["rejected"] = 'rejected'] = "rejected";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["approved"] = 'approved'] = "approved";
        $mol_app_inventory_domain_position_status[$mol_app_inventory_domain_position_status["completed"] = 'completed'] = "completed";
    })($.$mol_app_inventory_domain_position_status || ($.$mol_app_inventory_domain_position_status = {}));
    var $mol_app_inventory_domain_position_status = $.$mol_app_inventory_domain_position_status;
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_controller_demo.prototype.title1 = function () {
            return this.localizedText("title1");
        };
        $mol_app_inventory_controller_demo.prototype.description1 = function () {
            return this.localizedText("description1");
        };
        $mol_app_inventory_controller_demo.prototype.count1 = function (next, prev) {
            return (next !== void 0) ? next : 1;
        };
        $mol_app_inventory_controller_demo.prototype.status1 = function (next, prev) {
            return (next !== void 0) ? next : "pending";
        };
        $mol_app_inventory_controller_demo.prototype.positioner1 = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.title = function () { return _this.title1(); };
                obj.description = function () { return _this.description1(); };
                obj.count = function (next, prev) { return _this.count1(next, prev); };
                obj.status = function (next, prev) { return _this.status1(next, prev); };
            });
        };
        $mol_app_inventory_controller_demo.prototype.title2 = function () {
            return this.localizedText("title2");
        };
        $mol_app_inventory_controller_demo.prototype.description2 = function () {
            return this.localizedText("description2");
        };
        $mol_app_inventory_controller_demo.prototype.count2 = function (next, prev) {
            return (next !== void 0) ? next : 10;
        };
        $mol_app_inventory_controller_demo.prototype.status2 = function (next, prev) {
            return (next !== void 0) ? next : "approved";
        };
        $mol_app_inventory_controller_demo.prototype.positioner2 = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.title = function () { return _this.title2(); };
                obj.description = function () { return _this.description2(); };
                obj.count = function (next, prev) { return _this.count2(next, prev); };
                obj.status = function (next, prev) { return _this.status2(next, prev); };
            });
        };
        $mol_app_inventory_controller_demo.prototype.positioners = function () {
            return [].concat(this.positioner1(), this.positioner2());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "count1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "status1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "positioner1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "count2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "status2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_controller_demo.prototype, "positioner2", null);
        return $mol_app_inventory_controller_demo;
    }($.$mol_app_inventory_controller));
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
            _super.call(this);
            this['valueOf()'] = value;
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
        $mol_unit.prototype.valueView = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.valueView() + this.postfix();
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
            _super.apply(this, arguments);
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
            base_class.patterns = {};
            return base_class;
        }());
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
                _super.call(this);
                this._year = config.year && Number(config.year) || 0;
                this._month = config.month && Number(config.month) || 0;
                this._day = config.day && Number(config.day) || 0;
                this._hour = config.hour && Number(config.hour) || 0;
                this._minute = config.minute && Number(config.minute) || 0;
                this._second = config.second && Number(config.second) || 0;
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
            return duration_class;
        }($jin.time.base_class));
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
                _super.call(this);
                this._year = config.year && Number(config.year);
                this._month = config.month && Number(config.month);
                this._day = config.day && Number(config.day);
                this._hour = config.hour && Number(config.hour);
                this._minute = config.minute && Number(config.minute);
                this._second = config.second && Number(config.second);
                this._offset = config.offset && this.constructor.duration_class.make(config.offset);
                this._native = null;
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
            return moment_class;
        }($jin.time.base_class));
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                _super.apply(this, arguments);
            }
            moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
            moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            return moment_class_ru;
        }(moment_class));
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    function $mol_stub_selectRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_selectRandom = $mol_stub_selectRandom;
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
                text += $mol_stub_selectRandom(possible);
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
    function $mol_stub_productName() {
        var name = $mol_stub_selectRandom([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_selectRandom(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_selectRandom(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_productName = $mol_stub_productName;
    function $mol_stub_companyNameBig() {
        var product = $mol_stub_selectRandom(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_selectRandom(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_companyNameBig = $mol_stub_companyNameBig;
    function $mol_stub_companyNameSmall() {
        return $mol_stub_selectRandom(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_companyNameSmall = $mol_stub_companyNameSmall;
    function $mol_stub_companyName() {
        return $mol_stub_selectRandom([$mol_stub_companyNameSmall, $mol_stub_companyNameBig])();
    }
    $.$mol_stub_companyName = $mol_stub_companyName;
    function $mol_stub_personName() {
        var first = $mol_stub_selectRandom(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_selectRandom(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_personName = $mol_stub_personName;
    function $mol_stub_city() {
        return $mol_stub_selectRandom(['Moscow', 'London', 'Washington', 'Buenos Aires']);
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
            _super.apply(this, arguments);
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
            next.title = $.$mol_const($.$mol_stub_productName());
            next.description = $.$mol_const('some description');
            return next;
        };
        $mol_app_inventory_domain_mock.prototype.productByCode = function (code) {
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
            next.count = function (next) { return _this.positionCount(productCode, next); };
            next.status = function (next) { return _this.positionStatus(productCode, next); };
            return next;
        };
        $mol_app_inventory_domain_mock.prototype.positionCount = function (productCode, next) {
            var key = "positionCount(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_session.value(key, next) || 0;
        };
        $mol_app_inventory_domain_mock.prototype.positionStatus = function (productCode, next) {
            var key = "positionStatus(" + JSON.stringify(productCode) + ")";
            return $.$mol_state_session.value(key, next) || $.$mol_app_inventory_domain_position_status.draft;
        };
        $mol_app_inventory_domain_mock.prototype.authentificated = function () {
            var creds = this.credentials();
            if (!creds)
                return false;
            if (creds.login === 'demo')
                return true;
            return false;
        };
        $mol_app_inventory_domain_mock.prototype.message = function () {
            return '';
        };
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
        return $mol_app_inventory_domain_mock;
    }($.$mol_app_inventory_domain));
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_demo.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain_mock();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_demo.prototype, "domain", null);
        return $mol_app_inventory_demo;
    }($.$mol_app_inventory));
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_inventory_keeper_demo.prototype.domain = function (next, prev) {
            return new $.$mol_app_inventory_domain_mock();
        };
        $mol_app_inventory_keeper_demo.prototype.title1 = function () {
            return this.localizedText("title1");
        };
        $mol_app_inventory_keeper_demo.prototype.description1 = function () {
            return this.localizedText("description1");
        };
        $mol_app_inventory_keeper_demo.prototype.count1 = function (next, prev) {
            return (next !== void 0) ? next : 1;
        };
        $mol_app_inventory_keeper_demo.prototype.status1 = function (next, prev) {
            return (next !== void 0) ? next : "pending";
        };
        $mol_app_inventory_keeper_demo.prototype.positioner1 = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.statuser = function () { return null; };
                obj.title = function () { return _this.title1(); };
                obj.description = function () { return _this.description1(); };
                obj.count = function (next, prev) { return _this.count1(next, prev); };
                obj.status = function (next, prev) { return _this.status1(next, prev); };
            });
        };
        $mol_app_inventory_keeper_demo.prototype.title2 = function () {
            return this.localizedText("title2");
        };
        $mol_app_inventory_keeper_demo.prototype.description2 = function () {
            return this.localizedText("description2");
        };
        $mol_app_inventory_keeper_demo.prototype.count2 = function (next, prev) {
            return (next !== void 0) ? next : 10;
        };
        $mol_app_inventory_keeper_demo.prototype.status2 = function (next, prev) {
            return (next !== void 0) ? next : "approved";
        };
        $mol_app_inventory_keeper_demo.prototype.positioner2 = function (next, prev) {
            var _this = this;
            return new $.$mol_app_inventory_positioner().setup(function (obj) {
                obj.statuser = function () { return null; };
                obj.title = function () { return _this.title2(); };
                obj.description = function () { return _this.description2(); };
                obj.count = function (next, prev) { return _this.count2(next, prev); };
                obj.status = function (next, prev) { return _this.status2(next, prev); };
            });
        };
        $mol_app_inventory_keeper_demo.prototype.positioners = function (next, prev) {
            return (next !== void 0) ? next : [].concat(this.positioner1(), this.positioner2());
        };
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
        ], $mol_app_inventory_keeper_demo.prototype, "positioner1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper_demo.prototype, "count2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper_demo.prototype, "status2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper_demo.prototype, "positioner2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_inventory_keeper_demo.prototype, "positioners", null);
        return $mol_app_inventory_keeper_demo;
    }($.$mol_app_inventory_keeper));
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
            _super.apply(this, arguments);
        }
        $mol_app_quine.prototype.content = function () {
            return "";
        };
        $mol_app_quine.prototype.texter = function (next, prev) {
            var _this = this;
            return new $.$mol_texter().setup(function (obj) {
                obj.text = function () { return _this.content(); };
            });
        };
        $mol_app_quine.prototype.body = function () {
            return [].concat(this.texter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_quine.prototype, "texter", null);
        return $mol_app_quine;
    }($.$mol_pager));
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
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_report.prototype.title = function () {
            return "Pump #1337";
        };
        $mol_app_report.prototype.description = function () {
            return "";
        };
        $mol_app_report.prototype.descriptor = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_report.prototype.headCells = function () {
            return [];
        };
        $mol_app_report.prototype.headRower = function (next, prev) {
            var _this = this;
            return new $.$mol_app_report_rower().setup(function (obj) {
                obj.cells = function () { return _this.headCells(); };
            });
        };
        $mol_app_report.prototype.rows = function () {
            return [];
        };
        $mol_app_report.prototype.tabler = function (next, prev) {
            var _this = this;
            return new $.$mol_app_report_tabler().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.headRower(), _this.rows()); };
            });
        };
        $mol_app_report.prototype.body = function () {
            return [].concat(this.descriptor(), this.tabler());
        };
        $mol_app_report.prototype.rowerCells = function (key) {
            return [];
        };
        $mol_app_report.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_report_rower().setup(function (obj) {
                obj.cells = function () { return _this.rowerCells(key); };
            });
        };
        $mol_app_report.prototype.cellContent = function (key) {
            return null;
        };
        $mol_app_report.prototype.cellRows = function (key) {
            return 1;
        };
        $mol_app_report.prototype.cellCols = function (key) {
            return 1;
        };
        $mol_app_report.prototype.celler = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_report_celler().setup(function (obj) {
                obj.content = function () { return _this.cellContent(key); };
                obj.rows = function () { return _this.cellRows(key); };
                obj.cols = function () { return _this.cellCols(key); };
            });
        };
        $mol_app_report.prototype.cellValue = function (key, next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_report.prototype.texter = function (key, next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.cellValue(key)); };
            });
        };
        $mol_app_report.prototype.stringer = function (key, next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.cellValue(key, next, prev); };
            });
        };
        $mol_app_report.prototype.number = function (key, next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.cellValue(key, next, prev); };
            });
        };
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
        ], $mol_app_report.prototype, "celler", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "cellValue", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "texter", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "stringer", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_report.prototype, "number", null);
        return $mol_app_report;
    }($.$mol_pager));
    $.$mol_app_report = $mol_app_report;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_report_tabler = (function (_super) {
        __extends($mol_app_report_tabler, _super);
        function $mol_app_report_tabler() {
            _super.apply(this, arguments);
        }
        $mol_app_report_tabler.prototype.tagName = function () {
            return "table";
        };
        $mol_app_report_tabler.prototype.rows = function () {
            return [];
        };
        $mol_app_report_tabler.prototype.childs = function () {
            return this.rows();
        };
        return $mol_app_report_tabler;
    }($.$mol_viewer));
    $.$mol_app_report_tabler = $mol_app_report_tabler;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_report_rower = (function (_super) {
        __extends($mol_app_report_rower, _super);
        function $mol_app_report_rower() {
            _super.apply(this, arguments);
        }
        $mol_app_report_rower.prototype.tagName = function () {
            return "tr";
        };
        $mol_app_report_rower.prototype.cells = function () {
            return [];
        };
        $mol_app_report_rower.prototype.childs = function () {
            return this.cells();
        };
        return $mol_app_report_rower;
    }($.$mol_viewer));
    $.$mol_app_report_rower = $mol_app_report_rower;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_report_celler = (function (_super) {
        __extends($mol_app_report_celler, _super);
        function $mol_app_report_celler() {
            _super.apply(this, arguments);
        }
        $mol_app_report_celler.prototype.tagName = function () {
            return "td";
        };
        $mol_app_report_celler.prototype.cols = function () {
            return 1;
        };
        $mol_app_report_celler.prototype.rows = function () {
            return 1;
        };
        $mol_app_report_celler.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "colspan": function () { return _this.cols(); },
                "rowspan": function () { return _this.rows(); },
            });
        };
        $mol_app_report_celler.prototype.content = function () {
            return null;
        };
        $mol_app_report_celler.prototype.childs = function () {
            return [].concat(this.content());
        };
        return $mol_app_report_celler;
    }($.$mol_viewer));
    $.$mol_app_report_celler = $mol_app_report_celler;
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
                _super.apply(this, arguments);
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
            $mol_app_report.prototype.formatRows = function () {
                return [
                    {
                        title: 'Фундамент',
                        childs: [
                            {
                                title: 'Габаритный размер',
                                childs: [
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
                        childs: [
                            {
                                title: 'Габаритный размер',
                                childs: [
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
                    this.celler([0, 0]),
                    this.celler([0, 1]),
                    this.celler([0, 2]),
                    this.celler([0, 3]),
                ];
            };
            $mol_app_report.prototype.rows = function () {
                var _this = this;
                var rows = [];
                var visit = function (pos, format) {
                    rows.push(_this.rower(pos));
                    if (format.childs)
                        format.childs.forEach(function (format, index) {
                            visit(pos.concat(index + 1), format);
                        });
                };
                this.formatRows().forEach(function (format, index) {
                    visit([index + 1], format);
                });
                return rows;
            };
            $mol_app_report.prototype.formatRow = function (pos) {
                var formatRows = this.formatRows();
                var next = null;
                for (var _i = 0, pos_1 = pos; _i < pos_1.length; _i++) {
                    var index = pos_1[_i];
                    next = formatRows[index - 1];
                    formatRows = next.childs;
                }
                return next;
            };
            $mol_app_report.prototype.rowerCells = function (pos) {
                var formatRow = this.formatRow(pos);
                return [
                    this.celler(pos.concat(0)),
                    this.celler(pos.concat(1)),
                    formatRow.field ? this.celler(pos.concat(2)) : null,
                    formatRow.field ? this.celler(pos.concat(3)) : null,
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
            $mol_app_report.prototype.cellContent = function (pos) {
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
            $mol_app_report.prototype.cellValue = function (pos, next) {
                if (next !== void 0)
                    return next;
                if (pos[0] === 0) {
                    return this.formatCols()[pos[1]].title;
                }
                var col = pos[pos.length - 1];
                switch (col) {
                    case 0: return pos.slice(0, pos.length - 1).join('.');
                    case 1: return this.cellContentName(pos.slice(0, pos.length - 1));
                    case 2: return this.cellContentType(pos.slice(0, pos.length - 1));
                    case 3: return this.cellContentValue(pos.slice(0, pos.length - 1));
                }
                return '';
            };
            $mol_app_report.prototype.cellContentName = function (pos) {
                var formatRow = this.formatRow(pos);
                return formatRow.title;
            };
            $mol_app_report.prototype.cellContentType = function (pos) {
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
            $mol_app_report.prototype.cellContentValue = function (pos) {
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
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_report.prototype, "cellContent", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_report.prototype, "cellValue", null);
            return $mol_app_report;
        }($.$mol_app_report));
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_signup.prototype.nameFirstLabel = function () {
            return this.localizedText("nameFirstLabel");
        };
        $mol_app_signup.prototype.nameFirstErrors = function () {
            return [];
        };
        $mol_app_signup.prototype.nameFirstHint = function () {
            return this.localizedText("nameFirstHint");
        };
        $mol_app_signup.prototype.nameFirst = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_signup.prototype.nameFirstControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.nameFirstHint(); };
                obj.value = function (next, prev) { return _this.nameFirst(next, prev); };
            });
        };
        $mol_app_signup.prototype.nameFirstField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.nameFirstLabel(); };
                obj.errors = function () { return _this.nameFirstErrors(); };
                obj.control = function () { return _this.nameFirstControl(); };
            });
        };
        $mol_app_signup.prototype.nameNickLabel = function () {
            return this.localizedText("nameNickLabel");
        };
        $mol_app_signup.prototype.nameNickErrors = function () {
            return [];
        };
        $mol_app_signup.prototype.nameNickHint = function () {
            return this.localizedText("nameNickHint");
        };
        $mol_app_signup.prototype.nameNick = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_signup.prototype.nameNickControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.nameNickHint(); };
                obj.value = function (next, prev) { return _this.nameNick(next, prev); };
            });
        };
        $mol_app_signup.prototype.nameNickField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.nameNickLabel(); };
                obj.errors = function () { return _this.nameNickErrors(); };
                obj.control = function () { return _this.nameNickControl(); };
            });
        };
        $mol_app_signup.prototype.nameSecondLabel = function () {
            return this.localizedText("nameSecondLabel");
        };
        $mol_app_signup.prototype.nameSecondErrors = function () {
            return [];
        };
        $mol_app_signup.prototype.nameSecondHint = function () {
            return this.localizedText("nameSecondHint");
        };
        $mol_app_signup.prototype.nameSecond = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_signup.prototype.nameSecondControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.nameSecondHint(); };
                obj.value = function (next, prev) { return _this.nameSecond(next, prev); };
            });
        };
        $mol_app_signup.prototype.nameSecondField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.nameSecondLabel(); };
                obj.errors = function () { return _this.nameSecondErrors(); };
                obj.control = function () { return _this.nameSecondControl(); };
            });
        };
        $mol_app_signup.prototype.sexLabel = function () {
            return this.localizedText("sexLabel");
        };
        $mol_app_signup.prototype.sexErrors = function () {
            return [];
        };
        $mol_app_signup.prototype.sex = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_signup.prototype.sexOptionMale = function () {
            return this.localizedText("sexOptionMale");
        };
        $mol_app_signup.prototype.sexOptionIntersex = function () {
            return this.localizedText("sexOptionIntersex");
        };
        $mol_app_signup.prototype.sexOptionFemale = function () {
            return this.localizedText("sexOptionFemale");
        };
        $mol_app_signup.prototype.sexOptions = function () {
            var _this = this;
            return ({
                "male": function () { return _this.sexOptionMale(); },
                "intersex": function () { return _this.sexOptionIntersex(); },
                "female": function () { return _this.sexOptionFemale(); },
            });
        };
        $mol_app_signup.prototype.sexControl = function (next, prev) {
            var _this = this;
            return new $.$mol_switcher().setup(function (obj) {
                obj.value = function (next, prev) { return _this.sex(next, prev); };
                obj.options = function () { return _this.sexOptions(); };
            });
        };
        $mol_app_signup.prototype.sexField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.sexLabel(); };
                obj.errors = function () { return _this.sexErrors(); };
                obj.control = function () { return [].concat(_this.sexControl()); };
            });
        };
        $mol_app_signup.prototype.formFields = function () {
            return [].concat(this.nameFirstField(), this.nameNickField(), this.nameSecondField(), this.sexField());
        };
        $mol_app_signup.prototype.submitText = function () {
            return this.localizedText("submitText");
        };
        $mol_app_signup.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_signup.prototype.submit = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitText()); };
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_signup.prototype.buttons = function () {
            return [].concat(this.submit());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameFirst", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameFirstControl", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameFirstField", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameNick", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameNickControl", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameNickField", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameSecond", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameSecondControl", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "nameSecondField", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "sex", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "sexControl", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "sexField", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_signup.prototype, "submit", null);
        return $mol_app_signup;
    }($.$mol_form));
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
                _super.apply(this, arguments);
            }
            $mol_app_signup.prototype.nameFirst = function (next) {
                return $.$mol_state_local.value(this.stateKey('nameFirst'), next) || '';
            };
            $mol_app_signup.prototype.nameFirstErrors = function () {
                return this.nameFirst() ? [] : ['Input required'];
            };
            $mol_app_signup.prototype.nameNick = function (next) {
                return $.$mol_state_local.value(this.stateKey('nameNick'), next) || '';
            };
            $mol_app_signup.prototype.nameSecond = function (next) {
                return $.$mol_state_local.value(this.stateKey('nameSecond'), next) || '';
            };
            $mol_app_signup.prototype.nameSecondErrors = function () {
                var value = this.nameSecond();
                if (value.length === 0)
                    return ['Input required'];
                var errors = [];
                if (value.length < 3)
                    errors.push('More then 2 letter required');
                if (value.indexOf(' ') !== -1)
                    errors.push('Spaces are forbidden');
                return errors;
            };
            $mol_app_signup.prototype.sex = function (next) {
                return $.$mol_state_local.value(this.stateKey('sex'), next) || '';
            };
            $mol_app_signup.prototype.sexErrors = function () {
                return this.sex() ? [] : ['Input required'];
            };
            $mol_app_signup.prototype.eventSubmit = function (next) {
                alert("Hello, " + this.sex() + " " + this.nameFirst() + " (" + this.nameNick() + ") " + this.nameSecond() + "!");
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
    var $mol_app_signup_dmeo = (function (_super) {
        __extends($mol_app_signup_dmeo, _super);
        function $mol_app_signup_dmeo() {
            _super.apply(this, arguments);
        }
        return $mol_app_signup_dmeo;
    }($.$mol_app_signup));
    $.$mol_app_signup_dmeo = $mol_app_signup_dmeo;
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
    var $mol_carder = (function (_super) {
        __extends($mol_carder, _super);
        function $mol_carder() {
            _super.apply(this, arguments);
        }
        $mol_carder.prototype.status = function () {
            return "";
        };
        $mol_carder.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_carder_status": function () { return _this.status(); },
            });
        };
        $mol_carder.prototype.content = function () {
            return null;
        };
        $mol_carder.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_carder.prototype.statusText = function () {
            return this.status();
        };
        $mol_carder.prototype.statuser = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.statusText()); };
            });
        };
        $mol_carder.prototype.rows = function () {
            return [].concat(this.contenter(), this.statuser());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_carder.prototype, "contenter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_carder.prototype, "statuser", null);
        return $mol_carder;
    }($.$mol_lister));
    $.$mol_carder = $mol_carder;
})($ || ($ = {}));
//carder.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_labeler.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.childs = function () {
            return [].concat(this.titler(), this.contenter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_labeler.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_labeler.prototype, "contenter", null);
        return $mol_labeler;
    }($.$mol_viewer));
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
    var $mol_coster = (function (_super) {
        __extends($mol_coster, _super);
        function $mol_coster() {
            _super.apply(this, arguments);
        }
        $mol_coster.prototype.value = function () {
            return null;
        };
        $mol_coster.prototype.prefix = function () {
            return "";
        };
        $mol_coster.prototype.prefixer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_coster.prototype.valueView = function () {
            return "";
        };
        $mol_coster.prototype.mainer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.valueView()); };
            });
        };
        $mol_coster.prototype.postfix = function () {
            return "";
        };
        $mol_coster.prototype.postfixer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_coster.prototype.childs = function () {
            return [].concat(this.prefixer(), this.mainer(), this.postfixer());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "prefixer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "mainer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coster.prototype, "postfixer", null);
        return $mol_coster;
    }($.$mol_viewer));
    $.$mol_coster = $mol_coster;
})($ || ($ = {}));
//coster.view.tree.js.map
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
        var $mol_coster = (function (_super) {
            __extends($mol_coster, _super);
            function $mol_coster() {
                _super.apply(this, arguments);
            }
            $mol_coster.prototype.value = function () {
                return null;
            };
            $mol_coster.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_coster.prototype.valueView = function () {
                return this.value().valueView();
            };
            $mol_coster.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_coster;
        }($.$mol_coster));
        $mol.$mol_coster = $mol_coster;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//coster.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_payMethod = (function (_super) {
        __extends($mol_app_supplies_domain_payMethod, _super);
        function $mol_app_supplies_domain_payMethod() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_payMethod.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_payMethod.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_payMethod;
    }($.$mol_object));
    $.$mol_app_supplies_domain_payMethod = $mol_app_supplies_domain_payMethod;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supplyMoment = function () { return void 0; };
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_attachment.prototype.urlThumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.urlLoad = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballanceUnit = (function (_super) {
        __extends($mol_app_supplies_domain_ballanceUnit, _super);
        function $mol_app_supplies_domain_ballanceUnit() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_ballanceUnit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballanceUnit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballanceUnit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballanceUnit = $mol_app_supplies_domain_ballanceUnit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next, prev) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballanceUnit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.payMethod = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_supply.prototype, "status", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status;
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            _super.apply(this, arguments);
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
        $mol_app_supplies_domain_mock.prototype.supplyStatus = function (id, next) {
            return next || $.$mol_stub_selectRandom([
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
                obj.status = function (next) { return _this.supplyStatus(id, next); };
                obj.provider = $.$mol_const(_this.provider($.$mol_stub_code(2)));
                obj.consumer = $.$mol_const(_this.consumer($.$mol_stub_code(2)));
                obj.group = $.$mol_const(_this.supplyGroup($.$mol_stub_code(2)));
                obj.contract = $.$mol_const(_this.contract($.$mol_stub_code(8)));
                obj.manager = $.$mol_const(_this.person($.$mol_stub_code(2)));
                obj.ballanceUnit = $.$mol_const(_this.ballanceUnit($.$mol_stub_code(2)));
                obj.payMethod = $.$mol_const(_this.payMethod($.$mol_stub_code(1)));
                obj.debitor = $.$mol_const(_this.debitor($.$mol_stub_code(2)));
                obj.positions = function () { return _this.positions(id); };
                obj.attachments = function (next) { return _this.attachments(id, next); };
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return new $mol_app_supplies_domain_provider().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return new $mol_app_supplies_domain_consumer().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballanceUnit = function (id) {
            return new $mol_app_supplies_domain_ballanceUnit().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_selectRandom([
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
        $mol_app_supplies_domain_mock.prototype.supplyGroup = function (id) {
            return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_personName() + ' Group');
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
                obj.name = $.$mol_const($.$mol_stub_personName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
            });
        };
        $mol_app_supplies_domain_mock.prototype.payMethod = function (id) {
            return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_selectRandom(['Accounting', 'Cash']));
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return new $mol_app_supplies_domain_payMethod().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_companyName());
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
                obj.name = $.$mol_const($.$mol_stub_productName());
                obj.supplyMoment = $.$mol_const($.$mol_stub_time(60 * 24 * 365));
                obj.store = $.$mol_const(_this.store($.$mol_stub_code(2)));
                obj.division = $.$mol_const(_this.division($.$mol_stub_code(2)));
                obj.price = $.$mol_const($.$mol_stub_price(1000));
                obj.quantity = $.$mol_const(Math.round(Math.random() * 30));
                obj.cost = $.$mol_const(obj.price().mult(obj.quantity()));
            });
        };
        $mol_app_supplies_domain_mock.prototype.attachments = function (id, next, prev) {
            return next || [];
        };
        $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
            return new $mol_app_supplies_domain_attachment().setup(function (obj) {
                obj.urlThumb = obj.urlLoad = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "positions", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "supplyStatus", null);
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
        ], $mol_app_supplies_domain_mock.prototype, "ballanceUnit", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "division", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_domain_mock.prototype, "supplyGroup", null);
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
        ], $mol_app_supplies_domain_mock.prototype, "payMethod", null);
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
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
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
    var $mol_app_supplies_carder = (function (_super) {
        __extends($mol_app_supplies_carder, _super);
        function $mol_app_supplies_carder() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_carder.prototype.heightMinimal = function () {
            return 100;
        };
        $mol_app_supplies_carder.prototype.arg = function () {
            return ({});
        };
        $mol_app_supplies_carder.prototype.linker = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return _this.arg(); };
            });
        };
        $mol_app_supplies_carder.prototype.childs = function () {
            return [].concat(this.contenter(), this.statuser(), this.linker());
        };
        $mol_app_supplies_carder.prototype.codeTitle = function () {
            return this.localizedText("codeTitle");
        };
        $mol_app_supplies_carder.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.codeItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.codeTitle(); };
                obj.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_carder.prototype.costTitle = function () {
            return this.localizedText("costTitle");
        };
        $mol_app_supplies_carder.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_carder.prototype.coster = function (next, prev) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_carder.prototype.costItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costTitle(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_carder.prototype.providerTitle = function () {
            return this.localizedText("providerTitle");
        };
        $mol_app_supplies_carder.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_carder.prototype.providerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.providerTitle(); };
                obj.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_carder.prototype.items = function () {
            return [].concat(this.codeItem(), this.costItem(), this.providerItem());
        };
        $mol_app_supplies_carder.prototype.grouper = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_carder.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "linker", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "codeItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "providerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder.prototype, "grouper", null);
        return $mol_app_supplies_carder;
    }($.$mol_carder));
    $.$mol_app_supplies_carder = $mol_app_supplies_carder;
})($ || ($ = {}));
//carder.view.tree.js.map
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
        var $mol_app_supplies_carder = (function (_super) {
            __extends($mol_app_supplies_carder, _super);
            function $mol_app_supplies_carder() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_carder.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_carder.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_carder.prototype.providerName = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_carder.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_carder.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_carder;
        }($.$mol_app_supplies_carder));
        $mol.$mol_app_supplies_carder = $mol_app_supplies_carder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//carder.view.js.map
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
    var $mol_app_supplies_carder_demo_pending = (function (_super) {
        __extends($mol_app_supplies_carder_demo_pending, _super);
        function $mol_app_supplies_carder_demo_pending() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_pending.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_carder_demo_pending.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_pending.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1000000; };
            });
        };
        $mol_app_supplies_carder_demo_pending.prototype.status = function () {
            return "pending";
        };
        $mol_app_supplies_carder_demo_pending.prototype.arg = function () {
            return ({
                "supply": function () { return "1"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_pending.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_pending;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_pending = $mol_app_supplies_carder_demo_pending;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_supplies_carder_demo_approved = (function (_super) {
        __extends($mol_app_supplies_carder_demo_approved, _super);
        function $mol_app_supplies_carder_demo_approved() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_approved.prototype.code = function () {
            return "43434232";
        };
        $mol_app_supplies_carder_demo_approved.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_approved.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 3000000; };
            });
        };
        $mol_app_supplies_carder_demo_approved.prototype.status = function () {
            return "approved";
        };
        $mol_app_supplies_carder_demo_approved.prototype.arg = function () {
            return ({
                "supply": function () { return "2"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_approved.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_approved;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_approved = $mol_app_supplies_carder_demo_approved;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_supplies_carder_demo_selected = (function (_super) {
        __extends($mol_app_supplies_carder_demo_selected, _super);
        function $mol_app_supplies_carder_demo_selected() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_carder_demo_selected.prototype.code = function () {
            return "327836275";
        };
        $mol_app_supplies_carder_demo_selected.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_carder_demo_selected.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 900000; };
            });
        };
        $mol_app_supplies_carder_demo_selected.prototype.status = function () {
            return "selected";
        };
        $mol_app_supplies_carder_demo_selected.prototype.arg = function () {
            return ({
                "supply": function () { return "3"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_carder_demo_selected.prototype, "cost", null);
        return $mol_app_supplies_carder_demo_selected;
    }($.$mol_app_supplies_carder));
    $.$mol_app_supplies_carder_demo_selected = $mol_app_supplies_carder_demo_selected;
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_enter.prototype.entered = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return this.localizedText("loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.login = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.login(next, prev); };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return this.localizedText("passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.password = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.password(next, prev); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return this.localizedText("submitLabel");
        };
        $mol_app_supplies_enter.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_supplies_enter.prototype.submitBlocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function (next, prev) {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.formFields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.childs = function () {
            return [].concat(this.form());
        };
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
        ], $mol_app_supplies_enter.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_enter.prototype, "submit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_enter.prototype, "form", null);
        return $mol_app_supplies_enter;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_app_supplies_enter.prototype.eventSubmit = function () {
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
    var $mol_app_supplies_lister = (function (_super) {
        __extends($mol_app_supplies_lister, _super);
        function $mol_app_supplies_lister() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_lister.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_lister.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_lister.prototype.searcherHint = function () {
            return this.localizedText("searcherHint");
        };
        $mol_app_supplies_lister.prototype.searchQuery = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_lister.prototype.searcher = function (next, prev) {
            var _this = this;
            return new $.$mol_coder().setup(function (obj) {
                obj.hint = function () { return _this.searcherHint(); };
                obj.value = function (next, prev) { return _this.searchQuery(next, prev); };
            });
        };
        $mol_app_supplies_lister.prototype.searchPanel = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.searcher()); };
            });
        };
        $mol_app_supplies_lister.prototype.childs = function () {
            return [].concat(this.header(), this.searchPanel(), this.bodier());
        };
        $mol_app_supplies_lister.prototype.supplyRows = function () {
            return [];
        };
        $mol_app_supplies_lister.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.supplyRows(); };
            });
        };
        $mol_app_supplies_lister.prototype.body = function () {
            return [].concat(this.lister());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searchQuery", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searcher", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "searchPanel", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_lister.prototype, "lister", null);
        return $mol_app_supplies_lister;
    }($.$mol_pager));
    $.$mol_app_supplies_lister = $mol_app_supplies_lister;
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
        var $mol_app_supplies_lister = (function (_super) {
            __extends($mol_app_supplies_lister, _super);
            function $mol_app_supplies_lister() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_lister.prototype.requests = function () {
                return [];
            };
            $mol_app_supplies_lister.prototype.supplyRows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.supplyRow(index); });
            };
            $mol_app_supplies_lister.prototype.supplyRow = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_carder().setup(function (obj) {
                    obj.supply = function () { return _this.supplies()[index]; };
                    obj.arg = function () { return ({
                        supply: function () { return _this.supplies()[index].id(); },
                        side: function () { return null; }
                    }); };
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_lister.prototype, "supplyRows", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_lister.prototype, "supplyRow", null);
            return $mol_app_supplies_lister;
        }($.$mol_app_supplies_lister));
        $mol.$mol_app_supplies_lister = $mol_app_supplies_lister;
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
    var $mol_decker = (function (_super) {
        __extends($mol_decker, _super);
        function $mol_decker() {
            _super.apply(this, arguments);
        }
        $mol_decker.prototype.items = function () {
            return [];
        };
        $mol_decker.prototype.current = function (next, prev) {
            return (next !== void 0) ? next : "0";
        };
        $mol_decker.prototype.switcherOptions = function () {
            return ({});
        };
        $mol_decker.prototype.switcher = function (next, prev) {
            var _this = this;
            return new $.$mol_switcher().setup(function (obj) {
                obj.value = function (next, prev) { return _this.current(next, prev); };
                obj.options = function () { return _this.switcherOptions(); };
            });
        };
        $mol_decker.prototype.content = function () {
            return null;
        };
        $mol_decker.prototype.rows = function () {
            return [].concat(this.switcher(), this.content());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_decker.prototype, "current", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker.prototype, "switcher", null);
        return $mol_decker;
    }($.$mol_lister));
    $.$mol_decker = $mol_decker;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_decker_item = (function (_super) {
        __extends($mol_decker_item, _super);
        function $mol_decker_item() {
            _super.apply(this, arguments);
        }
        $mol_decker_item.prototype.title = function () {
            return "";
        };
        $mol_decker_item.prototype.content = function () {
            return null;
        };
        return $mol_decker_item;
    }($.$mol_object));
    $.$mol_decker_item = $mol_decker_item;
})($ || ($ = {}));
//decker.view.tree.js.map
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
        var $mol_decker = (function (_super) {
            __extends($mol_decker, _super);
            function $mol_decker() {
                _super.apply(this, arguments);
            }
            $mol_decker.prototype.current = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.current()', next) || '0';
            };
            $mol_decker.prototype.switcherOptions = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = function () { return item.title(); };
                });
                return options;
            };
            $mol_decker.prototype.content = function () {
                return this.items()[this.current()].content();
            };
            __decorate([
                $.$mol_mem()
            ], $mol_decker.prototype, "content", null);
            return $mol_decker;
        }($.$mol_decker));
        $mol.$mol_decker = $mol_decker;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//decker.view.js.map
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
    var $mol_sectioner = (function (_super) {
        __extends($mol_sectioner, _super);
        function $mol_sectioner() {
            _super.apply(this, arguments);
        }
        $mol_sectioner.prototype.head = function () {
            return null;
        };
        $mol_sectioner.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_sectioner.prototype.content = function () {
            return null;
        };
        $mol_sectioner.prototype.rows = function () {
            return [].concat(this.header(), this.content());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_sectioner.prototype, "header", null);
        return $mol_sectioner;
    }($.$mol_lister));
    $.$mol_sectioner = $mol_sectioner;
})($ || ($ = {}));
//sectioner.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_tiler.prototype.items = function () {
            return [];
        };
        $mol_tiler.prototype.childs = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
            }
            $mol_tiler.prototype.childs = function () {
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
                return new $.$mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $.$mol_viewer().setup(function (obj) {
                    obj.childs = function () { return _this.groupItems(path); };
                });
            };
            __decorate([
                $.$mol_mem()
            ], $mol_tiler.prototype, "childs", null);
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
            return $mol_tiler;
        }($.$mol_tiler));
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
            _super.apply(this, arguments);
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
    var $mol_attacher = (function (_super) {
        __extends($mol_attacher, _super);
        function $mol_attacher() {
            _super.apply(this, arguments);
        }
        $mol_attacher.prototype.items = function (next, prev) {
            return (next !== void 0) ? next : [];
        };
        $mol_attacher.prototype.attachNew = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher.prototype.adder = function (next, prev) {
            var _this = this;
            return new $.$mol_attacher_adder().setup(function (obj) {
                obj.fileNew = function (next, prev) { return _this.attachNew(next, prev); };
            });
        };
        $mol_attacher.prototype.content = function (next, prev) {
            return (next !== void 0) ? next : [].concat(this.items(next, prev), this.adder());
        };
        $mol_attacher.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_tiler().setup(function (obj) {
                obj.items = function () { return _this.content(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "items", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "attachNew", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "adder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher.prototype, "contenter", null);
        return $mol_attacher;
    }($.$mol_carder));
    $.$mol_attacher = $mol_attacher;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_item = (function (_super) {
        __extends($mol_attacher_item, _super);
        function $mol_attacher_item() {
            _super.apply(this, arguments);
        }
        $mol_attacher_item.prototype.urlThumb = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher_item.prototype.urlLoad = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_attacher_item.prototype.uri = function (next, prev) {
            return this.urlLoad(next, prev);
        };
        $mol_attacher_item.prototype.styleBG = function () {
            return "";
        };
        $mol_attacher_item.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.backgroundImage": function () { return _this.styleBG(); },
            });
        };
        $mol_attacher_item.prototype.loadable = function () {
            return true;
        };
        $mol_attacher_item.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "download": function () { return _this.loadable(); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_item.prototype, "urlThumb", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_item.prototype, "urlLoad", null);
        return $mol_attacher_item;
    }($.$mol_linker));
    $.$mol_attacher_item = $mol_attacher_item;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_adder = (function (_super) {
        __extends($mol_attacher_adder, _super);
        function $mol_attacher_adder() {
            _super.apply(this, arguments);
        }
        $mol_attacher_adder.prototype.tagName = function () {
            return "div";
        };
        $mol_attacher_adder.prototype.fileNew = function () {
            return "";
        };
        $mol_attacher_adder.prototype.icon = function (next, prev) {
            return new $.$mol_icon_attach();
        };
        $mol_attacher_adder.prototype.eventCapture = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder.prototype.eventPicked = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder.prototype.input = function (next, prev) {
            var _this = this;
            return new $.$mol_attacher_adder_input().setup(function (obj) {
                obj.eventCapture = function (next, prev) { return _this.eventCapture(next, prev); };
                obj.eventPicked = function (next, prev) { return _this.eventPicked(next, prev); };
            });
        };
        $mol_attacher_adder.prototype.childs = function () {
            return [].concat(this.icon(), this.input());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "icon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "eventCapture", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "eventPicked", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder.prototype, "input", null);
        return $mol_attacher_adder;
    }($.$mol_clicker));
    $.$mol_attacher_adder = $mol_attacher_adder;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_adder_input = (function (_super) {
        __extends($mol_attacher_adder_input, _super);
        function $mol_attacher_adder_input() {
            _super.apply(this, arguments);
        }
        $mol_attacher_adder_input.prototype.tagName = function () {
            return "input";
        };
        $mol_attacher_adder_input.prototype.type = function () {
            return "file";
        };
        $mol_attacher_adder_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attacher_adder_input.prototype.multiple = function () {
            return true;
        };
        $mol_attacher_adder_input.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "type": function () { return _this.type(); },
                "accept": function () { return _this.accept(); },
                "multiple": function () { return _this.multiple(); },
            });
        };
        $mol_attacher_adder_input.prototype.eventCapture = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder_input.prototype.eventClick = function (next, prev) {
            return this.eventCapture(next, prev);
        };
        $mol_attacher_adder_input.prototype.eventPicked = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_attacher_adder_input.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "change": function (next, prev) { return _this.eventPicked(next, prev); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder_input.prototype, "eventCapture", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_adder_input.prototype, "eventPicked", null);
        return $mol_attacher_adder_input;
    }($.$mol_viewer));
    $.$mol_attacher_adder_input = $mol_attacher_adder_input;
})($ || ($ = {}));
//attacher.view.tree.js.map
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
        var $mol_attacher = (function (_super) {
            __extends($mol_attacher, _super);
            function $mol_attacher() {
                _super.apply(this, arguments);
            }
            $mol_attacher.prototype.attachNew = function (next) {
                var items = this.items();
                var itemer = this.itemer(items.length);
                itemer.urlThumb(next);
                itemer.urlLoad(next);
                this.items(items.concat(itemer));
                return void 0;
            };
            $mol_attacher.prototype.itemer = function (id) {
                return new $mol_attacher_item();
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_attacher.prototype, "itemer", null);
            return $mol_attacher;
        }($.$mol_attacher));
        $mol.$mol_attacher = $mol_attacher;
        var $mol_attacher_item = (function (_super) {
            __extends($mol_attacher_item, _super);
            function $mol_attacher_item() {
                _super.apply(this, arguments);
            }
            $mol_attacher_item.prototype.styleBG = function () {
                return "url(\"" + this.urlThumb() + "\")";
            };
            return $mol_attacher_item;
        }($.$mol_attacher_item));
        $mol.$mol_attacher_item = $mol_attacher_item;
        var $mol_attacher_adder = (function (_super) {
            __extends($mol_attacher_adder, _super);
            function $mol_attacher_adder() {
                _super.apply(this, arguments);
            }
            $mol_attacher_adder.prototype.fileNew = function (next) {
                return next;
            };
            $mol_attacher_adder.prototype.eventCapture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.fileNew(url);
                }, function (error) {
                    _this.fileNew(error);
                }, {
                    quality: 50
                });
            };
            $mol_attacher_adder.prototype.eventPicked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.fileNew(URL.createObjectURL(file));
                }
            };
            return $mol_attacher_adder;
        }($.$mol_attacher_adder));
        $mol.$mol_attacher_adder = $mol_attacher_adder;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//attacher.view.js.map
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
    var $mol_app_supplies_detailer = (function (_super) {
        __extends($mol_app_supplies_detailer, _super);
        function $mol_app_supplies_detailer() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_detailer.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detailer.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_detailer.prototype.backer_icon = function (next, prev) {
            return new $.$mol_icon_chevron();
        };
        $mol_app_supplies_detailer.prototype.backArg = function () {
            return ({
                "side": function () { return ""; },
                "supply": function () { return null; },
            });
        };
        $mol_app_supplies_detailer.prototype.backer = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.backer_icon()); };
                obj.arg = function () { return _this.backArg(); };
            });
        };
        $mol_app_supplies_detailer.prototype.head = function () {
            return [].concat(this.backer(), this.titler());
        };
        $mol_app_supplies_detailer.prototype.orgLabel = function () {
            return this.localizedText("orgLabel");
        };
        $mol_app_supplies_detailer.prototype.providerLabel = function () {
            return this.localizedText("providerLabel");
        };
        $mol_app_supplies_detailer.prototype.providerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.providerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.providerLabel(); };
                obj.content = function () { return _this.providerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.customerLabel = function () {
            return this.localizedText("customerLabel");
        };
        $mol_app_supplies_detailer.prototype.consumerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.consumerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.customerLabel(); };
                obj.content = function () { return _this.consumerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.supplyGroupLabel = function () {
            return this.localizedText("supplyGroupLabel");
        };
        $mol_app_supplies_detailer.prototype.supplyGroupName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.supplyGroupItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supplyGroupLabel(); };
                obj.content = function () { return _this.supplyGroupName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitLabel = function () {
            return this.localizedText("ballanceUnitLabel");
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.ballanceUnitItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.ballanceUnitLabel(); };
                obj.content = function () { return _this.ballanceUnitName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItems = function () {
            return [].concat(this.providerItem(), this.consumerItem(), this.supplyGroupItem(), this.ballanceUnitItem());
        };
        $mol_app_supplies_detailer.prototype.orgContent = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.orgItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.orgItem = function (next, prev) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.orgLabel(); };
                obj.content = function () { return _this.orgContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consLabel = function () {
            return this.localizedText("consLabel");
        };
        $mol_app_supplies_detailer.prototype.contractLabel = function () {
            return this.localizedText("contractLabel");
        };
        $mol_app_supplies_detailer.prototype.contractId = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.contractItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.contractLabel(); };
                obj.content = function () { return _this.contractId(); };
            });
        };
        $mol_app_supplies_detailer.prototype.payMethodLabel = function () {
            return this.localizedText("payMethodLabel");
        };
        $mol_app_supplies_detailer.prototype.payMethodName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.payMethodItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.payMethodLabel(); };
                obj.content = function () { return _this.payMethodName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.managerLabel = function () {
            return this.localizedText("managerLabel");
        };
        $mol_app_supplies_detailer.prototype.managerName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.managerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.managerLabel(); };
                obj.content = function () { return _this.managerName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.debitodLabel = function () {
            return this.localizedText("debitodLabel");
        };
        $mol_app_supplies_detailer.prototype.debitorName = function () {
            return "";
        };
        $mol_app_supplies_detailer.prototype.debitorItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.debitodLabel(); };
                obj.content = function () { return _this.debitorName(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItems = function () {
            return [].concat(this.contractItem(), this.payMethodItem(), this.managerItem(), this.debitorItem());
        };
        $mol_app_supplies_detailer.prototype.consContent = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.consItems(); };
            });
        };
        $mol_app_supplies_detailer.prototype.consItem = function (next, prev) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.consLabel(); };
                obj.content = function () { return _this.consContent(); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrDecker = function (next, prev) {
            var _this = this;
            return new $.$mol_decker().setup(function (obj) {
                obj.items = function () { return [].concat(_this.orgItem(), _this.consItem()); };
            });
        };
        $mol_app_supplies_detailer.prototype.descrCarder = function (next, prev) {
            var _this = this;
            return new $.$mol_carder().setup(function (obj) {
                obj.content = function () { return _this.descrDecker(); };
            });
        };
        $mol_app_supplies_detailer.prototype.attachTitle = function () {
            return this.localizedText("attachTitle");
        };
        $mol_app_supplies_detailer.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detailer.prototype.attachNew = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_supplies_detailer.prototype.attacher = function (next, prev) {
            var _this = this;
            return new $.$mol_attacher().setup(function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attachNew = function (next, prev) { return _this.attachNew(next, prev); };
            });
        };
        $mol_app_supplies_detailer.prototype.attachCarder = function (next, prev) {
            var _this = this;
            return new $.$mol_sectioner().setup(function (obj) {
                obj.head = function () { return _this.attachTitle(); };
                obj.content = function () { return _this.attacher(); };
            });
        };
        $mol_app_supplies_detailer.prototype.positionsTitle = function () {
            return this.localizedText("positionsTitle");
        };
        $mol_app_supplies_detailer.prototype.costLabel = function () {
            return this.localizedText("costLabel");
        };
        $mol_app_supplies_detailer.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detailer.prototype.coster = function (next, prev) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detailer.prototype.costItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costLabel(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_detailer.prototype.posListerHead = function () {
            return [].concat(this.positionsTitle(), this.costItem());
        };
        $mol_app_supplies_detailer.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detailer.prototype.posLister = function (next, prev) {
            var _this = this;
            return new $.$mol_sectioner().setup(function (obj) {
                obj.head = function () { return _this.posListerHead(); };
                obj.content = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detailer.prototype.content = function () {
            return [].concat(this.descrCarder(), this.attachCarder(), this.posLister());
        };
        $mol_app_supplies_detailer.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detailer.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.contenter()); };
            });
        };
        $mol_app_supplies_detailer.prototype.body = function () {
            return [].concat(this.lister());
        };
        $mol_app_supplies_detailer.prototype.approved = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_detailer.prototype.approvedLabel = function () {
            return this.localizedText("approvedLabel");
        };
        $mol_app_supplies_detailer.prototype.approver = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.checked = function (next, prev) { return _this.approved(next, prev); };
                obj.label = function () { return [].concat(_this.approvedLabel()); };
            });
        };
        $mol_app_supplies_detailer.prototype.tools = function () {
            return [].concat(this.approver());
        };
        $mol_app_supplies_detailer.prototype.controller = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return _this.tools(); };
            });
        };
        $mol_app_supplies_detailer.prototype.foot = function () {
            return [].concat(this.controller());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "backer_icon", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "backer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "providerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consumerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "supplyGroupItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "ballanceUnitItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "orgContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "orgItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "contractItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "payMethodItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "managerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "debitorItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "consItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "descrDecker", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "descrCarder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attachNew", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attacher", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "attachCarder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "posLister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "contenter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "approved", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "approver", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer.prototype, "controller", null);
        return $mol_app_supplies_detailer;
    }($.$mol_pager));
    $.$mol_app_supplies_detailer = $mol_app_supplies_detailer;
})($ || ($ = {}));
//detailer.view.tree.js.map
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
    var $mol_app_supplies_positioner = (function (_super) {
        __extends($mol_app_supplies_positioner, _super);
        function $mol_app_supplies_positioner() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_positioner.prototype.heightMinimal = function () {
            return 51;
        };
        $mol_app_supplies_positioner.prototype.productLabel = function () {
            return this.localizedText("productLabel");
        };
        $mol_app_supplies_positioner.prototype.productName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.productItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.productLabel(); };
                obj.content = function () { return _this.productName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.costlabel = function () {
            return this.localizedText("costlabel");
        };
        $mol_app_supplies_positioner.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.coster = function (next, prev) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_positioner.prototype.costItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.costlabel(); };
                obj.content = function () { return _this.coster(); };
            });
        };
        $mol_app_supplies_positioner.prototype.mainGroup = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.productItem(), _this.costItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.divisionLabel = function () {
            return this.localizedText("divisionLabel");
        };
        $mol_app_supplies_positioner.prototype.divisionName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.divisionItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.divisionLabel(); };
                obj.content = function () { return _this.divisionName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.priceLabel = function () {
            return this.localizedText("priceLabel");
        };
        $mol_app_supplies_positioner.prototype.price = function (next, prev) {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_positioner.prototype.pricer = function (next, prev) {
            var _this = this;
            return new $.$mol_coster().setup(function (obj) {
                obj.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_positioner.prototype.priceItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.priceLabel(); };
                obj.content = function () { return _this.pricer(); };
            });
        };
        $mol_app_supplies_positioner.prototype.addonGroup = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.divisionItem(), _this.priceItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.quantityLabel = function () {
            return this.localizedText("quantityLabel");
        };
        $mol_app_supplies_positioner.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.quantityItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.quantityLabel(); };
                obj.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyDateLabel = function () {
            return this.localizedText("supplyDateLabel");
        };
        $mol_app_supplies_positioner.prototype.supplyDate = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.supplyDateItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supplyDateLabel(); };
                obj.content = function () { return _this.supplyDate(); };
            });
        };
        $mol_app_supplies_positioner.prototype.storeLabel = function () {
            return this.localizedText("storeLabel");
        };
        $mol_app_supplies_positioner.prototype.storeName = function () {
            return "";
        };
        $mol_app_supplies_positioner.prototype.storeItem = function (next, prev) {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.storeLabel(); };
                obj.content = function () { return _this.storeName(); };
            });
        };
        $mol_app_supplies_positioner.prototype.supplyGroup = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.quantityItem(), _this.supplyDateItem(), _this.storeItem()); };
            });
        };
        $mol_app_supplies_positioner.prototype.grouper = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.mainGroup(), _this.addonGroup(), _this.supplyGroup()); };
            });
        };
        $mol_app_supplies_positioner.prototype.content = function () {
            return this.grouper();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "productItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "coster", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "costItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "mainGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "divisionItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "price", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "pricer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "priceItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "addonGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "quantityItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "supplyDateItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "storeItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "supplyGroup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner.prototype, "grouper", null);
        return $mol_app_supplies_positioner;
    }($.$mol_carder));
    $.$mol_app_supplies_positioner = $mol_app_supplies_positioner;
})($ || ($ = {}));
//positioner.view.tree.js.map
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
        var $mol_app_supplies_positioner = (function (_super) {
            __extends($mol_app_supplies_positioner, _super);
            function $mol_app_supplies_positioner() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_positioner.prototype.position = function () {
                return null;
            };
            $mol_app_supplies_positioner.prototype.productName = function () {
                return this.position().name();
            };
            $mol_app_supplies_positioner.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_positioner.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_positioner.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_positioner.prototype.supplyDate = function () {
                return this.position().supplyMoment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_positioner.prototype.divisionName = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_positioner.prototype.storeName = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_positioner;
        }($.$mol_app_supplies_positioner));
        $mol.$mol_app_supplies_positioner = $mol_app_supplies_positioner;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//positioner.view.js.map
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
        var $mol_app_supplies_detailer = (function (_super) {
            __extends($mol_app_supplies_detailer, _super);
            function $mol_app_supplies_detailer() {
                _super.apply(this, arguments);
            }
            $mol_app_supplies_detailer.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detailer.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detailer.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detailer.prototype.providerName = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detailer.prototype.consumerName = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detailer.prototype.ballanceUnitName = function () {
                return this.supply().ballanceUnit().name();
            };
            $mol_app_supplies_detailer.prototype.supplyGroupName = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detailer.prototype.managerName = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detailer.prototype.payMethodName = function () {
                return this.supply().payMethod().name();
            };
            $mol_app_supplies_detailer.prototype.debitorName = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detailer.prototype.contractId = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detailer.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detailer.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detailer.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.position(index); });
            };
            $mol_app_supplies_detailer.prototype.position = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_positioner().setup(function (obj) {
                    obj.position = function () { return _this.supply().positions()[index]; };
                });
            };
            $mol_app_supplies_detailer.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.attachment(index); });
            };
            $mol_app_supplies_detailer.prototype.attachment = function (index) {
                var _this = this;
                return new $mol.$mol_attacher_item().setup(function (obj) {
                    obj.urlThumb = function () { return _this.supply().attachments()[index].urlThumb(); };
                    obj.urlLoad = function () { return _this.supply().attachments()[index].urlLoad(); };
                });
            };
            $mol_app_supplies_detailer.prototype.attachNew = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat(new $.$mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.urlThumb = obj.urlLoad = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detailer.prototype.bodier = function () {
                var _this = this;
                return new $mol.$mol_scroller().setup(function (obj) {
                    obj.childs = function () { return _this.body(); };
                    obj.scrollTop = function (next) { return _this.scrollTop(next); };
                });
            };
            $mol_app_supplies_detailer.prototype.scrollTop = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this.objectPath() + (".scrollTop(" + supplyId + ")"), next);
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_detailer.prototype, "position", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_supplies_detailer.prototype, "attachment", null);
            return $mol_app_supplies_detailer;
        }($.$mol_app_supplies_detailer));
        $mol.$mol_app_supplies_detailer = $mol_app_supplies_detailer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//detailer.view.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_supplies_root.prototype.entered = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_root.prototype.enter = function (next, prev) {
            var _this = this;
            return new $.$mol_app_supplies_enter().setup(function (obj) {
                obj.entered = function (next, prev) { return _this.entered(next, prev); };
            });
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.searchQuery = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_supplies_root.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_app_supplies_lister().setup(function (obj) {
                obj.supplies = function () { return _this.supplies(); };
                obj.searchQuery = function (next, prev) { return _this.searchQuery(next, prev); };
            });
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.detailer = function (next, prev) {
            var _this = this;
            return new $.$mol_app_supplies_detailer().setup(function (obj) {
                obj.supply = function () { return _this.supply(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "entered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "enter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "searchQuery", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "detailer", null);
        return $mol_app_supplies_root;
    }($.$mol_stacker));
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
                _super.apply(this, arguments);
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this.objectPath() + '.entered()', next) || false;
            };
            $mol_app_supplies_root.prototype.childs = function () {
                return [
                    this.entered()
                        ? this.mainer()
                        : null,
                    this.addoner()
                ];
            };
            $mol_app_supplies_root.prototype.main = function () {
                return this.supply()
                    ? [this.detailer()]
                    : null;
            };
            $mol_app_supplies_root.prototype.addon = function () {
                return this.entered()
                    ? [this.lister()]
                    : [this.enter()];
            };
            $mol_app_supplies_root.prototype.title = function () {
                return (this.main() || this.addon())[0].title();
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supplyId = function (next) {
                return $.$mol_state_arg.value(this.stateKey('supply'), next);
            };
            $mol_app_supplies_root.prototype.searchQuery = function (next) {
                if (!next)
                    return '';
                if (next.length < 7)
                    return next;
                this.supplyId(next);
                return '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supplyId();
                return id ? this.domain().supply(id) : null;
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_root.prototype, "domain", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_supplies_root.prototype, "searchQuery", null);
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
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
            _super.apply(this, arguments);
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
    var $mol_app_supplies_positioner_demo = (function (_super) {
        __extends($mol_app_supplies_positioner_demo, _super);
        function $mol_app_supplies_positioner_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_positioner_demo.prototype.productName = function () {
            return this.localizedText("productName");
        };
        $mol_app_supplies_positioner_demo.prototype.price = function (next, prev) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 1; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.quantity = function () {
            return "100";
        };
        $mol_app_supplies_positioner_demo.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money_usd().setup(function (obj) {
                obj.valueOf = function () { return 100; };
            });
        };
        $mol_app_supplies_positioner_demo.prototype.supplyDate = function () {
            return "2016-01-13";
        };
        $mol_app_supplies_positioner_demo.prototype.divisionName = function () {
            return this.localizedText("divisionName");
        };
        $mol_app_supplies_positioner_demo.prototype.storeName = function () {
            return this.localizedText("storeName");
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner_demo.prototype, "price", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_positioner_demo.prototype, "cost", null);
        return $mol_app_supplies_positioner_demo;
    }($.$mol_app_supplies_positioner));
    $.$mol_app_supplies_positioner_demo = $mol_app_supplies_positioner_demo;
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
    var $mol_app_supplies_detailer_demo = (function (_super) {
        __extends($mol_app_supplies_detailer_demo, _super);
        function $mol_app_supplies_detailer_demo() {
            _super.apply(this, arguments);
        }
        $mol_app_supplies_detailer_demo.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_supplies_detailer_demo.prototype.approved = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_supplies_detailer_demo.prototype.providerName = function () {
            return this.localizedText("providerName");
        };
        $mol_app_supplies_detailer_demo.prototype.cost = function (next, prev) {
            return new $.$mol_unit_money_rur().setup(function (obj) {
                obj.valueOf = function () { return 1234567; };
            });
        };
        $mol_app_supplies_detailer_demo.prototype.consumerName = function () {
            return this.localizedText("consumerName");
        };
        $mol_app_supplies_detailer_demo.prototype.supplyGroupName = function () {
            return this.localizedText("supplyGroupName");
        };
        $mol_app_supplies_detailer_demo.prototype.ballanceUnitName = function () {
            return this.localizedText("ballanceUnitName");
        };
        $mol_app_supplies_detailer_demo.prototype.contractId = function () {
            return "123675234";
        };
        $mol_app_supplies_detailer_demo.prototype.payMethodName = function () {
            return this.localizedText("payMethodName");
        };
        $mol_app_supplies_detailer_demo.prototype.managerName = function () {
            return this.localizedText("managerName");
        };
        $mol_app_supplies_detailer_demo.prototype.debitorName = function () {
            return this.localizedText("debitorName");
        };
        $mol_app_supplies_detailer_demo.prototype.pos1 = function (next, prev) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos2 = function (next, prev) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos3 = function (next, prev) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos4 = function (next, prev) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.pos5 = function (next, prev) {
            return new $.$mol_app_supplies_positioner_demo();
        };
        $mol_app_supplies_detailer_demo.prototype.positions = function () {
            return [].concat(this.pos1(), this.pos2(), this.pos3(), this.pos4(), this.pos5());
        };
        $mol_app_supplies_detailer_demo.prototype.attachments = function () {
            return [];
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "approved", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "cost", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos3", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos4", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_detailer_demo.prototype, "pos5", null);
        return $mol_app_supplies_detailer_demo;
    }($.$mol_app_supplies_detailer));
    $.$mol_app_supplies_detailer_demo = $mol_app_supplies_detailer_demo;
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
            _super.apply(this, arguments);
        }
        $mol_app_taxon.prototype.hierarhyField = function () {
            return "Butxt";
        };
        $mol_app_taxon.prototype.records = function () {
            return [];
        };
        $mol_app_taxon.prototype.record = function (key) {
            return null;
        };
        $mol_app_taxon.prototype.rows = function () {
            return [];
        };
        $mol_app_taxon.prototype.rowExpanded = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_taxon.prototype.rowLevel = function (key) {
            return 0;
        };
        $mol_app_taxon.prototype.grider = function (next, prev) {
            var _this = this;
            return new $.$mol_grider().setup(function (obj) {
                obj.hierarhyColumn = function () { return _this.hierarhyField(); };
                obj.records = function () { return _this.records(); };
                obj.record = function (key) { return _this.record(key); };
                obj.rows = function () { return _this.rows(); };
                obj.rowExpanded = function (key, next, prev) { return _this.rowExpanded(key, next, prev); };
                obj.rowLevel = function (key) { return _this.rowLevel(key); };
            });
        };
        $mol_app_taxon.prototype.body = function () {
            return [].concat(this.grider());
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_taxon.prototype, "rowExpanded", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_taxon.prototype, "grider", null);
        return $mol_app_taxon;
    }($.$mol_pager));
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
                _super.apply(this, arguments);
            }
            $mol_app_taxon.prototype.hierarhyUri = function () {
                return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_TREESet?$' + 'format=json';
            };
            $mol_app_taxon.prototype.hierarhy = function () {
                var resource = $.$mol_http_resource_json.item(this.hierarhyUri());
                resource.credentials = $.$mol_const({});
                var hierarhy = {};
                hierarhy[0] = {
                    id: 0,
                    parent: null,
                    childs: []
                };
                resource.json().d.results.forEach(function (row) {
                    var parent = hierarhy[row.ParentId];
                    var node = hierarhy[row.KeyId] = {
                        id: row.KeyId,
                        parent: parent,
                        childs: [],
                    };
                    parent.childs.push(node);
                });
                return hierarhy;
            };
            $mol_app_taxon.prototype.dataUri = function () {
                return 'http://justine.saprun.com:8000/sap/opu/odata/sap/ZTRNF_TEST_DATA_SRV/TRNF_DATASet?$' + 'format=json';
            };
            $mol_app_taxon.prototype.dataResource = function (id) {
                var uri = this.dataUri() + '&$' + 'filter=' + encodeURIComponent("KeyId eq " + id);
                var resource = $.$mol_http_resource_json.item(uri);
                resource.credentials = $.$mol_const({});
                return resource;
            };
            $mol_app_taxon.prototype.dataTable = function () {
                return [];
            };
            $mol_app_taxon.prototype.record = function (path) {
                var id = path[path.length - 1];
                if (!id)
                    return {};
                var cache = this.dataTable();
                if (cache[id])
                    return cache[id];
                var next = this.dataResource(id).json().d.results[0];
                delete next.__metadata;
                return cache[id] = next;
            };
            $mol_app_taxon.prototype.rowsSub = function (path) {
                return this.hierarhy()[path[path.length - 1]].childs.map(function (child) { return path.concat(child.id); });
            };
            $mol_app_taxon.prototype.rowRoot = function () {
                return [0];
            };
            $mol_app_taxon.prototype.rows = function () {
                var _this = this;
                var next = [];
                var add = function (path) {
                    next.push(path);
                    if (_this.branchExpanded(path)) {
                        _this.rowsSub(path).forEach(function (path) { return add(path); });
                    }
                };
                this.rowsSub(this.rowRoot()).forEach(function (path) { return add(path); });
                return next;
            };
            $mol_app_taxon.prototype.records = function () {
                var _this = this;
                var paths = this.rows();
                return new $.$mol_range_lazy({
                    length: paths.length,
                    item: function (index) { return _this.record(paths[index]); },
                });
            };
            $mol_app_taxon.prototype.branchExpanded = function (path, next) {
                if (!this.rowsSub(path).length)
                    return null;
                var key = "branchExpanded(" + JSON.stringify(path) + ")";
                var next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? false : next2;
            };
            $mol_app_taxon.prototype.rowLevel = function (id) {
                return id.row.length;
            };
            $mol_app_taxon.prototype.rowExpanded = function (id, next) {
                return this.branchExpanded(id.row, next);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_taxon.prototype, "hierarhy", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_taxon.prototype, "dataTable", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_taxon.prototype, "record", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_taxon.prototype, "rows", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_taxon.prototype, "records", null);
            return $mol_app_taxon;
        }($.$mol_app_taxon));
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
            _super.apply(this, arguments);
        }
        $mol_app_taxon_demo.prototype.hierarhyField = function () {
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
                _super.apply(this, arguments);
            }
            $mol_app_taxon_demo.prototype.hierarhy = function () {
                var dict = {};
                dict[0] = {
                    id: 0,
                    parent: null,
                    childs: []
                };
                for (var i = 1; i < 30000; ++i) {
                    var parent_1 = dict[Math.floor(Math.random() * i)];
                    var node = dict[i] = {
                        id: i,
                        parent: parent_1,
                        childs: [],
                    };
                    parent_1.childs.push(node);
                }
                return dict;
            };
            $mol_app_taxon_demo.prototype.record = function (path) {
                return {
                    name: $.$mol_stub_personName(),
                    age: Math.ceil(Math.random() * 50),
                    sex: $.$mol_stub_selectRandom(['male', 'female']),
                    sexPrefer: $.$mol_stub_selectRandom(['male', 'female']),
                    birthDay: $.$mol_stub_time(-60 * 24 * 365 * 50).toString('YYYY-MM-DD'),
                    birthCity: $.$mol_stub_city(),
                    deathDay: $.$mol_stub_time(60 * 24 * 365 * 50).toString('YYYY-MM-DD'),
                    deathCity: $.$mol_stub_city(),
                    cityWork: $.$mol_stub_city(),
                    company: $.$mol_stub_companyName(),
                    phoneOS: $.$mol_stub_selectRandom(['iOS', 'Android', 'Windows']),
                    fingersCount: 7 + Math.ceil(Math.random() * 3)
                };
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_taxon_demo.prototype, "hierarhy", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_taxon_demo.prototype, "record", null);
            return $mol_app_taxon_demo;
        }($.$mol_app_taxon_demo));
        $mol.$mol_app_taxon_demo = $mol_app_taxon_demo;
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
    var $mol_barer = (function (_super) {
        __extends($mol_barer, _super);
        function $mol_barer() {
            _super.apply(this, arguments);
        }
        return $mol_barer;
    }($.$mol_viewer));
    $.$mol_barer = $mol_barer;
})($ || ($ = {}));
//barer.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_app_todomvc.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_app_todomvc.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.heightMinimal = function () { return 142; };
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_app_todomvc.prototype.allCompleterEnabled = function () {
            return false;
        };
        $mol_app_todomvc.prototype.allCompleted = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_todomvc.prototype.allCompleter = function (next, prev) {
            var _this = this;
            return new $.$mol_checker().setup(function (obj) {
                obj.enabled = function () { return _this.allCompleterEnabled(); };
                obj.checked = function (next, prev) { return _this.allCompleted(next, prev); };
                obj.childs = function () { return [].concat("❯"); };
            });
        };
        $mol_app_todomvc.prototype.taskNewTitle = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_todomvc.prototype.eventAdd = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_todomvc.prototype.adder = function (next, prev) {
            var _this = this;
            return new $.$mol_app_todomvc_adder().setup(function (obj) {
                obj.value = function (next, prev) { return _this.taskNewTitle(next, prev); };
                obj.eventDone = function (next, prev) { return _this.eventAdd(next, prev); };
            });
        };
        $mol_app_todomvc.prototype.headerContent = function () {
            return [].concat(this.allCompleter(), this.adder());
        };
        $mol_app_todomvc.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.heightMinimal = function () { return 64; };
                obj.childs = function () { return _this.headerContent(); };
            });
        };
        $mol_app_todomvc.prototype.taskRows = function () {
            return [];
        };
        $mol_app_todomvc.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.taskRows(); };
            });
        };
        $mol_app_todomvc.prototype.pendingMessage = function () {
            return this.localizedText("pendingMessage");
        };
        $mol_app_todomvc.prototype.pendinger = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.pendingMessage()); };
            });
        };
        $mol_app_todomvc.prototype.filterAllLabel = function () {
            return this.localizedText("filterAllLabel");
        };
        $mol_app_todomvc.prototype.filterAll = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.filterAllLabel()); };
                obj.arg = function () { return ({
                    "completed": function () { return null; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filterActiveLabel = function () {
            return this.localizedText("filterActiveLabel");
        };
        $mol_app_todomvc.prototype.filterActive = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.filterActiveLabel()); };
                obj.arg = function () { return ({
                    "completed": function () { return false; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filterCompletedLabel = function () {
            return this.localizedText("filterCompletedLabel");
        };
        $mol_app_todomvc.prototype.filterCompleted = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.filterCompletedLabel()); };
                obj.arg = function () { return ({
                    "completed": function () { return true; },
                }); };
            });
        };
        $mol_app_todomvc.prototype.filterOptions = function () {
            return [].concat(this.filterAll(), this.filterActive(), this.filterCompleted());
        };
        $mol_app_todomvc.prototype.filter = function (next, prev) {
            var _this = this;
            return new $.$mol_barer().setup(function (obj) {
                obj.childs = function () { return _this.filterOptions(); };
            });
        };
        $mol_app_todomvc.prototype.sanitizerEnabled = function () {
            return true;
        };
        $mol_app_todomvc.prototype.eventSanitize = function () {
            return null;
        };
        $mol_app_todomvc.prototype.sanitizerLabel = function () {
            return this.localizedText("sanitizerLabel");
        };
        $mol_app_todomvc.prototype.sanitizer = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.enabled = function () { return _this.sanitizerEnabled(); };
                obj.eventClick = function () { return _this.eventSanitize(); };
                obj.childs = function () { return [].concat(_this.sanitizerLabel()); };
            });
        };
        $mol_app_todomvc.prototype.footerContent = function () {
            return [].concat(this.pendinger(), this.filter(), this.sanitizer());
        };
        $mol_app_todomvc.prototype.footer = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return _this.footerContent(); };
            });
        };
        $mol_app_todomvc.prototype.panels = function () {
            return [].concat(this.header(), this.lister(), this.footer());
        };
        $mol_app_todomvc.prototype.paneler = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.panels(); };
            });
        };
        $mol_app_todomvc.prototype.pager = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.titler(), _this.paneler()); };
            });
        };
        $mol_app_todomvc.prototype.childs = function () {
            return [].concat(this.pager());
        };
        $mol_app_todomvc.prototype.taskCompleted = function (key, next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_todomvc.prototype.taskTitle = function (key, next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_todomvc.prototype.eventTaskDrop = function (key, next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_todomvc.prototype.taskRow = function (key, next, prev) {
            var _this = this;
            return new $.$mol_app_todomvc_taskRow().setup(function (obj) {
                obj.completed = function (next, prev) { return _this.taskCompleted(key, next, prev); };
                obj.title = function (next, prev) { return _this.taskTitle(key, next, prev); };
                obj.eventDrop = function (next, prev) { return _this.eventTaskDrop(key, next, prev); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "allCompleted", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "allCompleter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "taskNewTitle", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "eventAdd", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "adder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "header", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "pendinger", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "filterAll", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "filterActive", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "filterCompleted", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "filter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "sanitizer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "footer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "paneler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc.prototype, "pager", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "taskCompleted", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "taskTitle", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "eventTaskDrop", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_todomvc.prototype, "taskRow", null);
        return $mol_app_todomvc;
    }($.$mol_scroller));
    $.$mol_app_todomvc = $mol_app_todomvc;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_todomvc_adder = (function (_super) {
        __extends($mol_app_todomvc_adder, _super);
        function $mol_app_todomvc_adder() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc_adder.prototype.hint = function () {
            return this.localizedText("hint");
        };
        $mol_app_todomvc_adder.prototype.eventPress = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_todomvc_adder.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "keyup": function (next, prev) { return _this.eventPress(next, prev); },
            });
        };
        $mol_app_todomvc_adder.prototype.eventDone = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_adder.prototype, "eventPress", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_adder.prototype, "eventDone", null);
        return $mol_app_todomvc_adder;
    }($.$mol_stringer));
    $.$mol_app_todomvc_adder = $mol_app_todomvc_adder;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_todomvc_taskRow = (function (_super) {
        __extends($mol_app_todomvc_taskRow, _super);
        function $mol_app_todomvc_taskRow() {
            _super.apply(this, arguments);
        }
        $mol_app_todomvc_taskRow.prototype.heightMinimal = function () {
            return 64;
        };
        $mol_app_todomvc_taskRow.prototype.completed = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_app_todomvc_taskRow.prototype.completer = function (next, prev) {
            var _this = this;
            return new $.$mol_checker().setup(function (obj) {
                obj.checked = function (next, prev) { return _this.completed(next, prev); };
                obj.childs = function () { return []; };
            });
        };
        $mol_app_todomvc_taskRow.prototype.titleHint = function () {
            return this.localizedText("titleHint");
        };
        $mol_app_todomvc_taskRow.prototype.title = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_todomvc_taskRow.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.titleHint(); };
                obj.value = function (next, prev) { return _this.title(next, prev); };
            });
        };
        $mol_app_todomvc_taskRow.prototype.eventDrop = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_todomvc_taskRow.prototype.dropper = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker().setup(function (obj) {
                obj.childs = function () { return [].concat("✖"); };
                obj.eventClick = function (next, prev) { return _this.eventDrop(next, prev); };
            });
        };
        $mol_app_todomvc_taskRow.prototype.childs = function () {
            return [].concat(this.completer(), this.titler(), this.dropper());
        };
        $mol_app_todomvc_taskRow.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_app_todomvc_taskRow_completed": function () { return _this.completed(); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "completed", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "completer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "title", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "eventDrop", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_todomvc_taskRow.prototype, "dropper", null);
        return $mol_app_todomvc_taskRow;
    }($.$mol_viewer));
    $.$mol_app_todomvc_taskRow = $mol_app_todomvc_taskRow;
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
        var $mol_app_todomvc_adder = (function (_super) {
            __extends($mol_app_todomvc_adder, _super);
            function $mol_app_todomvc_adder() {
                _super.apply(this, arguments);
            }
            $mol_app_todomvc_adder.prototype.eventPress = function (next) {
                switch (next['code'] || next.key) {
                    case 'Enter': return this.eventDone(next);
                }
            };
            return $mol_app_todomvc_adder;
        }($.$mol_app_todomvc_adder));
        $mol.$mol_app_todomvc_adder = $mol_app_todomvc_adder;
        var $mol_app_todomvc = (function (_super) {
            __extends($mol_app_todomvc, _super);
            function $mol_app_todomvc() {
                _super.apply(this, arguments);
                this._idSeed = 0;
            }
            $mol_app_todomvc.prototype.taskIds = function (next) {
                return $.$mol_state_local.value(this.stateKey('taskIds'), next) || [];
            };
            $mol_app_todomvc.prototype.argCompleted = function () {
                return $.$mol_state_arg.value(this.stateKey('completed'));
            };
            $mol_app_todomvc.prototype.groupsByCompleted = function () {
                var groups = { 'true': [], 'false': [] };
                for (var _i = 0, _a = this.taskIds(); _i < _a.length; _i++) {
                    var id = _a[_i];
                    var task = this.task(id);
                    groups[String(task.completed)].push(id);
                }
                return groups;
            };
            $mol_app_todomvc.prototype.tasksFiltered = function () {
                var completed = this.argCompleted();
                if (completed) {
                    return this.groupsByCompleted()[completed] || [];
                }
                else {
                    return this.taskIds();
                }
            };
            $mol_app_todomvc.prototype.allCompleted = function (next) {
                if (next === void 0)
                    return this.groupsByCompleted()['false'].length === 0;
                for (var _i = 0, _a = this.groupsByCompleted()[String(!next)]; _i < _a.length; _i++) {
                    var id = _a[_i];
                    var task = this.task(id);
                    this.task(id, { title: task.title, completed: next });
                }
                return next;
            };
            $mol_app_todomvc.prototype.allCompleterEnabled = function () {
                return this.taskIds().length > 0;
            };
            $mol_app_todomvc.prototype.pendingMessage = function () {
                var count = this.groupsByCompleted()['false'].length;
                return (count === 1) ? '1 item left' : count + " items left";
            };
            $mol_app_todomvc.prototype.eventAdd = function (next) {
                var title = this.taskNewTitle();
                if (!title)
                    return;
                var id = ++this._idSeed;
                var task = { completed: false, title: title };
                this.task(id, task);
                this.taskIds(this.taskIds().concat(id));
                this.taskNewTitle('');
            };
            $mol_app_todomvc.prototype.taskRows = function () {
                var _this = this;
                return this.tasksFiltered().map(function (id, index) { return _this.taskRow(index); });
            };
            $mol_app_todomvc.prototype.task = function (id, next) {
                var key = this.stateKey("task=" + id);
                if (next === void 0)
                    return $.$mol_state_local.value(key) || { title: '', completed: false };
                $.$mol_state_local.value(key, next);
                return next || void 0;
            };
            $mol_app_todomvc.prototype.taskCompleted = function (index, next) {
                var id = this.tasksFiltered()[index];
                if (next === void 0)
                    return this.task(id).completed;
                this.task(id, $.$mol_merge_dict(this.task(id), { completed: next }));
                return next;
            };
            $mol_app_todomvc.prototype.taskTitle = function (index, next) {
                var id = this.tasksFiltered()[index];
                if (next === void 0)
                    return this.task(id).title;
                this.task(id, $.$mol_merge_dict(this.task(id), { title: next }));
                return next;
            };
            $mol_app_todomvc.prototype.eventTaskDrop = function (index, next) {
                var tasks = this.tasksFiltered();
                var id = tasks[index];
                tasks = tasks.slice(0, index).concat(tasks.slice(index + 1, tasks.length));
                this.task(id, null);
                this.taskIds(tasks);
            };
            $mol_app_todomvc.prototype.eventSanitize = function () {
                var _this = this;
                this.taskIds(this.taskIds().filter(function (id) {
                    if (!_this.task(id).completed)
                        return true;
                    _this.task(id, null);
                    return false;
                }));
            };
            $mol_app_todomvc.prototype.panels = function () {
                return [
                    this.header(),
                    this.lister(),
                    this.footerVisible() ? this.footer() : null,
                ];
            };
            $mol_app_todomvc.prototype.footerVisible = function () {
                return this.taskIds().length > 0;
            };
            $mol_app_todomvc.prototype.sanitizerEnabled = function () {
                return this.groupsByCompleted()['true'].length > 0;
            };
            __decorate([
                $.$mol_mem()
            ], $mol_app_todomvc.prototype, "groupsByCompleted", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_todomvc.prototype, "tasksFiltered", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_todomvc.prototype, "allCompleted", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_todomvc.prototype, "pendingMessage", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_todomvc.prototype, "taskRows", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_todomvc.prototype, "taskCompleted", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_todomvc.prototype, "taskTitle", null);
            return $mol_app_todomvc;
        }($.$mol_app_todomvc));
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
            _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_app_users.prototype.filterHint = function () {
            return this.localizedText("filterHint");
        };
        $mol_app_users.prototype.query = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_users.prototype.filter = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.filterHint(); };
                obj.value = function (next, prev) { return _this.query(next, prev); };
            });
        };
        $mol_app_users.prototype.userRows = function () {
            return [];
        };
        $mol_app_users.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.userRows(); };
            });
        };
        $mol_app_users.prototype.body = function () {
            return [].concat(this.lister());
        };
        $mol_app_users.prototype.bodier = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return _this.body(); };
            });
        };
        $mol_app_users.prototype.reloadLabel = function () {
            return this.localizedText("reloadLabel");
        };
        $mol_app_users.prototype.eventReload = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_users.prototype.reloader = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.reloadLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventReload(next, prev); };
            });
        };
        $mol_app_users.prototype.loaded = function () {
            return false;
        };
        $mol_app_users.prototype.addLabel = function () {
            return this.localizedText("addLabel");
        };
        $mol_app_users.prototype.eventAdd = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_users.prototype.adder = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.enabled = function () { return _this.loaded(); };
                obj.childs = function () { return [].concat(_this.addLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventAdd(next, prev); };
            });
        };
        $mol_app_users.prototype.changed = function () {
            return false;
        };
        $mol_app_users.prototype.saveLabel = function () {
            return this.localizedText("saveLabel");
        };
        $mol_app_users.prototype.eventSave = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_users.prototype.saver = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.enabled = function () { return _this.changed(); };
                obj.childs = function () { return [].concat(_this.saveLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventSave(next, prev); };
            });
        };
        $mol_app_users.prototype.saverResult = function () {
            return null;
        };
        $mol_app_users.prototype.messager = function (next, prev) {
            var _this = this;
            return new $.$mol_statuser().setup(function (obj) {
                obj.status = function () { return _this.saverResult(); };
            });
        };
        $mol_app_users.prototype.controller = function (next, prev) {
            var _this = this;
            return new $.$mol_rower().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.reloader(), _this.adder(), _this.saver(), _this.messager()); };
            });
        };
        $mol_app_users.prototype.childs = function () {
            return [].concat(this.filter(), this.bodier(), this.controller());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "query", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "filter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "lister", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "bodier", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "eventReload", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "reloader", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "eventAdd", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "adder", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "eventSave", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "saver", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "messager", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users.prototype, "controller", null);
        return $mol_app_users;
    }($.$mol_viewer));
    $.$mol_app_users = $mol_app_users;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_app_users_item = (function (_super) {
        __extends($mol_app_users_item, _super);
        function $mol_app_users_item() {
            _super.apply(this, arguments);
        }
        $mol_app_users_item.prototype.heightMinimal = function () {
            return 68;
        };
        $mol_app_users_item.prototype.title = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_app_users_item.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.title(next, prev); };
            });
        };
        $mol_app_users_item.prototype.dropLabel = function () {
            return "Drop";
        };
        $mol_app_users_item.prototype.eventDrop = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_app_users_item.prototype.dropper = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.dropLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventDrop(next, prev); };
            });
        };
        $mol_app_users_item.prototype.childs = function () {
            return [].concat(this.titler(), this.dropper());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_app_users_item.prototype, "title", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users_item.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users_item.prototype, "eventDrop", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_users_item.prototype, "dropper", null);
        return $mol_app_users_item;
    }($.$mol_rower));
    $.$mol_app_users_item = $mol_app_users_item;
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
                _super.apply(this, arguments);
                this._queryTimer = 0;
            }
            $mol_app_users.prototype.queryArg = function (next, prev) {
                return $.$mol_state_arg.value(this.stateKey('query'), next, prev);
            };
            $mol_app_users.prototype.query = function (next, prev) {
                var _this = this;
                if (next == null) {
                    return this.queryArg();
                }
                else {
                    this.queryArg(next, prev);
                    if (this._queryTimer)
                        clearTimeout(this._queryTimer);
                    this._queryTimer = setTimeout(function () { _this.query(null); }, 500);
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
            $mol_app_users.prototype.childs = function () {
                var next = [this.filter()];
                if (this.master())
                    next = [].concat(next, this.bodier(), this.controller());
                return next;
            };
            $mol_app_users.prototype.users = function (next) {
                var usersMaster = this.usersMaster();
                return next || usersMaster;
            };
            $mol_app_users.prototype.usersMaster = function (next) {
                if (!this.query())
                    return [];
                var master = this.master();
                if (next === void 0) {
                    return master.json().items.map(function (item) { return item.login; });
                }
                master.json(next && { items: next.map(function (login) { return ({ login: login }); }) });
                return next;
            };
            $mol_app_users.prototype.saverResult = function () {
                return this.usersMaster();
            };
            $mol_app_users.prototype.eventReload = function (next) {
                this.master().refresh();
            };
            $mol_app_users.prototype.eventAdd = function (next) {
                this.users(this.users().concat(''));
            };
            $mol_app_users.prototype.eventUserDrop = function (id, next) {
                this.users(this.users().filter(function (name, i) { return (i !== id); }));
            };
            $mol_app_users.prototype.changed = function () {
                return JSON.stringify(this.usersMaster()) !== JSON.stringify(this.users());
            };
            $mol_app_users.prototype.loaded = function () {
                return Boolean(this.users().valueOf());
            };
            $mol_app_users.prototype.eventSave = function (next) {
                if (!this.changed())
                    return;
                try {
                    this.usersMaster(this.users()).valueOf();
                }
                catch (error) {
                    if (error instanceof $.$mol_atom_wait)
                        throw error;
                    console.log('---', error);
                }
            };
            $mol_app_users.prototype.body = function () {
                if (this.users().length) {
                    return [this.lister()];
                }
                else {
                    return ['Users not found'];
                }
            };
            $mol_app_users.prototype.userRows = function () {
                var _this = this;
                return this.users().map(function (user, id) { return _this.userRow(id); });
            };
            $mol_app_users.prototype.userRow = function (id) {
                var _this = this;
                return new $.$mol_app_users_item().setup(function (obj) {
                    obj.title = function (next) { return _this.userName(id, next); };
                    obj.eventDrop = function (next) { return _this.eventUserDrop(id, next); };
                });
            };
            $mol_app_users.prototype.userName = function (id, next) {
                if (next === void 0)
                    return this.users()[id] || '';
                this.users(this.users().map(function (name, i) { return (i === id) ? next : name; }));
                return next;
            };
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
            ], $mol_app_users.prototype, "usersMaster", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_users.prototype, "saverResult", null);
            __decorate([
                $.$mol_mem()
            ], $mol_app_users.prototype, "userRows", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_app_users.prototype, "userRow", null);
            return $mol_app_users;
        }($.$mol_app_users));
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
            _super.apply(this, arguments);
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
    var $mol_attacher_demo = (function (_super) {
        __extends($mol_attacher_demo, _super);
        function $mol_attacher_demo() {
            _super.apply(this, arguments);
        }
        return $mol_attacher_demo;
    }($.$mol_attacher));
    $.$mol_attacher_demo = $mol_attacher_demo;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_attacher_demo_filled = (function (_super) {
        __extends($mol_attacher_demo_filled, _super);
        function $mol_attacher_demo_filled() {
            _super.apply(this, arguments);
        }
        $mol_attacher_demo_filled.prototype.item0 = function (next, prev) {
            return new $.$mol_attacher_item().setup(function (obj) {
                obj.urlThumb = function () { return "/mol/logo/logo.svg"; };
                obj.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.item1 = function (next, prev) {
            return new $.$mol_attacher_item().setup(function (obj) {
                obj.urlThumb = function () { return "/mol/logo/logo.svg"; };
                obj.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.item2 = function (next, prev) {
            return new $.$mol_attacher_item().setup(function (obj) {
                obj.urlThumb = function () { return "/mol/logo/logo.svg"; };
                obj.urlLoad = function () { return "/mol/logo/logo.svg"; };
            });
        };
        $mol_attacher_demo_filled.prototype.items = function () {
            return [].concat(this.item0(), this.item1(), this.item2());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_demo_filled.prototype, "item0", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_demo_filled.prototype, "item1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_attacher_demo_filled.prototype, "item2", null);
        return $mol_attacher_demo_filled;
    }($.$mol_attacher));
    $.$mol_attacher_demo_filled = $mol_attacher_demo_filled;
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
    var $mol_barer_demo_search = (function (_super) {
        __extends($mol_barer_demo_search, _super);
        function $mol_barer_demo_search() {
            _super.apply(this, arguments);
        }
        $mol_barer_demo_search.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_barer_demo_search.prototype.stringer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.value(next, prev); };
            });
        };
        $mol_barer_demo_search.prototype.submitter = function (next, prev) {
            return new $.$mol_clicker().setup(function (obj) {
                obj.childs = function () { return [].concat("Submit"); };
            });
        };
        $mol_barer_demo_search.prototype.childs = function () {
            return [].concat(this.stringer(), this.submitter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_search.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_search.prototype, "stringer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_search.prototype, "submitter", null);
        return $mol_barer_demo_search;
    }($.$mol_barer));
    $.$mol_barer_demo_search = $mol_barer_demo_search;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_barer_demo_login = (function (_super) {
        __extends($mol_barer_demo_login, _super);
        function $mol_barer_demo_login() {
            _super.apply(this, arguments);
        }
        $mol_barer_demo_login.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_barer_demo_login.prototype.stringer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.value(next, prev); };
            });
        };
        $mol_barer_demo_login.prototype.rememberer = function (next, prev) {
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.label = function () { return [].concat("Remember me"); };
            });
        };
        $mol_barer_demo_login.prototype.submitter = function (next, prev) {
            return new $.$mol_clicker().setup(function (obj) {
                obj.childs = function () { return [].concat("Submit"); };
            });
        };
        $mol_barer_demo_login.prototype.childs = function () {
            return [].concat(this.stringer(), this.rememberer(), this.submitter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_login.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_login.prototype, "stringer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_login.prototype, "rememberer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_barer_demo_login.prototype, "submitter", null);
        return $mol_barer_demo_login;
    }($.$mol_barer));
    $.$mol_barer_demo_login = $mol_barer_demo_login;
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
    var $mol_dimmer = (function (_super) {
        __extends($mol_dimmer, _super);
        function $mol_dimmer() {
            _super.apply(this, arguments);
        }
        $mol_dimmer.prototype.haystack = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_dimmer.prototype.needle = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_dimmer.prototype.parts = function () {
            return [];
        };
        $mol_dimmer.prototype.childs = function () {
            return this.parts();
        };
        $mol_dimmer.prototype.string = function (key) {
            return "";
        };
        $mol_dimmer.prototype.low = function (key, next, prev) {
            var _this = this;
            return new $.$mol_dimmer_low().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.string(key)); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_dimmer.prototype, "haystack", null);
        __decorate([
            $.$mol_mem()
        ], $mol_dimmer.prototype, "needle", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_dimmer.prototype, "low", null);
        return $mol_dimmer;
    }($.$mol_viewer));
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_dimmer_low = (function (_super) {
        __extends($mol_dimmer_low, _super);
        function $mol_dimmer_low() {
            _super.apply(this, arguments);
        }
        $mol_dimmer_low.prototype.tagName = function () {
            return "span";
        };
        return $mol_dimmer_low;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
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
            __decorate([
                $.$mol_mem()
            ], $mol_dimmer.prototype, "strings", null);
            return $mol_dimmer;
        }($.$mol_dimmer));
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
    var $mol_suggester = (function (_super) {
        __extends($mol_suggester, _super);
        function $mol_suggester() {
            _super.apply(this, arguments);
        }
        $mol_suggester.prototype.suggests = function () {
            return [];
        };
        $mol_suggester.prototype.eventPress = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_suggester.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "keydown": function (next, prev) { return _this.eventPress(next, prev); },
            });
        };
        $mol_suggester.prototype.selectedRow = function (next, prev) {
            return (next !== void 0) ? next : 0;
        };
        $mol_suggester.prototype.suggest = function (key) {
            return "";
        };
        $mol_suggester.prototype.eventRowerSelected = function (key, next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_suggester.prototype.selected = function (key) {
            return false;
        };
        $mol_suggester.prototype.rower = function (key, next, prev) {
            var _this = this;
            return new $.$mol_suggester_rower().setup(function (obj) {
                obj.text = function () { return _this.suggest(key); };
                obj.prefix = function () { return _this.value(); };
                obj.eventSelected = function (next, prev) { return _this.eventRowerSelected(key, next, prev); };
                obj.selected = function () { return _this.selected(key); };
            });
        };
        $mol_suggester.prototype.value = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_suggester.prototype.hint = function () {
            return "";
        };
        $mol_suggester.prototype.stringer = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.value(next, prev); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_suggester.prototype.suggestRows = function () {
            return [];
        };
        $mol_suggester.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.heightMinimal = function () { return 0; };
                obj.childs = function () { return _this.suggestRows(); };
            });
        };
        $mol_suggester.prototype.childs = function () {
            return [].concat(this.stringer(), this.lister());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_suggester.prototype, "eventPress", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester.prototype, "selectedRow", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_suggester.prototype, "eventRowerSelected", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_suggester.prototype, "rower", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester.prototype, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester.prototype, "stringer", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester.prototype, "lister", null);
        return $mol_suggester;
    }($.$mol_viewer));
    $.$mol_suggester = $mol_suggester;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_suggester_rower = (function (_super) {
        __extends($mol_suggester_rower, _super);
        function $mol_suggester_rower() {
            _super.apply(this, arguments);
        }
        $mol_suggester_rower.prototype.tagName = function () {
            return "div";
        };
        $mol_suggester_rower.prototype.eventSelected = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_suggester_rower.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "mousedown": function (next, prev) { return _this.eventSelected(next, prev); },
            });
        };
        $mol_suggester_rower.prototype.selected = function () {
            return false;
        };
        $mol_suggester_rower.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_suggester_selected": function () { return _this.selected(); },
            });
        };
        $mol_suggester_rower.prototype.heightMinimal = function () {
            return 36;
        };
        $mol_suggester_rower.prototype.text = function () {
            return "";
        };
        $mol_suggester_rower.prototype.prefix = function () {
            return "";
        };
        $mol_suggester_rower.prototype.dimmer = function (next, prev) {
            var _this = this;
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return _this.text(); };
                obj.needle = function () { return _this.prefix(); };
            });
        };
        $mol_suggester_rower.prototype.childs = function () {
            return [].concat(this.dimmer());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_rower.prototype, "eventSelected", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_rower.prototype, "dimmer", null);
        return $mol_suggester_rower;
    }($.$mol_clicker));
    $.$mol_suggester_rower = $mol_suggester_rower;
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
        var $mol_suggester = (function (_super) {
            __extends($mol_suggester, _super);
            function $mol_suggester() {
                _super.apply(this, arguments);
            }
            $mol_suggester.prototype.contextSub = function () {
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_viewer_heightLimit = function () { return context.$mol_viewer_heightLimit() / 3; };
                return subContext;
            };
            $mol_suggester.prototype.suggestRows = function () {
                var _this = this;
                return this.suggests().map(function (suggest, index) { return _this.rower(index); });
            };
            $mol_suggester.prototype.childs = function () {
                return [
                    this.stringer(),
                    (this.focused() && this.suggests().length)
                        ? this.lister()
                        : null
                ];
            };
            $mol_suggester.prototype.eventRowerSelected = function (index, next) {
                this.value(this.suggests()[index]);
            };
            $mol_suggester.prototype.selectedRow = function (next, prev) {
                this.value();
                return (next !== void 0) ? next : 0;
            };
            $mol_suggester.prototype.eventPress = function (next) {
                var code = (next['code'] || next.key).replace(/^Arrow|bar$/, '');
                var selectedRow = this.selectedRow();
                var suggestsLength = this.lister().childsVisible().length;
                var isSelectedKey = code === 'Enter' || code === 'Right';
                var spaceKey = (code === 'Space') ? ' ' : '';
                if (isSelectedKey || spaceKey) {
                    if (!selectedRow)
                        return;
                    if (spaceKey)
                        next.preventDefault();
                    this.value(this.suggests()[selectedRow - 1] + spaceKey);
                }
                if (code === 'Down') {
                    selectedRow = selectedRow === suggestsLength ? 0 : selectedRow + 1;
                    this.selectedRow(selectedRow);
                }
                if (code === 'Up') {
                    selectedRow = selectedRow === 0 ? suggestsLength : selectedRow - 1;
                    this.selectedRow(selectedRow);
                }
            };
            $mol_suggester.prototype.selected = function (index) {
                return index === (this.selectedRow() - 1);
            };
            $mol_suggester.prototype.suggest = function (index) {
                return this.suggests()[index];
            };
            __decorate([
                $.$mol_mem()
            ], $mol_suggester.prototype, "contextSub", null);
            __decorate([
                $.$mol_mem()
            ], $mol_suggester.prototype, "selectedRow", null);
            return $mol_suggester;
        }($.$mol_suggester));
        $mol.$mol_suggester = $mol_suggester;
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
    var $mol_rower_demo = (function (_super) {
        __extends($mol_rower_demo, _super);
        function $mol_rower_demo() {
            _super.apply(this, arguments);
        }
        $mol_rower_demo.prototype.heightMinimal = function () {
            return 68;
        };
        $mol_rower_demo.prototype.helloHint = function () {
            return this.localizedText("helloHint");
        };
        $mol_rower_demo.prototype.title = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_rower_demo.prototype.suggest1 = function () {
            return this.localizedText("suggest1");
        };
        $mol_rower_demo.prototype.suggest2 = function () {
            return this.localizedText("suggest2");
        };
        $mol_rower_demo.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_suggester().setup(function (obj) {
                obj.hint = function () { return _this.helloHint(); };
                obj.value = function (next, prev) { return _this.title(next, prev); };
                obj.suggests = function () { return [].concat(_this.suggest1(), _this.suggest2()); };
            });
        };
        $mol_rower_demo.prototype.countHint = function () {
            return this.localizedText("countHint");
        };
        $mol_rower_demo.prototype.count = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_rower_demo.prototype.counter = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.hint = function () { return _this.countHint(); };
                obj.value = function (next, prev) { return _this.count(next, prev); };
            });
        };
        $mol_rower_demo.prototype.progress = function () {
            return 0.33;
        };
        $mol_rower_demo.prototype.progresser = function (next, prev) {
            var _this = this;
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return _this.progress(); };
            });
        };
        $mol_rower_demo.prototype.publishLabel = function () {
            return this.localizedText("publishLabel");
        };
        $mol_rower_demo.prototype.publish = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_rower_demo.prototype.publisher = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.label = function () { return [].concat(_this.publishLabel()); };
                obj.checked = function (next, prev) { return _this.publish(next, prev); };
            });
        };
        $mol_rower_demo.prototype.dropLabel = function () {
            return this.localizedText("dropLabel");
        };
        $mol_rower_demo.prototype.eventLog = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_rower_demo.prototype.buttonDrop = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.dropLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventLog(next, prev); };
            });
        };
        $mol_rower_demo.prototype.childs = function () {
            return [].concat(this.titler(), this.counter(), this.progresser(), this.publisher(), this.buttonDrop());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "title", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "titler", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "count", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "counter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "progresser", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "publish", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "publisher", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "eventLog", null);
        __decorate([
            $.$mol_mem()
        ], $mol_rower_demo.prototype, "buttonDrop", null);
        return $mol_rower_demo;
    }($.$mol_rower));
    $.$mol_rower_demo = $mol_rower_demo;
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
    var $mol;
    (function ($mol) {
        var $mol_rower_demo = (function (_super) {
            __extends($mol_rower_demo, _super);
            function $mol_rower_demo() {
                _super.apply(this, arguments);
            }
            $mol_rower_demo.prototype.eventLog = function (next) {
                alert(next.target.id);
            };
            return $mol_rower_demo;
        }($.$mol_rower_demo));
        $mol.$mol_rower_demo = $mol_rower_demo;
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
    var $mol_carder_demo = (function (_super) {
        __extends($mol_carder_demo, _super);
        function $mol_carder_demo() {
            _super.apply(this, arguments);
        }
        $mol_carder_demo.prototype.content = function (next, prev) {
            return new $.$mol_rower_demo();
        };
        $mol_carder_demo.prototype.status = function () {
            return "pending";
        };
        __decorate([
            $.$mol_mem()
        ], $mol_carder_demo.prototype, "content", null);
        return $mol_carder_demo;
    }($.$mol_carder));
    $.$mol_carder_demo = $mol_carder_demo;
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
    var $mol_checker_expander_demo = (function (_super) {
        __extends($mol_checker_expander_demo, _super);
        function $mol_checker_expander_demo() {
            _super.apply(this, arguments);
        }
        $mol_checker_expander_demo.prototype.c1Label = function () {
            return this.localizedText("c1Label");
        };
        $mol_checker_expander_demo.prototype.c1 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c1Label()); };
            });
        };
        $mol_checker_expander_demo.prototype.c2Label = function () {
            return this.localizedText("c2Label");
        };
        $mol_checker_expander_demo.prototype.c2 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c2Label()); };
                obj.checked = function () { return true; };
            });
        };
        $mol_checker_expander_demo.prototype.c3 = function (next, prev) {
            return new $.$mol_checker_expander();
        };
        $mol_checker_expander_demo.prototype.c4 = function (next, prev) {
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.checked = function () { return true; };
            });
        };
        $mol_checker_expander_demo.prototype.c5Label = function () {
            return this.localizedText("c5Label");
        };
        $mol_checker_expander_demo.prototype.c5 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c5Label()); };
                obj.checked = function () { return true; };
                obj.disabled = function () { return true; };
            });
        };
        $mol_checker_expander_demo.prototype.childs = function () {
            return [].concat(this.c1(), this.c2(), this.c3(), this.c4(), this.c5());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander_demo.prototype, "c1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander_demo.prototype, "c2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander_demo.prototype, "c3", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander_demo.prototype, "c4", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_expander_demo.prototype, "c5", null);
        return $mol_checker_expander_demo;
    }($.$mol_rower));
    $.$mol_checker_expander_demo = $mol_checker_expander_demo;
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
    var $mol_checker_ticker_demo = (function (_super) {
        __extends($mol_checker_ticker_demo, _super);
        function $mol_checker_ticker_demo() {
            _super.apply(this, arguments);
        }
        $mol_checker_ticker_demo.prototype.c1Label = function () {
            return this.localizedText("c1Label");
        };
        $mol_checker_ticker_demo.prototype.c1 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c1Label()); };
            });
        };
        $mol_checker_ticker_demo.prototype.c2Label = function () {
            return this.localizedText("c2Label");
        };
        $mol_checker_ticker_demo.prototype.c2 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c2Label()); };
                obj.checked = function () { return true; };
            });
        };
        $mol_checker_ticker_demo.prototype.c3 = function (next, prev) {
            return new $.$mol_checker_ticker();
        };
        $mol_checker_ticker_demo.prototype.c4 = function (next, prev) {
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.checked = function () { return true; };
            });
        };
        $mol_checker_ticker_demo.prototype.c5 = function (next, prev) {
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.disabled = function () { return true; };
            });
        };
        $mol_checker_ticker_demo.prototype.c6Label = function () {
            return this.localizedText("c6Label");
        };
        $mol_checker_ticker_demo.prototype.c6 = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_ticker().setup(function (obj) {
                obj.label = function () { return [].concat(_this.c6Label()); };
                obj.checked = function () { return true; };
                obj.disabled = function () { return true; };
            });
        };
        $mol_checker_ticker_demo.prototype.childs = function () {
            return [].concat(this.c1(), this.c2(), this.c3(), this.c4(), this.c5(), this.c6());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c3", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c4", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c5", null);
        __decorate([
            $.$mol_mem()
        ], $mol_checker_ticker_demo.prototype, "c6", null);
        return $mol_checker_ticker_demo;
    }($.$mol_rower));
    $.$mol_checker_ticker_demo = $mol_checker_ticker_demo;
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
    var $mol_clicker_demo = (function (_super) {
        __extends($mol_clicker_demo, _super);
        function $mol_clicker_demo() {
            _super.apply(this, arguments);
        }
        $mol_clicker_demo.prototype.majorLabel = function () {
            return this.localizedText("majorLabel");
        };
        $mol_clicker_demo.prototype.events = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_clicker_demo.prototype.major = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.majorLabel()); };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.majorDisabled = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.majorLabel()); };
                obj.disabled = function () { return true; };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.minorLabel = function () {
            return this.localizedText("minorLabel");
        };
        $mol_clicker_demo.prototype.minor = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.minorLabel()); };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.minorDisabled = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_minor().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.minorLabel()); };
                obj.disabled = function () { return true; };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.dangerLabel = function () {
            return this.localizedText("dangerLabel");
        };
        $mol_clicker_demo.prototype.danger = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_danger().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.dangerLabel()); };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.dangerDisabled = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_danger().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.dangerLabel()); };
                obj.disabled = function () { return true; };
                obj.eventClick = function (next, prev) { return _this.events(next, prev); };
            });
        };
        $mol_clicker_demo.prototype.childs = function () {
            return [].concat(this.major(), this.majorDisabled(), this.minor(), this.minorDisabled(), this.danger(), this.dangerDisabled());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "events", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "major", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "majorDisabled", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "minor", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "minorDisabled", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "danger", null);
        __decorate([
            $.$mol_mem()
        ], $mol_clicker_demo.prototype, "dangerDisabled", null);
        return $mol_clicker_demo;
    }($.$mol_rower));
    $.$mol_clicker_demo = $mol_clicker_demo;
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
    var $mol;
    (function ($mol) {
        var $mol_clicker_demo = (function (_super) {
            __extends($mol_clicker_demo, _super);
            function $mol_clicker_demo() {
                _super.apply(this, arguments);
            }
            $mol_clicker_demo.prototype.events = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                alert(diff[0].target.id);
            };
            return $mol_clicker_demo;
        }($.$mol_clicker_demo));
        $mol.$mol_clicker_demo = $mol_clicker_demo;
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
    var $mol_coder_demo = (function (_super) {
        __extends($mol_coder_demo, _super);
        function $mol_coder_demo() {
            _super.apply(this, arguments);
        }
        $mol_coder_demo.prototype.coder1 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "QR_CODE"; };
            });
        };
        $mol_coder_demo.prototype.coder2 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "DATA_MATRIX"; };
            });
        };
        $mol_coder_demo.prototype.coder3 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "UPC_E"; };
            });
        };
        $mol_coder_demo.prototype.coder4 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "UPC_A"; };
            });
        };
        $mol_coder_demo.prototype.coder5 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "EAN_8"; };
            });
        };
        $mol_coder_demo.prototype.coder6 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "EAN_13"; };
            });
        };
        $mol_coder_demo.prototype.coder7 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "CODE_128"; };
            });
        };
        $mol_coder_demo.prototype.coder8 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "CODE_39"; };
            });
        };
        $mol_coder_demo.prototype.coder9 = function (next, prev) {
            return new $.$mol_coder().setup(function (obj) {
                obj.format = function () { return "ITF"; };
            });
        };
        $mol_coder_demo.prototype.childs = function () {
            return [].concat(this.coder1(), this.coder2(), this.coder3(), this.coder4(), this.coder5(), this.coder6(), this.coder7(), this.coder8(), this.coder9());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder1", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder2", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder3", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder4", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder5", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder6", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder7", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder8", null);
        __decorate([
            $.$mol_mem()
        ], $mol_coder_demo.prototype, "coder9", null);
        return $mol_coder_demo;
    }($.$mol_rower));
    $.$mol_coder_demo = $mol_coder_demo;
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
    var $mol_stringer_demo = (function (_super) {
        __extends($mol_stringer_demo, _super);
        function $mol_stringer_demo() {
            _super.apply(this, arguments);
        }
        $mol_stringer_demo.prototype.name = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_stringer_demo.prototype.one = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.name(next, prev); };
            });
        };
        $mol_stringer_demo.prototype.twoHint = function () {
            return this.localizedText("twoHint");
        };
        $mol_stringer_demo.prototype.two = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.name(next, prev); };
                obj.hint = function () { return _this.twoHint(); };
            });
        };
        $mol_stringer_demo.prototype.threeHint = function () {
            return this.localizedText("threeHint");
        };
        $mol_stringer_demo.prototype.three = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.name(next, prev); };
                obj.hint = function () { return _this.threeHint(); };
                obj.disabled = function () { return true; };
            });
        };
        $mol_stringer_demo.prototype.childs = function () {
            return [].concat(this.one(), this.two(), this.three());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stringer_demo.prototype, "name", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stringer_demo.prototype, "one", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stringer_demo.prototype, "two", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stringer_demo.prototype, "three", null);
        return $mol_stringer_demo;
    }($.$mol_rower));
    $.$mol_stringer_demo = $mol_stringer_demo;
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
        var $mol_stringer_demo = (function (_super) {
            __extends($mol_stringer_demo, _super);
            function $mol_stringer_demo() {
                _super.apply(this, arguments);
            }
            $mol_stringer_demo.prototype.name = function (next, prev) {
                return next || '';
            };
            __decorate([
                $.$mol_mem()
            ], $mol_stringer_demo.prototype, "name", null);
            return $mol_stringer_demo;
        }($.$mol_stringer_demo));
        $mol.$mol_stringer_demo = $mol_stringer_demo;
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
    var $mol_decker_demo = (function (_super) {
        __extends($mol_decker_demo, _super);
        function $mol_decker_demo() {
            _super.apply(this, arguments);
        }
        $mol_decker_demo.prototype.stringerLabel = function () {
            return this.localizedText("stringerLabel");
        };
        $mol_decker_demo.prototype.stringerContent = function (next, prev) {
            return new $.$mol_stringer_demo();
        };
        $mol_decker_demo.prototype.stringerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.stringerLabel(); };
                obj.content = function () { return _this.stringerContent(); };
            });
        };
        $mol_decker_demo.prototype.buttonsLabel = function () {
            return this.localizedText("buttonsLabel");
        };
        $mol_decker_demo.prototype.clickerContent = function (next, prev) {
            return new $.$mol_clicker_demo();
        };
        $mol_decker_demo.prototype.clickerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.buttonsLabel(); };
                obj.content = function () { return _this.clickerContent(); };
            });
        };
        $mol_decker_demo.prototype.checkerLabel = function () {
            return this.localizedText("checkerLabel");
        };
        $mol_decker_demo.prototype.checkerContent = function (next, prev) {
            return new $.$mol_checker_ticker_demo();
        };
        $mol_decker_demo.prototype.checkerItem = function (next, prev) {
            var _this = this;
            return new $.$mol_decker_item().setup(function (obj) {
                obj.title = function () { return _this.checkerLabel(); };
                obj.content = function () { return _this.checkerContent(); };
            });
        };
        $mol_decker_demo.prototype.items = function () {
            return [].concat(this.stringerItem(), this.clickerItem(), this.checkerItem());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "stringerContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "stringerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "clickerContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "clickerItem", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "checkerContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_decker_demo.prototype, "checkerItem", null);
        return $mol_decker_demo;
    }($.$mol_decker));
    $.$mol_decker_demo = $mol_decker_demo;
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
            _super.apply(this, arguments);
        }
        $mol_demo_all.prototype.name = function () {
            return "$mol_viewer";
        };
        $mol_demo_all.prototype.mediumLabel = function () {
            return "Fit to content";
        };
        $mol_demo_all.prototype.medium = function (next, prev) {
            var _this = this;
            return new $.$mol_demo_medium().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.mediumLabel(); };
            });
        };
        $mol_demo_all.prototype.smallLabel = function () {
            return this.localizedText("smallLabel");
        };
        $mol_demo_all.prototype.small = function (next, prev) {
            var _this = this;
            return new $.$mol_demo_small().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.smallLabel(); };
            });
        };
        $mol_demo_all.prototype.largeLabel = function () {
            return this.localizedText("largeLabel");
        };
        $mol_demo_all.prototype.large = function (next, prev) {
            var _this = this;
            return new $.$mol_demo_large().setup(function (obj) {
                obj.name = function () { return _this.name(); };
                obj.title = function () { return _this.largeLabel(); };
            });
        };
        $mol_demo_all.prototype.childs = function () {
            return [].concat(this.medium(), this.small(), this.large());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_demo_all.prototype, "medium", null);
        __decorate([
            $.$mol_mem()
        ], $mol_demo_all.prototype, "small", null);
        __decorate([
            $.$mol_mem()
        ], $mol_demo_all.prototype, "large", null);
        return $mol_demo_all;
    }($.$mol_viewer));
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
            _super.apply(this, arguments);
        }
        $mol_dimmer_demo.prototype.one = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Don't put all your eggs in one basket"; };
                obj.needle = function () { return "eggs"; };
            });
        };
        $mol_dimmer_demo.prototype.two = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Don't look a gift horse in the mouth."; };
                obj.needle = function () { return "oo"; };
            });
        };
        $mol_dimmer_demo.prototype.three = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "There is no word you are looking for"; };
                obj.needle = function () { return "luck"; };
            });
        };
        $mol_dimmer_demo.prototype.four = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "ooAAooAAoo"; };
                obj.needle = function () { return "oo"; };
            });
        };
        $mol_dimmer_demo.prototype.five = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Let's search this string"; };
                obj.needle = function () { return "Let's search this string"; };
            });
        };
        $mol_dimmer_demo.prototype.six = function (next, prev) {
            return new $.$mol_dimmer().setup(function (obj) {
                obj.haystack = function () { return "Let's search nothing"; };
                obj.needle = function () { return ""; };
            });
        };
        $mol_dimmer_demo.prototype.childs = function () {
            return [].concat(this.one(), this.two(), this.three(), this.four(), this.five(), this.six());
        };
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
        return $mol_dimmer_demo;
    }($.$mol_rower));
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
            _super.apply(this, arguments);
        }
        $mol_expander.prototype.expanded = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_expander.prototype.label = function () {
            return [];
        };
        $mol_expander.prototype.labeler = function (next, prev) {
            var _this = this;
            return new $.$mol_checker_expander().setup(function (obj) {
                obj.checked = function (next, prev) { return _this.expanded(next, prev); };
                obj.label = function () { return _this.label(); };
            });
        };
        $mol_expander.prototype.content = function () {
            return null;
        };
        $mol_expander.prototype.rows = function () {
            return [].concat(this.labeler(), this.content());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_expander.prototype, "expanded", null);
        __decorate([
            $.$mol_mem()
        ], $mol_expander.prototype, "labeler", null);
        return $mol_expander;
    }($.$mol_lister));
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
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_filler.prototype.childs = function () {
            return [].concat("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.", "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.", "Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.", "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.");
        };
        return $mol_filler;
    }($.$mol_viewer));
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
            _super.apply(this, arguments);
        }
        $mol_expander_demo.prototype.label = function () {
            return [].concat("Lorem Ipsum");
        };
        $mol_expander_demo.prototype.content = function (next, prev) {
            return new $.$mol_filler();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_expander_demo.prototype, "content", null);
        return $mol_expander_demo;
    }($.$mol_expander));
    $.$mol_expander_demo = $mol_expander_demo;
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
    var $mol_lister_demo = (function (_super) {
        __extends($mol_lister_demo, _super);
        function $mol_lister_demo() {
            _super.apply(this, arguments);
        }
        return $mol_lister_demo;
    }($.$mol_lister));
    $.$mol_lister_demo = $mol_lister_demo;
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
        var $mol_lister_demo = (function (_super) {
            __extends($mol_lister_demo, _super);
            function $mol_lister_demo() {
                _super.apply(this, arguments);
            }
            $mol_lister_demo.prototype.rows = function () {
                var next = [];
                for (var id = 0; id < 1000; ++id) {
                    next.push(this.rower(id));
                }
                return next;
            };
            $mol_lister_demo.prototype.rower = function (id) {
                return new $mol.$mol_rower_demo().setup(function (obj) {
                    obj.title = function () { return ("Title #" + id); };
                });
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_lister_demo.prototype, "rower", null);
            return $mol_lister_demo;
        }($.$mol_lister_demo));
        $mol.$mol_lister_demo = $mol_lister_demo;
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
    var $mol_floater_demo = (function (_super) {
        __extends($mol_floater_demo, _super);
        function $mol_floater_demo() {
            _super.apply(this, arguments);
        }
        $mol_floater_demo.prototype.floaterContent = function (next, prev) {
            return new $.$mol_carder_demo();
        };
        $mol_floater_demo.prototype.floater = function (next, prev) {
            var _this = this;
            return new $.$mol_floater().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.floaterContent()); };
            });
        };
        $mol_floater_demo.prototype.contenter = function (next, prev) {
            return new $.$mol_lister_demo();
        };
        $mol_floater_demo.prototype.childs = function () {
            return [].concat(this.floater(), this.contenter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_floater_demo.prototype, "floaterContent", null);
        __decorate([
            $.$mol_mem()
        ], $mol_floater_demo.prototype, "floater", null);
        __decorate([
            $.$mol_mem()
        ], $mol_floater_demo.prototype, "contenter", null);
        return $mol_floater_demo;
    }($.$mol_viewer));
    $.$mol_floater_demo = $mol_floater_demo;
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
            _super.apply(this, arguments);
        }
        $mol_form_demo.prototype.loginLabel = function () {
            return this.localizedText("loginLabel");
        };
        $mol_form_demo.prototype.loginErrors = function () {
            return [];
        };
        $mol_form_demo.prototype.login = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_form_demo.prototype.loginControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.login(next, prev); };
            });
        };
        $mol_form_demo.prototype.loginField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_form_demo.prototype.passwordLabel = function () {
            return this.localizedText("passwordLabel");
        };
        $mol_form_demo.prototype.passwordErrors = function () {
            return [];
        };
        $mol_form_demo.prototype.password = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_form_demo.prototype.passControl = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.value = function (next, prev) { return _this.password(next, prev); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_form_demo.prototype.passwordField = function (next, prev) {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_form_demo.prototype.formFields = function () {
            return [].concat(this.loginField(), this.passwordField());
        };
        $mol_form_demo.prototype.submitText = function () {
            return this.localizedText("submitText");
        };
        $mol_form_demo.prototype.eventSubmit = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_form_demo.prototype.submit = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.submitText()); };
                obj.eventClick = function (next, prev) { return _this.eventSubmit(next, prev); };
                obj.disabled = function () { return _this.submitBlocked(); };
            });
        };
        $mol_form_demo.prototype.buttons = function () {
            return [].concat(this.submit());
        };
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
        ], $mol_form_demo.prototype, "eventSubmit", null);
        __decorate([
            $.$mol_mem()
        ], $mol_form_demo.prototype, "submit", null);
        return $mol_form_demo;
    }($.$mol_form));
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
    var $mol_grider_demo = (function (_super) {
        __extends($mol_grider_demo, _super);
        function $mol_grider_demo() {
            _super.apply(this, arguments);
        }
        $mol_grider_demo.prototype.rowHeight = function () {
            return 37;
        };
        return $mol_grider_demo;
    }($.$mol_grider));
    $.$mol_grider_demo = $mol_grider_demo;
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
        var $mol_grider_demo = (function (_super) {
            __extends($mol_grider_demo, _super);
            function $mol_grider_demo() {
                _super.apply(this, arguments);
            }
            $mol_grider_demo.prototype.records = function () {
                return new $.$mol_range_lazy({
                    length: 10000,
                    item: function (index) {
                        return new $.$mol_range_lazy({
                            length: 15,
                            item: function (colId) { return colId === 0
                                ? "Row " + (index + 1)
                                : "Cell " + colId + "\u00D7" + (index + 1); }
                        }).valueOf();
                    }
                }).valueOf();
            };
            $mol_grider_demo.prototype.columnHeaderContent = function (id) {
                if (id == '0')
                    return [];
                return [("Col " + id)];
            };
            __decorate([
                $.$mol_mem()
            ], $mol_grider_demo.prototype, "records", null);
            return $mol_grider_demo;
        }($.$mol_grider_demo));
        $mol.$mol_grider_demo = $mol_grider_demo;
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
            _super.apply(this, arguments);
        }
        $mol_html_head.prototype.tagName = function () {
            return "head";
        };
        return $mol_html_head;
    }($.$mol_viewer));
    $.$mol_html_head = $mol_html_head;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_html_body = (function (_super) {
        __extends($mol_html_body, _super);
        function $mol_html_body() {
            _super.apply(this, arguments);
        }
        $mol_html_body.prototype.tagName = function () {
            return "body";
        };
        return $mol_html_body;
    }($.$mol_viewer));
    $.$mol_html_body = $mol_html_body;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_html_title = (function (_super) {
        __extends($mol_html_title, _super);
        function $mol_html_title() {
            _super.apply(this, arguments);
        }
        $mol_html_title.prototype.tagName = function () {
            return "title";
        };
        $mol_html_title.prototype.title = function () {
            return "";
        };
        $mol_html_title.prototype.childs = function () {
            return [].concat(this.title());
        };
        return $mol_html_title;
    }($.$mol_viewer));
    $.$mol_html_title = $mol_html_title;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_html_meta = (function (_super) {
        __extends($mol_html_meta, _super);
        function $mol_html_meta() {
            _super.apply(this, arguments);
        }
        $mol_html_meta.prototype.tagName = function () {
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
    }($.$mol_viewer));
    $.$mol_html_meta = $mol_html_meta;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_html_link = (function (_super) {
        __extends($mol_html_link, _super);
        function $mol_html_link() {
            _super.apply(this, arguments);
        }
        $mol_html_link.prototype.tagName = function () {
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
    }($.$mol_viewer));
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
            _super.apply(this, arguments);
        }
        $mol_icon_demo.prototype.icons = function () {
            return [];
        };
        $mol_icon_demo.prototype.childs = function () {
            return this.icons();
        };
        return $mol_icon_demo;
    }($.$mol_rower));
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
                _super.apply(this, arguments);
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
            __decorate([
                $.$mol_mem()
            ], $mol_icon_demo.prototype, "names", null);
            __decorate([
                $.$mol_mem()
            ], $mol_icon_demo.prototype, "icons", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_icon_demo.prototype, "icon", null);
            return $mol_icon_demo;
        }($.$mol_icon_demo));
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
            _super.apply(this, arguments);
        }
        $mol_labeler_demo_text.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_labeler_demo_text.prototype.content = function () {
            return this.localizedText("content");
        };
        return $mol_labeler_demo_text;
    }($.$mol_labeler));
    $.$mol_labeler_demo_text = $mol_labeler_demo_text;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_labeler_demo_stringer = (function (_super) {
        __extends($mol_labeler_demo_stringer, _super);
        function $mol_labeler_demo_stringer() {
            _super.apply(this, arguments);
        }
        $mol_labeler_demo_stringer.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_labeler_demo_stringer.prototype.hint = function () {
            return this.localizedText("hint");
        };
        $mol_labeler_demo_stringer.prototype.userName = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_labeler_demo_stringer.prototype.content = function (next, prev) {
            var _this = this;
            return new $.$mol_stringer().setup(function (obj) {
                obj.hint = function () { return _this.hint(); };
                obj.value = function (next, prev) { return _this.userName(next, prev); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_labeler_demo_stringer.prototype, "userName", null);
        __decorate([
            $.$mol_mem()
        ], $mol_labeler_demo_stringer.prototype, "content", null);
        return $mol_labeler_demo_stringer;
    }($.$mol_labeler));
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
    var $mol_linker_demo = (function (_super) {
        __extends($mol_linker_demo, _super);
        function $mol_linker_demo() {
            _super.apply(this, arguments);
        }
        $mol_linker_demo.prototype.labelRed = function () {
            return this.localizedText("labelRed");
        };
        $mol_linker_demo.prototype.linkRed = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "red"; },
                }); };
                obj.childs = function () { return [].concat(_this.labelRed()); };
            });
        };
        $mol_linker_demo.prototype.labelGreen = function () {
            return this.localizedText("labelGreen");
        };
        $mol_linker_demo.prototype.linkGreen = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "green"; },
                }); };
                obj.childs = function () { return [].concat(_this.labelGreen()); };
            });
        };
        $mol_linker_demo.prototype.labelBlue = function () {
            return this.localizedText("labelBlue");
        };
        $mol_linker_demo.prototype.linkBlue = function (next, prev) {
            var _this = this;
            return new $.$mol_linker().setup(function (obj) {
                obj.arg = function () { return ({
                    "color": function () { return "blue"; },
                }); };
                obj.childs = function () { return [].concat(_this.labelBlue()); };
            });
        };
        $mol_linker_demo.prototype.linkExternal = function (next, prev) {
            return new $.$mol_linker().setup(function (obj) {
                obj.uri = function () { return "http://example.org"; };
                obj.childs = function () { return [].concat("example.org"); };
            });
        };
        $mol_linker_demo.prototype.childs = function () {
            return [].concat(this.linkRed(), this.linkGreen(), this.linkBlue(), this.linkExternal());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_linker_demo.prototype, "linkRed", null);
        __decorate([
            $.$mol_mem()
        ], $mol_linker_demo.prototype, "linkGreen", null);
        __decorate([
            $.$mol_mem()
        ], $mol_linker_demo.prototype, "linkBlue", null);
        __decorate([
            $.$mol_mem()
        ], $mol_linker_demo.prototype, "linkExternal", null);
        return $mol_linker_demo;
    }($.$mol_rower));
    $.$mol_linker_demo = $mol_linker_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
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
            _super.apply(this, arguments);
        }
        $mol_number_demo.prototype.zero = function (next, prev) {
            return new $.$mol_number();
        };
        $mol_number_demo.prototype.year = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_number_demo.prototype.one = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
            });
        };
        $mol_number_demo.prototype.two = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.hint = function () { return "2016"; };
            });
        };
        $mol_number_demo.prototype.age = function (next, prev) {
            return (next !== void 0) ? next : 32;
        };
        $mol_number_demo.prototype.three = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.age(next, prev); };
                obj.hint = function () { return "18-99"; };
                obj.enabled = function () { return false; };
            });
        };
        $mol_number_demo.prototype.four = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.enabledStringer = function () { return false; };
            });
        };
        $mol_number_demo.prototype.five = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.age(next, prev); };
                obj.enabledDec = function () { return false; };
            });
        };
        $mol_number_demo.prototype.six = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.enabledInc = function () { return false; };
            });
        };
        $mol_number_demo.prototype.seven = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.precisionChange = function () { return 10; };
            });
        };
        $mol_number_demo.prototype.eight = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.precisionView = function () { return 0.01; };
            });
        };
        $mol_number_demo.prototype.nine = function (next, prev) {
            var _this = this;
            return new $.$mol_number().setup(function (obj) {
                obj.value = function (next, prev) { return _this.year(next, prev); };
                obj.precision = function () { return 1000; };
            });
        };
        $mol_number_demo.prototype.childs = function () {
            return [].concat(this.zero(), this.one(), this.two(), this.three(), this.four(), this.five(), this.six(), this.seven(), this.eight(), this.nine());
        };
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
        return $mol_number_demo;
    }($.$mol_rower));
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
    var $mol_pager_demo = (function (_super) {
        __extends($mol_pager_demo, _super);
        function $mol_pager_demo() {
            _super.apply(this, arguments);
        }
        $mol_pager_demo.prototype.title = function () {
            return this.localizedText("title");
        };
        $mol_pager_demo.prototype.signup = function (next, prev) {
            return new $.$mol_app_signup();
        };
        $mol_pager_demo.prototype.body = function () {
            return [].concat(this.signup());
        };
        $mol_pager_demo.prototype.rower = function (next, prev) {
            return new $.$mol_rower_demo();
        };
        $mol_pager_demo.prototype.foot = function () {
            return [].concat(this.rower());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_pager_demo.prototype, "signup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_pager_demo.prototype, "rower", null);
        return $mol_pager_demo;
    }($.$mol_pager));
    $.$mol_pager_demo = $mol_pager_demo;
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
            _super.apply(this, arguments);
        }
        $mol_perf_render.prototype.title = function () {
            return "$mol";
        };
        $mol_perf_render.prototype.titler = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.tagName = function () { return "h2"; };
                obj.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_perf_render.prototype.runnerLabel = function () {
            return this.localizedText("runnerLabel");
        };
        $mol_perf_render.prototype.eventRun = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_perf_render.prototype.runner = function (next, prev) {
            var _this = this;
            return new $.$mol_clicker_major().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.runnerLabel()); };
                obj.eventClick = function (next, prev) { return _this.eventRun(next, prev); };
            });
        };
        $mol_perf_render.prototype.head = function () {
            return [].concat(this.titler(), this.runner());
        };
        $mol_perf_render.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_perf_render.prototype.rows = function () {
            return [];
        };
        $mol_perf_render.prototype.lister = function (next, prev) {
            var _this = this;
            return new $.$mol_lister().setup(function (obj) {
                obj.rows = function () { return _this.rows(); };
            });
        };
        $mol_perf_render.prototype.contenter = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.lister()); };
            });
        };
        $mol_perf_render.prototype.childs = function () {
            return [].concat(this.header(), this.contenter());
        };
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
        return $mol_perf_render;
    }($.$mol_viewer));
    $.$mol_perf_render = $mol_perf_render;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_render_row = (function (_super) {
        __extends($mol_perf_render_row, _super);
        function $mol_perf_render_row() {
            _super.apply(this, arguments);
        }
        $mol_perf_render_row.prototype.selected = function (next, prev) {
            return (next !== void 0) ? next : false;
        };
        $mol_perf_render_row.prototype.heightMinimal = function () {
            return 24;
        };
        $mol_perf_render_row.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_perf_render_row_selected": function () { return _this.selected(); },
            });
        };
        $mol_perf_render_row.prototype.eventToggle = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_perf_render_row.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventToggle(next, prev); },
            });
        };
        $mol_perf_render_row.prototype.label = function () {
            return "";
        };
        $mol_perf_render_row.prototype.bar = function (next, prev) {
            var _this = this;
            return new $.$mol_viewer().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_perf_render_row.prototype.childs = function () {
            return [].concat(this.bar());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render_row.prototype, "selected", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render_row.prototype, "eventToggle", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_render_row.prototype, "bar", null);
        return $mol_perf_render_row;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
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
            return $mol_perf_render;
        }($.$mol_perf_render));
        $mol.$mol_perf_render = $mol_perf_render;
        var $mol_perf_render_row = (function (_super) {
            __extends($mol_perf_render_row, _super);
            function $mol_perf_render_row() {
                _super.apply(this, arguments);
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
            _super.apply(this, arguments);
        }
        $mol_perf_uibench.prototype.page = function () {
            return null;
        };
        $mol_perf_uibench.prototype.childs = function () {
            return [].concat(this.page());
        };
        $mol_perf_uibench.prototype.stateTable = function () {
            return null;
        };
        $mol_perf_uibench.prototype.table = function (next, prev) {
            var _this = this;
            return new $.$mol_perf_uibench_table().setup(function (obj) {
                obj.state = function () { return _this.stateTable(); };
            });
        };
        $mol_perf_uibench.prototype.stateAnim = function () {
            return null;
        };
        $mol_perf_uibench.prototype.anim = function (next, prev) {
            var _this = this;
            return new $.$mol_perf_uibench_anim().setup(function (obj) {
                obj.state = function () { return _this.stateAnim(); };
            });
        };
        $mol_perf_uibench.prototype.stateTree = function () {
            return null;
        };
        $mol_perf_uibench.prototype.tree = function (next, prev) {
            var _this = this;
            return new $.$mol_perf_uibench_tree().setup(function (obj) {
                obj.state = function () { return _this.stateTree(); };
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "table", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "anim", null);
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench.prototype, "tree", null);
        return $mol_perf_uibench;
    }($.$mol_scroller));
    $.$mol_perf_uibench = $mol_perf_uibench;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table = (function (_super) {
        __extends($mol_perf_uibench_table, _super);
        function $mol_perf_uibench_table() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_table.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table.prototype.tagName = function () {
            return "table";
        };
        $mol_perf_uibench_table.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "Table"; },
            });
        };
        $mol_perf_uibench_table.prototype.rows = function () {
            return [];
        };
        $mol_perf_uibench_table.prototype.childs = function () {
            return this.rows();
        };
        return $mol_perf_uibench_table;
    }($.$mol_lister));
    $.$mol_perf_uibench_table = $mol_perf_uibench_table;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table_row = (function (_super) {
        __extends($mol_perf_uibench_table_row, _super);
        function $mol_perf_uibench_table_row() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_table_row.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_table_row.prototype.heightMinimal = function () {
            return 20;
        };
        $mol_perf_uibench_table_row.prototype.tagName = function () {
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
        $mol_perf_uibench_table_row.prototype.header = function (next, prev) {
            var _this = this;
            return new $.$mol_perf_uibench_table_cell().setup(function (obj) {
                obj.text = function () { return _this.headerText(); };
            });
        };
        $mol_perf_uibench_table_row.prototype.cells = function () {
            return [];
        };
        $mol_perf_uibench_table_row.prototype.childs = function () {
            return [].concat(this.header(), this.cells());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench_table_row.prototype, "header", null);
        return $mol_perf_uibench_table_row;
    }($.$mol_viewer));
    $.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_table_cell = (function (_super) {
        __extends($mol_perf_uibench_table_cell, _super);
        function $mol_perf_uibench_table_cell() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_table_cell.prototype.tagName = function () {
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
        $mol_perf_uibench_table_cell.prototype.eventClick = function (next, prev) {
            return (next !== void 0) ? next : null;
        };
        $mol_perf_uibench_table_cell.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function (next, prev) { return _this.eventClick(next, prev); },
            });
        };
        $mol_perf_uibench_table_cell.prototype.childs = function () {
            return [].concat(this.text());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench_table_cell.prototype, "eventClick", null);
        return $mol_perf_uibench_table_cell;
    }($.$mol_viewer));
    $.$mol_perf_uibench_table_cell = $mol_perf_uibench_table_cell;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_anim = (function (_super) {
        __extends($mol_perf_uibench_anim, _super);
        function $mol_perf_uibench_anim() {
            _super.apply(this, arguments);
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
        $mol_perf_uibench_anim.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim;
    }($.$mol_viewer));
    $.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_anim_box = (function (_super) {
        __extends($mol_perf_uibench_anim_box, _super);
        function $mol_perf_uibench_anim_box() {
            _super.apply(this, arguments);
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
        $mol_perf_uibench_anim_box.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "style.borderRadius": function () { return _this.styleRadius(); },
                "style.background": function () { return _this.styleColor(); },
            });
        };
        $mol_perf_uibench_anim_box.prototype.items = function () {
            return [];
        };
        $mol_perf_uibench_anim_box.prototype.childs = function () {
            return this.items();
        };
        return $mol_perf_uibench_anim_box;
    }($.$mol_viewer));
    $.$mol_perf_uibench_anim_box = $mol_perf_uibench_anim_box;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree = (function (_super) {
        __extends($mol_perf_uibench_tree, _super);
        function $mol_perf_uibench_tree() {
            _super.apply(this, arguments);
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
        $mol_perf_uibench_tree.prototype.root = function (next, prev) {
            var _this = this;
            return new $.$mol_perf_uibench_tree_branch().setup(function (obj) {
                obj.state = function () { return _this.stateRoot(); };
            });
        };
        $mol_perf_uibench_tree.prototype.childs = function () {
            return [].concat(this.root());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_perf_uibench_tree.prototype, "root", null);
        return $mol_perf_uibench_tree;
    }($.$mol_viewer));
    $.$mol_perf_uibench_tree = $mol_perf_uibench_tree;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree_branch = (function (_super) {
        __extends($mol_perf_uibench_tree_branch, _super);
        function $mol_perf_uibench_tree_branch() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_tree_branch.prototype.state = function () {
            return null;
        };
        $mol_perf_uibench_tree_branch.prototype.tagName = function () {
            return "ul";
        };
        $mol_perf_uibench_tree_branch.prototype.attr = function () {
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "class": function () { return "TreeNode"; },
            });
        };
        return $mol_perf_uibench_tree_branch;
    }($.$mol_lister));
    $.$mol_perf_uibench_tree_branch = $mol_perf_uibench_tree_branch;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_uibench_tree_leaf = (function (_super) {
        __extends($mol_perf_uibench_tree_leaf, _super);
        function $mol_perf_uibench_tree_leaf() {
            _super.apply(this, arguments);
        }
        $mol_perf_uibench_tree_leaf.prototype.heightMinimal = function () {
            return 25;
        };
        $mol_perf_uibench_tree_leaf.prototype.tagName = function () {
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
        $mol_perf_uibench_tree_leaf.prototype.childs = function () {
            return [].concat(this.text());
        };
        return $mol_perf_uibench_tree_leaf;
    }($.$mol_viewer));
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
                _super.apply(this, arguments);
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
            return $mol_perf_uibench;
        }($.$mol_perf_uibench));
        $mol.$mol_perf_uibench = $mol_perf_uibench;
        var $mol_perf_uibench_table = (function (_super) {
            __extends($mol_perf_uibench_table, _super);
            function $mol_perf_uibench_table() {
                _super.apply(this, arguments);
            }
            $mol_perf_uibench_table.prototype.state = function () {
                return { items: [] };
            };
            $mol_perf_uibench_table.prototype.rows = function () {
                var _this = this;
                return this.state().items.map(function (v, i) { return _this.row(i); });
            };
            $mol_perf_uibench_table.prototype.row = function (id) {
                var _this = this;
                return new $mol_perf_uibench_table_row().setup(function (obj) {
                    obj.state = function () { return _this.state().items[id] || []; };
                });
            };
            __decorate([
                $.$mol_mem_key()
            ], $mol_perf_uibench_table.prototype, "row", null);
            return $mol_perf_uibench_table;
        }($.$mol_perf_uibench_table));
        $mol.$mol_perf_uibench_table = $mol_perf_uibench_table;
        var $mol_perf_uibench_table_row = (function (_super) {
            __extends($mol_perf_uibench_table_row, _super);
            function $mol_perf_uibench_table_row() {
                _super.apply(this, arguments);
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
            __decorate([
                $.$mol_mem_key()
            ], $mol_perf_uibench_table_row.prototype, "cell", null);
            return $mol_perf_uibench_table_row;
        }($.$mol_perf_uibench_table_row));
        $mol.$mol_perf_uibench_table_row = $mol_perf_uibench_table_row;
        var $mol_perf_uibench_table_cell = (function (_super) {
            __extends($mol_perf_uibench_table_cell, _super);
            function $mol_perf_uibench_table_cell() {
                _super.apply(this, arguments);
            }
            $mol_perf_uibench_table_cell.prototype.eventClick = function (next) {
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
                _super.apply(this, arguments);
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
            __decorate([
                $.$mol_mem_key()
            ], $mol_perf_uibench_anim.prototype, "item", null);
            return $mol_perf_uibench_anim;
        }($.$mol_perf_uibench_anim));
        $mol.$mol_perf_uibench_anim = $mol_perf_uibench_anim;
        var $mol_perf_uibench_anim_box = (function (_super) {
            __extends($mol_perf_uibench_anim_box, _super);
            function $mol_perf_uibench_anim_box() {
                _super.apply(this, arguments);
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
                _super.apply(this, arguments);
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
                _super.apply(this, arguments);
            }
            $mol_perf_uibench_tree_branch.prototype.state = function () {
                return { children: [] };
            };
            $mol_perf_uibench_tree_branch.prototype.childs = function () {
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
            __decorate([
                $.$mol_mem_key()
            ], $mol_perf_uibench_tree_branch.prototype, "branch", null);
            __decorate([
                $.$mol_mem_key()
            ], $mol_perf_uibench_tree_branch.prototype, "leaf", null);
            return $mol_perf_uibench_tree_branch;
        }($.$mol_perf_uibench_tree_branch));
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_portioner_demo = (function (_super) {
        __extends($mol_portioner_demo, _super);
        function $mol_portioner_demo() {
            _super.apply(this, arguments);
        }
        $mol_portioner_demo.prototype.one = function (next, prev) {
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return 0; };
            });
        };
        $mol_portioner_demo.prototype.two = function (next, prev) {
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return 0.5; };
            });
        };
        $mol_portioner_demo.prototype.three = function (next, prev) {
            return new $.$mol_portioner().setup(function (obj) {
                obj.portion = function () { return 1; };
            });
        };
        $mol_portioner_demo.prototype.childs = function () {
            return [].concat(this.one(), this.two(), this.three());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_portioner_demo.prototype, "one", null);
        __decorate([
            $.$mol_mem()
        ], $mol_portioner_demo.prototype, "two", null);
        __decorate([
            $.$mol_mem()
        ], $mol_portioner_demo.prototype, "three", null);
        return $mol_portioner_demo;
    }($.$mol_rower));
    $.$mol_portioner_demo = $mol_portioner_demo;
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
    var $mol_scroller_demo = (function (_super) {
        __extends($mol_scroller_demo, _super);
        function $mol_scroller_demo() {
            _super.apply(this, arguments);
        }
        $mol_scroller_demo.prototype.one = function (next, prev) {
            return new $.$mol_filler();
        };
        $mol_scroller_demo.prototype.childs = function () {
            return [].concat(this.one());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_scroller_demo.prototype, "one", null);
        return $mol_scroller_demo;
    }($.$mol_scroller));
    $.$mol_scroller_demo = $mol_scroller_demo;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_scroller_demo_top = (function (_super) {
        __extends($mol_scroller_demo_top, _super);
        function $mol_scroller_demo_top() {
            _super.apply(this, arguments);
        }
        $mol_scroller_demo_top.prototype.scrollTop = function () {
            return 0;
        };
        return $mol_scroller_demo_top;
    }($.$mol_scroller_demo));
    $.$mol_scroller_demo_top = $mol_scroller_demo_top;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_scroller_demo_middle = (function (_super) {
        __extends($mol_scroller_demo_middle, _super);
        function $mol_scroller_demo_middle() {
            _super.apply(this, arguments);
        }
        $mol_scroller_demo_middle.prototype.scrollTop = function () {
            return 1500;
        };
        return $mol_scroller_demo_middle;
    }($.$mol_scroller_demo));
    $.$mol_scroller_demo_middle = $mol_scroller_demo_middle;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_scroller_demo_bottom = (function (_super) {
        __extends($mol_scroller_demo_bottom, _super);
        function $mol_scroller_demo_bottom() {
            _super.apply(this, arguments);
        }
        $mol_scroller_demo_bottom.prototype.scrollTop = function () {
            return 10000;
        };
        return $mol_scroller_demo_bottom;
    }($.$mol_scroller_demo));
    $.$mol_scroller_demo_bottom = $mol_scroller_demo_bottom;
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
    var $mol_sectioner_demo = (function (_super) {
        __extends($mol_sectioner_demo, _super);
        function $mol_sectioner_demo() {
            _super.apply(this, arguments);
        }
        $mol_sectioner_demo.prototype.head = function () {
            return "Section header";
        };
        $mol_sectioner_demo.prototype.content = function (next, prev) {
            return new $.$mol_filler();
        };
        __decorate([
            $.$mol_mem()
        ], $mol_sectioner_demo.prototype, "content", null);
        return $mol_sectioner_demo;
    }($.$mol_sectioner));
    $.$mol_sectioner_demo = $mol_sectioner_demo;
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
    var $mol_stacker_demo = (function (_super) {
        __extends($mol_stacker_demo, _super);
        function $mol_stacker_demo() {
            _super.apply(this, arguments);
        }
        $mol_stacker_demo.prototype.mainContenter = function (next, prev) {
            return new $.$mol_pager_demo();
        };
        $mol_stacker_demo.prototype.main = function () {
            return [].concat(this.mainContenter());
        };
        $mol_stacker_demo.prototype.signup = function (next, prev) {
            return new $.$mol_app_signup();
        };
        $mol_stacker_demo.prototype.addonContenter = function (next, prev) {
            var _this = this;
            return new $.$mol_scroller().setup(function (obj) {
                obj.childs = function () { return [].concat(_this.signup()); };
            });
        };
        $mol_stacker_demo.prototype.addon = function () {
            return [].concat(this.addonContenter());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_stacker_demo.prototype, "mainContenter", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stacker_demo.prototype, "signup", null);
        __decorate([
            $.$mol_mem()
        ], $mol_stacker_demo.prototype, "addonContenter", null);
        return $mol_stacker_demo;
    }($.$mol_stacker));
    $.$mol_stacker_demo = $mol_stacker_demo;
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
            _super.apply(this, arguments);
        }
        $mol_state_history.value = function (key, next, prev) {
            return $.$mol_state_session.value("$mol_state_history.id(" + this.id() + ")." + key, next, prev);
        };
        $mol_state_history.prototype.prefix = function () { return ''; };
        $mol_state_history.prototype.value = function (key, next, prev) {
            return $.$mol_state_local.value(this.prefix() + '.' + key, next, prev);
        };
        $mol_state_history.id = function (next, prev) {
            if (history.state)
                return history.state;
            var id = Date.now().toString(16);
            history.replaceState(id, document.title, document.location.href);
            return id;
        };
        __decorate([
            $.$mol_mem_key()
        ], $mol_state_history, "value", null);
        __decorate([
            $.$mol_mem()
        ], $mol_state_history, "id", null);
        return $mol_state_history;
    }($.$mol_object));
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_suggester_demo = (function (_super) {
        __extends($mol_suggester_demo, _super);
        function $mol_suggester_demo() {
            _super.apply(this, arguments);
        }
        $mol_suggester_demo.prototype.one = function (next, prev) {
            return new $.$mol_suggester().setup(function (obj) {
                obj.focused = function () { return false; };
                obj.suggests = function () { return []; };
            });
        };
        $mol_suggester_demo.prototype.twoHint = function () {
            return this.localizedText("twoHint");
        };
        $mol_suggester_demo.prototype.suggest1 = function () {
            return this.localizedText("suggest1");
        };
        $mol_suggester_demo.prototype.suggest2 = function () {
            return this.localizedText("suggest2");
        };
        $mol_suggester_demo.prototype.suggest3 = function () {
            return this.localizedText("suggest3");
        };
        $mol_suggester_demo.prototype.suggest4 = function () {
            return this.localizedText("suggest4");
        };
        $mol_suggester_demo.prototype.suggest5 = function () {
            return this.localizedText("suggest5");
        };
        $mol_suggester_demo.prototype.two = function (next, prev) {
            var _this = this;
            return new $.$mol_suggester().setup(function (obj) {
                obj.hint = function () { return _this.twoHint(); };
                obj.focused = function () { return true; };
                obj.suggests = function () { return [].concat(_this.suggest1(), _this.suggest2(), _this.suggest3(), _this.suggest4(), _this.suggest5()); };
            });
        };
        $mol_suggester_demo.prototype.threeSuggests = function () {
            return [];
        };
        $mol_suggester_demo.prototype.threeCode = function (next, prev) {
            return (next !== void 0) ? next : "";
        };
        $mol_suggester_demo.prototype.three = function (next, prev) {
            var _this = this;
            return new $.$mol_suggester().setup(function (obj) {
                obj.suggests = function () { return _this.threeSuggests(); };
                obj.value = function (next, prev) { return _this.threeCode(next, prev); };
            });
        };
        $mol_suggester_demo.prototype.childs = function () {
            return [].concat(this.one(), this.two(), this.three());
        };
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_demo.prototype, "one", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_demo.prototype, "two", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_demo.prototype, "threeCode", null);
        __decorate([
            $.$mol_mem()
        ], $mol_suggester_demo.prototype, "three", null);
        return $mol_suggester_demo;
    }($.$mol_rower));
    $.$mol_suggester_demo = $mol_suggester_demo;
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
        var $mol_suggester_demo = (function (_super) {
            __extends($mol_suggester_demo, _super);
            function $mol_suggester_demo() {
                _super.apply(this, arguments);
            }
            $mol_suggester_demo.prototype.threeSuggests = function () {
                return $.$mol_stub_strings(this.threeCode(), 30);
            };
            __decorate([
                $.$mol_mem()
            ], $mol_suggester_demo.prototype, "threeSuggests", null);
            return $mol_suggester_demo;
        }($.$mol_suggester_demo));
        $mol.$mol_suggester_demo = $mol_suggester_demo;
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
    var $mol_switcher_demo_enabled = (function (_super) {
        __extends($mol_switcher_demo_enabled, _super);
        function $mol_switcher_demo_enabled() {
            _super.apply(this, arguments);
        }
        $mol_switcher_demo_enabled.prototype.color = function (next, prev) {
            return (next !== void 0) ? next : "red";
        };
        $mol_switcher_demo_enabled.prototype.value = function (next, prev) {
            return this.color(next, prev);
        };
        $mol_switcher_demo_enabled.prototype.options = function () {
            return $.$mol_merge_dict(_super.prototype.options.call(this), {
                "red": function () { return "Red"; },
                "green": function () { return "Green"; },
                "blue": function () { return "Blue"; },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_switcher_demo_enabled.prototype, "color", null);
        return $mol_switcher_demo_enabled;
    }($.$mol_switcher));
    $.$mol_switcher_demo_enabled = $mol_switcher_demo_enabled;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_switcher_demo_disabled = (function (_super) {
        __extends($mol_switcher_demo_disabled, _super);
        function $mol_switcher_demo_disabled() {
            _super.apply(this, arguments);
        }
        $mol_switcher_demo_disabled.prototype.color = function (next, prev) {
            return (next !== void 0) ? next : "red";
        };
        $mol_switcher_demo_disabled.prototype.value = function (next, prev) {
            return this.color(next, prev);
        };
        $mol_switcher_demo_disabled.prototype.enabled = function () {
            return false;
        };
        $mol_switcher_demo_disabled.prototype.optionRed = function () {
            return this.localizedText("optionRed");
        };
        $mol_switcher_demo_disabled.prototype.optionGreen = function () {
            return this.localizedText("optionGreen");
        };
        $mol_switcher_demo_disabled.prototype.optionBlue = function () {
            return this.localizedText("optionBlue");
        };
        $mol_switcher_demo_disabled.prototype.options = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.options.call(this), {
                "red": function () { return _this.optionRed(); },
                "green": function () { return _this.optionGreen(); },
                "blue": function () { return _this.optionBlue(); },
            });
        };
        __decorate([
            $.$mol_mem()
        ], $mol_switcher_demo_disabled.prototype, "color", null);
        return $mol_switcher_demo_disabled;
    }($.$mol_switcher));
    $.$mol_switcher_demo_disabled = $mol_switcher_demo_disabled;
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
var $;
(function ($) {
    var $mol_texter_demo = (function (_super) {
        __extends($mol_texter_demo, _super);
        function $mol_texter_demo() {
            _super.apply(this, arguments);
        }
        $mol_texter_demo.prototype.text = function () {
            return "# [Benchmarks](perf)\n## Benchmark 1\n### Benchmark 1.1\n#### Benchmark 1.1.1\n##### Benchmark 1.1.1.1\n\n* $mol_perf_render - simple benchmark of rendering ([online](http://eigenmethod.github.io/mol/perf/render/))\n* [ToDoMVC benchmark](https://github.com/nin-jin/todomvc/tree/master/benchmark)\n\n# Quick start\n\n**Create MAM project**\n\nEasy way is checkout [this preconfigured ~~PMS~~MAM repository](http://github.com/eigenmethod/mam/) and start dev server:\n\n```sh\ngit clone https://github.com/eigenmethod/mam.git ./mam && cd mam\nnpm start\n```\n\n|           | Column 1 | Column 2 | Column 3\n|-----------|----------|----------|---------\n| **Row 1** | Cell 1x1 | Cell 2x1 | Cell 3x1\n| **Row 2** | Cell 1x2 | Cell 2x2 | Cell 3x2\n| **Row 3** | Cell 1x3 | Cell 2x3 | Cell 3x3\n| **Row 4** | Cell 1x4 | Cell 2x4 | Cell 3x4\n| **Row 5** | Cell 1x5 | Cell 2x5 | Cell 3x5\n| **Row 6** | Cell 1x6 | Cell 2x6 | Cell 3x6\n| **Row 7** | Cell 1x7 | Cell 2x7 | Cell 3x7\n| **Row 8** | Cell 1x8 | Cell 2x8 | Cell 3x8\n| **Row 9** | Cell 1x9 | Cell 2x9 | Cell 3x9\n\nBuild status: [![Build Status](https://travis-ci.org/eigenmethod/mol.svg?branch=master)](https://travis-ci.org/eigenmethod/mol)\n";
        };
        return $mol_texter_demo;
    }($.$mol_texter));
    $.$mol_texter_demo = $mol_texter_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
;
var $;
(function ($) {
    var $mol_tree = (function () {
        function $mol_tree(config) {
            this.type = config.type || '';
            if (config.value) {
                var childs = $mol_tree.values(config.value);
                if (config.type || childs.length > 1) {
                    this.childs = childs.concat(config.childs || []);
                    this.data = config.data || '';
                }
                else {
                    this.data = childs[0].data;
                    this.childs = config.childs || [];
                }
            }
            else {
                this.data = config.data || '';
                this.childs = config.childs || [];
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
                childs: ('childs' in config) ? config.childs : this.childs,
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
                    parent.childs.push(next);
                    parent = next;
                });
                if (data) {
                    var next = new $mol_tree({
                        data: data.substring(1),
                        baseUri: baseUri,
                        row: row
                    });
                    parent.childs.push(next);
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
                        childs: json.map(function (json) { return $mol_tree.fromJSON(json, baseUri); })
                    });
                case 'Date':
                    return new $mol_tree({
                        type: "time",
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                case 'Object':
                    var childs = [];
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
                        child.childs.push(new $mol_tree({
                            type: ":",
                            childs: [$mol_tree.fromJSON(json[key], baseUri)],
                            baseUri: baseUri
                        }));
                        childs.push(child);
                    }
                    return new $mol_tree({
                        type: "dict",
                        childs: childs,
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
                if (this.childs.length == 1) {
                    return output + this.childs[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
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
                for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    var key = child.type || child.value;
                    if (key === '//')
                        continue;
                    var colon = child.select(':').childs[0];
                    if (!colon)
                        throw new Error("Required colon after key at " + child.uri);
                    var val = colon.childs[0].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === 'list') {
                var res = [];
                this.childs.forEach(function (child) {
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
                for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
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
                path[_i - 0] = arguments[_i];
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
                    for (var _c = 0, _d = item.childs; _c < _d.length; _c++) {
                        var child = _d[_c];
                        if (child.type == type) {
                            next.push(child);
                        }
                    }
                }
            }
            return new $mol_tree({ childs: next });
        };
        $mol_tree.prototype.filter = function (path, value) {
            if (typeof path === 'string')
                path = path.split(/ +/);
            var childs = this.childs.filter(function (item) {
                var found = item.select.apply(item, path);
                if (value == null) {
                    return Boolean(found.childs.length);
                }
                else {
                    return found.childs.some(function (child) { return child.value == value; });
                }
            });
            return new $mol_tree({ childs: childs });
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
    function $mol_viewer_tree2ts(tree) {
        var content = '';
        var locales = {};
        function error(message, tree) {
            return new Error(message + ": " + tree + " " + tree.baseUri + ":" + tree.row + ":" + tree.col);
        }
        tree.childs.forEach(function (def) {
            if (!def.type || /^-/.test(def.type))
                return;
            if (!/^\$\w+$/.test(def.type))
                throw error('Wrong component name', def);
            var parent = def.childs[0];
            var members = {};
            parent.childs.forEach(function (param) { return addProp(param); });
            function addProp(param) {
                var needSet = false;
                var needReturn = true;
                var needCache = false;
                var isOverride = true;
                var keys = [];
                if (param.type === '>') {
                    needCache = true;
                    needSet = true;
                    isOverride = false;
                    param = param.childs[0];
                }
                if (param.type === '<') {
                    needCache = false;
                    isOverride = false;
                    param = param.childs[0];
                }
                if (!param.type || /^-/.test(param.type))
                    return;
                function getValue(value) {
                    switch (value.type[0]) {
                        case void 0:
                            return JSON.stringify(value.value);
                        case '@':
                            locales[(def.type + "_" + param.type)] = value.value;
                            return "this.localizedText( " + JSON.stringify(param.type) + " )";
                        case '-':
                            return null;
                        case '/':
                            var items = [];
                            value.childs.forEach(function (item) {
                                if (item.type === '-')
                                    return;
                                var val = getValue(item);
                                if (val)
                                    items.push(val);
                            });
                            return '[]' + (items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]');
                        case '$':
                            needCache = true;
                            var overs = [];
                            value.childs.forEach(function (over) {
                                if (/^(-|$)/.test(over.type))
                                    return '';
                                var overName = /(.*?)(#?)$/.exec(over.type);
                                var ns = needSet;
                                var v = getValue(over.childs[0]);
                                var args = [];
                                if (overName[2])
                                    args.push(' key : any ');
                                if (needSet)
                                    args.push(' next? : any , prev? : any ');
                                overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                needSet = ns;
                            });
                            return 'new ' + value.type + '()' + (overs.length ? '.setup( obj => { \n' + overs.join('') + '\t\t} )' : '');
                        case '*':
                            var opts = [];
                            value.childs.forEach(function (opt) {
                                if (/^(-|$)/.test(opt.type))
                                    return '';
                                keys.push(opt.type);
                                var ns = needSet;
                                var v = getValue(opt.childs[0]);
                                var arg = needSet ? ' next? : any , prev? : any ' : '';
                                opts.push('\t\t\t"' + opt.type + '" : (' + arg + ')=> <any> ' + v + ' ,\n');
                                needSet = ns;
                            });
                            if (!isOverride)
                                return '({\n' + opts.join('') + '\t\t})';
                            else
                                return "$" + ("mol_merge_dict( super." + param.type + "() , {\n" + opts.join('') + "\t\t} )");
                        case '>':
                            needSet = true;
                            if (value.childs.length === 1) {
                                addProp(value);
                                var type = /(.*?)(?:(#)(.*))?$/.exec(value.childs[0].type);
                                return 'this.' + type[1] + '(' + (type[3] ? JSON.stringify(type[3]) + ' ,' : type[2] ? ' key ,' : '') + ' next , prev )';
                            }
                        case '<':
                            if (value.childs.length === 1) {
                                addProp(value);
                                var type = /(.*?)(?:(#)(.*))?$/.exec(value.childs[0].type);
                                return 'this.' + type[1] + '(' + (type[3] ? JSON.stringify(type[3]) : type[2] ? ' key ' : '') + ')';
                            }
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
                if (param.childs.length > 1)
                    throw error('Too more childs', param);
                param.childs.forEach(function (child) {
                    var val = getValue(child);
                    var propName = /(.*?)(?:(#)(.*))?$/.exec(param.type);
                    var args = [];
                    if (propName[2])
                        args.push(' key : any ');
                    if (needCache || needSet)
                        args.push(' next? : any , prev? : any ');
                    if (needSet && param.childs[0].type !== '>')
                        val = (needReturn ? '( next !== void 0 ) ? next : ' : 'if( next !== void 0 ) return next\n\t\t') + val;
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
                function source(root) {
                    if (['>', '<'].indexOf(root.type) !== -1) {
                        return root.clone({
                            childs: root.childs.map(function (name) { return name.clone({
                                childs: []
                            }); })
                        });
                    }
                    return root.clone({ childs: root.childs.map(source) });
                }
                return needSet;
            }
            var body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return <any>null }\n\t}\n';
            }).join('');
            var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        });
        return { script: content, locales: locales };
    }
    $.$mol_viewer_tree2ts = $mol_viewer_tree2ts;
})($ || ($ = {}));
//tree2ts.js.map
//# sourceMappingURL=web.js.map