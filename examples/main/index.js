// import 'zone.js'; // for angular subapp
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import './index.less';
/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
//import render from './render/ReactRender';

/**
 * Step1 初始化应用（可选）
 */
// render({ loading: true });

// const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'myHtml',
      entry: '//localhost:8100',
      container: '#app-view', //<main id="app-view"></main>
     // loader, 可以设置等待效果
      activeRule: '/myHtml', //跳转地址
    },
    {
      name: 'myHtml',
      entry: '//localhost:8200',
      container: '#app-view', //<main id="app-view"></main>
     // loader, 可以设置等待效果
      activeRule: '/myReact', //跳转地址
    },

  ],
  {
    beforeLoad: [
      (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      (app) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

// const { onGlobalStateChange, setGlobalState } = initGlobalState({
//   user: 'qiankun',
// });

// onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

// setGlobalState({
//   ignore: 'master',
//   user: {
//     name: 'master',
//   },
// });

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/react16');

/**
 * Step4 启动应用
 */
start();

// runAfterFirstMounted(() => {
//   console.log('[MainApp] first app mounted');
// });
