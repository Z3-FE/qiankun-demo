const render = $ => {
  $('#myHtml-container').html('Hello, render with jQuery');
  return Promise.resolve();
};

(global => {
  global['myHtml'] = {
    bootstrap: () => {
      console.log('myHtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('myHtml mount');
      return render($);
    },
    unmount: () => {
      console.log('myHtml unmount');
      return Promise.resolve();
    },
  };
})(window);
