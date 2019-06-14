console.log("hello ts");
// 串行promise和 异步结果的传递
// 串行 Promise 是指在当前 promise 达到 fulfilled 状态后，即开始进行下一个 promise（后邻 promise）
function Promise(fn) {
  var promise = this,
      value = null;
      promise._resolves = [];
      promise._status = 'PENDING';

  // then 返回的应该还是一个Promise。因为是同类型，所以链式仍然可以实现。
  this.then = function (onFulfilled) {
      return new Promise(function(resolve) {
           // handle 函数对上一个 promise 的 then 中回调进行了处理，并且调用了当前的 promise 中的 resolve 方法。
          function handle(value) {
              var ret = typeof onFulfilled === 'function' && onFulfilled(value) || value;
              resolve(ret);
          }
          // 此处的promise （promise._resolves 中的 promise）指向的都是上一个 promise 对象。
          if (promise._status === 'PENDING') {
              promise._resolves.push(handle);
          } else if(promise._status === FULFILLED){
              handle(value);
          }
      })
      
  };


  function resolve(value) {
      setTimeout(function(){
          promise._status = "FULFILLED";
          promise._resolves.forEach(function (callback) {
              value = callback( value);
          })
      },0);
  }

  fn(resolve);
}

