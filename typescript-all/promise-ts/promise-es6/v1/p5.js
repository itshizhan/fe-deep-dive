console.log("hello ts");
// 添加了对promise对象的判断
function Promise(fn) {
  var promise = this,
    value = null;
  promise._resolves = [];
  promise._status = 'PENDING';

  // then 返回的应该还是一个Promise。因为是同类型，所以链式仍然可以实现。
  this.then = function (onFulfilled) {
    return new Promise(function (resolve) {
      // handle 函数对上一个 promise 的 then 中回调进行了处理，并且调用了当前的 promise 中的 resolve 方法。
      function handle(value) {
        var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;

        // ret 进行了判断，如果是一个 promise 对象，就会调用其 then 方法，形成一个嵌套，直到其不是promise对象为止。
        // 同时 在 then 方法中我们添加了调用 resolve 方法，这样链式得以维持。
        if (ret && typeof ret['then'] == 'function') {
          ret.then(function (value) {
            resolve(value);
          });
        } else {
          resolve(ret);
        }

      }
      // 此处的promise （promise._resolves 中的 promise）指向的都是上一个 promise 对象。
      if (promise._status === 'PENDING') {
        promise._resolves.push(handle);
      } else if (promise._status === FULFILLED) {
        handle(value);
      }
    })

  };


  function resolve(value) {
    setTimeout(function () {
      promise._status = "FULFILLED";
      promise._resolves.forEach(function (callback) {
        value = callback(value);
      })
    }, 0);
  }

  fn(resolve);
}

