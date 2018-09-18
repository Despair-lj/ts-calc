"use strict";
{
    var action = void 0;
    (function (action) {
        action["add"] = "+";
        action["sub"] = "-";
        action["mul"] = "\u00D7";
        action["div"] = "\u00F7";
        action["del"] = "";
    })(action || (action = {}));
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.n1 = '0';
            this.n2 = '0';
            this.operator = action.del;
            this.result = '';
            this.display = document.createElement('div');
            this.container = document.createElement('div');
            this.actionLists = [
                action.add,
                action.sub,
                action.mul,
                action.div
            ];
            this.leftLists = [
                7,
                8,
                9,
                4,
                5,
                6,
                1,
                2,
                3,
                0,
                '.',
                'AC'
            ];
            this.rightLists = ['='];
            this.createContainer();
            this.createElements();
            this.createButtons();
            this.bindEvents();
        }
        Calculator.prototype.createContainer = function () {
            this.container.classList.add('calc');
        };
        Calculator.prototype.createElements = function () {
            this.display.classList.add('calculator__display');
            this.display.textContent = '0';
            this.container.appendChild(this.display);
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            var actions = document.createElement('div');
            actions.classList.add('calculator__keys-actions');
            this.actionLists.forEach(function (act) {
                _this.createButton(act, actions);
            });
            var bottomContainer = document.createElement('div');
            bottomContainer.classList.add('calculator__keys-bottom');
            var left = document.createElement('div');
            var right = document.createElement('div');
            left.classList.add('left');
            right.classList.add('right');
            this.leftLists.forEach(function (list) {
                _this.createButton(list, left);
            });
            this.rightLists.forEach(function (list) {
                _this.createButton(list, right);
            });
            bottomContainer.appendChild(left);
            bottomContainer.appendChild(right);
            this.container.appendChild(actions);
            this.container.appendChild(bottomContainer);
        };
        Calculator.prototype.createButton = function (text, container) {
            var button = document.createElement('button');
            button.textContent = "" + text;
            container.appendChild(button);
            document.body.appendChild(this.container);
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener('click', function (e) {
                if (e.target instanceof HTMLButtonElement) {
                    var text = e.target.textContent || '';
                    if (~'0123456789.'.indexOf(text)) {
                        if (_this.operator !== action.del) {
                            _this.n2 =
                                ~_this.n2.indexOf('.') && text === '.'
                                    ? _this.n2
                                    : _this.n2 === '0'
                                        ? text === '.'
                                            ? _this.n2 + text
                                            : text
                                        : _this.n2 + text;
                            _this.display.textContent = _this.n2;
                        }
                        else {
                            _this.result = '';
                            _this.n1 =
                                ~_this.n1.indexOf('.') && text === '.'
                                    ? _this.n1
                                    : _this.n1 === '0'
                                        ? text === '.'
                                            ? _this.n1 + text
                                            : text
                                        : _this.n1 + text;
                            //this.n1 = this.n1 === '0' ? text : this.n1 + text
                            _this.display.textContent = _this.n1;
                        }
                    }
                    else if (~("" + action.add + action.sub + action.mul + "," + action.div).indexOf(text)) {
                        if (_this.result) {
                            _this.n1 = _this.result;
                            _this.result = '';
                        }
                        switch (text) {
                            case action.add:
                                _this.operator = action.add;
                                break;
                            case action.sub:
                                _this.operator = action.sub;
                                break;
                            case action.mul:
                                _this.operator = action.mul;
                                break;
                            case action.div:
                                _this.operator = action.div;
                                break;
                        }
                    }
                    else if (~'='.indexOf(text)) {
                        _this.result = _this.calc(_this.n1, _this.n2, _this.operator);
                        _this.display.textContent = _this.result;
                        _this.n1 = '0';
                        _this.n2 = '0';
                        _this.operator = action.del;
                    }
                    else if (text === 'AC') {
                        _this.n1 = '0';
                        _this.n2 = '0';
                        _this.operator = action.del;
                        _this.result = '';
                        _this.display.textContent = '0';
                    }
                }
            });
        };
        Calculator.prototype.calc = function (n1, n2, operator) {
            console.log(n1, n2, operator);
            var numberN1 = parseFloat(n1);
            var numberN2 = parseFloat(n2);
            var n1DotAfterNum = this.dotAfterNumber(n1);
            var n2DotAfterNum = this.dotAfterNumber(n2);
            var maxNum;
            switch (operator) {
                case action.add:
                    maxNum = n1DotAfterNum > n2DotAfterNum ? n1DotAfterNum : n2DotAfterNum;
                    return (numberN1 + numberN2).toFixed(maxNum);
                case action.sub:
                    maxNum = n1DotAfterNum > n2DotAfterNum ? n1DotAfterNum : n2DotAfterNum;
                    return (numberN1 - numberN2).toFixed(maxNum);
                case action.mul:
                    maxNum =
                        n1DotAfterNum !== 0
                            ? n2DotAfterNum === 0
                                ? n1DotAfterNum
                                : n1DotAfterNum * n2DotAfterNum
                            : n2DotAfterNum;
                    return (numberN1 * numberN2).toFixed(maxNum);
                case action.div:
                    return numberN2 === 0
                        ? "can't calc"
                        : (numberN1 / numberN1).toFixed(10);
                case action.del:
                    return "" + (numberN1 + numberN2);
                default:
                    return '';
            }
        };
        Calculator.prototype.dotAfterNumber = function (str) {
            return ~str.indexOf('.') ? str.split('.')[1].length : 0;
        };
        return Calculator;
    }());
    new Calculator();
}
