/*global window */
(function () {
    "use strict";
    var O = {};

    // return a function that returns *val*
    O.returner = function (val) {
        return  function () {
            return val;
        };
    };

    /* returns a function that when called without arguments
     * will call *fun* passing the remaining arguments passed
     * to O.callback
     */
    O.callback = function (fun /*, arg1, ..., argN */) {
        var args = O.args(arguments, 1);

        return function () {
            return fun.apply(this, args);
        };
    };

    /* returns the arguments in *args* starting from *begin* until *end* */
    O.args = function (args, begin, end) {
        begin = begin || 0;
        return Array.prototype.slice.apply(args, [begin, end]);
    };

    /* return a function that when called will pass the original
     * arguments passed to O.partial plus the ones passed to the other
     * function */
    O.partial = function (fun /*, arg1, ..., argN */) {
        var args = O.args(arguments, 1);

        return function () {
            var allArgs = Array.prototype.concat.apply(args, arguments);
            return fun.apply(this, allArgs);
        };
    };

    // receive an arguments object and return an array with the same values
    O.argsToArray = function (args) {
        return Array.prototype.slice.call(args);
    };

    // return a function that when called will call *fun* with *thisArg*
    // as *this* and passing the arguments
    // if *thisArg* is not provided null, will be passed as *this*
    O.bind = function (fun, thisArg) {
        return  function () {
            return fun.apply(thisArg || null, arguments);
        };
    };

    // composes a new function by returning the output of inner
    // to outer as the first parameter.
    //
    // eg: 
    // var add = function(a, b) { return a + b }
    // var double = function(a) { return 2 * a }
    // O.compose(add, double)(1, 2) == double(add(1,2))
    //
    // by passing the unpack flag, the outer function will receive
    // several arguments if the inner function returns an array
    O.compose = function(inner, outer, unpack) {
        unpack = unpack || false;
        return function () {
            var inner_result = inner.apply(this, arguments),
                args = [];
            if(unpack) { // TODO: is this an array? well, it should be 
                args = inner_result; 
            } else {
                args = [inner_result];
            }
            return outer.apply(this, args);
        };
    };

    // wraps a function to receive the arguments flipped 
    O.flip = function(fun) {
        return function() {
            return fun.apply(this, Array.prototype.reverse.call(arguments));
        };
    };

    window.O = O;
}());
