const formUtils = {
  verifyPasswordSecurity: (e) => {
    let passwordStrength = 0;

    // set strength counter
    if(e.target.value.length >= 8) {
      passwordStrength += 1;
    }
    if(e.target.value.match(/(!|\?|\.|@|#|\$|\^|%|@|&|\*)/g)) {
      passwordStrength += 1;
    }
    if(e.target.value.match(/[A-Z]/g)) {
      passwordStrength += 1;
    }
    if(e.target.value.match(/[1-9]/g)) {
      passwordStrength += 1;
    }

    // set styles and width on strength bar
    if (passwordStrength === 0) {
      passwordStrengthText.innerHTML = 'strength: weak';
      passwordStrengthBar.style.background = '#BE3B28';
    }
    if (passwordStrength === 1) {
      passwordStrengthText.innerHTML = 'strength: ok';
      passwordStrengthBar.style.background = '#54e038';
    }
    if (passwordStrength === 2) {
      passwordStrengthText.innerHTML = 'strength: good';
      passwordStrengthBar.style.background = '#54e038';
    }
    if (passwordStrength === 3) {
      passwordStrengthText.innerHTML = 'strength: strong';
      passwordStrengthBar.style.background = '#119933';
    }
    if (passwordStrength >= 4) {
      passwordStrengthText.innerHTML = 'strength: very strong';
      passwordStrengthBar.style.background = '#119933';
    }

    passwordStrengthBar.style.width = passwordStrength === 0 ? '25%' : `${(passwordStrength / 4) * 100}%`;
  },
  verifyPasswordMatch: (e, matchAgainst) => {
    if(e.target.value !== matchAgainst.value) {
      document.getElementById('confirmErr').innerHTML = 'passwords don\'t match';
    } else {
      document.getElementById('confirmErr').innerHTML = '';
    }
  },
  verifyUsername: (e, checkusername) => {
    if(checkusername.includes(e.target.value.toLowerCase())) {
      document.getElementById('nameErr').innerHTML = 'username already in use';
    } else {
      document.getElementById('nameErr').innerHTML = '';
    }
  }
}

export { formUtils };
