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

    /* returns the arguments in *args* starting from *from* */
    O.args = function (args, from) {
        from = from || 0;
        return Array.prototype.slice.apply(args, [from]);
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

    window.O = O;
}());
