import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import './App.css';


const iniList = [];
for (let i = 0; i < 10; i++) {
  iniList.push({id: i, name: `name${i}`});
}

const ob = observable({list: iniList});

const Li = observer(({v, k, sort}) => {
  console.log(v.id)
  return (
    <li key={k}>{v.name} <span onClick={() => sort(k, v)}>下移</span></li>
  )
})

const List = observer(() => {
  const listdata = ob.list;
  const sort = useCallback((k, v) => {
    const idx = listdata.findIndex((t) => t.id === v.id);
    const d = listdata[idx];
    listdata[idx] = listdata[idx + 1];
    listdata[idx + 1] = d; 
  }, [listdata]);
  return (
    <div>
      <ul>
        {
          listdata.map((v, k) => {
            return (<Li key={k} v={v} k={k} sort={sort}/>)
          })
        }
      </ul>
    </div>
  )
});

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
      <p>-------</p>
      <List/>
    </div>
  );
}

export default App;
