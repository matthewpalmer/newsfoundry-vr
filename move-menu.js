AFRAME.registerComponent('move-menu', {
  schema: {
    on: {type: 'string'}
  },

  animateToPos: function(box, pos) {
    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'position');
    // -5 1 -2.5
    anim.setAttribute('to', pos);
    anim.setAttribute('dur', '700');
    anim.setAttribute('easing', 'ease-in-out-cubic');

    var anim2 = document.createElement('a-animation');
    anim2.setAttribute('attribute', 'scale');
    anim2.setAttribute('to', '1 1 1');
    anim2.setAttribute('dur', '700');
    anim2.setAttribute('easing', 'ease-in-out-cubic');

    var anim3 = document.createElement('a-animation');
    anim3.setAttribute('attribute', 'rotation');
    anim3.setAttribute('to', '0 0 0');
    anim3.setAttribute('dur', '700');
    anim3.setAttribute('easing', 'ease-in-out-cubic');

    var old = box.getElementsByTagName('a-animation');
    box.removeChild(old[0]);

    box.appendChild(anim);
    box.appendChild(anim2);
    box.appendChild(anim3);
  },

  animateToCorner: function(box, i) {
    console.log('fdhafjdkhsafsd');
    var curpos = box.getAttribute('position');
    var newpos = -4 + ' 1.45 ' + (-3 + i * 0.75);
    this.animateToPos(box, newpos);
  },

  animateToMiddle: function(box) {
    this.animateToPos(box, "0 2.5 -4.5");
  },


  init: function () {
    var data = this.data;
    var el = this.el;
    var that = this;

    el.addEventListener(data.on, function () {
      var boxes = Array.prototype.slice.call(document.getElementsByTagName('a-box'), 0, 4);
      boxes.splice(boxes.indexOf(el), 1);
      console.log(boxes);
      boxes.forEach(function(b, i) {
        that.animateToCorner(b, i);  
      });

      that.animateToMiddle(el);

      getStory('09b7545627b783c80b54525401142f16', function(json) {
        console.log('will speak', json.title);
        speakText(json.title);
      });

      // melbourne story
      // 7373b1109acf4e474fa01421adf27036
      // real estate
      //http://cdn.newsapi.com.au/content/v2/09b7545627b783c80b54525401142f16?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //top news
      //http://cdn.newsapi.com.au/content/v2/8945baf8fc0f9cab6b425aa3ddc4cf39?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //entertainment
      //http://cdn.newsapi.com.au/content/v2/ed2dfa176e69bee9b3f1a4397408e134?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
      //sports
      //http://cdn.newsapi.com.au/content/v2/07d72a078dfb9d61af1f620890bb693f?api_key=gqz7h5zs6b9f5bxrwhpgfhhb
    });
  }
});