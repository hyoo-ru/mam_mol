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
var $;
(function ($) {
    $.$mol_test({
        'must be false': function () {
            $.$mol_assert_not(0);
        },
        'must be true': function () {
            $.$mol_assert_ok(1);
        },
        'must be equal': function () {
            $.$mol_assert_equal(2, 2);
        },
        'must be unique': function () {
            $.$mol_assert_unique([3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
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
    function $mol_assert_fail(message) {
        throw new Error(message);
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
var $;
(function ($) {
    $.$mol_test({
        'init with overload': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    _super.apply(this, arguments);
                }
                X.prototype.foo = function () {
                    return 1;
                };
                return X;
            }($.$mol_object));
            var x = new X().setup(function (obj) {
                obj.foo = function () { return 2; };
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
        'objectPath generation': function () {
            var x = new $.$mol_object;
            $.$mol_assert_equal(x.objectPath(), '');
            x.objectField('foo()');
            $.$mol_assert_equal(x.objectPath(), '.foo()');
            x.objectField('bar()');
            $.$mol_assert_equal(x.objectPath(), '.foo()');
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'set-shim must have equal api to native Set': function () {
            var set = new $.$mol_set_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            set.add(obj1);
            set.add(obj2);
            $.$mol_assert_equal(set.size, 2);
            $.$mol_assert_ok(set.has(obj1));
            $.$mol_assert_ok(set.has(obj2));
            $.$mol_assert_not(set.has(obj3));
            var entries = set.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], obj1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], obj2);
            set.delete(obj2);
            $.$mol_assert_not(set.has(obj2));
        },
    });
})($ || ($ = {}));
//set.test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'dict shim must have equal api to native Map': function () {
            var dict = new $.$mol_dict_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            dict.set(obj1, 1);
            dict.set(obj2, 2);
            $.$mol_assert_equal(dict.size, 2);
            $.$mol_assert_ok(dict.has(obj1));
            $.$mol_assert_ok(dict.has(obj2));
            $.$mol_assert_not(dict.has(obj3));
            $.$mol_assert_equal(dict.get(obj1), 1);
            $.$mol_assert_equal(dict.get(obj2), 2);
            $.$mol_assert_equal(dict.get(obj3), void 0);
            var entries = dict.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], 1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], 2);
            dict.delete(obj2);
            $.$mol_assert_not(dict.has(obj2));
        }
    });
})($ || ($ = {}));
//dict.test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'cached property with simple key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    _super.apply(this, arguments);
                }
                X.prototype.foo = function (id, next) {
                    if (next == null)
                        return new Number(123);
                    return new Number(next);
                };
                __decorate([
                    $.$mol_mem_key()
                ], X.prototype, "foo", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
            $.$mol_assert_equal(x.foo(0), x.foo(0));
            $.$mol_assert_unique(x.foo(0), x.foo(1));
            x.foo(0, 321);
            $.$mol_assert_equal(x.foo(0).valueOf(), 321);
            x.foo(0, null);
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
        },
        'cached property with complex key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    _super.apply(this, arguments);
                }
                X.prototype.foo = function (ids) {
                    return Math.random();
                };
                __decorate([
                    $.$mol_mem_key()
                ], X.prototype, "foo", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.foo([0, 1]), x.foo([0, 1]));
            $.$mol_assert_unique(x.foo([0, 1]), x.foo([0, 2]));
        },
        'auto sync of properties': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    _super.apply(this, arguments);
                }
                X.prototype.foo = function (next) {
                    return next || 1;
                };
                X.prototype.bar = function () {
                    return this.foo() + 1;
                };
                X.prototype.xxx = function () {
                    return this.bar() + 1;
                };
                __decorate([
                    $.$mol_mem()
                ], X.prototype, "foo", null);
                __decorate([
                    $.$mol_mem()
                ], X.prototype, "bar", null);
                __decorate([
                    $.$mol_mem()
                ], X.prototype, "xxx", null);
                return X;
            }($.$mol_object));
            var x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        'must be destroyed if not more reference': function () {
            var foo;
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    _super.apply(this, arguments);
                }
                B.prototype.showing = function (next) {
                    if (next === void 0)
                        return true;
                    return next;
                };
                B.prototype.foo = function () {
                    return foo = new $.$mol_object;
                };
                B.prototype.bar = function () {
                    return this.showing() ? this.foo() : null;
                };
                __decorate([
                    $.$mol_mem()
                ], B.prototype, "showing", null);
                __decorate([
                    $.$mol_mem()
                ], B.prototype, "foo", null);
                __decorate([
                    $.$mol_mem()
                ], B.prototype, "bar", null);
                return B;
            }($.$mol_object));
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            $.$mol_defer.run();
            $.$mol_assert_ok(foo.destroyed());
            $.$mol_assert_ok(bar.destroyed());
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        'wait for data': function () {
            var name = 'Jin';
            var Test = (function (_super) {
                __extends(Test, _super);
                function Test() {
                    _super.apply(this, arguments);
                }
                Test.prototype.source = function (next, prev) {
                    var _this = this;
                    new $.$mol_defer(function () {
                        _this.source(void 0, name);
                    });
                    throw new $.$mol_atom_wait('Wait!');
                };
                Test.prototype.middle = function () {
                    return this.source();
                };
                Test.prototype.target = function () {
                    return this.middle();
                };
                __decorate([
                    $.$mol_mem()
                ], Test.prototype, "source", null);
                __decorate([
                    $.$mol_mem()
                ], Test.prototype, "middle", null);
                __decorate([
                    $.$mol_mem()
                ], Test.prototype, "target", null);
                return Test;
            }($.$mol_object));
            var t = new Test;
            try {
                t.target();
            }
            catch (error) {
                $.$mol_assert_ok(error instanceof $.$mol_atom_wait);
            }
            $.$mol_defer.run();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'local get set delete': function () {
            var key = '$mol_state_local_test:' + Math.random();
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
            $.$mol_state_local.value(key, 123);
            $.$mol_assert_equal($.$mol_state_local.value(key), 123);
            $.$mol_state_local.value(key, null);
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//local.test.js.map
;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'id auto generation': function () {
            var $mol_viewer_test_item = (function (_super) {
                __extends($mol_viewer_test_item, _super);
                function $mol_viewer_test_item() {
                    _super.apply(this, arguments);
                }
                return $mol_viewer_test_item;
            }($.$mol_viewer));
            var $mol_viewer_test_block = (function (_super) {
                __extends($mol_viewer_test_block, _super);
                function $mol_viewer_test_block() {
                    _super.apply(this, arguments);
                }
                $mol_viewer_test_block.prototype.element = function (id) {
                    return new $mol_viewer_test_item();
                };
                __decorate([
                    $.$mol_mem_key()
                ], $mol_viewer_test_block.prototype, "element", null);
                return $mol_viewer_test_block;
            }($.$mol_viewer));
            var x = new $mol_viewer_test_block();
            $.$mol_assert_equal(x.DOMNode().id, '');
            $.$mol_assert_equal(x.element(0).DOMNode().id, '.element(0)');
        },
        'caching ref to dom node': function () {
            var $mol_viewer_test = (function (_super) {
                __extends($mol_viewer_test, _super);
                function $mol_viewer_test() {
                    _super.apply(this, arguments);
                }
                return $mol_viewer_test;
            }($.$mol_viewer));
            var x = new $mol_viewer_test();
            $.$mol_assert_equal(x.DOMNode(), x.DOMNode());
        },
        'content render': function () {
            var $mol_viewer_test = (function (_super) {
                __extends($mol_viewer_test, _super);
                function $mol_viewer_test() {
                    _super.apply(this, arguments);
                }
                $mol_viewer_test.prototype.childs = function () {
                    return ['lol', 5];
                };
                return $mol_viewer_test;
            }($.$mol_viewer));
            var x = new $mol_viewer_test();
            var node = x.DOMTree();
            $.$mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation': function () {
            var $mol_viewer_test_item = (function (_super) {
                __extends($mol_viewer_test_item, _super);
                function $mol_viewer_test_item() {
                    _super.apply(this, arguments);
                }
                return $mol_viewer_test_item;
            }($.$mol_viewer));
            var $mol_viewer_test_block = (function (_super) {
                __extends($mol_viewer_test_block, _super);
                function $mol_viewer_test_block() {
                    _super.apply(this, arguments);
                }
                $mol_viewer_test_block.prototype.element = function (id) {
                    return new $mol_viewer_test_item();
                };
                __decorate([
                    $.$mol_mem_key()
                ], $mol_viewer_test_block.prototype, "element", null);
                return $mol_viewer_test_block;
            }($.$mol_viewer));
            var x = new $mol_viewer_test_block();
            $.$mol_assert_equal(x.DOMNode().getAttribute('mol_viewer_test_block'), '');
            $.$mol_assert_equal(x.DOMNode().getAttribute('mol_viewer'), '');
            $.$mol_assert_equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_block_element'), '');
            $.$mol_assert_equal(x.element(0).DOMNode().getAttribute('mol_viewer_element'), '');
            $.$mol_assert_equal(x.element(0).DOMNode().getAttribute('mol_viewer_test_item'), '');
            $.$mol_assert_equal(x.element(0).DOMNode().getAttribute('mol_viewer'), '');
        },
        'render custom attributes': function () {
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
            }($.$mol_viewer));
            var x = new $mol_viewer_test();
            var node = x.DOMTree();
            $.$mol_assert_equal(node.getAttribute('href'), '#haha');
            $.$mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields': function () {
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
            }($.$mol_viewer));
            var x = new $mol_viewer_test();
            var node = x.DOMTree();
            $.$mol_assert_equal(node.style.top, '10px');
        },
        'attach event handlers': function () {
            var clicked = false;
            var $mol_viewer_test = (function (_super) {
                __extends($mol_viewer_test, _super);
                function $mol_viewer_test() {
                    _super.apply(this, arguments);
                }
                $mol_viewer_test.prototype.event = function () {
                    var _this = this;
                    return {
                        'click': function (next) { return _this.eventClick(next); }
                    };
                };
                $mol_viewer_test.prototype.eventClick = function (next) {
                    clicked = true;
                };
                return $mol_viewer_test;
            }($.$mol_viewer));
            var x = new $mol_viewer_test();
            var node = x.DOMNode();
            node.click();
            $.$mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//viewer.test.js.map
//# sourceMappingURL=web.test.js.map