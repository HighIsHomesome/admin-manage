function asyncify(fn) {
    var orig_fn = fn
    intv = setTimeout(
        /**异步， */
        function () {
            intv = null;
            if (fn) fn();
        }, 0
    )

    fn = null;
    return function () {
        // 触发太快，在定时器intv触发指示异步转换发生之前？
        if (intv) {
            fn = orig_fn.bind.apply(
                orig_fn
                // 把封装器的this添加到bind(..)调用的参数中，
                // 以及克里化（currying）所有传入参数
                [this].concat([].slice.call(arguments))
            );
        }
        // 已经是异步
        else {
            // 调用原来的函数
            orig_fn.apply(this, arguments);
        }
    };
}

function result(data) {
    console.log(a);
}

var a = 0

setTimeout(() => {
    asyncify(result)
}, 0);

a++

/***我们需要一种更同步、更顺序、更阻塞的的方式来表达异步，就像我们的大脑一样。 */