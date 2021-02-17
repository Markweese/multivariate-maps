import { formUtils } from '../utils/formUtils';

const account = (() => {
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
    checkusername = JSON.parse(document.getElementById('account').dataset.checkusername);

    checkusername.forEach((name,i) => {
        if (name) {
          checkusername[i] = name.toLowerCase();
        }
    });

    emailInput.addEventListener('focusin', warnEmailUpdate);
    emailInput.addEventListener('focusout', removeEmailUpdate);
    imageInput.addEventListener('change', () => {formUtils.showImage(event, imageInput)});
    passwordInput.addEventListener('input', () => {formUtils.verifyPasswordSecurity(event)});
    usernameInput.addEventListener('input', () => {formUtils.verifyUsername(event, checkusername)});
    confirmInput.addEventListener('input', () => {formUtils.verifyPasswordMatch(event, passwordInput)});
    passwordInput.addEventListener('input', () => {formUtils.verifyPasswordMatch(event, confirmInput)});
  };

  const warnEmailUpdate = () => {
    document.getElementById('emailErr').innerHTML = 'Warning: Your email address is your login ID. If this is changed all future logins will have to be done with the new email';
  }

  const removeEmailUpdate = () => {
    document.getElementById('emailErr').innerHTML = '';
  }

  return {
    init
  };
})();

export { account };
