import { mobile } from './mobile';
import { signup } from './signup';
import { account } from './account';
import { explorer } from './explorer';

const modules = {
  signup,
  mobile,
  account,
  explorer
};

const initJS = (() => {
  const jsComponents = document.querySelectorAll('*[data-jscript]');

  Array.from(jsComponents).forEach(component => {
    const script = modules[component.dataset.jscript];

    script.init();
  });
})();
