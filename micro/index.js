import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import render from './render/react';

function genActiveRule(routerPrefix) {
    return (location) => {
        return location.pathname.startsWith(routerPrefix);
    };
  }

registerMicroApps([
    {
        name: 'test1',
        entry: '//localhost:5001',
        render,
        activeRule: genActiveRule('/test')
    },
    {
        name: 'test2',
        entry: '//localhost:5002',
        render,
        activeRule: genActiveRule('/test1')
    }
]);
setDefaultMountApp('/test');
start({
    prefetch: true,
    jsSandbox: true,
    singular: false,
    fetch: window.fetch,
});