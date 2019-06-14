
// 添加promise.race
function Promise(fn) {
  var promise = this;
  promise._value;
  promise._reason;
  promise._resolves = [];
  promise._rejects = [];
  promise._status = 'PENDING';


  this.then = function (onFulfilled, onRejected) {
    return new Promise(function (resolve, reject) {
      function handle(value) {
        var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
        if (ret && typeof ret['then'] == 'function') {
          ret.then(function (value) {
            resolve(value);
          }, function (reason) {
            reject(reason);
          });
        } else {
          resolve(ret);
        }
      }
      function errback(reason) {
        reason = typeof onRejected === 'function' && onRejected(reason) || reason;
        reject(reason);
      }
      if (promise._status === 'PENDING') {
        promise._resolves.push(handle);
        promise._rejects.push(errback);
      } else if (promise._status === 'FULFILLED') {
        handle(promise._value);
      } else if (promise._status === 'REJECTED') {
        errback(promise._reason);
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

  function reject(value) {
    setTimeout(function () {
      promise._status = "REJECTED";
      promise._rejects.forEach(function (callback) {
        promise._reason = callback(value);
      })
    }, 0);
  }

  fn(resolve, reject);
}

// 添加Promise.all方法
// Promise.all 可以接收一个元素为 Promise 对象的数组作为参数
// 当这个数组里面所有的 Promise 对象都变为 resolve 时，该方法才会返回。
// Promise.all会返回一个 Promise 实例，
// 该实例直到参数中的所有的 promise 都执行成功，才会执行成功回调，一个失败就会执行失败回调。
Promise.all = function (promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('You must pass an array to all.');
  }
  // 返回一个promise 实例
  return new Promise(function (resolve, reject) {
    var i = 0,
      result = [],
      len = promises.length,
      count = len
    // 每一个 promise 执行成功后，就会调用一次 resolve 函数
    function resolver(index) {
      return function (value) {
        resolveAll(index, value);
      };
    }

    function rejecter(reason) {
      reject(reason);
    }

    function resolveAll(index, value) {
      // 存储每一个promise的参数
      result[index] = value;
      // 等于0 表明所有的promise 都已经运行完成，执行resolve函数
      if (--count == 0) {
        resolve(result)
      }
    }

    for (; i < len; i++) {
      promises[i].then(resolver(i), rejecter);
    }
  });
}


// 该函数和 Promise.all 相类似，它同样接收一个数组
// 不同的是只要该数组中的任意一个 Promise 对象的状态发生变化（无论是 resolve 还是 reject）该方法都会返回。
// 代码中没有类似一个 resolveAll 的函数，因为我们不需要等待所有的 promise 对象状态都发生变化，只要一个就可以了。

Promise.race = function(promises){
  if (!Array.isArray(promises)) {
      throw new TypeError('You must pass an array to race.');
  }
  return new Promise(function(resolve,reject){
      var i = 0,
          len = promises.length;

      function resolver(value) {
          resolve(value);
      }

      function rejecter(reason){
          reject(reason);
      }

      for (; i < len; i++) {
          promises[i].then(resolver,rejecter);
      }
  });
}