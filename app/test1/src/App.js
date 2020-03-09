import React from 'react';
import { useStore, setStore } from './store';

function User1() {
  const data = useStore();
  return (
    <>User1{data.count}</>
  )
}

function User() {
  const data = useStore();
  return (
    <>User{data.count}</>
  )
}

function App(props) {
  const data = useStore();
  return (
    <div className="App">
      test1 _ {data.count}
      <hr/>
      <User/>
      <hr/>
      <User1/>
      
    </div>
  );
}
let c = 1;
function Main(props) {
  console.log(1)
  return (
    <>
      Main 
      <hr/>
      <App/>
      <div onClick={() => {
        setStore({count: c + 1, name: 'age'})
        c = c + 1;
      }}>修改</div>
    </>
  )
}

export default Main;
