import React, { useState,useEffect } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(10);

  const countChange = ()=>{
    setCount(count + 1)
  }
  function countChange1(){
    setCount(count + 2)
  }

  useEffect((props) => {
    console.log(props);
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={countChange}>
        Click me add 1
      </button>
      <button onClick={countChange1}>
        Click me add 2
      </button>
      {/* <button onClick={() => setCount(count + 1)}>
        Click me
      </button> */}
    </div>
  );
}

export default Example;