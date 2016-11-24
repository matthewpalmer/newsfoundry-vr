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

  // temp: change to news article

  config: {
    stories: {
      '#entertainment_button_celebrity': {
        title: 'this is a test title',
        body: 'this is the body of the thing'
      }
    }
  },

  '#entertainment_button_celebrity': function(el) {
    var story = this.config['#entertainment_button_celebrity'];

    var i = 1;

    setInterval(function() {
      var newsreader = document.getElementById('newsreader');

      if (newsreader) {
        newsreader.setAttribute('src', '#newsreader_' + i);
      }

      i = i % 3 + 1;
      i++;
    }, 1000);
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;

    el.addEventListener(data.on, function () {
      

      var experience = el.getAttribute('src');
      console.log('ENTERING EXPERIENCE', experience);

      that[experience]();
    });
  }
});