import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import render from './render/react';

function genActiveRule(routerPrefix) {
    return (location) => {
        console.log('micro', location.pathname, routerPrefix)
        return location.pathname.startsWith(routerPrefix);
    };
  }

registerMicroApps([
    {
        name: 'test1',
        entry: '//localhost:5001',
        render,
        activeRule: genActiveRule('/app1'),
        props: {
            name: 'app1',
            age: 1
        }
    },
    {
        name: 'test2',
        entry: '//localhost:5002',
        render,
        activeRule: genActiveRule('/app2')
    }
]);
setDefaultMountApp('/app1');
start({
    prefetch: true,
    jsSandbox: true,
    singular: false,
    fetch: window.fetch,
});