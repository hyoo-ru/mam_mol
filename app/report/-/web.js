this['$'] = this['$'] || this;
this['$']['$mol'] = this['$'];
//mol.js.map
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
        console.log.apply(console, [time, path].concat(values));
    }
    $.$mol_log = $mol_log;
    var $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter() {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] !== void 0) {
                if (diff[0] == null) {
                    sessionStorage.removeItem('$mol_log.filter()');
                }
                else {
                    sessionStorage.setItem('$mol_log.filter()', diff[0]);
                }
                _filter = diff[0];
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
        $mol_object.prototype.destroyed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] === void 0)
                return this['destroyed()'];
            this['destroyed()'] = diff[0];
            this.log(['.destroyed()', diff[0]]);
            return diff[0];
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
        $mol_defer.prototype.destroyed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0])
                $mol_defer.drop(this);
            return _super.prototype.destroyed.apply(this, diff);
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
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom_status = $.$mol_atom_status;
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, field, handler, fail, key) {
            if (field === void 0) { field = 'value()'; }
            _super.call(this);
            this.host = host;
            this.field = field;
            this.handler = handler;
            this.fail = fail;
            this.key = key;
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.autoFresh = true;
        }
        $mol_atom.prototype.destroyed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0]) {
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
            if ($mol_atom.stack.indexOf(this) !== -1) {
                throw new Error('Recursive dependency! ' + this.objectPath());
            }
            var slave = $mol_atom.stack[$mol_atom.stack.length - 1];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            this.actualize();
            var value = (this.host || this)[this.field];
            if (value instanceof Error)
                throw value;
            return value;
        };
        $mol_atom.prototype.actualize = function () {
            var _this = this;
            if (this.status === $mol_atom_status.actual)
                return;
            var index = $mol_atom.stack.length;
            $mol_atom.stack.push(this);
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
                var host = this.host || this;
                if (this.key !== void 0) {
                    var next = this.handler.call(host, this.key);
                }
                else {
                    var next = this.handler.call(host);
                }
                if (next === void 0)
                    next = host[this.field];
                this.push(next);
            }
            $mol_atom.stack.length = index;
        };
        $mol_atom.prototype.set = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            var host = this.host || this;
            if (this.key !== void 0) {
                var next = (_a = this.handler).call.apply(_a, [host, this.key].concat(diff));
            }
            else {
                var next = (_b = this.handler).call.apply(_b, [host].concat(diff));
            }
            if (next === void 0)
                return host[this.field];
            return this.push(next);
            var _a, _b;
        };
        $mol_atom.prototype.push = function (next) {
            var host = this.host || this;
            var prev = host[this.field];
            if (next instanceof Error && this.fail) {
                if (this.key !== void 0) {
                    next = this.fail.call(host, this.key, host, next);
                }
                else {
                    next = this.fail.call(host, host, next);
                }
            }
            comparing: if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
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
                host[this.field] = next;
                this.log(['push', next, prev]);
                if (next instanceof Error) {
                    if (this.slaves)
                        this.slaves.forEach(function (slave) { return slave.push(next); });
                }
                else {
                    this.obsoleteSlaves();
                }
            }
            this.status = $mol_atom_status.actual;
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
        $mol_atom.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] === void 0) {
                if (diff.length > 1)
                    return this.push(diff[1]);
                if (diff.length > 0)
                    return this.obsolete();
                return this.get();
            }
            else {
                return this.set.apply(this, diff);
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
                if (!atom.destroyed())
                    atom.actualize();
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
        $mol_atom.stack = [];
        $mol_atom.updating = [];
        $mol_atom.reaping = new $.$mol_set();
        $mol_atom.scheduled = false;
        return $mol_atom;
    }($.$mol_object));
    $.$mol_atom = $mol_atom;
    function $mol_atom_restore(error) {
        if ($mol_atom.stack.length) {
            var atom = $mol_atom.stack.pop();
            if (error instanceof Error) {
                error = atom.push(error);
            }
        }
        $mol_atom.stack.splice(0, $mol_atom.stack.length);
    }
    $.$mol_atom_restore = $mol_atom_restore;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            _super.call(this, message);
            this.message = message;
            this.name = '$mol_atom_wait';
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    function $mol_atom_task(handler, fail) {
        var atom = new $mol_atom(null, 'value()', function () {
            handler();
            atom.destroyed(true);
        }, fail);
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var $;
(function ($) {
    window.addEventListener('error', function (event) {
        var error = event.error;
        var stack = $.$mol_atom.stack;
        if (error instanceof $.$mol_atom_wait) {
            event.preventDefault();
            console.debug('', error);
        }
        $.$mol_atom_restore(error);
    });
})($ || ($ = {}));
//atom.web.js.map
;
var $;
(function ($) {
    function $mol_prop(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            if (value.length) {
                descr.value = function (key) {
                    var diff = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        diff[_i - 1] = arguments[_i];
                    }
                    var host = this;
                    var field = name + "(" + JSON.stringify(key) + ")";
                    var atoms = host['$mol_atom_state'];
                    if (!atoms)
                        atoms = host['$mol_atom_state'] = {};
                    var info = atoms[field];
                    if (!info) {
                        atoms[field] = info = new $.$mol_atom(host, field, value, config && config.fail, key);
                        if (config)
                            info.autoFresh = !config.lazy;
                    }
                    return info.value.apply(info, diff);
                };
            }
            else {
                descr.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    var host = this;
                    var field = name + "()";
                    var atoms = host['$mol_atom_state'];
                    if (!atoms)
                        atoms = host['$mol_atom_state'] = {};
                    var info = atoms[field];
                    if (!info) {
                        atoms[field] = info = new $.$mol_atom(host, field, value, config && config.fail);
                        if (config)
                            info.autoFresh = !config.lazy;
                    }
                    return info.value.apply(info, diff);
                };
            }
            void (descr.value['value'] = value);
        };
    }
    $.$mol_prop = $mol_prop;
})($ || ($ = {}));
//prop.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
        $mol_window.size = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return [window.innerWidth, window.innerHeight];
        };
        __decorate([
            $.$mol_prop()
        ], $mol_window, "size", null);
        return $mol_window;
    }($.$mol_object));
    $.$mol_window = $mol_window;
    window.addEventListener('resize', function () {
        $mol_window.size(void 0);
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
    var $mol_http_request = (function (_super) {
        __extends($mol_http_request, _super);
        function $mol_http_request() {
            _super.apply(this, arguments);
        }
        $mol_http_request.prototype.uri = function () { return ''; };
        $mol_http_request.prototype.method = function () { return 'Get'; };
        $mol_http_request.prototype.body = function () { return null; };
        $mol_http_request.prototype.native = function () {
            var _this = this;
            if (this['native()'])
                return this['native()'];
            var next = this['native()'] = $.$mol_http_request_native();
            next.onload = function (event) {
                if (Math.floor(next.status / 100) === 2) {
                    _this.response(void 0, next);
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
        $mol_http_request.prototype.destroyed = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0]) {
                var native = this['native()'];
                if (native)
                    native.abort();
            }
            return _super.prototype.destroyed.apply(this, diff);
        };
        $mol_http_request.prototype.response = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] !== void 0)
                return diff[0];
            var native = this.native();
            native.open(this.method(), this.uri());
            native.send(this.body());
            throw new $.$mol_atom_wait(this.method() + " " + this.uri());
        };
        $mol_http_request.prototype.text = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff.length === 1)
                this.response(void 0);
            else
                return this.response().responseText;
        };
        __decorate([
            $.$mol_prop()
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
        $mol_http_resource.prototype.request = function (method) {
            var _this = this;
            var request = new $.$mol_http_request();
            request.method = function () { return method; };
            request.uri = function () { return _this.uri(); };
            return request;
        };
        $mol_http_resource.prototype.downloader = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            this.dataNext(void 0, void 0);
            return this.request('Get');
        };
        $mol_http_resource.prototype.uploader = function () {
            var body = this.dataNext();
            if (body === void 0)
                return null;
            var request = this.request('Put');
            request.body = function () { return body; };
            return request;
        };
        $mol_http_resource.prototype.uploaded = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (!this.uploader())
                return null;
            this.text(void 0, this.uploader().text());
            return true;
        };
        $mol_http_resource.prototype.text = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff.length === 0) {
                return this.downloader().text();
            }
            else if (diff[0] === void 0) {
                this.downloader(void 0);
            }
            else {
                this.dataNext(diff[0]);
            }
        };
        $mol_http_resource.prototype.dataNext = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0];
        };
        $mol_http_resource.prototype.refresh = function () {
            this.downloader(void 0);
        };
        __decorate([
            $.$mol_prop()
        ], $mol_http_resource.prototype, "downloader", null);
        __decorate([
            $.$mol_prop()
        ], $mol_http_resource.prototype, "uploader", null);
        __decorate([
            $.$mol_prop()
        ], $mol_http_resource.prototype, "uploaded", null);
        __decorate([
            $.$mol_prop()
        ], $mol_http_resource.prototype, "text", null);
        __decorate([
            $.$mol_prop()
        ], $mol_http_resource.prototype, "dataNext", null);
        __decorate([
            $.$mol_prop()
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
        $mol_http_resource_json.prototype.json = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff.length === 0) {
                return JSON.parse(this.text());
            }
            else if (diff[0] === void 0) {
                this.text(void 0);
            }
            else {
                this.text.apply(this, diff.map(function (val) { return JSON.stringify(val, null, '\t'); }));
            }
        };
        __decorate([
            $.$mol_prop()
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
        $mol_locale.lang = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || 'en';
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
            $.$mol_prop()
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
    $.$mol_viewer_context.$mol_viewer_heightLimit = function () { return $.$mol_window.size()[1]; };
    var $mol_viewer = (function (_super) {
        __extends($mol_viewer, _super);
        function $mol_viewer() {
            _super.apply(this, arguments);
        }
        $mol_viewer.root = function (id) {
            return new this;
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
        $mol_viewer.prototype.context = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || $.$mol_viewer_context;
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
            for (var i = 0; i < childs.length; ++i) {
                var child = childs[i];
                if (child instanceof $mol_viewer) {
                    child.context(context);
                }
            }
            return childs;
        };
        $mol_viewer.prototype.heightMinimal = function () {
            return 0;
        };
        $mol_viewer.prototype.DOMNode = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            var path = this.objectPath();
            var next = diff[0];
            if (!next) {
                next = this['DOMNode()'];
                if (next)
                    return next;
                next = document.getElementById(path);
                if (!next) {
                    next = document.createElementNS(this.nameSpace(), this.tagName());
                }
            }
            next.id = path;
            void (next['$mol_viewer'] = this);
            this['DOMNode()'] = next;
            var ownerProto = this.objectOwner() && Object.getPrototypeOf(this.objectOwner());
            if (ownerProto && ownerProto['objectClassNames']) {
                for (var _a = 0, _b = ownerProto['objectClassNames'](); _a < _b.length; _a++) {
                    var className = _b[_a];
                    var attrName = className.replace(/\$/g, '') + '_' + this.objectField().replace(/\(.*/, '');
                    next.setAttribute(attrName, '');
                    if (className === '$mol_viewer')
                        break;
                }
            }
            var proto = Object.getPrototypeOf(this);
            for (var _c = 0, _d = proto['objectClassNames'](); _c < _d.length; _c++) {
                var className = _d[_c];
                next.setAttribute(className.replace(/\$/g, ''), '');
                if (className === '$mol_viewer')
                    break;
            }
            var events = this.event();
            var _loop_1 = function(name_1) {
                var handle = events[name_1];
                next.addEventListener(name_1, function (event) {
                    handle(event);
                });
            };
            for (var name_1 in events) {
                _loop_1(name_1);
            }
            return next;
        };
        $mol_viewer.prototype.DOMTree = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            var node = this.DOMNode();
            var childs = this.childsVisible();
            if (childs != null) {
                var nextNode = node.firstChild;
                for (var _a = 0, childs_1 = childs; _a < childs_1.length; _a++) {
                    var view = childs_1[_a];
                    if (view == null) {
                    }
                    else if (typeof view === 'object') {
                        var existsNode = (view instanceof $mol_viewer) ? view.DOMNode() : view;
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
                for (var _b = 0, childs_2 = childs; _b < childs_2.length; _b++) {
                    var view = childs_2[_b];
                    if (view instanceof $mol_viewer)
                        view.DOMTree();
                }
            }
            var attrs = this.attr();
            for (var name_2 in attrs) {
                var val_1 = attrs[name_2]();
                if ((val_1 == null) || (val_1 === false)) {
                    node.removeAttribute(name_2);
                }
                else if (val_1 === true) {
                    node.setAttribute(name_2, name_2);
                }
                else {
                    node.setAttribute(name_2, String(val_1));
                }
            }
            var fields = this.field();
            for (var path in fields) {
                var names = path.split('.');
                var obj = node;
                for (var i = 0; i < names.length - 1; ++i) {
                    if (names[i])
                        obj = obj[names[i]];
                }
                var field = names[names.length - 1];
                var val = fields[path]();
                if (obj[field] !== val)
                    obj[field] = val;
            }
            return node;
        };
        $mol_viewer.prototype.attr = function () { return { 'mol_viewer_error': function () { return false; } }; };
        $mol_viewer.prototype.field = function () { return {}; };
        $mol_viewer.prototype.event = function () { return {}; };
        $mol_viewer.prototype.focused = function () {
            return $.$mol_viewer_selection.focused().indexOf(this.DOMNode()) !== -1;
        };
        $mol_viewer.prototype.text = function (postfix) {
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
            $.$mol_prop()
        ], $mol_viewer.prototype, "context", null);
        __decorate([
            $.$mol_prop({
                fail: function (self, error) {
                    var node = self.DOMNode();
                    if (node && !error['$mol_viewer_catched']) {
                        node.setAttribute('mol_viewer_error', error.name);
                    }
                    error['$mol_viewer_catched'] = true;
                    return error;
                }
            })
        ], $mol_viewer.prototype, "DOMTree", null);
        __decorate([
            $.$mol_prop()
        ], $mol_viewer, "root", null);
        return $mol_viewer;
    }($.$mol_object));
    $.$mol_viewer = $mol_viewer;
})($ || ($ = {}));
//viewer.js.map
;
var $;
(function ($) {
    document.addEventListener('DOMContentLoaded', function (event) {
        var nodes = document.querySelectorAll('[mol_viewer_root]');
        var _loop_1 = function(i) {
            var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
            view.DOMNode(nodes.item(i));
            new $.$mol_defer(function () { return view.DOMTree(); });
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
        $mol_viewer_selection.focused = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || [];
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
            $.$mol_prop()
        ], $mol_viewer_selection, "focused", null);
        __decorate([
            $.$mol_prop()
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
            return "0 0 48 48";
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
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_svg_path().setup(function (__) {
                __.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.childs = function () {
            return [].concat(this.pather());
        };
        __decorate([
            $.$mol_prop()
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
    var $mol_icon_minus = (function (_super) {
        __extends($mol_icon_minus, _super);
        function $mol_icon_minus() {
            _super.apply(this, arguments);
        }
        $mol_icon_minus.prototype.path = function () {
            return "M38 26H10v-4h28v4z";
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
        $mol_stringer.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_stringer.prototype.valueChanged = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return this.value.apply(this, diff);
        };
        $mol_stringer.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "disabled": function () { return _this.disabled(); },
                "value": function () { return _this.valueChanged(); },
            });
        };
        $mol_stringer.prototype.eventChange = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_stringer.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "input": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventChange.apply(_this, diff);
                },
            });
        };
        __decorate([
            $.$mol_prop()
        ], $mol_stringer.prototype, "value", null);
        __decorate([
            $.$mol_prop()
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
            $mol_stringer.prototype.eventChange = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
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
var $;
(function ($) {
    var $mol_icon_plus = (function (_super) {
        __extends($mol_icon_plus, _super);
        function $mol_icon_plus() {
            _super.apply(this, arguments);
        }
        $mol_icon_plus.prototype.path = function () {
            return "M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z";
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
        $mol_clicker.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_clicker.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "click": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventClick.apply(_this, diff);
                },
            });
        };
        $mol_clicker.prototype.disabled = function () {
            return false;
        };
        $mol_clicker.prototype.attr = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
            });
        };
        __decorate([
            $.$mol_prop()
        ], $mol_clicker.prototype, "eventClick", null);
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
    var $mol_clicker_major = (function (_super) {
        __extends($mol_clicker_major, _super);
        function $mol_clicker_major() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_major;
    }($.$mol_clicker));
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
    }($.$mol_clicker));
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
    }($.$mol_clicker));
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
        $mol_number.prototype.value = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : 0;
        };
        $mol_number.prototype.eventDec = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_number.prototype.enabled = function () {
            return true;
        };
        $mol_number.prototype.enabledDec = function () {
            return this.enabled();
        };
        $mol_number.prototype.decIcon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_icon_minus().setup(function (__) {
            });
        };
        $mol_number.prototype.decrementer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_number_clicker().setup(function (__) {
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventDec.apply(_this, diff);
                };
                __.enabled = function () { return _this.enabledDec(); };
                __.childs = function () { return [].concat(_this.decIcon()); };
            });
        };
        $mol_number.prototype.valueString = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_number.prototype.hint = function () {
            return "";
        };
        $mol_number.prototype.enabledStringer = function () {
            return this.enabled();
        };
        $mol_number.prototype.stringer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.type = function () { return "number"; };
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.valueString.apply(_this, diff);
                };
                __.hint = function () { return _this.hint(); };
                __.enabled = function () { return _this.enabledStringer(); };
            });
        };
        $mol_number.prototype.eventInc = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_number.prototype.enabledInc = function () {
            return this.enabled();
        };
        $mol_number.prototype.incIcon = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_icon_plus().setup(function (__) {
            });
        };
        $mol_number.prototype.incrementer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_number_clicker().setup(function (__) {
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventInc.apply(_this, diff);
                };
                __.enabled = function () { return _this.enabledInc(); };
                __.childs = function () { return [].concat(_this.incIcon()); };
            });
        };
        $mol_number.prototype.childs = function () {
            return [].concat(this.decrementer(), this.stringer(), this.incrementer());
        };
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "value", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "eventDec", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "decIcon", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "decrementer", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "valueString", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "stringer", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "eventInc", null);
        __decorate([
            $.$mol_prop()
        ], $mol_number.prototype, "incIcon", null);
        __decorate([
            $.$mol_prop()
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
            $mol_number.prototype.eventDec = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.value(this.value() - this.precisionChange());
            };
            $mol_number.prototype.eventInc = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.value(Number(this.value()) + this.precisionChange());
            };
            $mol_number.prototype.valueString = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0] !== void 0) {
                    this.value(diff[0] === '' ? null : Number(diff[0]));
                }
                var precisionView = this.precisionView();
                var value = diff[0] ? Number(diff[0]) : this.value();
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
            $mol_number.prototype.eventWheel = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                if (diff[0].wheelDelta > 0) {
                    this.eventInc.apply(this, diff);
                }
                else {
                    this.eventDec.apply(this, diff);
                }
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
var localStorage = localStorage || {};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            _super.apply(this, arguments);
        }
        $mol_state_local.value = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            if (diff[0] === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (diff[0] === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(diff[0]));
            return diff[0];
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
        };
        __decorate([
            $.$mol_prop()
        ], $mol_state_local, "value", null);
        return $mol_state_local;
    }($.$mol_object));
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
window.addEventListener('storage', function (event) { return $.$mol_state_local.value(event.key, void 0); });
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
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            _super.apply(this, arguments);
        }
        $mol_state_session.value = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            if (diff[0] === void 0)
                return JSON.parse(sessionStorage.getItem(key) || 'null');
            if (diff[0] === null)
                localStorage.removeItem(key);
            else
                sessionStorage.setItem(key, JSON.stringify(diff[0]));
            return diff[0];
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return $.$mol_state_local.value.apply($.$mol_state_local, [this.prefix() + '.' + key].concat(diff));
        };
        __decorate([
            $.$mol_prop()
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
    var $mol_scroller = (function (_super) {
        __extends($mol_scroller, _super);
        function $mol_scroller() {
            _super.apply(this, arguments);
        }
        $mol_scroller.prototype.scrollTop = function () {
            return 0;
        };
        $mol_scroller.prototype.scrollLeft = function () {
            return 0;
        };
        $mol_scroller.prototype.field = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.field.call(this), {
                "scrollTop": function () { return _this.scrollTop(); },
                "scrollLeft": function () { return _this.scrollLeft(); },
            });
        };
        $mol_scroller.prototype.eventScroll = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_scroller.prototype.event = function () {
            var _this = this;
            return $.$mol_merge_dict(_super.prototype.event.call(this), {
                "scroll": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventScroll.apply(_this, diff);
                },
                "overflow": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventScroll.apply(_this, diff);
                },
                "underflow": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventScroll.apply(_this, diff);
                },
            });
        };
        __decorate([
            $.$mol_prop()
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
    var $mol;
    (function ($mol) {
        var $mol_scroller = (function (_super) {
            __extends($mol_scroller, _super);
            function $mol_scroller() {
                _super.apply(this, arguments);
            }
            $mol_scroller.prototype.scrollTop = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return $.$mol_state_session.value.apply($.$mol_state_session, [this.objectPath() + '.scrollTop()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return $.$mol_state_session.value.apply($.$mol_state_session, [this.objectPath() + '.scrollLeft()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.eventScroll = function () {
                var _this = this;
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                new $.$mol_defer(function () {
                    var el = _this.DOMNode();
                    _this.scrollTop(el.scrollTop);
                    _this.scrollLeft(el.scrollLeft);
                });
            };
            $mol_scroller.prototype.contextSub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_viewer_heightLimit = function () { return context.$mol_viewer_heightLimit() + _this.scrollTop(); };
                return subContext;
            };
            __decorate([
                $.$mol_prop()
            ], $mol_scroller.prototype, "contextSub", null);
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
        $mol_pager.prototype.title = function () {
            return "";
        };
        $mol_pager.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_pager.prototype.head = function () {
            return [].concat(this.titler());
        };
        $mol_pager.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_viewer().setup(function (__) {
                __.childs = function () { return _this.head(); };
            });
        };
        $mol_pager.prototype.body = function () {
            return null;
        };
        $mol_pager.prototype.bodier = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return [].concat(_this.body()); };
            });
        };
        $mol_pager.prototype.foot = function () {
            return null;
        };
        $mol_pager.prototype.footer = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.foot()); };
            });
        };
        $mol_pager.prototype.childs = function () {
            return [].concat(this.header(), this.bodier(), this.footer());
        };
        __decorate([
            $.$mol_prop()
        ], $mol_pager.prototype, "titler", null);
        __decorate([
            $.$mol_prop()
        ], $mol_pager.prototype, "header", null);
        __decorate([
            $.$mol_prop()
        ], $mol_pager.prototype, "bodier", null);
        __decorate([
            $.$mol_prop()
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
        $mol_app_report.prototype.descriptor = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.description()); };
            });
        };
        $mol_app_report.prototype.headCells = function () {
            return [].concat();
        };
        $mol_app_report.prototype.headRower = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_report_rower().setup(function (__) {
                __.cells = function () { return _this.headCells(); };
            });
        };
        $mol_app_report.prototype.rows = function () {
            return [].concat();
        };
        $mol_app_report.prototype.tabler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_report_tabler().setup(function (__) {
                __.rows = function () { return [].concat(_this.headRower(), _this.rows()); };
            });
        };
        $mol_app_report.prototype.body = function () {
            return [].concat(this.descriptor(), this.tabler());
        };
        $mol_app_report.prototype.rowerCells = function (key) {
            return [].concat();
        };
        $mol_app_report.prototype.rower = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_report_rower().setup(function (__) {
                __.cells = function () { return _this.rowerCells(key); };
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
        $mol_app_report.prototype.celler = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_app_report_celler().setup(function (__) {
                __.content = function () { return _this.cellContent(key); };
                __.rows = function () { return _this.cellRows(key); };
                __.cols = function () { return _this.cellCols(key); };
            });
        };
        $mol_app_report.prototype.cellValue = function (key) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : "";
        };
        $mol_app_report.prototype.texter = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.cellValue(key)); };
            });
        };
        $mol_app_report.prototype.stringer = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_stringer().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.cellValue.apply(_this, [key].concat(diff));
                };
            });
        };
        $mol_app_report.prototype.number = function (key) {
            var _this = this;
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_number().setup(function (__) {
                __.value = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.cellValue.apply(_this, [key].concat(diff));
                };
            });
        };
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "descriptor", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "headRower", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "tabler", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "rower", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "celler", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "cellValue", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "texter", null);
        __decorate([
            $.$mol_prop()
        ], $mol_app_report.prototype, "stringer", null);
        __decorate([
            $.$mol_prop()
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
            return [].concat();
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
            return [].concat();
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
                                        field: 'fundament_length',
                                        title: 'Длинна',
                                    },
                                    {
                                        field: 'fundament_width',
                                        title: 'Ширина',
                                    },
                                    {
                                        field: 'fundament_height',
                                        title: 'Высота',
                                    },
                                ]
                            },
                            {
                                field: 'fundament_kind',
                                title: 'Вид',
                            },
                            {
                                field: 'fundament_type',
                                title: 'Тип',
                            },
                        ]
                    }
                ];
            };
            $mol_app_report.prototype.scheme = function () {
                return {
                    'fundament_length': {
                        type: 'number',
                        unit: 'мм',
                    },
                    'fundament_width': {
                        type: 'number',
                        unit: 'мм',
                    },
                    'fundament_height': {
                        type: 'number',
                        unit: 'мм',
                    },
                    'fundament_kind': {
                        type: 'enum',
                        options: {
                            union: 'Единый',
                            separated: 'Раздельный насос и электродвигатель',
                        },
                    },
                    'fundament_type': {
                        type: 'enum',
                        options: {
                            ribbon: 'Ленточный',
                            ring: 'Кольцевой',
                            pile: 'Свайный',
                        },
                    },
                };
            };
            $mol_app_report.prototype.data = function () {
                return {
                    fundament_length: '403300',
                    fundament_width: '22000',
                    fundament_height: '25000',
                    fundament_kind: 'union',
                    fundament_type: 'ribbon',
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
            $mol_app_report.prototype.cellValue = function (pos) {
                var diff = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    diff[_i - 1] = arguments[_i];
                }
                if (diff[0] !== void 0)
                    return diff[0];
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
                    case 'number': return 'XX';
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
                    case 'number': return "" + this.data()[field];
                    case 'enum': return scheme.options[this.data()[field]];
                }
                return '';
            };
            __decorate([
                $.$mol_prop()
            ], $mol_app_report.prototype, "cellContent", null);
            __decorate([
                $.$mol_prop()
            ], $mol_app_report.prototype, "cellValue", null);
            return $mol_app_report;
        }($.$mol_app_report));
        $mol.$mol_app_report = $mol_app_report;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//report.view.js.map
//# sourceMappingURL=web.js.map