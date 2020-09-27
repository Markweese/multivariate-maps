const dropdownUtils = {
  trapFocus: (el) => {
    el.lastChild.addEventListener('keydown', (e) => {
      if(e.code === 'Tab') {
        el.firstChild.focus();
      }
    })
  },

  showChildAnchors: (el) => {
    const anchors = Array.from(el.querySelectorAll('a'));

    anchors.forEach(anchor => {
      anchor.setAttribute('tabindex', '0')
    });
  },

  hideChildAnchors: (el) => {
    const anchors = Array.from(el.querySelectorAll('a'));

    anchors.forEach(anchor => {
      anchor.setAttribute('tabindex', '-1')
    });
  }
}

export { dropdownUtils };
