const render = $ => {
  return Promise.resolve();
};

(global => {
  global['myHtml'] = {
    bootstrap: () => {
      console.log('myHtml bootstrap');
      return Promise.resolve();
    },
    mount: (props) => {
      console.log('props',props);
      return render();
    },
    unmount: () => {
      console.log('myHtml unmount');
      return Promise.resolve();
    },
  };
})(window);
