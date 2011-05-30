/*global module, ok, raises, equal*/
(function () {
    "use strict";

    module("O");

    test("returner", function () {
        function check(val) {
            equal(O.returner(val)(), val);
        }

        check(42);
        check(1.3);
        check(null);
        check();
        check("");
        check("hi");
        check({});
        check([]);
        check([1, true, "string", 2.3, {}, []]);
    });

    test("callback", function () {
        function check(fun, arg, expected) {
            equal(O.callback(fun, arg)(), expected);
        }

        check(function (val) {
            return val + 1;
        }, 1, 2);

        check(function (val) {
            return val;
        }, null, null);
    });

    test("args", function () {
        function check(args, begin, end) {
            var argret = function (begin, end) {
                return function () {
                    return O.args(arguments, begin, end);
                };
            }, fun, returned, expected;

            fun = argret(begin, end);
            returned = fun.apply(null, args);
            expected = args.slice(begin, end);

            deepEqual(returned, expected);
        }

        check([1], 0);
        check([1], 1);
        check([1, 2, 3], 2);
        check([1, null, false, "asd"], 2);
        check([], 0);
        check([[]], 0);
        check([{}], 0);
        check([{a: 1}], 0);

        check([1, 2, 3, 4], 1, 3);
    });

    test("partial", function () {
        var addThree, addTwo, addOne, addOne1;

        function check(args1, args2) {
            var fun = function () {
                return O.argsToArray(arguments);
            }, returned, expected, curried;

            curried = O.partial.apply(null, [fun].concat(args1));
            returned = curried.apply(null, args2);
            expected = args1.concat(args2);

            deepEqual(returned, expected);
        }

        addThree = function (a, b, c) {
            return a + b + c;
        };

        addTwo = O.partial(addThree, 2);
        addOne = O.partial(addTwo, 1);

        addOne1 = O.partial(addThree, 2, 1);

        check([], []);
        check([1], [2]);
        // test some by hand just in case
        deepEqual(addOne(5), 8);
        deepEqual(addOne1(7), 10);
        deepEqual(O.partial(function (a, b) {
                return a + b;
        }, 1)(2), 3);
    });

    test("bind", function () {

        equal(O.bind(function () {
                return this;
        })(), null);

        equal(O.bind(function (b, c) {
                return this + b + c;
        }, 3)(42, 1), 46);
    });

}());
