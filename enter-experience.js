AFRAME.registerComponent('enter-experience', {
  schema: {
    on: {type: 'string'}
  },

  '#destinations_button_nsw': function() {
    console.log('DESTINATIONS NSW');
  },

  '#features_button_sport': function() {
    console.log('sportptrot');
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;

    el.addEventListener(data.on, function () {
      console.log('ENTERING EXPERIENCE');

      var experience = el.getAttribute('src');

      that[experience]();
    });
  }
});