import { mobile } from './mobile';
import { signup } from './signup';
import { account } from './account';
import { explorer } from './explorer';
import { notifications } from './notifications';

const modules = {
  signup,
  mobile,
  account,
  explorer,
  notifications
};

// run modules
const initJS = (() => {
  const jsComponents = document.querySelectorAll('*[data-jscript]');

  Array.from(jsComponents).forEach(component => {
    const script = modules[component.dataset.jscript];

    script.init();
  });
})();
