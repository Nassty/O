O, the little function library that could
=========================================

jquery is mainly to manipulate the DOM, underscore is for arrays and objects...

... O is for functions

O.js provides some useful functions to play with functions and higher order functions

O.returner(val)
---------------

*O.returner* returns a function that when called will return *val* ::

       >>> var return5 = O.returner(5);
       undefined
       >>> return5()
       5

why is it useful?
.................

sometimes you need a simple function and it's cleaner to create it this way

O.callback(fun, [arg1, ..., argN])
----------------------------------

*O.callback* returns a function that when called will call *fun* passing the rest of the
parameters to it::

        >>> var logLater = O.callback(console.log, "hello there", 42);
        undefined
        >>> logLater();
        hello there 42

why is it useful?
.................

imagine you want to display an error if an AJAX request fails, you could do::

        >>> $.get(url).done(happyCase).fail(O.callback(alert, "the request failed"));

you already know the function you will call and the parameters, so it's simpler to create
the function there.

O.args(args, [begin, [end]])
----------------------------

*O.args* returns a slice of the arguments object passed in *args*
sliced starting from *begin* until the *end*. Both *being* and *end* are optional::

        >>> fun = function () { console.log("first", arguments[0], "rest", O.args(arguments, 1)); }
        function()
        >>> fun(1,2,3,4,5);
        first 1 rest [2, 3, 4, 5]

why is it useful?
.................

useful for building tools like *O.js* ;)


O.partial(fun, arg1, [arg2, ..., argN])
---------------------------------------

*O.partial* returns a function that when called will call *fun* passing the rest of the arguments
passed to *O.partial* plus the arguments passed to the function::

        >>> multiply = function (a, b) { return a * b; };
        function()
        >>> multiplyBy2 = O.partial(multiply, 2);
        function()
        >>> multiply(2, 5);
        10
        >>> multiplyBy2(5);
        10

why is it useful?
.................

useful when you see yourself using the same function with some fixed parameters
all over the place.


O.bind(fun, [thisArg])
----------------------

*O.bind* returns a function that when called will call *fun* passing the parameters passed to
the function with *this* bound to *thisArg*.

If this is not passed then *this* will be *null*::

        >>> addThis = O.bind(function (num) { return this + num; }, 5);
        function()
        >>> addThis(2);
        7

why is it useful?
.................

useful for things like event handlers.


O.compose(inner, outer, [unpack=false])
--------------------------------------

*O.compose* returns a function wrapping inner and outer. The returned value of inner is 
passed as outer as an argument. If the flag unpack is true and the inner function returns several
values as an array, the outer function will receive those arguments as parameters::

        >>> var add = function (a, b) { return a + b };
        function()
        >>> var double = function (a) { a * 2 };
        function()
        >>> O.compose(add, double) (1, 2);
        6

why is it useful?
.................

With this function is trivial to implement several functions in a single call, IE: using map.


O.flip(fun)
-----------

*O.flip* wraps a function to receive the arguments in reverse order::

        >>> var divide = function (a, b) { return a / b};
        function()
        >>> O.flip(divide) (1, 2)
        2

why is it useful?
................

Allows to manipulate the arguments without changing the function's signature.


FAQ
---

Why the name O?
...............

looking for short names $ and _ where already taken so I looked for a nice uppercase letter

Why not F if it's about functions?
..................................

O is simmetryc and nice ;)

Is that the zero number or the O letter?
........................................

the O letter

Can I use the number instead?
.............................

no you can't

Where is the bathroom?
......................

at the end of the corridor and then right

Is this the E5 bus stop?
........................

no it isn't
