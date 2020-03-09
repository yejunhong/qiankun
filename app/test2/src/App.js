import React, { useCallback, useState, useEffect, useMemo } from 'react';
import './App.css';

function Child({callback}) {
  const [count, setCount] = useState(() => callback())
  useEffect(() => {
    console.log(callback.toString())
    setCount(callback());
    return () => {
      console.log('delete')
    }
  }, [callback])
  return (
    <>
      Count：{count}
    </>
  )
}

function App() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const click = useCallback(() => {
      console.log('click')
      return count + 1;
  }, [count])

  const click1 = useCallback(() => {
    console.log('click1')
    return count1 + 1;
  }, [count1]);

  const ChildMemo = useMemo(() => {
    console.log(1)
    return <Child callback={click}/>;
  }, [click])

  return (
    <div className="App">
      <div onClick={() => setCount(count + 1)}>c111111</div>
      <div onClick={() => setCount1(count1 + 1)}>c1322222</div>
      <Child callback={click}/>
      <p>-------</p>
      <Child callback={click1}/>
      {ChildMemo}
    </div>
  );
}

export default App;
