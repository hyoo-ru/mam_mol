function $mol_merge_dict(target, source) {
    return Object.assign({}, target, source);
}
//dict.js.map
;
function $mol_log(path, values) {
    var filter = $mol_log.filter();
    if (filter == null)
        return;
    if (path.indexOf(filter) === -1)
        return;
    var time = new Date().toISOString().substring(11, 19);
    console.log.apply(console, [time, path].concat(values));
}
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
})($mol_log || ($mol_log = {}));
//log.web.js.map
;
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
            || (self['displayName'] = Function.prototype.toString.call(self).match(/^function ([a-z0-9_$]*)/)[1]);
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
        if ($mol_log.filter() == null)
            return;
        $mol_log(this.objectPath(), values);
    };
    $mol_object.toString = function () {
        return this.objectPath();
    };
    $mol_object.prototype.toString = function () {
        return this.objectPath();
    };
    return $mol_object;
}());
//object.js.map
;
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
//set.js.map
;
var $mol_set = ( typeof Set === 'function' ) ? Set : $mol_set_shim

;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
}($mol_object));
//defer.js.map
;
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
//dict.js.map
;
var $mol_dict = ( typeof Map === 'function' ) ? Map : $mol_dict_shim

;
var $mol_state_stack = new $mol_dict();
//stack.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_atom_status;
(function ($mol_atom_status) {
    $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
    $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
    $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
})($mol_atom_status || ($mol_atom_status = {}));
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
        this.autoFresh = false;
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
            if (value instanceof $mol_object) {
                if ((value.objectOwner() === host) && (value.objectField() === this.field)) {
                    value.destroyed(true);
                }
            }
            host[this.field] = void 0;
            host['$mol_atom_state'][this.field] = void 0;
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
            if (next instanceof $mol_object) {
                next['objectField'](this.field);
                next['objectOwner'](host);
            }
            host[this.field] = next;
            this.log(['push', next, prev]);
            this.obsoleteSlaves();
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
            this.slaves = new $mol_set();
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
            this.masters = new $mol_set();
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
        new $mol_defer(function () {
            if (!_this.scheduled)
                return;
            _this.scheduled = false;
            _this.sync();
        });
        this.scheduled = true;
    };
    $mol_atom.sync = function () {
        var _this = this;
        $mol_log('$mol_atom.sync', []);
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
    $mol_atom.reaping = new $mol_set();
    $mol_atom.scheduled = false;
    return $mol_atom;
}($mol_object));
function $mol_atom_restore(error) {
    while ($mol_atom.stack.length) {
        var atom = $mol_atom.stack.pop();
        if (error instanceof Error) {
            error = atom.push(error);
        }
    }
}
$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
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
function $mol_atom_task(handler, fail, autoFresh) {
    if (autoFresh === void 0) { autoFresh = true; }
    var atom = new $mol_atom(null, 'value()', handler, fail);
    atom.autoFresh = autoFresh;
    $mol_atom.actualize(atom);
    return atom;
}
//atom.js.map
;
window.addEventListener('error', function (event) {
    var error = event.error;
    var stack = $mol_atom.stack;
    if (error instanceof $mol_atom_wait) {
        event.preventDefault();
    }
    $mol_atom_restore(error);
});
//atom.web.js.map
;
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
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail, key);
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
                if (!info)
                    atoms[field] = info = new $mol_atom(host, field, value, config && config.fail);
                return info.value.apply(info, diff);
            };
        }
        void (descr.value['value'] = value);
    };
}
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
        $mol_prop()
    ], $mol_window, "size", null);
    return $mol_window;
}($mol_object));
window.addEventListener('resize', function () {
    $mol_window.size(void 0);
});
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
var localStorage = localStorage || {};
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
        $mol_prop()
    ], $mol_state_local, "value", null);
    return $mol_state_local;
}($mol_object));
//local.js.map
;
window.addEventListener('storage', function (event) { return $mol_state_local.value(event.key, void 0); });
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
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    __decorate([
        $mol_prop()
    ], $mol_state_session, "value", null);
    return $mol_state_session;
}($mol_object));
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
var $mol_state_history = (function (_super) {
    __extends($mol_state_history, _super);
    function $mol_state_history() {
        _super.apply(this, arguments);
    }
    $mol_state_history.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, ["$mol_state_history:" + this.id() + ":" + key].concat(diff));
    };
    $mol_state_history.prototype.prefix = function () { return ''; };
    $mol_state_history.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this.prefix() + '.' + key].concat(diff));
    };
    $mol_state_history.id = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (history.state)
            return history.state;
        var id = Date.now().toString(16);
        history.replaceState(id, document.title, document.location.href);
        return id;
    };
    __decorate([
        $mol_prop()
    ], $mol_state_history, "value", null);
    __decorate([
        $mol_prop()
    ], $mol_state_history, "id", null);
    return $mol_state_history;
}($mol_object));
//history.js.map
;
window.addEventListener('hashchange', function (event) { return $mol_state_history.id(void 0); });
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
var $mol_state_arg = (function (_super) {
    __extends($mol_state_arg, _super);
    function $mol_state_arg(prefix) {
        if (prefix === void 0) { prefix = ''; }
        _super.call(this);
        this.prefix = prefix;
    }
    $mol_state_arg.href = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            history.replaceState(history.state, document.title, diff[0]);
        return window.location.search + window.location.hash;
    };
    $mol_state_arg.dict = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        if (diff[0] !== void 0)
            this.href(this.make(diff[0]));
        var href = this.href();
        var chunks = href.split(/[\/\?#!&;]/g);
        var params = {};
        chunks.forEach(function (chunk) {
            if (!chunk)
                return;
            var vals = chunk.split(/[:=]/).map(decodeURIComponent);
            params[vals.shift()] = vals;
        });
        return params;
    };
    $mol_state_arg.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        if (diff[0] === void 0)
            return this.dict()[key] || null;
        this.href(this.link((_a = {}, _a[key] = diff[0], _a)));
        return diff[0];
        var _a;
    };
    $mol_state_arg.link = function (next) {
        var params = {};
        var prev = this.dict();
        for (var key in prev) {
            params[key] = prev[key];
        }
        for (var key in next) {
            params[key] = next[key];
        }
        return this.make(params);
    };
    $mol_state_arg.make = function (next) {
        var chunks = [];
        for (var key in next) {
            if (null == next[key])
                continue;
            chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
        }
        return '#' + chunks.join('#');
    };
    $mol_state_arg.prototype.value = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this.prefix + key].concat(diff));
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
        $mol_prop()
    ], $mol_state_arg, "href", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $mol_prop()
    ], $mol_state_arg, "value", null);
    return $mol_state_arg;
}($mol_object));
window.addEventListener('hashchange', function (event) { return $mol_state_arg.href(void 0); });
//arg.web.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var $mol_model = (function (_super) {
    __extends($mol_model, _super);
    function $mol_model() {
        _super.apply(this, arguments);
    }
    $mol_model.history = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_history.value.apply($mol_state_history, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.history = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_history.value.apply($mol_state_history, [this + "." + key].concat(diff));
    };
    $mol_model.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.session = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_session.value.apply($mol_state_session, [this + "." + key].concat(diff));
    };
    $mol_model.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.local = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_local.value.apply($mol_state_local, [this + "." + key].concat(diff));
    };
    $mol_model.argument = function (key) {
        var diff = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            diff[_i - 1] = arguments[_i];
        }
        return $mol_state_arg.value.apply($mol_state_arg, [this + "." + key].concat(diff));
    };
    $mol_model.prototype.argument = function () {
        var owner = this.objectOwner();
        if (owner instanceof $mol_model)
            return owner.argument();
        return new $mol_state_arg();
    };
    return $mol_model;
}($mol_object));
//model.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "focused", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer_selection, "position", null);
    return $mol_viewer_selection;
}($mol_object));
//selection.js.map
;
document.addEventListener('selectionchange', function (event) {
    $mol_viewer_selection.position(void 0);
});
document.addEventListener('focusin', function (event) {
    var parents = [];
    var element = event.srcElement;
    while (element) {
        parents.push(element);
        element = element.parentElement;
    }
    $mol_viewer_selection.focused(parents);
});
document.addEventListener('focusout', function (event) {
    $mol_viewer_selection.focused([]);
});
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
var $mol_viewer_context = {};
$mol_viewer_context.$mol_viewer_heightLimit = function () { return $mol_window.size()[1]; };
var $mol_viewer = (function (_super) {
    __extends($mol_viewer, _super);
    function $mol_viewer() {
        _super.apply(this, arguments);
    }
    $mol_viewer.root = function (id) {
        return new this;
    };
    $mol_viewer.prototype.context = function () {
        var diff = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            diff[_i - 0] = arguments[_i];
        }
        return diff[0] || $mol_viewer_context;
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
        return $mol_viewer_selection.focused().indexOf(this.DOMNode()) !== -1;
    };
    $mol_viewer.prototype.text = function (text) {
        return text;
    };
    __decorate([
        $mol_prop()
    ], $mol_viewer.prototype, "context", null);
    __decorate([
        $mol_prop({
            fail: function (self, error) {
                var node = self.DOMNode();
                if (node) {
                    node.setAttribute('mol_viewer_error', error.name);
                }
                return error;
            }
        })
    ], $mol_viewer.prototype, "DOMTree", null);
    __decorate([
        $mol_prop()
    ], $mol_viewer, "root", null);
    return $mol_viewer;
}($mol_model));
//viewer.js.map
;
document.addEventListener('DOMContentLoaded', function (event) {
    var nodes = document.querySelectorAll('[mol_viewer_root]');
    for (var i = nodes.length - 1; i >= 0; --i) {
        var view = $[nodes.item(i).getAttribute('mol_viewer_root')].root(i);
        view.DOMNode(nodes.item(i));
        $mol_atom_task(function () { return view.DOMTree(); });
    }
    $mol_defer.run();
});
//viewer.web.js.map
;
this['$'] = this['$'] || this;
this['$']['$mol'] = this['$'];
var __extends = function (Sub, Sup) {
    for (var prop in Sup)
        if (Sup.hasOwnProperty(prop))
            Sub[prop] = Sup[prop];
    Sub.prototype = Object.create(Sup.prototype, {
        constructor: {
            configurable: true,
            writable: true,
            value: Sub,
        }
    });
    if (Sub['initializer'])
        Sub['initializer']();
};
//mol.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            return $mol_merge_dict(_super.prototype.event.call(this), {
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
            return $mol_merge_dict(_super.prototype.attr.call(this), {
                "disabled": function () { return _this.disabled(); },
            });
        };
        __decorate([
            $mol_prop()
        ], $mol_clicker.prototype, "eventClick", null);
        return $mol_clicker;
    }($mol_viewer));
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
    var $mol_clicker_warn = (function (_super) {
        __extends($mol_clicker_warn, _super);
        function $mol_clicker_warn() {
            _super.apply(this, arguments);
        }
        return $mol_clicker_warn;
    }($.$mol_clicker));
    $.$mol_clicker_warn = $mol_clicker_warn;
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
            return $mol_merge_dict(_super.prototype.field.call(this), {
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
            return $mol_merge_dict(_super.prototype.event.call(this), {
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
            $mol_prop()
        ], $mol_scroller.prototype, "eventScroll", null);
        return $mol_scroller;
    }($mol_viewer));
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
                return this.session.apply(this, ['scrollTop()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.scrollLeft = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return this.session.apply(this, ['scrollLeft()'].concat(diff)) || 0;
            };
            $mol_scroller.prototype.eventScroll = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                var el = diff[0].target;
                this.scrollTop(el.scrollTop);
                this.scrollLeft(el.scrollLeft);
            };
            $mol_scroller.prototype.contextSub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_viewer_heightLimit = function () { return context.$mol_viewer_heightLimit() + _this.scrollTop(); };
                return subContext;
            };
            __decorate([
                $mol_prop()
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
            return $mol_merge_dict(_super.prototype.field.call(this), {
                "style.minHeight": function () { return _this.minHeightStyle(); },
            });
        };
        $mol_lister.prototype.rows = function () {
            return [].concat();
        };
        $mol_lister.prototype.childs = function () {
            return this.rows();
        };
        return $mol_lister;
    }($mol_viewer));
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
                    if (child instanceof $mol_viewer) {
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
                    if (child instanceof $mol_viewer) {
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
                        if (child instanceof $mol_viewer) {
                            height += child.heightMinimal();
                        }
                    });
                return height;
            };
            $mol_lister.prototype.minHeightStyle = function () {
                return this.heightMinimal() + 'px';
            };
            __decorate([
                $mol_prop()
            ], $mol_lister.prototype, "rowOffsets", null);
            __decorate([
                $mol_prop()
            ], $mol_lister.prototype, "rowContext", null);
            __decorate([
                $mol_prop()
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
        $mol_perf_render.prototype.titler = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.tagName = function () { return "h2"; };
                __.childs = function () { return [].concat(_this.title()); };
            });
        };
        $mol_perf_render.prototype.runnerLabel = function () {
            return "Run";
        };
        $mol_perf_render.prototype.eventRun = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_perf_render.prototype.runner = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_clicker_major().setup(function (__) {
                __.childs = function () { return [].concat(_this.runnerLabel()); };
                __.eventClick = function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventRun.apply(_this, diff);
                };
            });
        };
        $mol_perf_render.prototype.head = function () {
            return [].concat(this.titler(), this.runner());
        };
        $mol_perf_render.prototype.header = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.head()); };
            });
        };
        $mol_perf_render.prototype.rows = function () {
            return [].concat();
        };
        $mol_perf_render.prototype.lister = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_lister().setup(function (__) {
                __.rows = function () { return _this.rows(); };
            });
        };
        $mol_perf_render.prototype.contenter = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $.$mol_scroller().setup(function (__) {
                __.childs = function () { return [].concat(_this.lister()); };
            });
        };
        $mol_perf_render.prototype.childs = function () {
            return [].concat(this.header(), this.contenter());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "titler", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "eventRun", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "runner", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "header", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "lister", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render.prototype, "contenter", null);
        return $mol_perf_render;
    }($mol_viewer));
    $.$mol_perf_render = $mol_perf_render;
})($ || ($ = {}));
var $;
(function ($) {
    var $mol_perf_render_row = (function (_super) {
        __extends($mol_perf_render_row, _super);
        function $mol_perf_render_row() {
            _super.apply(this, arguments);
        }
        $mol_perf_render_row.prototype.selected = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : false;
        };
        $mol_perf_render_row.prototype.heightMinimal = function () {
            return 24;
        };
        $mol_perf_render_row.prototype.attr = function () {
            var _this = this;
            return $mol_merge_dict(_super.prototype.attr.call(this), {
                "mol_perf_render_row_selected": function () { return _this.selected(); },
            });
        };
        $mol_perf_render_row.prototype.eventToggle = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : null;
        };
        $mol_perf_render_row.prototype.event = function () {
            var _this = this;
            return $mol_merge_dict(_super.prototype.event.call(this), {
                "click": function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventToggle.apply(_this, diff);
                },
            });
        };
        $mol_perf_render_row.prototype.label = function () {
            return "";
        };
        $mol_perf_render_row.prototype.bar = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return (diff[0] !== void 0) ? diff[0] : new $mol_viewer().setup(function (__) {
                __.childs = function () { return [].concat(_this.label()); };
            });
        };
        $mol_perf_render_row.prototype.childs = function () {
            return [].concat(this.bar());
        };
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "selected", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "eventToggle", null);
        __decorate([
            $mol_prop()
        ], $mol_perf_render_row.prototype, "bar", null);
        return $mol_perf_render_row;
    }($mol_viewer));
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
            $mol_perf_render.prototype.runnerLabel = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || 'Run';
            };
            $mol_perf_render.prototype.eventRun = function () {
                var _this = this;
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                requestAnimationFrame(function () {
                    var data = window['_buildData']();
                    var date = Date.now();
                    _this.data(data);
                    _this.selectedItem(null);
                    $mol_defer.run();
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
                    obj.selected = function () {
                        var diff = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            diff[_i - 0] = arguments[_i];
                        }
                        if (diff[0] !== void 0)
                            _this.selectedItem(diff[0] === void 0 ? null : id);
                        return _this.selectedItem() === id;
                    };
                });
            };
            $mol_perf_render.prototype.data = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return diff[0] || [];
            };
            $mol_perf_render.prototype.selectedItem = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                return (diff[0] === void 0) ? null : diff[0];
            };
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "runnerLabel", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "rows", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "row", null);
            __decorate([
                $mol_prop()
            ], $mol_perf_render.prototype, "data", null);
            __decorate([
                $mol_prop()
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
            $mol_perf_render_row.prototype.eventToggle = function () {
                var diff = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    diff[_i - 0] = arguments[_i];
                }
                this.selected(!this.selected());
            };
            return $mol_perf_render_row;
        }($.$mol_perf_render_row));
        $mol.$mol_perf_render_row = $mol_perf_render_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//render.view.js.map
//# sourceMappingURL=web.js.map