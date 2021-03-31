import { formUtils } from '../utils/formUtils';

const signup = (() => {
  let emailInput;
  let confirmInput;
  let usernameInput;
  let passwordInput;
  let checkusername = [];
  let passwordStrengthBar;
  let passwordStrengthText;
  let imageInput;

  const init = () => {
    imageInput = document.getElementById('photo');
    emailInput = document.querySelector('input[name=email]');
    usernameInput = document.querySelector('input[name=name]');
    passwordInput = document.querySelector('input[name=new-password]');
    confirmInput = document.querySelector('input[name=confirm-password]');
    passwordStrengthBar = document.getElementById('passwordStrengthBar');
    passwordStrengthText = document.getElementById('passwordStrengthText');
    checkusername = JSON.parse(document.getElementById('signup').dataset.checkusername);

    checkusername.forEach((name,i) => {
        if (name) {
          checkusername[i] = name.toLowerCase();
        }
    });

    imageInput.addEventListener('change', () => {formUtils.showImage(event, imageInput)});
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
