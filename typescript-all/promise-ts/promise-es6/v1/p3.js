// 引入状态
function Promise(fn) {
  var promise = this,
      value = null;
      promise._resolves = [];
      promise._status = 'PENDING'; //每个 Promise 存在三个互斥状态：pending、fulfilled、rejected。

  // Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。
  // 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。
  this.then = function (onFulfilled) {
      if (promise._status === 'PENDING') {
          promise._resolves.push(onFulfilled);
          return this;
      }
      onFulfilled(value);
      return this;
  };


  function resolve(value) {
      setTimeout(function(){
          promise._status = "FULFILLED";
          promise._resolves.forEach(function (callback) {
              callback(value);
          })
      },0);
  }

  fn(resolve);
}