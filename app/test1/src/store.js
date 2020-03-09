import { useState, useEffect } from 'react';

const listen = [];
let time;
// 初始化 对象
const proxyObj = new Proxy({count: 2}, {
    get(target, key) {
        // console.log(1)
        return target[key];
    },
    set(target, key, value) {
        if (time) {
            clearTimeout(time);
        }
        setTimeout(() => {
            listen.map((fun) => {
                fun();
                return true;
            })
        }, 100)
        return Reflect.set(target, key, value);
    }
});

// 修改store值
export function setStore(d) {
    console.log(d)
    const k = Object.keys(d);
    k.map((v) => {
        proxyObj[v] = d[v];
        return true;
    })
}

// 获取store 状态
export function useStore() {
    const [data, setData] = useState({data: proxyObj});
    useEffect(() => {
        const index = listen.push(() => {
            setData({data: proxyObj})
        })
        return () => { // 卸载
            listen.splice(index, 1); // 删除监听
        };
    }, []);
    return {
        ...data.data, 
        /*setStore(d) {
            const k = Object.keys(d);
            k.map((v) => {
                proxyObj[v] = d[v];
                return true;
            })
        }*/
    }
}