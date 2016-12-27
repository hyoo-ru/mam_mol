var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_suggester = (function (_super) {
            __extends($mol_suggester, _super);
            function $mol_suggester() {
                return _super.apply(this, arguments) || this;
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
            $mol_suggester.prototype.selectedRow = function (next) {
                this.value();
                return (next !== void 0) ? next : 0;
            };
            $mol_suggester.prototype.eventPress = function (next) {
                var selectedRow = this.selectedRow();
                var suggestsLength = this.lister().childsVisible().length;
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
                    case $.$mol_keyboard_code.space:
                        if (!selectedRow)
                            return;
                        this.value(this.suggests()[selectedRow - 1]);
                        break;
                }
            };
            $mol_suggester.prototype.focused = function () {
                return $.$mol_viewer_selection.focused().indexOf(this.DOMNode()) !== -1;
            };
            $mol_suggester.prototype.selected = function (index) {
                return index === (this.selectedRow() - 1);
            };
            $mol_suggester.prototype.suggest = function (index) {
                return this.suggests()[index];
            };
            return $mol_suggester;
        }($.$mol_suggester));
        __decorate([
            $.$mol_mem(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], $mol_suggester.prototype, "contextSub", null);
        __decorate([
            $.$mol_mem(),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Object]),
            __metadata("design:returntype", void 0)
        ], $mol_suggester.prototype, "selectedRow", null);
        $mol.$mol_suggester = $mol_suggester;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
