const FlashUtils = {
  methods: {
    generateFlashMessage(id, name, type) {
      let message = document.createElement('div');

      if (type === 'error') {
        message.innerHTML = this.generateErrorHTML(id, name);
      }

      if (type === 'pending') {
        message.innerHTML = this.generateCompileHTML(id, name);
      }

      if (type === 'success') {
        message.innerHTML = this.generateSuccessHTML(id, name);
      }

      return message;
    },

    generateCompileHTML(id, name) {
      return `<div class="flash flash--success">
                <div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div>
                <p class="flash__text --loading">
                  Compiling station data, this may take a moment
                </p>
                <button class="flash__remove" onclick="this.parentElement.remove()">×</button>
              </div>`
    },

    generateSuccessHTML(id, name) {
      return `<div class="flash flash--success">
                <p class="flash__text --loaded">
                  Successfully compiled <a href="/site/${id}">${name}</a>, would you like to <a href='/explorer/${id}'>add to your list</a>?
                </p>
                <button class="flash__remove" onclick="this.parentElement.remove()">×</button>
              </div>`
    },

    generateErrorHTML(id, name) {
      return `<div class="flash flash--error">
                <p class="flash__text --error">
                  There was an issue compiling ${name}
                </p>
                <button class="flash__remove" onclick="this.parentElement.remove()">×</button>
              </div>`
    },

    generateError(message) {
      let output = document.createElement('div');

      output.innerHTML = `<div class="flash flash--error">
          <p class="flash__text --error">
            ${message}
          </p>
          <button class="flash__remove" onclick="this.parentElement.remove()">×</button>
        </div>`

      return output;
    },

    generateSuccess(message) {
      let output = document.createElement('div');

      output.innerHTML = `<div class="flash flash--success">
          <p class="flash__text --loaded">
            ${message}
          </p>
          <button class="flash__remove" onclick="this.parentElement.remove()">×</button>
        </div>`

      return output;
    }
  }
};

export {
  FlashUtils
};
