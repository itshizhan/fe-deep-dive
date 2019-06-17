// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
// 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (true){
    //定时器启动时候，第三个以后的参数是作为第一个func()的参数传进去。
    /**
     setTimeout(function(){
       resolve(arguments)
     },10)
     */
    setTimeout(resolve, 10, "done"); 
    // resolve(value);

  } else {
    reject(error);
  }
});

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。


// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
// 第二个函数是可选的，不一定要提供。
// 这两个函数都接受Promise对象传出的值作为参数。
/**
@param onfulfilled — The callback to execute when the Promise is resolved.
@param onrejected — The callback to execute when the Promise is rejected.
@returns — A Promise for the completion of which ever callback is executed.
 */
promise.then(value=>{
  // console.log(value)
},reason=>{
  // console.log(reason)
})


// Promise 新建后就会立即执行。

// let promise1 = new Promise(function(resolve, reject) {
//   console.log('Promise');
//   resolve();
// });
// console.log("middle");

const p1 = new Promise(function (resolve, reject) {
  console.log("p1 start running");
  setTimeout(() => {
    console.log("p1 reject before");
    reject(new Error('fail'));
    console.log("p1 reject after");
    setTimeout(()=>{
      console.log("p1 reject after after after");
    },0)
   
}, 3000)
})

const p2 = new Promise(function (resolve, reject) {
  console.log("p2 start running");
  setTimeout(() => {
    console.log("p2 resolve before");
    resolve(p1);
    console.log("p2 resolve after");
  }, 1000)
})

p2.then(val=>{
  console.log("p2 then");
}).catch(err=>{
  console.log("p2 catch");
})