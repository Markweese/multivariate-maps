const ImageUtils = {
  methods: {
    getBuff(buffer) {
      var binstr = Array.prototype.map.call(new Uint8Array(buffer), (ch) => {
          return String.fromCharCode(ch);
      }).join('');

      return btoa(binstr);
    }
  }
}

export {
  ImageUtils
};
