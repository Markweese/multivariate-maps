import axios from 'axios';

const notifications = (() => {
  const init = () => {
    document.getElementById('notificationButton').addEventListener('click', openMenu);
    document.getElementById('notificationButtonMobile').addEventListener('click', openMenu);
  }

  const openMenu = () => {
    document.getElementById('notificationDropdown').classList.toggle('--hidden');
    document.getElementById('notificationDropdownMobile').classList.toggle('--hidden');
    axios.post('/user/notifications/clean')
      .then(res => {
        console.log(res.data);
      });
  }

  return {
    init
  };
})();

export { notifications };
