AFRAME.registerComponent('enter-experience', {
  schema: {
    on: {type: 'string'}
  },
  '#destinations_button_nsw': function(el) {
    console.log('DESTINATIONS NSW');

    var video = document.getElementById('image-360');
    //hide boxes
    var boxes = document.querySelectorAll('a-box');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].setAttribute('opacity', '0');
    }

    var exit = this.addExitButton();
    if (!video) return;
    video.setAttribute('src', 'bikes.mp4');

  },

  '#destinations_button_nsw_exit': function() {
    console.log('leaving entertainment button destinations');
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

    box.setAttribute('id', 'exit-button-box');
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
debugger;
    var exit = document.getElementById('exit-button-box');
    document.getElementById('master-scene').removeChild(exit);

    var boxes = document.querySelectorAll('a-box');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].setAttribute('opacity', '1');
    }

    var newsreader = document.getElementById('newsreader');
    newsreader.setAttribute('opacity', '0');
    newsreader.setAttribute('width', '0');
    newsreader.setAttribute('height', '0');
  },

  '#entertainment_button_celebrity': function(el) {
    // width="3.2" height="4.17"

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
    newsreader.setAttribute('width', '3.2');
    newsreader.setAttribute('height', '4.17');

    setInterval(function() {

      if (newsreader) {
        newsreader.setAttribute('src', '#newsreader_' + (i - 1));
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