console.log("hello ts");
// const isResolve = true;

// const promise1 = new Promise((resolve, reject) => {
//   if (isResolve) {
//     resolve('promise1 执行态');
//   } else {
//     reject('promise1 拒绝态');
//   }
// });

// 一、promise1 处于 resolve 以及 onFulfilled 抛出异常 的情况
// promise2 必须拒绝执行，并返回拒因
// promise1
//   .then((value) => {
//     console.log(value);
//     throw 'p1抛出异常!';
//   })
//   // promise2
//   .then(
//     value => {
//       console.log("p2 resolve");
//       console.log(value);
//     },
//     reason => {
//       console.log("p2 reason");  // this run 
//       console.log(reason);
//     }
//   );



// 二、promise1 处于 resolve 以及 onFulfilled 不是函数的情况
// promise2 必须成功执行并返回相同的值
// promise1.then().then(value => {
//   console.log(value);
// });


// 三、promise1 处于 reject 以及 onRejected 不是函数的情况
// promise2 必须拒绝执行并返回拒因
// promise1.then().then(
//   (resolve) => {
//     console.log("p2 resolve");
//     console.log(resolve);
//   },
//   reason => {
//     console.log(reason);
//   }
// );

// 四、promise1 处于 resolve 以及 onFulfilled 有返回值时
// promise1
//   .then(value => {
//     console.log(value);
//     return value;
//   })
//   .then(value => {
//     console.log(value);
//   });


import Promise from './core/promise';

console.log(Promise);

export default Promise;

/**    以下为测试      */

// import { Promise } from 'es6-promise';

const promise1 = new Promise((resolve)=>{
  resolve("p1----");
})

const promise2 =  promise1.then()

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(1);
//   }, 500);
// });

// Promise.reject('a')
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 500);
// });

// const promise2 = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(2);
//   }, 2000);
// });
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   }, 1000);
// });

// Promise.all([promise1, promise2, promise3])
//   .then(data => {
//     console.log('data', data);
//   })
//   .catch(reason => {
//     console.log(reason);
//   });

// const promise1 = new Promise((resolve, reject) => {
//   // reject('error');
//   throw 'err';
// });

// const promise2 = new Promise(resolve => {
//   resolve(promise1);
// });

promise2
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });



/**
 
let p1 = axios.get("/a");
let p2 = axios.get("/b")
Promise.all([p1,p2]).then(res=>{
  
})    

   





 */

