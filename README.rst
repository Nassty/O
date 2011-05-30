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
--------------------------

*O.args* returns a slice of the arguments object passed in *args*
sliced starting from *begin* until the *end*. Both *being* and *end* are optional.

O.partial(fun, arg1, [arg2, ..., argN])
---------------------------------------

*O.partial* returns a function that when called will call *fun* passing the rest of the arguments
passed to *O.partial* plus the arguments passed to the function.

O.bind(fun, [thisArg])
----------------------

*O.bind* returns a function that when called will call *fun* passing the parameters passed to
the function with *this* bound to *thisArg*.

If this is not passed then *this* will be *null*.

FAQ
---

Why the name O?
...............

looking for short names $ and _ where already taken so I looked for a nice uppercase letter

Why not F if it's about functions?
..................................

O is simetric and nice ;)

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
