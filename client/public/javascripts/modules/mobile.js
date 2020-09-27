import { dropdownUtils } from '../utils/dropdownUtils';

const mobile = (() => {
  let arrow;
  let mobileMenu;
  let mainMenuBlocks;

  const init = () => {
    arrow = document.querySelector('.arrow');
    mobileMenu = document.querySelector('.mobile-menu');
    mainMenuBlocks = Array.from(document.querySelector('.nav-bar').querySelectorAll('.container'));

    if(window.innerWidth > 725) {
      dropdownUtils.hideChildAnchors(mobileMenu);
    } else {
      dropdownUtils.hideChildAnchors(mobileMenu);

      mainMenuBlocks.forEach(block => {
        dropdownUtils.hideChildAnchors(block);
      });
    }

    arrow.addEventListener('click', (e) => {
      toggleNav();
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > 725) {
        dropdownUtils.hideChildAnchors(mobileMenu);

        mainMenuBlocks.forEach(block => {
          dropdownUtils.showChildAnchors(block);
        });
      }
    });
  };

  const toggleNav = () => {
    if(arrow.classList.contains('arrow-open')) {
      arrow.classList.remove('arrow-open');
      dropdownUtils.hideChildAnchors(mobileMenu);
      mobileMenu.classList.remove('mobile-menu-open');
    } else {
      arrow.classList.add('arrow-open');
      dropdownUtils.showChildAnchors(mobileMenu);
      mobileMenu.classList.add('mobile-menu-open');
    }
  };

  return {
    init
  };
})();

export { mobile };
