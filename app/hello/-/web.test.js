document.addEventListener('DOMContentLoaded', function (event) {
    $mol_test_run();
});
//test.env=web.stage=test.js.map
;
function $mol_test(code) {
    $mol_test_all.push(new $mol_test_case(code));
}
var $mol_test_all = [];
var $mol_test_run = function () {
    for (var _i = 0, $mol_test_all_1 = $mol_test_all; _i < $mol_test_all_1.length; _i++) {
        var test = $mol_test_all_1[_i];
        test.run();
    }
};
var $mol_test_case = (function () {
    function $mol_test_case(code) {
        if (typeof code === 'string') {
            this.code = new Function('test', code);
        }
        else {
            this.code = code;
        }
    }
    $mol_test_case.prototype.run = function () {
        this.code.call(null, this);
    };
    $mol_test_case.prototype.done = function () {
    };
    $mol_test_case.prototype.ok = function (value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    };
    $mol_test_case.prototype.not = function (value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    };
    $mol_test_case.prototype.fail = function (message) {
        throw new Error(message);
    };
    $mol_test_case.prototype.equal = function (a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    };
    $mol_test_case.prototype.unique = function (a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    };
    return $mol_test_case;
}());
$mol_test(function (test) {
    test.ok(1);
    test.not(0);
    test.equal(2, 2);
    test.unique([3], [3]);
    test.done();
});
//test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return 1;
        };
        return X;
    }($mol_object));
    var x = new X().setup(function (obj) {
        obj.foo = function () { return 2; };
    });
    test.equal(x.foo(), 2);
});
$mol_test(function (test) {
    var x = new $mol_object;
    test.equal(x.objectPath(), '');
    x.objectField('foo()');
    test.equal(x.objectPath(), '.foo()');
    x.objectField('bar()');
    test.equal(x.objectPath(), '.foo()');
});
//object.stage=test.js.map
;
$mol_test(function (test) {
    var set = new $mol_set_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    set.add(obj1);
    set.add(obj2);
    test.equal(set.size, 2);
    test.ok(set.has(obj1));
    test.ok(set.has(obj2));
    test.not(set.has(obj3));
    var entries = set.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], obj1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], obj2);
    test.equal(entries[1][1], obj2);
    set.delete(obj2);
    test.not(set.has(obj2));
});
//set.stage=test.js.map
;
$mol_test(function (test) {
    var dict = new $mol_dict_shim;
    var obj1 = {};
    var obj2 = {};
    var obj3 = {};
    dict.set(obj1, 1);
    dict.set(obj2, 2);
    test.equal(dict.size, 2);
    test.ok(dict.has(obj1));
    test.ok(dict.has(obj2));
    test.not(dict.has(obj3));
    test.equal(dict.get(obj1), 1);
    test.equal(dict.get(obj2), 2);
    test.equal(dict.get(obj3), void 0);
    var entries = dict.entries();
    test.equal(entries.length, 2);
    test.equal(entries[0][0], 1);
    test.equal(entries[0][1], obj1);
    test.equal(entries[1][0], 2);
    test.equal(entries[1][1], obj2);
    dict.delete(obj2);
    test.not(dict.has(obj2));
});
//dict.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (id) {
            var diff = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                diff[_i - 1] = arguments[_i];
            }
            if (diff[0] === void 0)
                return new Number(123);
            return new Number(diff[0]);
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo(0).valueOf(), 123);
    test.equal(x.foo(0), x.foo(0));
    test.unique(x.foo(0), x.foo(1));
    x.foo(0, 321);
    test.equal(x.foo(0).valueOf(), 321);
    x.foo(0, void 0);
    $mol_defer.run();
    test.equal(x.foo(0).valueOf(), 123);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function (ids) {
            return Math.random();
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.foo([0, 1]), x.foo([0, 1]));
    test.unique(x.foo([0, 1]), x.foo([0, 2]));
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            return diff[0] || 1;
        };
        X.prototype.bar = function () {
            return this.foo() + 1;
        };
        X.prototype.xxx = function () {
            return this.bar() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "bar", null);
        __decorate([
            $mol_prop()
        ], X.prototype, "xxx", null);
        return X;
    }($mol_object));
    var x = new X;
    test.equal(x.bar(), 2);
    test.equal(x.xxx(), 3);
    x.foo(5);
    test.equal(x.xxx(), 7);
});
$mol_test(function (test) {
    var X = (function (_super) {
        __extends(X, _super);
        function X() {
            _super.apply(this, arguments);
        }
        X.prototype.foo = function () {
            return this.foo() + 1;
        };
        __decorate([
            $mol_prop()
        ], X.prototype, "foo", null);
        return X;
    }($mol_object));
    var x = new X;
    try {
        x.foo();
        test.fail('Not tracked recursive dependency');
    }
    catch (error) {
        $mol_atom_restore(error);
        test.equal(error.message, 'Recursive dependency! .foo()');
    }
});
$mol_test(function (test) {
    var foo;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.prototype.showing = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            if (diff[0] === void 0)
                return true;
            return diff[0];
        };
        B.prototype.foo = function () {
            return foo = new $mol_object;
        };
        B.prototype.bar = function () {
            return this.showing() ? this.foo() : null;
        };
        __decorate([
            $mol_prop()
        ], B.prototype, "showing", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "foo", null);
        __decorate([
            $mol_prop()
        ], B.prototype, "bar", null);
        return B;
    }($mol_object));
    var b = new B;
    var bar = b.bar();
    test.ok(bar);
    b.showing(false);
    b.bar();
    $mol_defer.run();
    test.ok(foo.destroyed());
    test.ok(bar.destroyed());
    test.not(b.bar());
    b.showing(true);
    $mol_defer.run();
    test.unique(b.bar(), bar);
});
$mol_test(function (test) {
    var name = 'Jin';
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            _super.apply(this, arguments);
        }
        Test.prototype.source = function () {
            var _this = this;
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            new $mol_defer(function () {
                _this.source(void 0, name);
            });
            throw new $mol_atom_wait('Wait!');
        };
        Test.prototype.middle = function () {
            return this.source();
        };
        Test.prototype.target = function () {
            return this.middle();
        };
        __decorate([
            $mol_prop()
        ], Test.prototype, "source", null);
        __decorate([
            $mol_prop()
        ], Test.prototype, "middle", null);
        __decorate([
            $mol_prop()
        ], Test.prototype, "target", null);
        return Test;
    }($mol_object));
    var t = new Test;
    try {
        t.target();
    }
    catch (error) {
        test.ok(error instanceof $mol_atom_wait);
        $mol_atom_restore(error);
    }
    $mol_defer.run();
    test.equal(t.target(), 'Jin');
    name = 'John';
    t.source(void 0);
    try {
        t.target();
    }
    catch (error) {
        test.ok(error instanceof $mol_atom_wait);
        $mol_atom_restore(error);
    }
    $mol_defer.run();
    test.equal(t.target(), 'John');
});
//prop.stage=test.js.map
;
$mol_test(function (test) {
    var key = '$mol_state_local_test:' + Math.random();
    test.equal($mol_state_local.value(key), null);
    $mol_state_local.value(key, 123);
    test.equal($mol_state_local.value(key), 123);
    $mol_state_local.value(key, null);
    test.equal($mol_state_local.value(key), null);
});
//local.stage=test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMNode().id, '');
    test.equal(x.element(0).DOMNode().id, '.element(0)');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    test.equal(x.DOMNode(), x.DOMNode());
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.childs = function () {
            return ['lol', 5];
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMTree();
    test.equal(node.innerHTML, 'lol5');
});
$mol_test(function (test) {
    var $mol_viewer_test_item = (function (_super) {
        __extends($mol_viewer_test_item, _super);
        function $mol_viewer_test_item() {
            _super.apply(this, arguments);
        }
        return $mol_viewer_test_item;
    }($mol_viewer));
    var $mol_viewer_test_block = (function (_super) {
        __extends($mol_viewer_test_block, _super);
        function $mol_viewer_test_block() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test_block.prototype.element = function (id) {
            return new $mol_viewer_test_item();
        };
        __decorate([
            $mol_prop()
        ], $mol_viewer_test_block.prototype, "element", null);
        return $mol_viewer_test_block;
    }($mol_viewer));
    var x = new $mol_viewer_test_block();
    test.equal(x.DOMNode().getAttribute('mol_viewer_test_block'), '');
    test.equal(x.DOMNode().getAttribute('mol_viewer'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_block_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_element'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_item'), '');
    test.equal(x.element(0).DOMNode().getAttribute('mol_viewer'), '');
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.attr = function () {
            return {
                'href': function () { return '#haha'; },
                'required': function () { return true; },
                'hidden': function () { return null; },
            };
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMTree();
    test.equal(node.getAttribute('href'), '#haha');
    test.equal(node.getAttribute('hidden'), null);
});
$mol_test(function (test) {
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.field = function () {
            return {
                'style.top': function () { return '10px'; }
            };
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMTree();
    test.equal(node.style.top, '10px');
});
$mol_test(function (test) {
    var clicked = false;
    var $mol_viewer_test = (function (_super) {
        __extends($mol_viewer_test, _super);
        function $mol_viewer_test() {
            _super.apply(this, arguments);
        }
        $mol_viewer_test.prototype.event = function () {
            var _this = this;
            return {
                'click': function () {
                    var diff = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        diff[_i - 0] = arguments[_i];
                    }
                    return _this.eventClick.apply(_this, diff);
                }
            };
        };
        $mol_viewer_test.prototype.eventClick = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i - 0] = arguments[_i];
            }
            clicked = true;
        };
        return $mol_viewer_test;
    }($mol_viewer));
    var x = new $mol_viewer_test();
    var node = x.DOMNode();
    node.click();
    test.ok(clicked);
});
//viewer.stage=test.js.map
//# sourceMappingURL=web.test.js.map