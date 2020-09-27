import { formUtils } from '../utils/formUtils';

const signup = (() => {
  let confirmInput;
  let usernameInput;
  let passwordInput;
  let checkusername = [];
  let passwordStrengthBar;

  const init = () => {
    usernameInput = document.querySelector('input[name=name]');
    passwordInput = document.querySelector('input[name=new-password]');
    confirmInput = document.querySelector('input[name=confirm-password]');
    passwordStrengthBar = document.getElementById('passwordStrengthBar');
    passwordStrengthText = document.getElementById('passwordStrengthText');
    checkusername = JSON.parse(document.getElementById('signup').dataset.checkusername);

    checkusername.forEach((name,i) => {
        checkusername[i] = name.toLowerCase();
    });

    passwordInput.addEventListener('input', () => {formUtils.verifyPasswordSecurity(event)});
    usernameInput.addEventListener('input', () => {formUtils.verifyUsername(event, checkusername)});
    confirmInput.addEventListener('input', () => {formUtils.verifyPasswordMatch(event, passwordInput)});
    passwordInput.addEventListener('input', () => {formUtils.verifyPasswordMatch(event, confirmInput)});
  };

  return {
    init
  };
})();

export { signup };
