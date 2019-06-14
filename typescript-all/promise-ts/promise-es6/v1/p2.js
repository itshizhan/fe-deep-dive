//链式支持

function Promise(fn) {
  //promise = this， 这样我们不用担心某个时刻 this 指向突然改变问题。
  let promise = this;
  let value = null;
  promise._resolves = [];

  //调用 then 方法，将回调放入 promise._resolves 队列；
  this.then = function (onFulfilled) {
      promise._resolves.push(onFulfilled);
      return this;
  };

  function resolve(value) {
      setTimeout(function() {
          promise._resolves.forEach(function (callback) {
              callback(value);
          });
      },0);
  }

  //创建 Promise 对象同时，调用其 fn, 并传入 resolve 方法，
  //当 fn 的异步操作执行成功后，就会调用 resolve ，也就是执行promise._resolves 队列中的回调；
  fn(resolve);
  
}
