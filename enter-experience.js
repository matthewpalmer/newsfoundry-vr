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

  addExitButton: function() {
    var box = document.createElement('a-box');
    box.setAttribute('width', '1');
    box.setAttribute('height', '1');
    box.setAttribute('depth', '1');
    box.setAttribute('color', 'white');
    box.setAttribute('position', '-3, 1.5, -5');
    box.setAttribute('scale', '1 1 1');

    box.addEventListener('click', function() {
       this[this.currentExperience + '_exit']()
    }.bind(this));

    document.getElementById('master-scene').appendChild(box);
    return box;
  },

  '#entertainment_button_celebrity_exit': function() {
    console.log('leaving entertainment button');

    
  },

  '#entertainment_button_celebrity': function(el) {
    var story = this.config['#entertainment_button_celebrity'];
    var boxes = document.querySelectorAll('a-box');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].setAttribute('opacity', '0');
    }

    var exit = this.addExitButton();

    var i = 1;

    var newsreader = document.getElementById('newsreader');
    if (!newsreader) return;
    newsreader.setAttribute('opacity', '1');

    setInterval(function() {

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
      this.currentExperience = experience;
      console.log('ENTERING EXPERIENCE', experience);

      that[experience]();
    }.bind(this));
  }
});