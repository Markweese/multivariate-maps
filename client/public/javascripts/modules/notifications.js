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
      .then(() => {
        document.querySelector('.notification-button__icon').style.display = 'none';
        document.getElementById('notificationButton').querySelector('img').src = '/images/icons/alert-bell-active.png'
      })
      .catch(e => {
        console.log(e);
      });
  }

  return {
    init
  };
})();

export { notifications };
