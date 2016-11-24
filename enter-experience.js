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
    var exit = document.getElementById('exit-button-box');
    document.getElementById('master-scene').removeChild(exit);

    var boxes = document.querySelectorAll('a-box');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].setAttribute('opacity', '1');
    }

    var pageBack = document.getElementById('image-360');
    pageBack.setAttribute('opacity', '1');
    pageBack.setAttribute('src', '#room');

  },

  '#features_button_sport': function() {
    console.log('sportptrot');
  },

  // temp: change to news article

  config: {
    stories: {
      '#entertainment_button_celebrity': {
        title: 'Sophie Monk snaps at Kyle over Bardot jokes',
        body: 'The KIIS FM radio star presented the ARIA for Best Pop release with Monk at the ceremony last night.\n\nWhen they were on stage, he said to Monk: “Now Soph, we just heard your song when we came out, how many ARIAs did you win when you were in Bardot?”\n\nMonk paused before saying, “None.”\n\n“Sorry about that,” Sandilands joked, “Ripped off I say ... Why don’t you bring the girls back together again?”\n\n“Yeah we probably should,” Monk said.\n\nBut Sandilands revealed on air this morning that once they were backstage Monk had a go at him for bringing up Bardot.\n\n“Sophie went mad at me after that,” he said to co-host Jackie O.\n\n“She’s like, ‘Put me on the spot about putting the girls back ... we never got on!’\n\n“We all thought they were loving each other,” Sandilands said about the girl group, “I thought they were doing pillow fights.”\n\nJackie O, who was a judge on Popstars, said: “I was in the show and I didn’t even know they hated each other ... I wasn’t aware until after.”\n\nBardot formed in 2000 and originally featured Chantelle Barry, Belinda Chapple, Sophie Monk, Sally Polihronas and Katie Underwood.\n\nBarry was kicked out of the group just weeks after they formed and was replaced by Tiffani Wood.\n\nBardot’s first album debuted at number one on the ARIA charts and they released their second and final album in 2001.\n\nThe group officially split a year later with a statement citing exhaustion as the reason: “Bardot confirm their mutual decision to end the group’s career. Belinda Chapple, Sophie Monk, Sally Polihronas and Tiffany Wood have cited the need for a well earned break following what has been a phenomenal two-and-a-half year explosion on the Australian music scene. \n\n“The pace at which the group’s career continued from its inception at the first Australian Popstars TV show auditions to the completion of a third single from their second album Play It Like That has taken its toll.”\n\n'
      }
    }
  },

  addExitButton: function() {
    var box = document.createElement('a-box');

    box.setAttribute('id', 'exit-button-box');
    box.setAttribute('width', '0.6');
    box.setAttribute('height', '0.6');
    box.setAttribute('depth', '0.6');
    box.setAttribute('color', 'white');
    box.setAttribute('position', '-3, 1.5, -5');
    box.setAttribute('scale', '1 1 1');
    box.setAttribute('src', '#home_button');
    box.setAttribute('rotation', '0 0 0');
    box.setAttribute('easing', 'linear');

    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'rotation');
    anim.setAttribute('to', '360 0 0');
    anim.setAttribute('dur', '15500');
    anim.setAttribute('fill', 'forwards');
    anim.setAttribute('repeat', 'indefinite');

               //  easing="linear"
               // dur="7500"
               // fill="forwards"
               // to="360 360 0"
               // repeat="indefinite"

    box.appendChild(anim);

    box.addEventListener('click', function() {
       this[this.currentExperience + '_exit']()
    }.bind(this));

    document.getElementById('master-scene').appendChild(box);
    return box;
  },

  '#entertainment_button_celebrity_exit': function() {
    console.log('leaving entertainment button');

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

    window.speechSynthesis.cancel();
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

    var story = this.config.stories['#entertainment_button_celebrity'];

    window.speechSynthesis.speak(new SpeechSynthesisUtterance(story.title));
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(story.body));
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